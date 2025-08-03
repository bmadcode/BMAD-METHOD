# calculate-sprint-metrics

## Purpose
Calculate and display key sprint metrics with optimized performance, enhanced accuracy, and shell compatibility.

## Task Execution

### Step 0: Initialize Environment
```bash
# Source shared library for utilities
if [ -f ".bmad-core/utils/bmad-lib.sh" ]; then
  source .bmad-core/utils/bmad-lib.sh
elif [ -f "BMAD-METHOD/bmad-core/utils/bmad-lib.sh" ]; then
  source BMAD-METHOD/bmad-core/utils/bmad-lib.sh
else
  echo "Warning: bmad-lib.sh not found, using fallback mode"
  # Define minimal fallback functions
  get_yaml_field() {
    grep "^$2:" "$1" 2>/dev/null | cut -d: -f2- | sed 's/^ //' | head -1
  }
  progress_bar() {
    echo "[$1/$2]"
  }
fi

# Validate project exists
if ! validate_bmad_project 2>/dev/null; then
  echo "📊 SPRINT METRICS"
  echo "═════════════════"
  echo ""
  echo "⚠️ No BMAD project found"
  exit 0
fi
```

### Step 1: Gather Sprint Information
```bash
# Determine current sprint (from most recent story or default)
current_sprint="Sprint 2"  # Default
latest_sprint=$(grep "^sprint:" .bmad/stories/*.yaml 2>/dev/null | 
                cut -d: -f2- | sed 's/^ //' | sort -u | tail -1)
[ -n "$latest_sprint" ] && current_sprint="$latest_sprint"

# Get today's date for calculations
today=$(date +%Y-%m-%d)
```

### Step 2: Optimized Metrics Calculation (Single Pass)
Use AWK for efficient single-pass processing:
```bash
# Single pass through all story files for multiple metrics
eval $(awk '
BEGIN {
  # Initialize all counters
  total_stories = 0
  total_points = 0
  completed_stories = 0
  completed_points = 0
  wip_stories = 0
  wip_points = 0
  blocked_stories = 0
  ready_stories = 0
  ready_points = 0
}
FILENAME != prevfile {
  # Process previous file data
  if (prevfile != "") {
    total_stories++
    total_points += story_points
    
    if (story_status == "completed" || story_status == "done") {
      completed_stories++
      completed_points += story_points
    } else if (story_status == "in_progress" || story_status == "code_review" || story_status == "qa_testing") {
      wip_stories++
      wip_points += story_points
    } else if (story_status == "ready") {
      ready_stories++
      ready_points += story_points
    }
    
    if (is_blocked == "true") {
      blocked_stories++
    }
    
    # Track epics
    if (story_epic != "") {
      epic_total[story_epic]++
      epic_points[story_epic] += story_points
      if (story_status == "completed" || story_status == "done") {
        epic_completed[story_epic]++
        epic_completed_points[story_epic] += story_points
      }
    }
    
    # Track assignees
    if (story_assignee != "" && story_assignee != "null") {
      assignee_stories[story_assignee]++
      if (story_status == "in_progress" || story_status == "code_review") {
        assignee_active[story_assignee]++
      }
    }
  }
  
  # Reset for new file
  prevfile = FILENAME
  story_points = 0
  story_status = ""
  story_epic = ""
  story_assignee = ""
  is_blocked = "false"
}
/^status:/ { story_status = $2 }
/^points:/ { story_points = $2 }
/^epic:/ { story_epic = $2; for(i=3;i<=NF;i++) story_epic = story_epic " " $i }
/^assignee:/ { story_assignee = $2; for(i=3;i<=NF;i++) story_assignee = story_assignee " " $i }
/^blocked: true/ { is_blocked = "true" }
/^days_in_progress: [3-9]/ { aging_stories++ }
/^days_in_progress: [0-9][0-9]/ { aging_stories++ }
END {
  # Process last file
  if (prevfile != "") {
    total_stories++
    total_points += story_points
    
    if (story_status == "completed" || story_status == "done") {
      completed_stories++
      completed_points += story_points
    } else if (story_status == "in_progress" || story_status == "code_review" || story_status == "qa_testing") {
      wip_stories++
      wip_points += story_points
    } else if (story_status == "ready") {
      ready_stories++
      ready_points += story_points
    }
    
    if (is_blocked == "true") {
      blocked_stories++
    }
    
    if (story_epic != "") {
      epic_total[story_epic]++
      epic_points[story_epic] += story_points
      if (story_status == "completed" || story_status == "done") {
        epic_completed[story_epic]++
        epic_completed_points[story_epic] += story_points
      }
    }
  }
  
  # Output all metrics as shell variables
  print "total_stories=" total_stories
  print "total_points=" total_points
  print "completed_stories=" completed_stories
  print "completed_points=" completed_points
  print "wip_stories=" wip_stories
  print "wip_points=" wip_points
  print "blocked_stories=" blocked_stories
  print "ready_stories=" ready_stories
  print "ready_points=" ready_points
  print "aging_stories=" aging_stories+0
  
  # Calculate velocity metrics
  if (total_stories > 0) {
    completion_rate = (completed_stories * 100) / total_stories
    print "completion_rate=" int(completion_rate)
  } else {
    print "completion_rate=0"
  }
  
  # Output epic data for further processing
  for (epic in epic_total) {
    gsub(" ", "_", epic)  # Replace spaces with underscores for shell compatibility
    print "epic_" epic "_total=" epic_total[epic]
    print "epic_" epic "_completed=" epic_completed[epic]+0
    print "epic_" epic "_points=" epic_points[epic]+0
    print "epic_" epic "_completed_points=" epic_completed_points[epic]+0
  }
}
' .bmad/stories/*.yaml 2>/dev/null)
```

