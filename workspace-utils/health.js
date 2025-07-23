#!/usr/bin/env node
/**
 * BMAD Workspace Health Check Utility
 * Cross-IDE workspace health monitoring and diagnostics
 */

const fs = require('fs');
const path = require('path');

/**
 * Check directory structure integrity
 */
function checkDirectoryStructure(workspacePath) {
  const requiredDirs = [
    { name: 'sessions', critical: true, description: 'Session management' },
    { name: 'context', critical: true, description: 'Shared context storage' },
    { name: 'handoffs', critical: true, description: 'Agent handoff coordination' },
    { name: 'decisions', critical: false, description: 'Decision tracking' },
    { name: 'progress', critical: false, description: 'Progress monitoring' },
    { name: 'quality', critical: false, description: 'Quality reports' },
    { name: 'archive', critical: false, description: 'Archived data' },
    { name: 'hooks', critical: false, description: 'Integration hooks' },
    { name: 'templates', critical: false, description: 'Workspace templates' },
    { name: 'logs', critical: true, description: 'Activity logging' }
  ];
  
  const results = {
    score: 100,
    issues: [],
    missing: [],
    present: []
  };
  
  for (const dir of requiredDirs) {
    const dirPath = path.join(workspacePath, dir.name);
    if (fs.existsSync(dirPath)) {
      results.present.push(dir);
    } else {
      results.missing.push(dir);
      const penalty = dir.critical ? 15 : 5;
      results.score -= penalty;
      results.issues.push(`Missing ${dir.critical ? 'critical' : 'optional'} directory: ${dir.name} (${dir.description})`);
    }
  }
  
  return results;
}

/**
 * Check workspace configuration
 */
function checkWorkspaceConfig(workspacePath) {
  const configPath = path.join(workspacePath, 'workspace-config.json');
  const results = {
    score: 100,
    issues: [],
    valid: false,
    config: null
  };
  
  if (!fs.existsSync(configPath)) {
    results.score = 0;
    results.issues.push('Missing workspace configuration file');
    return results;
  }
  
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    
    // Validate required fields
    const requiredFields = ['version', 'created', 'features', 'settings'];
    for (const field of requiredFields) {
      if (!config[field]) {
        results.score -= 20;
        results.issues.push(`Missing required config field: ${field}`);
      }
    }
    
    // Check feature flags
    if (config.features) {
      const expectedFeatures = ['crossIDESupport', 'sessionManagement', 'contextPersistence', 'agentHandoffs'];
      for (const feature of expectedFeatures) {
        if (config.features[feature] !== true) {
          results.score -= 5;
          results.issues.push(`Feature not enabled: ${feature}`);
        }
      }
    }
    
    results.valid = true;
    results.config = config;
    
  } catch (e) {
    results.score = 0;
    results.issues.push(`Corrupted configuration file: ${e.message}`);
  }
  
  return results;
}

/**
 * Check session health
 */
