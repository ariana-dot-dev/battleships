# InstaVM — pricing regimes (as of 2026-11-08)
InstaVM sells Firecracker microVMs with one per-second rate card that is **identical to E2B's** ($0.000014/vCPU-s,
$0.0000045/GB-s), billed on allocated vCPU and RAM while a VM runs. Regimes differ by plan (fee that is **not**
credit, concurrency, egress policy, browser-session quota, SLA) and by lifecycle: a VM runs until it is suspended,
deleted or its `vm_lifetime_seconds` expires. Suspend (explicit or `auto_suspend`) keeps memory + disk and frees the
host. Expiry destroys state unless `snapshot_on_terminate`, suspend or a volume is used.
Rates: vCPU **$0.0504/h**, RAM **$0.0162/GB-h** (page shows "~$0.05/hr" and "~$0.02/hr" rounded).
4 vCPU / 8 GB = 0.2016 + 0.1296 = **$0.3312/h**. Volumes: $0.0002/GB-h = **$0.146/GB-month** after 10 GB included.
Re-checked 2026-11-08: rates and plans unchanged.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Free | Default, no card | $0 base + pay-as-you-go from a starting credit | $50 free credits "to start" (one-time); 5 concurrent VMs; 100 browser sessions/mo; egress only to known package managers + AI APIs; best-effort SLA; 10 GB volumes included | https://instavm.io/pricing |
| Pro | >5 concurrent, open egress, SLA | **$100/mo base fee, not credit** + the same per-second usage | 100 concurrent VMs; 5,000 browser sessions/mo; unrestricted egress or domain/CIDR allowlists; 99.9% SLA; 24 h support; 10 GB volumes included | https://instavm.io/pricing |
| Enterprise | Unlimited concurrency, 99.99% SLA | Custom (contact) | null | https://instavm.io/pricing |
| Running VM | From create until suspend / lifetime expiry / delete | Allocated vCPU + allocated RAM per second, regardless of utilisation | $0.0504/vCPU-h + $0.0162/GB-h; 1–8 vCPU, 256 MB–8 GB (default 2 vCPU / 512 MB) | https://instavm.io/pricing, https://instavm.io/docs/concepts/sandboxes |
| Suspended VM | `POST /v1/vms/{id}/suspend` or `auto_suspend` | Host resources freed; storage price of the suspend snapshot unpublished | resume via `auto_resume` on traffic or `POST /v1/vms/{id}/resume` (new vm_id) | https://api.instavm.io/openapi.json |
| Lifetime expiry | `vm_lifetime_seconds` reached | VM terminated, **all state lost**, billing stops (unless `snapshot_on_terminate`) | default 5 min; current create call accepts `"max"` = plan cap (values unpublished); the deprecated session endpoint states 30 days max | https://api.instavm.io/openapi.json |
| Clone | `clone` of a running VM | New VM, billed at full running rate | same rates | https://instavm.io/solutions/live-vm-clone |
| Snapshots | `snapshot`, `snapshot_on_terminate`, OCI-image snapshots | Storage billing **not published** | null | https://api.instavm.io/openapi.json |
| Volumes | Persistent storage mounted into VMs (launched 2026-05-29) | **Allocated** GB-hours (quota, not bytes used) beyond 10 GB | $0.0002/GB-h = $0.146/GB-mo | https://instavm.io/pricing, https://instavm.io/blog/introducing-volumes-on-instavm-sandboxes |
| Browser sessions | Browser automation API | Monthly quota per plan; overage price unpublished | 100 Free / 5,000 Pro / unlimited Enterprise | https://instavm.io/pricing |
| Shares / custom domains / SSH | Expose ports publicly or privately, CNAME custom domains | Not separately priced | $0 (unpublished) | https://instavm.io/solutions/shares-deploy |
| Egress | All outbound | Policy differs by plan; no per-GB price published | null | https://instavm.io/pricing |
| Self-host (Tarit) | Your own KVM hosts | Open source (AGPL-3.0), you pay your own hosts | separate API from instavm.io | https://instavm.io/blog/introducing-tarit, https://github.com/instavm/tarit |
No dated price changes found.
## Gotchas
1. **Pro's $100 is a pure platform fee**; it buys concurrency (5→100), open egress and SLA, not usage.
2. **A VM left running bills on full allocation, even when idle.** Suspend frees the host and keeps memory + disk; it is opt-in.
3. **Free egress is allowlist-only** (package managers + AI APIs), so open web access needs Pro. A job that needs only those runs on Free with 5 VMs at once.
4. **Volumes bill on allocated quota**, not used bytes: a 50 GiB quota volume costs 40 × $0.146 = $5.84/mo even if empty.
5. **Max 8 vCPU / 8 GB per VM**, 1 GB/vCPU at the top end; no GPU mentioned.
6. Rates quoted "per GB" (RAM, storage); treated as GiB.
7. Browser-session overage, snapshot storage, egress and plan lifetime caps are unpublished.
## Worked example
4 vCPU / 8 GB, 50 concurrent × 8 h/day × 22 days = **8,800 VM-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress.
VMs suspend at end of shift and resume next day.
- Compute: 8,800 × $0.3312 = **$2,914.56** (allocation billing: 30% CPU changes nothing).
- Snapshots: price unpublished; if billed like volumes, (50 − 10) × $0.146 = $5.84.
- Egress: unpublished (assumed $0).
| Regime | Feasible? | Monthly total |
|---|---|---|
| Free | No (5 concurrent, restricted egress) | $50 credit ≈ 151 VM-hours |
| Pro | Yes (50 ≤ 100) | $100 + $2,914.56 + ~$5.84 = **≈ $3,020.40** |
| Enterprise | Yes | unpublished |
| Anti-pattern: VMs left alive 24 h/day | Yes | $100 + 50 × 24 × 22 × 0.3312 = **$8,843.68** |
