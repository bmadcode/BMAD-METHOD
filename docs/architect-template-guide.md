# Architect Template Guide
**BMAD Method: System Architecture Persona**

## Introduction

The Architect Template Guide provides a comprehensive collection of templates designed specifically for the Architect persona within the BMAD Method. These templates standardize architectural documentation, ensure consistency across projects, and provide structured approaches for capturing and communicating architectural decisions and designs.

## Table of Contents

1. [Template Overview](#template-overview)
2. [Architecture Documentation Templates](#architecture-documentation-templates)
3. [Design Decision Templates](#design-decision-templates)
4. [Assessment and Review Templates](#assessment-and-review-templates)
5. [Planning and Strategy Templates](#planning-and-strategy-templates)
6. [Template Usage Guidelines](#template-usage-guidelines)
7. [Template Customization](#template-customization)

## Template Overview

Each template in this guide follows a consistent structure:

- **Purpose**: Clear statement of the template's objective
- **When to Use**: Guidance on appropriate usage scenarios
- **Structure**: Detailed template sections and content guidelines
- **Examples**: Sample content to illustrate proper usage
- **Integration**: Connections to other templates and workflows
- **Customization**: Guidelines for adapting the template

Templates are organized by category based on their primary use case and typical sequence in the architectural workflow.

## Architecture Documentation Templates

### System Architecture Template

**Purpose**: Provide a comprehensive structure for documenting complete system architecture.

**When to Use**: 
- Creating initial system architecture documentation
- Documenting architecture for new systems
- Updating existing architecture documentation
- Communicating architecture to stakeholders

**Structure**:

```markdown
# System Architecture: [System Name]

## Executive Summary
- System overview and purpose
- Key architectural decisions
- Quality attributes addressed
- Technology stack summary

## Business Context
- Business objectives
- Key stakeholders
- Business constraints
- Success criteria

## System Overview
- System purpose and scope
- Key capabilities
- User types and scenarios
- System boundaries

## Architecture Principles
- Guiding principles
- Design philosophy
- Quality attribute priorities
- Technology preferences

## Quality Attributes
- Performance requirements
- Scalability needs
- Security requirements
- Reliability expectations
- Maintainability goals
- Other quality attributes

## System Context
- External systems and dependencies
- User interactions
- Data sources and destinations
- Integration points

## Component Architecture
- High-level component diagram
- Component responsibilities
- Component interfaces
- Component relationships

## Data Architecture
- Data models
- Data flow diagrams
- Data storage approach
- Data consistency strategy

## Integration Architecture
- Integration patterns
- API specifications
- Message formats
- Error handling approach

## Deployment Architecture
- Deployment model
- Infrastructure requirements
- Scaling approach
- Operational considerations

## Security Architecture
- Security controls
- Authentication approach
- Authorization model
- Data protection strategy

## Technology Stack
- Technology selections
- Technology rationale
- Version specifications
- Technology constraints

## Architectural Decisions
- Key decisions made
- Alternatives considered
- Decision rationale
- Implications and trade-offs

## Implementation Approach
- Development phases
- Implementation priorities
- Technical dependencies
- Risk mitigation strategies

## Validation Approach
- Architecture validation strategy
- Testing approach
- Quality assurance measures
- Success criteria

## Evolution Strategy
- Anticipated changes
- Extension points
- Technology evolution plan
- Maintenance approach

## Appendices
- Detailed diagrams
- Technical specifications
- Reference materials
- Glossary
```

**Examples**:
- E-commerce platform architecture
- Microservices architecture documentation
- Legacy system modernization architecture

**Integration**: Links to component specifications, API documentation, deployment guides

**Customization**: Adapt sections based on system complexity, organizational standards, stakeholder needs

### Component Architecture Template

**Purpose**: Provide detailed documentation structure for individual system components.

**When to Use**:
- Documenting individual components in detail
- Specifying component interfaces and contracts
- Communicating component design to developers
- Creating component implementation guidelines

**Structure**:

```markdown
# Component Architecture: [Component Name]

## Component Overview
- Component purpose and responsibilities
- Position in overall architecture
- Key capabilities
- Component boundaries

## Component Context
- Dependencies on other components
- Components that depend on this component
- External system interactions
- Data sources and destinations

## Functional Requirements
- Core functionality
- Use cases supported
- Business rules implemented
- Data processing requirements

## Non-Functional Requirements
- Performance requirements
- Scalability needs
- Security requirements
- Reliability expectations

## Component Design
- Internal structure
- Sub-components and modules
- Design patterns used
- Key algorithms and logic

## Interface Specifications
- Public interfaces
- Interface contracts
- Data formats
- Error handling

## Data Model
- Internal data structures
- Data validation rules
- Data transformation logic
- Data persistence approach

## Configuration
- Configuration parameters
- Environment-specific settings
- Runtime configuration
- Default values

## Error Handling
- Error scenarios
- Error handling strategies
- Error reporting approach
- Recovery mechanisms

## Testing Strategy
- Unit testing approach
- Integration testing requirements
- Test data requirements
- Testing tools and frameworks

## Implementation Guidelines
- Coding standards
- Development practices
- Technology-specific guidance
- Performance considerations

## Deployment Considerations
- Deployment requirements
- Environment dependencies
- Scaling considerations
- Monitoring requirements

## Maintenance and Support
- Maintenance procedures
- Support requirements
- Troubleshooting guidance
- Documentation maintenance
```

**Examples**:
- User authentication component
- Payment processing component
- Data analytics component

**Integration**: Links to system architecture, API specifications, implementation code

**Customization**: Adjust detail level based on component complexity, team needs, technology stack

### API Architecture Template

**Purpose**: Provide comprehensive structure for documenting API architecture and specifications.

**When to Use**:
- Designing new APIs
- Documenting existing APIs
- Communicating API design to developers
- Creating API implementation guidelines

**Structure**:

```markdown
# API Architecture: [API Name]

## API Overview
- API purpose and scope
- Target consumers
- Key capabilities
- API boundaries

## API Strategy
- API style (REST, GraphQL, gRPC, etc.)
- Design principles
- Versioning strategy
- Documentation approach

## Resource Model
- Resource hierarchy
- Resource relationships
- Resource lifecycle
- Resource naming conventions

## Endpoint Specifications
- Endpoint structure
- HTTP methods used
- URL patterns
- Parameter specifications

## Data Models
- Request/response schemas
- Data validation rules
- Data transformation logic
- Error response formats

## Authentication and Authorization
- Authentication mechanisms
- Authorization approach
- Access control model
- Security token management

## Error Handling
- Error response format
- Error codes and messages
- Error handling patterns
- Client error handling guidance

## Performance Considerations
- Caching strategy
- Rate limiting approach
- Pagination patterns
- Bulk operation support

## Versioning Strategy
- Versioning approach
- Backward compatibility
- Deprecation strategy
- Migration guidance

## Documentation Standards
- Documentation format
- Code examples
- Testing guidance
- SDK considerations

## Implementation Guidelines
- Technology stack
- Framework selection
- Coding standards
- Testing approach

## Operational Considerations
- Monitoring requirements
- Logging standards
- Deployment approach
- Support procedures
```

**Examples**:
- RESTful API for user management
- GraphQL API for content management
- gRPC API for microservice communication

**Integration**: Links to system architecture, component specifications, client documentation

**Customization**: Adapt based on API style, complexity, consumer needs, organizational standards

## Design Decision Templates

### Architectural Decision Record (ADR) Template

**Purpose**: Provide structured format for documenting architectural decisions, alternatives, and rationales.

**When to Use**:
- Making significant architectural decisions
- Documenting technology selections
- Recording design trade-offs
- Communicating decision rationale

**Structure**:

```markdown
# ADR-[Number]: [Decision Title]

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
- Problem statement
- Business context
- Technical context
- Constraints and requirements
- Stakeholders involved

## Decision Drivers
- Quality attributes
- Business requirements
- Technical constraints
- Organizational factors
- External factors

## Options Considered
### Option 1: [Option Name]
- Description
- Pros
- Cons
- Implementation considerations

### Option 2: [Option Name]
- Description
- Pros
- Cons
- Implementation considerations

### Option 3: [Option Name]
- Description
- Pros
- Cons
- Implementation considerations

## Decision
- Selected option
- Decision rationale
- Key factors in decision
- Assumptions made

## Consequences
### Positive
- Benefits realized
- Quality attributes improved
- Capabilities enabled

### Negative
- Trade-offs accepted
- Limitations introduced
- Technical debt incurred

### Neutral
- Other implications
- Monitoring requirements
- Future considerations

## Implementation
- Implementation approach
- Timeline and milestones
- Resource requirements
- Dependencies

## Validation
- Success criteria
- Validation approach
- Monitoring metrics
- Review schedule

## Related Decisions
- Previous decisions that influenced this decision
- Decisions that this decision influences
- Conflicting decisions
- Supporting decisions

## References
- Supporting documentation
- Research materials
- Industry standards
- Expert opinions

## Notes
- Additional context
- Lessons learned
- Future considerations
- Review history
```

**Examples**:
- Database technology selection
- Microservices vs. monolith decision
- Authentication mechanism selection

**Integration**: Links to system architecture, implementation guidelines, review processes

**Customization**: Adjust sections based on decision complexity, organizational requirements, stakeholder needs

### Technology Selection Template

**Purpose**: Provide structured approach for evaluating and documenting technology selections.

**When to Use**:
- Evaluating technology options
- Documenting technology decisions
- Comparing technology alternatives
- Communicating technology rationale

**Structure**:

```markdown
# Technology Selection: [Technology Category]

## Selection Context
- Technology need description
- Business requirements
- Technical requirements
- Constraints and limitations
- Selection timeline

## Evaluation Criteria
- Functional requirements
- Non-functional requirements
- Technical factors
- Business factors
- Risk factors

## Technology Options
### Option 1: [Technology Name]
- Overview and description
- Key features and capabilities
- Strengths and advantages
- Weaknesses and limitations
- Licensing and cost model
- Community and support
- Maturity and stability

### Option 2: [Technology Name]
- Overview and description
- Key features and capabilities
- Strengths and advantages
- Weaknesses and limitations
- Licensing and cost model
- Community and support
- Maturity and stability

### Option 3: [Technology Name]
- Overview and description
- Key features and capabilities
- Strengths and advantages
- Weaknesses and limitations
- Licensing and cost model
- Community and support
- Maturity and stability

## Evaluation Matrix
| Criteria | Weight | Option 1 | Option 2 | Option 3 |
|----------|--------|----------|----------|----------|
| Functional Fit | 25% | Score | Score | Score |
| Performance | 20% | Score | Score | Score |
| Scalability | 15% | Score | Score | Score |
| Security | 15% | Score | Score | Score |
| Cost | 10% | Score | Score | Score |
| Support | 10% | Score | Score | Score |
| Learning Curve | 5% | Score | Score | Score |
| **Total** | **100%** | **Total** | **Total** | **Total** |

## Proof of Concept Results
- PoC objectives
- Implementation approach
- Key findings
- Performance results
- Integration results
- Developer experience

## Recommendation
- Selected technology
- Selection rationale
- Key decision factors
- Assumptions and risks

## Implementation Plan
- Adoption approach
- Timeline and milestones
- Resource requirements
- Training needs
- Migration strategy

## Risk Assessment
- Technical risks
- Business risks
- Mitigation strategies
- Contingency plans

## Success Criteria
- Adoption success metrics
- Performance targets
- Quality measures
- Business outcomes

## References
- Vendor documentation
- Community resources
- Industry analysis
- Expert opinions
```

**Examples**:
- Database technology selection
- Frontend framework evaluation
- Cloud platform selection

**Integration**: Links to ADRs, system architecture, implementation guidelines

**Customization**: Adapt criteria and evaluation approach based on technology type, organizational context

## Assessment and Review Templates

### Architecture Review Template

**Purpose**: Provide structured approach for conducting comprehensive architecture reviews.

**When to Use**:
- Conducting formal architecture reviews
- Assessing architecture quality
- Validating architectural decisions
- Identifying improvement opportunities

**Structure**:

```markdown
# Architecture Review: [System/Component Name]

## Review Overview
- Review objectives
- Review scope
- Review team
- Review timeline
- Review methodology

## Architecture Summary
- System overview
- Key architectural decisions
- Technology stack
- Quality attributes addressed

## Review Criteria
- Functional requirements alignment
- Quality attribute requirements
- Architectural principles compliance
- Technology standards adherence
- Best practices implementation

## Functional Requirements Assessment
### Requirement 1: [Requirement Name]
- Architecture support
- Implementation approach
- Gaps or concerns
- Recommendations

### Requirement 2: [Requirement Name]
- Architecture support
- Implementation approach
- Gaps or concerns
- Recommendations

## Quality Attributes Assessment
### Performance
- Current approach
- Strengths
- Weaknesses
- Recommendations

### Scalability
- Current approach
- Strengths
- Weaknesses
- Recommendations

### Security
- Current approach
- Strengths
- Weaknesses
- Recommendations

### Maintainability
- Current approach
- Strengths
- Weaknesses
- Recommendations

### Reliability
- Current approach
- Strengths
- Weaknesses
- Recommendations

## Architecture Quality Assessment
### Component Structure
- Component organization
- Responsibility distribution
- Interface design
- Coupling and cohesion

### Data Architecture
- Data model quality
- Data flow design
- Data consistency approach
- Data access patterns

### Integration Architecture
- Integration patterns
- API design
- Error handling
- Performance considerations

### Technology Usage
- Technology appropriateness
- Technology consistency
- Technology risks
- Technology evolution

## Risk Assessment
### High Risks
- Risk description
- Impact assessment
- Likelihood assessment
- Mitigation recommendations

### Medium Risks
- Risk description
- Impact assessment
- Likelihood assessment
- Mitigation recommendations

### Low Risks
- Risk description
- Impact assessment
- Likelihood assessment
- Mitigation recommendations

## Findings and Recommendations
### Strengths
- Architecture strengths
- Well-implemented aspects
- Best practices followed

### Areas for Improvement
- Improvement opportunities
- Specific recommendations
- Priority assessment
- Implementation guidance

### Critical Issues
- Critical problems identified
- Immediate actions required
- Risk mitigation needs
- Escalation requirements

## Action Plan
### Immediate Actions (0-30 days)
- Action item
- Responsible party
- Timeline
- Success criteria

### Short-term Actions (1-3 months)
- Action item
- Responsible party
- Timeline
- Success criteria

### Long-term Actions (3+ months)
- Action item
- Responsible party
- Timeline
- Success criteria

## Review Conclusion
- Overall assessment
- Key recommendations
- Next steps
- Follow-up schedule

## Appendices
- Detailed findings
- Supporting evidence
- Reference materials
- Review artifacts
```

**Examples**:
- Microservices architecture review
- Legacy system assessment
- Security architecture review

**Integration**: Links to architecture documentation, improvement plans, follow-up reviews

**Customization**: Adapt review criteria and depth based on system complexity, review objectives

### Technical Debt Assessment Template

**Purpose**: Provide structured approach for identifying, documenting, and prioritizing technical debt.

**When to Use**:
- Conducting technical debt assessments
- Planning technical debt remediation
- Communicating technical debt impact
- Prioritizing improvement efforts

**Structure**:

```markdown
# Technical Debt Assessment: [System/Component Name]

## Assessment Overview
- Assessment objectives
- Assessment scope
- Assessment team
- Assessment timeline
- Assessment methodology

## Technical Debt Categories
- Code debt
- Architecture debt
- Documentation debt
- Test debt
- Infrastructure debt

## Debt Identification
### Code Debt
#### Debt Item 1: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

#### Debt Item 2: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

### Architecture Debt
#### Debt Item 1: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

#### Debt Item 2: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

### Documentation Debt
#### Debt Item 1: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

### Test Debt
#### Debt Item 1: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

### Infrastructure Debt
#### Debt Item 1: [Description]
- Location/Component
- Description
- Root cause
- Impact assessment
- Remediation effort
- Priority

## Impact Analysis
### Business Impact
- Development velocity impact
- Maintenance cost impact
- Quality impact
- Risk impact

### Technical Impact
- Performance impact
- Scalability impact
- Security impact
- Maintainability impact

## Debt Prioritization
### High Priority Debt
- Debt items
- Justification
- Recommended timeline
- Resource requirements

### Medium Priority Debt
- Debt items
- Justification
- Recommended timeline
- Resource requirements

### Low Priority Debt
- Debt items
- Justification
- Recommended timeline
- Resource requirements

## Remediation Strategy
### Quick Wins (0-1 month)
- Debt items to address
- Remediation approach
- Resource requirements
- Expected benefits

### Short-term (1-3 months)
- Debt items to address
- Remediation approach
- Resource requirements
- Expected benefits

### Long-term (3+ months)
- Debt items to address
- Remediation approach
- Resource requirements
- Expected benefits

## Cost-Benefit Analysis
### Remediation Costs
- Development effort
- Testing effort
- Deployment effort
- Risk mitigation effort

### Expected Benefits
- Velocity improvements
- Maintenance cost reduction
- Quality improvements
- Risk reduction

## Implementation Plan
### Phase 1: [Timeline]
- Debt items to address
- Remediation activities
- Resource allocation
- Success criteria

### Phase 2: [Timeline]
- Debt items to address
- Remediation activities
- Resource allocation
- Success criteria

### Phase 3: [Timeline]
- Debt items to address
- Remediation activities
- Resource allocation
- Success criteria

## Monitoring and Tracking
- Debt tracking approach
- Progress metrics
- Review schedule
- Escalation criteria

## Recommendations
- Immediate actions
- Strategic recommendations
- Process improvements
- Prevention strategies

## Appendices
- Detailed debt inventory
- Supporting evidence
- Metrics and measurements
- Reference materials
```

**Examples**:
- Legacy system debt assessment
- Microservices technical debt review
- Frontend architecture debt analysis

**Integration**: Links to architecture documentation, improvement plans, development processes

**Customization**: Adapt categories and assessment criteria based on system type, organizational context

## Planning and Strategy Templates

### Architecture Evolution Plan Template

**Purpose**: Provide structured approach for planning architecture evolution and modernization.

**When to Use**:
- Planning architecture modernization
- Defining architecture roadmap
- Communicating evolution strategy
- Guiding incremental improvements

**Structure**:

```markdown
# Architecture Evolution Plan: [System Name]

## Evolution Overview
- Evolution objectives
- Business drivers
- Technical drivers
- Evolution timeline
- Success criteria

## Current State Analysis
### Current Architecture
- Architecture overview
- Key components
- Technology stack
- Integration points

### Strengths
- Architecture strengths
- Well-functioning aspects
- Valuable capabilities
- Reusable components

### Weaknesses
- Architecture limitations
- Technical debt
- Performance issues
- Scalability constraints
- Security concerns

### Opportunities
- Improvement opportunities
- Technology upgrades
- Process improvements
- Capability enhancements

### Threats
- Technology obsolescence
- Security vulnerabilities
- Compliance risks
- Competitive pressures

## Future State Vision
### Target Architecture
- Architecture vision
- Key improvements
- New capabilities
- Technology evolution

### Quality Attributes
- Performance targets
- Scalability goals
- Security enhancements
- Reliability improvements
- Maintainability goals

### Technology Strategy
- Technology modernization
- Platform evolution
- Tool improvements
- Skill development

## Evolution Strategy
### Evolution Principles
- Guiding principles
- Evolution approach
- Risk management
- Value delivery

### Evolution Patterns
- Incremental evolution
- Parallel development
- Gradual migration
- Big bang replacement

### Coexistence Strategy
- Legacy system integration
- Data synchronization
- User experience continuity
- Operational continuity

## Evolution Roadmap
### Phase 1: [Timeline]
#### Objectives
- Phase objectives
- Key deliverables
- Success criteria

#### Activities
- Architecture changes
- Technology upgrades
- Process improvements
- Capability enhancements

#### Dependencies
- Technical dependencies
- Business dependencies
- Resource dependencies

#### Risks
- Technical risks
- Business risks
- Mitigation strategies

### Phase 2: [Timeline]
#### Objectives
- Phase objectives
- Key deliverables
- Success criteria

#### Activities
- Architecture changes
- Technology upgrades
- Process improvements
- Capability enhancements

#### Dependencies
- Technical dependencies
- Business dependencies
- Resource dependencies

#### Risks
- Technical risks
- Business risks
- Mitigation strategies

### Phase 3: [Timeline]
#### Objectives
- Phase objectives
- Key deliverables
- Success criteria

#### Activities
- Architecture changes
- Technology upgrades
- Process improvements
- Capability enhancements

#### Dependencies
- Technical dependencies
- Business dependencies
- Resource dependencies

#### Risks
- Technical risks
- Business risks
- Mitigation strategies

## Implementation Strategy
### Migration Approach
- Migration patterns
- Data migration strategy
- User migration approach
- Rollback procedures

### Technology Adoption
- Technology selection criteria
- Adoption approach
- Training requirements
- Support strategy

### Quality Assurance
- Testing strategy
- Validation approach
- Performance testing
- Security testing

### Change Management
- Communication strategy
- Training approach
- Support procedures
- Feedback mechanisms

## Resource Requirements
### Team Structure
- Required roles
- Skill requirements
- Team organization
- External resources

### Technology Resources
- Infrastructure requirements
- Tool requirements
- License requirements
- Platform requirements

### Budget Considerations
- Development costs
- Infrastructure costs
- Training costs
- Operational costs

## Risk Management
### Technical Risks
- Risk identification
- Impact assessment
- Mitigation strategies
- Contingency plans

### Business Risks
- Risk identification
- Impact assessment
- Mitigation strategies
- Contingency plans

### Organizational Risks
- Risk identification
- Impact assessment
- Mitigation strategies
- Contingency plans

## Success Metrics
### Technical Metrics
- Performance improvements
- Quality improvements
- Reliability improvements
- Security enhancements

### Business Metrics
- Cost reductions
- Productivity improvements
- Time-to-market improvements
- Customer satisfaction

### Organizational Metrics
- Skill development
- Process improvements
- Tool adoption
- Knowledge transfer

## Governance
### Decision Making
- Decision authority
- Approval processes
- Escalation procedures
- Review cycles

### Progress Tracking
- Progress metrics
- Reporting approach
- Review schedule
- Adjustment procedures

### Quality Control
- Quality standards
- Review processes
- Validation procedures
- Compliance checks

## Communication Plan
### Stakeholder Communication
- Stakeholder groups
- Communication frequency
- Communication channels
- Message customization

### Progress Reporting
- Report structure
- Reporting frequency
- Distribution lists
- Escalation procedures

## Appendices
- Detailed technical specifications
- Cost-benefit analysis
- Risk register
- Reference materials
```

**Examples**:
- Legacy system modernization plan
- Cloud migration strategy
- Microservices evolution plan

**Integration**: Links to current architecture, technical debt assessment, business roadmap

**Customization**: Adapt based on evolution scope, organizational context, timeline constraints

## Template Usage Guidelines

### Selecting the Right Template

1. **Identify the Purpose**: Determine what you need to document or plan
2. **Consider the Audience**: Understand who will use the documentation
3. **Assess the Scope**: Determine the appropriate level of detail
4. **Review Dependencies**: Identify related templates and documents
5. **Consider Timeline**: Select templates that fit your timeline constraints

### Template Completion Best Practices

1. **Start with Context**: Always begin with clear context and objectives
2. **Be Specific**: Provide concrete, actionable information
3. **Use Examples**: Include examples to illustrate concepts
4. **Validate Content**: Review content with stakeholders
5. **Maintain Currency**: Keep templates updated as situations change

### Quality Assurance

1. **Completeness Check**: Ensure all sections are addressed
2. **Consistency Review**: Verify consistency with other documents
3. **Clarity Assessment**: Ensure content is clear and understandable
4. **Accuracy Validation**: Verify technical accuracy
5. **Stakeholder Review**: Get feedback from relevant stakeholders

### Integration with BMAD Workflow

1. **Workflow Alignment**: Ensure templates align with BMAD workflow stages
2. **Persona Integration**: Consider how templates support different personas
3. **Artifact Relationships**: Maintain clear relationships between artifacts
4. **Handoff Procedures**: Use templates to support clean handoffs
5. **Continuous Improvement**: Update templates based on usage experience

## Template Customization

### Organizational Adaptation

Templates can be customized for organizational needs:

1. **Standards Integration**: Incorporate organizational standards and practices
2. **Tool Integration**: Adapt templates for specific tools and platforms
3. **Process Alignment**: Align templates with organizational processes
4. **Terminology Consistency**: Use organizational terminology and conventions
5. **Compliance Requirements**: Include compliance and regulatory requirements

### Project-Specific Customization

Templates can be adapted for specific projects:

1. **Scope Adjustment**: Modify scope and detail level based on project needs
2. **Technology Focus**: Emphasize relevant technologies and approaches
3. **Stakeholder Needs**: Customize content for specific stakeholder groups
4. **Timeline Constraints**: Adapt templates for available time and resources
5. **Risk Profile**: Adjust risk assessment and mitigation approaches

### Template Evolution

Templates should evolve based on:

1. **Usage Experience**: Update based on practical usage and feedback
2. **Industry Evolution**: Incorporate new industry practices and standards
3. **Technology Changes**: Update for new technologies and approaches
4. **Organizational Learning**: Incorporate lessons learned and best practices
5. **Stakeholder Feedback**: Respond to user feedback and suggestions

## Conclusion

The Architect Template Guide provides a comprehensive set of templates designed to support the Architect persona throughout the project lifecycle. By using these templates consistently, architects can ensure quality, completeness, and consistency in their documentation while improving communication and collaboration with other personas.

For more information about the Architect persona, refer to the [Architect Comprehensive Guide](architect-comprehensive-guide.md) and [Architect Integration Guide](architect-integration-guide.md) documents.
```
