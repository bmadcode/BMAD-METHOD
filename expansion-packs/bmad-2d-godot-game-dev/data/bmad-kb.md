# BMad Knowledge Base - 2D Godot Game Development

## Overview

This is the game development expansion of BMad-Method (Breakthrough Method of Agile AI-driven Development), specializing in creating 2D games using Godot and GDScript/C#. The v4 system introduces a modular architecture with improved dependency management, bundle optimization, and support for both web and IDE environments, specifically optimized for game development workflows.

### Key Features for Game Development

- **Game-Specialized Agent System**: AI agents for each game development role (Designer, Developer, Scrum Master)
- **Godot-Optimized Build System**: Automated dependency resolution for game assets and scripts
- **Dual Environment Support**: Optimized for both web UIs and game development IDEs
- **Game Development Resources**: Specialized templates, tasks, and checklists for 2D Godot games
- **Performance-First Approach**: Built-in optimization patterns for cross-platform game deployment

### Game Development Focus

- **Target Engine**: Godot 4.2 LTS or newer with GDScript 2.0 or C# (.NET 6+)
- **Platform Strategy**: Cross-platform (PC, Console, Mobile) with a focus on 2D
- **Development Approach**: Agile story-driven development with game-specific workflows
- **Performance Target**: Stable frame rate on target devices
- **Architecture**: Node-based architecture using Godot's best practices

### When to Use BMad for Game Development

- **New Game Projects (Greenfield)**: Complete end-to-end game development from concept to deployment
- **Existing Game Projects (Brownfield)**: Feature additions, level expansions, and gameplay enhancements
- **Game Team Collaboration**: Multiple specialized roles working together on game features
- **Game Quality Assurance**: Structured testing, performance validation, and gameplay balance
- **Game Documentation**: Professional Game Design Documents, technical architecture, user stories

## How BMad Works for Game Development

### The Core Method

BMad transforms you into a "Player Experience CEO" - directing a team of specialized game development AI agents through structured workflows. Here's how:

1. **You Direct, AI Executes**: You provide game vision and creative decisions; agents handle implementation details
2. **Specialized Game Agents**: Each agent masters one game development role (Designer, Developer, Scrum Master)
3. **Game-Focused Workflows**: Proven patterns guide you from game concept to deployed 2D Godot game
4. **Clean Handoffs**: Fresh context windows ensure agents stay focused and effective for game development

### The Two-Phase Game Development Approach

#### Phase 1: Game Design & Planning (Web UI - Cost Effective)

- Use large context windows for comprehensive game design
- Generate complete Game Design Documents and technical architecture
- Leverage multiple agents for creative brainstorming and mechanics refinement
- Create once, use throughout game development

#### Phase 2: Game Development (IDE - Implementation)

- Shard game design documents into manageable pieces
- Execute focused SM → Dev cycles for game features
- One game story at a time, sequential progress
- Real-time Godot operations, GDScript/C# coding, and game testing

### The Game Development Loop

```text
1. Game SM Agent (New Chat) → Creates next game story from sharded docs
2. You → Review and approve game story
3. Game Dev Agent (New Chat) → Implements approved game feature in Godot
4. QA Agent (New Chat) → Reviews code and tests gameplay
5. You → Verify game feature completion
6. Repeat until game epic complete
```

### Why This Works for Games

- **Context Optimization**: Clean chats = better AI performance for complex game logic
- **Role Clarity**: Agents don't context-switch = higher quality game features
- **Incremental Progress**: Small game stories = manageable complexity
- **Player-Focused Oversight**: You validate each game feature = quality control
- **Design-Driven**: Game specs guide everything = consistent player experience

### Core Game Development Philosophy

#### Player-First Development

You are developing games as a "Player Experience CEO" - thinking like a game director with unlimited creative resources and a singular vision for player enjoyment.

#### Game Development Principles

1. **MAXIMIZE_PLAYER_ENGAGEMENT**: Push the AI to create compelling gameplay. Challenge mechanics and iterate.
2. **GAMEPLAY_QUALITY_CONTROL**: You are the ultimate arbiter of fun. Review all game features.
3. **CREATIVE_OVERSIGHT**: Maintain the high-level game vision and ensure design alignment.
4. **ITERATIVE_REFINEMENT**: Expect to revisit game mechanics. Game development is not linear.
5. **CLEAR_GAME_INSTRUCTIONS**: Precise game requirements lead to better implementations.
6. **DOCUMENTATION_IS_KEY**: Good game design docs lead to good game features.
7. **START_SMALL_SCALE_FAST**: Test core mechanics, then expand and polish.
8. **EMBRACE_CREATIVE_CHAOS**: Adapt and overcome game development challenges.

## Getting Started with Game Development

### Quick Start Options for Game Development

#### Option 1: Web UI for Game Design

**Best for**: Game designers who want to start with comprehensive planning

1. Navigate to `dist/teams/` (after building)
2. Copy `godot-2d-game-team.txt` content
3. Create new Gemini Gem or CustomGPT
4. Upload file with instructions: "Your critical operating instructions are attached, do not break character as directed"
5. Type `/help` to see available game development commands

#### Option 2: IDE Integration for Game Development

**Best for**: Godot developers using Cursor, Claude Code, Windsurf, Trae, Cline, Roo Code, Github Copilot

```bash
# Interactive installation (recommended)
npx bmad-method install
# Select the bmad-2d-godot-game-dev expansion pack when prompted
```

**Installation Steps for Game Development**:

- Choose "Install expansion pack" when prompted
- Select "bmad-2d-godot-game-dev" from the list
- Select your IDE from supported options:
  - **Cursor**: Native AI integration with Godot support
  - **Claude Code**: Anthropic's official IDE
  - **Windsurf**: Built-in AI capabilities
  - **Trae**: Built-in AI capabilities
  - **Cline**: VS Code extension with AI features
  - **Roo Code**: Web-based IDE with agent support
  - **GitHub Copilot**: VS Code extension with AI peer programming assistant

**Verify Game Development Installation**:

- `.bmad-core/` folder created with all core agents
- `.bmad-2d-godot-game-dev/` folder with game development agents
- IDE-specific integration files created
- Game development agents available with `/bmad2dg` prefix (per config.yaml)

### Environment Selection Guide for Game Development

**Use Web UI for**:

- Game design document creation and brainstorming
- Cost-effective comprehensive game planning (especially with Gemini)
- Multi-agent game design consultation
- Creative ideation and mechanics refinement

**Use IDE for**:

- Godot project development and GDScript/C# coding
- Game asset operations and project integration
- Game story management and implementation workflow
- Godot testing, profiling, and debugging

**Cost-Saving Tip for Game Development**: Create large game design documents in web UI, then copy to `docs/game-design-doc.md` and `docs/game-architecture.md` in your Godot project before switching to IDE for development.

### IDE-Only Game Development Workflow Considerations

**Can you do everything in IDE?** Yes, but understand the game development tradeoffs:

**Pros of IDE-Only Game Development**:

- Single environment workflow from design to Godot deployment
- Direct Godot project operations from start
- No copy/paste between environments
- Immediate Godot project integration

**Cons of IDE-Only Game Development**:

- Higher token costs for large game design document creation
- Smaller context windows for comprehensive game planning
- May hit limits during creative brainstorming phases
- Less cost-effective for extensive game design iteration

**CRITICAL RULE for Game Development**:

- **ALWAYS use Game SM agent for story creation** - Never use bmad-master or bmad-orchestrator
- **ALWAYS use Game Dev agent for Godot implementation** - Never use bmad-master or bmad-orchestrator
- **Why this matters**: Game SM and Game Dev agents are specifically optimized for Godot workflows
- **No exceptions**: Even if using bmad-master for design, switch to Game SM → Game Dev for implementation

## Core Configuration for Game Development (core-config.yaml)

**New in V4**: The `expansion-packs/bmad-2d-godot-game-dev/core-config.yaml` file enables BMad to work seamlessly with any Godot project structure, providing maximum flexibility for game development.

### Game Development Configuration

The expansion pack follows the standard BMad configuration patterns. Copy your core-config.yaml file to expansion-packs/bmad-2d-godot-game-dev/ and add Game-specific configurations to your project's `core-config.yaml`:

