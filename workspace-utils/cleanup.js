#!/usr/bin/env node
/**
 * BMAD Workspace Cleanup Utility
 * Cross-IDE workspace maintenance and optimization
 */

const fs = require('fs');
const path = require('path');

/**
 * Clean up stale sessions
 */
function cleanupStaleSessions(workspacePath) {
  const sessionsPath = path.join(workspacePath, 'sessions');
  if (!fs.existsSync(sessionsPath)) {
    return { removed: 0, errors: [] };
  }
  
  const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
  const now = new Date();
  let removed = 0;
  const errors = [];
  
  for (const file of sessionFiles) {
    try {
      const sessionPath = path.join(sessionsPath, file);
      const sessionContent = fs.readFileSync(sessionPath, 'utf8');
      const sessionData = JSON.parse(sessionContent);
      
      // Remove sessions older than 24 hours without heartbeat
      const lastHeartbeat = new Date(sessionData.lastHeartbeat);
      const timeDiff = now - lastHeartbeat;
      const isStale = timeDiff > 86400000; // 24 hours
      
      if (isStale) {
        fs.unlinkSync(sessionPath);
        removed++;
        console.log(`🗑️  Removed stale session: ${sessionData.id} (${sessionData.ide})`);
      }
      
    } catch (e) {
      errors.push(`Failed to process ${file}: ${e.message}`);
      // Try to remove corrupted files
      try {
        fs.unlinkSync(path.join(sessionsPath, file));
        console.log(`🗑️  Removed corrupted session file: ${file}`);
        removed++;
      } catch (removeError) {
        console.error(`❌ Could not remove corrupted file ${file}: ${removeError.message}`);
      }
    }
  }
  
  return { removed, errors };
}

/**
 * Repair workspace directory structure
 */
function repairWorkspaceStructure(workspacePath) {
  const requiredDirs = [
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
  
  let created = 0;
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(workspacePath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
      created++;
    }
  }
  
  return created;
}

/**
 * Archive old logs
 */
function archiveLogs(workspacePath) {
  const logsPath = path.join(workspacePath, 'logs');
  const logFile = path.join(logsPath, 'workspace.log');
  
  if (!fs.existsSync(logFile)) {
    return { archived: false, reason: 'No log file found' };
  }
  
  const stats = fs.statSync(logFile);
  const logSizeMB = stats.size / (1024 * 1024);
  
  // Archive logs larger than 5MB
  if (logSizeMB > 5) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivePath = path.join(workspacePath, 'archive', `workspace-${timestamp}.log`);
    
    try {
      // Ensure archive directory exists
      const archiveDir = path.join(workspacePath, 'archive');
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
      }
      
      // Move log to archive
      fs.renameSync(logFile, archivePath);
      
      // Create new empty log file
      fs.writeFileSync(logFile, '');
      
      console.log(`📦 Archived log file: ${logSizeMB.toFixed(1)}MB → archive/workspace-${timestamp}.log`);
      return { archived: true, size: logSizeMB, archivePath };
      
    } catch (error) {
      console.error(`❌ Failed to archive log: ${error.message}`);
      return { archived: false, reason: error.message };
    }
  }
  
  return { archived: false, reason: `Log size OK (${logSizeMB.toFixed(1)}MB)` };
}

/**
 * Clean up empty context files
 */
