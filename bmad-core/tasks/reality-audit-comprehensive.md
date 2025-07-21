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

## Phase 1: Automated Simulation Detection

### Project Structure Detection

Execute these commands systematically and document all findings:

```bash
#!/bin/bash
echo "=== REALITY AUDIT COMPREHENSIVE SCAN ==="
echo "Audit Date: $(date)"
echo "Auditor: [QA Agent Name]"
echo ""

# Detect project structure dynamically
if find . -maxdepth 3 -name "*.sln" -o -name "*.csproj" | head -1 | grep -q .; then
    # .NET Project
    if [ -d "src" ]; then
        PROJECT_SRC_PATH="src"
        PROJECT_FILE_EXT="*.cs"
    else
        PROJECT_SRC_PATH=$(find . -maxdepth 3 -name "*.csproj" -exec dirname {} \; | head -1)
        PROJECT_FILE_EXT="*.cs"
    fi
    PROJECT_NAME=$(find . -maxdepth 3 -name "*.csproj" | head -1 | xargs basename -s .csproj)
    BUILD_CMD="dotnet build -c Release --no-restore"
    RUN_CMD="dotnet run --no-build"
    ERROR_PATTERN="error CS"
    WARN_PATTERN="warning CS"
elif [ -f "package.json" ]; then
    # Node.js Project
    PROJECT_SRC_PATH=$([ -d "src" ] && echo "src" || echo ".")
    PROJECT_FILE_EXT="*.js *.ts *.jsx *.tsx"
    PROJECT_NAME=$(grep '"name"' package.json | sed 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' | head -1)
    BUILD_CMD=$(grep -q '"build"' package.json && echo "npm run build" || echo "npm install")
    RUN_CMD=$(grep -q '"start"' package.json && echo "npm start" || echo "node index.js")
    ERROR_PATTERN="ERROR"
    WARN_PATTERN="WARN"
elif [ -f "pom.xml" ] || [ -f "build.gradle" ]; then
    # Java Project
    PROJECT_SRC_PATH=$([ -d "src/main/java" ] && echo "src/main/java" || echo "src")
    PROJECT_FILE_EXT="*.java"
    PROJECT_NAME=$(basename "$(pwd)")
    BUILD_CMD=$([ -f "pom.xml" ] && echo "mvn compile" || echo "gradle build")
    RUN_CMD=$([ -f "pom.xml" ] && echo "mvn exec:java" || echo "gradle run")
    ERROR_PATTERN="ERROR"
    WARN_PATTERN="WARNING"
elif [ -f "Cargo.toml" ]; then
    # Rust Project
    PROJECT_SRC_PATH="src"
    PROJECT_FILE_EXT="*.rs"
    PROJECT_NAME=$(grep '^name' Cargo.toml | sed 's/name[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/' | head -1)
    BUILD_CMD="cargo build --release"
    RUN_CMD="cargo run"
    ERROR_PATTERN="error"
    WARN_PATTERN="warning"
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ]; then
    # Python Project
    PROJECT_SRC_PATH=$([ -d "src" ] && echo "src" || echo ".")
    PROJECT_FILE_EXT="*.py"
    PROJECT_NAME=$(basename "$(pwd)")
    BUILD_CMD="python -m py_compile **/*.py"
    RUN_CMD="python main.py"
    ERROR_PATTERN="ERROR"
    WARN_PATTERN="WARNING"
elif [ -f "go.mod" ]; then
    # Go Project
    PROJECT_SRC_PATH="."
    PROJECT_FILE_EXT="*.go"
    PROJECT_NAME=$(head -1 go.mod | awk '{print $2}' | sed 's/.*\///')
    BUILD_CMD="go build ./..."
    RUN_CMD="go run ."
    ERROR_PATTERN="error"
    WARN_PATTERN="warning"
else
    # Generic fallback
    PROJECT_SRC_PATH=$([ -d "src" ] && echo "src" || echo ".")
    PROJECT_FILE_EXT="*"
    PROJECT_NAME=$(basename "$(pwd)")
    BUILD_CMD="make"
    RUN_CMD="./main"
    ERROR_PATTERN="error"
    WARN_PATTERN="warning"
fi

echo "Project: $PROJECT_NAME"
echo "Source Path: $PROJECT_SRC_PATH"
echo "File Extensions: $PROJECT_FILE_EXT"
echo "Build Command: $BUILD_CMD"
echo "Run Command: $RUN_CMD"
echo ""

# Create audit report file
AUDIT_REPORT="reality-audit-$(date +%Y%m%d-%H%M).md"
echo "# Reality Audit Report" > $AUDIT_REPORT
echo "Date: $(date)" >> $AUDIT_REPORT
echo "Project: $PROJECT_NAME" >> $AUDIT_REPORT
echo "Source Path: $PROJECT_SRC_PATH" >> $AUDIT_REPORT
echo "" >> $AUDIT_REPORT
```

