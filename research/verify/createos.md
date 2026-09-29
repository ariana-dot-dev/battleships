# Verify: createos (2026-09-28)
Sources re-fetched: https://createos.sh/products/sandbox, https://createos.sh/pricing/sandbox, https://createos.sh/pricing,
https://createos.sh/docs/Sandbox/Limits, https://createos.sh/docs/Account-Billing/Pricing/, https://createos.nodeops.network/pricing.
| Item | Result |
|---|---|
| vCPU $0.03616363/vCPU-h ($0.0000100455/s), RAM $0.01159025/GiB-h ($0.0000032195/GB-s), storage $0.0001584/GB-h ($0.000000044/GB-s), egress $0 | confirmed (product page, pricing/sandbox, Limits doc, Pricing doc) |
| Size hours (vcpu x 0.03616363 + GiB x 0.01159025), 11 shapes incl. 1 vCPU / 0.25 GB | confirmed: pricing/sandbox calculator lists exactly these 11 shapes |
| Paused: vCPU stops, RAM + storage keep billing (paused_ram_billed true) | confirmed on product page, pricing/sandbox FAQ and Limits doc |
| Default disk 10 GB/sandbox, up to 60 GB, storage billed all month whether running or paused | confirmed (pricing/sandbox calculator + examples $2.33 / $172.05 / $116.37 reproduce exactly); added to mode note |
| Per-plan caps: concurrency 1/5/20/30, 10/50/200/300 per day, disk 10/30/50/60 GiB, largest shape 1/1, 4/4, 8/8, 8/16 | confirmed (Limits doc; product-page FAQ still states the concurrency caps) |
| Plan tiers Free / Beginner $10-50 / Pro $75-200 / Enterprise $200+, credits 500 / 1,000-5,000 / 7,500-20,000 / 20,000+, top-up 1.2x/1.2x/1.5x/5x | confirmed on Pricing doc table |
| New pricing page "No tiers, no plan gate, no minimums ... no annual lock-in" | NEW conflict with the Limits/Pricing docs; card keeps documented caps, caveat added |
| Beginner (annual) $8 / Pro (annual) $60 plans | corrected: removed. The "20% off annual" line is on createos.nodeops.network/pricing, which lists Deploy plans (Free / Plus $49 / Pro $149), not Sandbox; Sandbox pricing page says no annual lock-in. The engine would otherwise auto-pick an unpublished cheaper plan |
| Deploy-platform ~10x cheaper rate table ($0.00000095/vCPU-s) on createos.nodeops.network/pricing | not present any more (page now only lists Deploy plans); caveat rewritten. All Sandbox pages agree on the rates above |
| 500 free credits for new accounts | confirmed; 1 credit = $0.01 unverifiable on Sandbox pages (matches plan math) |
| 50 GiB default bandwidth quota per sandbox, recharge price | quota confirmed (Limits doc); recharge price unverifiable |
| Auto-pause 60-86,400 s, off by default; no max session length | confirmed (Limits doc) |
| SOC 2 | corrected: soc2 null -> true (site footer "SOC 2 Type II certified, ISO 27001 certified") |
| Engine: sizes basis alloc, Free not trial_only (top-ups allowed, usable long-term), Enterprise fee null + sales | confirmed correct interpretation |
Corrections: removed 2 annual plans; soc2 true; mode note + caveats (tier conflict, disk default, nodeops table gone); regime md rows updated.