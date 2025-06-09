# BMAD Method Memory Enhancement: Claude Code Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing BMAD Method Memory Enhancement in Claude Code conversations. Claude Code's conversation-based interface makes it ideal for the BMAD transient memory approach.

## Quick Start (2 minutes)

### Step 1: BMAD Memory Activation Prompt

Copy and paste this prompt at the start of any Claude Code conversation:

```markdown
 BMAD METHOD MEMORY ENHANCEMENT - CLAUDE CODE ACTIVATION

You are now equipped with the BMAD Method enhanced with intelligent memory capabilities for Claude Code.

BMAD MEMORY SYSTEM ACTIVATION:
 Conversation-based BMAD memory storage
 Automatic BMAD pattern recognition
 Command-driven BMAD memory operations
 File-based BMAD memory persistence

BMAD MEMORY COMMANDS:
- /bmad-remember [content] [type] [importance]  Create BMAD methodology memory
- /bmad-recall [query] [type] [limit]  Search BMAD methodology memories
- /bmad-memories [filter] [limit]  List BMAD methodology memories
- /bmad-forget [id]  Delete BMAD methodology memory
- /bmad-status  Show BMAD methodology memory statistics
- /bmad-export  Export BMAD methodology memories to file

BMAD AUTOMATIC TRIGGERS:
- "Remember this BMAD approach: [content]"  SEMANTIC memory
- "I've decided on this BMAD methodology: [content]"  DECISION memory
- "The BMAD solution is: [content]"  SOLUTION memory
- "I learned this BMAD pattern: [content]"  LEARNING memory
- "The BMAD pattern here is: [content]"  PATTERN memory

BMAD MEMORY TYPES:
- WORKING: Current BMAD session context
- DECISION: Important BMAD methodology choices
- SOLUTION: BMAD problem-solving insights
- LEARNING: New BMAD methodology knowledge
- PATTERN: Recurring BMAD methodology approaches
- SEMANTIC: BMAD conceptual knowledge

BMAD MEMORY STORAGE:
- Primary: Conversation context for immediate access
- Secondary: File exports for persistence
- Format: Simple text with metadata

CURRENT BMAD STATE:
- Total BMAD memories: 0
- BMAD session: NEW
- BMAD project context: [TO BE DETERMINED]

Confirm BMAD Method activation and ask for project context.
```

### Step 2: Test BMAD Memory System

After activation, test the BMAD memory system:

```
/bmad-status
/bmad-remember "Testing BMAD memory enhancement in Claude Code" WORKING 0.5
/bmad-recall "testing"
/bmad-memories
```

## BMAD Memory Commands in Claude Code

### Basic BMAD Memory Operations

#### Create BMAD Memory
```
/bmad-remember "BMAD Method recommends component-based architecture" DECISION 0.8

Expected Response:
[CREATED] bmad_mem_001: DECISION
CONTENT: BMAD Method recommends component-based architecture
IMPORTANCE: 0.8
TAGS: bmad, methodology, architecture, component-based
CREATED: 2024-01-15T10:30:00Z

BMAD memory created successfully.
```

#### Search BMAD Memories
```
/bmad-recall "component architecture"

Expected Response:
Found 1 BMAD memory:

bmad_mem_001 (DECISION, importance: 0.8)
CONTENT: BMAD Method recommends component-based architecture
TAGS: bmad, methodology, architecture, component-based
CREATED: 2024-01-15T10:30:00Z
```

#### List BMAD Memories
```
/bmad-memories

Expected Response:
BMAD METHODOLOGY MEMORIES (1 total):

bmad_mem_001 | DECISION | 0.8 | BMAD Method recommends component-based architecture
```

#### Check BMAD Status
```
/bmad-status

Expected Response:
BMAD METHOD MEMORY STATUS:
- Total BMAD memories: 1
- BMAD memory types: DECISION(1)
- BMAD session duration: 5 minutes
- Last BMAD memory: bmad_mem_001 (2 minutes ago)
- BMAD memory storage: Conversation context
- BMAD project context: Component library development
```

