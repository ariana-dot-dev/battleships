# Amazon Bedrock AgentCore (Runtime / Code Interpreter / Browser) — pricing regimes (as of 2026-09-28)
AgentCore's consumption regimes bill **active CPU** (CPU scales to zero during I/O wait such as LLM calls) and
**peak memory consumed up to that second** (128 MB minimum), per second with a 1-second minimum. Session hardware is
fixed at 2 vCPU / 8 GB (Browser 1 vCPU / 4 GB). Rates verified in the **AWS Price List API** (AmazonBedrockAgentCore
offer, publication 2026-09-15) and on https://aws.amazon.com/bedrock/agentcore/pricing/ (2026-09-28).
## Regime table
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Code Interpreter | Managed Python/JS/TS sandbox sessions | Active vCPU-s + peak GB-s, 1 s min, 128 MB memory floor | $0.0895/vCPU-h, $0.00945/GB-h | Price List API CodeInterpreter:Consumption-based:* |
| Browser Tool | Managed headless browser sessions (1 vCPU/4 GB, 10 GB disk) | Same | $0.0895 / $0.00945; profiles at S3 Standard rates | Price List API BrowserTool:* |
| Runtime v1 microVM | Agent runtime sessions (custom container or direct code) | Same; memory **not reclaimed while idle** | $0.0895 / $0.00945 | Price List API Runtime:Consumption-based:vCPU/Memory |
| Runtime v2 consumption | New runtime generation | Same; **idle memory reclaimed after 120 s** | $0.1276 / $0.0169 (+43% / +79%) | Price List API Runtime:*-v2 (us-east-1, us-east-2, us-west-2, eu-west-1, ap-northeast-1 only) |
| Runtime v2 committed baseline | **Announced**, "launching by October 2026" | Committed baseline; mechanics unpublished | $0.0997 / $0.0132 | pricing page (not in the API yet) |
| Runtime Instances | EC2 capacity in your account (sessions persist up to 14 days; up to 20 agents per capacity-provider session) | EC2 on-demand (billed by EC2) + management fee per instance-hour | 12% of EC2 on-demand (c7i.xlarge $0.02142/h, c7g.xlarge $0.0174, m7i.xlarge $0.024192); G-series GPU 7.8% (g6.xlarge $0.062774) | Price List API Runtime:Instance-based:*:Management-Hours |
| Regions | 14 commercial regions (us-east-1/2, us-west-2, ca-central-1, eu-central-1, eu-north-1, eu-west-1/2/3, ap-northeast-1/2, ap-south-1, ap-southeast-1/2) | Identical rates | $0.0895 / $0.00945 everywhere; GovCloud us-gov-west-1 $0.1074 / $0.01134 (+20%) | Price List API (18 region files) |
| Gateway | MCP/tool gateway | Per invocation / per indexed tool | $0.005 per 1k invocations, $0.025 per 1k searches, $0.0002 per tool-index-month; VPC target data $0.006/GB | Price List API |
| Memory | Agent memory | Per event / record / retrieval | Short-term $0.25/1k events; long-term $0.75/1k records-month built-in ($0.25 custom); retrieval $0.50/1k | Price List API |
| Web Search tool | Built-in search | Per query | $0.007/query | Price List API |
| Knowledge Base | Retrieval | Per query / storage | $0.001/query ($0.004 agentic); $5/GB-month | Price List API |
| Storage / network | Direct-code deployments; container images; egress | S3 Standard; ECR; "standard EC2 data transfer rates" | 100 GB/month free then $0.09/GB | pricing page, AWSDataTransfer |
| Free tier | New AWS accounts | Credits | Up to $200 (generic AWS; no AgentCore quota) | earlier research |
## Gotchas
1. **Active-CPU is real**: an agent waiting on an LLM 70% of the time pays ~30% of the CPU price — but any background process (a watcher, a dev server) keeps CPU "active".
2. **Memory is peak-to-date**, not average; one spike to 6 GB bills 6 GB for the rest of the session (v1). v2 reclaims idle memory after 120 s but costs 79% more per GB.
3. **Hard 2 vCPU / 8 GB per session** (Browser 1/4). Bigger workloads need Runtime Instances (EC2 + 12%).
4. **No pause/snapshot** for consumption sessions; 15-minute idle timeout ends the session (adjustable), 8 h max lifetime; Runtime session storage is capped at 1 GB.
5. **Committed baseline is not purchasable yet**; its rates equal Lambda MicroVMs Graviton rates.
6. The pricing page's Instances example ("c7g.2xlarge $0.867 x 0.12") contradicts the API fee ($0.0348 = 12% of $0.29).
## Worked example
4 vCPU / 8 GiB doesn't fit one session, so model **2 sessions of 2 vCPU / 4 GB** per unit: 100 concurrent
sessions x 176 h = **17,600 session-hours**, 30% CPU active, peak memory = 4 GB (conservative). 50 GiB of state
cannot be retained (no snapshots; S3 persistence not priced). 100 GiB egress inside the free tier.
| Regime | Per session-hour | Total / month |
|---|---|---|
| Code Interpreter / Runtime v1 | 2 x 0.3 x 0.0895 + 4 x 0.00945 = $0.0915 | **$1,610.40** |
| Same, peak memory only 1 GB | 0.0537 + 0.00945 = $0.06315 | **$1,111.44** |
| Runtime v2 consumption (memory never idle-reclaimed) | 2 x 0.3 x 0.1276 + 4 x 0.0169 = $0.14416 | **$2,537.22** |
| Runtime v2 committed (allocated 2 vCPU/4 GB, working hours only) | 2 x 0.0997 + 4 x 0.0132 = $0.2522 | **$4,438.72** (if the commit must cover 24/7: 100 x 730 x 0.2522 = $18,410.60) |
| Runtime Instances, 50 x c7i.xlarge (4/8) | 0.1785 + 0.02142 = $0.19992 per instance-hour x 8,800 | **$1,759.30** (+ EBS, IPv4 $44) |