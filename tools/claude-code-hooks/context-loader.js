#!/usr/bin/env node

/**
 * BMAD Context Loader Hook
 * Automatically loads active story context and quality reminders
 * Runs on UserPromptSubmit to enhance prompts with relevant context
 */

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

async function loadActiveContext() {
  try {
    // Find active story files
    const storyFiles = glob.sync('**/STORY-*.md', { 
      ignore: ['node_modules/**', '.git/**'] 
    });
    
    // Find the most recently modified story
    let activeStory = null;
    let latestTime = 0;
    
    for (const file of storyFiles) {
      const stats = await fs.stat(file);
      const content = await fs.readFile(file, 'utf8');
      
      // Check if story is in progress
      if (content.includes('Status: In Progress') && stats.mtimeMs > latestTime) {
        activeStory = file;
        latestTime = stats.mtimeMs;
      }
    }
    
    const context = {
      approve: true,
      messages: []
    };
    
    if (activeStory) {
      const storyContent = await fs.readFile(activeStory, 'utf8');
      
      // Extract key sections
      const acceptanceCriteria = extractSection(storyContent, 'Acceptance Criteria');
      const implementationNotes = extractSection(storyContent, 'Implementation Notes');
      
      if (acceptanceCriteria || implementationNotes) {
        context.messages.push({
          role: 'system',
          content: `Active Story Context from ${path.basename(activeStory)}:\n\n` +
                   (acceptanceCriteria ? `Acceptance Criteria:\n${acceptanceCriteria}\n\n` : '') +
                   (implementationNotes ? `Implementation Notes:\n${implementationNotes}` : '')
        });
      }
    }
    
    // Add quality reminders if working on implementation
    const prompt = process.env.CLAUDE_CODE_PROMPT || '';
    if (prompt.includes('implement') || prompt.includes('develop') || prompt.includes('fix')) {
      context.messages.push({
        role: 'system',
        content: 'BMAD Quality Reminder: Ensure all implementations are complete and functional. ' +
                 'No stubs, mocks, or placeholder code. Use *reality-audit for validation.'
      });
    }
    
    console.log(JSON.stringify(context));
  } catch (error) {
    // On error, approve but don't add context
    console.log(JSON.stringify({ approve: true }));
  }
}

function extractSection(content, sectionName) {
  const regex = new RegExp(`### ${sectionName}\\s*([\\s\\S]*?)(?=###|$)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

loadActiveContext();