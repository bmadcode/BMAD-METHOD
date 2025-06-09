# BMAD Method Memory Enhancement Commands

## Overview

This reference documents the memory enhancement commands that integrate with the BMAD Method. These commands extend BMAD personas and workflows with persistent context capabilities across all supported platforms.

## Quick Command Summary

| Command | Purpose | Example |
|---------|---------|---------|
| `/bmad-remember` | Create BMAD methodology memory | `/bmad-remember "Component-based architecture pattern" METHODOLOGY 0.8` |
| `/bmad-recall` | Search BMAD methodology memories | `/bmad-recall "architecture patterns"` |
| `/bmad-memories` | List BMAD methodology memories | `/bmad-memories DECISION` |
| `/bmad-forget` | Remove BMAD methodology memory | `/bmad-forget mem_001` |
| `/bmad-status` | Show BMAD memory status | `/bmad-status` |
| `/bmad-relate` | Link BMAD methodology memories | `/bmad-relate mem_001 "supports" mem_002` |
| `/bmad-update` | Modify BMAD methodology memory | `/bmad-update mem_001 "Updated methodology approach"` |

## Detailed Command Reference

### BMAD Memory Creation Commands

#### `/bmad-remember [content] [type] [importance]`
Creates a new BMAD methodology memory with specified content, type, and importance level.

**Syntax:**
```
/bmad-remember "[content]" [TYPE] [importance_0.0-1.0]
```

**Types:**
- `WORKING` - Current BMAD session context
- `DECISION` - Important BMAD methodology choices
- `SOLUTION` - BMAD methodology problem-solving insights  
- `LEARNING` - New BMAD methodology knowledge
- `PATTERN` - Recurring BMAD methodology approaches
- `SEMANTIC` - BMAD conceptual knowledge
- `PROCEDURAL` - BMAD workflow knowledge

**Examples:**
```
/bmad-remember "Use component-based architecture for scalability" DECISION 0.8
/bmad-remember "Mobile-first design methodology for all UIs" PATTERN 0.7
/bmad-remember "Current sprint focusing on authentication flows" WORKING 0.5
/bmad-remember "Atomic design system improves component reuse" LEARNING 0.6
```

#### Automatic BMAD Memory Triggers

These phrases automatically create BMAD methodology memories:

```
"Remember this BMAD approach: [content]"            SEMANTIC memory
"I've decided on this BMAD methodology: [content]"  DECISION memory
"The BMAD solution is: [content]"                   SOLUTION memory
"I learned this BMAD pattern: [content]"            LEARNING memory
"The BMAD workflow pattern is: [content]"           PATTERN memory
"The current BMAD context is: [content]"            WORKING memory
```

**Examples:**
```
User: "Remember this BMAD approach: We use atomic design methodology for all components"
 Creates SEMANTIC memory with importance 0.7

User: "I've decided on this BMAD methodology: TypeScript for all frontend development"
 Creates DECISION memory with importance 0.8

User: "The BMAD solution is: Use React Context for simple state, Redux for complex state"
 Creates SOLUTION memory with importance 0.8
```

### BMAD Memory Retrieval Commands

#### `/bmad-recall [query] [type] [limit]`
Searches BMAD methodology memories based on content, tags, or metadata.

**Syntax:**
```
/bmad-recall "[search_query]" [TYPE] [max_results]
```

**Examples:**
```
/bmad-recall "architecture patterns"          # Search all BMAD memories
/bmad-recall "state management" DECISION      # Search only BMAD decision memories
/bmad-recall "component design" SOLUTION 3    # Limit to 3 BMAD solution memories
/bmad-recall "react" PATTERN                  # Find BMAD React patterns
```

**Advanced BMAD Search:**
```
/bmad-recall tag:architecture                # Search by BMAD methodology tag
/bmad-recall importance:>0.7                 # High importance BMAD memories
/bmad-recall created:today                   # Today's BMAD methodology memories
/bmad-recall persona:architect               # Architect persona BMAD memories
```

#### `/bmad-memories [filter] [limit]`
Lists BMAD methodology memories with optional filtering.

**Syntax:**
```
/bmad-memories [TYPE|filter] [limit]
```

**Examples:**
```
/bmad-memories                           # List all BMAD methodology memories
/bmad-memories DECISION                  # List BMAD methodology decisions
/bmad-memories recent 5                  # 5 most recent BMAD memories
/bmad-memories important                 # High-importance BMAD memories (>0.7)
/bmad-memories today                     # Today's BMAD methodology memories
/bmad-memories working                   # Current BMAD working memories
```

