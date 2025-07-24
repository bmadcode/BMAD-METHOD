# Create Expansion Pack Task

This task helps you create a comprehensive BMAD expansion pack that can include new agents, tasks, templates, and checklists for a specific domain.

## Understanding Expansion Packs

Expansion packs extend BMAD with domain-specific capabilities. They are self-contained packages that can be installed into any BMAD project. Every expansion pack MUST include a custom BMAD orchestrator agent that manages the domain-specific workflow.

## CRITICAL REQUIREMENTS

1. **Create Planning Document First**: Before any implementation, create a concise task list for user approval
2. **Verify All References**: Any task, template, or data file referenced in an agent MUST exist in the pack
3. **Include Orchestrator**: Every pack needs a custom BMAD-style orchestrator agent
4. **User Data Requirements**: Clearly specify any files users must provide in their data folder

## Process Overview

### Phase 1: Discovery and Planning

#### 1.1 Define the Domain

Ask the user:

- **Pack Name**: Short identifier (e.g., `healthcare`, `fintech`, `gamedev`)
- **Display Name**: Full name (e.g., "Healthcare Compliance Pack")
- **Description**: What domain or industry does this serve?
- **Key Problems**: What specific challenges will this pack solve?
- **Target Users**: Who will benefit from this expansion?

#### 1.2 Gather Examples

Request from the user:

- **Sample Documents**: Any existing documents in this domain
- **Workflow Examples**: How work currently flows in this domain
- **Compliance Needs**: Any regulatory or standards requirements
- **Output Examples**: What final deliverables look like
- **Data Requirements**: What reference data files users will need to provide

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

### Agents

- [ ] {pack-name}-orchestrator (REQUIRED: Custom BMAD orchestrator)
- [ ] {agent-1-name}
- [ ] {agent-2-name}

### Tasks

- [ ] {task-1} (referenced by: {agent})
- [ ] {task-2} (referenced by: {agent})

### Templates

- [ ] {template-1} (used by: {agent/task})
- [ ] {template-2} (used by: {agent/task})

### Checklists

- [ ] {checklist-1}
- [ ] {checklist-2}

### Data Files Required from User

- [ ] {filename}.{ext} - {description of content needed}
- [ ] {filename2}.{ext} - {description of content needed}

## Approval

User approval received: [ ] Yes
```text

Important: Wait for user approval before proceeding to Phase 2

### Phase 2: Component Design

#### 2.1 Create Orchestrator Agent

**FIRST PRIORITY**: Design the custom BMAD orchestrator:

- **Name**: `{pack-name}-orchestrator`
- **Purpose**: Master coordinator for domain-specific workflow
- **Key Commands**: Domain-specific orchestration commands
- **Integration**: How it leverages other pack agents
- **Workflow**: The complete process it manages

#### 2.2 Identify Specialist Agents

For each additional agent:

- **Role**: What specialist is needed?
- **Expertise**: Domain-specific knowledge required
- **Interactions**: How they work with orchestrator and BMAD agents
- **Unique Value**: What can't existing agents handle?
- **Required Tasks**: List ALL tasks this agent references
- **Required Templates**: List ALL templates this agent uses
- **Required Data**: List ALL data files this agent needs

#### 2.3 Design Specialized Tasks

For each task:

- **Purpose**: What specific action does it enable?
- **Inputs**: What information is needed?
- **Process**: Step-by-step instructions
- **Outputs**: What gets produced?
- **Agent Usage**: Which agents will use this task?

#### 2.4 Create Document Templates

For each template:

- **Document Type**: What kind of document?
- **Structure**: Sections and organization
- **Placeholders**: Variable content areas
- **Instructions**: How to complete each section
- **Standards**: Any format requirements

#### 2.5 Define Checklists

For each checklist:

- **Purpose**: What quality aspect does it verify?
- **Scope**: When should it be used?
- **Items**: Specific things to check
- **Criteria**: Pass/fail conditions

### Phase 3: Implementation

IMPORTANT: Only proceed after plan.md is approved

#### 3.1 Create Directory Structure

```text
expansion-packs/
└── {pack-name}/
    ├── plan.md (ALREADY CREATED)
    ├── manifest.yml
    ├── README.md
    ├── agents/
    │   ├── {pack-name}-orchestrator.yml (REQUIRED)
    │   └── {agent-id}.yml
    ├── personas/
    │   ├── {pack-name}-orchestrator.md (REQUIRED)
    │   └── {agent-id}.md
    ├── tasks/
    │   └── {task-name}.md
    ├── templates/
    │   └── {template-name}.md
    ├── checklists/
    │   └── {checklist-name}.md
    └── ide-agents/
        ├── {pack-name}-orchestrator.ide.md (REQUIRED)
        └── {agent-id}.ide.md
```text

#### 3.2 Create Manifest

Create `manifest.yml`:

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
    - {pack-name}-orchestrator.yml
    - {agent-name}.yml

  personas:
    - {pack-name}-orchestrator.md
    - {agent-name}.md

  ide-agents:
    - {pack-name}-orchestrator.ide.md
    - {agent-name}.ide.md

  tasks:
    - {task-name}.md

  templates:
    - {template-name}.md

  checklists:
    - {checklist-name}.md

# Data files users must provide
required_data:
  - filename: {data-file}.{ext}
    description: {What this file should contain}
    location: bmad-core/data/

# Dependencies on core BMAD components
dependencies:
  - {core-agent-name}
  - {core-task-name}

# Post-install message
post_install_message: |
  {Pack Name} expansion pack ready!

  Required data files:
  - {data-file}.{ext}: {description}

  To use: npm run agent {pack-name}-orchestrator
```text

