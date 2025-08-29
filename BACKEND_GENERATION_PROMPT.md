# SPRING BOOT BACKEND + FRONTEND INTEGRATION PROMPT

## CRITICAL INSTRUCTIONS
- Create backend in `micro-service-backend/` folder (new directory)
- Modify frontend to call backend with fallback to existing mock data
- DO NOT modify existing frontend business logic or UI components
- Handle CORS on both backend and frontend sides

## BACKEND REQUIREMENTS

### 1. Project Structure (Create in micro-service-backend/)
```
micro-service-backend/
├── pom.xml
├── src/main/java/com/banking/
│   ├── BankingApplication.java
│   ├── config/WebConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── AccountController.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Organization.java
│   │   └── AuthSession.java
│   ├── model/
│   │   ├── LoginRequest.java
│   │   ├── LoginResponse.java
│   │   ├── ActivateAccountRequest.java
│   │   └── ResetPasswordRequest.java
│   ├── services/
│   │   ├── AuthService.java
│   │   └── AccountService.java
│   └── services/impl/
│       ├── AuthServiceImpl.java
│       └── AccountServiceImpl.java
├── src/main/resources/
│   ├── application.properties
│   └── data.sql
└── src/test/java/com/banking/
    ├── controller/
    ├── services/
    └── integration/
```

### 2. Maven Dependencies (pom.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.banking</groupId>
    <artifactId>corporate-banking-backend</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

### 3. Application Properties
```properties
server.port=8080
spring.application.name=corporate-banking-backend

# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:banking
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

### 4. Required API Endpoints (Match existing technical docs)
- POST `/api/auth/login` - {organisationId, userId, password} → {success, token, user}
- POST `/api/auth/refresh` - {refreshToken} → {token, expiresAt}
- POST `/api/auth/logout` - {token} → {success}
- GET `/api/auth/validate` → {valid, user}
- POST `/api/accounts/activate` - {organisationId, userId} → {success}
- POST `/api/accounts/password-reset/initiate` - {organisationId, userId} → {success}
- POST `/api/accounts/password-reset/complete` - {token, password} → {success}
- POST `/api/accounts/unlock` - {organisationId, userId} → {success}

### 5. Test Data (data.sql)
Include test users from docs:
- TESTORG001/TESTUSER001/Test123!@# (Active)
- TESTORG001/LOCKEDUSER/Test123!@# (Locked)
- NEWORG001/NEWUSER001 (Pending)

## FRONTEND MODIFICATIONS

### 1. Create API Service with Fallback Strategy
Modify `micro-front-end/src/api/http.ts`:
- Try real backend first (localhost:8080)
- On network error, fallback to existing mock data
- Use axios interceptors for automatic fallback
- DO NOT change existing mock implementations - use them as fallback

### 2. Environment Configuration
Create `micro-front-end/.env.local`:
```
VITE_API_BASE_URL=http://localhost:8080
VITE_USE_MOCK_FALLBACK=true
```

### 3. Fallback Logic Pattern
```typescript
const callAPI = async (endpoint: string, data: any) => {
  try {
    // Try real backend
    const response = await httpClient.post(`/api${endpoint}`, data);
    return response.data;
  } catch (error) {
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNREFUSED') {
      console.log('Backend unavailable, using mock data');
      // Fallback to existing mock implementation
      return mockService[endpoint](data);
    }
    throw error;
  }
};
```

## SETUP INSTRUCTIONS

### Backend Setup
1. Navigate to micro-service-backend folder
2. Run: `mvn clean install`
3. Run: `mvn spring-boot:run`
4. Access H2 Console: http://localhost:8080/h2-console
5. API available at: http://localhost:8080/api

### Frontend Setup  
1. Navigate to micro-front-end folder
2. Install dependencies: `npm install`
3. Create .env.local with backend URL
4. Run: `npm run dev`
5. Access frontend: http://localhost:5173

### Testing Integration
1. Start backend first (localhost:8080)
2. Start frontend (localhost:5173) 
3. Test login - should call backend
4. Stop backend, test again - should use mock data
5. Restart backend - should resume backend calls

## SUCCESS CRITERIA
✅ Backend runs independently on localhost:8080
✅ All API endpoints return proper JSON responses  
✅ CORS configured for development
✅ H2 database accessible and populated with test data
✅ Frontend calls backend when available
✅ Frontend falls back to mock data when backend unavailable
✅ No existing frontend functionality broken
✅ Clear setup and testing instructions provided

## IMPORTANT CONSTRAINTS
- DO NOT modify existing UI components or layouts
- DO NOT change existing routing or navigation logic  
- DO NOT alter existing state management
- ONLY modify API layer and add fallback logic
- Keep all existing mock data intact for fallback use
- Maintain exact same request/response formats