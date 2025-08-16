# Create Storyboard Task

## Purpose

To create a storyboard for a scene or sequence in the screenplay. This task guides the director and cinematographer agents through the process of visualizing the script and creating a shot-by-shot plan.

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 1. Select Scene for Storyboarding

- Elicit the scene or sequence to be storyboarded from the user.
- Load the screenplay to get the context of the scene.
- Announce the selected scene: "Beginning storyboarding for scene: {Scene Number} - {Scene Description}"

### 2. Shot Breakdown

- Break down the scene into individual shots.
- For each shot, determine the following:
  - Shot type (e.g., wide, medium, close-up)
  - Camera angle
  - Camera movement
  - Composition
  - Lighting
- Collaborate with the cinematographer agent to define the visual style.

### 3. Create Storyboard Panels

- Create a storyboard panel for each shot.
- Each panel should include a sketch of the shot, a description of the action, and any relevant notes.
- Use the `storyboard-tmpl.md` template for formatting.
- Present the storyboard to the user for approval.

### 4. Revisions and Finalization

- Based on user feedback, revise the storyboard.
- Ensure the storyboard accurately reflects the director's vision and is a practical guide for production.
- Execute `{root}/tasks/execute-checklist` `{root}/checklists/directing-checklist` to ensure quality.
- Announce the completion of the storyboard: "Storyboard for scene {Scene Number} is complete."
