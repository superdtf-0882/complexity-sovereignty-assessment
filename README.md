# Complexity–Sovereignty Assessment

A companion tool to long-form geopolitical essays published at [superdtf.substack.com](https://superdtf.substack.com).

The tool scores countries (33 as of this writing) on two dimensions — economic complexity and strategic sovereignty — and derives a binding constraint (the governing score) and tier classification for each.

**Live:** [davidfacer.com/complexity-sovereignty-assessment/](https://davidfacer.com/complexity-sovereignty-assessment/) — embedded in the main site (`superdtf-0882.github.io` repo) as a built static export, **not** deployed independently. The `npm run deploy` script below still publishes to this repo's own GitHub Pages project site, but that's no longer the canonical URL.

## Development

```bash
npm install
npm run dev          # local development
npm run build        # production build
```

## Deploying (into the main site — do this after any change)

This app isn't deployed on its own. After changing anything here:

```bash
npm run build
```

then copy `dist/*` into `public/complexity-sovereignty-assessment/` in the `superdtf-0882.github.io` repo (replacing what's there), and rebuild/redeploy that project. `vite.config.js`'s `base: '/complexity-sovereignty-assessment/'` already matches where it's served from, so no path adjustments are needed — just copy and go.

The identity mark in the top-left (linking back to davidfacer.com) is added in `src/App.jsx`/`src/App.css`, not part of the original design — added during WP2a UAT for consistency with the rest of the site, since this app has no Tailwind and its own hand-written CSS.

## Data

All country data lives in `src/data/countries.json`. Scores, sub-scores, and key signal narratives are all in that file — no data is hardcoded in components.

## Framework

**Complexity** is scored across 5 questions (max 10): export uniqueness, trajectory, Dutch disease resistance, brain drain direction, FDI quality.

**Sovereignty** is scored across 10 questions (max 10): airframe/engine sovereignty, nuclear deterrent, arms export freedom, software sovereignty, whether others seek your technology, consistent doctrine, domestic procurement, alliance independence, edge chip access, autonomous operations.

**Binding constraint** = min(complexity, sovereignty). **Tier** derived from binding constraint: ≥7 = Tier 1, ≥5 = Tier 2, ≥3 = Tier 3, <3 = Tier 4.

The full methodology is available in the collapsible "About this framework" section within the app.
