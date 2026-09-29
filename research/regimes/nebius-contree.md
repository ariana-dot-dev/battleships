# Nebius ConTree (Token Factory "Sandboxes"): pricing regimes (as of 2026-09-28)
ConTree comes from Nebius AI R&D. It is a VM-isolated execution service with Git-like branching: **each command runs in its own microVM**, and
the resulting filesystem is committed as an immutable image that later commands can branch from.
- Launched as early access on **2026-02-19** (https://contree.dev/blog/contree-eap-announcement/; first blog post 2026-01-12).
- Since **2026-05-19** it has been the **Sandboxes (Beta)** product inside Nebius Token Factory (https://contree.dev/blog/contree-joins-token-factory/).
- Launch channel was its own blog; no HN or Product Hunt post was found.
**Current price: free.** "Free while in beta — runs don't consume your credits" (https://tokenfactory.nebius.com/sandboxes/about).
No post-beta prices are published. The homepage says "Pay per execution, not idle", and each API operation result includes a `cost` field.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Sandboxes Beta | Nebius account + approved beta request | Free (list); runs don't consume Token Factory credits | $0; 50 simultaneously running operations (raisable on request) | https://tokenfactory.nebius.com/sandboxes/about, https://docs.tokenfactory.nebius.com/sandboxes/overview.md |
| Execution (non-disposable) | Default `POST /instances` | Free in beta; microVM exists only for the command; filesystem diff saved as a new image | Startup 0.4–2 s (cached rootfs); writable layer default 12 GiB; output capped at 10 MiB per stream | https://contree.dev/, https://eu-north.nebius.computer/static/api.yaml |
| Disposable execution | `disposable: true` | Free in beta; no snapshot stored | — | API spec |
| Image / checkpoint storage | Every non-disposable run | Free in beta | Untagged, unreferenced images may be deleted after 180 days | overview.md |
| Inspect (ls/cat/grep/download) | Browsing any image | "Zero compute cost" (no VM) | — | https://contree.dev/ |
| EAP (pre-May 2026) | Legacy ConTree tokens | Free early access; tokens valid until expiry | — | contree-joins-token-factory blog |
| Post-beta GA | Future | Unpublished ("pay per execution") | null | https://contree.dev/ |
| Egress | Outbound, if enabled | Not published | null | — |
## Gotchas
1. **It's a batch execution model, not a long-lived sandbox.** There are no inbound ports, SSH or services, and memory/processes are never preserved. Only the filesystem carries over between commands.
2. **You can't choose instance size.** The API has no vCPU/RAM parameters, so a 4 vCPU / 8 GiB workload shape can't be guaranteed.
3. **Beta limits:** 50 concurrent operations; access requires approval; no personal or sensitive data allowed; untagged images may be garbage-collected after 180 days.
4. **Every non-disposable run stores a diff snapshot.** It's free now but likely billable after beta. Use `disposable` for tests and linters.
5. **Per-operation timeout:** the API spec example shows a 3600 s maximum (token-level limit, unverified). Long agent sessions are chains of commands.
6. **Region is unclear.** The API spec is served from `eu-north.nebius.computer`; EU is inferred, not documented.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = **8,800 sandbox-hours**, 30% CPU, 50 GiB snapshots, 100 GiB egress.
- Closest analogue: 50 agents each running a chain of commands through an 8-hour shift. State persists as filesystem images, and compute is only consumed while commands run.
- Concurrency: 50 fits the beta limit of 50 simultaneous operations exactly.
- Size: 4 vCPU / 8 GiB cannot be requested, since the VM shape is platform-defined.
- Snapshots: every run's filesystem is kept as images. Storage is free in beta, and untagged images are garbage-collected after 180 days.
| Regime | Feasible? | Monthly total |
|---|---|---|
| Sandboxes Beta | Partly: concurrency 50 OK; shape not selectable; no services, inbound traffic or memory state; approval needed | **$0** (compute, snapshots). Egress price unpublished (treated as $0). |
| Post-beta | Unknown | **unknown** (pricing unpublished) |