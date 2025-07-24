# Smart Build Context Analysis

Lightweight build error investigation with intelligent escalation to comprehensive analysis when complexity detected.

[[LLM: This smart analysis uses 200-500 tokens for simple issues vs 1500-2500+ tokens for full build context analysis]]

## Smart Analysis Process

### 1. **Quick Build Error Assessment (Environment-Aware)**

**Environment Initialization:**
- Use Read tool to execute: `bmad-core/tasks/auto-language-init.md` (if not cached)
- Use Read tool to execute: `bmad-core/tasks/lightweight-ide-detection.md` (if not cached)
- Load cached environment variables: `$BMAD_PRIMARY_LANGUAGE`, `$BMAD_BUILD_COMMAND`, `$BMAD_ERROR_PATTERNS`

**Build Execution (Based on IDE Environment):**

**If USE_IDE_TOOLS = true (Claude Code CLI):**
- Execute build using Bash tool with clear description: "Execute build command to assess errors"
- Capture build output for analysis
- No approval prompts in IDE environment

**Build Error Analysis Using Native Tools:**

**1. Execute Build Command:**
```
Bash tool parameters:
- command: [Use $BMAD_BUILD_COMMAND]
- description: "Execute language-specific build command to identify errors"
```

**2. Analyze Build Output:**
- If build successful (exit code 0): Return "✅ Build successful - no context analysis needed"
- If build failed: Proceed with error pattern analysis

**3. Error Pattern Detection:**
Use language-specific error patterns from `$BMAD_ERROR_PATTERNS`:

**Total Error Count:**
- Analyze build output for error patterns
- Count total errors using language-specific patterns

**Error Categorization:**
- **Syntax Errors**: Count syntax/parse-related errors
- **Type Errors**: Count undefined/not found references  
- **Interface Errors**: Count interface/implementation mismatches

**4. Complexity Score Calculation:**
```
Complexity Scoring Logic:
- Total errors > 20: +30 points
- Interface errors > 5: +25 points
- Type errors > 10: +20 points
- Syntax errors > 5: +15 points

COMPLEXITY_SCORE = Sum of applicable points
```

**Results Summary:**
```
📊 Build Error Summary:
Project Language: [BMAD_PRIMARY_LANGUAGE]
Total Errors: [count]
Syntax Errors: [count]
Type/Reference Errors: [count] 
Interface/Implementation Errors: [count]
🎯 Complexity Score: [score]/100
```

### 2. **Smart Decision Logic (Intelligent Routing)**

**Complexity-Based Routing:**

**SIMPLE Issues (Complexity Score < 30):**
- Route to: Quick Build Fixes (lightweight suggestions)
- Approach: Common pattern-based fix recommendations
- Estimated tokens: 200-300
- Success rate: ~75%

**MODERATE Issues (Complexity Score 30-59):**
- Route to: Targeted Context Analysis (focused investigation)
- Approach: Problem file analysis with recent change context
- Estimated tokens: 400-600  
- Success rate: ~65%

**COMPLEX Issues (Complexity Score ≥ 60):**
- Route to: Comprehensive Build Context Analysis
- Approach: Use Read tool to execute `bmad-core/tasks/build-context-analysis.md`
- Estimated tokens: 1500-2500
- Success rate: ~95%

**Decision Implementation:**
```
If COMPLEXITY_SCORE < 30:
  → Execute Quick Build Fixes section
  → Report: "🚀 SIMPLE - Using lightweight fix suggestions"

Else if COMPLEXITY_SCORE < 60:
  → Execute Targeted Context Analysis section  
  → Report: "⚖️ MODERATE - Using targeted analysis"

Else:
  → Use Read tool: bmad-core/tasks/build-context-analysis.md
  → Report: "🔄 COMPLEX - Escalating to comprehensive analysis"
```

### 3. **Quick Build Fixes (Pattern-Based Recommendations)**

**Language-Adaptive Fix Suggestions:**

Based on error categorization from build analysis:

**Syntax Error Fixes (if SYNTAX_ERRORS > 0):**
```
📝 Syntax Issues Detected:
• Check for missing semicolons, braces, or parentheses
• Verify method/class declarations are properly closed  
• Look for unmatched brackets in recent changes
• Review string literal formatting and escape characters
```

**Type/Reference Error Fixes (if TYPE_ERRORS > 0):**
```
📦 Missing Reference Issues:
• Add missing using/import statements
• Verify packages/dependencies are installed
• Check if types were moved to different namespaces/modules
• Confirm spelling of type names and method calls
```

**Interface Implementation Fixes (if INTERFACE_ERRORS < 5):**
```
🔌 Interface Implementation Issues:
• Implement missing interface members
• Check method signatures match interface contracts
• Verify async/sync patterns are consistent  
• Ensure parameter types and return types match
```

**General Quick Fix Strategy:**
```
🔧 Quick Build Fix Approach:
⏱️ Estimated fix time: 10-20 minutes
🎯 Priority: Focus on most recent file changes first
🔄 Process: Fix one category at a time, then rebuild
✅ Validation: Test build after each fix category
```

**Success Indicators:**
- Simple syntax issues (missing semicolons, brackets)
- Straightforward reference problems
- Minor interface signature mismatches
- Recent changes causing obvious breaks

### 4. **Targeted Context Analysis (Environment-Aware)**

**Problem File Identification:**

Use build output analysis to identify most problematic files:

**1. Parse Build Output for Error Sources:**
- Extract file paths from build error messages
- Count errors per file to identify highest-impact files
- Focus on top 5 most problematic files

