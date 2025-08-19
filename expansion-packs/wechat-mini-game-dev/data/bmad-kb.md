<!-- Powered by BMAD™ Core -->

# WeChat Mini-Game Development BMad Knowledge Base

## Overview

This game development expansion of BMad-Method specializes in creating 2D games for the WeChat Mini-Game platform. It extends the core BMad framework with game-specific agents, workflows, and best practices for professional WeChat mini-game development.

### Game Development Focus

- **Target Engine**: WeChat Mini-Game Runtime with JavaScript/TypeScript
- **Platform Strategy**: WeChat-first with a focus on social features
- **Development Approach**: Agile story-driven development
- **Performance Target**: Smooth performance on target devices
- **Architecture**: Component-based game systems

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
3. **TECHNICAL_EXCELLENCE**: Smooth performance and cross-platform compatibility are non-negotiable
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
   - Define level types, difficulty progression, and content structure
   - Establish performance and technical constraints for levels

### Phase 2: Technical Architecture

4. **Solution Architect** (or Game Designer): Create Technical Architecture
   - Use game-architecture-tmpl to design technical implementation
   - Define WeChat Mini-Game systems, performance optimization, and code structure
   - Align technical architecture with game design requirements

### Phase 3: Story-Driven Development

5. **Game Scrum Master**: Break down design into development stories
   - Use create-game-story task to create detailed implementation stories
   - Each story should be immediately actionable by game developers
   - Apply game-story-dod-checklist to ensure story quality

6. **Game Developer**: Implement game features story by story
   - Follow JavaScript/TypeScript best practices and WeChat Mini-Game guidelines
   - Maintain smooth performance target throughout development
   - Use test-driven development for game logic components

7. **Iterative Refinement**: Continuous playtesting and improvement
   - Test core mechanics early and often
   - Validate game balance through metrics and player feedback
   - Iterate on design based on implementation discoveries

## WeChat Mini-Game Development Guidelines

### WeChat Mini-Game Standards

**Project Structure:**

```text
mini-game-project/
├── images/              # Image assets
├── js/                  # JavaScript files
│   ├── libs/            # Third-party libraries
│   ├── main.js          # Main game logic
│   └── ...
├── game.json            # Main configuration file
├── project.config.json  # Project configuration file
└── ...
```

**Performance Requirements:**

- Maintain smooth performance on target devices
- Adhere to WeChat's package size limits (e.g., 4MB initial package)
- Loading times under 3 seconds for levels
- Smooth animation and responsive controls

**Code Quality:**

- JavaScript/TypeScript best practices
- Component-based architecture
- Object pooling for frequently created/destroyed objects
- Error handling and graceful degradation

### Game Development Story Structure

**Story Requirements:**

- Clear reference to Game Design Document section
- Specific acceptance criteria for game functionality
- Technical implementation details for WeChat Mini-Games
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

- Unit tests for game logic
- Integration tests for game systems
- Performance benchmarking and profiling
- Gameplay testing and balance validation
- Cross-platform compatibility testing on iOS and Android

**Performance Monitoring:**

- Frame rate consistency tracking
- Memory usage monitoring
- Asset loading performance
- Input responsiveness validation
- Battery usage optimization

## Game Development Team Roles

### Game Designer (Alex)

- **Primary Focus**: Game mechanics, player experience, design documentation
- **Key Outputs**: Game Brief, Game Design Document, Level Design Framework
- **Specialties**: Brainstorming, game balance, player psychology, creative direction

### Game Developer (Maya)

- **Primary Focus**: WeChat Mini-Game implementation, technical excellence, performance
- **Key Outputs**: Working game features, optimized code, technical architecture
- **Specialties**: JavaScript/TypeScript, WeChat Mini-Game APIs, performance optimization

### Game Scrum Master (Jordan)

- **Primary Focus**: Story creation, development planning, agile process
- **Key Outputs**: Detailed implementation stories, sprint planning, quality assurance
- **Specialties**: Story breakdown, developer handoffs, process optimization

## WeChat Mini-Game Platform Considerations

### API Usage

- Correctly use `wx.login`, `wx.getUserInfo`, etc.
- Implement sharing and invitation features using `wx.shareAppMessage`.
- Use Open Data Context for leaderboards and other social features.

### Performance and Limitations

- Be mindful of the package size limit. Use subpackages for larger games.
- Optimize image and audio assets to reduce file size.
- Understand the limitations of the rendering context (e.g., no WebGL for 2D canvas).

### Success Metrics for WeChat Mini-Games

### Technical Metrics

- Frame rate consistency
- Memory usage within budgets
- Loading time targets met
- Zero critical bugs in core gameplay systems

### Player Experience Metrics

- Tutorial completion rate
- Level completion rates
- Average session length
- Player retention and engagement metrics
- Sharing and invite rates

### Development Process Metrics

- Story completion within estimated timeframes
- Code quality metrics (test coverage, linting compliance)
- Documentation completeness and accuracy
- Team velocity and delivery consistency

This knowledge base provides the foundation for effective WeChat Mini-Game development using the BMad-Method framework.
