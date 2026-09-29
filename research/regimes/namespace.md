# Namespace — pricing regimes (as of 2026-09-28)
Namespace (namespace.so) sells two separately metered compute products on its own hardware (AMD EPYC, AmpereOne,
Apple M4 Pro / M5 Max):
1. **Compute instances** (GitHub runners, `nsc` instances, remote builders) metered in **unit-minutes**:
   1 unit = 1 vCPU + 2 GB RAM for 1 minute × platform multiplier (Linux 1, Windows 2, Linux on Apple Silicon 7, macOS 10).
   Plans (Team/Business) prepay a bucket of unit-minutes at $0.001; everything else is $0.0015 (Developer PAYG and overage).
2. **Devboxes** (persistent dev environments for humans/agents) metered in **Devbox Minutes** at $0.004 each, plus
   persistent storage $0.20/GB-month *used*. Devbox usage is **not** covered by plan unit-minutes.
and https://namespace.so/docs/architecture/compute/resource-limits.md.
4 vCPU / 8 GB Linux instance = 4 units: **$0.36/h** PAYG/overage, **$0.24/h** inside a plan's prepaid bucket.
Devbox S (boost to 4 vCPU / 8 GB) = 1 Devbox Minute/min = **$0.24/h**.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Developer (PAYG) | Default, no card; 30-day free trial of the plan | No fee; every unit-minute at overage rate | $0.0015/unit-min ($0.09/unit-h); max instance 3 h; Linux concurrency 32 vCPU / 64 GB; macOS 12 vCPU / 28 GB; **no Windows**; Docker builds $0.05 each | pricing, resource-limits |
| Team | $100/mo | Fee buys 100,000 unit-min (= $0.001/unit-min); overage $0.0015. Fee is *not* general credit: unused minutes do not carry over (no rollover documented) and do not cover Devboxes | $100; 100k unit-min; 1,000 Docker builds (+$10/1,000); max 5 h; Linux 64 vCPU/128 GB, macOS 24/56, Windows 32/64; 5,000 GB-h cache snapshots + 3,000 GB-day cache storage free | pricing, resource-limits |
| Business | $250/mo | 250,000 unit-min prepaid, overage $0.0015 | $250; max 24 h; Linux 160 vCPU/320 GB, macOS 48/112, Windows 80/160; 2,500 builds; 15,000 GB-h snapshots + 9,000 GB-day storage free; high-memory (>64 GB) shapes | pricing, resource-limits |
| Enterprise | Contact sales | Custom included minutes, volume discount, custom concurrency; region-exclusive data residency, SSO, dedicated egress pools | null | pricing, docs/workspaces/data-residency |
| Linux amd64/arm64 instance | Standard shapes 1x2 … 64x512 | units = max(vCPU, GB/2) × 1 per minute | 1x2 $0.09/h … 32x512 $23.04/h PAYG | pricing |
| **64-vCPU premium** | 64x128, 64x256, 64x512 | Table charges 80/160/320 units, i.e. **1.25× the max(vCPU, GB/2) formula** | 64x128 $7.20/h PAYG vs 2×32x64 = $5.76/h | pricing (shape table) |
| Windows instance | Team+ only | Linux units × 2 | 4x8 = 8 units = $0.72/h PAYG, $0.48/h prepaid | pricing |
| macOS instance | Apple M4 Pro / M5 Max, 4x7 … 16x56 | Table units (× 10 multiplier); **does not follow max(vCPU, GB/2)** (6x28 = 75 units, 6x14 = 60) | 4x7 $3.60/h, 6x14 $5.40/h, 12x28 $10.80/h, 16x56 $18.00/h PAYG (prepaid ×2/3) | pricing |
| Linux on Apple Silicon (early access) | Contact support to enable; shapes "may differ" | units × 7 | 6x14 $4.41/h, 12x28 $8.82/h, 12x56 $17.64/h PAYG | pricing |
| Rounding / minimum | All instances | Min 1 minute; then the next 15 s round down (30 s→1 min, 70 s→1, 150 s→3) | 60 s minimum | pricing FAQ |
| Linux Devbox | Devbox product, any plan | $0.004/Devbox-Minute × size factor per minute running; burstable ("max vCPU it can boost to") | S 4/8 $0.24/h, M 8/16 $0.48/h, L 16/32 $0.96/h, XL 32/64 $1.92/h | pricing, billing-and-limits |
| macOS Devbox | Devbox product | 15 / 30 Devbox Minutes per minute | M 6/14 $3.60/h, L 12/28 $7.20/h | pricing |
| Devbox idle tail | Running devbox with no SSH/session/task | Keeps billing until idle auto-stop | default 15 min; presets 15 m/30 m/1 h/4 h/8 h or custom | pricing FAQ, docs/devbox/creating |
| Devbox stopped | `stop` or idle | Compute $0; persistent storage keeps billing | $0.20/GB-month on **used** bytes (not provisioned) | pricing |
| Ephemeral Devbox | `ephemeral` flag | Instance + storage deleted on stop; no storage bill after | $0 after stop | docs/devbox/creating |
| Custom Devbox plan | Sales | Included Devbox usage at a volume discount | null | pricing FAQ |
| Cache volumes | Attached to instances | Storage $0.0048/GB-day (~$0.146/GB-mo) + "snapshot" $0.002/GB-h × volume size × instance runtime; storage accounted in 100 GB blocks | free allowances Team/Business above | pricing |
| Registry / Turborepo / GitHub Artifacts / Gradle / Bazel CAS | Storage products | $0.20/GB-month | — | pricing |
| Bazel | Cache hits / RBE | $0.10 per 1,000 hits; RBE per minute; traffic above max(100 GB, 2 GB per 1k AC hits) $100/TB | — | pricing |
| Regions | Sites (e.g. `iad`); nearest by default | No regional multiplier published; region-exclusive residency Enterprise-only | multiplier 1 (assumed) | docs/devbox/creating, data-residency |
| Egress / IPv4 | General instance/devbox traffic | Not published (only Bazel traffic priced); no public IPv4 (HTTPS/TCP ingress via Namespace) | null | — |
| Seats | All plans | "No charge for users or seats" | $0 | billing-and-limits |
Dated changes: none found (PriceTrack reports no recorded changes; changelog has no pricing entries).
## Gotchas
1. **Two meters, one bill.** Plan fees only prepay *instance* unit-minutes. A Team plan does nothing for Devbox spend.
2. **Plan fee = prepaid minutes at a 33% discount, not credit.** Effective Team deal: $100 buys $150 of PAYG usage.
   Below ~66,700 unit-min/month Developer PAYG is cheaper; above it Team wins.
