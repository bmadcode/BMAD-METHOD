#!/usr/bin/env node

/**
 * Run all BMAD hooks tests
 * Uses only Node.js built-in modules
 */

const { spawn } = require('child_process');
const path = require('path');

const tests = [
  'user-prompt-submit.test.js',
  'pre-tool-use.test.js'
];

async function runTest(testFile) {
  return new Promise((resolve, reject) => {
    const testPath = path.join(__dirname, testFile);
    const child = spawn('node', [testPath], {
      stdio: 'inherit'
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Test ${testFile} failed with code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

async function runAllTests() {
  console.log('='.repeat(50));
  console.log('BMAD Claude Code Hooks Test Suite');
  console.log('='.repeat(50));
  console.log();
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      await runTest(test);
      passed++;
      console.log();
    } catch (error) {
      failed++;
      console.error(`\nTest suite ${test} failed:`, error.message);
      console.log();
    }
  }
  
  console.log('='.repeat(50));
  console.log(`Total: ${passed} test suites passed, ${failed} failed`);
  console.log('='.repeat(50));
  
  process.exit(failed > 0 ? 1 : 0);
}

runAllTests();