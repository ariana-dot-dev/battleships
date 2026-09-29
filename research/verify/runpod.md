# Verify: runpod (2026-09-28, independent verifier)
Sources re-fetched live: runpod.io/pricing ("Updated September 27, 2026"; visible tables + schema.org Offer data),
docs.runpod.io api-reference-v2/catalog/list-cpu-types.md, flash/configuration/cpu-types.md, pods/pricing.md.
| Item | Result | Note |
|---|---|---|
| Secure Cloud per-GPU prices (B300 7.89 ... A5000 0.27, incl. MIG 48GB 1.09 / 24GB 0.59) | confirmed | all 21 values match |
| Community Cloud per-GPU prices (B300 6.94 ... A5000 0.16) | confirmed | Offer data; MIG variants have no Community price |
| Per-GPU bundled vCPU/RAM (e.g. H100 SXM 20 vCPU/125 GB, B200 28/283, B300 32/251) | confirmed | spot-checked |
| Serverless flex per class (B300 9.98, B200 8.64, H200 5.93, PRO 6000 3.49, H100 4.79, A100 2.72, 48GB 1.75, A6000/A40 1.22, 5090 1.58, PRO 4500 1.15, 4090 1.10, 24GB 0.69, 16GB 0.58) | confirmed | pricing page |
| Instant Clusters H200 SXM $4.31, A100 SXM $1.79; L40S/H100/B200 contact sales | confirmed | pricing page |
| Storage: container $0.10; volume $0.10 running / $0.20 idle; network $0.07 (<1 TB) / $0.05 (>1 TB); high-perf $0.14 | confirmed | pricing page + pods/pricing |
| Pods billed per second; no ingress/egress fees | confirmed | pods/pricing |
| CPU pod cpu3c $0.04/vCPU-h (secure), $0.03 serverless | confirmed as documented, but example-only | only source is the API v2 catalog EXAMPLE payload (cpu3c-2-4, vcpu 2-32, ramGbPerVcpu 2.5). The pricing page lists no CPU prices; the live catalog/console needs an API key. The real rate is unverifiable |
| cpu3c RAM 2.5 GB/vCPU (API example) vs 2 GB (Flash IDs cpu3c-1-2 ... 8-16) | confirmed conflict | card uses 2 GB |
| cpu3g (4 GB/vCPU), cpu5c exist; unpriced | confirmed | Flash cpu-types; also cpu5c container disk 15 GB/vCPU vs 10 GB for cpu3c/cpu3g |
| Spot absent from current docs | not re-checked | |
Corrections:
- Added knob retained_state_storage (effect snapshot_gib_month; 0.20 stopped volume default / 0.07 / 0.05 / 0.14 network
  Removed the two contradictory caveats ("non-spec effect" and
  volume disk. A stopped pod keeps its volume disk. The reference workload now gives $1,418 (= regime), or $1,411.50 with the network-volume option.