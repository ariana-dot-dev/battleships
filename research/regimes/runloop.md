# Runloop — pricing regimes
As of 2026-09-28. Product: Devboxes (microVM sandboxes). Per-second metering, **no minimums** ("Billed separately from your plan, based on actual consumption. No minimums."). All compute is billed on **allocated** size, not utilisation: the `/v1/devboxes/{id}/usage` API defines vCPU-seconds as `total_active_seconds × vCPUs` and memory GB-seconds as `total_active_seconds × GB`. Disk GB-seconds use `total_elapsed_seconds × disk GB`, so disk keeps billing while the devbox is suspended.
Base rates (https://www.runloop.ai/pricing):
| Item | Per hour | Per second | Per month (×730) |
|---|---|---|---|
| Devbox CPU | $0.108 / CPU-h | $0.00003 | — |
| Devbox memory | $0.0252 / GB-h | $0.000007 | — |
| Blueprint build | $0.252 / build-hour (flat, not size-based) | $0.00007 | — |
| Devbox storage (the devbox's own disk) | $0.00034236 / GB-h | $0.0000000951 | $0.2499 / GB-mo |
| Blueprint / snapshot / object storage | $0.000072 / GB-h | $0.00000002 | $0.0526 / GB-mo |
| Active Axon | $0.006 / axon-h | $0.0000016667 | — |
| Inactive Axon storage | — | — | $0.20 / GB-mo |
## Regimes
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| **Pro Trial** (new accounts) | New signup, no card required | Draws down a one-time $50 credit; you get Pro features, but only these sizes: X_SMALL, SMALL, MEDIUM (max 2 CPU/4 GB) | $50 one-time. Caps: 3 running devboxes, 5 blueprints, 10 snapshots, 3 objects, **1 h max keep-alive**. The trial ends when the credit runs out, with no automatic charge | https://docs.runloop.ai/docs/overview/your-runloop-trial , /pricing |
| **Basic: running (custom size)** | Basic plan, `CUSTOM_SIZE` | CPU + RAM + disk per second, on allocated size, in the `initializing`, `running`, `suspending` and `resuming` states | $0.108·CPU + $0.0252·GB + $0.00034236·disk-GB per hour. 4 CPU/8 GB/16 GB disk = **$0.6391/h**. CPU can be 0.5, 1 or an even number up to 16. RAM can be 1 or an even number up to 64 GB. Disk can be an even number from 2–64 GB (default 16) | /pricing; docs sizes page |
| **Basic: running (preset size)** | `resource_size_request` = a preset | Same rates, but the preset fixes the RAM:CPU ratio. The table price includes disk | X_SMALL 0.5/1/4 $0.0806; SMALL 1/2/4 $0.1598; MEDIUM 2/4/8 $0.3195; LARGE 2/8/16 $0.4231; **X_LARGE 4/16/16 $0.8407**; XX_LARGE 8/32/16 $1.676 | https://docs.runloop.ai/docs/devboxes/configuration/sizes |
| **Idle-but-running** | Default: `on_idle` does nothing | Billed at the full allocated rate. Utilisation does not matter | Same as running. A devbox lives until `keep_alive_time_seconds` expires (default 1 h, max 48 h) or until an idle policy fires | docs lifecycle / OpenAPI `keep_alive_time_seconds` |
| **Shutdown** | `shutdown` or keep-alive expiry. This state is terminal | No charges. The disk is destroyed | $0 | lifecycle docs |
| **Snapshot + shutdown** (Basic or Pro) | Park state as a disk snapshot, then recreate a devbox from it | Snapshot storage only | $0.000072/GB-h = **$0.0526/GB-mo**. Snapshots persist indefinitely until you delete them | /pricing; snapshots docs |
| **Suspended** (Pro, Enterprise, Trial only) | `suspend`, or `after_idle.on_idle: suspend`. Wake-on-HTTP or Axon event resumes it | No CPU or RAM. The devbox disk keeps billing at the **devbox** rate. Memory is lost; only disk is kept | 16 GB disk → $0.0055/h ≈ $4.00/mo per devbox. That is 4.75× the snapshot rate for the same bytes | /pricing FAQ; OpenAPI usage description |
| **Pro plan** | $250/month | Pure platform fee plus usage. **The fee is not converted into credit** | $250/mo, 1 TB "free storage", suspend/resume, repo connections, beta features, Slack support | /pricing |
| **Basic plan** | $0 | Usage only | 100 GB "free storage". The pricing page also says "1st month FREE" (meaning unclear, since Basic already costs $0) | /pricing |
| **Enterprise / Deploy-to-VPC** | Sales contract. Runs inside the customer's AWS, GCP or Azure account; there is also an AWS Marketplace listing (`AccountBillingType` = STRIPE, AWS_MARKETPLACE, STRIPE_PROJECTS) | Custom. "Custom free storage", reinforcement fine-tuning, priority support, SLA | Not published (null) | /pricing; runloop.ai/deploy-to-vpc; OpenAPI |
| **Flex provisioning tier** (alpha) | `provisioning_tier: "flex"` | Provisioned lazily (starts in a `queued` state) and **may be pre-empted** | No price published. Cost relative to standard is unknown (null) | OpenAPI `ProvisioningTier` |
| **Blueprint builds** | Image builds | Flat rate per build-hour, independent of size | $0.252/h. Blueprint storage $0.0526/GB-mo. Blueprints persist, and keep billing storage, until deleted. 32 concurrent builds, queue of 2,000 | /pricing; blueprint docs |
| **Axons** | Agent coordination streams | Active axon-hours plus inactive storage | $0.006/axon-h; $0.20/GB-mo | /pricing |
| **Egress / IPv4** | Any | Not published. No public IPv4 (tunnels and TLS-wrapped SSH only) | null | — |
| **Region** | — | Not selectable, so no region multipliers | — | — |
| Benchmark runs (legacy) | — | A third party (rywalker.com) cites "$1.17–$18.66 per round". This is not on the current pricing page | unverified | https://rywalker.com/research/runloop |
## Gotchas
- **The $250 Pro fee buys features, not compute.** Pro exists mainly to unlock suspend/resume. Without Pro, a devbox can only run (paying full compute) or be destroyed; snapshots are still allowed on Basic.
- **Suspend is not cheap storage.** A suspended devbox's disk bills at $0.25/GB-mo, which is 4.75× the $0.0526/GB-mo snapshot rate. For long parks (overnight or weekends), snapshot + shutdown + recreate costs less than suspend, and it also works on Basic. You lose wake-on-HTTP and the same devbox ID.
- **Neither suspend nor snapshot keeps memory.** Processes must be restarted after resume.
- **Utilisation does not matter.** At 30% CPU you still pay 100% of allocated CPU and RAM.
- **Idle devboxes keep billing by default.** `on_idle` does nothing unless you configure it. The default keep-alive is 1 h (max 48 h), which limits runaway cost but also kills long sessions unless you switch to an idle policy.
- **Suspending and resuming bill compute.** `suspending` and `resuming` are compute-billed states, and so is `initializing` (boot and setup scripts). A `suspend_commands` hook can run for up to 60 s.
- **Presets can overcharge.** X_LARGE is 4 CPU/**16 GB** ($0.8407/h). CUSTOM_SIZE 4/8 costs $0.6391/h, 24% less. There is no preset at 4 CPU/8 GB.
- **CPU counts above 1 must be even.** 3, 5 or 7 CPUs are not allowed, so 3 CPU rounds up to 4.
- **The free storage allowance is vague.** It is 100 GB on Basic and 1 TB on Pro, but Runloop does not say which storage classes it covers (devbox disk, snapshot, blueprint or object), or whether it is GB-month or a standing quota.
- **Concurrency caps are only published for the trial** (3 running devboxes). Marketing claims "10k+ parallel".
- **Flex tier:** pre-emptible and in alpha, with no published discount.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent devboxes × 8 h/day × 22 days = **8,800 devbox-hours**, 30% CPU utilisation (ignored, because billing is on allocation), 50 GiB snapshots retained all month, 100 GiB egress. Runloop can do exactly 4/8 with CUSTOM_SIZE. Disk is the default 16 GiB.
Line items:
- Compute: 8,800 h × (4×0.108 + 8×0.0252 = $0.6336) = **$5,575.68**
- Running disk: 8,800 h × 16 GB × $0.00034236 = **$48.20**
- Snapshots: 50 GB × 730 h × $0.000072 = **$2.63**
- Egress: not published, so **$0 assumed (unknown)**
| Regime | Setup | Monthly total |
|---|---|---|
| A. Basic, CUSTOM 4/8, snapshot + shutdown each evening | 5,575.68 + 48.20 + 2.63 | **$5,626.51** (≈ $5,576–5,626 depending on whether the 100 GB allowance offsets storage) |
| B. Pro, CUSTOM 4/8, *suspend* overnight and on weekends (50 devboxes live all month) | Compute 5,575.68 + disk for 50×16 GB all 730 h (800 GB × 730 × 0.00034236 = 199.94) + snapshots 2.63 + fee 250 | **$6,028.25**. If the 1 TB allowance covers the devbox disk and snapshots (850 GB), $5,825.68 |
| C. Pro, CUSTOM 4/8, snapshot + shutdown (suspend used only for short gaps) | 5,575.68 + 48.20 + 2.63 + 250 | **$5,876.51** (≈ $5,825.68 if storage is covered) |
| D. Basic, preset X_LARGE (4/16/16) | 8,800 × 0.8407 + 2.63 | **$7,400.79** |
| E. Trial | Cannot run 4/8 (max MEDIUM 2/4), cap of 3 concurrent, 1 h keep-alive | n/a. $50 covers about 78 h of 4/8 |
| F. Flex tier / Enterprise / VPC | Prices not published | null |
Cheapest published regime: **A, Basic with CUSTOM_SIZE and snapshot + shutdown, at ≈ $5,627/mo.** Pro only pays off if you need wake-on-HTTP or same-ID resume.