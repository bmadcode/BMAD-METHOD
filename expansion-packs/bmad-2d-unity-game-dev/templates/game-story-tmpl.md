# Story: {{Story Title}}

**Epic:** {{Epic Name}}  
**Story ID:** {{ID}}  
**Priority:** {{High|Medium|Low}}  
**Points:** {{Story Points}}  
**Status:** Draft

[[LLM: This template creates detailed game development stories that are immediately actionable by game developers. Each story should focus on a single, implementable feature that contributes to the overall game functionality.

Before starting, ensure you have access to:

- Game Design Document (GDD)
- Game Architecture Document
- Any existing stories in this epic

The story should be specific enough that a developer can implement it without requiring additional design decisions.]]

## Description

[[LLM: Provide a clear, concise description of what this story implements. Focus on the specific game feature or system being built. Reference the GDD section that defines this feature.]]

{{clear_description_of_what_needs_to_be_implemented}}

## Acceptance Criteria

[[LLM: Define specific, testable conditions that must be met for the story to be considered complete. Each criterion should be verifiable and directly related to gameplay functionality.]]

### Functional Requirements

- [ ] {{specific_functional_requirement_1}}
- [ ] {{specific_functional_requirement_2}}
- [ ] {{specific_functional_requirement_3}}

### Technical Requirements

- [ ] Code follows C# best practices
- [ ] Maintains stable frame rate on target devices
- [ ] No memory leaks or performance degradation
- [ ] {{specific_technical_requirement}}

### Game Design Requirements

- [ ] {{gameplay_requirement_from_gdd}}
- [ ] {{balance_requirement_if_applicable}}
- [ ] {{player_experience_requirement}}

## Technical Specifications

[[LLM: Provide specific technical details that guide implementation. Include class names, file locations, and integration points based on the game architecture.]]

### Files to Create/Modify

**New Files:**

- `{{file_path_1}}` - {{purpose}}
- `{{file_path_2}}` - {{purpose}}

**Modified Files:**

- `{{existing_file_1}}` - {{changes_needed}}
- `{{existing_file_2}}` - {{changes_needed}}

### Class/Interface Definitions

[[LLM: Define specific C# interfaces and class structures needed]]

```csharp
// {{interface_name}}
public interface {{InterfaceName}}
{
    {{type}} {{Property1}} { get; set; }
    {{return_type}} {{Method1}}({{params}});
}

// {{class_name}}
public class {{ClassName}} : MonoBehaviour
{
    private {{type}} _{{property}};

    private void Awake()
    {
        // Implementation requirements
    }

    public {{return_type}} {{Method1}}({{params}})
    {
        // Method requirements
    }
}
```

### Integration Points

[[LLM: Specify how this feature integrates with existing systems]]

**Scene Integration:**

- {{scene_name}}: {{integration_details}}

**Component Dependencies:**

- {{component_name}}: {{dependency_description}}

**Event Communication:**

- Emits: `{{event_name}}` when {{condition}}
- Listens: `{{event_name}}` to {{response}}

## Implementation Tasks

[[LLM: Break down the implementation into specific, ordered tasks. Each task should be completable in 1-4 hours.]]

### Dev Agent Record

**Tasks:**

- [ ] {{task_1_description}}
- [ ] {{task_2_description}}
- [ ] {{task_3_description}}
- [ ] {{task_4_description}}
- [ ] Write unit tests for {{component}}
- [ ] Integration testing with {{related_system}}
- [ ] Performance testing and optimization

**Debug Log:**
| Task | File | Change | Reverted? |
|------|------|--------|-----------|
| | | | |

**Completion Notes:**

<!-- Only note deviations from requirements, keep under 50 words -->

**Change Log:**

<!-- Only requirement changes during implementation -->

## Game Design Context

[[LLM: Reference the specific sections of the GDD that this story implements]]

**GDD Reference:** {{section_name}} ({{page_or_section_number}})

**Game Mechanic:** {{mechanic_name}}

**Player Experience Goal:** {{experience_description}}

**Balance Parameters:**

- {{parameter_1}}: {{value_or_range}}
- {{parameter_2}}: {{value_or_range}}

## Testing Requirements

[[LLM: Define specific testing criteria for this game feature]]

### Unit Tests

**Test Files:**

- `Assets/Tests/EditMode/{{component_name}}Tests.cs`

**Test Scenarios:**

- {{test_scenario_1}}
- {{test_scenario_2}}
- {{edge_case_test}}

### Game Testing

**Manual Test Cases:**

1. {{test_case_1_description}}

   - Expected: {{expected_behavior}}
   - Performance: {{performance_expectation}}

2. {{test_case_2_description}}
   - Expected: {{expected_behavior}}
   - Edge Case: {{edge_case_handling}}

### Performance Tests

**Metrics to Verify:**

- Frame rate maintains stable FPS
- Memory usage stays under {{memory_limit}}MB
- {{feature_specific_performance_metric}}

## Dependencies

[[LLM: List any dependencies that must be completed before this story can be implemented]]

**Story Dependencies:**

- {{story_id}}: {{dependency_description}}

**Technical Dependencies:**

- {{system_or_file}}: {{requirement}}

**Asset Dependencies:**

- {{asset_type}}: {{asset_description}}
- Location: `{{asset_path}}`

## Definition of Done

[[LLM: Checklist that must be completed before the story is considered finished]]

- [ ] All acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Performance targets met
- [ ] No C# compiler errors or warnings
- [ ] Documentation updated
- [ ] {{game_specific_dod_item}}

## Notes

[[LLM: Any additional context, design decisions, or implementation notes]]

**Implementation Notes:**

- {{note_1}}
- {{note_2}}

**Design Decisions:**

- {{decision_1}}: {{rationale}}
- {{decision_2}}: {{rationale}}

**Future Considerations:**

- {{future_enhancement_1}}
- {{future_optimization_1}}
