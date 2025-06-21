# Epic Party Mode Retrospective

## Task Overview
**Agent:** sm (Scrum Master - Epic Retrospective Facilitator and Strategic Documenter)  
**Action Type:** multi-agent-epic-retrospective  
**Duration:** 45-60 minutes  
**Collaborators:** [architect, po, dev, ux-expert] as participants  
**LLM-Optimized:** Multi-agent collaborative epic insight generation  

## Purpose
Conduct comprehensive epic retrospective with all key stakeholders to consolidate learnings from ALL stories, generate epic-level insights and patterns, create action items for next epic, and build team consensus on strategic improvements.

## Inputs
- Epic file with 100% completion status
- All completed story files from the epic
- Consolidated learning items from all stories
- Epic metrics and timeline data
- Quality scores and velocity trends

## Outputs
- Epic retrospective summary with consolidated insights
- Epic-level patterns and strategic learnings
- Action items for next epic with ownership
- Process improvements for future epics
- Epic completion artifacts and knowledge base

## Multi-Agent Participants
- **sm** (Scrum Master) - Epic retrospective facilitator and strategic documentation owner
- **architect** (Technical Architect) - Technical patterns and architecture insights
- **po** (Product Owner) - Business patterns and value optimization
- **dev** (Developer) - Implementation patterns and technical debt
- **ux-expert** (UX Expert) - User experience patterns and design insights

## Execution Steps

### Step 1: Epic Data Consolidation (10 minutes)
**Agent:** sm (Epic Retrospective Facilitator)  
Lead epic data consolidation with strategic focus on process insights:

```markdown
# Epic {epic_number} Retrospective Data

## Epic Overview
- **Epic Title:** {epic_title}
- **Duration:** {start_date} to {completion_date} ({total_days} days)
- **Stories Completed:** {story_count}
- **Team Members:** {team_member_list}

## Epic Metrics Summary
- **Total Story Points:** {total_story_points}
- **Velocity:** {average_velocity} points/sprint
- **Quality Score:** {average_quality_score}/10
- **Review Rounds:** {average_review_rounds}
- **Fix Cycles:** {average_fix_cycles}

## Learning Items by Category
### ARCH_CHANGE ({arch_count} items)
- {arch_item_1} | Stories: {story_list} | Priority: {HIGH/MEDIUM/LOW}
- {arch_item_2} | Stories: {story_list} | Priority: {HIGH/MEDIUM/LOW}

### FUTURE_EPIC ({future_count} items)  
- {future_item_1} | Stories: {story_list} | Est: {effort_estimate}
- {future_item_2} | Stories: {story_list} | Est: {effort_estimate}

### URGENT_FIX ({urgent_count} items)
- {urgent_item_1} | Stories: {story_list} | Criticality: {HIGH/MEDIUM/LOW}
- {urgent_item_2} | Stories: {story_list} | Criticality: {HIGH/MEDIUM/LOW}

### PROCESS_IMPROVEMENT ({process_count} items)
- {process_item_1} | Stories: {story_list} | Impact: {HIGH/MEDIUM/LOW}
- {process_item_2} | Stories: {story_list} | Impact: {HIGH/MEDIUM/LOW}

### TOOLING ({tooling_count} items)
- {tooling_item_1} | Stories: {story_list} | Complexity: {HIGH/MEDIUM/LOW}
- {tooling_item_2} | Stories: {story_list} | Complexity: {HIGH/MEDIUM/LOW}

### KNOWLEDGE_GAP ({knowledge_count} items)
- {knowledge_item_1} | Stories: {story_list} | Training: {needed/available}
- {knowledge_item_2} | Stories: {story_list} | Training: {needed/available}
```

### Step 2: Multi-Agent Pattern Analysis (15 minutes)
**Agents:** architect, po, dev, ux-expert (in parallel)

#### Architect Analysis
```markdown
## Technical Patterns Identified
### Positive Patterns
- **{pattern_1}:** Appeared in {story_count} stories | Impact: {impact_description}
- **{pattern_2}:** Appeared in {story_count} stories | Impact: {impact_description}

### Negative Patterns  
- **{anti_pattern_1}:** Appeared in {story_count} stories | Risk: {risk_description}
- **{anti_pattern_2}:** Appeared in {story_count} stories | Risk: {risk_description}

### Architecture Evolution
- **Debt Accumulated:** {debt_items} items requiring attention
- **Quality Improvements:** {improvement_items} implemented
- **Technical Decisions:** {decision_count} major decisions made
```

