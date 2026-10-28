# CLAUDE.md

Persönliches Portfolio von Kenneth Bolland, live unter https://www.jonnef.dev
(`jonnef.dev` leitet per Cloudflare Redirect Rule auf `www` weiter).

## Zusammenarbeit

- Mit dem Nutzer auf **Deutsch** kommunizieren. Die Inhalte der Seite sind auf **Englisch**.
- **Nichts über den Nutzer erfinden.** Texte nur aus seinen Angaben formulieren; jede Annahme
  (Formulierung, Rolle, Zahl, Aufbau einer Grafik) ausdrücklich benennen und bestätigen lassen.
- Ablauf für Änderungen: neuer Branch von `main` → umsetzen → `npm run lint`, `npx tsc --noEmit`,
  `npm run build` → im Browser prüfen (Desktop/Mobil, hell/dunkel, Screenshots an den Nutzer) →
  pushen. Pull Request nur erstellen, wenn der Nutzer darum bittet; er merged selbst.

## Technik

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `next-themes`, `lucide-react`.
- **Rein statisch:** `output: "export"` in `next.config.ts`, Build landet in `out/`, gehostet auf
  **Cloudflare Pages** (Build `npm run build`, Output `out`, `NODE_VERSION=22`). Keine
  Server-Features (API-Routen, Server Actions, Middleware) ohne Rücksprache.
- `metadataBase` ist `https://www.jonnef.dev` (wichtig für das Vorschaubild).

## Inhalte

- `src/app/data/site.ts` – Name, Rolle, About-Text, Skills (gruppiert), Erfahrung, Ausbildung,
  Impressumsangaben (`legal`).
- `src/app/data/projects.ts` – Projekte; Reihenfolge = Reihenfolge auf der Seite. Optionales
  `details` (overview, role, highlights) macht die Karte anklickbar (animierter Dialog).
- Projekte erscheinen auf `/projects` als Raster und auf der Startseite als Slideshow
  (`ProjectGrid` mit `layout="carousel"`; Pfeile/Punkte nur, wenn nicht alle Karten passen).
- **Neue Projekte:** Der Nutzer füllt `docs/project-template.md` aus; Claude schreibt die Texte.

## Grafiken

- Projektbilder: `public/projects/*.png`, 1280×800 (16:10). Vorschaubild für Social Media:
  `src/app/opengraph-image.png` (+ `twitter-image.png`), 1200×630.
- Quellen als HTML/SVG in `docs/diagrams/` (Stil: gepunkteter Hintergrund, Inter, Zinc-Grautöne,
  Akzent `#047857`). Rendern mit
  `NODE_PATH=$(npm root -g) node docs/diagrams/render.js <vorlage.html> <ziel.png> [breite] [höhe]`.
- Das Vorschaubild (`docs/diagrams/og-image.html`) neu erzeugen, wenn sich Rolle oder Skills ändern;
  danach `opengraph-image.png` nach `twitter-image.png` kopieren.

## Inhaltliche Regeln

- Arbeitsprojekte: Arbeitgeber nicht nennen (z. B. „built at work for a large retailer“), keine
  internen Systemnamen, Zahlen, Screenshots oder Code.
- Kein GitHub-Link auf der Seite, keine Code-Links bei Projekten.
- Kein Tracking, keine Analytics, keine Cookies – sonst muss `src/app/datenschutz/page.tsx`
  angepasst werden. Hosting-Abschnitt dort nennt Cloudflare.
- Den Tag „Claude Code“ nur bei Projekten, die mit Claude Code entstanden sind.

## Offen

- Impressum: Anschrift in `site.legal` eintragen (liefert der Nutzer nach) und Überschrift in
  `src/app/impressum/page.tsx` von „§ 5 DDG“ auf „§ 18 Abs. 1 MStV“ ändern; „Verantwortlich für
  den Inhalt“ entfernen (nur für journalistisch-redaktionelle Angebote nötig). Erst danach die
  Seite öffentlich teilen.
