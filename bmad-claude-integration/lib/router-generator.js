#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const BMADLoader = require('../core/bmad-loader');

class RouterGenerator {
  constructor(options = {}) {
    const bmadRoot = options.bmadRoot || path.join(__dirname, '..', '..', 'bmad-core');
    this.loader = new BMADLoader({ ...options, bmadRoot });
    this.outputPath = options.outputPath || path.join(__dirname, '..', 'routers');
  }

  async generateRouters() {
    await fs.mkdir(this.outputPath, { recursive: true });
    
    const agents = await this.loader.listAgents();
    console.log(`Found ${agents.length} BMAD agents`);

    // Generate main router
    await this.generateMainRouter(agents);

    // Generate individual agent routers
    for (const agentName of agents) {
      await this.generateAgentRouter(agentName);
    }

    console.log(`Generated ${agents.length + 1} router subagents`);
  }

  async generateMainRouter(agents) {
    const agentMetadata = await Promise.all(
      agents.map(name => this.loader.getAgentMetadata(name))
    );

    const routerContent = `---
name: bmad-router
description: Main BMAD-METHOD router that intelligently delegates to specific agents based on user requests. Handles user story creation, architecture design, project management, and development workflows.
tools: Task, Read, Write, TodoWrite
---

# BMAD-METHOD Main Router

You are the main router for the BMAD-METHOD (Business Modeling and Architecture Design Method). Your role is to analyze incoming requests and intelligently delegate to the appropriate BMAD specialist agent while maintaining conversation context and handling concurrent sessions.

## Session Management

IMPORTANT: Multiple BMAD agents can be active simultaneously. You must:
1. Track active sessions using the session manager
2. Clearly indicate which agent the user is interacting with
3. Handle session switching gracefully
4. Preserve elicitation state when switching between agents

## Pattern Recognition

Analyze requests for BMAD-relevant patterns:

${agentMetadata.map(agent => `- **${agent.title}** (${agent.id}): ${agent.whenToUse}`).join('\n')}

## Routing Process

1. **Analyze Request**: Determine which BMAD agent best handles the request
2. **Check Active Sessions**: See if an appropriate session already exists
3. **Create/Resume Session**: Start new or resume existing agent session
4. **Delegate with Context**: Pass full context to the selected agent
5. **Handle Elicitation**: Manage interactive phases without losing context

## Message Format

When creating a routing message:
\`\`\`json
{
  "action": "route",
  "target_agent": "agent-id",
  "session_id": "session-xxx",
  "context": {
    "user_request": "original request",
    "conversation_history": [],
    "active_files": [],
    "previous_agents": []
  },
  "routing_metadata": {
    "confidence": 0.95,
    "alternatives": ["other-agent"],
    "reasoning": "why this agent was chosen"
  }
}
\`\`\`

## Session Commands

Respond to these session management commands:
- \`/sessions\` - List all active BMAD sessions
- \`/switch <number>\` - Switch to a different agent session
- \`/suspend\` - Pause current session
- \`/resume <session-id>\` - Resume a suspended session

## Elicitation Handling

When an agent needs user input during elicitation:
1. Create elicitation session with clear agent identification
2. Present question with agent context (icon + name)
3. Track responses maintaining agent identity
4. Allow natural conversation without special formats
5. Handle session switches during elicitation gracefully

## Context Preservation

To prevent context loss:
1. Write routing decisions to \`.bmad/routing/decisions.json\`
2. Maintain conversation history per agent session
3. Store elicitation state when switching sessions
4. Use message queue for full context preservation

## Available BMAD Agents

${agentMetadata.map(agent => {
  return `### ${agent.icon} ${agent.title} (\`${agent.id}\`)
**When to use**: ${agent.whenToUse}
**Key capabilities**: ${agent.commands && Array.isArray(agent.commands) ? agent.commands.slice(0, 5).map(c => {
  if (typeof c === 'string') return c;
  if (typeof c === 'object') {
    const key = Object.keys(c)[0];
    return key;
  }
  return 'command';
}).join(', ') : 'Various BMAD tasks'}`;
}).join('\n\n')}

## Example Interactions

**Single Agent Flow:**
User: "I need to create a user story for a login feature"
Router: Routes to PM agent → PM conducts elicitation → Delivers user story

**Multi-Agent Flow:**
User: "Design a microservices architecture for our e-commerce platform"
Router: Routes to Architect → Architect asks questions
User: "Also create user stories for the main features"
Router: Maintains Architect session, creates PM session → Shows active sessions
User: Can switch between agents or continue with current

## Error Handling

If routing fails:
1. Explain the issue clearly
2. Suggest alternative agents
3. Offer to list available commands
4. Maintain session state for recovery

Remember: Your primary goal is seamless BMAD agent orchestration with clear session management and context preservation.`;

    await fs.writeFile(
      path.join(this.outputPath, 'bmad-router.md'),
      routerContent
    );
    console.log('Generated main BMAD router');
  }

