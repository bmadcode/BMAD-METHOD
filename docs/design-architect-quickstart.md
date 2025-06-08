# Design Architect - Quick Start Guide

## 5-Minute Setup

### Step 1: Design Environment Activation (1 minute)
```markdown
# In your design environment
1. Open Figma (or your primary design tool)
2. Load BMAD Method design system workspace
3. Verify access to component libraries and design tokens
4. Confirm Design Architect persona activation: "Strategic Design Systems Leader"
```

### Step 2: Design System Assessment (2 minutes)
```markdown
# Quick Design System Audit
1. Review existing design assets and component libraries
2. Identify design consistency gaps and opportunities
3. Assess current design token usage and organization
4. Evaluate design-development handoff processes

# Assessment Checklist
- [ ] Component library exists and is organized
- [ ] Design tokens are defined and documented
- [ ] Brand guidelines are integrated into design system
- [ ] Accessibility standards are established
- [ ] Design-development workflow is defined
```

### Step 3: Tool Configuration (1 minute)
```markdown
# Essential Tool Setup
1. Install key Figma plugins:
   - Design Tokens (for token management)
   - A11y - Color Contrast Checker (for accessibility)
   - Stark (for comprehensive accessibility testing)

2. Set up documentation platform:
   - Zeroheight, Storybook, or custom documentation
   - Connect to design files for automatic sync

3. Configure design token workflow:
   - Style Dictionary or similar token management tool
   - Automated token generation and synchronization
```

### Step 4: First Design System Task (1 minute)
```markdown
# Quick Design System Validation
1. Audit one component for consistency and accessibility
2. Document any issues or improvement opportunities
3. Create or update component specification
4. Test design token usage and implementation

# Example: Button Component Audit
- [ ] Visual consistency across all button variants
- [ ] Accessibility compliance (contrast, focus states)
- [ ] Design token usage for colors, spacing, typography
- [ ] Documentation completeness and accuracy
```

## Practical Example: E-commerce Design System Enhancement

### Scenario Setup
```markdown
**Challenge**: "Our e-commerce platform has inconsistent button styles across different pages and components"
**Goal**: Create a comprehensive button component system with proper design tokens
**Timeline**: 2 hours for initial system setup
**Stakeholders**: UX Team, Development Team, Product Manager
```

### Design System Session Example

#### Phase 1: Component Audit and Analysis (20 minutes)
```markdown
Design Architect: "Let's start by auditing all existing button implementations to understand the current state and identify improvement opportunities."

Audit Process:
1. **Inventory Collection**
   - Screenshot all button variations across the platform
   - Document current button styles, sizes, and states
   - Identify inconsistencies and design debt

2. **Pattern Analysis**
   - Group similar button patterns and variations
   - Identify core button types (primary, secondary, tertiary, etc.)
   - Document current color, typography, and spacing usage

3. **Gap Assessment**
   - Compare current buttons against accessibility standards
   - Identify missing states (hover, focus, disabled, loading)
   - Document design token gaps and inconsistencies

Findings:
- 12 different button styles found across platform
- Inconsistent spacing and typography usage
- Missing focus states for keyboard accessibility
- No systematic approach to color and state management
```

#### Phase 2: Design Token Architecture (30 minutes)
```markdown
Design Architect: "Now let's establish a proper design token foundation for our button system."

Design Token Structure:
---
# Button Design Tokens

## Color Tokens
button:
  primary:
    background: $color-primary-500
    background-hover: $color-primary-600
    background-active: $color-primary-700
    background-disabled: $color-neutral-200
    text: $color-white
    text-disabled: $color-neutral-400
  
  secondary:
    background: transparent
    background-hover: $color-primary-50
    background-active: $color-primary-100
    border: $color-primary-500
    text: $color-primary-500
    text-disabled: $color-neutral-400

## Spacing Tokens
button:
  padding:
    small: $space-2 $space-3
    medium: $space-3 $space-4
    large: $space-4 $space-6
  
  border-radius: $radius-md
  border-width: $border-width-1

## Typography Tokens
button:
  font-family: $font-family-sans
  font-weight: $font-weight-medium
  font-size:
    small: $font-size-sm
    medium: $font-size-base
    large: $font-size-lg
---

Token Implementation:
- Created systematic color approach with proper contrast ratios
- Established consistent spacing using base spacing scale
- Defined typography hierarchy for different button sizes
- Ensured accessibility compliance with WCAG 2.1 AA standards
```

