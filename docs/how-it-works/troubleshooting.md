# BMAD Troubleshooting Guide

This comprehensive guide helps users diagnose and resolve common issues encountered while using the BMAD system.

## Quick Diagnostic Checklist

Before diving into specific issues, run through this quick checklist:

- [ ] Verify BMAD configuration files are present and valid
- [ ] Check network connectivity and API access
- [ ] Confirm persona permissions and access rights
- [ ] Validate template and checklist file integrity
- [ ] Review recent system logs for error messages

## Common Issues and Solutions

### 1. Persona Loading Issues

#### Symptom: Persona fails to load or respond

**Possible Causes:**
- Missing or corrupted persona configuration files
- Insufficient permissions
- Network connectivity issues
- Invalid persona syntax

**Solutions:**

1. **Verify Persona Files:**
   ```bash
   # Check if persona files exist
   ls -la bmad-agent/personas/
   
   # Validate persona syntax
   bmad validate-persona --persona=po
   ```

2. **Reset Persona Configuration:**
   ```bash
   # Backup current config
   cp bmad-config.yml bmad-config.yml.backup
   
   # Reset to default
   bmad reset-config --persona=po
   ```

3. **Check Permissions:**
   ```bash
   # Verify file permissions
   chmod 644 bmad-agent/personas/*.md
   ```

### 2. Template Generation Failures

#### Symptom: Templates fail to generate or produce incorrect output

**Possible Causes:**
- Missing template variables
- Corrupted template files
- Invalid template syntax
- Insufficient data context

**Solutions:**

1. **Validate Template Syntax:**
   ```bash
   # Check template validity
   bmad validate-template --template=prd-tmpl.md
   ```

2. **Debug Template Variables:**
   ```bash
   # List available variables
   bmad debug-template --template=prd-tmpl.md --show-vars
   ```

3. **Regenerate Template:**
   ```bash
   # Force template regeneration
   bmad generate --template=prd-tmpl.md --force
   ```

### 3. Checklist Validation Errors

#### Symptom: Checklists fail validation or show incorrect status

**Possible Causes:**
- Outdated checklist definitions
- Missing checklist dependencies
- Incorrect task mapping
- Data synchronization issues

**Solutions:**

1. **Update Checklists:**
   ```bash
   # Refresh checklist definitions
   bmad update-checklists
   ```

2. **Validate Checklist Mapping:**
   ```bash
   # Check task-to-checklist mapping
   bmad validate-mapping --checklist=po-master-checklist.md
   ```

3. **Reset Checklist State:**
   ```bash
   # Clear checklist cache
   bmad clear-cache --type=checklists
   ```

### 4. Integration Connection Issues

#### Symptom: External system integrations fail or timeout

**Possible Causes:**
- Network connectivity problems
- Authentication failures
- API rate limiting
- Service unavailability

**Solutions:**

1. **Test Connectivity:**
   ```bash
   # Test API endpoints
   bmad test-connection --service=github
   bmad test-connection --service=jira
   ```

2. **Refresh Authentication:**
   ```bash
   # Renew authentication tokens
   bmad auth-refresh --service=github
   ```

3. **Check Rate Limits:**
   ```bash
   # Monitor API usage
   bmad status --api-usage
   ```

### 5. Performance Issues

#### Symptom: Slow response times or system lag

**Possible Causes:**
- Large knowledge base files
- Inefficient queries
- Memory constraints
- Network latency

**Solutions:**

1. **Optimize Knowledge Base:**
   ```bash
   # Rebuild search index
   bmad rebuild-index
   
   # Compress knowledge base
   bmad optimize-kb
   ```

2. **Clear System Cache:**
   ```bash
   # Clear all caches
   bmad clear-cache --all
   ```

3. **Monitor System Resources:**
   ```bash
   # Check system performance
   bmad system-status --detailed
   ```

## Environment-Specific Issues

### IDE Environment Issues

#### VS Code / Cursor Integration

**Common Issues:**
- Extension not loading
- Configuration not recognized
- Syntax highlighting missing

**Solutions:**
1. Reinstall BMAD extension
2. Reload VS Code window
3. Check extension compatibility
4. Verify workspace settings

#### Command Line Issues

**Common Issues:**
- Command not found
- Permission denied
- Path configuration errors

**Solutions:**
1. Add BMAD to system PATH
2. Set proper file permissions
3. Verify installation directory
4. Check shell configuration

### Web Environment Issues

#### Browser Compatibility

**Common Issues:**
- Features not working in specific browsers
- JavaScript errors
- CSS rendering problems

**Solutions:**
1. Update to supported browser version
2. Clear browser cache and cookies
3. Disable conflicting extensions
4. Check JavaScript console for errors

#### Authentication Problems

**Common Issues:**
- Login failures
- Session timeouts
- Permission errors

**Solutions:**
1. Clear browser storage
2. Verify credentials
3. Check session configuration
4. Review user permissions

## Advanced Troubleshooting

### Log Analysis

#### Accessing Logs

```bash
# View recent logs
bmad logs --tail=100

# Filter by severity
bmad logs --level=error

# Export logs for analysis
bmad logs --export=bmad-logs.txt
```

#### Common Log Patterns

**Error Patterns to Look For:**
- `Authentication failed`: Check credentials and permissions
- `Template not found`: Verify template file paths
- `Network timeout`: Check connectivity and API status
- `Validation failed`: Review input data and formats

### System Diagnostics

#### Health Check

```bash
# Run comprehensive system check
bmad health-check --comprehensive

# Check specific components
bmad health-check --component=personas
bmad health-check --component=templates
bmad health-check --component=integrations
```

#### Performance Profiling

```bash
# Profile system performance
bmad profile --duration=60s

# Analyze memory usage
bmad profile --memory

# Check disk usage
bmad profile --disk
```

### Recovery Procedures

#### Configuration Recovery

```bash
# Backup current configuration
bmad backup-config --output=config-backup.tar.gz

# Restore from backup
bmad restore-config --input=config-backup.tar.gz

# Reset to factory defaults
bmad factory-reset --confirm
```

#### Data Recovery

```bash
# Recover corrupted knowledge base
bmad recover-kb --source=backup

# Rebuild search indices
bmad rebuild-indices --all

# Validate data integrity
bmad validate-data --comprehensive
```

## Getting Help

### Self-Service Resources

1. **Documentation**: Check the comprehensive documentation at `/docs/`
2. **FAQ**: Review frequently asked questions
3. **Community Forums**: Search community discussions
4. **Video Tutorials**: Watch step-by-step guides

### Support Channels

1. **GitHub Issues**: Report bugs and feature requests
2. **Community Discord**: Get help from other users
3. **Email Support**: Contact support team directly
4. **Professional Services**: Engage for complex implementations

### Reporting Issues

When reporting issues, include:

1. **System Information:**
   ```bash
   bmad system-info --export
   ```

2. **Error Logs:**
   ```bash
   bmad logs --level=error --last=24h --export
   ```

3. **Configuration Details:**
   ```bash
   bmad config-export --sanitized
   ```

4. **Reproduction Steps:**
   - Detailed steps to reproduce the issue
   - Expected vs. actual behavior
   - Screenshots or recordings if applicable

---

*Effective troubleshooting ensures smooth BMAD system operation and minimizes downtime.*
