# BMAD Method Universal Workflow Guide

This guide outlines the core BMAD workflow that applies regardless of which AI-powered IDE you're using.

## Overview

The BMAD Method follows a structured approach to AI-assisted software development:

1. **Install BMAD** in your project
2. **Plan with Gemini** using team-fullstack
3. **Organize with bmad-master** (document sharding)
4. **Develop iteratively** with SM → Dev cycles

## The Complete Workflow

### Phase 1: Project Setup

1. **Install BMAD in your project**:

   ```bash
   npx bmad-method install
   ```

   - Choose "Complete installation"
   - Select your IDE (Cursor, Claude Code, Windsurf, Roo Code, or VS Code Copilot)

2. **Verify installation**:
   - `.bmad-core/` folder created with all agents
   - IDE-specific integration files created
   - All agent commands/rules/modes available

### Phase 2: Ideation & Planning (Gemini)

Use Google's Gemini for collaborative planning with the full team:

1. **Open [Google Gems](https://gemini.google.com/gems/view)**
2. **Create a new Gem**:
   - Give it a title and description (e.g., "BMAD Team Fullstack")
3. **Load team-fullstack**:
   - Copy contents of: `dist/teams/team-fullstack.txt` from your project
   - Paste this content into the Gem setup to configure the team
4. **Collaborate with the team**:
   - Business Analyst: Requirements gathering
   - Product Manager: Feature prioritization
   - Solution Architect: Technical design
   - UX Expert: User experience design

### Example Gemini Sessions:

```text
"I want to build a [type] application that [core purpose].
Help me brainstorm features and create a comprehensive PRD."

"Based on this PRD, design a scalable technical architecture
that can handle [specific requirements]."
```

5. **Export planning documents**:
   - Copy the PRD output and save as `docs/prd.md` in your project
   - Copy the architecture output and save as `docs/architecture.md` in your project

### Phase 3: Document Organization (IDE)

Switch back to your IDE for document management:

1. **Load bmad-master agent** (syntax varies by IDE)
2. **Shard the PRD**:
   ```
   *shard-doc docs/prd.md prd
   ```
3. **Shard the architecture**:
   ```
   *shard-doc docs/architecture.md architecture
   ```

**Result**: Organized folder structure:

- `docs/prd/` - Broken down PRD sections
- `docs/architecture/` - Broken down architecture sections

### Phase 4: Iterative Development

Follow the SM → Dev cycle for systematic story development:

#### Story Creation (Scrum Master)

1. **Start new chat/conversation**
2. **Load SM agent**
3. **Execute**: `*create` (runs create-next-story task)
4. **Review generated story** in `docs/stories/`
5. **Update status**: Change from "Draft" to "Approved"

#### Story Implementation (Developer)

1. **Start new chat/conversation**
2. **Load Dev agent**
3. **Agent asks**: Which story to implement
4. **Follow development tasks**
5. **Complete implementation**
6. **Update status**: Change to "Done"

#### Repeat Until Complete

- **SM**: Create next story → Review → Approve
- **Dev**: Implement story → Complete → Mark done
- **Continue**: Until all features implemented

## IDE-Specific Syntax

### Agent Loading Syntax by IDE:

- **Claude Code**: `/agent-name` (e.g., `/bmad-master`)
- **Cursor**: `@agent-name` (e.g., `@bmad-master`)
- **Windsurf**: `@agent-name` (e.g., `@bmad-master`)
- **Roo Code**: Select mode from mode selector (e.g., `bmad-bmad-master`)
- **VS Code Copilot**: Open the Chat view (`⌃⌘I` on Mac, `Ctrl+Alt+I` on Windows/Linux) and select **Agent** from the chat mode selector.

### Chat Management:

- **Claude Code, Cursor, Windsurf**: Start new chats when switching agents
- **Roo Code**: Switch modes within the same conversation

## Available Agents

### Core Development Agents:

- **bmad-master**: Universal task executor, document management
- **sm**: Scrum Master for story creation and agile process
- **dev**: Full-stack developer for implementation
- **architect**: Solution architect for technical design

### Specialized Agents:

- **pm**: Product manager for planning and prioritization
- **analyst**: Business analyst for requirements
- **qa**: QA specialist for testing strategies
- **po**: Product owner for backlog management
- **ux-expert**: UX specialist for design

## Key Principles

1. **Agent Specialization**: Each agent has specific expertise and responsibilities
2. **Clean Handoffs**: Always start fresh when switching between agents
3. **Status Tracking**: Maintain story statuses (Draft → Approved → InProgress → Done)
4. **Iterative Development**: Complete one story before starting the next
5. **Documentation First**: Always start with solid PRD and architecture

## Common Commands

Every agent supports these core commands:

- `*help` - Show available commands
- `*status` - Show current context/progress
- `*exit` - Exit the agent mode

## Success Tips

- **Use Gemini for big picture planning** - The team-fullstack bundle provides collaborative expertise
- **Use bmad-master for document organization** - Sharding creates manageable chunks
- **Follow the SM → Dev cycle religiously** - This ensures systematic progress
- **Keep conversations focused** - One agent, one task per conversation
- **Review everything** - Always review and approve before marking complete

This workflow ensures systematic, AI-assisted development following agile principles with clear separation of concerns and consistent progress tracking.
