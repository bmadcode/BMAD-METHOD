# Update Epic Progress

## Task Overview
**Agent:** sm (Scrum Master - Progress Tracking Owner)  
**Action Type:** epic-progress-update  
**Duration:** 3-5 minutes  
**LLM-Optimized:** Structured epic tracking with learning integration  

## Purpose
Track story completion within epic context, update epic progress indicators, and schedule learning extraction for continuous improvement.

## Inputs
- Completed story file with PR information
- Epic file (docs/prd/epic{epic_number}.md)
- Learning items and action assignments
- PR creation confirmation

## Outputs
- Updated epic file with story completion status
- Learning extraction scheduled in epic context
- Epic progress metrics updated
- Next story readiness assessment

## Execution Steps

### Step 1: Calculate Epic Completion Status (1 minute)
Calculate current epic completion status:

```markdown
## Epic Completion Detection

### Story Completion Analysis
- **Total Stories in Epic:** {total_story_count}
- **Completed Stories:** {completed_story_count}
- **Completion Percentage:** {completion_percentage}%
- **Epic Status:** {IN_PROGRESS/COMPLETE}

### Completion Criteria Check
- [ ] All stories marked as "Done - Delivered"
- [ ] All PRs merged successfully
- [ ] No remaining story dependencies
- [ ] Epic business value delivered

**Epic Completion Status:** {completion_percentage}%
**Epic Retrospective Status:** {APPLICABLE/NOT_APPLICABLE}
```

### Step 2: Update Epic Progress Tracking (2 minutes)
Update epic file with story completion:

```markdown
## Epic {epic_number} Progress Tracking

### Story Completion Status
- ✅ **Story {story_number}:** {story_title} | Status: DONE | PR: #{pr_number} | Completed: {YYYY-MM-DD}
- ✅ **Story {previous}:** {previous_title} | Status: DONE | PR: #{prev_pr} | Completed: {prev_date}
- 🚧 **Story {next}:** {next_title} | Status: READY | Target: {target_date}
- 📋 **Story {future}:** {future_title} | Status: DRAFT | Dependencies: {deps}

### Epic Metrics
- **Stories Completed:** {completed_count}/{total_stories} ({completion_percentage}%)
- **Epic Velocity:** {stories_per_sprint} stories/sprint
- **Quality Score:** {avg_quality_score}/10 (average across completed stories)
- **Learning Items:** {total_learning_items} captured across {completed_count} stories

### Epic Timeline
- **Epic Start:** {epic_start_date}
- **Current Sprint:** Sprint {current_sprint}
- **Stories This Sprint:** {current_sprint_stories}
- **Projected Completion:** {projected_completion_date}
- **Days Remaining:** {days_remaining}
```

### Step 3: Epic Retrospective Preparation (1 minute - if applicable)
Prepare epic retrospective data if epic is complete:
```markdown
## Epic Retrospective Preparation (Only if Epic Complete)

### All Story Data Collection
- **Story Files:** {story_file_list}
- **Learning Items:** {total_learning_items} across {story_count} stories
- **Quality Metrics:** Average {avg_quality_score}/10
- **Timeline Data:** {start_date} to {completion_date} ({total_days} days)

### Epic Metrics Summary
- **Total Effort:** {total_story_points} story points
- **Average Velocity:** {avg_velocity} points/sprint
- **Review Rounds:** Average {avg_review_rounds} per story
- **Fix Cycles:** Average {avg_fix_cycles} per story

**Epic Retrospective Ready:** {YES/NO}
**All Story Data Consolidated:** {YES/NO}
**Retrospective Status:** {READY/NOT_READY}
```

### Step 4: Schedule Learning Extraction (1 minute)
Add learning extraction scheduling to epic:

```markdown
## Learning Extraction Schedule

### Story {story_number} Learning Items
**Extraction Date:** {YYYY-MM-DD} | **Review Status:** COMPLETE | **Action Items:** {action_count}

#### Immediate Actions (Current Sprint)
- {action_1} - @{owner} - Due: {date} - Status: {PENDING/IN_PROGRESS/DONE}
- {action_2} - @{owner} - Due: {date} - Status: {PENDING/IN_PROGRESS/DONE}

#### Next Sprint Integration
- {next_action_1} - @{owner} - Sprint Planning Item
- {next_action_2} - @{owner} - Sprint Planning Item

#### Future Epic Candidates (Generated)
- **{epic_candidate_1}** - Priority: {HIGH/MEDIUM/LOW} - Target: Epic {target_epic}
- **{epic_candidate_2}** - Priority: {HIGH/MEDIUM/LOW} - Target: Epic {target_epic}

### Cumulative Learning Insights
**Pattern Analysis:** {patterns_identified} patterns identified across {completed_count} stories
- **Most Common:** {common_pattern} - Occurred in {pattern_count} stories
- **Critical Issues:** {critical_pattern} - Requires epic-level attention
- **Process Improvements:** {process_improvements} - Affecting team velocity
```

### Step 5: Update Epic Health Indicators (1 minute)
```markdown
## Epic Health Dashboard

### Current Status: {GREEN/YELLOW/RED}
- **Scope:** {ON_TRACK/AT_RISK/BLOCKED} - {scope_status_detail}
- **Timeline:** {ON_TRACK/AT_RISK/DELAYED} - {timeline_status_detail}  
- **Quality:** {HIGH/MEDIUM/LOW} - Avg: {quality_score}/10
- **Team Velocity:** {STABLE/INCREASING/DECREASING} - {velocity_trend}

### Risk Indicators
- **Scope Creep:** {risk_level} - {scope_changes} changes since start
- **Quality Debt:** {risk_level} - {debt_items} items requiring attention
- **Team Capacity:** {risk_level} - {capacity_utilization}% utilization
- **Learning Integration:** {risk_level} - {unaddressed_items} unaddressed items

### Success Metrics
- **Business Value Delivered:** {value_score}/10
- **Technical Quality:** {tech_score}/10  
- **Team Learning:** {learning_score}/10
- **Process Efficiency:** {efficiency_score}/10
```

