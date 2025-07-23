#!/usr/bin/env node
/**
 * BMAD Workspace Initialization Utility
 * Cross-IDE workspace initialization with session management
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Detect IDE environment from various sources
 */
function detectIDE() {
  // Check environment variables
  if (process.env.CURSOR_SOCKET) return 'cursor';
  if (process.env.WINDSURF_SESSION) return 'windsurf';
  if (process.env.TRAE_MODE) return 'trae';
  if (process.env.ROO_CODE) return 'roo';
  if (process.env.CLINE_ACTIVE) return 'cline';
  if (process.env.GEMINI_AI_STUDIO) return 'gemini';
  if (process.env.GITHUB_COPILOT) return 'github-copilot';
  if (process.env.VSCODE_PID) return 'vscode';
  if (process.env.IDE_TYPE) return process.env.IDE_TYPE;
  
  // Check for IDE-specific files or patterns
  if (fs.existsSync('.cursor')) return 'cursor';
  if (fs.existsSync('.windsurf')) return 'windsurf';
  if (fs.existsSync('.vscode')) return 'vscode';
  
  return 'unknown';
}

/**
 * Create workspace directory structure
 */
function createWorkspaceStructure(workspacePath) {
  const directories = [
    'sessions',
    'context',
    'handoffs', 
    'decisions',
    'progress',
    'quality',
    'archive',
    'hooks',
    'templates',
    'logs'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(workspacePath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

/**
 * Initialize workspace configuration
 */
function initWorkspaceConfig(workspacePath) {
  const configPath = path.join(workspacePath, 'workspace-config.json');
  
  if (!fs.existsSync(configPath)) {
    const config = {
      version: '1.0.0',
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      features: {
        crossIDESupport: true,
        sessionManagement: true,
        contextPersistence: true,
        agentHandoffs: true,
        qualityTracking: true
      },
      settings: {
        maxSessions: 10,
        sessionTimeout: 3600000, // 1 hour in milliseconds
        autoCleanup: true,
        logLevel: 'info'
      }
    };
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return config;
  }
  
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

/**
 * Create session with IDE-specific metadata
 */
function createSession(workspacePath, ide) {
  const sessionId = crypto.randomBytes(8).toString('hex');
  const timestamp = new Date().toISOString();
  
  const sessionData = {
    id: sessionId,
    ide: ide,
    created: timestamp,
    lastHeartbeat: timestamp,
    pid: process.pid,
    user: process.env.USER || process.env.USERNAME || 'unknown',
    cwd: process.cwd(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    metadata: {
      ideSpecific: getIDESpecificMetadata(ide),
      features: ['context-sharing', 'agent-handoffs', 'quality-tracking']
    }
  };
  
  const sessionFile = path.join(workspacePath, 'sessions', `${sessionId}.json`);
  fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));
  
  return sessionData;
}

/**
 * Get IDE-specific metadata
 */
function getIDESpecificMetadata(ide) {
  const metadata = {
    supportsTerminalCommands: true,
    hasIntegratedGit: false,
    supportsPanels: false,
    hasExtensionSystem: false
  };
  
  switch (ide) {
    case 'cursor':
      metadata.hasIntegratedGit = true;
      metadata.supportsPanels = true;
      metadata.hasExtensionSystem = true;
      metadata.features = ['custom-rules', 'ai-assistance', 'git-integration'];
      break;
    case 'windsurf':
      metadata.hasIntegratedGit = true;
      metadata.supportsPanels = true;
      metadata.features = ['ai-agent', 'terminal-integration'];
      break;
    case 'vscode':
      metadata.hasIntegratedGit = true;
      metadata.supportsPanels = true;
      metadata.hasExtensionSystem = true;
      metadata.features = ['extensions', 'integrated-terminal', 'git-integration'];
      break;
    case 'github-copilot':
      metadata.hasIntegratedGit = true;
      metadata.hasExtensionSystem = true;
      metadata.features = ['ai-assistance', 'code-completion'];
      break;
    default:
      metadata.features = ['basic-terminal'];
  }
  
  return metadata;
}

/**
 * Create IDE-specific setup hints
 */
function createIDESetupHints(workspacePath, ide) {
  const hintsPath = path.join(workspacePath, 'templates', `${ide}-setup.md`);
  
  let setupContent = `# ${ide.toUpperCase()} Workspace Setup\n\n`;
  
  switch (ide) {
    case 'cursor':
      setupContent += `## Cursor Integration
- Add workspace commands to your terminal
- Use \`npm run workspace-status\` to check collaboration status
- Workspace context is automatically shared between sessions
- Custom rules in .cursor/rules/ will respect workspace state

## Commands
\`\`\`bash
npm run workspace-init    # Initialize session
npm run workspace-status  # Check status
npm run workspace-cleanup # Maintenance
\`\`\`
`;
      break;
    case 'windsurf':
      setupContent += `## Windsurf Integration
- Workspace utilities available through terminal
- Context sharing works with Windsurf AI agent
- Session state persists across Windsurf restarts

## Commands
\`\`\`bash
npm run workspace-init    # Start workspace session
npm run workspace-handoff # Prepare agent handoff
npm run workspace-sync    # Sync with latest context
\`\`\`
`;
      break;
    default:
      setupContent += `## ${ide.toUpperCase()} Integration
- Use terminal commands for workspace management
- Full workspace functionality available
- Context persists across IDE sessions

## Available Commands
\`\`\`bash
npm run workspace-init     # Initialize workspace session
npm run workspace-status   # Show workspace status
npm run workspace-cleanup  # Clean and optimize workspace
npm run workspace-handoff  # Manage agent handoffs
npm run workspace-sync     # Synchronize context
npm run workspace-health   # Check workspace health
\`\`\`
`;
  }
  
  if (!fs.existsSync(hintsPath)) {
    fs.writeFileSync(hintsPath, setupContent);
  }
}

/**
 * Main initialization function
 */
async function initWorkspace() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    // Create workspace directory structure
    if (!fs.existsSync(workspacePath)) {
      fs.mkdirSync(workspacePath, { recursive: true });
    }
    
    createWorkspaceStructure(workspacePath);
    
    // Initialize configuration
    const config = initWorkspaceConfig(workspacePath);
    
    // Detect IDE and create session
    const ide = detectIDE();
    const session = createSession(workspacePath, ide);
    
    // Create IDE-specific setup hints
    createIDESetupHints(workspacePath, ide);
    
    // Log initialization
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'workspace-init',
      sessionId: session.id,
      ide: ide,
      user: session.user
    };
    
    const logPath = path.join(workspacePath, 'logs', 'workspace.log');
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    
    // Success output
    console.log('✅ BMAD Workspace initialized successfully');
    console.log('=====================================');
    console.log(`📁 Workspace: ${workspacePath}`);
    console.log(`📍 Session ID: ${session.id}`);
    console.log(`💻 IDE: ${ide}`);
    console.log(`👤 User: ${session.user}`);
    console.log(`🕐 Created: ${new Date(session.created).toLocaleString()}`);
    
    if (ide !== 'unknown') {
      console.log(`\n📖 Setup guide: .workspace/templates/${ide}-setup.md`);
    }
    
    console.log('\n🚀 Ready for collaborative development!');
    console.log('   • Run `npm run workspace-status` to check status');
    console.log('   • Run `npm run workspace-health` for health check');
    
    return session.id;
    
  } catch (error) {
    console.error('❌ Failed to initialize workspace:', error.message);
    console.error('   Make sure you have proper file permissions');
    console.error('   Try running from project root directory');
    process.exit(1);
  }
}

// Command line execution
if (require.main === module) {
  initWorkspace();
}

module.exports = { initWorkspace, detectIDE };