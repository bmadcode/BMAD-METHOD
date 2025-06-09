# BMAD Memory Architecture Methodology

## Overview

The BMAD Memory Architecture Methodology provides a framework for implementing AI agent memory management across different IDE environments (Claude Code, Cursor AI, V0, Roocode, JetBrains, etc.). This methodology defines how to structure, store, and retrieve memory within the constraints and capabilities of each environment.

## Core Memory Concepts

### Memory Types Framework

The BMAD methodology defines six core memory types that should be implemented within each IDE's available storage mechanisms:

#### Working Memory
- **Purpose**: Active task processing and immediate context
- **Retention**: Session duration only
- **Implementation Strategy**: Use IDE's session storage or temporary variables
- **Example Usage**: Current file context, active reasoning chains, immediate user inputs

#### Short-Term Memory  
- **Purpose**: Recent interactions and project context
- **Retention**: Hours to days
- **Implementation Strategy**: Use IDE's workspace storage or project-scoped persistence
- **Example Usage**: Recent conversations, current sprint context, active workflows

#### Episodic Memory
- **Purpose**: Specific past interactions and events
- **Retention**: Weeks to months  
- **Implementation Strategy**: Use IDE's persistent storage with timestamp indexing
- **Example Usage**: Previous sessions, project milestones, specific decisions made

#### Semantic Memory
- **Purpose**: Conceptual knowledge and learned patterns
- **Retention**: Months to years
- **Implementation Strategy**: Use IDE's knowledge base or embedding storage
- **Example Usage**: Domain expertise, coding patterns, architectural principles

#### Procedural Memory
- **Purpose**: Workflows, processes, and methods
- **Retention**: Persistent
- **Implementation Strategy**: Use IDE's workflow storage or template systems
- **Example Usage**: Development workflows, testing procedures, deployment processes

#### Long-Term Memory
- **Purpose**: Historical context and organizational knowledge
- **Retention**: Years to permanent
- **Implementation Strategy**: Use IDE's long-term storage or external integration
- **Example Usage**: Project history, team knowledge, organizational patterns

## IDE-Specific Implementation Strategies

### Claude Code Implementation

#### Memory Storage Approach
```yaml
storage_strategy:
  working_memory:
    mechanism: "conversation_context"
    location: "current_session"
    format: "structured_prompts"
    
  short_term_memory:
    mechanism: "file_annotations"
    location: ".claude/memory/"
    format: "markdown_files"
    
  episodic_memory:
    mechanism: "conversation_history"
    location: "session_logs"
    format: "timestamped_entries"
    
  semantic_memory:
    mechanism: "knowledge_extraction"
    location: "project_context"
    format: "concept_maps"
    
  procedural_memory:
    mechanism: "workflow_templates"
    location: "process_definitions"
    format: "step_by_step_guides"
    
  long_term_memory:
    mechanism: "project_documentation"
    location: "persistent_files"
    format: "structured_documentation"
```

#### Implementation Guidelines
1. **Context Management**: Use conversation context to maintain working memory
2. **File-Based Persistence**: Store memories as markdown files in project structure
3. **Prompt Engineering**: Design prompts that reference and update memory
4. **Session Continuity**: Maintain memory across conversation sessions

### Cursor AI Implementation

#### Memory Storage Approach
```yaml
storage_strategy:
  working_memory:
    mechanism: "editor_state"
    location: "active_buffers"
    format: "editor_annotations"
    
  short_term_memory:
    mechanism: "workspace_storage"
    location: ".cursor/bmad/"
    format: "json_files"
    
  episodic_memory:
    mechanism: "activity_logs"
    location: "workspace_history"
    format: "event_streams"
    
  semantic_memory:
    mechanism: "code_intelligence"
    location: "language_server"
    format: "semantic_index"
    
  procedural_memory:
    mechanism: "custom_commands"
    location: "command_palette"
    format: "action_definitions"
    
  long_term_memory:
    mechanism: "project_database"
    location: "persistent_storage"
    format: "relational_data"
```

#### Implementation Guidelines
1. **Extension Integration**: Leverage Cursor's extension API for memory storage
2. **Language Server**: Use language server protocol for semantic memory
3. **Command System**: Implement procedural memory through custom commands
4. **Workspace Awareness**: Integrate with workspace and project structure

### V0 Implementation

