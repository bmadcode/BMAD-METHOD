# BMAD Claude Code Hooks

Automatic quality enforcement and context management for BMAD-Method users running Claude Code CLI.

## Overview

These hooks integrate with Claude Code's native hooks system to provide:
- **Automatic context loading** from active story files
- **Pre-write validation** to prevent simulation patterns (see Known Issues)
- **Progress tracking** without manual story updates
- **Session summaries** with actionable next steps

**⚠️ Important**: There is currently a bug in Claude Code where PreToolUse hooks cannot actually block operations. See [KNOWN-ISSUES.md](KNOWN-ISSUES.md) for details.

## Installation

### Automatic Installation (Recommended)

**IMPORTANT**: Run this command from the BMAD-Method source directory, NOT from your project directory.

```bash
# Navigate to where you downloaded/cloned BMAD-Method
cd /path/to/BMAD-METHOD-main

# Install hooks for your project
npm run install:claude-hooks -- --project-dir /path/to/your/project

# Example for Windows:
# cd C:\Projects\BMAD-Method\src\BMAD-METHOD-main
# npm run install:claude-hooks -- --project-dir C:\Projects\HelloWorld
```

This will:
1. Detect Claude Code environment
2. Install hooks to your project's `.claude` directory
3. Configure paths for your specific project
4. Create a backup of any existing settings

**Important**: If VS Code is already open, you must close and restart it after installation for the hooks to take effect.

### Manual Installation

1. Create `.claude/settings.json` in your project directory
2. Copy the hook configuration from this directory
3. Update all paths to point to the BMAD-Method source location
4. Ensure Node.js is in your PATH

## Using the Hooks

### Starting Claude Code
After installation, you can use Claude Code in either way:

1. **GUI Method**: Open VS Code → Open your project folder → Use Claude Code
2. **Terminal Method**: `cd your-project && claude code .`

Both methods work - the hooks load automatically from your project's `.claude/settings.json`.

### Verifying Hook Activation
To confirm hooks are working:
- Try writing a stub function - it should be blocked
- End a session - you should see a summary
- Check for context loading when starting a new session

## Hook Details

### UserPromptSubmit Hook
- **File**: `user-prompt-submit.js`
- **Purpose**: Loads active story context and quality reminders
- **Triggers**: On every prompt submission
- **Benefits**: Never lose context between sessions

### PreToolUse Hook  
- **File**: `pre-tool-use.js`
- **Purpose**: Validates code quality before writes
- **Triggers**: Before Write, Edit, MultiEdit operations
- **Benefits**: Prevents stub implementations and TODOs

### PostToolUse Hook
- **File**: `post-tool-use.js`
- **Purpose**: Tracks progress and runs quality checks
- **Triggers**: After code modifications or bash commands
- **Benefits**: Automatic progress tracking and quality alerts

### Stop Hook
- **File**: `stop.js`
- **Purpose**: Generates session summary
- **Triggers**: When Claude Code session ends
- **Benefits**: Clear next steps and progress overview

## Configuration

Edit `~/.claude/settings.json` to customize:

```json
{
  "bmad": {
    "enabled": true,
    "hooksPath": "/path/to/tools/claude-code-hooks"
  }
}
```

### Disabling Hooks

To temporarily disable:
```json
{
  "bmad": {
    "enabled": false
  }
}
```

Or remove specific hooks from the `hooks` section.

## Compatibility

- **Required**: Node.js 20+
- **Claude Code**: v1.0+
- **BMAD-Method**: v4.0+
- **Zero impact** on other IDEs (Cursor, Windsurf, etc.)

## Architecture

All hooks use **only Node.js built-in modules**:
- `fs.promises` for file operations
- `path` for cross-platform paths
- `os` for home directory
- No external dependencies

## Performance

- Hook execution < 500ms
- Async operations prevent blocking
- Smart caching for repeated operations
- Minimal token usage through filtering

## Troubleshooting

### Hooks not running?
1. Check Claude Code environment: `echo $CLAUDE_CODE`
2. Verify settings: `cat ~/.claude/settings.json`
3. Test Node.js: `node --version` (must be 20+)

### Permission errors?
```bash
chmod +x tools/claude-code-hooks/*.js
```

### Debug mode
Set environment variable:
```bash
export BMAD_HOOKS_DEBUG=true
```

## Privacy & Security

- Hooks run locally only
- No data sent externally
- No network requests
- Read-only access to project files
- Settings backed up before changes