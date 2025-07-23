#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function createHandoff(fromAgent, toAgent, context = '') {
  try {
    const workspacePath = path.join(process.cwd(), '.workspace');
    const handoffsPath = path.join(workspacePath, 'handoffs');
    
    if (!fs.existsSync(handoffsPath)) {
      console.error('❌ Workspace handoffs directory not found.');
      process.exit(1);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const handoffId = `${fromAgent}-to-${toAgent}-${timestamp}`;
    const handoffFile = path.join(handoffsPath, `${handoffId}.md`);
    
    const handoffContent = `# Agent Handoff: ${fromAgent} → ${toAgent}

**Created:** ${new Date().toISOString()}
**Handoff ID:** ${handoffId}
**Source Agent:** ${fromAgent}
**Target Agent:** ${toAgent}

## Context Summary
${context || 'No additional context provided.'}

## Key Decisions Made
[To be filled by source agent]

## Current Progress
[To be filled by source agent]

## Next Actions for ${toAgent}
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

## Files and References
[List of relevant files and documentation]

## Blockers and Dependencies
[Any blockers or dependencies the target agent should be aware of]

## Handoff Validation
- [ ] Context completeness verified
- [ ] Decisions documented
- [ ] Next actions clearly defined
- [ ] References included
`;
    
    fs.writeFileSync(handoffFile, handoffContent);
    
    console.log('✅ Handoff package created successfully');
    console.log(`📦 Handoff ID: ${handoffId}`);
    console.log(`📁 File: ${handoffFile}`);
    
    return handoffId;
  } catch (error) {
    console.error('❌ Failed to create handoff:', error.message);
    process.exit(1);
  }
}

// Command line usage
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node handoff.js <from-agent> <to-agent> [context]');
    process.exit(1);
  }
  
  createHandoff(args[0], args[1], args[2] || '');
}

module.exports = { createHandoff };