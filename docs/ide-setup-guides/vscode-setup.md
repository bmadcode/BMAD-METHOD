# Setting Up BMAD Method in Visual Studio Code

This guide will help you set up and use BMAD Method personas in Visual Studio Code for efficient development workflows.

## Setup Instructions

### 1. Initial Setup

1. **Install Required Extensions**
   ```bash
   # Install GitHub Copilot (recommended)
   code --install-extension GitHub.copilot
   
   # Install useful extensions for BMAD workflow
   code --install-extension ms-vscode.vscode-json
   code --install-extension bradlc.vscode-tailwindcss
   code --install-extension esbenp.prettier-vscode
   ```

2. **Clone the BMAD-Method Repository**
   ```bash
   git clone https://github.com/bmadcode/BMAD-METHOD.git
   cd BMAD-METHOD
   code .
   ```

3. **Configure VS Code Workspace**
   - Create `.vscode/settings.json` in your project root
   - Configure workspace-specific settings for BMAD integration

### 2. Workspace Configuration

Create a `.vscode/settings.json` file:
```json
{
  "bmad.personaPath": "./bmad-agent/personas/",
  "bmad.defaultPersona": "v0-ux-ui-architect",
  "bmad.autoActivate": true,
  "files.associations": {
    "*.md": "markdown"
  },
  "markdown.preview.breaks": true,
  "editor.wordWrap": "on"
}
```

Create a `.vscode/tasks.json` file:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Activate BMAD Persona",
      "type": "shell",
      "command": "echo",
      "args": ["Activating BMAD persona..."],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared"
      }
    }
  ]
}
```

### 3. Persona Integration

Since VS Code doesn't have built-in AI chat, you'll need to use external AI tools:

1. **GitHub Copilot Integration**
   - Use Copilot Chat to interact with BMAD personas
   - Copy persona content into chat context
   - Reference persona files when asking for assistance

2. **External AI Tool Integration**
   - Use VS Code as your editor
   - Copy persona content to external AI tools (ChatGPT, Claude, etc.)
   - Implement generated code back in VS Code

### 4. Workflow Setup

1. **File Organization**
   ```
   your-project/
   â”œâ”€â”€ .vscode/
   â”‚   â”œâ”€â”€ settings.json
   â”‚   â””â”€â”€ tasks.json
   â”œâ”€â”€ BMAD-METHOD/
   â”‚   â””â”€â”€ bmad-agent/personas/
   â””â”€â”€ src/
   ```

2. **Persona Activation Workflow**
   - Open the desired persona file from `bmad-agent/personas/`
   - Copy the persona content
   - Use with your preferred AI tool (Copilot Chat, external AI)
   - Implement solutions back in VS Code

## Usage Guide

### Basic Workflow

1. **Project Setup**
   ```bash
   # Open your project in VS Code
   code your-project
   
   # Open BMAD personas in a separate window
   code BMAD-METHOD/bmad-agent/personas/
   ```

2. **Persona Activation**
   - Open the desired persona file (e.g., `v0-ux-ui-architect.md`)
   - Copy the persona content
   - Paste into GitHub Copilot Chat or external AI tool
   - Add: "Embody this persona for my project"

### Advanced Usage

1. **Multi-Persona Workflow**
   - Keep multiple persona files open in tabs
   - Switch between personas based on task type
   - Use VS Code's split view for persona reference

2. **Code Generation Workflow**
   - Reference persona capabilities when requesting code
   - Use VS Code's integrated terminal for running generated commands
   - Leverage VS Code's Git integration for version control

## VS Code-Specific Tips

### 1. Leverage Built-in Features
- **Integrated Terminal**: Run BMAD-generated commands directly
- **Git Integration**: Version control for BMAD-generated code
- **Extensions Marketplace**: Install relevant extensions for your tech stack

### 2. Workspace Management
- **Multi-root Workspaces**: Keep BMAD-METHOD and your project in same workspace
- **Settings Sync**: Sync BMAD configurations across devices
- **Snippets**: Create code snippets for common BMAD patterns

### 3. Productivity Enhancements
- **Command Palette**: Quick access to BMAD-related tasks
- **Keyboard Shortcuts**: Set up shortcuts for persona switching
- **File Explorer**: Pin frequently used persona files

## Troubleshooting

### Common Issues

1. **Persona Files Not Found**
   - **Problem**: Can't locate BMAD persona files
   - **Solution**: Ensure BMAD-METHOD is cloned and path is correct in settings

2. **No AI Integration**
   - **Problem**: VS Code doesn't have built-in AI chat
   - **Solution**: Use GitHub Copilot or external AI tools with copy-paste workflow

3. **Workspace Configuration Issues**
   - **Problem**: Settings not applying correctly
   - **Solution**: Check `.vscode/settings.json` syntax and restart VS Code

### Performance Optimization

1. **File Watching**
   - Exclude large directories from file watching
   - Configure `.vscode/settings.json` to ignore unnecessary files

2. **Extension Management**
   - Only install necessary extensions
   - Disable unused extensions for better performance

## Integration with External AI Tools

### GitHub Copilot
```markdown
# In Copilot Chat
I'm using the BMAD Method. Please embody this persona:

[Paste persona content here]

Now help me with: [your request]
```

### ChatGPT/Claude
```markdown
# Copy this template
You are now embodying a BMAD Method persona:

[Paste persona content]

Project context: [describe your project]
Task: [describe what you need help with]
```

## Best Practices

1. **File Organization**
   - Keep BMAD personas easily accessible
   - Use VS Code workspaces for project organization
   - Maintain consistent folder structure

2. **Workflow Efficiency**
   - Create templates for common persona activation
   - Use VS Code snippets for repetitive tasks
   - Leverage keyboard shortcuts for faster workflow

3. **Code Quality**
   - Use VS Code's built-in linting and formatting
   - Integrate with your preferred code quality tools
   - Follow BMAD persona recommendations for code standards

## Getting Help

If you encounter issues with BMAD Method in VS Code:

1. Check the [BMAD-Method documentation](https://github.com/bmadcode/BMAD-METHOD/docs)
2. Join the [BMAD-Method community](https://github.com/bmadcode/BMAD-METHOD/discussions)
3. Submit an issue on [GitHub](https://github.com/bmadcode/BMAD-METHOD/issues)
4. Check VS Code's [official documentation](https://code.visualstudio.com/docs)
