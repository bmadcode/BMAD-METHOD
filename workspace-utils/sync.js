#!/usr/bin/env node
/**
 * BMAD Workspace Sync Utility
 * Cross-IDE context synchronization and restoration
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Get current session information
 */
function getCurrentSession(workspacePath) {
  const sessionsPath = path.join(workspacePath, 'sessions');
  if (!fs.existsSync(sessionsPath)) {
    return null;
  }
  
  const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
  const now = new Date();
  
  for (const file of sessionFiles) {
    try {
      const sessionData = JSON.parse(fs.readFileSync(path.join(sessionsPath, file), 'utf8'));
      const lastHeartbeat = new Date(sessionData.lastHeartbeat);
      const timeDiff = now - lastHeartbeat;
      
      // Consider session active if heartbeat within last hour
      if (timeDiff < 3600000) {
        return sessionData;
      }
    } catch (e) {
      // Skip corrupted session files
    }
  }
  
  return null;
}

/**
 * Update session heartbeat
 */
function updateSessionHeartbeat(workspacePath, sessionId) {
  const sessionFile = path.join(workspacePath, 'sessions', `${sessionId}.json`);
  
  if (fs.existsSync(sessionFile)) {
    try {
      const sessionData = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
      sessionData.lastHeartbeat = new Date().toISOString();
      fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));
      return true;
    } catch (e) {
      console.warn('⚠️  Failed to update session heartbeat:', e.message);
    }
  }
  
  return false;
}

/**
 * Sync context from shared workspace
 */
function syncContextFromWorkspace(workspacePath) {
  const contextPath = path.join(workspacePath, 'context');
  if (!fs.existsSync(contextPath)) {
    return { synced: [], errors: [] };
  }
  
  const contextFiles = fs.readdirSync(contextPath);
  const synced = [];
  const errors = [];
  
  for (const file of contextFiles) {
    try {
      const filePath = path.join(contextPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile() && (file.endsWith('.md') || file.endsWith('.json'))) {
        // Read context file for validation
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (content.trim().length > 0) {
          synced.push({
            file: file,
            size: stats.size,
            modified: stats.mtime.toISOString(),
            preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
          });
        }
      }
    } catch (e) {
      errors.push(`Failed to sync ${file}: ${e.message}`);
    }
  }
  
  return { synced, errors };
}

/**
 * Get latest progress updates
 */
function getLatestProgress(workspacePath, limit = 5) {
  const progressPath = path.join(workspacePath, 'progress');
  if (!fs.existsSync(progressPath)) {
    return [];
  }
  
  const progressFiles = fs.readdirSync(progressPath)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      try {
        const filePath = path.join(progressPath, f);
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        
        return {
          file: f,
          modified: stats.mtime,
          size: stats.size,
          content: content,
          preview: content.substring(0, 150) + (content.length > 150 ? '...' : '')
        };
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.modified - a.modified)
    .slice(0, limit);
  
  return progressFiles;
}

/**
 * Get pending handoffs
 */
function getPendingHandoffs(workspacePath) {
  const handoffsPath = path.join(workspacePath, 'handoffs');
  if (!fs.existsSync(handoffsPath)) {
    return [];
  }
  
  const handoffFiles = fs.readdirSync(handoffsPath)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        const content = fs.readFileSync(path.join(handoffsPath, f), 'utf8');
        const handoff = JSON.parse(content);
        
        // Consider handoffs from last 24 hours as potentially relevant
        const handoffTime = new Date(handoff.timestamp);
        const timeDiff = new Date() - handoffTime;
        
        if (timeDiff < 86400000) { // 24 hours
          return handoff;
        }
      } catch (e) {
        // Skip corrupted handoff files
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return handoffFiles;
}

/**
 * Get recent quality reports
 */
