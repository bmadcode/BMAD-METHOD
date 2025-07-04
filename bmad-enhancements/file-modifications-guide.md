# BMAD Context Engineering Enhancement - File Modifications Guide

## 📋 Overview

This guide provides detailed specifications for all file modifications required to implement context engineering enhancements in the BMAD agent framework. Each modification is designed to maintain BMad Method compliance while enhancing agent capabilities.

---

## 🔧 Core Configuration Files

### `.bmad-core/core-config.yaml`

**Modification Type**: Enhancement  
**Priority**: Critical - Phase 1.1  
**BMad Compliance**: ✅ Configuration extension, no code

#### Current Structure Analysis
```yaml
# Existing structure to preserve
bundles:
  core-bmad-agent-bundle:
    # ... existing bundle config
```

#### Required Additions
```yaml
# ADD: Context Engineering Configuration Section
context_engineering:
  # Universal Settings
  universal:
    enabled: true
    default_compression_ratio: 0.7
    max_context_age_hours: 24
    validation_required: true
    audit_logging: true
    
  # Agent Type Classifications
  agent_types:
    dev_agents:
      - dev
      token_limit: 2000
      compression_ratio: 0.9
      max_dependencies: 3
      code_relevance_threshold: 0.95
      enabled_utilities:
        - context-compression
        - context-filtering
      enabled_tasks:
        - context-optimization
        - context-handoff
        - context-validation
        
    planning_agents:
      - bmad-orchestrator
      - architect
      - pm
      - po
      - analyst
      - ux-expert
      - qa
      - sm
      token_limit: 8000
      compression_ratio: 0.7
      max_dependencies: 12
      relevance_threshold: 0.75
      enabled_utilities:
        - context-compression
        - context-filtering
        - semantic-search
        - context-analysis
      enabled_tasks:
        - context-optimization
        - context-handoff
        - context-validation
        - context-retrieval
        - context-memory-management
        
    hybrid_agents:
      - bmad-master
      adaptive_context: true
      dev_mode_settings: *dev_agents
      planning_mode_settings: *planning_agents

  # Performance Monitoring
  performance:
    token_usage_monitoring: true
    compression_efficiency_tracking: true
    retrieval_accuracy_measurement: true
    handoff_success_rate_monitoring: true
```

---

## 📁 New Task Files to Create

### `.bmad-core/tasks/context-optimization.md`

**File Type**: New Creation  
**Priority**: Critical - Phase 1.2  
**Target**: Universal (All Agents)  
**BMad Compliance**: ✅ Natural language, proper markup

```markdown
# Context Optimization Task

## Purpose
Optimize context for AI agent performance while maintaining relevance and managing token constraints.

## Agent Type Configuration
- **Dev Agents**: Aggressive optimization (0.9 compression ratio, 2000 token limit)
- **Planning Agents**: Balanced optimization (0.7 compression ratio, 8000 token limit)

## Procedure

### 1. Context Assessment
Analyze current context for:
- Token count and distribution
- Content relevance scores
- Redundancy identification
- Priority classification

### 2. Content Prioritization
[[LLM: Rank content by relevance to current task, preserving essential information first]]

Priority levels:
1. **Critical**: Task-essential information (always preserve)
2. **Important**: Supporting context (compress if needed)
3. **Background**: General information (aggressive compression/removal)

### 3. Context Compression
Apply compression based on agent type:

**For Dev Agents** (target: 0.9 compression ratio):
- Remove non-code-related content
- Compress documentation to code comments
- Focus on implementation-relevant information only
- Preserve error handling and edge cases

**For Planning Agents** (target: 0.7 compression ratio):
- Maintain strategic context
- Compress operational details
- Preserve stakeholder information
- Keep decision rationale

### 4. Quality Validation
Ensure optimized context maintains:
- Task completion capability
- Decision-making information
- Cross-reference integrity
- Compliance requirements

## Output Format
```
{{optimized_context}}

## Optimization Summary
- Original tokens: {{original_token_count}}
- Optimized tokens: {{optimized_token_count}}  
- Compression ratio: {{compression_ratio}}
- Content preserved: {{content_categories}}
```

## Dependencies
- context-compression utility
- context-filtering utility
```

### `.bmad-core/tasks/context-handoff.md`

