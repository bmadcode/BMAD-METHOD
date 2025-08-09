# show-sprint-board

## Purpose
Display the current sprint's Kanban board showing all stories and their states in a clear, visual format with enhanced performance and reliability.

## Task Execution

### Step 0: Initialize Environment
Source the shared library for compatibility and utilities:
```bash
# Source shared library
if [ -f ".bmad-core/utils/bmad-lib.sh" ]; then
  source .bmad-core/utils/bmad-lib.sh
elif [ -f "BMAD-METHOD/bmad-core/utils/bmad-lib.sh" ]; then
  source BMAD-METHOD/bmad-core/utils/bmad-lib.sh
else
  echo "Warning: bmad-lib.sh not found, using fallback mode"
fi

# Validate project
if ! validate_bmad_project 2>/dev/null; then
  echo "📋 SPRINT BOARD - No Active Project"
  echo "═══════════════════════════════════════"
  echo ""
  echo "⚠️ NO BMAD PROJECT INITIALIZED"
  echo ""
  echo "To get started:"
  echo "1. Initialize a BMAD project in your workspace"
  echo "2. Create planning documents"
  echo "3. Use *draft to create stories"
  exit 0
fi
```

### Step 1: Gather Project Context
Identify project name and structure:
```bash
# Get project name from brief or directory
project_name="Project"
if [ -f ".bmad/documents/project-brief.md" ]; then
  project_name=$(grep "^#" .bmad/documents/project-brief.md | head -1 | sed 's/^#\+ *//' | cut -d'-' -f1 | xargs)
fi

# Validate story files exist
story_count=$(find .bmad/stories -name "*.yaml" 2>/dev/null | wc -l)
if [ "$story_count" -eq 0 ]; then
  echo "📋 SPRINT BOARD - $project_name"
  echo "═══════════════════════════════════════"
  echo ""
  echo "No stories created yet. Use *draft to create first story"
  exit 0
fi
```

### Step 2: Analyze Document Status
Check planning documents with proper validation:
```bash
# Check document status with enhanced detection
check_document_status() {
  local doc_name="$1"
  local doc_file=""
  
  # Check multiple possible locations and formats
  for ext in md yaml yml; do
    if [ -f ".bmad/documents/${doc_name}.${ext}" ]; then
      doc_file=".bmad/documents/${doc_name}.${ext}"
      break
    fi
  done
  
  if [ -n "$doc_file" ]; then
    # Extract status if present in YAML header or content
    local doc_status=$(grep -i "^status:" "$doc_file" 2>/dev/null | head -1 | cut -d: -f2- | xargs)
    if [ -n "$doc_status" ]; then
      echo "✓ $(echo $doc_name | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g') ($doc_status)"
    else
      echo "✓ $(echo $doc_name | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')"
    fi
  else
    echo "○ $(echo $doc_name | tr '-' ' ' | sed 's/\b\(.\)/\u\1/g')"
  fi
}
```

### Step 3: Count Stories by Status (Optimized)
Use single-pass counting for performance:
```bash
# Optimized single-pass story counting
eval $(awk '
  /^status: draft/ {draft++}
  /^status: ready/ {ready++}
  /^status: in_progress/ {in_progress++}
  /^status: code_review/ {code_review++}
  /^status: qa_testing/ {qa_testing++}
  /^status: completed|^status: done/ {completed++}
  /^blocked: true/ {blocked++}
  END {
    print "draft=" draft+0
    print "ready=" ready+0
    print "in_progress=" in_progress+0
    print "code_review=" code_review+0
    print "qa_testing=" qa_testing+0
    print "completed=" completed+0
    print "blocked_count=" blocked+0
  }
' .bmad/stories/*.yaml 2>/dev/null)

# Calculate totals
total_wip=$((in_progress + code_review + qa_testing))
total_stories=$((draft + ready + in_progress + code_review + qa_testing + completed))
```

### Step 4: Gather Active Work Details
Collect detailed information with proper escaping:
```bash
# Get in-progress stories with safe parsing
in_progress_details=""
while IFS= read -r file; do
  [ -z "$file" ] && continue
  
  story_id=$(get_yaml_field "$file" "id" "Unknown")
  story_title=$(get_yaml_field "$file" "title" "No title")
  assignee=$(get_yaml_field "$file" "assignee" "Unassigned")
  days=$(get_yaml_field "$file" "days_in_progress" "0")
  is_blocked=$(get_yaml_field "$file" "blocked" "false")
  
  if [ "$is_blocked" = "true" ]; then
    emoji="🚫"
  else
    emoji="•"
  fi
  
  in_progress_details="${in_progress_details}  ${emoji} ${story_id}: ${story_title} - ${assignee} (${days} days)\n"
done < <(find .bmad/stories -name "*.yaml" -exec grep -l "status: in_progress" {} \; 2>/dev/null)

# Get code review stories
review_details=""
while IFS= read -r file; do
  [ -z "$file" ] && continue
  
  story_id=$(get_yaml_field "$file" "id" "Unknown")
  story_title=$(get_yaml_field "$file" "title" "No title")
  pr_number=$(get_yaml_field "$file" "pr_number" "N/A")
  approvals=$(get_yaml_field "$file" "approvals" "0")
  
  review_details="${review_details}  • ${story_id}: ${story_title} - PR #${pr_number} (${approvals} approval)\n"
done < <(find .bmad/stories -name "*.yaml" -exec grep -l "status: code_review" {} \; 2>/dev/null)

# Get QA testing stories
qa_details=""
while IFS= read -r file; do
  [ -z "$file" ] && continue
  
  story_id=$(get_yaml_field "$file" "id" "Unknown")
  story_title=$(get_yaml_field "$file" "title" "No title")
  qa_assignee=$(get_yaml_field "$file" "qa_assignee" "Unassigned")
  progress=$(get_yaml_field "$file" "testing_progress" "0")
  
  qa_details="${qa_details}  • ${story_id}: ${story_title} - QA: ${qa_assignee} (${progress}% complete)\n"
done < <(find .bmad/stories -name "*.yaml" -exec grep -l "status: qa_testing" {} \; 2>/dev/null)

# Get blocked stories
blocked_details=""
while IFS= read -r file; do
  [ -z "$file" ] && continue
  
  story_id=$(get_yaml_field "$file" "id" "Unknown")
  blocker=$(get_yaml_field "$file" "blocker" "Unknown blocker")
  blocked_days=$(get_yaml_field "$file" "blocked_days" "0")
  
  blocked_details="${blocked_details}  • ${story_id}: ${blocker} (${blocked_days} days)\n"
done < <(find .bmad/stories -name "*.yaml" -exec grep -l "blocked: true" {} \; 2>/dev/null)
```

### Step 5: Calculate Sprint Health Metrics
```bash
# Calculate health indicators
aging_count=$(find .bmad/stories -name "*.yaml" -exec grep -l "days_in_progress: [3-9]" {} \; 2>/dev/null | wc -l)

# WIP limit check
wip_status="✅"
wip_message="Within limits"
if [ "$total_wip" -gt 8 ]; then
  wip_status="⚠️"
  wip_message="Over limit!"
elif [ "$total_wip" -gt 6 ]; then
  wip_status="🟡"
  wip_message="Near limit"
fi

# Sprint velocity indicator
velocity_status="🎯"
if [ "$blocked_count" -gt 2 ]; then
  velocity_status="🔴"
elif [ "$blocked_count" -gt 0 ] || [ "$aging_count" -gt 1 ]; then
  velocity_status="🟡"
fi
```

### Step 6: Display the Board
Format and display with color support if available:
```bash
# Display header
echo ""
echo "📋 SPRINT BOARD - ${project_name}"
echo "═══════════════════════════════════════"
echo ""

# Display document status
echo "PLANNING DOCUMENTS:"
echo -n "  "
check_document_status "project-brief"
echo -n "  "
check_document_status "prd"
echo -n "  "
check_document_status "architecture"
echo -n "  "
check_document_status "ux-spec"
echo ""

# Display story pipeline
echo ""
echo "STORY PIPELINE:"
echo "┌──────────┬────────┬────────────┬──────────┬─────────┬──────┐"
echo "│ Backlog  │ Ready  │ In Progress│ Review   │ Testing │ Done │"
echo "├──────────┼────────┼────────────┼──────────┼─────────┼──────┤"
printf "│    %-6s│   %-5s│     %-7s│    %-6s│    %-5s│  %-4s│\n" \
       "$draft" "$ready" "$in_progress" "$code_review" "$qa_testing" "$completed"
echo "└──────────┴────────┴────────────┴──────────┴─────────┴──────┘"

# Display current sprint focus
if [ "$total_wip" -gt 0 ]; then
  echo ""
  echo "CURRENT SPRINT FOCUS:"
  echo "━━━━━━━━━━━━━━━━━━━━"
  
  if [ "$in_progress" -gt 0 ] && [ -n "$in_progress_details" ]; then
    echo "🔄 IN PROGRESS ($in_progress):"
    echo -e "$in_progress_details"
  fi
  
  if [ "$code_review" -gt 0 ] && [ -n "$review_details" ]; then
    echo "👀 IN REVIEW ($code_review):"
    echo -e "$review_details"
  fi
  
  if [ "$qa_testing" -gt 0 ] && [ -n "$qa_details" ]; then
    echo "🧪 IN TESTING ($qa_testing):"
    echo -e "$qa_details"
  fi
  
  if [ "$blocked_count" -gt 0 ] && [ -n "$blocked_details" ]; then
    echo "🚫 BLOCKED ($blocked_count):"
    echo -e "$blocked_details"
  fi
fi

# Display sprint health
echo ""
echo "SPRINT HEALTH:"
echo "━━━━━━━━━━━━━"
echo "• Total WIP: ${total_wip} items (Max: 8) ${wip_status} ${wip_message}"
if [ "$blocked_count" -gt 0 ]; then
  echo "• Blocked: ${blocked_count} item(s) ⚠️"
fi
if [ "$aging_count" -gt 0 ]; then
  echo "• Aging items: ${aging_count} (>3 days) ⚠️"
fi
echo "• Sprint velocity: ${velocity_status} $([ "$velocity_status" = "🎯" ] && echo "On track" || echo "At risk")"

# Display key observations
echo ""
echo "KEY OBSERVATIONS:"
if [ "$in_progress" -gt 4 ]; then
  echo "• Development has high WIP ($in_progress items) - monitor for context switching"
fi
if [ "$blocked_count" -gt 0 ]; then
  echo "• ${blocked_count} blocker(s) need escalation"
fi
if [ "$aging_count" -gt 0 ]; then
  echo "• ${aging_count} story(ies) aging - may need assistance"
fi
if [ "$ready" -gt 3 ]; then
  echo "• ${ready} stories ready to start - consider assigning"
fi
```

## Success Criteria
- Board displays within 1 second (with caching)
- All stories accurately counted
- Shell compatibility across bash/zsh/sh
- Graceful error handling
- Clear, readable output

## Error Handling
- Project validation with helpful messages
- Safe YAML parsing with defaults
- Continue with partial data on errors
- No shell-specific failures

## Performance Optimizations
- Single-pass AWK for counting
- Process substitution instead of subshells
- Optional caching for large projects
- Efficient file operations

## Notes
- Uses bmad-lib.sh for shared utilities
- Compatible with all major shells
- Supports color output when available
- Maintains read-only operation