# Implement Story with Review

## Purpose
Orchestrate story implementation with integrated analysis, review, and memory synthesis workflows using modular sub-tasks for optimal context management.

## Overview

This orchestrator coordinates three specialized tasks:
- **story-analysis**: Performs codebase search, dependency analysis, and complexity assessment
- **internal-review-process**: Executes systematic code review when complexity thresholds are exceeded
- **memory-synthesis**: Extracts and synthesizes learnings into persistent project memory

## Section 1: Analysis Phase

**Execute `story-analysis` task** to perform:
- User override checking and temporal context establishment
- Codebase semantic search for existing patterns and implementations
- Dependency analysis with version-based criticality assessment
- Story complexity assessment using Fibonacci scale
- Mode declaration (Review Mode vs. Standard Mode)

The analysis phase will create artifacts in the story's `Dev Notes` that inform subsequent implementation decisions.

## Section 2: Task Execution Phase

For each task in the story's task list:

1. **Load Analysis Results**: Reference the analysis artifacts created in Section 1
2. **Task Complexity Assessment**: Evaluate current task complexity using Fibonacci scale
3. **Conditional Implementation Path**:
   - **If task complexity > `agentThresholdTask`**: Execute `internal-review-process` task
   - **Else**: Implement directly using analysis findings for code reuse opportunities
4. **Testing and Completion**: Write and pass required tests, mark task complete

## Section 3: Story Finalization

1. **Execute DoD Checklist**: Run `story-dod-checklist` task
2. **Address Issues**: Resolve any checklist failures
3. **Update Status**: Change story status to `Review`

## Section 4: Memory Synthesis

**Execute `memory-synthesis` task** to perform:
- Comprehensive knowledge extraction from all Dev Notes
- Memory validation against existing project memory
- Conflict detection and resolution
- Project memory file updates

## Task Dependencies

This orchestrator requires access to:
- `story-analysis` task for initial analysis
- `internal-review-process` task for high-complexity reviews
- `memory-synthesis` task for learning extraction
- `story-dod-checklist` task for final validation
- `core-config.yml` for threshold configurations
- Story file for task list and Dev Notes sections

## Benefits of Modular Approach

- **Minimal Context**: Each sub-task loads only necessary information
- **Reusability**: Sub-tasks can be used independently or in other workflows
- **Maintainability**: Easier to update individual components
- **Testability**: Each component can be validated separately
- **Flexibility**: Different orchestration patterns possible for different scenarios
