# Cua (Cua Fleet) — pricing regimes (as of 2026-09-28)
Cua is an open-source (MIT) computer-use sandbox framework plus a hosted service, **Cua Fleet**, that runs GUI
desktop VMs (Ubuntu 24.04 and Windows Server 2022 in the cloud today). The only published price is one per-resource
card: **$0.044625/vCPU-h** and **$0.0223125/GiB-h** (1 vCPU + 2 GiB = $0.08925/h). 4 vCPU / 8 GiB =
0.1785 + 0.1785 = **$0.357/h**. No plan fees, storage, egress, OS surcharge or free credits are published.
The key billing trap is structural: Fleet is **pool-based**. A pool keeps N warm replicas that "continue to consume
capacity until it is scaled down or deleted"; a claim merely borrows one warm computer. You pay for warm replica
uptime, not for claimed/active time.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Local open-source Cua Sandbox | Run on your own machine (Docker, QEMU, Apple VZ/Lume, Android emulator) | Free (MIT); you pay your own hardware | $0 | https://cua.ai/pricing, https://cua.ai/docs/reference/sandbox-sdk/runtime-support.md |
| Cua Fleet usage-based (Linux) | Hosted Ubuntu 24.04 VM pools | Allocated vCPU + memory per hour of replica uptime | $0.044625/vCPU-h + $0.0223125/GiB-h | https://cua.ai/pricing |
| Cua Fleet usage-based (Windows) | Hosted Windows Server 2022 VM pools | Same published rates; no Windows licence surcharge listed (unverified) | same | https://cua.ai/pricing, https://cua.ai/docs/reference/sandbox-sdk/runtime-support.md |
| Warm pool capacity | Pool created with `replicas=N` | Each warm replica bills from creation until scale-down/delete, **claimed or not**; "cloud resources can incur usage charges after your workload finishes" | N × size × rate | https://cua.ai/docs/how-to-guides/sandbox/create-fleet-capacity.md, https://cua.ai/docs/cloud-fleets.md |
| Claim | `claim` one computer from a pool | No separate claim fee documented; released on context exit | $0 extra (unpublished) | https://cua.ai/docs/cloud-fleets.md |
| TTL expiry | `ttl_seconds_after_created` on pools/claims | Deletes resource N s after **creation** (not idle); no default TTL = pool bills until deleted | 0–4,294,967,295 s | https://cua.ai/docs/how-to-guides/sandbox/expire-pools-and-claims, https://cua.ai/docs/reference/sandbox-sdk/pool.md |
| macOS / Android cloud | Marketed on homepage | **Not accepted by Fleet** in SDK 0.7.0 (local only) | n/a | https://cua.ai/, https://cua.ai/docs/reference/sandbox-sdk/runtime-support.md |
| BYOC / on-prem (Enterprise) | Run Fleet in your cloud or datacenter | Contact sales | null | https://cua.ai/pricing |
| Storage / snapshots / egress | — | Not published | null | https://cua.ai/pricing |
| Legacy Cua Cloud Sandbox (2025) | Launch 2025-05-28: Small 1 vCPU/4 GB, Medium 2/8, Large 8/32 | "pay only for compute time"; prices never published in the post; superseded by Fleet per-resource pricing | null | https://cua.ai/blog/introducing-cua-cloud-containers |
No dated price change with numbers found. Third-party guides mention a free development tier; not on the official page (unverified).
## Gotchas
1. **You pay for warm pool replicas, not claims.** A pool of 50 kept up 24/7 costs 50 × 730 h regardless of how many agent runs happen. Scale replicas to 0/delete the pool between shifts.
2. **TTL counts from creation, not last use**, and there is no default TTL — forgotten pools bill forever.
3. **Windows costs the same as Linux** on the published card; no licence surcharge is listed (confirm before relying on it).
4. **macOS and Android are marketing, not Fleet reality** in SDK 0.7.0 (local only).
5. RAM is priced at half the vCPU rate per GiB — memory-heavy desktops (1:4 ratios like the old Small 1/4 size) cost more per vCPU than E2B-style 1:2 shapes.
6. Storage, egress, IPv4, granularity, minimums, concurrency limits and free credits are all unpublished.
## Worked example
4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days, 30% CPU, 50 GiB snapshots, 100 GiB egress.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Fleet pool scaled to 50 replicas only during shifts (8,800 replica-h) | Yes (limits unpublished) | 8,800 × $0.357 = **$3,141.60** + unknown storage/egress |
| Fleet pool of 50 left warm 24/7 | Yes | 50 × 730 × $0.357 = **$13,030.50** |
| Fleet on Windows Server 2022 | Yes | same as Linux at published rates ($3,141.60) |
| BYOC / on-prem | Enterprise | unpublished Cua fee + own infrastructure |
| Local OSS | Your hardware | $0 to Cua |
30% CPU does not matter (allocation billing). Snapshot and egress costs unknown (null).