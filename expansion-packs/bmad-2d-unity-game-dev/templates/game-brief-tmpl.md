# {{Game Title}} Game Brief

[[LLM: This template creates a comprehensive game brief that serves as the foundation for all subsequent game development work. The brief should capture the essential vision, scope, and requirements needed to create a detailed Game Design Document.

This brief is typically created early in the ideation process, often after brainstorming sessions, to crystallize the game concept before moving into detailed design.]]

## Game Vision

[[LLM: Establish the core vision and identity of the game. Present each subsection and gather user feedback before proceeding.]]

### Core Concept

[[LLM: 2-3 sentences that clearly capture what the game is and why it will be compelling to players]]

### Elevator Pitch

[[LLM: Single sentence that captures the essence of the game in a memorable way]]

**"{{game_description_in_one_sentence}}"**

### Vision Statement

[[LLM: Inspirational statement about what the game will achieve for players and why it matters]]

## Target Market

[[LLM: Define the audience and market context. Apply `tasks#advanced-elicitation` after presenting this section.]]

### Primary Audience

**Demographics:** {{age_range}}, {{platform_preference}}, {{gaming_experience}}
**Psychographics:** {{interests}}, {{motivations}}, {{play_patterns}}
**Gaming Preferences:** {{preferred_genres}}, {{session_length}}, {{difficulty_preference}}

### Secondary Audiences

**Audience 2:** {{description}}
**Audience 3:** {{description}}

### Market Context

**Genre:** {{primary_genre}} / {{secondary_genre}}
**Platform Strategy:** {{platform_focus}}
**Competitive Positioning:** {{differentiation_statement}}

## Game Fundamentals

[[LLM: Define the core gameplay elements. Each subsection should be specific enough to guide detailed design work.]]

### Core Gameplay Pillars

[[LLM: 3-5 fundamental principles that guide all design decisions]]

1. **{{pillar_1}}** - {{description_and_rationale}}
2. **{{pillar_2}}** - {{description_and_rationale}}
3. **{{pillar_3}}** - {{description_and_rationale}}

### Primary Mechanics

[[LLM: List the 3-5 most important gameplay mechanics that define the player experience]]

**Core Mechanic 1: {{mechanic_name}}**

- **Description:** {{how_it_works}}
- **Player Value:** {{why_its_fun}}
- **Implementation Scope:** {{complexity_estimate}}

**Core Mechanic 2: {{mechanic_name}}**

- **Description:** {{how_it_works}}
- **Player Value:** {{why_its_fun}}
- **Implementation Scope:** {{complexity_estimate}}

### Player Experience Goals

[[LLM: Define what emotions and experiences the game should create for players]]

**Primary Experience:** {{main_emotional_goal}}
**Secondary Experiences:** {{supporting_emotional_goals}}
**Engagement Pattern:** {{how_player_engagement_evolves}}

## Scope and Constraints

[[LLM: Define the boundaries and limitations that will shape development. Apply `tasks#advanced-elicitation` to clarify any constraints.]]

### Project Scope

**Game Length:** {{estimated_content_hours}}
**Content Volume:** {{levels_areas_content_amount}}
**Feature Complexity:** {{simple|moderate|complex}}
**Scope Comparison:** "Similar to {{reference_game}} but with {{key_differences}}"

### Technical Constraints

**Platform Requirements:**

- Primary: {{platform_1}} - {{requirements}}
- Secondary: {{platform_2}} - {{requirements}}

**Technical Specifications:**

- Engine: Phaser 3 + TypeScript
- Performance Target: {{fps_target}} FPS on {{target_device}}
- Memory Budget: <{{memory_limit}}MB
- Load Time Goal: <{{load_time_seconds}}s

### Resource Constraints

**Team Size:** {{team_composition}}
**Timeline:** {{development_duration}}
**Budget Considerations:** {{budget_constraints_or_targets}}
**Asset Requirements:** {{art_audio_content_needs}}

### Business Constraints

^^CONDITION: has_business_goals^^

**Monetization Model:** {{free|premium|freemium|subscription}}
**Revenue Goals:** {{revenue_targets_if_applicable}}
**Platform Requirements:** {{store_certification_needs}}
**Launch Timeline:** {{target_launch_window}}

^^/CONDITION: has_business_goals^^

## Reference Framework

[[LLM: Provide context through references and competitive analysis]]

### Inspiration Games

**Primary References:**

1. **{{reference_game_1}}** - {{what_we_learn_from_it}}
2. **{{reference_game_2}}** - {{what_we_learn_from_it}}
3. **{{reference_game_3}}** - {{what_we_learn_from_it}}

### Competitive Analysis

**Direct Competitors:**

- {{competitor_1}}: {{strengths_and_weaknesses}}
- {{competitor_2}}: {{strengths_and_weaknesses}}

**Differentiation Strategy:**
{{how_we_differ_and_why_thats_valuable}}

### Market Opportunity

**Market Gap:** {{underserved_need_or_opportunity}}
**Timing Factors:** {{why_now_is_the_right_time}}
**Success Metrics:** {{how_well_measure_success}}

## Content Framework

[[LLM: Outline the content structure and progression without full design detail]]

### Game Structure

