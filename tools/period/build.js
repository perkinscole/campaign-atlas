#!/usr/bin/env node
/* Campaign Atlas — builds the period border files in data/period/.

   Usage: node tools/period/build.js <ne_50m_admin_1_states_provinces.geojson> <world_1938.geojson>

   Inputs (not kept in the repository):
   - Natural Earth 1:50m admin-1 states and provinces (public domain), from
     https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
   - world_1938.geojson from https://github.com/aourednik/historical-basemaps (GPL-3.0)

   Period state lines are made by merging and cutting modern state shapes, which is
   exact wherever a boundary has not moved since. Place lists are in places.js. */
'use strict';
const fs = require('fs'), path = require('path');
const [neFile, w38File] = process.argv.slice(2);
if (!neFile || !w38File) { console.error('usage: build.js <natural-earth admin-1 geojson> <world_1938 geojson>'); process.exit(1); }
const PLACES = require('./places.js');
const OUT = path.join(__dirname, '..', '..', 'data', 'period');
const R = 1000, rnd = n => Math.round(n * R) / R;

// ---- Geometry helpers. Rings are arrays of [lng, lat]; a polygon is [outer, ...holes]. ----
const polysOf = g => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates).map(p => p.map(clean)).filter(p => p[0].length > 3);
function clean(ring) {
  const out = [];
  ring.forEach(([x, y]) => { const p = [rnd(x), rnd(y)]; const q = out[out.length - 1]; if (!q || q[0] !== p[0] || q[1] !== p[1]) out.push(p); });
  if (out.length && (out[0][0] !== out[out.length - 1][0] || out[0][1] !== out[out.length - 1][1])) out.push(out[0].slice());
  return out;
}
const area = ring => { let a = 0; for (let i = 0; i < ring.length - 1; i++) a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]; return a / 2; };
function centroid(ring) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < ring.length - 1; i++) { const f = ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]; a += f; cx += (ring[i][0] + ring[i + 1][0]) * f; cy += (ring[i][1] + ring[i + 1][1]) * f; }
  return [cx / (3 * a), cy / (3 * a)];
}
const inside = (pt, ring) => { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const a = ring[i], b = ring[j]; if ((a[1] > pt[1]) !== (b[1] > pt[1]) && pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };

// Keep the part of each polygon on one side of a straight line of latitude or longitude.
function clip(polys, axis, keep, v) {
  const ok = p => keep === '>' ? p[axis] >= v : p[axis] <= v;
  const cut = (a, b) => { const t = (v - a[axis]) / (b[axis] - a[axis]); const p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; p[axis] = v; return [rnd(p[0]), rnd(p[1])]; };
  const ringClip = ring => {
    const out = [];
    for (let i = 0; i < ring.length - 1; i++) {
      const a = ring[i], b = ring[i + 1];
      if (ok(a)) { out.push(a); if (!ok(b)) out.push(cut(a, b)); } else if (ok(b)) out.push(cut(a, b));
    }
    return out.length > 2 ? clean(out) : null;
  };
  return polys.map(p => p.map(ringClip).filter(Boolean)).filter(p => p.length && p[0].length > 3);
}

// Merge neighbouring polygons by cancelling the edges they share. Works because the
// source shapes use identical points along shared borders.
function dissolve(polys) {
  const key = (a, b) => a[0] + ',' + a[1] + '>' + b[0] + ',' + b[1];
  const edges = new Map();
  polys.forEach(p => p.forEach(ring => { for (let i = 0; i < ring.length - 1; i++) edges.set(key(ring[i], ring[i + 1]), [ring[i], ring[i + 1]]); }));
  for (const [k, [a, b]] of [...edges]) { const r = key(b, a); if (edges.has(k) && edges.has(r)) { edges.delete(k); edges.delete(r); } }
  const from = new Map();
  for (const e of edges.values()) { const k = e[0][0] + ',' + e[0][1]; if (!from.has(k)) from.set(k, []); from.get(k).push(e); }
  const rings = [];
  for (const start of edges.values()) {
    if (start.used) continue;
    const ring = [start[0]]; let e = start;
    while (e && !e.used) { e.used = true; ring.push(e[1]); e = (from.get(e[1][0] + ',' + e[1][1]) || []).find(n => !n.used); }
    if (ring.length > 3 && ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) rings.push(ring);
  }
  const sign = Math.sign(area(polys[0][0]));
  const outers = rings.filter(r => Math.sign(area(r)) === sign).map(r => [r]);
  rings.filter(r => Math.sign(area(r)) !== sign).forEach(h => { const o = outers.find(p => inside(h[0], p[0])); if (o && Math.abs(area(h)) > 1e-4) o.push(h); });
  return outers.filter(p => Math.abs(area(p[0])) > 1e-4);
}
const labelPoint = polys => { const big = polys.map(p => p[0]).sort((a, b) => Math.abs(area(b)) - Math.abs(area(a)))[0]; const c = centroid(big); return [rnd(c[1]), rnd(c[0])]; };
const toLatLng = polys => polys.map(p => p.map(r => r.map(([x, y]) => [y, x])));
const feature = (name, polys, extra) => Object.assign({ name, label: labelPoint(polys), shape: toLatLng(polys) }, extra || {});

function write(id, data) {
  const body = JSON.stringify(Object.assign({ id }, data));
  fs.writeFileSync(path.join(OUT, id + '.js'), `/* Built by tools/period/build.js. Do not edit by hand. ${data.credit} */\nAtlas.period(${body});\n`);
  console.log(id, data.features.length, 'features,', data.places.length, 'places,', Math.round(body.length / 1024) + ' KB');
}

// ---- United States, from Natural Earth -------------------------------------------------
const ne = JSON.parse(fs.readFileSync(neFile, 'utf8')).features.filter(f => f.properties.admin === 'United States of America');
const st = Object.fromEntries(ne.map(f => [f.properties.postal, { name: f.properties.name, polys: polysOf(f.geometry) }]));
const S = (...ids) => ids.flatMap(id => st[id].polys);
const NE_CREDIT = 'State lines made from Natural Earth (public domain).';

// The Civil War. Groups change with the date: [date, group] pairs, the latest one on or before the day applies.
(function civilWar() {
  const F = [];
  const free = ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'OH', 'IN', 'IL', 'MI', 'WI', 'MN', 'IA', 'KS', 'CA', 'OR'];
  const border = ['DE', 'MD', 'KY', 'MO'];
  const first = ['SC', 'MS', 'FL', 'AL', 'GA', 'LA', 'TX'];              // seceded before April 1861
  const later = { AR: '1861-05-06', NC: '1861-05-20', TN: '1861-06-08' }; // seceded after Fort Sumter
  free.forEach(id => F.push(feature(st[id].name, st[id].polys, { group: 'free' })));
  border.forEach(id => F.push(feature(st[id].name, st[id].polys, { group: 'border' })));
  first.forEach(id => F.push(feature(st[id].name, st[id].polys, { group: 'csa' })));
  Object.entries(later).forEach(([id, d]) => F.push(feature(st[id].name, st[id].polys, { groups: [['1861-01-01', 'border'], [d, 'csa']] })));
  // Virginia included what is now West Virginia until June 20, 1863.
  F.push(feature('Virginia', dissolve(S('VA', 'WV')), { to: '1863-06-20', groups: [['1861-01-01', 'border'], ['1861-04-17', 'csa']], label: [37.75, -79.2] }));
  F.push(feature('Virginia', st.VA.polys, { from: '1863-06-20', group: 'csa', label: [37.45, -78.6] }));
  F.push(feature('West Virginia', st.WV.polys, { from: '1863-06-20', group: 'border' }));
  // Territories. Only lines that match the modern ones are drawn.
  F.push(feature('Colorado Territory', st.CO.polys, { group: 'terr' }));
  F.push(feature('Indian Territory', clip(st.OK.polys, 0, '>', -100), { group: 'terr' }));
  F.push(feature('New Mexico Territory', dissolve(S('NM', 'AZ')), { to: '1863-02-24', group: 'terr' }));
  F.push(feature('New Mexico Territory', st.NM.polys, { from: '1863-02-24', group: 'terr' }));
  F.push(feature('Arizona Territory', st.AZ.polys, { from: '1863-02-24', group: 'terr' }));
  F.push(feature('Western territories', dissolve(S('ND', 'SD', 'NE', 'WY', 'MT', 'ID', 'WA', 'UT', 'NV')), { group: 'terr', label: [43.5, -104.5] }));
  write('civil-war', {
    credit: NE_CREDIT,
    caption: 'State lines as they stood in the 1860s. The colors change as states secede, and West Virginia appears when it becomes a state in June 1863. Territory lines in the far West are left out because they moved several times during the war.',
    groups: {
      free: { name: 'Free states (Union)', color: '#2b5797' },
      border: { name: 'Slave states still in the Union', color: '#d9a21b', opacity: .3 },
      csa: { name: 'Confederate states', color: '#9b3030' },
      terr: { name: 'U.S. territories', color: '#8b939e' }
    },
    features: F, places: PLACES['civil-war']
  });
})();

