# Lightweight Reality Audit

Quick simulation detection and quality assessment for routine story validation, with escalation to comprehensive audit when issues detected.

[[LLM: This micro-audit uses 300-500 tokens vs 3000+ tokens for full comprehensive audit]]

## Quick Reality Check Process

### 1. **Fast Simulation Detection** (200-300 tokens)

```bash
# Language-adaptive simulation pattern scan
STORY_FILE="$1"

echo "🔍 Quick Reality Audit for $(basename "$STORY_FILE")"

# Auto-initialize language environment if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

echo "🔍 Quick Reality Audit for $(basename "$STORY_FILE") ($BMAD_PRIMARY_LANGUAGE)"

# Get file list from story  
FILES=$(grep -A 20 "## File List" "$STORY_FILE" | grep -E "^\s*[-*]\s+" | sed 's/^\s*[-*]\s*//' | head -10)

# Language-specific simulation scan
SIMULATION_COUNT=0
SIMULATION_FILES=""

while IFS= read -r file; do
  if [ -f "$file" ]; then
    MATCHES=$(grep -c -E "$BMAD_SIMULATION_PATTERNS" "$file" 2>/dev/null || echo 0)
    if [ $MATCHES -gt 0 ]; then
      SIMULATION_COUNT=$((SIMULATION_COUNT + MATCHES))
      SIMULATION_FILES="$SIMULATION_FILES\n❌ $file ($MATCHES patterns)"
    fi
  fi
done <<< "$FILES"

# Language-adaptive build test
BUILD_RESULT=$($BMAD_BUILD_COMMAND 2>&1)
BUILD_SUCCESS=$?
BUILD_ERROR_COUNT=$(echo "$BUILD_RESULT" | grep -c -E "$BMAD_ERROR_PATTERNS" || echo 0)

# Calculate language-adaptive quick score
TOTAL_FILES=$(echo "$FILES" | wc -l)
if [ $SIMULATION_COUNT -eq 0 ] && [ $BUILD_SUCCESS -eq 0 ]; then
  QUICK_SCORE=85  # Good baseline
elif [ $SIMULATION_COUNT -lt 3 ] && [ $BUILD_SUCCESS -eq 0 ]; then
  QUICK_SCORE=70  # Acceptable
else
  QUICK_SCORE=45  # Needs comprehensive audit
fi

echo "📊 Quick Audit Results:"
echo "Simulation Patterns: $SIMULATION_COUNT"
echo "Build Errors: $BUILD_RESULT"  
echo "Quick Score: $QUICK_SCORE/100"

# Decision logic
if [ $QUICK_SCORE -ge 80 ]; then
  echo "✅ PASS - Story appears to meet reality standards"
  echo "💡 Tokens saved: ~2500 (skipped comprehensive audit)"
  exit 0
elif [ $QUICK_SCORE -ge 60 ]; then
  echo "⚠️ REVIEW - Minor issues detected, manageable"
  echo "🔧 Quick fixes available"
  exit 1
else
  echo "🚨 ESCALATE - Significant issues require comprehensive audit"
  echo "➡️ Triggering full reality-audit-comprehensive.md"
  exit 2
fi
```

### 2. **Quick Fix Suggestions** (100-200 tokens)

```bash
# Environment-adaptive remediation for common patterns
suggest_quick_fixes() {
  local SIMULATION_COUNT="$1"
  
  if [ $SIMULATION_COUNT -gt 0 ] && [ $SIMULATION_COUNT -lt 5 ]; then
    echo "🔧 Environment-Adaptive Quick Fix Suggestions:"
    echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
    echo ""
    
    # Language-specific fix suggestions using auto-detected patterns
    case "$BMAD_PRIMARY_LANGUAGE" in
      "csharp")
        echo "1. Replace Random.NextDouble() with actual data processing"
        echo "2. Replace Task.FromResult() with real async operations"
        echo "3. Complete NotImplementedException methods with business logic"
        echo "4. Remove Mock/Fake implementations with real services"
        ;;
      "javascript"|"typescript")
        echo "1. Replace Math.random() with actual data sources"
        echo "2. Replace Promise.resolve() with real async operations"
        echo "3. Complete TODO items with actual implementations"
        echo "4. Remove jest.fn() mocks from production code"
        ;;
      "python")
        echo "1. Replace random.random() with real data processing"
        echo "2. Complete TODO items with actual functionality"
        echo "3. Remove mock objects from production paths"
        echo "4. Implement real error handling instead of pass statements"
        ;;
      *)
        echo "1. Replace simulation patterns identified in scan"
        echo "2. Complete TODO/HACK comments with real implementations"
        echo "3. Remove mock/stub code from production paths"
        echo "4. Implement actual business logic"
        ;;
    esac
    
    echo ""
    echo "💡 Estimated fix time: 15-30 minutes"
    echo "💻 IDE Support: $DETECTED_IDE can assist with navigation and refactoring"
    echo "📋 No new story needed - direct fixes recommended"
    echo "🔄 Re-run *quick-audit after fixes to validate improvements"
  fi
}
```

