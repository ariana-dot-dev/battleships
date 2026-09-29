# Morph Cloud: pricing regimes (as of 2026-09-28)
Morph bills everything in **Morph Compute Units (MCU)**. The standard (pay-as-you-go) rate is **$0.05/MCU**.
A running instance or devbox burns MCU/h = **max(vCPU, ceil(RAM / 4 GiB), ceil(disk / 16 GiB))**. It is a max(), not a sum. So up to 4 GiB RAM and 16 GiB disk per vCPU come free, and whichever dimension is largest sets the price. A paused instance burns only snapshot storage (1 MCU = 5 TB-hours, so $0.00001/GB-h, or about $0.0073/GB-month).
Subscriptions are **discounted MCU bundles**. They are not seats.
**Plan-name correction.** The raw subscribe-page text reads `Free/Developer · Popular/Team · Enterprise/Scale`. Those are badge + name pairs for **3** columns, and each row has 3 values (0 / 1,000 / 7,500 MCU; $0 / $40 / $250). So the tiers are:
- **Developer** ($0)
- **Team** ($40)
- **Scale** ($250)
Three other sources agree: sandbox.watch, the EFS plan table (Developer/Team/Scale) and the billing-console limits. That has been corrected.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Pay-as-you-go MCU (any tier; the only option on Developer) | Every running MorphVM instance or devbox, beyond any included bundle | MCU/h = max(vCPU, ceil(RAM/4), ceil(disk/16)) × $0.05. Allocated, not utilisation. Granularity **unpublished** | $0.05/MCU. 4 vCPU/8 GiB/≤64 GiB disk = 4 MCU = **$0.20/h**. 4/8/80 GiB disk = 5 MCU = $0.25/h (disk-bound) | https://cloud.morph.so/web/subscribe |
| 2 | Developer tier | Default | $0/month. **0 starting MCUs**, so you must buy top-up credits before any compute runs. Org limits: up to 64 vCPU / 256 GB RAM / 1,024 GB storage. Devboxes: 8 concurrent / 32 total | $0 | /web/subscribe, https://sandbox.watch/p/morph |
| 3 | Team tier (prepaid bundle) | $40/month subscription | 1,000 MCU included ("20% discount, $50 value"), i.e. $0.04/MCU. Extra MCU pay-as-you-go at $0.05. Org limits 256 vCPU / 1,024 GB / 4,096 GB. Devboxes 32 / 128 | $40 → $50 of usage | /web/subscribe |
| 4 | Scale tier (prepaid bundle) | $250/month subscription (badge "Enterprise") | 7,500 MCU included ("33% discount, $375 value"), i.e. $0.0333/MCU. Overage $0.05. Org limits 1,024 vCPU / 4,096 GB / 16,384 GB. Devboxes 128 / 512 | $250 → $375 of usage | /web/subscribe |
| 5 | Custom / enterprise beyond Scale | Contact | **Not published** on the subscribe page. The API supports promo codes that grant a tier with an end date (`tier_grant_ends_at`) | null | API ref (llms-full.txt) |
| 6 | Paused instance (`pause`, `ttl_action=pause`) | Memory + disk preserved | "The VM stops consuming MCUs; you only get charged for the snapshot taken." Snapshot size = RAM + disk | $0.00001/GB-h (5 TB-h per MCU). Page example: 8 vCPU / 8 GB / 8 GB disk snapshot = $0.12/month | https://cloud.morph.so/docs/documentation/instances/pause-resume, /web/subscribe |
| 7 | Stopped instance (`stop`, `ttl_action=stop`) | One-off tasks | "No longer charged for the instance after it stops." Stop releases resources, so it is effectively deleted | $0 | https://cloud.morph.so/docs/documentation/instances/ttl |
| 8 | Retained snapshots (named, Infinibranch, build cache) | Any saved snapshot | Snapshot-hours at the same rate. Snapshot TTL (retention by last-used) auto-expires dormant ones. Default = no TTL (kept forever) | ≈ $0.0073/GB-month | /docs/documentation/instances/snapshot-ttl |
| 9 | Infinibranch branch / fork (`branch(count=N)`) | Clone a running VM N times | Each clone is a normal running instance billed at full MCU/h. Snapshot dedup across branches is not documented | N × MCU/h | /docs/documentation/instances/branch |
| 10 | Wake-on-HTTP / SSH (scale-to-zero) | Paused instance auto-resumes on request | Snapshot rate while asleep, full MCU while awake | as 1 + 6 | /docs/documentation/instances/wake-on |
| 11 | Resize via reboot (`instances.boot` with new vcpus/memory/disk) | Scale up for builds, down for serving | Billing switches to the new spec "immediately after the resize" | as 1 | /docs/examples/resizing-instances |
| 12 | GitHub Actions runners (Morph Actions) | CI jobs | Fixed sizes billed hourly from the same MCU pool | Small 2/4/40 = 3 MCU ($0.15/h). Medium 4/8/80 = 5 MCU ($0.25/h). Large 8/16/160 = 10 MCU ($0.50/h), all at $0.05 | /web/subscribe |
| 13 | Morph EFS (shared FUSE filesystem) | Named filesystems mounted across instances | Stored bytes, per plan, **billed separately from MCU**. The price *rises* with the plan | Developer $0.12, Team $0.15, Scale $0.18 per GiB-month. Filesystem quota 5 / 25 / 100 | https://cloud.morph.so/docs/efs/usage-and-billing |
| 14 | Credit exhaustion | Included + top-up MCU run out | Credits are prepaid (`included_remaining` + `topup_balance`). The org becomes `is_restricted` (access blocked) when billing is exhausted, unless top-ups are bought | n/a | API ref (UserCreditsResponse) |
| 15 | Windows / macOS (x86) guests | "Experimental support" in the devbox docs | No separate price. Presumably the same MCU formula (unverified) | null | /docs/devboxes/getting-started |
| 16 | Egress / ingress / IP | Any | **Not published**. HTTPS service URLs and SSH gateway included. No public IPv4 | null | — |
| 17 | Regions | — | No region selection documented. No multipliers | 1 | features/morph-cloud.json |
| 18 | Free credit | — | None. The Developer tier starts at 0 MCU (sandbox.watch: pay-as-you-go) | $0 | /web/subscribe |
## Gotchas
1. **max(), not sum.** RAM up to 4 GiB/vCPU and disk up to 16 GiB/vCPU are free.
   - A RAM-heavy box (e.g. 2 vCPU / 32 GiB) bills 8 MCU = $0.40/h, which is $0.0125/GiB-h.
   - A disk-heavy box bills $0.003125/GiB-h, which is about $2.28/GiB-month of *running* disk.
   - The Actions Medium runner (4/8/**80**) costs 5 MCU, not 4, because 80 GiB of disk exceeds 64.
2. **The plans are almost pure prepay.** Team gets $50 of MCU for $40, and Scale gets $375 for $250. Overage is at list price.
   - The only saving is $10/month (Team) or $125/month (Scale).
   - If you use less than the bundle, you overpay. Rollover/expiry of unused bundle MCU is **not documented**.
3. **The free tier has 0 MCU.** "Free" means you can sign up, not run compute.
4. **Plan limits are org-wide resource ceilings** (64 / 256 / 1,024 vCPU), not per-VM caps. 50 × 4 vCPU = 200 vCPU forces Team. Devbox concurrency (8 / 32 / 128) is a separate cap on the devbox product.
5. **Paused ≠ free, but nearly.** The snapshot includes **RAM + disk**. At $0.0073/GB-month, a 50-box fleet with 8 GiB RAM + 20 GiB disk each pauses for about $10/month. Stopping is free but loses state.
6. **Snapshots never expire by default.** Set a snapshot TTL for caches and checkpoints.
7. **EFS pricing is inverted.** Higher plans pay *more* per GiB ($0.12 → $0.18).
8. **30% CPU utilisation saves nothing.** Billing is on allocation.
9. Not published at all: billing granularity, egress, and any volume/enterprise pricing. The docs repeatedly say the billing console is the source of truth.
10. **Isolation is undocumented.** Docs say "MorphVM"; third parties say Firecracker. There are no compliance claims (SOC2 unverified).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions:
- Disk ≤ 64 GiB, so 4 MCU/h and **35,200 MCU/month**.
- Instances are paused at night (554 h × 50). Each paused snapshot = 8 GiB RAM + 20 GiB disk (assumed) = 28 GB.
- Org vCPU need is 200, so Team (256 vCPU) or Scale is required. Developer (64 vCPU) cannot run 50 at once.
| Regime | Compute | Plan fee / bundle | Paused-state snapshots | Retained snapshots 50 GiB | Egress | **Monthly total** |
|---|---|---|---|---|---|---|
| Developer, pay-as-you-go | 35,200 × $0.05 = $1,760 | $0 | 50 × 28 × 554 × $0.00001 = $7.76 | $0.37 | unpublished | **not allowed** (64 vCPU org cap). $1,768.13 if it were |
| Team ($40, 1,000 MCU) | (35,200 − 1,000) × $0.05 = $1,710 | $40 | $7.76 | $0.37 | null | **$1,758.13** |
| Scale ($250, 7,500 MCU) | (35,200 − 7,500) × $0.05 = $1,385 | $250 | $7.76 | $0.37 | null | **$1,643.13** (cheapest) |
| Scale, stop instead of pause (state lost) | $1,385 | $250 | $0 | $0.37 | null | **$1,635.37** |
| Disk-bound variant (80 GiB disk → 5 MCU/h), Scale | (44,000 − 7,500) × $0.05 = $1,825 | $250 | 50 × 88 × 554 × $0.00001 = $24.38 | $0.37 | null | **$2,099.75** |
| Morph Actions Medium runner (alt product, 5 MCU/h) | same as the disk-bound row | | | | | ~$2,075 + snapshots |
Egress (100 GiB) is unpublished, so it is excluded (null). The 30% utilisation has no effect.
Sources: https://cloud.morph.so/web/subscribe · https://cloud.morph.so/docs/documentation/setup/plans · https://cloud.morph.so/docs/documentation/instances/pause-resume · https://cloud.morph.so/docs/documentation/instances/ttl · https://cloud.morph.so/docs/documentation/instances/snapshot-ttl · https://cloud.morph.so/docs/documentation/instances/branch · https://cloud.morph.so/docs/documentation/instances/wake-on · https://cloud.morph.so/docs/efs/usage-and-billing · https://cloud.morph.so/docs/llms-full.txt · https://sandbox.watch/p/morph