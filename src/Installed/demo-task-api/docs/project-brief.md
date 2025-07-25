# Task Management API - PR0 Demo Project

## Project Overview
A REST API for task management that demonstrates BMAD-Method's PR0 Claude Code hooks preventing stub implementations and enforcing complete, production-ready code from the start.

## Business Context
Small teams need a lightweight task management API that actually works - not a collection of TODO comments and mock implementations. This demo shows how PR0's reality enforcement ensures every endpoint is fully functional.

## Key Demonstration Points
1. **No Stub Implementations** - Hooks block any attempt to create placeholder code
2. **Complete CRUD Operations** - Every endpoint must have full business logic
3. **Real Error Handling** - No `throw new NotImplementedException()`
4. **Working Validation** - Input validation must be implemented, not TODO'd

## Target Audience
Developers using Claude Code CLI who want to experience how PR0's hooks improve code quality by preventing the accumulation of technical debt through stub implementations.

## Success Metrics
- Zero stub methods in codebase
- All API endpoints return real data
- Error cases handled properly
- Tests can use mocks (exempted from reality enforcement)