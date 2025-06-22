# Task: Implement Story with Integrated Review

## Purpose
To execute a user story with a proactive analysis and review cycle, ensuring alignment with existing codebase patterns, modern standards, and a high level of quality before completion.

## 1. Story Initiation & Analysis Phase

[[LLM: Upon receiving a story and before writing any implementation code, execute these steps sequentially.]]

1.  **Check for User Override**:
    -   First, check if the user has explicitly requested to force Review Mode for this story (e.g., "Implement this story in review mode").
    -   If so, immediately declare: "**User has forced Review Mode for this story.**" and proceed to step 5, skipping the complexity assessment. Log this in the `Dev Notes`.
2.  **Establish Temporal Context**:
    -   Run `get-Date -Format "yyyy-MM-dd"` and store the current year. Announce the year being used for context-setting (e.g., "Operating with standards context for the year 2024.").
3.  **Internal Codebase Analysis**:
    -   **Action**: Use the built-in IDE semantic search capabilities.
    -   **Query**: Search the entire codebase for implementations, functions, components, or patterns that are semantically related to the user story's title, description, and Acceptance Criteria.
    -   **Goal**: Identify code for potential reuse, and understand existing patterns relevant to the new work. Log these findings internally for use during implementation.
4.  **Dependency & Standards Analysis with Internet Fallback**:
    -   Read the `package.json` (or equivalent) to identify currently installed libraries relevant to the story.
    -   [[LLM: **Attempt Internet Search:** Perform a targeted internet search for "best practices for [library/feature] in [current year]" for any new or significantly updated libraries.]]
    -   [[LLM: **On Success:** Silently incorporate the findings and proceed to the next step.]]
    -   [[LLM: **On Failure (If unable to access the internet):**
        1. **Announce the situation clearly:** "I am currently unable to access the internet to research the latest standards for this task."
        2. **Offer a choice to the user:** "Is this expected, or should I attempt to enable access? Alternatively, I can proceed using the best practices from my existing training data."
        3. **Request explicit instruction to continue:** "Please let me know how you would like to proceed."
        4. **HALT and await user response.** Once the user confirms to continue (with or without them enabling internet access), proceed to the next step using the available knowledge.]]
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

## 2. Unified Task Execution Phase

[[LLM: Proceed with the `Tasks / Subtasks` list from the story file one by one. The following logic applies to EVERY task.]]

<< For each task in the story's task list: >>

1.  **Mandatory Task Complexity Assessment**:
    -   Evaluate the complexity of the *current task* using Fibonacci scale (1, 2, 3, 5, 8, 13), leveraging the initial semantic search results.
    -   Compare the `Task Complexity` score against the `agentThresholdTask` value from `core-config.yml`.

2.  **Conditional Implementation Path**:
    -   **If `Task Complexity` > `agentThresholdTask`**:
        -   Announce: "**Task complexity is high. Activating internal review process.**"
        -   Execute the **Internal Review Process (Section 3)** for this task.
    -   **Else (Task Complexity is low)**:
        -   Announce: "**Task complexity is low. Implementing directly.**"
        -   Implement the task, continuously referencing the initial analysis for code reuse opportunities.

3.  **Testing and Completion**:
    -   Once the task is implemented (either directly or after passing review), write and pass all required tests.
    -   Mark the task checkbox as complete: `[x]`.

## 3. The Internal Review Process (Self-Critique)

[[LLM: When activated for a high-complexity task, adopt the 'Reviewer' persona for self-critique. This is a Chain-of-Thought process.]]

1.  **Enact Reviewer Persona**: State "Activating The Reviewer for self-critique."
2.  **Propose Implementation**: As the `dev` agent, write the proposed code for the task.
3.  **Critique as Reviewer**: As "The Reviewer," analyze the proposed code against the following criteria:
    *   **Code Duplication**: "Does this logic already exist in [file/function from semantic search]? If so, fail."
    *   **Syntax & Errors**: "Are there obvious syntax, linting, or TypeScript errors? If so, fail."
    *   **Standards Alignment**: "Does this align with the project's coding standards and the patterns discovered in the initial analysis? If not, fail."
    *   **Security Vulnerabilities**: "Does this introduce security risks (input validation, authentication, data exposure, hardcoded secrets)? If so, fail."
    *   **Performance Impact**: "Could this cause performance issues (N+1 queries, memory leaks, inefficient algorithms, excessive resource usage)? If so, fail."
    *   **Architecture Compliance**: "Does this violate separation of concerns, SOLID principles, or established architectural patterns? If so, fail."
