# Afterhours Fitness

A local-first fitness planner for people whose waking day does not fit a typical daytime schedule. It combines strength training, meal planning, recipes, grocery estimates, reminders, progress records, and optional game-style progression in one installable web app.

## Features

- Schedule-aware meal and workout suggestions for workdays and days off
- Time-zone support for cities in the Philippines, Australia, and Singapore
- AUD, PHP, and SGD display with current planning exchange rates
- Equipment-aware strength sessions, technique cues, readiness choices, and conservative load progression
- Meal recommendations filtered by allergies, diet, kitchen equipment, and preparation time
- Complete recipes, embedded cooking and exercise tutorials, and a consolidated grocery list
- Optional TDEE estimates, nutrition targets, check-ins, notes, XP, ranks, and achievements
- Light and dark themes, offline caching, calendar alerts, and JSON backup/restore
- Device-local records with no analytics or account requirement

## Run locally

Requires Node.js 20 or newer.

```bash
npm start
```

Then open `http://localhost:4173`.

## Verify

```bash
npm test
npm run check
```

The unit tests use Node's built-in test runner. To run the optional browser checks, install the development dependencies with `pnpm install`, then run `pnpm exec playwright install chromium`. Browser checks expect the local server to be running. Set `CHROME_PATH` to use an existing Chrome installation; otherwise Playwright uses its managed browser.

## Deploy on Cloudflare Pages

Connect this repository to a Cloudflare Pages project. Leave the build command empty and set the output directory to `dist`. The included `wrangler.toml` and `dist/_headers` files also support direct deployment with Wrangler.

## Data and privacy

Personal records are stored in the browser under the `afterhours.v1` local-storage key. They are not included in the repository or uploaded by the app. Export a JSON backup before clearing browser data or moving to another device.

Food composition uses FSANZ AFCD for Australia, DOST-FNRI for the Philippines, and Health Promotion Board references for Singapore. Open Food Facts supplies packaged products and barcodes. Prices and currency conversions are planning estimates.

The calculation rules and primary references are documented in [`docs/methods.md`](docs/methods.md).

## Project structure

- `dist/` — complete static application
- `tests/` — unit and browser checks
- `docs/` — verification and data provenance
- `server.mjs` — local static server

The app is dependency-free at runtime. Playwright is used only for browser verification.
