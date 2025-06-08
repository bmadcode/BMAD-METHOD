# Product Owner (Sarah) Template Guide

## Overview

This comprehensive template guide provides Product Owners with a complete collection of templates, frameworks, and tools for effective product ownership within the BMAD Method. These templates ensure consistency, quality, and efficiency in all product ownership activities.

## Table of Contents

1. [Template Categories](#template-categories)
2. [User Story Templates](#user-story-templates)
3. [Epic and Feature Templates](#epic-and-feature-templates)
4. [Backlog Management Templates](#backlog-management-templates)
5. [Sprint Planning Templates](#sprint-planning-templates)
6. [Stakeholder Communication Templates](#stakeholder-communication-templates)
7. [Quality Assurance Templates](#quality-assurance-templates)
8. [Template Selection Guide](#template-selection-guide)
9. [Customization Guidelines](#customization-guidelines)

## Template Categories

### 1. User Story Templates
- Standard User Story Template
- Technical Story Template
- Bug Fix Story Template
- Spike Story Template
- Epic Breakdown Template

### 2. Epic and Feature Templates
- Epic Definition Template
- Feature Specification Template
- Theme Documentation Template
- Initiative Planning Template

### 3. Backlog Management Templates
- Product Backlog Template
- Sprint Backlog Template
- Backlog Refinement Template
- Priority Matrix Template

### 4. Sprint Planning Templates
- Sprint Planning Agenda Template
- Story Estimation Template
- Capacity Planning Template
- Sprint Goal Template

### 5. Stakeholder Communication Templates
- Stakeholder Update Template
- Sprint Review Template
- Release Communication Template
- Feedback Collection Template

### 6. Quality Assurance Templates
- Definition of Done Template
- Acceptance Criteria Template
- Story Review Checklist
- Quality Gate Template

## User Story Templates

### Standard User Story Template

```markdown
## User Story: [Story Title]

**Story ID**: [Unique Identifier]
**Epic**: [Related Epic Name]
**Theme**: [Business Theme]

### Story Description
**As a** [user type/persona]
**I want** [functionality/capability]
**So that** [business value/benefit]

### Acceptance Criteria
- [ ] **Given** [initial context/state]
  **When** [action/trigger]
  **Then** [expected outcome]

- [ ] **Given** [initial context/state]
  **When** [action/trigger]
  **Then** [expected outcome]

- [ ] **Given** [initial context/state]
  **When** [action/trigger]
  **Then** [expected outcome]

### Definition of Done
- [ ] Code complete and peer reviewed
- [ ] Unit tests written and passing (>90% coverage)
- [ ] Integration tests passing
- [ ] Acceptance criteria validated
- [ ] Documentation updated
- [ ] Accessibility requirements met
- [ ] Performance criteria met
- [ ] Security review completed
- [ ] Stakeholder approval received

### Story Details
- **Priority**: [High/Medium/Low]
- **Story Points**: [Fibonacci estimate]
- **Business Value**: [1-10 scale]
- **Risk Level**: [High/Medium/Low]
- **Complexity**: [High/Medium/Low]

### Dependencies
- **Depends On**: [List of blocking stories/tasks]
- **Blocks**: [List of dependent stories/tasks]
- **External Dependencies**: [Third-party or team dependencies]

### Assumptions
- [List key assumptions made during story creation]
- [Include technical and business assumptions]

### Questions and Clarifications
- [Outstanding questions that need answers]
- [Areas requiring stakeholder clarification]

### Notes
- [Additional context, constraints, or considerations]
- [Links to related documentation or resources]

### Validation Criteria
- [ ] Story follows INVEST principles
- [ ] Acceptance criteria are testable
- [ ] Business value is clearly articulated
- [ ] Dependencies are identified
- [ ] Assumptions are documented
```

### Technical Story Template

```markdown
## Technical Story: [Story Title]

**Story ID**: [Unique Identifier]
**Category**: [Infrastructure/Architecture/Technical Debt/etc.]

### Technical Description
**As a** [developer/system/team]
**I want** [technical capability/improvement]
**So that** [technical benefit/business enablement]

### Technical Acceptance Criteria
- [ ] **Given** [current technical state]
  **When** [technical action/implementation]
  **Then** [expected technical outcome]

### Technical Definition of Done
- [ ] Implementation complete and reviewed
- [ ] Technical documentation updated
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Performance benchmarks met
- [ ] Security scan completed
- [ ] Code quality standards met
- [ ] Deployment scripts updated

### Technical Details
- **Technical Complexity**: [High/Medium/Low]
- **Effort Estimate**: [Story points]
- **Technical Risk**: [High/Medium/Low]
- **Impact Scope**: [System-wide/Module/Component]

### Technical Dependencies
- **Technical Prerequisites**: [Required technical work]
- **System Dependencies**: [Affected systems/components]
- **Tool Dependencies**: [Required tools/libraries]

### Implementation Notes
- [Technical approach and considerations]
- [Architecture decisions and rationale]
- [Performance and scalability considerations]
```

### Bug Fix Story Template

```markdown
## Bug Fix: [Bug Title]

**Bug ID**: [Unique Identifier]
**Severity**: [Critical/High/Medium/Low]
**Priority**: [P1/P2/P3/P4]

### Bug Description
**As a** [affected user type]
**I want** [issue to be resolved]
**So that** [normal functionality is restored]

### Current Behavior
[Detailed description of the current incorrect behavior]

### Expected Behavior
[Detailed description of the correct behavior]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Observe incorrect behavior]

### Acceptance Criteria
- [ ] **Given** [bug reproduction scenario]
  **When** [fix is applied]
  **Then** [correct behavior is observed]

- [ ] **Given** [regression test scenario]
  **When** [system is tested]
  **Then** [no new issues are introduced]

### Bug Fix Definition of Done
- [ ] Root cause identified and documented
- [ ] Fix implemented and reviewed
- [ ] Unit tests added to prevent regression
- [ ] Integration tests updated
- [ ] Bug reproduction steps verified as fixed
- [ ] Regression testing completed
- [ ] Documentation updated if needed
- [ ] Stakeholder verification completed

### Bug Details
- **Affected Components**: [List of affected system components]
- **Environment**: [Where bug occurs - prod/staging/dev]
- **Browser/Platform**: [If applicable]
- **User Impact**: [Description of user impact]
- **Business Impact**: [Description of business impact]

### Root Cause Analysis
- **Immediate Cause**: [Direct cause of the bug]
- **Contributing Factors**: [Factors that led to the bug]
- **Prevention Measures**: [How to prevent similar bugs]
```

## Epic and Feature Templates

### Epic Definition Template

```markdown
## Epic: [Epic Name]

**Epic ID**: [Unique Identifier]
**Theme**: [Business Theme]
**Initiative**: [Related Initiative]

### Epic Description
[Comprehensive description of the epic and its business purpose]

### Business Objective
**Problem Statement**: [What problem does this epic solve?]
**Business Value**: [What value does this epic deliver?]
**Success Criteria**: [How will we measure success?]

### User Stories
| Story ID | Story Title | Priority | Story Points | Status |
|----------|-------------|----------|--------------|--------|
| [ID] | [Title] | [Priority] | [Points] | [Status] |
| [ID] | [Title] | [Priority] | [Points] | [Status] |

### Epic Acceptance Criteria
- [ ] [High-level acceptance criterion 1]
- [ ] [High-level acceptance criterion 2]
- [ ] [High-level acceptance criterion 3]

### Dependencies
- **Epic Dependencies**: [Other epics this depends on]
- **External Dependencies**: [Third-party or team dependencies]
- **Technical Dependencies**: [Technical prerequisites]

### Assumptions and Constraints
- **Assumptions**: [Key assumptions for this epic]
- **Constraints**: [Technical, business, or resource constraints]
- **Risks**: [Identified risks and mitigation strategies]

### Timeline and Milestones
- **Target Start Date**: [Date]
- **Target Completion Date**: [Date]
- **Key Milestones**: [Important delivery milestones]

### Success Metrics
- **KPIs**: [Key performance indicators]
- **Acceptance Metrics**: [Quantifiable success measures]
- **User Satisfaction**: [How to measure user satisfaction]
```

### Feature Specification Template

```markdown
## Feature: [Feature Name]

**Feature ID**: [Unique Identifier]
**Epic**: [Parent Epic]
**Owner**: [Product Owner/Stakeholder]

### Feature Overview
[Detailed description of the feature and its purpose]

### User Value Proposition
**Target Users**: [Primary user personas]
**User Problem**: [Problem this feature solves]
**Solution**: [How this feature solves the problem]
**Value Delivered**: [Specific value to users and business]

### Functional Requirements
1. [Functional requirement 1]
2. [Functional requirement 2]
3. [Functional requirement 3]

### Non-Functional Requirements
- **Performance**: [Performance requirements]
- **Security**: [Security requirements]
- **Accessibility**: [Accessibility requirements]
- **Scalability**: [Scalability requirements]

### User Stories
[List of user stories that comprise this feature]

### Acceptance Criteria
- [ ] [Feature-level acceptance criterion 1]
- [ ] [Feature-level acceptance criterion 2]
- [ ] [Feature-level acceptance criterion 3]

### Design Considerations
- **UI/UX Requirements**: [Design requirements]
- **Technical Constraints**: [Technical limitations]
- **Integration Points**: [System integration requirements]

### Testing Strategy
- **Test Scenarios**: [Key test scenarios]
- **Acceptance Testing**: [Acceptance test approach]
- **Performance Testing**: [Performance test requirements]
```

## Backlog Management Templates

### Product Backlog Template

```markdown
## Product Backlog

**Product**: [Product Name]
**Product Owner**: [Name]
**Last Updated**: [Date]

### Backlog Overview
- **Total Items**: [Number]
- **Ready for Development**: [Number]
- **In Progress**: [Number]
- **Completed**: [Number]

### Prioritization Framework
**Method**: [MoSCoW/RICE/Kano/Custom]
**Criteria**: [Prioritization criteria used]

### Backlog Items

#### High Priority (Must Have)
| ID | Title | Type | Story Points | Business Value | Status | Sprint |
|----|-------|------|--------------|----------------|--------|--------|
| [ID] | [Title] | [Epic/Story] | [Points] | [Value] | [Status] | [Sprint] |

#### Medium Priority (Should Have)
| ID | Title | Type | Story Points | Business Value | Status | Sprint |
|----|-------|------|--------------|----------------|--------|--------|
| [ID] | [Title] | [Epic/Story] | [Points] | [Value] | [Status] | [Sprint] |

#### Low Priority (Could Have)
| ID | Title | Type | Story Points | Business Value | Status | Sprint |
|----|-------|------|--------------|----------------|--------|--------|
| [ID] | [Title] | [Epic/Story] | [Points] | [Value] | [Status] | [Sprint] |

#### Future Consideration (Won't Have This Release)
| ID | Title | Type | Story Points | Business Value | Rationale |
|----|-------|------|--------------|----------------|-----------|
| [ID] | [Title] | [Epic/Story] | [Points] | [Value] | [Reason] |

### Backlog Health Metrics
- **Velocity**: [Average story points per sprint]
- **Lead Time**: [Average time from backlog to done]
- **Cycle Time**: [Average time from start to done]
- **Throughput**: [Stories completed per sprint]

### Backlog Refinement Notes
- **Last Refinement**: [Date]
- **Next Refinement**: [Date]
- **Refinement Focus**: [Areas of focus for next session]
```

### Sprint Backlog Template

```markdown
## Sprint Backlog

**Sprint**: [Sprint Number/Name]
**Sprint Goal**: [Sprint goal statement]
**Sprint Duration**: [Start Date] to [End Date]
**Team**: [Team Name]

### Sprint Commitment
- **Committed Story Points**: [Total points]
- **Team Capacity**: [Available capacity]
- **Velocity Target**: [Target velocity]

### Sprint Backlog Items

#### Committed Stories
| Story ID | Title | Assignee | Story Points | Status | Notes |
|----------|-------|----------|--------------|--------|-------|
| [ID] | [Title] | [Name] | [Points] | [Status] | [Notes] |

#### Sprint Tasks
| Task ID | Description | Story | Assignee | Estimate | Status |
|---------|-------------|-------|----------|----------|--------|
| [ID] | [Description] | [Story ID] | [Name] | [Hours] | [Status] |

### Sprint Risks and Dependencies
- **Risks**: [Identified risks for this sprint]
- **Dependencies**: [External dependencies]
- **Blockers**: [Current or potential blockers]

### Daily Progress Tracking
| Date | Completed | In Progress | Blocked | Notes |
|------|-----------|-------------|---------|-------|
| [Date] | [Items] | [Items] | [Items] | [Notes] |

### Sprint Metrics
- **Burndown**: [Story points remaining by day]
- **Velocity**: [Actual velocity achieved]
- **Completion Rate**: [Percentage of committed work completed]
```

## Sprint Planning Templates

### Sprint Planning Agenda Template

```markdown
## Sprint Planning Agenda

**Sprint**: [Sprint Number/Name]
**Date**: [Date]
**Duration**: [Duration]
**Attendees**: [Team members and stakeholders]

### Pre-Planning Preparation
- [ ] Product backlog refined and prioritized
- [ ] Stories estimated and ready
- [ ] Team capacity calculated
- [ ] Previous sprint retrospective actions reviewed
- [ ] Dependencies identified and resolved

### Sprint Planning Part 1: What (1-2 hours)
**Objective**: Determine what will be delivered in the sprint

#### Agenda Items
1. **Sprint Goal Discussion** (15 minutes)
   - Review product increment objective
   - Align on sprint goal
   - Confirm goal with stakeholders

2. **Backlog Review** (30 minutes)
   - Review prioritized backlog items
   - Clarify requirements and acceptance criteria
   - Identify dependencies and risks

3. **Capacity Planning** (15 minutes)
   - Review team availability
   - Account for holidays, training, meetings
   - Calculate available capacity

4. **Story Selection** (30 minutes)
   - Select stories for sprint commitment
   - Validate story readiness
   - Confirm sprint goal alignment

### Sprint Planning Part 2: How (2-3 hours)
**Objective**: Determine how the work will be accomplished

#### Agenda Items
1. **Story Breakdown** (90 minutes)
   - Break stories into tasks
   - Identify technical approach
   - Estimate task effort

2. **Dependency Management** (30 minutes)
   - Identify task dependencies
   - Plan coordination points
   - Assign ownership

3. **Risk Assessment** (15 minutes)
   - Identify potential blockers
   - Plan mitigation strategies
   - Assign risk owners

4. **Final Commitment** (15 minutes)
   - Review sprint backlog
   - Confirm team commitment
   - Document sprint goal and backlog

### Sprint Planning Outcomes
- [ ] Sprint goal defined and agreed
- [ ] Sprint backlog created and committed
- [ ] Tasks identified and estimated
- [ ] Dependencies mapped and planned
- [ ] Risks identified and mitigated
- [ ] Team commitment confirmed
```

### Story Estimation Template

```markdown
## Story Estimation Session

**Session Date**: [Date]
**Facilitator**: [Name]
**Participants**: [Team members]
**Estimation Method**: [Planning Poker/T-Shirt Sizes/Fibonacci]

### Estimation Guidelines
- **Story Points Scale**: [1, 2, 3, 5, 8, 13, 21]
- **Reference Stories**: [Baseline stories for comparison]
- **Estimation Factors**: [Complexity, effort, risk, uncertainty]

### Stories to Estimate

#### Story: [Story Title]
**Story ID**: [ID]
**Description**: [Brief description]

**Estimation Discussion**:
- **Complexity**: [Technical complexity assessment]
- **Effort**: [Development effort required]
- **Risk**: [Technical and business risks]
- **Dependencies**: [Dependencies that affect estimation]

**Team Estimates**:
| Team Member | Initial Estimate | Final Estimate | Rationale |
|-------------|------------------|----------------|-----------|
| [Name] | [Points] | [Points] | [Reasoning] |

**Final Estimate**: [Consensus estimate]
**Confidence Level**: [High/Medium/Low]

### Estimation Summary
| Story ID | Title | Estimate | Confidence | Notes |
|----------|-------|----------|------------|-------|
| [ID] | [Title] | [Points] | [Level] | [Notes] |

### Estimation Retrospective
- **What went well**: [Positive aspects of estimation]
- **Challenges**: [Estimation challenges encountered]
- **Improvements**: [Process improvements for next session]
```

## Stakeholder Communication Templates

### Stakeholder Update Template

```markdown
## Stakeholder Update

**Date**: [Date]
**Product**: [Product Name]
**Reporting Period**: [Time period]
**Product Owner**: [Name]

### Executive Summary
[High-level summary of progress, achievements, and key decisions]

### Sprint/Release Progress
- **Current Sprint**: [Sprint number/name]
- **Sprint Goal**: [Sprint goal]
- **Progress**: [% complete]
- **Key Achievements**: [Major accomplishments]

### Metrics and KPIs
| Metric | Current Value | Target | Trend | Notes |
|--------|---------------|--------|-------|-------|
| Velocity | [Points] | [Target] | [â†‘â†“â†’] | [Notes] |
| Burndown | [Points] | [Target] | [â†‘â†“â†’] | [Notes] |
| Quality | [%] | [Target] | [â†‘â†“â†’] | [Notes] |

### Completed Work
#### Stories Completed
- [Story 1]: [Brief description and business value]
- [Story 2]: [Brief description and business value]
- [Story 3]: [Brief description and business value]

#### Features Delivered
- [Feature 1]: [Description and user impact]
- [Feature 2]: [Description and user impact]

### Upcoming Work
#### Next Sprint Focus
- [Priority 1]: [Description and rationale]
- [Priority 2]: [Description and rationale]
- [Priority 3]: [Description and rationale]

#### Upcoming Milestones
- [Milestone 1]: [Date and description]
- [Milestone 2]: [Date and description]

### Issues and Risks
#### Current Blockers
- [Blocker 1]: [Description, impact, and resolution plan]
- [Blocker 2]: [Description, impact, and resolution plan]

#### Identified Risks
- [Risk 1]: [Description, probability, impact, mitigation]
- [Risk 2]: [Description, probability, impact, mitigation]

### Decisions Needed
- [Decision 1]: [Description, options, recommendation, deadline]
- [Decision 2]: [Description, options, recommendation, deadline]

### Feedback and Questions
[Space for stakeholder feedback and questions]

### Next Update
**Date**: [Next update date]
**Focus**: [Key areas for next update]
```

### Sprint Review Template

```markdown
## Sprint Review

**Sprint**: [Sprint Number/Name]
**Date**: [Date]
**Duration**: [Duration]
**Attendees**: [Stakeholders and team members]

### Sprint Overview
- **Sprint Goal**: [Sprint goal]
- **Sprint Duration**: [Start date] to [End date]
- **Team**: [Team name and members]

### Sprint Results
- **Committed Story Points**: [Points]
- **Completed Story Points**: [Points]
- **Completion Rate**: [Percentage]
- **Velocity**: [Actual velocity]

### Demonstration Agenda

#### Story 1: [Story Title]
- **Business Value**: [Value delivered]
- **Demo Script**: [What will be demonstrated]
- **Acceptance Criteria Met**: [Criteria satisfied]
- **Stakeholder Feedback**: [Space for feedback]

#### Story 2: [Story Title]
- **Business Value**: [Value delivered]
- **Demo Script**: [What will be demonstrated]
- **Acceptance Criteria Met**: [Criteria satisfied]
- **Stakeholder Feedback**: [Space for feedback]

### Product Increment Review
- **Features Completed**: [List of completed features]
- **User Value Delivered**: [Summary of user value]
- **Business Impact**: [Business impact assessment]

### Backlog Updates
- **New Items Added**: [New backlog items]
- **Items Reprioritized**: [Priority changes]
- **Items Removed**: [Removed items and rationale]

### Stakeholder Feedback
#### Feedback on Delivered Work
- [Feedback item 1]
- [Feedback item 2]
- [Feedback item 3]

#### Suggestions for Future Work
- [Suggestion 1]
- [Suggestion 2]
- [Suggestion 3]

### Next Sprint Preview
- **Upcoming Sprint Goal**: [Next sprint goal]
- **Priority Items**: [Top priority items for next sprint]
- **Expected Outcomes**: [What stakeholders can expect]

### Action Items
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| [Action] | [Owner] | [Date] | [Status] |

### Meeting Feedback
- **What went well**: [Positive aspects of the review]
- **Improvements**: [Suggestions for better reviews]
```

## Quality Assurance Templates

### Definition of Done Template

```markdown
## Definition of Done

**Product**: [Product Name]
**Team**: [Team Name]
**Version**: [Version Number]
**Last Updated**: [Date]

### Story-Level Definition of Done

#### Development Criteria
- [ ] **Code Complete**: All code written and committed
- [ ] **Code Review**: Peer review completed and approved
- [ ] **Coding Standards**: Code follows team coding standards
- [ ] **Unit Tests**: Unit tests written with >90% coverage
- [ ] **Integration Tests**: Integration tests written and passing
- [ ] **Static Analysis**: Code passes static analysis tools
- [ ] **Security Scan**: Security vulnerability scan completed

#### Quality Criteria
- [ ] **Acceptance Criteria**: All acceptance criteria validated
- [ ] **Manual Testing**: Manual testing completed successfully
- [ ] **Regression Testing**: No regression issues identified
- [ ] **Performance Testing**: Performance criteria met
- [ ] **Accessibility Testing**: Accessibility requirements validated
- [ ] **Cross-Browser Testing**: Tested on supported browsers/devices

#### Documentation Criteria
- [ ] **Code Documentation**: Code properly documented
- [ ] **User Documentation**: User-facing documentation updated
- [ ] **Technical Documentation**: Technical documentation updated
- [ ] **API Documentation**: API documentation updated (if applicable)

#### Deployment Criteria
- [ ] **Build Success**: Automated build successful
- [ ] **Deployment Scripts**: Deployment scripts updated
- [ ] **Environment Testing**: Tested in staging environment
- [ ] **Database Changes**: Database migration scripts tested
- [ ] **Configuration**: Configuration changes documented

#### Stakeholder Criteria
- [ ] **Product Owner Approval**: Product Owner accepts the story
- [ ] **Stakeholder Review**: Key stakeholders have reviewed
- [ ] **User Acceptance**: User acceptance testing completed
- [ ] **Business Validation**: Business requirements validated

### Epic-Level Definition of Done

#### Feature Criteria
- [ ] **All Stories Complete**: All epic stories meet DoD
- [ ] **Feature Testing**: End-to-end feature testing completed
- [ ] **User Journey Testing**: Complete user journeys validated
- [ ] **Integration Testing**: Feature integration testing completed

#### Release Criteria
- [ ] **Release Notes**: Release notes prepared
- [ ] **Training Materials**: User training materials updated
- [ ] **Support Documentation**: Support documentation updated
- [ ] **Rollback Plan**: Rollback procedures documented

### Release-Level Definition of Done

#### Production Criteria
- [ ] **Production Deployment**: Successfully deployed to production
- [ ] **Monitoring**: Production monitoring configured
- [ ] **Performance Validation**: Production performance validated
- [ ] **User Communication**: Users notified of new features

#### Business Criteria
- [ ] **Success Metrics**: Success metrics baseline established
- [ ] **Feedback Collection**: User feedback collection enabled
- [ ] **Business Validation**: Business objectives validated

### Quality Gates

#### Gate 1: Development Complete
- All development and quality criteria met
- Ready for stakeholder review

#### Gate 2: Stakeholder Approval
- All stakeholder criteria met
- Ready for release preparation

#### Gate 3: Release Ready
- All release criteria met
- Ready for production deployment

### Exceptions and Waivers
- **Exception Process**: [Process for handling DoD exceptions]
- **Approval Authority**: [Who can approve exceptions]
- **Documentation**: [How exceptions are documented]
```

### Acceptance Criteria Template

```markdown
## Acceptance Criteria Template

### Standard Format: Given-When-Then

```
**Given** [initial context or state]
**When** [action or event occurs]
**Then** [expected outcome or result]
```

### Example Acceptance Criteria

#### Functional Criteria
- [ ] **Given** I am a logged-in user
  **When** I click the "Save" button
  **Then** my changes are saved and I see a confirmation message

- [ ] **Given** I have items in my shopping cart
  **When** I proceed to checkout
  **Then** I am taken to the payment page with correct item totals

#### Error Handling Criteria
- [ ] **Given** I enter an invalid email address
  **When** I submit the form
  **Then** I see an error message "Please enter a valid email address"

- [ ] **Given** the system is unavailable
  **When** I try to save my data
  **Then** I see a message "System temporarily unavailable, please try again"

#### Performance Criteria
- [ ] **Given** I am on the search page
  **When** I enter a search term and click search
  **Then** results are displayed within 2 seconds

#### Security Criteria
- [ ] **Given** I am not logged in
  **When** I try to access a protected page
  **Then** I am redirected to the login page

#### Accessibility Criteria
- [ ] **Given** I am using a screen reader
  **When** I navigate the form
  **Then** all form fields have appropriate labels and descriptions

### Acceptance Criteria Checklist
- [ ] **Testable**: Each criterion can be objectively tested
- [ ] **Clear**: Criteria are unambiguous and specific
- [ ] **Complete**: All important scenarios are covered
- [ ] **Achievable**: Criteria are technically feasible
- [ ] **Business-Focused**: Criteria reflect business value
- [ ] **Independent**: Each criterion stands alone
- [ ] **Measurable**: Success can be objectively measured
```

## Template Selection Guide

### Template Selection Matrix

| Use Case | Primary Template | Supporting Templates | Complexity Level |
|----------|------------------|---------------------|------------------|
| New Feature Development | Standard User Story | Epic Definition, Feature Specification | Medium |
| Technical Improvement | Technical Story | Quality Assurance Templates | High |
| Bug Resolution | Bug Fix Story | Quality Assurance Templates | Low |
| Research/Investigation | Spike Story | None | Medium |
| Release Planning | Epic Definition | Sprint Planning Templates | High |
| Sprint Execution | Sprint Backlog | Daily Tracking Templates | Medium |
| Stakeholder Communication | Stakeholder Update | Sprint Review Template | Low |

### Template Customization Guidelines

#### When to Customize Templates
- Team-specific processes require additional fields
- Industry regulations require specific documentation
- Organizational standards mandate certain formats
- Tool integration requires specific structures

#### Customization Best Practices
1. **Maintain Core Structure**: Keep essential elements intact
2. **Add, Don't Remove**: Add fields rather than removing standard ones
3. **Document Changes**: Record customizations and rationale
4. **Team Alignment**: Ensure team agrees on customizations
5. **Regular Review**: Periodically review and update customizations

#### Common Customizations
- **Additional Fields**: Risk level, business priority, technical complexity
- **Workflow States**: Custom status values for team processes
- **Approval Processes**: Additional approval steps or stakeholders
- **Integration Fields**: Fields required for tool integration
- **Compliance Fields**: Fields required for regulatory compliance

### Template Maintenance

#### Regular Review Schedule
- **Monthly**: Review template usage and effectiveness
- **Quarterly**: Update templates based on team feedback
- **Annually**: Comprehensive template review and optimization

#### Version Control
- **Template Versioning**: Maintain version history of template changes
- **Change Documentation**: Document reasons for template changes
- **Migration Planning**: Plan migration from old to new template versions

#### Quality Assurance
- **Template Testing**: Test templates with real scenarios
- **User Feedback**: Collect feedback from template users
- **Continuous Improvement**: Continuously improve based on usage patterns

---

This comprehensive template guide provides Product Owners with all the tools needed for effective product ownership within the BMAD Method. Use these templates as starting points and customize them to fit your specific team and organizational needs.
