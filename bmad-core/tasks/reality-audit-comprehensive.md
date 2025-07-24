# Reality Audit Comprehensive

## Task Overview

Comprehensive reality audit that systematically detects simulation patterns, validates real implementation, and provides objective scoring to prevent "bull in a china shop" completion claims. This consolidated framework combines automated detection, manual validation, and enforcement gates.

## Context

This enhanced audit provides QA agents with systematic tools to distinguish between real implementation and simulation-based development. It enforces accountability by requiring evidence-based assessment rather than subjective evaluation, consolidating all reality validation capabilities into a single comprehensive framework.

## Execution Approach

**CRITICAL INTEGRATION VALIDATION WITH REGRESSION PREVENTION** - This framework addresses both simulation mindset and regression risks. Be brutally honest about what is REAL vs SIMULATED, and ensure no functionality loss or technical debt introduction.

1. **Execute automated simulation detection** (Phase 1)
2. **Perform build and runtime validation** (Phase 2)
3. **Execute story context analysis** (Phase 3) - NEW
4. **Assess regression risks** (Phase 4) - NEW  
5. **Evaluate technical debt impact** (Phase 5) - NEW
6. **Perform manual validation checklist** (Phase 6)
7. **Calculate comprehensive reality score** (Phase 7) - ENHANCED
8. **Apply enforcement gates** (Phase 8)
9. **Generate regression-safe remediation** (Phase 9) - ENHANCED

The goal is ZERO simulations AND ZERO regressions in critical path code.

---

## Phase 1: Environment Initialization and Simulation Detection

### Auto-Detection System Initialization

Initialize language and IDE environment using existing BMAD auto-detection framework:

**Step 1: Initialize Environment (if not already done)**
- Use Read tool to execute: `bmad-core/tasks/auto-language-init.md`
- Use Read tool to execute: `bmad-core/tasks/lightweight-ide-detection.md`
- This sets up cached environment variables for language and IDE detection

**Step 2: Load Environment Variables**
- Load `$BMAD_PRIMARY_LANGUAGE`, `$BMAD_BUILD_COMMAND`, `$BMAD_SIMULATION_PATTERNS`
- Load `$USE_IDE_TOOLS`, `$BATCH_COMMANDS` flags from IDE detection
- Create audit report file in tmp directory

**Step 3: Create Audit Report Header**
```
=== REALITY AUDIT COMPREHENSIVE SCAN ===
Audit Date: [Current Date]
Auditor: [QA Agent Name]
Project Language: $BMAD_PRIMARY_LANGUAGE
IDE Environment: [Detected IDE]
Execution Mode: [Native Tools/Batched CLI]
```

### Simulation Pattern Detection Using Claude Code CLI Tools

**Execute Pattern Detection (Environment-Aware):**

Use the language-specific simulation patterns from `$BMAD_SIMULATION_PATTERNS` and appropriate file extensions from `$BMAD_FILE_EXTENSIONS`.

**Pattern Detection Methodology:**

1. **Use Grep Tool for All Pattern Searches** (Native Claude Code CLI):
   - Set `output_mode: "count"` to get pattern counts for scoring
   - Set `output_mode: "content"` with `-n` flag to get specific instances
   - Use `glob` parameter with `$BMAD_FILE_EXTENSIONS` to filter appropriate files
   - Search in source directories using intelligent path detection

2. **Language-Specific Pattern Detection:**
   - **Primary Patterns**: Use `$BMAD_SIMULATION_PATTERNS` from auto-detection
   - **Universal Patterns**: `TODO:|FIXME:|HACK:|XXX:|BUG:` (always checked)
   - **Critical Patterns**: NotImplementedException, unimplemented!, panic! patterns

