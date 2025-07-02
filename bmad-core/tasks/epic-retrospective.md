# Epic Retrospective Task

## Purpose

Facilitate a comprehensive retrospective analysis of completed epics that combines process improvement with rigorous requirements validation and implementation compliance checking. This task evaluates both the AI agent development process AND validates whether the delivered solution actually meets the original requirements as specified in the PRD, architecture, epic, and stories. As the Scrum Master, you facilitate this retrospective to gather insights from development experience while ensuring delivered work aligns with stated requirements and architectural decisions.

## When to Use This Task

**Use this task when:**

- An epic has been completed with all stories reaching Definition of Done
- AI agent development sessions have concluded for the epic
- There is sufficient chat history and commit data to analyze
- Original requirements documentation is available (PRD, architecture, epic, stories)
- The team is ready to invest time in both process improvement AND requirements validation analysis

**Use alternative retrospective approaches when:**

- Epic is still in progress (use review-story instead for individual story feedback)
- Immediate bug fixes are needed (focus on incident analysis)
- Epic was abandoned or significantly changed mid-development (consider lessons learned session)
- Insufficient development history or requirements documentation exists for meaningful analysis

## Instructions

### 1. Data Collection and Preparation (Required)

As the Scrum Master, gather comprehensive development artifacts, requirements documentation, and AI agent interaction data:

**Original Requirements Documentation:**

- [ ] Original PRD document with business requirements and goals
- [ ] Architecture documentation with technical decisions and patterns
- [ ] Epic document with scope and high-level requirements
- [ ] All story documents with acceptance criteria and Definition of Done
- [ ] Any technical specifications or design documents

**Epic Documentation:**

- [ ] Completed epic document with original goals and scope
- [ ] All story documents associated with the epic
- [ ] Definition of Done criteria for each story
- [ ] Acceptance criteria and business requirements

**AI Agent Development Data:**

- [ ] Chat transcripts from agent interactions during epic development
- [ ] Agent handoff quality between SM → Dev → QA → PO workflows
- [ ] Story preparation effectiveness and clarity
- [ ] Agent instruction adherence and task completion patterns
- [ ] Template usage and effectiveness during development

**Development Process Data:**

- [ ] Git commit history and development patterns throughout the epic
- [ ] Story completion rates and development velocity
- [ ] Code review outcomes and refactoring patterns
- [ ] Testing implementation and coverage achieved
- [ ] Debug log entries and issue resolution patterns

**Final Implementation Artifacts:**

- [ ] Final codebase state for the epic
- [ ] Test coverage reports and quality metrics
- [ ] Build and validation outcomes
- [ ] Architecture adherence and technical debt introduction
- [ ] Deployed solution demonstrating delivered functionality

### 2. Requirements Validation & Implementation Compliance Analysis

Conduct thorough validation of delivered solution against original requirements:

#### PRD and Business Requirements Validation

**Business Goals Achievement:**

- [ ] Validate each business goal from PRD was addressed in implementation
- [ ] Identify any business requirements that were missed or partially implemented
- [ ] Assess whether delivered functionality solves the stated problem
- [ ] Verify target user needs are met by the implementation

**Functional Requirements Compliance:**

- [ ] Map each functional requirement to specific implementation
- [ ] Identify requirements that deviated from original specification
- [ ] Document any functionality that was added beyond original scope
- [ ] Assess completeness of requirement implementation

#### Architecture Compliance Assessment

**Architectural Decision Adherence:**

- [ ] Validate implementation follows architectural patterns specified
- [ ] Identify deviations from architectural decisions and document rationale
- [ ] Assess whether technical constraints were respected
- [ ] Review if recommended technology choices were implemented

**Design Pattern Implementation:**

- [ ] Verify design patterns were implemented as specified
- [ ] Document pattern deviations and their impact
- [ ] Assess consistency of pattern usage across the codebase
- [ ] Identify missing patterns that were specified in architecture

#### Story and Acceptance Criteria Validation

**Story Completion Verification:**

- [ ] Validate each story's acceptance criteria against final implementation
- [ ] Identify any acceptance criteria that were not met
- [ ] Document scope creep or feature additions not in original stories
- [ ] Assess Definition of Done achievement for each story

