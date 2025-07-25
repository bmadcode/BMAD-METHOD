#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class SessionManager {
  constructor(messageQueue, elicitationBroker, options = {}) {
    this.messageQueue = messageQueue;
    this.elicitationBroker = elicitationBroker;
    this.basePath = options.basePath || path.join(process.env.HOME, '.bmad');
    this.sessionsPath = path.join(this.basePath, 'sessions');
    this.activeSessions = new Map();
    this.sessionOrder = []; // Track order of sessions for switching
  }

  async initialize() {
    await fs.mkdir(this.sessionsPath, { recursive: true });
    await this.loadActiveSessions();
  }

  generateSessionId() {
    return `session-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  }

  async createAgentSession(agentName, context = {}) {
    const sessionId = this.generateSessionId();
    const session = {
      id: sessionId,
      agent: agentName,
      status: 'active',
      created: new Date().toISOString(),
      lastActivity: Date.now(),
      context: {
        ...context,
        conversationHistory: [],
        elicitationSessions: []
      },
      ui: {
        color: this.getAgentColor(agentName),
        icon: this.getAgentIcon(agentName),
        displayName: this.getAgentDisplayName(agentName)
      }
    };

    this.activeSessions.set(sessionId, session);
    this.sessionOrder.push(sessionId);
    await this.saveSession(session);
    
    return session;
  }

  async switchSession(sessionId) {
    if (!this.activeSessions.has(sessionId)) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Move session to front of order
    this.sessionOrder = this.sessionOrder.filter(id => id !== sessionId);
    this.sessionOrder.unshift(sessionId);
    
    const session = this.activeSessions.get(sessionId);
    session.lastActivity = Date.now();
    await this.saveSession(session);
    
    return session;
  }

  async suspendSession(sessionId, reason = 'user_switch') {
    const session = this.activeSessions.get(sessionId);
    if (!session) return;

    session.status = 'suspended';
    session.suspendedAt = Date.now();
    session.suspendReason = reason;
    
    // If in elicitation, save state
    if (session.currentElicitation) {
      session.context.suspendedElicitation = {
        sessionId: session.currentElicitation,
        state: await this.elicitationBroker.loadSession(session.currentElicitation)
      };
    }
    
    await this.saveSession(session);
  }

  async resumeSession(sessionId) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      // Try to load from disk
      const loadedSession = await this.loadSession(sessionId);
      if (loadedSession) {
        this.activeSessions.set(sessionId, loadedSession);
        return loadedSession;
      }
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = 'active';
    session.resumedAt = Date.now();
    delete session.suspendedAt;
    delete session.suspendReason;
    
    // Resume elicitation if needed
    if (session.context.suspendedElicitation) {
      session.currentElicitation = session.context.suspendedElicitation.sessionId;
      delete session.context.suspendedElicitation;
    }
    
    await this.saveSession(session);
    return session;
  }

  async addToConversation(sessionId, entry) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const conversationEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
      id: `conv-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
    };

    session.context.conversationHistory.push(conversationEntry);
    session.lastActivity = Date.now();
    
    await this.saveSession(session);
    return conversationEntry;
  }

  async startElicitation(sessionId, elicitationSessionId) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.currentElicitation = elicitationSessionId;
    session.context.elicitationSessions.push({
      id: elicitationSessionId,
      startedAt: Date.now()
    });
    
    await this.saveSession(session);
  }

  async completeElicitation(sessionId, elicitationSessionId, result) {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    if (session.currentElicitation === elicitationSessionId) {
      delete session.currentElicitation;
    }

    const elicitationRecord = session.context.elicitationSessions.find(
      e => e.id === elicitationSessionId
    );
    if (elicitationRecord) {
      elicitationRecord.completedAt = Date.now();
      elicitationRecord.result = result;
    }
    
    await this.saveSession(session);
  }

  formatSessionPrompt(session) {
    const header = `\n${'='.repeat(60)}\n` +
                  `${session.ui.icon} **${session.ui.displayName}** Session\n` +
                  `Session ID: ${session.id}\n` +
                  `${'='.repeat(60)}\n`;

    let prompt = header;

    if (session.status === 'suspended') {
      prompt += `\n⚠️ This session is currently suspended. Would you like to resume?\n`;
    }

    if (session.currentElicitation) {
      prompt += `\n📝 Currently in elicitation phase...\n`;
    }

    return prompt;
  }

  formatSessionList() {
    const sessions = Array.from(this.activeSessions.values());
    if (sessions.length === 0) {
      return 'No active sessions.';
    }

    let output = '**Active BMAD Sessions:**\n\n';
    
    sessions.forEach((session, index) => {
      const isActive = this.sessionOrder[0] === session.id;
      const status = isActive ? '🟢' : (session.status === 'suspended' ? '🟡' : '⚪');
      const lastActive = new Date(session.lastActivity).toLocaleTimeString();
      
      output += `${status} **${index + 1}. ${session.ui.icon} ${session.ui.displayName}**\n`;
      output += `   Session: ${session.id}\n`;
      output += `   Status: ${session.status} | Last active: ${lastActive}\n`;
      
      if (session.currentElicitation) {
        output += `   📝 In elicitation phase\n`;
      }
      
      output += '\n';
    });

    output += '\n💡 Use `/switch <number>` to switch between sessions\n';
    output += '💡 Use `/suspend` to pause current session\n';
    output += '💡 Use `/sessions` to see this list again\n';

    return output;
  }

  getAgentColor(agentName) {
    const colors = {
      'bmad-master': 'purple',
      'bmad-orchestrator': 'blue',
      'pm': 'green',
      'architect': 'orange',
      'dev': 'cyan',
      'qa': 'red',
      'ux-expert': 'pink',
      'sm': 'yellow'
    };
    return colors[agentName] || 'gray';
  }

  getAgentIcon(agentName) {
    const icons = {
      'bmad-master': '🧙',
      'bmad-orchestrator': '🎭',
      'pm': '📋',
      'architect': '🏗️',
      'dev': '💻',
      'qa': '🐛',
      'ux-expert': '🎨',
      'sm': '🏃'
    };
    return icons[agentName] || '🤖';
  }

  getAgentDisplayName(agentName) {
    const names = {
      'bmad-master': 'BMAD Master',
      'bmad-orchestrator': 'BMAD Orchestrator',
      'pm': 'Project Manager',
      'architect': 'Architect',
      'dev': 'Developer',
      'qa': 'QA Engineer',
      'ux-expert': 'UX Expert',
      'sm': 'Scrum Master'
    };
    return names[agentName] || agentName;
  }

  async saveSession(session) {
    const sessionPath = path.join(this.sessionsPath, `${session.id}.json`);
    await fs.writeFile(sessionPath, JSON.stringify(session, null, 2));
  }

  async loadSession(sessionId) {
    const sessionPath = path.join(this.sessionsPath, `${sessionId}.json`);
    try {
      const content = await fs.readFile(sessionPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  async loadActiveSessions() {
    try {
      const files = await fs.readdir(this.sessionsPath);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const session = await this.loadSession(file.replace('.json', ''));
          if (session && (session.status === 'active' || session.status === 'suspended')) {
            this.activeSessions.set(session.id, session);
            this.sessionOrder.push(session.id);
          }
        }
      }
      
      // Sort by last activity
      this.sessionOrder.sort((a, b) => {
        const sessionA = this.activeSessions.get(a);
        const sessionB = this.activeSessions.get(b);
        return (sessionB?.lastActivity || 0) - (sessionA?.lastActivity || 0);
      });
    } catch (error) {
      // Directory doesn't exist yet
    }
  }

  async cleanup() {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (now - session.lastActivity > maxAge && session.status !== 'active') {
        this.activeSessions.delete(sessionId);
        this.sessionOrder = this.sessionOrder.filter(id => id !== sessionId);
        
        const sessionPath = path.join(this.sessionsPath, `${sessionId}.json`);
        await fs.unlink(sessionPath).catch(() => {});
      }
    }
  }
}

// CLI interface for testing
if (require.main === module) {
  const BMADMessageQueue = require('./message-queue');
  const ElicitationBroker = require('./elicitation-broker');
  
  const queue = new BMADMessageQueue();
  const broker = new ElicitationBroker(queue);
  const manager = new SessionManager(queue, broker);
  
  const commands = {
    async init() {
      await manager.initialize();
      console.log('Session manager initialized');
    },
    
    async create(agent) {
      const session = await manager.createAgentSession(agent);
      console.log(`Session created: ${session.id}`);
      console.log(manager.formatSessionPrompt(session));
    },
    
    async list() {
      await manager.initialize();
      console.log(manager.formatSessionList());
    },
    
    async switch(sessionId) {
      const session = await manager.switchSession(sessionId);
      console.log(manager.formatSessionPrompt(session));
    },
    
    async suspend(sessionId) {
      await manager.suspendSession(sessionId);
      console.log(`Session ${sessionId} suspended`);
    }
  };

  const [,, command, ...args] = process.argv;
  
  if (commands[command]) {
    commands[command](...args).catch(console.error);
  } else {
    console.log('Usage: session-manager.js <command> [args]');
    console.log('Commands:', Object.keys(commands).join(', '));
  }
}

module.exports = SessionManager;