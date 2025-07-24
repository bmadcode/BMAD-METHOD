# Lightweight IDE Detection

Minimal-token environment detection to optimize BMAD task execution without consuming significant context window space.

[[LLM: This micro-task uses <100 tokens to detect IDE environment and cache results for session reuse]]

## Quick Detection Process

### Single Command Detection (50-100 tokens)

```bash
# Lightweight IDE detection with environment file persistence
if [ -f "tmp/ide-detected.txt" ]; then
  DETECTED_IDE=$(cat tmp/ide-detected.txt)
else
  mkdir -p tmp
  if [ -n "$CURSOR_SESSION" ] || pgrep -f "cursor" > /dev/null; then
    DETECTED_IDE="cursor"
  elif [ -n "$CLAUDE_CODE_CLI" ] || [ -n "$CLAUDE_CLI" ]; then
    DETECTED_IDE="claude-code"
  elif [ -n "$REPLIT_DB_URL" ] || [ -n "$REPL_ID" ]; then
    DETECTED_IDE="roo"
  elif pgrep -f "windsurf" > /dev/null; then
    DETECTED_IDE="windsurf"
  elif pgrep -f "trae" > /dev/null; then
    DETECTED_IDE="trae"
  elif code --list-extensions 2>/dev/null | grep -q "cline"; then
    DETECTED_IDE="cline"
  elif [ -n "$GEMINI_API_KEY" ] && pgrep -f "gemini" > /dev/null; then
    DETECTED_IDE="gemini"
  elif code --list-extensions 2>/dev/null | grep -q "copilot"; then
    DETECTED_IDE="github-copilot"
  else
    DETECTED_IDE="cli"
  fi
  echo "$DETECTED_IDE" > tmp/ide-detected.txt
fi

# Set execution mode based on detected IDE
case $DETECTED_IDE in
  cursor|claude-code|windsurf|trae|roo|cline|gemini|github-copilot)
    APPROVAL_REQUIRED=false
    BATCH_COMMANDS=false
    USE_IDE_TOOLS=true
    ;;
  cli)
    APPROVAL_REQUIRED=true
    BATCH_COMMANDS=true
    USE_IDE_TOOLS=false
    ;;
esac

# Create/update .bmad_env file with IDE environment variables for persistent state
> .bmad_env
echo "export DETECTED_IDE=\"$DETECTED_IDE\"" >> .bmad_env
echo "export USE_IDE_TOOLS=\"$USE_IDE_TOOLS\"" >> .bmad_env
echo "export BATCH_COMMANDS=\"$BATCH_COMMANDS\"" >> .bmad_env
echo "export APPROVAL_REQUIRED=\"$APPROVAL_REQUIRED\"" >> .bmad_env

echo "IDE: $DETECTED_IDE | Use IDE Tools: $USE_IDE_TOOLS | Batch: $BATCH_COMMANDS"
echo "Environment configuration saved to .bmad_env for persistent state across tool calls"
```

## Tool Adaptation Logic

**Based on detected IDE, adapt command execution:**

- **IDE Detected**: Use native tools, no approval prompts
- **CLI Mode**: Batch commands with `&&` chaining
- **Unknown**: Default to CLI mode with batching

## Usage in Tasks

**Replace individual bash calls with environment-aware execution:**

```bash
# Instead of multiple separate commands:
# git log --oneline -10
# git log --grep="interface" 
# git status

# Use single batched command when in CLI mode:
if [ "$BATCH_COMMANDS" = "true" ]; then
  echo "=== Git Analysis ===" && \
  git log --oneline -10 && \
  echo "=== Interface Changes ===" && \
  git log --oneline -20 --grep="interface|API|contract" && \
  echo "=== Status ===" && \
  git status
else
  # Use IDE-native tools when available
  echo "Using IDE-integrated git tools"
fi
```

## Session Caching

- **First detection**: ~100 tokens
- **Subsequent uses**: ~10 tokens (read cached result)
- **Cache location**: `tmp/ide-detected.txt`
- **Cache duration**: Per session

## Success Criteria

- [ ] Minimal token usage (<100 tokens initial, <10 tokens cached)
- [ ] Accurate IDE detection for all supported environments
- [ ] Eliminates approval prompts in IDE environments
- [ ] Batches commands effectively in CLI mode
- [ ] Caches results for session reuse