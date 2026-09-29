# Windows 365 (Business / Enterprise): pricing regimes (as of 2026-09-28)
Windows 365 gives each named user a persistent Windows 11 Cloud PC for a **fixed monthly price**, licence included. The price does not depend on hours used. For agent workloads Microsoft sells a separate hourly product (see `windows-365-agents`).
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Business | Up to 300 users, buy online | Per user per month, auto-renews | 2 vCPU/8 GB/128 GB **$36** · 4/16/128 **$56** · 8/32/256 **$108.80** | https://www.microsoft.com/en-us/windows-365/business/compare-plans-pricing |
| 2 | Enterprise | Unlimited users, Intune-managed | Per user per month | 2/8/128 **$41** · 4/16/128 **$66** · 8/32/256 **$132** (adds Hyper-V/WSL) · GPU Standard **$537** (contact sales) | https://www.microsoft.com/en-us/windows-365/enterprise/compare-plans-pricing |
| 3 | Trial | New customer, one per edition | 30 days of the 2/8 SKU, card required | $0 | both pages |
| 4 | Flex / Frontline / Reserve | Shared or temporary Cloud PCs | Not priced on these pages | null | enterprise page |
## Gotchas
1. **Per-user licence:** 50 PCs used 8 h/day cost the same as 50 PCs used 24×7.
2. **No agent or computer-use API.** Provisioning goes through Intune or the admin center and takes minutes to hours.
3. Enterprise may need extra prerequisite licences (Intune / Entra), which are not listed on the page and not captured.
## Worked example
Workload: 4 vCPU / 8 GiB → the 4 vCPU / 16 GB SKU (the 2 vCPU SKU is too small). 50 concurrent users.
| Regime | Maths | Monthly |
|---|---|---|
| Business 4/16 | 50 × $56 | **$2,800** |
| Enterprise 4/16 | 50 × $66 | $3,300 |
| Snapshots / egress | not billed separately | $0 |
Sources: https://www.microsoft.com/en-us/windows-365/business/compare-plans-pricing · https://www.microsoft.com/en-us/windows-365/enterprise/compare-plans-pricing