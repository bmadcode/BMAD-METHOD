#!/usr/bin/env node

const BMADMessageQueue = require('../../core/message-queue');
const ElicitationBroker = require('../../core/elicitation-broker');
const SessionManager = require('../../core/session-manager');
const BMADLoader = require('../../core/bmad-loader');
const RouterGenerator = require('../../lib/router-generator');

class BMADPerformanceBenchmark {
  constructor() {
    this.results = {
      messageQueue: {},
      sessionManagement: {},
      agentLoading: {},
      elicitation: {},
      endToEnd: {}
    };
  }

  async setup() {
    this.queue = new BMADMessageQueue({ basePath: './benchmark-temp' });
    this.broker = new ElicitationBroker(this.queue);
    this.sessionManager = new SessionManager(this.queue, this.broker);
    this.loader = new BMADLoader();
    
    await this.queue.initialize();
    await this.sessionManager.initialize();
  }

  async cleanup() {
    const fs = require('fs').promises;
    await fs.rm('./benchmark-temp', { recursive: true, force: true });
  }

  // Benchmark message queue operations
  async benchmarkMessageQueue() {
    console.log('\n📊 Benchmarking Message Queue...');
    
    // Test 1: Message send/receive speed
    const sendReceiveTimes = [];
    for (let i = 0; i < 100; i++) {
      const start = process.hrtime.bigint();
      const messageId = await this.queue.sendMessage({
        agent: 'test',
        type: 'benchmark',
        data: { index: i }
      });
      await this.queue.getMessage(messageId);
      const end = process.hrtime.bigint();
      sendReceiveTimes.push(Number(end - start) / 1e6); // Convert to ms
    }

    // Test 2: Concurrent message handling
    const concurrentStart = process.hrtime.bigint();
    const promises = [];
    for (let i = 0; i < 50; i++) {
      promises.push(this.queue.sendMessage({
        agent: `agent-${i % 5}`,
        type: 'concurrent',
        data: { batch: i }
      }));
    }
    const messageIds = await Promise.all(promises);
    const concurrentEnd = process.hrtime.bigint();

    // Test 3: Queue depth handling
    const depths = [];
    for (let depth = 10; depth <= 100; depth += 10) {
      const start = process.hrtime.bigint();
      await this.queue.getQueueDepth();
      const end = process.hrtime.bigint();
      depths.push({
        depth,
        time: Number(end - start) / 1e6
      });
    }

    this.results.messageQueue = {
      avgSendReceive: this.average(sendReceiveTimes),
      minSendReceive: Math.min(...sendReceiveTimes),
      maxSendReceive: Math.max(...sendReceiveTimes),
      concurrentMessages: 50,
      concurrentTime: Number(concurrentEnd - concurrentStart) / 1e6,
      queueDepthPerformance: depths
    };

    console.log('✅ Message Queue benchmark complete');
  }

  // Benchmark session management
  async benchmarkSessionManagement() {
    console.log('\n📊 Benchmarking Session Management...');
    
    const sessionTimes = [];
    const sessions = [];

    // Test 1: Session creation speed
    for (let i = 0; i < 20; i++) {
      const start = process.hrtime.bigint();
      const session = await this.sessionManager.createAgentSession(`agent-${i % 5}`, {
        test: true,
        index: i
      });
      const end = process.hrtime.bigint();
      sessionTimes.push(Number(end - start) / 1e6);
      sessions.push(session);
    }

    // Test 2: Session switching
    const switchTimes = [];
    for (let i = 0; i < 50; i++) {
      const targetSession = sessions[i % sessions.length];
      const start = process.hrtime.bigint();
      await this.sessionManager.switchSession(targetSession.id);
      const end = process.hrtime.bigint();
      switchTimes.push(Number(end - start) / 1e6);
    }

    // Test 3: Concurrent session operations
    const concurrentStart = process.hrtime.bigint();
    const concurrentOps = [];
    for (let i = 0; i < 10; i++) {
      concurrentOps.push(
        this.sessionManager.addToConversation(sessions[i].id, {
          type: 'test',
          content: `Message ${i}`
        })
      );
    }
    await Promise.all(concurrentOps);
    const concurrentEnd = process.hrtime.bigint();

    this.results.sessionManagement = {
      avgCreation: this.average(sessionTimes),
      avgSwitching: this.average(switchTimes),
      minSwitching: Math.min(...switchTimes),
      maxSwitching: Math.max(...switchTimes),
      concurrentOpsTime: Number(concurrentEnd - concurrentStart) / 1e6,
      totalSessions: sessions.length
    };

    console.log('✅ Session Management benchmark complete');
  }

