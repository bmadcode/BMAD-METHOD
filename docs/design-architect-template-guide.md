# Design Architect - Template Guide

## Overview

This template guide provides comprehensive templates for the **Design Architect** persona in the BMAD Method. These templates support design system creation, component specification, design governance, and cross-functional collaboration to ensure consistent, scalable, and accessible design implementations.

## Template Categories

### 1. Design System Templates
### 2. Component Design Templates  
### 3. Design Governance Templates
### 4. Collaboration Templates
### 5. Quality Assurance Templates
### 6. Documentation Templates

---

## 1. Design System Templates

### 1.1 Design System Foundation Template

```markdown
# Design System Foundation Template

## Project Information
- **Project Name**: [Project Name]
- **Design System Name**: [System Name]
- **Version**: [Version Number]
- **Date**: [Creation Date]
- **Design Architect**: [Your Name]

## Design Principles
### Core Principles
1. **[Principle 1]**: [Description and rationale]
2. **[Principle 2]**: [Description and rationale]
3. **[Principle 3]**: [Description and rationale]

### Design Philosophy
- **Vision**: [Design system vision statement]
- **Mission**: [Design system mission]
- **Values**: [Core design values]

## Design Token Architecture
### Color System
- **Primary Colors**: [Color palette with hex codes]
- **Secondary Colors**: [Supporting color palette]
- **Neutral Colors**: [Grayscale palette]
- **Semantic Colors**: [Success, warning, error, info colors]

### Typography System
- **Font Families**: [Primary and secondary font stacks]
- **Type Scale**: [Font sizes and line heights]
- **Font Weights**: [Available font weights]
- **Letter Spacing**: [Tracking values]

### Spacing System
- **Base Unit**: [Base spacing unit]
- **Scale Ratio**: [Spacing scale multiplier]
- **Spacing Values**: [Complete spacing scale]

### Layout System
- **Grid System**: [Grid specifications]
- **Breakpoints**: [Responsive breakpoints]
- **Container Sizes**: [Max-width values]

## Component Hierarchy
### Atomic Level
- **Atoms**: [List of atomic components]
- **Specifications**: [Basic component requirements]

### Molecular Level
- **Molecules**: [List of molecular components]
- **Combinations**: [Component combination patterns]

### Organism Level
- **Organisms**: [List of organism components]
- **Layouts**: [Complex component assemblies]

## Implementation Guidelines
### Design Tool Setup
- **Primary Tool**: [Figma/Sketch/Adobe XD]
- **Library Structure**: [Component library organization]
- **Naming Conventions**: [Component and layer naming]

### Development Integration
- **Token Format**: [CSS/SCSS/JavaScript format]
- **Component Framework**: [React/Vue/Angular]
- **Documentation Platform**: [Storybook/Zeroheight]

## Governance Framework
### Design Review Process
1. **Component Proposal**: [Proposal requirements]
2. **Design Review**: [Review criteria and process]
3. **Approval Process**: [Approval workflow]
4. **Implementation**: [Implementation guidelines]

### Version Control
- **Versioning Strategy**: [Semantic versioning approach]
- **Change Management**: [Change request process]
- **Release Process**: [Release workflow]

## Success Metrics
### Adoption Metrics
- **Component Usage**: [Usage tracking methods]
- **Design Consistency**: [Consistency measurement]
- **Developer Adoption**: [Development team adoption]

### Quality Metrics
- **Accessibility Compliance**: [WCAG compliance tracking]
- **Performance Impact**: [Performance measurement]
- **User Satisfaction**: [User feedback collection]

## Next Steps
1. **Foundation Setup**: [Immediate next steps]
2. **Component Development**: [Component creation plan]
3. **Team Training**: [Training and onboarding plan]
4. **Rollout Strategy**: [Implementation timeline]

---
**Template Version**: 1.0
**Last Updated**: [Date]
**Created by**: Design Architect
```

### 1.2 Design Token Specification Template

