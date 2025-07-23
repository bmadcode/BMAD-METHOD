#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

// Import context manager (copy functionality since we can't use external dependencies)
class ContextManager {
  constructor(workspacePath = null) {
    this.workspacePath = workspacePath || path.join(process.cwd(), '.workspace');
    this.contextPath = path.join(this.workspacePath, 'context');
    this.decisionsPath = path.join(this.workspacePath, 'decisions');
    this.progressPath = path.join(this.workspacePath, 'progress');
    this.qualityPath = path.join(this.workspacePath, 'quality');
    this.maxContextSize = 10 * 1024 * 1024;
    this.initialize();
  }

  initialize() {
    const dirs = [this.contextPath, this.decisionsPath, this.progressPath, this.qualityPath];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
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

  parseSharedContext(content) {
    const context = this.getDefaultSharedContext();
    
    try {
      const lastUpdatedMatch = content.match(/\*\*Last Updated:\*\* (.+)/);
      if (lastUpdatedMatch) context.lastUpdated = lastUpdatedMatch[1];
      
      const activeSessionsMatch = content.match(/\*\*Active Sessions:\*\* (.+)/);
      if (activeSessionsMatch && activeSessionsMatch[1] !== 'None') {
        context.activeSessions = activeSessionsMatch[1].split(', ').map(s => s.trim());
      }
      
      const primaryAgentMatch = content.match(/\*\*Primary Agent:\*\* (.+)/);
      if (primaryAgentMatch) context.primaryAgent = primaryAgentMatch[1];
      
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

  async loadProgress() {
    try {
      const progressFile = path.join(this.progressPath, 'progress-summary.md');
      
      if (!fs.existsSync(progressFile)) {
        return {
          lastUpdated: new Date().toISOString(),
          currentStory: 'No active story',
          completedTasks: [],
          pendingTasks: [],
          blockers: [],
          qualityScore: 'Not assessed'
        };
      }
      
      const content = fs.readFileSync(progressFile, 'utf8');
      const progress = {
        lastUpdated: new Date().toISOString(),
        currentStory: 'No active story',
        completedTasks: [],
        pendingTasks: [],
        blockers: [],
        qualityScore: 'Not assessed'
      };

      const currentStoryMatch = content.match(/\*\*Current Story:\*\* (.+)/);
      if (currentStoryMatch) progress.currentStory = currentStoryMatch[1];
      
      const qualityScoreMatch = content.match(/\*\*Quality Score:\*\* (.+)/);
      if (qualityScoreMatch) progress.qualityScore = qualityScoreMatch[1];
      
      return progress;
    } catch (error) {
      console.error('Failed to load progress:', error.message);
      return {
        lastUpdated: new Date().toISOString(),
        currentStory: 'No active story',
        completedTasks: [],
        pendingTasks: [],
        blockers: [],
        qualityScore: 'Not assessed'
      };
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
      
      return {
        timestamp: assessments[1].split('\n')[0].trim(),
        available: true
      };
    } catch (error) {
      console.error('Failed to get latest quality metrics:', error.message);
      return null;
    }
  }
}

// Context Management CLI
async function handleContextCommand() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found. Run `npx bmad-method install` first.');
      process.exit(1);
    }

    const contextManager = new ContextManager();
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'status':
        await showContextStatus(contextManager);
        break;
      case 'load':
        await loadContext(contextManager);
        break;
      case 'update':
        await updateContext(contextManager, args.slice(1));
        break;
      case 'decisions':
        await showDecisions(contextManager);
        break;
      case 'progress':
        await showProgress(contextManager);
        break;
      case 'export':
        await exportContext(contextManager);
        break;
      default:
        showUsage();
    }
  } catch (error) {
    console.error('❌ Context command failed:', error.message);
    process.exit(1);
  }
}

async function showContextStatus(contextManager) {
  console.log('📄 BMAD Context Status');
  console.log('======================');
  
  const context = await contextManager.loadSharedContext();
  const progress = await contextManager.loadProgress();
  const quality = await contextManager.getLatestQualityMetrics();
  
  console.log(`📁 Context: ${contextManager.contextPath}`);
  console.log(`🕐 Last Updated: ${context.lastUpdated}`);
  console.log(`👤 Primary Agent: ${context.primaryAgent}`);
  console.log(`🎯 Current Focus: ${context.currentFocus}`);
  console.log(`📊 Quality Score: ${progress.qualityScore}`);
  
  if (context.activeSessions.length > 0) {
    console.log(`\n👥 Active Sessions: ${context.activeSessions.length}`);
    context.activeSessions.forEach((session, index) => {
      console.log(`  ${index + 1}. ${session}`);
    });
  }
  
  if (context.keyDecisions.length > 0) {
    console.log(`\n🔑 Recent Key Decisions:`);
    context.keyDecisions.slice(-3).forEach((decision, index) => {
      console.log(`  ${index + 1}. ${decision}`);
    });
  }
  
  if (context.nextSteps.length > 0) {
    console.log(`\n⏭️  Next Steps:`);
    context.nextSteps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  }
  
  console.log(`\n📈 Quality Metrics: ${quality ? 'Available' : 'Not available'}`);
}

