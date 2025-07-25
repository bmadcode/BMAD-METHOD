#!/bin/bash
# BMAD Elicitation Handler Hook
# Manages elicitation state transitions

BMAD_DIR="$HOME/.bmad"
ELICITATION_DIR="$BMAD_DIR/queue/elicitation"
ACTIVE_ELICITATION="$BMAD_DIR/.active-elicitation"

# Check if we're in an elicitation phase
if [ -f "$ACTIVE_ELICITATION" ]; then
  SESSION_ID=$(cat "$ACTIVE_ELICITATION")
  SESSION_FILE="$ELICITATION_DIR/$SESSION_ID/session.json"
  
  if [ -f "$SESSION_FILE" ]; then
    AGENT=$(jq -r '.agent' "$SESSION_FILE" 2>/dev/null)
    ICON=$(jq -r '.ui.icon // "📝"' "$SESSION_FILE" 2>/dev/null)
    echo "$ICON Currently in elicitation with $AGENT agent (session: $SESSION_ID)"
  fi
fi