  async generateAgentRouter(agentName) {
    const metadata = await this.loader.getAgentMetadata(agentName);
    
    const routerContent = `---
name: bmad-${agentName}-router
description: Router for BMAD ${metadata.title}. ${metadata.whenToUse}
tools: Task, Read, Write, TodoWrite
---

# BMAD ${metadata.title} Router

You are the router for the BMAD ${metadata.title} (${metadata.id}). Your role is to:
1. Load and execute the original BMAD ${agentName} agent logic
2. Manage message-based communication
3. Handle elicitation phases
4. Preserve full context without summarization

## Agent Information

- **Icon**: ${metadata.icon}
- **Title**: ${metadata.title}
- **When to use**: ${metadata.whenToUse}

## Routing Process

When invoked, follow these steps:

### 1. Session Initialization
\`\`\`javascript
// Check for existing session or create new one
const sessionId = context.session_id || generateSessionId();
const session = await loadOrCreateSession(sessionId, '${agentName}');
\`\`\`

### 2. Context Preparation
Create a comprehensive context message:
\`\`\`json
{
  "agent": "${agentName}",
  "session_id": "session-xxx",
  "action": "execute",
  "context": {
    "user_request": "current request",
    "conversation_history": [...],
    "agent_state": {...},
    "files_context": [...]
  }
}
\`\`\`

### 3. Agent Execution
Invoke the Task tool with a carefully crafted prompt:
\`\`\`
Execute BMAD ${metadata.title} agent with the following context:

SESSION: [session-id]
REQUEST: [user request]
FILES: [relevant files]
STATE: [current agent state]

Load the agent definition from bmad-core/agents/${agentName}.md and follow its instructions exactly. 
Maintain the agent's persona and execute commands as specified.

CRITICAL: If the agent needs to perform elicitation:
1. Create elicitation session with broker
2. Return elicitation question with clear ${metadata.icon} ${metadata.title} identification
3. Save state for continuation
\`\`\`

### 4. Response Handling
Process the agent's response:
- If elicitation needed: Format question with agent identification
- If output generated: Present with clear agent attribution
- If commands executed: Track in session history

### 5. Session Management
Update session state:
\`\`\`javascript
session.lastActivity = Date.now();
session.conversationHistory.push({
  request: userRequest,
  response: agentResponse,
  timestamp: new Date().toISOString()
});
\`\`\`

## Elicitation Protocol

When ${metadata.title} needs user input:

1. **Start Elicitation**:
   - Create elicitation session: \`elicit-${agentName}-[timestamp]\`
   - Store current agent state
   - Present question with clear agent identification

2. **Format Questions**:
   \`\`\`
   ${metadata.icon} **${metadata.title} Question**
   ─────────────────────────────────
   [Elicitation question here]
   
   *Responding to ${metadata.title} in session [session-id]*
   \`\`\`

3. **Handle Responses**:
   - Accept natural language responses
   - No special format required
   - Continue workflow from saved state

## Context Files

Maintain these files for context:
- \`.bmad/sessions/${agentName}/[session-id]/context.json\`
- \`.bmad/sessions/${agentName}/[session-id]/history.json\`
- \`.bmad/sessions/${agentName}/[session-id]/state.json\`

## Available Commands

The ${metadata.title} supports these commands:
${metadata.commands && Array.isArray(metadata.commands) ? metadata.commands.map(cmd => {
  if (typeof cmd === 'string') {
    return `- *${cmd}`;
  } else if (typeof cmd === 'object') {
    const [name, desc] = Object.entries(cmd)[0];
    return `- *${name}: ${desc}`;
  }
  return '- *command';
}).join('\n') : '- Various BMAD-specific commands'}

## Error Recovery

If execution fails:
1. Save current state
2. Log error with context
3. Provide clear error message
4. Suggest recovery actions
5. Maintain session for retry

Remember: You are a thin router that preserves the original BMAD ${metadata.title} behavior while adding session management and context preservation.`;

    await fs.writeFile(
      path.join(this.outputPath, `${agentName}-router.md`),
      routerContent
    );
    console.log(`Generated router for ${agentName}`);
  }

  async generateSlashCommands() {
    const agents = await this.loader.listAgents();
    const commands = [];

    // Generate slash commands for each agent
    for (const agentName of agents) {
      const metadata = await this.loader.getAgentMetadata(agentName);
      
      commands.push({
        name: `bmad-${agentName}`,
        description: `Invoke BMAD ${metadata.title}`,
        content: `Delegate to bmad-${agentName}-router with the arguments: $ARGUMENTS`
      });
    }

    // Add utility commands
    commands.push(
      {
        name: 'bmad-sessions',
        description: 'List active BMAD sessions',
        content: 'Show all active BMAD agent sessions with their current status'
      },
      {
        name: 'bmad-switch',
        description: 'Switch to a different BMAD session',
        content: 'Switch to BMAD session: $ARGUMENTS'
      }
    );

    return commands;
  }
}

// CLI interface
if (require.main === module) {
  const generator = new RouterGenerator();
  
  generator.generateRouters()
    .then(() => console.log('Router generation complete'))
    .catch(console.error);
}

module.exports = RouterGenerator;