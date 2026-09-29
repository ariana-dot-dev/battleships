# Verify: Cloudflare Sandbox SDK / Containers (2026-09-28)
Sources re-fetched: https://developers.cloudflare.com/containers/pricing/, https://developers.cloudflare.com/containers/platform-details/limits/, https://developers.cloudflare.com/sandbox/platform/pricing/.
## Card (cards/cloudflare-sandbox.json)
| Item | Result |
|---|---|
| CPU $0.000020/vCPU-s -> $0.072/h, active usage only | confirmed |
| Memory $0.0000025/GiB-s -> $0.009/GiB-h, provisioned | confirmed |
| Disk $0.00000007/GB-s -> $0.000252/GB-h, provisioned | confirmed |
| Included on Workers Paid: 375 vCPU-min, 25 GiB-h, 200 GB-h (= $0.7254 as included_usd) | confirmed arithmetic (0.45 + 0.225 + 0.0504) |
| Workers Paid $5/mo, not a credit (fee_is_credit false) | confirmed |
| Workers Free: Containers N/A (concurrency 0, so the engine excludes it) | confirmed |
| Egress NA/EU 1 TB then $0.025; OC/KR/TW 500 GB then $0.05; elsewhere 500 GB then $0.04 | confirmed |
| Instance types lite ... standard-4 (4 vCPU / 12 GiB / 20 GB) | confirmed |
| Custom: 1-4 vCPU, >= 3 GiB/vCPU, <= 12 GiB, <= 20 GB, <= 2 GB disk per GiB | confirmed (ram_per_vcpu [3, null], max 4 / 12) |
| Account caps 1,500 vCPU / 6 TiB / 30 TB; 50 GB image storage | confirmed; not modelled (caveat) |
| DO, Worker and Logs billed separately | confirmed (sandbox pricing page); amounts not modelled (caveat) |
| **storage.included_disk_gib 20** | **Corrected** 20 -> 0 and disk_gib_month null -> 0.18396 ($0.000252/GB-h x 730). The engine was treating 20 GB of provisioned disk as free, but Cloudflare bills it per GB-s while running. With disk_billed_when_stopped=false, the engine now bills requested disk x running hours, which matches |
| snapshot_gib_month 0.015 (R2 Standard) | confirmed. **Added** snapshot_free_gib_account 10 (R2's 10 GB-month free tier) |
| R2 ops / backup TTL / private-beta snapshots | not re-fetched (unverifiable today) |
## Regimes (regimes/cloudflare-sandbox.md)
Arithmetic checked: A $1,759.95; B $3,534.03; D $1,434.28; DO +$45.69; idle tail +$20.72; keepAlive $7,283.84; preset hourlies 0.00725 / 0.028 / 0.074 / 0.129 / 0.220 / 0.401.
**Corrected** gotcha 3: "Active billing only wins below roughly 60-70%" -> about 75% (standard-4 at 0.288·u + 0.113 equals E2B's $0.3312 at u ≈ 0.76).
**Corrected** gotcha 10: "Egress triples outside NA/EU" -> "doubles" ($0.05 vs $0.025).