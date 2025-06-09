# BMAD Memory Architecture Implementation Guide

## Overview

This guide provides step-by-step instructions for implementing the BMAD Memory Architecture methodology within your IDE environment. The methodology is designed to work across Claude Code, Cursor AI, V0, Roocode, JetBrains, and other AI-enhanced development environments.

## Quick Start Guide

### 1. Choose Your Implementation Path

Select the implementation approach that matches your IDE environment:

- **[Claude Code Implementation](#claude-code-implementation)** - File-based memory with conversation integration
- **[Cursor AI Implementation](#cursor-ai-implementation)** - Workspace-integrated memory with extension APIs
- **[V0 Implementation](#v0-implementation)** - Browser-based memory with component integration
- **[JetBrains Implementation](#jetbrains-implementation)** - Plugin-based memory with IDE integration
- **[Universal Implementation](#universal-implementation)** - Platform-agnostic approach

### 2. Implementation Phases

All implementations follow these phases:

1. **[Foundation Setup](#phase-1-foundation-setup)** (1-2 hours)
2. **[Basic Memory Operations](#phase-2-basic-memory-operations)** (2-4 hours)
3. **[Integration & Enhancement](#phase-3-integration-enhancement)** (4-8 hours)
4. **[Optimization & Monitoring](#phase-4-optimization-monitoring)** (2-4 hours)

### 3. Prerequisites

Before starting, ensure you have:
- Access to your chosen IDE environment
- Basic understanding of your IDE's extension/plugin system
- Familiarity with the BMAD Method personas you'll be using
- Understanding of your project's data privacy requirements

## Phase 1: Foundation Setup

### Step 1: Create Memory Directory Structure

Create the following directory structure in your project:

\.```
your-project/
 .bmad-memory/
    config/
       memory-config.json
       retention-policies.json
    storage/
       working/
       short-term/
       episodic/
       semantic/
       procedural/
       long-term/
    indices/
       id-index.json
       type-index.json
       temporal-index.json
    logs/
        memory-operations.log
\.```

### Step 2: Initialize Memory Configuration

Create `memory-config.json`:

\.```json
{
  "version": "1.0.0",
  "ide_environment": "your-ide-name",
  "memory_types": {
    "working": {
      "enabled": true,
      "storage_type": "session",
      "max_size_mb": 50,
      "retention_hours": 24
    },
    "short_term": {
      "enabled": true,
      "storage_type": "file",
      "max_size_mb": 200,
      "retention_days": 7
    },
    "episodic": {
      "enabled": true,
      "storage_type": "file",
      "max_size_mb": 500,
      "retention_months": 3
    },
    "semantic": {
      "enabled": true,
      "storage_type": "file",
      "max_size_mb": 1000,
      "retention_policy": "importance_based"
    },
    "procedural": {
      "enabled": true,
      "storage_type": "file",
      "max_size_mb": 300,
      "retention_policy": "usage_based"
    },
    "long_term": {
      "enabled": true,
      "storage_type": "file",
      "max_size_mb": 2000,
      "retention_policy": "permanent"
    }
  },
  "security": {
    "encryption_enabled": true,
    "access_control": "user_based",
    "privacy_level": "private"
  },
  "performance": {
    "cache_enabled": true,
    "cache_size_mb": 100,
    "indexing_enabled": true
  }
}
\.```

### Step 3: Create Retention Policies

Create `retention-policies.json`:

\.```json
{
  "policies": {
    "importance_based": {
      "critical": "permanent",
      "important": "1_year",
      "useful": "6_months",
      "reference": "3_months"
    },
    "usage_based": {
      "frequent": "1_year",
      "occasional": "6_months",
      "rare": "3_months",
      "never": "1_month"
    },
    "privacy_based": {
      "public": "standard_retention",
      "shared": "group_retention",
      "private": "user_controlled",
      "sensitive": "strict_retention"
    }
  },
  "cleanup_schedule": {
    "daily": ["working", "temporary"],
    "weekly": ["short_term"],
    "monthly": ["episodic", "low_importance"],
    "quarterly": ["full_cleanup"]
  }
}
\.```

## Phase 2: Basic Memory Operations

### Step 1: Implement Memory Entity Structure

Create a basic memory entity template:

\.```json
{
  "id": "mem_{{timestamp}}_{{random}}",
  "type": "semantic|episodic|procedural|working|short_term|long_term",
  "created": "2024-01-15T10:30:00Z",
  "last_accessed": "2024-01-15T10:30:00Z",
  "access_count": 1,
  "importance": 0.5,
  "metadata": {
    "source": "user_input|system_generated|imported",
    "owner": "user_id",
    "project": "project_name",
    "tags": ["tag1", "tag2"],
    "privacy": "private|shared|public",
    "retention_policy": "policy_name"
  },
  "content": {
    "title": "Memory Title",
    "summary": "Brief summary of the memory",
    "details": "Detailed content",
    "format": "text|json|markdown|code",
    "embeddings": null
  },
  "relationships": [
    {
      "target_id": "mem_other_id",
      "type": "related|supports|contradicts|follows",
      "strength": 0.8,
      "created": "2024-01-15T10:30:00Z"
    }
  ]
}
\.```

### Step 2: Implement Basic CRUD Operations

#### Create Memory Operation

\.```javascript
// Example implementation pattern
function createMemory(content, type, metadata = {}) {
  const memory = {
    id: generateMemoryId(),
    type: type,
    created: new Date().toISOString(),
    last_accessed: new Date().toISOString(),
    access_count: 1,
    importance: calculateInitialImportance(content, metadata),
    metadata: {
      source: 'user_input',
      owner: getCurrentUser(),
      project: getCurrentProject(),
      tags: extractTags(content),
      privacy: metadata.privacy || 'private',
      retention_policy: determineRetentionPolicy(type, metadata),
      ...metadata
    },
    content: {
      title: extractTitle(content),
      summary: generateSummary(content),
      details: content,
      format: detectFormat(content),
      embeddings: null // Will be generated asynchronously
    },
    relationships: []
  };
  
  return storeMemory(memory);
}
\.```

#### Read Memory Operation

\.```javascript
function retrieveMemory(memoryId) {
  const memory = loadMemoryFromStorage(memoryId);
  if (memory) {
    memory.last_accessed = new Date().toISOString();
    memory.access_count += 1;
    updateMemoryInStorage(memory);
    return memory;
  }
  return null;
}

function searchMemories(query, options = {}) {
  const searchStrategy = determineSearchStrategy(query);
  const results = executeSearch(query, searchStrategy, options);
  return rankAndFilterResults(results, options);
}
\.```

#### Update Memory Operation

\.```javascript
function updateMemory(memoryId, updates) {
  const memory = loadMemoryFromStorage(memoryId);
  if (!memory) return null;
  
  // Merge updates
  const updatedMemory = {
    ...memory,
    ...updates,
    last_modified: new Date().toISOString(),
    version: (memory.version || 1) + 1
  };
  
  // Update indices
  updateIndices(updatedMemory);
  
  return storeMemory(updatedMemory);
}
\.```

#### Delete Memory Operation

\.```javascript
function deleteMemory(memoryId) {
  const memory = loadMemoryFromStorage(memoryId);
  if (!memory) return false;
  
  // Clean up relationships
  cleanupRelationships(memoryId);
  
  // Remove from indices
  removeFromIndices(memoryId);
  
  // Secure deletion
  secureDeleteFromStorage(memoryId);
  
  // Log deletion
  logMemoryOperation('delete', memoryId);
  
  return true;
}
\.```

### Step 3: Implement Basic Search

\.```javascript
function implementBasicSearch() {
  // Direct ID lookup
  function findById(id) {
    return loadMemoryFromStorage(id);
  }
  
  // Keyword search
  function searchByKeywords(keywords) {
    const results = [];
    const allMemories = loadAllMemories();
    
    for (const memory of allMemories) {
      const score = calculateKeywordScore(memory, keywords);
      if (score > 0.3) {
        results.push({ memory, score });
      }
    }
    
    return results.sort((a, b) => b.score - a.score);
  }
  
  // Type-based search
  function searchByType(type) {
    return loadMemoriesByType(type);
  }
  
  // Temporal search
  function searchByTimeRange(startDate, endDate) {
    return loadMemoriesByTimeRange(startDate, endDate);
  }
}
\.```

## Phase 3: Integration & Enhancement

### Step 1: IDE-Specific Integration

#### Claude Code Integration

\.```markdown
# Claude Code Memory Integration

## Setup Instructions

1. Create memory management prompts:

\.```
You are now equipped with a memory system. When I share information that should be remembered:

1. Identify the memory type (working, episodic, semantic, procedural, long-term)
2. Extract key information and create a memory entry
3. Store it in the appropriate .bmad-memory/ directory
4. Update relevant indices

When I ask questions, search your memory first before responding.
\.```

2. Create memory integration workflow:

\.```
For each conversation:
- Check for relevant memories at the start
- Create new memories for important insights
- Update existing memories with new information
- Maintain conversation context using memory
\.```
\.```

#### Cursor AI Integration

\.```typescript
// Cursor AI Extension Integration
class CursorMemoryExtension {
  constructor() {
    this.memorySystem = new MemorySystem();
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Listen for file changes
    vscode.workspace.onDidChangeTextDocument((event) => {
      this.handleFileChange(event);
    });
    
    // Listen for cursor position changes
    vscode.window.onDidChangeTextEditorSelection((event) => {
      this.handleCursorChange(event);
    });
  }
  
  handleFileChange(event) {
    // Extract context and create memory
    const context = this.extractContext(event);
    this.memorySystem.createMemory(context, 'working');
  }
  
  provideCompletionItems(document, position) {
    // Use memory to enhance completions
    const context = this.getContext(document, position);
    const relevantMemories = this.memorySystem.search(context);
    return this.enhanceCompletions(relevantMemories);
  }
}
\.```

#### V0 Integration

\.```javascript
// V0 Memory Integration
class V0MemorySystem {
  constructor() {
    this.storage = new BrowserMemoryStorage();
    this.setupComponentMemory();
  }
  
  setupComponentMemory() {
    // Hook into component generation
    this.onComponentGenerated = (component) => {
      this.storeComponentMemory(component);
    };
    
    // Hook into design decisions
    this.onDesignDecision = (decision) => {
      this.storeDesignMemory(decision);
    };
  }
  
  storeComponentMemory(component) {
    const memory = {
      type: 'procedural',
      content: {
        title: `Component: ${component.name}`,
        details: component.code,
        metadata: {
          framework: component.framework,
          props: component.props,
          usage: component.usage
        }
      }
    };
    
    this.storage.store(memory);
  }
  
  enhanceGeneration(prompt) {
    // Search for relevant component memories
    const relevantMemories = this.storage.search(prompt);
    return this.incorporateMemories(prompt, relevantMemories);
  }
}
\.```

#### JetBrains Integration

\.```kotlin
// JetBrains Plugin Integration
class JetBrainsMemoryPlugin : ApplicationComponent {
    private val memorySystem = MemorySystem()
    
    override fun initComponent() {
        setupProjectListeners()
        setupEditorListeners()
    }
    
    private fun setupProjectListeners() {
        ProjectManager.getInstance().addProjectManagerListener(object : ProjectManagerListener {
            override fun projectOpened(project: Project) {
                memorySystem.loadProjectMemories(project)
            }
            
            override fun projectClosed(project: Project) {
                memorySystem.saveProjectMemories(project)
            }
        })
    }
    
    private fun setupEditorListeners() {
        EditorFactory.getInstance().addEditorFactoryListener(object : EditorFactoryListener {
            override fun editorCreated(event: EditorFactoryEvent) {
                val editor = event.editor
                setupMemoryIntegration(editor)
            }
        })
    }
    
    private fun setupMemoryIntegration(editor: Editor) {
        // Add memory-enhanced code completion
        // Add memory-based code suggestions
        // Track coding patterns for memory storage
    }
}
\.```

### Step 2: Persona Integration

\.```javascript
// Persona-Memory Integration
class PersonaMemoryIntegration {
  constructor(memorySystem) {
    this.memorySystem = memorySystem;
    this.setupPersonaSpecificMemory();
  }
  
  setupPersonaSpecificMemory() {
    // Architect persona memory specialization
    this.architectMemory = {
      storeArchitecturalDecision: (decision) => {
        return this.memorySystem.createMemory({
          type: 'semantic',
          content: decision,
          metadata: {
            persona: 'architect',
            category: 'architectural_decision',
            impact: 'high'
          }
        });
      },
      
      getArchitecturalPatterns: (context) => {
        return this.memorySystem.search({
          query: context,
          filters: {
            persona: 'architect',
            category: 'pattern'
          }
        });
      }
    };
    
    // Product Manager persona memory specialization
    this.pmMemory = {
      storeRequirement: (requirement) => {
        return this.memorySystem.createMemory({
          type: 'episodic',
          content: requirement,
          metadata: {
            persona: 'product_manager',
            category: 'requirement',
            stakeholder: requirement.stakeholder
          }
        });
      },
      
      getStakeholderFeedback: (stakeholder) => {
        return this.memorySystem.search({
          filters: {
            persona: 'product_manager',
            stakeholder: stakeholder
          }
        });
      }
    };
    
    // V0 UX/UI Architect persona memory specialization
    this.uxMemory = {
      storeDesignPattern: (pattern) => {
        return this.memorySystem.createMemory({
          type: 'procedural',
          content: pattern,
          metadata: {
            persona: 'ux_ui_architect',
            category: 'design_pattern',
            component_type: pattern.type
          }
        });
      },
      
      getDesignPatterns: (componentType) => {
        return this.memorySystem.search({
          filters: {
            persona: 'ux_ui_architect',
            component_type: componentType
          }
        });
      }
    };
  }
}
\.```

### Step 3: Workflow Integration

\.```javascript
// Workflow-Memory Integration
class WorkflowMemoryIntegration {
  constructor(memorySystem) {
    this.memorySystem = memorySystem;
    this.setupWorkflowHooks();
  }
  
  setupWorkflowHooks() {
    // Hook into workflow start
    this.onWorkflowStart = (workflow) => {
      const context = this.loadWorkflowContext(workflow);
      this.memorySystem.setWorkingContext(context);
    };
    
    // Hook into workflow steps
    this.onWorkflowStep = (step, result) => {
      this.memorySystem.createMemory({
        type: 'episodic',
        content: {
          title: `Workflow Step: ${step.name}`,
          details: result,
          workflow: step.workflow,
          timestamp: new Date().toISOString()
        }
      });
    };
    
    // Hook into workflow completion
    this.onWorkflowComplete = (workflow, outcome) => {
      this.memorySystem.createMemory({
        type: 'semantic',
        content: {
          title: `Workflow Outcome: ${workflow.name}`,
          details: outcome,
          lessons_learned: this.extractLessons(workflow),
          success_factors: this.identifySuccessFactors(workflow)
        }
      });
    };
  }
  
  enhanceWorkflowWithMemory(workflow) {
    // Get relevant memories for workflow
    const relevantMemories = this.memorySystem.search({
      query: workflow.description,
      filters: { type: ['semantic', 'procedural'] }
    });
    
    // Enhance workflow steps with memory insights
    return this.incorporateMemoryInsights(workflow, relevantMemories);
  }
}
\.```

## Phase 4: Optimization & Monitoring

### Step 1: Performance Monitoring Setup

\.```javascript
// Performance Monitoring
class MemoryPerformanceMonitor {
  constructor(memorySystem) {
    this.memorySystem = memorySystem;
    this.metrics = new PerformanceMetrics();
    this.setupMonitoring();
  }
  
  setupMonitoring() {
    // Monitor operation latency
    this.memorySystem.onOperation = (operation, duration) => {
      this.metrics.recordLatency(operation, duration);
    };
    
    // Monitor memory usage
    setInterval(() => {
      this.metrics.recordMemoryUsage(this.getMemoryUsage());
    }, 60000); // Every minute
    
    // Monitor cache performance
    this.memorySystem.cache.onHit = () => this.metrics.recordCacheHit();
    this.memorySystem.cache.onMiss = () => this.metrics.recordCacheMiss();
  }
  
  generatePerformanceReport() {
    return {
      latency: this.metrics.getLatencyStats(),
      throughput: this.metrics.getThroughputStats(),
      memory_usage: this.metrics.getMemoryUsageStats(),
      cache_performance: this.metrics.getCacheStats(),
      recommendations: this.generateRecommendations()
    };
  }
}
\.```

### Step 2: Quality Monitoring

\.```javascript
// Quality Monitoring
class MemoryQualityMonitor {
  constructor(memorySystem) {
    this.memorySystem = memorySystem;
    this.setupQualityChecks();
  }
  
  setupQualityChecks() {
    // Monitor data quality
    setInterval(() => {
      this.checkDataQuality();
    }, 3600000); // Every hour
    
    // Monitor relationship integrity
    setInterval(() => {
      this.checkRelationshipIntegrity();
    }, 86400000); // Daily
  }
  
  checkDataQuality() {
    const memories = this.memorySystem.getAllMemories();
    const qualityReport = {
      completeness: this.assessCompleteness(memories),
      accuracy: this.assessAccuracy(memories),
      consistency: this.assessConsistency(memories),
      freshness: this.assessFreshness(memories)
    };
    
    this.reportQualityIssues(qualityReport);
    return qualityReport;
  }
}
\.```

### Step 3: Automated Maintenance

\.```javascript
// Automated Maintenance
class MemoryMaintenanceSystem {
  constructor(memorySystem) {
    this.memorySystem = memorySystem;
    this.setupMaintenanceTasks();
  }
  
  setupMaintenanceTasks() {
    // Daily maintenance
    this.scheduleTask('daily', () => {
      this.cleanupWorkingMemory();
      this.updateAccessStatistics();
      this.optimizeIndices();
    });
    
    // Weekly maintenance
    this.scheduleTask('weekly', () => {
      this.consolidateMemories();
      this.updateImportanceScores();
      this.cleanupExpiredMemories();
    });
    
    // Monthly maintenance
    this.scheduleTask('monthly', () => {
      this.archiveOldMemories();
      this.optimizeStorage();
      this.generateMaintenanceReport();
    });
  }
  
  scheduleTask(frequency, task) {
    // Implementation depends on your environment
    // Could use cron jobs, setTimeout, or IDE-specific scheduling
  }
}
\.```

## Testing Your Implementation

### Step 1: Basic Functionality Tests

\.```javascript
// Basic Tests
function runBasicTests() {
  console.log('Running basic memory system tests...');
  
  // Test memory creation
  const memory = createMemory('Test content', 'working');
  assert(memory.id, 'Memory should have an ID');
  
  // Test memory retrieval
  const retrieved = retrieveMemory(memory.id);
  assert(retrieved.content.details === 'Test content', 'Content should match');
  
  // Test memory search
  const results = searchMemories('Test');
  assert(results.length > 0, 'Search should return results');
  
  // Test memory update
  const updated = updateMemory(memory.id, { importance: 0.8 });
  assert(updated.importance === 0.8, 'Importance should be updated');
  
  // Test memory deletion
  const deleted = deleteMemory(memory.id);
  assert(deleted === true, 'Memory should be deleted');
  
  console.log('Basic tests passed!');
}
\.```

### Step 2: Integration Tests

\.```javascript
// Integration Tests
function runIntegrationTests() {
  console.log('Running integration tests...');
  
  // Test persona integration
  testPersonaIntegration();
  
  // Test workflow integration
  testWorkflowIntegration();
  
  // Test IDE-specific features
  testIDEIntegration();
  
  console.log('Integration tests passed!');
}
\.```

### Step 3: Performance Tests

\.```javascript
// Performance Tests
function runPerformanceTests() {
  console.log('Running performance tests...');
  
  // Test operation latency
  const startTime = Date.now();
  for (let i = 0; i < 1000; i++) {
    createMemory(`Test content ${i}`, 'working');
  }
  const createTime = Date.now() - startTime;
  console.log(`Created 1000 memories in ${createTime}ms`);
  
  // Test search performance
  const searchStart = Date.now();
  const results = searchMemories('Test');
  const searchTime = Date.now() - searchStart;
  console.log(`Search completed in ${searchTime}ms`);
  
  console.log('Performance tests completed!');
}
\.```

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Memory operations are slow
**Solution**: 
1. Check if indexing is enabled
2. Optimize cache settings
3. Consider storage type (file vs. memory)
4. Review retention policies

#### Issue: Search results are not relevant
**Solution**:
1. Improve content summarization
2. Add more specific tags
3. Enhance relationship mapping
4. Tune similarity thresholds

#### Issue: Memory usage is too high
**Solution**:
1. Implement aggressive cleanup policies
2. Compress old memories
3. Archive infrequently accessed data
4. Optimize data structures

#### Issue: IDE integration not working
**Solution**:
1. Check IDE-specific API compatibility
2. Verify extension/plugin permissions
3. Review event listener setup
4. Test with minimal implementation

## Next Steps

After completing the basic implementation:

1. **Customize for Your Use Case**: Adapt the memory types and retention policies to your specific needs
2. **Enhance Search**: Implement semantic search using embeddings
3. **Add Analytics**: Set up detailed performance and usage analytics
4. **Scale Up**: Implement distributed memory for team collaboration
5. **Security Hardening**: Add encryption and advanced access controls

## Support and Resources

- **Memory Architecture Methodology**: `/bmad-agent/memory/memory-architecture.md`
- **Data Structures Guide**: `/bmad-agent/memory/memory-data-structures.md`
- **Performance Optimization**: `/bmad-agent/memory/memory-performance-monitoring.md`
- **Security Implementation**: `/bmad-agent/memory/memory-security-privacy.md`
- **Testing Framework**: `/bmad-agent/memory/memory-testing-validation.md`

For additional support, refer to the IDE-specific implementation guides in the following sections.