#### Phase 3: Component System Design (40 minutes)
```figma
Design Architect: "Let's create a comprehensive button component system in Figma with proper variants and states."

Component Architecture:
---
# Button Component System

## Base Component: Button
Properties:
- Variant: Primary | Secondary | Tertiary | Destructive
- Size: Small | Medium | Large
- State: Default | Hover | Active | Focus | Disabled | Loading
- Icon: None | Leading | Trailing | Icon Only

## Component Specifications:

### Primary Button
- Background: Uses primary color tokens
- High contrast for maximum visibility
- Used for primary actions (Add to Cart, Checkout, Submit)

### Secondary Button
- Outlined style with transparent background
- Uses primary color for border and text
- Used for secondary actions (Cancel, Back, Learn More)

### Tertiary Button
- Text-only style with no background or border
- Minimal visual weight
- Used for tertiary actions (Skip, Dismiss, Help)

### Destructive Button
- Uses error/danger color tokens
- High contrast red styling
- Used for destructive actions (Delete, Remove, Cancel Order)

## Accessibility Features:
- Minimum 44px touch target for mobile
- 3:1 contrast ratio for all text
- Clear focus indicators for keyboard navigation
- Loading states with appropriate ARIA labels
- Disabled states with proper semantic markup
---

Implementation Details:
- Created master component with all variants and states
- Implemented proper auto-layout for responsive behavior
- Added comprehensive documentation for each variant
- Established clear usage guidelines and best practices
```

#### Phase 4: Documentation and Handoff (30 minutes)
```markdown
Design Architect: "Let's create comprehensive documentation to ensure proper implementation and adoption."

Documentation Package:
---
# Button Component Documentation

## Overview
The button component system provides consistent, accessible, and scalable button implementations across the e-commerce platform.

## Usage Guidelines

### When to Use Each Variant
- **Primary**: Main actions that drive business value (purchase, signup, submit)
- **Secondary**: Supporting actions that complement primary actions
- **Tertiary**: Low-priority actions that don't compete with primary content
- **Destructive**: Actions that delete, remove, or cancel important data

### Accessibility Requirements
- All buttons must have descriptive labels or aria-label attributes
- Loading states must include aria-live announcements
- Disabled buttons should explain why they're disabled when possible
- Focus indicators must be clearly visible and meet contrast requirements

### Implementation Examples
```jsx
// Primary button example
<Button variant="primary" size="medium">
  Add to Cart
</Button>

// Secondary button with icon
<Button variant="secondary" size="medium" icon="leading">
  <Icon name="heart" />
  Add to Wishlist
</Button>

// Loading state example
<Button variant="primary" state="loading" aria-label="Adding item to cart">
  Adding...
</Button>
```

## Design Tokens Reference
[Link to complete design token documentation]

## Component Specifications
[Link to Figma component library]

## Testing Checklist
- [ ] Visual consistency across all variants and states
- [ ] Accessibility compliance (contrast, focus, keyboard navigation)
- [ ] Responsive behavior on different screen sizes
- [ ] Loading and disabled state functionality
- [ ] Cross-browser compatibility validation
---

Handoff Deliverables:
- Figma component library with all variants and states
- Comprehensive usage documentation and guidelines
- Design token specifications for development implementation
- Accessibility testing checklist and validation criteria
- Code examples and implementation guidance
```

## Common Design System Patterns

