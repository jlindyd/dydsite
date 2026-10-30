# DYD — Design Your Dream

DYD Creative Solutions website, themed around creativity, technology and the possibilities of the AI era. The architectural worlds are a visual metaphor for IT architecture: connected software, knowledge and intelligent systems that turn an idea into reality.

Live site: https://dyd-dream-world.vercel.app/

## Run locally

Requires Node.js 22 or later. There are no third-party build dependencies.

```sh
npm run dev
```

Open http://localhost:4500. Set `PORT` to use another port.

```sh
npm run build
npm run check
npm start
```

The build creates `dist/`. The local server serves that directory only.

## Editing

- `content.json`: brand details, services and structured content.
- `build.mjs`: core pages, navigation, footer and metadata.
- `redesign.mjs`: visual page composition and stylesheet integration.
- `story-hero.mjs`, `story.js`, `story.css`: the scroll-driven sketch → color → dimensional → future hero. Environmental video is intentionally disabled.
- `future-home.mjs`, `future-home.css`: the Imagination Atelier, Knowledge Observatory and Experience Pavilion sections.
- `theme.css`: shared palette, sticky navigation and hero sizing below the header.
- `assets/`: optimized artwork; responsive variants are used for the three homepage worlds.

Generated HTML is included as a usable snapshot. Run the build after editing content or generators; it regenerates pages in `dist/` without changing the source snapshot.

## Deployment

`vercel.json` builds the site and publishes `dist/`. The current Vercel project is `dyd-dream-world` under `jackys-projects-aea9c668`. This repository has not yet been connected to automatic Git deployments.

The site is static. Contact uses an email-draft flow, and the Intelligence interactions are illustrative. The existing DYD CMS is not connected. Canonical metadata currently uses `https://dyd.com`.

No environment files, API credentials, generation metadata, original video experiments or local QA artifacts are included.
