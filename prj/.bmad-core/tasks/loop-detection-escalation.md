# Loop Detection & Escalation

## Task Overview

Systematically track solution attempts, detect loop scenarios, and trigger collaborative escalation when agents get stuck repeating unsuccessful approaches. This consolidated framework combines automatic detection with structured collaboration preparation for external AI agents.

## Context

Prevents agents from endlessly repeating failed solutions by implementing automatic escalation triggers and structured collaboration preparation. Ensures efficient use of context windows and systematic knowledge sharing while maintaining detailed audit trails of solution attempts.

## Execution Approach

**LOOP PREVENTION PROTOCOL** - This system addresses systematic "retry the same approach" behavior that wastes time and context.

1. **Track each solution attempt** systematically with outcomes
2. **Detect loop patterns** automatically using defined triggers
3. **Prepare collaboration context** for external agents
4. **Execute escalation** when conditions are met
5. **Document learnings** from collaborative solutions

The goal is efficient problem-solving through systematic collaboration when internal approaches reach limitations.

---

## Phase 1: Pre-Escalation Tracking

### Problem Definition Setup

Before attempting any solutions, establish clear problem context:

- [ ] **Issue clearly defined:** Specific error message, file location, or failure description documented
- [ ] **Root cause hypothesis:** Current understanding of what's causing the issue
- [ ] **Context captured:** Relevant code snippets, configuration files, or environment details
- [ ] **Success criteria defined:** What exactly needs to happen for issue to be resolved
- [ ] **Environment documented:** Platform, versions, dependencies affecting the issue

### Solution Attempt Tracking

Track each solution attempt using this systematic format:

```bash
echo "=== LOOP DETECTION TRACKING ===" 
echo "Issue Tracking Started: $(date)"
echo "Issue ID: issue-$(date +%Y%m%d-%H%M)"
echo ""

# Create tracking report
# Create tmp directory if it doesn't exist
mkdir -p tmp

LOOP_REPORT="tmp/loop-tracking-$(date +%Y%m%d-%H%M).md"
echo "# Loop Detection Tracking Report" > $LOOP_REPORT
echo "Date: $(date)" >> $LOOP_REPORT
echo "Issue ID: issue-$(date +%Y%m%d-%H%M)" >> $LOOP_REPORT
echo "" >> $LOOP_REPORT

echo "## Problem Definition" >> $LOOP_REPORT
echo "**Issue Description:** [Specific error or failure]" >> $LOOP_REPORT
echo "**Error Location:** [File, line, or component]" >> $LOOP_REPORT
echo "**Root Cause Hypothesis:** [Current understanding]" >> $LOOP_REPORT
echo "**Success Criteria:** [What needs to work]" >> $LOOP_REPORT
echo "**Environment:** [Platform, versions, dependencies]" >> $LOOP_REPORT
echo "" >> $LOOP_REPORT

echo "## Solution Attempt Log" >> $LOOP_REPORT
ATTEMPT_COUNT=0
```

**For each solution attempt, document:**

```markdown
### Attempt #[N]: [Brief description]
- **Start Time:** [timestamp]
- **Approach:** [Description of solution attempted]
- **Hypothesis:** [Why this approach should work]
- **Actions Taken:** [Specific steps executed]
- **Code Changes:** [Files modified and how]
- **Test Results:** [What happened when tested]
- **Result:** [Success/Failure/Partial success]
- **Learning:** [What this attempt revealed about the problem]
- **New Information:** [Any new understanding gained]
- **Next Hypothesis:** [How this changes understanding of the issue]
- **End Time:** [timestamp]
- **Duration:** [time spent on this attempt]
```

### Automated Attempt Logging