**File Type**: New Creation  
**Priority**: Critical - Phase 1.2  
**Target**: Universal (All Agents)  
**BMad Compliance**: ✅ Natural language, proper markup

```markdown
# Context Handoff Task

## Purpose
Transfer context between agents while optimizing for receiving agent type and maintaining essential information.

## Handoff Types

### Dev Agent Handoff (Lean Context)
When transferring TO dev agent:
- Maximum 2000 tokens
- Focus on implementation requirements only
- Strip planning and strategic context
- Preserve technical specifications

### Planning Agent Handoff (Rich Context)
When transferring TO planning agent:
- Maximum 8000 tokens
- Preserve strategic context
- Include decision rationale
- Maintain stakeholder information

### Cross-Planning Agent Handoff
Between planning agents:
- Preserve role-specific context
- Include collaboration history
- Maintain decision chain
- Transfer relevant templates

## Procedure

### 1. Receiving Agent Analysis
Identify:
- Target agent type (dev/planning/hybrid)
- Agent role and specialization
- Context requirements for target tasks
- Token limitations

### 2. Context Selection
[[LLM: Select most relevant context for receiving agent based on their role and current task]]

**For Dev Agent Recipients**:
- Technical specifications
- Implementation requirements
- Code-related decisions
- Error handling requirements

**For Planning Agent Recipients**:
- Strategic context
- Stakeholder information
- Process requirements
- Decision history

### 3. Context Transformation
Apply appropriate formatting:
- Use receiving agent's preferred structure
- Include role-specific metadata
- Add handoff validation markers
- Include context source tracking

### 4. Handoff Validation
Verify:
- Token limits respected
- Essential information preserved
- Format compatibility
- Access permissions

## Output Template
Use template: `context-handoff-tmpl.md`

## Dependencies
- context-optimization task
- context-handoff-tmpl template
```

### `.bmad-core/tasks/context-validation.md`

**File Type**: New Creation  
**Priority**: Critical - Phase 1.2  
**Target**: Universal (All Agents)  
**BMad Compliance**: ✅ Natural language, proper markup

```markdown
# Context Validation Task

## Purpose
Validate context quality, security, and compliance before processing or handoff.

## Validation Categories

### 1. Content Security
- Sensitive information identification
- Access control verification
- Data privacy compliance
- Audit trail requirements

### 2. Quality Assurance
- Information accuracy verification
- Relevance scoring
- Completeness assessment
- Freshness validation

### 3. Format Compliance
- BMad Method markup validation
- Template structure verification
- Placeholder syntax checking
- LLM instruction format validation

### 4. Performance Impact
- Token count validation
- Compression efficiency check
- Processing overhead assessment
- Memory usage estimation

## Procedure

### 1. Security Scan
[[LLM: Scan context for sensitive information, PII, credentials, or restricted content]]

Check for:
- Personal identifiable information (PII)
- Credentials or API keys
- Proprietary or confidential content
- Compliance violations

### 2. Quality Assessment
Evaluate:
- Information accuracy (where verifiable)
- Content relevance to current task
- Information completeness
- Source credibility

### 3. Format Validation
Verify:
- Proper markdown formatting
- Correct template markup usage
- Valid placeholder syntax
- Appropriate LLM instruction format

### 4. Performance Check
Monitor:
- Token count within limits
- Compression ratio achieved
- Processing time acceptable
- Memory usage reasonable

## Validation Results
```
## Validation Report
- Security Status: {{security_status}}
- Quality Score: {{quality_score}}/5.0
- Format Compliance: {{format_compliance}}%
- Performance Impact: {{performance_impact}}

## Issues Identified
{{validation_issues}}

## Recommendations
{{validation_recommendations}}
```

## Error Handling
- **Security Issues**: Halt processing, require manual review
- **Quality Issues**: Flag for attention, proceed with warnings
- **Format Issues**: Auto-correct where possible, flag exceptions
- **Performance Issues**: Apply optimization, monitor results

## Dependencies
- context-compression utility
- context-filtering utility
```

---

## 📁 New Utility Files to Create

### `.bmad-core/utils/context-compression.md`

**File Type**: New Creation  
**Priority**: Critical - Phase 1.3  
**Target**: Universal (All Agents)  
**BMad Compliance**: ✅ Natural language utility

