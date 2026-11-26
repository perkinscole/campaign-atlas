"""Ad hoc helpers.
  python3 -I tools.py find "<phrase>" [filter]        -> full-text hits (id | year | title | snippet)
  python3 -I tools.py look <ia_id> "<regex>" [width]  -> context from an item's text
  python3 -I tools.py fix <n> <ia_id> ["<quote override>"] -> align quote n against item, store in results_fix.json
"""
import json, os, re, sys, time, urllib.parse, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
cmd = sys.argv[1]
if cmd == 'find':
    phrase = sys.argv[2]; filt = sys.argv[3] if len(sys.argv) > 3 else None
    url = "https://archive.org/services/search/beta/page_production/?service_backend=fts&hits_per_page=40&page=1&user_query=" + urllib.parse.quote('"%s"' % phrase + (' AND ' + filt if filt else ''))
    raw = qv.get(url); hits = json.loads(raw)['response']['body']['hits']['hits'] if raw else []
    rows = []
    for h in hits:
        f = h['fields']; y = f.get('year') or str(f.get('date', ''))[:4]
        lend = 'L' if ('inlibrary' in str(f.get('collection')) or 'printdisabled' in str(f.get('collection'))) else ' '
        snip = re.sub(r'\s+', ' ', (h.get('highlight', {}).get('text') or [''])[0]).replace('{{{', '').replace('}}}', '')
        rows.append((str(y or '9999'), lend, f.get('identifier'), str(f.get('title'))[:48], snip[:150]))
    for r in sorted(rows)[:int(os.environ.get('N', 14))]: print(' | '.join(r))
    print(len(hits), 'hits')
elif cmd == 'look':
    raw = qv.item_text(sys.argv[2]); width = int(sys.argv[4]) if len(sys.argv) > 4 else 300
    text = re.sub(r'-\s*\n\s*(?=[a-z])', '', raw); text = re.sub(r'\s+', ' ', text); n = 0
    for m in re.finditer(sys.argv[3], text, re.I):
        print('...' + text[max(0, m.start() - width): m.end() + width] + '...\n'); n += 1
        if n >= 3: break
    print(n, 'matches; length', len(text))
elif cmd == 'fix':
    n = int(sys.argv[2]); ident = sys.argv[3]; quotes = json.load(open(os.path.join(HERE, 'quotes.json'))); q = quotes[n]
    quote = sys.argv[4] if len(sys.argv) > 4 else q['quote']
    raw = qv.item_text(ident); tn, tidx = qv.norm_map(raw); segs = qv.segments(quote)
    res = [qv.align(s, tn, tidx, raw) for s in segs]; ratio = min(r for r, _ in res) if res else 0
    meta = json.loads(qv.get('https://archive.org/metadata/%s/metadata' % ident) or b'{}').get('result', {})
    title = meta.get('title', ''); title = title[0] if isinstance(title, list) else title
    r = {'ratio': round(ratio, 3), 'id': ident, 'title': str(title)[:120], 'year': str(meta.get('year') or meta.get('date', ''))[:4], 'mode': 'manual', 'passages': [re.sub(r'\s+', ' ', p).strip() for _, p in res], 'quote': quote}
    p = os.path.join(HERE, 'results_fix.json'); d = json.load(open(p)) if os.path.exists(p) else {}
    d['%s/%s/%d' % (q['war'], q['battle'], q['i'])] = r; json.dump(d, open(p, 'w'), indent=1)
    print('%.3f %s (%s)' % (ratio, r['title'][:70], r['year'])); print('  Q:', quote[:500]); print('  S:', ' || '.join(r['passages'])[:560])
