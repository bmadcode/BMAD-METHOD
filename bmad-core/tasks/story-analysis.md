# Story Analysis Task

## Purpose
Perform comprehensive analysis of a story before implementation, including codebase search, dependency analysis, and complexity assessment.

## Process

### Section 1: Pre-Analysis Setup

1.  **Check for User Override**:
    -   If the user has explicitly requested "Review Mode" (e.g., "Please use review mode for this story"), skip complexity assessment and proceed directly to review mode.

2.  **Establish Temporal Context**:
    -   Check `checkCurrentDate` setting in `core-config.yml`. If `true`, run `get-Date -Format "yyyy-MM-dd"` and store the current year. Announce the year being used for context-setting (e.g., "Operating with standards context for the year 2024."). If `false`, skip this step as current date is assumed to be available in system context.

3.  **Codebase Semantic Search**:
    -   Perform a semantic search across the codebase for patterns, functions, or components related to the story's requirements.
    -   Focus on finding existing implementations that might be relevant, duplicated, or need to be extended.
    -   Log findings for later reference during implementation.

### Section 2: Dependency & Version Analysis

4.  **Dependency & Standards Analysis with Version-Based Criticality Assessment**:
    -   Read the `package.json` (or equivalent) to identify currently installed libraries relevant to the story.
    -   **Version Criticality Analysis**: 
        -   Compare dependency versions against model training cutoff (typically 2024 for current models)
        -   Flag packages with versions newer than training data or using "latest"/"^" specifiers
        -   Identify completely new packages not in model's training data
    -   [[LLM: **Attempt Internet Search:** If critical versions detected OR for general best practices research, perform a targeted internet search for "best practices for [library/feature] in [current year]".]]
    -   [[LLM: **On Success:** Silently incorporate the findings and proceed to the next step.]]
    -   [[LLM: **On Failure with Critical Versions Detected:**
        1. **Announce the critical situation:** "I detected [library] version [X.Y.Z] which is newer than my training data (cutoff: [date]). Without MCP search tools, I cannot safely implement features using this version."
        2. **Explain the risk:** "Proceeding without current knowledge could result in deprecated patterns, security vulnerabilities, or broken implementations."
        3. **Request explicit decision:** "Please enable MCP search tools or confirm you want me to proceed with potentially outdated patterns. Type 'proceed-anyway' to continue at your own risk."
        4. **HALT and await user response.** Only continue after explicit user confirmation.]]
    -   [[LLM: **On Failure with Non-Critical Research:**
        1. **Announce the situation:** "I am currently unable to access the internet to research the latest standards for this task."
        2. **Offer a choice:** "This appears to be non-critical research. I can proceed using best practices from my existing training data."
        3. **Request confirmation:** "Please let me know if you'd like me to continue or if you prefer to enable MCP search tools first."
        4. **HALT and await user response.** Continue based on user preference.]]

### Section 3: Complexity Assessment

5.  **Initial Complexity Assessment & Mode Declaration**:
    -   Calculate a "Story Complexity" score using Fibonacci scale (1, 2, 3, 5, 8, 13).
    -   If Review Mode was forced by the user OR if `Story Complexity` > `agentThresholdStory`, declare: "**Entering high-scrutiny 'Review Mode' for this story. Each task will be individually assessed.**"
    -   Otherwise, declare: "**Story complexity is within standard limits. Each task will still be individually assessed for complexity.**"
    -   Log the complexity score (if calculated) and the reason for the mode in the story's `Dev Notes`.

**Fibonacci Complexity Guidelines:**
- **1**: Trivial changes (typos, simple styling)
- **2**: Minor feature additions (new button, basic validation)
- **3**: Standard feature implementation (form handling, API calls)
- **5**: Complex features (authentication, data processing)
- **8**: Major architectural changes (new services, database schema)
- **13**: High-risk/high-uncertainty work (new frameworks, complex integrations)

### Version Analysis Guidelines

**Critical Version Indicators** (Require MCP search):
- Package versions released after model training cutoff
- "latest", "^", or "~" version specifiers for major dependencies  
- Completely new packages/frameworks not in training data
- Major version bumps (e.g., React 17→19, Node 16→20)

**Non-Critical Research** (Optional MCP search):
- Established libraries within training data timeframe
- Minor version updates with backward compatibility
- General coding patterns and best practices
- Documentation and styling techniques

## Output

Create analysis artifacts in the story's `Dev Notes` section:
- Semantic search findings
- Dependency analysis results
- Complexity assessment and mode declaration
- Any critical version warnings or research limitations

## Dependencies

- Access to `core-config.yml` for configuration settings
- Codebase search capabilities
- Package management file access (package.json, etc.)
- Optional: MCP search tools for dependency research
