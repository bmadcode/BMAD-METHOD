# How to Contribute with Pull Requests

**New to GitHub and pull requests?** This guide will walk you through the basics step by step.

## What is a Pull Request?

A pull request (PR) is how you propose changes to a project on GitHub. Think of it as saying "Here are some changes I'd like to make - please review and consider adding them to the main project."

## Before You Start

⚠️ **Important**: Please keep your contributions small and focused! We prefer many small, clear changes rather than one massive change.

**Required before submitting PRs:**

- **For bug fixes**: Create an issue using the [bug report template](https://github.com/bmadcode/bmad-method/issues/new?template=bug_report.md)
- **For new features**:
  1. Discuss in Discord [#general-dev channel](https://discord.gg/gk8jAdXWmj)
  2. Create an issue using the [feature request template](https://github.com/bmadcode/bmad-method/issues/new?template=feature_request.md)
- **For large changes**: Always open an issue first to discuss alignment

## Step-by-Step Guide

### 1. Fork the Repository

1. Go to the [BMad-Method repository](https://github.com/bmadcode/bmad-method)
2. Click the "Fork" button in the top-right corner
3. This creates your own copy of the project

### 2. Clone Your Fork

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/bmad-method.git
cd bmad-method
```

### 3. Create a New Branch

**Never work directly on the `main` branch!** Always create a new branch for your changes:

```bash
# Create and switch to a new branch
git checkout -b fix/typo-in-readme
# or
git checkout -b feature/add-new-agent
```

**Branch naming tips:**

- `fix/description` - for bug fixes
- `feature/description` - for new features
- `docs/description` - for documentation changes

### 4. Make Your Changes

- Edit the files you want to change
- Keep changes small and focused on one thing
- Test your changes if possible

### 5. Commit Your Changes

```bash
# Add your changes
git add .

# Commit with a clear message
git commit -m "Fix typo in README.md"
```

**Good commit messages:**

- "Fix typo in installation instructions"
- "Add example for new agent usage"
- "Update broken link in docs"

**Bad commit messages:**

- "stuff"
- "changes"
- "update"

### 6. Push to Your Fork

```bash
# Push your branch to your fork
git push origin fix/typo-in-readme
```

### 7. Create the Pull Request

1. Go to your fork on GitHub
2. You'll see a green "Compare & pull request" button - click it
3. Select the correct target branch:
   - **`next` branch** for most contributions (features, docs, enhancements)
   - **`main` branch** only for critical fixes
4. Fill out the PR description using the template in CONTRIBUTING.md:
   - **What**: 1-2 sentences describing what changed
   - **Why**: 1-2 sentences explaining why
   - **How**: 2-3 bullets on implementation
   - **Testing**: How you tested
5. Reference the related issue number (e.g., "Fixes #123")

### 8. Wait for Review

- A maintainer will review your PR
- They might ask for changes
- Be patient and responsive to feedback

## What Makes a Good Pull Request?

✅ **Good PRs:**

- Change one thing at a time
- Have clear, descriptive titles
- Explain what and why in the description
- Include only the files that need to change

❌ **Avoid:**

- Changing formatting of entire files
- Multiple unrelated changes in one PR
- Copying your entire project/repo into the PR
- Changes without explanation

## Common Mistakes to Avoid

1. **Don't reformat entire files** - only change what's necessary
2. **Don't include unrelated changes** - stick to one fix/feature per PR
3. **Don't paste code in issues** - create a proper PR instead
4. **Don't submit your whole project** - contribute specific improvements

## Need Help?

- 💬 Join our [Discord Community](https://discord.gg/gk8jAdXWmj) for real-time help:
  - **#general-dev** - Technical questions and feature discussions
  - **#bugs-issues** - Get help with bugs before filing issues
- 💬 Ask questions in [GitHub Discussions](https://github.com/bmadcode/bmad-method/discussions)
- 🐛 Report bugs using the [bug report template](https://github.com/bmadcode/bmad-method/issues/new?template=bug_report.md)
- 💡 Suggest features using the [feature request template](https://github.com/bmadcode/bmad-method/issues/new?template=feature_request.md)
- 📖 Read the full [Contributing Guidelines](../CONTRIBUTING.md)

## Example: Good vs Bad PRs

### 😀 Good PR Example

**Title**: "Fix broken link to installation guide"
**Changes**: One file, one line changed
**Description**: "The link in README.md was pointing to the wrong file. Updated to point to correct installation guide."

### 😞 Bad PR Example

**Title**: "Updates"
**Changes**: 50 files, entire codebase reformatted
**Description**: "Made some improvements"

---

**Remember**: We're here to help! Don't be afraid to ask questions. Every expert was once a beginner.
