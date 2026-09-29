# Sail Research (Sailboxes): pricing regimes (as of 2026-09-28)
Sail Research sells two products: an LLM inference API and Sailboxes, which are persistent Linux VMs for long-horizon
agents. Both draw on one prepaid credit balance. Sailboxes are the only sandbox in this set that bills **every
dimension on observed usage**: used vCPU, used RAM and used disk, sampled about every 15 s. The chosen size (s/m/l)
only sets a ceiling. A Sailbox that is sleeping, paused, checkpointing or cold-starting costs nothing, and autosleep
kicks in after **30 s** of full idleness by default. The ComputeSDK "Sail" provider is Sail Research
(sailresearch.com), not sail.dev, which redirects to Coder.
Base rates: used vCPU **$0.015/h**, used RAM **$0.008/GiB-h**, used NVMe disk **$0.0007/GiB-h** (while running only),
volumes $0.000411/GiB-h (always). At 100% of 4 vCPU with 8 GiB resident: 0.06 + 0.064 = **$0.124/h**, about 37% of E2B's allocation price.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free (PAYG, prepaid credits) | Default | No fee. Prepaid credits. $5/month free credit once a card is attached. Creation fee per Sailbox and per copy | $0 fee; $5/mo credit; 4 seats; 100 concurrent; creation S $0.005 / M $0.01 / L $0.012 | https://docs.sailresearch.com/pricing |
| Pro | Need >100 concurrent or >4 seats, or want creation fees waived | $250/mo **pure fee** plus $100/mo included credits (+$150 in the first month). Usage beyond that draws on prepaid credits | $250; $100/mo credit; 5,000 concurrent; unlimited seats; creation fees waived | https://docs.sailresearch.com/pricing |
| Enterprise | Contract | Volume pricing billed monthly in arrears; HIPAA BAA, SLAs | unpublished | https://docs.sailresearch.com/pricing |
| Running (usage-based) | Sailbox awake | CPU = guest /proc/stat CPU time; RAM = MemTotal − MemAvailable (page cache excluded); disk = statfs used bytes on `/`; sampled ~every 15 s. Size is a ceiling, not a reservation | $0.015 vCPU-h, $0.008 GiB-h, $0.0007 GiB-h disk | pricing-page tooltips; https://docs.sailresearch.com/sailboxes-billing |
| Sizes | Chosen at create (default `m`) | Set the vCPU count, the RAM/disk ceilings and the creation fee. No idle cost | s 1 vCPU / 16 GiB (2–64) / 32 GiB (8–128); m 4 / 32 (8–128) / 128 (32–512); l 8 / 64 (16–256) / 256 (64–1024) | https://docs.sailresearch.com/sailboxes-billing, CLI reference |
| Autosleep | Fully idle (no CPU, no timers, no open connections) for the idle window | Memory+disk checkpoint. **$0** for compute and disk. Wakes on traffic, exec, SSH, a reply or an alarm | default 30 s; configurable 1–3600 s or `never` | https://docs.sailresearch.com/sailboxes-autosleep |
| Sleep while awaiting an LLM reply | Process waits on an outbound TCP/HTTP reply with timeout ≥ 5 min | Sleeps; the reply wakes it (force-wake after ~5 min) | $0 while asleep | sailboxes-autosleep |
| Paused | `pause` (only an explicit `resume` wakes it) | Not billed | $0 | sailboxes-billing FAQ |
| Checkpoints / copies | `checkpoint`, start-from-checkpoint | The checkpoint handle expires after 7 days by default (TTL configurable). **Storage price not published.** Each copy bills its own usage plus a creation fee on Free | null | SDK reference; sailboxes-billing FAQ |
| Volumes | Mounted shared storage | Billed every hour the volume exists, including while Sailboxes sleep | $0.000411/GiB-h ≈ $0.30/GiB-mo | https://docs.sailresearch.com/pricing |
| Credits exhausted | Balance hits 0 | All running and sleeping Sailboxes are **paused**. New spend (create, resume, exec) is blocked. Nothing is terminated | — | sailboxes-billing FAQ |
| Terminated | `terminate` or `max_lifetime_seconds` | Billing stops. Anything not on a volume or checkpoint is lost | $0 | API reference |
| Egress / IPv4 | — | Not published. No public IPv4; published ports serve HTTP or raw TCP | null | — |
| Inference surcharges (not sandbox) | Pro/Enterprise US-only inference | +20% (Pro) / +10% (Enterprise) on token prices | n/a to Sailboxes | pricing page |
No dated Sailbox price changes found.
## Gotchas
1. **RAM is billed on what the guest actually uses** (MemTotal − MemAvailable), not on the 32 GiB ceiling. A 30%-busy agent holding 2 GiB pays for 2 GiB. Estimators that use allocated RAM overstate Sail by a wide margin.
2. **Autosleep is aggressive (30 s) and on by default.** It even sleeps while an agent waits on a long LLM HTTP call, so wall-clock session hours overstate billed hours. The flip side: any wake can come back **cold** (disk intact, processes gone), and a request timeout under 5 min keeps the box awake.
3. **Disk is "used bytes on /" and bills only while running**, so the image footprint counts but sleeping disk is free. Volumes are the exception and bill 24/7.
4. **The Pro $250 is a fee, not credit.** Only $100/mo comes back as credit (first month $250). At ≤ 100 concurrent, Free is cheaper unless you need seats or 5,000 concurrency.
5. **Creation fees apply to every copy/fork on Free.** They are tiny ($0.005–0.012), but a fan-out of 10k copies costs $50–120.
6. **Credits are prepaid and shared with inference.** Heavy token usage can drain the balance, and when it hits zero every Sailbox is paused.
7. **Live migration** happens a few times a day (seconds-long blip).
8. Checkpoint storage, egress and regions are unpublished.
## Worked example
Workload: 4 vCPU / 8 GiB (size `m` with `memory_limit_gib=8`), 50 concurrent × 8 h/day × 22 days = **8,800 Sailbox-hours**,
30% CPU, 50 GiB snapshots, 100 GiB egress. Sailboxes are kept and slept between shifts (50 creations). Assumed 10 GiB used disk.
| Line | Calculation | $ |
|---|---|---|
| CPU (used) | 4 × 0.30 × 0.015 × 8,800 | 158.40 |
| RAM, 8 GiB resident all session | 8 × 0.008 × 8,800 | 563.20 |
| RAM, if only 4 GiB resident | 4 × 0.008 × 8,800 | 281.60 |
| Used disk 10 GiB (running hours only) | 10 × 0.0007 × 8,800 | 61.60 |
| Snapshots / sleep state 50 GiB | sleeping not billed; explicit checkpoint price unpublished | 0 (null) |
| Egress 100 GiB | unpublished | null |
| Creation fees (Free) | 50 × $0.01 (fresh box per session: 1,100 × $0.01 = $11) | 0.50 |
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free, 8 GiB resident | Yes (50 ≤ 100 concurrent) | **$778.70** = 783.20 + 0.50 − 5 |
| Free, 4 GiB resident | Yes | **$497.10** |
| Free, awake 50% of the session (autosleep during LLM waits; CPU-seconds unchanged) | Yes | **$466.30** = 158.40 + 281.60 + 30.80 + 0.50 − 5 |
| Pro, 8 GiB resident | Yes | **$933.20** = 250 + 783.20 − 100 (first month $783.20) |
| Enterprise | Yes | unpublished volume pricing |
| Anti-pattern: autosleep `never`, left up 24 h/day (8 GiB resident, ~0 CPU idle) | Yes | ≈ **$2,028** on Free (17,600 extra idle h × $0.071) |
For comparison, E2B Pro on the same workload costs $3,064.56.