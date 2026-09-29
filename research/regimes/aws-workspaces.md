# Amazon WorkSpaces Personal (Windows): pricing regimes (as of 2026-09-28)
WorkSpaces Personal is a persistent Windows desktop (Windows Server-based desktop experience, licence included) sold per bundle. It has two running modes:
- **AlwaysOn**: flat monthly price per desktop.
- **AutoStop**: small fixed monthly fee plus an hourly rate.
The official pricing page did not render in the scraper. This **replaces the guide-sourced numbers in the sweep**: the sweep said Standard was $31/mo AlwaysOn and $0.28/h AutoStop. The real figures are **$33** and **$0.30/h**.
## Regime table
| # | Regime | When it applies | How billed | Numbers (us-east-1, root 80 GB + user 10 GB unless noted) | Source |
|---|---|---|---|---|---|
| 1 | AlwaysOn | Running mode AlwaysOn | Flat per desktop per month, however much it is used | Value 1 vCPU/2 GB $25; Standard 2/4 **$33**; Performance 2/8 $45; Power 4/16 **$70**; PowerPro 8/32 $127; GeneralPurpose 16/64 $295 and 32/128 $590 (175+100 GB) | https://b0.p.awsstatic.com/pricing/2.0/meteredUnitMaps/workspaces/USD/current/workspaces.json |
| 2 | AutoStop | Running mode AutoStop | Monthly fee per desktop + **per hour** while running. Stops after an idle timeout | Monthly fee $7.25 (80+10 GB), $9.75 (80+50), $19 (175+100). Hourly: Value $0.22, Standard **$0.30**, Performance $0.47, Power **$0.68**, PowerPro $1.53, GP 16-vCPU $2.28, GP 32-vCPU $4.56 | same |
| 3 | Bigger storage | Larger root/user volumes | Raises the monthly price only (the hourly rate is unchanged) | e.g. Standard AlwaysOn 80+50 GB $35; PowerPro 175+100 GB $140 | same |
| 4 | Standby (warm DR) | Standby WorkSpaces | Low monthly fee | $3.25-5.75/month | same |
| 5 | Application bundles | Office / Visual Studio / Project | Monthly add-on per desktop | e.g. Office 2021 Pro +$21.43; Visual Studio 2022 Pro +$48.51 | same |
| 6 | BYOL Windows 10/11 | Eligible licences, minimum deployment | Lower bundle price | Not encoded | https://aws.amazon.com/workspaces/personal/pricing/ |
## Gotchas
1. **AutoStop break-even:** a Power desktop costs $70 AlwaysOn versus $7.25 + $0.68/h AutoStop. AutoStop is cheaper only below about 92 h/month.
2. The AutoStop monthly fee is charged even if the desktop never starts.
3. There is **no 4 vCPU / 8 GB bundle**. 4 vCPU means Power (16 GB).
4. It is a desktop product: provisioning takes ~20 min and AutoStop resume ~1-2 min. There is no agent API, and it needs a directory (Simple AD / AD Connector).
5. The hourly rate appears to round per started hour (hour-granular SKUs).
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
Assumption: the Power bundle (4 vCPU / 16 GB, 80+10 GB) is the smallest fit.
| Regime | Fixed | Usage | Snapshots / egress | **Monthly** |
|---|---|---|---|---|
| AlwaysOn Power | 50 × $70 = $3,500 | $0 | included / not metered separately | **$3,500.00** |
| AutoStop Power | 50 × $7.25 = $362.50 | 8,800 × $0.68 = $5,984.00 | same | **$6,346.50** |
At 176 h/desktop/month, AlwaysOn is cheaper. Utilisation (30%) does not matter. There is no user-managed snapshot product to price.