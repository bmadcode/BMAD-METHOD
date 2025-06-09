# Enterprise Architecture Consultant (IDE Version)

## Persona Activation

To activate the Enterprise Architecture Consultant persona in your IDE environment, use one of the following commands:

```
/bmad activate enterprise-architecture-consultant
/bmad persona enterprise-architect
/bmad eac
```

## Available Commands

### Enterprise Architecture Assessment

```
/bmad eac assess-architecture [system-name]
```
Evaluates the current architecture against enterprise standards and provides recommendations for alignment.

```
/bmad eac identify-arch-debt
```
Analyzes the codebase to identify architectural debt and modernization opportunities.

```
/bmad eac tech-alignment-analysis
```
Assesses how well the current technology stack aligns with business strategy and enterprise standards.

### Technology Strategy Development

```
/bmad eac create-tech-roadmap
```
Generates a technology roadmap aligned with business objectives and industry trends.

```
/bmad eac develop-reference-architecture [domain]
```
Creates a reference architecture for a specific domain or capability.

```
/bmad eac establish-arch-principles
```
Defines architecture principles and standards tailored to the project context.

### Solution Architecture Design

```
/bmad eac design-scalable-architecture [component]
```
Designs a scalable, resilient architecture for a specified component or system.

```
/bmad eac create-integration-architecture
```
Develops an integration architecture for connecting enterprise systems.

```
/bmad eac legacy-migration-strategy [system-name]
```
Creates a strategy for migrating legacy systems to modern architecture.

### Architecture Governance

```
/bmad eac setup-arch-review-process
```
Establishes an architecture review process with templates and guidelines.

```
/bmad eac define-compliance-requirements
```
Defines architecture compliance requirements based on enterprise standards.

```
/bmad eac create-adr [decision-topic]
```
Creates an Architecture Decision Record (ADR) for a specific architectural decision.

### Enterprise Pattern Implementation

```
/bmad eac apply-integration-pattern [pattern-name]
```
Applies a specific enterprise integration pattern to the current architecture.

```
/bmad eac implement-scalability-pattern [pattern-name]
```
Implements a scalability or resilience pattern in the current architecture.

```
/bmad eac design-cross-cutting-solution [concern]
```
Designs a solution for a cross-cutting concern like logging, monitoring, or authentication.

## Integration with IDE Tools

The Enterprise Architecture Consultant integrates with IDE tools through:

- **Code Analysis**: Evaluates architecture patterns and adherence to enterprise standards
- **Visualization**: Generates architecture diagrams and models
- **Documentation**: Creates architecture documentation and decision records
- **Refactoring**: Suggests architectural refactoring to align with enterprise patterns
- **Validation**: Checks compliance with enterprise architecture standards

## Usage Examples

### Assessing Current Architecture

```
/bmad eac assess-architecture payment-processing
```

This will analyze the payment processing system architecture and provide:
- Alignment with enterprise standards
- Architectural strengths and weaknesses
- Recommendations for improvement
- Compliance gaps with enterprise requirements

### Creating a Reference Architecture

```
/bmad eac develop-reference-architecture microservices
```

This will generate a reference architecture for microservices including:
- Service boundaries and communication patterns
- Data consistency approaches
- Deployment and scaling strategies
- Monitoring and observability recommendations
- Security and resilience considerations

### Implementing an Enterprise Pattern

```
/bmad eac apply-integration-pattern api-gateway
```

This will provide guidance on implementing an API Gateway pattern:
- Architecture diagram of the pattern
- Implementation considerations
- Code examples for the chosen technology stack
- Integration with existing systems
- Testing and validation approaches
```
