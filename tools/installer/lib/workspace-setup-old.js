const path = require("path");
const fs = require("fs-extra");
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
      await fs.ensureDir(workspacePath);
      
      // Create subdirectories
      const subdirs = ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality', 'archive'];
      
      for (const subdir of subdirs) {
        await fs.ensureDir(path.join(workspacePath, subdir));
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
      
      await fs.writeJSON(
        path.join(workspacePath, 'workspace-config.json'), 
        workspaceConfig, 
        { spaces: 2 }
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
      
      await fs.writeFile(path.join(workspacePath, 'README.md'), readmeContent);
      
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
      await fs.ensureDir(utilsPath);
      
      // Create utility scripts
      await this.createInitScript(utilsPath);
      await this.createStatusScript(utilsPath);
      await this.createCleanupScript(utilsPath);
      await this.createHandoffScript(utilsPath);
      await this.createSyncScript(utilsPath);
      
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
    
    await fs.writeFile(path.join(utilsPath, 'init.js'), initScript);
    await fs.chmod(path.join(utilsPath, 'init.js'), 0o755);
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
      console.log('   Run \`npm run workspace-cleanup\` to repair.');
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
    
    await fs.writeFile(path.join(utilsPath, 'status.js'), statusScript);
    await fs.chmod(path.join(utilsPath, 'status.js'), 0o755);
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
    
    if (!await fs.pathExists(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      process.exit(1);
    }
    
    console.log('🧹 Starting workspace cleanup...');
    
    // Repair directory structure
    const directories = ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality', 'archive'];
    let repairedDirs = 0;
    
    for (const dir of directories) {
      const dirPath = path.join(workspacePath, dir);
      if (!await fs.pathExists(dirPath)) {
        await fs.ensureDir(dirPath);
        repairedDirs++;
      }
    }
    
    if (repairedDirs > 0) {
      console.log(\`✅ Repaired \${repairedDirs} missing directories\`);
    }
    
    // Clean up expired sessions (older than 2 hours)
    const sessionsPath = path.join(workspacePath, 'sessions');
    const sessionFiles = await fs.readdir(sessionsPath).catch(() => []);
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
    
    let cleanedSessions = 0;
    for (const file of sessionFiles) {
      if (file.endsWith('.json')) {
        try {
          const sessionPath = path.join(sessionsPath, file);
          const sessionData = await fs.readJSON(sessionPath);
          const lastHeartbeat = new Date(sessionData.lastHeartbeat).getTime();
          
          if (lastHeartbeat < twoHoursAgo) {
            await fs.remove(sessionPath);
            cleanedSessions++;
          }
        } catch (e) {
          // Remove corrupted session files
          await fs.remove(path.join(sessionsPath, file));
          cleanedSessions++;
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
    
    if (await fs.pathExists(contextPath)) {
      const contextFiles = await fs.readdir(contextPath).catch(() => []);
      let archivedFiles = 0;
      
      for (const file of contextFiles) {
        const filePath = path.join(contextPath, file);
        const stats = await fs.stat(filePath).catch(() => null);
        
        if (stats && stats.mtime.getTime() < thirtyDaysAgo) {
          const archiveFile = path.join(archivePath, \`archived-\${Date.now()}-\${file}\`);
          await fs.move(filePath, archiveFile);
          archivedFiles++;
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
    
    await fs.writeFile(path.join(utilsPath, 'cleanup.js'), cleanupScript);
    await fs.chmod(path.join(utilsPath, 'cleanup.js'), 0o755);
  }

  async createHandoffScript(utilsPath) {
    const handoffScript = `#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

async function createHandoff(fromAgent, toAgent, context = '') {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    const handoffsPath = path.join(workspacePath, 'handoffs');
    
    if (!await fs.pathExists(handoffsPath)) {
      console.error('❌ Workspace handoffs directory not found.');
      process.exit(1);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const handoffId = \`\${fromAgent}-to-\${toAgent}-\${timestamp}\`;
    const handoffFile = path.join(handoffsPath, \`\${handoffId}.md\`);
    
    const handoffContent = \`# Agent Handoff: \${fromAgent} → \${toAgent}

**Created:** \${new Date().toISOString()}
**Handoff ID:** \${handoffId}
**Source Agent:** \${fromAgent}
**Target Agent:** \${toAgent}

## Context Summary
\${context || 'No additional context provided.'}

## Key Decisions Made
[To be filled by source agent]

## Current Progress
[To be filled by source agent]

## Next Actions for \${toAgent}
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

## Files and References
[List of relevant files and documentation]

## Blockers and Dependencies
[Any blockers or dependencies the target agent should be aware of]

## Handoff Validation
- [ ] Context completeness verified
- [ ] Decisions documented
- [ ] Next actions clearly defined
- [ ] References included
\`;
    
    await fs.writeFile(handoffFile, handoffContent);
    
    console.log('✅ Handoff package created successfully');
    console.log(\`📦 Handoff ID: \${handoffId}\`);
    console.log(\`📁 File: \${handoffFile}\`);
    
    return handoffId;
  } catch (error) {
    console.error('❌ Failed to create handoff:', error.message);
    process.exit(1);
  }
}

// Command line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node handoff.js <from-agent> <to-agent> [context]');
    process.exit(1);
  }
  
  createHandoff(args[0], args[1], args[2] || '');
}

module.exports = { createHandoff };
`;
    
    await fs.writeFile(path.join(utilsPath, 'handoff.js'), handoffScript);
    await fs.chmod(path.join(utilsPath, 'handoff.js'), 0o755);
  }

  async createSyncScript(utilsPath) {
    const syncScript = `#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

async function syncWorkspace() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!await fs.pathExists(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      process.exit(1);
    }
    
    console.log('🔄 Synchronizing workspace context...');
    
    // Update session heartbeat
    const sessionsPath = path.join(workspacePath, 'sessions');
    const sessionFiles = await fs.readdir(sessionsPath).catch(() => []);
    
    // For simplicity, update the most recent session
    let latestSession = null;
    let latestTime = 0;
    
    for (const file of sessionFiles) {
      if (file.endsWith('.json')) {
        try {
          const sessionPath = path.join(sessionsPath, file);
          const sessionData = await fs.readJSON(sessionPath);
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
      await fs.writeJSON(latestSession.path, latestSession.data, { spaces: 2 });
      console.log(\`✅ Updated session heartbeat: \${latestSession.data.id}\`);
    }
    
    // Load and display recent context
    const contextPath = path.join(workspacePath, 'context');
    const sharedContext = path.join(contextPath, 'shared-context.md');
    
    if (await fs.pathExists(sharedContext)) {
      const content = await fs.readFile(sharedContext, 'utf8');
      console.log('\\n📄 Current Shared Context:');
      console.log('=' .repeat(50));
      console.log(content.substring(0, 500) + (content.length > 500 ? '...' : ''));
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
    
    await fs.writeFile(path.join(utilsPath, 'sync.js'), syncScript);
    await fs.chmod(path.join(utilsPath, 'sync.js'), 0o755);
  }

  async addPackageJsonScripts(installDir) {
    const packageJsonPath = path.join(installDir, 'package.json');
    
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJSON(packageJsonPath);
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }
      
      // Add workspace scripts
      packageJson.scripts['workspace-init'] = 'node workspace-utils/init.js';
      packageJson.scripts['workspace-status'] = 'node workspace-utils/status.js';
      packageJson.scripts['workspace-cleanup'] = 'node workspace-utils/cleanup.js';
      packageJson.scripts['workspace-handoff'] = 'node workspace-utils/handoff.js';
      packageJson.scripts['workspace-sync'] = 'node workspace-utils/sync.js';
      
      await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
    }
  }

  async createIDEDocumentation(utilsPath, selectedIDEs) {
    const docsPath = path.join(utilsPath, 'docs');
    await fs.ensureDir(docsPath);
    
    const ideDocuments = {
      'cursor': `# Workspace Usage in Cursor

## Getting Started
1. Open terminal in Cursor
2. Run \`npm run workspace-init\` to start collaborative session
3. Use \`npm run workspace-status\` to see active sessions

## Best Practices
- Use @dev, @qa, @architect mentions to invoke BMAD agents
- Run \`npm run workspace-sync\` before major context switches
- Check \`npm run workspace-status\` to see other team members' progress
`,
      'windsurf': `# Workspace Usage in Windsurf

## Getting Started
1. Open terminal in Windsurf
2. Run \`npm run workspace-init\` to start collaborative session
3. Use \`npm run workspace-status\` to see active sessions

## Best Practices
- Use @agent-name to invoke BMAD agents
- Run \`npm run workspace-sync\` to stay synchronized
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
2. Run \`npm run workspace-init\` to start collaborative session
3. Use \`npm run workspace-status\` to see active sessions

## Integration
- Use @agent mentions to work with BMAD agents
- Workspace context automatically persists across sessions
- Use \`npm run workspace-handoff dev qa\` for explicit handoffs
`
    };
    
    for (const ide of selectedIDEs) {
      if (ideDocuments[ide]) {
        await fs.writeFile(
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
      
      if (!await fs.pathExists(agentsPath)) {
        console.warn('⚠️  .bmad-core/agents directory not found. Skipping Claude Code integration.');
        return false;
      }
      
      // Add workspace commands to key agents
      const agentsToUpdate = ['dev.md', 'qa.md', 'sm.md'];
      
      for (const agentFile of agentsToUpdate) {
        const agentPath = path.join(agentsPath, agentFile);
        
        if (await fs.pathExists(agentPath)) {
          let content = await fs.readFile(agentPath, 'utf8');
          
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
            
            await fs.writeFile(agentPath, content);
          }
        }
      }
      
      return true;
    } catch (error) {
      console.error(chalk.red('Failed to integrate Claude Code workspace commands:'), error.message);
      return false;
    }
  }
}

module.exports = WorkspaceSetup;