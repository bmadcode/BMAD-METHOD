# BMad Method Agents

This directory contains the specialized AI agent personas that power the BMad Method. Each agent has unique expertise, commands, and dependencies tailored to their role.

## Core Agents

### 🎭 **bmad-orchestrator** - BMad Master Orchestrator
- **When to use**: Workflow coordination, multi-agent tasks, role switching guidance
- **Key capabilities**: Transforms into any specialist agent, coordinates workflows, manages planning

### 📊 **analyst** - Business Analyst (Mary)
- **When to use**: Market research, brainstorming, competitive analysis, project briefs, initial discovery
- **Key capabilities**: Strategic analysis, ideation facilitation, research planning

### 📋 **pm** - Product Manager (Chris)
- **When to use**: Product requirements, roadmap planning, PRD creation, feature prioritization
- **Key capabilities**: Requirements gathering, stakeholder alignment, product vision

### 🏗️ **architect** - Software Architect (Avery)
- **When to use**: System design, technical architecture, technology decisions, integration planning
- **Key capabilities**: Architecture documentation, technical standards, system design patterns

### 📝 **po** - Product Owner (Sarah)
- **When to use**: Backlog management, story refinement, acceptance criteria, sprint planning
- **Key capabilities**: Story validation, prioritization, process adherence

### 🏃 **sm** - Scrum Master (Jamie)
- **When to use**: Sprint planning, story creation, process facilitation, team coordination
- **Key capabilities**: Story generation from PRD/Architecture, sprint management

### 💻 **dev** - Full Stack Developer (James)
- **When to use**: Code implementation, debugging, refactoring, development best practices
- **Key capabilities**: Story implementation, testing, code standards enforcement

### ✅ **qa** - QA Engineer (Quinn)
- **When to use**: Test planning, quality assurance, bug tracking, test automation
- **Key capabilities**: Test execution, validation, quality metrics

### 🎨 **ux-expert** - UX/UI Designer (Jordan)
- **When to use**: User experience design, interface design, usability, design systems
- **Key capabilities**: UX documentation, design patterns, user flow optimization

### 🔍 **seo-expert** - SEO & Digital Marketing Strategist (Alex)
- **When to use**: SEO audits, keyword research, content optimization, technical SEO, search rankings
- **Key capabilities**: Site audits, keyword analysis, content strategy, technical optimization

## Agent Structure

Each agent file follows a consistent YAML-based format containing:

- **Agent metadata**: Name, ID, title, icon, when to use
- **Persona definition**: Role, style, identity, focus, core principles
- **Commands**: Agent-specific commands prefixed with `*`
- **Dependencies**: Tasks, templates, checklists, and data files the agent can access
- **Activation instructions**: How the agent initializes and operates

## Using Agents

1. **In Web UI**: Upload team bundle, type `*agent [name]` to transform
2. **In IDE**: Agents are available through slash commands or direct activation
3. **Commands**: All agent commands require `*` prefix (e.g., `*help`, `*create-doc`)

## Integration Points

- **Team configurations**: Agents are bundled in `/bmad-core/agent-teams/`
- **IDE permissions**: File access defined in `/tools/installer/config/ide-agent-config.yaml`
- **Workflows**: Agents collaborate through defined workflows in `/bmad-core/workflows/`
- **Shared resources**: Tasks, templates, and checklists in `/bmad-core/`

## Creating New Agents

To add a new agent:

1. Create agent file in this directory following the existing pattern
2. Add to relevant team configurations
3. Update IDE configuration if needed
4. Create supporting tasks/templates/checklists
5. Document the agent's purpose and capabilities

See the [Expansion Packs Guide](../../docs/expansion-packs.md) for more details on extending BMad Method.