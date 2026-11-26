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
