# BMAD Test Scenarios: {{Story Number}} - {{Story Title}}

## Story Context
**Story**: {{Story Description}}
**Acceptance Criteria**: {{List of ACs}}
**Dependencies**: {{Story Dependencies}}

## Test Environment Setup
```
Base URL Frontend: {{Frontend URL - default: http://localhost:3000}}
Base URL Backend: {{Backend URL - default: http://localhost:8000}}
OpenAPI Documentation: {{OpenAPI URL - default: http://localhost:8000/swagger/}}
Test Database: {{Test DB connection}}
Browser Types: {{Browsers to test - default: chromium, firefox, webkit}}
```

## 🔐 Authentication & Authorization Test Scenarios

### Pre-Authentication Tests
```
Use Playwright_navigate to navigate to {{Frontend URL}}
Take a screenshot named "homepage-unauthenticated" using Playwright_screenshot
Attempt to navigate to {{protected routes}} without authentication
Verify redirect to login page occurs by checking current URL
Use Playwright_get to call {{Backend URL}}/api/protected-endpoint without token
Verify the response status code is 401 Unauthorized
```

### User Registration & Login Tests
```
Use Playwright_navigate to navigate to {{Frontend URL}}/register
Take a screenshot named "registration-page" using Playwright_screenshot
Use Playwright_fill to fill email field with selector "#email" and value "test-vendor-{{timestamp}}@example.com"
Use Playwright_fill to fill password field with selector "#password" and value "SecurePass123!"
Use Playwright_fill to fill first name field with selector "#firstName" and value "Test"
Use Playwright_fill to fill last name field with selector "#lastName" and value "Vendor"
Use Playwright_fill to fill organization field with selector "#organization" and value "Test Organization"
Use Playwright_click to click submit button with selector "button[type='submit']"
Take a screenshot named "registration-success" using Playwright_screenshot
Use Playwright_navigate to navigate to {{Frontend URL}}/login
Use Playwright_fill to fill email field with selector "#email" and value "test-vendor-{{timestamp}}@example.com"
Use Playwright_fill to fill password field with selector "#password" and value "SecurePass123!"
Use Playwright_click to click login button with selector "button[type='submit']"
Take a screenshot named "login-success" using Playwright_screenshot
Use Playwright_get_visible_text to verify dashboard content is displayed
Use Playwright_console_logs to check for any JavaScript errors during the process
```

### Role-Based Access Control Tests
```
Use Playwright_navigate to navigate to {{Frontend URL}}/login
Use Playwright_fill to fill email field with selector "#email" and value "vendor1@example.com"
Use Playwright_fill to fill password field with selector "#password" and value "SecurePass123!"
Use Playwright_click to click login button with selector "button[type='submit']"
Use Playwright_navigate to navigate to {{Frontend URL}}/dashboard
Take a screenshot named "vendor-dashboard" using Playwright_screenshot
Use Playwright_get to call {{Backend URL}}/api/admin/users with Authorization header
Verify the response status code is 403 Forbidden
Use Playwright_get to call {{Backend URL}}/api/vendor/profile with Authorization header
Verify the response status code is 200 OK and contains only current vendor's data
Use Playwright_console_logs to check for any authorization errors
```

## 🌐 API Testing Scenarios

### Endpoint Authentication Tests
```
For each API endpoint in {{OpenAPI URL}}:
  Use Playwright_get to call {{API endpoint}} without Authorization header
  Verify response status code is 401 Unauthorized
  Use Playwright_get to call {{API endpoint}} with invalid token "Bearer invalid-token"
  Verify response status code is 401 Unauthorized
  Use Playwright_get to call {{API endpoint}} with expired token "Bearer expired-token"
  Verify response status code is 401 Unauthorized
  Use Playwright_get to call {{API endpoint}} with valid token "Bearer {{valid_token}}"
  Verify response status code is 200 OK or appropriate success code
```