3. **Pattern Categories with Grep Tool Usage:**

   **A. Critical Implementation Gaps:**
   ```
   Grep Tool Parameters:
   - pattern: "NotImplementedException|todo!|unimplemented!|panic!|raise NotImplementedError"
   - glob: [Use $BMAD_FILE_EXTENSIONS]
   - output_mode: "count" (for scoring) then "content" (for details)
   ```

   **B. Language-Specific Simulation Patterns:**
   ```
   Grep Tool Parameters:
   - pattern: [Use $BMAD_SIMULATION_PATTERNS]
   - glob: [Use $BMAD_FILE_EXTENSIONS] 
   - output_mode: "count" then "content"
   ```

   **C. Development Artifacts:**
   ```
   Grep Tool Parameters:
   - pattern: "TODO:|FIXME:|HACK:|XXX:|BUG:"
   - glob: [Use $BMAD_FILE_EXTENSIONS]
   - output_mode: "count" then "content"
   ```

**Pattern Count Variables for Scoring:**
- CRITICAL_IMPL_COUNT (NotImplementedException, etc.)
- SIMULATION_PATTERN_COUNT (from $BMAD_SIMULATION_PATTERNS)
- TODO_COMMENT_COUNT (TODO, FIXME, etc.)
- Calculate TOTAL_SIMULATION_SCORE based on weighted counts

## Phase 2: Environment-Adaptive Build and Runtime Validation

**Auto-Initialize Environment Detection (if not already done):**
```
# Ensure environment detection is loaded
if [ -z "$BMAD_BUILD_COMMAND" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

if [ -z "$USE_IDE_TOOLS" ]; then
  Read tool: bmad-core/tasks/lightweight-ide-detection.md
fi
```

**Environment-Adaptive Build Validation:**

**Step 1: Display Environment Context**
```
echo "🔧 Environment-Adaptive Build Validation:"
echo "Environment: $DETECTED_IDE | Language: $BMAD_PRIMARY_LANGUAGE"
echo "Build Command: $BMAD_BUILD_COMMAND"
echo "Tools Mode: $([ "$USE_IDE_TOOLS" = "true" ] && echo "Native IDE integration" || echo "CLI batch mode")"
```

**Step 2: Execute Build Using Environment-Appropriate Method**
```
if [ "$USE_IDE_TOOLS" = "true" ]; then
  echo "Using native IDE integration for build validation"
  # Use Bash tool with clear description for build command
  BUILD_OUTPUT=$($BMAD_BUILD_COMMAND 2>&1)
  BUILD_EXIT_CODE=$?
else
  echo "Using CLI batch mode for build validation (may require approval)"
  # Traditional CLI approach
  BUILD_OUTPUT=$($BMAD_BUILD_COMMAND 2>&1)
  BUILD_EXIT_CODE=$?
fi

echo "Build Exit Code: $BUILD_EXIT_CODE"
```

**Step 3: Analyze Build Results Using Native Tools**
```
# Use Grep tool to analyze build output for errors
if [ "$USE_IDE_TOOLS" = "true" ]; then
  echo "Analyzing build results using native IDE tools"
  # Would use Grep tool with error patterns from $BMAD_ERROR_PATTERNS
  # Would use Read tool for detailed error analysis
else
  # Traditional CLI analysis
  ERROR_COUNT=$(echo "$BUILD_OUTPUT" | grep -c "error" || echo 0)
  WARNING_COUNT=$(echo "$BUILD_OUTPUT" | grep -c "warning" || echo 0)
fi
```

**Runtime Validation (Simplified):**
- Use `$BMAD_TEST_COMMAND` if available for runtime testing
- Focus on basic startup/compilation validation rather than complex integration tests
- Avoid timeout-based execution which can cause approval prompts

**Integration Testing Assessment:**
- Use Read tool to examine configuration files for external dependencies
- Use Grep tool to scan source code for database/API integration patterns
- Document integration points without attempting live connections
- Focus on code analysis rather than runtime integration testing

## Phase 3: Story Context Analysis (Using Claude Code CLI Tools)

### Previous Implementation Pattern Learning

Use Claude Code CLI tools for story analysis without bash scripting:

**Story Directory Discovery:**
- Use LS tool to check for common story directories: `docs/stories`, `stories`, `.bmad/stories`
- Use Glob tool with pattern `**/*story*.md` to find story files project-wide

