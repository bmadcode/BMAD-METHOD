# Setting Up v0-UX/UI Architect in Cursor AI

This guide will help you set up and use the v0-UX/UI Architect persona in Cursor AI for efficient frontend development.

## Setup Instructions

### 1. Initial Setup

1. **Clone the BMAD-Method Repository**
   \`\`\`bash
   git clone https://github.com/bmadcode/BMAD-METHOD.git
   cd BMAD-METHOD
   \`\`\`

2. **Open in Cursor AI**
   - Launch Cursor AI
   - Open the cloned BMAD-METHOD folder
   - Navigate to `bmad-agent/personas/v0-ux-ui-architect.ide.md`

3. **Configure Cursor AI**
   - Open Cursor AI settings
   - Under AI settings, ensure "File System Access" is enabled
   - Set context window to maximum available size

### 2. Persona Activation

1. **Direct File Method**
   - Open `bmad-agent/personas/v0-ux-ui-architect.ide.md` in Cursor
   - Use the "Ask AI about this file" feature
   - Type: "Embody this persona for my project"

2. **IDE Orchestrator Method**
   - Open `bmad-agent/ide-bmad-orchestrator.md`
   - Use the "Ask AI about this file" feature
   - Type: "Activate the v0-UX/UI Architect persona"

### 3. Project Context Setup

For optimal results, provide the following context:

1. **Project Structure Overview**
   \`\`\`
   /src
     /components
     /styles
     /pages
   package.json
   \`\`\`

2. **Tech Stack Information**
   - Frontend framework (React, Vue, etc.)
   - Styling approach (Tailwind, CSS-in-JS, etc.)
   - State management solution
   - Testing framework

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

3. **Component Refactoring**
   \`\`\`
   Refactor this existing component to use Tailwind CSS and improve performance:
   [paste component code]
   \`\`\`

### Cursor-Specific Tips

1. **Use Split View**
   - Keep the persona file open in one panel
   - Work on your components in another panel

2. **Leverage File Creation**
   - Ask the persona to create multiple files at once
   - Example: "Create a Button component with its test file and story"

3. **Context Refreshing**
   - If the persona seems to lose context, type "Refresh project context"
   - This will prompt it to re-analyze your project structure

4. **Command Palette Integration**
   - Use Cursor's command palette to quickly invoke the persona
   - Create custom commands for common requests

## Troubleshooting

### Common Issues

1. **Limited Context Understanding**
   - **Problem**: Persona doesn't understand your project structure
   - **Solution**: Provide a brief overview of key directories and files

2. **Incomplete Implementation**
   - **Problem**: Generated components are missing features
   - **Solution**: Be more specific in your requirements and provide examples

3. **Style Inconsistencies**
   - **Problem**: Generated components don't match your design system
   - **Solution**: Point to existing components as reference or provide design tokens

### Getting Help

If you encounter issues with the v0-UX/UI Architect persona in Cursor AI:

1. Check the [BMAD-Method documentation](https://github.com/bmadcode/BMAD-METHOD/docs)
2. Join the [BMAD-Method community](https://github.com/bmadcode/BMAD-METHOD/discussions)
3. Submit an issue on [GitHub](https://github.com/bmadcode/BMAD-METHOD/issues)
