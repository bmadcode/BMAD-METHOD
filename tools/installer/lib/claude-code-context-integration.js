const HandoffManager = require('./handoff-manager');
const ContextManager = require('./context-manager');
const path = require('path');
const fs = require('fs');

/**
 * Claude Code CLI Context-Aware Integration
 * Provides seamless context transfer and intelligent handoffs within Claude Code CLI sessions
 */
class ClaudeCodeContextIntegration {
  constructor(workspaceDir) {
    this.workspaceDir = workspaceDir;
    this.handoffManager = new HandoffManager(workspaceDir);
    this.contextManager = new ContextManager(workspaceDir);
    this.sessionContext = null;
    this.activeAgent = null;
  }

  /**
   * Initialize context-aware session
   */
  async initializeContextAware(agentType, sessionId) {
    try {
      this.activeAgent = agentType;
      this.sessionContext = {
        sessionId: sessionId,
        agentType: agentType,
        startTime: new Date().toISOString(),
        contextVersion: '1.0',
        smartFeatures: {
          autoSuggestions: true,
          contextAwareness: true,
          intelligentHandoffs: true,
          predictiveActions: true
        }
      };

      // Load existing context
      const sharedContext = await this.contextManager.getSharedContext();
      const decisions = await this.contextManager.getDecisions();
      const progress = await this.contextManager.getProgress();

      console.log('🧠 Context-aware features initialized');
      console.log(`   • Loaded ${decisions.length} decisions`);
      console.log(`   • Loaded ${progress.completedTasks || 0} completed tasks`);
      
      if (sharedContext.currentFocus) {
        console.log(`   • Current Focus: ${sharedContext.currentFocus}`);
      }

      return {
        status: 'initialized',
        contextLoaded: true,
        smartFeaturesEnabled: true
      };

    } catch (error) {
      console.error('Failed to initialize context-aware features:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Generate intelligent workspace suggestions based on context
   */
  async generateIntelligentSuggestions() {
    try {
      const suggestions = [];
      
      // Analyze current context
      const sharedContext = await this.contextManager.getSharedContext();
      const progress = await this.contextManager.getProgress();
      const decisions = await this.contextManager.getDecisions();

      // Suggest based on current focus
      if (sharedContext.currentFocus) {
        if (sharedContext.currentFocus.includes('implement') || sharedContext.currentFocus.includes('develop')) {
          suggestions.push({
            type: 'workflow',
            priority: 'high',
            title: 'Ready for Quality Review',
            description: 'Consider using *workspace-handoff qa to get quality validation',
            action: '*workspace-handoff qa',
            reasoning: 'Development work detected, QA review recommended'
          });
        }

        if (sharedContext.currentFocus.includes('test') || sharedContext.currentFocus.includes('bug')) {
          suggestions.push({
            type: 'workflow',
            priority: 'medium',
            title: 'Development Collaboration',
            description: 'Hand off to dev agent for implementation fixes',
            action: '*workspace-handoff dev',
            reasoning: 'Testing/bug work detected, dev collaboration recommended'
          });
        }
      }

      // Suggest based on progress patterns
      if (progress.completedTasks > 0) {
        const recentTasks = progress.taskHistory?.slice(-3) || [];
        const hasRecentErrors = recentTasks.some(task => task.status === 'error');
        
        if (hasRecentErrors) {
          suggestions.push({
            type: 'maintenance',
            priority: 'high',
            title: 'Workspace Cleanup Recommended',
            description: 'Recent errors detected, workspace cleanup may help',
            action: '*workspace-cleanup',
            reasoning: 'Error patterns suggest workspace maintenance needed'
          });
        }
      }

      // Suggest based on decision patterns
      if (decisions.length > 10) {
        const recentDecisions = decisions.slice(-5);
        const hasArchitecturalDecisions = recentDecisions.some(d => 
          d.title.includes('architecture') || d.title.includes('design')
        );
        
        if (hasArchitecturalDecisions) {
          suggestions.push({
            type: 'collaboration',
            priority: 'medium',
            title: 'Architect Review Recommended',
            description: 'Recent architectural decisions may benefit from architect review',
            action: '*workspace-handoff architect',
            reasoning: 'Complex architectural decisions detected'
          });
        }
      }

      // Suggest based on workspace health
      const workspaceHealth = await this.checkWorkspaceHealth();
      if (workspaceHealth.issues > 0) {
        suggestions.push({
          type: 'maintenance',
          priority: workspaceHealth.issues > 3 ? 'high' : 'medium',
          title: 'Workspace Maintenance Needed',
          description: `${workspaceHealth.issues} workspace issues detected`,
          action: '*workspace-cleanup',
          reasoning: 'Workspace health issues detected'
        });
      }

      return suggestions.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    } catch (error) {
      console.warn('Failed to generate intelligent suggestions:', error.message);
      return [];
    }
  }

  /**
   * Detect when work is ready for agent handoff
   */
  async detectHandoffOpportunities() {
    try {
      const opportunities = [];
      
      // Analyze current work state
      const progress = await this.contextManager.getProgress();
      const sharedContext = await this.contextManager.getSharedContext();

      // Development completion patterns
      if (this.activeAgent === 'dev') {
        const devIndicators = [
          'implementation complete',
          'all tests passing',
          'ready for review',
          'feature complete'
        ];

        const contextText = sharedContext.sessionNotes?.toLowerCase() || '';
        const hasCompletionIndicator = devIndicators.some(indicator => 
          contextText.includes(indicator)
        );

        if (hasCompletionIndicator) {
          opportunities.push({
            targetAgent: 'qa',
            confidence: 0.85,
            reason: 'Development work appears complete, ready for QA review',
            suggestedAction: 'Quality validation and testing',
            context: {
              completionIndicators: devIndicators.filter(i => contextText.includes(i))
            }
          });
        }

        // Check for architectural questions
        const architecturalKeywords = ['architecture', 'design pattern', 'structure', 'framework'];
        const hasArchitecturalQuestions = architecturalKeywords.some(keyword => 
          contextText.includes(keyword)
        );

        if (hasArchitecturalQuestions) {
          opportunities.push({
            targetAgent: 'architect',
            confidence: 0.70,
            reason: 'Architectural decisions or questions detected',
            suggestedAction: 'Architectural guidance and design review',
            context: {
              architecturalIndicators: architecturalKeywords.filter(k => contextText.includes(k))
            }
          });
        }
      }

      // QA completion patterns
      if (this.activeAgent === 'qa') {
        const qaIndicators = [
          'tests passing',
          'quality approved',
          'ready for deployment',
          'validation complete'
        ];

        const contextText = sharedContext.sessionNotes?.toLowerCase() || '';
        const hasQACompletion = qaIndicators.some(indicator => 
          contextText.includes(indicator)
        );

        if (hasQACompletion) {
          opportunities.push({
            targetAgent: 'sm',
            confidence: 0.80,
            reason: 'QA validation complete, ready for story management',
            suggestedAction: 'Story completion and next story planning',
            context: {
              qaIndicators: qaIndicators.filter(i => contextText.includes(i))
            }
          });
        }

        // Check for critical issues requiring dev attention
        const criticalKeywords = ['critical', 'blocker', 'regression', 'failed'];
        const hasCriticalIssues = criticalKeywords.some(keyword => 
          contextText.includes(keyword)
        );

        if (hasCriticalIssues) {
          opportunities.push({
            targetAgent: 'dev',
            confidence: 0.90,
            reason: 'Critical issues detected requiring development attention',
            suggestedAction: 'Issue resolution and bug fixes',
            context: {
              criticalIndicators: criticalKeywords.filter(k => contextText.includes(k))
            }
          });
        }
      }

      return opportunities.sort((a, b) => b.confidence - a.confidence);

    } catch (error) {
      console.warn('Failed to detect handoff opportunities:', error.message);
      return [];
    }
  }

  /**
   * Create enhanced handoff with Claude Code CLI context
   */
  async createEnhancedHandoff(targetAgent, options = {}) {
    try {
      // Generate intelligent context summary
      const contextSummary = await this.generateContextSummary(targetAgent);
      
      // Detect handoff opportunities
      const opportunities = await this.detectHandoffOpportunities();
      const relevantOpportunity = opportunities.find(opp => opp.targetAgent === targetAgent);

      // Generate smart suggestions for target agent
      const targetSuggestions = await this.generateTargetAgentSuggestions(targetAgent);

      // Create enhanced handoff package
      const handoffData = {
        sourceAgent: this.activeAgent,
        targetAgent: targetAgent,
        sessionContext: this.sessionContext,
        contextSummary: contextSummary,
        handoffOpportunity: relevantOpportunity,
        targetSuggestions: targetSuggestions,
        claudeCodeFeatures: {
          nativeCommands: true,
          autoSuggestions: true,
          contextAware: true,
          sessionContinuity: true
        },
        timestamp: new Date().toISOString()
      };

      // Use existing handoff manager to create the handoff
      const handoffResult = await this.handoffManager.createHandoff(
        this.activeAgent,
        targetAgent,
        this.sessionContext.sessionId,
        handoffData
      );

      // Update context with handoff information
      await this.contextManager.updateSharedContext({
        lastHandoff: {
          from: this.activeAgent,
          to: targetAgent,
          timestamp: handoffData.timestamp,
          handoffId: handoffResult.handoffId
        }
      }, this.sessionContext.sessionId, this.activeAgent);

      return {
        ...handoffResult,
        enhanced: true,
        contextSummary: contextSummary.summary,
        suggestions: targetSuggestions.length
      };

    } catch (error) {
      console.error('Failed to create enhanced handoff:', error.message);
      return { status: 'failed', error: error.message };
    }
  }

  /**
   * Generate intelligent context summary for target agent
   */
  async generateContextSummary(targetAgent) {
    try {
      const sharedContext = await this.contextManager.getSharedContext();
      const decisions = await this.contextManager.getDecisions();
      const progress = await this.contextManager.getProgress();

      const summary = {
        currentFocus: sharedContext.currentFocus || 'No specific focus defined',
        keyDecisions: decisions.slice(-3).map(d => ({
          title: d.title,
          decision: d.decision,
          impact: d.impact || 'Not specified'
        })),
        progressHighlights: {
          completedTasks: progress.completedTasks || 0,
          currentStory: progress.currentStory || 'No active story',
          qualityScore: progress.qualityScore || 'Not assessed'
        },
        nextSteps: this.generateNextSteps(targetAgent, sharedContext, progress),
        contextualNotes: this.generateContextualNotes(targetAgent, sharedContext, decisions)
      };

      return {
        targetAgent: targetAgent,
        summary: summary,
        relevanceScore: this.calculateRelevanceScore(targetAgent, summary),
        generatedAt: new Date().toISOString()
      };

    } catch (error) {
      console.warn('Failed to generate context summary:', error.message);
      return {
        targetAgent: targetAgent,
        summary: { error: 'Context summary unavailable' },
        relevanceScore: 0
      };
    }
  }

  /**
   * Generate smart suggestions for target agent
   */
  async generateTargetAgentSuggestions(targetAgent) {
    const suggestions = [];

    switch (targetAgent) {
      case 'dev':
        suggestions.push(
          'Use *develop-story to implement the next story systematically',
          'Run *reality-audit before marking any work complete',
          'Use *workspace-status to see current development context'
        );
        break;
      
      case 'qa':
        suggestions.push(
          'Use *reality-audit to perform comprehensive quality validation',
          'Review handoff context for completed development work',
          'Use *create-remediation if issues are found'
        );
        break;
      
      case 'architect':
        suggestions.push(
          'Review recent architectural decisions in workspace context',
          'Consider system design implications of current work',
          'Use *workspace-sync to get latest project context'
        );
        break;
      
      case 'sm':
        suggestions.push(
          'Use *draft to create the next development story',
          'Review progress and update project tracking',
          'Consider story scope and team capacity'
        );
        break;

      default:
        suggestions.push(
          'Use *workspace-status to understand current project state',
          'Review handoff context for relevant background',
          'Use *workspace-sync to get latest workspace updates'
        );
    }

    return suggestions;
  }

  /**
   * Generate contextual next steps for target agent
   */
  generateNextSteps(targetAgent, sharedContext, progress) {
    const nextSteps = [];

    // Add agent-specific next steps based on context
    if (targetAgent === 'dev' && progress.currentStory) {
      nextSteps.push(`Continue implementation of: ${progress.currentStory}`);
    }

    if (targetAgent === 'qa' && progress.completedTasks > 0) {
      nextSteps.push('Validate completed development work');
    }

    // Add generic next steps if no specific ones
    if (nextSteps.length === 0) {
      nextSteps.push(`Review workspace context and begin ${targetAgent} activities`);
    }

    return nextSteps;
  }

  /**
   * Generate contextual notes for target agent
   */
  generateContextualNotes(targetAgent, sharedContext, decisions) {
    const notes = [];

    // Add relevant decisions for the target agent
    const relevantDecisions = decisions.filter(d => 
      this.isDecisionRelevant(d, targetAgent)
    );

    if (relevantDecisions.length > 0) {
      notes.push(`${relevantDecisions.length} relevant architectural decisions available`);
    }

    // Add context-specific notes
    if (sharedContext.sessionNotes) {
      notes.push('Previous session context available');
    }

    return notes;
  }

  /**
   * Check if a decision is relevant to the target agent
   */
  isDecisionRelevant(decision, targetAgent) {
    const agentKeywords = {
      'dev': ['implementation', 'code', 'technical', 'development'],
      'qa': ['quality', 'testing', 'validation', 'standards'],
      'architect': ['architecture', 'design', 'structure', 'pattern'],
      'sm': ['scope', 'story', 'planning', 'timeline']
    };

    const keywords = agentKeywords[targetAgent] || [];
    const decisionText = `${decision.title} ${decision.decision}`.toLowerCase();
    
    return keywords.some(keyword => decisionText.includes(keyword));
  }

  /**
   * Calculate relevance score for context summary
   */
  calculateRelevanceScore(targetAgent, summary) {
    let score = 0.5; // Base score

    // Increase score based on available context
    if (summary.keyDecisions.length > 0) score += 0.2;
    if (summary.progressHighlights.completedTasks > 0) score += 0.2;
    if (summary.currentFocus !== 'No specific focus defined') score += 0.1;

    return Math.min(score, 1.0);
  }

  /**
   * Check workspace health for context-aware suggestions
   */
  async checkWorkspaceHealth() {
    try {
      // Simple health check implementation
      const workspaceDir = path.join(this.workspaceDir, '.workspace');
      const requiredDirs = ['sessions', 'context', 'handoffs', 'decisions', 'progress'];
      
      let issues = 0;
      for (const dir of requiredDirs) {
        if (!fs.existsSync(path.join(workspaceDir, dir))) {
          issues++;
        }
      }

      return { issues, healthy: issues === 0 };
    } catch (error) {
      return { issues: 1, healthy: false };
    }
  }
}

module.exports = ClaudeCodeContextIntegration;