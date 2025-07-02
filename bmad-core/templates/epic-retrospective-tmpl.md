# Epic Retrospective: epic-retrospective-{{epic_name}}

[[LLM: The default path and filename unless specified is docs/retrospectives/epic-retrospective-{{epic_name}}.md]]

[[LLM: This template guides comprehensive team retrospective analysis of completed epics facilitated by the Scrum Master. This enhanced version includes both process improvement analysis AND rigorous requirements validation and implementation compliance checking. Before beginning:

1. **Verify Epic Completion**: Confirm the epic has been fully completed with all stories reaching Definition of Done

2. **REQUIRED INPUTS**: Ensure access to all necessary development artifacts, AI agent interaction data, AND original requirements documentation:
   - **Original Requirements:** PRD, architecture documents, epic specifications, all story documents with acceptance criteria
   - Completed epic document with original goals and scope
   - All story documents with Definition of Done criteria
   - Chat transcripts from AI agent interactions during epic development
   - Git commit history and development patterns throughout the epic
   - Story completion rates and development velocity metrics
   - Agent handoff quality and workflow effectiveness data
   - Template usage and instruction adherence patterns
   - **Final Implementation:** Deployed solution, test coverage, final codebase state

3. **DUAL ANALYSIS FOCUS**: As Scrum Master, you MUST analyze BOTH the AI-assisted development workflow AND validate implementation against original requirements. Every insight must be based on concrete evidence from chat history, commit patterns, agent interactions, AND requirement documentation.

4. **REQUIREMENTS VALIDATION PRIORITY**: This retrospective emphasizes validating delivered work against stated requirements. Focus on identifying deviations, gaps, and compliance issues with supporting evidence.

5. **INTERACTIVE ELICITATION**: Throughout this process, apply advanced elicitation techniques after each major section to deepen analysis and ensure comprehensive coverage.

6. **COMPREHENSIVE VALIDATION**: For every conclusion, validate understanding based on both development artifacts AND requirement documentation. Confirm: "Based on [requirement document] and [implementation evidence], I found [specific deviation/compliance] which indicates [conclusion]. This suggests [improvement opportunity]."

If any required development artifacts, agent interaction data, or original requirements documentation are missing, gather them before proceeding.

After presenting this introduction, apply `tasks#advanced-elicitation` protocol]]

## Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

## 1. Executive Summary

