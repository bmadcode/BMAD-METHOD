# Root Cause Analysis Task

## Purpose
To conduct comprehensive root cause analysis for complex technical issues, utilizing systematic methodologies to identify underlying causes and develop effective prevention strategies across all technology stacks.

## Task Overview
This task provides a structured approach to deep-dive analysis of technical problems, ensuring thorough investigation of root causes and development of comprehensive solutions that address underlying issues rather than just symptoms.

## Inputs for this Task
- Incident description and timeline
- System logs and diagnostic data
- Performance metrics and monitoring data
- Environmental configuration details
- Stakeholder interviews and observations
- Previous incident history and patterns

## Task Execution Instructions

### Phase 1: Incident Reconstruction and Data Collection

#### 1.1 Timeline Reconstruction
- **Chronological Analysis:**
  - Create detailed timeline of events leading to the incident
  - Identify trigger events and contributing factors
  - Map system changes and deployments to timeline
  - Correlate user actions with system behaviors

- **Data Point Collection:**
  - Gather all relevant logs from affected systems
  - Collect performance metrics before, during, and after incident
  - Document configuration changes and system modifications
  - Compile user reports and stakeholder observations

#### 1.2 System State Analysis
- **Pre-Incident State:**
  - Analyze system health and performance baselines
  - Review recent changes and deployments
  - Identify any warning signs or anomalies
  - Document normal operational parameters

- **Incident State:**
  - Capture system behavior during the incident
  - Document error conditions and failure modes
  - Analyze resource utilization and constraints
  - Record user impact and business consequences

### Phase 2: Systematic Root Cause Investigation

#### 2.1 5 Whys Analysis
- **Iterative Questioning:**
  - Start with the immediate problem statement
  - Ask "Why did this happen?" for each identified cause
  - Continue questioning until fundamental root cause is reached
  - Document each level of analysis with supporting evidence

- **Evidence Validation:**
  - Support each "why" with concrete evidence
  - Verify assumptions with data and testing
  - Eliminate speculation and focus on facts
  - Cross-reference findings with multiple data sources

#### 2.2 Fishbone Diagram Analysis
- **Category-Based Investigation:**
  - **People:** Human factors, training, procedures, communication
  - **Process:** Workflows, procedures, policies, standards
  - **Technology:** Hardware, software, infrastructure, tools
  - **Environment:** External factors, dependencies, constraints

- **Comprehensive Cause Mapping:**
  - Identify all potential contributing factors in each category
  - Analyze interactions between different categories
  - Prioritize causes based on impact and evidence
  - Validate cause relationships with data and testing

#### 2.3 Fault Tree Analysis
- **Top-Down Analysis:**
  - Start with the top-level failure event
  - Systematically break down into contributing events
  - Use logical gates (AND, OR) to show relationships
  - Continue decomposition until basic events are reached

- **Probability Assessment:**
  - Assign probability estimates to basic events
  - Calculate overall failure probability
  - Identify critical paths and high-impact factors
  - Prioritize mitigation efforts based on risk analysis

### Phase 3: Contributing Factor Analysis

#### 3.1 Technical Contributing Factors
- **System Design Issues:**
  - Architecture limitations and design flaws
  - Scalability constraints and bottlenecks
  - Integration weaknesses and dependencies
  - Performance limitations and resource constraints

- **Implementation Problems:**
  - Code defects and logic errors
  - Configuration mistakes and inconsistencies
  - Deployment issues and environment differences
  - Testing gaps and validation failures

#### 3.2 Process Contributing Factors
- **Operational Processes:**
  - Monitoring and alerting gaps
  - Incident response procedures
  - Change management processes
  - Capacity planning and resource management

- **Development Processes:**
  - Code review and quality assurance
  - Testing strategies and coverage
  - Deployment and release procedures
  - Documentation and knowledge management

#### 3.3 Human Contributing Factors
- **Knowledge and Training:**
  - Skill gaps and training needs
  - Knowledge transfer and documentation
  - Experience levels and expertise
  - Communication and collaboration

