# {Project Name} Architecture Document

## Introduction / Preamble

{This document outlines the overall project architecture, including backend systems, shared services, and non-UI specific concerns. Its primary goal is to serve as the guiding architectural blueprint for AI-driven development, ensuring consistency and adherence to chosen patterns and technologies.

**Relationship to Frontend Architecture:**
If the project includes a significant user interface, a separate Frontend Architecture Document (typically named `front-end-architecture-tmpl.txt` or similar, and linked in the "Key Reference Documents" section) details the frontend-specific design and MUST be used in conjunction with this document. Core technology stack choices documented herein (see "Definitive Tech Stack Selections") are definitive for the entire project, including any frontend components.}

## Table of Contents

{ Update this if sections and subsections are added or removed }

## Technical Summary

{ Provide a brief paragraph overview of the system's architecture, key components, technology choices, and architectural patterns used. Reference the goals from the PRD. }

## High-Level Overview

{ Describe the main architectural style (e.g., Monolith, Microservices, Serverless, Event-Driven), reflecting the decision made in the PRD. Explain the repository structure (Monorepo/Polyrepo). Explain the primary user interaction or data flow at a conceptual level. }

{ Insert high-level mermaid system context or interaction diagram here - e.g., Mermaid Class C4 Models Layer 1 and 2 }

## Architectural / Design Patterns Adopted

{ List the key high-level patterns chosen for the architecture. These foundational patterns should be established early as they guide component design, interactions, and technology choices. }

- **Pattern 1:** {e.g., Serverless, Event-Driven, Microservices, CQRS} - _Rationale/Reference:_ {Briefly why, or link to a more detailed explanation if needed}
- **Pattern 2:** {e.g., Dependency Injection, Repository Pattern, Module Pattern} - _Rationale/Reference:_ {...}
- **Pattern N:** {...}

## Component View

{ Describe the major logical components or services of the system and their responsibilities, reflecting the decided overall architecture (e.g., distinct microservices, modules within a monolith, packages within a monorepo) and the architectural patterns adopted. Explain how they collaborate. }

- Component A: {Description of responsibility}

{Insert component diagram here if it helps - e.g., using Mermaid graph TD or C4 Model Container/Component Diagram}

- Component N...: {Description of responsibility}

{ Insert component diagram here if it helps - e.g., using Mermaid graph TD or C4 Model Container/Component Diagram }

## Project Structure

{Provide an ASCII or Mermaid diagram representing the project's folder structure. The following is a general example. If a `front-end-architecture-tmpl.txt` (or equivalent) is in use, it will contain the detailed structure for the frontend portion (e.g., within `src/frontend/` or a dedicated `frontend/` root directory). Shared code structure (e.g., in a `packages/` directory for a monorepo) should also be detailed here.}

```plaintext
{project-root}/
â”œâ”€â”€ .github/                    # CI/CD workflows (e.g., GitHub Actions)
â”‚   â””â”€â”€ workflows/
â”‚       â””â”€â”€ main.yml
â”œâ”€â”€ .vscode/                    # VSCode settings (optional)
â”‚   â””â”€â”€ settings.json
â”œâ”€â”€ build/                      # Compiled output (if applicable, often git-ignored)
â”œâ”€â”€ config/                     # Static configuration files (if any)
â”œâ”€â”€ docs/                       # Project documentation (PRD, Arch, etc.)
â”‚   â”œâ”€â”€ index.md
â”‚   â””â”€â”€ ... (other .md files)
â”œâ”€â”€ infra/                      # Infrastructure as Code (e.g., CDK, Terraform)
â”‚   â””â”€â”€ lib/
â”‚   â””â”€â”€ bin/
â”œâ”€â”€ node_modules/ / venv / target/ # Project dependencies (git-ignored)
â”œâ”€â”€ scripts/                    # Utility scripts (build, deploy helpers, etc.)
â”œâ”€â”€ src/                        # Application source code
â”‚   â”œâ”€â”€ backend/                # Backend-specific application code (if distinct frontend exists)
â”‚   â”‚   â”œâ”€â”€ core/               # Core business logic, domain models
â”‚   â”‚   â”œâ”€â”€ services/           # Business services, orchestrators
â”‚   â”‚   â”œâ”€â”€ adapters/           # Adapters to external systems (DB, APIs)
â”‚   â”‚   â”œâ”€â”€ controllers/ / routes/ # API endpoint handlers
â”‚   â”‚   â””â”€â”€ main.ts / app.py    # Backend application entry point
â”‚   â”œâ”€â”€ frontend/               # Placeholder: See Frontend Architecture Doc for details if used
â”‚   â”œâ”€â”€ shared/ / common/       # Code shared (e.g., types, utils, domain models if applicable)
â”‚   â”‚   â””â”€â”€ types/
â”‚   â””â”€â”€ main.ts / index.ts / app.ts # Main application entry point (if not using backend/frontend split above)
â”œâ”€â”€ stories/                    # Generated story files for development (optional)
â”‚   â””â”€â”€ epic1/
â”œâ”€â”€ test/                       # Automated tests
â”‚   â”œâ”€â”€ unit/                   # Unit tests (mirroring src structure)
â”‚   â”œâ”€â”€ integration/            # Integration tests
â”‚   â””â”€â”€ e2e/                    # End-to-end tests
â”œâ”€â”€ .env.example                # Example environment variables
â”œâ”€â”€ .gitignore                  # Git ignore rules
â”œâ”€â”€ package.json / requirements.txt / pom.xml # Project manifest and dependencies
â”œâ”€â”€ tsconfig.json / pyproject.toml # Language-specific configuration (if applicable)
â”œâ”€â”€ Dockerfile                  # Docker build instructions (if applicable)
â””â”€â”€ README.md                   # Project overview and setup instructions
```

(Adjust the example tree based on the actual project type - e.g., Python would have requirements.txt, etc. The structure above illustrates a potential separation for projects with distinct frontends; for simpler projects or APIs, the `src/` structure might be flatter.)

### Key Directory Descriptions

- docs/: Contains all project planning and reference documentation.
- infra/: Holds the Infrastructure as Code definitions (e.g., AWS CDK, Terraform).
- src/: Contains the main application source code. May be subdivided (e.g., `backend/`, `frontend/`, `shared/`) depending on project complexity and whether a separate frontend architecture document is in use.
- src/backend/core/ / src/core/ / src/domain/: Core business logic, entities, use cases, independent of frameworks/external services.
- src/backend/adapters/ / src/adapters/ / src/infrastructure/: Implementation details, interactions with databases, cloud SDKs, frameworks.
- src/backend/controllers/ / src/routes/ / src/pages/: Entry points for API requests or UI views (if UI is simple and not in a separate frontend structure).
- test/: Contains all automated tests, mirroring the src/ structure where applicable.

### Notes

{Mention any specific build output paths, compiler configuration pointers, or other relevant structural notes.}

## API Reference

### External APIs Consumed

{Repeat this section for each external API the system interacts with.}

#### {External Service Name} API

- **Purpose:** {Why does the system use this API?}
- **Base URL(s):**
  - Production: `{URL}`
  - Staging/Dev: `{URL}`
- **Authentication:** {Describe method - e.g., API Key in Header (Header Name: `X-API-Key`), OAuth 2.0 Client Credentials, Basic Auth. Reference `docs/environment-vars.md` for key names.}
- **Key Endpoints Used:**
  - **`{HTTP Method} {/path/to/endpoint}`:**
    - Description: {What does this endpoint do?}
    - Request Parameters: {Query params, path params}
    - Request Body Schema: {Provide JSON schema inline, or link to a detailed definition in `docs/data-models.md` only if the schema is exceptionally large or complex.}
    - Example Request: `{Code block}`
    - Success Response Schema (Code: `200 OK`): {Provide JSON schema inline, or link to a detailed definition in `docs/data-models.md` only if very complex.}
    - Error Response Schema(s) (Codes: `4xx`, `5xx`): {Provide JSON schema inline, or link to a detailed definition in `docs/data-models.md` only if very complex.}
    - Example Response: `{Code block}`
  - **`{HTTP Method} {/another/endpoint}`:** {...}
- **Rate Limits:** {If known}
- **Link to Official Docs:** {URL}

### Internal APIs Provided (If Applicable)

{If the system exposes its own APIs (e.g., in a microservices architecture or for a UI frontend). Repeat for each API.}

#### {Internal API / Service Name} API

- **Purpose:** {What service does this API provide?}
- **Base URL(s):** {e.g., `/api/v1/...`}
- **Authentication/Authorization:** {Describe how access is controlled.}
- **Endpoints:**
  - **`{HTTP Method} {/path/to/endpoint}`:**
    - Description: {What does this endpoint do?}
    - Request Parameters: {...}
    - Request Body Schema: {Provide JSON schema inline, or link to a detailed definition in `docs/data-models.md` only if very complex.}
    - Success Response Schema (Code: `200 OK`): {Provide JSON schema inline, or link to a detailed definition in `docs/data-models.md` only if very complex.}
    - Error Response Schema(s) (Codes: `4xx`, `5xx`): {Provide JSON schema inline, or link to a detailed definition in `docs/data-models.md` only if very complex.}
  - **`{HTTP Method} {/another/endpoint}`:** {...}

## Data Models

### Core Application Entities / Domain Objects

{Define the main objects/concepts the application works with. Repeat subsection for each key entity.}

#### {Entity Name, e.g., User, Order, Product}

- **Description:** {What does this entity represent?}
- **Schema / Interface Definition:**
  ```typescript
  // Example using TypeScript Interface
  export interface {EntityName} {
    id: string; // {Description, e.g., Unique identifier}
    propertyName: string; // {Description}
    optionalProperty?: number; // {Description}
    // ... other properties
  }
  ```
- **Validation Rules:** {List any specific validation rules beyond basic types - e.g., max length, format, range.}

### API Payload Schemas (If distinct)

{Define schemas here only if they are distinct from core entities AND not fully detailed under the API endpoint definitions in the API Reference section. Prefer detailing request/response schemas directly with their APIs where possible. This section is for complex, reusable payload structures that might be used across multiple internal APIs or differ significantly from core persisted entities.}

#### {API Endpoint / Purpose, e.g., Create Order Request, repeat the section as needed}

- **Schema / Interface Definition:**
  ```typescript
  // Example
  export interface CreateOrderRequest {
    customerId: string;
    items: { productId: string; quantity: number }[];
    // ...
  }
  ```

### Database Schemas (If applicable)

{If using a database, define table structures or document database schemas. repeat as needed}

#### {Table / Collection Name}

- **Purpose:** {What data does this table store?}
- **Schema Definition:**
  ```sql
  -- Example SQL
  CREATE TABLE {TableName} (
    id VARCHAR(36) PRIMARY KEY,
    column_name VARCHAR(255) NOT NULL,
    numeric_column DECIMAL(10, 2),
    -- ... other columns, indexes, constraints
  );
  ```
  _(Alternatively, use ORM model definitions, NoSQL document structure, etc.)_

## Core Workflow / Sequence Diagrams

{ Illustrate key or complex workflows using mermaid sequence diagrams. Can have high level tying the full project together, and also smaller epic level sequence diagrams. }

## Definitive Tech Stack Selections

{ This section outlines the definitive technology choices for the project. These selections should be made after a thorough understanding of the project's requirements, components, data models, and core workflows. The Architect Agent should guide the user through these decisions, ensuring each choice is justified and recorded accurately in the table below.

This table is the **single source of truth** for all technology selections. Other architecture documents (e.g., Frontend Architecture) must refer to these choices and elaborate on their specific application rather than re-defining them.

Key decisions to discuss and finalize here, which will then be expanded upon and formally documented in the detailed stack table below, include considerations such as:

- Preferred Starter Template Frontend: { Url to template or starter, if used }
- Preferred Starter Template Backend: { Url to template or starter, if used }
- Primary Language(s) & Version(s): {e.g., TypeScript 5.x, Python 3.11 - Specify exact versions, e.g., `5.2.3`}
- Primary Runtime(s) & Version(s): {e.g., Node.js 22.x - Specify exact versions, e.g., `22.0.1`}

Must be definitive selections; do not list open-ended choices (e.g., for web scraping, pick one tool, not two). Specify exact versions (e.g., `18.2.0`). If 'Latest' is used, it implies the latest stable version _at the time of this document's last update_, and the specific version (e.g., `xyz-library@2.3.4`) should be recorded. Pinning versions is strongly preferred to avoid unexpected breaking changes for the AI agent. }

| Category             | Technology              | Version / Details | Description / Purpose                   | Justification (Optional) |
| :------------------- | :---------------------- | :---------------- | :-------------------------------------- | :----------------------- |
| **Languages**        | {e.g., TypeScript}      | {e.g., 5.x}       | {Primary language for backend/frontend} | {Why this language?}     |
|                      | {e.g., Python}          | {e.g., 3.11}      | {Used for data processing, ML}          | {...}                    |
| **Runtime**          | {e.g., Node.js}         | {e.g., 22.x}      | {Server-side execution environment}     | {...}                    |
| **Frameworks**       | {e.g., NestJS}          | {e.g., 10.x}      | {Backend API framework}                 | {Why this framework?}    |
|                      | {e.g., React}           | {e.g., 18.x}      | {Frontend UI library}                   | {...}                    |
| **Databases**        | {e.g., PostgreSQL}      | {e.g., 15}        | {Primary relational data store}         | {...}                    |
|                      | {e.g., Redis}           | {e.g., 7.x}       | {Caching, session storage}              | {...}                    |
| **Cloud Platform**   | {e.g., AWS}             | {N/A}             | {Primary cloud provider}                | {...}                    |
| **Cloud Services**   | {e.g., AWS Lambda}      | {N/A}             | {Serverless compute}                    | {...}                    |
|                      | {e.g., AWS S3}          | {N/A}             | {Object storage for assets/state}       | {...}                    |
|                      | {e.g., AWS EventBridge} | {N/A}             | {Event bus / scheduled tasks}           | {...}                    |
| **Infrastructure**   | {e.g., AWS CDK}         | {e.g., Latest}    | {Infrastructure as Code tool}           | {...}                    |
|                      | {e.g., Docker}          | {e.g., Latest}    | {Containerization}                      | {...}                    |
| **UI Libraries**     | {e.g., Material UI}     | {e.g., 5.x}       | {React component library}               | {...}                    |
| **State Management** | {e.g., Redux Toolkit}   | {e.g., Latest}    | {Frontend state management}             | {...}                    |
| **Testing**          | {e.g., Jest}            | {e.g., Latest}    | {Unit/Integration testing framework}    | {...}                    |
|                      | {e.g., Playwright}      | {e.g., Latest}    | {End-to-end testing framework}          | {...}                    |
| **CI/CD**            | {e.g., GitHub Actions}  | {N/A}             | {Continuous Integration/Deployment}     | {...}                    |
| **Other Tools**      | {e.g., LangChain.js}    | {e.g., Latest}    | {LLM interaction library}               | {...}                    |
|                      | {e.g., Cheerio}         | {e.g., Latest}    | {HTML parsing/scraping}                 | {...}                    |

## Infrastructure and Deployment Overview

- Cloud Provider(s): {e.g., AWS, Azure, GCP, On-premise}
- Core Services Used: {List key managed services - e.g., Lambda, S3, Kubernetes Engine, RDS, Kafka}
- Infrastructure as Code (IaC): {Tool used - e.g., AWS CDK, Terraform...} - Location: {Link to IaC code repo/directory}
- Deployment Strategy: {e.g., CI/CD pipeline with automated promotions, Blue/Green, Canary} - Tools: {e.g., Jenkins, GitHub Actions, GitLab CI}
- Environments: {List environments - e.g., Development, Staging, Production}
- Environment Promotion: {Describe steps, e.g., `dev` -\> `staging` (manual approval / automated tests pass) -\> `production` (automated after tests pass and optional manual approval)}
- Rollback Strategy: {e.g., Automated rollback on health check failure post-deployment, Manual trigger via CI/CD job, IaC state rollback. Specify primary mechanism.}

## Error Handling Strategy

- **General Approach:** {e.g., Use exceptions as primary mechanism, return error codes/tuples for specific modules, clearly defined custom error types hierarchy.}
- **Logging:**
  - Library/Method: {e.g., `console.log/error` (Node.js), Python `logging` module with `structlog`, dedicated logging library like `Pino` or `Serilog`. Specify the chosen library.}
  - Format: {e.g., JSON, plain text with timestamp and severity. JSON is preferred for structured logging.}
  - Levels: {e.g., DEBUG, INFO, WARN, ERROR, CRITICAL. Specify standard usage for each.}
  - Context: {What contextual information must be included? e.g., Correlation ID, User ID (if applicable and safe), Service Name, Operation Name, Key Parameters (sanitized).}
- **Specific Handling Patterns:**
  - External API Calls: {Define retry mechanisms (e.g., exponential backoff, max retries - specify library if one is mandated like `Polly` or `tenacity`), circuit breaker pattern usage (e.g., using `resilience4j` or equivalent - specify if and how), timeout configurations (connect and read timeouts). How are API errors (4xx, 5xx) translated or propagated?}
  - Internal Errors / Business Logic Exceptions: {How to convert internal errors to user-facing errors if applicable (e.g., generic error messages with a unique ID for support, specific error codes). Are there defined business exception classes?}
  - Transaction Management: {Approach to ensure data consistency in case of errors during multi-step operations, e.g., database transactions (specify isolation levels if non-default), Saga pattern for distributed transactions (specify orchestrator/choreography and compensation logic).}

## Coding Standards

{These standards are mandatory for all code generation by AI agents and human developers. Deviations are not permitted unless explicitly approved and documented as an exception in this section or a linked addendum.}

- **Primary Runtime(s):** {e.g., Node.js 22.x, Python Runtime for Lambda - refer to Definitive Tech Stack}
- **Style Guide & Linter:** {e.g., ESLint with Airbnb config + Prettier; Black, Flake8, MyPy; Go fmt, golint. Specify chosen tools and link to configuration files (e.g., `.eslintrc.js`, `pyproject.toml`). Linter rules are mandatory and must not be disabled without cause.}
- **Naming Conventions:**
  - Variables: `{e.g., camelCase (JavaScript/TypeScript/Java), snake_case (Python/Ruby)}`
  - Functions/Methods: `{e.g., camelCase (JavaScript/TypeScript/Java), snake_case (Python/Ruby)}`
  - Classes/Types/Interfaces: `{e.g., PascalCase}`
  - Constants: `{e.g., UPPER_SNAKE_CASE}`
  - Files: `{e.g., kebab-case.ts (TypeScript), snake_case.py (Python), PascalCase.java (Java). Be specific per language.}`
  - Modules/Packages: `{e.g., camelCase or snake_case. Be specific per language.}`
- **File Structure:** Adhere to the layout defined in the "Project Structure" section and the Frontend Architecture Document if applicable.
- **Unit Test File Organization:** {e.g., `*.test.ts`/`*.spec.ts` co-located with source files; `test_*.py` in a parallel `tests/` directory. Specify chosen convention.}
- **Asynchronous Operations:** {e.g., Always use `async`/`await` in TypeScript/JavaScript/Python for promise-based operations; Goroutines/Channels in Go with clear patterns for error propagation and completion; Java `CompletableFuture` or Project Reactor/RxJava if used.}
- **Type Safety:** {e.g., Leverage TypeScript strict mode (all flags enabled); Python type hints (enforced by MyPy); Go static typing; Java generics and avoidance of raw types. All new code must be strictly typed.}
  - _Type Definitions:_ {Location, e.g., `src/common/types.ts`, shared packages, or co-located. Policy on using `any` or equivalent (strongly discouraged, requires justification).}
- **Comments & Documentation:**
  - Code Comments: {Expectations for code comments: Explain _why_, not _what_, for complex logic. Avoid redundant comments. Use standard formats like JSDoc, TSDoc, Python docstrings (Google/NumPy style), GoDoc, JavaDoc.}
  - READMEs: {Each module/package/service should have a README explaining its purpose, setup, and usage if not trivial.}
- **Dependency Management:** {Tool used - e.g., npm/yarn, pip/poetry, Go modules, Maven/Gradle. Policy on adding new dependencies (e.g., approval process, check for existing alternatives, security vulnerability scans). Specify versioning strategy (e.g., prefer pinned versions, use tilde `~` for patches, caret `^` for minor updates - be specific).}

### Detailed Language & Framework Conventions

{For each primary language and framework selected in the "Definitive Tech Stack Selections", the following specific conventions **must** be adhered to. If a chosen technology is not listed below, it implies adherence to its standard, widely accepted best practices and the general guidelines in this document.}

#### `{Language/Framework 1 Name, e.g., TypeScript/Node.js}` Specifics:

- **Immutability:** `{e.g., "Always prefer immutable data structures. Use `Readonly\<T\>`, `ReadonlyArray\<T\>`, `as const` for object/array literals. Avoid direct mutation of objects/arrays passed as props or state. Consider libraries like Immer for complex state updates."}`
- **Functional vs. OOP:** `{e.g., "Favor functional programming constructs (map, filter, reduce, pure functions) for data transformation and business logic where practical. Use classes for entities, services with clear state/responsibilities, or when framework conventions (e.g., NestJS) demand."}`
- **Error Handling Specifics:** `{e.g., "Always use `Error`objects or extensions thereof for`throw`. Ensure `Promise`rejections are always`Error`objects. Use custom error classes inheriting from a base`AppError` for domain-specific errors."}`
- **Null/Undefined Handling:** `{e.g., "Strict null checks (`strictNullChecks`) must be enabled. Avoid `\!` non-null assertion operator; prefer explicit checks, optional chaining (`?.`), or nullish coalescing (`??`). Define clear strategies for optional function parameters and return types."}`
- **Module System:** `{e.g., "Use ESModules (`import`/`export`) exclusively. Avoid CommonJS (`require`/`module.exports`) in new code."}`
- **Logging Specifics:** `{e.g., "Use the chosen structured logging library. Log messages must include a correlation ID. Do not log sensitive PII. Use appropriate log levels."}`
- **Framework Idioms (e.g., for NestJS/Express):** `{e.g., "NestJS: Always use decorators for defining modules, controllers, services, DTOs. Adhere strictly to the defined module structure and dependency injection patterns. Express: Define middleware patterns, routing structure."}`
- **Key Library Usage Conventions:** `{e.g., "When using Axios, create a single configured instance. For date/time, use {date-fns/Luxon/Day.js} and avoid native `Date` object for manipulations."}`
- **Code Generation Anti-Patterns to Avoid:** `{e.g., "Avoid overly nested conditional logic (max 2-3 levels). Avoid single-letter variable names (except for trivial loop counters like `i`, `j`, `k`). Do not write code that bypasses framework security features (e.g., ORM query builders)."}`

#### `{Language/Framework 2 Name, e.g., Python}` Specifics:

- **Immutability:** `{e.g., "Use tuples for immutable sequences. For classes, consider `@dataclass(frozen=True)`. Be mindful of mutable default arguments."}`
- **Functional vs. OOP:** `{e.g., "Employ classes for representing entities and services. Use functions for stateless operations. List comprehensions/generator expressions are preferred over `map/filter` for readability."}`
- **Error Handling Specifics:** `{e.g., "Always raise specific, custom exceptions inheriting from a base `AppException`. Use `try-except-else-finally`blocks appropriately. Avoid broad`except Exception:` clauses without re-raising or specific handling."}`
- **Resource Management:** `{e.g., "Always use `with` statements for resources like files or DB connections to ensure they are properly closed."}`
- **Type Hinting:** `{e.g., "All new functions and methods must have full type hints. Run MyPy in CI. Strive for `disallow_untyped_defs = True`."}`
- **Logging Specifics:** `{e.g., "Use the `logging`module configured for structured output (e.g., with`python-json-logger`). Include correlation IDs."}`
- **Framework Idioms (e.g., for Django/Flask/FastAPI):** `{e.g., "Django: Follow fat models, thin views pattern. Use ORM conventions. FastAPI: Utilize Pydantic for request/response models and dependency injection for services."}`
- **Key Library Usage Conventions:** `{e.g., "For HTTP requests, use `httpx`or`requests`with explicit timeout settings. For data manipulation, prefer`pandas` where appropriate but be mindful of performance."}`

#### `{Add more Language/Framework sections as needed...}`

- **{Consider other things that the trained LLM Dev Agent could potentially be random about specific to the chosen language technologies and platforms that it should be reminded of here}**

## Overall Testing Strategy

{This section outlines the project's comprehensive testing strategy, which all AI-generated and human-written code must adhere to. It complements the testing tools listed in the "Definitive Tech Stack Selections".}

- **Tools:** {Reiterate primary testing frameworks and libraries from Tech Stack, e.g., Jest, Playwright, PyTest, JUnit, Testcontainers.}
- **Unit Tests:**
  - **Scope:** {Test individual functions, methods, classes, or small modules in isolation. Focus on business logic, algorithms, and transformation rules.}
  - **Location:** {e.g., `*.test.ts`/`*.spec.ts` co-located with source files; `test_*.py` in a parallel `tests/` directory, following language conventions.}
  - **Mocking/Stubbing:** {Specify chosen mocking library (e.g., Jest mocks, `unittest.mock` in Python, Mockito for Java). Mock all external dependencies (network calls, file system, databases, time).}
  - **AI Agent Responsibility:** {AI Agent must generate unit tests covering all public methods, significant logic paths, edge cases, and error conditions for any new or modified code.}
- **Integration Tests:**
  - **Scope:** {Test the interaction between several components or services within the application boundary. E.g., API endpoint to service layer to database (using a test database or in-memory version).}
  - **Location:** {e.g., `/tests/integration` or `/src/integration-test` (Java).}
  - **Environment:** {Specify how dependencies are handled (e.g., Testcontainers for databases/external services, in-memory databases, dedicated test environment).}
  - **AI Agent Responsibility:** {AI Agent may be tasked with generating integration tests for key service interactions or API endpoints based on specifications.}
- **End-to-End (E2E) Tests:**
  - **Scope:** {Validate complete user flows or critical paths through the system from the user's perspective (e.g., UI interaction, API call sequence).}
  - **Tools:** {Reiterate E2E testing tools from Tech Stack (e.g., Playwright, Cypress, Selenium).}
  - **AI Agent Responsibility:** {AI Agent may be tasked with generating E2E test stubs or scripts based on user stories or BDD scenarios. Focus on critical happy paths and key error scenarios.}
- **Test Coverage:**
  - **Target:** {Specify target code coverage if any (e.g., 80% line/branch coverage for unit tests). This is a guideline; quality of tests is paramount over raw coverage numbers.}
  - **Measurement:** {Tool used for coverage reports (e.g., Istanbul/nyc, Coverage.py, JaCoCo).}
- **Mocking/Stubbing Strategy (General):** {Beyond specific test types, outline general principles. e.g., "Prefer fakes or test doubles over extensive mocking where it improves test clarity and maintainability. Strive for tests that are fast, reliable, and isolated."}
- **Test Data Management:** {How is test data created, managed, and isolated? E.g., factories, fixtures, setup/teardown scripts, dedicated test data generation tools.}

## Security Best Practices

{Outline key security considerations relevant to the codebase. These are mandatory and must be actively addressed by the AI agent during development.}

- **Input Sanitization/Validation:** {Specify library/method for ALL external inputs (API requests, user-provided data, file uploads). E.g., 'Use class-validator with NestJS DTOs for all API inputs; all validation rules must be defined in DTOs.' For other languages, 'Use {validation_library} for all external inputs; define schemas and constraints.' Validation must occur at the boundary before processing.}
- **Output Encoding:** {Specify where and how output encoding should be performed to prevent XSS and other injection attacks. E.g., 'All dynamic data rendered in HTML templates must be contextually auto-escaped by the template engine (specify engine and confirm default behavior). If generating HTML/XML/JSON manually, use approved encoding libraries like {encoder_library_name}.'}
- **Secrets Management:** {Reference `docs/environment-vars.md` regarding storage for different environments. In code, access secrets _only_ through a designated configuration module/service. Never hardcode secrets, include them in source control, or log them. Use specific tools for local development if applicable (e.g., Doppler, .env files NOT committed).}
- **Dependency Security:** {Policy on checking for vulnerable dependencies. E.g., 'Run automated vulnerability scans (e.g., `npm audit`, `pip-audit`, Snyk, Dependabot alerts) as part of CI. Update vulnerable dependencies promptly based on severity.' Policy on adding new dependencies (vetting process).}
- **Authentication/Authorization Checks:** {Where and how should these be enforced? E.g., 'All API endpoints (except explicitly public ones) must enforce authentication using the central auth module/middleware. Authorization (permission/role checks) must be performed at the service layer or entry point for protected resources.' Define patterns for implementing these checks.}
- **Principle of Least Privilege (Implementation):** {e.g., 'Database connection users must have only the necessary permissions (SELECT, INSERT, UPDATE, DELETE) for the specific tables/schemas they access. IAM roles for cloud services must be narrowly scoped to the required actions and resources.'}
- **API Security (General):** {e.g., 'Enforce HTTPS. Implement rate limiting and throttling (specify tool/method). Use standard HTTP security headers (CSP, HSTS, X-Frame-Options, etc. - specify which ones and their configuration). Follow REST/GraphQL security best practices.'}
- **Error Handling & Information Disclosure:** {Ensure error messages do not leak sensitive information (stack traces, internal paths, detailed SQL errors) to the end-user. Log detailed errors server-side, provide generic messages or error IDs to the client.}
- **Regular Security Audits/Testing:** {Mention if planned, e.g., penetration testing, static/dynamic analysis tool usage in CI (SAST/DAST).}
- **{Other relevant practices, e.g., File upload security, Session management security, Data encryption at rest and in transit beyond HTTPS if specific requirements exist.}**

## Key Reference Documents

{ if any }

## Change Log

| Change | Date | Version | Description | Author |
| ------ | ---- | ------- | ----------- | ------ |

--- Below, Prompt for Design Architect (If Project has UI) To Produce Front End Architecture ----
