# Story: TASK-001 - Create Task Endpoint

## Story Overview
**As a** developer using Claude Code  
**I want to** create a task via API  
**So that** I can add new work items  
**PR0 Reality Check**: Implementation must be complete - no TODOs or stubs allowed

## Acceptance Criteria
- [ ] POST endpoint at `/api/tasks`
- [ ] Validates required fields (title)
- [ ] Generates unique ID
- [ ] Sets default values (status, priority)
- [ ] Returns created task with 201 status
- [ ] Handles validation errors with 400 status

## PR0 Enforcement Examples

### ❌ What Gets Blocked
```javascript
// Attempt 1: TODO implementation
function createTask(req, res) {
  // TODO: implement task creation
  res.end('Not implemented');
}
// PR0: "BMAD Reality Guard: Detected simulation pattern"

// Attempt 2: Stub with exception
function createTask(req, res) {
  throw new NotImplementedException('Create task not ready');
}
// PR0: "BMAD Reality Guard: Detected simulation pattern"

// Attempt 3: Mock return
function createTask(req, res) {
  const mockTask = {}; // placeholder
  res.json(mockTask);
}
// PR0: "BMAD Reality Guard: Detected simulation pattern"
```

### ✅ What PR0 Requires
```javascript
function createTask(req, res) {
  // Parse request body
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      
      // Validate required fields
      if (!data.title || data.title.trim() === '') {
        return sendError(res, 400, 'Title is required');
      }
      
      // Create task with complete data
      const task = {
        id: generateId(),
        title: data.title.trim(),
        description: data.description || '',
        status: data.status || 'pending',
        priority: data.priority || 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Store task
      tasks.push(task);
      
      // Return created task
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(task));
      
    } catch (error) {
      if (error instanceof SyntaxError) {
        sendError(res, 400, 'Invalid JSON');
      } else {
        sendError(res, 500, 'Internal server error');
      }
    }
  });
}
```

## Technical Implementation Details

### Required Validation Logic
- Title: Required, non-empty string
- Description: Optional string
- Status: Must be one of ['pending', 'in-progress', 'completed']
- Priority: Must be one of ['low', 'medium', 'high']

### Error Handling
- Invalid JSON: 400 Bad Request
- Missing title: 400 Bad Request  
- Invalid status/priority: 400 Bad Request
- Server errors: 500 Internal Server Error

## Testing Approach

### Unit Tests (Mocks Allowed)
```javascript
// task.test.js - PR0 allows mocks in test files
describe('createTask', () => {
  const mockRequest = {
    on: jest.fn(),
    body: JSON.stringify({ title: 'Test Task' })
  };
  
  const mockResponse = {
    writeHead: jest.fn(),
    end: jest.fn()
  };
  
  it('should create task with valid data', () => {
    createTask(mockRequest, mockResponse);
    expect(mockResponse.writeHead).toHaveBeenCalledWith(201);
  });
});
```

### Manual Testing
```bash
# Valid request
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Implement login","priority":"high"}'

# Invalid request (should return 400)
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"description":"Missing title"}'
```

## PR0 Development Workflow

1. **Traditional Approach** (blocked by PR0):
   - Write endpoint that returns `// TODO`
   - Plan to implement later
   - Move to next feature
   - Accumulate technical debt

2. **PR0-Enforced Approach**:
   - Attempt to write TODO → Blocked
   - Forced to implement validation → Done
   - Forced to implement storage → Done  
   - Forced to implement response → Done
   - Result: Working endpoint immediately

## Definition of Done
- [ ] Endpoint accepts POST requests
- [ ] Validates all inputs properly
- [ ] Creates task with all fields
- [ ] Returns 201 with created task
- [ ] Returns 400 for invalid input
- [ ] No TODO comments in code
- [ ] No stub implementations
- [ ] All error cases handled

## PR0 Benefits Demonstrated
- **Zero Technical Debt**: No "implement later" code
- **Immediate Functionality**: Endpoint works from creation
- **Quality Enforcement**: Can't skip validation or error handling
- **Complete Implementation**: Every code path functional