### Quick Component Audit
```markdown
# 15-Minute Component Consistency Check
1. "Our form inputs look different across pages"
2. Design Architect audits all input variations
3. Identifies inconsistencies and accessibility gaps
4. Creates unified input component specification
5. Documents implementation guidelines and best practices

Example Process:
- Collect screenshots of all input variations
- Analyze patterns and identify core input types
- Create design token architecture for inputs
- Design comprehensive component system with states
- Document usage guidelines and accessibility requirements
```

### Rapid Design Token Implementation
```markdown
# 20-Minute Design Token Setup
1. "We need consistent colors across our design system"
2. Design Architect analyzes current color usage
3. Creates systematic color token architecture
4. Implements tokens in design tools and documentation
5. Provides implementation guidance for development

Example Implementation:
- Audit current color usage and identify patterns
- Create semantic color token system (primary, secondary, neutral, etc.)
- Implement tokens in Figma variables or design tool
- Generate token documentation and code examples
- Establish token governance and update processes
```

### Design System Accessibility Improvement
```markdown
# 30-Minute Accessibility Enhancement
1. "Our design system needs better accessibility compliance"
2. Design Architect conducts accessibility audit
3. Identifies WCAG compliance gaps and improvement opportunities
4. Implements accessibility improvements in component library
5. Creates accessibility testing and validation processes

Example Process:
- Run automated accessibility testing on component library
- Conduct manual accessibility review with assistive technologies
- Implement accessibility improvements (contrast, focus states, etc.)
- Create accessibility guidelines and testing procedures
- Establish ongoing accessibility monitoring and validation
```

## Quick Reference Commands

### Design System Management
```bash
# Design System Tasks
*audit-design-system        # Analyze current design system consistency
*create-component-spec       # Generate component specification template
*validate-accessibility     # Check accessibility compliance across components
*generate-design-tokens     # Create design token documentation and code
*review-brand-alignment     # Assess brand consistency in design system
```

### Quality Assurance
```bash
# Design Quality Checks
*design-consistency-check    # Validate design consistency across products
*accessibility-audit         # Comprehensive accessibility assessment
*performance-review          # Analyze design system performance impact
*usage-analytics            # Review design system adoption and usage metrics
```

### Documentation and Communication
```bash
# Documentation Tasks
*design-review-prep         # Prepare design review materials and agenda
*handoff-documentation      # Generate design-development handoff docs
*training-materials         # Create design system training content
*stakeholder-report         # Generate design system progress report
```

## Best Practices Checklist

### Before Starting Design System Work
- [ ] Understand business goals and brand requirements
- [ ] Assess current design system state and gaps
- [ ] Identify key stakeholders and collaboration needs
- [ ] Establish success criteria and adoption goals
- [ ] Set up proper design tools and documentation platforms

### During Design System Development
- [ ] Follow atomic design principles for component organization
- [ ] Implement comprehensive design token architecture
- [ ] Ensure accessibility compliance throughout design system
- [ ] Create detailed documentation and usage guidelines
- [ ] Test components across different contexts and use cases

### Before Completing Design System Deliverables
- [ ] Validate design system against business and user requirements
- [ ] Ensure comprehensive accessibility testing and compliance
- [ ] Create complete documentation and implementation guidelines
- [ ] Establish governance processes and update procedures
- [ ] Prepare training materials and adoption support resources

## Troubleshooting Quick Fixes

### "Components look different across teams"
**Solution**: Audit component usage, create unified component specifications, establish design review processes

### "Design system adoption is low"
**Solution**: Improve documentation and training, demonstrate value, create adoption incentives and support

### "Accessibility compliance is inconsistent"
**Solution**: Implement accessibility testing in design workflow, create accessibility guidelines, provide training

### "Design-development handoffs are unclear"
**Solution**: Improve component specifications, create shared tools, establish regular collaboration sessions

### "Design system maintenance is overwhelming"
**Solution**: Automate updates where possible, establish clear governance, create sustainable maintenance workflows

---