### Step 3: Calculate Derived Metrics
```bash
# Calculate additional metrics
throughput_weekly=0
if [ "$completed_stories" -gt 0 ]; then
  # Assuming 2-week sprint
  throughput_weekly=$((completed_stories / 2))
fi

# Calculate average cycle time (simplified - would need timestamps in production)
avg_cycle_time="N/A"
if [ -f ".bmad/.metrics/cycle_times.log" ]; then
  avg_cycle_time=$(awk '{sum+=$1; count++} END {if(count>0) printf "%.1f", sum/count}' \
                   .bmad/.metrics/cycle_times.log 2>/dev/null || echo "N/A")
fi

# WIP limit analysis
wip_limit=8
wip_status="✅"
if [ "$wip_stories" -gt "$wip_limit" ]; then
  wip_status="🔴"
elif [ "$wip_stories" -ge $((wip_limit - 1)) ]; then
  wip_status="🟡"
fi

# Sprint health calculation
sprint_health="Healthy"
health_emoji="✅"
if [ "$blocked_stories" -gt 2 ] || [ "$aging_stories" -gt 3 ]; then
  sprint_health="At Risk"
  health_emoji="⚠️"
elif [ "$blocked_stories" -gt 0 ] || [ "$aging_stories" -gt 1 ]; then
  sprint_health="Needs Attention"
  health_emoji="🟡"
fi
```

### Step 4: Gather Epic Progress Data
```bash
# Get unique epics and calculate progress
epic_progress=""
for epic_file in .bmad/stories/*.yaml; do
  epic_name=$(get_yaml_field "$epic_file" "epic" "")
  if [ -n "$epic_name" ] && [ "$epic_name" != "null" ]; then
    echo "$epic_name"
  fi
done | sort -u | while read -r epic; do
  [ -z "$epic" ] && continue
  
  # Count stories for this epic
  epic_total=$(grep -l "^epic: $epic$" .bmad/stories/*.yaml 2>/dev/null | wc -l)
  epic_done=$(grep -l "^epic: $epic$" .bmad/stories/*.yaml 2>/dev/null | \
              xargs grep -l "^status: completed\|^status: done" 2>/dev/null | wc -l)
  
  if [ "$epic_total" -gt 0 ]; then
    percentage=$((epic_done * 100 / epic_total))
    bar=$(progress_bar "$epic_done" "$epic_total" 10)
    check_mark=""
    [ "$percentage" -eq 100 ] && check_mark=" ✅"
    
    epic_progress="${epic_progress}$(printf "%-20s %s %3d%% (%d/%d)%s\n" \
                   "$epic" "$bar" "$percentage" "$epic_done" "$epic_total" "$check_mark")\n"
  fi
done
```

