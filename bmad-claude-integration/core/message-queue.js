#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class BMADMessageQueue {
  constructor(options = {}) {
    this.basePath = options.basePath || path.join(process.env.HOME, '.bmad');
    this.queuePath = path.join(this.basePath, 'queue');
    this.ttl = options.ttl || 3600000; // 1 hour default TTL
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
  }

  async initialize() {
    const dirs = [
      this.queuePath,
      path.join(this.queuePath, 'active'),
      path.join(this.queuePath, 'completed'),
      path.join(this.queuePath, 'failed'),
      path.join(this.queuePath, 'elicitation')
    ];

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  generateId() {
    return `msg-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  }

  calculateChecksum(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  async sendMessage(message) {
    const enhancedMessage = {
      ...message,
      id: this.generateId(),
      timestamp: Date.now(),
      version: 1,
      status: 'pending',
      retries: 0,
      checksum: this.calculateChecksum(message)
    };

    const messagePath = path.join(this.queuePath, 'active', `${enhancedMessage.id}.json`);
    await fs.writeFile(messagePath, JSON.stringify(enhancedMessage, null, 2));

    return enhancedMessage.id;
  }

  async getMessage(messageId) {
    const messagePath = path.join(this.queuePath, 'active', `${messageId}.json`);
    try {
      const content = await fs.readFile(messagePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      // Check completed and failed directories
      for (const dir of ['completed', 'failed']) {
        const altPath = path.join(this.queuePath, dir, `${messageId}.json`);
        try {
          const content = await fs.readFile(altPath, 'utf8');
          return JSON.parse(content);
        } catch (e) {
          // Continue to next directory
        }
      }
      throw new Error(`Message ${messageId} not found`);
    }
  }

  async updateMessage(messageId, updates) {
    const message = await this.getMessage(messageId);
    const updatedMessage = {
      ...message,
      ...updates,
      lastModified: Date.now(),
      version: message.version + 1
    };

    const messagePath = path.join(this.queuePath, 'active', `${messageId}.json`);
    await fs.writeFile(messagePath, JSON.stringify(updatedMessage, null, 2));
    return updatedMessage;
  }

  async markComplete(messageId, result) {
    const message = await this.getMessage(messageId);
    message.status = 'completed';
    message.completedAt = Date.now();
    message.result = result;

    const oldPath = path.join(this.queuePath, 'active', `${messageId}.json`);
    const newPath = path.join(this.queuePath, 'completed', `${messageId}.json`);
    
    await fs.writeFile(newPath, JSON.stringify(message, null, 2));
    await fs.unlink(oldPath);
  }

  async markFailed(messageId, error) {
    const message = await this.getMessage(messageId);
    message.status = 'failed';
    message.failedAt = Date.now();
    message.error = error.message || error;

    const oldPath = path.join(this.queuePath, 'active', `${messageId}.json`);
    const newPath = path.join(this.queuePath, 'failed', `${messageId}.json`);
    
    await fs.writeFile(newPath, JSON.stringify(message, null, 2));
    await fs.unlink(oldPath);
  }

  async retry(messageId) {
    const message = await this.getMessage(messageId);
    message.retries++;
    message.lastRetry = Date.now();
    message.status = 'retrying';

    await this.updateMessage(messageId, message);
    
    // Wait before retry
    await new Promise(resolve => setTimeout(resolve, this.retryDelay * message.retries));
    
    return message;
  }

  async listMessages(status = 'active') {
    const dir = path.join(this.queuePath, status);
    try {
      const files = await fs.readdir(dir);
      const messages = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const content = await fs.readFile(path.join(dir, file), 'utf8');
          messages.push(JSON.parse(content));
        }
      }
      
      return messages.sort((a, b) => a.timestamp - b.timestamp);
    } catch (error) {
      return [];
    }
  }

  async cleanup() {
    const now = Date.now();
    const directories = ['active', 'completed', 'failed'];
    
    for (const dir of directories) {
      const messages = await this.listMessages(dir);
      
      for (const message of messages) {
        if (now - message.timestamp > this.ttl) {
          const filePath = path.join(this.queuePath, dir, `${message.id}.json`);
          await fs.unlink(filePath);
        }
      }
    }
  }

  async getQueueDepth() {
    const active = await this.listMessages('active');
    return active.length;
  }

  async getMetrics() {
    const [active, completed, failed] = await Promise.all([
      this.listMessages('active'),
      this.listMessages('completed'),
      this.listMessages('failed')
    ]);

    const completedTimes = completed
      .filter(m => m.completedAt && m.timestamp)
      .map(m => m.completedAt - m.timestamp);

    const avgProcessingTime = completedTimes.length > 0
      ? completedTimes.reduce((a, b) => a + b, 0) / completedTimes.length
      : 0;

    return {
      queueDepth: active.length,
      completedCount: completed.length,
      failedCount: failed.length,
      avgProcessingTime: Math.round(avgProcessingTime),
      oldestMessage: active[0]?.timestamp || null,
      retryingCount: active.filter(m => m.status === 'retrying').length
    };
  }
}

// CLI interface for testing
if (require.main === module) {
  const queue = new BMADMessageQueue();
  
  const commands = {
    async init() {
      await queue.initialize();
      console.log('Message queue initialized');
    },
    
    async send(agent, type, data) {
      const messageId = await queue.sendMessage({
        agent,
        type,
        data: JSON.parse(data || '{}')
      });
      console.log(`Message sent: ${messageId}`);
    },
    
    async get(messageId) {
      const message = await queue.getMessage(messageId);
      console.log(JSON.stringify(message, null, 2));
    },
    
    async list(status = 'active') {
      const messages = await queue.listMessages(status);
      console.log(`${status} messages (${messages.length}):`);
      messages.forEach(m => {
        console.log(`  ${m.id} - ${m.agent} - ${m.status}`);
      });
    },
    
    async metrics() {
      const metrics = await queue.getMetrics();
      console.log('Queue Metrics:');
      console.log(JSON.stringify(metrics, null, 2));
    },
    
    async cleanup() {
      await queue.cleanup();
      console.log('Cleanup completed');
    }
  };

  const [,, command, ...args] = process.argv;
  
  if (commands[command]) {
    commands[command](...args).catch(console.error);
  } else {
    console.log('Usage: message-queue.js <command> [args]');
    console.log('Commands:', Object.keys(commands).join(', '));
  }
}

module.exports = BMADMessageQueue;