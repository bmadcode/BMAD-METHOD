#!/bin/bash
# BMAD Session Check Hook
# Checks for active BMAD sessions and displays them if needed

SESSIONS_DIR="$HOME/.bmad/sessions"
if [ -d "$SESSIONS_DIR" ] && [ "$(ls -A $SESSIONS_DIR 2>/dev/null)" ]; then
  echo "📋 Active BMAD Sessions available. Use /bmad-sessions to view."
fi