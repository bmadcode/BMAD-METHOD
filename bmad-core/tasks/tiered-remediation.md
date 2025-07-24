# Tiered Remediation System

Intelligent remediation that provides lightweight quick fixes for simple issues and comprehensive remediation stories for complex problems.

[[LLM: This tiered system uses 300-800 tokens for simple fixes vs 1500-2000+ tokens for full remediation stories]]

## Remediation Tiers

### **Tier 1: Environment-Adaptive Quick Fixes** (300-500 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Immediate fixes for common, simple issues using environment-appropriate tools
provide_quick_fixes() {
  local ISSUE_TYPE="$1"
  local ISSUE_DESCRIPTION="$2"
  
  echo "🚀 Tier 1: Quick Fix Available ($DETECTED_IDE environment)"
  echo "Language: $BMAD_PRIMARY_LANGUAGE | Tools: $([ "$USE_IDE_TOOLS" = "true" ] && echo "Native" || echo "CLI Batched")"
  
  case "$ISSUE_TYPE" in
    "simulation_patterns")
      echo "🎯 Simulation Pattern Quick Fixes:"
      echo "• Replace Random.NextDouble() with actual business calculation"
      echo "• Change Task.FromResult() to real async operation"
      echo "• Remove TODO/HACK comments and implement logic"
      echo "• Replace hardcoded values with configuration"
      echo ""
      echo "⏱️ Estimated time: 5-15 minutes"
      echo "📋 Action: Direct implementation - no story needed"
      ;;
    "missing_tests")
      echo "🧪 Missing Test Quick Fixes:"
      echo "• Add basic unit tests for new methods"
      echo "• Copy/adapt existing similar test patterns"
      echo "• Use test templates for standard CRUD operations"
      echo "• Focus on happy path scenarios first"
      echo ""
      echo "⏱️ Estimated time: 10-20 minutes"
      echo "📋 Action: Add tests directly to current story"
      ;;
    "minor_violations")
      echo "📏 Code Standard Quick Fixes:"
      echo "• Fix naming convention violations"
      echo "• Add missing XML documentation"
      echo "• Remove unused using statements"
      echo "• Apply consistent formatting"
      echo ""
      echo "⏱️ Estimated time: 5-10 minutes"
      echo "📋 Action: Apply fixes immediately"
      ;;
  esac
}
```

### **Tier 2: Environment-Adaptive Guided Fixes** (500-800 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Structured guidance for moderate complexity issues using environment-appropriate methods
provide_guided_fixes() {
  local ISSUE_TYPE="$1"
  local COMPLEXITY_SCORE="$2"
  
  echo "⚖️ Tier 2: Guided Fix Approach ($DETECTED_IDE environment)"
  echo "Language: $BMAD_PRIMARY_LANGUAGE | Complexity: $COMPLEXITY_SCORE"
  
  case "$ISSUE_TYPE" in
    "interface_mismatches")
      echo "🔌 Interface Implementation Guidance:"
      echo ""
      echo "🔍 Step 1: Analyze Interface Contract"
      echo "• Review interface definition and expected signatures"
      echo "• Check async/sync patterns required"
      echo "• Identify missing or incorrect method implementations"
      echo ""
      echo "🔧 Step 2: Update Implementation"
      echo "• Implement missing interface members"
      echo "• Fix method signature mismatches"
      echo "• Ensure return types match interface"
      echo ""
      echo "✅ Step 3: Validate Integration"
      echo "• Run tests to verify interface compliance"
      echo "• Check calling code still works correctly"
      echo "• Validate dependency injection still functions"
      echo ""
      echo "⏱️ Estimated time: 20-40 minutes"
      echo "📋 Action: Follow guided steps within current story"
      ;;
    "architectural_violations")
      echo "🏗️ Architecture Compliance Guidance:"
      echo ""
      echo "📐 Step 1: Identify Violation Pattern"
      echo "• Check against established architectural patterns"
      echo "• Review similar implementations for consistency"
      echo "• Understand intended separation of concerns"
      echo ""
      echo "🔄 Step 2: Refactor to Compliance"
      echo "• Move business logic to appropriate layer"
      echo "• Extract services or repositories as needed"
      echo "• Apply dependency injection patterns"
      echo ""
      echo "🧪 Step 3: Test Architectural Changes"
      echo "• Verify all tests still pass"
      echo "• Check integration points work correctly"
      echo "• Validate performance hasn't degraded"
      echo ""
      echo "⏱️ Estimated time: 30-60 minutes"
      echo "📋 Action: Refactor within current story scope"
      ;;
  esac
}
```

