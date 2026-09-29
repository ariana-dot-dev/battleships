# Verify: Daytona (2026-09-28)
Sources re-fetched: https://www.daytona.io/pricing, https://www.daytona.io/docs/en/billing, https://www.daytona.io/docs/en/limits, https://www.daytona.io/docs/en/sandboxes.md, plus a web search for the on-demand GPU prices.
## Card (cards/daytona.json)
| Item | Result |
|---|---|
| vCPU $0.0504/h, memory $0.0162/GiB-h | confirmed |
| Disk $0.000108/GiB-h after 5 GiB free -> $0.07884/GiB-month | confirmed. Whether the 5 GiB is per sandbox or per org is unverifiable (the page says only "after first 5 free") |
| disk_billed_when_stopped true; paused disk only; archived $0 | confirmed (billing state table) |
| Transitional states billed as Started | confirmed |
| Snapshot storage "remain billed" at an unpublished rate (null) | confirmed |
| $200 free credit, not usable on GPU | confirmed |
| Windows $0.0858/vCPU/h | the number is confirmed. The replace-vs-add reading is unverifiable: the page lists it as a separate "OS, Windows" line, which leans towards an additive surcharge. Card keeps reading A and has a caveat |
| Spot GPU B300 4.08, B200 3.59, MI355X 3.44, H200 2.61, H100 2.27, RTX PRO 6000 1.74, RTX 5090 0.74, RTX 4090 0.57 | confirmed (pricing page, preemptible column) |
| On-demand GPU B300 6.25, H100 3.95, ... | unverifiable in the static page (only the preemptible column rendered); corroborated by search snippets and third parties. Caveat added |
| GPU: up to 8 GPUs, 16 vCPU / 192 GB / 512 GB per GPU, ephemeral, spot not counted in quota | confirmed (sandboxes docs) |
| Per-sandbox max 4 vCPU / 8 GiB / 10 GiB; default 1/1/3 | confirmed |
| Tier pools 10/10/30, 100/200/300, 250/500/2000, 500/1000/5000; top-ups $25 / $500 / $2,000 every 30 days | confirmed. **Corrected** the Tier 1 note "10 GiB [limits table says 20]" -> 10 GiB (the limits page shows 10 GiB) |
| Creates/min 300/400/500/600 | confirmed; caveat added that the engine does not model them |
| Engine interpretation of tiers | **Caveat added**: the engine ignores pool_* keys and every tier has concurrency null, so it always picks a $0 tier. The Tier 4 $2k/30-day floor (>250 vCPU concurrent) and the Tier 1-2 egress restriction are not enforced |
| Startups "up to $50k" | confirmed (pricing page) |
## Regimes (regimes/daytona.md)
Arithmetic checked: $0.3312/h; disk $4.75 running and $14.96 stopped; container total $2,934.27; Windows A $0.6024/h -> $5,478.51 and B $0.804/h -> $7,252.59; idle tail +$91.08 / +$364.32.
**Corrected** row 15: "10 or 20 GiB (docs disagree)" -> "10 GiB" (limits page).