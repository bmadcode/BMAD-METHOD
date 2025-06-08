# v0 UX/UI Architect Example Project

This example demonstrates how to use the v0 UX/UI Architect persona to create a complete component library for a fictional e-commerce application.

## Project Context

**Project Name:** ModernShop
**Description:** A modern e-commerce platform with a focus on user experience and accessibility.
**Target Audience:** Fashion-conscious consumers aged 25-45.
**Brand Values:** Minimalist, Premium, Sustainable, Inclusive.

## Step 1: Initial Prompt to v0 UX/UI Architect

```
I need a component library for a modern e-commerce platform called ModernShop. The brand values are minimalist, premium, sustainable, and inclusive. The target audience is fashion-conscious consumers aged 25-45. Please create a design system and core components that reflect these values.
```

## Step 2: Design System Definition

The v0 UX/UI Architect will first establish the design system foundations:

```markdown
# ModernShop Design System

## Color Palette
- Primary: #2A3B4C (Deep Navy)
- Secondary: #E8C547 (Muted Gold)
- Accent: #D66853 (Terracotta)
- Neutrals:
  - #FFFFFF (White)
  - #F7F7F7 (Off-White)
  - #E1E1E1 (Light Gray)
  - #B0B0B0 (Medium Gray)
  - #707070 (Dark Gray)
  - #303030 (Near Black)

## Typography
- Headings: "Montserrat", sans-serif (600, 700)
- Body: "Inter", sans-serif (400, 500)
- Accents: "Playfair Display", serif (400i, 600)

## Spacing System
- 4px base unit
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

## Border Radius
- Small: 2px
- Medium: 4px
- Large: 8px
- XL: 16px
- Pill: 9999px

## Shadows
- Subtle: 0 2px 4px rgba(0,0,0,0.05)
- Medium: 0 4px 8px rgba(0,0,0,0.1)
- Strong: 0 8px 16px rgba(0,0,0,0.15)
```

## Step 3: Core Component Creation

The v0 UX/UI Architect will then generate core components:

### Button Component

```tsx
// Button.tsx
import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  label,
  icon,
  disabled = false,
  fullWidth = false,
  onClick,
}) => {
  return (
    <button
      className={`ms-button ms-button--${variant} ms-button--${size} ${fullWidth ? 'ms-button--full-width' : ''}`}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {icon && <span className="ms-button__icon">{icon}</span>}
      <span className="ms-button__label">{label}</span>
    </button>
  );
};
```

### Product Card Component

```tsx
// ProductCard.tsx
import React from 'react';
import './ProductCard.css';
import { Button } from './Button';

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSustainable?: boolean;
  onAddToCart: (id: string) => void;
  onQuickView: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  isNew = false,
  isSustainable = false,
  onAddToCart,
  onQuickView,
}) => {
  return (
    <div className="ms-product-card">
      <div className="ms-product-card__image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="ms-product-card__image" />
        {isNew && <span className="ms-product-card__badge ms-product-card__badge--new">New</span>}
        {isSustainable && <span className="ms-product-card__badge ms-product-card__badge--sustainable">Eco</span>}
        <button 
          className="ms-product-card__quick-view" 
          onClick={() => onQuickView(id)}
          aria-label="Quick view"
        >
          Quick View
        </button>
      </div>
      <div className="ms-product-card__content">
        <h3 className="ms-product-card__title">{title}</h3>
        <div className="ms-product-card__price-container">
          <span className="ms-product-card__price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="ms-product-card__original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="ms-product-card__rating">
          <div className="ms-product-card__stars" style={{ '--rating': rating } as React.CSSProperties}></div>
          <span className="ms-product-card__review-count">({reviewCount})</span>
        </div>
        <Button 
          variant="secondary" 
          label="Add to Cart" 
          onClick={() => onAddToCart(id)} 
          fullWidth
        />
      </div>
    </div>
  );
};
```

## Step 4: Component Documentation

The v0 UX/UI Architect will create comprehensive documentation for each component:

```markdown
# Button Component

## Overview
The Button component is a versatile, accessible button that supports multiple variants, sizes, and states.

## Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' \| 'ghost' | No | 'primary' | The visual style of the button |
| size | 'small' \| 'medium' \| 'large' | No | 'medium' | The size of the button |
| label | string | Yes | - | The text displayed on the button |
| icon | ReactNode | No | - | Optional icon to display before the label |
| disabled | boolean | No | false | Whether the button is disabled |
| fullWidth | boolean | No | false | Whether the button should take up the full width of its container |
| onClick | () => void | No | - | Function called when the button is clicked |

## Accessibility
- Uses native button element for proper keyboard navigation
- Includes aria-label for screen readers
- Maintains 4.5:1 color contrast ratio in all states
- Focus states are clearly visible

## Usage Examples
```tsx
// Primary button
<Button label="Add to Cart" onClick={handleAddToCart} />

// Secondary button with icon
<Button 
  variant="secondary" 
  label="Favorite" 
  icon={<HeartIcon />} 
  onClick={handleFavorite} 
/>

// Disabled tertiary button
<Button 
  variant="tertiary" 
  label="Submit" 
  disabled={true} 
/>

// Full width ghost button
<Button 
  variant="ghost" 
  label="View All Products" 
  fullWidth={true} 
  onClick={handleViewAll} 
/>
```

## Step 5: IDE Implementation

For IDE environments like Cursor AI, the v0 UX/UI IDE Architect would implement the components directly in the codebase:

```
I need to implement the Button component from our ModernShop design system in our React codebase. The component should support primary, secondary, tertiary, and ghost variants, multiple sizes, and include proper accessibility features.
```

## Step 6: Quality Assurance

The v0 UX/UI Architect will run the component through the quality checklist:

```markdown
# Button Component Quality Checklist

## Design Consistency
- [x] Follows established design system patterns
- [x] Color palette matches brand guidelines
- [x] Typography scales appropriately
- [x] Spacing follows design tokens

## Code Quality
- [x] Component is properly typed (TypeScript)
- [x] Props are well-documented
- [x] Component handles edge cases gracefully
- [x] Performance optimized

## Accessibility
- [x] Semantic HTML structure
- [x] Proper ARIA labels and roles
- [x] Keyboard navigation support
- [x] Screen reader compatibility
- [x] Color contrast meets WCAG standards

## Responsive Design
- [x] Mobile-first approach
- [x] Breakpoint behavior tested
- [x] Touch-friendly interaction areas
- [x] Content reflows appropriately

## Integration
- [x] Imports/exports properly configured
- [x] Dependencies clearly documented
- [x] Integration examples provided
- [x] Storybook story created
```

## Conclusion

This example demonstrates how the v0 UX/UI Architect persona can be used to create a complete component library for a project, from design system definition to component implementation and quality assurance.
