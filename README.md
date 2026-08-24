# Editable Portfolio (Next.js + GitHub-as-CMS)

A portfolio site where **every section is dynamic content** stored in
`data/portfolio.json` inside this repo. Sign in with GitHub, click **Edit
portfolio**, change anything inline, and **Save changes** commits the update
straight back to this repository — no database, no paid services, runs
entirely on Vercel's free Hobby tier.

## How it works

- All content (hero, about, experience, education, certifications, skills,
  projects, testimonials, awards, availability, contact) lives in one file:
  `data/portfolio.json`.
- The homepage is a Server Component that reads that file **live from the
  GitHub API** on every request (`cache: "no-store"`), so it always shows
  the latest committed content — no rebuild needed.
- Signing in uses GitHub OAuth (via NextAuth). Only the GitHub username you
  set as `OWNER_GITHUB_USERNAME` gets edit controls — everyone else sees a
  normal read-only portfolio.
- Saving calls `PUT /api/content`, which uses **your own GitHub OAuth token**
  (scope `repo`) to commit the new JSON to `data/portfolio.json`. That commit
  shows up in your repo's history like any other change.
- No database, no file storage, no server state — which is exactly what
  keeps this free and simple to host on Vercel's Hobby plan.

## 1. Create the GitHub repo

1. Push this project to a **public** GitHub repo (a public repo means reads
   don't need authentication and won't hit low rate limits).
2. Note the repo owner and name — you'll need them below.

## 2. Create a GitHub OAuth App

Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
(or directly: https://github.com/settings/developers) and create one with:

- **Homepage URL**: `https://your-project.vercel.app` (or `http://localhost:3000` while developing)
- **Authorization callback URL**: `https://your-project.vercel.app/api/auth/callback/github`
  (locally: `http://localhost:3000/api/auth/callback/github`)

You'll get a **Client ID** and can generate a **Client Secret** — save both.

> You can register two OAuth Apps (one for local dev, one for production)
> since each only supports one callback URL, or use
> https://github.com/settings/developers with multiple callback URLs on one
> app — GitHub supports several callback URLs per app.

## 3. Set environment variables

Copy `.env.example` to `.env.local` and fill it in:

```bash
cp .env.example .env.local
```

| Variable | What it is |
|---|---|
| `GITHUB_ID` / `GITHUB_SECRET` | From the OAuth App you just created |
| `NEXTAUTH_SECRET` | Random string — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` locally, your Vercel URL in production |
| `GITHUB_REPO_OWNER` / `GITHUB_REPO_NAME` | The repo that holds `data/portfolio.json` |
| `GITHUB_BRANCH` | Usually `main` |
| `OWNER_GITHUB_USERNAME` | **Only this GitHub username gets edit access** |
| `GITHUB_READ_TOKEN` | Optional. A fine-grained PAT with read-only `Contents` access, raises the read rate limit from 60/hr to 5,000/hr. Skip it for a low-traffic personal site. |

## 4. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`, click **Sign in with GitHub**, sign in as the
account matching `OWNER_GITHUB_USERNAME`, then **Edit portfolio**.

## 5. Deploy to Vercel (free Hobby tier)

1. Import the GitHub repo into Vercel (https://vercel.com/new).
2. Add the same environment variables from `.env.local` in
   **Project → Settings → Environment Variables** (use your production
   `NEXTAUTH_URL`, e.g. `https://your-project.vercel.app`).
3. Deploy.
4. Update your GitHub OAuth App's callback URL to match the deployed domain
   (or add it as a second callback URL if supported).

**Why this fits the free tier:** there's no database, no cron jobs, no
long-running processes, and no persistent filesystem writes — everything
is a normal serverless function call to the GitHub API, well within
Vercel Hobby's function-duration and bandwidth limits for a personal site.

## Editing content

Once signed in as the owner:

1. Click **Edit portfolio** (top right).
2. Every field becomes editable inline — text, arrays (experience,
   projects, skills, etc. use "+ Add" / "Remove" buttons), and comma-
   separated tag lists.
3. Click **Save changes** to commit to GitHub, or **Discard** to revert.

You can also just edit `data/portfolio.json` directly in GitHub's web editor
or via `git` — the site will pick up the change on the next request either
way, since content is always read fresh.

## Extending the schema

Add a new field to `src/types/portfolio.ts`, update
`data/portfolio.json` with a default value, and add the field to the
relevant component in `src/components/sections/`. The save flow doesn't
need any changes — it always PUTs the whole `PortfolioData` object.
