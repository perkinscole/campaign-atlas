const path = require('path'); const dir = process.argv[2];
global.window = global; global.document = { getElementById: () => null, documentElement: { style: { setProperty() {} } } };
require(path.join(dir, 'data/index.js'));
const out = [];
for (const w of window.ATLAS_SITE.wars.filter(w => w.status === 'live')) {
  global.location = { search: '?war=' + w.id };
  delete require.cache[require.resolve(path.join(dir, 'js/core.js'))];
  require(path.join(dir, 'js/core.js'));
  let P; const reg = Atlas.register; Atlas.register = p => { reg(p); P = p; };
  require(path.join(dir, 'data', w.id + '.js'));
  P.BATTLES.forEach(b => b.journal.forEach((j, i) => out.push({ war: w.id, battle: b.id, i, who: j.who, date: j.date, source: j.source, quote: j.quote })));
}
require('fs').writeFileSync(path.join(__dirname, 'quotes.json'), JSON.stringify(out, null, 1));
const by = {}; out.forEach(q => { const k = q.source.replace(/^As (recorded|reported|recalled|told)[^,;]*(by|to)? ?/, '~ ').slice(0, 70); by[k] = (by[k] || 0) + 1; });
console.log(out.length, 'quotes');
Object.entries(by).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(String(n).padStart(3), k));
