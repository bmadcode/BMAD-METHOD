#!/usr/bin/env node
/**
 * BMAD Workspace Handoff Utility
 * Cross-IDE agent handoff management and coordination
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Get available BMAD agents
 */
function getAvailableAgents() {
  const agents = [
    { id: 'dev', name: 'Developer (James)', description: 'Code implementation and debugging' },
    { id: 'qa', name: 'QA Engineer (Quinn)', description: 'Quality validation and testing' },
    { id: 'sm', name: 'Scrum Master (Morgan)', description: 'Story creation and project coordination' },
    { id: 'analyst', name: 'Business Analyst (Alex)', description: 'Requirements analysis and research' },
    { id: 'architect', name: 'Technical Architect (Sam)', description: 'System design and architecture' },
    { id: 'ux-expert', name: 'UX Expert (Jordan)', description: 'User experience and interface design' },
    { id: 'pm', name: 'Product Manager (John)', description: 'Product strategy and PRD creation' },
    { id: 'po', name: 'Product Owner (Sarah)', description: 'Backlog management and acceptance criteria' }
  ];
  
  return agents;
}

/**
 * Create handoff context package
 */
function createHandoffContext(workspacePath, fromAgent, toAgent, currentWork, notes = '') {
  const handoffId = crypto.randomBytes(6).toString('hex');
  const timestamp = new Date().toISOString();
  
  // Gather current workspace context
  const contextPath = path.join(workspacePath, 'context');
  const contextFiles = fs.existsSync(contextPath) ? 
    fs.readdirSync(contextPath).filter(f => f.endsWith('.md') || f.endsWith('.json')) : [];
  
  // Get recent progress
  const progressPath = path.join(workspacePath, 'progress');
  const recentProgress = [];
  if (fs.existsSync(progressPath)) {
    const progressFiles = fs.readdirSync(progressPath)
      .filter(f => f.endsWith('.md'))
      .sort()
      .slice(-5); // Last 5 progress files
    
    for (const file of progressFiles) {
      try {
        const content = fs.readFileSync(path.join(progressPath, file), 'utf8');
        recentProgress.push({
          file: file,
          preview: content.substring(0, 200) + (content.length > 200 ? '...' : '')
        });
      } catch (e) {
        // Skip corrupted files
      }
    }
  }
  
  // Get current session info
  const sessionsPath = path.join(workspacePath, 'sessions');
  let currentSession = null;
  if (fs.existsSync(sessionsPath)) {
    const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
    for (const file of sessionFiles) {
      try {
        const sessionData = JSON.parse(fs.readFileSync(path.join(sessionsPath, file), 'utf8'));
        const lastHeartbeat = new Date(sessionData.lastHeartbeat);
        const timeDiff = new Date() - lastHeartbeat;
        if (timeDiff < 3600000) { // Active within last hour
          currentSession = sessionData;
          break;
        }
      } catch (e) {
        // Skip corrupted session files
      }
    }
  }
  
  const handoffData = {
    id: handoffId,
    timestamp: timestamp,
    fromAgent: fromAgent,
    toAgent: toAgent,
    currentWork: currentWork,
    notes: notes,
    session: currentSession,
    context: {
      availableFiles: contextFiles,
      recentProgress: recentProgress,
      workspaceHealth: checkBasicHealth(workspacePath)
    },
    recommendations: generateHandoffRecommendations(fromAgent, toAgent, currentWork),
    status: 'pending'
  };
  
  return handoffData;
}

/**
 * Check basic workspace health
 */
function checkBasicHealth(workspacePath) {
  const requiredDirs = ['sessions', 'context', 'handoffs', 'progress'];
  const missingDirs = [];
  
  for (const dir of requiredDirs) {
    if (!fs.existsSync(path.join(workspacePath, dir))) {
      missingDirs.push(dir);
    }
  }
  
  return {
    score: missingDirs.length === 0 ? 100 : Math.max(0, 100 - (missingDirs.length * 25)),
    missingDirectories: missingDirs
  };
}

/**
 * Generate handoff recommendations
 */
