# Job Board App
A full-stack job board with user authentication and job CRUD operations.

## Tech Stack
- Backend: Node.js, Express, MySQL, JWT
- Frontend: React
- Testing: Jest, Supertest

## Setup
1. Clone repo: `git clone <repo-url>`
2. Install backend: `npm install`
3. Setup `.env` (see `.env.example`)
4. Create MySQL database: `job_board`
5. Run backend: `npm start`
6. Install frontend: `cd frontend && npm install`
7. Run frontend: `npm start`

## API Endpoints
- `POST /api/auth/register`: Register a user
- `POST /api/auth/login`: Login and get token
- `GET /api/jobs`: Fetch all jobs (auth required)
- `POST /api/jobs`: Post a job (auth required)
- `PUT /api/jobs/:id`: Update a job (auth required)
- `DELETE /api/jobs/:id`: Delete a job (auth required)