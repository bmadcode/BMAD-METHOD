# QA Epic Retrospective Task

## Purpose

Conduct a comprehensive retrospective analysis of completed epics from a quality assurance standpoint. This task focuses on evaluating the entire development and testing process to identify successes, failures, and areas for improvement in product quality and testing strategy. The resulting retrospective document serves as a learning tool to guide future development cycles and enhance overall quality processes.

## When to Use This Task

**Use this task when:**

- An epic has been completed and deployed
- All associated stories have reached their Definition of Done
- QA wants to capture lessons learned for process improvement
- Team is ready to invest time in reflective analysis

**Use alternative retrospective approaches when:**

- Epic is still in progress (use review-story instead)
- Immediate hotfixes are needed (focus on incident post-mortems)
- Limited QA involvement in the epic (consider development-focused retrospectives)
- Epic was abandoned or significantly changed mid-development

## Instructions

### 1. Data Collection and Preparation (Required)

Before beginning the analysis, gather all relevant documentation and data from the completed epic:

**Epic Documentation:**

- [ ] Completed epic document with original goals and scope
- [ ] All story documents associated with the epic
- [ ] Definition of Done criteria for each story
- [ ] Acceptance criteria and business requirements

**Testing Documentation:**

- [ ] Test plans and test case documentation
- [ ] Test execution reports and results
- [ ] Bug reports filed during the epic development
- [ ] Performance test results (if applicable)
- [ ] User acceptance testing feedback

**Development Artifacts:**

- [ ] Git commit history for the epic's duration
- [ ] Final codebase snapshot for the epic

### 2. Quality Analysis

Conduct a thorough analysis of the collected data from multiple QA perspectives:

#### Test Coverage and Effectiveness Analysis

**Test Plan Review:**

- [ ] Analyze test plan coverage against requirements
- [ ] Identify gaps between planned and executed tests
- [ ] Evaluate test case quality and completeness
- [ ] Review automation vs manual testing balance

**Bug Analysis:**

- [ ] Categorize bugs by severity and type
- [ ] Analyze bug introduction points in development cycle
- [ ] Review bug fix effectiveness and regression occurrences
- [ ] Identify patterns in bug types or areas

#### Documentation and Requirements Analysis

**Requirements Validation:**

- [ ] Verify final product meets acceptance criteria
- [ ] Identify requirements that were unclear or changed
- [ ] Assess story Definition of Done effectiveness
- [ ] Review business value delivery against original goals

**Documentation Quality:**

- [ ] Evaluate test documentation completeness
- [ ] Review user documentation accuracy
- [ ] Assess technical documentation for QA processes

#### Codebase and Development Process Analysis

**Code Quality Review:**

- [ ] Analyze commit history for quality trends
- [ ] Review code review effectiveness from QA perspective
- [ ] Identify areas with high bug density
- [ ] Assess testability of delivered code

**Process Effectiveness:**

- [ ] Evaluate QA involvement throughout development
- [ ] Review testing environment stability and effectiveness
- [ ] Analyze deployment and release process quality

### 3. Retrospective Document Generation

Use the epic-retrospective-tmpl.md template to create the comprehensive retrospective report:

#### What Went Well Section

Focus on QA successes and effective practices:

- **Testing Strategies:** Note effective testing approaches, tools, or methodologies
- **Collaboration:** Highlight good communication between QA and development teams
- **Quality Metrics:** Document areas with low bug counts or high test coverage
- **Process Improvements:** Recognize successful process changes implemented during the epic

#### What Could Be Improved Section

Identify specific areas needing enhancement:

- **Test Coverage Gaps:** Document areas with insufficient testing
- **Bug Prevention:** Identify recurring bug types or root causes
- **Requirements Issues:** Note unclear acceptance criteria or changing requirements
- **Environment Issues:** Document testing environment problems or limitations
- **Communication:** Identify breakdowns in QA/Dev collaboration

#### Actionable Recommendations Section

Propose concrete, implementable improvements:

- **Process Changes:** Specific modifications to QA processes
- **Tool Improvements:** New tools or better use of existing tools
- **Training Needs:** Skills development for team members
- **Documentation Updates:** Improvements to templates or standards
- **Automation Opportunities:** Areas where manual testing could be automated

### 4. Validation and Review

Before finalizing the retrospective, ensure comprehensive coverage:

**Content Validation:**

- [ ] All major quality issues identified and analyzed
- [ ] Recommendations are specific and actionable
- [ ] Both positive and negative aspects are balanced
- [ ] Data supports all conclusions and recommendations

**Stakeholder Review:**

- [ ] Development team feedback incorporated
- [ ] Product Owner perspective considered
- [ ] Scrum Master/Project Manager input included
- [ ] Technical Architecture feedback if relevant

**Follow-up Planning:**

- [ ] Recommendations prioritized by impact and effort
- [ ] Owners assigned for implementing recommendations
- [ ] Timeline established for process improvements
- [ ] Success metrics defined for recommended changes

## Output

A single markdown file named `qa-epic-retrospective-<epic_name>.md` saved in the `docs/retrospectives/` directory.

**File Structure Requirements:**

- Use the epic-retrospective-tmpl.md template
- Include all sections with substantive content
- Provide specific examples rather than generic statements
- Include metrics and data where available
- Ensure recommendations are actionable with clear next steps

## Success Criteria

The epic retrospective is successful when:

1. **Comprehensive Analysis:** All aspects of quality and testing are thoroughly reviewed
2. **Data-Driven Insights:** Conclusions are supported by concrete evidence from the epic
3. **Actionable Recommendations:** Proposed improvements are specific, measurable, and implementable
4. **Process Learning:** Document provides clear guidance for future epic development
5. **Stakeholder Value:** Insights are valuable to development team, product management, and QA processes
6. **Continuous Improvement:** Recommendations address root causes, not just symptoms

## Important Notes

- **Timing Matters:** Conduct retrospectives while the epic experience is still fresh, but allow time for post-deployment observation
- **Focus on Learning:** Emphasize learning and improvement over blame or criticism
- **Data Over Opinion:** Base conclusions on concrete evidence from testing and development artifacts
- **Actionable Outcomes:** Ensure every recommendation has a clear path to implementation
- **Follow Through:** Plan to review retrospective recommendations in future epics to ensure continuous improvement

**Agent Responsibility:** The QA agent conducting this retrospective should maintain objectivity while advocating for quality improvements that benefit the entire development process.