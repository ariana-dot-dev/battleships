# Deno Sandbox — pricing regimes (as of 2026-11-08)
**Closed to new customers.** "Update November 2026: Deno Sandbox is no longer included in Deno Deploy plans and is not
available to new customers." (https://deno.com/blog/introducing-deno-sandbox). The card flags every mode and plan
`legacy`, so the engine never prices it.

Deno Sandbox is a Firecracker microVM product. Shape (https://docs.deno.com/sandbox/): **2 vCPU**, 768 MB to 4096 MB
memory (1.2 GB default), 10 GB ephemeral disk, lifetime up to 30 minutes. No CPU option is documented.
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| New customers | Any new organization | Not available | n/a | https://deno.com/blog/introducing-deno-sandbox |
| Existing organizations – concurrency | Pre-release default | Per organization | 5 concurrent sandboxes; email deploy@deno.com for more | https://docs.deno.com/sandbox/ |
| Launch rates (Feb 2026) | Only sandbox rates Deno ever published | CPU time used; memory allocated | $0.05/h CPU time (40 h with Pro); $0.016/GB-h memory (1,000 GB-h with Pro); $0.20/GiB-month volumes (5 GiB with Pro) | https://deno.com/blog/introducing-deno-sandbox |
| Deno Deploy meters | Deploy apps only | Active CPU; memory time; egress | $0.10/CPU-h; $0.025/GiB-h; egress $0.20/GiB over allowance. The page does not name sandboxes, so the card does not use these rates. | https://deno.com/deploy/pricing |
| Lifetime | Every sandbox | `session` (default) or a duration timeout; `extendTimeout()` | up to 30 minutes; longer = promote to a Deploy app | https://docs.deno.com/sandbox/, https://docs.deno.com/sandbox/timeouts/ |
| Volumes | Persistent block storage | Mounted at a path, or a bootable volume (from `builtin:debian-13`) used as the writable root | 300 MB to 20 GB; Chicago (`ord`) only; one sandbox at a time | https://docs.deno.com/sandbox/volumes/ |
| Snapshots | Read-only images of volumes | Boot many sandboxes; create new writable volumes from them | billing not published | https://docs.deno.com/sandbox/volumes/ |
| Ephemeral disk | Every sandbox | Included; wiped when the sandbox ends | 10 GB | https://docs.deno.com/sandbox/ |
| Regions | `ams` (Amsterdam), `ord` (Chicago) | Chosen at creation | volumes only in `ord` | https://docs.deno.com/sandbox/ |
## Gotchas
1. **Closed to new customers** since November 2026. A new team cannot choose it.
2. **2 vCPU / 4 GB ceiling** in the docs. A 4 vCPU / 8 GiB workload does not fit.
3. **30-minute lifetime.** Long work re-creates sandboxes or promotes to a Deploy app.
4. **Persistence is opt-in.** The default root disk is wiped at the end. A mounted volume or a bootable root volume keeps files (Chicago only).
5. **No current sandbox rate is published.** The earlier Pro 3 / Builder 20 per-region caps and the $0.10 / $0.025 sandbox attribution had no official source.
6. **Compliance:** Deno publishes an ISO 27001 certificate (https://deno.com/deploy/deno-iso-certificate.pdf); its scope does not name Sandbox. No current page states SOC 2 or HIPAA for Sandbox.
## Worked example
Not computed. The product is closed to new customers and has no current published rate.
