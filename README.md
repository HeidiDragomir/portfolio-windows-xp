# Heidi Dragomir – Portfolio

An interactive personal portfolio that boots, looks and behaves like Windows XP. Built with **Next.js 16 (App Router)**, **React 19** and **Tailwind CSS v4**.

This project was created as a learning exercise to explore and test **Claude Code** capabilities, demonstrating how AI-assisted development can streamline building complex, interactive applications.

## Features

- **XP boot sequence** → Desktop with Bliss-style wallpaper, taskbar, clock and functional Start menu
- **Draggable and resizable windows** with focus management, minimize, maximize and working taskbar integration
- **Functional desktop applications**:
  - **My Computer** – Skills organized as "hard drives" by category (Backend, Architecture, Databases, Frontend, Cloud & DevOps, AI, etc.)
  - **My Documents** – Work experience and educational background with detailed descriptions
  - **My Projects** – Featured GitHub projects with full details; double-click any project to open it in its own window
  - **Internet Explorer** – Landing page with active links to GitHub and LinkedIn (functional address bar)
  - **My CV** – Bilingual CV viewer (Swedish and English) with language toggle, open PDF and download buttons
  - **Contact Me** – Outlook Express-style email form that opens your default mail client with pre-filled message
  - **My Music** – Windows Media Player-style player with 14 real MP3 tracks from the 2000s, includes equalizer visualizer
  - **Notepad** – "About me" text editor with personal bio and philosophy
  - **Paint** – Drawing canvas with color palette and brush size controls
  - **Minesweeper** – Fully playable classic game with timer, mine counter and flood-fill logic
  - **Recycle Bin** – Playful display of "discarded" technologies and bad coding habits

- **Clippy assistant** with rotating tips and dismissible speech bubble
- **Self-contained audio** (startup chime, UI clicks, background music) via Web Audio API – no external audio files required
- **Volume control** in system tray with interactive slider popup
- **Responsive window management** with drag, resize, z-index management and minimize/maximize states
- **Session persistence** – boot screen appears only once per session (using sessionStorage)

## Development

```bash
npm run dev     # Start development server at http://localhost:3000
npm run build   # Production build
npm run lint    # Run ESLint
```

## Architecture

### Data Layer
All content is centralized in `lib/data/*.ts` files (single source of truth):
- `profile.ts` – Name, title, contact info, bio and availability
- `experience.ts` – Work history with roles, companies, locations and tech stacks
- `education.ts` – Educational programs and language skills
- `projects.ts` – Featured GitHub projects and additional repositories
- `skills.ts` – Skills grouped by category (Backend, Frontend, Cloud & DevOps, etc.)

### Components & State Management
- **Window manager** — `components/os/WindowManagerProvider.tsx` uses React Context + useReducer for centralized window state
- **App registry** — `lib/apps.tsx` centralizes all 11+ applications; adding a new window is a single entry
- **Styling** — Tailwind CSS with custom XP-style utilities in `app/globals.css`
- **Assets** — Windows XP icon pack + wallpaper in `public/assets/`

### Key Files
```
app/
  page.tsx                    # Server component entry point
  globals.css                 # XP chrome + Tailwind utilities
lib/
  data/                       # Content modules (profile, experience, etc.)
  apps.tsx                    # App registry
  audio.ts                    # Web Audio API helpers
components/
  os/                         # OS-level UI (desktop, windows, taskbar, boot screen)
  apps/                       # Individual application windows
public/
  assets/                     # Wallpaper, icons, CV PDFs, music files
```

## Tech Stack

- **Frontend framework** – Next.js 16 with App Router
- **UI library** – React 19
- **Styling** – Tailwind CSS v4
- **State management** – React Context + useReducer
- **Audio** – Web Audio API + HTMLAudioElement
- **Language** – TypeScript
- **Icons** – Windows XP icon pack (501 icons)

## Learning & Claude Code

This project demonstrates how Claude Code accelerates development of interactive applications. Key benefits explored:

- **Rapid prototyping** – Complex UI patterns (draggable windows, window management) built efficiently with AI assistance
- **Refactoring at scale** – Converting a large codebase from inline styles to Tailwind CSS in one workflow
- **Property renaming** – Systematically updating Swedish property names to English across 15+ files
- **Feature expansion** – Adding volume control, bilingual CV support and MP3 playback without friction
- **Code review & optimization** – AI-assisted suggestions for better patterns and cleaner implementation

## Deployment

The project is ready for production deployment on any static hosting platform (Vercel, Netlify, etc.). It's a fully client-side application with no backend requirements.

```bash
npm run build
# Deploy the `.next` folder
```

## Credits

- **Wallpaper & icons** – Windows XP asset pack
- **Startup chime & click sounds** – Synthesized via Web Audio API
- **Music** – 2000s hits MP3 collection
- **Framework & tooling** – Next.js, React, TypeScript, Tailwind CSS

---

**Built with ❤️ and Claude Code** — A personal portfolio that celebrates Windows XP nostalgia while showcasing modern web development practices.