### Simulation Pattern Detection

```bash
echo "=== SIMULATION PATTERN DETECTION ===" | tee -a $AUDIT_REPORT

# Pattern 1: Random data generation
echo "" >> $AUDIT_REPORT
echo "## Random Data Generation Patterns" >> $AUDIT_REPORT
echo "Random data generation:" | tee -a $AUDIT_REPORT
for ext in $PROJECT_FILE_EXT; do
    grep -r "Random\.|Math\.random|random\(\)|rand\(\)" "$PROJECT_SRC_PATH/" --include="$ext" -n 2>/dev/null | tee -a $AUDIT_REPORT || true
done
RANDOM_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "Random\.|Math\.random|random\(\)|rand\(\)" {} \; 2>/dev/null | wc -l)
echo "**Count:** $RANDOM_COUNT instances" | tee -a $AUDIT_REPORT

# Pattern 2: Mock async operations  
echo "" >> $AUDIT_REPORT
echo "## Mock Async Operations" >> $AUDIT_REPORT
echo "Mock async operations:" | tee -a $AUDIT_REPORT
for ext in $PROJECT_FILE_EXT; do
    grep -r "Task\.FromResult|Promise\.resolve|async.*return.*mock|await.*mock" "$PROJECT_SRC_PATH/" --include="$ext" -n 2>/dev/null | tee -a $AUDIT_REPORT || true
done
TASK_MOCK_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "Task\.FromResult|Promise\.resolve" {} \; 2>/dev/null | wc -l)
echo "**Count:** $TASK_MOCK_COUNT instances" | tee -a $AUDIT_REPORT

# Pattern 3: Unimplemented methods
echo "" >> $AUDIT_REPORT
echo "## Unimplemented Methods" >> $AUDIT_REPORT
echo "Unimplemented methods:" | tee -a $AUDIT_REPORT
for ext in $PROJECT_FILE_EXT; do
    grep -r "NotImplementedException|todo!|unimplemented!|panic!|raise NotImplementedError|NotImplemented" "$PROJECT_SRC_PATH/" --include="$ext" -n 2>/dev/null | tee -a $AUDIT_REPORT || true
done
NOT_IMPL_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "NotImplementedException|todo!|unimplemented!|panic!|raise NotImplementedError" {} \; 2>/dev/null | wc -l)
echo "**Count:** $NOT_IMPL_COUNT instances" | tee -a $AUDIT_REPORT

# Pattern 4: TODO comments
echo "" >> $AUDIT_REPORT
echo "## TODO Comments" >> $AUDIT_REPORT
echo "TODO comments in critical path:" | tee -a $AUDIT_REPORT
for ext in $PROJECT_FILE_EXT; do
    grep -r "TODO:|FIXME:|HACK:|XXX:|BUG:" "$PROJECT_SRC_PATH/" --include="$ext" -n 2>/dev/null | tee -a $AUDIT_REPORT || true
done
TODO_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "TODO:|FIXME:|HACK:|XXX:|BUG:" {} \; 2>/dev/null | wc -l)
echo "**Count:** $TODO_COUNT instances" | tee -a $AUDIT_REPORT

# Pattern 5: Simulation methods
echo "" >> $AUDIT_REPORT  
echo "## Simulation Methods" >> $AUDIT_REPORT
echo "Simulation methods:" | tee -a $AUDIT_REPORT
for ext in $PROJECT_FILE_EXT; do
    grep -r "Simulate.*\(|Mock.*\(|Fake.*\(|Stub.*\(|dummy.*\(" "$PROJECT_SRC_PATH/" --include="$ext" -n 2>/dev/null | tee -a $AUDIT_REPORT || true
done
SIMULATE_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "Simulate.*\(" {} \; 2>/dev/null | wc -l)
MOCK_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "Mock.*\(" {} \; 2>/dev/null | wc -l)
FAKE_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "Fake.*\(" {} \; 2>/dev/null | wc -l)
TOTAL_SIM_COUNT=$((SIMULATE_COUNT + MOCK_COUNT + FAKE_COUNT))
echo "**Count:** $TOTAL_SIM_COUNT instances (Simulate: $SIMULATE_COUNT, Mock: $MOCK_COUNT, Fake: $FAKE_COUNT)" | tee -a $AUDIT_REPORT

# Pattern 6: Hardcoded test data
echo "" >> $AUDIT_REPORT
echo "## Hardcoded Test Data" >> $AUDIT_REPORT
echo "Hardcoded arrays and test data:" | tee -a $AUDIT_REPORT
for ext in $PROJECT_FILE_EXT; do
    grep -r "new\[\].*{.*}|= \[.*\]|Array\[.*\]|list.*=.*\[" "$PROJECT_SRC_PATH/" --include="$ext" -n 2>/dev/null | head -20 | tee -a $AUDIT_REPORT || true
done
ARRAY_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "new\[\].*{.*}" {} \; 2>/dev/null | wc -l)
LIST_COUNT=$(find "$PROJECT_SRC_PATH" -name "$PROJECT_FILE_EXT" -exec grep -l "= \[.*\]" {} \; 2>/dev/null | wc -l)
echo "**Count:** Arrays: $ARRAY_COUNT, Lists: $LIST_COUNT" | tee -a $AUDIT_REPORT

echo "" | tee -a $AUDIT_REPORT
echo "Automated scan complete. Report saved to: $AUDIT_REPORT"
```

