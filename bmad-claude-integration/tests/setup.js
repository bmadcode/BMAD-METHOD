// Test setup file
const fs = require('fs').promises;
const path = require('path');

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.BMAD_TEST_MODE = 'true';

// Mock Anthropic API key for tests (not used in unit tests)
if (!process.env.ANTHROPIC_API_KEY) {
  process.env.ANTHROPIC_API_KEY = 'test-key';
}

// Global test utilities
global.testUtils = {
  async createTempDir() {
    const tempDir = path.join(__dirname, `temp-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    return tempDir;
  },
  
  async cleanupTempDir(dir) {
    try {
      await fs.rm(dir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  }
};