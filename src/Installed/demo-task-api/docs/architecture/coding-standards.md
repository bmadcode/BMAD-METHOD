# Coding Standards - PR0 Reality Enforcement

## Overview
These coding standards are automatically enforced by PR0's Claude Code hooks. Violations are blocked at write-time, preventing technical debt accumulation.

## PR0 Enforced Standards

### 1. No Simulation Patterns
**Automatically Blocked by PR0:**
- `// TODO:` comments in production code
- `// FIXME:` comments  
- `throw new NotImplementedException()`
- Empty function bodies `function foo() {}`
- Placeholder returns `return null; // TODO`
- Mock/stub/fake variable names

**Example Violations (Blocked):**
```javascript
// ❌ PR0 BLOCKS: TODO comment
function processPayment(amount) {
  // TODO: implement payment processing
}

// ❌ PR0 BLOCKS: Empty function
function validateInput(data) {}

// ❌ PR0 BLOCKS: Stub implementation
function fetchUser(id) {
  throw new Error('Not implemented yet');
}

// ❌ PR0 BLOCKS: Mock naming
const mockUserService = {};
```

### 2. Complete Implementations Required

**Every Function Must Work:**
```javascript
// ✅ PR0 ALLOWS: Complete implementation
function processPayment(amount) {
  if (!amount || amount <= 0) {
    throw new ValidationError('Invalid amount');
  }
  
  const transaction = {
    id: generateTransactionId(),
    amount: amount,
    status: 'pending',
    timestamp: Date.now()
  };
  
  transactions.push(transaction);
  return transaction;
}
```

### 3. Proper Error Handling

**No Placeholder Errors:**
```javascript
// ❌ PR0 BLOCKS: Generic not implemented
catch (error) {
  throw new Error('Not implemented');
}

// ✅ PR0 ALLOWS: Real error handling
catch (error) {
  logger.error('Database connection failed', error);
  throw new DatabaseError('Unable to connect to database', error);
}
```

### 4. Test File Exemptions

**Test Files Can Use Mocks:**
```javascript
// ✅ PR0 ALLOWS in test.js, spec.js files:
const mockDatabase = {
  connect: jest.fn(),
  query: jest.fn()
};

const stubEmailService = {
  send: () => Promise.resolve()
};
```

## PR0 Configuration

### Strict Mode (Default)
```json
{
  "preset": "strict",
  "hooks": {
    "preToolUse": {
      "blockSimulation": true,
      "requireTests": false
    }
  }
}
```

### Temporary Disable (When Needed)
```bash
# Runtime disable
*hooks-disable

# Or edit .claude/bmad-config.json
{
  "enabled": false
}
```

## Development Workflow

### Before Writing Code
1. Think through complete implementation
2. No "implement later" mindset
3. Every function works from creation

### When PR0 Blocks You
1. Read the error message
2. Implement the complete functionality  
3. No shortcuts or placeholders
4. Result: Working code immediately

### Example PR0 Intervention
```
Developer: "Create a user service with basic CRUD operations"

Attempt 1:
function createUser(data