## Phase 2: Build and Runtime Validation

```bash
echo "=== BUILD AND RUNTIME VALIDATION ===" | tee -a $AUDIT_REPORT

# Build validation
echo "" >> $AUDIT_REPORT
echo "## Build Validation" >> $AUDIT_REPORT
echo "Build Command: $BUILD_CMD" | tee -a $AUDIT_REPORT
$BUILD_CMD > build-audit.txt 2>&1
BUILD_EXIT_CODE=$?
ERROR_COUNT=$(grep -ci "$ERROR_PATTERN" build-audit.txt 2>/dev/null || echo 0)
WARNING_COUNT=$(grep -ci "$WARN_PATTERN" build-audit.txt 2>/dev/null || echo 0)

echo "Build Exit Code: $BUILD_EXIT_CODE" | tee -a $AUDIT_REPORT
echo "Error Count: $ERROR_COUNT" | tee -a $AUDIT_REPORT
echo "Warning Count: $WARNING_COUNT" | tee -a $AUDIT_REPORT

# Runtime validation
echo "" >> $AUDIT_REPORT
echo "## Runtime Validation" >> $AUDIT_REPORT
echo "Run Command: timeout 30s $RUN_CMD" | tee -a $AUDIT_REPORT
timeout 30s $RUN_CMD > runtime-audit.txt 2>&1
RUNTIME_EXIT_CODE=$?
echo "Runtime Exit Code: $RUNTIME_EXIT_CODE" | tee -a $AUDIT_REPORT

# Integration testing
echo "" >> $AUDIT_REPORT
echo "## Integration Testing" >> $AUDIT_REPORT
if [[ "$RUN_CMD" == *"dotnet"* ]]; then
    PROJECT_FILE=$(find . -maxdepth 3 -name "*.csproj" | head -1)
    BASE_CMD="dotnet run --project \"$PROJECT_FILE\" --no-build --"
elif [[ "$RUN_CMD" == *"npm"* ]]; then
    BASE_CMD="npm start --"
elif [[ "$RUN_CMD" == *"mvn"* ]]; then
    BASE_CMD="mvn exec:java -Dexec.args="
elif [[ "$RUN_CMD" == *"gradle"* ]]; then
    BASE_CMD="gradle run --args="
elif [[ "$RUN_CMD" == *"cargo"* ]]; then
    BASE_CMD="cargo run --"
elif [[ "$RUN_CMD" == *"go"* ]]; then
    BASE_CMD="go run . --"
else
    BASE_CMD="$RUN_CMD"
fi

echo "Testing database connectivity..." | tee -a $AUDIT_REPORT
$BASE_CMD --test-database-connection 2>/dev/null && echo "✓ Database test passed" | tee -a $AUDIT_REPORT || echo "✗ Database test failed or N/A" | tee -a $AUDIT_REPORT

echo "Testing file operations..." | tee -a $AUDIT_REPORT  
$BASE_CMD --test-file-operations 2>/dev/null && echo "✓ File operations test passed" | tee -a $AUDIT_REPORT || echo "✗ File operations test failed or N/A" | tee -a $AUDIT_REPORT

echo "Testing network operations..." | tee -a $AUDIT_REPORT
$BASE_CMD --test-network-operations 2>/dev/null && echo "✓ Network test passed" | tee -a $AUDIT_REPORT || echo "✗ Network test failed or N/A" | tee -a $AUDIT_REPORT
```

## Phase 3: Story Context Analysis

### Previous Implementation Pattern Learning

Analyze existing stories to understand established patterns and prevent regression:

```bash
echo "=== STORY CONTEXT ANALYSIS ===" | tee -a $AUDIT_REPORT

# Find all completed stories in the project
STORY_DIR="docs/stories"
if [ -d "$STORY_DIR" ]; then
    echo "## Story Pattern Analysis" >> $AUDIT_REPORT
    echo "Analyzing previous implementations for pattern consistency..." | tee -a $AUDIT_REPORT
    
    # Find completed stories
    COMPLETED_STORIES=$(find "$STORY_DIR" -name "*.md" -exec grep -l "Status.*Complete\|Status.*Ready for Review" {} \; 2>/dev/null)
    echo "Completed stories found: $(echo "$COMPLETED_STORIES" | wc -l)" | tee -a $AUDIT_REPORT
    
    # Analyze architectural patterns
    echo "" >> $AUDIT_REPORT
    echo "### Architectural Pattern Analysis" >> $AUDIT_REPORT
    
    # Look for common implementation patterns
    for story in $COMPLETED_STORIES; do
        if [ -f "$story" ]; then
            echo "#### Story: $(basename "$story")" >> $AUDIT_REPORT
            
            # Extract technical approach from completed stories
            echo "Technical approach patterns:" >> $AUDIT_REPORT
            grep -A 5 -B 2 "Technical\|Implementation\|Approach\|Pattern" "$story" >> $AUDIT_REPORT 2>/dev/null || echo "No technical patterns found" >> $AUDIT_REPORT
            echo "" >> $AUDIT_REPORT
        fi
    done
    
    # Analyze change patterns
    echo "### Change Pattern Analysis" >> $AUDIT_REPORT
    for story in $COMPLETED_STORIES; do
        if [ -f "$story" ]; then
            # Look for file change patterns
            echo "#### File Change Patterns from $(basename "$story"):" >> $AUDIT_REPORT
            grep -A 10 "File List\|Files Modified\|Files Added" "$story" >> $AUDIT_REPORT 2>/dev/null || echo "No file patterns found" >> $AUDIT_REPORT
            echo "" >> $AUDIT_REPORT
        fi
    done
    
else
    echo "No stories directory found - skipping pattern analysis" | tee -a $AUDIT_REPORT
fi
```

### Architectural Decision Learning

Extract architectural decisions from previous stories:

```bash
# Analyze architectural decisions
echo "## Architectural Decision Analysis" >> $AUDIT_REPORT

# Look for architectural decisions in stories
if [ -d "$STORY_DIR" ]; then
    echo "### Previous Architectural Decisions:" >> $AUDIT_REPORT
    
    # Find architecture-related content
    grep -r -n -A 3 -B 1 "architect\|pattern\|design\|structure" "$STORY_DIR" --include="*.md" >> $AUDIT_REPORT 2>/dev/null || echo "No architectural decisions found" >> $AUDIT_REPORT
    
    echo "" >> $AUDIT_REPORT
    echo "### Technology Choices:" >> $AUDIT_REPORT
    
    # Find technology decisions
    grep -r -n -A 2 -B 1 "technology\|framework\|library\|dependency" "$STORY_DIR" --include="*.md" >> $AUDIT_REPORT 2>/dev/null || echo "No technology decisions found" >> $AUDIT_REPORT
fi

# Analyze current implementation against patterns
echo "" >> $AUDIT_REPORT
echo "### Pattern Compliance Assessment:" >> $AUDIT_REPORT

# Store pattern analysis results
PATTERN_COMPLIANCE_SCORE=100
ARCHITECTURAL_CONSISTENCY_SCORE=100
```

## Phase 4: Regression Risk Assessment

### Functional Regression Analysis

Identify potential functionality impacts:

```bash
echo "=== REGRESSION RISK ASSESSMENT ===" | tee -a $AUDIT_REPORT

echo "## Functional Impact Analysis" >> $AUDIT_REPORT

# Analyze current changes against existing functionality
if [ -d ".git" ]; then
    echo "### Recent Changes Analysis:" >> $AUDIT_REPORT
    echo "Recent commits that might affect functionality:" >> $AUDIT_REPORT
    git log --oneline -20 --grep="feat\|fix\|refactor\|break" >> $AUDIT_REPORT 2>/dev/null || echo "No recent functional changes found" >> $AUDIT_REPORT
    
    echo "" >> $AUDIT_REPORT
    echo "### Modified Files Impact:" >> $AUDIT_REPORT
    
    # Find recently modified files
    MODIFIED_FILES=$(git diff --name-only HEAD~5..HEAD 2>/dev/null)
    if [ -n "$MODIFIED_FILES" ]; then
        echo "Files modified in recent commits:" >> $AUDIT_REPORT
        echo "$MODIFIED_FILES" >> $AUDIT_REPORT
        
        # Analyze impact of each file
        echo "" >> $AUDIT_REPORT
        echo "### File Impact Assessment:" >> $AUDIT_REPORT
        
        for file in $MODIFIED_FILES; do
            if [ -f "$file" ]; then
                echo "#### Impact of $file:" >> $AUDIT_REPORT
                
                # Look for public interfaces, APIs, or exported functions
                case "$file" in
                    *.cs)
                        grep -n "public.*class\|public.*interface\|public.*method" "$file" >> $AUDIT_REPORT 2>/dev/null || echo "No public interfaces found" >> $AUDIT_REPORT
                        ;;
                    *.js|*.ts)
                        grep -n "export\|module\.exports" "$file" >> $AUDIT_REPORT 2>/dev/null || echo "No exports found" >> $AUDIT_REPORT
                        ;;
                    *.java)
                        grep -n "public.*class\|public.*interface\|public.*method" "$file" >> $AUDIT_REPORT 2>/dev/null || echo "No public interfaces found" >> $AUDIT_REPORT
                        ;;
                    *.py)
                        grep -n "def.*\|class.*" "$file" >> $AUDIT_REPORT 2>/dev/null || echo "No class/function definitions found" >> $AUDIT_REPORT
                        ;;
                esac
                echo "" >> $AUDIT_REPORT
            fi
        done
    else
        echo "No recently modified files found" >> $AUDIT_REPORT
    fi
fi

# Calculate regression risk score
REGRESSION_RISK_SCORE=100
```

