# Developer (Dev) - Quick Start Guide

## 5-Minute Setup

### Step 1: Environment Activation (1 minute)
```bash
# In your IDE or development environment
1. Load BMAD Method workspace
2. Select "Developer" persona
3. Verify activation: "Expert Senior Software Engineer"
4. Confirm access to essential directories:
   - docs/stories/ (for story files)
   - docs/checklists/ (for quality checklists)
   - .ai/ (for debug log)
```

### Step 2: Story Assignment Verification (1 minute)
```markdown
# Check Story Status
1. Locate your assigned story file: docs/stories/{epicNumber}.{storyNumber}.story.md
2. Verify story status is "Approved" or ready for development
3. Review acceptance criteria and technical requirements
4. Update story status to "InProgress"

# Example Story File Check
- Story ID: 1.2.story.md
- Status: Approved âœ…
- Acceptance Criteria: Clear and testable âœ…
- Technical Requirements: Defined âœ…
```

### Step 3: Development Environment Validation (2 minutes)
```bash
# Essential Tool Verification
# Check version control
git --version
git status

# Check package managers
npm --version  # or yarn --version
pip --version  # if using Python

# Check testing frameworks
npm test --version  # or appropriate test command
pytest --version    # if using Python

# Check linting tools
eslint --version    # or appropriate linter
pylint --version    # if using Python
```

### Step 4: First Development Task (1 minute)
```markdown
# Quick Development Test
1. Create a simple test file to verify environment
2. Run linting and testing commands
3. Commit changes to verify git integration
4. Update story file with initial progress

# Example Test
echo "console.log('BMAD Dev Environment Ready');" > test-setup.js
npm run lint test-setup.js
git add test-setup.js
git commit -m "Verify development environment setup"
```

## Practical Example: User Authentication Feature

### Scenario Setup
```markdown
**Story**: "As a user, I want to log in with email and password so that I can access my account"
**Epic**: User Management (Epic 2)
**Story ID**: 2.1
**Acceptance Criteria**:
- User can enter email and password
- System validates credentials against database
- Successful login redirects to dashboard
- Failed login shows appropriate error message
- Login attempts are rate-limited for security
```

### Development Session Example

#### Phase 1: Story Analysis and Planning (5 minutes)
```markdown
Developer: "Let me analyze this authentication story and break it down into implementable tasks."

Story Breakdown:
1. **Frontend Components**
   - Login form with email/password fields
   - Form validation and error handling
   - Loading states and user feedback

2. **Backend API**
   - Authentication endpoint (/api/auth/login)
   - Credential validation logic
   - JWT token generation and management

3. **Security Implementation**
   - Password hashing and verification
   - Rate limiting for login attempts
   - Input sanitization and validation

4. **Testing Requirements**
   - Unit tests for authentication logic
   - Integration tests for API endpoints
   - End-to-end tests for login flow

Tasks Updated in Story File:
- [ ] Create login form component
- [ ] Implement authentication API endpoint
- [ ] Add password hashing and verification
- [ ] Implement rate limiting middleware
- [ ] Create comprehensive test suite
- [ ] Add error handling and user feedback
```

#### Phase 2: Implementation Execution (30 minutes)
```javascript
// Frontend Component Implementation
// components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      // Redirect handled by useAuth hook
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          required
        />
      </div>
      
      {errors.general && <div className="error">{errors.general}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
```

```javascript
// Backend API Implementation
// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

const router = express.Router();

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

#### Phase 3: Testing Implementation (15 minutes)
```javascript
// Unit Tests
// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Authentication API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    
    // Create test user
    const passwordHash = await bcrypt.hash('testpassword', 10);
    await User.create({
      email: 'test@example.com',
      passwordHash,
      name: 'Test User'
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'testpassword'
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });

    it('should enforce rate limiting', async () => {
      // Make 6 requests (exceeding the 5 request limit)
      for (let i = 0; i < 6; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'test@example.com',
            password: 'wrongpassword'
          });
        
        if (i === 5) {
          expect(response.status).toBe(429);
        }
      }
    });
  });
});
```

#### Phase 4: Quality Assurance and DoD Check (10 minutes)
```markdown
Developer: "Running comprehensive quality checks before marking story complete."

Quality Assurance Checklist:
Code follows established style guidelines (ESLint passed)
All tests pass (Unit: 15/15, Integration: 8/8, E2E: 3/3)
Test coverage exceeds 80% threshold (Current: 92%)
Security scan passed (No high-severity vulnerabilities)
Performance benchmarks met (Login response < 200ms)
Documentation updated (API docs, component docs)
Accessibility requirements met (WCAG 2.1 AA compliance)