### **Tier 3: Environment-Adaptive Full Remediation Stories** (1500-2000+ tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Complex issues requiring dedicated remediation stories with environment context
create_remediation_story() {
  local ISSUE_TYPE="$1"
  local ORIGINAL_STORY="$2"
  local COMPLEXITY_SCORE="$3"
  
  echo "🚨 Tier 3: Full Remediation Story Required ($DETECTED_IDE environment)"
  echo "Language: $BMAD_PRIMARY_LANGUAGE | Complexity Score: $COMPLEXITY_SCORE (>70 threshold met)"
  echo "Environment Tools: $([ "$USE_IDE_TOOLS" = "true" ] && echo "Native IDE integration" || echo "CLI batch mode")"
  echo ""
  
  # Execute comprehensive remediation story creation
  echo "🔄 Creating dedicated remediation story..."
  Read tool: bmad-core/tasks/create-remediation-story.md
  
  echo "📋 Remediation story generated with:"
  echo "• Root cause analysis"
  echo "• Regression prevention measures"  
  echo "• Step-by-step implementation plan"
  echo "• Comprehensive testing strategy"
  echo "• Integration validation checklist"
}
```

## Smart Triage Logic

### **Environment-Adaptive Issue Classification** (100-200 tokens)

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Intelligent issue assessment and tier assignment using environment-appropriate analysis
classify_remediation_need() {
  local AUDIT_RESULTS="$1"
  
  echo "📊 Environment-Adaptive Issue Classification:"
  echo "Analysis Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
  
  # Extract key metrics using environment-appropriate methods
  if [ "$USE_IDE_TOOLS" = "true" ]; then
    # Use native IDE tools for pattern analysis
    echo "Using native IDE tools for issue pattern detection"
    # Would use Grep tool with appropriate patterns for simulation detection
    # Would use Read tool for audit results analysis
  fi
  
  # Universal metric extraction (works in all environments)
  SIMULATION_COUNT=$(echo "$AUDIT_RESULTS" | grep -c "simulation pattern" || echo 0)
  MISSING_TESTS=$(echo "$AUDIT_RESULTS" | grep -c "missing test" || echo 0)
  INTERFACE_ERRORS=$(echo "$AUDIT_RESULTS" | grep -c "interface mismatch" || echo 0)
  ARCHITECTURE_VIOLATIONS=$(echo "$AUDIT_RESULTS" | grep -c "architectural violation" || echo 0)
  BUILD_ERRORS=$(echo "$AUDIT_RESULTS" | grep -c "build error" || echo 0)
  
  # Calculate complexity score
  COMPLEXITY_SCORE=0
  COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + SIMULATION_COUNT * 5))
  COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + MISSING_TESTS * 3))
  COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + INTERFACE_ERRORS * 10))
  COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + ARCHITECTURE_VIOLATIONS * 15))
  COMPLEXITY_SCORE=$((COMPLEXITY_SCORE + BUILD_ERRORS * 8))
  
  echo "📊 Remediation Complexity Assessment:"
  echo "Simulation Patterns: $SIMULATION_COUNT"
  echo "Missing Tests: $MISSING_TESTS"  
  echo "Interface Errors: $INTERFACE_ERRORS"
  echo "Architecture Violations: $ARCHITECTURE_VIOLATIONS"
  echo "Build Errors: $BUILD_ERRORS"
  echo "Complexity Score: $COMPLEXITY_SCORE"
  
  # Tier assignment logic
  if [ $COMPLEXITY_SCORE -le 20 ]; then
    echo "🚀 TIER 1 - Quick fixes sufficient"
    return 1
  elif [ $COMPLEXITY_SCORE -le 50 ]; then
    echo "⚖️ TIER 2 - Guided fixes recommended"
    return 2
  else
    echo "🚨 TIER 3 - Full remediation story required"
    return 3
  fi
}
```

## Integration with Quality Framework

### **Environment-Adaptive Auto-Triage After Reality Audit**

```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

# Automatic remediation routing based on audit results with environment optimization
auto_remediation_triage() {
  local STORY_FILE="$1"
  local AUDIT_RESULTS="$2"
  
  echo "🔄 Environment-Adaptive Auto-Triage:"
  echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
  
  # Classify remediation needs using environment-aware analysis
  classify_remediation_need "$AUDIT_RESULTS"
  TIER_LEVEL=$?
  
  case $TIER_LEVEL in
    1)
      echo "🚀 Applying Tier 1 quick fixes..."
      provide_quick_fixes "simulation_patterns" "$AUDIT_RESULTS"
      echo "💡 Tokens used: ~400 (quick fixes provided)"
      ;;
    2)
      echo "⚖️ Providing Tier 2 guided fixes..."
      provide_guided_fixes "interface_mismatches" "$COMPLEXITY_SCORE"
      echo "💡 Tokens used: ~700 (guided approach provided)"
      ;;
    3)
      echo "🚨 Creating Tier 3 remediation story..."
      create_remediation_story "complex_issues" "$STORY_FILE" "$COMPLEXITY_SCORE"
      echo "💡 Tokens used: ~1800 (full remediation story created)"
      ;;
  esac
}
```

### **Environment-Adaptive QA Agent Commands**

```bash
*quick-fix              # Tier 1 - immediate fixes (300-500 tokens) - Auto-adapts to current IDE
*guided-fix             # Tier 2 - guided approach (500-800 tokens) - Uses environment-appropriate tools  
*create-remediation     # Tier 3 - full story (1500-2000+ tokens) - Environment context included
*auto-triage           # Smart triage based on complexity (100-2000 tokens) - Universal IDE compatibility

# Environment context automatically included in all commands:
# - Uses Grep/Read/Glob tools in Claude Code CLI for pattern detection
# - Falls back to batched commands in traditional CLI environments
# - Preserves language-specific remediation patterns from auto-detection
# - Optimizes token usage based on IDE capabilities
```

## Token Usage Optimization

### **Tier Distribution Analysis**
Based on typical quality audit results:

| Tier | Percentage | Token Cost | Use Case |
|------|------------|------------|----------|
| **Tier 1** | 60% | 300-500 | Simple simulation patterns, minor violations |
| **Tier 2** | 25% | 500-800 | Interface mismatches, moderate architecture issues |
| **Tier 3** | 15% | 1,500-2,000 | Complex architectural problems, major refactoring |

### **Expected Token Savings**

**Previous Approach (Always Full Remediation):**
- 10 issues/day × 1,800 tokens = 18,000 tokens/day

**New Tiered Approach:**
- Tier 1: 6 × 400 = 2,400 tokens
- Tier 2: 2.5 × 650 = 1,625 tokens  
- Tier 3: 1.5 × 1,800 = 2,700 tokens
- **Total: 6,725 tokens/day**

**Savings: 63%** while maintaining quality and comprehensive coverage when needed

## Integration Points

### **Dev Agent Integration**
```yaml
quality_issue_workflow:
  - execute_reality_audit
  - auto_remediation_triage     # Smart tier assignment
  - apply_appropriate_fixes     # Tier-specific approach
  - validate_resolution         # Confirm issue resolved
```

### **QA Agent Integration**  
```yaml
remediation_workflow:
  - assess_issue_complexity     # Determine appropriate tier
  - provide_tiered_solution     # Apply tier-specific remediation
  - track_resolution_success    # Monitor effectiveness
```

## Success Criteria

- [ ] Smart triage classification (100-200 tokens)
- [ ] Tier 1 quick fixes for 60% of issues (300-500 tokens each)
- [ ] Tier 2 guided fixes for 25% of issues (500-800 tokens each)
- [ ] Tier 3 full stories for 15% of complex issues (1500-2000+ tokens each)
- [ ] 60-70% overall token savings compared to always using full remediation
- [ ] Maintains quality standards across all tiers
- [ ] Integration with existing quality framework

This provides **intelligent remediation scaling** that matches solution complexity to issue complexity, maximizing efficiency while maintaining comprehensive coverage for complex problems!