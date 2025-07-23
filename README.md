# BMad-Method: Universal AI Agent Framework

> **🧪 ENHANCED VERSION: Quality Framework + Collaborative Workspace System** 
> 
> This repository now contains the complete BMAD Method 4.0 with integrated quality framework enhancements including automatic remediation execution, enhanced reality auditing, zero-touch workflow automation, and collaborative workspace features. These enhancements have been successfully tested and integrated into the main BMAD Method repository.

[![Version](https://img.shields.io/npm/v/bmad-method?color=blue&label=version)](https://www.npmjs.com/package/bmad-method)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-7289da?logo=discord&logoColor=white)](https://discord.gg/gk8jAdXWmj)

Foundations in Agentic Agile Driven Development, known as the Breakthrough Method of Agile AI-Driven Development, yet so much more. Transform any domain with specialized AI expertise: software development, entertainment, creative writing, business strategy to personal wellness just to name a few.

## 🚀 Latest Enhancements

This version includes **comprehensive quality framework enhancements** and **collaborative workspace system** features:

- **🤖 Automatic Remediation Execution** - Zero-touch issue resolution without manual commands
- **📊 Automatic Options Presentation** - Eliminate "what's next?" confusion with grade-based recommendations
- **🔍 Enhanced Reality Enforcement** - 10-phase comprehensive quality auditing with scope management
- **🛡️ Regression Prevention** - Story context analysis and pattern compliance checking
- **🪙 78-86% Token Reduction** - Smart resource management with intelligent task routing and caching
- **📋 Story-to-Code Audit** - Automatic cross-reference between completed stories and actual implementation
- **🔧 IDE Environment Detection** - Auto-adapt to 8+ IDEs including Cursor, Claude Code, Windsurf, and more
- **🎛️ Role-Optimized LLM Settings** - Custom temperature and parameters per agent for maximum performance
- **🤝 Collaborative Workspace System** - Multi-session AI coordination with auto-escalation to external LLMs
- **📦 Universal Installer Integration** - Automated workspace deployment with IDE-specific configuration

**📄 [View Complete Enhancement Details](enhancements.md)**

**[Subscribe to BMadCode on YouTube](https://www.youtube.com/@BMadCode?sub_confirmation=1)**

**[Join our Discord Community](https://discord.gg/gk8jAdXWmj)** - A growing community for AI enthusiasts! Get help, share ideas, explore AI agents & frameworks, collaborate on tech projects, enjoy hobbies, and help each other succeed. Whether you're stuck on BMad, building your own agents, or just want to chat about the latest in AI - we're here for you! **Some mobile and VPN may have issue joining the discord, this is a discord issue - if the invite does not work, try from your own internet or another network, or non-VPN.**

⭐ **If you find this project helpful or useful, please give it a star in the upper right hand corner!** It helps others discover BMad-Method and you will be notified of updates!

## Overview

**BMad Method's Three Key Innovations:**

**1. Agentic Planning:** Dedicated agents (Analyst, PM, Architect) collaborate with you to create detailed, consistent PRDs and Architecture documents. Through advanced prompt engineering and human-in-the-loop refinement, these planning agents produce comprehensive specifications that go far beyond generic AI task generation.

**2. Context-Engineered Development:** The Scrum Master agent then transforms these detailed plans into hyper-detailed development stories that contain everything the Dev agent needs - full context, implementation details, and architectural guidance embedded directly in story files.

**3. Collaborative Quality Assurance:** Built-in workspace system enables cross-agent coordination, automatic escalation to external LLMs when stuck, and comprehensive quality validation to prevent technical debt from ambiguous requirements.

This three-phase approach eliminates **planning inconsistency**, **context loss**, and **implementation ambiguity** - the biggest problems in AI-assisted development. Your Dev agent opens a story file with complete understanding of what to build, how to build it, and why, plus automatic collaboration when requirements need clarification.

**📖 [See the complete workflow in the User Guide](bmad-core/user-guide.md)** - Planning phase, development cycle, and all agent roles

## Quick Navigation

### Understanding the BMad Workflow

**Before diving in, review these critical workflow diagrams that explain how BMad works:**

1. **[Planning Workflow (Web UI)](bmad-core/user-guide.md#the-planning-workflow-web-ui)** - How to create PRD and Architecture documents
2. **[Core Development Cycle (IDE)](bmad-core/user-guide.md#the-core-development-cycle-ide)** - How SM, Dev, and QA agents collaborate through story files

> ⚠️ **These diagrams explain 90% of BMad Method Agentic Agile flow confusion** - Understanding the PRD+Architecture creation and the SM/Dev/QA workflow and how agents pass notes through story files is essential - and also explains why this is NOT taskmaster or just a simple task runner!

### What would you like to do?

- **[Install and Build software with Full Stack Agile AI Team](#quick-start)** → Quick Start Instruction
- **[Learn how to use BMad](bmad-core/user-guide.md)** → Complete user guide and walkthrough
- **[See available AI agents](#available-personas--capabilities)** → Specialized roles for your team
- **[Explore non-technical uses](#-beyond-software-development---expansion-packs)** → Creative writing, business, wellness, education
- **[Create my own AI agents](#creating-your-own-expansion-pack)** → Build agents for your domain
- **[Browse ready-made expansion packs](expansion-packs/)** → Game dev, DevOps, infrastructure and get inspired with ideas and examples
- **[Understand the architecture](docs/core-architecture.md)** → Technical deep dive
- **[Join the community](https://discord.gg/gk8jAdXWmj)** → Get help and share ideas

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
- ✅ Install new workspace utilities and collaboration features

This makes it easy to benefit from the latest improvements, bug fixes, quality enhancements, and collaborative features without losing your customizations!

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

- **New installations** - Sets up BMad in your project with quality enhancements
- **Upgrades** - Updates existing installations automatically
- **Expansion packs** - Installs any expansion packs you've added to package.json
- **Workspace setup** - Configures collaborative workspace features

> **That's it!** Whether you're installing for the first time, upgrading, or adding expansion packs - these commands do everything.

**Prerequisites**: [Node.js](https://nodejs.org) v20+ required

### Fastest Start: Web UI Full Stack Team at your disposal (2 minutes)

1. **Get the bundle**: Save or clone the [full stack team file](dist/teams/team-fullstack.txt) or choose another team
2. **Create AI agent**: Create a new Gemini Gem or CustomGPT
3. **Upload & configure**: Upload the file and set instructions: \"Your critical operating instructions are attached, do not break character as directed\"
4. **Start Ideating and Planning**: Start chatting! Type `*help` to see available commands or pick an agent like `*analyst` to start right in on creating a brief.
5. **CRITICAL**: Talk to BMad Orchestrator in the web at ANY TIME (#bmad-orchestrator command) and ask it questions about how this all works!
6. **When to move to the IDE**: Once you have your PRD, Architecture, optional UX and Briefs - its time to switch over to the IDE to shard your docs, and start implementing the actual code! See the [User guide](bmad-core/user-guide.md) for more details

### Alternative: Clone and Build

```bash
git clone https://github.com/bmadcode/bmad-method.git
npm run install:bmad # build and install all to a destination folder
```

## 🌟 Beyond Software Development - Expansion Packs

BMad's natural language framework works in ANY domain. Expansion packs provide specialized AI agents for creative writing, business strategy, health & wellness, education, and more. Also expansion packs can expand the core BMad-Method with specific functionality that is not generic for all cases. [See the Expansion Packs Guide](docs/expansion-packs.md) and learn to create your own!

## 🧪 Collaborative Workspace Features

### Cross-IDE Workspace Utilities

The enhanced BMad Method now includes comprehensive workspace utilities that work across all major IDEs:

```bash
# Initialize workspace for collaborative development
npm run workspace-init

# Check workspace health and status
npm run workspace-status

# Manage agent handoffs and context sharing
npm run workspace-handoff

# Sync workspace state across sessions
npm run workspace-sync

# Monitor workspace health
npm run workspace-health
```

**Supported IDEs:** Cursor, Claude Code, Windsurf, Trae, Roo, Cline, Gemini, GitHub Copilot, VS Code, JetBrains

### Automatic Escalation System

When agents encounter ambiguity that could lead to technical debt, the workspace system automatically:

1. **Detects ambiguity** - Pattern recognition identifies unclear requirements
2. **Initiates collaboration** - Automatically escalates to appropriate specialists (UX designer, analyst, PM, architect)
3. **External LLM coordination** - Creates prompts for external LLMs like Gemini for additional guidance
4. **Maintains context** - Preserves all collaboration context for seamless handoffs

### Quality Framework Enhancements

- **10-phase comprehensive auditing** with A-F scoring system
- **Automatic remediation execution** without manual intervention
- **Story-to-code audit** ensuring implementation matches requirements
- **Regression prevention** through pattern compliance checking
- **78-86% token reduction** through intelligent resource management

## Available Personas & Capabilities

### Core Business Personas:
- **Business Analyst (BA)** - Requirements analysis, stakeholder management, process optimization
- **Product Manager (PM)** - Product strategy, roadmap planning, feature prioritization
- **Product Owner (PO)** - Backlog management, user story creation, acceptance criteria

### Technical Personas:
- **System Architect** - Technical architecture, system design, technology decisions
- **Developer** - Code implementation, technical solutions, development best practices
- **Design Architect** - Design systems, visual architecture, design standards

### Specialized Personas:
- **v0 UX/UI Architect (Veronica/Victor)** - AI-powered design-to-code workflows
- **Scrum Master** - Agile facilitation, process improvement, team coaching

### Process Personas:
- **DevOps/Platform Engineer** - Infrastructure, deployment, operational excellence
- **Quality Assurance** - Testing strategies, quality frameworks, validation processes

### Enhanced Specialized Personas:

#### **Documentation & Communication Specialists:**
- **Technical Documentation Architect** - Eliminates "all hands on deck" debugging scenarios through systematic documentation
- **DevOps Documentation Specialist** - Streamlines infrastructure and deployment documentation

#### **Polyglot Technology Specialists:**
- **Cross-Platform Integration Specialist** - React + Node.js + ASP.NET + Python integration mastery
- **Polyglot Code Review Specialist** - Multi-language code review expertise
- **Performance Optimization Specialist** - Cross-stack debugging and performance optimization
- **Security Integration Specialist** - Security practices across multiple technology stacks

#### **Strategic Technology Architects:**
- **Advanced Troubleshooting Specialist** - Cross-stack troubleshooting and root cause analysis
- **Enterprise Architecture Consultant** - Enterprise-scale architecture and governance

All personas now include:
- **Automatic Context Recognition** - Frameworks for detecting important decisions and insights
- **Cross-Session Continuity Patterns** - Methodologies for context restoration across AI sessions
- **Context Handoff Procedures** - Structured context sharing between personas
- **Quality Context Standards** - Consistent context quality across all personas
- **Performance Optimization Patterns** - Intelligent context organization and retrieval

## Documentation & Resources

### Essential Guides

- 📖 **[User Guide](bmad-core/user-guide.md)** - Complete walkthrough from project inception to completion
- 🏗️ **[Core Architecture](docs/core-architecture.md)** - Technical deep dive and system design
- 🚀 **[Expansion Packs Guide](docs/expansion-packs.md)** - Extend BMad to any domain beyond software development
- 🤝 **[Collaborative Workspace Guide](workspace-utils/docs/)** - Cross-IDE workspace setup and usage

### Complete Documentation Ecosystem

BMAD Method includes the most comprehensive AI-driven development documentation available, with **complete persona packages**, **integration guides**, and **quality frameworks**.

#### Complete Persona Documentation Packages

Each persona has a **complete documentation package** including comprehensive guides, templates, quality standards, workflows, and success metrics:

- **[Business Analyst Complete Package](docs/analyst-comprehensive-guide.md)**
- **[Product Manager Complete Package](docs/pm-comprehensive-guide.md)**
- **[System Architect Complete Package](docs/architect-comprehensive-guide.md)**
- **[Developer Complete Package](docs/dev-comprehensive-guide.md)**
- **[v0 UX/UI Architect Complete Package](docs/v0-ux-ui-architect-comprehensive-guide.md)**

#### Integration & Architecture Documentation

- **[Comprehensive Integration Guide](docs/bmad-comprehensive-integration-guide.md)** - How all personas work together
- **[Documentation Map](docs/bmad-documentation-map.md)** - Navigate the complete documentation ecosystem
- **[System Architecture](docs/system-architecture/README.md)** - Complete system design and integration

#### Memory Management System

- **[Memory Architecture Guide](docs/memory-architecture/README.md)** - Universal memory management across AI environments
- **[Memory Command Reference](docs/memory-architecture/memory-command-reference.md)** - Complete command patterns and usage
- **[Context Persistence Implementation](docs/memory-architecture/memory-integration-patterns.md)** - Advanced context management

## Support

- 💬 [Discord Community](https://discord.gg/gk8jAdXWmj)
- 🐛 [Issue Tracker](https://github.com/bmadcode/bmad-method/issues)
- 💬 [Discussions](https://github.com/bmadcode/bmad-method/discussions)

## Contributing

**We're excited about contributions and welcome your ideas, improvements, and expansion packs!** 🎉

📋 **[Read CONTRIBUTING.md](CONTRIBUTING.md)** - Complete guide to contributing, including guidelines, process, and requirements

## License

MIT License - see [LICENSE](LICENSE) for details.

[![Contributors](https://contrib.rocks/image?repo=bmadcode/bmad-method)](https://github.com/bmadcode/bmad-method/graphs/contributors)

<sub>Built with ❤️ for the AI-assisted development community</sub>