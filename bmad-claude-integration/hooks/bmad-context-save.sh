#!/bin/bash
# BMAD Context Save Hook
# Saves context when a BMAD subagent completes

AGENT_NAME="$1"
SESSION_ID="$2"
CONTEXT_FILE="$HOME/.bmad/sessions/${AGENT_NAME}/${SESSION_ID}/context.json"

if [ -n "$CONTEXT_FILE" ] && [ -f "$CONTEXT_FILE" ]; then
  cp "$CONTEXT_FILE" "$CONTEXT_FILE.bak"
fi