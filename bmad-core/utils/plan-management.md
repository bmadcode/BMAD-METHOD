# Plan Management Utility

## Purpose

Provides utilities for agents and tasks to interact with workflow plans, check progress, update status, and ensure workflow steps are executed in the appropriate sequence.

## Core Functions

### 1. Check Plan Existence

Check for workflow plan:

1. Look for docs/workflow-plan.md (default location)
2. Return plan status to user (exists/not exists) - if not exists then HALT.

### 2. Parse Plan Status

[[LLM: Extract current progress from the plan document]]

**Plan Parsing Logic:**

1. **Identify Step Structure**:
   - Look for checkbox lines: `- [ ]` or `- [x]`
   - Extract step IDs from comments: `<!-- step-id: X.Y -->`
   - Identify agent assignments: `<!-- agent: pm -->`

2. **Determine Current State**:
   - Last completed step (highest numbered `[x]`)
   - Next expected step (first `[ ]` after completed steps)
   - Overall progress percentage

3. **Extract Metadata**:
   - Workflow type from plan header
   - Decision points and their status
   - Any deviation notes

### 3. Sequence Validation

[[LLM: Check if requested action aligns with plan sequence]]

**Validation Rules:**

1. **Strict Mode** (enforceSequence: true):
   - Must complete steps in exact order
   - Warn and block if out of sequence
   - Require explicit override justification

2. **Flexible Mode** (enforceSequence: false):
   - Warn about sequence deviation
   - Allow with confirmation
   - Log deviation reason

**Warning Templates:**

```text
SEQUENCE WARNING: 
The workflow plan shows you should complete "{expected_step}" next.
You're attempting to: "{requested_action}"

In strict mode: Block and require plan update
In flexible mode: Allow with confirmation
```

### 4. Plan Update Operations

[[LLM: Provide consistent way to update plan progress]]

**Update Actions:**

1. **Mark Step Complete**:
   - Change `- [ ]` to `- [x]`
   - Add completion timestamp comment
   - Update any status metadata

2. **Add Deviation Note**:
   - Insert note explaining why sequence changed
   - Reference the deviation in plan

3. **Update Current Step Pointer**:
   - Add/move `<!-- current-step -->` marker
   - Update last-modified timestamp

### 5. Integration Instructions

[[LLM: How agents and tasks should use this utility]]

**For Agents (startup sequence)**:

```text
1. Check if plan exists using this utility
2. If exists:
   - Parse current status
   - Show user: "Active workflow plan detected. Current step: {X}"
   - Suggest: "Next recommended action: {next_step}"
3. Continue with normal startup
```

**For Tasks (pre-execution)**:

```text
1. Check if plan exists
2. If exists:
   - Verify this task aligns with plan
   - If not aligned:
     - In strict mode: Show warning and stop
     - In flexible mode: Show warning and ask for confirmation
3. After task completion:
   - Update plan if task was a planned step
   - Add note if task was unplanned
```

### 6. Plan Status Report Format

[[LLM: Standard format for showing plan status]]

```text
📋 Workflow Plan Status
━━━━━━━━━━━━━━━━━━━━
Workflow: {workflow_name}
Progress: {X}% complete ({completed}/{total} steps)

✅ Completed:
- {completed_step_1}
- {completed_step_2}

🔄 Current Step:
- {current_step_description}

📌 Upcoming:
- {next_step_1}
- {next_step_2}

⚠️ Notes:
- {any_deviations_or_notes}
```

### 7. Decision Point Handling

[[LLM: Special handling for workflow decision points]]

When encountering a decision point in the plan:

1. **Identify Decision Marker**: `<!-- decision: {decision_id} -->`
2. **Check Decision Status**: Made/Pending
3. **If Pending**: 
   - Block progress until decision made
   - Show options to user
   - Record decision when made
4. **If Made**: 
   - Verify current path aligns with decision
   - Warn if attempting alternate path

### 8. Plan Abandonment

[[LLM: Graceful handling when user wants to stop following plan]]

If user wants to abandon plan:

1. Confirm abandonment intent
2. Add abandonment note to plan
3. Mark plan as "Abandoned" in header
4. Stop plan checking for remainder of session
5. Suggest creating new plan if needed

## Usage Examples

### Example 1: Agent Startup Check

```text
BMad Master starting...

[Check for plan]
Found active workflow plan: brownfield-fullstack
Progress: 40% complete (4/10 steps)
Current step: Create PRD (pm agent)

Suggestion: Based on your plan, you should work with the PM agent next.
Use *agent pm to switch, or *plan-status to see full progress.
```

### Example 2: Task Sequence Warning

```text
User: *task create-next-story

[Plan check triggered]
⚠️ SEQUENCE WARNING: 
Your workflow plan indicates the PRD hasn't been created yet.
Creating stories before the PRD may lead to incomplete requirements.

Would you like to:
1. Continue anyway (will note deviation in plan)
2. Switch to creating PRD first (*agent pm)
3. View plan status (*plan-status)
```

### Example 3: Automatic Plan Update

```text
[After completing create-doc task for PRD]

✅ Plan Updated: Marked "Create PRD" as complete
📍 Next step: Create Architecture Document (architect agent)
```

## Implementation Notes

- This utility should be lightweight and fast
- Plan parsing should be resilient to format variations
- Always preserve user agency - warnings not blocks (unless strict mode)
- Plan updates should be atomic to prevent corruption
- Consider plan versioning for rollback capability

## Error Handling

- Missing plan: Return null, don't error
- Malformed plan: Warn but continue, treat as no plan
- Update failures: Log but don't block task completion
- Parse errors: Fallback to basic text search