```markdown
# Context Compression Utility

## Purpose
Lean utility for token optimization and content compression across all agent types.

## Compression Strategies

### Dev Agent Compression (0.9 ratio)
- Remove non-code documentation
- Compress explanatory text to comments
- Focus on implementation details
- Preserve error handling patterns

### Planning Agent Compression (0.7 ratio)
- Compress operational details
- Preserve strategic information
- Maintain stakeholder context
- Keep decision rationale

## Compression Techniques

### 1. Content Prioritization
- Critical: Always preserve (task-essential)
- Important: Compress if needed (supporting)
- Background: Aggressive removal (general info)

### 2. Redundancy Elimination
- Remove duplicate information
- Merge similar content blocks
- Consolidate repetitive patterns
- Eliminate circular references

### 3. Format Optimization
- Use bullet points over paragraphs
- Abbreviate common terms
- Remove verbose descriptions
- Optimize markdown structure

### 4. Reference Compression
- Convert full quotes to references
- Use placeholder for large blocks
- Link to external sources
- Create summary abstracts

## Usage
```
Input: {{content_to_compress}}
Target Ratio: {{compression_ratio}}
Agent Type: {{agent_type}}

Output: {{compressed_content}}
Achieved Ratio: {{actual_ratio}}
```

## Quality Preservation
Ensure compression maintains:
- Task completion capability
- Decision-making information
- Critical relationships
- Essential context flow
```

### `.bmad-core/utils/context-filtering.md`

**File Type**: New Creation  
**Priority**: Critical - Phase 1.3  
**Target**: Universal (All Agents)  
**BMad Compliance**: ✅ Natural language utility

```markdown
# Context Filtering Utility

## Purpose
Filter content based on relevance, priority, and agent-specific requirements.

## Filtering Criteria

### Dev Agent Filtering
- Code relevance threshold: >95%
- Focus: Implementation details
- Exclude: Strategic planning, stakeholder info
- Include: Technical specs, error handling

### Planning Agent Filtering  
- General relevance threshold: >75%
- Focus: Strategic and operational context
- Exclude: Low-level implementation details
- Include: Stakeholder info, process context

## Filtering Process

### 1. Content Scoring
Score content by:
- Task relevance (0.0-1.0)
- Agent role fit (0.0-1.0)
- Information freshness (0.0-1.0)
- Source credibility (0.0-1.0)

### 2. Priority Classification
- **Must Include**: Scores >0.9
- **Should Include**: Scores 0.7-0.9
- **May Include**: Scores 0.5-0.7
- **Exclude**: Scores <0.5

### 3. Agent-Specific Rules
Apply specialized filtering:
- Role-based content preferences
- Task-specific requirements
- Context length constraints
- Performance optimization needs

### 4. Content Selection
Final selection based on:
- Combined scores
- Token budget
- Agent capabilities
- Task priorities

## Output Format
```
## Filtered Content
{{filtered_content}}

## Filtering Summary
- Original items: {{original_count}}
- Filtered items: {{filtered_count}}
- Relevance threshold: {{threshold}}
- Average score: {{average_score}}
```
```

---

## 🤖 Agent Enhancement Files

### `.bmad-core/agents/dev.md` (Lean Enhancement)

**Modification Type**: Targeted Enhancement  
**Priority**: High - Phase 2.1  
**BMad Compliance**: ✅ Maintain leanness

#### Additions to Dependencies Section
```markdown
# Enhanced Dependencies
tasks:
  - context-optimization    # ONLY essential context task
  - context-handoff        # For agent transitions
  - context-validation     # Security and quality

utils:
  - context-compression    # Token optimization only
  - context-filtering      # Code-relevance filtering
```

#### Additions to Persona Section
```markdown
## Context Management
- **Token Limit**: 2000 tokens maximum
- **Focus**: Code generation and implementation only
- **Compression**: Aggressive (0.9 ratio)
- **Relevance**: >95% code-related content required
- **Dependencies**: Maximum 3 context-related dependencies
```

#### Additions to Capabilities Section
```markdown
## Enhanced Capabilities
- **Lean Context Processing**: Optimized for minimal overhead
- **Code-Focused Filtering**: Removes non-implementation content
- **Efficient Handoffs**: Lightweight context transfers
- **Quality Validation**: Security and format compliance
```