```yaml
markdownExploder: true
prd:
  prdFile: docs/prd.md
  prdVersion: v4
  prdSharded: true
  prdShardedLocation: docs/prd
  epicFilePattern: epic-{n}*.md
architecture:
  architectureFile: docs/architecture.md
  architectureVersion: v4
  architectureSharded: true
  architectureShardedLocation: docs/architecture
gdd:
  gddVersion: v4
  gddSharded: true
  gddLocation: docs/game-design-doc.md
  gddShardedLocation: docs/gdd
  epicFilePattern: epic-{n}*.md
gamearchitecture:
  gamearchitectureFile: docs/architecture.md
  gamearchitectureVersion: v3
  gamearchitectureLocation: docs/game-architecture.md
  gamearchitectureSharded: true
  gamearchitectureShardedLocation: docs/game-architecture
gamebriefdocLocation: docs/game-brief.md
levelDesignLocation: docs/level-design.md
#Specify the location for your godot editor - be sure to check this! It will vary based on operating system
godotEditorLocation: /Applications/Godot.app/Contents/MacOS/Godot
customTechnicalDocuments: null
devDebugLog: .ai/debug-log.md
devStoryLocation: docs/stories
slashPrefix: bmad2dg
#replace old devLoadAlwaysFiles with this once you have sharded your gamearchitecture document
devLoadAlwaysFiles:
  - docs/game-architecture/9-coding-standards.md
  - docs/game-architecture/3-tech-stack.md
  - docs/game-architecture/8-godot-project-structure.md
```

## Complete Game Development Workflow

### Planning Phase (Web UI Recommended - Especially Gemini for Game Design!)

**Ideal for cost efficiency with Gemini's massive context for game brainstorming:**

**For All Game Projects**:

1. **Game Concept Brainstorming**: `/bmad2dg/game-designer` - Use `*game-design-brainstorming` task
2. **Game Brief**: Create foundation game document using `game-brief-tmpl`
3. **Game Design Document Creation**: `/bmad2dg/game-designer` - Use `game-design-doc-tmpl` for comprehensive game requirements
4. **Game Architecture Design**: `/bmad2dg/game-architect` - Use `game-architecture-tmpl` for Godot technical foundation
5. **Level Design Framework**: `/bmad2dg/game-designer` - Use `level-design-doc-tmpl` for level structure planning
6. **Document Preparation**: Copy final documents to Godot project as `docs/game-design-doc.md`, `docs/game-brief.md`, `docs/level-design.md` and `docs/game-architecture.md`

#### Example Game Planning Prompts

**For Game Design Document Creation**:

```text
"I want to build a [genre] 2D game that [core gameplay].
Help me brainstorm mechanics and create a comprehensive Game Design Document."
```

**For Game Architecture Design**:

```text
"Based on this Game Design Document, design a scalable Godot architecture
that can handle [specific game requirements] with stable performance."
```

### Critical Transition: Web UI to Godot IDE

**Once game planning is complete, you MUST switch to IDE for Godot development:**

- **Why**: Godot development workflow requires GDScript/C# operations, asset management, and real-time Godot testing
- **Cost Benefit**: Web UI is more cost-effective for large game design creation; IDE is optimized for Godot development
- **Required Files**: Ensure `docs/game-design-doc.md` and `docs/game-architecture.md` exist in your Godot project

### Godot IDE Development Workflow

**Prerequisites**: Game planning documents must exist in `docs/` folder of Godot project

1. **Document Sharding** (CRITICAL STEP for Game Development):
   - Documents created by Game Designer/Architect (in Web or IDE) MUST be sharded for development
   - Use core BMad agents or tools to shard:
     a) **Manual**: Use core BMad `shard-doc` task if available
     b) **Agent**: Ask core `@bmad-master` agent to shard documents
   - Shards `docs/game-design-doc.md` → `docs/game-design/` folder
   - Shards `docs/game-architecture.md` → `docs/game-architecture/` folder
   - **WARNING**: Do NOT shard in Web UI - copying many small files to Godot is painful!

2. **Verify Sharded Game Content**:
   - At least one `feature-n.md` file in `docs/game-design/` with game stories in development order
   - Godot system documents and coding standards for game dev agent reference
   - Sharded docs for Game SM agent story creation

Resulting Godot Project Folder Structure:

- `docs/game-design/` - Broken down game design sections
- `docs/game-architecture/` - Broken down Godot architecture sections
- `docs/game-stories/` - Generated game development stories

