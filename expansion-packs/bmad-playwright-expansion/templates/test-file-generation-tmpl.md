# Test File Generation Template

## Story Context
**Story**: {{Story Number}} - {{Story Title}}
**Test Execution Status**: {{Must be PASSED - verified through *test-story command}}
**Interactive Testing Fixes**: {{Capture any fixes discovered during Playwright MCP testing}}

## Test File Structure

### API Tests Template
```typescript
import { test, expect } from '@playwright/test';

// Define TypeScript interfaces for API responses
interface {{ResourceName}}Response {
  id: number;
  {{additional_fields_based_on_story}};
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

interface ErrorResponse {
  error: string;
  details?: string[];
}

test.describe('{{Story Title}} - API Tests', () => {
  let authToken: string;
  let testUserId: number;

  test.beforeAll(async ({ request }) => {
    // Setup: Create test user and get authentication token
    const registerResponse = await request.post('/api/auth/register/', {
      data: {
        email: 'test-{{timestamp}}@example.com',
        password: 'SecurePass123!',
        first_name: 'Test',
        last_name: 'User',
        organization_name: 'Test Org'
      }
    });
    expect(registerResponse.status()).toBe(201);

    const loginResponse = await request.post('/api/auth/login/', {
      data: {
        email: 'test-{{timestamp}}@example.com',
        password: 'SecurePass123!'
      }
    });
    expect(loginResponse.status()).toBe(200);
    
    const authData: AuthResponse = await loginResponse.json();
    authToken = authData.access;
    testUserId = authData.user.id;
  });

  test.afterAll(async ({ request }) => {
    // Cleanup: Remove test data
    if (testUserId) {
      await request.delete(`/api/users/${testUserId}/`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    }
  });

  {{API_TEST_SCENARIOS}}

  test('should handle authentication errors correctly', async ({ request }) => {
    const response = await request.get('/api/{{protected_endpoint}}/', {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    
    expect(response.status()).toBe(401);
    const errorData: ErrorResponse = await response.json();
    expect(errorData).toHaveProperty('error');
  });

  test('should handle authorization errors correctly', async ({ request }) => {
    // Test with valid token but insufficient permissions
    const response = await request.get('/api/admin/{{admin_endpoint}}/', {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    
    expect(response.status()).toBe(403);
  });
});
```

### E2E Tests Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('{{Story Title}} - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses for consistent testing
    await page.route('**/api/auth/login/', async route => {
      const request = route.request();
      const body = await request.postDataJSON();
      
      if (body.email === 'test@example.com' && body.password === 'SecurePass123!') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            access: 'mock-jwt-token',
            refresh: 'mock-refresh-token',
            user: { id: 1, email: 'test@example.com', role: 'vendor' }
          })
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Invalid credentials' })
        });
      }
    });

    {{ADDITIONAL_API_MOCKS}}

    await page.goto('/');
  });

  {{E2E_TEST_SCENARIOS}}

  test('should handle network errors gracefully', async ({ page }) => {
    // Simulate network failure
    await page.route('**/api/**', route => route.abort());
    
    await page.goto('/{{test_page}}');
    
    // Verify error handling
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Network error');
  });

  test('should maintain accessibility standards', async ({ page }) => {
    await page.goto('/{{test_page}}');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    // Test ARIA labels
    const form = page.locator('form');
    await expect(form).toHaveAttribute('aria-label');
  });
});
```

### Integration Tests Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('{{Story Title}} - Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up realistic API responses
    await page.route('**/api/{{resource}}/**', async route => {
      const method = route.request().method();
      const url = route.request().url();
      
      if (method === 'GET' && url.includes('/api/{{resource}}/')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({{mock_data}})
        });
      } else if (method === 'POST') {
        const body = await route.request().postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ id: Date.now(), ...body })
        });
      }
    });

    await page.goto('/{{test_page}}');
  });

  {{INTEGRATION_TEST_SCENARIOS}}

  test('should handle concurrent operations correctly', async ({ page }) => {
    // Test multiple simultaneous actions
    const promises = [
      page.click('[data-testid="action-1"]'),
      page.click('[data-testid="action-2"]'),
      page.click('[data-testid="action-3"]')
    ];
    
    await Promise.all(promises);
    
    // Verify final state is consistent
    await expect(page.locator('[data-testid="status"]')).toContainText('All operations completed');
  });
});
```

## Test Scenario Conversion Rules

### Natural Language → TypeScript Conversion

**Playwright MCP**: `Use Playwright_navigate to navigate to {{URL}}`
**TypeScript**: `await page.goto('{{URL}}');`

**Playwright MCP**: `Use Playwright_fill to fill {{field}} with selector "{{selector}}" and value "{{value}}"`
**TypeScript**: `await page.locator('{{selector}}').fill('{{value}}');`

