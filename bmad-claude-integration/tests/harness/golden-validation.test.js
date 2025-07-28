
const { describe, test, expect } = require('@jest/globals');
const fs = require('fs').promises;
const path = require('path');

describe('BMAD Golden Test Validation', () => {
  let goldenTests;

  beforeAll(async () => {
    const summaryPath = path.join(__dirname, 'golden', 'summary.json');
    const summary = JSON.parse(await fs.readFile(summaryPath, 'utf8'));
    
    goldenTests = await Promise.all(
      summary.scenarios.map(async (scenario) => {
        const testPath = path.join(__dirname, 'golden', `${scenario.id}.json`);
        return JSON.parse(await fs.readFile(testPath, 'utf8'));
      })
    );
  });

  test('all golden tests should have expected patterns', () => {
    for (const test of goldenTests) {
      expect(test.validation.patternsFound.length).toBeGreaterThan(0);
    }
  });

  test('elicitation should use natural language', () => {
    for (const test of goldenTests) {
      expect(test.validation.elicitationNatural).toBe(true);
    }
  });

  test('context should be preserved in multi-agent workflows', () => {
    const multiAgentTests = goldenTests.filter(t => t.agent === 'multiple');
    for (const test of multiAgentTests) {
      expect(test.validation.contextPreserved).toBe(true);
    }
  });
});
