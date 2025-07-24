# Story-to-Code Cross-Reference Audit

Systematic methodology for auditing completed stories against actual codebase implementation to identify gaps, inconsistencies, and missing functionality.

[[LLM: This task ensures story deliverables match actual code implementation, preventing scope creep and ensuring traceability]]

## Prerequisites

- Access to all story files in docs/stories/
- Ability to search codebase for implementations
- Understanding of project architecture patterns
- Access to git history for implementation tracking

## Audit Process

### 1. **Story Discovery and Classification**

[[LLM: First identify and categorize all stories by completion status and type]]

**Step 1.1: Scan All Story Files**
- [ ] **Find All Stories**: Locate every .md file in docs/stories/
- [ ] **Extract Status**: Parse each story for Status field
- [ ] **Identify Completed**: Filter stories marked as "Completed" or "Ready for Review"
- [ ] **Categorize by Epic**: Group stories by Epic (1, 2, 3, 4, 5) and Phase (P0.X, pre-X)

**Step 1.2: Parse Story Requirements**
For each completed story:
- [ ] **Extract File List**: Parse "File List" section for expected files
- [ ] **Extract Tasks**: Parse task checkboxes for implemented features
- [ ] **Extract Acceptance Criteria**: Parse acceptance criteria for expected behavior
- [ ] **Extract Components**: Identify services, classes, interfaces mentioned

### 2. **Codebase Reality Check**

[[LLM: Compare story expectations against actual codebase state]]

**Step 2.1: Environment-Adaptive File Existence Verification**
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi

echo "🔍 Environment-Adaptive File Verification:"
echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"

# For each story's File List using environment-appropriate methods:
for file in story_file_list:
    if [ "$USE_IDE_TOOLS" = "true" ]; then
        # Use native IDE tools for file verification
        echo "Using native IDE integration for file existence check"
        # Would use LS tool or Read tool for file checking
        # Would use Bash tool with clear description for git log operations
    fi
    
    # Universal file check (works in all environments)
    if [ -f "$file" ]; then
        status="✅ EXISTS"
        last_modified=$(git log -1 --format="%ci" "$file" 2>/dev/null || echo "unknown")
        size=$(stat -c%s "$file" 2>/dev/null || echo "unknown")
    else
        status="❌ MISSING"
        # Check for renamed/moved files using environment-appropriate search
        if [ "$USE_IDE_TOOLS" = "true" ]; then
            # Would use Glob tool for similar file detection
            similar="$(find . -name "*$(basename "$file")" 2>/dev/null || echo 'none')"
        else
            similar="$(find . -name "*$(basename "$file")" 2>/dev/null || echo 'none')"
        fi
    fi
    echo "File: $file | Status: $status | Modified: $last_modified"
done
```

**Step 2.2: Environment-Adaptive Implementation Content Analysis**
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_SIMULATION_PATTERNS" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

echo "🔍 Environment-Adaptive Implementation Analysis:"
echo "Language: $BMAD_PRIMARY_LANGUAGE | Simulation Patterns: $BMAD_SIMULATION_PATTERNS"

# For each expected component using environment-appropriate search:
for component in story_components; do
    if [ "$USE_IDE_TOOLS" = "true" ]; then
        echo "Using native IDE tools for component analysis: $component"
        # Would use Grep tool with appropriate patterns for component search
        # Would use Read tool for implementation analysis
        grep_results="native_search_result"
    else
        echo "Using CLI batch mode for component search: $component (may require approval)"
        grep_results=$(grep -r "$component" . --include="*.${BMAD_PRIMARY_LANGUAGE,,}" 2>/dev/null || echo "not_found")
    fi
    
    if [ "$grep_results" != "not_found" ] && [ -n "$grep_results" ]; then
        echo "✅ Component found: $component"
        # Analyze implementation completeness using language-specific patterns
        simulation_check=$(echo "$grep_results" | grep -E "$(echo "$BMAD_SIMULATION_PATTERNS" | tr ',' '|')" || echo "none")
        if [ "$simulation_check" != "none" ]; then
            echo "⚠️ Simulation patterns detected in $component"
        else
            echo "✅ Real implementation found for $component"
        fi
    else
        echo "❌ Component missing: $component"
        # Check for mock vs real implementation patterns
        check_for_mock_vs_real_implementation "$component"
    fi
done
```

**Step 2.3: Environment-Adaptive Acceptance Criteria Validation**
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_TEST_PATTERNS" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

echo "✅ Environment-Adaptive Acceptance Criteria Validation:"
echo "Language: $BMAD_PRIMARY_LANGUAGE | Test Patterns: $BMAD_TEST_PATTERNS"