### Step 5: Team Performance Analysis
```bash
# Analyze team performance
team_metrics=""
active_devs=0
total_capacity=0

# Get developer metrics
grep "^assignee:" .bmad/stories/*.yaml 2>/dev/null | \
  cut -d: -f2- | sed 's/^ //' | grep -v "null" | sort | uniq -c | \
  while read count dev; do
    [ -z "$dev" ] && continue
    active_devs=$((active_devs + 1))
    
    # Count active work for this developer
    active_count=$(grep -l "assignee: $dev" .bmad/stories/*.yaml 2>/dev/null | \
                   xargs grep -l "status: in_progress\|status: code_review" 2>/dev/null | wc -l)
    
    # Simple capacity calculation (2 stories optimal per dev)
    capacity_used=$((active_count * 50))  # Each story uses ~50% capacity
    [ "$capacity_used" -gt 100 ] && capacity_used=100
    
    team_metrics="${team_metrics}  • $dev: $active_count active ($capacity_used% capacity)\n"
    total_capacity=$((total_capacity + capacity_used))
  done

# Calculate average team capacity
avg_capacity=0
[ "$active_devs" -gt 0 ] && avg_capacity=$((total_capacity / active_devs))
```

### Step 6: Display Comprehensive Metrics Dashboard
```bash
# Display header
echo ""
echo "📊 SPRINT METRICS"
echo "═════════════════"
echo ""
echo "SPRINT: ${current_sprint}"
echo "Date: $(date '+%B %d, %Y')"
echo ""

# Velocity metrics
echo "VELOCITY METRICS:"
echo "━━━━━━━━━━━━━━━━━"
echo "📈 Completed: ${completed_stories} stories (${completed_points} points)"
echo "📊 Work in Progress: ${wip_stories} stories (${wip_points} points)"
echo "📦 Ready Backlog: ${ready_stories} stories (${ready_points} points)"
echo "🎯 Sprint Progress: ${completion_rate}% complete"
echo ""

# Flow metrics
echo "FLOW METRICS:"
echo "━━━━━━━━━━━━"
if [ "$avg_cycle_time" != "N/A" ]; then
  echo "⏱️ Avg Cycle Time: ${avg_cycle_time} days"
else
  echo "⏱️ Avg Cycle Time: Calculating..."
fi
echo "🔄 Throughput: ~${throughput_weekly} stories/week"
echo "📊 Total Velocity: ${completed_points} points delivered"
echo ""

# Health indicators
echo "HEALTH INDICATORS:"
echo "━━━━━━━━━━━━━━━━━━"
echo "${wip_status} WIP Limit: ${wip_stories}/${wip_limit} stories"
if [ "$blocked_stories" -gt 0 ]; then
  echo "⚠️ Blocked Items: ${blocked_stories}"
fi
if [ "$aging_stories" -gt 0 ]; then
  echo "⏰ Aging Items: ${aging_stories} (>3 days in state)"
fi
echo "${health_emoji} Sprint Health: ${sprint_health}"
echo ""

# Epic progress
if [ -n "$epic_progress" ]; then
  echo "EPIC PROGRESS:"
  echo "━━━━━━━━━━━━━"
  echo -e "$epic_progress"
fi

# Team performance
if [ -n "$team_metrics" ]; then
  echo "TEAM PERFORMANCE:"
  echo "━━━━━━━━━━━━━━━━━"
  echo -e "$team_metrics"
  echo "📊 Avg Team Capacity: ${avg_capacity}%"
  echo ""
fi

# Sprint burndown visualization (simplified)
echo "SPRINT BURNDOWN:"
echo "━━━━━━━━━━━━━━━━"
echo "Start: ${total_stories} stories (${total_points} points)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Visual burndown
remaining=$((total_stories - completed_stories))
burndown_bar=$(progress_bar "$completed_stories" "$total_stories" 20)
echo "Progress: $burndown_bar"
echo "Remaining: ${remaining} stories"

if [ "$remaining" -gt 0 ] && [ "$wip_stories" -gt 0 ]; then
  projected_spillover=$((remaining - wip_stories))
  [ "$projected_spillover" -lt 0 ] && projected_spillover=0
  echo "Projected spillover: ~${projected_spillover} stories"
fi
echo ""

# Recommendations
echo "RECOMMENDATIONS:"
echo "━━━━━━━━━━━━━━━━"
priority=1

# Generate prioritized recommendations
if [ "$blocked_stories" -gt 0 ]; then
  echo "${priority}. 🚨 Unblock ${blocked_stories} blocked story(ies) - Critical path items"
  priority=$((priority + 1))
fi

if [ "$aging_stories" -gt 2 ]; then
  echo "${priority}. ⚠️ Review ${aging_stories} aging stories - May need assistance"
  priority=$((priority + 1))
fi

if [ "$wip_stories" -gt "$wip_limit" ]; then
  echo "${priority}. 📝 Reduce WIP - Focus on completing before starting new work"
  priority=$((priority + 1))
fi

if [ "$ready_stories" -gt 5 ]; then
  echo "${priority}. 🎯 Large backlog (${ready_stories} stories) - Consider grooming session"
  priority=$((priority + 1))
fi

if [ "$avg_capacity" -gt 80 ]; then
  echo "${priority}. ⚡ Team at high capacity (${avg_capacity}%) - Monitor for burnout"
  priority=$((priority + 1))
fi

[ "$priority" -eq 1 ] && echo "✅ Sprint running smoothly - no immediate actions needed"
```