```bash
# Function to log solution attempts
log_attempt() {
    local attempt_num=$1
    local approach="$2"
    local result="$3"
    local learning="$4"
    
    ATTEMPT_COUNT=$((ATTEMPT_COUNT + 1))
    
    echo "" >> $LOOP_REPORT
    echo "### Attempt #$ATTEMPT_COUNT: $approach" >> $LOOP_REPORT
    echo "- **Start Time:** $(date)" >> $LOOP_REPORT
    echo "- **Approach:** $approach" >> $LOOP_REPORT
    echo "- **Result:** $result" >> $LOOP_REPORT
    echo "- **Learning:** $learning" >> $LOOP_REPORT
    echo "- **Duration:** [manual entry required]" >> $LOOP_REPORT
    
    # Check for escalation triggers after each attempt
    check_escalation_triggers
}

# Function to check escalation triggers
check_escalation_triggers() {
    local should_escalate=false
    
    echo "## Escalation Check #$ATTEMPT_COUNT" >> $LOOP_REPORT
    echo "Time: $(date)" >> $LOOP_REPORT
    
    # Check attempt count trigger
    if [ $ATTEMPT_COUNT -ge 3 ]; then
        echo "🚨 **TRIGGER**: 3+ failed attempts detected ($ATTEMPT_COUNT attempts)" >> $LOOP_REPORT
        should_escalate=true
    fi
    
    # Check for repetitive patterns (manual analysis required)
    echo "- **Repetitive Approaches:** [Manual assessment needed]" >> $LOOP_REPORT
    echo "- **Circular Reasoning:** [Manual assessment needed]" >> $LOOP_REPORT
    echo "- **Diminishing Returns:** [Manual assessment needed]" >> $LOOP_REPORT
    
    # Time-based trigger (manual tracking required)
    echo "- **Time Threshold:** [Manual time tracking needed - trigger at 90+ minutes]" >> $LOOP_REPORT
    echo "- **Context Window Pressure:** [Manual assessment of context usage]" >> $LOOP_REPORT
    
    if [ "$should_escalate" == "true" ]; then
        echo "" >> $LOOP_REPORT
        echo "⚡ **ESCALATION TRIGGERED** - Preparing collaboration request..." >> $LOOP_REPORT
        prepare_collaboration_request
    fi
}
```

## Phase 2: Loop Detection Indicators

### Automatic Detection Triggers

The system monitors for these escalation conditions:

```bash
# Loop Detection Configuration
FAILED_ATTEMPTS=3           # 3+ failed solution attempts
TIME_LIMIT_MINUTES=90       # 90+ minutes on single issue  
PATTERN_REPETITION=true     # Repeating previously tried solutions
CONTEXT_PRESSURE=high       # Approaching context window limits
DIMINISHING_RETURNS=true    # Each attempt provides less information
```

### Manual Detection Checklist

Monitor these indicators during problem-solving:

- [ ] **Repetitive approaches:** Same or very similar solutions attempted multiple times
- [ ] **Circular reasoning:** Solution attempts that return to previously tried approaches  
- [ ] **Diminishing returns:** Each attempt provides less new information than the previous
- [ ] **Time threshold exceeded:** More than 90 minutes spent on single issue without progress
- [ ] **Context window pressure:** Approaching context limits due to extensive debugging
- [ ] **Decreasing confidence:** Solutions becoming more speculative rather than systematic
- [ ] **Resource exhaustion:** Running out of approaches within current knowledge domain

### Escalation Trigger Assessment

```bash
# Function to assess escalation need
assess_escalation_need() {
    echo "=== ESCALATION ASSESSMENT ===" >> $LOOP_REPORT
    echo "Assessment Time: $(date)" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Automatic Triggers:" >> $LOOP_REPORT
    echo "- **Failed Attempts:** $ATTEMPT_COUNT (trigger: ≥3)" >> $LOOP_REPORT
    echo "- **Time Investment:** [Manual tracking] (trigger: ≥90 minutes)" >> $LOOP_REPORT
    echo "- **Pattern Repetition:** [Manual assessment] (trigger: repeating approaches)" >> $LOOP_REPORT
    echo "- **Context Pressure:** [Manual assessment] (trigger: approaching limits)" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Manual Assessment Required:" >> $LOOP_REPORT
    echo "- [ ] Same approaches being repeated?" >> $LOOP_REPORT
    echo "- [ ] Each attempt providing less new information?" >> $LOOP_REPORT
    echo "- [ ] Running out of systematic approaches?" >> $LOOP_REPORT
    echo "- [ ] Context window becoming crowded with debug info?" >> $LOOP_REPORT
    echo "- [ ] Issue blocking progress on main objective?" >> $LOOP_REPORT
    echo "- [ ] Specialized knowledge domain expertise needed?" >> $LOOP_REPORT
}
```

