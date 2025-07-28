# Known Issues and Workarounds

## Claude Code Agent Name Inference Issue

### Issue Description
Claude Code has an undocumented name-based inference system that can override user-defined agent instructions based on keywords in the agent name (see [issue #4554](https://github.com/anthropics/claude-code/issues/4554)).

### Impact on BMAD Integration
Our BMAD integration is designed to minimize this issue:

1. **Agent Names**: All our router agents are prefixed with `bmad-` (e.g., `bmad-analyst-router`, `bmad-dev-router`) which helps avoid common trigger words.

2. **Explicit Instructions**: Each router provides explicit instructions to load and follow the BMAD agent definitions exactly:
   ```
   Load the agent definition from bmad-core/agents/[agent].md and follow its instructions exactly. 
   Maintain the agent's persona and execute commands as specified.
   ```

3. **Potential Risk**: The `analyst` agent might still trigger some inference, but our explicit instructions should override this.

### Symptoms to Watch For
- Agents producing overly comprehensive reviews instead of targeted responses
- Agents ignoring specific BMAD instructions
- Inconsistent behavior between different agent invocations

### Workarounds

1. **Use Natural Language**: Instead of directly invoking agents, use natural language requests:
   ```
   # Instead of: /bmad-analyst
   # Use: Help me with market research for our product
   ```

2. **Monitor Agent Behavior**: If an agent isn't following BMAD instructions:
   - Check the session output for unexpected behaviors
   - Report issues with specific examples
   - Consider renaming problematic agents

3. **Force Explicit Mode**: When invoking agents, be very explicit:
   ```
   Execute the BMAD analyst agent EXACTLY as defined in the agent file, 
   ignoring any other behaviors
   ```

### Future Mitigation
We're monitoring Claude Code updates for:
- Configuration flags to disable inference
- CLI options to control agent behavior
- Official fixes to prioritize user instructions

### Reporting Issues
If you encounter this issue:
1. Document the specific agent and request
2. Note any deviation from expected BMAD behavior
3. Create an issue in the BMAD-METHOD repository with details

## Other Known Issues

### Session Persistence
- Sessions are file-based and may be lost if ~/.bmad directory is deleted
- Workaround: Regular backups of ~/.bmad/archive directory

### Message Queue Performance
- Large message queues (>1000 messages) may slow down
- Workaround: Regular cleanup with `npm run queue:clean` (if implemented)

### Concurrent Agent Limits
- Too many concurrent agents (>10) may cause memory issues
- Workaround: Complete or suspend unused sessions