### Integration Point Analysis

Assess integration and dependency impacts:

```bash
echo "## Integration Impact Analysis" >> $AUDIT_REPORT

# Analyze integration points
echo "### External Integration Points:" >> $AUDIT_REPORT

# Look for external dependencies and integrations
case "$PROJECT_FILE_EXT" in
    "*.cs")
        # .NET dependencies
        find . -name "*.csproj" -exec grep -n "PackageReference\|ProjectReference" {} \; >> $AUDIT_REPORT 2>/dev/null
        ;;
    "*.js"|"*.ts")
        # Node.js dependencies  
        if [ -f "package.json" ]; then
            echo "Package dependencies:" >> $AUDIT_REPORT
            grep -A 20 '"dependencies"' package.json >> $AUDIT_REPORT 2>/dev/null
        fi
        ;;
    "*.java")
        # Java dependencies
        find . -name "pom.xml" -exec grep -n "<dependency>" {} \; >> $AUDIT_REPORT 2>/dev/null
        find . -name "build.gradle" -exec grep -n "implementation\|compile" {} \; >> $AUDIT_REPORT 2>/dev/null
        ;;
esac

echo "" >> $AUDIT_REPORT
echo "### Database Integration Assessment:" >> $AUDIT_REPORT

# Look for database integration patterns
for ext in $PROJECT_FILE_EXT; do
    grep -r -n "connection\|database\|sql\|query" "$PROJECT_SRC_PATH/" --include="$ext" | head -10 >> $AUDIT_REPORT 2>/dev/null || echo "No database integration detected" >> $AUDIT_REPORT
done

echo "" >> $AUDIT_REPORT
echo "### API Integration Assessment:" >> $AUDIT_REPORT

# Look for API integration patterns  
for ext in $PROJECT_FILE_EXT; do
    grep -r -n "http\|api\|endpoint\|service" "$PROJECT_SRC_PATH/" --include="$ext" | head -10 >> $AUDIT_REPORT 2>/dev/null || echo "No API integration detected" >> $AUDIT_REPORT
done
```

## Phase 5: Technical Debt Impact Assessment

### Code Quality Impact Analysis

Evaluate potential technical debt introduction:

```bash
echo "=== TECHNICAL DEBT ASSESSMENT ===" | tee -a $AUDIT_REPORT

echo "## Code Quality Impact Analysis" >> $AUDIT_REPORT

# Analyze code complexity
echo "### Code Complexity Assessment:" >> $AUDIT_REPORT

# Find complex files (basic metrics)
for ext in $PROJECT_FILE_EXT; do
    echo "#### Files by size (potential complexity):" >> $AUDIT_REPORT
    find "$PROJECT_SRC_PATH" -name "$ext" -exec wc -l {} \; | sort -rn | head -10 >> $AUDIT_REPORT 2>/dev/null || echo "No source files found" >> $AUDIT_REPORT
done

echo "" >> $AUDIT_REPORT
echo "### Maintainability Assessment:" >> $AUDIT_REPORT

# Look for maintainability issues
echo "#### Potential Maintainability Issues:" >> $AUDIT_REPORT

# Look for code smells
for ext in $PROJECT_FILE_EXT; do
    # Large methods/functions
    case "$ext" in
        "*.cs")
            grep -r -n -A 20 "public.*{" "$PROJECT_SRC_PATH/" --include="$ext" | grep -c ".*{" | head -5 >> $AUDIT_REPORT 2>/dev/null
            ;;
        "*.js"|"*.ts") 
            grep -r -n "function.*{" "$PROJECT_SRC_PATH/" --include="$ext" | head -10 >> $AUDIT_REPORT 2>/dev/null
            ;;
        "*.java")
            grep -r -n "public.*{" "$PROJECT_SRC_PATH/" --include="$ext" | head -10 >> $AUDIT_REPORT 2>/dev/null
            ;;
    esac
done

# Look for duplication patterns
echo "" >> $AUDIT_REPORT  
echo "#### Code Duplication Assessment:" >> $AUDIT_REPORT

# Basic duplication detection
for ext in $PROJECT_FILE_EXT; do
    # Find similar patterns (simple approach)
    find "$PROJECT_SRC_PATH" -name "$ext" -exec basename {} \; | sort | uniq -c | grep -v "1 " >> $AUDIT_REPORT 2>/dev/null || echo "No obvious duplication in file names" >> $AUDIT_REPORT
done

# Calculate technical debt score
TECHNICAL_DEBT_SCORE=100
```

