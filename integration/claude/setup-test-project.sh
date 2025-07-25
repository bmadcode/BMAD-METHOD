#!/bin/bash

# Setup Test Project for BMAD Claude Integration
echo "🛠️  Setting up test project for BMAD Claude integration..."

# Get test directory from user or use default
TEST_DIR="${1:-$HOME/bmad-claude-test}"

echo "📁 Creating test project in: $TEST_DIR"

# Create test project structure
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Initialize basic project
echo "# BMAD Claude Integration Test Project

This is a test project for validating BMAD-Method Claude Code integration.

## Generated on: $(date)
" > README.md

# Create sample project structure
mkdir -p {src,docs,tests,stories}

# Create sample story file
cat > stories/sample-feature.story.md << 'EOF'
# Sample Feature Story

## Overview
Implement a sample feature to test BMAD agent integration with Claude Code.

## Acceptance Criteria
- [ ] Feature has proper error handling
- [ ] Feature includes unit tests
- [ ] Feature follows project conventions
- [ ] Documentation is updated

## Technical Notes
- Use existing project patterns
- Ensure backwards compatibility
- Consider performance implications

## Definition of Done
- [ ] Code implemented and reviewed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Feature deployed to staging
EOF

# Create sample source file
mkdir -p src/utils
cat > src/utils/sample.js << 'EOF'
// Sample utility function for testing
function processData(input) {
    if (!input) {
        throw new Error('Input is required');
    }
    
    return {
        processed: true,
        data: input.toUpperCase(),
        timestamp: new Date().toISOString()
    };
}

module.exports = { processData };
EOF

# Copy BMAD method to test project
echo "📋 Copying BMAD-Method to test project..."
cp -r "$(dirname "$0")/../.." "$TEST_DIR/BMAD-AT-CLAUDE"

cd "$TEST_DIR/BMAD-AT-CLAUDE"

# Install dependencies and build
echo "📦 Installing dependencies..."
npm install

echo "🔨 Building Claude agents..."
npm run build:claude

# Create .gitignore for test project
cat > "$TEST_DIR/.gitignore" << 'EOF'
# Dependencies
node_modules/
npm-debug.log*

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# BMAD generated files are OK to track for testing
# .claude/
EOF

# Summary
echo ""
echo "✅ Test project setup complete!"
echo ""
echo "📍 Project location: $TEST_DIR"
echo "📂 BMAD location: $TEST_DIR/BMAD-AT-CLAUDE"
echo ""
echo "🚀 Next steps:"
echo "1. cd $TEST_DIR/BMAD-AT-CLAUDE"
echo "2. claude"
echo "3. /agents"
echo ""
echo "💡 Test scenarios:"
echo "• Use the analyst subagent to analyze the sample story"
echo "• Ask the dev subagent to implement the sample feature" 
echo "• Have the qa subagent create tests for the utility function"
echo ""
echo "📖 Full testing guide: $TEST_DIR/BMAD-AT-CLAUDE/integration/claude/TESTING.md"