# For each acceptance criterion using environment-appropriate analysis:
for criterion in story_acceptance_criteria; do
    echo "Validating criterion: $criterion"
    
    if [ "$USE_IDE_TOOLS" = "true" ]; then
        echo "Using native IDE tools for test discovery"
        # Would use Glob tool with test patterns for test file discovery
        # Would use Grep tool for implementation search
        test_files="native_test_discovery"
        implementation="native_implementation_search"
    else
        echo "Using CLI batch mode for criterion validation (may require approval)"
        # Find related tests using language-specific patterns
        test_pattern=$(echo "$BMAD_TEST_PATTERNS" | cut -d',' -f1)
        test_files=$(find . -name "*$test_pattern" -type f | head -10)
        implementation=$(grep -r "$(echo "$criterion" | cut -d' ' -f1-3)" . --include="*.${BMAD_PRIMARY_LANGUAGE,,}" | head -5)
    fi
    
    # Validate criterion status
    if [ -n "$test_files" ] && [ -n "$implementation" ]; then
        validation_status="✅ VERIFIED - Tests and implementation found"
    elif [ -n "$implementation" ]; then
        validation_status="⚠️ PARTIAL - Implementation found, tests missing"
    else
        validation_status="❌ MISSING - No implementation or tests found"
    fi
    
    echo "Criterion: $criterion | Status: $validation_status"
done
```

### 3. **Gap Analysis Documentation**

[[LLM: Create detailed mapping of story expectations vs reality]]

**Step 3.1: Generate Cross-Reference Matrix**
```markdown
## Story Implementation Audit Matrix

| Story ID | Status | Expected Files | Actual Files | Missing Files | Extra Files | Implementation Gap |
|----------|--------|----------------|--------------|---------------|-------------|-------------------|
| 1.1.Foundation  | Completed | 5 files | 4 files | CommandBase.cs | TestHelper.cs | Medium Gap |
| 1.2.Core | Completed | 8 files | 6 files | ServiceWrapper.cs, ProviderDetector.cs | None | High Gap |
```

**Step 3.2: Component Implementation Status**
```markdown
## Component Reality Check

### Story 1.1 - Enhanced Foundation
**Expected Components**:
- ✅ `AnalyzeCommand` - EXISTS (src/ProjectName.Diagnostics.Application/Commands/AnalyzeCommand.cs)
- ❌ `CommandBase` - MISSING (expected base class not found)
- ⚠️ `ICommandValidator` - STUB ONLY (interface exists, no real implementation)

**Gap Analysis**:
- **Missing Functionality**: Command validation framework
- **Mock vs Real**: Command validation is stubbed, not implemented
- **Technical Debt**: No consistent command base pattern
```

### 4. **Implementation Quality Assessment**

[[LLM: Evaluate quality of implementations against story requirements]]

**Step 4.1: Environment-Adaptive Real vs Mock Implementation Check**
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_SIMULATION_PATTERNS" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

echo "🔍 Environment-Adaptive Implementation Quality Check:"
echo "Language: $BMAD_PRIMARY_LANGUAGE | Simulation Patterns: $BMAD_SIMULATION_PATTERNS"

# For each component mentioned in completed stories:
for component in completed_story_components; do
    echo "Analyzing implementation type for: $component"
    
    if [ "$USE_IDE_TOOLS" = "true" ]; then
        echo "Using native IDE tools for implementation analysis"
        # Would use Grep tool with simulation patterns for mock detection
        # Would use Read tool for component implementation analysis
        implementation_content="native_content_analysis"
    else
        echo "Using CLI batch mode for implementation analysis (may require approval)"
        implementation_content=$(grep -A 10 -B 5 "$component" . -r --include="*.${BMAD_PRIMARY_LANGUAGE,,}" 2>/dev/null)
    fi
    
    # Analyze implementation type using language-specific simulation patterns
    simulation_patterns_found=$(echo "$implementation_content" | grep -E "$(echo "$BMAD_SIMULATION_PATTERNS" | tr ',' '|')" | wc -l)
    
    if [ "$simulation_patterns_found" -gt 3 ]; then
        implementation_type="MOCK"
        quality_score="VIOLATION - Mock in production ($simulation_patterns_found patterns found)"
    elif [ "$simulation_patterns_found" -gt 0 ]; then
        implementation_type="STUB"
        quality_score="INCOMPLETE - Stub implementation ($simulation_patterns_found patterns found)"
    else
        implementation_type="REAL"
        quality_score="COMPLIANT - Real implementation (no simulation patterns)"
    fi
    
    echo "Component: $component | Type: $implementation_type | Quality: $quality_score"
done
```

