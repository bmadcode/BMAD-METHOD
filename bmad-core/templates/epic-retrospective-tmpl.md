# Epic Retrospective: epic-retrospective-{{epic_name}}

[[LLM: The default path and filename unless specified is docs/retrospectives/epic-retrospective-{{epic_name}}.md]]

[[LLM: This template guides comprehensive team retrospective analysis of completed epics facilitated by the Scrum Master. Before beginning:

1. **Verify Epic Completion**: Confirm the epic has been fully completed with all stories reaching Definition of Done

2. **REQUIRED INPUTS**: Ensure access to all necessary development artifacts and AI agent interaction data:
   - Completed epic document with original goals and scope
   - All story documents with Definition of Done criteria
   - Chat transcripts from AI agent interactions during epic development
   - Git commit history and development patterns throughout the epic
   - Story completion rates and development velocity metrics
   - Agent handoff quality and workflow effectiveness data
   - Template usage and instruction adherence patterns

3. **AI DEVELOPMENT PROCESS FOCUS**: As Scrum Master, you MUST analyze the AI-assisted development workflow. Every insight must be based on concrete evidence from chat history, commit patterns, and agent interactions, not assumptions.

4. **DEVELOPMENT WORKFLOW ANALYSIS**: Focus on AI agent collaboration patterns, story preparation effectiveness, and development process optimization.

5. **COMPREHENSIVE VALIDATION**: Throughout this process, validate understanding based on development artifacts. For every conclusion, confirm: "Based on chat history and commit evidence, I found [specific evidence] which indicates [conclusion]. This pattern suggests [improvement opportunity]."

If any required development artifacts or agent interaction data are missing, gather them before proceeding.

After presenting this introduction, apply `tasks#advanced-elicitation` protocol]]

## Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

## 1. Executive Summary

