# KakaoCloud Virtual Machine
As of 2026-09-28. Price basis: public list/reference unless labeled historical, illustrative, promo or unpriced.
Compute-optimized c2a.xlarge is 4 vCPU/8 GiB. Root and data volumes are additional. Monthly values on page are 720-hour illustrations, not monthly caps. Burstable t1i has different CPU performance economics.
## Currency, VAT and residency
- Native catalog: KRW. FX: 1 KRW = 0.000736416297207 USD, ECB 2026-09-28 ([source](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.cs.html)). USD-listed catalogs remain independent quotes.
- Tax: Published prices exclude VAT (VAT 별도).
- Residency/restrictions: Calculator defaults kr-central-2; no EU workload-residency verified.
## Regimes
| Regime | When it applies | How billed | Native / USD numbers | Source |
|---|---|---|---|---|
| compute | c2a on-demand | allocated wall time; 60 second increment | c2a.xlarge 4/8: KRW 164/h → USD 0.120772272742; month cap None | https://www.kakaocloud.com/services/virtual-machine/pricing |
| shared-burstable | t1i burstable | allocated wall time; 60 second increment | t1i.xlarge 4/16: KRW 176.8/h → USD 0.130198401346; month cap None | https://www.kakaocloud.com/services/virtual-machine/pricing |
| os-license | Windows Server | See rule | KRW 33/h extra; MSSQL variant has different 4-vCPU unit pricing. | https://www.kakaocloud.com/services/virtual-machine/pricing |
| network | Outbound traffic | See rule | 30 GiB free then KRW 90/GiB to 10 TiB, 80 to 20 TiB, 70 above. IPv4 KRW 5.5/held-hour. | https://www.kakaocloud.com/services/virtual-machine/pricing |
## Gotchas
- VM stop/shelve state billing needs state-table verification.
- t1i CPU baseline/credit policy not established; no burstable baseline assumed.
- Unknowns remain null, not free; generic infrastructure modes are opt-in alt.
- Worked example assumes resources are released between active windows unless a retained-instance scenario is explicitly discussed.
- VAT basis: Published prices exclude VAT (VAT 별도).
- Residency: Calculator defaults kr-central-2; no EU workload-residency verified.
## Required worked example
4 vCPU / 8 GiB requested; 50 simultaneous workers × 8 hours/day × 22 days = **8,800 instance-hours**, 1,100 daily sessions. CPU utilization 30% does not reduce allocated-resource charges. Snapshot retention is **50 GiB total for 730 hours**, not 50 GiB per worker; egress is **100 GiB total**. Root disk size was not specified, so root/volume costs are not silently assigned zero.
- compute: USD 0.120772273/allocated hour × 8,800 = **USD 1062.80 compute** (before quotas, fees, free buckets, storage and tax).
- shared-burstable: USD 0.130198401/allocated hour × 8,800 = **USD 1145.75 compute** (before quotas, fees, free buckets, storage and tax).
- 50 GiB retained snapshots: **unknown/unverified feature or price**, not USD 0.
- 100 GiB egress: **USD 4.64** using captured marginal tariff and 30 GiB verified free allowance (if unspecified, none assumed for this component calculation).
- Full all-in bill: **null** where any required storage/network/fee or eligibility fact is unresolved. Quota raises may be necessary for 200 aggregate vCPU / 400 GiB RAM.
## Sources
- https://www.kakaocloud.com/services/virtual-machine/pricing
- https://docs.kakaocloud.com/en/service/bcs/vm/vm-pricing
- https://kakaocloud.com/pricing/calculator