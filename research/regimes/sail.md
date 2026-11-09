# Sail Research (Sailboxes): pricing regimes (as of 2026-11-08)
Sail Research sells two products: an LLM inference API and Sailboxes, which are persistent Linux VMs for long-horizon
agents. Both draw on one prepaid credit balance. Sailboxes bill **every dimension on observed usage**: used vCPU,
used RAM (including the filesystem cache inside the Sailbox) and used disk. Usage is sampled every second, reported in
about one-minute batches, and not rounded up to whole minutes. The vCPU, memory and disk limits are ceilings, not
reservations, and can change on a running Sailbox. A Sailbox that is sleeping, paused, checkpointing or cold-starting
costs nothing, and autosleep starts after **30 s** of full idleness by default. The ComputeSDK "Sail" provider is
Sail Research (sailresearch.com), not sail.dev, which redirects to Coder.
Base rates: used vCPU **$0.015/h**, used RAM **$0.008/GiB-h**, used NVMe disk **$0.0007/GiB-h** (while running only),
volumes $0.000411/GiB-h (always). At 100% of 4 vCPU with 8 GiB used: 0.06 + 0.064 = **$0.124/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free (PAYG, prepaid credits) | Default | No fee. Prepaid credits. $5/month free credit once a card is attached. Creation fee per Sailbox and per copy | $0 fee; $5/mo credit; 4 seats; 200 reserved vCPUs across active Sailboxes; creation $0.01 flat | https://docs.sailresearch.com/pricing |
| Pro | Need >200 reserved vCPUs or >4 seats, or want creation fees waived | $250/mo fee plus $100/mo included credits (+$150 in the first month). Usage beyond that draws on prepaid credits | $250; $100/mo credit; 10,000 reserved vCPUs; unlimited seats; creation fees waived | https://docs.sailresearch.com/pricing |
| Enterprise | Contract | Volume pricing billed monthly in arrears; HIPAA BAA, SLAs | unpublished | https://docs.sailresearch.com/pricing |
| Running (usage-based) | Sailbox awake | CPU time of the virtual CPUs; used memory including filesystem cache; used disk. Sampled every second, not rounded up to whole minutes | $0.015 vCPU-h, $0.008 GiB-h, $0.0007 GiB-h disk | https://docs.sailresearch.com/sailboxes-pricing |
| Limits | Set at create, changeable later (`set_limits`) | Ceilings only. No idle cost. Round up to the next power of two | 1-64 vCPU (default 8); 16-256 GiB memory (default 64); 8-1024 GiB disk (default 256) | https://docs.sailresearch.com/sailbox-sdk |
| Autosleep | Fully idle (no CPU, no timers, no open connections) for the idle window | Memory+disk checkpoint. **$0** for compute and disk. Wakes on traffic, exec, SSH, a reply or an alarm. Open connections survive up to 10 minutes; start/resume under 3 s | default 30 s; configurable 1-3600 s or `never` | https://docs.sailresearch.com/sailboxes-autosleep, https://sailresearch.com/sailboxes |
| Sleep while awaiting an LLM reply | Process waits on an outbound TCP/HTTP reply with timeout >= 5 min | Sleeps; the reply wakes it | $0 while asleep | sailboxes-autosleep |
| Paused | `pause` (only an explicit `resume` wakes it) | Not billed. Releases reserved vCPUs | $0 | https://docs.sailresearch.com/pricing |
| Checkpoints / copies | `checkpoint`, start-from-checkpoint | Handle expires after 7 days by default (TTL configurable). **Storage price not published.** Each copy bills only its own usage, plus a creation fee on Free | null | https://docs.sailresearch.com/sailbox-sdk, https://docs.sailresearch.com/sailboxes-forking |
| Volumes (Alpha) | Mounted shared storage | Billed every hour the volume exists, including while Sailboxes sleep | $0.000411/GiB-h = about $0.30/GiB-mo | https://docs.sailresearch.com/sailboxes-pricing |
| Credits exhausted | Balance hits 0 | All running and sleeping Sailboxes are **paused**. Nothing is terminated | - | sailboxes-billing FAQ |
| Terminated | `terminate` or `max_lifetime_seconds` | Billing stops. Anything not on a volume or checkpoint is lost | $0 | https://docs.sailresearch.com/sailbox-sdk |
| Egress / IPv4 | - | Egress price not published. Public HTTPS URL per port, public host:port for raw TCP, SSH, custom domains | null | https://docs.sailresearch.com/sailboxes-access-control |
No dated Sailbox price changes found. The s/m/l sizes and the per-size creation fees ($0.005/$0.01/$0.012) are gone (2026-11-08).
## Gotchas
1. **RAM is billed on what the guest uses**, not on the memory limit. The filesystem cache counts, so file-heavy work bills more RAM than the working set.
2. **Autosleep is on by default (30 s).** It sleeps even while an agent waits on a long LLM HTTP call, so wall-clock hours overstate billed hours. Any wake can come back **cold** (disk intact, processes gone).
3. **Disk bills only while running**, so sleeping disk is free. Volumes bill 24/7.
4. **The Pro $250 is a fee.** Only $100/mo comes back as credit (first month $250).
5. **The concurrency cap counts reserved vCPUs**, not Sailboxes: 200 on Free = 50 Sailboxes at 4 vCPU, 25 at the 8 vCPU default. Sleeping and paused Sailboxes do not count.
6. **Creation fees apply to every copy on Free** ($0.01 each), so a fan-out of 10k copies costs $100.
7. **Credits are prepaid and shared with inference.** At zero, every Sailbox is paused.
8. **Live migration** happens a few times a day (seconds-long blip).
9. Checkpoint storage, egress and regions are unpublished.
## Worked example
Workload: 4 vCPU / 8 GiB used, 50 concurrent x 8 h/day x 22 days = **8,800 Sailbox-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress. Sailboxes are kept and slept between shifts (50 creations). Assumed 10 GiB used disk.
| Line | Calculation | $ |
|---|---|---|
| CPU (used) | 4 x 0.30 x 0.015 x 8,800 | 158.40 |
| RAM, 8 GiB used all session | 8 x 0.008 x 8,800 | 563.20 |
| RAM, if only 4 GiB used | 4 x 0.008 x 8,800 | 281.60 |
| Used disk 10 GiB (running hours only) | 10 x 0.0007 x 8,800 | 61.60 |
| Snapshots / sleep state 50 GiB | sleeping not billed; explicit checkpoint price unpublished | 0 (null) |
| Egress 100 GiB | unpublished | null |
| Creation fees (Free) | 50 x $0.01 | 0.50 |
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free, 8 GiB used | Yes (50 x 4 = 200 reserved vCPUs, exactly the cap) | **$778.70** = 783.20 + 0.50 - 5 |
| Free, 4 GiB used | Yes | **$497.10** |
| Free, awake 50% of the session (CPU-seconds unchanged) | Yes | **$466.30** = 158.40 + 281.60 + 30.80 + 0.50 - 5 |
| Pro, 8 GiB used | Yes | **$933.20** = 250 + 783.20 - 100 (first month $783.20) |
| Enterprise | Yes | unpublished volume pricing |
