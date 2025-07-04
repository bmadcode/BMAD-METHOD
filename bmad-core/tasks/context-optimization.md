# Context Optimization Task

## Purpose
Optimize context for AI agent performance while maintaining relevance and managing token constraints. This task provides universal context compression and optimization capabilities across all BMAD agents with different strategies for dev vs planning agents.

## Agent Type Configuration
- **Dev Agents**: Aggressive optimization (0.9 compression ratio, 2000 token limit, code-focus)
- **Planning Agents**: Balanced optimization (0.7 compression ratio, 8000 token limit, strategic-focus)
- **Hybrid Agents**: Adaptive optimization based on current operating mode

## Procedure

### 1. Context Assessment
Analyze current context for optimization opportunities:

**Token Analysis**
- Count current token usage across all context elements
- Identify token distribution by content type (code, documentation, conversation, etc.)
- Calculate compression potential based on agent type requirements

**Content Relevance Scoring**
- Score each context element for relevance to current task (0.0-1.0 scale)
- Identify redundant or duplicate information
- Flag outdated or stale context elements
- Prioritize content based on recency and importance

**Priority Classification**
[[LLM: Classify all context content into priority levels based on current task requirements]]

Priority levels:
1. **Critical**: Task-essential information (always preserve)
   - Active task requirements and acceptance criteria
   - Current conversation context and user intent
   - Essential technical specifications
   - Critical error states or blockers

2. **Important**: Supporting context (compress if needed)
   - Background documentation and references
   - Related task history and decisions
   - Supporting technical details
   - Relevant examples and patterns

3. **Background**: General information (aggressive compression/removal)
   - Historical conversation logs
   - Archived task information
   - General documentation
   - Tangential reference material

### 2. Agent-Specific Context Optimization

**For Dev Agents** (target: 0.9 compression ratio, <2000 tokens):
- **Code-Relevance Filter**: Remove non-code-related content unless directly supporting implementation
- **Technical Focus**: Preserve technical specifications, API documentation, and coding standards
- **Implementation Priority**: Keep task requirements, acceptance criteria, and technical constraints
- **Aggressive Pruning**: Remove planning discussions, strategic context, and non-technical background
- **Essential Preservation**: Error handling patterns, edge cases, and debugging information

**For Planning Agents** (target: 0.7 compression ratio, <8000 tokens):
- **Strategic Context**: Maintain high-level goals, business objectives, and stakeholder requirements
- **Decision Context**: Preserve decision rationale, trade-offs, and strategic considerations
- **Collaborative Context**: Keep cross-functional information and team collaboration history
- **Balanced Compression**: Compress operational details while maintaining strategic overview
- **Stakeholder Focus**: Preserve user stories, market requirements, and business constraints

**For Hybrid Agents** (adaptive based on mode):
- **Mode Detection**: Determine current operating mode (dev vs planning)
- **Dynamic Optimization**: Apply appropriate strategy based on detected mode
- **Context Switching**: Prepare for potential mode switches by maintaining minimal cross-mode context
- **Adaptive Thresholds**: Adjust compression ratios based on current task complexity

### 3. Content Compression Techniques

**High-Priority Content** (preserve with minimal compression):
```
{{critical_context_elements}}
```

**Medium-Priority Content** (apply structured compression):
[[LLM: Compress medium-priority content while preserving key information and relationships]]

**Low-Priority Content** (aggressive compression or removal):
[[LLM: Summarize or remove low-priority content, keeping only essential references]]

### 4. Quality Validation

Ensure optimized context maintains task completion capability:

**Completeness Check**
- Verify all critical task requirements are preserved
- Confirm essential context relationships remain intact
- Validate that compressed content still supports task objectives

**Coherence Validation**
- Check for broken references or missing context links
- Ensure logical flow is maintained after compression
- Verify cross-references between context elements remain valid

**Performance Validation**
- Confirm token count meets agent-specific targets
- Verify compression ratio achieves target thresholds
- Validate loading performance meets timing requirements

### 5. Optimization Execution

Apply compression strategy based on agent configuration:

**Token-Based Compression**
- Remove lowest-priority content first
- Compress medium-priority content using summarization
- Preserve high-priority content with minimal changes

**Relevance-Based Filtering**
- Filter content based on relevance scores
- Apply agent-specific relevance thresholds
- Maintain content that exceeds minimum relevance requirements

**Structure Preservation**
- Maintain logical organization of remaining content
- Preserve important context relationships
- Keep navigation and reference structure intact

## Output Format

### Optimized Context
```
{{optimized_context}}
```

### Optimization Summary
```
## Context Optimization Results

**Original Metrics:**
- Token Count: {{original_token_count}}
- Content Elements: {{original_element_count}}
- Content Types: {{original_content_types}}

**Optimized Metrics:**  
- Token Count: {{optimized_token_count}}
- Compression Ratio: {{compression_ratio}}
- Elements Preserved: {{preserved_element_count}}
- Elements Removed: {{removed_element_count}}

**Agent Configuration:**
- Agent Type: {{agent_type}}
- Target Token Limit: {{target_token_limit}}
- Target Compression Ratio: {{target_compression_ratio}}

**Content Preserved:**
- Critical: {{critical_content_categories}}
- Important: {{important_content_categories}}
- Background: {{background_content_categories}}

**Performance Impact:**
- Load Time: {{estimated_load_time}}
- Memory Usage: {{estimated_memory_usage}}
- Processing Speed: {{estimated_processing_speed}}
```

## Dependencies
- context-compression utility
- context-filtering utility

## Configuration
Uses agent-specific settings from core-config.yaml context_engineering section:
- Token limits and compression ratios
- Enabled utilities and filtering thresholds
- Performance monitoring and quality targets 