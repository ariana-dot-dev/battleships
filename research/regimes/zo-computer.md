# Zo Computer: pricing regimes (as of 2026-09-28)
Zo is a **personal cloud computer**. Each workspace gets one always-on Linux server with root, a built-in AI agent (50+ tools), hosting
(zo.space, Sites, Services, custom domains), automations, messaging channels (SMS, email, Slack, Discord, Telegram), an MCP server and an API. It is a
consumer/prosumer product, not a sandbox API. Compute runs on **Modal and Daytona** (security page), and the isolation technology is not stated.
**Launched:** public launch 2025-11-19. Sources: HN "Zo: Intelligent Personal Servers for Everyone", https://news.ycombinator.com/item?id=45979424;
Product Hunt launch late November 2025 (#15 of the day); a co-founder post on 2025-12-04 says "we launched" two weeks earlier. Invite/beta coverage dates
from 2025-06-28 (https://news.ycombinator.com/item?id=44407830).
All figures are **list** prices from https://www.zo.computer/pricing and https://www.zo.computer/guide/billing.md.
## Regime table
| Regime | When it applies | How billed | Numbers | Source URL |
|---|---|---|---|---|
| Free Trial | New workspace | $0. 14-day AI + computer trial. Computer sleeps when idle and has "limited" CPU/memory. After 14 days the computer is not started or renewed (up to 7 one-hour recovery sessions, or a support ZIP) | $0; 100 GB disk; 1 hosted service; no custom domains; limited Zo-funded AI | https://www.zo.computer/guide/billing.md |
| Free + Credits | Free workspace with a positive Credits balance | Metered AI/media, and the $0 plan stays. Credits do **not** extend computer access | Media per request (e.g. Nano Banana 2 $0.42/image, Veo 3.1 Fast $0.48–$1.44, transcription $0.0045/audio-min) | https://www.zo.computer/pricing |
| Free daily media allowance | Free, no Credits balance | Free | 3 eligible image, 1 video, 1 transcription requests per workspace per day | pricing page |
| Basic | Paid, monthly | Flat subscription for one always-on computer | **$18/mo**: 2 vCPU / 8 GB RAM, 100 GB disk, $10/mo AI credits, 5 services, 3 custom domains | https://www.zo.computer/pricing, https://www.zo.computer/guide/billing.md |
| Pro | Paid, monthly | Flat | **$64/mo**: 4 vCPU / 16 GB, $40/mo AI, 10 services, 5 domains, priority support | pricing page |
| Ultra | Paid, monthly | Flat | **$200/mo**: 8 vCPU / 32 GB, $100/mo AI, 50 services, 10 domains, priority support | pricing page |
| AI beyond included credits | Any plan | Credits (token rates per model; media fixed per request) or BYOK / Claude Code / Codex subscriptions | Per /models | https://www.zo.computer/guide/billing.md |
| Plan changes | Upgrade, downgrade or cancel | Immediate, prorated | n/a | billing guide |
| Storage | All plans | Included | 100 GB ("100GB+" on paid); no add-on price published | pricing page |
| Snapshots | Automatic | Regular filesystem snapshots for recovery, not billed | $0 | https://www.zo.computer/reference/information/security.md |
| Egress / IPv4 / regions | n/a | Not documented | null | none |
No per-hour, usage-based or annual pricing is published, and no enterprise/sales tier either (the Teams page has no prices).
## Gotchas
1. **This is not a sandbox API.** You get one computer per workspace. Parallel isolated environments mean separate workspace subscriptions,
   and fleet use is not documented (ToS/account limits unverified).
2. **Flat monthly fees.** A computer used 8 h/day costs the same as one used 24/7. The upside: $18/mo buys 2 vCPU / 8 GB always-on, which
   is below many per-hour sandbox rates at high utilisation (if those resources are really dedicated, which is not stated).
3. **Included AI credits are AI-only.** They do not offset compute.
4. **The Free Trial is not a free tier.** After 14 days the computer stops for good (recovery-only) unless you pay, and Credits do not extend it.
5. **Periodic restarts** happen for updates and snapshots, even on paid plans. Only registered Services come back automatically, so ad-hoc processes die.
6. **TCP services are public with no auth in front.** Custom domains must be subdomains (no apex).
7. **Not documented: GPU, custom image, pause/fork, an SDK/CLI or API endpoint that creates machines.**
8. **Specs changed (checked 2026-11-08).** Earlier pages listed 4 / 16 / 64 cores. billing.md now lists 2 / 4 / 8 vCPU.
## Worked example (4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = 8,800 h, 30% CPU, 50 GiB snapshots, 100 GiB egress)
**Closest analogue:** 50 always-on Pro workspaces, one per concurrent agent. Each is 4 vCPU / 16 GB, the smallest plan that covers 4 vCPU / 8 GiB (Basic is 2 vCPU). Hours and CPU
utilisation do not change the bill.
| Line | Calculation | $ |
|---|---|---|
| 50 × Pro | 50 × $64 | 3,200.00 |
| 8,800 h, 30% CPU | Flat fee; always-on anyway | 0 |
| 50 GiB state | Within the included 100 GB disk per workspace; automatic snapshots free | 0 |
| Egress 100 GiB | Not documented | unknown (null) |
| **Total** | | **$3,200 / month** (+ AI usage beyond the 50 × $40 = $2,000 of included AI credits) |
Effective rate: $3,200 / 8,800 h = $0.364 per 4/8-hour used (or $0.0877/h if counted over 730 h always-on).
Alternatives: 50 × Basic = $900 fits only a 2 vCPU / 8 GB agent. Sharing Ultra machines (8 vCPU each) between agents does not save money at these sizes, and those agents would not be isolated sandboxes, so this analogue is not recommended.
Caveat: whether running 50 workspaces as a fleet is allowed, and whether the vCPU are dedicated, is unverified.