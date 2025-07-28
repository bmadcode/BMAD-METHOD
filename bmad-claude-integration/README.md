# BMAD-METHOD Claude Code Integration

This integration brings the power of BMAD-METHOD (Business Modeling and Architecture Design Method) to Claude Code through subagents, enabling natural interaction with specialized AI agents for software development workflows.

## Overview

The BMAD Claude integration implements a hybrid message queue architecture that:
- Preserves the original BMAD-METHOD agent behaviors
- Enables concurrent multi-agent sessions
- Handles interactive elicitation phases naturally
- Maintains full context without summarization
- Provides clear agent identification during conversations

## Architecture

### Core Components

1. **Message Queue System** (`core/message-queue.js`)
   - Handles asynchronous communication between agents
   - Preserves full context in structured messages
   - Supports retry logic and TTL management

2. **Elicitation Broker** (`core/elicitation-broker.js`)
   - Manages interactive Q&A phases
   - Tracks elicitation history per session
   - Enables natural conversation flow

3. **Session Manager** (`core/session-manager.js`)
   - Handles multiple concurrent agent conversations
   - Provides clear visual differentiation between agents
   - Manages session switching and suspension

4. **BMAD Loader** (`core/bmad-loader.js`)
   - Loads original BMAD agent definitions
   - Parses YAML configurations and markdown content
   - Maintains compatibility with upstream changes

5. **Router Subagents** (`routers/`)
   - Thin wrappers around original BMAD agents
   - Handle message routing and context preservation
   - Enable both automatic and manual invocation

## Installation

### Prerequisites
- Claude Code installed with `~/.claude` directory
- Node.js v18 or higher
- BMAD-METHOD repository cloned

### Quick Install

```bash
cd /path/to/BMAD-METHOD/bmad-claude-integration
npm install
npm run install:local
```

### Manual Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate router subagents:
   ```bash
   npm run generate:routers
   ```

3. Run the installer:
   ```bash
   node installer/install.js
   ```

## Uninstallation

To completely remove the BMAD integration:

```bash
cd /path/to/BMAD-METHOD/bmad-claude-integration
npm run uninstall
```

This will:
- Remove the `~/.bmad` directory (with optional backup)
- Remove BMAD routers from `~/.claude/routers/`
- Clean up hooks from `~/.claude/config/settings.json`
- Remove BMAD scripts from `package.json`

The uninstaller will prompt for confirmation and offer to backup session data if found.

## Usage

### Natural Language Invocation

Simply describe what you need and Claude Code will automatically route to the appropriate BMAD agent:

- "Create a user story for login feature" → Routes to PM agent
- "Design a microservices architecture" → Routes to Architect agent
- "Review this code for quality" → Routes to QA agent

### Slash Commands

Use explicit commands for direct agent invocation:

- `/bmad-pm` - Invoke Project Manager
- `/bmad-architect` - Invoke Architect
- `/bmad-dev` - Invoke Developer
- `/bmad-sessions` - View active sessions
- `/bmad-switch <number>` - Switch between sessions

### Managing Concurrent Sessions

The integration supports multiple active agent conversations:

```
🟢 1. 📋 Project Manager
   Session: session-123456
   Status: active | Last active: 10:30 AM
   📝 In elicitation phase

🟡 2. 🏗️ Architect
   Session: session-789012
   Status: suspended | Last active: 10:25 AM

💡 Use /switch <number> to switch between sessions
```

### Elicitation Handling

When an agent needs user input, you'll see clear identification:

```
📋 **Project Manager Question**
─────────────────────────────────
What type of authentication do you need for the login feature?

*Responding to Project Manager in session session-123456*
```

Simply respond naturally - no special format required.

## File Structure

```
bmad-claude-integration/
├── core/                  # Core system components
│   ├── message-queue.js   # Message handling
│   ├── elicitation-broker.js # Elicitation management
│   ├── session-manager.js # Session handling
│   └── bmad-loader.js     # BMAD file loader
├── routers/              # Generated router subagents
│   ├── bmad-router.md    # Main router
│   └── *-router.md       # Individual agent routers
├── hooks/                # Optional Claude hooks
├── installer/            # Installation scripts
├── lib/                  # Utilities
│   └── router-generator.js
└── tests/                # Test suites
```

## Message Flow

1. **User Request** → Main Router analyzes and routes
2. **Router** → Creates/resumes session, sends message to queue
3. **Agent Execution** → Task subagent loads BMAD definition
4. **Elicitation** → Broker manages Q&A if needed
5. **Response** → Formatted with agent identification back to user

## Testing

Run the test suite:

```bash
npm test              # Run all tests
npm run test:ai      # Run AI judge tests
```

## Known Issues

Please review [KNOWN-ISSUES.md](KNOWN-ISSUES.md) for important information about:
- Claude Code's agent name inference issue
- Workarounds and mitigations
- Other known limitations

## Troubleshooting

### Agents Not Responding
- Check if subagents are installed: `ls ~/.claude/agents/bmad-*.md`
- Verify message queue: `node core/message-queue.js metrics`
- Check active sessions: `/bmad-sessions`

### Context Loss
- Ensure message queue is initialized: `npm run queue:init`
- Check session files: `ls ~/.bmad/sessions/`

### Elicitation Issues
- Verify broker is working: `node core/elicitation-broker.js active`
- Check elicitation sessions: `ls ~/.bmad/queue/elicitation/`

## Development

### Adding New Features

1. Modify core components as needed
2. Regenerate routers: `npm run generate:routers`
3. Test thoroughly with AI judge
4. Update documentation

### Debugging

Enable debug mode:
```bash
DEBUG=bmad:* npm run install:local
```

View message queue:
```bash
node core/message-queue.js list
node core/message-queue.js metrics
```

## Contributing

This integration is designed to be minimally invasive to the parent BMAD-METHOD repository. When contributing:

1. Don't modify original BMAD files
2. Keep router logic thin
3. Test with multiple concurrent sessions
4. Ensure elicitation works naturally
5. Maintain clear agent identification

## License

Same as BMAD-METHOD - see parent repository for details.