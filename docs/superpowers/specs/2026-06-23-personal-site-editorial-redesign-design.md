# robertosequeira.info — editorial light redesign

**Date:** 2026-06-23
**Status:** Built and shipped to `master`. See "As-built revisions" below for decisions made after approval.

## As-built revisions (post-approval)

During the final `/impeccable audit` two flagged AI tells were removed, superseding the spec where they conflict:

- **Section headers:** the numbered markers (`01/02/03`) and uppercase tracked eyebrow labels were dropped in favor of quiet sentence-case terracotta labels (`.entry-label`); the masthead kicker is likewise sentence-case. No two-column rail. (Audit: numbered markers + eyebrows are saturated AI-grammar tells.)
- **`--muted` (light):** darkened from `#9A8E80` to `#6E6356` to pass WCAG AA (2.98:1 → 5.45:1) for the language toggle.
- **Reveal:** gated on a `.js` class (inline `<head>` script) so content is never hidden without JS.
- **Body em-dashes:** reduced to ≤2 per page (AI-cadence tell); the body copy is otherwise unchanged.
- **Tooling:** `single-font` detector rule ignored in `.impeccable/config.json` — a false positive, since Spectral/Space Mono are applied via external CSS the per-file HTML scan can't see.

## Why

The current site (dark-blue gradient hero, floating skill chips, Cormorant Garamond + Plus Jakarta Sans) drew fair criticism: strong writing, invisible design. The visual treatment makes no deliberate choice, has no hierarchy beyond font size, no signature element, a dead-end contact section, and an unstyled tech-stack block. This redesign keeps the writing's honesty and replaces the visual layer with a refined, light, editorial system that reads as a deliberate choice.

## Job of the site

A personal home base that also reads as a strong, credible professional signal. **No sales / consulting angle.** Optimized to represent who Roberto is and to leave a memorable, professional impression — not to convert leads.

## Guiding principles

- **Honest and modest.** Copy stays at a high altitude. No employer specifics, no project/architecture details, nothing that reads as overqualified or as a claim that would need defending. This is not LinkedIn. The trust the current writing earns (e.g. the Coopeldos story) is preserved.
- **Memorable through craft, not loudness.** Restraint is the point — but restraint executed precisely, so it reads as deliberate rather than as "no choice was made."
- **No blue.** The dark-blue hero gradient is removed entirely.

## Aesthetic direction

Refined editorial, light. Warm off-white paper, deep ink text, a single terracotta accent. Strong typographic contrast (display serif vs. humanist sans) plus a monospace voice for structure carries the personality. Warm and human, leaning gently into the personal / Costa Rica side without becoming informal.

## Design system

### Type ("Terra")

Replaces both current font families. All freely available via Google Fonts.

| Role | Font | Replaces |
|------|------|----------|
| Display — name, section titles | **Spectral** (500/600/700) | Cormorant Garamond |
| Body & UI | **Figtree** (400/500/600/700) | Plus Jakarta Sans (flagged as overused) |
| Mono — kickers, section numbers, labels | **Space Mono** (400/700) | — (new "engineer" voice) |

### Color — light (default)

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#FBF6EE` | page background |
| `--card` | `#FFFFFF` | pill backgrounds, raised surfaces |
| `--ink` | `#241F1A` | primary text, name, links |
| `--body` | `#5C5247` | body prose |
| `--muted` | `#9A8E80` | labels, secondary mono |
| `--line` | `#EADFCF` | hairline rules, dividers, pill borders |
| `--accent` | `#B0471E` | terracotta — featured pill, section numbers, kicker, link underline on hover |
| `--footer-bg` | `#241F1A` | dark signature footer |
| `--footer-accent` | `#C99A6A` | warm label inside footer |

### Color — dark (`prefers-color-scheme: dark`)

Warm dark, not the old cold navy. Terracotta brightened for contrast.

| Token | Value |
|-------|-------|
| `--paper` | `#1A1714` |
| `--card` | `#221E1A` |
| `--ink` | `#F2ECE3` |
| `--body` | `#B8AFA2` |
| `--muted` | `#8A7F72` |
| `--line` | `#342E27` |
| `--accent` | `#D2693C` |
| `--footer-bg` | `#120F0D` |
| `--footer-accent` | `#C99A6A` |

`theme-color` meta tags update to `#FBF6EE` (light) / `#1A1714` (dark).

All text/background pairings must meet WCAG AA (≥4.5:1 for body, ≥3:1 for large display). Verify accent-on-paper and footer pairings during build.

## Layout (Direction A — editorial masthead)

Single column, max-width ~760px, centered, generous padding. Three zones:

### 1. Masthead (replaces hero zone)

