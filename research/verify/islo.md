# Verify: islo (2026-09-28)
Sources re-fetched: https://islo.dev/pricing, https://docs.islo.dev/concepts/sandbox-lifecycle.md, https://docs.islo.dev/integrations/harbor.md, https://aws.amazon.com/marketplace/pp/prodview-3eew6wp37ylek, The New Stack launch article (search snippet)
| Item | Result |
|---|---|
| CPU $0.07/CPU-hour "per core while the env runs" (allocated) | confirmed |
| Memory $0.04/GB-hour "per GB you provision" | confirmed |
| Storage $0.0007/GB-hour; x730 = $0.511/GB-month | confirmed |
| Page calculator: 2 vCPU/4 GB x 2 h = $0.60; 4/8 = $0.60/h | confirmed (arithmetic) |
| "No charge when stopped", "no idle fees", "billed per hour" / per vCPU-hour; granularity unknown | confirmed (wording); granularity unverifiable |
| Signup credits, no card, amount unpublished | confirmed |
| Cost limits per task; BYOC "you still pay for compute time" | confirmed (FAQ) |
| Free 5 concurrent / Team 50 concurrent / Enterprise custom | confirmed via The New Stack snippet (not on islo.dev) |
| Paused: state snapshotted, compute released, doesn't count vs running quota; lifecycle immutable after creation | confirmed (lifecycle doc) |
| Paused/stopped disk billing | unverifiable (undocumented) |
| Named snapshot price | unverifiable (unpublished) |
| AWS Marketplace Team Starter $50/mo = $50 monthly credits, "294 hours compute for most customers", no refunds, overage + rollover unspecified | confirmed |
| AWS Marketplace plan concurrency null | **corrected** null -> 50 (it is the Team package; null let the engine escape Team's 50-cap) |
| Harbor HARBOR250 $250 one-time | confirmed |
| Egress / IPv4 / regions unpublished | confirmed (nothing on pricing page) |
| 5-7 min resume, 1.3 GB image 503 (third-party README) | unverifiable (not re-checked) |
| Worked example (5,280; 61.60; 25.55; 193.90; 21,900; 255.50; 83 h of $50) | confirmed (recomputed) |
JSON validated.