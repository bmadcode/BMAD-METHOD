# Architect Task Library
**BMAD Method: System Architecture Persona**

## Introduction

The Architect Task Library provides a comprehensive collection of specialized tasks designed for the Architect persona within the BMAD Method. Each task is structured to facilitate specific architectural activities, from initial system design to validation and evolution. This library serves as a reference for architects to effectively execute their responsibilities throughout the project lifecycle.

## Table of Contents

1. [Task Overview](#task-overview)
2. [Core Architecture Tasks](#core-architecture-tasks)
3. [Infrastructure Tasks](#infrastructure-tasks)
4. [Frontend Architecture Tasks](#frontend-architecture-tasks)
5. [Integration Architecture Tasks](#integration-architecture-tasks)
6. [Architecture Validation Tasks](#architecture-validation-tasks)
7. [Architecture Evolution Tasks](#architecture-evolution-tasks)
8. [Task Execution Guidelines](#task-execution-guidelines)

## Task Overview

Each task in the Architect Task Library follows a consistent structure:

- **Purpose**: Clear statement of the task's objective
- **Inputs**: Required information and artifacts to begin the task
- **Process**: Step-by-step execution instructions
- **Outputs**: Expected deliverables and artifacts
- **Integration Points**: Connections to other personas and workflows
- **Success Criteria**: Measurable indicators of task completion
- **Tools and Templates**: Recommended resources for task execution

Tasks are categorized based on their focus area and typical sequence in the project lifecycle.

## Core Architecture Tasks

### Create Architecture

**Purpose**: Design and document a comprehensive system architecture that addresses business requirements while ensuring technical quality attributes.

**Inputs**:
- Business requirements document
- Technical constraints and limitations
- Existing system documentation (if applicable)
- Non-functional requirements

**Process**:
1. **Analyze Requirements**
   - Review business requirements and use cases
   - Identify key quality attributes (scalability, performance, security, etc.)
   - Document technical constraints and limitations
   - Analyze existing systems and integration points

2. **Define Architecture Strategy**
   - Select appropriate architectural style(s)
   - Identify key architectural patterns
   - Establish high-level component structure
   - Define data management approach

3. **Design Component Architecture**
   - Define component boundaries and responsibilities
   - Specify component interfaces and contracts
   - Document component relationships and dependencies
   - Establish communication patterns between components

4. **Design Data Architecture**
   - Define data models and structures
   - Establish data flow patterns
   - Document data storage and retrieval mechanisms
   - Define data consistency and integrity approaches

5. **Design Integration Architecture**
   - Identify external system integration points
   - Define integration patterns and protocols
   - Document API specifications
   - Establish error handling and resilience strategies

6. **Document Architecture**
   - Create architecture overview diagram
   - Document component specifications
   - Create data flow diagrams
   - Document architectural decisions and rationales
   - Specify non-functional implementation approaches

7. **Validate Architecture**
   - Review architecture against requirements
   - Validate technical feasibility
   - Assess alignment with quality attributes
   - Identify potential risks and mitigations

**Outputs**:
- Comprehensive architecture documentation
- Component specifications
- Data models and flow diagrams
- API specifications
- Architectural decision records
- Technical risk assessment

**Integration Points**:
- Product Owner: Requirements clarification, business alignment
- UX/UI Architect: Frontend architecture alignment
- Developer: Implementation guidance
- DevOps Engineer: Infrastructure alignment

**Success Criteria**:
- Architecture addresses all functional requirements
- Quality attributes are explicitly addressed
- Component responsibilities and interfaces are clearly defined
- Data models and flows are comprehensively documented
- Integration points are specified with appropriate patterns
- Architectural decisions are documented with rationales
- Technical risks are identified with mitigation strategies

**Tools and Templates**:
- Architecture Template
- Component Specification Template
- Architectural Decision Record Template
- Data Model Template
- API Specification Template

### Document Architectural Decision

**Purpose**: Capture and document key architectural decisions, alternatives considered, and rationales to provide context and support future maintenance and evolution.

**Inputs**:
- Architectural challenge or decision point
- Business and technical context
- Constraints and requirements
- Stakeholder concerns

**Process**:
1. **Define Decision Context**
   - Document the architectural issue or challenge
   - Specify business and technical context
   - Identify stakeholders and their concerns
   - Document constraints and requirements

2. **Identify Alternatives**
   - Research possible approaches
   - Document viable alternatives
   - Analyze pros and cons of each alternative
   - Consider alignment with architectural principles

3. **Evaluate Alternatives**
   - Assess each alternative against requirements
   - Consider quality attribute impacts
   - Evaluate technical feasibility
   - Assess alignment with business goals
   - Consider long-term implications

4. **Document Decision**
   - Record the selected approach
   - Document detailed rationale
   - Specify consequences and trade-offs
   - Identify related decisions
   - Document implementation guidance

5. **Review and Validate**
   - Review decision with key stakeholders
   - Validate technical feasibility
   - Ensure alignment with architectural principles
   - Finalize documentation

**Outputs**:
- Architectural Decision Record (ADR)
- Implementation guidance
- Updated architecture documentation

**Integration Points**:
- Product Owner: Business impact validation
- Developer: Implementation feasibility
- DevOps Engineer: Operational impact assessment

**Success Criteria**:
- Decision context is clearly documented
- Alternatives are comprehensively analyzed
- Decision rationale is explicit and justified
- Consequences and trade-offs are documented
- Implementation guidance is actionable

**Tools and Templates**:
- Architectural Decision Record Template
- Decision Matrix Template
- Quality Attribute Analysis Template

### Create Technical Standards

**Purpose**: Establish consistent technical standards, patterns, and practices to guide implementation and ensure architectural integrity.

**Inputs**:
- Architecture documentation
- Technology stack decisions
- Industry best practices
- Organizational standards

**Process**:
1. **Analyze Requirements**
   - Review architecture and quality attributes
   - Identify key technical areas requiring standards
   - Research industry best practices
   - Consider organizational context and constraints

2. **Define Coding Standards**
   - Establish language-specific coding conventions
   - Define naming conventions
   - Specify code organization principles
   - Document code quality metrics

3. **Define Architectural Patterns**
   - Identify appropriate design patterns
   - Document pattern usage guidelines
   - Provide pattern implementation examples
   - Specify pattern selection criteria

4. **Establish Technology Usage Guidelines**
   - Document approved technologies and versions
   - Specify technology selection criteria
   - Define technology constraints and limitations
   - Provide technology usage examples

5. **Define Quality Practices**
   - Establish testing requirements and approaches
   - Define code review processes
   - Specify documentation requirements
   - Document performance and security standards

6. **Create Standards Documentation**
   - Organize standards by technical area
   - Provide clear guidelines and examples
   - Document rationales for standards
   - Create quick reference guides

7. **Review and Validate**
   - Review standards with development teams
   - Validate feasibility and practicality
   - Refine based on feedback
   - Establish standards governance process

**Outputs**:
- Technical Standards Guide
- Coding Standards Documentation
- Pattern Library
- Technology Usage Guidelines
- Quality Practices Documentation

**Integration Points**:
- Developer: Standards implementation
- DevOps Engineer: Operational standards alignment
- QA Engineer: Quality standards alignment

**Success Criteria**:
- Standards cover all key technical areas
- Guidelines are clear and actionable
- Examples demonstrate practical application
- Rationales explain the purpose of each standard
- Standards are validated with implementation teams

**Tools and Templates**:
- Technical Standards Template
- Coding Standards Template
- Pattern Documentation Template
- Technology Assessment Template

## Infrastructure Tasks

### Create Infrastructure Architecture

**Purpose**: Design and document a comprehensive infrastructure architecture that supports application requirements while ensuring scalability, reliability, and security.

**Inputs**:
- System architecture documentation
- Non-functional requirements
- Operational requirements
- Cost constraints
- Security requirements

**Process**:
1. **Analyze Requirements**
   - Review system architecture and application needs
   - Identify key infrastructure requirements
   - Document operational requirements
   - Analyze security and compliance needs
   - Consider cost constraints and optimization opportunities

2. **Define Infrastructure Strategy**
   - Select appropriate infrastructure approach (on-premises, cloud, hybrid)
   - Identify key infrastructure patterns
   - Establish high-level infrastructure components
   - Define scaling and redundancy approach

3. **Design Compute Architecture**
   - Define compute resource requirements
   - Specify virtualization or containerization approach
   - Document compute scaling strategy
   - Establish compute resource management

4. **Design Storage Architecture**
   - Define storage requirements and types
   - Specify data persistence mechanisms
   - Document backup and recovery approach
   - Establish data lifecycle management

5. **Design Network Architecture**
   - Define network topology
   - Specify connectivity requirements
   - Document security zones and boundaries
   - Establish network performance requirements

6. **Design Security Architecture**
   - Define security controls and mechanisms
   - Specify identity and access management approach
   - Document encryption and data protection strategies
   - Establish security monitoring and response

7. **Design Operational Architecture**
   - Define monitoring and observability approach
   - Specify deployment and configuration management
   - Document disaster recovery strategy
   - Establish operational procedures

8. **Document Infrastructure Architecture**
   - Create infrastructure overview diagram
   - Document component specifications
   - Create network diagrams
   - Document architectural decisions and rationales
   - Specify implementation approaches

9. **Validate Architecture**
   - Review architecture against requirements
   - Validate technical feasibility
   - Assess alignment with quality attributes
   - Identify potential risks and mitigations
   - Estimate costs and resource requirements

**Outputs**:
- Infrastructure Architecture Documentation
- Network Topology Diagrams
- Security Architecture Specifications
- Operational Architecture Documentation
- Infrastructure Sizing and Scaling Guidelines
- Cost Estimates and Optimization Recommendations

**Integration Points**:
- System Architect: Application requirements alignment
- DevOps Engineer: Implementation and operations planning
- Security Engineer: Security controls validation
- Operations Team: Operational feasibility assessment

**Success Criteria**:
- Infrastructure architecture addresses all application requirements
- Scalability, reliability, and security are explicitly addressed
- Component responsibilities and specifications are clearly defined
- Operational aspects are comprehensively documented
- Security controls are specified with appropriate patterns
- Cost estimates and optimization opportunities are identified
- Technical risks are documented with mitigation strategies

**Tools and Templates**:
- Infrastructure Architecture Template
- Network Diagram Template
- Security Architecture Template
- Operational Architecture Template
- Infrastructure Sizing Calculator

### Review Infrastructure

**Purpose**: Assess existing or proposed infrastructure architecture for alignment with requirements, best practices, and quality attributes.

**Inputs**:
- Infrastructure architecture documentation
- Application requirements
- Non-functional requirements
- Operational requirements
- Security requirements
- Cost constraints

**Process**:
1. **Prepare for Review**
   - Gather all relevant documentation
   - Identify key review criteria
   - Assemble review team with appropriate expertise
   - Define review scope and objectives

2. **Assess Requirements Alignment**
   - Verify infrastructure supports application needs
   - Validate non-functional requirements coverage
   - Assess operational requirements alignment
   - Verify security requirements implementation
   - Evaluate cost alignment with constraints

3. **Evaluate Architecture Quality**
   - Assess scalability approach
   - Evaluate reliability and redundancy
   - Review security architecture
   - Analyze performance characteristics
   - Assess operational efficiency
   - Evaluate cost optimization

4. **Identify Risks and Issues**
   - Document architectural risks
   - Identify potential bottlenecks
   - Highlight security vulnerabilities
   - Note operational challenges
   - Document compliance concerns
   - Identify cost inefficiencies

5. **Develop Recommendations**
   - Prioritize identified issues
   - Create specific improvement recommendations
   - Suggest alternative approaches where appropriate
   - Provide implementation guidance
   - Estimate effort and impact

6. **Document Review Findings**
   - Summarize review process
   - Document strengths and weaknesses
   - Detail specific findings and recommendations
   - Provide actionable next steps
   - Include supporting evidence and analysis

**Outputs**:
- Infrastructure Review Report
- Findings and Recommendations Document
- Risk Assessment
- Improvement Roadmap
- Cost Optimization Recommendations

**Integration Points**:
- System Architect: Application impact assessment
- DevOps Engineer: Implementation feasibility
- Security Engineer: Security assessment validation
- Operations Team: Operational impact assessment

**Success Criteria**:
- Review covers all key infrastructure components
- Findings are specific and evidence-based
- Recommendations are actionable and prioritized
- Risks are clearly identified with mitigation strategies
- Cost optimization opportunities are quantified
- Next steps are clearly defined

**Tools and Templates**:
- Infrastructure Review Template
- Architecture Assessment Checklist
- Risk Assessment Matrix
- Recommendation Prioritization Framework

### Validate Infrastructure

**Purpose**: Verify that implemented infrastructure meets architectural requirements, performs as expected, and delivers required quality attributes.

**Inputs**:
- Infrastructure architecture documentation
- Implementation details
- Non-functional requirements
- Test results
- Operational metrics

**Process**:
1. **Prepare for Validation**
   - Review architecture and requirements
   - Define validation criteria
   - Identify validation methods and tools
   - Create validation plan
   - Establish baseline expectations

2. **Validate Functional Implementation**
   - Verify all components are implemented as specified
   - Confirm connectivity and integration points
   - Validate configuration settings
   - Verify service dependencies
   - Confirm resource allocations

3. **Validate Non-functional Attributes**
   - Assess performance under expected load
   - Verify scalability mechanisms
   - Test reliability and fault tolerance
   - Validate security controls
   - Confirm operational capabilities

4. **Conduct Specialized Testing**
   - Perform load and stress testing
   - Execute failover and recovery testing
   - Conduct security vulnerability assessment
   - Test monitoring and alerting
   - Validate backup and restore procedures

5. **Analyze Results**
   - Compare results against requirements
   - Identify gaps and deviations
   - Analyze performance bottlenecks
   - Document security findings
   - Assess operational readiness

6. **Document Validation Findings**
   - Summarize validation process
   - Document compliance with requirements
   - Detail specific findings and issues
   - Provide recommendations for remediation
   - Include supporting data and analysis

**Outputs**:
- Infrastructure Validation Report
- Performance Analysis
- Security Assessment
- Operational Readiness Evaluation
- Remediation Recommendations

**Integration Points**:
- DevOps Engineer: Implementation details and remediation
- Security Engineer: Security findings review
- Operations Team: Operational readiness assessment
- QA Engineer: Testing methodology and results

**Success Criteria**:
- Validation covers all key infrastructure components
- Performance meets or exceeds requirements
- Security controls are effectively implemented
- Operational capabilities support application needs
- Issues are clearly documented with remediation plans
- Validation results provide confidence for production use

**Tools and Templates**:
- Infrastructure Validation Template
- Performance Testing Framework
- Security Validation Checklist
- Operational Readiness Assessment

## Frontend Architecture Tasks

### Create Frontend Architecture

**Purpose**: Design and document a comprehensive frontend architecture that supports user experience requirements while ensuring performance, maintainability, and scalability.

**Inputs**:
- UX/UI specifications
- System architecture documentation
- Non-functional requirements
- Technical constraints
- Browser and device support requirements

**Process**:
1. **Analyze Requirements**
   - Review UX/UI specifications and user flows
   - Identify key frontend requirements
   - Document technical constraints
   - Analyze performance requirements
   - Consider accessibility needs
   - Define browser and device support matrix

2. **Define Frontend Strategy**
   - Select appropriate frontend approach (SPA, MPA, SSR, etc.)
   - Identify key frontend patterns
   - Establish high-level component structure
   - Define state management approach
   - Select frontend framework and libraries

3. **Design Component Architecture**
   - Define component hierarchy and organization
   - Specify component interfaces and contracts
   - Document component relationships and dependencies
   - Establish component reusability guidelines
   - Define component testing approach

4. **Design Data Management**
   - Define client-side data management approach
   - Establish API integration patterns
   - Document state management architecture
   - Define caching strategy
   - Establish offline capabilities (if required)

5. **Design Interaction Patterns**
   - Define navigation architecture
   - Specify error handling approach
   - Document loading and transition states
   - Establish form handling patterns
   - Define responsive design approach

6. **Design Performance Optimization**
   - Define code splitting and lazy loading strategy
   - Establish asset optimization approach
   - Document caching strategy
   - Define performance metrics and targets
   - Establish performance monitoring approach

7. **Document Frontend Architecture**
   - Create architecture overview diagram
   - Document component specifications
   - Create data flow diagrams
   - Document architectural decisions and rationales
   - Specify implementation guidelines

8. **Validate Architecture**
   - Review architecture against UX/UI requirements
   - Validate technical feasibility
   - Assess alignment with quality attributes
   - Identify potential risks and mitigations

**Outputs**:
- Frontend Architecture Documentation
- Component Architecture Specifications
- State Management Documentation
- API Integration Patterns
- Performance Optimization Strategy
- Implementation Guidelines
- Technical Risk Assessment

**Integration Points**:
- UX/UI Architect: Design alignment and feasibility
- System Architect: Backend integration alignment
- Developer: Implementation guidance
- QA Engineer: Testability assessment

**Success Criteria**:
- Architecture addresses all UX/UI requirements
- Component structure is clearly defined and organized
- State management approach is comprehensive
- API integration patterns are specified
- Performance optimization strategy is detailed
- Implementation guidelines are clear and actionable
- Technical risks are identified with mitigation strategies

**Tools and Templates**:
- Frontend Architecture Template
- Component Specification Template
- State Management Documentation Template
- API Integration Pattern Template
- Performance Optimization Checklist

### Review Frontend Implementation

**Purpose**: Assess frontend implementation for alignment with architecture, adherence to standards, and delivery of required quality attributes.

**Inputs**:
- Frontend architecture documentation
- Implementation code and artifacts
- Technical standards
- Performance requirements
- Accessibility requirements

**Process**:
1. **Prepare for Review**
   - Gather architecture and standards documentation
   - Identify key review criteria
   - Define review scope and objectives
   - Set up code review environment

2. **Assess Architecture Alignment**
   - Verify component implementation matches architecture
   - Validate state management implementation
   - Review API integration patterns
   - Assess code organization and structure
   - Evaluate adherence to defined patterns

3. **Evaluate Code Quality**
   - Review code against technical standards
   - Assess component reusability
   - Evaluate code maintainability
   - Check error handling implementation
   - Review testing coverage and quality

4. **Assess Performance**
   - Review performance optimization implementation
   - Evaluate bundle size and code splitting
   - Assess asset optimization
   - Review caching implementation
   - Evaluate runtime performance

5. **Validate Accessibility**
   - Review accessibility implementation
   - Verify ARIA attributes and roles
   - Assess keyboard navigation
   - Check color contrast and text sizing
   - Evaluate screen reader compatibility

6. **Identify Issues and Recommendations**
   - Document architectural deviations
   - Identify code quality issues
   - Note performance concerns
   - Document accessibility gaps
   - Create specific improvement recommendations

7. **Document Review Findings**
   - Summarize review process
   - Document strengths and weaknesses
   - Detail specific findings and recommendations
   - Provide actionable next steps
   - Include supporting evidence and examples

**Outputs**:
- Frontend Implementation Review Report
- Code Quality Assessment
- Performance Evaluation
- Accessibility Review
- Improvement Recommendations

**Integration Points**:
- Developer: Implementation feedback and guidance
- UX/UI Architect: Design implementation assessment
- QA Engineer: Testing approach validation

**Success Criteria**:
- Review covers all key frontend components
- Architectural alignment is thoroughly assessed
- Code quality evaluation is specific and evidence-based
- Performance assessment includes measurable metrics
- Accessibility review covers WCAG requirements
- Recommendations are actionable and prioritized

**Tools and Templates**:
- Frontend Review Template
- Code Quality Checklist
- Performance Assessment Framework
- Accessibility Review Checklist
- Recommendation Prioritization Matrix

## Integration Architecture Tasks

### Design API Architecture

**Purpose**: Design and document a comprehensive API architecture that enables effective integration between components and systems while ensuring security, performance, and maintainability.

**Inputs**:
- System architecture documentation
- Integration requirements
- Data models
- Security requirements
- Performance requirements

**Process**:
1. **Analyze Requirements**
   - Review integration needs and use cases
   - Identify key API consumers and providers
   - Document data exchange requirements
   - Analyze security and access control needs
   - Consider performance and scalability requirements

2. **Define API Strategy**
   - Select appropriate API styles (REST, GraphQL, gRPC, etc.)
   - Identify key API design patterns
   - Establish versioning strategy
   - Define documentation approach
   - Establish governance model

3. **Design API Structure**
   - Define resource hierarchy and naming conventions
   - Specify endpoint structure and URL patterns
   - Document request and response formats
   - Establish error handling patterns
   - Define pagination and filtering approaches

4. **Design Data Models**
   - Define API data models and DTOs
   - Establish data validation rules
   - Document data transformation patterns
   - Define data consistency approaches
   - Establish backward compatibility guidelines

5. **Design Security Architecture**
   - Define authentication mechanisms
   - Specify authorization approach
   - Document data protection strategies
   - Establish rate limiting and throttling
   - Define security monitoring approach

6. **Design Performance Optimization**
   - Define caching strategy
   - Establish payload optimization approaches
   - Document batching and bulk operation patterns
   - Define performance metrics and targets
   - Establish performance monitoring approach

7. **Document API Architecture**
   - Create API overview diagram
   - Document API specifications (OpenAPI, etc.)
   - Create integration sequence diagrams
   - Document architectural decisions and rationales
   - Specify implementation guidelines

8. **Validate Architecture**
   - Review architecture against integration requirements
   - Validate technical feasibility
   - Assess alignment with quality attributes
   - Identify potential risks and mitigations

**Outputs**:
- API Architecture Documentation
- API Specifications (OpenAPI, etc.)
- Data Model Documentation
- Security Architecture Specifications
- Performance Optimization Strategy
- Implementation Guidelines
- Technical Risk Assessment

**Integration Points**:
- System Architect: Overall architecture alignment
- Developer: Implementation guidance
- Security Engineer: Security controls validation
- QA Engineer: Testability assessment

**Success Criteria**:
- Architecture addresses all integration requirements
- API structure is clearly defined and consistent
- Data models are comprehensive and validated
- Security controls are specified with appropriate patterns
- Performance optimization strategy is detailed
- Implementation guidelines are clear and actionable
- Technical risks are identified with mitigation strategies

**Tools and Templates**:
- API Architecture Template
- OpenAPI Specification Template
- Data Model Documentation Template
- API Security Pattern Template
- Performance Optimization Checklist

### Design Integration Patterns

**Purpose**: Define and document integration patterns that enable effective communication between components and systems while ensuring reliability, scalability, and maintainability.

**Inputs**:
- System architecture documentation
- Integration requirements
- Quality attribute requirements
- Technical constraints
- Existing integration points

**Process**:
1. **Analyze Integration Needs**
   - Review system components and their interactions
   - Identify integration scenarios and use cases
   - Document quality attribute requirements
   - Analyze technical constraints
   - Consider existing integration patterns

2. **Categorize Integration Types**
   - Identify synchronous integration needs
   - Document asynchronous integration requirements
   - Analyze batch processing requirements
   - Consider real-time integration needs
   - Document file-based integration requirements

3. **Select Integration Patterns**
   - Evaluate appropriate patterns for each integration type
   - Consider reliability and fault tolerance requirements
   - Assess scalability needs
   - Evaluate maintainability implications
   - Document pattern selection rationale

4. **Design Synchronous Patterns**
   - Define request-response patterns
   - Specify circuit breaker implementations
   - Document retry strategies
   - Establish timeout handling
   - Define fallback mechanisms

5. **Design Asynchronous Patterns**
   - Define messaging patterns
   - Specify event-driven architectures
   - Document publish-subscribe mechanisms
   - Establish message guarantee levels
   - Define message routing strategies

6. **Design Batch Processing Patterns**
   - Define batch processing workflows
   - Specify file transfer mechanisms
   - Document data transformation approaches
   - Establish error handling and recovery
   - Define monitoring and reporting

7. **Document Integration Patterns**
   - Create pattern catalog
   - Document pattern implementations
   - Create integration sequence diagrams
   - Provide implementation guidelines
   - Document pattern selection criteria

8. **Validate Pattern Selection**
   - Review patterns against requirements
   - Validate technical feasibility
   - Assess alignment with quality attributes
   - Identify potential risks and mitigations

**Outputs**:
- Integration Pattern Catalog
- Pattern Implementation Guidelines
- Integration Sequence Diagrams
- Error Handling Strategies
- Monitoring Recommendations
- Technical Risk Assessment

**Integration Points**:
- System Architect: Overall architecture alignment
- Developer: Implementation guidance
- DevOps Engineer: Operational feasibility
- QA Engineer: Testability assessment

**Success Criteria**:
- Patterns address all integration requirements
- Pattern selection rationale is clearly documented
- Implementation guidelines are comprehensive
- Error handling strategies are robust
- Monitoring recommendations are practical
- Technical risks are identified with mitigation strategies

**Tools and Templates**:
- Integration Pattern Template
- Sequence Diagram Template
- Error Handling Strategy Template
- Pattern Selection Matrix
- Integration Quality Assessment Checklist

## Architecture Validation Tasks

### Conduct Architecture Review

**Purpose**: Systematically evaluate architecture for alignment with requirements, adherence to principles, and delivery of quality attributes.

**Inputs**:
- Architecture documentation
- Requirements documentation
- Architectural principles and standards
- Quality attribute requirements
- Technical constraints

**Process**:
1. **Prepare for Review**
   - Gather all relevant documentation
   - Identify key review criteria
   - Assemble review team with appropriate expertise
   - Define review scope and objectives
   - Create review schedule and agenda

2. **Assess Requirements Alignment**
   - Verify architecture addresses functional requirements
   - Validate quality attribute requirement coverage
   - Assess business goal alignment
   - Verify constraint compliance
   - Evaluate stakeholder concern coverage

3. **Evaluate Architecture Quality**
   - Assess component structure and responsibilities
   - Evaluate interface definitions
   - Review data models and flows
   - Analyze integration approaches
   - Assess technology selections
   - Evaluate deployment model

4. **Conduct Quality Attribute Analysis**
   - Assess performance characteristics
   - Evaluate scalability approach
   - Review security architecture
   - Analyze maintainability factors
   - Assess reliability and availability
   - Evaluate testability

5. **Identify Risks and Issues**
   - Document architectural risks
   - Identify potential bottlenecks
   - Highlight security vulnerabilities
   - Note implementation challenges
   - Document operational concerns
   - Identify evolution limitations

6. **Develop Recommendations**
   - Prioritize identified issues
   - Create specific improvement recommendations
   - Suggest alternative approaches where appropriate
   - Provide implementation guidance
   - Estimate effort and impact

7. **Document Review Findings**
   - Summarize review process
   - Document strengths and weaknesses
   - Detail specific findings and recommendations
   - Provide actionable next steps
   - Include supporting evidence and analysis

**Outputs**:
- Architecture Review Report
- Findings and Recommendations Document
- Risk Assessment
- Improvement Roadmap
- Quality Attribute Analysis

**Integration Points**:
- Product Owner: Business impact assessment
- Developer: Implementation feasibility
- DevOps Engineer: Operational impact assessment
- QA Engineer: Testability assessment

**Success Criteria**:
- Review covers all key architectural aspects
- Findings are specific and evidence-based
- Recommendations are actionable and prioritized
- Risks are clearly identified with mitigation strategies
- Quality attribute analysis is comprehensive
- Next steps are clearly defined

**Tools and Templates**:
- Architecture Review Template
- Quality Attribute Analysis Framework
- Risk Assessment Matrix
- Recommendation Prioritization Framework
- Architecture Evaluation Checklist

### Validate Architecture Implementation

**Purpose**: Verify that implemented system aligns with architectural design, adheres to standards, and delivers required quality attributes.

**Inputs**:
- Architecture documentation
- Implementation artifacts
- Technical standards
- Quality attribute requirements
- Test results

**Process**:
1. **Prepare for Validation**
   - Review architecture and implementation documentation
   - Define validation criteria
   - Identify validation methods and tools
   - Create validation plan
   - Establish baseline expectations

2. **Validate Structural Alignment**
   - Verify component implementation matches architecture
   - Validate interface implementations
   - Review dependency management
   - Assess code organization
   - Evaluate adherence to patterns and standards

3. **Validate Behavioral Alignment**
   - Assess component interactions
   - Verify data flow implementations
   - Review error handling approaches
   - Validate integration implementations
   - Evaluate transaction management

4. **Assess Quality Attribute Implementation**
   - Review performance test results
   - Evaluate security implementation
   - Assess scalability mechanisms
   - Validate reliability features
   - Review maintainability factors
   - Evaluate testability implementation

5. **Identify Deviations and Issues**
   - Document architectural deviations
   - Identify implementation gaps
   - Note quality attribute shortfalls
   - Document technical debt
   - Identify operational concerns

6. **Develop Remediation Plan**
   - Prioritize identified issues
   - Create specific remediation recommendations
   - Suggest implementation approaches
   - Estimate effort and impact
   - Define validation criteria for remediation

7. **Document Validation Findings**
   - Summarize validation process
   - Document alignment assessment
   - Detail specific findings and issues
   - Provide remediation recommendations
   - Include supporting evidence and analysis

**Outputs**:
- Architecture Implementation Validation Report
- Deviation Analysis
- Quality Attribute Assessment
- Technical Debt Documentation
- Remediation Plan

**Integration Points**:
- Developer: Implementation feedback and remediation
- DevOps Engineer: Operational impact assessment
- QA Engineer: Test result interpretation
- Product Owner: Business impact assessment

**Success Criteria**:
- Validation covers all key architectural aspects
- Structural and behavioral alignment is thoroughly assessed
- Quality attribute implementation is evaluated against requirements
- Deviations are clearly documented with impact assessment
- Remediation recommendations are actionable and prioritized
- Technical debt is identified and documented

**Tools and Templates**:
- Architecture Validation Template
- Deviation Analysis Framework
- Quality Attribute Assessment Checklist
- Technical Debt Documentation Template
- Remediation Planning Matrix

## Architecture Evolution Tasks

### Assess Technical Debt

**Purpose**: Systematically identify, document, and assess technical debt to inform prioritization and remediation planning.

**Inputs**:
- Architecture documentation
- Implementation artifacts
- Code quality metrics
- Performance metrics
- Incident reports
- Developer feedback

**Process**:
1. **Prepare for Assessment**
   - Define technical debt categories
   - Establish assessment criteria
   - Identify assessment methods and tools
   - Create assessment plan
   - Assemble assessment team

2. **Identify Technical Debt**
   - Review architecture and implementation
   - Analyze code quality metrics
   - Evaluate test coverage and quality
   - Review performance metrics
   - Analyze incident patterns
   - Gather developer feedback
   - Document identified debt items

3. **Categorize Technical Debt**
   - Classify debt by type (code, architecture, documentation, etc.)
   - Categorize by affected component or area
   - Group by root cause
   - Tag by quality attribute impact
   - Identify deliberate vs. inadvertent debt

4. **Assess Impact and Risk**
   - Evaluate business impact
   - Assess maintenance burden
   - Estimate performance impact
   - Evaluate security implications
   - Assess scalability limitations
   - Estimate remediation cost
   - Determine risk level

5. **Prioritize Technical Debt**
   - Define prioritization criteria
   - Score debt items based on impact and risk
   - Consider remediation cost and complexity
   - Evaluate business value of remediation
   - Create prioritized debt backlog

6. **Develop Remediation Strategy**
   - Group related debt items
   - Identify quick wins
   - Define remediation approaches
   - Estimate remediation effort
   - Create remediation roadmap
   - Define success criteria for remediation

7. **Document Assessment Findings**
   - Summarize assessment process
   - Document technical debt inventory
   - Detail impact and risk assessment
   - Provide prioritized remediation plan
   - Include supporting evidence and analysis

**Outputs**:
- Technical Debt Assessment Report
- Technical Debt Inventory
- Impact and Risk Analysis
- Prioritized Remediation Plan
- Remediation Roadmap

**Integration Points**:
- Product Owner: Business impact assessment
- Developer: Remediation planning
- Project Manager: Resource planning
- DevOps Engineer: Operational impact assessment

**Success Criteria**:
- Assessment covers all key system areas
- Technical debt is comprehensively documented
- Impact and risk assessment is evidence-based
- Prioritization is clear and justified
- Remediation plan is actionable and realistic
- Remediation roadmap aligns with business priorities

**Tools and Templates**:
- Technical Debt Assessment Template
- Debt Inventory Template
- Impact and Risk Matrix
- Remediation Planning Framework
- Technical Debt Dashboard

### Create Architecture Evolution Plan

**Purpose**: Develop a strategic plan for evolving architecture to address changing requirements, reduce technical debt, and incorporate new technologies.

**Inputs**:
- Current architecture documentation
- Business roadmap
- Technical debt assessment
- Technology trends
- Performance and scalability projections
- Security requirements evolution

**Process**:
1. **Analyze Current State**
   - Review current architecture
   - Identify strengths and weaknesses
   - Assess technical debt
   - Evaluate performance and scalability
   - Review security posture
   - Identify operational challenges

2. **Define Evolution Drivers**
   - Review business roadmap and future requirements
   - Identify scaling needs
   - Document performance improvement requirements
   - Analyze security enhancement needs
   - Consider operational efficiency improvements
   - Evaluate technology obsolescence

3. **Research Technology Options**
   - Identify emerging technologies and patterns
   - Evaluate technology maturity
   - Assess alignment with architectural principles
   - Consider organizational capabilities
   - Evaluate migration complexity
   - Document technology selection criteria

4. **Define Target Architecture**
   - Create target architecture vision
   - Define component evolution
   - Document interface changes
   - Specify data architecture evolution
   - Define integration architecture changes
   - Document deployment architecture evolution

5. **Develop Transition Strategy**
   - Define evolution phases
   - Identify incremental changes
   - Document dependencies between changes
   - Establish migration patterns
   - Define coexistence strategies
   - Create rollback approaches

6. **Create Implementation Roadmap**
   - Define evolution milestones
   - Create timeline for changes
   - Identify resource requirements
   - Document risk mitigation strategies
   - Define success criteria for each phase
   - Establish validation approach

7. **Document Evolution Plan**
   - Summarize evolution strategy
   - Document target architecture
   - Detail transition approach
   - Provide implementation roadmap
   - Include risk assessment and mitigation
   - Define governance approach

**Outputs**:
- Architecture Evolution Plan
- Target Architecture Documentation
- Transition Strategy
- Implementation Roadmap
- Risk Assessment and Mitigation Plan
- Technology Selection Recommendations

**Integration Points**:
- Product Owner: Business alignment
- Project Manager: Resource planning
- Developer: Implementation feasibility
- DevOps Engineer: Operational impact assessment

**Success Criteria**:
- Evolution plan addresses business roadmap requirements
- Target architecture is clearly defined
- Transition strategy is incremental and practical
- Implementation roadmap is realistic and time-bound
- Risks are identified with mitigation strategies
- Technology selections are justified and appropriate

**Tools and Templates**:
- Architecture Evolution Template
- Target Architecture Documentation Template
- Transition Planning Framework
- Implementation Roadmap Template
- Technology Assessment Matrix

### Evaluate New Technologies

**Purpose**: Systematically assess new technologies for potential adoption, evaluating their benefits, risks, and alignment with architectural principles.

**Inputs**:
- Current architecture documentation
- Technology requirements
- Architectural principles
- Industry trends
- Vendor information
- Community feedback

**Process**:
1. **Define Evaluation Context**
   - Identify technology needs and gaps
   - Document evaluation objectives
   - Define evaluation criteria
   - Establish evaluation team
   - Create evaluation timeline

2. **Identify Technology Candidates**
   - Research industry trends
   - Review vendor offerings
   - Consider open source options
   - Gather team recommendations
   - Document initial candidate list

3. **Conduct Initial Screening**
   - Assess alignment with architectural principles
   - Evaluate feature coverage
   - Consider technology maturity
   - Review community support
   - Assess vendor stability
   - Create shortlist of candidates

4. **Perform Detailed Evaluation**
   - Analyze technical capabilities
   - Assess performance characteristics
   - Evaluate security features
   - Review scalability approach
   - Consider integration capabilities
   - Assess operational requirements
   - Evaluate licensing and cost

5. **Conduct Proof of Concept**
   - Define PoC objectives and scope
   - Implement key scenarios
   - Test integration capabilities
   - Evaluate performance
   - Assess developer experience
   - Document findings and lessons learned

6. **Assess Organizational Impact**
   - Evaluate learning curve
   - Assess tooling requirements
   - Consider process impacts
   - Evaluate support requirements
   - Assess migration complexity
   - Consider organizational readiness

7. **Make Technology Recommendation**
   - Compare candidates against criteria
   - Document pros and cons
   - Provide adoption recommendation
   - Define adoption strategy
   - Identify risks and mitigation
   - Create implementation plan

8. **Document Evaluation Findings**
   - Summarize evaluation process
   - Document detailed findings
   - Provide technology comparison
   - Detail recommendation rationale
   - Include supporting evidence and analysis

**Outputs**:
- Technology Evaluation Report
- Technology Comparison Matrix
- Proof of Concept Results
- Adoption Recommendation
- Implementation Plan
- Risk Assessment

**Integration Points**:
- Product Owner: Business impact assessment
- Developer: Technical feasibility and experience
- DevOps Engineer: Operational impact assessment
- Project Manager: Resource and timeline planning

**Success Criteria**:
- Evaluation covers all relevant technologies
- Assessment criteria are comprehensive and objective
- Proof of concept provides meaningful insights
- Organizational impact is thoroughly assessed
- Recommendation is well-justified and evidence-based
- Implementation plan is practical and realistic

**Tools and Templates**:
- Technology Evaluation Template
- Technology Comparison Matrix
- Proof of Concept Framework
- Adoption Planning Template
- Technology Risk Assessment Matrix

## Task Execution Guidelines

### General Execution Principles

1. **Preparation is Key**
   - Gather all required inputs before starting
   - Understand the context and objectives
   - Identify stakeholders and their needs
   - Plan the execution approach

2. **Collaborate Effectively**
   - Engage relevant personas early and often
   - Communicate progress and findings regularly
   - Seek feedback and validation throughout
   - Document decisions and rationales

3. **Focus on Quality**
   - Follow established standards and practices
   - Validate outputs against success criteria
   - Seek peer review for critical deliverables
   - Maintain documentation quality

4. **Consider the Bigger Picture**
   - Align with overall architectural vision
   - Consider long-term implications
   - Balance competing concerns and trade-offs
   - Think about evolution and maintenance

### Task Customization

Tasks in this library can be customized based on:

- **Project Context**: Adapt scope and depth based on project size and complexity
- **Organizational Standards**: Incorporate specific organizational practices and standards
- **Technology Stack**: Adjust technical approaches based on selected technologies
- **Team Capabilities**: Modify execution approach based on team skills and experience
- **Time Constraints**: Prioritize activities based on available time and resources

### Quality Assurance

Each task should include quality assurance activities:

- **Self-Review**: Review outputs against success criteria
- **Peer Review**: Seek feedback from other architects or technical experts
- **Stakeholder Validation**: Confirm outputs meet stakeholder needs
- **Documentation Review**: Ensure documentation is clear and complete
- **Standards Compliance**: Verify adherence to organizational standards

### Continuous Improvement

The task library should be continuously improved based on:

- **Execution Experience**: Update tasks based on lessons learned
- **Feedback**: Incorporate feedback from task executors and stakeholders
- **Industry Evolution**: Update tasks to reflect industry best practices
- **Organizational Learning**: Adapt tasks to organizational context and capabilities
- **Tool Evolution**: Update tasks to leverage new tools and technologies

## Conclusion

The Architect Task Library provides a comprehensive set of specialized tasks designed to support the Architect persona throughout the project lifecycle. By following these structured approaches, architects can effectively execute their responsibilities while ensuring quality, consistency, and alignment with the BMAD Method principles.

For more information about the Architect persona, refer to the [Architect Comprehensive Guide](architect-comprehensive-guide.md) and [Architect Integration Guide](architect-integration-guide.md) documents.
```
