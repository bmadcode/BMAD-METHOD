# Generate Test Files

## Purpose
Convert natural language Playwright MCP test scenarios into executable TypeScript Playwright test files. This command is only available AFTER successful completion of the `*test-story` command.

## Prerequisites
- **CRITICAL**: User must have successfully executed `*validate-scenarios` command first
- All scenarios from the interactive validation phase must have PASSED
- Natural language test scenarios must be available from the previous validation session
- Target directory structure must exist: `packages/e2e-tests/`

## Dependency Validation
Before executing this task, verify:
1. **Scenario Validation Status**: Confirm `*validate-scenarios` was completed successfully
2. **Validation Results**: All interactive scenario validation passed during Playwright MCP execution
3. **Scenario Availability**: Validated natural language scenarios are available for conversion
4. **Directory Structure**: `packages/e2e-tests/` directory exists
5. **Template Access**: `test-file-generation-tmpl.md` template is loaded

## Inputs Required
1. **Story Identifier**: Which story's test scenarios to convert (e.g., "Story 2.1")
2. **Scenario Validation Results**: Results and fixes from the interactive `*validate-scenarios` session
3. **Target Directory**: Where to save generated test files (default: `packages/e2e-tests/`)
4. **Test Types**: Which types to generate (API, E2E, Integration, or All)
5. **Interactive Fixes**: Any fixes or adjustments discovered during interactive scenario validation

## Process

### Phase 1: Validation and Setup
1. **Verify Prerequisites**
   ```
   Check that *validate-scenarios command was executed successfully
   Verify all scenario validations passed in the interactive session
   Confirm validated natural language scenarios are available
   Validate target directory structure exists
   ```

2. **Load Required Dependencies**
   ```
   Load test-file-generation-tmpl.md template
   Load the story file for context
   Load the validated natural language test scenarios from previous session
   Load any fixes or adjustments from interactive scenario validation
   ```

3. **Analyze Test Scenarios**
   ```
   Parse natural language Playwright MCP scenarios
   Categorize scenarios by type (API, E2E, Integration)
   Identify test data requirements
   Extract authentication and setup requirements
   Note any browser-specific or cross-platform requirements
   ```

### Phase 2: Test File Generation

1. **Generate API Test Files**
   ```
   Convert Playwright_get, Playwright_post, Playwright_put, Playwright_delete commands
   Transform to request-based API tests using Playwright's request context
   Include authentication setup and token management
   Add proper TypeScript interfaces for API responses
   Include error handling and edge case testing
   Generate test data fixtures
   ```

2. **Generate E2E Test Files**
   ```
   Convert Playwright_navigate, Playwright_click, Playwright_fill commands
   Transform to page-based UI tests using Playwright's page context
   Include API mocking for deterministic tests
   Add proper selectors using data-testid attributes
   Include accessibility and responsive design tests
   Add screenshot capture for visual verification
   ```

3. **Generate Integration Test Files**
   ```
   Convert complex scenarios that combine UI and API interactions
   Transform Playwright_expect_response and Playwright_assert_response commands
   Include realistic API responses and error scenarios
   Add concurrent operation testing
   Include performance and load testing scenarios
   ```

### Phase 3: Code Structure and Organization

1. **Apply Best Practices**
   ```
   Use TypeScript interfaces for type safety
   Implement proper test.describe grouping
   Add test.beforeEach and test.afterAll setup/teardown
   Include proper error handling and cleanup
   Add descriptive test names and comments
   Implement data-testid selector strategy
   ```

2. **Create Supporting Files**
   ```
   Generate test data fixtures in fixtures/ directory
   Create helper functions in utils/ directory
   Generate mock data and API responses
   Create authentication and setup utilities
   Add configuration files if needed
   ```

3. **Organize File Structure**
   ```
   packages/e2e-tests/
   ├── tests/
   │   ├── api/story-{{number}}-{{name}}.spec.ts
   │   ├── e2e/story-{{number}}-{{name}}.spec.ts
   │   └── integration/story-{{number}}-{{name}}.spec.ts
   ├── fixtures/story-{{number}}-test-data.ts
   └── utils/story-{{number}}-helpers.ts
   ```

### Phase 4: Conversion Rules Application

1. **Transform Playwright MCP Commands**
   ```
   Playwright_navigate → await page.goto()
   Playwright_fill → await page.locator().fill()
   Playwright_click → await page.locator().click()
   Playwright_get → await request.get()
   Playwright_post → await request.post()
   Playwright_screenshot → await page.screenshot()
   Playwright_console_logs → page.on('console')
   Playwright_get_visible_text → await expect().toContainText()
   ```

2. **Add Proper Assertions**
   ```
   Convert verification statements to expect() assertions
   Add status code validation for API calls
   Include response body validation
   Add UI state verification
   Include error message validation
   ```

3. **Include Interactive Fixes**
   ```
   Apply any selector fixes discovered during interactive scenario validation
   Include timing adjustments found during validation execution
   Add error handling improvements identified during validation
   Include performance optimizations discovered during validation
   ```

### Phase 5: Quality Assurance

1. **Validate Generated Code**
   ```
   Ensure TypeScript syntax is correct
   Verify all imports are included
   Check that test structure follows best practices
   Validate that all scenarios are converted
   Ensure proper error handling is included
   ```

2. **Add Documentation**
   ```
   Include comments explaining test purpose
   Add setup and execution instructions
   Document any special requirements
   Include troubleshooting notes
   Add links to related story documentation
   ```

## Output

### Generated Test Files
- **API Tests**: `packages/e2e-tests/tests/api/story-{{number}}-{{name}}.spec.ts`
- **E2E Tests**: `packages/e2e-tests/tests/e2e/story-{{number}}-{{name}}.spec.ts`
- **Integration Tests**: `packages/e2e-tests/tests/integration/story-{{number}}-{{name}}.spec.ts`

### Supporting Files
- **Test Data**: `packages/e2e-tests/fixtures/story-{{number}}-test-data.ts`
- **Helper Functions**: `packages/e2e-tests/utils/story-{{number}}-helpers.ts`
- **Configuration**: Updated playwright.config.ts if needed

### Documentation
- **Test Execution Guide**: Instructions for running the generated tests
- **Troubleshooting Guide**: Common issues and solutions
- **Maintenance Notes**: How to update tests when story changes

## Success Criteria
- All natural language scenarios are successfully converted to TypeScript
- Generated tests follow established best practices and patterns
- Tests include proper setup, teardown, and error handling
- Code is properly typed with TypeScript interfaces
- Tests are organized by type and follow naming conventions
- Supporting files (fixtures, helpers) are generated
- All interactive fixes are incorporated into the generated code
- Tests are ready for CI/CD integration

## Error Handling
- If `*validate-scenarios` was not executed first, provide clear error message and guidance
- If scenario validation failed during interactive session, require fixes before proceeding
- If target directory doesn't exist, create it or provide setup instructions
- If conversion fails, provide detailed error information and suggested fixes

## Notes
- This command builds upon the interactive validation results from `*validate-scenarios`
- Generated tests capture the knowledge and fixes from real browser scenario validation
- Tests are designed to be maintainable and follow project conventions
- The workflow ensures that only validated, working scenarios are converted to code
- Generated tests serve as regression tests for future development
