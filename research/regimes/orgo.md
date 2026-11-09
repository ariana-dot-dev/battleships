# Orgo: pricing regimes (as of 2026-11-08)
Orgo sells persistent "computers for agents": full desktops with screenshot/click/type/scroll/drag APIs, REST/SDK/CLI/MCP and SSH. A computer runs **by the hour from credit** (no plan needed for Medium) or inside a **monthly plan pool** of vCPU and RAM that all the account's computers share.
- **OS:** Linux on every plan and by the hour; Windows on Scale or with a $15/mo licence on Starter/Growth (not by the hour); Mac mini VMs and iPhones on paid plans while in stock.
- **Sizes:** Small 0.5 vCPU / 4 GB / 20 GB (API only), Medium 2 / 8 / 40, Large 4 / 16 / 80, XL 6 / 32 / 150 (largest self-serve), 2XL 8 / 64 / 300 on request. No computer goes above 8 vCPU / 64 GB / 300 GB.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Pay as you go | Free account, no plan; Medium Linux only | Per second from credit | **$0.055/hr** running, $0.0027/hr stopped; $5 starting credit ($2 for an agent signup) | https://www.orgo.ai/pricing.md, https://docs.orgo.ai/guides/pricing |
| 2 | Hourly on a paid plan | Computers that do not fit the plan pool, and every computer past 50 (up to 999) | Per second from credit, no hourly minimum | Small $0.023, Medium $0.055, Large $0.11, XL $0.202, 2XL $0.368 per hour running; $0.0014 / $0.0027 / $0.0055 / $0.011 / $0.0205 stopped | same |
| 3 | Starter | 2 vCPU / 8 GB pool (1 Medium always on) | Flat monthly | **$29/mo** ($276/yr); 8 GB / 40 GB per computer | https://www.orgo.ai/pricing.md |
| 4 | Growth | 8 vCPU / 32 GB pool (4 Medium, or mixed up to XL) | Flat monthly | **$99/mo** ($948/yr); 32 GB / 80 GB per computer, 160 GB total | same |
| 5 | Scale | 36 vCPU / 128 GB pool (16 Medium, or mixed up to XL), Windows included | Flat monthly | **$399/mo** ($3,828/yr); 32 GB / 150 GB per computer, 640 GB total | same |
| 6 | Add-ons | Grow a plan pool | Monthly (yearly 20% less) | $2.50 per 0.5 vCPU, $2.50 per GB RAM, $1 per 20 GB disk; caps 200 vCPU / 800 GB / 4,000 GB | same, https://docs.orgo.ai/guides/account-limits |
| 7 | Windows licence | Windows on Starter/Growth | Per Windows computer | $15/mo ($144/yr); included on Scale; not by the hour | same |
| 8 | Mac / iPhone | Paid plans, while in stock | Monthly, apart from the plan | Mac mini M4 VM $100, M6 VM $120, iPhone 12 $65; iPhone 17 $129 by request | https://www.orgo.ai/pricing.md |
| 9 | Enterprise | Large fleets | Custom | SLA and dedicated hosts by contract; 999 computers or the contract number | same |
| 10 | Stopped computer | `stop` | Disk archived; cold boot on a new host, no memory state | Plan: no compute charge; hourly: stopped rate | https://docs.orgo.ai/api-reference/computers/stop |
## Gotchas
1. **A free account runs only Medium by the hour.** A Large or XL by the hour needs a paid plan.
2. **Plan resources cost the same whether they run or not.** Hourly computers bill per second and pay a small stopped rate.
3. **Windows is not offered by the hour.** It runs on a plan.
4. **Creation rate limits:** Free 2/min, 10/h, 20/day; Starter 10/100/500; Growth 30/300/2,000; Scale 60/1,000/5,000.
5. **Inbound:** no public per-computer IP and no public inbound hostname; direct SSH on a public host and port; template ports with `public: true` map to a host port. No custom-domain feature is documented.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 at once, 8 h/day × 22 days.
| Regime | Fits? | Monthly |
|---|---|---|
| Hourly Large (4 vCPU / 16 GB) on Starter | yes, 50 computers | 50 × 176 h × $0.11 = $968 + $29 = **$997** (plus stopped rate if kept) |
| Scale + 164 vCPU + 272 GB add-ons | yes, 50 computers | $399 + $820 + $680 = **$1,899** |
| Enterprise | yes | custom |
Sources: https://www.orgo.ai/pricing.md · https://docs.orgo.ai/guides/pricing · https://docs.orgo.ai/guides/billing · https://docs.orgo.ai/guides/account-limits · https://docs.orgo.ai/guides/instance-types
