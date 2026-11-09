# Tinfoil — regimes (2026-11-08)
YC: Spring 2025; directory status **Active**. Research scope: public-product-researched. Source: https://www.ycombinator.com/companies/tinfoil
Tinfoil Containers (attested Docker app host) and Tinfoil Bunkers (persistent confidential agent VMs, enabled per account)
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Tinfoil Containers (CPU) | Any container instance | Per hour for CPU and memory; no shorter interval | $0.06 per vCPU-hour + $0.01 per GB-hour; memory from 8 GB; no base fee | https://tinfoil.sh/pricing (calculator data) |
| Confidential GPU enclave | GPU access enabled for the org (Tier 3) | Per GPU-hour on top of CPU/RAM; monthly commitment | H200 $5.90, B200 $8.12, B300 $9.23; 1 or 8 GPUs | https://tinfoil.sh/pricing, https://docs.tinfoil.sh/containers/limits.md |
| Tinfoil Bunker | Bunkers enabled for the account | Not published | Workspace volume 2 to 64 GB; CPU/RAM not published | https://docs.tinfoil.sh/bunkers/quickstart.md |
| Persistent volumes / GB-month | Provisioned until deleted, attached or not | GB-hours on provisioned size | $0.000137785 per GB-hour (about $0.10 per GB-month) | https://tinfoil.sh/pricing |
| Snapshots / GiB-month | No snapshot API documented | n/a | n/a | https://docs.tinfoil.sh/bunkers/quickstart.md |
| Egress / GiB | Not published | unverified, not $0 | unverified | https://tinfoil.sh/pricing |
| IPv4 / month | No dedicated IPv4 documented | n/a | n/a | https://docs.tinfoil.sh/containers/overview.md |
## Verified billing facts and gotchas
1. Page text: "Containers are billed per hour for CPU, memory, and GPUs (we don't offer shorter on-demand intervals)." The dollar rates are in the page's calculator data, not in the visible text.
2. The $20/month on the pricing page is Tinfoil Chat. Token inference and Chat are separate products.
3. "GPUs are priced hourly but require a monthly commitment." GPU access must be enabled for the organization.
4. Quota tiers: Tier 1 = 5 containers + 5 Bunkers + 32 GB storage; Tier 2 = 25/25/512 GB; Tier 3 = 50/50/2 TB. Tiers rise automatically with lifetime paid total.
5. Containers: the root filesystem is a ramdisk. Data survives on encrypted volumes (beta) or in the encrypted S3 buckets sidecar. The config repo must be public; the image can be private.
6. Bunkers: passwordless sudo, Docker, Xfce desktop, preinstalled coding agents; home, /workspace and installed software persist. The Perimeter keeps real credentials out of the Bunker. Price not published.
## Worked example
Requested: 4 vCPU/8 GiB, 50 simultaneous × 8 h/day × 22 days = **8,800 instance-hours**, 30% CPU; 50 GiB snapshots and 100 GiB egress.
Containers: 8,800 h × (4 × $0.06 + 8 × $0.01) = **$2,816 compute**, billed on allocation (30% use does not lower it), per full hour. 50 at once needs quota Tier 3. Snapshots are not offered; volumes bill about $0.10 per GB-month. Egress is not published. Bunkers: unknown, price not published.
## Sources and coverage
- https://www.ycombinator.com/companies/tinfoil
- https://tinfoil.sh/
- https://tinfoil.sh/pricing
- https://tinfoil.sh/llms.txt
- https://docs.tinfoil.sh/containers/limits.md
- https://docs.tinfoil.sh/containers/private-images.md
- https://docs.tinfoil.sh/containers/persistent-storage.md
- https://docs.tinfoil.sh/bunkers/quickstart.md
- https://docs.tinfoil.sh/bunkers/features.md
- https://docs.tinfoil.sh/bunkers/perimeters.md
- https://docs.tinfoil.sh/bunkers/security.md
HN query results were captured separately as `<id>--hn.txt`; they are discovery leads, not current tariff authority. Unsupported assertions remain null.
