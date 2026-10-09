# EWU Academic Companion — Dark Mode Patch

This patch adds an offline-friendly Light / Dark / System appearance preference without adding any package dependencies.

## Files included

- `src/app/layout.tsx` — initializes the saved appearance before the app paints and wraps the app in the theme provider.
- `src/app/globals.css` — adds dark design tokens and theme-aware styling for existing card, text, border, and background utility classes.
- `src/app/page.tsx` — adds the appearance control beside the 9TH badge on Home.
- `src/components/theme/theme-provider.tsx` — persists the preference in local storage and watches system appearance changes when System is selected.
- `src/components/ui/theme-toggle.tsx` — accessible Light / Dark / System cycle button.

## How the button cycles

System → Light → Dark → System.

The preference is stored under `ewu-academic-theme` in local storage. No network request is used for theme selection.

## Apply

Extract the ZIP into the root of the repository, `D:\\fsd-project\\ewu-fall-2026`, and allow the five files to merge/replace their existing counterparts. Keep your own backup or Git checkpoint first.

Then open a fresh VS Code terminal in the project and run:

```powershell
npx eslint src/app/layout.tsx src/app/page.tsx src/components/theme/theme-provider.tsx src/components/ui/theme-toggle.tsx
npm run build
git diff --check
```

Do not deploy until the build succeeds and you have visually checked Light, Dark, and System modes on Home, Routine, Calendar, and both detail sheets. Also repeat the existing production/offline PWA test after the build.

The supplied ZIP contained selected source files rather than the complete repository, so the patch has not been run through the user's actual local build. The commands above are required validation on the full project.
