# Render — pricing regimes (as of 2026-09-28)
Render bills three things: a flat **workspace plan** fee, **compute** (fixed plans with a monthly list price,
prorated to the second while an instance runs), and **metered extras** (outbound bandwidth over the plan allowance,
disks, pipeline minutes, domains). Same prices in all 5 regions (Oregon, Ohio, Virginia, Frankfurt, Singapore).
Paid services never auto-stop, so "per second" only helps if you suspend/scale down yourself. The sandbox-like
product (Render Sandboxes) is early access with **no published price**.
third-party sources used).
4c-8g (4 CPU / 8 GB) = $175/month ≈ **$0.2397/h** (175/730; Render doesn't state the proration month length).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Hobby workspace | Default | No fee | $0; 1 seat; max 25 services; 5 GB bandwidth; 500 pipeline min; 2 domains; no autoscaling | https://render.com/pricing |
| Pro workspace | Teams / production | Flat per workspace (not per seat) + compute; waived in a month with no services and no activity | $25/mo; unlimited seats & services; 25 GB bandwidth; 1K pipeline min; 15 domains | https://render.com/pricing |
| Scale workspace | Governance / HIPAA / SSO | Flat + compute | $499/mo; 1 TB bandwidth; 5K pipeline min; multiple workspaces; SAML/SCIM | https://render.com/pricing |
| Enterprise | SLAs, TAM | Custom | null | https://render.com/pricing |
| Service compute (web, private, worker) | Any paid instance | Monthly price prorated per second while running; each instance of a scaled service and each preview instance billed; suspended = not billed | 0.5c-512mb $7, 1c-2g $25, 2c-4g $85, 2c-8g $135, 2c-16g $200, 4c-8g $175, 4c-16g $225, 4c-32g $350, 8c-16g $300, 8c-32g $450, 8c-64g $1,000, 12c-24g $450, 12c-48g $800, 12c-96g $1,500 per month | https://render.com/pricing, https://render.com/docs/compute-plans, https://render.com/docs/faq |
| Always-on service | Instance runs all month | Capped at the monthly list price (hourly proration × 730) | = list prices above | https://render.com/pricing |
| Free instance | Web services (and free Postgres/Key Value) | $0; 750 instance-hours/workspace/month; spins down after 15 min without inbound traffic (~1 min spin-up); all free web services suspended when hours run out | 0.1 CPU / 512 MB; no disk; free Postgres expires after 30 days | https://render.com/docs/free |
| Cron job | Scheduled command | Per-minute price, prorated per second while running | $0.00016/min (0.5c) … $0.00405/min (4c-8g = $0.243/h) … $0.02315/min (8c-64g) | https://render.com/pricing |
| Workflows, fixed plans | Durable task runs | Per second while running; default 2 h timeout, up to 24 h | 2c-4g $0.40/h, 2c-8g $0.70/h, 4c-8g $1.00/h, 4c-16g $1.50/h, 8c-32g $2.50/h | https://render.com/docs/workflows-limits |
| Workflows, flex (default) | Task runs ≤ 1 CPU / 4 GB | Actual CPU time + sampled RAM | $0.20/CPU-h + $0.05/GB-h (max $0.40/h); min charge = 1 s at 0.1 CPU/0.1 GB | https://render.com/docs/workflows-limits |
| Workflow concurrency | Concurrent task runs | Included per plan + add-on | 20 Hobby / 50 Pro / 100 Scale; +$10/mo per 50 | https://render.com/pricing |
| Workflow task state | Inputs/return values retained 30 days | Billed once per run | $0.25/GB | https://render.com/docs/workflows-limits |
| Render Sandboxes | Early access, select workspaces by request | **Unpublished** | EA limits: 2 CPU / 4 GB / 10 GB per sandbox, 100 concurrent, 24 h timeout, Oregon only; filesystem or runtime (memory) snapshots, expire after 3 days | https://render.com/docs/sandboxes |
| Persistent disk | Attached SSD | Per GB-month of provisioned size; daily snapshots (≥ 7 days) no separate charge published | $0.25/GB-mo | https://render.com/pricing, https://render.com/docs/disks |
| Outbound bandwidth | Traffic to outside Render | Over plan allowance; unused doesn't roll over; no card → services suspended | $0.15/GB public; $0.03/GB via private link; inbound/private-network/same-region S3-GCS free | https://render.com/docs/outbound-bandwidth |
| Dedicated outbound IPs | Pro+ | Monthly | $100/mo per IP set | https://render.com/pricing |
| AWS PrivateLink | Pro+ | Monthly | $30/mo for up to 3 links + $0.03/GB | https://render.com/pricing |
| Build pipeline | Builds + pre-deploy | Over plan allowance | $5/1K min standard; $25/1K min performance (no allowance); spend limit available | https://render.com/pricing, https://render.com/docs/faq |
| HIPAA-enabled workspace | Scale+ with BAA; irreversible | +20% on all usage (compute, storage, …); no Singapore | ×1.2 | https://render.com/docs/hipaa-compliance |
| Credits | Startups / migrations | Application-based | up to $100K (startups), up to $10K (migration) | https://render.com/pricing |
Dated change: Aug 2026 compute plans renamed (Starter → 0.5c-512mb, Standard → 1c-2g, Pro → 2c-4g, Pro Plus → 4c-8g,
Pro Max → 4c-16g, Pro Ultra → 8c-32g) with "no pricing changes to existing plans"; 2c-16g, 8c-64g, 12c-24g/48g/96g
added. Workflows beta starter/standard plans replaced by flex.
## Gotchas
1. **No idle auto-stop on paid compute.** Only Free web services spin down. An agent box left running bills up to the
   full monthly price; stop the meter with suspend (compute not billed while suspended) or scale to 0.
2. **Disks pin you to one instance** and force downtime on plan changes; disk GB is billed while the service exists.
3. **Plan fee is not credit** and is per workspace, not per seat (Pro $25 with unlimited seats).
4. **Bandwidth is per workspace plan** (5 GB / 25 GB / 1 TB), then $0.15/GB. Without a card on file, Render suspends
   services instead of charging.
5. **Previews and every scaled instance bill** at the full plan rate.
6. **Workflows cost ~4x services per hour** (4c-8g $1.00/h vs $0.24/h) but scale to zero; flex is cheap only for
   ≤ 1 CPU work.
7. **HIPAA is +20% on everything** and irreversible; Singapore unavailable.
8. **Sandboxes have no price** and are Oregon-only early access — can't be used for cost planning yet.
9. **Free tier is time-boxed**: 750 instance-hours per workspace per month, then all free web services suspend.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU, 50 GiB retained
state, 100 GiB egress. Modelled as 50 services on 4c-8g suspended between shifts (Render has no session API for
services; suspend/resume is your job).
Compute: 8,800 × $0.2397 = **$2,109.59** (CPU util irrelevant, allocated billing). State: 50 GiB of persistent disk ×
$0.25 = $12.50. Egress: plan-dependent.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Hobby | No: 50 services > 25-service cap (also no autoscaling) | n/a |
| Pro, suspend between shifts | Yes | $25 + $2,109.59 + $12.50 + 75 GB × $0.15 ($11.25) = **$2,158.34** |
| Scale | Yes | $499 + $2,109.59 + $12.50 + $0 (1 TB incl.) = $2,621.09 |
| Scale + HIPAA (+20% on usage) | Yes | $499 + 1.2 × ($2,109.59 + $12.50) = $3,045.51 (bandwidth within 1 TB) |
| Pro, never suspended (always on) | Yes | $25 + 50 × $175 + $12.50 + $11.25 = **$8,798.75** |
| Cron 4c-8g (batch alternative) | Only for batch commands | $25 + 8,800 × $0.243 = $2,163.40 + extras |
| Workflows 4c-8g fixed | Batch tasks, ≤ 24 h runs | $25 + 8,800 × $1.00 = $8,825 + extras |
| Workflows flex | No: max 1 CPU / 4 GB | n/a |
| Sandboxes (EA) | No: 2 CPU / 4 GB limit, price unpublished | unknown |