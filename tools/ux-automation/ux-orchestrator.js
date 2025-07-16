#!/usr/bin/env node

const playwright = require('playwright');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * UX Analysis Orchestrator - BMAD Native Implementation
 * Provides comprehensive UX analysis capabilities without external dependencies
 */
class UXOrchestrator {
  constructor(options = {}) {
    this.outputDir = options.outputDir || './ux-analysis';
    this.screenshotsDir = path.join(this.outputDir, 'screenshots');
    this.reportsDir = path.join(this.outputDir, 'reports');
    this.browser = null;
    this.page = null;
    
    // Analysis configuration
    this.config = {
      timeout: options.timeout || 30000,
      viewport: options.viewport || { width: 1280, height: 720 },
      mobileViewport: { width: 375, height: 667 },
      tabletViewport: { width: 768, height: 1024 }
    };
  }

  async initialize() {
    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(this.screenshotsDir);
    await fs.ensureDir(this.reportsDir);
    
    this.browser = await playwright.chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Quick 5-second analysis for critical issues
   */
  async quickAnalysis(url) {
    console.log(chalk.blue(`🔍 Running quick analysis on: ${url}`));
    
    const results = {
      url,
      timestamp: new Date().toISOString(),
      type: 'quick',
      issues: [],
      metrics: {},
      screenshots: []
    };

    try {
      const page = await this.browser.newPage();
      await page.setViewportSize(this.config.viewport);
      
      const startTime = Date.now();
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: this.config.timeout });
      
      // Capture screenshot
      const screenshotPath = await this.captureScreenshot(page, 'quick-desktop');
      results.screenshots.push({ type: 'desktop', path: screenshotPath });
      
      // Basic performance metrics
      const metrics = await page.evaluate(() => ({
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        firstContentfulPaint: performance.getEntriesByType('paint')
          .find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      }));
      results.metrics = metrics;
      
      // Critical accessibility checks
      const accessibilityIssues = await this.checkBasicAccessibility(page);
      results.issues.push(...accessibilityIssues);
      
      // Console errors
      const consoleErrors = await this.checkConsoleErrors(page);
      results.issues.push(...consoleErrors);
      
      await page.close();
      
      console.log(chalk.green(`✅ Quick analysis completed in ${Date.now() - startTime}ms`));
      console.log(chalk.yellow(`Found ${results.issues.length} issues`));
      
      return results;
      
    } catch (error) {
      console.error(chalk.red(`❌ Quick analysis failed: ${error.message}`));
      throw error;
    }
  }

  /**
   * Deep 30-second comprehensive analysis
   */
  async deepAnalysis(url) {
    console.log(chalk.blue(`🔬 Running deep analysis on: ${url}`));
    
    const results = {
      url,
      timestamp: new Date().toISOString(),
      type: 'deep',
      issues: [],
      metrics: {},
      screenshots: [],
      accessibility: {},
      mobile: {},
      performance: {}
    };

    try {
      const page = await this.browser.newPage();
      const startTime = Date.now();
      
      // Desktop analysis
      await page.setViewportSize(this.config.viewport);
      await page.goto(url, { waitUntil: 'networkidle', timeout: this.config.timeout });
      
      // Desktop screenshot
      const desktopScreenshot = await this.captureScreenshot(page, 'deep-desktop');
      results.screenshots.push({ type: 'desktop', path: desktopScreenshot });
      
      // Comprehensive accessibility analysis
      results.accessibility = await this.comprehensiveAccessibilityCheck(page);
      results.issues.push(...results.accessibility.issues);
      
      // Performance analysis
      results.performance = await this.performanceAnalysis(page);
      results.issues.push(...results.performance.issues);
      
      // Mobile analysis
      await page.setViewportSize(this.config.mobileViewport);
      await page.reload({ waitUntil: 'networkidle' });
      
      const mobileScreenshot = await this.captureScreenshot(page, 'deep-mobile');
      results.screenshots.push({ type: 'mobile', path: mobileScreenshot });
      
      results.mobile = await this.mobileAnalysis(page);
      results.issues.push(...results.mobile.issues);
      
      // Tablet analysis
      await page.setViewportSize(this.config.tabletViewport);
      await page.reload({ waitUntil: 'networkidle' });
      
      const tabletScreenshot = await this.captureScreenshot(page, 'deep-tablet');
      results.screenshots.push({ type: 'tablet', path: tabletScreenshot });
      
      await page.close();
      
      console.log(chalk.green(`✅ Deep analysis completed in ${Date.now() - startTime}ms`));
      console.log(chalk.yellow(`Found ${results.issues.length} total issues`));
      
      return results;
      
    } catch (error) {
      console.error(chalk.red(`❌ Deep analysis failed: ${error.message}`));
      throw error;
    }
  }

  /**
   * Capture screenshot with timestamp
   */
  async captureScreenshot(page, suffix) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot-${timestamp}-${suffix}.png`;
    const filepath = path.join(this.screenshotsDir, filename);
    
    await page.screenshot({ 
      path: filepath, 
      fullPage: true,
      type: 'png'
    });
    
    return filepath;
  }

  /**
   * Basic accessibility checks for quick analysis
   */
  async checkBasicAccessibility(page) {
    const issues = [];
    
    try {
      // Check for missing alt text
      const missingAlt = await page.$$eval('img:not([alt])', imgs => imgs.length);
      if (missingAlt > 0) {
        issues.push({
          type: 'accessibility',
          severity: 'high',
          issue: 'Missing alt text',
          description: `${missingAlt} images without alt text`,
          wcag: '1.1.1'
        });
      }
      
      // Check for form labels
      const unlabeledInputs = await page.$$eval('input:not([aria-label]):not([aria-labelledby])', inputs => 
        inputs.filter(input => !input.closest('label')).length
      );
      if (unlabeledInputs > 0) {
        issues.push({
          type: 'accessibility',
          severity: 'high',
          issue: 'Unlabeled form inputs',
          description: `${unlabeledInputs} form inputs without proper labels`,
          wcag: '3.3.2'
        });
      }
      
    } catch (error) {
      console.warn('Accessibility check failed:', error.message);
    }
    
    return issues;
  }

  /**
   * Check for console errors
   */
  async checkConsoleErrors(page) {
    const issues = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        issues.push({
          type: 'javascript',
          severity: 'medium',
          issue: 'Console error',
          description: msg.text()
        });
      }
    });
    
    return issues;
  }

  /**
   * Comprehensive accessibility analysis
   */
  async comprehensiveAccessibilityCheck(page) {
    const results = {
      score: 0,
      issues: [],
      checks: {}
    };
    
    try {
      // Color contrast check
      const contrastIssues = await page.evaluate(() => {
        const issues = [];
        const elements = document.querySelectorAll('*');
        
        elements.forEach(el => {
          const styles = window.getComputedStyle(el);
          const color = styles.color;
          const backgroundColor = styles.backgroundColor;
          
          // Simple contrast check (would need more sophisticated logic)
          if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            // This is a simplified check - real implementation would calculate actual contrast ratio
            const colorLightness = this.getColorLightness(color);
            const bgLightness = this.getColorLightness(backgroundColor);
            const contrast = Math.abs(colorLightness - bgLightness);
            
            if (contrast < 0.3) { // Simplified threshold
              issues.push({
                element: el.tagName.toLowerCase(),
                text: el.textContent?.substring(0, 50) || '',
                color,
                backgroundColor
              });
            }
          }
        });
        
        return issues;
      });
      
      if (contrastIssues.length > 0) {
        results.issues.push({
          type: 'accessibility',
          severity: 'medium',
          issue: 'Color contrast',
          description: `${contrastIssues.length} elements may have insufficient color contrast`,
          wcag: '1.4.3',
          details: contrastIssues.slice(0, 5) // Limit details
        });
      }
      
      // Heading structure check
      const headingStructure = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const structure = headings.map(h => ({
          level: parseInt(h.tagName.charAt(1)),
          text: h.textContent?.substring(0, 50) || ''
        }));
        
        const issues = [];
        for (let i = 1; i < structure.length; i++) {
          if (structure[i].level > structure[i-1].level + 1) {
            issues.push(`Heading level skipped: ${structure[i-1].level} to ${structure[i].level}`);
          }
        }
        
        return { headings: structure.length, issues };
      });
      
      if (headingStructure.issues.length > 0) {
        results.issues.push({
          type: 'accessibility',
          severity: 'medium',
          issue: 'Heading structure',
          description: 'Improper heading hierarchy',
          wcag: '1.3.1',
          details: headingStructure.issues
        });
      }
      
      results.checks = {
        contrastIssues: contrastIssues.length,
        headingCount: headingStructure.headings,
        headingIssues: headingStructure.issues.length
      };
      
    } catch (error) {
      console.warn('Comprehensive accessibility check failed:', error.message);
    }
    
    return results;
  }

  /**
   * Performance analysis
   */
  async performanceAnalysis(page) {
    const results = {
      issues: [],
      metrics: {},
      score: 0
    };
    
    try {
      // Get performance metrics
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        return {
          loadTime: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
          largestContentfulPaint: paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0
        };
      });
      
      results.metrics = metrics;
      
      // Performance thresholds
      if (metrics.loadTime > 3000) {
        results.issues.push({
          type: 'performance',
          severity: 'high',
          issue: 'Slow page load',
          description: `Page load time: ${Math.round(metrics.loadTime)}ms (target: <3000ms)`
        });
      }
      
      if (metrics.firstContentfulPaint > 1800) {
        results.issues.push({
          type: 'performance',
          severity: 'medium',
          issue: 'Slow first contentful paint',
          description: `FCP: ${Math.round(metrics.firstContentfulPaint)}ms (target: <1800ms)`
        });
      }
      
    } catch (error) {
      console.warn('Performance analysis failed:', error.message);
    }
    
    return results;
  }

  /**
   * Mobile-specific analysis
   */
  async mobileAnalysis(page) {
    const results = {
      issues: [],
      responsive: {},
      touchTargets: {}
    };
    
    try {
      // Check touch target sizes
      const touchTargets = await page.evaluate(() => {
        const clickableElements = document.querySelectorAll('button, a, [onclick], input[type="button"], input[type="submit"]');
        const smallTargets = [];
        
        clickableElements.forEach(el => {
          const rect = el.getBoundingClientRect();
          const minSize = 44; // iOS/Android minimum touch target size
          
          if (rect.width < minSize || rect.height < minSize) {
            smallTargets.push({
              tag: el.tagName.toLowerCase(),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              text: el.textContent?.substring(0, 30) || ''
            });
          }
        });
        
        return {
          total: clickableElements.length,
          small: smallTargets.length,
          details: smallTargets.slice(0, 5)
        };
      });
      
      if (touchTargets.small > 0) {
        results.issues.push({
          type: 'mobile',
          severity: 'medium',
          issue: 'Small touch targets',
          description: `${touchTargets.small} elements smaller than 44px`,
          details: touchTargets.details
        });
      }
      
      results.touchTargets = touchTargets;
      
    } catch (error) {
      console.warn('Mobile analysis failed:', error.message);
    }
    
    return results;
  }

  /**
   * Generate comprehensive report
   */
  async generateReport(results, format = 'json') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `ux-analysis-${timestamp}.${format}`;
    const filepath = path.join(this.reportsDir, filename);
    
    if (format === 'json') {
      await fs.writeJson(filepath, results, { spaces: 2 });
    } else if (format === 'markdown') {
      const markdown = this.generateMarkdownReport(results);
      await fs.writeFile(filepath, markdown);
    }
    
    console.log(chalk.green(`📄 Report saved: ${filepath}`));
    return filepath;
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport(results) {
    const { url, type, issues, screenshots } = results;
    
    let markdown = `# UX Analysis Report

**URL:** ${url}  
**Analysis Type:** ${type}  
**Timestamp:** ${results.timestamp}  
**Total Issues:** ${issues.length}

## Screenshots

`;
    
    screenshots.forEach(screenshot => {
      markdown += `- **${screenshot.type}:** ${screenshot.path}\n`;
    });
    
    markdown += `\n## Issues Summary\n\n`;
    
    const issuesBySeverity = {
      high: issues.filter(i => i.severity === 'high'),
      medium: issues.filter(i => i.severity === 'medium'),
      low: issues.filter(i => i.severity === 'low')
    };
    
    Object.entries(issuesBySeverity).forEach(([severity, severityIssues]) => {
      if (severityIssues.length > 0) {
        markdown += `### ${severity.toUpperCase()} Priority (${severityIssues.length})\n\n`;
        severityIssues.forEach(issue => {
          markdown += `- **${issue.issue}:** ${issue.description}`;
          if (issue.wcag) markdown += ` (WCAG: ${issue.wcag})`;
          markdown += `\n`;
        });
        markdown += `\n`;
      }
    });
    
    return markdown;
  }
}

module.exports = UXOrchestrator;