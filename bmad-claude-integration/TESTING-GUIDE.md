# BMAD Subagent Testing Guide

## Overview
This guide walks you through testing the BMAD-METHOD Claude Code integration with subagents. The implementation uses a message queue system for agent communication and elicitation broker for managing multi-step conversations.

## Testing Architecture

### Key Components to Test
1. **Agent Routing**: Correct agent selection based on user requests
2. **Elicitation Flow**: Multi-step question/answer sessions
3. **Session Management**: Creating, switching, and maintaining sessions
4. **Context Preservation**: Information flow between agents
5. **Message Queue**: Inter-agent communication
6. **Error Handling**: Graceful recovery from errors

## Testing Approaches

### 1. Unit Testing
Tests individual components in isolation.

```bash
# Run unit tests
npm test

# Run specific test suite
npm test -- elicitation-broker.test.js
npm test -- message-queue.test.js
```

Key unit test areas:
- ElicitationBroker session creation/management
- Message queue publish/subscribe
- Session state persistence
- Agent routing logic

### 2. Integration Testing
Tests how components work together.

```bash
# Run integration tests
npm run test:integration

# Run specific scenario
node tests/harness/claude-interactive-test.js scenario "PM Agent Routing"
```

### 3. Interactive Testing
Manual testing through Claude Code CLI.

```bash
# Start Claude in test mode
cd bmad-claude-integration
BMAD_TEST_MODE=true claude -p .

# Test basic agent routing
> Create user stories for a login feature

# Test elicitation responses
> bmad-respond: OAuth with Google and GitHub

# Test session management
> /bmad-sessions
> /switch 1
```

### 4. Performance Testing
Measures latency and throughput.

```bash
# Run performance benchmarks
node tests/performance/benchmark.js

# View previous benchmarks
cat benchmark-*.json
```

## Test Scenarios

### Scenario 1: Basic PM Agent Flow
```bash
# User request
"Create user stories for an e-commerce checkout flow"

# Expected behavior:
1. Routes to PM agent
2. Asks clarifying questions:
   - Payment methods?
   - Guest checkout?
   - Saved addresses?
3. Generates user stories based on responses
```

### Scenario 2: Multi-Agent Workflow
```bash
# Initial request
"Design a microservices architecture for our platform"

# Follow-up
"Now create stories for implementing the API gateway"

# Expected behavior:
1. First request → Architect agent
2. Creates architecture design
3. Second request → PM agent
4. PM has context from architect's design
```

### Scenario 3: Direct Agent Invocation
```bash
# Direct command
"/bmad-architect Review this API design and suggest improvements"

# Expected behavior:
1. Bypasses routing, goes directly to architect
2. Analyzes provided content
3. Provides architectural feedback
```

### Scenario 4: Session Management
```bash
# Create multiple sessions
"Help me plan next sprint" 
"In parallel, design the payment service"

# List sessions
"/bmad-sessions"

# Switch between them
"/switch 2"
```

## Testing with Subagents

### Setting Up Test Environment
```bash
# 1. Install dependencies
npm install

# 2. Create test workspace
mkdir test-workspace
cd test-workspace

# 3. Create test files
echo "# Test Requirements" > requirements.md
echo '{"name": "test-project"}' > package.json
```

### Running Subagent Tests
The system uses Claude Code's subagent capability to invoke specialized agents:

```javascript
// Example test that triggers subagent
const testSubagentRouting = async () => {
  // This will trigger PM subagent
  const response = await claude.ask("Create user stories for login");
  
  // Verify subagent was invoked
  assert(response.includes("PM Agent"));
  assert(response.includes("elicitation"));
};
```

### Monitoring Subagent Communication
```bash
# Watch message queue
tail -f ~/.bmad/queue/messages/*.json

# Monitor elicitation sessions
ls ~/.bmad/queue/elicitation/

# View session details
cat ~/.bmad/queue/elicitation/elicit-*/session.json
```

## Automated Test Harness

### Running Full Test Suite
```bash
# Run all scenarios
node tests/harness/claude-interactive-test.js run

# Expected output:
# ✅ Basic PM Agent Routing
# ✅ Multi-Agent Workflow  
# ✅ Direct Agent Invocation
# ✅ Concurrent Sessions
# ✅ Error Recovery
```

### Adding New Test Scenarios
Edit `tests/harness/claude-interactive-test.js`:

```javascript
scenarios.push({
  name: 'Your Test Name',
  commands: [
    'Initial user command',
    'bmad-respond: Response to elicitation',
    'Follow-up command'
  ],
  expectations: {
    agentRouting: 'expected-agent',
    elicitationCount: 2,
    outputContains: ['expected', 'phrases']
  }
});
```

## Golden Test Validation

### Generating Golden Tests
```bash
# Generate expected outputs
node tests/harness/generate-golden-tests.js

# Creates JSON files in tests/golden/
```

### Validating Against Golden Tests
```bash
# Run validation
npm run test:golden

# Compares actual outputs to expected
```

## Debugging Tips

### 1. Enable Debug Logging
```bash
export BMAD_DEBUG=true
claude -p .
```

### 2. Inspect Message Queue
```bash
# View pending messages
cat ~/.bmad/queue/messages/pending/*.json

# View processed messages  
cat ~/.bmad/queue/messages/processed/*.json
```

### 3. Check Session State
```bash
# List active sessions
node core/elicitation-broker.js active

# View session details
node core/elicitation-broker.js summary <session-id>
```

### 4. Test Individual Components
```bash
# Test message queue
node core/message-queue.js test

# Test elicitation broker
node core/elicitation-broker.js create pm '{"test": true}'
```

## Success Metrics

Your implementation should achieve:
- **Agent Routing Accuracy**: ≥95%
- **Elicitation Completion**: 100%
- **Session Persistence**: 100%
- **Error Recovery**: 100%
- **Response Time**: <2s per interaction

## Common Issues and Solutions

### Issue: Agent not responding
```bash
# Check if message queue is initialized
ls ~/.bmad/queue/

# Restart Claude Code
pkill claude
claude -p .
```

### Issue: Session lost
```bash
# Check session files
ls ~/.bmad/queue/elicitation/

# Verify session format
cat ~/.bmad/queue/elicitation/*/session.json | jq .
```

### Issue: Slow responses
```bash
# Run performance benchmark
node tests/performance/benchmark.js

# Check message queue size
find ~/.bmad/queue -name "*.json" | wc -l
```

## Continuous Testing

### Pre-commit Tests
```bash
# Add to git hooks
npm test && npm run lint
```

### CI/CD Integration
```yaml
# .github/workflows/test.yml
- name: Run BMAD Tests
  run: |
    npm test
    npm run test:integration
    npm run test:golden
```

## Next Steps

1. Run through all test scenarios manually
2. Execute automated test suite
3. Monitor performance benchmarks
4. Add custom test cases for your use cases
5. Set up continuous testing in your workflow

Remember: The goal is to ensure reliable, fast, and accurate agent routing and elicitation flows that enhance the Claude Code experience.