# Thallapalli Indrasena Reddy — AI / ML Engineer

Personal portfolio. Next.js (static export) + TypeScript + Tailwind CSS v4, with a raw-WebGL depth-parallax hero.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Checks

```bash
npm run lint
npm run typecheck
npm test             # content-integrity tests (node:test)
npm run build        # static site in ./out
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/Portfolio` and publishes `./out`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

For a custom domain at the root, build with `NEXT_PUBLIC_BASE_PATH=""` and set `NEXT_PUBLIC_SITE_URL`.

## Editing content

All copy is data-driven:

| File | What |
|---|---|
| `src/data/profile.ts` | name, links, summary, focus areas, education, certifications |
| `src/data/projects.ts` | case studies + their architecture traces |
| `src/data/experience.ts` | roles and work tracks |
| `src/data/lab.ts` | AI Lab experiments |
| `src/data/skills.ts` | skill clusters and where each skill was used |

The resume PDF lives at `public/resume/Thallapalli-Indrasena-Reddy-Resume.pdf`.
See `docs/DESIGN_DIRECTION.md` for the design system and asset pipeline.
