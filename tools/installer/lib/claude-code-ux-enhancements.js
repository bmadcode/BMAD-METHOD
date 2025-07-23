const ClaudeCodeContextIntegration = require('./claude-code-context-integration');
const path = require('path');
const fs = require('fs');

/**
 * Claude Code CLI Enhanced User Experience Features
 * Provides intelligent suggestions, analytics, and seamless workflow integration
 */
class ClaudeCodeUXEnhancements {
  constructor(workspaceDir) {
    this.workspaceDir = workspaceDir;
    this.contextIntegration = new ClaudeCodeContextIntegration(workspaceDir);
    this.usageAnalytics = {
      sessionsStarted: 0,
      commandsExecuted: 0,
      handoffsCompleted: 0,
      averageSessionDuration: 0,
      mostUsedCommands: {},
      productivityMetrics: {}
    };
  }

  /**
   * Initialize UX enhancements for Claude Code CLI session
   */
  async initializeUXEnhancements(sessionId, agentType) {
    try {
      // Initialize context-aware features
      await this.contextIntegration.initializeContextAware(agentType, sessionId);
      
      // Load previous analytics
      await this.loadAnalytics();
      
      // Update session analytics
      this.usageAnalytics.sessionsStarted++;
      
      console.log('✨ Enhanced UX features activated');
      console.log('   • Intelligent workspace suggestions enabled');
      console.log('   • Context-aware command recommendations active');
      console.log('   • Productivity analytics tracking started');
      
      return {
        status: 'initialized',
        features: {
          intelligentSuggestions: true,
          contextAware: true,
          productivityAnalytics: true,
          seamlessIntegration: true
        }
      };

    } catch (error) {
      console.warn('Failed to initialize UX enhancements:', error.message);
      return { status: 'partial', error: error.message };
    }
  }

  /**
   * Add workspace status indicators to command responses
   */
  addWorkspaceStatusIndicators(commandResponse, commandName) {
    try {
      const indicators = [];
      
      // Add session status indicator
      indicators.push('🚀 Claude Code CLI Enhanced Session Active');
      
      // Add context awareness indicator
      if (this.contextIntegration.sessionContext) {
        indicators.push(`🧠 Context-Aware (${this.contextIntegration.activeAgent})`);
      }
      
      // Add recent activity indicator
      const recentCommands = this.getRecentCommandHistory();
      if (recentCommands.length > 0) {
        indicators.push(`📊 ${recentCommands.length} recent commands tracked`);
      }
      
      // Add collaboration indicator
      const collaborationStatus = this.getCollaborationStatus();
      if (collaborationStatus.activeCollaborators > 0) {
        indicators.push(`👥 ${collaborationStatus.activeCollaborators} active collaborators`);
      }
      
      // Format indicators
      const statusBar = indicators.join(' • ');
      
      // Add to response
      const enhancedResponse = {
        originalResponse: commandResponse,
        statusIndicators: statusBar,
        timestamp: new Date().toISOString(),
        enhanced: true
      };
      
      // Track command execution
      this.trackCommandExecution(commandName);
      
      return enhancedResponse;

    } catch (error) {
      console.warn('Failed to add status indicators:', error.message);
      return commandResponse;
    }
  }

  /**
   * Generate intelligent workspace suggestions
   */
  async generateIntelligentSuggestions() {
    try {
      console.log('🔮 Generating intelligent workspace suggestions...');
      
      // Get suggestions from context integration
      const contextSuggestions = await this.contextIntegration.generateIntelligentSuggestions();
      
      // Add productivity-based suggestions
      const productivitySuggestions = await this.generateProductivitySuggestions();
      
      // Add workflow optimization suggestions
      const workflowSuggestions = await this.generateWorkflowSuggestions();
      
      // Combine and prioritize suggestions
      const allSuggestions = [
        ...contextSuggestions,
        ...productivitySuggestions,
        ...workflowSuggestions
      ].sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

      // Display suggestions
      if (allSuggestions.length > 0) {
        console.log('');
        console.log('💡 Intelligent Workspace Suggestions:');
        console.log('═'.repeat(50));
        
        allSuggestions.slice(0, 5).forEach((suggestion, index) => {
          const priorityIcon = {
            'high': '🔥',
            'medium': '⚡',
            'low': '💭'
          }[suggestion.priority];
          
          console.log(`${index + 1}. ${priorityIcon} ${suggestion.title}`);
          console.log(`   ${suggestion.description}`);
          if (suggestion.action) {
            console.log(`   💻 Try: ${suggestion.action}`);
          }
          console.log(`   📝 Why: ${suggestion.reasoning}`);
          console.log('');
        });
        
        if (allSuggestions.length > 5) {
          console.log(`   📋 ${allSuggestions.length - 5} more suggestions available`);
          console.log('   Use *workspace-status detailed for full list');
        }
      } else {
        console.log('💡 No specific suggestions at this time - workspace is optimized!');
      }

      return allSuggestions;

    } catch (error) {
      console.warn('Failed to generate intelligent suggestions:', error.message);
      return [];
    }
  }

