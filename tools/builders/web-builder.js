const fs = require('node:fs').promises;
const path = require('node:path');
const DependencyResolver = require('../lib/dependency-resolver');
const yamlUtilities = require('../lib/yaml-utils');

class WebBuilder {
  constructor(options = {}) {
    this.rootDir = options.rootDir || process.cwd();
    this.outputDirs = options.outputDirs || [path.join(this.rootDir, 'dist')];
    this.resolver = new DependencyResolver(this.rootDir);
    this.templatePath = path.join(
      this.rootDir,
      'tools',
      'md-assets',
      'web-agent-startup-instructions.md',
    );
  }

  parseYaml(content) {
    const yaml = require('js-yaml');
    return yaml.load(content);
  }

  convertToWebPath(filePath, bundleRoot = 'bmad-core') {
    // Convert absolute paths to web bundle paths with dot prefix
    // All resources get installed under the bundle root, so use that path
    const relativePath = path.relative(this.rootDir, filePath);
    const pathParts = relativePath.split(path.sep);

    let resourcePath;
    if (pathParts[0] === 'expansion-packs') {
      // For expansion packs, remove 'expansion-packs/packname' and use the rest
      resourcePath = pathParts.slice(2).join('/');
    } else {
      // For bmad-core, common, etc., remove the first part
      resourcePath = pathParts.slice(1).join('/');
    }

    return `.${bundleRoot}/${resourcePath}`;
  }

  generateWebInstructions(bundleType, packName = null) {
    // Generate dynamic web instructions based on bundle type
    const rootExample = packName ? `.${packName}` : '.bmad-core';
    const examplePath = packName
      ? `.${packName}/folder/filename.md`
      : '.bmad-core/folder/filename.md';
    const personasExample = packName
      ? `.${packName}/personas/analyst.md`
      : '.bmad-core/personas/analyst.md';
    const tasksExample = packName
      ? `.${packName}/tasks/create-story.md`
      : '.bmad-core/tasks/create-story.md';
    const utilitiesExample = packName
      ? `.${packName}/utils/template-format.md`
      : '.bmad-core/utils/template-format.md';
    const tasksReference = packName
      ? `.${packName}/tasks/create-story.md`
      : '.bmad-core/tasks/create-story.md';

    return `# Web Agent Bundle Instructions

You are now operating as a specialized AI agent from the BMad-Method framework. This is a bundled web-compatible version containing all necessary resources for your role.

## Important Instructions

1. **Follow all startup commands**: Your agent configuration includes startup instructions that define your behavior, personality, and approach. These MUST be followed exactly.

2. **Resource Navigation**: This bundle contains all resources you need. Resources are marked with tags like:

- \`==================== START: ${examplePath} ====================\`
- \`==================== END: ${examplePath} ====================\`

When you need to reference a resource mentioned in your instructions:

- Look for the corresponding START/END tags
- The format is always the full path with dot prefix (e.g., \`${personasExample}\`, \`${tasksExample}\`)
- If a section is specified (e.g., \`{root}/tasks/create-story.md#section-name\`), navigate to that section within the file

**Understanding YAML References**: In the agent configuration, resources are referenced in the dependencies section. For example:

\`\`\`yaml
dependencies:
  utils:
    - template-format
  tasks:
    - create-story
\`\`\`

These references map directly to bundle sections:

- \`utils: template-format\` → Look for \`==================== START: ${utilitiesExample} ====================\`
- \`tasks: create-story\` → Look for \`==================== START: ${tasksReference} ====================\`

3. **Execution Context**: You are operating in a web environment. All your capabilities and knowledge are contained within this bundle. Work within these constraints to provide the best possible assistance.

4. **Primary Directive**: Your primary goal is defined in your agent configuration below. Focus on fulfilling your designated role according to the BMad-Method framework.

---

`;
  }

  async cleanOutputDirs() {
    for (const dir of this.outputDirs) {
      try {
        await fs.rm(dir, { recursive: true, force: true });
        console.log(`Cleaned: ${path.relative(this.rootDir, dir)}`);
      } catch (error) {
        console.debug(`Failed to clean directory ${dir}:`, error.message);
        // Directory might not exist, that's fine
      }
    }
  }

  async buildAgents() {
    const agents = await this.resolver.listAgents();

    for (const agentId of agents) {
      console.log(`  Building agent: ${agentId}`);
      const bundle = await this.buildAgentBundle(agentId);

      // Write to all output directories
      for (const outputDir of this.outputDirs) {
        const outputPath = path.join(outputDir, 'agents');
        await fs.mkdir(outputPath, { recursive: true });
        const outputFile = path.join(outputPath, `${agentId}.txt`);
        await fs.writeFile(outputFile, bundle, 'utf8');
      }
    }

    console.log(`Built ${agents.length} agent bundles in ${this.outputDirs.length} locations`);
  }

  async buildTeams() {
    const teams = await this.resolver.listTeams();

    for (const teamId of teams) {
      console.log(`  Building team: ${teamId}`);
      const bundle = await this.buildTeamBundle(teamId);

      // Write to all output directories
      for (const outputDir of this.outputDirs) {
        const outputPath = path.join(outputDir, 'teams');
        await fs.mkdir(outputPath, { recursive: true });
        const outputFile = path.join(outputPath, `${teamId}.txt`);
        await fs.writeFile(outputFile, bundle, 'utf8');
      }
    }

    console.log(`Built ${teams.length} team bundles in ${this.outputDirs.length} locations`);
  }

