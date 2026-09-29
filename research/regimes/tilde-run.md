# Tilde.run: pricing regimes (as of 2026-09-28): DISCONTINUED, never priced
Tilde.run was built by Treeverse, the lakeFS team. Every agent run was an isolated container with a lakeFS branch
FUSE-mounted at `/sandbox`. Exit 0 committed all writes atomically. A failure, cancel or timeout rolled them back.
Egress went through a default-deny proxy, and agents got RBAC with human approval gates.
- **Launched:** 2026-05-06, Show HN by Oz Katz (https://news.ycombinator.com/item?id=48037724).
- **Shut down:** announced 2026-07-01 in the lakeFS blog post "We recently shut down tilde.run."
  (https://lakefs.io/blog/we-recently-shut-down-tilde-run/). The work was folded into lakeFS Mount.
  `tilde.run`, `tilde.run/pricing` and `docs.tilde.run` now all redirect to that post.
## Regime table
| Regime | When it applies | How billed | Numbers | Source URL |
|---|---|---|---|---|
| Private preview | 2026-05-06 → ~2026-07-01; signups approved by an admin (24-48 h) | "Free to start". No metering was published | $0 (schema.org Offer price "0" in homepage markup) | https://web.archive.org/web/20260611184943/https://tilde.run/?ref=bogdandeac.com, https://web.archive.org/web/20260506200125/https://docs.tilde.run/reference/api/ |
| Planned paid service | Never launched | Founder on HN: "very likely be based on consumption and should be competitive to similar solutions" | null | https://news.ycombinator.com/item?id=48037724 |
| /pricing page | Nav link present by 2026-06-11 | Content never captured (no Wayback or archive.ph copy; web search finds none) | null | http://web.archive.org/cdx/search/cdx?url=tilde.run&matchType=domain |
| Current | After ~2026-07-01 | Service unavailable | n/a | https://lakefs.io/blog/we-recently-shut-down-tilde-run/ |
## Gotchas
1. **The product no longer exists.** Anything built on the Tilde CLI, SDK (`tilde-sdk`) or API has to migrate. lakeFS
   points users to lakeFS Mount, which is an enterprise product with sales-led pricing.
2. **Rates were never published**, so there are no historical rates to model. Any number would be invented.
3. The "snapshot" was data versioning (lakeFS commits of the mounted repository), not a container or VM snapshot.
   The container root filesystem was ephemeral.
4. Container isolation had capabilities dropped and a per-sandbox netns. The runtime and region were never disclosed.
## Worked example
Workload: 4 vCPU / 8 GiB, 50 concurrent × 8 h/day × 22 days = 8,800 h, 30% CPU, 50 GiB snapshots, 100 GiB egress.
**This can't be priced.** No rates were ever published, and the service is shut down. While the preview was running, usage
was free for approved preview users. Per-sandbox resource caps and concurrency limits were never documented, so it's
unknown whether 50 concurrent 4 vCPU / 8 GiB sandboxes were even allowed. Monthly total: **n/a (null)**.