- **Decision Making:**
  - Risk assessment and management
  - Priority setting and resource allocation
  - Escalation procedures and authority
  - Information availability and quality

### Phase 4: Solution Development and Prevention Strategy

#### 4.1 Immediate Corrective Actions
- **Symptom Resolution:**
  - Address immediate symptoms and restore service
  - Implement temporary workarounds if needed
  - Ensure system stability and user access
  - Monitor for recurrence or side effects

- **Data Preservation:**
  - Preserve evidence for further analysis
  - Backup system states and configurations
  - Document all corrective actions taken
  - Maintain audit trail for compliance

#### 4.2 Root Cause Remediation
- **Fundamental Fixes:**
  - Address identified root causes directly
  - Implement systematic solutions rather than patches
  - Consider long-term sustainability and maintainability
  - Plan for comprehensive testing and validation

- **System Improvements:**
  - Enhance system design and architecture
  - Improve monitoring and observability
  - Strengthen error handling and resilience
  - Optimize performance and scalability

#### 4.3 Prevention Strategy Development
- **Proactive Measures:**
  - Implement monitoring and alerting for early detection
  - Develop automated testing and validation procedures
  - Create preventive maintenance and health checks
  - Establish capacity planning and resource management

- **Process Improvements:**
  - Enhance change management and deployment procedures
  - Improve incident response and escalation processes
  - Strengthen quality assurance and testing practices
  - Develop training and knowledge sharing programs

## Quality Validation

### Analysis Quality Checks
- [ ] Root cause analysis is evidence-based and thorough
- [ ] Multiple analysis methodologies were applied appropriately
- [ ] All contributing factors were identified and validated
- [ ] Cause relationships are logical and well-supported
- [ ] Analysis depth reaches fundamental root causes

### Solution Quality Checks
- [ ] Solutions address root causes, not just symptoms
- [ ] Prevention strategies are comprehensive and practical
- [ ] Implementation plans are detailed and realistic
- [ ] Risk assessment and mitigation are included
- [ ] Success criteria and metrics are defined

### Documentation Quality Checks
- [ ] Analysis process and findings are clearly documented
- [ ] Evidence and supporting data are properly referenced
- [ ] Recommendations are actionable and prioritized
- [ ] Lessons learned are captured and shareable
- [ ] Knowledge base is updated with findings

## Integration Points

### BMAD Method Integration
- Integration with troubleshooting and problem resolution workflows
- Cross-persona collaboration for complex multi-domain analysis
- Integration with quality validation and improvement processes
- Support for organizational learning and knowledge management

### Tool and Process Integration
- Integration with incident management and ticketing systems
- Support for monitoring and observability platforms
- Compatibility with quality assurance and testing frameworks
- Integration with change management and deployment processes

## Success Metrics

### Analysis Effectiveness
- Root cause identification accuracy
- Analysis completeness and thoroughness
- Time to root cause identification
- Stakeholder satisfaction with analysis quality

### Solution Effectiveness
- Problem recurrence rate
- Solution implementation success rate
- Prevention strategy effectiveness
- System reliability improvement

### Organizational Learning
- Knowledge base contribution and utilization
- Process improvement implementation rate
- Team skill development and knowledge transfer
- Incident prevention and early detection improvement

## Deliverables

### Primary Deliverables
- **Root Cause Analysis Report:** Comprehensive analysis with findings and evidence
- **Corrective Action Plan:** Detailed plan for addressing root causes
- **Prevention Strategy:** Comprehensive approach to preventing recurrence
- **Implementation Roadmap:** Prioritized plan for solution implementation

### Supporting Deliverables
- **Timeline Reconstruction:** Detailed chronology of events and factors
- **Contributing Factor Analysis:** Comprehensive analysis of all contributing elements
- **Risk Assessment:** Analysis of risks and mitigation strategies
- **Lessons Learned Document:** Insights and recommendations for organizational improvement

Remember: Effective root cause analysis requires systematic methodology, thorough investigation, and focus on fundamental causes rather than surface symptoms.
