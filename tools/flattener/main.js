#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { minimatch } = require('minimatch');

/**
 * Recursively discover all files in a directory
 * @param {string} rootDir - The root directory to scan
 * @returns {Promise<string[]>} Array of file paths
 */
async function discoverFiles(rootDir) {
  try {
    // Use glob to recursively find all files, excluding common ignore patterns
    const files = await glob('**/*', {
      cwd: rootDir,
      nodir: true, // Only files, not directories
      dot: true,   // Include hidden files
      follow: false, // Don't follow symbolic links
      ignore: [
        // Standard ignore patterns
        'node_modules/**',
        '.git/**',
        'build/**',
        'dist/**',
        '.next/**',
        'coverage/**',
        '.nyc_output/**',
        'tmp/**',
        'temp/**',
        '.gitignore',
        '.gitattributes',
        '.gitmodules'
      ]
    });
    
    return files.map(file => path.resolve(rootDir, file));
  } catch (error) {
    console.error('Error discovering files:', error.message);
    return [];
  }
}

/**
 * Parse .gitignore file and return ignore patterns
 * @param {string} gitignorePath - Path to .gitignore file
 * @returns {Promise<string[]>} Array of ignore patterns
 */
async function parseGitignore(gitignorePath) {
  try {
    if (!await fs.pathExists(gitignorePath)) {
      return [];
    }
    
    const content = await fs.readFile(gitignorePath, 'utf8');
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#')) // Remove empty lines and comments
      .map(pattern => {
        // Convert gitignore patterns to glob patterns
        if (pattern.endsWith('/')) {
          return pattern + '**';
        }
        return pattern;
      });
  } catch (error) {
    console.error('Error parsing .gitignore:', error.message);
    return [];
  }
}

/**
 * Filter files based on .gitignore patterns
 * @param {string[]} files - Array of file paths
 * @param {string} rootDir - The root directory
 * @returns {Promise<string[]>} Filtered array of file paths
 */
async function filterFiles(files, rootDir) {
  const gitignorePath = path.join(rootDir, '.gitignore');
  const ignorePatterns = await parseGitignore(gitignorePath);
  
  if (ignorePatterns.length === 0) {
    return files;
  }
  
  // Convert absolute paths to relative for pattern matching
  const relativeFiles = files.map(file => path.relative(rootDir, file));
  
  // Separate positive and negative patterns
  const positivePatterns = ignorePatterns.filter(p => !p.startsWith('!'));
  const negativePatterns = ignorePatterns.filter(p => p.startsWith('!')).map(p => p.slice(1));
  
  // Filter out files that match ignore patterns
  const filteredRelative = [];
  
  for (const file of relativeFiles) {
    let shouldIgnore = false;
    
    // First check positive patterns (ignore these files)
    for (const pattern of positivePatterns) {
      if (minimatch(file, pattern)) {
        shouldIgnore = true;
        break;
      }
    }
    
    // Then check negative patterns (don't ignore these files even if they match positive patterns)
    if (shouldIgnore) {
      for (const pattern of negativePatterns) {
        if (minimatch(file, pattern)) {
          shouldIgnore = false;
          break;
        }
      }
    }
    
    if (!shouldIgnore) {
      filteredRelative.push(file);
    }
  }
  
  // Convert back to absolute paths
  return filteredRelative.map(file => path.resolve(rootDir, file));
}

const program = new Command();

program
  .name('bmad-flatten')
  .description('BMad-Method codebase flattener tool')
  .version('1.0.0')
  .option('-o, --output <path>', 'Output file path', 'flattened-codebase.xml')
  .action(async (options) => {
    try {
      console.log(`Flattening codebase to: ${options.output}`);
      
      const projectRoot = process.cwd();
      const outputPath = path.resolve(options.output);
      
      // Discover and filter files
      const discoveredFiles = await discoverFiles(projectRoot);
      const filteredFiles = await filterFiles(discoveredFiles, projectRoot);
      
      console.log(`Found ${filteredFiles.length} files to include`);
      
      // Debug: log the files being included (only in debug mode)
      if (process.env.DEBUG_FLATTENER) {
        console.log('Files to include:');
        filteredFiles.forEach(file => {
          console.log(`  - ${path.relative(projectRoot, file)}`);
        });
      }
      
      // Create basic XML structure for now
      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<codebase>
  <!-- Flattened codebase will be generated here -->
  <!-- Files discovered: ${filteredFiles.length} -->
</codebase>`;
      
      await fs.writeFile(outputPath, xmlContent);
      console.log(`Codebase flattened successfully to: ${outputPath}`);
    } catch (error) {
      console.error('Flattening failed:', error.message);
      process.exit(1);
    }
  });

if (require.main === module) {
  program.parse();
}

module.exports = program;