function checkSessionHealth(workspacePath) {
  const sessionsPath = path.join(workspacePath, 'sessions');
  const results = {
    score: 100,
    issues: [],
    totalSessions: 0,
    activeSessions: 0,
    staleSessions: 0,
    corruptedSessions: 0,
    sessions: []
  };
  
  if (!fs.existsSync(sessionsPath)) {
    results.score = 0;
    results.issues.push('Sessions directory not found');
    return results;
  }
  
  const sessionFiles = fs.readdirSync(sessionsPath).filter(f => f.endsWith('.json'));
  results.totalSessions = sessionFiles.length;
  
  const now = new Date();
  
  for (const file of sessionFiles) {
    try {
      const sessionPath = path.join(sessionsPath, file);
      const sessionContent = fs.readFileSync(sessionPath, 'utf8');
      const sessionData = JSON.parse(sessionContent);
      
      // Validate session structure
      const requiredFields = ['id', 'created', 'lastHeartbeat', 'ide', 'user'];
      let isValid = true;
      
      for (const field of requiredFields) {
        if (!sessionData[field]) {
          isValid = false;
          break;
        }
      }
      
      if (!isValid) {
        results.corruptedSessions++;
        results.score -= 5;
        results.issues.push(`Invalid session structure: ${file}`);
        continue;
      }
      
      // Check session freshness
      const lastHeartbeat = new Date(sessionData.lastHeartbeat);
      const timeDiff = now - lastHeartbeat;
      
      if (timeDiff < 3600000) { // 1 hour
        results.activeSessions++;
        sessionData.status = 'active';
      } else if (timeDiff < 86400000) { // 24 hours
        sessionData.status = 'idle';
      } else {
        results.staleSessions++;
        sessionData.status = 'stale';
      }
      
      sessionData.timeSinceLastHeartbeat = timeDiff;
      results.sessions.push(sessionData);
      
    } catch (e) {
      results.corruptedSessions++;
      results.score -= 10;
      results.issues.push(`Corrupted session file: ${file}`);
    }
  }
  
  // Penalty for too many stale sessions
  if (results.staleSessions > 5) {
    results.score -= (results.staleSessions - 5) * 2;
    results.issues.push(`Excessive stale sessions: ${results.staleSessions}`);
  }
  
  return results;
}

/**
 * Check file system permissions
 */
function checkFileSystemPermissions(workspacePath) {
  const results = {
    score: 100,
    issues: [],
    canRead: false,
    canWrite: false,
    canExecute: false
  };
  
  try {
    // Test read permission
    fs.readdirSync(workspacePath);
    results.canRead = true;
    
    // Test write permission
    const testFile = path.join(workspacePath, '.health-check-write-test');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    results.canWrite = true;
    
    // Test execute permission (create and run a temporary script)
    const testScript = path.join(workspacePath, '.health-check-exec-test.js');
    fs.writeFileSync(testScript, 'console.log("test");');
    
    // Try to require the file to test execution capability
    require(testScript);
    fs.unlinkSync(testScript);
    results.canExecute = true;
    
  } catch (e) {
    if (!results.canRead) {
      results.score = 0;
      results.issues.push('Cannot read workspace directory');
    } else if (!results.canWrite) {
      results.score -= 50;
      results.issues.push('Cannot write to workspace directory');
    } else if (!results.canExecute) {
      results.score -= 20;
      results.issues.push('Limited script execution permissions');
    }
  }
  
  return results;
}

/**
 * Check log file health
 */
function checkLogHealth(workspacePath) {
  const logPath = path.join(workspacePath, 'logs', 'workspace.log');
  const results = {
    score: 100,
    issues: [],
    exists: false,
    size: 0,
    recentEntries: 0,
    corruptedEntries: 0
  };
  
  if (!fs.existsSync(logPath)) {
    results.score -= 30;
    results.issues.push('Workspace log file not found');
    return results;
  }
  
  try {
    const stats = fs.statSync(logPath);
    results.exists = true;
    results.size = stats.size;
    
    // Check log size
    const logSizeMB = stats.size / (1024 * 1024);
    if (logSizeMB > 50) {
      results.score -= 15;
      results.issues.push(`Large log file: ${logSizeMB.toFixed(1)}MB`);
    }
    
    // Analyze recent log entries
    const logContent = fs.readFileSync(logPath, 'utf8');
    const logLines = logContent.trim().split('\n');
    
    const now = new Date();
    const oneDayAgo = now - 86400000; // 24 hours
    
    for (const line of logLines.slice(-100)) { // Check last 100 entries
      if (line.trim() === '') continue;
      
      try {
        const entry = JSON.parse(line);
        const entryTime = new Date(entry.timestamp);
        
        if (entryTime > oneDayAgo) {
          results.recentEntries++;
        }
      } catch (e) {
        results.corruptedEntries++;
      }
    }
    
    if (results.corruptedEntries > 10) {
      results.score -= results.corruptedEntries;
      results.issues.push(`Multiple corrupted log entries: ${results.corruptedEntries}`);
    }
    
    if (results.recentEntries === 0) {
      results.score -= 20;
      results.issues.push('No recent activity in logs');
    }
    
  } catch (e) {
    results.score -= 25;
    results.issues.push(`Cannot analyze log file: ${e.message}`);
  }
  
  return results;
}

