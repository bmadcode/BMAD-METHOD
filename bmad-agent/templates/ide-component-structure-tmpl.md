# IDE Component Structure Template

## File Structure

\`\`\`
{component-name}/
├── index.ts                 # Main export file
├── {component-name}.tsx     # Component implementation
├── {component-name}.test.tsx # Component tests
├── {component-name}.module.css # Component styles (if using CSS modules)
├── {component-name}.stories.tsx # Storybook stories (if applicable)
└── types.ts                 # TypeScript types (if complex enough to warrant separation)
\`\`\`

## Component Implementation File ({component-name}.tsx)

\`\`\`tsx
import React from 'react';
import styles from './{component-name}.module.css'; // If using CSS modules

// Types
interface {ComponentName}Props {
  // Props definition
}

/**
 * {ComponentName} - {Brief description}
 * 
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export const {ComponentName} = ({
  // Destructured props with defaults
}: {ComponentName}Props): JSX.Element => {
  // State hooks
  
  // Effect hooks
  
  // Handler functions
  
  // Helper functions
  
  // Render
  return (
    // JSX implementation
  );
};

export default {ComponentName};
\`\`\`

## Test File ({component-name}.test.tsx)

\`\`\`tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { {ComponentName} } from './{component-name}';

describe('{ComponentName}', () => {
  it('renders correctly', () => {
    // Test implementation
  });
  
  it('handles interactions correctly', () => {
    // Test implementation
  });
  
  it('applies correct styles for different states', () => {
    // Test implementation
  });
  
  // Additional tests
});
\`\`\`

## Storybook File ({component-name}.stories.tsx)

\`\`\`tsx
import type { Meta, StoryObj } from '@storybook/react';
import { {ComponentName} } from './{component-name}';

const meta: Meta<typeof {ComponentName}> = {
  title: 'Components/{ComponentName}',
  component: {ComponentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Arg types definition
  },
};

export default meta;
type Story = StoryObj<typeof {ComponentName}>;

export const Default: Story = {
  args: {
    // Default props
  },
};

export const Variant: Story = {
  args: {
    // Variant props
  },
};

// Additional stories
\`\`\`

## Index File (index.ts)

\`\`\`tsx
export { {ComponentName} } from './{component-name}';
export type { {ComponentName}Props } from './types'; // If using separate types file
\`\`\`

## Types File (types.ts) - If needed

\`\`\`tsx
export interface {ComponentName}Props {
  // Props definition
}

// Additional types
\`\`\`

## Usage Example

\`\`\`tsx
import { {ComponentName} } from 'components/{component-name}';

const MyPage = () => {
  return (
    <div>
      <{ComponentName} 
        // Props
      />
    </div>
  );
};
