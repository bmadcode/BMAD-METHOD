#!/usr/bin/env node

/**
 * BMAD UserPromptSubmit Hook
 * Automatically loads active story context and quality reminders
 * Runs on UserPromptSubmit to enhance prompts with relevant context
 */

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const { readdir, stat } = require('fs').promises;
const Cache = require('./lib/cache');
const { filterContext, filterAcceptanceCriteria } = require('./lib/context-filter');
const PerformanceMonitor = require('./lib/performance');
const { readStdinJson } = require('./lib/stdin-reader');

// Cache for story files (5 minute TTL)
const storyCache = new Cache(300000);

async function loadActiveContext() {
  return PerformanceMonitor.measure('UserPromptSubmit', async () => {
    try {
    // Read input from stdin
    const input = await readStdinJson();
    const prompt = input.prompt || '';
    
    // Check cache first
    const cacheKey = 'active-story';
    let activeStory = storyCache.get(cacheKey);
    
    if (!activeStory) {
      // Find story files recursively using built-in fs
      const storyFiles = await findFiles('.', 'STORY-*.md', [
        'node_modules', '.git', 'dist', 'web-bundles'
      ]);
    
    let activeStory = null;
    let latestTime = 0;
    
    for (const file of storyFiles) {
      try {
        const stats = await stat(file);
        const content = await fs.readFile(file, 'utf8');
        
        if ((content.includes('Status: In Progress') || content.includes('Status\nIn Progress')) 
            && stats.mtimeMs > latestTime) {
          activeStory = file;
          latestTime = stats.mtimeMs;
        }
      } catch (err) {
        continue;
      }
    }
    
    const context = {
      approve: true,
      messages: []
    };
    
      if (activeStory) {
        storyCache.set(cacheKey, activeStory);
      }
    }
    
    if (activeStory) {
      const storyContent = await fs.readFile(activeStory, 'utf8');
      
      const acceptanceCriteria = extractSection(storyContent, 'Acceptance Criteria');
      const implementationNotes = extractSection(storyContent, 'Implementation Notes');
      const devNotes = extractSection(storyContent, 'Dev Notes');
      
      let contextMessage = `Active Story Context from ${path.basename(activeStory)}:\n\n`;
      
      if (acceptanceCriteria) {
        const filtered = filterAcceptanceCriteria(acceptanceCriteria);
        contextMessage += `Acceptance Criteria:\n${filtered}\n\n`;
      }
      
      if (implementationNotes) {
        contextMessage += `Implementation Notes:\n${implementationNotes}\n\n`;
      }
      
      if (devNotes) {
        contextMessage += `Dev Notes:\n${devNotes}\n\n`;
      }
      
      if (acceptanceCriteria || implementationNotes || devNotes) {
        const filteredContent = filterContext(contextMessage.trim(), prompt);
        context.messages.push({
          role: 'system',
          content: filteredContent
        });
      }
    }
    
    const implementKeywords = ['implement', 'develop', 'fix', 'create', 'build', 'write'];
    
    if (implementKeywords.some(keyword => prompt.toLowerCase().includes(keyword))) {
      context.messages.push({
        role: 'system',
        content: 'BMAD Quality Reminder: Ensure all implementations are complete and functional. ' +
                 'No stubs, mocks, or placeholder code. Use *reality-audit for validation.'
      });
    }
    
    console.log(JSON.stringify(context, null, 2));
    } catch (error) {
      console.log(JSON.stringify({ approve: true }));
    }
  });
}

function extractSection(content, sectionName) {
  const patterns = [
    new RegExp(`^##\\s+${sectionName}\\s*([\\s\\S]*?)(?=^##\\s|$)`, 'mi'),
    new RegExp(`^###\\s+${sectionName}\\s*([\\s\\S]*?)(?=^###\\s|^##\\s|$)`, 'mi')
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  
  return null;
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

loadActiveContext();