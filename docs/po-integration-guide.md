# Product Owner (Sarah) Integration Guide

## Overview

This guide explains how to integrate Sarah, the Product Owner persona, into your development workflow, including setup instructions, configuration options, and best practices for different environments and agile frameworks.

## Table of Contents

1. [Web Environment Integration](#web-environment-integration)
2. [IDE Environment Integration](#ide-environment-integration)
3. [BMAD Method Workflow Integration](#bmad-method-workflow-integration)
4. [Agile Framework Integration](#agile-framework-integration)
5. [Third-Party Tool Integration](#third-party-tool-integration)
6. [Configuration Options](#configuration-options)

## Web Environment Integration

### Setup Instructions

1. **Access the Web Orchestrator**
   - Navigate to your preferred AI platform (ChatGPT, Claude, etc.)
   - Create a new conversation for product ownership activities

2. **Load the Product Owner Persona**
   - Copy the contents of `bmad-agent/personas/po.md`
   - Paste as your first message to activate Sarah

3. **Activate the Persona**
   - Use an activation phrase: "I need Sarah to help prepare user stories for development"
   - Provide initial project context and requirements

### Usage in Web Environment

```
"Sarah, I have a PRD for a customer management system that needs to be broken down into user stories. The system needs to handle customer registration, profile management, and communication preferences. Our development team works in 2-week sprints and prefers stories that can be completed within a single sprint.

Here are the key requirements:
- Customer registration with email verification
- Profile editing with photo upload
- Communication preference management
- Integration with existing CRM system
- Mobile-responsive design
- GDPR compliance for data handling

Please create sprint-ready user stories with detailed acceptance criteria."
```

### Output Handling

- **User Stories**: Save stories to your project management tool (Jira, Azure DevOps, etc.)
- **Acceptance Criteria**: Use as basis for test case development and validation
- **Dependency Maps**: Incorporate into sprint planning and release planning
- **Quality Reports**: Use for stakeholder communication and project status updates

## IDE Environment Integration

### Supported IDEs

- **Cursor AI**: Full integration with story creation and backlog management
- **Claude Code**: Complete context-aware product ownership assistance
- **Cline**: Terminal-based story preparation and validation
- **Roocode**: Visual story mapping and backlog organization

### Setup Instructions

#### Cursor AI Setup

1. Install Cursor AI from [cursor.sh](https://cursor.sh)
2. Copy `bmad-agent/personas/po.md` to your project root
3. Open the file in Cursor
4. Use Cursor's chat feature: "I need Sarah to help with story preparation"

#### Claude Code Setup

1. Access Claude Code in your development environment
2. Load `bmad-agent/personas/po.md` as context
3. Request product ownership support: "Sarah, help me prepare stories for development"

#### Cline Setup

1. Install Cline from [cline.tools](https://cline.tools)
2. Reference the persona file in your chat
3. Activate: "I need product ownership guidance from Sarah"

#### Roocode Setup

1. Install Roocode
2. Import the product owner persona configuration
3. Activate product ownership mode

### Usage in IDE Environment

```
"Sarah, I'm working on a feature branch for user authentication. I have the technical requirements from the architect, but I need to create proper user stories with acceptance criteria for the development team.

The feature includes:
- Login/logout functionality
- Password reset flow
- Multi-factor authentication
- Session management
- Account lockout after failed attempts

The team uses TypeScript with React frontend and Node.js backend. We follow test-driven development practices and need stories that include testing requirements."
```

## BMAD Method Workflow Integration

### Integration Points

Sarah integrates at key points in the BMAD workflow:

1. **After Product Management (John)**
   - Transform PRD into actionable user stories
   - Validate requirements completeness and clarity
   - Create detailed acceptance criteria for each feature

2. **After System Architecture (Fred)**
   - Ensure stories align with technical architecture
   - Incorporate technical constraints into story definitions
   - Validate technical feasibility of story implementations

3. **After UX/UI Design (Veronica/Victor)**
   - Integrate design specifications into story acceptance criteria
   - Ensure stories support design system implementation
   - Coordinate design and development handoffs

4. **Before Development (David)**
   - Provide sprint-ready stories with complete context
   - Support story estimation and sprint planning
   - Facilitate developer questions and clarifications

5. **Parallel with Scrum Master (Mike)**
   - Collaborate on sprint planning and backlog refinement
   - Support velocity tracking and process improvement
   - Coordinate stakeholder communication and reviews

### Workflow Diagram

```
Product Manager (John) â†’ System Architect (Fred) â†’ UX/UI Architect (Veronica/Victor) â†’
Product Owner (Sarah) â†’ Developer (David) + Scrum Master (Mike) + DevOps Engineer (Alex)
```

### Handoff Procedures

#### From Product Manager
- **Receives**: Validated PRD, stakeholder requirements, business priorities
- **Validates**: Requirements completeness, stakeholder alignment
- **Adds**: Detailed story breakdowns, acceptance criteria, dependency analysis

#### From System Architect
- **Receives**: Technical architecture, implementation constraints, technology decisions
- **Validates**: Story technical feasibility, architecture alignment
- **Adds**: Technical context to stories, implementation guidance

#### From UX/UI Architect
- **Receives**: Design specifications, component library, user experience flows
- **Validates**: Design-development alignment, implementation feasibility
- **Adds**: Design requirements to acceptance criteria, UI/UX validation steps

#### To Development Team
- **Provides**: Sprint-ready stories, detailed acceptance criteria, implementation context
- **Supports**: Story estimation, sprint planning, clarification requests
- **Facilitates**: Developer-stakeholder communication, requirement validation

## Agile Framework Integration

### Scrum Integration

- **Product Backlog Management**: Maintain and prioritize product backlog items
- **Sprint Planning**: Prepare stories for sprint planning sessions
- **Sprint Review**: Present completed stories to stakeholders
- **Backlog Refinement**: Continuously refine and improve story quality

### Kanban Integration

- **Continuous Flow**: Manage story flow through development pipeline
- **WIP Limits**: Set appropriate work-in-progress limits for story preparation
- **Metrics**: Track story cycle time and throughput

### SAFe Integration

- **Program Increment Planning**: Prepare stories for PI planning events
- **Feature Breakdown**: Decompose features into implementable stories
- **Cross-Team Coordination**: Manage dependencies across agile release trains

### LeSS Integration

- **Multi-Team Backlog**: Coordinate product backlog across multiple teams
- **Sprint Planning**: Support multi-team sprint planning sessions
- **Cross-Team Dependencies**: Manage and resolve cross-team dependencies

## Third-Party Tool Integration

### Project Management Tools

#### Jira Integration
```yaml
# Example Jira story template
story_template:
  issue_type: "Story"
  summary: "[Story Title]"
  description: |
    As a [user type]
    I want [functionality]
    So that [benefit]
    
    Acceptance Criteria:
    - [ ] Criterion 1
    - [ ] Criterion 2
    - [ ] Criterion 3
  labels: ["bmad-method", "sprint-ready"]
  components: ["Frontend", "Backend"]
  story_points: 5
```

#### Azure DevOps Integration
```yaml
# Example Azure DevOps work item
work_item:
  type: "User Story"
  title: "[Story Title]"
  description: "[Story Description]"
  acceptance_criteria: "[Detailed Criteria]"
  tags: ["bmad-method", "ready-for-development"]
  area_path: "Project\\Feature Area"
  iteration_path: "Project\\Sprint 1"
```

#### Asana Integration
```yaml
# Example Asana task structure
task:
  name: "[Story Title]"
  notes: |
    User Story: [Story Description]
    Acceptance Criteria: [Criteria List]
    Definition of Done: [DoD Checklist]
  projects: ["Product Development"]
  tags: ["user-story", "sprint-ready"]
  custom_fields:
    story_points: 5
    priority: "High"
```

### Communication Tools

#### Slack Integration
- **Story Notifications**: Automated updates when stories are ready for development
- **Stakeholder Updates**: Regular communication about story progress and blockers
- **Team Coordination**: Facilitate cross-team communication about dependencies

#### Microsoft Teams Integration
- **Sprint Planning**: Schedule and coordinate sprint planning sessions
- **Story Reviews**: Facilitate stakeholder reviews of story acceptance criteria
- **Documentation Sharing**: Share story documentation and updates

### Documentation Tools

#### Confluence Integration
- **Story Documentation**: Maintain detailed story documentation and context
- **Process Documentation**: Document product ownership processes and standards
- **Knowledge Base**: Create searchable repository of story patterns and templates

#### Notion Integration
- **Story Database**: Maintain comprehensive database of all user stories
- **Template Library**: Store and manage story templates and patterns
- **Team Collaboration**: Facilitate collaborative story refinement sessions

## Configuration Options

### Story Management Preferences

| Option | Description | Default | Example |
|--------|-------------|---------|---------|
| `storyFormat` | Preferred story format | "As a...I want...So that" | "Given-When-Then" |
| `acceptanceCriteriaStyle` | AC format preference | "Checklist" | "BDD Scenarios" |
| `storySize` | Preferred story sizing | "Story Points" | "T-Shirt Sizes" |
| `definitionOfDone` | DoD requirements | "Standard" | "Custom Checklist" |
| `prioritizationMethod` | Priority framework | "MoSCoW" | "RICE" |
| `dependencyTracking` | Dependency management | "Manual" | "Automated" |

### Example Configuration

```yaml
product_owner:
  storyFormat: "As a...I want...So that"
  acceptanceCriteriaStyle: "Given-When-Then BDD"
  storySize: "Story Points (Fibonacci)"
  definitionOfDone: "Custom DoD Checklist"
  prioritizationMethod: "RICE Framework"
  dependencyTracking: "Automated with Alerts"
  qualityGates: "Mandatory Stakeholder Review"
  communicationStyle: "Structured Updates"
  templateUsage: "Strict Template Adherence"
```

### Quality Standards Configuration

```yaml
quality_standards:
  story_completeness:
    required_fields: ["title", "description", "acceptance_criteria", "definition_of_done"]
    validation_rules: ["INVEST principles", "testable criteria", "clear business value"]
  
  acceptance_criteria:
    minimum_criteria: 3
    format: "Given-When-Then"
    validation: "stakeholder_review_required"
  
  definition_of_done:
    code_review: true
    testing: "unit_and_integration"
    documentation: "updated"
    stakeholder_approval: true
```

### Team Integration Configuration

```yaml
team_integration:
  development_team:
    story_handoff: "sprint_planning"
    clarification_process: "async_first"
    estimation_method: "planning_poker"
  
  stakeholders:
    review_frequency: "weekly"
    approval_process: "formal_signoff"
    communication_channel: "email_and_slack"
  
  scrum_master:
    collaboration_level: "high"
    process_alignment: "strict_adherence"
    metrics_sharing: "transparent"
```

---

This integration guide provides comprehensive instructions for incorporating Sarah's product ownership expertise into your development workflow across different environments, tools, and agile frameworks. Sarah's systematic approach ensures that your development teams receive clear, actionable work that drives consistent project success.
