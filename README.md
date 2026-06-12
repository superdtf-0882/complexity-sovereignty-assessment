# Complexity–Sovereignty Assessment

A companion tool to long-form geopolitical essays published at [superdtf.substack.com](https://superdtf.substack.com).

The tool scores 14 countries on two dimensions — economic complexity and strategic sovereignty — and derives a binding constraint (the governing score) and tier classification for each.

**Live:** https://superdtf-0882.github.io/complexity-sovereignty-assessment/

## Development

```bash
npm install
npm run dev          # local development
npm run build        # production build
npm run deploy       # deploys to GitHub Pages
```

## Data

All country data lives in `src/data/countries.json`. Scores, sub-scores, and key signal narratives are all in that file — no data is hardcoded in components.

## Framework

**Complexity** is scored across 5 questions (max 10): export uniqueness, trajectory, Dutch disease resistance, brain drain direction, FDI quality.

**Sovereignty** is scored across 10 questions (max 10): airframe/engine sovereignty, nuclear deterrent, arms export freedom, software sovereignty, whether others seek your technology, consistent doctrine, domestic procurement, alliance independence, edge chip access, autonomous operations.

**Binding constraint** = min(complexity, sovereignty). **Tier** derived from binding constraint: ≥7 = Tier 1, ≥5 = Tier 2, ≥3 = Tier 3, <3 = Tier 4.

The full methodology is available in the collapsible "About this framework" section within the app.
