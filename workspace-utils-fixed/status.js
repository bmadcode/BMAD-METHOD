#!/usr/bin/env node
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
    console.log(`📁 Workspace: ${workspacePath}`);
    console.log(`⚙️  Version: ${config.version || 'Unknown'}`);
    console.log(`🕐 Created: ${config.created || 'Unknown'}`);
    console.log(`👥 Active Sessions: ${activeSessions.length}`);
    
    if (activeSessions.length > 0) {
      console.log('\n📍 Session Details:');
      activeSessions.forEach((session, index) => {
        console.log(`  ${index + 1}. ${session.id} (${session.ide}) - ${session.user}`);
        console.log(`     Created: ${new Date(session.created).toLocaleString()}`);
        console.log(`     Last Heartbeat: ${new Date(session.lastHeartbeat).toLocaleString()}`);
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
      console.log(`\n⚠️  Missing directories: ${missingDirs.join(', ')}`);
      console.log('   Run `node workspace-utils/cleanup.js` to repair.');
    } else {
      console.log('\n✅ Workspace structure is healthy');
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