function generateHandoffRecommendations(fromAgent, toAgent, currentWork) {
  const recommendations = [];
  
  // Agent-specific recommendations
  if (fromAgent === 'dev' && toAgent === 'qa') {
    recommendations.push('Ensure all code changes are committed and pushed');
    recommendations.push('Run tests and provide test results');
    recommendations.push('Document any known issues or edge cases');
    recommendations.push('Specify testing priorities and focus areas');
  } else if (fromAgent === 'sm' && toAgent === 'dev') {
    recommendations.push('Review story acceptance criteria carefully');
    recommendations.push('Clarify any ambiguous requirements');
    recommendations.push('Confirm technical approach with architect if needed');
    recommendations.push('Set up development environment if not ready');
  } else if (fromAgent === 'analyst' && toAgent === 'pm') {
    recommendations.push('Summarize key research findings');
    recommendations.push('Highlight market opportunities and constraints');
    recommendations.push('Provide user persona insights');
    recommendations.push('Recommend feature prioritization approach');
  } else if (fromAgent === 'architect' && toAgent === 'dev') {
    recommendations.push('Review architectural decisions and constraints');
    recommendations.push('Ensure development setup matches architecture');
    recommendations.push('Clarify any technical implementation details');
    recommendations.push('Verify third-party dependencies are available');
  } else if (['dev', 'qa'].includes(fromAgent) && toAgent === 'sm') {
    recommendations.push('Provide status update on current story');
    recommendations.push('Report any blockers or impediments');
    recommendations.push('Suggest story scope adjustments if needed');
    recommendations.push('Update story progress and completion estimates');
  }
  
  // Work-specific recommendations
  const workLower = currentWork.toLowerCase();
  if (workLower.includes('bug') || workLower.includes('fix')) {
    recommendations.push('Provide detailed bug reproduction steps');
    recommendations.push('Include error logs and stack traces');
    recommendations.push('Identify root cause if known');
  } else if (workLower.includes('feature') || workLower.includes('story')) {
    recommendations.push('Confirm feature requirements are clear');
    recommendations.push('Verify acceptance criteria are testable');
    recommendations.push('Ensure dependencies are identified');
  } else if (workLower.includes('refactor')) {
    recommendations.push('Document current implementation patterns');
    recommendations.push('Explain refactoring goals and benefits');
    recommendations.push('Identify areas of highest risk');
  }
  
  // General recommendations
  recommendations.push('Update workspace context with latest findings');
  recommendations.push('Review any TODO items or pending decisions');
  
  return recommendations;
}

/**
 * Save handoff to workspace
 */
function saveHandoff(workspacePath, handoffData) {
  const handoffsPath = path.join(workspacePath, 'handoffs');
  if (!fs.existsSync(handoffsPath)) {
    fs.mkdirSync(handoffsPath, { recursive: true });
  }
  
  const handoffFile = path.join(handoffsPath, `${handoffData.id}.json`);
  fs.writeFileSync(handoffFile, JSON.stringify(handoffData, null, 2));
  
  // Also create a markdown summary for easy reading
  const markdownFile = path.join(handoffsPath, `${handoffData.id}.md`);
  const markdownContent = generateHandoffMarkdown(handoffData);
  fs.writeFileSync(markdownFile, markdownContent);
  
  return { handoffFile, markdownFile };
}

/**
 * Generate handoff markdown summary
 */
function generateHandoffMarkdown(handoffData) {
  const toAgentInfo = getAvailableAgents().find(a => a.id === handoffData.toAgent);
  
  return `# Agent Handoff: ${handoffData.fromAgent} → ${handoffData.toAgent}

**Handoff ID:** ${handoffData.id}  
**Timestamp:** ${new Date(handoffData.timestamp).toLocaleString()}  
**To Agent:** ${toAgentInfo?.name || handoffData.toAgent} - ${toAgentInfo?.description || 'Unknown agent'}

## Current Work
${handoffData.currentWork}

## Notes
${handoffData.notes || 'No additional notes provided'}

## Context Summary
- **Available context files:** ${handoffData.context.availableFiles.length}
- **Recent progress entries:** ${handoffData.context.recentProgress.length}
- **Workspace health:** ${handoffData.context.workspaceHealth.score}/100

${handoffData.context.recentProgress.length > 0 ? `
## Recent Progress
${handoffData.context.recentProgress.map((p, i) => `
### ${i + 1}. ${p.file}
${p.preview}
`).join('')}
` : ''}

## Recommendations
${handoffData.recommendations.map(r => `- ${r}`).join('\n')}

## Session Information
${handoffData.session ? `
- **IDE:** ${handoffData.session.ide}
- **User:** ${handoffData.session.user}
- **Created:** ${new Date(handoffData.session.created).toLocaleString()}
- **Last Activity:** ${new Date(handoffData.session.lastHeartbeat).toLocaleString()}
` : 'No active session found'}

---
*Generated by BMAD Cross-IDE Workspace System*
`;
}

/**
 * List recent handoffs
 */
function listRecentHandoffs(workspacePath, limit = 10) {
  const handoffsPath = path.join(workspacePath, 'handoffs');
  if (!fs.existsSync(handoffsPath)) {
    return [];
  }
  
  const handoffFiles = fs.readdirSync(handoffsPath)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        const content = fs.readFileSync(path.join(handoffsPath, f), 'utf8');
        return JSON.parse(content);
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
  
  return handoffFiles;
}

/**
 * Main handoff function
 */
async function manageHandoff(action = 'create', options = {}) {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      console.error('   Run `npm run workspace-init` to initialize workspace');
      process.exit(1);
    }
    
    if (action === 'list') {
      console.log('🔄 Recent Agent Handoffs');
      console.log('========================');
      
      const handoffs = listRecentHandoffs(workspacePath);
      if (handoffs.length === 0) {
        console.log('No handoffs found.');
        return;
      }
      
      handoffs.forEach((handoff, index) => {
        const toAgentInfo = getAvailableAgents().find(a => a.id === handoff.toAgent);
        console.log(`${index + 1}. ${handoff.id} - ${handoff.fromAgent} → ${handoff.toAgent}`);
        console.log(`   ${toAgentInfo?.name || handoff.toAgent}`);
        console.log(`   ${new Date(handoff.timestamp).toLocaleString()}`);
        console.log(`   Work: ${handoff.currentWork.substring(0, 80)}${handoff.currentWork.length > 80 ? '...' : ''}`);
        console.log('');
      });
      
      return;
    }
    
    if (action === 'agents') {
      console.log('👥 Available BMAD Agents');
      console.log('========================');
      
      const agents = getAvailableAgents();
      agents.forEach((agent, index) => {
        console.log(`${index + 1}. ${agent.id} - ${agent.name}`);
        console.log(`   ${agent.description}`);
        console.log('');
      });
      
      return;
    }
    
    // Default create action
    const fromAgent = options.from || 'unknown';
    const toAgent = options.to || 'dev';
    const currentWork = options.work || 'No work description provided';
    const notes = options.notes || '';
    
    console.log('🔄 Creating Agent Handoff');
    console.log('=========================');
    
    // Validate agents
    const agents = getAvailableAgents();
    const toAgentInfo = agents.find(a => a.id === toAgent);
    
    if (!toAgentInfo) {
      console.error(`❌ Unknown target agent: ${toAgent}`);
      console.error('Available agents:');
      agents.forEach(a => console.error(`  ${a.id} - ${a.name}`));
      process.exit(1);
    }
    
    // Create handoff context
    const handoffData = createHandoffContext(workspacePath, fromAgent, toAgent, currentWork, notes);
    
    // Save handoff
    const files = saveHandoff(workspacePath, handoffData);
    
    // Log handoff activity
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'agent-handoff',
      handoffId: handoffData.id,
      fromAgent: fromAgent,
      toAgent: toAgent,
      user: process.env.USER || process.env.USERNAME || 'unknown'
    };
    
    const logPath = path.join(workspacePath, 'logs', 'workspace.log');
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    
    // Success output
    console.log('✅ Handoff created successfully');
    console.log('==============================');
    console.log(`🆔 Handoff ID: ${handoffData.id}`);
    console.log(`👤 From: ${fromAgent} → ${toAgentInfo.name}`);
    console.log(`📝 Work: ${currentWork}`);
    console.log(`📁 Handoff file: ${path.basename(files.handoffFile)}`);
    console.log(`📄 Summary: ${path.basename(files.markdownFile)}`);
    console.log(`\n📋 Recommendations for ${toAgentInfo.name}:`);
    handoffData.recommendations.forEach(rec => console.log(`  • ${rec}`));
    
    console.log('\n🚀 Next steps:');
    console.log(`  1. Review handoff details in: .workspace/handoffs/${handoffData.id}.md`);
    console.log(`  2. Start working with the ${toAgentInfo.name} agent`);
    console.log(`  3. Update workspace context as work progresses`);
    
  } catch (error) {
    console.error('❌ Failed to manage handoff:', error.message);
    process.exit(1);
  }
}

// Command line execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const action = args[0] || 'create';
  
  const options = {};
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '');
    const value = args[i + 1];
    if (key && value) {
      options[key] = value;
    }
  }
  
  manageHandoff(action, options);
}

module.exports = { manageHandoff, createHandoffContext, getAvailableAgents };