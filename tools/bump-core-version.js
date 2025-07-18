#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// --- Argument parsing ---
const args = process.argv.slice(2);
const bumpType = args[0] || 'minor';

if (!['major', 'minor', 'patch'].includes(bumpType)) {
  console.log('Usage: node bump-core-version.js [major|minor|patch]');
  console.log('Default: minor');
  process.exit(1);
}

// --- Function to bump semantic version ---
function bumpVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);

  return {
    major: `${major + 1}.0.0`,
    minor: `${major}.${minor + 1}.0`,
    patch: `${major}.${minor}.${patch + 1}`,
  }[type] || version;
}

// --- Main function ---
function bumpCoreVersion() {
  const configPath = path.join(__dirname, '..', 'bmad-core', 'core-config.yaml');

  try {
    const content = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(content);

    const oldVersion = config.version || '1.0.0';
    const newVersion = bumpVersion(oldVersion, bumpType);

    config.version = newVersion;
    const updatedYaml = yaml.dump(config, { indent: 2 });

    fs.writeFileSync(configPath, updatedYaml);

    console.log(`✓ BMad Core version bumped: ${oldVersion} → ${newVersion}\n`);
    console.log('Next steps:');
    console.log(`1. Test your changes`);
    console.log(`2. Commit:\n   git add -A && git commit -m "chore: bump core version (${bumpType})"`);

  } catch (err) {
    console.error(`✗ Failed to bump version: ${err.message}`);
    process.exit(1);
  }
}

// --- Run ---
bumpCoreVersion();
