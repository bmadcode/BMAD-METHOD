# Epic Retrospective Task

## Purpose

Facilitate a comprehensive retrospective analysis of completed epics from a team and process improvement standpoint. This task focuses on evaluating the AI agent development process, chat interactions, and commit history to identify successes, challenges, and areas for improvement. As the Scrum Master, you facilitate this retrospective to gather insights from development experience and guide future epics toward better AI agent collaboration and more effective development workflows.

## When to Use This Task

**Use this task when:**

- An epic has been completed with all stories reaching Definition of Done
- AI agent development sessions have concluded for the epic
- There is sufficient chat history and commit data to analyze
- The team is ready to invest time in process improvement analysis

**Use alternative retrospective approaches when:**

- Epic is still in progress (use review-story instead for individual story feedback)
- Immediate bug fixes are needed (focus on incident analysis)
- Epic was abandoned or significantly changed mid-development (consider lessons learned session)
- Insufficient development history exists for meaningful analysis

## Instructions

### 1. Data Collection and Preparation (Required)

As the Scrum Master, gather comprehensive development artifacts and AI agent interaction data:

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

**Technical Artifacts:**

- [ ] Final codebase state for the epic
- [ ] Test coverage reports and quality metrics
- [ ] Build and validation outcomes
- [ ] Architecture adherence and technical debt introduction

### 2. AI Agent Development Process Analysis

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

### 3. Retrospective Document Generation

Use the epic-retrospective-tmpl.md template to create the comprehensive retrospective report:

#### What Went Well Section

Focus on effective AI agent development practices:

- **Agent Coordination:** Note effective handoffs and collaboration patterns
- **Story Quality:** Highlight well-prepared stories that led to smooth development
- **Development Flow:** Document efficient development patterns and velocity
- **Code Quality:** Celebrate effective testing, refactoring, and architectural decisions
- **Template Usage:** Recognize effective use of BMAD templates and processes

#### What Could Be Improved Section

Identify specific areas needing enhancement in AI agent development:

- **Agent Instructions:** Note unclear or ambiguous instructions that caused issues
- **Story Preparation:** Identify gaps in story technical guidance or context
- **Development Process:** Document workflow inefficiencies or agent confusion
- **Template Effectiveness:** Note template limitations or unclear sections
- **Communication Patterns:** Identify areas where agent communication could improve

#### Actionable Recommendations Section

Propose concrete improvements for future AI agent development:

- **Story Template Updates:** Specific improvements to story preparation templates
- **Agent Instruction Clarity:** Better instruction patterns for agents
- **Workflow Optimization:** Process improvements for agent handoffs
- **Template Enhancements:** Updates to BMAD templates and checklists
- **Development Practice:** Better patterns for AI-assisted development

### 4. Validation and Review

Before finalizing the retrospective, ensure comprehensive coverage:

**Content Validation:**

- [ ] All major development process issues identified and analyzed
- [ ] Recommendations are specific, actionable, and focused on AI agent workflows
- [ ] Both successful and challenging aspects are balanced
- [ ] Analysis is supported by chat history and commit evidence

**Process Review:**

- [ ] Agent workflow effectiveness assessed
- [ ] Story preparation quality evaluated
- [ ] Template and instruction clarity reviewed
- [ ] Development velocity and quality patterns analyzed

**Follow-up Planning:**

- [ ] Recommendations prioritized by impact on future agent development
- [ ] Template and process updates identified
- [ ] Agent instruction improvements specified
- [ ] Success metrics defined for recommended changes

## Output

A single markdown file named `epic-retrospective-<epic_name>.md` saved in the `docs/retrospectives/` directory.

**File Structure Requirements:**

- Use the epic-retrospective-tmpl.md template
- Include all sections with focus on AI agent development process
- Provide specific examples from chat history and commit patterns
- Include metrics and evidence from development artifacts
- Ensure recommendations improve future AI agent collaboration

## Success Criteria

The epic retrospective is successful when:

1. **Comprehensive Process Analysis:** All aspects of AI agent development workflow are reviewed
2. **Evidence-Based Insights:** Conclusions are supported by chat history and commit data
3. **Actionable Recommendations:** Proposed improvements are specific to AI agent development
4. **Process Learning:** Document provides clear guidance for future AI-assisted epic development
5. **Template Improvement:** Identifies concrete ways to enhance BMAD templates and processes
6. **Agent Workflow Optimization:** Recommendations improve agent collaboration and effectiveness

## Important Notes

- **Focus on Development Process:** Analyze AI agent interactions, not real-world deployment outcomes
- **Chat History Analysis:** Use actual agent conversations to identify patterns and issues
- **Commit Pattern Review:** Analyze development velocity and code quality trends
- **Template Effectiveness:** Evaluate how well BMAD templates guided development
- **Agent Instruction Quality:** Focus on clarity and effectiveness of agent instructions
- **Iterative Improvement:** Recommendations should enhance future AI agent development cycles

**Agent Responsibility:** The Scrum Master conducting this retrospective should focus on improving the AI-assisted development process, agent collaboration patterns, and template effectiveness for future epics.