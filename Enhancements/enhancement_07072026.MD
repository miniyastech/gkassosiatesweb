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

### Sprint 1 — Design Direction & Token System *(1 day)* — ✅ Complete
- [x] Presented 3 visual direction concepts (Executive Navy / Editorial Minimal / Modern Trust) as an Artifact mockup built with real homepage copy, using `ui-ux-pro-max` for palette/typography/style research
- [x] Stakeholder picked **Concept C — Modern Trust**: deep navy panels, restrained glass cards, teal accent (`#14b8a6`) replacing the old royal blue, single unified grotesk typeface
- [x] Built the token system in `input.css` (`@layer base { :root {...} }`) — primitives (`--navy-950/900`, `--teal-500/600`, `--slate-500`) mapped to the original semantic variable names (`--bd`, `--ba`, `--bm`, etc.) so every existing `bg-brand-*` / `text-brand-*` / `border-brand-*` class across all 5 pages repoints automatically, with no markup changes required
- [x] **Font swap, with a fix found along the way:** while sourcing the concept's single-grotesk typography, discovered the self-hosted Roboto (300/400/500/700) and Merriweather (400/700) `.woff2` files were each byte-for-byte identical across their supposed weights — bold text has never actually rendered bold anywhere on the site, only browser-synthesized faux-bold. Replaced both with self-hosted **IBM Plex Sans** (400/500/600/700), fetched and verified as four genuinely distinct weight files, fixing the underlying bug while adopting the concept's typography
- [x] Centralized the entire component CSS library (previously duplicated verbatim inside every page's `<head>`) into `input.css` / `site_content/styles.css` — one source of truth instead of 6 copies
- [x] Updated `tailwind.config.js` theme colors to match, as a defense-in-depth backstop behind the manual CSS overrides
- [x] Rebuilt via `npm run build` and verified output

### Sprint 2 — Core Layout & Shared Components *(1 day)* — ✅ Complete
- [x] Redesigned header: frosted/backdrop-blur sticky bar (`.site-header`), added a `Request a Report` CTA button (`.btn-primary-sm`) to desktop nav on all 5 pages + template
- [x] Redesigned footer: added a teal top accent border (`.border-brand-accent`) consistently on all 5 pages + template; content unchanged
- [x] New hero pattern for `index.html`: navy→navy-2 gradient background (`.hero-gradient`) replacing the flat dark fill, trust panel rewired onto a reusable `.glass-panel`/`.glass-item`/`.glass-dot` component (frosted glass, teal icon dots) instead of one-off utility classes, subtle fade-up entrance motion (`.reveal-up`, respects `prefers-reduced-motion`)
- [x] Shared reusable component classes consolidated in `input.css`: `.btn-primary` / `.btn-outline` / `.btn-ghost-light` / `.btn-primary-sm`, `.svc-card` / `.svc-detail` / `.val-card` / `.team-card`, `.sec-tag` / `.sec-h2` / `.sec-rule` / `.sec-body`, `.glass-panel` / `.glass-item` / `.glass-dot`, `.chk-list`, `.exp-tag`, `.info-icon` / `.contact-card`, `.avatar` — all now defined once and used across pages instead of being redefined (or missing) per page

### Sprint 3 — Page-by-Page Redesign *(2 days)* — ✅ Complete
- [x] Centralized the dot-grid dark-panel texture (previously a ~9-line inline `style=""` block copy-pasted 14 times across all 5 pages) into one `.panel-texture` component class
- [x] `home-why-items` / `about-why-items`: converted from plain left-border rows to the same `.glass-panel` treatment used by the hero trust panel, so every navy-panel section shares one visual language instead of two competing ones
- [x] Removed dead code found along the way: `whyItemLight()` in `content-loader.js` and its `.why-item` CSS class were never actually called by anything (both `home-why-items` and `about-why-items` render through `whyItemDark`) — deleted rather than left as unused cruft
- [x] `index.html` — rounded corners (`rounded-2xl`) added to the core-commitments and why-choose-us dark panels for visual consistency with the card language elsewhere
- [x] `about.html` — rounded corners on the "defines us" dark panel and the vision/mission cards
- [x] `services.html` — rounded corners on the intro dark stat panel and its 4 stat tiles
- [x] `team.html` — rounded corners on the founder two-panel showcase, the avatar frame, and the 6 areas-of-expertise tiles; added a missing hover state (`hover:border-brand-accent/40`) to those tiles for interactive consistency with every other card on the site
- [x] `contact.html` — rounded corners on the map embed frame
- [x] Verified all 5 pages still return HTTP 200 and render the new classes after every change

### Sprint 4 — Content Alterations — ✅ Complete (2026-07-08)
- [x] **Services restructured into 3 categories** in `site_content/data.json` (`services` array), replacing the previous 5 valuation-only entries — flows automatically into both the homepage summary cards and `services.html` detail cards, no template changes needed:
  1. Property Valuation — Land &amp; Building (7 sub-items)
  2. Planning &amp; Design Services (8 sub-items)
  3. Approval &amp; Documentation Services (7 sub-items)
  - Footer "Our Services" quick-links updated to the 3 new category names across all 6 pages
- [x] **Removed "Bank Empanelled – Multiple Institutions"** from `team[0].qualifications` in `data.json`
- [x] **Added "Our Clients" page** (`clients.html`) — hero, intro, and a `clients-list` grid rendered from a new `data.clients` array via a new `clientCard()` function in `content-loader.js`. Added to header (desktop + mobile) and footer nav on all 7 pages.
  - First entry: SMFG India Credit Co. Ltd. — client model supports `clients[].logo` (renders an `<img>` when set), currently `null` so it falls back to a clean text tile.
  - **Still needed from you:** the actual SMFG India Credit Co. Ltd. logo file. No verified official logo was available in this session, and guessing/fetching a brand logo from an unconfirmed URL risks using the wrong asset for a real company, so nothing was fabricated. Drop the file in `site_content/` and set `"logo": "./site_content/<filename>"` in `data.json` — the image will render automatically, no code changes needed.

### Sprint 5 — Responsive, Accessibility & Polish *(1 day)* — ✅ Complete
- [x] **Mobile keyboard/screen-reader bug found and fixed**: the mobile nav toggle was a `<label>` + `<input type="checkbox" class="hidden">`. `display:none` removes an element from the tab order entirely, so keyboard and screen-reader users could not open the mobile menu at all, on any page. Replaced with a real `<button aria-expanded aria-controls>` wired up by a small handler in `content-loader.js`, and a `.mobile-nav`/`.is-open` class toggle in `input.css` instead of the `peer-checked:` mechanism.
- [x] Added the "Request a Report" CTA to the mobile menu too — it was only ever added to the desktop nav in Sprint 2, so mobile visitors were missing it.
- [x] Added visible `:focus-visible` outlines (teal, 2px) to nav links, all button variants, and the mobile toggle — none had explicit focus styling before.
- [x] **Contrast audit (computed WCAG ratios, not eyeballed)** — found and fixed 3 real AA failures introduced/inherited by the Concept C palette:
  - Teal accent text (`#14b8a6`) on white was **2.49:1** (needs 4.5:1) — affects every `.sec-tag` eyebrow label sitewide. Fixed by giving `.sec-tag` a darker on-light default (`--ba-text`, teal-700 `#0f766e`, 5.47:1), with the 3 instances that legitimately sit on navy panels (index.html "What We Do"/"Our Purpose", about.html "Our Principles") explicitly kept on the brighter teal via `text-brand-accent`.
  - Muted slate text (`#64748b`) on navy panels was **3.84:1** (needs 4.5:1) — affects glass-panel items, footer text, and every dark-variant card (`.svc-dark`, `.cv-dark`, `.vm-dark-card`, `.qual-panel`, `.contact-card`). Fixed by re-pointing the `--bm` custom property to a lighter inverse (`--bm-inverse`, slate-400 `#94a3b8`, 7.13:1) inside those container scopes — no markup changes needed since it's a CSS variable cascade.
  - Footer's trailing "Asset Valuation Firm · Tamil Nadu" line was using `text-brand-muted/40`, **1.69:1**. Dropped the `/40` opacity — full-opacity muted-inverse now reads at 7.13:1. Removed the now-dead `.text-brand-muted\/40` CSS rule (nothing else used it).
- [x] Image performance: removed `logo_old.png` + `logo_old_1.png` (~1.4MB, confirmed unused — only `logo.png` is referenced anywhere), added explicit `width`/`height` to the logo and founder photo to prevent layout shift, added `loading="lazy" decoding="async"` to the founder photo.
- [x] `font-display: swap` already in place from Sprint 1 — confirmed, no action needed.
- [x] Verified all 5 pages still return HTTP 200 and render the new attributes/classes after every change

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
