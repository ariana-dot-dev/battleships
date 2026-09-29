# PriceMogged

The most comprehensive comparison of platforms offering cloud runtime / sandbox / VM compute for agents.

**Live at [pricemogged.com](https://pricemogged.com).**

Describe your workload (how many machines, how big, how long, how busy, what they must support) and every provider is priced for it, from its public pricing pages. Providers that can't run the workload are listed with the reasons, and one click drops the requirement that excluded them.

Made by [boat.dev](https://boat.dev). boat.dev is one of the providers compared here, and it is held to the same rules as everyone else.

## What's in here

| Path | What it is |
|---|---|
| `research/cards/*.json` | One file per provider: pricing regimes, plans, limits, features, sources |
| `research/regimes/*.md` | Every billing regime per provider, with sources |
| `research/verify/*.md` | Re-checks of the most-used providers against their live pricing pages |
| `research/benchmarks*.{md,json}` | Measured performance used to price work, not just hours |
| `site/engine.js` | The pricing engine: workload in, monthly bill per provider out |
| `site/template.html`, `site/theme.js` | The page |
| `site/usage-profiles.json` | How busy real sandboxes are (percentiles from a recent sample of boat.dev sandboxes) |

## Build

```sh
node site/build.js      # -> site/dist/pricemogged.html, a single self-contained page
node site/check.js      # print the ranking for each preset
```

No dependencies beyond Node 18+.

## Found a wrong price?

Open an issue with the provider, what the page says, and a link to the pricing page that says otherwise. Prices are checked by hand; the date on the page is when they were last checked.

## License

Code (`site/`) is MIT. Data (`research/`) is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): reuse it, credit "pricemogged by boat.dev".
