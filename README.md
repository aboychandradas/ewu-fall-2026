# EWU Fall 2026 — Information Studies Academic Companion

[![Live App](https://img.shields.io/badge/Live%20App-Vercel-black?logo=vercel)](https://ewu-fall-2026.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-offline--first-5A0FC8)](https://web.dev/progressive-web-apps/)

> An iPhone-first academic companion PWA for Fall 2026, built with offline access, an interactive weekly routine, academic calendar, and an installed-app experience.

An iPhone-first Progressive Web App (PWA) built for an East West University Information Studies student in Fall 2026.

The application provides a focused academic companion experience for checking the weekly class routine, viewing important semester dates, and continuing to use the core application when the device is offline.

Live app: https://ewu-fall-2026.vercel.app/

GitHub: https://github.com/aboychandradas/ewu-fall-2026

Status: Production

Overview

EWU Fall 2026 is a lightweight, client-side academic companion designed around an iPhone-first experience.

The project deliberately keeps the scope small and practical:

Weekly class routine

Current/next-class information

Academic calendar and semester milestones

Interactive detail sheets for classes and events

Installable PWA experience

Offline access to the main application

No backend, database, authentication, or external API dependency

Semester data is bundled locally with the application so the core experience remains fast, deterministic, and available without an internet connection.

Key Features

Home

The Home screen is the primary entry point and provides an at-a-glance view of the academic day.

It is designed around a compact mobile interface with dynamic time-aware class status and navigation to the main academic sections.

Routine

The Routine screen provides a day-based weekly schedule for Fall 2026.

Features include:

Sunday–Thursday class selection

Friday and Saturday empty-day states

Animated day selector

Current-class highlighting

Next/current class awareness

Tap-to-open class details

Course and lab distinction

Mobile-friendly bottom-sheet details

Calendar

The Calendar screen organizes important academic dates into a clean timeline-style experience.

Features include:

Upcoming-event emphasis

Month grouping

Past-event visual treatment

Event type indicators

Tap-to-open event details

Mobile-friendly bottom-sheet details

PWA / Offline Support

The application is installable as a PWA and is designed to remain useful without a network connection.

Offline functionality includes:

Home

Routine

Calendar

Offline fallback page

Bundled static assets

App icons

Manifest metadata

Service worker controlled application shell

The production build generates a root-scoped sw.js and uses Serwist for precaching, runtime caching, and offline fallback behavior.

Fall 2026 Routine

Day

Course

Time

Room

Sunday

GEN7211

11:50 AM–1:20 PM

FUB-104

Monday

INF7402

10:10–11:40 AM

FUB-303

Monday

INF7403

1:30–3:00 PM

AB1-202

Tuesday

GEN7211

11:50 AM–1:20 PM

FUB-104

Wednesday

INF7402 Lab

8:00–10:00 AM

531 (C. Lab-5)

Wednesday

INF7402

10:10–11:40 AM

FUB-303

Wednesday

INF7403

1:30–3:00 PM

AB1-202

Thursday

INF7403 Lab

10:10 AM–12:10 PM

531 (C. Lab-5)

Friday

—

No class shown

—

Saturday

—

No class shown

—

The internal application model uses A for Saturday so that the application's day codes do not conflict with the university's S code for Sunday.

Fall 2026 Academic Calendar

Date

Event

September 13, 2026

First Day of Classes

October 19–21, 2026

Durga Puja Holiday

November 15, 2026

Mid-Semester Assessment Submission

December 10, 2026

Last Day of Classes

December 13–20, 2026

Final Examinations

December 16, 2026

Victory Day

December 23, 2026

Submission of Final Grades

December 26, 2026 – January 4, 2027

Semester Break

The application intentionally excludes tuition, payment, installment, course-drop, refund, and similar financial/administrative tracking features.

Tech Stack

Application

Next.js 16.3.8

React 19

TypeScript

Tailwind CSS v4

shadcn/ui

Motion (motion/react)

lucide-react

PWA / Build

Serwist

@serwist/turbopack

Static export with Next.js output: "export"

Custom Next.js build adapter for Windows static-export RSC path normalization

Vercel static deployment

Architecture

This project is intentionally backend-free:

Next.js App Router
        │
        ├── Local semester data
        ├── Home
        ├── Routine
        └── Calendar
        │
        ├── Static export → out/
        │
        └── Serwist service worker → sw.js
                    │
                    ├── Precache
                    ├── Runtime caching
                    └── Offline fallback

There is currently:

No database

No authentication

No API server

No server-side application dependency

No external academic-data API

Project Structure

ewu-fall-2026/
├── build/
│   └── adapter.js
│
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   └── icon-512.png
│
├── scripts/
│   └── build-sw.mjs
│
├── src/
│   ├── app/
│   │   ├── calendar/
│   │   │   └── page.tsx
│   │   ├── routine/
│   │   │   └── page.tsx
│   │   ├── offline/
│   │   │   └── page.tsx
│   │   ├── sw.ts
│   │   ├── manifest.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── home/
│   │   │   └── class-status-card.tsx
│   │   ├── routine/
│   │   │   ├── day-selector.tsx
│   │   │   ├── routine-class-card.tsx
│   │   │   └── class-detail-sheet.tsx
│   │   ├── calendar/
│   │   │   ├── calendar-event-card.tsx
│   │   │   └── calendar-event-sheet.tsx
│   │   ├── pwa/
│   │   │   └── register-pwa.tsx
│   │   ├── app-shell.tsx
│   │   └── ui/
│   │
│   ├── data/
│   │   └── fall-2026.ts
│   │
│   └── lib/
│       ├── schedule.ts
│       └── use-now.ts
│
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── components.json
└── README.md

Data Model

The semester information is stored locally in src/data/fall-2026.ts.

The core data types include:

DayCode

ClassType

ClassSession

AcademicEvent

The schedule utilities in src/lib/schedule.ts provide reusable logic for:

Determining the current day

Formatting times

Getting classes for a selected day/date

Finding the current class

Finding the next class

Finding the next academic event

Formatting countdowns and relative dates

This keeps scheduling logic separate from the UI components.

Time and Hydration Handling

The application uses src/lib/use-now.ts to provide a hydration-safe time source.

This was introduced to avoid server/client rendering mismatches caused by directly initializing React state from new Date() during server rendering.

The hook uses useSyncExternalStore so the application can update the current time periodically without introducing the hydration mismatch that originally appeared on the Home screen.

PWA Architecture

The PWA is deliberately built around the static-export version of the application.

Manifest

src/app/manifest.ts defines:

Application name

Short name (9th-Sem.)

Start URL

Scope

Standalone display mode

Portrait orientation

Theme/background colors

192×192 icon

512×512 icon

Apple icon

src/app/layout.tsx also declares the Apple touch icon:

public/apple-touch-icon.png

This provides the dedicated icon used when the web application is added to an iPhone Home Screen.

Service worker registration

src/components/pwa/register-pwa.tsx registers /sw.js only in production.

Development intentionally does not register the service worker because the generated service worker is produced by the production build pipeline.

Service worker source

src/app/sw.ts configures Serwist with:

Generated precache manifest

URL-parameter-insensitive precache matching for Next.js RSC requests

skipWaiting

clientsClaim

navigation preload

Serwist default runtime caching

Document-level offline fallback to /offline/

Production service worker generation

scripts/build-sw.mjs runs after next build and generates the root-scoped:

out/sw.js

This is necessary because the project uses a static export and needs a root service worker that can control / rather than a nested /serwist/ route.

Windows Static Export Adapter

The project contains:

build/adapter.js

This custom Next.js build adapter normalizes generated static RSC payload paths on Windows.

During development of the PWA, the static export generated RSC payload files for routes such as /routine/ and /calendar/ in nested paths, while the browser expected flattened filenames.

The adapter converts paths such as:

out/routine/__next.routine/__PAGE__.txt

to:

out/routine/__next.routine.__PAGE__.txt

This allows client-side navigation and offline caching to work correctly with the static export on Windows.

Getting Started

Prerequisites

Recommended environment:

Node.js compatible with the project dependencies

npm

Git

VS Code or another TypeScript-capable editor

Clone the repository

git clone https://github.com/aboychandradas/ewu-fall-2026.git
cd ewu-fall-2026

Install dependencies

npm install

Start development

npm run dev

Open the local URL shown by Next.js.

The development server intentionally does not register the production service worker.

Production Build

The project uses a combined production build command:

npm run build

The build performs two stages:

next build
        ↓
Static export to out/
        ↓
node scripts/build-sw.mjs
        ↓
Root-scoped out/sw.js

A successful production build should generate at least:

out/
├── index.html
├── routine/
│   ├── index.html
│   └── __next.routine.__PAGE__.txt
├── calendar/
│   ├── index.html
│   └── __next.calendar.__PAGE__.txt
├── offline/
│   └── index.html
├── manifest.webmanifest
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
└── sw.js

Local Production Testing

To test the exported application and service worker locally:

npm run build
npx serve out

Then open the URL printed by serve.

For a meaningful PWA test:

Open Home while online.

Open Routine while online.

Open Calendar while online.

Confirm the service worker is active.

Switch the browser to offline mode.

Refresh and test Home, Routine, and Calendar again.

If a new service-worker build is being tested, unregister the old service worker and clear site data before re-testing so an outdated cache does not interfere with the result.

Deployment

The production application is deployed on Vercel.

Live URL:

https://ewu-fall-2026.vercel.app/

Vercel configuration

Because the application uses a static export, the Vercel project is configured to serve the out directory rather than expecting the standard .next deployment output.

The effective deployment configuration is:

Framework Preset: Other
Root Directory: ./
Build Command: npm run build
Output Directory: out

The build command must remain npm run build because the project needs both the Next.js static export and the custom Serwist generation step.

iPhone Installation

On an iPhone:

Open the production URL in Safari.

Use Share.

Select Add to Home Screen.

Launch the installed application from the Home Screen.

The application uses the apple-touch-icon.png asset for the Apple Home Screen icon.

Design Approach

The interface is intentionally inspired by modern iOS application patterns:

iPhone-first layout

Rounded surfaces

Soft spacing and hierarchy

Motion-based transitions

Compact navigation

Bottom-sheet interactions

Minimal visual noise

Clear typography

Academic information presented as glanceable cards

The design goal is not to reproduce a university portal. It is to provide a much smaller, faster, personal academic utility.

Accessibility and Usability Considerations

The interface is designed around touch-first interaction and short visual scanning sessions.

Current usability considerations include:

Large interactive controls

Clear course/time/room grouping

Motion-based emphasis rather than motion-only navigation

Mobile-friendly bottom sheets

Simple day selection

Distinct course/lab labels

Clear offline fallback state

The project can continue to improve with more formal keyboard, screen-reader, contrast, and automated accessibility testing as the UI evolves.

Privacy

The application does not currently use authentication, a database, personal accounts, or an external backend.

Semester data is bundled into the application source and there is no application-specific server storing academic records.

The app should therefore be treated as a static academic companion rather than an official university system.

Current Limitations

This is intentionally a focused academic companion rather than a complete university information system.

It currently does not provide:

University authentication

Student portal integration

Automatic timetable synchronization

Grade retrieval

Assignment management

Notifications/push messaging

Cloud synchronization

Tuition/payment/installment tracking

Course drop/refund management

Backend data editing

All Fall 2026 schedule and academic calendar information is currently maintained in local project data.

Future Ideas

Potential future enhancements, if needed, include:

Custom reminders

Assignment/deadline tracking

Personal notes

Favorite rooms/courses

Installable notification support

More semesters using the same data model

Local persistent user preferences

Automated academic-data import

Enhanced accessibility testing

These are intentionally outside the current release scope.

Development Notes

A few project decisions are deliberate and should be preserved when maintaining the project:

Keep service-worker registration production-only

The development server does not generate the same root service-worker artifact as the production build. Do not manually register /sw.js during normal development.

Keep generated output out of Git

The out/ and .next/ directories are generated build artifacts and should remain ignored.

Keep the deployment adapter tracked

build/adapter.js is source code required by the production build and therefore must remain tracked by Git even though the general build/ directory was originally ignored.

Keep application data local unless the architecture changes intentionally

The current app depends on local semester data by design. Introducing a backend, API, or database would be a larger architecture change rather than a small feature addition.

Project Milestones

The project progressed through these major milestones:

Next.js application foundation

Fall 2026 local academic data model

Dynamic Home screen

Routine 2.0

Calendar 2.0

PWA manifest and installable icons

Production service worker generation

Offline fallback and offline navigation

Windows static-export RSC path handling

GitHub repository setup

Vercel deployment

iPhone 11 installation and real-device offline testing

Author

Aboy Chandra Das

GitHub: https://github.com/aboychandradas

Portfolio: https://aboysystems.com/

License

No open-source license is currently specified for this repository.

Unless a license is added to the repository, reuse and redistribution should not be assumed to be permitted beyond the rights granted by applicable law.

Final Release

The production application is available at:

https://ewu-fall-2026.vercel.app/

The project is a complete, deployable, installable PWA with a locally bundled Fall 2026 academic dataset and a tested offline application experience.