### CRUD Operations Tests
```
{{For each model/resource in the story}}:
Create {{resource}} via API:
  Use Playwright_post to call {{API endpoint}} with valid JSON data and Authorization header
  Verify response status code is 201 Created
  Store the created resource ID from response for future tests
  Verify response contains all expected fields

Read {{resource}} via API:
  Use Playwright_get to call {{API endpoint}}/{{stored_id}} with Authorization header
  Verify response status code is 200 OK
  Verify response data matches the created resource
  Verify all expected fields are present

Update {{resource}} via API:
  Use Playwright_put to call {{API endpoint}}/{{stored_id}} with modified JSON data and Authorization header
  Verify response status code is 200 OK
  Verify changes are reflected in the response
  Use Playwright_get to verify the changes persisted

Delete {{resource}} via API:
  Use Playwright_delete to call {{API endpoint}}/{{stored_id}} with Authorization header
  Verify response status code is 204 No Content
  Use Playwright_get to call {{API endpoint}}/{{stored_id}} and verify 404 Not Found
```

### Data Validation Tests
```
Test API input validation:
  Use Playwright_post to call {{API endpoint}} with missing required fields and Authorization header
  Verify response status code is 400 Bad Request
  Use Playwright_post to call {{API endpoint}} with invalid data types and Authorization header
  Verify response status code is 400 Bad Request
  Use Playwright_post to call {{API endpoint}} with data exceeding length limits and Authorization header
  Verify response status code is 400 Bad Request
  Use Playwright_post to call {{API endpoint}} with invalid email format and Authorization header
  Verify response status code is 400 Bad Request
  Use Playwright_post to call {{API endpoint}} with SQL injection payload and Authorization header
  Verify response is properly sanitized and returns 400 Bad Request
  Use Playwright_post to call {{API endpoint}} with XSS payload and Authorization header
  Verify response is properly escaped and returns 400 Bad Request
```

## 🖥️ Frontend E2E Test Scenarios

### User Journey Tests
```
Complete User Journey: {{Primary user flow from story}}
Use Playwright_navigate to navigate to {{Frontend URL}}
Take a screenshot named "journey-start" using Playwright_screenshot
{{Step-by-step user actions using Playwright_click, Playwright_fill, Playwright_select}}
Use Playwright_screenshot to take screenshots at each key step
Use Playwright_get_visible_text to verify page content at each step
Use Playwright_console_logs to check for errors during the journey
Verify final state matches expected outcome using Playwright_get_visible_html
Take a final screenshot named "journey-complete" using Playwright_screenshot
```

### Form Interaction Tests
```
{{For each form in the story}}:
Use Playwright_navigate to navigate to {{form page}}
Take a screenshot named "form-initial" using Playwright_screenshot
Test form validation:
  Use Playwright_click to submit empty form with selector "button[type='submit']"
  Use Playwright_get_visible_text to verify validation errors are displayed
  Use Playwright_fill to enter invalid data in form fields
  Use Playwright_click to submit form and verify field-specific errors
  Use Playwright_fill to enter valid data in all form fields
  Use Playwright_click to submit form and verify successful submission
Test form accessibility:
  Use Playwright_press_key to navigate through form using Tab key
  Use Playwright_get_visible_html to verify ARIA labels are present
  Use Playwright_press_key with "Enter" to submit form using keyboard
  Use Playwright_console_logs to check for accessibility warnings
```

### Responsive Design Tests
```
Test on different viewport sizes:
  Use Playwright_navigate with width=1920 and height=1080 to test desktop view
  Take a screenshot named "desktop-view" using Playwright_screenshot
  Use Playwright_navigate with width=768 and height=1024 to test tablet view
  Take a screenshot named "tablet-view" using Playwright_screenshot
  Use Playwright_navigate with width=375 and height=667 to test mobile view
  Take a screenshot named "mobile-view" using Playwright_screenshot
Verify layout adapts correctly by comparing screenshots
Use Playwright_get_visible_html to verify responsive elements are present
Use Playwright_console_logs to check for responsive design warnings
```

## 🔒 Security Test Scenarios

