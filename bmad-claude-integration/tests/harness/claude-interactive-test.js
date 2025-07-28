#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const readline = require('readline');

/**
 * Interactive test harness for BMAD-METHOD Claude Code integration
 * Tests Claude Code as a real user would through the TUI
 */
class ClaudeInteractiveTest {
  constructor(options = {}) {
    this.claudePath = options.claudePath || 'claude';
    this.testDir = options.testDir || path.join(process.cwd(), 'test-workspace');
    this.scenarios = [];
    this.results = [];
    this.currentTest = null;
  }

  async initialize() {
    // Create test workspace
    await fs.mkdir(this.testDir, { recursive: true });
    
    // Create test files for scenarios
    await this.createTestFiles();
    
    // Load test scenarios
    await this.loadScenarios();
  }

  async createTestFiles() {
    // Create sample files for testing
    const files = {
      'requirements.md': `# E-Commerce Platform Requirements
- Support 100k concurrent users
- Payment processing with PCI compliance
- Mobile-responsive design
- Real-time inventory tracking`,
      
      'existing-api.yaml': `openapi: 3.0.0
info:
  title: Legacy API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Get users (slow, needs optimization)`,
      
      'package.json': `{
  "name": "test-project",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "react": "^18.0.0"
  }
}`
    };

    for (const [filename, content] of Object.entries(files)) {
      await fs.writeFile(path.join(this.testDir, filename), content);
    }
  }

  async loadScenarios() {
    this.scenarios = [
      {
        name: 'Basic PM Agent Routing',
        commands: [
          'Create user stories for a login feature with OAuth support',
          'bmad-respond: Google, GitHub, and traditional email/password',
          'bmad-respond: Yes, with remember me for 30 days',
          'bmad-respond: Standard security, 2FA optional'
        ],
        expectations: {
          agentRouting: 'pm',
          elicitationCount: 3,
          outputContains: ['As a user', 'login', 'OAuth'],
          sessionCreated: true
        }
      },
      {
        name: 'Multi-Agent Workflow',
        commands: [
          'Design an e-commerce platform architecture',
          'bmad-respond: B2C marketplace',
          'bmad-respond: 100k users, $1M GMV/month',
          'Now create user stories for the MVP',
          '/bmad-sessions',
          '/switch 1'
        ],
        expectations: {
          multipleAgents: ['architect', 'pm'],
          sessionCount: 2,
          contextPreserved: ['100k users', 'marketplace'],
          sessionSwitching: true
        }
      },
      {
        name: 'Direct Agent Invocation',
        commands: [
          '/bmad-architect Review the existing-api.yaml and suggest improvements',
          'bmad-respond: Yes, we need to support 10x growth',
          'Create stories for the optimization work'
        ],
        expectations: {
          directInvocation: true,
          fileAnalysis: 'existing-api.yaml',
          agentHandoff: ['architect', 'pm']
        }
      },
      {
        name: 'Concurrent Sessions',
        commands: [
          'Help me plan a sprint for next week',
          'bmad-respond: 5 developers, 2-week sprint',
          'In parallel, create a technical spec for the payment service',
          '/bmad-sessions',
          'Continue with the sprint planning',
          '/switch 2'
        ],
        expectations: {
          concurrentSessions: true,
          clearAgentIdentification: true,
          sessionManagement: ['list', 'switch']
        }
      },
      {
        name: 'Error Recovery',
        commands: [
          'Create a story for', // Incomplete command
          '/bmad-unknown-command', // Invalid command
          'Help me with the user story for login', // Recovery
          'bmad-respond: Social login with Google'
        ],
        expectations: {
          errorHandling: true,
          gracefulRecovery: true,
          validOutput: true
        }
      }
    ];
  }

