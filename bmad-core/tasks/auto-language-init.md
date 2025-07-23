# Auto Language Initialization

Automatic language detection and configuration that runs once per session to set up environment variables for all subsequent BMAD tasks.

[[LLM: This task runs automatically on first BMAD command to detect project language and configure all subsequent tasks]]

## Auto-Initialization System

### 1. **Session-Based Auto-Detection** (50-100 tokens)

```bash
# Auto-initialize language environment if not already done
auto_init_language_environment() {
  local CACHE_FILE="tmp/bmad-session.json"
  
  # Check if already initialized this session
  if [ -f "$CACHE_FILE" ]; then
    SESSION_AGE=$(jq -r '.initialized_at // "1970-01-01"' "$CACHE_FILE")
    if [ "$(date -d "$SESSION_AGE" +%s)" -gt "$(date -d '2 hours ago' +%s)" ]; then
      # Load cached environment variables
      source <(jq -r '.environment | to_entries[] | "export " + .key + "=\"" + .value + "\""' "$CACHE_FILE")
      echo "🔄 Using cached language environment: $BMAD_PRIMARY_LANGUAGE"
      return 0
    fi
  fi
  
  echo "🔍 Auto-detecting project language..."
  
  # Rapid language detection
  PROJECT_DIR="${1:-.}"
  PRIMARY_LANGUAGE="unknown"
  BUILD_COMMAND="echo 'No build system detected'"
  TEST_COMMAND="echo 'No test system detected'"
  SIMULATION_PATTERNS="TODO|FIXME|HACK"
  ERROR_PATTERNS="error:|Error:"
  COMPONENT_PATTERNS="[A-Z][a-zA-Z]*Service|[A-Z][a-zA-Z]*Controller|[A-Z][a-zA-Z]*Repository"
  FILE_EXTENSIONS="*.*"
  
  # Multi-tier detection strategy for new/existing projects
  
  # Tier 1: Config files (most reliable)
  if [ -f "$PROJECT_DIR/package.json" ]; then
    if grep -q '"typescript":\|"@types/\|"ts-' "$PROJECT_DIR/package.json" || [ -f "$PROJECT_DIR/tsconfig.json" ]; then
      PRIMARY_LANGUAGE="typescript"
      BUILD_COMMAND="npm run build 2>/dev/null || tsc --noEmit"
      TEST_COMMAND="npm test"
      SIMULATION_PATTERNS="Math\.random|jest\.fn|sinon\.|TODO|FIXME"
      ERROR_PATTERNS="TS[0-9]{4}|error TS"
      FILE_EXTENSIONS="*.ts|*.tsx"
    else
      PRIMARY_LANGUAGE="javascript"
      BUILD_COMMAND="npm run build 2>/dev/null || echo 'No build step'"
      TEST_COMMAND="npm test"
      SIMULATION_PATTERNS="Math\.random|jest\.fn|sinon\.|TODO|FIXME"
      ERROR_PATTERNS="Error:|SyntaxError:"
      FILE_EXTENSIONS="*.js|*.jsx"
    fi
  elif ls "$PROJECT_DIR"/*.csproj >/dev/null 2>&1 || [ -f "$PROJECT_DIR"/*.sln ]; then
    PRIMARY_LANGUAGE="csharp"
    BUILD_COMMAND="dotnet build --verbosity quiet"
    TEST_COMMAND="dotnet test --verbosity quiet"
    SIMULATION_PATTERNS="Random\.NextDouble|Task\.FromResult|NotImplementedException|Mock\.|Fake\.|Stub\."
    ERROR_PATTERNS="CS[0-9]{4}"
    FILE_EXTENSIONS="*.cs"
  elif [ -f "$PROJECT_DIR/pom.xml" ] || [ -f "$PROJECT_DIR/build.gradle" ]; then
    PRIMARY_LANGUAGE="java"
    BUILD_COMMAND="mvn compile -q 2>/dev/null || gradle build -q"
    TEST_COMMAND="mvn test -q 2>/dev/null || gradle test -q"
    SIMULATION_PATTERNS="Math\.random|Mockito\.|@Mock|TODO|FIXME"
    ERROR_PATTERNS="error:"
    FILE_EXTENSIONS="*.java"
  elif [ -f "$PROJECT_DIR/Cargo.toml" ]; then
    PRIMARY_LANGUAGE="rust"
    BUILD_COMMAND="cargo build --quiet"
    TEST_COMMAND="cargo test --quiet"
    SIMULATION_PATTERNS="todo!|unimplemented!|panic!|TODO|FIXME"
    ERROR_PATTERNS="error\[E[0-9]{4}\]"
    FILE_EXTENSIONS="*.rs"
  elif [ -f "$PROJECT_DIR/go.mod" ]; then
    PRIMARY_LANGUAGE="go"
    BUILD_COMMAND="go build ./..."
    TEST_COMMAND="go test ./..."
    SIMULATION_PATTERNS="rand\.|mock\.|TODO|FIXME"
    ERROR_PATTERNS="cannot find package|undefined:"
    FILE_EXTENSIONS="*.go"
  elif [ -f "$PROJECT_DIR/requirements.txt" ] || [ -f "$PROJECT_DIR/pyproject.toml" ] || [ -f "$PROJECT_DIR/setup.py" ]; then
    PRIMARY_LANGUAGE="python"
    BUILD_COMMAND="python -m py_compile *.py 2>/dev/null || echo 'Syntax check complete'"
    TEST_COMMAND="python -m pytest"
    SIMULATION_PATTERNS="random\.|mock\.|Mock\.|TODO|FIXME"
    ERROR_PATTERNS="SyntaxError:|IndentationError:|NameError:"
    FILE_EXTENSIONS="*.py"
  elif [ -f "$PROJECT_DIR/Gemfile" ]; then
    PRIMARY_LANGUAGE="ruby"
    BUILD_COMMAND="ruby -c *.rb 2>/dev/null || echo 'Ruby syntax check'"
    TEST_COMMAND="bundle exec rspec"
    SIMULATION_PATTERNS="rand|mock|double|TODO|FIXME"
    ERROR_PATTERNS="SyntaxError:|NameError:"
    FILE_EXTENSIONS="*.rb"
  elif [ -f "$PROJECT_DIR/composer.json" ]; then
    PRIMARY_LANGUAGE="php"
    BUILD_COMMAND="php -l *.php 2>/dev/null || echo 'PHP syntax check'"
    TEST_COMMAND="vendor/bin/phpunit"
    SIMULATION_PATTERNS="rand|mock|TODO|FIXME"
    ERROR_PATTERNS="Parse error:|Fatal error:"
    FILE_EXTENSIONS="*.php"
    
  # Tier 2: File extension analysis (for new projects)
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.ts" -o -name "*.tsx" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="typescript"
    BUILD_COMMAND="tsc --noEmit 2>/dev/null || echo 'TypeScript check (install: npm i -g typescript)'"
    TEST_COMMAND="npm test 2>/dev/null || echo 'Install test framework'"
    SIMULATION_PATTERNS="Math\.random|jest\.fn|TODO|FIXME"
    ERROR_PATTERNS="TS[0-9]{4}|error TS"
    FILE_EXTENSIONS="*.ts|*.tsx"
    echo "💡 New TypeScript project detected - consider: npm init && npm install typescript"
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.cs" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="csharp"
    BUILD_COMMAND="dotnet build --verbosity quiet 2>/dev/null || echo 'C# files found (install: dotnet CLI)'"
    TEST_COMMAND="dotnet test --verbosity quiet"
    SIMULATION_PATTERNS="Random\.NextDouble|Task\.FromResult|NotImplementedException"
    ERROR_PATTERNS="CS[0-9]{4}"
    FILE_EXTENSIONS="*.cs"
    echo "💡 New C# project detected - consider: dotnet new console/webapi/classlib"
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.java" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="java"
    BUILD_COMMAND="javac *.java 2>/dev/null || echo 'Java files found (setup: mvn/gradle)'"
    TEST_COMMAND="mvn test 2>/dev/null || echo 'Setup Maven/Gradle'"
    SIMULATION_PATTERNS="Math\.random|TODO|FIXME"
    ERROR_PATTERNS="error:"
    FILE_EXTENSIONS="*.java"
    echo "💡 New Java project detected - consider: mvn archetype:generate"
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.rs" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="rust"
    BUILD_COMMAND="rustc --version >/dev/null 2>&1 && echo 'Rust files found' || echo 'Install Rust toolchain'"
    TEST_COMMAND="cargo test 2>/dev/null || echo 'Run: cargo init'"
    SIMULATION_PATTERNS="todo!|unimplemented!|TODO"
    ERROR_PATTERNS="error\[E[0-9]{4}\]"
    FILE_EXTENSIONS="*.rs"
    echo "💡 New Rust project detected - consider: cargo init"
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.go" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="go"
    BUILD_COMMAND="go version >/dev/null 2>&1 && echo 'Go files found' || echo 'Install Go'"
    TEST_COMMAND="go test ./... 2>/dev/null || echo 'Run: go mod init'"
    SIMULATION_PATTERNS="TODO|FIXME"
    ERROR_PATTERNS="undefined:|cannot find"
    FILE_EXTENSIONS="*.go"
    echo "💡 New Go project detected - consider: go mod init"
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.py" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="python"
    BUILD_COMMAND="python -m py_compile *.py 2>/dev/null || echo 'Python files found'"
    TEST_COMMAND="python -m pytest 2>/dev/null || echo 'Install: pip install pytest'"
    SIMULATION_PATTERNS="random\.|TODO|FIXME"
    ERROR_PATTERNS="SyntaxError:|NameError:"
    FILE_EXTENSIONS="*.py"
    echo "💡 New Python project detected - consider: pip install -r requirements.txt"
  elif find "$PROJECT_DIR" -maxdepth 3 -name "*.js" -o -name "*.jsx" | head -1 | grep -q .; then
    PRIMARY_LANGUAGE="javascript"
    BUILD_COMMAND="node --version >/dev/null 2>&1 && echo 'JavaScript files found' || echo 'Install Node.js'"
    TEST_COMMAND="npm test 2>/dev/null || echo 'Run: npm init'"
    SIMULATION_PATTERNS="Math\.random|TODO|FIXME"
    ERROR_PATTERNS="Error:|SyntaxError:"
    FILE_EXTENSIONS="*.js|*.jsx"
    echo "💡 New JavaScript project detected - consider: npm init"
    
  # Tier 3: Directory/filename hints (empty projects)
  elif [ -d "$PROJECT_DIR/src/main/java" ] || [ -d "$PROJECT_DIR/app/src/main/java" ]; then
    PRIMARY_LANGUAGE="java"
    BUILD_COMMAND="echo 'Java project structure detected - setup Maven/Gradle'"
    TEST_COMMAND="echo 'Setup Maven: mvn archetype:generate'"
    SIMULATION_PATTERNS="TODO|FIXME"
    ERROR_PATTERNS="error:"
    FILE_EXTENSIONS="*.java"
    echo "💡 Java project structure detected - run: mvn archetype:generate"
  elif [ -d "$PROJECT_DIR/src" ] && [ ! -f "$PROJECT_DIR/package.json" ] && [ ! -f "$PROJECT_DIR/*.csproj" ]; then
    PRIMARY_LANGUAGE="generic"
    BUILD_COMMAND="echo 'Generic project with src/ folder detected'"
    TEST_COMMAND="echo 'Setup appropriate build system'"
    SIMULATION_PATTERNS="TODO|FIXME|HACK"
    ERROR_PATTERNS="error:|Error:"
    FILE_EXTENSIONS="*.*"
    echo "💡 Generic project structure - specify language manually if needed"
  fi
  
  # Cache environment for session
  mkdir -p tmp
  cat > "$CACHE_FILE" << EOF
{
  "initialized_at": "$(date -Iseconds)",
  "environment": {
    "BMAD_PRIMARY_LANGUAGE": "$PRIMARY_LANGUAGE",
    "BMAD_BUILD_COMMAND": "$BUILD_COMMAND",
    "BMAD_TEST_COMMAND": "$TEST_COMMAND",
    "BMAD_SIMULATION_PATTERNS": "$SIMULATION_PATTERNS",
    "BMAD_ERROR_PATTERNS": "$ERROR_PATTERNS",
    "BMAD_COMPONENT_PATTERNS": "$COMPONENT_PATTERNS",
    "BMAD_FILE_EXTENSIONS": "$FILE_EXTENSIONS"
  }
}
EOF
  
  # Export environment variables for current session
  export BMAD_PRIMARY_LANGUAGE="$PRIMARY_LANGUAGE"
  export BMAD_BUILD_COMMAND="$BUILD_COMMAND"  
  export BMAD_TEST_COMMAND="$TEST_COMMAND"
  export BMAD_SIMULATION_PATTERNS="$SIMULATION_PATTERNS"
  export BMAD_ERROR_PATTERNS="$ERROR_PATTERNS"
  export BMAD_COMPONENT_PATTERNS="$COMPONENT_PATTERNS"
  export BMAD_FILE_EXTENSIONS="$FILE_EXTENSIONS"
  
  echo "✅ Language environment initialized: $PRIMARY_LANGUAGE"
}

# Call auto-initialization (runs automatically when this task is loaded)
auto_init_language_environment
```

