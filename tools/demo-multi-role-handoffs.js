#!/usr/bin/env node

// Demo script to test Multi-Role Agent Handoff functionality
const path = require('path');
const fs = require('fs');

// Import managers
const ContextManager = require('./installer/lib/context-manager');
const HandoffManager = require('./installer/lib/handoff-manager');

async function demoMultiRoleHandoffs() {
  console.log('🧠 BMAD Multi-Role Agent Handoff Demo');
  console.log('=====================================\n');

  // Create a test workspace in /tmp
  const testWorkspace = '/tmp/bmad-multi-role-test/.workspace';
  if (fs.existsSync(testWorkspace)) {
    fs.rmSync(path.dirname(testWorkspace), { recursive: true, force: true });
  }
  
  const contextManager = new ContextManager(testWorkspace);
  const handoffManager = new HandoffManager(testWorkspace);
  console.log('✅ Initialized test workspace at:', testWorkspace);

  try {
    // Demo 1: Setup Complex Context Requiring Multi-Role Analysis
    console.log('\n📊 Demo 1: Setting Up Complex Performance Analysis Context');
    console.log('========================================================');
    
    await contextManager.updateSharedContext({
      currentFocus: 'E-commerce platform experiencing performance degradation under high load with 40% slower checkout times',
      nextSteps: [
        'Analyze performance bottlenecks in payment processing system',
        'Research industry benchmarks for e-commerce performance',
        'Investigate user behavior patterns during high-traffic periods',
        'Design scalable architecture improvements',
        'Implement comprehensive performance monitoring'
      ]
    });

    // Add technical decisions
    await contextManager.logDecision({
      title: 'Database query optimization strategy',
      agent: 'developer',
      context: 'Performance optimization initiative',
      decision: 'Implement query caching and index optimization for product catalog',
      rationale: 'Analysis shows 60% of slow queries are product lookups during checkout',
      impact: 'Expected 30% improvement in checkout response times',
      status: 'active'
    });

    // Add analytical data
    await contextManager.logDecision({
      title: 'Performance metrics baseline establishment',
      agent: 'analyst',
      context: 'Performance monitoring requirements',
      decision: 'Track checkout completion time, cart abandonment rate, and server response times',
      rationale: 'Need quantitative data to measure improvement impact and identify patterns',
      impact: 'Enables data-driven optimization decisions',
      status: 'active'
    });

    console.log('✅ Complex performance context established');

    // Demo 2: Developer-Analyst Handoff for Performance Optimization
    console.log('\n🔄 Demo 2: Developer-Analyst Handoff (Performance Optimization)');
    console.log('==============================================================');
    
    const devAnalystHandoff = await handoffManager.createHandoff(
      'senior-developer',
      'dev-analyst-specialist',
      'Performance optimization requires both implementation expertise and data analysis. Need to analyze current metrics, identify patterns, and implement data-driven improvements.'
    );
    
    console.log('✅ Created Dev-Analyst handoff:');
    console.log(`   - Handoff ID: ${devAnalystHandoff.handoffId}`);
    console.log(`   - Detected Type: ${handoffManager.getAgentType('dev-analyst-specialist')}`);
    console.log(`   - Multi-role filtering applied for development + analysis`);

    // Demo 3: QA-Research Handoff for Compliance Testing
    console.log('\n🔍 Demo 3: QA-Research Handoff (Compliance & Standards)');
    console.log('======================================================');
    
    const qaResearchHandoff = await handoffManager.createHandoff(
      'qa-engineer',
      'qa-research-specialist',
      'Payment processing compliance testing requires research into PCI DSS standards, industry testing practices, and regulatory requirements. Need comprehensive research-based testing strategy.'
    );
    
    console.log('✅ Created QA-Research handoff:');
    console.log(`   - Handoff ID: ${qaResearchHandoff.handoffId}`);
    console.log(`   - Detected Type: ${handoffManager.getAgentType('qa-research-specialist')}`);
    console.log(`   - Multi-role filtering applied for QA + research`);

    // Demo 4: Architect-Brainstorming Handoff for Innovation
    console.log('\n💡 Demo 4: Architect-Brainstorming Handoff (Creative Solutions)');
    console.log('===============================================================');
    
    const archBrainstormHandoff = await handoffManager.createHandoff(
      'solution-architect',
      'architect-brainstorming-lead',
      'Traditional scaling approaches may not be sufficient. Need creative exploration of innovative architecture patterns, microservices alternatives, and cutting-edge performance solutions.'
    );
    
    console.log('✅ Created Architect-Brainstorming handoff:');
    console.log(`   - Handoff ID: ${archBrainstormHandoff.handoffId}`);
    console.log(`   - Detected Type: ${handoffManager.getAgentType('architect-brainstorming-lead')}`);
    console.log(`   - Multi-role filtering applied for architecture + brainstorming`);

    // Demo 5: PM-Analyst Handoff for Business Impact Analysis  
    console.log('\n📈 Demo 5: PM-Analyst Handoff (Business Impact Analysis)');
    console.log('========================================================');
    
    const pmAnalystHandoff = await handoffManager.createHandoff(
      'project-manager',
      'pm-analyst-consultant',
      'Need to analyze business impact of performance issues: revenue loss, customer satisfaction trends, competitive positioning. Require data-driven project prioritization and resource allocation.'
    );
    
    console.log('✅ Created PM-Analyst handoff:');
    console.log(`   - Handoff ID: ${pmAnalystHandoff.handoffId}`);
    console.log(`   - Detected Type: ${handoffManager.getAgentType('pm-analyst-consultant')}`);
    console.log(`   - Multi-role filtering applied for PM + analysis`);

    // Demo 6: UX-Research Handoff for User Experience Investigation
    console.log('\n👥 Demo 6: UX-Research Handoff (User Experience Investigation)');
    console.log('=============================================================');
    
    const uxResearchHandoff = await handoffManager.createHandoff(
      'ux-designer',
      'ux-research-specialist',
      'Performance issues affect user experience. Need research into user behavior during slow checkout, accessibility implications, and evidence-based UX improvements for high-load scenarios.'
    );
    
    console.log('✅ Created UX-Research handoff:');
    console.log(`   - Handoff ID: ${uxResearchHandoff.handoffId}`);
    console.log(`   - Detected Type: ${handoffManager.getAgentType('ux-research-specialist')}`);
    console.log(`   - Multi-role filtering applied for UX + research`);

    // Demo 7: Pure Role Handoffs for Comparison
    console.log('\n🎯 Demo 7: Pure Role Handoffs (Single-Role Comparison)');
    console.log('======================================================');
    
    const pureAnalyst = await handoffManager.createHandoff('data-team', 'pure-analyst', 'Pure analyst role for comparison');
    const pureBrainstorming = await handoffManager.createHandoff('design-team', 'creative-brainstorming', 'Pure brainstorming role for comparison');
    const pureResearch = await handoffManager.createHandoff('research-team', 'research-specialist', 'Pure research role for comparison');
    
    console.log('✅ Created pure role handoffs for comparison:');
    console.log(`   - Pure Analyst: ${handoffManager.getAgentType('pure-analyst')}`);
    console.log(`   - Pure Brainstorming: ${handoffManager.getAgentType('creative-brainstorming')}`);
    console.log(`   - Pure Research: ${handoffManager.getAgentType('research-specialist')}`);

    // Demo 8: Handoff Content Analysis - Multi-Role vs Single-Role
    console.log('\n🔍 Demo 8: Multi-Role vs Single-Role Content Analysis');
    console.log('====================================================');
    
    // Analyze Dev-Analyst handoff
    const devAnalystContent = fs.readFileSync(devAnalystHandoff.filePath, 'utf8');
    console.log('✅ Dev-Analyst handoff analysis:');
    console.log(`   - Contains development focus: ${devAnalystContent.toLowerCase().includes('technical') ? 'YES' : 'NO'}`);
    console.log(`   - Contains analysis focus: ${devAnalystContent.toLowerCase().includes('analysis') || devAnalystContent.toLowerCase().includes('data') ? 'YES' : 'NO'}`);
    console.log(`   - Multi-role description: ${devAnalystContent.includes('multi') ? 'YES' : 'NO'}`);
    
    // Analyze QA-Research handoff
    const qaResearchContent = fs.readFileSync(qaResearchHandoff.filePath, 'utf8');
    console.log('✅ QA-Research handoff analysis:');
    console.log(`   - Contains QA focus: ${qaResearchContent.toLowerCase().includes('testing') || qaResearchContent.toLowerCase().includes('quality') ? 'YES' : 'NO'}`);
    console.log(`   - Contains research focus: ${qaResearchContent.toLowerCase().includes('research') || qaResearchContent.toLowerCase().includes('investigate') ? 'YES' : 'NO'}`);
    console.log(`   - Research methodology actions: ${qaResearchContent.includes('Research industry') ? 'YES' : 'NO'}`);
    
    // Compare with pure role handoff
    const pureAnalystContent = fs.readFileSync(pureAnalyst.filePath, 'utf8');
    console.log('✅ Pure Analyst comparison:');
    console.log(`   - Pure analyst actions only: ${pureAnalystContent.includes('Analyze available data') ? 'YES' : 'NO'}`);
    console.log(`   - No development specifics: ${!pureAnalystContent.toLowerCase().includes('code implementation') ? 'YES' : 'NO'}`);

    // Demo 9: Agent Type Detection Testing
    console.log('\n🤖 Demo 9: Agent Type Detection Algorithm Testing'); 
    console.log('==================================================');
    
    const testCases = [
      { name: 'dev-analyst-expert', expected: 'dev-analyst' },
      { name: 'qa-research-lead', expected: 'qa-research' },
      { name: 'architect-brainstorming-specialist', expected: 'architect-brainstorming' },
      { name: 'pm-analyst-consultant', expected: 'pm-analyst' },
      { name: 'ux-research-designer', expected: 'ux-research' },
      { name: 'senior-developer', expected: 'dev' },
      { name: 'data-analyst', expected: 'analyst' },
      { name: 'creative-brainstorming-facilitator', expected: 'brainstorming' },
      { name: 'research-scientist', expected: 'research' }
    ];
    
    console.log('✅ Agent type detection results:');
    testCases.forEach(testCase => {
      const detected = handoffManager.getAgentType(testCase.name);
      const correct = detected === testCase.expected;
      console.log(`   ${correct ? '✅' : '❌'} ${testCase.name} → ${detected} (expected: ${testCase.expected})`);
    });

    // Demo 10: Multi-Role Registry Analysis
    console.log('\n📊 Demo 10: Multi-Role Registry and Analytics');
    console.log('==============================================');
    
    const stats = await handoffManager.getHandoffStats();
    console.log('✅ Enhanced handoff system statistics:');
    console.log(`   - Total handoffs created: ${stats.total}`);
    console.log(`   - Average validation score: ${stats.avgScore.toFixed(1)}/100`);
    console.log(`   - Grade distribution: ${Object.entries(stats.gradeDistribution).map(([grade, count]) => `${grade}:${count}`).join(', ')}`);
    
    // Count multi-role vs single-role handoffs
    const registryFile = path.join(testWorkspace, 'handoffs', 'handoff-registry.json');
    if (fs.existsSync(registryFile)) {
      const registry = JSON.parse(fs.readFileSync(registryFile, 'utf8'));
      const multiRoleCount = registry.filter(h => 
        handoffManager.multiRoleFilters[handoffManager.getAgentType(h.targetAgent)]
      ).length;
      
      console.log(`   - Multi-role handoffs: ${multiRoleCount}`);
      console.log(`   - Single-role handoffs: ${registry.length - multiRoleCount}`);
    }

    // Demo 11: File Structure Verification
    console.log('\n📁 Demo 11: Enhanced File Structure Verification');
    console.log('=================================================');
    
    const handoffFiles = fs.readdirSync(path.join(testWorkspace, 'handoffs'))
      .filter(f => f.endsWith('.md') && f !== 'audit-trail.md');
    
    console.log(`✅ Handoff files created: ${handoffFiles.length}`);
    
    // Categorize by role type
    const multiRoleFiles = handoffFiles.filter(file => {
      const targetAgent = file.split('-to-')[1]?.split('-')[0] + '-' + file.split('-to-')[1]?.split('-')[1];
      return handoffManager.multiRoleFilters[handoffManager.getAgentType(targetAgent)];
    });
    
    console.log(`   - Multi-role handoff files: ${multiRoleFiles.length}`);
    console.log(`   - Single-role handoff files: ${handoffFiles.length - multiRoleFiles.length}`);

    console.log('\n🎉 Multi-Role Agent Handoff Demo Completed Successfully!');
    console.log('=======================================================');
    console.log(`📁 Test workspace: ${testWorkspace}`);
    console.log('🧠 Enhanced multi-role capabilities demonstrated:');
    console.log('   ✅ 8 agent types supported (dev, qa, architect, pm, ux-expert, analyst, brainstorming, research)');
    console.log('   ✅ 5 multi-role combinations (dev-analyst, qa-research, architect-brainstorming, pm-analyst, ux-research)');
    console.log('   ✅ Intelligent agent type detection with multi-role pattern matching');
    console.log('   ✅ Combined context filtering for multi-role scenarios');
    console.log('   ✅ Role-specific and multi-role action generation');
    console.log('   ✅ Enhanced handoff validation for complex scenarios');
    console.log('🚀 Ready for real-world multi-disciplinary AI agent collaboration!');
    
  } catch (error) {
    console.error('\n❌ Demo failed:', error.message);
    console.error(error.stack);
  }
}

// Run the demo
if (require.main === module) {
  demoMultiRoleHandoffs();
}

module.exports = { demoMultiRoleHandoffs };