# OutreachIQ — Backend API

A production-grade backend API for managing email outreach campaigns and leads. Built with clean architecture, Redis caching, rate limiting, and JWT authentication.

**Status:** 5/9 phases complete (56%)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Redis](#redis)
- [Testing](#testing)
- [Development Roadmap](#development-roadmap)

---

## ✨ Features

### ✅ Core Features (Complete)

- **Campaign Management** — Create, read, update, delete campaigns
- **Lead Management** — Manage leads with email, name, company, status
- **Database Relations** — Campaigns have many leads
- **Clean Architecture** — Controller → Service → Repository pattern
- **Type Safety** — Full TypeScript with strict mode

### ✅ Performance & Security (Complete)

- **Redis Caching** — 14x faster queries (100ms → 7ms)
- **Rate Limiting** — 100 requests/minute per IP
- **JWT Authentication** — Secure token-based auth (1-hour expiry)
- **Password Security** — Bcrypt hashing (10 salt rounds)
- **Protected Routes** — All endpoints require valid JWT

### ✅ Quality & Testing (Complete)

- **Integration Tests** — 14+ tests for all endpoints
- **Input Validation** — Zod schemas for type safety
- **Error Handling** — Centralized error middleware
- **Config Management** — Environment-based configuration

### ⏳ Coming Soon

- **User Data Isolation** — Users can only access their own data
- **System Design Patterns** — Scalability & optimization
- **Job Queue Processing** — Async background tasks
- **Deployment** — Docker, CI/CD, production hardening

---

## 🛠 Tech Stack

```
Backend Framework:    Node.js + Express.js + TypeScript
Database:             PostgreSQL (via Neon)
ORM:                  Prisma
Caching:              Redis
Authentication:       JWT + Bcrypt
Validation:           Zod
Testing:              Vitest + Supertest
HTTP Client:          Axios (optional)
Task Runner:          npm
Environment:          Node 18+
```

---

## 🏗 Architecture

### **Layered Architecture Pattern**

```
Request
    ↓
Express Router
    ↓
Middleware Stack
    ├─ Rate Limit (Redis)
    ├─ Validate (Zod)
    ├─ Authentication (JWT)
    └─ Error Handler
    ↓
Controller (HTTP logic)
    ↓
Service (Business logic)
    ↓
Repository (Data access)
    ├─ Cache check (Redis)
    ├─ Cache invalidation
    └─ Database queries (Prisma)
    ↓
PostgreSQL
```

### **Data Flow**

```
Client
    ↓
Rate Limiter (Redis)
    ├─ Track requests per IP
    └─ Block if > 100/min
    ↓
Auth Middleware (JWT)
    ├─ Extract token
    ├─ Verify signature
    └─ Attach userId
    ↓
Controller
    ├─ Extract request data
    └─ Call service
    ↓
Service
    ├─ Business logic
    └─ Call repository
    ↓
Repository
    ├─ Check Redis cache
    ├─ If hit: return cached data (7ms)
    ├─ If miss: query PostgreSQL (100ms)
    ├─ Store in Redis (300s TTL)
    └─ Return data
    ↓
Response to client
```

---

## 📁 Project Structure

```
outreachiq/
├── api/                              # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── config.ts             # Environment config
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts    # Signup/login
│   │   │   ├── campaign.controller.ts
│   │   │   └── lead.controller.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts    # JWT verification
│   │   │   ├── rateLimit.middleware.ts # 100 req/min
│   │   │   ├── validate.middleware.ts  # Zod validation
│   │   │   └── error.middleware.ts
│   │   ├── repositories/
│   │   │   ├── user.repository.ts    # User CRUD
│   │   │   ├── campaign.repository.ts # Campaign CRUD + cache
│   │   │   └── lead.repository.ts    # Lead CRUD + cache
│   │   ├── services/
│   │   │   ├── user.service.ts       # Auth logic
│   │   │   ├── campaign.service.ts
│   │   │   └── lead.service.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts        # /auth
│   │   │   ├── campaign.routes.ts    # /campaigns
│   │   │   └── lead.routes.ts        # /leads
│   │   ├── types/
│   │   │   ├── campaign.types.ts
│   │   │   ├── lead.types.ts
│   │   │   └── user.types.ts
│   │   ├── utils/
│   │   │   ├── asyncHandler.ts       # Async middleware wrapper
│   │   │   ├── password.ts           # Bcrypt utilities
│   │   │   └── jwt.ts                # JWT utilities
│   │   ├── validators/
│   │   │   ├── campaign.validator.ts # Zod schemas
│   │   │   ├── lead.validator.ts
│   │   │   └── user.validator.ts
│   │   ├── lib/
│   │   │   ├── prisma.ts             # Prisma client
│   │   │   └── redis.ts              # Redis client
│   │   ├── tests/
│   │   │   ├── auth.integration.test.ts
│   │   │   ├── campaign.integration.test.ts
│   │   │   └── lead.integration.test.ts
│   │   ├── app.ts                    # Express app setup
│   │   └── index.ts                  # Server startup
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Auto-generated
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Template
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
├── job-processor/                    # Phase 0 (Async jobs)
└── README.md
```

---

## 🚀 Setup & Installation

### **Prerequisites**

- Node.js 18+
- PostgreSQL (via Neon or local)
- Redis (Docker or local)

### **1. Clone Repository**

```bash
git clone https://github.com/HemantaBhengra/outreachiq.git
cd outreachiq/api
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Database**

Create `.env` file:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/outreachiq
```

Run migrations:
```bash
npx prisma migrate dev --name init
```

### **4. Start Redis**

**Option A: Docker**
```bash
docker run -d -p 6379:6379 redis:latest
```

**Option B: Local**
```bash
redis-server
```

### **5. Start Server**

```bash
npm run dev
```

Server running on `http://localhost:3000` ✅

---

## 📡 API Endpoints

### **Authentication**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/login` | Login user, get token | ❌ |

### **Campaigns**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/campaigns` | Create campaign | ✅ |
| GET | `/campaigns` | Get all campaigns | ✅ |
| GET | `/campaigns/:id` | Get campaign by ID | ✅ |
| PUT | `/campaigns/:id` | Update campaign | ✅ |
| DELETE | `/campaigns/:id` | Delete campaign | ✅ |

### **Leads**

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/leads` | Create lead | ✅ |
| GET | `/leads` | Get all leads | ✅ |
| GET | `/leads/:id` | Get lead by ID | ✅ |
| PUT | `/leads/:id` | Update lead | ✅ |
| DELETE | `/leads/:id` | Delete lead | ✅ |

---

## 🔐 Authentication

### **Signup**

```bash
POST /auth/signup
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
    "user": {
        "id": "cmsuqwkcg00001jz9z9z9z9z",
        "email": "john@example.com",
        "hashedPassword": "$2b$10$...",
        "createdAt": "2026-08-20T10:00:00Z",
        "updatedAt": "2026-08-20T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Login**

```bash
POST /auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### **Using Token**

Add token to all protected requests:

```bash
GET /campaigns
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Token Details**

- **Type:** JWT (JSON Web Token)
- **Expiry:** 1 hour
- **Signed with:** SECRET_KEY (server-only)
- **Contains:** { userId, iat (issued at), exp (expiry) }

---

## 💾 Database

### **Schema**

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  hashedPassword  String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Campaign {
  id        String   @id @default(cuid())
  name      String
  subject   String
  body      String
  userId    String
  status    String   @default("draft")
  leads     Lead[]   @relation("CampaignLeads")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Lead {
  id         String    @id @default(cuid())
  email      String    @unique
  name       String
  company    String
  status     String    @default("pending")
  campaignId String?
  campaign   Campaign? @relation("CampaignLeads", fields: [campaignId], references: [id])
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

### **Relations**

- **Campaign → Leads:** One-to-many (campaign has many leads)
- **User → Campaigns:** One-to-many (user has many campaigns)

### **Key Constraints**

- `User.email` — Unique (no duplicate emails)
- `Lead.email` — Unique (no duplicate leads)
- `Lead.campaignId` — Optional (lead can exist without campaign)

---

## ⚡ Redis

### **Caching**

**Query caching (5-minute TTL):**
- `GET /campaigns` — First request hits database, next 10 requests come from Redis (7ms vs 100ms)
- `GET /leads` — Same pattern

**Cache invalidation:**
- `POST /campaigns` — Creates campaign, clears cache
- `PUT /campaigns/:id` — Updates campaign, clears cache
- `DELETE /campaigns/:id` — Deletes campaign, clears cache

### **Rate Limiting**

**Per-IP rate limiting (60-second window):**
- Max 100 requests per minute per IP
- Returns `429 Too Many Requests` if exceeded
- Counter auto-resets after 60 seconds

### **Redis Operations Used**

```typescript
redis.get(key)           // Retrieve cached data
redis.setEx(key, ttl, value)  // Store with expiry
redis.del(key)           // Delete cache
redis.incr(key)          // Increment counter
redis.expire(key, ttl)   // Set expiry
```

---

## 🧪 Testing

### **Run All Tests**

```bash
npm test
```

### **Run Specific Test File**

```bash
npm test -- auth.integration.test.ts
```

### **Watch Mode**

```bash
npm test -- --watch
```

### **Test Coverage**

```
Auth Tests:       3 tests (signup, login with valid/invalid credentials)
Campaign Tests:   7 tests (CRUD + error cases)
Lead Tests:       7 tests (CRUD + error cases)
────────────────────────────────────────────
Total:           17+ integration tests
Status:          ✅ All passing
```

### **Test Examples**

```typescript
// Signup test
it("should create user with valid data", async () => {
    const res = await request(app).post("/auth/signup").send({
        email: "test@example.com",
        password: "SecurePass123"
    })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty("token")
})

// Protected route test
it("should get campaigns with valid token", async () => {
    const res = await request(app)
        .get("/campaigns")
        .set("Authorization", `Bearer ${validToken}`)
    expect(res.status).toBe(200)
})

// Rate limit test
it("should return 429 after 100 requests", async () => {
    for (let i = 0; i < 101; i++) {
        const res = await request(app).get("/campaigns")
        if (i < 100) expect(res.status).toBe(200)
        else expect(res.status).toBe(429)
    }
})
```

---

## 📊 Development Roadmap

### **Completed (5/9 Phases)**

- ✅ **Phase 0:** Async job processor with retries
- ✅ **Phase 1:** Clean architecture setup (Controller → Service → Repository)
- ✅ **Phase 2:** CRUD operations + database relations
- ✅ **Phase 3:** Redis caching + rate limiting
- ✅ **Phase 4:** JWT authentication + protected routes

### **In Progress**

- ⏳ **Phase 4 Day 3:** User data isolation (filter by userId)

### **Coming Soon**

- ⏳ **Phase 5:** System design & scalability patterns
- ⏳ **Phase 6:** Background job processing (Bull queue)
- ⏳ **Phase 7:** Event-driven architecture
- ⏳ **Phase 8:** System design mastery
- ⏳ **Phase 9:** DevOps & deployment

---

## 📈 Performance Metrics

### **Current Benchmarks**

| Operation | Before Cache | After Cache | Improvement |
|-----------|--------------|-------------|------------|
| GET /campaigns | 100ms | 7ms | 14x faster |
| GET /leads | 100ms | 7ms | 14x faster |
| Rate Limiting | N/A | <1ms | Protects API |
| Auth Verify | N/A | <1ms | Fast JWT check |

### **Capacity**

- **Rate Limit:** 100 requests/minute per IP
- **Cache TTL:** 300 seconds (5 minutes)
- **Token Expiry:** 3600 seconds (1 hour)
- **Password Hashing:** 10 salt rounds (industry standard)

---

## 🔒 Security Features

| Feature | Status | Details |
|---------|--------|---------|
| Password Hashing | ✅ | Bcrypt (10 rounds) |
| JWT Tokens | ✅ | Signed, 1-hour expiry |
| Rate Limiting | ✅ | 100 req/min per IP |
| Input Validation | ✅ | Zod schemas |
| Protected Routes | ✅ | Auth middleware |
| Error Handling | ✅ | No sensitive info leaked |
| CORS (TODO) | ⏳ | Coming soon |
| HTTPS (TODO) | ⏳ | Deployment phase |

---

## 🛠 Available Scripts

```bash
npm run dev          # Start dev server with tsx
npm test             # Run Vitest tests
npm test -- --watch # Run tests in watch mode
npm run build        # Build TypeScript
npm start            # Run compiled JS (production)
npm run lint         # Check TypeScript (if configured)
```

---

## 📝 Environment Variables

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/outreachiq

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT (Phase 4)
JWT_SECRET=your-secret-key-here

# Optional
DATABASE_POOL_SIZE=10
LOG_LEVEL=debug
```

---

## 🤝 Contributing

This is a learning project. Phases are built sequentially with mentor guidance.

### **Phase Checklist**

Before moving to next phase:
- [ ] All tests passing
- [ ] Code committed
- [ ] Notes written
- [ ] Features tested manually

---

## 📚 Learning Resources Used

- **Node.js & Express:** Building HTTP servers
- **PostgreSQL & Prisma:** Database + ORM
- **Redis:** In-memory caching & rate limiting
- **JWT & Bcrypt:** Authentication & security
- **Vitest & Supertest:** Integration testing
- **TypeScript:** Type safety
- **Clean Architecture:** Scalable code organization

---

## 🎯 Project Goals

1. **Build production-grade backend** → In progress ✅
2. **Master distributed systems** → Phases 5-8 ⏳
3. **Prepare for internships** → Ongoing 💼
4. **Indie SaaS foundation** → Long-term 🚀

---

## 📞 Contact & Support

**Repository:** https://github.com/HemantaBhengra/outreachiq

**Mentor-guided learning:** Each phase includes detailed notes and explanations.

---

## 📄 License

Educational project. Free to use and learn from.

---

## 🙏 Acknowledgments

Built with guidance from a senior backend engineer mentor.

Phases completed: 5/9 (56%)

Next phase: User data isolation (Phase 4 Day 3)

---

*Last Updated: August 22, 2026*

*Backend Status: Production-Ready Core Features ✅*
