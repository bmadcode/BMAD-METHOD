# Setting Up BMAD Method in JetBrains IDEs

This guide covers setup for JetBrains IDEs including IntelliJ IDEA, WebStorm, PyCharm, and others.

## Setup Instructions

### 1. Initial Setup

1. **Install AI Assistant Plugin**
   - Go to `File > Settings > Plugins`
   - Search for "AI Assistant" or "GitHub Copilot"
   - Install and restart IDE

2. **Clone BMAD-Method Repository**
   ```bash
   git clone https://github.com/bmadcode/BMAD-METHOD.git
   ```

3. **Configure Project Structure**
   - Open your project in JetBrains IDE
   - Add BMAD-METHOD as a module or reference

### 2. IDE Configuration

1. **Create Live Templates**
   - Go to `File > Settings > Editor > Live Templates`
   - Create new template group "BMAD"
   - Add templates for persona activation

2. **Configure File Templates**
   ```xml
   &lt;!-- .idea/fileTemplates/BMAD Persona Activation.md -->
   You are now embodying the ${PERSONA_NAME} persona from the BMAD Method.

   Persona file: bmad-agent/personas/${PERSONA_FILE}.md

   Project context: ${PROJECT_CONTEXT}
   Task: ${TASK_DESCRIPTION}
   ```

### 3. Persona Integration

1. **Using AI Assistant**
   - Open AI Assistant panel
   - Load persona content from BMAD files
   - Activate persona with context

2. **Custom Tool Windows**
   - Create custom tool window for BMAD personas
   - Pin frequently used personas
   - Quick access to persona documentation

## Usage Guide

### Basic Workflow

1. **Persona Activation**
   ```markdown
   # In AI Assistant
   Load the following BMAD persona:
   [Copy content from bmad-agent/personas/v0-ux-ui-architect.md]
   
   Embody this persona for my current project.
   ```

2. **Code Generation**
   - Use persona-specific prompts
   - Reference project structure
   - Apply persona methodologies

### Advanced Features

1. **Custom Actions**
   ```kotlin
   // Create custom action for persona switching
   class ActivateBMADPersonaAction : AnAction() {
       override fun actionPerformed(e: AnActionEvent) {
           // Implementation for persona activation
       }
   }
   ```

2. **Integration with Version Control**
   - Use JetBrains VCS integration
   - Create branches for BMAD-generated features
   - Track persona-driven development

## JetBrains-Specific Tips

### 1. Productivity Features
- **Code Completion**: Enhanced with persona context
- **Refactoring Tools**: Apply persona-recommended patterns
- **Debugging**: Use persona troubleshooting approaches

### 2. Plugin Development
- Create custom plugin for BMAD integration
- Automate persona switching
- Integrate with project templates

### 3. Team Collaboration
- Share BMAD configurations via VCS
- Use JetBrains Space for team coordination
- Standardize persona usage across team

## Troubleshooting

### Common Issues

1. **AI Assistant Not Available**
   - **Problem**: AI features not working
   - **Solution**: Check plugin installation and API configuration

2. **Performance Issues**
   - **Problem**: IDE running slowly with BMAD integration
   - **Solution**: Optimize memory settings and disable unused plugins

3. **File Access Issues**
   - **Problem**: Cannot access BMAD persona files
   - **Solution**: Check file permissions and project structure

## Best Practices

1. **Project Organization**
   - Use JetBrains project structure effectively
   - Organize BMAD personas in dedicated module
   - Maintain consistent naming conventions

2. **Code Quality**
   - Use built-in code inspections
   - Apply persona-recommended coding standards
   - Leverage JetBrains refactoring tools

3. **Team Workflow**
   - Share BMAD configurations via version control
   - Standardize persona usage across team
   - Use JetBrains collaboration features

## Getting Help

For JetBrains-specific BMAD Method issues:

1. Check [JetBrains documentation](https://www.jetbrains.com/help/)
2. Visit [BMAD-Method repository](https://github.com/bmadcode/BMAD-METHOD)
3. Join the community discussions
4. Submit issues with IDE-specific details

## Comprehensive IDE Setup Index

- **IntelliJ IDEA**: Detailed setup guide for IntelliJ IDEA
- **WebStorm**: Configuration steps for WebStorm
- **PyCharm**: Instructions for PyCharm integration
- **Other JetBrains IDEs**: General tips for other JetBrains IDEs

This index helps users quickly find the setup guide relevant to their JetBrains IDE.
