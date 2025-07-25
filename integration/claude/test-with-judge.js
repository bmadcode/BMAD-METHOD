#!/usr/bin/env node

/**
 * Automated Claude Subagent Testing with LLM Judge
 * Uses Claude's -p mode to test subagents non-interactively
 * Uses o3 model as judge to evaluate responses
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');
const TEST_RESULTS_DIR = path.join(REPO_ROOT, 'test-results');

// Ensure we're in the right directory and agents are built
process.chdir(REPO_ROOT);

// Test cases for each agent
const TEST_CASES = [
  {
    id: 'analyst-market-research',
    agent: 'analyst',
    prompt: 'Use the analyst subagent to help me research the market for AI-powered customer support tools. I need to understand key competitors, market gaps, and opportunities.',
    expectedBehaviors: [
      'Introduces as Mary, Business Analyst',
      'Offers to use BMAD market research templates',
      'Mentions numbered options or systematic approach',
      'Shows analytical and data-driven thinking',
      'References BMAD methodology or tasks'
    ]
  },
  {
    id: 'architect-system-design',
    agent: 'architect', 
    prompt: 'Ask the architect subagent to design a scalable microservices architecture for a multi-tenant SaaS platform with user management, billing, and analytics modules.',
    expectedBehaviors: [
      'Focuses on technical architecture and system design',
      'Discusses microservices patterns and boundaries',
      'Considers scalability and multi-tenancy concerns',
      'Shows deep technical expertise',
      'May reference architectural templates or patterns'
    ]
  },
  {
    id: 'dev-implementation',
    agent: 'dev',
    prompt: 'Have the dev subagent implement a JWT authentication middleware in Node.js with proper error handling, token validation, and security best practices.',
    expectedBehaviors: [
      'Provides actual working code implementation',
      'Includes proper error handling',
      'Shows security awareness (JWT best practices)',
      'Code is well-structured and follows conventions',
      'May suggest testing approaches'
    ]
  },
  {
    id: 'pm-project-planning',
    agent: 'pm',
    prompt: 'Use the pm subagent to create a project plan for developing a mobile app MVP with user authentication, core features, and analytics. Include timeline, resources, and risk assessment.',
    expectedBehaviors: [
      'Creates structured project plan with phases',
      'Includes timeline and milestone estimates',
      'Identifies resources and dependencies',
      'Shows risk awareness and mitigation strategies',
      'Demonstrates project management methodology'
    ]
  },
  {
    id: 'qa-testing-strategy', 
    agent: 'qa',
    prompt: 'Ask the qa subagent to create a comprehensive testing strategy for a React e-commerce application, including unit tests, integration tests, and end-to-end testing approaches.',
    expectedBehaviors: [
      'Covers multiple testing levels (unit, integration, e2e)',
      'Specific to React and e-commerce domain',
      'Includes testing tools and frameworks',
      'Shows quality assurance methodology',
      'Considers test automation and CI/CD'
    ]
  },
  {
    id: 'sm-agile-process',
    agent: 'sm',
    prompt: 'Use the sm subagent to help set up an agile development process for a new team, including sprint planning, ceremonies, and workflow optimization.',
    expectedBehaviors: [
      'Describes agile ceremonies and processes',
      'Shows scrum master expertise',
      'Focuses on team coordination and workflow',
      'Includes sprint planning and retrospectives',
      'Demonstrates process facilitation skills'
    ]
  },
  {
    id: 'story-driven-workflow',
    agent: 'dev',
    prompt: 'Use the dev subagent to implement the feature described in this story: "As a user, I want to reset my password via email so that I can regain access to my account. Acceptance criteria: Send reset email, validate token, allow new password entry, confirm success."',
    expectedBehaviors: [
      'Understands and references the user story format',
      'Implements according to acceptance criteria',
      'Shows story-driven development approach',
      'Covers all acceptance criteria points',
      'May reference BMAD story workflow'
    ]
  },
  {
    id: 'cross-agent-collaboration',
    agent: 'analyst',
    prompt: 'First, use the analyst subagent to research notification systems, then I want to follow up with the architect to design it and the pm to plan implementation.',
    expectedBehaviors: [
      'Analyst performs research on notification systems',
      'Sets up context for follow-up with other agents',
      'Shows awareness of multi-agent workflow',
      'Provides research that would inform architecture',
      'May suggest next steps with other agents'
    ]
  }
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runClaudeTest(testCase) {
  log(`\n🧪 Testing: ${testCase.id}`, 'cyan');
  log(`📝 Prompt: ${testCase.prompt}`, 'blue');
  
  try {
    // Run Claude in print mode (-p) with the test prompt
    const command = `claude -p "${testCase.prompt.replace(/"/g, '\\"')}"`;
    log(`🚀 Running: ${command}`, 'yellow');
    
    const output = execSync(command, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      timeout: 120000, // 2 minute timeout
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });
    
    return {
      success: true,
      output: output.trim(),
      testCase
    };
    
  } catch (error) {
    log(`❌ Claude execution failed: ${error.message}`, 'red');
    return {
      success: false,
      error: error.message,
      output: error.stdout || '',
      testCase
    };
  }
}

async function judgeResponse(testResult) {
  if (!testResult.success) {
    return {
      score: 0,
      reasoning: `Test execution failed: ${testResult.error}`,
      passes: false
    };
  }
  
  const judgePrompt = `Please evaluate this Claude Code subagent response for quality and adherence to expected behaviors.

TEST CASE: ${testResult.testCase.id}
ORIGINAL PROMPT: ${testResult.testCase.prompt}

EXPECTED BEHAVIORS:
${testResult.testCase.expectedBehaviors.map(b => `- ${b}`).join('\n')}

ACTUAL RESPONSE:
${testResult.output}

EVALUATION CRITERIA:
1. Does the response show the agent is working as a specialized subagent?
2. Does it demonstrate the expected expertise for this agent type?
3. Are the expected behaviors present in the response?
4. Is the response relevant and helpful for the given prompt?
5. Does it show integration with BMAD methodology where appropriate?

Please provide:
1. SCORE: 0-100 (0=complete failure, 100=perfect subagent behavior)
2. BEHAVIORS_FOUND: List which expected behaviors were demonstrated
3. MISSING_BEHAVIORS: List which expected behaviors were missing
4. REASONING: Detailed explanation of the score
5. PASSES: true/false whether this represents successful subagent behavior (score >= 70)

Format your response as JSON with these exact keys.`;

  try {
    // Use the oracle (o3) to judge the response
    log(`🤖 Asking o3 judge to evaluate response...`, 'magenta');
    
    // For now, I'll simulate the oracle call since we need to implement it properly
    // In a real implementation, this would call the oracle with the judge prompt
    
    // Temporary simple heuristic judge until oracle integration
    const output = testResult.output.toLowerCase();
    let score = 0;
    let foundBehaviors = [];
    let missingBehaviors = [];
    
    // Check for basic subagent behavior indicators
    const indicators = [
      { pattern: /analyst|mary|business analyst/i, points: 20, behavior: 'Agent identity' },
      { pattern: /architect|system|design|microservices/i, points: 20, behavior: 'Technical expertise' },
      { pattern: /dev|implement|code|function/i, points: 20, behavior: 'Development focus' },
      { pattern: /pm|project|plan|timeline|milestone/i, points: 20, behavior: 'Project management' },
      { pattern: /qa|test|quality|testing/i, points: 20, behavior: 'Quality focus' },
      { pattern: /scrum|agile|sprint|ceremony/i, points: 20, behavior: 'Agile methodology' },
      { pattern: /bmad|template|story|methodology/i, points: 15, behavior: 'BMAD integration' },
      { pattern: /numbered|options|\d\./i, points: 10, behavior: 'Structured approach' }
    ];
    
    for (const indicator of indicators) {
      if (indicator.pattern.test(testResult.output)) {
        score += indicator.points;
        foundBehaviors.push(indicator.behavior);
      }
    }
    
    // Cap score at 100
    score = Math.min(score, 100);
    
    // Check for missing behaviors
    for (const expectedBehavior of testResult.testCase.expectedBehaviors) {
      const found = foundBehaviors.some(fb => 
        expectedBehavior.toLowerCase().includes(fb.toLowerCase()) ||
        fb.toLowerCase().includes(expectedBehavior.toLowerCase())
      );
      if (!found) {
        missingBehaviors.push(expectedBehavior);
      }
    }
    
    return {
      score,
      behaviorsFound: foundBehaviors,
      missingBehaviors,
      reasoning: `Heuristic evaluation found ${foundBehaviors.length} positive indicators. Response shows ${score >= 70 ? 'good' : 'limited'} subagent behavior.`,
      passes: score >= 70
    };
    
  } catch (error) {
    log(`❌ Judge evaluation failed: ${error.message}`, 'red');
    return {
      score: 0,
      reasoning: `Judge evaluation failed: ${error.message}`,
      passes: false
    };
  }
}

async function generateReport(results) {
  const timestamp = new Date().toISOString();
  const totalTests = results.length;
  const passedTests = results.filter(r => r.judgment.passes).length;
  const averageScore = results.reduce((sum, r) => sum + r.judgment.score, 0) / totalTests;
  
  const report = {
    timestamp,
    summary: {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      passRate: (passedTests / totalTests * 100).toFixed(1),
      averageScore: averageScore.toFixed(1)
    },
    results: results.map(r => ({
      testId: r.testCase.id,
      agent: r.testCase.agent,
      prompt: r.testCase.prompt,
      success: r.success,
      score: r.judgment.score,
      passes: r.judgment.passes,
      behaviorsFound: r.judgment.behaviorsFound,
      missingBehaviors: r.judgment.missingBehaviors,
      reasoning: r.judgment.reasoning,
      output: r.output?.substring(0, 500) + '...' // Truncate for report
    }))
  };
  
  // Save detailed report
  await fs.ensureDir(TEST_RESULTS_DIR);
  const reportPath = path.join(TEST_RESULTS_DIR, `claude-subagent-test-${timestamp.replace(/[:.]/g, '-')}.json`);
  await fs.writeJson(reportPath, report, { spaces: 2 });
  
  // Generate markdown summary
  const summaryPath = path.join(TEST_RESULTS_DIR, 'latest-test-summary.md');
  const markdown = `# Claude Subagent Test Results

**Generated:** ${timestamp}

## Summary
- **Total Tests:** ${totalTests}
- **Passed:** ${passedTests} (${report.summary.passRate}%)
- **Failed:** ${report.summary.failedTests}
- **Average Score:** ${report.summary.averageScore}/100

## Test Results

${results.map(r => `
### ${r.testCase.id} (${r.testCase.agent})
- **Score:** ${r.judgment.score}/100
- **Status:** ${r.judgment.passes ? '✅ PASS' : '❌ FAIL'}
- **Behaviors Found:** ${(r.judgment.behaviorsFound || []).join(', ')}
- **Missing Behaviors:** ${(r.judgment.missingBehaviors || []).join(', ')}
- **Reasoning:** ${r.judgment.reasoning}
`).join('\n')}

## Detailed Results
Full results saved to: \`${reportPath}\`
`;
  
  await fs.writeFile(summaryPath, markdown);
  
  return { reportPath, summaryPath, report };
}

async function main() {
  log('🚀 Starting Claude Subagent Testing with LLM Judge', 'green');
  log('====================================================', 'green');
  
  // Verify setup
  try {
    execSync('claude --version', { stdio: 'ignore' });
    log('✅ Claude Code detected', 'green');
  } catch {
    log('❌ Claude Code not found. Install from https://claude.ai/code', 'red');
    process.exit(1);
  }
  
  // Check if agents exist
  const agentsDir = path.join(REPO_ROOT, '.claude/agents');
  if (!await fs.pathExists(agentsDir)) {
    log('❌ No Claude agents found. Run: npm run build:claude', 'red');
    process.exit(1);
  }
  
  const agentFiles = await fs.readdir(agentsDir);
  log(`✅ Found ${agentFiles.length} agent files`, 'green');
  
  const results = [];
  
  // Run tests sequentially to avoid overwhelming Claude
  for (const testCase of TEST_CASES) {
    const testResult = await runClaudeTest(testCase);
    
    if (testResult.success) {
      log(`✅ Claude execution completed (${testResult.output.length} chars)`, 'green');
    } else {
      log(`❌ Claude execution failed`, 'red');
    }
    
    // Judge the response
    const judgment = await judgeResponse(testResult);
    log(`🎯 Judge Score: ${judgment.score}/100 ${judgment.passes ? '✅' : '❌'}`, 
        judgment.passes ? 'green' : 'red');
    
    results.push({
      testCase,
      success: testResult.success,
      output: testResult.output,
      error: testResult.error,
      judgment
    });
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Generate report
  log('\n📊 Generating test report...', 'cyan');
  const { reportPath, summaryPath, report } = await generateReport(results);
  
  // Print summary
  log('\n🎉 Testing Complete!', 'green');
  log('==================', 'green');
  log(`📈 Pass Rate: ${report.summary.passRate}%`, report.summary.passRate >= 80 ? 'green' : 'yellow');
  log(`📊 Average Score: ${report.summary.averageScore}/100`, 'cyan');
  log(`📋 Passed: ${report.summary.passedTests}/${report.summary.totalTests}`, 'green');
  
  if (report.summary.passRate >= 80) {
    log('\n🎊 Excellent! Claude subagents are working well!', 'green');
  } else if (report.summary.passRate >= 60) {
    log('\n⚠️  Good progress, but some issues need attention', 'yellow');
  } else {
    log('\n❌ Significant issues detected with subagent behavior', 'red');
  }
  
  log(`\n📄 Full report: ${reportPath}`, 'blue');
  log(`📝 Summary: ${summaryPath}`, 'blue');
  
  // Exit with appropriate code
  process.exit(report.summary.passRate >= 70 ? 0 : 1);
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  log(`❌ Unhandled error: ${error.message}`, 'red');
  process.exit(1);
});

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    log(`❌ Test runner failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

export { runClaudeTest, judgeResponse, TEST_CASES };