#### Product Owner Analysis
```markdown
## Business Value Patterns
### Value Delivery Patterns
- **{value_pattern_1}:** Generated {business_impact} | Stories: {story_list}
- **{value_pattern_2}:** Generated {business_impact} | Stories: {story_list}

### User Impact Patterns
- **{user_pattern_1}:** Affected {user_count} users | Feedback: {feedback_summary}
- **{user_pattern_2}:** Affected {user_count} users | Feedback: {feedback_summary}

### Business Learning
- **Market Response:** {response_summary}
- **Feature Adoption:** {adoption_metrics}
- **Value Realization:** {actual_vs_expected}
```

#### Developer Analysis
```markdown
## Implementation Patterns  
### Efficiency Patterns
- **{efficiency_pattern_1}:** Reduced effort by {time_saved} | Stories: {story_list}
- **{efficiency_pattern_2}:** Increased effort by {time_added} | Stories: {story_list}

### Quality Patterns
- **{quality_pattern_1}:** Improved quality score by {score_improvement} | Stories: {story_list}
- **{quality_pattern_2}:** Required {fix_cycles} fix cycles | Stories: {story_list}

### Technical Debt Impact
- **Debt Created:** {new_debt_items} items
- **Debt Resolved:** {resolved_debt_items} items
- **Net Debt Change:** {net_change}
```

#### UX Expert Analysis
```markdown
## User Experience Patterns
### UX Success Patterns
- **{ux_pattern_1}:** Enhanced {ux_metric} by {improvement} | Stories: {story_list}
- **{ux_pattern_2}:** Improved {ux_metric} by {improvement} | Stories: {story_list}

### UX Challenge Patterns
- **{challenge_1}:** Required {iteration_count} iterations | Stories: {story_list}
- **{challenge_2}:** Needed {additional_effort} extra effort | Stories: {story_list}

### Design System Evolution
- **Components Added:** {component_count}
- **Patterns Established:** {pattern_count}
- **Accessibility Improvements:** {a11y_count}
```

### Step 3: Party Mode Consensus Building (15 minutes)
**Facilitator:** sm (Epic Strategic Leader)  
**Participants:** All agents (architect, po, dev, ux-expert as collaborators)

#### Epic-Level Insights Voting
```markdown
## Epic Insights Consensus (Party Mode)

### Top 3 Epic Success Factors (Team Consensus)
1. **{success_factor_1}** | Votes: {vote_count}/5 | Priority: {HIGH/MEDIUM/LOW}
   - Evidence: {supporting_evidence}
   - Stories: {story_references}

2. **{success_factor_2}** | Votes: {vote_count}/5 | Priority: {HIGH/MEDIUM/LOW}
   - Evidence: {supporting_evidence}  
   - Stories: {story_references}

3. **{success_factor_3}** | Votes: {vote_count}/5 | Priority: {HIGH/MEDIUM/LOW}
   - Evidence: {supporting_evidence}
   - Stories: {story_references}

### Top 3 Epic Improvement Areas (Team Consensus)
1. **{improvement_1}** | Votes: {vote_count}/5 | Impact: {HIGH/MEDIUM/LOW}
   - Root Cause: {cause_analysis}
   - Stories Affected: {story_references}

2. **{improvement_2}** | Votes: {vote_count}/5 | Impact: {HIGH/MEDIUM/LOW}
   - Root Cause: {cause_analysis}
   - Stories Affected: {story_references}

3. **{improvement_3}** | Votes: {vote_count}/5 | Impact: {HIGH/MEDIUM/LOW}
   - Root Cause: {cause_analysis}
   - Stories Affected: {story_references}
```

#### Future Epic Prioritization
```markdown
### Next Epic Action Items (Consensus)
#### Immediate Actions (Next Sprint)
- [ ] **{action_1}** | Owner: @{agent} | Due: {date} | Votes: {vote_count}/5
- [ ] **{action_2}** | Owner: @{agent} | Due: {date} | Votes: {vote_count}/5
- [ ] **{action_3}** | Owner: @{agent} | Due: {date} | Votes: {vote_count}/5

#### Next Epic Preparation
- [ ] **{prep_action_1}** | Owner: @{agent} | Timeline: {timeframe} | Priority: {HIGH/MEDIUM/LOW}
- [ ] **{prep_action_2}** | Owner: @{agent} | Timeline: {timeframe} | Priority: {HIGH/MEDIUM/LOW}
- [ ] **{prep_action_3}** | Owner: @{agent} | Timeline: {timeframe} | Priority: {HIGH/MEDIUM/LOW}

#### Strategic Improvements
- [ ] **{strategic_1}** | Owner: @{agent} | Timeline: {timeframe} | Impact: {HIGH/MEDIUM/LOW}
- [ ] **{strategic_2}** | Owner: @{agent} | Timeline: {timeframe} | Impact: {HIGH/MEDIUM/LOW}
```