### Architecture Consistency Check

Verify alignment with established patterns:

```bash
echo "## Architecture Consistency Analysis" >> $AUDIT_REPORT

# Compare current approach with established patterns
echo "### Pattern Consistency Assessment:" >> $AUDIT_REPORT

# This will be populated based on story analysis from Phase 3
echo "Current implementation pattern consistency: [Will be calculated based on story analysis]" >> $AUDIT_REPORT
echo "Architectural decision compliance: [Will be assessed against previous decisions]" >> $AUDIT_REPORT
echo "Technology choice consistency: [Will be evaluated against established stack]" >> $AUDIT_REPORT

echo "" >> $AUDIT_REPORT
echo "### Recommendations for Technical Debt Prevention:" >> $AUDIT_REPORT
echo "- Follow established patterns identified in story analysis" >> $AUDIT_REPORT
echo "- Maintain consistency with previous architectural decisions" >> $AUDIT_REPORT
echo "- Ensure new code follows existing code quality standards" >> $AUDIT_REPORT
echo "- Verify integration approaches match established patterns" >> $AUDIT_REPORT

# Store results for comprehensive scoring
PATTERN_CONSISTENCY_ISSUES=0
ARCHITECTURAL_VIOLATIONS=0
```

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

## Phase 7: Comprehensive Reality Scoring with Regression Prevention

### Calculate Comprehensive Reality Score