```yaml
# Design Token Specification Template

# Color Tokens
color:
  primary:
    50: "#[hex-value]"
    100: "#[hex-value]"
    200: "#[hex-value]"
    300: "#[hex-value]"
    400: "#[hex-value]"
    500: "#[hex-value]"  # Base primary color
    600: "#[hex-value]"
    700: "#[hex-value]"
    800: "#[hex-value]"
    900: "#[hex-value]"
  
  secondary:
    50: "#[hex-value]"
    # ... continue pattern
  
  neutral:
    white: "#ffffff"
    50: "#[hex-value]"
    # ... continue pattern
    black: "#000000"
  
  semantic:
    success: "#[hex-value]"
    warning: "#[hex-value]"
    error: "#[hex-value]"
    info: "#[hex-value]"

# Typography Tokens
typography:
  font-family:
    primary: "[font-stack]"
    secondary: "[font-stack]"
    monospace: "[monospace-stack]"
  
  font-size:
    xs: "[size-value]"
    sm: "[size-value]"
    base: "[size-value]"
    lg: "[size-value]"
    xl: "[size-value]"
    2xl: "[size-value]"
    3xl: "[size-value]"
    4xl: "[size-value]"
  
  font-weight:
    light: 300
    normal: 400
    medium: 500
    semibold: 600
    bold: 700
  
  line-height:
    tight: "[ratio]"
    normal: "[ratio]"
    relaxed: "[ratio]"
    loose: "[ratio]"

# Spacing Tokens
spacing:
  0: "0"
  px: "1px"
  0.5: "[value]"
  1: "[value]"
  1.5: "[value]"
  2: "[value]"
  2.5: "[value]"
  3: "[value]"
  # ... continue scale

# Border Radius Tokens
border-radius:
  none: "0"
  sm: "[value]"
  base: "[value]"
  md: "[value]"
  lg: "[value]"
  xl: "[value]"
  full: "9999px"

# Shadow Tokens
shadow:
  sm: "[shadow-value]"
  base: "[shadow-value]"
  md: "[shadow-value]"
  lg: "[shadow-value]"
  xl: "[shadow-value]"
  inner: "[shadow-value]"

# Breakpoint Tokens
breakpoint:
  sm: "[value]"
  md: "[value]"
  lg: "[value]"
  xl: "[value]"
  2xl: "[value]"
```

---

## 2. Component Design Templates

### 2.1 Component Specification Template

```markdown
# Component Specification Template

## Component Information
- **Component Name**: [Component Name]
- **Component Type**: [Atom/Molecule/Organism]
- **Version**: [Version Number]
- **Date**: [Creation Date]
- **Design Architect**: [Your Name]

## Component Overview
### Purpose
[Brief description of component purpose and use cases]

### Design Principles
- **[Principle 1]**: [How this component embodies the principle]
- **[Principle 2]**: [How this component embodies the principle]
- **[Principle 3]**: [How this component embodies the principle]

## Visual Specifications

### Variants
1. **[Variant Name]**
   - **Use Case**: [When to use this variant]
   - **Visual Description**: [Appearance details]
   - **Behavior**: [Interaction behavior]

2. **[Variant Name]**
   - **Use Case**: [When to use this variant]
   - **Visual Description**: [Appearance details]
   - **Behavior**: [Interaction behavior]

### States
- **Default**: [Default appearance and behavior]
- **Hover**: [Hover state specifications]
- **Active**: [Active state specifications]
- **Focus**: [Focus state specifications]
- **Disabled**: [Disabled state specifications]
- **Loading**: [Loading state specifications]

### Sizing
- **Small**: [Dimensions and spacing]
- **Medium**: [Dimensions and spacing]
- **Large**: [Dimensions and spacing]

## Design Tokens Usage

### Colors
- **Background**: `$color-[token-name]`
- **Text**: `$color-[token-name]`
- **Border**: `$color-[token-name]`
- **Icon**: `$color-[token-name]`

### Typography
- **Font Family**: `$font-family-[token-name]`
- **Font Size**: `$font-size-[token-name]`
- **Font Weight**: `$font-weight-[token-name]`
- **Line Height**: `$line-height-[token-name]`

### Spacing
- **Padding**: `$spacing-[token-name]`
- **Margin**: `$spacing-[token-name]`
- **Gap**: `$spacing-[token-name]`

### Layout
- **Border Radius**: `$border-radius-[token-name]`
- **Border Width**: `$border-width-[token-name]`
- **Shadow**: `$shadow-[token-name]`

## Interaction Design

### User Interactions
1. **[Interaction Type]**
   - **Trigger**: [What triggers this interaction]
   - **Feedback**: [Visual/audio feedback provided]
   - **Duration**: [Animation duration]
   - **Easing**: [Animation easing function]

### Micro-animations
- **Entry Animation**: [Animation specifications]
- **Exit Animation**: [Animation specifications]
- **State Transitions**: [Transition specifications]

## Accessibility Specifications

### WCAG Compliance
- **Level**: [AA/AAA compliance level]
- **Color Contrast**: [Contrast ratio requirements]
- **Keyboard Navigation**: [Keyboard interaction patterns]
- **Screen Reader Support**: [ARIA labels and descriptions]

### Accessibility Features
- **Focus Management**: [Focus handling specifications]
- **Alternative Text**: [Alt text requirements]
- **Semantic Markup**: [Required HTML semantics]
- **ARIA Attributes**: [Required ARIA attributes]

## Content Guidelines

### Text Content
- **Tone of Voice**: [Content tone requirements]
- **Character Limits**: [Maximum character counts]
- **Localization**: [Internationalization considerations]

### Imagery
- **Image Requirements**: [Image specifications]
- **Icon Usage**: [Icon guidelines]
- **Alternative Text**: [Alt text guidelines]

## Technical Specifications

### Implementation Requirements
- **HTML Structure**: [Required HTML markup]
- **CSS Classes**: [Required CSS class names]
- **JavaScript Behavior**: [Required JS functionality]

### Performance Considerations
- **Bundle Size**: [Size impact considerations]
- **Rendering Performance**: [Performance requirements]
- **Accessibility Performance**: [A11y performance needs]

## Usage Guidelines

### When to Use
- [Specific use case 1]
- [Specific use case 2]
- [Specific use case 3]

### When Not to Use
- [Avoid in situation 1]
- [Avoid in situation 2]
- [Avoid in situation 3]

### Best Practices
1. **[Practice 1]**: [Description and rationale]
2. **[Practice 2]**: [Description and rationale]
3. **[Practice 3]**: [Description and rationale]

## Code Examples

### React Implementation
```jsx
// Basic usage example
<ComponentName
  variant="primary"
  size="medium"
  disabled={false}
