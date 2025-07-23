const path = require('path');
const fs = require('fs');

/**
 * Claude Code CLI Built-in Maintenance System
 * Provides automatic workspace repair, optimization, and health monitoring
 * specifically designed for Claude Code CLI users
 */
class ClaudeCodeMaintenanceSystem {
  constructor(workspaceDir) {
    this.workspaceDir = workspaceDir;
    this.maintenanceLog = [];
    this.healthMetrics = {
      lastCheck: null,
      overallHealth: 100,
      issues: [],
      optimizations: []
    };
    this.autoRepairEnabled = true;
    this.backgroundOptimization = true;
  }

  /**
   * Perform comprehensive workspace integrity check on session startup
   */
  async performStartupIntegrityCheck() {
    console.log('🔍 Performing workspace integrity check...');
    
    const checkResults = {
      timestamp: new Date().toISOString(),
      checks: [],
      issues: [],
      repairs: [],
      optimizations: [],
      overallStatus: 'healthy'
    };

    try {
      // Check workspace directory structure
      await this.checkDirectoryStructure(checkResults);
      
      // Check file integrity
      await this.checkFileIntegrity(checkResults);
      
      // Check session cleanup
      await this.checkSessionCleanup(checkResults);
      
      // Check context file sizes
      await this.checkContextSizes(checkResults);
      
      // Check handoff integrity
      await this.checkHandoffIntegrity(checkResults);

      // Auto-repair issues if enabled
      if (this.autoRepairEnabled && checkResults.issues.length > 0) {
        await this.performAutoRepair(checkResults);
      }

      // Update health metrics
      this.updateHealthMetrics(checkResults);

      // Log results
      this.logMaintenanceActivity('startup-integrity-check', checkResults);

      // Display results to user
      this.displayIntegrityResults(checkResults);

      return checkResults;

    } catch (error) {
      console.error('❌ Integrity check failed:', error.message);
      checkResults.overallStatus = 'failed';
      checkResults.error = error.message;
      return checkResults;
    }
  }