3. **Game Development Cycle** (Sequential, one game story at a time):

   **CRITICAL CONTEXT MANAGEMENT for Godot Development**:
   - **Context windows matter!** Always use fresh, clean context windows
   - **Model selection matters!** Use most powerful thinking model for Game SM story creation
   - **ALWAYS start new chat between Game SM, Game Dev, and QA work**

   **Step 1 - Game Story Creation**:
   - **NEW CLEAN CHAT** → Select powerful model → `/bmad2dg/game-sm` → `*draft`
   - Game SM executes create-game-story task using `game-story-tmpl`
   - Review generated story in `docs/game-stories/`
   - Update status from "Draft" to "Approved"

   **Step 2 - Godot Game Story Implementation**:
   - **NEW CLEAN CHAT** → `/bmad2dg/game-developer`
   - Agent asks which game story to implement
   - Include story file content to save game dev agent lookup time
   - Game Dev follows tasks/subtasks, marking completion
   - Game Dev maintains File List of all Godot/GDScript/C# changes
   - Game Dev marks story as "Review" when complete with all Godot tests passing

   **Step 3 - Game QA Review**:
   - **NEW CLEAN CHAT** → Use core `@qa` agent → execute review-story task
   - QA performs senior Godot developer code review
   - QA can refactor and improve Godot code directly
   - QA appends results to story's QA Results section
   - If approved: Status → "Done"
   - If changes needed: Status stays "Review" with unchecked items for game dev

   **Step 4 - Repeat**: Continue Game SM → Game Dev → QA cycle until all game feature stories complete

**Important**: Only 1 game story in progress at a time, worked sequentially until all game feature stories complete.

### Game Story Status Tracking Workflow

Game stories progress through defined statuses:

- **Draft** → **Approved** → **InProgress** → **Done**

Each status change requires user verification and approval before proceeding.

### Game Development Workflow Types

#### Greenfield Game Development

- Game concept brainstorming and mechanics design
- Game design requirements and feature definition
- Godot system architecture and technical design
- Game development execution
- Game testing, performance optimization, and deployment

#### Brownfield Game Enhancement (Existing Godot Projects)

**Key Concept**: Brownfield game development requires comprehensive documentation of your existing Godot project for AI agents to understand game mechanics, Godot patterns, and technical constraints.

**Brownfield Game Enhancement Workflow**:

Since this expansion pack doesn't include specific brownfield templates, you'll adapt the existing templates:

1. **Upload Godot project to Web UI** (GitHub URL, files, or zip)
2. **Create adapted Game Design Document**: `/bmad2dg/game-designer` - Modify `game-design-doc-tmpl` to include:
   - Analysis of existing game systems
   - Integration points for new features
   - Compatibility requirements
   - Risk assessment for changes

3. **Game Architecture Planning**:
   - Use `/bmad2dg/game-architect` with `game-architecture-tmpl`
   - Focus on how new features integrate with existing Godot systems
   - Plan for gradual rollout and testing

4. **Story Creation for Enhancements**:
   - Use `/bmad2dg/game-sm` with `*create-game-story`
   - Stories should explicitly reference existing code to modify
   - Include integration testing requirements

**When to Use Each Game Development Approach**:

**Full Game Enhancement Workflow** (Recommended for):

- Major game feature additions
- Game system modernization
- Complex Godot integrations
- Multiple related gameplay changes

**Quick Story Creation** (Use when):

- Single, focused game enhancement
- Isolated gameplay fixes
- Small feature additions
- Well-documented existing Godot game

**Critical Success Factors for Game Development**:

1. **Game Documentation First**: Always document existing code thoroughly before making changes
2. **Godot Context Matters**: Provide agents access to relevant Godot scripts and game systems
3. **Gameplay Integration Focus**: Emphasize compatibility and non-breaking changes to game mechanics
4. **Incremental Approach**: Plan for gradual rollout and extensive game testing

## Document Creation Best Practices for Game Development

### Required File Naming for Game Framework Integration

- `docs/game-design-doc.md` - Game Design Document
- `docs/game-architecture.md` - Godot System Architecture Document

**Why These Names Matter for Game Development**:

- Game agents automatically reference these files during Godot development
- Game sharding tasks expect these specific filenames
- Game workflow automation depends on standard naming

### Cost-Effective Game Document Creation Workflow

**Recommended for Large Game Documents (Game Design Document, Game Architecture):**

