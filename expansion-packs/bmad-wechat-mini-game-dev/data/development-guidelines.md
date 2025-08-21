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

### Package Size and Asset Management

- **Initial Package Size:** The initial package size is strictly limited (currently 4MB). Keep your core game logic and essential assets in the main package.
- **Subpackages:** Use subpackages for additional levels, features, and non-essential assets. This allows for on-demand loading and keeps the initial download small.
- **Image Compression:** Use appropriate image formats (e.g., PNG, JPG) and compression tools. For games, consider using texture compression formats like ETC1/2 or PVRTC where applicable.
- **Audio Compression:** Use compressed audio formats (e.g., MP3, AAC) and adjust the bitrate to balance quality and size.
- **Font Optimization:** Avoid including large font files. If possible, use the system font or bitmap fonts. If you need a custom font, only include the characters you need.

### Frame Rate and Rendering

- **`requestAnimationFrame`:** Always use `requestAnimationFrame` for game loops and animations. It's more efficient than `setInterval` or `setTimeout` and aligns with the browser's rendering cycle.
- **Off-Screen Canvas:** For complex drawing operations, use an off-screen canvas to pre-render content and then draw the result to the main canvas in a single operation.
- **Avoid Expensive Operations:** Minimize complex calculations, object creation, and memory allocation within the main game loop.
- **Worker Threads:** For heavy computations like AI or physics, offload them to a worker thread to avoid blocking the main rendering thread.

### Memory Management and Garbage Collection

- **Object Pooling:** Reuse objects (e.g., bullets, enemies) instead of creating and destroying them frequently. This reduces garbage collection (GC) pressure.
- **Resource Cleanup:** Explicitly destroy objects and release resources when they are no longer needed. This is especially important for event listeners, timers, and large assets like images and audio.
- **`wx.triggerGC()`:** In scenarios where you know a large amount of memory can be freed (e.g., after a level change), you can use `wx.triggerGC()` to suggest a garbage collection cycle. Use this sparingly, as it can cause a performance stutter.

### Performance Monitoring

- **`wx.getPerformance()`:** Use this API to get performance metrics like frame rate, memory usage, and draw calls.
- **WeChat DevTools:** The developer tools provide a performance panel for profiling CPU usage, memory, and rendering.
- **Online Diagnosis Tool:** Use the official online performance diagnosis tool to get a detailed report on your game's performance.

## WeChat API Usage Best Practices

### Login and User Data

- **`wx.login()`:** Call this early in your game's lifecycle to get a login code.
- **User Privacy:** When using `wx.getUserInfo()`, you must now use a button to trigger the authorization prompt. Be transparent with players about why you need their information. Refer to the latest user privacy guidelines.

### Social Features

- **Sharing (`wx.shareAppMessage`):**
    - Provide engaging share titles and images to encourage clicks.
    - Use query parameters in your share URLs to track sources and reward players for successful shares.
- **OpenDataContext (Leaderboards):**
    - The OpenDataContext is a separate, isolated environment for rendering social data like leaderboards.
    - Communication between the main game and the OpenDataContext is done via `postMessage`.
    - Keep the OpenDataContext as simple as possible to ensure good performance.

### File System

- **`wx.getFileSystemManager()`:** Use this API for all file system operations.
- **Storage Limits:** Be aware of the storage limits for user data. The total size is limited (currently 50MB).
- **Temporary vs. User Files:** Understand the difference between temporary files (cleared on exit) and user files (persistent). Use the appropriate storage for your needs.

## Review and Publishing Process

### Key Steps

1.  **Development and Testing:** Complete your game and test it thoroughly.
2.  **Submit for Review:** In the WeChat DevTools, upload your code and submit it for review.
3.  **Review Process:** The WeChat team will review your game for compliance with their policies and guidelines. This can take several business days.
4.  **Approval or Rejection:** You will be notified of the outcome. If rejected, you will be given reasons, and you can resubmit after making the necessary changes.
5.  **Publishing:** Once approved, you can publish your game to make it available to all WeChat users.

### Common Reasons for Rejection

- **Bugs and Performance Issues:** Games that crash, have significant bugs, or perform poorly are likely to be rejected.
- **Policy Violations:** Ensure your game complies with all of WeChat's content policies (e.g., no gambling, violence, or adult content).
- **Incomplete Information:** Provide all necessary information during the submission process, including test accounts and clear descriptions of your game's features.
- **Lack of "Game-like" Qualities:** Your submission should be a game, not just a simple interactive application.

Refer to the official [WeChat Mini Game Review Guidelines](https://developers.weixin.qq.com/minigame/product/#%E5%AE%A1%E6%A0%B8%E8%A7%84%E8%8C%83) for the most up-to-date information.

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