>
  Component Content
</ComponentName>

// Advanced usage example
<ComponentName
  variant="secondary"
  size="large"
  icon="leading"
  loading={isLoading}
  onClick={handleClick}
  aria-label="Descriptive label"
>
  Component Content
</ComponentName>
```

### CSS Implementation
```css
/* Component base styles */
.component-name {
  /* Base styling using design tokens */
}

/* Component variants */
.component-name--primary {
  /* Primary variant styles */
}

.component-name--secondary {
  /* Secondary variant styles */
}

/* Component states */
.component-name:hover {
  /* Hover state styles */
}

.component-name:focus {
  /* Focus state styles */
}
```

## Testing Requirements

### Visual Testing
- [ ] Component renders correctly in all variants
- [ ] All states display properly
- [ ] Responsive behavior works across breakpoints
- [ ] Cross-browser compatibility verified

### Accessibility Testing
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces content properly
- [ ] Color contrast meets WCAG requirements
- [ ] Focus indicators are visible

### Functional Testing
- [ ] All interactions work as expected
- [ ] Loading states function correctly
- [ ] Error states display appropriately
- [ ] Performance meets requirements

## Documentation Links
- **Design File**: [Link to Figma/Sketch file]
- **Storybook**: [Link to Storybook documentation]
- **Code Repository**: [Link to component code]
- **Usage Examples**: [Link to usage examples]

---
**Template Version**: 1.0
**Last Updated**: [Date]
**Created by**: Design Architect
```

---

## 3. Design Governance Templates

### 3.1 Design Review Checklist Template

```markdown
# Design Review Checklist Template

## Review Information
- **Component/Feature**: [Name]
- **Designer**: [Designer Name]
- **Reviewer**: [Reviewer Name]
- **Review Date**: [Date]
- **Review Type**: [Initial/Update/Final]

## Design System Compliance

### Design Token Usage
- [ ] Uses approved color tokens
- [ ] Uses approved typography tokens
- [ ] Uses approved spacing tokens
- [ ] Uses approved border radius tokens
- [ ] Uses approved shadow tokens

### Component Consistency
- [ ] Follows established component patterns
- [ ] Maintains visual hierarchy consistency
- [ ] Aligns with brand guidelines
- [ ] Uses consistent interaction patterns

### Naming Conventions
- [ ] Component names follow naming standards
- [ ] Layer names are descriptive and consistent
- [ ] File organization follows standards
- [ ] Version control practices followed

## Accessibility Review

### WCAG Compliance
- [ ] Color contrast meets AA standards (4.5:1 for normal text)
- [ ] Color contrast meets AA standards (3:1 for large text)
- [ ] Color is not the only means of conveying information
- [ ] Focus indicators are clearly visible
- [ ] Touch targets are minimum 44px

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical and intuitive
- [ ] Keyboard shortcuts don't conflict with browser/OS
- [ ] Focus management is handled properly

### Screen Reader Support
- [ ] Semantic HTML structure is used
- [ ] ARIA labels are provided where needed
- [ ] Alternative text is provided for images
- [ ] Form labels are properly associated

## User Experience Review

### Usability
- [ ] User flow is intuitive and clear
- [ ] Information hierarchy is logical
- [ ] Content is scannable and readable
- [ ] Error states are helpful and actionable

### Interaction Design
- [ ] Micro-interactions enhance user experience
- [ ] Loading states provide appropriate feedback
- [ ] Transitions are smooth and purposeful
- [ ] Hover states provide clear feedback

### Content Strategy
- [ ] Content tone matches brand voice
- [ ] Text is concise and actionable
- [ ] Microcopy is helpful and clear
- [ ] Content scales appropriately

## Technical Review

### Implementation Feasibility
- [ ] Design is technically feasible
- [ ] Performance impact is acceptable
- [ ] Responsive behavior is well-defined
- [ ] Browser compatibility requirements met

### Development Handoff
- [ ] Specifications are complete and clear
- [ ] Assets are properly prepared and exported
- [ ] Code examples are provided where helpful
- [ ] Edge cases are documented

## Quality Assurance

### Visual Quality
- [ ] Pixel-perfect alignment and spacing
- [ ] Consistent visual treatment
- [ ] High-quality assets and imagery
- [ ] Print/export quality is acceptable

### Documentation Quality
- [ ] Usage guidelines are clear and complete
- [ ] Examples demonstrate proper usage
- [ ] Edge cases are documented
- [ ] Maintenance requirements are defined

## Review Outcome

### Overall Assessment
- [ ] **Approved**: Ready for implementation
- [ ] **Approved with Minor Changes**: Small adjustments needed
- [ ] **Needs Revision**: Significant changes required
- [ ] **Rejected**: Does not meet standards

### Required Changes
1. [Change description and rationale]
2. [Change description and rationale]
3. [Change description and rationale]

### Recommendations
1. [Recommendation and rationale]
2. [Recommendation and rationale]
3. [Recommendation and rationale]

### Next Steps
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

## Reviewer Comments
[Detailed feedback and suggestions]

## Designer Response
[Designer's response to feedback and planned changes]

---
**Review Completed**: [Date]
**Next Review Scheduled**: [Date]
**Template Version**: 1.0
```

