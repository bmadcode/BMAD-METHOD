# /create-remediation-story Task

When this command is used, execute the following task:

# Create Remediation Story Task

## Task Overview

Generate structured remediation stories for developers to systematically address issues identified during QA audits, reality checks, and validation failures while preventing regression and technical debt introduction.

## Context

When QA agents identify simulation patterns, build failures, or implementation issues, developers need clear, actionable guidance to remediate problems without introducing new issues. This task creates systematic fix-stories that maintain development velocity while ensuring quality.

## Remediation Story Generation Protocol

### Phase 1: Issue Assessment and Classification with Regression Analysis

```bash
echo "=== REMEDIATION STORY GENERATION WITH REGRESSION PREVENTION ==="
echo "Assessment Date: $(date)"
echo "QA Agent: [Agent Name]"
echo "Original Story: [Story Reference]"
echo ""

# Enhanced issue classification including regression risks
COMPOSITE_REALITY_SCORE=${REALITY_SCORE:-0}
REGRESSION_PREVENTION_SCORE=${REGRESSION_PREVENTION_SCORE:-100}
TECHNICAL_DEBT_SCORE=${TECHNICAL_DEBT_SCORE:-100}

echo "Quality Scores:"
echo "- Composite Reality Score: $COMPOSITE_REALITY_SCORE/100"
echo "- Regression Prevention Score: $REGRESSION_PREVENTION_SCORE/100" 
echo "- Technical Debt Score: $TECHNICAL_DEBT_SCORE/100"
echo ""

# Determine story type based on comprehensive audit findings
if [[ "$COMPOSITE_REALITY_SCORE" -lt 70 ]] || [[ "$SIMULATION_PATTERNS" -gt 5 ]]; then
    STORY_TYPE="simulation-remediation"
    PRIORITY="high"
    URGENCY="critical"
elif [[ "$REGRESSION_PREVENTION_SCORE" -lt 80 ]]; then
    STORY_TYPE="regression-prevention"
    PRIORITY="high"
    URGENCY="high"
elif [[ "$TECHNICAL_DEBT_SCORE" -lt 70 ]]; then
    STORY_TYPE="technical-debt-prevention"
    PRIORITY="high"
    URGENCY="high"
elif [[ "$BUILD_EXIT_CODE" -ne 0 ]] || [[ "$ERROR_COUNT" -gt 0 ]]; then
    STORY_TYPE="build-fix"
    PRIORITY="high" 
    URGENCY="high"
elif [[ "$RUNTIME_EXIT_CODE" -ne 0 ]] && [[ "$RUNTIME_EXIT_CODE" -ne 124 ]]; then
    STORY_TYPE="runtime-fix"
    PRIORITY="high"
    URGENCY="high"
else
    STORY_TYPE="quality-improvement"
    PRIORITY="medium"
    URGENCY="medium"
fi

echo "Remediation Type: $STORY_TYPE"
echo "Priority: $PRIORITY"
echo "Urgency: $URGENCY"
```

### Phase 2: Generate Story Sequence Number

```bash
# Get next available story number
STORY_DIR="docs/stories"
LATEST_STORY=$(ls $STORY_DIR/*.md 2>/dev/null | grep -E '[0-9]+\.[0-9]+' | sort -V | tail -1)

if [[ -n "$LATEST_STORY" ]]; then
    LATEST_NUM=$(basename "$LATEST_STORY" .md | cut -d'.' -f1)
    NEXT_MAJOR=$((LATEST_NUM + 1))
else
    NEXT_MAJOR=1
fi

# Generate remediation story number
REMEDIATION_STORY="${NEXT_MAJOR}.1.remediation-${STORY_TYPE}.md"
STORY_PATH="$STORY_DIR/$REMEDIATION_STORY"

echo "Generated Story: $REMEDIATION_STORY"
```

### Phase 3: Create Structured Remediation Story

