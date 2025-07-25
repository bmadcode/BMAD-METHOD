#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

class BMADLoader {
  constructor(options = {}) {
    // Try to find bmad-core in parent directories if not specified
    this.bmadRoot = options.bmadRoot || this.findBmadRoot();
    this.cache = new Map();
    this.agentPaths = {
      core: path.join(this.bmadRoot, 'agents'),
      tasks: path.join(this.bmadRoot, 'tasks'),
      checklists: path.join(this.bmadRoot, 'checklists'),
      data: path.join(this.bmadRoot, 'data'),
      templates: path.join(this.bmadRoot, 'templates')
    };
  }

  findBmadRoot() {
    let currentDir = __dirname;
    for (let i = 0; i < 5; i++) {
      const candidate = path.join(currentDir, 'bmad-core');
      if (require('fs').existsSync(candidate)) {
        return candidate;
      }
      currentDir = path.dirname(currentDir);
    }
    return path.join(process.cwd(), 'bmad-core');
  }

  async loadAgent(agentName) {
    const cacheKey = `agent:${agentName}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const agentPath = path.join(this.agentPaths.core, `${agentName}.md`);
    const content = await fs.readFile(agentPath, 'utf8');
    
    const parsed = this.parseAgentFile(content);
    this.cache.set(cacheKey, parsed);
    
    return parsed;
  }

  parseAgentFile(content) {
    const lines = content.split('\n');
    const result = {
      title: '',
      yaml: null,
      rawContent: content,
      sections: {},
      dependencies: {}
    };

    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      result.title = titleMatch[1].trim();
    }

    // Extract YAML block
    const yamlMatch = content.match(/```yaml\n([\s\S]+?)\n```/);
    if (yamlMatch) {
      try {
        result.yaml = yaml.load(yamlMatch[1]);
        
        // Extract key information from YAML
        if (result.yaml.agent) {
          result.agent = result.yaml.agent;
        }
        if (result.yaml.persona) {
          result.persona = result.yaml.persona;
        }
        if (result.yaml.commands) {
          result.commands = result.yaml.commands;
        }
        if (result.yaml.dependencies) {
          result.dependencies = result.yaml.dependencies;
        }
        if (result.yaml['activation-instructions']) {
          result.activationInstructions = result.yaml['activation-instructions'];
        }
      } catch (e) {
        console.error('Failed to parse YAML:', e);
      }
    }

    // Extract sections
    let currentSection = null;
    let sectionContent = [];
    
    for (const line of lines) {
      if (line.match(/^##\s+(.+)$/)) {
        if (currentSection) {
          result.sections[currentSection] = sectionContent.join('\n').trim();
        }
        currentSection = line.match(/^##\s+(.+)$/)[1];
        sectionContent = [];
      } else if (currentSection) {
        sectionContent.push(line);
      }
    }
    
    if (currentSection) {
      result.sections[currentSection] = sectionContent.join('\n').trim();
    }

    return result;
  }

  async loadTask(taskName) {
    const cacheKey = `task:${taskName}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const taskPath = path.join(this.agentPaths.tasks, taskName);
    const content = await fs.readFile(taskPath, 'utf8');
    
    const parsed = this.parseTaskFile(content);
    this.cache.set(cacheKey, parsed);
    
    return parsed;
  }

  parseTaskFile(content) {
    const result = {
      title: '',
      purpose: '',
      instructions: [],
      scenarios: [],
      elicitation: false,
      rawContent: content
    };

    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      result.title = titleMatch[1].trim();
    }

    // Check if this is an elicitation task
    if (content.includes('elicitation') || content.includes('Elicitation')) {
      result.elicitation = true;
    }

