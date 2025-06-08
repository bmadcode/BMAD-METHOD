# BMAD Documentation Review Process

## Overview

This document outlines the review process for all BMAD Method documentation. A thorough review process ensures our documentation is accurate, consistent, and valuable to users.

## Review Roles

### Author
- Creates or updates documentation
- Responds to feedback
- Makes requested changes
- Ensures documentation meets standards

### Technical Reviewer
- Verifies technical accuracy
- Tests procedures and examples
- Ensures compatibility with current versions
- Validates architectural decisions

### Documentation Reviewer
- Checks style guide compliance
- Reviews structure and organization
- Ensures consistency with existing documentation
- Verifies accessibility and readability

### Final Approver
- Performs final quality check
- Ensures all review feedback is addressed
- Approves merging into main documentation
- Publishes documentation updates

## Review Workflow

### 1. Pre-Review Preparation

**Author Responsibilities:**
- Run automated checks (linting, spelling, links)
- Self-review against style guide
- Complete the pre-review checklist
- Request review in the documentation system

**Pre-Review Checklist:**
- [ ] Documentation follows the style guide
- [ ] All automated checks pass
- [ ] Code examples are tested and working
- [ ] Images have alt text
- [ ] Links are valid
- [ ] No placeholder content remains
- [ ] Proper headers and structure used
- [ ] Spell check completed

### 2. Technical Review

**Technical Reviewer Responsibilities:**
- Verify technical accuracy of all content
- Test all procedures on a clean environment
- Validate code examples and commands
- Check compatibility with specified versions
- Review architectural recommendations
- Provide feedback within 3 business days

**Technical Review Checklist:**
- [ ] All technical information is accurate
- [ ] Procedures work as described
- [ ] Code examples execute correctly
- [ ] Technical terminology is used correctly
- [ ] Security best practices are followed
- [ ] Performance considerations are addressed
- [ ] Edge cases are considered
- [ ] Technical diagrams are accurate

### 3. Documentation Review

**Documentation Reviewer Responsibilities:**
- Check compliance with style guide
- Review structure and organization
- Ensure consistency with existing documentation
- Verify accessibility and readability
- Check cross-references and related documentation
- Provide feedback within 3 business days

**Documentation Review Checklist:**
- [ ] Follows style guide conventions
- [ ] Structure is logical and consistent
- [ ] Language is clear and concise
- [ ] Terminology is consistent
- [ ] Headers and sections are appropriate
- [ ] Formatting is consistent
- [ ] Accessibility guidelines are followed
- [ ] Cross-references are accurate

### 4. Revision

**Author Responsibilities:**
- Address all feedback from reviewers
- Track changes made in response to feedback
- Request re-review if significant changes were made
- Complete the revision checklist

**Revision Checklist:**
- [ ] All technical review feedback addressed
- [ ] All documentation review feedback addressed
- [ ] Automated checks still pass after changes
- [ ] No new issues introduced during revisions
- [ ] Changes documented in revision history

### 5. Final Approval

**Final Approver Responsibilities:**
- Verify all review feedback has been addressed
- Perform final quality check
- Ensure documentation meets all standards
- Approve merging into main documentation
- Update documentation version if applicable

**Final Approval Checklist:**
- [ ] All review feedback addressed
- [ ] Documentation meets quality standards
- [ ] Version information updated if applicable
- [ ] Release notes prepared if applicable
- [ ] Documentation ready for publication

### 6. Publication

**Publication Process:**
1. Merge approved documentation into main branch
2. Run automated build process
3. Deploy to documentation site
4. Verify published documentation
5. Announce update if significant

## Review Timeframes

- **Technical Review**: 3 business days
- **Documentation Review**: 3 business days
- **Revision**: Dependent on scope of changes
- **Final Approval**: 2 business days
- **Emergency Updates**: Expedited process available

## Review Tools

### GitHub Pull Request Reviews
- Use GitHub PR review features
- Add line-specific comments
- Use suggestion feature for small changes
- Link to relevant issues or documentation

### Documentation Review Template
```markdown
## Documentation Review

### Overall Assessment
- [ ] Approved
- [ ] Approved with changes
- [ ] Needs revision

### Technical Accuracy
[Comments on technical accuracy]

### Structure and Organization
[Comments on structure and organization]

### Style and Consistency
[Comments on style and consistency]

### Specific Feedback
1. [Page/Section]: [Feedback]
2. [Page/Section]: [Feedback]

### Additional Notes
[Any other comments or suggestions]
```

## Special Review Cases

### Major Documentation Updates
- Requires review from multiple technical experts
- May require user testing
- Consider phased rollout
- Create migration guide if applicable

### Emergency Documentation Updates
- Expedited review process
- Focus on critical accuracy
- May bypass some review steps
- Must be reviewed fully after publication

### Translation Reviews
- Requires native speaker review
- Technical reviewer must verify accuracy
- Check for cultural appropriateness
- Ensure consistent terminology across languages

## Continuous Improvement

The review process itself is subject to continuous improvement:

- Collect metrics on review efficiency
- Gather feedback from authors and reviewers
- Regularly update review checklists
- Improve automation tools
- Review and update this process quarterly

## Review Dispute Resolution

If disagreements arise during the review process:

1. Reviewers and author discuss directly
2. If unresolved, documentation lead mediates
3. Technical disagreements defer to subject matter experts
4. Style disagreements defer to style guide maintainer
5. Final decision rests with documentation lead

---

*This review process is maintained by the BMAD Documentation Team. Last updated: Current Date.*
