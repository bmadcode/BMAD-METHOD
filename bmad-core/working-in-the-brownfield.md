# Working in the Brownfield: A Complete Guide

> **HIGHLY RECOMMENDED: Use Gemini Web or Gemini CLI for Brownfield Documentation Generation!**
>
> Gemini Web's 1M+ token context window or Gemini CLI (when its working) can analyze your ENTIRE codebase or critical sections of it all at once (obviously within reason):
>
> - Upload via GitHub URL or use gemini cli in the project folder
> - If in the web: Upload up to 1000 files or the zipped project or just give it the github url

## What is Brownfield Development?

Brownfield development refers to adding features, fixing bugs, or modernizing existing software projects. Unlike greenfield (new) projects, brownfield work requires understanding existing code, respecting constraints, and ensuring new changes integrate seamlessly without breaking existing functionality.

## When to Use BMad for Brownfield

- Add significant new features to existing applications
- Modernize legacy codebases
- Integrate new technologies or services
- Refactor complex systems
- Fix bugs that require architectural understanding
- Document undocumented systems

## When NOT to use a Brownfield Flow

If you have just completed an MVP with BMad, and you want to continue with post-MVP, its easier to just talk to the PM and ask him to work with you to create a new epic to add into the PRD, shard out the epic, update any architecture documents with the architect, and just go from there.

## The Complete Brownfield Workflow

### Choose Your Approach

#### Approach A: PRD-First (Recommended if adding very large and complex new features, single or multiple epics or massive changes)

**Best for**: Large codebases, monorepos, or when you know exactly what you want to build

1. **Create PRD First** to define requirements
2. **Document only relevant areas** based on PRD needs
3. **More efficient** - avoids documenting unused code

#### Approach B: Document-First (Good for Smaller Projects)

**Best for**: Smaller codebases, unknown systems, or exploratory changes

1. **Document entire system** first
2. **Create PRD** with full context
3. **More thorough** - captures everything

### Approach A: PRD-First Workflow (Recommended)

#### Phase 1: Define Requirements First

**In Gemini Web (with your codebase uploaded):**

```bash
@pm
*create-doc brownfield-prd
```

The PM will:

- **Ask about your enhancement** requirements
- **Explore the codebase** to understand current state
- **Identify affected areas** that need documentation
- **Create focused PRD** with clear scope

**Key Advantage**: The PRD identifies which parts of your monorepo/large codebase actually need documentation!

#### Phase 2: Focused Documentation

**Still in Gemini Web, now with PRD context:**

```bash
@analyst
*document-project
```

The analyst will:

- **Ask about your focus** if no PRD was provided
- **Offer options**: Create PRD, provide requirements, or describe the enhancement
- **Reference the PRD/description** to understand scope
- **Focus on relevant modules** identified in PRD or your description
- **Skip unrelated areas** to keep docs lean
- **Generate ONE architecture document** for all environments

The analyst creates:

- **One comprehensive architecture document** following fullstack-architecture template
- **Covers all system aspects** in a single file
- **Easy to copy and save** as `docs/project-architecture.md`
- **Can be sharded later** in IDE if desired

For example, if you say "Add payment processing to user service":

- Documents only: user service, API endpoints, database schemas, payment integrations
- Creates focused source tree showing only payment-related code paths
- Skips: admin panels, reporting modules, unrelated microservices

### Approach B: Document-First Workflow

#### Phase 1: Document the Existing System

**Best Approach - Gemini Web with 1M+ Context**:

1. **Go to Gemini Web** (gemini.google.com)
2. **Upload your project**:
   - **Option A**: Paste your GitHub repository URL directly
   - **Option B**: Upload up to 1000 files from your src/project folder
   - **Option C**: Zip your project and upload the archive
3. **Load the analyst agent**: Upload `dist/agents/analyst.txt`
4. **Run documentation**: Type `*document-project`

The analyst will generate comprehensive documentation of everything.

#### Phase 2: Plan Your Enhancement

#### Option A: Full Brownfield Workflow (Recommended for Major Changes)

**1. Create Brownfield PRD**:

```bash
@pm
*create-doc brownfield-prd
```

The PM agent will:

- **Analyze existing documentation** from Phase 1
- **Request specific enhancement details** from you
- **Assess complexity** and recommend approach
- **Create epic/story structure** for the enhancement
- **Identify risks and integration points**

**How PM Agent Gets Project Context**:

- In Gemini Web: Already has full project context from Phase 1 documentation
- In IDE: Will ask "Please provide the path to your existing project documentation"

**Key Prompts You'll Encounter**:

- "What specific enhancement or feature do you want to add?"
- "Are there any existing systems or APIs this needs to integrate with?"
- "What are the critical constraints we must respect?"
- "What is your timeline and team size?"

