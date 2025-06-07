# Setting Up v0-UX/UI Architect in Cline (Claude Dev)

This guide will help you set up and use the v0-UX/UI Architect persona in Cline for efficient frontend development.

## Setup Instructions

### 1. Initial Setup

1. **Clone the BMAD-Method Repository**
   \`\`\`bash
   git clone https://github.com/bmadcode/BMAD-METHOD.git
   cd BMAD-METHOD
   \`\`\`

2. **Open in Cline**
   - Launch Cline
   - Open the cloned BMAD-METHOD folder
   - Navigate to `bmad-agent/personas/v0-ux-ui-architect.ide.md`

3. **Configure Cline**
   - Ensure Cline has access to your project files
   - Set up any necessary API keys or authentication

### 2. Persona Activation

1. **Direct File Method**
   - Open `bmad-agent/personas/v0-ux-ui-architect.ide.md` in Cline
   - Ask Cline: "Embody this persona for my project"

2. **IDE Orchestrator Method**
   - Open `bmad-agent/ide-bmad-orchestrator.md`
   - Ask Cline: "Activate the v0-UX/UI Architect persona"

### 3. Project Context Setup

For optimal results, provide the following context:

1. **Project Structure Overview**
   - Use Cline's project exploration features to analyze your codebase
   - Or provide a brief description of your project structure

2. **Tech Stack Information**
   - Share your package.json or describe your tech stack
   - Highlight any specific libraries or frameworks you're using

## Usage Guide

### Basic Component Creation

1. **Simple Component Request**
   \`\`\`
   Create a responsive card component with:
   - Image
   - Title
   - Description
   - Action button
   \`\`\`

2. **Component with Variants**
   \`\`\`
   Create a button component with:
   - Primary, secondary, and tertiary variants
   - Different sizes (sm, md, lg)
   - Loading state
   - Disabled state
   \`\`\`

### Advanced Usage

1. **Design System Integration**
   \`\`\`
   Create a modal component that follows our existing design system.
   It should have a header, body, footer, and close button.
   \`\`\`

2. **Multi-Component Creation**
   \`\`\`
   Create a form with:
   - Text input
   - Dropdown select
   - Checkbox group
   - Submit button
   All components should be reusable and follow accessibility best practices.
   \`\`\`

3. **Terminal Integration**
   Cline excels at terminal integration. Try:
   \`\`\`
   Help me set up a new component library with Storybook integration.
   \`\`\`

### Cline-Specific Tips

1. **Leverage Terminal Integration**
   - Cline can help install dependencies and run commands
   - Example: "Install and configure Tailwind CSS for this project"

2. **Project-Wide Refactoring**
   - Cline is excellent at understanding project context
   - Try: "Refactor all our button components to use the new design system"

3. **Documentation Generation**
   - Ask for documentation alongside implementation
   - Example: "Create a dropdown component and generate Storybook documentation"

4. **Testing Integration**
   - Cline can create tests alongside components
   - Try: "Create a modal component with Jest tests"

## Troubleshooting

### Common Issues

1. **Context Limitations**
   - **Problem**: Cline loses track of project context
   - **Solution**: Remind it of the current file structure or reopen key files

2. **Dependency Management**
   - **Problem**: Suggested packages aren't installed
   - **Solution**: Ask Cline to generate the install commands for you

3. **File Creation Permissions**
   - **Problem**: Cline can't create new files
   - **Solution**: Check your IDE permissions and settings

### Getting Help

If you encounter issues with the v0-UX/UI Architect persona in Cline:

1. Check the [BMAD-Method documentation](https://github.com/bmadcode/BMAD-METHOD/docs)
2. Join the [BMAD-Method community](https://github.com/bmadcode/BMAD-METHOD/discussions)
3. Submit an issue on [GitHub](https://github.com/bmadcode/BMAD-METHOD/issues)
