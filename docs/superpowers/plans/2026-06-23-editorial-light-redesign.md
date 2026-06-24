# Editorial Light Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark-blue hero design with a refined, light, editorial system (warm paper, deep ink, terracotta accent; Spectral + Figtree + Space Mono) across both language versions of the static site.

**Architecture:** Pure static HTML/CSS, no build system. A single shared `style.css` driven by CSS custom properties (light + dark via `prefers-color-scheme`). Two structurally-identical HTML files (`index.html` ES, `en/index.html` EN). One inline `IntersectionObserver` for scroll reveals, already present and reused.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, `clamp()`), Google Fonts (Spectral, Figtree, Space Mono), vanilla JS (IntersectionObserver). Deployed via GitHub Pages from `master`.

## Global Constraints

- No build system, no package manager, no new runtime dependencies — edit HTML/CSS directly.
- Spec: `docs/superpowers/specs/2026-06-23-personal-site-editorial-redesign-design.md`.
- **No automated test suite exists** (consistent with the repo). "Verify" steps are manual browser previews with a concrete expected observation. Preview with `python3 -m http.server 8080` → `http://localhost:8080`.
- **Bilingual parity:** `index.html` and `en/index.html` are structurally identical; only translated text differs. Both link to the shared `/style.css` (root) / `../style.css` (en). Mirror every structural change.
- **Copy is fixed by the spec** — use the exact strings in this plan. No employer specifics, no new claims.
- **No blue anywhere.** Palette tokens are the only source of color.
- Keep: SVG logo mark + `favicon.svg` (unchanged), reveal-on-scroll, `prefers-reduced-motion` handling, visible focus styles, semantic landmarks, dark-mode support.
- Leave `*-old.*` reference files untouched.
- Commit directly to `master` (user confirmed for this repo).
- Fonts to load (both HTML files): `Spectral:wght@500;600;700`, `Figtree:wght@400;500;600;700`, `Space+Mono:wght@400;700`.
- Palette — light: `--paper #FBF6EE`, `--card #FFFFFF`, `--ink #241F1A`, `--body #5C5247`, `--muted #9A8E80`, `--line #EADFCF`, `--accent #B0471E`, `--footer-bg #241F1A`, `--footer-fg #FBF6EE`, `--footer-accent #C99A6A`.
- Palette — dark: `--paper #1A1714`, `--card #221E1A`, `--ink #F2ECE3`, `--body #B8AFA2`, `--muted #8A7F72`, `--line #342E27`, `--accent #D2693C`, `--footer-bg #120F0D`, `--footer-fg #F2ECE3`, `--footer-accent #C99A6A`.
- Links: GitHub `https://github.com/robertosequeira`, LinkedIn `https://www.linkedin.com/in/robertosequeiraarias/`, Email `mailto:hola@robertosequeira.info`.

## File Structure

- `index.html` — Spanish page (root). Full rewrite of `<head>` font/meta and `<body>` markup; reveal script reused.
- `en/index.html` — English mirror of the above.
- `style.css` — full rewrite around the new token system. Built up in zones across Tasks 1–5.
- `favicon.svg`, `signature/`, `*-old.*` — untouched.

---

### Task 1: New foundation — markup + CSS base (Spanish)

Rewrites `index.html` to the new structure and replaces `style.css` with the reset, tokens, base typography, and layout wrapper. Deliverable: a coherent, correct (if visually plain) page — warm paper background, new fonts, all content and links present and stacked in order.

**Files:**
- Modify (full rewrite): `index.html`
- Modify (full rewrite): `style.css`

**Interfaces:**
- Produces: CSS custom properties on `:root` (see Global Constraints); `.wrap` layout container (`max-width: var(--wrap); margin:0 auto; horizontal padding var(--pad)`); body using `Figtree`. Markup classes consumed by later tasks: `.topbar`, `.logo`, `.lang`, `.masthead`, `.kicker`, `.name`, `.rule`, `.tagline`, `.skills`, `.pill`, `.pill-accent`, `.links`, `.sections`, `.entry`, `.entry-rail`, `.entry-num`, `.entry-label`, `.entry-title`, `.entry-body`, `.site-footer`, `.footer-inner`, `.footer-label`, `.footer-mail`, `.footer-links`, `.reveal`.

