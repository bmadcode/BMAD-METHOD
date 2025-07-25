# BMAD-METHOD Claude Code Subagent Integration Approaches

## Overview
This document presents three different approaches for integrating BMAD-METHOD with Claude Code's subagent feature, addressing key requirements including elicitation handling, context preservation, and minimal repo invasion.

## Key Requirements Summary
1. Natural automatic agent calling and direct user invocation
2. Handle elicitation phases for BMAD agents
3. Preserve context without summarization issues  
4. Minimal invasion of parent repo
5. Installer-driven deployment
6. Robust testing with AI-as-a-judge

## Approach 1: Hook-Based Orchestration with Context Files

### Architecture
- Use Claude Code hooks to intercept and manage BMAD agent interactions
- Create a context management system using temporary files for inter-agent communication
- Implement elicitation through hooks that pause execution and prompt for user input

### Implementation Details
```
bmad-claude-integration/
├── installer/
│   ├── install.js
│   └── templates/
│       ├── settings.json.template
│       └── hooks/
│           ├── bmad-orchestrator.sh
│           ├── elicitation-handler.sh
│           └── context-manager.sh
├── subagents/
│   ├── bmad-master.md
│   ├── bmad-orchestrator.md
│   ├── pm.md
│   ├── architect.md
│   └── ...
├── context/
│   └── .gitkeep
└── tests/
```

### Key Features
- **UserPromptSubmit Hook**: Analyzes user prompts to determine if BMAD agents should be invoked
- **PreToolUse Hook**: Intercepts tool usage to manage context and elicitation
- **Context Files**: Store agent outputs in structured files to avoid summarization
- **Elicitation Handler**: Special hook that manages interactive phases

### Pros
- Minimal changes to original BMAD files
- Complete control over agent lifecycle
- Can intercept and modify behavior at any point
- Context preserved in files

### Cons
- Complex hook management
- Potential performance overhead
- Requires careful synchronization

## Approach 2: Native Subagent Integration with State Machine

### Architecture
- Create Claude Code subagents for each BMAD agent with enhanced system prompts
- Implement a state machine for managing elicitation phases
- Use a central coordinator subagent that manages workflow state

### Implementation Details
```
bmad-claude-integration/
├── installer/
│   ├── install.js
│   └── config.json
├── agents/
│   ├── bmad-coordinator.md
│   ├── bmad-master.md
│   ├── pm.md
│   ├── architect.md
│   └── ...
├── lib/
│   ├── state-machine.js
│   ├── context-bridge.js
│   └── elicitation-manager.js
└── tests/
```

### Subagent Definition Example
```markdown
---
name: bmad-pm
description: Business Modeling and Architecture Design - Project Manager. Invoke for requirements gathering, user story creation, and project planning tasks.
tools: Read, Write, MultiEdit, TodoWrite
---

# BMAD Project Manager Agent

## Role
You are the BMAD Project Manager, specialized in requirements elicitation and user story creation.

## State Management
You maintain state through a special file at `.bmad/state/pm-state.json` that tracks:
- Current workflow phase
- Elicitation progress
- User responses
- Generated artifacts

## Elicitation Protocol
When performing elicitation:
1. Write current question to `.bmad/elicitation/current-question.txt`
2. Set state to "awaiting-response"
3. Include instruction: "Please respond with: bmad-respond: <your answer>"
4. Parse responses that match the pattern
5. Continue workflow based on response

[Rest of PM agent definition from original BMAD]
```

### Pros
- Native Claude Code integration
- Clean separation of concerns
- Leverages Claude's built-in subagent delegation
- State machine provides clear workflow management

### Cons
- Requires modifying original BMAD agent definitions
- State management complexity
- Potential for state inconsistencies

## Approach 3: Hybrid Message Queue with Minimal Subagents

### Architecture
- Create lightweight "router" subagents that delegate to BMAD logic
- Implement a message queue system for inter-agent communication
- Use hooks only for critical interception points

