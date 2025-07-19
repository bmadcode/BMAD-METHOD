# Game Development BMad Knowledge Base

## Overview

This game development expansion of BMad-Method specializes in creating 2D games using Unity and C#. It extends the core BMad framework with game-specific agents, workflows, and best practices for professional game development.

### Game Development Focus

- **Target Engine**: Unity 2022 LTS or newer with C# 10+
- **Platform Strategy**: Cross-platform (PC, Console, Mobile) with a focus on 2D
- **Development Approach**: Agile story-driven development
- **Performance Target**: Stable frame rate on target devices
- **Architecture**: Component-based architecture using Unity's best practices

## Core Game Development Philosophy

### Player-First Development

You are developing games as a "Player Experience CEO" - thinking like a game director with unlimited creative resources and a singular vision for player enjoyment. Your AI agents are your specialized game development team:

- **Direct**: Provide clear game design vision and player experience goals
- **Refine**: Iterate on gameplay mechanics until they're compelling
- **Oversee**: Maintain creative alignment across all development disciplines
- **Playfocus**: Every decision serves the player experience

### Game Development Principles

1. **PLAYER_EXPERIENCE_FIRST**: Every mechanic must serve player engagement and fun
2. **ITERATIVE_DESIGN**: Prototype, test, refine - games are discovered through iteration
3. **TECHNICAL_EXCELLENCE**: Stable performance and cross-platform compatibility are non-negotiable
4. **STORY_DRIVEN_DEV**: Game features are implemented through detailed development stories
5. **BALANCE_THROUGH_DATA**: Use metrics and playtesting to validate game balance
6. **DOCUMENT_EVERYTHING**: Clear specifications enable proper game implementation
7. **START_SMALL_ITERATE_FAST**: Core mechanics first, then expand and polish
8. **EMBRACE_CREATIVE_CHAOS**: Games evolve - adapt design based on what's fun

## Game Development Workflow

### Phase 1: Game Concept and Design

1. **Game Designer**: Start with brainstorming and concept development

   - Use \*brainstorm to explore game concepts and mechanics
   - Create Game Brief using game-brief-tmpl
   - Develop core game pillars and player experience goals

2. **Game Designer**: Create comprehensive Game Design Document

   - Use game-design-doc-tmpl to create detailed GDD
   - Define all game mechanics, progression, and balance
   - Specify technical requirements and platform targets

3. **Game Designer**: Develop Level Design Framework
   - Create level-design-doc-tmpl for content guidelines
   - Define level types, difficulty progression, and content structure
   - Establish performance and technical constraints for levels

### Phase 2: Technical Architecture

4. **Solution Architect** (or Game Designer): Create Technical Architecture
   - Use game-architecture-tmpl to design technical implementation
   - Define Unity systems, performance optimization, and C# code structure
   - Align technical architecture with game design requirements

### Phase 3: Story-Driven Development

5. **Game Scrum Master**: Break down design into development stories

   - Use create-game-story task to create detailed implementation stories
   - Each story should be immediately actionable by game developers
   - Apply game-story-dod-checklist to ensure story quality

6. **Game Developer**: Implement game features story by story

   - Follow C# best practices and Unity's component-based architecture
   - Maintain stable frame rate on target devices
   - Use Unity Test Framework for game logic components

7. **Iterative Refinement**: Continuous playtesting and improvement
   - Test core mechanics early and often in the Unity Editor
   - Validate game balance through metrics and player feedback
   - Iterate on design based on implementation discoveries

## Game-Specific Development Guidelines

### Unity + C# Standards

**Project Structure:**

```text
UnityProject/
├── Assets/
│   ├── Scenes/          # Game scenes (Boot, Menu, Game, etc.)
│   ├── Scripts/         # C# scripts
│   │   ├── Editor/      # Editor-specific scripts
│   │   └── Runtime/     # Runtime scripts
│   ├── Prefabs/         # Reusable game objects
│   ├── Art/             # Art assets (sprites, models, etc.)
│   ├── Audio/           # Audio assets
│   ├── Data/            # ScriptableObjects and other data
│   └── Tests/           # Unity Test Framework tests
│       ├── EditMode/
│       └── PlayMode/
├── Packages/            # Package Manager manifest
└── ProjectSettings/     # Unity project settings
```