**Requirements Traceability:**

- [ ] Create traceability matrix from PRD → Architecture → Epic → Stories → Implementation
- [ ] Identify gaps in traceability chain
- [ ] Document orphaned implementations (code with no requirement source)
- [ ] Highlight requirements that have no corresponding implementation

### 3. Implementation Deviation Analysis

#### Significant Deviations Identification

**Architecture Deviations:**

- [ ] Document major architectural decisions that differed from specification
- [ ] Analyze impact of architectural deviations on system quality
- [ ] Assess whether deviations were justified and documented
- [ ] Evaluate if deviations introduce technical debt or risks

**Requirements Deviations:**

- [ ] Identify functional requirements that were implemented differently than specified
- [ ] Document business rule changes made during implementation
- [ ] Assess impact of requirement deviations on user experience
- [ ] Validate whether requirement changes were approved

#### Deviation Impact Assessment

**Quality Impact Analysis:**

- [ ] Assess how deviations affected system performance, security, maintainability
- [ ] Evaluate impact on testing strategy and coverage
- [ ] Analyze effect on user experience and business goals
- [ ] Document technical debt introduced by deviations

**Process Impact Analysis:**

- [ ] Evaluate how deviations affected development velocity
- [ ] Assess impact on team communication and decision-making
- [ ] Analyze effect on story estimation accuracy
- [ ] Document lessons learned from deviation handling

### 4. AI Agent Development Process Analysis

Conduct a thorough analysis of the AI-assisted development workflow:

#### Agent Collaboration and Workflow Analysis

**BMAD Agent Effectiveness:**

- [ ] Evaluate story preparation quality from SM agent
- [ ] Assess development task execution by Dev agent
- [ ] Review code quality improvements from QA agent
- [ ] Analyze handoff clarity between different agents

**Agent Instruction Adherence:**

- [ ] Review how well agents followed story instructions
- [ ] Assess template usage and consistency
- [ ] Identify instruction ambiguities that caused confusion
- [ ] Evaluate agent decision-making quality

#### Development Process Analysis

**Story Execution Quality:**

- [ ] Analyze story completion patterns and blockers
- [ ] Review task breakdown effectiveness
- [ ] Assess testing integration during development
- [ ] Evaluate Definition of Done achievement

**Code Quality and Patterns:**

- [ ] Review commit history for development patterns
- [ ] Assess code quality and architectural consistency
- [ ] Analyze refactoring effectiveness
- [ ] Evaluate technical debt management

#### Chat and Communication Analysis

**Agent Communication Effectiveness:**

- [ ] Review chat clarity and instruction quality
- [ ] Assess agent response accuracy and helpfulness
- [ ] Identify communication breakdowns or misunderstandings
- [ ] Evaluate iterative improvement patterns

**Development Flow:**

- [ ] Analyze development velocity and momentum
- [ ] Review blocker identification and resolution
- [ ] Assess feedback incorporation effectiveness

### 5. Interactive Retrospective Document Generation

Use the epic-retrospective-tmpl.md template to create the comprehensive retrospective report with interactive elicitation:

#### Requirements Validation Section (New)

Document comprehensive validation findings:

- **Requirements Traceability:** Complete mapping from PRD to implementation
- **Compliance Assessment:** Detailed analysis of adherence to specifications
- **Deviation Analysis:** Documentation of all significant deviations with impact assessment
- **Implementation Gaps:** Identification of missing or incomplete requirements
- **Quality Impact:** Assessment of how compliance/deviations affected system quality

#### What Went Well Section

Focus on effective AI agent development practices and successful requirement implementation:

- **Agent Coordination:** Note effective handoffs and collaboration patterns
- **Requirements Implementation:** Highlight well-executed requirements and architectural decisions
- **Story Quality:** Document stories that led to smooth development and accurate implementation
- **Development Flow:** Note efficient development patterns and velocity
- **Code Quality:** Celebrate effective testing, refactoring, and architectural adherence
- **Template Usage:** Recognize effective use of BMAD templates and processes

#### What Could Be Improved Section

Identify specific areas needing enhancement in both AI agent development and requirements management:

- **Requirements Clarity:** Note unclear or ambiguous requirements that caused implementation issues
- **Agent Instructions:** Document instruction problems that led to incorrect implementations
- **Story Preparation:** Identify gaps in story technical guidance or requirement context
- **Development Process:** Document workflow inefficiencies or requirement misunderstandings
- **Template Effectiveness:** Note template limitations that led to requirement gaps
- **Communication Patterns:** Identify areas where requirement communication could improve

#### Interactive Elicitation Integration

Throughout document creation, apply advanced elicitation techniques:

- **After each major section:** Apply `tasks#advanced-elicitation` protocol
- **During deviation analysis:** Use critical perspective elicitation to challenge assumptions
- **For requirement gaps:** Apply alternative exploration to identify potential solutions
- **During validation:** Use step-by-step reasoning elicitation to ensure thoroughness

### 6. Validation and Review

Before finalizing the retrospective, ensure comprehensive coverage:

**Content Validation:**

- [ ] All major development process issues identified and analyzed
- [ ] All requirements deviations documented with evidence and impact assessment
- [ ] Recommendations are specific, actionable, and address both process and compliance issues
- [ ] Both successful and challenging aspects are balanced
- [ ] Analysis is supported by chat history, commit evidence, and requirement documentation

**Requirements Validation Review:**

- [ ] Requirements traceability matrix is complete and accurate
- [ ] All significant deviations are documented with rationale
- [ ] Implementation gaps are clearly identified
- [ ] Compliance assessment is evidence-based and thorough
- [ ] Impact analysis covers quality, business, and technical aspects

**Process Review:**

- [ ] Agent workflow effectiveness assessed
- [ ] Story preparation quality evaluated
- [ ] Template and instruction clarity reviewed
- [ ] Development velocity and quality patterns analyzed

**Follow-up Planning:**

- [ ] Recommendations prioritized by impact on future agent development and requirement compliance
- [ ] Template and process updates identified for better requirement management
- [ ] Agent instruction improvements specified for better requirement adherence
- [ ] Success metrics defined for recommended changes

## Output

A single markdown file named `epic-retrospective-<epic_name>.md` saved in the `docs/retrospectives/` directory.

**File Structure Requirements:**

- Use the enhanced epic-retrospective-tmpl.md template
- Include comprehensive requirements validation section with evidence
- Document all sections with focus on both AI agent development process AND requirement compliance
- Provide specific examples from chat history, commit patterns, AND requirement documentation
- Include metrics and evidence from development artifacts and requirement validation
- Ensure recommendations improve both future AI agent collaboration AND requirement management

## Success Criteria

The epic retrospective is successful when:

1. **Comprehensive Process Analysis:** All aspects of AI agent development workflow are reviewed
2. **Thorough Requirements Validation:** Complete assessment of implementation against original requirements
3. **Evidence-Based Insights:** Conclusions are supported by chat history, commit data, AND requirement documentation
4. **Actionable Recommendations:** Proposed improvements address both AI agent development AND requirement compliance
5. **Process Learning:** Document provides clear guidance for future AI-assisted epic development
6. **Requirement Management Improvement:** Identifies concrete ways to enhance requirement clarity and compliance
7. **Template Enhancement:** Identifies improvements to BMAD templates for better requirement management
8. **Agent Workflow Optimization:** Recommendations improve agent collaboration and requirement adherence
9. **Interactive Engagement:** Advanced elicitation techniques are applied throughout for deeper insights

## Important Notes

- **Dual Focus:** Analyze both AI agent interactions AND requirement compliance equally
- **Evidence-Based Validation:** Use actual requirement documents to validate implementation compliance
- **Chat History Analysis:** Use actual agent conversations to identify requirement understanding issues
- **Commit Pattern Review:** Analyze development velocity and requirement implementation trends
- **Template Effectiveness:** Evaluate how well BMAD templates guided requirement implementation
- **Agent Instruction Quality:** Focus on clarity and effectiveness of requirement-related agent instructions
- **Interactive Enhancement:** Apply advanced elicitation throughout for deeper analysis and insights
- **Deviation Documentation:** Thoroughly document and analyze all requirement deviations with impact assessment
- **Iterative Improvement:** Recommendations should enhance both future AI agent development cycles AND requirement management processes