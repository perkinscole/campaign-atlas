// Usage: node validate.js <projectDir>  — structural checks for every live pack
const path = require('path'); const dir = process.argv[2];
global.window = global; global.location = { search: '' }; global.document = { getElementById: () => null, documentElement: { style: { setProperty() {} } } };
require(path.join(dir, 'data/index.js'));
let files = [];
for (const w of window.ATLAS_SITE.wars.filter(w => w.status === 'live')) {
  global.location = { search: '?war=' + w.id };
  delete require.cache[require.resolve(path.join(dir, 'js/core.js'))];
  require(path.join(dir, 'js/core.js'));
  let P; const reg = Atlas.register; Atlas.register = p => { reg(p); P = p; };
  delete require.cache[require.resolve(path.join(dir, 'data', w.id + '.js'))];
  require(path.join(dir, 'data', w.id + '.js'));
  const sides = P.meta.sides.map(s => s.id), err = m => console.log('  PROBLEM', m);
  console.log(w.id + ':', P.BATTLES.length, 'battles,', P.CAMPAIGNS.length, 'routes,', P.entries.length, 'entries,', P.EVENTS.length, 'events,', P.TOURS.length, 'tours');
  const ids = new Set();
  for (const b of P.BATTLES) {
    if (ids.has(b.id)) err('dup ' + b.id); ids.add(b.id);
    if (b.d0 < 0 || b.d1 > P.maxDay || b.d1 < b.d0) err('date range ' + b.id);
    if (!sides.includes(b.result) && !['inconclusive', 'none'].includes(b.result)) err('result ' + b.id);
    for (const s of sides) { if (b.commanders[s] == null || b.forces[s] == null || b.casualties[s] == null) err('side fields ' + b.id + ' ' + s); }
    if (b.campaign && !P.campaignById[b.campaign]) err('campaign ref ' + b.id + ' ' + b.campaign);
    if (!b.images.length) err('no image ' + b.id); if (!b.journal.length) err('no journal ' + b.id);
    for (const j of b.journal) { if (j.portrait && !P.PORTRAITS[j.portrait]) err('portrait ' + b.id + ' ' + j.portrait); if (![...sides, 'civilian'].includes(j.side)) err('journal side ' + b.id); }
    const [[s, w2], [n, e]] = P.meta.bounds; if (b.lat < s - 3 || b.lat > n + 3 || b.lng < w2 - 12 || b.lng > e + 3) err('far outside bounds ' + b.id);
    b.images.forEach(i => files.push(i.file));
  }
  for (const c of P.CAMPAIGNS) { if (!sides.includes(c.side)) err('campaign side ' + c.id); let prev = -1; for (const p of c.pts) { if (p.day < prev) err('route order ' + c.id + ' ' + p.label); prev = p.day; if (p.day < 0 || p.day > P.maxDay) err('route date ' + c.id + ' ' + p.label); } if (P.dayOf(c.start) !== c.d0 || P.dayOf(c.end) !== c.d1) err('route start/end mismatch ' + c.id); }
  for (const e of P.EVENTS) if (e.d0 < 0 || e.d0 > P.maxDay) err('event date ' + e.title);
  const oids = new Set();
  if (w.period) {
    let per = null; const keep = Atlas.period; Atlas.period = p => { per = p; };
    try { delete require.cache[require.resolve(path.join(dir, 'data/period', w.id + '.js'))]; require(path.join(dir, 'data/period', w.id + '.js')); } catch (e) { err('period file missing or broken'); }
    Atlas.period = keep;
    if (per) {
      for (const f of per.features) { if (!f.name || !f.shape.length || !f.label) err('period feature ' + f.name); const gs = f.groups ? f.groups.map(g => g[1]) : f.group ? [f.group] : []; for (const g of gs) if (!per.groups[g]) err('period group ' + f.name + ' ' + g); }
      for (const pl of per.places) if (typeof pl[0] !== 'string' || !(pl[1] >= -90 && pl[1] <= 90) || ![1, 2, 3].includes(pl[3]) || (pl[4] && !['city', 'capital', 'region', 'nation', 'water'].includes(pl[4]))) err('period place ' + pl[0]);
      console.log('  period map:', per.features.length, 'border shapes,', per.places.length, 'places');
    }
  }
  for (const [id, list] of Object.entries((P.MEDIA || {}).papers || {})) { if (!P.battleById[id]) err('media paper battle ' + id); for (const p of list) if (!p.paper || !p.place || !/^\d{4}-\d\d-\d\d$/.test(p.date) || !/^https:\/\/tile\.loc\.gov\//.test(p.clip) || !/^https:\/\/www\.loc\.gov\/resource\//.test(p.url)) err('media paper ' + id + ' ' + p.paper); }
  for (const [id, list] of Object.entries((P.MEDIA || {}).reels || {})) { if (!P.battleById[id]) err('media reel battle ' + id); for (const r of list) if (!r.id || !r.title || !r.text || !r.minutes || !/^\d{4}-\d\d-\d\d$/.test(r.date)) err('media reel ' + id + ' ' + r.id); }
  for (const b of P.BATTLES.filter(b => b.tactical)) {
    const T = b.tactical, [[s0, w0], [n0, e0]] = T.bounds, padLat = (n0 - s0) * .25, padLng = (e0 - w0) * .25;
    const inside = ([la, ln]) => la >= s0 - padLat && la <= n0 + padLat && ln >= w0 - padLng && ln <= e0 + padLng;
    for (const [id, u] of Object.entries(T.units)) if (!sides.includes(u.side) || !u.name) err('tactical unit ' + b.id + ' ' + id);
    const used = new Set();
    T.phases.forEach((ph, k) => {
      if (!ph.time || !ph.title || !ph.text) err('tactical phase text ' + b.id + ' ' + (k + 1));
      for (const [id, pts] of Object.entries(ph.units || {})) { used.add(id); if (!T.units[id]) err('tactical unknown unit ' + b.id + ' ' + id); else if (pts && (pts.length < 2 || !pts.every(inside))) err('tactical position off the map ' + b.id + ' step ' + (k + 1) + ' ' + id); }
      for (const a of ph.arrows || []) if (!sides.includes(a.side) || !a.pts.every(inside)) err('tactical arrow ' + b.id + ' step ' + (k + 1));
    });
    for (const id of Object.keys(T.units)) if (!used.has(id)) err('tactical unit never placed ' + b.id + ' ' + id);
    for (const pl of T.places || []) if (!inside(pl.ll)) err('tactical place off the map ' + b.id + ' ' + pl.name);
  }
  for (const b of P.BATTLES) for (const l of (b.tactical && b.tactical.lines) || []) if (!['road', 'stream', 'rail'].includes(l.kind) || !l.name || l.pts.length < 2) err('tactical line ' + b.id + ' ' + l.name);
  for (const o of P.OBJECTS) {
    for (const k of ['id', 'group', 'kind', 'title', 'date', 'holder', 'src', 'ref', 'license', 'text']) if (!o[k]) err('object ' + (o.id || '?') + ' missing ' + k);
    if (oids.has(o.id)) err('duplicate object ' + o.id); oids.add(o.id);
    if (!['soldiers', 'weapons', 'civilians', 'leaders'].includes(o.group)) err('object group ' + o.id);
    if (!['artifact', 'model'].includes(o.kind)) err('object kind ' + o.id);
    if (!['CC0', 'CC BY 4.0'].includes(o.license)) err('object license ' + o.id);
    if (o.src === 'si' && !(o.glb && o.glbHi)) err('object model file ' + o.id);
    if (o.src === 'sketchfab' && !o.by) err('object credit ' + o.id);
    if (!Array.isArray(o.look) || !o.look.length) err('object questions ' + o.id);
    if (o.battle && !P.battleById[o.battle]) err('object battle ' + o.id + ' ' + o.battle);
  }
  for (const t of P.TOURS) for (const s of t.stops) { if (s.battle && !P.battleById[s.battle]) err('tour battle ' + t.id + ' ' + s.battle); if (s.campaign && !P.campaignById[s.campaign]) err('tour campaign ' + t.id + ' ' + s.campaign); if (s.battle && !P.battleById[s.battle].journal[s.entry || 0]) err('tour entry ' + t.id + ' ' + s.title); if (!s.battle && !s.campaign && !s.day) err('tour stop target ' + s.title); }
  Object.values(P.PORTRAITS).forEach(i => files.push(i.file)); files.push(w.cover);
}
require('fs').writeFileSync(path.join(__dirname, 'image_files.json'), JSON.stringify([...new Set(files)]));
console.log('unique images:', new Set(files).size);
