# Product Owner (Sarah) Quick Start Guide

Get up and running with Sarah, the Product Owner persona, in just 5 minutes. This guide provides everything you need to start creating sprint-ready user stories and managing your product backlog effectively.

## 1. Choose Your Environment

Sarah can be used in two environments:

### Web Environment (Sarah)
- Use with ChatGPT, Claude, or other web-based AI platforms
- Ideal for story creation and backlog management
- No setup required

### IDE Environment (Sarah)
- Use with Cursor AI, Claude Code, Cline, or Roocode
- Ideal for development-integrated story preparation
- Requires minimal setup

## 2. Activate the Persona

### Web Environment
1. Copy the contents of `bmad-agent/personas/po.md`
2. Paste as your first message to the AI
3. Use an activation phrase: "I need Sarah to help prepare user stories for development"

### IDE Environment
1. Copy the `bmad-agent` folder to your project root
2. Reference the persona file in your IDE's AI feature
3. Use an activation phrase: "Sarah, help me break down these requirements into stories"

## 3. Provide Clear Context

For best story preparation, include:

- **Project Overview**: What you're building and for whom
- **Requirements**: Features, functionality, and business rules
- **Constraints**: Technical limitations, timeline, team capabilities
- **Quality Standards**: Definition of done, acceptance criteria format
- **Sprint Context**: Sprint length, team velocity, story sizing method

### Example Prompt

```
Sarah, I need to prepare user stories for a mobile expense tracking app. Here's the context:

Project Overview:
- Personal finance app for tracking business expenses
- Target users: freelancers and small business owners
- Mobile-first design with web dashboard

Key Features to Break Down:
- Expense entry with photo capture
- Category management and tagging
- Receipt scanning with OCR
- Monthly/quarterly reporting
- Export to accounting software
- Multi-currency support

Constraints:
- 2-week sprints with 5-person development team
- React Native for mobile, React for web
- Team velocity: 40 story points per sprint
- Must integrate with existing user authentication system

Quality Standards:
- Stories should be completable within one sprint
- Use Given-When-Then format for acceptance criteria
- Include testing requirements in definition of done
- Require stakeholder review before development
```

## 4. Review and Refine

1. Review Sarah's initial story breakdown
2. Ask for clarification on acceptance criteria
3. Request story splitting if stories are too large
4. Validate dependencies and sequencing

## 5. Prepare for Sprint Planning

1. Prioritize stories based on business value
2. Ensure stories are estimation-ready
3. Identify any blockers or dependencies
4. Prepare context for development team

## Example: Breaking Down an E-commerce Feature

### Step 1: Activate Sarah

"I need Sarah to help break down e-commerce checkout functionality into sprint-ready user stories."

### Step 2: Provide Context

"We're building a checkout flow for an online marketplace. Users need to review their cart, enter shipping information, select payment method, and complete purchase. The system must handle inventory validation, payment processing, and order confirmation."

### Step 3: Review Story Breakdown

Sarah will provide detailed user stories like:

#### Story 1: Cart Review and Modification
```markdown
## User Story: Cart Review and Modification

**As a** customer
**I want** to review and modify my shopping cart before checkout
**So that** I can ensure I'm purchasing the correct items and quantities

### Acceptance Criteria
- [ ] Given I'm on the checkout page, when I view my cart, then I see all items with names, prices, and quantities
- [ ] Given I'm reviewing my cart, when I change item quantities, then the subtotal updates immediately
- [ ] Given I'm reviewing my cart, when I remove an item, then it's removed from cart and totals update
- [ ] Given my cart is empty, when I try to proceed to checkout, then I see an appropriate message

### Definition of Done
- [ ] Code complete and reviewed
- [ ] Unit tests written and passing
- [ ] Integration tests for cart operations
- [ ] Responsive design tested on mobile and desktop
- [ ] Accessibility requirements met
- [ ] Stakeholder approval received

**Story Points**: 5
**Priority**: High
**Dependencies**: None
```

### Step 4: Refine Stories

"Sarah, the cart modification story seems large. Can you split it into smaller stories? Also, what dependencies exist between the checkout stories?"

### Step 5: Sprint Planning Preparation

Sarah provides:
- Prioritized story list
- Dependency map
- Estimation guidance
- Risk assessment

## Common Story Patterns

### Feature Story Pattern
```markdown
**As a** [user type]
**I want** [functionality]
**So that** [business value]

### Acceptance Criteria
- [ ] Given [context], when [action], then [expected result]
- [ ] [Additional criteria...]

### Definition of Done
- [ ] [Standard DoD items...]
```

### Technical Story Pattern
```markdown
**As a** developer
**I want** [technical capability]
**So that** [technical benefit]

### Acceptance Criteria
- [ ] [Technical acceptance criteria...]

### Definition of Done
- [ ] [Technical DoD items...]
```

### Bug Fix Story Pattern
```markdown
**As a** [affected user]
**I want** [issue resolved]
**So that** [normal functionality restored]

### Acceptance Criteria
- [ ] Given [bug scenario], when [action], then [correct behavior]
- [ ] [Regression prevention criteria...]
```

