const fs = require('fs');
const path = require('path');

class HandoffManager {
  constructor(workspacePath = null) {
    this.workspacePath = workspacePath || path.join(process.cwd(), '.workspace');
    this.handoffsPath = path.join(this.workspacePath, 'handoffs');
    this.contextPath = path.join(this.workspacePath, 'context');
    
    // Initialize directories
    this.initialize();
    
    // Agent-specific filtering rules with multi-role support
    this.agentFilters = {
      'dev': {
        includePatterns: ['technical', 'implementation', 'code', 'architecture', 'bug', 'feature'],
        excludePatterns: ['business', 'stakeholder', 'marketing'],
        requiredSections: ['technical details', 'code references', 'implementation requirements']
      },
      'qa': {
        includePatterns: ['testing', 'validation', 'quality', 'acceptance', 'bug', 'criteria'],
        excludePatterns: ['implementation details', 'code specifics'],
        requiredSections: ['acceptance criteria', 'testing requirements', 'quality standards']
      },
      'architect': {
        includePatterns: ['design', 'architecture', 'system', 'integration', 'technical', 'pattern'],
        excludePatterns: ['implementation specifics', 'testing details'],
        requiredSections: ['design decisions', 'technical constraints', 'system architecture']
      },
      'pm': {
        includePatterns: ['requirements', 'business', 'stakeholder', 'scope', 'timeline', 'priority'],
        excludePatterns: ['technical implementation', 'code details'],
        requiredSections: ['business requirements', 'stakeholder decisions', 'scope changes']
      },
      'ux-expert': {
        includePatterns: ['user', 'interface', 'experience', 'design', 'usability', 'interaction'],
        excludePatterns: ['backend', 'database', 'server'],
        requiredSections: ['user requirements', 'design specifications', 'usability considerations']
      },
      'analyst': {
        includePatterns: ['data', 'analysis', 'metrics', 'trends', 'insights', 'research', 'patterns', 'statistics'],
        excludePatterns: ['implementation', 'specific code'],
        requiredSections: ['data analysis', 'insights and trends', 'research findings']
      },
      'brainstorming': {
        includePatterns: ['creative', 'ideation', 'brainstorm', 'innovation', 'alternative', 'possibility', 'exploration'],
        excludePatterns: ['constraints', 'limitations', 'final decisions'],
        requiredSections: ['creative exploration', 'alternative approaches', 'innovative solutions']
      },
      'research': {
        includePatterns: ['research', 'investigation', 'study', 'benchmark', 'industry', 'best-practice', 'standards'],
        excludePatterns: ['implementation', 'specific solutions'],
        requiredSections: ['research methodology', 'findings and insights', 'recommendations']
      }
    };
    
    // Multi-role combinations for complex scenarios
    this.multiRoleFilters = {
      'dev-analyst': {
        primary: 'dev',
        secondary: 'analyst',
        description: 'Development with data analysis capabilities'
      },
      'qa-research': {
        primary: 'qa',
        secondary: 'research',
        description: 'Quality assurance with research methodologies'
      },
      'architect-brainstorming': {
        primary: 'architect',
        secondary: 'brainstorming',
        description: 'Architecture design with creative exploration'
      },
      'pm-analyst': {
        primary: 'pm',
        secondary: 'analyst',
        description: 'Project management with data analysis'
      },
      'ux-research': {
        primary: 'ux-expert',
        secondary: 'research',
        description: 'UX design with user research capabilities'
      }
    };
  }

  initialize() {
    if (!fs.existsSync(this.handoffsPath)) {
      fs.mkdirSync(this.handoffsPath, { recursive: true });
    }
  }

  async createHandoff(sourceAgent, targetAgent, context = {}) {
    try {
      const timestamp = new Date().toISOString();
      const handoffId = `${sourceAgent}-to-${targetAgent}-${timestamp.replace(/[:.]/g, '-')}`;
      const handoffFile = path.join(this.handoffsPath, `${handoffId}.md`);
      
      // Load workspace context using our ContextManager integration
      const workspaceContext = await this.loadWorkspaceContext();
      
      // Filter context for target agent
      const filteredContext = this.filterContextForAgent(workspaceContext, targetAgent);
      
      // Generate handoff package
      const handoffContent = await this.generateHandoffPackage({
        handoffId,
        sourceAgent,
        targetAgent,
        timestamp,
        context: filteredContext,
        customContext: context
      });
      
      // Validate handoff completeness
      const validation = this.validateHandoff(handoffContent, targetAgent);
      
      // Write handoff file
      fs.writeFileSync(handoffFile, handoffContent);
      
      // Update handoff registry
      await this.updateHandoffRegistry(handoffId, sourceAgent, targetAgent, validation);
      
      // Log handoff in audit trail
      await this.logHandoffEvent({
        handoffId,
        sourceAgent,
        targetAgent,
        timestamp,
        status: 'created',
        validationScore: validation.score,
        filePath: handoffFile
      });
      
      return {
        handoffId,
        filePath: handoffFile,
        validation,
        success: true
      };
      
    } catch (error) {
      console.error('Failed to create handoff:', error.message);
      throw error;
    }
  }

  async loadWorkspaceContext() {
    try {
      const context = {
        shared: {},
        decisions: [],
        progress: {},
        quality: {}
      };
      
      // Load shared context
      const sharedContextFile = path.join(this.contextPath, 'shared-context.md');
      if (fs.existsSync(sharedContextFile)) {
        context.shared = this.parseSharedContext(fs.readFileSync(sharedContextFile, 'utf8'));
      }
      
      // Load decisions
      const decisionsFile = path.join(this.workspacePath, 'decisions', 'decisions-log.md');
      if (fs.existsSync(decisionsFile)) {
        context.decisions = this.parseDecisions(fs.readFileSync(decisionsFile, 'utf8'));
      }
      
      // Load progress
      const progressFile = path.join(this.workspacePath, 'progress', 'progress-summary.md');
      if (fs.existsSync(progressFile)) {
        context.progress = this.parseProgress(fs.readFileSync(progressFile, 'utf8'));
      }
      
      // Load quality metrics
      const qualityFile = path.join(this.workspacePath, 'quality', 'quality-metrics.md');
      if (fs.existsSync(qualityFile)) {
        context.quality = this.parseQualityMetrics(fs.readFileSync(qualityFile, 'utf8'));
      }
      
      return context;
    } catch (error) {
      console.error('Failed to load workspace context:', error.message);
      return { shared: {}, decisions: [], progress: {}, quality: {} };
    }
  }