**2. Recent Changes Analysis (Using Git Commands):**

**If git repository detected:**
- Use Bash tool to execute git commands for each problem file:
  ```
  Bash tool parameters:
  - command: git log -1 --format="%h %s" -- [file_path]
  - description: "Get recent change history for problematic file"
  ```

**3. Interface Evolution Detection:**

**If interface errors > 0:**
- Use Bash tool to check for recent interface changes:
  ```
  Bash tool parameters: 
  - command: git log --oneline -10 --grep="interface|API|contract"
  - description: "Check for recent interface-related changes"
  ```

**Analysis Results Format:**
```
🎯 Targeted Build Context Analysis:

📁 Most Problematic Files:
• [file1]: [error_count] errors
• [file2]: [error_count] errors  
• [file3]: [error_count] errors

🕰️ Recent Changes to Problem Files:
• [file1]: [last_commit_hash] [commit_message]
• [file2]: [last_commit_hash] [commit_message]

🔍 Interface Evolution Check:
[Recent interface-related commits if any]
💡 Analysis: [Interface change impact assessment]
```

**Targeted Fix Strategy:**
```
🔧 Targeted Fix Approach:
1. **Priority Files**: Focus on files with highest error counts first
2. **Context Review**: Check recent git changes for context clues
3. **Interface First**: Update interface implementations before complex logic
4. **Incremental Testing**: Test build after each major file fix
5. **Change Validation**: Ensure fixes don't break existing functionality
```

**Success Criteria:**
- Moderate complexity with identifiable problem files
- Recent changes provide context for errors
- Interface mismatches can be resolved systematically
- Git history reveals helpful change patterns

## Escalation Triggers

### **When to Use Comprehensive Analysis**
- Complexity score ≥ 60
- Interface errors > 10
- Total errors > 50
- User explicitly requests via `*build-context --full`
- Previous quick fixes failed

### **Escalation Logic (Context Preservation)**

**Smart Escalation Process:**

**1. Context Preservation:**
Before escalating to comprehensive analysis, preserve quick analysis results:

```
Context Documentation:
📋 Smart Analysis Results Preserved:
• Complexity Score: [score]/100
• Error Counts: Total=[count], Interface=[count], Type=[count], Syntax=[count]
• Problem Files: [list of files with highest error counts]
• Analysis Route: [SIMPLE/MODERATE/COMPLEX routing decision]
• Environment: [detected language and IDE environment]
```

**2. Escalation Execution:**
- Use Read tool to execute: `bmad-core/tasks/build-context-analysis.md`
- Pass context information to comprehensive analysis
- Maintain continuity between smart and comprehensive approaches

**3. Escalation Triggers:**
- Complexity score ≥ 60
- Interface errors > 10  
- Total errors > 50
- User explicit request via command flags
- Previous lightweight fixes failed

**Context Handoff Benefits:**
- Comprehensive analysis can build on smart analysis results
- Avoids duplicate work in problem identification
- Maintains consistent error categorization
- Preserves environment detection results

## Integration with Development Workflow

### **Dev Agent Integration (Command Structure)**

**Agent Command Integration:**

**Standard Command:**
- `*build-context` - Smart analysis with automatic routing (200-800 tokens)
- Automatically chooses SIMPLE/MODERATE/COMPLEX approach based on complexity score

**Override Commands:**
- `*build-context --full` - Force comprehensive analysis (1500+ tokens)
- `*build-context --quick` - Force lightweight fixes only (300 tokens)
- `*build-context --targeted` - Force moderate targeted analysis (400-600 tokens)

**Usage Integration:**
- Replace direct `build-context-analysis.md` calls with smart routing
- Maintain backward compatibility for existing workflows
- Provide token usage transparency to users
- Enable conscious choice between speed and thoroughness

### **Auto-Trigger Conditions**
- Build failures during story development
- Compilation errors > 5
- Interface implementation errors detected

## Token Usage Comparison

| Analysis Type | Token Cost | Use Case | Success Rate |
|---------------|------------|----------|-------------|
| **Quick Fixes** | 200-300 | Simple syntax/reference errors | 75% |
| **Targeted** | 400-600 | Moderate complexity issues | 65% |  
| **Comprehensive** | 1,500-2,500 | Complex interface/architectural issues | 95% |
| **Smart Hybrid** | 300-2,500 | Adaptive based on complexity | 80% |

## Expected Token Savings

### **Scenario Analysis**
- **Build errors per day**: 8-12 incidents
- **Simple issues (60%)**:
  - Old: 8 × 2,000 = 16,000 tokens
  - New: 8 × 300 = 2,400 tokens
  - **Savings: 85%**

- **Moderate issues (25%)**:
  - Old: 3 × 2,000 = 6,000 tokens  
  - New: 3 × 600 = 1,800 tokens
  - **Savings: 70%**

- **Complex issues (15%)**:
  - Old: 2 × 2,000 = 4,000 tokens
  - New: 2 × 2,000 = 4,000 tokens  
  - **Savings: 0% (but gets full analysis when needed)**

**Overall Daily Savings: 76%** (from 26,000 to 8,200 tokens)

## Success Criteria

- [ ] Quick error classification (200-300 tokens)
- [ ] Smart complexity assessment and routing
- [ ] 70-85% token savings for routine build issues
- [ ] Maintains comprehensive analysis for complex cases
- [ ] Integration with dev agent workflow
- [ ] Preserves context for escalated cases

This provides **intelligent build analysis** that uses minimal tokens for simple issues while preserving full capability for complex scenarios!