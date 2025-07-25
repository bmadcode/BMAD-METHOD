# Product Requirements Document - Task Management API

## Executive Summary
A RESTful API for task management that showcases BMAD-Method's PR0 enhancement - Claude Code hooks that enforce complete implementations and prevent stub/mock code in production.

## Product Vision
Demonstrate how PR0's reality enforcement transforms typical "TODO-driven development" into immediate, working implementations. Every API endpoint works from day one.

## Core Features

### Task Management
- Create tasks with title, description, status, and priority
- Update existing tasks  
- Delete tasks
- List all tasks with filtering options
- Mark tasks as complete

### PR0 Hook Demonstrations
1. **PreToolUse Validation** - Attempts to write stubs are blocked
2. **Reality Enforcement** - No placeholders or mock implementations
3. **Test File Exemption** - Test files can still use mocks
4. **Configuration Control** - Hooks can be temporarily disabled if needed

## Technical Requirements

### API Endpoints
- `POST /api/tasks` - Create new task (fully implemented)
- `GET /api/tasks` - List tasks with filters (real filtering logic)
- `GET /api/tasks/:id` - Get single task (actual lookup)
- `PUT /api/tasks/:id` - Update task (complete update logic)
- `DELETE /api/tasks/:id` - Delete task (real deletion)
- `PATCH /api/tasks/:id/complete` - Mark complete (status update)

### Reality Enforcement Examples
When PR0 hooks are active, these patterns are BLOCKED:
```javascript
// ❌ BLOCKED: TODO comments
function createTask(data) {
  // TODO: implement task creation
}

// ❌ BLOCKED: Stub implementations  
function updateTask(id, data) {
  throw new Error('Not implemented');
}

// ❌ BLOCKED: Mock returns
function getTasks() {
  return []; // placeholder
}
```

Instead, developers must provide complete implementations:
```javascript
// ✅ ALLOWED: Complete implementation
function createTask(data) {
  const task = {
    id: generateId(),
    title: data.title,
    description: data.description,
    status: 'pending',
    priority: data.priority || 'medium',
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
}
```

## User Stories

### TASK-001: Create Task with Validation
**As a** developer  
**I want to** create a new task  
**So that** I can track work items  
**Reality Check**: Must include real validation logic, not TODO comments

### TASK-002: List Tasks with Filtering  
**As a** developer  
**I want to** list tasks with status/priority filters  
**So that** I can find relevant tasks  
**Reality Check**: Actual filtering implementation required, no placeholder returns

### TASK-003: Update Task Properties
**As a** developer  
**I want to** update task details  
**So that** I can modify task information  
**Reality Check**: Complete update logic with validation, no stubs

## Success Criteria
1. All endpoints return real data (no mocks)
2. Validation logic is implemented (not TODO'd)
3. Error handling is complete (no placeholder throws)
4. PR0 hooks prevent stub implementations
5. Developers receive helpful guidance when blocked

## PR0 Hook Integration Points

### Development Workflow
1. Developer starts implementing endpoint
2. Attempts to add `// TODO: implement later`
3. PR0 PreToolUse hook blocks the write
4. Error message guides toward complete implementation
5. Developer writes working code instead
6. Code quality maintained from the start

### Configuration Options
```json
{
  "enabled": true,
  "preset": "strict",
  "hooks": {
    "preToolUse": {
      "blockSimulation": true,
      "requireTests": false
    }
  }
}
```

## Measuring PR0 Impact
- **Before PR0**: Codebases full of TODOs and stubs
- **After PR0**: Every function works from day one
- **Metric**: Zero stub implementations in production code
- **Benefit**: No technical debt accumulation