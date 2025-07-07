# {{Project Name}} Architecture Document

[[LLM: If available, review any provided relevant documents to gather all relevant context before beginning. If at a minimum you cannot local `docs/prd.md` ask the user what docs will provide the basis for the architecture.]]

[[LLM: The default path and filename unless specified is docs/architecture.md]]

## Introduction

[[LLM: This section establishes the document's purpose and scope. Keep the content below but ensure project name is properly substituted.

After presenting this section, apply `{root}/tasks/advanced-elicitation.md` protocol]]

This document outlines the overall project architecture for {{Project Name}}, including backend systems, shared services, and non-UI specific concerns. Its primary goal is to serve as the guiding architectural blueprint for AI-driven development, ensuring consistency and adherence to chosen patterns and technologies.

**Relationship to Frontend Architecture:**
If the project includes a significant user interface, a separate Frontend Architecture Document will detail the frontend-specific design and MUST be used in conjunction with this document. Core technology stack choices documented herein (see "Tech Stack") are definitive for the entire project, including any frontend components.

### Starter Template or Existing Project

[[LLM: Before proceeding further with architecture design, check if the project is based on a starter template or existing codebase:

1. Review the PRD and brainstorming brief for any mentions of:

- Starter templates (e.g., Create React App, Next.js, Vue CLI, Angular CLI, etc.)
- Existing projects or codebases being used as a foundation
- Boilerplate projects or scaffolding tools
- Previous projects to be cloned or adapted

2. If a starter template or existing project is mentioned:

- Ask the user to provide access via one of these methods:
  - Link to the starter template documentation
  - Upload/attach the project files (for small projects)
  - Share a link to the project repository (GitHub, GitLab, etc.)
- Analyze the starter/existing project to understand:
  - Pre-configured technology stack and versions
  - Project structure and organization patterns
  - Built-in scripts and tooling
  - Existing architectural patterns and conventions
  - Any limitations or constraints imposed by the starter
- Use this analysis to inform and align your architecture decisions

3. If no starter template is mentioned but this is a greenfield project:

- Suggest appropriate starter templates based on the tech stack preferences
- Explain the benefits (faster setup, best practices, community support)
- Let the user decide whether to use one

4. If the user confirms no starter template will be used:

- Proceed with architecture design from scratch
- Note that manual setup will be required for all tooling and configuration

Document the decision here before proceeding with the architecture design. In none, just say N/A

After presenting this starter template section, apply `{root}/tasks/advanced-elicitation.md` protocol]]

### Change Log

[[LLM: Track document versions and changes]]

| Date | Version | Description | Author |
| :--- | :------ | :---------- | :----- |

## High Level Architecture

[[LLM: This section contains multiple subsections that establish the foundation of the architecture. Present all subsections together (Introduction, Technical Summary, High Level Overview, Project Diagram, and Architectural Patterns), then apply `{root}/tasks/advanced-elicitation.md` protocol to the complete High Level Architecture section. The user can choose to refine the entire section or specific subsections.]]

### Technical Summary

[[LLM: Provide a brief paragraph (3-5 sentences) overview of:

- The system's overall architecture style
- Key components and their relationships
- Primary technology choices
- Core architectural patterns being used
- Reference back to the PRD goals and how this architecture supports them]]

### High Level Overview

[[LLM: Based on the PRD's Technical Assumptions section, describe:

1. The main architectural style (e.g., Monolith, Microservices, Serverless, Event-Driven)
2. Repository structure decision from PRD (Monorepo/Polyrepo)
3. Service architecture decision from PRD
4. Primary user interaction flow or data flow at a conceptual level
5. Key architectural decisions and their rationale

After presenting this section, apply `{root}/tasks/advanced-elicitation.md` protocol]]

### High Level Project Diagram

[[LLM: Create a Mermaid diagram that visualizes the high-level architecture. Consider:

- System boundaries
- Major components/services
- Data flow directions
- External integrations
- User entry points

Use appropriate Mermaid diagram type (graph TD, C4, sequence) based on what best represents the architecture

After presenting the diagram, apply `{root}/tasks/advanced-elicitation.md` protocol]]

### Architectural and Design Patterns

