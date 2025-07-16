#!/usr/bin/env node

const { Command } = require('commander');
const UXOrchestrator = require('./ux-orchestrator');
const chalk = require('chalk');
const path = require('path');

const program = new Command();

program
  .name('bmad-ux')
  .description('BMAD UX Analysis Tool - Native browser automation for UX testing')
  .version('1.0.0');

// Global options
program
  .option('-o, --output <dir>', 'Output directory for reports and screenshots', './ux-analysis')
  .option('--timeout <ms>', 'Page load timeout in milliseconds', '30000')
  .option('--format <format>', 'Report format (json|markdown)', 'json');

/**
 * Quick Analysis Command
 */
program
  .command('quick <url>')
  .description('Run quick 5-second UX analysis for critical issues')
  .action(async (url, options) => {
    const globalOpts = program.opts();
    const orchestrator = new UXOrchestrator({
      outputDir: globalOpts.output,
      timeout: parseInt(globalOpts.timeout)
    });

    try {
      console.log(chalk.blue('🚀 Initializing UX Analysis...'));
      await orchestrator.initialize();
      
      const results = await orchestrator.quickAnalysis(url);
      const reportPath = await orchestrator.generateReport(results, globalOpts.format);
      
      // Print summary
      console.log(chalk.cyan('\n📊 Analysis Summary:'));
      console.log(`Issues found: ${results.issues.length}`);
      console.log(`Load time: ${results.metrics.loadTime || 'N/A'}ms`);
      console.log(`Screenshots: ${results.screenshots.length}`);
      console.log(`Report: ${reportPath}`);
      
    } catch (error) {
      console.error(chalk.red('❌ Analysis failed:'), error.message);
      process.exit(1);
    } finally {
      await orchestrator.cleanup();
    }
  });

/**
 * Deep Analysis Command
 */
program
  .command('deep <url>')
  .description('Run comprehensive 30-second UX analysis with full testing suite')
  .action(async (url, options) => {
    const globalOpts = program.opts();
    const orchestrator = new UXOrchestrator({
      outputDir: globalOpts.output,
      timeout: parseInt(globalOpts.timeout)
    });

    try {
      console.log(chalk.blue('🚀 Initializing Deep UX Analysis...'));
      await orchestrator.initialize();
      
      const results = await orchestrator.deepAnalysis(url);
      const reportPath = await orchestrator.generateReport(results, globalOpts.format);
      
      // Print detailed summary
      console.log(chalk.cyan('\n📊 Deep Analysis Summary:'));
      console.log(`Total issues: ${results.issues.length}`);
      console.log(`Accessibility issues: ${results.accessibility?.issues?.length || 0}`);
      console.log(`Performance issues: ${results.performance?.issues?.length || 0}`);
      console.log(`Mobile issues: ${results.mobile?.issues?.length || 0}`);
      console.log(`Screenshots captured: ${results.screenshots.length}`);
      console.log(`Report: ${reportPath}`);
      
      // Show top issues
      const highPriorityIssues = results.issues.filter(i => i.severity === 'high');
      if (highPriorityIssues.length > 0) {
        console.log(chalk.red('\n🚨 High Priority Issues:'));
        highPriorityIssues.slice(0, 3).forEach(issue => {
          console.log(`  - ${issue.issue}: ${issue.description}`);
        });
      }
      
    } catch (error) {
      console.error(chalk.red('❌ Deep analysis failed:'), error.message);
      process.exit(1);
    } finally {
      await orchestrator.cleanup();
    }
  });

/**
 * Screenshot Command
 */
program
  .command('screenshot <url>')
  .description('Capture screenshots across multiple device sizes')
  .action(async (url, options) => {
    const globalOpts = program.opts();
    const orchestrator = new UXOrchestrator({
      outputDir: globalOpts.output,
      timeout: parseInt(globalOpts.timeout)
    });

    try {
      console.log(chalk.blue('📸 Capturing screenshots...'));
      await orchestrator.initialize();
      
      const page = await orchestrator.browser.newPage();
      
      // Desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto(url);
      const desktopPath = await orchestrator.captureScreenshot(page, 'desktop');
      console.log(chalk.green(`Desktop: ${desktopPath}`));
      
      // Tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.reload();
      const tabletPath = await orchestrator.captureScreenshot(page, 'tablet');
      console.log(chalk.green(`Tablet: ${tabletPath}`));
      
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      const mobilePath = await orchestrator.captureScreenshot(page, 'mobile');
      console.log(chalk.green(`Mobile: ${mobilePath}`));
      
      await page.close();
      
    } catch (error) {
      console.error(chalk.red('❌ Screenshot capture failed:'), error.message);
      process.exit(1);
    } finally {
      await orchestrator.cleanup();
    }
  });

/**
 * Accessibility Command
 */
