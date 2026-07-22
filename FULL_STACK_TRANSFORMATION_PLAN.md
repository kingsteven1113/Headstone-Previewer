# Headstone Previewer: Full-Stack Transformation Plan

## Summary
The current Headstone Previewer is a strong front-end prototype for visualizing memorial designs. To turn it into a real business product for funeral homes, the next step is to evolve it from a demo-style experience into a subscription-based SaaS platform that helps funeral homes create, manage, and sell memorial designs.

## What the current app already does well
The existing app already demonstrates the core value proposition:
- A visual design tool for headstones
- Multiple material, color, and shape options
- A preview experience that feels interactive and persuasive
- A lead-capture flow that can become a customer-facing workflow

This is a solid foundation for a product that could be used by funeral homes, memorial designers, and stone suppliers.

## Recommended product direction
### Product idea
Turn the project into a B2B tool called something like:
- Headstone Previewer Pro
- Memorial Design Studio
- Funeral Home Design Platform

### Target customers
Primary customers should be:
- Funeral homes
- Memorial design consultants
- Stone and monument suppliers
- Cemetery sales teams

### Core value proposition
Funeral homes pay for a subscription to:
- Create polished memorial designs for families
- Save and reuse designs
- Share proposals with families
- Generate quotes and paperwork
- Manage customer-facing memorial workflows in one dashboard

## Suggested business model
### Subscription paywall strategy
The app should start as a gated experience rather than a free public tool.

Recommended tiers:
1. Free Trial
   - Limited number of design sessions
   - Basic templates
   - Watermarked exports or no export

2. Professional
   - Full design library access
   - Saved projects
   - Client sharing
   - Quote generation
   - Email support

3. Funeral Home/Enterprise
   - Multi-user accounts
   - Team dashboards
   - Branded client experience
   - Bulk quote tools
   - Priority support
   - CRM or API integrations

### Paywall approach
Use a soft paywall:
- Let visitors see a few designs for free
- Require account creation to save or share work
- Lock advanced features behind a paid plan
- Offer a 7-day trial so funeral homes can test before committing

## Recommended technical architecture
### Frontend
Keep the current React/Vite experience, but expand it into a real app shell.
Suggested stack:
- React + Vite
- React Router
- State management with Context or Zustand
- Form handling with React Hook Form
- Styled UI with a design system or component library

### Backend
Add a real backend so the app can support subscriptions and persistent data.
Suggested stack:
- Node.js + Express, or Next.js API routes
- PostgreSQL for structured data
- Prisma or Sequelize for database access
- JWT or auth sessions for login
- Stripe for subscriptions and payments
- Cloud storage such as S3 or Cloudinary for images and exports

### Authentication and roles
Implement role-based access control:
- Admin
- Funeral Home Manager
- Sales Representative
- Customer/Family Viewer

This is important because a funeral home may want multiple users inside one account.

## Data model suggestions
The app will need persistent entities such as:
- Users
- Funeral homes
- Subscriptions
- Projects
- Design versions
- Saved templates
- Quotes
- Customer inquiries
- Uploaded images and documents

## Must-have features for the paid product
### 1. User accounts and login
Every funeral home should have a secure account with saved work and billing history.

### 2. Saved projects
Users should be able to:
- Save designs
- Revisit previous versions
- Duplicate designs for new families
- Share a design link with a client

### 3. Premium design library
Move beyond a static preview experience and create a curated catalog of:
- Stone types
- Finishes
- Engraving styles
- Memorial templates
- Seasonal or premium package options

### 4. Quote generation
Add features to create downloadable or printable quotes and proposals.

### 5. Team collaboration
Funeral homes often operate as teams, so the app should support:
- Shared workspaces
- Team member invitations
- Permissions by role

### 6. Client-facing presentation mode
A polished presentation view could let staff show design options directly to families without exposing the admin tools.

### 7. Analytics and reporting
Track:
- Number of designs created
- Subscription usage
- Most popular stone options
- Conversion from preview to quote

## Suggested roadmap
### Phase 1: Foundation
Focus on the basics:
- Convert the current previewer into a logged-in experience
- Add project saving
- Create a backend API
- Set up PostgreSQL
- Add a basic admin panel

### Phase 2: Subscription billing
Implement:
- Stripe checkout
- Subscription plans
- Invoice history
- Trial period handling
- Usage limits by plan

### Phase 3: Business workflows
Add features that make the product useful for funeral homes:
- Quote builder
- Client sharing links
- Approval workflow
- Export to PDF
- Email notifications

### Phase 4: Growth and expansion
Expand into:
- Multi-location funeral home support
- White-label branding
- CRM integrations
- API access for partners
- Mobile-friendly workflows

## Suggested MVP for launch
If the goal is to launch quickly, build this first:
- Authentication
- Project save/load
- Paid subscription checkout
- Limited free demo access
- Admin dashboard
- Basic quote generation

This MVP would be enough to start selling to funeral homes while keeping the product focused.

## Marketing and sales positioning
The product should not be positioned as a generic headstone app. It should be framed as:
- A memorial design tool for funeral homes
- A way to improve family consultations
- A tool for presenting design options professionally
- A software platform that helps staff close more memorial orders efficiently

## Recommended launch strategy
1. Start with a small set of funeral homes or partner organizations
2. Offer a free trial with a short onboarding flow
3. Show how the tool helps staff create better family presentations
4. Charge a monthly or annual subscription once the value is clear
5. Expand to more advanced workflows after initial traction

## Risks to watch
- The product may feel too niche if it stays purely visual
- The app needs real business workflow value, not just pretty previews
- Billing setup must be simple and reliable
- The UI should feel polished enough for professional B2B use

## Final recommendation
The best path is to keep the current visual experience as the core product, but rebuild it around:
- real accounts
- saved projects
- subscriptions
- quotes and workflows
- team management

That approach will transform the project from an attractive front-end demo into a real SaaS product that funeral homes can pay for.
