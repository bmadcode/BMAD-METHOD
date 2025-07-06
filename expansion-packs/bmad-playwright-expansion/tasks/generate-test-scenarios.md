# Generate Test Scenarios

## Purpose
Generate comprehensive natural language test scenarios for a user story using the BMAD methodology, without executing them. These scenarios can be used for manual testing or later automated execution with Playwright MCP.

## Prerequisites
- Access to the story file to be analyzed
- Understanding of the application architecture
- Knowledge of authentication and authorization requirements
- Access to API documentation (OpenAPI/Swagger)

## Inputs Required
1. **Story Identifier**: Which story to generate scenarios for (e.g., "Story 2.1", "docs/stories/2.1.story.md")
2. **Environment Details**: 
   - Frontend URL (default: http://localhost:3000)
   - Backend URL (default: http://localhost:8000)
   - OpenAPI URL (default: http://localhost:8000/swagger/)
3. **Test Focus Areas**: Which areas to emphasize (API, E2E, Security, Performance, etc.)
4. **Output Format**: Where to save the generated scenarios

## Process

### Phase 1: Story Analysis
1. **Read and parse the story file**
   - Extract story title, description, and acceptance criteria
   - Identify user roles involved (vendor, admin, etc.)
   - Note technical requirements and constraints
   - Identify dependencies on other stories

2. **Identify test scope**
   - List all API endpoints mentioned or implied
   - Identify frontend pages and components
   - Note authentication and authorization requirements
   - Identify data models and relationships

3. **Extract security requirements**
   - Authentication mechanisms
   - Authorization rules
   - Data access controls
   - Input validation requirements

### Phase 2: Test Scenario Generation
1. **Use bmad-test-scenarios-tmpl as base template**
   - Fill in story-specific information
   - Customize scenarios based on story requirements
   - Add story-specific edge cases

2. **Generate Authentication & Authorization scenarios**
   ```
   Based on story requirements, create scenarios for:
   - User registration (if applicable)
   - User login flows
   - Role-based access control
   - Session management
   - Token handling
   - Unauthorized access attempts
   ```

3. **Generate API Testing scenarios**
   ```
   For each API endpoint in the story:
   - Authentication testing (401, 403 scenarios)
   - CRUD operation testing
   - Input validation testing
   - Error handling testing
   - Rate limiting testing
   - Security testing (SQL injection, XSS)
   ```

4. **Generate Frontend E2E scenarios**
   ```
   Based on acceptance criteria:
   - Complete user journey scenarios
   - Form interaction scenarios
   - Navigation scenarios
   - Responsive design scenarios
   - Accessibility scenarios
   ```

5. **Generate Integration scenarios**
   ```
   - Frontend-backend communication
   - Database integration
   - Third-party service integration (if applicable)
   - Error propagation scenarios
   ```

6. **Generate Security scenarios**
   ```
   - Authentication security
   - Data isolation testing
   - Input sanitization
   - CSRF protection
   - XSS prevention
   - SQL injection prevention
   ```

7. **Generate Performance scenarios**
   ```
   - Page load time testing
   - API response time testing
   - Concurrent user testing
   - Database query optimization
   ```

8. **Generate Cross-browser scenarios**
   ```
   - Browser compatibility testing
   - JavaScript functionality across browsers
   - Responsive design across browsers
   ```

### Phase 3: Edge Case Identification
1. **Identify boundary conditions**
   - Maximum/minimum input values
   - Empty/null data scenarios
   - Large dataset scenarios
   - Concurrent operation scenarios

2. **Identify failure scenarios**
   - Network failures
   - Server errors
   - Database connection issues
   - Invalid user inputs
   - Expired sessions/tokens

3. **Identify security edge cases**
   - Privilege escalation attempts
   - Data leakage scenarios
   - Session hijacking attempts
   - Brute force attack scenarios

### Phase 4: Scenario Documentation
1. **Format scenarios in natural language**
   - Use clear, actionable language
   - Include expected outcomes
   - Specify verification steps
   - Add context and prerequisites

2. **Organize scenarios by category**
   - Group related scenarios together
   - Prioritize by importance/risk
   - Add execution order dependencies
   - Include setup and teardown steps

3. **Add execution metadata**
   - Estimated execution time
   - Required test data
   - Browser requirements
   - Environment prerequisites

## Output Format

### Generated Test Scenarios Document
The output will be a comprehensive test scenarios document based on the bmad-test-scenarios-tmpl template, customized for the specific story, including:

1. **Story Context Section**
   - Story description and acceptance criteria
   - Dependencies and prerequisites
   - Environment setup instructions

2. **Authentication & Authorization Scenarios**
   - Pre-authentication tests
   - Registration and login flows
   - Role-based access control tests

3. **API Testing Scenarios**
   - Endpoint authentication tests
   - CRUD operation tests
   - Data validation tests

4. **Frontend E2E Scenarios**
   - User journey tests
   - Form interaction tests
   - Responsive design tests

5. **Security Test Scenarios**
   - Authentication security tests
   - Data security tests
   - Input validation tests

6. **Integration Test Scenarios**
   - Frontend-backend integration
   - Database integration tests

7. **Cross-Browser Compatibility Scenarios**
   - Browser-specific tests

8. **Performance Test Scenarios**
   - Load time tests
   - API performance tests

9. **Error Handling Scenarios**
   - Network error tests
   - Server error tests

10. **Execution Checklist**
    - Success criteria
    - Manual verification steps
    - Regression test scenarios

## Usage Instructions

### For Manual Testing
- Use scenarios as step-by-step testing instructions
- Execute scenarios in order of priority
- Document results and issues found
- Use checklist to track completion

### For Automated Testing with Playwright MCP
- Use scenarios as natural language prompts for Playwright MCP
- Execute scenarios through AI agent with Playwright MCP integration
- Combine multiple scenarios for comprehensive test runs
- Use for continuous integration testing

### For Documentation
- Scenarios serve as living documentation of expected behavior
- Use for onboarding new team members
- Reference for understanding system requirements
- Basis for future test automation

## Quality Criteria

### Comprehensive Coverage
- All acceptance criteria are covered by test scenarios
- Edge cases and failure scenarios are included
- Security considerations are thoroughly addressed
- Performance requirements are validated

### Clear and Actionable
- Scenarios are written in clear, unambiguous language
- Steps are specific and executable
- Expected outcomes are clearly defined
- Prerequisites and setup are documented

### Maintainable
- Scenarios are organized logically
- Dependencies are clearly marked
- Test data requirements are specified
- Scenarios can be easily updated as requirements change

## Notes
- Generated scenarios follow BMAD methodology principles
- Scenarios are designed to work with Playwright MCP's natural language interface
- Focus on behavior-driven testing approach
- Scenarios can be executed manually or automated
- Output serves as both test plan and documentation
