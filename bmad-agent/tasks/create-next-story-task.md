# Create Next Story Task

## Purpose

To identify the next logical story based on project progress and epic definitions, and then to prepare a comprehensive, self-contained, and actionable story file using the `Story Template`. This task ensures the story is enriched with all necessary technical context, requirements, and acceptance criteria, making it ready for efficient implementation by a Developer Agent with minimal need for additional research.

## Inputs for this Task

- Access to the project's documentation repository, specifically:
  - `docs/index.md` (hereafter "Index Doc")
  - All Epic files (e.g., `docs/epic-{n}.md` - hereafter "Epic Files")
  - Existing story files in `docs/stories/`
  - Main PRD (hereafter "PRD Doc")
  - Main Architecture Document (hereafter "Main Arch Doc")
  - Frontend Architecture Document (hereafter "Frontend Arch Doc," if relevant)
  - Project Structure Guide (`docs/project-structure.md`)
  - Operational Guidelines Document (`docs/operational-guidelines.md`)
  - Technology Stack Document (`docs/tech-stack.md`)
  - Data Models Document (as referenced in Index Doc)
  - API Reference Document (as referenced in Index Doc)
  - UI/UX Specifications, Style Guides, Component Guides (if relevant, as referenced in Index Doc)
- The `bmad-agent/templates/story-tmpl.md` (hereafter "Story Template")
- The `bmad-agent/checklists/story-draft-checklist.md` (hereafter "Story Draft Checklist")
- User confirmation to proceed with story identification and, if needed, to override warnings about incomplete prerequisite stories.

## Task Execution Instructions

### 1. Identify Next Story for Preparation

- Review `docs/stories/` to find the highest-numbered story file.
- **If a highest story file exists (`{lastEpicNum}.{lastStoryNum}.story.md`):**

  - Verify its `Status` is 'Done' (or equivalent).
  - If not 'Done', present an alert to the user:

    \`\`\`plaintext
    ALERT: Found incomplete story:
    File: {lastEpicNum}.{lastStoryNum}.story.md
    Status: [current status]

    Would you like to:
    1. View the incomplete story details (instructs user to do so, agent does not display)
    2. Cancel new story creation at this time
    3. Accept risk & Override to create the next story in draft

    Please choose an option (1/2/3):
    \`\`\`

  - Proceed only if user selects option 3 (Override) or if the last story was 'Done'.
  - If proceeding: Check the Epic File for `{lastEpicNum}` for a story numbered `{lastStoryNum + 1}`. If it exists and its prerequisites (per Epic File) are met, this is the next story.
  - Else (story not found or prerequisites not met): The next story is the first story in the next Epic File (e.g., `docs/epic-{lastEpicNum + 1}.md`, then `{lastEpicNum + 2}.md`, etc.) whose prerequisites are met.

- **If no story files exist in `docs/stories/`:**
  - The next story is the first story in `docs/epic-1.md` (then `docs/epic-2.md`, etc.) whose prerequisites are met.
- If no suitable story with met prerequisites is found, report to the user that story creation is blocked, specifying what prerequisites are pending. HALT task.
- Announce the identified story to the user: "Identified next story for preparation: {epicNum}.{storyNum} - {Story Title}".

### 2. Gather Core Story Requirements (from Epic File)

- For the identified story, open its parent Epic File.
- Extract: Exact Title, full Goal/User Story statement, initial list of Requirements, all Acceptance Criteria (ACs), and any predefined high-level Tasks.
- Keep a record of this original epic-defined scope for later deviation analysis.

### 3. Gather & Synthesize In-Depth Technical Context for Dev Agent

- <critical_rule>Systematically use the Index Doc (`docs/index.md`) as your primary guide to discover paths to ALL detailed documentation relevant to the current story's implementation needs.</critical_rule>
- Thoroughly review the PRD Doc, Main Arch Doc, and Frontend Arch Doc (if a UI story).
- Guided by the Index Doc and the story's needs, locate, analyze, and synthesize specific, relevant information from sources such as:
  - Data Models Doc (structure, validation rules).
  - API Reference Doc (endpoints, request/response schemas, auth).
  - Applicable architectural patterns or component designs from Arch Docs.
  - UI/UX Specs, Style Guides, Component Guides (for UI stories).
  - Specifics from Tech Stack Doc if versions or configurations are key for this story.
  - Relevant sections of the Operational Guidelines Doc (e.g., story-specific error handling nuances, security considerations for data handled in this story).
- The goal is to collect all necessary details the Dev Agent would need, to avoid them having to search extensively. Note any discrepancies between the epic and these details for "Deviation Analysis."

### 4. Verify Project Structure Alignment

- Cross-reference the story's requirements and anticipated file manipulations with the Project Structure Guide (and frontend structure if applicable).
- Ensure any file paths, component locations, or module names implied by the story align with defined structures.
- Document any structural conflicts, necessary clarifications, or undefined components/paths in a "Project Structure Notes" section within the story draft.

### 5. Populate Story Template with Full Context

- Create a new story file: `docs/stories/{epicNum}.{storyNum}.story.md`.
- Use the Story Template to structure the file.
- Fill in:
  - Story `{EpicNum}.{StoryNum}: {Short Title Copied from Epic File}`
  - `Status: Draft`
  - `Story` (User Story statement from Epic)
  - `Acceptance Criteria (ACs)` (from Epic, to be refined if needed based on context)
- **`Dev Technical Guidance` section (CRITICAL):**
  - Based on all context gathered (Step 3 & 4), embed concise but critical snippets of information, specific data structures, API endpoint details, precise references to _specific sections_ in other documents (e.g., "See `Data Models Doc#User-Schema-ValidationRules` for details"), or brief explanations of how architectural patterns apply to _this story_.
  - If UI story, provide specific references to Component/Style Guides relevant to _this story's elements_.
  - The aim is to make this section the Dev Agent's primary source for _story-specific_ technical context.
- **`Tasks / Subtasks` section:**
  - Generate a detailed, sequential list of technical tasks and subtasks the Dev Agent must perform to complete the story, informed by the gathered context.
  - Link tasks to ACs where applicable (e.g., `Task 1 (AC: 1, 3)`).
- Add notes on project structure alignment or discrepancies found in Step 4.
- Prepare content for the "Deviation Analysis" based on discrepancies noted in Step 3.
