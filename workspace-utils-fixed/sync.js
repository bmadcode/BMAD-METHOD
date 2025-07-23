#!/usr/bin/env node
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
      console.log(`✅ Updated session heartbeat: ${latestSession.data.id}`);
    }
    
    // Load and display recent context
    const contextPath = path.join(workspacePath, 'context');
    const sharedContext = path.join(contextPath, 'shared-context.md');
    
    if (fs.existsSync(sharedContext)) {
      try {
        const content = fs.readFileSync(sharedContext, 'utf8');
        console.log('\n📄 Current Shared Context:');
        console.log('='.repeat(50));
        console.log(content.substring(0, 500) + (content.length > 500 ? '...' : ''));
      } catch (e) {
        console.log('\n📄 Shared context file exists but could not be read.');
      }
    } else {
      console.log('\n📄 No shared context available yet.');
    }
    
    console.log('\n✅ Workspace synchronization completed');
    
  } catch (error) {
    console.error('❌ Failed to sync workspace:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  syncWorkspace();
}

module.exports = { syncWorkspace };