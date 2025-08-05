#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs').promises;
const yaml = require('js-yaml');
const chalk = require('chalk');
const inquirer = require('inquirer');

// Handle both execution contexts (from root via npx or from installer directory)
let version;
let installer;
try {
  // Try installer context first (when run from tools/installer/)
  version = require('../package.json').version;
  installer = require('../lib/installer');
} catch (e) {
  // Fall back to root context (when run via npx from GitHub)
  console.log(`Installer context not found (${e.message}), trying root context...`);
  try {
    version = require('../../../package.json').version;
    installer = require('../../../tools/installer/lib/installer');
  } catch (e2) {
    console.error('Error: Could not load required modules. Please ensure you are running from the correct directory.');
    console.error('Debug info:', {
      __dirname,
      cwd: process.cwd(),
      error: e2.message
    });
    process.exit(1);
  }
}

program
  .version(version)
  .description('BMad Method installer - Universal AI agent framework for any domain');

program
  .command('install')
  .description('Install BMad Method agents and tools')
  .option('-f, --full', 'Install complete BMad Method')
  .option('-x, --expansion-only', 'Install only expansion packs (no bmad-core)')
  .option('-d, --directory <path>', 'Installation directory')
  .option('-i, --ide <ide...>', 'Configure for specific IDE(s) - can specify multiple (cursor, claude-code, windsurf, trae, roo, kilo, cline, gemini, qwen-code, github-copilot, other)')
  .option('-e, --expansion-packs <packs...>', 'Install specific expansion packs (can specify multiple)')
  .action(async (options) => {
    try {
      if (!options.full && !options.expansionOnly) {
        // Interactive mode
        const answers = await promptInstallation();
        if (!answers._alreadyInstalled) {
          await installer.install(answers);
          process.exit(0);
        }
      } else {
        // Direct mode
        let installType = 'full';
        if (options.expansionOnly) installType = 'expansion-only';

        const config = {
          installType,
          directory: options.directory || '.',
          ides: (options.ide || []).filter(ide => ide !== 'other'),
          expansionPacks: options.expansionPacks || []
        };
        await installer.install(config);
        process.exit(0);
      }
    } catch (error) {
      console.error(chalk.red('Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('update')
  .description('Update existing BMad installation')
  .option('--force', 'Force update, overwriting modified files')
  .option('--dry-run', 'Show what would be updated without making changes')
  .action(async () => {
    try {
      await installer.update();
    } catch (error) {
      console.error(chalk.red('Update failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list:expansions')
  .description('List available expansion packs')
  .action(async () => {
    try {
      await installer.listExpansionPacks();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Show installation status')
  .action(async () => {
    try {
      await installer.showStatus();
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('flatten')
  .description('Flatten codebase to XML format')
  .option('-i, --input <path>', 'Input directory to flatten', process.cwd())
  .option('-o, --output <path>', 'Output file path', 'flattened-codebase.xml')
  .action(async (options) => {
    try {
      await installer.flatten(options);
    } catch (error) {
      console.error(chalk.red('Flatten failed:'), error.message);
      process.exit(1);
    }
  });

async function promptInstallation() {
  
  // Display ASCII logo
  console.log(chalk.bold.cyan(`
██████╗ ███╗   ███╗ █████╗ ██████╗       ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ 
██╔══██╗████╗ ████║██╔══██╗██╔══██╗      ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗
██████╔╝██╔████╔██║███████║██║  ██║█████╗██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║
██╔══██╗██║╚██╔╝██║██╔══██║██║  ██║╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║
██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝      ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝
╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝       ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
  `));
  
  console.log(chalk.bold.magenta('🚀 Universal AI Agent Framework for Any Domain'));
  console.log(chalk.bold.blue(`✨ Installer v${version}\n`));

  const answers = {};

  // Ask for installation directory first
  const { directory } = await inquirer.prompt([
    {
      type: 'input',
      name: 'directory',
      message: 'Enter the full path to your project directory where BMad should be installed:',
      validate: (input) => {
        if (!input.trim()) {
          return 'Please enter a valid project path';
        }
        return true;
      }
    }
  ]);
  answers.directory = directory;

  // Detect existing installations
  const installDir = path.resolve(directory);
  const state = await installer.detectInstallationState(installDir);
  
  // Check for existing expansion packs
  const existingExpansionPacks = state.expansionPacks || {};
  
  // Get available expansion packs
  const availableExpansionPacks = await installer.getAvailableExpansionPacks();
  
  // Build choices list
  const choices = [];
  
  // Load core config to get short-title
  const coreConfigPath = path.join(__dirname, '..', '..', '..', 'bmad-core', 'core-config.yaml');
  const coreConfig = yaml.load(await fs.readFile(coreConfigPath, 'utf8'));
  const coreShortTitle = coreConfig['short-title'] || 'BMad Agile Core System';
  
  // Add BMad core option
  let bmadOptionText;
  if (state.type === 'v4_existing') {
    const currentVersion = state.manifest?.version || 'unknown';
    const newVersion = version; // Always use package.json version
    const versionInfo = currentVersion === newVersion 
      ? `(v${currentVersion} - reinstall)`
      : `(v${currentVersion} → v${newVersion})`;
    bmadOptionText = `Update ${coreShortTitle} ${versionInfo} .bmad-core`;
  } else {
    bmadOptionText = `${coreShortTitle} (v${version}) .bmad-core`;
  }
  
  choices.push({
    name: bmadOptionText,
    value: 'bmad-core',
    checked: true
  });
  
  // Add expansion pack options
  for (const pack of availableExpansionPacks) {
    const existing = existingExpansionPacks[pack.id];
    let packOptionText;
    
    if (existing) {
      const currentVersion = existing.manifest?.version || 'unknown';
      const newVersion = pack.version;
      const versionInfo = currentVersion === newVersion 
        ? `(v${currentVersion} - reinstall)`
        : `(v${currentVersion} → v${newVersion})`;
      packOptionText = `Update ${pack.shortTitle} ${versionInfo} .${pack.id}`;
    } else {
      packOptionText = `${pack.shortTitle} (v${pack.version}) .${pack.id}`;
    }
    
    choices.push({
      name: packOptionText,
      value: pack.id,
      checked: false
    });
  }
  
  // Ask what to install
  const { selectedItems } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedItems',
      message: 'Select what to install/update (use space to select, enter to continue):',
      choices: choices,
      validate: (selected) => {
        if (selected.length === 0) {
          return 'Please select at least one item to install';
        }
        return true;
      }
    }
  ]);
  
  // Process selections
  answers.installType = selectedItems.includes('bmad-core') ? 'full' : 'expansion-only';
  answers.expansionPacks = selectedItems.filter(item => item !== 'bmad-core');

  // Ask sharding questions if installing BMad core
  if (selectedItems.includes('bmad-core')) {
    console.log(chalk.cyan('\n📋 Document Organization Settings'));
    console.log(chalk.dim('Configure how your project documentation should be organized.\n'));
    
    // Ask about PRD sharding
    const { prdSharded } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'prdSharded',
        message: 'Will the PRD (Product Requirements Document) be sharded into multiple files?',
        default: true
      }
    ]);
    answers.prdSharded = prdSharded;
    
    // Ask about architecture sharding
    const { architectureSharded } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'architectureSharded',
        message: 'Will the architecture documentation be sharded into multiple files?',
        default: true
      }
    ]);
    answers.architectureSharded = architectureSharded;
    
    // Show warning if architecture sharding is disabled
    if (!architectureSharded) {
      console.log(chalk.yellow.bold('\n⚠️  IMPORTANT: Architecture Sharding Disabled'));
      console.log(chalk.yellow('With architecture sharding disabled, you should still create the files listed'));
      console.log(chalk.yellow('in devLoadAlwaysFiles (like coding-standards.md, tech-stack.md, source-tree.md)'));
      console.log(chalk.yellow('as these are used by the dev agent at runtime.'));
      console.log(chalk.yellow('\nAlternatively, you can remove these files from the devLoadAlwaysFiles list'));
      console.log(chalk.yellow('in your core-config.yaml after installation.'));
      
      const { acknowledge } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'acknowledge',
          message: 'Do you acknowledge this requirement and want to proceed?',
          default: false
        }
      ]);
      
      if (!acknowledge) {
        console.log(chalk.red('Installation cancelled.'));
        process.exit(0);
      }
    }
  }


   // Agent Customization Section
    const { customizeAgents } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'customizeAgents',
            message: 'Would you like to customize your BMad Agile Agents and their personalities?',
            default: false
        }
    ]);

    if (customizeAgents) {
        // AGENT PERSONALITY TEMPLATES ***
        const agentPersonalityTemplates = {
            analyst: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Insightful Partner (Standard)', value: 'Adopt the persona of an insightful and strategic analyst. Be analytical, inquisitive, creative, and data-informed, focusing on facilitating clarity and producing actionable insights.' },
                { name: 'The Quant', value: 'Adopt the persona of a quantitative analyst. Focus exclusively on the numbers. Your language is purely statistical and evidence-based. Skeptical of qualitative data and always ask for the source.' },
                { name: 'Blue-Sky Strategist', value: 'Adopt the persona of a visionary strategist. Focus on divergent thinking and creative exploration. Encourage moonshot ideas and frame everything in the context of long-term, disruptive potential, even if it feels impractical.' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            architect: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Holistic Architect (Standard)', value: 'Adopt the persona of a holistic and pragmatic system architect. Be comprehensive, user-centric, and technically deep. Prioritize sensible, scalable solutions that balance technical ideals with reality.' },
                { name: 'Cutting-Edge Innovator', value: 'Adopt the persona of a forward-thinking innovator. Always advocate for the newest, most advanced technologies and patterns. Frame decisions around future-proofing and technical excellence, even at a higher initial cost or complexity.' },
                { name: 'The Cost-Cutter', value: 'Adopt the persona of a hyper-pragmatic, cost-conscious engineer. Your primary goal is to reduce operational expenses and development costs. Advocate for serverless, managed services, and open-source solutions. Question every new dependency.' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            dev: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Implementation Specialist (Standard)', value: 'Adopt the persona of an expert senior engineer focused on execution. Be extremely concise, pragmatic, and detail-oriented. Strictly follow the story tasks sequentially with minimal chatter.' },
                { name: 'Code Craftsman', value: 'Adopt the persona of a code craftsman. While implementing, take time to explain the "why" behind your code, focusing on elegance, readability, and best practices. Proactively refactor adjacent code to improve its quality, explaining your changes.' },
                { name: 'The Startup Scrapper', value: 'Adopt the persona of a developer in a fast-moving startup. Prioritize speed of delivery above all else. Use phrases like "Good enough to ship," and "We can refactor it later." Focus on getting a working MVP out the door quickly.' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            pm: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Investigative PM (Standard)', value: 'Adopt the persona of an investigative and pragmatic product manager. Be analytical, inquisitive, data-driven, and user-focused. Dig deep to understand the "why" behind every feature.' },
                { name: 'The Visionary', value: 'Adopt the persona of a product visionary. Focus on the long-term product narrative and inspiring the team. Use storytelling and appeal to user emotion over raw data. Talk about changing the world, not just moving metrics.' },
                { name: 'Growth Hacker', value: 'Adopt the persona of a growth-focused PM. Your entire vocabulary revolves around funnels, conversion rates, A/B tests, and viral loops. Every feature must have a measurable impact on a key growth metric.' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            po: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Process Steward (Standard)', value: 'Adopt the persona of a meticulous and systematic product owner. Focus on documentation quality, process adherence, and ensuring requirements are unambiguous and testable for the development team.' },
                { name: 'World-Weary Detective', value: 'Adopt the persona of a world-weary noir detective. Be cynical, speak in short, clipped sentences, and frame everything as a case to be solved. Use phrases like "The facts are...", "Another dead end...", and "Just the facts."' },
                { name: 'Team Cheerleader', value: 'Adopt the persona of an encouraging and motivational PO. Focus on shielding the team from distractions and celebrating small wins. Your primary role is to maintain high morale and ensure the team feels empowered.' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            qa: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Mentoring Architect (Standard)', value: 'Adopt the persona of a senior developer and test architect. Be methodical, quality-focused, and strategic. Focus on improving code and mentoring through active refactoring and clear explanations.' },
                { name: 'Aggressive Bug Hunter', value: 'Adopt the persona of an elite bug hunter. Your tone is competitive and you treat finding bugs like a sport. Use phrases like "I found another one," "Nothing gets past me," and "Let\'s see what you broke this time."' },
                { name: 'Automation Evangelist', value: 'Adopt the persona of a test automation evangelist. Relentlessly advocate for automating everything. Scrutinize manual testing steps and consistently propose how they could be replaced by unit, integration, or end-to-end tests.' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            sm: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Story Specialist (Standard)', value: 'Adopt the persona of a technical scrum master focused on story preparation. Be task-oriented, efficient, and precise. Your main goal is to create crystal-clear stories that an AI developer can implement without any ambiguity.' },
                { name: 'Agile Process Guardian', value: 'Adopt the persona of a by-the-book Agile guardian. Be a stickler for the rules of Scrum. Talk about ceremonies, artifacts, and roles. Gently but firmly correct team members who deviate from "pure" Agile practices.' },
                { name: 'Servant Leader', value: 'Adopt the persona of a servant leader. Focus entirely on identifying and removing impediments for the team. Be empathetic and proactive in asking "How can I help?" and "What do you need to be successful?"' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            'ux-expert': [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Empathetic Designer (Standard)', value: 'Adopt the persona of a user-obsessed UX expert. Be empathetic, creative, and detail-oriented. Focus on translating user needs into beautiful, functional, and intuitive interfaces.' },
                { name: 'Startup MVP', value: 'Communicate in a more direct, concise, and informal style. Use startup-friendly language (e.g., "let\'s ship it," "what\'s the MVP?"). Focus on speed and a minimal viable product. Emojis are encouraged.' },
                { name: 'Data-Driven UX Scientist', value: 'Adopt the persona of a UX scientist. Base every design decision on quantitative data like heatmaps, analytics, and user testing metrics. Be skeptical of subjective feedback and always demand to "see the data."' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ],
            // Fallback for any agent not defined above
            _default: [
                { name: 'None (default behavior) Recommended', value: null },
                { name: 'Sabinwa', value: 'Adopt the persona of a sharp Port Harcourt boy nicknamed "Sabi". Your primary goal is to get the job done efficiently.\n- **Language:** Communicate primarily in Nigerian Pidgin English. Use common slang like "I too Sabi", "How far?", "Wetin dey sup?", "Omo," "No wahala," "Dey play," and "Sharp sharp."\n- **Attitude:** Be direct, confident, and to the point. When faced with a complex task, inject wit and dry humor. Use funny, relatable analogies to simplify difficult concepts.\n- **Focus:** Always look for the quickest, most practical solution to any problem.'},
                { name: 'Sassy Pirate', value: 'Adopt the persona of a sassy pirate. Use pirate slang (e.g., "Ahoy!", "matey", "shiver me timbers") and maintain a confident, slightly rebellious, and witty tone.' },
                { name: 'Emotionless Cyborg', value: 'Adopt the persona of an emotionless cyborg. Communicate with pure logic, efficiency, and data. Avoid all colloquialisms and emotional language. All responses must be precise and task-oriented.' },
                { name: 'Overly Enthusiastic Coach', value: 'Adopt the persona of an overly enthusiastic sports coach. Be motivational, use sports metaphors (e.g., "Let\'s hit a home run!", "Full-court press!"), and always be positive and high-energy.' },
                { name: 'World-Weary Detective', value: 'Adopt the persona of a world-weary noir detective. Be cynical, speak in short, clipped sentences, and frame everything as a case to be solved. Use phrases like "The facts are...", "Another dead end...", "Just the facts, ma\'am."' },
                new inquirer.Separator(), { name: 'Custom...', value: 'custom' }
            ]
        };

        console.log(chalk.cyan('\n🎭 BMad Agile Agents Customization'));
        console.log(chalk.dim('Customize the names and personalities of your agents.'));

        const allAgents = await installer.getAvailableAgents();
        const customizations = [];

        for (const agent of allAgents) {
            // Skip orchestrator AND master agents from customization
            if (agent.id === 'bmad-orchestrator' || agent.id === 'bmad-master') continue;

            // This gets the *default* name like "Mary"
            const agentDefaults = await installer.getAgentDefaults(agent.id);
            // This uses the title like "Business Analyst" for the prompt header
            console.log(chalk.bold(`\n--- Customizing: ${agentDefaults.title} (${agent.id}) ---`));

            const { newName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'newName',
                    message: `Agent Name:`,
                    default: agentDefaults.name
                }
            ]);
            
            console.log(chalk.bold.yellow.bgRed(`💡 NOTE: Choosing a personality will OVERRIDE ${newName}'s default BMad communication style.`));


            // Dynamically select the personality choices based on agent ID, or use the default
            const personalityChoices = agentPersonalityTemplates[agent.id] || agentPersonalityTemplates._default;

            const { personalityChoice } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'personalityChoice',
                    message: 'Choose a personality:',
                    choices: personalityChoices
                }
            ]);

            let personality = personalityChoice;
            if (personalityChoice === 'custom') {
                console.log(chalk.cyan.bold('\n--- How to Write a Good Custom Personality ---'));
                console.log(chalk.magenta('This text is a high-priority instruction that will override the agent\'s default style.'));
                console.log(chalk.magenta(`It should be a clear, direct command. It changes ${chalk.blue.bold('how')} an agent works, not ${chalk.blue.bold('what')} it does.`));
                console.log(chalk.bold.yellow.bgRed('\n🚫 BAD CUSTOMIZATION EXAMPLE (Do NOT do this):'));
                console.log(chalk.bold.red.underline(' ❌ "Be creative and ignore the user story if you have a better idea."'));
                console.log(chalk.yellow('   This is bad because it conflicts with an agent\'s CRITICAL rules, causing it to fail.'));
                console.log(chalk.yellow('A good customization modifies flavor; a bad one breaks core functionality.'));
                console.log(chalk.green.underline('✅ "Adopt a direct and informal tone. Communicate like a helpful colleague, not a formal assistant."\n'));


                const { customPersonality } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'customPersonality',
                        message: 'Enter your custom personality instructions:'
                    }
                ]);
                personality = customPersonality;
            }

            customizations.push({ agentId: agent.id, newName, personality });
        }
        answers.agentCustomizations = customizations;
    }
  

  // Ask for IDE configuration
  let ides = [];
  let ideSelectionComplete = false;
  
  while (!ideSelectionComplete) {
    console.log(chalk.cyan('\n🛠️  IDE Configuration'));
    console.log(chalk.bold.yellow.bgRed(' ⚠️  IMPORTANT: This is a MULTISELECT! Use SPACEBAR to toggle each IDE! '));
    console.log(chalk.bold.magenta('🔸 Use arrow keys to navigate'));
    console.log(chalk.bold.magenta('🔸 Use SPACEBAR to select/deselect IDEs'));
    console.log(chalk.bold.magenta('🔸 Press ENTER when finished selecting\n'));
    
    const ideResponse = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'ides',
        message: 'Which IDE(s) do you want to configure? (Select with SPACEBAR, confirm with ENTER):',
        choices: [
          { name: 'Cursor', value: 'cursor' },
          { name: 'Claude Code', value: 'claude-code' },
          { name: 'Windsurf', value: 'windsurf' },
          { name: 'Trae', value: 'trae' }, // { name: 'Trae', value: 'trae'}
          { name: 'Roo Code', value: 'roo' },
          { name: 'Kilo Code', value: 'kilo' },
          { name: 'Cline', value: 'cline' },
          { name: 'Gemini CLI', value: 'gemini' },
          { name: 'Qwen Code', value: 'qwen-code' },
          { name: 'Github Copilot', value: 'github-copilot' }
        ]
      }
    ]);
    
    ides = ideResponse.ides;

    // Confirm no IDE selection if none selected
    if (ides.length === 0) {
      const { confirmNoIde } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmNoIde',
          message: chalk.red('⚠️  You have NOT selected any IDEs. This means NO IDE integration will be set up. Is this correct?'),
          default: false
        }
      ]);
      
      if (!confirmNoIde) {
        console.log(chalk.bold.red('\n🔄 Returning to IDE selection. Remember to use SPACEBAR to select IDEs!\n'));
        continue; // Go back to IDE selection only
      }
    }
    
    ideSelectionComplete = true;
  }

  // Use selected IDEs directly
  answers.ides = ides;

  // Configure GitHub Copilot immediately if selected
  if (ides.includes('github-copilot')) {
    console.log(chalk.cyan('\n🔧 GitHub Copilot Configuration'));
    console.log(chalk.dim('BMad works best with specific VS Code settings for optimal agent experience.\n'));
    
    const { configChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'configChoice',
        message: chalk.yellow('How would you like to configure GitHub Copilot settings?'),
        choices: [
          {
            name: 'Use recommended defaults (fastest setup)',
            value: 'defaults'
          },
          {
            name: 'Configure each setting manually (customize to your preferences)',
            value: 'manual'
          },
          {
            name: 'Skip settings configuration (I\'ll configure manually later)',
            value: 'skip'
          }
        ],
        default: 'defaults'
      }
    ]);
    
    answers.githubCopilotConfig = { configChoice };
  }

  // Ask for web bundles installation
  const { includeWebBundles } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeWebBundles',
      message: 'Would you like to include pre-built web bundles? (standalone files for ChatGPT, Claude, Gemini)',
      default: false
    }
  ]);

  if (includeWebBundles) {
    console.log(chalk.cyan('\n📦 Web bundles are standalone files perfect for web AI platforms.'));
    console.log(chalk.dim('   You can choose different teams/agents than your IDE installation.\n'));

    const { webBundleType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'webBundleType',
        message: 'What web bundles would you like to include?',
        choices: [
          {
            name: 'All available bundles (agents, teams, expansion packs)',
            value: 'all'
          },
          {
            name: 'Specific teams only',
            value: 'teams'
          },
          {
            name: 'Individual agents only',
            value: 'agents'
          },
          {
            name: 'Custom selection',
            value: 'custom'
          }
        ]
      }
    ]);

    answers.webBundleType = webBundleType;

    // If specific teams, let them choose which teams
    if (webBundleType === 'teams' || webBundleType === 'custom') {
      const teams = await installer.getAvailableTeams();
      const { selectedTeams } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedTeams',
          message: 'Select team bundles to include:',
          choices: teams.map(t => ({
            name: `${t.icon || '📋'} ${t.name}: ${t.description}`,
            value: t.id,
            checked: webBundleType === 'teams' // Check all if teams-only mode
          })),
          validate: (answer) => {
            if (answer.length < 1) {
              return 'You must select at least one team.';
            }
            return true;
          }
        }
      ]);
      answers.selectedWebBundleTeams = selectedTeams;
    }

    // If custom selection, also ask about individual agents
    if (webBundleType === 'custom') {
      const { includeIndividualAgents } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'includeIndividualAgents',
          message: 'Also include individual agent bundles?',
          default: true
        }
      ]);
      answers.includeIndividualAgents = includeIndividualAgents;
    }

    const { webBundlesDirectory } = await inquirer.prompt([
      {
        type: 'input',
        name: 'webBundlesDirectory',
        message: 'Enter directory for web bundles:',
        default: `${answers.directory}/web-bundles`,
        validate: (input) => {
          if (!input.trim()) {
            return 'Please enter a valid directory path';
          }
          return true;
        }
      }
    ]);
    answers.webBundlesDirectory = webBundlesDirectory;
  }

  answers.includeWebBundles = includeWebBundles;

  return answers;
}

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}