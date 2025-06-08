# BMAD Method Data Flow Diagrams

## Overview

This document illustrates how information flows through the BMAD Method process. Unlike traditional software systems with databases and APIs, the BMAD Method manages the flow of context, requirements, specifications, and other information between different personas and stages of the development process.

## Core Information Flow

The BMAD Method's primary information flow shows how context and requirements transform into deliverables through a series of specialized personas:

```mermaid title="BMAD Core Information Flow" type="diagram"
flowchart TD
    A[Initial Requirements] --> B{BMAD Orchestrator}
    B --> C[Product Owner]
    C -- "Requirements Document" --> B
    B --> D[Architect]
    D -- "Architecture Specification" --> B
    B --> E[UX/UI Designer]
    E -- "Design Specification" --> B
    B --> F[Developer]
    F -- "Implementation" --> B
    B --> G[Final Deliverable]
    
    style B fill:#f96,stroke:#333,stroke-width:2px
```

## Context Preservation Flow

One of the BMAD Method's key strengths is how it preserves and enriches context throughout the development process:

```mermaid title="Context Preservation Flow" type="diagram"
graph TD
    A[Initial Context] --> B[Context Enrichment]
    B --> C[Context Sharing]
    C --> D[Context Application]
    D --> E[Context Validation]
    E -->|Feedback Loop| B
    
    subgraph "Context Enrichment"
    B1[Product Owner Input] --> B2[Architect Input]
    B2 --> B3[Designer Input]
    B3 --> B4[Developer Input]
    end
    
    subgraph "Context Application"
    D1[Requirements Application] --> D2[Architecture Application]
    D2 --> D3[Design Application]
    D3 --> D4[Implementation Application]
    end
```

## Task Execution Flow

Information flow during task execution in the BMAD Method:

```mermaid title="Task Execution Information Flow" type="diagram"
sequenceDiagram
    participant User
    participant Orchestrator
    participant ActivePersona
    participant Knowledge as Knowledge Base
    participant Templates
    participant Checklists
    
    User->>Orchestrator: Task Request + Context
    Orchestrator->>Knowledge: Retrieve Relevant Knowledge
    Knowledge-->>Orchestrator: Domain Knowledge
    Orchestrator->>Templates: Retrieve Appropriate Templates
    Templates-->>Orchestrator: Task Templates
    Orchestrator->>ActivePersona: Assign Task + Context + Templates
    ActivePersona->>ActivePersona: Process Information
    ActivePersona->>Checklists: Verify Against Checklists
    Checklists-->>ActivePersona: Verification Results
    ActivePersona->>Orchestrator: Task Output
    Orchestrator->>User: Deliverable
```

## Persona Transition Flow

How information transitions between personas in the BMAD Method:

```mermaid title="Persona Transition Information Flow" type="diagram"
graph TD
    A[Initial Request] --> B[Product Owner]
    B -- "PRD" --> C[Architect]
    C -- "Architecture Doc" --> D[UX/UI Designer]
    D -- "Design Spec" --> E[Developer]
    E -- "Implementation" --> F[Project Manager]
    F -- "Project Status" --> G[Stakeholders]
    
    H[Shared Context Repository] <-.-> B
    H <-.-> C
    H <-.-> D
    H <-.-> E
    H <-.-> F
    
    style H fill:#f9f,stroke:#333,stroke-width:2px
```

## Checklist Verification Flow

How information flows through the checklist verification process:

```mermaid title="Checklist Verification Flow" type="diagram"
flowchart TD
    A[Task Output] --> B{Checklist System}
    B --> C[Quality Checklist]
    B --> D[Process Checklist]
    B --> E[Deliverable Checklist]
    
    C --> F{Quality Check}
    D --> G{Process Check}
    E --> H{Completeness Check}
    
    F -->|Pass| I[Quality Verified]
    F -->|Fail| J[Quality Remediation]
    J --> A
    
    G -->|Pass| K[Process Verified]
    G -->|Fail| L[Process Remediation]
    L --> A
    
    H -->|Pass| M[Completeness Verified]
    H -->|Fail| N[Completeness Remediation]
    N --> A
    
    I --> O[Final Verification]
    K --> O
    M --> O
    
    O --> P[Verified Deliverable]
```

## Template Application Flow

How templates are applied to structure information in the BMAD Method:

```mermaid title="Template Application Flow" type="diagram"
graph LR
    A[Raw Information] --> B[Template Selection]
    B --> C[Template Application]
    C --> D[Structured Information]
    D --> E[Template Validation]
    E -->|Valid| F[Finalized Document]
    E -->|Invalid| G[Revision]
    G --> C
```

## Conclusion

The BMAD Method's information flow is designed to ensure that context is preserved, enriched, and effectively utilized throughout the development process. By structuring information flow through specialized personas and standardized processes, the BMAD Method creates a consistent, high-quality approach to AI-driven development.
