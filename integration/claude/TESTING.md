# End-to-End Testing Guide for BMAD Claude Integration

This guide provides comprehensive testing scenarios to validate the Claude Code subagents integration.

## Test Environment Setup

### 1. Create Fresh Test Project

```bash
# Create new test directory
mkdir ~/bmad-claude-test
cd ~/bmad-claude-test

# Initialize basic project structure
mkdir -p src docs tests
echo "# Test Project for BMAD Claude Integration" > README.md

# Clone BMAD method (or copy existing)
git clone https://github.com/24601/BMAD-AT-CLAUDE.git
cd BMAD-AT-CLAUDE

# Install dependencies and build Claude agents
npm install
npm run build:claude
```

### 2. Verify Claude Code Installation

```bash
# Check Claude Code is available
claude --version

# Verify we're in the right directory with .claude/agents/
ls -la .claude/agents/
```

### 3. Start Claude Code Session

```bash
# Start Claude Code in project root
claude

# Should show available subagents
/agents
```

## Core Agent Testing

### Test 1: Analyst Agent - Market Research

**Prompt:**
```
Use the analyst subagent to help me research the market for AI-powered project management tools. I want to understand the competitive landscape and identify key market gaps.
```

**Expected Behavior:**
- Agent introduces itself as Mary, Business Analyst
- Offers to use market research templates
- Accesses BMAD dependencies using Read tool
- Provides structured analysis approach

**Validation:**
- [ ] Agent stays in character as Mary
- [ ] References BMAD templates/tasks appropriately
- [ ] Uses numbered lists for options
- [ ] Accesses files via Read tool when needed

### Test 2: Architect Agent - System Design

**Prompt:**
```
Ask the architect subagent to design a microservices architecture for a multi-tenant SaaS platform with user authentication, billing, and analytics.
```

**Expected Behavior:**
- Agent focuses on technical architecture
- Considers scalability and system boundaries
- May reference BMAD architecture templates
- Provides detailed technical recommendations

**Validation:**
- [ ] Technical depth appropriate for architect role
- [ ] System thinking and architectural patterns
- [ ] References to BMAD resources when relevant

### Test 3: Dev Agent - Implementation

**Prompt:**
```
Have the dev subagent implement a JWT authentication middleware in Node.js with proper error handling and logging.
```

**Expected Behavior:**
- Focuses on practical implementation
- Writes actual code
- Considers best practices and error handling
- May suggest testing approaches

**Validation:**
- [ ] Produces working code
- [ ] Follows security best practices
- [ ] Includes proper error handling

## BMAD Integration Testing

### Test 4: Story File Workflow

**Setup:**
```bash
# Create a sample story file
mkdir -p stories
cat > stories/user-auth.story.md << 'EOF'
# User Authentication Story

## Overview
Implement secure user authentication system with JWT tokens.

## Acceptance Criteria
- [ ] User can register with email/password
- [ ] User can login and receive JWT token
- [ ] Protected routes require valid token
- [ ] Token refresh mechanism

## Technical Notes
- Use bcrypt for password hashing
- JWT expiry: 15 minutes
- Refresh token expiry: 7 days
EOF
```

**Prompt:**
```
Use the dev subagent to implement the user authentication story in stories/user-auth.story.md. Follow the acceptance criteria exactly.
```

**Expected Behavior:**
- Agent reads the story file using Read tool
- Implements according to acceptance criteria
- References story context throughout implementation

**Validation:**
- [ ] Agent reads story file correctly
- [ ] Implementation matches acceptance criteria
- [ ] Maintains story context during conversation

### Test 5: BMAD Template Usage

**Prompt:**
```
Use the analyst subagent to create a project brief using the BMAD project-brief template for an AI-powered customer support chatbot.
```

**Expected Behavior:**
- Agent accesses BMAD templates using Read tool
- Uses project-brief-tmpl.yaml structure
- Guides user through template completion
- Follows BMAD workflow patterns

**Validation:**
- [ ] Accesses correct template file
- [ ] Follows template structure
- [ ] Maintains BMAD methodology

## Agent Collaboration Testing

### Test 6: Multi-Agent Workflow

**Prompt:**
```
I want to build a new feature for real-time notifications. First use the analyst to research notification patterns, then have the architect design the system, and finally ask the pm to create a project plan.
```

**Expected Behavior:**
- Sequential agent handoffs
- Each agent maintains context from previous work
- Cross-references between agent outputs
- Coherent end-to-end workflow

**Validation:**
- [ ] Smooth agent transitions
- [ ] Context preservation across agents
- [ ] Workflow coherence
- [ ] Each agent stays in character

### Test 7: Agent Memory Persistence

**Setup:**
```bash
# Start conversation with analyst
# Make some decisions and progress
# Exit and restart Claude Code session
```

**Test:**
1. Have conversation with analyst about market research
2. Exit Claude Code
3. Restart Claude Code  
4. Continue conversation - check if context preserved

**Expected Behavior:**
- Agent memory files store key decisions
- Context partially preserved across sessions
- Agent references previous conversation appropriately

## Error Handling and Edge Cases

### Test 8: Invalid File Access

**Prompt:**
```
Use the analyst subagent to read the file bmad-core/nonexistent-file.md
```

**Expected Behavior:**
- Graceful error handling
- Suggests alternative files or approaches
- Maintains agent persona during error

