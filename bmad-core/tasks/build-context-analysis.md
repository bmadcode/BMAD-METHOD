# Build Context Analysis

## Task Overview

Perform comprehensive context analysis before attempting to fix build errors to prevent regressions and technical debt introduction. This consolidated framework combines systematic investigation with validation checklists to ensure informed fixes rather than blind error resolution.

## Context

This analysis prevents developers from blindly "fixing" build errors without understanding why they exist and what functionality could be lost. It combines historical investigation, test contract analysis, dependency mapping, and risk assessment into a single comprehensive approach.

## Execution Approach

**CRITICAL BUILD CONTEXT VALIDATION** - This analysis addresses systematic "quick fix" behavior that introduces regressions.

1. **Investigate the history** - why did the build break?
2. **Understand the intended behavior** through tests
3. **Map all dependencies** and integration points  
4. **Plan fixes that preserve** existing functionality
5. **Create validation checkpoints** to catch regressions

The goal is informed fixes, not blind error resolution.

---

## Prerequisites

- Build errors identified and categorized
- Story requirements understood
- Access to git history and previous implementations
- Development environment configured for analysis

## Phase 1: Historical Context Investigation

### Git History Analysis

**Understand the story behind each build error:**

**For each build error category:**

- [ ] **Recent Changes Identified**: Found commits that introduced build errors
- [ ] **Git Blame Analysis**: Identify when interface/implementation diverged
- [ ] **Commit Message Review**: Understand the intent behind interface changes
- [ ] **Previous Implementation Review**: Study what the working code actually did
- [ ] **Interface Evolution Understood**: Know why interfaces changed vs implementations
- [ ] **Previous Working State Documented**: Have record of last working implementation
- [ ] **Change Intent Clarified**: Understand purpose of interface modifications
- [ ] **Business Logic Preserved**: Identified functionality that must be maintained
- [ ] **Change Justification**: Understand why the interface was modified

### Historical Analysis Commands

```bash
echo "=== BUILD CONTEXT HISTORICAL ANALYSIS ==="
echo "Analysis Date: $(date)"
echo "Analyst: [Developer Agent Name]"
echo ""

# Create tmp directory if it doesn't exist
mkdir -p tmp

# Create analysis report in tmp folder
CONTEXT_REPORT="tmp/build-context-$(date +%Y%m%d-%H%M).md"
echo "# Build Context Analysis Report" > $CONTEXT_REPORT
echo "Date: $(date)" >> $CONTEXT_REPORT
echo "" >> $CONTEXT_REPORT

echo "=== GIT HISTORY INVESTIGATION ===" | tee -a $CONTEXT_REPORT

# Find recent commits that might have caused build errors
echo "## Recent Commits Analysis" >> $CONTEXT_REPORT
echo "Recent commits (last 10):" | tee -a $CONTEXT_REPORT
git log --oneline -10 | tee -a $CONTEXT_REPORT

echo "" >> $CONTEXT_REPORT
echo "## Interface Changes Detection" >> $CONTEXT_REPORT

# Look for interface/API changes in recent commits
echo "Interface changes in recent commits:" | tee -a $CONTEXT_REPORT
git log --oneline -20 --grep="interface\|API\|contract\|signature" | tee -a $CONTEXT_REPORT

# Find files with frequent recent changes
echo "" >> $CONTEXT_REPORT
echo "## Frequently Modified Files" >> $CONTEXT_REPORT
echo "Files with most changes in last 30 days:" | tee -a $CONTEXT_REPORT
git log --since="30 days ago" --name-only --pretty=format: | sort | uniq -c | sort -rn | head -20 | tee -a $CONTEXT_REPORT

# Analyze specific error-causing files
echo "" >> $CONTEXT_REPORT
echo "## Build Error File Analysis" >> $CONTEXT_REPORT
for file in $(find . -name "*.cs" -o -name "*.java" -o -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.rs" -o -name "*.go" | head -10); do
    if [ -f "$file" ]; then
        echo "### File: $file" >> $CONTEXT_REPORT
        echo "Last 5 commits affecting this file:" >> $CONTEXT_REPORT
        git log --oneline -5 -- "$file" >> $CONTEXT_REPORT
        echo "" >> $CONTEXT_REPORT
    fi
done
```

