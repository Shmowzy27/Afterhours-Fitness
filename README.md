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

Direct PhilFCT nutrient record extraction was unavailable. Energy and protein values are now extracted from the **official USDA FoodData Central SR Legacy dataset (April 2018)**. Each ingredient has its record ID, food description, source link, and matching limitations. The source archive hash and exact extracted values are retained in `docs/nutrition-provenance.json`, with the reproducible extractor in `scripts/extract-nutrition.py`. Recipe totals remain calculated estimates; sardines including sauce, green papaya, and cane vinegar use explicitly flagged proxy records. This is **not claimed to be verified PhilFCT data**. Prices and availability are not live. Ten bundled recipes and ten movements support the initial planner; coverage is limited for specialized allergies or kitchen setups.

## Development / verification

This is dependency-free static ES-module code in `dist/`, authored directly. `server.mjs` serves it locally with Node on port 4173. `npm start`, `npm test`, and `npm run check` work with a regular Node installation. No compilation is needed. `tests/browser.mjs` uses the existing bundled Playwright and locally installed Chrome; those absolute runtime paths are environment-specific.

The automated core suite covers waking-day attribution, equipment restrictions, fallback timing, reminder identity/quiet hours, allergy-safe swaps, recipe quantities, grocery costs, budget overruns, insufficient-data review, history preservation, progression, and backup validation. Browser QA exercises onboarding, session/meal workflows, persistence, offline reload, and all five phone layouts. Test records only exist in an isolated browser profile and are not shipped in the app.

Actual iPhone/Mac installation, notification appearance, calendar alert firing, Safari-specific offline behavior, and service-provider uptime remain device/service checks. No test claims that those actions occurred on the user's devices.

## Schedule suggestions, videos, and evidence update

Today → **Suggest my timing** or Settings → **Suggest my meal & workout times** proposes editable workday and day-off schedules. Onboarding also has suggested/manual timing modes. A suggested workout begins 45 minutes after waking on workdays (60 minutes on days off), subject to session length, shift preparation, and sleep. If needed, the same session moves into an awake portion of the 2–5 a.m. backup window. If no suitable window exists, the app flags it rather than placing a workout during sleep. Meal suggestions use waking time, shift midpoint/end, and the sleep boundary. These are logistical defaults, not medically optimal timing claims; actual work-break availability must be confirmed. Applying timing preserves completed workout/meal records and existing food choices.

**TDEE calculator** is available in Settings and Progress and recalculates as height, weight, age, equation coefficient, and activity are entered. Onboarding also shows live estimates when nutrition estimates are selected. It distinguishes resting energy, maintenance/TDEE, and a rounded goal-based starting target. It does not invent missing measurements or change saved targets until accepted.

All ten exercises and ten recipes have **in-app YouTube players**, loaded only when the tutorial is opened. Closing the tutorial/dialog removes the player. Videos need internet, remain hosted by their publishers, and may be blocked or unavailable; source and search links are available as fallback. Every cooking guide is a related technique rather than the exact app recipe; variations and allergen differences are labeled. Nothing is downloaded for offline playback.

**Daily coaching** includes a readiness choice, lighter session or recovery day, written cues, and a technique self-report for each exercise. All planned sets must reach the top of the rep range at effort 8 or less with reported controlled technique before suggesting a heavier available weight. Partial sessions still count. This app cannot observe or verify form. Legacy records without a technique report hold progression until a new qualifying session.

**Dark mode** offers Light, Dark, or Follow device in Settings; the preference persists on that browser. **Journey XP** awards 20 per completed exercise per waking day, 30 per saved session, 10 per logged planned meal or daily essential. XP is derived from unique records, so toggles and duplicate imports cannot accumulate extra rewards. Correcting a record recalculates rewards. All 31 ranks/divisions run from Iron IV through Challenger with 250 XP per step; eight achievements show locked requirements and unlock from actual records. No rewards for weight loss, extreme effort, extra reps, or restriction; missed days never deduct XP. Rank names follow Riot’s published ladder but this is an independent fitness system, not affiliated with Riot.

The Training evidence panel links the ACSM 2026 position stand and CDC recommendations, while distinguishing research-supported principles from the app's practical rules. Recipe source panels expose USDA inputs and proxy matches. Individual outcomes are not guaranteed, and the full app routine has not been clinically validated as a standalone program.

## Recipe-based recommendations

Meals now shows “Recommended for you.” Choose recipes there, or save favorites from recipe details. Compatible choices drive recommendations and new weekly menus; breakfast/main-dish gaps use other compatible recipes. Dietary restrictions, allergies, kitchen equipment, and prep time always apply. “Use recommendations in my menu” previews the updated meals and grocery cost before applying changes to today/upcoming unlogged meals. Past days, logged food, workout history, meal times and identifiers remain intact. Expired weeks have a visible “Review next 7 days” action instead of an empty daily menu.
