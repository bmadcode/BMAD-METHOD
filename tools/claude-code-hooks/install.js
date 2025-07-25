#!/usr/bin/env node

/**
 * BMAD Claude Code Hooks Installer
 * Installs hooks to a BMAD project for Claude Code integration
 * Uses only Node.js built-in modules
 */

const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');

async function install() {
  try {
    console.log('🚀 BMAD Claude Code Hooks Installer\n');
    
    // Get project directory from command line or use current directory
    const projectDir = process.argv[2] || process.cwd();
    
    // Verify this is a BMAD project
    const bmadCorePath = path.join(projectDir, '.bmad-core');
    if (!existsSync(bmadCorePath)) {
      console.log('❌ Error: Not a BMAD project directory');
      console.log(`   Looking for .bmad-core in: ${projectDir}`);
      console.log('\nPlease run this from a directory where BMAD is installed.');
      return;
    }
    
    console.log(`📂 Installing hooks for project: ${projectDir}`);
    
    // Copy hook files to project
    const hooksSourceDir = path.resolve(__dirname);
    const hooksTargetDir = path.join(projectDir, '.bmad-core', 'hooks', 'claude-code');
    
    console.log('📋 Copying hook files to project...');
    await fs.mkdir(hooksTargetDir, { recursive: true });
    
    // Copy hook files
    const hookFiles = ['user-prompt-submit.js', 'pre-tool-use.js', 'post-tool-use.js', 'stop.js'];
    for (const file of hookFiles) {
      await fs.copyFile(
        path.join(hooksSourceDir, file),
        path.join(hooksTargetDir, file)
      );
    }
    
    // Copy lib directory
    const libSourceDir = path.join(hooksSourceDir, 'lib');
    const libTargetDir = path.join(hooksTargetDir, 'lib');
    await fs.mkdir(libTargetDir, { recursive: true });
    
    const libFiles = await fs.readdir(libSourceDir);
    for (const file of libFiles) {
      await fs.copyFile(
        path.join(libSourceDir, file),
        path.join(libTargetDir, file)
      );
    }
    
    // Check for existing project settings
    const settingsPath = path.join(projectDir, '.claude', 'settings.json');
    let settings = {};
    
    if (existsSync(settingsPath)) {
      console.log('📄 Found existing project Claude settings');
      const settingsContent = await fs.readFile(settingsPath, 'utf8');
      settings = JSON.parse(settingsContent);
      
      // Backup existing settings
      const backupPath = `${settingsPath}.backup.${Date.now()}`;
      await fs.writeFile(backupPath, settingsContent);
      console.log(`📦 Backed up settings to: ${path.basename(backupPath)}`);
    }
    // Build hook configuration with relative paths
    const relativeHooksPath = path.join('.bmad-core', 'hooks', 'claude-code');
    
    const hookConfig = {
      hooks: {
        UserPromptSubmit: [
          {
            name: "BMAD Context Loader",
            description: "Automatically loads active story context and quality reminders",
            hooks: [
              {
                type: "command",
                command: `node "${path.join(relativeHooksPath, 'user-prompt-submit.js')}"`
              }
            ]
          }
        ],
        PreToolUse: [
          {
            name: "BMAD Write Validator",
            matcher: "Write|Edit|MultiEdit",
            description: "Validates story requirements before code modifications",
            hooks: [
              {
                type: "command",
                command: `node "${path.join(relativeHooksPath, 'pre-tool-use.js')}"`
              }
            ]
          }
        ],
        PostToolUse: [
          {
            name: "BMAD Progress Tracker",
            matcher: "Write|Edit|MultiEdit|Bash",
            description: "Updates story progress automatically",
            hooks: [
              {
                type: "command",
                command: `node "${path.join(relativeHooksPath, 'post-tool-use.js')}"`
              }
            ]
          }
        ],
        Stop: [
          {
            name: "BMAD Session Summary",
            description: "Generates quality summary and next steps",
            hooks: [
              {
                type: "command",
                command: `node "${path.join(relativeHooksPath, 'stop.js')}"`
              }
            ]
          }
        ]
      }
    };
    
    // Merge with existing settings
    if (!settings.hooks) {
      settings.hooks = {};
    }
    
    // Create separate BMAD configuration file to avoid validation errors
    const bmadConfig = {
      enabled: true,
      preset: "balanced",
      hooks: {
        userPromptSubmit: {
          enabled: true,
          autoLoadStory: true,
          contextDepth: "current"
        },
        preToolUse: {
          enabled: true,
          blockSimulation: true,
          requireTests: false,
          maxRetries: 3
        },
        postToolUse: {
          enabled: true,
          updateProgress: true,
          trackFiles: true
        },
        stop: {
          enabled: true,
          generateSummary: true,
          saveContext: true
        }
      },
      performance: {
        cacheTimeout: 300000,
        maxTokens: 4000,
        alertThreshold: 500
      }
    };
    
    // Write BMAD config to separate file
    const bmadConfigPath = path.join(projectDir, '.claude', 'bmad-config.json');
    await fs.writeFile(bmadConfigPath, JSON.stringify(bmadConfig, null, 2));
    
    // Merge hooks (preserving existing non-BMAD hooks)
    for (const [hookType, hookList] of Object.entries(hookConfig.hooks)) {
      if (!settings.hooks[hookType]) {
        settings.hooks[hookType] = [];
      }
      
      // Remove old BMAD hooks
      settings.hooks[hookType] = settings.hooks[hookType].filter(
        hook => !hook.name || !hook.name.startsWith('BMAD')
      );
      
      // Add new BMAD hooks
      settings.hooks[hookType].push(...hookList);
    }
    
    // Write updated settings
    await fs.mkdir(path.dirname(settingsPath), { recursive: true });
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
    
    console.log('✅ BMAD Claude Code hooks installed successfully!\n');
    console.log('📋 Installed hooks:');
    console.log('  - Context Loader (UserPromptSubmit)');
    console.log('  - Write Validator (PreToolUse)');
    console.log('  - Progress Tracker (PostToolUse)');
    console.log('  - Session Summary (Stop)\n');
    
    console.log('🎯 Next steps:');
    console.log(`1. Start Claude Code in your project: cd ${projectDir} && claude code .`);
    console.log('2. BMAD hooks will automatically activate');
    console.log('3. Use /reality-audit to validate implementations\n');
    
    console.log('⚙️  To disable hooks temporarily:');
    console.log('Edit .claude/bmad-config.json and set enabled to false');
    console.log('Or use runtime command: *hooks-disable\n');
    
    console.log('📄 Configuration stored in: .claude/bmad-config.json');
    console.log('(Separate file avoids Claude Code validation errors)\n');
    
  } catch (error) {
    console.error('❌ Installation failed:', error.message);
    process.exit(1);
  }
}

// Run installer
install();