# Verify: boxd (2026-09-28)
Official site: **boxd.sh** (boxd.dev does not resolve). Re-fetched: https://boxd.sh/pricing (raw HTML incl. EUR/USD toggle data and
schema.org offers), https://boxd.sh/faq/, https://docs.boxd.sh/guides/resources, https://docs.boxd.sh/guides/egress,
https://docs.boxd.sh/llms-full.txt (suspend-resume guide, quotas).
| Item | Result |
|---|---|
| List currency | confirmed: EUR is the default toggle; USD is a separate published list (schema.org Offer priceCurrency USD 0.059 alongside EUR 0.049), not an FX conversion |
| EUR 0.049 vCPU-h / 0.015 GiB-h RAM / 0.0001 GiB-h disk | confirmed (pricing rate card + FAQ) |
| USD 0.059 / 0.018 / 0.00012 (card vcpu_h, ram_gib_h) | confirmed (USD FAQ variant embedded in page) |
| disk/snapshot_gib_month 0.0876 = 0.00012 x 730 | confirmed (arithmetic) |
| USD/EUR ratio ~1.2 | confirmed (0.059/0.049 = 1.204; 0.018/0.015 = 1.20; 0.00012/0.0001 = 1.20) |
| vCPU billed on full size, only while running; nothing in standby/hibernated/stopped | confirmed (FAQ) |
| RAM billed on resident memory, sampled per second, while running OR in standby (-> ram_basis active, paused_ram_billed true) | confirmed (pricing FAQ). Docs call standby "near zero" -> conflict persists, noted |
| Disk billed on written bytes in every state | confirmed (FAQ) |
| Hibernated = disk only | confirmed (FAQ) |
| Auto-suspend off by default; auto-hibernate after 4 h without inbound TCP/UDP | confirmed (docs resources + suspend-resume) |
| Idle timers watch network, not CPU | confirmed (docs) |
| Wake from hibernate ~85 ms | confirmed in docs; pricing FAQ says "sub-millisecond" -> regimes wording clarified |
| Default example: EUR 0.22/h full RAM, 0.13/h at 2 GiB + 20 GiB disk; USD $0.26 / $0.16 | confirmed (0.262 / 0.1564) |
| Shapes 1/4, 2/8, 4/16 in calculator; 2/8 default; larger via contact@boxd.sh | confirmed |
| Quota 50 machines/org, includes hibernated/forks/goldens; 2 without payment method; raised same day | confirmed (docs resources) |
| Runtime unlimited (max_session_h null); 10 checkpoints/machine; 3 raw TCP/UDP forwards | confirmed (docs resources) |
| $30/EUR 30 credits on adding a payment method; auto top-up $20/EUR 20, changeable | confirmed (FAQ) |
| No monthly plan, no per-seat fee; prices exclude VAT | confirmed |
| Custom: bigger machines, volume pricing, self-host/BYOC, EU residency, SSO+audit logs; no prices | confirmed |
| Egress price | confirmed unpublished (pricing, FAQ, egress-control guide have none) |
| IPv4: not dedicated | confirmed per docs ("dedicated SSH port on boxd's shared proxy IP"); boxd.sh/faq says "a public IPv4" -> caveat added to card + regimes |
| Snapshot / backup / volume storage prices | confirmed unpublished |
| min_billed_seconds 0 ("metered every second") | confirmed (no minimum published) |
| Regions ["eu"] | unverifiable (docs name no region; "EU data residency" is listed as a Custom feature) |
| Worked example A 3,348.38; A' 2,714.78; B 5,020.38; C 7,337.18; E 2,309.98; F EUR 2,784.45 | confirmed (recomputed). C assumes standby persists overnight; whether auto-hibernate later moves a standby machine to hibernate is unverifiable |
| Gotcha 1 (standby 554 h > 176 running h cost: $79.78 vs $66.88) | confirmed |
Corrections:
- regimes/boxd.md: hibernate wake wording (85 ms docs vs "sub-millisecond" pricing FAQ); IPv4 row notes FAQ conflict.
- No rate, plan, or arithmetic errors found.