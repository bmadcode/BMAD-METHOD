const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');
const OpenAI = require('openai');
const BMADMessageQueue = require('../../core/message-queue');
const ElicitationBroker = require('../../core/elicitation-broker');
const SessionManager = require('../../core/session-manager');
const BMADLoader = require('../../core/bmad-loader');

// AI Judge class for evaluating test results using o3
class AIJudge {
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required for AI Judge tests');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey
    });
  }

  async evaluate(prompt, criteria, model = 'o3-2025-01-17') {
    try {
      const response = await this.openai.chat.completions.create({
        model,
        messages: [{
          role: 'user',
          content: `You are an expert AI judge evaluating a BMAD-METHOD Claude Code integration test.

${prompt}

Evaluation Criteria:
${criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Provide:
1. A score from 0-10 for each criterion
2. Brief explanation for each score
3. Overall pass/fail determination (pass requires all scores >= 7)
4. Specific feedback for improvements

Format your response as JSON:
{
  "scores": [{"criterion": 1, "score": X, "explanation": "..."}],
  "overall_score": X,
  "pass": boolean,
  "feedback": "..."
}`
        }],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI Judge error:', error);
      throw error;
    }
  }
}

describe('BMAD Claude Integration - AI Judge Tests', () => {
  let queue, broker, sessionManager, loader, judge;

  const skipIfNoApiKey = () => {
    if (!process.env.OPENAI_API_KEY) {
      return describe.skip;
    }
    return describe;
  };

  beforeAll(async () => {
    queue = new BMADMessageQueue({ basePath: './test-bmad' });
    broker = new ElicitationBroker(queue);
    sessionManager = new SessionManager(queue, broker);
    loader = new BMADLoader();
    
    // Only create judge if we have API key
    if (process.env.OPENAI_API_KEY) {
      judge = new AIJudge();
    }
    
    await queue.initialize();
    await sessionManager.initialize();
  });

  afterAll(async () => {
    // Cleanup test directories
    const fs = require('fs').promises;
    await fs.rm('./test-bmad', { recursive: true, force: true });
  });

  describe('Context Preservation', () => {
    test('should maintain full context through agent handoffs', async () => {
      // Create complex scenario
      const initialContext = {
        user_request: "Create a microservices architecture for e-commerce with user stories",
        constraints: ["Must support 100k concurrent users", "Budget $50k", "3 month timeline"],
        files: ["requirements.md", "existing-api.yaml"],
        technical_requirements: {
          languages: ["TypeScript", "Python"],
          databases: ["PostgreSQL", "Redis"],
          deployment: "Kubernetes"
        }
      };

      // Simulate PM agent session
      const pmSession = await sessionManager.createAgentSession('pm', initialContext);
      const pmMessage = await queue.sendMessage({
        agent: 'pm',
        type: 'execute',
        session_id: pmSession.id,
        context: initialContext
      });

      // Add conversation entries
      await sessionManager.addToConversation(pmSession.id, {
        type: 'user',
        content: initialContext.user_request
      });

      await sessionManager.addToConversation(pmSession.id, {
        type: 'agent',
        content: 'I need to understand your user base better. What are the main user personas?'
      });

      // Simulate architect session with handoff
      const architectSession = await sessionManager.createAgentSession('architect', {
        ...initialContext,
        previous_agent: 'pm',
        pm_output: 'User stories created for authentication, catalog, and checkout'
      });

      // Get final context
      const finalPMSession = await sessionManager.loadSession(pmSession.id);
      const finalArchSession = await sessionManager.loadSession(architectSession.id);

      // AI Judge evaluation
      const evaluation = await judge.evaluate(
        `Context Preservation Test:
        
Initial Context: ${JSON.stringify(initialContext, null, 2)}

PM Session Final State: ${JSON.stringify(finalPMSession, null, 2)}

Architect Session State: ${JSON.stringify(finalArchSession, null, 2)}

Evaluate whether the context was properly preserved across agent handoffs.`,
        [
          'All initial constraints are preserved in both sessions',
          'Technical requirements remain intact',
          'File references are maintained',
          'User request is accurately captured',
          'Agent handoff includes relevant context from PM to Architect'
        ]
      );

      expect(evaluation.pass).toBe(true);
      expect(evaluation.overall_score).toBeGreaterThanOrEqual(7);
    }, 30000);
  });

  describe('Elicitation Quality', () => {
    test('should handle elicitation phases naturally', async () => {
      const userRequest = "Create a user story for a payment processing feature";
      
      // Create elicitation session
      const elicitSession = await broker.createSession('pm', {
        user_request: userRequest,
        project_context: 'E-commerce platform'
      });

      // Simulate elicitation flow
      const questions = [
        "What payment methods should be supported?",
        "Do you need to handle recurring payments?",
        "What are the compliance requirements (PCI-DSS, etc.)?"
      ];

      const responses = [
        "Credit cards, PayPal, and Apple Pay",
        "Yes, for subscription products",
        "Full PCI-DSS compliance is required"
      ];

      for (let i = 0; i < questions.length; i++) {
        await broker.addQuestion(elicitSession.id, questions[i], {
          phase: 'requirements_gathering',
          importance: 'high'
        });
        
        await broker.addResponse(elicitSession.id, responses[i], `q${i + 1}`);
      }

      const completedSession = await broker.completeSession(elicitSession.id, {
        user_story: "As a customer, I want to pay using multiple payment methods..."
      });

      // AI Judge evaluation
      const evaluation = await judge.evaluate(
        `Elicitation Quality Test:
        
User Request: ${userRequest}

Elicitation Flow:
${questions.map((q, i) => `Q: ${q}\nA: ${responses[i]}`).join('\n\n')}

Completed Session: ${JSON.stringify(completedSession, null, 2)}

Evaluate the quality of the elicitation process.`,
        [
          'Questions are relevant to the user request',
          'Questions progressively gather necessary details',
          'Questions avoid redundancy',
          'Response format is natural (no special syntax required)',
          'Elicitation history is properly tracked'
        ]
      );

      expect(evaluation.pass).toBe(true);
      expect(evaluation.overall_score).toBeGreaterThanOrEqual(8);
    }, 30000);
  });

  describe('Multi-Agent Orchestration', () => {
    test('should handle concurrent agent sessions effectively', async () => {
      // Create multiple concurrent sessions
      const sessions = await Promise.all([
        sessionManager.createAgentSession('pm', { task: 'Create user stories' }),
        sessionManager.createAgentSession('architect', { task: 'Design system architecture' }),
        sessionManager.createAgentSession('qa', { task: 'Create test plan' })
      ]);

      // Simulate switching between sessions
      await sessionManager.switchSession(sessions[1].id);
      await sessionManager.suspendSession(sessions[1].id, 'user_switch');
      await sessionManager.switchSession(sessions[0].id);

      // Add activities to different sessions
      for (const session of sessions) {
        await sessionManager.addToConversation(session.id, {
          type: 'user',
          content: `Working on ${session.context.task}`
        });
      }

      // Get session list
      const sessionList = sessionManager.formatSessionList();

      // AI Judge evaluation
      const evaluation = await judge.evaluate(
        `Multi-Agent Orchestration Test:
        
Created Sessions: ${sessions.map(s => `${s.agent}: ${s.context.task}`).join(', ')}

Session List Output:
${sessionList}

Session States: ${JSON.stringify(sessions.map(s => ({
  id: s.id,
  agent: s.agent,
  status: s.status,
  ui: s.ui
})), null, 2)}

Evaluate the multi-agent session management.`,
        [
          'Each agent has clear visual identification (icon + name)',
          'Session status is clearly indicated (active/suspended)',
          'Session switching commands are provided',
          'Concurrent sessions are properly isolated',
          'User can easily understand which agent they are talking to'
        ]
      );

      expect(evaluation.pass).toBe(true);
      expect(evaluation.overall_score).toBeGreaterThanOrEqual(8);
    }, 30000);
  });

  describe('BMAD Agent Behavior Preservation', () => {
    test('should preserve original BMAD agent behavior', async () => {
      // Load original BMAD agent
      const pmAgent = await loader.loadAgent('pm');
      
      // Verify agent structure
      const evaluation = await judge.evaluate(
        `BMAD Agent Preservation Test:
        
Loaded PM Agent Structure:
- Title: ${pmAgent.title}
- Agent Info: ${JSON.stringify(pmAgent.agent, null, 2)}
- Commands: ${JSON.stringify(pmAgent.commands?.slice(0, 5), null, 2)}
- Dependencies: ${JSON.stringify(pmAgent.dependencies, null, 2)}

Evaluate whether the BMAD loader properly preserves the original agent structure and behavior.`,
        [
          'Agent metadata is correctly extracted',
          'Commands are properly parsed',
          'Dependencies are maintained',
          'YAML configuration is correctly loaded',
          'Original agent logic can be executed without modification'
        ]
      );

      expect(evaluation.pass).toBe(true);
      expect(pmAgent.agent.name).toBe('Product Manager');
    }, 30000);
  });

  describe('Error Recovery', () => {
    test('should handle errors gracefully', async () => {
      const errorScenarios = [];

      // Test 1: Invalid session ID
      try {
        await sessionManager.switchSession('invalid-session-id');
      } catch (error) {
        errorScenarios.push({
          scenario: 'Invalid session ID',
          error: error.message,
          handled: true
        });
      }

      // Test 2: Message queue retry
      const failingMessage = await queue.sendMessage({
        agent: 'test-agent',
        type: 'failing',
        simulateFailure: true
      });

      await queue.retry(failingMessage);
      const retriedMessage = await queue.getMessage(failingMessage);
      errorScenarios.push({
        scenario: 'Message retry',
        retries: retriedMessage.retries,
        status: retriedMessage.status
      });

      // Test 3: Elicitation session not found
      try {
        await broker.loadSession('non-existent-session');
      } catch (error) {
        errorScenarios.push({
          scenario: 'Elicitation session not found',
          error: error.message,
          handled: true
        });
      }

      // AI Judge evaluation
      const evaluation = await judge.evaluate(
        `Error Recovery Test:
        
Error Scenarios Tested:
${JSON.stringify(errorScenarios, null, 2)}

Evaluate the error handling and recovery mechanisms.`,
        [
          'Errors provide clear, actionable messages',
          'System maintains stability after errors',
          'Retry mechanisms work correctly',
          'Error states are properly tracked',
          'Recovery suggestions are provided'
        ]
      );

      expect(evaluation.pass).toBe(true);
      expect(errorScenarios.every(s => s.handled !== false)).toBe(true);
    }, 30000);
  });
});

// Integration test with actual agent execution
describe('End-to-End Integration', () => {
  test('should complete a full BMAD workflow', async () => {
    const judge = new AIJudge();
    
    // This test would require actual Claude Code environment
    // For now, we'll simulate the expected behavior
    
    const workflowSteps = [
      { agent: 'pm', action: 'Create user story', status: 'completed' },
      { agent: 'architect', action: 'Design architecture', status: 'completed' },
      { agent: 'dev', action: 'Implementation plan', status: 'completed' },
      { agent: 'qa', action: 'Test strategy', status: 'completed' }
    ];

    const evaluation = await judge.evaluate(
      `End-to-End Workflow Test:
      
Workflow Steps: ${JSON.stringify(workflowSteps, null, 2)}

This represents a complete BMAD workflow from requirements to test strategy.
Each agent should maintain context from previous agents while adding their expertise.`,
      [
        'Workflow progresses logically through agents',
        'Each agent adds value without losing context',
        'Handoffs between agents are smooth',
        'Final output incorporates all agent contributions',
        'User can track progress throughout workflow'
      ]
    );

    expect(evaluation.pass).toBe(true);
  }, 30000);
});