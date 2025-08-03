# calculate-sprint-metrics

## Purpose
Calculate and display key sprint metrics to help the team understand velocity, throughput, and sprint health.

## Task Execution

### Step 1: Gather Time Period
Determine the current sprint timeframe (default: last 2 weeks)

### Step 2: Calculate Core Metrics

#### Stories Completed
Count stories with status 'completed' or 'done' in the sprint period:
```bash
completed=$(grep -l "status: completed\|status: done" .bmad/stories/*.yaml 2>/dev/null | wc -l)
```

#### Work In Progress (WIP)
Count all stories in active states:
```bash
wip=$(grep -l "status: in_progress\|status: code_review\|status: qa_testing" .bmad/stories/*.yaml 2>/dev/null | wc -l)
```

#### Blocked Items
Count blocked stories:
```bash
blocked=$(grep -l "blocked: true" .bmad/stories/*.yaml 2>/dev/null | wc -l)
```

#### Average Cycle Time
Calculate average time from 'in_progress' to 'done' (if timestamps available)

### Step 3: Calculate Epic Progress
For each epic, show completion percentage:
```bash
# Group stories by epic and calculate completion
epics=$(grep -h "^epic:" .bmad/stories/*.yaml 2>/dev/null | sort -u | sed 's/epic: //')
```

### Step 4: Display Metrics

Format output as a clear metrics dashboard:

```
📊 SPRINT METRICS
═════════════════

SPRINT: Current Sprint (Week 5-6)
Duration: Jan 29 - Feb 11, 2024

VELOCITY METRICS:
━━━━━━━━━━━━━━━━━
📈 Completed This Sprint: 5 stories
📊 Work in Progress: 7 stories
🎯 Sprint Goal Progress: 62% (5/8 stories)

FLOW METRICS:
━━━━━━━━━━━━
⏱️ Avg Cycle Time: 4.2 days
📉 Lead Time: 7.5 days
🔄 Throughput: 2.5 stories/week

HEALTH INDICATORS:
━━━━━━━━━━━━━━━━━━
✅ WIP Limit: 7/8 (Within limits)
⚠️ Blocked Items: 1
🔴 Failed QA: 1 (CART-002)
⏰ Aging Items: 2 (>3 days in same state)

EPIC PROGRESS:
━━━━━━━━━━━━━
User Authentication   [███████░░░] 70% (2/3 stories)
Shopping Cart        [████░░░░░░] 40% (0/2 complete)
Product Catalog      [██░░░░░░░░] 20% (0/2 complete)
Infrastructure       [██████████] 100% ✅

TEAM PERFORMANCE:
━━━━━━━━━━━━━━━━━
Developer Team:
  • Stories in Dev: 4
  • Avg Dev Time: 3.5 days
  • PR Approval Rate: 85%

QA Team:
  • Stories Tested: 3
  • Bugs Found: 5
  • Pass Rate: 66%

SPRINT BURNDOWN:
━━━━━━━━━━━━━━━━
Start: 8 stories
━━━━━━━━━━━━━━━━━━━━
Week 1: ████████░░ 6 remaining
Week 2: ████░░░░░░ 3 remaining
━━━━━━━━━━━━━━━━━━━━
Projected: 2 stories may spill

RECOMMENDATIONS:
━━━━━━━━━━━━━━━━
1. 🚨 Unblock PROD-002 (Elasticsearch) - Critical path
2. ⚠️ Address CART-002 QA failures - Data loss issue
3. 📝 Complete architecture review - Blocking stories
4. 🎯 Focus on completing in-progress work before starting new
```

### Step 5: Trend Analysis
Compare with previous sprint (if data available):

```
TREND vs LAST SPRINT:
━━━━━━━━━━━━━━━━━━━━
Velocity: ↑ +20% (4→5 stories)
Cycle Time: ↓ -15% (4.9→4.2 days)
Blocked Items: → Same (1)
Quality: ↓ -10% (More QA failures)
```

## Success Criteria
- Metrics calculate within 1 second
- All active stories included
- Percentages are accurate
- Trends identified when possible
- Actionable recommendations provided

## Data Sources
- Story files in `.bmad/stories/`
- Status field for state
- Timestamp fields for cycle time (if available)
- Epic field for grouping
- Blocked field for health

## Error Handling
- Missing timestamps: Show "N/A" for time metrics
- No stories: Show "No stories to analyze"
- Calculation errors: Show available metrics only

## Notes
- Focus on actionable metrics
- Keep calculations simple and fast
- Provide context for numbers
- Highlight concerns and successes
- This is read-only analysis