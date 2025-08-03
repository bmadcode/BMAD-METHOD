#!/usr/bin/env bash
# bmad-lib.sh - Shared utilities for BMAD commands
# Author: Quinn (Senior Developer QA)
# Version: 1.0.0

# ============================================================================
# SHELL COMPATIBILITY LAYER
# ============================================================================

# Detect shell and set compatibility options
setup_shell_compatibility() {
    if [ -n "$ZSH_VERSION" ]; then
        # ZSH specific settings
        setopt LOCAL_OPTIONS NO_KSH_ARRAYS
        setopt PIPE_FAIL 2>/dev/null || true
        # Avoid reserved variable names in ZSH
        export BMAD_SHELL="zsh"
    elif [ -n "$BASH_VERSION" ]; then
        # Bash specific settings
        set -euo pipefail
        export BMAD_SHELL="bash"
    else
        # POSIX fallback
        export BMAD_SHELL="sh"
    fi
}

# ============================================================================
# ERROR HANDLING
# ============================================================================

# Consistent error reporting
bmad_error() {
    echo "❌ ERROR: $1" >&2
    return "${2:-1}"
}

# Warning messages
bmad_warn() {
    echo "⚠️  WARNING: $1" >&2
}

# Success messages
bmad_success() {
    echo "✅ $1"
}

# ============================================================================
# PROJECT VALIDATION
# ============================================================================

# Check if in a BMAD project
validate_bmad_project() {
    if [ ! -d ".bmad" ]; then
        bmad_error "No BMAD project found. Please initialize a project first."
        return 1
    fi
    
    if [ ! -d ".bmad/stories" ]; then
        mkdir -p .bmad/stories
        bmad_warn "Created missing stories directory"
    fi
    
    if [ ! -d ".bmad/documents" ]; then
        mkdir -p .bmad/documents
        bmad_warn "Created missing documents directory"
    fi
    
    return 0
}

# ============================================================================
# YAML VALIDATION
# ============================================================================

# Validate story file structure
validate_story_file() {
    local file="$1"
    local required_fields="id title status epic"
    local missing_fields=""
    
    if [ ! -f "$file" ]; then
        bmad_error "File not found: $file"
        return 1
    fi
    
    for field in $required_fields; do
        if ! grep -q "^${field}:" "$file" 2>/dev/null; then
            missing_fields="$missing_fields $field"
        fi
    done
    
    if [ -n "$missing_fields" ]; then
        bmad_error "Story file $file missing required fields:$missing_fields"
        return 1
    fi
    
    return 0
}

# Validate YAML field value
validate_yaml_value() {
    local file="$1"
    local field="$2"
    local pattern="$3"
    local value
    
    value=$(grep "^${field}:" "$file" 2>/dev/null | cut -d: -f2- | sed 's/^ //')
    
    if [ -z "$value" ]; then
        return 1
    fi
    
    if ! echo "$value" | grep -qE "$pattern"; then
        bmad_error "Invalid value for $field: $value"
        return 1
    fi
    
    return 0
}

# ============================================================================
# SAFE YAML PARSING
# ============================================================================

# Extract field value from YAML file
get_yaml_field() {
    local file="$1"
    local field="$2"
    local default="${3:-}"
    
    if [ ! -f "$file" ]; then
        echo "$default"
        return
    fi
    
    local value
    value=$(grep "^${field}:" "$file" 2>/dev/null | cut -d: -f2- | sed 's/^ //' | tr -d '\r')
    
    # Handle null or empty values
    if [ -z "$value" ] || [ "$value" = "null" ]; then
        echo "$default"
    else
        echo "$value"
    fi
}

# Extract multi-line field from YAML
get_yaml_multiline() {
    local file="$1"
    local field="$2"
    
    awk "/^${field}:/ {flag=1; next} /^[^ ]/ {flag=0} flag" "$file" 2>/dev/null
}

# ============================================================================
# PERFORMANCE OPTIMIZATION
# ============================================================================

# Setup cache directory
setup_cache() {
    local cache_dir=".bmad/.cache"
    
    if [ ! -d "$cache_dir" ]; then
        mkdir -p "$cache_dir"
    fi
    
    echo "$cache_dir"
}