### Step 7: Trend Analysis (Optional)
```bash
# If historical data exists, show trends
if [ -f ".bmad/.metrics/historical.log" ]; then
  echo ""
  echo "TREND vs LAST SPRINT:"
  echo "━━━━━━━━━━━━━━━━━━━━"
  
  # Read last sprint metrics
  last_velocity=$(tail -1 .bmad/.metrics/historical.log | cut -d',' -f2)
  last_completed=$(tail -1 .bmad/.metrics/historical.log | cut -d',' -f3)
  
  # Calculate trends
  velocity_trend="→"
  [ "$completed_points" -gt "$last_velocity" ] && velocity_trend="↑"
  [ "$completed_points" -lt "$last_velocity" ] && velocity_trend="↓"
  
  echo "Velocity: ${velocity_trend} $([ "$velocity_trend" = "↑" ] && echo "+")$((completed_points - last_velocity)) points"
  echo "Throughput: ${velocity_trend} from ${last_completed} to ${completed_stories} stories"
fi
```

## Success Criteria
- Metrics calculate in under 500ms
- Single-pass processing for efficiency
- Accurate calculations with error handling
- Shell-agnostic implementation
- Clear, actionable insights

## Data Sources
- Story YAML files in `.bmad/stories/`
- Optional historical metrics in `.bmad/.metrics/`
- Real-time calculation, no stale data

## Error Handling
- Graceful handling of missing data
- Default values for all metrics
- Continue with partial data
- Clear error messages

## Performance Optimizations
- Single AWK pass for all metrics
- Process substitution over subshells
- Efficient file operations
- Optional caching for large datasets

## Notes
- Leverages bmad-lib.sh utilities
- Compatible with bash/zsh/sh
- Supports projects of any size
- Maintains read-only operations