- [ ] **Step 1: Replace `index.html` with the new markup**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Roberto Sequeira — Director Asociado de Ingeniería en Costa Rica. Dieciséis años construyendo software.">
  <meta name="author" content="Roberto Sequeira">
  <title>Roberto Sequeira</title>

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://robertosequeira.info/">
  <meta property="og:title" content="Roberto Sequeira">
  <meta property="og:description" content="Director Asociado de Ingeniería. Dieciséis años construyendo software, y ahora también el equipo que lo construye.">
  <meta property="og:locale" content="es">
  <meta property="og:locale:alternate" content="en">

  <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FBF6EE">
  <meta name="theme-color" media="(prefers-color-scheme: dark)"  content="#1A1714">

  <link rel="icon" href="favicon.svg" type="image/svg+xml">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Spectral:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header class="topbar wrap">
    <a href="/" class="logo" aria-label="Roberto Sequeira — inicio">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="32" height="32" aria-hidden="true">
        <g transform="matrix(0.6667,0,0,0.6667,0,0)" stroke="none" fill="currentColor">
          <path d="M89.209.791A2.715 2.715 0 0 0 87.3 0H2.7C1.988 0 1.293.288.79.791A2.717 2.717 0 0 0 0 2.7v84.6A2.706 2.706 0 0 0 2.7 90h84.6c.711 0 1.407-.288 1.909-.792A2.717 2.717 0 0 0 90 87.3V2.7c0-.71-.289-1.405-.791-1.909zM84.6 45.02h-9.925a11.695 11.695 0 0 1 3.424 8.279c0 6.479-5.251 11.729-11.729 11.729s-11.73-5.251-11.73-11.73c0-3.23 1.31-6.157 3.427-8.278H44.979v-.002h.045V31.931a11.686 11.686 0 0 0 8.28 3.425c6.479 0 11.728-5.251 11.728-11.729 0-6.479-5.249-11.73-11.728-11.73-3.232 0-6.159 1.31-8.28 3.424V5.398h39.574L84.6 45.02zm-79.202-.038h9.928a11.695 11.695 0 0 1-3.424-8.28c0-6.479 5.251-11.728 11.73-11.728 6.478 0 11.729 5.25 11.729 11.728 0 3.232-1.309 6.159-3.426 8.28h13.087v.002h-.045v13.087a11.688 11.688 0 0 0-8.28-3.425c-6.479 0-11.728 5.251-11.728 11.729 0 6.479 5.249 11.729 11.728 11.729 3.232 0 6.159-1.311 8.28-3.425v9.92H5.398V44.982z"/>
        </g>
      </svg>
    </a>
    <a href="./en/" class="lang" lang="en" hreflang="en">EN</a>
  </header>

  <main>
    <section class="masthead wrap" aria-label="Presentación">
      <p class="kicker">Director Asociado de Ingeniería · Costa Rica</p>
      <h1 class="name">Roberto Sequeira</h1>
      <hr class="rule">
      <p class="tagline">Dieciséis años construyendo software, y ahora también el equipo que lo construye.</p>
      <ul class="skills" aria-label="Tecnologías">
        <li class="pill pill-accent">AI Agents</li>
        <li class="pill">Multi-Agent</li>
        <li class="pill">Claude Code</li>
        <li class="pill">Ruby on Rails</li>
        <li class="pill">TypeScript</li>
        <li class="pill">React</li>
        <li class="pill">JavaScript</li>
        <li class="pill">AWS</li>
        <li class="pill">Ruby</li>
        <li class="pill">C#</li>
        <li class="pill">Angular</li>
        <li class="pill">PostgreSQL</li>
      </ul>
      <nav class="links" aria-label="Enlaces">
        <a href="https://github.com/robertosequeira" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/robertosequeiraarias/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:hola@robertosequeira.info">Email</a>
      </nav>
    </section>

    <div class="sections wrap">

      <section class="entry reveal" aria-label="Sobre mí">
        <div class="entry-rail"><span class="entry-num">01</span><span class="entry-label">Sobre mí</span></div>
        <div class="entry-body">
          <h2 class="entry-title">Dieciséis años y contando.</h2>
          <p>Empecé a programar en 2009. La primera década fue en una empresa de outsourcing — lo que me dio exposición temprana y variada: distintos clientes, tecnologías e industrias. C#, Ruby, Rails, Angular; seguros, software para organizaciones sin fines de lucro, software empresarial. Pocas cosas desarrollan la versatilidad técnica más rápido que entrar a un dominio nuevo con la expectativa de entregar resultados.</p>
          <p>En 2021 me uní a una empresa de producto, y ese bagaje acumulado empezó a dar resultados. Con mayor propiedad llegó la oportunidad de introducir herramientas y prácticas que el equipo no había tenido la oportunidad de conocer — aportes que marcaron la diferencia en la migración completa del frontend de Ember a React. Una década adaptándose construye algo; tener el espacio para aplicarlo es cuando ese algo se multiplica. No fue un esfuerzo individual, pero proponer cosas y verlas funcionar tiene su propia satisfacción.</p>
          <p>Hoy soy Director Asociado de Ingeniería y tech lead, con tres personas a mi cargo y un equipo trabajando en un producto centrado en agentes de IA. Sigo escribiendo código, sigo aprendiendo.</p>
        </div>
      </section>

      <section class="entry reveal" aria-label="Ahora">
        <div class="entry-rail"><span class="entry-num">02</span><span class="entry-label">Ahora</span></div>
        <div class="entry-body">
          <h2 class="entry-title">Agentes de IA, en la práctica.</h2>
          <p>Estos días mi trabajo gira en torno a agentes de IA y sistemas multi-agente — menos teoría, más construir y ver qué se rompe. Es la forma más honesta que conozco de entender una tecnología nueva.</p>
          <p>En paralelo está lo que no tiene framework ni ciclo de releases: liderazgo, comunicación, ayudar a un equipo a crecer. Cuanto más tiempo llevo en el rol, más claro tengo que eso no se termina de aprender.</p>
        </div>
      </section>

      <section class="entry reveal" aria-label="Otros proyectos">
        <div class="entry-rail"><span class="entry-num">03</span><span class="entry-label">Otros proyectos</span></div>
        <div class="entry-body">
          <h2 class="entry-title">Compromisos que perduran.</h2>
          <p>En 2018 desarrollé una aplicación en Rails para un cliente independiente — la entregué rápidamente, en el mejor momento de mi experiencia con ese stack. El proyecto estuvo en pausa, regresó como empresa independiente. La plataforma tenía múltiples componentes y otros desarrolladores manejaban integraciones con sistemas externos, pero fui la única persona a cargo del núcleo en Rails y su infraestructura de principio a fin. Con el tiempo, el equipo creció. Una de las experiencias más completas que he tenido.</p>
          <p>También he apoyado la presencia web de <a href="https://coopeldos.com" target="_blank" rel="noopener">Coopeldos</a> por más de una década — una cooperativa cafetalera cerca de mi pueblo que trabaja con pequeños productores de la zona, incluyendo mi familia desde principios de los ochenta. Renovar el dominio, gestionar el correo en Zoho, mantener todo funcionando. Hay cosas que simplemente no se sueltan.</p>
        </div>
      </section>

    </div>
  </main>

  <footer class="site-footer reveal">
    <div class="footer-inner">
      <div>
        <p class="footer-label">Contacto</p>
        <a href="mailto:hola@robertosequeira.info" class="footer-mail">hola@robertosequeira.info</a>
      </div>
      <nav class="footer-links" aria-label="Redes">
        <a href="https://github.com/robertosequeira" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/robertosequeiraarias/" target="_blank" rel="noopener">LinkedIn ↗</a>
      </nav>
    </div>
  </footer>

  <script>
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  </script>