// The American Revolution.
(function revolution() {
  const F = [];
  ['NH', 'RI', 'CT', 'NY', 'NJ', 'PA', 'DE', 'MD', 'SC', 'GA', 'NC'].forEach(id => F.push(feature(st[id].name, st[id].polys, { group: 'colony' })));
  F.push(feature('Massachusetts', S('MA', 'ME'), { group: 'colony', label: [42.35, -72.0] }));
  F.push(feature('Virginia', dissolve(S('VA', 'WV')), { group: 'colony', label: [37.75, -79.2] }));
  F.push(feature('Vermont', st.VT.polys, { group: 'disputed' }));
  const north = id => clip(st[id].polys, 1, '>', 32.47), south = id => clip(st[id].polys, 1, '<', 32.47);
  F.push(feature('Western lands', dissolve([...S('KY', 'TN', 'OH', 'IN', 'IL', 'MI', 'WI'), ...north('AL'), ...north('MS')]), { group: 'west', label: [38.9, -86.3], quiet: true }));
  F.push(feature('The Floridas', dissolve([...S('FL'), ...south('AL'), ...south('MS')]), { group: 'british', label: [30.6, -85.6], quiet: true }));
  write('american-revolution', {
    credit: NE_CREDIT,
    caption: 'The thirteen colonies, drawn along the state lines later agreed. During the war their western edges were overlapping claims, and nearly all the land beyond the mountains was held by Native nations. Maine was part of Massachusetts, and Virginia included what is now West Virginia.',
    groups: {
      colony: { name: 'The thirteen colonies (states from 1776)', color: '#2b5797' },
      disputed: { name: 'Vermont: claimed by New York and New Hampshire, self-governing from 1777', color: '#d9a21b', opacity: .3 },
      west: { name: 'Western lands: Native nations, claimed by several states', color: '#8a7d55' },
      british: { name: 'East and West Florida (British)', color: '#9b3030' }
    },
    features: F, places: PLACES['american-revolution']
  });
})();

