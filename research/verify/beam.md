# Verify: beam (2026-09-28)
https://docs.beam.cloud/v2/sandbox/configuration, Beam blogs (search results for modal-pricing-explained / 2026-sandbox-guide / e2b-pricing-explained).
| Item | Result |
|---|---|
| Sandbox CPU $0.0000375/s per physical core "(2 vCPU equivalent)" -> $0.135/core-h -> $0.0675/vCPU-h | confirmed (pricing page) |
| Sandbox RAM $0.0000064/GiB-s -> $0.02304/GiB-h | confirmed |
| Page example 1 core (2 vCPU)/8 GiB = $0.319/h | confirmed (0.135 + 8x0.02304 = 0.3193) |
| 1 core = 2 vCPU | confirmed ("Physical core (2 vCPU equivalent)") |
| Sandbox = 3x serverless CPU rate ($0.0000125/core-s); RAM 3.05x ($0.0000021/GiB-s) | confirmed |
| Serverless alt mode $0.0225/vCPU-h, $0.00756/GiB-h | confirmed |
| GPU-attached CPU $0.000105/core-s ($0.189/vCPU-h), RAM $0.0000055/GiB-s ($0.0198/GiB-h) | confirmed |
| GPU/s: 4090 $0.000192, 5090 $0.000303, H100 $0.000972 (-> 0.6912 / 1.0908 / 3.4992 $/h) | confirmed; page example 4090+2 cores+16 GiB = $1.77/h reproduces |
| A10 $1.0512/h (A10G $0.000292/s) | unverifiable on current page (June blog only) - kept, caveat exists |
| Sandbox GPU billed at serverless GPU rate | unverifiable (not stated) - caveat exists |
| On-demand machines B200 4.11, H200 2.09, H100 1.83, A100-80 1.36, RTX PRO 6000 1.09, L40S 0.76, 5090 0.72, A6000 0.54, 4090 0.44 + specs | confirmed (all 9, incl. vCPU/RAM/NVMe) |
| Clusters contact sales | confirmed |
| Storage free to 1 TB, $0.021/GB-month over; snapshots included | confirmed |
| BYOC $0.019/h per vCPU + $0.009/h per GB; g5.2xlarge = $0.44/h | confirmed |
| Egress free on all plans | confirmed (FAQ) |
| Developer $0 / Team $89 "per month, plus usage" (fee not credit) | confirmed |
| Concurrency: CPU 30 / 1000 / unlimited; GPU 5 / 50 / 1,000+ | confirmed |
| Seats 1 / 3 incl + $25 / unlimited; logs 30 d / 30 d / 1 y | confirmed |
| Volume discounts > $10K/mo | confirmed |
| Cold start / image pull not billed | confirmed (FAQ) |
| $30/month Developer credit | unverifiable on pricing page; stated in Beam's own blogs (vendor, "Developer plan is free with $30/month in credits"). Kept with existing caveat |
| SDK `cpu=` unit (core vs vCPU) | unverifiable (docs give cpu=1.0/4.0 with no unit) - caveat exists |
| keep_warm TTL examples 1800/3600/7200/-1 | confirmed (sandbox configuration docs) |
| "non-root containers" | confirmed (FAQ) |
| SOC2 / HIPAA | confirmed (listed under Compliance in plan table) |
| Engine note | gpu-machine mode puts GPU type on each size (non-spec `gpu` key) with mode `gpu: null`, so the engine can never price it for a GPU workload. Harmless (mode is `alt`); left as-is, noted here. |
No corrections to numbers were needed.