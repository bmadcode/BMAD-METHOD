# Task: Generate Deployment Documentation

## Task Overview
**Task ID:** generate-deployment-documentation  
**Persona:** DevOps Documentation Specialist  
**Category:** Deployment & Operations  
**Complexity:** High  

## Task Description
Generate comprehensive deployment documentation for applications across multiple technology stacks, including CI/CD pipelines, infrastructure-as-code, monitoring setup, and disaster recovery procedures.

## Input Parameters

### Required Inputs
- **Technology Stack:** Primary technologies (e.g., .NET Core, React, Node.js, Python)
- **Target Environment:** Deployment targets (AWS, Azure, GCP, on-premises)
- **Application Type:** Web application, API, microservices, monolith
- **Deployment Strategy:** Blue-green, canary, rolling, direct deployment

### Optional Inputs
- **Existing Infrastructure:** Current deployment setup and constraints
- **Security Requirements:** Compliance needs (SOC2, HIPAA, PCI-DSS)
- **Performance Requirements:** SLA, scaling needs, performance targets
- **Integration Requirements:** External services, databases, third-party APIs

## Processing Steps

### 1. Requirements Analysis
- Analyze technology stack and deployment requirements
- Identify platform-specific deployment patterns
- Assess security and compliance needs
- Determine monitoring and observability requirements

### 2. Architecture Documentation
- Create deployment architecture diagrams
- Document infrastructure components and dependencies
- Define environment-specific configurations
- Establish security boundaries and access controls

### 3. CI/CD Pipeline Design
- Design automated deployment pipelines
- Create platform-specific pipeline configurations
- Integrate security scanning and quality gates
- Define deployment approval processes

### 4. Infrastructure as Code
- Generate infrastructure provisioning templates
- Create environment-specific parameter files
- Document infrastructure versioning and rollback procedures
- Include cost optimization recommendations

### 5. Operational Procedures
- Create deployment runbooks and checklists
- Document monitoring and alerting setup
- Generate troubleshooting guides
- Define disaster recovery procedures

### 6. Quality Validation
- Validate against DevOps best practices
- Ensure security and compliance requirements
- Test deployment procedures in non-production
- Verify monitoring and alerting functionality

## Output Specifications

### Primary Deliverables
1. **Deployment Guide** - Comprehensive deployment procedures
2. **CI/CD Pipeline Configuration** - Platform-specific automation
3. **Infrastructure Templates** - Infrastructure-as-code implementations
4. **Operational Runbooks** - Day-to-day operational procedures
5. **Disaster Recovery Plan** - Backup and recovery procedures

### Supporting Documentation
- Environment setup guides
- Security configuration procedures
- Monitoring and alerting setup
- Performance optimization recommendations
- Cost management guidelines

## Quality Standards

### Documentation Quality
- Clear, step-by-step procedures with validation checkpoints
- Platform-specific examples and configurations
- Security considerations integrated throughout
- Disaster recovery and rollback procedures included

### Technical Quality
- Infrastructure-as-code follows best practices
- CI/CD pipelines include proper security scanning
- Monitoring covers application and infrastructure metrics
- Deployment procedures support zero-downtime deployments

### Operational Quality
- Procedures tested in non-production environments
- Troubleshooting guides include common issues and solutions
- Documentation maintained and version controlled
- Regular review and update processes defined

## Success Metrics

### Deployment Efficiency
- Deployment time reduction (target: 50% improvement)
- Deployment failure rate (target: <5%)
- Mean time to recovery (target: <30 minutes)
- Infrastructure provisioning time (target: <15 minutes)

### Documentation Quality
- Documentation completeness score (target: 95%+)
- User satisfaction with deployment procedures (target: 4.5/5)
- Time to onboard new team members (target: <2 days)
- Deployment procedure compliance rate (target: 98%+)

## Integration Points

### BMAD Method Integration
- Coordinates with Technical Documentation Architect for API documentation
- Integrates with development personas for application requirements
- Aligns with infrastructure and security guidelines
- Supports cross-platform deployment consistency

### External Tool Integration
- Version control systems (Git, Azure DevOps)
- CI/CD platforms (GitHub Actions, Jenkins, Azure Pipelines)
- Cloud platforms (AWS, Azure, GCP)
- Monitoring tools (DataDog, New Relic, Application Insights)
- Infrastructure tools (Terraform, ARM templates, CloudFormation)

## Error Handling

### Common Issues
- Insufficient deployment requirements or constraints
- Conflicting security and performance requirements
- Missing infrastructure access or permissions
- Incompatible technology stack combinations

### Resolution Strategies
- Request additional requirements clarification
- Provide alternative deployment approaches
- Document security and performance trade-offs
- Suggest infrastructure architecture modifications

## Notes
- Always prioritize security and compliance requirements
- Include cost optimization considerations in all recommendations
- Ensure deployment procedures support disaster recovery requirements
- Maintain consistency across different technology stacks where possible
```

Now let me create the deployment documentation template:
