#!/usr/bin/env node
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
      console.log(`✅ Repaired ${repairedDirs} missing directories`);
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
      console.log(`✅ Cleaned up ${cleanedSessions} expired sessions`);
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
            const archiveFile = path.join(archivePath, `archived-${Date.now()}-${file}`);
            if (moveFile(filePath, archiveFile)) {
              archivedFiles++;
            }
          }
        } catch (e) {
          // Skip files that can't be processed
        }
      }
      
      if (archivedFiles > 0) {
        console.log(`✅ Archived ${archivedFiles} old context files`);
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