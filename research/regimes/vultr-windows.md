# Vultr Cloud Compute (Windows Server): pricing regimes (as of 2026-09-28)
Vultr runs Windows Server 2016–2025 (Standard/Datacenter, Core or GUI) on its normal Cloud Compute VMs.
- **Billing:** hourly with a monthly cap. The base plan price is official (public API `/v2/plans`).
- **Windows licence:** "not included in Vultr's base monthly price and require[s] an additional fee based on your selected Compute plan". The amount is not on any page we could read, because vultr.com pricing pages return a Cloudflare bot challenge to every fetcher we tried.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Hourly with monthly cap | All Cloud Compute | "The minimum billing unit is one hour". Billed "up to 672 hours per month". Hourly = monthly / 672 | vc2 1 vCPU/2 GB/55 GB **$10/mo** · 2/2/65 $15 · 2/4/80 $20 · **4/8/160 $40** · 6/16/320 $80 · 8/32/640 $160 · 16/64/1280 $320 · 24/96/1600 $640. vhp 4/8/180 (High Performance) $48 | https://docs.vultr.com/support/platform/billing/how-am-i-billed-for-my-servers, https://api.vultr.com/v2/plans |
| 2 | Windows licence | Windows OS image | Extra fee per plan | **Not published officially (null).** Third-party: +$16/mo on the $10 plan, +$128/mo on the $160 plan (≈ $16 per vCPU-month) | https://docs.vultr.com/support/platform/billing/is-a-windows-license-included-in-the-monthly-price, https://checkthat.ai/brands/vultr/pricing |
| 3 | Stopped instances | Powered off but not destroyed | Still billed | same as running | docs (billing) |
| 4 | Bandwidth | Per plan allowance | Included allowance, e.g. 4,096 GB on vc2-4c-8gb. Overage not verified | null | API |
## Gotchas
1. **The card underprices Windows.** It carries the base price only (`windows_vcpu_h` null). Add the unverified licence of about $16/vCPU-month.
2. **Official sources disagree on the hourly rate.** The API field `hourly_cost` ($0.055 for $40, i.e. /730) does not match the billing doc (/672 → $0.0595). The card follows the billing doc.
3. **Destroy instances to stop billing.** Stopping them does not.
## Worked example
Workload: 4 vCPU / 8 GiB → vc2-4c-8gb ($40/mo, $0.0595/h). 50 concurrent × 8 h × 22 days = 8,800 h. 100 GiB egress is inside the allowance. Snapshots are not priced here.
| Regime | Maths | Monthly |
|---|---|---|
| Create/destroy per session (card) | 8,800 × $0.059524 | **$523.81** + licence |
| Keep 50 instances all month | 50 × $40 (cap) | $2,000 + licence |
| + Windows licence (third-party ≈ $16/vCPU-mo; proration unknown) | 50 × 4 × $16 if full-month | ≈ +$3,200 (full month) or ≈ +$838 prorated by hours |
Sources: https://docs.vultr.com/support/platform/billing/is-a-windows-license-included-in-the-monthly-price · https://docs.vultr.com/support/platform/billing/how-am-i-billed-for-my-servers · https://api.vultr.com/v2/plans · https://checkthat.ai/brands/vultr/pricing