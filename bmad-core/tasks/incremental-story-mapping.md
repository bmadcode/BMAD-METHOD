# Incremental Story-to-Code Mapping

Additive caching system that builds story-to-code mappings incrementally upon each story completion, with option for full re-analysis when needed.

[[LLM: This lightweight task adds completed stories to cached mapping (50-100 tokens) vs full re-analysis (2000+ tokens)]]

## Incremental Mapping Process

### 1. **Environment-Adaptive Post-Compilation Story Mapping Hook**

[[LLM: Automatically triggered by dev/qa agents after successful story compilation and completion]]

**Environment Initialization:**
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

STORY_FILE="$1"
STORY_ID=$(basename "$STORY_FILE" .story.md)
CACHE_FILE="tmp/story-code-mapping.json"

echo "🗺️ Environment-Adaptive Story Mapping ($BMAD_PRIMARY_LANGUAGE)"
echo "Environment: $DETECTED_IDE | Tools: $([ "$USE_IDE_TOOLS" = "true" ] && echo "Native" || echo "CLI Batched")"
```

**Environment-Adaptive Build Verification:**
```bash
# Verify build success using detected language and environment
if [ "$USE_IDE_TOOLS" = "true" ]; then
  # IDE environments: Use Bash tool with clear description
  echo "Verifying build using native IDE integration"
  BUILD_RESULT=$($BMAD_BUILD_COMMAND 2>&1)
  BUILD_SUCCESS=$?
else
  # CLI environments: Use batched approach
  echo "Verifying build using CLI approach (may require approval)"
  BUILD_RESULT=$($BMAD_BUILD_COMMAND 2>&1)
  BUILD_SUCCESS=$?
fi

if [ $BUILD_SUCCESS -ne 0 ]; then
  echo "❌ Build failed - skipping story mapping until compilation succeeds"
  echo "Language: $BMAD_PRIMARY_LANGUAGE | Build Command: $BMAD_BUILD_COMMAND"
  exit 1
fi

echo "✅ Build successful - updating story-to-code mapping"
```

**Environment-Adaptive Story Analysis:**
```bash
# Initialize cache if doesn't exist
if [ ! -f "$CACHE_FILE" ]; then
  echo '{"stories": {}, "last_updated": "'$(date -Iseconds)'", "version": "1.0"}' > "$CACHE_FILE"
fi

# Extract story implementation details using environment-appropriate methods
if [ "$USE_IDE_TOOLS" = "true" ]; then
  # Use native IDE tools for analysis
  echo "Using native IDE tools for story analysis"
  # Would use Grep tool with appropriate parameters for file extraction
  # Would use Read tool for story content analysis
else
  # CLI batch mode
  echo "Using batched CLI commands for story analysis"
  STORY_FILES=$(grep -A 20 "## File List" "$STORY_FILE" | grep -E "^\s*[-*]\s+" | sed 's/^\s*[-*]\s*//')
  STORY_COMPONENTS=$(grep -A 10 "## Story" "$STORY_FILE" | grep -oE "$BMAD_COMPONENT_PATTERNS" | sort -u)
  STORY_STATUS=$(grep "Status:" "$STORY_FILE" | cut -d: -f2 | xargs)
fi

# Add to cache (JSON append) - universal across environments
jq --arg id "$STORY_ID" \
   --arg status "$STORY_STATUS" \
   --argjson files "$(echo "$STORY_FILES" | jq -R . | jq -s .)" \
   --argjson components "$(echo "$STORY_COMPONENTS" | jq -R . | jq -s .)" \
   --arg updated "$(date -Iseconds)" \
   --arg env "$DETECTED_IDE" \
   --arg lang "$BMAD_PRIMARY_LANGUAGE" \
   '.stories[$id] = {
     "status": $status,
     "files": $files,
     "components": $components,
     "last_updated": $updated,
     "analysis_type": "incremental",
     "environment": $env,
     "language": $lang
   } | .last_updated = $updated' "$CACHE_FILE" > tmp/story-cache-temp.json && mv tmp/story-cache-temp.json "$CACHE_FILE"

echo "✅ Story $STORY_ID added to mapping cache (Environment: $DETECTED_IDE)"
```

### 2. **Environment-Aware Quick Cache Query**

```bash
# Query existing mapping without re-analysis (universal across environments)
STORY_ID="$1"
CACHE_FILE="tmp/story-code-mapping.json"

if [ -f "$CACHE_FILE" ] && jq -e ".stories[\"$STORY_ID\"]" "$CACHE_FILE" > /dev/null; then
  echo "📋 Cached mapping found for $STORY_ID"
  
  # Display environment context from cache
  CACHE_ENV=$(jq -r ".stories[\"$STORY_ID\"].environment // \"unknown\"" "$CACHE_FILE")
  CACHE_LANG=$(jq -r ".stories[\"$STORY_ID\"].language // \"unknown\"" "$CACHE_FILE")
  
  echo "Original Analysis Environment: $CACHE_ENV | Language: $CACHE_LANG"
  
  jq -r ".stories[\"$STORY_ID\"] | \"Status: \(.status)\nFiles: \(.files | join(\", \"))\nComponents: \(.components | join(\", \"))\nLast Updated: \(.last_updated)\"" "$CACHE_FILE"
else
  echo "❌ No cached mapping for $STORY_ID - run full analysis"
  echo "Current Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
fi
```

### 3. **Environment-Adaptive Gap Detection with Cache**

```bash
# Compare cached story data with actual codebase using environment-appropriate tools
check_story_implementation() {
  local STORY_ID="$1"
  local CACHE_FILE="tmp/story-code-mapping.json"
  
  # Get cached file list
  EXPECTED_FILES=$(jq -r ".stories[\"$STORY_ID\"].files[]" "$CACHE_FILE" 2>/dev/null)
  
  # Environment-adaptive file existence check
  MISSING_FILES=""
  EXISTING_FILES=""
  
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    # IDE environments: Could use native file system tools
    echo "Using native IDE tools for file existence verification"
    # Would use LS tool or Read tool for file checking
  fi
  
  # Universal file check (works in all environments)
  while IFS= read -r file; do
    if [ -f "$file" ]; then
      EXISTING_FILES="$EXISTING_FILES\n✅ $file"
    else
      MISSING_FILES="$MISSING_FILES\n❌ $file"
    fi
  done <<< "$EXPECTED_FILES"
  
  # Calculate gap score
  TOTAL_FILES=$(echo "$EXPECTED_FILES" | wc -l)
  MISSING_COUNT=$(echo "$MISSING_FILES" | grep -c "❌" || echo 0)
  GAP_PERCENTAGE=$((MISSING_COUNT * 100 / TOTAL_FILES))
  
  echo "📊 Environment-Adaptive Gap Analysis for $STORY_ID:"
  echo "Analysis Environment: $DETECTED_IDE"
  echo "Project Language: $BMAD_PRIMARY_LANGUAGE"
  echo "Files Expected: $TOTAL_FILES"
  echo "Files Missing: $MISSING_COUNT"
  echo "Gap Percentage: $GAP_PERCENTAGE%"
  
  if [ $GAP_PERCENTAGE -gt 20 ]; then
    echo "⚠️ Significant gaps detected - consider full re-analysis"
    echo "Recommendation: Use comprehensive story-to-code audit in $DETECTED_IDE"
    return 1
  else
    echo "✅ Implementation appears complete"
    return 0
  fi
}
```

## Full Re-Analysis Option

### **When to Trigger Full Analysis**
- Gap percentage > 20%
- User explicitly requests via `*story-code-audit --full`
- Cache is older than 7 days
- Major refactoring detected

### **Environment-Adaptive Full Analysis Command** (2000+ tokens when needed)
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Execute comprehensive analysis using environment-appropriate method
if [ "$1" = "--full" ] || [ $GAP_PERCENTAGE -gt 20 ]; then
  echo "🔍 Executing comprehensive story-to-code analysis ($DETECTED_IDE environment)..."
  echo "Language: $BMAD_PRIMARY_LANGUAGE | Tools: $([ "$USE_IDE_TOOLS" = "true" ] && echo "Native" || echo "CLI Batched")"
  
  # Execute the full heavyweight task with environment context
  Read tool: bmad-core/tasks/story-to-code-audit.md
else
  echo "📋 Using cached incremental mapping (tokens saved: ~1900)"
  echo "Current Environment: $DETECTED_IDE | Cache Status: Valid"
fi
```

## Cache Management

### **Cache Structure**
```json
{
  "stories": {
    "story-1.1": {
      "status": "Completed",
      "files": ["src/UserService.cs", "tests/UserServiceTests.cs"],
      "components": ["UserService", "UserRepository"],
      "last_updated": "2025-01-23T10:30:00Z",
      "analysis_type": "incremental",
      "gap_score": 5
    }
  },
  "last_updated": "2025-01-23T10:30:00Z",
  "version": "1.0",
  "stats": {
    "total_stories": 15,
    "completed_stories": 12,
    "avg_gap_score": 8
  }
}
```

### **Environment-Adaptive Cache Maintenance** (20-30 tokens)
```bash
# Cleanup old cache entries and optimize with environment awareness
cleanup_cache() {
  local CACHE_FILE="tmp/story-code-mapping.json"
  local DAYS_OLD=30
  
  # Auto-initialize environment detection if needed
  if [ -z "$DETECTED_IDE" ]; then
    Read tool: bmad-core/tasks/lightweight-ide-detection.md
  fi
  
  # Remove entries older than 30 days, preserve environment metadata
  jq --arg cutoff "$(date -d "$DAYS_OLD days ago" -Iseconds)" \
     --arg current_env "$DETECTED_IDE" \
     --arg current_lang "$BMAD_PRIMARY_LANGUAGE" '
    .stories |= with_entries(
      select(.value.last_updated > $cutoff)
    ) | .maintenance_log += [{
      "date": now | todate,
      "action": "cache_cleanup",
      "environment": $current_env,
      "language": $current_lang,
      "entries_removed": (.stories | length)
    }]' "$CACHE_FILE" > tmp/cache-clean.json && mv tmp/cache-clean.json "$CACHE_FILE"
  
  echo "🧹 Cache cleaned - removed entries older than $DAYS_OLD days"
  echo "Maintenance Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
}
```

## Integration Points

### **Dev/QA Agent Integration**
Add to both dev and qa agent completion workflows:

**Environment-Adaptive Dev Agent Completion:**
```yaml
completion_workflow:
  - auto_detect_environment              # Initialize environment detection
  - verify_all_tasks_complete
  - execute_build_validation
  - execute_incremental_story_mapping    # After successful build with environment context
  - reality_audit_final
  - mark_story_ready_for_review
```

**Environment-Adaptive QA Agent Completion:**
```yaml  
completion_workflow:
  - auto_detect_environment              # Initialize environment detection
  - execute_reality_audit
  - verify_build_success
  - execute_incremental_story_mapping    # After successful validation with environment context
  - mark_story_completed
  - git_push_if_eligible
```

### **Environment-Adaptive QA Agent Commands**
```bash
*story-mapping          # Quick cached lookup (50 tokens) - Auto-adapts to current IDE
*story-mapping --full   # Full analysis (2000+ tokens) - Uses environment-appropriate tools
*story-gaps            # Gap detection using cache (200 tokens) - Native tools when available

# Environment context automatically included in all commands:
# - Uses Grep/Read/Glob tools in Claude Code CLI
# - Falls back to batched commands in traditional CLI
# - Preserves cached environment metadata for consistency
```

## Token Savings Analysis

| Operation | Cached Version | Full Version | Savings |
|-----------|---------------|--------------|---------|
| **Story Lookup** | 10-20 tokens | 2,000+ tokens | 99% |
| **Gap Detection** | 100-200 tokens | 2,000+ tokens | 90% |
| **Batch Analysis** | 500 tokens | 10,000+ tokens | 95% |
| **Session Total** | 1,000 tokens | 15,000+ tokens | 93% |

## Success Criteria

- [ ] Incremental updates on story completion (50-100 tokens)
- [ ] Quick cache queries (10-20 tokens)  
- [ ] Gap detection with cached data (100-200 tokens)
- [ ] Full re-analysis option when needed
- [ ] 90%+ token savings for routine queries
- [ ] Automatic cache maintenance and cleanup

## Usage Examples

```bash
# After story completion - automatic with environment detection
✅ Story 1.2.UserAuth added to mapping cache (75 tokens used)
🗺️ Environment: Claude Code CLI | Language: TypeScript | Tools: Native

# Quick lookup - manual with environment context
*story-mapping 1.2.UserAuth
📋 Cached mapping found (15 tokens used)
Original Analysis Environment: Claude Code CLI | Current: Claude Code CLI ✓

# Gap check - manual with adaptive tools
*story-gaps 1.2.UserAuth
📊 Gap Analysis: 5% missing - Implementation complete (120 tokens used)
Analysis Method: Native IDE tools | Environment: Claude Code CLI

# Full analysis when needed - manual with environment optimization
*story-mapping 1.2.UserAuth --full
🔍 Executing comprehensive analysis (Claude Code CLI environment)... (2,100 tokens used)
Using native Grep/Read/Glob tools for optimal performance
```

This provides **massive token savings** while maintaining full analysis capability when needed!