# Microsoft Dev Box: pricing regimes (as of 2026-09-28, RETIRING)
Dev Box provides Windows 11 Enterprise developer workstations. **It is retiring.** The closing-down period began 2026-09-14 and the service retires 2028-09-18. Microsoft recommends Windows 365 and advises against new long-lived dependencies.
**No prices can be verified from an official public source:**
- The pricing page shows `$-` without sign-in.
- The public Retail Prices API returns no Dev Box meters (checked 2026-09-28).
- The card therefore carries **null** prices.
## Regime table
| # | Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|---|
| 1 | Hourly compute + monthly storage, with a monthly cap | Default | Storage fee from creation until deletion, plus compute per active hour. Billing stops when the SKU's max monthly price is reached | **Unpublished (signed-in only)**. 2023 GA press figures, third-party and stale: $138.20/month max for the smallest 8 vCPU/32 GB/256 GB SKU, $628.80 for 32 vCPU/128 GB/2 TB, storage $19-152/month | https://learn.microsoft.com/en-us/azure/dev-box/dev-box-retirement-guide, https://devclass.com/2023/07/11/microsoft-hits-ga-with-dev-box-already-in-use-internally-but-pricey-for-the-rest-of-us/, https://infragap.com/tools/microsoft-dev-box/ |
| 2 | Hibernated / stopped | Hibernation or stop | Storage keeps billing, compute stops | Unpublished | same |
| 3 | Prerequisite licences | Every user | Per user: Windows 11 Enterprise + Intune + Entra ID P1 (for example M365 E3) | Not encoded; often more than compute | https://infragap.com/tools/microsoft-dev-box/ |
| 4 | Sizes | SKU choice | Fixed presets | 8, 16 or 32 vCPU with 4 GB/vCPU; 256 GB to 2 TB premium SSD | same |
## Gotchas
1. Retiring: remaining workloads are deleted after 2028-09-18.
2. The smallest SKU is 8 vCPU / 32 GB, so a 4 vCPU need is overprovisioned.
3. Per-user licence prerequisites dominate the cost for small teams.
4. Not suited to agents: seat-based, provisioned through a developer portal, no agent API.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days (8,800 h), 30% CPU, 50 GiB snapshots, 100 GiB egress.
**Cannot be priced from official sources.** Illustration only, using the stale 2023 third-party cap: if every one of 50 smallest dev boxes hit its $138.20 cap, compute + storage would be about 50 × $138.20 ≈ **$6,910/month**, plus per-user licences. This figure is not encoded in the card.
Sources: https://azure.microsoft.com/en-us/pricing/details/dev-box/ · https://learn.microsoft.com/en-us/azure/dev-box/dev-box-retirement-guide · https://prices.azure.com/api/retail/prices · https://infragap.com/tools/microsoft-dev-box/ · https://devclass.com/2023/07/11/microsoft-hits-ga-with-dev-box-already-in-use-internally-but-pricey-for-the-rest-of-us/