const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');
const BMADMessageQueue = require('../../core/message-queue');
const path = require('path');

describe('BMADMessageQueue', () => {
  let queue;
  let tempDir;

  beforeEach(async () => {
    tempDir = await global.testUtils.createTempDir();
    queue = new BMADMessageQueue({ basePath: tempDir });
    await queue.initialize();
  });

  afterEach(async () => {
    await global.testUtils.cleanupTempDir(tempDir);
  });

  describe('Message Operations', () => {
    test('should send and retrieve a message', async () => {
      const messageData = {
        agent: 'test-agent',
        type: 'test',
        data: { foo: 'bar' }
      };

      const messageId = await queue.sendMessage(messageData);
      expect(messageId).toMatch(/^msg-\d+-[a-f0-9]+$/);

      const retrieved = await queue.getMessage(messageId);
      expect(retrieved.agent).toBe('test-agent');
      expect(retrieved.type).toBe('test');
      expect(retrieved.data).toEqual({ foo: 'bar' });
      expect(retrieved.status).toBe('pending');
    });

    test('should update message status', async () => {
      const messageId = await queue.sendMessage({
        agent: 'test',
        type: 'update-test'
      });

      const updated = await queue.updateMessage(messageId, {
        status: 'processing',
        progress: 50
      });

      expect(updated.status).toBe('processing');
      expect(updated.progress).toBe(50);
      expect(updated.version).toBe(2);
    });

    test('should mark message as complete', async () => {
      const messageId = await queue.sendMessage({
        agent: 'test',
        type: 'complete-test'
      });

      await queue.markComplete(messageId, { result: 'success' });

      const completed = await queue.getMessage(messageId);
      expect(completed.status).toBe('completed');
      expect(completed.result).toEqual({ result: 'success' });
      expect(completed.completedAt).toBeDefined();
    });

    test('should mark message as failed', async () => {
      const messageId = await queue.sendMessage({
        agent: 'test',
        type: 'fail-test'
      });

      await queue.markFailed(messageId, new Error('Test error'));

      const failed = await queue.getMessage(messageId);
      expect(failed.status).toBe('failed');
      expect(failed.error).toBe('Test error');
      expect(failed.failedAt).toBeDefined();
    });
  });

  describe('Retry Logic', () => {
    test('should retry a message', async () => {
      const messageId = await queue.sendMessage({
        agent: 'test',
        type: 'retry-test'
      });

      const retried = await queue.retry(messageId);
      expect(retried.retries).toBe(1);
      expect(retried.status).toBe('retrying');
      expect(retried.lastRetry).toBeDefined();
    });

    test('should respect max retries', async () => {
      const messageId = await queue.sendMessage({
        agent: 'test',
        type: 'max-retry-test'
      });

      // Simulate max retries
      for (let i = 0; i < queue.maxRetries; i++) {
        await queue.retry(messageId);
      }

      const message = await queue.getMessage(messageId);
      expect(message.retries).toBe(queue.maxRetries);
    });
  });

  describe('Queue Management', () => {
    test('should list messages by status', async () => {
      // Create messages with different statuses
      const activeId = await queue.sendMessage({ agent: 'test', type: 'active' });
      const completedId = await queue.sendMessage({ agent: 'test', type: 'completed' });
      await queue.markComplete(completedId, {});

      const activeMessages = await queue.listMessages('active');
      const completedMessages = await queue.listMessages('completed');

      expect(activeMessages.length).toBe(1);
      expect(activeMessages[0].id).toBe(activeId);
      expect(completedMessages.length).toBe(1);
      expect(completedMessages[0].id).toBe(completedId);
    });

    test('should get queue metrics', async () => {
      // Create test messages
      await queue.sendMessage({ agent: 'test1', type: 'test' });
      await queue.sendMessage({ agent: 'test2', type: 'test' });
      
      const completedId = await queue.sendMessage({ agent: 'test3', type: 'test' });
      await queue.markComplete(completedId, {});

      const metrics = await queue.getMetrics();
      expect(metrics.queueDepth).toBe(2);
      expect(metrics.completedCount).toBe(1);
      expect(metrics.failedCount).toBe(0);
      expect(metrics.avgProcessingTime).toBeGreaterThanOrEqual(0);
    });

    test('should cleanup old messages', async () => {
      // Create an old message
      const oldMessageId = await queue.sendMessage({ agent: 'test', type: 'old' });
      const message = await queue.getMessage(oldMessageId);
      
      // Manually set timestamp to old value
      message.timestamp = Date.now() - (queue.ttl + 1000);
      const messagePath = path.join(tempDir, 'queue', 'active', `${oldMessageId}.json`);
      const fs = require('fs').promises;
      await fs.writeFile(messagePath, JSON.stringify(message));

      // Create a new message
      await queue.sendMessage({ agent: 'test', type: 'new' });

      // Run cleanup
      await queue.cleanup();

      // Check that old message is gone
      await expect(queue.getMessage(oldMessageId)).rejects.toThrow();
      
      // New message should still exist
      const activeMessages = await queue.listMessages('active');
      expect(activeMessages.length).toBe(1);
      expect(activeMessages[0].type).toBe('new');
    });
  });

  describe('Error Handling', () => {
    test('should throw error for non-existent message', async () => {
      await expect(queue.getMessage('non-existent-id')).rejects.toThrow('Message non-existent-id not found');
    });

    test('should handle concurrent operations', async () => {
      const operations = [];
      
      // Send multiple messages concurrently
      for (let i = 0; i < 10; i++) {
        operations.push(queue.sendMessage({
          agent: `agent-${i}`,
          type: 'concurrent',
          index: i
        }));
      }

      const messageIds = await Promise.all(operations);
      expect(messageIds.length).toBe(10);
      expect(new Set(messageIds).size).toBe(10); // All IDs should be unique
    });
  });
});