# tama — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| CPU | Running allocation | Per second | $.0117/vCPU-h+$.0055/GiB-h;1–32 CPU,1–128 GB | https://tama.computer/ |
| GPU | Live provider offers | Per second | Cards with serverless pools price per card; other offers whole node; see gpu array and saved live grid | https://tama.computer/ |
| Stopped/snapshot | Pause or snapshot | No charge | 50 GiB durable/workspace; warm memory or cold disk restoration | https://tama.computer/llms.txt |
| Whole GPU node | Multiple-card minimum | Whole-node price | A 16 minimum 2,$1.38/h; H 200 minimum 8,$43.20/h in rendered offer grid | https://tama.computer/ |
| Pay per running second | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; No published subscription fee or concurrency guarantee; current offers vary. | https://tama.computer/ |
## Gotchas
- GPU prices are live from-offers and changed between search cache and render: use renderedA 6000$.68/28 CPU/58 GB andA 100-40 GB $2.69/30 CPU/200 GB, not cached $.77/$1.89.
- Whole-node rates include multiple cards; do not multiplyH 200$43.20 by 8 again. Docs initially say checkpointing only one card, while offers list multi-card minima:capability/launch conflict requires confirmation.
- Default idle timeout is disabled;--ttl minimum 60 seconds is opt-in. Files only persist under /workspace. Warm resumes retain RAM; fork descriptions guarantee baseline disk, not all process memory.
- Homepage calculator says $20 ofcredit buys 220 hours; that is not proof of a free $20 signup grant. Network pricing, concurrency andsnapshot retention unverified.
- Storage, snapshot GiB-month and public IPv 4 prices are not published in the reviewed sources; null is not free.
## Browser and desktop dimensions
## Worked example
Requested: 4 vCPU / 8 GiB; 50 concurrent × 8 hours/day × 22 days = **8,800 runtime hours**, 1,100 eight-hour starts if recreated daily; 30% CPU; 50 GiB-month snapshots; 100 GiB egress.
CPU-only 4/8 rate $.0908/h;8,800 h costs **$799.04** before network.30%CPU does not discount allocated rates. Built-in snapshots/stopped machines are advertised free, but 50 GiBsnapshot retention and 50 concurrency entitlement need confirmation. GPU offers are separate bundles; no need for a GPU in this example.
## Sources
- https://tama.computer/
- https://tama.computer/llms.txt
- https://tama.computer/docs