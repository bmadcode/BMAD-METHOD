# CLAUDE.md

Don't be an ass kisser, don't glaze my donut, keep it to the point. Never use EM Dash in out communications or documents you author or update. Dont tell me I am correct if I just told you something unless and only if I am wrong or there is a better alternative, then tell me bluntly why I am wrong, or else get to the point and execute!

## Markdown Linting Conventions

Always follow these markdown linting rules:

- **Blank lines around headings**: Always leave a blank line before and after headings
- **Blank lines around lists**: Always leave a blank line before and after lists
- **Blank lines around code fences**: Always leave a blank line before and after fenced code blocks
- **Fenced code block languages**: All fenced code blocks must specify a language (use `text` for plain text)
- **Single trailing newline**: Files should end with exactly one newline character
- **No trailing spaces**: Remove any trailing spaces at the end of lines

## BMAD-METHOD Overview

BMAD-METHOD is an AI-powered Agile development framework that provides specialized AI agents for software development. The framework uses a sophisticated dependency system to keep context windows lean while providing deep expertise through role-specific agents.

## Essential Commands

### Build and Validation

```bash
npm run build              # Build all web bundles (agents and teams)
npm run build:agents       # Build agent bundles only
npm run build:teams        # Build team bundles only
npm run validate           # Validate all configurations
npm run format             # Format all markdown files with prettier
```

### Development and Testing

```bash
npx bmad-build build                # Alternative build command via CLI
npx bmad-build list:agents          # List all available agents
npx bmad-build validate             # Validate agent configurations
```

### Installation Commands

```bash
npx bmad-method install             # Install stable release (recommended)
npx bmad-method@beta install        # Install bleeding edge version
npx bmad-method@latest install      # Explicit stable installation
npx bmad-method@latest update       # Update stable installation
npx bmad-method@beta update         # Update bleeding edge installation
```

### Dual Publishing Strategy

The project uses a dual publishing strategy with automated promotion:

**Branch Strategy:**
- `main` branch: Bleeding edge development, auto-publishes to `@beta` tag
- `stable` branch: Production releases, auto-publishes to `@latest` tag

**Release Promotion:**
1. **Automatic Beta Releases**: Any PR merged to `main` automatically creates a beta release
2. **Manual Stable Promotion**: Use GitHub Actions to promote beta to stable

**Promote Beta to Stable:**
1. Go to GitHub Actions tab in the repository
2. Select "Promote to Stable" workflow
3. Click "Run workflow"
4. Choose version bump type (patch/minor/major)
5. The workflow automatically:
   - Merges main to stable
   - Updates version numbers
   - Triggers stable release to NPM `@latest`

**User Experience:**
- `npx bmad-method install` → Gets stable production version
- `npx bmad-method@beta install` → Gets latest beta features
- Team develops on bleeding edge without affecting production users

### Release and Version Management

```bash
npm run version:patch      # Bump patch version
npm run version:minor      # Bump minor version
npm run version:major      # Bump major version
npm run release           # Semantic release (CI/CD)
npm run release:test      # Test release configuration
```

### Version Management for Core and Expansion Packs

#### Bump All Versions (Core + Expansion Packs)

```bash
npm run version:all:major   # Major version bump for core and all expansion packs
npm run version:all:minor   # Minor version bump for core and all expansion packs (default)
npm run version:all:patch   # Patch version bump for core and all expansion packs
npm run version:all         # Defaults to minor bump
```

#### Individual Version Bumps

For BMad Core only:
```bash
npm run version:core:major  # Major version bump for core only
npm run version:core:minor  # Minor version bump for core only
npm run version:core:patch  # Patch version bump for core only
npm run version:core        # Defaults to minor bump
```

For specific expansion packs:
```bash
npm run version:expansion bmad-creator-tools       # Minor bump (default)
npm run version:expansion bmad-creator-tools patch # Patch bump
npm run version:expansion bmad-creator-tools minor # Minor bump
npm run version:expansion bmad-creator-tools major # Major bump

# Set specific version (old method, still works)
npm run version:expansion:set bmad-creator-tools 2.0.0
```

## Architecture and Code Structure

### Core System Architecture

The framework uses a **dependency resolution system** where agents only load the resources they need:

1. **Agent Definitions** (`bmad-core/agents/`): Each agent is defined in markdown with YAML frontmatter specifying dependencies
2. **Dynamic Loading**: The build system (`tools/lib/dependency-resolver.js`) resolves and includes only required resources
3. **Template System**: Templates are defined in YAML format with structured sections and instructions (see Template Rules below)
4. **Workflow Engine**: YAML-based workflows in `bmad-core/workflows/` define step-by-step processes

### Key Components

- **CLI Tool** (`tools/cli.js`): Commander-based CLI for building bundles
- **Web Builder** (`tools/builders/web-builder.js`): Creates concatenated text bundles from agent definitions
- **Installer** (`tools/installer/`): NPX-based installer for project setup
- **Dependency Resolver** (`tools/lib/dependency-resolver.js`): Manages agent resource dependencies

### Build System

The build process:

1. Reads agent/team definitions from `bmad-core/`
2. Resolves dependencies using the dependency resolver
3. Creates concatenated text bundles in `dist/`
4. Validates configurations during build

### Critical Configuration

**`bmad-core/core-config.yaml`** is the heart of the framework configuration:

- Defines document locations and expected structure
- Specifies which files developers should always load
- Enables compatibility with different project structures (V3/V4)
- Controls debug logging

## Development Practices

### Adding New Features

1. **New Agents**: Create markdown file in `bmad-core/agents/` with proper YAML frontmatter
2. **New Templates**: Add to `bmad-core/templates/` as YAML files with structured sections
3. **New Workflows**: Create YAML in `bmad-core/workflows/`
4. **Update Dependencies**: Ensure `dependencies` field in agent frontmatter is accurate

### Important Patterns

- **Dependency Management**: Always specify minimal dependencies in agent frontmatter to keep context lean
- **Template Instructions**: Use YAML-based template structure (see Template Rules below)
- **File Naming**: Follow existing conventions (kebab-case for files, proper agent names in frontmatter)
- **Documentation**: Update user-facing docs in `docs/` when adding features

### Template Rules

Templates use the **BMad Document Template** format (`/Users/brianmadison/dev-bmc/BMAD-METHOD/common/utils/bmad-doc-template.md`) with YAML structure:

1. **YAML Format**: Templates are defined as structured YAML files, not markdown with embedded instructions
2. **Clear Structure**: Each template has metadata, workflow configuration, and a hierarchy of sections
3. **Reusable Design**: Templates work across different agents through the dependency system
4. **Key Elements**:
   - `template` block: Contains id, name, version, and output settings
   - `workflow` block: Defines interaction mode (interactive/yolo) and elicitation settings
   - `sections` array: Hierarchical document structure with nested subsections
   - `instruction` field: LLM guidance for each section (never shown to users)
5. **Advanced Features**:
   - Variable substitution: `{{variable_name}}` syntax for dynamic content
   - Conditional sections: `condition` field for optional content
   - Repeatable sections: `repeatable: true` for multiple instances
   - Agent permissions: `owner` and `editors` fields for access control
6. **Clean Output**: All processing instructions are in YAML fields, ensuring clean document generation

## Notes for Claude Code

- The project uses semantic versioning with automated releases via GitHub Actions
- All markdown is formatted with Prettier (run `npm run format`)
- Expansion packs in `expansion-packs/` provide domain-specific capabilities
- NEVER automatically commit or push changes unless explicitly asked by the user
- NEVER include Claude Code attribution or co-authorship in commit messages