*This quick start guide gets you productive with the Design Architect persona immediately. For comprehensive capabilities and advanced integration details, refer to the Comprehensive Guide and Integration Guide.*

## Scrum Master (SM) Documentation Package

### Step 1: SM Environment Activation (1 minute)
```markdown
# In your SM environment
1. Open Jira (or your primary project management tool)
2. Load Scrum Master Method workspace
3. Verify access to sprint planning tools and templates
4. Confirm SM persona activation: "Agile Facilitator"
```

### Step 2: SM Sprint Assessment (2 minutes)
```markdown
# Quick Sprint Audit
1. Review sprint backlog and user stories
2. Identify sprint planning gaps and opportunities
3. Assess current team collaboration and communication
4. Evaluate sprint review and retrospective processes

# Assessment Checklist
- [ ] Sprint backlog is organized and prioritized
- [ ] User stories are clear and well-defined
- [ ] Team collaboration tools are set up
- [ ] Sprint review and retrospective processes are established
```

### Step 3: SM Tool Configuration (1 minute)
```markdown
# Essential SM Tool Setup
1. Install key Jira plugins:
   - GreenHopper (for agile project management)
   - Tempo Timesheets (for time tracking)
   - Adaptavist ScriptRunner (for custom workflows)

2. Set up collaboration platform:
   - Slack, Microsoft Teams, or custom communication tools
   - Connect to Jira for automatic notifications

3. Configure sprint planning workflow:
   - Use Jira boards for sprint management
   - Automated sprint planning and review tools
```

### Step 4: First SM Task (1 minute)
```markdown
# Quick SM Validation
1. Audit one sprint for planning and execution consistency
2. Document any issues or improvement opportunities
3. Create or update sprint planning specification
4. Test sprint planning tools and processes

# Example: Sprint Planning Audit
- [ ] Sprint backlog is consistently organized and prioritized
- [ ] User stories are clearly defined and actionable
- [ ] Team collaboration is effective and efficient
- [ ] Sprint review and retrospective processes are followed
```

## Practical Example: Agile Team Sprint Enhancement

### Scenario Setup
```markdown
**Challenge**: "Our agile team has inconsistent sprint planning processes"
**Goal**: Create a comprehensive sprint planning system with proper tools and templates
**Timeline**: 2 hours for initial system setup
**Stakeholders**: Development Team, Product Owner, Team Members
```

### SM Session Example

#### Phase 1: Sprint Audit and Analysis (20 minutes)
```markdown
SM: "Let's start by auditing all existing sprint planning processes to understand the current state and identify improvement opportunities."

Audit Process:
1. **Inventory Collection**
   - Review all sprint backlogs and user stories
   - Document current sprint planning styles, tools, and templates
   - Identify inconsistencies and planning debt

2. **Pattern Analysis**
   - Group similar sprint planning patterns and variations
   - Identify core sprint planning types (planning, execution, review)
   - Document current tool usage and communication methods

3. **Gap Assessment**
   - Compare current sprint planning against agile best practices
   - Identify missing planning elements (velocity tracking, risk management)
   - Document tool gaps and inconsistencies

Findings:
- 12 different sprint planning styles found across team
- Inconsistent tool usage and communication methods
- Missing velocity tracking and risk management elements
- No systematic approach to sprint planning and execution
```

#### Phase 2: SM Tool Architecture (30 minutes)
```markdown
SM: "Now let's establish a proper SM tool foundation for our sprint planning system."

SM Tool Structure:
---
# SM Sprint Planning Tools

## Planning Tools
sprint:
  planning:
    tool: Jira GreenHopper
    template: Agile Planning Template
    process: Daily Stand-up Meetings
  
  execution:
    tool: Jira Tempo Timesheets
    template: Time Tracking Template
    process: Sprint Progress Tracking

## Review Tools
sprint:
  review:
    tool: Jira Boards
    template: Sprint Review Template
    process: Sprint Review Meetings
  
  retrospective:
    tool: Adaptavist ScriptRunner
    template: Retrospective Template
    process: Sprint Retrospective Meetings
---

Tool Implementation:
- Created systematic planning approach with proper templates
- Established consistent execution tracking using time sheets
- Defined review and retrospective processes for continuous improvement
- Ensured agile compliance with Scrum Master Method
```

