# Corporate Banking Backend

Spring Boot backend for the Corporate Internet Banking Login System.

## Prerequisites
- Java 17+
- Maven 3.6+

## Local Development Setup

### 1. Clone and Navigate
```bash
git clone [repository-url]
cd corporate-banking-system/micro-service-backend
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Run Application
```bash
mvn spring-boot:run
```

### 4. Access Points
- **API Base URL**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/h2-console
- **Health Check**: http://localhost:8080/actuator/health (if actuator is added)

### 5. H2 Database Access
- **JDBC URL**: `jdbc:h2:mem:banking`
- **Username**: `sa`
- **Password**: (leave empty)

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Invalidate session
- `GET /api/auth/validate` - Validate current session

### Account Management
- `POST /api/accounts/activate` - Activate account
- `POST /api/accounts/password-reset/initiate` - Start password reset
- `POST /api/accounts/password-reset/complete` - Complete password reset
- `POST /api/accounts/unlock` - Unlock account

## Test Users

| Organisation ID | User ID | Password | Status |
|----------------|---------|----------|--------|
| TESTORG001 | TESTUSER001 | Test123!@# | Active |
| TESTORG001 | LOCKEDUSER | Test123!@# | Locked |
| NEWORG001 | NEWUSER001 | - | Pending |

## Testing

### Run Unit Tests
```bash
mvn test
```

### Run Integration Tests
```bash
mvn test -Dtest="*IntegrationTest"
```

### Generate Test Coverage Report
```bash
mvn jacoco:report
```

## cURL Examples

### Login Request
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "TESTORG001",
    "userId": "TESTUSER001",
    "password": "Test123!@#"
  }'
```

### Account Activation
```bash
curl -X POST http://localhost:8080/api/accounts/activate \
  -H "Content-Type: application/json" \
  -d '{
    "organisationId": "NEWORG001",
    "userId": "NEWUSER001"
  }'
```

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite frontend)
- `http://localhost:3000` (Alternative frontend port)

## Production Notes

For production deployment:
1. Replace H2 with production database (PostgreSQL, MySQL)
2. Configure proper JWT secrets
3. Add Spring Security with proper authentication
4. Implement password hashing with BCrypt
5. Add rate limiting and security headers
6. Configure proper CORS for production domains