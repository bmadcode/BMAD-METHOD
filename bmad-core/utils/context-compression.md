# Context Compression Utility

## Purpose
Provide lean utility for token optimization and relevance filtering across all BMAD agents. This utility enables efficient context management by reducing token usage while preserving essential information based on agent-specific requirements.

## Compression Strategies

### Agent-Specific Compression Ratios
- **Dev Agents**: 0.9 compression ratio (aggressive optimization)
- **Planning Agents**: 0.7 compression ratio (balanced optimization)
- **Hybrid Agents**: Adaptive compression based on current mode

### Compression Techniques

#### Token-Level Optimization
- Remove redundant whitespace and formatting
- Eliminate unnecessary punctuation and filler words
- Compress verbose explanations to essential points
- Optimize sentence structure for clarity and brevity

#### Content-Level Compression
- Summarize lengthy descriptions and explanations
- Remove duplicate or repetitive information
- Consolidate related concepts and ideas
- Extract key points from verbose content

#### Structural Optimization
- Flatten nested information hierarchies
- Combine related sections and topics
- Remove empty or low-value content blocks
- Optimize markdown structure for efficiency

## Compression Procedures

### 1. Pre-Compression Analysis

**Content Assessment**
[[LLM: Analyze content structure, token distribution, and compression opportunities]]

**Token Distribution Analysis**
- Identify high-token content areas
- Calculate compression potential by section
- Assess information density and value
- Determine optimal compression targets

**Content Categorization**
```
Content Classification:
- Essential (preserve): {{essential_content_percentage}}%
- Important (compress): {{important_content_percentage}}%
- Supplementary (aggressive compression): {{supplementary_content_percentage}}%
- Removable (eliminate): {{removable_content_percentage}}%
```

### 2. Agent-Specific Compression

**For Dev Agents** (0.9 compression ratio):

**Aggressive Technical Compression**
- Remove non-technical explanations and context
- Compress verbose documentation to bullet points
- Eliminate planning discussions and business context
- Focus on actionable technical information only

**Code-Focused Optimization**
- Preserve code examples and technical specifications
- Remove explanatory text around code snippets
- Compress error descriptions to essential details
- Maintain technical accuracy while reducing verbosity

**Implementation-Centric Filtering**
- Keep task requirements and acceptance criteria
- Remove strategic discussions and background context
- Preserve debugging information and edge cases
- Eliminate stakeholder and business information

**For Planning Agents** (0.7 compression ratio):

**Strategic Context Preservation**
- Maintain high-level goals and business objectives
- Preserve stakeholder requirements and constraints
- Keep decision rationale and strategic context
- Compress operational details while maintaining strategic view

**Collaborative Information Compression**
- Summarize cross-functional collaboration details
- Compress meeting notes to key decisions and outcomes
- Preserve important stakeholder communications
- Maintain project status and milestone information

**Balanced Technical Compression**
- Compress technical details to strategic implications
- Remove low-level implementation specifics
- Preserve architecture decisions and technical constraints
- Maintain technical context relevant to planning decisions

### 3. Compression Execution

**Structured Compression Process**
1. Identify content blocks for compression
2. Apply agent-specific compression rules
3. Validate information preservation
4. Optimize token efficiency
5. Verify compression ratio targets

**Content Transformation Rules**
```
Compression Transformations:
- Long paragraphs → Bullet points
- Verbose explanations → Key concepts
- Detailed examples → Essential patterns
- Historical context → Current relevance
- Redundant information → Single reference
```

### 4. Quality Preservation

**Information Integrity Checks**
- Verify essential information is preserved
- Confirm no critical details are lost
- Validate relationships between concepts remain intact
- Ensure compressed content maintains accuracy

**Compression Quality Metrics**
```
Quality Assessment:
- Information Completeness: {{completeness_score}}/10
- Accuracy Preservation: {{accuracy_score}}/10
- Readability Maintenance: {{readability_score}}/10
- Token Efficiency: {{efficiency_score}}/10
```

**Rollback Procedures**
- Identify compression failures or quality issues
- Restore original content when compression degrades quality
- Apply alternative compression strategies
- Maintain compression quality standards

## Utility Functions

### Adaptive Compression
```
compress_for_agent_type(content, agent_type, target_ratio):
  - Apply agent-specific compression rules
  - Target specified compression ratio
  - Preserve agent-relevant information
  - Return optimized content within token limits
```

### Token Optimization
```
optimize_token_usage(content, token_limit):
  - Analyze current token usage
  - Apply progressive compression techniques
  - Maintain information quality
  - Achieve target token count
```

### Content Summarization
```
summarize_content(content, summary_ratio):
  - Extract key concepts and ideas
  - Preserve essential information
  - Maintain logical flow and structure
  - Achieve target summary length
```

### Relevance Filtering
```
filter_by_relevance(content, relevance_threshold, agent_type):
  - Score content relevance for agent type
  - Remove content below threshold
  - Preserve highly relevant information
  - Optimize for agent-specific needs
```

## Output Format

### Compression Results
```
## Content Compression Results

**Original Content:**
- Token Count: {{original_token_count}}
- Content Blocks: {{original_block_count}}
- Word Count: {{original_word_count}}

**Compressed Content:**
- Token Count: {{compressed_token_count}}
- Compression Ratio: {{compression_ratio}}
- Space Saved: {{space_saved_percentage}}%
- Quality Score: {{quality_score}}/10

**Compression Summary:**
- Blocks Compressed: {{compressed_blocks}}
- Blocks Removed: {{removed_blocks}}
- Information Preserved: {{preservation_percentage}}%
- Agent Optimization: {{agent_type}} focused
```

### Compressed Content
```
{{compressed_content}}
```

## Performance Monitoring

### Compression Metrics
- Compression ratio achievement vs. target
- Token reduction efficiency
- Information preservation quality
- Processing time and performance impact

### Quality Indicators
- Content accuracy maintenance
- Information completeness scores
- User satisfaction with compressed content
- Agent performance with compressed context

### Optimization Tracking
- Compression algorithm effectiveness
- Agent-specific compression success rates
- Quality degradation incidents
- Performance improvement opportunities

## Configuration

### Agent-Specific Settings
```yaml
compression_settings:
  dev_agents:
    target_ratio: 0.9
    focus: technical_content
    preserve: code_and_specs
    remove: planning_context
  
  planning_agents:
    target_ratio: 0.7
    focus: strategic_content
    preserve: business_context
    remove: implementation_details
    
  quality_thresholds:
    minimum_accuracy: 0.95
    minimum_completeness: 0.90
    minimum_readability: 0.85
```

Uses configuration from core-config.yaml context_engineering section for agent-specific compression settings and quality standards. 