### Step 4: Epic Knowledge Consolidation (10 minutes)
**Agent:** sm (Strategic Documentation Owner) with input validation from all agents

```markdown
## Epic {epic_number} Knowledge Base

### Epic Completion Summary
- **Business Value Delivered:** {value_score}/10
- **Technical Quality Achieved:** {quality_score}/10
- **Team Performance:** {performance_score}/10
- **Process Efficiency:** {efficiency_score}/10

### Critical Success Patterns (Apply to Future Epics)
1. **{critical_pattern_1}** | Impact: {quantified_impact} | Replication: {replication_guide}
2. **{critical_pattern_2}** | Impact: {quantified_impact} | Replication: {replication_guide}
3. **{critical_pattern_3}** | Impact: {quantified_impact} | Replication: {replication_guide}

### Critical Anti-Patterns (Avoid in Future Epics)
1. **{anti_pattern_1}** | Cost: {quantified_cost} | Prevention: {prevention_guide}
2. **{anti_pattern_2}** | Cost: {quantified_cost} | Prevention: {prevention_guide}
3. **{anti_pattern_3}** | Cost: {quantified_cost} | Prevention: {prevention_guide}

### Epic Legacy Items
- **Architecture Improvements:** {arch_count} improvements implemented
- **Process Innovations:** {process_count} new processes established  
- **Tool Enhancements:** {tool_count} tools improved/added
- **Team Capabilities:** {capability_count} new capabilities developed

### Knowledge Transfer Requirements
- **Documentation:** {doc_items} items need documentation
- **Training:** {training_items} items need team training
- **Best Practices:** {practice_items} practices need codification
- **Templates:** {template_items} templates need creation
```

### Step 5: Epic Retrospective Artifacts (5 minutes)
**Agent:** sm (Strategic Documentation Owner)

Generate final epic retrospective artifacts:

```markdown
# Epic {epic_number} Retrospective Summary

## Epic Completion Metrics
- **Duration:** {total_days} days | **Target:** {target_days} days | **Variance:** {variance}
- **Stories:** {story_count} completed | **Quality:** {avg_quality}/10 | **Velocity:** {avg_velocity}
- **Learning Items:** {total_learning} captured | **Actions:** {action_count} defined

## Strategic Insights for Next Epic
### What Worked Well (Replicate)
- {insight_1}
- {insight_2}  
- {insight_3}

### What Didn't Work (Avoid)
- {insight_1}
- {insight_2}
- {insight_3}

### What to Try (Experiment)
- {experiment_1}
- {experiment_2}
- {experiment_3}

## Action Items for Next Epic
### Immediate (Next Sprint)
- {immediate_action_1} - @{owner} - Due: {date}
- {immediate_action_2} - @{owner} - Due: {date}

### Strategic (Next Epic)
- {strategic_action_1} - @{owner} - Timeline: {timeframe}
- {strategic_action_2} - @{owner} - Timeline: {timeframe}

**Epic Retrospective Status:** COMPLETE  
**Team Consensus:** ACHIEVED  
**Next Epic Readiness:** {READY/NEEDS_PREP/BLOCKED}
```

## Success Criteria
- [ ] All story learnings consolidated at epic level
- [ ] Multi-agent pattern analysis completed by all stakeholders
- [ ] Team consensus achieved on top insights and improvements
- [ ] Action items defined with clear ownership and timelines
- [ ] Epic knowledge base created for future reference
- [ ] Next epic preparation actions identified and assigned

## Party Mode Consensus Protocol
- **Voting:** Each agent votes on insights (1-5 scale)
- **Consensus Threshold:** 60% agreement (3/5 agents)
- **Conflict Resolution:** SM facilitates strategic discussion until consensus with focus on epic-level process insights
- **Time Boxing:** 5 minutes per major decision point
- **Documentation:** All decisions recorded with rationale

## Epic Retrospective Triggers
- **Automatic:** Triggered when epic progress reaches 100%
- **Manual Override:** SM can trigger early if needed
- **Prerequisites:** All stories must be "Done - Delivered" status
- **Dependencies:** Final story PR must be created

## Integration Points
- **Input from:** update-epic-progress (100% completion detected)
- **Output to:** Next epic planning and story-implementation workflow
- **Handoff:** "SM-led epic retrospective complete. Strategic process insights documented. Epic-level patterns identified. Next epic preparation initiated with SM oversight."

## LLM Optimization Notes
- Multi-agent parallel analysis maximizes perspective diversity
- Structured voting enables objective consensus building
- Time-boxed sessions prevent analysis paralysis
- Action-oriented outputs drive immediate value
- Knowledge base format enables future epic reference
- Token-efficient format maintains comprehensive coverage without overwhelming detail