#### Memory Storage Approach
```yaml
storage_strategy:
  working_memory:
    mechanism: "component_state"
    location: "active_components"
    format: "react_state"
    
  short_term_memory:
    mechanism: "session_storage"
    location: "browser_session"
    format: "json_objects"
    
  episodic_memory:
    mechanism: "interaction_history"
    location: "user_sessions"
    format: "event_log"
    
  semantic_memory:
    mechanism: "design_patterns"
    location: "component_library"
    format: "pattern_definitions"
    
  procedural_memory:
    mechanism: "generation_workflows"
    location: "workflow_engine"
    format: "process_chains"
    
  long_term_memory:
    mechanism: "project_persistence"
    location: "cloud_storage"
    format: "project_snapshots"
```

#### Implementation Guidelines
1. **Component Memory**: Use React state and context for working memory
2. **Browser Storage**: Leverage localStorage and sessionStorage
3. **Design Patterns**: Store UI/UX patterns as reusable components
4. **Generation History**: Maintain history of generated components

### JetBrains Implementation

#### Memory Storage Approach
```yaml
storage_strategy:
  working_memory:
    mechanism: "plugin_state"
    location: "active_session"
    format: "plugin_data"
    
  short_term_memory:
    mechanism: "project_storage"
    location: ".idea/bmad/"
    format: "xml_configuration"
    
  episodic_memory:
    mechanism: "action_history"
    location: "ide_logs"
    format: "action_events"
    
  semantic_memory:
    mechanism: "code_analysis"
    location: "index_storage"
    format: "psi_elements"
    
  procedural_memory:
    mechanism: "live_templates"
    location: "template_storage"
    format: "template_definitions"
    
  long_term_memory:
    mechanism: "persistent_storage"
    location: "application_data"
    format: "serialized_objects"
```

#### Implementation Guidelines
1. **Plugin Architecture**: Use JetBrains plugin system for memory management
2. **PSI Integration**: Leverage Program Structure Interface for semantic memory
3. **Live Templates**: Implement procedural memory through live templates
4. **Project Model**: Integrate with JetBrains project model

## Memory Operations Methodology

### Storage Operations

#### Memory Creation Process
1. **Identify Memory Type**: Determine which memory type is appropriate
2. **Extract Key Information**: Pull relevant data from context
3. **Apply Storage Strategy**: Use IDE-appropriate storage mechanism
4. **Create Relationships**: Link to related memories
5. **Set Retention Policy**: Define how long memory should persist

#### Memory Update Process
1. **Locate Existing Memory**: Find memory using ID or content matching
2. **Merge Information**: Combine new information with existing
3. **Update Relationships**: Modify connections to other memories
4. **Refresh Timestamps**: Update access and modification times
5. **Maintain Consistency**: Ensure data integrity across storage

### Retrieval Operations

#### Query Strategy Selection
```yaml
query_strategies:
  direct_lookup:
    when_to_use: "Known memory ID or exact reference"
    implementation: "ID-based retrieval from storage"
    
  semantic_search:
    when_to_use: "Conceptual queries or similarity matching"
    implementation: "Embedding-based similarity search"
    
  keyword_search:
    when_to_use: "Specific terms or tag-based queries"
    implementation: "Text-based search with indexing"
    
  temporal_search:
    when_to_use: "Time-based queries or recent activity"
    implementation: "Timestamp-based filtering and sorting"
    
  relationship_traversal:
    when_to_use: "Connected information or dependency chains"
    implementation: "Graph-based traversal algorithms"
    
  hybrid_search:
    when_to_use: "Complex queries requiring multiple strategies"
    implementation: "Combination of above strategies with scoring"
```

#### Retrieval Implementation Pattern
1. **Analyze Query**: Determine intent and appropriate strategy
2. **Execute Search**: Apply selected retrieval strategy
3. **Filter Results**: Apply security and relevance filtering
4. **Rank Results**: Score and sort by relevance
5. **Format Response**: Present results in appropriate format

## Security and Privacy Methodology

### Access Control Framework

