# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of twelve lifts, open any one for full
coaching detail, lock the ones you want into today's plan, and watch the exercises, minutes
and calories add up as you train.

**Live Site:** [https://tarikul-fit-log.vercel.app/](https://tarikul-fit-log.vercel.app/)

**Live API:** `https://api.api-store.workers.dev/api/fitlog`

---

## Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | Routing, server rendering and data fetching |
| React 19 | UI components and state |
| TypeScript | Type safety across the API layer and components |
| Tailwind CSS v4 | Styling, design tokens and responsive layout |
| lucide-react | Icon set for stats, tags and action buttons |
| react-hot-toast | Toast notifications for every plan action |

---

## Key Features

1. **Full workout library** — all twelve exercises are fetched from the live API and shown in a
   responsive 3×4 grid with images, muscle-group tags, equipment and a duration / calories /
   rating stat row. Every card opens a detail page.

2. **Detailed workout pages** — a two-column layout with a large illustration, description,
   category tags, a seven-row key-specs panel (equipment, difficulty, sets, reps, duration,
   calories, rating) and numbered step-by-step instructions.

3. **Today's plan with a five-lift cap** — add a workout to today's plan or save it for later,
   each with its own toast. The navbar's Plan and Saved counters update instantly, and the add
   button disables itself once the plan is full at five lifts.

4. **A live training log** — the My Plan page totals exercises, minutes and calories as items
   come and go, splits them across Today's Plan and Saved tabs, and lets you mark a lift as done,
   remove it, or sort the list by duration, calories or rating.

5. **Persistent, searchable and responsive** — the plan survives a page reload through
   `localStorage`, both the library and My Plan can be searched by workout name or muscle-group
   tag, and every screen is built for mobile, tablet and desktop. Loading states, a custom 404
   page and an error boundary keep the app steady on any route.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [https://tarikul-fit-log.vercel.app/](https://tarikul-fit-log.vercel.app/) with your browser to see the result.

To build for production:

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, navbar, footer, toaster, plan provider
│   ├── page.tsx                # Home — hero + library
│   ├── loading.tsx             # Home loading animation
│   ├── not-found.tsx           # 404 page
│   ├── error.tsx               # Route error boundary
│   ├── workouts/[id]/page.tsx  # Workout detail page
│   └── my-plan/page.tsx        # Today's plan and saved lifts
├── components/
│   ├── layout/                 # Navbar, footer
│   ├── home/                   # Hero, library grid, workout card
│   ├── workout/                # Detail page actions
│   ├── plan/                   # Metrics, tabs, sort, rows, empty state
│   └── ui/                     # Brand, tag pill, stat row, spinner
├── context/plan-context.tsx    # Plan/saved/done state + localStorage
└── lib/                        # API client and shared types
```

---

## Deployment

Deployed on Vercel at [https://tarikul-fit-log.vercel.app/](https://tarikul-fit-log.vercel.app/).
Every route is reload-safe, so refreshing the home page, any workout detail page or the My Plan
page works exactly as expected in production.
