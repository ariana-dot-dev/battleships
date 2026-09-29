# AWS EC2 Mac: pricing regimes (as of 2026-09-28)
An EC2 Mac instance is a **whole physical Mac on a Dedicated Host**. You pay per host-hour from allocation to release, billed per second, with a **24-hour minimum allocation** (Apple macOS SLA). The sweep's M4/M3 Ultra figures (originally from Vantage) are **confirmed** by that official file.
## Regime table
| # | Regime | When it applies | How billed | Numbers (us-east-1) | Source |
|---|---|---|---|---|---|
| 1 | On-Demand Dedicated Host | Default | Per second while the host is allocated. **24 h minimum** per allocation. Billed even when the instance is stopped | mac2 M1 8 vCPU/16 GiB **$0.65/h**; mac2-m2 8/24 $0.878; mac-m4 10/24 **$1.23**; mac1 Intel 12/32 $1.083; mac2-m2pro 12/32 $1.56; mac-m4pro 14/48 **$1.97**; mac-m4max 16/128 $6.25; mac2-m1ultra 20/128 $5.00; mac-m3ultra 28/256 $12.50 | https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/ec2/USD/current/dedicatedhost-ondemand.json, https://aws.amazon.com/ec2/instance-types/mac/ |
| 2 | 24 h floor | Every allocation | Minimum charge = 24 × hourly | mac2 $15.60, mac-m4 $29.52, mac-m4pro $47.28, mac-m3ultra $300 | same + Apple macOS SLA §3 |
| 3 | Regional pricing | Non-us-east-1 regions | Same model at different rates | e.g. mac-m4 eu-central-1 $1.476, eu-west-1 $1.353, ap-southeast-2 $1.538. M4 Max / M3 Ultra only in us-east-1 and us-west-2 | dedicatedhost-ondemand.json |
| 4 | 2 macOS VMs per host (DIY) | You run Tart/Anka/Lume on the host | Host price split over at most 2 guest VMs (Apple SLA cap) | Per VM = host / 2 (e.g. M1 half-host 4 vCPU/8 GiB ≈ $0.325/h) | https://www.apple.com/legal/sla/docs/macOS27.pdf |
| 5 | Savings Plans | 1- or 3-year commitment | Discount on host-hours | "up to 44 percent off On-Demand pricing with a 3-year commitment". Per-type rates not fetched | https://aws.amazon.com/ec2/instance-types/mac/ |
| 6 | EBS root + volumes | Always (EBS boot) | Per provisioned GB-month, also while stopped | gp3 $0.08/GB-month; snapshots $0.05/GB-month | https://aws.amazon.com/ebs/pricing/ |
| 7 | Public IPv4 | Per address | Per hour, in use or idle | $0.005/h ($3.65/month) | https://aws.amazon.com/vpc/pricing/ |
| 8 | Internet egress | Account-wide | 100 GB/month free across AWS, then tiered | $0.09/GB first tier (long-standing list, not re-fetched) | https://aws.amazon.com/ec2/pricing/on-demand/ |
## Gotchas
1. **24 h floor plus scrubbing.** You cannot release a host before 24 h. After release it is scrubbed (reported 1-3 h) before anyone can reuse it. Short agent sessions pay for a full day.
2. **Stopped ≠ free.** The host bills while allocated, whatever state the instance is in.
3. **Whole Mac only.** The smallest unit is an 8-vCPU M1 Mac. A 4 vCPU/8 GiB need wastes half the host unless you pack 2 VMs on it.
4. **Licensing.** Apple allows leasing only for "Permitted Developer Services" (build/test/dev tools). General computer-use agents are a grey zone.
5. **No agent API.** You need your own VNC/accessibility driver (e.g. Cua Driver, Lume).
6. **Quotas.** Dedicated Host quotas per family and region; M4 Max / M3 Ultra only in two regions.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumptions: cheapest fitting host is mac2 (M1, 8/16) at $0.65/h; 100 GiB gp3 root per host; one public IPv4 per host. CPU utilisation does not matter (allocation billing).
| Regime | Host-hours | Compute | EBS | Snapshots | Egress | IPv4 | **Monthly** |
|---|---|---|---|---|---|---|---|
| 50 hosts kept all month | 50 × 730 | $23,725.00 | $400.00 | $2.50 | $0 (100 GB free) | $182.50 | **$24,310.00** |
| 50 hosts, allocated 24 h per workday (22 × 24 h) | 50 × 528 | $17,160.00 | $400.00 | $2.50 | $0 | $132.00 | **$17,694.50** |
| 2 VMs per host, 25 hosts all month | 25 × 730 | $11,862.50 | $400.00 (200 GiB/host) | $2.50 | $0 | $91.25 | **$12,356.25** |
| 2 VMs per host, 25 hosts × 528 h | 25 × 528 | $8,580.00 | $400.00 | $2.50 | $0 | $66.00 | **$9,048.50** |
The 8 h/day pattern costs the same as 24 h/day because of the 24 h floor. Releasing daily only saves weekends, and scrubbing makes it risky.