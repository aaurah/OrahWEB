# OrahWeb

A complete, production-ready website built with **Next.js 14 (App Router)**, **TypeScript**, and **TailwindCSS**.

---

## Features

- **5 Pages** — Home, About, Services, Contact, Dashboard (protected)
- **Authentication** — NextAuth.js with JWT + Credentials provider
- **API Routes** — `/api/contact` (POST) and `/api/user` (GET)
- **SEO Metadata** — per-page titles, descriptions, Open Graph tags
- **Fully Responsive** — mobile-first Tailwind design
- **Reusable Components** — Navbar, Footer, Button, Card, Layout wrapper

---

## Project Structure

```
artifacts/orahweb/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (Navbar + Footer + Providers)
│   ├── page.tsx                # Home page
│   ├── about/page.tsx          # About page
│   ├── services/page.tsx       # Services page
│   ├── contact/page.tsx        # Contact page (form → /api/contact)
│   ├── dashboard/page.tsx      # Protected dashboard (requires login)
│   ├── login/page.tsx          # Sign-in page
│   ├── globals.css             # Global Tailwind styles
│   └── api/
│       ├── auth/[...nextauth]/ # NextAuth.js handler
│       ├── contact/route.ts    # POST — contact form submission
│       └── user/route.ts       # GET — current authenticated user
├── components/
│   ├── Navbar.tsx              # Sticky navbar with mobile menu
│   ├── Footer.tsx              # Site footer with links
│   ├── Button.tsx              # Multi-variant button component
│   ├── Card.tsx                # Card + CardHeader components
│   ├── Layout.tsx              # Section, SectionHeader, PageHero
│   └── Providers.tsx           # NextAuth SessionProvider wrapper
├── lib/
│   ├── auth.ts                 # NextAuth config + demo users
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
├── middleware.ts               # Protects /dashboard routes
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind + brand color tokens
├── postcss.config.js           # PostCSS (Tailwind + Autoprefixer)
└── tsconfig.json               # TypeScript config for Next.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm

### Install dependencies

```bash
pnpm install
```

### Development

```bash
# From the workspace root:
pnpm --filter @workspace/orahweb run dev

# Or from this directory:
pnpm dev
```

The app starts at `http://localhost:3000`.

### Build for production

```bash
pnpm --filter @workspace/orahweb run build
```

### Run production server

```bash
pnpm --filter @workspace/orahweb run start
```

---

## Authentication

NextAuth.js is configured with a **Credentials provider** and **JWT sessions**.

**Demo accounts (dev only):**

| Email | Password | Role |
|---|---|---|
| `admin@orahweb.com` | `password123` | admin |
| `jane@orahweb.com` | `password123` | user |

The `/dashboard` route is protected by `middleware.ts` — unauthenticated users are redirected to `/login`.

### Environment variables

Set these in production:

```env
NEXTAUTH_SECRET=your-strong-random-secret   # Required in production
NEXTAUTH_URL=https://orahweb.com            # Your production URL
```

---

## API Routes

### `POST /api/contact`

Submit the contact form.

**Request body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "subject": "New project inquiry",
  "message": "We need a new website..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Thank you for reaching out! We'll get back to you within 24 hours.",
  "data": { "name": "Jane Smith", "email": "jane@company.com", "subject": "..." }
}
```

### `GET /api/user`

Returns the currently authenticated user. Requires a valid session.

**Response (200):**
```json
{
  "id": "1",
  "name": "Admin User",
  "email": "admin@orahweb.com",
  "role": "admin",
  "avatar": null
}
```

Returns `401 Unauthorized` if no session is present.

---

## Deployment

### Vercel (recommended)

```bash
vercel --prod
```

Set these environment variables in the Vercel dashboard:
- `NEXTAUTH_SECRET` — a strong random string (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — your production domain (e.g. `https://orahweb.com`)

### Docker

```bash
docker build -t orahweb .
docker run -p 3000:3000 \
  -e NEXTAUTH_SECRET=your-secret \
  -e NEXTAUTH_URL=https://orahweb.com \
  orahweb
```

### Replit Deploy

Click **Publish** in the Replit UI. The build command (`next build`) and run command (`next start`) are pre-configured.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Auth | NextAuth.js v4 (JWT + Credentials) |
| Validation | Zod |
| Utilities | clsx, tailwind-merge |

---

## License

MIT — feel free to use this as a starting point for your own projects.