  // Benchmark agent loading
  async benchmarkAgentLoading() {
    console.log('\n📊 Benchmarking Agent Loading...');
    
    const agents = ['pm', 'architect', 'dev', 'qa', 'sm'];
    const loadTimes = {};
    
    // Test 1: Cold load times
    for (const agent of agents) {
      const start = process.hrtime.bigint();
      await this.loader.loadAgent(agent);
      const end = process.hrtime.bigint();
      loadTimes[agent] = Number(end - start) / 1e6;
    }

    // Clear cache for cold load test
    this.loader.clearCache();

    // Test 2: Cached load times
    const cachedTimes = {};
    // First load to populate cache
    for (const agent of agents) {
      await this.loader.loadAgent(agent);
    }
    // Measure cached loads
    for (const agent of agents) {
      const start = process.hrtime.bigint();
      await this.loader.loadAgent(agent);
      const end = process.hrtime.bigint();
      cachedTimes[agent] = Number(end - start) / 1e6;
    }

    // Test 3: Router generation
    const routerGen = new RouterGenerator();
    const genStart = process.hrtime.bigint();
    await routerGen.generateRouters();
    const genEnd = process.hrtime.bigint();

    this.results.agentLoading = {
      coldLoadTimes: loadTimes,
      cachedLoadTimes: cachedTimes,
      avgColdLoad: this.average(Object.values(loadTimes)),
      avgCachedLoad: this.average(Object.values(cachedTimes)),
      routerGeneration: Number(genEnd - genStart) / 1e6
    };

    console.log('✅ Agent Loading benchmark complete');
  }

  // Benchmark elicitation handling
  async benchmarkElicitation() {
    console.log('\n📊 Benchmarking Elicitation...');
    
    const elicitationTimes = [];
    const sessions = [];

    // Test 1: Elicitation session creation
    for (let i = 0; i < 10; i++) {
      const start = process.hrtime.bigint();
      const session = await this.broker.createSession(`agent-${i % 3}`, {
        test: true
      });
      const end = process.hrtime.bigint();
      elicitationTimes.push(Number(end - start) / 1e6);
      sessions.push(session);
    }

    // Test 2: Question/Response handling
    const qaTimes = [];
    for (const session of sessions) {
      for (let i = 0; i < 5; i++) {
        const start = process.hrtime.bigint();
        await this.broker.addQuestion(session.id, `Question ${i}?`);
        await this.broker.addResponse(session.id, `Response ${i}`);
        const end = process.hrtime.bigint();
        qaTimes.push(Number(end - start) / 1e6);
      }
    }

    // Test 3: Session completion
    const completionTimes = [];
    for (const session of sessions) {
      const start = process.hrtime.bigint();
      await this.broker.completeSession(session.id, { result: 'test' });
      const end = process.hrtime.bigint();
      completionTimes.push(Number(end - start) / 1e6);
    }

    this.results.elicitation = {
      avgSessionCreation: this.average(elicitationTimes),
      avgQuestionResponse: this.average(qaTimes),
      avgCompletion: this.average(completionTimes),
      totalQAPairs: qaTimes.length
    };

    console.log('✅ Elicitation benchmark complete');
  }

  // End-to-end workflow benchmark
  async benchmarkEndToEnd() {
    console.log('\n📊 Benchmarking End-to-End Workflows...');
    
    const workflows = [];

    // Simulate complete workflow
    for (let i = 0; i < 5; i++) {
      const workflowStart = process.hrtime.bigint();
      
      // 1. Create message
      const messageId = await this.queue.sendMessage({
        agent: 'pm',
        type: 'create-story',
        data: { request: 'Login feature' }
      });

      // 2. Create session
      const session = await this.sessionManager.createAgentSession('pm', {
        messageId
      });

      // 3. Start elicitation
      const elicitSession = await this.broker.createSession('pm', {
        parentSession: session.id
      });

      // 4. Q&A cycle
      await this.broker.addQuestion(elicitSession.id, 'What type of login?');
      await this.broker.addResponse(elicitSession.id, 'OAuth and email');
      await this.broker.addQuestion(elicitSession.id, 'Security requirements?');
      await this.broker.addResponse(elicitSession.id, '2FA required');

      // 5. Complete elicitation
      await this.broker.completeSession(elicitSession.id);

      // 6. Mark message complete
      await this.queue.markComplete(messageId, {
        story: 'Generated story content'
      });

      const workflowEnd = process.hrtime.bigint();
      workflows.push(Number(workflowEnd - workflowStart) / 1e6);
    }

    this.results.endToEnd = {
      avgWorkflow: this.average(workflows),
      minWorkflow: Math.min(...workflows),
      maxWorkflow: Math.max(...workflows),
      workflows: workflows.length
    };

    console.log('✅ End-to-End benchmark complete');
  }

