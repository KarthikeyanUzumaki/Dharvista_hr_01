#  Dharvista Showcase 🚀

**A lightweight careers site and admin dashboard built with React, TypeScript, Vite and Supabase.**  
This app provides a public-facing job board and a simple admin dashboard for posting and managing job listings and site content.

---

## Table of contents
1. [Project Overview](#project-overview) ✅  
2. [Key Features (Detailed)](#key-features-detailed) ✨  
3. [Technical Architecture](#technical-architecture) 🔧  
4. [Prerequisites](#prerequisites) 📦  
5. [Installation & Setup Guide](#installation--setup-guide) 🛠️  
6. [Environment Variables](#environment-variables) 🔐  
7. [API Documentation (Overview)](#api-documentation-overview) 📡  
8. [Developer Notes & Best Practices](#developer-notes--best-practices) 💡  
9. [Future Improvements](#future-improvements) 📈  
10. [Contributing & License](#contributing--license) ❤️

---

## Project Overview
 Dharvista Showcase is a simple but production-minded demonstration app that helps organizations publish and manage job vacancies and site content. It offers a public job board (browse and apply via Contact), plus an admin dashboard for posting jobs, uploading images, and editing small site settings.

---

## Key Features (Detailed)

### Public (Visitor) ✨
- **Jobs Listing**
  - Browse active job opportunities with title, location, salary, experience, and short description.
  - Sorted by `created_at` (newest first).
- **Contact / Apply**
  - Contact page used to apply for vacancies or register interest (link from job card).
- **Site Content**
  - Hero headline & banner shown on the public homepage (managed via admin).

### Admin 🛠️
- **Admin Dashboard**
  - Protected via a simple client-side login (localStorage-based token) for this demo.
  - Edit hero headline and banner image (uploads to Supabase storage bucket).
- **Job Management**
  - Create, list, and delete job postings.
  - Automatic job code generation helper.
- **Storage**
  - Upload images to the `website-assets` Supabase storage bucket.

> ⚠️ Note: The current admin auth is a demo client-side check (`localStorage` token). For production, use Supabase Auth or another secure method — see Future Improvements.

---

## Technical Architecture

### Frontend 🔧
- **Framework:** React + TypeScript (Vite)
- **Styling:** Tailwind CSS + Tailwind plugins (e.g., typography, animate)  
- **Routing:** react-router-dom
- **Data fetching & caching:** @tanstack/react-query
- **UI primitives:** Radix & shadcn-style components (under `src/components/ui/*`)
- **Toast / Notifications:** Sonner
- **Icons / Utilities:** lucide-react, date-fns, clsx, zod
- **Build / Scripts:** Vite with `npm run dev`, `npm run build`, `npm run preview`

Frontend folder overview:
- `src/`
  - `components/` — shared UI (Layout, Navigation, protected route wrapper, component library)
  - `pages/` — route pages (Index, Jobs, Login, AdminDashboard, About, Contact, NotFound)
  - `hooks/` — custom hooks (`useJobs`, `useSiteSettings`, `useToast`, etc.)
  - `integrations/supabase/` — Supabase client & typed DB schema
  - `lib/` — utility helpers
  - `App.tsx`, `main.tsx` — app entry + routing

### Backend (Supabase) 🗄️
- **Provider:** Supabase (Postgres + Storage + Auth)
- **DB Schema (key tables)** — see `src/integrations/supabase/types.ts`
  - `jobs`:
    - id, title, description, location, is_active, created_at, updated_at, job_code, experience, salary_range, industry, qualification
  - `site_settings`:
    - id, key_name, value, created_at, updated_at
- **Storage:**
  - Bucket: `website-assets` (used for public images like hero banner)
- **Auth:**
  - For this demo: client-side admin check (`localStorage` token).  
  - Typical production setup: Supabase Auth (email/password or SSO) + RLS policies, and server-side service role usage for privileged actions.
- **Migrations:**
  - `supabase/migrations/*.sql` holds the DB creation scripts used for provisioning.

---

## Prerequisites ✅
- Node.js >= 18 (recommended)  
- npm (or yarn / pnpm)  
- A Supabase project (free tier OK) with Postgres and Storage enabled  
- (Optional) Supabase CLI if you want to run migrations locally: https://supabase.com/docs/guides/cli

---

## Installation & Setup Guide

1. Clone the repo
```bash
git clone <repo-url>
cd model-corp-showcase
```

2. Install dependencies
```bash
npm install
# or
# pnpm install
# yarn
```

3. Configure environment variables
- Create a `.env` file at project root (copy `.env.example` or use the `.env` in repo as a guide).
- Required vars documented below. Example:
```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-or-publishable-key>
VITE_SUPABASE_PROJECT_ID=<project-id>
# (Optional for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

4. Set up Supabase
- Create a Supabase project and enable Postgres & Storage.
- Run provided migration SQL:
  - Either via Supabase UI SQL editor (paste `supabase/migrations/*.sql`) or use `supabase` CLI:
    - `supabase db push` (requires CLI and config)
- Create a storage bucket named `website-assets` (public if you want direct public URLs).

5. Start the app
```bash
npm run dev
# open http://localhost:5173 (or the port shown)
```

6. Admin Dashboard
- Visit `/login` and use the demo credentials:
  - Email: `admin@modelcorp.com`
  - Password: `admin123`
- This saves `admin_token` to `localStorage` and redirects to `/admin-dashboard`.

7. Build (production)
```bash
npm run build
npm run preview
```

---

## Environment Variables 🔐

| Variable | Example | Purpose |
|---|---:|---|
| `VITE_SUPABASE_URL` | `https://projid.supabase.co` | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJ...` | Client-side (anon/public) key |
| `VITE_SUPABASE_PROJECT_ID` | `kxuhbp...` | Project identifier (optional but present) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` | Service role (server-only — **DO NOT** expose publicly) |

> Tip: In frontend code, use `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`. Keep `SUPABASE_SERVICE_ROLE_KEY` on server or CI only.

---

## API Documentation (Overview) 📡

This app uses Supabase client (`@supabase/supabase-js`) to perform DB and Storage operations. The key **client** calls are demonstrated in the codebase.

Examples (Supabase JS):

- Fetch active jobs
```ts
const { data, error } = await supabase
  .from('jobs')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false });
```

- Insert a job (Admin)
```ts
await supabase.from('jobs').insert([{
  title: 'Senior Dev',
  description: '...',
  location: 'Remote',
  job_code: '#JOB-2025XXXX',
  is_active: true
}]);
```

- Delete a job
```ts
await supabase.from('jobs').delete().eq('id', jobId);
```

- Storage upload (hero/banner)
```ts
const { error } = await supabase.storage.from('website-assets').upload(fileName, file);
const { data: urlData } = supabase.storage.from('website-assets').getPublicUrl(fileName);
```

- Direct REST endpoints (Supabase auto-generates PostgREST)
  - GET: `https://<project>.supabase.co/rest/v1/jobs?is_active=eq.true`
  - POST/PUT/DELETE via standard REST semantics (requires proper auth).

---

## Developer Notes & Best Practices 💡

- Replace hardcoded keys in `src/integrations/supabase/client.ts` with environment variables:
```ts
// Example (recommended):
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
```

- Admin auth is intentionally simple for the showcase. For production:
  - Use Supabase Auth (or other secure auth), enforce role-based RLS policies.
  - Move any privileged operations (service role key usage) to a secure server-side function or serverless endpoint.

- Database schema reference: `src/integrations/supabase/types.ts` — use this to generate typed Supabase clients.

- UI primitives live under `src/components/ui/` (Radix + tailwind/shadcn patterns). Follow existing component patterns for new UI.

- Use `@tanstack/react-query` for caching; wrap new API calls with queries/mutations following existing hooks patterns (e.g., `useJobs`).

---

## Future Improvements 🚀

- Implement secure admin authentication using Supabase Auth with RBAC & RLS policies.
- Move admin sensitive actions to server-side endpoints using service role securely (or Postgres functions).
- Add pagination & filters to Jobs page (search by title, location, industry).
- Add automated tests: unit (Jest/RTL) + E2E (Playwright / Cypress).
- Add CI pipeline for lint, type-check, build & migration automation.
- Add role-based UI and audit logs for content changes.
- Improve accessibility (WCAG), progressive enhancement, and SEO meta tags.

---

## Contributing & License ❤️
- Contributions are welcome — open issues/PRs, and follow code style & testing guidelines.
- Add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` if you intend to collaborate broadly.
- Use standard license (e.g., MIT) in the repo root if you'd like to make the project public.

---
