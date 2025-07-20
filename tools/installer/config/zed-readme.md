# BMad Method - Zed Integration

This document explains how to use BMad Method agents within Zed, the fast and modern code editor.

## Installation

1. **Install BMad Method in your project:**
   ```bash
   npx bmad-method install
   ```

2. **Select Zed as your IDE** when prompted during installation.

3. **The installer will create:**
   - `.zed/assistants/` - Directory containing all BMad agent assistants
   - `.zed/bmad-config.json` - Configuration file for Zed integration
   - Numbered assistant files (e.g., `01-bmad-master.md`, `02-pm.md`)

## Usage

### Activating Agents

1. **Open Zed AI Assistant Panel:**
   - **Mac:** `Cmd+I`
   - **Windows/Linux:** `Ctrl+I`

2. **Activate an agent by typing:**
   ```
   @agent-name
   ```

### Available Agents

| Agent | Command | Description |
|-------|---------|-------------|
| BMad Master | `@bmad-master` | Master agent that can perform any task |
| Product Manager | `@pm` | Product requirements and planning |
| Analyst | `@analyst` | Market research and analysis |
| Architect | `@architect` | System architecture and design |
| Product Owner | `@po` | Story management and prioritization |
| Scrum Master | `@sm` | Process management and story creation |
| Developer | `@dev` | Code implementation and development |
| QA Engineer | `@qa` | Testing and quality assurance |
| UX Expert | `@ux-expert` | User experience and interface design |

### Example Interactions

```
@dev Create a React component for user authentication
@pm Review the current sprint progress
@architect Design the database schema for the user system
@qa Review the authentication component and suggest tests
```

## Features

### Project Context Awareness
- Agents understand your project structure
- Access to `.bmad-core/` documentation and templates
- Knowledge of project conventions and standards

### File System Integration
- Full access to read and modify project files
- Can create new files and update existing ones
- Follows project file organization patterns

### Template System
- Access to BMad document templates
- Can generate PRDs, architecture docs, user stories
- Maintains consistency with BMad methodology

### Task Execution
- Can execute specific BMad tasks
- Access to quality assurance checklists
- Follows BMad workflows and processes

## Configuration

The integration creates several configuration files:

### `.zed/assistants/`
Contains individual assistant files for each BMad agent, numbered for ordering.

### `.zed/bmad-config.json`
Configuration file that describes the BMad integration and available features.

## Troubleshooting

### Agents Not Appearing
- Ensure you ran `npx bmad-method install` and selected Zed
- Check that `.zed/assistants/` directory exists
- Restart Zed after installation

### Agent Not Responding
- Verify you're using the correct `@agent-name` syntax
- Check that the agent file exists in `.zed/assistants/`
- Try refreshing the AI assistant panel

### File Access Issues
- Ensure Zed has permission to access your project directory
- Check that the agent has the necessary file permissions
- Verify project structure matches BMad expectations

## Advanced Usage

### Custom Agent Ordering
You can modify the agent ordering by editing the configuration in:
- `tools/installer/config/ide-agent-config.yaml` (before installation)
- `.zed/assistants/` file numbering (after installation)

### Expansion Packs
If you have BMad expansion packs installed, their agents will also be available:
- Game development agents (if game dev expansion is installed)
- Infrastructure agents (if infrastructure expansion is installed)
- Other domain-specific agents

### Project-Specific Customization
- Agents automatically load project-specific documentation
- They adapt to your project's coding standards and conventions
- Can reference project-specific templates and checklists

## Support

For issues with Zed integration:
1. Check the BMad documentation: `bmad-core/user-guide.md`
2. Review the installation logs for any errors
3. Ensure you're using a compatible version of Zed
4. Join the BMad community for help and support

---

**Note:** This integration is designed to work with Zed's AI assistant system. Make sure you have the latest version of Zed installed for the best experience. 