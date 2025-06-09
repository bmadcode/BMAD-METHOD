# BMAD Memory Data Structures Methodology

## Overview

This methodology defines how to structure memory data within different IDE environments. Rather than prescriptive code, this provides patterns and guidelines for implementing memory structures using each IDE's available storage and data management capabilities.

## Memory Entity Structure Patterns

### Core Memory Entity Pattern

Every memory entity should follow this conceptual structure, adapted to your IDE's data storage capabilities:

```yaml
memory_entity_pattern:
  identity:
    - unique_identifier
    - memory_type_classification
    - creation_timestamp
    - last_access_timestamp
    - access_frequency_counter
    - importance_score
    
  metadata:
    - source_information
    - owner_identification
    - project_association
    - categorization_tags
    - privacy_classification
    - retention_policy
    
  content:
    - descriptive_title
    - concise_summary
    - detailed_content
    - content_format_type
    - semantic_embeddings
    - relationship_links
    
  access_control:
    - read_permissions
    - write_permissions
    - share_permissions
```

### IDE-Specific Implementation Patterns

#### Claude Code Pattern
```yaml
claude_code_implementation:
  storage_format: "markdown_files"
  structure_approach:
    - use_yaml_frontmatter_for_metadata
    - use_markdown_body_for_content
    - use_file_naming_for_identification
    - use_directory_structure_for_organization
    
  example_structure: |
    ---
    id: mem_001
    type: semantic
    created: 2024-01-15T10:30:00Z
    importance: 0.8
    tags: [architecture, patterns, microservices]
    privacy: shared
    ---
    
    # Microservices Architecture Pattern
    
    ## Summary
    Best practices for implementing microservices architecture...
    
    ## Details
    [Detailed content here]
    
    ## Relationships
    - Related to: mem_002 (API Gateway Pattern)
    - Supports: mem_003 (Service Discovery)
```

#### Cursor AI Pattern
```yaml
cursor_ai_implementation:
  storage_format: "json_files"
  structure_approach:
    - use_json_schema_for_validation
    - use_file_system_for_organization
    - use_workspace_storage_api
    - use_extension_storage_mechanisms
    
  example_structure: |
    {
      "id": "mem_001",
      "type": "semantic",
      "created": "2024-01-15T10:30:00Z",
      "metadata": {
        "importance": 0.8,
        "tags": ["architecture", "patterns"],
        "privacy": "shared",
        "project": "current_workspace"
      },
      "content": {
        "title": "Microservices Architecture Pattern",
        "summary": "Best practices for...",
        "details": "...",
        "format": "text"
      },
      "relationships": [
        {"id": "mem_002", "type": "related", "strength": 0.9}
      ]
    }
```

#### V0 Pattern
```yaml
v0_implementation:
  storage_format: "browser_storage"
  structure_approach:
    - use_localstorage_for_persistence
    - use_sessionstorage_for_temporary
    - use_indexeddb_for_complex_data
    - use_component_state_for_active
    
  example_structure: |
    // localStorage structure
    {
      "bmad_memories": {
        "mem_001": {
          "id": "mem_001",
          "type": "procedural",
          "content": {
            "title": "Button Component Pattern",
            "summary": "Reusable button component with variants",
            "details": {
              "component_code": "...",
              "usage_examples": "...",
              "variants": ["primary", "secondary", "danger"]
            }
          },
          "metadata": {
            "created": "2024-01-15T10:30:00Z",
            "importance": 0.7,
            "tags": ["components", "ui", "buttons"]
          }
        }
      }
    }
```

#### JetBrains Pattern
```yaml
jetbrains_implementation:
  storage_format: "xml_configuration"
  structure_approach:
    - use_plugin_configuration_files
    - use_project_storage_api
    - use_application_storage_api
    - use_psi_element_references
    
  example_structure: |
    <memory-store>
      <memory id="mem_001" type="semantic">
        <metadata>
          <created>2024-01-15T10:30:00Z</created>
          <importance>0.8</importance>
          <tags>architecture,patterns</tags>
          <privacy>shared</privacy>
        </metadata>
        <content format="text">
          <title>Microservices Architecture Pattern</title>
          <summary>Best practices for implementing...</summary>
          <details>...</details>
        </content>
        <relationships>
          <relationship target="mem_002" type="related" strength="0.9"/>
        </relationships>
      </memory>
    </memory-store>
```

## Memory Type Specialization Patterns

### Working Memory Pattern
```yaml
working_memory_specialization:
  characteristics:
    - temporary_storage
    - session_scoped
    - high_access_frequency
    - automatic_cleanup
    
  implementation_guidelines:
    - store_in_volatile_memory
    - use_session_storage_mechanisms
    - implement_automatic_expiration
    - optimize_for_fast_access
    
  additional_fields:
    - active_context_identifier
    - processing_priority
    - expiration_timestamp
    - attention_focus_flag
```

### Episodic Memory Pattern
```yaml
episodic_memory_specialization:
  characteristics:
    - event_specific
    - time_bound
    - contextual_information
    - narrative_structure
    
  implementation_guidelines:
    - include_temporal_information
    - store_context_details
    - link_to_participants
    - maintain_sequence_information
    
  additional_fields:
    - event_timestamp
    - duration_information
    - location_context
    - participant_list
    - emotional_significance
    - sequence_position
```

### Semantic Memory Pattern
```yaml
semantic_memory_specialization:
  characteristics:
    - conceptual_knowledge
    - domain_specific
    - factual_information
    - relationship_rich
    
  implementation_guidelines:
    - organize_by_knowledge_domain
    - include_confidence_measures
    - track_source_reliability
    - maintain_verification_status
    
  additional_fields:
    - knowledge_domains
    - confidence_level
    - source_reliability
    - verification_status
    - last_verified_timestamp
    - contradiction_references
```

### Procedural Memory Pattern
```yaml
procedural_memory_specialization:
  characteristics:
    - process_oriented
    - step_by_step
    - executable_knowledge
    - outcome_focused
    
  implementation_guidelines:
    - structure_as_ordered_steps
    - include_success_metrics
    - track_execution_history
    - maintain_prerequisites
    
  additional_fields:
    - procedure_type
    - step_sequence
    - success_rate
    - average_duration
    - prerequisites
    - expected_outcomes
```

## Relationship Structure Patterns

### Relationship Types Framework
```yaml
relationship_types:
  hierarchical:
    - parent_child
    - contains_contained_by
    - generalizes_specializes
    
  sequential:
    - precedes_follows
    - causes_caused_by
    - enables_enabled_by
    
  associative:
    - related_to
    - similar_to
    - contrasts_with
    
  logical:
    - supports_supported_by
    - contradicts_contradicted_by
    - implies_implied_by
```

### Relationship Implementation Pattern
```yaml
relationship_implementation:
  structure:
    - source_memory_identifier
    - target_memory_identifier
    - relationship_type
    - relationship_strength
    - creation_timestamp
    - validation_status
    
  bidirectional_maintenance:
    - maintain_forward_references
    - maintain_backward_references
    - ensure_consistency
    - handle_deletion_cascades
```

## Index Structure Patterns

### Primary Index Patterns
```yaml
primary_indices:
  id_index:
    purpose: "Direct memory lookup"
    structure: "hash_map_or_dictionary"
    key: "memory_identifier"
    value: "storage_location_metadata"
    
  type_index:
    purpose: "Memory type-based queries"
    structure: "categorized_lists"
    key: "memory_type"
    value: "list_of_memory_identifiers"
    
  temporal_index:
    purpose: "Time-based queries"
    structure: "time_bucketed_lists"
    key: "time_bucket"
    value: "list_of_memory_identifiers"
```

### Secondary Index Patterns
```yaml
secondary_indices:
  keyword_index:
    purpose: "Text-based search"
    structure: "inverted_index"
    implementation: "keyword_to_memory_mapping"
    
  importance_index:
    purpose: "Priority-based retrieval"
    structure: "sorted_lists"
    implementation: "importance_score_ordering"
    
  project_index:
    purpose: "Project-scoped queries"
    structure: "hierarchical_grouping"
    implementation: "project_to_memory_mapping"
```

## Storage Organization Patterns

### File System Organization
```yaml
file_system_pattern:
  directory_structure:
    - memories/
      - working/
        - session_[timestamp]/
      - short_term/
        - [date]/
      - episodic/
        - [year]/[month]/
      - semantic/
        - [domain]/
      - procedural/
        - [category]/
      - long_term/
        - [year]/
        
  naming_conventions:
    - use_consistent_prefixes
    - include_type_indicators
    - add_timestamp_suffixes
    - maintain_readable_names
```

### Database Organization
```yaml
database_pattern:
  table_structure:
    memories_table:
      - id (primary_key)
      - type
      - created_at
      - content_blob
      - metadata_json
      
    relationships_table:
      - source_id
      - target_id
      - relationship_type
      - strength
      
    indices_table:
      - memory_id
      - index_type
      - index_value
      
  query_optimization:
    - create_appropriate_indices
    - use_composite_keys
    - implement_query_caching
    - optimize_for_common_patterns
```

## Data Validation Patterns

### Schema Validation
```yaml
validation_patterns:
  required_fields:
    - validate_presence_of_id
    - validate_memory_type
    - validate_timestamp_format
    - validate_content_structure
    
  data_integrity:
    - check_relationship_validity
    - verify_reference_consistency
    - validate_permission_structure
    - ensure_format_compliance
    
  business_rules:
    - enforce_retention_policies
    - validate_privacy_levels
    - check_access_permissions
    - verify_importance_ranges
```

### Error Handling Patterns
```yaml
error_handling:
  validation_errors:
    - provide_clear_error_messages
    - suggest_correction_actions
    - maintain_data_consistency
    - log_validation_failures
    
  storage_errors:
    - implement_retry_mechanisms
    - provide_fallback_storage
    - maintain_transaction_integrity
    - notify_of_storage_issues
    
  retrieval_errors:
    - handle_missing_memories
    - provide_partial_results
    - suggest_alternative_queries
    - maintain_search_performance
```

## Migration and Versioning Patterns

### Schema Evolution
```yaml
versioning_strategy:
  version_tracking:
    - maintain_schema_version_numbers
    - document_schema_changes
    - provide_migration_paths
    - ensure_backward_compatibility
    
  migration_patterns:
    - implement_gradual_migration
    - maintain_data_integrity
    - provide_rollback_capabilities
    - test_migration_procedures
```

### Data Migration
```yaml
migration_procedures:
  preparation:
    - backup_existing_data
    - validate_migration_scripts
    - test_on_sample_data
    - prepare_rollback_plan
    
  execution:
    - run_migration_incrementally
    - monitor_migration_progress
    - validate_migrated_data
    - update_system_references
    
  validation:
    - verify_data_integrity
    - test_system_functionality
    - validate_performance_impact
    - confirm_user_access
```

This methodology provides the framework for implementing memory data structures within any IDE environment while adapting to the specific capabilities and constraints of each platform.
