# Technical Documentation

## Corporate Internet Banking Login System

### API Overview

#### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/auth/login` | Authenticate user | `{organisationId, userId, password}` | `{success, token, user}` |
| POST | `/api/auth/refresh` | Refresh JWT token | `{refreshToken}` | `{token, expiresAt}` |
| POST | `/api/auth/logout` | Invalidate session | `{token}` | `{success}` |
| GET | `/api/auth/validate` | Validate current session | - | `{valid, user}` |

#### Account Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/activate` | Activate new account |
| POST | `/api/accounts/password-reset/initiate` | Start password reset |
| POST | `/api/accounts/password-reset/complete` | Complete password reset |
| POST | `/api/accounts/unlock` | Unlock locked account |

#### Support Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/support/fraud-report` | Report fraud |
| POST | `/api/support/block-account` | Block account access |
| GET | `/api/support/faq` | Get FAQ content |

### cURL Examples

**Login Request:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "TESTORG001",
    "userId": "TESTUSER001", 
    "password": "Test123!@#"
  }'
```

**Account Activation:**
```bash
curl -X POST http://localhost:8080/api/accounts/activate \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "NEWORG001",
    "userId": "NEWUSER001",
    "activationToken": "abc123"
  }'
```

### Test Users

| Organisation ID | User ID | Password | Status |
|----------------|---------|----------|--------|
| TESTORG001 | TESTUSER001 | Test123!@# | Active |
| TESTORG001 | LOCKEDUSER | Test123!@# | Locked |
| NEWORG001 | NEWUSER001 | - | Pending |