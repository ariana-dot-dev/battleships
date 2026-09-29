# Browserbase — pricing regimes (as of 2026-09-28)
Browserbase sells cloud Chrome sessions (each in a dedicated VM destroyed after the session) plus metered side APIs
(Search, Fetch/Extract, Agents, Model Gateway). Paid plans are "allocation + overage": a monthly fee buys included
browser-hours and proxy GB, then pay-as-you-go overage with "no caps, no cut-offs". Browser vCPU/RAM are **not
published**. The plan sets the overage rate, concurrency, session length and creation rate.
Verified live 2026-09-28 against the www.browserbase.com/pricing HTML (cards + comparison table) and
docs.browserbase.com/account/billing/plans. No annual/commit pricing is published.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | Default, no card | $0; hard allocation, overage N/A | 1 browser-hour/mo; 3 concurrent; 15-min sessions; 5 creations/min; no proxies, no CAPTCHA, no keepAlive; 3 agent runs, 1k Search, 1k Fetch, $5 model tokens; 7-day retention | https://www.browserbase.com/pricing, https://docs.browserbase.com/account/billing/plans |
| Developer | Small projects; unlocks proxies | $20/mo fee (not credit) + overage | 100 browser-h incl., then **$0.12/h**; 1 GB proxy incl., then **$12/GB**; 25 concurrent; 6 h sessions; 25 creations/min; auto CAPTCHA; basic stealth; 15 agent runs; up to 2 projects | same |
| Startup | Production | $99/mo fee + overage | 500 browser-h incl., then **$0.10/h**; 5 GB proxy incl., then **$10/GB**; 100 concurrent; 6 h sessions; 50 creations/min; 30-day retention; 50 agent runs; 10k Fetch; up to 5 projects | same |
| Scale | >100 concurrent, Verified, compliance | Custom, usage-based (sales) | 250+ concurrent; 500+ / "Flexible" hours; 6+ h sessions; 150+ creations/min; HIPAA BAA, DPA, SSO; 30+ day retention | same |
| Browser time | Any session | Per minute (rounded), 1-min minimum per session | — | https://docs.browserbase.com/account/billing/plans |
| Residential proxy | Developer+ (`proxies: true`) | Per MB (rounded), 1-MB minimum per session; all data through the proxy incl. headers | $12/GB Dev, $10/GB Startup, custom Scale, after included GB | https://docs.browserbase.com/platform/identity/proxies |
| Custom (BYO) proxy | Developer+ | No Browserbase charge documented | $0 (your vendor bills) | https://docs.browserbase.com/platform/identity/proxies |
| CAPTCHA solving | Paid plans | Included, no per-solve price | $0 | https://www.browserbase.com/pricing |
| keepAlive sessions | Paid plans only | Session survives disconnects; billed until REQUEST_RELEASE or timeout | per-minute browser rate | https://docs.browserbase.com/platform/browser/long-sessions/overview |
| Search API | All plans | Per call after 1k/mo | $7/1k | https://www.browserbase.com/pricing |
| Fetch / Extract API | All plans | Per call after allocation (1k Dev / 10k Startup) | Fetch $1/1k (Dev), $0.50/1k (Startup); $4/1k with proxies; Extract $4/1k, $7/1k with proxies | same |
| Functions | All plans | Hosted TS runtime free (us-west-2, 60-900 s); browser time still billed | $0 | https://docs.browserbase.com/account/billing/plans, https://docs.browserbase.com/platform/functions/limits |
| Model Gateway | All plans | Pass-through at market price | $5 tokens on Free | https://www.browserbase.com/pricing |
| Regions | us-west-2 default; us-east-1, eu-central-1, ap-southeast-1 | No regional price difference published | multiplier 1 | https://docs.browserbase.com/optimizations/latency/multi-region.md |
## Gotchas
1. **Included hours cost more than overage**: Developer's $20 for 100 h = $0.20/h vs $0.12/h overage; Startup $99 /
   500 h = $0.198/h vs $0.10/h. The fee is not a usage credit.
2. **6-hour session cap** on Developer/Startup (15 min on Free): long agent runs need to be split; carry state in Contexts.
3. **keepAlive leaks money**: sessions survive disconnects and bill "unneeded browser minutes" until released or timed out.
4. **Per-session minimums**: 1 minute and 1 MB per session. Thousands of 5-second sessions each bill a full minute.
5. **Proxy GB dominates** at $10-12/GB; the 1 / 5 GB included is tiny for scraping.
6. **Concurrency steps**: 25 → 100 → Scale (sales). 26 concurrent browsers forces Startup; 101 forces a sales call.
7. **Creation rate limits**: 50/min on Startup means 100 browsers take ~2 min to spin up.
8. **Docs vs pricing page conflict** on Developer data retention (7 days in docs, 30 days in the pricing table).
9. Browser VM size unknown, so heavy pages can't be sized or compared per core.
## Worked example
Adapted for a browser product: 50 concurrent browsers × 8 h/day × 22 days = **8,800 browser-hours**, 100 GiB
Browserbase-proxied traffic. Snapshots / CPU util not applicable (Contexts storage not priced).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free | No (3 concurrent, 1 h/month) | n/a |
| Developer | No (50 > 25 concurrent) | n/a (list math: $20 + 8,700×$0.12 + 99 GB×$12 = $2,252) |
| Startup, no proxy | Yes; each 8 h browser-day split into ≥ 2 sessions (6 h cap) | $99 + (8,800 − 500)×$0.10 = **$929** |
| Startup, 100 GB proxy | Yes | $929 + (100 − 5)×$10 = **$1,879** |
| Startup, custom proxy | Yes | $929 + your proxy vendor |
| Scale | Yes | unknown (custom) |
| Anti-pattern: keepAlive sessions left 30 min after each job (2 per browser-day) | Yes | +50×2×22×0.5 h = +1,100 h ≈ **+$110** |