# Headstone Previewer Backend API

Simple Express.js backend for the Headstone Previewer application.

## Setup

### Install dependencies
```bash
npm install
```

### Configure environment
Create/update `.env` with:

```bash
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/headstone_previewer?schema=public
ADMIN_EMAIL=you@example.com
```

### Run database migrations
```bash
npm run prisma:migrate -- --name init
```

### Run development server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/verify` - Verify token validity

### Projects
- `GET /api/projects` - Get all projects for authenticated user
- `GET /api/projects/:projectId` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

### Admin (admin role required)
- `GET /api/admin/overview` - KPIs for account/subscription/payment tracking
- `GET /api/admin/accounts` - Account list with project/payment totals
- `GET /api/admin/payments` - Recent payments list
- `POST /api/admin/subscriptions` - Upsert user subscription data
- `POST /api/admin/payments` - Create a payment record

## Authentication

Include JWT token in request headers:
```
Authorization: Bearer <token>
```

## Current Implementation

This backend now uses Prisma + PostgreSQL for persistence.

- Users are persisted by email during login
- A single admin account is assigned using `ADMIN_EMAIL`
- Projects are scoped per authenticated user
- The API keeps the 10 most recent projects per user
- Subscriptions and payments are persisted for admin reporting

### Useful Prisma commands
```bash
npm run prisma:generate
npm run prisma:migrate -- --name <migration_name>
npm run prisma:studio
```

If PostgreSQL is not running or `DATABASE_URL` is invalid, authenticated endpoints will return errors until the DB connection is fixed.