</body>
</html>
```

- [ ] **Step 2: Replace `style.css` with reset, tokens, base, and `.wrap`**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --paper:         #FBF6EE;
  --card:          #FFFFFF;
  --ink:           #241F1A;
  --body:          #5C5247;
  --muted:         #9A8E80;
  --line:          #EADFCF;
  --accent:        #B0471E;
  --footer-bg:     #241F1A;
  --footer-fg:     #FBF6EE;
  --footer-accent: #C99A6A;
  --wrap:          760px;
  --pad:           clamp(1.5rem, 5vw, 3.5rem);
}

@media (prefers-color-scheme: dark) {
  :root {
    --paper:         #1A1714;
    --card:          #221E1A;
    --ink:           #F2ECE3;
    --body:          #B8AFA2;
    --muted:         #8A7F72;
    --line:          #342E27;
    --accent:        #D2693C;
    --footer-bg:     #120F0D;
    --footer-fg:     #F2ECE3;
    --footer-accent: #C99A6A;
  }
}

html { font-size: 16px; scroll-behavior: smooth; }

body {
  font-family: 'Figtree', system-ui, sans-serif;
  background-color: var(--paper);
  color: var(--ink);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.wrap {
  max-width: var(--wrap);
  margin: 0 auto;
  padding-left: var(--pad);
  padding-right: var(--pad);
}
```