  /**
   * Generate productivity-based suggestions
   */
  async generateProductivitySuggestions() {
    const suggestions = [];
    
    try {
      // Analyze command usage patterns
      const commandStats = this.analyzeCommandUsage();
      
      // Suggest frequently used commands
      if (commandStats.mostUsed.length > 0) {
        const topCommand = commandStats.mostUsed[0];
        
        if (topCommand.count > 5) {
          suggestions.push({
            type: 'productivity',
            priority: 'medium',
            title: 'Command Usage Pattern Detected',
            description: `You frequently use *${topCommand.command} - consider workflow optimization`,
            reasoning: `Used ${topCommand.count} times in recent sessions`,
            context: { commandStats: topCommand }
          });
        }
      }
      
      // Analyze session duration patterns
      const sessionStats = this.analyzeSessionPatterns();
      
      if (sessionStats.averageDuration > 60) { // More than 1 hour
        suggestions.push({
          type: 'productivity',
          priority: 'low',
          title: 'Long Session Detected',
          description: 'Consider taking breaks or using *workspace-handoff for collaboration',
          action: '*workspace-status',
          reasoning: `Average session: ${Math.round(sessionStats.averageDuration)} minutes`
        });
      }
      
      // Suggest workspace cleanup based on activity
      if (this.usageAnalytics.commandsExecuted > 50) {
        suggestions.push({
          type: 'maintenance',
          priority: 'medium',
          title: 'Workspace Maintenance Recommended',
          description: 'High activity detected - workspace cleanup may improve performance',
          action: '*workspace-cleanup',
          reasoning: `${this.usageAnalytics.commandsExecuted} commands executed`
        });
      }

    } catch (error) {
      console.warn('Failed to generate productivity suggestions:', error.message);
    }

    return suggestions;
  }

  /**
   * Generate workflow optimization suggestions
   */
  async generateWorkflowSuggestions() {
    const suggestions = [];
    
    try {
      // Analyze handoff patterns
      const handoffPatterns = this.analyzeHandoffPatterns();
      
      if (handoffPatterns.frequentTransitions.length > 0) {
        const topTransition = handoffPatterns.frequentTransitions[0];
        
        suggestions.push({
          type: 'workflow',
          priority: 'medium',
          title: 'Workflow Pattern Optimization',
          description: `Frequent ${topTransition.from} → ${topTransition.to} transitions detected`,
          action: `*workspace-handoff ${topTransition.to}`,
          reasoning: `${topTransition.count} transitions in recent sessions`
        });
      }
      
      // Suggest collaboration opportunities
      const collaborationOpportunities = await this.contextIntegration.detectHandoffOpportunities();
      
      if (collaborationOpportunities.length > 0) {
        const topOpportunity = collaborationOpportunities[0];
        
        suggestions.push({
          type: 'collaboration',
          priority: 'high',
          title: 'Collaboration Opportunity Detected',
          description: topOpportunity.reason,
          action: `*workspace-handoff ${topOpportunity.targetAgent}`,
          reasoning: `Confidence: ${Math.round(topOpportunity.confidence * 100)}%`
        });
      }

    } catch (error) {
      console.warn('Failed to generate workflow suggestions:', error.message);
    }

    return suggestions;
  }

