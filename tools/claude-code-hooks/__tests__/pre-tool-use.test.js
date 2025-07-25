#!/usr/bin/env node

/**
 * Tests for PreToolUse hook
 * Uses only Node.js built-in modules
 */

const path = require('path');
const {
  mockClaudeCodeEnv,
  runHook,
  assertTrue,
  assertFalse
} = require('./test-helpers');

const hookPath = path.join(__dirname, '..', 'pre-tool-use.js');

async function testSimulationPatternDetection() {
  console.log('Testing simulation pattern detection...');
  
  const patterns = [
    { content: '// TODO: Implement this', shouldBlock: true },
    { content: 'throw new NotImplementedException();', shouldBlock: true },
    { content: 'return null; // TODO', shouldBlock: true },
    { content: 'function test() {}', shouldBlock: true },
    { content: 'def process():\n    pass', shouldBlock: true },
    { content: 'const mockData = {};', shouldBlock: true },
    { content: 'function calculate(x) { return x * 2; }', shouldBlock: false },
    { content: 'const result = processData();', shouldBlock: false }
  ];
  
  for (const pattern of patterns) {
    const env = mockClaudeCodeEnv({
      CLAUDE_CODE_TOOL_INPUT: JSON.stringify({
        file_path: 'src/feature.js',
        content: pattern.content
      })
    });
    
    const result = await runHook(hookPath, env);
    
    assertTrue(result.success, 'Hook should execute');
    
    if (pattern.shouldBlock) {
      assertFalse(result.output.approve, `Should block: ${pattern.content}`);
      assertTrue(result.output.message.includes('simulation pattern'), 'Should mention simulation pattern');
    } else {
      assertTrue(result.output.approve, `Should approve: ${pattern.content}`);
    }
  }
  
  console.log('✓ Simulation pattern detection test passed');
}

async function testTestFileExemption() {
  console.log('Testing test file exemption...');
  
  const testFiles = [
    'feature.test.js',
    'feature.spec.ts',
    '__tests__/feature.js',
    'test/feature.js',
    'tests/integration/feature.js'
  ];
  
  for (const filePath of testFiles) {
    const env = mockClaudeCodeEnv({
      CLAUDE_CODE_TOOL_INPUT: JSON.stringify({
        file_path: filePath,
        content: 'const mockService = {};'
      })
    });
    
    const result = await runHook(hookPath, env);
    
    assertTrue(result.success, 'Hook should execute');
    assertTrue(result.output.approve, `Should approve mocks in test file: ${filePath}`);
  }
  
  console.log('✓ Test file exemption test passed');
}

async function testMultiEditValidation() {
  console.log('Testing MultiEdit validation...');
  
  const env = mockClaudeCodeEnv({
    CLAUDE_CODE_TOOL_NAME: 'MultiEdit',
    CLAUDE_CODE_TOOL_INPUT: JSON.stringify({
      file_path: 'src/app.js',
      edits: [
        { old_string: 'old1', new_string: 'function process() { return 42; }' },
        { old_string: 'old2', new_string: '// TODO: Implement later' }
      ]
    })
  });
  
  const result = await runHook(hookPath, env);
  
  assertTrue(result.success, 'Hook should execute');
  assertFalse(result.output.approve, 'Should block MultiEdit with TODO');
  
  console.log('✓ MultiEdit validation test passed');
}

async function testNonWriteTools() {
  console.log('Testing non-write tools are allowed...');
  
  const tools = ['Read', 'Bash', 'Search', 'List'];
  
  for (const tool of tools) {
    const env = mockClaudeCodeEnv({
      CLAUDE_CODE_TOOL_NAME: tool
    });
    
    const result = await runHook(hookPath, env);
    
    assertTrue(result.success, 'Hook should execute');
    assertTrue(result.output.approve, `Should approve non-write tool: ${tool}`);
  }
  
  console.log('✓ Non-write tools test passed');
}

// Run all tests
async function runTests() {
  console.log('Running PreToolUse hook tests...\n');
  
  const tests = [
    testSimulationPatternDetection,
    testTestFileExemption,
    testMultiEditValidation,
    testNonWriteTools
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      await test();
      passed++;
    } catch (error) {
      failed++;
      console.error(`✗ ${test.name} failed:`, error.message);
    }
  }
  
  console.log(`\nTests completed: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();