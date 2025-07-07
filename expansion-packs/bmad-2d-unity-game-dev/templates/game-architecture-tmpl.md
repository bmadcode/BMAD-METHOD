# {{Game Title}} Game Architecture Document

[[LLM: This template creates a comprehensive game architecture document specifically for Unity + C# projects. This should provide the technical foundation for all game development stories and epics.

If available, review any provided documents: Game Design Document (GDD), Technical Preferences. This architecture should support all game mechanics defined in the GDD.]]

## Introduction

[[LLM: Establish the document's purpose and scope for game development]]

This document outlines the complete technical architecture for {{Game Title}}, a 2D game built with Unity and C#. It serves as the technical foundation for AI-driven game development, ensuring consistency and scalability across all game systems.

This architecture is designed to support the gameplay mechanics defined in the Game Design Document while maintaining stable performance and cross-platform compatibility.

### Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

## Technical Overview

[[LLM: Present all subsections together, then apply `tasks#advanced-elicitation` protocol to the complete section.]]

### Architecture Summary

[[LLM: Provide a comprehensive overview covering:

- Game engine choice and configuration
- Project structure and organization
- Key systems and their interactions
- Performance and optimization strategy
- How this architecture achieves GDD requirements]]

### Platform Targets

[[LLM: Based on GDD requirements, confirm platform support]]

**Primary Platform:** {{primary_platform}}
**Secondary Platforms:** {{secondary_platforms}}
**Minimum Requirements:** {{min_specs}}
**Target Performance:** Stable frame rate on {{target_device}}

### Technology Stack

**Core Engine:** Unity 2022 LTS or newer
**Language:** C# 10+
**Build Tool:** Unity Build Pipeline
**Package Manager:** Unity Package Manager
**Testing:** Unity Test Framework (NUnit)
**Deployment:** {{deployment_platform}}

## Project Structure

[[LLM: Define the complete project organization that developers will follow]]

### Repository Organization

[[LLM: Design a clear folder structure for game development]]

```text
{{game_name}}/
├── Assets/
│   ├── Scenes/          # Game scenes
│   ├── Scripts/         # C# scripts
│   ├── Prefabs/         # Reusable game objects
│   ├── Art/             # Art assets
│   ├── Audio/           # Audio assets
│   ├── Data/            # ScriptableObjects and other data
│   └── Tests/           # Unity Test Framework tests
├── Packages/            # Package Manager manifest
└── ProjectSettings/     # Unity project settings
```

### Module Organization

[[LLM: Define how C# scripts should be organized]]

**Scene Structure:**

- Each scene in separate file
- Scene-specific logic contained in scripts within the scene
- Use a loading scene for asynchronous loading

**Game Object Pattern:**

- Component-based architecture using MonoBehaviours
- Reusable game objects as prefabs
- Data-driven design with ScriptableObjects

**System Architecture:**

- Singleton managers for global systems (e.g., GameManager, AudioManager)
- Event-driven communication using UnityEvents or C# events
- Clear separation of concerns between components

## Core Game Systems

[[LLM: Detail each major system that needs to be implemented. Each system should be specific enough for developers to create implementation stories.]]

### Scene Management System

**Purpose:** Handle game flow and scene transitions

**Key Components:**

- Asynchronous scene loading and unloading
- Data passing between scenes using a persistent manager or ScriptableObject
- Loading screens with progress bars

**Implementation Requirements:**

- A `SceneLoader` class to manage all scene transitions
- A loading scene to handle asynchronous loading
- A `GameManager` to persist between scenes and hold necessary data

**Files to Create:**

- `Assets/Scripts/Core/SceneLoader.cs`
- `Assets/Scenes/Loading.unity`

### Game State Management

**Purpose:** Track player progress and game status

**State Categories:**

- Player progress (levels, unlocks)
- Game settings (audio, controls)
- Session data (current level, score)
- Persistent data (achievements, statistics)

**Implementation Requirements:**

- A `SaveManager` class to handle saving and loading data to a file
- Use of `ScriptableObject`s to hold game state data
- State validation and error recovery

**Files to Create:**

- `Assets/Scripts/Core/SaveManager.cs`
- `Assets/Data/ScriptableObjects/GameState.cs`

### Asset Management System

**Purpose:** Efficient loading and management of game assets

**Asset Categories:**

- Sprites and textures
- Audio clips and music
- Prefabs and scene files
- ScriptableObjects

**Implementation Requirements:**

- Use of Addressables for dynamic asset loading
- Asset bundles for platform-specific assets
- Memory management for large assets

**Files to Create:**

- `Assets/Scripts/Core/AssetManager.cs` (if needed for complex scenarios)

### Input Management System

**Purpose:** Handle all player input across platforms

**Input Types:**

- Keyboard controls
- Mouse/pointer interaction
- Touch gestures (mobile)
- Gamepad support

**Implementation Requirements:**

- Use the new Unity Input System
- Create Action Maps for different input contexts
- Use the `PlayerInput` component for easy player input handling

**Files to Create:**

- `Assets/Settings/InputActions.inputactions`

### Game Mechanics Systems

[[LLM: For each major mechanic defined in the GDD, create a system specification]]

<<REPEAT section="mechanic_system" count="based_on_gdd">>

#### {{mechanic_name}} System

**Purpose:** {{system_purpose}}

**Core Functionality:**

- {{feature_1}}
- {{feature_2}}
- {{feature_3}}

**Dependencies:** {{required_systems}}

**Performance Considerations:** {{optimization_notes}}

**Files to Create:**

- `Assets/Scripts/Mechanics/{{SystemName}}.cs`
- `Assets/Prefabs/{{RelatedObject}}.prefab`

<</REPEAT>>

### Physics & Collision System

**Physics Engine:** Unity 2D Physics

**Collision Categories:**

- Player collision
- Enemy interactions
- Environmental objects
- Collectibles and items

**Implementation Requirements:**

- Use the Layer Collision Matrix to optimize collision detection
- Use `Rigidbody2D` for physics-based movement
- Use `Collider2D` components for collision shapes

**Files to Create:**

- (No new files, but configure `ProjectSettings/DynamicsManager.asset`)

### Audio System

**Audio Requirements:**

- Background music with looping
- Sound effects for actions
- Audio settings and volume control
- Mobile audio optimization

**Implementation Features:**

- An `AudioManager` singleton to play sounds and music
- Use of `AudioMixer` to control volume levels
- Object pooling for frequently played sound effects

**Files to Create:**

- `Assets/Scripts/Core/AudioManager.cs`

### UI System

**UI Components:**

- HUD elements (score, health, etc.)
- Menu navigation
- Modal dialogs
- Settings screens

**Implementation Requirements:**

- Use UI Toolkit or UGUI for building user interfaces
- Create a `UIManager` to manage UI elements
- Use events to update UI from game logic

**Files to Create:**

- `Assets/Scripts/UI/UIManager.cs`
- `Assets/UI/` (folder for UI assets and prefabs)

## Performance Architecture

[[LLM: Define performance requirements and optimization strategies]]

### Performance Targets

**Frame Rate:** Stable frame rate, 60+ FPS on target platforms
**Memory Usage:** <{{memory_limit}}MB total
**Load Times:** <{{initial_load}}s initial, <{{level_load}}s per level
**Battery Optimization:** Reduced updates when not visible

### Optimization Strategies

**Object Pooling:**

- Bullets and projectiles
- Particle effects
- Enemy objects
- UI elements

**Asset Optimization:**

- Sprite atlases
- Audio compression
- Mipmaps for textures

**Rendering Optimization:**

- Use the 2D Renderer
- Batching for sprites
- Culling off-screen objects

**Files to Create:**

- `Assets/Scripts/Core/ObjectPool.cs`

## Game Configuration

[[LLM: Define all configurable aspects of the game]]

### Game Balance Configuration

[[LLM: Based on GDD, define configurable game parameters using ScriptableObjects]]

```csharp
// Assets/Scripts/Data/GameBalance.cs
using UnityEngine;

[CreateAssetMenu(fileName = "GameBalance", menuName = "Game/Game Balance")]
public class GameBalance : ScriptableObject
{
    public PlayerStats playerStats;
    public EnemyStats enemyStats;
}

[System.Serializable]
public class PlayerStats
{
    public float speed;
    public int maxHealth;
}

[System.Serializable]
public class EnemyStats
{
    public float speed;
    public int maxHealth;
    public int damage;
}
```

## Development Guidelines

[[LLM: Provide coding standards specific to game development]]

### C# Standards

**Code Style:**

- Follow .NET coding conventions
- Use namespaces to organize code
- Write clean, readable, and maintainable code

**Best Practices:**

- Use the `[SerializeField]` attribute to expose private fields in the Inspector
- Avoid using `GameObject.Find()` in `Update()`
- Cache component references in `Awake()` or `Start()`

### Unity Best Practices

**Component Design:**

- Follow the Single Responsibility Principle
- Use events for communication between components
- Use ScriptableObjects for data

**Scene Management:**

- Use a loading scene for asynchronous loading
- Keep scenes small and focused

### Testing Strategy

**Unit Testing:**

- Use the Unity Test Framework (Edit Mode tests)
- Test C# logic in isolation

**Integration Testing:**

- Use the Unity Test Framework (Play Mode tests)
- Test the interaction between components and systems

**Files to Create:**

- `Assets/Tests/EditMode/`
- `Assets/Tests/PlayMode/`

## Deployment Architecture

[[LLM: Define how the game will be built and deployed]]

### Build Process

**Development Build:**

- Enable "Development Build" in Build Settings
- Use the Profiler to analyze performance

**Production Build:**

- Disable "Development Build"
- Use IL2CPP for better performance
- Configure platform-specific settings

### Deployment Strategy

**Platform Deployment:**

- Configure player settings for each target platform
- Use Unity Cloud Build for automated builds
- Follow platform-specific guidelines for submission

## Implementation Roadmap

[[LLM: Break down the architecture implementation into phases that align with the GDD development phases]]

### Phase 1: Foundation ({{duration}})

**Core Systems:**

- Project setup and configuration
- Basic scene management
- Asset loading pipeline
- Input handling framework

**Story Epics:**

- "Engine Setup and Configuration"
- "Basic Scene Management System"
- "Asset Loading Foundation"

### Phase 2: Game Systems ({{duration}})

**Gameplay Systems:**

- {{primary_mechanic}} implementation
- Physics and collision system
- Game state management
- UI framework

**Story Epics:**

- "{{Primary_Mechanic}} System Implementation"
- "Physics and Collision Framework"
- "Game State Management System"

### Phase 3: Content & Polish ({{duration}})

**Content Systems:**

- Level loading and management
- Audio system integration
- Performance optimization
- Final polish and testing

**Story Epics:**

- "Level Management System"
- "Audio Integration and Optimization"
- "Performance Optimization and Testing"

## Risk Assessment

[[LLM: Identify potential technical risks and mitigation strategies]]

| Risk                         | Probability | Impact     | Mitigation Strategy |
| ---------------------------- | ----------- | ---------- | ------------------- |
| Performance issues on mobile | {{prob}}    | {{impact}} | {{mitigation}}      |
| Asset loading bottlenecks    | {{prob}}    | {{impact}} | {{mitigation}}      |
| Cross-platform compatibility | {{prob}}    | {{impact}} | {{mitigation}}      |

## Success Criteria

[[LLM: Define measurable technical success criteria]]

**Technical Metrics:**

- All systems implemented per specification
- Performance targets met consistently
- Zero critical bugs in core systems
- Successful deployment across target platforms

**Code Quality:**

- 90%+ test coverage on game logic
- Zero C# compiler errors or warnings
- Consistent adherence to coding standards
- Comprehensive documentation coverage
