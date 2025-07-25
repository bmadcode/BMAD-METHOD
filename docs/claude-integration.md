# BMAD-Method Claude Code Integration

This document describes the Claude Code subagents integration for BMAD-Method, allowing you to use BMAD's specialized agents within Claude Code's new subagent system.

## Overview

The Claude Code integration transforms BMAD's collaborative agent framework into Claude Code subagents while maintaining clean separation from the original codebase. This enables:

- **Native Claude Code Experience**: Use BMAD agents directly within Claude Code
- **Context Management**: Each agent maintains its own context window
- **Tool Integration**: Leverage Claude Code's built-in tools (Read, Grep, codebase_search, etc.)
- **Workflow Preservation**: Maintain BMAD's proven agent collaboration patterns

## Quick Setup

### 1. Prerequisites

- Node.js 20+ 
- Claude Code installed ([claude.ai/code](https://claude.ai/code))
- Existing BMAD-Method project

### 2. Generate Claude Subagents

```bash
# From your BMAD project root
npm run build:claude
```

This creates `.claude/agents/` with six specialized subagents:
- **Analyst** (Mary) - Market research, competitive analysis, project briefs
- **Architect** - System design, technical architecture
- **PM** - Project management, planning, coordination  
- **Dev** - Development, implementation, coding
- **QA** - Quality assurance, testing, validation
- **Scrum Master** - Agile process management

### 3. Start Claude Code

```bash
# In your project root (where .claude/ directory exists)
claude
```

## Usage Patterns

### Explicit Agent Invocation

Request specific agents for specialized tasks:

```
# Market research and analysis
> Use the analyst subagent to help me create a competitive analysis

# Architecture planning  
> Ask the architect subagent to design a microservices architecture

# Implementation
> Have the dev subagent implement the user authentication system

# Quality assurance
> Use the qa subagent to create comprehensive test cases
```

### Automatic Agent Selection

Claude Code automatically selects appropriate agents based on context:

```
# Analyst will likely be chosen
> I need to research the market for AI-powered project management tools

# Architect will likely be chosen  
> How should I structure the database schema for this multi-tenant SaaS?

# Dev will likely be chosen
> Implement the JWT authentication middleware
```

## Agent Capabilities

### Analyst (Mary) 📊
- Market research and competitive analysis
- Project briefs and discovery documentation
- Brainstorming and ideation facilitation
- Strategic analysis and insights

**Key Commands**: create-project-brief, perform-market-research, create-competitor-analysis, brainstorm

### Architect 🏗️
- System architecture and design
- Technical solution planning
- Integration patterns and approaches
- Scalability and performance considerations

### PM 📋
- Project planning and coordination
- Stakeholder management
- Risk assessment and mitigation
- Resource allocation and timeline management

### Dev 👨‍💻
- Code implementation and development
- Technical problem solving
- Code review and optimization
- Integration and deployment

### QA 🔍
- Test planning and execution
- Quality assurance processes
- Bug identification and validation
- Acceptance criteria definition

### Scrum Master 🎯
- Sprint planning and management
- Agile process facilitation
- Team coordination and communication
- Impediment resolution

## Workflow Integration

### BMAD Story-Driven Development

Agents can access and work with BMAD story files:

```
> Use the dev subagent to implement the user story in stories/user-auth.story.md
```

### Task and Template Access

Agents can read BMAD dependencies:

```
> Have the analyst use the project-brief template to document our new feature
```

### Cross-Agent Collaboration

Chain agents for complex workflows:

```
> First use the analyst to research the market, then have the architect design the solution, and finally ask the pm to create a project plan
```

## Technical Architecture

### Directory Structure

```
./
├── bmad-core/           # Original BMAD (untouched)
├── integration/claude/  # Claude integration source
└── .claude/            # Generated Claude subagents
    ├── agents/         # Subagent definitions
    │   ├── analyst.md
    │   ├── architect.md
    │   └── ...
    └── memory/         # Agent context memory
```

### Context Management

- **Lightweight Start**: Each agent begins with minimal context (~2-4KB)
- **On-Demand Loading**: Agents use tools to read files when needed
- **Memory Files**: Rolling memory maintains conversation context
- **Tool Integration**: Access BMAD files via Read, Grep, codebase_search

### Tool Permissions

Each agent has access to:
- `Read` - File reading and content access
- `Grep` - Text search within files  
- `glob` - File pattern matching
- `codebase_search_agent` - Semantic code search
- `list_directory` - Directory exploration

## Advanced Usage

### Custom Agent Development

To add new agents:

1. Create agent definition in `bmad-core/agents/new-agent.md`
2. Add agent ID to `integration/claude/src/build-claude.js`
3. Rebuild: `npm run build:claude`

### Memory Management

Agents maintain context in `.claude/memory/{agent}.md`:
- Automatically created on first use
- Stores key decisions and context
- Truncated when exceeding limits
- Can be manually edited if needed

### Integration with CI/CD

```yaml
# .github/workflows/claude-agents.yml
name: Update Claude Agents
on:
  push:
    paths: ['bmad-core/agents/**']
jobs:
  build-claude:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build:claude
      - # Commit updated .claude/ directory
```

## Best Practices

### Agent Selection

- **Analyst**: Early project phases, research, market analysis
- **Architect**: System design, technical planning, solution architecture  
- **PM**: Project coordination, planning, stakeholder management
- **Dev**: Implementation, coding, technical execution
- **QA**: Testing, validation, quality assurance
- **Scrum Master**: Process management, team coordination

### Context Optimization

- Start conversations with clear agent requests
- Reference specific BMAD files by path when needed
- Use agent memory files for important decisions
- Keep agent contexts focused on their specialization

### Workflow Efficiency

- Use explicit agent invocation for specialized tasks
- Chain agents for multi-phase work
- Leverage BMAD story files for development context
- Maintain conversation history in agent memory

## Troubleshooting

### Agent Not Found
```bash
# Rebuild agents
npm run build:claude

# Verify generation
ls .claude/agents/
```

### Memory Issues
```bash
# Clear agent memory
rm .claude/memory/*.md
```

### Context Problems
- Keep agent prompts focused
- Use tools to load files on-demand
- Reference specific sections rather than entire documents

## Support

- **BMAD Community**: [Discord](https://discord.gg/gk8jAdXWmj)
- **Issues**: [GitHub Issues](https://github.com/24601/BMAD-AT-CLAUDE/issues)
- **Claude Code Docs**: [docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview)
