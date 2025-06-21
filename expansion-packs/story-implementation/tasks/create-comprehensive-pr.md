# Create Comprehensive PR

## Task Overview
**Agent:** po (Product Owner - Business Context Owner)  
**Action Type:** pr-creation-with-context  
**Duration:** 5-8 minutes  
**LLM-Optimized:** Business-driven PR with comprehensive context  

## Purpose
Generate pull request with business summary, technical changes, learning extraction, and validation evidence for streamlined review and delivery.

## Inputs
- Story implementation file with complete context
- Commit information and PR context from commit-and-prepare-pr
- Learning review results and team consensus
- All validation evidence and quality metrics
- Epic completion status and retrospective context

## Outputs
- GitHub PR created with comprehensive description
- PR linked to story and epic context
- Review assignments based on learning items
- Story file updated with PR information

## Execution Steps

### Step 1: Generate PR Title (1 minute)
```
PR_TITLE_FORMAT:
[Epic{epic_number}.{story_number}] {business_focused_title}

Examples:
- [Epic1.Story3] Add batch priority selector for dispatch optimization
- [Epic2.Story1] Implement mobile scanning workflow for operations
- [Epic3.Story2] Enhance order validation with QR code integration
```

### Step 2: Create PR Description (4-6 minutes)
Generate comprehensive PR description:

```markdown
# Epic {epic_number}.{story_number}: {story_title}

## 🎯 Business Summary
**Epic:** {epic_title}  
**Epic Progress:** {epic_completion_percentage}% complete ({completed_stories}/{total_stories} stories)  
**Business Value:** {primary_business_value}  
**User Impact:** {user_impact_description}  
**Success Metrics:** {success_criteria}  
**Epic Status:** {IN_PROGRESS/COMPLETE}

### Key Business Outcomes
- ✅ {business_outcome_1}
- ✅ {business_outcome_2} 
- ✅ {business_outcome_3}

## 🔧 Technical Changes
**Type:** {feature/enhancement/fix/refactor}  
**Complexity:** {SIMPLE/MODERATE/COMPLEX}  
**Architecture Impact:** {HIGH/MEDIUM/LOW/NONE}

### Implementation Summary
- **{component_1}:** {change_description} | Impact: {HIGH/MEDIUM/LOW}
- **{component_2}:** {change_description} | Impact: {HIGH/MEDIUM/LOW}
- **{component_3}:** {change_description} | Impact: {HIGH/MEDIUM/LOW}

### Files Changed
- `{file_1}` - {change_type} ({line_count} lines)
- `{file_2}` - {change_type} ({line_count} lines)
- `{file_3}` - {change_type} ({line_count} lines)

**Total:** {file_count} files, {total_lines} lines changed

## 📚 Learning Extraction & Actions

### 🚨 Immediate Actions (Current Sprint)
- [ ] **{urgent_action_1}** - @{owner} - Due: {date}
- [ ] **{urgent_action_2}** - @{owner} - Due: {date}

### 📋 Next Sprint Integration
- [ ] **{next_action_1}** - @{owner} - Sprint Planning Item
- [ ] **{next_action_2}** - @{owner} - Sprint Planning Item

### 🚀 Future Epic Candidates
- **{epic_candidate_1}** - Priority: {HIGH/MEDIUM/LOW} - Est: {effort}
- **{epic_candidate_2}** - Priority: {HIGH/MEDIUM/LOW} - Est: {effort}

### 🎉 Epic Completion Status
**Epic Progress:** {epic_completion_percentage}% complete
**Epic Retrospective:** {TRIGGERED/PENDING}
{epic_completion_section}

### 🔧 Architecture Improvements
- **{arch_improvement_1}** - Timeline: {current/next/backlog}
- **{arch_improvement_2}** - Timeline: {current/next/backlog}

## ✅ Validation Evidence

### Quality Gates
- **Tests:** {test_count} added, {test_coverage}% coverage
- **Linting:** ✅ PASS
- **Type Safety:** ✅ PASS  
- **Build:** ✅ PASS
- **E2E Tests:** ✅ PASS ({test_count} scenarios)

### Review Process
- **Pre-Review Validation:** ✅ COMPLETE
- **Round 1 Reviews:** ✅ COMPLETE ({review_count} reviewers)
- **Feedback Consolidation:** ✅ COMPLETE ({feedback_items} items)
- **Fix Implementation:** ✅ COMPLETE
- **Final Validation:** ✅ COMPLETE

### Story DoD Compliance
- **Business Requirements:** ✅ MET
- **Technical Requirements:** ✅ MET
- **Quality Standards:** ✅ MET
- **Documentation:** ✅ COMPLETE
- **Learning Extraction:** ✅ COMPLETE

## 🔍 Test Coverage & Scenarios

### New Tests Added
- `{test_file_1}` - {test_count} tests - {coverage_area}
- `{test_file_2}` - {test_count} tests - {coverage_area}

### E2E Scenarios Covered
- ✅ {scenario_1} - PASS
- ✅ {scenario_2} - PASS  
- ✅ {scenario_3} - PASS

### Edge Cases Tested
- ✅ {edge_case_1} - PASS
- ✅ {edge_case_2} - PASS

## 📖 Documentation Updates
- **Story File:** Updated with complete implementation context
- **Epic Progress:** Updated with story completion
- **Architecture Docs:** {updated/not_applicable}
- **API Documentation:** {updated/not_applicable}  
- **User Documentation:** {updated/not_applicable}
- **Epic Retrospective:** {SCHEDULED/NOT_APPLICABLE}

## 🔗 Related Links
- **Epic:** [Epic {epic_number}](../prd/epic{epic_number}.md)
- **Story:** [Story {epic_number}.{story_number}](../stories/epic{epic_number}.story{story_number}.story.md)
- **Commit:** {commit_hash}

---
**Story Status:** Done → Ready for Delivery  
**Epic Status:** {epic_completion_percentage}% complete  
**Epic Retrospective:** {TRIGGERED/PENDING}  
**Implementation Time:** {actual_time} (Est: {estimated_time})  
**Quality Score:** {quality_score}/10  
**Learning Items:** {learning_count} captured  

{epic_completion_celebration}

🤖 Generated with [Claude Code](https://claude.ai/code)
```

