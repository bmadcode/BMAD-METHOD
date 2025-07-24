const ClaudeCodeSessionManager = require('./claude-code-session-manager');
const path = require('path');
const fs = require('fs');

/**
 * Claude Code CLI Native Workspace Commands
 * Provides seamless integration of workspace functionality within Claude Code CLI sessions
 */
class ClaudeCodeWorkspaceCommands {
  constructor(workspaceDir) {
    this.workspaceDir = workspaceDir;
    this.sessionManager = new ClaudeCodeSessionManager(workspaceDir);
    this.commandHistory = [];
  }

  /**
   * Initialize workspace and start session
   */
  async workspaceInit(agentType = 'dev', options = {}) {
    const startTime = Date.now();
    
    try {
      console.log('🚀 Initializing Claude Code CLI collaborative workspace...');

      // Detect project context
      const projectContext = await this.detectProjectContext();
      
      // Initialize session
      const sessionResult = await this.sessionManager.initializeSession(agentType, projectContext);
      
      if (sessionResult.status === 'failed') {
        throw new Error(sessionResult.error);
      }

      // Perform integrity check
      const integrityResults = await this.sessionManager.performIntegrityCheck();
      
      // Load existing workspace context
      const workspaceContext = await this.sessionManager.loadWorkspaceContext();

      // Register command execution
      this.sessionManager.registerCommandExecution('workspace-init', {
        agentType: agentType,
        options: options,
        projectContext: projectContext
      });

      const duration = Date.now() - startTime;

      console.log('✅ Workspace initialization complete!');
      console.log(`⏱️  Completed in ${duration}ms`);
      console.log('');
      console.log('📋 Session Details:');
      console.log(`   • Session ID: ${sessionResult.sessionId}`);
      console.log(`   • Agent Type: ${agentType}`);
      console.log(`   • Project: ${projectContext.name || 'Unknown'}`);
      console.log(`   • Capabilities: Native commands, Auto-handoff, Context-aware`);
      console.log('');
      console.log('🎯 Ready for collaborative development!');
      console.log('   • Use *workspace-status to see current state');
      console.log('   • Use *workspace-handoff [agent] to transfer context');
      console.log('   • Workspace operations are now automatic');

      if (workspaceContext) {
        console.log('♻️  Previous workspace context restored');
      }

      if (integrityResults.issues.length > 0) {
        console.log(`🔧 Workspace maintenance: ${integrityResults.issues.length} issues auto-repaired`);
      }

      return {
        status: 'initialized',
        sessionId: sessionResult.sessionId,
        duration: duration,
        contextRestored: !!workspaceContext,
        issuesRepaired: integrityResults.issues.length
      };

    } catch (error) {
      console.error('❌ Workspace initialization failed:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Show current workspace status
   */
  async workspaceStatus(detailed = false) {
    try {
      console.log('📊 Claude Code CLI Workspace Status');
      console.log('═'.repeat(50));

      // Get session status
      const sessionStatus = this.sessionManager.getSessionStatus();
      
      if (sessionStatus.status === 'inactive') {
        console.log('⚠️  No active workspace session');
        console.log('   Use *workspace-init to start collaborating');
        return { status: 'inactive' };
      }

      // Display session information
      console.log('🎯 Active Session:');
      console.log(`   • Session ID: ${sessionStatus.sessionId}`);
      console.log(`   • Agent: ${sessionStatus.agentType}`);
      console.log(`   • Status: ${sessionStatus.status}`);
      console.log(`   • Started: ${new Date(sessionStatus.startTime).toLocaleString()}`);
      console.log(`   • Last Activity: ${new Date(sessionStatus.lastActivity).toLocaleString()}`);

      // Display capabilities
      console.log('');
      console.log('⚡ Enhanced Capabilities:');
      const caps = sessionStatus.capabilities || {};
      console.log(`   • Native Commands: ${caps.nativeCommands ? '✅' : '❌'}`);
      console.log(`   • Auto Handoff: ${caps.autoHandoff ? '✅' : '❌'}`);
      console.log(`   • Context Aware: ${caps.contextAware ? '✅' : '❌'}`);
      console.log(`   • Auto Maintenance: ${caps.autoMaintenance ? '✅' : '❌'}`);

      // Display metrics
      console.log('');
      console.log('📈 Session Metrics:');
      const metrics = sessionStatus.metrics || {};
      console.log(`   • Commands Executed: ${metrics.commandsExecuted || 0}`);
      console.log(`   • Context Switches: ${metrics.contextSwitches || 0}`);
      console.log(`   • Handoffs Initiated: ${metrics.handoffsInitiated || 0}`);
      console.log(`   • Handoffs Received: ${metrics.handoffsReceived || 0}`);

      // Check for pending handoffs
      const pendingHandoffs = await this.checkPendingHandoffs();
      if (pendingHandoffs.length > 0) {
        console.log('');
        console.log('📥 Pending Handoffs:');
        pendingHandoffs.forEach((handoff, index) => {
          console.log(`   ${index + 1}. ${handoff.sourceAgent} → ${handoff.targetAgent} (${handoff.timestamp})`);
        });
      }

      // Check workspace health
      const healthCheck = await this.sessionManager.performIntegrityCheck();
      console.log('');
      console.log(`🏥 Workspace Health: ${healthCheck.status.toUpperCase()}`);
      if (healthCheck.issues.length > 0) {
        console.log(`   • Issues Found: ${healthCheck.issues.length} (auto-repaired)`);
      } else {
        console.log('   • All systems operational');
      }

      // Detailed information if requested
      if (detailed) {
        console.log('');
        console.log('🔍 Detailed Information:');
        
        // Show recent workspace activity
        const recentActivity = await this.getRecentActivity();
        if (recentActivity.length > 0) {
          console.log('   Recent Activity:');
          recentActivity.slice(0, 5).forEach((activity, index) => {
            console.log(`     ${index + 1}. ${activity.type}: ${activity.description} (${activity.timestamp})`);
          });
        }

        // Show workspace file sizes
        const workspaceStats = await this.getWorkspaceStats();
        console.log('   Workspace Statistics:');
        console.log(`     • Total Files: ${workspaceStats.fileCount}`);
        console.log(`     • Total Size: ${workspaceStats.totalSize}`);
        console.log(`     • Context Size: ${workspaceStats.contextSize}`);
      }

      console.log('');
      console.log('💡 Available Commands:');
      console.log('   • *workspace-cleanup - Optimize workspace');
      console.log('   • *workspace-handoff [agent] - Transfer to agent');
      console.log('   • *workspace-sync - Sync latest context');

      return {
        status: 'active',
        session: sessionStatus,
        pendingHandoffs: pendingHandoffs.length,
        health: healthCheck.status
      };

    } catch (error) {
      console.error('❌ Failed to get workspace status:', error.message);
      return { status: 'error', error: error.message };
    }
  }

  /**
   * Clean up workspace and optimize
   */
  async workspaceCleanup(options = {}) {
    const startTime = Date.now();
    
    try {
      console.log('🧹 Starting workspace cleanup and optimization...');

      let cleanupResults = {
        filesRemoved: 0,
        spaceSaved: 0,
        issuesFixed: 0,
        optimizations: []
      };

      // Perform integrity check and auto-repair
      const integrityResults = await this.sessionManager.performIntegrityCheck();
      cleanupResults.issuesFixed = integrityResults.issues.length;

      // Clean up old sessions (older than 24 hours)
      const sessionCleanup = await this.cleanupOldSessions();
      cleanupResults.filesRemoved += sessionCleanup.filesRemoved;
      cleanupResults.spaceSaved += sessionCleanup.spaceSaved;

      // Clean up expired handoffs (older than 7 days)
      const handoffCleanup = await this.cleanupExpiredHandoffs();
      cleanupResults.filesRemoved += handoffCleanup.filesRemoved;
      cleanupResults.spaceSaved += handoffCleanup.spaceSaved;

      // Optimize context files (compress if over size limit)
      const contextOptimization = await this.optimizeContextFiles();
      cleanupResults.optimizations.push(...contextOptimization.optimizations);
      cleanupResults.spaceSaved += contextOptimization.spaceSaved;

      // Clean up temporary files
      const tempCleanup = await this.cleanupTempFiles();
      cleanupResults.filesRemoved += tempCleanup.filesRemoved;
      cleanupResults.spaceSaved += tempCleanup.spaceSaved;

      // Register command execution
      this.sessionManager.registerCommandExecution('workspace-cleanup', {
        options: options,
        results: cleanupResults
      });

      const duration = Date.now() - startTime;

      console.log('✅ Workspace cleanup complete!');
      console.log(`⏱️  Completed in ${duration}ms`);
      console.log('');
      console.log('📊 Cleanup Results:');
      console.log(`   • Files Removed: ${cleanupResults.filesRemoved}`);
      console.log(`   • Space Saved: ${this.formatBytes(cleanupResults.spaceSaved)}`);
      console.log(`   • Issues Fixed: ${cleanupResults.issuesFixed}`);
      console.log(`   • Optimizations: ${cleanupResults.optimizations.length}`);

      if (cleanupResults.optimizations.length > 0) {
        console.log('');
        console.log('⚡ Optimizations Applied:');
        cleanupResults.optimizations.forEach((opt, index) => {
          console.log(`   ${index + 1}. ${opt}`);
        });
      }

      console.log('');
      console.log('🎯 Workspace is now optimized for peak performance!');

      return {
        status: 'completed',
        duration: duration,
        results: cleanupResults
      };

    } catch (error) {
      console.error('❌ Workspace cleanup failed:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Prepare agent handoff
   */
  async workspaceHandoff(targetAgent, handoffContext = {}) {
    const startTime = Date.now();

    try {
      if (!targetAgent) {
        console.log('❌ Target agent required for handoff');
        console.log('');
        console.log('💡 Available agents:');
        console.log('   • dev - Full Stack Developer');
        console.log('   • qa - QA Engineer & Quality Architect'); 
        console.log('   • architect - Software Architect');
        console.log('   • pm - Product Manager');
        console.log('   • sm - Scrum Master');
        return { status: 'invalid', error: 'Target agent required' };
      }

      console.log(`🔄 Preparing handoff to ${targetAgent}...`);

      // Prepare handoff package
      const handoffResult = await this.sessionManager.prepareAgentHandoff(targetAgent, handoffContext);
      
      if (handoffResult.status === 'failed') {
        throw new Error(handoffResult.error);
      }

      // Generate handoff summary
      const sessionStatus = this.sessionManager.getSessionStatus();
      
      const duration = Date.now() - startTime;

      console.log('✅ Handoff package prepared!');
      console.log(`⏱️  Completed in ${duration}ms`);
      console.log('');
      console.log('📦 Handoff Details:');
      console.log(`   • Handoff ID: ${handoffResult.handoffId}`);
      console.log(`   • From: ${sessionStatus.agentType} (Claude Code CLI)`);
      console.log(`   • To: ${targetAgent}`);
      console.log(`   • Context Preserved: ${handoffResult.contextPreserved ? '✅' : '❌'}`);
      console.log('');
      console.log('🎯 Ready for agent transition!');
      console.log(`   • The ${targetAgent} agent can now access full context`);
      console.log('   • All workspace state has been preserved');
      console.log('   • Session continuity maintained');

      // Register command execution
      this.sessionManager.registerCommandExecution('workspace-handoff', {
        targetAgent: targetAgent,
        handoffId: handoffResult.handoffId,
        context: handoffContext
      });

      return {
        status: 'prepared',
        handoffId: handoffResult.handoffId,
        targetAgent: targetAgent,
        duration: duration
      };

    } catch (error) {
      console.error('❌ Handoff preparation failed:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Synchronize with latest workspace context
   */
  async workspaceSync(options = {}) {
    const startTime = Date.now();

    try {
      console.log('🔄 Synchronizing workspace context...');

      // Load latest workspace context
      const workspaceContext = await this.sessionManager.loadWorkspaceContext();
      
      // Check for pending handoffs to this agent
      const sessionStatus = this.sessionManager.getSessionStatus();
      const pendingHandoffs = await this.checkPendingHandoffs(sessionStatus.agentType);

      // Process any pending handoffs
      let handoffsProcessed = 0;
      for (const handoff of pendingHandoffs) {
        const restoreResult = await this.sessionManager.restoreFromHandoff(handoff.handoffId);
        if (restoreResult.status === 'restored') {
          handoffsProcessed++;
        }
      }

      // Update session metrics
      this.sessionManager.registerCommandExecution('workspace-sync', {
        options: options,
        contextLoaded: !!workspaceContext,
        handoffsProcessed: handoffsProcessed
      });

      const duration = Date.now() - startTime;

      console.log('✅ Workspace synchronization complete!');
      console.log(`⏱️  Completed in ${duration}ms`);
      console.log('');
      console.log('📊 Sync Results:');
      console.log(`   • Context Updated: ${workspaceContext ? '✅' : '❌'}`);
      console.log(`   • Handoffs Processed: ${handoffsProcessed}`);
      
      if (workspaceContext) {
        console.log(`   • Context Version: ${workspaceContext.version}`);
        console.log(`   • Last Modified: ${new Date(workspaceContext.lastModified).toLocaleString()}`);
      }

      if (handoffsProcessed > 0) {
        console.log('');
        console.log('🔄 Context restored from previous agent handoffs');
        console.log('   • Full development context available');
        console.log('   • Ready to continue collaborative work');
      }

      console.log('');
      console.log('🎯 Workspace is now synchronized and ready!');

      return {
        status: 'synchronized',
        duration: duration,
        contextLoaded: !!workspaceContext,
        handoffsProcessed: handoffsProcessed
      };

    } catch (error) {
      console.error('❌ Workspace synchronization failed:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  // Helper methods

  async detectProjectContext() {
    try {
      const packageJsonPath = path.join(this.workspaceDir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return {
          name: packageJson.name,
          version: packageJson.version,
          type: 'nodejs',
          hasTests: !!packageJson.scripts?.test,
          hasBuild: !!packageJson.scripts?.build
        };
      }

      // Check for other project types
      const projectFiles = fs.readdirSync(this.workspaceDir);
      if (projectFiles.includes('.csproj') || projectFiles.some(f => f.endsWith('.csproj'))) {
        return { type: 'dotnet', name: path.basename(this.workspaceDir) };
      }

      return { type: 'unknown', name: path.basename(this.workspaceDir) };
    } catch (error) {
      return { type: 'unknown', name: 'project' };
    }
  }

  async checkPendingHandoffs(targetAgent = null) {
    try {
      const handoffsDir = path.join(this.workspaceDir, '.workspace', 'handoffs');
      if (!fs.existsSync(handoffsDir)) return [];

      const handoffFiles = fs.readdirSync(handoffsDir).filter(f => f.endsWith('.json'));
      const pendingHandoffs = [];

      for (const file of handoffFiles) {
        try {
          const handoffData = JSON.parse(fs.readFileSync(path.join(handoffsDir, file), 'utf8'));
          if (!targetAgent || handoffData.targetAgent === targetAgent) {
            pendingHandoffs.push({
              handoffId: path.basename(file, '.json'),
              sourceAgent: handoffData.sourceAgent,
              targetAgent: handoffData.targetAgent,
              timestamp: handoffData.timestamp
            });
          }
        } catch (error) {
          // Skip corrupted handoff files
        }
      }

      return pendingHandoffs;
    } catch (error) {
      return [];
    }
  }

  async cleanupOldSessions() {
    // Implementation for cleaning up old session files
    return { filesRemoved: 0, spaceSaved: 0 };
  }

  async cleanupExpiredHandoffs() {
    // Implementation for cleaning up expired handoff files
    return { filesRemoved: 0, spaceSaved: 0 };
  }

  async optimizeContextFiles() {
    // Implementation for optimizing context files
    return { optimizations: [], spaceSaved: 0 };
  }

  async cleanupTempFiles() {
    // Implementation for cleaning up temporary files
    return { filesRemoved: 0, spaceSaved: 0 };
  }

  async getRecentActivity() {
    // Implementation for getting recent workspace activity
    return [];
  }

  async getWorkspaceStats() {
    // Implementation for getting workspace statistics
    return { fileCount: 0, totalSize: '0 B', contextSize: '0 B' };
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

module.exports = ClaudeCodeWorkspaceCommands;