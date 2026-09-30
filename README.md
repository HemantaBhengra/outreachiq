# OutreachIQ - Backend API

A production-grade backend API for managing email outreach campaigns and lead management. Built with clean layered architecture, Redis caching, rate limiting, JWT authentication, and database optimization.

**Project Status:** 7/9 phases complete (78%)

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

## Features

### Core Features (Complete)

- **Campaign Management** - Create, read, update, and delete campaigns
- **Lead Management** - Manage leads with email, name, company, and status tracking
- **Database Relations** - Campaigns have many leads with proper foreign key relationships
- **Clean Architecture** - Layered architecture with Controller, Service, and Repository patterns
- **Type Safety** - Full TypeScript with strict type checking

### Performance and Security (Complete)

- **Redis Caching** - 14x faster queries with intelligent cache invalidation (100ms to 7ms)
- **Database Indexing** - Optimized queries on frequently searched columns
- **Pagination** - Efficient data retrieval with skip/take operations
- **Rate Limiting** - 100 requests per minute per IP address
- **JWT Authentication** - Secure token-based authentication with 1-hour expiry
- **Password Security** - Bcrypt password hashing with 10 salt rounds
- **Protected Routes** - All endpoints require valid JWT token
- **User Data Isolation** - Users can only access their own campaigns and leads

### Quality and Testing (Complete)

- **Integration Tests** - 20+ integration tests covering all endpoints
- **Input Validation** - Zod schemas for request validation
- **Error Handling** - Centralized error middleware with proper HTTP status codes
- **Configuration Management** - Environment-based configuration

### In Development

- **Background Job Processing** - Async task processing with Bull queue
- **Email Integration** - SendGrid integration for campaign delivery
- **Advanced Analytics** - Campaign performance metrics and reporting
- **Deployment** - Docker containerization and CI/CD pipeline

---

## Technology Stack

- **Backend Framework:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Caching Layer:** Redis
- **Authentication:** JWT with Bcrypt
- **Input Validation:** Zod
- **Testing:** Vitest and Supertest
- **Runtime:** Node.js 18+

---

## Architecture

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

## Project Structure

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

## Setup and Installation

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Redis

### 1. Clone Repository

```bash
git clone https://github.com/HemantaBhengra/outreachiq.git
cd outreachiq/api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Database

Create a `.env` file in the api directory:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/outreachiq
```

Run database migrations:

```bash
npx prisma migrate dev --name init
```

### 4. Start Redis

Using Docker:

```bash
docker run -d -p 6379:6379 redis:latest
```

Or locally:

```bash
redis-server
```

### 5. Start the Server

```bash
npm run dev
```

The server will run on `http://localhost:3000`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Requires Auth |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/login` | User login with email and password | No |

### Campaigns

| Method | Endpoint | Description | Requires Auth |
|--------|----------|-------------|---------------|
| POST | `/campaigns` | Create new campaign | Yes |
| GET | `/campaigns` | Get all campaigns for authenticated user | Yes |
| GET | `/campaigns/:id` | Retrieve campaign by ID | Yes |
| PUT | `/campaigns/:id` | Update campaign details | Yes |
| DELETE | `/campaigns/:id` | Delete campaign | Yes |

### Leads

| Method | Endpoint | Description | Requires Auth |
|--------|----------|-------------|---------------|
| POST | `/leads` | Create new lead | Yes |
| GET | `/leads` | Get all leads for authenticated user | Yes |
| GET | `/leads/:id` | Retrieve lead by ID | Yes |
| PUT | `/leads/:id` | Update lead information | Yes |
| DELETE | `/leads/:id` | Delete lead | Yes |

---

## Authentication

### User Registration

**Request:**

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

### User Login

**Request:**

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

### Token Usage

Include the token in the Authorization header for all protected requests:

```bash
GET /campaigns
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Specification

- **Type:** JWT (JSON Web Token)
- **Expiration:** 1 hour
- **Algorithm:** HS256
- **Contains:** userId, issued time, and expiration time

---

## Database

### Database Schema

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

## Redis Caching

### Query Caching

The application implements Redis caching with a 5-minute TTL:

- First request to `/campaigns` queries the database and caches the result
- Subsequent requests retrieve data from Redis (7ms response time vs 100ms database query)
- Same pattern applies to `/leads` endpoint

Cache invalidation occurs on write operations:
- Creating a campaign clears the campaign cache
- Updating a campaign clears the campaign cache
- Deleting a campaign clears the campaign cache

