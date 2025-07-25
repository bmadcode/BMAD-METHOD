/**
 * Stdin reader for Claude Code hooks
 * Handles JSON input from Claude Code via stdin
 */

async function readStdinJson() {
  return new Promise((resolve) => {
    let data = '';
    
    process.stdin.on('data', chunk => {
      data += chunk;
    });
    
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        // Return empty object on parse error
        resolve({});
      }
    });
    
    process.stdin.on('error', () => {
      resolve({});
    });
  });
}

module.exports = { readStdinJson };