### Implementation Details
```
bmad-claude-integration/
├── installer/
│   ├── install.js
│   └── setup-wizard.js
├── routers/
│   ├── bmad-router.md
│   └── agent-routers/
│       ├── pm-router.md
│       ├── architect-router.md
│       └── ...
├── core/
│   ├── message-queue.js
│   ├── bmad-loader.js
│   └── elicitation-broker.js
├── hooks/
│   └── message-processor.sh
└── tests/
```

### Router Subagent Example
```markdown
---
name: bmad-pm-router
description: Routes to BMAD Project Manager for requirements and user stories
tools: Task
---

You are a router for the BMAD Project Manager. When invoked:

1. Load the original BMAD PM agent definition from `bmad-core/agents/pm.md`
2. Create a message in `.bmad/queue/` with:
   - agent: pm
   - context: current conversation context
   - request: user's request
3. Invoke a Task subagent with the prompt:
   "Execute BMAD PM agent with context from `.bmad/queue/[message-id].json`"
4. Monitor `.bmad/queue/[message-id]-response.json` for results
5. Present results to user maintaining original formatting
```

### Message Queue Structure
```json
{
  "id": "msg-123",
  "agent": "pm",
  "phase": "elicitation",
  "context": {
    "user_request": "Create a user story for login feature",
    "previous_responses": [],
    "current_question": "What type of authentication?"
  },
  "status": "awaiting-response"
}
```

### Pros
- Minimal modification to original BMAD files
- Clear separation between routing and execution
- Flexible message-based architecture
- Easy to debug and monitor

### Cons
- Additional complexity with message queue
- Potential latency from message passing
- Requires careful queue management

## Recommendation: Approach 3 (Hybrid Message Queue)

After analyzing all three approaches, I recommend Approach 3 for the following reasons:

1. **Minimal Invasion**: Router subagents don't modify original BMAD logic
2. **Flexibility**: Message queue allows for complex workflows and state management
3. **Debuggability**: Messages can be inspected and replayed
4. **Elicitation Handling**: Clean separation of elicitation logic
5. **Extensibility**: Easy to add new agents or modify behavior

## Implementation Plan

### Phase 1: Core Infrastructure
1. Create message queue system
2. Implement BMAD loader that preserves original agent logic
3. Build elicitation broker for handling interactive phases

### Phase 2: Router Subagents
1. Generate router subagents for each BMAD agent
2. Implement context preservation logic
3. Add slash command support

### Phase 3: Installer and Testing
1. Create installer with setup wizard
2. Implement test framework with AI-as-a-judge
3. Add monitoring and debugging tools

## Testing Strategy

### Test Framework Components
1. **Unit Tests**: Test individual components (message queue, loaders)
2. **Integration Tests**: Test agent interactions and workflows
3. **AI Judge Tests**: Use o3 model to evaluate:
   - Context preservation
   - Elicitation quality
   - Output accuracy
   - Workflow completion

### AI Judge Test Example
```python
class BMADIntegrationTest:
    def test_elicitation_quality(self):
        # Execute BMAD workflow
        result = execute_bmad_workflow("Create user story for auth")
        
        # AI Judge evaluation
        judge_prompt = f"""
        Evaluate the BMAD elicitation quality:
        
        User Request: {result.user_request}
        Elicitation Questions: {result.elicitation_questions}
        User Responses: {result.user_responses}
        Final Output: {result.final_output}
        
        Criteria:
        1. Were questions relevant and comprehensive?
        2. Did the agent adapt based on responses?
        3. Is the final output complete and accurate?
        
        Score 1-10 and provide detailed feedback.
        """
        
        score = ai_judge(judge_prompt, model="o3")
        assert score >= 8, f"Elicitation quality below threshold: {score}"
```

## Next Steps
1. Validate approach with proof of concept
2. Implement core message queue system
3. Create first router subagent (bmad-master)
4. Test elicitation flow end-to-end
5. Expand to all BMAD agents