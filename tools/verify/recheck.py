"""Re-check every verified entry of a pack against the text its `ref` points to.
Usage: python3 -I recheck.py <projectDir> <warId> [minRatio]
Understands archive.org item links, Wikisource pages, and plain web pages (e.g. Hansard)."""
import json, os, re, subprocess, sys, html, hashlib, urllib.parse, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
proj, war = sys.argv[1], sys.argv[2]; minr = float(sys.argv[3]) if len(sys.argv) > 3 else 0.9
JS = r"""
const path=require('path'); const dir=process.argv[1], war=process.argv[2];
global.window=global; global.location={search:'?war='+war}; global.document={getElementById:()=>null,documentElement:{style:{setProperty(){}}}};
require(path.join(dir,'data/index.js')); require(path.join(dir,'js/core.js'));
let P; const reg=Atlas.register; Atlas.register=p=>{reg(p);P=p;}; require(path.join(dir,'data',war+'.js'));
const out=[]; P.BATTLES.forEach(b=>b.journal.forEach((j,i)=>out.push({key:b.id+'/'+i,quote:j.quote,ref:j.ref||'',verified:!!j.verified})));
console.log(JSON.stringify(out));
"""
entries = json.loads(subprocess.run(['node', '-e', JS, proj, war], capture_output=True, text=True, check=True).stdout)
def strip(h):
    h = re.sub(r'(?s)<(script|style|sup)[^>]*>.*?</\1>', ' ', h); return html.unescape(re.sub(r'<[^>]+>', ' ', h))
def text_for(ref):
    m = re.match(r'https://archive\.org/details/([^?/]+)', ref)
    if m: return qv.item_text(urllib.parse.unquote(m.group(1)))
    path = os.path.join(qv.TEXTS, 'web_' + hashlib.md5(ref.encode()).hexdigest() + '.txt')
    if os.path.exists(path): return open(path, encoding='utf-8').read()
    m = re.match(r'https://en\.wikisource\.org/wiki/(.+)', ref)
    if m:
        raw = qv.get('https://en.wikisource.org/w/api.php?' + urllib.parse.urlencode({'action': 'parse', 'page': urllib.parse.unquote(m.group(1)).replace('_', ' '), 'prop': 'text', 'format': 'json', 'redirects': 1}))
        try: t = strip(json.loads(raw)['parse']['text']['*'])
        except Exception: t = ''
    else:
        raw = qv.get(ref); t = strip(raw.decode('utf-8', errors='replace')) if raw else ''
    open(path, 'w', encoding='utf-8').write(t); return t
bad = 0; unver = 0
for e in entries:
    if not e['verified']: unver += 1; continue
    raw = text_for(e['ref'])
    if not raw: print('NO TEXT  %-28s %s' % (e['key'], e['ref'][:70])); bad += 1; continue
    tn, tidx = qv.norm_map(raw); res = [qv.align(s, tn, tidx, raw) for s in qv.segments(e['quote'])]
    ratio = min(r for r, _ in res) if res else 0
    flag = 'ok ' if ratio >= minr else 'LOW'
    if ratio < minr: bad += 1
    if ratio < 0.999: print('%s %.3f %-28s' % (flag, ratio, e['key'])); 
    if ratio < minr: print('      Q: ' + e['quote'][:300]); print('      S: ' + ' || '.join(re.sub(r'\s+', ' ', p) for _, p in res)[:340])
print('%d entries, %d verified, %d unverified, %d need attention' % (len(entries), len(entries) - unver, unver, bad))