**Completed Stories Analysis:**
- Use Grep tool to find completed stories:
  ```
  pattern: "Status.*Complete|Status.*Ready for Review|status.*complete"
  glob: "**/*.md"
  output_mode: "files_with_matches"
  ```

**Pattern Extraction from Stories:**
- Use Grep tool to extract technical patterns from completed stories:
  ```
  pattern: "Technical|Implementation|Approach|Pattern|Architecture"
  output_mode: "content"
  -A: 3
  -B: 1
  ```

**File Change Pattern Analysis:**
- Use Grep tool to find file modification patterns:
  ```
  pattern: "File List|Files Modified|Files Added|Change Log"
  output_mode: "content"
  -A: 10
  ```

**Results Documentation:**
- Compile findings into audit report sections
- Calculate pattern consistency scores
- Identify architectural decision compliance

### Architectural Decision Learning (Native Tools)

**Extract Architectural Decisions Using Grep Tool:**

**Architecture Patterns Search:**
```
Grep tool parameters:
- pattern: "architect|pattern|design|structure|framework"
- glob: "**/*.md"
- output_mode: "content"
- -n: true (show line numbers)
- -A: 3, -B: 1 (context lines)
```

**Technology Choices Search:**
```
Grep tool parameters:
- pattern: "technology|framework|library|dependency|stack"
- glob: "**/*.md" 
- output_mode: "content"
- -n: true
- -A: 2, -B: 1
```

**Pattern Compliance Assessment:**
- Compare current implementation against discovered patterns
- Calculate architectural consistency scores
- Document compliance in audit report
- Set scoring variables: PATTERN_COMPLIANCE_SCORE, ARCHITECTURAL_CONSISTENCY_SCORE

## Phase 4: Regression Risk Assessment (Environment-Aware)

### Functional Regression Analysis Using Native Tools

**Git History Analysis (if git repository detected):**

**Recent Functional Changes:**
- Use Bash tool to execute git commands in IDE environment
- Command: `git log --oneline -20 --grep="feat|fix|refactor|break"`
- Document functional changes that could impact current work

**Modified Files Analysis:**
- Use Bash tool: `git diff --name-only HEAD~5..HEAD`
- Identify recently changed files for impact assessment

**File Impact Assessment Using Grep Tool:**

For each modified file, use language-specific analysis:

**Public Interface Analysis:**
```
Grep tool parameters (per file):
- C#: pattern: "public.*class|public.*interface|public.*method"
- TypeScript/JavaScript: pattern: "export|module\.exports|public"
- Java: pattern: "public.*class|public.*interface|public.*method"
- Python: pattern: "def |class |from.*import"
- Use appropriate file-specific search with Read tool
```

**Dependency Impact Analysis:**
- Use Grep tool to find import/using statements in modified files
- Assess downstream impact of changes
- Calculate regression risk scores based on interface changes

**Results:**
- Set REGRESSION_RISK_SCORE based on analysis
- Document high-risk changes in audit report

### Integration Point Analysis (Using Claude Code CLI Tools)

**External Dependencies Analysis:**

Use language-specific dependency analysis with Read and Grep tools:

**C# Projects:**
- Use Glob tool with pattern `**/*.csproj` to find project files
- Use Read tool to examine project files for PackageReference/ProjectReference
- Use Grep tool: pattern "PackageReference|ProjectReference", glob "**/*.csproj"

**Node.js Projects:**
- Use Read tool to examine package.json for dependencies
- Use Grep tool to find dependency sections in package files

**Java Projects:**
- Use Glob tool: pattern `**/pom.xml` or `**/build.gradle`
- Use Grep tool: pattern "<dependency>|implementation|compile"

**Database Integration Assessment:**
```
Grep tool parameters:
- pattern: "connection|database|sql|query|repository"
- glob: [Use $BMAD_FILE_EXTENSIONS]
- output_mode: "content"
- head_limit: 10
```

**API Integration Assessment:**
```
Grep tool parameters:
- pattern: "http|api|endpoint|service|client"
- glob: [Use $BMAD_FILE_EXTENSIONS]
- output_mode: "content" 
- head_limit: 10
```

