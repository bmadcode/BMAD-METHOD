# BMAD Claude Integration Hooks

This directory contains hook scripts that enhance the BMAD-METHOD integration with Claude Code. These hooks are optional but provide better session management and context preservation.

## Available Hooks

### bmad-session-check.sh
- **Event**: UserPromptSubmit
- **Purpose**: Checks for active BMAD sessions when user submits a prompt
- **Output**: Notifies user if active sessions exist

### bmad-context-save.sh
- **Event**: SubagentStop
- **Purpose**: Backs up context when a BMAD subagent completes
- **Usage**: Preserves conversation state for recovery

### bmad-elicitation-handler.sh
- **Event**: PreToolUse (optional)
- **Purpose**: Manages elicitation phase transitions
- **Output**: Shows current elicitation status with agent identification

### bmad-session-switch.sh
- **Event**: Custom (called by session management commands)
- **Purpose**: Handles session switching, suspension, and resumption
- **Actions**: switch, suspend, resume

## Installation

These hooks are automatically configured when you run the installer with hooks enabled:

```bash
npm run install:local
# When prompted: "Install hooks for enhanced integration? (y/N): y"
```

## Manual Installation

1. Copy hooks to a location accessible by Claude Code
2. Make them executable: `chmod +x *.sh`
3. Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/bmad-session-check.sh"
          }
        ]
      }
    ],
    "SubagentStop": [
      {
        "matcher": "bmad-.*",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/bmad-context-save.sh"
          }
        ]
      }
    ]
  }
}
```

## Dependencies

Some hooks require:
- `jq` for JSON parsing (bmad-elicitation-handler.sh)
- Standard UNIX tools: `bash`, `cat`, `touch`, `rm`

## Security Notes

- All hooks run with user permissions
- Hooks only read/write to `~/.bmad/` directory
- No external network calls
- No sensitive data handling

## Troubleshooting

If hooks aren't working:
1. Check they're executable: `ls -la *.sh`
2. Verify paths in settings.json are absolute
3. Check Claude Code logs for hook execution errors
4. Ensure `~/.bmad/` directory exists with proper permissions