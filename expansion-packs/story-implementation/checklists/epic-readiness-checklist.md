# epic-readiness-checklist.md

**Purpose**: Validate epic business readiness and dependencies before story creation
**Agent**: po (Product Owner)
**Phase**: Pre-Story Creation Validation

## Epic Business Readiness Validation

### Epic Existence & Status Verification
- [ ] **Epic file exists**: Epic file located in `docs/prd/epic-{epic_number}-*.md` or `docs/epics/epic-{epic_number}-*.md` or user-specified location confirmed
- [ ] **Epic status approved**: Epic status is "Approved" (not Draft/In Progress/Review)
- [ ] **Epic completion readiness**: Epic has clear business objectives and scope defined
- [ ] **Epic format compliance**: Epic follows project template and documentation standards

### Epic Dependencies Assessment
- [ ] **Prerequisite epics completed**: All prerequisite epics are marked "Done" or dependencies resolved
- [ ] **No blocking dependencies**: No unresolved technical or business blockers identified for epic scope
- [ ] **Resource availability**: Required team members and resources available for epic execution
- [ ] **External dependencies clear**: Third-party services, APIs, or integrations ready if needed

### Epic Context Sufficiency Analysis
- [ ] **Business goals clarity**: Epic provides sufficient context for meaningful story creation
- [ ] **User journeys defined**: Business goals and user workflows are clearly articulated
- [ ] **Success criteria specified**: Epic completion criteria and definition of done are explicit
- [ ] **Acceptance boundaries**: Epic scope boundaries and out-of-scope items are clearly defined

### Story Creation Readiness
- [ ] **Story numbering valid**: Requested story number does not conflict with existing stories
- [ ] **Epic sequence logic**: Story fits logical sequence within epic roadmap and dependencies
- [ ] **Story prerequisites met**: All prerequisite stories for requested story are completed
- [ ] **Business context sufficient**: Epic provides enough detail for comprehensive story definition

### Business Value Validation
- [ ] **Value proposition clear**: Epic business value and ROI rationale are explicitly documented
- [ ] **Priority alignment**: Epic aligns with current business priorities and strategic objectives
- [ ] **Stakeholder alignment**: Key stakeholders have reviewed and approved epic scope
- [ ] **Risk assessment complete**: Known risks and mitigation strategies are documented

## Validation Outcomes

### If ALL checks pass:
- **Status**: Epic ready for story creation
- **Action**: Proceed with create_story workflow step
- **Documentation**: Update story file with epic validation timestamp and PO approval

### If ANY check fails:
- **Status**: Epic not ready for story creation
- **Action**: HALT workflow and address identified issues
- **Escalation**: Work with SM and stakeholders to resolve epic readiness blockers
- **Documentation**: Document specific issues and required remediation steps

## Notes

- This checklist must be completed before any story creation begins
- Focus on business readiness rather than technical implementation details
- Epic validation ensures stories are created from well-defined, approved business context
- Failed validation prevents wasted effort on premature or poorly defined stories

## Integration Points

- **Input from**: Epic files, previous story status, business stakeholder feedback
- **Output to**: create_story workflow step (if validation passes)
- **Dependencies**: Epic documentation standards, story numbering conventions
- **Escalation**: SM for process issues, architect for technical dependencies