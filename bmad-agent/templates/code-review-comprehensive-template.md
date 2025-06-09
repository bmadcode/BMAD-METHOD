---
template_id: "code-review-comprehensive"
template_name: "Comprehensive Code Review Template"
version: "1.0.0"
category: "persona"
personas: ["polyglot-code-review-specialist", "technical-documentation-architect"]
technologies: ["react", "typescript", "nodejs", "aspnet", "python"]
complexity: "intermediate"
estimated_time: "30-60 minutes"
dependencies: ["code-implementation", "technical-standards"]
tags: ["code-review", "quality-assurance", "best-practices", "polyglot"]
---

# Code Review: {{REVIEW_TITLE}}

## Review Overview
**Review ID:** {{REVIEW_ID}}  
**Author:** {{CODE_AUTHOR}}  
**Reviewer:** {{REVIEWER_NAME}}  
**Review Date:** {{REVIEW_DATE}}  
**Technology Stack:** {{TECHNOLOGY_STACK}}  
**Review Type:** {{REVIEW_TYPE}} (Feature/Bug Fix/Refactor/Security)  
**Priority:** {{REVIEW_PRIORITY}}  

### Summary
{{REVIEW_SUMMARY_DESCRIPTION}}

### Files Changed
- {{CHANGED_FILE_1}} ({{CHANGE_TYPE_1}})
- {{CHANGED_FILE_2}} ({{CHANGE_TYPE_2}})
- {{CHANGED_FILE_3}} ({{CHANGE_TYPE_3}})

## Code Quality Assessment

### Overall Rating: {{OVERALL_RATING}}/5

### Quality Metrics
| Metric | Score | Comments |
|--------|-------|----------|
| Code Clarity | {{CLARITY_SCORE}}/5 | {{CLARITY_COMMENTS}} |
| Performance | {{PERFORMANCE_SCORE}}/5 | {{PERFORMANCE_COMMENTS}} |
| Security | {{SECURITY_SCORE}}/5 | {{SECURITY_COMMENTS}} |
| Maintainability | {{MAINTAINABILITY_SCORE}}/5 | {{MAINTAINABILITY_COMMENTS}} |
| Test Coverage | {{TEST_COVERAGE_SCORE}}/5 | {{TEST_COVERAGE_COMMENTS}} |

## Technology-Specific Reviews

### React/TypeScript Components
#### Component: {{REACT_COMPONENT_NAME}}
**File:** `{{REACT_COMPONENT_FILE}}`

##### Strengths
- {{REACT_STRENGTH_1}}
- {{REACT_STRENGTH_2}}

##### Areas for Improvement
- {{REACT_IMPROVEMENT_1}}
- {{REACT_IMPROVEMENT_2}}

##### Specific Feedback
\```typescript
// Current implementation
{{CURRENT_REACT_CODE}}

// Suggested improvement
{{SUGGESTED_REACT_CODE}}
```

##### React Best Practices Checklist
- [ ] Component follows single responsibility principle
- [ ] Props are properly typed with TypeScript interfaces
- [ ] State management is appropriate (local vs global)
- [ ] Event handlers are properly memoized
- [ ] Accessibility attributes are included
- [ ] Error boundaries are implemented where needed
- [ ] Performance optimizations (useMemo, useCallback) are used appropriately

### Node.js Backend Code
#### Module: {{NODEJS_MODULE_NAME}}
**File:** `{{NODEJS_MODULE_FILE}}`

##### Strengths
- {{NODEJS_STRENGTH_1}}
- {{NODEJS_STRENGTH_2}}

##### Areas for Improvement
- {{NODEJS_IMPROVEMENT_1}}
- {{NODEJS_IMPROVEMENT_2}}

##### Specific Feedback
\```javascript
// Current implementation
{{CURRENT_NODEJS_CODE}}

// Suggested improvement
{{SUGGESTED_NODEJS_CODE}}
```

##### Node.js Best Practices Checklist
- [ ] Error handling is comprehensive and consistent
- [ ] Async/await is used properly with error handling
- [ ] Input validation is implemented
- [ ] Security best practices are followed (helmet, rate limiting)
- [ ] Logging is appropriate and structured
- [ ] Environment variables are used for configuration
- [ ] Database connections are properly managed

### ASP.NET Core Code
#### Controller/Service: {{ASPNET_COMPONENT_NAME}}
**File:** `{{ASPNET_COMPONENT_FILE}}`

##### Strengths
- {{ASPNET_STRENGTH_1}}
- {{ASPNET_STRENGTH_2}}

##### Areas for Improvement
- {{ASPNET_IMPROVEMENT_1}}
- {{ASPNET_IMPROVEMENT_2}}

##### Specific Feedback
```csharp
// Current implementation
{{CURRENT_ASPNET_CODE}}

// Suggested improvement
{{SUGGESTED_ASPNET_CODE}}
```

##### ASP.NET Best Practices Checklist
- [ ] Dependency injection is used appropriately
- [ ] Controllers are thin with business logic in services
- [ ] Model validation is implemented
- [ ] Exception handling middleware is used
- [ ] Async methods are used for I/O operations
- [ ] Authorization and authentication are properly implemented
- [ ] Configuration is managed through IConfiguration

### Python Code
#### Module/Function: {{PYTHON_MODULE_NAME}}
**File:** `{{PYTHON_MODULE_FILE}}`

##### Strengths
- {{PYTHON_STRENGTH_1}}
- {{PYTHON_STRENGTH_2}}

##### Areas for Improvement
- {{PYTHON_IMPROVEMENT_1}}
- {{PYTHON_IMPROVEMENT_2}}

##### Specific Feedback
```python
# Current implementation
{{CURRENT_PYTHON_CODE}}

# Suggested improvement
{{SUGGESTED_PYTHON_CODE}}
```

##### Python Best Practices Checklist
- [ ] Code follows PEP 8 style guidelines
- [ ] Type hints are used appropriately
- [ ] Docstrings are comprehensive and follow conventions
- [ ] Error handling uses appropriate exception types
- [ ] Context managers are used for resource management
- [ ] List comprehensions are used appropriately
- [ ] Virtual environments and requirements are properly managed

## Cross-Platform Integration Review

### API Integration Points
#### Integration: {{INTEGRATION_POINT_NAME}}
**Description:** {{INTEGRATION_DESCRIPTION}}

##### Integration Quality Assessment
- **Data Consistency:** {{DATA_CONSISTENCY_ASSESSMENT}}
- **Error Handling:** {{ERROR_HANDLING_ASSESSMENT}}
- **Performance:** {{PERFORMANCE_ASSESSMENT}}
- **Security:** {{SECURITY_ASSESSMENT}}

##### Integration Feedback
```
Current Integration Pattern:
{{CURRENT_INTEGRATION_PATTERN}}

Recommended Improvements:
{{RECOMMENDED_INTEGRATION_IMPROVEMENTS}}
```

### Data Flow Analysis
```mermaid
graph LR
    A[{{FRONTEND_COMPONENT}}] --> B[{{API_ENDPOINT}}]
    B --> C[{{BACKEND_SERVICE}}]
    C --> D[{{DATABASE_OPERATION}}]
    D --> C
    C --> B
    B --> A
```

**Data Flow Comments:** {{DATA_FLOW_COMMENTS}}

## Security Review

### Security Assessment: {{SECURITY_RATING}}/5

#### Security Checklist
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication implementation
- [ ] Authorization checks
- [ ] Sensitive data handling
- [ ] Secure communication (HTTPS)
- [ ] Error message security
- [ ] Dependency security audit

#### Security Issues Found
1. **{{SECURITY_ISSUE_1}}**
   - **Severity:** {{SECURITY_SEVERITY_1}}
   - **Description:** {{SECURITY_DESCRIPTION_1}}
   - **Recommendation:** {{SECURITY_RECOMMENDATION_1}}

2. **{{SECURITY_ISSUE_2}}**
   - **Severity:** {{SECURITY_SEVERITY_2}}
   - **Description:** {{SECURITY_DESCRIPTION_2}}
   - **Recommendation:** {{SECURITY_RECOMMENDATION_2}}

## Performance Review

### Performance Assessment: {{PERFORMANCE_RATING}}/5

#### Performance Analysis
- **Database Queries:** {{DB_PERFORMANCE_ANALYSIS}}
- **API Response Times:** {{API_PERFORMANCE_ANALYSIS}}
- **Frontend Rendering:** {{FRONTEND_PERFORMANCE_ANALYSIS}}
- **Memory Usage:** {{MEMORY_USAGE_ANALYSIS}}

#### Performance Recommendations
1. **{{PERFORMANCE_REC_1}}**
   - **Impact:** {{PERFORMANCE_IMPACT_1}}
   - **Implementation:** {{PERFORMANCE_IMPLEMENTATION_1}}

2. **{{PERFORMANCE_REC_2}}**
   - **Impact:** {{PERFORMANCE_IMPACT_2}}
   - **Implementation:** {{PERFORMANCE_IMPLEMENTATION_2}}

## Testing Review

### Test Coverage Analysis
- **Unit Tests:** {{UNIT_TEST_COVERAGE}}%
- **Integration Tests:** {{INTEGRATION_TEST_COVERAGE}}%
- **E2E Tests:** {{E2E_TEST_COVERAGE}}%

#### Testing Feedback
##### Existing Tests
- **Strengths:** {{TEST_STRENGTHS}}
- **Gaps:** {{TEST_GAPS}}

##### Recommended Additional Tests
1. **{{RECOMMENDED_TEST_1}}**
   - **Type:** {{TEST_TYPE_1}}
   - **Rationale:** {{TEST_RATIONALE_1}}

2. **{{RECOMMENDED_TEST_2}}**
   - **Type:** {{TEST_TYPE_2}}
   - **Rationale:** {{TEST_RATIONALE_2}}

##### Test Code Examples
\```typescript
// Recommended unit test
{{RECOMMENDED_UNIT_TEST}}
```

\```javascript
// Recommended integration test
{{RECOMMENDED_INTEGRATION_TEST}}
```

## Documentation Review

### Documentation Assessment: {{DOCUMENTATION_RATING}}/5

#### Documentation Checklist
- [ ] Code comments are clear and necessary
- [ ] API documentation is updated
- [ ] README files are current
- [ ] Inline documentation explains complex logic
- [ ] Architecture decisions are documented
- [ ] Setup instructions are complete

#### Documentation Recommendations
- {{DOCUMENTATION_REC_1}}
- {{DOCUMENTATION_REC_2}}
- {{DOCUMENTATION_REC_3}}

## Action Items

### Critical Issues (Must Fix Before Merge)
1. **{{CRITICAL_ISSUE_1}}**
   - **File:** {{CRITICAL_FILE_1}}
   - **Line:** {{CRITICAL_LINE_1}}
   - **Action:** {{CRITICAL_ACTION_1}}

2. **{{CRITICAL_ISSUE_2}}**
   - **File:** {{CRITICAL_FILE_2}}
   - **Line:** {{CRITICAL_LINE_2}}
   - **Action:** {{CRITICAL_ACTION_2}}

### Major Issues (Should Fix Before Merge)
1. **{{MAJOR_ISSUE_1}}**
   - **File:** {{MAJOR_FILE_1}}
   - **Action:** {{MAJOR_ACTION_1}}

2. **{{MAJOR_ISSUE_2}}**
   - **File:** {{MAJOR_FILE_2}}
   - **Action:** {{MAJOR_ACTION_2}}

### Minor Issues (Consider for Future Improvements)
1. **{{MINOR_ISSUE_1}}**
   - **Action:** {{MINOR_ACTION_1}}

2. **{{MINOR_ISSUE_2}}**
   - **Action:** {{MINOR_ACTION_2}}

### Suggestions for Enhancement
1. **{{ENHANCEMENT_1}}**
   - **Benefit:** {{ENHANCEMENT_BENEFIT_1}}
   - **Effort:** {{ENHANCEMENT_EFFORT_1}}

2. **{{ENHANCEMENT_2}}**
   - **Benefit:** {{ENHANCEMENT_BENEFIT_2}}
   - **Effort:** {{ENHANCEMENT_EFFORT_2}}

## Learning Opportunities

### Knowledge Sharing
- **New Patterns Introduced:** {{NEW_PATTERNS}}
- **Best Practices Demonstrated:** {{BEST_PRACTICES_SHOWN}}
- **Learning Resources:** {{LEARNING_RESOURCES}}

### Team Development
- **Skills Demonstrated:** {{SKILLS_DEMONSTRATED}}
- **Areas for Growth:** {{GROWTH_AREAS}}
- **Recommended Training:** {{RECOMMENDED_TRAINING}}

## Review Summary

### Approval Status
- [ ] **Approved** - Ready to merge
- [ ] **Approved with Minor Changes** - Address minor issues post-merge
- [ ] **Changes Requested** - Address issues before merge
- [ ] **Rejected** - Significant rework required

### Overall Assessment
{{OVERALL_ASSESSMENT_SUMMARY}}

### Key Strengths
1. {{KEY_STRENGTH_1}}
2. {{KEY_STRENGTH_2}}
3. {{KEY_STRENGTH_3}}

### Primary Concerns
1. {{PRIMARY_CONCERN_1}}
2. {{PRIMARY_CONCERN_2}}
3. {{PRIMARY_CONCERN_3}}

### Next Steps
1. {{NEXT_STEP_1}}
2. {{NEXT_STEP_2}}
3. {{NEXT_STEP_3}}

## Follow-up Actions

### Author Actions
- [ ] {{AUTHOR_ACTION_1}}
- [ ] {{AUTHOR_ACTION_2}}
- [ ] {{AUTHOR_ACTION_3}}

### Reviewer Actions
- [ ] {{REVIEWER_ACTION_1}}
- [ ] {{REVIEWER_ACTION_2}}

### Team Actions
- [ ] {{TEAM_ACTION_1}}
- [ ] {{TEAM_ACTION_2}}

---

## Template Usage Notes

### Variable Substitution Guide
Replace all `{{VARIABLE_NAME}}` placeholders with review-specific information.

### Customization Options
- Adapt technology sections based on actual stack used
- Add additional security checks based on project requirements
- Customize performance metrics based on application type
- Include project-specific coding standards

### Quality Validation Checklist
- [ ] All code changes are thoroughly reviewed
- [ ] Security implications are assessed
- [ ] Performance impact is evaluated
- [ ] Test coverage is adequate
- [ ] Documentation is updated
- [ ] Cross-platform integration is validated
- [ ] Action items are clearly defined and prioritized

### Integration Points
- **BMAD Personas:** Polyglot Code Review Specialist, Technical Documentation Architect
- **Follow-up Templates:** Testing Strategy Template, Security Assessment Template
- **Quality Standards:** BMAD Method code quality framework

---
**Template Version:** 1.0.0  
**Last Updated:** {{CURRENT_DATE}}  
**Template Owner:** BMAD Method Team
```

Now let me update the story progress to completion:
