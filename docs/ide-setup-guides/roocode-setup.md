# Setting Up v0-UX/UI Architect in Roocode

This guide will help you set up and use the v0-UX/UI Architect persona in Roocode for efficient frontend development.

## Setup Instructions

### 1. Initial Setup

1. **Clone the BMAD-Method Repository**
   ```bash
   git clone https://github.com/bmadcode/BMAD-METHOD.git
   cd BMAD-METHOD
   ```

2. **Open in Roocode**
   - Launch Roocode
   - Open the cloned BMAD-METHOD folder
   - Navigate to `bmad-agent/personas/v0-ux-ui-architect.ide.md`

3. **Configure Roocode**
   - Ensure Roocode has access to your project files
   - Set up any necessary extensions or settings

### 2. Persona Activation

1. **Direct File Method**
   - Open `bmad-agent/personas/v0-ux-ui-architect.ide.md` in Roocode
   - Ask Roocode: "Embody this persona for my project"

2. **IDE Orchestrator Method**
   - Open `bmad-agent/ide-bmad-orchestrator.md`
   - Ask Roocode: "Activate the v0-UX/UI Architect persona"

### 3. Project Context Setup

For optimal results, provide the following context:

1. **Project Structure Overview**
   - Use Roocode's project exploration features
   - Or provide a brief description of your project structure

2. **Tech Stack Information**
   - Share your package.json or describe your tech stack
   - Highlight any specific libraries or frameworks you're using

## Advanced Configuration

### Roocode Visual Settings
Configure these settings for optimal visual development:
```json
{
  "roocode.visualFeedback": "enhanced",
  "roocode.componentPreview": "realtime",
  "roocode.designSystem": "auto-detect",
  "bmad.visualPersona": "v0-ux-ui-architect"
}
```

### Design System Integration
Create a `.roocode/design-config.json` file:
```json
{
  "designTokens": "./src/tokens/design-tokens.json",
  "componentLibrary": "./src/components",
  "personaPreferences": {
    "v0-ux-ui-architect": {
      "framework": "react",
      "styling": "tailwind",
      "accessibility": "wcag-aa"
    }
  }
}
```

## Usage Guide

### Basic Component Creation

1. **Simple Component Request**
   ```
   Create a responsive card component with:
   - Image
   - Title
   - Description
   - Action button
   ```

2. **Component with Variants**
   ```
   Create a button component with:
   - Primary, secondary, and tertiary variants
   - Different sizes (sm, md, lg)
   - Loading state
   - Disabled state
   ```

### Advanced Usage

1. **Design System Integration**
   ```
   Create a modal component that follows our existing design system.
   It should have a header, body, footer, and close button.
   ```

2. **Multi-Component Creation**
   ```
   Create a form with:
   - Text input
   - Dropdown select
   - Checkbox group
   - Submit button
   All components should be reusable and follow accessibility best practices.
   ```

3. **Rapid Prototyping**
   Roocode excels at rapid prototyping. Try:
   ```
   Create a dashboard layout with navigation, stats cards, and a data table.
   ```

### Roocode-Specific Tips

1. **Leverage Visual Feedback**
   - Roocode's visual feedback loop is excellent for iterative development
   - Try: "Create a component and show me how it would look with different data"

2. **Component Library Integration**
   - Roocode works well with component libraries
   - Example: "Create a form using our existing component library"

3. **Rapid Iteration**
   - Use Roocode's quick feedback cycle for rapid iteration
   - Try: "Let's iterate on this component to improve the mobile experience"

4. **Visual Design Focus**
   - Roocode can help with visual design aspects
   - Example: "Improve the visual hierarchy of this component"

## Performance Optimization

### Visual Rendering Performance
- Enable hardware acceleration for component previews
- Use Roocode's caching for faster iterations
- Configure optimal viewport settings for responsive design

### Design Workflow Enhancement
- Set up automated design token synchronization
- Use Roocode's visual diff features for component changes
- Enable real-time collaboration features

## Troubleshooting

### Common Issues

1. **Visual Rendering**
   - **Problem**: Components don't render as expected
   - **Solution**: Provide more specific visual requirements or references

2. **Component Library Compatibility**
   - **Problem**: Generated components don't match library patterns
   - **Solution**: Provide examples from your component library

3. **Iteration Confusion**
   - **Problem**: Iterations lose track of previous requirements
   - **Solution**: Summarize all requirements when requesting iterations

### Getting Help

If you encounter issues with the v0-UX/UI Architect persona in Roocode:

1. Check the [BMAD-Method documentation](https://github.com/bmadcode/BMAD-METHOD/docs)
2. Join the [BMAD-Method community](https://github.com/bmadcode/BMAD-METHOD/discussions)
3. Submit an issue on [GitHub](https://github.com/bmadcode/BMAD-METHOD/issues)
