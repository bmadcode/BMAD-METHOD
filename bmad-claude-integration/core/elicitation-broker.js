#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class ElicitationBroker {
  constructor(messageQueue, options = {}) {
    this.messageQueue = messageQueue;
    this.basePath = options.basePath || path.join(process.env.HOME, '.bmad');
    this.sessionsPath = path.join(this.basePath, 'queue', 'elicitation');
  }

  generateSessionId() {
    return `elicit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  }

  async createSession(agentName, initialContext) {
    const session = {
      id: this.generateSessionId(),
      agent: agentName,
      created: new Date().toISOString(),
      status: 'active',
      context: {
        ...initialContext,
        elicitationHistory: []
      },
      currentPhase: 'initial',
      metadata: {
        startTime: Date.now(),
        interactionCount: 0
      }
    };

    const sessionPath = path.join(this.sessionsPath, session.id);
    await fs.mkdir(sessionPath, { recursive: true });
    
    await this.saveSession(session);
    return session;
  }

  async saveSession(session) {
    const sessionPath = path.join(this.sessionsPath, session.id);
    const files = {
      'session.json': session,
      'context.json': session.context,
      'history.json': session.context.elicitationHistory || []
    };

    for (const [filename, data] of Object.entries(files)) {
      await fs.writeFile(
        path.join(sessionPath, filename),
        JSON.stringify(data, null, 2)
      );
    }
  }

  async loadSession(sessionId) {
    const sessionPath = path.join(this.sessionsPath, sessionId, 'session.json');
    try {
      const content = await fs.readFile(sessionPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Session ${sessionId} not found`);
    }
  }

  async addQuestion(sessionId, question, metadata = {}) {
    const session = await this.loadSession(sessionId);
    
    const questionEntry = {
      id: `q${session.context.elicitationHistory.length + 1}`,
      type: 'question',
      text: question,
      timestamp: new Date().toISOString(),
      metadata,
      phase: session.currentPhase
    };

    session.context.elicitationHistory.push(questionEntry);
    session.metadata.interactionCount++;
    
    await this.saveSession(session);
    return questionEntry;
  }

  async addResponse(sessionId, response, questionId = null) {
    const session = await this.loadSession(sessionId);
    
    const responseEntry = {
      id: `r${session.context.elicitationHistory.filter(h => h.type === 'response').length + 1}`,
      type: 'response',
      text: response,
      questionId,
      timestamp: new Date().toISOString(),
      phase: session.currentPhase
    };

    session.context.elicitationHistory.push(responseEntry);
    session.metadata.lastResponseTime = Date.now();
    
    await this.saveSession(session);
    return responseEntry;
  }

  async updatePhase(sessionId, newPhase) {
    const session = await this.loadSession(sessionId);
    session.currentPhase = newPhase;
    
    session.context.elicitationHistory.push({
      type: 'phase_change',
      from: session.currentPhase,
      to: newPhase,
      timestamp: new Date().toISOString()
    });
    
    await this.saveSession(session);
  }

  async completeSession(sessionId, finalResult = null) {
    const session = await this.loadSession(sessionId);
    session.status = 'completed';
    session.completedAt = new Date().toISOString();
    session.metadata.endTime = Date.now();
    session.metadata.duration = session.metadata.endTime - session.metadata.startTime;
    
    if (finalResult) {
      session.result = finalResult;
    }

    await this.saveSession(session);
    await this.archiveSession(session);
    
    return session;
  }

  async archiveSession(session) {
    const archivePath = path.join(this.basePath, 'archive', 'elicitation', session.id);
    await fs.mkdir(path.join(this.basePath, 'archive', 'elicitation'), { recursive: true });
    
    const sourcePath = path.join(this.sessionsPath, session.id);
    await fs.rename(sourcePath, archivePath);
  }

  async getActiveElicitations() {
    try {
      const sessionDirs = await fs.readdir(this.sessionsPath);
      const sessions = [];
      
      for (const dir of sessionDirs) {
        if (dir.startsWith('elicit-')) {
          try {
            const session = await this.loadSession(dir);
            if (session.status === 'active') {
              sessions.push(session);
            }
          } catch (e) {
            // Skip invalid sessions
          }
        }
      }
      
      return sessions;
    } catch (error) {
      return [];
    }
  }

  async processElicitationMessage(message) {
    const { sessionId, action, data } = message.data;
    
    switch (action) {
      case 'create':
        return await this.createSession(data.agent, data.context);
        
      case 'question':
        return await this.addQuestion(sessionId, data.question, data.metadata);
        
      case 'response':
        return await this.addResponse(sessionId, data.response, data.questionId);
        
      case 'complete':
        return await this.completeSession(sessionId, data.result);
        
      case 'update_phase':
        return await this.updatePhase(sessionId, data.phase);
        
      default:
        throw new Error(`Unknown elicitation action: ${action}`);
    }
  }

  async formatElicitationPrompt(session, question) {
    const history = session.context.elicitationHistory
      .filter(h => h.type === 'question' || h.type === 'response')
      .slice(-6); // Last 3 Q&A pairs for context

    let prompt = `## BMAD ${session.agent} - Elicitation\n\n`;
    
    if (history.length > 0) {
      prompt += `### Previous Context:\n`;
      for (const entry of history) {
        if (entry.type === 'question') {
          prompt += `**Q**: ${entry.text}\n`;
        } else {
          prompt += `**A**: ${entry.text}\n\n`;
        }
      }
    } else {
      // No previous context, go straight to current question
      prompt += ``;
    }
    
    prompt += `### Current Question:\n${question}\n\n`;
    prompt += `*Please provide your response to continue the ${session.agent} workflow.*`;
    
    return prompt;
  }

  async getSessionSummary(sessionId) {
    const session = await this.loadSession(sessionId);
    
    const questions = session.context.elicitationHistory.filter(h => h.type === 'question');
    const responses = session.context.elicitationHistory.filter(h => h.type === 'response');
    
    return {
      id: session.id,
      agent: session.agent,
      status: session.status,
      created: session.created,
      questionsAsked: questions.length,
      responsesReceived: responses.length,
      currentPhase: session.currentPhase,
      duration: session.metadata.duration || (Date.now() - session.metadata.startTime),
      lastActivity: Math.max(
        ...session.context.elicitationHistory.map(h => new Date(h.timestamp).getTime())
      )
    };
  }
}

