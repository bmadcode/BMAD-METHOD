# create-scorecard

Generate BMAD Opportunity Scorecard for market opportunities or feature ideas.

## Execution Framework

1. **Opportunity Definition**
   - Define the specific opportunity or feature
   - Establish target customer segment
   - Clarify success metrics

2. **Market Analysis Scoring (1-5 scale)**
   - Market Size: Total addressable market potential
   - Growth Rate: Market expansion velocity
   - Competition: Competitive density and strength
   - Timing: Market readiness and external factors

3. **Implementation Feasibility (1-5 scale)**
   - Technical Complexity: Development difficulty
   - Resource Requirements: Team and budget needs
   - Time to Market: Speed of delivery
   - Risk Level: Technical and market risks

4. **Strategic Fit (1-5 scale)**
   - Business Model Alignment: Revenue model fit
   - Core Competency Match: Team capability alignment
   - Competitive Advantage: Defensibility potential
   - Customer Value: Benefit magnitude

5. **Generate Scorecard Output**
   ```
   OPPORTUNITY SCORECARD
   Opportunity: [Name]
   
   MARKET ATTRACTIVENESS (Total: /20)
   - Market Size: [X]/5
   - Growth Rate: [X]/5  
   - Competition: [X]/5
   - Timing: [X]/5
   
   IMPLEMENTATION FEASIBILITY (Total: /20)
   - Technical Complexity: [X]/5
   - Resource Requirements: [X]/5
   - Time to Market: [X]/5
   - Risk Level: [X]/5
   
   STRATEGIC FIT (Total: /20)
   - Business Model Alignment: [X]/5
   - Core Competency Match: [X]/5
   - Competitive Advantage: [X]/5
   - Customer Value: [X]/5
   
   OVERALL SCORE: [X]/60
   RECOMMENDATION: [Go/No-Go/Investigate Further]
   ```

## Data Sources
- Market data from bmad-core/data/market-sizes.csv
- Competitive intelligence from competitive-benchmarks.csv
- User-provided opportunity details

## Validation Criteria
- All scores justified with evidence
- Recommendations align with scoring
- Clear next steps provided
