# Technology Stack - Task Management API

## Overview
This demo showcases PR0's reality enforcement using a Node.js REST API with zero external dependencies - proving that complete implementations don't require complex frameworks.

## Core Technologies

### Runtime
- **Node.js 20+** - JavaScript runtime
- **Built-in modules only** - No npm packages required
- **Native HTTP server** - Using Node's http module

### PR0 Hook Integration
- **Claude Code CLI** - Required for hook execution
- **BMAD Hooks** - PreToolUse validation active
- **Reality Enforcement** - Blocks stub implementations

## Architecture Decisions

### Why No External Dependencies?
1. **Demonstrates PR0 purely** - No framework magic hiding stubs
2. **Forces complete implementations** - Can't rely on library defaults
3. **Shows hook effectiveness** - Every line must be real code

### File Structure Enforced by PR0
```
src/
├── server.js          # Complete HTTP server (no TODO comments)
├── router.js          # Full routing logic (no placeholder routes)
├── controllers/       
│   └── taskController.js  # All methods implemented (no stubs)
├── models/
│   └── task.js        # Complete data model (no mock data)
├── utils/
│   └── validator.js   # Real validation (no empty functions)
└── tests/
    └── task.test.js   # Can use mocks (PR0 exemption)
```

## PR0 Reality Enforcement Examples

### ❌ What PR0 Blocks
```javascript
// Blocked: Empty request handler
function handleRequest(req, res) {
  // TODO: implement request handling
}

// Blocked: Stub middleware
function authenticate(req, res, next) {
  throw new Error('Not implemented');
}

// Blocked: Mock data return
function getTasks() {
  return []; // placeholder data
}
```

### ✅ What PR0 Requires
```javascript
// Required: Complete request handler
function handleRequest(req, res) {
  const { pathname, method } = parseUrl(req);
  const route = findRoute(pathname, method);
  
  if (route) {
    route.handler(req, res);
  } else {
    sendError(res, 404, 'Route not found');
  }
}

// Required: Real middleware
function authenticate(req, res, next) {
  const token = extractToken(req);
  if (token && isValidToken(token)) {
    req.user = decodeToken(token);
    next();
  } else {
    sendError(res, 401, 'Unauthorized');
  }
}

// Required: Actual data management
function getTasks() {
  return tasks.filter(task => !task.deleted);
}
```

## Development Workflow with PR0

### Traditional Approach (Pre-PR0)
1. Create route handler with `// TODO`
2. Add controller with `throw new Error('Not implemented')`  
3. Return mock data for testing
4. "Implement later" (technical debt)

### PR0-Enforced Approach
1. Attempt to create route with TODO
2. **PR0 blocks** - "Detected simulation pattern"
3. Developer guided to implement fully
4. Working code from the start
5. Zero technical debt

## Testing Strategy

### Production Code (PR0 Active)
- No mocks allowed
- No stub implementations
- Complete business logic required

### Test Files (PR0 Exemption)
- Can use mock objects
- Test doubles permitted
- Stub external dependencies

Example test file that's allowed:
```javascript
// task.test.js - PR0 allows mocks in test files
const mockDatabase = {
  query: jest.fn(),
  insert: jest.fn()
};

describe('TaskController', () => {
  it('should create task', () => {
    mockDatabase.insert.mockResolvedValue({ id: 1 });
    // test implementation
  });
});
```

## Performance Considerations

### PR0 Hook Performance
- Validation time: <100ms per file write
- No runtime overhead (build-time only)
- Caches validation results for 5 minutes

### API Performance  
- In-memory data storage (demo purposes)
- No database overhead
- Response time: <10ms for all endpoints