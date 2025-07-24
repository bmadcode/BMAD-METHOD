# Create Expansion Pack Task

This task helps you create a sophisticated BMad expansion pack with advanced agent orchestration, template systems, and quality assurance patterns based on proven best practices.

## Understanding Expansion Packs

Expansion packs extend BMad with domain-specific capabilities using sophisticated AI agent orchestration patterns. They are self-contained packages that leverage:

- **Advanced Agent Architecture**: YAML-in-Markdown with embedded personas and character consistency
- **Template Systems**: LLM instruction embedding with conditional content and dynamic variables
- **Workflow Orchestration**: Decision trees, handoff protocols, and validation loops
- **Quality Assurance**: Multi-level validation with star ratings and comprehensive checklists
- **Knowledge Integration**: Domain-specific data organization and best practices embedding

Every expansion pack MUST include a custom BMad orchestrator agent with sophisticated command systems and numbered options protocols.

## CRITICAL REQUIREMENTS

1. **Create Planning Document First**: Before any implementation, create a comprehensive plan for user approval
2. **Agent Architecture Standards**: Use YAML-in-Markdown structure with activation instructions, personas, and command systems
3. **Character Consistency**: Every agent must have a persistent persona with name, communication style, and numbered options protocol similar to `expansion-packs/bmad-2d-phaser-game-dev/agents/game-designer.md`
4. **Custom Themed Orchestrator**: The orchestrator should embody the domain theme (e.g., Office Manager for medical, Project Lead for tech) for better user experience
5. **Core Utilities Required**: ALWAYS include these core files in every expansion pack:
   - `tasks/create-doc.md` - Document creation from templates
   - `tasks/execute-checklist.md` - Checklist validation
   - `utils/template-format.md` - Template markup conventions
   - `utils/workflow-management.md` - Workflow orchestration
6. **Team and Workflow Requirements**: If pack has >1 agent, MUST include:
   - At least one team configuration in `expansion-packs/{new-expansion}/agent-teams/`
   - At least one workflow in `expansion-packs/{new-expansion}workflows/`
7. **Template Sophistication**: Implement LLM instruction embedding with `[[LLM: guidance]]`, conditional content, and variable systems
8. **Workflow Orchestration**: Include decision trees, handoff protocols, and validation loops
9. **Quality Assurance Integration**: Multi-level checklists with star ratings and ready/not-ready frameworks
10. **Verify All References**: Any task, template, or data file referenced in an agent MUST exist in the pack
11. **Knowledge Base Integration**: Organize domain-specific data and embed best practices
12. **Dependency Management**: Clear manifest with file mappings and core agent dependencies

## Process Overview

### Phase 1: Discovery and Planning

#### 1.1 Define the Domain

Ask the user:

- **Pack Name**: Short identifier (e.g., `healthcare`, `fintech`, `gamedev`)
- **Display Name**: Full name (e.g., "Healthcare Compliance Pack")
- **Description**: What domain or industry does this serve?
- **Key Problems**: What specific challenges will this pack solve?
- **Target Users**: Who will benefit from this expansion?

#### 1.2 Gather Examples and Domain Intelligence

Request from the user:

- **Sample Documents**: Any existing documents in this domain
- **Workflow Examples**: How work currently flows in this domain
- **Compliance Needs**: Any regulatory or standards requirements
- **Output Examples**: What final deliverables look like
- **Character Personas**: What specialist roles exist (names, communication styles, expertise areas)
- **Domain Language**: Specific terminology, jargon, and communication patterns
- **Quality Standards**: Performance targets, success criteria, and validation requirements
- **Data Requirements**: What reference data files users will need to provide
- **Technology Stack**: Specific tools, frameworks, or platforms used in this domain
- **Common Pitfalls**: Frequent mistakes or challenges in this domain

#### 1.3 Create Planning Document

IMPORTANT: STOP HERE AND CREATE PLAN FIRST

Create `expansion-packs/{pack-name}/plan.md` with:

```markdown
# {Pack Name} Expansion Pack Plan

## Overview

- Pack Name: {name}
- Description: {description}
- Target Domain: {domain}

## Components to Create

### Agents (with Character Personas)

- [ ] {pack-name}-orchestrator (REQUIRED: Custom BMad orchestrator)
  - Character Name: {human-name}
  - Communication Style: {style}
  - Key Commands: {command-list}
- [ ] {agent-1-name}
  - Character Name: {human-name}
  - Expertise: {domain-expertise}
  - Persona: {personality-traits}
- [ ] {agent-2-name}
  - Character Name: {human-name}
  - Expertise: {domain-expertise}
  - Persona: {personality-traits}
- [ ] {agent-N-name}
  - Character Name: {human-name}
  - Expertise: {domain-expertise}
  - Persona: {personality-traits}

### Tasks

- [ ] {task-1} (referenced by: {agent})
- [ ] {task-2} (referenced by: {agent})

### Templates (with LLM Instruction Embedding)

- [ ] {template-1} (used by: {agent/task})
  - LLM Instructions: {guidance-type}
  - Conditional Content: {conditions}
  - Variables: {variable-list}
- [ ] {template-2} (used by: {agent/task})
  - LLM Instructions: {guidance-type}
  - Conditional Content: {conditions}
  - Variables: {variable-list}

### Checklists (Multi-Level Quality Assurance)

- [ ] {checklist-1}
  - Validation Level: {basic/comprehensive/expert}
  - Rating System: {star-ratings/binary}
  - Success Criteria: {specific-requirements}
- [ ] {checklist-2}
  - Validation Level: {basic/comprehensive/expert}
  - Rating System: {star-ratings/binary}
  - Success Criteria: {specific-requirements}

### Data Files and Knowledge Base

**Required from User:**

- [ ] {filename}.{ext} - {description of content needed}
- [ ] {filename2}.{ext} - {description of content needed}

**Domain Knowledge to Embed:**

- [ ] {domain}-best-practices.md - {description}
- [ ] {domain}-terminology.md - {description}
- [ ] {domain}-standards.md - {description}

**Workflow Orchestration:**

- [ ] Decision trees for {workflow-name}
- [ ] Handoff protocols between agents
- [ ] Validation loops and iteration patterns

## Approval

User approval received: [ ] Yes
```

Important: Wait for user approval before proceeding to Phase 2

### Phase 2: Component Design

#### 2.1 Create Orchestrator Agent with Domain-Themed Character

**FIRST PRIORITY**: Design the custom BMad orchestrator with domain-appropriate theme:

**Themed Character Design:**

- **Human Name**: {first-name} {last-name} (e.g., "Dr. Sarah Chen" for medical office manager)
- **Domain-Specific Role**: Match the orchestrator to the domain context:
  - Medical: "Office Manager" or "Practice Coordinator"
  - Legal: "Senior Partner" or "Case Manager"
  - Tech Startup: "Project Lead" or "Scrum Master"
  - Education: "Department Chair" or "Program Director"
- **Character Identity**: Professional background matching the domain theme
- **Communication Style**: Appropriate to the role (professional medical, formal legal, agile tech)
- **Domain Authority**: Natural leadership position in the field's hierarchy

**Command Architecture:**

- **Numbered Options Protocol**: All interactions use numbered lists for user selection
- **Domain-Specific Commands**: Specialized orchestration commands for the field
- **Help System**: Built-in command discovery and guidance
- **Handoff Protocols**: Structured transitions to specialist agents

**Technical Structure:**

- **Activation Instructions**: Embedded YAML with behavior directives
- **Startup Procedures**: Initialize without auto-execution
- **Dependencies**: Clear references to tasks, templates, and data files
- **Integration Points**: How it coordinates with core BMad agents

#### 2.2 Design Specialist Agents with Character Personas

For each additional agent, develop comprehensive character design:

**Character Development:**

- **Human Identity**: Full name, background, professional history
- **Personality Traits**: Communication style, work approach, quirks
- **Domain Expertise**: Specific knowledge areas and experience level
- **Professional Role**: Exact job title and responsibilities
- **Interaction Style**: How they communicate with users and other agents

**Technical Architecture:**

- **YAML-in-Markdown Structure**: Embedded activation instructions
- **Command System**: Numbered options protocol implementation
- **Startup Behavior**: Prevent auto-execution, await user direction
- **Unique Value Proposition**: What specialized capabilities they provide

**Dependencies and Integration:**

- **Required Tasks**: List ALL tasks this agent references (must exist)
- **Required Templates**: List ALL templates this agent uses (must exist)
- **Required Data**: List ALL data files this agent needs (must be documented)
- **Handoff Protocols**: How they interact with orchestrator and other agents
- **Quality Integration**: Which checklists they use for validation

#### 2.3 Design Specialized Tasks

For each task:

- **Purpose**: What specific action does it enable?
- **Inputs**: What information is needed?
- **Process**: Step-by-step instructions
- **Outputs**: What gets produced?
- **Agent Usage**: Which agents will use this task?

#### 2.4 Create Advanced Document Templates with LLM Instruction Embedding

For each template, implement sophisticated AI guidance systems:

**LLM Instruction Patterns:**

- **Step-by-Step Guidance**: `[[LLM: Present this section first, get user feedback, then proceed.]]`
- **Conditional Logic**: `^^CONDITION: condition_name^^` content `^^/CONDITION: condition_name^^`
- **Variable Systems**: `{{variable_placeholder}}` for dynamic content insertion
- **Iteration Controls**: `<<REPEAT section="name" count="variable">>` for repeatable blocks
- **User Feedback Loops**: Built-in validation and refinement points