  average(numbers) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  async runBenchmarks() {
    console.log('🚀 Starting BMAD Performance Benchmarks...\n');
    
    await this.setup();

    try {
      await this.benchmarkMessageQueue();
      await this.benchmarkSessionManagement();
      await this.benchmarkAgentLoading();
      await this.benchmarkElicitation();
      await this.benchmarkEndToEnd();
      
      this.generateReport();
      await this.saveResults();
      
    } finally {
      await this.cleanup();
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📈 Performance Benchmark Results');
    console.log('='.repeat(60) + '\n');

    // Message Queue
    console.log('📬 Message Queue Performance:');
    console.log(`  • Avg Send/Receive: ${this.results.messageQueue.avgSendReceive.toFixed(2)}ms`);
    console.log(`  • Min/Max: ${this.results.messageQueue.minSendReceive.toFixed(2)}ms / ${this.results.messageQueue.maxSendReceive.toFixed(2)}ms`);
    console.log(`  • 50 Concurrent Messages: ${this.results.messageQueue.concurrentTime.toFixed(2)}ms`);

    // Session Management
    console.log('\n🔄 Session Management:');
    console.log(`  • Avg Session Creation: ${this.results.sessionManagement.avgCreation.toFixed(2)}ms`);
    console.log(`  • Avg Session Switch: ${this.results.sessionManagement.avgSwitching.toFixed(2)}ms`);
    console.log(`  • 10 Concurrent Ops: ${this.results.sessionManagement.concurrentOpsTime.toFixed(2)}ms`);

    // Agent Loading
    console.log('\n🤖 Agent Loading:');
    console.log(`  • Avg Cold Load: ${this.results.agentLoading.avgColdLoad.toFixed(2)}ms`);
    console.log(`  • Avg Cached Load: ${this.results.agentLoading.avgCachedLoad.toFixed(2)}ms`);
    console.log(`  • Router Generation: ${this.results.agentLoading.routerGeneration.toFixed(2)}ms`);

    // Elicitation
    console.log('\n💬 Elicitation Performance:');
    console.log(`  • Avg Session Creation: ${this.results.elicitation.avgSessionCreation.toFixed(2)}ms`);
    console.log(`  • Avg Q&A Pair: ${this.results.elicitation.avgQuestionResponse.toFixed(2)}ms`);

    // End-to-End
    console.log('\n🔗 End-to-End Workflows:');
    console.log(`  • Avg Complete Workflow: ${this.results.endToEnd.avgWorkflow.toFixed(2)}ms`);
    console.log(`  • Min/Max: ${this.results.endToEnd.minWorkflow.toFixed(2)}ms / ${this.results.endToEnd.maxWorkflow.toFixed(2)}ms`);

    // Performance evaluation
    console.log('\n' + '='.repeat(60));
    console.log('⚡ Performance Evaluation');
    console.log('='.repeat(60) + '\n');

    const evaluation = this.evaluatePerformance();
    for (const [metric, result] of Object.entries(evaluation)) {
      const status = result.pass ? '✅' : '❌';
      console.log(`${status} ${metric}: ${result.actual}ms (target: <${result.target}ms)`);
    }
  }

  evaluatePerformance() {
    return {
      'Message Send/Receive': {
        actual: this.results.messageQueue.avgSendReceive.toFixed(1),
        target: 10,
        pass: this.results.messageQueue.avgSendReceive < 10
      },
      'Session Switching': {
        actual: this.results.sessionManagement.avgSwitching.toFixed(1),
        target: 5,
        pass: this.results.sessionManagement.avgSwitching < 5
      },
      'Agent Cold Load': {
        actual: this.results.agentLoading.avgColdLoad.toFixed(1),
        target: 50,
        pass: this.results.agentLoading.avgColdLoad < 50
      },
      'Complete Workflow': {
        actual: this.results.endToEnd.avgWorkflow.toFixed(1),
        target: 200,
        pass: this.results.endToEnd.avgWorkflow < 200
      }
    };
  }

  async saveResults() {
    const fs = require('fs').promises;
    const timestamp = new Date().toISOString();
    const filename = `benchmark-${timestamp.replace(/[:.]/g, '-')}.json`;
    
    await fs.writeFile(filename, JSON.stringify({
      timestamp,
      results: this.results,
      evaluation: this.evaluatePerformance(),
      system: {
        platform: process.platform,
        nodeVersion: process.version,
        memory: process.memoryUsage()
      }
    }, null, 2));
    
    console.log(`\n📊 Detailed results saved to: ${filename}`);
  }
}

// Run benchmarks
if (require.main === module) {
  const benchmark = new BMADPerformanceBenchmark();
  benchmark.runBenchmarks()
    .then(() => {
      console.log('\n✅ Benchmarks completed successfully!');
      process.exit(0);
    })
    .catch(err => {
      console.error('\n❌ Benchmark failed:', err);
      process.exit(1);
    });
}

module.exports = BMADPerformanceBenchmark;