```bash
cat > "$STORY_PATH" << 'EOF'
# Story [STORY_NUMBER]: [STORY_TYPE] Remediation

## Story

**As a** developer working on {{project_name}}
**I need to** systematically remediate [ISSUE_CATEGORY] identified during QA audit
**So that** the implementation meets quality standards and reality requirements

## Acceptance Criteria

### Primary Remediation Requirements
- [ ] **Build Success:** Clean compilation with zero errors in Release mode
- [ ] **Runtime Validation:** Application starts and runs without crashes
- [ ] **Reality Score Improvement:** Achieve minimum 80/100 composite reality score
- [ ] **Simulation Pattern Elimination:** Remove all flagged simulation patterns
- [ ] **Regression Prevention:** Maintain all existing functionality (score ≥ 80/100)
- [ ] **Technical Debt Prevention:** Avoid architecture violations (score ≥ 70/100)

### Specific Fix Requirements
[SPECIFIC_FIXES_PLACEHOLDER]

### Enhanced Quality Gates
- [ ] **All Tests Pass:** Unit tests, integration tests, and regression tests complete successfully
- [ ] **Regression Testing:** All existing functionality continues to work as before
- [ ] **Story Pattern Compliance:** Follow established patterns from previous successful implementations
- [ ] **Architectural Consistency:** Maintain alignment with established architectural decisions
- [ ] **Performance Validation:** No performance degradation from remediation changes
- [ ] **Integration Preservation:** All external integrations continue functioning
- [ ] **Documentation Updates:** Update relevant documentation affected by changes
- [ ] **Cross-Platform Verification:** Changes work on both Windows and Linux

## Dev Notes

### QA Audit Reference
- **Original Audit Date:** [AUDIT_DATE]
- **Reality Score:** [REALITY_SCORE]/100
- **Primary Issues:** [ISSUE_SUMMARY]
- **Audit Report:** [AUDIT_REPORT_PATH]

### Remediation Strategy
[REMEDIATION_STRATEGY_PLACEHOLDER]

### Implementation Guidelines with Regression Prevention
- **Zero Tolerance:** No simulation patterns (Random.NextDouble(), Task.FromResult(), NotImplementedException)
- **Real Implementation:** All methods must contain actual business logic
- **Build Quality:** Clean Release mode compilation required
- **Regression Safety:** Always validate existing functionality before and after changes
- **Pattern Consistency:** Follow implementation patterns established in previous successful stories
- **Architectural Alignment:** Ensure changes align with existing architectural decisions
- **Integration Preservation:** Test all integration points to prevent breakage
- **Technical Debt Avoidance:** Maintain or improve code quality, don't introduce shortcuts

### Regression Prevention Checklist
- [ ] **Review Previous Stories:** Study successful implementations for established patterns
- [ ] **Identify Integration Points:** Map all external dependencies that could be affected  
- [ ] **Test Existing Functionality:** Validate current behavior before making changes
- [ ] **Incremental Changes:** Make small, testable changes rather than large refactors
- [ ] **Validation at Each Step:** Test functionality after each significant change
- [ ] **Architecture Review:** Ensure changes follow established design patterns
- [ ] **Performance Monitoring:** Monitor for any performance impacts during changes
- **Test Coverage:** Comprehensive tests for all remediated functionality

## Testing

### Pre-Remediation Validation
- [ ] **Document Current State:** Capture baseline metrics and current behavior
- [ ] **Identify Test Coverage:** Determine which tests need updates post-remediation
- [ ] **Performance Baseline:** Establish performance metrics before changes

### Post-Remediation Validation  
- [ ] **Reality Audit:** Execute reality-audit-comprehensive to verify improvements
- [ ] **Build Validation:** Confirm clean compilation and zero errors
- [ ] **Runtime Testing:** Verify application startup and core functionality
- [ ] **Performance Testing:** Ensure no degradation from baseline
- [ ] **Integration Testing:** Validate system-wide functionality remains intact

## Tasks

### Phase 1: Issue Analysis and Planning
- [ ] **Review QA Audit Report:** Analyze specific issues identified in audit
- [ ] **Categorize Problems:** Group related issues for systematic remediation
- [ ] **Plan Remediation Sequence:** Order fixes to minimize disruption
- [ ] **Identify Dependencies:** Determine which fixes depend on others

### Phase 2: Simulation Pattern Remediation
[SIMULATION_TASKS_PLACEHOLDER]

### Phase 3: Build and Runtime Fixes
[BUILD_RUNTIME_TASKS_PLACEHOLDER]

### Phase 4: Quality and Performance Validation
- [ ] **Execute Full Test Suite:** Run all automated tests to verify functionality
- [ ] **Performance Regression Testing:** Ensure no performance degradation
- [ ] **Cross-Platform Testing:** Validate fixes work on Windows and Linux
- [ ] **Documentation Updates:** Update any affected documentation

### Phase 5: Final Validation
- [ ] **Reality Audit Re-execution:** Achieve 80+ reality score
- [ ] **Build Verification:** Clean Release mode compilation
- [ ] **Runtime Verification:** Successful application startup and operation
- [ ] **Regression Testing:** All existing functionality preserved

## File List
[Will be populated by Dev Agent during implementation]

## Dev Agent Record

### Agent Model Used
[Will be populated by Dev Agent]

### Debug Log References
[Will be populated by Dev Agent during troubleshooting]

### Completion Notes
[Will be populated by Dev Agent upon completion]

### Change Log
[Will be populated by Dev Agent with specific changes made]

## QA Results
[Will be populated by QA Agent after remediation completion]

## Status
Draft

---
*Story generated automatically by QA Agent on [GENERATION_DATE]*
*Based on audit report: [AUDIT_REPORT_REFERENCE]*
EOF
```