**Template Architecture:**

- **Document Type**: Specific deliverable and its purpose
- **Structure**: Logical section organization with embedded instructions
- **Elicitation Triggers**: Advanced questioning techniques for content gathering
- **Domain Standards**: Industry-specific format and compliance requirements
- **Quality Markers**: Success criteria and validation checkpoints

**Content Design:**

- **Example Content**: Sample text to guide completion
- **Required vs Optional**: Clear marking of mandatory sections
- **Domain Terminology**: Proper use of field-specific language
- **Cross-References**: Links to related templates and checklists

#### 2.5 Design Multi-Level Quality Assurance Systems

For each checklist, implement comprehensive validation frameworks:

**Quality Assessment Levels:**

- **Basic Validation**: Essential completeness checks
- **Comprehensive Review**: Detailed quality and accuracy verification
- **Expert Assessment**: Advanced domain-specific evaluation criteria

**Rating Systems:**

- **Star Ratings**: 1-5 star quality assessments for nuanced evaluation
- **Binary Decisions**: Ready/Not Ready determinations with clear criteria
- **Improvement Recommendations**: Specific guidance for addressing deficiencies
- **Next Steps**: Clear direction for proceeding or iterating

**Checklist Architecture:**

- **Purpose Definition**: Specific quality aspects being verified
- **Usage Context**: When and by whom the checklist should be applied
- **Validation Items**: Specific, measurable criteria to evaluate
- **Success Criteria**: Clear standards for pass/fail determinations
- **Domain Standards**: Industry-specific requirements and best practices
- **Integration Points**: How checklists connect to agents and workflows

### Phase 3: Implementation

IMPORTANT: Only proceed after plan.md is approved

#### 3.1 Create Directory Structure

```

expansion-packs/
└── {pack-name}/
├── plan.md (ALREADY CREATED)
├── manifest.yaml
├── README.md
├── agents/
│ ├── {pack-name}-orchestrator.md (REQUIRED - Custom themed orchestrator)
│ └── {agent-id}.md (YAML-in-Markdown with persona)
├── data/
│ ├── {domain}-best-practices.md
│ ├── {domain}-terminology.md
│ └── {domain}-standards.md
├── tasks/
│ ├── create-doc.md (REQUIRED - Core utility)
│ ├── execute-checklist.md (REQUIRED - Core utility)
│ └── {task-name}.md (Domain-specific tasks)
├── utils/
│ ├── template-format.md (REQUIRED - Core utility)
│ └── workflow-management.md (REQUIRED - Core utility)
├── templates/
│ └── {template-name}.md
├── checklists/
│ └── {checklist-name}.md
├── workflows/
│ └── {domain}-workflow.md (REQUIRED if multiple agents)
└── agent-teams/
└── {domain}-team.yaml (REQUIRED if multiple agents)

```

#### 3.2 Create Manifest

Create `manifest.yaml`:

```yaml
name: {pack-name}
version: 1.0.0
description: >-
  {Detailed description of the expansion pack}
author: {Your name or organization}
bmad_version: "4.0.0"

# Files to create in the expansion pack
files:
  agents:
    - {pack-name}-orchestrator.md  # Domain-themed orchestrator (e.g., Office Manager)
    - {agent-name}.md              # YAML-in-Markdown with character persona

  data:
    - {domain}-best-practices.md   # Domain knowledge and standards
    - {domain}-terminology.md      # Field-specific language and concepts
    - {domain}-standards.md        # Quality and compliance requirements

  tasks:
    # Core utilities (REQUIRED - copy from bmad-core)
    - create-doc.md               # Document creation from templates
    - execute-checklist.md        # Checklist validation system
    # Domain-specific tasks
    - {task-name}.md              # Custom procedures with quality integration

  utils:
    # Core utilities (REQUIRED - copy from bmad-core)
    - template-format.md          # Template markup conventions
    - workflow-management.md      # Workflow orchestration system

  templates:
    - {template-name}.md          # LLM instruction embedding with conditionals

  checklists:
    - {checklist-name}.md         # Multi-level quality assurance systems

  workflows:
    - {domain}-workflow.md        # REQUIRED if multiple agents - decision trees

  agent-teams:
    - {domain}-team.yaml          # REQUIRED if multiple agents - team config

# Data files users must provide (in their bmad-core/data/ directory)
required_user_data:
  - filename: {data-file}.{ext}
    description: {What this file should contain}
    format: {specific format requirements}
    example: {sample content or structure}
    validation: {how to verify correctness}

# Knowledge base files embedded in expansion pack
embedded_knowledge:
  - {domain}-best-practices.md
  - {domain}-terminology.md
  - {domain}-standards.md

# Dependencies on core BMad components
core_dependencies:
  agents:
    - architect        # For system design
    - developer       # For implementation
    - qa-specialist   # For quality assurance
  tasks:
    - {core-task-name}
  workflows:
    - {core-workflow-name}

# Agent interaction patterns
agent_coordination:
  orchestrator: {pack-name}-orchestrator
  handoff_protocols: true
  numbered_options: true
  quality_integration: comprehensive

# Post-install message
post_install_message: |
  {Pack Name} expansion pack ready!

  🎯 ORCHESTRATOR: {Character Name} ({pack-name}-orchestrator)
  📋 AGENTS: {agent-count} specialized domain experts
  📝 TEMPLATES: {template-count} with LLM instruction embedding
  ✅ QUALITY: Multi-level validation with star ratings

  REQUIRED USER DATA FILES (place in bmad-core/data/):
  - {data-file}.{ext}: {description and format}
  - {data-file-2}.{ext}: {description and format}

  QUICK START:
  1. Add required data files to bmad-core/data/
  2. Run: npm run agent {pack-name}-orchestrator
  3. Follow {Character Name}'s numbered options

  EMBEDDED KNOWLEDGE:
  - Domain best practices and terminology
  - Quality standards and validation criteria
  - Workflow orchestration with handoff protocols
```