**2. Create Brownfield Architecture**:

```bash
@architect
*create-doc brownfield-architecture
```

The architect will:

- **Review the brownfield PRD**
- **Design integration strategy**
- **Plan migration approach** if needed
- **Identify technical risks**
- **Define compatibility requirements**

#### Option B: Quick Enhancement (For Focused Changes)

**For Single Epic Without Full PRD**:

```bash
@pm
*brownfield-create-epic
```

Use when:

- Enhancement is well-defined and isolated
- Existing documentation is comprehensive
- Changes don't impact multiple systems
- You need quick turnaround

**For Single Story**:

```bash
@pm
*brownfield-create-story
```

Use when:

- Bug fix or tiny feature
- Very isolated change
- No architectural impact
- Clear implementation path

### Phase 3: Validate Planning Artifacts

```bash
@po
*execute-checklist po-master-checklist
```

The PO ensures:

- Compatibility with existing system
- No breaking changes planned
- Risk mitigation strategies in place
- Clear integration approach

### Phase 4: Transition to Development

Follow the enhanced IDE Development Workflow:

1. **Ensure documents are in project**:

   - Copy `docs/prd.md` (or brownfield-prd.md)
   - Copy `docs/architecture.md` (or brownfield-architecture.md)

2. **Shard documents**:

   ```bash
   @po
   # Ask to shard docs/prd.md
   ```

3. **Development cycle**:
   - **SM** creates stories with integration awareness
   - **Dev** implements with existing code respect
   - **QA** reviews for compatibility and improvements

## Brownfield Best Practices

### 1. Always Document First

Even if you think you know the codebase:

- Run `document-project` to capture current state
- AI agents need this context
- Discovers undocumented patterns

### 2. Respect Existing Patterns

The brownfield templates specifically look for:

- Current coding conventions
- Existing architectural patterns
- Technology constraints
- Team preferences

### 3. Plan for Gradual Rollout

Brownfield changes should:

- Support feature flags
- Plan rollback strategies
- Include migration scripts
- Maintain backwards compatibility

### 4. Test Integration Thoroughly

Focus testing on:

- Integration points
- Existing functionality (regression)
- Performance impact
- Data migrations

### 5. Communicate Changes

Document:

- What changed and why
- Migration instructions
- New patterns introduced
- Deprecation notices

## Common Brownfield Scenarios

### Scenario 1: Adding a New Feature

1. Document existing system
2. Create brownfield PRD focusing on integration
3. Architecture emphasizes compatibility
4. Stories include integration tasks

### Scenario 2: Modernizing Legacy Code

1. Extensive documentation phase
2. PRD includes migration strategy
3. Architecture plans gradual transition
4. Stories follow strangler fig pattern

### Scenario 3: Bug Fix in Complex System

1. Document relevant subsystems
2. Use `brownfield-create-story` for focused fix
3. Include regression test requirements
4. QA validates no side effects

### Scenario 4: API Integration

1. Document existing API patterns
2. PRD defines integration requirements
3. Architecture ensures consistent patterns
4. Stories include API documentation updates

## Troubleshooting

### "The AI doesn't understand my codebase"

**Solution**: Re-run `document-project` with more specific paths to critical files

### "Generated plans don't fit our patterns"

**Solution**: Update generated documentation with your specific conventions before planning phase

### "Too much boilerplate for small changes"

**Solution**: Use `brownfield-create-story` instead of full workflow

### "Integration points unclear"

**Solution**: Provide more context during PRD creation, specifically highlighting integration systems

## Quick Reference

### Brownfield-Specific Commands

```bash
# Document existing project
@analyst → *document-project

# Create enhancement PRD
@pm → *create-doc brownfield-prd

# Create architecture with integration focus
@architect → *create-doc brownfield-architecture

# Quick epic creation
@pm → *brownfield-create-epic

# Single story creation
@pm → *brownfield-create-story
```

### Decision Tree

```text
Do you have a large codebase or monorepo?
├─ Yes → PRD-First Approach
│   └─ Create PRD → Document only affected areas
└─ No → Is the codebase well-known to you?
    ├─ Yes → PRD-First Approach
    └─ No → Document-First Approach

Is this a major enhancement affecting multiple systems?
├─ Yes → Full Brownfield Workflow
└─ No → Is this more than a simple bug fix?
    ├─ Yes → brownfield-create-epic
    └─ No → brownfield-create-story
```

## Conclusion

Brownfield development with BMad-Method provides structure and safety when modifying existing systems. The key is providing comprehensive context through documentation, using specialized templates that consider integration requirements, and following workflows that respect existing constraints while enabling progress.

Remember: **Document First, Plan Carefully, Integrate Safely**
