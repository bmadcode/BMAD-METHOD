# Context Handoff Template

## Context Transfer Overview

**From Agent**: {{source_agent}}  
**To Agent**: {{target_agent}}  
**Transfer Purpose**: {{context_transfer_purpose}}  
**Transfer Date**: {{transfer_date}}  
**Priority Level**: {{priority_level}}

---

## Core Context Summary

### Project Context
**Project Name**: {{project_name}}  
**Current Phase**: {{current_phase}}  
**Key Objectives**: {{key_objectives}}

### Technical Context
**Architecture**: {{technical_architecture}}  
**Technology Stack**: {{technology_stack}}  
**Dependencies**: {{key_dependencies}}

### Business Context
**Problem Statement**: {{problem_statement}}  
**Success Criteria**: {{success_criteria}}  
**Constraints**: {{known_constraints}}

---

## Detailed Context Package

### 1. Work Completed
{{completed_work_summary}}

[[LLM: Provide concise summary of completed work, focusing on deliverables and key decisions made]]

### 2. Current State
**Status**: {{current_status}}  
**Active Tasks**: {{active_tasks}}  
**Blocked Items**: {{blocked_items}}

[[LLM: Describe current project state with specific focus on what the receiving agent needs to understand]]

### 3. Next Actions Required
{{next_actions}}

[[LLM: List specific, actionable next steps that the receiving agent should prioritize]]

### 4. Key Decisions & Rationale
{{key_decisions}}

[[LLM: Document important decisions made and reasoning behind them to prevent re-work]]

### 5. Context Dependencies
**Files Referenced**: {{referenced_files}}  
**Templates Used**: {{templates_used}}  
**Checklists Applied**: {{checklists_applied}}

---

## Transfer Validation

### Pre-Transfer Checklist
- [ ] All critical context information captured
- [ ] Dependencies clearly documented  
- [ ] Next actions are specific and actionable
- [ ] Technical details are accurate
- [ ] Business context is complete

### Receiving Agent Confirmation
**Agent**: {{receiving_agent_name}}  
**Confirmation**: {{agent_confirmation}}  
**Questions**: {{clarification_questions}}

[[LLM: Generate specific questions for the receiving agent to confirm understanding]]

---

## Quality Assurance

### Context Completeness Score
**Technical Context**: {{technical_score}}/10  
**Business Context**: {{business_score}}/10  
**Process Context**: {{process_score}}/10  
**Overall Score**: {{overall_score}}/10

### Risk Assessment
**Low Risk**: {{low_risk_items}}  
**Medium Risk**: {{medium_risk_items}}  
**High Risk**: {{high_risk_items}}

[[LLM: Identify potential risks in context transfer and suggest mitigation strategies]]

---

## Error Handling

### Common Transfer Issues
1. **Incomplete Technical Context**
   - Missing architecture details
   - Unclear dependencies
   - Solution: {{technical_mitigation}}

2. **Business Context Gaps**
   - Unclear requirements
   - Missing stakeholder input
   - Solution: {{business_mitigation}}

3. **Process Continuity Breaks**
   - Lost workflow state
   - Missing checklist progress
   - Solution: {{process_mitigation}}

### Fallback Procedures
If context transfer fails:
1. {{fallback_step_1}}
2. {{fallback_step_2}}
3. {{fallback_step_3}}

[[LLM: Generate specific fallback steps based on the transfer context and receiving agent capabilities]]

---

## Transfer Completion

**Handoff Status**: {{handoff_status}}  
**Completion Time**: {{completion_timestamp}}  
**Follow-up Required**: {{followup_needed}}

**Source Agent Sign-off**: {{source_agent_signoff}}  
**Receiving Agent Sign-off**: {{receiving_agent_signoff}}

---

*This context handoff template ensures comprehensive knowledge transfer between BMAD agents while maintaining continuity and reducing context loss.* 