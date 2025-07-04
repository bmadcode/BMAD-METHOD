# Context Filtering Utility

## Purpose
Provide relevance-based content filtering across all BMAD agents. This utility enables intelligent content selection by scoring and filtering context elements based on relevance, priority, and agent-specific requirements.

## Filtering Strategies

### Agent-Specific Relevance Thresholds
- **Dev Agents**: 0.95 relevance threshold (code-focused filtering)
- **Planning Agents**: 0.75 relevance threshold (broad strategic filtering)
- **Hybrid Agents**: Adaptive thresholds based on current operating mode

### Content Scoring Dimensions

#### Relevance Scoring (0.0-1.0 scale)
- Task relevance and direct applicability
- Information currency and freshness
- Content quality and accuracy
- Agent-specific value and utility

#### Priority Classification
- **Critical**: Essential for task completion
- **Important**: Supports task objectives  
- **Useful**: Provides helpful context
- **Background**: General information
- **Irrelevant**: No value for current context

## Filtering Procedures

### 1. Content Analysis and Scoring

**Relevance Assessment**
[[LLM: Analyze each content element for relevance to current task and agent type, scoring from 0.0 to 1.0]]

**Scoring Criteria by Agent Type**

**For Dev Agents** (Code-Focused Scoring):
- **High Relevance (0.8-1.0)**:
  - Implementation requirements and specifications
  - Code examples and technical patterns
  - Error handling and debugging information
  - API documentation and integration details
  
- **Medium Relevance (0.5-0.7)**:
  - Architecture decisions affecting implementation
  - Performance requirements and constraints
  - Testing requirements and acceptance criteria
  - Technical dependencies and configurations
  
- **Low Relevance (0.0-0.4)**:
  - Business strategy and market analysis
  - Stakeholder communications and meetings
  - Project planning and timeline discussions
  - Non-technical background information

**For Planning Agents** (Strategic-Focused Scoring):
- **High Relevance (0.8-1.0)**:
  - Business objectives and strategic goals
  - Stakeholder requirements and constraints
  - Market analysis and competitive intelligence
  - Cross-functional collaboration context
  
- **Medium Relevance (0.5-0.7)**:
  - Technical architecture and system design
  - Implementation timelines and resource planning
  - Risk assessment and mitigation strategies
  - Performance metrics and success criteria
  
- **Low Relevance (0.0-0.4)**:
  - Detailed implementation specifications
  - Low-level technical debugging information
  - Code-specific error messages and logs
  - Granular technical configuration details

### 2. Priority-Based Filtering

**Content Categorization**
```
Priority Distribution:
- Critical (must preserve): {{critical_content_count}} items
- Important (conditional preserve): {{important_content_count}} items  
- Useful (compress if needed): {{useful_content_count}} items
- Background (aggressive filtering): {{background_content_count}} items
- Irrelevant (remove): {{irrelevant_content_count}} items
```

**Filtering Rules by Priority**
- **Critical Content**: Always preserve, minimal compression only
- **Important Content**: Preserve unless space constraints require compression
- **Useful Content**: Include if space permits, apply compression
- **Background Content**: Include only if significant space available
- **Irrelevant Content**: Remove unless specifically requested

### 3. Agent-Specific Content Selection

**Dev Agent Filtering** (Technical Focus):

**Always Include**:
- Task requirements and acceptance criteria
- Code examples and implementation patterns
- Technical specifications and constraints
- Error conditions and debugging information
- Dependencies and integration requirements

**Conditionally Include**:
- Architecture decisions affecting implementation
- Performance requirements and optimization needs
- Testing strategies and quality requirements
- Configuration and deployment information

**Usually Exclude**:
- Strategic planning discussions
- Stakeholder communication history
- Market analysis and business context
- High-level project management information

**Planning Agent Filtering** (Strategic Focus):

**Always Include**:
- Business objectives and strategic goals
- Stakeholder requirements and feedback
- Market context and competitive analysis
- Cross-team collaboration and dependencies
- Decision rationale and trade-offs

**Conditionally Include**:
- High-level technical architecture
- Resource planning and timeline considerations
- Risk assessment and mitigation planning
- Success metrics and performance indicators

**Usually Exclude**:
- Detailed implementation specifications
- Low-level debugging and error information
- Granular technical configuration details
- Code-specific troubleshooting information