### `.bmad-core/agents/bmad-orchestrator.md` (Rich Enhancement)

**Modification Type**: Comprehensive Enhancement  
**Priority**: High - Phase 2.2  
**BMad Compliance**: ✅ Rich context for planning agent

#### Additions to Dependencies Section
```markdown
# Enhanced Dependencies  
tasks:
  - context-optimization      # Universal optimization
  - context-handoff          # Agent transitions
  - context-validation       # Security and quality
  - context-retrieval        # Rich: Semantic search
  - context-memory-management # Rich: Long-term memory

utils:
  - context-compression      # Token optimization
  - context-filtering        # Relevance filtering
  - semantic-search          # Rich: Advanced search
  - context-analysis         # Rich: Quality assessment
```

#### Additions to Capabilities Section  
```markdown
## Enhanced Context Capabilities
- **Rich Context Processing**: 8000 token capacity
- **Semantic Search**: Intelligent information retrieval
- **Cross-Session Memory**: Persistent context management
- **Agent Coordination**: Context sharing protocols
- **Quality Metrics**: Context performance tracking
- **Advanced Retrieval**: Vector-based content search
```

### Similar Enhancements for Other Planning Agents

**Files to Modify**:
- `.bmad-core/agents/architect.md`
- `.bmad-core/agents/pm.md`
- `.bmad-core/agents/po.md`
- `.bmad-core/agents/analyst.md`
- `.bmad-core/agents/ux-expert.md`
- `.bmad-core/agents/qa.md`
- `.bmad-core/agents/sm.md`

**Standard Rich Context Enhancement Pattern**:
```markdown
# Enhanced Dependencies
tasks:
  - context-optimization
  - context-handoff
  - context-validation
  - context-retrieval
  - context-memory-management

utils:
  - context-compression
  - context-filtering
  - semantic-search
  - context-analysis

## Enhanced Context Capabilities
- **Rich Context Processing**: 8000 token capacity
- **Role-Specific Retrieval**: Domain-focused context search
- **Collaboration Context**: Cross-agent information sharing
- **Process Memory**: Workflow and decision history
- **Quality Assessment**: Context relevance and accuracy monitoring
```

---

## 📋 Template Files to Create

### `.bmad-core/templates/context-handoff-tmpl.md`

**File Type**: New Creation  
**Priority**: Medium - Phase 2.3  
**BMad Compliance**: ✅ Template with proper markup

```markdown
# Context Handoff Template

## Handoff Information
**From Agent**: {{source_agent}}  
**To Agent**: {{target_agent}}  
**Handoff Type**: {{handoff_type}}  
**Timestamp**: {{handoff_timestamp}}

## Context Summary
[[LLM: Generate appropriate context summary for {{target_agent}} based on their role and current task requirements]]

## Transferred Context
{{context_data}}

## Optimization Applied
- **Token Count**: {{original_tokens}} → {{final_tokens}}
- **Compression Ratio**: {{compression_ratio}}
- **Relevance Threshold**: {{relevance_threshold}}
- **Content Categories**: {{preserved_categories}}

## Validation Results
- **Security Status**: {{security_status}}
- **Quality Score**: {{quality_score}}/5.0
- **Format Compliance**: {{format_compliance}}%

## Handoff Instructions
[[LLM: Provide specific instructions for {{target_agent}} on how to use this context effectively]]

## Next Steps
{{recommended_actions}}

---
*Handoff ID: {{handoff_id}}*  
*Validation: {{validation_signature}}*
```

### `.bmad-core/templates/context-summary-tmpl.md`

**File Type**: New Creation  
**Priority**: Medium - Phase 2.3  
**BMad Compliance**: ✅ Template with proper markup