3. **Concurrency is a vCPU/RAM budget, not a sandbox count.** Developer can run only eight 4x8 instances at once;
   Business 40. Windows is not available on Developer at all.
4. **Max instance duration 3 h / 5 h / 24 h** — CI-shaped. Long-lived agent sessions belong on Devboxes.
5. **Non-standard ratios pay for RAM**: 8x32 costs 16 units (same as 16x32). 64-vCPU shapes carry a hidden 1.25× premium.
6. **macOS is expensive but Devbox macOS M ($3.60/h) = macOS 6x14 instance at prepaid rate**; on PAYG the instance costs $5.40/h.
7. **Devbox vCPU is a burst ceiling**, so the per-vCPU list price ($0.06/vCPU-h for S) is not guaranteed sustained capacity.
8. Devbox storage bills on **used** GB, but instance cache volumes bill by *volume size × runtime* (GB-h) — a large, mostly
   empty cache volume still costs.
9. Egress is unpublished; treat as unknown.
## Worked example
Workload: 4 vCPU / 8 GiB Linux, 50 concurrent × 8 h/day × 22 days = 8,800 h, 30% CPU, 50 GiB retained state, 100 GiB egress.
- **Instances**: 8,800 h × 4 units × 60 = 2,112,000 unit-min. But 50 × 4 = 200 vCPU > Business cap (160 vCPU) and 8 h > Team
  (5 h) / Developer (3 h) max duration. Only **Enterprise** fits (price unpublished). At list rates it would be
  Business-style $250 + (2,112,000 − 250,000) × $0.0015 = **$3,043** (hypothetical, ignoring caps); pure PAYG $3,168.
  Instances are ephemeral, so "50 GiB snapshots" would have to be cache volumes (not comparable).
- **Devbox S** (4 vCPU burst / 8 GB): 8,800 h × $0.24 = $2,112 + idle tail (default 15 min × 1,100 sessions = 275 h ×
  $0.24 = $66) + storage 50 GB × $0.20 = $10 → **≈ $2,188/month**, no plan fee needed (Developer). CPU utilisation does
  not matter (billed per running minute). Egress unknown (null). Devbox concurrency limits unpublished.
- 30% CPU changes nothing in either product.