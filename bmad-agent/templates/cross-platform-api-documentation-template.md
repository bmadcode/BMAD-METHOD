---
template_id: "cross-platform-api-documentation"
template_name: "Cross-Platform API Documentation Template"
version: "1.0.0"
category: "persona"
personas: ["technical-documentation-architect", "cross-platform-integration-specialist"]
technologies: ["react", "typescript", "nodejs", "aspnet", "python"]
complexity: "intermediate"
estimated_time: "60-90 minutes"
dependencies: ["api-design", "technical-architecture"]
tags: ["api", "documentation", "cross-platform", "integration"]
---

# API Documentation: {{API_NAME}}

## API Overview
**API Name:** {{API_NAME}}  
**Version:** {{API_VERSION}}  
**Base URL:** {{BASE_URL}}  
**Protocol:** {{PROTOCOL}} (REST/GraphQL/gRPC)  
**Authentication:** {{AUTHENTICATION_TYPE}}  
**Last Updated:** {{LAST_UPDATED}}  

### Purpose
{{API_PURPOSE_DESCRIPTION}}

### Target Platforms
- **Frontend:** React/TypeScript applications
- **Backend:** Node.js, ASP.NET, Python services
- **Mobile:** React Native, native mobile apps
- **Third-Party:** External integrations

## Authentication

### Authentication Method
{{AUTHENTICATION_METHOD_DESCRIPTION}}

### Getting API Keys
{{API_KEY_INSTRUCTIONS}}

### Authentication Examples

#### React/TypeScript
\```typescript
// Authentication setup for React applications
const apiClient = axios.create({
  baseURL: '{{BASE_URL}}',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

#### Node.js
\```javascript
// Authentication setup for Node.js services
const fetch = require('node-fetch');

const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`{{BASE_URL}}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  return response.json();
};
```

#### ASP.NET
```csharp
// Authentication setup for ASP.NET services
public class ApiClient
{
    private readonly HttpClient _httpClient;
    
    public ApiClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(config["ApiBaseUrl"]);
        _httpClient.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", config["ApiToken"]);
    }
}
```

#### Python
```python
# Authentication setup for Python services
import requests

class ApiClient:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def make_request(self, endpoint, method='GET', data=None):
        url = f"{self.base_url}{endpoint}"
        return requests.request(method, url, headers=self.headers, json=data)
```

## API Endpoints

### {{ENDPOINT_CATEGORY_1}}

#### {{ENDPOINT_1_NAME}}
**Endpoint:** `{{ENDPOINT_1_METHOD}} {{ENDPOINT_1_PATH}}`  
**Description:** {{ENDPOINT_1_DESCRIPTION}}

##### Request Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| {{PARAM_1}} | {{PARAM_1_TYPE}} | {{PARAM_1_REQUIRED}} | {{PARAM_1_DESCRIPTION}} |
| {{PARAM_2}} | {{PARAM_2_TYPE}} | {{PARAM_2_REQUIRED}} | {{PARAM_2_DESCRIPTION}} |

##### Request Body
\```json
{
  "{{REQUEST_FIELD_1}}": "{{REQUEST_FIELD_1_TYPE}}",
  "{{REQUEST_FIELD_2}}": "{{REQUEST_FIELD_2_TYPE}}"
}
```

##### Response
\```json
{
  "{{RESPONSE_FIELD_1}}": "{{RESPONSE_FIELD_1_TYPE}}",
  "{{RESPONSE_FIELD_2}}": "{{RESPONSE_FIELD_2_TYPE}}",
  "metadata": {
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "{{API_VERSION}}"
  }
}
```

##### Platform-Specific Examples

###### React/TypeScript
\```typescript
interface {{ENDPOINT_1_NAME}}Request {
  {{REQUEST_FIELD_1}}: {{REQUEST_FIELD_1_TS_TYPE}};
  {{REQUEST_FIELD_2}}: {{REQUEST_FIELD_2_TS_TYPE}};
}

interface {{ENDPOINT_1_NAME}}Response {
  {{RESPONSE_FIELD_1}}: {{RESPONSE_FIELD_1_TS_TYPE}};
  {{RESPONSE_FIELD_2}}: {{RESPONSE_FIELD_2_TS_TYPE}};
  metadata: {
    timestamp: string;
    version: string;
  };
}

const {{ENDPOINT_1_FUNCTION_NAME}} = async (
  data: {{ENDPOINT_1_NAME}}Request
): Promise<{{ENDPOINT_1_NAME}}Response> => {
  const response = await apiClient.{{ENDPOINT_1_METHOD_LOWER}}('{{ENDPOINT_1_PATH}}', data);
  return response.data;
};
```

###### Node.js
\```javascript
const {{ENDPOINT_1_FUNCTION_NAME}} = async (requestData) => {
  try {
    const response = await apiCall('{{ENDPOINT_1_PATH}}', {
      method: '{{ENDPOINT_1_METHOD}}',
      body: JSON.stringify(requestData)
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

###### ASP.NET
```csharp
public class {{ENDPOINT_1_NAME}}Request
{
    public {{REQUEST_FIELD_1_CS_TYPE}} {{REQUEST_FIELD_1_PASCAL}} { get; set; }
    public {{REQUEST_FIELD_2_CS_TYPE}} {{REQUEST_FIELD_2_PASCAL}} { get; set; }
}