---

## 4. Collaboration Templates

### 4.1 Design-Development Handoff Template

```markdown
# Design-Development Handoff Template

## Project Information
- **Project Name**: [Project Name]
- **Feature/Component**: [Feature Name]
- **Designer**: [Designer Name]
- **Developer**: [Developer Name]
- **Handoff Date**: [Date]
- **Target Completion**: [Date]

## Design Overview

### Feature Description
[Brief description of the feature or component being handed off]

### User Stories
1. **As a** [user type], **I want** [goal] **so that** [benefit]
2. **As a** [user type], **I want** [goal] **so that** [benefit]
3. **As a** [user type], **I want** [goal] **so that** [benefit]

### Design Goals
- **Primary Goal**: [Main objective]
- **Secondary Goals**: [Supporting objectives]
- **Success Metrics**: [How success will be measured]

## Design Specifications

### Visual Design
- **Design File**: [Link to Figma/Sketch file]
- **Prototype**: [Link to interactive prototype]
- **Style Guide**: [Link to style guide section]

### Component Breakdown
1. **[Component Name]**
   - **Type**: [Atom/Molecule/Organism]
   - **Variants**: [List of variants]
   - **States**: [List of states]
   - **Specifications**: [Link to detailed specs]

2. **[Component Name]**
   - **Type**: [Atom/Molecule/Organism]
   - **Variants**: [List of variants]
   - **States**: [List of states]
   - **Specifications**: [Link to detailed specs]

### Design Tokens

#### Colors
```css
/* Primary colors used */
--color-primary: #[hex-value];
--color-secondary: #[hex-value];
--color-accent: #[hex-value];

/* Text colors */
--color-text-primary: #[hex-value];
--color-text-secondary: #[hex-value];
--color-text-muted: #[hex-value];

/* Background colors */
--color-bg-primary: #[hex-value];
--color-bg-secondary: #[hex-value];
--color-bg-accent: #[hex-value];
```

#### Typography
```css
/* Font families */
--font-primary: [font-stack];
--font-secondary: [font-stack];

/* Font sizes */
--font-size-xs: [size];
--font-size-sm: [size];
--font-size-base: [size];
--font-size-lg: [size];
--font-size-xl: [size];

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

#### Spacing
```css
/* Spacing scale */
--spacing-xs: [value];
--spacing-sm: [value];
--spacing-md: [value];
--spacing-lg: [value];
--spacing-xl: [value];
```

## Interaction Design

### User Flows
1. **[Flow Name]**
   - **Entry Point**: [How users enter this flow]
   - **Steps**: [Step-by-step flow description]
   - **Exit Points**: [How users exit this flow]

### Micro-interactions
1. **[Interaction Name]**
   - **Trigger**: [What triggers the interaction]
   - **Animation**: [Animation description]
   - **Duration**: [Animation duration]
   - **Easing**: [Easing function]

### State Management
- **Loading States**: [Loading state specifications]
- **Error States**: [Error state specifications]
- **Empty States**: [Empty state specifications]
- **Success States**: [Success state specifications]

