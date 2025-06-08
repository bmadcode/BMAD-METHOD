# Setting Up v0-UX/UI Architect in Claude Code

This guide will help you set up and use the v0-UX/UI Architect persona in Claude Code for efficient frontend development.

## Setup Instructions

### 1. Initial Setup

1. **Clone the BMAD-Method Repository**
   ```bash
   git clone https://github.com/bmadcode/BMAD-METHOD.git
   cd BMAD-METHOD
   ```

2. **Open in Claude Code**
   - Launch Claude Code
   - Open the cloned BMAD-METHOD folder
   - Navigate to `bmad-agent/personas/v0-ux-ui-architect.ide.md`

3. **Configure Claude Code**
   - Ensure Claude Code has access to your project files
   - Configure any necessary extensions or settings

### 2. Persona Activation

1. **Direct File Method**
   - Open `bmad-agent/personas/v0-ux-ui-architect.ide.md` in Claude Code
   - Ask Claude: "Embody this persona for my project"

2. **IDE Orchestrator Method**
   - Open `bmad-agent/ide-bmad-orchestrator.md`
   - Ask Claude: "Activate the v0-UX/UI Architect persona"

### 3. Project Context Setup

For optimal results, provide the following context:

1. **Project Structure Overview**
   - Use Claude Code's project exploration features
   - Or provide a brief description of your project structure

2. **Tech Stack Information**
   - Share your package.json or describe your tech stack
   - Highlight any specific libraries or frameworks you're using

## Advanced Configuration

### Claude Code Settings
Configure these settings for optimal BMAD integration:
```json
{
  "claude.contextWindow": "maximum",
  "claude.codeQuality": "high",
  "claude.autoSuggest": true,
  "bmad.personaPath": "./bmad-agent/personas/"
}
```

### Project Workspace Setup
Create a `.claude/workspace.json` file:
```json
{
  "personas": {
    "default": "v0-ux-ui-architect",
    "fallback": "dev",
    "autoSwitch": true
  },
  "codeGeneration": {
    "framework": "react",
    "styling": "tailwind",
    "testing": "jest"
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

3. **Code Quality Focus**
   Claude Code excels at code quality. Try:
   ```
   Create a data table component with sorting, filtering, and pagination.
   Ensure it follows best practices for performance and accessibility.
   ```

### Claude Code-Specific Tips

1. **Leverage Code Quality Features**
   - Claude Code excels at maintaining high code quality standards
   - Ask for specific optimizations: "Optimize this component for performance"

2. **Accessibility Focus**
   - Claude Code is excellent at implementing accessible components
   - Try: "Create a dropdown menu with full keyboard navigation and screen reader support"

3. **Documentation Excellence**
   - Ask for detailed documentation alongside implementation
   - Example: "Create a form component with comprehensive JSDoc comments"

4. **Best Practices Integration**
   - Claude Code can implement current best practices
   - Try: "Create a data fetching hook using the latest React best practices"

## Performance Optimization

### Code Quality Enhancement
- Enable real-time code analysis
- Use Claude Code's built-in linting integration
- Configure automated code formatting

### Best Practices for BMAD Integration
- Always specify the target persona at conversation start
- Use Claude Code's project understanding features
- Leverage code context for better persona responses

## Troubleshooting

### Common Issues

1. **Context Understanding**
   - **Problem**: Claude Code misunderstands project structure
   - **Solution**: Provide more explicit file paths and relationships

2. **Implementation Complexity**
   - **Problem**: Generated components are too complex
   - **Solution**: Ask for simpler implementations or step-by-step explanations

3. **Framework Specifics**
   - **Problem**: Implementation doesn't match framework patterns
   - **Solution**: Specify framework version and preferred patterns

### Getting Help

If you encounter issues with the v0-UX/UI Architect persona in Claude Code:

1. Check the [BMAD-Method documentation](https://github.com/bmadcode/BMAD-METHOD/docs)
2. Join the [BMAD-Method community](https://github.com/bmadcode/BMAD-METHOD/discussions)
3. Submit an issue on [GitHub](https://github.com/bmadcode/BMAD-METHOD/issues)
