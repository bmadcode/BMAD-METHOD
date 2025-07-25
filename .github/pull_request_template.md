# BMAD Claude Integration - Pull Request

## 📋 Summary
<!-- Provide a brief description of the changes in this PR -->

## 🎯 Type of Change
<!-- Check all that apply -->
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation only changes
- [ ] 🔧 Refactoring (no functional changes, no api changes)
- [ ] ⚡ Performance improvements
- [ ] 🧪 Test improvements
- [ ] 🎭 Agent improvements (prompts, personas, capabilities)
- [ ] 🏗️ Build system changes
- [ ] 🔄 CI/CD changes

## 🎭 Agent Impact
<!-- If this affects Claude subagents, specify which ones -->
- [ ] 📊 Analyst (Mary)
- [ ] 🏗️ Architect (Winston)  
- [ ] 👨‍💻 Dev (James)
- [ ] 📋 PM (John)
- [ ] 🔍 QA (Quinn)
- [ ] 🎯 Scrum Master (Bob)
- [ ] 🛠️ Build system / templates
- [ ] 📁 BMAD core integration

## 🧪 Testing
<!-- Describe the tests you ran to verify your changes -->

### Automated Testing
- [ ] `npm run build:claude` passes
- [ ] `npm run test:claude` passes
- [ ] `npm run validate` passes (in integration/claude)
- [ ] All agent files generate without errors

### Manual Testing
- [ ] Tested affected agents in Claude Code
- [ ] Verified agent behavior matches expectations
- [ ] Tested cross-agent workflows (if applicable)
- [ ] Validated BMAD methodology integration

### Test Commands Used
```bash
# List the specific test commands you ran
```

### Test Results
<!-- Describe the results of your testing -->

## 📝 Checklist
<!-- Check all completed items -->

### Code Quality
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors

### Documentation
- [ ] I have made corresponding changes to the documentation
- [ ] I have updated README.md if needed
- [ ] I have updated integration/claude/README.md if needed
- [ ] Any new features are documented

### BMAD Integration
- [ ] Changes maintain BMAD methodology integrity
- [ ] Agent personas remain consistent with BMAD roles
- [ ] Template and task integrations work correctly
- [ ] Cross-agent collaboration still functions

### Compatibility
- [ ] Changes are compatible with existing Claude Code installations
- [ ] Original BMAD structure remains unmodified (clean separation)
- [ ] No breaking changes to existing agent configurations

## 🔗 Related Issues
<!-- Link any related issues -->
Fixes #(issue number)
Closes #(issue number)
Related to #(issue number)

## 📸 Screenshots
<!-- If applicable, add screenshots to help explain your changes -->

## 🤔 Additional Context
<!-- Add any other context about the pull request here -->

### Breaking Changes
<!-- If this is a breaking change, describe what breaks and why -->

### Migration Guide
<!-- If this requires migration steps, document them here -->

### Performance Impact
<!-- Describe any performance implications -->

## 📋 Reviewer Guidelines
<!-- Help reviewers focus on important aspects -->

### Focus Areas
- [ ] Agent prompt quality and BMAD integration
- [ ] Code architecture and maintainability
- [ ] Documentation completeness
- [ ] Test coverage and validation
- [ ] Compatibility and backwards compatibility

### Testing Instructions
<!-- Specific instructions for reviewers to test your changes -->

1. Build the agents: `npm run build:claude`
2. Run validation: `npm run test:claude`
3. Test specific agents: [provide specific test scenarios]
4. Verify [specific functionality]

---

**By submitting this PR, I confirm that:**
- [ ] I have read and agree to the [Contributing Guidelines](CONTRIBUTING.md)
- [ ] This contribution is my own work or properly attributed
- [ ] I understand this will be released under the MIT license
