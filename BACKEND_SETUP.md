# Backend Setup Complete ✅

## What Was Created

A basic Express.js API with the following structure:

```
backend/
├── middleware/
│   ├── auth.js (JWT token generation and verification)
│   └── errorHandler.js (Error handling middleware)
├── routes/
│   ├── auth.js (Login and token verification endpoints)
│   └── projects.js (CRUD operations for projects)
├── utils/
│   └── endpoints.js (API endpoint constants)
├── server.js (Main Express server)
├── package.json (Dependencies)
├── .env (Configuration)
└── README.md (Documentation)
```

## Getting Started

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
npm run dev
```
The API will run on `http://localhost:5000`

## API Endpoints

### Authentication
```
POST /api/auth/login
Body: { "email": "user@example.com" }
Response: { "token": "...", "user": { "email": "..." } }
```

### Projects (requires authentication token)
```
GET /api/projects
Authorization: Bearer <token>

POST /api/projects
Authorization: Bearer <token>
Body: { "title": "My Design", "type": "...", "color": "...", ... }

PUT /api/projects/:projectId
Authorization: Bearer <token>
Body: { "title": "Updated Name", ... }

DELETE /api/projects/:projectId
Authorization: Bearer <token>
```

## Next Steps: Integrate with Frontend

### 1. Update the Frontend's AuthContext
Modify `src/context/AuthContext.jsx` to use the backend API instead of localStorage for authentication

### 2. Create an API Client Service
Create a new file `src/utils/apiClient.js` with functions to:
- Login and store token
- Get projects from backend
- Create, update, delete projects

### 3. Update savedProjects.js
Replace localStorage calls with API calls to the backend

### 4. Update Environment Variables
Add to `Headstone Previewer/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

## Current Limitations

⚠️ **Important:** This backend uses in-memory storage. Data is lost when the server restarts.

To persist data, we need to integrate PostgreSQL in the next phase.

## To Run Both Frontend and Backend

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
cd "Headstone Previewer"
npm run dev
```

The frontend should now be able to communicate with the backend API on localhost:5000.
