# BMAD Method Guide for Visual Studio Code

This guide covers the setup and usage of the BMAD Method in Visual Studio Code. For the complete workflow, see the [BMAD Workflow Guide](../bmad-workflow-guide.md).

## Installation

When running `npx bmad-method install`, select **Visual Studio Code** as your IDE. This command will perform the following actions:

- Create the `.bmad-core/` directory with all the agent rule files.

- Create the `.vscode/` directory and add a `settings.json` file with the basic configuration to enable GitHub Copilot's agent mode.

## Using BMAD Agents in VS Code

1. In the GitHub Copilot Chat window, select **Agent** from the chat mode dropdown list (usually located next to the input field).

2. Once in Agent Mode, type `@` and the agent's name in the chat input to activate it:

- `@bmad-master` - Universal task executor

- `@sm` - Scrum Master

- `@dev` - Full-stack developer

- `@architect` - Solution architect

- `@pm` - Product manager

- `@analyst` - Business analyst

- `@qa` - QA specialist

- `@po` - Product owner

- `@ux-expert` - UX specialist

## VS Code Specific Features

- **Dynamic Configuration**: When you first invoke an agent (e.g., `@dev`), VS Code will automatically update `.vscode/settings.json` by adding the configuration for that chat mode.

- **Activation**: Use the `@` prefix in the GitHub Copilot Chat for instant switching between agents.

- **Collaboration**: Fully compatible with **Live Share**, allowing you, your team, and BMAD agents to work together in real-time.

- **Project Context**: Agents have full access to your workspace, including open files and the selected code.

## Tips for VS Code Users

- Use the `help` command (e.g., `@dev help`) to see the available commands for each agent.

- Use `@workspace` in the Copilot Chat to ask questions about your entire project.

- Consider adding `.vscode/` and `.bmad-core/` to your `.gitignore` file in team projects to avoid conflicts with personal settings.