**Results Documentation:**
- Compile integration points into audit report
- Assess integration complexity and risk factors

## Phase 5: Technical Debt Impact Assessment (Simplified)

### Code Quality Analysis Using Native Tools

**File Complexity Assessment:**

Use Glob and Read tools for complexity analysis:

**Large File Detection:**
- Use Glob tool with pattern from `$BMAD_FILE_EXTENSIONS`
- Use Read tool to assess file sizes and complexity
- Focus on files with excessive length (>500 lines) as complexity indicators

**Code Smell Detection Using Grep Tool:**

**Long Method Detection:**
```
Grep tool parameters:
- pattern: "function.*{|public.*{|def |class.*{"
- glob: [Use $BMAD_FILE_EXTENSIONS]
- output_mode: "count"
```

**Code Duplication Indicators:**
```
Grep tool parameters:
- pattern: "copy.*of|duplicate|clone|TODO.*similar"
- glob: [Use $BMAD_FILE_EXTENSIONS] 
- output_mode: "content"
```

**Maintainability Issues:**
```
Grep tool parameters:
- pattern: "HACK|FIXME|XXX|REFACTOR|CLEANUP"
- glob: [Use $BMAD_FILE_EXTENSIONS]
- output_mode: "count"
```

**Technical Debt Scoring:**
- Calculate TECHNICAL_DEBT_SCORE based on:
  - File complexity metrics
  - Code smell density
  - Maintenance comment frequency
  - Duplication indicators
- Use weighted scoring algorithm
- Document findings in audit report

### Architecture Consistency Check (Results-Based)

**Pattern Consistency Assessment:**

Based on results from Phase 3 story analysis:

**Current Implementation Analysis:**
- Compare current code patterns against discovered architectural decisions
- Assess technology choice consistency with established stack
- Evaluate integration approach alignment with previous patterns

**Consistency Scoring:**
- Calculate pattern compliance based on story analysis results
- Assess architectural decision adherence
- Measure technology choice consistency
- Set PATTERN_CONSISTENCY_ISSUES and ARCHITECTURAL_VIOLATIONS counts

**Technical Debt Prevention Recommendations:**
- Document specific patterns that should be followed
- List architectural decisions that must be maintained
- Identify code quality standards from previous implementations
- Provide actionable guidance for consistency

## Phase 6: Manual Validation Checklist

### End-to-End Integration Proof

**Prove the entire data path works with real applications:**

- [ ] **Real Application Test**: Code tested with actual target application
- [ ] **Real Data Flow**: Actual data flows through all components (not test data)
- [ ] **Real Environment**: Testing performed in target environment (not dev simulation)
- [ ] **Real Performance**: Measurements taken on actual target hardware
- [ ] **Real Error Conditions**: Tested with actual failure scenarios

**Evidence Required:**
- [ ] Screenshot/log of real application running with your changes
- [ ] Performance measurements from actual hardware
- [ ] Error logs from real failure conditions

### Dependency Reality Check

**Ensure all dependencies are real, not mocked:**

- [ ] **No Critical Mocks**: Zero mock implementations in production code path
- [ ] **Real External Services**: All external dependencies use real implementations
- [ ] **Real Hardware Access**: Operations use real hardware
- [ ] **Real IPC**: Inter-process communication uses real protocols, not simulation

**Mock Inventory:**
- [ ] List all mocks/simulations remaining: ________________
- [ ] Each mock has replacement timeline: ________________
- [ ] Critical path has zero mocks: ________________

### Performance Reality Validation

**All performance claims must be backed by real measurements:**

- [ ] **Measured Throughput**: Actual data throughput measured under load
- [ ] **Cross-Platform Parity**: Performance verified on both Windows/Linux
- [ ] **Real Timing**: Stopwatch measurements, not estimates
- [ ] **Memory Usage**: Real memory tracking, not calculated estimates

**Performance Evidence:**
- [ ] Benchmark results attached to story
- [ ] Performance within specified bounds
- [ ] No performance regressions detected

### Data Flow Reality Check

