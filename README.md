// File: README.md
# Excel‑Style React App (Next.js → Vercel)


This template lets you upload a `.xlsx` file in the browser, renders it in an Excel‑like grid (multiple sheets, formulas, values), and exports back to `.xlsx` — no server required.


## Stack
- **Next.js 14 (App Router)** – Vercel‑ready.
- **Luckysheet** – Excel‑like UI (tabs, formula bar, context menus).
- **SheetJS (xlsx)** – Parse/emit `.xlsx` fully on the client.


## Quick start
```bash
pnpm i # or npm i / yarn
pnpm dev
```
Open http://localhost:3000, click **Upload Excel**, and pick your workbook.


## Deploy on Vercel
1. Push this folder to GitHub.
2. In Vercel → **New Project** → import repo → Framework: Next.js → defaults.
3. Deploy. (No env vars or server needed.)


## Notes & limits
- Most formulas import; very exotic Excel features (Power Query, external connections, macros) aren’t supported in‑browser.
- Formatting/styles are partially preserved; you can extend `convert.ts` to map styles.
- Very large workbooks may be heavy in the browser; consider splitting by business area.


## Customisation ideas
- Lock down certain sheets (read‑only) by post‑processing `data`.
- Add buttons to run domain logic (e.g., compute quote summary) with your TypeScript functions reading/writing `celldata`.
- Save to a backend (Supabase/Planetscale) if you need persistence and auth.
