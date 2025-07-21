# Task Execution Validation Checklist

**Purpose:** Ensure bmad agents execute configured task files rather than falling back to generic tools, preventing automation workflow failures.

**Instructions:** Use this checklist before executing any command that maps to a specific task file to ensure proper file resolution and workflow execution.

---

## Pre-Execution Validation

### File Resolution Verification
- [ ] **Command maps to specific task file:** Verify command has corresponding .bmad-core/tasks/{task-name}.md file
- [ ] **Task file exists:** Confirm the actual task file is accessible in the bmad-core structure  
- [ ] **Correct file path:** Use exact path .bmad-core/tasks/{task-name}.md (not relative paths)
- [ ] **File permissions:** Ensure task file can be read by agent

### Tool Selection Validation
- [ ] **Use Read tool (NOT Task tool):** For configured commands, always use Read tool to load actual task file
- [ ] **No generic Task tool:** Avoid generic Task tool when specific task files exist
- [ ] **No improvisation:** Do not create custom prompts when task files are configured
- [ ] **Follow dependencies:** Use exact task names listed in agent dependencies section

## During Execution Verification

### Workflow Compliance
- [ ] **Load actual task file:** Use Read tool to load the complete task file content
- [ ] **Follow defined phases:** Execute all phases/steps defined in the task file
- [ ] **Apply automation behaviors:** Execute any automation triggers defined in agent configuration
- [ ] **Use task-specific logic:** Follow task file logic, not generic analysis patterns

### Output Validation
- [ ] **Task file execution confirmed:** Tool output shows task file name, not generic "Task"
- [ ] **Phases documented:** Output shows specific phases from the actual task file
- [ ] **Scores calculated:** If task includes scoring, numerical scores should be present
- [ ] **Automation triggered:** If conditions met, automation behaviors should execute

## Post-Execution Verification

### Results Validation
- [ ] **Expected output format:** Results match the format defined in the task file
- [ ] **Automation actions executed:** If triggered, auto-remediation/escalation actions completed
- [ ] **File updates completed:** Any required file updates (story files, reports) performed
- [ ] **Workflow completion:** All task file requirements satisfied

### Failure Detection
- [ ] **No generic analysis:** Results are not generic recommendations but task-specific outcomes
- [ ] **No manual fallback:** Agent did not fall back to manual analysis when automation was configured
- [ ] **No tool bypass:** Agent did not bypass configured task execution with generic tools
- [ ] **No incomplete workflows:** All automation behaviors were attempted if conditions were met

---

## Common Failure Patterns to Avoid

### ❌ Incorrect Execution Patterns

**Generic Task Tool Usage:**
```
● Task(Description of work)
Manual analysis and recommendations...
```

**Missing File Resolution:**
```
Command maps to reality-audit-comprehensive.md
But agent uses Task tool with custom prompt
```

**Incomplete Automation:**
```
Conditions met for auto-remediation
But only manual recommendations provided
```

### ✅ Correct Execution Patterns

**Proper Task File Execution:**
```
● reality-audit-comprehensive  
Phase 1: Pre-Audit Investigation ✅
Phase 2: Simulation Pattern Detection ✅
...
Composite Reality Score: 65% ❌
AUTO-REMEDIATION TRIGGERED
```

**File Resolution Success:**
```
Read(.bmad-core/tasks/reality-audit-comprehensive.md)
Following defined workflow from task file...
Automation behaviors applied...
```

---

## Agent-Specific Validation

### Developer Agent Commands
- `*reality-audit` → Read bmad-core/tasks/reality-audit-comprehensive.md
- `*build-context` → Read bmad-core/tasks/build-context-analysis.md  
- `*escalate` → Read bmad-core/tasks/loop-detection-escalation.md

### QA Agent Commands
- `*reality-audit` → Read bmad-core/tasks/reality-audit-comprehensive.md
- `*audit-validation` → Read bmad-core/tasks/reality-audit-comprehensive.md
- `*create-remediation` → Read bmad-core/tasks/create-remediation-story.md
- `*escalate` → Read bmad-core/tasks/loop-detection-escalation.md

### Universal Commands
- `*create-doc` → Read bmad-core/tasks/create-doc.md
- All agents should use Read tool for their configured dependencies

---

## Troubleshooting File Resolution Issues

### If Task File Not Found
1. **Verify file path:** Check .bmad-core/tasks/{task-name}.md exists
2. **Check dependencies:** Confirm task listed in agent dependencies section
3. **Use absolute path:** Specify complete path if relative path fails
4. **Escalate if persistent:** Use loop-detection-escalation if repeated failures

### If Automation Not Triggering
1. **Confirm task file execution:** Ensure Read tool was used, not Task tool
2. **Verify automation config:** Check agent automation_behavior settings
3. **Validate conditions:** Ensure trigger conditions are actually met
4. **Check task file logic:** Verify task file contains automation triggers

### If Generic Analysis Provided
1. **Stop and restart:** Do not accept generic analysis for configured commands
2. **Force file execution:** Explicitly use Read tool on specific task file
3. **Follow task workflow:** Execute phases defined in actual task file
4. **Apply agent automation:** Use automation_behavior settings from agent config

---

**This checklist ensures agents execute their configured workflows consistently, preventing the automation bypass issues that cause quality framework failures.**