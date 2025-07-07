# {{Game Title}} Game Design Document (GDD)

[[LLM: This template creates a comprehensive Game Design Document that will serve as the foundation for all game development work. The GDD should be detailed enough that developers can create user stories and epics from it. Focus on gameplay systems, mechanics, and technical requirements that can be broken down into implementable features.

If available, review any provided documents or ask if any are optionally available: Project Brief, Market Research, Competitive Analysis]]

## Executive Summary

[[LLM: Create a compelling overview that captures the essence of the game. Present this section first and get user feedback before proceeding.]]

### Core Concept

[[LLM: 2-3 sentences that clearly describe what the game is and why players will love it]]

### Target Audience

[[LLM: Define the primary and secondary audience with demographics and gaming preferences]]

**Primary:** {{age_range}}, {{player_type}}, {{platform_preference}}
**Secondary:** {{secondary_audience}}

### Platform & Technical Requirements

[[LLM: Based on the technical preferences or user input, define the target platforms]]

**Primary Platform:** {{platform}}
**Engine:** Unity & C#
**Performance Target:** Stable FPS on {{minimum_device}}
**Screen Support:** {{resolution_range}}

### Unique Selling Points

[[LLM: List 3-5 key features that differentiate this game from competitors]]

1. {{usp_1}}
2. {{usp_2}}
3. {{usp_3}}

## Core Gameplay

[[LLM: This section defines the fundamental game mechanics. After presenting each subsection, apply `tasks#advanced-elicitation` protocol to ensure completeness.]]

### Game Pillars

[[LLM: Define 3-5 core pillars that guide all design decisions. These should be specific and actionable.]]

1. **{{pillar_1}}** - {{description}}
2. **{{pillar_2}}** - {{description}}
3. **{{pillar_3}}** - {{description}}

### Core Gameplay Loop

[[LLM: Define the 30-60 second loop that players will repeat. Be specific about timing and player actions.]]

**Primary Loop ({{duration}} seconds):**

1. {{action_1}} ({{time_1}}s)
2. {{action_2}} ({{time_2}}s)
3. {{action_3}} ({{time_3}}s)
4. {{reward_feedback}} ({{time_4}}s)

### Win/Loss Conditions

[[LLM: Clearly define success and failure states]]

**Victory Conditions:**

- {{win_condition_1}}
- {{win_condition_2}}

**Failure States:**

- {{loss_condition_1}}
- {{loss_condition_2}}

## Game Mechanics

[[LLM: Detail each major mechanic that will need to be implemented. Each mechanic should be specific enough for developers to create implementation stories.]]

### Primary Mechanics

<<REPEAT section="mechanic" count="3-5">>

#### {{mechanic_name}}

**Description:** {{detailed_description}}

**Player Input:** {{input_method}}

**System Response:** {{game_response}}

**Implementation Notes:**

- {{tech_requirement_1}}
- {{tech_requirement_2}}
- {{performance_consideration}}

**Dependencies:** {{other_mechanics_needed}}

<</REPEAT>>

### Controls

[[LLM: Define all input methods for different platforms]]

| Action       | Desktop | Mobile      | Gamepad    |
| ------------ | ------- | ----------- | ---------- |
| {{action_1}} | {{key}} | {{gesture}} | {{button}} |
| {{action_2}} | {{key}} | {{gesture}} | {{button}} |

## Progression & Balance

[[LLM: Define how players advance and how difficulty scales. This section should provide clear parameters for implementation.]]

### Player Progression

**Progression Type:** {{linear|branching|metroidvania}}

**Key Milestones:**

1. **{{milestone_1}}** - {{unlock_description}}
2. **{{milestone_2}}** - {{unlock_description}}
3. **{{milestone_3}}** - {{unlock_description}}

### Difficulty Curve

[[LLM: Provide specific parameters for balancing]]

**Tutorial Phase:** {{duration}} - {{difficulty_description}}
**Early Game:** {{duration}} - {{difficulty_description}}
**Mid Game:** {{duration}} - {{difficulty_description}}
**Late Game:** {{duration}} - {{difficulty_description}}

### Economy & Resources

^^CONDITION: has_economy^^

[[LLM: Define any in-game currencies, resources, or collectibles]]

