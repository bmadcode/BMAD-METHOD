# BMAD-METHOD Claude Code Integration - Quick Start Guide

## 🚀 Installation (2 minutes)

```bash
# Clone the BMAD-METHOD repository (if not already done)
git clone https://github.com/yourusername/BMAD-METHOD.git
cd BMAD-METHOD/bmad-claude-integration

# Install dependencies
npm install

# Run the installer
npm run install:local
```

When prompted:
- Install hooks? → Type `y` for enhanced features
- Overwrite existing? → Type `y` if updating

## 🎯 Basic Usage

### Natural Language (Recommended)

Just describe what you need:

```
You: Create user stories for a shopping cart feature
```

Claude will:
1. Route to the PM agent automatically
2. Ask clarifying questions
3. Generate professional user stories

### Direct Commands

Use slash commands for specific agents:

```
/bmad-architect Design a microservices architecture
/bmad-pm Create an epic for mobile app
/bmad-qa Create test plan for payment system
```

## 🔄 Managing Multiple Agents

### View Active Sessions
```
/bmad-sessions
```

Output:
```
🟢 1. 📋 Project Manager - Active
🟡 2. 🏗️ Architect - Suspended
```

### Switch Between Agents
```
/switch 2
```

## 💬 Elicitation Example

When agents need information:

```
📋 **Project Manager Question**
─────────────────────────────────
What type of users will use this feature?

*Responding to Project Manager in session session-abc123*
```

Just respond naturally:
```
You: B2B customers and internal admin users
```

## 🎨 Common Workflows

### 1. Start a New Project
```
You: I need to build an e-commerce platform MVP
PM: [Creates initial epic and stories]
You: Now design the architecture
Architect: [Creates technical architecture]
```

### 2. Add a Feature
```
You: Add social login to our existing auth system
PM: What providers do you need?
You: Google and GitHub
PM: [Creates focused user story]
```

### 3. Technical Review
```
You: Review this API design [paste OpenAPI spec]
Architect: [Analyzes and provides feedback]
You: Create stories for the improvements
PM: [Creates improvement stories]
```

## 🛠️ Pro Tips

1. **Let Claude Route**: Don't specify agents unless needed
2. **Use Sessions**: Keep related work in the same session
3. **Natural Responses**: No special syntax for elicitation
4. **Context Carries**: Information flows between agents

## ❓ Troubleshooting

### "No active sessions"
- Start with a natural request
- Claude will create sessions automatically

### "Agent not found"
- Check available agents: `/bmad-sessions`
- Use natural language instead

### "Context lost"
- Sessions preserve context
- Use `/switch` to return to a session

## 📚 Learn More

- Full documentation: [README.md](README.md)
- Usage scenarios: [realistic-usage-scenarios.md](tests/scenarios/realistic-usage-scenarios.md)
- Success metrics: [bmad-success-metrics.md](tests/scenarios/bmad-success-metrics.md)

## 🗑️ Uninstallation

To remove the BMAD integration:

```bash
cd BMAD-METHOD/bmad-claude-integration
npm run uninstall
```

This safely removes all BMAD components while preserving your Claude Code installation.

## 🎉 Ready to Start!

Just start typing your request. Claude will handle the rest!

```
You: Help me plan a sprint for next week
```

---

*Need help? Just ask "How do I..." and Claude will guide you!*