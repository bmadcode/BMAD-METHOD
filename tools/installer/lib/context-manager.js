const fs = require('fs');
const path = require('path');

class ContextManager {
  constructor(workspacePath = null) {
    this.workspacePath = workspacePath || path.join(process.cwd(), '.workspace');
    this.contextPath = path.join(this.workspacePath, 'context');
    this.decisionsPath = path.join(this.workspacePath, 'decisions');
    this.progressPath = path.join(this.workspacePath, 'progress');
    this.qualityPath = path.join(this.workspacePath, 'quality');
    this.archivePath = path.join(this.workspacePath, 'archive');
    this.versionsPath = path.join(this.workspacePath, 'versions');
    this.locksPath = path.join(this.workspacePath, 'locks');
    
    // Context file size threshold for compaction (10MB default)
    this.maxContextSize = 10 * 1024 * 1024;
    
    // Context versioning settings
    this.maxVersions = 50; // Keep last 50 versions
    this.conflictResolutionStrategy = 'merge'; // 'merge', 'overwrite', 'manual'
    
    // Initialize if needed
    this.initialize();
  }

  initialize() {
    // Ensure all context directories exist
    const dirs = [this.contextPath, this.decisionsPath, this.progressPath, this.qualityPath, this.archivePath, this.versionsPath, this.locksPath];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  // SHARED CONTEXT MANAGEMENT
  async updateSharedContext(updates) {
    try {
      const contextFile = path.join(this.contextPath, 'shared-context.md');
      let context = await this.loadSharedContext();
      
      // Merge updates with existing context
      const updatedContext = {
        ...context,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      
      const contextContent = this.formatSharedContext(updatedContext);
      fs.writeFileSync(contextFile, contextContent);
      
      // Check if compaction is needed
      await this.checkContextCompaction(contextFile);
      
      return updatedContext;
    } catch (error) {
      console.error('Failed to update shared context:', error.message);
      throw error;
    }
  }

  async loadSharedContext() {
    try {
      const contextFile = path.join(this.contextPath, 'shared-context.md');
      
      if (!fs.existsSync(contextFile)) {
        return this.getDefaultSharedContext();
      }
      
      const content = fs.readFileSync(contextFile, 'utf8');
      return this.parseSharedContext(content);
    } catch (error) {
      console.error('Failed to load shared context:', error.message);
      return this.getDefaultSharedContext();
    }
  }

  getDefaultSharedContext() {
    return {
      lastUpdated: new Date().toISOString(),
      activeSessions: [],
      primaryAgent: 'unknown',
      currentFocus: 'No active development focus',
      keyDecisions: [],
      nextSteps: [],
      sessionNotes: ''
    };
  }

  formatSharedContext(context) {
    return `# Workspace Context

**Last Updated:** ${context.lastUpdated}
**Active Sessions:** ${context.activeSessions.join(', ') || 'None'}
**Primary Agent:** ${context.primaryAgent}

## Current Focus
${context.currentFocus}

## Key Decisions
${context.keyDecisions.map(decision => `- ${decision}`).join('\n') || '- No decisions recorded yet'}

## Next Steps
${context.nextSteps.map(step => `- ${step}`).join('\n') || '- No next steps defined yet'}

## Session Notes
${context.sessionNotes || 'No session notes available'}
`;
  }

  parseSharedContext(content) {
    const context = this.getDefaultSharedContext();
    
    try {
      // Extract metadata
      const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\* (.+)/);
      if (lastUpdatedMatch) context.lastUpdated = lastUpdatedMatch[1];
      
      const activeSessionsMatch = content.match(/\*\*Active Sessions:\*\* (.+)/);
      if (activeSessionsMatch && activeSessionsMatch[1] !== 'None') {
        context.activeSessions = activeSessionsMatch[1].split(', ').map(s => s.trim());
      }
      
      const primaryAgentMatch = content.match(/\*\*Primary Agent:\*\* (.+)/);
      if (primaryAgentMatch) context.primaryAgent = primaryAgentMatch[1];
      
      // Extract sections
      const currentFocusMatch = content.match(/## Current Focus\n([\s\S]*?)(?=\n## |$)/);
      if (currentFocusMatch) context.currentFocus = currentFocusMatch[1].trim();
      
      const keyDecisionsMatch = content.match(/## Key Decisions\n([\s\S]*?)(?=\n## |$)/);
      if (keyDecisionsMatch) {
        context.keyDecisions = keyDecisionsMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.substring(2).trim())
          .filter(decision => decision && !decision.includes('No decisions recorded'));
      }
      
      const nextStepsMatch = content.match(/## Next Steps\n([\s\S]*?)(?=\n## |$)/);
      if (nextStepsMatch) {
        context.nextSteps = nextStepsMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.substring(2).trim())
          .filter(step => step && !step.includes('No next steps defined'));
      }
      
      const sessionNotesMatch = content.match(/## Session Notes\n([\s\S]*?)$/);
      if (sessionNotesMatch) context.sessionNotes = sessionNotesMatch[1].trim();
      
    } catch (error) {
      console.warn('Failed to parse shared context, using defaults:', error.message);
    }
    
    return context;
  }

  // DECISIONS LOGGING
  async logDecision(decision) {
    try {
      const decisionsFile = path.join(this.decisionsPath, 'decisions-log.md');
      let existingContent = '';
      
      if (fs.existsSync(decisionsFile)) {
        existingContent = fs.readFileSync(decisionsFile, 'utf8');
      } else {
        existingContent = '# Architectural & Design Decisions\n\n';
      }
      
      // Generate decision ID
      const decisionCount = (existingContent.match(/## Decision \d+:/g) || []).length;
      const decisionId = String(decisionCount + 1).padStart(3, '0');
      
      const decisionEntry = `## Decision ${decisionId}: ${decision.title}
**Date:** ${decision.date || new Date().toISOString()}
**Agent:** ${decision.agent || 'unknown'}
**Context:** ${decision.context || 'No context provided'}
**Decision:** ${decision.decision}
**Rationale:** ${decision.rationale || 'No rationale provided'}
**Alternatives:** ${decision.alternatives || 'No alternatives considered'}
**Impact:** ${decision.impact || 'Impact not assessed'}
**Status:** ${decision.status || 'active'}

`;
      
      const updatedContent = existingContent + decisionEntry;
      fs.writeFileSync(decisionsFile, updatedContent);
      
      // Update shared context with new decision
      const context = await this.loadSharedContext();
      context.keyDecisions.push(`${decision.title} (${decision.date || new Date().toISOString().split('T')[0]})`);
      await this.updateSharedContext(context);
      
      return decisionId;
    } catch (error) {
      console.error('Failed to log decision:', error.message);
      throw error;
    }
  }

  async getDecisions(filters = {}) {
    try {
      const decisionsFile = path.join(this.decisionsPath, 'decisions-log.md');
      
      if (!fs.existsSync(decisionsFile)) {
        return [];
      }
      
      const content = fs.readFileSync(decisionsFile, 'utf8');
      const decisions = this.parseDecisions(content);
      
      // Apply filters
      let filteredDecisions = decisions;
      
      if (filters.agent) {
        filteredDecisions = filteredDecisions.filter(d => d.agent === filters.agent);
      }
      
      if (filters.status) {
        filteredDecisions = filteredDecisions.filter(d => d.status === filters.status);
      }
      
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        filteredDecisions = filteredDecisions.filter(d => new Date(d.date) >= fromDate);
      }
      
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        filteredDecisions = filteredDecisions.filter(d => new Date(d.date) <= toDate);
      }
      
      return filteredDecisions;
    } catch (error) {
      console.error('Failed to get decisions:', error.message);
      return [];
    }
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
          alternatives: this.extractField(block, 'Alternatives'),
          impact: this.extractField(block, 'Impact'),
          status: this.extractField(block, 'Status')
        };
        
        decisions.push(decision);
      } catch (error) {
        console.warn(`Failed to parse decision block ${i}:`, error.message);
      }
    }
    
    return decisions;
  }

