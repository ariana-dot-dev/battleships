# Cloudflare Browser Run / Kitesurf — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Quick Actions | Stateless screenshot/PDF/content | Browser hours | $0.09/hour beyond the paid 10-hour allowance; no concurrency fee | https://developers.cloudflare.com/browser-run/pricing/ |
| Browser Sessions | CDP/Playwright/Puppeteer | Time plus monthly average of daily peak concurrency | $0.09/hour beyond 10 hours; $2 per averaged browser beyond 10 | https://developers.cloudflare.com/browser-run/pricing/ |
| Workers base | Paid account | Monthly platform fee | $5/month + Workers usage | https://developers.cloudflare.com/workers/platform/pricing/ |
| Kitesurf | Beta stateless agent browser | Free within limits | No published post-beta rate | https://developers.cloudflare.com/browser-run/kitesurf/ |
| Workers Free | Account plan | Monthly fee / commitment | $0; concurrency 3; Chromium 10 min/day hard quota; Kitesurf beta account limits. No published CPU/RAM size. | https://developers.cloudflare.com/browser-run/pricing/ |
| Workers Paid | Account plan | Monthly fee / commitment | $5; concurrency 200; 10 included browser-hours/month, valued at $.09/hour. Ten averaged concurrent browsers included; each additional averaged browser costs $2/month. Workers requests and CPU may add charges. | https://developers.cloudflare.com/browser-run/pricing/ |
## Gotchas
- Concurrency fees use the monthly average of daily peak concurrency, not the monthly maximum or a time-weighted average.
- Browser usage is metered in seconds and the monthly sum is rounded to the nearest hour. Do not impose a one-hour minimum on each start.
- The paid technical concurrency cap is 200; the billing allowance is only 10 averaged browsers. Keep-alive limits concern inactivity, not maximum active session length.
- Kitesurf is a beta, stateless alternative without full Chromium graphics, video, WebGL or long-lived authenticated state. Its zero price is not a free general-purpose computer.
- Worker requests/CPU, inference, recording storage and other unpriced charges remain separate. No browser CPU/RAM allocation guarantee was found.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
For a 30-day month, assume peak concurrency 50 on 22 workdays and zero on the other days. Average daily peak = 50×22/30 = 36.6667. Concurrency fee = (36.6667−10)×$2 = $53.33. Runtime = (8,800−10)×$.09 = $791.10; Workers base = $5. Subtotal: **$849.43**, excluding Worker requests/CPU and unpriced extras. If daily peak is 50 every day, the fee is $80 and subtotal $876.10. Hardware and arbitrary snapshot equivalence remain unverified.
## Sources
- https://developers.cloudflare.com/browser-run/pricing/
- https://developers.cloudflare.com/browser-run/llms-full.txt
- https://developers.cloudflare.com/browser-run/limits/
- https://developers.cloudflare.com/browser-run/kitesurf/
- https://developers.cloudflare.com/workers/platform/pricing/
Current limits page (updated 2026-09-26) confirms **200** simultaneous browsers, **3 new instances/second**, **30 Quick Actions/second** on Workers Paid. The old 120-concurrency figure in earlier comparisons is superseded. Source: https://developers.cloudflare.com/browser-run/limits/