- Top bar: SVG logo mark (existing) left, language toggle (`EN` / `ES`) right — pill style, mono label.
- Mono kicker: `Director Asociado de Ingeniería · Costa Rica`.
- Name: `Roberto Sequeira`, large Spectral.
- Thin full-width rule (`--line`).
- Tagline: short, honest one-liner (see Copy below).
- Skill **pills**: bordered, scannable; `AI Agents` featured in terracotta (outlined accent), the rest neutral outlined. Replaces the floating chip cloud. Visible on mobile (unlike the old chips).
- Links row: **GitHub · LinkedIn · Email** — fixes the dead-end contact. Real URLs:
  - GitHub: https://github.com/robertosequeira
  - LinkedIn: https://www.linkedin.com/in/robertosequeiraarias/
  - Email: hola@robertosequeira.info

### 2. Numbered sections

Two-column grid: left rail = mono number + label (`01` / `Sobre mí`); right = Spectral title + Figtree prose. Warm hairline divider between sections. Order **unchanged**: About → Now → Other work.

On mobile (≤640px) the rail collapses above the content (number + label inline, then title + prose).

### 3. Signature footer

Inverts to deep ink (`--footer-bg`). Mono terracotta label `Contacto`, email set large in Spectral, GitHub/LinkedIn links with `↗`. Gives the page a memorable close instead of a bare email.

## Copy

Body copy is **kept as-is** (it tested well), with at most light polish for the new layout. No new specifics about current work.

**Hero tagline** (reworked — the feedback called the original generic). **Chosen:**

- Spanish (`index.html`): *Dieciséis años construyendo software, y ahora también el equipo que lo construye.*
- English (`en/index.html`): *Sixteen years building software — and now the team that builds it.*

**"Now" section** — polished (abstract, honest, no specifics/overclaim). **Final copy:**

Spanish (`index.html`):
> **Agentes de IA, en la práctica.**
> Estos días mi trabajo gira en torno a agentes de IA y sistemas multi-agente — menos teoría, más construir y ver qué se rompe. Es la forma más honesta que conozco de entender una tecnología nueva.
>
> En paralelo está lo que no tiene framework ni ciclo de releases: liderazgo, comunicación, ayudar a un equipo a crecer. Cuanto más tiempo llevo en el rol, más claro tengo que eso no se termina de aprender.

English (`en/index.html`):
> **AI agents, in practice.**
> These days my work centers on AI agents and multi-agent systems — less theory, more building things and seeing what breaks. It's the most honest way I know to understand a new technology.
>
> Alongside it is the part with no framework or release cycle: leadership, communication, helping a team grow. The longer I'm in the role, the clearer it is that you never quite finish learning it.

The other two body sections (About, Other work) are kept verbatim.

## Responsive behavior

- Single column throughout; max-width ~760px.
- Skill pills wrap and remain visible on mobile.
- Section grid collapses to stacked (label above content) at ≤640px.
- Fluid type via `clamp()`; name scales down gracefully on small screens.

## Motion & accessibility

- Keep the existing single `IntersectionObserver` reveal-on-scroll (add `.visible` once, then unobserve).
- Keep `prefers-reduced-motion` disabling all animation/transition.
- Keep visible focus styles (`:focus-visible` outline in accent).
- Semantic landmarks (`header`, `main`, `footer`), `aria-label`s on sections, `hreflang` on the language toggle, descriptive `alt`/`aria-hidden` on the logo.
- Links have ≥44px touch targets.

## Bilingual parity

`index.html` (Spanish, default) and `en/index.html` (English) stay structurally identical; only translated text differs. Both use the shared `style.css`. Any structural edit to one is mirrored in the other (per CLAUDE.md rule).

## Files touched

- `index.html` — re-marked-up masthead, sections, footer; new fonts; new tagline.
- `en/index.html` — mirror of the above, translated.
- `style.css` — rewritten around the Terra system and new tokens (light + dark).
- `favicon.svg` — unchanged (logo mark reused as-is).
- `*-old.*` reference files — untouched.
- No build system, no package manager, no new dependencies. Deployment (GitHub Pages, CNAME) unchanged.

## Out of scope

- Adding new content sections, blog, or projects gallery.
- Any consulting/lead-gen elements.
- Changes to `signature/` (separate concern).
- Analytics or third-party scripts.

## Validation

- Preview locally with `python3 -m http.server 8080`.
- Check light + dark, mobile + desktop, reduced-motion, and keyboard focus order.
- Confirm contrast ratios for the terracotta accent and the dark footer.
- Run `/impeccable audit` on the final HTML/CSS before completion.

## Open items

None — all decisions resolved (tagline, "Now" copy, layout, type, color).
