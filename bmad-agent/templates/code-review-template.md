# Code Review Template

## Review Information
**Project:** [Project Name]  
**Review Date:** [Date]  
**Reviewer:** Polyglot Code Review Specialist  
**Review Scope:** [Files/Modules Reviewed]  
**Technology Stack:** [React, TypeScript, Node.js, ASP.NET, Python]  

## Executive Summary

### Overall Assessment
**Rating:**  (1-5 stars)  
**Summary:** [Brief overall assessment of code quality]

### Key Metrics
- **Security Score:** [Rating/10] - [Brief explanation]
- **Performance Score:** [Rating/10] - [Brief explanation]  
- **Maintainability Score:** [Rating/10] - [Brief explanation]
- **Best Practices Score:** [Rating/10] - [Brief explanation]

### Critical Issues Summary
- **Blocking Issues:** [Count] - Must be fixed before deployment
- **High Priority:** [Count] - Should be addressed in current iteration
- **Medium Priority:** [Count] - Address in next iteration
- **Low Priority:** [Count] - Future optimization opportunities

## Detailed Analysis

###  Security Review

#### Critical Security Issues
\```markdown
**Issue:** [Security vulnerability description]
**Severity:** Critical/High/Medium/Low
**Location:** [File:Line or function name]
**Impact:** [Potential security impact]
**Recommendation:** 
[Specific fix with code example]

**Example Fix:**
```[language]
// Before (vulnerable)
[vulnerable code example]

// After (secure)
[secure code example]
```
```

#### Security Best Practices
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection in place
- [ ] Authentication properly implemented
- [ ] Authorization checks present
- [ ] Sensitive data properly handled
- [ ] Dependencies security validated

###  Performance Review

#### Performance Issues Identified
\```markdown
**Issue:** [Performance bottleneck description]
**Impact:** [Performance impact - response time, memory usage, etc.]
**Location:** [File:Line or function name]
**Recommendation:**
[Specific optimization with expected improvement]

**Example Optimization:**
```[language]
// Before (inefficient)
[inefficient code example]

// After (optimized)
[optimized code example]
// Expected improvement: [specific metrics]
```
```

#### Performance Metrics
- **Response Time:** [Current vs Target]
- **Memory Usage:** [Current vs Target]
- **Database Queries:** [Count and efficiency]
- **Caching Strategy:** [Implementation status]

###  Code Quality Review

#### Architecture and Design
- **Component Structure:** [Assessment of component organization]
- **Separation of Concerns:** [How well responsibilities are separated]
- **Design Patterns:** [Appropriate pattern usage]
- **Code Reusability:** [DRY principle adherence]

#### Code Maintainability
\```markdown
**Strengths:**
- [List of well-implemented aspects]

**Areas for Improvement:**
- [Specific maintainability issues with solutions]

**Refactoring Suggestions:**
```[language]
// Current implementation
[current code]

// Suggested refactoring
[improved code]
// Benefits: [explanation of improvements]
```
```

###  Cross-Platform Integration Review

#### Integration Consistency
- **API Contracts:** [Consistency across platforms]
- **Error Handling:** [Standardization assessment]
- **Authentication:** [Cross-platform auth implementation]
- **Data Serialization:** [Consistency in data handling]

#### Platform-Specific Considerations
\```markdown
**React/TypeScript Frontend:**
- [Frontend-specific findings and recommendations]

**Node.js Backend:**
- [Backend-specific findings and recommendations]

**ASP.NET Services:**
- [ASP.NET-specific findings and recommendations]

**Python Components:**
- [Python-specific findings and recommendations]
```

###  Best Practices Compliance

#### Language-Specific Best Practices
- **React:** [Component patterns, hooks usage, performance]
- **TypeScript:** [Type safety, interface design, generic usage]
- **Node.js:** [Async patterns, error handling, middleware]
- **ASP.NET:** [MVC patterns, dependency injection, data access]
- **Python:** [PEP compliance, framework patterns, testing]

#### General Best Practices
- [ ] Code readability and documentation
- [ ] Error handling and logging
- [ ] Testing coverage and quality
- [ ] Configuration management
- [ ] Dependency management

## Action Items

###  Critical (Must Fix Before Deployment)
1. **[Issue Title]**
   - **Description:** [Detailed description]
   - **Location:** [File:Line]
   - **Fix:** [Specific solution]
   - **Estimated Time:** [Time to fix]

###  High Priority (Current Iteration)
1. **[Issue Title]**
   - **Description:** [Detailed description]
   - **Location:** [File:Line]
   - **Fix:** [Specific solution]
   - **Estimated Time:** [Time to fix]

###  Medium Priority (Next Iteration)
1. **[Issue Title]**
   - **Description:** [Detailed description]
   - **Location:** [File:Line]
   - **Fix:** [Specific solution]
   - **Estimated Time:** [Time to fix]

###  Suggestions (Future Optimization)
1. **[Optimization Title]**
   - **Description:** [Detailed description]
   - **Benefit:** [Expected improvement]
   - **Estimated Time:** [Time to implement]

## Learning Opportunities

###  Recommended Resources
- **Security:** [Links to security best practices and guides]
- **Performance:** [Performance optimization resources]
- **Best Practices:** [Language-specific best practice guides]
- **Architecture:** [Design pattern and architecture resources]

###  Training Recommendations
- [Specific training areas for the development team]
- [Workshops or courses that would benefit the team]
- [Internal knowledge sharing opportunities]

## Follow-up Actions

### Next Steps
1. **Immediate Actions:** [What needs to be done right away]
2. **Short-term Goals:** [Improvements for next 1-2 sprints]
3. **Long-term Improvements:** [Strategic improvements over time]

### Review Schedule
- **Follow-up Review:** [Date for next review]
- **Progress Check:** [Intermediate check-in date]
- **Metrics Review:** [When to assess improvement metrics]

### Success Metrics
- **Code Quality Improvement:** [How to measure improvement]
- **Security Enhancement:** [Security metrics to track]
- **Performance Gains:** [Performance metrics to monitor]
- **Developer Productivity:** [Productivity metrics to consider]

## Additional Notes
[Any additional context, special considerations, or team-specific notes]

---

**Review Completed By:** Polyglot Code Review Specialist  
**Review Duration:** [Time spent on review]  
**Next Review Date:** [Scheduled follow-up]  
**Contact:** [How to reach reviewer for questions]
