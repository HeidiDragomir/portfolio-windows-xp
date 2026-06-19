# Heidi Dragomir – Portfolio

An interactive personal portfolio that boots, looks and behaves like Windows XP.
Built with **Next.js 16 (App Router)**, **React 19** and **Tailwind v4**.

## Features

- **XP boot sequence** → desktop with the Bliss-style wallpaper, taskbar, clock and Start menu.
- **Draggable / resizable windows** with focus, minimize, maximize and a working taskbar.
- **Functional desktop apps** (all content in Swedish, sourced from the CV + GitHub):
  - **Den här datorn** – kompetenser som "hårddiskar".
  - **Mina dokument** – arbetslivserfarenhet & utbildning.
  - **Mina projekt** – utvalda GitHub-projekt, varje projekt öppnas i eget fönster.
  - **Internet Explorer** – startsida med länkar till GitHub/LinkedIn (fungerande adressfält).
  - **Mitt CV** – renderat CV + knappar för att öppna/ladda ner PDF:en.
  - **Kontakta mig** – Outlook Express-stil, skickar via `mailto:`.
  - **Min musik** – Windows Media Player-stil med syntetiserad musik (Web Audio) + visualizer.
  - **Anteckningar**, **Paint**, **Minröjaren** (fullt spelbar), **Papperskorgen**.
- **Clippy-assistenten "Gem"** med roterande svenska tips.
- Self-contained ljud (start-jingel, klick, musik) via Web Audio API – inga ljudfiler krävs.

## Develop

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Content & assets

- All text content lives in `lib/data/*.ts` (single source derived from the CV).
- Apps are registered in `lib/apps.tsx` — adding a new window is one entry.
- The window manager is in `components/os/WindowManagerProvider.tsx`.
- Windows XP icons + wallpaper live in `public/assets/`.

### Two optional drop-ins

1. **CV PDF** – place your PDF at `public/assets/cv.pdf` to enable the "Öppna PDF" /
   "Ladda ner" buttons and the inline preview in **Mitt CV**. (The CV also renders from
   structured data, so the window works without it.)
2. **Real music** – the player ships with synthesized demo tracks. Drop real MP3s into
   `public/assets/music/` and extend `MUSIC_TRACKS` in `lib/audio.ts` to use them.
