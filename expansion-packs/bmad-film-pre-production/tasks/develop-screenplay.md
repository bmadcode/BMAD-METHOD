# Develop Screenplay Task

## Purpose

To develop a screenplay based on a logline, synopsis, or treatment. This task guides the screenwriter agent through the process of outlining, writing scenes, and formatting the screenplay according to industry standards.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 1. Elicit Core Concept

- Elicit the core concept from the user. This can be a logline, a synopsis, or a more detailed treatment.
- If no concept is provided, facilitate a brainstorming session to generate ideas.
- Announce the chosen concept: "Beginning development on screenplay: {Concept Title}"

### 2. Create an Outline

- Based on the core concept, create a detailed outline of the screenplay.
- Use a standard three-act structure unless otherwise specified.
- The outline should include all major plot points, character arcs, and key scenes.
- Present the outline to the user for approval before proceeding.

### 3. Write the First Draft

- Write the first draft of the screenplay, following the approved outline.
- Focus on character development, dialogue, and pacing.
- Use the `screenplay-tmpl.md` template for proper formatting.
- Announce the completion of the first draft: "First draft of {Concept Title} is complete."

### 4. Revisions and Polishing

- Based on user feedback, revise and polish the screenplay.
- This can involve multiple rounds of revisions, focusing on different aspects of the script (e.g., plot, character, dialogue).
- Execute `{root}/tasks/execute-checklist` `{root}/checklists/screenwriting-checklist` to ensure quality.
- Announce the completion of the revision process: "Revisions for {Concept Title} are complete."

### 5. Finalize the Screenplay

- Prepare the final version of the screenplay.
- Ensure all formatting is correct and the script is free of errors.
- Provide a summary to the user including:
  - Final title
  - Logline
  - Character breakdown
  - Checklist results
- Announce the completion of the screenplay: "Screenplay for {Concept Title} is finalized and ready for pre-production."