**Verify real data movement through system:**

- [ ] **Database Operations**: Real connections tested
- [ ] **File Operations**: Real files read/written
- [ ] **Network Operations**: Real endpoints contacted
- [ ] **External APIs**: Real API calls made

### Error Handling Reality

**Exception handling must be proven, not assumed:**

- [ ] **Real Exception Types**: Actual exceptions caught and handled
- [ ] **Retry Logic**: Real retry mechanisms tested
- [ ] **Circuit Breaker**: Real failure detection verified
- [ ] **Recovery**: Actual recovery times measured

## Phase 7: Comprehensive Reality Scoring (Environment-Aware Calculation)

### Calculate Comprehensive Reality Score

**Component Score Calculation:**

**Initialize Base Scores:**
- SIMULATION_SCORE = 100
- REGRESSION_PREVENTION_SCORE = 100 
- TECHNICAL_DEBT_SCORE = 100

**Simulation Pattern Scoring:**
Deduct points based on pattern detection results:
- Critical Implementation Gaps: CRITICAL_IMPL_COUNT × 30 points
- Language-Specific Simulation Patterns: SIMULATION_PATTERN_COUNT × 20 points  
- TODO Comments: TODO_COMMENT_COUNT × 5 points
- Build failures: 50 points (if BUILD_EXIT_CODE ≠ 0)
- Compilation errors: ERROR_COUNT × 10 points

**Regression Prevention Scoring:**
Deduct points based on consistency analysis:
- Pattern consistency issues: PATTERN_CONSISTENCY_ISSUES × 15 points
- Architectural violations: ARCHITECTURAL_VIOLATIONS × 20 points
- Integration risks: Based on dependency analysis

**Technical Debt Scoring:**
Deduct points based on code quality analysis:
- Code complexity issues: Based on file size and method complexity
- Maintainability problems: Based on code smell detection
- Architectural inconsistencies: ARCHITECTURAL_CONSISTENCY_SCORE deduction

**Composite Reality Score Calculation:**
```
Weighted Components:
- Simulation Reality: 40%
- Regression Prevention: 35% 
- Technical Debt Prevention: 25%

COMPOSITE_REALITY_SCORE = 
  (SIMULATION_SCORE × 0.40) + 
  (REGRESSION_PREVENTION_SCORE × 0.35) + 
  (TECHNICAL_DEBT_SCORE × 0.25)
```

**Reality Scoring Matrix Documentation:**
Create detailed scoring breakdown table showing:
- Pattern types found and counts
- Score impact per pattern type
- Points deducted per category
- Final composite score

**Final Score:** Set REALITY_SCORE = COMPOSITE_REALITY_SCORE for compatibility

### Score Interpretation and Enforcement

**Grade Assignment Logic:**

Based on COMPOSITE_REALITY_SCORE:
- 90-100: Grade A (EXCELLENT) → APPROVED FOR COMPLETION
- 80-89: Grade B (GOOD) → APPROVED FOR COMPLETION  
- 70-79: Grade C (ACCEPTABLE) → REQUIRES MINOR REMEDIATION
- 60-69: Grade D (POOR) → REQUIRES MAJOR REMEDIATION
- 0-59: Grade F (UNACCEPTABLE) → BLOCKED - RETURN TO DEVELOPMENT

**Results Documentation:**
```
Reality Assessment Results:
- Grade: [A/B/C/D/F] ([REALITY_SCORE]/100)
- Status: [EXCELLENT/GOOD/ACCEPTABLE/POOR/UNACCEPTABLE]
- Action: [Appropriate action based on grade]
```

**Quality Gate Enforcement:**
- Document assessment in audit report
- Set appropriate remediation flags for downstream processing
- Provide clear guidance on next steps based on score

## Phase 8: Enforcement Gates

### Enhanced Quality Gates (All Must Pass)