function getRecentQualityReports(workspacePath, limit = 3) {
  const qualityPath = path.join(workspacePath, 'quality');
  if (!fs.existsSync(qualityPath)) {
    return [];
  }
  
  const qualityFiles = fs.readdirSync(qualityPath)
    .filter(f => f.endsWith('.json') || f.endsWith('.md'))
    .map(f => {
      try {
        const filePath = path.join(qualityPath, f);
        const stats = fs.statSync(filePath);
        const content = fs.readFileSync(filePath, 'utf8');
        
        return {
          file: f,
          modified: stats.mtime,
          type: f.endsWith('.json') ? 'report' : 'analysis',
          preview: content.substring(0, 100) + (content.length > 100 ? '...' : '')
        };
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.modified - a.modified)
    .slice(0, limit);
  
  return qualityFiles;
}

/**
 * Create sync summary
 */
function createSyncSummary(workspacePath, currentSession) {
  const contextSync = syncContextFromWorkspace(workspacePath);
  const latestProgress = getLatestProgress(workspacePath);
  const pendingHandoffs = getPendingHandoffs(workspacePath);
  const qualityReports = getRecentQualityReports(workspacePath);
  
  const summary = {
    timestamp: new Date().toISOString(),
    session: currentSession,
    context: {
      filesFound: contextSync.synced.length,
      syncErrors: contextSync.errors.length,
      files: contextSync.synced
    },
    progress: {
      recentUpdates: latestProgress.length,
      updates: latestProgress
    },
    handoffs: {
      pending: pendingHandoffs.length,
      recent: pendingHandoffs.slice(0, 3)
    },
    quality: {
      recentReports: qualityReports.length,
      reports: qualityReports
    }
  };
  
  return summary;
}

/**
 * Save sync state
 */
function saveSyncState(workspacePath, summary) {
  const syncPath = path.join(workspacePath, 'context', 'last-sync.json');
  fs.writeFileSync(syncPath, JSON.stringify(summary, null, 2));
  
  // Also create a readable markdown summary
  const markdownPath = path.join(workspacePath, 'context', 'sync-summary.md');
  const markdownContent = generateSyncMarkdown(summary);
  fs.writeFileSync(markdownPath, markdownContent);
  
  return { syncFile: syncPath, markdownFile: markdownPath };
}

/**
 * Generate sync markdown summary
 */
function generateSyncMarkdown(summary) {
  const sessionInfo = summary.session ? 
    `**Current Session:** ${summary.session.id} (${summary.session.ide})  
**User:** ${summary.session.user}  
**Last Activity:** ${new Date(summary.session.lastHeartbeat).toLocaleString()}` : 
    '**No active session found**';

  return `# Workspace Sync Summary

**Sync Time:** ${new Date(summary.timestamp).toLocaleString()}

## Session Information
${sessionInfo}

## Context Files (${summary.context.filesFound})
${summary.context.files.length > 0 ? 
  summary.context.files.map(f => 
    `- **${f.file}** (${f.size} bytes, modified: ${new Date(f.modified).toLocaleString()})  
  ${f.preview}`
  ).join('\n\n') : 
  'No context files found'
}

${summary.context.syncErrors.length > 0 ? `
## Sync Errors
${summary.context.syncErrors.map(e => `- ${e}`).join('\n')}
` : ''}

## Recent Progress (${summary.progress.recentUpdates})
${summary.progress.updates.length > 0 ?
  summary.progress.updates.map(p => 
    `- **${p.file}** (${new Date(p.modified).toLocaleString()})  
  ${p.preview}`
  ).join('\n\n') :
  'No recent progress updates'
}

## Pending Handoffs (${summary.handoffs.pending})
${summary.handoffs.recent.length > 0 ?
  summary.handoffs.recent.map(h => 
    `- **${h.id}:** ${h.fromAgent} → ${h.toAgent}  
  Work: ${h.currentWork.substring(0, 80)}${h.currentWork.length > 80 ? '...' : ''}  
  Time: ${new Date(h.timestamp).toLocaleString()}`
  ).join('\n\n') :
  'No pending handoffs'
}

## Quality Reports (${summary.quality.recentReports})
${summary.quality.reports.length > 0 ?
  summary.quality.reports.map(q => 
    `- **${q.file}** (${q.type}, ${new Date(q.modified).toLocaleString()})  
  ${q.preview}`
  ).join('\n\n') :
  'No recent quality reports'
}

---
*Last synced: ${new Date(summary.timestamp).toLocaleString()}*  
*Generated by BMAD Cross-IDE Workspace System*
`;
}

/**
 * Main sync function
 */
async function syncWorkspace(options = {}) {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      console.error('   Run `npm run workspace-init` to initialize workspace');
      process.exit(1);
    }
    
    console.log('🔄 BMAD Workspace Sync');
    console.log('=====================');
    console.log(`📁 Workspace: ${workspacePath}`);
    
    // Get or create session
    let currentSession = getCurrentSession(workspacePath);
    
    if (!currentSession) {
      console.log('⚠️  No active session found, checking for workspace initialization...');
      
      // Try to find the most recent session
      const sessionsPath = path.join(workspacePath, 'sessions');
      if (fs.existsSync(sessionsPath)) {
        const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
        if (sessionFiles.length > 0) {
          // Get most recent session
          let mostRecent = null;
          let mostRecentTime = 0;
          
          for (const file of sessionFiles) {
            try {
              const sessionData = JSON.parse(fs.readFileSync(path.join(sessionsPath, file), 'utf8'));
              const created = new Date(sessionData.created).getTime();
              if (created > mostRecentTime) {
                mostRecentTime = created;
                mostRecent = sessionData;
              }
            } catch (e) {
              // Skip corrupted files
            }
          }
          
          if (mostRecent) {
            console.log(`📍 Using most recent session: ${mostRecent.id} (${mostRecent.ide})`);
            currentSession = mostRecent;
          }
        }
      }
      
      if (!currentSession) {
        console.error('❌ No sessions found. Run `npm run workspace-init` first.');
        process.exit(1);
      }
    } else {
      // Update heartbeat for active session
      updateSessionHeartbeat(workspacePath, currentSession.id);
      console.log(`✅ Active session found: ${currentSession.id} (${currentSession.ide})`);
    }
    
    // Create comprehensive sync summary
    console.log('\n🔍 Analyzing workspace state...');
    const summary = createSyncSummary(workspacePath, currentSession);
    
    // Save sync state
    const files = saveSyncState(workspacePath, summary);
    
    // Log sync activity
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: 'workspace-sync',
      sessionId: currentSession.id,
      contextFiles: summary.context.filesFound,
      progressUpdates: summary.progress.recentUpdates,
      pendingHandoffs: summary.handoffs.pending,
      user: process.env.USER || process.env.USERNAME || 'unknown'
    };
    
    const logPath = path.join(workspacePath, 'logs', 'workspace.log');
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
    
    // Display sync results
    console.log('\n✅ Workspace sync completed');
    console.log('============================');
    console.log(`📄 Context files: ${summary.context.filesFound}`);
    console.log(`📈 Progress updates: ${summary.progress.recentUpdates}`);
    console.log(`🔄 Pending handoffs: ${summary.handoffs.pending}`);
    console.log(`🎯 Quality reports: ${summary.quality.recentReports}`);
    
    if (summary.context.syncErrors.length > 0) {
      console.log(`\n⚠️  Sync errors: ${summary.context.syncErrors.length}`);
      summary.context.syncErrors.forEach(error => console.log(`  • ${error}`));
    }
    
    console.log(`\n📁 Sync summary: .workspace/context/sync-summary.md`);
    console.log(`📊 Detailed data: .workspace/context/last-sync.json`);
    
    // Show key highlights
    if (summary.handoffs.recent.length > 0) {
      console.log('\n🔄 Recent Handoffs:');
      summary.handoffs.recent.slice(0, 2).forEach(handoff => {
        console.log(`  • ${handoff.fromAgent} → ${handoff.toAgent}: ${handoff.currentWork.substring(0, 60)}...`);
      });
    }
    
    if (summary.progress.updates.length > 0) {
      console.log('\n📈 Latest Progress:');
      console.log(`  • ${summary.progress.updates[0].file}: ${summary.progress.updates[0].preview}`);
    }
    
    console.log('\n🚀 Workspace is now synchronized and ready for collaboration!');
    
  } catch (error) {
    console.error('❌ Failed to sync workspace:', error.message);
    process.exit(1);
  }
}

// Command line execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose'),
    force: args.includes('--force')
  };
  
  syncWorkspace(options);
}

module.exports = { syncWorkspace, getCurrentSession, createSyncSummary };