    // Extract purpose
    const purposeMatch = content.match(/##\s+Purpose\s*\n([\s\S]+?)(?=\n##|$)/);
    if (purposeMatch) {
      result.purpose = purposeMatch[1].trim();
    }

    // Extract instructions
    const instructionsMatch = content.match(/##\s+(?:Task\s+)?Instructions?\s*\n([\s\S]+?)(?=\n##|$)/);
    if (instructionsMatch) {
      result.instructions = this.parseInstructions(instructionsMatch[1]);
    }

    // Extract scenarios
    const scenarioMatches = content.matchAll(/###\s+Scenario\s+\d+:\s*(.+?)\n([\s\S]+?)(?=\n###|\n##|$)/g);
    for (const match of scenarioMatches) {
      result.scenarios.push({
        title: match[1].trim(),
        content: match[2].trim()
      });
    }

    return result;
  }

  parseInstructions(instructionsText) {
    const instructions = [];
    const lines = instructionsText.split('\n');
    let currentInstruction = null;
    let subItems = [];

    for (const line of lines) {
      const mainMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*:?\s*(.*)/);
      const subMatch = line.match(/^\s*[-•]\s+(.+)/);
      
      if (mainMatch) {
        if (currentInstruction) {
          instructions.push({
            ...currentInstruction,
            subItems
          });
        }
        currentInstruction = {
          title: mainMatch[1],
          description: mainMatch[2] || ''
        };
        subItems = [];
      } else if (subMatch && currentInstruction) {
        subItems.push(subMatch[1]);
      } else if (currentInstruction && line.trim()) {
        currentInstruction.description += ' ' + line.trim();
      }
    }

    if (currentInstruction) {
      instructions.push({
        ...currentInstruction,
        subItems
      });
    }

    return instructions;
  }

  async loadChecklist(checklistName) {
    const cacheKey = `checklist:${checklistName}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const checklistPath = path.join(this.agentPaths.checklists, checklistName);
    const content = await fs.readFile(checklistPath, 'utf8');
    
    const parsed = this.parseChecklistFile(content);
    this.cache.set(cacheKey, parsed);
    
    return parsed;
  }

  parseChecklistFile(content) {
    const result = {
      title: '',
      items: [],
      rawContent: content
    };

    // Extract title
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      result.title = titleMatch[1].trim();
    }

    // Extract checklist items
    const itemMatches = content.matchAll(/^\s*[-□]\s+(.+)$/gm);
    for (const match of itemMatches) {
      result.items.push({
        text: match[1].trim(),
        checked: false
      });
    }

    return result;
  }

  async loadTemplate(templateName) {
    const cacheKey = `template:${templateName}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const templatePath = path.join(this.agentPaths.templates, templateName);
    const content = await fs.readFile(templatePath, 'utf8');
    
    const parsed = this.parseTemplateFile(content, templateName);
    this.cache.set(cacheKey, parsed);
    
    return parsed;
  }

  parseTemplateFile(content, filename) {
    const ext = path.extname(filename);
    
    if (ext === '.yaml' || ext === '.yml') {
      return {
        type: 'yaml',
        content: yaml.load(content),
        rawContent: content
      };
    } else {
      return {
        type: 'markdown',
        content: content,
        sections: this.parseMarkdownSections(content)
      };
    }
  }

  parseMarkdownSections(content) {
    const sections = {};
    const lines = content.split('\n');
    let currentSection = 'header';
    let sectionContent = [];

    for (const line of lines) {
      const sectionMatch = line.match(/^#+\s+(.+)$/);
      if (sectionMatch) {
        if (sectionContent.length > 0) {
          sections[currentSection] = sectionContent.join('\n').trim();
        }
        currentSection = sectionMatch[1].toLowerCase().replace(/\s+/g, '-');
        sectionContent = [];
      } else {
        sectionContent.push(line);
      }
    }

    if (sectionContent.length > 0) {
      sections[currentSection] = sectionContent.join('\n').trim();
    }

    return sections;
  }

  async listAgents() {
    try {
      const files = await fs.readdir(this.agentPaths.core);
      return files
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace('.md', ''));
    } catch (error) {
      return [];
    }
  }

  async getAgentMetadata(agentName) {
    const agent = await this.loadAgent(agentName);
    return {
      name: agent.agent?.name || agentName,
      id: agent.agent?.id || agentName,
      title: agent.agent?.title || agent.title,
      icon: agent.agent?.icon || '🤖',
      whenToUse: agent.agent?.whenToUse || '',
      commands: agent.commands || [],
      dependencies: agent.dependencies || {}
    };
  }

  clearCache() {
    this.cache.clear();
  }
}

// CLI interface for testing
if (require.main === module) {
  const loader = new BMADLoader();
  
  const commands = {
    async list() {
      const agents = await loader.listAgents();
      console.log('Available agents:', agents.join(', '));
    },
    
    async load(agentName) {
      const agent = await loader.loadAgent(agentName);
      console.log(JSON.stringify(agent, null, 2));
    },
    
    async metadata(agentName) {
      const metadata = await loader.getAgentMetadata(agentName);
      console.log(JSON.stringify(metadata, null, 2));
    },
    
    async task(taskName) {
      const task = await loader.loadTask(taskName);
      console.log(JSON.stringify(task, null, 2));
    },
    
    async checklist(checklistName) {
      const checklist = await loader.loadChecklist(checklistName);
      console.log(JSON.stringify(checklist, null, 2));
    }
  };

  const [,, command, ...args] = process.argv;
  
  if (commands[command]) {
    commands[command](...args).catch(console.error);
  } else {
    console.log('Usage: bmad-loader.js <command> [args]');
    console.log('Commands:', Object.keys(commands).join(', '));
  }
}

module.exports = BMADLoader;