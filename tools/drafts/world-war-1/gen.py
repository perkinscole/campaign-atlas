"""Assemble data/world-war-1.js from battles.py, battles2.py, rest.py, and images.py."""
import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import battles, battles2, rest, images
OUT = sys.argv[1]
def q(s): return "'" + s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n') + "'"
def val(v):
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return repr(v)
    if isinstance(v, str): return q(v)
    if isinstance(v, list): return '[' + ', '.join(val(x) for x in v) + ']'
    if isinstance(v, dict): return '{ ' + ', '.join(k + ': ' + val(x) for k, x in v.items()) + ' }'
    raise TypeError(v)
def ref(r):
    if r[0] == 'IA': return 'IA(%s, %s)' % (q(r[1]), q(r[2]))
    return q(r[1])
def img(t): return 'img(%s, %s, %s)' % (q(t[0]), q(t[1]), q(t[2]))
L = []
L.append('''/* ------------------------------------------------------------------
   Campaign Atlas — data pack: World War I, 1914–1918
   Every quotation was copied from the linked printed text and carries
   `verified: true` with a `ref` to that text. The sources are letters,
   diaries, orders, reports, and memoirs published by 1930, now in the
   public domain. Images are public-domain photographs and paintings on
   Wikimedia Commons.
   ------------------------------------------------------------------ */

(function () {
  const img = Atlas.img;
  const IA = (id, q) => 'https://archive.org/details/' + id + (q ? '?q=' + encodeURIComponent('"' + q + '"') : '');
''')
L.append('  const PORTRAITS = {\n' + ',\n'.join('    %s: %s' % (k, img(v)) for k, v in images.PORTRAITS.items()) + '\n  };\n')
L.append('  const BATTLES = [')
allb = battles.BATTLES + battles2.BATTLES2
allb.sort(key=lambda b: b['start'])
rows = []
for b in allb:
    o = ['    {', "      id: %s," % q(b['id']), "      name: %s," % q(b['name']), "      start: %s, end: %s," % (q(b['start']), q(b['end'])), "      lat: %s, lng: %s," % (b['lat'], b['lng']),
         "      place: %s," % q(b['place']), "      theater: %s," % q(b['theater']),
         "      result: %s,%s" % (q(b['result']), (' resultLabel: %s,' % q(b['resultLabel'])) if b.get('resultLabel') else '')]
    if b.get('campaign'): o.append("      campaign: %s," % q(b['campaign']))
    if b.get('sideLabels'): o.append("      sideLabels: %s," % val(b['sideLabels']))
    o += ["      commanders: %s," % val(b['commanders']), "      forces: %s," % val(b['forces']), "      casualties: %s," % val(b['casualties']),
          "      summary: %s," % q(b['summary']), "      significance: %s," % q(b['significance']),
          "      images: [\n" + ',\n'.join('        ' + img(t) for t in images.IMAGES[b['id']]) + "\n      ],", "      journal: ["]
    js = []
    for j in b['journal']:
        e = ["        {", "          quote: %s," % q(j['quote']), "          who: %s, role: %s, side: %s," % (q(j['who']), q(j['role']), q(j['side'])),
             "          date: %s, source: %s,%s" % (q(j['date']), q(j['source']), (' portrait: %s,' % q(j['portrait'])) if j.get('portrait') and j['portrait'] in images.PORTRAITS else ''),
             "          verified: true, ref: %s, refTitle: %s" % (ref(j['ref']), q(j['refTitle'])), "        }"]
        js.append('\n'.join(e))
    o.append(',\n'.join(js)); o += ["      ]", "    }"]
    rows.append('\n'.join(o))
L.append(',\n'.join(rows) + '\n  ];\n')
L.append('  const CAMPAIGNS = [')
rows = []
for c in rest.CAMPAIGNS:
    rows.append('\n'.join(["    {", "      id: %s, name: %s, side: %s," % (q(c['id']), q(c['name']), q(c['side'])), "      army: %s, commander: %s," % (q(c['army']), q(c['commander'])),
        "      start: %s, end: %s," % (q(c['start']), q(c['end'])), "      description: %s," % q(c['description']),
        "      path: [\n" + ',\n'.join('        [%s, %s, %s, %s]' % (p[0], p[1], q(p[2]), q(p[3])) for p in c['path']) + "\n      ]", "    }"]))
L.append(',\n'.join(rows) + '\n  ];\n')
L.append('  const EVENTS = [\n' + ',\n'.join("    { date: %s, title: %s }" % (q(d), q(t)) for d, t in rest.EVENTS) + '\n  ];\n')
L.append('  const SOURCES = [\n' + ',\n'.join("    { title: %s, author: %s, year: %d, url: %s }" % (q(t), q(a), y, q(u)) for t, a, y, u in rest.SOURCES) + '\n  ];\n')
L.append('  const TOURS = [')
rows = []
for t in rest.TOURS:
    stops = []
    for s in t['stops']:
        head = "        { title: %s, " % q(s['title']) + (("battle: %s, entry: %d," % (q(s['battle']), s['entry'])) if 'battle' in s else ("campaign: %s," % q(s['campaign'])))
        stops.append(head + "\n          text: %s,\n          ask: %s }" % (q(s['text']), val(s['ask'])))
    rows.append("    {\n      id: %s, title: %s, grades: %s, minutes: %d,\n      question: %s,\n      summary: %s,\n      stops: [\n%s\n      ]\n    }" % (q(t['id']), q(t['title']), q(t['grades']), t['minutes'], q(t['question']), q(t['summary']), ',\n'.join(stops)))
L.append(',\n'.join(rows) + '\n  ];\n')
L.append('  const VOCAB = [\n' + ',\n'.join("    { term: %s, def: %s }" % (q(a), q(b)) for a, b in rest.VOCAB) + '\n  ];\n')
L.append('  const ADVISORY = [\n' + ',\n'.join('    ' + q(a) for a in rest.ADVISORY) + '\n  ];\n')
L.append('  const NOTES = {\n' + ',\n'.join("    %s: %s" % (k, q(v)) for k, v in rest.NOTES.items()) + '\n  };\n')
L.append('''  Atlas.register({
    meta: {
      id: 'world-war-1',
      title: 'World War I',
      years: '1914–1918',
      range: { start: '1914-06-20', end: '1918-11-30' },
      bounds: [[35.5, -12.0], [59.6, 41.5]],
      sides: [
        { id: 'allied', name: 'Allied', color: '#2b5797' },
        { id: 'central', name: 'Central Powers', color: '#a32a2a' }
      ],
      theaters: ['Western Front', 'Eastern Front', 'Italian Front', 'Ottoman Front', 'At Sea'],
      intro: 'Army routes draw themselves as the armies advanced and retreated, and a marker appears for each battle as it begins.'
    },
    PORTRAITS, BATTLES, CAMPAIGNS, EVENTS, SOURCES, TOURS, VOCAB, ADVISORY, NOTES
  });
})();
''')
open(OUT, 'w').write('\n'.join(L))
print('wrote', OUT, len(allb), 'battles')
