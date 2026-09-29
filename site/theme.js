// boat.dev scenery for the page: the landing page's sea (sandbox-landing-page/src/app/BoatSea.tsx), ported to
// plain JS, with the 3D boats and barrel rendered for the docs videos floating on it. Pure decoration: every svg
// is aria-hidden except the title.
(function (root) {
  const ROYAL = '#1E40AF', W = 1200;
  const A = () => root.BOAT_ASSETS || {};
  const r2 = v => Math.round(v * 100) / 100;
  const lerp = (a, b, t) => a + (b - a) * t;
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // perspective water: far rows short/faint/inset, near rows long/solid; two swell frequencies; foam ticks on crests
  function buildSea(height, horizon, rowCount, seed) {
    const rnd = rng(seed), rows = [];
    for (let i = 0; i < rowCount; i++) {
      const t = Math.pow(i / (rowCount - 1), 2.6), y = horizon + t * (height - horizon - 6);
      const opacity = 0.12 + t * 0.3, width = 0.6 + t * 0.4, inset = (1 - t) * 190 - 36;
      const xMin = inset, xMax = W - inset, wl = lerp(150, 420, t), phase = i * 0.85;
      const segs = [], foam = [];
      let x = xMin + rnd() * 20;
      while (x < xMax) {
        const p = 0.5 + 0.5 * Math.sin((x / wl) * Math.PI * 2 + phase), c = 0.5 + 0.5 * Math.sin((x / (wl * 0.31)) * Math.PI * 2 + phase * 1.7);
        const crest = Math.pow(p * 0.72 + c * 0.28, 1.35), len = lerp(3, 16, t) + crest * lerp(12, 150, t) * (0.7 + rnd() * 0.6);
        const x2 = Math.min(xMax, x + len); segs.push([x, x2]);
        if (t > 0.32 && crest > 0.62 && len > 24) { let fx = x + 4 + rnd() * 8; const n = 2 + Math.floor(rnd() * 3);
          for (let k = 0; k < n && fx < x2 - 6; k++) { const tk = 4 + rnd() * lerp(4, 11, t); foam.push([fx, Math.min(x2 - 2, fx + tk)]); fx += tk + 5 + rnd() * 8; } }
        x = x2 + lerp(20, 5, t) * (1.45 - crest * 1.1) * (0.6 + rnd() * 0.9) + 2.5;
      }
      rows.push({ y, segs, opacity, width });
      if (foam.length) rows.push({ y: y + lerp(2, 3.5, t), segs: foam, opacity: opacity * 0.8, width: width * 0.85 });
    }
    return rows;
  }
  // flat water for the footer: uniform rows edge to edge
  function buildFlat(height, seed) {
    const rnd = rng(seed), rows = [];
    for (let y = 8, i = 0; y < height; y += 8, i++) {
      const segs = []; let x = rnd() * 20;
      while (x < W) { const p = 0.5 + 0.5 * Math.sin((x / 300) * Math.PI * 2 + i * 0.85), c = 0.5 + 0.5 * Math.sin((x / 93) * Math.PI * 2 + i * 1.45);
        const crest = Math.pow(p * 0.72 + c * 0.28, 1.35), len = 10 + crest * 70 * (0.7 + rnd() * 0.6), x2 = Math.min(W, x + len);
        segs.push([x, x2]); x = x2 + 9 * (1.45 - crest * 1.1) * (0.6 + rnd() * 0.9) + 2.5; }
      rows.push({ y, segs, opacity: 0.44, width: 1 });
    }
    return rows;
  }
  const layer = rows => rows.map(r => `<path stroke-opacity="${r2(r.opacity)}" stroke-width="${r2(r.width)}" d="${r.segs.map(s => `M${r2(s[0])} ${r2(r.y)}H${r2(s[1])}`).join('')}"/>`).join('');

  // the 3D renders from the docs videos (Kenney's pirate kit, restyled and ink-lined in Blender, waterline cut at
  // the bottom edge). Every sprite was rendered with the same ink width and scaled by the same factor, so all are
  // drawn at one fixed scale (K svg units per png pixel): outlines match across boats. Sizes come from the renders.
  const K = 0.467;
  const SPRITE = { 'ship-large-l': [440, 354], 'ship-large-r': [441, 355], 'ship-medium-l': [330, 305], 'ship-medium-r': [329, 306],
    'ship-small-l': [271, 286], 'ship-small-r': [272, 286], 'rowboat-l': [206, 104], 'barrel': [98, 86] };
  // one sprite with its bottom on the water row `y`, rocking
  function vessel(name, x, y, i) {
    const w = SPRITE[name][0] * K, h = SPRITE[name][1] * K;
    return `<g class="ride" style="--bob-delay:${r2(-i * 1.3)}s"><image href="${(A().ships || {})[name]}" x="${r2(x)}" y="${r2(y - h)}" width="${r2(w)}" height="${r2(h)}"/></g>`;
  }

  // the hero: sea, a small fleet drawn back to front (none under the title, subtitle or header), the title on the horizon
  function hero(title) {
    const H = 520, HOR = 100, BASE = 158, rows = buildSea(H, HOR, 92, 7);
    const far = rows.filter(r => r.y < BASE), near = rows.filter(r => r.y >= BASE);
    return `<svg class="sea-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title} on boat.dev's sea">`
      + `<defs><mask id="seamask"><image href="${A().mask}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/></mask></defs>`
      + `<g fill="none" stroke="${ROYAL}" mask="url(#seamask)">${layer(far)}</g>`
      + `<text class="sea-title" x="${W / 2}" y="${BASE}" text-anchor="middle">${title}</text>`
      + `<g fill="none" stroke="${ROYAL}" mask="url(#seamask)">${layer(near)}</g>`
      + vessel('ship-small-r', 30, 280, 0)
      + vessel('ship-medium-l', 1030, 310, 1)
      + vessel('barrel', 1100, 440, 4)
      + vessel('rowboat-l', 900, 470, 3)
      + vessel('ship-large-r', 150, 480, 2) + `</svg>`;
  }

  // the footer: flat water with a fleet sailing across at different speeds and a barrel, drawn back to front
  function footer() {
    const H = 210, rows = buildFlat(H, 19);
    return `<svg class="foot-sea" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">`
      + `<defs><linearGradient id="fsf" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".2" stop-color="#fff"/><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`
      + `<mask id="fsm" maskUnits="userSpaceOnUse" x="-400" y="-400" width="${W + 800}" height="${H + 800}"><rect x="0" y="-400" width="${W}" height="${H + 800}" fill="url(#fsf)"/></mask></defs>`
      + `<g mask="url(#fsm)"><g fill="none" stroke="${ROYAL}">${layer(rows)}</g>`
      + `<g class="sail l s2">${vessel('ship-medium-l', 0, 150, 1)}</g>`
      + vessel('barrel', 340, 165, 4)
      + `<g class="sail r s1">${vessel('ship-large-r', 0, 190, 0)}</g>`
      + `<g class="sail l s4">${vessel('rowboat-l', 0, 198, 3)}</g>`
      + `<g class="sail r s3">${vessel('ship-small-r', 0, 205, 2)}</g></g></svg>`;
  }

  root.BoatTheme = { hero, footer };
})(typeof window !== 'undefined' ? window : globalThis);
