---
task:
  id: process-and-structure-memory
  name: Process and Structure Memory
  description: >
    A task to ingest data, identify key entities and concepts, and structure the information into a memory network entry.
---

# Task: Process and Structure Memory

**Goal:** To transform raw input data into a structured memory entry using the `memory-network-entry` template.

**Steps:**

1.  **Ingest Data:** Receive the input data from the user or another agent.
2.  **Analyze Content:** Identify the core concepts, entities, and their relationships within the data.
3.  **Extract Key Information:** Pull out the most critical pieces of information that should be stored in the knowledge network.
4.  **Structure the Memory:** Use the `memory-network-entry` template to format the extracted information.
5.  **Integrate with `basic-memory`:** Format the output to be compatible with the `basic-memory` MCP server, ensuring it can be saved and retrieved effectively and is visible in Obsidian.
6.  **Output the Structured Data:** Provide the final, structured markdown output.
