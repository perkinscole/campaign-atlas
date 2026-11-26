"""Second pipeline: verify quotes against Wikisource (proofread transcriptions). Usage: python3 -I ws.py"""
import json, os, re, sys, time, html, urllib.parse, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
API = 'https://en.wikisource.org/w/api.php?'
def api(params):
    raw = qv.get(API + urllib.parse.urlencode(dict(params, format='json'))); time.sleep(0.8)
    try: return json.loads(raw) if raw else {}
    except Exception: return {}
def strip(h):
    h = re.sub(r'(?s)<(script|style|sup)[^>]*>.*?</\1>', ' ', h)
    return html.unescape(re.sub(r'<[^>]+>', ' ', h))
PAGES = {}
def page_text(title):
    if title not in PAGES:
        d = api({'action': 'parse', 'page': title, 'prop': 'text', 'redirects': 1})
        PAGES[title] = strip(d.get('parse', {}).get('text', {}).get('*', ''))
        if len(PAGES) > 40: PAGES.pop(next(iter(PAGES)))
    return PAGES[title]
quotes = json.load(open(os.path.join(HERE, 'quotes.json')))
resp = os.path.join(HERE, 'results_ws.json'); results = json.load(open(resp)) if os.path.exists(resp) else {}
for n, q in enumerate(quotes):
    key = '%s/%s/%d' % (q['war'], q['battle'], q['i'])
    if key in results: continue
    segs = qv.segments(q['quote']); best = {'ratio': 0}
    if segs:
        main = max(segs, key=len).split(); titles = []
        for a in (0, max(0, len(main) // 2 - 3)):
            ph = ' '.join(main[a:a + 7])
            d = api({'action': 'query', 'list': 'search', 'srsearch': '"%s"' % ph, 'srnamespace': '0', 'srlimit': 5})
            for h in d.get('query', {}).get('search', []):
                if h['title'] not in titles: titles.append(h['title'])
        for t in titles[:5]:
            raw = page_text(t)
            if not raw: continue
            tn, tidx = qv.norm_map(raw); res = [qv.align(s, tn, tidx, raw) for s in segs]
            ratio = min(r for r, _ in res)
            if ratio > best['ratio']:
                best = {'ratio': round(ratio, 3), 'title': t, 'url': 'https://en.wikisource.org/wiki/' + urllib.parse.quote(t.replace(' ', '_')), 'passages': [re.sub(r'\s+', ' ', p).strip() for _, p in res]}
            if ratio >= 0.999: break
    results[key] = best; json.dump(results, open(resp, 'w'), indent=1)
    print('%3d %-36s %.3f  %s' % (n, key[-36:], best['ratio'], best.get('title', '')[:70]), flush=True)
print('DONE')
