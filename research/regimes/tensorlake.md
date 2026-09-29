# Tensorlake Sandboxes: pricing regimes (as of 2026-09-28)
Tensorlake (Firecracker/Cloud Hypervisor microVMs) meters **active CPU** (idle and I/O wait are free), plus **allocated** RAM and root disk while running, per second. Snapshot storage is billed while suspended. Everything is priced in compute units (1 CU = $0.01), pooled per org and billed in whole CUs.
The same workload lands on very different rates depending on:
- **the tier**. Usage Credits (prepaid) and Pro ($250/cycle, 40% lower rates) are separate rate sets (`usage_credits_gb_v1`, `pro_gb_v1`).
- **whether active-CPU metering works** for that sandbox generation. If it doesn't, CPU falls back to allocated.
- **named (suspendable) vs ephemeral** sandboxes.
- **BYOC**, where you pay your cloud plus a % fee.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Free | Default, no card | **Unmetered** (no charge) but tiny | $0. 1 sandbox at a time, 1 vCPU / 1 GB / 10 GB, idle timeout max 2 h, encrypted storage with 7-day retention | https://www.tensorlake.ai/pricing |
| 2 | Usage Credits (prepaid, "On-Demand") | Buy a $5/$10/$20 pack (500/1,000/2,000 CU). Up to 10 packs at once. Optional threshold auto-refill | Deducts from balance at the Usage-Credits rate set. **No postpaid overage**: at zero balance, new activity is blocked and running sandboxes are **stopped** | Active CPU $0.07/core-h, RAM $0.015/GB-h, disk $0.0002/GB-h, snapshot $0.07/GB-month. Limits: 100 concurrent, 4 vCPU / 16 GB / 100 GB, 24 h idle-timeout cap. 4/8 at 100% CPU = $0.40/h; at 30% = $0.204/h | https://www.tensorlake.ai/pricing, https://docs.tensorlake.ai/platform/billing |
| 3 | Pro | $250 per monthly billing cycle | Fee = 25,000 CU of usage **at Pro's lower rates**. Overage $0.01/CU on the same invoice. So you pay max($250, usage) | Active CPU $0.042, RAM $0.009, disk $0.0001/GB-h, snapshot $0.07/GB-month. Limits: 1,000 concurrent, 16 vCPU / 64 GB / 100 GB, unlimited duration, HIPAA BAA, 24×7 Slack. 4/8 at 100% = $0.24/h; at 30% = $0.1224/h | https://www.tensorlake.ai/pricing |
| 4 | Enterprise | Quote | Custom rates, unlimited concurrency, custom vCPU/RAM/disk ceilings, SSO/SAML/RBAC, in-VPC/on-prem, 1 h P1 SLA | null | https://www.tensorlake.ai/pricing |
| 5 | BYOC / Self-hosted Compute | Project with Self-hosted Compute enabled. Sandboxes run on your AWS (i7i.metal executors) | You pay AWS directly. Tensorlake charges a **% of compute cost**: CPU sandboxes 30%, down to 10% at scale; GPU sandboxes 5%, down to 2%. Blog example: i7i.metal-24xl (96 vCPU / 768 GiB) $9.06/h at a 20% rate = $10.87/h, "~1.1¢ per sandbox-hour" at 1,000 sandboxes/machine | 30%→10% (CPU), 5%→2% (GPU) | https://www.tensorlake.ai/blog/introducing-tensorlake-byoc (dated 2026-07-28), https://docs.tensorlake.ai/platform/self-hosted-compute/aws |
| 6 | Active-CPU metering | Normal case | Only core-time actually executing is billed. Idle and I/O wait are free. RAM and disk are billed on allocation regardless | cost ∝ utilisation (CPU only) | /pricing FAQ, /docs/platform/billing |
| 7 | Allocated-CPU **fallback** | "If an active CPU sample is unavailable or untrustworthy" for a sandbox generation | CPU billed on **allocated** vCPU time for that generation | Pro 4/8 = $0.24/h. Usage Credits = $0.40/h | https://www.tensorlake.ai/pricing (FAQ "How is pricing metered?") |
| 8 | Running-idle tail | Until `timeout_secs` idle threshold (default **600 s**). Driven by proxied traffic (SDK, SSH, PTY, exposed ports) | RAM + disk at full rate. CPU ≈ $0 because it is idle | Pro: 8 GB × 0.009 = $0.072/h. Credits: $0.12/h | https://docs.tensorlake.ai/sandboxes/lifecycle |
| 9 | Suspended (**named sandboxes only**) | Manual suspend or idle timeout on a named sandbox | "Consumes no compute". Snapshot storage **per GB per fixed 30-day month** | $0.07/GB-month (both tiers) = $0.0000972/GB-h | https://docs.tensorlake.ai/sandboxes/lifecycle, /pricing |
| 10 | Ephemeral (unnamed) sandboxes | Default. Cannot suspend | Terminated on idle timeout. No storage after that | $0 | https://docs.tensorlake.ai/sandboxes/lifecycle |
| 11 | Terminated, restart window | 48 h after termination (restores from latest snapshot if any) | Billing during the window **not documented** | null | https://docs.tensorlake.ai/sandboxes/lifecycle |
| 12 | Snapshot artifacts (filesystem / memory) and `copy -n N` clones | Snapshots used to create new sandboxes or clones | Docs give **no price**. The pricing page only prices snapshot storage "while suspended". Presumably the same $0.07/GB-month | null (assume 0.07) | https://docs.tensorlake.ai/sandboxes/snapshots |
| 13 | Warm pools | `warm_containers` buffer per pool | Pre-booted idle containers. **Billing undocumented**. Likely RAM + disk while warm, since CPU is idle | null | https://docs.tensorlake.ai/sandboxes/pools |
| 14 | Egress | Any | **Free** ("Network egress is free") | $0 | https://www.tensorlake.ai/pricing |
| 15 | EU region | `api.eu.tensorlake.ai` | Same API key. **No price difference published** | multiplier 1 | https://docs.tensorlake.ai/platform/eu-data-residency |
| 16 | Rounding | Always | Measured per second, usage pooled per org, **whole CUs** ($0.01) billed | ≤ $0.01 per org per bill | /pricing, /docs/platform/billing |
| 17 | Plan switching | Credits ↔ Pro | Unused credits are retained (not refunded) and return if you go back. Going back to Credits **requires buying a new pack**. Pro CU rollover is not stated (assume none) | | /pricing FAQ |
| 18 | Cloud Volumes, managed Git, GitHub Actions runners, Document AI | Adjacent products | Not on the sandbox rate card. Document AI draws from the same credit pool | null | https://docs.tensorlake.ai/filesystems/introduction |
## Gotchas
1. **CPU is cheap, RAM is the bill.** On Pro, 8 GB RAM ($0.072/h) costs more than 4 fully busy cores × 30% ($0.050/h). RAM must be 1-8 GB per vCPU, so you cannot drop RAM below 1 GB/vCPU.
2. **Two rate cards, 40% apart.** The Pro rate set only applies on Pro. The $250 fee is fully spendable, so Pro wins once monthly usage at *Credits* rates exceeds ≈ $417 (250 / 0.6). The calculator's own break-even message is "≈ 5,661 sessions of 25 min, 2 vCPU/4 GB".
3. **Usage Credits is a hard cap, not a budget alert.** Hit zero and running sandboxes are **stopped**. Auto-refill is opt-in.
4. **Session limits are idle limits.** The "2 h / 24 h / unlimited" plan caps are the maximum `timeout_secs` idle threshold, not wall-clock lifetimes (the pricing page calls them "per sandbox session").
5. **Only named sandboxes suspend.** Ephemeral ones are terminated on idle, so their state is lost (48 h restart window aside).
6. **The fallback clause.** If active metering is "unavailable or untrustworthy", CPU reverts to allocated. That makes CPU 3.3× costlier at 30% util, and you can't predict when it happens.
7. **Snapshot storage at $0.07/GB-month** is on the high side, and it uses a fixed 30-day month (≈ 1.4% more than per-730 h). It is charged at the same rate on both tiers.
8. **Usage Credits caps a sandbox at 4 vCPU / 16 GB.** Larger needs Pro.
9. **BYOC is a %-of-cloud-bill fee**, so it scales with your AWS instance prices. At the entry 30% CPU rate the fee plus AWS may exceed managed Pro unless you pack densely.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU util, 50 GiB snapshots retained, 100 GiB egress.
Assumptions:
- Disk is 10 GB per sandbox = 88,000 GB-h.
- Active core-h = 8,800 × 4 × 0.3 = 10,560. RAM GB-h = 70,400.
- The 50 GiB snapshot is billed at $0.07/GB-month = $3.50.
- Egress is free.
- 50 concurrent fits Usage Credits (100) and Pro (1,000). 8 h sessions need idle timeouts ≤ 24 h, which is OK on both.
| Regime | Active CPU | RAM | Disk | Snapshots | Egress | Plan fee | **Monthly total** |
|---|---|---|---|---|---|---|---|
| Usage Credits, active metering | 10,560 × 0.07 = $739.20 | 70,400 × 0.015 = $1,056.00 | $17.60 | $3.50 | $0 | $0 (prepaid ≈ 91 × $20 packs) | **$1,816.30** |
| **Pro, active metering** | 10,560 × 0.042 = $443.52 | 70,400 × 0.009 = $633.60 | $8.80 | $3.50 | $0 | $250 credit consumed | **$1,089.42** (= $250 + $839.42 overage) |
| Pro, allocated-CPU fallback | 35,200 × 0.042 = $1,478.40 | $633.60 | $8.80 | $3.50 | $0 | credit | **$2,124.30** |
| Usage Credits, allocated fallback | 35,200 × 0.07 = $2,464.00 | $1,056.00 | $17.60 | $3.50 | $0 | | **$3,541.10** |
| Idle-tail add-on (default 10 min idle per sandbox-day = 183.3 h) | ≈ $0 | | | | | | Pro +$13.38; Credits +$22.37 |
| Free | n/a (1 concurrent, 1 vCPU / 1 GB) | | | | | | n/a |
| Enterprise | custom | | | | | | null |
| BYOC, illustrative (blog's i7i.metal-24xl $9.06/h, 176 h) | 1 host, packed (60 active vCPU, 400 GiB fits 96/768): $1,594.56 AWS | | | | AWS egress extra | fee 30% / 10% | **$2,072.93 / $1,754.02** + EBS/egress |
| BYOC, no overcommit (200 vCPU → 3 hosts) | $4,783.68 AWS | | | | | fee 30% / 10% | **$6,218.78 / $5,262.05** |
- Pro is cheapest here: $1,089.42, which works out to about $0.124 per sandbox-hour.
- The 30% utilisation cuts the Pro CPU line by 70%.
- RAM is 58% of the Pro bill.
- BYOC rows are illustrative only. They depend on your instance choice, overcommit and AWS pricing, and exclude EBS and AWS egress.
Sources: https://www.tensorlake.ai/pricing · https://docs.tensorlake.ai/platform/billing · https://docs.tensorlake.ai/sandboxes/lifecycle · https://docs.tensorlake.ai/sandboxes/snapshots · https://docs.tensorlake.ai/sandboxes/pools · https://docs.tensorlake.ai/platform/eu-data-residency · https://docs.tensorlake.ai/platform/self-hosted-compute/aws · https://www.tensorlake.ai/blog/introducing-tensorlake-byoc