# Verify: blaxel (2026-09-28)
Sources re-fetched: https://blaxel.ai/pricing, https://docs.blaxel.ai/Security/Quotas, https://docs.blaxel.ai/Sandboxes/Overview, https://docs.blaxel.ai/Sandboxes/Expiration
| Item | Result |
|---|---|
| Sandbox $0.0000115 / GB RAM-second, "billed by its allocated memory (CPU scales automatically)" | confirmed (pricing) |
| = $0.0414/GB-h; sizes 2/4/8/16 GB = $0.0828/$0.1656/$0.3312/$0.6624 per h | confirmed (arithmetic) |
| CPU not charged; 8 GB -> 4 cores, 16 GB -> 6 cores | confirmed (docs Overview: "not charged separately") |
| 2 GB -> 1 core, 4 GB -> 2 cores | unverifiable (not in current docs; from earlier research) |
| Active = connection open; standby ~15 s after last connection; idle WS/TCP 15-min timeout | confirmed (docs Overview); pricing FAQ says "about 5 seconds" (conflict already noted) |
| Standby: $0 compute, snapshot storage $0.20/GB-month | confirmed (pricing rate table + FAQ) |
| Snapshot billed ~ allocated memory (vendor $0.40 example) | unverifiable this pass (blog not re-fetched) |
| Images $0.045/GB-month; Volumes $0.12/GB-month on provisioned size | confirmed |
| Batch Jobs $0.000006/GB-s ($0.0216/GB-h), "billed by the memory it uses" | confirmed |
| MCP hosting $0.000007/GB-s ($0.0252/GB-h) | confirmed |
| Agent Runtime "Coming soon"; Agent Drive free during beta | confirmed |
| Internet egress + internal traffic included; dedicated IPs / egress gateway / proxy free during beta | confirmed |
| Wildcard domains $20/domain-month; FQDN coming soon | confirmed |
| Tiers: T0 free 10, T1 $20/month 50, T2 $50/month 200, "7 more tiers", T9 contact 100,000+ | confirmed |
| Tier = rolling 30-day real top-up volume, deposited to wallet (not a fee), promo credits don't count, downgrade on lapse | confirmed (Quotas) |
| Standby sandboxes count against quota | confirmed (Quotas) |
| Free accounts cannot request quota increases | confirmed (Quotas) |
| Tier 0/1 forced expiry 7/30 days; higher tiers unlimited persistence | confirmed (Expiration) |
| Tier 0 max 4 GB per sandbox | unverifiable (console-only) |
| Writable FS tmpfs ~50% of RAM | confirmed (Overview) |
| Up to $200 free credits (exact amount unspecified) | confirmed |
| Custom: up to 256 GB RAM, private network, BYO compute, custom SLA/hardware, volume pricing | confirmed |
| Add-ons: Email $800 + 3% usage; Dedicated $1,600 + 10% usage (SAML); HIPAA $250 | confirmed |
| Baseten acquisition banner | confirmed (docs banner) |
| Worked example A-H arithmetic | confirmed (recomputed) |
Corrections: none.