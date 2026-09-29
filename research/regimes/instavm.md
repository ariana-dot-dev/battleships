# InstaVM — pricing regimes (as of 2026-09-28)
InstaVM sells Firecracker microVMs with one per-second rate card that is **identical to E2B's** ($0.000014/vCPU-s,
$0.0000045/GB-s), billed on allocated vCPU and RAM while a VM runs. Regimes differ only by plan (fee that is **not**
credit, concurrency, egress policy, browser-session quota, SLA) and by lifecycle: there is no pause — a VM lives
until its `vm_lifetime_seconds` expires or it is deleted, and only snapshots / volumes survive.
Rates: vCPU **$0.0504/h**, RAM **$0.0162/GB-h** (page shows "~$0.05/hr" and "~$0.02/hr" rounded).
4 vCPU / 8 GB = 0.2016 + 0.1296 = **$0.3312/h**. Volumes: $0.0002/GB-h = **$0.146/GB-month** after 10 GB included.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | Default, no card | $0 base + pay-as-you-go from a starting credit | $50 free credits "to start" (one-time); 5 concurrent VMs; 100 browser sessions/mo; egress only to known package managers + AI APIs; best-effort SLA; 10 GB volumes included | https://instavm.io/pricing |
| Pro | >5 concurrent, open egress, SLA | **$100/mo base fee, not credit** + the same per-second usage | 100 concurrent VMs; 5,000 browser sessions/mo; unrestricted egress or domain/CIDR allowlists; 99.9% SLA; 24 h support; 10 GB volumes included | https://instavm.io/pricing |
| Enterprise | Unlimited concurrency, 99.99% SLA | Custom (contact) | null | https://instavm.io/pricing |
| Running VM | From create until lifetime expiry / delete | Allocated vCPU + allocated RAM per second, regardless of utilisation | $0.0504/vCPU-h + $0.0162/GB-h; 1–8 vCPU, 256 MB–8 GB (default 2 vCPU / 512 MB) | https://instavm.io/pricing, https://instavm.io/docs/concepts/sandboxes |
| Lifetime expiry | `vm_lifetime_seconds` reached | VM terminated, **all state lost**, billing stops (unless `snapshot_on_terminate`) | default/max lifetime unpublished | https://instavm.io/docs/concepts/sessions, https://instavm.io/docs/sdks/python/vm-management |
| Clone | `clone` of a running VM | New VM, billed at full running rate | same rates | https://instavm.io/docs/sdks/python/vm-management |
| Snapshots (disk state) | `snapshot`, `snapshot_on_terminate`, OCI-image snapshots | Storage billing **not published**; likely the allocated-volume meter (unverified) | null; OCI snapshot build: 1–8 vCPU, 128–8192 MB, 1–3 GB disk | https://instavm.io/docs/concepts/snapshots |
| Volumes | Persistent storage mounted into VMs (launched 2026-05-29) | **Allocated** GB-hours (quota, not bytes used) beyond 10 GB | $0.0002/GB-h = $0.146/GB-mo | https://instavm.io/pricing, https://instavm.io/blog/introducing-volumes-on-instavm-sandboxes |
| Browser sessions | Browser automation API | Monthly quota per plan; overage price unpublished | 100 Free / 5,000 Pro / unlimited Enterprise | https://instavm.io/pricing |
| Shares / custom domains / SSH | Expose ports publicly or privately, CNAME custom domains | Not separately priced | $0 (unpublished) | https://instavm.io/docs/concepts/shares |
| Egress | All outbound | Policy differs by plan; no per-GB price published | null | https://instavm.io/pricing |
No dated price changes found.
## Gotchas
1. **Pro's $100 is a pure platform fee**; it buys concurrency (5→100), open egress and SLA, not usage.
2. **No pause.** Stopping = terminating; a VM left alive is billed on full allocation even when idle. State survives only via snapshot/volume.
3. **Free egress is allowlist-only** (package managers + AI APIs), so arbitrary web access needs Pro.
4. **Volumes bill on allocated quota**, not used bytes: a 50 GiB quota volume costs 40 × $0.146 = $5.84/mo even if empty.
5. **Max 8 vCPU / 8 GB per VM** — 1 GB/vCPU at the top end; no GPU mentioned.
6. Rates quoted "per GB" (RAM, storage); treated as GiB.
7. Browser-session overage, snapshot storage, egress and lifetime limits are unpublished.
## Worked example
4 vCPU / 8 GB, 50 concurrent × 8 h/day × 22 days = **8,800 VM-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress.
VMs snapshot on terminate at end of shift, re-created from snapshot next day.
- Compute: 8,800 × $0.3312 = **$2,914.56** (allocation billing: 30% CPU changes nothing).
- Snapshots: price unpublished; if billed like volumes, (50 − 10) × $0.146 = $5.84.
- Egress: unpublished (assumed $0).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free | No (5 concurrent, restricted egress) | $50 credit ≈ 151 VM-hours |
| Pro | Yes (50 ≤ 100) | $100 + $2,914.56 + ~$5.84 = **≈ $3,020.40** |
| Enterprise | Yes | unpublished |
| Anti-pattern: VMs left alive 24 h/day | Yes | $100 + 50 × 24 × 22 × 0.3312 = **$8,843.68** |