1. **Use Web UI**: Create game documents in web interface for cost efficiency
2. **Copy Final Output**: Save complete markdown to your Godot project
3. **Standard Names**: Save as `docs/game-design-doc.md` and `docs/game-architecture.md`
4. **Switch to Godot IDE**: Use IDE agents for Godot development and smaller game documents

### Game Document Sharding

Game templates with Level 2 headings (`##`) can be automatically sharded:

**Original Game Design Document**:

```markdown
## Core Gameplay Mechanics

## Player Progression System

## Level Design Framework

## Technical Requirements
```

**After Sharding**:

- `docs/game-design/core-gameplay-mechanics.md`
- `docs/game-design/player-progression-system.md`
- `docs/game-design/level-design-framework.md`
- `docs/game-design/technical-requirements.md`

Use the `shard-doc` task or `@kayvan/markdown-tree-parser` tool for automatic game document sharding.

## Game Agent System

### Core Game Development Team

| Agent            | Role              | Primary Functions                           | When to Use                                 |
| ---------------- | ----------------- | ------------------------------------------- | ------------------------------------------- |
| `game-designer`  | Game Designer     | Game mechanics, creative design, GDD        | Game concept, mechanics, creative direction |
| `game-developer` | Godot Developer   | GDScript/C# implementation, Godot optimization       | All Godot development tasks                 |
| `game-sm`        | Game Scrum Master | Game story creation, sprint planning        | Game project management, workflow           |
| `game-architect` | Game Architect    | Godot system design, technical architecture | Complex Godot systems, performance planning |

**Note**: For QA and other roles, use the core BMad agents (e.g., `@qa` from bmad-core).

### Game Agent Interaction Commands

#### IDE-Specific Syntax for Game Development

**Game Agent Loading by IDE**:

- **Claude Code**: `/bmad2dg/game-designer`, `/bmad2dg/game-developer`, `/bmad2dg/game-sm`, `/bmad2dg/game-architect`
- **Cursor**: `@bmad2dg/game-designer`, `@bmad2dg/game-developer`, `@bmad2dg/game-sm`, `@bmad2dg/game-architect`
- **Windsurf**: `/bmad2dg/game-designer`, `/bmad2dg/game-developer`, `/bmad2dg/game-sm`, `/bmad2dg/game-architect`
- **Trae**: `@bmad2dg/game-designer`, `@bmad2dg/game-developer`, `@bmad2dg/game-sm`, `@bmad2dg/game-architect`
- **Roo Code**: Select mode from mode selector with bmad2dg prefix
- **GitHub Copilot**: Open the Chat view (`⌃⌘I` on Mac, `Ctrl+Alt+I` on Windows/Linux) and select the appropriate game agent.

**Common Game Development Task Commands**:

- `*help` - Show available game development commands
- `*status` - Show current game development context/progress
- `*exit` - Exit the game agent mode
- `*game-design-brainstorming` - Brainstorm game concepts and mechanics (Game Designer)
- `*draft` - Create next game development story (Game SM agent)
- `*validate-game-story` - Validate a game story implementation (with core QA agent)
- `*correct-course-game` - Course correction for game development issues
- `*advanced-elicitation` - Deep dive into game requirements

**In Web UI (after building with godot-2d-game-team)**:

```text
/bmad2dg/game-designer - Access game designer agent
/bmad2dg/game-architect - Access game architect agent
/bmad2dg/game-developer - Access game developer agent
/bmad2dg/game-sm - Access game scrum master agent
/help - Show available game development commands
/switch agent-name - Change active agent (if orchestrator available)
```

## Game-Specific Development Guidelines

### Godot + GDScript/C# Standards

**Project Structure:**

```text
GodotProject/
├── Assets/
│   └── _Project
│       ├── Scenes/          # Game scenes (Boot, Menu, Game, etc.)
│       ├── Scripts/         # GDScript/C# scripts
│       │   ├── Editor/      # Editor-specific scripts
│       │   └── Runtime/     # Runtime scripts
│       ├── Scenes/         # Reusable game objects
│       ├── Art/             # Art assets (sprites, models, etc.)
│       ├── Audio/           # Audio assets
│       ├── Data/            # Resources and other data
│       └── Tests/           # Godot Test Framework tests
│           ├── EditMode/
│           └── PlayMode/
├── Packages/            # Package Manager manifest
└── ProjectSettings/     # Godot project settings
```

