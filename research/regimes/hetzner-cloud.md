# Hetzner Cloud: pricing regimes (as of 2026-09-28)
Hetzner Cloud sells fixed-size KVM servers. Each one has an **hourly price plus a monthly cap**: bill =
min(started hours × hourly, cap) per server per calendar month. **Every started hour is billed in full.** A server
is billed from creation until **deletion**, and powered-off servers pay 100%. There are no plans, seats, free tier,
spot or commitment discounts. What changes the bill is the server line (shared cost-optimized CX/CAX, shared
regular CPX, dedicated CCX), the region group (EU / US / Singapore), when the server was ordered (legacy price
before 2026-06-15), and add-ons (IPv4, backups, snapshots, volumes, traffic overage).
All $ figures are Hetzner's own **USD list prices**, for accounts whose currency is USD. EUR accounts pay the EUR
list, which is not an FX conversion (e.g. CPX32 EU €0.0569/h, cap €35.49). An account's currency cannot be changed.
Prices exclude VAT and IPv4. Source for every server price is the official 15 June 2026 price-adjustment table:
https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/ (last changed 2026-07-08).
4 vCPU / 8 GiB reference: CX33 EU $0.0160/h (out of stock) · CAX21 EU $0.0200/h (arm64, out of stock) ·
**CPX32 EU $0.0673/h (cap $41.99)** · CPX31 US $0.1178/h · CPX32 SIN $0.0929/h · CCX23 (4/16, dedicated) EU $0.1626/h.
## Regime table
| Regime | When it applies | How billed | Numbers (USD, current = since 2026-06-15) | Source |
|---|---|---|---|---|
| Shared Cost-Optimized x86 (CX), EU | Cheapest line, older Intel/AMD hardware, NBG1/HEL1 only | Hourly + monthly cap | CX23 2/4/40 $0.0104/h cap $6.49 · CX33 4/8/80 $0.0160 cap $9.99 · CX43 8/16/160 $0.0296 cap $18.49 · CX53 16/32/320 $0.0561 cap $34.99. Every type **"not available"** on 2026-09-28 | price-adjustment page; https://www.hetzner.com/cloud/cost-optimized |
| Shared Cost-Optimized ARM (CAX), EU | arm64 (Ampere Altra) only | Hourly + cap | CAX11 2/4/40 $0.0112 cap $6.99 · CAX21 4/8/80 $0.0200 cap $12.49 · CAX31 8/16/160 $0.0400 cap $24.99 · CAX41 16/32/320 $0.0777 cap $48.49. "not available" on 2026-09-28 | same |
| Shared Regular Performance (CPX), EU | Newer AMD, NBG1/HEL1 | Hourly + cap | CPX22 2/4/80 $0.0368 cap $22.99 · **CPX32 4/8/160 $0.0673 cap $41.99** · CPX42 8/16/320 $0.1314 cap $81.99 · CPX52 12/24/480 $0.1907 cap $118.99 · CPX62 16/32/640 $0.2452 cap $152.99 | price-adjustment; https://www.hetzner.com/cloud/regular-performance |
| Shared Regular (CPX), US | ASH1 (Virginia) / HIL1 (Oregon). Sizes differ from EU | Hourly + cap | CPX11 2/2/40 $0.0328 cap $20.49 · CPX21 3/4/80 $0.0601 cap $37.49 · **CPX31 4/8/160 $0.1178 cap $73.49** · CPX41 8/16/240 $0.2267 cap $141.49 · CPX51 16/32/360 $0.4479 cap $279.49 | same |
| Shared Regular (CPX), Singapore | SIN1 | Hourly + cap | CPX12 1/2/40 $0.0288 cap $17.99 · CPX22 $0.0497 cap $30.99 · **CPX32 $0.0929 cap $57.99** · CPX42 $0.1763 cap $109.99 · CPX52 $0.2540 cap $158.49 · CPX62 $0.3253 cap $202.99 | same |
| Dedicated vCPU General Purpose (CCX), EU | Dedicated threads, NBG1/HEL1; RAM fixed 4 GB/vCPU | Hourly + cap | CCX13 2/8/80 $0.0809 cap $50.49 · **CCX23 4/16/160 $0.1626 cap $101.49** · CCX33 8/32/240 $0.2612 cap $162.99 · CCX43 16/64/360 $0.5216 cap $325.49 · CCX53 32/128/600 $1.0088 cap $629.49 · CCX63 48/192/960 $1.6138 cap $1,006.99 | price-adjustment; https://www.hetzner.com/cloud/general-purpose |
| Dedicated (CCX), US | ASH1/HIL1 | Hourly + cap | CCX13 $0.0817 cap $50.99 · CCX23 $0.1650 cap $102.99 · CCX33 $0.2660 cap $165.99 · CCX43 $0.5280 cap $329.49 · CCX53 $1.0184 cap $635.49 · CCX63 $1.6420 cap $1,014.49 | same |
| Dedicated (CCX), Singapore | SIN1 | Hourly + cap | CCX13 $0.1017 cap $63.49 · CCX23 $0.2051 cap $127.99 · CCX33 $0.3301 cap $205.99 · CCX43 $0.6442 cap $401.99 · CCX53 $1.2332 cap $769.49 · CCX63 $1.9607 cap $1,223.49 | same |
| **Legacy (grandfathered) price** | Servers ordered before 2026-06-15 08:00 CEST and never rescaled | Hourly + cap at the April-2026 level | e.g. EU CPX32 $0.0256 cap $15.99 · EU CCX23 $0.0593 cap $36.99 · US CPX31 $0.0400 cap $24.99 · US CCX23 $0.0641 cap $39.99 · SIN CPX32 $0.0617 cap $38.49 · CX33 $0.0128 cap $7.99 (full "old" column in the card's legacy-* modes). Lost on rescale (up or down), restore of a deleted server, or transfer to a project in another currency. Kept on rebuild and same-currency transfer | price-adjustment page; https://docs.hetzner.com/cloud/billing/faq/ |
| Every-started-hour rounding | Always | ceil(hours) per server; cap reached at about cap/hourly ≈ 624 h | 5-minute server = 1 h. CPX32: 1 h = $0.0673 | billing FAQ |
| Monthly cap (automatic always-on discount) | Server exists more than ~624 h in the month | Pays the cap instead of 730 × hourly | CPX32 $41.99 vs 730 × 0.0673 = $49.13 (−14.5%) | billing FAQ |
| Powered off | Server stopped but not deleted | **Billed 100%** (resources stay allocated) | same as running | billing FAQ |
| Snapshot + delete | Long idle | Snapshot billed per **compressed** GB-month, pro-rata; server not billed after deletion | €0.0143/GB-mo (**third-party only**: costgoat.com); USD rate not found on official pages. Default limit 30 snapshots | billing FAQ; https://costgoat.com/pricing/hetzner |
| Backups | Opt-in per server | Flat **+20% of the server price**, 7 daily slots, deleted with the server | CPX32 kept all month: +$8.40 | billing FAQ |
| Primary IPv4 | Any server with public IPv4 | Per existing IP, even unassigned; hourly with monthly cap | **$0.0010/h, cap $0.60/mo** (€0.0008/h, €0.50/mo). IPv6 free | https://docs.hetzner.com/general/infrastructure-and-availability/ipv4-pricing/, https://docs.hetzner.com/cloud/servers/primary-ips/overview/ |
| IPv6-only / private-only server | No inbound IPv4 needed | Omit the Primary IPv4 at creation | Saves $0.60/server-month | primary-ips overview; billing FAQ |
| Floating IPs | Failover addresses | Monthly, pro-rata | IPv4 $3.50/mo (€3.00), IPv6 $1.50/mo (€1.00) | ipv4-pricing page |
| Included traffic | Per server per month, outgoing only; ingress + same-zone free | Pooled? Not stated; given per server | EU: CX/CAX/CPX 20 TB; CCX 20/20/30/40/50/60 TB. US: CPX 1/2/3/4/5 TB; CCX 1/2/3/4/6/8 TB. SIN: CPX 0.5/1/2/3/4/5 TB; CCX 1/2/3/4/6/8 TB | product pages (rendered 2026-09-28); https://docs.hetzner.com/robot/general/traffic/ |
| Traffic overage | Beyond the included amount, 100 MB blocks | Per TB | EU/US **€1 ($1.20)/TB** (Hetzner traffic doc). Singapore **$8.49/TB** (official SIN page; costgoat says €7.40 / $8.72, which conflicts on USD) | https://docs.hetzner.com/robot/general/traffic/, https://www.hetzner.com/cloud-singapore/ |
| Volumes (block storage) | Extra disk, up to 10 TB | Per GB-month | €0.0572/GB-mo (**third-party only**, costgoat); USD unknown | costgoat |
### The two 2026 price increases
1. **2026-04-01** (announced 2026-02-23): "price changes will affect both existing products and new orders"
   (https://www.hetzner.com/pressroom/statement-price-adjustment/). The official statement has no table. Third
   parties report about +30-37% in EUR on cloud servers (e.g. CX23 €2.99→€3.99, CCX13 €11.99→€15.99, cloudtally.eu)
   and +30% EUR on volumes and snapshots (snapshots €0.011→€0.014). The **pre-April numbers are third-party only.**
2. **2026-06-15 08:00 CEST**: applies **only to new orders and rescales**. The official table's "old" column is the
   April level. USD hourly increases: CX +25-32%, CAX +27-35%, CPX +51% (SIN) to +204% (US), and CCX +65% (SIN) to
   +174% (EU). Examples: EU CPX32 $0.0256→$0.0673 and EU CCX23 $0.0593→$0.1626. Orders placed before 15 June but
   delivered after it keep the old price. **The June prices are in effect today (2026-09-28)** for anything you
   buy now. IPv4 (last changed 2023-04-13) was not part of the June table.
## Gotchas
1. **Hourly rounding kills short sessions.** Hetzner has no per-second billing. A 2-minute CI or agent run pays a full hour, so 100 short sandboxes a day means 100 billed hours. Reusing a pool of long-lived servers is the only efficient pattern.
2. **Stopping does not stop billing.** Powered-off servers are billed like running ones. To pause cost you must snapshot, delete, and later recreate from the snapshot. Then you pay the snapshot storage, and recreating takes boot time plus a new hour.
3. **The cheap line is out of stock.** CX and CAX (the "$4-10/month" Hetzner people quote) all showed "not available" on 2026-09-28. Hetzner describes their supply as limited. What you can actually order today is CPX (4.2x CX33's price for 4/8 in EU) or CCX.
4. **The June 2026 hike roughly tripled CPX/CCX, but not for existing servers.** Legacy servers keep the April price until you rescale them. Rescaling even *down* moves them to the new price, so resizing old servers is expensive.
5. **The region changes the price a lot.** 4 vCPU/8 GB shared costs $0.0673 (EU), $0.0929 (SIN) or $0.1178 (US). In the US, dedicated CCX23 (4/16) at $0.1650 is only 40% more than shared CPX31. US sizes differ too (CPX21 = 3 vCPU).
6. **Included traffic is regional.** EU servers get 20 TB each, US CPX 1-5 TB, SIN 0.5-5 TB. Singapore overage is $8.49/TB, about 7x EU/US.
7. **IPv4 costs extra.** Price tables exclude IPv4 ($0.60/month), and the IP is billed even when unassigned. Hetzner product pages show "Price incl. IPv4", so a product page and a docs table can disagree by $0.60.
8. **Currency is locked at signup.** EUR and USD lists are separate price points, not FX. Moving a legacy server to a project in another currency triggers the new price.
9. **Snapshot and volume prices did not render on official pages** (JS). The €0.0143 and €0.0572/GB-month figures are third-party. Snapshots are billed on compressed size.
10. **No hard spend cap.** Cost alerts and traffic notifications (75%/100%) are informational only.
11. **Default resource limits per project** (server count) must be raised by support ticket before running 50 servers. Exact defaults were not verified.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 server-hours**, 30% CPU (irrelevant:
allocated billing), 50 GiB snapshots retained, 100 GiB egress (inside every region's included traffic, so $0).
"Delete after shift" means 50 servers are created each morning from a snapshot and deleted at night, which assumes
the project limit has been raised to 50 servers. IPv4 is created with each server, so 8,800 h × $0.0010 = $8.80.
Snapshots: 50 GiB × €0.0143 ≈ €0.72/month (third-party rate).
| Regime | Feasible? | Monthly total (USD, excl. VAT) |
|---|---|---|
| CPX32 EU, delete after shift, exactly 8 billed h/day | Yes | 8,800 × 0.0673 = $592.24 + $8.80 IPv4 = **$601.04** (+ ~€0.72 snapshots) |
| same, but boot + snapshot pushes each day into a 9th started hour | Yes | 9,900 × 0.0673 = $666.27 + 9,900 × 0.0010 = **$676.17** |
| CPX32 EU, keep 50 servers all month (powered off at night) | Yes | 50 × $41.99 cap = $2,099.50 + 50 × $0.60 = **$2,129.50** |
| same + backups | Yes | $2,099.50 × 1.2 + $30 = **$2,549.40** |
| CX33 EU (if restocked), delete after shift | Not orderable today | 8,800 × 0.0160 + $8.80 = **$149.60** |
| CAX21 EU arm64 (if restocked) | arm64 only; not orderable today | 8,800 × 0.0200 + $8.80 = **$184.80** |
| CPX32 SIN | Yes | 8,800 × 0.0929 + $8.80 = **$826.32** |
| CPX31 US | Yes | 8,800 × 0.1178 + $8.80 = **$1,045.44** |
| CCX23 EU dedicated (4/16) | Yes | 8,800 × 0.1626 + $8.80 = **$1,439.68** |
| Legacy CPX32 EU (servers already owned before 15 June, kept all month) | Only if you already hold 50 such servers | 50 × $15.99 + $30 = **$829.50**. Deleting them loses the price, so they must stay alive |