const path = require("path");
const fileManager = require("./file-manager");
const configLoader = require("./config-loader");

// Dynamic import for ES module
let chalk;

// Initialize ES modules
async function initializeModules() {
  if (!chalk) {
    chalk = (await import("chalk")).default;
  }
}

class IdeSetup {
  async setup(ide, installDir, selectedAgent = null) {
    await initializeModules();
    const ideConfig = await configLoader.getIdeConfiguration(ide);

    if (!ideConfig) {
      console.log(chalk.yellow(`\nNo configuration available for ${ide}`));
      return false;
    }

    switch (ide) {
      case "cursor":
        return this.setupCursor(installDir, selectedAgent);
      case "claude-code":
        return this.setupClaudeCode(installDir, selectedAgent);
      case "windsurf":
        return this.setupWindsurf(installDir, selectedAgent);
      case "roo":
        return this.setupRoo(installDir, selectedAgent);
      case "cline":
        return this.setupCline(installDir, selectedAgent);
      default:
        console.log(chalk.yellow(`\nIDE ${ide} not yet supported`));
        return false;
    }
  }

  async setupCursor(installDir, selectedAgent) {
    const cursorRulesDir = path.join(installDir, ".cursor", "rules");
    const agents = selectedAgent ? [selectedAgent] : await this.getAllAgentIds(installDir);

    await fileManager.ensureDirectory(cursorRulesDir);

    for (const agentId of agents) {
      // Check if .bmad-core is a subdirectory (full install) or if agents are in root (single agent install)
      let agentPath = path.join(installDir, ".bmad-core", "agents", `${agentId}.md`);
      if (!(await fileManager.pathExists(agentPath))) {
        agentPath = path.join(installDir, "agents", `${agentId}.md`);
      }

      if (await fileManager.pathExists(agentPath)) {
        const agentContent = await fileManager.readFile(agentPath);
        const mdcPath = path.join(cursorRulesDir, `${agentId}.mdc`);

        // Create MDC content with proper format
        let mdcContent = "---\n";
        mdcContent += "description: \n";
        mdcContent += "globs: []\n";
        mdcContent += "alwaysApply: false\n";
        mdcContent += "---\n\n";
        mdcContent += `# ${agentId.toUpperCase()} Agent Rule\n\n`;
        mdcContent += `This rule is triggered when the user types \`@${agentId}\` and activates the ${this.getAgentTitle(
          agentId
        )} agent persona.\n\n`;
        mdcContent += "## Agent Activation\n\n";
        mdcContent +=
          "CRITICAL: Read the full YML, start activation to alter your state of being, follow startup section instructions, stay in this being until told to exit this mode:\n\n";
        mdcContent += "```yml\n";
        // Extract just the YAML content from the agent file
        const yamlMatch = agentContent.match(/```ya?ml\n([\s\S]*?)```/);
        if (yamlMatch) {
          mdcContent += yamlMatch[1].trim();
        } else {
          // If no YAML found, include the whole content minus the header
          mdcContent += agentContent.replace(/^#.*$/m, "").trim();
        }
        mdcContent += "\n```\n\n";
        mdcContent += "## File Reference\n\n";
        mdcContent += `The complete agent definition is available in [.bmad-core/agents/${agentId}.md](mdc:.bmad-core/agents/${agentId}.md).\n\n`;
        mdcContent += "## Usage\n\n";
        mdcContent += `When the user types \`@${agentId}\`, activate this ${this.getAgentTitle(
          agentId
        )} persona and follow all instructions defined in the YML configuration above.\n`;

        await fileManager.writeFile(mdcPath, mdcContent);
        console.log(chalk.green(`✓ Created rule: ${agentId}.mdc`));
      }
    }

    console.log(chalk.green(`\n✓ Created Cursor rules in ${cursorRulesDir}`));

    return true;
  }

  async setupClaudeCode(installDir, selectedAgent) {
    const commandsDir = path.join(installDir, ".claude", "commands");
    const agents = selectedAgent ? [selectedAgent] : await this.getAllAgentIds(installDir);

    await fileManager.ensureDirectory(commandsDir);

    for (const agentId of agents) {
      // Check if .bmad-core is a subdirectory (full install) or if agents are in root (single agent install)
      let agentPath = path.join(installDir, ".bmad-core", "agents", `${agentId}.md`);
      if (!(await fileManager.pathExists(agentPath))) {
        agentPath = path.join(installDir, "agents", `${agentId}.md`);
      }
      const commandPath = path.join(commandsDir, `${agentId}.md`);

      if (await fileManager.pathExists(agentPath)) {
        // Create command file with agent content
        const agentContent = await fileManager.readFile(agentPath);

        // Add command header
        let commandContent = `# /${agentId} Command\n\n`;
        commandContent += `When this command is used, adopt the following agent persona:\n\n`;
        commandContent += agentContent;

        await fileManager.writeFile(commandPath, commandContent);
        console.log(chalk.green(`✓ Created command: /${agentId}`));
      }
    }

    console.log(chalk.green(`\n✓ Created Claude Code commands in ${commandsDir}`));

    return true;
  }

  async setupWindsurf(installDir, selectedAgent) {
    const windsurfRulesDir = path.join(installDir, ".windsurf", "rules");
    const agents = selectedAgent ? [selectedAgent] : await this.getAllAgentIds(installDir);

    await fileManager.ensureDirectory(windsurfRulesDir);

    for (const agentId of agents) {
      // Check if .bmad-core is a subdirectory (full install) or if agents are in root (single agent install)
      let agentPath = path.join(installDir, ".bmad-core", "agents", `${agentId}.md`);
      if (!(await fileManager.pathExists(agentPath))) {
        agentPath = path.join(installDir, "agents", `${agentId}.md`);
      }

      if (await fileManager.pathExists(agentPath)) {
        const agentContent = await fileManager.readFile(agentPath);
        const mdPath = path.join(windsurfRulesDir, `${agentId}.md`);

        // Create MD content (similar to Cursor but without frontmatter)
        let mdContent = `# ${agentId.toUpperCase()} Agent Rule\n\n`;
        mdContent += `This rule is triggered when the user types \`@${agentId}\` and activates the ${this.getAgentTitle(
          agentId
        )} agent persona.\n\n`;
        mdContent += "## Agent Activation\n\n";
        mdContent +=
          "CRITICAL: Read the full YML, start activation to alter your state of being, follow startup section instructions, stay in this being until told to exit this mode:\n\n";
        mdContent += "```yml\n";
        // Extract just the YAML content from the agent file
        const yamlMatch = agentContent.match(/```ya?ml\n([\s\S]*?)```/);
        if (yamlMatch) {
          mdContent += yamlMatch[1].trim();
        } else {
          // If no YAML found, include the whole content minus the header
          mdContent += agentContent.replace(/^#.*$/m, "").trim();
        }
        mdContent += "\n```\n\n";
        mdContent += "## File Reference\n\n";
        mdContent += `The complete agent definition is available in [.bmad-core/agents/${agentId}.md](.bmad-core/agents/${agentId}.md).\n\n`;
        mdContent += "## Usage\n\n";
        mdContent += `When the user types \`@${agentId}\`, activate this ${this.getAgentTitle(
          agentId
        )} persona and follow all instructions defined in the YML configuration above.\n`;

        await fileManager.writeFile(mdPath, mdContent);
        console.log(chalk.green(`✓ Created rule: ${agentId}.md`));
      }
    }

    console.log(chalk.green(`\n✓ Created Windsurf rules in ${windsurfRulesDir}`));

    return true;
  }

  async getAllAgentIds(installDir) {
    // Check if .bmad-core is a subdirectory (full install) or if agents are in root (single agent install)
    let agentsDir = path.join(installDir, ".bmad-core", "agents");
    if (!(await fileManager.pathExists(agentsDir))) {
      agentsDir = path.join(installDir, "agents");
    }

    const glob = require("glob");
    const agentFiles = glob.sync("*.md", { cwd: agentsDir });
    return agentFiles.map((file) => path.basename(file, ".md"));
  }

  getAgentTitle(agentId) {
    const agentTitles = {
      analyst: "Business Analyst",
      architect: "Solution Architect",
      "bmad-master": "BMAD Master",
      "bmad-orchestrator": "BMAD Orchestrator",
      dev: "Developer",
      pm: "Product Manager",
      po: "Product Owner",
      qa: "QA Specialist",
      sm: "Scrum Master",
      "ux-expert": "UX Expert",
    };
    return agentTitles[agentId] || agentId;
  }

  async setupRoo(installDir, selectedAgent) {
    const agents = selectedAgent ? [selectedAgent] : await this.getAllAgentIds(installDir);

    // Check for existing .roomodes file in project root
    const roomodesPath = path.join(installDir, ".roomodes");
    let existingModes = [];
    let existingContent = "";

    if (await fileManager.pathExists(roomodesPath)) {
      existingContent = await fileManager.readFile(roomodesPath);
      // Parse existing modes to avoid duplicates
      const modeMatches = existingContent.matchAll(/- slug: ([\w-]+)/g);
      for (const match of modeMatches) {
        existingModes.push(match[1]);
      }
      console.log(chalk.yellow(`Found existing .roomodes file with ${existingModes.length} modes`));
    }

    // Create new modes content
    let newModesContent = "";

    // Define file permissions for each agent type
    const agentPermissions = {
      analyst: {
        fileRegex: "\\.(md|txt)$",
        description: "Documentation and text files",
      },
      pm: {
        fileRegex: "\\.(md|txt)$",
        description: "Product documentation",
      },
      architect: {
        fileRegex: "\\.(md|txt|yml|yaml|json)$",
        description: "Architecture docs and configs",
      },
      dev: null, // Full edit access
      qa: {
        fileRegex: "\\.(test|spec)\\.(js|ts|jsx|tsx)$|\\.md$",
        description: "Test files and documentation",
      },
      "ux-expert": {
        fileRegex: "\\.(md|css|scss|html|jsx|tsx)$",
        description: "Design-related files",
      },
      po: {
        fileRegex: "\\.(md|txt)$",
        description: "Story and requirement docs",
      },
      sm: {
        fileRegex: "\\.(md|txt)$",
        description: "Process and planning docs",
      },
      "bmad-orchestrator": null, // Full edit access
      "bmad-master": null, // Full edit access
    };

    for (const agentId of agents) {
      // Skip if already exists
      if (existingModes.includes(`bmad-${agentId}`)) {
        console.log(chalk.dim(`Skipping ${agentId} - already exists in .roomodes`));
        continue;
      }

      // Read agent file to extract all information
      let agentPath = path.join(installDir, ".bmad-core", "agents", `${agentId}.md`);
      if (!(await fileManager.pathExists(agentPath))) {
        agentPath = path.join(installDir, "agents", `${agentId}.md`);
      }

      if (await fileManager.pathExists(agentPath)) {
        const agentContent = await fileManager.readFile(agentPath);

        // Extract YAML content
        const yamlMatch = agentContent.match(/```ya?ml\n([\s\S]*?)```/);
        if (yamlMatch) {
          const yaml = yamlMatch[1];

          // Extract agent info from YAML
          const titleMatch = yaml.match(/title:\s*(.+)/);
          const iconMatch = yaml.match(/icon:\s*(.+)/);
          const whenToUseMatch = yaml.match(/whenToUse:\s*"(.+)"/);
          const roleDefinitionMatch = yaml.match(/roleDefinition:\s*"(.+)"/);

          const title = titleMatch ? titleMatch[1].trim() : this.getAgentTitle(agentId);
          const icon = iconMatch ? iconMatch[1].trim() : "🤖";
          const whenToUse = whenToUseMatch ? whenToUseMatch[1].trim() : `Use for ${title} tasks`;
          const roleDefinition = roleDefinitionMatch
            ? roleDefinitionMatch[1].trim()
            : `You are a ${title} specializing in ${title.toLowerCase()} tasks and responsibilities.`;

          // Build mode entry with proper formatting (matching exact indentation)
          newModesContent += ` - slug: bmad-${agentId}\n`;
          newModesContent += `   name: '${icon} ${title}'\n`;
          newModesContent += `   roleDefinition: ${roleDefinition}\n`;
          newModesContent += `   whenToUse: ${whenToUse}\n`;
          newModesContent += `   customInstructions: CRITICAL Read the full YML from .bmad-core/agents/${agentId}.md start activation to alter your state of being follow startup section instructions stay in this being until told to exit this mode\n`;
          newModesContent += `   groups:\n`;
          newModesContent += `    - read\n`;

          // Add permissions based on agent type
          const permissions = agentPermissions[agentId];
          if (permissions) {
            newModesContent += `    - - edit\n`;
            newModesContent += `      - fileRegex: ${permissions.fileRegex}\n`;
            newModesContent += `        description: ${permissions.description}\n`;
          } else {
            newModesContent += `    - edit\n`;
          }

          console.log(chalk.green(`✓ Added mode: bmad-${agentId} (${icon} ${title})`));
        }
      }
    }

    // Build final roomodes content
    let roomodesContent = "";
    if (existingContent) {
      // If there's existing content, append new modes to it
      roomodesContent = existingContent.trim() + "\n" + newModesContent;
    } else {
      // Create new .roomodes file with proper YAML structure
      roomodesContent = "customModes:\n" + newModesContent;
    }

    // Write .roomodes file
    await fileManager.writeFile(roomodesPath, roomodesContent);
    console.log(chalk.green("✓ Created .roomodes file in project root"));

    console.log(chalk.green(`\n✓ Roo Code setup complete!`));
    console.log(chalk.dim("Custom modes will be available when you open this project in Roo Code"));

    return true;
  }

  async setupCline(installDir, selectedAgent) {
    const clineRulesDir = path.join(installDir, ".clinerules");
    const agents = selectedAgent ? [selectedAgent] : await this.getAllAgentIds(installDir);

    await fileManager.ensureDirectory(clineRulesDir);

    // Define agent order for numeric prefixes
    const agentOrder = {
      'bmad-master': 1,
      'bmad-orchestrator': 2,
      'pm': 3,
      'analyst': 4,
      'architect': 5,
      'po': 6,
      'sm': 7,
      'dev': 8,
      'qa': 9,
      'ux-expert': 10
    };

    for (const agentId of agents) {
      // Check if .bmad-core is a subdirectory (full install) or if agents are in root (single agent install)
      let agentPath = path.join(installDir, ".bmad-core", "agents", `${agentId}.md`);
      if (!(await fileManager.pathExists(agentPath))) {
        agentPath = path.join(installDir, "agents", `${agentId}.md`);
      }

      if (await fileManager.pathExists(agentPath)) {
        const agentContent = await fileManager.readFile(agentPath);

        // Get numeric prefix for ordering
        const order = agentOrder[agentId] || 99;
        const prefix = order.toString().padStart(2, '0');
        const mdPath = path.join(clineRulesDir, `${prefix}-${agentId}.md`);

        // Create MD content for Cline (focused on project standards and role)
        let mdContent = `# ${this.getAgentTitle(agentId)} Agent\n\n`;
        mdContent += `This rule defines the ${this.getAgentTitle(agentId)} persona and project standards.\n\n`;
        mdContent += "## Role Definition\n\n";
        mdContent +=
          "When the user types `@" + agentId + "`, adopt this persona and follow these guidelines:\n\n";
        mdContent += "```yml\n";
        // Extract just the YAML content from the agent file
        const yamlMatch = agentContent.match(/```ya?ml\n([\s\S]*?)```/);
        if (yamlMatch) {
          mdContent += yamlMatch[1].trim();
        } else {
          // If no YAML found, include the whole content minus the header
          mdContent += agentContent.replace(/^#.*$/m, "").trim();
        }
        mdContent += "\n```\n\n";
        mdContent += "## Project Standards\n\n";
        mdContent += `- Always maintain consistency with project documentation in .bmad-core/\n`;
        mdContent += `- Follow the agent's specific guidelines and constraints\n`;
        mdContent += `- Update relevant project files when making changes\n`;
        mdContent += `- Reference the complete agent definition in [.bmad-core/agents/${agentId}.md](.bmad-core/agents/${agentId}.md)\n\n`;
        mdContent += "## Usage\n\n";
        mdContent += `Type \`@${agentId}\` to activate this ${this.getAgentTitle(agentId)} persona.\n`;

        await fileManager.writeFile(mdPath, mdContent);
        console.log(chalk.green(`✓ Created rule: ${prefix}-${agentId}.md`));
      }
    }

    console.log(chalk.green(`\n✓ Created Cline rules in ${clineRulesDir}`));

    return true;
  }
}

module.exports = new IdeSetup();
