# IDE Instructions for Agent Configuration

The Uber Orchestrating BMad Agent is mainly recommended for use in Gemini Web, especially for working on the brief, PRD, high level Epics, Stories, Web Deign and Prompt Output. BUT - Everything can also be done in the IDE if desired, see the BMad Agent setup section below.

## Single Agent

Create a custom mode following the docs, and paste in any of the agents that end with .ide.md from the personas folder.

## Tasks

As cursor currently limits the total number of allowed custom modes - you can utilize tasks to handle 1 off actions you might want an agent to perform. Just drag the task into any agent chat window and ask the agent to complete the task.

## BMad Agent

The BMad Agent requires the full bmad agent folder to be at the root of your project. Set up of the orchestrator simply requires copy of the markdown content of ide-bmad-orchestrator.md the same way you would do the Single Agent.

## Setting Up Custom Modes in Cursor

To use custom agent modes - review the docs here: https://docs.cursor.com/chat/custom-modes.

- Specifically you will need to enable Custom Modes in: Settings  Features  Chat  Custom modes
- Custom Agents can be created and configured with specific tools, models, and custom prompts
- Cursor allows creating custom agents through a GUI interface

NOTE from Cursor: "Were considering adding a .cursor/modes.json file to your project to make it easier to create and share custom modes."

## Windsurf

### Setting Up Custom Modes in Windsurf

1. **Access Agent Configuration**:

   - Click on "Windsurf - Settings" button on the bottom right
   - Access Advanced Settings via the button in the settings panel or from the top right profile dropdown

2. **Configuring Custom Rules**:

   - Define custom AI rules for Cascade (Windsurf's agentic chatbot)
   - Specify that agents should respond in certain ways, use particular frameworks, or follow specific APIs

3. **Using Flows**:

   - Flows combine Agents and Copilots for a comprehensive workflow
   - The Windsurf Editor is designed for AI agents that can tackle complex tasks independently
   - Use Model Context Protocol (MCP) to extend agent capabilities

4. **BMAD Method Implementation**:
   - Create custom agents for each role in the BMAD workflow
   - Configure each agent with appropriate permissions and capabilities
   - Utilize Windsurf's agentic features to maintain workflow continuity

## RooCode

### Setting Up Custom Agents in RooCode

1. **Custom Modes Configuration**:

   - Create tailored AI behaviors through configuration files
   - Each custom mode can have specific prompts, file restrictions, and auto-approval settings

2. **Creating BMAD Method Agents**:

   - Create distinct modes for each BMAD role (Analyst, PM, Architect, Design Architect, PO, SM, Dev, etc...)
   - Customize each mode with tailored prompts specific to their role
   - Configure file restrictions appropriate to each role (e.g., Architect and PM modes may edit markdown files)
   - Set up direct mode switching so agents can request to switch to other modes when needed

3. **Model Configuration**:

   - Configure different models per mode (e.g., advanced model for architecture vs. cheaper model for daily coding tasks)
   - RooCode supports multiple API providers including OpenRouter, Anthropic, OpenAI, Google Gemini, AWS Bedrock, Azure, and local models

4. **Usage Tracking**:
   - Monitor token and cost usage for each session
   - Optimize model selection based on the complexity of tasks

## Cline

### Setting Up Custom Agents in Cline

1. **Custom Instructions**:

   - Access via Cline > Settings > Custom Instructions
   - Provide behavioral guidelines for your agents

2. **Custom Tools Integration**:

   - Cline can extend capabilities through the Model Context Protocol (MCP)
   - Ask Cline to "add a tool" and it will create a new MCP server tailored to your specific workflow
   - Custom tools are saved locally at ~/Documents/Cline/MCP, making them easy to share with your team

3. **BMAD Method Implementation**:

   - Create custom tools for each role in the BMAD workflow
   - Configure behavioral guidelines specific to each role
   - Utilize Cline's autonomous abilities to handle the entire workflow

4. **Model Selection**:
   - Configure Cline to use different models based on the role and task complexity

## GitHub Copilot

### Custom Agent Configuration (Coming Soon)

https://github.com/microsoft/vscode-copilot-release/issues/9452

GitHub Copilot is currently developing its Copilot Extensions system, which will allow for custom agent/mode creation:

1. **Copilot Extensions**:

   - Combines a GitHub App with a Copilot agent to create custom functionality
   - Allows developers to build and integrate custom features directly into Copilot Chat

2. **Building Custom Agents**:

   - Requires creating a GitHub App and integrating it with a Copilot agent
   - Custom agents can be deployed to a server reachable by HTTP request

3. **Custom Instructions**:
   - Currently supports basic custom instructions for guiding general behavior
   - Full agent customization support is under development

_Note: Full custom mode configuration in GitHub Copilot is still in development. Check GitHub's documentation for the latest updates._
