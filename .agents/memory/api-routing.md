---
name: API Routing Split
description: Which API routes belong to Express vs Next.js
---

**Express API server (port 8080, artifact: api-server):**
- /api/stripe/checkout (POST) — creates Stripe Checkout Session
- /api/stripe/session/:id (GET) — retrieves session data
- /api/webhooks/stripe — Stripe webhooks (raw body, before express.json())

**Next.js (orahweb):**
- /api/auth/[...nextauth] — NextAuth
- /api/register — user signup → writes to orahweb_users
- /api/checkout/complete — saves domain purchase to DB (calls Express internally)
- /api/user/domains — returns logged-in user's domains
- /api/user/dns — GET/POST/DELETE DNS records
- /api/admin/users — admin-only user list
- /api/contact — contact form

**Why:** Stripe webhook must receive raw body before JSON parsing — easier to isolate in a dedicated Express server. Next.js handles all user-context routes because getServerSession only works inside Next.js API routes.

**API_BASE_URL:** Set as shared env var = http://localhost:8080 (Next.js uses this to call Express internally).
