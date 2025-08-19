<!-- Powered by BMAD™ Core -->

# WeChat Mini-Game Development Guidelines

## Overview

This document establishes coding standards, architectural patterns, and development practices for game development on the WeChat Mini-Game platform. These guidelines ensure consistency, performance, and maintainability across all game development stories.

## JavaScript/TypeScript Standards

### General Best Practices

- Use `const` by default, `let` when reassignment is necessary. Avoid `var`.
- Use strict equality (`===` and `!==`) to avoid type coercion issues.
- Write modular and reusable code using functions and classes.

### Naming Conventions

**Classes and Interfaces:**

- PascalCase for classes: `Player`, `GameManager`, `AudioSystem`
- Descriptive names that indicate purpose: `CollisionManager` not `CM`

**Methods and Variables:**

- camelCase for methods and variables: `updatePosition()`, `playerSpeed`
- Descriptive names: `calculateDamage()` not `calcDmg()`
- Boolean variables with is/has/can prefix: `isActive`, `hasCollision`, `canMove`

**Constants:**

- UPPER_SNAKE_CASE for constants: `MAX_PLAYER_SPEED`, `DEFAULT_VOLUME`

**Files and Directories:**

- kebab-case for file names: `player-controller.js`, `audio-manager.js`
- Use descriptive names for pages and components.

## WeChat Mini-Game Architecture Patterns

### App and Page Lifecycle

**app.js:**

```javascript
// app.js
App({
  onLaunch() {
    // Called when the mini-game is initialized
    // Perform global initialization here
  },
  onShow(options) {
    // Called when the mini-game is launched or brought to the foreground
  },
  onHide() {
    // Called when the mini-game is switched to the background
  },
  globalData: {
    userInfo: null,
  },
});
```

**Page Lifecycle:**

```javascript
// pages/game/game.js
Page({
  data: {
    // Page data
  },
  onLoad(options) {
    // Called when the page is loaded
  },
  onReady() {
    // Called when the page is first rendered
  },
  onShow() {
    // Called when the page is shown
  },
  onHide() {
    // Called when the page is hidden
  },
  onUnload() {
    // Called when the page is unloaded
  },
});
```

### Component-Based Architecture

- Create reusable UI components in the `components` directory.
- Use `Component` constructor to define custom components.
- Communicate between components using events.

## Performance Optimization

### Package Size

- Keep the initial package size under the limit (e.g., 4MB).
- Use subpackages for additional assets and code.
- Compress images and audio files to reduce size.

### Frame Rate Optimization

- Use `requestAnimationFrame` for animations.
- Avoid expensive operations in rendering loops.
- Offload complex calculations to worker threads if necessary.

## Input Handling

### Touch Input

- Use `bindtouchstart`, `bindtouchmove`, `bindtouchend`, and `bindtap` to handle touch events.
- Be mindful of the performance impact of frequent touch events.

## Error Handling

### Graceful Degradation

- Use `try...catch` blocks to handle potential errors.
- Provide fallback mechanisms for when APIs fail.
- Use `wx.getSystemInfo` to check for API availability.

## Testing Standards

### Manual Testing

- Test on a variety of iOS and Android devices.
- Test different network conditions.
- Test for compatibility with different WeChat versions.

## File Organization

### Project Structure

```
.
├── app.js
├── app.json
├── app.wxss
├── components
│   └── ...
├── images
│   └── ...
├── pages
│   ├── index
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── game
│       ├── game.js
│       ├── game.json
│       ├── game.wxml
│       └── game.wxss
├── project.config.json
└── ...
```

## Development Workflow

### Story Implementation Process

1. **Read Story Requirements:**
   - Understand acceptance criteria
   - Identify technical requirements
   - Review performance constraints
2. **Plan Implementation:**
   - Identify files to create/modify
   - Consider component architecture
   - Plan testing approach
3. **Implement Feature:**
   - Follow JavaScript/TypeScript best practices
   - Use established patterns
   - Maintain smooth performance
4. **Test Implementation:**
   - Test on target devices
   - Validate performance targets
5. **Update Documentation:**
   - Mark story checkboxes complete
   - Document any deviations

### Code Review Checklist

**Before Committing:**

- [ ] Code runs without errors
- [ ] Performance targets met
- [ ] No console errors or warnings
- [ ] Cross-platform compatibility verified
- [ ] Memory usage within bounds
- [ ] Code follows naming conventions
- [ ] Error handling implemented
- [ ] Documentation updated

## Performance Targets

### Frame Rate Requirements

- Maintain a stable frame rate (e.g., 30 or 60 FPS).
- Implement dynamic quality scaling if performance drops.

### Memory Management

- Be mindful of memory usage to avoid crashes on low-end devices.
- Clean up unused resources to prevent memory leaks.

### Loading Performance

- Keep initial load time under a few seconds.
- Use loading screens to provide feedback to the user.

These guidelines ensure consistent, high-quality WeChat Mini-Game development that meets performance targets and maintains code quality across all implementation stories.
