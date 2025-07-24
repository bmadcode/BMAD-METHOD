const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

/**
 * Claude Code CLI Session Manager
 * Provides automatic session management, heartbeat tracking, and context restoration
 * for Claude Code CLI users of the BMAD collaborative workspace system.
 */
class ClaudeCodeSessionManager {
  constructor(workspaceDir) {
    this.workspaceDir = workspaceDir;
    this.sessionsDir = path.join(workspaceDir, '.workspace', 'sessions');
    this.sessionId = null;
    this.heartbeatInterval = null;
    this.sessionData = null;
    this.isClaudeCodeSession = process.env.CLAUDE_CODE_SESSION || false;
  }

  /**
   * Initialize Claude Code CLI session with automatic registration
   */
  async initializeSession(agentType = 'dev', projectContext = {}) {
    try {
      // Generate unique session ID
      this.sessionId = `claude-code-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      
      // Ensure sessions directory exists
      if (!fs.existsSync(this.sessionsDir)) {
        fs.mkdirSync(this.sessionsDir, { recursive: true });
      }

      // Create session data
      this.sessionData = {
        sessionId: this.sessionId,
        agentType: agentType,
        ide: 'claude-code',
        startTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        status: 'active',
        projectContext: projectContext,
        workspaceVersion: '1.0',
        capabilities: {
          nativeCommands: true,
          autoHandoff: true,
          contextAware: true,
          autoMaintenance: true
        },
        metrics: {
          commandsExecuted: 0,
          contextSwitches: 0,
          handoffsInitiated: 0,
          handoffsReceived: 0
        }
      };

      // Write session file
      const sessionFile = path.join(this.sessionsDir, `${this.sessionId}.json`);
      fs.writeFileSync(sessionFile, JSON.stringify(this.sessionData, null, 2));

      // Start heartbeat monitoring
      this.startHeartbeat();

      // Auto-load workspace context if available
      await this.loadWorkspaceContext();

      console.log(`🚀 Claude Code CLI session initialized: ${this.sessionId}`);
      console.log(`📍 Agent: ${agentType} | Project: ${projectContext.name || 'Unknown'}`);
      
      return {
        sessionId: this.sessionId,
        status: 'initialized',
        capabilities: this.sessionData.capabilities
      };

    } catch (error) {
      console.error('Failed to initialize Claude Code CLI session:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Start automatic heartbeat monitoring
   */
  startHeartbeat() {
    // Update heartbeat every 30 seconds
    this.heartbeatInterval = setInterval(() => {
      this.updateHeartbeat();
    }, 30000);

    // Also update on process events
    process.on('beforeExit', () => this.cleanupSession());
    process.on('SIGINT', () => this.cleanupSession());
    process.on('SIGTERM', () => this.cleanupSession());
  }

  /**
   * Update session heartbeat
   */
  updateHeartbeat() {
    if (!this.sessionId || !this.sessionData) return;

    try {
      this.sessionData.lastActivity = new Date().toISOString();
      
      const sessionFile = path.join(this.sessionsDir, `${this.sessionId}.json`);
      if (fs.existsSync(sessionFile)) {
        fs.writeFileSync(sessionFile, JSON.stringify(this.sessionData, null, 2));
      }
    } catch (error) {
      console.warn('Failed to update session heartbeat:', error.message);
    }
  }

  /**
   * Register command execution
   */
  registerCommandExecution(command, context = {}) {
    if (!this.sessionData) return;

    this.sessionData.metrics.commandsExecuted++;
    this.sessionData.lastCommand = {
      command: command,
      timestamp: new Date().toISOString(),
      context: context
    };

    this.updateHeartbeat();
  }

  /**
   * Prepare agent handoff with context transfer
   */
  async prepareAgentHandoff(targetAgent, handoffContext = {}) {
    if (!this.sessionData) return null;

    try {
      // Increment handoff metrics
      this.sessionData.metrics.handoffsInitiated++;

      // Load current workspace context
      const workspaceContext = await this.loadWorkspaceContext();

      // Generate handoff package
      const handoffData = {
        sourceSession: this.sessionId,
        sourceAgent: this.sessionData.agentType,
        targetAgent: targetAgent,
        timestamp: new Date().toISOString(),
        workspaceContext: workspaceContext,
        sessionContext: {
          metrics: this.sessionData.metrics,
          recentCommands: this.sessionData.lastCommand,
          projectContext: this.sessionData.projectContext
        },
        handoffContext: handoffContext,
        continuity: {
          sessionId: this.sessionId,
          resumable: true,
          contextVersion: workspaceContext?.version || '1.0'
        }
      };

      // Save handoff package
      const handoffId = `${this.sessionData.agentType}-to-${targetAgent}-${Date.now()}`;
      const handoffFile = path.join(this.workspaceDir, '.workspace', 'handoffs', `${handoffId}.json`);
      
      if (!fs.existsSync(path.dirname(handoffFile))) {
        fs.mkdirSync(path.dirname(handoffFile), { recursive: true });
      }

      fs.writeFileSync(handoffFile, JSON.stringify(handoffData, null, 2));

      console.log(`🔄 Handoff prepared: ${this.sessionData.agentType} → ${targetAgent}`);
      console.log(`📦 Handoff package: ${handoffId}.json`);

      return {
        handoffId: handoffId,
        targetAgent: targetAgent,
        status: 'prepared',
        contextPreserved: true
      };

    } catch (error) {
      console.error('Failed to prepare agent handoff:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Restore session from handoff
   */
  async restoreFromHandoff(handoffId) {
    try {
      const handoffFile = path.join(this.workspaceDir, '.workspace', 'handoffs', `${handoffId}.json`);
      
      if (!fs.existsSync(handoffFile)) {
        throw new Error(`Handoff package not found: ${handoffId}`);
      }

      const handoffData = JSON.parse(fs.readFileSync(handoffFile, 'utf8'));

      // Update session data with handoff context
      if (this.sessionData) {
        this.sessionData.metrics.handoffsReceived++;
        this.sessionData.restoredFrom = {
          handoffId: handoffId,
          sourceAgent: handoffData.sourceAgent,
          timestamp: new Date().toISOString()
        };
        
        // Merge project context
        this.sessionData.projectContext = {
          ...this.sessionData.projectContext,
          ...handoffData.sessionContext.projectContext
        };
      }

      console.log(`♻️  Session restored from handoff: ${handoffData.sourceAgent} → ${this.sessionData?.agentType}`);
      
      return {
        status: 'restored',
        sourceAgent: handoffData.sourceAgent,
        contextVersion: handoffData.continuity.contextVersion
      };

    } catch (error) {
      console.error('Failed to restore from handoff:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Load workspace context for session continuity
   */
  async loadWorkspaceContext() {
    try {
      const contextFile = path.join(this.workspaceDir, '.workspace', 'context', 'shared-context.md');
      
      if (fs.existsSync(contextFile)) {
        const contextContent = fs.readFileSync(contextFile, 'utf8');
        return {
          content: contextContent,
          lastModified: fs.statSync(contextFile).mtime.toISOString(),
          version: '1.0'
        };
      }

      return null;
    } catch (error) {
      console.warn('Failed to load workspace context:', error.message);
      return null;
    }
  }

  /**
   * Get current session status
   */
  getSessionStatus() {
    if (!this.sessionData) {
      return { status: 'inactive' };
    }

    return {
      sessionId: this.sessionId,
      agentType: this.sessionData.agentType,
      status: this.sessionData.status,
      startTime: this.sessionData.startTime,
      lastActivity: this.sessionData.lastActivity,
      metrics: this.sessionData.metrics,
      capabilities: this.sessionData.capabilities
    };
  }

  /**
   * Perform workspace integrity check
   */
  async performIntegrityCheck() {
    const results = {
      timestamp: new Date().toISOString(),
      checks: [],
      status: 'healthy',
      issues: []
    };

    try {
      // Check workspace directory structure
      const requiredDirs = ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality'];
      const workspaceRoot = path.join(this.workspaceDir, '.workspace');

      for (const dir of requiredDirs) {
        const dirPath = path.join(workspaceRoot, dir);
        const exists = fs.existsSync(dirPath);
        
        results.checks.push({
          type: 'directory',
          path: dir,
          status: exists ? 'ok' : 'missing'
        });

        if (!exists) {
          results.issues.push(`Missing directory: .workspace/${dir}`);
          fs.mkdirSync(dirPath, { recursive: true });
          results.checks[results.checks.length - 1].status = 'repaired';
        }
      }

      // Check session file integrity
      if (this.sessionId) {
        const sessionFile = path.join(this.sessionsDir, `${this.sessionId}.json`);
        const sessionExists = fs.existsSync(sessionFile);
        
        results.checks.push({
          type: 'session',
          sessionId: this.sessionId,
          status: sessionExists ? 'ok' : 'corrupted'
        });

        if (!sessionExists && this.sessionData) {
          fs.writeFileSync(sessionFile, JSON.stringify(this.sessionData, null, 2));
          results.checks[results.checks.length - 1].status = 'repaired';
        }
      }

      // Check for orphaned sessions (older than 2 hours with no activity)
      if (fs.existsSync(this.sessionsDir)) {
        const sessionFiles = fs.readdirSync(this.sessionsDir).filter(f => f.endsWith('.json'));
        const cutoffTime = Date.now() - (2 * 60 * 60 * 1000); // 2 hours ago

        for (const sessionFile of sessionFiles) {
          const sessionPath = path.join(this.sessionsDir, sessionFile);
          try {
            const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
            const lastActivity = new Date(sessionData.lastActivity).getTime();

            if (lastActivity < cutoffTime) {
              results.issues.push(`Orphaned session: ${sessionData.sessionId}`);
              fs.unlinkSync(sessionPath);
              results.checks.push({
                type: 'cleanup',
                sessionId: sessionData.sessionId,
                status: 'removed'
              });
            }
          } catch (error) {
            results.issues.push(`Corrupted session file: ${sessionFile}`);
            fs.unlinkSync(sessionPath);
            results.checks.push({
              type: 'cleanup',
              file: sessionFile,
              status: 'removed'
            });
          }
        }
      }

      results.status = results.issues.length === 0 ? 'healthy' : 'repaired';
      
      return results;

    } catch (error) {
      results.status = 'failed';
      results.error = error.message;
      return results;
    }
  }

  /**
   * Clean up session on exit
   */
  cleanupSession() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.sessionId && this.sessionData) {
      try {
        // Mark session as completed
        this.sessionData.status = 'completed';
        this.sessionData.endTime = new Date().toISOString();

        const sessionFile = path.join(this.sessionsDir, `${this.sessionId}.json`);
        fs.writeFileSync(sessionFile, JSON.stringify(this.sessionData, null, 2));

        console.log(`📝 Claude Code CLI session completed: ${this.sessionId}`);
      } catch (error) {
        console.warn('Failed to cleanup session:', error.message);
      }
    }
  }
}

module.exports = ClaudeCodeSessionManager;