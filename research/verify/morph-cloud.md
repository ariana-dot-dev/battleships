# Verify: morph-cloud (2026-09-28)
Docs pages (pause-resume, ttl, snapshot-ttl, EFS billing) not re-fetched.
| Item | Result |
|---|---|
| MCU = 1 vCPU-h + 4 GB RAM-h + 16 GB disk-h, or 5 TB snapshot-hours | confirmed |
| MCU/h = max(vCPUs, ceil(RAM/4GiB), ceil(disk/16GiB)) | confirmed (stated for devboxes on the page) |
| Standard MCU rate $0.05 | confirmed ("Based on standard MCU rate of $0.05") |
| Snapshot $0.00001/GB-h (~$0.0073/GB-month); page example 8 vCPU/8 GB/8 GB disk snapshot = $0.12/month | confirmed (16 GB x 730 h x $0.00001 = $0.117) |
| Tiers: Developer $0 (badge Free) / Team $40 (Popular) / Scale $250 (Enterprise) | confirmed |
| Starting credit 0 / 1,000 / 7,500 MCU; "20% Discount ($50 value)" / "33% Discount ($375 value)" | confirmed. Encoding fee 40 + included_usd 50 and fee 250 + included_usd 375 (fee not credit) matches |
| Developer "Purchase MCUs to use compute" (no free credit) | confirmed |
| Org limits vCPU 64/256/1024, RAM 256/1024/4096 GB, storage 1024/4096/16384 GB | confirmed |
| Devboxes concurrency 8/32/128, total 32/128/512 | confirmed |
| Actions runners Small 2/4/40 = 3 MCU, Medium 4/8/80 = 5 MCU, Large 8/16/160 = 10 MCU -> $0.15/$0.25/$0.50 per h | confirmed |
| "Additional credits billed pay-as-you-go" (overage at $0.05) | confirmed |
| Rollover/expiry of bundle MCU | unverifiable (not stated) |
| EFS $0.12/$0.15/$0.18 per GiB-month | unverifiable in this pass (EFS docs not re-fetched) |
| Paused = snapshot only; stopped = free; snapshots no default TTL | unverifiable in this pass (docs not re-fetched) |
| Egress, IPv4, regions, granularity, compliance | unverifiable (not published) |
| Engine note | plans carry non-spec `pool_vcpu/pool_ram_gib/pool_disk_gib` (org-wide caps). The engine ignores them, so it may pick Developer for a fleet above 64 vCPU total; for large usage Scale is picked anyway on price. Left as-is (documented in caveats). |
No corrections needed.