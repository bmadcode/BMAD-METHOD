#!/usr/bin/env node
/**
 * BMAD Workspace Status Utility
 * Cross-IDE workspace status reporting and analytics
 */

const fs = require('fs');
const path = require('path');

/**
 * Get workspace configuration
 */
function getWorkspaceConfig(workspacePath) {
  const configPath = path.join(workspacePath, 'workspace-config.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  return null;
}

/**
 * Get active sessions with health check
 */
function getActiveSessions(workspacePath) {
  const sessionsPath = path.join(workspacePath, 'sessions');
  if (!fs.existsSync(sessionsPath)) {
    return [];
  }
  
  const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
  const activeSessions = [];
  const now = new Date();
  
  for (const file of sessionFiles) {
    try {
      const sessionPath = path.join(sessionsPath, file);
      const sessionContent = fs.readFileSync(sessionPath, 'utf8');
      const sessionData = JSON.parse(sessionContent);
      
      // Check if session is still active (within 1 hour)
      const lastHeartbeat = new Date(sessionData.lastHeartbeat);
      const timeDiff = now - lastHeartbeat;
      const isActive = timeDiff < 3600000; // 1 hour
      
      sessionData.isActive = isActive;
      sessionData.timeSinceLastHeartbeat = timeDiff;
      
      activeSessions.push(sessionData);
      
    } catch (e) {
      console.warn(`⚠️  Corrupted session file: ${file}`);
    }
  }
  
  return activeSessions.sort((a, b) => new Date(b.created) - new Date(a.created));
}

/**
 * Check workspace health
 */
function checkWorkspaceHealth(workspacePath) {
  const requiredDirs = ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality'];
  const health = {
    score: 100,
    issues: [],
    recommendations: []
  };
  
  // Check directory structure
  for (const dir of requiredDirs) {
    const dirPath = path.join(workspacePath, dir);
    if (!fs.existsSync(dirPath)) {
      health.score -= 15;
      health.issues.push(`Missing directory: ${dir}`);
      health.recommendations.push(`Run \`npm run workspace-cleanup\` to repair structure`);
    }
  }
  
  // Check for stale sessions
  const sessions = getActiveSessions(workspacePath);
  const staleSessions = sessions.filter(s => !s.isActive);
  if (staleSessions.length > 0) {
    health.score -= staleSessions.length * 5;
    health.issues.push(`${staleSessions.length} stale sessions detected`);
    health.recommendations.push('Run `npm run workspace-cleanup` to remove stale sessions');
  }
  
  // Check log file size
  const logPath = path.join(workspacePath, 'logs', 'workspace.log');
  if (fs.existsSync(logPath)) {
    const stats = fs.statSync(logPath);
    const logSizeMB = stats.size / (1024 * 1024);
    if (logSizeMB > 10) {
      health.score -= 10;
      health.issues.push(`Large log file: ${logSizeMB.toFixed(1)}MB`);
      health.recommendations.push('Consider archiving or rotating log files');
    }
  }
  
  return health;
}

/**
 * Get workspace analytics
 */
function getWorkspaceAnalytics(workspacePath) {
  const analytics = {
    totalSessions: 0,
    activeSessions: 0,
    ideBreakdown: {},
    userBreakdown: {},
    avgSessionDuration: 0,
    recentActivity: []
  };
  
  const sessions = getActiveSessions(workspacePath);
  analytics.totalSessions = sessions.length;
  analytics.activeSessions = sessions.filter(s => s.isActive).length;
  
  // IDE breakdown
  sessions.forEach(session => {
    analytics.ideBreakdown[session.ide] = (analytics.ideBreakdown[session.ide] || 0) + 1;
    analytics.userBreakdown[session.user] = (analytics.userBreakdown[session.user] || 0) + 1;
  });
  
  // Recent activity from logs
  const logPath = path.join(workspacePath, 'logs', 'workspace.log');
  if (fs.existsSync(logPath)) {
    try {
      const logContent = fs.readFileSync(logPath, 'utf8');
      const logLines = logContent.trim().split('\n').slice(-10); // Last 10 entries
      
      analytics.recentActivity = logLines.map(line => {
        try {
          return JSON.parse(line);
        } catch (e) {
          return null;
        }
      }).filter(Boolean);
    } catch (e) {
      // Ignore log parsing errors
    }
  }
  
  return analytics;
}

/**
 * Format time duration
 */
function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Display workspace status
 */
async function getWorkspaceStatus() {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      console.error('   Run `npm run workspace-init` to initialize workspace');
      process.exit(1);
    }
    
    const config = getWorkspaceConfig(workspacePath);
    const sessions = getActiveSessions(workspacePath);
    const health = checkWorkspaceHealth(workspacePath);
    const analytics = getWorkspaceAnalytics(workspacePath);
    
    // Header
    console.log('🤝 BMAD Collaborative Workspace Status');
    console.log('=====================================');
    
    // Basic info
    console.log(`📁 Workspace: ${workspacePath}`);
    console.log(`⚙️  Version: ${config?.version || 'Unknown'}`);
    console.log(`🕐 Created: ${config?.created ? new Date(config.created).toLocaleString() : 'Unknown'}`);
    
    // Health score
    const healthEmoji = health.score >= 90 ? '💚' : health.score >= 70 ? '💛' : '❤️';
    console.log(`${healthEmoji} Health Score: ${health.score}/100`);
    
    // Sessions
    console.log(`\n👥 Sessions: ${analytics.totalSessions} total, ${analytics.activeSessions} active`);
    
    if (sessions.length > 0) {
      console.log('\n📍 Session Details:');
      sessions.forEach((session, index) => {
        const statusEmoji = session.isActive ? '🟢' : '🟡';
        const duration = formatDuration(session.timeSinceLastHeartbeat);
        console.log(`  ${statusEmoji} ${index + 1}. ${session.id} (${session.ide})`);
        console.log(`     User: ${session.user} | PID: ${session.pid}`);
        console.log(`     Created: ${new Date(session.created).toLocaleString()}`);
        console.log(`     Last activity: ${duration} ago`);
        
        if (session.metadata?.features) {
          console.log(`     Features: ${session.metadata.features.join(', ')}`);
        }
      });
    }
    
    // IDE breakdown
    if (Object.keys(analytics.ideBreakdown).length > 0) {
      console.log('\n💻 IDE Usage:');
      Object.entries(analytics.ideBreakdown).forEach(([ide, count]) => {
        console.log(`  ${ide}: ${count} sessions`);
      });
    }
    
    // Health issues
    if (health.issues.length > 0) {
      console.log('\n⚠️  Health Issues:');
      health.issues.forEach(issue => console.log(`  • ${issue}`));
      
      console.log('\n💡 Recommendations:');
      health.recommendations.forEach(rec => console.log(`  • ${rec}`));
    }
    
    // Recent activity
    if (analytics.recentActivity.length > 0) {
      console.log('\n📋 Recent Activity:');
      analytics.recentActivity.slice(-5).forEach(activity => {
        const time = new Date(activity.timestamp).toLocaleTimeString();
        console.log(`  ${time} - ${activity.action} (${activity.ide || 'unknown'})`);
      });
    }
    
    // Footer
    console.log('\n🚀 Available Commands:');
    console.log('  npm run workspace-init     # Initialize new session');
    console.log('  npm run workspace-cleanup  # Clean and repair workspace');
    console.log('  npm run workspace-health   # Detailed health check');
    console.log('  npm run workspace-handoff  # Manage agent handoffs');
    
    if (health.score < 80) {
      console.log('\n💭 Tip: Run `npm run workspace-cleanup` to improve health score');
    }
    
  } catch (error) {
    console.error('❌ Failed to get workspace status:', error.message);
    process.exit(1);
  }
}

// Command line execution
if (require.main === module) {
  getWorkspaceStatus();
}

module.exports = { getWorkspaceStatus, getActiveSessions, checkWorkspaceHealth };