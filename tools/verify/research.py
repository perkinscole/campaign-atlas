"""Batch source research. Usage: python3 -I research.py <queries.json> [hits]
queries.json: [[label, phrase, optional filter], ...]. Prints oldest open hits with snippets."""
import json, os, re, sys, time, urllib.parse, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
N = int(sys.argv[2]) if len(sys.argv) > 2 else 5
for row in json.load(open(sys.argv[1])):
    label, phrase = row[0], row[1]; filt = row[2] if len(row) > 2 else None
    url = "https://archive.org/services/search/beta/page_production/?service_backend=fts&hits_per_page=40&page=1&user_query=" + urllib.parse.quote('"%s"' % phrase + (' AND ' + filt if filt else ''))
    raw = qv.get(url); time.sleep(1.0)
    try: hits = json.loads(raw)['response']['body']['hits']['hits'] if raw else []
    except Exception: hits = []
    rows = []
    for h in hits:
        f = h['fields']; coll = str(f.get('collection'))
        if 'inlibrary' in coll or 'printdisabled' in coll: continue
        y = str(f.get('year') or str(f.get('date', ''))[:4] or '9999')
        snip = re.sub(r'\s+', ' ', (h.get('highlight', {}).get('text') or [''])[0]).replace('{{{', '').replace('}}}', '')
        rows.append((y, f.get('identifier'), str(f.get('title'))[:44], snip[:120]))
    print('## %s  (%d hits, %d open)' % (label, len(hits), len(rows)))
    for r in sorted(rows)[:N]: print('   ' + ' | '.join(r))
