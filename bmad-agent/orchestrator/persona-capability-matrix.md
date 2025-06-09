# BMAD Persona Capability Matrix

## Overview

This matrix provides a comprehensive view of all persona capabilities, specializations, and recommended use cases within the BMAD Method ecosystem.

## Capability Categories

###  Project Initiation & Strategy
| Persona | Primary Capabilities | Secondary Capabilities | Complexity Level |
|---------|---------------------|----------------------|------------------|
| **Analyst (Mary)** | Brainstorming, Research, Project Briefing | Market Analysis, Competitive Research | Intermediate |
| **Product Manager (John)** | PRD Creation, Requirements Definition, User Advocacy | Stakeholder Management, Feature Prioritization | Advanced |
| **Enterprise Architecture Consultant (Edward)** | Technology Strategy, Enterprise Planning | Digital Transformation, Governance | Master |

###  Architecture & Design
| Persona | Primary Capabilities | Secondary Capabilities | Complexity Level |
|---------|---------------------|----------------------|------------------|
| **Architect (Fred)** | System Architecture, Technical Design | Scalability Planning, Technology Selection | Expert |
| **Design Architect (Jane)** | UI/UX Architecture, Frontend Design | Design Systems, User Experience | Expert |
| **v0 UX/UI Architect (Veronica)** | Rapid Prototyping, Component Generation | Visual Design, Interactive Prototypes | Expert |
| **Cross-Platform Integration Specialist (Carlos)** | API Design, System Integration | Microservices, Interoperability | Expert |

###  Documentation & Knowledge
| Persona | Primary Capabilities | Secondary Capabilities | Complexity Level |
|---------|---------------------|----------------------|------------------|
| **Technical Documentation Architect (Marcus)** | API Documentation, Technical Writing | Developer Experience, Documentation Architecture | Expert |
| **DevOps Documentation Specialist (Diana)** | Deployment Guides, Infrastructure Docs | Operational Procedures, Runbooks | Expert |

###  Quality & Optimization
| Persona | Primary Capabilities | Secondary Capabilities | Complexity Level |
|---------|---------------------|----------------------|------------------|
| **Polyglot Code Review Specialist (Patricia)** | Multi-Language Code Review, Quality Assurance | Security Review, Best Practices | Expert |
| **Performance Optimization Specialist (Oliver)** | Performance Analysis, System Optimization | Monitoring, Scalability Tuning | Expert |
| **Security Integration Specialist (Sophia)** | Security Architecture, Threat Modeling | Compliance, Secure Development | Expert |
| **Advanced Troubleshooting Specialist (Thomas)** | Root Cause Analysis, Complex Debugging | System Diagnostics, Issue Resolution | Expert |

###  Project Management & Coordination
| Persona | Primary Capabilities | Secondary Capabilities | Complexity Level |
|---------|---------------------|----------------------|------------------|
| **Product Owner (Sarah)** | Backlog Management, Story Validation | Stakeholder Coordination, Sprint Planning | Advanced |
| **Scrum Master (Bob)** | Agile Process, Team Coordination | Story Preparation, Process Improvement | Intermediate |

## Technology Stack Expertise

### Frontend Technologies
\```yaml
react_typescript_expertise:
  primary_personas:
    - "v0_ux_ui_architect"
    - "design_architect"
    - "performance_optimization_specialist"
  secondary_personas:
    - "polyglot_code_review_specialist"
    - "cross_platform_integration_specialist"
    - "advanced_troubleshooting_specialist"
```

### Backend Technologies
\```yaml
nodejs_expertise:
  primary_personas:
    - "architect"
    - "cross_platform_integration_specialist"
    - "performance_optimization_specialist"
  secondary_personas:
    - "security_integration_specialist"
    - "polyglot_code_review_specialist"
    - "advanced_troubleshooting_specialist"

aspnet_expertise:
  primary_personas:
    - "architect"
    - "enterprise_architecture_consultant"
    - "security_integration_specialist"
  secondary_personas:
    - "cross_platform_integration_specialist"
    - "performance_optimization_specialist"
    - "advanced_troubleshooting_specialist"

python_expertise:
  primary_personas:
    - "architect"
    - "performance_optimization_specialist"
    - "advanced_troubleshooting_specialist"
  secondary_personas:
    - "polyglot_code_review_specialist"
    - "cross_platform_integration_specialist"
```

## Use Case Mapping

###  Project Initiation Workflows
\```yaml
new_project_setup:
  recommended_sequence:
    1. "analyst" # Initial research and brainstorming
    2. "product_manager" # PRD creation and requirements
    3. "architect" # Technical architecture design
    4. "design_architect" # UI/UX architecture
  optional_specialists:
    - "enterprise_architecture_consultant" # For enterprise projects
    - "security_integration_specialist" # For security-critical projects
```

###  Development Workflows
\```yaml
feature_development:
  recommended_sequence:
    1. "product_owner" # Story refinement and backlog management
    2. "scrum_master" # Sprint planning and story preparation
    3. "v0_ux_ui_architect" # Component implementation
  quality_validation:
    - "polyglot_code_review_specialist" # Code quality review
    - "performance_optimization_specialist" # Performance validation
```

###  Documentation Workflows
\```yaml
documentation_creation:
  api_documentation:
    primary: "technical_documentation_architect"
    support: ["architect", "cross_platform_integration_specialist"]
    
  deployment_documentation:
    primary: "devops_documentation_specialist"
    support: ["architect", "security_integration_specialist"]
```

###  Optimization Workflows
\```yaml
system_optimization:
  performance_issues:
    primary: "performance_optimization_specialist"
    escalation: ["advanced_troubleshooting_specialist", "architect"]
    
  security_hardening:
    primary: "security_integration_specialist"
    support: ["polyglot_code_review_specialist", "architect"]
    
  complex_troubleshooting:
    primary: "advanced_troubleshooting_specialist"
    support: ["performance_optimization_specialist", "security_integration_specialist"]
```

## Persona Collaboration Patterns

###  High-Synergy Combinations
\```yaml
powerful_combinations:
  architecture_team:
    personas: ["architect", "design_architect", "enterprise_architecture_consultant"]
    use_case: "Complex system design and enterprise architecture"
    
  quality_team:
    personas: ["polyglot_code_review_specialist", "performance_optimization_specialist", "security_integration_specialist"]
    use_case: "Comprehensive quality assurance and optimization"
    
  documentation_team:
    personas: ["technical_documentation_architect", "devops_documentation_specialist"]
    use_case: "Complete documentation ecosystem creation"
    
  troubleshooting_team:
    personas: ["advanced_troubleshooting_specialist", "performance_optimization_specialist", "security_integration_specialist"]
    use_case: "Complex issue resolution and system optimization"
```

###  Handoff Protocols
\```yaml
seamless_transitions:
  analyst_to_pm:
    context_transfer: ["research_findings", "market_analysis", "user_insights"]
    validation_points: ["requirements_alignment", "feasibility_assessment"]
    
  pm_to_architect:
    context_transfer: ["prd_document", "technical_requirements", "constraints"]
    validation_points: ["technical_feasibility", "architecture_alignment"]
    
  architect_to_specialists:
    context_transfer: ["architecture_document", "technical_decisions", "implementation_guidelines"]
    validation_points: ["specialization_requirements", "integration_points"]
```

## Intelligent Routing Rules

###  Request Classification
\```yaml
routing_patterns:
  keywords_to_personas:
    "performance":
      primary: "performance_optimization_specialist"
      secondary: ["architect", "advanced_troubleshooting_specialist"]
      
    "security":
      primary: "security_integration_specialist"
      secondary: ["polyglot_code_review_specialist", "architect"]
      
    "documentation":
      primary: "technical_documentation_architect"
      secondary: ["devops_documentation_specialist", "architect"]
      
    "integration":
      primary: "cross_platform_integration_specialist"
      secondary: ["architect", "technical_documentation_architect"]
      
    "troubleshooting":
      primary: "advanced_troubleshooting_specialist"
      secondary: ["performance_optimization_specialist", "architect"]
      
    "enterprise":
      primary: "enterprise_architecture_consultant"
      secondary: ["architect", "product_manager"]
```

###  Context-Aware Selection
\```yaml
context_based_routing:
  project_phase:
    initiation: ["analyst", "product_manager"]
    planning: ["architect", "design_architect", "enterprise_architecture_consultant"]
    development: ["v0_ux_ui_architect", "scrum_master", "product_owner"]
    quality_assurance: ["polyglot_code_review_specialist", "performance_optimization_specialist", "security_integration_specialist"]
    deployment: ["devops_documentation_specialist", "advanced_troubleshooting_specialist"]
    maintenance: ["advanced_troubleshooting_specialist", "performance_optimization_specialist"]
    
  complexity_level:
    simple: ["scrum_master", "product_owner", "v0_ux_ui_architect"]
    moderate: ["analyst", "product_manager", "design_architect"]
    complex: ["architect", "performance_optimization_specialist", "security_integration_specialist"]
    enterprise: ["enterprise_architecture_consultant", "advanced_troubleshooting_specialist"]
```
