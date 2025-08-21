<!-- Powered by BMAD™ Core -->

# Technical Preferences for WeChat Mini-Game Development

This document outlines the preferred technologies, patterns, and libraries for developing games on the WeChat Mini-Game platform. It serves as a guide for the `game-orchestrator` and `game-developer` agents to ensure consistency and optimal performance.

## Core Technologies

- **Language**: JavaScript (ES6+) is preferred for its broad compatibility and performance on the platform. TypeScript can be used for larger projects, but be mindful of the added compilation step.
- **Rendering Engine**: Utilize the native **Canvas 2D API** provided by the WeChat Mini-Game runtime. Avoid heavy, general-purpose rendering engines that are not optimized for the platform.
- **UI**: Prefer WeChat's native UI components for menus, buttons, and other non-gameplay screens where possible. This ensures a familiar user experience and better performance.

## Architecture and Patterns

- **State Management**: For simple games, a lightweight event bus or a simple singleton pattern is preferred for managing game state. For more complex games, consider a minimal state management library like `tiny-atom` or `unistore`. Avoid large, complex libraries like Redux.
- **Component Model**: Follow a simple component-based architecture. Each major game entity (e.g., player, enemy, HUD) should be its own component with a clear interface.
- **Object Pooling**: Implement object pooling for frequently created and destroyed objects (e.g., bullets, particles) to reduce pressure on the garbage collector.

## Performance

- **Asset Optimization**: All assets must be heavily optimized. Use tools like TinyPNG for images and ensure audio files are compressed.
- **Package Size**: The initial package size must be kept under 4MB. Use subpackages for non-essential assets and levels.
- **Memory Management**: Be mindful of memory usage. Avoid creating large objects in the game loop and clean up unused resources explicitly.

## Anti-Patterns (Things to Avoid)

- **Large Frameworks**: Do not use large, general-purpose JavaScript frameworks like React, Vue, or Angular for the main game loop. They are not designed for the performance requirements of a game loop.
- **Heavy Libraries**: Avoid including large libraries that are not essential for the game's functionality. Every kilobyte counts towards the package size limit.
- **Blocking Operations**: Never perform blocking operations (e.g., synchronous file I/O) on the main thread. Use asynchronous APIs or worker threads for heavy tasks.
- **Deep Object Nesting**: Avoid deep nesting of objects in your game state, as this can make state updates and debugging more complex.