## Quick Reference Commands

### Story Creation
```
"Sarah, break down [feature/epic] into user stories"
"Create acceptance criteria for [story description]"
"Split this story into smaller, sprint-sized stories"
```

### Story Refinement
```
"Sarah, review these stories for completeness"
"Add missing acceptance criteria to [story]"
"Validate these stories against INVEST principles"
```

### Backlog Management
```
"Sarah, prioritize these stories based on business value"
"Identify dependencies between these stories"
"Prepare these stories for sprint planning"
```

### Quality Assurance
```
"Sarah, run the PO master checklist on these stories"
"Validate story quality and completeness"
"Check for missing information or ambiguities"
```

## Best Practices Checklist

### Story Quality
- [ ] Stories follow INVEST principles
- [ ] Acceptance criteria are testable and specific
- [ ] Business value is clearly articulated
- [ ] Stories are appropriately sized for sprint completion

### Process Adherence
- [ ] Stories use consistent templates
- [ ] Definition of done is complete and relevant
- [ ] Dependencies are identified and documented
- [ ] Stakeholder review is planned

### Team Readiness
- [ ] Stories have sufficient detail for estimation
- [ ] Technical context is provided where needed
- [ ] Questions and assumptions are documented
- [ ] Stories are prioritized and sequenced

## Next Steps

- Explore the [Comprehensive Guide](./po-comprehensive-guide.md) for detailed product ownership guidance
- Check the [Integration Guide](./po-integration-guide.md) for workflow integration
- Review the [PO Master Checklist](../bmad-agent/checklists/po-master-checklist.md) for quality validation
- Use the [Story Template](../bmad-agent/templates/story-tmpl.md) for consistent documentation

---

Start creating sprint-ready user stories today with Sarah's systematic approach to product ownership!

# Sprint 1 Status Tracking

## Sprint Overview
- **Sprint Duration**: 2 weeks
- **Sprint Goal**: Complete Phase 1 of the BMAD Documentation Enhancement project
- **Total Story Points**: 26

## Story Status

### âœ… Story 1.1: Create UX/UI Architect Documentation Package (8 points) - COMPLETE
**Status**: âœ… DONE  
**Completed**: Current Date

### âœ… Story 1.2a: Product Manager Documentation Package (4 points) - COMPLETE
**Status**: âœ… DONE  
**Completed**: Current Date  
**Deliverables**:
- âœ… PM Comprehensive Guide (docs/pm-comprehensive-guide.md)
- âœ… PM Integration Guide (docs/pm-integration-guide.md)
- âœ… PM Quick Start Guide (docs/pm-quickstart.md)

### âœ… Story 1.2b: System Architect Documentation Package (4 points) - COMPLETE
**Status**: âœ… DONE  
**Completed**: Current Date  
**Deliverables**:
- âœ… System Architect Comprehensive Guide (docs/architect-comprehensive-guide.md)
- âœ… System Architect Integration Guide (docs/architect-integration-guide.md)
- âœ… System Architect Quick Start Guide (docs/architect-quickstart.md)

### âœ… Story 1.2c: Product Owner Documentation Package (4 points) - COMPLETE
**Status**: âœ… DONE  
**Completed**: Current Date  
**Deliverables**:
- âœ… Product Owner Comprehensive Guide (docs/po-comprehensive-guide.md)
- âœ… Product Owner Integration Guide (docs/po-integration-guide.md)
- âœ… Product Owner Quick Start Guide (docs/po-quickstart.md)

**Acceptance Criteria Met**:
- âœ… Create Product Owner Comprehensive Guide
- âœ… Create Product Owner Integration Guide  
- âœ… Create Product Owner Quick Start Guide
- âœ… Validate documentation follows template standards

### â³ Story 1.3: Create IDE-Specific Setup Guides (5 points) - TODO
**Status**: â³ TODO  
**Acceptance Criteria**:
- [ ] Complete setup guides for all supported IDEs
- [ ] Include troubleshooting sections
- [ ] Add configuration examples
- [ ] Test guides with fresh installations

### â³ Story 1.4: Develop Quick-Start Documentation (3 points) - TODO
**Status**: â³ TODO  
**Acceptance Criteria**:
- [ ] Create 5-minute quick-start guide
- [ ] Include common use case examples
- [ ] Add video walkthrough scripts
- [ ] Validate with new users

### â³ Story 1.5: Implement Documentation Standards (2 points) - TODO
**Status**: â³ TODO  
**Acceptance Criteria**:
- [ ] Create documentation style guide
- [ ] Implement automated formatting checks
- [ ] Set up documentation review process
- [ ] Create contribution guidelines

## Sprint Progress
- **Completed**: 20/26 story points (77%)
- **In Progress**: 0 story points
- **Remaining**: 6 story points
- **Days Remaining**: 8 days

## Next Actions
1. âœ… Complete Product Manager documentation package
2. âœ… Complete System Architect documentation package
3. âœ… Complete Product Owner documentation package
4. â³ Begin Story 1.3: Create IDE-Specific Setup Guides (5 points)

---
*Updated by David - Developer*
