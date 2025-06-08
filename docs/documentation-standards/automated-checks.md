# Automated Documentation Checks

## Overview

This document outlines the automated checks implemented to ensure all BMAD Method documentation meets our quality standards. These checks run automatically during the documentation review process and must pass before documentation can be published.

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- Access to the BMAD documentation repository

### Installation

```bash
# Clone the repository
git clone https://github.com/bmad-method/documentation.git

# Install dependencies
cd documentation
npm install
```

## Available Checks

### 1. Markdown Linting

We use `markdownlint` to enforce consistent markdown formatting.

```bash
# Run markdown linting
npm run lint:md
```

#### Rules Enforced:

- MD001: Header levels should only increment by one level at a time
- MD003: Header style (ATX-style headers)
- MD004: Unordered list style (consistent markers)
- MD007: Unordered list indentation
- MD009: No trailing spaces
- MD010: No hard tabs
- MD011: No reversed link syntax
- MD012: Multiple consecutive blank lines
- MD013: Line length (flexible limit: 120 characters)
- MD018: No space after hash on atx style header
- MD019: Multiple spaces after hash on atx style header
- MD022: Headers should be surrounded by blank lines
- MD023: Headers must start at the beginning of the line
- MD025: Single title/h1 per file
- MD031: Fenced code blocks should be surrounded by blank lines
- MD032: Lists should be surrounded by blank lines
- MD034: No bare URLs
- MD037: No spaces inside emphasis markers
- MD038: No spaces inside code span elements
- MD039: No spaces inside link text
- MD040: Fenced code blocks should have a language specified
- MD041: First line in file should be a top level header
- MD047: Files should end with a single newline character

### 2. Spelling Check

We use `cspell` to check for spelling errors.

```bash
# Run spell check
npm run lint:spell
```

#### Features:

- Custom dictionary for BMAD-specific terminology
- Support for code snippets and technical terms
- Ignores URLs and code blocks
- Suggests corrections for misspelled words

### 3. Link Validation

We use a custom script to validate all links in the documentation.

```bash
# Run link validation
npm run lint:links
```

#### Checks:

- Internal links point to valid files
- External links are reachable (200 OK response)
- No broken anchor links
- No duplicate links
- No empty links

### 4. Accessibility Checks

We use `a11y` to check for accessibility issues.

```bash
# Run accessibility checks
npm run lint:a11y
```

#### Checks:

- Alt text for images
- Proper heading structure
- Sufficient color contrast
- Proper use of ARIA attributes
- Keyboard navigability

### 5. Style Guide Compliance

We use a custom script to check compliance with our style guide.

```bash
# Run style guide compliance check
npm run lint:style
```

#### Checks:

- Proper use of voice and tone
- Consistent terminology
- Proper use of formatting
- Adherence to file organization standards
- Consistent use of persona terminology

## CI/CD Integration

These checks are integrated into our CI/CD pipeline and run automatically on pull requests.

```yaml
# Example GitHub Actions workflow
name: Documentation Checks

on:
  pull_request:
    paths:
      - '**/*.md'
      - 'docs/**'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm install
      - run: npm run lint:md
      - run: npm run lint:spell
      - run: npm run lint:links
      - run: npm run lint:a11y
      - run: npm run lint:style
```

## Pre-commit Hooks

You can set up pre-commit hooks to run these checks locally before committing:

```bash
# Install husky
npm install husky --save-dev

# Set up pre-commit hook
npx husky add .husky/pre-commit "npm run lint:all"
```

## Troubleshooting

### Common Issues

1. **Markdown Linting Errors**
   - Run `npm run lint:md -- --fix` to automatically fix some issues
   - Consult the [markdownlint documentation](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) for specific rule explanations

2. **Spelling Errors**
   - Add custom terms to `.cspell.json`
   - Use `// cspell:ignore term` for inline exceptions

3. **Link Validation Errors**
   - Check for typos in URLs
   - Ensure internal links use relative paths
   - Verify external resources are available

4. **Accessibility Issues**
   - Add alt text to all images
   - Maintain proper heading hierarchy
   - Use sufficient color contrast

## Reporting Issues

If you encounter problems with the automated checks, please:

1. Create an issue in the [BMAD Documentation Issues](https://github.com/bmad-method/documentation/issues) repository
2. Include the specific check that failed
3. Provide the error message and context
4. Suggest a potential solution if available

---

*This document is maintained by the BMAD Documentation Team. Last updated: Current Date.*