- [ ] **Step 3: Verify the page renders coherently**

Run: `python3 -m http.server 8080` then open `http://localhost:8080`.
Expected: Warm off-white background; "Roberto Sequeira" in a serif (Spectral); body text in Figtree; kicker, tagline, the 12 skill items, GitHub/LinkedIn/Email links, three numbered sections (01/02/03) with the polished "Ahora" copy, and a contact footer — all present and stacked top to bottom. Layout is unpolished (no grid/footer styling yet) but nothing is broken and every link points to the right URL.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "Rebuild ES markup + CSS foundation for editorial redesign"
```

---

### Task 2: Top bar + masthead styling

**Files:**
- Modify (append): `style.css`

**Interfaces:**
- Consumes: tokens and `.wrap` from Task 1; markup classes `.topbar`, `.logo`, `.lang`, `.masthead`, `.kicker`, `.name`, `.rule`, `.tagline`, `.skills`, `.pill`, `.pill-accent`, `.links`.
- Produces: `@keyframes fadeUp` (also used by Task 4's reduced-motion rule).

- [ ] **Step 1: Append top bar + masthead CSS to `style.css`**

```css
/* ─── Top bar ─── */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
}

.logo {
  display: inline-flex;
  width: 32px;
  height: 32px;
  color: var(--ink);
  transition: color 0.2s;
}
.logo:hover { color: var(--accent); }

.lang {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  border: 1px solid var(--line);
  border-radius: 2rem;
  padding: 0 0.85rem;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s, border-color 0.2s;
}
.lang:hover { color: var(--ink); border-color: var(--muted); }

/* ─── Masthead ─── */
.masthead {
  padding-top: 1.5rem;
  padding-bottom: 3.5rem;
}

.kicker {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.25rem;
}

.name {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 600;
  font-size: clamp(2.75rem, 8vw, 4rem);
  line-height: 0.98;
  letter-spacing: -0.015em;
  color: var(--ink);
  animation: fadeUp 0.6s 0.05s ease-out both;
}

.rule {
  border: 0;
  height: 1px;
  background: var(--line);
  margin: 1.75rem 0 1.5rem;
}

.tagline {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--body);
  max-width: 42ch;
  animation: fadeUp 0.55s 0.18s ease-out both;
}