### Step 3: Create PR with GitHub CLI (1-2 minutes)
```bash
gh pr create --title "[Epic{epic_number}.Story{story_number}] {business_title}" --body "$(cat <<'EOF'
{comprehensive_pr_description_from_step_2}
EOF
)"
```

### Step 4: Assign Reviewers Based on Learning Items (1 minute)
```bash
# Auto-assign reviewers based on learning categories
gh pr edit --add-reviewer {architect_username}    # For ARCH_CHANGE items
gh pr edit --add-reviewer {po_username}          # For FUTURE_EPIC items  
gh pr edit --add-reviewer {dev_team_username}    # For URGENT_FIX items
gh pr edit --add-reviewer {sm_username}          # For PROCESS_IMPROVEMENT items
```

### Step 5: Update Story File with PR Information (1 minute)
```markdown
## Pull Request Created
**PO:** {po_name} | **Date:** {YYYY-MM-DD} | **PR:** #{pr_number}

### PR Details
- **Title:** [Epic{epic_number}.Story{story_number}] {business_title}
- **URL:** {pr_url}
- **Reviewers:** {reviewer_list}
- **Status:** Open → Ready for Review

### PR Content Summary
- Business summary: ✅ COMPLETE
- Epic completion status: ✅ COMPLETE
- Technical changes: ✅ COMPLETE
- Learning extraction: ✅ COMPLETE  
- Validation evidence: ✅ COMPLETE
- Review assignments: ✅ COMPLETE
- Epic retrospective context: ✅ COMPLETE (MANDATORY if epic 100% complete)

**Final Status:** Story Implementation → PR Ready for Delivery
**Epic Retrospective Status:** {MANDATORY_TRIGGERED/NOT_APPLICABLE}
```

## Success Criteria
- [ ] PR created with comprehensive business and technical context
- [ ] Epic completion status prominently displayed
- [ ] Epic retrospective context included (if triggered)
- [ ] Learning items prominently featured with action assignments
- [ ] Validation evidence clearly documented
- [ ] Appropriate reviewers assigned based on learning categories
- [ ] Story file updated with PR information
- [ ] PR ready for efficient review and merge

## PR Description Guidelines
- **Business-First:** Lead with business value and user impact
- **Epic-Context:** Prominently display epic completion status
- **Learning-Prominent:** Highlight learnings and future actions
- **Evidence-Based:** Include objective validation proof
- **Action-Oriented:** Clear next steps and ownership
- **Comprehensive:** All context needed for informed review
- **Celebration:** Highlight epic completion if applicable

## Reviewer Assignment Logic
```
REVIEWER_MAPPING:
- ARCH_CHANGE items → @architect (technical review)
- FUTURE_EPIC items → @po (business validation)
- URGENT_FIX items → @dev-team (technical validation)  
- PROCESS_IMPROVEMENT → @sm (process review)
- TOOLING items → @infra-devops (infrastructure review)
- KNOWLEDGE_GAP → @sm + @po (team development)
```

## Integration Points
- **Input from:** commit-and-prepare-pr (commit and context)
- **Output to:** update-epic-progress (epic tracking)
- **Handoff:** "PR created and ready for review. Epic progress tracking initiated."

## LLM Optimization Notes
- Business-first structure prioritizes stakeholder understanding
- Learning extraction prevents knowledge loss
- Evidence-based validation reduces review overhead
- Action-oriented format drives immediate value
- Comprehensive context enables faster review cycles
- Token-efficient format maintains readability while providing complete information