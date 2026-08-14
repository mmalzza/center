# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next`)

There is no test framework configured in this repo.

## Architecture

- Next.js 16.3, **Pages Router** (`src/pages`), not the App Router — routing, data fetching, and `_app`/`_document` conventions differ from App Router docs. Per the block at the top of AGENTS.md, consult `node_modules/next/dist/docs/02-pages/` for pages-router-specific APIs before writing routing/data-fetching code.
- Path alias `@/*` maps to `./src/*` (tsconfig.json).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`) — manual `useMemo`/`useCallback` is generally unnecessary.

### Layout and consoles

- `src/components/layout/CenterLayout` wraps every page with `Header` + `Sidebar` + `<main>`. Every page imports the same hardcoded `user` object from `src/types/user.ts` and passes it in — there is no auth/session layer yet.
- `Header` exposes three "consoles" (center `/`, admin `/admin`, expert `/expert`), and `Sidebar` owns the primary nav + quick actions (hardcoded arrays inside the component, active state derived from `router.pathname`).
- Most routed pages (`admin`, `expert`, `reservations`, `clients`, `documents`, `sales`, etc.) are unimplemented placeholders — just a heading inside `CenterLayout`. Check whether a page is still a stub before assuming there's existing structure to extend.

### Dashboard feature

- The one fully built page is the root dashboard: `DashboardGrid` (`src/components/dashboard/DashboardGrid`) composes header/notice/filter/summary sections and 7 chart widgets.
- Data is static mock JSON at `src/data/dashboard.json`, typed as `DashboardResponse` in `src/types/dashboard.ts` — there is no API/data-fetching layer yet. Treat `DashboardResponse` as the contract when wiring real data or adding fields.
- Each widget type extends `BaseWidget` with a `widgetType` discriminant (`DONUT`, `LINE`, `BAR`, `RANKING`, `LIST_BAR`, `PROGRESS_KPI`, `LINE_WITH_SUMMARY`) defined in `src/types/dashboard.ts`. Add new widget kinds there first, then build the widget component against the new type.
- Charts are built with `recharts`. Shared chrome lives in `src/components/dashboard/common/`: `Widget` (card shell), `WidgetHeader` (title/date-range/info-tooltip), `Trend` (up/down badge), `ChartLegend` (color-dot legend) — reuse these rather than rebuilding widget chrome per widget.

### Styling conventions

- Two conventions coexist by directory: `src/components/dashboard/**` uses inline Tailwind utility classes with arbitrary values matching Figma specs directly (e.g. `text-[#373D44]`); `src/components/layout/**` uses CSS Modules (`*.module.css`). Match whichever convention the directory you're editing already uses.
- `tailwind.config.js` has no theme customization — arbitrary-value utility classes are the norm, not a design-token scale.
- Icons are raw SVGs in `public/icons/`, rendered with plain `<img src="/icons/...">`, not `next/image` or an icon component library.

## Language

UI copy and code comments are written in Korean; match this for new user-facing strings and comments.
