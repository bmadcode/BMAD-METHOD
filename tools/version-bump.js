#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Dynamic import for ES module
let chalk;

// Initialize ES modules
async function initializeModules() {
  if (!chalk) {
    chalk = (await import('chalk')).default;
  }
}

/**
 * Simple version bumping script for BMad-Method
 * Usage: node tools/version-bump.js [patch|minor|major]
 */

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

async function bumpVersion(type = 'patch') {
  await initializeModules();
  
  const validTypes = ['patch', 'minor', 'major'];
  if (!validTypes.includes(type)) {
    console.error(chalk.red(`Invalid version type: ${type}. Use: ${validTypes.join(', ')}`));
    process.exit(1);
  }

  console.log(chalk.yellow('⚠️  Manual version bumping is disabled.'));
  console.log(chalk.blue('🤖 This project uses semantic-release for automated versioning.'));
  console.log('');
  console.log(chalk.bold('To create a new release, use conventional commits:'));
  console.log(chalk.cyan('  feat: new feature (minor version bump)'));
  console.log(chalk.cyan('  fix: bug fix (patch version bump)'));
  console.log(chalk.cyan('  feat!: breaking change (major version bump)'));
  console.log('');
  console.log(chalk.dim('Example: git commit -m "feat: add new installer features"'));
  console.log(chalk.dim('Then push to main branch to trigger automatic release.'));
  
  return null;
}

async function main() {
  await initializeModules();
  
  const type = process.argv[2] || 'patch';
  const currentVersion = getCurrentVersion();
  
  console.log(chalk.blue(`Current version: ${currentVersion}`));
  
  // Check if working directory is clean
  try {
    execSync('git diff-index --quiet HEAD --');
  } catch (error) {
    console.error(chalk.red('❌ Working directory is not clean. Commit your changes first.'));
    process.exit(1);
  }
  
  const newVersion = await bumpVersion(type);
  
  console.log(chalk.green(`\n🎉 Version bump complete!`));
  console.log(chalk.blue(`📦 ${currentVersion} → ${newVersion}`));
}

if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
}

module.exports = { bumpVersion, getCurrentVersion };