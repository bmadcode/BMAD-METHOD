# Security Patterns and Best Practices

## Authentication & Authorization

### JWT Best Practices
- **Expiry**: Access tokens 15-30 minutes, refresh tokens 7-30 days
- **Algorithm**: Use RS256 for public/private key signing
- **Claims**: Include minimal necessary data (user_id, roles, exp)
- **Storage**: HttpOnly cookies for web, secure storage for mobile
- **Validation**: Always verify signature, expiry, and issuer

### OAuth 2.0 Implementation
- **PKCE**: Required for all public clients (SPAs, mobile)
- **State Parameter**: Prevent CSRF attacks
- **Scope Limitation**: Request minimal necessary permissions
- **Redirect URI**: Exact match validation, no wildcards

## Data Protection

### Encryption Standards
- **At Rest**: AES-256-GCM for data, RSA-4096 for keys
- **In Transit**: TLS 1.3 minimum, certificate pinning for mobile
- **Database**: Column-level encryption for PII
- **Backups**: Encrypted with separate key management

### Input Validation
- **Sanitization**: Use parameterized queries, escape HTML
- **File Uploads**: MIME type validation, virus scanning, size limits
- **Rate Limiting**: Per-IP, per-user, per-endpoint limits
- **Schema Validation**: JSON Schema or similar for API inputs

## API Security

### Common Vulnerabilities
1. **Injection**: SQL, NoSQL, Command, LDAP injection
2. **Broken Authentication**: Weak passwords, exposed credentials
3. **Sensitive Data Exposure**: Logs, error messages, debug info
4. **XML External Entities**: XXE attacks in XML processing
5. **Broken Access Control**: Privilege escalation, IDOR

### Security Headers
```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
Referrer-Policy: strict-origin-when-cross-origin
```

## Monitoring & Incident Response

### Security Logging
- **Authentication Events**: Login attempts, failures, lockouts
- **Authorization**: Access grants/denials, privilege changes
- **Data Access**: PII access, export operations
- **System Changes**: Configuration updates, user modifications

### Threat Detection
- **Anomaly Detection**: Unusual access patterns, location changes
- **Automated Response**: Account lockout, IP blocking
- **Alert Thresholds**: Failed login attempts, API rate violations
- **SIEM Integration**: Centralized log analysis and correlation