// ---- Europe in 1938, from historical-basemaps -------------------------------------------
(function europe() {
  const keep = {
    'Luxembourg': 0, 'Switzerland': 0, 'Spain': 0, 'United Kingdom': 0, 'Estonia': 0, 'Latvia': 0, 'Lithuania': 0, 'Ireland': 0, 'Belgium': 0,
    'France': 0, 'Albania': 0, 'Portugal': 0, 'Turkey': 0, 'Iran': 0, 'Netherlands': 0, 'Egypt': 0, 'Norway': 0, 'Bulgaria': 0, 'Romania': 0,
    'Czechoslovakia': 0, 'Hungary': 0, 'Germany': 0, 'Poland': 0, 'Sweden': 0, 'Finland': 0, 'Denmark': 0, 'Yugoslavia': 0, 'Italy': 0, 'Greece': 0,
    'USSR': 'Soviet Union', 'Tunisia': 'Tunisia (France)', 'Algeria (France)': 0, 'Morocco (France)': 0, 'Libya': 'Libya (Italy)',
    'Syria (France)': 'Syria and Lebanon (France)', 'Mandatory Palestine (GB)': 'Palestine (Britain)', 'Jordan': 'Transjordan (Britain)', 'Mesopotamia (GB)': 'Iraq'
  };
  const labels = { 'Soviet Union': [54.5, 38.5], 'United Kingdom': [53.0, -1.6], 'Norway': [61.2, 9.0], 'Denmark': [56.1, 9.3], 'Italy': [42.9, 12.6], 'Greece': [39.4, 22.0],
    'Germany': [51.2, 10.4], 'France': [46.8, 2.5], 'Finland': [62.6, 26.5], 'Sweden': [61.5, 15.2], 'Turkey': [39.0, 33.5], 'Spain': [40.2, -3.6], 'Portugal': [39.6, -8.1],
    'Yugoslavia': [44.2, 19.3], 'Romania': [45.9, 25.0], 'Czechoslovakia': [49.3, 17.6], 'Poland': [52.2, 20.5], 'Algeria (France)': [33.6, 3.0], 'Libya (Italy)': [30.3, 17.5],
    'Egypt': [28.9, 29.5], 'Morocco (France)': [32.2, -6.4], 'Iran': [34.5, 49.5], 'Iraq': [33.2, 43.2], 'Syria and Lebanon (France)': [35.0, 38.3] };
  const world = JSON.parse(fs.readFileSync(w38File, 'utf8')).features.filter(f => f.geometry && f.properties.NAME in keep);
  const byName = {};
  world.forEach(f => {
    const name = keep[f.properties.NAME] || f.properties.NAME;
    let polys = polysOf(f.geometry);
    polys = clip(clip(clip(clip(polys, 0, '>', -32), 0, '<', 62), 1, '>', 22), 1, '<', 73);
    polys = polys.filter(p => Math.abs(area(p[0])) > 0.004);
    if (polys.length) (byName[name] = byName[name] || []).push(...polys);
  });
  const F = Object.entries(byName).map(([name, polys]) => feature(name, polys, labels[name] ? { label: labels[name] } : {}));
  write('world-war-2-europe', {
    credit: 'Borders from historical-basemaps by A. Ourednik (GPL-3.0), https://github.com/aourednik/historical-basemaps',
    caption: 'Borders as they stood in the summer of 1938, after Germany annexed Austria and before it broke up Czechoslovakia. Wartime occupations and the borders redrawn in 1945 are not shown.',
    groups: {}, features: F, places: PLACES['world-war-2-europe']
  });
})();