### Documentation Required

Document findings in the following format:

```markdown
## Build Error Context Analysis

### Error Category: [UserRole Constructor Issues - 50 errors]

#### Git History Investigation:
- **Last Working Commit**: [commit hash]
- **Interface Change Commit**: [commit hash] 
- **Change Reason**: [why was interface modified]
- **Previous Functionality**: [what did the old implementation do]
- **Business Logic Lost**: [any functionality that would be lost]

#### Most Recent Interface Changes:
- UserRole interface changed in commit [hash] because [reason]
- SecurityEvent interface evolved in commit [hash] for [purpose]
- CachedUserSession modified in commit [hash] to support [feature]

#### Critical Business Logic to Preserve:
- [List functionality that must not be lost]
- [Dependencies that must be maintained]
- [Behavior patterns that must continue working]
```

## Phase 2: Test Contract Analysis

### Existing Test Investigation

**Let existing tests define the correct behavior:**

- [ ] **All Relevant Tests Located**: Found every test touching broken components
- [ ] **Find All Tests**: Locate every test that touches the broken components
- [ ] **Test Expectations Documented**: Understand exactly what tests expect
- [ ] **Analyze Test Expectations**: Understand what behavior tests expect
- [ ] **Interface Contracts Mapped**: Know the API contracts tests enforce
- [ ] **Map API Contracts**: Understand the interfaces tests expect to exist
- [ ] **Behavior Patterns Identified**: Understand consistent usage patterns
- [ ] **Identify Usage Patterns**: Find how components are actually used

### Test Analysis Commands

```bash
echo "=== TEST CONTRACT ANALYSIS ===" | tee -a $CONTEXT_REPORT

# Find all test files
echo "## Test File Discovery" >> $CONTEXT_REPORT
echo "Locating test files..." | tee -a $CONTEXT_REPORT

# Different project types have different test patterns
if find . -name "*.Test.cs" -o -name "*Tests.cs" | head -1 | grep -q .; then
    # .NET tests
    TEST_FILES=$(find . -name "*.Test.cs" -o -name "*Tests.cs" -o -name "*Test*.cs")
    echo "Found .NET test files:" | tee -a $CONTEXT_REPORT
elif find . -name "*.test.js" -o -name "*.spec.js" | head -1 | grep -q .; then
    # JavaScript tests
    TEST_FILES=$(find . -name "*.test.js" -o -name "*.spec.js" -o -name "*.test.ts" -o -name "*.spec.ts")
    echo "Found JavaScript/TypeScript test files:" | tee -a $CONTEXT_REPORT
elif find . -name "*_test.py" -o -name "test_*.py" | head -1 | grep -q .; then
    # Python tests
    TEST_FILES=$(find . -name "*_test.py" -o -name "test_*.py")
    echo "Found Python test files:" | tee -a $CONTEXT_REPORT
elif find . -name "*_test.go" | head -1 | grep -q .; then
    # Go tests
    TEST_FILES=$(find . -name "*_test.go")
    echo "Found Go test files:" | tee -a $CONTEXT_REPORT
elif find . -name "*_test.rs" | head -1 | grep -q .; then
    # Rust tests
    TEST_FILES=$(find . -name "*_test.rs" -o -name "lib.rs" -path "*/tests/*")
    echo "Found Rust test files:" | tee -a $CONTEXT_REPORT
else
    # Generic search
    TEST_FILES=$(find . -name "*test*" -name "*.java" -o -name "*Test*")
    echo "Found test files (generic):" | tee -a $CONTEXT_REPORT
fi

echo "$TEST_FILES" | tee -a $CONTEXT_REPORT

# Analyze test expectations for key components
echo "" >> $CONTEXT_REPORT
echo "## Test Expectations Analysis" >> $CONTEXT_REPORT

for test_file in $TEST_FILES; do
    if [ -f "$test_file" ] && [ $(wc -l < "$test_file") -gt 0 ]; then
        echo "### Test File: $test_file" >> $CONTEXT_REPORT
        
        # Look for constructor calls, method calls, and assertions
        echo "Constructor usage patterns:" >> $CONTEXT_REPORT
        grep -n "new.*(" "$test_file" | head -5 >> $CONTEXT_REPORT 2>/dev/null || echo "No constructor patterns found" >> $CONTEXT_REPORT
        
        echo "Method call patterns:" >> $CONTEXT_REPORT  
        grep -n "\\..*(" "$test_file" | head -5 >> $CONTEXT_REPORT 2>/dev/null || echo "No method call patterns found" >> $CONTEXT_REPORT
        
        echo "Assertion patterns:" >> $CONTEXT_REPORT
        grep -n "Assert\|expect\|should\|assert" "$test_file" | head -5 >> $CONTEXT_REPORT 2>/dev/null || echo "No assertion patterns found" >> $CONTEXT_REPORT
        
        echo "" >> $CONTEXT_REPORT
    fi
done
```

