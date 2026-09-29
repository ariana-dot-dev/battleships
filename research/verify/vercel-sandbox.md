# Verify: Vercel Sandbox (2026-09-28)
## Card (cards/vercel-sandbox.json)
| Item | Result |
|---|---|
| Active CPU $0.128/h, provisioned memory $0.0212/GB-h (iad1) | confirmed |
| cpu_basis active, ram_basis alloc; 2 GB per vCPU; vCPU 1 or even 2-32 | confirmed |
| 1-minute minimum on memory | confirmed. The engine applies min_billed_seconds to CPU too; caveat added (tiny overestimate) |
| Creations $0.60/1M (start_fee 6e-7) | confirmed |
| Snapshot $0.08/GB-month, same in all regions; 30-day default expiry | confirmed |
| Data transfer: Pro in Flat Rate CDN (1 TB included, shared); Enterprise $0.15/GB | confirmed. The $20 / $100 / $300 tiers are confirmed |
| Disk 64 GB NVMe free (32 GB on deprecated runtimes) | confirmed |
| Hobby: 5 CPU-h, 420 GB-h, 5,000 creations, 20 GB, 15 GB lifetime snapshot/drive, 10 concurrent, 45 min, 4 vCPU / 8 GB | confirmed. included_usd 12.55 arithmetic confirmed |
| Hobby engine interpretation | **Corrected**: added `trial_only: true`. The engine billed usage above included_usd as overage, but Hobby has no overage ("You will not be charged for any additional usage... creation is paused") and is non-commercial |
| Pro $20 fee = $20 monthly credit shared across all products, expires monthly (fee_is_credit true) | confirmed |
| Extra deploying seats $20/mo, viewers free | confirmed |
| Pro/Enterprise 10,000 concurrent, 24 h session, Pro max 8 vCPU / 16 GB, Enterprise 32 / 64 | confirmed |
| vCPU allocation rate: Hobby 20-40/min; Pro/Ent 150 -> 5,000/min (+500/min ramp) | confirmed; caveat added that the engine does not model it |
| Regional CPU/memory/data-transfer rates (bom1 ... gru1) | confirmed against the raw regional dump (spot-checked fra1 0.184/0.0304/0.15, gru1 0.221/0.0366/0.22, icn1 0.169/0.0280/0.35). The live selector does not render as text, so a live re-check is unverifiable |
| Drives $0.05/GB-mo, reads $0.0015, writes $0.004 | confirmed |
| Downloads free; exposed-port traffic billed both ways | confirmed |
## Regimes (regimes/vercel-sandbox.md)
Arithmetic checked: iad1 $2,848.16; gru1 $4,914.40; 100% CPU $5,998.08; 10% CPU $1,943.04; 24/7 $11,796.80. Memory is 52% of the bill at 30% util; the EU markup is 1.25-1.44x.