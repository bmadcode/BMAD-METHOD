# Consolidate Review Feedback

## Task Overview
**Agent:** architect  
**Action Type:** feedback-consolidation  
**Duration:** 10-15 minutes  
**LLM-Optimized:** Token-efficient structured consolidation  

## Purpose
Consolidate feedback from all Round 1 reviews into prioritized action plan with REQUIRED-FOR-COMPLETION/QUALITY-STANDARD/IMPROVEMENT classification for efficient implementation.

## Context
Central coordination after 5 parallel Round 1 reviews:
- Architecture, Business, Process, QA, UX feedback streams
- Priority classification and conflict resolution
- Coherent implementation roadmap generation
- Overlap elimination and action sequencing

## Inputs

### Required
- `story_file` (string): Path to the story file being reviewed
- `architecture_feedback` (object): Results from architect review
- `business_feedback` (object): Results from business/PO review
- `process_feedback` (object): Results from process/SM review  
- `qa_feedback` (object): Results from QA review
- `ux_feedback` (object): Results from UX expert review

## Outputs

- `consolidated_feedback` (object): Unified feedback with priority classification
- `implementation_plan` (string): Step-by-step fix implementation sequence
- `story_file` (string): Updated story file with consolidation summary

## Instructions

### Step 1: Pre-Consolidation Analysis

**Feedback Source Review:**
- Architecture: Technical design and implementation issues
- Business: Requirements and value delivery gaps
- Process: DoD compliance and workflow adherence
- QA: Quality standards and testing coverage
- UX: User experience and accessibility concerns

**Scope Assessment:**
```
FEEDBACK_ANALYSIS:
- Total items: [count]
- Overlapping issues: [count]
- Conflicts identified: [count]
- Implementation effort: [HIGH/MEDIUM/LOW]
```

### Step 2: Priority Classification

**REQUIRED-FOR-COMPLETION** (Blocks story completion):
- Acceptance criteria gaps
- Critical functionality breaks
- Business rule violations
- User journey blockers
- Core feature missing/incorrect

**QUALITY-STANDARD** (Project standard violations):
- Test coverage below requirements
- Code quality standard violations
- Performance threshold failures
- Required accessibility non-compliance
- Security scan failures
- Architecture pattern violations

**IMPROVEMENT** (Future enhancement opportunities):
- Code optimization suggestions
- UX polish improvements
- Technical debt reduction
- Extended functionality ideas
- Documentation enhancements
- Process improvements

**Classification Format (Max 50 tokens/item):**
```
[PRIORITY]: [Issue] - [Domain] - [Effort: S/M/L] - [Impact: H/M/L]
```

### Step 3: Conflict Resolution (2-3 minutes)
**Conflict Resolution Protocol:**
- Technical vs Business conflicts → Acceptance criteria priority
- Similar issues → Consolidate into single action
- Priority disputes → Story completion impact assessment
- Reviewer disagreements → Architecture principles guide

### Step 4: Implementation Sequencing (3-4 minutes)
**Sequencing Rules:**
1. REQUIRED-FOR-COMPLETION (dependency order)
2. QUALITY-STANDARD (grouped by domain)
3. Dependencies: Backend → Frontend → Integration
4. Validation checkpoints after major changes

**Implementation Groups:**
```
PHASE_1: [Critical fixes] - Est: [time]
PHASE_2: [Quality standards] - Est: [time]
VALIDATION: [Testing approach] - Est: [time]
```

### Step 5: Documentation Update (2 minutes)
Update story file with:

```markdown
## Review Consolidation Summary
**Architect:** [Name] | **Date:** [YYYY-MM-DD] | **Duration:** [X minutes]

### Round 1 Review Results
- Architecture: [PASS/ISSUES] ([X] items)
- Business: [PASS/ISSUES] ([X] items)
- Process: [PASS/ISSUES] ([X] items)
- QA: [PASS/ISSUES] ([X] items)
- UX: [PASS/ISSUES] ([X] items)

### Consolidated Actions
#### REQUIRED-FOR-COMPLETION ([X] items)
- [Issue] - [Domain] - [Effort] - [Impact] | Max 50 tokens

#### QUALITY-STANDARD ([X] items)
- [Issue] - [Domain] - [Standard] - [Effort] | Max 50 tokens

#### IMPROVEMENT ([X] items)
- [Issue] - [Domain] - [Effort] - [Value] | Max 50 tokens

### Implementation Sequence
**Phase 1:** [Critical fixes] - Est: [time] - Items: [count]
**Phase 2:** [Quality fixes] - Est: [time] - Items: [count]
**Validation:** [Testing approach] - Est: [time]

**Total Effort:** [time estimate] | **Priority Items:** [count]
```

7. **Create implementation roadmap**
   - Provide clear, actionable steps for developer
   - Include specific technical requirements
   - Note any coordination needs with other agents
   - Specify validation criteria for each fix

## Success Criteria
- [ ] All 5 review streams analyzed and categorized
- [ ] Conflicts resolved with clear rationale
- [ ] Priority classification complete (3 categories)
- [ ] Implementation sequence with time estimates
- [ ] Story file updated with structured summary
- [ ] Action items under 50 tokens each
- [ ] Ready for efficient developer implementation

## Failure Conditions

- Conflicting feedback not resolved
- Missing critical review input
- Unclear or unactionable implementation steps
- Priority classification incomplete
- Implementation sequence illogical

## Error Handling

If feedback is incomplete or unclear:
1. Identify specific gaps in review feedback
2. Request clarification from relevant reviewer
3. Document assumptions made in consolidation
4. Proceed with best available information
5. Flag uncertainties for developer attention

If conflicts cannot be resolved:
1. Escalate to Product Owner for business priority decisions
2. Make technical recommendations based on architecture principles
3. Document the conflict and resolution approach
4. Ensure MVP-BLOCKING classification takes precedence

## LLM Optimization Notes
- Token limits enforce brevity and focus
- Structured classification enables rapid scanning
- Time estimates prevent scope creep
- Evidence-based priority prevents subjective interpretation
- Phase sequencing optimizes implementation efficiency
- Clear success criteria enable objective validation

## Integration Points

- **Input from:** Round 1 reviews (architect, po, sm, qa, ux-expert)
- **Output to:** implement-consolidated-fixes task (dev agent)
- **Dependencies:** All Round 1 review checklists must be complete
- **Validation:** Next phase will validate using story docs + Playwright MCP