```bash
echo "=== COMPREHENSIVE REALITY SCORING WITH REGRESSION PREVENTION ===" | tee -a $AUDIT_REPORT

# Initialize component scores
SIMULATION_SCORE=100
REGRESSION_PREVENTION_SCORE=100
TECHNICAL_DEBT_SCORE=100

echo "## Component Score Calculation" >> $AUDIT_REPORT

# Calculate Simulation Reality Score
echo "### Simulation Pattern Scoring:" >> $AUDIT_REPORT
SIMULATION_SCORE=$((SIMULATION_SCORE - (RANDOM_COUNT * 20)))
SIMULATION_SCORE=$((SIMULATION_SCORE - (TASK_MOCK_COUNT * 15)))
SIMULATION_SCORE=$((SIMULATION_SCORE - (NOT_IMPL_COUNT * 30)))
SIMULATION_SCORE=$((SIMULATION_SCORE - (TODO_COUNT * 5)))
SIMULATION_SCORE=$((SIMULATION_SCORE - (TOTAL_SIM_COUNT * 25)))

# Deduct for build/runtime failures
if [ $BUILD_EXIT_CODE -ne 0 ]; then
    SIMULATION_SCORE=$((SIMULATION_SCORE - 50))
fi

if [ $ERROR_COUNT -gt 0 ]; then
    SIMULATION_SCORE=$((SIMULATION_SCORE - (ERROR_COUNT * 10)))
fi

if [ $RUNTIME_EXIT_CODE -ne 0 ] && [ $RUNTIME_EXIT_CODE -ne 124 ]; then
    SIMULATION_SCORE=$((SIMULATION_SCORE - 30))
fi

# Ensure simulation score doesn't go below 0
if [ $SIMULATION_SCORE -lt 0 ]; then
    SIMULATION_SCORE=0
fi

echo "**Simulation Reality Score: $SIMULATION_SCORE/100**" >> $AUDIT_REPORT

# Calculate Regression Prevention Score
echo "### Regression Prevention Scoring:" >> $AUDIT_REPORT

# Deduct for regression risks (scores set in previous phases)
REGRESSION_PREVENTION_SCORE=${REGRESSION_RISK_SCORE:-100}
PATTERN_COMPLIANCE_DEDUCTION=$((PATTERN_CONSISTENCY_ISSUES * 15))
ARCHITECTURAL_DEDUCTION=$((ARCHITECTURAL_VIOLATIONS * 20))

REGRESSION_PREVENTION_SCORE=$((REGRESSION_PREVENTION_SCORE - PATTERN_COMPLIANCE_DEDUCTION))
REGRESSION_PREVENTION_SCORE=$((REGRESSION_PREVENTION_SCORE - ARCHITECTURAL_DEDUCTION))

# Ensure regression score doesn't go below 0
if [ $REGRESSION_PREVENTION_SCORE -lt 0 ]; then
    REGRESSION_PREVENTION_SCORE=0
fi

echo "**Regression Prevention Score: $REGRESSION_PREVENTION_SCORE/100**" >> $AUDIT_REPORT

# Calculate Technical Debt Score
echo "### Technical Debt Impact Scoring:" >> $AUDIT_REPORT
TECHNICAL_DEBT_SCORE=${TECHNICAL_DEBT_SCORE:-100}

# Factor in architectural consistency
if [ $ARCHITECTURAL_CONSISTENCY_SCORE -lt 100 ]; then
    CONSISTENCY_DEDUCTION=$((100 - ARCHITECTURAL_CONSISTENCY_SCORE))
    TECHNICAL_DEBT_SCORE=$((TECHNICAL_DEBT_SCORE - CONSISTENCY_DEDUCTION))
fi

# Ensure technical debt score doesn't go below 0  
if [ $TECHNICAL_DEBT_SCORE -lt 0 ]; then
    TECHNICAL_DEBT_SCORE=0
fi

echo "**Technical Debt Prevention Score: $TECHNICAL_DEBT_SCORE/100**" >> $AUDIT_REPORT

# Calculate Composite Reality Score with Weighted Components
echo "### Composite Scoring:" >> $AUDIT_REPORT
echo "Score component weights:" >> $AUDIT_REPORT
echo "- Simulation Reality: 40%" >> $AUDIT_REPORT  
echo "- Regression Prevention: 35%" >> $AUDIT_REPORT
echo "- Technical Debt Prevention: 25%" >> $AUDIT_REPORT

COMPOSITE_REALITY_SCORE=$(( (SIMULATION_SCORE * 40 + REGRESSION_PREVENTION_SCORE * 35 + TECHNICAL_DEBT_SCORE * 25) / 100 ))

echo "**Composite Reality Score: $COMPOSITE_REALITY_SCORE/100**" >> $AUDIT_REPORT

# Set final score for compatibility with existing workflows
REALITY_SCORE=$COMPOSITE_REALITY_SCORE

echo "" >> $AUDIT_REPORT
echo "## Reality Scoring Matrix" >> $AUDIT_REPORT
echo "| Pattern Found | Instance Count | Score Impact | Points Deducted |" >> $AUDIT_REPORT
echo "|---------------|----------------|--------------|-----------------|" >> $AUDIT_REPORT
echo "| Random Data Generation | $RANDOM_COUNT | High | $((RANDOM_COUNT * 20)) |" >> $AUDIT_REPORT
echo "| Mock Async Operations | $TASK_MOCK_COUNT | High | $((TASK_MOCK_COUNT * 15)) |" >> $AUDIT_REPORT
echo "| NotImplementedException | $NOT_IMPL_COUNT | Critical | $((NOT_IMPL_COUNT * 30)) |" >> $AUDIT_REPORT
echo "| TODO Comments | $TODO_COUNT | Medium | $((TODO_COUNT * 5)) |" >> $AUDIT_REPORT
echo "| Simulation Methods | $TOTAL_SIM_COUNT | High | $((TOTAL_SIM_COUNT * 25)) |" >> $AUDIT_REPORT
echo "| Build Failures | $BUILD_EXIT_CODE | Critical | $([ $BUILD_EXIT_CODE -ne 0 ] && echo 50 || echo 0) |" >> $AUDIT_REPORT
echo "| Compilation Errors | $ERROR_COUNT | High | $((ERROR_COUNT * 10)) |" >> $AUDIT_REPORT
echo "| Runtime Failures | $([ $RUNTIME_EXIT_CODE -ne 0 ] && [ $RUNTIME_EXIT_CODE -ne 124 ] && echo 1 || echo 0) | High | $([ $RUNTIME_EXIT_CODE -ne 0 ] && [ $RUNTIME_EXIT_CODE -ne 124 ] && echo 30 || echo 0) |" >> $AUDIT_REPORT
echo "" >> $AUDIT_REPORT
echo "**Total Reality Score: $REALITY_SCORE / 100**" >> $AUDIT_REPORT

echo "Final Reality Score: $REALITY_SCORE / 100" | tee -a $AUDIT_REPORT
```

### Score Interpretation and Enforcement