## Phase 3: Collaboration Preparation

### Issue Classification

Before escalating, classify the problem type for optimal collaborator selection:

```bash
prepare_collaboration_request() {
    echo "" >> $LOOP_REPORT
    echo "=== COLLABORATION REQUEST PREPARATION ===" >> $LOOP_REPORT
    echo "Preparation Time: $(date)" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "## Issue Classification" >> $LOOP_REPORT
    echo "- [ ] **Code Implementation Problem:** Logic, syntax, or algorithm issues" >> $LOOP_REPORT
    echo "- [ ] **Architecture Design Problem:** Structural or pattern-related issues" >> $LOOP_REPORT  
    echo "- [ ] **Platform Integration Problem:** OS, framework, or tool compatibility" >> $LOOP_REPORT
    echo "- [ ] **Performance Optimization Problem:** Speed, memory, or efficiency issues" >> $LOOP_REPORT
    echo "- [ ] **Cross-Platform Compatibility Problem:** Multi-OS or environment issues" >> $LOOP_REPORT
    echo "- [ ] **Domain-Specific Problem:** Specialized knowledge area" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    generate_collaboration_package
}
```

### Collaborative Information Package

Generate structured context for external collaborators:

```bash
generate_collaboration_package() {
    echo "## Collaboration Information Package" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Executive Summary" >> $LOOP_REPORT
    echo "**Problem:** [One-line description of core issue]" >> $LOOP_REPORT
    echo "**Impact:** [How this blocks progress]" >> $LOOP_REPORT
    echo "**Attempts:** $ATTEMPT_COUNT solutions tried over [X] minutes" >> $LOOP_REPORT
    echo "**Request:** [Specific type of help needed]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Technical Context" >> $LOOP_REPORT
    echo "**Platform:** [OS, framework, language versions]" >> $LOOP_REPORT
    echo "**Environment:** [Development setup, tools, constraints]" >> $LOOP_REPORT
    echo "**Dependencies:** [Key libraries, frameworks, services]" >> $LOOP_REPORT
    echo "**Error Details:** [Exact error messages, stack traces]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Code Context" >> $LOOP_REPORT
    echo "**Relevant Files:** [List of files involved]" >> $LOOP_REPORT
    echo "**Key Functions:** [Methods or classes at issue]" >> $LOOP_REPORT
    echo "**Data Structures:** [Important types or interfaces]" >> $LOOP_REPORT
    echo "**Integration Points:** [How components connect]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Solution Attempts Summary" >> $LOOP_REPORT
    echo "**Approach 1:** [Brief summary + outcome]" >> $LOOP_REPORT
    echo "**Approach 2:** [Brief summary + outcome]" >> $LOOP_REPORT
    echo "**Approach 3:** [Brief summary + outcome]" >> $LOOP_REPORT
    echo "**Pattern:** [What all attempts had in common]" >> $LOOP_REPORT
    echo "**Learnings:** [Key insights from attempts]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Specific Request" >> $LOOP_REPORT
    echo "**What We Need:** [Specific type of assistance]" >> $LOOP_REPORT
    echo "**Knowledge Gap:** [What we don't know]" >> $LOOP_REPORT
    echo "**Success Criteria:** [How to know if solution works]" >> $LOOP_REPORT
    echo "**Constraints:** [Limitations or requirements]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    select_collaborator
}
```

### Collaborator Selection

