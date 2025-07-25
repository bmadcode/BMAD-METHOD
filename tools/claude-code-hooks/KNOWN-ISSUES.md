# Known Issues

## ~~Claude Code PreToolUse Hook Bug~~ (RESOLVED)

**Issue**: PreToolUse hooks were using incorrect syntax for decision control.

**Status**: ✅ Resolved - [GitHub Issue #4362](https://github.com/anthropics/claude-code/issues/4362)

**Resolution**: 
The correct syntax for PreToolUse decision control is:
```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow" | "deny",
    "permissionDecisionReason": "Optional reason shown to user"
  }
}
```

**Previous Issue**: 
The hooks were using `{"approve": false}` which was incorrect. The official documentation at https://docs.anthropic.com/en/docs/claude-code/hooks#pretooluse-decision-control shows the correct format.

**Current Status**: 
✅ PreToolUse hooks now correctly block operations when validation fails
✅ Quality enforcement can prevent bad code from being written
✅ Full validation functionality is now working as intended

## Custom Configuration Keys

**Issue**: Claude Code rejects custom keys in settings.json

**Status**: Resolved with workaround

**Description**:
Claude Code's settings validation rejects unknown keys like `bmad-hooks`, causing validation errors:
```
[DEBUG] Invalid settings in projectSettings source - key: bmad-hooks, error: [
  {
    "code": "unrecognized_keys",
    "keys": ["bmad-hooks"],
    "message": "Unrecognized key(s) in object: 'bmad-hooks'"
  }
]
```

**Solution**:
The installer now creates a separate `.claude/bmad-config.json` file for BMAD-specific configuration. This avoids validation errors while keeping hook configurations easily accessible and modifiable.

## Installation Notes

**Critical**: Hooks receive input via stdin, not environment variables. This was discovered through debugging and is now correctly implemented in all hooks.