public class {{ENDPOINT_1_NAME}}Response
{
    public {{RESPONSE_FIELD_1_CS_TYPE}} {{RESPONSE_FIELD_1_PASCAL}} { get; set; }
    public {{RESPONSE_FIELD_2_CS_TYPE}} {{RESPONSE_FIELD_2_PASCAL}} { get; set; }
    public ApiMetadata Metadata { get; set; }
}

public async Task<{{ENDPOINT_1_NAME}}Response> {{ENDPOINT_1_FUNCTION_NAME}}Async({{ENDPOINT_1_NAME}}Request request)
{
    var response = await _httpClient.{{ENDPOINT_1_METHOD_PASCAL}}AsJsonAsync("{{ENDPOINT_1_PATH}}", request);
    return await response.Content.ReadFromJsonAsync<{{ENDPOINT_1_NAME}}Response>();
}
```

###### Python
```python
def {{ENDPOINT_1_FUNCTION_NAME}}(self, request_data):
    """
    {{ENDPOINT_1_DESCRIPTION}}
    
    Args:
        request_data (dict): Request payload
        
    Returns:
        dict: API response
    """
    try:
        response = self.make_request(
            '{{ENDPOINT_1_PATH}}',
            method='{{ENDPOINT_1_METHOD}}',
            data=request_data
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        raise
```

##### Error Responses
| Status Code | Description | Response Body |
|-------------|-------------|---------------|
| 400 | Bad Request | `{"error": "{{ERROR_400_MESSAGE}}", "code": "INVALID_REQUEST"}` |
| 401 | Unauthorized | `{"error": "{{ERROR_401_MESSAGE}}", "code": "UNAUTHORIZED"}` |
| 404 | Not Found | `{"error": "{{ERROR_404_MESSAGE}}", "code": "NOT_FOUND"}` |
| 500 | Server Error | `{"error": "{{ERROR_500_MESSAGE}}", "code": "INTERNAL_ERROR"}` |

## Data Models

### {{MODEL_1_NAME}}
\```json
{
  "{{MODEL_1_FIELD_1}}": "{{MODEL_1_FIELD_1_TYPE}}",
  "{{MODEL_1_FIELD_2}}": "{{MODEL_1_FIELD_2_TYPE}}",
  "{{MODEL_1_FIELD_3}}": {
    "{{NESTED_FIELD_1}}": "{{NESTED_FIELD_1_TYPE}}",
    "{{NESTED_FIELD_2}}": "{{NESTED_FIELD_2_TYPE}}"
  }
}
```

#### Platform-Specific Type Definitions

##### TypeScript
\```typescript
interface {{MODEL_1_NAME}} {
  {{MODEL_1_FIELD_1}}: {{MODEL_1_FIELD_1_TS_TYPE}};
  {{MODEL_1_FIELD_2}}: {{MODEL_1_FIELD_2_TS_TYPE}};
  {{MODEL_1_FIELD_3}}: {
    {{NESTED_FIELD_1}}: {{NESTED_FIELD_1_TS_TYPE}};
    {{NESTED_FIELD_2}}: {{NESTED_FIELD_2_TS_TYPE}};
  };
}
```

##### C# (ASP.NET)
```csharp
public class {{MODEL_1_NAME}}
{
    public {{MODEL_1_FIELD_1_CS_TYPE}} {{MODEL_1_FIELD_1_PASCAL}} { get; set; }
    public {{MODEL_1_FIELD_2_CS_TYPE}} {{MODEL_1_FIELD_2_PASCAL}} { get; set; }
    public {{MODEL_1_FIELD_3_NAME}} {{MODEL_1_FIELD_3_PASCAL}} { get; set; }
}

public class {{MODEL_1_FIELD_3_NAME}}
{
    public {{NESTED_FIELD_1_CS_TYPE}} {{NESTED_FIELD_1_PASCAL}} { get; set; }
    public {{NESTED_FIELD_2_CS_TYPE}} {{NESTED_FIELD_2_PASCAL}} { get; set; }
}
```

##### Python
```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class {{MODEL_1_FIELD_3_NAME}}:
    {{NESTED_FIELD_1}}: {{NESTED_FIELD_1_PY_TYPE}}
    {{NESTED_FIELD_2}}: {{NESTED_FIELD_2_PY_TYPE}}

@dataclass
class {{MODEL_1_NAME}}:
    {{MODEL_1_FIELD_1}}: {{MODEL_1_FIELD_1_PY_TYPE}}
    {{MODEL_1_FIELD_2}}: {{MODEL_1_FIELD_2_PY_TYPE}}
    {{MODEL_1_FIELD_3}}: {{MODEL_1_FIELD_3_NAME}}
```

## Rate Limiting

### Rate Limits
- **Requests per minute:** {{RATE_LIMIT_PER_MINUTE}}
- **Requests per hour:** {{RATE_LIMIT_PER_HOUR}}
- **Requests per day:** {{RATE_LIMIT_PER_DAY}}

### Rate Limit Headers
```
X-RateLimit-Limit: {{RATE_LIMIT_VALUE}}
X-RateLimit-Remaining: {{REMAINING_REQUESTS}}
X-RateLimit-Reset: {{RESET_TIMESTAMP}}
```

### Handling Rate Limits

#### React/TypeScript
\```typescript
const handleRateLimit = async (apiCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (error) {
    if (error.response?.status === 429) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      const waitTime = new Date(resetTime * 1000) - new Date();
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return await apiCall();
    }
    throw error;
  }
};
```

#### Node.js
\```javascript
const rateLimitRetry = async (apiCall, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const resetTime = error.headers['x-ratelimit-reset'];
        const waitTime = (resetTime * 1000) - Date.now();
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      throw error;
    }
  }
};
```

## Error Handling

### Error Response Format
\```json
{
  "error": {
    "code": "{{ERROR_CODE}}",
    "message": "{{ERROR_MESSAGE}}",
    "details": "{{ERROR_DETAILS}}",
    "timestamp": "{{ERROR_TIMESTAMP}}"
  }
}
```

### Common Error Codes
| Code | Description | Resolution |
|------|-------------|------------|
| INVALID_REQUEST | Request validation failed | Check request parameters and format |
| UNAUTHORIZED | Authentication failed | Verify API token and permissions |
| RATE_LIMITED | Too many requests | Implement rate limiting and retry logic |
| NOT_FOUND | Resource not found | Verify resource ID and availability |
| SERVER_ERROR | Internal server error | Contact API support |

## Testing

### Test Environment
**Base URL:** {{TEST_BASE_URL}}  
**Authentication:** {{TEST_AUTH_METHOD}}

### Postman Collection
{{POSTMAN_COLLECTION_LINK}}

### Integration Testing Examples

#### React Testing Library
\```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { {{ENDPOINT_1_FUNCTION_NAME}} } from './api';

jest.mock('./api');

test('should handle API response correctly', async () => {
  const mockResponse = { {{RESPONSE_FIELD_1}}: 'test' };
  ({{ENDPOINT_1_FUNCTION_NAME}} as jest.Mock).mockResolvedValue(mockResponse);
  
  render(<ComponentUsingAPI />);
  
  await waitFor(() => {
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

#### Node.js Testing
\```javascript
const request = require('supertest');
const app = require('../app');

describe('API Integration', () => {
  test('should return valid response', async () => {
    const response = await request(app)
      .{{ENDPOINT_1_METHOD_LOWER}}('{{ENDPOINT_1_PATH}}')
      .send({ {{REQUEST_FIELD_1}}: 'test' })
      .expect(200);
      
    expect(response.body).toHaveProperty('{{RESPONSE_FIELD_1}}');
  });
});
```

## SDK and Libraries

### Official SDKs
- **JavaScript/TypeScript:** {{JS_SDK_LINK}}
- **C#/.NET:** {{DOTNET_SDK_LINK}}
- **Python:** {{PYTHON_SDK_LINK}}

### Community Libraries
- **React Hooks:** {{REACT_HOOKS_LIBRARY}}
- **Vue.js Plugin:** {{VUE_PLUGIN_LIBRARY}}

## Changelog

### Version {{API_VERSION}}
- {{CHANGELOG_ITEM_1}}
- {{CHANGELOG_ITEM_2}}
- {{CHANGELOG_ITEM_3}}

### Migration Guide
{{MIGRATION_GUIDE_DESCRIPTION}}

## Support

### Documentation
- **API Reference:** {{API_REFERENCE_LINK}}
- **Tutorials:** {{TUTORIALS_LINK}}
- **Examples:** {{EXAMPLES_LINK}}

### Community
- **Developer Forum:** {{FORUM_LINK}}
- **Stack Overflow:** {{STACKOVERFLOW_TAG}}
- **GitHub Issues:** {{GITHUB_ISSUES_LINK}}

### Contact
- **Technical Support:** {{SUPPORT_EMAIL}}
- **Sales Inquiries:** {{SALES_EMAIL}}

---

## Template Usage Notes

### Variable Substitution Guide
Replace all `{{VARIABLE_NAME}}` placeholders with API-specific information.

### Customization Options
- Add additional endpoints as needed
- Include platform-specific optimizations
- Expand error handling sections
- Add more comprehensive examples

### Quality Validation Checklist
- [ ] All endpoints are documented with examples
- [ ] Platform-specific code examples are provided
- [ ] Error handling is comprehensive
- [ ] Authentication is clearly explained
- [ ] Rate limiting is documented
- [ ] Testing examples are included
- [ ] Data models are complete with type definitions

### Integration Points
- **BMAD Personas:** Technical Documentation Architect, Cross-Platform Integration Specialist
- **Follow-up Templates:** Integration Documentation Template
- **Quality Standards:** BMAD Method API documentation standards

---
**Template Version:** 1.0.0  
**Last Updated:** {{CURRENT_DATE}}  
**Template Owner:** BMAD Method Team