```bash
select_collaborator() {
    echo "## Recommended Collaborator Selection" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Collaborator Specialization Guide:" >> $LOOP_REPORT
    echo "- **Gemini:** Algorithm optimization, mathematical problems, data analysis" >> $LOOP_REPORT
    echo "- **Claude Code:** Architecture design, code structure, enterprise patterns" >> $LOOP_REPORT
    echo "- **GPT-4:** General problem-solving, creative approaches, debugging" >> $LOOP_REPORT
    echo "- **Specialized LLMs:** Domain-specific expertise (security, ML, etc.)" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Recommended Primary Collaborator:" >> $LOOP_REPORT
    echo "**Choice:** [Based on issue classification]" >> $LOOP_REPORT
    echo "**Rationale:** [Why this collaborator is best suited]" >> $LOOP_REPORT
    echo "**Alternative:** [Backup option if primary unavailable]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Collaboration Request Ready" >> $LOOP_REPORT
    echo "**Package Location:** $LOOP_REPORT" >> $LOOP_REPORT
    echo "**Next Action:** Initiate collaboration with selected external agent" >> $LOOP_REPORT
    
    # Generate copy-paste prompt for external LLM
    generate_external_prompt
}

# Generate copy-paste prompt for external LLM collaboration
generate_external_prompt() {
    # Ensure tmp directory exists
    mkdir -p tmp
    EXTERNAL_PROMPT="tmp/external-llm-prompt-$(date +%Y%m%d-%H%M).md"
    
    cat > $EXTERNAL_PROMPT << 'EOF'
# COLLABORATION REQUEST - Copy & Paste This Entire Message

## Situation
I'm an AI development agent that has hit a wall after multiple failed attempts at resolving an issue. I need fresh perspective and collaborative problem-solving.

## Issue Summary
**Problem:** [FILL: One-line description of core issue]
**Impact:** [FILL: How this blocks progress]  
**Attempts:** [FILL: Number] solutions tried over [FILL: X] minutes
**Request:** [FILL: Specific type of help needed]

## Technical Context
**Platform:** [FILL: OS, framework, language versions]
**Environment:** [FILL: Development setup, tools, constraints]
**Dependencies:** [FILL: Key libraries, frameworks, services]
**Error Details:** [FILL: Exact error messages, stack traces]

## Code Context
**Relevant Files:** [FILL: List of files involved]
**Key Functions:** [FILL: Methods or classes at issue]
**Data Structures:** [FILL: Important types or interfaces]
**Integration Points:** [FILL: How components connect]

## Failed Solution Attempts
### Attempt 1: [FILL: Brief approach description]
- **Hypothesis:** [FILL: Why we thought this would work]
- **Actions:** [FILL: What we tried]
- **Outcome:** [FILL: What happened]
- **Learning:** [FILL: What this revealed]

### Attempt 2: [FILL: Brief approach description]  
- **Hypothesis:** [FILL: Why we thought this would work]
- **Actions:** [FILL: What we tried]
- **Outcome:** [FILL: What happened]
- **Learning:** [FILL: What this revealed]

### Attempt 3: [FILL: Brief approach description]
- **Hypothesis:** [FILL: Why we thought this would work]
- **Actions:** [FILL: What we tried]
- **Outcome:** [FILL: What happened]
- **Learning:** [FILL: What this revealed]

## Pattern Analysis
**Common Thread:** [FILL: What all attempts had in common]
**Key Insights:** [FILL: Main learnings from attempts]
**Potential Blind Spots:** [FILL: What we might be missing]

## Specific Collaboration Request
**What I Need:** [FILL: Specific type of assistance - fresh approach, domain expertise, different perspective, etc.]
**Knowledge Gap:** [FILL: What we don't know or understand]
**Success Criteria:** [FILL: How to know if solution works]
**Constraints:** [FILL: Limitations or requirements to work within]

## Code Snippets (if relevant)
```[language]
[FILL: Relevant code that's causing issues]
```

## Error Logs (if relevant)
```
[FILL: Exact error messages and stack traces]
```

## What Would Help Most
- [ ] Fresh perspective on root cause
- [ ] Alternative solution approaches  
- [ ] Domain-specific expertise
- [ ] Code review and suggestions
- [ ] Architecture/design guidance
- [ ] Debugging methodology
- [ ] Other: [FILL: Specific need]

---
**Please provide:** A clear, actionable solution approach with reasoning, or alternative perspectives I should consider. I'm looking for breakthrough thinking to get unstuck.
EOF

    echo ""
    echo "🎯 **COPY-PASTE PROMPT GENERATED**"
    echo "📋 **File:** $EXTERNAL_PROMPT"
    echo ""
    echo "👉 **INSTRUCTIONS FOR USER:**"
    echo "1. Open the file: $EXTERNAL_PROMPT"
    echo "2. Fill in all [FILL: ...] placeholders with actual details"
    echo "3. Copy the entire completed prompt"
    echo "4. Paste into Gemini, GPT-4, or your preferred external LLM"
    echo "5. Share the response back with me for implementation"
    echo ""
    echo "✨ **This structured approach maximizes collaboration effectiveness!**"
    
    # Add to main report
    echo "" >> $LOOP_REPORT
    echo "### 🎯 COPY-PASTE PROMPT READY" >> $LOOP_REPORT
    echo "**File Generated:** $EXTERNAL_PROMPT" >> $LOOP_REPORT
    echo "**Instructions:** Fill placeholders, copy entire prompt, paste to external LLM" >> $LOOP_REPORT
    echo "**Status:** Ready for user action" >> $LOOP_REPORT
}
```

## Phase 4: Escalation Execution

### Collaboration Initiation

When escalation triggers are met:

1. **Finalize collaboration package** with all context
2. **Select appropriate external collaborator** based on issue type
3. **Initiate collaboration request** with structured information
4. **Monitor collaboration progress** and integrate responses
5. **Document solution and learnings** for future reference

### Collaboration Management

```bash
# Function to manage active collaboration
manage_collaboration() {
    local collaborator="$1"
    local request_id="$2"
    
    echo "=== ACTIVE COLLABORATION ===" >> $LOOP_REPORT
    echo "Collaboration Started: $(date)" >> $LOOP_REPORT
    echo "Collaborator: $collaborator" >> $LOOP_REPORT
    echo "Request ID: $request_id" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Collaboration Tracking:" >> $LOOP_REPORT
    echo "- **Request Sent:** $(date)" >> $LOOP_REPORT
    echo "- **Information Package:** Complete" >> $LOOP_REPORT
    echo "- **Response Expected:** [Timeline]" >> $LOOP_REPORT
    echo "- **Status:** Active" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Response Integration Plan:" >> $LOOP_REPORT
    echo "- [ ] **Validate suggested solution** against our constraints" >> $LOOP_REPORT
    echo "- [ ] **Test proposed approach** in safe environment" >> $LOOP_REPORT
    echo "- [ ] **Document new learnings** from collaboration" >> $LOOP_REPORT
    echo "- [ ] **Update internal knowledge** for future similar issues" >> $LOOP_REPORT
    echo "- [ ] **Close collaboration** when issue resolved" >> $LOOP_REPORT
}
```

## Phase 5: Learning Integration

### Solution Documentation

When collaboration yields results:

```bash
document_solution() {
    local solution_approach="$1"
    local collaborator="$2"
    
    echo "" >> $LOOP_REPORT
    echo "=== SOLUTION DOCUMENTATION ===" >> $LOOP_REPORT
    echo "Solution Found: $(date)" >> $LOOP_REPORT
    echo "Collaborator: $collaborator" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Solution Summary:" >> $LOOP_REPORT
    echo "**Approach:** $solution_approach" >> $LOOP_REPORT
    echo "**Key Insight:** [What made this solution work]" >> $LOOP_REPORT
    echo "**Why Previous Attempts Failed:** [Root cause analysis]" >> $LOOP_REPORT
    echo "**Implementation Steps:** [How solution was applied]" >> $LOOP_REPORT
    echo "**Validation Results:** [How success was verified]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Knowledge Integration:" >> $LOOP_REPORT
    echo "**New Understanding:** [What we learned about this type of problem]" >> $LOOP_REPORT
    echo "**Pattern Recognition:** [How to identify similar issues faster]" >> $LOOP_REPORT
    echo "**Prevention Strategy:** [How to avoid this issue in future]" >> $LOOP_REPORT
    echo "**Collaboration Value:** [What external perspective provided]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Future Reference:" >> $LOOP_REPORT
    echo "**Issue Type:** [Classification for future lookup]" >> $LOOP_REPORT
    echo "**Solution Pattern:** [Reusable approach]" >> $LOOP_REPORT
    echo "**Recommended Collaborator:** [For similar future issues]" >> $LOOP_REPORT
    echo "**Documentation Updates:** [Changes to make to prevent recurrence]" >> $LOOP_REPORT
}
```

### Loop Prevention Learning

Extract patterns to prevent future loops:

```bash
extract_loop_patterns() {
    echo "" >> $LOOP_REPORT
    echo "=== LOOP PREVENTION ANALYSIS ===" >> $LOOP_REPORT
    echo "Analysis Date: $(date)" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Loop Indicators Observed:" >> $LOOP_REPORT
    echo "- **Trigger Point:** [What should have prompted earlier escalation]" >> $LOOP_REPORT
    echo "- **Repetition Pattern:** [How approaches were repeating]" >> $LOOP_REPORT
    echo "- **Knowledge Boundary:** [Where internal expertise reached limits]" >> $LOOP_REPORT
    echo "- **Time Investment:** [Total time spent before escalation]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Optimization Opportunities:" >> $LOOP_REPORT
    echo "- **Earlier Escalation:** [When should we have escalated sooner]" >> $LOOP_REPORT
    echo "- **Better Classification:** [How to categorize similar issues faster]" >> $LOOP_REPORT
    echo "- **Improved Tracking:** [How to better monitor solution attempts]" >> $LOOP_REPORT
    echo "- **Knowledge Gaps:** [Areas to improve internal expertise]" >> $LOOP_REPORT
    echo "" >> $LOOP_REPORT
    
    echo "### Prevention Recommendations:" >> $LOOP_REPORT
    echo "- **Escalation Triggers:** [Refined triggers for this issue type]" >> $LOOP_REPORT
    echo "- **Early Warning Signs:** [Indicators to watch for]" >> $LOOP_REPORT
    echo "- **Documentation Improvements:** [What to add to prevent recurrence]" >> $LOOP_REPORT
    echo "- **Process Enhancements:** [How to handle similar issues better]" >> $LOOP_REPORT
}
```

## Integration Points

### Variables Exported for Other Tools

```bash
# Core loop detection variables
export ATTEMPT_COUNT=[number of solution attempts]
export TIME_INVESTED=[minutes spent on issue]
export ESCALATION_TRIGGERED=[true/false]
export COLLABORATOR_SELECTED=[external agent chosen]
export SOLUTION_FOUND=[true/false]

# Issue classification variables  
export ISSUE_TYPE=[implementation/architecture/platform/performance/compatibility]
export KNOWLEDGE_DOMAIN=[specialized area if applicable]
export COMPLEXITY_LEVEL=[low/medium/high]

# Collaboration variables
export COLLABORATION_PACKAGE_PATH=[path to information package]
export COLLABORATOR_RESPONSE=[summary of external input]
export SOLUTION_APPROACH=[final working solution]

# Learning variables
export LOOP_PATTERNS=[patterns that led to loops]
export PREVENTION_STRATEGIES=[how to avoid similar loops]
export KNOWLEDGE_GAPS=[areas for improvement]
```

### Integration with Other BMAD Tools

- **Triggers create-remediation-story.md** when solution creates new tasks
- **Updates reality-audit-comprehensive.md** with solution validation
- **Feeds into build-context-analysis.md** for future similar issues
- **Provides data for quality framework improvements**

---

## Summary

This comprehensive loop detection and escalation framework prevents agents from wasting time and context on repetitive unsuccessful approaches. It combines systematic tracking, automatic trigger detection, structured collaboration preparation, and learning integration to ensure efficient problem-solving through external expertise when needed.

**Key Features:**
- **Systematic attempt tracking** with detailed outcomes and learnings
- **Automatic loop detection** based on multiple trigger conditions
- **Structured collaboration preparation** for optimal external engagement
- **Intelligent collaborator selection** based on issue classification
- **Solution documentation and learning integration** for continuous improvement
- **Prevention pattern extraction** to avoid future similar loops

**Benefits:**
- **Prevents context window exhaustion** from repetitive debugging
- **Enables efficient external collaboration** through structured requests
- **Preserves learning and insights** for future similar issues
- **Reduces time investment** in unproductive solution approaches
- **Improves overall problem-solving efficiency** through systematic escalation