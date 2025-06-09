# Infrastructure Architecture Creation Task

## Purpose

To design a comprehensive infrastructure architecture that defines all aspects of the technical infrastructure strategy, from cloud platform selection to deployment patterns. This architecture will serve as the definitive blueprint for the DevOps/Platform Engineering team to implement, ensuring consistency, security, and operational excellence across all infrastructure components.

## Inputs

- Product Requirements Document (PRD)
- Main System Architecture Document
- Technology Stack Document (`docs/tech-stack.md`)
- Infrastructure Guidelines (`docs/infrastructure/guidelines.md`)
- Any existing infrastructure documentation

## Key Activities & Instructions

### 1. Confirm Interaction Mode

- Ask the user: "How would you like to proceed with creating the infrastructure architecture? We can work:
  A. **Incrementally (Default & Recommended):** We'll go through each architectural decision and document section step-by-step. I'll present drafts, and we'll seek your feedback before moving to the next part. This is best for complex infrastructure designs.
  B. **"YOLO" Mode:** I can produce a comprehensive initial draft of the infrastructure architecture for you to review more broadly first. We can then iterate on specific sections based on your feedback."
- Request the user to select their preferred mode and proceed accordingly.

### 2. Gather Infrastructure Requirements

- Review the product requirements document to understand business needs and scale requirements
- Analyze the main system architecture to identify infrastructure dependencies
- Document non-functional requirements (performance, scalability, reliability, security)
- Identify compliance and regulatory requirements affecting infrastructure
- Map application architecture patterns to infrastructure needs
- <critical_rule>Cross-reference with PRD Technical Assumptions to ensure alignment with repository and service architecture decisions</critical_rule>

### 3. Design Infrastructure Architecture Strategy

- **If "Incremental Mode" was selected:**
  - For each major infrastructure domain:
    - **a. Present Domain Purpose:** Explain what this infrastructure domain provides and its strategic importance
    - **b. Present Strategic Options:** Provide 2-3 viable approaches with architectural pros and cons
    - **c. Make Strategic Recommendation:** Recommend the best approach with clear architectural rationale
    - **d. Incorporate Feedback:** Discuss with user and iterate based on feedback
    - **e. [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)**
    - **f. Document Architectural Decision:** Record the final strategic choice with justification

- **If "YOLO Mode" was selected:**
  - Design strategic approaches for all major infrastructure domains
  - Document architectural decisions and rationales
  - Present comprehensive infrastructure strategy for review
  - Iterate based on feedback

### 4. Document Infrastructure Architecture Blueprint

- Populate all sections of the infrastructure architecture template:
  - **Cloud Strategy & Platform Selection** - Multi-cloud vs single cloud, platform rationale
  - **Network Architecture Patterns** - VPC design, connectivity strategies, security zones
  - **Compute Architecture Strategy** - Container vs serverless vs VM strategies, scaling patterns
  - **Data Architecture & Storage Strategy** - Database selection, data tier strategies, backup approaches
  - **Security Architecture Framework** - Zero-trust patterns, identity strategies, encryption approaches
  - **Observability Architecture** - Monitoring strategies, logging patterns, alerting frameworks
  - **CI/CD Architecture Patterns** - Pipeline strategies, deployment patterns, environment promotion
  - **Disaster Recovery Architecture** - RTO/RPO strategies, failover patterns, business continuity
  - **Cost Optimization Framework** - Resource optimization strategies, cost allocation patterns
  - **Environment Strategy** - Dev/staging/prod patterns, environment isolation approaches
  - **Infrastructure Evolution Strategy** - Technology migration paths, scaling roadmaps
  - **Cross-team Collaboration Model** - Integration with development teams, handoff protocols

### 5. Implementation Feasibility Review & Collaboration

