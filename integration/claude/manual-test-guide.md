# Manual Testing Guide with o3 Judge

Since automated Claude testing can be complex due to session management, here's a comprehensive manual testing approach with o3 evaluation.

## Quick Manual Test Process

### 1. Setup Test Environment

```bash
# Ensure agents are built
npm run build:claude

# Verify agent files exist
ls .claude/agents/

# Start Claude Code
claude
```

### 2. Test Each Agent Manually

Run these prompts in Claude Code and copy the responses for evaluation:

#### Test 1: Analyst Agent
**Prompt:**
```
Use the analyst subagent to help me research the competitive landscape for AI project management tools.
```

**Expected Behaviors:**
- Agent identifies as Mary or Business Analyst
- Shows analytical methodology or structured approach
- References market research or competitive analysis expertise
- May mention BMAD templates or systematic workflow

#### Test 2: Dev Agent
**Prompt:**
```
Have the dev subagent implement a JWT authentication middleware with error handling.
```

**Expected Behaviors:**
- Provides actual code implementation
- Shows development expertise and best practices
- Includes proper error handling approach
- Demonstrates security awareness for JWT

#### Test 3: Architect Agent
**Prompt:**
```
Ask the architect subagent to design a microservices architecture for real-time notifications.
```

**Expected Behaviors:**
- Shows system architecture expertise
- Discusses microservices patterns and boundaries
- Considers real-time and scalability concerns
- Demonstrates technical depth appropriate for architect role

### 3. Record Results

For each test, record:
- Did the response come from the intended subagent?
- What evidence shows proper agent behavior?
- How well does it integrate BMAD methodology?
- Quality and relevance of the response

## Example Test Result for o3 Evaluation

Here's a sample response to demonstrate the evaluation process:

**Test Response (Analyst Agent):**
```
Hello! I'm Mary, your Business Analyst, and I'm excited to help you research the competitive landscape for AI project management tools.

Let me approach this systematically using proven market research methodology:

## Research Approach

1. **Competitive Analysis Framework**
   - Direct competitors (AI-first PM tools)
   - Indirect competitors (traditional PM tools adding AI)
   - Emerging players and startups

2. **Key Analysis Dimensions**
   - Feature sets and AI capabilities
   - Target markets and pricing
   - User experience and adoption
   - Technology stack and integrations

## Initial Competitive Landscape

### Direct AI-First Competitors
- **Monday.com AI**: Native AI features for task automation
- **Asana Intelligence**: AI-powered insights and automation
- **ClickUp AI**: AI writing assistant and task optimization

### Traditional Players with AI
- **Microsoft Project**: Adding Copilot integration
- **Atlassian (Jira)**: Intelligence features and automation
- **Notion**: AI writing and organization features

Would you like me to use the BMAD market research template to create a more detailed competitive analysis? I can help you:

1. Create a comprehensive competitor analysis document
2. Perform detailed feature mapping
3. Identify market gaps and opportunities
4. Research pricing and positioning strategies

Which aspect would you like to explore first?
```

## Using o3 Judge for Evaluation

I'll now use the Oracle (o3) to evaluate this sample response:
