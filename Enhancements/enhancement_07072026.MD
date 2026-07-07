# GK Associates — UI/UX Enhancement Plan
**Date:** 07-07-2026
**Branch:** `savanana/enhancement07072026` *(created by stakeholder — used for all sprints below; note: contains a typo vs. "saravana", kept as-is since it's already pushed)*
**Status:** Sprint 0 complete, on branch above

---

## 1. Constraints & Guardrails
- **Static site only** — no framework migration (stays plain HTML/CSS/vanilla JS).
- **Content stays the same**, except a small set of explicit content alterations (scope to be confirmed with stakeholder — see Sprint 4).
- **Hosting:** Vercel **free tier** only — no serverless functions, no paid add-ons, no custom infra.
- **Source control:** GitHub only. All work happens on a feature branch and is reviewed via PR before touching `main`.
- **Design tone:** formal, trustworthy (banking/valuation-sector credibility) — but visually elevated, aesthetically confident, and innovative in layout/interaction, not generic corporate template.

## 2. Branch & Local Preview Strategy
1. Branch: `savanana/enhancement07072026` (created off `main`).
2. All redesign work happens on this branch; `main` stays untouched/deployable until merge.
3. **Local preview requirement:** `content-loader.js` fetches `site_content/data.json` — this only works over `http://`, not `file://`. Preview using one of:
   - VS Code "Live Server" extension, or
   - `npx serve .`, or
   - `python -m http.server`
4. Every sprint below is checked visually in this local server before moving to the next.
5. Push the branch to GitHub early (even empty) so Vercel's Git integration can start generating **Preview Deployments** per commit — this gives a shareable URL for review at any point, independent of local preview.

## 3. Skills / Tooling to be Used
| Skill | Purpose in this project |
|---|---|
| `ui-ux-pro-max` | Palette selection, font pairing, layout pattern library, style direction (formal + innovative) |
| `design-system` | Token architecture (primitive → semantic → component), consistent spacing/type scale across all 5 pages |
| `ui-styling` | Tailwind utility patterns, accessible markup, hover/focus states |
| `dataviz` | Styling for any stat/number highlight blocks (e.g. years of service, reports delivered) if added |
| `artifact-design` | Quick visual concept previews for sign-off before touching real HTML |
| `verify` / `run` | Local functional verification of each change against the golden path |
| `code-review` / `simplify` | Pre-merge diff quality pass before opening the PR |

## 4. Known Pre-existing Bug (must fix first)
`content-loader.js` is referenced by `<script src="content-loader.js">` in all 5 pages, but the actual file was renamed to `content-loader.js.html` in the last commit (`compactibility fixes`). Result: the script 404s and **every dynamic content block (services, team, trust items, core values, all `data-key` text) currently renders blank**. This must be fixed in Sprint 0 — otherwise redesign work can't even be reviewed with real content in place.

---

## 5. Sprint Plan

### Sprint 0 — Foundation & Environment *(0.5 day)* — ✅ Complete
- [x] Branch `savanana/enhancement07072026` created and used (already pushed by stakeholder before this sprint started)
- [x] Fixed `content-loader.js` filename bug — restored real `.js` file (was mis-renamed to `content-loader.js.html`); verified locally with a static server, `content-loader.js` and `site_content/data.json` both return HTTP 200
- [x] Removed stray duplicate `content-loaderhtml`
- [x] Restored `tailwind.config.js` (was mis-renamed to `tailwind.config.js.html`) — this is the **real build config** consumed by the Tailwind CLI, not dead code as first assumed; rebuilding with `npm run build` now produces a byte-identical `site_content/styles.css`, confirming the fix is safe
- [x] Removed the dead inline `<script>tailwind.config = {...}</script>` blocks from `about.html`, `contact.html`, `services.html`, `team.html`, `_template.html` — these referenced a `tailwind` global that's never loaded (no CDN script anywhere) and were pure leftover cruft from before CSS was precompiled
- [x] Added `build` / `watch` / `serve` npm scripts and documented local preview + build workflow in `README.md`
- [ ] Before-state screenshots — **skipped**: no browser/screenshot tool available in this environment; recommend a quick manual look via `npm run serve` before Sprint 1 visual changes begin, as the before/after baseline
- [ ] Push branch to GitHub / confirm Vercel Preview Deployment — pending commit of the Sprint 0 changes above; push happens next, Vercel deployment status needs to be checked on your dashboard since no Vercel access/token is available here

### Sprint 1 — Design Direction & Token System *(1 day)*
- [ ] Define 2–3 visual direction concepts (e.g. "Executive Navy", "Editorial Minimal", "Modern Trust") using `ui-ux-pro-max` palette/font-pairing intelligence
- [ ] Present concepts as an Artifact mockup for stakeholder sign-off
- [ ] Once approved: build design tokens (primitive → semantic → component) — color, type scale, spacing, radii, shadow, motion durations
- [ ] Update `input.css` / precompiled `site_content/styles.css` build to reflect new tokens

### Sprint 2 — Core Layout & Shared Components *(1 day)*
- [ ] Redesign header/navigation (sticky behavior, formal but modern, subtle motion)
- [ ] Redesign footer
- [ ] New hero pattern for `index.html`
- [ ] Shared reusable component classes: buttons, cards, section dividers, badges — applied consistently across pages

### Sprint 3 — Page-by-Page Redesign *(2 days)*
- [ ] `index.html` — hero, trust items, services summary, why-choose-us
- [ ] `about.html` — vision/mission, "defines us" panel, core values
- [ ] `services.html` — service detail cards
- [ ] `team.html` — team cards, founder spotlight
- [ ] `contact.html` — contact layout, map embed styling, address/hours presentation

### Sprint 4 — Content Alterations *(0.5–1 day, scope pending)*
- [ ] Confirm with stakeholder exactly which copy/sections change vs. stay as-is
- [ ] Apply approved text changes only in `site_content/data.json` (no structural/markup change needed — this is the whole point of the content-loader pattern)

### Sprint 5 — Responsive, Accessibility & Polish *(1 day)*
- [ ] Mobile/tablet breakpoint audit across all 5 pages
- [ ] Contrast/accessibility pass (WCAG AA minimum)
- [ ] Subtle scroll-reveal / hover micro-interactions (kept formal, not flashy)
- [ ] Image compression, `font-display`, lazy-loading pass for performance

### Sprint 6 — QA & Local Verification *(0.5 day)*
- [ ] Cross-browser check (Chrome/Edge/Firefox, mobile viewport)
- [ ] Verify all `data-loader`-driven sections populate correctly (validates Sprint 0 fix)
- [ ] Full click-through of every page/link/anchor via `/verify`

### Sprint 7 — GitHub & Vercel Release Workflow *(0.5 day)*
- [ ] Open PR from `savanana/enhancement07072026` → `main`
- [ ] Review Vercel Preview Deployment URL on the PR
- [ ] Stakeholder sign-off on preview
- [ ] Merge PR → triggers Vercel production deployment on free tier

---

## 6. Open Questions for Stakeholder
1. Which specific sections/copy need altering (Sprint 4 scope)?
2. Any preference among the 3 visual directions to be presented in Sprint 1, or should all 3 be shown blind?
3. Keep default `*.vercel.app` domain, or is a custom domain planned (still free-tier compatible, just needs DNS)?

## 7. Risks / Notes
- Vercel free tier supports unlimited preview deployments and one production deployment per project — no functional risk for a static site with no serverless functions.
- The content-loader bug fix (Sprint 0) is a prerequisite, not optional — without it, dynamic sections will appear empty regardless of how good the new CSS is.
- Single source of truth for text remains `site_content/data.json`; redesign should not reintroduce hardcoded copy into HTML.