4.  **Handle Review Failure**: If any check fails, as "The Reviewer," provide specific, actionable feedback. Then, as the `dev` agent, go back to step 2 to create a revised implementation. Repeat this loop until the code is approved.
5.  **Log a Successful Review**: Once "The Reviewer" approves the code, generate a summary for the `Dev Notes` section of the story:

    ```markdown
    **Internal Review Summary for Task [Task #]**
    - **Submissions**: [Number]
    - **Failed Attempts**:
        - **Attempt 1**: [Describe problematic code briefly and why it failed, e.g., "Created duplicate login logic already present in `auth.service.ts`." or "Introduced SQL injection vulnerability in user query."]
        - **Attempt N**: ...
    - **Final Solution**: [Describe the approved approach, e.g., "Refactored to use the existing `authenticateUser` function from `auth.service.ts` with proper input sanitization."]
    - **Lessons Learned**: [Note any new patterns or insights, e.g., "All authentication logic must be centralized in the auth service; direct token manipulation is an anti-pattern in this codebase. Always validate user inputs before database queries."]
    ```

## 4. Finalize Story

[[LLM: After all tasks are marked `[x]`, run the `story-dod-checklist`. Do not proceed until the checklist is passed.]]
- Execute the `story-dod-checklist` task.
- Address any issues found during the self-check.
- Once the checklist is fully passed, change the story status to `Review`.

## 5. Memory Synthesis & Validation

[[LLM: This is the final, mandatory step. It now includes a holistic analysis of the entire Dev Notes section to capture all potential knowledge.]]

1.  **Enact Synthesizer Persona**: Announce "Finalizing work. Switching to Memory Synthesizer persona to distill and validate learnings from all notes."
2.  **Comprehensive Knowledge Extraction (Two-Pass Analysis)**:
    [[LLM: First, extract high-confidence, explicit lessons. Then, perform a broader scan for implicit knowledge.]]
    -   **Pass 1: Explicit Lessons**: Parse the `Dev Notes` section for all `Internal Review Summary` blocks. Extract the "Lessons Learned," "Final Solution," and "Failed Attempts" content. These are your high-priority, explicit memories.
    -   **Pass 2: Implicit Lessons**: Read the *entire* `Dev Notes` section again (including `Completion Notes`, `Debug Log References`, and `Change Log`). Use LLM intelligence to identify potential patterns or learnings that were not part of a formal review. Look for:
        -   Unexpected workarounds or solutions.
        -   Reasons for deviating from the original plan.
        -   Notes about dependency versions or compatibility issues.
        -   Discoveries of project-specific conventions or "gotchas".
        -   *Prompt Guidance: "Based on these notes, what would a senior developer tell a new team member to watch out for in this codebase?"*
3.  **Synthesize and Deduplicate**:
    -   Generalize all extracted lessons (from both passes) into a preliminary list of `new_memories_to_process`.
    -   **Deduplicate this list**: If an implicit lesson from Pass 2 is a rephrasing of an explicit lesson from Pass 1, discard the implicit one and keep the more detailed, explicit version.
4.  **Load Existing Memory Context**:
    [[LLM: Perform this file read *once* before the validation loop.]]
    -   Read the entire contents of `.bmad-core/data/bmad-project-memory.md` into a temporary context variable, `existing_memories`. If the file doesn't exist, this variable will be empty.
5.  **Reconcile Memories (In-Memory Loop)**:
    [[LLM: Initialize an empty list called `finalized_memories` and a list called `conflicts_to_log`. Now, for each unique `new_memory` in the deduplicated list, perform the validation against the loaded `existing_memories` context.]]
    -   **Check for Conflicts**:
        -   **Direct Contradiction:** Does the `new_memory` directly contradict a memory in `existing_memories`?
        -   **Superseding Pattern:** Does the `new_memory` replace an older pattern?
        -   **Redundancy:** Is the `new_memory` a rephrasing of an existing memory?
    -   **Process Validation Result**:
        -   **If a Direct Contradiction is found**: Add a warning to the `conflicts_to_log` list.
        -   **If a Superseding Pattern is found**: Mark the older memory in `existing_memories` for deprecation and add the `new_memory` to `finalized_memories`.
        -   **If Redundant**: Do nothing.
        -   **If No Conflict (Clear)**: Add the `new_memory` to `finalized_memories`.
6.  **Commit Changes to File**:
    [[LLM: After the loop is complete, perform the file write operations.]]
    -   If the `finalized_memories` list is not empty or if any existing memories were marked for deprecation:
        -   Modify the `existing_memories` context in-memory (deprecating old entries, adding new ones from `finalized_memories`).
        -   Update the "Last Synthesized" timestamp.
        -   Write the entire, updated memory context back to `.bmad-core/data/bmad-project-memory.md`, overwriting the file.
    -   If the `conflicts_to_log` list is not empty:
        -   Append each conflict as a high-priority warning to the current story's `Dev Notes`:
            > `**MEMORY CONFLICT DETECTED:** The lesson "[new lesson]" from this story contradicts the existing memory "[conflicting memory]" from Story [source]. Human review is required to resolve this inconsistency.`
7.  **Conclude**: Announce "Memory synthesis and validation complete. Story is finalized and ready for review."