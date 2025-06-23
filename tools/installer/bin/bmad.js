#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');

// Dynamic imports for ES modules
let chalk, inquirer;

// Initialize ES modules
async function initializeModules() {
  if (!chalk) {
    chalk = (await import('chalk')).default;
    inquirer = (await import('inquirer')).default;
  }
}

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
  .description('BMAD Method installer - AI-powered Agile development framework');

program
  .command('install')
  .description('Install BMAD Method agents and tools')
  .option('-f, --full', 'Install complete .bmad-core folder')
  .option('-a, --agent <agent>', 'Install specific agent with dependencies')
  .option('-t, --team <team>', 'Install specific team with required agents and dependencies')
  .option('-x, --expansion-only', 'Install only expansion packs (no bmad-core)')
  .option('-d, --directory <path>', 'Installation directory (default: .bmad-core)')
  .option('-i, --ide <ide...>', 'Configure for specific IDE(s) - can specify multiple (cursor, claude-code, windsurf, roo, cline, other)')
  .option('-e, --expansion-packs <packs...>', 'Install specific expansion packs (can specify multiple)')
  .action(async (options) => {
    try {
      await initializeModules();
      if (!options.full && !options.agent && !options.team && !options.expansionOnly) {
        // Interactive mode
        const answers = await promptInstallation();
        if (!answers._alreadyInstalled) {
          await installer.install(answers);
        }
      } else {
        // Direct mode
        let installType = 'full';
        if (options.agent) installType = 'single-agent';
        else if (options.team) installType = 'team';
        else if (options.expansionOnly) installType = 'expansion-only';

        const config = {
          installType,
          agent: options.agent,
          team: options.team,
          directory: options.directory || '.bmad-core',
          ides: (options.ide || []).filter(ide => ide !== 'other'),
          expansionPacks: options.expansionPacks || []
        };
        await installer.install(config);
      }
    } catch (error) {
      if (!chalk) await initializeModules();
      console.error(chalk.red('Installation failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('update')
  .description('Update existing BMAD installation')
  .option('--force', 'Force update, overwriting modified files')
  .option('--dry-run', 'Show what would be updated without making changes')
  .action(async () => {
    try {
      await installer.update();
    } catch (error) {
      if (!chalk) await initializeModules();
      console.error(chalk.red('Update failed:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available agents')
  .action(async () => {
    try {
      await installer.listAgents();
    } catch (error) {
      if (!chalk) await initializeModules();
      console.error(chalk.red('Error:'), error.message);
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
      if (!chalk) await initializeModules();
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
      if (!chalk) await initializeModules();
      console.error(chalk.red('Error:'), error.message);
      process.exit(1);
    }
  });

async function promptInstallation() {
  await initializeModules();
  console.log(chalk.bold.blue(`\nWelcome to BMAD Method Installer v${version}\n`));

  const answers = {};

  // Ask for installation directory
  const { directory } = await inquirer.prompt([
    {
      type: 'input',
      name: 'directory',
      message: 'Enter the full path to your project directory where BMAD should be installed:',
      validate: (input) => {
        if (!input.trim()) {
          return 'Please enter a valid project path';
        }
        return true;
      }
    }
  ]);
  answers.directory = directory;

  // Check if this is an existing v4 installation
  const installDir = path.resolve(answers.directory);
  const state = await installer.detectInstallationState(installDir);

  if (state.type === 'v4_existing') {
    console.log(chalk.yellow('\n🔍 Found existing BMAD v4 installation'));
    console.log(`   Directory: ${installDir}`);
    console.log(`   Version: ${state.manifest?.version || 'Unknown'}`);
    console.log(`   Installed: ${state.manifest?.installed_at ? new Date(state.manifest.installed_at).toLocaleDateString() : 'Unknown'}`);

    const { shouldUpdate } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldUpdate',
        message: 'Would you like to update your existing BMAD v4 installation?',
        default: true
      }
    ]);

    if (shouldUpdate) {
      // Skip other prompts and go directly to update
      answers.installType = 'update';
      answers._alreadyInstalled = true; // Flag to prevent double installation
      await installer.install(answers);
      return answers; // Return the answers object
    }
    // If user doesn't want to update, continue with normal flow
  }

  // Ask for installation type
  const { installType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'installType',
      message: 'How would you like to install BMAD?',
      choices: [
        {
          name: 'Complete installation (recommended) - All agents and tools',
          value: 'full'
        },
        {
          name: 'Team installation - Install a specific team with required agents',
          value: 'team'
        },
        {
          name: 'Single agent - Choose one agent to install',
          value: 'single-agent'
        },
        {
          name: 'Expansion packs only - Install expansion packs without bmad-core',
          value: 'expansion-only'
        }
      ]
    }
  ]);
  answers.installType = installType;

  // If single agent, ask which one
  if (installType === 'single-agent') {
    const agents = await installer.getAvailableAgents();
    const { agent } = await inquirer.prompt([
      {
        type: 'list',
        name: 'agent',
        message: 'Select an agent to install:',
        choices: agents.map(a => ({
          name: `${a.id} - ${a.name} (${a.description})`,
          value: a.id
        }))
      }
    ]);
    answers.agent = agent;
  }

  // If team installation, ask which team
  if (installType === 'team') {
    const teams = await installer.getAvailableTeams();
    const { team } = await inquirer.prompt([
      {
        type: 'list',
        name: 'team',
        message: 'Select a team to install in your IDE project folder:',
        choices: teams.map(t => ({
          name: `${t.icon || '📋'} ${t.name}: ${t.description}`,
          value: t.id
        }))
      }
    ]);
    answers.team = team;
  }

  // Ask for expansion pack selection
  if (installType === 'full' || installType === 'team' || installType === 'expansion-only') {
    try {
      const availableExpansionPacks = await installer.getAvailableExpansionPacks();

      if (availableExpansionPacks.length > 0) {
        let choices;
        let message;

        if (installType === 'expansion-only') {
          message = 'Select expansion packs to install (required):'
          choices = availableExpansionPacks.map(pack => ({
            name: `${pack.name} - ${pack.description}`,
            value: pack.id
          }));
        } else {
          message = 'Select expansion packs to install (press Enter to skip, or check any to install):';
          choices = availableExpansionPacks.map(pack => ({
            name: `${pack.name} - ${pack.description}`,
            value: pack.id
          }));
        }

        const { expansionPacks } = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'expansionPacks',
            message,
            choices,
            validate: installType === 'expansion-only' ? (answer) => {
              if (answer.length < 1) {
                return 'You must select at least one expansion pack for expansion-only installation.';
              }
              return true;
            } : undefined
          }
        ]);

        // Use selected expansion packs directly
        answers.expansionPacks = expansionPacks;
      } else {
        answers.expansionPacks = [];
      }
    } catch (error) {
      console.warn(chalk.yellow('Warning: Could not load expansion packs. Continuing without them.'));
      answers.expansionPacks = [];
    }
  } else {
    answers.expansionPacks = [];
  }

  // Ask for IDE configuration
  const { ides } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'ides',
      message: 'Which IDE(s) are you using? (press Enter to skip IDE setup, or select any to configure):',
      choices: [
        { name: 'Cursor', value: 'cursor' },
        { name: 'Claude Code', value: 'claude-code' },
        { name: 'Windsurf', value: 'windsurf' },
        { name: 'Roo Code', value: 'roo' },
        { name: 'Cline', value: 'cline' }
      ]
    }
  ]);

  // Use selected IDEs directly
  answers.ides = ides;

  // Ask for web bundles installation
  const { includeWebBundles } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeWebBundles',
      message: 'Would you like to include pre-built web bundles? (standalone files for ChatGPT, Claude, Gemini)',
      default: true
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