  /**
   * Check and repair workspace directory structure
   */
  async checkDirectoryStructure(results) {
    const requiredDirs = [
      '.workspace',
      '.workspace/sessions',
      '.workspace/context',
      '.workspace/handoffs',
      '.workspace/decisions',
      '.workspace/progress',
      '.workspace/quality',
      '.workspace/archive',
      '.workspace/versions',
      '.workspace/locks'
    ];

    for (const dir of requiredDirs) {
      const dirPath = path.join(this.workspaceDir, dir);
      const exists = fs.existsSync(dirPath);

      results.checks.push({
        type: 'directory',
        path: dir,
        status: exists ? 'ok' : 'missing',
        timestamp: new Date().toISOString()
      });

      if (!exists) {
        results.issues.push({
          type: 'missing_directory',
          path: dir,
          severity: 'medium',
          description: `Required directory missing: ${dir}`
        });

        // Auto-repair: Create missing directory
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          results.repairs.push({
            type: 'directory_created',
            path: dir,
            status: 'success',
            description: `Created missing directory: ${dir}`
          });
          
          // Update check status
          const checkIndex = results.checks.length - 1;
          results.checks[checkIndex].status = 'repaired';
          
        } catch (error) {
          results.repairs.push({
            type: 'directory_creation_failed',
            path: dir,
            status: 'failed',
            error: error.message
          });
        }
      }
    }
  }

  /**
   * Check file integrity and corruption
   */
  async checkFileIntegrity(results) {
    const criticalFiles = [
      '.workspace/workspace-config.json',
      '.workspace/context/shared-context.md',
      '.workspace/decisions/decisions-log.md',
      '.workspace/progress/progress-summary.md'
    ];

    for (const file of criticalFiles) {
      const filePath = path.join(this.workspaceDir, file);
      const exists = fs.existsSync(filePath);

      if (exists) {
        try {
          // Check if file is readable and valid
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Validate JSON files
          if (file.endsWith('.json')) {
            JSON.parse(content);
          }

          results.checks.push({
            type: 'file_integrity',
            path: file,
            status: 'ok',
            size: content.length
          });

        } catch (error) {
          results.issues.push({
            type: 'corrupted_file',
            path: file,
            severity: 'high',
            description: `File corrupted or unreadable: ${file}`,
            error: error.message
          });

          results.checks.push({
            type: 'file_integrity',
            path: file,
            status: 'corrupted',
            error: error.message
          });

          // Auto-repair: Restore from backup or create default
          await this.repairCorruptedFile(file, results);
        }
      } else {
        // Critical file missing
        results.issues.push({
          type: 'missing_file',
          path: file,
          severity: 'medium',
          description: `Critical file missing: ${file}`
        });

        // Auto-repair: Create default file
        await this.createDefaultFile(file, results);
      }
    }
  }

  /**
   * Check and cleanup old sessions
   */
  async checkSessionCleanup(results) {
    try {
      const sessionsDir = path.join(this.workspaceDir, '.workspace', 'sessions');
      
      if (!fs.existsSync(sessionsDir)) return;

      const sessionFiles = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.json'));
      const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
      let cleanedSessions = 0;

      for (const sessionFile of sessionFiles) {
        const sessionPath = path.join(sessionsDir, sessionFile);
        
        try {
          const sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
          const lastActivity = new Date(sessionData.lastActivity || sessionData.startTime).getTime();

          if (lastActivity < cutoffTime && sessionData.status !== 'active') {
            fs.unlinkSync(sessionPath);
            cleanedSessions++;
            
            results.optimizations.push({
              type: 'session_cleanup',
              file: sessionFile,
              description: 'Removed old inactive session'
            });
          }
        } catch (error) {
          // Remove corrupted session file
          fs.unlinkSync(sessionPath);
          cleanedSessions++;
          
          results.repairs.push({
            type: 'corrupted_session_removed',
            file: sessionFile,
            status: 'success',
            description: 'Removed corrupted session file'
          });
        }
      }

      results.checks.push({
        type: 'session_cleanup',
        status: 'completed',
        sessionsProcessed: sessionFiles.length,
        sessionsCleaned: cleanedSessions
      });

    } catch (error) {
      results.checks.push({
        type: 'session_cleanup',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Check context file sizes and optimize if needed
   */
  async checkContextSizes(results) {
    const contextFiles = [
      '.workspace/context/shared-context.md',
      '.workspace/decisions/decisions-log.md',
      '.workspace/progress/progress-summary.md'
    ];

    const sizeLimits = {
      'shared-context.md': 10 * 1024 * 1024, // 10MB
      'decisions-log.md': 5 * 1024 * 1024,   // 5MB
      'progress-summary.md': 3 * 1024 * 1024  // 3MB
    };

    for (const file of contextFiles) {
      const filePath = path.join(this.workspaceDir, file);
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const fileName = path.basename(file);
        const sizeLimit = sizeLimits[fileName] || 10 * 1024 * 1024;

        results.checks.push({
          type: 'file_size',
          path: file,
          size: stats.size,
          sizeLimit: sizeLimit,
          status: stats.size > sizeLimit ? 'oversized' : 'ok'
        });

        if (stats.size > sizeLimit) {
          results.issues.push({
            type: 'oversized_file',
            path: file,
            severity: 'medium',
            description: `File exceeds size limit: ${this.formatBytes(stats.size)} > ${this.formatBytes(sizeLimit)}`,
            currentSize: stats.size,
            sizeLimit: sizeLimit
          });

          // Auto-optimize: Archive and compress
          await this.optimizeOversizedFile(file, results);
        }
      }
    }
  }

  /**
   * Check handoff file integrity
   */
  async checkHandoffIntegrity(results) {
    try {
      const handoffsDir = path.join(this.workspaceDir, '.workspace', 'handoffs');
      
      if (!fs.existsSync(handoffsDir)) return;

      const handoffFiles = fs.readdirSync(handoffsDir).filter(f => f.endsWith('.json'));
      let corruptedHandoffs = 0;
      let expiredHandoffs = 0;

      const expirationTime = Date.now() - (7 * 24 * 60 * 60 * 1000); // 7 days ago

      for (const handoffFile of handoffFiles) {
        const handoffPath = path.join(handoffsDir, handoffFile);
        
        try {
          const handoffData = JSON.parse(fs.readFileSync(handoffPath, 'utf8'));
          const handoffTime = new Date(handoffData.timestamp).getTime();

          // Check if handoff is expired
          if (handoffTime < expirationTime) {
            fs.unlinkSync(handoffPath);
            expiredHandoffs++;
            
            results.optimizations.push({
              type: 'handoff_cleanup',
              file: handoffFile,
              description: 'Removed expired handoff'
            });
          }

        } catch (error) {
          // Remove corrupted handoff file
          fs.unlinkSync(handoffPath);
          corruptedHandoffs++;
          
          results.repairs.push({
            type: 'corrupted_handoff_removed',
            file: handoffFile,
            status: 'success',
            description: 'Removed corrupted handoff file'
          });
        }
      }

      results.checks.push({
        type: 'handoff_integrity',
        status: 'completed',
        handoffsProcessed: handoffFiles.length,
        corruptedRemoved: corruptedHandoffs,
        expiredRemoved: expiredHandoffs
      });

    } catch (error) {
      results.checks.push({
        type: 'handoff_integrity',
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Perform automatic repairs
   */
  async performAutoRepair(results) {
    console.log(`🔧 Auto-repairing ${results.issues.length} issues...`);
    
    let repairedCount = 0;
    
    for (const issue of results.issues) {
      try {
        switch (issue.type) {
          case 'missing_directory':
            // Already handled in checkDirectoryStructure
            break;
            
          case 'corrupted_file':
            await this.repairCorruptedFile(issue.path, results);
            repairedCount++;
            break;
            
          case 'missing_file':
            await this.createDefaultFile(issue.path, results);
            repairedCount++;
            break;
            
          case 'oversized_file':
            await this.optimizeOversizedFile(issue.path, results);
            repairedCount++;
            break;
        }
      } catch (error) {
        results.repairs.push({
          type: 'repair_failed',
          issue: issue.type,
          path: issue.path,
          status: 'failed',
          error: error.message
        });
      }
    }

    if (repairedCount > 0) {
      console.log(`✅ Auto-repaired ${repairedCount} issues`);
    }
  }

  /**
   * Repair corrupted file
   */
  async repairCorruptedFile(filePath, results) {
    const fullPath = path.join(this.workspaceDir, filePath);
    
    try {
      // Try to restore from backup if available
      const backupPath = `${fullPath}.backup`;
      
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, fullPath);
        results.repairs.push({
          type: 'file_restored_from_backup',
          path: filePath,
          status: 'success',
          description: 'Restored file from backup'
        });
      } else {
        // Create default file
        await this.createDefaultFile(filePath, results);
      }
    } catch (error) {
      results.repairs.push({
        type: 'file_repair_failed',
        path: filePath,
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Create default file
   */
  async createDefaultFile(filePath, results) {
    const fullPath = path.join(this.workspaceDir, filePath);
    const fileName = path.basename(filePath);
    
    try {
      let defaultContent = '';
      
      switch (fileName) {
        case 'workspace-config.json':
          defaultContent = JSON.stringify({
            version: '1.0',
            created: new Date().toISOString(),
            structure: ['sessions', 'context', 'handoffs', 'decisions', 'progress', 'quality', 'archive'],
            settings: {
              maxContextSize: '10MB',
              sessionTimeout: '2h',
              archiveAfter: '30d',
              maxConcurrentSessions: 5
            }
          }, null, 2);
          break;
          
        case 'shared-context.md':
          defaultContent = `# Workspace Context

**Last Updated:** ${new Date().toISOString()}
**Active Sessions:** None
**Primary Agent:** unknown

## Current Focus
No current focus available.

## Key Decisions
- No decisions recorded yet

## Next Steps
- Initialize workspace and begin collaborative development

## Session Notes
No session notes available
`;
          break;
          
        case 'decisions-log.md':
          defaultContent = `# Architectural & Design Decisions

No decisions recorded yet.
`;
          break;
          
        case 'progress-summary.md':
          defaultContent = `# Development Progress Summary

**Last Updated:** ${new Date().toISOString()}
**Current Story:** No active story
**Overall Progress:** 0%

## Completed Tasks
None

## Active Tasks
None

## Blockers
None identified

## Quality Metrics
Not assessed
`;
          break;
          
        default:
          defaultContent = `# ${fileName}

Default content created by Claude Code CLI maintenance system.
Created: ${new Date().toISOString()}
`;
      }

      fs.writeFileSync(fullPath, defaultContent);
      
      results.repairs.push({
        type: 'default_file_created',
        path: filePath,
        status: 'success',
        description: `Created default ${fileName}`
      });
      
    } catch (error) {
      results.repairs.push({
        type: 'default_file_creation_failed',
        path: filePath,
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Optimize oversized file
   */
  async optimizeOversizedFile(filePath, results) {
    const fullPath = path.join(this.workspaceDir, filePath);
    
    try {
      // Create backup
      const backupPath = `${fullPath}.backup`;
      fs.copyFileSync(fullPath, backupPath);
      
      // Archive old content
      const archiveDir = path.join(this.workspaceDir, '.workspace', 'archive');
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
      }
      
      const archivePath = path.join(archiveDir, `${path.basename(filePath)}-${Date.now()}.md`);
      fs.copyFileSync(fullPath, archivePath);
      
      // Create condensed version
      const content = fs.readFileSync(fullPath, 'utf8');
      const condensedContent = this.condenseContent(content, path.basename(filePath));
      fs.writeFileSync(fullPath, condensedContent);
      
      results.optimizations.push({
        type: 'file_optimized',
        path: filePath,
        description: 'File archived and condensed',
        archivePath: archivePath,
        originalSize: fs.statSync(backupPath).size,
        newSize: fs.statSync(fullPath).size
      });
      
    } catch (error) {
      results.repairs.push({
        type: 'file_optimization_failed',
        path: filePath,
        status: 'failed',
        error: error.message
      });
    }
  }

  /**
   * Condense content for oversized files
   */
  condenseContent(content, fileName) {
    const timestamp = new Date().toISOString();
    
    switch (fileName) {
      case 'shared-context.md':
        return `# Workspace Context (Condensed)

**Last Updated:** ${timestamp}
**Status:** Condensed due to size optimization
**Original Content:** Archived

## Current Focus
Previous context has been archived for size optimization.
Use *workspace-sync to reload if needed.

## Key Decisions
Most recent decisions preserved. Older decisions archived.

## Next Steps
- Review archived context if needed
- Continue with current development focus

## Session Notes
Content condensed - check archive for full history.
`;

      case 'decisions-log.md':
        // Keep last 10 decisions, archive the rest
        const lines = content.split('\n');
        const recentDecisions = lines.slice(-200); // Approximate last 10 decisions
        return `# Architectural & Design Decisions (Condensed)

**Condensed:** ${timestamp}
**Full History:** Available in archive

${recentDecisions.join('\n')}

---
*Older decisions archived for size optimization*
`;

      case 'progress-summary.md':
        return `# Development Progress Summary (Condensed)

**Last Updated:** ${timestamp}
**Previous Content:** Archived for size optimization

## Current Status
Progress history has been archived.
Current session progress will be tracked from this point.

## Recent Activity
Previous activity archived - new tracking begins now.

## Quality Metrics
Historical metrics archived - current assessment required.
`;

      default:
        return `# ${fileName} (Condensed)

**Condensed:** ${timestamp}
**Reason:** File size optimization

Previous content has been archived.
New content will be tracked from this point forward.
`;
    }
  }

  /**
   * Update health metrics
   */
  updateHealthMetrics(checkResults) {
    this.healthMetrics.lastCheck = checkResults.timestamp;
    this.healthMetrics.issues = checkResults.issues;
    this.healthMetrics.optimizations = checkResults.optimizations;
    
    // Calculate overall health score
    const issueCount = checkResults.issues.length;
    const repairCount = checkResults.repairs.filter(r => r.status === 'success').length;
    
    if (issueCount === 0) {
      this.healthMetrics.overallHealth = 100;
    } else if (repairCount >= issueCount) {
      this.healthMetrics.overallHealth = 90; // Issues but all repaired
    } else {
      this.healthMetrics.overallHealth = Math.max(50, 100 - (issueCount * 10));
    }
  }

  /**
   * Log maintenance activity
   */
  logMaintenanceActivity(type, data) {
    this.maintenanceLog.push({
      type: type,
      timestamp: new Date().toISOString(),
      data: data
    });

    // Keep only last 100 log entries
    if (this.maintenanceLog.length > 100) {
      this.maintenanceLog = this.maintenanceLog.slice(-100);
    }
  }

  /**
   * Display integrity check results
   */
  displayIntegrityResults(results) {
    if (results.issues.length === 0 && results.optimizations.length === 0) {
      console.log('✅ Workspace integrity check passed - all systems healthy');
      return;
    }

    if (results.repairs.length > 0) {
      const successfulRepairs = results.repairs.filter(r => r.status === 'success').length;
      console.log(`🔧 Workspace maintenance completed: ${successfulRepairs} issues auto-repaired`);
    }

    if (results.optimizations.length > 0) {
      console.log(`⚡ Workspace optimized: ${results.optimizations.length} optimizations applied`);
    }

    // Show remaining issues if any
    const unrepairedIssues = results.issues.filter(issue => 
      !results.repairs.some(repair => repair.path === issue.path && repair.status === 'success')
    );

    if (unrepairedIssues.length > 0) {
      console.log(`⚠️  ${unrepairedIssues.length} issues require manual attention`);
    }
  }

  /**
   * Format bytes for display
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get maintenance summary
   */
  getMaintenanceSummary() {
    return {
      healthMetrics: this.healthMetrics,
      recentActivity: this.maintenanceLog.slice(-10),
      autoRepairEnabled: this.autoRepairEnabled,
      backgroundOptimization: this.backgroundOptimization
    };
  }
}

module.exports = ClaudeCodeMaintenanceSystem;