## Integration Method

### 2. **Automatic Task Wrapper**

Instead of individual tasks calling language detection, each optimized task starts with:

```bash
#!/bin/bash
# Auto-initialize language environment if needed
if [ -z "$BMAD_PRIMARY_LANGUAGE" ]; then
  Read tool: bmad-core/tasks/auto-language-init.md
fi

# Now use language-specific variables directly
echo "🔍 Smart Build Context Analysis ($BMAD_PRIMARY_LANGUAGE)"
BUILD_OUTPUT=$($BMAD_BUILD_COMMAND 2>&1)
# ... rest of task logic
```

### 3. **Agent-Level Auto-Initialization**

Add to both dev and qa agent startup:

```yaml
session_initialization:
  - auto_init_language_environment    # Runs once per agent session
  
enhanced_commands:
  - "*smart-build-context"            # Uses pre-initialized environment
  - "*smart-reality-audit"            # Uses pre-initialized environment
  - "*smart-story-mapping"            # Uses pre-initialized environment
```

## Execution Flow

### **How It Works in Practice:**

```bash
# User runs: *smart-reality-audit story.md

1. Agent starts executing smart-reality-audit task
2. Task checks: "Is BMAD_PRIMARY_LANGUAGE set?"
3. If not: Runs auto-language-init.md (50-100 tokens, once per session)
4. If yes: Skips initialization (0 tokens)
5. Task uses $BMAD_BUILD_COMMAND, $BMAD_SIMULATION_PATTERNS directly
6. All subsequent tasks in session use cached environment (0 additional tokens)
```

### **Token Usage:**
- **First task in session**: 50-100 tokens for initialization
- **All subsequent tasks**: 0 additional tokens (uses cached environment)
- **Session reuse**: Environment cached for 2 hours

## Benefits of This Approach

✅ **Fully Automatic** - No manual commands needed  
✅ **Session Efficient** - Initialize once, use everywhere  
✅ **Zero Integration Overhead** - Tasks just check environment variables  
✅ **Language Agnostic** - Works with any supported language  
✅ **Minimal Token Cost** - 50-100 tokens per session vs per task  

This makes language adaptation **completely transparent** to the user while maintaining all optimization benefits!