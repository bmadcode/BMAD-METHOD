# BMAD-Method Claude Code Integration

This directory contains the integration layer that ports BMAD-Method agents to Claude Code's subagent system.

## Quick Start

```bash
# Build Claude Code subagents from BMAD definitions
npm run build

# Start Claude Code in the repo root
cd ../../
claude
```

## What This Does

This integration transforms BMAD-Method's specialized agents into Claude Code subagents:

- **Analyst (Mary)** - Market research, brainstorming, competitive analysis, project briefs
- **Architect** - System design, technical architecture, solution planning  
- **PM** - Project management, planning, coordination
- **Dev** - Development, implementation, coding
- **QA** - Quality assurance, testing, validation
- **Scrum Master** - Agile process management, team coordination

## How It Works

1. **Agent Parsing**: Reads BMAD agent definitions from `bmad-core/agents/`
2. **Template Generation**: Uses Mustache templates to create Claude subagent files
3. **Context Management**: Creates lightweight memory files for each agent
4. **Tool Assignment**: Grants appropriate tools (Read, Grep, codebase_search, etc.)

## Generated Structure

```
.claude/
├── agents/           # Generated subagent definitions
│   ├── analyst.md
│   ├── architect.md  
│   ├── dev.md
│   ├── pm.md
│   ├── qa.md
│   └── sm.md
└── memory/          # Context memory for each agent
    ├── analyst.md
    └── ...
```

## Usage in Claude Code

Once built, you can use subagents in Claude Code:

```
# Explicit invocation
> Use the analyst subagent to help me create a project brief

# Or let Claude choose automatically
> I need help with market research and competitive analysis
```

## Architecture Principles

- **Zero Pollution**: No changes to original BMAD structure
- **One-Way Generation**: Claude agents generated from BMAD sources
- **Context Light**: Each agent starts with minimal context, loads more on-demand
- **Tool Focused**: Uses Claude Code's built-in tools for file access

## Development

### Building

```bash
npm run build        # Build all agents
npm run clean        # Remove generated .claude directory
npm run validate     # Validate agent definitions
```

### Templates

Agent templates are in `src/templates/agent.mustache` and use the following data:

- `agent.*` - Agent metadata (name, title, icon, etc.)
- `persona.*` - Role definition and principles  
- `commands` - Available BMAD commands
- `dependencies.*` - Task, template, and data dependencies

### Adding New Agents

1. Add agent ID to `CORE_AGENTS` array in `build-claude.js`
2. Ensure corresponding `.md` file exists in `bmad-core/agents/`
3. Run `npm run build`

## Integration with Original BMAD

This integration is designed to coexist with the original BMAD system:

- Original BMAD web bundles continue to work unchanged
- Claude integration is completely optional
- No modification to core BMAD files required
- Can be used alongside existing BMAD workflows

## License

MIT - Same as BMAD-Method
