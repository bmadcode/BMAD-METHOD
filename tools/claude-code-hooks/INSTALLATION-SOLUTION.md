# Claude Code Hooks Installation Solution

## Problem
Users who download BMAD-Method need a way to install Claude Code hooks that:
1. Works regardless of where they install BMAD
2. Doesn't require global installation paths
3. Integrates seamlessly with existing BMAD projects

## Solution
The installer now copies hook files directly into the project's `.bmad-core` directory and configures project-level Claude Code settings.

### How It Works

1. **Hook files are copied to the project**
   - Source: `BMAD-METHOD-main/tools/claude-code-hooks/`
   - Target: `<project>/.bmad-core/hooks/claude-code/`
   - Includes all hook files and the lib directory

2. **Project-level settings are created**
   - Creates/updates `<project>/.claude/settings.json`
   - Uses relative paths from project root
   - Preserves existing non-BMAD settings

3. **Installation command**
   ```bash
   # From BMAD source directory
   cd /path/to/BMAD-METHOD-main
   npm run install:claude-hooks -- --project-dir /path/to/your/project
   ```

### Benefits
- **Portable**: Hook files travel with the project
- **No global paths**: Everything is relative to the project
- **Version control friendly**: Hooks can be committed with the project
- **Multiple projects**: Each project has its own hook configuration
- **Easy updates**: Just re-run the installer to update hooks

### For End Users
When BMAD-Method is merged upstream:
1. Clone/download BMAD-Method
2. Install BMAD in their project normally
3. Run the Claude Code hooks installer pointing to their project
4. **Important**: If VS Code is already open, close and restart it
5. Start using Claude Code with automatic BMAD integration

### Activation Methods
After installation, the hooks will activate automatically when using Claude Code:

**Method 1: Open VS Code First (GUI)**
1. Open VS Code normally
2. Open your project folder (File → Open Folder)
3. Use Claude Code - hooks are automatically active

**Method 2: Terminal Launch**
1. Navigate to your project: `cd /path/to/your/project`
2. Launch: `claude code .`
3. Hooks are automatically active

**Note**: Both methods work equally well. The key is that Claude Code loads `.claude/settings.json` from your project root, regardless of how you launch it.

### Restart Requirement
⚠️ **If VS Code was already open during installation**:
- You MUST close and restart VS Code
- Claude Code loads settings on initialization
- Changes to `.claude/settings.json` require a restart to take effect

### Future Enhancement (PR8)
In PR8, we'll integrate this directly into the main BMAD installer menu, so users can select "Install Claude Code Hooks" as an option during normal installation.