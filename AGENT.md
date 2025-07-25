# BMad-Method Agent Guide

## Build Commands
- `npm run build` - Build all agents and teams
- `npm run build:agents` - Build only agent bundles  
- `npm run build:teams` - Build only team bundles
- `npm run validate` - Validate configuration and files
- `npm run format` - Format all Markdown files with Prettier
- `node tools/cli.js list:agents` - List available agents

## Test Commands
- No formal test suite - validation via `npm run validate`
- Manual testing via building agents/teams and checking outputs

## Architecture
- **Core**: `bmad-core/` - Agent definitions, templates, workflows, user guide
- **Tools**: `tools/` - CLI build system, installers, web builders
- **Expansion Packs**: `expansion-packs/` - Domain-specific agent collections
- **Distribution**: `dist/` - Built agent/team bundles for web deployment
- **Config**: `bmad-core/core-config.yaml` - Sharding, paths, markdown settings

## Code Style
- **Modules**: CommonJS (`require`/`module.exports`), some ES modules via dynamic import
- **Classes**: PascalCase (WebBuilder), methods camelCase (buildAgents)
- **Files**: kebab-case (web-builder.js), constants UPPER_CASE
- **Error Handling**: Try-catch with graceful fallback, async/await patterns
- **Imports**: Node built-ins, fs-extra, chalk, commander, js-yaml
- **Paths**: Always use `path.join()`, absolute paths via `path.resolve()`
