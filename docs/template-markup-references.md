# Old Template Markup System References

This document catalogs all references to the old template markup system found in the BMAD-METHOD documentation and codebase.

## Summary of Old Markup Patterns

The old template markup system used the following patterns:

- `[[LLM: ...]]` - LLM-only processing directives
- `{{placeholders}}` - Variable substitution
- `<<REPEAT section="name">>` - Repeatable sections
- `^^CONDITION: condition_name^^` - Conditional blocks
- `@{examples}` - Example content markers

## Files Containing References

### 1. Primary Documentation Files

#### `/Users/brianmadison/dev-bmc/BMAD-METHOD/docs/user-guide.md`

- **Lines 149-155**: Describes template structure with placeholders and LLM instructions
- **Lines 229-230**: References advanced elicitation with embedded LLM instructions
- **Lines 527-549**: Shows custom template creation with LLM instructions and placeholders
- **Lines 590-632**: Detailed template patterns including variables, AI processing, and conditionals
- **Lines 619-623**: References to `@{example}` patterns and `[[LLM:]]` instructions

#### `/Users/brianmadison/dev-bmc/BMAD-METHOD/docs/core-architecture.md`

- **Lines 93-104**: Describes templates as self-contained with embedded LLM instructions
- **Lines 97-104**: Mentions template-format.md specification with placeholders and LLM directives

#### `/Users/brianmadison/dev-bmc/BMAD-METHOD/CLAUDE.md`

- **Lines 37, 262**: References to template instructions using `[[LLM: ...]]` markup
- **Line 38**: Mentions templates with embedded LLM instructions

### 2. Common Utilities

#### `/Users/brianmadison/dev-bmc/BMAD-METHOD/common/utils/bmad-doc-template.md`

- **Lines 296-324**: Migration section describes converting from legacy markdown+frontmatter templates
- **Lines 319-323**: Specific conversion instructions for old markup patterns

### 3. Task Files

#### `/Users/brianmadison/dev-bmc/BMAD-METHOD/bmad-core/tasks/shard-doc.md`

- **Lines 11-30**: Contains LLM instructions embedded in the task
- **Line 160**: References preserving template markup including `{{placeholders}}` and `[[LLM instructions]]`

#### `/Users/brianmadison/dev-bmc/BMAD-METHOD/expansion-packs/bmad-creator-tools/tasks/generate-expansion-pack.md`

- **Lines 10-14**: Describes template systems with LLM instruction embedding
- **Lines 107-118**: Template section planning with LLM instructions
- **Lines 229-245**: Detailed LLM instruction patterns for templates
- **Lines 569-593**: Advanced template design patterns
- **Lines 229, 573**: Specific examples of `[[LLM:]]` usage
- **Line 574**: References conditional content with `^^CONDITION:^^`
- **Line 576**: Mentions iteration controls with `<<REPEAT>>`

### 4. Agent and Template Files

Multiple agent and task files contain actual usage of the old markup system (22 files found with `[[LLM:]]` patterns), including:

- Story templates
- Checklists
- Task definitions
- Workflow plans

## Key Observations

1. **Documentation vs Implementation**: The documentation heavily references the old markup system, while the new YAML-based template system (`bmad-doc-template.md`) is already defined but not yet reflected in the main documentation.

2. **Migration Path**: The `bmad-doc-template.md` file includes a migration section (lines 316-324) that explicitly maps old patterns to new YAML structures.

3. **Active Usage**: Many core tasks and templates still actively use the old markup patterns, particularly `[[LLM:]]` instructions embedded within markdown files.

4. **Inconsistency**: Some files reference a `template-format.md` file that doesn't exist in the expected locations, suggesting incomplete migration or documentation updates.

## Recommendations

1. **Update User Guide**: The user guide needs significant updates to reflect the new YAML-based template system
2. **Update Core Architecture Docs**: Remove references to embedded LLM instructions in templates
3. **Create Template Migration Guide**: A comprehensive guide for converting existing templates
4. **Update Extension Pack Documentation**: The bmad-creator-tools expansion pack documentation needs updates
5. **Audit Active Templates**: Review and migrate templates that still use the old markup system
