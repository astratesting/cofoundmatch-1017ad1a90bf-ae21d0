# CoFoundMatch

CoFoundMatch is a lean MVP for real-time co-founder discovery. Founders can create profiles, swipe through candidates, match, chat, share pitch decks through authenticated URLs, download a pitch template, and upgrade to premium verification.

## Stack

- Frontend: Next.js 14 App Router, TypeScript, Tailwind CSS, Clerk auth, Supabase client
- Backend: FastAPI, SQLAlchemy, JWT auth, PostgreSQL
- Data model: `users`, `matches`, `pitch_decks`, `subscriptions`, plus `messages` for chat

## Features

- Landing page with founder-specific positioning and pricing
- Clerk-protected dashboard
- Swipe-style founder cards with compatibility scores
- Match list and chat UI
- Secure pitch deck room and live URL sharing API
- Freemium subscription API with premium verified profiles
- Pitch deck template metadata endpoint

## Quick start

```bash
cp .env.example .env
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Open `http://localhost:8000/docs`.

### Docker

```bash
docker compose up --build
```

## API overview

- `POST /auth/register` creates a user and free subscription
- `POST /auth/login` returns a bearer token
- `GET /auth/me` returns current profile
- `GET /api/profiles` lists swipe candidates
- `PUT /api/profile` updates founder profile
- `POST /api/swipes` records pass/like and creates matches on reciprocal likes
- `GET /api/matches` lists matched users
- `POST /api/pitch-decks` creates live share link
- `GET /api/pitch-decks/share/{access_token}` enforces auth-gated matched access
- `PUT /api/subscription` upgrades or downgrades tier
- `GET/POST /api/matches/{match_id}/messages` reads and sends chat messages

## Environment

Required production values:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `SECRET_KEY`

## Notes

The MVP uses Clerk for frontend auth as required by delivered frontend dependencies and JWT auth for backend API demo flows. Replace placeholder keys before production deployment.
