# v0 UX/UI Architect Quick Start Guide

Get up and running with the v0 UX/UI Architect persona in just 5 minutes. This guide provides everything you need to start creating beautiful, functional UI components.

## 1. Choose Your Environment

The v0 UX/UI Architect persona can be used in two environments:

### Web Environment (Veronica)
- Use with ChatGPT, Claude, or other web-based AI platforms
- Ideal for design exploration and component specification
- No setup required

### IDE Environment (Victor)
- Use with Cursor AI, Claude Code, Cline, or Roocode
- Ideal for direct code implementation
- Requires minimal setup

## 2. Activate the Persona

### Web Environment
1. Copy the contents of `bmad-agent/personas/v0-ux-ui-architect.md`
2. Paste as your first message to the AI
3. Use an activation phrase: "I need Veronica to help with UI design"

### IDE Environment
1. Copy the `bmad-agent` folder to your project root
2. Reference the persona file in your IDE's AI feature
3. Use an activation phrase: "I need Victor to implement a component"

## 3. Provide Clear Requirements

For best results, include:

- **Component Purpose**: What the component should do
- **Visual Style**: Brand colors, design system, or style references
- **Technical Requirements**: Framework, libraries, and constraints
- **User Needs**: Who will use this component and how

### Example Prompt

```
I need a product card component for an e-commerce site with the following:
- Product image, title, price, and "Add to Cart" button
- Rating display (1-5 stars)
- Badge for "Sale" or "New" items
- Responsive design (mobile and desktop)
- Using React with Tailwind CSS
- Accessible to screen readers
- Our brand colors are blue (#3b82f6) and gray (#64748b)
```

## 4. Review and Iterate

1. Review the initial design or code
2. Provide specific feedback
3. Request refinements as needed
4. Validate against requirements

## 5. Implement and Test

1. Copy the final code to your project
2. Test across different devices and browsers
3. Validate accessibility
4. Document the component for your team

## Example: Creating a Button Component

### Step 1: Activate the Persona

"I need Veronica to help design a button component system."

### Step 2: Provide Requirements

"We need a button component with primary, secondary, and outline variants. It should support different sizes (small, medium, large) and have states for hover, focus, disabled, and loading. Our brand color is purple (#8b5cf6)."

### Step 3: Review Initial Design

The v0 UX/UI Architect will provide an initial design with code implementation.

### Step 4: Provide Feedback

"The design looks good, but can we make the loading state show a spinner instead of just changing the text?"

### Step 5: Implement Final Component

```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500",
        secondary: "bg-purple-100 text-purple-900 hover:bg-purple-200 focus-visible:ring-purple-500",
        outline: "border border-purple-200 bg-transparent hover:bg-purple-100 focus-visible:ring-purple-500",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## Next Steps

- Explore the [Comprehensive Guide](./v0-ux-ui-architect-comprehensive-guide.md) for detailed information
- Check the [Integration Guide](./v0-ux-ui-architect-integration-guide.md) for workflow integration
- Review [Example Projects](../examples/) for inspiration
- Use the [Quality Assurance Guide](./v0-ux-ui-architect-quality-assurance.md) to validate your components

---

Start creating beautiful, functional UI components today with the v0 UX/UI Architect!
