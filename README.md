# gkassosiatesweb
GK Assosiates 5 page website

## Local development

This is a static site (HTML/CSS/vanilla JS). `content-loader.js` fetches
`site_content/data.json` via `fetch()`, which browsers block over the
`file://` protocol — you must preview through a local HTTP server.

```bash
npm install        # installs Tailwind CLI (devDependency)
npm run serve       # serves the site at http://localhost:3000 (npx serve)
```

Or use the VS Code "Live Server" extension, or `python -m http.server`.

## Styling / Tailwind build

CSS is precompiled — `input.css` (Tailwind directives + self-hosted
`@font-face` rules) is built into `site_content/styles.css`, which is
committed to the repo. There is no CDN `<script>` tag and no client-side
Tailwind — only the compiled stylesheet is loaded at runtime.

After changing `input.css`, `tailwind.config.js`, or any class names used
in the HTML files, rebuild the committed CSS:

```bash
npm run build       # one-off minified build
npm run watch       # rebuild on file change, while developing
```

## Content

All page copy lives in [site_content/data.json](site_content/data.json).
Elements with `data-key="dot.path"` attributes and empty containers with
specific `id`s (see [content-loader.js](content-loader.js)) are populated
from this file at page load — edit the JSON, not the HTML, to change text.

## Branching

Active redesign work happens on a feature branch and is reviewed via a
GitHub PR before merging to `main`. See `Enhancements/` for the current
sprint plan. Vercel is connected to this GitHub repo and generates a
Preview Deployment for every pushed branch/PR, and deploys `main` to
production on merge.
