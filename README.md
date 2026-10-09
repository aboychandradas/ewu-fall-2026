# EWU Fall 2026 — Information Studies Academic Companion

[![Live App](https://img.shields.io/badge/Live%20App-Vercel-black?logo=vercel)](https://ewu-fall-2026.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-offline--first-5A0FC8)](https://web.dev/progressive-web-apps/)

> An iPhone-first academic companion PWA for Fall 2026, built with offline access, an interactive weekly routine, academic calendar, and an installed-app experience.

An iPhone-first Progressive Web App (PWA) for viewing the Fall 2026 weekly routine and important academic dates for an East West University Information Studies student. It includes time-aware class and event status, Light/Dark/System appearance modes, installable app icons, and offline support for resources that have been cached on the device.

Live application: https://ewu-fall-2026.vercel.app/
Source repository: https://github.com/aboychandradas/ewu-fall-2026
GitHub releases: https://github.com/aboychandradas/ewu-fall-2026/releases

This is a personal academic companion, not an official East West University system. Schedule and academic-calendar information is bundled with the source and should be checked against official university announcements if dates or rooms change.

Contents
Overview
Features
Fall 2026 class routine
Fall 2026 academic calendar
Technology stack
Architecture
Project structure
Getting started
Production build and local PWA testing
Deploying to Vercel
Installing on iPhone
Accessibility and quality checks
Privacy and data
Limitations
Maintenance notes
Author
License
Overview

EWU Fall 2026 is a focused, mobile-first academic utility. It is designed for quick checks of today's classes, the weekly routine, and semester milestones without requiring a login or a backend service.

The main navigation contains three areas:

Home — time-aware current/next-class information, a live timeline, semester progress, and the next academic event.
Routine — a seven-day selector, course and lab sessions, current/upcoming/completed states, countdowns, and class-detail sheets.
Calendar — academic events grouped by month, event status and countdowns, and event-detail sheets.

The interface supports System, Light, and Dark appearance preferences. The selected preference is stored locally in the browser. The app is installable as a PWA, and previously cached pages and assets can remain available when the device is offline.

Features
Home
Compact, iPhone-first academic dashboard.
Live current-class and next-class status.
Today timeline with time-aware session states.
Live countdown and progress indicators where applicable.
Semester progress and next-event information.
Quick action to open the weekly routine.
Routine
Day selector for Sunday through Saturday.
Course and laboratory sessions, with rooms and scheduled times.
Current, upcoming, and completed class states.
Live countdowns and session progress.
Tap-to-open class details.
Empty-day states for days without scheduled classes.
Calendar
Academic events grouped by month.
Upcoming, active, and past event states.
Live countdowns and progress indicators where applicable.
Tap-to-open event detail sheets.
Semester milestones displayed in a mobile-friendly layout.
Appearance and navigation
System appearance follows the browser/device prefers-color-scheme setting.
Light and Dark modes can be selected manually.
The preference is stored in browser local storage.
Animated, compact bottom navigation between Home, Routine, and Calendar.
Reduced-motion CSS support for users who prefer less animation.
Progressive Web App and offline support
Web app manifest and installable app icons.
Root-scoped /sw.js service worker generated during the production build.
Serwist precaching and runtime caching.
Offline fallback page at /offline/.
Connection indicator for online/offline transitions.
Previously cached application pages and assets may remain available offline.
Countdown timers on already-open pages continue using the device's local clock while the network is unavailable.

Offline availability depends on the page and resources having been loaded and cached successfully. A browser's online/offline indicator reports network connectivity status; it does not guarantee that a remote website is reachable.

Fall 2026 class routine
Day	Course / session	Time	Room
Sunday	GEN7211	11:50 AM–1:20 PM	FUB-104
Monday	INF7402	10:10–11:40 AM	FUB-303
Monday	INF7403	1:30–3:00 PM	AB1-202
Tuesday	GEN7211	11:50 AM–1:20 PM	FUB-104
Wednesday	INF7402 Lab	8:00–10:00 AM	531 (C. Lab-5)
Wednesday	INF7402	10:10–11:40 AM	FUB-303
Wednesday	INF7403	1:30–3:00 PM	AB1-202
Thursday	INF7403 Lab	10:10 AM–12:10 PM	531 (C. Lab-5)
Friday	—	No class listed	—
Saturday	—	No class listed	—

The university day codes use S for Sunday. The application's internal data uses A for Saturday to keep those codes distinct.

Fall 2026 academic calendar
Date	Event
September 13, 2026	First Day of Classes
October 19–21, 2026	Durga Puja Holiday
November 15, 2026	Mid-Semester Assessment Submission
December 10, 2026	Last Day of Classes
December 13–20, 2026	Final Examinations
December 16, 2026	Victory Day
December 23, 2026	Submission of Final Grades
December 26, 2026–January 4, 2027	Semester Break

All timetable and calendar details are local project data. Update them in the source when official information changes, then rebuild and redeploy the app.

## Technology stack

### Application

* [Next.js](https://nextjs.org/) 16.3.8, App Router and static export
* [React](https://react.dev/) 19
* [TypeScript](https://www.typescriptlang.org/) with strict type checking
* [Tailwind CSS](https://tailwindcss.com/) v4
* [Motion](https://motion.dev/) (`motion/react`)
* [Lucide React](https://lucide.dev/) icons
* shadcn/ui conventions/components where used

### PWA and deployment

* [Serwist](https://serwist.pages.dev/) for service-worker caching
* `@serwist/turbopack` worker integration
* Next.js static export to `out/`
* Custom Windows static-export adapter at `build/adapter.js`
* [Vercel](https://vercel.com/) static deployment

## Architecture

The application intentionally has no backend dependency:

```text
Next.js App Router
       │
       ├── Home
       ├── Routine
       ├── Calendar
       └── Offline fallback
       │
       ├── Local semester data (src/data/fall-2026.ts)
       │
       └── Static export → out/
                     │
                     └── build service worker → out/sw.js
                                   │
                                   ├── Precache
                                   ├── Runtime caching
                                   └── Offline navigation fallback
```

There is no application database, authentication, API server, cloud synchronization, or external academic-data API. The class timetable and calendar are bundled locally with the application.

### Time and scheduling logic

`src/lib/schedule.ts` contains reusable scheduling helpers, including day selection, class lookup, current/next class detection, event lookup, and countdown formatting. Live-time hooks provide current time to the interface while keeping server rendering and hydration consistent.

### Service worker

* `src/app/sw.ts` defines the Serwist worker and offline fallback behavior.
* `src/components/pwa/register-pwa.tsx` registers `/sw.js` in production only.
* `scripts/build-sw.mjs` generates the root-scoped `out/sw.js` after the Next.js build.

The development server intentionally does not register the production service worker. Use the production build and `npx serve out` to test actual offline behavior.

### Windows static-export adapter

`build/adapter.js` is a required, tracked source file. It normalizes generated static React Server Component payload paths so the exported routes work correctly with this project's Windows build setup. Keep this file committed even if a broad Git ignore rule ignores the `build/` directory. Do not remove the configured `adapterPath` from `next.config.ts` without replacing the workaround and validating the export.

## Project structure

```text
ewu-fall-2026/
├── build/
│   └── adapter.js
├── public/
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   └── icon-512.png
├── scripts/
│   └── build-sw.mjs
├── src/
│   ├── app/
│   │   ├── calendar/
│   │   │   └── page.tsx
│   │   ├── routine/
│   │   │   └── page.tsx
│   │   ├── offline/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── page.tsx
│   │   └── sw.ts
│   ├── components/
│   │   ├── calendar/
│   │   ├── home/
│   │   ├── pwa/
│   │   ├── routine/
│   │   ├── ui/
│   │   └── app-shell.tsx
│   ├── data/
│   │   └── fall-2026.ts
│   └── lib/
│       └── schedule.ts
├── next.config.ts
├── package.json
└── README.md
```

Some component and utility files are omitted from the tree for readability. The source directories are the authoritative project structure.

## Getting started

### Prerequisites

* A compatible Node.js version
* npm
* Git
* VS Code or another TypeScript-capable editor

### Clone the repository

```bash
git clone https://github.com/aboychandradas/ewu-fall-2026.git
cd ewu-fall-2026
```

### Install dependencies

```bash
npm install
```

### Start development

```bash
npm run dev
```

Open the local URL printed by Next.js. The development server does not register the production service worker; this is intentional.

## Production build and local PWA testing

### Build the production export

```bash
npm run build
```

The build runs Next.js static export first and then generates the root-scoped service worker:

```text
next build
    ↓
Static export → out/
    ↓
node scripts/build-sw.mjs
    ↓
out/sw.js
```

A successful build should contain the exported Home, Routine, Calendar, and Offline pages, the web app manifest, app icons, and `sw.js`.

### Serve the production output locally

```bash
npx serve out
```

Open the URL printed by `serve`. To verify offline functionality:

1. Load Home while online.
2. Visit Routine and Calendar while online so their resources can be cached.
3. In browser DevTools, confirm the service worker is active and controlling the page.
4. Enable the browser's Offline network mode.
5. Test reload and navigation to the pages that have been cached.
6. Check the live countdown on an already-open page and verify that the theme preference remains applied.
7. Restore the connection and confirm the connection indicator updates.

When testing a new service-worker build, an old registration or cache can serve older files. If necessary, unregister the local worker and clear that local origin's site data while online, then reload and cache the new build before repeating the offline test.

### Useful quality checks

```bash
npx eslint src
npm run build
git diff --check
```

## Deploying to Vercel

The project uses static export, so retain the established Vercel settings:

| Setting           | Value                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| Framework Preset  | Other                                                                  |
| Root Directory    | `./`                                                                   |
| Build Command     | `npm run build`                                                        |
| Output Directory  | `out`                                                                  |
| Production branch | `main` (if this remains the repository's configured production branch) |

Do not change the build command to a default Next.js deployment command: `npm run build` also generates the service worker required by the static PWA. After a deployment reports Ready, test the deployed site and its offline behavior separately from local testing.

## Installing on iPhone

1. Open https://ewu-fall-2026.vercel.app/ in Safari on the iPhone.
2. Tap **Share**.
3. Select **Add to Home Screen**.
4. Confirm the app name and tap **Add**.
5. Launch the app using the new Home Screen icon.
6. While online, visit Home, Routine, and Calendar before testing offline behavior.

The app uses `public/apple-touch-icon.png` for the iOS Home Screen icon.

## Accessibility and quality checks

During the reported validation pass:

* Lighthouse Accessibility scored **100** for Home, Routine, and Calendar.
* Keyboard navigation and visible focus indicators were manually reviewed.
* Reduced-motion support was included in the global styles.
* Light, Dark, and System appearance modes were tested.
* Production offline behavior, including the Home action-button label and live countdowns, was tested.

Lighthouse results depend on the browser and environment. Re-run the audits after substantial UI changes; a score is evidence from a particular test run, not a permanent guarantee of accessibility.

## Privacy and data

* No login or personal account is required.
* The application does not use a project-specific backend or database.
* Class and academic event data are bundled in the repository.
* The appearance preference is stored locally in browser storage.
* The app is not an official university portal, and there is no automatic synchronization with university systems.

## Limitations

This project is deliberately focused on viewing a local academic routine and calendar. It does not provide:

* University authentication or student-portal integration
* Automatic timetable synchronization
* Grade retrieval
* Assignment/deadline management
* Push notifications
* Cloud synchronization or cross-device preference syncing
* Financial, tuition, installment, course-drop, or refund tracking
* A backend interface for editing academic data

## Maintenance notes

* Keep the service-worker registration production-only unless the development workflow is intentionally redesigned.
* Keep `out/` and `.next/` as generated, ignored build output.
* Keep `build/adapter.js` tracked because the production build requires it.
* Preserve `npm run build` as the combined static-export and service-worker generation command.
* Keep academic data in `src/data/fall-2026.ts` in sync with verified official updates.
* After changing routes or assets, rebuild and repeat the local production offline test.

## Author

**Aboy Chandra Das**
GitHub: https://github.com/aboychandradas
Portfolio: https://aboysystems.com/

## License

No open-source license is currently specified for this repository. Unless a license is added, do not assume that reuse, redistribution, or modification is permitted beyond rights provided by applicable law.

---

**Live application:** https://ewu-fall-2026.vercel.app/
**Repository:** https://github.com/aboychandradas/ewu-fall-2026
**Releases:** https://github.com/aboychandradas/ewu-fall-2026/releases