**Step 4.2: Environment-Adaptive Architecture Compliance Check**
```bash
# Auto-initialize environment detection if needed
if [ -z "$BMAD_COMPONENT_PATTERNS" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

echo "🏗️ Environment-Adaptive Architecture Compliance Check:"
echo "Language: $BMAD_PRIMARY_LANGUAGE | Component Patterns: $BMAD_COMPONENT_PATTERNS"

# For each story claiming architectural compliance:
for story in architectural_stories; do
    echo "Checking architectural compliance for story: $story"
    
    if [ "$USE_IDE_TOOLS" = "true" ]; then
        echo "Using native IDE tools for architecture analysis"
        # Would use Grep tool with component patterns for architecture verification
        # Would use Read tool for detailed component analysis
        pattern_compliance="native_pattern_check"
        security_compliance="native_security_check"
        performance_compliance="native_performance_check"
    else
        echo "Using CLI batch mode for architecture validation (may require approval)"
        # Check architectural patterns using language-specific component patterns
        component_pattern_regex=$(echo "$BMAD_COMPONENT_PATTERNS" | tr ',' '|')
        pattern_compliance=$(grep -E "$component_pattern_regex" "$story" | wc -l)
        security_compliance=$(grep -i "security\|auth\|encrypt" "$story" | wc -l)
        performance_compliance=$(grep -i "performance\|benchmark\|optimize" "$story" | wc -l)
    fi
    
    # Generate compliance report
    echo "Story: $story"
    echo "  - Pattern Compliance: $pattern_compliance expected patterns found"
    echo "  - Security Compliance: $security_compliance security considerations found"
    echo "  - Performance Compliance: $performance_compliance performance considerations found"
    
    # Overall compliance assessment
    if [ "$pattern_compliance" -gt 0 ]; then
        echo "  - Overall Assessment: ✅ Architecture patterns followed"
    else
        echo "  - Overall Assessment: ⚠️ Missing expected architectural patterns"
    fi
done
```

### 5. **Automated Audit Execution**

[[LLM: Create automated scripts to perform the audit systematically]]

**Step 5.1: Story Parser Script**
```python
def parse_story_file(story_path):
    """Parse story file and extract implementation requirements"""
    return {
        'id': extract_story_id(story_path),
        'status': extract_status(story_path),
        'file_list': extract_file_list(story_path),
        'components': extract_components(story_path),
        'acceptance_criteria': extract_acceptance_criteria(story_path),
        'tasks': extract_tasks(story_path)
    }
```

**Step 5.2: Codebase Scanner Script**
```python
def scan_codebase_for_story(story_requirements):
    """Scan codebase for story implementation evidence"""
    return {
        'existing_files': find_files(story_requirements.file_list),
        'missing_files': identify_missing_files(story_requirements.file_list),
        'implementation_status': analyze_implementations(story_requirements.components),
        'test_coverage': find_related_tests(story_requirements.components),
        'mock_vs_real': classify_implementation_type(story_requirements.components)
    }
```

### 6. **BMAD Integration & Auto-Remediation**

[[LLM: Leverage existing BMAD framework for automated gap resolution]]

**Step 6.1: Reality Audit Integration**
```bash
# For each implementation gap discovered:
for gap in detected_gaps:
    if gap.type == "MISSING_IMPLEMENTATION":
        execute_task("reality-audit-comprehensive.md", gap.story_id)
        reality_score = extract_reality_score(audit_results)
        if reality_score < 80:
            trigger_auto_remediation(gap)
```

**Step 6.2: Auto-Remediation Workflow**
```bash
# Automatically generate fix stories for gaps:
for critical_gap in gaps_requiring_fixes:
    remediation_story = execute_task("create-remediation-story.md", {
        "gap_description": critical_gap.description,
        "story_reference": critical_gap.original_story,
        "implementation_evidence": critical_gap.missing_components,
        "priority": calculate_dependency_impact(critical_gap)
    })
    present_completed_story(remediation_story)
```

**Step 6.3: Story Status Correction**
```bash
# Auto-update incorrect story statuses:
for story in mismatched_stories:
    if story.claimed_status == "Completed" and story.actual_status == "Partial":
        update_story_status(story.id, "Partially Implemented")
        add_gap_analysis_section(story.id, story.detected_gaps)
        log_status_correction(story.id, "Story-to-code audit correction")
```

**Step 6.4: Dependency Impact Analysis**
```bash
# Analyze cascading effects of implementation gaps:
for gap in critical_gaps:
    downstream_stories = find_dependent_stories(gap.story_id)
    for dependent_story in downstream_stories:
        if dependent_story.status == "Completed":
            validate_dependency_satisfaction(dependent_story, gap)
            if dependency_violated:
                flag_dependency_violation(dependent_story, gap)
                update_story_status(dependent_story.id, "Blocked - Dependency Gap")
                create_dependency_remediation_story(gap, dependent_story)
```

