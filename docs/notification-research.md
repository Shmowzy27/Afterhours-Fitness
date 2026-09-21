# Background notification research — 2026-09-21

- OneSignal pricing: https://onesignal.com/pricing — a free web-push tier is advertised. Free plan limits and service terms can change. No paid plan was opened.
- API delivery scheduling: https://documentation.onesignal.com/reference/create-message — sending scheduled messages is server-side and needs provider credentials.
- iOS requirements: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/ — Home Screen web apps may request web notification permission through direct user interaction. Apple Developer membership is not required for web push.
- No OneSignal account access or authenticated scheduling backend is provided in this workspace. Keeping API secrets in a static app would expose them, so no fake connection is shipped.
- The implemented fallback is calendar export, explicitly labeled in the UI. Updating a local plan cannot revoke events from an external Calendar app; replacement instructions are shown on export and edit.
- A future secure implementation should store only subscription identifiers, delivery timestamps, and opaque event IDs, authorize every mutation with an owner token, reconcile by stable event ID, cancel obsolete scheduled messages, enforce sleep/quiet hours server-side, rate-limit test delivery, and never send measurements or workout logs to the provider.
