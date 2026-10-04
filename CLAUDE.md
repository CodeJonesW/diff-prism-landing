# DiffPrism Landing Page

Marketing site for DiffPrism. React + Vite, deployed to Cloudflare Pages.

## Repos

- **This repo:** https://github.com/CodeJonesW/diff-prism-landing
- **Main tool repo:** https://github.com/CodeJonesW/diffprism — the actual CLI/MCP tool this site advertises

## Keeping Copy Current

When updating landing page copy (features, install commands, how-it-works steps), check the main repo for the latest state:

```bash
gh release list -R CodeJonesW/diffprism          # Recent releases
gh release view <tag> -R CodeJonesW/diffprism     # Release notes for a specific version
gh api repos/CodeJonesW/diffprism/readme -q .content | base64 -d  # Current README
```

Use release notes and README changes to update:
- Feature descriptions in `src/App.tsx` (the `features` array)
- Install commands (the `INSTALL_CMD` constant)
- "How it works" steps
- Hero tagline/subtitle if the product positioning shifts

## Build & Deploy

```bash
npm install        # Install deps
npm run dev        # Dev server (localhost:5173)
npm run build      # Production build → dist/
```

Deploys are a **Direct Upload** Pages project (`diffprism-landing`), driven by
`.github/workflows/deploy.yml` — push to `main` builds and uploads `dist/`.

This project has no Cloudflare Git integration and cannot gain one: a Direct
Upload project can never be converted to Git integration. The GitHub Action is
how push-to-deploy works here. Changing it means recreating the project and
re-attaching `diffprism.com`.

Required repo secrets: `CLOUDFLARE_API_TOKEN` (Account → Cloudflare Pages →
Edit) and `CLOUDFLARE_ACCOUNT_ID`.

To deploy by hand: `npm run build && npx wrangler pages deploy dist --project-name=diffprism-landing`

Deep links to react-router routes (`/why`, `/context`, `/blog/...`) work
through Pages' built-in SPA fallback: with no top-level `404.html`, Pages serves
`index.html` for any path that has no file. Don't add a `404.html`. Don't add a
catch-all `_redirects` rule either. `_redirects` rules win over static files, so
`/*  /index.html  200` would hide the per-post pages below.

Each blog post gets its own `dist/blog/<slug>.html` at build time
(`blogMetaPages` in `vite.config.ts`). It's `index.html` with the post's title,
summary and `image` in the Open Graph and Twitter tags, so link previews show
the post. Pages serves it at `/blog/<slug>`.

The site-wide link-preview image is `public/og-image.png` (1200x630), rendered
from `og/og-image.html` by `og/render.sh` (headless Chrome). When the hero copy
or the screenshot it shows changes, edit the template, re-run the script, and
bump the `?v=` on the image URL in `index.html` and `DEFAULT_IMAGE` in
`vite.config.ts` so X, Slack and LinkedIn fetch the new one.

## Conventions

- Single-page app, all content in `src/App.tsx`
- Styles in `src/App.css`, CSS variables in `src/index.css`
- Dark theme matching DiffPrism UI colors (#0d1117 bg, #58a6ff accent)
- Named exports, no default exports