**Playwright MCP**: `Use Playwright_click to click {{element}} with selector "{{selector}}"`
**TypeScript**: `await page.locator('{{selector}}').click();`

**Playwright MCP**: `Use Playwright_get to call {{API_URL}} with Authorization header`
**TypeScript**:
```typescript
const response = await request.get('{{API_URL}}', {
  headers: { Authorization: `Bearer ${authToken}` }
});
expect(response.status()).toBe(200);
```

**Playwright MCP**: `Use Playwright_post to call {{API_URL}} with JSON body`
**TypeScript**:
```typescript
const response = await request.post('{{API_URL}}', {
  data: {{JSON_BODY}},
  headers: { Authorization: `Bearer ${authToken}` }
});
expect(response.status()).toBe(201);
```

**Playwright MCP**: `Use Playwright_screenshot to take screenshot named "{{name}}"`
**TypeScript**: `await page.screenshot({ path: 'screenshots/{{name}}.png' });`

**Playwright MCP**: `Use Playwright_console_logs to check for errors`
**TypeScript**:
```typescript
page.on('console', msg => {
  if (msg.type() === 'error') {
    console.error('Console error:', msg.text());
  }
});
```

**Playwright MCP**: `Use Playwright_get_visible_text to verify {{content}}`
**TypeScript**: `await expect(page.locator('{{selector}}')).toContainText('{{content}}');`

**Playwright MCP**: `Verify response status code is {{status}}`
**TypeScript**: `expect(response.status()).toBe({{status}});`

**Playwright MCP**: `Use Playwright_select to select {{option}} with selector "{{selector}}"`
**TypeScript**: `await page.locator('{{selector}}').selectOption('{{option}}');`

**Playwright MCP**: `Use Playwright_hover to hover over {{element}} with selector "{{selector}}"`
**TypeScript**: `await page.locator('{{selector}}').hover();`

**Playwright MCP**: `Use Playwright_press_key to press "{{key}}"`
**TypeScript**: `await page.keyboard.press('{{key}}');`

**Playwright MCP**: `Use Playwright_expect_response to monitor API calls with id "{{id}}"`
**TypeScript**:
```typescript
const responsePromise = page.waitForResponse(response =>
  response.url().includes('{{endpoint}}') && response.status() === 200
);
```

**Playwright MCP**: `Use Playwright_assert_response to validate response with id "{{id}}"`
**TypeScript**:
```typescript
const response = await responsePromise;
const data = await response.json();
expect(data).toHaveProperty('{{expected_property}}');
```

## File Organization Structure

```
packages/e2e-tests/
├── tests/
│   ├── api/
│   │   └── story-{{story_number}}-{{story_name}}.spec.ts
│   ├── e2e/
│   │   └── story-{{story_number}}-{{story_name}}.spec.ts
│   └── integration/
│       └── story-{{story_number}}-{{story_name}}.spec.ts
├── fixtures/
│   └── story-{{story_number}}-test-data.ts
└── utils/
    └── story-{{story_number}}-helpers.ts
```

## Test Data and Fixtures

```typescript
// fixtures/story-{{story_number}}-test-data.ts
export const testData = {
  validUser: {
    email: 'test-user@example.com',
    password: 'SecurePass123!',
    firstName: 'Test',
    lastName: 'User',
    organization: 'Test Organization'
  },
  invalidUser: {
    email: 'invalid-email',
    password: '123',
    firstName: '',
    lastName: ''
  },
  apiEndpoints: {
    register: '/api/auth/register/',
    login: '/api/auth/login/',
    profile: '/api/users/profile/',
    {{additional_endpoints}}
  }
};

export const mockResponses = {
  successfulLogin: {
    access: 'mock-jwt-token',
    refresh: 'mock-refresh-token',
    user: { id: 1, email: 'test@example.com', role: 'vendor' }
  },
  registrationSuccess: {
    message: 'Registration successful',
    user: { id: 1, email: 'test@example.com' }
  },
  {{additional_mocks}}
};
```

## Helper Functions

```typescript
// utils/story-{{story_number}}-helpers.ts
import { Page, Request } from '@playwright/test';

export class TestHelpers {
  static async loginUser(page: Page, email: string, password: string) {
    await page.goto('/login');
    await page.locator('[data-testid="email"]').fill(email);
    await page.locator('[data-testid="password"]').fill(password);
    await page.locator('[data-testid="login-button"]').click();
  }

  static async createTestUser(request: Request) {
    const response = await request.post('/api/auth/register/', {
      data: {
        email: `test-${Date.now()}@example.com`,
        password: 'SecurePass123!',
        first_name: 'Test',
        last_name: 'User'
      }
    });
    return response.json();
  }

  static async cleanupTestData(request: Request, userId: number, authToken: string) {
    await request.delete(`/api/users/${userId}/`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
  }

  {{additional_helpers}}
}
```
