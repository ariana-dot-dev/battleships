# Google Cloud Run — pricing regimes (as of 2026-09-28)
Cloud Run bills allocated vCPU-seconds and GiB-seconds, rounded up to 100 ms, with different rates depending on the
**billing configuration** (instance-based vs request-based), the **resource type** (services, jobs, delayed jobs,
worker pools) and the **region tier**. Rates are from the official pricing tables at https://cloud.google.com/run/pricing
The Cloud Billing Catalog API needs an API key and
was not used. Tier 1 regions include us-central1/us-east1/us-east4, europe-north1/west1/west4/southwest1/west9 and
asia-south1/northeast1/east1, so the cheapest EU and Asia regions cost the same as the US.
Reference 4 vCPU / 8 GiB: instance-based **$0.3168/h**; request-based active **$0.4176/h**; worker pool **$0.1975/h**.
## Regime table
| Regime | When it applies | How billed | Numbers (per vCPU-s / per GiB-s) | Source |
|---|---|---|---|---|
| Services, instance-based billing (formerly "CPU always allocated") | `billing: instance` | Whole instance lifetime, 1-minute minimum; no request fee | $0.000018 / $0.000002 ($0.0648 / $0.0072 per h) | pricing page |
| Services, request-based billing (default) | Scale-to-zero HTTP services | Only while starting, shutting down, or handling >= 1 request, 100 ms rounding; + requests | Active $0.000024 / $0.0000025; requests $0.40 per 1M | pricing page |
| Request-based idle min-instances | `min-instances > 0`, idle | Reduced idle rate; idle non-min instances are free | $0.0000025 / $0.0000025 | pricing page |
| Cloud Run CUD 1y or 3y | Spend commitment, Cloud Run only | Same rate for 1y and 3y | Instance-based $0.00001494 / $0.00000166 (-17%); request-based $0.00001992 / $0.000002075, requests $0.332/M | pricing page |
| Compute Flexible CUD 1y / 3y | Spend commitment shared with GCE/GKE | Discount on instance-based | 1y $0.00001296 / $0.00000144 (-28%); 3y $0.00000972 / $0.00000108 (-46%) | pricing page |
| Jobs | Run-to-completion tasks (up to 168 h; 1 h with GPU) | Instance-based rates, 1-minute minimum | $0.000018 / $0.000002 | pricing page |
| Delayed Jobs | Deferred-start jobs | Dynamic price, "can change up to once every 30 days" | $0.0000126 / $0.0000014 (-30%); flex CUD 1y $0.000009072 / $0.000001008, 3y $0.000006804 / $0.000000756 | pricing page |
| Worker pools | Always-on background workers, no ingress | Instance lifetime | $0.000011244 / $0.000001235 (= Fargate x86); flex CUD 1y $0.000008096 / $0.000000889, 3y $0.000006072 / $0.000000667 | pricing page |
| "Instances" table | Unexplained on the page | ? | $0.00000027 / $0.00000193 | pricing page |
| GPU | L4 / RTX PRO 6000 attached to services, jobs, pools | Per second on top of CPU/RAM | L4 $0.0001867/s ($0.672/h) non-zonal, $0.0002909/s zonal; RTX PRO 6000 $0.00036522/s ($1.315/h), zonal $0.00056913/s | pricing page |
| Ephemeral disk (optional) | Disk beyond the in-memory FS | Per GiB-hour | $0.000109589 (~$0.08/GiB-month); flex CUD 1y $0.000078904, 3y $0.000059178 | pricing page |
| Tier 2 regions | europe-west2/3/6/10/12, asia-southeast1/2, asia-east2, asia-northeast3, australia-*, northamerica-*, southamerica-*, us-west2/3/4, me-central* | Higher unit rates | **not captured** (page shows the us-central1 view) | pricing page region list |
| Free tier (monthly, per billing account, Tier 1-priced discount) | All accounts | Deducted | Instance-based/jobs 240,000 vCPU-s + 450,000 GiB-s ($5.22); request-based 180,000 vCPU-s + 360,000 GiB-s + 2M requests ($6.02); delayed jobs 342,857 + 642,857; worker pools 384,204 + 728,744 | pricing page |
| Internet egress (Premium Tier) | Outbound internet | Tiered per destination | 1 GiB/month free within North America; $0.12/GiB 0-1 TiB, $0.11 1-10 TiB, $0.08 (NA) / $0.085 (EU, Asia) above; Oceania/SA/Korea/Indonesia $0.19; China $0.23. Same-region GCP, Cloud CDN, Cloud LB: free | https://cloud.google.com/vpc/network-pricing |
| New-customer trial | New GCP accounts | Credits | $300 / 90 days (generic GCP, not re-verified) | cloud.google.com/free |
## Gotchas
1. **Request-based is 33% dearer per second but free between requests**; instance-based is cheaper only if the instance is busy most of its life.
2. **60-minute request timeout** on services: a sandbox session must be one long request or many short ones; jobs run up to 168 h but have no ingress.
3. **1-minute minimum** per instance on instance-based billing and jobs.
4. **In-memory filesystem**: files written to disk consume RAM you pay for unless you add the ephemeral disk.
5. **Egress is expensive**: $0.12/GiB with only 1 GiB free (vs AWS 100 GB free); Standard Tier isn't used by Cloud Run.
6. **Static egress IP needs VPC egress + Cloud NAT** (extra, not priced here).
7. Delayed-jobs prices float monthly; CUDs bill every hour of the term.
## Worked example
4 vCPU / 8 GiB, 50 concurrent x 8 h/day x 22 days = **8,800 instance-hours**, 30% CPU (no effect: allocated
billing), 50 GiB state (no snapshot feature; would need GCS/Filestore, not priced), 100 GiB egress
(1 GiB free, 99 x $0.12 = $11.88).
| Regime | Compute | Total / month |
|---|---|---|
| Instance-based service | 8,800 x 0.3168 = $2,787.84 - free $5.22 | **$2,794.50** |
| Request-based, request in flight 100% of session | 8,800 x 0.4176 = $3,674.88 - free $6.02 (requests negligible) | **$3,680.74** |
| Request-based, request in flight 30% of session | 2,640 x 0.4176 = $1,102.46 - $6.02 | **$1,108.32** |
| Worker pool (no inbound) | 8,800 x 0.19748 = $1,737.84 - free $5.22 | **$1,744.50** |
| Instance-based + flex CUD 3y sized for 50 x 24/7 | 50 x 730 x 0.171072 = $6,244.13 | **$6,256.01** (commit idle 16 h/day) |
| Jobs (no ingress) | same as instance-based | **$2,794.50** |