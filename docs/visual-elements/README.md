# BMAD Method Visual Documentation Elements

This section provides visual elements, style guides, and interactive components to enhance the BMAD Method documentation experience.

## Overview

Visual documentation elements improve comprehension, reduce cognitive load, and create a consistent experience across all BMAD Method materials. This section includes:

- Visual style guide and standards
- Interactive diagrams and components
- Screenshot libraries and examples
- Accessibility guidelines
- Brand consistency elements

## Visual Documentation Standards

### Color Palette

Our documentation uses a consistent color scheme that enhances readability and provides semantic meaning:

```css
/* Primary Colors */
--bmad-primary: #2563eb;      /* Blue - Primary actions and links */
--bmad-secondary: #7c3aed;    /* Purple - Secondary elements */
--bmad-accent: #059669;       /* Green - Success states */

/* Semantic Colors */
--bmad-success: #10b981;      /* Green - Positive outcomes */
--bmad-warning: #f59e0b;      /* Amber - Caution states */
--bmad-error: #ef4444;        /* Red - Error states */
--bmad-info: #3b82f6;         /* Blue - Information */

/* Neutral Colors */
--bmad-gray-50: #f9fafb;      /* Light backgrounds */
--bmad-gray-100: #f3f4f6;     /* Card backgrounds */
--bmad-gray-500: #6b7280;     /* Secondary text */
--bmad-gray-900: #111827;     /* Primary text */
```

### Typography Scale

```css
/* Heading Hierarchy */
h1 { font-size: 2.25rem; font-weight: 700; }  /* 36px - Page titles */
h2 { font-size: 1.875rem; font-weight: 600; } /* 30px - Section headers */
h3 { font-size: 1.5rem; font-weight: 600; }   /* 24px - Subsections */
h4 { font-size: 1.25rem; font-weight: 500; }  /* 20px - Components */
h5 { font-size: 1.125rem; font-weight: 500; } /* 18px - Sub-components */

/* Body Text */
body { font-size: 1rem; line-height: 1.6; }   /* 16px - Base text */
small { font-size: 0.875rem; }                /* 14px - Captions */
```

### Spacing System