#### `/bmad-recall-related [memory_id]`
Finds BMAD methodology memories related to a specific memory.

**Examples:**
```
/bmad-recall-related mem_001             # Find BMAD memories related to mem_001
/bmad-recall-related "authentication"    # Find BMAD memories related to authentication
```

### BMAD Memory Management Commands

#### `/bmad-update [id] [new_content]`
Updates existing BMAD methodology memory content.

**Examples:**
```
/bmad-update mem_001 "Updated component architecture pattern with micro-frontends"
/bmad-update mem_005 importance:0.9
/bmad-update mem_003 tags:+security,+authentication
```

#### `/bmad-forget [id|filter]`
Removes BMAD methodology memories based on ID or filter criteria.

**Examples:**
```
/bmad-forget mem_001                     # Delete specific BMAD memory
/bmad-forget-working                     # Clear all BMAD working memories
/bmad-forget-old 30                      # Delete BMAD memories older than 30 days
/bmad-forget importance:<0.3             # Delete low-importance BMAD memories
/bmad-forget tag:temporary               # Delete BMAD memories tagged as temporary
```

#### `/bmad-relate [source_id] [relationship] [target_id] [strength]`
Creates relationships between BMAD methodology memories.

**Relationship Types:**
- `supports` - Source supports target BMAD methodology
- `contradicts` - Source contradicts target BMAD methodology
- `follows` - Source follows target chronologically in BMAD workflow
- `precedes` - Source comes before target in BMAD workflow
- `relates_to` - General BMAD methodology relationship
- `part_of` - Source is part of target BMAD methodology
- `implements` - Source implements target BMAD methodology

**Examples:**
```
/bmad-relate mem_001 "supports" mem_002 0.8
/bmad-relate mem_005 "follows" mem_004 0.9
/bmad-relate mem_010 "contradicts" mem_008 0.7
```

### BMAD Memory Analytics Commands

#### `/bmad-status`
Shows comprehensive BMAD methodology memory status.

**Output includes:**
- Total BMAD memory count by type
- BMAD memory usage statistics
- Recent BMAD methodology activity
- BMAD persona memory distribution
- BMAD methodology performance metrics

#### `/bmad-health`
Checks BMAD methodology memory integrity and performance.

**Checks:**
- BMAD memory file integrity
- BMAD memory index consistency
- BMAD methodology relationship validity
- BMAD memory performance metrics
- BMAD storage optimization opportunities

#### `/bmad-analytics [period]`
Generates detailed BMAD methodology memory analytics for specified time period.

**Examples:**
```
/bmad-analytics today             # Today's BMAD memory activity
/bmad-analytics week              # This week's BMAD analytics
/bmad-analytics month             # Monthly BMAD analytics
/bmad-analytics all               # All-time BMAD analytics
```

### BMAD Memory Import/Export Commands

#### `/bmad-export [format] [filter]`
Exports BMAD methodology memories in specified format.

**Formats:**
- `json` - JSON format for programmatic use
- `markdown` - Markdown format for documentation
- `csv` - CSV format for spreadsheet analysis
- `text` - Simple text format

**Examples:**
```
/bmad-export json                 # Export all BMAD memories as JSON
/bmad-export markdown DECISION    # Export BMAD decisions as Markdown
/bmad-export csv important        # Export important BMAD memories as CSV
```

#### `/bmad-import [file] [format]`
Imports BMAD methodology memories from file.

**Examples:**
```
/bmad-import bmad-memories.json json
/bmad-import bmad-decisions.md markdown
/bmad-import bmad-patterns.csv csv
```

### BMAD Workflow Enhancement Commands

#### `/bmad-workflow [workflow_type]`
Initiates a memory-enhanced BMAD workflow.

**Workflow Types:**
- `PROBLEM_SOLVING` - BMAD problem analysis and solution tracking
- `ARCHITECTURE_PLANNING` - BMAD architecture decision tracking
- `FEATURE_DEVELOPMENT` - BMAD feature development memory management
- `CODE_REVIEW` - BMAD code review with pattern matching
- `DEBUGGING` - BMAD bug tracking and solution documentation

**Examples:**
```
/bmad-workflow PROBLEM_SOLVING
 Creates BMAD working memory for problem
 Tracks BMAD solution attempts
 Documents final BMAD methodology solution

/bmad-workflow ARCHITECTURE_PLANNING  
 Creates BMAD decision tracking
 Documents alternatives considered
 Records rationale for BMAD methodology choices
```