.skills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.75rem;
}
.pill {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--body);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 2rem;
  padding: 0.35rem 0.8rem;
}
.pill-accent {
  color: var(--accent);
  border-color: var(--accent);
  background: transparent;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1.75rem;
}
.links a {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1.5px solid var(--line);
  padding-bottom: 2px;
  transition: border-color 0.2s, color 0.2s;
}
.links a:hover { color: var(--accent); border-color: var(--accent); }

/* ─── Animations ─── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
```

- [ ] **Step 2: Verify the masthead**

Run: refresh `http://localhost:8080`.
Expected: Logo + `EN` pill on one row at top. Terracotta mono kicker, large serif name (fades up on load), a thin warm rule, the tagline (≤42ch wide), a wrapping row of bordered pills with "AI Agents" outlined in terracotta, then GitHub/LinkedIn/Email with hairline underlines that turn terracotta on hover.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Style top bar and editorial masthead"
```

---

### Task 3: Numbered sections styling

**Files:**
- Modify (append): `style.css`

**Interfaces:**
- Consumes: tokens from Task 1; markup classes `.sections`, `.entry`, `.entry-rail`, `.entry-num`, `.entry-label`, `.entry-title`, `.entry-body`.

- [ ] **Step 1: Append section CSS to `style.css`**

```css
/* ─── Sections ─── */
.sections { padding-bottom: 1rem; }

.entry {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 2rem;
  padding: 3.25rem 0;
}
.entry + .entry { border-top: 1px solid var(--line); }

.entry-num {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: var(--accent);
  display: block;
}
.entry-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--muted);
  display: block;
  margin-top: 0.4rem;
}

.entry-title {
  font-family: 'Spectral', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 1.95rem);
  line-height: 1.12;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 1rem;
}

.entry-body p {
  font-size: 1rem;
  line-height: 1.78;
  color: var(--body);
}
.entry-body p + p { margin-top: 1rem; }

.entry-body a {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--accent);
  transition: color 0.2s;
}
.entry-body a:hover { color: var(--accent); }
```

- [ ] **Step 2: Verify the sections**

Run: refresh `http://localhost:8080`.
Expected: Each section is a two-column row — left rail shows the terracotta mono number (`01`) above an uppercase mono label (`Sobre mí`); right column shows the serif title and Figtree prose. Hairline dividers separate the three entries. The Coopeldos link in section 03 has a terracotta underline.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Style numbered editorial sections"
```

---

### Task 4: Footer, reveal, focus, responsive, reduced motion

**Files:**
- Modify (append): `style.css`

**Interfaces:**
- Consumes: tokens from Task 1; `@keyframes fadeUp` from Task 2; markup classes `.site-footer`, `.footer-inner`, `.footer-label`, `.footer-mail`, `.footer-links`, `.reveal`, plus `.entry`/`.entry-rail`/`.entry-label`/`.name`/`.tagline`/`.footer-inner` for the responsive + reduced-motion rules.

- [ ] **Step 1: Append footer, reveal, focus, responsive, and reduced-motion CSS to `style.css`**

```css
/* ─── Footer ─── */
.site-footer {
  background: var(--footer-bg);
  color: var(--footer-fg);
  margin-top: 2rem;
}
.footer-inner {
  max-width: var(--wrap);
  margin: 0 auto;
  padding: 3.5rem var(--pad);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.footer-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--footer-accent);
  margin-bottom: 0.6rem;
}
.footer-mail {
  font-family: 'Spectral', Georgia, serif;
  font-size: clamp(1.25rem, 4vw, 1.6rem);
  font-weight: 600;
  color: var(--footer-fg);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-mail:hover { color: var(--footer-accent); }
.footer-links {
  display: flex;
  gap: 1.25rem;
}
.footer-links a {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--footer-fg);
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.2s;
}
.footer-links a:hover { opacity: 1; }

/* ─── Reveal ─── */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.reveal.visible { opacity: 1; transform: none; }

