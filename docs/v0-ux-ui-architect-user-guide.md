# v0 UX/UI Architect User Guide

## Overview

The v0 UX/UI Architect is a specialized persona in the BMAD Method designed to bring rapid visual design generation and component implementation capabilities to your development workflow. This persona embodies the power of modern AI-driven design tools like v0, enabling you to transform simple prompts into stunning, functional frontend implementations.

## Available Personas

### Veronica (Web-based)
- **Environment**: Web-based AI platforms (ChatGPT, Gemini, Claude)
- **Strengths**: Design planning, specification creation, visual concept generation
- **Best for**: Initial design exploration, creating comprehensive specifications, generating design documentation

### Victor (IDE-based)
- **Environment**: IDE environments (Cursor AI, Cline, Claude Code, Roocode)
- **Strengths**: Direct code implementation, real-time development, file system integration
- **Best for**: Component implementation, rapid prototyping, iterative development

## When to Use the v0 UX/UI Architect

### Perfect Use Cases:
- **Rapid Prototyping**: Need to quickly visualize a concept or feature
- **Component Creation**: Building reusable UI components for your design system
- **Design System Development**: Creating consistent, scalable component libraries
- **Frontend Implementation**: Converting designs into production-ready code
- **Visual Exploration**: Exploring different design directions for a feature

### Integration Points in BMAD Workflow:
1. **After Analyst Phase**: Transform project briefs into visual concepts
2. **During PM Phase**: Create UI mockups to support PRD development
3. **Parallel to Architecture**: Ensure design feasibility with technical constraints
4. **Before Development**: Provide ready-to-implement component specifications

## Web Environment Usage (Veronica)

### Activation Commands:
- "I need Veronica to help with UI design"
- "Activate the v0 UX/UI Architect"
- "I want to create some frontend components"

### Sample Prompts:
```
"Veronica, I need you to create a modern dashboard component for a SaaS application. 
It should include a sidebar navigation, main content area, and header with user profile."

"Can you help me design a product card component for an e-commerce site? 
It needs to show product image, title, price, and add to cart button."

"I need a complete design system for a fintech application. 
Can you create the core components with consistent styling?"
```

### Expected Outputs:
- Detailed component specifications
- Visual design descriptions
- Implementation guidelines
- Accessibility considerations
- Integration instructions

## IDE Environment Usage (Victor)

### Setup Requirements:
1. Copy the `bmad-agent` folder to your project root
2. Ensure your IDE can access the persona file: `bmad-agent/personas/v0-ux-ui-architect.ide.md`
3. Have your preferred frontend framework and styling system ready

### Activation in IDEs:

#### Cursor AI:
1. Open the persona file in Cursor
2. Use Cursor's chat feature: "Activate Victor, the v0 UX/UI Architect"
3. Provide your component requirements

#### Cline (Claude Dev):
1. Reference the persona file in your chat
2. Ask Cline to embody the v0 UX/UI Architect persona
3. Specify your implementation needs

#### Claude Code:
1. Load the persona file as context
2. Request the v0 UX/UI Architect capabilities
3. Provide detailed component specifications

#### Roocode:
1. Import the persona configuration
2. Activate the v0 UX/UI Architect mode
3. Begin rapid prototyping workflow

### Sample IDE Prompts:
```
"Victor, I need you to implement a responsive navigation component using React and Tailwind CSS. 
It should work on mobile and desktop with a hamburger menu for mobile."

"Can you create a data table component with sorting, filtering, and pagination? 
Use TypeScript and make it reusable across the application."

"I need a complete login form with validation, error handling, and accessibility features. 
Implement it using our existing design system tokens."
```

### Expected Outputs:
- Complete component files (JSX/TSX, CSS, tests)
- Updated imports and exports
- Integration with existing codebase
- Documentation and usage examples

## Best Practices

### Effective Prompting:
1. **Be Specific**: Include details about functionality, styling, and technical requirements
2. **Provide Context**: Mention your tech stack, design system, and any constraints
3. **Include Examples**: Reference existing designs or components you like
4. **Specify Scope**: Clarify if you want just the design, just the code, or both

### Quality Assurance:
- Always run the v0 Component Quality Checklist after component creation
- Test components in multiple browsers and devices
- Validate accessibility with screen readers and keyboard navigation
- Ensure components integrate properly with your existing design system

### Workflow Integration:
1. **Start with Requirements**: Use output from Analyst or PM phases
2. **Create Specifications**: Generate detailed component specs with Veronica
3. **Implement Components**: Use Victor for direct code implementation
4. **Quality Check**: Run through the component quality checklist
5. **Document**: Create usage examples and integration guides

## Troubleshooting

### Common Issues:

**"The persona doesn't understand my tech stack"**
- Solution: Provide more specific technical context in your prompts
- Include package.json dependencies or framework versions

**"Generated components don't match our design system"**
- Solution: Provide design system documentation or existing component examples
- Reference your design tokens, color palette, and typography scale

**"Code doesn't work in my environment"**
- Solution: Specify your exact setup (React version, CSS framework, build tools)
- Ask for environment-specific implementation

**"Components aren't accessible"**
- Solution: Explicitly request accessibility features in your prompts
- Run the accessibility checklist and ask for improvements

### Getting Help:
- Reference the component quality checklist for systematic troubleshooting
- Use the BMAD Method's other personas (Architect, PM) for additional context
- Check the example projects for reference implementations

## Advanced Usage

### Design System Creation:
1. Start with core tokens (colors, typography, spacing)
2. Create atomic components (buttons, inputs, labels)
3. Build molecular components (forms, cards, navigation)
4. Develop organism-level components (headers, sidebars, layouts)
5. Document everything with usage examples

### Cross-Environment Workflow:
1. **Planning Phase**: Use Veronica in web environment for initial design exploration
2. **Specification Phase**: Create detailed component specs and documentation
3. **Implementation Phase**: Switch to Victor in IDE for direct code implementation
4. **Iteration Phase**: Use IDE environment for rapid refinement and testing

### Integration with Other BMAD Personas:
- **With Analyst**: Transform project briefs into visual concepts
- **With PM**: Create UI mockups to support feature requirements
- **With Architect**: Ensure technical feasibility of design decisions
- **With PO**: Validate component specifications against user stories

This comprehensive approach ensures that the v0 UX/UI Architect becomes a powerful tool in your development workflow, capable of handling everything from initial design exploration to final implementation across multiple environments.
