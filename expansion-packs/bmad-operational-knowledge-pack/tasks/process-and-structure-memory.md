---
task:
  id: process-and-structure-memory
  name: Process and Structure Memory
  description: >
    A task to ingest data, identify key entities and concepts, and structure the information into a memory network entry.
---

# Task: Process and Structure Memory

**Goal:** To transform raw input data into a structured, Obsidian-compatible Markdown note and save it to the knowledge network using the `basic-memory` MCP server.

**Steps:**

1.  **Analyze Input:** Ingest the provided data (e.g., documents, logs, conversations) and identify the single most important concept, entity, or idea to form the core of the new memory.

2.  **Determine Note Title:** Create a concise, descriptive title for the note. This title will be used as the filename and the primary identifier in the knowledge graph (e.g., `[[Note Title]]`).

3.  **Extract and Structure Content:**
    - Using the `memory-network-entry` template, populate the note's content.
    - Write a clear **Summary** of the concept.
    - Identify and list key **Relationships** to other concepts. Use `[[wiki-links]]` to reference other notes.
    - Record the **Source** and **Timestamp** in the metadata section.

4.  **Save to Memory:**
    - Use the `basic-memory` MCP server's `add` command to save the note.
    - The `title` should be the note title from Step 2.
    - The `content` should be the full Markdown body of the note.

5.  **Confirm and Output:**
    - Confirm that the save operation was successful.
    - Present the newly created note to the user in a Markdown block.
    - Announce that the memory has been successfully added to the knowledge network.
