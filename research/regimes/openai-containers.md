# OpenAI Containers: pricing regimes (2026-09-29)
OpenAI runs code for agents in several places. Only the API containers have a published compute price; the rest are bundled into ChatGPT plans or run on your own compute.
| Regime | When it applies | How billed | Numbers | Source |
|---|---|---|---|---|
| Container session (Code Interpreter, Hosted Shell) | Responses API tools | Per minute with a 5-minute minimum for "eligible" sessions (since 2026-06-02); otherwise per 20-minute session | 1 GB $0.03, 4 GB $0.12, 16 GB $0.48, 64 GB $1.92 per 20 min = $0.09 / $0.36 / $1.44 / $5.76 per hour | https://developers.openai.com/api/docs/pricing |
| Agents API hosted sandbox (public beta since 2026-09-10) | `environment: openai_hosted` in the Agents API (`OpenAI-Beta: agents=v1`) | "Standard container rates" | small 1 vCPU / 1 GB, medium 2 vCPU / 4 GB (default), large 4 vCPU / 16 GB: the only published vCPU figures for OpenAI containers | https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted |
| Codex Cloud tasks | ChatGPT plans, no API key access | Seat + usage credits, no compute charge | Task VM 2 vCPU / 8 GiB / 8 GiB disk on Plus; 4 vCPU / 16 GiB / 32 GiB on Pro, Business, Enterprise, Edu; state kept up to 7 days | https://learn.chatgpt.com/docs/pricing |
| ChatGPT agent mode | ChatGPT plans | Credits per message | Cloud computer + browser, size unpublished; no API | ChatGPT plan pages |
| Model tokens | always | per token | model-specific, usually more than the compute | https://developers.openai.com/api/docs/pricing |
## Gotchas
- Memory is the only size setting for API containers; vCPU and disk per tier are not published (the Agents API sizes are the only official vCPU numbers).
- A container expires 20 minutes after its last activity; any API call refreshes it, so long sessions are possible with keep-alive calls. Whether the idle minutes before expiry are billed is not published.
- An Agents API sandbox is deleted after about 1 hour without activity (not configurable). No snapshots, no pause/resume, no custom images; setup reruns every session.
- Outbound network is off by default and needs an org allowlist; secrets can be injected per allowed domain. No inbound access. Debian 12, no sudo.
- The Agents API is US-only and has no Zero Data Retention; Code Interpreter runs in the US or EU.
- The Agents SDK's own sandboxes run on your machine or on other providers (E2B, Modal, Daytona...): OpenAI sells no compute there. The Assistants API code interpreter was removed on 2026-08-26.
- Code Interpreter is limited to 100 requests per minute per organization; no concurrency cap is published.
## Worked example
200k one-minute runs, each in a fresh 1 GB container: 200k x 5 min x $0.0015/min = $1,500. Packed 50 runs per container (50 min each): 4,000 x 50 min x $0.0015 = $300. 100 agents x 8 h on the 4 GB tier: 800 h x $0.36 = $288 a day, before model tokens.
Sources: https://developers.openai.com/api/docs/pricing, https://developers.openai.com/api/docs/guides/tools/code-interpreter, https://developers.openai.com/api/docs/guides/agents-api/environments/openai-hosted, https://learn.chatgpt.com/docs/pricing