### Step 6: Assess Next Story Readiness (1 minute - if epic not complete)
```markdown
## Next Story Readiness Assessment

### Story {next_story_number}: {next_story_title}
**Readiness Status:** {READY/NEEDS_REFINEMENT/BLOCKED}

#### Readiness Checklist
- [ ] **Epic Context:** Clear and validated
- [ ] **Business Value:** Defined and approved
- [ ] **Technical Dependencies:** {resolved_count}/{total_deps} resolved
- [ ] **Team Capacity:** {available_capacity} story points available
- [ ] **Learning Integration:** Previous story insights applied

#### Blockers and Dependencies
- {blocker_1} - Owner: @{owner} - Target Resolution: {date}
- {dependency_1} - Status: {status} - Required for: {requirement}

#### Recommendation
**Action:** {START_IMMEDIATELY/REFINE_FIRST/WAIT_FOR_DEPENDENCIES/EPIC_COMPLETE}
**Rationale:** {recommendation_rationale}
**Target Start:** {target_start_date}

#### Epic Completion Auto-Detection
**Epic Status:** {completion_percentage}% complete
**Next Action:** {CONTINUE_STORIES/MANDATORY_EPIC_RETROSPECTIVE}
**Epic Retrospective:** {AUTOMATIC_MANDATORY_IF_100%/NOT_REQUIRED}

⚠️ **AUTOMATIC TRIGGER CONDITIONS:**
- IF completion_percentage == 100% THEN next_action = MANDATORY_EPIC_RETROSPECTIVE
- Epic retrospective is automatically triggered and MANDATORY
- Workflow cannot complete without epic retrospective when epic is 100% complete
```

## Success Criteria
- [ ] Epic completion status calculated and documented
- [ ] Epic progress tracking updated with story completion
- [ ] Epic retrospective AUTOMATICALLY triggered and prepared (MANDATORY if epic 100% complete)
- [ ] Learning extraction scheduled and tracked in epic context
- [ ] Epic health indicators reflect current status
- [ ] Next story readiness assessed (if epic not complete)
- [ ] Epic metrics updated with completion data
- [ ] Future epic candidates properly tracked
- [ ] Epic retrospective MANDATORY trigger status automatically determined (100% = REQUIRED)

## Epic File Updates
Update `docs/prd/epic{epic_number}.md` with:

```markdown
## Story Implementation Progress
**Last Updated:** {YYYY-MM-DD} | **Updated By:** SM

### Current Status
- **Epic Progress:** {completion_percentage}% complete ({completed}/{total} stories)
- **Epic Status:** {IN_PROGRESS/COMPLETE}
- **Current Story:** Story {story_number} - DONE (PR #{pr_number})
- **Next Story:** Story {next_number} - {readiness_status/N_A_IF_COMPLETE}
- **Epic Health:** {GREEN/YELLOW/RED}
- **Epic Retrospective:** {MANDATORY_AUTO_TRIGGERED/NOT_REQUIRED}
- **Retrospective Status:** {REQUIRED_AND_SCHEDULED/NOT_APPLICABLE}

### Learning Integration Status
- **Total Learning Items:** {total_items} across {completed_stories} stories
- **Immediate Actions:** {immediate_count} (Current Sprint)
- **Epic Candidates Generated:** {epic_candidates_count}
- **Process Improvements:** {process_count} implemented

### Next Actions
- [ ] {next_action_1} - Due: {date}
- [ ] {next_action_2} - Due: {date}
- [ ] Start Story {next_number} - Target: {target_date}
- [ ] Conduct Epic Retrospective - {MANDATORY_AUTO_TRIGGERED/NOT_REQUIRED}
```

## Integration Points
- **Input from:** create-comprehensive-pr (PR creation complete)
- **Output to:** epic-party-mode-retrospective (MANDATORY AUTO-TRIGGER if epic 100% complete) OR Next story workflow initiation (if epic incomplete)
- **Handoff:** "Epic progress updated. Story {story_number} complete. Epic completion: {completion_percentage}%. MANDATORY epic retrospective: {AUTO_TRIGGERED/NOT_REQUIRED}. When epic = 100%, retrospective is automatically triggered and MANDATORY."

## Epic Progress Visualization
```
EPIC_PROGRESS_BAR:
Epic {epic_number}: [████████░░] {completion_percentage}% | {completed}/{total} stories
Current: Story {story_number} ✅ | Next: Story {next_number} {status_icon}
Health: {health_color} | Learning: {learning_items} items | ETA: {completion_date}
```

## Learning Integration Benefits
- **Continuous Improvement:** Each story informs the next
- **Epic-Level Insights:** Patterns emerge across multiple stories  
- **Future Planning:** Epic candidates feed roadmap planning
- **Process Optimization:** Velocity and quality trends guide improvements
- **Risk Mitigation:** Early identification of epic-level issues

## LLM Optimization Notes
- Structured progress tracking enables rapid epic health assessment
- Learning integration prevents knowledge loss at epic level
- Metrics-driven updates provide objective progress measurement
- Health indicators enable proactive epic management
- Token-efficient format maintains comprehensive tracking without overwhelming detail