  extractField(content, fieldName) {
    const regex = new RegExp(`\\*\\*${fieldName}:\\*\\* (.+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  // PROGRESS TRACKING
  async updateProgress(progressUpdate) {
    try {
      const progressFile = path.join(this.progressPath, 'progress-summary.md');
      let progress = await this.loadProgress();
      
      // Merge updates
      const updatedProgress = {
        ...progress,
        ...progressUpdate,
        lastUpdated: new Date().toISOString()
      };
      
      const progressContent = this.formatProgress(updatedProgress);
      fs.writeFileSync(progressFile, progressContent);
      
      // Update shared context
      const context = await this.loadSharedContext();
      if (progressUpdate.currentStory) {
        context.currentFocus = progressUpdate.currentStory;
      }
      if (progressUpdate.nextSteps) {
        context.nextSteps = progressUpdate.nextSteps;
      }
      await this.updateSharedContext(context);
      
      return updatedProgress;
    } catch (error) {
      console.error('Failed to update progress:', error.message);
      throw error;
    }
  }

  async loadProgress() {
    try {
      const progressFile = path.join(this.progressPath, 'progress-summary.md');
      
      if (!fs.existsSync(progressFile)) {
        return this.getDefaultProgress();
      }
      
      const content = fs.readFileSync(progressFile, 'utf8');
      return this.parseProgress(content);
    } catch (error) {
      console.error('Failed to load progress:', error.message);
      return this.getDefaultProgress();
    }
  }

  getDefaultProgress() {
    return {
      lastUpdated: new Date().toISOString(),
      currentStory: 'No active story',
      completedTasks: [],
      pendingTasks: [],
      blockers: [],
      qualityScore: 'Not assessed'
    };
  }

  formatProgress(progress) {
    return `# Development Progress Summary

**Last Updated:** ${progress.lastUpdated}
**Current Story:** ${progress.currentStory}
**Quality Score:** ${progress.qualityScore}

## Completed Tasks
${progress.completedTasks.map(task => `- ✅ ${task}`).join('\n') || '- No tasks completed yet'}

## Pending Tasks
${progress.pendingTasks.map(task => `- ⏳ ${task}`).join('\n') || '- No pending tasks'}

## Blockers
${progress.blockers.map(blocker => `- 🚫 ${blocker}`).join('\n') || '- No blockers identified'}
`;
  }

  parseProgress(content) {
    const progress = this.getDefaultProgress();
    
    try {
      // Extract metadata
      const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\* (.+)/);
      if (lastUpdatedMatch) progress.lastUpdated = lastUpdatedMatch[1];
      
      const currentStoryMatch = content.match(/\*\*Current Story:\*\* (.+)/);
      if (currentStoryMatch) progress.currentStory = currentStoryMatch[1];
      
      const qualityScoreMatch = content.match(/\*\*Quality Score:\*\* (.+)/);
      if (qualityScoreMatch) progress.qualityScore = qualityScoreMatch[1];
      
      // Extract task lists
      const completedMatch = content.match(/## Completed Tasks\n([\s\S]*?)(?=\n## |$)/);
      if (completedMatch) {
        progress.completedTasks = completedMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- ✅'))
          .map(line => line.substring(4).trim())
          .filter(task => task && !task.includes('No tasks completed'));
      }
      
      const pendingMatch = content.match(/## Pending Tasks\n([\s\S]*?)(?=\n## |$)/);
      if (pendingMatch) {
        progress.pendingTasks = pendingMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- ⏳'))
          .map(line => line.substring(4).trim())
          .filter(task => task && !task.includes('No pending tasks'));
      }
      
      const blockersMatch = content.match(/## Blockers\n([\s\S]*?)$/);
      if (blockersMatch) {
        progress.blockers = blockersMatch[1]
          .split('\n')
          .filter(line => line.startsWith('- 🚫'))
          .map(line => line.substring(4).trim())
          .filter(blocker => blocker && !blocker.includes('No blockers'));
      }
      
    } catch (error) {
      console.warn('Failed to parse progress, using defaults:', error.message);
    }
    
    return progress;
  }

  // QUALITY METRICS
  async updateQualityMetrics(metrics) {
    try {
      const qualityFile = path.join(this.qualityPath, 'quality-metrics.md');
      const timestamp = new Date().toISOString();
      
      let existingContent = '';
      if (fs.existsSync(qualityFile)) {
        existingContent = fs.readFileSync(qualityFile, 'utf8');
      } else {
        existingContent = '# Quality Metrics History\n\n';
      }
      
      const metricsEntry = `## Quality Assessment - ${timestamp}
**Agent:** ${metrics.agent || 'unknown'}
**Story:** ${metrics.story || 'unknown'}
**Reality Audit Score:** ${metrics.realityAuditScore || 'N/A'}
**Pattern Compliance:** ${metrics.patternCompliance || 'N/A'}
**Technical Debt Score:** ${metrics.technicalDebtScore || 'N/A'}
**Overall Quality:** ${metrics.overallQuality || 'N/A'}

**Details:**
${metrics.details || 'No additional details provided'}

---

`;
      
      const updatedContent = existingContent + metricsEntry;
      fs.writeFileSync(qualityFile, updatedContent);
      
      // Update progress with quality score
      const progress = await this.loadProgress();
      progress.qualityScore = metrics.overallQuality || metrics.realityAuditScore || 'Updated';
      await this.updateProgress(progress);
      
      return metrics;
    } catch (error) {
      console.error('Failed to update quality metrics:', error.message);
      throw error;
    }
  }

  async getLatestQualityMetrics() {
    try {
      const qualityFile = path.join(this.qualityPath, 'quality-metrics.md');
      
      if (!fs.existsSync(qualityFile)) {
        return null;
      }
      
      const content = fs.readFileSync(qualityFile, 'utf8');
      const assessments = content.split('## Quality Assessment -');
      
      if (assessments.length < 2) {
        return null;
      }
      
      // Get the most recent assessment
      const latestAssessment = assessments[1];
      
      return {
        timestamp: latestAssessment.split('\n')[0].trim(),
        agent: this.extractField(latestAssessment, 'Agent'),
        story: this.extractField(latestAssessment, 'Story'),
        realityAuditScore: this.extractField(latestAssessment, 'Reality Audit Score'),
        patternCompliance: this.extractField(latestAssessment, 'Pattern Compliance'),
        technicalDebtScore: this.extractField(latestAssessment, 'Technical Debt Score'),
        overallQuality: this.extractField(latestAssessment, 'Overall Quality'),
        details: this.extractField(latestAssessment, 'Details')
      };
    } catch (error) {
      console.error('Failed to get latest quality metrics:', error.message);
      return null;
    }
  }

  // CONTEXT COMPACTION
  async checkContextCompaction(filePath) {
    try {
      const stats = fs.statSync(filePath);
      
      if (stats.size > this.maxContextSize) {
        await this.compactContext(filePath);
      }
    } catch (error) {
      console.error('Failed to check context compaction:', error.message);
    }
  }

  async compactContext(filePath) {
    try {
      const fileName = path.basename(filePath);
      const archiveFileName = `archived-${Date.now()}-${fileName}`;
      const archiveFilePath = path.join(this.archivePath, archiveFileName);
      
      // Move original to archive
      const originalContent = fs.readFileSync(filePath, 'utf8');
      fs.writeFileSync(archiveFilePath, originalContent);
      
      // Create summarized version
      const summarizedContent = await this.summarizeContext(originalContent, fileName);
      fs.writeFileSync(filePath, summarizedContent);
      
      console.log(`Context compacted: ${fileName} archived as ${archiveFileName}`);
    } catch (error) {
      console.error('Failed to compact context:', error.message);
    }
  }

  async summarizeContext(content, fileName) {
    // Intelligent summarization preserving key decisions and recent activity
    const timestamp = new Date().toISOString();
    
    if (fileName === 'shared-context.md') {
      const context = this.parseSharedContext(content);
      
      // Keep only most recent 5 decisions and next steps
      context.keyDecisions = context.keyDecisions.slice(-5);
      context.nextSteps = context.nextSteps.slice(-5);
      context.sessionNotes = `[Archived ${timestamp}] Context compacted - full history available in archive.`;
      
      return this.formatSharedContext(context);
    }
    
    // For other file types, create a basic summary
    return `# ${fileName.replace('.md', '')} - Compacted Summary

**Compacted:** ${timestamp}
**Original Size:** ${content.length} characters

This file was automatically compacted to manage size. Full historical context is available in the archive directory.

**Recent Activity Summary:**
${content.substring(content.length - 1000)} 

[Full historical context archived - use archive restoration if detailed history is needed]
`;
  }

  // SESSION INTEGRATION
  async onSessionStart(sessionId, agent) {
    try {
      const context = await this.loadSharedContext();
      
      if (!context.activeSessions.includes(sessionId)) {
        context.activeSessions.push(sessionId);
      }
      
      context.primaryAgent = agent;
      context.sessionNotes = `Session ${sessionId} started by ${agent} at ${new Date().toISOString()}`;
      
      await this.updateSharedContext(context);
    } catch (error) {
      console.error('Failed to handle session start:', error.message);
    }
  }

  async onSessionEnd(sessionId) {
    try {
      const context = await this.loadSharedContext();
      
      context.activeSessions = context.activeSessions.filter(id => id !== sessionId);
      context.sessionNotes += `\nSession ${sessionId} ended at ${new Date().toISOString()}`;
      
      await this.updateSharedContext(context);
    } catch (error) {
      console.error('Failed to handle session end:', error.message);
    }
  }

  // UTILITY METHODS
  async getWorkspaceStatus() {
    try {
      const context = await this.loadSharedContext();
      const progress = await this.loadProgress();
      const latestQuality = await this.getLatestQualityMetrics();
      const recentDecisions = await this.getDecisions({ dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() });
      
      return {
        context,
        progress,
        latestQuality,
        recentDecisions: recentDecisions.slice(-5)
      };
    } catch (error) {
      console.error('Failed to get workspace status:', error.message);
      return null;
    }
  }

  async exportContextSummary() {
    try {
      const status = await this.getWorkspaceStatus();
      
      return `# Workspace Context Export
**Generated:** ${new Date().toISOString()}

## Current Status
- **Primary Agent:** ${status.context.primaryAgent}
- **Active Sessions:** ${status.context.activeSessions.join(', ') || 'None'}
- **Current Focus:** ${status.context.currentFocus}
- **Quality Score:** ${status.progress.qualityScore}

## Recent Decisions (Last 7 Days)
${status.recentDecisions.map(d => `- ${d.title} (${d.agent})`).join('\n') || '- No recent decisions'}

## Progress Summary
- **Completed Tasks:** ${status.progress.completedTasks.length}
- **Pending Tasks:** ${status.progress.pendingTasks.length}
- **Blockers:** ${status.progress.blockers.length}

## Next Steps
${status.context.nextSteps.map(step => `- ${step}`).join('\n') || '- No next steps defined'}
`;
    } catch (error) {
      console.error('Failed to export context summary:', error.message);
      return 'Error generating context summary';
    }
  }

  // CONTEXT VERSIONING AND CONFLICT RESOLUTION
  async createContextVersion(contextType, content, sessionId, agent) {
    try {
      const timestamp = new Date().toISOString();
      const versionId = `${contextType}-${timestamp.replace(/[:.]/g, '-')}-${sessionId}`;
      const versionFile = path.join(this.versionsPath, `${versionId}.json`);
      
      const version = {
        id: versionId,
        contextType,
        timestamp,
        sessionId,
        agent,
        content,
        hash: this.generateContentHash(content)
      };
      
      fs.writeFileSync(versionFile, JSON.stringify(version, null, 2));
      
      // Cleanup old versions
      await this.cleanupOldVersions(contextType);
      
      return versionId;
    } catch (error) {
      console.error('Failed to create context version:', error.message);
      throw error;
    }
  }

  generateContentHash(content) {
    // Simple hash function for content comparison
    let hash = 0;
    if (content.length === 0) return hash;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }

  async cleanupOldVersions(contextType) {
    try {
      const versionFiles = fs.readdirSync(this.versionsPath)
        .filter(file => file.startsWith(contextType) && file.endsWith('.json'))
        .map(file => {
          const filePath = path.join(this.versionsPath, file);
          const stats = fs.statSync(filePath);
          return { file, path: filePath, mtime: stats.mtime };
        })
        .sort((a, b) => b.mtime - a.mtime);
      
      // Keep only the most recent versions
      if (versionFiles.length > this.maxVersions) {
        const filesToDelete = versionFiles.slice(this.maxVersions);
        for (const fileInfo of filesToDelete) {
          fs.unlinkSync(fileInfo.path);
        }
      }
    } catch (error) {
      console.error('Failed to cleanup old versions:', error.message);
    }
  }

  async detectContextConflicts(contextType, newContent, sessionId) {
    try {
      const currentContextFile = path.join(this.getContextFilePath(contextType));
      
      if (!fs.existsSync(currentContextFile)) {
        return { hasConflict: false, conflict: null };
      }
      
      const currentContent = fs.readFileSync(currentContextFile, 'utf8');
      const currentHash = this.generateContentHash(currentContent);
      const newHash = this.generateContentHash(newContent);
      
      if (currentHash === newHash) {
        return { hasConflict: false, conflict: null };
      }
      
      // Check if there are concurrent modifications
      const recentVersions = await this.getRecentVersions(contextType, 5);
      const concurrentVersions = recentVersions.filter(v => 
        v.sessionId !== sessionId && 
        new Date() - new Date(v.timestamp) < 5 * 60 * 1000 // Within last 5 minutes
      );
      
      if (concurrentVersions.length > 0) {
        return {
          hasConflict: true,
          conflict: {
            type: 'concurrent_modification',
            currentContent,
            newContent,
            concurrentVersions
          }
        };
      }
      
      return { hasConflict: false, conflict: null };
    } catch (error) {
      console.error('Failed to detect context conflicts:', error.message);
      return { hasConflict: false, conflict: null };
    }
  }

  getContextFilePath(contextType) {
    switch (contextType) {
      case 'shared-context': return path.join(this.contextPath, 'shared-context.md');
      case 'decisions': return path.join(this.decisionsPath, 'decisions-log.md');
      case 'progress': return path.join(this.progressPath, 'progress-summary.md');
      case 'quality': return path.join(this.qualityPath, 'quality-metrics.md');
      default: return path.join(this.contextPath, `${contextType}.md`);
    }
  }

  async getRecentVersions(contextType, limit = 10) {
    try {
      const versionFiles = fs.readdirSync(this.versionsPath)
        .filter(file => file.startsWith(contextType) && file.endsWith('.json'))
        .map(file => {
          const filePath = path.join(this.versionsPath, file);
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return content;
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, limit);
      
      return versionFiles;
    } catch (error) {
      console.error('Failed to get recent versions:', error.message);
      return [];
    }
  }

  async mergeContextChanges(contextType, baseContent, changes1, changes2) {
    try {
      // Simple merge strategy - combine unique elements
      switch (contextType) {
        case 'shared-context':
          return this.mergeSharedContext(baseContent, changes1, changes2);
        case 'decisions':
          return this.mergeDecisions(baseContent, changes1, changes2);
        case 'progress':
          return this.mergeProgress(baseContent, changes1, changes2);
        default:
          // Default merge - prefer more recent changes
          return changes2.timestamp > changes1.timestamp ? changes2.content : changes1.content;
      }
    } catch (error) {
      console.error('Failed to merge context changes:', error.message);
      throw error;
    }
  }

  mergeSharedContext(base, changes1, changes2) {
    try {
      const baseCtx = this.parseSharedContext(base);
      const ctx1 = this.parseSharedContext(changes1.content);
      const ctx2 = this.parseSharedContext(changes2.content);
      
      // Merge strategy: combine unique items, prefer most recent timestamps
      const merged = {
        lastUpdated: new Date().toISOString(),
        activeSessions: [...new Set([...ctx1.activeSessions, ...ctx2.activeSessions])],
        primaryAgent: ctx2.lastUpdated > ctx1.lastUpdated ? ctx2.primaryAgent : ctx1.primaryAgent,
        currentFocus: ctx2.lastUpdated > ctx1.lastUpdated ? ctx2.currentFocus : ctx1.currentFocus,
        keyDecisions: [...new Set([...ctx1.keyDecisions, ...ctx2.keyDecisions])],
        nextSteps: [...new Set([...ctx1.nextSteps, ...ctx2.nextSteps])],
        sessionNotes: `${ctx1.sessionNotes}\n${ctx2.sessionNotes}`.trim()
      };
      
      return this.formatSharedContext(merged);
    } catch (error) {
      console.error('Failed to merge shared context:', error.message);
      return changes2.content; // Fallback to most recent
    }
  }

  mergeDecisions(base, changes1, changes2) {
    try {
      // Decisions are append-only, so merge by combining unique decisions
      const decisions1 = this.parseDecisions(changes1.content);
      const decisions2 = this.parseDecisions(changes2.content);
      
      const allDecisions = [...decisions1, ...decisions2];
      const uniqueDecisions = allDecisions.filter((decision, index, self) => 
        index === self.findIndex(d => d.title === decision.title)
      );
      
      // Sort by date
      uniqueDecisions.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      let mergedContent = '# Architectural & Design Decisions\n\n';
      uniqueDecisions.forEach((decision, index) => {
        const decisionId = String(index + 1).padStart(3, '0');
        mergedContent += `## Decision ${decisionId}: ${decision.title}
**Date:** ${decision.date}
**Agent:** ${decision.agent}
**Context:** ${decision.context}
**Decision:** ${decision.decision}
**Rationale:** ${decision.rationale}
**Alternatives:** ${decision.alternatives}
**Impact:** ${decision.impact}
**Status:** ${decision.status}

`;
      });
      
      return mergedContent;
    } catch (error) {
      console.error('Failed to merge decisions:', error.message);
      return changes2.content; // Fallback to most recent
    }
  }

  mergeProgress(base, changes1, changes2) {
    try {
      const progress1 = this.parseProgress(changes1.content);
      const progress2 = this.parseProgress(changes2.content);
      
      // Merge strategy: combine tasks, keep most recent story and quality score
      const merged = {
        lastUpdated: new Date().toISOString(),
        currentStory: progress2.lastUpdated > progress1.lastUpdated ? progress2.currentStory : progress1.currentStory,
        completedTasks: [...new Set([...progress1.completedTasks, ...progress2.completedTasks])],
        pendingTasks: [...new Set([...progress1.pendingTasks, ...progress2.pendingTasks])],
        blockers: [...new Set([...progress1.blockers, ...progress2.blockers])],
        qualityScore: progress2.lastUpdated > progress1.lastUpdated ? progress2.qualityScore : progress1.qualityScore
      };
      
      return this.formatProgress(merged);
    } catch (error) {
      console.error('Failed to merge progress:', error.message);
      return changes2.content; // Fallback to most recent
    }
  }

  async rollbackToVersion(contextType, versionId) {
    try {
      const versionFile = path.join(this.versionsPath, `${versionId}.json`);
      
      if (!fs.existsSync(versionFile)) {
        throw new Error(`Version ${versionId} not found`);
      }
      
      const version = JSON.parse(fs.readFileSync(versionFile, 'utf8'));
      const contextFile = this.getContextFilePath(contextType);
      
      // Create backup of current version
      await this.createContextVersion(contextType, fs.readFileSync(contextFile, 'utf8'), 'system', 'rollback-backup');
      
      // Restore the version
      fs.writeFileSync(contextFile, version.content);
      
      return {
        success: true,
        rolledBackTo: version.timestamp,
        agent: version.agent,
        sessionId: version.sessionId
      };
    } catch (error) {
      console.error('Failed to rollback to version:', error.message);
      throw error;
    }
  }

  // CONTEXT LOCKING FOR CONCURRENT ACCESS
  async acquireContextLock(contextType, sessionId, timeout = 30000) {
    try {
      const lockFile = path.join(this.locksPath, `${contextType}.lock`);
      const lockInfo = {
        sessionId,
        timestamp: new Date().toISOString(),
        expires: new Date(Date.now() + timeout).toISOString()
      };
      
      // Check for existing lock
      if (fs.existsSync(lockFile)) {
        const existingLock = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
        
        // Check if lock has expired
        if (new Date(existingLock.expires) > new Date()) {
          if (existingLock.sessionId !== sessionId) {
            return { acquired: false, lockedBy: existingLock.sessionId, expiresAt: existingLock.expires };
          }
          // Same session, extend the lock
          lockInfo.timestamp = existingLock.timestamp;
        }
      }
      
      fs.writeFileSync(lockFile, JSON.stringify(lockInfo, null, 2));
      
      return { acquired: true, lockInfo };
    } catch (error) {
      console.error('Failed to acquire context lock:', error.message);
      return { acquired: false, error: error.message };
    }
  }

  async releaseContextLock(contextType, sessionId) {
    try {
      const lockFile = path.join(this.locksPath, `${contextType}.lock`);
      
      if (!fs.existsSync(lockFile)) {
        return { released: true, message: 'No lock existed' };
      }
      
      const existingLock = JSON.parse(fs.readFileSync(lockFile, 'utf8'));
      
      if (existingLock.sessionId !== sessionId) {
        return { released: false, message: 'Lock owned by different session' };
      }
      
      fs.unlinkSync(lockFile);
      
      return { released: true, message: 'Lock released successfully' };
    } catch (error) {
      console.error('Failed to release context lock:', error.message);
      return { released: false, error: error.message };
    }
  }

  async cleanupExpiredLocks() {
    try {
      const lockFiles = fs.readdirSync(this.locksPath).filter(f => f.endsWith('.lock'));
      let cleanedCount = 0;
      
      for (const lockFile of lockFiles) {
        const lockPath = path.join(this.locksPath, lockFile);
        const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
        
        if (new Date(lock.expires) < new Date()) {
          fs.unlinkSync(lockPath);
          cleanedCount++;
        }
      }
      
      return { cleanedCount };
    } catch (error) {
      console.error('Failed to cleanup expired locks:', error.message);
      return { cleanedCount: 0, error: error.message };
    }
  }

  // BMAD AGENT INTEGRATION HOOKS
  async onStoryStart(storyId, agent, sessionId) {
    try {
      // Automatically update context when a story starts
      await this.updateSharedContext({
        currentFocus: `Story ${storyId} started by ${agent}`,
        primaryAgent: agent
      });
      
      // Log story start as a progress update
      await this.updateProgress({
        currentStory: storyId,
        lastUpdated: new Date().toISOString()
      });
      
      console.log(`✅ Context updated for story start: ${storyId} by ${agent}`);
    } catch (error) {
      console.error('Failed to handle story start:', error.message);
    }
  }

  async onDecisionMade(decision, agent, sessionId) {
    try {
      // Automatically log decisions made during agent operations
      await this.logDecision({
        title: decision.title,
        agent: agent,
        context: decision.context || 'Auto-captured during agent operation',
        decision: decision.decision,
        rationale: decision.rationale || 'No rationale provided',
        alternatives: decision.alternatives || 'No alternatives considered',
        impact: decision.impact || 'Impact not assessed',
        status: decision.status || 'active'
      });
      
      console.log(`✅ Decision auto-logged: ${decision.title} by ${agent}`);
    } catch (error) {
      console.error('Failed to handle decision made:', error.message);
    }
  }

  async onQualityAudit(results, agent, sessionId) {
    try {
      // Automatically capture quality audit results
      await this.updateQualityMetrics({
        agent: agent,
        story: results.story || 'Unknown story',
        realityAuditScore: results.realityAuditScore || results.score,
        patternCompliance: results.patternCompliance,
        technicalDebtScore: results.technicalDebtScore,
        overallQuality: results.overallQuality || results.grade,
        details: results.details || 'Auto-captured quality audit results'
      });
      
      console.log(`✅ Quality metrics auto-captured: ${results.overallQuality || results.grade} by ${agent}`);
    } catch (error) {
      console.error('Failed to handle quality audit:', error.message);
    }
  }

  async onAgentHandoff(fromAgent, toAgent, sessionId, handoffContext) {
    try {
      // Automatically update context during agent handoffs
      await this.updateSharedContext({
        primaryAgent: toAgent,
        sessionNotes: `Agent handoff: ${fromAgent} → ${toAgent} at ${new Date().toISOString()}`
      });
      
      // Log handoff as a decision if it includes important context
      if (handoffContext && handoffContext.length > 50) {
        await this.logDecision({
          title: `Agent handoff: ${fromAgent} to ${toAgent}`,
          agent: fromAgent,
          context: 'Agent transition',
          decision: `Handed off work context to ${toAgent}`,
          rationale: handoffContext,
          impact: `${toAgent} can continue work with full context`,
          status: 'active'
        });
      }
      
      console.log(`✅ Context updated for agent handoff: ${fromAgent} → ${toAgent}`);
    } catch (error) {
      console.error('Failed to handle agent handoff:', error.message);
    }
  }
}

module.exports = ContextManager;