**Step 6.5: Test Coverage Validation**
```bash
# Cross-reference story acceptance criteria with actual tests:
for story in completed_stories:
    acceptance_criteria = extract_acceptance_criteria(story)
    related_tests = find_tests_for_story(story.id)
    coverage_gaps = analyze_test_coverage(acceptance_criteria, related_tests)
    if coverage_gaps.critical_count > 0:
        create_test_remediation_story(story, coverage_gaps)
```

### 7. **Report Generation**

[[LLM: Generate comprehensive reports showing story-to-code alignment]]

**Step 7.1: Executive Summary Report**
```markdown
# Project Story Implementation Audit Report
## Date: [current_date]

### Overall Health Score: [score]/100

**Summary Statistics**:
- Total Stories Audited: [count]
- Fully Implemented: [count] ([percentage]%)
- Partially Implemented: [count] ([percentage]%)
- Missing Implementation: [count] ([percentage]%)
- Mock/Stub Issues: [count] stories

**Critical Gaps Identified**:
1. [gap_description] - Impact: [high/medium/low]
2. [gap_description] - Impact: [high/medium/low]
```

**Step 7.2: Detailed Gap Analysis**
```markdown
## Detailed Story Implementation Analysis

### Epic 1 Stories

#### Story 1.1 - Enhanced Foundation ❌ IMPLEMENTATION GAP
**Status in Story**: Completed
**Reality**: Partially Implemented

**Expected Deliverables**:
- [ ] ✅ CLI command structure (IMPLEMENTED)
- [ ] ❌ Command validation framework (MISSING)
- [ ] ❌ Help system integration (STUB ONLY)

**Files Analysis**:
- ✅ `AnalyzeCommand.cs` - EXISTS, real implementation
- ❌ `CommandBase.cs` - MISSING, no base class pattern
- ⚠️ `ICommandValidator.cs` - EXISTS but stub implementation

**Impact**: Medium - Application works but lacks validation framework
**Recommendation**: Complete command validation or update story status
```

**Step 7.3: Auto-Generated Remediation Summary**
```markdown
## Recommendations

### Immediate Actions (High Priority)
1. **Story 1.2 - Core Discovery**: Complete missing ServiceWrapper implementation
2. **Story 1.6 - Licensing**: Replace mock license validation with real implementation
3. **Story 2.1 - Processing**: Remove simulation code, implement real data processing

### Technical Debt (Medium Priority)
1. **Command Framework**: Implement missing CommandBase pattern across application
2. **Validation Framework**: Complete stub implementations with real logic
3. **Test Coverage**: Add missing integration tests for completed stories

### Documentation Updates (Low Priority)
1. Update story status for partially implemented features
2. Document known technical debt in story notes
3. Create implementation roadmap for remaining gaps
```

## Output Deliverables

**This audit produces**:
1. **Cross-Reference Matrix** - Complete mapping of stories to code
2. **Gap Analysis Report** - Detailed analysis of missing implementations
3. **Implementation Quality Report** - Real vs Mock/Stub analysis
4. **Auto-Generated Remediation Stories** - Ready-to-implement fix stories for detected gaps
5. **Updated Story Statuses** - Corrected story statuses reflecting actual implementation state
6. **Dependency Impact Analysis** - Cascading effects of gaps on dependent stories
7. **Test Coverage Report** - Acceptance criteria to test case mapping
8. **Traceability Matrix** - Requirements to code mapping

## Success Criteria

**Audit is complete when**:
- [ ] All completed stories have been analyzed
- [ ] Every component mentioned in stories has been verified
- [ ] Implementation gaps have been quantified and prioritized
- [ ] **Auto-remediation stories generated** for all critical gaps
- [ ] **Story statuses corrected** to reflect actual implementation state
- [ ] **Dependency impact analysis** completed for all gaps
- [ ] **Test coverage validation** performed for acceptance criteria
- [ ] Traceability matrix covers all requirements
- [ ] **Ready-to-implement fix stories** presented to development team

## Blocking Conditions

**HALT if**:
- Large percentage of "completed" stories have major gaps
- Critical security/performance components are mock implementations
- Story status doesn't match implementation reality
- Architectural standards are violated in "completed" work

## Usage Instructions

**To execute this audit**:
1. Run story discovery to identify all completed stories
2. Execute codebase scanning for each story's requirements
3. Generate cross-reference matrix and gap analysis
4. **Auto-execute reality audits** for detected implementation gaps
5. **Auto-generate remediation stories** using create-remediation-story.md task
6. **Auto-correct story statuses** to reflect actual implementation state
7. **Analyze dependency impacts** and flag blocked dependent stories
8. **Validate test coverage** against story acceptance criteria
9. Present completed remediation stories and corrected project state