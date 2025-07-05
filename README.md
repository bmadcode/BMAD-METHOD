# BMad-Method: Universal AI Agent Framework

[![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://www.npmjs.com/package/bmad-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

Foundations in Agentic Agile Driven Development, known as the Breakthrough Method of Agile AI-Driven Development, but it is so much more. Transform any domain with specialized AI expertise: software development, entertainment, creative writing, business strategy to personal wellness just to name a few.

**[Subscribe to BMadCode on YouTube](https://www.youtube.com/@BMadCode?sub_confirmation=1)**

**[Join our Discord Community](https://discord.gg/gk8jAdXWmj)** - A growing community for AI enthusiasts! Get help, share ideas, explore AI agents & frameworks, collaborate on tech projects, enjoy hobbies, and help each other succeed. Whether you're stuck on BMad, building your own agents, or just want to chat about the latest in AI - we're here for you!

⭐ **If you find this project helpful or useful, please give it a star in the upper right hand corner!** It helps others discover BMad-Method and you will be notified of updates!

## Quick Navigation

### 🚨 MUST READ: Understanding the BMad Workflow

**Before diving in, review these critical workflow diagrams that explain how BMad works:**

1. **[Planning Workflow (Web UI)](docs/user-guide.md#the-planning-workflow-web-ui)** - How to create PRD and Architecture documents
2. **[Core Development Cycle (IDE)](docs/user-guide.md#the-core-development-cycle-ide)** - How SM, Dev, and QA agents collaborate through story files

> ⚠️ **These diagrams explain 90% of BMad Method Agentic Agile flow confusion** - Understanding the PRD+Architecture creation and the SM/Dev/QA workflow and how agents pass notes through story files is essential - and also explains why this is NOT taskmaster or just a simple task runner!

### What would you like to do?

- **[Build software with Full Stack Agile AI Team](quick-start)** → Quick Start Instruction
- **[Learn how to use BMad](docs/user-guide.md)** → Complete user guide and walkthrough
- **[See available AI agents](#available-agents)** → Specialized roles for your team
- **[Explore non-technical uses](#-beyond-software-development---expansion-packs)** → Creative writing, business, wellness, education
- **[Create my own AI agents](#creating-your-own-expansion-pack)** → Build agents for your domain
- **[Browse ready-made expansion packs](expansion-packs/)** → Game dev, DevOps, infrastructure and get inspired with ideas and examples
- **[Understand the architecture](docs/core-architecture.md)** → Technical deep dive
- **[Join the community](https://discord.gg/g6ypHytrCB)** → Get help and share ideas

### Popular Use Cases

- **Software Development** - [Quick Start](quick-start) | [User Guide](docs/user-guide.md) | [Workflow Guides](#documentation--guides)
- **Game Development** - [2D Phaser Pack](expansion-packs/bmad-2d-phaser-game-dev/)
- **Business Strategy** - [Full Guide](docs/expansion-packs.md#business-strategy-pack)
- **Creative Writing** - [Full Guide](docs/expansion-packs.md#creative-writing-pack)
- **DevOps/Infrastructure** - [Infrastructure Pack](expansion-packs/bmad-infrastructure-devops/)

### Quick Links

- **[Installation](#installation)** → Get started in minutes
- **[Documentation](#documentation--guides)** → All guides and references
- **[Contributing](#contributing)** → Help improve BMad
- **[Support](#support)** → Get help and connect

## Important: Keep Your BMad Installation Updated

**Stay up-to-date effortlessly!** If you already have BMad-Method installed in your project, simply run:

```bash
npx bmad-method install
# OR
git pull
npm run install:bmad
```

This will:

- ✅ Automatically detect your existing v4 installation
- ✅ Update only the files that have changed and add new files
- ✅ Create `.bak` backup files for any custom modifications you've made
- ✅ Preserve your project-specific configurations

This makes it easy to benefit from the latest improvements, bug fixes, and new agents without losing your customizations! If for some reason this fails, you can rename or remove your .bmad-code folder and run the install again. The main thing to look out for is if you have set up custom modes that are not file driven (Cursor is the only one at this time that is not done through project files lagging behind) - you will want to ensure your sm and dev custom modes especially are kept up to date.

## Quick Start

### One Command for Everything (IDE Installation)

**Just run one of these commands:**

```bash
npx bmad-method install
# OR if you already have BMad installed:
git pull
npm run install:bmad
```

This single command handles:

- **New installations** - Sets up BMad in your project
- **Upgrades** - Updates existing installations automatically
- **Expansion packs** - Installs any expansion packs you've added to package.json

> **That's it!** Whether you're installing for the first time, upgrading, or adding expansion packs - these commands do everything.

**Prerequisites**: [Node.js](https://nodejs.org) v20+ required

### Fastest Start: Web UI (2 minutes)

1. **Get the bundle**: Copy `dist/teams/team-fullstack.txt` (from this repository)
2. **Create AI agent**: Create a new Gemini Gem or CustomGPT
3. **Upload & configure**: Upload the file and set instructions: "Your critical operating instructions are attached, do not break character as directed"
4. **Start Ideating and Planning**: Start chatting! Type `*help` to see available commands or pick an agent like `*analyst` to start right in on creating a brief.

> **All pre-built bundles are in the `dist/` folder** - ready to copy and use immediately!

### Alternative: Clone and Build

```bash
git clone https://github.com/bmadcode/bmad-method.git
npm run install:bmad # build and install all to a destination folder
```

## Overview

The BMad Method (Breakthrough Method of Agile Agentic-Driven Development) elevates 'Vibe Coding' by utilizing advanced prompt engineering techniques and critical context management at the most critical stages of development implementation. By providing specialized AI agents for every role in an Agile team, each agent has deep expertise in their domain helping you really plan and execute on your vision while keeping the agents on the rails even through complex application plans.

Unlike systems like Task Master, or inbuilt Task tools, the BMad Methods agile flow does so much more. With most systems, you give your idea, and the system churns out a plan, task list, lets you review it and then starts executing. Where the BMad agile flow is different is you can choose to have more upfront planning and architecture specification to ensure the system is built in a sustainable way, not a vibe coded spaghetti mess. When producing the PRD and Architectures (full stack, front end and or backend), the Agents work with you back and forth using advanced proven LLM prompt engineering advanced techniques to produce anything beyond what the average slop LLMs and Task generators will produce on their own. This truly is a system of Human in the Loop producing markedly better results.

## Installation

### Method 1: CLI Installer (For IDEs)

**Just run one command:**

```bash
npx bmad-method install
# OR if you already have BMad installed:
npm run install:bmad
```

**This single command does everything:**

- Installs BMad for the first time
- Updates existing installations
- Adds any expansion packs from your package.json

**Prerequisites**: Install [Node.js](https://nodejs.org) v20+ first

### Method 2: Pre-Built Web Bundles (For Web UI)

For ChatGPT, Claude, or Gemini web interfaces:

1. Choose a bundle:
   - **Recommended**: `dist/teams/team-fullstack.txt` (complete development team)
   - Or pick from individual agents in `dist/agents/`
2. Upload to your AI platform (Gemini Gem, CustomGPT, or directly in chat)
3. Set instructions: "Your critical operating instructions are attached, do not break character as directed"
4. Type `/help` to see available commands

**Supported IDEs:**

The BMad Method works with any IDE, but has built-in integration for:

- `cursor` - Cursor IDE with manual rule @agent commands
- `claude-code` - Claude Code with /agent commands
- `cline` - Cline Rules integration
- `gemini-cli` - Gemini with @agent commands
- `windsurf` - Windsurf with manual rule @agent commands
- `trae` - Trae with manual rule @agent commands
- `roo` - Roo Code with custom modes (see `.roomodes`)
- `github-copilot` - GitHub Copilot agent mode integration

## Available Agents

### Core Development Team

| Agent       | Role               | Specialty                                                                                    |
| ----------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `analyst`   | Business Analyst   | market analysis, brainstorming, project brief creation                                       |
| `pm`        | Product Manager    | Product strategy, MVP Decisioning, PRD creation with Epics                                   |
| `architect` | Solution Architect | System design, technical full stack, front end or backend architecture                       |
| `ux-expert` | UX Designer        | User experience, UI design, prompts for V0, Lovable, and others                              |
| `po`        | Product Owner      | Ensure PRD and Architecture are aligned, and changes from architecture end up in PRD stories |
| `sm`        | Scrum Master       | High level epics and stories transformed into detailed dev stories with tasks and subtasks   |
| `dev`       | Developer          | Code implementation across all technologies - follows the detailed SM created story          |
| `qa`        | QA Specialist      | Detailed review of the devs ready for review story, refactor and propose issues and changes  |

### BMad Agents

| Agent               | Role             | Specialty                                                                                                                |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `bmad-orchestrator` | Team Coordinator | Helps guide you and answers your questions with its massive knowledge base, and guides you through Multi-agent workflows |
| `bmad-master`       | Universal Expert | All capabilities without switching (Except Dev)                                                                          |

## Advanced Features

### Dynamic Dependencies

Each agent only loads the resources it needs, keeping context windows lean.

### Template System

Rich templates for all document types:

- Product Requirements (PRD)
- Architecture Documents
- User Stories
- Test Plans
- And more...

Templates are unique in that they are embedded with the LLM instructions also for further working with you to prompt and elicit the best from you and your agile agent team member - allowing for unique coaching and customization options. While there is a single create-doc task, the possibilities are endless when you expand the templates into more doc types, or customize with your own docs embedded with the templating markup and LLM instruction framework that is core to the BMad Method.

### Slash Star Commands

Ask the agent you are using for help with /help (in the web) or \*help in the ide to see what commands are available!

### Advanced Elicitation

Many of the Agents and Templates for docs, and some tasks, include Advanced Elicitation directives based on the latest in LLM interactions and pro level prompt engineering guidance. With this, you can push the Agents further than ever before. If an agent proposes an idea, or an architecture - you can push it further with optional elicitations where it will have to really expand on, defend, or produce other options and prove its suggestion was better. This is a necessary step if you want the absolute best beyond accepting the generated average responses the LLMs think you want to hear for their first response. Some of this is interactive, and some of this is baked into the core prompting engine that powers the LLM progression through various tasks and template flows.

## Usage

The BMad Method follows a structured Agile workflow with specialized AI agents. For complete usage instructions and walkthroughs, see the **[User Guide](docs/user-guide.md)**.

### Quick Start Examples

#### With IDE Integration

```bash
# In Cursor
@pm Create a PRD for a task management app

# In Claude Code
/architect Design a microservices architecture

# In Windsurf
@dev Implement story 1.3
```

#### With Web UI

After uploading a bundle, type `/help` to see available commands.

### Key Resources

- **[Complete User Guide](docs/user-guide.md)** - Full walkthrough from project inception to completion
- **[CLI Commands](docs/user-guide.md#cli-commands)** - Installation, updates, and management
- **[Upgrading from V3](docs/user-guide.md#upgrading-from-v3-to-v4)** - Migration instructions
- **[Core Configuration](docs/user-guide.md#core-configuration)** - V4's flexible project structure support
- **[Teams & Workflows](docs/user-guide.md#team-configurations)** - Pre-configured agent teams

## Project Structure

See the **[Core Architecture](docs/core-architecture.md)** for the complete source tree and detailed explanations of each component.

### Key Directories

- **`.bmad-core/`** - Heart of the framework (agents, templates, workflows)
- **`dist/`** - Pre-built bundles ready for web UI use
- **`expansion-packs/`** - Domain-specific extensions
- **`tools/`** - Build and installation utilities
- **`docs/`** - Your project documentation (PRD, architecture, stories)

### 📦 Pre-Built Bundles (dist/ folder)

**All ready-to-use bundles are in the `dist/` directory!**

- **Teams**: `dist/teams/` - Complete team configurations

  - `team-fullstack.txt` - Full-stack development team
  - `team-ide-minimal.txt` - Minimal IDE workflow team
  - `team-no-ui.txt` - Backend-only team
  - `team-all.txt` - All agents included

- **Individual Agents**: `dist/agents/` - Single agent files

  - One `.txt` file per agent (analyst, architect, dev, etc.)

- **Expansion Packs**: `dist/expansion-packs/` - Specialized domains
  - Game development, DevOps, etc.

**For Web UI usage**: Simply copy any `.txt` file from `dist/` and upload to your AI platform!`

## Documentation & Guides

### Architecture & Technical

- 🏗️ [Core Architecture](docs/core-architecture.md) - Complete technical architecture and system design
- 📖 [User Guide](docs/user-guide.md) - Comprehensive guide to using BMad-Method effectively
- 🚀 [Expansion Packs Guide](docs/expansion-packs.md) - Extend BMad to any domain beyond software development

### Workflow Guides

- 📚 [Universal BMad Workflow Guide](docs/bmad-workflow-guide.md) - Core workflow that applies to all IDEs
- 🏗️ [Working in the Brownfield Guide](docs/working-in-the-brownfield.md) - Complete guide for enhancing existing projects

### IDE-Specific Guides

- 🎯 [Cursor Guide](docs/agentic-tools/cursor-guide.md) - Setup and usage for Cursor
- 🤖 [Claude Code Guide](docs/agentic-tools/claude-code-guide.md) - Setup and usage for Claude Code
- 🌊 [Windsurf Guide](docs/agentic-tools/windsurf-guide.md) - Setup and usage for Windsurf
- 🌊 [Trae Guide](docs/agentic-tools/trae-guide.md) - Setup and usage for Trae
- 🦘 [Roo Code Guide](docs/agentic-tools/roo-code-guide.md) - Setup and usage for Roo Code
- 🔧 [Cline Guide](docs/agentic-tools/cline-guide.md) - Setup and usage for Cline (VS Code)
- ✨ [Gemini CLI Guide](docs/agentic-tools/gemini-cli-guide.md) - Setup and usage for Gemini CLI
- 💻 [Github Copilot Guide](docs/agentic-tools/github-copilot-guide.md) - Setup and usage for VS Code with GitHub Copilot

## 🌟 Beyond Software Development - Expansion Packs

While BMad excels at software development, its natural language framework can structure expertise in ANY domain. Expansion packs transform BMad into a universal AI agent system for creative writing, business strategy, health & wellness, education, and much more.

### Available Expansion Packs

#### Technical Domains

- 🎮 **[Game Development](expansion-packs/bmad-2d-phaser-game-dev/)** - Complete game studio team with designers, developers, and narrative writers
- 🏗️ **[Infrastructure/DevOps](expansion-packs/bmad-infrastructure-devops/)** - Cloud architects, security specialists, SRE experts
- 📱 **Mobile Development** - iOS/Android specialists, mobile UX designers
- 🔗 **Blockchain/Web3** - Smart contract developers, DeFi architects

#### Non-Technical Domains

- 💼 **Business Strategy** - Strategic planners, market analysts, business coaches
- 💪 **Health & Wellness** - Fitness coaches, nutrition advisors, meditation guides
- 🎨 **Creative Arts** - Story writers, world builders, character developers
- 📚 **Education** - Curriculum designers, tutors, learning coaches
- 🧠 **Personal Development** - Life coaches, goal setters, habit builders
- 🏢 **Professional Services** - Legal advisors, content creators, research assistants

### Creating Your Own Expansion Pack

Transform your expertise into AI agents:

1. **Identify your domain** - What knowledge do you want to share?
2. **Design specialized agents** - Each with unique expertise and personality
3. **Create reusable tasks** - Standard procedures in your field
4. **Build professional templates** - Structured outputs for consistency
5. **Share with the community** - Help others benefit from your expertise

📖 **[Read the full Expansion Packs Guide](docs/expansion-packs.md)** - Detailed examples, inspiration, and technical details

## Support

- 💬 [Discord Community](https://discord.gg/g6ypHytrCB)
- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/bmadcode/bmad-method/issues)
- 💬 [Discussions](https://github.com/bmadcode/bmad-method/discussions)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Version History

- **Current**: [v4](https://github.com/bmadcode/bmad-method) - Complete framework rewrite with CLI installer, dynamic dependencies, and expansion packs
- **Previous Versions**:
  - [Version 3](https://github.com/bmadcode/BMad-Method/tree/V3) - Introduced the unified BMad Agent and Gemini optimization
  - [Version 2](https://github.com/bmadcode/BMad-Method/tree/V2) - Added web agents and template separation
  - [Version 1](https://github.com/bmadcode/BMad-Method/tree/V1) - Original 7-file proof of concept

See [versions.md](docs/versions.md) for detailed version history and migration guides.

## Author

Created by Brian (BMad) Madison

## Contributing

**We're excited about contributions and welcome your ideas, improvements, and expansion packs!** 🎉

### Before Contributing - MUST READ

To ensure your contribution aligns with the BMad Method and gets merged smoothly:

1. 📋 **Read [CONTRIBUTING.md](CONTRIBUTING.md)** - Our contribution guidelines, PR requirements, and process
2. 🎯 **Read [GUIDING-PRINCIPLES.md](GUIDING-PRINCIPLES.md)** - Core principles that keep BMad powerful through simplicity
3. 🆕 **New to GitHub?** Start with our [Pull Request Guide](docs/how-to-contribute-with-pull-requests.md)

### Key Points to Remember

- Keep dev agents lean (save context for coding!)
- Use small, focused files over large branching ones
- Reuse existing tasks (like `create-doc`) instead of creating duplicates
- Consider expansion packs for domain-specific features and not improvements to the core system (those belong in the core system)
- All contributions must follow our natural language, markdown-based templating approach with template embedded LLM instructions and elicitations

We're building something amazing together - let's keep it simple, powerful, and focused! 💪

### Development Setup

Want to help improve the BMad Method. Fork n' Clone the repo

```bash
git clone https://github.com/bmadcode/bmad-method.git
cd bmad-method

npm install
npm run build # rebuild the dist folder
npm run install:bmad # build and install all to a destination folder
```

[![Contributors](https://contrib.rocks/image?repo=bmadcode/bmad-method)](https://github.com/bmadcode/bmad-method/graphs/contributors)

<sub>Built with ❤️ for the AI-assisted development community</sub>