### Phase 4: Content Creation

IMPORTANT: Work through plan.md checklist systematically!

#### 4.1 Create Orchestrator First with Domain-Themed Character

**Step 1: Domain-Themed Character Design**

1. Define character persona matching the domain context:
   - Medical: "Dr. Emily Rodriguez, Practice Manager"
   - Legal: "Robert Sterling, Senior Partner"
   - Tech: "Alex Chen, Agile Project Lead"
   - Education: "Professor Maria Santos, Department Chair"
2. Make the orchestrator feel like a natural leader in that domain
3. Establish communication style matching professional norms
4. Design numbered options protocol themed to the domain
5. Create command system with domain-specific terminology

**Step 2: Copy Core Utilities**

Before proceeding, copy these essential files from common:

```bash
# Copy core task utilities
cp common/tasks/create-doc.md expansion-packs/{pack-name}/tasks/
cp common/tasks/execute-checklist.md expansion-packs/{pack-name}/tasks/

# Copy core utility files
mkdir -p expansion-packs/{pack-name}/utils
cp common/utils/template-format.md expansion-packs/{pack-name}/utils/
cp common/utils/workflow-management.md expansion-packs/{pack-name}/utils/
```

**Step 3: Technical Implementation**

1. Create `agents/{pack-name}-orchestrator.md` with YAML-in-Markdown structure:

   ```yaml
   activation-instructions:
     - Follow all instructions in this file
     - Stay in character as {Character Name} until exit
     - Use numbered options protocol for all interactions

   agent:
     name: {Character Name}
     id: {pack-name}-orchestrator
     title: {Professional Title}
     icon: {emoji}
     whenToUse: {clear usage guidance}

   persona:
     role: {specific professional role}
     style: {communication approach}
     identity: {character background}
     focus: {primary expertise area}

   core_principles:
     - {principle 1}
     - {principle 2}

   startup:
     - {initialization steps}
     - CRITICAL: Do NOT auto-execute

   commands:
     - {command descriptions with numbers}

   dependencies:
     tasks: {required task list}
     templates: {required template list}
     checklists: {quality checklist list}
   ```

**Step 4: Workflow and Team Integration**

1. Design decision trees for workflow branching
2. Create handoff protocols to specialist agents
3. Implement validation loops and quality checkpoints
4. **If multiple agents**: Create team configuration in `agent-teams/{domain}-team.yaml`
5. **If multiple agents**: Create workflow in `workflows/{domain}-workflow.md`
6. Ensure orchestrator references workflow-management utility
7. Verify ALL referenced tasks exist (including core utilities)
8. Verify ALL referenced templates exist
9. Document data file requirements

#### 4.2 Specialist Agent Creation with Character Development

For each additional agent, follow comprehensive character development:

**Character Architecture:**

1. Design complete persona with human name, background, and personality
2. Define communication style and professional quirks
3. Establish domain expertise and unique value proposition
4. Create numbered options protocol for interactions

**Technical Implementation:**

1. Create `agents/{agent-id}.md` with YAML-in-Markdown structure
2. Embed activation instructions and startup procedures
3. Define command system with domain-specific options
4. Document dependencies on tasks, templates, and data

**Quality Assurance:**