function cleanupContextFiles(workspacePath) {
  const contextPath = path.join(workspacePath, 'context');
  if (!fs.existsSync(contextPath)) {
    return { removed: 0 };
  }
  
  let removed = 0;
  const files = fs.readdirSync(contextPath);
  
  for (const file of files) {
    const filePath = path.join(contextPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile() && stats.size === 0) {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Removed empty context file: ${file}`);
      removed++;
    }
  }
  
  return { removed };
}

/**
 * Optimize workspace storage
 */
function optimizeStorage(workspacePath) {
  const optimization = {
    sessionsCleaned: 0,
    directoriesCreated: 0,
    logsArchived: false,
    contextFilesCleaned: 0,
    totalSpaceSaved: 0
  };
  
  // Clean stale sessions
  const sessionCleanup = cleanupStaleSessions(workspacePath);
  optimization.sessionsCleaned = sessionCleanup.removed;
  
  // Repair directory structure
  optimization.directoriesCreated = repairWorkspaceStructure(workspacePath);
  
  // Archive large logs
  const logArchive = archiveLogs(workspacePath);
  optimization.logsArchived = logArchive.archived;
  if (logArchive.size) {
    optimization.totalSpaceSaved += logArchive.size;
  }
  
  // Clean empty context files
  const contextCleanup = cleanupContextFiles(workspacePath);
  optimization.contextFilesCleaned = contextCleanup.removed;
  
  return optimization;
}

/**
 * Validate workspace integrity
 */
function validateWorkspaceIntegrity(workspacePath) {
  const issues = [];
  const warnings = [];
  
  // Check workspace config
  const configPath = path.join(workspacePath, 'workspace-config.json');
  if (!fs.existsSync(configPath)) {
    issues.push('Missing workspace configuration file');
  } else {
    try {
      JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      issues.push('Corrupted workspace configuration');
    }
  }
  
  // Check directory permissions
  try {
    const testFile = path.join(workspacePath, '.write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
  } catch (e) {
    issues.push('Insufficient write permissions');
  }
  
  // Check session files integrity
  const sessionsPath = path.join(workspacePath, 'sessions');
  if (fs.existsSync(sessionsPath)) {
    const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
    let corruptedSessions = 0;
    
    for (const file of sessionFiles) {
      try {
        JSON.parse(fs.readFileSync(path.join(sessionsPath, file), 'utf8'));
      } catch (e) {
        corruptedSessions++;
      }
    }
    
    if (corruptedSessions > 0) {
      warnings.push(`${corruptedSessions} corrupted session files found`);
    }
  }
  
  return { issues, warnings };
}

/**
 * Main cleanup function
 */
async function cleanupWorkspace(options = {}) {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      console.error('   Run `npm run workspace-init` to initialize workspace');
      process.exit(1);
    }
    
    console.log('🧹 BMAD Workspace Cleanup');
    console.log('========================');
    console.log(`📁 Workspace: ${workspacePath}`);
    
    // Validate integrity first
    if (!options.skipValidation) {
      console.log('\n🔍 Validating workspace integrity...');
      const validation = validateWorkspaceIntegrity(workspacePath);
      
      if (validation.issues.length > 0) {
        console.log('❌ Critical Issues Found:');
        validation.issues.forEach(issue => console.log(`  • ${issue}`));
      }
      
      if (validation.warnings.length > 0) {
        console.log('⚠️  Warnings:');
        validation.warnings.forEach(warning => console.log(`  • ${warning}`));
      }
      
      if (validation.issues.length === 0 && validation.warnings.length === 0) {
        console.log('✅ Workspace integrity OK');
      }
    }
    
    // Perform optimization
    console.log('\n🔧 Optimizing workspace...');
    const optimization = optimizeStorage(workspacePath);
    
    // Log cleanup activity
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'workspace-cleanup',
      optimization: optimization,
      user: process.env.USER || process.env.USERNAME || 'unknown'
    };
    
    const logPath = path.join(workspacePath, 'logs', 'workspace.log');
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    
    // Summary
    console.log('\n✅ Cleanup completed successfully');
    console.log('================================');
    console.log(`🗑️  Sessions cleaned: ${optimization.sessionsCleaned}`);
    console.log(`📁 Directories created: ${optimization.directoriesCreated}`);
    console.log(`📦 Logs archived: ${optimization.logsArchived ? 'Yes' : 'No'}`);
    console.log(`🗄️  Context files cleaned: ${optimization.contextFilesCleaned}`);
    
    if (optimization.totalSpaceSaved > 0) {
      console.log(`💾 Space saved: ${optimization.totalSpaceSaved.toFixed(1)}MB`);
    }
    
    console.log('\n🚀 Workspace is now optimized and ready for use!');
    console.log('   Run `npm run workspace-status` to verify health');
    
  } catch (error) {
    console.error('❌ Failed to cleanup workspace:', error.message);
    process.exit(1);
  }
}

// Command line execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    skipValidation: args.includes('--skip-validation'),
    force: args.includes('--force')
  };
  
  cleanupWorkspace(options);
}

module.exports = { cleanupWorkspace, validateWorkspaceIntegrity, optimizeStorage };