# tama — pricing regimes
As of 2026-09-28. USD unless explicitly stated; public list prices unless a row is marked promotion, historical, or quote-only.
## Regime table
| Regime | When it applies | How billed | Numbers / terms | Source |
|---|---|---|---|---|
| CPU | Running allocation | Per second | $.0117/vCPU-h+$.0055/GiB-h;1–32 CPU,1–128 GB | https://tama.computer/ |
| GPU | Live provider offers | Per second | Cards with serverless pools price per card; other offers whole node; see gpu array and saved live grid | https://tama.computer/ |
| Stopped/snapshot | Stop (snapshots by default) | No charge | Stop snapshots the machine; warm restore keeps memory, cold restore keeps "files, packages and configuration"; 50 GiB disk | https://tama.computer/docs |
| Whole GPU node | 8-card nodes | Whole-node price | 2026-11-08 offers API: B200 8 cards $102.60/h; B300 8 cards $118.80/h; H200 is now one card at $6.2505/h | https://api.tama.computer/v1/offers |
| Pay per running second | Account plan | Monthly fee / commitment | $0; concurrency unpublished/custom; No published subscription fee or concurrency guarantee; current offers vary. | https://tama.computer/ |
## Gotchas
- GPU prices are live from-offers and changed between search cache and render: use renderedA 6000$.68/28 CPU/58 GB andA 100-40 GB $2.69/30 CPU/200 GB, not cached $.77/$1.89.
- Whole-node rates include all cards; do not multiply the B200 $102.60/h or B300 $118.80/h node price by 8 again. llms.txt says checkpointed machines take one card, while offers list 8-card nodes: confirm stop/restore on those nodes.
- Default idle timeout is disabled; --ttl minimum 60 seconds is opt-in. Stop snapshots the machine: warm restores keep RAM; cold restores keep files, packages and configuration (docs). The same docs also call /workspace "the only place edits survive a stop", so the docs conflict. Forks and templates boot the snapshot's full root disk cold.
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