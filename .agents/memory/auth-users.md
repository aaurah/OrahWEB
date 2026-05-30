---
name: Auth & User Storage
description: Users must be stored in PostgreSQL, not in-memory; in-memory array breaks login after signup across Next.js module instances
---

Users are stored in the `orahweb_users` PostgreSQL table, managed via `artifacts/orahweb/lib/db.ts`.

**Why:** Next.js runs each API route (`/api/register` and `/api/auth/[...nextauth]`) in separate module instances. An in-memory array updated in one route is invisible to another — so signup always worked but login always failed for new accounts.

**How to apply:** Any user lookup or creation must go through `findUserByEmail()`, `createUser()`, or `getAllUsers()` from `lib/db.ts`. Never use the old `registeredUsers` array from `lib/users.ts`.

Admin credentials seeded on first boot: `admin@orahweb.com` / `OrahAdmin2025!`

NEXTAUTH_SECRET is set as a shared env var. API_BASE_URL=http://localhost:8080 is also set.