// CLI interface for testing
if (require.main === module) {
  const BMADMessageQueue = require('./message-queue');
  const queue = new BMADMessageQueue();
  const broker = new ElicitationBroker(queue);
  
  const commands = {
    async create(agent, context = '{}') {
      const session = await broker.createSession(agent, JSON.parse(context));
      console.log(`Session created: ${session.id}`);
      console.log(JSON.stringify(session, null, 2));
    },
    
    async question(sessionId, questionText) {
      const question = await broker.addQuestion(sessionId, questionText);
      console.log('Question added:', question);
    },
    
    async response(sessionId, responseText) {
      const response = await broker.addResponse(sessionId, responseText);
      console.log('Response added:', response);
    },
    
    async complete(sessionId) {
      const session = await broker.completeSession(sessionId);
      console.log('Session completed:', session.id);
    },
    
    async active() {
      const sessions = await broker.getActiveElicitations();
      console.log(`Active elicitation sessions (${sessions.length}):`);
      for (const session of sessions) {
        const summary = await broker.getSessionSummary(session.id);
        console.log(`  ${summary.id} - ${summary.agent} - Q:${summary.questionsAsked} R:${summary.responsesReceived}`);
      }
    },
    
    async summary(sessionId) {
      const summary = await broker.getSessionSummary(sessionId);
      console.log(JSON.stringify(summary, null, 2));
    }
  };

  const [,, command, ...args] = process.argv;
  
  if (commands[command]) {
    commands[command](...args).catch(console.error);
  } else {
    console.log('Usage: elicitation-broker.js <command> [args]');
    console.log('Commands:', Object.keys(commands).join(', '));
  }
}

module.exports = ElicitationBroker;