# Corporate Internet Banking Login System

A secure, pixel-perfect React + Spring Boot banking authentication system with comprehensive prelogin functionality.

## 🚀 Quick Start

**Prerequisites:** Node.js 18+, Java 17+, Maven

```bash
# Clone and install
git clone <repository-url>
cd corporate-internet-banking-login

# Install frontend dependencies
cd micro-front-end
npm install

# Start development servers
npm run dev:all  # Runs both frontend and backend
```

**Access:** http://localhost:5173

## 📋 Features

### ✨ **Pixel-Perfect UI**
- 🎨 Redbank corporate branding with orange/red gradients
- 📱 Responsive design (mobile → desktop)
- ♿ WCAG accessibility compliant
- 🌐 Multi-language support (SG locale)

### 🔐 **Authentication Flows**
- 🏠 **Primary Login** - Organization ID, User ID, Password
- 🆕 **Account Activation** - 4-step wizard with email verification
- 🔑 **Password Reset** - Multi-factor identity verification
- 🆘 **Help System** - Fraud reporting, FAQ, live support

### 🛡️ **Security Features**
- JWT token authentication
- Account lockout protection
- Multi-factor authentication ready
- Comprehensive audit logging
- HTTPS/TLS encryption

## 🏗️ Architecture

```
Repository Structure:
corporate-internet-banking-login/
├── docs/                    # 📚 Complete documentation
├── micro-front-end/         # ⚛️  React + Vite + TypeScript
├── micro-service/           # ☕ Spring Boot + H2 Database
└── README.md
```

## 🖥️ Frontend Tech Stack
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** components  
- **React Router** for navigation
- **Axios** for HTTP client
- **Jest** + **React Testing Library**

## ⚙️ Backend Tech Stack
- **Spring Boot 3** + **Java 17**
- **Spring Security** + **JWT**
- **H2 Database** (in-memory with seed data)
- **JUnit 5** + **Mockito**

## 🎯 Test Users

| Organisation ID | User ID | Password | Status |
|----------------|---------|----------|--------|
| TESTORG001 | TESTUSER001 | Test123!@# | ✅ Active |
| TESTORG001 | LOCKEDUSER | Test123!@# | 🔒 Locked |
| NEWORG001 | NEWUSER001 | - | ⏳ Pending |

## 🔧 Development Commands

```bash
# Frontend only
cd micro-front-end
npm run dev          # Development server (:5173)
npm run build        # Production build
npm test            # Run tests
npm run test:coverage # Test coverage

# Backend only  
cd micro-service
mvn spring-boot:run  # Development server (:8080)
mvn test            # Run tests
mvn package         # Build JAR

# Full stack
npm run dev:all     # Both servers with CORS configured
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User authentication |
| POST | `/api/accounts/activate` | Account activation |
| POST | `/api/accounts/password-reset/initiate` | Password reset |
| POST | `/api/support/fraud-report` | Report fraud |
| GET | `/api/health` | System health check |

## 📖 Documentation

Comprehensive docs in `/docs/`:
- 📋 [Functional Specification](docs/functional-specification.md)
- 🔄 [System Workflows](docs/swimlane-flowchart.puml) 
- 👤 [Frontend User Stories](docs/comprehensive-frontend-user-stories.md)
- 🔧 [Backend User Stories](docs/comprehensive-backend-user-stories.md)
- ✅ [Test Cases](docs/functional-test-cases.md)
- 🧪 [Testing Guide](docs/testing-guide.md)
- 🏛️ [Architecture Diagrams](docs/architecture-diagrams.md)

## 🔒 Security & Compliance

- ✅ HTTPS/TLS encryption
- ✅ JWT token authentication  
- ✅ Account lockout protection
- ✅ Audit trail logging
- ✅ CORS configuration
- ✅ Input validation & sanitization

## ⚡ Performance

- 📊 Page load time: < 3 seconds
- 🏃 Time to interactive: < 5 seconds  
- 📱 Mobile-optimized with lazy loading
- 🔄 Progressive web app ready

---

**🏦 Built for Enterprise Banking Security** | **📱 Mobile-First Design** | **♿ Accessibility Ready**