**Performance Requirements:**

- Maintain stable frame rate on target devices
- Memory usage under specified limits per level
- Loading times under 3 seconds for levels
- Smooth animation and responsive controls

**Code Quality:**

- GDScript/C# best practices compliance
- Node-based architecture (SOLID principles)
- Efficient use of the Node lifecycle
- Error handling and graceful degradation

### Game Development Story Structure

**Story Requirements:**

- Clear reference to Game Design Document section
- Specific acceptance criteria for game functionality
- Technical implementation details for Godot and GDScript/C#
- Performance requirements and optimization considerations
- Testing requirements including gameplay validation

**Story Categories:**

- **Core Mechanics**: Fundamental gameplay systems
- **Level Content**: Individual levels and content implementation
- **UI/UX**: User interface and player experience features
- **Performance**: Optimization and technical improvements
- **Polish**: Visual effects, audio, and game feel enhancements

### Quality Assurance for Games

**Testing Approach:**

- Unit tests for GDScript/C# logic (EditMode tests)
- Integration tests for game systems (PlayMode tests)
- Performance benchmarking and profiling with Godot Profiler
- Gameplay testing and balance validation
- Cross-platform compatibility testing

**Performance Monitoring:**

- Frame rate consistency tracking
- Memory usage monitoring
- Asset loading performance
- Input responsiveness validation
- Battery usage optimization (mobile)

## Usage Patterns and Best Practices for Game Development

### Environment-Specific Usage for Games

**Web UI Best For Game Development**:

- Initial game design and creative brainstorming phases
- Cost-effective large game document creation
- Game agent consultation and mechanics refinement
- Multi-agent game workflows with orchestrator

**Godot IDE Best For Game Development**:

- Active Godot development and GDScript/C# implementation
- Godot asset operations and project integration
- Game story management and development cycles
- Godot testing, profiling, and debugging

### Quality Assurance for Game Development

- Use appropriate game agents for specialized tasks
- Follow Agile ceremonies and game review processes
- Use game-specific checklists:
  - `game-architect-checklist` for architecture reviews
  - `game-change-checklist` for change validation
  - `game-design-checklist` for design reviews
  - `game-story-dod-checklist` for story quality
- Regular validation with game templates

### Performance Optimization for Game Development

- Use specific game agents vs. `bmad-master` for focused Godot tasks
- Choose appropriate game team size for project needs
- Leverage game-specific technical preferences for consistency
- Regular context management and cache clearing for Godot workflows

## Game Development Team Roles

### Game Designer

- **Primary Focus**: Game mechanics, player experience, design documentation
- **Key Outputs**: Game Brief, Game Design Document, Level Design Framework
- **Specialties**: Brainstorming, game balance, player psychology, creative direction

### Game Developer

- **Primary Focus**: Godot implementation, GDScript/C# excellence, performance optimization
- **Key Outputs**: Working game features, optimized Godot code, technical architecture
- **Specialties**: GDScript/C#/Godot, performance optimization, cross-platform development

### Game Scrum Master

- **Primary Focus**: Game story creation, development planning, agile process
- **Key Outputs**: Detailed implementation stories, sprint planning, quality assurance
- **Specialties**: Story breakdown, developer handoffs, process optimization

## Platform-Specific Considerations

### Cross-Platform Development

- Abstract input using the new Input System
- Use platform-dependent compilation for specific logic
- Test on all target platforms regularly
- Optimize for different screen resolutions and aspect ratios

### Mobile Optimization

- Touch gesture support and responsive controls
- Battery usage optimization
- Performance scaling for different device capabilities
- App store compliance and packaging

### Performance Targets

- **PC/Console**: 60+ FPS at target resolution
- **Mobile**: 60 FPS on mid-range devices, 30 FPS minimum on low-end
- **Loading**: Initial load under 5 seconds, scene transitions under 2 seconds
- **Memory**: Within platform-specific memory budgets

## Success Metrics for Game Development

### Technical Metrics

- Frame rate consistency (>90% of time at target FPS)
- Memory usage within budgets
- Loading time targets met
- Zero critical bugs in core gameplay systems

### Player Experience Metrics

- Tutorial completion rate >80%
- Level completion rates appropriate for difficulty curve
- Average session length meets design targets
- Player retention and engagement metrics

### Development Process Metrics