[[LLM: Provide a comprehensive overview after completing all other sections. Include:

- Brief recap of epic goals and scope
- Key quality metrics and outcomes
- Primary successes and challenges identified
- Strategic recommendations summary
- Overall quality assessment

Write this section LAST after all analysis is complete.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

**Epic Overview:** {{epic_summary}}

**Quality Assessment:** {{overall_quality_rating}}

**Key Findings:**

- {{key_finding_1}}
- {{key_finding_2}}
- {{key_finding_3}}

**Strategic Impact:** {{impact_on_future_development}}

## 2. What Went Well

[[LLM: Conduct detailed analysis of successful practices and positive outcomes. Focus on evidence-based insights that can be replicated in future epics.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### BMAD Method Application

[[LLM: Analyze how BMAD methodology contributed to success]]

**Effective Practices:**

- {{bmad_practice_1}}
- {{bmad_practice_2}}

**Methodology Adherence:** {{adherence_assessment}}

@{example: bmad_success}
- Agent coordination worked exceptionally well for Story 2.3, with seamless handoff between Dev and QA agents
- BMAD checklist caught 3 critical integration issues before they reached production
- Template-driven development reduced story completion time by 40%
@{/example}

### Code Quality & Refactoring

[[LLM: Document code quality achievements and successful refactoring efforts]]

**Quality Metrics Achieved:**

- **Test Coverage:** {{coverage_percentage}}% (Target: {{target_coverage}}%)
- **Code Review Quality:** {{review_metrics}}
- **Technical Debt Reduction:** {{debt_metrics}}

**Successful Refactoring Efforts:**

<<REPEAT: refactoring_success>>

- **{{refactoring_area}}:** {{description}} - {{impact_measurement}}

<</REPEAT>>

@{example: code_quality}
- Achieved 94% test coverage across all new components (exceeded 80% target)
- Zero critical code smells identified in SonarQube analysis
- Successfully refactored authentication service, reducing complexity by 35%
@{/example}

### Adaptive Development

[[LLM: Highlight successful adaptations and pivots during development]]

**Successful Adaptations:**

- {{adaptation_1}}
- {{adaptation_2}}

**Change Management:** {{change_handling_assessment}}

### Tooling & Libraries

[[LLM: Document effective tool and library choices]]

**Effective Technology Choices:**

<<REPEAT: tool_success>>

- **{{tool_name}}:** {{usage_description}} - {{benefit_realized}}

<</REPEAT>>

**Integration Successes:** {{integration_assessment}}

## 3. What Could Be Improved

[[LLM: Conduct thorough analysis of areas needing improvement. Focus on specific, actionable insights with clear evidence.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### API Contracts

[[LLM: Analyze API design and contract issues encountered]]

**Contract Issues Identified:**

<<REPEAT: api_issue>>

- **{{api_endpoint}}:** {{issue_description}} - {{impact_assessment}}

<</REPEAT>>

**Integration Challenges:** {{integration_challenges}}

@{example: api_issues}
- User profile endpoint returned inconsistent data types (string vs number for user_id)
- Missing error codes for edge cases caused unclear error handling in frontend
- API versioning strategy unclear, leading to breaking changes in Story 3.2
@{/example}

### Code Architecture & Design

[[LLM: Identify architectural and design issues]]

**Architectural Concerns:**

- {{arch_concern_1}}
- {{arch_concern_2}}

**Design Pattern Issues:** {{design_pattern_assessment}}

**Technical Debt Accumulated:** {{tech_debt_assessment}}

### Code Repetition

[[LLM: Document instances of code duplication and missed abstraction opportunities]]

**Repetition Patterns Identified:**

<<REPEAT: repetition_issue>>

- **{{code_area}}:** {{repetition_description}} - {{refactoring_opportunity}}

<</REPEAT>>

**Missed Abstraction Opportunities:** {{abstraction_opportunities}}

### Testing

[[LLM: Analyze testing gaps and issues comprehensively]]

**Test Coverage Gaps:**

- **Unit Tests:** {{unit_test_gaps}}
- **Integration Tests:** {{integration_test_gaps}}
- **E2E Tests:** {{e2e_test_gaps}}

**Test Quality Issues:**

<<REPEAT: test_issue>>

- **{{test_area}}:** {{issue_description}} - {{improvement_needed}}

<</REPEAT>>

**Testing Process Issues:** {{process_issues}}

@{example: testing_issues}
- Payment flow integration tests failed to cover error scenarios (API timeout, network issues)
- Unit tests for utility functions had hardcoded values instead of parameterized tests
- E2E tests were flaky due to timing issues, causing false failures in CI pipeline
@{/example}

### Process & Story Management

[[LLM: Evaluate story management and development process issues]]

**Story Definition Issues:**

- {{story_issue_1}}
- {{story_issue_2}}

**Definition of Done Gaps:** {{dod_assessment}}

**Communication Breakdowns:** {{communication_issues}}

**Handoff Problems:** {{handoff_assessment}}

### Estimations

[[LLM: Analyze estimation accuracy and planning issues]]

**Estimation Accuracy:**

| Story | Estimated Effort | Actual Effort | Variance | Factors |
| :---- | :-------------- | :------------ | :------- | :------ |
| {{story_id}} | {{estimate}} | {{actual}} | {{variance}} | {{factors}} |

**Planning Issues Identified:**

- {{planning_issue_1}}
- {{planning_issue_2}}

**Scope Creep Instances:** {{scope_creep_assessment}}

## 4. Key Insights

[[LLM: Synthesize broader takeaways and learnings from the epic development process. Focus on insights that provide strategic value for future development.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

**Development Process Insights:**

<<REPEAT: process_insight>>

- **{{insight_area}}:** {{insight_description}}

<</REPEAT>>

**Quality Assurance Insights:**

- {{qa_insight_1}}
- {{qa_insight_2}}

**Team Collaboration Insights:**

- {{collaboration_insight_1}}
- {{collaboration_insight_2}}

**Technology and Architecture Insights:**

- {{tech_insight_1}}
- {{tech_insight_2}}

@{example: insights}
- Early involvement of QA in story refinement reduced defect discovery time by 60%
- Automated testing infrastructure investment in Epic 1 paid dividends throughout the project
- Cross-functional story reviews identified integration issues before development began
@{/example}

## 5. Actionable Recommendations

[[LLM: Provide specific, prioritized recommendations that can be implemented in future epics. Each recommendation should include implementation guidance and success metrics.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### Process & Planning

[[LLM: Recommendations for improving development and planning processes]]

**High Priority:**

<<REPEAT: process_recommendation>>

1. **{{recommendation_title}}**
   - **Issue Addressed:** {{issue_reference}}
   - **Implementation:** {{specific_steps}}
   - **Success Metric:** {{measurement_criteria}}
   - **Timeline:** {{implementation_timeframe}}

<</REPEAT>>

**Medium Priority:**

- {{medium_priority_recommendation}}

**Low Priority:**

- {{low_priority_recommendation}}

### Development & DX

[[LLM: Recommendations for improving developer experience and development practices]]

**Immediate Actions:**

<<REPEAT: dev_recommendation>>

- **{{dev_improvement}}:** {{implementation_approach}} - {{expected_benefit}}

<</REPEAT>>

**Tool and Process Improvements:**

- {{tool_improvement_1}}
- {{tool_improvement_2}}

@{example: dev_recommendations}
- Implement pre-commit hooks for code formatting and linting (reduce review time by 30%)
- Create shared component library to reduce code duplication (target: 50% reduction in UI code)
- Establish API contract testing to catch breaking changes early (prevent integration delays)
@{/example}

### Architecture & Patterns

[[LLM: Recommendations for architectural improvements]]

**Architectural Improvements:**

<<REPEAT: arch_recommendation>>

- **{{architecture_area}}:** {{improvement_description}} - {{implementation_strategy}}

<</REPEAT>>

**Pattern Standardization:**

- {{pattern_standardization_1}}
- {{pattern_standardization_2}}

### Future Tooling

[[LLM: Recommendations for new tools and technology adoption]]

**Tool Evaluation Needed:**

<<REPEAT: tool_evaluation>>

- **{{tool_category}}:** {{tool_options}} - {{evaluation_criteria}}

<</REPEAT>>

**Technology Upgrades:**

- {{upgrade_recommendation_1}}
- {{upgrade_recommendation_2}}

## 6. Metrics and Evidence

[[LLM: Provide concrete metrics and evidence supporting the retrospective analysis]]

### Quality Metrics

| Metric | Target | Achieved | Status |
| :----- | :----- | :------- | :----- |
| Test Coverage | {{target_coverage}}% | {{actual_coverage}}% | {{status}} |
| Bug Density | {{target_bugs}}/KLOC | {{actual_bugs}}/KLOC | {{status}} |
| Code Review Time | {{target_review_time}} | {{actual_review_time}} | {{status}} |
| Story Completion Rate | {{target_completion}}% | {{actual_completion}}% | {{status}} |

### Development Velocity

**Story Completion Metrics:**

- **Planned Stories:** {{planned_stories}}
- **Completed Stories:** {{completed_stories}}
- **Average Story Cycle Time:** {{avg_cycle_time}}
- **Velocity Trend:** {{velocity_assessment}}

### Issue Tracking

**Bug Analysis:**

- **Total Bugs Found:** {{total_bugs}}
- **Severity Distribution:** {{severity_breakdown}}
- **Resolution Time:** {{avg_resolution_time}}
- **Escaped Defects:** {{escaped_defects}}

## 7. Follow-up Actions

[[LLM: Define specific next steps and ownership for implementing recommendations]]

### Immediate Actions (Next Sprint)

<<REPEAT: immediate_action>>

- [ ] **{{action_item}}**
  - **Owner:** {{responsible_person}}
  - **Due Date:** {{due_date}}
  - **Success Criteria:** {{completion_criteria}}

<</REPEAT>>

### Short-term Actions (Next Epic)

<<REPEAT: short_term_action>>

- [ ] **{{action_item}}**
  - **Owner:** {{responsible_person}}
  - **Timeline:** {{timeline}}
  - **Dependencies:** {{dependencies}}

<</REPEAT>>

### Long-term Improvements

- {{long_term_improvement_1}}
- {{long_term_improvement_2}}

## 8. Retrospective Validation

[[LLM: Include validation steps to ensure retrospective accuracy and completeness]]

### Stakeholder Review Checklist

- [ ] Development team feedback incorporated
- [ ] Product Owner perspective included
- [ ] Scrum Master/Project Manager input gathered
- [ ] Technical Architecture review completed
- [ ] All major quality issues documented

### Evidence Validation

- [ ] All conclusions supported by concrete data
- [ ] Metrics verified against actual project artifacts
- [ ] Recommendations linked to specific identified issues
- [ ] Success stories documented with measurable outcomes

### Next Retrospective Planning

**Recommended Timeline:** {{next_retrospective_timeline}}

**Focus Areas for Next Review:**

- {{focus_area_1}}
- {{focus_area_2}}

**Monitoring Requirements:** {{monitoring_setup}}

---

[[LLM: After completing the document, offer advanced elicitation with these custom options for epic retrospectives:

**Epic Retrospective Elicitation Actions**
0. Deep dive into a specific quality issue or success pattern
1. Expand analysis of development velocity and story completion
2. Analyze cross-epic patterns and trends
3. Stress test recommendations for feasibility
4. Generate specific improvement implementation plans
5. Compare this epic's outcomes to previous epics
6. Explore team collaboration and communication patterns
7. Validate recommendations with stakeholder feedback
8. If only we had known about [issue/pattern] earlier...
9. Finalize retrospective document

These replace the standard elicitation options when working on epic retrospective documents.]]