### Authentication Security Tests
```
Test password security:
  Use Playwright_post to call {{Backend URL}}/api/auth/register with weak password
  Verify response status code is 400 Bad Request with password complexity error
  Use Playwright_post to call {{Backend URL}}/api/auth/register with valid password
  Verify password is hashed by checking database (passwords not stored in plain text)
  Use Playwright_navigate to login and wait for session timeout
  Verify automatic logout occurs after timeout period
  Use Playwright_console_logs to verify secure token storage implementation

Test CSRF protection:
  Use Playwright_post to attempt CSRF attack on state-changing operations without CSRF token
  Verify response status code is 403 Forbidden
  Use Playwright_post with valid CSRF token and verify operation succeeds

Test rate limiting:
  Use Playwright_post to attempt multiple rapid login attempts (6+ times)
  Verify rate limiting kicks in after threshold (typically 5 attempts)
  Use Playwright_get to test API rate limiting on all endpoints
  Verify appropriate rate limiting headers are returned
```

### Data Security Tests
```
Test data isolation:
  Use Playwright_post to create data as User A with Authorization header for User A
  Store the created resource ID for testing
  Use Playwright_navigate to login as User B
  Use Playwright_get to attempt accessing User A's data with User B's token
  Verify response status code is 403 Forbidden or 404 Not Found
  Use Playwright_get to call User A's resource endpoint directly with User B's token
  Verify proper access control is enforced

Test input sanitization:
  Use Playwright_fill to submit forms with XSS payloads like "<script>alert('xss')</script>"
  Use Playwright_get_visible_html to verify output is properly escaped
  Use Playwright_post to test SQL injection in all input fields with payloads like "'; DROP TABLE users; --"
  Verify database queries are parameterized and injection attempts fail safely
  Use Playwright_console_logs to check for security warnings or errors
```

## 🔗 Integration Test Scenarios

### Frontend-Backend Integration
```
Test API communication:
  Use Playwright_navigate to navigate to {{Frontend URL}}
  Use Playwright_expect_response to set up monitoring for API calls with id "api-call-1"
  Use Playwright_click to trigger an action that makes API calls
  Use Playwright_assert_response to verify the API call was made correctly with id "api-call-1"
  Use Playwright_console_logs to verify no network errors occurred
  Simulate network timeout by using Playwright_evaluate to modify network conditions
  Verify error handling displays appropriate user messages
  Use Playwright_get_visible_text to verify loading states are shown during API calls
```

### Database Integration Tests
```
Test data persistence:
  Use Playwright_navigate to navigate to {{Frontend URL}}/create-form
  Use Playwright_fill to enter data in form fields
  Use Playwright_click to submit the form
  Use Playwright_get to call {{Backend URL}}/api/resource/{{id}} to verify data exists in database
  Use Playwright_navigate to navigate to {{Frontend URL}}/edit-form/{{id}}
  Use Playwright_fill to modify data in form fields
  Use Playwright_click to submit the updated form
  Use Playwright_get to call {{Backend URL}}/api/resource/{{id}} to verify database reflects changes
  Use Playwright_navigate to navigate to {{Frontend URL}}/delete/{{id}}
  Use Playwright_click to confirm deletion
  Use Playwright_get to call {{Backend URL}}/api/resource/{{id}} and verify 404 Not Found response
```

## 🌍 Cross-Browser Compatibility Tests

### Browser-Specific Tests
```
For Chrome browser (browserType="chromium"):
  Use Playwright_navigate with browserType="chromium" to navigate to {{Frontend URL}}
  Execute all critical user journeys using Playwright_click, Playwright_fill, Playwright_select
  Use Playwright_console_logs to verify JavaScript functionality works without errors
  Test form submissions and validations using Playwright_fill and Playwright_click
  Take screenshots using Playwright_screenshot to verify responsive design renders correctly
  Test authentication flows using Playwright_navigate, Playwright_fill, Playwright_click
  Use Playwright_expect_response and Playwright_assert_response to verify API calls function properly

For Firefox browser (browserType="firefox"):
  Use Playwright_navigate with browserType="firefox" to navigate to {{Frontend URL}}
  Repeat all critical tests with Firefox-specific browser engine
  Use Playwright_console_logs to check for Firefox-specific JavaScript issues
  Take screenshots using Playwright_screenshot to compare rendering differences

For Safari/WebKit browser (browserType="webkit"):
  Use Playwright_navigate with browserType="webkit" to navigate to {{Frontend URL}}
  Repeat all critical tests with WebKit-specific browser engine
  Use Playwright_console_logs to check for Safari-specific JavaScript issues
  Take screenshots using Playwright_screenshot to compare rendering differences
```

## 📊 Performance Test Scenarios

### Load Time Tests
```
Navigate to {{key pages}} and measure performance:
  Use Playwright_navigate to navigate to {{Frontend URL}} (Homepage)
  Use Playwright_console_logs to check for performance warnings
  Take a screenshot named "homepage-loaded" using Playwright_screenshot
  Use Playwright_navigate to navigate to {{Frontend URL}}/dashboard
  Use Playwright_console_logs to check for performance warnings
  Take a screenshot named "dashboard-loaded" using Playwright_screenshot
  Use Playwright_navigate to navigate to {{Frontend URL}}/forms
  Use Playwright_console_logs to check for performance warnings
  Use Playwright_evaluate to simulate slow network conditions with JavaScript
  Use Playwright_navigate to reload pages and verify acceptable load times
```

### API Performance Tests
```
Test API response times:
  Use Playwright_get to call {{Backend URL}}/api/endpoint and measure response time
  Verify single requests respond within 500ms threshold
  Use Playwright_post to call {{Backend URL}}/api/bulk-operation with large dataset
  Verify bulk operations respond within 2 seconds threshold
  Use Playwright_evaluate to make concurrent API requests using JavaScript
  Use Playwright_console_logs to monitor for performance warnings
  Use Playwright_get to call database-intensive endpoints and verify query optimization
```

## 🚨 Error Handling Test Scenarios

### Network Error Tests
```
Simulate network failures:
  Use Playwright_navigate to navigate to {{Frontend URL}}/form
  Use Playwright_fill to fill form fields with test data
  Use Playwright_evaluate to simulate network disconnection using JavaScript
  Use Playwright_click to submit form during network failure
  Use Playwright_get_visible_text to verify graceful error handling message is displayed
  Use Playwright_evaluate to restore network connection
  Use Playwright_click to test retry mechanisms
  Use Playwright_console_logs to verify user feedback for network errors
```

### Server Error Tests
```
Test server error responses:
  Use Playwright_evaluate to mock 500 Internal Server Error responses
  Use Playwright_navigate to trigger actions that would cause server errors
  Use Playwright_get_visible_text to verify user-friendly error messages are displayed
  Use Playwright_console_logs to verify error logging and monitoring
  Use Playwright_get_visible_html to verify application doesn't crash and maintains structure
  Use Playwright_screenshot to document error states for debugging
```

## 📝 Test Execution Checklist

- [ ] All authentication scenarios pass
- [ ] All API endpoints tested with proper auth
- [ ] All user journeys complete successfully
- [ ] Security tests pass (no vulnerabilities found)
- [ ] Cross-browser compatibility verified
- [ ] Performance benchmarks met
- [ ] Error handling scenarios tested
- [ ] Database integrity maintained
- [ ] No console errors in browser
- [ ] All accessibility requirements met

## 🎯 Success Criteria

**Story is considered fully tested when:**
1. All acceptance criteria are validated through automated tests
2. Security audit shows no vulnerabilities
3. All API endpoints function correctly with proper authentication
4. User journeys work across all supported browsers
5. Performance meets established benchmarks
6. Error scenarios are handled gracefully
7. Data integrity is maintained throughout all operations

## 📋 Manual Verification Steps

{{Include any manual steps that cannot be automated}}

## 🔄 Regression Test Scenarios

{{Include tests for previously implemented features that might be affected}}