[[LLM: List the key high-level patterns that will guide the architecture. For each pattern:

1. Present 2-3 viable options if multiple exist
2. Provide your recommendation with clear rationale
3. Get user confirmation before finalizing
4. These patterns should align with the PRD's technical assumptions and project goals

Common patterns to consider:

- Architectural style patterns (Serverless, Event-Driven, Microservices, CQRS, Hexagonal)
- Code organization patterns (Dependency Injection, Repository, Module, Factory)
- Data patterns (Event Sourcing, Saga, Database per Service)
- Communication patterns (REST, GraphQL, Message Queue, Pub/Sub)]]

<<REPEAT: pattern>>

- **{{pattern_name}}:** {{pattern_description}} - _Rationale:_ {{rationale}}

<</REPEAT>>

@{example: patterns}

- **Serverless Architecture:** Using AWS Lambda for compute - _Rationale:_ Aligns with PRD requirement for cost optimization and automatic scaling
- **Repository Pattern:** Abstract data access logic - _Rationale:_ Enables testing and future database migration flexibility
- **Event-Driven Communication:** Using SNS/SQS for service decoupling - _Rationale:_ Supports async processing and system resilience

@{/example}

[[LLM: After presenting the patterns, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Tech Stack

[[LLM: This is the DEFINITIVE technology selection section. Work with the user to make specific choices:

1. Review PRD technical assumptions and any preferences from `{root}/data/technical-preferences.yaml` or an attached `technical-preferences`
2. For each category, present 2-3 viable options with pros/cons
3. Make a clear recommendation based on project needs
4. Get explicit user approval for each selection
5. Document exact versions (avoid "latest" - pin specific versions)
6. This table is the single source of truth - all other docs must reference these choices

Key decisions to finalize - before displaying the table, ensure you are aware of or ask the user about - let the user know if they are not sure on any that you can also provide suggestions with rationale:

- Starter templates (if any)
- Languages and runtimes with exact versions
- Frameworks and libraries / packages
- Cloud provider and key services choices
- Database and storage solutions - if unclear suggest sql or nosql or other types depending on the project and depending on cloud provider offer a suggestion
- Development tools

Upon render of the table, ensure the user is aware of the importance of this sections choices, should also look for gaps or disagreements with anything, ask for any clarifications if something is unclear why its in the list, and also right away apply `{root}/tasks/advanced-elicitation.md` display - this statement and the options should be rendered and then prompt right all before allowing user input.]]

### Cloud Infrastructure

- **Provider:** {{cloud_provider}}
- **Key Services:** {{core_services_list}}
- **Deployment Regions:** {{regions}}

### Technology Stack Table

| Category           | Technology         | Version     | Purpose     | Rationale      |
| :----------------- | :----------------- | :---------- | :---------- | :------------- |
| **Language**       | {{language}}       | {{version}} | {{purpose}} | {{why_chosen}} |
| **Runtime**        | {{runtime}}        | {{version}} | {{purpose}} | {{why_chosen}} |
| **Framework**      | {{framework}}      | {{version}} | {{purpose}} | {{why_chosen}} |
| **Database**       | {{database}}       | {{version}} | {{purpose}} | {{why_chosen}} |
| **Cache**          | {{cache}}          | {{version}} | {{purpose}} | {{why_chosen}} |
| **Message Queue**  | {{queue}}          | {{version}} | {{purpose}} | {{why_chosen}} |
| **API Style**      | {{api_style}}      | {{version}} | {{purpose}} | {{why_chosen}} |
| **Authentication** | {{auth}}           | {{version}} | {{purpose}} | {{why_chosen}} |
| **Testing**        | {{test_framework}} | {{version}} | {{purpose}} | {{why_chosen}} |
| **Build Tool**     | {{build_tool}}     | {{version}} | {{purpose}} | {{why_chosen}} |
| **IaC Tool**       | {{iac_tool}}       | {{version}} | {{purpose}} | {{why_chosen}} |
| **Monitoring**     | {{monitoring}}     | {{version}} | {{purpose}} | {{why_chosen}} |
| **Logging**        | {{logging}}        | {{version}} | {{purpose}} | {{why_chosen}} |

@{example: tech_stack_row}
| **Language** | TypeScript | 5.3.3 | Primary development language | Strong typing, excellent tooling, team expertise |
| **Runtime** | Node.js | 20.11.0 | JavaScript runtime | LTS version, stable performance, wide ecosystem |
| **Framework** | NestJS | 10.3.2 | Backend framework | Enterprise-ready, good DI, matches team patterns |
@{/example}

## Data Models

[[LLM: Define the core data models/entities:

1. Review PRD requirements and identify key business entities
2. For each model, explain its purpose and relationships
3. Include key attributes and data types
4. Show relationships between models
5. Discuss design decisions with user

Create a clear conceptual model before moving to database schema.

After presenting all data models, apply `{root}/tasks/advanced-elicitation.md` protocol]]

<<REPEAT: data_model>>

### {{model_name}}

**Purpose:** {{model_purpose}}

**Key Attributes:**

- {{attribute_1}}: {{type_1}} - {{description_1}}
- {{attribute_2}}: {{type_2}} - {{description_2}}

**Relationships:**

- {{relationship_1}}
- {{relationship_2}}
  <</REPEAT>>

## Components

[[LLM: Based on the architectural patterns, tech stack, and data models from above:

1. Identify major logical components/services and their responsibilities
2. Consider the repository structure (monorepo/polyrepo) from PRD
3. Define clear boundaries and interfaces between components
4. For each component, specify:

- Primary responsibility
- Key interfaces/APIs exposed
- Dependencies on other components
- Technology specifics based on tech stack choices

5. Create component diagrams where helpful
6. After presenting all components, apply `{root}/tasks/advanced-elicitation.md` protocol]]

<<REPEAT: component>>

### {{component_name}}

**Responsibility:** {{component_description}}

**Key Interfaces:**

- {{interface_1}}
- {{interface_2}}

**Dependencies:** {{dependencies}}

**Technology Stack:** {{component_tech_details}}
<</REPEAT>>

### Component Diagrams

[[LLM: Create Mermaid diagrams to visualize component relationships. Options:

- C4 Container diagram for high-level view
- Component diagram for detailed internal structure
- Sequence diagrams for complex interactions
  Choose the most appropriate for clarity

After presenting the diagrams, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## External APIs

[[LLM: For each external service integration:

1. Identify APIs needed based on PRD requirements and component design
2. If documentation URLs are unknown, ask user for specifics
3. Document authentication methods and security considerations
4. List specific endpoints that will be used
5. Note any rate limits or usage constraints

If no external APIs are needed, state this explicitly and skip to next section.]]

^^CONDITION: has_external_apis^^

<<REPEAT: external_api>>

### {{api_name}} API

- **Purpose:** {{api_purpose}}
- **Documentation:** {{api_docs_url}}
- **Base URL(s):** {{api_base_url}}
- **Authentication:** {{auth_method}}
- **Rate Limits:** {{rate_limits}}

**Key Endpoints Used:**
<<REPEAT: endpoint>>

- `{{method}} {{endpoint_path}}` - {{endpoint_purpose}}
  <</REPEAT>>

**Integration Notes:** {{integration_considerations}}
<</REPEAT>>

@{example: external_api}

### Stripe API

- **Purpose:** Payment processing and subscription management
- **Documentation:** https://stripe.com/docs/api
- **Base URL(s):** `https://api.stripe.com/v1`
- **Authentication:** Bearer token with secret key
- **Rate Limits:** 100 requests per second

**Key Endpoints Used:**

- `POST /customers` - Create customer profiles
- `POST /payment_intents` - Process payments
- `POST /subscriptions` - Manage subscriptions
  @{/example}

^^/CONDITION: has_external_apis^^

[[LLM: After presenting external APIs (or noting their absence), apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Core Workflows

[[LLM: Illustrate key system workflows using sequence diagrams:

1. Identify critical user journeys from PRD
2. Show component interactions including external APIs
3. Include error handling paths
4. Document async operations
5. Create both high-level and detailed diagrams as needed

Focus on workflows that clarify architecture decisions or complex interactions.

After presenting the workflow diagrams, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## REST API Spec

[[LLM: If the project includes a REST API:

1. Create an OpenAPI 3.0 specification
2. Include all endpoints from epics/stories
3. Define request/response schemas based on data models
4. Document authentication requirements
5. Include example requests/responses

Use YAML format for better readability. If no REST API, skip this section.]]

^^CONDITION: has_rest_api^^

```yaml
openapi: 3.0.0
info:
  title:
    '[object Object]': null
  version:
    '[object Object]': null
  description:
    '[object Object]': null
servers:
  - url:
      '[object Object]': null
    description:
      '[object Object]': null
```

^^/CONDITION: has_rest_api^^

[[LLM: After presenting the REST API spec (or noting its absence if not applicable), apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Database Schema

[[LLM: Transform the conceptual data models into concrete database schemas:

1. Use the database type(s) selected in Tech Stack
2. Create schema definitions using appropriate notation
3. Include indexes, constraints, and relationships
4. Consider performance and scalability
5. For NoSQL, show document structures

Present schema in format appropriate to database type (SQL DDL, JSON schema, etc.)

After presenting the database schema, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Source Tree

[[LLM: Create a project folder structure that reflects:

1. The chosen repository structure (monorepo/polyrepo)
2. The service architecture (monolith/microservices/serverless)
3. The selected tech stack and languages
4. Component organization from above
5. Best practices for the chosen frameworks
6. Clear separation of concerns

Adapt the structure based on project needs. For monorepos, show service separation. For serverless, show function organization. Include language-specific conventions.

After presenting the structure, apply `{root}/tasks/advanced-elicitation.md` protocol to refine based on user feedback.]]

```plaintext
{{project-root}}/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       └── main.yaml
├── .vscode/                    # VSCode settings (optional)
│   └── settings.json
├── build/                      # Compiled output (git-ignored)
├── config/                     # Configuration files
├── docs/                       # Project documentation
│   ├── PRD.md
│   ├── architecture.md
│   └── ...
├── infra/                      # Infrastructure as Code
│   └── {{iac-structure}}
├── {{dependencies-dir}}/       # Dependencies (git-ignored)
├── scripts/                    # Utility scripts
├── src/                        # Application source code
│   └── {{source-structure}}
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── {{package-manifest}}        # Dependencies manifest
├── {{config-files}}            # Language/framework configs
└── README.md                   # Project documentation

@{example: monorepo-structure}
project-root/
├── packages/
│ ├── api/ # Backend API service
│ ├── web/ # Frontend application
│ ├── shared/ # Shared utilities/types
│ └── infrastructure/ # IaC definitions
├── scripts/ # Monorepo management scripts
└── package.json # Root package.json with workspaces
@{/example}
```

[[LLM: After presenting the source tree structure, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Infrastructure and Deployment

[[LLM: Define the deployment architecture and practices:

1. Use IaC tool selected in Tech Stack
2. Choose deployment strategy appropriate for the architecture
3. Define environments and promotion flow
4. Establish rollback procedures
5. Consider security, monitoring, and cost optimization

Get user input on deployment preferences and CI/CD tool choices.]]

### Infrastructure as Code

- **Tool:** {{iac_tool}} {{version}}
- **Location:** `{{iac_directory}}`
- **Approach:** {{iac_approach}}

### Deployment Strategy

- **Strategy:** {{deployment_strategy}}
- **CI/CD Platform:** {{cicd_platform}}
- **Pipeline Configuration:** `{{pipeline_config_location}}`

### Environments

<<REPEAT: environment>>

- **{{env_name}}:** {{env_purpose}} - {{env_details}}
  <</REPEAT>>

### Environment Promotion Flow

```text
{{promotion_flow_diagram}}
```

### Rollback Strategy

- **Primary Method:** {{rollback_method}}
- **Trigger Conditions:** {{rollback_triggers}}
- **Recovery Time Objective:** {{rto}}

[[LLM: After presenting the infrastructure and deployment section, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Error Handling Strategy

[[LLM: Define comprehensive error handling approach:

1. Choose appropriate patterns for the language/framework from Tech Stack
2. Define logging standards and tools
3. Establish error categories and handling rules
4. Consider observability and debugging needs
5. Ensure security (no sensitive data in logs)

This section guides both AI and human developers in consistent error handling.]]

### General Approach

- **Error Model:** {{error_model}}
- **Exception Hierarchy:** {{exception_structure}}
- **Error Propagation:** {{propagation_rules}}

### Logging Standards

- **Library:** {{logging_library}} {{version}}
- **Format:** {{log_format}}
- **Levels:** {{log_levels_definition}}
- **Required Context:**
  - Correlation ID: {{correlation_id_format}}
  - Service Context: {{service_context}}
  - User Context: {{user_context_rules}}

### Error Handling Patterns

#### External API Errors

- **Retry Policy:** {{retry_strategy}}
- **Circuit Breaker:** {{circuit_breaker_config}}
- **Timeout Configuration:** {{timeout_settings}}
- **Error Translation:** {{error_mapping_rules}}

#### Business Logic Errors

- **Custom Exceptions:** {{business_exception_types}}
- **User-Facing Errors:** {{user_error_format}}
- **Error Codes:** {{error_code_system}}

#### Data Consistency

- **Transaction Strategy:** {{transaction_approach}}
- **Compensation Logic:** {{compensation_patterns}}
- **Idempotency:** {{idempotency_approach}}

[[LLM: After presenting the error handling strategy, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Coding Standards

[[LLM: These standards are MANDATORY for AI agents. Work with user to define ONLY the critical rules needed to prevent bad code. Explain that:

1. This section directly controls AI developer behavior
2. Keep it minimal - assume AI knows general best practices
3. Focus on project-specific conventions and gotchas
4. Overly detailed standards bloat context and slow development
5. Standards will be extracted to separate file for dev agent use

For each standard, get explicit user confirmation it's necessary.]]

### Core Standards

- **Languages & Runtimes:** {{languages_and_versions}}
- **Style & Linting:** {{linter_config}}
- **Test Organization:** {{test_file_convention}}

### Naming Conventions

[[LLM: Only include if deviating from language defaults]]

| Element   | Convention           | Example           |
| :-------- | :------------------- | :---------------- |
| Variables | {{var_convention}}   | {{var_example}}   |
| Functions | {{func_convention}}  | {{func_example}}  |
| Classes   | {{class_convention}} | {{class_example}} |
| Files     | {{file_convention}}  | {{file_example}}  |

### Critical Rules

[[LLM: List ONLY rules that AI might violate or project-specific requirements. Examples:

- "Never use console.log in production code - use logger"
- "All API responses must use ApiResponse wrapper type"
- "Database queries must use repository pattern, never direct ORM"

Avoid obvious rules like "use SOLID principles" or "write clean code"]]

<<REPEAT: critical_rule>>

- **{{rule_name}}:** {{rule_description}}
  <</REPEAT>>

### Language-Specific Guidelines

[[LLM: Add ONLY if critical for preventing AI mistakes. Most teams don't need this section.]]

^^CONDITION: has_language_specifics^^

#### {{language_name}} Specifics

<<REPEAT: language_rule>>

- **{{rule_topic}}:** {{rule_detail}}
  <</REPEAT>>

^^/CONDITION: has_language_specifics^^

[[LLM: After presenting the coding standards, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Test Strategy and Standards

[[LLM: Work with user to define comprehensive test strategy:

1. Use test frameworks from Tech Stack
2. Decide on TDD vs test-after approach
3. Define test organization and naming
4. Establish coverage goals
5. Determine integration test infrastructure
6. Plan for test data and external dependencies

Note: Basic info goes in Coding Standards for dev agent. This detailed section is for QA agent and team reference. Apply `{root}/tasks/advanced-elicitation.md` after initial draft.]]

### Testing Philosophy

- **Approach:** {{test_approach}}
- **Coverage Goals:** {{coverage_targets}}
- **Test Pyramid:** {{test_distribution}}

### Test Types and Organization

#### Unit Tests

- **Framework:** {{unit_test_framework}} {{version}}
- **File Convention:** {{unit_test_naming}}
- **Location:** {{unit_test_location}}
- **Mocking Library:** {{mocking_library}}
- **Coverage Requirement:** {{unit_coverage}}

**AI Agent Requirements:**

- Generate tests for all public methods
- Cover edge cases and error conditions
- Follow AAA pattern (Arrange, Act, Assert)
- Mock all external dependencies

#### Integration Tests

- **Scope:** {{integration_scope}}
- **Location:** {{integration_test_location}}
- **Test Infrastructure:**
  <<REPEAT: test_dependency>>
  - **{{dependency_name}}:** {{test_approach}} ({{test_tool}})
    <</REPEAT>>

@{example: test_dependencies}

- **Database:** In-memory H2 for unit tests, Testcontainers PostgreSQL for integration
- **Message Queue:** Embedded Kafka for tests
- **External APIs:** WireMock for stubbing
  @{/example}

#### End-to-End Tests

- **Framework:** {{e2e_framework}} {{version}}
- **Scope:** {{e2e_scope}}
- **Environment:** {{e2e_environment}}
- **Test Data:** {{e2e_data_strategy}}

### Test Data Management

- **Strategy:** {{test_data_approach}}
- **Fixtures:** {{fixture_location}}
- **Factories:** {{factory_pattern}}
- **Cleanup:** {{cleanup_strategy}}

### Continuous Testing

- **CI Integration:** {{ci_test_stages}}
- **Performance Tests:** {{perf_test_approach}}
- **Security Tests:** {{security_test_approach}}

[[LLM: After presenting the test strategy section, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Security

[[LLM: Define MANDATORY security requirements for AI and human developers:

1. Focus on implementation-specific rules
2. Reference security tools from Tech Stack
3. Define clear patterns for common scenarios
4. These rules directly impact code generation
5. Work with user to ensure completeness without redundancy]]

### Input Validation

- **Validation Library:** {{validation_library}}
- **Validation Location:** {{where_to_validate}}
- **Required Rules:**
  - All external inputs MUST be validated
  - Validation at API boundary before processing
  - Whitelist approach preferred over blacklist

### Authentication & Authorization

- **Auth Method:** {{auth_implementation}}
- **Session Management:** {{session_approach}}
- **Required Patterns:**
  - {{auth_pattern_1}}
  - {{auth_pattern_2}}

### Secrets Management

- **Development:** {{dev_secrets_approach}}
- **Production:** {{prod_secrets_service}}
- **Code Requirements:**
  - NEVER hardcode secrets
  - Access via configuration service only
  - No secrets in logs or error messages

### API Security

- **Rate Limiting:** {{rate_limit_implementation}}
- **CORS Policy:** {{cors_configuration}}
- **Security Headers:** {{required_headers}}
- **HTTPS Enforcement:** {{https_approach}}

### Data Protection

- **Encryption at Rest:** {{encryption_at_rest}}
- **Encryption in Transit:** {{encryption_in_transit}}
- **PII Handling:** {{pii_rules}}
- **Logging Restrictions:** {{what_not_to_log}}

### Dependency Security

- **Scanning Tool:** {{dependency_scanner}}
- **Update Policy:** {{update_frequency}}
- **Approval Process:** {{new_dep_process}}

### Security Testing

- **SAST Tool:** {{static_analysis}}
- **DAST Tool:** {{dynamic_analysis}}
- **Penetration Testing:** {{pentest_schedule}}

[[LLM: After presenting the security section, apply `{root}/tasks/advanced-elicitation.md` protocol]]

## Checklist Results Report

[[LLM: Before running the checklist, offer to output the full architecture document. Once user confirms, execute the `architect-checklist` and populate results here.]]

---

## Next Steps

[[LLM: After completing the architecture:

1. If project has UI components:

- Recommend engaging Design Architect agent
- Use "Frontend Architecture Mode"
- Provide this document as input

2. For all projects:

- Review with Product Owner
- Begin story implementation with Dev agent
- Set up infrastructure with DevOps agent

3. Include specific prompts for next agents if needed]]

^^CONDITION: has_ui^^

### Design Architect Prompt

[[LLM: Create a brief prompt to hand off to Design Architect for Frontend Architecture creation. Include:

- Reference to this architecture document
- Key UI requirements from PRD
- Any frontend-specific decisions made here
- Request for detailed frontend architecture]]

^^/CONDITION: has_ui^^

### Developer Handoff

[[LLM: Create a brief prompt for developers starting implementation. Include:

- Reference to this architecture and coding standards
- First epic/story to implement
- Key technical decisions to follow]]
