# Context Handoff Task

## Purpose
Transfer context between agents while optimizing for receiving agent type and maintaining essential information. This task enables seamless cross-agent collaboration by providing appropriate context summaries and transfers based on agent capabilities and requirements.

## Handoff Types

### Dev Agent Handoff (Lean Context Transfer)
When transferring TO dev agent:
- Maximum 2000 tokens total context
- Focus on implementation requirements only
- Strip planning and strategic context
- Preserve technical specifications and constraints
- Include only actionable development information

### Planning Agent Handoff (Rich Context Transfer)  
When transferring TO planning agent:
- Maximum 8000 tokens total context
- Preserve strategic context and decision rationale
- Include stakeholder information and business requirements
- Maintain collaboration history and cross-functional context
- Keep high-level goals and objectives

### Cross-Planning Agent Handoff
Between planning agents of different specializations:
- Preserve role-specific context relevant to receiving agent
- Include collaboration history and shared decision points
- Maintain strategic context while adding domain-specific focus
- Ensure smooth transition without information loss

## Procedure

### 1. Handoff Initialization

**Identify Transfer Context**
- Source agent type and current context state
- Target agent type and context requirements
- Transfer reason and expected outcomes
- Critical information that must be preserved

**Assess Transfer Requirements**
[[LLM: Analyze the target agent's role and determine what context information is essential for their successful operation]]

**Context Mapping**
- Map current context elements to target agent priorities
- Identify information relevant to target agent's domain
- Flag context that can be compressed or removed
- Mark critical handoff points and dependencies

### 2. Agent-Specific Context Preparation

**For Handoff TO Dev Agent:**

**Essential Context (Always Include)**
- Current task requirements and acceptance criteria
- Technical specifications and implementation constraints  
- Code standards, patterns, and architectural decisions
- Error states, debugging information, and edge cases
- File dependencies and integration requirements

**Context Transformation**
[[LLM: Convert planning context into implementation-focused information that directly supports coding tasks]]

**Remove/Minimize**
- Strategic discussions and business rationale
- Stakeholder conversations and requirements gathering
- Market analysis and competitive information
- High-level planning and roadmap discussions
- Non-technical background and context

**Dev-Optimized Summary Format**
```
## Implementation Context Handoff

**Task Overview:**
{{task_summary_implementation_focused}}

**Technical Requirements:**
{{technical_specifications}}

**Code Constraints:**
{{coding_standards_and_constraints}}

**Dependencies:**
{{technical_dependencies}}

**Acceptance Criteria:**
{{implementation_acceptance_criteria}}

**Known Issues/Considerations:**
{{technical_issues_and_edge_cases}}
```

**For Handoff TO Planning Agent:**

**Essential Context (Always Include)**
- Business objectives and strategic goals
- Stakeholder requirements and constraints
- Decision history and rationale
- Cross-functional collaboration context
- Market and user considerations

**Context Expansion**
[[LLM: Enhance technical context with strategic implications and business value]]

**Preserve/Enhance**
- Strategic planning discussions
- Stakeholder communication history
- Business requirements and user stories
- Market context and competitive analysis
- Cross-team collaboration and dependencies

**Planning-Optimized Summary Format**
```
## Strategic Context Handoff

**Business Objectives:**
{{strategic_goals_and_objectives}}

**Stakeholder Context:**
{{stakeholder_requirements_and_constraints}}

**Decision History:**
{{key_decisions_and_rationale}}

**Collaboration Context:**
{{cross_functional_information}}

**Current Status:**
{{project_status_and_next_steps}}

**Success Metrics:**
{{success_criteria_and_kpis}}
```

**For Cross-Planning Agent Handoff:**

**Role-Specific Context Adaptation**
[[LLM: Adapt context to emphasize information most relevant to the receiving planning agent's specialization]]

**Preserve Common Planning Context**
- Strategic objectives and business goals
- Stakeholder requirements and constraints
- Cross-functional collaboration history
- Decision rationale and trade-offs

**Add Domain-Specific Focus**
- **To Architect**: Technical constraints, system design, architecture decisions
- **To PM**: Product strategy, market requirements, feature prioritization
- **To PO**: User stories, backlog management, acceptance criteria
- **To Analyst**: Business process, requirements analysis, stakeholder needs
- **To UX Expert**: User research, design requirements, usability considerations
- **To QA**: Quality standards, testing requirements, acceptance criteria
- **To SM**: Team dynamics, process requirements, impediment tracking

### 3. Context Validation and Quality Assurance

**Completeness Validation**
- Verify all critical information for target agent is included
- Confirm no essential context has been lost in translation
- Validate that handoff supports target agent's success

**Relevance Check**
- Ensure all included context is relevant to target agent's role
- Remove any remaining irrelevant information
- Optimize context density for target agent's needs

**Handoff Integrity**
- Verify context relationships remain intact
- Check for any broken references or missing links
- Ensure logical flow and coherence

### 4. Handoff Execution

**Context Package Creation**
```
{{handoff_context_package}}
```

**Handoff Instructions**
[[LLM: Generate specific instructions for the receiving agent based on their role and the context being transferred]]

**Transition Guidance**
- Clear next steps for the receiving agent
- Context on how to use the transferred information
- Any special considerations or important notes

### 5. Handoff Confirmation

**Transfer Verification**
- Confirm receiving agent has access to all necessary context
- Validate that context is properly formatted for agent type
- Ensure no critical information was lost or corrupted

**Success Metrics**
- Context relevance score for receiving agent
- Information completeness for target tasks
- Transfer efficiency and token utilization

## Output Format

### Context Handoff Package
```
# Context Handoff: {{source_agent}} → {{target_agent}}

## Handoff Summary
**Transfer Type:** {{handoff_type}}
**Transfer Reason:** {{transfer_reason}}
**Critical Context:** {{critical_context_summary}}

## Optimized Context for {{target_agent}}
{{optimized_context_for_target_agent}}

## Handoff Instructions
[[LLM: Provide specific guidance for the receiving agent on how to use this context effectively]]

## Transition Notes
{{special_considerations_and_notes}}

## Context Metrics
- Original Context Size: {{original_token_count}} tokens
- Transferred Context Size: {{transferred_token_count}} tokens
- Compression Ratio: {{compression_ratio}}
- Relevance Score: {{relevance_score}}/10
```

### Handoff Success Confirmation
```
## Handoff Completion Status

**Transfer Details:**
- Source Agent: {{source_agent_type}}
- Target Agent: {{target_agent_type}}
- Transfer Time: {{transfer_timestamp}}
- Context Quality Score: {{quality_score}}/10

**Validation Results:**
- ✅ Context Completeness: {{completeness_percentage}}%
- ✅ Information Relevance: {{relevance_percentage}}%
- ✅ Transfer Integrity: {{integrity_status}}
- ✅ Agent Readiness: {{readiness_status}}

**Next Actions:**
{{recommended_next_actions_for_receiving_agent}}
```

## Error Handling

### Failed Handoff Recovery
- Identify missing or corrupted context elements
- Attempt context reconstruction from available sources
- Escalate to human intervention if critical information is lost
- Document handoff failures for process improvement

### Context Validation Failures
- Re-validate context against target agent requirements
- Apply additional compression or expansion as needed
- Retry handoff with corrected context package
- Log validation failures for analysis

## Dependencies
- context-compression utility
- context-filtering utility
- context-validation task

## Configuration
Uses agent-specific settings from core-config.yaml context_engineering section:
- Agent type classifications and handoff rules
- Token limits and compression ratios for different agent types
- Quality thresholds and validation requirements
- Performance monitoring and success metrics 