## Responsive Design

### Breakpoints
- **Mobile**: [Breakpoint and specifications]
- **Tablet**: [Breakpoint and specifications]
- **Desktop**: [Breakpoint and specifications]
- **Large Desktop**: [Breakpoint and specifications]

### Responsive Behavior
1. **[Component/Section Name]**
   - **Mobile**: [Mobile behavior description]
   - **Tablet**: [Tablet behavior description]
   - **Desktop**: [Desktop behavior description]

## Accessibility Requirements

### WCAG Compliance
- **Target Level**: [AA/AAA]
- **Color Contrast**: [Contrast ratios verified]
- **Keyboard Navigation**: [Keyboard interaction patterns]
- **Screen Reader**: [Screen reader requirements]

### Accessibility Features
- **Focus Management**: [Focus handling requirements]
- **ARIA Labels**: [Required ARIA attributes]
- **Alternative Text**: [Alt text requirements]
- **Semantic Markup**: [Semantic HTML requirements]

## Technical Specifications

### Implementation Notes
- **Framework**: [React/Vue/Angular/etc.]
- **Styling Approach**: [CSS-in-JS/SCSS/CSS Modules/etc.]
- **State Management**: [Redux/Context/etc.]
- **Testing Requirements**: [Testing specifications]

### Performance Requirements
- **Bundle Size**: [Size constraints]
- **Loading Performance**: [Performance targets]
- **Accessibility Performance**: [A11y performance requirements]

### Browser Support
- **Supported Browsers**: [Browser support matrix]
- **Fallback Behavior**: [Fallback specifications]

## Assets and Resources

### Design Assets
- **Icons**: [Link to icon assets]
- **Images**: [Link to image assets]
- **Illustrations**: [Link to illustration assets]
- **Logos**: [Link to logo assets]

### Code Resources
- **Component Library**: [Link to component library]
- **Style Guide**: [Link to style guide code]
- **Utility Classes**: [Link to utility classes]

## Implementation Checklist

### Development Tasks
- [ ] Set up component structure
- [ ] Implement base styling
- [ ] Add responsive behavior
- [ ] Implement interactions
- [ ] Add accessibility features
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Update documentation

### Quality Assurance
- [ ] Visual review against designs
- [ ] Cross-browser testing
- [ ] Responsive testing
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] User acceptance testing

## Communication Plan

### Check-in Schedule
- **Daily Standups**: [Time and format]
- **Progress Reviews**: [Frequency and format]
- **Final Review**: [Scheduled review date]

### Communication Channels
- **Primary**: [Slack/Teams/Email]
- **Design Questions**: [Preferred channel]
- **Technical Questions**: [Preferred channel]
- **Urgent Issues**: [Escalation process]

## Questions and Clarifications

### Open Questions
1. [Question about design or implementation]
2. [Question about design or implementation]
3. [Question about design or implementation]

### Assumptions
1. [Assumption about requirements or implementation]
2. [Assumption about requirements or implementation]
3. [Assumption about requirements or implementation]

## Sign-off

### Designer Approval
- **Name**: [Designer Name]
- **Date**: [Date]
- **Signature**: [Digital signature or approval]

### Developer Acknowledgment
- **Name**: [Developer Name]
- **Date**: [Date]
- **Estimated Completion**: [Date]

---
**Handoff Completed**: [Date]
**Template Version**: 1.0
**Next Review**: [Date]
```

---

## 5. Quality Assurance Templates

### 5.1 Design System Audit Template

```markdown
# Design System Audit Template

## Audit Information
- **Audit Date**: [Date]
- **Auditor**: [Auditor Name]
- **Audit Scope**: [Components/Pages/Features audited]
- **Audit Type**: [Comprehensive/Focused/Follow-up]

## Executive Summary

### Overall Health Score
**[Score]/100** - [Excellent/Good/Fair/Poor]

### Key Findings
1. [Major finding 1]
2. [Major finding 2]
3. [Major finding 3]

### Priority Recommendations
1. [High priority recommendation]
2. [Medium priority recommendation]
3. [Low priority recommendation]

## Design Token Compliance

### Color Usage Analysis
- **Compliant Components**: [Number/Percentage]
- **Non-compliant Components**: [Number/Percentage]
- **Common Issues**: [List of common color issues]

#### Color Compliance Details
| Component | Status | Issues | Recommendation |
|-----------|--------|--------|----------------|
| [Component] | âœ…/âŒ | [Issue description] | [Fix recommendation] |
| [Component] | âœ…/âŒ | [Issue description] | [Fix recommendation] |

### Typography Analysis
- **Compliant Components**: [Number/Percentage]
- **Non-compliant Components**: [Number/Percentage]
- **Common Issues**: [List of common typography issues]

