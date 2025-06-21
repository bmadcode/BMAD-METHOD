# implement-story-development

**Agent:** dev  
**Type:** BatchTask

## Purpose

Complete comprehensive story implementation including code development, testing, and quality validation with project-agnostic build tool integration and story status management.

## Context

This task handles the core development work for a story:
- Implements all acceptance criteria and requirements
- Integrates with project-specific build and testing tools
- Executes code generation tools when needed (type sync, API clients, etc.)
- Maintains project quality gates throughout implementation
- Updates story status and documentation

## Inputs

### Required
- `story_file` (string): Path to the approved story file with implementation guidance
- `epic_number` (string): Epic number for context and file organization
- `story_number` (string): Story number for tracking and coordination

## Outputs

- `implementation_status` (string): "Complete" | "Partial" | "Blocked"
- `story_file` (string): Updated story file with implementation details
- `code_changes` (string): Summary of code modifications made
- `quality_gates_status` (string): Status of project quality validation

## Instructions

### Pre-Implementation Analysis

1. **Review story requirements and technical guidance**
   - Read story file thoroughly including acceptance criteria
   - Review Dev Technical Guidance section for architecture constraints
   - Understand file locations and project structure requirements
   - Identify any previous story insights or lessons learned

2. **Assess project context and build system**
   
   **Auto-detect project configuration:**
   - Identify project build system from configuration files
   - Detect available development tools and commands
   - Review project-specific quality standards
   - Understand testing and validation approach
   
   **Use project-defined quality gates:**
   - Use project's configured build, test, and quality commands
   - Follow project's established coding standards
   - Apply project's validation requirements

### Implementation Process

3. **Implement acceptance criteria systematically**
   
   **Follow story task sequence:**
   - Work through tasks/subtasks in order specified in story
   - Complete each acceptance criteria before moving to next
   - Test functionality as you implement
   - Document any deviations from planned approach

   **For each acceptance criteria:**
   - Read the specific requirement thoroughly
   - Implement following project coding standards
   - Write unit tests as required by project testing strategy
   - Test the functionality works correctly
   - Document implementation approach in story

4. **Handle code generation and synchronization (if applicable)**

   **Use project-configured code generation:**
   - Check project documentation for generation commands
   - Use project's established generation workflow
   - Identify when generation is needed (after API/schema changes)
   - Follow project's verification process for generated code
   
   **Common generation scenarios:**
   - Type definitions from API schemas
   - Client code from API specifications  
   - Protocol buffer implementations
   - GraphQL type definitions
   
   **Verification:**
   - Ensure generated code integrates properly
   - Include generated code in project quality validation
   - Test functionality of generated components

5. **Validate using project-defined quality gates**
   
   **Use project's quality validation approach:**
   - Run project's configured formatting tools
   - Execute project's linting and static analysis
   - Perform project's type checking (if applicable)
   - Run project's test suite
   - Execute project's build process
   
   **Quality gate discovery:**
   - Check project scripts/commands in configuration files
   - Review project CI/CD pipeline configuration
   - Consult project README or documentation
   - Use project's established development workflow
   
   **Fallback approaches:**
   - If project commands are unclear, check standard locations
   - Document any quality gates that cannot be determined
   - Apply manual validation where automated tools unavailable

6. **Test implementation comprehensively**
   
   **Unit testing:**
   - Write unit tests for new functionality following project patterns
   - Ensure test coverage meets project requirements
   - Test edge cases and error conditions
   - Mock external dependencies appropriately

   **Integration testing:**
   - Test integration with existing systems
   - Verify API endpoints work correctly
   - Test database interactions if applicable
   - Validate frontend-backend integration

   **Functional testing:**
   - Test all acceptance criteria manually
   - Verify user journeys work end-to-end
   - Test accessibility if required by project
   - Validate performance meets requirements

### Documentation and Status Management