1. **STOP** - Verify all referenced tasks/templates exist
2. Create any missing tasks/templates immediately
3. Test handoff protocols with orchestrator
4. Validate checklist integration
5. Mark agent as complete in plan.md

**Agent Interaction Design:**

1. Define how agent receives handoffs from orchestrator
2. Specify how agent communicates progress and results
3. Design transition protocols to other agents or back to orchestrator
4. Implement quality validation before handoff completion

#### 4.3 Advanced Task Creation with Quality Integration

Each task should implement sophisticated procedure design:

**Core Structure:**

1. Clear, single purpose with measurable outcomes
2. Step-by-step instructions with decision points
3. Prerequisites and validation requirements
4. Quality assurance integration points
5. Success criteria and completion validation

**Content Design:**

1. Domain-specific procedures and best practices
2. Risk mitigation strategies and common pitfalls
3. Integration with checklists and quality systems
4. Handoff protocols and communication templates
5. Examples and sample outputs

**Reusability Patterns:**

1. Modular design for use across multiple agents
2. Parameterized procedures for different contexts
3. Clear dependency documentation
4. Cross-reference to related tasks and templates
5. Version control and update procedures

#### 4.4 Advanced Template Design with LLM Instruction Embedding

Templates should implement sophisticated AI guidance systems:

**LLM Instruction Patterns:**

1. **Step-by-Step Guidance**: `[[LLM: Present this section first, gather user input, then proceed to next section.]]`
2. **Conditional Content**: `^^CONDITION: project_type == "complex"^^` advanced content `^^/CONDITION: project_type^^`
3. **Dynamic Variables**: `{{project_name}}`, `{{stakeholder_list}}`, `{{technical_requirements}}`
4. **Iteration Controls**: `<<REPEAT section="stakeholder" count="{{stakeholder_count}}">>` repeatable blocks `<</REPEAT>>`
5. **User Feedback Loops**: Built-in validation and refinement prompts

**Content Architecture:**

1. Progressive disclosure with guided completion
2. Domain-specific terminology and standards
3. Quality markers and success criteria
4. Cross-references to checklists and validation tools
5. Advanced elicitation techniques for comprehensive content gathering

**Template Intelligence:**

1. Adaptive content based on project complexity or type
2. Intelligent placeholder replacement with context awareness
3. Validation triggers for completeness and quality
4. Integration with quality assurance checklists
5. Export and formatting options for different use cases

### Phase 5: Workflow Orchestration and Quality Systems

#### 5.1 Create Workflow Orchestration

**Decision Tree Design:**

1. Map primary workflow paths and decision points
2. Create branching logic for different project types or complexity levels
3. Design conditional workflow sections using `^^CONDITION:^^` syntax
4. Include visual flowcharts using Mermaid diagrams

**Handoff Protocol Implementation:**

1. Define explicit handoff prompts between agents
2. Create success criteria for each workflow phase
3. Implement validation loops and iteration patterns
4. Design story development guidance for complex implementations

**Workflow File Structure:**

```markdown
# {Domain} Primary Workflow

## Decision Tree

[Mermaid flowchart]

## Workflow Paths

### Path 1: {scenario-name}

^^CONDITION: condition_name^^
[Workflow steps with agent handoffs]
^^/CONDITION: condition_name^^

### Path 2: {scenario-name}

[Alternative workflow steps]

## Quality Gates

[Validation checkpoints throughout workflow]
```

### Phase 6: Verification and Documentation

#### 6.1 Comprehensive Verification System

Before declaring complete:

**Character and Persona Validation:**

1. [ ] All agents have complete character personas with names and backgrounds
2. [ ] Communication styles are consistent and domain-appropriate
3. [ ] Numbered options protocol implemented across all agents
4. [ ] Command systems are comprehensive with help functionality

**Technical Architecture Validation:**

1. [ ] All agents use YAML-in-Markdown structure with activation instructions
2. [ ] Startup procedures prevent auto-execution
3. [ ] All agent references validated (tasks, templates, data)
4. [ ] Handoff protocols tested between agents

**Template and Quality System Validation:**

1. [ ] Templates include LLM instruction embedding
2. [ ] Conditional content and variable systems implemented
3. [ ] Multi-level quality assurance checklists created
4. [ ] Star rating and ready/not-ready systems functional

**Workflow and Integration Validation:**

1. [ ] Decision trees and workflow orchestration complete
2. [ ] Knowledge base files embedded (best practices, terminology, standards)
3. [ ] Manifest.yaml reflects all components and dependencies
4. [ ] All items in plan.md marked complete
5. [ ] No orphaned tasks or templates

#### 6.2 Create Comprehensive Documentation

**README Structure with Character Introduction:**

