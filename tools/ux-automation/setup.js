#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Setup script for BMAD UX Automation Tools
 * Ensures all dependencies are installed and configured properly
 */
async function setup() {
  console.log(chalk.blue('🔧 Setting up BMAD UX Automation Tools...'));
  
  try {
    // Check if we're in the right directory
    const packagePath = path.join(__dirname, 'package.json');
    if (!await fs.pathExists(packagePath)) {
      throw new Error('package.json not found. Make sure you\'re in the ux-automation directory.');
    }
    
    // Install playwright browsers
    console.log(chalk.yellow('📦 Installing Playwright browsers...'));
    try {
      execSync('npx playwright install chromium', { 
        cwd: __dirname, 
        stdio: 'inherit' 
      });
      console.log(chalk.green('✅ Playwright browsers installed successfully'));
    } catch (error) {
      console.warn(chalk.orange('⚠️ Playwright browser installation failed, but continuing...'));
      console.warn('You may need to run: npx playwright install chromium');
    }
    
    // Create output directories
    console.log(chalk.yellow('📁 Creating output directories...'));
    const outputDirs = [
      path.join(process.cwd(), 'ux-analysis'),
      path.join(process.cwd(), 'ux-analysis', 'reports'),
      path.join(process.cwd(), 'ux-analysis', 'screenshots')
    ];
    
    for (const dir of outputDirs) {
      await fs.ensureDir(dir);
    }
    console.log(chalk.green('✅ Output directories created'));
    
    // Create .gitignore for analysis outputs
    const gitignorePath = path.join(process.cwd(), 'ux-analysis', '.gitignore');
    const gitignoreContent = `# UX Analysis outputs
*.png
*.jpg
*.json
*.md
reports/
screenshots/
`;
    await fs.writeFile(gitignorePath, gitignoreContent);
    
    // Test the installation
    console.log(chalk.yellow('🧪 Testing installation...'));
    const testCommand = `node "${path.join(__dirname, 'ux-cli.js')}" --help`;
    execSync(testCommand, { stdio: 'pipe' });
    console.log(chalk.green('✅ CLI tool working correctly'));
    
    // Success message
    console.log(chalk.green('\n🎉 BMAD UX Automation Tools setup completed successfully!'));
    console.log(chalk.cyan('\n📖 Usage Examples:'));
    console.log('  bmad-ux quick https://example.com     # Quick 5-second analysis');
    console.log('  bmad-ux deep https://example.com      # Comprehensive analysis');
    console.log('  bmad-ux screenshot https://example.com # Multi-device screenshots');
    console.log('  bmad-ux accessibility https://example.com # WCAG compliance check');
    console.log('  bmad-ux demo                          # Run demonstration');
    
  } catch (error) {
    console.error(chalk.red('❌ Setup failed:'), error.message);
    process.exit(1);
  }
}

// Run setup if called directly
if (require.main === module) {
  setup();
}

module.exports = setup;