Definition of Done Validation:
All acceptance criteria implemented and tested
Code reviewed and approved by senior developer
Integration with existing authentication system verified
Error handling and edge cases covered
Security best practices implemented
User experience validated with UX team
Ready for deployment to staging environment

Story Status: Ready for Review âœ…
```

## Common Development Patterns

### Quick Bug Fix
```markdown
# 15-Minute Bug Resolution
1. "There's a bug in the user profile update functionality"
2. Developer analyzes error logs and reproduces issue
3. Identifies root cause in validation logic
4. Implements fix with additional test coverage
5. Validates fix and updates documentation

Example Process:
- Reproduce bug in development environment
- Write failing test that demonstrates the issue
- Implement minimal fix to resolve the issue
- Verify all tests pass including the new test
- Update story file and prepare for review
```

### Feature Enhancement
```markdown
# 30-Minute Feature Addition
1. "Add password strength indicator to registration form"
2. Developer reviews existing registration component
3. Implements password strength calculation logic
4. Adds visual indicator component with styling
5. Creates comprehensive test suite for new functionality

Example Implementation:
- Analyze current password validation logic
- Create password strength calculation utility
- Implement visual indicator component
- Add real-time feedback as user types
- Test across different password scenarios
```

### Performance Optimization
```markdown
# 45-Minute Performance Improvement
1. "Dashboard loading time is too slow"
2. Developer profiles application performance
3. Identifies database query optimization opportunities
4. Implements caching and query improvements
5. Validates performance improvements with benchmarks

Example Process:
- Profile current performance with monitoring tools
- Identify bottlenecks in database queries or API calls
- Implement targeted optimizations (caching, indexing, etc.)
- Measure performance improvements
- Document changes and update monitoring
```

## Quick Reference Commands

### Development Commands
```bash
# Essential Development Tasks
npm start                # Start development server
npm test                 # Run test suite
npm run lint             # Check code quality
npm run build            # Build for production
npm run dev              # Start development with hot reload

# Git Workflow
git status               # Check current status
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push origin feature  # Push feature branch
git pull origin main     # Pull latest changes
```

### Quality Assurance Commands
```bash
# Quality Checks
npm run test:coverage    # Generate test coverage report
npm run lint:fix         # Auto-fix linting issues
npm run security:scan    # Run security vulnerability scan
npm run performance:test # Run performance benchmarks

# Code Analysis
npm run analyze          # Analyze bundle size and dependencies
npm run docs:generate    # Generate API documentation
npm run format           # Format code with Prettier
```

### Story Management Commands
```bash
# BMAD Method Specific
*story-status           # Check current story progress
*update-progress        # Update story file with current status
*dod-check             # Run Definition of Done checklist
*core-dump             # Record current state and run diagnostics
*help                  # List all available commands
```

## Best Practices Checklist

### Before Starting Development
- [ ] Story status is "Approved" and ready for development
- [ ] All acceptance criteria are clear and testable
- [ ] Technical requirements and constraints are understood
- [ ] Development environment is set up and validated
- [ ] Story file is updated to "InProgress" status

### During Development
- [ ] Follow established coding standards and conventions
- [ ] Write tests for all new functionality
- [ ] Commit changes frequently with descriptive messages
- [ ] Update story file with progress and any blockers
- [ ] Seek clarification for any ambiguous requirements

### Before Completing Story
- [ ] All acceptance criteria are implemented and tested
- [ ] Code passes all quality checks (linting, testing, security)
- [ ] Documentation is updated and complete
- [ ] Integration with existing system is validated
- [ ] Definition of Done checklist is completed
- [ ] Story file is updated to "Review" status

## Troubleshooting Quick Fixes

### "Tests are failing"
**Solution**: Run tests individually to isolate failures, check test data setup, verify environment configuration

### "Code quality checks failing"
**Solution**: Run linting with auto-fix, review coding standards, update code to meet quality requirements

### "Integration issues with existing code"
**Solution**: Review API contracts, validate data formats, check version compatibility, coordinate with team

### "Performance issues in development"
**Solution**: Profile code execution, optimize database queries, implement caching, review resource usage

### "Unclear requirements"
**Solution**: Document specific questions, seek clarification from Product Owner, update story with clarifications

---

*This quick start guide gets you productive with the Developer persona immediately. For comprehensive capabilities and advanced integration details, refer to the Comprehensive Guide and Integration Guide.*
