"""Check specific quotes against specific web editions. Usage: python3 -I direct.py"""
import json, os, re, sys, time, html, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
quotes = {('%s/%s/%d' % (q['war'], q['battle'], q['i'])): q for q in json.load(open(os.path.join(HERE, 'quotes.json')))}
targets = json.load(open(os.path.join(HERE, sys.argv[1] if len(sys.argv) > 1 else 'direct_targets.json')))
resp = os.path.join(HERE, 'results_direct.json'); results = json.load(open(resp)) if os.path.exists(resp) else {}
def strip(h):
    h = re.sub(r'(?s)<(script|style)[^>]*>.*?</\1>', ' ', h)
    return html.unescape(re.sub(r'<[^>]+>', ' ', h))
cache = {}
for key, url, title in targets:
    q = quotes[key]
    if url not in cache:
        raw = qv.get(url); time.sleep(1); cache[url] = strip(raw.decode('utf-8', errors='replace')) if raw else ''
    raw = cache[url]
    if not raw: print(key, 'FETCH FAILED', url); continue
    tn, tidx = qv.norm_map(raw); segs = qv.segments(q['quote']); res = [qv.align(s, tn, tidx, raw) for s in segs]
    ratio = min(r for r, _ in res); passages = [re.sub(r'\s+', ' ', p).strip() for _, p in res]
    results[key] = {'ratio': round(ratio, 3), 'url': url, 'title': title, 'passages': passages}
    print('%.3f %s' % (ratio, key)); 
    if ratio < 0.999: print('   Q:', q['quote'][:330]); print('   S:', ' || '.join(passages)[:360])
json.dump(results, open(resp, 'w'), indent=1)
