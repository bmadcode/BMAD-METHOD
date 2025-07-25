#!/usr/bin/env node

/**
 * Tests for UserPromptSubmit hook
 * Uses only Node.js built-in modules
 */

const path = require('path');
const {
  mockClaudeCodeEnv,
  createTestFile,
  cleanup,
  runHook,
  assertTrue,
  assertEqual
} = require('./test-helpers');

const hookPath = path.join(__dirname, '..', 'user-prompt-submit.js');

async function testContextLoading() {
  console.log('Testing context loading from active story...');
  
  const testDir = '.test-stories';
  const storyPath = path.join(testDir, 'STORY-001.md');
  const storyContent = `# Story 001

## Status
In Progress

## Acceptance Criteria
1. Must load context automatically
2. Must filter long content

## Dev Notes
Critical: Use only built-in modules`;

  try {
    await createTestFile(storyPath, storyContent);
    
    const env = mockClaudeCodeEnv({
      CLAUDE_CODE_PROMPT: 'implement the feature'
    });
    
    const result = await runHook(hookPath, env);
    
    assertTrue(result.success, 'Hook should execute successfully');
    assertTrue(result.output.approve, 'Hook should approve');
    assertTrue(result.output.messages.length > 0, 'Should include context messages');
    
    const contextMessage = result.output.messages[0].content;
    assertTrue(contextMessage.includes('Acceptance Criteria'), 'Should include acceptance criteria');
    assertTrue(contextMessage.includes('Dev Notes'), 'Should include dev notes');
    
    console.log('✓ Context loading test passed');
  } finally {
    await cleanup([testDir]);
  }
}

async function testQualityReminders() {
  console.log('Testing quality reminders for implementation keywords...');
  
  const env = mockClaudeCodeEnv({
    CLAUDE_CODE_PROMPT: 'implement new feature'
  });
  
  const result = await runHook(hookPath, env);
  
  assertTrue(result.success, 'Hook should execute successfully');
  
  const hasQualityReminder = result.output.messages.some(msg => 
    msg.content.includes('BMAD Quality Reminder')
  );
  
  assertTrue(hasQualityReminder, 'Should include quality reminder for implementation');
  
  console.log('✓ Quality reminders test passed');
}

async function testNoActiveStory() {
  console.log('Testing behavior with no active story...');
  
  const env = mockClaudeCodeEnv({
    CLAUDE_CODE_PROMPT: 'check something'
  });
  
  const result = await runHook(hookPath, env);
  
  assertTrue(result.success, 'Hook should execute successfully');
  assertTrue(result.output.approve, 'Hook should approve');
  assertEqual(result.output.messages.length, 0, 'Should have no messages without active story');
  
  console.log('✓ No active story test passed');
}

async function testPerformance() {
  console.log('Testing performance with multiple story files...');
  
  const testDir = '.test-perf-stories';
  const stories = [];
  
  try {
    // Create multiple story files
    for (let i = 0; i < 10; i++) {
      const storyPath = path.join(testDir, `STORY-${i.toString().padStart(3, '0')}.md`);
      const content = `# Story ${i}\n\n## Status\n${i === 5 ? 'In Progress' : 'Draft'}`;
      await createTestFile(storyPath, content);
      stories.push(storyPath);
    }
    
    const startTime = Date.now();
    const result = await runHook(hookPath, mockClaudeCodeEnv());
    const duration = Date.now() - startTime;
    
    assertTrue(result.success, 'Hook should execute successfully');
    assertTrue(duration < 500, `Performance should be under 500ms (was ${duration}ms)`);
    
    console.log(`✓ Performance test passed (${duration}ms)`);
  } finally {
    await cleanup([testDir]);
  }
}

// Run all tests
async function runTests() {
  console.log('Running UserPromptSubmit hook tests...\n');
  
  const tests = [
    testContextLoading,
    testQualityReminders,
    testNoActiveStory,
    testPerformance
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