# Realistic BMAD-METHOD Usage Scenarios

## Scenario 1: Startup MVP Development
**User**: "I need to build an MVP for a food delivery app. Help me create the initial user stories and architecture."

**Expected Flow**:
1. Routes to PM agent
2. PM elicits: target audience, key features, constraints
3. PM creates epic and initial stories
4. User: "Now design the architecture for this"
5. Routes to Architect agent (maintains PM context)
6. Architect designs microservices architecture
7. Both sessions remain active for iteration

**Success Criteria**:
- Seamless handoff between PM and Architect
- Context about food delivery domain preserved
- User can switch between agents to refine

## Scenario 2: Legacy System Modernization
**User**: "We have a 10-year-old monolithic Java app that needs to be broken into microservices. Where do I start?"

**Expected Flow**:
1. Routes to Architect agent
2. Architect asks about current system, pain points
3. Creates brownfield assessment
4. User: "Create stories for the first phase"
5. Routes to PM agent with architect's analysis
6. PM creates migration stories
7. Multiple agents collaborate on approach

**Success Criteria**:
- Brownfield templates used appropriately
- Technical context preserved across agents
- Phased approach clearly defined

## Scenario 3: Quick Feature Addition
**User**: "/bmad-pm add social login to our existing auth system"

**Expected Flow**:
1. Direct invocation of PM agent
2. PM asks: which providers, current auth method
3. Creates focused user story
4. User: "What changes needed in architecture?"
5. Architect agent reviews and suggests changes
6. Quick focused interaction

**Success Criteria**:
- Fast response to direct command
- Minimal elicitation for simple feature
- Clear, actionable output

## Scenario 4: Full Team Simulation
**User**: "I'm a solo developer. Can you help me work through a complete sprint planning session?"

**Expected Flow**:
1. Routes to SM (Scrum Master) agent
2. SM facilitates sprint planning
3. Invokes PM for story refinement
4. Invokes Dev for estimation
5. Invokes QA for test planning
6. Returns consolidated sprint plan

**Success Criteria**:
- Multiple agents coordinate naturally
- Each agent maintains their perspective
- Comprehensive sprint plan produced

## Scenario 5: Technical Debt Assessment
**User**: "Our React app is getting slow and hard to maintain. Help me create a plan to fix it."

**Expected Flow**:
1. Routes to Architect agent
2. Architect asks about specific issues
3. Creates technical debt assessment
4. User: "Prioritize what to fix first"
5. PM agent helps create debt stories
6. QA agent suggests testing approach

**Success Criteria**:
- Technical analysis is thorough
- Prioritization is business-aligned
- Multiple viewpoints represented

## Scenario 6: API Design Review
**User**: "Review this REST API design for our payment service" *pastes OpenAPI spec*

**Expected Flow**:
1. Routes to Architect agent
2. Architect analyzes API design
3. Provides feedback on REST principles
4. Suggests security improvements
5. User: "Create stories for the security fixes"
6. PM agent creates security stories

**Success Criteria**:
- File content properly analyzed
- Specific, actionable feedback
- Smooth transition to story creation

## Scenario 7: Emergency Production Issue
**User**: "Production is down! Users can't log in. Help me troubleshoot and create a fix plan."

**Expected Flow**:
1. Routes to Dev agent
2. Dev asks diagnostic questions
3. Suggests immediate fixes
4. User: "Create a story for permanent fix"
5. PM creates hotfix and improvement stories
6. QA suggests regression tests

**Success Criteria**:
- Rapid response to urgency
- Practical troubleshooting steps
- Both immediate and long-term actions

## Scenario 8: Multi-Platform Strategy
**User**: "We need to expand our web app to mobile. What's the best approach?"

**Expected Flow**:
1. Routes to Architect agent
2. Architect discusses native vs hybrid vs PWA
3. Recommends approach based on requirements
4. User: "Let's go with React Native. Create the initial stories."
5. PM creates mobile app epic and stories
6. UX Expert agent engaged for mobile patterns

**Success Criteria**:
- Strategic options presented clearly
- Decision factors well explained
- Coherent story breakdown

## Scenario 9: Compliance Requirements
**User**: "We just got a new client that requires SOC 2 compliance. What do we need to do?"

**Expected Flow**:
1. Routes to Architect agent
2. Architect outlines technical requirements
3. Creates compliance architecture
4. PM agent creates compliance stories
5. QA agent creates audit checklist

**Success Criteria**:
- Compliance requirements understood
- Technical and process changes identified
- Actionable implementation plan

## Scenario 10: Performance Optimization
**User**: "Our database queries are taking 10+ seconds. Help me optimize."

**Expected Flow**:
1. Routes to Dev agent
2. Dev asks about query patterns, data volume
3. Suggests indexing and query optimization
4. Architect reviews for architectural issues
5. Creates optimization plan

**Success Criteria**:
- Root cause analysis performed
- Multiple optimization strategies provided
- Clear implementation steps

## Testing These Scenarios

Each scenario should be tested for:
1. **Correct Routing**: Right agent selected initially
2. **Context Flow**: Information preserved across agents
3. **Elicitation Quality**: Questions are relevant and helpful
4. **Output Quality**: Deliverables meet BMAD standards
5. **User Experience**: Natural, conversational flow
6. **Session Management**: Can pause, resume, switch agents
7. **Time to Value**: Reasonable response times

## Edge Cases to Test

1. **Ambiguous Requests**: "Help me with my project"
2. **Multiple Valid Agents**: "Design and implement a feature"
3. **Context Switching**: Jumping between unrelated topics
4. **Long Conversations**: 50+ message threads
5. **Concurrent Requests**: Multiple users, same project
6. **Error Conditions**: Invalid files, network issues
7. **Incomplete Information**: User unsure of requirements
8. **Cross-Domain**: Mixing technical and business concerns