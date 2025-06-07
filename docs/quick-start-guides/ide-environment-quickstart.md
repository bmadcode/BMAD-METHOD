# IDE Environment Quick Start Guide

## 5-Minute Setup for v0 UX/UI Architect in IDEs

### Prerequisites
- Cursor AI, Cline, Claude Code, or Roocode installed
- BMAD Method files copied to your project root
- Basic frontend project setup (React, Vue, etc.)

### Step 1: Prepare Your Project
\`\`\`bash
# Copy BMAD Method files to your project
cp -r /path/to/bmad-agent ./bmad-agent

# Ensure your project has the necessary dependencies
npm install # or yarn install
\`\`\`

### Step 2: Activate Victor in Your IDE

#### For Cursor AI:
1. Open the persona file: `bmad-agent/personas/v0-ux-ui-architect.ide.md`
2. In Cursor's chat: "Activate Victor, the v0 UX/UI Architect"
3. Provide your component requirements

#### For Cline:
1. Reference the persona file in chat
2. Type: "Embody the v0 UX/UI Architect persona from bmad-agent/personas/v0-ux-ui-architect.ide.md"
3. Specify your implementation needs

### Step 3: Request Component Implementation
\`\`\`
Victor, I need you to implement a responsive product card component using React and Tailwind CSS.

Requirements:
- Product image with hover effects
- Product title and description
- Price display with discount handling
- Add to cart button
- Responsive design (mobile-first)
- Accessibility features
- TypeScript interfaces

Please create all necessary files and update imports.
\`\`\`

### Step 4: Review Generated Files
Victor will create:
- Component file (e.g., `ProductCard.tsx`)
- Styling (if using CSS modules)
- Type definitions
- Usage examples
- Test file (if testing framework detected)

### Step 5: Test and Iterate
\`\`\`
The component looks great! Can you add a wishlist button and make the image lazy-loaded?
\`\`\`

## IDE-Specific Workflows

### Cursor AI Workflow
\`\`\`
Victor, analyze my existing component structure and create a new SearchBar component 
that follows the same patterns. It should integrate with our existing design system.
\`\`\`

### Cline Workflow
\`\`\`
I need you to refactor this existing component to use our new design tokens. 
Also add proper error handling and loading states.
\`\`\`

### Claude Code Workflow
\`\`\`
Create a comprehensive form component with validation, error handling, 
and accessibility features. Follow our coding standards and include tests.
\`\`\`

### Roocode Workflow
\`\`\`
Let's rapidly prototype a dashboard layout with multiple widget types. 
Create the basic structure and we'll iterate on the details.
\`\`\`

## Best Practices for IDE Usage

### Project Context
- Ensure Victor can see your package.json
- Reference existing components for consistency
- Mention your coding standards and conventions

### Incremental Development
- Start with basic functionality
- Add features incrementally
- Test each iteration before proceeding

### Integration Focus
- Ask Victor to update imports/exports
- Request integration with existing routing
- Ensure compatibility with your build process

## Troubleshooting

### "Victor doesn't understand my project structure"
\`\`\`
Victor, please analyze my project structure first. Look at the existing components 
in src/components/ and follow the same patterns for file organization and naming.
\`\`\`

### "Generated code doesn't match our standards"
\`\`\`
Please review our ESLint configuration and coding standards in .eslintrc.js 
and ensure the generated code follows these rules.
\`\`\`

### "Components don't integrate properly"
\`\`\`
Check the existing component imports in src/components/index.ts and update 
the exports to include the new component.