```css
/* Consistent spacing scale */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Interactive Components

### Persona Selector Component

\```html
<div class="persona-selector">
  <h3>Select Your Persona</h3>
  <div class="persona-grid">
    <div class="persona-card" data-persona="pm">
      <div class="persona-icon">ðŸ‘”</div>
      <h4>Project Manager</h4>
      <p>Coordinate projects and manage resources</p>
    </div>
    <div class="persona-card" data-persona="architect">
      <div class="persona-icon">ðŸ—ï¸</div>
      <h4>System Architect</h4>
      <p>Design technical architecture and solutions</p>
    </div>
    <div class="persona-card" data-persona="ux-ui">
      <div class="persona-icon">ðŸŽ¨</div>
      <h4>UX/UI Designer</h4>
      <p>Create user experiences and interfaces</p>
    </div>
    <div class="persona-card" data-persona="developer">
      <div class="persona-icon">ðŸ’»</div>
      <h4>Developer</h4>
      <p>Implement features and technical solutions</p>
    </div>
  </div>
</div>
\```

### Progress Indicator Component

\```html
<div class="progress-indicator">
  <div class="progress-step completed">
    <div class="step-number">1</div>
    <div class="step-label">Requirements</div>
  </div>
  <div class="progress-connector completed"></div>
  <div class="progress-step completed">
    <div class="step-number">2</div>
    <div class="step-label">Architecture</div>
  </div>
  <div class="progress-connector active"></div>
  <div class="progress-step active">
    <div class="step-number">3</div>
    <div class="step-label">Design</div>
  </div>
  <div class="progress-connector"></div>
  <div class="progress-step">
    <div class="step-number">4</div>
    <div class="step-label">Implementation</div>
  </div>
</div>
\```

### Expandable Code Example Component

\```html
<div class="code-example">
  <div class="code-header">
    <span class="code-title">BMAD Persona Configuration</span>
    <button class="expand-toggle">Expand</button>
  </div>
  <div class="code-content">
    <pre><code class="language-yaml">
personas:
  pm:
    name: "Project Manager"
    expertise: ["planning", "coordination", "stakeholder-management"]
    templates: ["prd", "project-plan", "status-report"]
  architect:
    name: "System Architect"
    expertise: ["system-design", "technology-selection", "integration"]
    templates: ["architecture-doc", "technical-spec", "integration-plan"]
    </code></pre>
  </div>
</div>
\```

## Visual Diagram Standards

### Mermaid Diagram Styling

\```css
/* Custom Mermaid theme for BMAD documentation */
.mermaid {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Node styling */
.node rect {
  fill: var(--bmad-primary);
  stroke: var(--bmad-primary);
  stroke-width: 2px;
}

.node .label {
  color: white;
  font-weight: 500;
}

/* Decision nodes */
.node.decision rect {
  fill: var(--bmad-warning);
  stroke: var(--bmad-warning);
}

/* Success nodes */
.node.success rect {
  fill: var(--bmad-success);
  stroke: var(--bmad-success);
}

/* Edge styling */
.edgePath .path {
  stroke: var(--bmad-gray-500);
  stroke-width: 2px;
}

.edgeLabel {
  background-color: white;
  border: 1px solid var(--bmad-gray-300);
  border-radius: 4px;
  padding: 4px 8px;
}
\```

### Icon System

We use a consistent icon system throughout the documentation:

- ðŸŽ­ **Orchestrator**: Central coordination
- ðŸ‘” **Project Manager**: Planning and coordination
- ðŸ—ï¸ **Architect**: Technical design
- ðŸŽ¨ **UX/UI Designer**: User experience
- ðŸ’» **Developer**: Implementation
- ðŸ“Š **Analyst**: Data and requirements
- **Completed**: Finished tasks
- ðŸ”„ **In Progress**: Active work
- â³ **Pending**: Waiting to start
- â­ **Decision Point**: Key choices
- ðŸ”´ **Pain Point**: Challenges
- ðŸ’¡ **Solution**: Problem resolution

## Screenshot Standards

### Consistent Screenshot Styling

All screenshots should follow these guidelines:

1. **Resolution**: Minimum 1920x1080 for desktop, 375x812 for mobile
2. **Browser**: Use Chrome with clean profile (no extensions visible)
3. **Zoom Level**: 100% browser zoom
4. **Annotations**: Use consistent callout styling
5. **File Format**: PNG for UI screenshots, JPG for photos
6. **Naming Convention**: `section-subsection-description.png`

### Annotation Guidelines

\```html
<div class="screenshot-container">
  <img src="/images/bmad-setup-example.png" alt="BMAD Method setup interface" />
  <div class="screenshot-annotations">
    <div class="callout" data-position="top-left">
      <div class="callout-number">1</div>
      <div class="callout-text">Select your environment</div>
    </div>
    <div class="callout" data-position="center-right">
      <div class="callout-number">2</div>
      <div class="callout-text">Configure persona settings</div>
    </div>
  </div>
</div>
\```

## Accessibility Standards

### Color Contrast Requirements

All text must meet WCAG AA standards:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18pt+): 3:1 contrast ratio minimum
- Interactive elements: 3:1 contrast ratio for focus states

### Alternative Text Guidelines

\```html
<!-- Good: Descriptive alt text -->
<img src="workflow-diagram.png" alt="BMAD workflow showing progression from requirements through architecture, design, and implementation phases" />

<!-- Bad: Generic alt text -->
<img src="workflow-diagram.png" alt="Diagram" />

<!-- Decorative images -->
<img src="decorative-pattern.png" alt="" role="presentation" />
\```

### Keyboard Navigation

All interactive elements must be keyboard accessible:
- Tab order follows logical reading sequence
- Focus indicators are clearly visible
- All functionality available via keyboard
- Skip links provided for long content

## Responsive Design Guidelines

### Breakpoint System

\```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
\```

### Mobile Optimization

- Touch targets minimum 44px
- Readable text without zooming
- Horizontal scrolling avoided
- Content reflows appropriately

## Implementation Guidelines

### CSS Custom Properties

\```css
:root {
  /* Brand colors */
  --bmad-brand-primary: #2563eb;
  --bmad-brand-secondary: #7c3aed;
  
  /* Semantic colors */
  --bmad-success: #10b981;
  --bmad-warning: #f59e0b;
  --bmad-error: #ef4444;
  --bmad-info: #3b82f6;
  
  /* Typography */
  --bmad-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --bmad-font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Spacing */
  --bmad-space-unit: 0.25rem;
  
  /* Shadows */
  --bmad-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --bmad-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --bmad-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
\```

### Component Classes

\```css
/* Base component styling */
.bmad-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--bmad-shadow-md);
  padding: var(--space-6);
  border: 1px solid var(--bmad-gray-200);
}

.bmad-button {
  background: var(--bmad-brand-primary);
  color: white;
  border: none;
  border-radius: 6px;
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bmad-button:hover {
  background: var(--bmad-brand-primary-dark);
  transform: translateY(-1px);
}

.bmad-button:focus {
  outline: 2px solid var(--bmad-brand-primary);
  outline-offset: 2px;
}
\```

## Quality Assurance Checklist

### Visual Review Checklist

- [ ] Color contrast meets WCAG AA standards
- [ ] Typography hierarchy is consistent
- [ ] Spacing follows the defined scale
- [ ] Interactive elements have clear focus states
- [ ] Images have appropriate alt text
- [ ] Responsive design works across breakpoints
- [ ] Brand consistency maintained throughout
- [ ] Loading states are handled gracefully
- [ ] Error states are clearly communicated
- [ ] Success states provide positive feedback

### Accessibility Audit

- [ ] Screen reader compatibility tested
- [ ] Keyboard navigation verified
- [ ] Color is not the only means of conveying information
- [ ] Text can be resized to 200% without horizontal scrolling
- [ ] Motion can be disabled for users with vestibular disorders
- [ ] Form labels are properly associated
- [ ] Headings create a logical document outline
- [ ] Links have descriptive text

---

*These visual documentation standards ensure a consistent, accessible, and professional experience across all BMAD Method materials.*
