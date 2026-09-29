# Anchor Browser — pricing regimes (as of 2026-09-28)
Anchor Browser sells cloud Chromium sessions for AI agents plus agentic "tasks" and managed authentication
(OmniConnect). Everything is paid in **dollar-denominated credits (1 credit = $1)**. The "Infrastructure plan"
(browser use without tasks) costs **$0.01 per browser created + $0.05 per browser-hour** (active time, nearest full
minute) + **$8/GB Anchor proxy**, or **$0.20/GB egress** when proxyless / BYO proxy. Monthly plans convert their fee
1:1 into credits; overage is $1/credit (i.e. same rates). All figures are list prices. Browser vCPU/RAM and
isolation are not disclosed.
Launched: ~2025 (company founded 2024; SDKs on npm 2025-07-21 / PyPI 2025-07-22; first HN submission 2025-08-15,
https://news.ycombinator.com/item?id=44916297; $6M seed led by Blumberg Capital announced 2025-10-22). Exact public
launch date unverified.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | Sign-up | $5 (5 credits) per month; no overage | 5 concurrent; 5 sessions/min; up to 500 sessions; US only; 7-day retention | https://docs.anchorbrowser.io/pricing.md, https://anchorbrowser.io/pricing |
| Starter | ≤25 concurrent, auth/CAPTCHA/geo proxy | $50/mo = 50 credits; +$1/credit overage | 25 concurrent; 25 sessions/min; US only | same |
| Team | ≤50 concurrent | $500/mo = 500 credits; +$1/credit | 50 concurrent; 30-day retention; custom proxy; Cloudflare verified agents — **marketing page only, not in docs** | https://anchorbrowser.io/pricing |
| Growth | ≤200 concurrent, EU/Asia/AU, compliance | $2,000/mo = 2,000 credits; +$1/credit | 200 concurrent; 100 sessions/min; code execution; full stealth; BYO proxy; SOC2 T2/ISO27001/GDPR | https://docs.anchorbrowser.io/pricing.md |
| Enterprise | 500+ concurrent, HIPAA, BYOC/on-prem | Custom | 500+ concurrent; 200+ sessions/min; ZDR; any region | same |
| Browser creation | Every new browser | Flat per browser | $0.01 | https://docs.anchorbrowser.io/pricing.md |
| Browser usage | Session alive (active time) | Per minute (nearest full minute) | $0.05/h | same |
| Session lifetime | max_duration (default 20 min API / 180 min guide; -1 = none), idle_timeout (default 5 min after last disconnect) | Billed until termination (idle tail presumably billed) | no upper limit (guide); batch ≤24 h | https://docs.anchorbrowser.io/advanced/session-timeout.md |
| Anchor proxy | proxy.active = true | Per GB | $8/GB | https://docs.anchorbrowser.io/pricing.md |
| Egress (proxyless / BYO proxy) | No Anchor proxy | Per GB | $0.20/GB | same |
| AI tasks | Embedded agent / perform web task | 0.1 credit per completed task + per AI step (from 2026-08-21) | $0.10/task; steps $0.01 light / $0.05 standard / $0.10 high-perf; BYOK $0.01 | same |
| Sticky IP / VPN / volumes | Add-ons | Not published | null | https://docs.anchorbrowser.io/advanced/dedicated-sticky-ip.md |
## Gotchas
1. **Concurrency forces the plan.** Rates are identical everywhere; 26–50 concurrent needs Team ($500, marketing page only) and 51–200 needs Growth ($2,000), even if usage is tiny.
2. **Non-US = $2,000/month.** Free/Starter/Team run only in the US; EU/Asia/Australia start at Growth.
3. **Default session limits are short** (20 min per API default) — long agent sessions must set `max_duration` (or -1).
4. **Idle tail**: a session with no connection lingers `idle_timeout` (5 min default) before termination; likely billed.
5. **Per-browser fee** ($0.01) matters for many short sessions: 100k one-minute sessions = $1,000 in creation fees vs $83 of browser time.
6. **Proxy $8/GB** dominates scraping bills; proxyless egress is also metered ($0.20/GB) — unusual among browser vendors.
## Worked example (closest browser analogue)
Mapped to **50 concurrent browsers x 8 h/day x 22 days = 8,800 browser-hours/month**, one 8-hour session per slot per
day = 1,100 sessions (max_duration raised). "30% CPU" has no billing effect. 50 GiB "snapshots": no equivalent
(volumes/profiles unpriced) -> $0 assumed. 100 GiB egress modelled proxyless ($0.20/GB) and via Anchor proxy ($8/GB).
| Line | Calculation | Cost |
|---|---|---|
| Browser time | 8,800 h x $0.05 | $440.00 |
| Browser creation | 1,100 x $0.01 | $11.00 |
| Egress, proxyless | 100 GB x $0.20 | $20.00 |
| Usage subtotal (proxyless) | | $471.00 |
| **Team plan** (50 concurrent) | max($500 fee-as-credit, $471) | **$500.00** |
| Team plan, 100 GB via Anchor proxy | 440 + 11 + 800 = $1,251 > $500 | **$1,251.00** |
| Growth plan (if Team unavailable) | max($2,000, usage) | $2,000.00 (either case) |
Headline: **$500/month** on Team (proxyless), $1,251 with 100 GB of Anchor proxy; $2,000 if only docs-listed plans apply.