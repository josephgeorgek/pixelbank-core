# Testing Guide

## Corporate Internet Banking Login System

### Overview

This guide provides comprehensive testing instructions for the Corporate Internet Banking Login System. The testing covers frontend React components, backend API services, integration testing, and end-to-end user scenarios.

### Testing Architecture

```
Testing Strategy
├── Unit Testing
│   ├── Frontend (Jest + React Testing Library)
│   └── Backend (JUnit + Mockito)
├── Integration Testing
│   ├── API Testing (REST Assured)
│   └── Database Testing (H2 + TestContainers)
├── End-to-End Testing
│   ├── User Journey Testing (Cypress)
│   └── Cross-Browser Testing (Selenium Grid)
└── Performance Testing
    ├── Load Testing (JMeter)
    └── Security Testing (OWASP ZAP)
```

### Prerequisites

#### Frontend Testing Setup
```bash
# Required packages (already installed)
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev jest-environment-jsdom
```

#### Backend Testing Setup
```xml
<!-- Maven dependencies for testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
```

### Frontend Testing

#### Component Unit Tests

**Login Component Test Example:**
```typescript
// src/components/__tests__/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login Component', () => {
  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  test('renders login form with all required fields', () => {
    renderLogin();
    
    expect(screen.getByLabelText(/organisation id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    renderLogin();
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByText(/organisation id is required/i)).toBeInTheDocument();
      expect(screen.getByText(/user id is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('toggles password visibility', () => {
    renderLogin();
    
    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByLabelText(/toggle password visibility/i);
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('submits form with valid credentials', async () => {
    const mockLogin = jest.fn();
    renderLogin();
    
    fireEvent.change(screen.getByLabelText(/organisation id/i), {
      target: { value: 'TESTORG001' }
    });
    fireEvent.change(screen.getByLabelText(/user id/i), {
      target: { value: 'TESTUSER001' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Test123!@#' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        organisationId: 'TESTORG001',
        userId: 'TESTUSER001',
        password: 'Test123!@#'
      });
    });
  });
});
```

**Activation Wizard Test Example:**
```typescript
// src/components/__tests__/ActivateAccount.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActivateAccount from '../ActivateAccount';

describe('Account Activation', () => {
  test('displays correct step progression', () => {
    render(
      <MemoryRouter>
        <ActivateAccount />
      </MemoryRouter>
    );
    
    // Check initial step highlighting
    expect(screen.getByText('Verify number')).toHaveClass('text-foreground');
    
    // Check step completion indicators
    const stepNumbers = screen.getAllByRole('button');
    expect(stepNumbers[1]).toContainHTML('2'); // Current step
  });

  test('validates required fields before progression', async () => {
    render(
      <MemoryRouter>
        <ActivateAccount />
      </MemoryRouter>
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    expect(screen.getByText(/organisation id is required/i)).toBeInTheDocument();
    expect(screen.getByText(/user id is required/i)).toBeInTheDocument();
  });
});
```

#### Custom Hook Tests

**Form Validation Hook Test:**
```typescript
// src/hooks/__tests__/useFormValidation.test.ts
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../useFormValidation';

describe('useFormValidation Hook', () => {
  test('validates required fields', () => {
    const { result } = renderHook(() => 
      useFormValidation({
        organisationId: { required: true },
        userId: { required: true },
        password: { required: true, minLength: 8 }
      })
    );
    
    act(() => {
      result.current.validate({
        organisationId: '',
        userId: 'test',
        password: '123'
      });
    });
    
    expect(result.current.errors).toEqual({
      organisationId: 'Organisation ID is required',
      password: 'Password must be at least 8 characters'
    });
  });
});
```

#### Service Layer Tests

**API Service Test:**
```typescript
// src/services/__tests__/authService.test.ts
import { authService } from '../authService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login makes correct API call', async () => {
    const mockResponse = {
      data: {
        success: true,
        token: 'mock-jwt-token',
        user: { userId: 'TESTUSER001' }
      }
    };
    
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    
    const credentials = {
      organisationId: 'TESTORG001',
      userId: 'TESTUSER001',
      password: 'Test123!@#'
    };
    
    const result = await authService.login(credentials);
    
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/login', credentials);
    expect(result).toEqual(mockResponse.data);
  });

  test('handles login failure', async () => {
    const mockError = {
      response: {
        status: 401,
        data: { message: 'Invalid credentials' }
      }
    };
    
    mockedAxios.post.mockRejectedValueOnce(mockError);
    
    await expect(authService.login({
      organisationId: 'INVALID',
      userId: 'INVALID',
      password: 'invalid'
    })).rejects.toThrow('Invalid credentials');
  });
});
```

### Backend Testing

#### Controller Tests

**Authentication Controller Test:**
```java
// src/test/java/com/redbank/controller/AuthControllerTest.java
@WebMvcTest(AuthController.class)
class AuthControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private AuthService authService;
    
    @Test
    void loginWithValidCredentials() throws Exception {
        LoginRequest request = new LoginRequest("TESTORG001", "TESTUSER001", "Test123!@#");
        LoginResponse response = new LoginResponse(true, "jwt-token", new User());
        
        when(authService.authenticate(any(LoginRequest.class)))
            .thenReturn(response);
            
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.token").value("jwt-token"));
                
        verify(authService).authenticate(any(LoginRequest.class));
    }
    
    @Test
    void loginWithInvalidCredentials() throws Exception {
        LoginRequest request = new LoginRequest("INVALID", "INVALID", "invalid");
        
        when(authService.authenticate(any(LoginRequest.class)))
            .thenThrow(new InvalidCredentialsException("Invalid credentials"));
            
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpected(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Invalid credentials"));
    }
}
```

#### Service Layer Tests

**Authentication Service Test:**
```java
// src/test/java/com/redbank/service/AuthServiceTest.java
@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtTokenProvider tokenProvider;
    
    @InjectMocks
    private AuthServiceImpl authService;
    
    @Test
    void authenticateValidUser() {
        // Given
        LoginRequest request = new LoginRequest("TESTORG001", "TESTUSER001", "Test123!@#");
        User user = new User("TESTORG001", "TESTUSER001", "encoded-password");
        user.setAccountStatus(AccountStatus.ACTIVE);
        
        when(userRepository.findByOrganisationIdAndUserId("TESTORG001", "TESTUSER001"))
            .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("Test123!@#", "encoded-password"))
            .thenReturn(true);
        when(tokenProvider.createToken(user))
            .thenReturn("jwt-token");
            
        // When
        LoginResponse response = authService.authenticate(request);
        
        // Then
        assertThat(response.isSuccess()).isTrue();
        assertThat(response.getToken()).isEqualTo("jwt-token");
        verify(userRepository).updateLastLogin(user.getId());
    }
    
    @Test
    void authenticateLockedAccount() {
        // Given
        LoginRequest request = new LoginRequest("TESTORG001", "TESTUSER001", "Test123!@#");
        User user = new User("TESTORG001", "TESTUSER001", "encoded-password");
        user.setAccountStatus(AccountStatus.LOCKED);
        
        when(userRepository.findByOrganisationIdAndUserId("TESTORG001", "TESTUSER001"))
            .thenReturn(Optional.of(user));
            
        // When & Then
        assertThrows(AccountLockedException.class, () -> 
            authService.authenticate(request));
    }
}
```

#### Repository Tests

**User Repository Test:**
```java
// src/test/java/com/redbank/repository/UserRepositoryTest.java
@DataJpaTest
class UserRepositoryTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void findByOrganisationIdAndUserId() {
        // Given
        User user = new User("TESTORG001", "TESTUSER001", "password");
        entityManager.persistAndFlush(user);
        
        // When
        Optional<User> found = userRepository
            .findByOrganisationIdAndUserId("TESTORG001", "TESTUSER001");
            
        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getUserId()).isEqualTo("TESTUSER001");
    }
    
    @Test
    void incrementFailedLoginAttempts() {
        // Given
        User user = new User("TESTORG001", "TESTUSER001", "password");
        user = entityManager.persistAndFlush(user);
        
        // When
        userRepository.incrementFailedLoginAttempts(user.getId());
        entityManager.flush();
        entityManager.clear();
        
        // Then
        User updated = entityManager.find(User.class, user.getId());
        assertThat(updated.getFailedLoginAttempts()).isEqualTo(1);
    }
}
```

### Integration Testing

#### API Integration Tests

**End-to-End Authentication Flow:**
```java
// src/test/java/com/redbank/integration/AuthenticationFlowTest.java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:application-test.properties")
class AuthenticationFlowTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void completeLoginFlow() {
        // Setup test data
        User user = createTestUser();
        userRepository.save(user);
        
        // Test login
        LoginRequest request = new LoginRequest("TESTORG001", "TESTUSER001", "Test123!@#");
        ResponseEntity<LoginResponse> response = restTemplate.postForEntity(
            "/api/auth/login", request, LoginResponse.class);
            
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().isSuccess()).isTrue();
        assertThat(response.getBody().getToken()).isNotBlank();
        
        // Test token validation
        String token = response.getBody().getToken();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<String> validationResponse = restTemplate.exchange(
            "/api/auth/validate", HttpMethod.GET, entity, String.class);
            
        assertThat(validationResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
```

### End-to-End Testing

#### Cypress Test Examples

**Login Flow E2E Test:**
```typescript
// cypress/integration/login-flow.spec.ts
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('completes successful login', () => {
    cy.get('[data-testid="organisation-id"]').type('TESTORG001');
    cy.get('[data-testid="user-id"]').type('TESTUSER001');
    cy.get('[data-testid="password"]').type('Test123!@#');
    cy.get('[data-testid="login-button"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="user-welcome"]').should('contain', 'Welcome, TESTUSER001');
  });

  it('handles login failure correctly', () => {
    cy.get('[data-testid="organisation-id"]').type('INVALID');
    cy.get('[data-testid="user-id"]').type('INVALID');
    cy.get('[data-testid="password"]').type('invalid');
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="error-message"]').should('contain', 'Invalid credentials');
    cy.url().should('include', '/login');
  });

  it('navigates to password reset flow', () => {
    cy.get('[data-testid="reset-password-link"]').click();
    cy.url().should('include', '/reset-password');
    cy.get('[data-testid="wizard-step-1"]').should('be.visible');
  });
});
```

