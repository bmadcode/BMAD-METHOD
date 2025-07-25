#!/usr/bin/env node

/**
 * BMAD Stop Hook
 * Generates session summary and next steps
 * Runs when Claude Code session ends
 */

const fs = require('fs').promises;
const path = require('path');
const { readdir, stat, readFile } = require('fs').promises;
const { readStdinJson } = require('./lib/stdin-reader');

async function generateSessionSummary() {
  try {
    // Read input from stdin (if any)
    const input = await readStdinJson();
    const messages = [];
    const workspacePath = '.workspace';
    
    // Check for session progress
    try {
      await stat(workspacePath);
      const progressFile = path.join(workspacePath, 'progress.json');
      
      try {
        const progressData = await readFile(progressFile, 'utf8');
        const progress = JSON.parse(progressData);
        const currentSession = progress.sessions && progress.sessions[process.pid];
        
        if (currentSession && currentSession.operations.length > 0) {
          const fileChanges = currentSession.operations
            .filter(op => op.target !== 'N/A')
            .map(op => `• ${op.tool}: ${path.basename(op.target)}`)
            .filter((value, index, self) => self.indexOf(value) === index);
          
          if (fileChanges.length > 0) {
            messages.push({
              role: 'system',
              content: `📊 BMAD Session Summary:\n\nFiles Modified:\n${fileChanges.join('\n')}\n\n` +
                      `Total Operations: ${currentSession.operations.length}\n` +
                      `Session Duration: ${calculateDuration(currentSession.startTime)}`
            });
          }
        }
      } catch (err) {
        // Progress file doesn't exist
      }
    } catch (err) {
      // Workspace doesn't exist
    }
    
    // Check for active story and suggest next steps
    const storyFiles = await findFiles('.', 'STORY-*.md', [
      'node_modules', '.git', 'dist', 'web-bundles'
    ]);
    
    let activeStory = null;
    for (const file of storyFiles) {
      try {
        const content = await readFile(file, 'utf8');
        if (content.includes('Status: In Progress') || content.includes('Status\nIn Progress')) {
          activeStory = { path: file, content };
          break;
        }
      } catch (err) {
        continue;
      }
    }
    
    if (activeStory) {
      // Count completed tasks
      const taskMatches = activeStory.content.match(/- \[([ x])\]/g) || [];
      const completedTasks = taskMatches.filter(task => task.includes('[x]')).length;
      const totalTasks = taskMatches.length;
      
      const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      let nextSteps = '';
      if (completionPercent === 100) {
        nextSteps = '✅ All tasks complete! Next: Run *reality-audit for final validation';
      } else if (completionPercent >= 75) {
        nextSteps = '🎯 Almost done! Complete remaining tasks then run tests';
      } else if (completionPercent >= 50) {
        nextSteps = '📈 Good progress! Continue with remaining implementation tasks';
      } else {
        nextSteps = '🚀 Getting started! Focus on core functionality first';
      }
      
      messages.push({
        role: 'system',
        content: `📋 Story Progress: ${path.basename(activeStory.path)}\n` +
                `Completion: ${completedTasks}/${totalTasks} tasks (${completionPercent}%)\n\n` +
                `${nextSteps}`
      });
    }
    
    // Quality reminder
    messages.push({
      role: 'system',
      content: '💡 BMAD Tip: Remember to run *reality-audit periodically to ensure code quality. ' +
              'Use *run-tests to validate your implementation.'
    });
    
    console.log(JSON.stringify({ messages }));
  } catch (error) {
    console.log(JSON.stringify({ messages: [] }));
  }
}

function calculateDuration(startTime) {
  try {
    const start = new Date(startTime);
    const end = new Date();
    const durationMs = end - start;
    
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  } catch (err) {
    return 'N/A';
  }
}

// Recursive file finder using only built-in modules
async function findFiles(dir, pattern, ignore = []) {
  const results = [];
  
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      
      // Skip ignored directories
      if (ignore.some(ign => filePath.includes(ign))) {
        continue;
      }
      
      try {
        const stats = await stat(filePath);
        
        if (stats.isDirectory()) {
          // Recursively search subdirectories
          const subResults = await findFiles(filePath, pattern, ignore);
          results.push(...subResults);
        } else if (stats.isFile()) {
          // Check if filename matches pattern
          const fileName = path.basename(filePath);
          const regex = new RegExp(pattern.replace('*', '.*'));
          if (regex.test(fileName)) {
            results.push(filePath);
          }
        }
      } catch (err) {
        // Skip files we can't access
        continue;
      }
    }
  } catch (err) {
    // Skip directories we can't read
  }
  
  return results;
}

generateSessionSummary();