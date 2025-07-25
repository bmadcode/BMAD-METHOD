#!/usr/bin/env node

/**
 * BMAD Reality Guard Hook
 * Prevents creation of mock/stub implementations
 * Runs on PreToolUse for Write operations
 */

const fs = require('fs-extra');

async function checkForSimulationPatterns() {
  try {
    const toolInput = JSON.parse(process.env.CLAUDE_CODE_TOOL_INPUT || '{}');
    const content = toolInput.content || '';
    const filePath = toolInput.file_path || '';
    
    // Simulation patterns to detect
    const simulationPatterns = [
      /\/\/\s*TODO:?\s*[Ii]mplement/i,
      /throw\s+new\s+NotImplementedException/i,
      /return\s+(null|undefined|""|''|0|false|Mock|Stub)/i,
      /console\.(log|warn|error)\s*\(\s*["']Not implemented/i,
      /\bmock\w*\s*[:=]/i,
      /\bstub\w*\s*[:=]/i,
      /return\s+Task\.CompletedTask\s*;?\s*$/m,
      /^\s*pass\s*$/m,
      /^\s*\.\.\.\s*$/m,
      /return\s+\{\s*\}\s*;?\s*$/m
    ];
    
    // Check if it's a test file (allow mocks in tests)
    const isTestFile = /\.(test|spec|mock|stub)\.(js|ts|jsx|tsx|cs|py)$/i.test(filePath);
    
    if (!isTestFile) {
      for (const pattern of simulationPatterns) {
        if (pattern.test(content)) {
          return {
            approve: false,
            message: 'BMAD Reality Guard: Detected simulation pattern. ' +
                     'Please provide complete, functional implementation. ' +
                     'No stubs, mocks, or placeholders allowed in production code.'
          };
        }
      }
    }
    
    // Additional check for empty method bodies
    const emptyMethodPattern = /\{[\s\n]*\}/g;
    const methodSignatures = content.match(/\b(function|async\s+function|def|public|private|protected)\s+\w+\s*\([^)]*\)\s*[^{]*/g);
    
    if (methodSignatures) {
      for (const sig of methodSignatures) {
        const afterSig = content.substring(content.indexOf(sig) + sig.length);
        const firstBrace = afterSig.indexOf('{');
        if (firstBrace !== -1) {
          const methodBody = extractBalancedBraces(afterSig.substring(firstBrace));
          if (methodBody && methodBody.replace(/[\s\n]/g, '') === '{}') {
            return {
              approve: false,
              message: 'BMAD Reality Guard: Empty method body detected. ' +
                       'All methods must contain functional implementation.'
            };
          }
        }
      }
    }
    
    console.log(JSON.stringify({ approve: true }));
  } catch (error) {
    // On error, approve to avoid blocking
    console.log(JSON.stringify({ approve: true }));
  }
}

function extractBalancedBraces(str) {
  let depth = 0;
  let start = -1;
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (str[i] === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        return str.substring(start, i + 1);
      }
    }
  }
  
  return null;
}

checkForSimulationPatterns();