**Performance Requirements:**

- Maintain stable frame rate on target devices
- Memory usage under specified limits per level
- Loading times under 3 seconds for levels
- Smooth animation and responsive controls

**Code Quality:**

- C# best practices compliance
- Component-based architecture (SOLID principles)
- Efficient use of the MonoBehaviour lifecycle
- Error handling and graceful degradation

### Game Development Story Structure

**Story Requirements:**

- Clear reference to Game Design Document section
- Specific acceptance criteria for game functionality
- Technical implementation details for Unity and C#
- Performance requirements and optimization considerations
- Testing requirements including gameplay validation

**Story Categories:**

- **Core Mechanics**: Fundamental gameplay systems
- **Level Content**: Individual levels and content implementation
- **UI/UX**: User interface and player experience features
- **Performance**: Optimization and technical improvements
- **Polish**: Visual effects, audio, and game feel enhancements

### Quality Assurance for Games

**Testing Approach:**

- Unit tests for C# logic (EditMode tests)
- Integration tests for game systems (PlayMode tests)
- Performance benchmarking and profiling with Unity Profiler
- Gameplay testing and balance validation
- Cross-platform compatibility testing

**Performance Monitoring:**

- Frame rate consistency tracking
- Memory usage monitoring
- Asset loading performance
- Input responsiveness validation
- Battery usage optimization (mobile)

## Game Development Team Roles

### Game Designer (Alex)

- **Primary Focus**: Game mechanics, player experience, design documentation
- **Key Outputs**: Game Brief, Game Design Document, Level Design Framework
- **Specialties**: Brainstorming, game balance, player psychology, creative direction

### Game Developer (Maya)

- **Primary Focus**: Unity implementation, C# excellence, performance
- **Key Outputs**: Working game features, optimized code, technical architecture
- **Specialties**: C#/Unity, performance optimization, cross-platform development

### Game Scrum Master (Jordan)

- **Primary Focus**: Story creation, development planning, agile process
- **Key Outputs**: Detailed implementation stories, sprint planning, quality assurance
- **Specialties**: Story breakdown, developer handoffs, process optimization

## Platform-Specific Considerations

### Cross-Platform Development

- Abstract input using the new Input System
- Use platform-dependent compilation for specific logic
- Test on all target platforms regularly
- Optimize for different screen resolutions and aspect ratios

### Mobile Optimization

- Touch gesture support and responsive controls
- Battery usage optimization
- Performance scaling for different device capabilities
- App store compliance and packaging

### Performance Targets

- **PC/Console**: 60+ FPS at target resolution
- **Mobile**: 60 FPS on mid-range devices, 30 FPS minimum on low-end
- **Loading**: Initial load under 5 seconds, scene transitions under 2 seconds
- **Memory**: Within platform-specific memory budgets

## Success Metrics for Game Development

### Technical Metrics

- Frame rate consistency (>90% of time at target FPS)
- Memory usage within budgets
- Loading time targets met
- Zero critical bugs in core gameplay systems

### Player Experience Metrics

- Tutorial completion rate >80%
- Level completion rates appropriate for difficulty curve
- Average session length meets design targets
- Player retention and engagement metrics

### Development Process Metrics

- Story completion within estimated timeframes
- Code quality metrics (test coverage, code analysis)
- Documentation completeness and accuracy
- Team velocity and delivery consistency

## Common Unity Development Patterns

### Scene Management

- Use a loading scene for asynchronous loading of game scenes
- Use additive scene loading for large levels or streaming
- Manage scenes with a dedicated SceneManager class

### Game State Management

- Use ScriptableObjects to store shared game state
- Implement a finite state machine (FSM) for complex behaviors
- Use a GameManager singleton for global state management

### Input Handling

- Use the new Input System for robust, cross-platform input
- Create Action Maps for different input contexts (e.g., menu, gameplay)
- Use PlayerInput component for easy player input handling

### Performance Optimization

- Object pooling for frequently instantiated objects (e.g., bullets, enemies)
- Use the Unity Profiler to identify performance bottlenecks
- Optimize physics settings and collision detection
- Use LOD (Level of Detail) for complex models

This knowledge base provides the foundation for effective game development using the BMad-Method framework with specialized focus on 2D game creation using Unity and C#.
