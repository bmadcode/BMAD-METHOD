# Context-Aware Task Execution

Intelligent task selection that chooses lightweight vs comprehensive approaches based on story complexity, issue severity, and context indicators.

[[LLM: This meta-task routes to optimal task variants, saving 60-80% tokens by using lightweight tasks when appropriate]]

## Context Assessment Framework

### 1. **Story Complexity Analysis** (50-100 tokens)

```bash
# Rapid story complexity assessment for task routing
assess_story_complexity() {
  local STORY_FILE="$1"
  
  # Count complexity indicators
  TASK_COUNT=$(grep -c "^\s*- \[ \]" "$STORY_FILE" || echo 0)
  SUBTASK_COUNT=$(grep -c "^\s*- \[ \]" "$STORY_FILE" | xargs -I {} expr {} - $TASK_COUNT || echo 0)
  FILE_COUNT=$(grep -A 20 "## File List" "$STORY_FILE" | grep -c "^\s*[-*]" || echo 0)
  COMPONENT_COUNT=$(grep -A 10 "## Story" "$STORY_FILE" | grep -c -E "[A-Z][a-zA-Z]*Service|Controller|Repository" || echo 0)
  
  # Look for complexity keywords  
  COMPLEXITY_KEYWORDS=$(grep -c -i "refactor\|migrate\|restructure\|architectural\|integration\|complex" "$STORY_FILE" || echo 0)
  
  # Calculate complexity score
  COMPLEXITY_SCORE=0
  if [ $TASK_COUNT -gt 8 ]; then COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + 25)); fi
  if [ $FILE_COUNT -gt 10 ]; then COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + 20)); fi
  if [ $COMPONENT_COUNT -gt 5 ]; then COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + 15)); fi
  if [ $COMPLEXITY_KEYWORDS -gt 2 ]; then COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + 20)); fi
  
  echo "📊 Story Complexity Assessment:"
  echo "Tasks: $TASK_COUNT | Files: $FILE_COUNT | Components: $COMPONENT_COUNT"
  echo "Complexity Score: $COMPLEXITY_SCORE/100"
  
  if [ $COMPLEXITY_SCORE -lt 30 ]; then
    echo "🟢 SIMPLE - Use lightweight tasks"
    return 1
  elif [ $COMPLEXITY_SCORE -lt 60 ]; then
    echo "🟡 MODERATE - Use smart/targeted tasks"
    return 2
  else
    echo "🔴 COMPLEX - Use comprehensive tasks"
    return 3
  fi
}
```

### 2. **Issue Severity Detection** (50-100 tokens)

```bash
# Quick severity assessment for appropriate response
assess_issue_severity() {
  local ISSUE_DESCRIPTION="$1"
  
  # Check for severity indicators
  CRITICAL_PATTERNS="build.*fail|crash|exception|error.*count.*[1-9][0-9]|security|production"
  HIGH_PATTERNS="interface.*mismatch|architecture.*violation|regression|performance"
  MEDIUM_PATTERNS="simulation.*pattern|missing.*test|code.*quality"
  LOW_PATTERNS="formatting|documentation|naming|style"
  
  if echo "$ISSUE_DESCRIPTION" | grep -qi "$CRITICAL_PATTERNS"; then
    echo "🚨 CRITICAL - Use comprehensive analysis"
    return 4
  elif echo "$ISSUE_DESCRIPTION" | grep -qi "$HIGH_PATTERNS"; then
    echo "🔴 HIGH - Use smart analysis with escalation"
    return 3
  elif echo "$ISSUE_DESCRIPTION" | grep -qi "$MEDIUM_PATTERNS"; then
    echo "🟡 MEDIUM - Use targeted approach"
    return 2
  else
    echo "🟢 LOW - Use lightweight fixes"
    return 1
  fi
}
```

## Smart Task Routing

### 3. **Intelligent Task Selection** (100-150 tokens)