#### Phase 3: SM System Design (40 minutes)
```jira
SM: "Let's create a comprehensive SM sprint planning system in Jira with proper tools and templates."

SM Architecture:
---
# SM Sprint Planning System

## Base System: Sprint Planning
Components:
- Planning: Backlog grooming, sprint planning meetings
- Execution: Daily stand-ups, task assignments
- Review: Sprint review meetings, demo sessions
- Retrospective: Retrospective meetings, action item tracking

## SM Specifications:

### Planning Component
- Uses Agile Planning Template
- Includes backlog grooming and sprint planning meetings
- Ensures user stories are clear and actionable

### Execution Component
- Uses Daily Stand-up Meetings
- Includes task assignments and progress tracking
- Ensures team collaboration and communication

### Review Component
- Uses Sprint Review Meetings
- Includes demo sessions and feedback collection
- Ensures sprint goals are met and reviewed

### Retrospective Component
- Uses Retrospective Meetings
- Includes action item tracking and process improvement
- Ensures continuous learning and improvement

## Collaboration Features:
- Clear communication channels for team members
- Automated notifications for sprint updates
- Shared tools for planning and execution
- Comprehensive documentation for each sprint phase
---

Implementation Details:
- Created master sprint planning system with all components
- Implemented proper auto-layout for sprint management
- Added comprehensive documentation for each phase
- Established clear usage guidelines and best practices
```

#### Phase 4: SM Documentation and Handoff (30 minutes)
```markdown
SM: "Let's create comprehensive documentation to ensure proper implementation and adoption."

SM Documentation Package:
---
# SM Sprint Planning Documentation

## Overview
The SM sprint planning system provides consistent, efficient, and scalable sprint planning implementations across the agile team.

## Usage Guidelines

### When to Use Each Component
- **Planning**: Before the sprint starts, to groom the backlog and plan the sprint
- **Execution**: During the sprint, to track progress and ensure tasks are completed
- **Review**: At the end of the sprint, to review the sprint and collect feedback
- **Retrospective**: After the sprint, to reflect on the sprint and identify areas for improvement

### Collaboration Requirements
- All team members must participate in daily stand-ups
- Sprint planning meetings must include all stakeholders
- Sprint review meetings must be open and inclusive
- Retrospective meetings must focus on continuous improvement

### Implementation Examples
```bash
# Planning example
jira sprint planning --template AgilePlanningTemplate

# Execution example
jira daily-standup --time-tracking

# Review example
jira sprint-review --demo-session

# Retrospective example
jira retrospective --action-item-tracking
```

## SM Tool Reference
[Link to complete SM tool documentation]

## SM Specifications
[Link to Jira SM workspace]

## Testing Checklist
- [ ] Consistency across all sprint planning components
- [ ] Effective collaboration and communication
- [ ] Proper tracking of sprint progress and velocity
- [ ] Comprehensive review and retrospective processes
- [ ] Cross-team compatibility validation
---

SM Handoff Deliverables:
- Jira SM workspace with all components and templates
- Comprehensive usage documentation and guidelines
- SM tool specifications for team implementation
- Collaboration testing checklist and validation criteria
- Code examples and implementation guidance
```

## Common SM Patterns

### Quick Sprint Planning Audit
```markdown
# 15-Minute Sprint Planning Consistency Check
1. "Our sprint backlogs are not well-organized"
2. SM audits all sprint backlogs
3. Identifies inconsistencies and planning gaps
4. Creates unified sprint planning specification
5. Documents implementation guidelines and best practices

Example Process:
- Review all sprint backlogs and user stories
- Analyze patterns and identify core planning types
- Create SM tool architecture for planning
- Design comprehensive SM system with components
- Document usage guidelines and collaboration requirements
```