#### Privacy Levels
```yaml
privacy_levels:
  public:
    description: "Accessible to all personas and users"
    implementation: "No access restrictions"
    use_cases: ["shared_knowledge", "public_documentation"]
    
  shared:
    description: "Accessible to specific personas/users"
    implementation: "Role-based access control"
    use_cases: ["team_knowledge", "project_specific_info"]
    
  private:
    description: "Accessible only to creator"
    implementation: "Owner-only access"
    use_cases: ["personal_notes", "individual_preferences"]
    
  sensitive:
    description: "High-security information"
    implementation: "Encrypted storage with authentication"
    use_cases: ["credentials", "confidential_data"]
```

#### Security Implementation Guidelines
1. **Access Verification**: Check permissions before memory operations
2. **Data Minimization**: Store only necessary information
3. **Encryption**: Encrypt sensitive memories at rest
4. **Audit Logging**: Log access and modifications for security
5. **User Control**: Provide user control over memory retention

## Performance Optimization Methodology

### Caching Strategy

#### Multi-Level Caching
```yaml
caching_levels:
  working_memory_cache:
    purpose: "Immediate access to active memories"
    implementation: "In-memory cache with LRU eviction"
    size_limit: "Based on available memory"
    
  frequent_access_cache:
    purpose: "Quick access to commonly used memories"
    implementation: "Frequency-based caching"
    size_limit: "Configurable based on usage patterns"
    
  query_result_cache:
    purpose: "Cache search results for repeated queries"
    implementation: "Query signature-based caching"
    size_limit: "Time-based expiration"
```

#### Performance Guidelines
1. **Lazy Loading**: Load memories only when needed
2. **Batch Operations**: Group related operations for efficiency
3. **Background Processing**: Perform maintenance tasks asynchronously
4. **Resource Monitoring**: Monitor and adapt to resource constraints
5. **Graceful Degradation**: Maintain functionality under resource pressure

## Integration Patterns

### Persona Integration

#### Memory Specialization by Persona
```yaml
persona_memory_patterns:
  architect:
    primary_types: ["semantic", "procedural", "long_term"]
    specializations: ["architectural_patterns", "technical_decisions"]
    storage_focus: "structured_knowledge_base"
    
  product_manager:
    primary_types: ["episodic", "semantic", "long_term"]
    specializations: ["requirements_tracking", "stakeholder_feedback"]
    storage_focus: "requirement_documentation"
    
  v0_ux_ui_architect:
    primary_types: ["semantic", "procedural", "episodic"]
    specializations: ["design_patterns", "component_library"]
    storage_focus: "visual_pattern_recognition"
```

### Orchestrator Integration

#### Memory-Orchestrator Communication
1. **Context Sharing**: Share relevant memories with orchestrator
2. **Memory Triggers**: Use memory events to trigger orchestrator actions
3. **Workflow Integration**: Integrate memory operations into workflows
4. **State Synchronization**: Keep memory and orchestrator state aligned
5. **Event Propagation**: Propagate memory changes to relevant components

## Implementation Checklist

### Phase 1: Foundation
- [ ] Define memory types for your IDE environment
- [ ] Implement basic storage mechanisms
- [ ] Create memory entity structures
- [ ] Implement direct retrieval
- [ ] Add basic security controls

### Phase 2: Enhancement
- [ ] Add semantic search capabilities
- [ ] Implement relationship management
- [ ] Add temporal indexing
- [ ] Implement caching layer
- [ ] Add privacy controls

### Phase 3: Integration
- [ ] Integrate with persona workflows
- [ ] Connect to orchestrator system
- [ ] Add performance monitoring
- [ ] Implement learning algorithms
- [ ] Add user controls

### Phase 4: Optimization
- [ ] Optimize for IDE-specific constraints
- [ ] Add predictive caching
- [ ] Implement adaptive management
- [ ] Add analytics and reporting
- [ ] Optimize resource usage

## Best Practices

### Memory Design Principles
1. **Relevance**: Store only relevant and useful information
2. **Timeliness**: Implement appropriate retention policies
3. **Accessibility**: Ensure memories are easily retrievable
4. **Security**: Protect sensitive information appropriately
5. **Performance**: Optimize for speed and resource efficiency

### Implementation Guidelines
1. **Start Simple**: Begin with basic memory types and operations
2. **Iterate**: Gradually add complexity and features
3. **Monitor**: Track performance and usage patterns
4. **Adapt**: Adjust implementation based on real-world usage
5. **Document**: Maintain clear documentation of memory structures

This methodology provides the framework for implementing memory architecture within any IDE environment while respecting the constraints and capabilities of each platform.