```bash
# Route to optimal task variant based on context
route_to_optimal_task() {
  local TASK_TYPE="$1"
  local STORY_FILE="$2"
  local CONTEXT_INFO="$3"
  
  # Assess context
  assess_story_complexity "$STORY_FILE"
  STORY_COMPLEXITY=$?
  
  assess_issue_severity "$CONTEXT_INFO"
  ISSUE_SEVERITY=$?
  
  # Determine optimal task variant
  case "$TASK_TYPE" in
    "reality-audit")
      if [ $STORY_COMPLEXITY -eq 1 ] && [ $ISSUE_SEVERITY -le 2 ]; then
        echo "🚀 Using lightweight-reality-audit.md (500 tokens vs 3000+)"
        Read tool: bmad-core/tasks/lightweight-reality-audit.md
      else
        echo "🔍 Using reality-audit-comprehensive.md (3000+ tokens)"
        Read tool: bmad-core/tasks/reality-audit-comprehensive.md
      fi
      ;;
      
    "build-context")
      if [ $ISSUE_SEVERITY -le 2 ]; then
        echo "🎯 Using smart-build-context.md (300-800 tokens vs 2000+)"
        Read tool: bmad-core/tasks/smart-build-context.md
      else
        echo "🔍 Using build-context-analysis.md (2000+ tokens)"
        Read tool: bmad-core/tasks/build-context-analysis.md
      fi
      ;;
      
    "story-audit")
      # Check if incremental cache exists
      if [ -f "tmp/story-code-mapping.json" ] && [ $STORY_COMPLEXITY -le 2 ]; then
        echo "📋 Using incremental-story-mapping.md (50-200 tokens vs 2000+)"
        Read tool: bmad-core/tasks/incremental-story-mapping.md
      else
        echo "🔍 Using story-to-code-audit.md (2000+ tokens)"
        Read tool: bmad-core/tasks/story-to-code-audit.md
      fi
      ;;
      
    "remediation")
      if [ $ISSUE_SEVERITY -le 2 ] && [ $STORY_COMPLEXITY -le 2 ]; then
        echo "🚀 Using tiered-remediation.md (300-800 tokens vs 1800+)"
        Read tool: bmad-core/tasks/tiered-remediation.md
      else
        echo "🔧 Using create-remediation-story.md (1800+ tokens)"
        Read tool: bmad-core/tasks/create-remediation-story.md
      fi
      ;;
  esac
}
```

## Context Caching System

### 4. **Context Cache Management** (50-100 tokens)

```bash
# Cache context assessments to avoid re-analysis
manage_context_cache() {
  local STORY_FILE="$1"
  local STORY_ID=$(basename "$STORY_FILE" .story.md)
  local CACHE_FILE="tmp/context-cache.json"
  
  # Check for existing assessment
  if [ -f "$CACHE_FILE" ]; then
    CACHED_COMPLEXITY=$(jq -r ".stories[\"$STORY_ID\"].complexity // \"unknown\"" "$CACHE_FILE")
    CACHE_AGE=$(jq -r ".stories[\"$STORY_ID\"].last_updated // \"1970-01-01\"" "$CACHE_FILE")
    
    # Use cache if less than 1 hour old
    if [ "$CACHED_COMPLEXITY" != "unknown" ] && [ "$(date -d "$CACHE_AGE" +%s)" -gt "$(date -d '1 hour ago' +%s)" ]; then
      echo "📋 Using cached complexity assessment: $CACHED_COMPLEXITY"
      echo "$CACHED_COMPLEXITY"
      return 0
    fi
  fi
  
  # Perform fresh assessment and cache
  assess_story_complexity "$STORY_FILE"
  COMPLEXITY_RESULT=$?
  
  # Update cache
  mkdir -p tmp
  if [ ! -f "$CACHE_FILE" ]; then
    echo '{"stories": {}}' > "$CACHE_FILE"
  fi
  
  jq --arg id "$STORY_ID" \
     --arg complexity "$COMPLEXITY_RESULT" \
     --arg updated "$(date -Iseconds)" \
     '.stories[$id] = {"complexity": $complexity, "last_updated": $updated}' \
     "$CACHE_FILE" > tmp/context-temp.json && mv tmp/context-temp.json "$CACHE_FILE"
  
  return $COMPLEXITY_RESULT
}
```

