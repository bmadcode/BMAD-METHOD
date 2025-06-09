# Platform Infrastructure Implementation Task

## Purpose

To implement a comprehensive platform infrastructure stack based on the Infrastructure Architecture Document, including foundation infrastructure, container orchestration, GitOps workflows, service mesh, and developer experience platforms. This integrated approach ensures all platform components work synergistically to provide a complete, secure, and operationally excellent platform foundation.

## Inputs

- **Infrastructure Architecture Document** (`docs/infrastructure-architecture.md` - from Architect Agent)
- Infrastructure Change Request (`docs/infrastructure/{ticketNumber}.change.md`)
- Infrastructure Guidelines (`docs/infrastructure/guidelines.md`)
- Technology Stack Document (`docs/tech-stack.md`)
- `infrastructure-checklist.md` (for validation)

## Key Activities & Instructions

### 1. Confirm Interaction Mode

- Ask the user: "How would you like to proceed with platform infrastructure implementation? We can work:
  A. **Incrementally (Default & Recommended):** We'll implement each platform layer step-by-step (Foundation  Container Platform  GitOps  Service Mesh  Developer Experience), validating integration at each stage. This ensures thorough testing and operational readiness.
  B. **"YOLO" Mode:** I'll implement the complete platform stack in logical groups, with validation at major integration milestones. This is faster but requires comprehensive end-to-end testing."
- Request the user to select their preferred mode and proceed accordingly.

### 2. Architecture Review & Implementation Planning

- Review Infrastructure Architecture Document for complete platform specifications
- Validate platform requirements against application architecture and business needs
- Create integrated implementation roadmap with proper dependency sequencing
- Plan resource allocation, security policies, and operational procedures across all platform layers
- Document rollback procedures and risk mitigation strategies for the entire platform
- <critical_rule>Verify the infrastructure change request is approved before beginning implementation. If not, HALT and inform the user.</critical_rule>

### 3. Joint Implementation Planning Session

- **Architect  DevOps/Platform Collaborative Planning:**
  - **Architecture Alignment Review:**
    - Confirm understanding of architectural decisions and rationale with Architect Agent
    - Validate interpretation of infrastructure architecture document
    - Clarify any ambiguous or unclear architectural specifications
    - Document agreed-upon implementation approach for each architectural component
  - **Implementation Strategy Collaboration:**
    - **Technology Implementation Planning:** Collaborate on specific technology versions, configurations, and deployment patterns
    - **Security Implementation Planning:** Align on security control implementation approach and validation methods
    - **Integration Planning:** Plan component integration sequence and validation checkpoints
    - **Operational Considerations:** Discuss operational patterns, monitoring strategies, and maintenance approaches
    - **Resource Planning:** Confirm resource allocation, sizing, and optimization strategies
  - **Risk & Constraint Discussion:**
    - Identify potential implementation risks and mitigation strategies
    - Document operational constraints that may impact architectural implementation
    - Plan contingency approaches for high-risk implementation areas
    - Establish escalation triggers for implementation issues requiring architectural input
  - **Implementation Validation Planning:**
    - Define validation criteria for each platform component and integration point
    - Plan testing strategies and acceptance criteria with Architect input
    - Establish quality gates and review checkpoints throughout implementation
    - Document success metrics and performance benchmarks
  - **Documentation & Knowledge Transfer Planning:**
    - Plan documentation approach and knowledge transfer requirements
    - Define operational runbooks and troubleshooting guide requirements
    - Establish ongoing collaboration points for implementation support
- <critical_rule>Complete joint planning session before beginning platform implementation. Document all planning outcomes and agreements.</critical_rule>

### 4. Foundation Infrastructure Implementation

