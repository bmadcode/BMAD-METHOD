# Validate Game Story Task

## Purpose

To comprehensively validate a Godot 2D game development story draft before implementation begins, ensuring it contains all necessary Godot-specific technical context, game development requirements, and implementation details. This specialized validation prevents hallucinations, ensures Godot development readiness, and validates game-specific acceptance criteria and testing approaches.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 0. Load Core Configuration and Inputs

- Load `{root}/core-config.yaml` from the project root
- If the file does not exist, HALT and inform the user: "core-config.yaml not found. This file is required for story validation."
- Extract key configurations: `devStoryLocation`, `gdd.*`, `gamearchitecture.*`, `workflow.*`
- Identify and load the following inputs:
  - **Story file**: The drafted game story to validate (provided by user or discovered in `devStoryLocation`)
  - **Parent epic**: The epic containing this story's requirements from GDD
  - **Architecture documents**: Based on configuration (sharded or monolithic)
  - **Game story template**: `expansion-packs/bmad-2d-godot-game-dev/templates/game-story-tmpl.yaml` for completeness validation

### 1. Game Story Template Completeness Validation

- Load `expansion-packs/bmad-2d-godot-game-dev/templates/game-story-tmpl.yaml` and extract all required sections
- **Missing sections check**: Compare story sections against game story template sections to verify all Godot-specific sections are present:
  - Godot Technical Context
  - Node Architecture
  - Scene & Node Requirements
  - Asset Dependencies
  - Performance Requirements
  - Platform Considerations
  - Integration Points
  - Testing Strategy (Godot Test Framework)
- **Placeholder validation**: Ensure no template placeholders remain unfilled (e.g., `{{EpicNum}}`, `{{StoryNum}}`, `{{GameMechanic}}`, `_TBD_`)
- **Game-specific sections**: Verify presence of Godot development specific sections
- **Structure compliance**: Verify story follows game story template structure and formatting

### 2. Godot Project Structure and Asset Validation

- **Godot file paths clarity**: Are Godot-specific paths clearly specified (scenes/, scripts/, resources/, etc.)?
- **Addon dependencies**: Are required Godot addons identified and version-locked?
- **Scene structure relevance**: Is relevant scene hierarchy and Node structure included?
- **Scene organization**: Are scene creation/modification requirements clearly specified?
- **Asset pipeline**: Are sprite imports, animation controllers, and audio assets properly planned?
- **Directory structure**: Do new Godot assets follow project structure according to architecture docs?
- **Resource requirements**: Are data containers and configuration objects identified?
- **Namespace compliance**: Are GDScript/C# namespaces following project conventions?

### 3. Godot Node Architecture Validation

- **Node specifications**: Are Godot node classes sufficiently detailed for implementation?
- **Node dependencies**: Are Godot node interdependencies clearly mapped?
- **Godot lifecycle usage**: Are _ready(), _process(), _enter_tree() methods appropriately planned?
- **Signal system integration**: Are Godot signals, C# events, or custom messaging systems specified?
- **Export requirements**: Are @export and public field requirements clear?
- **Node interfaces**: Are required interfaces and abstract base classes defined?
- **Performance considerations**: Are node update patterns optimized (_process vs _physics_process vs timers)?

### 4. Game Mechanics and Systems Validation

- **Core loop integration**: Does the story properly integrate with established game core loop?
- **Player input handling**: Are input mappings and input system requirements specified?
- **Game state management**: Are state transitions and persistence requirements clear?
- **UI/UX integration**: Are Canvas setup, UI components, and player feedback systems defined?
- **Audio integration**: Are AudioSource, AudioMixer, and sound effect requirements specified?
- **Animation systems**: Are Animator Controllers, Animation Clips, and transition requirements clear?
- **Physics integration**: Are RigidBody2D, Area2D, and physics material requirements specified?

### 5. Godot-Specific Acceptance Criteria Assessment

- **Functional testing**: Can all acceptance criteria be tested within Godot's debug mode?
- **Visual validation**: Are visual/aesthetic acceptance criteria measurable and testable?
- **Performance criteria**: Are frame rate, memory usage, and build size criteria specified?
- **Platform compatibility**: Are mobile vs desktop specific acceptance criteria addressed?
- **Input validation**: Are different input methods (touch, keyboard, gamepad) covered?
- **Audio criteria**: Are audio mixing levels, sound trigger timing, and audio quality specified?
- **Animation validation**: Are animation smoothness, timing, and visual polish criteria defined?

### 6. Godot Testing and Validation Instructions Review

- **Godot Test Framework**: Are editor and runtime test approaches clearly specified?
- **Performance profiling**: Are Godot Profiler usage and performance benchmarking steps defined?
- **Build testing**: Are build process validation steps for target platforms specified?
- **Scene testing**: Are scene loading, unloading, and transition testing approaches clear?
- **Asset validation**: Are texture compression, audio compression, and asset optimization tests defined?
- **Platform testing**: Are device-specific testing requirements (mobile performance, input methods) specified?
- **Memory leak testing**: Are Godot memory profiling and leak detection steps included?

### 7. Godot Performance and Optimization Validation

- **Frame rate targets**: Are target FPS requirements clearly specified for different platforms?
- **Memory budgets**: Are texture memory, audio memory, and runtime memory limits defined?
- **Draw call optimization**: Are batching strategies and draw call reduction approaches specified?
- **Mobile performance**: Are mobile-specific performance considerations (battery, thermal) addressed?
- **Asset optimization**: Are texture compression, audio compression, and mesh optimization requirements clear?
- **Garbage collection**: Are GC-friendly coding patterns and object pooling requirements specified?
- **Loading time targets**: Are scene loading and asset streaming performance requirements defined?

### 8. Godot Security and Platform Considerations (if applicable)

- **Platform store requirements**: Are app store guidelines and submission requirements addressed?
- **Data privacy**: Are player data storage and analytics integration requirements specified?
- **Platform integration**: Are platform-specific features (achievements, leaderboards) requirements clear?
- **Content filtering**: Are age rating and content appropriateness considerations addressed?
- **Anti-cheat considerations**: Are client-side validation and server communication security measures specified?
- **Build security**: Are code obfuscation and asset protection requirements defined?

### 9. Godot Development Task Sequence Validation

- **Godot workflow order**: Do tasks follow proper Godot development sequence (scenes before scripts, nodes before UI)?
- **Asset creation dependencies**: Are asset creation tasks properly ordered (sprites before animations, audio before mixers)?
- **Node dependencies**: Are script dependencies clear and implementation order logical?
- **Testing integration**: Are Godot test creation and execution properly sequenced with development tasks?
- **Build integration**: Are build process tasks appropriately placed in development sequence?
- **Platform deployment**: Are platform-specific build and deployment tasks properly sequenced?

### 10. Godot Anti-Hallucination Verification

- **Godot API accuracy**: Every Godot API reference must be verified against current Godot documentation
- **Addon version verification**: All Godot addon references must specify valid versions
- **Node architecture alignment**: Godot node relationships must match architecture specifications
- **Performance claims verification**: All performance targets must be realistic and based on platform capabilities
- **Asset pipeline accuracy**: All asset import settings and pipeline configurations must be valid
- **Platform capability verification**: All platform-specific features must be verified as available on target platforms

### 11. Godot Development Agent Implementation Readiness

- **Godot context completeness**: Can the story be implemented without consulting external Godot documentation?
- **Technical specification clarity**: Are all Godot-specific implementation details unambiguous?
- **Asset requirements clarity**: Are all required assets, their specifications, and import settings clearly defined?
- **Node relationship clarity**: Are all Godot node interactions and dependencies explicitly defined?
- **Testing approach completeness**: Are Godot-specific testing approaches fully specified and actionable?
- **Performance validation readiness**: Are all performance testing and optimization approaches clearly defined?

### 12. Generate Godot Game Story Validation Report

Provide a structured validation report including:

#### Game Story Template Compliance Issues

- Missing Godot-specific sections from game story template
- Unfilled placeholders or template variables specific to game development
- Missing Godot node specifications or asset requirements
- Structural formatting issues in game-specific sections

#### Critical Godot Issues (Must Fix - Story Blocked)

- Missing essential Godot technical information for implementation
- Inaccurate or unverifiable Godot API references or addon dependencies
- Incomplete game mechanics or systems integration
- Missing required Godot testing framework specifications
- Performance requirements that are unrealistic or unmeasurable

#### Godot-Specific Should-Fix Issues (Important Quality Improvements)

- Unclear Godot node architecture or dependency relationships
- Missing platform-specific performance considerations
- Incomplete asset pipeline specifications or optimization requirements
- Task sequencing problems specific to Godot development workflow
- Missing Godot Test Framework integration or testing approaches

#### Game Development Nice-to-Have Improvements (Optional Enhancements)

- Additional Godot performance optimization context
- Enhanced asset creation guidance and best practices
- Clarifications for Godot-specific development patterns
- Additional platform compatibility considerations
- Enhanced debugging and profiling guidance

#### Godot Anti-Hallucination Findings

- Unverifiable Godot API claims or outdated Godot references
- Missing Godot addon version specifications
- Inconsistencies with Godot project architecture documents
- Invented Godot nodes, addons, or development patterns
- Unrealistic performance claims or platform capability assumptions

#### Godot Platform and Performance Validation

- **Mobile Performance Assessment**: Frame rate targets, memory usage, and thermal considerations
- **Platform Compatibility Check**: Input methods, screen resolutions, and platform-specific features
- **Asset Pipeline Validation**: Texture compression, audio formats, and build size considerations
- **Godot Version Compliance**: Compatibility with specified Godot version and addon versions

#### Final Godot Game Development Assessment

- **GO**: Story is ready for Godot implementation with all technical context
- **NO-GO**: Story requires Godot-specific fixes before implementation
- **Godot Implementation Readiness Score**: 1-10 scale based on Godot technical completeness
- **Game Development Confidence Level**: High/Medium/Low for successful Godot implementation
- **Platform Deployment Readiness**: Assessment of multi-platform deployment preparedness
- **Performance Optimization Readiness**: Assessment of performance testing and optimization preparedness

#### Recommended Next Steps

Based on validation results, provide specific recommendations for:

- Godot technical documentation improvements needed
- Asset creation or acquisition requirements
- Performance testing and profiling setup requirements
- Platform-specific development environment setup needs
- Godot Test Framework implementation recommendations