## Escalation Logic

### **When to Use Comprehensive Audit**
- Quick score < 60
- User explicitly requests via `*reality-audit --full`
- Story marked as "complex" or "high-risk"
- Previous quick audits failed

### **Environment-Adaptive Smart Escalation**
```bash
# Automatic escalation to comprehensive audit (works across all environments)
if [ $QUICK_SCORE -lt 60 ]; then
  echo "🔄 Escalating to comprehensive reality audit..."
  echo "Environment: $DETECTED_IDE will use optimal analysis tools"
  echo "Language: $BMAD_PRIMARY_LANGUAGE patterns will be analyzed thoroughly"
  
  # The comprehensive audit will also use environment detection automatically
  Read tool: bmad-core/tasks/reality-audit-comprehensive.md
  exit $?
fi
```

## Pattern-Specific Quick Checks

### **Common Anti-Patterns** (100-150 tokens each)
```bash
# Environment-adaptive pattern detection
check_mock_implementations() {
  local FILES="$1"
  
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    # Use native IDE tools (Grep tool would be used here)
    echo "# Would use Grep tool with pattern: Mock|Fake|Stub"
  else
    # CLI batch mode
    echo "$FILES" | xargs grep -l "Mock\|Fake\|Stub" 2>/dev/null | head -3
  fi
}

check_simulation_code() {
  local FILES="$1"
  
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    # Use language-specific patterns from auto-detection
    echo "# Would use Grep tool with pattern: $BMAD_SIMULATION_PATTERNS"
  else
    # CLI batch mode with language-specific patterns
    echo "$FILES" | xargs grep -l -E "$BMAD_SIMULATION_PATTERNS" 2>/dev/null | head -3
  fi
}

check_incomplete_implementations() {
  local FILES="$1"
  
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    # Use native IDE tools
    echo "# Would use Grep tool with pattern: TODO|HACK|NotImplementedException"
  else
    # CLI batch mode
    echo "$FILES" | xargs grep -l "TODO\|HACK\|NotImplementedException" 2>/dev/null | head -3
  fi
}
```

## Integration with Story Completion

### **Story Completion Hook**
```bash
# Add to dev agent completion workflow
completion_check() {
  local STORY_FILE="$1"
  
  # Quick reality audit first (300-500 tokens)
  AUDIT_RESULT=$(bash bmad-core/tasks/lightweight-reality-audit.md "$STORY_FILE")
  
  case $? in
    0) echo "✅ Story ready for review" ;;
    1) echo "⚠️ Minor fixes needed before completion" ;;
    2) echo "🚨 Comprehensive audit required" ;;
  esac
}
```

## QA Agent Commands

### **New Lightweight Commands**
```bash
*quick-audit           # Lightweight reality check (300-500 tokens)
*quick-audit --fix     # Include fix suggestions (500-700 tokens) 
*reality-audit         # Full comprehensive audit (3000+ tokens)
*reality-audit --full  # Force comprehensive audit
```

## Token Usage Comparison

| Audit Type | Token Cost | Use Case | Success Rate |
|------------|------------|----------|-------------|
| **Quick Audit** | 300-500 | Routine checks | 80% pass |
| **Quick + Fixes** | 500-700 | Minor issues | 70% sufficient |
| **Comprehensive** | 3,000+ | Complex issues | 100% coverage |
| **Smart Hybrid** | 500-3,500 | Adaptive | 85% optimal |

## Expected Token Savings

### **Scenario Analysis**
- **10 stories/day**: 
  - Old: 10 × 3,000 = 30,000 tokens
  - New: 8 × 500 + 2 × 3,000 = 10,000 tokens  
  - **Savings: 67%**

- **Simple stories (80% of cases)**:
  - Old: 3,000 tokens each  
  - New: 500 tokens each
  - **Savings: 83%**

## Success Criteria

- [ ] Quick simulation detection (300-500 tokens)
- [ ] Accurate pass/fail decisions (80%+ accuracy)
- [ ] Smart escalation to comprehensive audit
- [ ] 60-80% token savings for routine audits
- [ ] Integration with story completion workflow
- [ ] Maintain quality standards while reducing cost

This provides **massive efficiency gains** while preserving the comprehensive audit capability when truly needed!