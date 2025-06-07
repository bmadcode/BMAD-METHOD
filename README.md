# The BMAD-Method 3.1 (Breakthrough Method of Agile (ai-driven) Development)

Old Versions:
[Prior Version 1](https://github.com/bmadcode/BMAD-METHOD/tree/V1)
[Prior Version 2](https://github.com/bmadcode/BMAD-METHOD/tree/V2)

## Do This First, and all will make sense

There are lots of docs here, but I HIGHLY suggest you just try the Web Agent - it takes just a few minutes to set up in Gemini - and you can use the BMad Agent to explain how this method works, how to set up in the IDE, how to set up in the Web, what should be done in the web or ide (although you can choose your own path also!) - all just by talking to the bmad agent!

### Web Quickstart Project Setup (Recommended)

Orchestrator Uber BMad Agent that does it all - already pre-compiled in the `web-build-sample` folder.

- The contents of [Agent Prompt Sample](web-build-sample/agent-prompt.txt) text get pasted into the Gemini Gem, or ChatPGT customGPT 'Instructions' field.
- The remaining files in that same folder folder just need to be attached as shown in the screenshot below. Give it a name (such as BMad Agent) and save it, and you now have the BMad Agent available to help you brainstorm, research, plan, execute on your vision, or understand how this all even works!
- Once its running, start with typing `/help`, and then type option `2` when it presents 3 options to learn about the method!

![image info](docs/images/gem-setup.png)

### New: v0 UX/UI Architect Integration

The BMAD Method now includes a specialized **v0 UX/UI Architect** persona designed to work seamlessly with modern AI-powered design and development tools. This persona brings the power of rapid visual design generation and component implementation directly into your workflow.

#### Key Features:
- **Dual Environment Support**: Works in both web-based AI environments (ChatGPT, Gemini) and IDE environments (Cursor AI, Cline, Claude Code, Roocode)
- **Rapid Prototyping**: Transform simple prompts into fully-realized, visually stunning frontend implementations
- **Component-Based Thinking**: Naturally creates reusable components and design systems
- **Code-Design Synthesis**: Seamlessly moves between visual design concepts and production-ready code
- **Quality Assurance**: Includes comprehensive checklists and templates for consistent, high-quality output

#### Available Personas:
- **Veronica (Web-based)**: Perfect for design planning, specification creation, and visual concept generation
- **Victor (IDE-based)**: Optimized for direct implementation in development environments with real-time code generation

#### Quick Start with v0 UX/UI Architect:

1. **Web Environment**: Activate Veronica through the BMad Agent with `/persona veronica` or `/task rapid-prototype-from-brief`
2. **IDE Environment**: Use Victor in your preferred IDE (see setup guides in `docs/ide-setup-guides/`)
3. **Follow the Example**: Check out `examples/v0-ux-ui-architect-example.md` for a complete workflow demonstration
4. **Training Materials**: Comprehensive guides available in `docs/training/using-v0-ux-ui-architect.md`

#### Supported IDE Environments:
- **Cursor AI**: Advanced file system integration with codebase understanding
- **Cline (Claude Dev)**: Strong project context awareness with terminal integration
- **Claude Code**: Focus on code quality standards and best practices
- **Roocode**: Rapid prototyping with component library integration

This enhancement makes the BMAD Method incredibly versatile for frontend development - from initial concept generation to final implementation across multiple AI-powered development environments!

[More Documentation, Explanations, and IDE Specifics](docs/readme.md) available here!

## End Matter

Interested in improving the BMAD Method? See the [contributing guidelines](docs/CONTRIBUTING.md).

Thank you and enjoy - BMad!
[License](docs/LICENSE)
