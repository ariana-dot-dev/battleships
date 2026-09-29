# Verification — novita (2026-09-28)
Sources re-fetched: https://docs.novita.ai/guides/sandbox-pricing , https://docs.novita.ai/guides/sandbox-quota-limit ,
https://docs.novita.ai/guides/sandbox-long-running , https://docs.novita.ai/guides/sandbox-overview , https://novita.ai/sandbox ,
| Item | Result |
|---|---|
| vCPU $0.0000098/s -> $0.03528/vCPU-h | confirmed (docs + landing; 8 cores = $0.0000784/s) |
| RAM $0.0000032/GiB-s -> $0.01152/GiB-h | confirmed (docs: 512 MiB $0.0000016/s, 1 GiB $0.0000032/s) |
| 4/8 = $0.23328/h; 8/8 = $0.3744/h | confirmed (landing example $0.3744; 2 vCPU+1 GiB 1 h = $0.0821 and 1 vCPU+512 MiB 5 min = $0.0034 also reproduce) |
| Allocation basis, per-second, no min, no start fee | confirmed (docs "allocation"; blog "no additional per-session startup fee") |
| RAM 512 MiB steps, 0.5–4 GiB/vCPU, vCPU 1–8 | confirmed (quota-limit) |
| Free: 5 concurrent / 1 h / 2 vCPU / 4 GiB / 20 GB | confirmed (quota-limit + landing) |
| Paid: 100 concurrent / 8 vCPU / 8 GiB / 20 GB; 3 h (docs) vs 24 h (landing) | confirmed — conflict is real on live pages; card keeps 24 h |
| Paid unlock: balance > $0 (landing) / balance or credit line (docs) | confirmed |
| Enterprise: 500 conc., 4 h, adjustable, fee unpublished | confirmed (quota-limit); SLA/"unlimited" landing claims not re-seen in this fetch — unverifiable |
| Persistent storage 60 GB free per account, then $0.00009/GB-h (= $0.0657/GB-mo) | confirmed (docs "60 GB free per account"; landing "first 60 GB included daily") |
| "measured hourly, charged daily" | corrected: "billed daily" is documented; "measured hourly" is not stated -> reworded to "billed daily; metering interval not documented" (card caveat + regimes row) |
| Templates + snapshots + paused sandboxes share storage | confirmed (docs: "Templates and Snapshots are saved as persistent storage"; overview: storage covers templates, paused sandboxes, snapshots) |
| Paused = no compute, memory+FS preserved | confirmed (overview "billing for compute stops"; "filesystem and memory state are preserved") |
| Ephemeral disk 20 GB free | confirmed |
| $100 promo credit, no card, "subject to availability" | confirmed |
| Overdue -> terminated, data lost | confirmed |
| Egress / volume / Enterprise price not published | confirmed (no line item) |
| Default timeout 5 min, cap 1 h without long_running | confirmed (sandbox-long-running) |
| Long-running examples 24 h / 168 h / 720 h | confirmed (24 h, 7 d on page; 720 h in llms-full CLI example) |
| Default on-timeout action = stop/kill | confirmed (docs: "stopped by default, or paused if you configure") |
| Card mode note "8 h+ sessions need long_running" | corrected -> "sessions > 1 h need long_running" |
| Worked example note "or 3 × <3 h sessions under Paid cap" | corrected -> without long-running the cap is 1 h, so 8 × 1 h sessions |
| Regions us-phx-1 (v2) / us-virginia-1 (v1), no price diff | confirmed |
| Blog misquotes RAM as $0.0000016/GiB/s | confirmed (blog 2026-06-30) |
| Pause ~4 s per GB RAM (legacy docs) | unverifiable (not re-found) |
| Worked example arithmetic ($2,052.86; $3.29; $24.43) | confirmed |
| Isolation tech, HIPAA/SSO, IPv4 | unverifiable (undocumented; left null/false) |