### Test Contract Documentation

Document test findings:

```markdown
## Test Contract Analysis

### Test Files Located:
- [List of all relevant test files]

### API Contracts Expected by Tests:
- UserRole expects constructor with [parameters]
- SecurityEvent expects methods [list methods]
- CachedUserSession expects behavior [describe behavior]

### Consistent Usage Patterns:
- [Pattern 1: How components are typically instantiated]
- [Pattern 2: Common method call sequences]
- [Pattern 3: Expected return types and values]

### Test Expectations to Preserve:
- [Critical test behaviors that must continue working]
```

## Phase 3: Dependency Integration Analysis

### Integration Point Mapping

**Map all components that depend on broken interfaces:**

- [ ] **Dependent Components Identified**: Found all code that uses broken interfaces
- [ ] **Integration Points Mapped**: Know how components connect and communicate
- [ ] **Data Flow Understood**: Traced how data moves through dependent systems
- [ ] **Call Chain Analysis**: Understand sequence of operations
- [ ] **Impact Assessment Completed**: Know scope of potential regression

### Dependency Analysis Commands

```bash
echo "=== DEPENDENCY INTEGRATION ANALYSIS ===" | tee -a $CONTEXT_REPORT

# Find dependencies and usage patterns
echo "## Dependency Mapping" >> $CONTEXT_REPORT

# Search for class/interface usage across the codebase
if find . -name "*.cs" | head -1 | grep -q .; then
    # .NET analysis
    echo "Analyzing .NET dependencies..." | tee -a $CONTEXT_REPORT
    
    # Find interface implementations
    echo "### Interface Implementations:" >> $CONTEXT_REPORT
    grep -r "class.*:.*I[A-Z]" . --include="*.cs" | head -10 >> $CONTEXT_REPORT
    
    # Find constructor usage
    echo "### Constructor Usage Patterns:" >> $CONTEXT_REPORT
    grep -r "new [A-Z][a-zA-Z]*(" . --include="*.cs" | head -15 >> $CONTEXT_REPORT
    
elif find . -name "*.ts" -o -name "*.js" | head -1 | grep -q .; then
    # TypeScript/JavaScript analysis
    echo "Analyzing TypeScript/JavaScript dependencies..." | tee -a $CONTEXT_REPORT
    
    # Find imports
    echo "### Import Dependencies:" >> $CONTEXT_REPORT
    grep -r "import.*from\|require(" . --include="*.ts" --include="*.js" | head -15 >> $CONTEXT_REPORT
    
    # Find class usage
    echo "### Class Usage Patterns:" >> $CONTEXT_REPORT
    grep -r "new [A-Z]" . --include="*.ts" --include="*.js" | head -15 >> $CONTEXT_REPORT
    
elif find . -name "*.java" | head -1 | grep -q .; then
    # Java analysis
    echo "Analyzing Java dependencies..." | tee -a $CONTEXT_REPORT
    
    # Find imports
    echo "### Import Dependencies:" >> $CONTEXT_REPORT
    grep -r "import.*;" . --include="*.java" | head -15 >> $CONTEXT_REPORT
    
    # Find constructor usage
    echo "### Constructor Usage:" >> $CONTEXT_REPORT
    grep -r "new [A-Z][a-zA-Z]*(" . --include="*.java" | head -15 >> $CONTEXT_REPORT
fi

# Analyze call chains and data flow
echo "" >> $CONTEXT_REPORT
echo "## Call Chain Analysis" >> $CONTEXT_REPORT
echo "Method call patterns in source files:" >> $CONTEXT_REPORT

# Find method chaining and call patterns
grep -r "\\..*\\." . --include="*.cs" --include="*.java" --include="*.ts" --include="*.js" | head -20 >> $CONTEXT_REPORT 2>/dev/null || echo "No method chains found" >> $CONTEXT_REPORT
```