```markdown
# {Pack Name} Expansion Pack

## Meet Your {Domain} Team

### 🎯 {Character Name} - {Pack Name} Orchestrator

_{Professional background and expertise}_

{Character Name} is your {domain} project coordinator who will guide you through the complete {domain} development process using numbered options and structured workflows.

### 💼 Specialist Agents

- **{Agent 1 Name}** - {Role and expertise}
- **{Agent 2 Name}** - {Role and expertise}

## Quick Start

1. **Prepare Data Files** (place in `bmad-core/data/`):

   - `{file1}.{ext}` - {description}
   - `{file2}.{ext}` - {description}

2. **Launch Orchestrator**:

   npm run agent {pack-name}-orchestrator

3. **Follow Numbered Options**: {Character Name} will present numbered choices for each decision

4. **Quality Assurance**: Multi-level validation with star ratings ensures excellence

## Advanced Features

- **LLM Template System**: Intelligent document generation with conditional content
- **Workflow Orchestration**: Decision trees and handoff protocols
- **Character Consistency**: Persistent personas across all interactions
- **Quality Integration**: Comprehensive validation at every step

## Components

### Agents ({agent-count})

[List with character names and roles]

### Templates ({template-count})

[List with LLM instruction features]

### Quality Systems

[List checklists and validation tools]

### Knowledge Base

[Embedded domain expertise]
```

#### 6.3 Advanced Data File Documentation with Validation

For each required data file, provide comprehensive guidance:

## Required User Data Files

### {filename}.{ext}

- **Purpose**: {why this file is needed by which agents}
- **Format**: {specific file format and structure requirements}
- **Location**: Place in `bmad-core/data/`
- **Validation**: {how agents will verify the file is correct}
- **Example Structure**:

{sample content showing exact format}

```text
- **Common Mistakes**: {frequent errors and how to avoid them}
- **Quality Criteria**: {what makes this file high-quality}

### Integration Notes
- **Used By**: {list of agents that reference this file}
- **Frequency**: {how often the file is accessed}
- **Updates**: {when and how to update the file}
- **Validation Commands**: {any CLI commands to verify file correctness}
```

## Embedded Knowledge Base

The expansion pack includes comprehensive domain knowledge:

- **{domain}-best-practices.md**: Industry standards and proven methodologies
- **{domain}-terminology.md**: Field-specific language and concept definitions
- **{domain}-standards.md**: Quality criteria and compliance requirements

These files are automatically available to all agents and don't require user setup.

## Example: Healthcare Expansion Pack with Advanced Architecture

```text
healthcare/
├── plan.md (Created first for approval)
├── manifest.yaml (with dependency mapping and character descriptions)
├── README.md (featuring character introductions and numbered options)
├── agents/
│   ├── healthcare-orchestrator.md (Dr. Sarah Chen - YAML-in-Markdown)
│   ├── clinical-analyst.md (Marcus Rivera - Research Specialist)
│   └── compliance-officer.md (Jennifer Walsh - Regulatory Expert)
├── data/
│   ├── healthcare-best-practices.md (embedded domain knowledge)
│   ├── healthcare-terminology.md (medical language and concepts)
│   └── healthcare-standards.md (HIPAA, FDA, clinical trial requirements)
├── tasks/
│   ├── hipaa-assessment.md (with quality integration and checklists)
│   ├── clinical-protocol-review.md (multi-step validation process)
│   └── patient-data-analysis.md (statistical analysis with safety checks)
├── templates/
│   ├── clinical-trial-protocol.md (LLM instructions with conditionals)
│   ├── hipaa-compliance-report.md ({{variables}} and validation triggers)
│   └── patient-outcome-report.md (star rating system integration)
├── checklists/
│   ├── hipaa-checklist.md (multi-level: basic/comprehensive/expert)
│   ├── clinical-data-quality.md (star ratings with improvement recommendations)
│   └── regulatory-compliance.md (ready/not-ready with next steps)
├── workflows/
│   ├── clinical-trial-workflow.md (decision trees with Mermaid diagrams)
│   └── compliance-audit-workflow.md (handoff protocols and quality gates)
└── agent-teams/
    └── healthcare-team.yaml (coordinated team configurations)

Required user data files (bmad-core/data/):
- medical-terminology.md (institution-specific terms and abbreviations)
- hipaa-requirements.md (organization's specific compliance requirements)
- clinical-protocols.md (standard operating procedures and guidelines)

Embedded knowledge (automatic):
- Healthcare best practices and proven methodologies
- Medical terminology and concept definitions
- Regulatory standards (HIPAA, FDA, GCP) and compliance requirements
```

### Character Examples from Healthcare Pack

**Dr. Sarah Chen** - Healthcare Practice Manager (Orchestrator)

