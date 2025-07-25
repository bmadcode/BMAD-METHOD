#!/bin/bash

# Quick Start Test for BMAD Claude Integration
# Provides simple validation and setup for manual testing with o3 judge

echo "🚀 BMAD Claude Integration - Quick Start Test"
echo "============================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Change to repo root
cd "$(dirname "$0")/../.."

echo -e "${BLUE}📂 Working directory: $(pwd)${NC}"
echo ""

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js ${NODE_VERSION}${NC}"
else
    echo -e "${RED}❌ Node.js not found${NC}"
    exit 1
fi

# Check Claude Code
if command -v claude &> /dev/null; then
    CLAUDE_VERSION=$(claude --version 2>&1 | head -1)
    echo -e "${GREEN}✅ Claude Code detected${NC}"
else
    echo -e "${YELLOW}⚠️  Claude Code not found${NC}"
    echo "   Install from: https://claude.ai/code"
fi

# Check if agents are built
if [ -d ".claude/agents" ]; then
    AGENT_COUNT=$(ls .claude/agents/*.md 2>/dev/null | wc -l)
    echo -e "${GREEN}✅ Found ${AGENT_COUNT} agent files${NC}"
else
    echo -e "${YELLOW}⚠️  No agents found - building them now...${NC}"
    npm run build:claude
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Agents built successfully${NC}"
    else
        echo -e "${RED}❌ Failed to build agents${NC}"
        exit 1
    fi
fi

# Validate agent files
echo ""
echo "🔍 Validating agent configurations..."
cd integration/claude
npm run validate > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ All agent configurations valid${NC}"
else
    echo -e "${YELLOW}⚠️  Agent validation warnings (check with: npm run validate)${NC}"
fi
cd ../..

# Show available agents
echo ""
echo "🎭 Available BMAD Agents:"
for agent in .claude/agents/*.md; do
    if [ -f "$agent" ]; then
        AGENT_NAME=$(basename "$agent" .md)
        AGENT_TITLE=$(grep "^name:" "$agent" | cut -d: -f2- | sed 's/^ *//')
        echo -e "${BLUE}   📋 ${AGENT_NAME}: ${AGENT_TITLE}${NC}"
    fi
done

# Create test commands
echo ""
echo "🧪 Quick Test Commands:"
echo "======================"

cat << 'EOF'

1. Start Claude Code:
   claude

2. Test Analyst Agent:
   Use the analyst subagent to help me research the competitive landscape for AI project management tools.

3. Test Dev Agent:
   Have the dev subagent implement a JWT authentication middleware with error handling.

4. Test Architect Agent:
   Ask the architect subagent to design a microservices architecture for real-time notifications.

5. Check Available Agents:
   /agents

EOF

# Provide next steps
echo ""
echo -e "${GREEN}🎯 Next Steps for Complete Testing:${NC}"
echo "1. Run the manual test commands above in Claude Code"
echo "2. Copy responses and use Oracle tool for o3 evaluation"
echo "3. See complete-test-framework.md for comprehensive testing"
echo "4. Use manual-test-guide.md for detailed evaluation criteria"

# Check if we can run a basic file test
echo ""
echo "🔬 Basic File Structure Test:"
if [ -f ".claude/agents/analyst.md" ]; then
    # Check if analyst file has expected content
    if grep -q "Mary" ".claude/agents/analyst.md"; then
        echo -e "${GREEN}✅ Analyst agent properly configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Analyst agent may need reconfiguration${NC}"
    fi
    
    if grep -q "bmad-core" ".claude/agents/analyst.md"; then
        echo -e "${GREEN}✅ BMAD integration references present${NC}"
    else
        echo -e "${YELLOW}⚠️  Limited BMAD integration detected${NC}"
    fi
else
    echo -e "${RED}❌ Analyst agent file not found${NC}"
fi

# Summary
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
if command -v claude &> /dev/null; then
    echo -e "${GREEN}Ready to test! Run: ${BLUE}claude${GREEN} to start testing.${NC}"
else
    echo -e "${YELLOW}Install Claude Code first, then run: ${BLUE}claude${NC}"
fi

echo ""
echo "📚 Testing Resources:"
echo "   📖 integration/claude/complete-test-framework.md"
echo "   📋 integration/claude/manual-test-guide.md"
echo "   🔧 integration/claude/TESTING.md"
