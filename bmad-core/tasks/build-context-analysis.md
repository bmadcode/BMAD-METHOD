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
- **Execute lightweight-ide-detection.md first** to optimize tool usage

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

### Historical Analysis Process

**Execute git history analysis using environment-optimized approach:**

**Environment-Adaptive Git Analysis:**
- **If Cursor/Trae/Windsurf**: Use AI-powered git analysis with natural language queries
- **If Claude Code**: Use built-in git integration and diff visualization  
- **If Roo Code**: Use cloud git integration with collaborative history
- **If Cline/GitHub Copilot**: Use VS Code git panel with AI enhancement
- **If Gemini CLI**: Use CLI git with AI analysis
- **If Standalone**: Use bash commands with approval prompts

**Optimized Git Commands (Environment-Specific):**
```bash
# Single combined command to minimize approvals in CLI mode
echo "=== BMAD Build Context Analysis ===" && \
mkdir -p tmp && \
echo "=== Recent Commits ===" && git log --oneline -10 && \
echo "=== Interface Changes ===" && git log --oneline -20 --grep="interface|API|contract|signature" && \
echo "=== Frequently Modified Files ===" && git log --since="30 days ago" --name-only --pretty=format: | sort | uniq -c | sort -nr | head -20
```

5. **Build Error Source Analysis:**
   - Examine source files for recent changes
   - Focus on files most likely causing build errors

**Key Git Investigation Commands to Execute:**
- Recent commit analysis
- Interface change detection  
- Frequently modified file identification
- Build error source file examination

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

### Test Analysis Process

**Execute test contract analysis using the following approach:**

1. **Test File Discovery:**
   - **For .NET projects**: Use Glob tool with pattern `**/*Test*.cs` or `**/*Tests.cs`
   - **For JavaScript/TypeScript**: Use Glob tool with pattern `**/*.test.js` or `**/*.spec.ts`  
   - **For Python**: Use Glob tool with pattern `**/*_test.py` or `**/test_*.py`
   - **For Go**: Use Glob tool with pattern `**/*_test.go`
   - **For Rust**: Use Glob tool with pattern `**/*_test.rs` or `**/tests/*.rs`
   - **For Java**: Use Glob tool with pattern `**/*Test.java`

2. **Test Contract Analysis:**
   - **Constructor Patterns**: Use Grep tool with pattern `new.*\(` to find constructor usage
   - **Method Call Patterns**: Use Grep tool with pattern `\\..*\(` to find method invocations
   - **Assertion Patterns**: Use Grep tool with pattern `Assert|expect|should|assert` to find test assertions
   - **Interface Expectations**: Use Grep tool to find interface contracts and expected behaviors

3. **API Contract Mapping:**
   - Analyze test files to understand expected interfaces
   - Document consistent usage patterns across test files
   - Identify critical behaviors that must be preserved

**Test Analysis Execution Steps:**
- Use appropriate Glob patterns for test file discovery based on project type
- Use Grep tool for pattern analysis instead of bash loops
- Focus on understanding what APIs and behaviors tests expect
- Document findings for implementation planning

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

### Dependency Analysis Process

**Execute dependency integration analysis using the following approach:**

1. **Project Type Detection:**
   - Use Glob tool to detect project type by finding characteristic files
   - Look for `.csproj`, `package.json`, `pom.xml`, `Cargo.toml`, etc.

2. **Dependency Pattern Analysis by Language:**

   **For .NET Projects:**
   - **Interface Implementations**: Use Grep tool with pattern `class.*:.*I[A-Z]` and type `cs`
   - **Constructor Usage**: Use Grep tool with pattern `new [A-Z][a-zA-Z]*\(` and type `cs`
   - **Namespace Dependencies**: Use Grep tool with pattern `using.*\;` and type `cs`

   **For JavaScript/TypeScript Projects:**
   - **Import Dependencies**: Use Grep tool with pattern `import.*from|require\(` and type `js`
   - **Class Usage**: Use Grep tool with pattern `new [A-Z]` and type `js`
   - **Module Exports**: Use Grep tool with pattern `export|module\.exports` and type `js`

   **For Java Projects:**
   - **Import Dependencies**: Use Grep tool with pattern `import.*\;` and type `java`
   - **Constructor Usage**: Use Grep tool with pattern `new [A-Z][a-zA-Z]*\(` and type `java`
   - **Interface Implementations**: Use Grep tool with pattern `implements|extends` and type `java`