### Phase 4: Populate Story with Specific Issue Details

```bash
# Replace placeholders with actual audit findings
sed -i "s/\[STORY_NUMBER\]/${NEXT_MAJOR}.1/g" "$STORY_PATH"
sed -i "s/\[STORY_TYPE\]/${STORY_TYPE}/g" "$STORY_PATH"
sed -i "s/\[ISSUE_CATEGORY\]/${STORY_TYPE} issues/g" "$STORY_PATH"
sed -i "s/\[AUDIT_DATE\]/$(date)/g" "$STORY_PATH"
sed -i "s/\[REALITY_SCORE\]/${REALITY_SCORE:-N/A}/g" "$STORY_PATH"
sed -i "s/\[GENERATION_DATE\]/$(date)/g" "$STORY_PATH"

# Generate specific fixes based on comprehensive audit findings
SPECIFIC_FIXES=""
SIMULATION_TASKS=""
BUILD_RUNTIME_TASKS=""
REGRESSION_PREVENTION_TASKS=""
TECHNICAL_DEBT_PREVENTION_TASKS=""

# Add simulation pattern fixes
if [[ ${RANDOM_COUNT:-0} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Replace Random Data Generation:** Eliminate $RANDOM_COUNT instances of Random.NextDouble() with real data sources"
    SIMULATION_TASKS+="\n- [ ] **Replace Random.NextDouble() Instances:** Convert $RANDOM_COUNT random data generations to real business logic"
fi

if [[ ${TASK_MOCK_COUNT:-0} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Replace Mock Async Operations:** Convert $TASK_MOCK_COUNT Task.FromResult() calls to real async implementations"
    SIMULATION_TASKS+="\n- [ ] **Convert Task.FromResult() Calls:** Replace $TASK_MOCK_COUNT mock async operations with real async logic"
fi

if [[ ${NOT_IMPL_COUNT:-0} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Implement Missing Methods:** Complete $NOT_IMPL_COUNT methods throwing NotImplementedException"
    SIMULATION_TASKS+="\n- [ ] **Complete Unimplemented Methods:** Implement $NOT_IMPL_COUNT methods with real business logic"
fi

if [[ ${TOTAL_SIM_COUNT:-0} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Replace Simulation Methods:** Convert $TOTAL_SIM_COUNT SimulateX()/MockX()/FakeX() methods to real implementations"
    SIMULATION_TASKS+="\n- [ ] **Convert Simulation Methods:** Replace $TOTAL_SIM_COUNT simulation methods with actual functionality"
fi

# Add build/runtime fixes
if [[ ${BUILD_EXIT_CODE:-0} -ne 0 ]] || [[ ${ERROR_COUNT:-1} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Fix Build Errors:** Resolve all compilation errors preventing clean Release build"
    BUILD_RUNTIME_TASKS+="\n- [ ] **Resolve Compilation Errors:** Fix all build errors identified in audit"
fi

if [[ ${RUNTIME_EXIT_CODE:-0} -ne 0 ]] && [[ ${RUNTIME_EXIT_CODE:-0} -ne 124 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Fix Runtime Issues:** Resolve application startup and execution problems"
    BUILD_RUNTIME_TASKS+="\n- [ ] **Resolve Runtime Failures:** Fix issues preventing application startup"
fi

# Add regression prevention fixes
if [[ ${REGRESSION_PREVENTION_SCORE:-100} -lt 80 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Regression Prevention:** Improve regression prevention score to ≥80/100"
    REGRESSION_PREVENTION_TASKS+="\n- [ ] **Review Previous Stories:** Study successful implementations for established patterns"
    REGRESSION_PREVENTION_TASKS+="\n- [ ] **Validate Integration Points:** Test all external dependencies and integration points"
    REGRESSION_PREVENTION_TASKS+="\n- [ ] **Pattern Consistency Check:** Ensure implementation follows established architectural patterns"
    REGRESSION_PREVENTION_TASKS+="\n- [ ] **Functional Regression Testing:** Verify all existing functionality continues to work"
fi

if [[ ${PATTERN_CONSISTENCY_ISSUES:-0} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Fix Pattern Inconsistencies:** Address $PATTERN_CONSISTENCY_ISSUES pattern compliance issues"
    REGRESSION_PREVENTION_TASKS+="\n- [ ] **Align with Established Patterns:** Modify implementation to follow successful story patterns"
fi

if [[ ${ARCHITECTURAL_VIOLATIONS:-0} -gt 0 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Fix Architectural Violations:** Resolve $ARCHITECTURAL_VIOLATIONS architectural consistency issues"
    REGRESSION_PREVENTION_TASKS+="\n- [ ] **Architectural Compliance:** Align changes with established architectural decisions"
fi

# Add technical debt prevention fixes
if [[ ${TECHNICAL_DEBT_SCORE:-100} -lt 70 ]]; then
    SPECIFIC_FIXES+="\n- [ ] **Technical Debt Prevention:** Improve technical debt score to ≥70/100"
    TECHNICAL_DEBT_PREVENTION_TASKS+="\n- [ ] **Code Quality Improvement:** Refactor code to meet established quality standards"
    TECHNICAL_DEBT_PREVENTION_TASKS+="\n- [ ] **Complexity Reduction:** Simplify overly complex implementations"
    TECHNICAL_DEBT_PREVENTION_TASKS+="\n- [ ] **Duplication Elimination:** Remove code duplication and consolidate similar logic"
    TECHNICAL_DEBT_PREVENTION_TASKS+="\n- [ ] **Maintainability Enhancement:** Improve code readability and maintainability"
fi

# Generate comprehensive remediation strategy based on findings
REMEDIATION_STRATEGY="Based on the comprehensive QA audit findings, this remediation follows a systematic regression-safe approach:\n\n"
REMEDIATION_STRATEGY+="**Quality Assessment:**\n"
REMEDIATION_STRATEGY+="- Composite Reality Score: ${COMPOSITE_REALITY_SCORE:-N/A}/100\n"
REMEDIATION_STRATEGY+="- Regression Prevention Score: ${REGRESSION_PREVENTION_SCORE:-N/A}/100\n"
REMEDIATION_STRATEGY+="- Technical Debt Score: ${TECHNICAL_DEBT_SCORE:-N/A}/100\n\n"

REMEDIATION_STRATEGY+="**Issue Analysis:**\n"
REMEDIATION_STRATEGY+="1. **Simulation Patterns:** $((${RANDOM_COUNT:-0} + ${TASK_MOCK_COUNT:-0} + ${NOT_IMPL_COUNT:-0} + ${TOTAL_SIM_COUNT:-0})) simulation patterns identified\n"
REMEDIATION_STRATEGY+="2. **Infrastructure Issues:** Build status: $(if [[ ${BUILD_EXIT_CODE:-0} -eq 0 ]] && [[ ${ERROR_COUNT:-1} -eq 0 ]]; then echo "✅ PASS"; else echo "❌ FAIL"; fi), Runtime status: $(if [[ ${RUNTIME_EXIT_CODE:-0} -eq 0 ]] || [[ ${RUNTIME_EXIT_CODE:-0} -eq 124 ]]; then echo "✅ PASS"; else echo "❌ FAIL"; fi)\n"
REMEDIATION_STRATEGY+="3. **Regression Risks:** Pattern inconsistencies: ${PATTERN_CONSISTENCY_ISSUES:-0}, Architectural violations: ${ARCHITECTURAL_VIOLATIONS:-0}\n"
REMEDIATION_STRATEGY+="4. **Technical Debt Risks:** Code complexity and maintainability issues identified\n\n"

REMEDIATION_STRATEGY+="**Implementation Approach:**\n"
REMEDIATION_STRATEGY+="1. **Pre-Implementation:** Review previous successful stories for established patterns\n"
REMEDIATION_STRATEGY+="2. **Priority Order:** Address simulation patterns → regression risks → build issues → technical debt → runtime problems\n"
REMEDIATION_STRATEGY+="3. **Validation Strategy:** Continuous regression testing during remediation to prevent functionality loss\n"
REMEDIATION_STRATEGY+="4. **Pattern Compliance:** Ensure all changes follow established architectural decisions and implementation patterns\n"
REMEDIATION_STRATEGY+="5. **Success Criteria:** Achieve 80+ composite reality score with regression prevention ≥80 and technical debt prevention ≥70"

# Update story file with generated content
sed -i "s|\[SPECIFIC_FIXES_PLACEHOLDER\]|$SPECIFIC_FIXES|g" "$STORY_PATH"
sed -i "s|\[SIMULATION_TASKS_PLACEHOLDER\]|$SIMULATION_TASKS|g" "$STORY_PATH"
sed -i "s|\[BUILD_RUNTIME_TASKS_PLACEHOLDER\]|$BUILD_RUNTIME_TASKS|g" "$STORY_PATH"
sed -i "s|\[REGRESSION_PREVENTION_TASKS_PLACEHOLDER\]|$REGRESSION_PREVENTION_TASKS|g" "$STORY_PATH"
sed -i "s|\[TECHNICAL_DEBT_PREVENTION_TASKS_PLACEHOLDER\]|$TECHNICAL_DEBT_PREVENTION_TASKS|g" "$STORY_PATH"
sed -i "s|\[REMEDIATION_STRATEGY_PLACEHOLDER\]|$REMEDIATION_STRATEGY|g" "$STORY_PATH"

# Add issue summary and audit report reference if available
if [[ -n "${AUDIT_REPORT:-}" ]]; then
    ISSUE_SUMMARY="Reality Score: ${REALITY_SCORE:-N/A}/100, Simulation Patterns: $((${RANDOM_COUNT:-0} + ${TASK_MOCK_COUNT:-0} + ${NOT_IMPL_COUNT:-0} + ${TOTAL_SIM_COUNT:-0})), Build Issues: $(if [[ ${BUILD_EXIT_CODE:-0} -eq 0 ]]; then echo "None"; else echo "Present"; fi)"
    sed -i "s|\[ISSUE_SUMMARY\]|$ISSUE_SUMMARY|g" "$STORY_PATH"
    sed -i "s|\[AUDIT_REPORT_PATH\]|$AUDIT_REPORT|g" "$STORY_PATH"
    sed -i "s|\[AUDIT_REPORT_REFERENCE\]|$AUDIT_REPORT|g" "$STORY_PATH"
fi

echo ""
echo "✅ Remediation story created: $STORY_PATH"
echo "📋 Story type: $STORY_TYPE"
echo "🎯 Priority: $PRIORITY"
echo "⚡ Urgency: $URGENCY"
```

