# Hyperbrowser — pricing regimes (as of 2026-09-28)
Hyperbrowser (S2 Labs Inc.) sells cloud Chrome sessions for agents/scraping on a **credit** system:
**1 credit = $0.001**. Browser time is **100 credits/hour = $0.10 per browser-hour**, billed per second, the same on
every plan; proxy data is **10,000 credits/GB = $10/GB**. Monthly plans (Startup $30, Scale $100) include exactly
their fee in credits, so the fee behaves as usage credit; plans differ in concurrency, retention and features.
All figures are list prices. Browser vCPU/RAM are not disclosed.
Launched: 2024-12-10 (Show HN "Hyperbrowser – Scalable Browser Infrastructure for AI Apps", https://news.ycombinator.com/item?id=42381712); SDK on npm 2024-12-03.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | Sign-up, no card | Credits only; must upgrade when exhausted | 5,000 credits ($5; ~50 browser-h); 1 concurrent; 7-day retention; no proxy/CAPTCHA | https://www.hyperbrowser.ai/pricing, https://hyperbrowser.ai/docs/sessions/parameters.md |
| Startup | Up to 25 concurrent | $30/month -> 30,000 credits/month (fee = credit), extra credits at $0.001 | 25 concurrent; 30-day retention; auto CAPTCHA; basic stealth; residential proxies | https://www.hyperbrowser.ai/pricing |
| Scale | Up to 100 concurrent | $100/month -> 100,000 credits/month (fee = credit) | 100 concurrent; premium residential proxies; 30-day retention | same |
| Enterprise | >100 concurrent, compliance | Custom, volume discounts; 14-day trial; ACH/invoices | 1000+ concurrent; ultra stealth; custom proxy; asia-south; HIPAA/SOC 2; 180+ day retention | same + pricing FAQ |
| Top-up credits | Beyond plan credits | Manual purchase or auto-reload, 1 credit = $0.001; expire after 12 months | $0.001/credit | https://hyperbrowser.ai/docs/pricing.md |
| Browser session | Session running (create -> stop/timeout) | Per second, per active browser instance | $0.10/h | https://hyperbrowser.ai/docs/pricing.md |
| Session lifetime | timeoutMinutes 1-720 (default = team setting); stops on CDP disconnect unless keepAlive | Billed until stopped/timeout | max 12 h | https://hyperbrowser.ai/docs/api-reference/create-new-session.md, https://hyperbrowser.ai/docs/sessions/lifecycle.md |
| Proxy data | useProxy=true (paid plans) | Per GB | $10/GB | https://hyperbrowser.ai/docs/pricing.md |
| Web APIs | Fetch / Scrape / Search / Extract | Per page / query / token | $0.001/page; +$0.009 w/ proxy; search $0.005/q; extract $30/M output tokens | same |
| Agent tasks | HyperAgent / Browser Use / CUA models | Per step ($0.02) or per token + browser time | e.g. Claude Sonnet $3.15/$15.75 per M tokens | same |
| Static IPs | Dedicated IPs | Separate static-IP plans | unpublished | https://hyperbrowser.ai/docs/sessions/static-ips.md |
| Regions | us, us-central, us-east, us-west, europe-west; asia-south Enterprise/Select | No regional surcharge published | multiplier 1 (assumed) | https://hyperbrowser.ai/docs/sessions/regions.md |
| Sandboxes | Firecracker VMs (default 2 vCPU/2 GiB/8 GiB) | Not published | null | https://hyperbrowser.ai/docs/sandboxes/create.md |
## Gotchas
1. **Proxy dominates.** $10/GB proxy vs $0.10/h browser: 10 GB of proxy traffic costs as much as 1,000 browser-hours.
2. **Session timeouts bill.** With keepAlive, a forgotten session runs (and bills) until its timeout — up to 12 h.
3. **Free plan is tiny**: 1 concurrent browser and no proxies/CAPTCHA; credits appear to be a one-time test allowance.
4. **Plan = concurrency.** Rates are identical across plans; you upgrade only for concurrency (1 / 25 / 100 / 1000+) and features.
5. Top-up credits expire after 12 months; plan credits refresh at renewal (unused plan credits presumably do not roll over — not stated).
6. Browser resources and isolation are undocumented; SOC 2 status unverified.
## Worked example (closest browser analogue)
Workload mapped to **50 concurrent browsers x 8 h/day x 22 days = 8,800 browser-hours/month**. 50 concurrent needs
**Scale** ($100 = 100,000 credits). "30% CPU" has no effect (billed per session wall-clock). 50 GiB snapshots: no
equivalent (profiles unpriced) -> $0 assumed. 100 GiB egress: modelled two ways.
| Line | Calculation | Cost |
|---|---|---|
| Browser time | 8,800 h x $0.10 | $880.00 |
| Scale plan | $100 fee, converted to $100 credit | covered by usage (net +$0) |
| Subtotal (no proxy) | max($100, $880) | **$880.00** |
| + 100 GB through Hyperbrowser proxy | 100 x $10 | +$1,000.00 -> **$1,880.00** |
| + 100 GB direct (non-proxy) egress | not metered per docs (assumed) | +$0 |
Headline: **$880/month** without proxies, **$1,880/month** if the 100 GB goes through their residential proxy.