  parseSharedContext(content) {
    const context = {};
    
    try {
      const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\* (.+)/);
      if (lastUpdatedMatch) context.lastUpdated = lastUpdatedMatch[1];
      
      const primaryAgentMatch = content.match(/\*\*Primary Agent:\*\* (.+)/);
      if (primaryAgentMatch) context.primaryAgent = primaryAgentMatch[1];
      
      const currentFocusMatch = content.match(/## Current Focus\n([\s\S]*?)(?=\n## |$)/);
      if (currentFocusMatch) context.currentFocus = currentFocusMatch[1].trim();
      
      const nextStepsMatch = content.match(/## Next Steps\n([\s\S]*?)(?=\n## |$)/);
      if (nextStepsMatch) {
        context.nextSteps = nextStepsMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.substring(2).trim())
          .filter(step => step.length > 0);
      }
      
      const sessionNotesMatch = content.match(/## Session Notes\n([\s\S]*?)$/);
      if (sessionNotesMatch) context.sessionNotes = sessionNotesMatch[1].trim();
      
    } catch (error) {
      console.warn('Failed to parse shared context:', error.message);
    }
    
    return context;
  }

  parseDecisions(content) {
    const decisions = [];
    const decisionBlocks = content.split(/## Decision \d+:/);
    
    for (let i = 1; i < decisionBlocks.length; i++) {
      try {
        const block = decisionBlocks[i];
        const lines = block.split('\n');
        
        const decision = {
          id: `${i.toString().padStart(3, '0')}`,
          title: lines[0].trim(),
          date: this.extractField(block, 'Date'),
          agent: this.extractField(block, 'Agent'),
          context: this.extractField(block, 'Context'),
          decision: this.extractField(block, 'Decision'),
          rationale: this.extractField(block, 'Rationale'),
          impact: this.extractField(block, 'Impact'),
          status: this.extractField(block, 'Status')
        };
        
        decisions.push(decision);
      } catch (error) {
        console.warn(`Failed to parse decision block ${i}:`, error.message);
      }
    }
    
    return decisions.slice(-10); // Last 10 decisions for handoff
  }

  parseProgress(content) {
    const progress = {};
    
    try {
      const currentStoryMatch = content.match(/\*\*Current Story:\*\* (.+)/);
      if (currentStoryMatch) progress.currentStory = currentStoryMatch[1];
      
      const qualityScoreMatch = content.match(/\*\*Quality Score:\*\* (.+)/);
      if (qualityScoreMatch) progress.qualityScore = qualityScoreMatch[1];
      
      const completedMatch = content.match(/## Completed Tasks\n([\s\S]*?)(?=\n## |$)/);
      if (completedMatch) {
        progress.completedTasks = completedMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- ✅'))
          .map(line => line.substring(4).trim())
          .filter(task => task.length > 0);
      }
      
      const pendingMatch = content.match(/## Pending Tasks\n([\s\S]*?)(?=\n## |$)/);
      if (pendingMatch) {
        progress.pendingTasks = pendingMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- ⏳'))
          .map(line => line.substring(4).trim())
          .filter(task => task.length > 0);
      }
      
      const blockersMatch = content.match(/## Blockers\n([\s\S]*?)$/);
      if (blockersMatch) {
        progress.blockers = blockersMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- 🚫'))
          .map(line => line.substring(4).trim())
          .filter(blocker => blocker.length > 0);
      }
      
    } catch (error) {
      console.warn('Failed to parse progress:', error.message);
    }
    
    return progress;
  }

  parseQualityMetrics(content) {
    const quality = {};
    
    try {
      // Get the most recent quality assessment
      const assessments = content.split('## Quality Assessment -');
      if (assessments.length > 1) {
        const latest = assessments[1];
        quality.timestamp = latest.split('\n')[0].trim();
        quality.agent = this.extractField(latest, 'Agent');
        quality.story = this.extractField(latest, 'Story');
        quality.realityAuditScore = this.extractField(latest, 'Reality Audit Score');
        quality.overallQuality = this.extractField(latest, 'Overall Quality');
      }
    } catch (error) {
      console.warn('Failed to parse quality metrics:', error.message);
    }
    
    return quality;
  }

  extractField(content, fieldName) {
    const regex = new RegExp(`\\*\\*${fieldName}:\\*\\* (.+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  filterContextForAgent(context, targetAgent) {
    const agentType = this.getAgentType(targetAgent);
    
    // Handle multi-role filtering
    if (this.multiRoleFilters[agentType]) {
      return this.filterMultiRoleContext(context, agentType);
    }
    
    // Handle single role filtering
    const filter = this.agentFilters[agentType] || this.agentFilters['dev']; // Default to dev filter
    
    const filtered = {
      shared: context.shared,
      decisions: this.filterDecisions(context.decisions, filter),
      progress: context.progress,
      quality: context.quality,
      relevantContent: this.extractRelevantContent(context, filter),
      roleType: 'single',
      primaryRole: agentType
    };
    
    return filtered;
  }

  filterMultiRoleContext(context, multiRoleType) {
    const multiRole = this.multiRoleFilters[multiRoleType];
    const primaryFilter = this.agentFilters[multiRole.primary];
    const secondaryFilter = this.agentFilters[multiRole.secondary];
    
    // Combine include patterns from both roles
    const combinedIncludePatterns = [
      ...primaryFilter.includePatterns,
      ...secondaryFilter.includePatterns
    ];
    
    // Use primary role's exclude patterns but remove conflicts with secondary role
    const combinedExcludePatterns = primaryFilter.excludePatterns.filter(
      pattern => !secondaryFilter.includePatterns.includes(pattern)
    );
    
    const combinedFilter = {
      includePatterns: combinedIncludePatterns,
      excludePatterns: combinedExcludePatterns,
      requiredSections: [
        ...primaryFilter.requiredSections,
        ...secondaryFilter.requiredSections
      ]
    };
    
    const filtered = {
      shared: context.shared,
      decisions: this.filterDecisions(context.decisions, combinedFilter), 
      progress: context.progress,
      quality: context.quality,
      relevantContent: this.extractRelevantContent(context, combinedFilter),
      roleType: 'multi',
      primaryRole: multiRole.primary,
      secondaryRole: multiRole.secondary,
      roleDescription: multiRole.description
    };
    
    return filtered;
  }

  getAgentType(agentName) {
    const lowerName = agentName.toLowerCase();
    
    // Check for multi-role patterns first (e.g., "dev-analyst", "qa+research")
    const multiRolePatterns = [
      { pattern: ['dev', 'analyst'], type: 'dev-analyst' },
      { pattern: ['qa', 'research'], type: 'qa-research' },
      { pattern: ['architect', 'brainstorm'], type: 'architect-brainstorming' },
      { pattern: ['pm', 'analyst'], type: 'pm-analyst' },
      { pattern: ['ux', 'research'], type: 'ux-research' }
    ];
    
    for (const multiRole of multiRolePatterns) {
      if (multiRole.pattern.every(part => lowerName.includes(part))) {
        return multiRole.type;
      }
    }
    
    // Check for specialized roles
    if (lowerName.includes('analyst') || lowerName.includes('analysis')) return 'analyst';
    if (lowerName.includes('brainstorm') || lowerName.includes('creative')) return 'brainstorming';
    if (lowerName.includes('research') || lowerName.includes('investigat')) return 'research';
    
    // Check for primary roles
    if (lowerName.includes('dev') || lowerName.includes('developer')) return 'dev';
    if (lowerName.includes('qa') || lowerName.includes('test')) return 'qa';
    if (lowerName.includes('arch') || lowerName.includes('architect')) return 'architect';
    if (lowerName.includes('pm') || lowerName.includes('manager')) return 'pm';
    if (lowerName.includes('ux') || lowerName.includes('design')) return 'ux-expert';
    
    return 'dev'; // Default fallback
  }

  filterDecisions(decisions, filter) {
    return decisions.filter(decision => {
      const decisionText = `${decision.title} ${decision.decision} ${decision.rationale} ${decision.impact}`.toLowerCase();
      
      // Check if decision matches include patterns
      const matchesInclude = filter.includePatterns.some(pattern => 
        decisionText.includes(pattern.toLowerCase())
      );
      
      // Check if decision matches exclude patterns
      const matchesExclude = filter.excludePatterns.some(pattern => 
        decisionText.includes(pattern.toLowerCase())
      );
      
      return matchesInclude && !matchesExclude;
    });
  }

  extractRelevantContent(context, filter) {
    const relevant = [];
    
    // Extract relevant next steps
    if (context.shared.nextSteps) {
      context.shared.nextSteps.forEach(step => {
        const stepText = step.toLowerCase();
        const isRelevant = filter.includePatterns.some(pattern => 
          stepText.includes(pattern.toLowerCase())
        );
        
        if (isRelevant) {
          relevant.push(`Next Step: ${step}`);
        }
      });
    }
    
    // Extract relevant progress items
    if (context.progress.pendingTasks) {
      context.progress.pendingTasks.forEach(task => {
        const taskText = task.toLowerCase();
        const isRelevant = filter.includePatterns.some(pattern => 
          taskText.includes(pattern.toLowerCase())
        );
        
        if (isRelevant) {
          relevant.push(`Pending Task: ${task}`);
        }
      });
    }
    
    return relevant;
  }

  async generateHandoffPackage(params) {
    const {
      handoffId,
      sourceAgent,
      targetAgent,
      timestamp,
      context,
      customContext
    } = params;
    
    const agentType = this.getAgentType(targetAgent);
    const nextActions = this.generateNextActions(context, agentType);
    const fileReferences = this.generateFileReferences(context);
    const blockers = this.extractBlockers(context);
    
    return `# Agent Handoff: ${sourceAgent} → ${targetAgent}

**Created:** ${timestamp}
**Handoff ID:** ${handoffId}
**Source Agent:** ${sourceAgent}
**Target Agent:** ${targetAgent}
**Target Agent Type:** ${agentType}

## Context Summary
${context.shared.currentFocus || 'No current focus available.'}

${customContext.summary || ''}

## Key Decisions Made
${context.decisions.map(d => `- **${d.title}** (${d.agent}, ${d.date}): ${d.decision}`).join('\n') || '- No relevant decisions for this agent type'}

## Current Progress
**Story:** ${context.progress.currentStory || 'No active story'}
**Quality Score:** ${context.progress.qualityScore || 'Not assessed'}

**Completed Tasks:**
${context.progress.completedTasks ? context.progress.completedTasks.map(task => `- ✅ ${task}`).join('\n') : '- No completed tasks'}

**Pending Tasks:**
${context.progress.pendingTasks ? context.progress.pendingTasks.map(task => `- ⏳ ${task}`).join('\n') : '- No pending tasks'}

## Next Actions for ${targetAgent}
${nextActions.map(action => `- [ ] ${action}`).join('\n')}

## Files and References
${fileReferences.join('\n') || '- No specific file references available'}

## Blockers and Dependencies
${blockers.join('\n') || '- No blockers identified'}

## Quality Metrics
${context.quality.overallQuality ? `**Latest Quality Score:** ${context.quality.overallQuality}` : 'No quality metrics available'}
${context.quality.story ? `**Last Assessed Story:** ${context.quality.story}` : ''}

## Relevant Context
${context.relevantContent.map(item => `- ${item}`).join('\n') || '- No additional relevant context'}

## Handoff Validation
- [ ] Context completeness verified
- [ ] Decisions documented and relevant
- [ ] Next actions clearly defined for ${agentType} role  
- [ ] References included
- [ ] Quality metrics current
- [ ] Agent-specific filtering applied
- [ ] Blockers and dependencies identified

## Handoff Notes
${customContext.notes || 'No additional notes provided.'}

---
*Generated by BMAD Agent Handoff System v1.0*
*Handoff Quality Score: ${this.calculateHandoffScore(context, agentType)}/100*
`;
  }

  generateNextActions(context, agentType) {
    const actions = [];
    
    // Handle multi-role actions
    if (this.multiRoleFilters[agentType]) {
      return this.generateMultiRoleActions(context, agentType);
    }
    
    // Handle single-role actions
    switch (agentType) {
      case 'dev':
        actions.push('Review technical requirements and architecture decisions');
        actions.push('Examine current code implementation status');
        actions.push('Address any pending technical tasks or bugs');
        if (context.progress.blockers && context.progress.blockers.length > 0) {
          actions.push('Resolve identified blockers and technical dependencies');
        }
        break;
        
      case 'qa':
        actions.push('Review acceptance criteria and testing requirements');
        actions.push('Validate completed functionality against requirements');
        actions.push('Execute test cases and identify quality issues');
        actions.push('Update quality metrics and provide feedback');
        break;
        
      case 'architect':
        actions.push('Review system design and architectural decisions');
        actions.push('Validate technical approach and integration points');
        actions.push('Assess scalability and performance implications');
        actions.push('Document any new architectural requirements');
        break;
        
      case 'pm':
        actions.push('Review project scope and timeline status');
        actions.push('Assess stakeholder requirements and priority changes');
        actions.push('Update project planning and resource allocation');
        actions.push('Communicate progress to stakeholders');
        break;
        
      case 'ux-expert':
        actions.push('Review user experience requirements and design specifications');
        actions.push('Validate interface design and usability considerations');
        actions.push('Assess user interaction patterns and feedback');
        actions.push('Update design documentation and prototypes');
        break;
        
      case 'analyst':
        actions.push('Analyze available data and identify key patterns');
        actions.push('Generate insights from metrics and performance data');
        actions.push('Create data visualization and trend analysis');
        actions.push('Provide data-driven recommendations');
        break;
        
      case 'brainstorming':
        actions.push('Explore creative alternatives and innovative approaches');
        actions.push('Generate multiple solution options without constraints');
        actions.push('Challenge existing assumptions and think outside the box');
        actions.push('Facilitate ideation sessions and creative problem-solving');
        break;
        
      case 'research':
        actions.push('Conduct comprehensive research on relevant topics');
        actions.push('Investigate industry best practices and standards');
        actions.push('Gather evidence and benchmark against competitors');
        actions.push('Synthesize research findings into actionable insights');
        break;
        
      default:
        actions.push('Review handoff context and understand current state');
        actions.push('Identify specific tasks relevant to your role');
        actions.push('Address any pending items in your domain');
    }
    
    // Add context-specific actions
    if (context.shared.nextSteps) {
      context.shared.nextSteps.forEach(step => {
        if (!actions.some(action => action.toLowerCase().includes(step.toLowerCase().substring(0, 20)))) {
          actions.push(step);
        }
      });
    }
    
    return actions.slice(0, 8); // Limit to 8 actions for readability
  }

  generateMultiRoleActions(context, multiRoleType) {
    const multiRole = this.multiRoleFilters[multiRoleType];
    const actions = [];
    
    switch (multiRoleType) {
      case 'dev-analyst':
        actions.push('Analyze current system performance and identify optimization opportunities');
        actions.push('Review code metrics and technical debt patterns');
        actions.push('Implement data-driven development improvements');
        actions.push('Create performance monitoring and analysis dashboards');
        actions.push('Research and apply evidence-based development practices');
        break;
        
      case 'qa-research':
        actions.push('Research industry testing standards and compliance frameworks');
        actions.push('Investigate best practices for quality assurance methodologies');
        actions.push('Analyze quality trends and benchmark against industry standards');
        actions.push('Design comprehensive testing strategies based on research findings');
        actions.push('Validate testing approaches through evidence-based research');
        break;
        
      case 'architect-brainstorming':
        actions.push('Explore creative architectural patterns and innovative design approaches');
        actions.push('Brainstorm multiple system design alternatives without constraints');
        actions.push('Challenge conventional architecture assumptions');
        actions.push('Generate innovative solutions for complex integration challenges');
        actions.push('Facilitate collaborative design exploration sessions');
        break;
        
      case 'pm-analyst':
        actions.push('Analyze project data to identify trends and optimization opportunities');
        actions.push('Research stakeholder feedback and user behavior patterns');
        actions.push('Create data-driven project prioritization and resource allocation');
        actions.push('Generate insights from project metrics and timeline analysis');
        actions.push('Develop evidence-based project planning and risk assessment');
        break;
        
      case 'ux-research':
        actions.push('Conduct user research and usability studies');
        actions.push('Investigate accessibility standards and inclusive design practices');
        actions.push('Analyze user behavior data and interaction patterns');
        actions.push('Research industry UX trends and best practices');
        actions.push('Validate design decisions through evidence-based user research');
        break;
        
      default:
        actions.push('Apply multi-role perspective to current challenges');
        actions.push('Integrate primary and secondary role capabilities');
        actions.push('Provide comprehensive analysis from multiple viewpoints');
    }
    
    // Add context-specific actions
    if (context.shared.nextSteps) {
      context.shared.nextSteps.forEach(step => {
        if (!actions.some(action => action.toLowerCase().includes(step.toLowerCase().substring(0, 20)))) {
          actions.push(step);
        }
      });
    }
    
    return actions.slice(0, 10); // Allow more actions for multi-role scenarios
  }

  generateFileReferences(context) {
    const references = [];
    
    // Add standard workspace references
    references.push('📁 `.workspace/context/shared-context.md` - Current workspace context');
    references.push('📋 `.workspace/decisions/decisions-log.md` - Architectural decisions');
    references.push('📈 `.workspace/progress/progress-summary.md` - Development progress');
    references.push('📊 `.workspace/quality/quality-metrics.md` - Quality assessments');
    
    // Add story-specific references if available
    if (context.progress.currentStory) {
      references.push(`📖 Story documentation for: ${context.progress.currentStory}`);
    }
    
    return references;
  }

  extractBlockers(context) {
    const blockers = [];
    
    if (context.progress.blockers && context.progress.blockers.length > 0) {
      context.progress.blockers.forEach(blocker => {
        blockers.push(`🚫 ${blocker}`);
      });
    }
    
    // Check for decision-based blockers
    context.decisions.forEach(decision => {
      if (decision.status === 'pending' || decision.impact.toLowerCase().includes('blocker')) {
        blockers.push(`⚠️ Decision pending: ${decision.title}`);
      }
    });
    
    return blockers;
  }

  validateHandoff(handoffContent, targetAgent) {
    const validation = {
      score: 0,
      maxScore: 100,
      issues: [],
      strengths: []
    };
    
    const agentType = this.getAgentType(targetAgent);
    const requiredSections = this.agentFilters[agentType]?.requiredSections || [];
    
    // Check required sections (30 points)
    let sectionsFound = 0;
    requiredSections.forEach(section => {
      if (handoffContent.toLowerCase().includes(section.toLowerCase())) {
        sectionsFound++;
        validation.strengths.push(`Required section present: ${section}`);
      } else {
        validation.issues.push(`Missing required section: ${section}`);
      }
    });
    
    if (requiredSections.length > 0) {
      validation.score += (sectionsFound / requiredSections.length) * 30;
    } else {
      validation.score += 30; // No specific requirements
    }
    
    // Check context completeness (25 points)
    const hasContext = handoffContent.includes('## Context Summary') && 
                      handoffContent.length > 500;
    if (hasContext) {
      validation.score += 25;
      validation.strengths.push('Comprehensive context summary provided');
    } else {
      validation.issues.push('Context summary incomplete or missing');
    }
    
    // Check decisions documentation (20 points)
    const hasDecisions = handoffContent.includes('## Key Decisions Made');
    if (hasDecisions) {
      validation.score += 20;
      validation.strengths.push('Key decisions documented');
    } else {
      validation.issues.push('Key decisions not documented');
    }
    
    // Check next actions (15 points)
    const hasNextActions = handoffContent.includes('## Next Actions for') &&
                          handoffContent.includes('- [ ]');
    if (hasNextActions) {
      validation.score += 15;
      validation.strengths.push('Clear next actions defined');
    } else {
      validation.issues.push('Next actions unclear or missing');
    }
    
    // Check references (10 points)
    const hasReferences = handoffContent.includes('## Files and References');
    if (hasReferences) {
      validation.score += 10;
      validation.strengths.push('File references provided');
    } else {
      validation.issues.push('File references missing');
    }
    
    validation.grade = this.scoreToGrade(validation.score);
    
    return validation;
  }

  scoreToGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  calculateHandoffScore(context, agentType) {
    let score = 50; // Base score
    
    // Add points for context richness
    if (context.shared.currentFocus) score += 10;
    if (context.decisions.length > 0) score += 15;
    if (context.progress.currentStory) score += 10;
    if (context.quality.overallQuality) score += 10;
    if (context.relevantContent.length > 0) score += 5;
    
    return Math.min(score, 100);
  }

  async updateHandoffRegistry(handoffId, sourceAgent, targetAgent, validation) {
    try {
      const registryFile = path.join(this.handoffsPath, 'handoff-registry.json');
      let registry = [];
      
      if (fs.existsSync(registryFile)) {
        const content = fs.readFileSync(registryFile, 'utf8');
        registry = JSON.parse(content);
      }
      
      registry.push({
        handoffId,
        sourceAgent,
        targetAgent,
        timestamp: new Date().toISOString(),
        validationScore: validation.score,
        grade: validation.grade,
        status: 'pending'
      });
      
      // Keep only last 100 handoffs
      if (registry.length > 100) {
        registry = registry.slice(-100);
      }
      
      fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2));
    } catch (error) {
      console.error('Failed to update handoff registry:', error.message);
    }
  }

  async logHandoffEvent(event) {
    try {
      const auditFile = path.join(this.handoffsPath, 'audit-trail.md');
      let auditContent = '';
      
      if (fs.existsSync(auditFile)) {
        auditContent = fs.readFileSync(auditFile, 'utf8');
      } else {
        auditContent = '# Handoff Audit Trail\n\n';
      }
      
      const logEntry = `## Handoff ${event.handoffId}
**Timestamp:** ${event.timestamp}
**Source:** ${event.sourceAgent}
**Target:** ${event.targetAgent}
**Status:** ${event.status}
**Validation Score:** ${event.validationScore}/100
**File:** ${event.filePath}

---

`;
      
      auditContent += logEntry;
      fs.writeFileSync(auditFile, auditContent);
    } catch (error) {
      console.error('Failed to log handoff event:', error.message);
    }
  }

  async getPendingHandoffs(targetAgent = null) {
    try {
      const registryFile = path.join(this.handoffsPath, 'handoff-registry.json');
      
      if (!fs.existsSync(registryFile)) {
        return [];
      }
      
      const content = fs.readFileSync(registryFile, 'utf8');
      const registry = JSON.parse(content);
      
      let pending = registry.filter(handoff => handoff.status === 'pending');
      
      if (targetAgent) {
        pending = pending.filter(handoff => handoff.targetAgent === targetAgent);
      }
      
      return pending.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Failed to get pending handoffs:', error.message);
      return [];
    }
  }

  async getHandoffStats() {
    try {
      const registryFile = path.join(this.handoffsPath, 'handoff-registry.json');
      
      if (!fs.existsSync(registryFile)) {
        return { total: 0, pending: 0, avgScore: 0, gradeDistribution: {} };
      }
      
      const content = fs.readFileSync(registryFile, 'utf8');
      const registry = JSON.parse(content);
      
      const stats = {
        total: registry.length,
        pending: registry.filter(h => h.status === 'pending').length,
        avgScore: registry.reduce((sum, h) => sum + h.validationScore, 0) / registry.length,
        gradeDistribution: {}
      };
      
      // Calculate grade distribution
      registry.forEach(handoff => {
        stats.gradeDistribution[handoff.grade] = (stats.gradeDistribution[handoff.grade] || 0) + 1;
      });
      
      return stats;
    } catch (error) {
      console.error('Failed to get handoff stats:', error.message);
      return { total: 0, pending: 0, avgScore: 0, gradeDistribution: {} };
    }
  }
}

module.exports = HandoffManager;