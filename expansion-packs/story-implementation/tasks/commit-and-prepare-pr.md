# Commit and Prepare PR

## Task Overview
**Agent:** dev  
**Action Type:** git-commit-and-pr-preparation  
**Duration:** 5-10 minutes  
**LLM-Optimized:** Structured commit and context generation  

## Purpose
Commit all story implementation changes with comprehensive context and prepare detailed PR context for comprehensive review and delivery.

## Inputs
- Story implementation file with complete learning review results
- All implementation code changes
- Test results and quality gate confirmations
- Review feedback and learning items

## Outputs
- Git commit with story implementation changes
- Comprehensive PR context prepared
- Story file updated with commit information
- Ready state for PR creation

## Execution Steps

### Step 1: Pre-Commit Validation (2 minutes)
```
PRE_COMMIT_CHECKLIST:
- [ ] All quality gates passing
- [ ] Story file updated with learning review results  
- [ ] Implementation code complete and tested
- [ ] No uncommitted changes remaining
- [ ] Branch synchronized with latest main/develop
```

### Step 2: Generate Commit Message (2 minutes)
```
COMMIT_MESSAGE_FORMAT:
[Epic-Story] Brief implementation summary

Story: Epic {epic_number}, Story {story_number}
Type: [feature/enhancement/fix/refactor]

Implementation Summary:
- [Key change 1 - max 50 tokens]
- [Key change 2 - max 50 tokens]  
- [Key change 3 - max 50 tokens]

Quality Gates: [PASS/FAIL counts]
Review Rounds: [1/2/3+]
Learning Items: [X items captured]

Business Value: [Brief description - max 100 tokens]
Technical Impact: [Brief description - max 100 tokens]

Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Step 3: Commit Implementation (1 minute)
```bash
# Add all story-related changes
git add .

# Create commit with comprehensive message
git commit -m "$(cat <<'EOF'
[Epic{epic_number}-Story{story_number}] {brief_summary}

Story: Epic {epic_number}, Story {story_number}
Type: {change_type}

Implementation Summary:
- {key_change_1}
- {key_change_2}
- {key_change_3}

Quality Gates: {pass_count} PASS, {fail_count} FAIL
Review Rounds: {review_rounds}
Learning Items: {learning_count} items captured

Business Value: {business_value_summary}
Technical Impact: {technical_impact_summary}

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Step 4: Prepare PR Context (3-5 minutes)
Generate comprehensive PR context document:

```markdown
# PR Context: Epic {epic_number}.{story_number}

## Business Summary
**Epic:** {epic_title}
**Epic Progress:** {epic_completion_percentage}% complete ({completed_stories}/{total_stories} stories)
**Story:** {story_title}
**Type:** {change_type}
**Complexity:** {SIMPLE/MODERATE/COMPLEX}
**Epic Status:** {IN_PROGRESS/COMPLETE}
**Epic Retrospective:** {MANDATORY_AUTO_TRIGGERED/PENDING/NOT_REQUIRED}

### Epic Completion Status
**If Epic Complete (100%):**
- 🎉 **EPIC COMPLETION ACHIEVED!** Epic {epic_number} is now 100% complete
- 📊 **Epic Retrospective:** MANDATORY and automatically triggered
- 🎆 **Epic Celebration:** Multi-agent retrospective scheduled for strategic insights
- 🎣 **Next Epic Preparation:** Action items will be generated during retrospective

**If Epic In Progress (<100%):**
- 🚧 **Epic Progress:** {epic_completion_percentage}% complete, {remaining_stories} stories remaining
- 📅 **Next Story:** Story {next_story_number} ready for development
- 🔄 **Epic Timeline:** On track for completion by {projected_completion_date}

### Business Value
- {business_impact_1}
- {business_impact_2}
- {business_impact_3}

## Technical Changes
### Implementation Summary
- {technical_change_1} | Impact: {HIGH/MEDIUM/LOW}
- {technical_change_2} | Impact: {HIGH/MEDIUM/LOW}
- {technical_change_3} | Impact: {HIGH/MEDIUM/LOW}

### Quality Metrics
- **Tests:** {test_count} added, {existing_test_count} updated
- **Code Coverage:** {coverage_percentage}%
- **Quality Gates:** {pass_count} PASS, {fail_count} FAIL
- **Review Rounds:** {review_rounds}

### Architecture Impact
- {architecture_impact_1}
- {architecture_impact_2}

## Learning Extraction
### Immediate Actions (Current Sprint)
- {immediate_action_1} - {owner} - Due: {date}
- {immediate_action_2} - {owner} - Due: {date}

### Next Sprint Integration
- {next_sprint_action_1} - {owner}
- {next_sprint_action_2} - {owner}

### Future Epic Candidates
- {epic_candidate_1} - Priority: {HIGH/MEDIUM/LOW}
- {epic_candidate_2} - Priority: {HIGH/MEDIUM/LOW}

### Epic Retrospective Context (if Epic Complete)
**Epic Retrospective Data Prepared:**
- All {total_stories} story files consolidated
- {total_learning_items} learning items across epic
- Epic metrics: {avg_quality_score}/10 quality, {epic_duration} days duration
- Multi-agent retrospective scheduled with: SM (facilitator), Architect, PO, Dev, UX-Expert
- Strategic insights and next epic preparation action items to be generated

**Epic Retrospective Status:** {MANDATORY_TRIGGERED/NOT_APPLICABLE}

## Validation Evidence
### Pre-Review Validation
- {validation_item_1}: PASS
- {validation_item_2}: PASS
- {validation_item_3}: PASS

### Review Results
- **Architecture Review:** {PASS/ADDRESSED}
- **Business Review:** {PASS/ADDRESSED}
- **QA Review:** {PASS/ADDRESSED}
- **UX Review:** {PASS/ADDRESSED}

### Final Validation
- **Quality Gates:** ALL PASS
- **Story DoD:** COMPLETE
- **Learning Extraction:** COMPLETE

## Files Changed
- {file_1} - {change_type} - {line_count} lines
- {file_2} - {change_type} - {line_count} lines
- {file_3} - {change_type} - {line_count} lines

Total: {file_count} files, {total_lines} lines changed
```

### Step 5: Update Story File (1 minute)
Add commit information to story file:
```markdown
## Implementation Commit
**Developer:** {dev_name} | **Date:** {YYYY-MM-DD} | **Commit:** {commit_hash}

### Commit Summary
- **Message:** {commit_title}
- **Files Changed:** {file_count}
- **Lines Changed:** {total_lines}
- **Quality Gates:** {pass_count} PASS, {fail_count} FAIL

### PR Context Prepared
- Business summary: COMPLETE
- Technical changes: COMPLETE  
- Learning extraction: COMPLETE
- Validation evidence: COMPLETE
- Ready for PR creation: YES
```

## Success Criteria
- [ ] All implementation changes committed to git
- [ ] Commit message follows structured format with business context
- [ ] PR context document prepared with comprehensive details
- [ ] Story file updated with commit information
- [ ] All quality gates confirmed passing before commit
- [ ] Learning items integrated into PR context

## Commit Message Guidelines
- **Title:** Concise epic-story identifier with brief summary
- **Body:** Structured format with business and technical context
- **Learning:** Include learning items count and key insights
- **Quality:** Include quality gate results and review metrics
- **Attribution:** Standard Claude Code attribution

## PR Context Structure
- **Business-First:** Lead with business value and impact
- **Technical-Second:** Detailed technical changes and architecture
- **Learning-Third:** Captured learnings and future actions
- **Evidence-Last:** Validation proof and review results

## Integration Points
- **Input from:** party-mode-learning-review (team consensus)
- **Output to:** create-comprehensive-pr (PR generation)
- **Handoff:** "Implementation committed. Comprehensive PR context prepared. Ready for PR creation."

## LLM Optimization Notes
- Structured commit messages enable rapid parsing
- Token limits in PR context prevent information overload
- Business-first ordering prioritizes stakeholder needs
- Evidence-based validation provides objective review criteria
- Comprehensive context reduces PR review time and questions