**Validation:**
- [ ] No crashes or errors
- [ ] Helpful error messages
- [ ] Agent stays in character

### Test 9: Tool Permission Testing

**Prompt:**
```
Use the dev subagent to create a new file in the src/ directory with a sample API endpoint.
```

**Expected Behavior:**
- Agent attempts to use available tools
- If create_file not available, suggests alternatives
- Provides code that could be manually created

**Validation:**
- [ ] Respects tool limitations
- [ ] Provides alternatives when tools unavailable
- [ ] Clear about what actions are possible

### Test 10: Context Window Management

**Setup:**
```bash
# Create large content files to test context limits
mkdir -p test-content
for i in {1..50}; do
  echo "This is test content line $i with enough text to make it substantial and test context window management capabilities. Adding more text to make each line longer and test how agents handle large content volumes." >> test-content/large-file.md
done
```

**Prompt:**
```
Use the analyst subagent to analyze all the content in the test-content/ directory and summarize the key insights.
```

**Expected Behavior:**
- Agent uses tools to access content incrementally
- Doesn't load everything into context at once
- Provides meaningful analysis despite size constraints

**Validation:**
- [ ] Efficient tool usage
- [ ] No context overflow errors
- [ ] Meaningful output despite constraints

## Performance and Usability Testing

### Test 11: Response Time

**Test Multiple Prompts:**
- Time each agent invocation
- Measure response quality vs speed
- Test with different complexity levels

**Metrics:**
- [ ] Initial agent load time < 10 seconds
- [ ] Subsequent responses < 30 seconds
- [ ] Quality maintained across response times

### Test 12: User Experience

**Prompts to Test:**
```
# Ambiguous request
> Help me with my project

# Complex multi-step request  
> I need to build a complete authentication system from scratch

# Domain-specific request
> Create unit tests for my React components
```

**Expected Behavior:**
- Appropriate agent selection or clarification requests
- Clear guidance on next steps
- Professional communication

**Validation:**
- [ ] Appropriate agent routing
- [ ] Clear communication
- [ ] Helpful responses to ambiguous requests

## Validation Checklist

### Agent Behavior ✅
- [ ] Each agent maintains distinct persona
- [ ] Agents stay in character throughout conversations
- [ ] Appropriate expertise demonstrated
- [ ] BMAD methodology preserved

### Tool Integration ✅
- [ ] Read tool accesses BMAD files correctly
- [ ] Grep searches work across codebase
- [ ] codebase_search_agent provides relevant results
- [ ] File paths resolved correctly

### Context Management ✅
- [ ] Agents start with minimal context
- [ ] On-demand loading works properly
- [ ] Memory files created and maintained
- [ ] No context overflow errors

### BMAD Integration ✅
- [ ] Original BMAD workflows preserved
- [ ] Templates and tasks accessible
- [ ] Story-driven development supported
- [ ] Cross-agent collaboration maintained

### Error Handling ✅
- [ ] Graceful handling of missing files
- [ ] Clear error messages
- [ ] Recovery suggestions provided
- [ ] No system crashes

## Automated Testing Script

```bash
#!/bin/bash
# automated-test.sh

echo "🚀 Starting BMAD Claude Integration Tests..."

# Test 1: Build verification
echo "📋 Test 1: Build verification"
npm run build:claude
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Test 2: Agent file validation
echo "📋 Test 2: Agent file validation"
cd integration/claude
npm run validate
if [ $? -eq 0 ]; then
    echo "✅ Validation successful"
else
    echo "❌ Validation failed"
    exit 1
fi

# Test 3: File structure verification
echo "📋 Test 3: File structure verification"
cd ../..
required_files=(
    ".claude/agents/analyst.md"
    ".claude/agents/architect.md"
    ".claude/agents/dev.md"
    ".claude/agents/pm.md"
    ".claude/agents/qa.md"
    ".claude/agents/sm.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo "🎉 All automated tests passed!"
echo "📝 Manual testing required for agent conversations"
```

## Manual Test Report Template

```markdown
# BMAD Claude Integration Test Report

**Date:** ___________
**Tester:** ___________  
**Claude Code Version:** ___________

## Test Results Summary
- [ ] All agents load successfully
- [ ] Agent personas maintained
- [ ] BMAD integration working
- [ ] Tool access functional
- [ ] Error handling appropriate

## Detailed Results

### Agent Tests
- [ ] Analyst: ✅/❌ - Notes: ___________
- [ ] Architect: ✅/❌ - Notes: ___________
- [ ] Dev: ✅/❌ - Notes: ___________
- [ ] PM: ✅/❌ - Notes: ___________
- [ ] QA: ✅/❌ - Notes: ___________
- [ ] SM: ✅/❌ - Notes: ___________

### Integration Tests  
- [ ] Story workflow: ✅/❌
- [ ] Template usage: ✅/❌
- [ ] Multi-agent flow: ✅/❌

### Issues Found
1. ___________
2. ___________
3. ___________

## Recommendations
___________
```

## Next Steps After Testing

1. **Fix Issues**: Address any problems found during testing
2. **Performance Optimization**: Improve response times if needed
3. **Documentation Updates**: Clarify usage based on test learnings
4. **User Feedback**: Gather feedback from real users
5. **Iteration**: Refine agents based on testing results