- _Domain Role_: Medical Office Manager with clinical background
- _Background_: 15 years clinical research, MD/PhD, practice management expertise
- _Style_: Professional medical demeanor, uses numbered options, explains workflows clearly
- _Commands_: Patient flow management, clinical trial coordination, staff scheduling, compliance oversight
- _Theme Integration_: Acts as the central coordinator a patient would expect in a medical practice

**Marcus Rivera** - Clinical Data Analyst

- _Background_: Biostatistician, clinical trials methodology, data integrity specialist
- _Style_: Detail-oriented, methodical, uses statistical terminology appropriately
- _Commands_: Statistical analysis, data validation, outcome measurement, safety monitoring

**Jennifer Walsh** - Regulatory Compliance Officer

- _Background_: Former FDA reviewer, 20 years regulatory affairs, compliance auditing
- _Style_: Thorough, systematic, risk-focused, uses regulatory language precisely
- _Commands_: Compliance audit, regulatory filing, risk assessment, documentation review

## Advanced Interactive Questions Flow

### Initial Discovery and Character Development

1. "What domain or industry will this expansion pack serve?"
2. "What are the main challenges or workflows in this domain?"
3. "Do you have any example documents or outputs? (Please share)"
4. "What specialized roles/experts exist in this domain? (I need to create character personas for each)"
5. "For each specialist role, what would be an appropriate professional name and background?"
6. "What communication style would each character use? (formal, casual, technical, etc.)"
7. "What reference data will users need to provide?"
8. "What domain-specific knowledge should be embedded in the expansion pack?"
9. "What quality standards or compliance requirements exist in this field?"
10. "What are the typical workflow decision points where users need guidance?"

### Planning Phase

1. "Here's the proposed plan. Please review and approve before we continue."

### Orchestrator Character and Command Design

1. "What natural leadership role exists in {domain}? (e.g., Office Manager, Project Lead, Department Head)"
2. "What should the orchestrator character's name and professional background be to match this role?"
3. "What communication style fits this domain role? (medical professional, legal formal, tech agile)"
4. "What domain-specific commands should the orchestrator support using numbered options?"
5. "How many specialist agents will this pack include? (determines if team/workflow required)"
6. "What's the typical workflow from start to finish, including decision points?"
7. "Where in the workflow should users choose between different paths?"
8. "How should the orchestrator hand off to specialist agents?"
9. "What quality gates should be built into the workflow?"
10. "How should it integrate with core BMad agents?"

### Agent Planning

1. "For agent '{name}', what is their specific expertise?"
2. "What tasks will this agent reference? (I'll create them)"
3. "What templates will this agent use? (I'll create them)"
4. "What data files will this agent need? (You'll provide these)"

### Task Design

1. "Describe the '{task}' process step-by-step"
2. "What information is needed to complete this task?"
3. "What should the output look like?"

### Template Creation

1. "What sections should the '{template}' document have?"
2. "Are there any required formats or standards?"
3. "Can you provide an example of a completed document?"

### Data Requirements

1. "For {data-file}, what information should it contain?"
2. "What format should this data be in?"
3. "Can you provide a sample?"

## Critical Advanced Considerations

**Character and Persona Architecture:**

- **Character Consistency**: Every agent needs a persistent human persona with name, background, and communication style
- **Numbered Options Protocol**: ALL agent interactions must use numbered lists for user selections
- **Professional Authenticity**: Characters should reflect realistic expertise and communication patterns for their domain

**Technical Architecture Requirements:**

- **YAML-in-Markdown Structure**: All agents must use embedded activation instructions and configuration
- **LLM Template Intelligence**: Templates need instruction embedding with conditionals and variables
- **Quality Integration**: Multi-level validation systems with star ratings and ready/not-ready frameworks

**Workflow and Orchestration:**

- **Decision Trees**: Workflows must include branching logic and conditional paths
- **Handoff Protocols**: Explicit procedures for agent-to-agent transitions
- **Knowledge Base Embedding**: Domain expertise must be built into the pack, not just referenced

**Quality and Validation:**

- **Plan First**: ALWAYS create and get approval for plan.md before implementing
- **Orchestrator Required**: Every pack MUST have a custom BMad orchestrator with sophisticated command system
- **Verify References**: ALL referenced tasks/templates MUST exist and be tested
- **Multi-Level Validation**: Quality systems must provide basic, comprehensive, and expert-level assessment
- **Domain Expertise**: Ensure accuracy in specialized fields with embedded best practices
- **Compliance Integration**: Include necessary regulatory requirements as embedded knowledge

## Advanced Success Strategies

**Character Development Excellence:**

1. **Create Believable Personas**: Each agent should feel like a real professional with authentic expertise
2. **Maintain Communication Consistency**: Character voices should remain consistent across all interactions
3. **Design Professional Relationships**: Show how characters work together and hand off responsibilities

