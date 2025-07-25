/**
 * Simple in-memory cache for hook performance
 * Uses only Node.js built-in modules
 */

class Cache {
  constructor(ttlMs = 300000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttlMs;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  set(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }
  
  clear() {
    this.cache.clear();
  }
  
  // Clean expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

module.exports = Cache;