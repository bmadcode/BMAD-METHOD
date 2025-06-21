# Capture Learning Triage

## Task Overview
**Agent:** architect  
**Action Type:** learning-triage  
**Duration:** 10-15 minutes  
**LLM-Optimized:** Token-efficient structured capture  

## Purpose
Systematically capture and triage learnings from story implementation to drive continuous improvement and feed future epics.

## Inputs
- Story implementation file (docs/stories/epic{epic_number}.story{story_number}.story.md)
- All review feedback from Round 1 reviews
- Implementation fixes and changes
- Quality gate results and metrics

## Outputs
- Learning items captured in story file under ## Learning Triage section
- Categorized learning items with priorities and owners
- Action items for immediate and future implementation

## Learning Categories

### ARCH_CHANGE (Architecture Changes Required)
- **Purpose:** Technical debt or architecture improvements identified
- **Token Limit:** 50 tokens per item
- **Format:** `ARCH: [Component] - [Issue] - [Impact] - [Owner: architect]`
- **Priority:** HIGH/MEDIUM/LOW
- **Timeline:** Current epic / Next epic / Technical debt backlog

### FUTURE_EPIC (Epic Candidate Features)
- **Purpose:** Features or capabilities that emerged during implementation  
- **Token Limit:** 50 tokens per item
- **Format:** `EPIC: [Feature] - [Business Value] - [Complexity] - [Owner: po]`
- **Priority:** HIGH/MEDIUM/LOW
- **Timeline:** Next sprint / Next quarter / Future roadmap

### URGENT_FIX (Critical Issues Requiring Immediate Attention)
- **Purpose:** Blockers or critical issues that need immediate resolution
- **Token Limit:** 50 tokens per item  
- **Format:** `URGENT: [Issue] - [Impact] - [Fix Required] - [Owner: dev/architect]`
- **Priority:** CRITICAL (resolve within current sprint)
- **Timeline:** Immediate (within 1-2 days)

### PROCESS_IMPROVEMENT (Development Process Enhancements)
- **Purpose:** Workflow, tooling, or process improvements identified
- **Token Limit:** 50 tokens per item
- **Format:** `PROCESS: [Area] - [Current State] - [Improvement] - [Owner: sm]`
- **Priority:** HIGH/MEDIUM/LOW
- **Timeline:** Current sprint / Next sprint / Continuous improvement

### TOOLING (Development Tooling and Infrastructure)
- **Purpose:** Tools, automation, or infrastructure improvements needed
- **Token Limit:** 50 tokens per item
- **Format:** `TOOLING: [Tool/System] - [Gap] - [Solution] - [Owner: infra-devops-platform]`
- **Priority:** HIGH/MEDIUM/LOW
- **Timeline:** Current sprint / Next sprint / Infrastructure roadmap

### KNOWLEDGE_GAP (Team Knowledge and Training Needs)
- **Purpose:** Skills, knowledge, or training gaps identified during implementation
- **Token Limit:** 50 tokens per item
- **Format:** `KNOWLEDGE: [Area] - [Gap] - [Training Need] - [Owner: sm/po]`
- **Priority:** HIGH/MEDIUM/LOW
- **Timeline:** Current sprint / Next sprint / Long-term development

## Execution Steps

### Step 1: Review Implementation Context
```
CONTEXT_REVIEW:
- Story complexity: [SIMPLE/MODERATE/COMPLEX]
- Implementation time: [Actual vs Estimated]
- Quality gate failures: [Count and types]
- Review rounds required: [1/2/3+]
- Key technical challenges: [List top 3]
```

### Step 2: Extract Learning Items
For each category, scan implementation evidence:
- Review feedback patterns
- Implementation fix patterns  
- Quality gate failure patterns
- Time/effort variance patterns
- Technical decision points

### Step 3: Triage and Prioritize
```
TRIAGE_MATRIX:
High Priority: Blocks current/next sprint, affects team velocity
Medium Priority: Improves quality/efficiency, affects future work
Low Priority: Nice-to-have improvements, long-term optimization
```

### Step 4: Assign Owners and Timelines
```
OWNERSHIP_ASSIGNMENT:
- architect: Architecture, technical debt, system design
- po: Business features, epic candidates, requirements
- dev: Implementation issues, code quality, technical fixes
- sm: Process improvements, team coordination, knowledge gaps  
- infra-devops-platform: Tooling, infrastructure, automation
```

## Success Criteria
- [ ] All learning categories reviewed and populated
- [ ] Each item under 50 tokens with clear action owner
- [ ] Priority and timeline assigned to each item
- [ ] Immediate actions (URGENT_FIX) clearly identified
- [ ] Future epic candidates captured with business value
- [ ] Learning items added to story file under ## Learning Triage

## Evidence Documentation
Update story file with:
```markdown
## Learning Triage
**Architect:** [Name] | **Date:** [YYYY-MM-DD] | **Duration:** [X minutes]

### ARCH_CHANGE
- ARCH: [Component] - [Issue] - [Impact] - [Owner: architect] | Priority: [HIGH/MEDIUM/LOW] | Timeline: [Current/Next/Backlog]

### FUTURE_EPIC  
- EPIC: [Feature] - [Business Value] - [Complexity] - [Owner: po] | Priority: [HIGH/MEDIUM/LOW] | Timeline: [Next/Quarter/Future]

### URGENT_FIX
- URGENT: [Issue] - [Impact] - [Fix Required] - [Owner: dev/architect] | Priority: CRITICAL | Timeline: Immediate

### PROCESS_IMPROVEMENT
- PROCESS: [Area] - [Current State] - [Improvement] - [Owner: sm] | Priority: [HIGH/MEDIUM/LOW] | Timeline: [Current/Next/Continuous]

### TOOLING
- TOOLING: [Tool/System] - [Gap] - [Solution] - [Owner: infra-devops-platform] | Priority: [HIGH/MEDIUM/LOW] | Timeline: [Current/Next/Infrastructure]

### KNOWLEDGE_GAP
- KNOWLEDGE: [Area] - [Gap] - [Training Need] - [Owner: sm/po] | Priority: [HIGH/MEDIUM/LOW] | Timeline: [Current/Next/Long-term]

**Summary:** [X items captured] | [X urgent] | [X epic candidates] | [X process improvements]
```

## Integration Points
- **Input from:** validate_fixes (final architect review)
- **Output to:** party-mode-learning-review (collaborative review)
- **Handoff:** "Learning triage complete. Ready for collaborative review session."

## LLM Optimization Notes
- Token limits enforce brevity and focus
- Structured format enables rapid scanning
- Evidence-based categorization reduces subjective interpretation
- Clear ownership prevents action item limbo
- Timeline specificity enables proper backlog management