/**
 * Check cross-IDE compatibility features
 */
function checkCrossIDECompatibility(workspacePath) {
  const results = {
    score: 100,
    issues: [],
    ideSupport: {},
    templateCount: 0,
    hookCount: 0
  };
  
  // Check for IDE-specific templates
  const templatesPath = path.join(workspacePath, 'templates');
  if (fs.existsSync(templatesPath)) {
    const templateFiles = fs.readdirSync(templatesPath).filter(f => f.endsWith('.md'));
    results.templateCount = templateFiles.length;
    
    const supportedIDEs = ['cursor', 'windsurf', 'vscode', 'trae', 'roo', 'cline', 'gemini', 'github-copilot'];
    
    for (const ide of supportedIDEs) {
      const ideTemplate = templateFiles.find(f => f.includes(ide));
      results.ideSupport[ide] = !!ideTemplate;
      
      if (!ideTemplate) {
        results.score -= 5;
      }
    }
    
    if (results.templateCount < 4) {
      results.issues.push(`Limited IDE template support: ${results.templateCount} templates found`);
    }
  } else {
    results.score -= 30;
    results.issues.push('IDE templates directory not found');
  }
  
  // Check for integration hooks
  const hooksPath = path.join(workspacePath, 'hooks');
  if (fs.existsSync(hooksPath)) {
    const hookFiles = fs.readdirSync(hooksPath);
    results.hookCount = hookFiles.length;
    
    if (results.hookCount === 0) {
      results.score -= 10;
      results.issues.push('No integration hooks configured');
    }
  }
  
  return results;
}

/**
 * Generate comprehensive health report
 */
function generateHealthReport(workspacePath) {
  const report = {
    timestamp: new Date().toISOString(),
    overallScore: 0,
    status: 'unknown',
    checks: {
      directoryStructure: checkDirectoryStructure(workspacePath),
      workspaceConfig: checkWorkspaceConfig(workspacePath),
      sessionHealth: checkSessionHealth(workspacePath),
      fileSystemPermissions: checkFileSystemPermissions(workspacePath),
      logHealth: checkLogHealth(workspacePath),
      crossIDECompatibility: checkCrossIDECompatibility(workspacePath)
    },
    summary: {
      totalIssues: 0,
      criticalIssues: 0,
      recommendations: []
    }
  };
  
  // Calculate overall score and issues
  const checks = Object.values(report.checks);
  const totalScore = checks.reduce((sum, check) => sum + check.score, 0);
  report.overallScore = Math.round(totalScore / checks.length);
  
  // Collect all issues
  const allIssues = checks.flatMap(check => check.issues || []);
  report.summary.totalIssues = allIssues.length;
  report.summary.criticalIssues = allIssues.filter(issue => 
    issue.includes('Missing critical') || 
    issue.includes('Cannot') || 
    issue.includes('Corrupted')
  ).length;
  
  // Determine status
  if (report.overallScore >= 90) {
    report.status = 'excellent';
  } else if (report.overallScore >= 80) {
    report.status = 'good';
  } else if (report.overallScore >= 70) {
    report.status = 'fair';
  } else if (report.overallScore >= 60) {
    report.status = 'poor';
  } else {
    report.status = 'critical';
  }
  
  // Generate recommendations
  if (report.checks.directoryStructure.missing.length > 0) {
    report.summary.recommendations.push('Run `npm run workspace-cleanup` to repair directory structure');
  }
  
  if (report.checks.sessionHealth.staleSessions > 5) {
    report.summary.recommendations.push('Clean up stale sessions with `npm run workspace-cleanup`');
  }
  
  if (report.checks.logHealth.size > 52428800) { // 50MB
    report.summary.recommendations.push('Archive large log files to improve performance');
  }
  
  if (report.checks.crossIDECompatibility.templateCount < 4) {
    report.summary.recommendations.push('Generate additional IDE-specific templates for better compatibility');
  }
  
  if (report.summary.criticalIssues > 0) {
    report.summary.recommendations.push('Address critical issues immediately before continuing development');
  }
  
  return report;
}

