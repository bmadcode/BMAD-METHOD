# BMAD Persona Matching Algorithms

## Overview

The Persona Matching Algorithms provide sophisticated capability-based matching between user requests and available personas, ensuring optimal routing decisions with high accuracy and confidence.

## Core Matching Algorithms

###  Capability-Based Matching Engine

#### Primary Capability Scoring
```python
def calculate_primary_capability_match(request_domain, persona_capabilities):
    """
    Calculate primary capability match score between request and persona
    Returns normalized score between 0.0 and 1.0
    """
    
    # Define capability weights for different domains
    capability_weights = {
        'exact_match': 1.0,
        'strong_overlap': 0.8,
        'moderate_overlap': 0.6,
        'weak_overlap': 0.3,
        'no_overlap': 0.0
    }
    
    # Calculate overlap between request domain and persona capabilities
    overlap_level = assess_capability_overlap(request_domain, persona_capabilities.primary)
    
    # Apply domain-specific adjustments
    domain_adjustment = get_domain_specific_adjustment(request_domain, persona_capabilities)
    
    # Calculate final score
    base_score = capability_weights[overlap_level]
    adjusted_score = apply_domain_adjustment(base_score, domain_adjustment)
    
    return min(adjusted_score, 1.0)

def assess_capability_overlap(request_domain, persona_capabilities):
    """Assess the level of overlap between request and persona capabilities"""
    
    # Extract key concepts from request domain
    request_concepts = extract_domain_concepts(request_domain)
    
    # Extract key concepts from persona capabilities
    persona_concepts = extract_capability_concepts(persona_capabilities)
    
    # Calculate concept overlap
    overlap_ratio = calculate_concept_overlap_ratio(request_concepts, persona_concepts)
    
    # Map overlap ratio to overlap level
    if overlap_ratio >= 0.9:
        return 'exact_match'
    elif overlap_ratio >= 0.7:
        return 'strong_overlap'
    elif overlap_ratio >= 0.5:
        return 'moderate_overlap'
    elif overlap_ratio >= 0.2:
        return 'weak_overlap'
    else:
        return 'no_overlap'
```

#### Multi-Dimensional Scoring Matrix
\```yaml
scoring_dimensions:
  primary_expertise:
    weight: 0.40
    description: "Core specialization alignment"
    calculation: "direct_capability_match"
    
  secondary_expertise:
    weight: 0.25
    description: "Supporting skill alignment"
    calculation: "secondary_capability_overlap"
    
  technology_stack:
    weight: 0.15
    description: "Technology expertise alignment"
    calculation: "technology_overlap_score"
    
  complexity_handling:
    weight: 0.10
    description: "Ability to handle request complexity"
    calculation: "complexity_compatibility_score"
    
  domain_experience:
    weight: 0.05
    description: "Domain-specific experience"
    calculation: "domain_experience_score"
    
  collaboration_fit:
    weight: 0.05
    description: "Fit within workflow context"
    calculation: "workflow_compatibility_score"
```

###  Advanced Matching Strategies

#### Semantic Similarity Matching
```python
def calculate_semantic_similarity(request_text, persona_description):
    """
    Calculate semantic similarity between request and persona using NLP
    """
    
    # Preprocess texts
    request_tokens = preprocess_text(request_text)
    persona_tokens = preprocess_text(persona_description)
    
    # Generate embeddings
    request_embedding = generate_text_embedding(request_tokens)
    persona_embedding = generate_text_embedding(persona_tokens)
    
    # Calculate cosine similarity
    similarity_score = cosine_similarity(request_embedding, persona_embedding)
    
    # Apply semantic boosters for domain-specific terms
    boosted_score = apply_semantic_boosters(similarity_score, request_tokens, persona_tokens)
    
    return boosted_score

def apply_semantic_boosters(base_score, request_tokens, persona_tokens):
    """Apply domain-specific semantic boosters"""
    
    semantic_boosters = {
        'exact_term_match': 0.2,
        'synonym_match': 0.1,
        'domain_concept_match': 0.15,
        'technology_match': 0.1
    }
    
    boost_score = 0.0
    
    # Check for exact term matches
    exact_matches = find_exact_matches(request_tokens, persona_tokens)
    boost_score += len(exact_matches) * semantic_boosters['exact_term_match']
    
    # Check for synonym matches
    synonym_matches = find_synonym_matches(request_tokens, persona_tokens)
    boost_score += len(synonym_matches) * semantic_boosters['synonym_match']
    
    # Check for domain concept matches
    concept_matches = find_concept_matches(request_tokens, persona_tokens)
    boost_score += len(concept_matches) * semantic_boosters['domain_concept_match']
    
    # Apply boost with diminishing returns
    final_score = base_score + (boost_score * (1 - base_score))
    
    return min(final_score, 1.0)
```

