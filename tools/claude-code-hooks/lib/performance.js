/**
 * Performance monitoring for BMAD hooks
 * Uses only Node.js built-in modules
 */

const { performance } = require('perf_hooks');

class PerformanceMonitor {
  constructor(hookName) {
    this.hookName = hookName;
    this.startTime = performance.now();
  }
  
  end() {
    const duration = performance.now() - this.startTime;
    
    // Log if debug mode or if too slow
    if (process.env.BMAD_HOOKS_DEBUG || duration > 500) {
      console.error(`[BMAD ${this.hookName}] Execution time: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }
  
  static async measure(hookName, fn) {
    const monitor = new PerformanceMonitor(hookName);
    try {
      const result = await fn();
      monitor.end();
      return result;
    } catch (error) {
      monitor.end();
      throw error;
    }
  }
}

module.exports = PerformanceMonitor;