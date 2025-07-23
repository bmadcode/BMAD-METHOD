#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function initWorkspace() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found. Run `npx bmad-method install` first.');
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
    
    const sessionFile = path.join(sessionsPath, `${sessionId}.json`);
    fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));
    
    console.log('✅ Workspace initialized successfully');
    console.log(`📍 Session ID: ${sessionId}`);
    console.log(`🕐 Created: ${timestamp}`);
    
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