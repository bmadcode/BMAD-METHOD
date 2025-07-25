#!/bin/bash
# BMAD Session Switch Hook
# Handles session switching and suspension

BMAD_DIR="$HOME/.bmad"
SESSIONS_DIR="$BMAD_DIR/sessions"
CURRENT_SESSION="$BMAD_DIR/.current-session"
ACTION="$1"
TARGET="$2"

case "$ACTION" in
  "switch")
    if [ -n "$TARGET" ]; then
      echo "$TARGET" > "$CURRENT_SESSION"
      echo "✅ Switched to session $TARGET"
    fi
    ;;
  "suspend")
    if [ -f "$CURRENT_SESSION" ]; then
      SESSION_ID=$(cat "$CURRENT_SESSION")
      touch "$SESSIONS_DIR/$SESSION_ID/.suspended"
      echo "⏸️ Session $SESSION_ID suspended"
    fi
    ;;
  "resume")
    if [ -n "$TARGET" ]; then
      rm -f "$SESSIONS_DIR/$TARGET/.suspended" 2>/dev/null
      echo "$TARGET" > "$CURRENT_SESSION"
      echo "▶️ Resumed session $TARGET"
    fi
    ;;
esac