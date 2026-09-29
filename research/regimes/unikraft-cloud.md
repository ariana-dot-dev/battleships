# Unikraft Cloud (formerly KraftCloud): pricing regimes (as of 2026-09-28)
Unikraft Cloud (unikraft.com, Unikraft Inc.) runs Dockerfile-built images as Firecracker-based microVMs
(Unikraft kernel or minimal "TinyX" Linux) with scale-to-zero and wake-up in about 10 ms (vendor claim).
Launched **2024-04-02** as KraftCloud in closed beta (Launch HN https://news.ycombinator.com/item?id=39902949;
earlier kraft.cloud HN posts date from 2023-07-21).
**Pricing is capacity-based, not metered.** The public page lists no per-vCPU-hour, per-GiB-hour or per-GB-egress price.
Each flat monthly plan caps the account's concurrent running pool and its standby (scaled-to-zero) pool.
Idle instances go to standby and are free within the plan. All figures below are list prices.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Hobby | Default, free forever, no card | $0; hard pool caps | 2 running instances, 2 vCPU + 4 GiB total running; 5 standby instances, 8 GiB standby storage; 10 GiB image storage; community support | https://unikraft.com/pricing |
| Team | Small production | $39/month flat | 8 running, 8 vCPU + 8 GiB total; 50 standby, 15 GiB standby storage; 50 GiB images; transparent migration | https://unikraft.com/pricing |
| Pro | "Agent fleets and sandboxes" | $199/month flat | 24 running, 24 vCPU + 32 GiB total; 5,000 standby, 1 TiB standby storage; 100 GiB images; user-defined proxy, shared memory, snapshot history & rollback, live kernel updates, priority support | https://unikraft.com/pricing |
| Enterprise (hosted / dedicated / on-prem / BYOC) | Anything above Pro, plus Enterprise-only features | Custom contract | "Unlimited instances", dedicated host fleet, on-prem/BYOC, SOC2/HIPAA/audit logs, named SRE, 1 h SLA; price not published | https://unikraft.com/pricing, https://unikraft.com/on-prem |
| Running | Instance is serving/awake | Counts against the plan running pool (vCPU, memory, instance count) | No per-hour charge published | https://unikraft.com/pricing, https://unikraft.com/docs/platform/quotas.md |
| Standby (scale-to-zero) | No traffic for the cooldown (policy `on`, or `idle`, which also covers idle TCP connections) | Not charged ("You're not charged for the service in this state"); counts against standby count and standby storage | Stateful mode snapshots memory to disk; wake takes ms | https://unikraft.com/docs/features/scale-to-zero.md |
| Templates / branches / checkpoints | Clone warmed state | Uses instance and standby quotas | Memory + volume state; forking is preview | https://unikraft.com/docs/features/branching.md, https://unikraft.com/docs/features/checkpoints.md |
| GPU ("full" QEMU VMs) | Enterprise preview | Unpublished; GPU stays assigned for the instance's whole lifetime, even while stopped | 1 NVIDIA GPU per instance max, model not selectable | https://unikraft.com/docs/releases/r12-thebe.md |
| Sandbox plugin, network shield, nested virt, arm64 | Enterprise only | Unpublished | Exec/filesystem API, egress filter plus secret injection | https://unikraft.com/docs/features/plugins.md, https://unikraft.com/docs/releases/r13-adrastea.md |
| Egress / bandwidth | All traffic | Not published | null | (none found) |
| Regions | Metro chosen per instance | No regional multiplier published | dal, fra, sfo, sin, was (28 more "potential" metros on request) | https://unikraft.com/docs/platform/metros.md |
## Gotchas
1. **No meter, no overage.** The docs don't say whether going over the plan's running pool is blocked or billed. The quotas API (`hard.live_vcpus`, `hard.live_memory_mb`) suggests hard limits.
2. **Self-serve capacity is small.** Pro allows 32 GiB of RAM in total. That is four 4 vCPU / 8 GiB instances at once (limited by memory), one on Team, and none on Hobby (4 GiB total).
3. **Per-instance size limits aren't published.** The quotas doc example shows 1 vCPU and 16 MiB–8 GiB per instance. Real per-plan limits may be lower than the pool totals suggest.
4. **The "sandbox" API is Enterprise-only.** The sandbox plugin (exec + filesystem, used by the JS SDK `Sandbox` class), egress filtering (network shield), GPUs, nested virt and arm64 all require Enterprise. Self-serve plans deploy Dockerfile services behind TLS/HTTP endpoints.
5. **Idle is genuinely free, but only if traffic stops.** With policy `on`, an open TCP connection keeps the instance running. Policy `idle` fixes this but can drop long-idle connections (tradeoff documented).
6. **"Full" (QEMU) VMs give up the headline features.** They lose scale-to-zero, templates, branching and checkpoints. GPU instances hold their GPU even while stopped.
7. **Customer-reported ~$0.30/h per browser** (Browser Use case study) refers to Browser Use's own bare-metal Enterprise deployment. It is not a list rate.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress.
- Peak need is 50 × (4 vCPU / 8 GiB) = **200 vCPU / 400 GiB running at once**. The largest self-serve plan (Pro) holds 24 vCPU / 32 GiB, so **only Enterprise fits**, and its price is unpublished.
- Hourly utilisation (30% CPU) and hours don't change the self-serve bill. It is a flat fee sized to peak concurrency.
- Snapshots: standby memory snapshots are included within plan quota (Pro: 1 TiB), so 50 GiB costs $0 on Pro.
- Egress: not published (null).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Hobby | No (4 GiB total < 8 GiB for one instance) | n/a |
| Team | 1 concurrent 4/8 instance only | $39 flat |
| Pro | 4 concurrent 4/8 instances (memory-bound), i.e. up to 704 h in this schedule | **$199 flat**. It covers 4/50 of the workload. |
| Enterprise | Yes | **unknown** (sales) |
| Hypothetical linear extrapolation (NOT an offered price) | 400 GiB / 32 GiB = 12.5 → 13 Pro-sized pools | 13 × $199 = $2,587/month. Running multiple Pro accounts is not documented as allowed; shown only as an order-of-magnitude reference. |
Closest honest figure: **unknown (Enterprise)**. At small scale (≤4 concurrent 4/8 instances), Pro is a flat **$199/month** however many hours they run.