- Story completion within estimated timeframes
- Code quality metrics (test coverage, code analysis)
- Documentation completeness and accuracy
- Team velocity and delivery consistency

## Common Godot Development Patterns

### Scene Management

- Use a loading scene for asynchronous loading of game scenes
- Use additive scene loading for large levels or streaming
- Manage scenes with a dedicated SceneManager class

### Game State Management

- Use Resources to store shared game state
- Implement a finite state machine (FSM) for complex behaviors
- Use a GameManager singleton for global state management

### Input Handling

- Use the new Input System for robust, cross-platform input
- Create Action Maps for different input contexts (e.g., menu, gameplay)
- Use PlayerInput component for easy player input handling

### Performance Optimization

- Object pooling for frequently instantiated objects (e.g., bullets, enemies)
- Use the Godot Profiler to identify performance bottlenecks
- Optimize physics settings and collision detection
- Use LOD (Level of Detail) for complex models

## Success Tips for Game Development

- **Use Gemini for game design planning** - The team-game-dev bundle provides collaborative game expertise
- **Use bmad-master for game document organization** - Sharding creates manageable game feature chunks
- **Follow the Game SM → Game Dev cycle religiously** - This ensures systematic game progress
- **Keep conversations focused** - One game agent, one Godot task per conversation
- **Review everything** - Always review and approve before marking game features complete

## Contributing to BMad-Method Game Development

### Game Development Contribution Guidelines

For full details, see `CONTRIBUTING.md`. Key points for game development:

**Fork Workflow for Game Development**:

1. Fork the repository
2. Create game development feature branches
3. Submit PRs to `next` branch (default) or `main` for critical game development fixes only
4. Keep PRs small: 200-400 lines ideal, 800 lines maximum
5. One game feature/fix per PR

**Game Development PR Requirements**:

- Clear descriptions (max 200 words) with What/Why/How/Testing for game features
- Use conventional commits (feat:, fix:, docs:) with game context
- Atomic commits - one logical game change per commit
- Must align with game development guiding principles

**Game Development Core Principles**:

- **Game Dev Agents Must Be Lean**: Minimize dependencies, save context for Godot code
- **Natural Language First**: Everything in markdown, no code in game development core
- **Core vs Game Expansion Packs**: Core for universal needs, game packs for Godot specialization
- **Game Design Philosophy**: "Game dev agents code Godot, game planning agents plan gameplay"

## Game Development Expansion Pack System

### This Game Development Expansion Pack

This 2D Godot Game Development expansion pack extends BMad-Method beyond traditional software development into professional game development. It provides specialized game agent teams, Godot templates, and game workflows while keeping the core framework lean and focused on general development.

### Why Use This Game Development Expansion Pack?

1. **Keep Core Lean**: Game dev agents maintain maximum context for Godot coding
2. **Game Domain Expertise**: Deep, specialized Godot and game development knowledge
3. **Community Game Innovation**: Game developers can contribute and share Godot patterns
4. **Modular Game Design**: Install only game development capabilities you need

### Using This Game Development Expansion Pack

1. **Install via CLI**:

   ```bash
   npx bmad-method install
   # Select "Install game development expansion pack" option
   ```

2. **Use in Your Game Workflow**: Installed game agents integrate seamlessly with existing BMad agents

### Creating Custom Game Development Extensions

Use the **expansion-creator** pack to build your own game development extensions:

1. **Define Game Domain**: What game development expertise are you capturing?
2. **Design Game Agents**: Create specialized game roles with clear Godot boundaries
3. **Build Game Resources**: Tasks, templates, checklists for your game domain
4. **Test & Share**: Validate with real Godot use cases, share with game development community

**Key Principle**: Game development expansion packs democratize game development expertise by making specialized Godot and game design knowledge accessible through AI agents.

## Getting Help with Game Development

- **Commands**: Use `*/*help` in any environment to see available game development commands
- **Game Agent Switching**: Use `*/*switch game-agent-name` with orchestrator for role changes
- **Game Documentation**: Check `docs/` folder for Godot project-specific context
- **Game Community**: Discord and GitHub resources available for game development support
- **Game Contributing**: See `CONTRIBUTING.md` for full game development guidelines

This knowledge base provides the foundation for effective game development using the BMad-Method framework with specialized focus on 2D game creation using Godot and GDScript/C#.