#### Typography Compliance Details
| Component | Font Family | Font Size | Font Weight | Status |
|-----------|-------------|-----------|-------------|--------|
| [Component] | [Family] | [Size] | [Weight] | âœ…/âŒ |
| [Component] | [Family] | [Size] | [Weight] | âœ…/âŒ |

### Spacing Analysis
- **Compliant Components**: [Number/Percentage]
- **Non-compliant Components**: [Number/Percentage]
- **Common Issues**: [List of common spacing issues]

## Component Consistency Analysis

### Component Usage
- **Total Components Audited**: [Number]
- **Design System Components Used**: [Number/Percentage]
- **Custom Components**: [Number/Percentage]
- **Deprecated Components**: [Number/Percentage]

### Consistency Issues
1. **[Issue Category]**
   - **Frequency**: [How often this occurs]
   - **Impact**: [High/Medium/Low]
   - **Examples**: [Specific examples]
   - **Recommendation**: [How to fix]

2. **[Issue Category]**
   - **Frequency**: [How often this occurs]
   - **Impact**: [High/Medium/Low]
   - **Examples**: [Specific examples]
   - **Recommendation**: [How to fix]

## Accessibility Compliance

### WCAG 2.1 AA Compliance
- **Overall Compliance**: [Percentage]
- **Color Contrast**: [Pass/Fail rate]
- **Keyboard Navigation**: [Pass/Fail rate]
- **Screen Reader Support**: [Pass/Fail rate]

### Accessibility Issues
| Issue | Severity | Frequency | Component | Recommendation |
|-------|----------|-----------|-----------|----------------|
| [Issue] | High/Med/Low | [Count] | [Component] | [Fix] |
| [Issue] | High/Med/Low | [Count] | [Component] | [Fix] |

### Accessibility Improvements
1. **[Improvement Area]**
   - **Current State**: [Description]
   - **Target State**: [Description]
   - **Implementation**: [How to achieve]

## Brand Consistency

### Brand Guideline Compliance
- **Logo Usage**: [Compliant/Non-compliant examples]
- **Color Usage**: [Brand color compliance]
- **Typography**: [Brand typography compliance]
- **Voice and Tone**: [Content consistency]

