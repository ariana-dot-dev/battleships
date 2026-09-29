# Arker — pricing regimes (as of 2026-09-28)
Arker (arker.ai) sells hyper-elastic VMs through a fork/run/sync API on its own hypervisor, placed on AWS, GCP or
Arker bare metal. **There is no public rate card.** arker.ai/pricing redirects to a login-gated console page. The only
public numbers are in the docs' "Replicas capacity planning" table: 1,000 always-on VMs × 730 h, in two shapes (small
2 vCPU / 8 GiB / 32 GiB and large 4 vCPU / 16 GiB / 32 GiB). Each has a 1-month (on-demand) price and 12/24/36-month
commitment prices. Arker says it charges for **run time, not machine time**: VMs scale to zero between runs and
policies can suspend them while waiting on LLM responses. The exact metering rule is not published.
Derived on-demand (AWS US): small **$0.1877/h**, large **$0.3720/h** (table ÷ 1,000 ÷ 730). No public 4/8 shape, so a
4 vCPU / 8 GiB workload is priced on "large".
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| On-demand, AWS US (1-month column) | Default self-serve account; no free tier | "Run time" of VMs; exact unit/granularity behind login | small $137,047 / large $271,572 per 1,000 VMs per month → $0.18774 / $0.37202 per VM-h | https://arker.ai/docs/pricing |
| Commit 12 months (pool) | Reserved capacity term; private access | Prepaid on next invoice, whole term, cannot be deleted | 19.55% off: $110,259 / $218,488 per 1,000/mo → $110.26 / $218.49 per VM-month | https://arker.ai/docs/pricing, https://arker.ai/docs/api/pools.md |
| Commit 24 months (pool) | same | same (AWS has no 2-y plan; "procurement ladder") | 22.83% off: $105,756 / $209,565 | same |
| Commit 36 months (pool) | same | same | 48.56% off: $70,504 / $139,710 | same |
| Commit formula | Any term 1–36 months | price × (1 − D(x)), x = (months − 1)/35 | AWS D = 1.754933379x³ − 2.505391256x² + 1.236007877x; Hetzner-EU D = 0.08593592x³ − 0.13996941x² + 0.13095657x; Scaleway-EU D = 0.040349144x³ − 0.079545455x² + 0.339196311x | https://arker.ai/docs/pricing |
| Pools (API) | Orgs with pools enabled (private access for partnered background-agent companies) | Quote → buy at `amount_cents`; min term 30 days; VMs placed via `pool_id`; after `ends_at`, VMs keep running at normal rates | Example quote: aws us-west, 32 vCPU / 64 GiB / 256 GiB, 30 days = $1,428 (illustrative) | https://arker.ai/docs/api/pools.md |
| Proposed EU on Hetzner | **Not offered**, proposed prices | Same table model | $22,074 / $51,556 per 1,000/mo (1 mo) → $0.0302 / $0.0706 per VM-h; 36 mo $20,376 / $47,591 | https://arker.ai/docs/pricing |
| Proposed EU on Scaleway | **Not offered** | Same | $22,603 / $45,205 (1 mo) → $0.0310 / $0.0619 per VM-h; 36 mo $15,822 / $31,644 | same |
| Suspend / scale-to-zero | VM idle between runs; `scaling: {suspend: true}` policy suspends while outbound response pending or between inbound requests | "Charge for run time, not machine time"; memory+disk persisted to NVMe then object storage | Retention/storage price unpublished | https://arker.ai/docs/pricing, https://arker.ai/docs/api/policies.md |
| Storage / filesystems | Persistent disk, object-storage filesystems | "Prices exclude persistent storage" | unpublished | https://arker.ai/docs/pricing |
| Private regions (VPC / on-prem), private networking | Contact sales | Control plane in cloud, customer compute | unpublished | https://arker.ai/docs/deployment.md |
| GPU (A100 40/80, H100, H200; fractional 0.125) | arker us-west, gcp us-central1 | unpublished | null | https://arker.ai/docs/regions.md |
| Free tier | — | None ("we don't currently offer a free tier") | $0 credit | https://arker.ai/docs/deployment.md |
Dated changes: Pools and AWS eu-north-1 region (Sep 2026); run/fork queueing (Aug 2026); egress and auto-scaling
policies (Jul 2026). The "public on-demand list prices as of 2026-06-11" comparison on the docs page covers competitors, not Arker.
## Gotchas
1. **No public list price.** Every Arker number here comes from a capacity-planning example. It may not match what the console quotes.
2. **Only two shapes are publicly priced**, and both are RAM-heavy (4 GiB/vCPU). A 4/8 workload pays for 16 GiB. Implied unit rates from the table plus the pools example (~$0.030/vCPU-h, ~$0.0155/GiB-h, ~$0.000108/GiB-h disk → 4/8 ≈ $0.244/h) are fragile back-solves.
3. **"Run time, not machine time"** is the headline differentiator, but the metering rule is not public: what counts as run time, and whether suspended VMs pay for memory/disk. Suspending during LLM waits could cut agent bills a lot. It could also be marketing.
4. **Commitments are prepaid pools that cannot be deleted.** They pay off only if VMs run close to 24/7. At 24% duty (8 h × 22 d), even the 36-month price is ~2x on-demand.
5. **The cheap EU rows are "proposed", not offered.** They are ~5x cheaper than AWS US.
6. The docs' competitor table puts boat.dev at $0.036/h for 4 shared vCPU / 8 GB. That is a competitor claim; boat.dev's own pages are the authority.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 VM-hours**, 30% CPU, 50 GiB snapshots,
100 GiB egress. Priced on the "large" preset (4 vCPU / 16 GiB), the smallest public shape with 4 vCPU.
| Regime | Feasible? | Monthly total |
|---|---|---|
| On-demand AWS US, billed wall-clock | Yes (no published concurrency cap) | 8,800 × $0.372016 = **$3,273.74** + storage/egress (unpublished) |
| On-demand, VMs suspended 50% of session (run-time billing) | If the workload idles and suspend policies apply | $1,636.87 + unpublished retention cost |
| Derived unit rates (4/8 exactly, ~$0.244/h) | Speculative | ~$2,151 |
| 12-month pool, 50 large always-on | Private access | 50 × $218.488 = $10,924.40 |
| 36-month pool, 50 large always-on | Private access | 50 × $139.71 = $6,985.50 |
| Proposed EU Hetzner (not offered) | No | would be 8,800 × $0.070625 = $621.50 |
| Proposed EU Scaleway (not offered) | No | would be 8,800 × $0.061925 = $544.94 |
Snapshots (50 GiB) and egress (100 GiB): price not published, so excluded.