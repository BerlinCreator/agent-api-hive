# Git Remotes — Agent API Hive

| Remote | Repo | Branch | What |
|--------|------|--------|------|
| `origin` | BerlinCreator/agent-api-hive | `master` | Next.js frontend (clean standalone repo) |
| `backend` | BerlinCreator/agent-utility-belt | `main` | Fastify API backend (Railway) |

## Push Commands
- Frontend: `git push origin master`
- Backend: `git push backend main` (from the backend project folder)

## Vercel
- Auto-deploys from `agent-api-hive` repo on push to `master`

## Railway
- Auto-deploys from `agent-utility-belt` repo on push to `main`

## Clean Repo Migration (Apr 13, 2026)
- Migrated from monorepo workspace to standalone repo
- Old history (200+ commits with CashFlow, X automation, etc.) was replaced
- Clean commit: `483128d` — 50 files, all frontend code only
- Workspace still has the old .git for reference, but canonical source is now the GitHub repo
