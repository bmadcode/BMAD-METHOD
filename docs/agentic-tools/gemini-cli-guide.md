# BMad Method Guide for Gemini CLI

For the complete workflow, see the [BMad Workflow Guide](../bmad-workflow-guide.md).

## Installation

When running `npx bmad-method install`, select **Gemini CLI** as your IDE. This creates:

- `.gemini/bmad-method/` directory with all agent context in GEMINI.md file

## Using BMad Agents with Gemini CLI

Simply mention the agent in your prompt:

- "As \*dev, implement the login feature"
- "Acting as \*architect, review this system design"
- "\*sm, create the next story for our project"

The Gemini CLI automatically loads the appropriate agent context.

## Gemini CLI-Specific Features

- **Context files**: All agents loaded as context in `.gemini/bmad-method/GEMINI.md`
- **Automatic loading**: GEMINI.md ensures agents are always available
- **Natural language**: No special syntax needed, just mention the agent

## Tips for Gemini CLI Users

- Be explicit about which agent you're addressing
- You can switch agents mid-conversation by mentioning a different one
- The CLI maintains context across your session
