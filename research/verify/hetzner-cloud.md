# Verify: hetzner-cloud (2026-09-28, independent verifier)
Sources re-fetched live: docs.hetzner.com price-adjustment table, cloud/billing/faq, ipv4-pricing,
cloud/servers/primary-ips/overview, robot/general/traffic, hetzner.com/cloud-singapore.
| Item | Result | Note |
|---|---|---|
| 15 June 2026 08:00 CEST effective date; applies to new orders + rescales only | confirmed | price-adjustment page |
| All new-price rows (hourly + monthly cap): EU CX/CAX/CPX/CCX, US CPX/CCX, SIN CPX/CCX | confirmed | every number in the card's 7 current modes matches the table |
| All legacy ("old") rows in the 6 legacy-* modes | confirmed | matches table. Legacy CX/CAX old prices (e.g. CX33 $0.0128 / $7.99) exist on the page but have no legacy mode (the regime file quotes CX33 correctly) |
| Prices excl. VAT and IPv4 | confirmed | table footnote |
| Every started hour billed; monthly cap = min(hourly x h, cap) | confirmed | billing FAQ: "never exceed its monthly price cap", "always round up the hourly usage" |
| Powered-off servers billed | confirmed | billing FAQ |
| Backups = 20% of server price, 7 slots | confirmed | billing FAQ |
| Snapshots per GB-month on compressed size, pro-rata | confirmed (mechanics); price unverifiable | no rate on official static pages; EUR 0.0143 stays third-party, card null is correct |
| Primary IPv4 $0.0010/h, $0.60/mo (EUR 0.0008/h, 0.50/mo); billed even unassigned; IPv6 free | confirmed | primary-ips overview + ipv4-pricing + billing FAQ |
| Floating IPv4 $3.50 / EUR 3.00 per month | confirmed | ipv4-pricing |
| Floating IPv6 $1.50 / EUR 1.00 | unverifiable | not on the ipv4-pricing page as fetched |
| Included traffic: EU 20 TB (CX/CAX/CPX), CCX 20-60 TB; US CPX 1-5 TB, CCX 1-8 TB; SIN CPX 0.5-5 TB, CCX 1-8 TB | confirmed | robot/general/traffic |
| Overage EUR 1 ($1.20)/TB, 100 MB blocks | confirmed | traffic doc + billing FAQ |
| Singapore overage $8.49/TB | confirmed | cloud-singapore page ("billed at $8.49 per TB"); conflicts with the traffic doc's single rate. Card note keeps both |
| CX/CAX "not available" on 2026-09-28 | unverifiable | product pages are JS-rendered |
| Volume EUR 0.0572/GB-mo | unverifiable | third-party only (card null, correct) |
The reference
workload gives CPX32 EU $592.24 (= regime; IPv4 excluded with ipv4=0), and 50 always-on servers give $2,099.50 (= 50 x cap).
Corrections: none.