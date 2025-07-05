# BMAD-MCP

A Model Context Protocol (MCP) server that provides prompts and resources to support AI agents in development using the BMAD (Breakthrough Method of Agile AI-Driven Development) methodology.

## Installation

Installation depends on your AI agent. For example in VSCode, you can install the npm package directly via action `MCP: Add Server...` → `NPM Package` → `@bmad/mcp-server`. Alternatively, you can install it as `stdio` MCP server that runs the command `npx @bmad/mcp-server`.

## Usage

How to execute MCP prompts of this MCP server depends on your AI agent. For example in VSCode Copilot, you can show all available actions by typing `/` into the chat message field.

## Development

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd BMAD-METHOD/bmad-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm run test

# Start the MCP Inspector
npm run inspector
```

### Install local build as MCP server

To install the local build during development, you can add `node bmad-mcp/dist/index.js` as MCP server. For example in VSCode, this can be done with action `MCP: Add Server...` → `Command (stdio)` → `node bmad-mcp/dist/index.js` (might need absolute path when not installing in workspace).

## Requirements

- Node.js 18+
- Compatible with MCP specification version `2025-03-26`