**Technical Implementation Excellence:**

1. **Plan Thoroughly**: The plan.md prevents missing components and ensures character consistency
2. **Build Orchestrator First**: It defines the overall workflow and establishes the primary character voice
3. **Implement Template Intelligence**: Use LLM instruction embedding for sophisticated document generation
4. **Create Quality Integration**: Every task should connect to validation checklists and quality systems

**Workflow and Quality Excellence:**

1. **Design Decision Trees**: Map out all workflow branching points and conditional paths
2. **Test Handoff Protocols**: Ensure smooth transitions between agents with clear success criteria
3. **Embed Domain Knowledge**: Include best practices, terminology, and standards as built-in knowledge
4. **Validate Continuously**: Check off items in plan.md and test all references throughout development
5. **Document Comprehensively**: Users need clear instructions for data files, character introductions, and quality expectations

## Advanced Mistakes to Avoid

**Character and Persona Mistakes:**

1. **Generic Orchestrator**: Creating a bland orchestrator instead of domain-themed character (e.g., "Orchestrator" vs "Office Manager")
2. **Generic Characters**: Creating agents without distinct personalities, names, or communication styles
3. **Inconsistent Voices**: Characters that sound the same or change personality mid-conversation
4. **Missing Professional Context**: Agents without believable expertise or domain authority
5. **No Numbered Options**: Failing to implement the numbered selection protocol

**Technical Architecture Mistakes:**

1. **Missing Core Utilities**: Not including create-doc.md, execute-checklist.md, template-format.md, workflow-management.md
2. **Simple Agent Structure**: Using basic YAML instead of YAML-in-Markdown with embedded instructions
3. **Basic Templates**: Creating simple templates without LLM instruction embedding or conditional content
4. **Missing Quality Integration**: Templates and tasks that don't connect to validation systems
5. **Weak Command Systems**: Orchestrators without sophisticated command interfaces and help systems
6. **Missing Team/Workflow**: Not creating team and workflow files when pack has multiple agents

**Workflow and Content Mistakes:**

1. **Linear Workflows**: Creating workflows without decision trees or branching logic
2. **Missing Handoff Protocols**: Agents that don't properly transition work to each other
3. **External Dependencies**: Requiring users to provide knowledge that should be embedded in the pack
4. **Orphaned References**: Agent references task that doesn't exist
5. **Unclear Data Needs**: Not specifying required user data files with validation criteria
6. **Skipping Plan**: Going straight to implementation without comprehensive planning
7. **Generic Orchestrator**: Not making the orchestrator domain-specific with appropriate character and commands

## Advanced Completion Checklist

**Character and Persona Completion:**

- [ ] All agents have complete character development (names, backgrounds, communication styles)
- [ ] Numbered options protocol implemented across all agent interactions
- [ ] Character consistency maintained throughout all content
- [ ] Professional authenticity verified for domain expertise

**Technical Architecture Completion:**

- [ ] All agents use YAML-in-Markdown structure with activation instructions
- [ ] Orchestrator has domain-themed character (not generic)
- [ ] Core utilities copied: create-doc.md, execute-checklist.md, template-format.md, workflow-management.md
- [ ] Templates include LLM instruction embedding with conditionals and variables
- [ ] Multi-level quality assurance systems implemented (basic/comprehensive/expert)
- [ ] Command systems include help functionality and domain-specific options
- [ ] Team configuration created if multiple agents
- [ ] Workflow created if multiple agents

**Workflow and Quality Completion:**

- [ ] Decision trees and workflow branching implemented
- [ ] Workflow file created if pack has multiple agents
- [ ] Team configuration created if pack has multiple agents
- [ ] Handoff protocols tested between all agents
- [ ] Knowledge base embedded (best practices, terminology, standards)
- [ ] Quality integration connects tasks to checklists and validation
- [ ] Core utilities properly referenced in agent dependencies

**Standard Completion Verification:**

- [ ] plan.md created and approved with character details
- [ ] All plan.md items checked off including persona development
- [ ] Orchestrator agent created with sophisticated character and command system
- [ ] All agent references verified (tasks, templates, data, checklists)
- [ ] Data requirements documented with validation criteria and examples
- [ ] README includes character introductions and numbered options explanation
- [ ] manifest.yaml reflects actual files with dependency mapping and character descriptions

**Advanced Quality Gates:**

- [ ] Star rating systems functional in quality checklists
- [ ] Ready/not-ready decision frameworks implemented
- [ ] Template conditional content tested with different scenarios
- [ ] Workflow decision trees validated with sample use cases
- [ ] Character interactions tested for consistency and professional authenticity
