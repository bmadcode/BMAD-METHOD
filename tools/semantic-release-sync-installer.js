/**
 * Semantic-release plugin to sync installer package.json version
 */

const fs = require('fs');
const path = require('path');

// This function runs during the "prepare" step of semantic-release
function prepare(_, { nextRelease, logger }) {
  // Define the path to the installer package.json file
  const file = path.join(process.cwd(), 'tools/installer/package.json');

  // If the file does not exist, skip syncing and log a message
  if (!fs.existsSync(file)) return logger.log('Installer package.json not found, skipping');

  // Read and parse the package.json file
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));

  // Update the version field with the next release version
  pkg.version = nextRelease.version;

  // Write the updated JSON back to the file
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + '\n');

  // Log success message
  logger.log(`Synced installer package.json to version ${nextRelease.version}`);
}

// Export the prepare function so semantic-release can use it
module.exports = { prepare };
