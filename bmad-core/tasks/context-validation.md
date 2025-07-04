# Context Validation Task

## Purpose
Ensure context security, quality, and compliance across all BMAD agents. This task provides comprehensive validation of context content, access controls, and quality assurance to maintain system integrity and performance standards.

## Validation Categories

### Security Validation
- Input sanitization and content safety
- Access control and permission verification
- Sensitive information detection and protection
- Malicious content identification and blocking

### Quality Validation
- Content accuracy and relevance assessment
- Information freshness and currency validation
- Context completeness and coherence verification
- Performance impact evaluation

### Compliance Validation
- BMad Method compliance verification
- Agent-specific requirement adherence
- Configuration standard conformance
- Documentation and markup validation

## Procedure

### 1. Security Validation

**Input Sanitization**
[[LLM: Examine all context content for potential security risks, malicious inputs, or inappropriate content]]

**Security Checks**
- Scan for injection attempts (SQL, script, command injection)
- Detect potentially malicious URLs or file references
- Identify suspicious patterns or attack vectors
- Validate file path references and access permissions

**Sensitive Information Detection**
- Scan for personally identifiable information (PII)
- Detect API keys, passwords, or authentication tokens
- Identify confidential business information
- Flag proprietary or sensitive technical data

**Content Safety Assessment**
- Evaluate content appropriateness and professionalism
- Check for harmful, offensive, or inappropriate material
- Verify compliance with organizational content policies
- Ensure context maintains professional standards

**Security Risk Classification**
```
Risk Level Assessment:
- 🟢 LOW: Safe content, no security concerns identified
- 🟡 MEDIUM: Minor concerns, warnings issued, content flagged
- 🔴 HIGH: Security risk detected, content blocked or sanitized
- ⚫ CRITICAL: Severe security threat, immediate intervention required
```

### 2. Quality Validation

**Content Accuracy Assessment**
[[LLM: Evaluate the accuracy and reliability of context information against known standards and requirements]]

**Accuracy Checks**
- Verify factual information against authoritative sources
- Cross-reference technical specifications and requirements
- Validate code examples and implementation details
- Confirm business logic and process accuracy

**Relevance Analysis**
- Assess content relevance to current tasks and objectives
- Evaluate information currency and freshness
- Identify outdated or stale context elements
- Score content utility for target agent types

**Completeness Verification**
- Check for missing critical information
- Verify all required context elements are present
- Identify gaps in information or broken references
- Ensure context supports successful task completion

**Coherence Validation**
- Verify logical flow and consistency of information
- Check for contradictory or conflicting content
- Ensure context relationships remain intact
- Validate cross-references and dependencies

**Quality Scoring Matrix**
```
Quality Dimensions (0-10 scale):
- Accuracy: {{accuracy_score}}/10
- Relevance: {{relevance_score}}/10
- Completeness: {{completeness_score}}/10
- Coherence: {{coherence_score}}/10
- Freshness: {{freshness_score}}/10

Overall Quality Score: {{overall_quality_score}}/10
```

### 3. BMad Method Compliance Validation

**Agent Type Compliance**
- Verify context adheres to agent-specific requirements
- Check token limits and compression ratios
- Validate dependency constraints and limitations
- Ensure agent capability alignment

**Dev Agent Compliance** (Lean Requirements):
- Token count ≤ 2000 tokens
- Code relevance ≥ 95%
- Non-essential context minimized
- Technical focus maintained

**Planning Agent Compliance** (Rich Context):
- Token count ≤ 8000 tokens
- Strategic context preserved
- Cross-functional information maintained
- Stakeholder context included

**Template and Markup Compliance**
- Verify proper `{{placeholder}}` usage
- Validate `[[LLM:]]` instruction formatting
- Check markdown structure and formatting
- Ensure template pattern adherence

**File and Structure Compliance**
- Validate file size limits (<50KB)
- Check dynamic loading compatibility
- Verify dependency declarations
- Ensure modular organization

### 4. Performance Impact Validation

**Resource Usage Assessment**
- Estimate memory consumption impact
- Calculate processing time requirements
- Evaluate loading performance implications
- Assess scalability and efficiency

**Performance Metrics**
```
Performance Impact Analysis:
- Memory Usage: {{estimated_memory_mb}} MB
- Load Time: {{estimated_load_time_ms}} ms
- Processing Speed: {{processing_speed_rating}}/10
- Scalability Impact: {{scalability_impact_rating}}/10
```

