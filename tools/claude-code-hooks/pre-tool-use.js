#!/usr/bin/env node

/**
 * BMAD PreToolUse Hook
 * Validates code quality before write operations
 * Prevents simulation patterns and ensures complete implementations
 */

const fs = require('fs').promises;
const path = require('path');
const Config = require('./lib/config');
const ignoreManager = require('./lib/ignore');
const PerformanceMonitor = require('./lib/performance');
const { readStdinJson } = require('./lib/stdin-reader');

async function validateBeforeWrite() {
  return PerformanceMonitor.measure('PreToolUse', async () => {
    try {
      // Check if hooks are disabled
      if (Config.isDisabled()) {
        console.log(JSON.stringify({ 
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "allow"
          }
        }));
        return;
      }
      
      // Load configuration
      const config = new Config();
      const settings = await config.load();
      
      if (!settings.enabled || !settings.hooks.writeValidator) {
        console.log(JSON.stringify({ 
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "allow"
          }
        }));
        return;
      }
    // Read input from stdin
    const input = await readStdinJson();
    const toolName = input.tool_name || '';
    const toolInput = input.tool_input || {};
    
    if (!['Write', 'Edit', 'MultiEdit'].includes(toolName)) {
      console.log(JSON.stringify({ approve: true }));
      return;
    }
    
    const filePath = toolInput.file_path || '';
    const content = toolInput.content || '';
    const edits = toolInput.edits || [];
    
    // Check ignore patterns
    if (await ignoreManager.shouldIgnore(filePath)) {
      console.log(JSON.stringify({ approve: true }));
      return;
    }
    
    const isTestFile = /\.(test|spec|mock|stub)\.(js|ts|jsx|tsx|cs|py)$/i.test(filePath) ||
                      filePath.includes('__tests__') || 
                      filePath.includes('test/') ||
                      filePath.includes('tests/');
    
    if (isTestFile && settings.quality.allowMocksInTests) {
      console.log(JSON.stringify({ approve: true }));
      return;
    }
    
    if (!settings.quality.strictMode) {
      console.log(JSON.stringify({ approve: true }));
      return;
    }
    
    const simulationPatterns = [
      /\/\/\s*TODO:?\s*[Ii]mplement/i,
      /\/\/\s*FIXME:?\s*[Ii]mplement/i,
      /throw\s+new\s+(NotImplementedException|NotImplementedError)/i,
      /return\s+(null|undefined|""|''|0|false)\s*;?\s*\/\/\s*(TODO|FIXME|placeholder)/i,
      /console\.(log|warn|error)\s*\(\s*["']Not implemented/i,
      /\b(mock|stub|fake|dummy)\w*\s*[:=]/i,
      /return\s+Task\.CompletedTask\s*;?\s*$/m,
      /^\s*pass\s*$/m,
      /^\s*\.\.\.\s*$/m,
      /return\s+\{\s*\}\s*;?\s*\/\/\s*(TODO|empty)/i
    ];
    
    let contentToCheck = content;
    if (toolName === 'MultiEdit') {
      contentToCheck = edits.map(edit => edit.new_string).join('\n');
    }
    
    for (const pattern of simulationPatterns) {
      if (pattern.test(contentToCheck)) {
        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: 'BMAD Reality Guard: Detected simulation pattern. ' +
                                    'Please provide complete, functional implementation. ' +
                                    'No stubs, mocks, or placeholders allowed in production code.'
          }
        }));
        return;
      }
    }
    
    const emptyImplementations = [
      /function\s+\w+\s*\([^)]*\)\s*\{\s*\}/g,
      /async\s+function\s+\w+\s*\([^)]*\)\s*\{\s*\}/g,
      /\w+\s*:\s*function\s*\([^)]*\)\s*\{\s*\}/g,
      /\w+\s*:\s*async\s+function\s*\([^)]*\)\s*\{\s*\}/g,
      /\w+\s*=\s*\([^)]*\)\s*=>\s*\{\s*\}/g,
      /\w+\s*=\s*async\s*\([^)]*\)\s*=>\s*\{\s*\}/g,
      /def\s+\w+\s*\([^)]*\)\s*:\s*\n\s*pass/g,
      /public\s+\w+\s+\w+\s*\([^)]*\)\s*\{\s*\}/g,
      /private\s+\w+\s+\w+\s*\([^)]*\)\s*\{\s*\}/g,
      /protected\s+\w+\s+\w+\s*\([^)]*\)\s*\{\s*\}/g
    ];
    
    for (const pattern of emptyImplementations) {
      if (pattern.test(contentToCheck)) {
        console.log(JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: 'BMAD Reality Guard: Empty method body detected. ' +
                                    'All methods must contain functional implementation.'
          }
        }));
        return;
      }
    }
    
    console.log(JSON.stringify({ approve: true }));
    } catch (error) {
      console.log(JSON.stringify({ approve: true }));
    }
  });
}

validateBeforeWrite();