**Account Activation E2E Test:**
```typescript
// cypress/integration/account-activation.spec.ts
describe('Account Activation Flow', () => {
  it('completes full activation process', () => {
    cy.visit('/activate-account');
    
    // Step 1: Credentials
    cy.get('[data-testid="organisation-id"]').type('NEWORG001');
    cy.get('[data-testid="user-id"]').type('NEWUSER001');
    cy.get('[data-testid="next-button"]').click();
    
    // Step 2: Phone verification
    cy.get('[data-testid="verification-code"]').type('123456');
    cy.get('[data-testid="next-button"]').click();
    
    // Step 3: Password setup
    cy.get('[data-testid="new-password"]').type('NewPass123!');
    cy.get('[data-testid="confirm-password"]').type('NewPass123!');
    cy.get('[data-testid="next-button"]').click();
    
    // Step 4: Token activation
    cy.get('[data-testid="token-serial"]').type('TOKEN123456');
    cy.get('[data-testid="complete-button"]').click();
    
    cy.get('[data-testid="success-message"]').should('contain', 'Account activated successfully');
  });
});
```

### Performance Testing

#### Load Testing with JMeter

**Login Endpoint Load Test Plan:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2">
  <TestPlan>
    <elementProp name="TestPlan.arguments" elementType="Arguments"/>
    <stringProp name="TestPlan.user_defined_variables"/>
    <boolProp name="TestPlan.functional_mode">false</boolProp>
    
    <ThreadGroup>
      <stringProp name="ThreadGroup.num_threads">100</stringProp>
      <stringProp name="ThreadGroup.ramp_time">60</stringProp>
      <stringProp name="ThreadGroup.duration">300</stringProp>
      
      <HTTPSamplerProxy>
        <elementProp name="HTTPsampler.Arguments">
          <collectionProp name="Arguments.arguments">
            <elementProp name="" elementType="HTTPArgument">
              <boolProp name="HTTPArgument.always_encode">false</boolProp>
              <stringProp name="Argument.value">{"organisationId":"TESTORG001","userId":"TESTUSER001","password":"Test123!@#"}</stringProp>
            </elementProp>
          </collectionProp>
        </elementProp>
        <stringProp name="HTTPSampler.domain">localhost</stringProp>
        <stringProp name="HTTPSampler.port">8080</stringProp>
        <stringProp name="HTTPSampler.path">/api/auth/login</stringProp>
        <stringProp name="HTTPSampler.method">POST</stringProp>
      </HTTPSamplerProxy>
    </ThreadGroup>
  </TestPlan>
</jmeterTestPlan>
```

### Security Testing

#### OWASP ZAP Integration

**Automated Security Scan:**
```bash
# Run security scan against running application
docker run -t owasp/zap2docker-stable zap-baseline.py \
    -t http://localhost:3000 \
    -r security-report.html
```

### Test Data Management

#### Test User Accounts
```sql
-- test-data.sql
INSERT INTO users (organisation_id, user_id, password_hash, account_status, created_at) VALUES
('TESTORG001', 'TESTUSER001', '$2a$10$encrypted_password_hash', 'ACTIVE', NOW()),
('TESTORG001', 'LOCKEDUSER', '$2a$10$encrypted_password_hash', 'LOCKED', NOW()),
('NEWORG001', 'NEWUSER001', NULL, 'PENDING_ACTIVATION', NOW());

INSERT INTO organizations (organisation_id, name, status, created_at) VALUES
('TESTORG001', 'Test Organization 1', 'ACTIVE', NOW()),
('NEWORG001', 'New Organization 1', 'PENDING', NOW());
```

### Continuous Integration

#### GitHub Actions Test Pipeline
```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v2

  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-java@v2
        with:
          java-version: '17'
      - run: mvn test
      - run: mvn jacoco:report
      - uses: codecov/codecov-action@v2

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm ci
      - run: npm run build
      - run: npm run start:prod &
      - run: npx cypress run
```

### Test Execution Instructions

#### Running Frontend Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Login.test.tsx
```

#### Running Backend Tests
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=AuthServiceTest

# Run tests with coverage
mvn test jacoco:report

# Run integration tests only
mvn test -Dtest=**/*IntegrationTest
```

#### Running E2E Tests
```bash
# Run Cypress tests headlessly
npx cypress run

# Open Cypress test runner
npx cypress open

# Run specific test file
npx cypress run --spec "cypress/integration/login-flow.spec.ts"
```

### Test Reporting

#### Coverage Requirements
- Frontend: Minimum 80% code coverage
- Backend: Minimum 85% code coverage
- Integration: All critical user paths covered
- E2E: All major user journeys covered

#### Report Generation
```bash
# Generate comprehensive test report
npm run test:report

# Generate performance report
npm run test:performance

# Generate security report
npm run test:security
```

This comprehensive testing guide ensures the Corporate Internet Banking Login System meets all quality, security, and performance requirements through systematic testing at all levels.