/**
 * Display health report
 */
function displayHealthReport(report) {
  const statusEmoji = {
    excellent: '💚',
    good: '💙', 
    fair: '💛',
    poor: '🧡',
    critical: '❤️'
  };
  
  console.log('🏥 BMAD Workspace Health Check');
  console.log('==============================');
  console.log(`${statusEmoji[report.status]} Overall Health: ${report.overallScore}/100 (${report.status.toUpperCase()})`);
  console.log(`📊 Issues Found: ${report.summary.totalIssues} (${report.summary.criticalIssues} critical)`);
  console.log(`🕐 Checked: ${new Date(report.timestamp).toLocaleString()}`);
  
  // Display individual check results
  console.log('\n📋 Detailed Results:');
  
  Object.entries(report.checks).forEach(([checkName, result]) => {
    const emoji = result.score >= 90 ? '✅' : result.score >= 70 ? '⚠️' : '❌';
    const name = checkName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    console.log(`${emoji} ${name}: ${result.score}/100`);
    
    if (result.issues && result.issues.length > 0) {
      result.issues.slice(0, 3).forEach(issue => {
        console.log(`    • ${issue}`);
      });
      if (result.issues.length > 3) {
        console.log(`    • ... and ${result.issues.length - 3} more issues`);
      }
    }
  });
  
  // Show session summary
  if (report.checks.sessionHealth) {
    const sessions = report.checks.sessionHealth;
    console.log(`\n👥 Sessions: ${sessions.totalSessions} total, ${sessions.activeSessions} active, ${sessions.staleSessions} stale`);
  }
  
  // Show recommendations
  if (report.summary.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.summary.recommendations.forEach(rec => {
      console.log(`  • ${rec}`);
    });
  }
  
  // Quick actions
  console.log('\n🚀 Quick Actions:');
  console.log('  npm run workspace-cleanup   # Repair and optimize workspace');
  console.log('  npm run workspace-status    # Check current activity');
  console.log('  npm run workspace-sync      # Synchronize context');
  
  if (report.overallScore < 70) {
    console.log('\n⚠️  Workspace needs attention. Address the issues above for optimal performance.');
  } else if (report.overallScore >= 90) {
    console.log('\n🎉 Excellent! Your workspace is healthy and ready for collaborative development.');
  }
}

/**
 * Main health check function
 */
async function checkWorkspaceHealth(options = {}) {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    
    if (!fs.existsSync(workspacePath)) {
      console.error('❌ Workspace directory not found.');
      console.error('   Run `npm run workspace-init` to initialize workspace');
      process.exit(1);
    }
    
    const report = generateHealthReport(workspacePath);
    
    if (options.json) {
      console.log(JSON.stringify(report, null, 2));
      return;
    }
    
    displayHealthReport(report);
    
    // Save health report
    const reportPath = path.join(workspacePath, 'quality', 'health-report.json');
    const qualityDir = path.dirname(reportPath);
    if (!fs.existsSync(qualityDir)) {
      fs.mkdirSync(qualityDir, { recursive: true });
    }
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Detailed report saved: .workspace/quality/health-report.json`);
    
    // Exit with appropriate code for CI/CD
    if (options.exitCode && report.summary.criticalIssues > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Failed to check workspace health:', error.message);
    process.exit(1);
  }
}

// Command line execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    json: args.includes('--json'),
    exitCode: args.includes('--exit-code'),
    verbose: args.includes('--verbose')
  };
  
  checkWorkspaceHealth(options);
}

module.exports = { checkWorkspaceHealth, generateHealthReport };