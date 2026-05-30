---
name: Domain Purchase Flow
description: How domains go from Stripe checkout to the user's dashboard
---

**Flow:**
1. Cart → POST /api/stripe/checkout (Express) → Stripe Checkout Session URL
2. Stripe redirects to /checkout/success?session_id=...
3. Success page POSTs to /api/checkout/complete (Next.js)
4. That route calls Express GET /api/stripe/session/:id, then saves to `orahweb_domains` table
5. Dashboard fetches GET /api/user/domains to show real purchases

**Tables:** `orahweb_domains` (purchases), `orahweb_dns_records` (DNS per domain)

**Why separate /api/checkout/complete instead of calling Express directly from client:**
The Next.js route can access the server session (getServerSession) to associate the purchase with the logged-in user_id. A direct client→Express call cannot do this securely.

**DNS management:** /dashboard/dns/[domain] page. Default NS records (ns1.orahweb.com, ns2.orahweb.com) are auto-added on purchase.