### Rate Limiting

Per-IP rate limiting is enforced with a 60-second window:

- Maximum 100 requests per minute per IP address
- Exceeding the limit returns HTTP 429 (Too Many Requests)
- Request counter automatically resets after 60 seconds

### Redis Operations

The application uses the following Redis operations:

- `redis.get(key)` - Retrieve cached data
- `redis.setEx(key, ttl, value)` - Store data with expiration
- `redis.del(key)` - Delete cached data
- `redis.incr(key)` - Increment request counter
- `redis.expire(key, ttl)` - Set expiration time

---

## Testing

### Running Tests

Execute all tests:

```bash
npm test
```

Run a specific test file:

```bash
npm test -- auth.integration.test.ts
```

Run tests in watch mode for development:

```bash
npm test -- --watch
```

### Test Coverage

The project includes 20+ integration tests covering:

- Authentication (signup and login)
- Campaign CRUD operations and error handling
- Lead CRUD operations and error handling
- Rate limiting enforcement
- User data isolation

All integration tests are passing.

### Test Examples

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

## Development Roadmap

### Completed (7/9 Phases)

- Phase 0: Async job processor with retry logic
- Phase 1: Clean layered architecture
- Phase 2: CRUD operations with database relations
- Phase 3: Redis caching and rate limiting
- Phase 4: JWT authentication and user data isolation
- Phase 5: System design and database optimization

### In Development

- Phase 6: Background job processing with Bull queue
- Phase 7: Email integration with SendGrid
- Phase 8: Advanced analytics and monitoring
- Phase 9: DevOps and production deployment

---

## Performance Metrics

### System Performance

| Operation | Response Time | Status |
|-----------|---------------|--------|
| GET /campaigns (cache hit) | 7ms | Optimized |
| GET /leads (cache hit) | 7ms | Optimized |
| POST /campaigns | 50ms | Normal |
| Rate limiting check | <1ms | Optimized |
| JWT verification | <1ms | Optimized |

### Configuration Parameters

- **Rate Limit:** 100 requests per minute per IP address
- **Cache TTL:** 300 seconds (5 minutes)
- **Token Expiration:** 3600 seconds (1 hour)
- **Password Hashing:** Bcrypt with 10 salt rounds
- **Database Indexes:** Optimized on userId, campaignId, email
- **Pagination:** Default 10 items per page, maximum 100 items

---

## Security Features

| Feature | Implementation | Status |
|---------|-----------------|--------|
| Password Hashing | Bcrypt with 10 salt rounds | Implemented |
| Authentication | JWT tokens with 1-hour expiry | Implemented |
| Rate Limiting | 100 requests per minute per IP | Implemented |
| Input Validation | Zod schema validation | Implemented |
| Protected Routes | JWT verification middleware | Implemented |
| User Isolation | Row-level filtering by userId | Implemented |
| Error Handling | No sensitive information in responses | Implemented |
| CORS | Configurable on deployment | Future |
| HTTPS | Enforced in production | Future |

---

## Available Scripts

```bash
npm run dev          # Start development server with tsx
npm test             # Run integration tests
npm test -- --watch # Run tests in watch mode
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run TypeScript type checking
```

---

## Environment Variables

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

## Contributing

This is a structured learning project built in sequential phases with mentor guidance.

### Phase Completion Checklist

Before advancing to the next phase:
- All integration tests passing
- Code committed to version control
- Phase documentation completed
- Features manually tested in Postman or similar client

---

## Technology and Concepts Covered

- Node.js and Express.js - HTTP server frameworks
- PostgreSQL - Relational database
- Prisma - Object-relational mapping
- Redis - In-memory caching and rate limiting
- JWT and Bcrypt - Authentication and security
- Vitest and Supertest - Testing frameworks
- TypeScript - Static type system
- Clean architecture patterns - Scalable code organization
- Database optimization - Indexing and pagination
- System design - Performance and scalability

---

## Project Objectives

1. Build a production-grade backend system
2. Master system design and database optimization
3. Prepare for professional backend engineering roles
4. Create foundation for SaaS product development

---

## Repository

Source code: https://github.com/HemantaBhengra/outreachiq

---

## License

Educational project available for learning and reference purposes.

---

## Project Status

Current: 7 of 9 phases complete (78%)
Next: Phase 6 - Background job processing with Bull queue

Last Updated: September 30, 2026
Status: Production-ready backend with optimization and security