# Instructions

- [Setting up Web Agent Orchestrator](#setting-up-web-agent-orchestrator)
- [IDE Agent Setup and Usage](#ide-agent-setup-and-usage)
- [Tasks Setup and Usage](#tasks)

## Setting up Web Agent Orchestrator

The Agent Orchestrator in V3 utilizes a build script to package various agent assets (personas, tasks, templates, etc.) into a structured format, primarily for use with web-based orchestrator agents that can leverage large context windows. This process involves consolidating files from specified source directories into bundled text files and preparing a main agent prompt.

### Overview

The build process is managed by the `build-bmad-orchestrator.js` Node.js script. This script reads its configuration from `build-web-agent.cfg.js`, processes files from an asset directory, and outputs the bundled assets into a designated build directory.

Quickstart: see [this below](#running-the-build-script)

### Prerequisites

- **Node.js**: Ensure you have Node.js installed to run the build script. Python version coming soon...

### Configuration (`build-web-agent.cfg.js`)

The build process is configured via `build-web-agent.cfg.js`. Key parameters include:

- `orchestrator_agent_prompt`: Specifies the path to the main prompt file for the orchestrator agent, such as `bmad-agent/web-bmad-orchestrator-agent.md`. This file will be copied to `agent-prompt.txt` in the build directory.
  - Example: `./bmad-agent/web-bmad-orchestrator-agent.md`
- `asset_root`: Defines the root directory where your agent assets are stored. The script will look for subdirectories within this path.
  - Example: `./bmad-agent/` meaning it will look for folders like `personas`, `tasks` inside `bmad-agent/`)
- `build_dir`: Specifies the directory where the bundled output files and the `agent-prompt.txt` will be created.
  - Example: `./bmad-agent/build/`
- `agent_cfg`: Specifies the path to the md cfg file that defines the agents the Orchestrator can embody.
  - Example: `./bmad-agent/web-bmad-orchestrator-agent.cfg.md`

Paths in the configuration file (`build-web-agent.cfg.js`) are relative to the `bmad-agent` directory (where `build-web-agent.cfg.js` and the build script `build-bmad-orchestrator.js` are located).

### Asset Directory Structure

The script expects a specific structure within the `asset_root` directory:

1. **Subdirectories**: Create subdirectories directly under `asset_root` for each category of assets. Based on the `bmad-agent/` folder, these would be:
    - `checklists/`
    - `data/`
    - `personas/`
    - `tasks/`
    - `templates/`
2. **Asset Files**: Place your individual asset files (e.g., `.md`, `.txt`) within these subdirectories.
    - For example, persona definition files would go into `asset_root/personas/`, task files into `asset_root/tasks/`, etc.
3. **Filename Uniqueness**: Within each subdirectory, ensure that all files have unique base names (i.e., the filename without its final extension). For example, having `my-persona.md` and `my-persona.txt` in the _same_ subdirectory (e.g., `personas/`) will cause the script to halt with an error. However, `my-persona.md` and `another-persona.md` is fine.

### Running the Build Script

NOTE the build will skip any files with the `.ide.<extension>` - so you can have ide specific agents or files also that do not make sense for the web, such as `dev.ide.md` - or a specific ide `sm.ide.md`.

1. ```cmd
    node build-web-agent.js
    ```

The script will log its progress, including discovered source directories, any issues found (like duplicate base filenames), and the output files being generated.

### Output

After running the script, the `build_dir` (e.g., `bmad-agent/build/`) will contain:

1. **Bundled Asset Files**: For each subdirectory processed in `asset_root`, a corresponding `.txt` file will be created in `build_dir`. Each file concatenates the content of all files from its source subdirectory.
    - Example: Files from `asset_root/personas/` will be bundled into `build_dir/personas.txt`.
    - Each original file's content within the bundle is demarcated by `==================== START: [base_filename] ====================` and `==================== END: [base_filename] ====================`.
2. **`agent-prompt.txt`**: This file is a copy of the bmad orchestrator prompt specified by `orchestrator_agent_prompt` in the configuration.
3. **`agent-config.txt**: This is the key file so the orchestrator knows what agents and tasks are configured, and how to find the specific instructions and tasks for the agent in the compiled build assets

These bundled files and the agent prompt are then ready to be used by the Agent Orchestrator.

### Gemini Gem or GPT Setup

The text in agent-prompt.txt gets entered into the window of the main custom web agent instruction set. The other files in the build folder all need to be attached as files for the Gem or GPT.

### Orchestrator Agent Configuration (e.g., `bmad-agent/web-bmad-orchestrator-agent.cfg.md`)

While `build-bmad-orchestrator.js` packages assets, the Orchestrator's core behavior, agent definitions, and personality are defined in a Markdown configuration file. An example is `bmad-agent/web-bmad-orchestrator-agent.cfg.md` (path relative to `bmad-agent/`, specified in `build-web-agent.cfg.js` via `agent_cfg`). This file is key to the Orchestrator's adaptability.

**Key Features and Configurability:**

- **Agent Definitions**: The Markdown configuration file lists specialized agents. Each agent's definition typically starts with a level 2 Markdown heading for its `Title` (e.g., `## Title: Product Manager`). Attributes are then listed:

  - `Name`: (e.g., `- Name: John`) - The agent's specific name.
  - `Description`: (e.g., `- Description: "Details..."`) - A brief of the agent's purpose.
  - `Persona`: (e.g., `- Persona: "personas#pm"`) - A reference (e.g., to `pm` section in `personas.txt`) defining core personality and instructions.
  - `Customize`: (e.g., `- Customize: "Behavior details..."`) - For specific personality traits or overrides. This field's content takes precedence over the base `Persona` if conflicts arise, as detailed in `bmad-agent/web-bmad-orchestrator-agent.md`.

  `checklists`, `templates`, `data`, `tasks`: These keys introduce lists of resources the agent will have access to. Each item is a Markdown link under the respective key, for example:
  For `checklists`:

  ```markdown
  - checklists:
    - [Pm Checklist](checklists#pm-checklist)
    - [Another Checklist](checklists#another-one)
  ```

  For `tasks`:

  ```markdown
  - tasks:
    - [Create Prd](tasks#create-prd)
  ```

  These references (e.g., `checklists#pm-checklist` or `tasks#create-prd`) point to sections in bundled asset files, providing the agent with its knowledge and tools. Note: `data` is used (not `data_sources`), and `tasks` is used (not `available_tasks` from older documentation styles).

  - `Operating Modes`: (e.g., `- Operating Modes:
  - "Mode1"
  - "Mode2"`) - Defines operational modes/phases.
  - `Interaction Modes`: (e.g., `- Interaction Modes:
  - "Interactive"
  - "YOLO"`) - Specifies interaction styles.

**How it Works (Conceptual Flow from `orchestrator-agent.md`):**

1. The Orchestrator (initially BMad) loads and parses the Markdown agent configuration file (e.g., `web-bmad-orchestrator-agent.cfg.md`).
2. When a user request matches an agent's `title`, `name`, `description`, or `classification_label`, the Orchestrator identifies the target agent.
3. It then loads the agent's `persona` and any associated `templates`, `checklists`, `data_sources`, and `tasks` by:
    - Identifying the correct bundled `.txt` file (e.g., `personas.txt` for `personas#pm`).
    - Extracting the specific content block (e.g., the `pm` section from `personas.txt`).
4. The `Customize` instructions from the Markdown configuration are applied, potentially modifying the agent's behavior.
5. The Orchestrator then _becomes_ that agent, adopting its complete persona, knowledge, and operational parameters defined in the Markdown configuration and the loaded asset sections.

This system makes the Agent Orchestrator highly adaptable. You can easily define new agents, modify existing ones, tweak personalities with the `Customize` field (in the Markdown agent configuration file like `web-bmad-orchestrator-agent.cfg.md`), or change their knowledge base, main prompt, and asset paths (in `build-web-agent.cfg.js` and the corresponding asset files), then re-running the build script if asset content was changed.

## IDE Agent Setup and Usage

The IDE Agents in V3 are designed for optimal performance within IDE environments like Windsurf and Cursor, with a focus on smaller agent sizes and efficient context management.

### Standalone IDE Agents

You can use specialized standalone IDE agents, such as the `sm.ide.md` (Scrum Master) and `dev.ide.md` (Developer), for specific roles like story generation or development tasks. These, or any general IDE agent, can also directly reference and execute tasks by providing the agent with the task definition from your `docs/tasks/` folder.

### IDE Agent Orchestrator (`ide-bmad-orchestrator.md`)

A powerful alternative is the `ide-bmad-orchestrator.md`. This agent provides the flexibility of the web orchestratorâ€”allowing a single IDE agent to embody multiple personasâ€”but **without requiring any build step.** It dynamically loads its configuration and all associated resources.

#### How the IDE Orchestrator Works

1. **Configuration (`ide-bmad-orchestrator.cfg.md`):**
    The orchestrator's behavior is primarily driven by a Markdown configuration file (e.g., `bmad-agent/ide-bmad-orchestrator.cfg.md`, the path to which is specified within the `ide-bmad-orchestrator.md` itself). This config file has two main parts:

    - **Data Resolution:**
      Located at the top of the config file, this section defines key-value pairs for base paths. These paths tell the orchestrator where to find different types of asset files (personas, tasks, checklists, templates, data).

      ```markdown
      # Configuration for IDE Agents

      ## Data Resolution

      agent-root: (project-root)/bmad-agent
      checklists: (agent-root)/checklists
      data: (agent-root)/data
      personas: (agent-root)/personas
      tasks: (agent-root)/tasks
      templates: (agent-root)/templates

      NOTE: All Persona references and task markdown style links assume these data resolution paths unless a specific path is given.
      Example: If above cfg has `agent-root: root/foo/` and `tasks: (agent-root)/tasks`, then below [Create PRD](create-prd.md) would resolve to `root/foo/tasks/create-prd.md`
      ```

      The `(project-root)` placeholder is typically interpreted as the root of your current workspace.

    - **Agent Definitions:**
      Following the `Data Resolution` section, the file lists definitions for each specialized agent the orchestrator can become. Each agent is typically introduced with a `## Title:` Markdown heading.
      Key attributes for each agent include:

      - `Name`: The specific name of the agent (e.g., `- Name: Larry`).
      - `Customize`: A string providing specific personality traits or behavioral overrides for the agent (e.g., `- Customize: "You are a bit of a know-it-all..."`).
      - `Description`: A brief summary of the agent's role and capabilities.
      - `Persona`: The filename of the Markdown file containing the agent's core persona definition (e.g., `- Persona: "analyst.md"`). This file is located using the `personas:` path from the `Data Resolution` section.
      - `Tasks`: A list of tasks the agent can perform. Each task is a Markdown link:

        - The link text is the user-friendly task name (e.g., `[Create PRD]`).
        - The link target is either a Markdown filename for an external task definition (e.g., `(create-prd.md)`), resolved using the `tasks:` path, or a special string like `(In Analyst Memory Already)` indicating the task logic is part of the persona's main definition.
          Example:

        ```markdown
        ## Title: Product Owner AKA PO

        - Name: Curly
        - Persona: "po.md"
        - Tasks:
          - [Create PRD](create-prd.md)
          - [Create Next Story](create-next-story-task.md)
        ```

2. **Operational Workflow (inside `ide-bmad-orchestrator.md`):**
    - **Initialization:** Upon activation in your IDE, the `ide-bmad-orchestrator.md` first loads and parses its specified configuration file (`ide-bmad-orchestrator.cfg.md`). If this fails, it will inform you and halt.
    - **Greeting & Persona Listing:** It will greet you. If your initial instruction isn't clear or if you ask, it will list the available specialist personas (by `Title`, `Name`, and `Description`) and the `Tasks` each can perform, all derived from the loaded configuration.
    - **Persona Activation:** When you request a specific persona (e.g., "Become the Analyst" or "I need Larry to help with research"), the orchestrator:
      - Finds the persona in its configuration.
      - Loads the corresponding persona file (e.g., `analyst.md`).
      - Applies any `Customize:` instructions.
      - Announces the activation (e.g., "Activating Analyst (Larry)...").
      - **The orchestrator then fully embodies the chosen agent.** Its original orchestrator persona becomes dormant.
    - **Task Execution:** Once a persona is active, it will try to match your request to one of its configured `Tasks`.
      - If the task references an external file (e.g., `create-prd.md`), that file is loaded and its instructions are followed. The active persona will use the `Data Resolution` paths from the main config to find any dependent files like templates or checklists mentioned in the task file.
      - If a task is marked as "In Memory" (or similar), the active persona executes it based on its internal definition.
    - **Context and Persona Switching:** The orchestrator embodies only one persona at a time. If you ask to switch to a different persona while one is active, it will typically advise starting a new chat session to maintain clear context. However, it allows an explicit "override safety protocol" command if you insist on switching personas within the same chat. This terminates the current persona and re-initializes with the new one.

#### Usage Instructions for IDE Orchestrator

1. **Set up your configuration (`ide-bmad-orchestrator.cfg.md`):**
    - Ensure you have an `ide-bmad-orchestrator.cfg.md` file. You can use the one located in `bmad-agent/` as a template or starting point.
    - Verify that the `Data Resolution` paths at the top correctly point to your asset folders (personas, tasks, templates, checklists, data) relative to your project structure.
    - Define your desired agents with their `Title`, `Name`, `Customize` instructions, `Persona` file, and `Tasks`. Ensure the referenced persona and task files exist in the locations specified by your `Data Resolution` paths.
2. **Set up your persona and task files:**
    - Create the Markdown files for each persona (e.g., `analyst.md`, `po.md`) in your `personas` directory.
    - Create the Markdown files for each task (e.g., `create-prd.md`) in your `tasks` directory.
3. **Activate the Orchestrator:**
    - In your IDE (e.g., Cursor), select the `ide-bmad-orchestrator.md` file/agent as your active AI assistant.
4. **Interact with the Orchestrator:**
    - **Initial Interaction:**
      - The orchestrator will greet you and confirm it has loaded its configuration.
      - You can ask: "What agents are available?" or "List personas and tasks."
    - **Activating a Persona:**
      - Tell the orchestrator which persona you want: "I want to work with the Product Owner," or "Activate Curly," or "Become the PO."
    - **Performing a Task:**
      - Once a persona is active, state the task: "Create a PRD," or if the persona is "Curly" (the PO), you might say "Curly, create the next story."
      - You can also combine persona activation and task request: "Curly, I need you to create a PRD."
    - **Switching Personas:**
      - If you need to switch: "I need to talk to the Architect now."
      - The orchestrator will advise a new chat. If you want to switch in the current chat, you'll need to give an explicit override command when prompted (e.g., "Override safety protocol and switch to Architect").
    - **Follow Persona Instructions:** Once a persona is active, it will guide you based on its definition and the task it's performing. Remember that resource files like templates or checklists referenced by a task will be resolved using the global `Data Resolution` paths in the `ide-bmad-orchestrator.cfg.md`.

This setup allows for a highly flexible and dynamically configured multi-persona agent directly within your IDE, streamlining various development and project management workflows.

## Tasks

The Tasks can be copied into your project docs/tasks folder, along with the checklists and templates. The tasks are meant to reduce the amount of 1 off IDE agents - you can just drop a task into chat with any agent and it will perform the 1 off task. There will be full workflow + task coming post V3 that will expand on this - but tasks and workflows are a powerful concept that will allow us to build in a lot of capabilities for our agents, without having to bloat their overall programming and context in the IDE - especially useful for tasks that are not used frequently - similar to seldom used ide rules files.
