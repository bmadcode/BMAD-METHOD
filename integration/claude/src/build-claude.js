#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import Mustache from 'mustache';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const REPO_ROOT = path.resolve(__dirname, '../../..');
const BMAD_AGENTS_DIR = path.join(REPO_ROOT, 'bmad-core/agents');
const CLAUDE_AGENTS_DIR = path.join(REPO_ROOT, '.claude/agents');
const CLAUDE_MEMORY_DIR = path.join(REPO_ROOT, '.claude/memory');
const TEMPLATE_PATH = path.join(__dirname, 'templates/agent.mustache');

// Core agents to process (excluding orchestrator and master which aren't direct workflow agents)
const CORE_AGENTS = [
  'analyst',
  'architect', 
  'dev',
  'pm',
  'qa',
  'sm' // scrum master
];

function listBmadDirectory(dirName) {
  const dirPath = path.join(REPO_ROOT, `bmad-core/${dirName}`);
  try {
    return fs.readdirSync(dirPath)
      .filter(f => !f.startsWith('.') && (f.endsWith('.md') || f.endsWith('.yaml') || f.endsWith('.yml')))
      .sort();
  } catch (error) {
    console.warn(`⚠️  Could not read bmad-core/${dirName}: ${error.message}`);
    return [];
  }
}

async function parseAgentFile(agentPath) {
  const content = await fs.readFile(agentPath, 'utf-8');
  
  // Extract the YAML block between ```yaml and ```
  const yamlMatch = content.match(/```yaml\n([\s\S]*?)\n```/);
  if (!yamlMatch) {
    throw new Error(`No YAML block found in ${agentPath}`);
  }
  
  const yamlContent = yamlMatch[1];
  const parsed = yaml.parse(yamlContent);
  
  // Process commands to extract main functionality
  const processedCommands = [];
  if (parsed.commands && Array.isArray(parsed.commands)) {
    for (const command of parsed.commands) {
      if (typeof command === 'string') {
        const [name, ...rest] = command.split(':');
        const description = rest.join(':').trim();
        if (name !== 'help' && name !== 'exit' && name !== 'yolo' && name !== 'doc-out') {
          processedCommands.push({
            name: name.trim(),
            description: description || `Execute ${name.trim()}`,
            isMainCommands: true
          });
        }
      }
    }
  }
  
  // Auto-inject real BMAD artifact lists
  const realDependencies = {
    tasks: listBmadDirectory('tasks'),
    templates: listBmadDirectory('templates'), 
    data: listBmadDirectory('data')
  };
  
  return {
    ...parsed,
    commands: processedCommands,
    dependencies: realDependencies
  };
}

async function generateClaudeAgent(agentId) {
  console.log(`Processing ${agentId}...`);
  
  const agentPath = path.join(BMAD_AGENTS_DIR, `${agentId}.md`);
  
  if (!await fs.pathExists(agentPath)) {
    console.warn(`⚠️  Agent file not found: ${agentPath}`);
    return;
  }
  
  try {
    const agentData = await parseAgentFile(agentPath);
    const template = await fs.readFile(TEMPLATE_PATH, 'utf-8');
    
    const rendered = Mustache.render(template, agentData);
    
    const outputPath = path.join(CLAUDE_AGENTS_DIR, `${agentId}.md`);
    await fs.outputFile(outputPath, rendered);
    
    console.log(`✅ Generated ${outputPath}`);
    
    // Create memory file placeholder
    const memoryPath = path.join(CLAUDE_MEMORY_DIR, `${agentId}.md`);
    if (!await fs.pathExists(memoryPath)) {
      await fs.outputFile(memoryPath, `# ${agentData.agent?.name || agentId} Memory\n\nThis file stores contextual memory for the ${agentId} subagent.\n`);
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${agentId}:`, error.message);
  }
}

async function createClaudeConfig() {
  // Ensure .claude directory structure exists
  await fs.ensureDir(CLAUDE_AGENTS_DIR);
  await fs.ensureDir(CLAUDE_MEMORY_DIR);
  
  // Create handoff directory for cross-agent collaboration
  const handoffDir = path.join(REPO_ROOT, '.claude/handoff');
  await fs.ensureDir(handoffDir);
  
  // Create initial handoff file
  const handoffPath = path.join(handoffDir, 'current.md');
  if (!await fs.pathExists(handoffPath)) {
    await fs.outputFile(handoffPath, `# Agent Handoff Log

This file tracks context and key findings passed between BMAD agents during cross-agent workflows.

## Usage
Each agent should append a structured summary when preparing context for another agent.

---

`);
  }
  
  // Create .gitignore for .claude directory
  const gitignorePath = path.join(REPO_ROOT, '.claude/.gitignore');
  const gitignoreContent = `# Claude Code subagents - generated files
agents/
memory/
handoff/
*.log
`;
  await fs.outputFile(gitignorePath, gitignoreContent);
}

async function main() {
  console.log('🚀 Building Claude Code subagents from BMAD-Method...\n');
  
  await createClaudeConfig();
  
  for (const agentId of CORE_AGENTS) {
    await generateClaudeAgent(agentId);
  }
  
  console.log('\n✨ Claude Code subagents build complete!');
  console.log(`\n📁 Generated agents in: ${CLAUDE_AGENTS_DIR}`);
  console.log(`\n🎯 Usage:`);
  console.log(`   1. Start Claude Code in this directory`);
  console.log(`   2. Type: "Use the analyst subagent to help me create a project brief"`);
  console.log(`   3. Or use /agents command to see all available subagents`);
  
  // Check if claude command is available
  try {
    const { execSync } = await import('child_process');
    execSync('claude --version', { stdio: 'ignore' });
    console.log(`\n💡 Quick start: Run 'claude' in this directory to begin!`);
  } catch {
    console.log(`\n💡 Install Claude Code to get started: https://claude.ai/code`);
  }
}

// Handle command line usage
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateClaudeAgent, parseAgentFile };