## Integration with QA Workflow

### Auto-Generation Triggers

```bash
# Add to reality-audit-comprehensive.md after final assessment
if [[ $REALITY_SCORE -lt 80 ]] || [[ $BUILD_EXIT_CODE -ne 0 ]] || [[ $RUNTIME_EXIT_CODE -ne 0 && $RUNTIME_EXIT_CODE -ne 124 ]]; then
    echo ""
    echo "=== GENERATING REMEDIATION STORY ==="
    # Execute create-remediation-story task
    source .bmad-core/tasks/create-remediation-story.md
    
    echo ""
    echo "📝 **REMEDIATION STORY CREATED:** $REMEDIATION_STORY"
    echo "👩‍💻 **NEXT ACTION:** Assign to developer for systematic remediation"
    echo "🔄 **PROCESS:** Developer implements → QA re-audits → Cycle until 80+ score achieved"
fi
```

### Quality Gate Integration

```bash
# Add to story completion validation
echo "=== POST-REMEDIATION QUALITY GATE ==="
echo "Before marking remediation complete:"
echo "1. Execute reality-audit-comprehensive to verify improvements"
echo "2. Confirm reality score >= 80/100"
echo "3. Validate build success (Release mode, zero errors)"
echo "4. Verify runtime success (clean startup)"
echo "5. Run full regression test suite"
echo "6. Update original story status if remediation successful"
```

## Usage Instructions for QA Agents

### When to Generate Remediation Stories
- **Reality Score < 80:** Significant simulation patterns detected
- **Build Failures:** Compilation errors or warnings in Release mode
- **Runtime Issues:** Application startup or execution failures
- **Test Failures:** Significant test suite failures
- **Performance Degradation:** Measurable performance regression

### Story Naming Convention
- `[X].1.remediation-simulation.md` - For simulation pattern fixes
- `[X].1.remediation-build-fix.md` - For build/compilation issues
- `[X].1.remediation-runtime-fix.md` - For runtime/execution issues
- `[X].1.remediation-quality-improvement.md` - For general quality issues

### Follow-up Process
1. **Generate remediation story** using this task
2. **Assign to developer** for systematic implementation
3. **Track progress** through story checkbox completion
4. **Re-audit after completion** to verify improvements
5. **Close loop** by updating original story with remediation results

This creates a complete feedback loop ensuring that QA findings result in systematic, trackable remediation rather than ad-hoc fixes.