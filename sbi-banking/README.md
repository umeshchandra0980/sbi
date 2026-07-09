# SBI Online Banking Portal — Full Stack

A production-ready full-stack clone of the SBI Online Banking portal built with **FastAPI + Next.js 14 + PostgreSQL + Redis**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query |
| Backend | FastAPI, SQLAlchemy, Alembic, Pydantic v2 |
| Database | PostgreSQL 16 |
| Cache / Sessions | Redis 7 |
| Auth | JWT (Access + Refresh tokens), OTP via Redis |
| DevOps | Docker Compose, multi-stage builds |

---

## Features

### Auth Flow (3-Page SBI Flow)
- Landing page (Personal vs Corporate Banking)
- Pre-login security page
- Login page with CAPTCHA + OTP 2FA
- JWT access token + refresh token
- Account lockout after 5 failed attempts

### Customer Portal
- **Dashboard** — Account summary, balance, recent transactions
- **My Accounts** — All linked accounts with details
- **Fund Transfer** — NEFT/RTGS/IMPS with OTP confirmation
- **Transactions** — Full history with filters (date, type, amount, search)
- **Statements** — Period-based statements with download
- **Settings** — Change password, profile, security info

### Admin Panel
- Stats dashboard (users, balances, transactions, transfers)
- User management — search, lock/unlock accounts
- All transactions view

---

## Quick Start (Docker — Recommended)

```bash
# 1. Clone / extract the project
cd sbi-banking

# 2. One-command setup
./setup.sh

# 3. Open browser
# Frontend:  http://localhost:3000
# API Docs:  http://localhost:8000/api/docs
```

---

## Manual Setup (Local Dev)

### Prerequisites
- Python 3.12+
- Node.js 20+
- PostgreSQL 16
- Redis 7

### Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure env
cp ../.env.example ../.env
# Edit .env — set DATABASE_URL and REDIS_URL

# Run migrations
alembic upgrade head

# Seed demo data
python -m app.db.seed

# Start server
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy env
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start dev server
npm run dev
```

---

## Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `Admin@SBI123` |
| Customer | `rahul.sharma` | `Rahul@1234` |
| Customer | `priya.singh` | `Priya@1234` |

> **Demo OTP:** The OTP is returned in the login response during development. In production, configure SMS gateway.

---

## API Reference

Full interactive docs at `http://localhost:8000/api/docs`

### Key Endpoints

```
POST   /api/v1/auth/login           — Step 1: username/password → session_token
POST   /api/v1/auth/verify-otp      — Step 2: OTP → JWT tokens
POST   /api/v1/auth/refresh         — Refresh access token
GET    /api/v1/dashboard/           — Dashboard summary
GET    /api/v1/accounts/            — List user accounts
GET    /api/v1/transactions/{id}    — Account transactions (paginated, filtered)
POST   /api/v1/transfers/initiate   — Initiate transfer → OTP
POST   /api/v1/transfers/confirm    — Confirm transfer with OTP
GET    /api/v1/admin/stats          — Admin: platform statistics
GET    /api/v1/admin/users          — Admin: user management
```

---

## Project Structure

```
sbi-banking/
├── docker-compose.yml
├── .env.example
├── setup.sh
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── api/v1/endpoints/    # Route handlers
│   │   │   ├── auth.py
│   │   │   ├── accounts.py
│   │   │   ├── transactions.py
│   │   │   ├── transfers.py
│   │   │   ├── dashboard.py
│   │   │   └── admin.py
│   │   ├── core/
│   │   │   ├── config.py        # Settings (pydantic-settings)
│   │   │   └── security.py      # JWT, bcrypt, OTP
│   │   ├── db/
│   │   │   ├── session.py       # SQLAlchemy engine
│   │   │   ├── redis.py         # Redis client + helpers
│   │   │   └── seed.py          # Demo data seeder
│   │   ├── models/models.py     # All SQLAlchemy models
│   │   ├── schemas/schemas.py   # All Pydantic schemas
│   │   └── services/            # Business logic layer
│   └── alembic/                 # DB migrations
│
└── frontend/
    └── src/
        ├── app/
        │   ├── auth/            # Landing, Security, Login
        │   ├── dashboard/       # Dashboard + layout
        │   ├── accounts/        # Accounts list
        │   ├── transactions/    # Transaction history
        │   ├── transfers/       # Fund transfers
        │   ├── statements/      # Account statements
        │   ├── admin/           # Admin panel
        │   └── settings/        # User settings
        ├── components/layout/   # SBIHeader, SBIFooter, etc.
        ├── lib/api.ts           # Axios API client
        ├── lib/utils.ts         # Currency/date formatters
        └── store/authStore.ts   # Zustand auth state
```

---

## Environment Variables

See `.env.example` for full list. Key ones:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `SECRET_KEY` | JWT signing key (min 32 chars) |
| `ADMIN_PASSWORD` | Default admin password |

---

## Production Checklist

- [ ] Change all passwords in `.env`
- [ ] Set `DEBUG=false`
- [ ] Use strong `SECRET_KEY` (32+ chars, random)
- [ ] Configure HTTPS / reverse proxy (nginx)
- [ ] Integrate real SMS gateway for OTP
- [ ] Set up database backups
- [ ] Configure `CORS_ORIGINS` to your domain only
- [ ] Set `docs_url=None` in `main.py` (already done when DEBUG=false)

---

## License

For educational / demonstration purposes only. Not affiliated with State Bank of India.