**Overall Flow:** {{linear|hub_world|open_world|procedural}}
**Progression Model:** {{how_players_advance}}
**Session Structure:** {{typical_play_session_flow}}

### Content Categories

**Core Content:**

- {{content_type_1}}: {{quantity_and_description}}
- {{content_type_2}}: {{quantity_and_description}}

**Optional Content:**

- {{optional_content_type}}: {{quantity_and_description}}

**Replay Elements:**

- {{replayability_features}}

### Difficulty and Accessibility

**Difficulty Approach:** {{how_challenge_is_structured}}
**Accessibility Features:** {{planned_accessibility_support}}
**Skill Requirements:** {{what_skills_players_need}}

## Art and Audio Direction

[[LLM: Establish the aesthetic vision that will guide asset creation]]

### Visual Style

**Art Direction:** {{style_description}}
**Reference Materials:** {{visual_inspiration_sources}}
**Technical Approach:** {{2d_style_pixel_vector_etc}}
**Color Strategy:** {{color_palette_mood}}

### Audio Direction

**Music Style:** {{genre_and_mood}}
**Sound Design:** {{audio_personality}}
**Implementation Needs:** {{technical_audio_requirements}}

### UI/UX Approach

**Interface Style:** {{ui_aesthetic}}
**User Experience Goals:** {{ux_priorities}}
**Platform Adaptations:** {{cross_platform_considerations}}

## Risk Assessment

[[LLM: Identify potential challenges and mitigation strategies]]

### Technical Risks

| Risk                 | Probability | Impact | Mitigation Strategy |
| -------------------- | ----------- | ------ | ------------------- | ------ | --- | ----- | ----------------------- |
| {{technical_risk_1}} | {{high      | med    | low}}               | {{high | med | low}} | {{mitigation_approach}} |
| {{technical_risk_2}} | {{high      | med    | low}}               | {{high | med | low}} | {{mitigation_approach}} |

### Design Risks

| Risk              | Probability | Impact | Mitigation Strategy |
| ----------------- | ----------- | ------ | ------------------- | ------ | --- | ----- | ----------------------- |
| {{design_risk_1}} | {{high      | med    | low}}               | {{high | med | low}} | {{mitigation_approach}} |
| {{design_risk_2}} | {{high      | med    | low}}               | {{high | med | low}} | {{mitigation_approach}} |

### Market Risks

| Risk              | Probability | Impact | Mitigation Strategy |
| ----------------- | ----------- | ------ | ------------------- | ------ | --- | ----- | ----------------------- |
| {{market_risk_1}} | {{high      | med    | low}}               | {{high | med | low}} | {{mitigation_approach}} |

## Success Criteria

[[LLM: Define measurable goals for the project]]

### Player Experience Metrics

**Engagement Goals:**

- Tutorial completion rate: >{{percentage}}%
- Average session length: {{duration}} minutes
- Player retention: D1 {{d1}}%, D7 {{d7}}%, D30 {{d30}}%

**Quality Benchmarks:**

- Player satisfaction: >{{rating}}/10
- Completion rate: >{{percentage}}%
- Technical performance: {{fps_target}} FPS consistent

### Development Metrics

**Technical Targets:**

- Zero critical bugs at launch
- Performance targets met on all platforms
- Load times under {{seconds}}s

**Process Goals:**

- Development timeline adherence
- Feature scope completion
- Quality assurance standards

^^CONDITION: has_business_goals^^

### Business Metrics

**Commercial Goals:**

- {{revenue_target}} in first {{time_period}}
- {{user_acquisition_target}} players in first {{time_period}}
- {{retention_target}} monthly active users

^^/CONDITION: has_business_goals^^

## Next Steps

[[LLM: Define immediate actions following the brief completion]]

### Immediate Actions

1. **Stakeholder Review** - {{review_process_and_timeline}}
2. **Concept Validation** - {{validation_approach}}
3. **Resource Planning** - {{team_and_resource_allocation}}

### Development Roadmap

**Phase 1: Pre-Production** ({{duration}})

- Detailed Game Design Document creation
- Technical architecture planning
- Art style exploration and pipeline setup

**Phase 2: Prototype** ({{duration}})

- Core mechanic implementation
- Technical proof of concept
- Initial playtesting and iteration

**Phase 3: Production** ({{duration}})

- Full feature development
- Content creation and integration
- Comprehensive testing and optimization

### Documentation Pipeline

**Required Documents:**

1. Game Design Document (GDD) - {{target_completion}}
2. Technical Architecture Document - {{target_completion}}
3. Art Style Guide - {{target_completion}}
4. Production Plan - {{target_completion}}

### Validation Plan

**Concept Testing:**

- {{validation_method_1}} - {{timeline}}
- {{validation_method_2}} - {{timeline}}

**Prototype Testing:**

- {{testing_approach}} - {{timeline}}
- {{feedback_collection_method}} - {{timeline}}

## Appendices

### Research Materials

[[LLM: Include any supporting research, competitive analysis, or market data that informed the brief]]

### Brainstorming Session Notes

[[LLM: Reference any brainstorming sessions that led to this brief]]

### Stakeholder Input

[[LLM: Include key input from stakeholders that shaped the vision]]

### Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |
