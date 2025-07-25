#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../../..');
const CLAUDE_AGENTS_DIR = path.join(REPO_ROOT, '.claude/agents');

async function validateAgentFile(agentPath) {
  const content = await fs.readFile(agentPath, 'utf-8');
  const errors = [];
  
  // Check for required frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    errors.push('Missing YAML frontmatter');
    return errors;
  }
  
  try {
    const frontmatter = yaml.parse(frontmatterMatch[1]);
    
    // Validate required fields
    if (!frontmatter.name) errors.push('Missing "name" field');
    if (!frontmatter.description) errors.push('Missing "description" field');
    if (!frontmatter.tools || !Array.isArray(frontmatter.tools)) {
      errors.push('Missing or invalid "tools" field');
    }
    
    // Validate tools are reasonable
    const validTools = ['Read', 'Grep', 'glob', 'codebase_search_agent', 'list_directory', 'edit_file', 'create_file'];
    const invalidTools = frontmatter.tools?.filter(tool => !validTools.includes(tool)) || [];
    if (invalidTools.length > 0) {
      errors.push(`Invalid tools: ${invalidTools.join(', ')}`);
    }
    
  } catch (yamlError) {
    errors.push(`Invalid YAML: ${yamlError.message}`);
  }
  
  // Check content sections
  if (!content.includes('## Role & Identity')) {
    errors.push('Missing "Role & Identity" section');
  }
  if (!content.includes('## Working Mode')) {
    errors.push('Missing "Working Mode" section');
  }
  
  return errors;
}

async function main() {
  console.log('🔍 Validating Claude Code subagents...\n');
  
  if (!await fs.pathExists(CLAUDE_AGENTS_DIR)) {
    console.error('❌ No .claude/agents directory found. Run "npm run build" first.');
    process.exit(1);
  }
  
  const agentFiles = await fs.readdir(CLAUDE_AGENTS_DIR);
  const mdFiles = agentFiles.filter(f => f.endsWith('.md'));
  
  if (mdFiles.length === 0) {
    console.error('❌ No agent files found in .claude/agents/');
    process.exit(1);
  }
  
  let totalErrors = 0;
  
  for (const file of mdFiles) {
    const agentPath = path.join(CLAUDE_AGENTS_DIR, file);
    const errors = await validateAgentFile(agentPath);
    
    if (errors.length === 0) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file}:`);
      errors.forEach(error => console.log(`   - ${error}`));
      totalErrors += errors.length;
    }
  }
  
  console.log(`\n📊 Validation complete:`);
  console.log(`   Agents checked: ${mdFiles.length}`);
  console.log(`   Total errors: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log('\n🔧 Run "npm run build" to regenerate agents');
    process.exit(1);
  } else {
    console.log('\n🎉 All agents valid!');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
