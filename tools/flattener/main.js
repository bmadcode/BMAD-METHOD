const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('node:path');
const process = require('node:process');

// Modularized components
const { findProjectRoot } = require('./projectRoot.js');
const { promptYesNo, promptPath } = require('./prompts.js');
const { discoverFiles, filterFiles, aggregateFileContents } = require('./files.js');
const { generateXMLOutput } = require('./xml.js');
const { calculateStatistics } = require('./stats.js');

/**
 * Recursively discover all files in a directory
 * @param {string} rootDir - The root directory to scan
 * @returns {Promise<string[]>} Array of file paths
 */

/**
 * Parse .gitignore file and return ignore patterns
 * @param {string} gitignorePath - Path to .gitignore file
 * @returns {Promise<string[]>} Array of ignore patterns
 */

/**
 * Check if a file is binary using file command and heuristics
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} True if file is binary
 */

/**
 * Read and aggregate content from text files
 * @param {string[]} files - Array of file paths
 * @param {string} rootDir - The root directory
 * @param {Object} spinner - Optional spinner instance for progress display
 * @returns {Promise<Object>} Object containing file contents and metadata
 */

/**
 * Generate XML output with aggregated file contents using streaming
 * @param {Object} aggregatedContent - The aggregated content object
 * @param {string} outputPath - The output file path
 * @returns {Promise<void>} Promise that resolves when writing is complete
 */

/**
 * Calculate statistics for the processed files
 * @param {Object} aggregatedContent - The aggregated content object
 * @param {number} xmlFileSize - The size of the generated XML file in bytes
 * @returns {Object} Statistics object
 */

/**
 * Filter files based on .gitignore patterns
 * @param {string[]} files - Array of file paths
 * @param {string} rootDir - The root directory
 * @returns {Promise<string[]>} Filtered array of file paths
 */

/**
 * Attempt to find the project root by walking up from startDir
 * Looks for common project markers like .git, package.json, pyproject.toml, etc.
 * @param {string} startDir
 * @returns {Promise<string|null>} project root directory or null if not found
 */

const program = new Command();

program
  .name('bmad-flatten')
  .description('BMad-Method codebase flattener tool')
  .version('1.0.0')
  .option('-i, --input <path>', 'Input directory to flatten', process.cwd())
  .option('-o, --output <path>', 'Output file path', 'flattened-codebase.xml')
  .action(async (options) => {
    let inputDir = path.resolve(options.input);
    let outputPath = path.resolve(options.output);

    // Detect if user explicitly provided -i/--input or -o/--output
    const argv = process.argv.slice(2);
    const userSpecifiedInput = argv.some(
      (a) => a === '-i' || a === '--input' || a.startsWith('--input='),
    );
    const userSpecifiedOutput = argv.some(
      (a) => a === '-o' || a === '--output' || a.startsWith('--output='),
    );
    const noPathArguments = !userSpecifiedInput && !userSpecifiedOutput;

    if (noPathArguments) {
      const detectedRoot = await findProjectRoot(process.cwd());
      const suggestedOutput = detectedRoot
        ? path.join(detectedRoot, 'flattened-codebase.xml')
        : path.resolve('flattened-codebase.xml');

      if (detectedRoot) {
        const useDefaults = await promptYesNo(
          `Detected project root at "${detectedRoot}". Use it as input and write output to "${suggestedOutput}"?`,
          true,
        );
        if (useDefaults) {
          inputDir = detectedRoot;
          outputPath = suggestedOutput;
        } else {
          inputDir = await promptPath('Enter input directory path', process.cwd());
          outputPath = await promptPath(
            'Enter output file path',
            path.join(inputDir, 'flattened-codebase.xml'),
          );
        }
      } else {
        console.log('Could not auto-detect a project root.');
        inputDir = await promptPath('Enter input directory path', process.cwd());
        outputPath = await promptPath(
          'Enter output file path',
          path.join(inputDir, 'flattened-codebase.xml'),
        );
      }
    } else {
      console.error(
        'Could not auto-detect a project root and no arguments were provided. Please specify -i/--input and -o/--output.',
      );
      process.exit(1);
    }

    // Ensure output directory exists
    await fs.ensureDir(path.dirname(outputPath));

    console.log(`Flattening codebase from: ${inputDir}`);
    console.log(`Output file: ${outputPath}`);

    try {
      // Verify input directory exists
      if (!(await fs.pathExists(inputDir))) {
        console.error(`❌ Error: Input directory does not exist: ${inputDir}`);
        process.exit(1);
      }

      // Import ora dynamically
      const { default: ora } = await import('ora');

      // Start file discovery with spinner
      const discoverySpinner = ora('🔍 Discovering files...').start();
      const files = await discoverFiles(inputDir);
      const filteredFiles = await filterFiles(files, inputDir);
      discoverySpinner.succeed(`📁 Found ${filteredFiles.length} files to include`);

      // Process files with progress tracking
      console.log('Reading file contents');
      const processingSpinner = ora('📄 Processing files...').start();
      const aggregatedContent = await aggregateFileContents(
        filteredFiles,
        inputDir,
        processingSpinner,
      );
      processingSpinner.succeed(
        `✅ Processed ${aggregatedContent.processedFiles}/${filteredFiles.length} files`,
      );
      if (aggregatedContent.errors.length > 0) {
        console.log(`Errors: ${aggregatedContent.errors.length}`);
      }
      console.log(`Text files: ${aggregatedContent.textFiles.length}`);
      if (aggregatedContent.binaryFiles.length > 0) {
        console.log(`Binary files: ${aggregatedContent.binaryFiles.length}`);
      }

      // Generate XML output using streaming
      const xmlSpinner = ora('🔧 Generating XML output...').start();
      await generateXMLOutput(aggregatedContent, outputPath);
      xmlSpinner.succeed('📝 XML generation completed');

      // Calculate and display statistics
      const outputStats = await fs.stat(outputPath);
      const stats = calculateStatistics(aggregatedContent, outputStats.size);

      // Display completion summary
      console.log('\n📊 Completion Summary:');
      console.log(
        `✅ Successfully processed ${filteredFiles.length} files into ${path.basename(outputPath)}`,
      );
      console.log(`📁 Output file: ${outputPath}`);
      console.log(`📏 Total source size: ${stats.totalSize}`);
      console.log(`📄 Generated XML size: ${stats.xmlSize}`);
      console.log(`📝 Total lines of code: ${stats.totalLines.toLocaleString()}`);
      console.log(`🔢 Estimated tokens: ${stats.estimatedTokens}`);
      console.log(
        `📊 File breakdown: ${stats.textFiles} text, ${stats.binaryFiles} binary, ${stats.errorFiles} errors`,
      );
    } catch (error) {
      console.error('❌ Critical error:', error.message);
      console.error('An unexpected error occurred.');
      process.exit(1);
    }
  });

if (require.main === module) {
  program.parse();
}

module.exports = program;
