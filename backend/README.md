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
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_...
STRIPE_PRICE_STUDIO_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_CHECKOUT_SUCCESS_URL=http://localhost:5173/dashboard?billing=success
STRIPE_CHECKOUT_CANCEL_URL=http://localhost:5173/dashboard?billing=cancelled
STRIPE_PORTAL_RETURN_URL=http://localhost:5173/dashboard
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

### Billing (authenticated)
- `GET /api/billing/plans` - Account tier catalog + Stripe readiness
- `GET /api/billing/subscription` - Current user's subscription record
- `POST /api/billing/checkout-session` - Create Stripe Checkout session for a plan
- `POST /api/billing/portal-session` - Create Stripe customer portal session

### Billing (webhook)
- `POST /api/billing/webhook` - Stripe webhook endpoint (raw body, signature verified)

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
- Stripe webhook events sync subscription status and payment records

## Stripe Tier Setup

1. Create monthly recurring prices in Stripe for each paid tier.
2. Copy each `price_...` ID into the matching environment variable.
3. Run database migration so Stripe identifiers can be stored:

```bash
npm run prisma:migrate
```

4. Start the backend and expose webhook locally (Stripe CLI example):

```bash
stripe listen --forward-to localhost:5000/api/billing/webhook
```

5. Paste the returned signing secret into `STRIPE_WEBHOOK_SECRET`.

### Windows PATH-safe Stripe commands

If `stripe` is not recognized in your terminal, use the bundled npm scripts:

```bash
npm run stripe:whoami
npm run stripe:login
npm run stripe:listen
```

These scripts call the installed Stripe executable directly and avoid PATH issues.

### Useful Prisma commands
```bash
npm run prisma:generate
npm run prisma:migrate -- --name <migration_name>
npm run prisma:studio
```

If PostgreSQL is not running or `DATABASE_URL` is invalid, authenticated endpoints will return errors until the DB connection is fixed.
