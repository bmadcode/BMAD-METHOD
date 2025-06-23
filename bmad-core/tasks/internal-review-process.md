# Internal Review Process Task

## Purpose
Perform systematic code review using industry-standard criteria to ensure quality, security, performance, and architectural compliance.

## When to Use
This task should be executed when:
- Task complexity exceeds `agentThresholdTask` from `core-config.yml`
- User explicitly requests review mode
- Story complexity exceeds `agentThresholdStory`

## Process

### Section 1: Task Complexity Assessment

1.  **Mandatory Task Complexity Assessment**:
    -   Evaluate the complexity of the *current task* using Fibonacci scale (1, 2, 3, 5, 8, 13), leveraging the initial semantic search results.
    -   Compare the `Task Complexity` score against the `agentThresholdTask` value from `core-config.yml`.

2.  **Review Decision**:
    -   If `Task Complexity` > `agentThresholdTask`, proceed with internal review process.
    -   If `Task Complexity` ≤ `agentThresholdTask`, implement directly without review loop.
    -   Log the complexity score and decision in the story's `Dev Notes`.

### Section 2: Implementation & Review Loop

3.  **Critique as Reviewer**: As "The Reviewer," analyze the proposed code against the following criteria:
    *   **Code Duplication**: "Does this logic already exist in [file/function from semantic search]? If so, fail."
    *   **Syntax & Errors**: "Are there obvious syntax, linting, or TypeScript errors? If so, fail."
    *   **Standards Alignment**: "Does this align with the project's coding standards and the patterns discovered in the initial analysis? If not, fail."
    *   **Security Vulnerabilities**: "Does this introduce security risks (input validation, authentication, data exposure, hardcoded secrets)? If so, fail."
    *   **Performance Impact**: "Could this cause performance issues (N+1 queries, memory leaks, inefficient algorithms, excessive resource usage)? If so, fail."
    *   **Architecture Compliance**: "Does this violate separation of concerns, SOLID principles, or established architectural patterns? If so, fail."

4.  **Review Outcome**:
    -   **If any criteria fail**: Reject the code, explain the specific failure, and iterate with improvements.
    -   **If all criteria pass**: Accept the code and proceed to implementation.
    -   **Maximum iterations**: Limit to 3 attempts to prevent infinite loops.

5.  **Review Summary Documentation**:
    -   Document the review process in the story's `Dev Notes`:

    ```markdown
    **Internal Review Summary for Task [Task #]**
    - **Submissions**: [Number]
    - **Failed Attempts**:
        - **Attempt 1**: [Describe problematic code briefly and why it failed, e.g., "Created duplicate login logic already present in `auth.service.ts`." or "Introduced SQL injection vulnerability in user query."]
        - **Attempt N**: ...
    - **Final Solution**: [Describe the approved approach, e.g., "Refactored to use the existing `authenticateUser` function from `auth.service.ts` with proper input sanitization."]
    - **Lessons Learned**: [Note any new patterns or insights, e.g., "All authentication logic must be centralized in the auth service; direct token manipulation is an anti-pattern in this codebase. Always validate user inputs before database queries."]
    ```

## Review Criteria Details

### Code Duplication
- Check against semantic search results from analysis phase
- Identify existing functions, components, or patterns
- Ensure reuse over recreation

### Syntax & Errors
- Validate language-specific syntax
- Check for linting violations
- Verify TypeScript type safety

### Standards Alignment
- Ensure consistency with project coding standards
- Follow established patterns from codebase analysis
- Maintain architectural consistency

### Security Vulnerabilities
- Input validation and sanitization
- Authentication and authorization checks
- Data exposure prevention
- Hardcoded secrets detection

### Performance Impact
- Database query optimization (N+1 prevention)
- Memory leak prevention
- Algorithm efficiency
- Resource usage optimization

### Architecture Compliance
- Separation of concerns validation
- SOLID principles adherence
- Established pattern compliance
- Modularity and maintainability

## Output

- Review decision (pass/fail with specific criteria)
- Detailed failure explanations for iterations
- Final review summary in Dev Notes
- Lessons learned for future reference

## Dependencies

- Access to `core-config.yml` for threshold settings
- Results from story analysis (semantic search, patterns)
- Code implementation to review
- Story file for Dev Notes documentation
