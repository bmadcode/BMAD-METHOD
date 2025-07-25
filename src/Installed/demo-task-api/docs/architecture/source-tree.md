# Source Tree Structure - PR0 Enforced

## Overview
This source tree demonstrates how PR0's reality enforcement ensures every file contains working code, not stubs or placeholders.

## Directory Structure

```
demo-task-api/
├── .claude/
│   ├── settings.json         # PR0 hooks configuration
│   └── bmad-config.json      # BMAD-specific settings
├── docs/
│   ├── project-brief.md      # Business context
│   ├── prd.md               # Product requirements  
│   ├── architecture/
│   │   ├── tech-stack.md    # Technology decisions
│   │   ├── coding-standards.md  # PR0 enforced standards
│   │   └── source-tree.md   # This file
│   └── stories/             # User stories
│       ├── TASK-001-Create-Task.md
│       ├── TASK-002-List-Tasks.md
│       └── TASK-003-Update-Task.md
├── src/
│   ├── server.js            # ✅ Complete HTTP server (PR0 enforced)
│   ├── router.js            # ✅ Full routing logic (no TODO routes)
│   ├── controllers/
│   │   └── taskController.js # ✅ All CRUD operations implemented
│   ├── models/
│   │   └── task.js          # ✅ Complete data model
│   ├── utils/
│   │   ├── validator.js     # ✅ Real validation logic
│   │   └── errors.js        # ✅ Custom error classes
│   └── middleware/
│       └── errorHandler.js  # ✅ Actual error handling
├── tests/
│   ├── task.test.js         # 🔧 Can use mocks (PR0 exemption)
│   ├── integration.test.js  # 🔧 Test doubles allowed
│   └── mocks/              # 🔧 Mock implementations OK here
│       └── mockDb.js
├── .bmad-core/             # BMAD Method configuration
│   └── hooks/
│       └── claude-code/    # PR0 hook implementations
└── package.json            # No dependencies (built-ins only)
```

## File Purposes & PR0 Impact

### `/src/server.js`
**Purpose**: HTTP server setup  
**PR0 Enforcement**: Cannot have `// TODO: add routes`  
**Required Implementation**:
```javascript
const server = http.createServer((req, res) => {
  // Must have complete request handling
  router.handle(req, res);
});
```

### `/src/router.js`
**Purpose**: Route management  
**PR0 Enforcement**: No placeholder routes  
**Required Implementation**:
```javascript
// ❌ PR0 BLOCKS:
routes.push({
  path: '/api/tasks',
  handler: () => { throw new Error('Not implemented'); }
});

// ✅ PR0 REQUIRES:
routes.push({
  path: '/api/tasks',
  handler: taskController.list
});
```

### `/src/controllers/taskController.js`
**Purpose**: Business logic  
**PR0 Enforcement**: Every method must work  
**Required Methods**:
- `create(req, res)` - Full implementation
- `list(req, res)` - Real filtering logic
- `get(req, res)` - Actual task lookup
- `update(req, res)` - Complete update logic
- `delete(req, res)` - Real deletion

### `/tests/` Directory
**Purpose**: Test files  
**PR0 Exemption**: Can use mocks and stubs  
```javascript
// ✅ Allowed in test files:
const mockTaskService = {
  create: jest.fn(),
  update: jest.fn()
};
```

## PR0 Hook Files

### `.claude/settings.json`
Configures PR0 hooks for Claude Code:
```json
{
  "hooks": {
    "PreToolUse": [{
      "name": "BMAD Write Validator",
      "matcher": "Write|Edit|MultiEdit",
      "command": "node .bmad-core/hooks/claude-code/pre-tool-use.js"
    }]
  }
}
```

### `.claude/bmad-config.json`
BMAD-specific configuration:
```json
{
  "enabled": true,
  "preset": "strict",
  "hooks": {
    "preToolUse": {
      "blockSimulation": true
    }
  }
}
```

## Development Flow with PR0

### Traditional Flow (Without PR0)
1. Create file structure ✓
2. Add TODO placeholders ✓
3. Write stub functions ✓
4. "Implement later" ✗
5. Technical debt accumulates ✗

### PR0-Enforced Flow
1. Create file structure ✓
2. Attempt TODO → **BLOCKED** ✗
3. Attempt stub → **BLOCKED** ✗
4. Write working code → **ALLOWED** ✓
5. Zero technical debt ✓

## File Creation Examples

### Creating a New Endpoint
```bash
Developer: "Add a new endpoint for task search"

# Attempt 1 (BLOCKED):
function searchTasks(req, res) {
  // TODO: implement search
}

# PR0 Response:
"BMAD Reality Guard: Detected simulation pattern.
Please provide complete, functional implementation."

# Attempt 2 (SUCCESS):
function searchTasks(req, res) {
  const { query } = parseQueryParams(req.url);
  const results = tasks.filter(task => 
    task.title.includes(query) || 
    task.description.includes(query)
  );
  sendJson(res, 200, results);
}
```

## Benefits of PR0 Structure
1. **Every file works** - No dead code
2. **Self-documenting** - Code shows actual behavior
3. **Zero TODOs** - No forgotten implementations
4. **Test isolation** - Mocks only in tests
5. **Immediate value** - Features work from day one