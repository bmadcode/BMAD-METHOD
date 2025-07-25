/**
 * File-level ignore support for BMAD hooks
 * Uses only Node.js built-in modules
 */

const fs = require('fs').promises;
const path = require('path');

class IgnoreManager {
  constructor() {
    this.ignorePatterns = new Set();
    this.loaded = false;
  }
  
  async load() {
    if (this.loaded) return;
    
    try {
      const content = await fs.readFile('.bmad-hooks-ignore', 'utf8');
      const lines = content.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          this.ignorePatterns.add(trimmed);
        }
      }
      
      this.loaded = true;
    } catch (error) {
      // No ignore file, that's fine
      this.loaded = true;
    }
  }
  
  async shouldIgnore(filePath) {
    await this.load();
    
    if (this.ignorePatterns.size === 0) return false;
    
    const normalizedPath = path.normalize(filePath).replace(/\\/g, '/');
    
    for (const pattern of this.ignorePatterns) {
      if (this.matchPattern(normalizedPath, pattern)) {
        return true;
      }
    }
    
    return false;
  }
  
  matchPattern(filePath, pattern) {
    // Simple glob-like matching
    if (pattern.includes('*')) {
      const regex = new RegExp(
        '^' + pattern
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*')
          .replace(/\?/g, '.') + '$'
      );
      return regex.test(filePath);
    }
    
    // Directory matching
    if (pattern.endsWith('/')) {
      return filePath.startsWith(pattern) || filePath.includes('/' + pattern);
    }
    
    // Exact or suffix matching
    return filePath === pattern || filePath.endsWith('/' + pattern);
  }
}

// Singleton instance
const ignoreManager = new IgnoreManager();

module.exports = ignoreManager;