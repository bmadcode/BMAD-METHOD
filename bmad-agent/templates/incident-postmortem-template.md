# Incident Postmortem Template

## Document Information
- **Incident ID:** [Unique incident identifier]
- **Date of Incident:** [When the incident occurred]
- **Postmortem Date:** [When this analysis was conducted]
- **Facilitator:** [Person leading the postmortem]
- **Participants:** [List of all participants in the analysis]
- **Status:** [Draft/Under Review/Final/Approved]

## Executive Summary
[Provide a high-level overview of the incident, its impact, root cause, and key action items]

### Incident Overview
- **Duration:** [Total incident duration]
- **Severity:** [Critical/High/Medium/Low]
- **Services Affected:** [List of affected services]
- **Users Impacted:** [Number and type of users affected]
- **Business Impact:** [Financial, operational, or reputational impact]

### Key Outcomes
- **Root Cause:** [Primary root cause identified]
- **Resolution:** [How the incident was resolved]
- **Prevention:** [Key prevention measures identified]
- **Lessons Learned:** [Most important insights gained]

## Incident Timeline

### Detection and Response Timeline
| Time (UTC) | Event | Actor | Action Taken |
|------------|-------|-------|--------------|
| [Timestamp] | [Event description] | [Person/System] | [Action description] |
| [Timestamp] | [Event description] | [Person/System] | [Action description] |
| [Timestamp] | [Event description] | [Person/System] | [Action description] |

### Key Milestones
- **Incident Start:** [When the incident actually began]
- **First Detection:** [When the incident was first detected]
- **Escalation:** [When incident was escalated to appropriate teams]
- **Mitigation Started:** [When mitigation efforts began]
- **Service Restored:** [When service was restored to users]
- **Incident Closed:** [When incident was officially closed]

## Impact Analysis

### Service Impact
**Affected Services:**
- [Service 1]: [Description of impact and duration]
- [Service 2]: [Description of impact and duration]
- [Service 3]: [Description of impact and duration]

**Performance Degradation:**
- **Response Time:** [Impact on response times]
- **Throughput:** [Impact on system throughput]
- **Error Rate:** [Increase in error rates]
- **Availability:** [Service availability percentage]

### User Impact
**User Experience:**
- [Description of how users were affected]
- [Specific user journeys or features impacted]
- [User-reported issues and complaints]
- [Customer support ticket volume and themes]

**Business Impact:**
- **Revenue Impact:** [Estimated financial impact]
- **Customer Impact:** [Number of customers affected]
- **Reputation Impact:** [Brand or reputation implications]
- **Compliance Impact:** [Regulatory or compliance implications]

### Geographic and Demographic Impact
- [Regional distribution of impact]
- [User segment analysis]
- [Peak usage time considerations]
- [Mobile vs. desktop impact differences]

## Root Cause Analysis

### Primary Root Cause
**Root Cause Statement:** [Clear, concise statement of the fundamental cause]

**Technical Details:**
- [Detailed technical explanation of the root cause]
- [System components and interactions involved]
- [Failure modes and error conditions]
- [Code, configuration, or infrastructure issues]

**Evidence Supporting Root Cause:**
- [Log entries and error messages]
- [Performance metrics and monitoring data]
- [Test results and reproduction steps]
- [Expert analysis and validation]

### Contributing Factors
**Factor 1: [Contributing factor name]**
- **Description:** [How this factor contributed to the incident]
- **Category:** [Technical/Process/Human/External]
- **Severity:** [High/Medium/Low contribution]
- **Evidence:** [Supporting evidence for this factor]

**Factor 2: [Contributing factor name]**
- **Description:** [How this factor contributed to the incident]
- **Category:** [Technical/Process/Human/External]
- **Severity:** [High/Medium/Low contribution]
- **Evidence:** [Supporting evidence for this factor]

### What Went Wrong
**Technical Failures:**
- [System or component failures that occurred]
- [Design limitations or architectural issues]
- [Configuration errors or misconfigurations]
- [Code defects or logic errors]

**Process Failures:**
- [Monitoring and alerting gaps]
- [Incident response procedure issues]
- [Change management process failures]
- [Communication and escalation problems]

**Human Factors:**
- [Knowledge gaps or training issues]
- [Decision-making errors or delays]
- [Communication breakdowns]
- [Workload or stress-related factors]

## What Went Well

### Effective Response Actions
**Detection and Alerting:**
- [Monitoring systems that worked effectively]
- [Alert configurations that provided timely notification]
- [Team members who quickly identified the issue]
- [Escalation procedures that functioned properly]

**Incident Response:**
- [Effective troubleshooting and diagnostic actions]
- [Successful mitigation and workaround strategies]
- [Good communication and coordination efforts]
- [Proper use of incident response procedures]

