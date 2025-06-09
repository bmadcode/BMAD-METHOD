# Generate API Documentation Task

## Task Overview
**Task ID:** generate-api-documentation  
**Persona:** Technical Documentation Architect  
**Category:** Documentation Generation  
**Complexity:** Medium to High  

## Task Description
Generate comprehensive API documentation for specified technology platforms, ensuring consistency across different tech stacks and following platform-specific conventions.

## Input Parameters
- **Technology Stack:** Target platform(s) (React, TypeScript, Node.js, ASP.NET Core, Python)
- **API Specification:** Code files, API definitions, or existing documentation
- **Documentation Type:** API reference, integration guide, SDK documentation
- **Target Audience:** Developer experience level (beginner, intermediate, advanced)
- **Output Format:** Markdown, HTML, PDF, or platform-specific format

## Processing Steps

### 1. Analysis Phase
- Parse API structure and endpoints
- Identify authentication and authorization patterns
- Analyze data models and schemas
- Review existing documentation for gaps

### 2. Documentation Architecture
- Design documentation structure
- Create navigation hierarchy
- Plan cross-references and linking strategy
- Establish consistent terminology

### 3. Content Generation
- Generate API endpoint documentation
- Create code examples for each platform
- Develop integration guides
- Add error handling and troubleshooting sections

### 4. Quality Validation
- Verify code examples compile and execute
- Check documentation completeness
- Ensure platform-specific convention compliance
- Validate cross-platform consistency

## Output Specifications

### Required Sections
1. **Overview and Introduction**
   - Purpose and scope
   - Prerequisites and requirements
   - Quick start guide

2. **Authentication and Authorization**
   - Authentication methods
   - API key management
   - Token handling examples

3. **API Reference**
   - Endpoint documentation
   - Request/response examples
   - Parameter descriptions
   - Status codes and error handling

4. **Integration Examples**
   - Platform-specific implementation examples
   - Common use cases
   - Best practices and patterns

5. **Troubleshooting**
   - Common issues and solutions
   - Error code reference
   - Debug techniques

### Quality Standards
- All code examples must be tested and functional
- Documentation must follow platform-specific conventions
- Cross-platform consistency in terminology and structure
- Clear navigation and searchable content
- Regular updates aligned with code changes

## Example Usage

### Input Example
\```yaml
technology_stack: ["React", "TypeScript", "ASP.NET Core"]
api_specification: "REST API with authentication"
documentation_type: "Integration Guide"
target_audience: "intermediate"
output_format: "markdown"
```

### Expected Output Structure
```
# API Integration Guide

## Overview
[Purpose and scope description]

## Prerequisites
[Required knowledge and setup]

## Authentication
### React/TypeScript Client
[Code examples for frontend auth]

### ASP.NET Core API
[Backend authentication setup]

## API Endpoints
### User Management
[Endpoint documentation with examples]

## Integration Examples
[Complete integration scenarios]

## Troubleshooting
[Common issues and solutions]
```

## Integration Points
- **BMAD Orchestrator:** Receives requests and routes to appropriate validation
- **Quality Validation:** Applies documentation quality checklist
- **Cross-Platform Specialist:** Coordinates on integration patterns
- **Code Review Specialist:** Validates code example accuracy

## Success Metrics
- Documentation completeness score > 90%
- Code example accuracy rate 100%
- Cross-platform consistency validation passed
- User feedback rating > 4.5/5
- Documentation maintenance overhead < 10% of development time

---
**Task Version:** 1.0  
**Last Updated:** [Current Date]  
**Validation Status:** Ready for Implementation
```

Now let me create the documentation templates:
