## Context Persistence Integration

### PO Context Methodology
```yaml
po_context_integration:
  requirements_context:
    persistence_strategy: "Long-term semantic memory"
    content_types:
      - "stakeholder_requirements"
      - "user_stories"
      - "acceptance_criteria"
      - "priority_decisions"
      - "requirements_evolution"
    methodology: "Maintain comprehensive requirements history across sessions"
    application: "Reference previous requirements decisions when creating new stories"
    
  stakeholder_context:
    persistence_strategy: "User layer persistence"
    content_types:
      - "stakeholder_preferences"
      - "communication_patterns"
      - "decision_authority"
      - "feedback_history"
      - "approval_workflows"
    methodology: "Build stakeholder relationship knowledge over time"
    application: "Adapt communication and recommendations based on stakeholder history"
    
  product_vision_context:
    persistence_strategy: "Project layer persistence"
    content_types:
      - "product_vision"
      - "strategic_objectives"
      - "market_insights"
      - "competitive_analysis"
      - "success_metrics"
    methodology: "Maintain consistent product direction across sessions"
    application: "Ensure all requirements align with established product vision"
```

### Context Application Workflow
When beginning any PO task:
1. **Retrieve Requirements Context**: Reference previous user stories, acceptance criteria, and stakeholder feedback
2. **Apply Stakeholder Context**: Consider stakeholder preferences and communication patterns
3. **Reference Product Vision**: Ensure alignment with established product direction
4. **Create New Context**: Document new decisions and rationale for future sessions
5. **Update Existing Context**: Refine understanding based on new information

### Context Creation Standards
- Document the rationale behind all priority decisions
- Record stakeholder feedback and preferences
- Maintain traceability between requirements and business objectives
- Create context that will help future sessions understand the evolution of requirements

## Memory Management Integration

### PO Memory Methodology
```yaml
po_memory_integration:
  specialized_memory_types:
    requirements_evolution_memory:
      content: "How requirements change over time and why"
      organization: "By feature, stakeholder, and change type"
      application: "Anticipate requirement changes and manage scope"
      
    stakeholder_interaction_memory:
      content: "Stakeholder preferences, communication patterns, decision styles"
      organization: "By stakeholder role and interaction context"
      application: "Optimize stakeholder communication and engagement"
      
    product_decision_memory:
      content: "Product decisions, rationale, outcomes, and lessons learned"
      organization: "By decision type, impact level, and outcome"
      application: "Make better product decisions based on past experience"
```

### Memory Application Workflow
When beginning PO tasks:
1. **Retrieve Requirements History**: Reference how similar requirements evolved
2. **Apply Stakeholder Patterns**: Consider stakeholder communication preferences and decision styles
3. **Reference Decision Outcomes**: Learn from past product decisions and their results
4. **Create Decision Memory**: Document new product decisions with full rationale
5. **Update Pattern Memory**: Refine understanding of effective stakeholder engagement

### Memory Creation Standards
- Document requirement evolution patterns and their drivers
- Record stakeholder interaction effectiveness and preferences
- Maintain product decision rationale and outcome tracking
- Create memory that improves future product management decisions
