# show-sprint-board

## Purpose
Display the current sprint's Kanban board showing all stories and their states in a clear, visual format.

## Task Execution

### Step 1: Gather Project Context
First, identify the project structure:
- Check for `.bmad/` directory
- Locate stories in `.bmad/stories/`
- Find documents in `.bmad/documents/`

### Step 2: Analyze Document Status
Check the status of planning documents:
```bash
# Check for key documents
documents="project-brief prd architecture ux-spec"
for doc in $documents; do
  if [ -f ".bmad/documents/${doc}.md" ] || [ -f ".bmad/documents/${doc}.yaml" ]; then
    # Document exists - check if it has status in YAML header
    echo "$doc: found"
  fi
done
```

### Step 3: Count Stories by Status
Group stories by their current status:
```bash
# Extract status from all story files
statuses=$(grep -h "^status:" .bmad/stories/*.yaml 2>/dev/null | sed 's/status: //')

# Count each status
draft=$(echo "$statuses" | grep -c "draft")
ready=$(echo "$statuses" | grep -c "ready")
in_progress=$(echo "$statuses" | grep -c "in_progress")
code_review=$(echo "$statuses" | grep -c "code_review")
qa_testing=$(echo "$statuses" | grep -c "qa_testing")
done=$(echo "$statuses" | grep -c "completed\|done")
```

### Step 4: Identify Active Work
Find stories currently being worked on:
```bash
# Find in-progress stories with assignees
active_stories=$(grep -l "status: in_progress" .bmad/stories/*.yaml 2>/dev/null)
```

### Step 5: Check for Blocked Items
Identify any blocked stories:
```bash
blocked=$(grep -l "blocked: true" .bmad/stories/*.yaml 2>/dev/null)
```

### Step 6: Display the Board

Format the output as a clear Kanban board:

```
📋 SPRINT BOARD - [Project Name]
═══════════════════════════════════════

PLANNING DOCUMENTS:
✓ Brief   ✓ PRD   → Architecture   ○ UX Spec
         (v2.1)    (in review)    (not started)

STORY PIPELINE:
┌──────────┬────────┬────────────┬──────────┬─────────┬──────┐
│ Backlog  │ Ready  │ In Progress│ Review   │ Testing │ Done │
├──────────┼────────┼────────────┼──────────┼─────────┼──────┤
│    3     │   2    │     4      │    1     │    1    │  5   │
└──────────┴────────┴────────────┴──────────┴─────────┴──────┘

CURRENT SPRINT FOCUS:
━━━━━━━━━━━━━━━━━━━━
🔄 IN PROGRESS (4):
  • AUTH-002: Social login - Maria Garcia (2 days)
  • CART-002: Cart persistence - Michael Chen (1 day)
  • PROD-001: Product catalog API - Sarah Johnson (3 days)
  • PROD-002: Search implementation - Lisa Park (1 day)

👀 IN REVIEW (1):
  • AUTH-003: Multi-factor auth - PR #245 (1 approval)

🧪 IN TESTING (1):
  • CART-001: Shopping cart service - QA: David Kim (80% complete)

🚫 BLOCKED (1):
  • PROD-002: Waiting for Elasticsearch cluster (2 days)

SPRINT HEALTH:
━━━━━━━━━━━━━
• Total WIP: 7 items (Suggested max: 8) ✅
• Blocked: 1 item ⚠️
• Aging items: 1 (PROD-001 > 3 days) ⚠️
• Sprint velocity: On track 🎯
```

### Step 7: Provide Quick Insights

Add a brief summary of key observations:

```
KEY OBSERVATIONS:
• Development has high WIP (4 items) - monitor for context switching
• 1 blocker needs escalation (Elasticsearch cluster)
• Architecture review may block future stories
• Good progress on authentication epic (2/3 complete)
```

## Success Criteria
- Board displays within 2 seconds
- All stories are accounted for
- Status groupings are accurate
- Blocked items are highlighted
- Output is clear and readable

## Error Handling
- If no `.bmad/` directory: "No BMAD project found in current directory"
- If no stories found: "No stories created yet. Use *draft to create first story"
- If file read errors: Continue with available data, note any issues

## Notes
- Keep visualization simple and text-based for universal compatibility
- Focus on current sprint, not historical data
- This is a read-only view - no modifications to files
- Update frequency: Run on demand, no caching needed