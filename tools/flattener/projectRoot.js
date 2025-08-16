const fs = require('fs-extra');
const path = require('node:path');

/**
 * Attempt to find the project root by walking up from startDir
 * Looks for common project markers like .git, package.json, pyproject.toml, etc.
 * @param {string} startDir
 * @returns {Promise<string|null>} project root directory or null if not found
 */
async function findProjectRoot(startDir) {
  try {
    let dir = path.resolve(startDir);
    const root = path.parse(dir).root;
    const markers = [
      '.git',
      'package.json',
      'pnpm-workspace.yaml',
      'yarn.lock',
      'pnpm-lock.yaml',
      'pyproject.toml',
      'requirements.txt',
      'go.mod',
      'Cargo.toml',
      'composer.json',
      '.hg',
      '.svn',
    ];

    while (true) {
      const exists = await Promise.all(markers.map((m) => fs.pathExists(path.join(dir, m))));
      if (exists.some(Boolean)) {
        return dir;
      }
      if (dir === root) break;
      dir = path.dirname(dir);
    }
    return null;
  } catch {
    return null;
  }
}

module.exports = { findProjectRoot };
