# Zenrows Browser Sessions — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| Browser Sessions | CDP sessions | Credits time + bandwidth | 5 credits/minute =300/h; 25,000 credits/GB | https://docs.zenrows.com/first-steps/pricing.md |
| Top-ups | Paid plan quota exhaustion | Fixed packs, max 4/cycle | Tier-specific packs 11 k/$6.50 through 1.8 m/$200 | https://docs.zenrows.com/first-steps/pricing.md |
| Fetch | Request API rather than browser session | Successful request credits | 1 basic /5 JS /10 premium /25 JS+premium; extract no extra; batch same | https://docs.zenrows.com/first-steps/pricing.md |
| Annual | Annual commitment | 17% advertised saving | Base displayed 16/57/165/456 monthly equivalent | https://www.zenrows.com/pricing |
| Free | Account plan | Monthly fee / commitment | $0; concurrency 5; 5,000 monthly credits; no top-ups. | https://www.zenrows.com/pricing |
| Build B1 | Account plan | Monthly fee / commitment | $19; concurrency 20; 45,000 monthly credits; top-up 11,000/$6.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Build B2 | Account plan | Monthly fee / commitment | $29; concurrency 20; 80,000 monthly credits; top-up 13,000/$6.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Build B3 | Account plan | Monthly fee / commitment | $39; concurrency 20; 120,000 monthly credits; top-up 43,000/$19.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Launch L1 | Account plan | Monthly fee / commitment | $69; concurrency 50; 250,000 monthly credits; top-up 50,000/$19.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Launch L2 | Account plan | Monthly fee / commitment | $99; concurrency 50; 500,000 monthly credits; top-up 70,000/$19.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Launch L3 | Account plan | Monthly fee / commitment | $129; concurrency 50; 700,000 monthly credits; top-up 175,000/$45.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Growth G1 | Account plan | Monthly fee / commitment | $199; concurrency 100; 1,200,000 monthly credits; top-up 224,000/$52, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Growth G2 | Account plan | Monthly fee / commitment | $279; concurrency 100; 2,000,000 monthly credits; top-up 400,000/$78, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Growth G3 | Account plan | Monthly fee / commitment | $399; concurrency 100; 3,000,000 monthly credits; top-up 525,000/$97.5, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Scale S1 | Account plan | Monthly fee / commitment | $549; concurrency 200; 5,000,000 monthly credits; top-up 845,000/$130, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Scale S2 | Account plan | Monthly fee / commitment | $749; concurrency 200; 8,000,000 monthly credits; top-up 1,240,000/$163, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Scale S3 | Account plan | Monthly fee / commitment | $999; concurrency 200; 12,500,000 monthly credits; top-up 1,800,000/$200, max 4; quota valuation only, not cash. One-month rollover. | https://www.zenrows.com/pricing |
| Enterprise | Account plan | Monthly fee / commitment | Quote / unknown; concurrency unpublished/custom; 400–1,000+ concurrency; custom volume/security/SLA. | https://www.zenrows.com/pricing |
## Gotchas
- All products share a credit balance; do not count separate fetch, proxy and session allowances. 404/410 are billable successes.
- Top-up equivalent hourly rate in card is marginal only while packs are available.
- Browser TTL at most 15 min: 8 h uninterrupted sessions infeasible. Requires checkpoint/auth restoration and at least 32 segments per eight-hour shift.
- GPU/guest OS/CPU/RAM, arbitrary snapshots, replay-storage fees and a separate CAPTCHA fee are unpublished.
- Storage, snapshot GiB-month and public IPv4 prices are not published in the reviewed sources; null is not free.
- No guaranteed vCPU allocation published; browser-hour is not a verified 4-vCPU/8-GiB VM equivalent. The sizes card keeps unknown hardware null; do not coerce it to zero or auto-rank against resource-guaranteed VMs.
- Browser RAM is not published unless a specific mode overrides it.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
Time costs 8,800×300 = 2,640,000 credits. If 100 GB is billed browser traffic, add 2,500,000: total **5,140,000 credits**. Scale S1 plus one 845,000-credit top-up costs **$679** ($549+$130), meeting 50 concurrency. Growth G3 plus the maximum four 525,000-credit top-ups reaches only 5,100,000, so it cannot cover this workload. Browser sessions must be split to no more than 15 minutes; no guaranteed 4/8 hardware or general snapshot tariff.
## Sources
- https://www.zenrows.com/pricing
- https://docs.zenrows.com/llms.txt
- https://docs.zenrows.com/first-steps/pricing.md
- https://docs.zenrows.com/browser-sessions/introduction.md
- https://docs.zenrows.com/browser-sessions/features/session-ttl.md