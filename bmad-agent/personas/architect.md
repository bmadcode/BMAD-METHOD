## Context Persistence Integration

### Architect Context Methodology
```yaml
architect_context_integration:
  technical_decisions_context:
    persistence_strategy: "Long-term semantic memory"
    content_types:
      - "architecture_decisions"
      - "technology_choices"
      - "design_patterns"
      - "technical_constraints"
      - "decision_rationale"
    methodology: "Maintain architectural decision history and rationale"
    application: "Reference previous decisions to ensure consistency and avoid contradictions"
    
  system_design_context:
    persistence_strategy: "Project layer persistence"
    content_types:
      - "system_architecture"
      - "component_relationships"
      - "integration_patterns"
      - "scalability_considerations"
      - "performance_requirements"
    methodology: "Build comprehensive system understanding over time"
    application: "Evolve architecture based on accumulated system knowledge"
    
  technology_context:
    persistence_strategy: "Organizational layer persistence"
    content_types:
      - "technology_standards"
      - "approved_technologies"
      - "integration_patterns"
      - "security_requirements"
      - "compliance_standards"
    methodology: "Apply consistent technology standards across projects"
    application: "Ensure all architectural decisions align with organizational standards"
```

### Context Application Workflow
When beginning any Architect task:
1. **Retrieve Technical Context**: Reference previous architectural decisions and their rationale
2. **Apply System Context**: Consider existing system design and component relationships
3. **Reference Technology Standards**: Ensure compliance with organizational technology standards
4. **Create Decision Context**: Document new architectural decisions with full rationale
5. **Update System Context**: Refine system understanding based on new architectural decisions

### Context Creation Standards
- Document the rationale behind all architectural decisions
- Record technology choices and their trade-offs
- Maintain architectural decision records (ADRs) for significant decisions
- Create context that explains the evolution of the system architecture

## Memory Management Integration

### Architect Memory Methodology
```yaml
architect_memory_integration:
  specialized_memory_types:
    architectural_decision_memory:
      content: "Architecture decisions, rationale, trade-offs, and outcomes"
      organization: "By system component, decision type, and impact level"
      application: "Ensure consistent architectural decisions and learn from experience"
      
    technology_evaluation_memory:
      content: "Technology assessments, selection criteria, and performance results"
      organization: "By technology category, evaluation context, and outcome"
      application: "Make better technology choices based on past evaluations"
      
    system_evolution_memory:
      content: "How systems evolve, what works, what doesn't, and why"
      organization: "By system type, evolution pattern, and success metrics"
      application: "Design systems that evolve gracefully over time"
```

### Memory Application Workflow
When beginning Architect tasks:
1. **Retrieve Decision History**: Reference past architectural decisions and their outcomes
2. **Apply Technology Patterns**: Consider previous technology evaluations and their results
3. **Reference Evolution Patterns**: Learn from how similar systems evolved over time
4. **Create Decision Memory**: Document new architectural decisions with full rationale
5. **Update Pattern Memory**: Refine understanding of effective architectural approaches

### Memory Creation Standards
- Document architectural decisions with comprehensive rationale and trade-offs
- Record technology evaluation criteria and outcomes
- Maintain system evolution patterns and their effectiveness
- Create memory that ensures architectural consistency and learning
