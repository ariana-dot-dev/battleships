# Verify: ona (2026-09-28, independent verifier)
Sources re-fetched live (raw HTML via HTTP): ona.com/pricing, ona.com/docs/ona/billing/usage,
ona.com/docs/ona/billing/overview, ona.com/docs/ona/environments/archive-auto-delete.
| Item | Result | Note |
|---|---|---|
| Core from $20/month | confirmed | pricing JSON: price amount "20", "Core plans starting from $20/month" |
| Included OCUs "80 - 2,200 OCUs (monthly recurring)" | confirmed | pricing comparison table |
| Individual tiers $50/200, $100/400, $200/800, $500/2,200 ("10% more") | unverifiable | tier selector is rendered client-side; not in the static HTML. Consistent with $0.25/OCU and the 80-2,200 range |
| Add-on OCUs "from $10 / 40 OCUs" ($0.25/OCU) | confirmed | pricing page |
| Standard 4 vCPU/16 GB = 1 OCU/h; GPU VM 16 vCPU/64 GB = 7 OCU/h | confirmed | pricing FAQ + billing/usage |
| Agent examples 1/3/4/5/8 OCU | confirmed | pricing FAQ |
| Core max 32 vCPU / 128 GB / 200 GB; GPU VM up to 16 vCPU / 64 GB / 300 GB | confirmed | pricing FAQ |
| Up to 100 members, no per-seat fee, OCUs pooled; unlimited parallel environments | confirmed | pricing page |
| Monthly OCUs expire at month end; add-ons valid 1 year, expire when subscription ends | confirmed | pricing FAQ + billing/usage |
| Consumption order: subscription, then top-up, then bonus | confirmed | billing/usage |
| Auto top-up below 20 OCUs, cooldown; can't change the variant after subscribing | confirmed | billing/overview |
| Failed payment: 7-day grace, then locked, credits forfeited | confirmed | billing/overview |
| Core: archive after 3 days, delete 4 days later (7 days total) | confirmed | archive-auto-delete |
| "Inactive environments generate storage costs based on their VM disk size" | confirmed | pricing FAQ; no rate published (null correct) |
| API/SDK Enterprise-only; SSO Enterprise-only | confirmed | comparison table |
| "Ona is now part of OpenAI" | confirmed | site banner |
| Metering granularity/minimum | unverifiable | not published (null correct) |
| AWS Marketplace $60k TCV, EC2 prices (vantage mirror) | not re-checked | third-party/vendor listing; flagged sales/alt in the card |
intended).
Corrections:
- Added mode.plans: the Ona Cloud modes (on-demand, on-demand-gpu) are sold only on the 5 Core plans, and the self-hosted AWS modes
  only on "Enterprise (AWS Marketplace 12-month contract)".
  customer-paid EC2 under a $20 Core plan with no Enterprise fee.
- Caveat added about per-tier OCU amounts being unverifiable from static HTML.