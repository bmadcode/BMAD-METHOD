/**
 * Context filtering for token optimization
 * Uses only Node.js built-in modules
 */

const MAX_CONTEXT_LENGTH = 2000; // Characters, not tokens
const MAX_CRITERIA_ITEMS = 10;

function filterContext(content, prompt = '') {
  if (!content || content.length <= MAX_CONTEXT_LENGTH) {
    return content;
  }
  
  // Priority sections based on prompt keywords
  const sections = extractSections(content);
  const priorities = calculatePriorities(sections, prompt);
  
  // Build filtered content within size limit
  let filtered = '';
  let remaining = MAX_CONTEXT_LENGTH;
  
  for (const [section, priority] of priorities) {
    if (section.content.length <= remaining) {
      filtered += `\n${section.title}\n${section.content}\n`;
      remaining -= section.content.length;
    } else if (remaining > 100) {
      // Truncate section to fit
      const truncated = section.content.substring(0, remaining - 50) + '...';
      filtered += `\n${section.title}\n${truncated}\n`;
      break;
    }
  }
  
  return filtered.trim();
}

function filterAcceptanceCriteria(criteria) {
  if (!criteria) return criteria;
  
  const lines = criteria.split('\n');
  const items = [];
  let currentItem = '';
  
  for (const line of lines) {
    if (line.match(/^\d+\.|^-|^\*/)) {
      if (currentItem) {
        items.push(currentItem.trim());
      }
      currentItem = line;
    } else {
      currentItem += '\n' + line;
    }
  }
  
  if (currentItem) {
    items.push(currentItem.trim());
  }
  
  // Take most important items
  if (items.length > MAX_CRITERIA_ITEMS) {
    return items.slice(0, MAX_CRITERIA_ITEMS).join('\n') + 
           `\n... (${items.length - MAX_CRITERIA_ITEMS} more items)`;
  }
  
  return items.join('\n');
}

function extractSections(content) {
  const sections = [];
  const sectionRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;
  let lastIndex = 0;
  let lastTitle = '';
  
  while ((match = sectionRegex.exec(content)) !== null) {
    if (lastTitle) {
      sections.push({
        title: lastTitle,
        content: content.substring(lastIndex, match.index).trim(),
        level: lastTitle.match(/^#+/)[0].length
      });
    }
    lastTitle = match[0];
    lastIndex = match.index + match[0].length;
  }
  
  // Add last section
  if (lastTitle) {
    sections.push({
      title: lastTitle,
      content: content.substring(lastIndex).trim(),
      level: lastTitle.match(/^#+/)[0].length
    });
  }
  
  return sections;
}

function calculatePriorities(sections, prompt) {
  const promptLower = prompt.toLowerCase();
  const keywords = {
    implementation: ['implement', 'code', 'develop', 'build', 'create'],
    testing: ['test', 'spec', 'validate', 'verify'],
    acceptance: ['criteria', 'requirement', 'acceptance', 'must'],
    notes: ['note', 'important', 'critical', 'warning']
  };
  
  const scored = sections.map(section => {
    let score = 0;
    const sectionLower = (section.title + ' ' + section.content).toLowerCase();
    
    // Check keyword matches
    for (const [category, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (promptLower.includes(word)) {
          score += sectionLower.includes(word) ? 3 : 0;
        }
        if (sectionLower.includes(word)) {
          score += 1;
        }
      }
    }
    
    // Prioritize acceptance criteria and dev notes
    if (section.title.toLowerCase().includes('acceptance')) score += 5;
    if (section.title.toLowerCase().includes('dev note')) score += 4;
    if (section.title.toLowerCase().includes('critical')) score += 3;
    
    // Deprioritize certain sections
    if (section.title.toLowerCase().includes('change log')) score -= 5;
    if (section.title.toLowerCase().includes('qa result')) score -= 3;
    
    return [section, score];
  });
  
  // Sort by score descending
  return scored.sort((a, b) => b[1] - a[1]);
}

module.exports = {
  filterContext,
  filterAcceptanceCriteria
};