7. **Update story file with implementation details**
   
   ```markdown
   ## Implementation Details
   
   **Status**: In Progress → Complete
   **Implementation Date**: [Current date]
   **Quality Gates**: [PASS/FAIL status]
   
   ### Acceptance Criteria Implementation
   
   #### AC1: [Description]
   - **Implementation**: [What was built and how]
   - **Files Modified**: [List of files changed]
   - **Tests Added**: [Unit/integration tests created]
   - **Validation**: [How it was tested]
   
   #### AC2: [Description]
   - **Implementation**: [What was built and how]
   - **Files Modified**: [List of files changed]
   - **Tests Added**: [Unit/integration tests created]
   - **Validation**: [How it was tested]
   
   ### Code Generation Executed
   - **Tools Run**: [List of generation commands executed]
   - **Reason**: [Why generation was needed - backend changes, schema updates, etc.]
   - **Generated Files**: [Files created/updated by generation]
   - **Validation**: [How generated code was verified]
   
   ### Quality Gates Status
   **Project Configuration:** [Description of detected project setup]
   
   **Executed Quality Gates:**
   - [Gate 1]: [PASS/FAIL/NOT_APPLICABLE] - [Command/method used]
   - [Gate 2]: [PASS/FAIL/NOT_APPLICABLE] - [Command/method used]
   - [Gate 3]: [PASS/FAIL/NOT_APPLICABLE] - [Command/method used]
   
   **Project-Specific Validation:**
   - [Custom validation 1]: [PASS/FAIL/NOT_APPLICABLE]
   - [Custom validation 2]: [PASS/FAIL/NOT_APPLICABLE]
   
   **Quality Assessment:**
   - **Overall Status**: [PASS/NEEDS_ATTENTION]
   - **Manual Review**: [COMPLETED/NOT_REQUIRED]
   
   ### Technical Decisions Made
   - **Decision 1**: [Context and rationale]
   - **Decision 2**: [Context and rationale]
   
   ### Challenges Encountered
   - **Challenge**: [Description and solution]
   - **Lessons Learned**: [Insights for future stories]
   
   ### Implementation Status
   - **All AC Completed**: [YES/NO]
   - **Quality Gates Passing**: [YES/NO]
   - **Ready for Review**: [YES/NO]
   ```

8. **Verify implementation completeness**
   - Confirm all acceptance criteria implemented
   - Ensure all project quality gates pass
   - Verify no regressions in existing functionality
   - Test critical user journeys still work
   - Document any remaining work or blockers

## Success Criteria

- All story acceptance criteria implemented and tested
- Project-defined quality gates executed and passing
- Code generation tools executed when applicable
- Project configuration properly detected and utilized
- Comprehensive test coverage per project standards
- Story file updated with implementation details and status
- No regressions in existing functionality
- Ready for review validation

## Failure Conditions

- Acceptance criteria incomplete or incorrectly implemented
- Project-agnostic quality gates failing (auto-detected toolchain validation)
- Code generation not executed when needed (project-specific tools)
- Project type detection failed and no fallback validation performed
- Insufficient test coverage per project standards
- Existing functionality broken by implementation
- Story documentation incomplete or unclear

## Error Handling

If implementation encounters blockers:
1. Document the specific blocker and attempted solutions
2. Identify if blocker affects acceptance criteria completion
3. Update story with blocker details and impact assessment
4. Recommend next steps (escalation, scope change, technical research)
5. Complete remaining non-blocked acceptance criteria

If quality gates fail:
1. **Identify project-specific failures and root causes**
   - Document which project type was detected
   - Record specific commands that failed
   - Capture error messages and exit codes
2. **Fix issues systematically following project standards**
   - Use project-appropriate fixing tools (auto-formatters, linters)
   - Follow project-specific conventions and standards
3. **Re-run quality gates after each fix**
   - Use same auto-detected commands for consistency
   - Try alternative commands if primary ones fail
4. **Document any persistent quality issues and resolutions**
   - Note if project-specific tools are missing or misconfigured
   - Document any manual workarounds used
5. **Apply fallback validation if standard tools unavailable**
   - Use manual code review processes
   - Check for project-specific CI/CD validation
   - Document inability to use standard toolchain
6. **Do not proceed to review until all available gates pass**

If code generation fails:
1. **Verify backend changes requiring generation are correct**
   - Check for API schema changes, protobuf definitions, etc.
   - Confirm generation is actually required for the changes made
2. **Check project-specific generation command syntax**
   - Verify auto-detected generation commands are correct
   - Try alternative generation commands for the project type
   - Check project documentation for custom generation scripts
3. **Ensure generation tools are properly installed and configured**
   - Verify project-specific generators are available
   - Check for missing dependencies or configuration files
   - Try installing missing tools if permissions allow
4. **Document generation issues and manual alternatives**
   - Record specific project type and generation tools attempted
   - Document any manual generation steps performed
   - Note if generation was skipped and why
5. **Escalate to infrastructure team if generation tools broken**
   - Provide specific project type and toolchain information
   - Include error messages and attempted commands
   - Suggest infrastructure improvements for project type support

## Notes

- Adapt build commands to project's actual build system (not just npm)
- Code generation should be executed after any backend/API schema changes
- Story status should be updated from "Approved" to "In Progress" to "Ready for Review"
- Focus on project quality standards - not all projects have same validation requirements
- Document technical decisions for future reference and learning

## Integration Points

- **Input from:** approve-story-for-development and setup-development-environment tasks
- **Output to:** pre_review_validation step
- **Dependencies:** Project build system, quality gate commands, story template compliance
- **Tools:** Project-specific build system, testing frameworks, code generation tools