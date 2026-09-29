# Deno Sandbox — pricing regimes (as of 2026-09-28)
Deno Sandbox is a Firecracker microVM product billed **through the Deno Deploy account meters**. There is no
separate sandbox SKU: sandbox CPU time, memory time and egress draw down the same monthly allowances as Deploy
apps, then overage at one rate. Plans only change availability, concurrency (per region) and included volume storage.
Current list rates: CPU time **$0.10/CPU-h** (active CPU, not wall clock), memory **$0.025/GiB-h** (configured
allocation while the sandbox lives), volumes **$0.20/GiB-month**, egress **$0.20/GiB** over the plan allowance.
Fixed shape: **2 vCPU**, 768 MB–4 GB RAM (default 1.2 GiB), 10 GB ephemeral disk. A 4 vCPU / 8 GiB sandbox cannot be bought.
Max shape flat-out: 2×0.10 + 4×0.025 = **$0.30/h**; idle (0 CPU) at 4 GiB = **$0.10/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free plan | Default Deploy account | Sandboxes **not included** at all; Deploy apps are hard-cut at limits | $0; 0 sandboxes | https://deno.com/deploy/pricing |
| Pro | Cheapest plan with sandboxes | $20/mo **pure fee** that bundles meter allowances shared with Deploy apps; overage at list | $20/mo; 50 CPU-h, 750 GiB-h memory, 200 GiB egress, 5 GiB volumes included; 3 concurrent sandboxes **per region**; 10 team members | https://deno.com/deploy/pricing |
| Builder | More concurrency / allowances | $200/mo pure fee + 10× allowances; overage at the same list rates | $200/mo; 500 CPU-h, 7,500 GiB-h, 2,000 GiB egress, 50 GiB volumes; 20 concurrent per region | https://deno.com/deploy/pricing |
| Enterprise | >20 concurrent/region, SLA, SOC2 report/DPA, HIPAA BAA | Custom (contact sales) | null | https://deno.com/deploy/pricing, https://deno.com/sandbox (FAQ) |
| Running sandbox – CPU | Any time code executes | Active CPU time only; I/O wait / idle not billed | $0.10/CPU-h (2 vCPU max → ≤$0.20/h) | https://deno.com/sandbox, https://deno.com/deploy/pricing |
| Running sandbox – memory | Whole lifetime of the sandbox, idle or not | Configured memory × wall-clock seconds ("billed at that higher amount" when configured above default) | $0.025/GiB-h; 1.2 GiB default = $0.03/h | https://deno.com/deploy/pricing |
| Lifetime: `session` (default) | Sandbox tied to client connection | Dies when the script/connection ends; billing stops | max 30 min per docs | https://docs.deno.com/sandbox/timeouts, https://docs.deno.com/sandbox/ |
| Lifetime: duration timeout | e.g. `timeout: "5m"`, reconnect later | Keeps billing memory until the timer ends even if nobody is connected; `extendTimeout()` can extend | Docs limit "up to 30 minutes"; longer = promote to a Deploy app | https://docs.deno.com/sandbox/timeouts |
| Promote to Deploy app | Need >30 min / long-running service | Becomes a Deploy app: same CPU/memory meters, but idle apps scale to zero after ~20–30 s | same rates | https://docs.deno.com/sandbox/promote, https://deno.com/deploy/pricing |
| Volumes | Persistent block storage mounted into sandboxes | Per GiB-month beyond plan allowance; ord (Chicago) only; 300 MB–20 GB per volume | $0.20/GiB-mo; 5 GiB Pro / 50 GiB Builder free | https://deno.com/deploy/pricing, https://docs.deno.com/sandbox/volumes/ |
| Snapshots (read-only images of volumes) | Custom boot images | Billing not stated anywhere; presumably volume storage meter (unverified) | null | https://docs.deno.com/sandbox/volumes/ |
| Ephemeral disk | Every sandbox | Included | 10 GB, not billed | https://docs.deno.com/sandbox/ |
| Egress | Outbound traffic (sandboxes + apps) | Shared Deploy egress meter | 200 GiB Pro / 2,000 GiB Builder, then $0.20/GiB | https://deno.com/deploy/pricing |
| Regions | `ams` (Amsterdam), `ord` (Chicago) | No regional multiplier; concurrency limits are per region | ×1 | https://docs.deno.com/sandbox/ |
| Spend limits | Paid plans | User-set cap; Free plans are cut off | — | https://deno.com/sandbox (FAQ) |
### Dated price change
At launch (**2026-02-03**, https://deno.com/blog/introducing-deno-sandbox) sandboxes cost **$0.05/CPU-h** (40 h
included with Pro) and **$0.016/GB-h** memory (1,000 GB-h included with Pro), volumes $0.20/GiB-mo (5 GiB Pro).
The current pricing page shows **$0.10/CPU-h** and **$0.025/GiB-h**, with Pro allowances folded into the shared
Deploy meters (50 CPU-h, 750 GiB-h). That is a **2× CPU and 1.56× memory increase** with a smaller memory allowance;
exact effective date not found. Separately the Free Deploy plan was cut (egress 100→20 GiB Mar–Apr 2026; CPU 15→10 h,
## Gotchas
1. **Hard 2 vCPU / 4 GB ceiling.** Anything larger is not purchasable; a 4 vCPU / 8 GiB workload is infeasible.
2. **30-minute lifetime.** Long agent sessions need repeated re-creation (state only survives on volumes) or promotion to a Deploy app.
3. **Memory is the real cost driver.** CPU is billed only when busy, but memory bills for every second of lifetime; a duration timeout left running idle still pays memory.
4. **Concurrency is per region and tiny:** Pro 3, Builder 20 (docs still say 5/org "pre-release"). Using both ams + ord doubles the cap, but volumes exist only in ord.
5. **Allowances are shared with your Deploy apps** — a busy Deploy site eats the sandbox allowance.
6. **Plan fee is not credit**, but the included meters are worth $23.75 (Pro: 50×0.10 + 750×0.025) and $237.50 (Builder), plus 200 / 2,000 GiB egress.
7. **Old blog/launch prices ($0.05 CPU-h, $0.016 GB-h) still circulate** in third-party comparisons (e.g. search snippets); they are stale.
8. SOC2 Type 1 report/DPA listed as Enterprise-only on the pricing page, although the FAQ says Deno Deploy is SOC2 + ISO27001 certified.
## Worked example
Standard workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days, 30% CPU, 50 GiB snapshots, 100 GiB egress.
**Not feasible as specified** (max 2 vCPU / 4 GB; 30-min lifetime; 50 concurrent exceeds Builder's 20/region = 40 across both regions).
Closest runnable shape: **2 vCPU / 4 GiB**, 8,800 sandbox-hours (re-created every 30 min, no start fee), 30% CPU,
50 GiB kept on volumes, 100 GiB egress.
- CPU: 8,800 × 2 × 0.30 = 5,280 CPU-h. Memory: 8,800 × 4 = 35,200 GiB-h.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Pro | No (3/region concurrency) | would be $20 + (5,280−50)×0.10 + (35,200−750)×0.025 + (50−5)×0.20 = **$1,413.25** |
| Builder | No (20/region = 40 max) | $200 + (5,280−500)×0.10 + (35,200−7,500)×0.025 + 0 volumes + 0 egress = **$1,370.50** |
| Enterprise | Yes (custom concurrency) | unpublished; ~$1,370 at list rates + negotiated fee |
| At launch rates (Feb 2026, Pro) | historical | $20 + (5,280−40)×0.05 + (35,200−1,000)×0.016 + $9 = $838.20 |
Egress 100 GiB is inside both plans' allowance. Snapshots-as-volumes billing assumed at the volume rate.