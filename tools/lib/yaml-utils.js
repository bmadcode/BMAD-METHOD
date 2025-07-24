/**
 * Utility functions for YAML extraction from agent files
 */

/**
 * Extract YAML content from agent markdown files
 * @param {string} agentContent - The full content of the agent file
 * @param {boolean} cleanCommands - Whether to clean command descriptions (default: false)
 * @returns {string|null} - The extracted YAML content or null if not found
 */
function extractYamlFromAgent(agentContent, cleanCommands = false) {
  // Remove carriage returns and match YAML block
  const yamlMatch = agentContent.replace(/\r/g, "").match(/```ya?ml\n([\s\S]*?)\n```/);
  if (!yamlMatch) return null;
  
  let yamlContent = yamlMatch[1].trim();
  
  // Clean up command descriptions if requested
  // Converts "- command - description" to just "- command"
  if (cleanCommands) {
    yamlContent = yamlContent.replace(/^(\s*-)(\s*"[^"]+")(\s*-\s*.*)$/gm, '$1$2');
  }
  
  return yamlContent;
}

module.exports = {
  extractYamlFromAgent
};