## Agent Integration

### 5. **Smart Command Wrappers**

```bash
# Enhanced agent commands that use context-aware routing

# Dev Agent Commands  
*smart-reality-audit() {
  route_to_optimal_task "reality-audit" "$1" "$2"
}

*smart-build-context() {
  route_to_optimal_task "build-context" "$1" "$2"  
}

# QA Agent Commands
*smart-story-audit() {
  route_to_optimal_task "story-audit" "$1" "$2"
}

*smart-remediation() {
  route_to_optimal_task "remediation" "$1" "$2"
}
```

### 6. **Automatic Context Detection**

```bash
# Auto-detect context from current development state
auto_detect_context() {
  local STORY_FILE="$1"
  
  # Recent build status
  BUILD_STATUS="unknown"
  if command -v dotnet >/dev/null 2>&1; then
    if dotnet build --verbosity quiet >/dev/null 2>&1; then
      BUILD_STATUS="passing"
    else
      BUILD_STATUS="failing"
    fi
  fi
  
  # Git status for change complexity
  GIT_CHANGES=$(git status --porcelain 2>/dev/null | wc -l || echo 0)
  
  # Recent commit activity
  RECENT_COMMITS=$(git log --oneline --since="1 day ago" 2>/dev/null | wc -l || echo 0)
  
  # Generate context summary
  CONTEXT_SUMMARY="build:$BUILD_STATUS,changes:$GIT_CHANGES,commits:$RECENT_COMMITS"
  
  echo "🔍 Auto-detected context: $CONTEXT_SUMMARY"
  echo "$CONTEXT_SUMMARY"
}
```

## Token Savings Analysis

### **Optimized Task Selection**

| Context | Old Approach | New Approach | Savings |
|---------|-------------|--------------|---------|
| **Simple Story + Low Issues** | 3,000 tokens | 500 tokens | 83% |
| **Simple Story + Medium Issues** | 3,000 tokens | 800 tokens | 73% |
| **Complex Story + High Issues** | 3,000 tokens | 3,000 tokens | 0% (appropriate) |
| **Mixed Complexity (Typical)** | 3,000 tokens | 1,200 tokens | 60% |

### **Expected Daily Savings**

**Typical Development Day:**
- **Simple contexts (50%)**: 5 × 500 = 2,500 tokens (vs 15,000)
- **Moderate contexts (30%)**: 3 × 1,200 = 3,600 tokens (vs 9,000)  
- **Complex contexts (20%)**: 2 × 3,000 = 6,000 tokens (vs 6,000)

**Total: 12,100 tokens vs 30,000 tokens = 60% savings**

## Integration Points

### **Dev Agent Enhancement**
```yaml
enhanced_commands:
  - "*smart-develop-story"      # Context-aware story development
  - "*smart-reality-audit"      # Adaptive quality auditing
  - "*smart-build-context"      # Intelligent build analysis
```

### **QA Agent Enhancement**  
```yaml
enhanced_commands:
  - "*smart-story-audit"        # Adaptive story-code analysis
  - "*smart-remediation"        # Tiered remediation approach
  - "*smart-validation"         # Context-aware validation
```

## Success Criteria

- [ ] Context assessment (50-100 tokens per story)
- [ ] Smart task routing based on complexity and severity
- [ ] 60-80% token savings for routine operations
- [ ] Maintains comprehensive analysis for complex scenarios
- [ ] Context caching to avoid repeated assessments
- [ ] Integration with all major BMAD tasks

This provides the **intelligent orchestration layer** that ensures optimal resource usage while maintaining quality standards across all complexity levels!