#### `/bmad-end-workflow [workflow_id]`
Completes a BMAD workflow and consolidates memories.

**Examples:**
```
/bmad-end-workflow prob_001
 Consolidates BMAD problem-solving memories
 Creates BMAD solution pattern if applicable
 Archives BMAD working memories
```

### BMAD Template Commands

#### `/bmad-template [type] [template_definition]`
Creates reusable BMAD methodology memory templates.

**Examples:**
```
/bmad-template DECISION "Technology: [tech], Reason: [reason], Alternatives: [alts], Impact: [impact]"

/bmad-template SOLUTION "Problem: [problem], Root Cause: [cause], Solution: [solution], Steps: [steps], Result: [result]"

/bmad-template PATTERN "Pattern: [name], Use Case: [usecase], Implementation: [impl], Benefits: [benefits]"
```

#### `/bmad-remember-template [template_type] [parameters]`
Creates BMAD methodology memory using predefined template.

**Examples:**
```
/bmad-remember-template DECISION tech="React" reason="Component reusability" alts="Vue,Angular" impact="High"

/bmad-remember-template SOLUTION problem="Slow component rendering" cause="Excessive re-renders" solution="React.memo and useMemo" steps="1. Identify components, 2. Apply memoization, 3. Test performance" result="60% faster rendering"
```

## BMAD Persona Integration

### Product Manager Persona Commands

```
/bmad-pm-remember "Market research insight: [content]"
/bmad-pm-recall "stakeholder requirements"
/bmad-pm-priorities - List prioritized BMAD requirements
```

### Architect Persona Commands

```
/bmad-arch-remember "Architecture decision: [content]"
/bmad-arch-recall "technology decisions"
/bmad-arch-patterns - List BMAD architecture patterns
```

### v0 UX/UI Architect Persona Commands

```
/bmad-ux-remember "Design pattern: [content]"
/bmad-ux-recall "component patterns"
/bmad-ux-system - Show BMAD design system memories
```

### Developer Persona Commands

```
/bmad-dev-remember "Implementation pattern: [content]"
/bmad-dev-recall "code solutions"
/bmad-dev-patterns - List BMAD development patterns
```

## Platform-Specific BMAD Integration

### Cursor AI Commands

```
/bmad-cursor-activate - Activate BMAD memory in Cursor AI
/bmad-cursor-workspace - Integrate with Cursor workspace
/bmad-cursor-codebase - Analyze codebase for BMAD patterns
```

### JetBrains Commands

```
/bmad-jetbrains-activate - Activate BMAD memory in JetBrains
/bmad-jetbrains-project - Integrate with JetBrains project
/bmad-jetbrains-analyze - Analyze project for BMAD patterns
```

### V0 Commands

```
/bmad-v0-activate - Activate BMAD memory in V0
/bmad-v0-components - Integrate with V0 component system
/bmad-v0-design - Analyze design system for BMAD patterns
```

## Command Aliases

For faster typing, these aliases are available:

| Alias | Full Command |
|-------|--------------|
| `/br` | `/bmad-remember` |
| `/brc` | `/bmad-recall` |
| `/bm` | `/bmad-memories` |
| `/bf` | `/bmad-forget` |
| `/bs` | `/bmad-status` |
| `/brel` | `/bmad-relate` |
| `/bup` | `/bmad-update` |

## BMAD Integration Examples

### BMAD Product Manager Workflow

```
*persona pm
/bmad-status
/bmad-remember "User research shows 70% mobile usage" INSIGHT 0.8
/bmad-workflow FEATURE_PLANNING
```

### BMAD Architect Workflow

```
*persona architect
/bmad-recall "mobile usage"
/bmad-remember "Mobile-first design methodology required" DECISION 0.9
/bmad-relate mem_002 "based_on" mem_001 0.8
```

### BMAD v0 UX/UI Architect Workflow

```
*persona v0-ux-ui
/bmad-recall "mobile-first"
/bmad-remember "Component library needs responsive primitives" PATTERN 0.8
/bmad-workflow DESIGN_SYSTEM
```

### BMAD Developer Workflow

```
*persona developer
/bmad-recall "responsive primitives"
/bmad-remember "Using React.useMediaQuery for responsive components" IMPLEMENTATION 0.7
/bmad-relate mem_004 "implements" mem_003 0.9
```

This command reference demonstrates how memory enhancement integrates with and extends the BMAD Method across all personas and platforms.
```
