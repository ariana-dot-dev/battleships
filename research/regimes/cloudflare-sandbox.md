# Cloudflare Sandbox SDK / Containers: pricing regimes
As of 2026-09-28. Sandbox SDK has no price list of its own: it is billed as **Containers** (vCPU, memory, disk, egress) **plus** the Worker and Durable Object behind each sandbox, **plus** Workers Logs if enabled, **plus** R2 for any backups or bucket mounts.
Core rates (Workers Paid, standard, not Enterprise):
| Resource | Rate | Hourly equivalent | Basis | Included / month |
|---|---|---|---|---|
| CPU | $0.000020 / vCPU-s | $0.072 / vCPU-h | **active usage only** (since 2025-11-21) | 375 vCPU-min (6.25 vCPU-h, $0.45) |
| Memory | $0.0000025 / GiB-s | $0.009 / GiB-h | **provisioned** for the instance type | 25 GiB-h ($0.225) |
| Disk | $0.00000007 / GB-s | $0.000252 / GB-h | **provisioned** for the instance type | 200 GB-h ($0.05) |
| Granularity | 10 ms | | billed "while actively running": from the first request or manual start until the instance sleeps | |
## Regime table
| # | Regime | When it applies | How it's billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | **Workers Free plan** | Account with no subscription | Containers/Sandbox are **not available** ("N/A") | $0 but unusable | https://developers.cloudflare.com/containers/pricing/ |
| 2 | **Workers Paid plan** (base) | Any account that uses Sandbox | $5/month account minimum. It is **not a usage credit**: it covers the included allotments only | $5/mo. Includes 375 vCPU-min, 25 GiB-h, 200 GB-h of Containers (about $0.73 of container usage), 10M Worker requests, 30M Worker CPU-ms, 1M DO requests, 400k DO GB-s | https://developers.cloudflare.com/workers/platform/pricing/ |
| 3 | **Enterprise contract** | Workers Enterprise accounts | Billed per contract ("reach out to your account team") | Not published (null) | https://developers.cloudflare.com/workers/platform/pricing/ |
| 4 | **Active running, active-CPU billing** (the normal regime) | Container is awake | CPU × actual utilisation, and RAM + disk × provisioned size, per 10 ms | $0.072 per active vCPU-h, $0.009/GiB-h, $0.000252/GB-h | https://developers.cloudflare.com/containers/pricing/ , https://developers.cloudflare.com/changelog/post/2025-11-21-new-cpu-pricing/ |
| 5 | **Awake but idle** (waiting for `sleepAfter`) | After the last request until `sleepAfter` expires (default **10 min**) | CPU is about $0 because it is active-only. **RAM and disk keep billing at full provisioned size** | standard-4 idle costs 12×0.009 + 20×0.000252 = **$0.113/h** | https://developers.cloudflare.com/containers/faq/ , https://developers.cloudflare.com/sandbox/concepts/sandboxes/ |
| 6 | **keepAlive: true** (always-on) | SDK option. Sends heartbeat pings every 30 s and never sleeps | Same as regime 4/5, continuously, until `destroy()`. There is **no monthly cap or commit discount** | standard-4 at 0% CPU: $0.113/h = $82.5 per 730 h. At 100% CPU: $0.401/h = $292.8 per 730 h | https://developers.cloudflare.com/sandbox/concepts/sandboxes/ |
| 7 | **Sleeping / stopped** | After `sleepAfter`, or on a host restart | $0 compute, $0 disk. **All state is wiped** (files, processes, sessions): there is no paused state to pay for | $0 | https://developers.cloudflare.com/containers/faq/ |
| 8 | **Cold start / boot** | Every wake from sleep | Billing starts "when a request is sent to the container or when it is manually started", so image pull and boot are billed at RAM+disk rates | Cold start "1-3 s" (docs). ComputeSDK median 2.0 s | https://developers.cloudflare.com/containers/pricing/ , https://developers.cloudflare.com/containers/faq/ |
| 9 | **Preset instance types** | `instance_type` in wrangler config (per container class, set at deploy, not per sandbox) | Same per-resource rates. Preset fixes the provisioned RAM and disk | lite 1/16 vCPU/256 MiB/2 GB; basic 1/4/1 GiB/4 GB; standard-1 1/2/4 GiB/8 GB; standard-2 1/6 GiB/12 GB; standard-3 2/8 GiB/16 GB; standard-4 4/12 GiB/20 GB. Hourly at 100% CPU: 0.00725 / 0.0280 / 0.0740 / 0.1290 / 0.2200 / 0.4010 | https://developers.cloudflare.com/containers/platform-details/limits/ |
| 10 | **Custom instance types** (GA 2026-01-05) | Custom vCPU/RAM/disk | Same rates. **1-4 vCPU, at least 3 GiB RAM per vCPU, at most 12 GiB, at most 20 GB disk, at most 2 GB disk per GiB RAM** | 4 vCPU/8 GiB is **impossible**: 4 vCPU forces 12 GiB | https://developers.cloudflare.com/containers/platform-details/limits/ , https://developers.cloudflare.com/changelog/product/containers/ |
| 11 | **Legacy provisioned-CPU billing** (historical) | Before 2025-11-21 | CPU billed on allocated vCPU × running time | Same $0.00002/vCPU-s, on allocation | https://developers.cloudflare.com/changelog/post/2025-11-21-new-cpu-pricing/ |
| 12 | **Egress: North America & Europe** | Traffic egressing in NA/EU | Account-wide allotment, then per GB | 1 TB/month free, then $0.025/GB | https://developers.cloudflare.com/containers/pricing/ |
| 13 | **Egress: Oceania, Korea, Taiwan** | Traffic egressing there | | 500 GB free, then **$0.05/GB** | same |
| 14 | **Egress: everywhere else** | Other regions (SAM, ME, AFR, rest of APAC) | | 500 GB free, then $0.04/GB | same |
| 15 | **Ingress** | Inbound | Free (no ingress price listed) | $0 | same |
| 16 | **Durable Object per sandbox** | Always: each sandbox is one DO | Requests: $0.15/M after 1M. Duration: $12.50 per M GB-s after 400k GB-s, billed on a 128 MB allocation "while the object actively runs or idles without hibernation eligibility" | If the DO is awake for the whole container run: 0.128 GB × 3600 s = 460.8 GB-s/h, about **$0.00576/h per sandbox** (unverified that the DO is billed for the whole run) | https://developers.cloudflare.com/durable-objects/platform/pricing/ , https://developers.cloudflare.com/sandbox/platform/pricing/ |
| 17 | **Worker requests / CPU** | Every SDK call routed through your Worker | $0.30/M requests after 10M. $0.02/M CPU-ms after 30M | The HTTP transport makes **each SDK op a subrequest** (1,000 per request cap on Paid). The RPC transport multiplexes them | https://developers.cloudflare.com/workers/platform/pricing/ , https://developers.cloudflare.com/sandbox/platform/limits/ |
| 18 | **Workers Logs** (optional) | Observability enabled | 20M log events/month included, then $0.60/M | | https://developers.cloudflare.com/workers/platform/pricing/ |
| 19 | **Directory backups** (GA 2026-02-23) | `createBackup(dir)` writes squashfs to **your own R2 bucket** | R2 Standard storage + ops. Backup TTL default 3 days, but expired objects are **not deleted** (you need R2 lifecycle rules) | $0.015/GB-month (10 GB-month free), Class A $4.50/M (1M free), Class B $0.36/M (10M free), R2 egress free. Infrequent Access: $0.01/GB-month, 30-day minimum, $0.01/GB retrieval | https://developers.cloudflare.com/r2/pricing/ , https://developers.cloudflare.com/sandbox/concepts/backup-restore/ |
| 20 | **Whole-container snapshots** | **Private beta** (contact your rep). Taken on idle before stop, best-effort | Pricing not published | null | https://developers.cloudflare.com/sandbox/tutorials/openai-agents-api/ |
| 21 | **Bucket mounts** (FUSE, R2/S3/GCS) | `mountBucket()` for persistence | Billed by the bucket provider (R2 rates above; R2 egress $0) | | https://developers.cloudflare.com/sandbox/guides/mount-buckets/ |
| 22 | **Image storage** | Registry images | 50 GB total image storage per account (a limit). No separate price found | null | https://developers.cloudflare.com/containers/platform-details/limits/ |
| 23 | **Account concurrency caps** | Running instances | 1,500 vCPU / 6 TiB RAM / 30 TB disk concurrent (raised 15x on 2026-02-25), raisable | For standard-4: at most 375 concurrent (vCPU-bound) | https://developers.cloudflare.com/changelog/product/containers/ |
| 24 | **Placement / jurisdiction** | `regions` / `jurisdiction: eu | fedramp` constraints (2026-04-05) | **No price multiplier** published for pinning. Only egress varies by region | x1 | https://developers.cloudflare.com/changelog/product/containers/ |
| 25 | **Warm pool** (self-hosted bridge) | Pre-started containers for instant boot | Each pooled container bills RAM+disk (regime 5) while it waits | pool size × $0.113/h (standard-4) | features/cloudflare-sandbox.json (bridge docs) |
## Gotchas
1. **You cannot buy 4 vCPU with 8 GiB.** The shapes are memory-heavy (at least 3 GiB per vCPU). A 4-vCPU sandbox always pays for 12 GiB (and up to 20 GB disk). RAM makes up more than half the bill at typical agent utilisation.
2. **Active-CPU applies to CPU only.** RAM and disk bill at full provisioned size from the first request until sleep, including the default **10-minute idle tail** after every burst of activity. For 5-minute sessions, that tail triples the RAM bill.
3. **The CPU rate is the most expensive per active vCPU-hour in the set** ($0.072, versus E2B at about $0.050 on allocation). Against E2B's 4 vCPU/8 GiB ($0.3312/h), a standard-4 ($0.288·util + $0.113/h) only wins below about 75% utilisation (verifier-corrected from "60-70%", 2026-09-28). At 100% util a standard-4 costs $0.401/h.
4. **Sleep = wipe.** There is no paused state, so nothing is billed while asleep, but persistence means R2 backups plus a restore on every wake (billed boot time plus R2 ops). Whole-container snapshots are private beta and unpriced.
5. **The $5 fee is not a credit.** It only includes about $0.73 of container resources. Everything above that is pay-as-you-go.
6. **Hidden per-sandbox surcharges.** One DO per sandbox (duration may run for the whole container lifetime, about $0.0058/h each), Worker requests (HTTP transport = one subrequest per SDK op), and Logs. A third party (bex.co) estimates **5-10% on top**.
7. **Backup TTL does not delete.** Expired backups stay in R2 and keep billing until a lifecycle rule removes them.
8. **Instance type is per container class (deploy-time), not per sandbox.** Mixed sizes need multiple classes.
9. **No guaranteed runtime.** Host restarts at irregular cadence stop instances (SIGTERM, then up to 15 min, then SIGKILL) and wipe state. An always-on keepAlive box is not truly durable.
10. **Egress doubles outside NA/EU** in some regions (verifier-corrected from "triples": $0.05 vs $0.025) ($0.05/GB in Oceania/Korea/Taiwan), and the free allotment halves (500 GB).
11. **Concurrency is resource-capped, not count-capped.** 1,500 vCPU means at most 375 standard-4 sandboxes at once, before a raise.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent sandboxes × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Instance chosen: **standard-4 (4 vCPU / 12 GiB / 20 GB)** is the only fit, because custom 4 vCPU also forces 12 GiB or more. Included allotments are subtracted: 6.25 vCPU-h, 25 GiB-h, 200 GB-h. Snapshots are R2 Standard backups: 50 − 10 free = 40 GB × $0.015. Class A ops (about 1,100 backups) fall inside the 1M free. Egress of 100 GiB is inside the free allotment in every region. Assumes one wake per sandbox-day and `sleepAfter` idle tails excluded unless stated.
| Line | A: Paid, active CPU 30% (NA/EU) | B: same at 100% CPU (sustained build) | C: legacy provisioned-CPU (pre-2025-11-21, historical) | D: standard-3 downsize (2 vCPU/8 GiB, same absolute CPU work; does NOT meet 4 vCPU spec) |
|---|---|---|---|---|
| Plan fee | $5.00 | $5.00 | $5.00 | $5.00 |
| CPU | 10,560 − 6.25 = 10,553.75 vCPU-h × 0.072 = **$759.87** | 35,193.75 × 0.072 = $2,533.95 | $2,533.95 | 10,553.75 × 0.072 = $759.87 (60% util of 2 vCPU) |
| Memory | 105,600 − 25 = 105,575 GiB-h × 0.009 = **$950.18** | $950.18 | $950.18 | 70,375 × 0.009 = $633.38 |
| Disk | 176,000 − 200 = 175,800 GB-h × 0.000252 = **$44.30** | $44.30 | $44.30 | 140,600 × 0.000252 = $35.43 |
| Snapshots (R2) | $0.60 | $0.60 | $0.60 | $0.60 |
| Egress | $0 | $0 | $0 | $0 |
| **Subtotal (published rates)** | **$1,759.95** | **$3,534.03** | $3,534.03 | $1,434.28 |
| DO duration, if billed for the whole run (8,800 h × 460.8 GB-s − 400k = 3,655,040 GB-s × $12.50/M) | +$45.69 | +$45.69 | +$45.69 | +$45.69 |
| **Total incl. DO estimate** | **≈ $1,805.64** | ≈ $3,579.72 | ≈ $3,579.72 | ≈ $1,479.97 |
Other regime deltas on top of A:
- **Default 10-min idle tail** (1,100 sessions × 1/6 h × $0.11304/h of RAM+disk): **+$20.72**. With 5-minute agent tasks instead of 8 h sessions, this line would dominate.
- **keepAlive always-on** (50 × 730 h = 36,500 h at 30% CPU): CPU 43,793.75 × 0.072 = $3,153.15, RAM 437,975 × 0.009 = $3,941.78, disk 729,800 × 0.000252 = $183.91, plus fee → **$7,283.84** (+ DO (16,819,200 − 400k) GB-s × $12.50/M ≈ $205.24). There is no always-on discount.
- **Egress region**: 100 GiB is free everywhere. Above the allotment: $0.025 (NA/EU) / $0.04 (other) / $0.05 (OC/KR/TW) per GB.
- **Enterprise**: not published.
- Worker request, Worker CPU and Logs charges are workload-dependent and not included (small unless SDK ops are in the tens of millions).
Sources: https://developers.cloudflare.com/containers/pricing/ · https://developers.cloudflare.com/sandbox/platform/pricing/ · https://developers.cloudflare.com/containers/platform-details/limits/ · https://developers.cloudflare.com/changelog/post/2025-11-21-new-cpu-pricing/ · https://developers.cloudflare.com/changelog/product/containers/ · https://developers.cloudflare.com/containers/faq/ · https://developers.cloudflare.com/sandbox/concepts/sandboxes/ · https://developers.cloudflare.com/durable-objects/platform/pricing/ · https://developers.cloudflare.com/workers/platform/pricing/ · https://developers.cloudflare.com/r2/pricing/ · https://developers.cloudflare.com/sandbox/tutorials/openai-agents-api/ · https://bex.co/blog/2026/09/09/cloudflare-containers-sandboxes-active-cpu-pricing