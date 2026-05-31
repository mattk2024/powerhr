# NomandTax

Open source HR management system.

## Stack

- **Backend**: Python + FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + TypeScript + Vite

## Quick Start

1. Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

2. Start the stack:

```bash
docker compose up -d
```

Backend API docs at http://localhost:8000/docs
Frontend at http://localhost:5173

### Running locally (without Docker)

```bash
cd backend
cp .env.example .env      # edit with your local DB creds
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

```bash
cd frontend
npm install
npm run dev
```

### Running tests

```bash
cd backend
TEST_DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/nandt_test pytest
```

### Running migrations

```bash
cd backend
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/nandt alembic upgrade head
```

## Project Structure

```
├── backend/          # FastAPI application
│   ├── app/
│   │   ├── api/      # API route handlers
│   │   ├── models/   # SQLAlchemy ORM models
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   └── core/     # Security, dependencies, config
│   └── tests/
└── frontend/         # React SPA
    └── src/
        ├── api/      # API client
        ├── pages/    # Route pages
        ├── components/ # Shared components
        └── types/    # TypeScript types
```

## License

MIT
