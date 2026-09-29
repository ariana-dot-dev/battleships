# Verify: exe-dev (2026-09-28)
Sources re-fetched: https://exe.dev/pricing (HTML incl. embedded pricing-scale JSON `personal:monthly:20260914`, `work:monthly:20260901`), https://exe.dev/docs/billing/overview.md, https://exe.dev/docs/billing/usage.md, https://exe.dev/docs/cli-pool.md
## Which surface is current
/pricing (live) shows Personal / Work / Enterprise + standalone VMs -> current. docs/billing/overview.md still shows Small..XLarge $20/$40/$80/$160 (Team $25/$50/$100/$200), 50 VMs, $20 Shelley credit -> legacy, confirmed still published. Card's treatment (legacy flagged) confirmed.
| Item | Result |
|---|---|
| Personal $15/mo, 2 vCPU / 4 GB, 50 VMs, 100 GB disk, 200 GB bandwidth, 1 pool, user's region, min spend $15 | confirmed |
| Personal 4/8/16 vCPU prices "unpublished" | **corrected**: null/omitted -> $35 (4/8 GB), $75 (8/16 GB), $155 (16/32 GB), from embedded JSON on /pricing. Added 3 tiers to mode `pool-personal` |
| Work $0.21/h per 4 vCPU / 8 GB, min spend $150, up to 512 vCPU / 1,024 GB, unlimited pools, any region | confirmed |
| Work tier monthly prices (vcpu/4 x 0.21 x 730) | confirmed for all 27 tiers; JSON confirms linear pricing at 8/16/32/64/128/256/512 |
| Work VMs per pool = 100 for every tier | **corrected**: 100 -> min(1000, 25 x vCPU) (JSON: 4=100, 8=200, 16=400, 32=800, 64+=1000; others interpolated) |
| Work plan concurrency 100 | **corrected**: 100 -> null (pools hold up to 1,000 VMs each, unlimited pools; the 100 cap is standalone VMs only - caveat in plan note) |
| Work bandwidth "200 GB vs 50 GB/vCPU" conflict | **corrected** to resolved: 50 GB per vCPU, 200 GB at 4 vCPU, capped 800 GB (JSON). Same for disk |
| Standalone VMs $0.105 per 2 vCPU per hour (=$0.0525/vCPU-h), default 2 vCPU/8 GB, max 16/32 (Personal), 32/64 (Work), 50/100 VMs | confirmed |
| Extra disk $0.08/GB-month, extra bandwidth $0.05/GB | confirmed |
| Disk billed on time-averaged extra usage (GiB-months); bandwidth outbound only, inbound never billed; overage billed at cycle end | confirmed (usage.md) |
| Subscriptions paid in advance | confirmed (overview.md) |
| cli-pool: even vCPU 4..512, 2 GiB/vCPU, --max-vms default 100, pool resize, access via support | confirmed |
| Pool billed hourly 24/7 while it exists; proration after resize | unverifiable (not stated; $/hour price implies it) |
| Standalone VM granularity / billing while stopped | unverifiable (undocumented) |
| Usage / Cloud Pool rates ($0.05 core-h, $0.016 GiB-h, peak-hourly) | unverifiable this pass (/sandbox not re-read in detail); left as sales-only |
| Legacy Enterprise "from $35.84/h" | unverifiable (not on current page, which says Custom) |
| Nested virtualization Enterprise-only; BYOC Enterprise; SSO Work | confirmed (comparison table) |
| Regimes gotcha "Work is 7.7x Personal per vCPU" | **corrected** -> ~5x at entry ($38.33 vs $7.50 per vCPU-month), ~4x at 16 vCPU |
| Worked example rows 2, 2b, 3, 5, 7 arithmetic | confirmed (recomputed: 7,665.00; 1,964.34; 1,848.00; 2,500; 1,654.40 / 2,886.40) |
JSON validated (node JSON.parse).