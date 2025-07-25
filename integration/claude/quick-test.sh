#!/bin/bash

# Quick End-to-End Test for BMAD Claude Integration
echo "🚀 BMAD Claude Integration - Quick Test"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS=0
PASSED=0

run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -e "\n📋 Test $((++TESTS)): $test_name"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAILED${NC}"
    fi
}

# Navigate to repo root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/../.."

echo "Working directory: $(pwd)"
echo "Files in .claude/agents/:"
ls -la .claude/agents/ 2>/dev/null || echo "No .claude/agents directory found"
echo ""

# Test 1: Dependencies check
run_test "Node.js version check" "node --version | grep -E 'v[2-9][0-9]|v1[89]|v[2-9][0-9]'"

# Test 2: Build agents
run_test "Build Claude agents" "npm run build:claude > /dev/null 2>&1"

# Test 3: Validate agent files exist
run_test "Agent files exist" "ls .claude/agents/analyst.md .claude/agents/architect.md .claude/agents/dev.md .claude/agents/pm.md .claude/agents/qa.md .claude/agents/sm.md > /dev/null 2>&1"

# Test 4: Validate agent file structure
run_test "Agent file structure valid" "cd integration/claude && npm run validate > /dev/null 2>&1"

# Test 5: Check YAML frontmatter
run_test "Analyst YAML frontmatter" "test -f .claude/agents/analyst.md && cat .claude/agents/analyst.md | grep -q 'name: Mary'"

# Test 6: Check agent content
run_test "Agent persona content" "test -f .claude/agents/analyst.md && cat .claude/agents/analyst.md | grep -q 'You are Mary'"

# Test 7: Check BMAD dependencies listed
run_test "BMAD dependencies listed" "test -f .claude/agents/analyst.md && cat .claude/agents/analyst.md | grep -q 'bmad-core'"

# Test 8: Memory files created
run_test "Memory files created" "ls .claude/memory/*.md > /dev/null 2>&1"

# Test 9: Claude Code available (optional)
if command -v claude &> /dev/null; then
    run_test "Claude Code available" "claude --version > /dev/null 2>&1"
    CLAUDE_AVAILABLE=true
else
    echo -e "\n⚠️  Claude Code not installed - skipping CLI tests"
    echo "   Install from: https://claude.ai/code"
    CLAUDE_AVAILABLE=false
fi

# Summary
echo ""
echo "======================================"
echo -e "📊 Test Results: ${GREEN}$PASSED${NC}/$TESTS tests passed"

if [ $PASSED -eq $TESTS ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    
    if [ "$CLAUDE_AVAILABLE" = true ]; then
        echo ""
        echo "🚀 Ready for manual testing!"
        echo ""
        echo "Next steps:"
        echo "1. Run: claude"
        echo "2. Try: /agents"
        echo "3. Test: 'Use the analyst subagent to help me create a project brief'"
        echo ""
        echo "See integration/claude/TESTING.md for comprehensive test scenarios"
    else
        echo ""
        echo "⚠️  Install Claude Code to complete testing:"
        echo "   https://claude.ai/code"
    fi
    
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    echo ""
    echo "Check the following:"
    echo "- Node.js version >= 18"
    echo "- npm dependencies installed"
    echo "- BMAD core files present"
    
    exit 1
fi
