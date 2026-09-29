# NAVER Cloud / LINE-NAVER scope
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Public mobile Korea pricing rendered successfully after desktop failed. High CPU-g3 4/8 is KRW 192/hour with disk additional; g2 4/8 is KRW 196/hour including 50 GB OS disk. Monthly and hourly are alternative billing selections, not automatic caps. LINE is not verified as a separate public sandbox provider.
## Currency, VAT and residency
- Native catalog: KRW. FX: 1 KRW = 0.000736416297207 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Displayed Korea catalog excludes VAT.
- Residency/restrictions: VPC Server docs list Korea, Singapore and Japan; Classic footprint differs. Japanese translation warns it may lag Korean docs.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| vpc-g3 | Korea VPC g3 High CPU | allocated wall time; 3600 second increment | High CPU-g3 4/8 4/8: KRW 192/h → USD 0.141391929064; month cap None | https://www.ncloud.com/product/compute/server |
| vpc-g2 | Korea VPC g2 High CPU | allocated wall time; 3600 second increment | High CPU-g2 4/8 50GB 4/8: KRW 196/h → USD 0.144337594253; month cap None | https://www.ncloud.com/product/compute/server |
| monthly | Monthly contract | See rule | g3 High CPU 4/8 KRW 138240/month; g2 with 50 GB KRW 141120/month. Partial month daily proration; not automatic caps. | https://www.ncloud.com/product/compute/server |
| free-tier | Micro-g3 | See rule | One-year trial only for Korean-resident accounts; not applicable to 4/8. | https://www.ncloud.com/product/compute/server |
## Gotchas
- Mobile catalog has no explicit current-generation availability date; confirm SKU in portal.
- Do not apply Korea prices to Singapore, Japan, US or Germany.
- Stopped-state charges and 50-instance quota not verified.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Displayed Korea catalog excludes VAT.
- Residency: VPC Server docs list Korea, Singapore and Japan; Classic footprint differs. Japanese translation warns it may lag Korean docs.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- vpc-g3: USD 0.141391929/allocated hour × 8,800 = **USD 1244.25 compute** (before quotas, fees, free buckets, storage and tax).
- vpc-g2: USD 0.144337594/allocated hour × 8,800 = **USD 1270.17 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **unknown**, not USD 0.
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://www.ncloud.com/product/compute/server
- https://guide.ncloud-docs.com/docs/ja/server-spec-vpc
- https://m.ncloud.com/charge/price/ko