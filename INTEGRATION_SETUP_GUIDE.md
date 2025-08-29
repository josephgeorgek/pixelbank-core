# Corporate Banking System - Integration Setup Guide

## Overview
This guide explains how to run the complete Corporate Internet Banking System with Spring Boot backend and React frontend integration.

## Architecture
```
┌─────────────────────────────────────────┐
│             Frontend (React)            │
│          http://localhost:5173          │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      API Layer with Fallback    │   │
│  │  1. Try Backend (localhost:8080)│   │
│  │  2. Fallback to Mock Data       │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    │ HTTP Calls
                    ▼
┌─────────────────────────────────────────┐
│         Backend (Spring Boot)           │
│          http://localhost:8080          │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │            REST API             │   │
│  │      (/api/auth/*, /api/accounts/*) │   │
│  └─────────────────────────────────┘   │
│                    │                    │
│  ┌─────────────────────────────────┐   │
│  │         H2 Database             │   │
│  │     (In-Memory, Port 8080)      │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Quick Start

### Prerequisites
- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **Maven 3.6+** (for backend)

### 1. Start Backend (Terminal 1)
```bash
# Navigate to backend
cd micro-service-backend

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Backend will start on http://localhost:8080
# H2 Console: http://localhost:8080/h2-console
```

### 2. Start Frontend (Terminal 2)
```bash
# Navigate to frontend
cd micro-front-end

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will start on http://localhost:5173
```

### 3. Test Integration

#### With Backend Running:
1. Open http://localhost:5173
2. Try login with: `TESTORG001` / `TESTUSER001` / `Test123!@#`
3. Check browser console - should see "Attempting backend login"
4. Should get successful response from Spring Boot backend

#### Without Backend (Fallback Test):
1. Stop the Spring Boot backend (Ctrl+C in Terminal 1)
2. Refresh frontend and try login again
3. Check browser console - should see "Backend unavailable, using mock data"
4. Should still work using fallback mock data

## Detailed Setup

### Backend Setup

#### 1. Database Configuration
```properties
# H2 In-Memory Database (Auto-configured)
spring.datasource.url=jdbc:h2:mem:banking
spring.datasource.username=sa
spring.datasource.password=

# Access H2 Console at: http://localhost:8080/h2-console
```

#### 2. Test Data
The backend auto-loads test users:
| Organisation | User ID | Password | Status |
|-------------|---------|----------|--------|
| TESTORG001 | TESTUSER001 | Test123!@# | Active |
| TESTORG001 | LOCKEDUSER | Test123!@# | Locked |
| NEWORG001 | NEWUSER001 | - | Pending |

#### 3. API Endpoints
All endpoints available at `http://localhost:8080/api/`:
- `POST /auth/login` - User authentication
- `POST /accounts/activate` - Account activation
- `POST /accounts/password-reset/initiate` - Password reset
- `POST /accounts/unlock` - Unlock account

### Frontend Setup

#### 1. Environment Configuration
Create `micro-front-end/.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK_FALLBACK=true
```

#### 2. Fallback Strategy
The frontend automatically:
- **Primary**: Tries Spring Boot backend on localhost:8080
- **Fallback**: Uses existing mock data if backend unavailable
- **Transparent**: No UI changes, seamless fallback

## Testing Scenarios

### Scenario 1: Full Integration (Both Running)
```bash
# Terminal 1: Start backend
cd micro-service-backend && mvn spring-boot:run

# Terminal 2: Start frontend  
cd micro-front-end && npm run dev

# Test: Login should hit real backend API
```

### Scenario 2: Frontend Only (Fallback Mode)
```bash
# Terminal 1: Backend stopped
# Terminal 2: Frontend running
cd micro-front-end && npm run dev

# Test: Login should use mock data automatically
```

### Scenario 3: Backend Development
```bash
# Terminal 1: Run backend tests
cd micro-service-backend && mvn test

# Terminal 2: Check H2 database
# Visit: http://localhost:8080/h2-console
# JDBC URL: jdbc:h2:mem:banking
```

## Verification Steps

### 1. Backend Health Check
```bash
curl http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"organisationId":"TESTORG001","userId":"TESTUSER001","password":"Test123!@#"}'

# Expected: {"success":true,"token":"...","user":{...}}
```

### 2. Frontend Integration Check
1. Open browser developer tools (F12)
2. Go to http://localhost:5173
3. Try login with test credentials
4. Check Console tab for API call logs:
   - ✅ "Attempting backend login for: TESTORG001 TESTUSER001"
   - ✅ Network tab shows call to localhost:8080

### 3. Fallback Verification
1. Stop backend (Ctrl+C)
2. Try login again in frontend
3. Check Console tab for fallback logs:
   - ✅ "Backend unavailable, attempting fallback to mock data"
   - ✅ "Using mock login for: {organisationId: 'TESTORG001'...}"

## Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check Java version
java -version  # Should be 17+

# Check port 8080
lsof -i :8080  # Should be empty

# Clean Maven cache
mvn clean install -U
```

#### Frontend Can't Connect
```bash
# Check .env.local file exists
cat micro-front-end/.env.local

# Verify backend URL
curl http://localhost:8080/api/auth/login

# Check CORS in browser console
# Should NOT see CORS errors
```

#### CORS Errors
Backend is pre-configured for development CORS:
```java
// Allows: localhost:5173, localhost:3000
// Methods: GET, POST, PUT, DELETE, OPTIONS
// Headers: All headers allowed
```

### Debug Mode

#### Backend Debugging
```bash
# Run with debug logging
cd micro-service-backend
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"

# Connect IDE debugger to port 5005
```

#### Frontend Debugging
```bash
# Development mode includes source maps
cd micro-front-end
npm run dev

# Check browser Network tab for detailed request/response
```

## Production Notes

### For Production Deployment:

#### Backend:
- Replace H2 with PostgreSQL/MySQL
- Configure proper JWT secrets
- Add Spring Security
- Implement password hashing
- Configure production CORS domains

#### Frontend:
- Update `VITE_API_BASE_URL` to production backend URL
- Set `VITE_USE_MOCK_FALLBACK=false` for production
- Build: `npm run build`

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Verify all prerequisites are installed
3. Ensure ports 8080 and 5173 are available
4. Check browser console for detailed error messages
5. Verify environment configuration files