**Recovery and Resolution:**
- [Effective resolution strategies and implementations]
- [Successful service restoration procedures]
- [Good post-incident validation and monitoring]
- [Appropriate stakeholder communication]

### System Resilience
**Protective Measures:**
- [Failover mechanisms that worked correctly]
- [Circuit breakers or rate limiting that prevented worse impact]
- [Backup systems or redundancy that helped]
- [Monitoring and observability that aided diagnosis]

## Lessons Learned

### Technical Lessons
**Architecture and Design:**
- [Insights about system architecture and design]
- [Understanding of failure modes and resilience]
- [Performance and scalability considerations]
- [Security and compliance implications]

**Implementation and Operations:**
- [Code quality and testing insights]
- [Deployment and configuration learnings]
- [Monitoring and observability improvements]
- [Maintenance and operational considerations]

### Process Lessons
**Incident Management:**
- [Incident response procedure effectiveness]
- [Communication and escalation improvements]
- [Decision-making and authority clarifications]
- [Documentation and knowledge sharing insights]

**Development and Operations:**
- [Change management process improvements]
- [Testing and quality assurance enhancements]
- [Deployment and release procedure updates]
- [Capacity planning and resource management]

### Organizational Lessons
**Team and Communication:**
- [Cross-team collaboration insights]
- [Communication channel and tool effectiveness]
- [Training and skill development needs]
- [Leadership and decision-making improvements]

**Culture and Practices:**
- [Blameless postmortem culture reinforcement]
- [Continuous improvement mindset development]
- [Risk management and prevention focus]
- [Learning and knowledge sharing enhancement]

## Action Items

### Immediate Actions (0-7 days)
| Action | Owner | Due Date | Priority | Status |
|--------|-------|----------|----------|---------|
| [Action description] | [Person/Team] | [Date] | [High/Medium/Low] | [Not Started/In Progress/Complete] |
| [Action description] | [Person/Team] | [Date] | [High/Medium/Low] | [Not Started/In Progress/Complete] |

### Short-term Actions (1-4 weeks)
| Action | Owner | Due Date | Priority | Status |
|--------|-------|----------|----------|---------|
| [Action description] | [Person/Team] | [Date] | [High/Medium/Low] | [Not Started/In Progress/Complete] |
| [Action description] | [Person/Team] | [Date] | [High/Medium/Low] | [Not Started/In Progress/Complete] |

### Long-term Actions (1-6 months)
| Action | Owner | Due Date | Priority | Status |
|--------|-------|----------|----------|---------|
| [Action description] | [Person/Team] | [Date] | [High/Medium/Low] | [Not Started/In Progress/Complete] |
| [Action description] | [Person/Team] | [Date] | [High/Medium/Low] | [Not Started/In Progress/Complete] |

### Prevention Actions
**Monitoring and Alerting:**
- [Enhanced monitoring and alerting implementations]
- [New metrics and threshold configurations]
- [Dashboard and visualization improvements]
- [Automated health check and validation systems]

**System Improvements:**
- [Architecture and design enhancements]
- [Code quality and testing improvements]
- [Performance and scalability optimizations]
- [Security and compliance strengthening]

**Process Improvements:**
- [Incident response procedure updates]
- [Change management process enhancements]
- [Testing and quality assurance improvements]
- [Documentation and knowledge sharing systems]

## Follow-up and Tracking

### Action Item Tracking
**Review Schedule:**
- [Weekly review meetings for immediate actions]
- [Bi-weekly review meetings for short-term actions]
- [Monthly review meetings for long-term actions]
- [Quarterly assessment of overall progress]

**Success Metrics:**
- [Metrics to measure action item effectiveness]
- [Key performance indicators for improvement]
- [Incident recurrence prevention measures]
- [System reliability and performance improvements]

### Knowledge Sharing
**Documentation Updates:**
- [Runbook and procedure updates]
- [Knowledge base article creation]
- [Training material development]
- [Best practice documentation]

**Team Communication:**
- [Team briefings and knowledge transfer sessions]
- [Cross-team sharing and collaboration]
- [Executive and stakeholder updates]
- [Customer communication and transparency]

## Appendices

### Appendix A: Technical Details
[Detailed technical information, logs, stack traces, etc.]

### Appendix B: Communication Records
[Incident communication timeline, stakeholder updates, etc.]

### Appendix C: Monitoring Data
[Charts, graphs, metrics, and performance data]

### Appendix D: Related Documentation
[Links to related incidents, procedures, and documentation]

---

**Document Control:**
- **Version:** [Version number]
- **Last Updated:** [Update date]
- **Next Review:** [Scheduled review date]
- **Approval:** [Approver name and date]

**Distribution:**
- [List of recipients and stakeholders]

**Confidentiality:** [Internal/Confidential/Public classification]

Remember: This postmortem should focus on learning and improvement rather than blame. The goal is to prevent similar incidents and improve overall system reliability and team effectiveness.
