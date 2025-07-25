#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const readline = require('readline');
const { promisify } = require('util');

const RouterGenerator = require('../lib/router-generator');
const BMADMessageQueue = require('../core/message-queue');
const ElicitationBroker = require('../core/elicitation-broker');
const SessionManager = require('../core/session-manager');

class BMADClaudeInstaller {
  constructor() {
    this.homeDir = os.homedir();
    this.claudeDir = path.join(this.homeDir, '.claude');
    this.bmadDir = path.join(this.homeDir, '.bmad');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.question = promisify(this.rl.question).bind(this.rl);
  }

  async install() {
    console.log('🎭 BMAD-METHOD Claude Code Integration Installer\n');
    
    try {
      // Check prerequisites
      await this.checkPrerequisites();
      
      // Get installation preferences
      const config = await this.getInstallationConfig();
      
      // Create directory structure
      await this.createDirectories();
      
      // Generate router subagents
      await this.generateRouters();
      
      // Install subagents
      await this.installSubagents(config);
      
      // Setup hooks if requested
      if (config.installHooks) {
        await this.setupHooks();
      }
      
      // Initialize message queue
      await this.initializeMessageQueue();
      
      // Create slash commands
      await this.createSlashCommands();
      
      // Run verification
      await this.verifyInstallation();
      
      console.log('\n✅ BMAD-METHOD Claude Code integration installed successfully!');
      console.log('\n📚 Quick Start:');
      console.log('1. Restart Claude Code to load the new subagents');
      console.log('2. Use natural language to invoke BMAD agents, or:');
      console.log('3. Use slash commands like /bmad-pm, /bmad-architect, etc.');
      console.log('4. Use /bmad-sessions to see active agent sessions');
      console.log('\n💡 The BMAD agents will handle elicitation naturally in conversation.');
      
    } catch (error) {
      console.error('\n❌ Installation failed:', error.message);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }

  async checkPrerequisites() {
    console.log('🔍 Checking prerequisites...');
    
    // Check if Claude directory exists
    try {
      await fs.access(this.claudeDir);
      console.log('✓ Claude Code directory found');
    } catch {
      throw new Error(`Claude Code directory not found at ${this.claudeDir}. Please ensure Claude Code is installed.`);
    }
    
    // Check if BMAD-METHOD is in parent directory
    const bmadCorePath = path.join(__dirname, '..', '..', 'bmad-core');
    try {
      await fs.access(bmadCorePath);
      console.log('✓ BMAD-METHOD core found');
    } catch {
      throw new Error('BMAD-METHOD core not found. Please run this installer from within the BMAD-METHOD repository.');
    }
  }

  async getInstallationConfig() {
    console.log('\n⚙️  Installation Configuration\n');
    
    const config = {};
    
    // Ask about hooks
    const hooksAnswer = await this.question('Install hooks for enhanced integration? (y/N): ');
    config.installHooks = hooksAnswer.toLowerCase() === 'y';
    
    // Ask about existing subagents
    const agentsDir = path.join(this.claudeDir, 'agents');
    try {
      const existingAgents = await fs.readdir(agentsDir);
      if (existingAgents.length > 0) {
        console.log(`\n⚠️  Found ${existingAgents.length} existing subagents in ${agentsDir}`);
        const overwriteAnswer = await this.question('Overwrite existing BMAD subagents if they exist? (y/N): ');
        config.overwriteExisting = overwriteAnswer.toLowerCase() === 'y';
      }
    } catch {
      // No agents directory yet
      config.overwriteExisting = true;
    }
    
    return config;
  }

  async createDirectories() {
    console.log('\n📁 Creating directory structure...');
    
    const dirs = [
      this.bmadDir,
      path.join(this.bmadDir, 'queue'),
      path.join(this.bmadDir, 'queue', 'active'),
      path.join(this.bmadDir, 'queue', 'completed'),
      path.join(this.bmadDir, 'queue', 'failed'),
      path.join(this.bmadDir, 'queue', 'elicitation'),
      path.join(this.bmadDir, 'sessions'),
      path.join(this.bmadDir, 'routing'),
      path.join(this.bmadDir, 'archive'),
      path.join(this.claudeDir, 'agents'),
      path.join(this.claudeDir, 'slash-commands')
    ];
    
    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
    
    console.log('✓ Directory structure created');
  }

  async generateRouters() {
    console.log('\n🤖 Generating router subagents...');
    
    const generator = new RouterGenerator({
      outputPath: path.join(__dirname, '..', 'routers')
    });
    
    await generator.generateRouters();
    console.log('✓ Router subagents generated');
  }

  async installSubagents(config) {
    console.log('\n📦 Installing subagents...');
    
    const routersDir = path.join(__dirname, '..', 'routers');
    const agentsDir = path.join(this.claudeDir, 'agents');
    
    const routers = await fs.readdir(routersDir);
    let installed = 0;
    let skipped = 0;
    
    for (const router of routers) {
      if (!router.endsWith('.md')) continue;
      
      const sourcePath = path.join(routersDir, router);
      const targetPath = path.join(agentsDir, router);
      
      try {
        await fs.access(targetPath);
        if (!config.overwriteExisting) {
          skipped++;
          continue;
        }
      } catch {
        // File doesn't exist, safe to install
      }
      
      await fs.copyFile(sourcePath, targetPath);
      installed++;
    }
    
    console.log(`✓ Installed ${installed} subagents${skipped > 0 ? ` (skipped ${skipped} existing)` : ''}`);
  }

  async setupHooks() {
    console.log('\n🪝 Setting up hooks...');
    
    const hooksConfig = {
      hooks: {
        UserPromptSubmit: [
          {
            matcher: ".*",
            hooks: [
              {
                type: "command",
                command: path.join(__dirname, '..', 'hooks', 'bmad-session-check.sh')
              }
            ]
          }
        ],
        SubagentStop: [
          {
            matcher: "bmad-.*",
            hooks: [
              {
                type: "command",
                command: path.join(__dirname, '..', 'hooks', 'bmad-context-save.sh')
              }
            ]
          }
        ]
      }
    };
    
    // Create hook scripts
    await this.createHookScripts();
    
    // Update settings.json
    const settingsPath = path.join(this.claudeDir, 'settings.json');
    let settings = {};
    
    try {
      const existing = await fs.readFile(settingsPath, 'utf8');
      settings = JSON.parse(existing);
    } catch {
      // No existing settings
    }
    
    // Merge hooks
    if (!settings.hooks) {
      settings.hooks = {};
    }
    
    for (const [event, configs] of Object.entries(hooksConfig.hooks)) {
      if (!settings.hooks[event]) {
        settings.hooks[event] = [];
      }
      settings.hooks[event].push(...configs);
    }
    
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
    console.log('✓ Hooks configured');
  }

  async createHookScripts() {
    const hooksDir = path.join(__dirname, '..', 'hooks');
    
    // Session check hook
    const sessionCheckScript = `#!/bin/bash
# BMAD Session Check Hook
# Checks for active BMAD sessions and displays them if needed

SESSIONS_DIR="$HOME/.bmad/sessions"
if [ -d "$SESSIONS_DIR" ] && [ "\$(ls -A $SESSIONS_DIR 2>/dev/null)" ]; then
  echo "📋 Active BMAD Sessions available. Use /bmad-sessions to view."
fi
`;

    // Context save hook
    const contextSaveScript = `#!/bin/bash
# BMAD Context Save Hook
# Saves context when a BMAD subagent completes

AGENT_NAME="\$1"
SESSION_ID="\$2"
CONTEXT_FILE="$HOME/.bmad/sessions/\${AGENT_NAME}/\${SESSION_ID}/context.json"

if [ -n "\$CONTEXT_FILE" ] && [ -f "\$CONTEXT_FILE" ]; then
  cp "\$CONTEXT_FILE" "\$CONTEXT_FILE.bak"
fi
`;

    await fs.writeFile(
      path.join(hooksDir, 'bmad-session-check.sh'),
      sessionCheckScript,
      { mode: 0o755 }
    );
    
    await fs.writeFile(
      path.join(hooksDir, 'bmad-context-save.sh'),
      contextSaveScript,
      { mode: 0o755 }
    );
  }

  async initializeMessageQueue() {
    console.log('\n📬 Initializing message queue...');
    
    const queue = new BMADMessageQueue();
    await queue.initialize();
    
    const broker = new ElicitationBroker(queue);
    const sessionManager = new SessionManager(queue, broker);
    await sessionManager.initialize();
    
    console.log('✓ Message queue initialized');
  }

  async createSlashCommands() {
    console.log('\n✂️  Creating slash commands...');
    
    const generator = new RouterGenerator();
    const commands = await generator.generateSlashCommands();
    const slashDir = path.join(this.claudeDir, 'slash-commands');
    
    for (const cmd of commands) {
      const cmdPath = path.join(slashDir, `${cmd.name}.md`);
      const content = `# ${cmd.description}\n\n${cmd.content}`;
      await fs.writeFile(cmdPath, content);
    }
    
    console.log(`✓ Created ${commands.length} slash commands`);
  }

  async verifyInstallation() {
    console.log('\n🔍 Verifying installation...');
    
    const checks = [
      { path: path.join(this.claudeDir, 'agents', 'bmad-router.md'), name: 'Main router' },
      { path: path.join(this.claudeDir, 'agents', 'bmad-pm-router.md'), name: 'PM router' },
      { path: this.bmadDir, name: 'BMAD directory' },
      { path: path.join(this.claudeDir, 'slash-commands', 'bmad-sessions.md'), name: 'Sessions command' }
    ];
    
    for (const check of checks) {
      try {
        await fs.access(check.path);
        console.log(`✓ ${check.name} verified`);
      } catch {
        throw new Error(`${check.name} not found at ${check.path}`);
      }
    }
  }
}

// Run installer
if (require.main === module) {
  const installer = new BMADClaudeInstaller();
  installer.install();
}

module.exports = BMADClaudeInstaller;