```bash
echo "" >> $AUDIT_REPORT
echo "## Reality Score Interpretation" >> $AUDIT_REPORT

if [ $REALITY_SCORE -ge 90 ]; then
    GRADE="A"
    STATUS="EXCELLENT"
    ACTION="APPROVED FOR COMPLETION"
elif [ $REALITY_SCORE -ge 80 ]; then
    GRADE="B"  
    STATUS="GOOD"
    ACTION="APPROVED FOR COMPLETION"
elif [ $REALITY_SCORE -ge 70 ]; then
    GRADE="C"
    STATUS="ACCEPTABLE"
    ACTION="REQUIRES MINOR REMEDIATION"
elif [ $REALITY_SCORE -ge 60 ]; then
    GRADE="D"
    STATUS="POOR"
    ACTION="REQUIRES MAJOR REMEDIATION"
else
    GRADE="F"
    STATUS="UNACCEPTABLE"
    ACTION="BLOCKED - RETURN TO DEVELOPMENT"
fi

echo "- **Grade: $GRADE ($REALITY_SCORE/100)**" >> $AUDIT_REPORT
echo "- **Status: $STATUS**" >> $AUDIT_REPORT
echo "- **Action: $ACTION**" >> $AUDIT_REPORT

echo "Reality Assessment: $GRADE ($STATUS) - $ACTION" | tee -a $AUDIT_REPORT
```

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

## Phase 9: Regression-Safe Automated Remediation

```bash
echo "=== REMEDIATION DECISION ===" | tee -a $AUDIT_REPORT

# Check if remediation is needed
REMEDIATION_NEEDED=false

if [ $REALITY_SCORE -lt 80 ]; then
    echo "✋ Reality score below threshold: $REALITY_SCORE/100" | tee -a $AUDIT_REPORT
    REMEDIATION_NEEDED=true
fi

if [ $BUILD_EXIT_CODE -ne 0 ] || [ $ERROR_COUNT -gt 0 ]; then
    echo "✋ Build failures detected: Exit code $BUILD_EXIT_CODE, Errors: $ERROR_COUNT" | tee -a $AUDIT_REPORT
    REMEDIATION_NEEDED=true
fi

if [ $RUNTIME_EXIT_CODE -ne 0 ] && [ $RUNTIME_EXIT_CODE -ne 124 ]; then
    echo "✋ Runtime failures detected: Exit code $RUNTIME_EXIT_CODE" | tee -a $AUDIT_REPORT
    REMEDIATION_NEEDED=true
fi

CRITICAL_PATTERNS=$((NOT_IMPL_COUNT + RANDOM_COUNT))
if [ $CRITICAL_PATTERNS -gt 3 ]; then
    echo "✋ Critical simulation patterns detected: $CRITICAL_PATTERNS instances" | tee -a $AUDIT_REPORT
    REMEDIATION_NEEDED=true
fi

if [ "$REMEDIATION_NEEDED" == "true" ]; then
    echo "" | tee -a $AUDIT_REPORT
    echo "🚨 **REMEDIATION REQUIRED** - Auto-generating remediation story..." | tee -a $AUDIT_REPORT
    echo "" | tee -a $AUDIT_REPORT
    
    # Set variables for create-remediation-story.md
    export REALITY_SCORE
    export BUILD_EXIT_CODE
    export ERROR_COUNT
    export RUNTIME_EXIT_CODE
    export RANDOM_COUNT
    export TASK_MOCK_COUNT
    export NOT_IMPL_COUNT
    export TODO_COUNT
    export TOTAL_SIM_COUNT
    
    echo "📝 **REMEDIATION STORY CREATION TRIGGERED**" | tee -a $AUDIT_REPORT
    echo "👩‍💻 **NEXT ACTION:** Execute create-remediation-story.md" | tee -a $AUDIT_REPORT
    echo "🔄 **PROCESS:** Developer implements fixes → QA re-audits → Repeat until score ≥ 80" | tee -a $AUDIT_REPORT
    echo "🎯 **TARGET:** Achieve 80+ reality score with clean build/runtime" | tee -a $AUDIT_REPORT
else
    echo "" | tee -a $AUDIT_REPORT
    echo "✅ **NO REMEDIATION NEEDED** - Implementation meets quality standards" | tee -a $AUDIT_REPORT
    echo "📊 Reality Score: $REALITY_SCORE/100" | tee -a $AUDIT_REPORT
    echo "🏗️ Build Status: $([ $BUILD_EXIT_CODE -eq 0 ] && [ $ERROR_COUNT -eq 0 ] && echo "✅ SUCCESS" || echo "❌ FAILED")" | tee -a $AUDIT_REPORT
    echo "⚡ Runtime Status: $([ $RUNTIME_EXIT_CODE -eq 0 ] || [ $RUNTIME_EXIT_CODE -eq 124 ] && echo "✅ SUCCESS" || echo "❌ FAILED")" | tee -a $AUDIT_REPORT
fi

echo "" | tee -a $AUDIT_REPORT
echo "=== AUDIT COMPLETE ===" | tee -a $AUDIT_REPORT
echo "Report location: $AUDIT_REPORT" | tee -a $AUDIT_REPORT
```

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