# BMAD Documentation Contribution Guidelines

## Overview

This document outlines the process for contributing to the BMAD Method documentation. Following these guidelines ensures a smooth review process and maintains the high quality of our documentation.

## Getting Started

### Prerequisites

- GitHub account
- Basic knowledge of Markdown
- Familiarity with the BMAD Method
- Understanding of the documentation structure

### Setting Up Your Environment

1. Fork the [BMAD Documentation repository](https://github.com/bmad-method/documentation)
2. Clone your fork locally
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up pre-commit hooks:
   ```bash
   npm run prepare
   ```

## Contribution Process

### 1. Find or Create an Issue

- Check existing issues in the [issue tracker](https://github.com/bmad-method/documentation/issues)
- If your contribution doesn't match an existing issue, create a new one
- Wait for issue assignment or approval before starting work

### 2. Create a Branch

- Create a branch from `main` with a descriptive name:
  ```bash
  git checkout -b doc/add-developer-guide
  ```
- Use prefixes to indicate the type of change:
  - `doc/` for documentation additions
  - `fix/` for documentation fixes
  - `update/` for documentation updates
  - `review/` for review changes

### 3. Make Your Changes

- Follow the [Style Guide](./style-guide.md)
- Run automated checks locally:
  ```bash
  npm run lint:all
  ```
- Test your changes by building the documentation locally:
  ```bash
  npm run docs:build
  npm run docs:serve
  ```

### 4. Commit Your Changes

- Use conventional commit messages:
  ```
  docs(persona): add developer integration guide
  
  - Add detailed setup instructions
  - Include code examples
  - Add troubleshooting section
  
  Closes #123
  ```
- Keep commits focused and atomic
- Reference issues in commit messages

### 5. Submit a Pull Request

- Push your branch to your fork
- Create a pull request against the `main` branch
- Fill out the pull request template completely
- Request review from appropriate team members
- Address review feedback promptly

### 6. Review Process

All contributions go through a review process:

1. **Automated Checks**: CI/CD pipeline runs linting, spelling, and link validation
2. **Peer Review**: At least one team member reviews the content
3. **Technical Review**: Subject matter experts verify technical accuracy
4. **Final Approval**: Documentation maintainer approves and merges

## Documentation Types

### New Documentation

When creating new documentation:

1. Use the appropriate template from the `templates/` directory
2. Follow the established directory structure
3. Include all required sections
4. Add entry to navigation if applicable
5. Create examples where appropriate

### Updates to Existing Documentation

When updating existing documentation:

1. Maintain the existing structure and style
2. Clearly mark deprecated content
3. Update related documentation as needed
4. Update the "Last Updated" date
5. Add changelog entry if significant

### Translations

When contributing translations:

1. Create files in the appropriate language directory
2. Maintain the same structure as the English version
3. Include language code in filename (e.g., `quickstart.fr.md`)
4. Update language selector in navigation

## Best Practices

### Content Guidelines

- Write for an international audience
- Use simple, clear language
- Provide context and examples
- Link to related documentation
- Include troubleshooting sections
- Consider the user's perspective and needs

### Technical Guidelines

- Test all code examples
- Verify command outputs
- Check compatibility across environments
- Include version information
- Provide alternative approaches where applicable

### Review Guidelines

- Be constructive and specific in feedback
- Suggest improvements rather than just pointing out issues
- Consider the author's intent
- Focus on content quality and accuracy
- Be timely in your reviews

## Recognition

Contributors are recognized in several ways:

- Listed in the [Contributors](../CONTRIBUTORS.md) file
- Mentioned in release notes
- Acknowledged in the documentation they contributed to

## Code of Conduct

All contributors must adhere to our [Code of Conduct](../CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## Questions and Support

If you have questions about contributing:

- Join our [Community Slack](https://bmad-method.slack.com)
- Email the documentation team at docs@bmad-method.org
- Ask in the #documentation channel on Slack
- Check the [FAQ](../FAQ.md) for common questions

---

*These contribution guidelines are maintained by the BMAD Documentation Team. Last updated: Current Date.*