```markdown
# Context Summary Template

## Executive Summary
[[LLM: Provide concise overview of key context information relevant to current task]]

## Key Information
{{key_context_points}}

## Context Categories
- **Technical**: {{technical_context}}
- **Strategic**: {{strategic_context}}
- **Operational**: {{operational_context}}
- **Stakeholder**: {{stakeholder_context}}

## Compressed Context
[[LLM: Compress detailed context while preserving essential information for task completion]]

## Context Metrics
- **Original Size**: {{original_size}}
- **Compressed Size**: {{compressed_size}}
- **Compression Ratio**: {{compression_ratio}}
- **Information Density**: {{information_density}}

## Quality Indicators
- **Relevance Score**: {{relevance_score}}/5.0
- **Completeness**: {{completeness_percentage}}%
- **Freshness**: {{freshness_hours}} hours
- **Source Credibility**: {{source_credibility}}/5.0

## Usage Recommendations
{{usage_recommendations}}

---
*Generated: {{generation_timestamp}}*  
*Context ID: {{context_id}}*
```

---

## ⚡ Rich Context Features (Phase 3)

### `.bmad-core/tasks/context-retrieval.md`

**File Type**: New Creation (Planning Agents Only)  
**Priority**: Medium - Phase 3.1  
**BMad Compliance**: ✅ Natural language, rich features

```markdown
# Context Retrieval Task

## Purpose
Intelligent context retrieval using semantic search and relevance scoring for planning agents.

## Retrieval Strategies

### 1. Semantic Search
- Vector-based content matching
- Similarity scoring algorithms
- Contextual relationship mapping
- Multi-dimensional relevance

### 2. Relevance Scoring
- Task-specific weighting
- Temporal relevance factors
- Source credibility scoring
- Content quality metrics

### 3. Real-time Retrieval
- Dynamic content discovery
- Live information integration
- Cross-reference validation
- Performance optimization

## Procedure

### 1. Query Analysis
[[LLM: Analyze retrieval query for intent, scope, and specific requirements]]

### 2. Search Execution
- Execute semantic search across available contexts
- Apply relevance filters based on agent role
- Score results using multi-factor algorithm
- Rank by combined relevance score

### 3. Result Processing
- Validate retrieved content quality
- Check access permissions
- Apply compression if needed
- Format for agent consumption

### 4. Integration
- Merge with existing context
- Resolve conflicts and duplicates
- Maintain context coherence
- Update context metadata

## Dependencies
- semantic-search utility
- context-analysis utility
```

### `.bmad-core/utils/semantic-search.md`

**File Type**: New Creation (Planning Agents Only)  
**Priority**: Medium - Phase 3.2  
**BMad Compliance**: ✅ Natural language utility

```markdown
# Semantic Search Utility

## Purpose
Advanced search capabilities using vector embeddings and similarity matching for planning agents.

## Search Features

### 1. Vector Embeddings
- Content vectorization
- Semantic similarity calculation
- Multi-dimensional search space
- Contextual relationship mapping

### 2. Search Algorithms
- Cosine similarity matching
- Hierarchical clustering
- Relevance scoring
- Result ranking optimization

### 3. Search Optimization
- Query expansion techniques
- Result filtering strategies
- Performance tuning
- Cache management

## Usage
```
Query: {{search_query}}
Context: {{search_context}}
Agent: {{requesting_agent}}

Results: {{search_results}}
Relevance Scores: {{relevance_scores}}
```

## Quality Metrics
- Search accuracy: >85%
- Result relevance: >90%
- Response time: <2 seconds
- Coverage completeness: >90%
```

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Modify `core-config.yaml` with context engineering configuration
- [ ] Create `context-optimization.md` task
- [ ] Create `context-handoff.md` task  
- [ ] Create `context-validation.md` task
- [ ] Create `context-compression.md` utility
- [ ] Create `context-filtering.md` utility

### Phase 2: Agent Enhancement
- [ ] Enhance `dev.md` with lean context features
- [ ] Enhance `bmad-orchestrator.md` with rich context features
- [ ] Enhance all planning agent files
- [ ] Create `context-handoff-tmpl.md` template
- [ ] Create `context-summary-tmpl.md` template

### Phase 3: Rich Features
- [ ] Create `context-retrieval.md` task
- [ ] Create `context-memory-management.md` task
- [ ] Create `semantic-search.md` utility
- [ ] Create `context-analysis.md` utility

### Validation
- [ ] BMad Method compliance verification
- [ ] File size compliance (<50KB each)
- [ ] Template markup validation
- [ ] Agent type differentiation verification

---

**Document Status**: ✅ Complete  
**Last Updated**: January 2025  
**Implementation Ready**: All specifications provided 