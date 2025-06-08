# Developer Template Guide
**BMAD Method Documentation**

## Introduction

This Developer Template Guide provides a comprehensive collection of templates designed specifically for developers working within the BMAD Method framework. These templates streamline development workflows, ensure consistency, and promote best practices across projects.

## Template Categories

The developer templates are organized into six primary categories:

1. **Project Setup Templates** - For initializing new projects and components
2. **Development Templates** - For coding standards and implementation patterns
3. **Testing Templates** - For test planning and implementation
4. **Documentation Templates** - For code and API documentation
5. **Review Templates** - For code reviews and quality assurance
6. **Handoff Templates** - For transitioning completed work

## Template Library

### Project Setup Templates

#### Component Initialization Template

```typescript
/**
 * @component ComponentName
 * @description Brief description of the component's purpose
 * @author Developer Name
 * @created YYYY-MM-DD
 * 
 * @props {PropType} propName - Description of the prop
 * @returns {JSX.Element} Component JSX
 */

import React from 'react';
import { PropType } from './types';

interface ComponentNameProps {
  propName: PropType;
  // Add additional props
}

export const ComponentName: React.FC<ComponentNameProps> = ({ 
  propName,
  // Destructure additional props
}) => {
  // Component logic
  
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

#### Project Structure Template

```
project-name/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ common/
â”‚   â”‚   â”‚   â””â”€â”€ [shared components]
â”‚   â”‚   â”œâ”€â”€ features/
â”‚   â”‚   â”‚   â””â”€â”€ [feature-specific components]
â”‚   â”‚   â””â”€â”€ layouts/
â”‚   â”‚       â””â”€â”€ [layout components]
â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â””â”€â”€ [custom hooks]
â”‚   â”œâ”€â”€ utils/
â”‚   â”‚   â””â”€â”€ [utility functions]
â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â””â”€â”€ [API services]
â”‚   â”œâ”€â”€ types/
â”‚   â”‚   â””â”€â”€ [TypeScript types/interfaces]
â”‚   â”œâ”€â”€ styles/
â”‚   â”‚   â””â”€â”€ [global styles]
â”‚   â””â”€â”€ pages/
â”‚       â””â”€â”€ [page components]
â”œâ”€â”€ public/
â”‚   â””â”€â”€ [static assets]
â”œâ”€â”€ tests/
â”‚   â””â”€â”€ [test files]
â””â”€â”€ [configuration files]
```

### Development Templates

#### Component Implementation Template

```typescript
/**
 * @component FeatureComponent
 * @description Implements the [feature name] functionality
 */

import React, { useState, useEffect } from 'react';
import { useService } from '@/hooks/useService';
import { ComponentProps } from '@/types';

export const FeatureComponent: React.FC<ComponentProps> = (props) => {
  // State management
  const [data, setData] = useState<DataType>(initialState);
  
  // Service hooks
  const { fetchData, isLoading, error } = useService();
  
  // Effects
  useEffect(() => {
    // Effect logic
    const loadData = async () => {
      const result = await fetchData();
      setData(result);
    };
    
    loadData();
  }, [fetchData]);
  
  // Event handlers
  const handleAction = () => {
    // Handler logic
  };
  
  // Conditional rendering
  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent message={error.message} />;
  
  // Main render
  return (
    <div className="feature-component">
      {/* Component content */}
    </div>
  );
};
```

#### Custom Hook Template

```typescript
/**
 * @hook useFeature
 * @description Custom hook for [feature] functionality
 * @returns {Object} Hook methods and state
 */

import { useState, useEffect, useCallback } from 'react';