async function loadContext(contextManager) {
  console.log('📄 Loading workspace context...\n');
  
  const context = await contextManager.loadSharedContext();
  
  console.log('🎯 Current Focus:');
  console.log(context.currentFocus);
  
  if (context.keyDecisions.length > 0) {
    console.log('\n🔑 Key Decisions:');
    context.keyDecisions.forEach((decision, index) => {
      console.log(`  ${index + 1}. ${decision}`);
    });
  }
  
  if (context.nextSteps.length > 0) {
    console.log('\n⏭️  Next Steps:');
    context.nextSteps.forEach((step, index) => {
      console.log(`  ${index + 1}. ${step}`);
    });
  }
  
  if (context.sessionNotes) {
    console.log('\n📝 Session Notes:');
    console.log(context.sessionNotes);
  }
}

async function showDecisions(contextManager) {
  const decisionsFile = path.join(contextManager.decisionsPath, 'decisions-log.md');
  
  if (!fs.existsSync(decisionsFile)) {
    console.log('📋 No decisions recorded yet.');
    return;
  }
  
  const content = fs.readFileSync(decisionsFile, 'utf8');
  const decisions = content.split('## Decision ').slice(1);
  
  console.log('📋 Architectural & Design Decisions');
  console.log('===================================');
  
  decisions.slice(-5).forEach((decision, index) => {
    const lines = decision.split('\n');
    const title = lines[0].replace(/^\d+:\s*/, '');
    const dateMatch = decision.match(/\*\*Date:\*\* (.+)/);
    const agentMatch = decision.match(/\*\*Agent:\*\* (.+)/);
    
    console.log(`\n${decisions.length - 4 + index}. ${title}`);
    if (dateMatch) console.log(`   📅 ${dateMatch[1]}`);
    if (agentMatch) console.log(`   👤 ${agentMatch[1]}`);
  });
}

async function showProgress(contextManager) {
  const progress = await contextManager.loadProgress();
  
  console.log('📈 Development Progress');
  console.log('======================');
  console.log(`🎯 Current Story: ${progress.currentStory}`);
  console.log(`📊 Quality Score: ${progress.qualityScore}`);
  console.log(`🕐 Last Updated: ${progress.lastUpdated}`);
  
  if (progress.completedTasks && progress.completedTasks.length > 0) {
    console.log(`\n✅ Completed Tasks: ${progress.completedTasks.length}`);
  }
  
  if (progress.pendingTasks && progress.pendingTasks.length > 0) {
    console.log(`⏳ Pending Tasks: ${progress.pendingTasks.length}`);
  }
  
  if (progress.blockers && progress.blockers.length > 0) {
    console.log(`🚫 Blockers: ${progress.blockers.length}`);
  }
}

async function exportContext(contextManager) {
  try {
    const context = await contextManager.loadSharedContext();
    const progress = await contextManager.loadProgress();
    
    const exportContent = `# Workspace Context Export
**Generated:** ${new Date().toISOString()}

## Current Status
- **Primary Agent:** ${context.primaryAgent}
- **Active Sessions:** ${context.activeSessions.join(', ') || 'None'}
- **Current Focus:** ${context.currentFocus}
- **Quality Score:** ${progress.qualityScore}

## Key Decisions
${context.keyDecisions.map(d => `- ${d}`).join('\n') || '- No decisions recorded'}

## Next Steps
${context.nextSteps.map(step => `- ${step}`).join('\n') || '- No next steps defined'}

## Session Notes
${context.sessionNotes || 'No session notes available'}
`;
    
    const exportFile = path.join(process.cwd(), `context-export-${Date.now()}.md`);
    fs.writeFileSync(exportFile, exportContent);
    
    console.log('✅ Context exported successfully');
    console.log(`📁 Export file: ${exportFile}`);
  } catch (error) {
    console.error('❌ Failed to export context:', error.message);
  }
}

function showUsage() {
  console.log('📄 BMAD Context Management');
  console.log('==========================');
  console.log('');
  console.log('Usage: node context.js <command>');
  console.log('');
  console.log('Commands:');
  console.log('  status     - Show current workspace context status');
  console.log('  load       - Load and display shared context');
  console.log('  decisions  - Show recent architectural decisions');
  console.log('  progress   - Show development progress summary');
  console.log('  export     - Export context to markdown file');
  console.log('');
  console.log('Examples:');
  console.log('  node context.js status');
  console.log('  node context.js load');
  console.log('  node context.js export');
}

if (require.main === module) {
  handleContextCommand();
}

module.exports = { ContextManager };