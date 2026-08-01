# Portfolio — Kenneth Bolland

Personal portfolio website — a place to showcase my projects, background, and how to get in touch.

Built with the Next.js App Router and a small, token-based design system.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** — theme configured via `@theme` in `src/app/globals.css` (no `tailwind.config.js`)
- **[next-themes](https://github.com/pacocoursey/next-themes)** — class-based light/dark mode with a toggle
- **[lucide-react](https://lucide.dev)** — icons
- **Geist Sans / Geist Mono** via `next/font`

## Getting started

Prerequisites: **Node.js 18+** (developed on Node 22).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (with Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  app/
    layout.tsx        # Root layout: fonts, ThemeProvider, navbar + footer shell
    page.tsx          # Home page
    globals.css       # Tailwind import + design tokens (@theme) + dark variant
    components/       # Navbar, Footer, ThemeProvider, ...
public/               # Static assets
```

## Features

- [x] Responsive layout shell (sticky navbar with mobile burger menu, footer)
- [x] Light/dark mode with system detection and a manual toggle
- [x] Design system: neutral (zinc) + accent (emerald) tokens, Geist typography
- [ ] Project showcase (MDX-based)
- [ ] About / CV page
- [ ] Contact form
- [ ] "Ask my portfolio" AI chat (stretch)

## Deployment

Planned: self-hosted via **Docker** behind a **Caddy** reverse proxy with automatic HTTPS.

---

Built by Kenneth Bolland.
