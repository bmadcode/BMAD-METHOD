const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');
const ElicitationBroker = require('../../core/elicitation-broker');
const BMADMessageQueue = require('../../core/message-queue');

describe('ElicitationBroker', () => {
  let broker;
  let queue;
  let tempDir;

  beforeEach(async () => {
    tempDir = await global.testUtils.createTempDir();
    queue = new BMADMessageQueue({ basePath: tempDir });
    await queue.initialize();
    broker = new ElicitationBroker(queue, { basePath: tempDir });
  });

  afterEach(async () => {
    await global.testUtils.cleanupTempDir(tempDir);
  });

  describe('Session Management', () => {
    test('should create an elicitation session', async () => {
      const session = await broker.createSession('pm', {
        user_request: 'Create user story',
        project: 'test-project'
      });

      expect(session.id).toMatch(/^elicit-\d+-[a-f0-9]+$/);
      expect(session.agent).toBe('pm');
      expect(session.status).toBe('active');
      expect(session.context.user_request).toBe('Create user story');
      expect(session.context.elicitationHistory).toEqual([]);
    });

    test('should load an existing session', async () => {
      const session = await broker.createSession('architect', {
        task: 'Design system'
      });

      const loaded = await broker.loadSession(session.id);
      expect(loaded.id).toBe(session.id);
      expect(loaded.agent).toBe('architect');
      expect(loaded.context.task).toBe('Design system');
    });

    test('should throw error for non-existent session', async () => {
      await expect(broker.loadSession('non-existent')).rejects.toThrow('Session non-existent not found');
    });
  });

  describe('Question and Response Tracking', () => {
    test('should add questions to session', async () => {
      const session = await broker.createSession('pm', {});
      
      const question1 = await broker.addQuestion(session.id, 'What is the primary use case?');
      const question2 = await broker.addQuestion(session.id, 'Who are the target users?', {
        priority: 'high'
      });

      expect(question1.id).toBe('q1');
      expect(question1.type).toBe('question');
      expect(question1.text).toBe('What is the primary use case?');
      
      expect(question2.id).toBe('q2');
      expect(question2.metadata.priority).toBe('high');

      const updated = await broker.loadSession(session.id);
      expect(updated.context.elicitationHistory.length).toBe(2);
    });

    test('should add responses to session', async () => {
      const session = await broker.createSession('qa', {});
      
      await broker.addQuestion(session.id, 'What testing framework?');
      const response = await broker.addResponse(session.id, 'Jest with AI judge tests', 'q1');

      expect(response.id).toBe('r1');
      expect(response.type).toBe('response');
      expect(response.text).toBe('Jest with AI judge tests');
      expect(response.questionId).toBe('q1');

      const updated = await broker.loadSession(session.id);
      expect(updated.context.elicitationHistory.length).toBe(2);
    });
  });

  describe('Phase Management', () => {
    test('should update session phase', async () => {
      const session = await broker.createSession('architect', {});
      
      await broker.updatePhase(session.id, 'requirements_gathering');
      await broker.updatePhase(session.id, 'design_phase');

      const updated = await broker.loadSession(session.id);
      expect(updated.currentPhase).toBe('design_phase');
      
      const phaseChanges = updated.context.elicitationHistory.filter(h => h.type === 'phase_change');
      expect(phaseChanges.length).toBe(2);
    });
  });

  describe('Session Completion', () => {
    test('should complete session with result', async () => {
      const session = await broker.createSession('dev', {});
      
      await broker.addQuestion(session.id, 'Programming language?');
      await broker.addResponse(session.id, 'TypeScript');
      
      const completed = await broker.completeSession(session.id, {
        implementation_plan: 'Use TypeScript with Node.js'
      });

      expect(completed.status).toBe('completed');
      expect(completed.completedAt).toBeDefined();
      expect(completed.result).toEqual({
        implementation_plan: 'Use TypeScript with Node.js'
      });
      expect(completed.metadata.duration).toBeGreaterThan(0);
    });
  });

  describe('Active Sessions', () => {
    test('should list active elicitation sessions', async () => {
      // Create multiple sessions
      const session1 = await broker.createSession('pm', { task: 'Task 1' });
      const session2 = await broker.createSession('architect', { task: 'Task 2' });
      await broker.completeSession(session1.id);

      const activeSessions = await broker.getActiveElicitations();
      expect(activeSessions.length).toBe(1);
      expect(activeSessions[0].id).toBe(session2.id);
      expect(activeSessions[0].agent).toBe('architect');
    });
  });

  describe('Elicitation Formatting', () => {
    test('should format elicitation prompt correctly', async () => {
      const session = await broker.createSession('ux-expert', {});
      
      // Test with no history first
      const emptyPrompt = await broker.formatElicitationPrompt(session, 'First question?');
      expect(emptyPrompt).toContain('BMAD ux-expert - Elicitation');
      expect(emptyPrompt).toContain('Current Question:');
      expect(emptyPrompt).toContain('First question?');
      expect(emptyPrompt).not.toContain('Previous Context:');
      
      // Now add history and test again
      await broker.addQuestion(session.id, 'What is the target demographic?');
      await broker.addResponse(session.id, 'Young professionals 25-35');
      await broker.addQuestion(session.id, 'What design style preference?');

      const prompt = await broker.formatElicitationPrompt(session, 'Modern or classic design?');

      // Debug: log the prompt to see what's happening
      // console.log('Generated prompt:', prompt);
      
      // Reload session to ensure we have latest data
      const reloadedSession = await broker.loadSession(session.id);
      expect(reloadedSession.context.elicitationHistory.length).toBeGreaterThan(0);
      
      const promptWithHistory = await broker.formatElicitationPrompt(reloadedSession, 'Modern or classic design?');

      expect(promptWithHistory).toContain('BMAD ux-expert - Elicitation');
      expect(promptWithHistory).toContain('Previous Context:');
      expect(promptWithHistory).toContain('What is the target demographic?');
      expect(promptWithHistory).toContain('Young professionals 25-35');
      expect(promptWithHistory).toContain('Current Question:');
      expect(promptWithHistory).toContain('Modern or classic design?');
    });
  });

  describe('Session Summary', () => {
    test('should generate session summary', async () => {
      const session = await broker.createSession('sm', {});
      
      await broker.addQuestion(session.id, 'Sprint length?');
      await broker.addResponse(session.id, '2 weeks');
      await broker.addQuestion(session.id, 'Team size?');
      await broker.addResponse(session.id, '5 developers');

      const summary = await broker.getSessionSummary(session.id);

      expect(summary.id).toBe(session.id);
      expect(summary.agent).toBe('sm');
      expect(summary.status).toBe('active');
      expect(summary.questionsAsked).toBe(2);
      expect(summary.responsesReceived).toBe(2);
      expect(summary.duration).toBeGreaterThan(0);
    });
  });

  describe('Message Processing', () => {
    test('should process elicitation messages', async () => {
      const createMessage = {
        data: {
          action: 'create',
          data: {
            agent: 'po',
            context: { project: 'Test' }
          }
        }
      };

      const session = await broker.processElicitationMessage(createMessage);
      expect(session.agent).toBe('po');

      const questionMessage = {
        data: {
          sessionId: session.id,
          action: 'question',
          data: {
            question: 'What are the key features?',
            metadata: { phase: 'discovery' }
          }
        }
      };

      const question = await broker.processElicitationMessage(questionMessage);
      expect(question.text).toBe('What are the key features?');
      expect(question.metadata.phase).toBe('discovery');
    });

    test('should handle unknown action', async () => {
      const message = {
        data: {
          action: 'unknown-action',
          data: {}
        }
      };

      await expect(broker.processElicitationMessage(message)).rejects.toThrow('Unknown elicitation action: unknown-action');
    });
  });
});