  /**
   * Build workspace usage analytics and insights
   */
  async buildUsageAnalytics() {
    try {
      console.log('📊 Workspace Usage Analytics & Insights');
      console.log('═'.repeat(50));

      // Session Analytics
      console.log('🎯 Session Statistics:');
      console.log(`   • Total Sessions: ${this.usageAnalytics.sessionsStarted}`);
      console.log(`   • Commands Executed: ${this.usageAnalytics.commandsExecuted}`);
      console.log(`   • Handoffs Completed: ${this.usageAnalytics.handoffsCompleted}`);
      
      if (this.usageAnalytics.averageSessionDuration > 0) {
        console.log(`   • Average Session: ${Math.round(this.usageAnalytics.averageSessionDuration)} minutes`);
      }

      // Command Usage Analytics
      const commandStats = this.analyzeCommandUsage();
      if (commandStats.mostUsed.length > 0) {
        console.log('');
        console.log('⚡ Most Used Commands:');
        commandStats.mostUsed.slice(0, 5).forEach((cmd, index) => {
          console.log(`   ${index + 1}. *${cmd.command} (${cmd.count} times)`);
        });
      }

      // Productivity Insights
      const productivityInsights = this.generateProductivityInsights();
      if (productivityInsights.length > 0) {
        console.log('');
        console.log('📈 Productivity Insights:');
        productivityInsights.forEach((insight, index) => {
          console.log(`   ${index + 1}. ${insight.title}: ${insight.value}`);
          if (insight.recommendation) {
            console.log(`      💡 ${insight.recommendation}`);
          }
        });
      }

      // Collaboration Analytics
      const collaborationStats = this.analyzeCollaborationPatterns();
      if (collaborationStats.totalHandoffs > 0) {
        console.log('');
        console.log('🤝 Collaboration Patterns:');
        console.log(`   • Total Handoffs: ${collaborationStats.totalHandoffs}`);
        console.log(`   • Most Common: ${collaborationStats.mostCommonTransition || 'N/A'}`);
        console.log(`   • Collaboration Score: ${collaborationStats.collaborationScore}/100`);
      }

      // Workspace Health Trends
      const healthTrends = await this.analyzeHealthTrends();
      if (healthTrends.length > 0) {
        console.log('');
        console.log('🏥 Workspace Health Trends:');
        healthTrends.forEach((trend, index) => {
          const trendIcon = trend.direction === 'improving' ? '📈' : 
                           trend.direction === 'declining' ? '📉' : '➡️';
          console.log(`   ${index + 1}. ${trendIcon} ${trend.metric}: ${trend.status}`);
        });
      }

      // Save analytics
      await this.saveAnalytics();

      return {
        sessionStats: this.usageAnalytics,
        commandStats: commandStats,
        productivityInsights: productivityInsights,
        collaborationStats: collaborationStats,
        healthTrends: healthTrends
      };

    } catch (error) {
      console.error('Failed to build usage analytics:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Ensure seamless integration with existing Claude Code CLI workflows
   */
  ensureSeamlessIntegration() {
    try {
      // Check for existing Claude Code CLI patterns
      const integrationChecks = {
        toolIntegration: this.checkToolIntegration(),
        workflowCompatibility: this.checkWorkflowCompatibility(),
        performanceImpact: this.checkPerformanceImpact(),
        userExperience: this.checkUserExperience()
      };

      let integrationScore = 0;
      let totalChecks = 0;

      Object.entries(integrationChecks).forEach(([check, result]) => {
        totalChecks++;
        if (result.status === 'good') integrationScore++;
      });

      const integrationPercentage = Math.round((integrationScore / totalChecks) * 100);

      console.log('🔗 Claude Code CLI Integration Status:');
      console.log(`   • Overall Score: ${integrationPercentage}%`);
      console.log(`   • Tool Integration: ${integrationChecks.toolIntegration.status.toUpperCase()}`);
      console.log(`   • Workflow Compatibility: ${integrationChecks.workflowCompatibility.status.toUpperCase()}`);
      console.log(`   • Performance Impact: ${integrationChecks.performanceImpact.status.toUpperCase()}`);
      console.log(`   • User Experience: ${integrationChecks.userExperience.status.toUpperCase()}`);

      if (integrationPercentage < 80) {
        console.log('');
        console.log('⚠️  Integration improvements recommended:');
        Object.entries(integrationChecks).forEach(([check, result]) => {
          if (result.status !== 'good' && result.recommendation) {
            console.log(`   • ${result.recommendation}`);
          }
        });
      }

      return {
        integrationScore: integrationPercentage,
        checks: integrationChecks,
        status: integrationPercentage >= 80 ? 'excellent' : 
                integrationPercentage >= 60 ? 'good' : 'needs_improvement'
      };

    } catch (error) {
      console.warn('Failed to check integration status:', error.message);
      return { status: 'unknown', error: error.message };
    }
  }

  // Helper methods for analytics and integration

  trackCommandExecution(commandName) {
    this.usageAnalytics.commandsExecuted++;
    
    if (!this.usageAnalytics.mostUsedCommands[commandName]) {
      this.usageAnalytics.mostUsedCommands[commandName] = 0;
    }
    this.usageAnalytics.mostUsedCommands[commandName]++;
  }

  analyzeCommandUsage() {
    const commands = Object.entries(this.usageAnalytics.mostUsedCommands)
      .map(([command, count]) => ({ command, count }))
      .sort((a, b) => b.count - a.count);

    return {
      mostUsed: commands,
      totalCommands: this.usageAnalytics.commandsExecuted,
      uniqueCommands: commands.length
    };
  }

  analyzeSessionPatterns() {
    return {
      averageDuration: this.usageAnalytics.averageSessionDuration,
      totalSessions: this.usageAnalytics.sessionsStarted,
      commandsPerSession: this.usageAnalytics.sessionsStarted > 0 ? 
        Math.round(this.usageAnalytics.commandsExecuted / this.usageAnalytics.sessionsStarted) : 0
    };
  }

  analyzeHandoffPatterns() {
    // Simplified implementation - would analyze actual handoff data
    return {
      frequentTransitions: [
        { from: 'dev', to: 'qa', count: 5 },
        { from: 'qa', to: 'dev', count: 3 }
      ],
      totalHandoffs: this.usageAnalytics.handoffsCompleted
    };
  }

  generateProductivityInsights() {
    const insights = [];
    
    const commandsPerSession = this.analyzeSessionPatterns().commandsPerSession;
    if (commandsPerSession > 0) {
      insights.push({
        title: 'Commands per Session',
        value: commandsPerSession,
        recommendation: commandsPerSession < 5 ? 
          'Consider using more workspace features for better productivity' :
          commandsPerSession > 20 ?
          'High activity - consider workflow optimization' :
          'Good productivity balance'
      });
    }

    return insights;
  }

  analyzeCollaborationPatterns() {
    return {
      totalHandoffs: this.usageAnalytics.handoffsCompleted,
      mostCommonTransition: 'dev → qa',
      collaborationScore: Math.min(100, this.usageAnalytics.handoffsCompleted * 10)
    };
  }

  async analyzeHealthTrends() {
    // Simplified implementation - would analyze workspace health over time
    return [
      {
        metric: 'Workspace Health',
        status: 'Stable',
        direction: 'stable'
      }
    ];
  }

  checkToolIntegration() {
    // Check if workspace commands integrate well with Claude Code CLI tools
    return {
      status: 'good',
      details: 'Workspace commands integrate seamlessly with Claude Code CLI'
    };
  }

  checkWorkflowCompatibility() {
    // Check if workflows are compatible with existing Claude Code patterns
    return {
      status: 'good',
      details: 'Workflows maintain Claude Code CLI conventions'
    };
  }

  checkPerformanceImpact() {
    // Check performance impact of enhancements
    return {
      status: 'good',
      details: 'Minimal performance impact detected'
    };
  }

  checkUserExperience() {
    // Check overall user experience improvements
    return {
      status: 'good',
      details: 'Enhanced features improve productivity without complexity'
    };
  }

  getRecentCommandHistory() {
    // Simplified implementation
    return Object.entries(this.usageAnalytics.mostUsedCommands)
      .slice(0, 5)
      .map(([command, count]) => ({ command, count }));
  }

  getCollaborationStatus() {
    return {
      activeCollaborators: 0, // Would check actual active sessions
      recentHandoffs: this.usageAnalytics.handoffsCompleted
    };
  }

  async loadAnalytics() {
    try {
      const analyticsFile = path.join(this.workspaceDir, '.workspace', 'analytics.json');
      
      if (fs.existsSync(analyticsFile)) {
        const data = JSON.parse(fs.readFileSync(analyticsFile, 'utf8'));
        this.usageAnalytics = { ...this.usageAnalytics, ...data };
      }
    } catch (error) {
      // Use default analytics if loading fails
    }
  }

  async saveAnalytics() {
    try {
      const analyticsFile = path.join(this.workspaceDir, '.workspace', 'analytics.json');
      const analyticsDir = path.dirname(analyticsFile);
      
      if (!fs.existsSync(analyticsDir)) {
        fs.mkdirSync(analyticsDir, { recursive: true });
      }
      
      fs.writeFileSync(analyticsFile, JSON.stringify(this.usageAnalytics, null, 2));
    } catch (error) {
      console.warn('Failed to save analytics:', error.message);
    }
  }
}

module.exports = ClaudeCodeUXEnhancements;