- [ ] **Build Success**: Build command returns 0 errors
- [ ] **Runtime Success**: Application starts and responds to requests
- [ ] **Data Flow Success**: Real data moves through system without simulation
- [ ] **Integration Success**: External dependencies accessible and functional
- [ ] **Performance Success**: Real measurements obtained, not estimates
- [ ] **Contract Compliance**: Zero architectural violations
- [ ] **Simulation Score**: Simulation reality score ≥ 80 (B grade or better)
- [ ] **Regression Prevention**: Regression prevention score ≥ 80 (B grade or better)
- [ ] **Technical Debt Prevention**: Technical debt score ≥ 70 (C grade or better)
- [ ] **Composite Reality Score**: Overall score ≥ 80 (B grade or better)

## Phase 9: Automated Remediation Decision (Simplified)

**Remediation Decision Logic:**

**Check Remediation Criteria:**
- Reality score below 80: REMEDIATION_NEEDED = true
- Build failures detected: REMEDIATION_NEEDED = true  
- Critical simulation patterns > 3: REMEDIATION_NEEDED = true

**Story Scope Analysis (if current story file available):**
- Use Grep tool to count tasks and subtasks in story file
- Check for oversized stories (>8 tasks or >25 subtasks)
- Detect mixed concerns (implementation + integration)
- Set SCOPE_REMEDIATION_NEEDED flag accordingly

**Auto-Remediation Execution:**

If remediation needed:
1. **Document Remediation Decision** in audit report
2. **Export Environment Variables** for remediation tools:
   - REALITY_SCORE, BUILD_EXIT_CODE, ERROR_COUNT
   - Pattern counts and issue classifications
   - Scope analysis results

3. **Execute Remediation** (in Claude Code CLI environment):
   - **Use Read tool** to execute `create-remediation-story.md` task
   - Generate surgical remediation stories based on specific issues found
   - Create scope-appropriate stories if needed

4. **Document Results:**
   - List generated remediation stories
   - Provide clear next steps for user
   - Recommend optimal approach (surgical vs comprehensive)

**Success Path (No Remediation Needed):**
- Document successful completion
- Show final scores and status
- Mark audit as complete
- Provide audit report location

**Audit Completion:**
- Generate comprehensive audit report
- Document all findings and scores
- Provide clear action items based on results

## Phase 10: User Options Presentation (Clean Format)

**Present Clear Options Based on Audit Results:**

**Grade A (90-100): EXCELLENT QUALITY**
- **Option 1: Mark Complete & Continue (Recommended)**
  - All quality gates passed
  - Ready for production deployment
  - Action: Set story status to 'Complete'
- **Option 2: Optional Enhancements**
  - Consider performance optimization
  - Add additional edge case testing
  - Enhance documentation

**Grade B (80-89): GOOD QUALITY**
- **Option 1: Accept Current State (Recommended)**
  - Passes quality gates (≥80)
  - Ready for development continuation
- **Option 2: Push to Grade A (Optional)**
  - Address minor simulation patterns
  - Estimated effort: 30-60 minutes
- **Option 3: Document & Continue**
  - Document known limitations
  - Add to technical debt backlog

**Grade C (70-79): REQUIRES ATTENTION**
- **Option 1: Quick Fixes (Recommended)**
  - Address critical simulation patterns
  - Estimated effort: 1-2 hours
  - Target: Reach 80+ to pass quality gates
- **Option 2: Split Story Approach**
  - Mark implementation complete (if code is good)
  - Create follow-up story for integration/testing issues
- **Option 3: Accept Technical Debt**
  - Document known issues clearly
  - Schedule for future resolution

**Grade D/F (0-69): SIGNIFICANT ISSUES**
- **Option 1: Execute Auto-Remediation (Recommended)**
  - Automatic remediation story generated
  - Process: Fix issues → Re-audit → Repeat until score ≥80
- **Option 2: Major Refactor Approach**
  - Significant rework required
  - Estimated effort: 4-8 hours
- **Option 3: Restart with New Approach**
  - Consider different technical approach
  - Review architectural decisions

**Immediate Next Commands:**

**If Quality Gates Passed (≥80):**
- No immediate action required
- Consider: Mark story complete
- Optional: Use available agent commands for additional work

