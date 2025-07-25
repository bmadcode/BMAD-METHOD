---
name: 🐛 Bug Report
about: Report a bug in the BMAD Claude integration
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''
---

# 🐛 Bug Report

## 📋 Summary
<!-- A clear and concise description of what the bug is -->

## 🎭 Affected Component
<!-- Check all that apply -->
- [ ] 📊 Analyst Agent (Mary)
- [ ] 🏗️ Architect Agent (Winston)
- [ ] 👨‍💻 Dev Agent (James)
- [ ] 📋 PM Agent (John)
- [ ] 🔍 QA Agent (Quinn)
- [ ] 🎯 Scrum Master Agent (Bob)
- [ ] 🛠️ Build System (`npm run build:claude`)
- [ ] 🧪 Testing Framework
- [ ] 📚 Documentation
- [ ] 🔄 Cross-agent workflows
- [ ] 💾 Memory/persistence
- [ ] 📁 BMAD integration

## 🔄 Steps to Reproduce
<!-- Steps to reproduce the behavior -->
1. Run `npm run build:claude`
2. Start Claude Code with `claude`
3. Execute command: '...'
4. See error

## ✅ Expected Behavior
<!-- A clear and concise description of what you expected to happen -->

## ❌ Actual Behavior
<!-- A clear and concise description of what actually happened -->

## 📸 Screenshots/Output
<!-- If applicable, add screenshots or command output to help explain your problem -->
```
<!-- Paste error output or logs here -->
```

## 🖥️ Environment
<!-- Please complete the following information -->

### System Information
- **OS**: [e.g. macOS 14.6, Windows 11, Ubuntu 22.04]
- **Node.js Version**: [e.g. v20.5.0]
- **npm Version**: [e.g. 9.8.0]
- **Claude Code Version**: [run `claude --version`]

### BMAD Integration Version
- **BMAD Method Version**: [check package.json version]
- **Integration Build**: [when did you last run `npm run build:claude`?]
- **Git Commit**: [run `git rev-parse HEAD`]

### File State
- [ ] `.claude/agents/` directory exists
- [ ] All 6 agent files present (analyst, architect, dev, pm, qa, sm)
- [ ] `npm run validate` passes in integration/claude

## 🔧 Configuration
<!-- Any relevant configuration details -->

### Agent Configuration
- **Custom modifications**: [Yes/No - describe any changes made]
- **Tool permissions**: [any custom tool configurations]
- **Memory settings**: [any custom memory configurations]

### Build Configuration
- **Custom templates**: [any modifications to agent.mustache]
- **Custom BMAD data**: [any additions to bmad-core/data/]
- **Environment variables**: [any relevant env vars]

## 🧪 Attempted Solutions
<!-- What have you tried to fix this issue? -->
- [ ] Rebuilt agents with `npm run build:claude`
- [ ] Cleared `.claude` directory and rebuilt
- [ ] Restarted Claude Code
- [ ] Checked for Claude Code updates
- [ ] Verified Node.js version compatibility
- [ ] Reviewed error logs

## 📋 Additional Context
<!-- Add any other context about the problem here -->

### Error Frequency
- [ ] Happens every time
- [ ] Happens sometimes
- [ ] Happened once
- [ ] Only in specific scenarios

### Impact Level
- [ ] 🔥 Critical - Blocks all functionality
- [ ] 🟠 High - Blocks major functionality  
- [ ] 🟡 Medium - Workaround available
- [ ] 🟢 Low - Minor inconvenience

### Workarounds
<!-- Any workarounds you've discovered -->

## 🤝 Contribution
<!-- Would you like to help fix this? -->
- [ ] I'd like to work on fixing this issue
- [ ] I can provide additional testing
- [ ] I have ideas for the solution
- [ ] I need guidance on how to help

---

**Please ensure you've:**
- [ ] Searched existing issues to avoid duplicates
- [ ] Provided all requested information
- [ ] Used a descriptive title
- [ ] Included steps to reproduce the issue