### Integration Documentation

```markdown
## Integration Analysis

### Dependent Components:
- [Component 1]: Uses [interfaces/classes] in [specific ways]
- [Component 2]: Depends on [functionality] for [purpose]
- [Component 3]: Integrates with [services] through [methods]

### Data Flow Paths:
- [Path 1]: Data flows from [source] through [intermediates] to [destination]
- [Path 2]: Information passes between [components] via [mechanisms]

### Critical Integration Points:
- [Integration 1]: [Component A] ↔ [Component B] via [interface]
- [Integration 2]: [System X] ↔ [System Y] through [API calls]

### Impact Assessment:
- **High Risk**: [Components that could break completely]
- **Medium Risk**: [Components that might have reduced functionality]  
- **Low Risk**: [Components with minimal coupling]
```

## Phase 4: Risk Assessment and Planning

### Comprehensive Risk Analysis

**Assess the risk of different fix approaches:**

- [ ] **Fix Approaches Evaluated**: Considered multiple ways to resolve build errors
- [ ] **Regression Risk Assessed**: Understand likelihood of breaking existing functionality
- [ ] **Testing Strategy Planned**: Know how to validate fixes don't introduce regressions
- [ ] **Rollback Plan Prepared**: Have strategy if fixes introduce new problems
- [ ] **Impact Scope Bounded**: Understand maximum possible scope of changes

### Risk Assessment Framework

```bash
echo "=== RISK ASSESSMENT ===" | tee -a $CONTEXT_REPORT

echo "## Fix Strategy Risk Analysis" >> $CONTEXT_REPORT

# Analyze different fix approaches
echo "### Possible Fix Approaches:" >> $CONTEXT_REPORT
echo "1. **Interface Restoration**: Restore previous interface signatures" >> $CONTEXT_REPORT
echo "   - Risk: May conflict with new functionality requirements" >> $CONTEXT_REPORT
echo "   - Impact: Low regression risk, high business requirement risk" >> $CONTEXT_REPORT
echo "" >> $CONTEXT_REPORT

echo "2. **Implementation Adaptation**: Update implementations to match new interfaces" >> $CONTEXT_REPORT
echo "   - Risk: May break existing functionality if not careful" >> $CONTEXT_REPORT
echo "   - Impact: Medium regression risk, low requirement risk" >> $CONTEXT_REPORT
echo "" >> $CONTEXT_REPORT

echo "3. **Hybrid Approach**: Combine interface restoration with selective implementation updates" >> $CONTEXT_REPORT
echo "   - Risk: Complex changes with multiple failure points" >> $CONTEXT_REPORT
echo "   - Impact: Variable risk depending on execution" >> $CONTEXT_REPORT
echo "" >> $CONTEXT_REPORT

# Document critical risk factors
echo "### Critical Risk Factors:" >> $CONTEXT_REPORT
echo "- **Test Coverage**: $(find . -name "*test*" -o -name "*Test*" | wc -l) test files found" >> $CONTEXT_REPORT
echo "- **Integration Complexity**: Multiple components interact through changed interfaces" >> $CONTEXT_REPORT
echo "- **Business Logic Preservation**: Core functionality must remain intact" >> $CONTEXT_REPORT
echo "- **Timeline Pressure**: Need to balance speed with quality" >> $CONTEXT_REPORT
```

### Risk Documentation

```markdown
## Risk Assessment Summary

### Fix Strategy Recommendations:
- **Recommended Approach**: [Chosen strategy with justification]
- **Alternative Approaches**: [Other options considered and why rejected]

### Risk Mitigation Strategies:
- **Test Validation**: [How to verify fixes don't break existing functionality]
- **Incremental Implementation**: [Steps to implement changes safely]
- **Rollback Procedures**: [How to undo changes if problems arise]

### Validation Checkpoints:
- [ ] All existing tests continue to pass
- [ ] New functionality requirements met
- [ ] Performance remains acceptable
- [ ] Integration points verified working
- [ ] No new security vulnerabilities introduced
```

## Phase 5: Validation and Documentation

### Implementation Planning

**Plan the fix implementation with validation:**

- [ ] **Change Sequence Planned**: Know the order to make changes to minimize breakage
- [ ] **Validation Points Identified**: Have checkpoints to verify each step
- [ ] **Test Execution Strategy**: Plan how to validate fixes at each stage
- [ ] **Documentation Updates Required**: Know what documentation needs updating
- [ ] **Team Communication Plan**: Ensure stakeholders understand changes and risks

### Final Context Report

Generate comprehensive context report:

```bash
echo "=== CONTEXT ANALYSIS SUMMARY ===" | tee -a $CONTEXT_REPORT

echo "## Executive Summary" >> $CONTEXT_REPORT
echo "**Analysis Completion Date**: $(date)" >> $CONTEXT_REPORT
echo "**Build Errors Analyzed**: [Number and categories]" >> $CONTEXT_REPORT
echo "**Components Affected**: [List of impacted components]" >> $CONTEXT_REPORT
echo "**Risk Level**: [High/Medium/Low with justification]" >> $CONTEXT_REPORT
echo "**Recommended Approach**: [Chosen fix strategy]" >> $CONTEXT_REPORT
echo "" >> $CONTEXT_REPORT

echo "## Key Findings:" >> $CONTEXT_REPORT
echo "- **Root Cause**: [Why build errors occurred]" >> $CONTEXT_REPORT
echo "- **Business Impact**: [Functionality at risk]" >> $CONTEXT_REPORT
echo "- **Technical Debt**: [Issues to address]" >> $CONTEXT_REPORT
echo "- **Integration Risks**: [Components that could break]" >> $CONTEXT_REPORT
echo "" >> $CONTEXT_REPORT

echo "## Next Steps:" >> $CONTEXT_REPORT
echo "1. **Implement fixes** following recommended approach" >> $CONTEXT_REPORT
echo "2. **Execute validation checkpoints** at each stage" >> $CONTEXT_REPORT
echo "3. **Run comprehensive test suite** before completion" >> $CONTEXT_REPORT
echo "4. **Update documentation** to reflect changes" >> $CONTEXT_REPORT
echo "5. **Communicate changes** to relevant stakeholders" >> $CONTEXT_REPORT

echo "" >> $CONTEXT_REPORT
echo "**Context Analysis Complete**" >> $CONTEXT_REPORT
echo "Report saved to: $CONTEXT_REPORT" | tee -a $CONTEXT_REPORT
```

## Completion Criteria

### Analysis Complete When:

- [ ] **Historical Investigation Complete**: Understanding of how/why build broke
- [ ] **Test Contracts Understood**: Clear picture of expected behavior
- [ ] **Dependencies Mapped**: Full scope of integration impacts known
- [ ] **Risk Assessment Complete**: Understand risks of different fix approaches
- [ ] **Implementation Plan Ready**: Clear strategy for making changes safely
- [ ] **Validation Strategy Defined**: Know how to verify fixes work correctly

### Outputs Delivered:

- [ ] **Context Analysis Report**: Comprehensive analysis document
- [ ] **Fix Implementation Plan**: Step-by-step approach to resolving errors
- [ ] **Risk Mitigation Strategy**: Plans to prevent and handle regressions
- [ ] **Validation Checklist**: Tests and checkpoints for verification
- [ ] **Documentation Updates**: Changes needed for accuracy

---

## Summary

This comprehensive build context analysis ensures that developers understand the full scope and implications before attempting to fix build errors. It combines historical investigation, test analysis, dependency mapping, and risk assessment into a systematic approach that prevents regressions and preserves existing functionality.

**Key Benefits:**
- **Prevents blind fixes** that introduce regressions
- **Preserves business logic** by understanding existing functionality
- **Reduces technical debt** through informed decision-making
- **Improves fix quality** by considering all implications
- **Enables safe implementation** through comprehensive planning

**Integration Points:**
- Provides foundation for informed build error resolution
- Feeds into implementation planning and validation strategies
- Supports risk-based decision making for fix approaches
- Documents context for future maintenance and development