- **If "Incremental Mode" was selected:**
  - **a. Foundation Infrastructure Setup:**
    - Present foundation infrastructure scope and its role in the platform stack
    - Implement core cloud resources, networking, storage, and security foundations
    - Configure basic monitoring, logging, and operational tooling
    - Validate foundation readiness for platform components
    - [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

- **If "YOLO Mode" was selected:**
  - Implement complete foundation infrastructure per architecture specifications
  - Prepare foundation for all platform components simultaneously

### 5. Container Platform Implementation

- **If "Incremental Mode" was selected:**
  - **b. Container Orchestration Platform:**
    - Present container platform scope and integration with foundation infrastructure
    - Install and configure container orchestration platform (Kubernetes/AKS/EKS/GKE)
    - Implement RBAC, security policies, and resource management
    - Configure networking, storage classes, and operational tooling
    - Validate container platform functionality and readiness for applications
    - [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

- **If "YOLO Mode" was selected:**
  - Deploy complete container platform integrated with foundation infrastructure

### 6. GitOps Workflows Implementation

- **If "Incremental Mode" was selected:**
  - **c. GitOps Configuration Management:**
    - Present GitOps scope and integration with container platform
    - Implement GitOps operators and configuration management systems
    - Configure repository structures, sync policies, and environment promotion
    - Set up policy enforcement and drift detection
    - Validate GitOps workflows and configuration management
    - [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

- **If "YOLO Mode" was selected:**
  - Deploy complete GitOps stack integrated with container and foundation platforms

### 7. Service Mesh Implementation

- **If "Incremental Mode" was selected:**
  - **d. Service Communication Platform:**
    - Present service mesh scope and integration with existing platform layers
    - Install and configure service mesh control and data planes
    - Implement traffic management, security policies, and observability
    - Configure service discovery, load balancing, and communication policies
    - Validate service mesh functionality and inter-service communication
    - [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

- **If "YOLO Mode" was selected:**
  - Deploy complete service mesh integrated with all platform components

### 8. Developer Experience Platform Implementation

- **If "Incremental Mode" was selected:**
  - **e. Developer Experience Platform:**
    - Present developer platform scope and integration with complete platform stack
    - Implement developer portals, self-service capabilities, and golden path templates
    - Configure platform APIs, automation workflows, and productivity tooling
    - Set up developer onboarding and documentation systems
    - Validate developer experience and workflow integration
    - [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

- **If "YOLO Mode" was selected:**
  - Deploy complete developer experience platform integrated with all infrastructure

### 9. Platform Integration & Security Hardening

- Implement end-to-end security policies across all platform layers
- Configure integrated monitoring and observability for the complete platform stack
- Set up platform-wide backup, disaster recovery, and business continuity procedures
- Implement cost optimization and resource management across all platform components
- Configure platform-wide compliance monitoring and audit logging
- Validate complete platform security posture and operational readiness

### 10. Platform Operations & Automation

- Set up comprehensive platform monitoring, alerting, and operational dashboards
- Implement automated platform maintenance, updates, and lifecycle management
- Configure platform health checks, performance optimization, and capacity planning
- Set up incident response procedures and operational runbooks for the complete platform
- Implement platform SLA monitoring and service level management
- Validate operational excellence and platform reliability

### 11. BMAD Workflow Integration

- Verify complete platform supports all BMAD agent workflows:
  - **Frontend/Backend Development** - Test complete application development and deployment workflows
  - **Infrastructure Development** - Validate infrastructure-as-code development and deployment
  - **Cross-Agent Collaboration** - Ensure seamless collaboration between all agent types
  - **CI/CD Integration** - Test complete continuous integration and deployment pipelines
  - **Monitoring & Observability** - Verify complete application and infrastructure monitoring
- Document comprehensive integration verification results and workflow optimizations

### 12. Platform Validation & Knowledge Transfer

- Execute comprehensive platform testing with realistic workloads and scenarios
- Validate against all sections of infrastructure checklist for complete platform
- Perform security scanning, compliance verification, and performance testing
- Test complete platform disaster recovery and resilience procedures
- Complete comprehensive knowledge transfer to operations and development teams
- Document complete platform configuration, operational procedures, and troubleshooting guides
- <critical_rule>Update infrastructure change request status to reflect completion</critical_rule>

### 13. Implementation Review & Architect Collaboration

- **Post-Implementation Collaboration with Architect:**
  - **Implementation Validation Review:**
    - Present implementation outcomes against architectural specifications
    - Document any deviations from original architecture and rationale
    - Validate that implemented platform meets architectural intent and requirements
  - **Lessons Learned & Architecture Feedback:**
    - Provide feedback to Architect Agent on implementation experience
    - Document implementation challenges and successful patterns
    - Recommend architectural improvements for future implementations
    - Share operational insights that could influence future architectural decisions
  - **Knowledge Transfer & Documentation Review:**
    - Review operational documentation with Architect for completeness and accuracy
    - Ensure architectural decisions are properly documented in operational guides
    - Plan ongoing collaboration for platform evolution and maintenance
- Document collaboration outcomes and recommendations for future architecture-implementation cycles

### 14. Platform Handover & Continuous Improvement

- Establish platform monitoring and continuous improvement processes
- Set up feedback loops with development teams and platform users
- Plan platform evolution roadmap and technology upgrade strategies
- Implement platform metrics and KPI tracking for operational excellence
- Create platform governance and change management procedures
- Establish platform support and maintenance responsibilities

## Output

Fully operational and integrated platform infrastructure with:

1. **Complete Foundation Infrastructure** - Cloud resources, networking, storage, and security foundations
2. **Production-Ready Container Platform** - Orchestration with proper security, monitoring, and resource management
3. **Operational GitOps Workflows** - Version-controlled operations with automated sync and policy enforcement
4. **Service Mesh Communication Platform** - Advanced service communication with security and observability
5. **Developer Experience Platform** - Self-service capabilities with productivity tooling and golden paths
6. **Integrated Platform Operations** - Comprehensive monitoring, automation, and operational excellence
7. **BMAD Workflow Support** - Verified integration supporting all agent development and deployment patterns
8. **Platform Documentation** - Complete operational guides, troubleshooting resources, and developer documentation
9. **Joint Planning Documentation** - Collaborative planning outcomes and architectural alignment records
10. **Implementation Review Results** - Post-implementation validation and architect collaboration outcomes

## Offer Advanced Self-Refinement & Elicitation Options

Present the user with the following list of 'Advanced Reflective, Elicitation & Brainstorming Actions'. Explain that these are optional steps to help ensure quality, explore alternatives, and deepen the understanding of the current platform layer before finalizing it and moving to the next. The user can select an action by number, or choose to skip this and proceed.

"To ensure the quality of the current platform layer: **[Specific Platform Layer Name]** and to ensure its robustness, explore alternatives, and consider all angles, I can perform any of the following actions. Please choose a number (8 to finalize and proceed):

**Advanced Reflective, Elicitation & Brainstorming Actions I Can Take:**

1. **Platform Layer Security Hardening & Integration Review**
2. **Performance Optimization & Resource Efficiency Analysis**
3. **Operational Excellence & Automation Enhancement**
4. **Platform Integration & Dependency Validation**
5. **Developer Experience & Workflow Optimization**
6. **Disaster Recovery & Platform Resilience Testing (Theoretical)**
7. **BMAD Agent Workflow Integration & Cross-Platform Testing**
8. **Finalize this Platform Layer and Proceed.**

After I perform the selected action, we can discuss the outcome and decide on any further improvements for this platform layer."

REPEAT by Asking the user if they would like to perform another Reflective, Elicitation & Brainstorming Action UNTIL the user indicates it is time to proceed to the next platform layer (or selects #8)
