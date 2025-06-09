# Persona Workflows in BMAD

This document details how each BMAD persona operates within the system and their specific workflows.

## Overview

Each BMAD persona has specialized workflows designed to maximize their effectiveness within their domain expertise. Understanding these workflows helps users leverage the right persona for their specific needs.

## Core Persona Workflows

### 1. Product Owner (PO) Workflow

\```mermaid
graph TD
    A[Receive Requirements] --> B[Analyze Business Value]
    B --> C[Create User Stories]
    C --> D[Define Acceptance Criteria]
    D --> E[Prioritize Backlog]
    E --> F[Stakeholder Review]
    F --> G[Story Refinement]
    G --> H[Sprint Planning Input]
\```

**Key Activities:**
- Requirements gathering and analysis
- User story creation and refinement
- Backlog prioritization
- Stakeholder communication
- Acceptance criteria definition

### 2. Project Manager (PM) Workflow

\```mermaid
graph TD
    A[Project Initiation] --> B[Resource Planning]
    B --> C[Timeline Creation]
    C --> D[Risk Assessment]
    D --> E[Team Coordination]
    E --> F[Progress Monitoring]
    F --> G[Stakeholder Updates]
    G --> H[Delivery Management]
\```

**Key Activities:**
- Project planning and scheduling
- Resource allocation and management
- Risk identification and mitigation
- Team coordination and communication
- Progress tracking and reporting

### 3. System Architect Workflow

\```mermaid
graph TD
    A[Requirements Analysis] --> B[Architecture Design]
    B --> C[Technology Selection]
    C --> D[Component Definition]
    D --> E[Integration Planning]
    E --> F[Documentation Creation]
    F --> G[Review and Validation]
    G --> H[Implementation Guidance]
\```

**Key Activities:**
- System design and architecture
- Technology stack decisions
- Component and service definition
- Integration pattern design
- Technical documentation

### 4. UX/UI Architect Workflow

\```mermaid
graph TD
    A[User Research] --> B[Design System Creation]
    B --> C[Component Specification]
    C --> D[Prototype Development]
    D --> E[Usability Testing]
    E --> F[Design Refinement]
    F --> G[Implementation Specs]
    G --> H[Quality Assurance]
\```

**Key Activities:**
- User experience research and design
- Design system development
- Component specification and prototyping
- Usability testing and validation
- Implementation guidance

### 5. Business Analyst Workflow

\```mermaid
graph TD
    A[Business Requirements] --> B[Process Analysis]
    B --> C[Gap Identification]
    C --> D[Solution Design]
    D --> E[Impact Assessment]
    E --> F[Documentation]
    F --> G[Stakeholder Review]
    G --> H[Implementation Support]
\```

**Key Activities:**
- Business process analysis
- Requirements elicitation and documentation
- Gap analysis and solution design
- Impact assessment and change management
- Stakeholder communication

## Workflow Integration Points

### Cross-Persona Collaboration

1. **PO  PM**: Story prioritization and sprint planning
2. **Architect  UX/UI**: Technical feasibility and design constraints
3. **BA  PO**: Requirements refinement and business value alignment
4. **PM  All**: Coordination, timeline management, and delivery

### Handoff Protocols

Each persona follows specific handoff protocols to ensure smooth transitions:

- **Documentation Standards**: Consistent format and content requirements
- **Review Checkpoints**: Mandatory review gates between workflow stages
- **Quality Gates**: Acceptance criteria for deliverable completion
- **Communication Protocols**: Standardized update and feedback mechanisms

## Workflow Optimization

### Best Practices

1. **Early Collaboration**: Involve relevant personas from project inception
2. **Iterative Refinement**: Regular review and improvement of workflows
3. **Clear Handoffs**: Well-defined transition points between personas
4. **Continuous Feedback**: Regular retrospectives and process improvements

### Common Pitfalls

- **Siloed Work**: Personas working in isolation without collaboration
- **Unclear Handoffs**: Ambiguous transition points causing delays
- **Missing Documentation**: Inadequate documentation for workflow steps
- **Rigid Processes**: Inflexible workflows that don't adapt to project needs

## Workflow Customization

### Project-Specific Adaptations

Workflows can be customized based on:
- Project size and complexity
- Team composition and skills
- Timeline constraints
- Technology requirements
- Stakeholder preferences

### Configuration Options

- **Workflow Steps**: Add, remove, or modify workflow stages
- **Review Gates**: Customize review and approval processes
- **Documentation Requirements**: Adjust documentation depth and format
- **Collaboration Patterns**: Modify interaction frequencies and methods

---

*Understanding persona workflows enables effective BMAD system utilization and optimal project outcomes.*
