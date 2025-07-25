#!/usr/bin/env node

/**
 * Real o3 Judge Integration for Claude Subagent Testing
 * This version integrates with Amp's Oracle tool for real o3 evaluation
 */

import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../..');

// Simplified test cases for real o3 evaluation
const CORE_TESTS = [
  {
    id: 'analyst-basic-behavior',
    prompt: 'Use the analyst subagent to help me research the competitive landscape for AI project management tools.',
    expectedEvidence: [
      'Agent identifies as Mary or Business Analyst',
      'Shows analytical methodology or structured approach',
      'References market research or competitive analysis expertise',
      'May mention BMAD templates or systematic workflow'
    ]
  },
  {
    id: 'dev-implementation-test',
    prompt: 'Have the dev subagent implement a JWT authentication middleware with error handling.',
    expectedEvidence: [
      'Provides actual code implementation',
      'Shows development expertise and best practices',
      'Includes proper error handling approach',
      'Demonstrates security awareness for JWT'
    ]
  },
  {
    id: 'architect-system-design',
    prompt: 'Ask the architect subagent to design a microservices architecture for real-time notifications.',
    expectedEvidence: [
      'Shows system architecture expertise',
      'Discusses microservices patterns and boundaries',
      'Considers real-time and scalability concerns',
      'Demonstrates technical depth appropriate for architect role'
    ]
  }
];

async function runSingleTest(testCase) {
  console.log(`\n🧪 Running: ${testCase.id}`);
  console.log(`📝 Prompt: ${testCase.prompt}`);
  
  try {
    // Execute Claude in print mode
    const command = `claude -p "${testCase.prompt.replace(/"/g, '\\"')}"`;
    const startTime = Date.now();
    
    const output = execSync(command, {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      timeout: 90000, // 90 second timeout
      maxBuffer: 1024 * 1024 * 5 // 5MB buffer
    });
    
    const duration = Date.now() - startTime;
    console.log(`✅ Completed in ${(duration / 1000).toFixed(1)}s (${output.length} chars)`);
    
    return {
      success: true,
      output: output.trim(),
      duration,
      testCase
    };
    
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    return {
      success: false,
      error: error.message,
      output: error.stdout || '',
      duration: 0,
      testCase
    };
  }
}

// This function would need to be called from the main Amp environment
// where the Oracle tool is available
async function evaluateWithRealO3(results) {
  console.log('\n🤖 Preparing evaluation for o3 judge...');
  
  const evaluationSummary = {
    testResults: results,
    overallAssessment: null,
    recommendations: []
  };
  
  // Create evaluation prompt for o3
  const evaluationPrompt = `Please evaluate these Claude Code subagent test results to determine if BMAD-Method agents have been successfully ported to Claude's subagent system.

CONTEXT: We've ported BMAD-Method's specialized agents (Analyst, Architect, Dev, PM, QA, Scrum Master) to work as Claude Code subagents. Each agent should maintain its specialized persona and expertise while integrating with BMAD methodology.

TEST RESULTS:
${results.map(r => `
TEST: ${r.testCase.id}
PROMPT: ${r.testCase.prompt}
SUCCESS: ${r.success}
EXPECTED EVIDENCE: ${r.testCase.expectedEvidence.join(', ')}
ACTUAL RESPONSE: ${r.success ? r.output.substring(0, 800) + '...' : 'EXECUTION FAILED: ' + r.error}
`).join('\n---\n')}

EVALUATION CRITERIA:
1. Subagent Specialization: Do responses show distinct agent personas with appropriate expertise?
2. BMAD Integration: Is there evidence of BMAD methodology integration?
3. Response Quality: Are responses helpful, relevant, and well-structured?
4. Technical Accuracy: Is the content technically sound?
5. Persona Consistency: Do agents stay in character?

Please provide:
1. OVERALL_SCORE (0-100): Based on successful subagent behavior demonstration
2. INDIVIDUAL_SCORES: Score each test (0-100)
3. EVIDENCE_FOUND: What evidence shows proper subagent behavior?
4. MISSING_ELEMENTS: What expected behaviors are missing?
5. SUCCESS_ASSESSMENT: Is the BMAD→Claude port working? (YES/NO/PARTIAL)
6. RECOMMENDATIONS: How to improve the integration?

Format as structured JSON for programmatic processing.`;

  // For demo, return a structured analysis prompt that could be used with Oracle
  return {
    evaluationPrompt,
    needsOracleCall: true,
    instruction: 'Call Oracle tool with the evaluationPrompt above to get o3 evaluation'
  };
}

async function runQuickValidationTest() {
  console.log('🚀 Claude Subagent Quick Validation Test');
  console.log('=========================================');
  
  // Check prerequisites
  console.log('🔍 Checking prerequisites...');
  
  try {
    execSync('claude --version', { stdio: 'ignore' });
    console.log('✅ Claude Code available');
  } catch {
    console.error('❌ Claude Code not found');
    return { success: false, error: 'Claude Code not installed' };
  }
  
  const agentsPath = path.join(REPO_ROOT, '.claude/agents');
  if (!await fs.pathExists(agentsPath)) {
    console.error('❌ No .claude/agents directory found');
    return { success: false, error: 'Agents not built - run npm run build:claude' };
  }
  
  const agentFiles = await fs.readdir(agentsPath);
  console.log(`✅ Found ${agentFiles.length} agent files`);
  
  // Run core tests
  console.log(`\n🧪 Running ${CORE_TESTS.length} validation tests...`);
  const results = [];
  
  for (const testCase of CORE_TESTS) {
    const result = await runSingleTest(testCase);
    results.push(result);
    
    // Brief pause between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate summary
  const successful = results.filter(r => r.success).length;
  const avgDuration = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
  
  console.log('\n📊 Test Summary:');
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`⏱️  Average duration: ${(avgDuration / 1000).toFixed(1)}s`);
  
  // Prepare for o3 evaluation
  const evaluation = await evaluateWithRealO3(results);
  
  return {
    success: successful === results.length,
    results,
    evaluation,
    summary: {
      totalTests: results.length,
      successful,
      averageDuration: avgDuration
    }
  };
}

// Export for use in main Amp environment
export { runQuickValidationTest, evaluateWithRealO3, CORE_TESTS };

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  runQuickValidationTest()
    .then(result => {
      console.log('\n🎯 Ready for o3 evaluation!');
      if (result.evaluation?.needsOracleCall) {
        console.log('\n📋 To complete evaluation with o3:');
        console.log('1. Copy the evaluation prompt below');
        console.log('2. Call Oracle tool with the prompt');
        console.log('3. Analyze o3\'s structured response');
        console.log('\n📝 Evaluation Prompt:');
        console.log('---');
        console.log(result.evaluation.evaluationPrompt);
        console.log('---');
      }
      
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error(`❌ Test failed: ${error.message}`);
      process.exit(1);
    });
}