#### Context-Aware Matching
\```yaml
context_matching_factors:
  project_phase_alignment:
    weight: 0.3
    factors:
      - "persona_optimal_phases"
      - "current_project_phase"
      - "phase_transition_requirements"
      
  workflow_position:
    weight: 0.25
    factors:
      - "persona_workflow_dependencies"
      - "current_workflow_state"
      - "required_handoff_capabilities"
      
  stakeholder_requirements:
    weight: 0.2
    factors:
      - "stakeholder_communication_needs"
      - "persona_stakeholder_interaction_skills"
      - "required_presentation_capabilities"
      
  technical_constraints:
    weight: 0.15
    factors:
      - "existing_technology_stack"
      - "persona_technology_expertise"
      - "integration_requirements"
      
  timeline_constraints:
    weight: 0.1
    factors:
      - "available_time_for_task"
      - "persona_typical_delivery_time"
      - "urgency_level_compatibility"
```

###  Multi-Persona Coordination Algorithms

#### Collaborative Scoring Algorithm
```python
def calculate_multi_persona_score(request_features, persona_combination):
    """
    Calculate effectiveness score for multi-persona combinations
    """
    
    # Individual persona scores
    individual_scores = [
        calculate_individual_persona_score(request_features, persona)
        for persona in persona_combination
    ]
    
    # Collaboration synergy score
    synergy_score = calculate_collaboration_synergy(persona_combination)
    
    # Coverage completeness score
    coverage_score = calculate_requirement_coverage(request_features, persona_combination)
    
    # Workflow efficiency score
    efficiency_score = calculate_workflow_efficiency(persona_combination)
    
    # Communication overhead penalty
    communication_penalty = calculate_communication_overhead(persona_combination)
    
    # Calculate weighted combination score
    combination_score = (
        np.mean(individual_scores) * 0.4 +
        synergy_score * 0.25 +
        coverage_score * 0.2 +
        efficiency_score * 0.1 +
        (1 - communication_penalty) * 0.05
    )
    
    return combination_score

def calculate_collaboration_synergy(persona_combination):
    """Calculate synergy between personas in combination"""
    
    synergy_matrix = {
        ('architect', 'design_architect'): 0.9,
        ('architect', 'performance_optimization_specialist'): 0.85,
        ('security_integration_specialist', 'architect'): 0.8,
        ('technical_documentation_architect', 'architect'): 0.75,
        ('advanced_troubleshooting_specialist', 'performance_optimization_specialist'): 0.9,
        ('enterprise_architecture_consultant', 'architect'): 0.85,
        ('polyglot_code_review_specialist', 'security_integration_specialist'): 0.8
    }
    
    total_synergy = 0.0
    pair_count = 0
    
    # Calculate synergy for all persona pairs
    for i, persona1 in enumerate(persona_combination):
        for persona2 in persona_combination[i+1:]:
            pair_key = tuple(sorted([persona1, persona2]))
            synergy = synergy_matrix.get(pair_key, 0.5)  # Default neutral synergy
            total_synergy += synergy
            pair_count += 1
    
    return total_synergy / pair_count if pair_count > 0 else 0.5
```

#### Workflow Optimization Scoring
\```yaml
workflow_patterns:
  sequential_workflow:
    description: "Personas work in sequence with handoffs"
    efficiency_factors:
      - "handoff_quality_between_personas"
      - "context_preservation_capability"
      - "workflow_dependency_satisfaction"
    scoring_formula: "sum(handoff_scores) / number_of_handoffs"
    
  parallel_workflow:
    description: "Multiple personas work simultaneously"
    efficiency_factors:
      - "parallel_work_capability"
      - "coordination_overhead"
      - "result_integration_complexity"
    scoring_formula: "parallel_capability - coordination_overhead"
    
  hierarchical_workflow:
    description: "Primary persona with specialist consultations"
    efficiency_factors:
      - "primary_persona_leadership_capability"
      - "specialist_consultation_effectiveness"
      - "decision_integration_efficiency"
    scoring_formula: "leadership_score * consultation_effectiveness"
    
  dynamic_workflow:
    description: "Adaptive persona switching based on needs"
    efficiency_factors:
      - "context_switching_efficiency"
      - "adaptive_capability"
      - "continuity_preservation"
    scoring_formula: "adaptability_score * continuity_score"
```

###  Confidence Calculation Framework