### Rapid SM Tool Implementation
```markdown
# 20-Minute SM Tool Setup
1. "We need consistent tools for sprint planning"
2. SM analyzes current tool usage
3. Creates systematic SM tool architecture
4. Implements tools in project management and collaboration platforms
5. Provides implementation guidance for team

Example Implementation:
- Audit current tool usage and identify patterns
- Create semantic SM tool system (planning, execution, review, retrospective)
- Implement tools in Jira variables or project management tool
- Generate tool documentation and code examples
- Establish tool governance and update processes
```

### SM Team Collaboration Improvement
```markdown
# 30-Minute Collaboration Enhancement
1. "Our team needs better collaboration during sprints"
2. SM conducts collaboration audit
3. Identifies agile best practice gaps and improvement opportunities
4. Implements collaboration improvements in SM system
5. Creates collaboration testing and validation processes

Example Process:
- Run automated collaboration testing on SM system
- Conduct manual collaboration review with team members
- Implement collaboration improvements (stand-up meetings, communication tools)
- Create collaboration guidelines and testing procedures
- Establish ongoing collaboration monitoring and validation
```

## SM Quick Reference Commands

### SM Management
```bash
# SM Tasks
*audit-sprint-planning        # Analyze current sprint planning consistency
*create-planning-spec         # Generate sprint planning specification template
*validate-collaboration       # Check collaboration effectiveness across sprints
*generate-sm-tools            # Create SM tool documentation and code
*review-agile-alignment       # Assess agile consistency in SM system
```

### SM Quality Assurance
```bash
# SM Quality Checks
*sprint-consistency-check     # Validate sprint planning consistency across teams
*collaboration-audit          # Comprehensive collaboration assessment
*velocity-review              # Analyze team velocity impact
*retrospective-analysis       # Review sprint retrospective outcomes
```

### SM Documentation and Communication
```bash
# SM Documentation Tasks
*sprint-review-prep           # Prepare sprint review materials and agenda
*handoff-sm-documentation     # Generate SM-team handoff docs
*training-materials           # Create SM training content
*stakeholder-report           # Generate SM progress report
```

## SM Best Practices Checklist

### Before Starting SM Work
- [ ] Understand team goals and agile requirements
- [ ] Assess current SM system state and gaps
- [ ] Identify key stakeholders and collaboration needs
- [ ] Establish success criteria and adoption goals
- [ ] Set up proper SM tools and collaboration platforms

### During SM Development
- [ ] Follow agile principles for sprint organization
- [ ] Implement comprehensive SM tool architecture
- [ ] Ensure collaboration effectiveness throughout SM system
- [ ] Create detailed documentation and usage guidelines
- [ ] Test SM tools across different contexts and use cases

### Before Completing SM Deliverables
- [ ] Validate SM system against team and user requirements
- [ ] Ensure comprehensive collaboration testing and effectiveness
- [ ] Create complete documentation and implementation guidelines
- [ ] Establish governance processes and update procedures
- [ ] Prepare training materials and adoption support resources

## SM Troubleshooting Quick Fixes

### "Sprints are not consistently planned"
**Solution**: Audit sprint planning usage, create unified sprint planning specifications, establish SM review processes

### "SM adoption is low"
**Solution**: Improve SM documentation and training, demonstrate value, create adoption incentives and support

### "Collaboration effectiveness is inconsistent"
**Solution**: Implement collaboration testing in SM workflow, create collaboration guidelines, provide training

### "SM handoffs are unclear"
**Solution**: Improve SM specifications, create shared tools, establish regular collaboration sessions

### "SM maintenance is overwhelming"
**Solution**: Automate updates where possible, establish clear governance, create sustainable maintenance workflows

---

*This quick start guide gets you productive with the SM persona immediately. For comprehensive capabilities and advanced integration details, refer to the Comprehensive Guide and Integration Guide.*