# Check if cache is valid (newer than source files)
is_cache_valid() {
    local cache_file="$1"
    local source_dir="$2"
    
    if [ ! -f "$cache_file" ]; then
        return 1
    fi
    
    # Find any source file newer than cache
    if find "$source_dir" -name "*.yaml" -newer "$cache_file" 2>/dev/null | grep -q .; then
        return 1
    fi
    
    return 0
}

# Cache story statuses for performance
cache_story_statuses() {
    local cache_dir
    cache_dir=$(setup_cache)
    local cache_file="$cache_dir/story_statuses.cache"
    
    if is_cache_valid "$cache_file" ".bmad/stories"; then
        cat "$cache_file"
        return 0
    fi
    
    # Rebuild cache
    find .bmad/stories -name "*.yaml" -exec grep -H "^status:" {} \; 2>/dev/null | \
        tee "$cache_file"
}

# ============================================================================
# FORMATTING HELPERS
# ============================================================================

# Generate progress bar
progress_bar() {
    local current="$1"
    local total="$2"
    local width="${3:-10}"
    
    if [ "$total" -eq 0 ]; then
        echo "[----------]"
        return
    fi
    
    local percent=$((current * 100 / total))
    local filled=$((current * width / total))
    local empty=$((width - filled))
    
    printf "["
    printf "█%.0s" $(seq 1 $filled 2>/dev/null || yes | head -n $filled | tr -d '\n')
    printf "░%.0s" $(seq 1 $empty 2>/dev/null || yes | head -n $empty | tr -d '\n')
    printf "] %d%%" "$percent"
}

# Map status to emoji
status_to_emoji() {
    local status="$1"
    
    case "$status" in
        "draft") echo "📝" ;;
        "ready") echo "📋" ;;
        "in_progress") echo "🔄" ;;
        "code_review") echo "👀" ;;
        "qa_testing") echo "🧪" ;;
        "completed"|"done") echo "✅" ;;
        "blocked") echo "🚫" ;;
        *) echo "❓" ;;
    esac
}

# Priority to emoji
priority_to_emoji() {
    local priority="$1"
    
    case "$priority" in
        "high") echo "🔴" ;;
        "medium") echo "🟡" ;;
        "low") echo "🔵" ;;
        *) echo "⚪" ;;
    esac
}

# ============================================================================
# DATA AGGREGATION
# ============================================================================

# Count stories by status (optimized single pass)
count_stories_by_status() {
    awk '
        /^status: draft/ {draft++}
        /^status: ready/ {ready++}
        /^status: in_progress/ {in_progress++}
        /^status: code_review/ {code_review++}
        /^status: qa_testing/ {qa_testing++}
        /^status: completed|^status: done/ {completed++}
        END {
            print "draft=" draft+0
            print "ready=" ready+0
            print "in_progress=" in_progress+0
            print "code_review=" code_review+0
            print "qa_testing=" qa_testing+0
            print "completed=" completed+0
        }
    ' .bmad/stories/*.yaml 2>/dev/null
}

# Calculate story points (optimized)
calculate_points() {
    local filter="${1:-}"
    
    if [ -z "$filter" ]; then
        awk '/^points:/ {sum+=$2} END {print sum+0}' .bmad/stories/*.yaml 2>/dev/null
    else
        grep -l "$filter" .bmad/stories/*.yaml 2>/dev/null | \
            xargs awk '/^points:/ {sum+=$2} END {print sum+0}' 2>/dev/null
    fi
}

# ============================================================================
# COLOR OUTPUT SUPPORT
# ============================================================================

# Check if terminal supports colors
supports_color() {
    if [ -t 1 ] && [ -n "${TERM:-}" ] && [ "$TERM" != "dumb" ]; then
        return 0
    fi
    return 1
}

# Color codes (only if supported)
setup_colors() {
    if supports_color; then
        export RED='\033[0;31m'
        export GREEN='\033[0;32m'
        export YELLOW='\033[1;33m'
        export BLUE='\033[0;34m'
        export PURPLE='\033[0;35m'
        export CYAN='\033[0;36m'
        export BOLD='\033[1m'
        export RESET='\033[0m'
    else
        export RED=''
        export GREEN=''
        export YELLOW=''
        export BLUE=''
        export PURPLE=''
        export CYAN=''
        export BOLD=''
        export RESET=''
    fi
}

# ============================================================================
# INITIALIZATION
# ============================================================================

# Initialize library
bmad_lib_init() {
    setup_shell_compatibility
    setup_colors
}

# Auto-initialize if sourced
bmad_lib_init