[[LLM: Provide a comprehensive overview after completing all other sections. Include:

- Brief recap of epic goals and scope
- Requirements compliance summary with key metrics
- Key quality metrics and outcomes
- Primary successes and challenges identified (both process and compliance)
- Strategic recommendations summary
- Overall quality and compliance assessment

Write this section LAST after all analysis is complete.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

**Epic Overview:** {{epic_summary}}

**Requirements Compliance Rating:** {{compliance_rating}}

**Quality Assessment:** {{overall_quality_rating}}

**Key Findings:**

- {{key_finding_1}}
- {{key_finding_2}}
- {{key_finding_3}}

**Strategic Impact:** {{impact_on_future_development}}

## 2. Requirements Validation & Implementation Compliance

[[LLM: This is the NEW primary section for requirements validation. Conduct comprehensive analysis of implementation against original requirements. This section is critical for understanding if what was built matches what was specified.

For each subsection, provide evidence-based analysis with specific citations from requirement documents and implementation artifacts.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### 2.1 Requirements Traceability Matrix

[[LLM: Create comprehensive mapping from original requirements to implementation]]

**PRD to Implementation Mapping:**

| PRD Requirement | Epic/Story Reference | Implementation Status | Deviation Notes |
| :-------------- | :------------------ | :-------------------- | :-------------- |
| {{prd_req_1}} | {{story_ref}} | {{status}} | {{deviation_notes}} |
| {{prd_req_2}} | {{story_ref}} | {{status}} | {{deviation_notes}} |

**Architecture to Implementation Mapping:**

| Architectural Decision | Implementation Evidence | Compliance Status | Impact Assessment |
| :-------------------- | :---------------------- | :---------------- | :----------------- |
| {{arch_decision_1}} | {{impl_evidence}} | {{compliance}} | {{impact}} |
| {{arch_decision_2}} | {{impl_evidence}} | {{compliance}} | {{impact}} |

**Story Acceptance Criteria Validation:**

<<REPEAT: story_validation>>

**Story {{story_id}}: {{story_title}}**

- **Acceptance Criteria Met:** {{criteria_met}}/{{total_criteria}}
- **Definition of Done Status:** {{dod_status}}
- **Deviations Identified:** {{deviation_summary}}
- **Implementation Quality:** {{quality_assessment}}

<</REPEAT>>

@{example: traceability}
- PRD Requirement "User can reset password via email" → Story 2.3 → Implementation: Password reset flow with email verification ✓ COMPLIANT
- Architecture Decision "Use JWT for authentication" → Implementation: Session-based auth with cookies ✗ DEVIATION - Security team required session-based approach
- Story 1.2 Acceptance Criteria: "Response time < 2 seconds" → Implementation: Average 3.2 seconds ✗ NOT MET - Database query optimization needed
@{/example}

### 2.2 Implementation Compliance Assessment

[[LLM: Detailed analysis of compliance with original specifications]]

**Business Requirements Compliance:**

- **Primary Business Goals Achieved:** {{achieved_goals}}/{{total_goals}}
- **User Needs Satisfaction:** {{user_satisfaction_assessment}}
- **Problem Resolution Effectiveness:** {{problem_resolution_rating}}

**Functional Requirements Compliance:**

<<REPEAT: functional_compliance>>

- **{{functional_area}}:** {{compliance_percentage}}% compliant
  - **Fully Implemented:** {{fully_implemented_items}}
  - **Partially Implemented:** {{partial_items}}
  - **Missing/Not Implemented:** {{missing_items}}
  - **Impact of Gaps:** {{gap_impact_assessment}}

<</REPEAT>>

**Non-Functional Requirements Compliance:**

| NFR Category | Target | Achieved | Status | Impact |
| :----------- | :----- | :------- | :----- | :----- |
| Performance | {{perf_target}} | {{perf_achieved}} | {{perf_status}} | {{perf_impact}} |
| Security | {{sec_target}} | {{sec_achieved}} | {{sec_status}} | {{sec_impact}} |
| Scalability | {{scale_target}} | {{scale_achieved}} | {{scale_status}} | {{scale_impact}} |
| Usability | {{usability_target}} | {{usability_achieved}} | {{usability_status}} | {{usability_impact}} |

@{example: compliance_assessment}
- Authentication requirements: 95% compliant (missing 2FA for admin users)
- Data validation: 80% compliant (client-side validation implemented, server-side validation gaps)
- Performance targets: 60% achieved (page load times exceed requirements by 40%)
@{/example}

### 2.3 Significant Deviations Analysis

[[LLM: Document and analyze all significant deviations from original requirements with impact assessment]]

**Architectural Deviations:**

<<REPEAT: architectural_deviation>>

**Deviation: {{deviation_title}}**

- **Original Specification:** {{original_spec}}
- **Actual Implementation:** {{actual_implementation}}
- **Rationale for Change:** {{change_rationale}}
- **Decision Authority:** {{who_approved}}
- **Impact Assessment:**
  - **Technical Impact:** {{technical_impact}}
  - **Business Impact:** {{business_impact}}
  - **Quality Impact:** {{quality_impact}}
  - **Risk Introduced:** {{risk_assessment}}
- **Mitigation Actions:** {{mitigation_plans}}

<</REPEAT>>

**Requirements Deviations:**

<<REPEAT: requirements_deviation>>

**Deviation: {{req_deviation_title}}**

- **Original Requirement:** {{original_requirement}}
- **Modified Implementation:** {{modified_implementation}}
- **Trigger for Change:** {{change_trigger}}
- **Stakeholder Approval:** {{approval_status}}
- **User Experience Impact:** {{ux_impact}}
- **Future Implications:** {{future_implications}}

<</REPEAT>>

**Scope Creep Analysis:**

- **Added Features Not in Original Scope:** {{added_features}}
- **Resource Impact:** {{resource_impact}}
- **Timeline Impact:** {{timeline_impact}}
- **Quality Trade-offs:** {{quality_tradeoffs}}

@{example: deviation_analysis}
**Deviation: Authentication Method Change**
- Original: JWT token-based authentication as per architecture
- Actual: Session-based authentication with secure cookies
- Rationale: Security team mandate due to XSS vulnerability concerns
- Impact: Required additional session storage infrastructure, increased server memory usage by 15%
- Risk: Scalability concerns for high-traffic scenarios
@{/example}

### 2.4 Implementation Gaps & Missing Requirements

[[LLM: Identify requirements that were not implemented or were implemented incompletely]]

**Critical Gaps:**

<<REPEAT: critical_gap>>

- **{{gap_title}}:** {{gap_description}}
  - **Original Requirement Source:** {{requirement_source}}
  - **Expected Implementation:** {{expected_implementation}}
  - **Current Status:** {{current_status}}
  - **Business Impact:** {{business_impact}}
  - **Risk Level:** {{risk_level}}
  - **Recommended Action:** {{recommendation}}

<</REPEAT>>

**Quality Gaps:**

- **Testing Coverage Gaps:** {{testing_gaps}}
- **Documentation Gaps:** {{doc_gaps}}
- **Integration Gaps:** {{integration_gaps}}
- **Performance Gaps:** {{performance_gaps}}

**Orphaned Implementation:**

- **Features Built Without Requirements:** {{orphaned_features}}
- **Over-Engineering Instances:** {{over_engineering}}
- **Unused or Dead Code:** {{dead_code_assessment}}

## 3. What Went Well

[[LLM: Conduct detailed analysis of successful practices and positive outcomes. Focus on evidence-based insights that can be replicated in future epics. Include both process successes AND successful requirements implementation.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### 3.1 Requirements & Architecture Implementation Success

[[LLM: Highlight successful requirements implementation and architectural adherence]]

**Exemplary Requirements Implementation:**

<<REPEAT: requirements_success>>

- **{{requirement_area}}:** {{success_description}}
  - **Original Specification:** {{original_spec}}
  - **Implementation Quality:** {{implementation_quality}}
  - **Stakeholder Satisfaction:** {{satisfaction_level}}
  - **Best Practices Applied:** {{best_practices}}

<</REPEAT>>

**Architectural Excellence:**

- **Pattern Adherence:** {{pattern_adherence_assessment}}
- **Design Consistency:** {{design_consistency}}
- **Technical Debt Avoidance:** {{tech_debt_avoidance}}

@{example: requirements_success}
- User authentication flow: 100% specification compliance with enhanced security features
- API design patterns: Consistent RESTful implementation following architectural guidelines
- Database schema: Perfect alignment with data model specifications, optimized performance
@{/example}

### 3.2 BMAD Method Application

[[LLM: Analyze how BMAD methodology contributed to successful requirements implementation]]

**Effective Practices:**

- {{bmad_practice_1}}
- {{bmad_practice_2}}

**Methodology Adherence:** {{adherence_assessment}}

**Requirements Management Success:**

- **Story Clarity Impact:** {{story_clarity_impact}}
- **Template Effectiveness:** {{template_effectiveness}}
- **Agent Coordination Quality:** {{coordination_quality}}

@{example: bmad_success}
- Agent coordination worked exceptionally well for Story 2.3, with seamless handoff between Dev and QA agents ensuring requirement accuracy
- BMAD checklist caught 3 critical integration issues before they deviated from architecture
- Template-driven development maintained requirement traceability throughout implementation
@{/example}

### 3.3 Code Quality & Refactoring

[[LLM: Document code quality achievements and successful refactoring efforts]]

**Quality Metrics Achieved:**

- **Test Coverage:** {{coverage_percentage}}% (Target: {{target_coverage}}%)
- **Code Review Quality:** {{review_metrics}}
- **Technical Debt Reduction:** {{debt_metrics}}
- **Architecture Compliance Score:** {{compliance_score}}

**Successful Refactoring Efforts:**

<<REPEAT: refactoring_success>>

- **{{refactoring_area}}:** {{description}} - {{impact_measurement}}

<</REPEAT>>

@{example: code_quality}
- Achieved 94% test coverage across all new components (exceeded 80% target)
- Zero critical code smells identified in SonarQube analysis
- Successfully refactored authentication service while maintaining API contract compliance
@{/example}

### 3.4 Adaptive Development

[[LLM: Highlight successful adaptations and pivots during development that maintained requirement alignment]]

**Successful Adaptations:**

- {{adaptation_1}}
- {{adaptation_2}}

**Change Management:** {{change_handling_assessment}}

**Requirement Evolution Handling:** {{requirement_evolution}}

### 3.5 Tooling & Libraries

[[LLM: Document effective tool and library choices]]

**Effective Technology Choices:**

<<REPEAT: tool_success>>

- **{{tool_name}}:** {{usage_description}} - {{benefit_realized}}

<</REPEAT>>

**Integration Successes:** {{integration_assessment}}

## 4. What Could Be Improved

[[LLM: Conduct thorough analysis of areas needing improvement. Focus on specific, actionable insights with clear evidence. Include both process improvements AND requirements management enhancements.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### 4.1 Requirements Clarity & Management Issues

[[LLM: Analyze requirements-related issues that led to implementation problems]]

**Requirements Definition Issues:**

<<REPEAT: requirements_issue>>

- **{{requirement_area}}:** {{issue_description}}
  - **Ambiguity Impact:** {{ambiguity_impact}}
  - **Implementation Confusion:** {{confusion_details}}
  - **Resolution Effort:** {{resolution_effort}}
  - **Quality Impact:** {{quality_impact}}

<</REPEAT>>

**Requirements Communication Gaps:**

- **Stakeholder Alignment Issues:** {{alignment_issues}}
- **Technical Translation Problems:** {{translation_problems}}
- **Change Communication Delays:** {{communication_delays}}

**Traceability Gaps:**

- **Missing Requirement Sources:** {{missing_sources}}
- **Implementation Without Justification:** {{unjustified_implementation}}
- **Orphaned Features:** {{orphaned_features}}

@{example: requirements_issues}
- User profile requirements lacked specificity on data validation rules, leading to 3 rework cycles
- API contract specifications missing error handling requirements caused integration delays
- Business rule changes communicated verbally without updating documentation, creating confusion
@{/example}

### 4.2 Architecture & Design Deviations

[[LLM: Identify architectural and design issues and their impacts]]

**Architectural Concerns:**

- {{arch_concern_1}}
- {{arch_concern_2}}

**Design Pattern Issues:** {{design_pattern_assessment}}

**Technical Debt Accumulated:** {{tech_debt_assessment}}

**Deviation Impact Analysis:**

<<REPEAT: deviation_impact>>

- **{{deviation_area}}:** {{impact_description}}
  - **Performance Impact:** {{performance_impact}}
  - **Maintainability Impact:** {{maintainability_impact}}
  - **Scalability Concerns:** {{scalability_concerns}}

<</REPEAT>>

### 4.3 Implementation Quality Issues

[[LLM: Document code quality and implementation issues]]

**Code Architecture & Design:**

- {{arch_concern_1}}
- {{arch_concern_2}}

**Code Repetition:**

<<REPEAT: repetition_issue>>

- **{{code_area}}:** {{repetition_description}} - {{refactoring_opportunity}}

<</REPEAT>>

**API Contracts:**

<<REPEAT: api_issue>>

- **{{api_endpoint}}:** {{issue_description}} - {{impact_assessment}}

<</REPEAT>>

@{example: api_issues}
- User profile endpoint returned inconsistent data types (string vs number for user_id)
- Missing error codes for edge cases caused unclear error handling in frontend
- API versioning strategy unclear, leading to breaking changes in Story 3.2
@{/example}

### 4.4 Testing Gaps

[[LLM: Analyze testing gaps and issues comprehensively]]

**Test Coverage Gaps:**

- **Unit Tests:** {{unit_test_gaps}}
- **Integration Tests:** {{integration_test_gaps}}
- **E2E Tests:** {{e2e_test_gaps}}
- **Requirements Validation Tests:** {{requirements_test_gaps}}

**Test Quality Issues:**

<<REPEAT: test_issue>>

- **{{test_area}}:** {{issue_description}} - {{improvement_needed}}

<</REPEAT>>

**Testing Process Issues:** {{process_issues}}

@{example: testing_issues}
- Payment flow integration tests failed to cover error scenarios (API timeout, network issues)
- Requirements validation tests missing for business rule compliance
- E2E tests were flaky due to timing issues, causing false failures in CI pipeline
@{/example}

### 4.5 Process & Story Management

[[LLM: Evaluate story management and development process issues]]

**Story Definition Issues:**

- {{story_issue_1}}
- {{story_issue_2}}

**Definition of Done Gaps:** {{dod_assessment}}

**Requirements Handoff Problems:** {{handoff_assessment}}

**Agent Communication Issues:** {{agent_communication_issues}}

### 4.6 Estimations

[[LLM: Analyze estimation accuracy and planning issues]]

**Estimation Accuracy:**

| Story | Estimated Effort | Actual Effort | Variance | Factors |
| :---- | :-------------- | :------------ | :------- | :------ |
| {{story_id}} | {{estimate}} | {{actual}} | {{variance}} | {{factors}} |

**Planning Issues Identified:**

- {{planning_issue_1}}
- {{planning_issue_2}}

**Scope Creep Instances:** {{scope_creep_assessment}}

## 5. Key Insights

[[LLM: Synthesize broader takeaways and learnings from the epic development process. Focus on insights that provide strategic value for future development and requirements management.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

**Requirements Management Insights:**

<<REPEAT: requirements_insight>>

- **{{insight_area}}:** {{insight_description}}

<</REPEAT>>

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
- Early requirements validation with stakeholders prevented 4 major rework cycles
- Automated testing infrastructure investment in Epic 1 improved requirement validation confidence
- Cross-functional story reviews identified architecture-requirement mismatches before development
@{/example}

## 6. Actionable Recommendations

[[LLM: Provide specific, prioritized recommendations that can be implemented in future epics. Each recommendation should include implementation guidance and success metrics. Focus on both process improvements AND requirements management enhancements.

After presenting this section, apply `tasks#advanced-elicitation` protocol]]

### 6.1 Requirements Management Improvements

[[LLM: Recommendations for improving requirements clarity, validation, and compliance]]

**High Priority:**

<<REPEAT: requirements_recommendation>>

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

### 6.2 Process & Planning

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

### 6.3 Development & DX

[[LLM: Recommendations for improving developer experience and development practices]]

**Immediate Actions:**

<<REPEAT: dev_recommendation>>

- **{{dev_improvement}}:** {{implementation_approach}} - {{expected_benefit}}

<</REPEAT>>

**Tool and Process Improvements:**

- {{tool_improvement_1}}
- {{tool_improvement_2}}

@{example: dev_recommendations}
- Implement requirements validation pre-commit hooks (reduce compliance issues by 50%)
- Create shared component library with requirement traceability (target: 50% reduction in implementation gaps)
- Establish architecture compliance testing to catch deviations early (prevent architectural drift)
@{/example}

### 6.4 Architecture & Patterns

[[LLM: Recommendations for architectural improvements]]

**Architectural Improvements:**

<<REPEAT: arch_recommendation>>

- **{{architecture_area}}:** {{improvement_description}} - {{implementation_strategy}}

<</REPEAT>>

**Pattern Standardization:**

- {{pattern_standardization_1}}
- {{pattern_standardization_2}}

### 6.5 Template & Documentation Enhancements

[[LLM: Recommendations for improving BMAD templates and documentation practices]]

**Template Improvements:**

<<REPEAT: template_improvement>>

- **{{template_name}}:** {{improvement_description}} - {{implementation_approach}}

<</REPEAT>>

**Documentation Standards:**

- {{doc_standard_1}}
- {{doc_standard_2}}

### 6.6 Future Tooling

[[LLM: Recommendations for new tools and technology adoption]]

**Tool Evaluation Needed:**

<<REPEAT: tool_evaluation>>

- **{{tool_category}}:** {{tool_options}} - {{evaluation_criteria}}

<</REPEAT>>

**Technology Upgrades:**

- {{upgrade_recommendation_1}}
- {{upgrade_recommendation_2}}

## 7. Metrics and Evidence

[[LLM: Provide concrete metrics and evidence supporting the retrospective analysis]]

### 7.1 Requirements Compliance Metrics

| Metric | Target | Achieved | Status |
| :----- | :----- | :------- | :----- |
| Requirements Compliance | {{target_compliance}}% | {{actual_compliance}}% | {{status}} |
| Architecture Adherence | {{target_adherence}}% | {{actual_adherence}}% | {{status}} |
| Story Acceptance Criteria Met | {{target_criteria}}% | {{actual_criteria}}% | {{status}} |
| Implementation Gaps | {{target_gaps}} | {{actual_gaps}} | {{status}} |

### 7.2 Quality Metrics

| Metric | Target | Achieved | Status |
| :----- | :----- | :------- | :----- |
| Test Coverage | {{target_coverage}}% | {{actual_coverage}}% | {{status}} |
| Bug Density | {{target_bugs}}/KLOC | {{actual_bugs}}/KLOC | {{status}} |
| Code Review Time | {{target_review_time}} | {{actual_review_time}} | {{status}} |
| Story Completion Rate | {{target_completion}}% | {{actual_completion}}% | {{status}} |

### 7.3 Development Velocity

**Story Completion Metrics:**

- **Planned Stories:** {{planned_stories}}
- **Completed Stories:** {{completed_stories}}
- **Average Story Cycle Time:** {{avg_cycle_time}}
- **Velocity Trend:** {{velocity_assessment}}

### 7.4 Issue Tracking

**Bug Analysis:**

- **Total Bugs Found:** {{total_bugs}}
- **Severity Distribution:** {{severity_breakdown}}
- **Resolution Time:** {{avg_resolution_time}}
- **Escaped Defects:** {{escaped_defects}}

**Requirements-Related Issues:**

- **Requirements Clarification Requests:** {{clarification_requests}}
- **Scope Change Requests:** {{scope_changes}}
- **Implementation Rework Due to Requirement Issues:** {{rework_instances}}

## 8. Follow-up Actions

[[LLM: Define specific next steps and ownership for implementing recommendations]]

### 8.1 Immediate Actions (Next Sprint)

<<REPEAT: immediate_action>>

- [ ] **{{action_item}}**
  - **Owner:** {{responsible_person}}
  - **Due Date:** {{due_date}}
  - **Success Criteria:** {{completion_criteria}}

<</REPEAT>>

### 8.2 Short-term Actions (Next Epic)

<<REPEAT: short_term_action>>

- [ ] **{{action_item}}**
  - **Owner:** {{responsible_person}}
  - **Timeline:** {{timeline}}
  - **Dependencies:** {{dependencies}}

<</REPEAT>>

### 8.3 Long-term Improvements

- {{long_term_improvement_1}}
- {{long_term_improvement_2}}

## 9. Retrospective Validation

[[LLM: Include validation steps to ensure retrospective accuracy and completeness]]

### 9.1 Stakeholder Review Checklist

- [ ] Development team feedback incorporated
- [ ] Product Owner perspective included
- [ ] Scrum Master/Project Manager input gathered
- [ ] Technical Architecture review completed
- [ ] **Requirements validation review completed**
- [ ] **Compliance assessment verified**
- [ ] All major quality issues documented

### 9.2 Evidence Validation

- [ ] All conclusions supported by concrete data
- [ ] **Requirements compliance verified against original documentation**
- [ ] **Implementation deviations documented with evidence**
- [ ] Metrics verified against actual project artifacts
- [ ] Recommendations linked to specific identified issues
- [ ] Success stories documented with measurable outcomes

### 9.3 Interactive Elicitation Completion

- [ ] Advanced elicitation applied to all major sections
- [ ] Critical perspectives explored for key findings
- [ ] Alternative solutions considered for major issues
- [ ] Step-by-step reasoning validated for recommendations

### 9.4 Next Retrospective Planning

**Recommended Timeline:** {{next_retrospective_timeline}}

**Focus Areas for Next Retrospective:**

- {{next_focus_1}}
- {{next_focus_2}}

**Improvement Tracking:**

- {{improvement_tracking_approach}}

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