**If Remediation Required (<80):**
- Recommended: Execute remediation process
- Alternative: Manual remediation approach
- After fixes: Re-run *reality-audit to validate improvements

**Recommended Approach Summary:**
- Grade A: Excellent work! Mark complete and continue
- Grade B: Good quality. Accept current state or minor improvements
- Grade C: Quick fixes recommended. 1-2 hours of work to reach quality gates
- Grade D/F: Major issues found. Use systematic fix approach

**Questions?** Ask your QA agent: 'What should I do next?' or 'Which option do you recommend?'

## Definition of "Actually Complete"

### Quality Gates (All Must Pass)

- [ ] **Build Success**: Build command returns 0 errors
- [ ] **Runtime Success**: Application starts and responds to requests
- [ ] **Data Flow Success**: Real data moves through system without simulation
- [ ] **Integration Success**: External dependencies accessible and functional
- [ ] **Performance Success**: Real measurements obtained, not estimates
- [ ] **Contract Compliance**: Zero architectural violations
- [ ] **Simulation Score**: Reality score ≥ 80 (B grade or better)

### Final Assessment Options

- [ ] **APPROVED FOR COMPLETION:** All criteria met, reality score ≥ 80
- [ ] **REQUIRES REMEDIATION:** Simulation patterns found, reality score < 80  
- [ ] **BLOCKED:** Build failures or critical simulation patterns prevent completion

### Variables Available for Integration

The following variables are exported for use by other tools:

```bash
# Core scoring variables
REALITY_SCORE=[calculated score 0-100]
BUILD_EXIT_CODE=[build command exit code]
ERROR_COUNT=[compilation error count]
RUNTIME_EXIT_CODE=[runtime command exit code]

# Pattern detection counts
RANDOM_COUNT=[Random.NextDouble instances]
TASK_MOCK_COUNT=[Task.FromResult instances]  
NOT_IMPL_COUNT=[NotImplementedException instances]
TODO_COUNT=[TODO comment count]
TOTAL_SIM_COUNT=[total simulation method count]

# Project context
PROJECT_NAME=[detected project name]
PROJECT_SRC_PATH=[detected source path]
PROJECT_FILE_EXT=[detected file extensions]
BUILD_CMD=[detected build command]
RUN_CMD=[detected run command]
```

---

## Summary

This comprehensive reality audit combines automated simulation detection, manual validation, objective scoring, and enforcement gates into a single cohesive framework. It prevents "bull in a china shop" completion claims by requiring evidence-based assessment and automatically triggering remediation when quality standards are not met.

**Key Features:**
- **Universal project detection** across multiple languages/frameworks
- **Automated simulation pattern scanning** with 6 distinct pattern types
- **Objective reality scoring** with clear grade boundaries (A-F)
- **Manual validation checklist** for human verification
- **Enforcement gates** preventing completion of poor-quality implementations
- **Automatic remediation triggering** when issues are detected
- **Comprehensive evidence documentation** for audit trails

**Integration Points:**
- Exports standardized variables for other BMAD tools
- Triggers create-remediation-story.md when needed
- Provides audit reports for documentation
- Supports all major project types and build systems
- **Automatic Git Push on Perfect Completion** when all criteria are met

---

## Git Integration (Optional)

**Automatic Git Push Assessment:**

The reality audit can optionally assess git push readiness based on:
- Story completion status (if story file available)
- Quality score thresholds (Composite ≥80, Regression ≥80, TechDebt ≥70)
- Build success status
- Zero simulation patterns detected

**Git Push Criteria Validation:**

Create git push validation report documenting:
- All quality criteria assessment
- Build and runtime status
- Simulation pattern analysis
- Final push recommendation

**Integration Options:**
1. **Automatic Assessment Only:** Document push readiness without executing
2. **Manual Override Available:** Provide clear guidance for manual git operations
3. **Quality-Based Recommendations:** Suggest appropriate git workflow based on scores

**Usage Notes:**
- Git operations should use appropriate agent commands (*Push2Git, etc.)
- Focus on assessment and recommendation rather than automatic execution
- Provide clear criteria documentation for user decision-making