**Optimization Recommendations**
[[LLM: Based on performance analysis, suggest specific optimizations to improve context efficiency]]

### 5. Access Control and Permissions

**Permission Verification**
- Validate user access rights to context information
- Check agent authorization for specific content types
- Verify cross-agent sharing permissions
- Ensure appropriate content visibility

**Access Control Matrix**
```
Access Control Validation:
- User Permissions: {{user_access_level}}
- Agent Authorization: {{agent_access_rights}}
- Content Classification: {{content_sensitivity_level}}
- Sharing Restrictions: {{sharing_limitations}}
```

**Audit Trail Requirements**
- Log all context access and modifications
- Track validation decisions and outcomes
- Record security incidents and responses
- Maintain compliance audit information

### 6. Validation Execution and Reporting

**Validation Workflow**
1. Execute security validation checks
2. Perform quality assessment analysis
3. Verify BMad Method compliance
4. Assess performance impact
5. Validate access controls
6. Generate validation report

**Error Handling and Remediation**
- Identify validation failures and issues
- Propose remediation strategies
- Execute automated fixes where possible
- Escalate critical issues requiring intervention

## Output Format

### Validation Report
```
# Context Validation Report

## Validation Summary
**Validation Date:** {{validation_timestamp}}
**Context Source:** {{context_source}}
**Agent Type:** {{target_agent_type}}
**Overall Status:** {{validation_status}}

## Security Validation Results
**Security Risk Level:** {{security_risk_level}}
**Threats Detected:** {{security_threats_count}}
**Sensitive Data Found:** {{sensitive_data_findings}}
**Remediation Actions:** {{security_remediation_actions}}

## Quality Assessment Results
**Overall Quality Score:** {{overall_quality_score}}/10
**Accuracy:** {{accuracy_score}}/10
**Relevance:** {{relevance_score}}/10
**Completeness:** {{completeness_score}}/10
**Coherence:** {{coherence_score}}/10
**Freshness:** {{freshness_score}}/10

## Compliance Validation Results
**BMad Method Compliance:** {{bmad_compliance_status}}
**Agent Type Compliance:** {{agent_compliance_status}}
**Token Count:** {{token_count}}/{{token_limit}}
**File Size:** {{file_size}}/50KB
**Template Compliance:** {{template_compliance_status}}

## Performance Impact Assessment
**Memory Usage:** {{memory_usage_mb}} MB
**Load Time:** {{load_time_ms}} ms
**Processing Speed:** {{processing_speed_rating}}/10
**Optimization Score:** {{optimization_score}}/10

## Access Control Verification
**Permission Level:** {{permission_level}}
**Access Restrictions:** {{access_restrictions}}
**Audit Compliance:** {{audit_compliance_status}}

## Recommendations
{{validation_recommendations}}

## Action Items
{{required_action_items}}
```

### Validation Decision Matrix
```
## Validation Decision: {{validation_decision}}

✅ **APPROVED** - Context meets all validation criteria
⚠️ **APPROVED WITH CONDITIONS** - Minor issues identified, conditions specified
❌ **REJECTED** - Critical issues require resolution before approval
🔄 **REQUIRES REVALIDATION** - Changes made, revalidation needed

**Justification:** {{validation_justification}}
**Conditions/Requirements:** {{validation_conditions}}
**Next Steps:** {{next_validation_steps}}
```

## Error Handling

### Critical Validation Failures
- Block context usage until issues resolved
- Alert system administrators of security risks
- Log all critical failures for analysis
- Initiate incident response procedures

### Warning-Level Issues
- Allow context usage with monitoring
- Flag issues for future remediation
- Track warning trends and patterns
- Schedule regular review and cleanup

### Validation Process Failures
- Retry validation with alternative methods
- Escalate to human review when automated validation fails
- Document process improvements needed
- Maintain system reliability and availability

## Dependencies
- context-compression utility
- context-filtering utility

## Configuration
Uses settings from core-config.yaml context_engineering section:
- Security validation thresholds and policies
- Quality standards and acceptance criteria
- Compliance requirements and standards
- Performance limits and optimization targets
- Access control rules and permissions
- Audit logging requirements and retention policies 