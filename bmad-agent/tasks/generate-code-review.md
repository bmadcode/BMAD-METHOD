# Generate Code Review Task

## Task Overview
**Task ID:** generate-code-review  
**Persona:** Polyglot Code Review Specialist  
**Category:** Code Quality Assurance  
**Priority:** High  
**Estimated Duration:** 15-45 minutes per review  

## Task Description
Generate comprehensive code reviews for multi-language codebases, focusing on security, performance, maintainability, and cross-platform consistency across React, TypeScript, Node.js, ASP.NET, and Python implementations.

## Input Parameters

### Required Inputs
- **Code Repository**: Git repository URL or code files
- **Review Scope**: Specific files, modules, or full codebase
- **Technology Stack**: Primary and secondary technologies used
- **Review Type**: Security-focused, performance-focused, or comprehensive
- **Priority Level**: Critical, high, medium, or low priority review

### Optional Inputs
- **Existing Issues**: Known problems or areas of concern
- **Performance Requirements**: Specific performance benchmarks
- **Security Requirements**: Compliance standards or security policies
- **Team Context**: Developer experience level and project timeline
- **Integration Points**: Related systems and cross-platform dependencies

## Processing Steps

### 1. Code Analysis Preparation
\```yaml
analysis_setup:
  - repository_clone: "Clone or access code repository"
  - dependency_scan: "Analyze package.json, requirements.txt, .csproj files"
  - architecture_review: "Understand overall system architecture"
  - change_analysis: "Identify modified files and impact scope"
  - context_gathering: "Review related documentation and requirements"
```

### 2. Multi-Language Code Review
\```yaml
language_specific_review:
  react_typescript:
    - component_architecture: "Review component design and lifecycle"
    - hooks_usage: "Validate hooks patterns and dependencies"
    - performance_patterns: "Check for unnecessary re-renders and optimizations"
    - accessibility: "Ensure WCAG compliance and semantic HTML"
    - type_safety: "Validate TypeScript usage and type definitions"
  
  nodejs:
    - async_patterns: "Review Promise/async-await usage"
    - error_handling: "Validate error handling and logging"
    - security_practices: "Check for common Node.js vulnerabilities"
    - middleware_design: "Review Express/Fastify middleware patterns"
    - performance_optimization: "Analyze memory usage and response times"
  
  aspnet:
    - mvc_patterns: "Review controller and action design"
    - dependency_injection: "Validate DI container usage"
    - entity_framework: "Review data access patterns and queries"
    - security_implementation: "Check authentication and authorization"
    - performance_considerations: "Analyze caching and optimization"
  
  python:
    - pythonic_code: "Ensure PEP 8 compliance and Python idioms"
    - framework_patterns: "Review Django/Flask implementation patterns"
    - data_processing: "Validate data handling and processing efficiency"
    - testing_practices: "Review unit tests and test coverage"
    - security_practices: "Check for common Python vulnerabilities"
```

### 3. Cross-Platform Analysis
\```yaml
integration_review:
  - api_consistency: "Validate API contracts across platforms"
  - authentication_patterns: "Review auth implementation consistency"
  - error_handling: "Ensure standardized error responses"
  - logging_standards: "Validate logging patterns and formats"
  - data_serialization: "Review JSON/XML handling consistency"
  - performance_alignment: "Check response time consistency"
```

### 4. Security Assessment
\```yaml
security_review:
  - vulnerability_scan: "OWASP Top 10 vulnerability assessment"
  - dependency_security: "Third-party library security analysis"
  - input_validation: "Review data validation and sanitization"
  - authentication_security: "Validate auth implementation security"
  - authorization_patterns: "Review access control implementation"
  - data_protection: "Assess sensitive data handling"
```

