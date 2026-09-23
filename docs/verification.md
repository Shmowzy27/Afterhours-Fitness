# Verification — 2026-09-21

## Passed

- 26 automated core checks covering waking-day/timezone attribution; unavailable equipment and limitations; pre-shift fallback; reminder identity after repeated rescheduling; sleep/quiet filtering; allergy-safe generation/swaps; recipe food and water scaling; household conversions; pantry/package math; budget overrun detection; insufficient-data target hold; completed-history preservation; available-weight progression; validated backup round trip; weekly review lockout; breakfast/main-meal selection.
- Isolated Chrome browser: full onboarding → review → accept, check-in, workout with completed-set filtering, recipe scaling/grocery addition, state after reload, offline reload and Meals navigation.
- Desktop 1440 × 1050 and phone 393 × 852. All five phone views checked for horizontal document overflow; none detected. Screenshots reviewed for desktop welcome/Today and phone Today.
- Browser: backup download and validated import/replace, complete recipe clipboard text, allergy restrictions in swap options, calendar file download.
- Immediate notification created through service-worker notification API in isolated Chrome, then closed. This verifies API integration, not visibility or scheduled delivery on a physical device.
- Browser tests recorded no page JavaScript errors after fixes.

## Still requires user/device or provider verification

- Safari Add to Home Screen on iPhone and Add to Dock on Mac.
- Actual Safari offline launch after installation and login to private hosting.
- Actual notification appearance, Focus permissions, and imported Calendar alerts firing.
- Background push remains disconnected: no authenticated provider account/scheduler is configured. Calendar fallback is explicit, and old calendar events must be replaced after plan edits.
- Nutrient and local-price accuracy: prices are not verified local quotes; regional nutrient inputs are traceable, but recipe totals and ingredient proxy matches remain estimates. Philippine foods use the DOST-FNRI reference.

All test records were confined to isolated browser contexts. The delivered app starts with no personal records.

## Follow-up checks

- Automated TDEE calculation and invalid/missing input handling.
- Schedule suggestions across midnight, late waking, and unavailable backup windows.
- Bundled food records use the supported AFCD, FNRI, and HPB composition sources.
- All ten exercises have external demonstration links; all ten recipes have cooking-video search links. Publisher pages/video identities checked through web research; actual playback depends on their availability.

- Readiness: normal/lighter/recovery paths; recovery removes the pending workout without touching completed history.
- Progression: partial sets, missing/uncertain technique, and effort over 8 hold weight increases. Controlled, fully completed sets can qualify.
- Dark theme persistence, mobile dialog and achievement layout. Corrected remaining white exercise/budget/chart panels after visual review.
- XP deduplication, all rank boundaries, locked/unlocked achievements, restoration from backup, and form-report persistence.
- All ten exercises and all ten recipes now have explicit YouTube embeds. Tutorial expand/collapse and dialog close manage iframe lifecycle; offline fallback works. A real exercise player loaded the correct publisher/title/channel in Chrome, but playback itself was not confirmed by the automation. YouTube/provider restrictions and real-device playback remain external verification limits.
- Final browser.mjs, suggestions-browser.mjs, and coaching-browser.mjs passed without page JavaScript errors. Player availability is not mocked into a playback-success claim.

## Meal recommendation fix

- 29 core tests pass, including chosen-recipe scheduling, restriction-safe fallback, and preservation of past days, logged meals, workout schedules and meal identities.
- Dedicated browser test passes: choose recipes → recommendations → preview → apply → reload, plus expired-week renewal and mobile overflow check.
- Reviewed phone screenshot of the recommendations section and resulting menu.

## Food exclusions and empty-state recovery

- Inspected the affected browser's food form: checked exclusions and the text “seafoods” accounted for the empty menu. User confirmed all were entered as desired foods and authorized clearing both.
- 32 core tests pass. Known allergy words map to explicit exclusions (seafood → fish + shellfish); unknown fragments still pause planning. Diagnostic reasons cover exclusions, avoided ingredients, diet, equipment, and recipe time.
- Local browser verified direct food-filter editing and the originally reported combination yielding three compatible recipes, a populated menu, and a nonempty grocery estimate. The direct editor preserves unrelated profile settings.
- An entirely empty saved menu is rebuilt when compatible recipes become available, preserving the stored allergy text, training schedule, and food records. No-menu budgets no longer claim success, and empty grocery tables explain the missing menu.

## Editorial and evidence review — 2026-09-22

- Replaced broad motivational slogans with direct descriptions of the schedule, meal filters, training session, and saved records.
- Added an in-app methods panel and a public methods document naming the ACSM position stand, CDC adult activity guidance, Mifflin–St Jeor equation, Morton protein meta-analysis, and regional AFCD, FNRI, and HPB composition sources.
- Distinguished source findings from product implementation rules and stated that the complete program has not been tested as a clinical intervention.
- Fixed service-worker cache cleanup so this revision replaces older installed shells.
- All 36 unit checks and the four primary browser flows passed in Chrome at desktop and phone sizes. No horizontal document overflow or page JavaScript errors were found.
