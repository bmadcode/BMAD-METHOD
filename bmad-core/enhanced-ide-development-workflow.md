# Enhanced Development Workflow

This is a simple step-by-step guide to help you efficiently manage your development workflow using the BMad Method. Refer to the **[<ins>User Guide</ins>](user-guide.md)** for any scenario that is not covered here.

## Create new Branch

1. **Start new branch**

## Story Creation (Scrum Master)

1. **Start new chat/conversation**
2. **Load SM agent**
3. **Execute**: `*draft` (runs create-next-story task)
4. **Review generated story** in `docs/stories/`
5. **Update status**: Change from "Draft" to "Approved"

## Story Implementation (Developer)

1. **Start new chat/conversation**
2. **Load Dev agent**
3. **Execute**: `*develop-story {selected-story}` (runs execute-checklist task)
4. **Review generated report** in `{selected-story}`

## Story Review (Quality Assurance)

1. **Start new chat/conversation**
2. **Load QA agent**
3. **Execute**: `*review {selected-story}` (runs review-story task)
4. **Review generated report** in `{selected-story}`

## Commit Changes and Push

1. **Commit changes**
2. **Push to remote**

## Repeat Until Complete

- **SM**: Create next story → Review → Approve
- **Dev**: Implement story → Complete → Mark Ready for Review
- **QA**: Review story → Mark done
- **Commit**: All changes
- **Push**: To remote
- **Continue**: Until all features implemented
