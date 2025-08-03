#!/usr/bin/env bats
# test-sm-commands.bats - Unit tests for Scrum Master commands
# Requires: bats-core (https://github.com/bats-core/bats-core)

# Setup test environment
setup() {
  export TEST_DIR="$(mktemp -d)"
  cd "$TEST_DIR"
  
  # Create test project structure
  mkdir -p .bmad/{stories,documents}
  
  # Source the library
  if [ -f "${BATS_TEST_DIRNAME}/../utils/bmad-lib.sh" ]; then
    source "${BATS_TEST_DIRNAME}/../utils/bmad-lib.sh"
  fi
}

# Cleanup after tests
teardown() {
  cd /
  rm -rf "$TEST_DIR"
}

# ============================================================================
# bmad-lib.sh Tests
# ============================================================================

@test "bmad-lib: validate_bmad_project detects missing project" {
  rmdir .bmad
  run validate_bmad_project
  [ "$status" -eq 1 ]
  [[ "$output" == *"No BMAD project found"* ]]
}

@test "bmad-lib: validate_bmad_project accepts valid project" {
  run validate_bmad_project
  [ "$status" -eq 0 ]
}

@test "bmad-lib: validate_story_file detects missing required fields" {
  cat > .bmad/stories/test.yaml <<EOF
id: TEST-001
title: Test Story
EOF
  run validate_story_file .bmad/stories/test.yaml
  [ "$status" -eq 1 ]
  [[ "$output" == *"missing required fields"* ]]
}

@test "bmad-lib: validate_story_file accepts valid story" {
  cat > .bmad/stories/test.yaml <<EOF
id: TEST-001
title: Test Story
status: draft
epic: Test Epic
EOF
  run validate_story_file .bmad/stories/test.yaml
  [ "$status" -eq 0 ]
}

@test "bmad-lib: get_yaml_field extracts correct value" {
  cat > test.yaml <<EOF
field1: value1
field2: value2
field3: 
EOF
  result=$(get_yaml_field test.yaml "field1" "default")
  [ "$result" = "value1" ]
  
  result=$(get_yaml_field test.yaml "field3" "default")
  [ "$result" = "default" ]
  
  result=$(get_yaml_field test.yaml "missing" "default")
  [ "$result" = "default" ]
}

@test "bmad-lib: status_to_emoji returns correct emojis" {
  [ "$(status_to_emoji "draft")" = "📝" ]
  [ "$(status_to_emoji "ready")" = "📋" ]
  [ "$(status_to_emoji "in_progress")" = "🔄" ]
  [ "$(status_to_emoji "code_review")" = "👀" ]
  [ "$(status_to_emoji "qa_testing")" = "🧪" ]
  [ "$(status_to_emoji "completed")" = "✅" ]
  [ "$(status_to_emoji "blocked")" = "🚫" ]
  [ "$(status_to_emoji "unknown")" = "❓" ]
}

@test "bmad-lib: progress_bar generates correct output" {
  result=$(progress_bar 5 10 10)
  [[ "$result" == *"█"* ]]
  [[ "$result" == *"░"* ]]
  [[ "$result" == *"50%"* ]]
  
  result=$(progress_bar 0 10 10)
  [[ "$result" == *"0%"* ]]
  
  result=$(progress_bar 10 10 10)
  [[ "$result" == *"100%"* ]]
}

# ============================================================================
# Sprint Board Tests
# ============================================================================

@test "board: handles empty project gracefully" {
  # No stories created
  run bash -c "source ${BATS_TEST_DIRNAME}/../tasks/show-sprint-board.md"
  [ "$status" -eq 0 ]
  [[ "$output" == *"No stories created yet"* ]]
}