3. **Integration Point Analysis:**
   - **Method Chaining**: Use Grep tool with pattern `\\..*\\.` to find method chains
   - **Data Flow Patterns**: Identify how data moves between components
   - **Call Chain Analysis**: Map component interaction patterns

**Dependency Analysis Steps:**
- Use Glob and Grep tools instead of bash scripting
- Focus on understanding component relationships and dependencies
- Map integration points that could be affected by build errors
- Document critical dependencies that must be preserved

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

### Risk Assessment Process

**Execute comprehensive risk analysis using the following approach:**

1. **Fix Strategy Evaluation:**
   - **Interface Restoration**: Analyze feasibility of restoring previous interface signatures
     - Risk: May conflict with new functionality requirements
     - Impact: Low regression risk, high business requirement risk
   
   - **Implementation Adaptation**: Evaluate updating implementations to match new interfaces  
     - Risk: May break existing functionality if not careful
     - Impact: Medium regression risk, low requirement risk
     
   - **Hybrid Approach**: Consider combining interface restoration with selective implementation updates
     - Risk: Complex changes with multiple failure points  
     - Impact: Variable risk depending on execution

2. **Critical Risk Factor Assessment:**
   - **Test Coverage Analysis**: Use Glob tool to count test files with pattern `**/*test*` or `**/*Test*`
   - **Integration Complexity**: Document component interactions through changed interfaces
   - **Business Logic Preservation**: Identify core functionality that must remain intact  
   - **Timeline vs Quality Balance**: Assess pressure to deliver vs. quality requirements

3. **Risk Documentation Requirements:**
   - Document recommended fix strategy with detailed justification
   - List alternative approaches considered and reasons for rejection
   - Define risk mitigation strategies and validation checkpoints
   - Plan rollback procedures if fixes introduce new problems

**Risk Assessment Execution:**
- Use systematic analysis rather than bash scripting
- Focus on understanding implications of different fix approaches
- Document findings for implementation planning and stakeholder communication

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

**Execute final context report generation using the following approach:**

1. **Report File Creation:**
   - Create analysis report file in tmp directory
   - Use current date for report filename: `tmp/build-context-analysis-[date].md`

2. **Context Report Content Structure:**
   - **Executive Summary Section** with completion date, error categories, affected components
   - **Risk Level Assessment** with detailed justification for risk rating
   - **Recommended Approach** with chosen fix strategy and rationale
   - **Key Findings Section** documenting root causes, business impact, technical debt
   - **Integration Risk Analysis** identifying components that could break
   - **Next Steps Section** with implementation plan and validation checkpoints

3. **Report Generation Process:**
   - Document all analysis phases completed in this investigation
   - Summarize critical findings from git history, test analysis, and dependency mapping
   - Present risk assessment conclusions and recommended fix strategies
   - Include validation checkpoints and rollback procedures
   - List all stakeholders that need to be informed of changes

**Final Report Documentation Template:**
```markdown
# Build Context Analysis Summary

## Executive Summary
- **Analysis Completion Date**: [Current date]
- **Build Errors Analyzed**: [Number and categories found]
- **Components Affected**: [List of impacted components from analysis]
- **Risk Level**: [High/Medium/Low with detailed justification]
- **Recommended Approach**: [Chosen fix strategy with rationale]

## Key Findings
- **Root Cause**: [Why build errors occurred - from git history analysis]
- **Business Impact**: [Functionality at risk - from test contract analysis]
- **Technical Debt**: [Issues to address - from dependency analysis]
- **Integration Risks**: [Components that could break - from dependency mapping]

## Next Steps
1. **Implement fixes** following recommended approach with validation gates
2. **Execute validation checkpoints** at each implementation stage
3. **Run comprehensive test suite** before marking changes complete
4. **Update documentation** to reflect interface and implementation changes
5. **Communicate changes** to relevant stakeholders and team members

## Context Analysis Complete
[Summary of all investigation phases and their outcomes]
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