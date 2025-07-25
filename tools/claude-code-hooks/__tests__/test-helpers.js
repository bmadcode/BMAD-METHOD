/**
 * Test helpers for BMAD hooks testing
 * Uses only Node.js built-in modules
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Mock environment setup
function mockClaudeCodeEnv(overrides = {}) {
  const env = {
    CLAUDE_CODE: 'true',
    CLAUDE_CODE_TOOL_NAME: 'Write',
    CLAUDE_CODE_TOOL_INPUT: JSON.stringify({
      file_path: 'test.js',
      content: 'console.log("test");'
    }),
    CLAUDE_CODE_TOOL_OUTPUT: JSON.stringify({}),
    CLAUDE_CODE_PROMPT: 'implement test feature',
    ...overrides
  };
  
  return env;
}

// Test file creation
async function createTestFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
}

// Test cleanup
async function cleanup(paths) {
  for (const p of paths) {
    try {
      const stats = await fs.stat(p);
      if (stats.isDirectory()) {
        await fs.rmdir(p, { recursive: true });
      } else {
        await fs.unlink(p);
      }
    } catch (err) {
      // Ignore if doesn't exist
    }
  }
}

// Run hook and capture output
async function runHook(hookPath, env = {}) {
  try {
    const { stdout, stderr } = await execAsync(`node ${hookPath}`, {
      env: { ...process.env, ...env }
    });
    
    return {
      success: true,
      output: stdout ? JSON.parse(stdout) : null,
      error: stderr
    };
  } catch (error) {
    return {
      success: false,
      output: null,
      error: error.message
    };
  }
}

// Assert helpers
function assertEqual(actual, expected, message) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${message}\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`);
  }
}

function assertTrue(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertFalse(condition, message) {
  if (condition) {
    throw new Error(message || 'Assertion failed - expected false');
  }
}

module.exports = {
  mockClaudeCodeEnv,
  createTestFile,
  cleanup,
  runHook,
  assertEqual,
  assertTrue,
  assertFalse
};