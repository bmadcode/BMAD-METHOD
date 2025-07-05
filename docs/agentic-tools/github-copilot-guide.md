# BMad Method Guide for GitHub Copilot

For the complete workflow, see the [BMad Workflow Guide](../bmad-workflow-guide.md).

## Installation

When running `npx bmad-method install`, select **GitHub Copilot** as your IDE. This command will perform the following actions:

- Create the `.bmad-core/` directory with all the agent rule files.
- Create the `.vscode/` directory and add a `settings.json` file if it does not already exist, and add the basic configuration to enable GitHub Copilot's agent mode.
- Create a chatmodes file under your .github folder for each specific agent being added

## Using BMAD Agents in GitHub Copilot

1.  **Open GitHub Copilot chat** in VS Code (`⌃⌘I` on Mac, `Ctrl+Alt+I` on Windows/Linux).
2.  Select the agent you want to use from the chat input's participant selector (e.g., `@workspace` > `dev`).
3.  The agent adopts that persona for the conversation.
4.  Use `*help` to see the commands available for the selected agent.

## Available Agents

You can switch between agents using the chat participant selector. The following agents are available for GitHub Copilot:

- `bmad-master` - Master Task Executor
- `dev` - Development expert
- `qa` - Quality Assurance specialist
- `ux-expert` - UX specialist

## GitHub Copilot-Specific Features

- **Settings**: Use the `.vscode/settings.json` file to configure Copilot behavior. The installer can configure these for you.
  - `chat.agent.maxRequests`: Maximum requests per agent session (recommended: 15).
  - `github.copilot.chat.agent.runTasks`: Allow agents to run workspace tasks (e.g., from `package.json` scripts).
  - `github.copilot.chat.agent.autoFix`: Enable automatic error detection and fixing in generated code.
  - `chat.tools.autoApprove`: Auto-approve ALL tools without confirmation (use with caution).
- **VS Code integration**: Works within VS Code's GitHub Copilot chat panel.
- **Tool Confirmation**: Copilot will ask for confirmation before running tools that can modify files. You can approve a tool once, for the session, or always.

## Tips for GitHub Copilot Users

- You can use a `.github/copilot-instructions.md` file to provide additional context or instructions for your projects that are not covered by the BMAD framework.
- BMAD agents can come with a pre-configured set of tools. You can see which tools an agent uses by looking at the `tools` section in its `.github/chatmodes/[agent].chatmode.md` file.
