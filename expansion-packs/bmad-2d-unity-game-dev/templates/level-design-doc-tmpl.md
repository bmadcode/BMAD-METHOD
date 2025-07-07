# {{Game Title}} Level Design Document

[[LLM: This template creates comprehensive level design documentation that guides both content creation and technical implementation. This document should provide enough detail for developers to create level loading systems and for designers to create specific levels.

If available, review: Game Design Document (GDD), Game Architecture Document. This document should align with the game mechanics and technical systems defined in those documents.]]

## Introduction

[[LLM: Establish the purpose and scope of level design for this game]]

This document defines the level design framework for {{Game Title}}, providing guidelines for creating engaging, balanced levels that support the core gameplay mechanics defined in the Game Design Document.

This framework ensures consistency across all levels while providing flexibility for creative level design within established technical and design constraints.

### Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

## Level Design Philosophy

[[LLM: Establish the overall approach to level design based on the game's core pillars and mechanics. Apply `tasks#advanced-elicitation` after presenting this section.]]

### Design Principles

[[LLM: Define 3-5 core principles that guide all level design decisions]]

1. **{{principle_1}}** - {{description}}
2. **{{principle_2}}** - {{description}}
3. **{{principle_3}}** - {{description}}

### Player Experience Goals

[[LLM: Define what players should feel and learn in each level category]]

**Tutorial Levels:** {{experience_description}}
**Standard Levels:** {{experience_description}}
**Challenge Levels:** {{experience_description}}
**Boss Levels:** {{experience_description}}

### Level Flow Framework

[[LLM: Define the standard structure for level progression]]

**Introduction Phase:** {{duration}} - {{purpose}}
**Development Phase:** {{duration}} - {{purpose}}
**Climax Phase:** {{duration}} - {{purpose}}
**Resolution Phase:** {{duration}} - {{purpose}}

## Level Categories

[[LLM: Define different types of levels based on the GDD requirements. Each category should be specific enough for implementation.]]

<<REPEAT section="level_category" count="based_on_gdd">>

### {{category_name}} Levels

**Purpose:** {{gameplay_purpose}}

**Target Duration:** {{min_time}} - {{max_time}} minutes

**Difficulty Range:** {{difficulty_scale}}

**Key Mechanics Featured:**

- {{mechanic_1}} - {{usage_description}}
- {{mechanic_2}} - {{usage_description}}

**Player Objectives:**

- Primary: {{primary_objective}}
- Secondary: {{secondary_objective}}
- Hidden: {{secret_objective}}

**Success Criteria:**

- {{completion_requirement_1}}
- {{completion_requirement_2}}

**Technical Requirements:**

- Maximum entities: {{entity_limit}}
- Performance target: {{fps_target}} FPS
- Memory budget: {{memory_limit}}MB
- Asset requirements: {{asset_needs}}

<</REPEAT>>

## Level Progression System

[[LLM: Define how players move through levels and how difficulty scales]]

### World Structure

[[LLM: Based on GDD requirements, define the overall level organization]]

**Organization Type:** {{linear|hub_world|open_world}}

**Total Level Count:** {{number}}

**World Breakdown:**

- World 1: {{level_count}} levels - {{theme}} - {{difficulty_range}}
- World 2: {{level_count}} levels - {{theme}} - {{difficulty_range}}
- World 3: {{level_count}} levels - {{theme}} - {{difficulty_range}}

### Difficulty Progression

[[LLM: Define how challenge increases across the game]]

**Progression Curve:**

````text
Difficulty
    ^     ___/```
    |    /
    |   /     ___/```
    |  /     /
    | /     /
    |/     /
    +-----------> Level Number
   Tutorial  Early  Mid  Late
````

**Scaling Parameters:**

- Enemy count: {{start_count}} → {{end_count}}
- Enemy difficulty: {{start_diff}} → {{end_diff}}
- Level complexity: {{start_complex}} → {{end_complex}}
- Time pressure: {{start_time}} → {{end_time}}

### Unlock Requirements

[[LLM: Define how players access new levels]]

**Progression Gates:**

- Linear progression: Complete previous level
- Star requirements: {{star_count}} stars to unlock
- Skill gates: Demonstrate {{skill_requirement}}
- Optional content: {{unlock_condition}}

## Level Design Components

[[LLM: Define the building blocks used to create levels]]

### Environmental Elements

[[LLM: Define all environmental components that can be used in levels]]

**Terrain Types:**

- {{terrain_1}}: {{properties_and_usage}}
- {{terrain_2}}: {{properties_and_usage}}

**Interactive Objects:**

- {{object_1}}: {{behavior_and_purpose}}
- {{object_2}}: {{behavior_and_purpose}}

**Hazards and Obstacles:**

- {{hazard_1}}: {{damage_and_behavior}}
- {{hazard_2}}: {{damage_and_behavior}}

### Collectibles and Rewards

[[LLM: Define all collectible items and their placement rules]]

**Collectible Types:**

- {{collectible_1}}: {{value_and_purpose}}
- {{collectible_2}}: {{value_and_purpose}}

**Placement Guidelines:**

- Mandatory collectibles: {{placement_rules}}
- Optional collectibles: {{placement_rules}}
- Secret collectibles: {{placement_rules}}

**Reward Distribution:**

- Easy to find: {{percentage}}%
- Moderate challenge: {{percentage}}%
- High skill required: {{percentage}}%

### Enemy Placement Framework

[[LLM: Define how enemies should be placed and balanced in levels]]

**Enemy Categories:**

- {{enemy_type_1}}: {{behavior_and_usage}}
- {{enemy_type_2}}: {{behavior_and_usage}}

**Placement Principles:**

- Introduction encounters: {{guideline}}
- Standard encounters: {{guideline}}
- Challenge encounters: {{guideline}}

**Difficulty Scaling:**

- Enemy count progression: {{scaling_rule}}
- Enemy type introduction: {{pacing_rule}}
- Encounter complexity: {{complexity_rule}}

## Level Creation Guidelines

[[LLM: Provide specific guidelines for creating individual levels]]

### Level Layout Principles

**Spatial Design:**

- Grid size: {{grid_dimensions}}
- Minimum path width: {{width_units}}
- Maximum vertical distance: {{height_units}}
- Safe zones placement: {{safety_guidelines}}

**Navigation Design:**

- Clear path indication: {{visual_cues}}
- Landmark placement: {{landmark_rules}}
- Dead end avoidance: {{dead_end_policy}}
- Multiple path options: {{branching_rules}}

### Pacing and Flow

[[LLM: Define how to control the rhythm and pace of gameplay within levels]]

**Action Sequences:**

- High intensity duration: {{max_duration}}
- Rest period requirement: {{min_rest_time}}
- Intensity variation: {{pacing_pattern}}

**Learning Sequences:**

- New mechanic introduction: {{teaching_method}}
- Practice opportunity: {{practice_duration}}
- Skill application: {{application_context}}

### Challenge Design

[[LLM: Define how to create appropriate challenges for each level type]]

**Challenge Types:**

- Execution challenges: {{skill_requirements}}
- Puzzle challenges: {{complexity_guidelines}}
- Time challenges: {{time_pressure_rules}}
- Resource challenges: {{resource_management}}

**Difficulty Calibration:**

- Skill check frequency: {{frequency_guidelines}}
- Failure recovery: {{retry_mechanics}}
- Hint system integration: {{help_system}}

## Technical Implementation

[[LLM: Define technical requirements for level implementation]]

### Level Data Structure

[[LLM: Define how level data should be structured for implementation]]

**Level File Format:**

- Data format: {{json|yaml|custom}}
- File naming: `level_{{world}}_{{number}}.{{extension}}`
- Data organization: {{structure_description}}

**Required Data Fields:**

```json
{
  "levelId": "{{unique_identifier}}",
  "worldId": "{{world_identifier}}",
  "difficulty": {{difficulty_value}},
  "targetTime": {{completion_time_seconds}},
  "objectives": {
    "primary": "{{primary_objective}}",
    "secondary": ["{{secondary_objectives}}"],
    "hidden": ["{{secret_objectives}}"]
  },
  "layout": {
    "width": {{grid_width}},
    "height": {{grid_height}},
    "tilemap": "{{tilemap_reference}}"
  },
  "entities": [
    {
      "type": "{{entity_type}}",
      "position": {"x": {{x}}, "y": {{y}}},
      "properties": {{entity_properties}}
    }
  ]
}
```

### Asset Integration

[[LLM: Define how level assets are organized and loaded]]

**Tilemap Requirements:**

- Tile size: {{tile_dimensions}}px
- Tileset organization: {{tileset_structure}}
- Layer organization: {{layer_system}}
- Collision data: {{collision_format}}

**Audio Integration:**

- Background music: {{music_requirements}}
- Ambient sounds: {{ambient_system}}
- Dynamic audio: {{dynamic_audio_rules}}

### Performance Optimization

[[LLM: Define performance requirements for level systems]]

**Entity Limits:**

- Maximum active entities: {{entity_limit}}
- Maximum particles: {{particle_limit}}
- Maximum audio sources: {{audio_limit}}

**Memory Management:**

- Texture memory budget: {{texture_memory}}MB
- Audio memory budget: {{audio_memory}}MB
- Level loading time: <{{load_time}}s

**Culling and LOD:**

- Off-screen culling: {{culling_distance}}
- Level-of-detail rules: {{lod_system}}
- Asset streaming: {{streaming_requirements}}

## Level Testing Framework

[[LLM: Define how levels should be tested and validated]]

### Automated Testing

**Performance Testing:**

- Frame rate validation: Maintain {{fps_target}} FPS
- Memory usage monitoring: Stay under {{memory_limit}}MB
- Loading time verification: Complete in <{{load_time}}s

**Gameplay Testing:**

- Completion path validation: All objectives achievable
- Collectible accessibility: All items reachable
- Softlock prevention: No unwinnable states

### Manual Testing Protocol

**Playtesting Checklist:**

- [ ] Level completes within target time range
- [ ] All mechanics function correctly
- [ ] Difficulty feels appropriate for level category
- [ ] Player guidance is clear and effective
- [ ] No exploits or sequence breaks (unless intended)

**Player Experience Testing:**

- [ ] Tutorial levels teach effectively
- [ ] Challenge feels fair and rewarding
- [ ] Flow and pacing maintain engagement
- [ ] Audio and visual feedback support gameplay

### Balance Validation

**Metrics Collection:**

- Completion rate: Target {{completion_percentage}}%
- Average completion time: {{target_time}} ± {{variance}}
- Death count per level: <{{max_deaths}}
- Collectible discovery rate: {{discovery_percentage}}%

**Iteration Guidelines:**

- Adjustment criteria: {{criteria_for_changes}}
- Testing sample size: {{minimum_testers}}
- Validation period: {{testing_duration}}

## Content Creation Pipeline

[[LLM: Define the workflow for creating new levels]]

### Design Phase

**Concept Development:**

1. Define level purpose and goals
2. Create rough layout sketch
3. Identify key mechanics and challenges
4. Estimate difficulty and duration

**Documentation Requirements:**

- Level design brief
- Layout diagrams
- Mechanic integration notes
- Asset requirement list

### Implementation Phase

**Technical Implementation:**

1. Create level data file
2. Build tilemap and layout
3. Place entities and objects
4. Configure level logic and triggers
5. Integrate audio and visual effects

**Quality Assurance:**

1. Automated testing execution
2. Internal playtesting
3. Performance validation
4. Bug fixing and polish

### Integration Phase

**Game Integration:**

1. Level progression integration
2. Save system compatibility
3. Analytics integration
4. Achievement system integration

**Final Validation:**

1. Full game context testing
2. Performance regression testing
3. Platform compatibility verification
4. Final approval and release

## Success Metrics

[[LLM: Define how to measure level design success]]

**Player Engagement:**

- Level completion rate: {{target_rate}}%
- Replay rate: {{replay_target}}%
- Time spent per level: {{engagement_time}}
- Player satisfaction scores: {{satisfaction_target}}/10

**Technical Performance:**

- Frame rate consistency: {{fps_consistency}}%
- Loading time compliance: {{load_compliance}}%
- Memory usage efficiency: {{memory_efficiency}}%
- Crash rate: <{{crash_threshold}}%

**Design Quality:**

- Difficulty curve adherence: {{curve_accuracy}}
- Mechanic integration effectiveness: {{integration_score}}
- Player guidance clarity: {{guidance_score}}
- Content accessibility: {{accessibility_rate}}%
