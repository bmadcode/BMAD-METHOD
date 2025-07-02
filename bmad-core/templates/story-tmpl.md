# Story {{EpicNum}}.{{StoryNum}}: {{Short Title Copied from Epic File specific story}}

## Status: {{ Draft | Approved | InProgress | Review | Done }}

## Story

- As a {{role}}
- I want {{action}}
- so that {{benefit}}

## Acceptance Criteria (ACs)

{{ Copy of Acceptance Criteria numbered list }}

## Tasks / Subtasks

- [ ] Task 1 (AC: # if applicable)
  - [ ] Subtask1.1...
- [ ] Task 2 (AC: # if applicable)
  - [ ] Subtask 2.1...
- [ ] Task 3 (AC: # if applicable)
  - [ ] Subtask 3.1...

## Dev Notes

[[LLM: populates relevant information, only what was pulled from actual artifacts from docs folder, relevant to this story. Do not invent information. Critical: If known add Relevant Source Tree info that relates to this story. If there were important notes from previous story that are relevant to this one, also include them here if it will help the dev agent. You do NOT need to repeat anything from coding standards or test standards as the dev agent is already aware of those. The dev agent should NEVER need to read the PRD or architecture documents or child documents though to complete this self contained story, because your critical mission is to share the specific items needed here extremely concisely for the Dev Agent LLM to comprehend with the least about of context overhead token usage needed.]]

### Testing

[[LLM: Scrum Master use `test-strategy-and-standards.md` to leave instruction for developer agent in the following concise format, leave unchecked if no specific test requirement of that type]]
Dev Note: Story Requires the following tests:

- [ ] {{type f.e. Jest}} Unit Tests: (nextToFile: {{true|false}}), coverage requirement: {{from strategy or default 80%}}
- [ ] {{type f.e. Jest with in memory db}} Integration Test (Test Location): location: {{Integration test location f.e. `/tests/story-name/foo.spec.cs` or `next to handler`}}
- [ ] {{type f.e. Cypress}} E2E: location: {{f.e. `/e2e/{epic-name/bar.test.ts`}}

Manual Test Steps: [[LLM: Include how if possible the user can manually test the functionality when story is Ready for Review, if any]]

{{ f.e. `- dev will create a script with task 3 above that you can run with "npm run test-initiate-launch-sequence" and validate Armageddon is initiated`}}

## Retrospective Insights

[[LLM: This section is populated during story creation if retrospectives are enabled in core-config.yml. Include key learnings from recent retrospectives that are relevant to this story.]]

### Retrospectives Reviewed

[[LLM: List which retrospective files were reviewed, if any]]

{{#if retrospectives_reviewed}}
- {{retrospective_file_1}} ({{retrospective_date_1}})
- {{retrospective_file_2}} ({{retrospective_date_2}})
- {{retrospective_file_3}} ({{retrospective_date_3}})
{{else}}
No retrospectives available or retrospectives disabled in configuration.
{{/if}}

### Key Insights Applied

[[LLM: Synthesize actionable insights from retrospectives that are relevant to this story type/domain]]

{{#if retrospective_insights}}
**Technical Patterns to Follow:**
- {{successful_pattern_1}}
- {{successful_pattern_2}}

**Issues to Avoid:**
- {{recurring_issue_1}}
- {{recurring_issue_2}}

**Testing Considerations:**
- {{testing_insight_1}}
- {{testing_insight_2}}

**Process Improvements:**
- {{process_improvement_1}}
- {{process_improvement_2}}
{{else}}
No specific insights identified from retrospectives for this story type.
{{/if}}

## Dev Agent Record

### Agent Model Used: {{Agent Model Name/Version}}

### Debug Log References

[[LLM: (SM Agent) When Drafting Story, leave next prompt in place for dev agent to remove and update]]
[[LLM: (Dev Agent) If the debug is logged to during the current story progress, create a table with the debug log and the specific task section in the debug log - do not repeat all the details in the story]]

### Completion Notes List

[[LLM: (SM Agent) When Drafting Story, leave next prompt in place for dev agent to remove and update - remove this line to the SM]]
[[LLM: (Dev Agent) Anything the SM needs to know that deviated from the story that might impact drafting the next story.]]

### File List

[[LLM: (Dev Agent) List every new file created, or existing file modified in a bullet list.]]

### Change Log

[[LLM: (SM Agent) When Drafting Story, leave next prompt in place for dev agent to remove and update- remove this line to the SM]]
[[LLM: (Dev Agent) Track document versions and changes during development that deviate from story dev start]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

## QA Results

[[LLM: QA Agent Results]]
