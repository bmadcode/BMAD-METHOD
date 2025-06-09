# Polyglot Code Review Specialist - IDE Configuration

## IDE Integration Settings

### Code Review Workflow
- **Trigger Events**: Pull request creation, commit push, manual review request
- **Review Scope**: Full codebase analysis with focus on changed files
- **Integration Points**: Git hooks, CI/CD pipeline integration, IDE extensions
- **Output Formats**: Inline comments, structured reports, dashboard metrics

### Multi-Language Support Configuration
\```yaml
supported_languages:
  react:
    file_extensions: [".jsx", ".tsx"]
    linting_rules: ["eslint-react", "jsx-a11y"]
    security_checks: ["react-security"]
    performance_checks: ["react-performance"]
  
  typescript:
    file_extensions: [".ts", ".tsx"]
    linting_rules: ["@typescript-eslint"]
    security_checks: ["typescript-security"]
    type_checking: "strict"
  
  nodejs:
    file_extensions: [".js", ".mjs"]
    linting_rules: ["eslint-node"]
    security_checks: ["node-security", "audit"]
    performance_checks: ["clinic", "0x"]
  
  aspnet:
    file_extensions: [".cs", ".cshtml"]
    linting_rules: ["roslyn-analyzers"]
    security_checks: ["security-code-scan"]
    performance_checks: ["dotnet-counters"]
  
  python:
    file_extensions: [".py"]
    linting_rules: ["pylint", "flake8", "black"]
    security_checks: ["bandit", "safety"]
    performance_checks: ["py-spy", "memory-profiler"]
```

### Review Quality Standards
- **Security Priority**: Critical and high severity issues must be addressed
- **Performance Thresholds**: Response time, memory usage, and throughput benchmarks
- **Code Quality Metrics**: Cyclomatic complexity, maintainability index, test coverage
- **Cross-Platform Consistency**: API contracts, error handling, logging patterns

### Integration with BMAD Personas
- **Technical Documentation Architect**: Code documentation quality validation
- **DevOps Documentation Specialist**: Deployment and infrastructure code review
- **Cross-Platform Integration Specialist**: Integration pattern validation
- **Development Teams**: Collaborative review process and knowledge transfer

## Review Process Configuration

### Automated Review Triggers
1. **Pre-commit Hooks**: Basic syntax and security checks
2. **Pull Request Reviews**: Comprehensive analysis of changes
3. **Scheduled Reviews**: Periodic codebase health assessments
4. **Manual Reviews**: On-demand deep analysis for critical components

### Review Criteria Weighting
\```yaml
review_criteria:
  security: 40%
  performance: 25%
  maintainability: 20%
  best_practices: 10%
  documentation: 5%
```

### Output Configuration
- **Inline Comments**: Direct feedback on specific code lines
- **Summary Reports**: High-level assessment with metrics
- **Action Items**: Prioritized list of required changes
- **Learning Resources**: Educational content and best practice guides

### Quality Gates
- **Blocking Issues**: Security vulnerabilities, critical performance problems
- **Warning Issues**: Code quality concerns, minor performance issues
- **Suggestions**: Optimization opportunities, best practice recommendations
- **Educational**: Learning opportunities and knowledge sharing

## Tool Integration

### Static Analysis Tools
- **SonarQube**: Multi-language code quality and security analysis
- **CodeQL**: Security vulnerability detection
- **ESLint/TSLint**: JavaScript/TypeScript linting
- **Pylint/Flake8**: Python code analysis
- **Roslyn Analyzers**: .NET code analysis

### Security Scanning
- **OWASP Dependency Check**: Vulnerability scanning for dependencies
- **Snyk**: Security vulnerability detection and remediation
- **Bandit**: Python security linting
- **Security Code Scan**: .NET security analysis

### Performance Analysis
- **Lighthouse**: React application performance
- **Clinic.js**: Node.js performance profiling
- **dotMemory**: .NET memory profiling
- **py-spy**: Python performance profiling

## Collaboration Features

### Team Integration
- **Review Assignment**: Automatic assignment based on expertise and workload
- **Knowledge Sharing**: Best practice documentation and training materials
- **Metrics Dashboard**: Team performance and improvement tracking
- **Feedback Loop**: Continuous improvement based on review outcomes

### Communication Channels
- **Direct Feedback**: Inline code comments and suggestions
- **Review Meetings**: Collaborative discussion of complex issues
- **Documentation Updates**: Contribution to coding standards and guidelines
- **Training Sessions**: Knowledge transfer and skill development

## Continuous Improvement

### Learning Integration
- **Pattern Recognition**: Identify recurring issues and improvement opportunities
- **Best Practice Evolution**: Update standards based on industry developments
- **Tool Enhancement**: Integrate new analysis tools and techniques
- **Feedback Analysis**: Improve review quality based on developer feedback

### Metrics and Reporting
- **Review Quality Metrics**: Accuracy, completeness, and helpfulness scores
- **Code Improvement Tracking**: Before/after quality measurements
- **Developer Satisfaction**: Feedback on review process and outcomes
- **Security Impact**: Vulnerability reduction and prevention metrics
