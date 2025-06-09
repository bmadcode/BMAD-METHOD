# BMAD Method Persona Navigation Map

## Overview

This map provides detailed navigation paths for each BMAD Method persona, showing their documentation structure, key resources, and integration points with other personas.

## Core Personas (Epic 1 - Complete)

###  Technical Documentation Architect

**Primary Focus**: Cross-platform API documentation and technical writing

**Documentation Structure**:
```
personas/technical-documentation-architect/
 README.md                    # Persona overview and capabilities
 getting-started.md           # Quick start guide
 api-documentation/           # API documentation guidance
    rest-apis.md
    graphql-apis.md
    grpc-apis.md
 templates/                   # Documentation templates
    api-reference.md
    integration-guide.md
    troubleshooting.md
 examples/                    # Practical examples
    react-api-docs.md
    nodejs-api-docs.md
    aspnet-api-docs.md
    python-api-docs.md
 checklists/                  # Quality validation
    documentation-quality.md
 integration/                 # Integration with other personas
     devops-collaboration.md
     integration-specialist.md
     code-review-specialist.md
```

**Key Resources**:
- [API Documentation Template](../../bmad-agent/templates/api-documentation-template.md)
- [Documentation Quality Checklist](../../bmad-agent/checklists/technical-documentation-architect-checklist.md)
- [Cross-Platform Examples](../examples/api-documentation/)

**Integration Points**:
- **DevOps Specialist**: Deployment documentation coordination
- **Integration Specialist**: API integration documentation
- **Code Review Specialist**: Documentation review standards

###  DevOps Documentation Specialist

**Primary Focus**: CI/CD, containerization, and cloud deployment documentation

**Documentation Structure**:
```
personas/devops-documentation-specialist/
 README.md                    # Persona overview and capabilities
 getting-started.md           # Quick start guide
 deployment/                  # Deployment documentation
    containerization.md
    ci-cd-pipelines.md
    cloud-deployment.md
    infrastructure-as-code.md
 templates/                   # Deployment templates
    deployment-guide.md
    runbook.md
    disaster-recovery.md
 examples/                    # Platform-specific examples
    react-deployment.md
    nodejs-deployment.md
    aspnet-deployment.md
    python-deployment.md
 checklists/                  # Quality validation
    deployment-quality.md
 integration/                 # Integration with other personas
     technical-documentation.md
     security-specialist.md
     performance-specialist.md
```

**Key Resources**:
- [Deployment Documentation Template](../../bmad-agent/templates/deployment-documentation-template.md)
- [DevOps Quality Checklist](../../bmad-agent/checklists/devops-documentation-specialist-checklist.md)
- [Infrastructure Examples](../examples/deployment/)

**Integration Points**:
- **Technical Documentation**: API deployment documentation
- **Security Specialist**: Security compliance in deployment
- **Performance Specialist**: Performance monitoring setup

###  Cross-Platform Integration Specialist

**Primary Focus**: Seamless cross-technology communication and integration

**Documentation Structure**:
```
personas/cross-platform-integration-specialist/
 README.md                    # Persona overview and capabilities
 getting-started.md           # Quick start guide
 integration-patterns/        # Integration documentation
    rest-integration.md
    graphql-integration.md
    grpc-integration.md
    websocket-integration.md
 templates/                   # Integration templates
    integration-guide.md
    compatibility-matrix.md
    troubleshooting.md
 examples/                    # Cross-platform examples
    react-nodejs.md
    react-aspnet.md
    nodejs-python.md
    aspnet-python.md
 checklists/                  # Quality validation
    integration-quality.md
 integration/                 # Integration with other personas
     technical-documentation.md
     code-review-specialist.md
     troubleshooting-specialist.md
```

**Key Resources**:
- [Integration Documentation Template](../../bmad-agent/templates/integration-documentation-template.md)
- [Integration Quality Checklist](../../bmad-agent/checklists/cross-platform-integration-specialist-checklist.md)
- [Integration Examples](../examples/integrations/)

**Integration Points**:
- **Technical Documentation**: Integration API documentation
- **Code Review Specialist**: Integration code review standards
- **Troubleshooting Specialist**: Integration issue resolution

###  Polyglot Code Review Specialist

**Primary Focus**: Multi-language code review and quality assurance

**Documentation Structure**:
```
personas/polyglot-code-review-specialist/
 README.md                    # Persona overview and capabilities
 getting-started.md           # Quick start guide
 review-standards/            # Code review standards
    react-standards.md
    typescript-standards.md
    nodejs-standards.md
    aspnet-standards.md
    python-standards.md
 templates/                   # Review templates
    code-review.md
    security-review.md
    performance-review.md
 examples/                    # Review examples
    react-review-example.md
    nodejs-review-example.md
    aspnet-review-example.md
    python-review-example.md
 checklists/                  # Quality validation
    review-quality.md
 integration/                 # Integration with other personas
     technical-documentation.md
     integration-specialist.md
     security-specialist.md
```

**Key Resources**:
- [Code Review Template](../../bmad-agent/templates/code-review-template.md)
- [Review Quality Checklist](../../bmad-agent/checklists/polyglot-code-review-specialist-checklist.md)
- [Review Examples](../examples/code-reviews/)

**Integration Points**:
- **Technical Documentation**: Documentation review standards
- **Integration Specialist**: Integration code review
- **Security Specialist**: Security-focused code review

## Advanced Personas (Epic 3 - Planned)

###  Performance Optimization Specialist
**Focus**: Performance analysis, optimization, and monitoring across all platforms

###  Security Integration Specialist
**Focus**: Security implementation, vulnerability assessment, and compliance

###  Enterprise Architecture Consultant
**Focus**: Enterprise-scale architecture, governance, and strategic planning

###  Advanced Troubleshooting Specialist
**Focus**: Complex problem resolution, root cause analysis, and system debugging

## Navigation Patterns

### By Complexity Level
- **Beginner**: Getting started guides and basic templates
- **Intermediate**: Detailed implementation guides and examples
- **Advanced**: Complex scenarios and integration patterns

### By Use Case
- **New Project Setup**: Initial configuration and architecture
- **Feature Development**: Implementation guidance and best practices
- **Integration Tasks**: Cross-platform communication and data flow
- **Quality Assurance**: Review processes and validation
- **Deployment**: Release and operational procedures
- **Maintenance**: Ongoing support and optimization

### By Technology Stack
- **Frontend-Focused**: React, TypeScript, UI/UX considerations
- **Backend-Focused**: Node.js, ASP.NET, Python, API development
- **Full-Stack**: End-to-end development and integration
- **DevOps-Focused**: Deployment, monitoring, and infrastructure

## Cross-Persona Workflows

### Documentation Creation Workflow
1. **Technical Documentation Architect** creates initial documentation structure
2. **DevOps Specialist** adds deployment and operational guidance
3. **Integration Specialist** validates cross-platform compatibility
4. **Code Review Specialist** reviews and validates technical accuracy

### Integration Implementation Workflow
1. **Integration Specialist** designs integration architecture
2. **Technical Documentation Architect** documents APIs and interfaces
3. **Code Review Specialist** validates implementation quality
4. **DevOps Specialist** ensures deployment compatibility

### Quality Assurance Workflow
1. **Code Review Specialist** performs initial code review
2. **Integration Specialist** validates integration points
3. **DevOps Specialist** verifies deployment readiness
4. **Technical Documentation Architect** ensures documentation completeness

---

*This persona map provides comprehensive navigation for all BMAD Method personas, ensuring efficient access to relevant documentation and clear understanding of integration points.*
