#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');
const { minimatch } = require('minimatch');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);

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
 * Check if a file is binary using file command and heuristics
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} True if file is binary
 */
async function isBinaryFile(filePath) {
  try {
    // First check by file extension
    const binaryExtensions = [
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.ico', '.svg',
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
      '.zip', '.tar', '.gz', '.rar', '.7z',
      '.exe', '.dll', '.so', '.dylib',
      '.mp3', '.mp4', '.avi', '.mov', '.wav',
      '.ttf', '.otf', '.woff', '.woff2',
      '.bin', '.dat', '.db', '.sqlite'
    ];
    
    const ext = path.extname(filePath).toLowerCase();
    if (binaryExtensions.includes(ext)) {
      return true;
    }
    
    // For files without clear extensions, try to read a small sample
    const stats = await fs.stat(filePath);
    if (stats.size === 0) {
      return false; // Empty files are considered text
    }
    
    // Read first 1024 bytes to check for null bytes
    const sampleSize = Math.min(1024, stats.size);
    const buffer = await fs.readFile(filePath, { encoding: null, flag: 'r' });
    const sample = buffer.slice(0, sampleSize);
    // If we find null bytes, it's likely binary
    return sample.includes(0);
  } catch (error) {
    console.warn(`Warning: Could not determine if file is binary: ${filePath} - ${error.message}`);
    return false; // Default to text if we can't determine
  }
}

/**
 * Read and aggregate content from text files
 * @param {string[]} files - Array of file paths
 * @param {string} rootDir - The root directory
 * @returns {Promise<Object>} Object containing file contents and metadata
 */
async function aggregateFileContents(files, rootDir) {
  const results = {
    textFiles: [],
    binaryFiles: [],
    errors: [],
    totalFiles: files.length,
    processedFiles: 0
  };
  
  for (const filePath of files) {
    try {
      const relativePath = path.relative(rootDir, filePath);
      const isBinary = await isBinaryFile(filePath);
      
      if (isBinary) {
        results.binaryFiles.push({
          path: relativePath,
          absolutePath: filePath,
          size: (await fs.stat(filePath)).size
        });
      } else {
        // Read text file content
        const content = await fs.readFile(filePath, 'utf8');
        results.textFiles.push({
          path: relativePath,
          absolutePath: filePath,
          content: content,
          size: content.length,
          lines: content.split('\n').length
        });
      }
      
      results.processedFiles++;
    } catch (error) {
      const relativePath = path.relative(rootDir, filePath);
      const errorInfo = {
        path: relativePath,
        absolutePath: filePath,
        error: error.message
      };
      
      results.errors.push(errorInfo);
      console.warn(`Warning: Could not read file ${relativePath}: ${error.message}`);
      results.processedFiles++;
    }
  }
  
  return results;
}

/**
 * Generate XML output with aggregated file contents
 * @param {Object} aggregatedContent - The aggregated content object
 * @param {string} projectRoot - The project root directory
 * @returns {string} XML content
 */
function generateXMLOutput(aggregatedContent, projectRoot) {
  const { textFiles, binaryFiles, errors, totalFiles, processedFiles } = aggregatedContent;
  const timestamp = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
  xml += `<codebase>
`;
  xml += `  <metadata>
`;
  xml += `    <generated>${timestamp}</generated>
`;
  xml += `    <project_root>${escapeXml(projectRoot)}</project_root>
`;
  xml += `    <total_files>${totalFiles}</total_files>
`;
  xml += `    <processed_files>${processedFiles}</processed_files>
`;
  xml += `    <text_files>${textFiles.length}</text_files>
`;
  xml += `    <binary_files>${binaryFiles.length}</binary_files>
`;
  xml += `    <errors>${errors.length}</errors>
`;
  xml += `  </metadata>
`;
  
  // Add text files with content
  if (textFiles.length > 0) {
    xml += `  <text_files>
`;
    for (const file of textFiles) {
      xml += `    <file>
`;
      xml += `      <path>${escapeXml(file.path)}</path>
`;
      xml += `      <size>${file.size}</size>
`;
      xml += `      <lines>${file.lines}</lines>
`;
      xml += `      <content><![CDATA[${file.content}]]></content>
`;
      xml += `    </file>
`;
    }
    xml += `  </text_files>
`;
  }
  
  // Add binary files (paths only)
  if (binaryFiles.length > 0) {
    xml += `  <binary_files>
`;
    for (const file of binaryFiles) {
      xml += `    <file>
`;
      xml += `      <path>${escapeXml(file.path)}</path>
`;
      xml += `      <size>${file.size}</size>
`;
      xml += `    </file>
`;
    }
    xml += `  </binary_files>
`;
  }
  
  // Add errors if any
  if (errors.length > 0) {
    xml += `  <errors>
`;
    for (const error of errors) {
      xml += `    <error>
`;
      xml += `      <path>${escapeXml(error.path)}</path>
`;
      xml += `      <message>${escapeXml(error.error)}</message>
`;
      xml += `    </error>
`;
    }
    xml += `  </errors>
`;
  }
  
  xml += `</codebase>`;
  return xml;
}

/**
 * Escape XML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeXml(str) {
  if (typeof str !== 'string') {
    return String(str);
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
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
      
      // Aggregate file contents
      console.log('Reading file contents...');
      const aggregatedContent = await aggregateFileContents(filteredFiles, projectRoot);
      
      console.log(`Processed ${aggregatedContent.processedFiles}/${aggregatedContent.totalFiles} files`);
      console.log(`Text files: ${aggregatedContent.textFiles.length}`);
      console.log(`Binary files: ${aggregatedContent.binaryFiles.length}`);
      if (aggregatedContent.errors.length > 0) {
        console.log(`Errors: ${aggregatedContent.errors.length}`);
      }
      
      // Generate XML content with file contents
      const xmlContent = generateXMLOutput(aggregatedContent, projectRoot);
      
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