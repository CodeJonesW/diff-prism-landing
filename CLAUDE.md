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

Cloudflare Pages auto-deploys from `main`. Build command: `npm run build`, output dir: `dist`.

## Conventions

- Single-page app, all content in `src/App.tsx`
- Styles in `src/App.css`, CSS variables in `src/index.css`
- Dark theme matching DiffPrism UI colors (#0d1117 bg, #58a6ff accent)
- Named exports, no default exports
