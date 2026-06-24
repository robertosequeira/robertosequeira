# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static personal site for robertosequeira.info. No build system, no package manager — pure HTML, CSS, and a small inline script. Deployed via GitHub Pages (CNAME set to `robertosequeira.info`).

## Previewing locally

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Structure

- `index.html` — Spanish version (root, default language)
- `en/index.html` — English version; mirrors the Spanish content but links back to `../`
- `style.css` — single shared stylesheet used by both language versions
- `favicon.svg` — SVG favicon matching the logo SVG inline in both HTML files
- `signature/` — standalone email signature (separate concern, not part of the main site)
- `*-old.*` files — previous design versions kept as reference; do not delete

## Design system

Refined, light, editorial. Single column, `max-width: var(--wrap)` (760px), centered via the `.wrap` container.

Three font families from Google Fonts:
- **Spectral** (500/600/700) — name (`.name`), section titles (`.entry-title`), footer email
- **Figtree** (400–700) — body copy, UI, skill pills, the masthead kicker, and section labels
- **Space Mono** (400/700) — small UI chrome only: the language toggle (`.lang`) and the footer label

CSS custom properties in `:root` drive the entire palette; dark mode overrides them via `@media (prefers-color-scheme: dark)`. Warm paper (`--paper #FBF6EE`), deep ink, single terracotta accent (`--accent #B0471E`). **No blue anywhere.** `theme-color` metas track light/dark. The footer is a full-width dark band (`--footer-bg`).

Layout zones: `.topbar` (logo + lang toggle) → `.masthead` (kicker, name, `.rule`, tagline, `.skills` pills, `.links`) → `.sections` of `.entry` blocks (sentence-case `.entry-label`, `.entry-title`, prose) → dark `.site-footer`. Skill tags are `<li class="pill">` (the featured one is `.pill-accent`); they wrap and stay visible on mobile.

**Deliberate anti-tell choices — do not reintroduce:** no numbered section markers (`01/02/03`), no uppercase tracked "eyebrow" labels, and keep body copy at ≤2 em-dashes per page. These were removed in an `/impeccable` audit because they read as AI-generated. `.impeccable/config.json` ignores the `single-font` rule (a false positive — the serif/mono are applied via external CSS the per-file scan can't see).

Reveal animations (`.entry`, footer) use a single `IntersectionObserver` that adds `.visible` once and unobserves. The reveal is **gated on a `.js` class** (added by an inline `<head>` script) so content is never hidden when JS is off. `prefers-reduced-motion` disables all animations and forces content visible.

## Bilingual parity rule

Both `index.html` and `en/index.html` must stay in sync on structure, skill pills, and layout. When editing one, apply the equivalent change to the other. Content is translated; markup structure is identical.

## Design docs

Spec and implementation plan for the current design live in `docs/superpowers/specs/` and `docs/superpowers/plans/`.
