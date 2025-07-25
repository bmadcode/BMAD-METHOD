#!/usr/bin/env node

/**
 * BMAD PostToolUse Hook
 * Tracks implementation progress and runs quality checks
 * Updates story files automatically after code changes
 */

const fs = require('fs').promises;
const path = require('path');
const { readdir, stat, mkdir, writeFile, appendFile, readFile } = require('fs').promises;
const { readStdinJson } = require('./lib/stdin-reader');

async function updateProgressAndQuality() {
  try {
    // Read input from stdin
    const input = await readStdinJson();
    const toolName = input.tool_name || '';
    const toolInput = input.tool_input || {};
    const toolOutput = input.tool_output || {};
    
    const relevantTools = ['Write', 'Edit', 'MultiEdit', 'Bash'];
    if (!relevantTools.includes(toolName)) {
      console.log(JSON.stringify({ messages: [] }));
      return;
    }
    
    const messages = [];
    
    // Find active story using built-in fs
    const storyFiles = await findFiles('.', 'STORY-*.md', [
      'node_modules', '.git', 'dist', 'web-bundles'
    ]);
    
    let activeStory = null;
    let latestTime = 0;
    
    for (const file of storyFiles) {
      try {
        const stats = await stat(file);
        const content = await readFile(file, 'utf8');
        
        if ((content.includes('Status: In Progress') || content.includes('Status\nIn Progress')) 
            && stats.mtimeMs > latestTime) {
          activeStory = file;
          latestTime = stats.mtimeMs;
        }
      } catch (err) {
        continue;
      }
    }
    
    if (!activeStory) {
      console.log(JSON.stringify({ messages: [] }));
      return;
    }
    
    // Update debug log
    const debugLogPath = '.ai/debug-log.md';
    const timestamp = new Date().toISOString();
    const logEntry = `\n### ${timestamp} - ${toolName}\n` +
                    `File: ${toolInput.file_path || toolInput.command || 'N/A'}\n` +
                    `Action: ${toolName} operation completed\n`;
    
    // Ensure directory exists
    await mkdir(path.dirname(debugLogPath), { recursive: true });
    await appendFile(debugLogPath, logEntry);
    
    // Quick quality check for code modifications
    if (['Write', 'Edit', 'MultiEdit'].includes(toolName) && toolInput.file_path) {
      const filePath = toolInput.file_path;
      const isTestFile = /\.(test|spec)\.(js|ts|jsx|tsx)$/i.test(filePath);
      
      if (!isTestFile) {
        try {
          const fileContent = await readFile(filePath, 'utf8');
          
          // Quick simulation pattern check
          const hasSimulationPattern = /TODO:?\s*[Ii]mplement|NotImplementedException|^\s*pass\s*$/m.test(fileContent);
          
          if (hasSimulationPattern) {
            messages.push({
              role: 'system',
              content: `⚠️ BMAD Quality Alert: Potential simulation pattern detected in ${path.basename(filePath)}. ` +
                      'Consider running *reality-audit for comprehensive validation.'
            });
          }
        } catch (err) {
          // File might not exist yet for new files
        }
      }
    }
    
    // Track progress in workspace if available
    const workspacePath = '.workspace';
    try {
      await stat(workspacePath);
      const progressFile = path.join(workspacePath, 'progress.json');
      let progress = {};
      
      try {
        const progressData = await readFile(progressFile, 'utf8');
        progress = JSON.parse(progressData);
      } catch (err) {
        // File doesn't exist yet
      }
      
      if (!progress.sessions) progress.sessions = {};
      if (!progress.sessions[process.pid]) {
        progress.sessions[process.pid] = {
          startTime: timestamp,
          operations: []
        };
      }
      
      progress.sessions[process.pid].operations.push({
        timestamp,
        tool: toolName,
        target: toolInput.file_path || toolInput.command || 'N/A'
      });
      
      await writeFile(progressFile, JSON.stringify(progress, null, 2));
    } catch (err) {
      // Workspace doesn't exist
    }
    
    console.log(JSON.stringify({ messages }));
  } catch (error) {
    console.log(JSON.stringify({ messages: [] }));
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

updateProgressAndQuality();