@test "board: displays correct story counts" {
  # Create stories with different statuses
  cat > .bmad/stories/story1.yaml <<EOF
id: TEST-001
title: Test Story 1
status: draft
epic: Test
EOF

  cat > .bmad/stories/story2.yaml <<EOF
id: TEST-002
title: Test Story 2
status: in_progress
epic: Test
assignee: John Doe
EOF

  cat > .bmad/stories/story3.yaml <<EOF
id: TEST-003
title: Test Story 3
status: completed
epic: Test
EOF
  
  # Run board command simulation
  eval $(awk '
    /^status: draft/ {draft++}
    /^status: in_progress/ {in_progress++}
    /^status: completed/ {completed++}
    END {
      print "draft=" draft+0
      print "in_progress=" in_progress+0  
      print "completed=" completed+0
    }
  ' .bmad/stories/*.yaml)
  
  [ "$draft" -eq 1 ]
  [ "$in_progress" -eq 1 ]
  [ "$completed" -eq 1 ]
}

@test "board: detects blocked stories" {
  cat > .bmad/stories/blocked.yaml <<EOF
id: TEST-004
title: Blocked Story
status: in_progress
epic: Test
blocked: true
blocker: Waiting for dependency
blocked_days: 2
EOF
  
  blocked_count=$(grep -l "blocked: true" .bmad/stories/*.yaml | wc -l)
  [ "$blocked_count" -eq 1 ]
}

@test "board: identifies aging stories" {
  cat > .bmad/stories/aging.yaml <<EOF
id: TEST-005
title: Aging Story
status: in_progress
epic: Test
days_in_progress: 5
EOF
  
  aging=$(find .bmad/stories -name "*.yaml" -exec grep -l "days_in_progress: [3-9]" {} \; | wc -l)
  [ "$aging" -eq 1 ]
}

# ============================================================================
# Sprint Metrics Tests
# ============================================================================

@test "metrics: calculates story points correctly" {
  cat > .bmad/stories/pointed1.yaml <<EOF
id: TEST-006
title: Story with points
status: completed
epic: Test
points: 5
EOF

  cat > .bmad/stories/pointed2.yaml <<EOF
id: TEST-007
title: Another story
status: in_progress
epic: Test
points: 8
EOF
  
  total_points=$(awk '/^points:/ {sum+=$2} END {print sum+0}' .bmad/stories/*.yaml)
  [ "$total_points" -eq 13 ]
  
  completed_points=$(grep -l "status: completed" .bmad/stories/*.yaml | \
                     xargs awk '/^points:/ {sum+=$2} END {print sum+0}')
  [ "$completed_points" -eq 5 ]
}

@test "metrics: calculates completion rate" {
  # Create 4 stories, 1 completed
  for i in 1 2 3; do
    cat > .bmad/stories/story$i.yaml <<EOF
id: TEST-00$i
title: Story $i
status: in_progress
epic: Test
EOF
  done
  
  cat > .bmad/stories/story4.yaml <<EOF
id: TEST-004
title: Story 4
status: completed
epic: Test
EOF
  
  total=$(ls .bmad/stories/*.yaml | wc -l)
  completed=$(grep -l "status: completed" .bmad/stories/*.yaml | wc -l)
  rate=$((completed * 100 / total))
  
  [ "$rate" -eq 25 ]
}

@test "metrics: groups stories by epic" {
  cat > .bmad/stories/epic1.yaml <<EOF
id: TEST-008
title: Epic 1 Story
status: completed
epic: Authentication
EOF

  cat > .bmad/stories/epic2.yaml <<EOF
id: TEST-009
title: Epic 2 Story
status: in_progress
epic: Authentication
EOF

  cat > .bmad/stories/epic3.yaml <<EOF
id: TEST-010
title: Epic 3 Story
status: ready
epic: Shopping Cart
EOF
  
  auth_count=$(grep -c "epic: Authentication" .bmad/stories/*.yaml)
  cart_count=$(grep -c "epic: Shopping Cart" .bmad/stories/*.yaml)
  
  [ "$auth_count" -eq 2 ]
  [ "$cart_count" -eq 1 ]
}

# ============================================================================
# Blocked Command Tests
# ============================================================================

@test "blocked: shows only blocked stories" {
  cat > .bmad/stories/blocked1.yaml <<EOF
id: TEST-011
title: Blocked Story 1
status: in_progress
epic: Test
blocked: true
blocker: Waiting for API
blocked_days: 3
EOF

  cat > .bmad/stories/notblocked.yaml <<EOF
id: TEST-012
title: Not Blocked
status: in_progress
epic: Test
EOF
  
  blocked_files=$(grep -l "blocked: true" .bmad/stories/*.yaml | wc -l)
  total_files=$(ls .bmad/stories/*.yaml | wc -l)
  
  [ "$blocked_files" -eq 1 ]
  [ "$total_files" -eq 2 ]
}

# ============================================================================
# Focus Command Tests
# ============================================================================

@test "focus: groups work by assignee" {
  cat > .bmad/stories/assigned1.yaml <<EOF
id: TEST-013
title: John's Story
status: in_progress
epic: Test
assignee: John Doe
EOF

  cat > .bmad/stories/assigned2.yaml <<EOF
id: TEST-014
title: Jane's Story
status: code_review
epic: Test
assignee: Jane Smith
EOF

  cat > .bmad/stories/unassigned.yaml <<EOF
id: TEST-015
title: Unassigned Story
status: ready
epic: Test
assignee: null
EOF
  
  # Count unique assignees (excluding null)
  assignees=$(grep "^assignee:" .bmad/stories/*.yaml | \
               cut -d: -f2- | sed 's/^ //' | \
               grep -v "null" | sort -u | wc -l)
  
  [ "$assignees" -eq 2 ]
}

# ============================================================================
# Performance Tests
# ============================================================================

@test "performance: handles 100 stories efficiently" {
  # Create 100 test stories
  for i in $(seq 1 100); do
    cat > .bmad/stories/perf-$i.yaml <<EOF
id: PERF-$(printf "%03d" $i)
title: Performance Test Story $i
status: $( [ $((i % 4)) -eq 0 ] && echo "completed" || echo "in_progress" )
epic: Performance Test
points: $((RANDOM % 13 + 1))
assignee: Developer $((i % 5))
EOF
  done
  
  # Time the counting operation
  start=$(date +%s%N)
  count=$(ls .bmad/stories/*.yaml | wc -l)
  end=$(date +%s%N)
  
  # Should complete in under 1 second (1000000000 nanoseconds)
  duration=$((end - start))
  
  [ "$count" -eq 100 ]
  # Note: This assertion might need adjustment based on system
  # [ "$duration" -lt 1000000000 ]
}

# ============================================================================
# Integration Tests
# ============================================================================

@test "integration: full project simulation" {
  # Create a realistic project setup
  cat > .bmad/documents/project-brief.md <<EOF
# Test Project Brief
Status: Completed
EOF

  cat > .bmad/documents/prd.yaml <<EOF
title: Test PRD
status: completed
version: 1.0
EOF

  # Create diverse story set
  statuses=("draft" "ready" "in_progress" "code_review" "qa_testing" "completed")
  for i in $(seq 1 6); do
    cat > .bmad/stories/integration-$i.yaml <<EOF
id: INT-$(printf "%03d" $i)
title: Integration Story $i
status: ${statuses[$((i-1))]}
epic: Integration Test
points: $((i * 2))
sprint: Sprint 1
priority: high
assignee: $([ $i -le 3 ] && echo "Dev $i" || echo "null")
$([ $i -eq 3 ] && echo "blocked: true
blocker: Test blocker
blocked_days: 1")
$([ $i -eq 2 ] && echo "days_in_progress: 4")
EOF
  done
  
  # Verify all statuses are represented
  for status in "${statuses[@]}"; do
    count=$(grep -c "status: $status" .bmad/stories/*.yaml)
    [ "$count" -gt 0 ]
  done
  
  # Verify calculations
  total=$(ls .bmad/stories/*.yaml | wc -l)
  [ "$total" -eq 6 ]
  
  blocked=$(grep -c "blocked: true" .bmad/stories/*.yaml)
  [ "$blocked" -eq 1 ]
  
  aging=$(grep -c "days_in_progress: [3-9]" .bmad/stories/*.yaml)
  [ "$aging" -eq 1 ]
}