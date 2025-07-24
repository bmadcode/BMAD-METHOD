# Incremental Story-to-Code Mapping

Additive caching system that builds story-to-code mappings incrementally upon each story completion, with option for full re-analysis when needed.

[[LLM: This lightweight task adds completed stories to cached mapping (50-100 tokens) vs full re-analysis (2000+ tokens)]]

## Incremental Mapping Process

### 1. **Post-Compilation Story Mapping Hook**

[[LLM: Automatically triggered by dev/qa agents after successful story compilation and completion]]

```bash
# Triggered after successful compilation by dev/qa agents (50-100 tokens)
STORY_FILE="$1"
STORY_ID=$(basename "$STORY_FILE" .story.md)
CACHE_FILE="tmp/story-code-mapping.json"

# Verify build success before mapping
BUILD_SUCCESS=$(dotnet build --verbosity quiet 2>&1)
if [ $? -ne 0 ]; then
  echo "❌ Build failed - skipping story mapping until compilation succeeds"
  exit 1
fi

echo "✅ Build successful - updating story-to-code mapping"

# Initialize cache if doesn't exist
if [ ! -f "$CACHE_FILE" ]; then
  echo '{"stories": {}, "last_updated": "'$(date -Iseconds)'", "version": "1.0"}' > "$CACHE_FILE"
fi

# Extract story implementation details
STORY_FILES=$(grep -A 20 "## File List" "$STORY_FILE" | grep -E "^\s*[-*]\s+" | sed 's/^\s*[-*]\s*//')
STORY_COMPONENTS=$(grep -A 10 "## Story" "$STORY_FILE" | grep -oE "[A-Z][a-zA-Z]*Service|[A-Z][a-zA-Z]*Controller|[A-Z][a-zA-Z]*Repository" | sort -u)
STORY_STATUS=$(grep "Status:" "$STORY_FILE" | cut -d: -f2 | xargs)

# Add to cache (JSON append)
jq --arg id "$STORY_ID" \
   --arg status "$STORY_STATUS" \
   --argjson files "$(echo "$STORY_FILES" | jq -R . | jq -s .)" \
   --argjson components "$(echo "$STORY_COMPONENTS" | jq -R . | jq -s .)" \
   --arg updated "$(date -Iseconds)" \
   '.stories[$id] = {
     "status": $status,
     "files": $files,
     "components": $components,
     "last_updated": $updated,
     "analysis_type": "incremental"
   } | .last_updated = $updated' "$CACHE_FILE" > tmp/story-cache-temp.json && mv tmp/story-cache-temp.json "$CACHE_FILE"

echo "✅ Story $STORY_ID added to mapping cache"
```

### 2. **Quick Cache Query** (10-20 tokens)

```bash
# Query existing mapping without re-analysis
STORY_ID="$1"
CACHE_FILE="tmp/story-code-mapping.json"

if [ -f "$CACHE_FILE" ] && jq -e ".stories[\"$STORY_ID\"]" "$CACHE_FILE" > /dev/null; then
  echo "📋 Cached mapping found for $STORY_ID"
  jq -r ".stories[\"$STORY_ID\"] | \"Status: \(.status)\nFiles: \(.files | join(\", \"))\nComponents: \(.components | join(\", \"))\"" "$CACHE_FILE"
else
  echo "❌ No cached mapping for $STORY_ID - run full analysis"
fi
```

### 3. **Gap Detection with Cache** (100-200 tokens)

```bash
# Compare cached story data with actual codebase
check_story_implementation() {
  local STORY_ID="$1"
  local CACHE_FILE="tmp/story-code-mapping.json"
  
  # Get cached file list
  EXPECTED_FILES=$(jq -r ".stories[\"$STORY_ID\"].files[]" "$CACHE_FILE" 2>/dev/null)
  
  # Quick file existence check
  MISSING_FILES=""
  EXISTING_FILES=""
  
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
  
  echo "📊 Gap Analysis for $STORY_ID:"
  echo "Files Expected: $TOTAL_FILES"
  echo "Files Missing: $MISSING_COUNT"
  echo "Gap Percentage: $GAP_PERCENTAGE%"
  
  if [ $GAP_PERCENTAGE -gt 20 ]; then
    echo "⚠️ Significant gaps detected - consider full re-analysis"
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

### **Full Analysis Command** (2000+ tokens when needed)
```bash
# Execute full story-to-code-audit.md when comprehensive analysis needed
if [ "$1" = "--full" ] || [ $GAP_PERCENTAGE -gt 20 ]; then
  echo "🔍 Executing comprehensive story-to-code analysis..."
  # Execute the full heavyweight task
  Read tool: bmad-core/tasks/story-to-code-audit.md
else
  echo "📋 Using cached incremental mapping (tokens saved: ~1900)"
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

### **Cache Maintenance** (20-30 tokens)
```bash
# Cleanup old cache entries and optimize
cleanup_cache() {
  local CACHE_FILE="tmp/story-code-mapping.json"
  local DAYS_OLD=30
  
  # Remove entries older than 30 days
  jq --arg cutoff "$(date -d "$DAYS_OLD days ago" -Iseconds)" '
    .stories |= with_entries(
      select(.value.last_updated > $cutoff)
    )' "$CACHE_FILE" > tmp/cache-clean.json && mv tmp/cache-clean.json "$CACHE_FILE"
  
  echo "🧹 Cache cleaned - removed entries older than $DAYS_OLD days"
}
```

## Integration Points

### **Dev/QA Agent Integration**
Add to both dev and qa agent completion workflows:

**Dev Agent Completion:**
```yaml
completion_workflow:
  - verify_all_tasks_complete
  - execute_build_validation
  - execute_incremental_story_mapping    # After successful build
  - reality_audit_final
  - mark_story_ready_for_review
```

**QA Agent Completion:**
```yaml  
completion_workflow:
  - execute_reality_audit
  - verify_build_success
  - execute_incremental_story_mapping    # After successful validation
  - mark_story_completed
  - git_push_if_eligible
```

### **QA Agent Commands**
```bash
*story-mapping          # Quick cached lookup (50 tokens)
*story-mapping --full   # Full analysis (2000+ tokens)
*story-gaps            # Gap detection using cache (200 tokens)
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
# After story completion - automatic
✅ Story 1.2.UserAuth added to mapping cache (75 tokens used)

# Quick lookup - manual
*story-mapping 1.2.UserAuth
📋 Cached mapping found (15 tokens used)

# Gap check - manual  
*story-gaps 1.2.UserAuth
📊 Gap Analysis: 5% missing - Implementation complete (120 tokens used)

# Full analysis when needed - manual
*story-mapping 1.2.UserAuth --full
🔍 Executing comprehensive analysis... (2,100 tokens used)
```

This provides **massive token savings** while maintaining full analysis capability when needed!