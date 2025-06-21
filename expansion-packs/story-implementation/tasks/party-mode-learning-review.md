# Party Mode Learning Review

## Task Overview
**Agent:** architect (Technical Architect - Facilitator and Documenter)  
**Action Type:** collaborative-learning-review  
**Duration:** Flexible based on learning complexity  
**Participants:** Configurable at execution time based on story complexity and learning items  
**Collaborators:** Selected based on learning domain expertise requirements  

## Purpose
Time-boxed collaborative review of learning triage items to validate priorities, assign ownership, and create actionable next steps with team consensus.

## Inputs
- Story file with completed ## Learning Triage section
- Learning items from capture-learning-triage task
- Implementation context and metrics

## Outputs
- Validated learning priorities with team consensus
- Clear ownership assignments and timelines
- Action items for immediate implementation
- Updated story file with ## Learning Review Results

## Multi-Agent Collaboration Protocol

### Pre-Review Setup
**Architect (Facilitator):**
```
SETUP:
- Review learning triage items across categories
- Identify high-priority items requiring discussion
- Determine appropriate participant involvement
- Prepare collaborative decision-making approach
```

### Review Process

#### Round 1: Priority Validation
**Each Participant Reviews Their Domain:**

**Architect:** ARCH_CHANGE + TOOLING items
- Validate technical priority and feasibility
- Confirm architecture impact assessment
- Suggest alternative solutions if needed

**PO:** FUTURE_EPIC + KNOWLEDGE_GAP items  
- Validate business value and roadmap fit
- Confirm epic candidate priorities
- Assess resource requirements

**Dev:** URGENT_FIX + PROCESS_IMPROVEMENT items
- Validate technical urgency and impact
- Confirm implementation effort estimates
- Suggest process optimization approaches

**SM:** PROCESS_IMPROVEMENT + KNOWLEDGE_GAP items
- Validate team impact and workflow effects
- Confirm training and development needs
- Assess team capacity for improvements

**Architect (Session Facilitator):** Technical learning categorization leadership
- Facilitate technical discussions and pattern identification
- Ensure proper categorization of technical learning items
- Guide team toward actionable technical decisions
- Document final learning categorization with technical context

#### Round 2: Collaborative Triage
**Conflict Resolution:**
- Priority disagreements → Team vote (majority wins)
- Ownership disputes → Architect assigns based on technical expertise and SM input
- Timeline conflicts → Negotiate based on capacity with architect guidance

**Consensus Building:**
```
VOTING_PROTOCOL:
- Each agent: 3 votes for HIGH priority items
- Majority vote determines final priority
- Ties resolved by story complexity impact
```

#### Round 3: Action Planning
**Immediate Actions (Current Sprint):**
- URGENT_FIX items → Dev ownership, immediate timeline
- High-priority PROCESS items → SM coordination with architect technical input
- Critical ARCH_CHANGE → Architect planning

**Next Sprint Actions:**
- FUTURE_EPIC candidates → PO backlog integration
- Medium-priority improvements → Capacity planning
- TOOLING improvements → Infra coordination

### Rapid Decision Framework

#### Quick Wins (Implement immediately)
- Low effort, high impact improvements
- Simple process changes
- Quick tooling fixes

#### Strategic Investments (Plan for next sprint)
- Architecture improvements requiring design
- Epic candidates requiring analysis
- Process changes requiring team coordination

#### Long-term Improvements (Backlog)
- Complex architectural changes
- Major tooling upgrades
- Comprehensive training programs

## Collaboration Outputs

### Validated Learning Items
Each item updated with team consensus:
```
[CATEGORY]: [Item] - [Consensus Priority: HIGH/MEDIUM/LOW] - [Validated Owner] - [Agreed Timeline] - [Team Vote: X/4]
```

### Action Items
```
IMMEDIATE_ACTIONS (Current Sprint):
- [Action] - [Owner] - [Due Date] - [Success Criteria]

NEXT_SPRINT_ACTIONS:
- [Action] - [Owner] - [Sprint Planning Item] - [Dependencies]

BACKLOG_ITEMS:
- [Action] - [Owner] - [Epic/Initiative] - [Prerequisites]
```

### Team Consensus Summary
```
CONSENSUS_METRICS:
- Total items reviewed: [X]
- High priority consensus: [X items]
- Priority disagreements resolved: [X items]
- Immediate actions identified: [X items]
- Next sprint actions: [X items]
- Backlog items: [X items]
```

## Success Criteria
- [ ] All learning triage items reviewed by relevant domain experts
- [ ] Priority conflicts resolved through team consensus
- [ ] Clear ownership assigned to each action item
- [ ] Immediate actions identified with specific timelines
- [ ] Next sprint integration planned
- [ ] Team consensus achieved on all high-priority items

## Evidence Documentation
Update story file with:
```markdown
## Learning Review Results
**Architect (Facilitator & Technical Documenter):** [Name] | **Date:** [YYYY-MM-DD] | **Duration:** [X minutes]
**Participants:** architect (facilitator), po, sm, dev | **Session Type:** Technical Learning Categorization

### Team Consensus Items
#### IMMEDIATE_ACTIONS (Current Sprint)
- [Action] - [Owner] - [Due: YYYY-MM-DD] - [Success Criteria] | Team Vote: [X/4]

#### NEXT_SPRINT_ACTIONS  
- [Action] - [Owner] - [Sprint Planning Item] - [Dependencies] | Team Vote: [X/4]

#### BACKLOG_ITEMS
- [Action] - [Owner] - [Epic/Initiative] - [Prerequisites] | Team Vote: [X/4]

### Consensus Metrics
- **Items Reviewed:** [X] | **High Priority:** [X] | **Immediate Actions:** [X]
- **Priority Conflicts Resolved:** [X] | **Team Consensus:** [X%]
- **Next Sprint Integration:** [X items] | **Backlog Items:** [X items]

### Key Decisions
- [Decision] - [Rationale] - [Team Vote: X/4]
- [Decision] - [Rationale] - [Team Vote: X/4]
```

## Integration Points
- **Input from:** capture-learning-triage (learning items)
- **Output to:** commit-and-prepare-pr (final story state)
- **Handoff:** "Technical learning review complete. Architect-led categorization consensus achieved. Technical documentation updated. Ready for commit and PR preparation."

## Session Management
- **Scope-driven duration:** Based on learning complexity rather than fixed time
- **Focus on outcomes:** Prioritize consensus over rigid timing
- **Flexible participation:** Include relevant domain experts as needed

## Facilitation Tips for Architect
- Lead technical learning categorization and pattern identification
- Keep discussions focused on actionable technical outcomes
- Use time-boxing to prevent lengthy technical debates
- Ensure all agents contribute to their domain items with technical context
- Document technical decisions and categorizations in real-time
- Escalate unresolved technical conflicts to architecture review
- Maintain final ownership of technical learning documentation

## LLM Optimization Notes
- Time-boxed collaboration prevents extended discussions
- Clear voting protocol resolves conflicts efficiently
- Structured output format enables rapid scanning
- Evidence-based consensus building reduces subjective debates
- Action-oriented focus drives immediate value delivery