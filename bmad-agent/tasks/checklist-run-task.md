# Checklist Validation Task

This task provides instructions for validating documentation against checklists. The agent should follow these instructions to ensure thorough and systematic validation of documents.

## Context

The BMAD Method uses various checklists to ensure quality and completeness of different artifacts. The mapping between checklists and their required documents is defined in `checklist-mappings`. This allows for easy addition of new checklists without modifying this task.

## Instructions

1. **Initial Assessment**

   - Check `checklist-mappings` for available checklists
   - If user provides a checklist name:
     - Look for exact match in checklist-mappings.yml
     - If no exact match, try fuzzy matching (e.g. "architecture checklist" -> "architect-checklist")
     - If multiple matches found, ask user to clarify
     - Once matched, use the checklist_file path from the mapping
   - If no checklist specified:
     - Ask the user which checklist they want to use
     - Present available options from checklist-mappings.yml
   - Confirm if they want to work through the checklist:
     - Section by section (interactive mode)
     - All at once (YOLO mode)

2. **Document Location**

   - Look up the required documents and default locations in `checklist-mappings`
   - For each required document:
     - Check all default locations specified in the mapping
     - If not found, ask the user for the document location
   - Verify all required documents are accessible

3. **Checklist Processing**

   If in interactive mode:

   - Work through each section of the checklist one at a time
   - For each section:
     - Review all items in the section
     - Check each item against the relevant documentation
     - Present findings for that section
     - Get user confirmation before proceeding to next section

   If in YOLO mode:

   - Process all sections at once
   - Create a comprehensive report of all findings
   - Present the complete analysis to the user

4. **Validation Approach**

   For each checklist item:

   - Read and understand the requirement
   - Look for evidence in the documentation that satisfies the requirement
   - Consider both explicit mentions and implicit coverage
   - Mark items as:
     - PASS: Requirement clearly met
     - âŒ FAIL: Requirement not met or insufficient coverage
     - âš ï¸ PARTIAL: Some aspects covered but needs improvement
     - N/A: Not applicable to this case

5. **Section Analysis**

   For each section:

   - Calculate pass rate
   - Identify common themes in failed items
   - Provide specific recommendations for improvement
   - In interactive mode, discuss findings with user
   - Document any user decisions or explanations

6. **Final Report**

   Prepare a summary that includes:

   - Overall checklist completion status
   - Pass rates by section
   - List of failed items with context
   - Specific recommendations for improvement
   - Any sections or items marked as N/A with justification

## Special Considerations

1. **Architecture Checklist**

   - Focus on technical completeness and clarity
   - Verify all system components are addressed
   - Check for security and scalability considerations
   - Ensure deployment and operational aspects are covered

2. **Frontend Architecture Checklist**

   - Validate UI/UX specifications
   - Check component structure and organization
   - Verify state management approach
   - Ensure responsive design considerations

3. **PM Checklist**

   - Focus on product requirements clarity
   - Verify user stories and acceptance criteria
   - Check market and user research coverage
   - Ensure technical feasibility is addressed

4. **Story Checklists**
   - Verify clear acceptance criteria
   - Check for technical context and dependencies
   - Ensure testability is addressed
   - Validate user value is clearly stated

## Success Criteria

The checklist validation is complete when:

1. All applicable items have been assessed
2. Clear pass/fail status for each item
3. Specific recommendations provided for failed items
4. User has reviewed and acknowledged findings
5. Final report documents all decisions and rationales

## Example Interaction

Agent: "Let me check the available checklists... According to checklist-mappings.yml, we have several options. Which would you like to use?"

User: "The architect checklist"

Agent: "Would you like to work through it section by section (interactive) or get a complete analysis all at once (YOLO mode)?"

User: "Interactive please"

Agent: "According to the mappings, I need to check for architecture.md. The default location is docs/architecture.md. Should I look there?"

[Continue interaction based on user responses...]
