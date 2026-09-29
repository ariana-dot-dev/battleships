# Verify: browserbase (2026-09-28, independent verifier)
Sources re-fetched live: www.browserbase.com/pricing (plan cards + comparison table), docs.browserbase.com/account/billing/plans.
| Item | Result | Note |
|---|---|---|
| Free $0: 1 browser-hour, 3 concurrent, 15 min/session, 5 creations/min, no proxies/CAPTCHA, overage N/A | confirmed | docs + pricing |
| Developer $20: 100 browser-h then $0.12/h; 1 GB proxy then $12/GB; 25 concurrent; 6 h sessions; 25/min | confirmed | |
| Startup $99: 500 browser-h then $0.10/h; 5 GB proxy then $10/GB; 100 concurrent; 6 h; 50/min | confirmed | |
| Scale custom: 250+ concurrent, 500+ h ("Flexible"), 6+ h, 150+/min, HIPAA BAA/DPA/SSO | confirmed | |
| Billing by the minute and per MB, rounded, 1-min and 1-MB minimum per session | confirmed | docs |
| "Allocations, not limits ... No caps. No cut-offs." | confirmed | docs |
| Agents 3/15/50; Search 1k then $7/1k; Fetch 1k/1k/10k; Extract $4/1k ($7 with proxies); Fetch with proxies $4/1k | confirmed | |
| Startup Fetch overage | conflict | pricing plan card "$1/1k", comparison table + docs "$0.5/1k" (added as caveat) |
| Data retention Developer 7 days (docs) vs 30 days (pricing table) | confirmed conflict | |
| Auto CAPTCHA on paid plans; stealth Basic/Basic/Advanced (Verified on Scale) | confirmed | |
| SOC2 all plans | confirmed | docs security table |
| Functions free on every plan | confirmed | docs |
| Regions us-west-2/us-east-1/eu-central-1/ap-southeast-1 | not re-checked | |
Plan-rate coupling: modes developer/startup/scale carry requires_plan "Developer"/"Startup"/"Scale". confirmed; the
Free plan has no mode and is never picked for billable usage.
Corrections:
- Re-added proxy pricing as knobs proxy_developer ($12/GB, modes ["developer"]) and proxy_startup ($10/GB, modes
  ["startup"]), effect egress_gib_rate, default 0 = no Browserbase proxy / custom proxy.
  included_usd ($12 / $50 of browser hours) from the whole bill, including proxy (small over-credit).
  card is currently never priced. Recorded as a card caveat.