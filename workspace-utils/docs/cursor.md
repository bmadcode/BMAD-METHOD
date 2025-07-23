# BMAD Workspace Integration - Cursor IDE

## Overview
BMAD workspace utilities are fully compatible with Cursor IDE, providing seamless collaborative development experience across your team.

## Setup

### 1. Initialize Workspace
```bash
npm run workspace-init
```
This will:
- Create `.workspace/` directory structure
- Set up session tracking for Cursor
- Generate Cursor-specific configuration files
- Create IDE-specific templates and examples

### 2. Verify Installation
```bash
npm run workspace-status
```
You should see:
- ✅ Active session detected (cursor)
- 💚 Health Score: 90+/100
- 📁 All required directories present

## Cursor-Specific Features

### 🎯 Native Integration
- **Terminal Commands**: All workspace utilities available through Cursor's integrated terminal
- **Git Integration**: Workspace operations respect Cursor's git panel and version control
- **File Explorer**: Workspace directories appear in Cursor's file explorer with proper icons
- **Custom Rules**: Workspace state can be referenced in `.cursor/rules/` files

### 🔧 Workspace Commands

#### Session Management
```bash
npm run workspace-init       # Start new collaboration session
npm run workspace-status     # Check team activity and workspace health
npm run workspace-sync       # Synchronize with latest team context
```

#### Agent Handoffs
```bash
npm run workspace-handoff    # Interactive handoff creation
npm run workspace-handoff create --from dev --to qa --work "Feature implementation complete"
npm run workspace-handoff list  # Show recent handoffs
npm run workspace-handoff agents  # List available BMAD agents
```

#### Maintenance
```bash
npm run workspace-cleanup    # Clean stale sessions and optimize storage
npm run workspace-health     # Comprehensive health check and diagnostics
```

## Cursor Integration Patterns

### 1. Custom Rules Integration
Create `.cursor/rules/workspace.md` to integrate workspace context:

```markdown
# Workspace-Aware Development Rules

## Context Integration
- Before making changes, check workspace context: `.workspace/context/sync-summary.md`
- Review recent handoffs: `.workspace/handoffs/`
- Check quality reports: `.workspace/quality/`

## Agent Collaboration
- When ready for QA, use: `npm run workspace-handoff create --to qa`
- Before major changes, sync context: `npm run workspace-sync`
- Report issues in workspace context files for team visibility

## Quality Standards
- Run workspace health check before commits: `npm run workspace-health`
- Maintain workspace cleanliness: `npm run workspace-cleanup` weekly
- Update workspace context with significant progress
```

### 2. Git Integration
The workspace system integrates with Cursor's git features:

- **Pre-commit**: Workspace health automatically checked
- **Branch switching**: Session context preserved across branches
- **Merge conflicts**: Workspace context helps resolve conflicts
- **Commit messages**: Include workspace session ID for traceability

### 3. File Organization
Cursor will show the workspace structure clearly:

```
📁 .workspace/
├── 📂 sessions/          # Current and past development sessions
├── 📂 context/           # Shared development context
├── 📂 handoffs/          # Agent-to-agent work transitions
├── 📂 progress/          # Development progress tracking
├── 📂 quality/           # Quality reports and metrics
├── 📂 decisions/         # Architecture and design decisions
└── 📂 templates/         # IDE-specific setup guides
```

## Best Practices for Cursor Users

### 🚀 Starting Your Work Session
1. **Open terminal** in Cursor (Ctrl+` or Cmd+`)
2. **Initialize workspace**: `npm run workspace-init`
3. **Check team status**: `npm run workspace-status`
4. **Sync latest context**: `npm run workspace-sync`

### 🔄 During Development
- **Update heartbeat**: Workspace automatically tracks your active session
- **Share context**: Add important findings to `.workspace/context/`
- **Track decisions**: Document choices in `.workspace/decisions/`
- **Monitor health**: Run `npm run workspace-health` if issues arise

### 📤 Handing Off Work
1. **Prepare handoff**: `npm run workspace-handoff create --to [agent]`
2. **Add context**: Include current work status and blockers
3. **Sync final state**: `npm run workspace-sync`
4. **Verify handoff**: Check `.workspace/handoffs/` for summary

### 🧹 Weekly Maintenance
```bash
# Clean up workspace (run weekly)
npm run workspace-cleanup

# Health check (run before important work)
npm run workspace-health

# Full sync (run when switching contexts)
npm run workspace-sync
```

## Troubleshooting

### Common Issues

**"Workspace directory not found"**
- Solution: Run `npm run workspace-init` from your project root
- Verify you're in the correct project directory

**"Permission denied" errors**
- Solution: Check file permissions on `.workspace/` directory
- Run `chmod -R 755 .workspace/` if needed (Unix/Mac)

**"No active session found"**
- Solution: Initialize a new session with `npm run workspace-init`
- Or sync with existing sessions: `npm run workspace-sync`

**Session conflicts**
- Multiple team members: Each gets unique session ID
- Session cleanup: Run `npm run workspace-cleanup` to remove stale sessions
- Health check: `npm run workspace-health` identifies session issues

### IDE-Specific Issues

**Cursor git panel not updating**
- Workspace operations are git-aware
- Refresh Cursor's git panel (Ctrl+Shift+P → "Git: Refresh")
- Check `.workspace/logs/workspace.log` for detailed activity

**Terminal commands not found**
- Ensure you're in project root directory
- Verify `package.json` has workspace scripts
- Reinstall: `npm install` to refresh node_modules

## Advanced Usage

### Custom Workspace Scripts
Add project-specific workspace commands to `package.json`:

```json
{
  "scripts": {
    "workspace-deploy": "npm run workspace-sync && npm run deploy",
    "workspace-test": "npm run workspace-health && npm test",
    "workspace-reset": "npm run workspace-cleanup --force && npm run workspace-init"
  }
}
```

### Environment Variables
Set Cursor-specific environment variables:

```bash
# In your shell profile or .env file
export IDE_TYPE=cursor
export WORKSPACE_AUTO_SYNC=true
export WORKSPACE_LOG_LEVEL=info
```

### Integration with Cursor AI
When using Cursor's AI features, reference workspace context:

1. **Ask AI to check**: "Review the workspace context in `.workspace/context/sync-summary.md`"
2. **Include handoff context**: "Consider the recent handoff in `.workspace/handoffs/`"
3. **Reference quality reports**: "Check quality metrics in `.workspace/quality/`"

## Support

### Getting Help
- **Workspace status**: `npm run workspace-status` shows current state
- **Health diagnostics**: `npm run workspace-health --verbose` for detailed analysis
- **Log files**: Check `.workspace/logs/workspace.log` for activity history

### Team Coordination
- **Shared context**: All workspace data is git-trackable
- **Session visibility**: Team members can see active sessions
- **Handoff notifications**: Clear handoff documentation for smooth transitions

---

*This guide is specific to Cursor IDE. For other IDEs, see the respective documentation in `workspace-utils/docs/`.*