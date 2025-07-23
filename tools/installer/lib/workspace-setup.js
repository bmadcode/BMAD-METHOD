const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

class WorkspaceSetup {
  constructor() {
    this.workspaceStructure = {
      '.workspace': {
        'sessions': {},
        'context': {},
        'handoffs': {},
        'decisions': {},
        'progress': {},
        'quality': {},
        'archive': {}
      }
    };
  }

  async createWorkspaceDirectory(installDir, spinner) {
    try {
      spinner.text = 'Creating collaborative workspace structure...';
      
      const workspacePath = path.join(installDir, '.workspace');
      
      // Create main workspace directory
      if (!fs.existsSync(workspacePath)) {
        fs.mkdirSync(workspacePath, { recursive: true });
      }
      
      // Create subdirectories
      const subdirs = ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality', 'archive'];
      
      for (const subdir of subdirs) {
        const subdirPath = path.join(workspacePath, subdir);
        if (!fs.existsSync(subdirPath)) {
          fs.mkdirSync(subdirPath, { recursive: true });
        }
      }
      
      // Create initial workspace configuration
      const workspaceConfig = {
        version: "1.0",
        created: new Date().toISOString(),
        structure: subdirs,
        settings: {
          maxContextSize: "10MB",
          sessionTimeout: "2h",
          archiveAfter: "30d",
          maxConcurrentSessions: 5
        }
      };
      
      fs.writeFileSync(
        path.join(workspacePath, 'workspace-config.json'), 
        JSON.stringify(workspaceConfig, null, 2)
      );
      
      // Create initial README
      const readmeContent = `# BMAD Collaborative Workspace

This directory contains the collaborative workspace system for multi-session AI agent coordination.

## Directory Structure

- \`sessions/\` - Active session tracking
- \`context/\` - Shared context files and decisions
- \`handoffs/\` - Agent transition packages
- \`decisions/\` - Architectural and design decisions
- \`progress/\` - Story and task progress tracking
- \`quality/\` - Quality metrics and audit results
- \`archive/\` - Compressed historical context

## Usage

### Claude Code CLI Users
- Use \`*workspace-init\` to initialize a collaborative session
- Use \`*workspace-status\` to see active sessions and progress
- Use \`*workspace-cleanup\` for maintenance

### Other IDE Users
- Run \`npm run workspace-init\` to initialize
- Run \`npm run workspace-status\` for status
- Run \`npm run workspace-cleanup\` for maintenance

## Configuration

Workspace settings can be modified in \`workspace-config.json\`.
`;
      
      fs.writeFileSync(path.join(workspacePath, 'README.md'), readmeContent);
      
      return true;
    } catch (error) {
      console.error(chalk.red('Failed to create workspace directory:'), error.message);
      return false;
    }
  }

  async createWorkspaceUtilities(installDir, selectedIDEs, spinner) {
    try {
      spinner.text = 'Installing workspace utilities...';
      
      const utilsPath = path.join(installDir, 'workspace-utils');
      if (!fs.existsSync(utilsPath)) {
        fs.mkdirSync(utilsPath, { recursive: true });
      }
      
      // Create utility scripts
      await this.createInitScript(utilsPath);
      await this.createStatusScript(utilsPath);
      await this.createCleanupScript(utilsPath);
      await this.createHandoffScript(utilsPath);
      await this.createSyncScript(utilsPath);
      await this.createContextScript(utilsPath);
      
      // Create package.json scripts if package.json exists
      await this.addPackageJsonScripts(installDir);
      
      // Create IDE-specific documentation
      await this.createIDEDocumentation(utilsPath, selectedIDEs);
      
      return true;
    } catch (error) {
      console.error(chalk.red('Failed to create workspace utilities:'), error.message);
      return false;
    }
  }

  async createInitScript(utilsPath) {
    const initScript = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function initWorkspace() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found. Run \`npx bmad-method install\` first.');
      process.exit(1);
    }
    
    // Generate session ID
    const sessionId = crypto.randomBytes(8).toString('hex');
    const timestamp = new Date().toISOString();
    
    // Create session file
    const sessionData = {
      id: sessionId,
      created: timestamp,
      lastHeartbeat: timestamp,
      ide: process.env.IDE_TYPE || 'unknown',
      pid: process.pid,
      user: process.env.USER || process.env.USERNAME || 'unknown'
    };
    
    const sessionsPath = path.join(workspacePath, 'sessions');
    if (!fs.existsSync(sessionsPath)) {
      fs.mkdirSync(sessionsPath, { recursive: true });
    }
    
    const sessionFile = path.join(sessionsPath, \`\${sessionId}.json\`);
    fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));
    
    console.log('✅ Workspace initialized successfully');
    console.log(\`📍 Session ID: \${sessionId}\`);
    console.log(\`🕐 Created: \${timestamp}\`);
    
    return sessionId;
  } catch (error) {
    console.error('❌ Failed to initialize workspace:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  initWorkspace();
}

module.exports = { initWorkspace };
`;
    
    fs.writeFileSync(path.join(utilsPath, 'init.js'), initScript);
    fs.chmodSync(path.join(utilsPath, 'init.js'), 0o755);
  }

  async createStatusScript(utilsPath) {
    const statusScript = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function getWorkspaceStatus() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      process.exit(1);
    }
    
