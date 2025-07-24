# Static Code Analysis Checklist

## Purpose
This checklist ensures code quality and security standards are met before marking any development task complete. It supplements the existing story-dod-checklist.md with specific static analysis requirements.

## Pre-Implementation Analysis
- [ ] Search codebase for similar implementations to follow established patterns
- [ ] Review relevant architecture documentation for the area being modified
- [ ] Identify potential security implications of the implementation
- [ ] Check for existing analyzer suppressions and understand their justification

## During Development
- [ ] Run analyzers frequently: `dotnet build -warnaserror`
- [ ] Address warnings immediately rather than accumulating technical debt
- [ ] Document any necessary suppressions with clear justification
- [ ] Follow secure coding patterns from the security guidelines

## Code Analysis Verification

### Security Analyzers
- [ ] No SQL injection vulnerabilities (CA2100, EF1002)
- [ ] No use of insecure randomness in production code (CA5394)
- [ ] No hardcoded credentials or secrets (CA5385, CA5387)
- [ ] No insecure deserialization (CA2326, CA2327)
- [ ] Proper input validation on all external data

### Performance Analyzers
- [ ] No unnecessary allocations in hot paths (CA1806)
- [ ] Proper async/await usage (CA2007, CA2008)
- [ ] No blocking on async code (CA2016)
- [ ] Appropriate collection types used (CA1826)

### Code Quality
- [ ] No dead code or unused parameters (CA1801)
- [ ] Proper IDisposable implementation (CA1063, CA2000)
- [ ] No empty catch blocks (CA1031)
- [ ] Appropriate exception handling (CA2201)

### Test-Specific
- [ ] xUnit analyzers satisfied (xUnit1000-xUnit2999)
- [ ] No test-specific suppressions without justification
- [ ] Test data generation uses appropriate patterns
- [ ] Integration tests don't expose security vulnerabilities

## Suppression Guidelines

### When Suppressions Are Acceptable
1. **Test Projects Only**:
   - Insecure randomness for test data (CA5394)
   - Simplified error handling in test utilities
   - Performance optimizations not needed in tests

2. **Legacy Code Integration**:
   - When refactoring would break backward compatibility
   - Documented with migration plan

### Suppression Requirements
```csharp
// Required format for suppressions:
#pragma warning disable CA5394 // Do not use insecure randomness
// Justification: Test data generation does not require cryptographic security
// Risk: None - test environment only
// Reviewed by: [Developer name] on [Date]
var random = new Random();
#pragma warning restore CA5394
```

## Verification Commands

### Full Analysis
```bash
# Run all analyzers with warnings as errors
dotnet build -warnaserror -p:RunAnalyzersDuringBuild=true

# Run specific analyzer categories
dotnet build -warnaserror -p:CodeAnalysisRuleSet=SecurityRules.ruleset
```

### Security Scan
```bash
# Run security-focused analysis
dotnet build -p:RunSecurityCodeAnalysis=true

# Generate security report
dotnet build -p:SecurityCodeAnalysisReport=security-report.sarif
```

### Pre-Commit Verification
```bash
# Add to git pre-commit hook
dotnet format analyzers --verify-no-changes
dotnet build -warnaserror --no-restore
```

## Integration with BMAD Workflow

### Dev Agent Requirements
1. Run static analysis before marking any task complete
2. Document all suppressions in code comments
3. Update story file with any technical debt incurred
4. Include analyzer results in dev agent record

### QA Agent Verification
1. Verify no new analyzer warnings introduced
2. Review all suppressions for appropriateness
3. Check for security anti-patterns
4. Validate performance characteristics

## Common Patterns and Solutions

### SQL in Tests
```csharp
// ❌ BAD: SQL injection risk
await context.Database.ExecuteSqlRawAsync($"DELETE FROM {table}");

// ✅ GOOD: Whitelist approach
private static readonly string[] AllowedTables = { "Users", "Orders" };
if (!AllowedTables.Contains(table)) throw new ArgumentException();
await context.Database.ExecuteSqlRawAsync($"DELETE FROM {table}");
```

### Test Data Generation
```csharp
// For test projects, add to .editorconfig:
[*Tests.cs]
dotnet_diagnostic.CA5394.severity = none

// Or use deterministic data:
var testData = Enumerable.Range(1, 100).Select(i => new TestEntity { Id = i });
```

### Async Best Practices
```csharp
// ❌ BAD: Missing ConfigureAwait
await SomeAsyncMethod();

// ✅ GOOD: Explicit ConfigureAwait
await SomeAsyncMethod().ConfigureAwait(false);
```

## Escalation Path
If you encounter analyzer warnings that seem incorrect or overly restrictive:
1. Research the specific rule documentation
2. Check if there's an established pattern in the codebase
3. Consult with tech lead before suppressing
4. Document decision in architecture decision records (ADR)

## References
- [Roslyn Analyzers Documentation](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview)
- [Security Code Analysis Rules](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/security-warnings)
- [xUnit Analyzer Rules](https://xunit.net/xunit.analyzers/rules/)
- Project-specific: `/docs/Architecture/coding-standards.md`