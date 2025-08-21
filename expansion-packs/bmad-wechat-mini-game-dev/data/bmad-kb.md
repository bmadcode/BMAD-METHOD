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

### `game-po` (Product Owner)
- **Primary Focus**: Game vision, strategy, and profitability.
- **Key Outputs**: Project Brief, prioritized feature backlog, monetization strategy.
- **Specialties**: Market research, user-centered design, business goals.

### `game-pm` (Project Manager)
- **Primary Focus**: Project execution, timelines, and resource management.
- **Key Outputs**: Project plan, risk assessment, status reports.
- **Specialties**: Agile/Scrum methodologies, dependency management.

### `game-designer`
- **Primary Focus**: Game mechanics, player experience, and design documentation.
- **Key Outputs**: Game Design Document (GDD), level design framework.
- **Specialties**: Brainstorming, game balance, player psychology.

### `game-orchestrator`
- **Primary Focus**: Technical vision and architecture.
- **Key Outputs**: Game Architecture Document, technical standards.
- **Specialties**: System design, performance optimization, WeChat platform architecture.

### `game-sm` (Scrum Master)
- **Primary Focus**: Story creation, development planning, and agile process facilitation.
- **Key Outputs**: Detailed implementation stories, sprint planning.
- **Specialties**: Story breakdown, developer handoffs, process optimization.

### `game-developer`
- **Primary Focus**: WeChat Mini-Game implementation, code quality, and performance.
- **Key Outputs**: Working game features, optimized code.
- **Specialties**: JavaScript/TypeScript, WeChat Mini-Game APIs.

### `game-qa` (Quality Assurance)
- **Primary Focus**: Testing, bug detection, and quality gates.
- **Key Outputs**: Test plans, bug reports, performance analysis.
- **Specialties**: Manual and automated testing, performance profiling.

### `game-analyst`
- **Primary Focus**: Data analysis and player behavior insights.
- **Key Outputs**: Analytics reports, A/B test results, retention analysis.
- **Specialties**: SQL, data visualization, game analytics KPIs.

## Agent-Specific WeChat Platform Considerations

### `game-po`
- **Focus**: Understand the WeChat ecosystem to inform the product strategy.
- **Actions**: Analyze successful WeChat mini-games, define a monetization strategy that leverages WeChat's ad and IAP APIs, and prioritize social features that drive engagement on the platform.

### `game-designer`
- **Focus**: Design games that feel native to the WeChat platform.
- **Actions**: Incorporate WeChat's social features (sharing, leaderboards) into the core game loop, design UI that works well with WeChat's navigation, and create mechanics that are suited for short, mobile play sessions.

### `game-orchestrator`
- **Focus**: Design a technical architecture that is optimized for the WeChat Mini-Game runtime.
- **Actions**: Plan for the 4MB initial package size limit by designing a subpackage strategy, choose the right data storage solution (local storage vs. cloud database), and design the integration with the OpenDataContext.

### `game-developer`
- **Focus**: Implement features using WeChat's specific APIs and best practices.
- **Actions**: Use the `wx.login` API for authentication, implement the ad APIs for monetization, use the OpenDataContext for social features, and write efficient code that performs well on mobile devices.

### `game-qa`
- **Focus**: Test the game on a wide range of devices and network conditions.
- **Actions**: Use the WeChat DevTools for debugging and performance profiling, test on both iOS and Android devices, and specifically test the functionality of social sharing and ad placements.

### `game-analyst`
- **Focus**: Use WeChat's analytics tools to gather insights.
- **Actions**: Track key metrics like retention, session length, and conversion rates using the platform's built-in analytics or third-party tools. Analyze the performance of social features and monetization strategies.

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
