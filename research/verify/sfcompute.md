# Verify: sfcompute (2026-09-28)
Sources re-fetched: https://autoresearch.sfcompute.com/ (live pricing table in HTML), https://autoresearch.sfcompute.com/llms.txt, https://sfcompute.com/, https://sfcompute.com/specs.
| Item | Result |
|---|---|
| Sandboxes (active) $0.04572/GiB-hr, forks free, no calendar discount ("-") | confirmed |
| Sandboxes (parked) ~$0.000139/GiB-hr | confirmed |
| **4 GiB/core floor**: sandbox-sm 1 vCPU/2 GiB bills as 2; sandbox-md 4/8 bills as 16; lg 8/32 as 32; xl 16/64 as 64 | confirmed (llms.txt SIZES: "A core comes with 4 GiB ... a workload wanting cores and little memory still pays for the cores"); floor applies above the default size only |
| Size hours 0.09144 / 0.73152 / 1.46304 / 2.92608 | confirmed arithmetic |
| Park after ~1.5 s idle, only handed-back memory discounted | confirmed |
| sandbox_vcpus limit starts at 4 (md no permission, lg/xl need raise); 8 GiB workspace RAM ceiling, 64 GiB platform cap | confirmed |
| Sandbox snapshots $0.10/GiB-month (resident), $0.05 cold, live until deleted/expiry | confirmed |
| Node snapshot storage $0.10/GiB-month, 250 GiB free | confirmed |
| cpu-2 $0.003/min ($0.18/h), 2 reserved physical cores + 8 GiB, 15-min idle window ($0.045 max), Fri 32% / Sat-Sun 20% | confirmed |
| cpu-8 $0.00804/min ($0.4824/h), 15-min window ($0.1206 max), "33% off (CPU node launch pricing)" | confirmed; pre/post-discount ambiguity remains (caveat) |
| h100-1 $0.066/min ($3.96/h), 15-min window $0.99; h100-8 $0.528/min ($31.68/h), 20-min $10.56; Fri 33% / weekend 20% | confirmed |
| Stale llms.txt "$0.90 and $9.60 at the H100 list rate" (= $3.60/h) and CLI demo "$0.0666/min" | confirmed still present (card caveat accurate) |
| Batch H100 $0.0495/min per GPU, 25% below interactive; Friday moves jobs, weekend does not | confirmed |
| No minimum charge, stop ends billing | confirmed |
| Credit $10-$10,000, purchased valid 12 months, promo 3 weeks, invoice accounts -> prepaid Oct 1 2026 | confirmed |
| Object storage 100 GB free then $0.10/$0.07/$0.05/$0.035 tiers | confirmed |
| Homepage "Reserved price $3.00/gpu/hr" | confirmed (widget also shows $4.29/gpu/hr list with 43% figure; market price, not list) |
| "No ingress/egress fees" (specs) | confirmed (GPU clusters; applied card-wide as egress_gib 0, caveat present) |
| SOC 2 | confirmed (SOC 2 Trust Center badge) |
| Builds $0.01/min 300 free, logs/traces $0.50/GB 5 GB free, metrics $8/1k series 10k free | unverifiable this pass (not re-grepped); unchanged |
| Market orderbook mechanics, docs example ~$17.42/node-h, old prices page $1.50, resale 25% realized discount, spot preview | unverifiable this pass (docs.sfcompute.com not re-fetched: WebFetch session limit) |
| Engine: sandbox = sizes (conservative: custom `ram_gib` shapes not modelled); market GPU rates null so modes are never priced; batch flagged alt+spot, cpu-node alt | confirmed intended |
No corrections needed.