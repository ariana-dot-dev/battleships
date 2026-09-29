# Steel.dev — pricing regimes (as of 2026-09-28)
Steel sells cloud browser sessions (CDP / Playwright / Puppeteer / Selenium), not VMs. Everything is metered usage:
browser-hours (billed by the minute, rounded up), Steel proxy bandwidth, CAPTCHA solves and Browser Tools calls.
The plan decides both the unit rates and the hard limits (concurrency, max session length). Current plans launched
2026-06-26 ("Simpler pricing" blog); older Starter/Developer/Startup plans survive only for existing customers.
Browser vCPU/RAM per session are **not published**.
Verified live 2026-09-28 against docs.steel.dev/overview/pricinglimits (last edit 2026-06-30) and the steel.dev
pricing section ($30 one-time / $100 per month / $250 confirmed in page HTML).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Launch | Default, no subscription | $0 fee + usage; one-time credit | $0.10/browser-h; proxy $10/GB; CAPTCHA $3/1k; Browser Tools $5/1k; $30 one-time credit valid 90 days (~300 browser-h); 10 concurrent; **15-min max session**; 60 req/min; 7-day retention; up to 3 seats | https://docs.steel.dev/overview/pricinglimits |
| Launch, verified | Want Steel proxies or CAPTCHA solving on Launch | $10 paid-balance deposit (free credits don't count); deposit is spent on usage, not a fee | $10 deposit | https://docs.steel.dev/overview/pricinglimits |
| Scale | Need >10 concurrent, >15 min sessions, dedicated IPs, SSO/BAA | $250/mo **+ usage**; $100/mo usage credit applied to all meters (fee itself is not credit) | $0.08/browser-h; proxy $6/GB; CAPTCHA $1/1k; Tools $5/1k; 100 concurrent; **1-h max session**; 600 req/min; 14-day retention; unlimited seats | https://docs.steel.dev/overview/pricinglimits, https://steel.dev/pricing |
| Enterprise | >100 concurrent, sessions up to 24 h, stealth browser, reserved pools | Custom + usage (contact founders) | 1,000+ concurrent; up to 24 h sessions; all rates "Custom" | https://docs.steel.dev/overview/pricinglimits |
| Legacy Starter / Developer / Startup | Customers who signed up before 2026-06-26; no forced migration | Old subscription with included hours | **Third-party only**: $29 / $99 / $499 per month (costbench.com, verified 2026-06-14); included 290 / 1,238 / 9,980 h (search-engine summary, unverified). Official pages no longer publish them | https://steel.dev/blog/pricing-update, https://costbench.com/software/browser-automation/steel-dev/ |
| Browser session time | Any running session | Per minute, rounded up, from create until release()/timeout; idle time billed | 1-min effective minimum per session | https://docs.steel.dev/overview/sessions-api/session-lifecycle |
| Steel residential proxy | `useProxy` / Steel-managed proxy | Per GB, bidirectional (TLS handshakes, headers, every asset) | $10/GB Launch, $6/GB Scale, custom Ent. | https://docs.steel.dev/overview/stealth/proxies |
| Default datacenter IP / BYO proxy | No Steel proxy | Not metered by Steel | $0 | https://docs.steel.dev/overview/stealth/proxies |
| Dedicated static IP | Scale+ (Hobby/Launch must upgrade) | Monthly subscription per IP; its traffic still billed as proxy bandwidth | $5/IP/month; up to 25 self-serve | https://docs.steel.dev/overview/sessions-api/dedicated-ips |
| CAPTCHA solving | `solveCaptcha` | Per solve | $3/1k Launch (after $10 deposit), $1/1k Scale | https://docs.steel.dev/overview/pricinglimits |
| Browser Tools | `/scrape`, `/screenshot`, `/pdf` one-shot calls | Per call | $5/1k (Launch and Scale) | https://docs.steel.dev/overview/pricinglimits |
| Self-hosted steel-browser | Run the open-source Docker image yourself | Free software; you pay your own compute | $0 to Steel | https://steel.dev/pricing |
| Research grants | School email to research@steel.dev | Free credits, amount unpublished | null | https://steel.dev/pricing |
Region: all browsers run in `us-east`; the `region` parameter is accepted but proxy geolocation, not region,
controls the IP location (https://docs.steel.dev/overview/sessions-api/configuration).
## Gotchas
1. **Session caps force re-creation**: 15 min on Launch and 1 h on Scale. An 8-hour agent job needs 8+ sessions on
   Scale (state carried via Profiles/sessionContext); only Enterprise allows up to 24 h.
2. **Idle is billed**: default timeout is 5 min; a stalled client keeps the session billed until the hard timeout
   unless `inactivityTimeout` is set. Per-minute round-up means many 10-second sessions each bill a full minute.
3. **Proxy GB dominates**: at $6-10/GB, 100 GB of proxied traffic costs as much as 7,500 (Scale) to 10,000 (Launch) browser-hours.
   Measured bandwidth includes TLS handshakes and all page assets; block images/resources to cut it. BYO proxy is free.
4. **Scale fee is not credit**: $250 buys limits plus a separate $100 usage credit, so effective fixed cost is $150
   before usage offsets it.
5. **Launch anti-bot gate**: proxies and CAPTCHA need a $10 paid deposit; the $30 free credit can't be used for them
   until then.
6. **Dedicated IP traffic is not free**: $5/IP/month plus proxy bandwidth rates on all traffic through it.
7. **Browser resources unknown**: no vCPU/RAM published, so heavy pages (SPAs, video) can't be sized or compared
   on a per-core basis.
8. **Docs drift**: some doc pages still mention "Hobby / Developer / Pro" plan names (proxies, dedicated IPs pages);
   the pricing/limits page (Launch/Scale/Enterprise) is authoritative.
## Worked example
Adapted for a browser product: 50 concurrent browsers × 8 h/day × 22 days = **8,800 browser-hours**, 100 GiB of
Steel-proxied traffic. CPU util / snapshots not applicable (no snapshot product; profiles storage not priced).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Launch | No: 50 concurrent > 10, 8 h jobs vs 15-min session cap | n/a (list math would be 8,800×$0.10 + 100×$10 = $1,880) |
| Scale, no proxy | Yes (50 ≤ 100), with sessions recycled hourly (≥ 8 per browser-day; no round-up loss at exact 60-min sessions) | $250 + max(0, $704 − $100) = **$854** |
| Scale, 100 GB Steel proxy | Yes | $250 + ($704 + $600 − $100) = **$1,454** |
| Scale + 5 dedicated IPs | Yes | $1,454 + $25 = $1,479 (IP traffic already counted as proxy GB) |
| Scale, BYO proxy | Yes | **$854** + your proxy vendor's bill |
| Enterprise | Yes, sessions up to 24 h | unknown (custom rates) |
| Anti-pattern: no inactivityTimeout, 5-min stall per session | Yes | +5 min per session; at 8 sessions/browser-day = +733 h/month ≈ +$59 on Scale |