/* ─── Focus ─── */
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ─── Responsive ─── */
@media (max-width: 640px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 2.5rem 0;
  }
  .entry-rail {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
  }
  .entry-label { margin-top: 0; }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .name, .tagline { animation: none; opacity: 1; transform: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Verify footer, reveal, responsive, and reduced motion**

Run: refresh `http://localhost:8080`.
Expected:
- Footer is a full-width deep-ink bar: terracotta `Contacto` label, large serif email, GitHub/LinkedIn links (↗) at right.
- Sections fade/slide in as you scroll (reveal).
- Narrow the window below 640px: section rails collapse to an inline `01 Sobre mí` above each title; footer stacks vertically.
- Tab through the page: links show a terracotta focus outline.
- In OS "reduce motion" mode: no fade/slide; everything visible immediately.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "Style footer; add reveal, focus, responsive, reduced-motion"
```

---

### Task 5: Mirror to English (`en/index.html`)

**Files:**
- Modify (full rewrite): `en/index.html`

**Interfaces:**
- Consumes: the shared `../style.css` (already complete after Task 4); identical class structure to `index.html`.

- [ ] **Step 1: Replace `en/index.html` with the English mirror**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Roberto Sequeira — Associate Director of Engineering in Costa Rica. Sixteen years building software.">
  <meta name="author" content="Roberto Sequeira">
  <title>Roberto Sequeira</title>

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://robertosequeira.info/en/">
  <meta property="og:title" content="Roberto Sequeira">
  <meta property="og:description" content="Associate Director of Engineering. Sixteen years building software — and now the team that builds it.">
  <meta property="og:locale" content="en">
  <meta property="og:locale:alternate" content="es">

  <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FBF6EE">
  <meta name="theme-color" media="(prefers-color-scheme: dark)"  content="#1A1714">

  <link rel="icon" href="../favicon.svg" type="image/svg+xml">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Spectral:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../style.css">
</head>
<body>

  <header class="topbar wrap">
    <a href="../" class="logo" aria-label="Roberto Sequeira — home">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="32" height="32" aria-hidden="true">
        <g transform="matrix(0.6667,0,0,0.6667,0,0)" stroke="none" fill="currentColor">
          <path d="M89.209.791A2.715 2.715 0 0 0 87.3 0H2.7C1.988 0 1.293.288.79.791A2.717 2.717 0 0 0 0 2.7v84.6A2.706 2.706 0 0 0 2.7 90h84.6c.711 0 1.407-.288 1.909-.792A2.717 2.717 0 0 0 90 87.3V2.7c0-.71-.289-1.405-.791-1.909zM84.6 45.02h-9.925a11.695 11.695 0 0 1 3.424 8.279c0 6.479-5.251 11.729-11.729 11.729s-11.73-5.251-11.73-11.73c0-3.23 1.31-6.157 3.427-8.278H44.979v-.002h.045V31.931a11.686 11.686 0 0 0 8.28 3.425c6.479 0 11.728-5.251 11.728-11.729 0-6.479-5.249-11.73-11.728-11.73-3.232 0-6.159 1.31-8.28 3.424V5.398h39.574L84.6 45.02zm-79.202-.038h9.928a11.695 11.695 0 0 1-3.424-8.28c0-6.479 5.251-11.728 11.73-11.728 6.478 0 11.729 5.25 11.729 11.728 0 3.232-1.309 6.159-3.426 8.28h13.087v.002h-.045v13.087a11.688 11.688 0 0 0-8.28-3.425c-6.479 0-11.728 5.251-11.728 11.729 0 6.479 5.249 11.729 11.728 11.729 3.232 0 6.159-1.311 8.28-3.425v9.92H5.398V44.982z"/>
        </g>
      </svg>
    </a>
    <a href="../" class="lang" lang="es" hreflang="es">ES</a>
  </header>

  <main>
    <section class="masthead wrap" aria-label="Introduction">
      <p class="kicker">Associate Director of Engineering · Costa Rica</p>
      <h1 class="name">Roberto Sequeira</h1>
      <hr class="rule">
      <p class="tagline">Sixteen years building software — and now the team that builds it.</p>
      <ul class="skills" aria-label="Technologies">
        <li class="pill pill-accent">AI Agents</li>
        <li class="pill">Multi-Agent</li>
        <li class="pill">Claude Code</li>
        <li class="pill">Ruby on Rails</li>
        <li class="pill">TypeScript</li>
        <li class="pill">React</li>
        <li class="pill">JavaScript</li>
        <li class="pill">AWS</li>
        <li class="pill">Ruby</li>
        <li class="pill">C#</li>
        <li class="pill">Angular</li>
        <li class="pill">PostgreSQL</li>
      </ul>
      <nav class="links" aria-label="Links">
        <a href="https://github.com/robertosequeira" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/robertosequeiraarias/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:hola@robertosequeira.info">Email</a>
      </nav>
    </section>

    <div class="sections wrap">

      <section class="entry reveal" aria-label="About">
        <div class="entry-rail"><span class="entry-num">01</span><span class="entry-label">About</span></div>
        <div class="entry-body">
          <h2 class="entry-title">Sixteen years and counting.</h2>
          <p>I started coding in 2009. The first decade was at an outsourcing company — which gave me early, broad exposure across clients, stacks, and industries. C#, Ruby, Rails, Angular; insurance, nonprofit tech, enterprise software. Few things develop technical range faster than being dropped into a new domain and asked to deliver.</p>
          <p>In 2021 I joined a product company, and that accumulated experience started paying dividends. With more ownership came the chance to introduce tools and practices the team hadn't encountered — contributions that shaped a full frontend rewrite from Ember to React. A decade of adapting across domains builds something; having the room to apply it is when it compounds. Not a one-person effort, but proposing things and seeing them land is a different kind of satisfaction.</p>
          <p>Today I'm Associate Director of Engineering and tech lead, with three direct reports and a team working on a product built around AI agents. Still writing code, still learning.</p>
        </div>
      </section>

      <section class="entry reveal" aria-label="Now">
        <div class="entry-rail"><span class="entry-num">02</span><span class="entry-label">Now</span></div>
        <div class="entry-body">
          <h2 class="entry-title">AI agents, in practice.</h2>
          <p>These days my work centers on AI agents and multi-agent systems — less theory, more building things and seeing what breaks. It's the most honest way I know to understand a new technology.</p>
          <p>Alongside it is the part with no framework or release cycle: leadership, communication, helping a team grow. The longer I'm in the role, the clearer it is that you never quite finish learning it.</p>
        </div>
      </section>

      <section class="entry reveal" aria-label="Other work">
        <div class="entry-rail"><span class="entry-num">03</span><span class="entry-label">Other work</span></div>
        <div class="entry-body">
          <h2 class="entry-title">Long-running commitments.</h2>
          <p>In 2018 I built a Rails app for an independent client — shipped it fast, at the top of my game with the stack. The project went dormant, came back as its own company. The platform had multiple components and other developers owned integrations with external systems, but I was the sole person on the Rails core and its infrastructure end-to-end. The company has since grown the team. One of the most complete end-to-end experiences I've had.</p>
          <p>I've also supported the web presence of <a href="https://coopeldos.com" target="_blank" rel="noopener">Coopeldos</a> for over a decade — a coffee cooperative near my hometown that sources from small local producers, including my family's since the early eighties. Domain renewals, email through Zoho, keeping the lights on. Some things you just don't let go.</p>
        </div>
      </section>

    </div>
  </main>

  <footer class="site-footer reveal">
    <div class="footer-inner">
      <div>
        <p class="footer-label">Contact</p>
        <a href="mailto:hola@robertosequeira.info" class="footer-mail">hola@robertosequeira.info</a>
      </div>
      <nav class="footer-links" aria-label="Social">
        <a href="https://github.com/robertosequeira" target="_blank" rel="noopener">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/robertosequeiraarias/" target="_blank" rel="noopener">LinkedIn ↗</a>
      </nav>
    </div>
  </footer>

  <script>
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  </script>

</body>
</html>
```

- [ ] **Step 2: Verify English parity**

Run: open `http://localhost:8080/en/`.
Expected: Identical layout to the Spanish page with English copy. `EN`↔`ES` toggle round-trips (root `./en/` → `../`). All three links resolve. Same masthead, numbered sections (01/02/03), and dark footer.

- [ ] **Step 3: Commit**

```bash
git add en/index.html
git commit -m "Mirror editorial redesign to English page"
```

---

### Task 6: Final QA — contrast, dark mode, audit

**Files:**
- Modify (only if the audit/QA surfaces issues): `style.css`, `index.html`, `en/index.html`

**Interfaces:**
- Consumes: the complete site from Tasks 1–5.

- [ ] **Step 1: Run the impeccable design audit**

Run: `/impeccable audit`
Expected: No unresolved findings. The flagged Plus Jakarta Sans / Cormorant Garamond are gone; Spectral, Figtree, and Space Mono are the only families. If any font is flagged as overused, stop and raise it with the user rather than suppressing it.

- [ ] **Step 2: Check dark mode**

Run: toggle OS appearance to Dark, refresh `http://localhost:8080` and `/en/`.
Expected: Warm dark paper (`#1A1714`), light text, brighter terracotta accent (`#D2693C`), near-black footer (`#120F0D`). No leftover blue. `theme-color` matches.

- [ ] **Step 3: Check contrast**

Verify (browser devtools contrast checker or manual): body text on paper, accent on paper, footer text on footer-bg, and footer links all meet WCAG AA (≥4.5:1 body, ≥3:1 large display) in both light and dark. If any pairing fails, adjust the token in `style.css` and re-verify.

- [ ] **Step 4: Check responsive + keyboard**

Run: resize to ~375px width; tab through all interactive elements on both pages.
Expected: Single readable column, pills wrap, rails collapse inline, footer stacks; logical tab order with visible terracotta focus rings; touch targets comfortable.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "Final QA: contrast, dark mode, responsive, a11y"
```

(If Steps 1–4 surfaced no changes, skip this commit.)

---

## Self-Review

**1. Spec coverage:**
- Job/aesthetic/principles → reflected in copy + palette (Tasks 1, 5). ✓
- Type system (Spectral/Figtree/Space Mono) → fonts in Tasks 1/5, applied across 2–4. ✓
- Color light + dark tokens → Task 1 Step 2. ✓
- Masthead (kicker, name, rule, tagline, pills w/ featured AI Agents, GitHub/LinkedIn/Email) → Tasks 1–2. ✓
- Numbered sections, order About→Now→Other, dividers → Tasks 1, 3. ✓
- Signature dark footer → Tasks 1, 4. ✓
- Chosen tagline + polished "Now" + verbatim About/Other → Tasks 1, 5. ✓
- Responsive, motion, reveal, reduced-motion, focus, a11y landmarks, hreflang → Tasks 1, 4, 6. ✓
- Bilingual parity, shared stylesheet → Tasks 1, 5. ✓
- theme-color meta update → Tasks 1, 5. ✓
- No build system / deps, `*-old.*` untouched → respected throughout. ✓
- impeccable audit → Task 6. ✓

**2. Placeholder scan:** No TBD/TODO/"handle edge cases"; every step has full code or a concrete command + expected observation.

**3. Type/class consistency:** Class names used in CSS (Tasks 2–4) match the markup in Tasks 1/5 exactly (`.topbar .logo .lang .masthead .kicker .name .rule .tagline .skills .pill .pill-accent .links .sections .entry .entry-rail .entry-num .entry-label .entry-title .entry-body .site-footer .footer-inner .footer-label .footer-mail .footer-links .reveal`). `@keyframes fadeUp` defined in Task 2, referenced in Task 4's reduced-motion rule. Both HTML files use the identical class set.