export function useFeature(initialValue) {
  // State
  const [state, setState] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Methods
  const doSomething = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Implementation
      const result = await someAsyncOperation();
      setState(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [/* dependencies */]);
  
  // Effects
  useEffect(() => {
    // Effect implementation
  }, [/* dependencies */]);
  
  // Return hook API
  return {
    state,
    isLoading,
    error,
    doSomething
  };
}
```

### Testing Templates

#### Component Test Template

```typescript
/**
 * @test ComponentName
 * @description Test suite for ComponentName component
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Test setup
  const defaultProps = {
    propName: 'test value'
  };
  
  beforeEach(() => {
    // Setup before each test
  });
  
  afterEach(() => {
    // Cleanup after each test
  });
  
  // Test cases
  test('renders correctly with default props', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });
  
  test('handles user interaction correctly', async () => {
    render(<ComponentName {...defaultProps} />);
    
    // Simulate user interaction
    await userEvent.click(screen.getByRole('button'));
    
    // Assert expected outcome
    expect(screen.getByText('new state')).toBeInTheDocument();
  });
  
  test('calls callback when action performed', () => {
    const mockCallback = jest.fn();
    render(<ComponentName {...defaultProps} onAction={mockCallback} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(expect.any(Object));
  });
});
```

#### Integration Test Template

```typescript
/**
 * @test FeatureIntegration
 * @description Integration tests for the Feature functionality
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FeatureContainer } from './FeatureContainer';
import { ServiceProvider } from '@/services';
import { mockService } from '@/tests/mocks';

describe('Feature Integration', () => {
  // Setup test environment
  beforeEach(() => {
    // Setup mocks and providers
  });
  
  test('completes end-to-end workflow successfully', async () => {
    // Arrange
    mockService.getData.mockResolvedValueOnce({ id: 1, name: 'Test' });
    
    // Act
    render(
      <ServiceProvider value={mockService}>
        <FeatureContainer />
      </ServiceProvider>
    );
    
    // Initial state assertions
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data load
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    
    // Interact with the feature
    await userEvent.click(screen.getByText('Perform Action'));
    
    // Assert final state
    expect(screen.getByText('Action Complete')).toBeInTheDocument();
    expect(mockService.updateData).toHaveBeenCalledWith({ id: 1, status: 'updated' });
  });
});
```

### Documentation Templates

#### API Documentation Template

```typescript
/**
 * @api ServiceName
 * @description Service for handling [functionality] operations
 */

/**
 * Fetches data from the API
 * 
 * @async
 * @function fetchData
 * @param {string} id - The identifier for the requested resource
 * @param {Object} options - Additional options for the request
 * @param {boolean} options.includeDetails - Whether to include detailed information
 * @returns {Promise<DataType>} The fetched data
 * @throws {Error} When the network request fails
 * @example
 * // Basic usage
 * const data = await fetchData('user-123');
 * 
 * // With options
 * const detailedData = await fetchData('user-123', { includeDetails: true });
 */
export async function fetchData(id, options = {}) {
  // Implementation
}
```

#### Component Documentation Template

```markdown
# ComponentName

## Overview
Brief description of the component's purpose and functionality.

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| prop1 | string | - | Yes | Description of prop1 |
| prop2 | number | 0 | No | Description of prop2 |
| prop3 | () => void | - | No | Callback when action occurs |

## Usage Examples

### Basic Usage
```jsx
import { ComponentName } from '@/components';

function MyComponent() {
  return <ComponentName prop1="value" />;
}
```

### Advanced Usage
```jsx
import { ComponentName } from '@/components';

function MyComponent() {
  const handleAction = () => {
    console.log('Action triggered');
  };

  return (
    <ComponentName 
      prop1="value"
      prop2={42}
      prop3={handleAction}
    />
  );
}
```

## Behavior

Describe the component's behavior, including:
- State management
- Side effects
- User interactions
- Error handling

## Accessibility

Accessibility considerations and implementations:
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
```

### Review Templates

#### Code Review Template

```markdown
# Code Review: [PR/Component Name]

## General Assessment
- [ ] Code follows project style guidelines
- [ ] Component/function has a single responsibility
- [ ] Logic is clear and maintainable
- [ ] Error handling is appropriate
- [ ] Performance considerations addressed

## Specific Feedback

### Strengths
- 
- 
- 

### Areas for Improvement
- 
- 
- 

### Questions
- 
- 
- 