### 5. Performance Analysis
\```yaml
performance_review:
  - bottleneck_identification: "Identify performance bottlenecks"
  - optimization_opportunities: "Suggest performance improvements"
  - resource_usage: "Analyze memory and CPU usage patterns"
  - caching_strategies: "Review caching implementation"
  - database_optimization: "Analyze query performance and indexing"
  - scalability_assessment: "Evaluate scalability considerations"
```

## Output Generation

### Comprehensive Review Report
\```markdown
# Code Review Report: [Project/Module Name]

## Executive Summary
- **Overall Rating**: [1-5 stars with explanation]
- **Critical Issues**: [Count and brief description]
- **Security Score**: [Rating with key findings]
- **Performance Score**: [Rating with optimization opportunities]
- **Maintainability Score**: [Rating with improvement suggestions]

## Detailed Findings

### Security Analysis
#### Critical Issues
- [List of critical security vulnerabilities]

#### Recommendations
- [Specific security improvements with code examples]

### Performance Analysis
#### Bottlenecks Identified
- [Performance issues with impact assessment]

#### Optimization Opportunities
- [Specific performance improvements with expected impact]

### Code Quality Assessment
#### Strengths
- [Positive aspects of the codebase]

#### Areas for Improvement
- [Specific code quality issues with solutions]

### Cross-Platform Consistency
#### Integration Issues
- [Cross-platform compatibility concerns]

#### Standardization Opportunities
- [Suggestions for improved consistency]

## Action Items
### High Priority (Must Fix)
- [Critical issues requiring immediate attention]

### Medium Priority (Should Fix)
- [Important improvements for next iteration]

### Low Priority (Nice to Have)
- [Optimization opportunities for future consideration]

## Learning Opportunities
- [Educational resources and best practices]
- [Training recommendations for development team]

## Follow-up Recommendations
- [Suggested next steps and timeline]
- [Additional reviews or assessments needed]
```

### Quick Review Format
\```markdown
## Quick Review: [Component/File Name]

** Focus Areas Reviewed:**
- Security, Performance, Code Quality, Best Practices

** Strengths:**
- [Positive aspects with specific examples]

** Issues Found:**
- **Critical**: [Security vulnerabilities, major performance issues]
- **Important**: [Code quality concerns, minor performance issues]
- **Suggestions**: [Optimization opportunities, best practices]

** Immediate Actions:**
1. [Most critical fix with code example]
2. [Second priority fix with explanation]
3. [Third priority improvement]

** Learning Resources:**
- [Relevant documentation, tutorials, or best practices]

** Estimated Fix Time:** [Time estimate for addressing issues]
```

## Quality Validation

### Review Completeness Checklist
- [ ] All specified files and modules reviewed
- [ ] Security vulnerabilities identified and assessed
- [ ] Performance bottlenecks analyzed
- [ ] Code quality standards validated
- [ ] Cross-platform consistency checked
- [ ] Best practices compliance verified
- [ ] Actionable recommendations provided
- [ ] Learning opportunities identified

### Success Metrics
- **Review Coverage**: Percentage of codebase analyzed
- **Issue Detection Rate**: Number of valid issues identified
- **False Positive Rate**: Accuracy of issue identification
- **Developer Satisfaction**: Feedback on review quality and helpfulness
- **Code Improvement**: Measurable quality improvements post-review

## Integration Points

### BMAD Persona Collaboration
- **Technical Documentation Architect**: Code documentation quality validation
- **DevOps Documentation Specialist**: Infrastructure and deployment code review
- **Cross-Platform Integration Specialist**: Integration pattern validation
- **Development Teams**: Collaborative improvement process

### Tool Integration
- **Version Control**: Git hooks and pull request integration
- **CI/CD Pipeline**: Automated review triggers and quality gates
- **Issue Tracking**: Integration with Jira, GitHub Issues, or similar
- **Communication**: Slack, Teams, or email notifications

## Continuous Improvement
- Regular review of review quality and effectiveness
- Updates to review criteria based on project evolution
- Integration of new tools and techniques
- Feedback incorporation for process improvement
