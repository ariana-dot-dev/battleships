# MIOSA: pricing regimes (as of 2026-09-28)
MIOSA uses one credit rate card (1 credit = $0.01) for every product: sandboxes, desktop "Computers", deployments and
data. Plans never change the price. They set a **monthly minimum that is credited 1:1** and the caps and concurrency. The
regimes that change the bill are the plan minimum, running vs paused disk rates, the size preset (disk is billed while running), egress, and BYOC at 45%.
Rate card: vCPU **4.536 credits/h ($0.04536)**, RAM **1.458/GB-h ($0.01458)**, disk while running **0.06147/GB-h ($0.0006147)**,
cold storage while paused **0.00243/GB-h ($0.0000243, $0.01774/GB-month)**, egress **5/GB ($0.05)**, GPU **175/h ($1.75)**,
builds 2/min, LLM tokens at provider cost + 15%. The page rounds vCPU to $0.0454 and RAM to $0.0146.
Sandbox medium 4 vCPU / 8 GB / 20 GB = 18.144 + 11.664 + 1.2294 = **31.0374 credits = $0.310374/h** ($0.29808 without disk).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Developer | Default, no card | $0 fee. One-time credit. **Hard stop at $0**, no overage, no auto-recharge | $10 one-time (1,000 credits). 3 Computers, 10 Sandboxes, 2 concurrent | https://miosa.ai/pricing |
| Business | Production | $500/mo **minimum credited 1:1** (50,000 credits). Overage at the same rate with spend controls. Top-ups $1-$5,000 | 100 Computers, 250 Sandboxes, 50 concurrent. Cancel at end of period | https://miosa.ai/pricing |
| Enterprise | Request | $1,000/mo minimum credited 1:1 (100,000 credits). Same rates | 200 Computers, 500 Sandboxes, 200 concurrent. SSO/SCIM. Cancellation per agreement | https://miosa.ai/pricing |
| Per-computer caps | By plan | Size ceiling | Dev 2 vCPU/4 GB/10 GB, Business 8/16/40, Enterprise 16/32/80. **These were on the page earlier on 2026-09-28 and are gone on re-check** | raw/miosa_ai_pricing.txt vs raw/miosa_ai_pricing_recheck.txt |
| Sandbox sizes (running) | Sandbox API | Fixed presets, allocation, vCPU+RAM+disk per hour, metered continuously, ledger settles about every 5 min | xs 1/2/10 $0.0807, small 2/4/10 $0.1552, medium 4/8/20 $0.3104, large 8/16/40 $0.6207, xl 16/32/80 $1.2415 per h | https://miosa.ai/docs/api-reference/sandboxes |
| Computer sizes (running) | Desktop Computers (Xfce, Firefox) | Same rate, bigger disks | xs 10, small 20, medium 50, large 100, xl 200 GB disk. small = 16.13 credits/h (page calculator) | https://miosa.ai/docs/computers/overview |
| Paused / stopped | `pause`, timeout on a persistent sandbox, stopped Computer | No compute. Disk at the cold-storage rate | $0.0000243/GB-h = $0.01774/GB-month | https://miosa.ai/pricing |
| Timeout | `timeout_sec` 1-86,400 (default 3,600). `idle_timeout_sec` default 0 (off) | Persistent sandboxes **pause** at timeout. Non-persistent ones are destroyed | max 24 h per active session | https://miosa.ai/docs/api-reference/sandboxes |
| Egress | All outbound | Per GB | $0.05/GB, no free allowance published | https://miosa.ai/pricing |
| BYOC | Your AWS/GCP/Azure (gated private preview, needs /dev/kvm) | MIOSA orchestration fee = 45% of the managed rate. **Your cloud bill comes on top** | vCPU $0.0204, RAM $0.006561/GB-h, disk $0.00027662/GB-h, cold $0.00001094/GB-h, egress $0.0225/GB, GPU $0.7875/h | https://miosa.ai/pricing |
| GPU | Rate card only | $1.75/GPU-h (type unspecified). Managed GPU sandboxes are "planned", so today GPU only works via BYOC/OpenComputers | $1.75 | https://miosa.ai/pricing, /docs/known-limitations |
| Builds / tokens | Template builds, agent runs | Per build-minute. Tokens at cost + 15% | 2 credits/min | https://miosa.ai/pricing |
| Stale docs model | /docs/api-reference/credits | Old size-based credits (Small 4GB/1CPU 3/h, Medium 6, Large 12). Plans Free/Starter $29/Pro $79/Scale $199. Credits expire after 180 days | **Superseded by the pricing page, not used** | https://miosa.ai/docs/api-reference/credits |
| Regions | us-west-la, us-east-ny, us-mia | No multiplier | 1 | https://miosa.ai/docs/api-reference/regions |
## Gotchas
1. **The plan fee is a minimum, not an add-on.** Business at $500 costs max($500, usage). At low usage you pay $500 for less.
2. **Disk is billed while running** as part of the hourly rate. Computers carry 2-2.5× more disk than sandboxes of the same size, so a medium Computer costs $0.3288/h against $0.3104/h for a medium sandbox.
3. **Paused state is cheap but not free**: $0.01774/GB-month on the retained disk.
4. **Developer stops hard at $0** and allows only 2 concurrent workloads. The docs also cap tenants at 10 concurrent sandboxes by default ("contact support"), even though the Business page says 50.
5. **Per-computer size caps disappeared from the pricing page** during the day (2026-09-28). They may still be enforced.
6. **BYOC "45%" understates the total.** AWS/GCP/Azure bill you separately for the same VMs.
7. The **credits docs page is stale** (a different price model). Trust https://miosa.ai/pricing.
8. GB vs GiB is not specified. Billing granularity/minimum is unpublished ("metered continuously").
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots retained,
100 GiB egress. Medium sandboxes (4/8/20 GB) are paused between shifts.
- Compute + running disk: 8,800 × $0.310374 = **$2,731.29** (vCPU $1,596.67 + RAM $1,026.43 + disk $108.19). 30% CPU changes nothing (allocation).
- Paused state: 50 GiB × $0.01774 = **$0.89**.
- Egress: 100 × $0.05 = **$5.00**.
- Usage total: **$2,737.18**.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Developer | No: 2 concurrent (and 2 vCPU cap per the earlier capture) | n/a |
| Business ($500 credited) | Yes, exactly 50 concurrent (the docs' default 10/tenant needs a support raise) | **$2,737.18** (fee absorbed) |
| Enterprise ($1,000 credited) | Yes | $2,737.18 |
| BYOC (orchestration only) | Private preview | 0.45 × 2,737.18 = **$1,231.73** + your own cloud bill |
| Anti-pattern: left running 24 h/day | Yes | 26,400 × 0.310374 + 5 = **$8,198.87** |