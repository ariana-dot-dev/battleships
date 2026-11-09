# Fairness model

Battleships compares every provider by the same rules, boat.dev included. This file gives the card schema for those rules. Per-card edits must follow it.

## Rules

1. Do not mark a feature `false` when the provider's own docs show a way to get it. Use `"diy"` and name the way.
2. Price each provider on its own published units. Benchmark each provider on its fastest comparable runtime.
3. Every value keeps a source URL and a quote that says it. If you cannot verify a value, use `null`, not a guess.
4. An over-correction is also wrong. A `"diy"` value needs a documented path, not "anyone can install anything".

## Feature values

A feature in `card.features` (or in `mode.features`) has one of four values.

| Value | Meaning | Ranking |
|---|---|---|
| `true` | The provider ships it. | Match. |
| `"diy"` | The provider documents a way to get it yourself: an install, an official example, an add-on, or another runtime of the same provider. | Match, marked "with your own setup". Ranked after the matches that include every required feature, then by price. |
| `false` | The docs say it is not offered, and no documented path exists. | Missing. The row moves to "With compromises". |
| `null` | The provider does not publish it. | Not confirmed. |

A `"diy"` value must have evidence in `feature_evidence[<key>]`:

```json
"desktop": {
  "value": "diy",
  "source": "https://...",
  "quote": "exact words from the source",
  "how": "what the user does, in one short sentence",
  "effort": "low | medium | high",
  "checked": "YYYY-MM-DD"
}
```

- `how`: the page shows it in the row tooltip, the row details and the agent files. Write it as a plain action: "install Xvfb, x11vnc and noVNC in the image (official example)".
- `effort`: `low` = one setting or one API call. `medium` = image changes or an example to adapt. `high` = you build and run a service yourself.
- Optional: `ttl_days` (number) when what you set up expires, and `beta: true` when the path is alpha, beta or preview. Say the same in `how`.

When another runtime of the same provider has the feature, prefer a separate card for that runtime with `family` set (example: `modal-vm`). Use `"diy"` only when the user does the work inside this product.

## Persistence after a stop

`features.persist_scope` says what is still there after a stop.

| Value | Meaning | `persistent_disk` | `whole_disk` |
|---|---|---|---|
| `"whole"` | The whole disk survives. | `true` | `true` |
| `"folder"` | One folder or volume survives (`persist_path` names it). | `true` | `false` |
| `"snapshot"` | You snapshot before the stop and restore on the next start, through a documented API. | `"diy"` | `"diy"` when the snapshot covers the whole filesystem; `false` when `persist_path` names the one folder it covers |
| `"profile"` | Only a browser profile survives. | `false` | `false` |
| `"none"` | Nothing survives. | `false` | `false` |

Evidence for `"snapshot"` goes in `feature_evidence.persist_scope` with the same fields as a `"diy"` feature (`value: "snapshot"`, `source`, `quote`, `how`, `effort`, `checked`). Put the retention in `ttl_days` and the stage in `beta`.

A provider with both a mounted volume and a whole-filesystem snapshot: use `"snapshot"` when the snapshot brings back the whole disk. Keep the volume in `volume_attach`.

## Other fields the page shows

- Checked date: the latest of `feature_evidence[*].checked`, `fleet.researched`, `fleet.checked`, `locations_checked` and `audit_YYYY_MM_DD` keys. The row shows "checked YYYY-MM-DD" when that date is more than 30 days before the build. Update `checked` on every evidence entry you re-verify.
- Start caps: `plans[].max_starts_per_min`, `max_starts_per_hour`, `max_starts_per_day`. The row shows the cap of the plan the engine picked, for every provider that publishes one, boat.dev included.

## CPU units: we use the provider's own conversion

When a provider sells CPU in a unit other than the vCPU, the card uses the provider's published conversion, even when a measurement points the other way. The page then shows the measurement as a caveat.

- Modal lists CPU per "Physical core (2 vCPU equivalent)" ([pricing](https://modal.com/pricing)). The card prices 4 vCPU as `cpu=2`: $0.476/h at 8 GiB. This is the lowest Modal price that Modal's own pages support.
- Measured: `cpu=N` gives the sandbox N CPUs ([StarSling PR #121](https://github.com/starslingdev/hpc-sandbox-benchmarks/pull/121), ComputeSDK). So `cpu=2` shows 2 CPUs. A workload that needs 4 CPUs requests `cpu=4` and pays $0.76/h at 8 GiB. The Modal card and its regime page say so.
- To dispute a unit, open an issue with the provider's public page that states a different conversion.

## Example 1: Modal desktop and browser (official example)

Source: https://modal.com/docs/examples/computer_use_vnc

```json
"features": { "desktop": "diy", "browser": "diy" },
"feature_evidence": {
  "desktop": {
    "value": "diy",
    "source": "https://modal.com/docs/examples/computer_use_vnc",
    "quote": "In each Sandbox, Xvfb provides a virtual display, x11vnc serves it over VNC, and websockify bridges the stream into the noVNC page that the UI embeds.",
    "how": "install Xvfb, x11vnc and noVNC in the sandbox image (official example)",
    "effort": "medium",
    "checked": "2026-11-08"
  },
  "browser": {
    "value": "diy",
    "source": "https://modal.com/docs/examples/computer_use_vnc",
    "quote": "The agent drives Chromium inside a Modal Sandbox running in a VM",
    "how": "install Chromium in the sandbox image (official example)",
    "effort": "low",
    "checked": "2026-11-08"
  }
}
```

Modal filesystem snapshots, same pattern (re-check the quote on the page before you commit it):

```json
"features": { "persist_scope": "snapshot" },
"feature_evidence": {
  "persist_scope": {
    "value": "snapshot",
    "source": "https://modal.com/docs/guide/sandbox-snapshots",
    "quote": "<exact sentence about snapshot_filesystem from the page>",
    "how": "call snapshot_filesystem() before the sandbox ends, then start the next sandbox from that image",
    "effort": "low",
    "ttl_days": 30,
    "checked": "2026-11-08"
  }
}
```

Remove `persist_path` when you change `persist_scope` from `"folder"` to `"snapshot"`, unless the snapshot covers only that folder.

## Example 2: Cloudflare Sandbox persistence (snapshots, R2 mounts)

Use the facts in `findings/cloudflare-sandbox.json`. Pick the row that matches what the docs show:

- The SDK restores a saved filesystem into a new sandbox: `persist_scope: "snapshot"`.
- Only a bucket mount survives: `persist_scope: "folder"`, `persist_path: "R2 bucket mount"`, and `volume_attach: true`.

```json
"features": { "persist_scope": "snapshot", "volume_attach": true },
"feature_evidence": {
  "persist_scope": {
    "value": "snapshot",
    "source": "<Cloudflare Sandbox SDK backup / snapshot page>",
    "quote": "<exact sentence from that page>",
    "how": "save the sandbox filesystem with the SDK before it stops and restore it on the next start; or mount an R2 bucket for files that must survive",
    "effort": "low",
    "beta": true,
    "checked": "2026-11-08"
  },
  "volume_attach": {
    "value": true,
    "source": "<Cloudflare Sandbox SDK bucket mount page>",
    "quote": "<exact sentence from that page>",
    "checked": "2026-11-08"
  }
}
```

Set `beta: true` only when the page says beta, alpha or preview.

## How to check your change

```
node site/build.js
node site/build-agent.js
node --test site/engine.test.js
node site/rankings.js <outDir>
```

`site/rankings.js` runs the page's own script and writes the ranking each preset shows by default. Each row has `own_setup` (features you set up yourself, with `how`, `effort`, `source`), `start_limits`, `checked` and `stale`.

### Known differences from the live rankings (2026-11-08 baseline)

On the unmodified cards (HEAD c26d10e), `rankings.js` gives the same ids in the same order with the same match for all 15 presets. Two differences remain, both intended:

- `monthly_usd` of $100,000 or more: the live files show thousands (`109` for $109,494). `rankings.js` writes dollars.
- `summary` counts: `site/build.js` now leaves cards with `status: "discontinued"` off the page, so "N of 369" became "N of 362". No ranked row changed.
