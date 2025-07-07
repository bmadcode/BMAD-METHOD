# Create Document from Template Task

## Purpose

Generate documents from templates by EXECUTING (not just reading) embedded instructions from the perspective of the selected agent persona.

## CRITICAL RULES

1. **Templates are PROGRAMS** - Execute every [[LLM:]] instruction exactly as written
2. **NEVER show markup** - Hide all [[LLM:]], {{placeholders}}, @{examples}, and template syntax
3. **STOP and EXECUTE** - When you see "apply tasks#" or "execute tasks#", STOP and run that task immediately
4. **WAIT for user input** - At review points and after elicitation tasks

## Execution Flow

### 0. Check Workflow Plan (if configured)

[[LLM: Check if plan tracking is enabled in core-config.yaml]]

- If `workflow.trackProgress: true`, check for active plan using {root}/utils/plan-management.md
- If plan exists and this document creation is part of the plan:
  - Verify this is the expected next step
  - If out of sequence and `enforceSequence: true`, warn user and halt without user override
  - If out of sequence and `enforceSequence: false`, ask for confirmation
- Continue with normal execution after plan check

### 1. Identify Template

- Load from `{root}/templates/*.md` or `{root}/templates directory`
- Agent-specific templates are listed in agent's dependencies
- If agent has `templates: [prd-tmpl, architecture-tmpl]` for example, then offer to create "PRD" and "Architecture" documents

### 2. Ask Interaction Mode

> 1. **Incremental** - Section by section with reviews
> 2. **YOLO Mode** - Complete draft then review (user can type `/yolo` anytime to switch)

### 3. Execute Template

- Replace {{placeholders}} with real content
- Execute [[LLM:]] instructions as you encounter them
- Process <<REPEAT>> loops and ^^CONDITIONS^^
- Use @{examples} for guidance but never output them

### 4. Key Execution Patterns

**When you see:** `[[LLM: Draft X and immediately execute {root}/tasks/advanced-elicitation.md]]`

- Draft the content
- Present it to user
- IMMEDIATELY execute the task
- Wait for completion before continuing

**When you see:** `[[LLM: After section completion, apply {root}/tasks/Y.md]]`

- Finish the section
- STOP and execute the task
- Wait for user input

### 5. Validation & Final Presentation

- Run any specified checklists
- Present clean, formatted content only
- No truncation or summarization
- Begin directly with content (no preamble)
- Include any handoff prompts from template

### 6. Update Workflow Plan (if applicable)

[[LLM: After successful document creation]]

- If plan tracking is enabled and document was part of plan:
  - Call update-workflow-plan task to mark step complete
  - Parameters: task: create-doc, step_id: {from plan}, status: complete
  - Show next recommended step from plan

## Common Mistakes to Avoid

❌ Skipping elicitation tasks
❌ Showing template markup to users
❌ Continuing past STOP signals
❌ Combining multiple review points

✅ Execute ALL instructions in sequence
✅ Present only clean, formatted content
✅ Stop at every elicitation point
✅ Wait for user confirmation when instructed

## Remember

Templates contain precise instructions for a reason. Follow them exactly to ensure document quality and completeness.