#### Multi-Factor Confidence Scoring
```python
def calculate_routing_confidence(persona_scores, request_features, context):
    """
    Calculate overall confidence in routing decision
    """
    
    # Score distribution analysis
    score_distribution = analyze_score_distribution(persona_scores)
    
    # Request clarity assessment
    request_clarity = assess_request_clarity(request_features)
    
    # Context completeness assessment
    context_completeness = assess_context_completeness(context)
    
    # Historical accuracy for similar requests
    historical_accuracy = get_historical_accuracy(request_features)
    
    # Calculate confidence components
    confidence_components = {
        'score_separation': calculate_score_separation_confidence(score_distribution),
        'top_score_magnitude': calculate_magnitude_confidence(persona_scores),
        'request_clarity': request_clarity,
        'context_completeness': context_completeness,
        'historical_accuracy': historical_accuracy
    }
    
    # Weight and combine confidence factors
    confidence_weights = {
        'score_separation': 0.3,
        'top_score_magnitude': 0.25,
        'request_clarity': 0.2,
        'context_completeness': 0.15,
        'historical_accuracy': 0.1
    }
    
    overall_confidence = sum(
        confidence_components[factor] * weight
        for factor, weight in confidence_weights.items()
    )
    
    return {
        'overall_confidence': overall_confidence,
        'confidence_level': map_confidence_to_level(overall_confidence),
        'confidence_components': confidence_components,
        'routing_recommendation': get_routing_recommendation(overall_confidence)
    }

def calculate_score_separation_confidence(score_distribution):
    """Calculate confidence based on separation between top scores"""
    
    sorted_scores = sorted(score_distribution.values(), reverse=True)
    
    if len(sorted_scores) < 2:
        return 1.0  # Only one option, high confidence
    
    # Calculate separation between top two scores
    top_score = sorted_scores[0]
    second_score = sorted_scores[1]
    separation = top_score - second_score
    
    # Map separation to confidence (larger separation = higher confidence)
    if separation >= 0.3:
        return 1.0
    elif separation >= 0.2:
        return 0.8
    elif separation >= 0.1:
        return 0.6
    elif separation >= 0.05:
        return 0.4
    else:
        return 0.2
```

#### Confidence Level Mapping
\```yaml
confidence_levels:
  very_high:
    range: "0.85 - 1.0"
    action: "automatic_routing"
    user_notification: "Routing to {persona} with high confidence"
    validation_required: false
    
  high:
    range: "0.7 - 0.85"
    action: "routing_with_confirmation"
    user_notification: "Recommended: {persona}. Proceed?"
    validation_required: true
    
  medium:
    range: "0.5 - 0.7"
    action: "present_top_options"
    user_notification: "Multiple good options available. Please choose:"
    validation_required: true
    
  low:
    range: "0.3 - 0.5"
    action: "guided_clarification"
    user_notification: "Need more information to route effectively"
    validation_required: true
    
  very_low:
    range: "0.0 - 0.3"
    action: "fallback_to_orchestrator"
    user_notification: "Let me help you find the right expertise"
    validation_required: true
```

###  Learning and Adaptation

#### Feedback Integration Algorithm
```python
def integrate_routing_feedback(routing_decision, user_feedback, outcome_metrics):
    """
    Integrate user feedback to improve future routing decisions
    """
    
    # Extract feedback components
    satisfaction_score = user_feedback.satisfaction_score
    accuracy_rating = user_feedback.accuracy_rating
    alternative_preference = user_feedback.alternative_preference
    
    # Update persona scoring weights
    update_persona_weights(routing_decision, satisfaction_score)
    
    # Update capability matching algorithms
    update_capability_matching(routing_decision, accuracy_rating)
    
    # Update confidence calculation parameters
    update_confidence_parameters(routing_decision, user_feedback)
    
    # Learn from alternative preferences
    learn_from_alternatives(routing_decision, alternative_preference)
    
    # Update historical accuracy data
    update_historical_accuracy(routing_decision, outcome_metrics)
    
    return {
        'learning_applied': True,
        'model_updates': get_model_update_summary(),
        'performance_impact': estimate_performance_impact()
    }

def update_persona_weights(routing_decision, satisfaction_score):
    """Update persona scoring weights based on satisfaction"""
    
    learning_rate = 0.1
    persona = routing_decision.selected_persona
    
    # Adjust weights based on satisfaction
    if satisfaction_score >= 4.0:
        # Positive feedback - increase weights for successful factors
        increase_successful_factor_weights(persona, learning_rate)
    elif satisfaction_score <= 2.0:
        # Negative feedback - decrease weights for failed factors
        decrease_failed_factor_weights(persona, learning_rate)
    
    # Normalize weights to maintain sum = 1.0
    normalize_scoring_weights()
```

###  Performance Optimization

#### Algorithmic Efficiency Improvements
\```yaml
optimization_strategies:
  caching_strategies:
    persona_capability_cache:
      description: "Cache persona capability calculations"
      cache_duration: "1 hour"
      invalidation_triggers: ["persona_updates", "capability_changes"]
      
    similarity_calculation_cache:
      description: "Cache semantic similarity calculations"
      cache_duration: "24 hours"
      invalidation_triggers: ["model_updates"]
      
    historical_accuracy_cache:
      description: "Cache historical accuracy data"
      cache_duration: "1 week"
      invalidation_triggers: ["significant_feedback_volume"]
      
  parallel_processing:
    persona_scoring:
      description: "Calculate persona scores in parallel"
      parallelization_strategy: "thread_pool"
      max_workers: 8
      
    similarity_calculations:
      description: "Calculate similarities concurrently"
      parallelization_strategy: "async_processing"
      batch_size: 10
      
  algorithmic_optimizations:
    early_termination:
      description: "Stop calculations when high confidence reached"
      confidence_threshold: 0.95
      
    pruning:
      description: "Eliminate low-probability personas early"
      pruning_threshold: 0.1
      
    approximation:
      description: "Use approximations for non-critical calculations"
      approximation_tolerance: 0.05
```