  async buildAgentBundle(agentId) {
    const dependencies = await this.resolver.resolveAgentDependencies(agentId);
    const template = this.generateWebInstructions('agent');

    const sections = [template];

    // Add agent configuration
    let agentContent = await fs.readFile(path.join(packDir, 'agents', `.md`), 'utf8');

    if (language) {
      const yaml = require('js-yaml');
      const yamlContent = yamlUtilities.extractYamlFromAgent(agentContent);
      if (yamlContent) {
        const agentConfig = yaml.load(yamlContent);
        if (!agentConfig['activation-instructions']) {
          agentConfig['activation-instructions'] = [];
        }
        agentConfig['activation-instructions'].push(`You must reply in .`);
        const newYamlContent = yaml.dump(agentConfig);
        agentContent = agentContent.replace(yamlContent, newYamlContent);
      }
    }

    const agentPath = path.join(packDir, 'agents', `.md`);
    const agentWebPath = this.convertToWebPath(agentPath, packName);
    sections.push(this.formatSection(agentWebPath, agentContent, packName));

    // Resolve and add agent dependencies
    const yamlContent = yamlUtilities.extractYamlFromAgent(agentContent);
    if (yamlContent) {
      try {
        const yaml = require('js-yaml');
        const agentConfig = yaml.load(yamlContent);

        if (agentConfig.dependencies) {
          // Add resources, first try expansion pack, then core
          for (const [resourceType, resources] of Object.entries(agentConfig.dependencies)) {
            if (Array.isArray(resources)) {
              for (const resourceName of resources) {
                let found = false;

                // Try expansion pack first
                const resourcePath = path.join(packDir, resourceType, resourceName);
                try {
                  const resourceContent = await fs.readFile(resourcePath, 'utf8');
                  const resourceWebPath = this.convertToWebPath(resourcePath, packName);
                  sections.push(this.formatSection(resourceWebPath, resourceContent, packName));
                  found = true;
                } catch {
                  // Not in expansion pack, continue
                }

                // If not found in expansion pack, try core
                if (!found) {
                  const corePath = path.join(this.rootDir, 'bmad-core', resourceType, resourceName);
                  try {
                    const coreContent = await fs.readFile(corePath, 'utf8');
                    const coreWebPath = this.convertToWebPath(corePath, packName);
                    sections.push(this.formatSection(coreWebPath, coreContent, packName));
                    found = true;
                  } catch {
                    // Not in core either, continue
                  }
                }

                // If not found in core, try common folder
                if (!found) {
                  const commonPath = path.join(this.rootDir, 'common', resourceType, resourceName);
                  try {
                    const commonContent = await fs.readFile(commonPath, 'utf8');
                    const commonWebPath = this.convertToWebPath(commonPath, packName);
                    sections.push(this.formatSection(commonWebPath, commonContent, packName));
                    found = true;
                  } catch {
                    // Not in common either, continue
                  }
                }

                if (!found) {
                  console.warn(
                    `    ⚠ Dependency ${resourceType}#${resourceName} not found in expansion pack or core`,
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        console.debug(`Failed to parse agent YAML for ${agentName}:`, error.message);
      }
    }

    return sections.join('\n');
  }

  async buildExpansionTeamBundle(packName, packDir, teamConfigPath, language = null) {
    const template = this.generateWebInstructions('expansion-team', packName);

    const sections = [template];

    // Add team configuration and parse to get agent list
    const teamContent = await fs.readFile(teamConfigPath, 'utf8');
    const teamFileName = path.basename(teamConfigPath, '.yaml');
    const teamConfig = this.parseYaml(teamContent);
    const teamWebPath = this.convertToWebPath(teamConfigPath, packName);
    sections.push(this.formatSection(teamWebPath, teamContent, packName));

    // Get list of expansion pack agents
    const expansionAgents = new Set();
    const agentsDir = path.join(packDir, 'agents');
    try {
      const agentFiles = await fs.readdir(agentsDir);
      for (const agentFile of agentFiles.filter((f) => f.endsWith('.md'))) {
        const agentName = agentFile.replace('.md', '');
        expansionAgents.add(agentName);
      }
    } catch {
      console.warn(`    ⚠ No agents directory found in ${packName}`);
    }

    // Build a map of all available expansion pack resources for override checking
    const expansionResources = new Map();
    const resourceDirectories = ['templates', 'tasks', 'checklists', 'workflows', 'data'];
    for (const resourceDir of resourceDirectories) {
      const resourcePath = path.join(packDir, resourceDir);
      try {
        const resourceFiles = await fs.readdir(resourcePath);
        for (const resourceFile of resourceFiles.filter(
          (f) => f.endsWith('.md') || f.endsWith('.yaml') || f.endsWith('.csv')
        )) {
          const filePath = path.join(resourcePath, resourceFile);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const fileName = resourceFile.replace(/\.(md|yaml)$/, '');

          // Only add if not already included as a dependency
          const resourceKey = `${resourceDir}#${fileName}`;
          if (!allDependencies.has(resourceKey)) {
            const fullResourcePath = path.join(resourcePath, resourceFile);
            const resourceWebPath = this.convertToWebPath(fullResourcePath, packName);
            sections.push(this.formatSection(resourceWebPath, fileContent, packName));
          }
        }
      } catch {
        // Directory might not exist, that's fine
      }
    }

    return sections.join('\n');
  }

  async listExpansionPacks() {
    const expansionPacksDir = path.join(this.rootDir, 'expansion-packs');
    try {
      const entries = await fs.readdir(expansionPacksDir, { withFileTypes: true });
      return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    } catch {
      console.warn('No expansion-packs directory found');
      return [];
    }
  }

  listAgents() {
    return this.resolver.listAgents();
  }
}

module.exports = WebBuilder;