### Brand Violations
1. **[Violation Type]**
   - **Location**: [Where found]
   - **Description**: [What's wrong]
   - **Impact**: [Brand impact assessment]
   - **Fix**: [How to correct]

## Performance Impact

### Design System Performance
- **Bundle Size Impact**: [Size analysis]
- **Loading Performance**: [Performance metrics]
- **Rendering Performance**: [Rendering analysis]

### Performance Recommendations
1. **[Performance Area]**
   - **Current Impact**: [Measurement]
   - **Optimization**: [Recommendation]
   - **Expected Improvement**: [Projected benefit]

## User Experience Analysis

### Usability Issues
1. **[Usability Issue]**
   - **Severity**: [High/Medium/Low]
   - **User Impact**: [How it affects users]
   - **Frequency**: [How often encountered]
   - **Solution**: [Recommended fix]

### User Flow Consistency
- **Consistent Patterns**: [Number/Percentage]
- **Inconsistent Patterns**: [Number/Percentage]
- **Navigation Issues**: [List of issues]

## Documentation Quality

### Documentation Completeness
- **Component Documentation**: [Complete/Incomplete percentage]
- **Usage Guidelines**: [Available/Missing percentage]
- **Code Examples**: [Available/Missing percentage]
- **Accessibility Documentation**: [Complete/Incomplete percentage]

### Documentation Issues
1. **[Documentation Gap]**
   - **Impact**: [How this affects adoption]
   - **Priority**: [High/Medium/Low]
   - **Recommendation**: [How to address]

## Adoption Analysis

### Design System Adoption
- **Team Adoption Rate**: [Percentage by team]
- **Component Usage Rate**: [Most/least used components]
- **Implementation Consistency**: [Consistency across teams]

### Adoption Barriers
1. **[Barrier]**
   - **Description**: [What's preventing adoption]
   - **Impact**: [Effect on adoption]
   - **Solution**: [How to remove barrier]

## Detailed Findings

### Critical Issues (Fix Immediately)
1. **[Critical Issue]**
   - **Description**: [Detailed description]
   - **Impact**: [Business/user impact]
   - **Location**: [Where found]
   - **Fix**: [Detailed fix instructions]
   - **Timeline**: [Recommended timeline]

### High Priority Issues (Fix This Sprint)
1. **[High Priority Issue]**
   - **Description**: [Detailed description]
   - **Impact**: [Business/user impact]
   - **Location**: [Where found]
   - **Fix**: [Detailed fix instructions]
   - **Timeline**: [Recommended timeline]

### Medium Priority Issues (Fix Next Sprint)
1. **[Medium Priority Issue]**
   - **Description**: [Detailed description]
   - **Impact**: [Business/user impact]
   - **Location**: [Where found]
   - **Fix**: [Detailed fix instructions]
   - **Timeline**: [Recommended timeline]

### Low Priority Issues (Fix When Possible)
1. **[Low Priority Issue]**
   - **Description**: [Detailed description]
   - **Impact**: [Business/user impact]
   - **Location**: [Where found]
   - **Fix**: [Detailed fix instructions]
   - **Timeline**: [Recommended timeline]

## Recommendations

### Immediate Actions (This Week)
1. **[Action]**: [Description and rationale]
2. **[Action]**: [Description and rationale]
3. **[Action]**: [Description and rationale]

### Short-term Actions (This Month)
1. **[Action]**: [Description and rationale]
2. **[Action]**: [Description and rationale]
3. **[Action]**: [Description and rationale]

### Long-term Actions (This Quarter)
1. **[Action]**: [Description and rationale]
2. **[Action]**: [Description and rationale]
3. **[Action]**: [Description and rationale]

## Success Metrics

### Improvement Targets
- **Design Token Compliance**: [Current] â†’ [Target]
- **Component Consistency**: [Current] â†’ [Target]
- **Accessibility Compliance**: [Current] â†’ [Target]
- **Brand Consistency**: [Current] â†’ [Target]

### Measurement Plan
- **Next Audit Date**: [Date]
- **Progress Check-ins**: [Frequency]
- **Success Criteria**: [How success will be measured]

## Appendix

### Audit Methodology
[Description of audit process and criteria used]

### Tools Used
- **Design Analysis**: [Tools used for design analysis]
- **Accessibility Testing**: [A11y testing tools]
- **Performance Testing**: [Performance testing tools]

### Audit Scope Details
[Detailed list of components, pages, and features audited]

---
**Audit Completed**: [Date]
**Next Audit Scheduled**: [Date]
**Template Version**: 1.0
```

---

## 6. Documentation Templates

### 6.1 Component Documentation Template

```markdown
# [Component Name] Documentation

## Overview

### Component Purpose
[Brief description of what this component does and why it exists]

### When to Use
- [Use case 1]
- [Use case 2]
- [Use case 3]

### When Not to Use
- [Avoid in situation 1]
- [Avoid in situation 2]
- [Avoid in situation 3]

## Component Anatomy

### Visual Structure
[Description of the component's visual structure and hierarchy]

### Component Parts
1. **[Part Name]**: [Description of this part]
2. **[Part Name]**: [Description of this part]
3. **[Part Name]**: [Description of this part]

## Variants

### [Variant Name]
- **Purpose**: [When to use this variant]
- **Appearance**: [Visual description]
- **Behavior**: [Interaction behavior]
- **Use Cases**: [Specific use cases]

### [Variant Name]
- **Purpose**: [When to use this variant]
- **Appearance**: [Visual description]
- **Behavior**: [Interaction behavior]
- **Use Cases**: [Specific use cases]

## States

### Default State
[Description of default appearance and behavior]

### Interactive States
- **Hover**: [Hover state description]
- **Active**: [Active state description]
- **Focus**: [Focus state description]

### Feedback States
- **Loading**: [Loading state description]
- **Success**: [Success state description]
- **Error**: [Error state description]
- **Disabled**: [Disabled state description]

## Sizing and Spacing

### Size Variants
- **Small**: [Dimensions and use cases]
- **Medium**: [Dimensions and use cases]
- **Large**: [Dimensions and use cases]

### Spacing Guidelines
- **Internal Spacing**: [Padding specifications]
- **External Spacing**: [Margin specifications]
- **Responsive Spacing**: [How spacing adapts]

## Content Guidelines

### Text Content
- **Tone**: [Content tone requirements]
- **Length**: [Character/word limits]
- **Formatting**: [Text formatting guidelines]

### Imagery
- **Image Requirements**: [Image specifications]
- **Alt Text**: [Alt text guidelines]
- **Icon Usage**: [Icon guidelines]

## Accessibility

### WCAG Compliance
- **Level**: [AA/AAA compliance]
- **Color Contrast**: [Contrast requirements]
- **Keyboard Support**: [Keyboard interaction patterns]

### Screen Reader Support
- **ARIA Labels**: [Required ARIA attributes]
- **Semantic Markup**: [HTML semantic requirements]
- **Announcements**: [Screen reader announcements]

### Keyboard Navigation
- **Tab Order**: [Tab sequence description]
- **Keyboard Shortcuts**: [Available shortcuts]
- **Focus Management**: [Focus handling]

## Implementation

### HTML Structure
```html
<!-- Basic implementation -->
<div class="component-name">
  <div class="component-name__part">
    Content
  </div>
</div>
```

### CSS Classes
```css
/* Base component */
.component-name { }

/* Component parts */
.component-name__part { }

/* Modifiers */
.component-name--variant { }
.component-name--size { }

/* States */
.component-name:hover { }
.component-name:focus { }
.component-name.is-disabled { }
```

### React Implementation
```jsx
import { ComponentName } from '@/components/ui/component-name'

// Basic usage
<ComponentName>
  Content
</ComponentName>

// With props
<ComponentName
  variant="primary"
  size="medium"
  disabled={false}
  onClick={handleClick}
>
  Content
</ComponentName>
```

### Props API
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'default' | Component variant |
| size | string | 'medium' | Component size |
| disabled | boolean | false | Disabled state |
| children | ReactNode | - | Component content |
| onClick | function | - | Click handler |

## Design Tokens

### Colors
```css
/* Component-specific color tokens */
--component-bg: var(--color-background);
--component-text: var(--color-text-primary);
--component-border: var(--color-border);
```

### Typography
```css
/* Typography tokens */
--component-font-family: var(--font-family-primary);
--component-font-size: var(--font-size-base);
--component-font-weight: var(--font-weight-medium);
```

### Spacing
```css
/* Spacing tokens */
--component-padding: var(--spacing-md);
--component-margin: var(--spacing-sm);
--component-gap: var(--spacing-xs);
```

## Examples

### Basic Example
[Description of basic usage example]

```jsx
<ComponentName>
  Basic content
</ComponentName>
```

### Advanced Example
[Description of advanced usage example]

```jsx
<ComponentName
  variant="primary"
  size="large"
  icon="leading"
  onClick={handleAdvancedClick}
>
  Advanced content with icon
</ComponentName>
```

### Real-world Example
[Description of real-world usage example]

```jsx
<form onSubmit={handleSubmit}>
  <ComponentName
    variant="secondary"
    size="medium"
    type="submit"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : 'Submit Form'}
  </ComponentName>
</form>
```

## Best Practices

### Do's
- âœ… [Best practice 1]
- âœ… [Best practice 2]
- âœ… [Best practice 3]

### Don'ts
- âŒ [What to avoid 1]
- âŒ [What to avoid 2]
- âŒ [What to avoid 3]

### Performance Tips
1. **[Performance tip 1]**: [Description]
2. **[Performance tip 2]**: [Description]
3. **[Performance tip 3]**: [Description]

## Related Components

### Similar Components
- **[Component Name]**: [When to use instead]
- **[Component Name]**: [When to use instead]

### Complementary Components
- **[Component Name]**: [How they work together]
- **[Component Name]**: [How they work together]

## Resources

### Design Files
- **Figma**: [Link to Figma component]
- **Sketch**: [Link to Sketch symbol]

### Code
- **Storybook**: [Link to Storybook story]
- **GitHub**: [Link to component code]

### Documentation
- **Design System**: [Link to design system docs]
- **API Reference**: [Link to API docs]

---
**Last Updated**: [Date]
**Version**: [Version number]
**Maintained by**: Design Architect
```

---

## Template Selection Matrix

| Template Type | Use Case | Complexity | Time Required |
|---------------|----------|------------|---------------|
| Design System Foundation | Starting new design system | High | 4-8 hours |
| Design Token Specification | Defining design tokens | Medium | 2-4 hours |
| Component Specification | Designing new component | High | 3-6 hours |
| Design Review Checklist | Reviewing designs | Low | 30-60 minutes |
| Design-Development Handoff | Handing off to development | Medium | 1-3 hours |
| Design System Audit | Auditing existing system | High | 4-8 hours |
| Component Documentation | Documenting components | Medium | 2-4 hours |

## Template Customization Guidelines

### Adapting Templates
1. **Assess Project Needs**: Determine which sections are relevant
2. **Customize Content**: Modify sections to match project requirements
3. **Add Project-Specific Sections**: Include additional sections as needed
4. **Remove Irrelevant Sections**: Remove sections that don't apply

### Maintaining Templates
1. **Version Control**: Track template versions and changes
2. **Regular Updates**: Update templates based on learnings and feedback
3. **Team Input**: Gather feedback from team members using templates
4. **Best Practice Integration**: Incorporate new best practices as they emerge

### Template Quality Standards
- **Completeness**: All necessary information is included
- **Clarity**: Instructions and examples are clear and actionable
- **Consistency**: Templates follow consistent formatting and structure
- **Usability**: Templates are easy to use and understand

---

*This template guide provides comprehensive templates for all aspects of design system work. Customize these templates to match your project needs and team workflows.*
