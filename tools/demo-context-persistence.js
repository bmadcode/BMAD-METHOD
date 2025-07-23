#!/usr/bin/env node

// Demo script to test Context Persistence functionality
const path = require('path');
const fs = require('fs');

// Import the ContextManager
const ContextManager = require('./installer/lib/context-manager');

async function demoContextPersistence() {
  console.log('🚀 BMAD Context Persistence Demo');
  console.log('=================================\n');

  // Create a test workspace in /tmp
  const testWorkspace = '/tmp/bmad-context-test/.workspace';
  if (fs.existsSync(testWorkspace)) {
    fs.rmSync(path.dirname(testWorkspace), { recursive: true, force: true });
  }
  
  const contextManager = new ContextManager(testWorkspace);
  console.log('✅ Initialized test workspace at:', testWorkspace);

  try {
    // Demo 1: Session Start and Context Updates
    console.log('\n📍 Demo 1: Session Management and Context Updates');
    console.log('==================================================');
    
    await contextManager.onSessionStart('demo-session-001', 'dev-agent');
    console.log('✅ Started session: demo-session-001 with dev-agent');
    
    await contextManager.updateSharedContext({
      currentFocus: 'Implementing context persistence framework for BMAD collaborative workspace system',
      nextSteps: [
        'Complete ContextManager class implementation',
        'Test integration with workspace utilities',
        'Create demo scenarios for all major features'
      ]
    });
    console.log('✅ Updated shared context with development focus');

    // Demo 2: Decision Logging
    console.log('\n📋 Demo 2: Decision Logging');
    console.log('============================');
    
    await contextManager.logDecision({
      title: 'Use file-based context persistence over database',
      agent: 'dev-agent',
      context: 'Story 1.2: Context Persistence Framework',
      decision: 'Implement context persistence using structured markdown files instead of a database',
      rationale: 'Files are cross-IDE compatible, human-readable, version-control friendly, and require no external dependencies',
      alternatives: 'SQLite database, JSON files, in-memory store',
      impact: 'Enables seamless context sharing across different development environments',
      status: 'active'
    });
    console.log('✅ Logged architectural decision');
    
    await contextManager.logDecision({
      title: 'Context compaction at 10MB threshold',
      agent: 'dev-agent',
      context: 'Context performance optimization',
      decision: 'Automatically compact context files when they exceed 10MB',
      rationale: 'Prevents workspace degradation while preserving critical information',
      alternatives: 'No compaction, smaller threshold, manual compaction',
      impact: 'Maintains workspace performance over long development cycles',
      status: 'active'
    });
    console.log('✅ Logged performance decision');

    // Demo 3: Progress Tracking
    console.log('\n📈 Demo 3: Progress Tracking');
    console.log('=============================');
    
    await contextManager.updateProgress({
      currentStory: 'Story 1.2: Context Persistence Framework',
      completedTasks: [
        'Create ContextManager class with core functionality',
        'Implement shared context file format and parsing',
        'Add decision logging with structured format',
        'Create progress tracking system'
      ],
      pendingTasks: [
        'Add quality metrics integration',
        'Implement context compaction algorithm',
        'Create integration hooks for BMAD agents',
        'Add cross-IDE testing scenarios'
      ],
      blockers: [],
      qualityScore: 'B+ (85/100) - Core functionality complete, testing needed'
    });
    console.log('✅ Updated progress tracking');

    // Demo 4: Quality Metrics
    console.log('\n📊 Demo 4: Quality Metrics Tracking');
    console.log('====================================');
    
    await contextManager.updateQualityMetrics({
      agent: 'qa-agent',
      story: 'Story 1.2: Context Persistence Framework',
      realityAuditScore: '85/100',
      patternCompliance: '90/100',
      technicalDebtScore: '80/100',
      overallQuality: 'B+ (85/100)',
      details: 'Core implementation solid. Needs integration testing and error handling improvements.'
    });
    console.log('✅ Recorded quality assessment');

    // Demo 5: Context Retrieval
    console.log('\n🔍 Demo 5: Context Retrieval and Status');
    console.log('=======================================');
    
    const status = await contextManager.getWorkspaceStatus();
    console.log('✅ Retrieved workspace status:');
    console.log(`   - Primary Agent: ${status.context.primaryAgent}`);
    console.log(`   - Current Focus: ${status.context.currentFocus.substring(0, 60)}...`);
    console.log(`   - Active Sessions: ${status.context.activeSessions.length}`);
    console.log(`   - Key Decisions: ${status.context.keyDecisions.length}`);
    console.log(`   - Next Steps: ${status.context.nextSteps.length}`);
    console.log(`   - Quality Score: ${status.progress.qualityScore}`);
    console.log(`   - Recent Decisions: ${status.recentDecisions.length}`);

    // Demo 6: Decision Retrieval with Filters
    console.log('\n🔎 Demo 6: Decision Retrieval with Filters');
    console.log('===========================================');
    
    const allDecisions = await contextManager.getDecisions();
    console.log(`✅ Retrieved ${allDecisions.length} total decisions`);
    
    const devDecisions = await contextManager.getDecisions({ agent: 'dev-agent' });
    console.log(`✅ Retrieved ${devDecisions.length} decisions by dev-agent`);
    
    const activeDecisions = await contextManager.getDecisions({ status: 'active' });
    console.log(`✅ Retrieved ${activeDecisions.length} active decisions`);

    // Demo 7: Context Export
    console.log('\n📤 Demo 7: Context Export');
    console.log('==========================');
    
    const contextExport = await contextManager.exportContextSummary();
    console.log('✅ Generated context export summary:');
    console.log(contextExport.substring(0, 300) + '...\n');

    // Demo 8: Session End
    console.log('📍 Demo 8: Session End');
    console.log('=======================');
    
    await contextManager.onSessionEnd('demo-session-001');
    console.log('✅ Ended session: demo-session-001');

    // Demo 9: File Structure Verification
    console.log('\n📁 Demo 9: File Structure Verification');
    console.log('=======================================');
    
    const verifyFiles = [
      'context/shared-context.md',
      'decisions/decisions-log.md',
      'progress/progress-summary.md',
      'quality/quality-metrics.md'
    ];
    
    for (const file of verifyFiles) {
      const filePath = path.join(testWorkspace, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(`✅ ${file} - ${stats.size} bytes`);
      } else {
        console.log(`❌ ${file} - Not found`);
      }
    }

    console.log('\n🎉 Context Persistence Demo Completed Successfully!');
    console.log('====================================================');
    console.log(`📁 Test workspace created at: ${testWorkspace}`);
    console.log('💡 All context files are human-readable markdown');
    console.log('🔧 Ready for integration with BMAD agents and IDE utilities');
    
  } catch (error) {
    console.error('\n❌ Demo failed:', error.message);
    console.error(error.stack);
  }
}

// Run the demo
if (require.main === module) {
  demoContextPersistence();
}

module.exports = { demoContextPersistence };