- **Architect  DevOps/Platform Feedback Loop:**
  - Present architectural blueprint summary to DevOps/Platform Engineering Agent for feasibility review
  - Request specific feedback on:
    - **Operational Complexity:** Are the proposed patterns implementable with current tooling and expertise?
    - **Resource Constraints:** Do infrastructure requirements align with available resources and budgets?
    - **Security Implementation:** Are security patterns achievable with current security toolchain?
    - **Operational Overhead:** Will the proposed architecture create excessive operational burden?
    - **Technology Constraints:** Are selected technologies compatible with existing infrastructure?
  - Document all feasibility feedback and concerns raised by DevOps/Platform Engineering Agent
  - Iterate on architectural decisions based on operational constraints and feedback
  - <critical_rule>Address all critical feasibility concerns before proceeding to final architecture documentation</critical_rule>

### 6. Create Infrastructure Architecture Diagrams

- Develop high-level infrastructure strategy diagrams using Mermaid
- Create network topology architecture diagrams
- Document data flow and integration architecture diagrams
- Illustrate deployment pipeline architecture patterns
- Visualize environment relationship and promotion strategies
- Design security architecture and trust boundary diagrams

### 7. Define Implementation Handoff Strategy

- Create clear specifications for DevOps/Platform Engineering implementation
- Define architectural constraints and non-negotiable requirements
- Specify technology selections with version requirements where critical
- Document architectural patterns that must be followed during implementation
- Create implementation validation criteria
- Prepare architectural decision records (ADRs) for key infrastructure choices

### 8. BMAD Integration Architecture

- Design infrastructure architecture to support other BMAD agents:
  - **Development Environment Architecture** - Local development patterns, testing infrastructure
  - **Deployment Architecture** - How applications from Frontend/Backend agents will be deployed
  - **Integration Architecture** - How infrastructure supports cross-service communication
  - Document infrastructure requirements for each BMAD agent workflow

### 9. Architecture Review and Finalization

- Review architecture against system architecture for alignment
- Validate infrastructure architecture supports all application requirements
- Ensure architectural decisions are implementable within project constraints
- Address any architectural gaps or inconsistencies
- Prepare comprehensive architecture handoff documentation for implementation team

## Output

A comprehensive infrastructure architecture document that provides:

1. **Strategic Infrastructure Blueprint** - High-level architecture strategy and patterns
2. **Technology Selection Rationale** - Justified technology choices and architectural decisions
3. **Implementation Specifications** - Clear guidance for DevOps/Platform Engineering implementation
4. **Architectural Constraints** - Non-negotiable requirements and patterns
5. **Integration Architecture** - How infrastructure supports application architecture
6. **BMAD Workflow Support** - Infrastructure architecture supporting all agent workflows
7. **Feasibility Validation** - Documented operational feedback and constraint resolution

**Output file**: `docs/infrastructure-architecture.md`

## Offer Advanced Self-Refinement & Elicitation Options

Present the user with the following list of 'Advanced Reflective, Elicitation & Brainstorming Actions'. Explain that these are optional steps to help ensure quality, explore alternatives, and deepen the understanding of the current section before finalizing it and moving on. The user can select an action by number, or choose to skip this and proceed to finalize the section.

"To ensure the quality of the current section: **[Specific Section Name]** and to ensure its robustness, explore alternatives, and consider all angles, I can perform any of the following actions. Please choose a number (8 to finalize and proceed):

**Advanced Reflective, Elicitation & Brainstorming Actions I Can Take:**

1. **Alternative Architecture Strategy Evaluation**
2. **Scalability & Performance Architecture Stress Test (Theoretical)**
3. **Security Architecture & Compliance Deep Dive**
4. **Cost Architecture Analysis & Optimization Strategy Review**
5. **Operational Excellence & Reliability Architecture Assessment**
6. **Cross-Functional Integration & BMAD Workflow Analysis**
7. **Future Technology & Migration Architecture Path Exploration**
8. **Finalize this Section and Proceed.**

After I perform the selected action, we can discuss the outcome and decide on any further revisions for this section."

REPEAT by Asking the user if they would like to perform another Reflective, Elicitation & Brainstorming Action UNTIL the user indicates it is time to proceed to the next section (or selects #8)
