# Verification — 2026-09-21

## Passed

- 16 automated core checks covering waking-day/timezone attribution; unavailable equipment and limitations; pre-shift fallback; reminder identity after repeated rescheduling; sleep/quiet filtering; allergy-safe generation/swaps; recipe food and water scaling; household conversions; pantry/package math; budget overrun detection; insufficient-data target hold; completed-history preservation; available-weight progression; validated backup round trip; weekly review lockout; breakfast/main-meal selection.
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
- Nutrient and local-price accuracy: bundled estimates are not verified local quotes or direct PhilFCT nutrient extraction.

All test records were confined to isolated browser contexts. The delivered app starts with no personal records.
