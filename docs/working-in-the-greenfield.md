# Complete Greenfield Workflow Guide

## What is Greenfield?
Starting a **brand new project from scratch** - no existing code, just an idea.

## Phase 1: Planning (Generate All Documentation)

### Step 1: Initial Setup
In your Claude Project, upload:
- **`dist/teams/team-fullstack.txt`** (or team-all.txt)

Start a new chat and say:
```
These are my agent instructions from the BMAD method. Please follow them.

I want to build [describe your project idea]
```

### Step 2: Optional Research & Brainstorming
```
@analyst
Let's brainstorm ideas for this project. What features should we consider?
```

The analyst will help you:
- Explore market opportunities
- Research competitors
- Define target users
- Create a project brief

### Step 3: Create the PRD (Product Requirements Document)

**Option A - Fast Track (if you know what you want):**
```
@pm
*create-doc prd

[Provide your project brief or clear description]
```

**Option B - Interactive (if you need guidance):**
```
@pm
I want to build [basic idea]. Can you help me create a comprehensive PRD?
```

The PM will:
- Ask clarifying questions
- Define functional requirements
- Create epics and user stories
- Set success metrics

**Save the PRD as `docs/prd.md` in your project**

### Step 4: Optional UX Design
```
@ux
Based on this PRD, create a front-end specification
```

### Step 5: Create Architecture Document
```
@architect
*create-doc architecture

[The PRD will be in context from the conversation]
```

The architect will create:
- Technical stack decisions
- System architecture
- Database design
- API structure
- Security considerations

**Save as `docs/architecture.md` in your project**

### Step 6: Final Review
```
@po
Please run the master checklist to ensure our documents are aligned
```

## Phase 2: Development (Build the Project)

### Critical Step: Document Sharding

**Start a NEW chat in your project** and upload the documents you just created:

```
@bmad-master
Please shard these documents for development:
- docs/prd.md
- docs/architecture.md
```

This creates:
- `docs/prd/` folder with broken-down sections
- `docs/architecture/` folder with broken-down sections
- Makes documents digestible for development agents

### The Development Cycle

**Follow this exact sequence - NEW CHAT for each step:**

#### Step 1: Create First Story (NEW CHAT)
```
@sm
*create

[The SM will create the first story from your sharded documents]
```
- Review the story in `docs/stories/`
- Change status from "Draft" to "Approved"

#### Step 2: Implement Story (NEW CHAT)
```
@dev
Please implement this story: [paste the story content or reference the file]
```
- Dev will write all code
- Create tests
- Mark story as "Review" when done

#### Step 3: QA Review (NEW CHAT)
```
@qa
Please review this story: [reference the story]
```
- QA performs code review
- Can refactor and improve
- Marks as "Done" if approved

#### Step 4: Repeat
Go back to Step 1 for the next story. Continue until all stories are complete.

## Complete Example Flow

Here's a real example for building a task management app:

### Planning Phase (Single Chat)
```
These are my BMAD instructions [upload team file]

@analyst
I want to build a task management app. Let's brainstorm features.

@pm
*create-doc prd
[Describe the task management app requirements]

@architect
*create-doc architecture
[Will use the PRD context to create technical architecture]

@po
Run master checklist
```

### Development Phase (Multiple Chats)

**Chat 1 - Shard:**
```
@bmad-master
Shard my documents [attach prd.md and architecture.md]
```

**Chat 2 - First Story:**
```
@sm
*create
```

**Chat 3 - Implement:**
```
@dev
Implement story: [paste story content]
```

**Chat 4 - Review:**
```
@qa
Review the implementation for [story name]
```

**Repeat Chats 2-4 for each story**

## Key Success Factors

### DO's ✅
- **One agent per chat** during development
- **Save all documents** to your project files
- **Review each story** before marking approved
- **Test as you go** - don't wait until the end
- **Keep stories small** - easier to implement and debug

### DON'Ts ❌
- Don't mix agents in the same chat during development
- Don't skip document sharding
- Don't implement multiple stories at once
- Don't skip QA reviews

## Quick Reference Commands

**Planning Agents:**
- `@analyst` - Research and brainstorming
- `@pm` - Product requirements
- `@architect` - Technical design
- `@ux` - User interface design
- `@po` - Project oversight

**Development Agents:**
- `@sm *create` - Create next story
- `@dev` - Implement code
- `@qa` - Review and refactor

**Utility:**
- `@bmad-master` - Shard documents
- `*create-doc [type]` - Create specific document

## When You're Ready

1. **Start with a clear idea** of what you want to build
2. **Complete ALL planning** before starting development
3. **Shard documents** before creating stories
4. **Work sequentially** through stories
5. **Celebrate** when done! 🎉
