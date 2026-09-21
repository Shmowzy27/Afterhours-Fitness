# Afterhours

A personal, local-first fitness PWA for a night-shift routine in Davao. All project files live in this folder. The app has no runtime dependencies, telemetry, paid APIs, or cloud database of personal records.

## Use the app

1. Open the delivered hosted link and choose **Set up my plan**.
2. Confirm work/off-day schedules, equipment, food restrictions, pantry stock, and budget. Measurements are optional.
3. Review the proposed plan before accepting. Then use Today for meals and habits, Training for sets, Meals for recipes and shopping, and Progress for check-ins and notes.
4. Settings contains price updates, backup import/export, reminder settings, calendar downloads, and installation help.

On iPhone, open the hosted link in Safari → Share → Add to Home Screen → Add. On Mac, Safari → File → Add to Dock. Those installation actions must be completed on the device. Open once online so the service worker can cache the app. Verify offline access on each actual device. The private hosted link may require signing into the owner's account.

Records are per origin and per browser/device. Local preview records do not transfer automatically to the hosted app. Export and import a backup to transfer them. Clearing browser data may erase records; keep backups. Hosting updates never intentionally clear localStorage.

## Screen map

- **Today:** selected waking day, next session, planned meals, quick meal logging, three daily habits, optional XP.
- **Training:** repeatable full-body routine, technique cues, equipment-safe substitutions, sets/reps/load/effort, previous performance, lighter session and history.
- **Meals:** seven-day menu, swaps, editable times/portions, scaled complete recipes, clipboard, favorites, consolidated grocery list.
- **Progress:** optional weight chart, hunger/energy, conservative weekly review, journal.
- **Settings:** preferences, local stock/prices, reminders/calendar, installation, data transfer/deletion, cited planning rules.

## Planning rules

- Asia/Manila is fixed explicitly. Each plan entry is keyed by waking-day date. After-midnight events are converted to the following calendar date without changing their waking-day identity.
- Suggested strength days are Monday/Wednesday/Friday, editable to up to three nonconsecutive days. No equipment is assumed before onboarding. Unknown written limitations pause exercise selection. Barbells are recorded but not prescribed because rack/safety support is unverified.
- Workday sessions must fit before shift preparation. If at least 15 minutes fit, shorten the session; otherwise move the same session to 02:30. Explicit rescheduling can use the after-work period. Completed sessions are immutable snapshots. Duplicate workout logs for a waking day are rejected.
- Beginners, returning users, short sessions, and lighter sessions use two sets; longer experienced sessions use three. Progress only to a listed available weight when every prior completed set reaches the top of the range at effort ≤8, respecting the declared increment. No heavier listed weight means hold the load.
- Meals filter by listed allergens, ingredient dislikes, diet, available kitchen equipment, and preparation time. Unknown allergy notes pause generation. Packaged ingredients still require label and cross-contact checks. Menus repeat adjacent days to support leftovers; batch cooking is optional and requires cold storage.
- Recipe food quantities, household estimates, and instructional water volumes scale together; cooking times remain estimates. Weights are raw edible quantities except labeled canned/drained foods. Groceries sum duplicate ingredients and subtract raw-equivalent pantry stock, then round purchases up to packages. Consumed cost includes pantry food value; purchase cost does not. All starting prices are illustrative, not observed Davao prices. Store manual receipt prices and source notes in Settings.
- The menu is a template, not a constraint optimizer or clinical diet. Economical mode uses a lower-cost recipe rotation; other modes prioritize variety or speed. Any package-cost overrun is flagged rather than silently shrinking meals. Limited recipe/kitchen coverage can yield no plan. A flagged plan is not claimed to be budget-feasible.
- Optional adult energy estimates use Mifflin–St Jeor × activity factor (1.2/1.4/1.6); the fat-loss preference starts at 90% of that estimate. Other priorities use the maintenance estimate. Protein reference is 1.6 g/kg. Portions use quarter-serving steps and may differ from targets. Habit-only mode has no calorie/protein targets.
- A target review needs 3 weight entries in each of two weeks, 10 explicitly complete food days and 7 hunger/energy entries over 14 days. Missing entries are unknown. Frequent hunger/low energy can propose +100 kcal; the user accepts or declines. There are no automatic calorie cuts and at most one accepted/declined review per seven days.
- XP rewards logged meals, training, and recovery habits, with no streak reset or end-of-journey lockout.

## Notifications: explicit delivery limitation

The app **does not have active scheduled background push**. OneSignal's free web push plan and scheduled-message API were researched on 2026-09-21. Connecting them needs the owner's provider account plus an authenticated server-side scheduler capable of reconciling/cancelling pending messages. No provider account or such scheduler is configured; no billing was activated, no API secrets were embedded, and no notification endpoints are collected. There is no fake foreground timer pretending to be background push.

Settings offers a clearly labeled immediate device-notification test and a seven-day `.ics` calendar export with five-minute alerts. Quiet/sleep windows and completed items are excluded. Stable UIDs plus sequence revisions identify updated events, but calendar importers vary: **use a dedicated Afterhours calendar, remove its prior events, then import the replacement export after edits**. Local files cannot silently cancel already imported events. Delivery and permissions must be checked on actual devices. iPhone web notifications require a Home Screen installation; Focus, internet, and OS policies can delay or suppress push. Calendar alerts depend on calendar notification settings.

## Sources and estimates

Sources are linked in Settings and `dist/content.js`: CDC activity guidance; Mifflin et al. 1990; Morton et al. 2018; DOST-FNRI PhilFCT; USDA leftover safety; WebKit iOS web push; OneSignal pricing.

Direct PhilFCT nutrient record extraction was unavailable. Bundled nutrient numbers are generic planning approximations, **not claimed to be verified PhilFCT data**. Prices and availability are not live. Ten bundled recipes and ten movements support the initial planner; coverage is limited for specialized allergies or kitchen setups.

## Development / verification

This is dependency-free static ES-module code in `dist/`, authored directly. `server.mjs` serves it locally with Node on port 4173. `npm start`, `npm test`, and `npm run check` work with a regular Node installation. No compilation is needed. `tests/browser.mjs` uses the existing bundled Playwright and locally installed Chrome; those absolute runtime paths are environment-specific.

The automated core suite covers waking-day attribution, equipment restrictions, fallback timing, reminder identity/quiet hours, allergy-safe swaps, recipe quantities, grocery costs, budget overruns, insufficient-data review, history preservation, progression, and backup validation. Browser QA exercises onboarding, session/meal workflows, persistence, offline reload, and all five phone layouts. Test records only exist in an isolated browser profile and are not shipped in the app.

Actual iPhone/Mac installation, notification appearance, calendar alert firing, Safari-specific offline behavior, and service-provider uptime remain device/service checks. No test claims that those actions occurred on the user's devices.
