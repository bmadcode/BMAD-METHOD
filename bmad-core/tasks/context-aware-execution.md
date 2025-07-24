# Context-Aware Task Execution

Intelligent task selection that chooses lightweight vs comprehensive approaches based on story complexity, issue severity, and context indicators.

[[LLM: This meta-task routes to optimal task variants, saving 60-80% tokens by using lightweight tasks when appropriate]]

## Context Assessment Framework

### 1. **Environment-Adaptive Story Complexity Analysis** (50-100 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Rapid story complexity assessment for task routing using environment-appropriate tools
assess_story_complexity() {
  local STORY_FILE="$1"
  
  echo "📊 Environment-Adaptive Complexity Analysis:"
  echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
  
  # Count complexity indicators using environment-appropriate methods
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    # Use native IDE tools for pattern analysis
    echo "Using native IDE tools for complexity assessment"
    # Would use Grep tool with appropriate patterns for task detection
    # Would use Read tool for story content analysis
  fi
  
  # Universal complexity analysis (works in all environments)
  TASK_COUNT=$(grep -c "^\s*- \[ \]" "$STORY_FILE" || echo 0)
  SUBTASK_COUNT=$(grep -c "^\s*- \[ \]" "$STORY_FILE" | xargs -I {} expr {} - $TASK_COUNT || echo 0)
  FILE_COUNT=$(grep -A 20 "## File List" "$STORY_FILE" | grep -c "^\s*[-*]" || echo 0)
  
  # Language-specific component patterns from auto-detection
  COMPONENT_PATTERNS=$(echo "$BMAD_COMPONENT_PATTERNS" | tr ',' '|')
  COMPONENT_COUNT=$(grep -A 10 "## Story" "$STORY_FILE" | grep -c -E "$COMPONENT_PATTERNS" || echo 0)
  
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

### 2. **Environment-Adaptive Issue Severity Detection** (50-100 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_SIMULATION_PATTERNS" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

# Quick severity assessment for appropriate response using language-specific patterns
assess_issue_severity() {
  local ISSUE_DESCRIPTION="$1"
  
  echo "🔍 Environment-Adaptive Severity Assessment:"
  echo "Language: $BMAD_PRIMARY_LANGUAGE | Environment: $DETECTED_IDE"
  
  # Use language-specific severity patterns from auto-detection
  CRITICAL_PATTERNS="build.*fail|crash|exception|error.*count.*[1-9][0-9]|security|production"
  HIGH_PATTERNS="interface.*mismatch|architecture.*violation|regression|performance"
  MEDIUM_PATTERNS="$(echo "$BMAD_SIMULATION_PATTERNS" | tr ',' '|')|missing.*test|code.*quality"
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

### 3. **Environment-Adaptive Intelligent Task Selection** (100-150 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$DETECTED_IDE" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Route to optimal task variant based on context using environment-appropriate methods
route_to_optimal_task() {
  local TASK_TYPE="$1"
  local STORY_FILE="$2"
  local CONTEXT_INFO="$3"
  
  echo "🎯 Environment-Adaptive Task Routing:"
  echo "Environment: $DETECTED_IDE | Target Task: $TASK_TYPE"
  
  # Assess context using environment-aware analysis
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

### 4. **Environment-Adaptive Context Cache Management** (50-100 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$DETECTED_IDE" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Cache context assessments to avoid re-analysis with environment context
manage_context_cache() {
  local STORY_FILE="$1"
  local STORY_ID=$(basename "$STORY_FILE" .story.md)
  local CACHE_FILE="tmp/context-cache.json"
  
  echo "💾 Environment-Adaptive Cache Management:"
  echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
  
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
  
  # Update cache with environment context
  mkdir -p tmp
  if [ ! -f "$CACHE_FILE" ]; then
    echo '{"stories": {}, "environment_info": {}}' > "$CACHE_FILE"
  fi
  
  jq --arg id "$STORY_ID" \
     --arg complexity "$COMPLEXITY_RESULT" \
     --arg updated "$(date -Iseconds)" \
     --arg env "$DETECTED_IDE" \
     --arg lang "$BMAD_PRIMARY_LANGUAGE" \
     '.stories[$id] = {
       "complexity": $complexity, 
       "last_updated": $updated,
       "environment": $env,
       "language": $lang
     } | .environment_info = {
       "last_detected_ide": $env,
       "last_detected_language": $lang,
       "cache_updated": $updated
     }' \
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

### 6. **Environment-Adaptive Automatic Context Detection**

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_BUILD_COMMAND" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Auto-detect context from current development state using environment-appropriate methods
auto_detect_context() {
  local STORY_FILE="$1"
  
  echo "🔍 Environment-Adaptive Context Detection:"
  echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
  
  # Recent build status using detected build command
  BUILD_STATUS="unknown"
  if [ -n "$BMAD_BUILD_COMMAND" ]; then
    if [ "$USE_IDE_TOOLS" = "true" ]; then
      echo "Using native IDE integration for build status"
      # Would use Bash tool with clear description for build command
    fi
    
    # Universal build check (works in all environments)
    if $BMAD_BUILD_COMMAND --help >/dev/null 2>&1; then
      if $BMAD_BUILD_COMMAND >/dev/null 2>&1; then
        BUILD_STATUS="passing"
      else
        BUILD_STATUS="failing"
      fi
    fi
  fi
  
  # Git status for change complexity using environment-appropriate methods
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    echo "Using native IDE integration for git analysis"
    # Would use appropriate IDE-specific git tools
  fi
  
  # Universal git analysis (works in all environments)
  GIT_CHANGES=$(git status --porcelain 2>/dev/null | wc -l || echo 0)
  RECENT_COMMITS=$(git log --oneline --since="1 day ago" 2>/dev/null | wc -l || echo 0)
  
  # Generate context summary with environment information
  CONTEXT_SUMMARY="env:$DETECTED_IDE,lang:$BMAD_PRIMARY_LANGUAGE,build:$BUILD_STATUS,changes:$GIT_CHANGES,commits:$RECENT_COMMITS"
  
  echo "🔍 Auto-detected context: $CONTEXT_SUMMARY"
  echo "Environment-adaptive context detection completed"
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