| Resource       | Earn Rate | Spend Rate | Purpose | Cap     |
| -------------- | --------- | ---------- | ------- | ------- |
| {{resource_1}} | {{rate}}  | {{rate}}   | {{use}} | {{max}} |

^^/CONDITION: has_economy^^

## Level Design Framework

[[LLM: Provide guidelines for level creation that developers can use to create level implementation stories]]

### Level Types

<<REPEAT section="level_type" count="2-4">>

#### {{level_type_name}}

**Purpose:** {{gameplay_purpose}}
**Duration:** {{target_time}}
**Key Elements:** {{required_mechanics}}
**Difficulty:** {{relative_difficulty}}

**Structure Template:**

- Introduction: {{intro_description}}
- Challenge: {{main_challenge}}
- Resolution: {{completion_requirement}}

<</REPEAT>>

### Level Progression

**World Structure:** {{linear|hub|open}}
**Total Levels:** {{number}}
**Unlock Pattern:** {{progression_method}}

## Technical Specifications

[[LLM: Define technical requirements that will guide architecture and implementation decisions. Review any existing technical preferences.]]

### Performance Requirements

**Frame Rate:** Stable FPS (minimum 30 FPS on low-end devices)
**Memory Usage:** <{{memory_limit}}MB
**Load Times:** <{{load_time}}s initial, <{{level_load}}s between levels
**Battery Usage:** Optimized for mobile devices

### Platform Specific

**Desktop:**

- Resolution: {{min_resolution}} - {{max_resolution}}
- Input: Keyboard, Mouse, Gamepad

**Mobile:**

- Resolution: {{mobile_min}} - {{mobile_max}}
- Input: Touch, Tilt (optional)
- OS: iOS 13+, Android 8+

### Asset Requirements

[[LLM: Define asset specifications for the art and audio teams]]

**Visual Assets:**

- Art Style: {{style_description}}
- Color Palette: {{color_specification}}
- Animation: {{animation_requirements}}
- UI Resolution: {{ui_specs}}

**Audio Assets:**

- Music Style: {{music_genre}}
- Sound Effects: {{sfx_requirements}}
- Voice Acting: {{voice_needs}}

## Technical Architecture Requirements

[[LLM: Define high-level technical requirements that the game architecture must support]]

### Engine Configuration

**Unity Setup:**

- C#: Latest stable version
- Physics: 2D Physics
- Renderer: 2D Renderer (URP)
- Input System: New Input System

### Code Architecture

**Required Systems:**

- Scene Management
- State Management
- Asset Loading
- Save/Load System
- Input Management
- Audio System
- Performance Monitoring

### Data Management

**Save Data:**

- Progress tracking
- Settings persistence
- Statistics collection
- {{additional_data}}

## Development Phases

[[LLM: Break down the development into phases that can be converted to epics]]

### Phase 1: Core Systems ({{duration}})

**Epic: Foundation**

- Engine setup and configuration
- Basic scene management
- Core input handling
- Asset loading pipeline

**Epic: Core Mechanics**

- {{primary_mechanic}} implementation
- Basic physics and collision
- Player controller

### Phase 2: Gameplay Features ({{duration}})

**Epic: Game Systems**

- {{mechanic_2}} implementation
- {{mechanic_3}} implementation
- Game state management

**Epic: Content Creation**

- Level loading system
- First playable levels
- Basic UI implementation

### Phase 3: Polish & Optimization ({{duration}})

**Epic: Performance**

- Optimization and profiling
- Mobile platform testing
- Memory management

**Epic: User Experience**

- Audio implementation
- Visual effects and polish
- Final UI/UX refinement

## Success Metrics

[[LLM: Define measurable goals for the game]]

**Technical Metrics:**

- Frame rate: {{fps_target}}
- Load time: {{load_target}}
- Crash rate: <{{crash_threshold}}%
- Memory usage: <{{memory_target}}MB

**Gameplay Metrics:**

- Tutorial completion: {{completion_rate}}%
- Average session: {{session_length}} minutes
- Level completion: {{level_completion}}%
- Player retention: D1 {{d1}}%, D7 {{d7}}%

## Appendices

### Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

### References

[[LLM: List any competitive analysis, inspiration, or research sources]]

- {{reference_1}}
- {{reference_2}}
- {{reference_3}}