### Automatic BMAD Memory Creation

Claude Code will automatically create BMAD memories when you use trigger phrases:

```
User: "Remember this BMAD approach: We use atomic design methodology for component organization"

Claude Response:
[AUTO-CREATED] bmad_mem_002: SEMANTIC
CONTENT: We use atomic design methodology for component organization
IMPORTANCE: 0.7
TAGS: bmad, methodology, atomic-design, component-organization
CREATED: 2024-01-15T10:35:00Z

I've automatically created a BMAD memory for this approach. Atomic design is an excellent methodology for organizing components in a scalable way.
```

```
User: "I've decided on this BMAD methodology: TypeScript for all frontend development"

Claude Response:
[AUTO-CREATED] bmad_mem_003: DECISION
CONTENT: TypeScript for all frontend development
IMPORTANCE: 0.8
TAGS: bmad, methodology, typescript, frontend, development
CREATED: 2024-01-15T10:37:00Z

Excellent BMAD decision! TypeScript will provide better type safety and developer experience. This decision will guide our frontend development approach.
```

## BMAD File-Based Persistence in Claude Code

### Export BMAD Memories

```
/bmad-export

Expected Response:
BMAD METHODOLOGY MEMORY EXPORT
Generated: 2024-01-15T10:40:00Z
Project: Component Library Development

=== BMAD MEMORY EXPORT ===

bmad_mem_001 | DECISION | 0.8 | 2024-01-15T10:30:00Z
CONTENT: BMAD Method recommends component-based architecture
TAGS: bmad, methodology, architecture, component-based

bmad_mem_002 | SEMANTIC | 0.7 | 2024-01-15T10:35:00Z
CONTENT: We use atomic design methodology for component organization
TAGS: bmad, methodology, atomic-design, component-organization

bmad_mem_003 | DECISION | 0.8 | 2024-01-15T10:37:00Z
CONTENT: TypeScript for all frontend development
TAGS: bmad, methodology, typescript, frontend, development

=== END BMAD EXPORT ===

Save this as bmad-memories-[date].txt for future reference.
```

### Import BMAD Memories

```
/bmad-import

Paste your BMAD memory export here:

[User pastes previous export]

Expected Response:
BMAD MEMORY IMPORT SUCCESSFUL:
- Imported 3 BMAD memories
- bmad_mem_001: DECISION - Component-based architecture
- bmad_mem_002: SEMANTIC - Atomic design methodology
- bmad_mem_003: DECISION - TypeScript for frontend

BMAD methodology context restored. Ready to continue with established BMAD patterns.
```

## BMAD Workflow Examples in Claude Code

### Example 1: BMAD Component Development

