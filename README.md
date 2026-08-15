# PREORBIT

> A modern, premium placement-preparation study platform for engineering students.

---

## Purpose

PREORBIT helps students prepare systematically for campus placements through:

- **Java DSA** — Topic-wise problems and solutions
- **Aptitude** — Quantitative, logical, and verbal practice
- **Core CS** — OS, DBMS, CN, OOP theory and quizzes
- **Chapter-wise Theory** — Structured notes per topic
- **Chapter-wise Tests** — Auto-evaluated MCQ tests
- **Progress Tracking** — Student dashboard with performance analytics

---

## Technology Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| Frontend   | Angular, TypeScript, Angular Router      |
| Backend    | Node.js, Express.js, REST API            |
| Database   | MongoDB (Mongoose)                       |
| Auth       | JWT (JSON Web Tokens)                    |
| Styling    | Component-scoped CSS, Glassmorphism      |

---

## Project Structure

```
PREORBIT/
├── frontend/          Angular application
├── backend/           Node.js + Express API
├── .gitignore
└── README.md
```

---

## Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Runs at: **http://localhost:4200**

---

## Backend Setup

```bash
cd backend
npm install
# Copy .env.example → .env and fill in values
cp .env.example .env
npm run dev
```

Runs at: **http://localhost:5000**

---

## Development Commands

| Task                | Command              |
|---------------------|----------------------|
| Start frontend      | `ng serve`           |
| Start backend (dev) | `npm run dev`        |
| Build frontend      | `ng build`           |
| Health check        | `GET /api/health`    |

---

## API Health Check

```
GET http://localhost:5000/api/health

Response:
{
  "success": true,
  "message": "PREORBIT API is running"
}
```

---

*PREORBIT — Built for serious placement preparation.*