## Testing Assessment
- [ ] Unit tests cover core functionality
- [ ] Edge cases are tested
- [ ] Mocks are used appropriately
- [ ] Test descriptions are clear

## Documentation Assessment
- [ ] Code is well-commented
- [ ] API documentation is complete
- [ ] Usage examples provided
- [ ] Complex logic is explained

## Final Recommendation
- [ ] Approve
- [ ] Approve with minor changes
- [ ] Request changes

## Additional Notes
```

#### Performance Review Template

```markdown
# Performance Review: [Component/Feature Name]

## Rendering Performance
- Initial render time: [ms]
- Re-render time: [ms]
- Memory usage: [MB]

## Network Performance
- Bundle size impact: [KB]
- API call efficiency: [description]
- Caching strategy: [description]

## Optimization Opportunities
- [ ] Memoization of expensive calculations
- [ ] Lazy loading of components
- [ ] Code splitting
- [ ] Resource preloading
- [ ] Virtualization for large lists

## Profiling Results
[Include screenshots or data from performance profiling tools]

## Recommendations
1. 
2. 
3. 

## Implementation Priority
- [ ] Critical (blocking issue)
- [ ] High (significant impact)
- [ ] Medium (noticeable improvement)
- [ ] Low (minor optimization)
```

### Handoff Templates

#### Implementation Handoff Template

```markdown
# Implementation Handoff: [Feature Name]

## Feature Overview
Brief description of the implemented feature.

## Implementation Details
- **Files Modified**:
  - `path/to/file1.tsx`: Description of changes
  - `path/to/file2.tsx`: Description of changes
  
- **New Components**:
  - `ComponentName`: Purpose and usage
  
- **Services/Hooks**:
  - `serviceName`: Purpose and API
  
- **State Management**:
  - Description of state changes and data flow

## Testing
- **Test Coverage**: XX%
- **Test Files**:
  - `path/to/test1.test.tsx`: What it tests
  - `path/to/test2.test.tsx`: What it tests
  
- **Manual Testing Scenarios**:
  1. Step-by-step scenario 1
  2. Step-by-step scenario 2

## Known Limitations
- List any known issues or limitations
- Include planned future improvements

## Dependencies
- List of external dependencies and versions
- Any specific configuration requirements

## Deployment Notes
- Special deployment considerations
- Feature flags or environment variables

## Documentation
- Links to relevant documentation
- API references
```

## Template Selection Matrix

Use this matrix to determine which templates to use based on your current development phase:

| Development Phase | Recommended Templates |
|-------------------|------------------------|
| Project Initialization | Project Structure Template, Component Initialization Template |
| Feature Development | Component Implementation Template, Custom Hook Template, API Documentation Template |
| Testing | Component Test Template, Integration Test Template |
| Code Review | Code Review Template, Performance Review Template |
| Documentation | API Documentation Template, Component Documentation Template |
| Handoff | Implementation Handoff Template |

## Template Customization Guidelines

These templates are designed to be customized for your specific project needs:

1. **Maintain Core Structure**: Keep the fundamental structure intact to ensure consistency
2. **Extend as Needed**: Add project-specific sections or fields as required
3. **Remove Irrelevant Sections**: Not all sections will apply to every component or feature
4. **Update Standards**: As project standards evolve, update templates accordingly
5. **Version Control**: Track template changes in version control

## Template Maintenance

The Developer Template Guide should be maintained as a living document:

1. **Regular Reviews**: Review templates quarterly to ensure they remain relevant
2. **Feedback Collection**: Gather developer feedback on template usability
3. **Update Process**: Follow the standard documentation update process for template changes
4. **Versioning**: Maintain version history for templates
5. **Notification**: Notify the development team of significant template changes

## Integration with Development Workflow

These templates integrate with the BMAD Method development workflow:

1. **IDE Integration**: Templates can be added as snippets in your IDE
2. **CI/CD Integration**: Templates can be used in automated checks
3. **Code Generation**: Templates can be used with code generation tools
4. **Documentation Generation**: API documentation templates can feed into automated documentation systems

---

*Last Updated: June 2025*