```
User: "Let's develop a button component using BMAD methodology"

Claude: "/bmad-recall 'component'

Found relevant BMAD memories:
- bmad_mem_001: Component-based architecture
- bmad_mem_002: Atomic design methodology

Based on our established BMAD patterns, I'll create a button component following atomic design principles with component-based architecture.

Remember this BMAD approach: Button component uses variants for different styles and sizes

[AUTO-CREATED] bmad_mem_004: PATTERN
CONTENT: Button component uses variants for different styles and sizes
IMPORTANCE: 0.7
TAGS: bmad, methodology, button, component, variants

Here's the BMAD-compliant button component:

```tsx
// Button.tsx - Following BMAD atomic design methodology
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  children, 
  onClick 
}) => {
  // Implementation following BMAD component-based architecture
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

This follows our BMAD methodology with:
- Component-based architecture (bmad_mem_001)
- Atomic design principles (bmad_mem_002)
- TypeScript implementation (bmad_mem_003)
- Variant-based styling (bmad_mem_004)
```

### Example 2: BMAD Problem Solving

```
User: "I'm having performance issues with my React components"

Claude: "/bmad-recall 'performance'

No specific BMAD performance memories found. Let me help solve this and create a BMAD memory for future reference.

What specific performance issues are you experiencing? I'll analyze the problem using BMAD methodology and remember the solution.

User: "Components are re-rendering too frequently"

Claude: "The BMAD solution is: Use React.memo and useMemo to prevent unnecessary re-renders

[AUTO-CREATED] bmad_mem_005: SOLUTION
CONTENT: Use React.memo and useMemo to prevent unnecessary re-renders
IMPORTANCE: 0.8
TAGS: bmad, methodology, performance, react, memo, optimization

Here's the BMAD performance optimization approach:

```tsx
// BMAD performance optimization pattern
import React, { memo, useMemo } from 'react';

// Memoize component to prevent unnecessary re-renders
export const OptimizedComponent = memo(({ data, onUpdate }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.computed}</div>
      ))}
    </div>
  );
});
```

I've created a BMAD memory for this performance solution. This pattern will be referenced for future performance optimization questions.
```

### Example 3: BMAD Architecture Planning

```
User: "Let's plan the architecture for our new feature using BMAD methodology"

Claude: "/bmad-recall 'architecture'

Found relevant BMAD memories:
- bmad_mem_001: Component-based architecture
- bmad_mem_003: TypeScript for frontend

Based on our established BMAD architecture patterns, let's plan the new feature.

What feature are we building?

User: "A user dashboard with widgets"

Claude: "I've decided on this BMAD methodology: Dashboard uses widget-based architecture with container-component pattern

[AUTO-CREATED] bmad_mem_006: DECISION
CONTENT: Dashboard uses widget-based architecture with container-component pattern
IMPORTANCE: 0.8
TAGS: bmad, methodology, dashboard, widgets, architecture, container-component

BMAD ARCHITECTURE PLAN:

```
Dashboard Architecture (BMAD Methodology):
 DashboardContainer (Smart Component)
    State management
    Data fetching
    Widget orchestration
 DashboardLayout (Layout Component)
    Grid system
    Responsive design
    Widget positioning
 Widgets (Atomic Components)
     ChartWidget
     StatsWidget
     TableWidget
     CustomWidget
```

This follows our BMAD patterns:
- Component-based architecture (bmad_mem_001)
- TypeScript implementation (bmad_mem_003)
- Container-component pattern (bmad_mem_006)
- Atomic design principles (bmad_mem_002)

Remember this BMAD approach: Each widget is self-contained with its own props interface

[AUTO-CREATED] bmad_mem_007: PATTERN
CONTENT: Each widget is self-contained with its own props interface
IMPORTANCE: 0.7
TAGS: bmad, methodology, widgets, self-contained, props, interface
```

## Advanced BMAD Features in Claude Code

### BMAD Memory Relationships

```
/bmad-relate bmad_mem_001 "supports" bmad_mem_006 0.9

Expected Response:
BMAD MEMORY RELATIONSHIP CREATED:
bmad_mem_001 (Component-based architecture) SUPPORTS bmad_mem_006 (Dashboard widget architecture) with strength 0.9

This relationship indicates that our component-based architecture decision strongly supports the dashboard widget architecture approach.
```

### BMAD Memory Analytics

```
/bmad-analytics

Expected Response:
BMAD METHODOLOGY MEMORY ANALYTICS:

Memory Distribution:
- DECISION: 3 memories (43%)
- PATTERN: 2 memories (29%)
- SEMANTIC: 1 memory (14%)
- SOLUTION: 1 memory (14%)

Importance Distribution:
- High (0.8-1.0): 4 memories
- Medium (0.6-0.8): 3 memories
- Low (0.1-0.6): 0 memories

Most Referenced Tags:
1. bmad (7 memories)
2. methodology (7 memories)
3. architecture (3 memories)
4. component (3 memories)

Recent Activity:
- Last 10 minutes: 3 memories created
- Most active: Architecture planning
- Trending: Widget development patterns
```

### BMAD Memory Templates

```
/bmad-template COMPONENT "Component: [name], Purpose: [purpose], Props: [props], Dependencies: [deps]"

Expected Response:
BMAD COMPONENT TEMPLATE CREATED:
Template ID: bmad_template_component
Format: Component: [name], Purpose: [purpose], Props: [props], Dependencies: [deps]

Use with: /bmad-remember-template COMPONENT name="Button" purpose="User interaction" props="variant,size,onClick" deps="React"
```

```
/bmad-remember-template COMPONENT name="Modal" purpose="Display overlay content" props="isOpen,onClose,title,children" deps="React,ReactDOM"

Expected Response:
[CREATED] bmad_mem_008: PATTERN
CONTENT: Component: Modal, Purpose: Display overlay content, Props: isOpen,onClose,title,children, Dependencies: React,ReactDOM
IMPORTANCE: 0.7
TAGS: bmad, methodology, component, modal, template
CREATED: 2024-01-15T11:00:00Z

BMAD component template applied successfully.
```

## BMAD Session Management in Claude Code

### Start BMAD Session

```
/bmad-start-session "Component Library Development Sprint 1"

Expected Response:
BMAD SESSION STARTED:
- Session ID: bmad_session_20240115_001
- Project: Component Library Development Sprint 1
- Started: 2024-01-15T11:00:00Z
- BMAD memories loaded: 8
- Session context: Active

Ready for memory-enhanced BMAD methodology development.
```

### End BMAD Session

```
/bmad-end-session

Expected Response:
BMAD SESSION SUMMARY:
- Session duration: 45 minutes
- BMAD memories created: 5
- BMAD decisions made: 2
- BMAD patterns established: 2
- BMAD solutions documented: 1

SESSION EXPORT:
[Provides complete session export for saving]

BMAD session ended. Memories preserved for future sessions.
```

## BMAD Best Practices for Claude Code

### 1. Always Start with BMAD Activation
Begin every Claude Code conversation with the BMAD memory activation prompt

### 2. Use Descriptive BMAD Memory Content
```
Good: /bmad-remember "BMAD Method recommends React Query for server state management with automatic caching" DECISION 0.8
Bad:  /bmad-remember "Use React Query" DECISION 0.5
```

### 3. Leverage Automatic BMAD Triggers
Use natural language that triggers automatic BMAD memory creation:
- "Remember this BMAD approach: ..."
- "I've decided on this BMAD methodology: ..."
- "The BMAD solution is: ..."

### 4. Export BMAD Memories Regularly
Use /bmad-export at the end of important sessions to preserve BMAD memories

### 5. Reference BMAD Memories in Conversations
Ask Claude to check relevant BMAD memories before making suggestions:
"Check our previous BMAD decisions about state management before suggesting an approach"

### 6. Build BMAD Memory Progressively
Create BMAD memories throughout the conversation, not just at the end

### 7. Use Appropriate BMAD Importance Levels
- 0.9-1.0: Critical BMAD architecture decisions
- 0.7-0.8: Important BMAD patterns and solutions
- 0.5-0.6: Useful BMAD working notes
- 0.1-0.4: Temporary BMAD information

## Troubleshooting BMAD Memory in Claude Code

### Issue: BMAD Commands Not Working

**Solution:**
```
Re-activate BMAD memory with explicit instructions:

"You MUST respond to these exact BMAD commands:
- /bmad-remember [content] [type] [importance]
- /bmad-recall [query]
- /bmad-memories
- /bmad-status

Confirm you understand and will respond to these BMAD commands."
```

### Issue: BMAD Automatic Triggers Not Working

**Solution:**
```
Reinforce BMAD automatic memory creation:

"You MUST automatically create BMAD memories when I use these exact phrases:
- 'Remember this BMAD approach: [content]'
- 'I've decided on this BMAD methodology: [content]'
- 'The BMAD solution is: [content]'

Confirm you will watch for these BMAD trigger phrases."
```

### Issue: BMAD Memories Not Referenced

**Solution:**
```
Instruct Claude to actively use BMAD memories:

"Before responding to any question, you MUST:
1. Check for relevant BMAD memories using /bmad-recall
2. Reference applicable BMAD memories in your response
3. Build upon previous BMAD decisions and patterns

Confirm you will actively use BMAD memories in responses."
```

This implementation guide provides everything needed to use BMAD Method Memory Enhancement effectively in Claude Code conversations!
```