### 4. Dynamic Filtering Execution

**Multi-Pass Filtering Process**
1. Initial relevance scoring of all content
2. Priority classification based on scores
3. Agent-specific filtering rules application
4. Space constraint optimization
5. Final quality and completeness validation

**Adaptive Threshold Adjustment**
[[LLM: Dynamically adjust filtering thresholds based on content volume and quality requirements]]

**Content Volume Management**
- Monitor total content size against agent limits
- Adjust relevance thresholds to meet space constraints
- Prioritize higher-quality content when space is limited
- Maintain minimum content requirements for task success

## Filtering Functions

### Content Scoring
```
score_content_relevance(content, agent_type, task_context):
  - Analyze content for agent-specific relevance
  - Score against current task requirements
  - Consider information freshness and quality
  - Return relevance score (0.0-1.0)
```

### Priority Classification
```
classify_content_priority(content, relevance_score, agent_type):
  - Determine content priority level
  - Consider agent-specific importance factors
  - Apply context-aware classification rules
  - Return priority classification
```

### Threshold Filtering
```
filter_by_threshold(content_list, threshold, agent_type):
  - Apply relevance threshold filtering
  - Preserve content above threshold
  - Remove content below threshold
  - Return filtered content list
```

### Adaptive Selection
```
adaptive_content_selection(content_list, target_size, agent_type):
  - Select optimal content mix for agent type
  - Balance content diversity and relevance
  - Meet target size constraints
  - Maximize information value
```

## Quality Assurance

### Filtering Quality Metrics
```
Filtering Assessment:
- Content Relevance Score: {{average_relevance_score}}/1.0
- Information Coverage: {{coverage_percentage}}%
- Content Diversity: {{diversity_score}}/10
- Agent Optimization: {{agent_optimization_score}}/10
```

### Completeness Validation
- Verify essential information is preserved
- Check for critical content gaps
- Ensure task completion capability
- Validate agent-specific requirements

### Filter Effectiveness Monitoring
- Track filtering accuracy and precision
- Monitor content quality after filtering
- Assess agent performance with filtered content
- Identify filtering improvement opportunities

## Output Format

### Filtering Results
```
## Content Filtering Results

**Original Content Analysis:**
- Total Items: {{original_item_count}}
- Total Tokens: {{original_token_count}}
- Average Relevance: {{original_average_relevance}}/1.0

**Filtering Configuration:**
- Agent Type: {{agent_type}}
- Relevance Threshold: {{relevance_threshold}}
- Priority Focus: {{priority_focus}}
- Space Constraints: {{space_constraints}}

**Filtered Content:**
- Items Preserved: {{preserved_item_count}}
- Items Removed: {{removed_item_count}}
- Token Reduction: {{token_reduction_percentage}}%
- Quality Score: {{filtered_quality_score}}/10

**Content Distribution:**
- Critical: {{critical_items}} items
- Important: {{important_items}} items
- Useful: {{useful_items}} items
- Background: {{background_items}} items
```

### Filtered Content
```
{{filtered_content}}
```

### Filtering Summary
```
## Filtering Decision Log

**High-Value Content Preserved:**
{{high_value_content_summary}}

**Content Removed:**
{{removed_content_summary}}

**Filtering Rationale:**
{{filtering_decision_rationale}}

**Recommendations:**
{{content_optimization_recommendations}}
```

## Performance Monitoring

### Filtering Metrics
- Content selection accuracy and precision
- Information preservation quality
- Processing efficiency and speed
- Agent satisfaction with filtered content

### Optimization Tracking
- Filter rule effectiveness
- Threshold optimization opportunities
- Content quality improvement areas
- Agent-specific filtering success rates

## Configuration

### Agent-Specific Filter Settings
```yaml
filtering_settings:
  dev_agents:
    relevance_threshold: 0.95
    focus_areas: [technical, implementation, code]
    exclude_categories: [business, strategic, planning]
    
  planning_agents:
    relevance_threshold: 0.75
    focus_areas: [strategic, business, stakeholder]
    exclude_categories: [technical_details, debugging, code_specific]
    
  quality_requirements:
    minimum_coverage: 0.90
    minimum_diversity: 0.80
    maximum_removal_rate: 0.50
```

Uses configuration from core-config.yaml context_engineering section for agent-specific filtering thresholds and quality requirements. 