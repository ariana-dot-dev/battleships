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
  // one sprite with its bottom on the water row `y`, rocking. Boats are HTML boxes laid over the (static) sea svg, not
  // svg children: an animated transform on its own layer runs on the compositor, so the boats keep rocking while the
  // page loads and nothing gets repainted each frame. Each image is defined once for the page (sprites(), a CSS class),
  // so the hero and the footer share the same bytes.
  const used = new Set();
  const pct = (v, of) => r2((v / of) * 100) + '%';
  function vessel(name, x, y, i, H, sailing) {
    const w = SPRITE[name][0] * K, h = SPRITE[name][1] * K; used.add(name);
    return `<i class="ship ride spr-${name}" style="left:${sailing ? 0 : pct(x, W)};top:${pct(y - h, H)};width:${pct(w, W)};height:${pct(h, H)};animation-delay:${r2(-i * 1.3)}s"></i>`;
  }
  // Cannon fire, done in the space of the sea. The hero's water is a perspective trapezoid: row y = 100 + 414t spans
  // x in [inset, W - inset] with inset = (1 - t)·190 - 36, so a row's width (and the scale of anything on it) grows
  // linearly with y and reaches 0 at the vanishing line VY = -871.9. A point on the water is (X, Z): X = (x - 600)/s,
  // and 1/Z is linear in y, i.e. d = y - VY = 1/q with q linear in world depth. A ball flies straight in (X, q-depth)
  // world space with a real parabola for height, and is projected back each keyframe: screen scale s = d / D1, ground
  // y = VY + d, x = 600 + X·s, ball y = ground y - height·s. Its shadow sits on the ground point, shrinking and fading
  // the higher the ball is. The footer's water is seen from the side (flat): s = 1 and the ground y is linear.
  const cq = v => r2(v / W * 100) + 'cqw';
  const VY = 100 - 414 * 892 / 380, D1 = 514 - VY;
  const PERSP = { s: y => (y - VY) / D1, toW: (x, y) => ({ X: (x - 600) / ((y - VY) / D1), q: 1 / (y - VY) }),
    at: (P0, P1, p) => { const d = 1 / lerp(P0.q, P1.q, p), s = d / D1; return { s, gy: VY + d, gx: 600 + lerp(P0.X, P1.X, p) * s }; } };
  const FLAT = { s: () => 1, toW: (x, y) => ({ X: x, q: y }), at: (P0, P1, p) => ({ s: 1, gy: lerp(P0.q, P1.q, p), gx: lerp(P0.X, P1.X, p) }) };
  const CYCLE = 12, N = 28;   // every gun fires once per 12 s cycle; its delay places it in the cycle
  let kf = '', nShot = 0;
  // a gun at screen point m (on ship's waterline y m.gy, h px above it) fires at t (a hull: t.h > 0 = hit, or water);
  // apex = extra height at mid-flight in front-row px; F = flight seconds
  function shot(P, m, t, apex, F, del) {
    const id = 'k' + (nShot++), A0 = P.toW(m.x, m.gy), A1 = P.toW(t.x, t.gy), h0 = m.h / P.s(m.gy), h1 = t.h / P.s(t.gy);
    const f = F / CYCLE * 100, pc = v => r2(v) + '%';
    let ball = '', shade = '';
    for (let k = 0; k <= N; k++) {
      const p = k / N, g = P.at(A0, A1, p), hw = lerp(h0, h1, p) + 4 * apex * p * (1 - p);
      const lift = Math.min(1, hw / 260), at = pc(f * p);
      ball += `${at}{opacity:1;transform:translate(${cq(g.gx)},${cq(g.gy - hw * g.s)}) scale(${r2(g.s)})}`;
      shade += `${at}{opacity:${r2(0.34 - 0.24 * lift)};transform:translate(${cq(g.gx)},${cq(g.gy)}) scale(${r2(g.s * (1 - 0.45 * lift))})}`;
    }
    const end = pc(f + 0.01);
    kf += `@keyframes ${id}b{${ball}${end},100%{opacity:0}}@keyframes ${id}s{${shade}${end},100%{opacity:0}}`;
    const hit = t.h > 0, s0 = P.s(m.gy), s1 = P.s(t.gy), my = m.gy - m.h, ty = t.gy - t.h;
    // effects are placed where they happen, sized for their depth; a gun's flash/smoke at fire time, the landing at F
    const fx = (cls, x, y, s, d, sym) => `<i class="fx ${cls}" style="left:${cq(x)};top:${cq(y)};--s:${r2(s)};animation-delay:${r2(d)}s">`
      + `<svg viewBox="0 0 100 100"><use href="#${sym}"/></svg></i>`;   // the symbol's own viewBox centres it
    const land = hit
      ? fx('boom', t.x, ty, s1, del + F, 'fx-boom') + fx('puff late', t.x, ty, s1, del + F, 'fx-smoke')
      : fx('ring', t.x, t.gy, s1, del + F, 'fx-ring') + fx('crown', t.x, t.gy, s1, del + F, 'fx-crown');
    // `land` is drawn at its depth among the ships (a splash behind a nearer hull is hidden by it); a hit sits just
    // in front of the ship it hits
    return {
      under: `<i class="shade" style="animation-name:${id}s;animation-delay:${del}s"></i>`,
      over: `<b class="ball" style="animation-name:${id}b;animation-delay:${del}s"></b>`
        + fx('flash', m.x, my, s0, del, 'fx-flash') + fx('puff', m.x, my, s0, del, 'fx-smoke'),
      land: [t.gy + 0.5, land],
    };
  }
  // ligne claire effects: flat fills, one ink line weight, no gradients (matches the ink-lined boat renders)
  const INK = '#111', LW = 3.2;
  const star = (n, r0, r1, j) => { let d = ''; for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? r0 : r1 * (1 - j * ((i * 37) % 5) / 5);
    d += (i ? 'L' : 'M') + r2(Math.cos(a) * r) + ' ' + r2(Math.sin(a) * r); } return d + 'Z'; };
  const FX_DEFS = `<svg class="fx-defs" width="0" height="0" aria-hidden="true"><defs>`
    + `<symbol id="fx-flash" viewBox="-50 -50 100 100" overflow="visible"><path d="${star(9, 16, 46, 0.35)}" fill="#FFB31F" stroke="${INK}" stroke-width="${LW}" stroke-linejoin="round"/><path d="${star(7, 8, 22, 0.3)}" fill="#FFF3B0"/></symbol>`
    + `<symbol id="fx-boom" viewBox="-50 -50 100 100" overflow="visible"><path d="${star(11, 24, 48, 0.4)}" fill="#FF6A1A" stroke="${INK}" stroke-width="${LW}" stroke-linejoin="round"/><path d="${star(8, 13, 30, 0.35)}" fill="#FFC53D" stroke="${INK}" stroke-width="${LW * 0.6}" stroke-linejoin="round"/><circle r="8" fill="#FFF6D0"/></symbol>`
    + `<symbol id="fx-smoke" viewBox="-50 -50 100 100" overflow="visible"><g fill="#fff" stroke="${INK}" stroke-width="${LW}"><circle cx="-14" cy="6" r="15"/><circle cx="13" cy="4" r="17"/><circle cx="-1" cy="-12" r="18"/></g><path d="M-9 -16a9 9 0 0 1 10 -6M8 -2a8 8 0 0 1 9 -5" fill="none" stroke="${INK}" stroke-width="${LW * 0.6}" stroke-linecap="round"/></symbol>`
    // a water column seen from the side, bottom edge on the water line (0,0 = impact)
    + `<symbol id="fx-crown" viewBox="-50 -50 100 100" overflow="visible"><path d="M-24 0C-22 -14 -26 -26 -18 -34C-15 -24 -12 -30 -9 -46C-5 -34 -2 -40 0 -50C3 -38 6 -44 9 -46C12 -30 15 -24 18 -34C26 -26 22 -14 24 0Z" fill="#fff" stroke="${INK}" stroke-width="${LW}" stroke-linejoin="round"/>`
    + `<path d="M-10 0C-9 -10 -6 -22 -3 -30M8 0C8 -9 7 -16 5 -24" fill="none" stroke="#9DB6F2" stroke-width="${LW}" stroke-linecap="round"/><circle cx="-30" cy="-30" r="3.2" fill="#fff" stroke="${INK}" stroke-width="${LW * 0.7}"/><circle cx="31" cy="-24" r="2.6" fill="#fff" stroke="${INK}" stroke-width="${LW * 0.7}"/></symbol>`
    // the ring lies on the water, so it is flattened like the rows around it
    + `<symbol id="fx-ring" viewBox="-50 -50 100 100" overflow="visible"><ellipse rx="40" ry="11" fill="none" stroke="#1E40AF" stroke-width="${LW}"/><ellipse rx="26" ry="7" fill="none" stroke="#1E40AF" stroke-width="${LW * 0.7}"/></symbol>`
    + `</defs></svg>`;
  function sprites() {
    return `<style>${[...used].map(n => `.spr-${n}{background-image:url(${(A().ships || {})[n]})}`).join('')}${kf}</style>${FX_DEFS}`;
  }
  // where on a ship things happen: gun ports sit ~22% of the hull height above the waterline, towards the target side
  const box = (name, x, y) => { const w = SPRITE[name][0] * K, h = SPRITE[name][1] * K; return { x, y, w, h, cx: x + w / 2 }; };
  const gun = (b, side, off = 0.3) => ({ x: b.cx + side * off * b.w, gy: b.y, h: 0.22 * b.h });
  const hull = (b, off = 0) => ({ x: b.cx + off * b.w, gy: b.y, h: 0.2 * b.h });
  const water = (x, y) => ({ x, gy: y, h: 0 });
  const battle = shots => ({ under: shots.map(s => s.under).join(''), over: shots.map(s => s.over).join(''), lands: shots.map(s => s.land) });
  // ships and landings back to front by waterline
  const depthSort = items => items.sort((a, b) => a[0] - b[0]).map(i => i[1]).join('');

  // the hero: sea, a small fleet drawn back to front (none under the title, subtitle or header), the title on the horizon
  function hero(title) {
    const H = 520, HOR = 100, BASE = 158, rows = buildSea(H, HOR, 92, 7);
    const far = rows.filter(r => r.y < BASE), near = rows.filter(r => r.y >= BASE);
    // the battle, one shot every ~2.5 s: the big ship and the medium one trade broadsides over the title, the small
    // one joins in, the rowboat gets a warning shot. Hits land on a hull, misses throw up water where the shadow ends.
    const SM = box('ship-small-r', 30, 280), MD = box('ship-medium-l', 1030, 310), LG = box('ship-large-r', 150, 480);
    const war = battle([
      shot(PERSP, gun(LG, 1), hull(MD, -0.1), 200, 3.2, 0.4),
      shot(PERSP, gun(MD, -1), water(250, 296), 180, 3.0, 3.0),
      shot(PERSP, gun(SM, 1), water(940, 336), 160, 3.1, 5.6),
      shot(PERSP, gun(MD, -1), hull(LG, 0.12), 210, 3.3, 8.0),
      shot(PERSP, gun(LG, 1, 0.2), water(850, 500), 110, 2.4, 10.6),
    ]);
    return `<div class="sea-wrap"><svg class="sea-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title} on boat.dev's sea">`
      + `<defs><mask id="seamask"><image href="${A().mask}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/></mask></defs>`
      + `<g fill="none" stroke="${ROYAL}" mask="url(#seamask)">${layer(far)}</g>`
      + `<text class="sea-title" x="${W / 2}" y="${BASE}" text-anchor="middle">${title}</text>`
      + `<g fill="none" stroke="${ROYAL}" mask="url(#seamask)">${layer(near)}</g></svg>`
      + `<div class="fleet" aria-hidden="true">${war.under}`
      + depthSort([[280, vessel('ship-small-r', 30, 280, 0, H)], [310, vessel('ship-medium-l', 1030, 310, 1, H)],
        [440, vessel('barrel', 1100, 440, 4, H)], [470, vessel('rowboat-l', 900, 470, 3, H)],
        [480, vessel('ship-large-r', 150, 480, 2, H)], ...war.lands])
      + `${war.over}</div></div>`;
  }

  // the footer: flat water with a fleet sailing across at different speeds and a barrel, drawn back to front
  function footer() {
    const H = 210, rows = buildFlat(H, 19);
    const f1 = battle([shot(FLAT, gun(box('ship-medium-l', 0, 150), -1), water(-240, 162), 90, 2.6, 2.2)]);
    const f2 = battle([shot(FLAT, gun(box('ship-large-r', 0, 190), 1), water(560, 176), 100, 2.8, 7.4)]);
    return `<div class="sea-wrap foot-wrap"><svg class="foot-sea" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">`
      + `<defs><linearGradient id="fsf" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".2" stop-color="#fff"/><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`
      + `<mask id="fsm" maskUnits="userSpaceOnUse" x="-400" y="-400" width="${W + 800}" height="${H + 800}"><rect x="0" y="-400" width="${W}" height="${H + 800}" fill="url(#fsf)"/></mask></defs>`
      + `<g mask="url(#fsm)"><g fill="none" stroke="${ROYAL}">${layer(rows)}</g></g></svg>`
      + `<div class="fleet fade" aria-hidden="true">`
      // guns ride with the sailing ships (side view: flat water); warning shots splash ahead of them
      + `<div class="sail l s2">${f1.under}${vessel('ship-medium-l', 0, 150, 1, H, true)}${f1.over}${depthSort(f1.lands)}</div>`
      + vessel('barrel', 340, 165, 4, H)
      + `<div class="sail r s1">${f2.under}${vessel('ship-large-r', 0, 190, 0, H, true)}${f2.over}${depthSort(f2.lands)}</div>`
      + `<div class="sail l s4">${vessel('rowboat-l', 0, 198, 3, H, true)}</div>`
      + `<div class="sail r s3">${vessel('ship-small-r', 0, 205, 2, H, true)}</div></div></div>`;
  }

  root.BoatTheme = { hero, footer, sprites };
})(typeof window !== 'undefined' ? window : globalThis);