    // Read workspace config
    const configPath = path.join(workspacePath, 'workspace-config.json');
    let config = {};
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configContent);
    }
    
    // Get active sessions
    const sessionsPath = path.join(workspacePath, 'sessions');
    let sessionFiles = [];
    if (fs.existsSync(sessionsPath)) {
      sessionFiles = fs.readdirSync(sessionsPath);
    }
    
    const activeSessions = [];
    for (const file of sessionFiles) {
      if (file.endsWith('.json')) {
        try {
          const sessionPath = path.join(sessionsPath, file);
          const sessionContent = fs.readFileSync(sessionPath, 'utf8');
          const sessionData = JSON.parse(sessionContent);
          activeSessions.push(sessionData);
        } catch (e) {
          // Skip corrupted session files
        }
      }
    }
    
    // Display status
    console.log('🤝 BMAD Collaborative Workspace Status');
    console.log('=====================================');
    console.log(\`📁 Workspace: \${workspacePath}\`);
    console.log(\`⚙️  Version: \${config.version || 'Unknown'}\`);
    console.log(\`🕐 Created: \${config.created || 'Unknown'}\`);
    console.log(\`👥 Active Sessions: \${activeSessions.length}\`);
    
    if (activeSessions.length > 0) {
      console.log('\\n📍 Session Details:');
      activeSessions.forEach((session, index) => {
        console.log(\`  \${index + 1}. \${session.id} (\${session.ide}) - \${session.user}\`);
        console.log(\`     Created: \${new Date(session.created).toLocaleString()}\`);
        console.log(\`     Last Heartbeat: \${new Date(session.lastHeartbeat).toLocaleString()}\`);
      });
    }
    
    // Check directory structure
    const directories = ['context', 'handoffs', 'decisions', 'progress', 'quality', 'archive'];
    const missingDirs = [];
    
    for (const dir of directories) {
      if (!fs.existsSync(path.join(workspacePath, dir))) {
        missingDirs.push(dir);
      }
    }
    
    if (missingDirs.length > 0) {
      console.log(\`\\n⚠️  Missing directories: \${missingDirs.join(', ')}\`);
      console.log('   Run \`node workspace-utils/cleanup.js\` to repair.');
    } else {
      console.log('\\n✅ Workspace structure is healthy');
    }
    
  } catch (error) {
    console.error('❌ Failed to get workspace status:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  getWorkspaceStatus();
}

module.exports = { getWorkspaceStatus };
`;
    
    fs.writeFileSync(path.join(utilsPath, 'status.js'), statusScript);
    fs.chmodSync(path.join(utilsPath, 'status.js'), 0o755);
  }

  async createCleanupScript(utilsPath) {
    const cleanupScript = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function removeFile(filePath) {
  try {
    fs.unlinkSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

function moveFile(sourcePath, targetPath) {
  try {
    const data = fs.readFileSync(sourcePath);
    fs.writeFileSync(targetPath, data);
    fs.unlinkSync(sourcePath);
    return true;
  } catch (e) {
    return false;
  }
}

async function cleanupWorkspace() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      process.exit(1);
    }
    
    console.log('🧹 Starting workspace cleanup...');
    
    // Repair directory structure
    const directories = ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality', 'archive'];
    let repairedDirs = 0;
    
    for (const dir of directories) {
      const dirPath = path.join(workspacePath, dir);
      if (!fs.existsSync(dirPath)) {
        ensureDir(dirPath);
        repairedDirs++;
      }
    }
    
    if (repairedDirs > 0) {
      console.log(\`✅ Repaired \${repairedDirs} missing directories\`);
    }
    
    // Clean up expired sessions (older than 2 hours)
    const sessionsPath = path.join(workspacePath, 'sessions');
    let sessionFiles = [];
    if (fs.existsSync(sessionsPath)) {
      sessionFiles = fs.readdirSync(sessionsPath);
    }
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
    
    let cleanedSessions = 0;
    for (const file of sessionFiles) {
      if (file.endsWith('.json')) {
        try {
          const sessionPath = path.join(sessionsPath, file);
          const sessionContent = fs.readFileSync(sessionPath, 'utf8');
          const sessionData = JSON.parse(sessionContent);
          const lastHeartbeat = new Date(sessionData.lastHeartbeat).getTime();
          
          if (lastHeartbeat < twoHoursAgo) {
            if (removeFile(sessionPath)) {
              cleanedSessions++;
            }
          }
        } catch (e) {
          // Remove corrupted session files
          if (removeFile(path.join(sessionsPath, file))) {
            cleanedSessions++;
          }
        }
      }
    }
    
    if (cleanedSessions > 0) {
      console.log(\`✅ Cleaned up \${cleanedSessions} expired sessions\`);
    }
    
    // Archive old context files (older than 30 days)
    const contextPath = path.join(workspacePath, 'context');
    const archivePath = path.join(workspacePath, 'archive');
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    if (fs.existsSync(contextPath)) {
      let contextFiles = [];
      try {
        contextFiles = fs.readdirSync(contextPath);
      } catch (e) {
        contextFiles = [];
      }
      
      let archivedFiles = 0;
      
      for (const file of contextFiles) {
        const filePath = path.join(contextPath, file);
        try {
          const stats = fs.statSync(filePath);
          
          if (stats.mtime.getTime() < thirtyDaysAgo) {
            const archiveFile = path.join(archivePath, \`archived-\${Date.now()}-\${file}\`);
            if (moveFile(filePath, archiveFile)) {
              archivedFiles++;
            }
          }
        } catch (e) {
          // Skip files that can't be processed
        }
      }
      
      if (archivedFiles > 0) {
        console.log(\`✅ Archived \${archivedFiles} old context files\`);
      }
    }
    
    console.log('✅ Workspace cleanup completed successfully');
    
  } catch (error) {
    console.error('❌ Failed to cleanup workspace:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  cleanupWorkspace();
}

module.exports = { cleanupWorkspace };
`;
    
    fs.writeFileSync(path.join(utilsPath, 'cleanup.js'), cleanupScript);
    fs.chmodSync(path.join(utilsPath, 'cleanup.js'), 0o755);
  }

  async createHandoffScript(utilsPath) {
    const handoffScript = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Embedded HandoffManager functionality using only built-in modules
class HandoffManager {
  constructor(workspacePath = null) {
    this.workspacePath = workspacePath || path.join(process.cwd(), '.workspace');
    this.handoffsPath = path.join(this.workspacePath, 'handoffs');
    this.contextPath = path.join(this.workspacePath, 'context');
    
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
      }
    };
    
    this.initialize();
  }

  initialize() {
    if (!fs.existsSync(this.handoffsPath)) {
      fs.mkdirSync(this.handoffsPath, { recursive: true });
    }
  }

  getAgentType(agentName) {
    const lowerName = agentName.toLowerCase();
    
    if (lowerName.includes('dev') || lowerName.includes('developer')) return 'dev';
    if (lowerName.includes('qa') || lowerName.includes('test')) return 'qa';
    if (lowerName.includes('arch') || lowerName.includes('architect')) return 'architect';
    if (lowerName.includes('pm') || lowerName.includes('manager')) return 'pm';
    
    return 'dev'; // Default fallback
  }

  async loadWorkspaceContext() {
    const context = { shared: {}, decisions: [], progress: {}, quality: {} };
    
    try {
      // Load shared context
      const sharedContextFile = path.join(this.contextPath, 'shared-context.md');
      if (fs.existsSync(sharedContextFile)) {
        const content = fs.readFileSync(sharedContextFile, 'utf8');
        context.shared = this.parseSharedContext(content);
      }
      
      // Load decisions
      const decisionsFile = path.join(this.workspacePath, 'decisions', 'decisions-log.md');
      if (fs.existsSync(decisionsFile)) {
        const content = fs.readFileSync(decisionsFile, 'utf8');
        context.decisions = this.parseDecisions(content);
      }
      
      // Load progress
      const progressFile = path.join(this.workspacePath, 'progress', 'progress-summary.md');
      if (fs.existsSync(progressFile)) {
        const content = fs.readFileSync(progressFile, 'utf8');
        context.progress = this.parseProgress(content);
      }
    } catch (error) {
      console.warn('Warning: Could not load full workspace context:', error.message);
    }
    
    return context;
  }

  parseSharedContext(content) {
    const context = {};
    
    try {
      const currentFocusMatch = content.match(/## Current Focus\\n([\\s\\S]*?)(?=\\n## |$)/);
      if (currentFocusMatch) context.currentFocus = currentFocusMatch[1].trim();
      
      const nextStepsMatch = content.match(/## Next Steps\\n([\\s\\S]*?)(?=\\n## |$)/);
      if (nextStepsMatch) {
        context.nextSteps = nextStepsMatch[1]
          .split('\\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.substring(2).trim())
          .filter(step => step.length > 0);
      }
    } catch (error) {
      console.warn('Failed to parse shared context:', error.message);
    }
    
    return context;
  }

  parseDecisions(content) {
    const decisions = [];
    const decisionBlocks = content.split(/## Decision \\d+:/);
    
    for (let i = 1; i < decisionBlocks.length && i <= 5; i++) {
      try {
        const block = decisionBlocks[i];
        const lines = block.split('\\n');
        
        const decision = {
          title: lines[0].trim(),
          agent: this.extractField(block, 'Agent'),
          decision: this.extractField(block, 'Decision'),
          rationale: this.extractField(block, 'Rationale')
        };
        
        decisions.push(decision);
      } catch (error) {
        console.warn(\`Failed to parse decision block \${i}:\`, error.message);
      }
    }
    
    return decisions;
  }

  parseProgress(content) {
    const progress = {};
    
    try {
      const currentStoryMatch = content.match(/\\*\\*Current Story:\\*\\* (.+)/);
      if (currentStoryMatch) progress.currentStory = currentStoryMatch[1];
      
      const qualityScoreMatch = content.match(/\\*\\*Quality Score:\\*\\* (.+)/);
      if (qualityScoreMatch) progress.qualityScore = qualityScoreMatch[1];
    } catch (error) {
      console.warn('Failed to parse progress:', error.message);
    }
    
    return progress;
  }

  extractField(content, fieldName) {
    const regex = new RegExp(\`\\\\*\\\\*\${fieldName}:\\\\*\\\\* (.+)\`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  generateNextActions(context, agentType) {
    const actions = [];
    
    switch (agentType) {
      case 'dev':
        actions.push('Review technical requirements and architecture decisions');
        actions.push('Examine current code implementation status');
        actions.push('Address any pending technical tasks or bugs');
        break;
        
      case 'qa':
        actions.push('Review acceptance criteria and testing requirements');
        actions.push('Validate completed functionality against requirements');
        actions.push('Execute test cases and identify quality issues');
        break;
        
      case 'architect':
        actions.push('Review system design and architectural decisions');
        actions.push('Validate technical approach and integration points');
        actions.push('Assess scalability and performance implications');
        break;
        
      case 'pm':
        actions.push('Review project scope and timeline status');
        actions.push('Assess stakeholder requirements and priority changes');
        actions.push('Update project planning and resource allocation');
        break;
        
      default:
        actions.push('Review handoff context and understand current state');
        actions.push('Identify specific tasks relevant to your role');
    }
    
    // Add context-specific actions
    if (context.shared.nextSteps) {
      context.shared.nextSteps.forEach(step => {
        if (!actions.some(action => action.toLowerCase().includes(step.toLowerCase().substring(0, 20)))) {
          actions.push(step);
        }
      });
    }
    
    return actions.slice(0, 6);
  }

  async createHandoff(sourceAgent, targetAgent, customContext = '') {
    try {
      const timestamp = new Date().toISOString();
      const handoffId = \`\${sourceAgent}-to-\${targetAgent}-\${timestamp.replace(/[:.]/g, '-')}\`;
      const handoffFile = path.join(this.handoffsPath, \`\${handoffId}.md\`);
      
      // Load workspace context
      const context = await this.loadWorkspaceContext();
      const agentType = this.getAgentType(targetAgent);
      const nextActions = this.generateNextActions(context, agentType);
      
      const handoffContent = \`# Agent Handoff: \${sourceAgent} → \${targetAgent}

**Created:** \${timestamp}
**Handoff ID:** \${handoffId}
**Source Agent:** \${sourceAgent}
**Target Agent:** \${targetAgent}
**Target Agent Type:** \${agentType}

## Context Summary
\${context.shared.currentFocus || 'No current focus available.'}

\${customContext || ''}

## Key Decisions Made
\${context.decisions.map(d => \`- **\${d.title}** (\${d.agent}): \${d.decision}\`).join('\\n') || '- No relevant decisions available'}

## Current Progress
**Story:** \${context.progress.currentStory || 'No active story'}
**Quality Score:** \${context.progress.qualityScore || 'Not assessed'}

## Next Actions for \${targetAgent}
\${nextActions.map(action => \`- [ ] \${action}\`).join('\\n')}

## Files and References
- 📁 \`.workspace/context/shared-context.md\` - Current workspace context
- 📋 \`.workspace/decisions/decisions-log.md\` - Architectural decisions
- 📈 \`.workspace/progress/progress-summary.md\` - Development progress
- 📊 \`.workspace/quality/quality-metrics.md\` - Quality assessments

## Blockers and Dependencies
- Review workspace context for any identified blockers
- Check progress summary for pending dependencies

## Handoff Validation
- [ ] Context completeness verified
- [ ] Decisions documented and relevant to \${agentType}
- [ ] Next actions clearly defined for \${agentType} role
- [ ] References included
- [ ] Agent-specific filtering applied

## Handoff Notes
Generated automatically with agent-specific context filtering for \${agentType} role.

---
*Generated by BMAD Agent Handoff System v1.3*
\`;
      
      fs.writeFileSync(handoffFile, handoffContent);
      
      // Update registry
      await this.updateHandoffRegistry(handoffId, sourceAgent, targetAgent);
      
      return {
        handoffId,
        filePath: handoffFile,
        success: true
      };
      
    } catch (error) {
      console.error('Failed to create handoff:', error.message);
      throw error;
    }
  }

  async updateHandoffRegistry(handoffId, sourceAgent, targetAgent) {
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
        status: 'pending'
      });
      
      // Keep only last 50 handoffs
      if (registry.length > 50) {
        registry = registry.slice(-50);
      }
      
      fs.writeFileSync(registryFile, JSON.stringify(registry, null, 2));
    } catch (error) {
      console.error('Failed to update handoff registry:', error.message);
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
}

// CLI Interface
async function handleHandoffCommand() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found. Run \`npx bmad-method install\` first.');
      process.exit(1);
    }

    const handoffManager = new HandoffManager();
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'create':
        if (args.length < 3) {
          console.log('Usage: node handoff.js create <from-agent> <to-agent> [context]');
          process.exit(1);
        }
        await createHandoff(handoffManager, args[1], args[2], args[3] || '');
        break;
      case 'list':
        await listPendingHandoffs(handoffManager, args[1]);
        break;
      case 'status':
        await showHandoffStatus(handoffManager);
        break;
      default:
        // Backward compatibility - if first arg looks like agent name
        if (args.length >= 2) {
          await createHandoff(handoffManager, args[0], args[1], args[2] || '');
        } else {
          showUsage();
        }
    }
  } catch (error) {
    console.error('❌ Handoff command failed:', error.message);
    process.exit(1);
  }
}

async function createHandoff(handoffManager, fromAgent, toAgent, context) {
  try {
    const result = await handoffManager.createHandoff(fromAgent, toAgent, context);
    
    console.log('✅ Enhanced handoff package created successfully');
    console.log(\`📦 Handoff ID: \${result.handoffId}\`);
    console.log(\`📁 File: \${result.filePath}\`);
    console.log(\`🎯 Target Agent Type: \${handoffManager.getAgentType(toAgent)}\`);
    console.log(\`📄 Context loaded from workspace automatically\`);
  } catch (error) {
    console.error('❌ Failed to create handoff:', error.message);
    process.exit(1);
  }
}

async function listPendingHandoffs(handoffManager, targetAgent) {
  try {
    const pending = await handoffManager.getPendingHandoffs(targetAgent);
    
    if (pending.length === 0) {
      console.log(\`📋 No pending handoffs\${targetAgent ? \` for \${targetAgent}\` : ''}\`);
      return;
    }
    
    console.log(\`📋 Pending Handoffs\${targetAgent ? \` for \${targetAgent}\` : ''}\`);
    console.log('='.repeat(50));
    
    pending.forEach((handoff, index) => {
      console.log(\`\${index + 1}. \${handoff.handoffId}\`);
      console.log(\`   From: \${handoff.sourceAgent} → To: \${handoff.targetAgent}\`);
      console.log(\`   Created: \${new Date(handoff.timestamp).toLocaleString()}\`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to list handoffs:', error.message);
  }
}

async function showHandoffStatus(handoffManager) {
  try {
    const registryFile = path.join(handoffManager.handoffsPath, 'handoff-registry.json');
    
    if (!fs.existsSync(registryFile)) {
      console.log('📋 No handoffs created yet.');
      return;
    }
    
    const content = fs.readFileSync(registryFile, 'utf8');
    const registry = JSON.parse(content);
    
    console.log('📊 Handoff System Status');
    console.log('========================');
    console.log(\`📁 Handoffs Directory: \${handoffManager.handoffsPath}\`);
    console.log(\`📋 Total Handoffs: \${registry.length}\`);
    console.log(\`⏳ Pending Handoffs: \${registry.filter(h => h.status === 'pending').length}\`);
    
    if (registry.length > 0) {
      console.log('\\n📈 Recent Activity:');
      registry.slice(-3).forEach((handoff, index) => {
        console.log(\`  \${index + 1}. \${handoff.sourceAgent} → \${handoff.targetAgent}\`);
        console.log(\`     \${new Date(handoff.timestamp).toLocaleString()}\`);
      });
    }
  } catch (error) {
    console.error('❌ Failed to show handoff status:', error.message);
  }
}

function showUsage() {
  console.log('🤝 BMAD Agent Handoff System');
  console.log('=============================');
  console.log('');
  console.log('Usage: node handoff.js <command> [options]');
  console.log('');
  console.log('Commands:');
  console.log('  create <from> <to> [context]  - Create handoff package with workspace context');
  console.log('  list [agent]                  - List pending handoffs (optionally filtered by target agent)');
  console.log('  status                        - Show handoff system status');
  console.log('');
  console.log('Examples:');
  console.log('  node handoff.js create dev qa "Ready for testing"');
  console.log('  node handoff.js list qa');
  console.log('  node handoff.js status');
  console.log('');
  console.log('Backward compatibility:');
  console.log('  node handoff.js <from-agent> <to-agent> [context]');
}

if (require.main === module) {
  handleHandoffCommand();
}

module.exports = { HandoffManager };
`;
    
    fs.writeFileSync(path.join(utilsPath, 'handoff.js'), handoffScript);
    fs.chmodSync(path.join(utilsPath, 'handoff.js'), 0o755);
  }

  async createSyncScript(utilsPath) {
    const syncScript = `#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function syncWorkspace() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      process.exit(1);
    }
    
    console.log('🔄 Synchronizing workspace context...');
    
    // Update session heartbeat
    const sessionsPath = path.join(workspacePath, 'sessions');
    let sessionFiles = [];
    if (fs.existsSync(sessionsPath)) {
      try {
        sessionFiles = fs.readdirSync(sessionsPath);
      } catch (e) {
        sessionFiles = [];
      }
    }
    
    // For simplicity, update the most recent session
    let latestSession = null;
    let latestTime = 0;
    
    for (const file of sessionFiles) {
      if (file.endsWith('.json')) {
        try {
          const sessionPath = path.join(sessionsPath, file);
          const sessionContent = fs.readFileSync(sessionPath, 'utf8');
          const sessionData = JSON.parse(sessionContent);
          const created = new Date(sessionData.created).getTime();
          
          if (created > latestTime) {
            latestTime = created;
            latestSession = { path: sessionPath, data: sessionData };
          }
        } catch (e) {
          // Skip corrupted files
        }
      }
    }
    
    if (latestSession) {
      latestSession.data.lastHeartbeat = new Date().toISOString();
      fs.writeFileSync(latestSession.path, JSON.stringify(latestSession.data, null, 2));
      console.log(\`✅ Updated session heartbeat: \${latestSession.data.id}\`);
    }
    
    // Load and display recent context
    const contextPath = path.join(workspacePath, 'context');
    const sharedContext = path.join(contextPath, 'shared-context.md');
    
    if (fs.existsSync(sharedContext)) {
      try {
        const content = fs.readFileSync(sharedContext, 'utf8');
        console.log('\\n📄 Current Shared Context:');
        console.log('='.repeat(50));
        console.log(content.substring(0, 500) + (content.length > 500 ? '...' : ''));
      } catch (e) {
        console.log('\\n📄 Shared context file exists but could not be read.');
      }
    } else {
      console.log('\\n📄 No shared context available yet.');
    }
    
    console.log('\\n✅ Workspace synchronization completed');
    
  } catch (error) {
    console.error('❌ Failed to sync workspace:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  syncWorkspace();
}

module.exports = { syncWorkspace };
`;
    
    fs.writeFileSync(path.join(utilsPath, 'sync.js'), syncScript);
    fs.chmodSync(path.join(utilsPath, 'sync.js'), 0o755);
  }

  async createContextScript(utilsPath) {
    const contextScript = `#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

// Context Management CLI
async function handleContextCommand() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found. Run \`npx bmad-method install\` first.');
      process.exit(1);
    }

    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
      case 'status':
        await showContextStatus();
        break;
      case 'load':
        await loadContext();
        break;
      case 'decisions':
        await showDecisions();
        break;
      case 'progress':
        await showProgress();
        break;
      case 'export':
        await exportContext();
        break;
      default:
        showUsage();
    }
  } catch (error) {
    console.error('❌ Context command failed:', error.message);
    process.exit(1);
  }
}

async function showContextStatus() {
  const workspacePath = path.join(process.cwd(), '.workspace');
  const contextPath = path.join(workspacePath, 'context');
  const contextFile = path.join(contextPath, 'shared-context.md');
  
  console.log('📄 BMAD Context Status');
  console.log('======================');
  console.log(\`📁 Context: \${contextPath}\`);
  
  if (fs.existsSync(contextFile)) {
    const content = fs.readFileSync(contextFile, 'utf8');
    const lastUpdatedMatch = content.match(/\\*\\*Last Updated:\\*\\* (.+)/);
    const primaryAgentMatch = content.match(/\\*\\*Primary Agent:\\*\\* (.+)/);
    const currentFocusMatch = content.match(/## Current Focus\\n([\\s\\S]*?)(?=\\n## |$)/);
    
    console.log(\`🕐 Last Updated: \${lastUpdatedMatch ? lastUpdatedMatch[1] : 'Unknown'}\`);
    console.log(\`👤 Primary Agent: \${primaryAgentMatch ? primaryAgentMatch[1] : 'Unknown'}\`);
    console.log(\`🎯 Current Focus: \${currentFocusMatch ? currentFocusMatch[1].trim() : 'No focus set'}\`);
  } else {
    console.log('📄 No shared context available yet.');
    console.log('💡 Context will be created when agents start working.');
  }
  
  // Check for other context files
  const decisionsFile = path.join(workspacePath, 'decisions', 'decisions-log.md');
  const progressFile = path.join(workspacePath, 'progress', 'progress-summary.md');
  const qualityFile = path.join(workspacePath, 'quality', 'quality-metrics.md');
  
  console.log(\`\\n📋 Decisions Log: \${fs.existsSync(decisionsFile) ? 'Available' : 'Not created yet'}\`);
  console.log(\`📈 Progress Summary: \${fs.existsSync(progressFile) ? 'Available' : 'Not created yet'}\`);
  console.log(\`📊 Quality Metrics: \${fs.existsSync(qualityFile) ? 'Available' : 'Not created yet'}\`);
}

async function loadContext() {
  const contextFile = path.join(process.cwd(), '.workspace', 'context', 'shared-context.md');
  
  if (!fs.existsSync(contextFile)) {
    console.log('📄 No shared context available yet.');
    console.log('💡 Context will be created when agents start working.');
    return;
  }
  
  console.log('📄 Loading workspace context...\\n');
  const content = fs.readFileSync(contextFile, 'utf8');
  console.log(content);
}

async function showDecisions() {
  const decisionsFile = path.join(process.cwd(), '.workspace', 'decisions', 'decisions-log.md');
  
  if (!fs.existsSync(decisionsFile)) {
    console.log('📋 No decisions recorded yet.');
    console.log('💡 Decisions will be logged as agents make architectural choices.');
    return;
  }
  
  console.log('📋 Recent Architectural & Design Decisions');
  console.log('==========================================');
  
  const content = fs.readFileSync(decisionsFile, 'utf8');
  const decisions = content.split('## Decision ').slice(1);
  
  if (decisions.length === 0) {
    console.log('📋 No decisions recorded yet.');
    return;
  }
  
  // Show last 5 decisions
  decisions.slice(-5).forEach((decision, index) => {
    const lines = decision.split('\\n');
    const title = lines[0].replace(/^\\d+:\\s*/, '');
    const dateMatch = decision.match(/\\*\\*Date:\\*\\* (.+)/);
    const agentMatch = decision.match(/\\*\\*Agent:\\*\\* (.+)/);
    
    console.log(\`\\n\${decisions.length - 4 + index}. \${title}\`);
    if (dateMatch) console.log(\`   📅 \${dateMatch[1]}\`);
    if (agentMatch) console.log(\`   👤 \${agentMatch[1]}\`);
  });
}

async function showProgress() {
  const progressFile = path.join(process.cwd(), '.workspace', 'progress', 'progress-summary.md');
  
  if (!fs.existsSync(progressFile)) {
    console.log('📈 No progress tracking available yet.');
    console.log('💡 Progress will be tracked as agents work on stories.');
    return;
  }
  
  console.log('📈 Development Progress');
  console.log('======================');
  
  const content = fs.readFileSync(progressFile, 'utf8');
  console.log(content);
}

async function exportContext() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    const timestamp = new Date().toISOString();
    
    let exportContent = \`# Workspace Context Export\\n**Generated:** \${timestamp}\\n\\n\`;
    
    // Add shared context
    const contextFile = path.join(workspacePath, 'context', 'shared-context.md');
    if (fs.existsSync(contextFile)) {
      exportContent += '## Shared Context\\n';
      exportContent += fs.readFileSync(contextFile, 'utf8') + '\\n\\n';
    }
    
    // Add recent decisions
    const decisionsFile = path.join(workspacePath, 'decisions', 'decisions-log.md');
    if (fs.existsSync(decisionsFile)) {
      exportContent += '## Recent Decisions\\n';
      const decisionsContent = fs.readFileSync(decisionsFile, 'utf8');
      const decisions = decisionsContent.split('## Decision ').slice(-3);
      exportContent += decisions.join('## Decision ') + '\\n\\n';
    }
    
    // Add progress summary
    const progressFile = path.join(workspacePath, 'progress', 'progress-summary.md');
    if (fs.existsSync(progressFile)) {
      exportContent += '## Progress Summary\\n';
      exportContent += fs.readFileSync(progressFile, 'utf8') + '\\n\\n';
    }
    
    const exportFile = path.join(process.cwd(), \`context-export-\${Date.now()}.md\`);
    fs.writeFileSync(exportFile, exportContent);
    
    console.log('✅ Context exported successfully');
    console.log(\`📁 Export file: \${exportFile}\`);
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
  console.log('  node workspace-utils/context.js status');
  console.log('  npm run workspace-context status');
  console.log('  node workspace-utils/context.js export');
}

if (require.main === module) {
  handleContextCommand();
}
`;
    
    fs.writeFileSync(path.join(utilsPath, 'context.js'), contextScript);
    fs.chmodSync(path.join(utilsPath, 'context.js'), 0o755);
  }

  async addPackageJsonScripts(installDir) {
    const packageJsonPath = path.join(installDir, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      // Add workspace scripts
      packageJson.scripts['workspace-init'] = 'node workspace-utils/init.js';
      packageJson.scripts['workspace-status'] = 'node workspace-utils/status.js';
      packageJson.scripts['workspace-cleanup'] = 'node workspace-utils/cleanup.js';
      packageJson.scripts['workspace-handoff'] = 'node workspace-utils/handoff.js';
      packageJson.scripts['workspace-sync'] = 'node workspace-utils/sync.js';
      packageJson.scripts['workspace-context'] = 'node workspace-utils/context.js';
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
  }

  async createIDEDocumentation(utilsPath, selectedIDEs) {
    const docsPath = path.join(utilsPath, 'docs');
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
    }
    
    const ideDocuments = {
      'cursor': `# Workspace Usage in Cursor

## Getting Started
1. Open terminal in Cursor
2. Run \`node workspace-utils/init.js\` to start collaborative session
3. Use \`node workspace-utils/status.js\` to see active sessions

## Best Practices
- Use @dev, @qa, @architect mentions to invoke BMAD agents
- Run \`node workspace-utils/sync.js\` before major context switches
- Check \`node workspace-utils/status.js\` to see other team members' progress
`,
      'windsurf': `# Workspace Usage in Windsurf

## Getting Started
1. Open terminal in Windsurf
2. Run \`node workspace-utils/init.js\` to start collaborative session
3. Use \`node workspace-utils/status.js\` to see active sessions

## Best Practices
- Use @agent-name to invoke BMAD agents
- Run \`node workspace-utils/sync.js\` to stay synchronized
- Check workspace status regularly for team coordination
`,
      'claude-code': `# Workspace Usage in Claude Code CLI

## Getting Started
Claude Code CLI users get enhanced workspace experience with native commands:

- \`*workspace-init\` - Initialize collaborative session (automatic)
- \`*workspace-status\` - Show active sessions and progress
- \`*workspace-cleanup\` - Clean up and optimize workspace
- \`*workspace-handoff [agent]\` - Prepare handoff to another agent
- \`*workspace-sync\` - Synchronize with latest context

## Native Integration
Workspace features are automatically integrated into your Claude Code CLI session:
- Automatic session registration and heartbeat
- Context-aware agent handoffs
- Intelligent workspace suggestions
`,
      'trae': `# Workspace Usage in Trae

## Getting Started
1. Open terminal in Trae
2. Run \`node workspace-utils/init.js\` to start collaborative session
3. Use \`node workspace-utils/status.js\` to see active sessions

## Integration
- Use @agent mentions to work with BMAD agents
- Workspace context automatically persists across sessions
- Use \`node workspace-utils/handoff.js dev qa\` for explicit handoffs
`
    };
    
    for (const ide of selectedIDEs) {
      if (ideDocuments[ide]) {
        fs.writeFileSync(
          path.join(docsPath, `${ide}.md`),
          ideDocuments[ide]
        );
      }
    }
  }

  async setupClaudeCodeWorkspaceCommands(installDir, spinner) {
    try {
      spinner.text = 'Integrating workspace commands with Claude Code CLI agents...';
      
      const bmadCorePath = path.join(installDir, '.bmad-core');
      const agentsPath = path.join(bmadCorePath, 'agents');
      
      if (!fs.existsSync(agentsPath)) {
        console.warn('⚠️  .bmad-core/agents directory not found. Skipping Claude Code integration.');
        return false;
      }
      
      // Add workspace commands to key agents
      const agentsToUpdate = ['dev.md', 'qa.md', 'sm.md', 'analyst.md', 'architect.md', 'ux-expert.md', 'pm.md', 'po.md'];
      
      for (const agentFile of agentsToUpdate) {
        const agentPath = path.join(agentsPath, agentFile);
        
        if (fs.existsSync(agentPath)) {
          let content = fs.readFileSync(agentPath, 'utf8');
          
          // Check if workspace commands already exist
          if (!content.includes('*workspace-init')) {
            // Add workspace commands section
            const workspaceCommands = `

## Workspace Commands

You have access to collaborative workspace commands for multi-session coordination:

- \`*workspace-init\` - Initialize collaborative workspace session
- \`*workspace-status\` - Show current workspace status and active sessions
- \`*workspace-cleanup\` - Clean up workspace files and optimize storage
- \`*workspace-handoff [target-agent]\` - Prepare context handoff to specified agent
- \`*workspace-sync\` - Synchronize with latest workspace context

Use these commands to coordinate with other AI agents and maintain context across sessions.
`;
            
            // Insert before the last section (usually before final instructions)
            const insertPoint = content.lastIndexOf('\n## ');
            if (insertPoint > -1) {
              content = content.slice(0, insertPoint) + workspaceCommands + '\n' + content.slice(insertPoint);
            } else {
              content += workspaceCommands;
            }
            
            fs.writeFileSync(agentPath, content);
          }
        }
      }
      
      // Install Claude Code CLI optimization modules
      spinner.text = 'Installing Claude Code CLI optimization features...';
      
      await this.installClaudeCodeOptimizations(installDir);
      
      return true;
    } catch (error) {
      console.error(chalk.red('Failed to integrate Claude Code workspace commands:'), error.message);
      return false;
    }
  }

  /**
   * Install Claude Code CLI optimization features
   */
  async installClaudeCodeOptimizations(installDir) {
    try {
      const workspacePath = path.join(installDir, '.workspace');
      const optimizationsPath = path.join(workspacePath, 'claude-code-optimizations');
      
      // Ensure optimizations directory exists
      if (!fs.existsSync(optimizationsPath)) {
        fs.mkdirSync(optimizationsPath, { recursive: true });
      }

      // Create session manager
      const sessionManagerScript = `const ClaudeCodeSessionManager = require('../../tools/installer/lib/claude-code-session-manager');
const ClaudeCodeWorkspaceCommands = require('../../tools/installer/lib/claude-code-workspace-commands');
const ClaudeCodeContextIntegration = require('../../tools/installer/lib/claude-code-context-integration');
const ClaudeCodeMaintenanceSystem = require('../../tools/installer/lib/claude-code-maintenance-system');
const ClaudeCodeUXEnhancements = require('../../tools/installer/lib/claude-code-ux-enhancements');

// Claude Code CLI Enhanced Session Manager
class EnhancedClaudeCodeSession {
  constructor(workspaceDir = process.cwd()) {
    this.workspaceDir = workspaceDir;
    this.sessionManager = new ClaudeCodeSessionManager(workspaceDir);
    this.workspaceCommands = new ClaudeCodeWorkspaceCommands(workspaceDir);
    this.contextIntegration = new ClaudeCodeContextIntegration(workspaceDir);
    this.maintenanceSystem = new ClaudeCodeMaintenanceSystem(workspaceDir);
    this.uxEnhancements = new ClaudeCodeUXEnhancements(workspaceDir);
  }

  async initialize(agentType = 'dev', options = {}) {
    console.log('🚀 Starting Claude Code CLI Enhanced Session...');
    
    // Initialize session with automatic features
    const sessionResult = await this.sessionManager.initializeSession(agentType, {
      name: require('path').basename(this.workspaceDir),
      ...options
    });

    if (sessionResult.status === 'initialized') {
      // Initialize UX enhancements
      await this.uxEnhancements.initializeUXEnhancements(sessionResult.sessionId, agentType);
      
      // Perform startup integrity check
      await this.maintenanceSystem.performStartupIntegrityCheck();
      
      // Generate intelligent suggestions
      await this.uxEnhancements.generateIntelligentSuggestions();
      
      console.log('✨ Claude Code CLI Enhanced Session ready!');
      console.log('   • Native workspace commands active');
      console.log('   • Automatic session management enabled');  
      console.log('   • Context-aware features initialized');
      console.log('   • Built-in maintenance system active');
      console.log('   • Enhanced UX features enabled');
    }

    return sessionResult;
  }

  async executeCommand(commandName, ...args) {
    const result = await this.workspaceCommands[commandName]?.(...args);
    
    // Add status indicators to response
    return this.uxEnhancements.addWorkspaceStatusIndicators(result, commandName);
  }
}

module.exports = EnhancedClaudeCodeSession;

// Auto-initialize if Claude Code CLI session detected
if (process.env.CLAUDE_CODE_SESSION) {
  const session = new EnhancedClaudeCodeSession();
  session.initialize().catch(console.error);
}
`;

      fs.writeFileSync(path.join(optimizationsPath, 'enhanced-session.js'), sessionManagerScript);

      // Create workspace command implementations
      const workspaceImplementations = `// Claude Code CLI Workspace Command Implementations
// These provide the actual functionality behind the workspace commands in agent definitions

const EnhancedClaudeCodeSession = require('./enhanced-session');

class WorkspaceCommandImplementations {
  constructor() {
    this.session = new EnhancedClaudeCodeSession();
  }

  // Implementation for *workspace-init command
  async workspaceInit(agentType = 'dev', options = {}) {
    return await this.session.initialize(agentType, options);
  }

  // Implementation for *workspace-status command  
  async workspaceStatus(detailed = false) {
    return await this.session.workspaceCommands.workspaceStatus(detailed);
  }

  // Implementation for *workspace-cleanup command
  async workspaceCleanup(options = {}) {
    return await this.session.workspaceCommands.workspaceCleanup(options);
  }

  // Implementation for *workspace-handoff command
  async workspaceHandoff(targetAgent, context = {}) {
    return await this.session.workspaceCommands.workspaceHandoff(targetAgent, context);
  }

  // Implementation for *workspace-sync command
  async workspaceSync(options = {}) {
    return await this.session.workspaceCommands.workspaceSync(options);
  }
}

module.exports = new WorkspaceCommandImplementations();
`;

      fs.writeFileSync(path.join(optimizationsPath, 'command-implementations.js'), workspaceImplementations);

      // Create configuration file
      const optimizationConfig = {
        version: '1.0',
        created: new Date().toISOString(),
        features: {
          nativeCommands: true,
          automaticSessionManagement: true,
          contextAwareHandoffs: true,
          builtInMaintenance: true,
          enhancedUXFeatures: true
        },
        settings: {
          autoSuggestions: true,
          performanceOptimization: true,
          intelligentHandoffs: true,
          backgroundMaintenance: true
        },
        integration: {
          claudeCodeCLI: true,
          workspaceSystem: true,
          bmadFramework: true
        }
      };

      fs.writeFileSync(
        path.join(optimizationsPath, 'optimization-config.json'),
        JSON.stringify(optimizationConfig, null, 2)
      );

      // Create README for optimizations
      const optimizationReadme = `# Claude Code CLI Optimizations

This directory contains enhanced features specifically designed for Claude Code CLI users of the BMAD collaborative workspace system.

## Features

### 🚀 Native Workspace Commands
- \`*workspace-init\` - Initialize collaborative workspace session
- \`*workspace-status\` - Show current workspace status and analytics
- \`*workspace-cleanup\` - Automated maintenance and optimization
- \`*workspace-handoff [agent]\` - Context-aware agent transitions
- \`*workspace-sync\` - Synchronize with latest workspace context

### 🧠 Automatic Session Management
- Automatic session registration and heartbeat monitoring
- Seamless session recovery and context restoration
- Intelligent session cleanup and resource management

### 🔄 Context-Aware Agent Handoffs
- Intelligent handoff opportunity detection
- Enhanced context transfer with smart summarization
- Target-agent specific suggestions and next actions

### 🔧 Built-in Workspace Maintenance
- Automatic integrity checks on session startup
- Proactive issue detection and auto-repair
- Background optimization during idle periods
- Workspace health monitoring and analytics

### ✨ Enhanced User Experience
- Intelligent workspace suggestions based on context
- Productivity analytics and usage insights
- Seamless integration with existing Claude Code CLI workflows
- Context-aware command recommendations

## Usage

These optimizations are automatically enabled when using BMAD agents in Claude Code CLI. No additional configuration required - the enhanced features work transparently with your existing workflow.

## Configuration

Optimization settings can be customized in \`optimization-config.json\`.
`;

      fs.writeFileSync(path.join(optimizationsPath, 'README.md'), optimizationReadme);

      return true;
    } catch (error) {
      console.error('Failed to install Claude Code CLI optimizations:', error.message);
      return false;
    }
  }
}

module.exports = WorkspaceSetup;