### Phase 4: Content Creation

IMPORTANT: Work through plan.md checklist systematically!

#### 4.1 Create Orchestrator First

1. Create `personas/{pack-name}-orchestrator.md` with BMAD-style commands
2. Create `agents/{pack-name}-orchestrator.yml` configuration
3. Create `ide-agents/{pack-name}-orchestrator.ide.md`
4. Verify ALL referenced tasks exist
5. Verify ALL referenced templates exist
6. Document data file requirements

#### 4.2 Agent Creation Order

For each additional agent:

1. Create persona file with domain expertise
2. Create agent configuration YAML
3. Create IDE-optimized version
4. **STOP** - Verify all referenced tasks/templates exist
5. Create any missing tasks/templates immediately
6. Mark agent as complete in plan.md

#### 4.3 Task Creation Guidelines

Each task should:

1. Have a clear, single purpose
2. Include step-by-step instructions
3. Provide examples when helpful
4. Reference domain standards
5. Be reusable across agents

#### 4.4 Template Best Practices

Templates should:

1. Include clear section headers
2. Provide inline instructions
3. Show example content
4. Mark required vs optional sections
5. Include domain-specific terminology

### Phase 5: Verification and Documentation

#### 5.1 Final Verification Checklist

Before declaring complete:

1. [ ] All items in plan.md marked complete
2. [ ] Orchestrator agent created and tested
3. [ ] All agent references validated
4. [ ] All required data files documented
5. [ ] manifest.yml lists all components
6. [ ] No orphaned tasks or templates

#### 5.2 Create README

Include:

- Overview of the pack's purpose
- **Orchestrator usage instructions**
- Required data files and formats
- List of all components
- Integration with BMAD workflow
- Example scenarios

#### 5.3 Data File Documentation

For each required data file:

```markdown
## Required Data Files

### {filename}.{ext}

- **Purpose**: {why this file is needed}
- **Format**: {file format and structure}
- **Location**: Place in `bmad-core/data/`
- **Example**:
```

## Example: Healthcare Expansion Pack

```text
healthcare/
├── plan.md (Created first for approval)
├── manifest.yml
├── README.md
├── agents/
│   ├── healthcare-orchestrator.yml (REQUIRED)
│   ├── clinical-analyst.yml
│   └── compliance-officer.yml
├── personas/
│   ├── healthcare-orchestrator.md (REQUIRED)
│   ├── clinical-analyst.md
│   └── compliance-officer.md
├── ide-agents/
│   ├── healthcare-orchestrator.ide.md (REQUIRED)
│   ├── clinical-analyst.ide.md
│   └── compliance-officer.ide.md
├── tasks/
│   ├── hipaa-assessment.md
│   ├── clinical-protocol-review.md
│   └── patient-data-analysis.md
├── templates/
│   ├── clinical-trial-protocol.md
│   ├── hipaa-compliance-report.md
│   └── patient-outcome-report.md
└── checklists/
    ├── hipaa-checklist.md
    └── clinical-data-quality.md

Required user data files:
- bmad-core/data/medical-terminology.md
- bmad-core/data/hipaa-requirements.md
```

## Interactive Questions Flow

### Initial Discovery

1. "What domain or industry will this expansion pack serve?"
2. "What are the main challenges or workflows in this domain?"
3. "Do you have any example documents or outputs? (Please share)"
4. "What specialized roles/experts exist in this domain?"
5. "What reference data will users need to provide?"

### Planning Phase

1. "Here's the proposed plan. Please review and approve before we continue."

### Orchestrator Design

1. "What key commands should the {pack-name} orchestrator support?"
2. "What's the typical workflow from start to finish?"
3. "How should it integrate with core BMAD agents?"

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

## Important Considerations

- **Plan First**: ALWAYS create and get approval for plan.md before implementing
- **Orchestrator Required**: Every pack MUST have a custom BMAD orchestrator
- **Verify References**: ALL referenced tasks/templates MUST exist
- **Document Data Needs**: Clearly specify what users must provide
- **Domain Expertise**: Ensure accuracy in specialized fields
- **Compliance**: Include necessary regulatory requirements

## Tips for Success

1. **Plan Thoroughly**: The plan.md prevents missing components
2. **Build Orchestrator First**: It defines the overall workflow
3. **Verify As You Go**: Check off items in plan.md
4. **Test References**: Ensure no broken dependencies
5. **Document Data**: Users need clear data file instructions

## Common Mistakes to Avoid

1. **Missing Orchestrator**: Every pack needs its own BMAD-style orchestrator
2. **Orphaned References**: Agent references task that doesn't exist
3. **Unclear Data Needs**: Not specifying required user data files
4. **Skipping Plan**: Going straight to implementation
5. **Generic Orchestrator**: Not making it domain-specific

## Completion Checklist

- [ ] plan.md created and approved
- [ ] All plan.md items checked off
- [ ] Orchestrator agent created
- [ ] All agent references verified
- [ ] Data requirements documented or added
- [ ] README includes all setup instructions
- [ ] manifest.yml reflects actual files