  async runScenario(scenario) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Running: ${scenario.name}`);
    console.log(`${'='.repeat(60)}\n`);

    const result = {
      name: scenario.name,
      success: true,
      details: {},
      errors: []
    };

    try {
      // Start Claude process
      const claude = spawn(this.claudePath, ['-p', this.testDir], {
        cwd: this.testDir,
        env: { ...process.env, BMAD_TEST_MODE: 'true' }
      });

      // Set up output capture
      let output = '';
      let currentAgent = null;
      let sessionCount = 0;
      let elicitationCount = 0;

      claude.stdout.on('data', (data) => {
        const text = data.toString();
        output += text;
        
        // Parse output for test validation
        this.parseOutput(text, result);
      });

      claude.stderr.on('data', (data) => {
        result.errors.push(data.toString());
      });

      // Execute commands
      for (const command of scenario.commands) {
        await this.delay(1000); // Wait for Claude to be ready
        
        console.log(`> ${command}`);
        claude.stdin.write(command + '\n');
        
        // Wait for response
        await this.waitForResponse(claude, command);
      }

      // Validate expectations
      await this.validateExpectations(scenario.expectations, result, output);

      // Clean up
      claude.kill();
      await this.waitForExit(claude);

    } catch (error) {
      result.success = false;
      result.errors.push(error.message);
    }

    this.results.push(result);
    return result;
  }

  parseOutput(text, result) {
    // Detect agent routing
    const agentMatch = text.match(/(?:Routes? to|Invoking) (\w+) agent/i);
    if (agentMatch) {
      result.details.agentRouted = agentMatch[1].toLowerCase();
    }

    // Detect elicitation
    if (text.includes('bmad-respond:') || text.includes('Question:')) {
      result.details.elicitationCount = (result.details.elicitationCount || 0) + 1;
    }

    // Detect session creation
    if (text.includes('Session created:') || text.includes('session-')) {
      result.details.sessionCreated = true;
      const sessionMatch = text.match(/session-[\w-]+/);
      if (sessionMatch) {
        result.details.sessionId = sessionMatch[0];
      }
    }

    // Detect agent identification
    const agentIcons = ['📋', '🏗️', '💻', '🐛', '🎨', '🏃', '🧙', '🎭'];
    for (const icon of agentIcons) {
      if (text.includes(icon)) {
        result.details.agentIconFound = true;
        break;
      }
    }

    // Detect errors
    if (text.includes('Error:') || text.includes('error')) {
      result.details.errorDetected = true;
    }
  }

  async waitForResponse(claude, command, timeout = 5000) {
    return new Promise((resolve) => {
      let responseReceived = false;
      const startTime = Date.now();

      const checkResponse = setInterval(() => {
        // Check if we got a response or timeout
        if (responseReceived || Date.now() - startTime > timeout) {
          clearInterval(checkResponse);
          resolve();
        }
      }, 100);

      // Listen for response indicators
      const listener = (data) => {
        const text = data.toString();
        if (text.includes('>') || text.includes('bmad-respond:') || text.includes('Session')) {
          responseReceived = true;
        }
      };

      claude.stdout.on('data', listener);
    });
  }

  async validateExpectations(expectations, result, output) {
    for (const [key, expected] of Object.entries(expectations)) {
      switch (key) {
        case 'agentRouting':
          if (result.details.agentRouted !== expected) {
            result.success = false;
            result.errors.push(`Expected agent ${expected}, got ${result.details.agentRouted}`);
          }
          break;

        case 'elicitationCount':
          if (result.details.elicitationCount !== expected) {
            result.success = false;
            result.errors.push(`Expected ${expected} elicitations, got ${result.details.elicitationCount}`);
          }
          break;

        case 'outputContains':
          for (const phrase of expected) {
            if (!output.includes(phrase)) {
              result.success = false;
              result.errors.push(`Output missing expected phrase: ${phrase}`);
            }
          }
          break;

        case 'sessionCreated':
          if (!result.details.sessionCreated) {
            result.success = false;
            result.errors.push('No session created');
          }
          break;

        case 'multipleAgents':
          // Check if multiple agents were invoked
          for (const agent of expected) {
            if (!output.toLowerCase().includes(agent)) {
              result.success = false;
              result.errors.push(`Agent ${agent} not invoked`);
            }
          }
          break;

        case 'contextPreserved':
          for (const context of expected) {
            if (!output.includes(context)) {
              result.success = false;
              result.errors.push(`Context not preserved: ${context}`);
            }
          }
          break;
      }
    }
  }

  async waitForExit(claude) {
    return new Promise((resolve) => {
      claude.on('exit', resolve);
      setTimeout(resolve, 1000); // Timeout fallback
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async runAllScenarios() {
    await this.initialize();

    console.log('🧪 BMAD-METHOD Claude Code Interactive Testing');
    console.log(`Testing ${this.scenarios.length} scenarios...\n`);

    for (const scenario of this.scenarios) {
      await this.runScenario(scenario);
    }

    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Results Summary');
    console.log('='.repeat(60) + '\n');

    const passed = this.results.filter(r => r.success).length;
    const total = this.results.length;
    const passRate = (passed / total * 100).toFixed(1);

    console.log(`Overall: ${passed}/${total} passed (${passRate}%)\n`);

    for (const result of this.results) {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.name}`);
      
      if (!result.success && result.errors.length > 0) {
        for (const error of result.errors) {
          console.log(`   └─ ${error}`);
        }
      }
    }

    // Success criteria evaluation
    console.log('\n' + '='.repeat(60));
    console.log('Success Criteria Evaluation');
    console.log('='.repeat(60) + '\n');

    const metrics = this.evaluateMetrics();
    for (const [metric, value] of Object.entries(metrics)) {
      const status = value.pass ? '✅' : '❌';
      console.log(`${status} ${metric}: ${value.score}% (target: ${value.target}%)`);
    }

    // Save detailed results
    this.saveResults();
  }

  evaluateMetrics() {
    return {
      'Agent Routing Accuracy': {
        score: this.calculateRoutingAccuracy(),
        target: 95,
        pass: this.calculateRoutingAccuracy() >= 95
      },
      'Elicitation Flow': {
        score: this.calculateElicitationSuccess(),
        target: 100,
        pass: this.calculateElicitationSuccess() >= 100
      },
      'Session Management': {
        score: this.calculateSessionSuccess(),
        target: 100,
        pass: this.calculateSessionSuccess() >= 100
      },
      'Error Recovery': {
        score: this.calculateErrorRecovery(),
        target: 100,
        pass: this.calculateErrorRecovery() >= 100
      }
    };
  }

  calculateRoutingAccuracy() {
    const routingTests = this.results.filter(r => r.details.agentRouted);
    const correct = routingTests.filter(r => r.success && !r.errors.some(e => e.includes('Expected agent')));
    return routingTests.length > 0 ? (correct.length / routingTests.length * 100) : 0;
  }

  calculateElicitationSuccess() {
    const elicitationTests = this.results.filter(r => r.details.elicitationCount > 0);
    const correct = elicitationTests.filter(r => r.success);
    return elicitationTests.length > 0 ? (correct.length / elicitationTests.length * 100) : 0;
  }

  calculateSessionSuccess() {
    const sessionTests = this.results.filter(r => r.details.sessionCreated);
    const correct = sessionTests.filter(r => r.success);
    return sessionTests.length > 0 ? (correct.length / sessionTests.length * 100) : 0;
  }

  calculateErrorRecovery() {
    const errorTests = this.results.filter(r => r.name.includes('Error'));
    const recovered = errorTests.filter(r => r.success || r.details.validOutput);
    return errorTests.length > 0 ? (recovered.length / errorTests.length * 100) : 0;
  }

  async saveResults() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const resultsPath = path.join(this.testDir, `test-results-${timestamp}.json`);
    
    await fs.writeFile(resultsPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      scenarios: this.scenarios.length,
      results: this.results,
      metrics: this.evaluateMetrics()
    }, null, 2));
    
    console.log(`\n📁 Detailed results saved to: ${resultsPath}`);
  }

  async cleanup() {
    // Clean up test workspace
    await fs.rm(this.testDir, { recursive: true, force: true });
  }
}

// CLI interface
if (require.main === module) {
  const tester = new ClaudeInteractiveTest();
  
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'run':
      tester.runAllScenarios()
        .then(() => process.exit(0))
        .catch(err => {
          console.error('Test failed:', err);
          process.exit(1);
        });
      break;
      
    case 'scenario':
      const scenarioName = args[1];
      tester.initialize()
        .then(() => {
          const scenario = tester.scenarios.find(s => s.name.includes(scenarioName));
          if (scenario) {
            return tester.runScenario(scenario);
          } else {
            throw new Error(`Scenario not found: ${scenarioName}`);
          }
        })
        .then(result => {
          console.log('\nResult:', result);
          process.exit(result.success ? 0 : 1);
        })
        .catch(err => {
          console.error('Test failed:', err);
          process.exit(1);
        });
      break;
      
    default:
      console.log('Usage: claude-interactive-test.js <command>');
      console.log('Commands:');
      console.log('  run            Run all test scenarios');
      console.log('  scenario NAME  Run specific scenario');
      process.exit(1);
  }
}

module.exports = ClaudeInteractiveTest;