program
  .command('accessibility <url>')
  .description('Run WCAG 2.1 compliance check with detailed analysis')
  .action(async (url, options) => {
    const globalOpts = program.opts();
    const orchestrator = new UXOrchestrator({
      outputDir: globalOpts.output,
      timeout: parseInt(globalOpts.timeout)
    });

    try {
      console.log(chalk.blue('♿ Running accessibility analysis...'));
      await orchestrator.initialize();
      
      const page = await orchestrator.browser.newPage();
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto(url);
      
      const accessibilityResults = await orchestrator.comprehensiveAccessibilityCheck(page);
      const screenshot = await orchestrator.captureScreenshot(page, 'accessibility');
      
      const results = {
        url,
        timestamp: new Date().toISOString(),
        type: 'accessibility',
        accessibility: accessibilityResults,
        screenshots: [{ type: 'desktop', path: screenshot }],
        issues: accessibilityResults.issues
      };
      
      const reportPath = await orchestrator.generateReport(results, globalOpts.format);
      
      console.log(chalk.cyan('\n♿ Accessibility Summary:'));
      console.log(`Issues found: ${accessibilityResults.issues.length}`);
      console.log(`Screenshot: ${screenshot}`);
      console.log(`Report: ${reportPath}`);
      
      await page.close();
      
    } catch (error) {
      console.error(chalk.red('❌ Accessibility analysis failed:'), error.message);
      process.exit(1);
    } finally {
      await orchestrator.cleanup();
    }
  });

/**
 * Performance Command
 */
program
  .command('performance <url>')
  .description('Run Core Web Vitals and performance analysis')
  .action(async (url, options) => {
    const globalOpts = program.opts();
    const orchestrator = new UXOrchestrator({
      outputDir: globalOpts.output,
      timeout: parseInt(globalOpts.timeout)
    });

    try {
      console.log(chalk.blue('⚡ Running performance analysis...'));
      await orchestrator.initialize();
      
      const page = await orchestrator.browser.newPage();
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto(url, { waitUntil: 'networkidle' });
      
      const performanceResults = await orchestrator.performanceAnalysis(page);
      const screenshot = await orchestrator.captureScreenshot(page, 'performance');
      
      const results = {
        url,
        timestamp: new Date().toISOString(),
        type: 'performance',
        performance: performanceResults,
        screenshots: [{ type: 'desktop', path: screenshot }],
        issues: performanceResults.issues
      };
      
      const reportPath = await orchestrator.generateReport(results, globalOpts.format);
      
      console.log(chalk.cyan('\n⚡ Performance Summary:'));
      console.log(`Load time: ${performanceResults.metrics.loadTime || 'N/A'}ms`);
      console.log(`FCP: ${performanceResults.metrics.firstContentfulPaint || 'N/A'}ms`);
      console.log(`Performance issues: ${performanceResults.issues.length}`);
      console.log(`Report: ${reportPath}`);
      
      await page.close();
      
    } catch (error) {
      console.error(chalk.red('❌ Performance analysis failed:'), error.message);
      process.exit(1);
    } finally {
      await orchestrator.cleanup();
    }
  });

/**
 * Mobile Command
 */
program
  .command('mobile <url>')
  .description('Test mobile responsiveness with comparison across devices')
  .action(async (url, options) => {
    const globalOpts = program.opts();
    const orchestrator = new UXOrchestrator({
      outputDir: globalOpts.output,
      timeout: parseInt(globalOpts.timeout)
    });

    try {
      console.log(chalk.blue('📱 Running mobile responsiveness analysis...'));
      await orchestrator.initialize();
      
      const page = await orchestrator.browser.newPage();
      
      // Mobile analysis
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(url);
      
      const mobileResults = await orchestrator.mobileAnalysis(page);
      const mobileScreenshot = await orchestrator.captureScreenshot(page, 'mobile-analysis');
      
      const results = {
        url,
        timestamp: new Date().toISOString(),
        type: 'mobile',
        mobile: mobileResults,
        screenshots: [{ type: 'mobile', path: mobileScreenshot }],
        issues: mobileResults.issues
      };
      
      const reportPath = await orchestrator.generateReport(results, globalOpts.format);
      
      console.log(chalk.cyan('\n📱 Mobile Analysis Summary:'));
      console.log(`Touch targets checked: ${mobileResults.touchTargets?.total || 'N/A'}`);
      console.log(`Small touch targets: ${mobileResults.touchTargets?.small || 'N/A'}`);
      console.log(`Mobile issues: ${mobileResults.issues.length}`);
      console.log(`Report: ${reportPath}`);
      
      await page.close();
      
    } catch (error) {
      console.error(chalk.red('❌ Mobile analysis failed:'), error.message);
      process.exit(1);
    } finally {
      await orchestrator.cleanup();
    }
  });

/**
 * Demo Command
 */
program
  .command('demo')
  .description('Run demonstration analysis on example applications')
  .action(async (options) => {
    console.log(chalk.blue('🎪 Running UX Analysis Demo...'));
    
    const demoUrls = [
      'https://example.com',
      'https://httpbin.org/html',
      'https://www.w3.org/WAI/demos/bad/'
    ];
    
    for (const url of demoUrls) {
      console.log(chalk.yellow(`\n🔍 Analyzing: ${url}`));
      
      try {
        const { spawn } = require('child_process');
        await new Promise((resolve, reject) => {
          const child = spawn('node', [__filename, 'quick', url], { stdio: 'inherit' });
          child.on('close', (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Analysis failed with code ${code}`));
          });
        });
      } catch (error) {
        console.warn(chalk.yellow(`⚠️ Demo analysis failed for ${url}: ${error.message}`));
      }
    }
    
    console.log(chalk.green('\n✅ Demo completed!'));
  });

// Parse command line arguments
program.parse();

module.exports = program;