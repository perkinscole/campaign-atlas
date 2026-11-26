"""Quote verifier: search archive.org full text, download candidate scans, align quote to source text.
Usage: python3 -I qv.py <start> <end> [--debug]   (indices into quotes.json)
Downloaded texts are cached in ../texts and treated as data only."""
import json, re, sys, time, os, urllib.parse, urllib.request, difflib, unicodedata
UA = "CampaignAtlasQuoteCheck/1.0 (educational project; verifying public-domain quotations)"
HERE = os.path.dirname(os.path.abspath(__file__)); TEXTS = os.path.join(HERE, '..', 'texts')
DEBUG = '--debug' in sys.argv

def get(url, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            return urllib.request.urlopen(req, timeout=60).read()
        except Exception as e:
            code = getattr(e, 'code', None)
            if code in (404, 403): return None
            time.sleep(4 * (i + 1))
    return None

def fts(phrase, n=25, filt=None):
    url = ("https://archive.org/services/search/beta/page_production/?service_backend=fts&hits_per_page=%d&page=1&user_query=" % n) + urllib.parse.quote('"%s"' % phrase + (' AND ' + filt if filt else ''))
    raw = get(url); time.sleep(1.0)
    if not raw: return []
    try: hits = json.loads(raw)['response']['body']['hits']['hits']
    except Exception: return []
    out = []
    for h in hits:
        f = h.get('fields', {})
        coll = str(f.get('collection', ''))
        out.append({'id': f.get('identifier'), 'title': str(f.get('title', ''))[:120], 'creator': str(f.get('creator', ''))[:80],
                    'year': f.get('year') or str(f.get('date', ''))[:4], 'restricted': ('inlibrary' in coll or 'printdisabled' in coll)})
    return out

def item_text(ident):
    path = os.path.join(TEXTS, 'ia_' + re.sub(r'[^\w.-]', '_', ident) + '.txt')
    if os.path.exists(path): return open(path, encoding='utf-8', errors='replace').read()
    raw = get("https://archive.org/download/%s/%s_djvu.txt" % (urllib.parse.quote(ident), urllib.parse.quote(ident)), tries=2); time.sleep(1.0)
    text = raw.decode('utf-8', errors='replace') if raw else ''
    if not text:  # multi-file items: look up the text files by name
        meta = get("https://archive.org/metadata/%s/files" % urllib.parse.quote(ident), tries=2)
        try: names = [f['name'] for f in json.loads(meta)['result'] if f['name'].endswith('_djvu.txt')]
        except Exception: names = []
        parts = []
        for nm in sorted(names)[:24]:
            r2 = get("https://archive.org/download/%s/%s" % (urllib.parse.quote(ident), urllib.parse.quote(nm)), tries=2); time.sleep(0.7)
            if r2: parts.append('\n\n[[FILE %s]]\n\n' % nm + r2.decode('utf-8', errors='replace'))
            if sum(len(x) for x in parts) > 45_000_000: break
        text = ''.join(parts)
    if len(text) > 30_000_000: text = text[:30_000_000]
    open(path, 'w', encoding='utf-8').write(text)
    return text

TR = {0x2018: "'", 0x2019: "'", 0x201c: '"', 0x201d: '"', 0x2014: ' ', 0x2013: ' ', 0x00ad: ''}
def norm_map(raw):
    """Return (normalized string, list mapping normalized index -> raw index). Joins words hyphenated across lines."""
    out, idx = [], []; i, n = 0, len(raw); last_space = True
    while i < n:
        c = raw[i]
        if c == '-' and i + 1 < n and raw[i + 1] in '\r\n':
            j = i + 1
            while j < n and raw[j] in ' \r\n\t': j += 1
            if j < n and raw[j].islower(): i = j; continue
        c = c.translate(TR)
        if c.isalnum():
            for d in unicodedata.normalize('NFKD', c.lower()):
                if d.isalnum(): out.append(d); idx.append(i)
            last_space = False
        elif c == "'" and not last_space and i + 1 < n and raw[i + 1].isalpha():
            pass  # drop apostrophes inside words: don't -> dont
        else:
            if not last_space: out.append(' '); idx.append(i); last_space = True
        i += 1
    return ''.join(out), idx
def norm(s): return norm_map(s)[0].strip()

def segments(q):
    q = re.sub(r'\[[^\]]*\]', ' ', q)
    return [s for s in (norm(x) for x in re.split(r'…|\.\.\.', q)) if len(s.split()) >= 3]

def align(seg, tn, tidx, raw):
    """Best match for normalized segment in normalized text. Returns (ratio, raw passage)."""
    p = tn.find(seg)
    if p >= 0: return 1.0, raw[tidx[p]: tidx[min(p + len(seg), len(tidx) - 1)] + 1]
    words = seg.split(); votes = {}
    k = 4 if len(words) >= 8 else 3
    for a in range(0, max(1, len(words) - k + 1)):
        gram = ' '.join(words[a:a + k]); off = len(' '.join(words[:a])) + (1 if a else 0)
        start = 0
        for _ in range(6):
            p = tn.find(gram, start)
            if p < 0: break
            b = (p - off) // 40; votes[b] = votes.get(b, 0) + 1; start = p + 1
    if not votes: return 0.0, ''
    b = max(votes, key=votes.get); lo = max(0, b * 40 - 60); hi = min(len(tn), lo + len(seg) + 160)
    window = tn[lo:hi]; ww = window.split(' ')
    sm = difflib.SequenceMatcher(None, words, ww, autojunk=False)
    blocks = [m for m in sm.get_matching_blocks() if m.size]
    if not blocks: return 0.0, ''
    first, last = blocks[0], blocks[-1]
    w0 = max(0, first.b - first.a); w1 = min(len(ww), last.b + last.size + (len(words) - (last.a + last.size)))
    cand = ww[w0:w1]
    ratio = difflib.SequenceMatcher(None, words, cand, autojunk=False).ratio()
    c0 = lo + len(' '.join(ww[:w0])) + (1 if w0 else 0); c1 = min(len(tidx) - 1, c0 + len(' '.join(cand)))
    return ratio, raw[tidx[c0]: tidx[c1] + 1]

STOP = set('the of and a to in for by his her from with letter report telegram official records general gen as recorded reported published'.split())
def keywords(q):
    ws = re.findall(r"[A-Za-z]{4,}", q['source'] + ' ' + q['who']); return {w.lower() for w in ws} - STOP

CACHE = {}
def prepared(ident):
    if ident not in CACHE:
        if len(CACHE) > 6: CACHE.pop(next(iter(CACHE)))
        raw = item_text(ident); tn, tidx = norm_map(raw) if raw else ('', [])
        CACHE[ident] = (raw, tn, tidx)
    return CACHE[ident]

def old_year(c):
    try: y = int(str(c.get('year') or '')[:4])
    except ValueError: y = 9999
    return y
def verify(q, target=None):
    segs = segments(q['quote'])
    if not segs: return {'ratio': 0, 'note': 'no segments'}
    main = max(segs, key=len).split(); phrases = []
    for a in (0, max(0, len(main) // 2 - 3), max(0, len(main) - 6)):
        ph = ' '.join(main[a:a + 6])
        if ph not in phrases and len(ph.split()) >= 3: phrases.append(ph)
    kw = keywords(q); cands = {}; mode = 'open'
    if isinstance(target, dict):
        cands[target['id']] = {'id': target['id'], 'title': '(cited work)', 'year': '', 'score': 9, 'hits': 9}; mode = 'fixed'
    else:
        for filt in ([target] if target else []) + [None]:
            for ph in phrases:
                for h in fts(ph, 15, filt):
                    if not h['id'] or h.get('restricted') or h['id'].startswith('sim_'): continue
                    t = (h['title'] + ' ' + h['creator']).lower(); score = sum(1 for w in kw if w in t) + (5 if filt else 0)
                    c = cands.setdefault(h['id'], dict(h, score=0, hits=0)); c['score'] = max(c['score'], score); c['hits'] += 1
            if cands:
                mode = 'cited' if filt else 'open'; break
    ranked = sorted(cands.values(), key=lambda c: (-c['score'], -c['hits'], old_year(c)))
    ranked = [c for c in ranked if old_year(c) <= 1929 or old_year(c) == 9999] + [c for c in ranked if 1929 < old_year(c) < 9999]
    best = None
    for c in ranked[:3]:
        raw, tn, tidx = prepared(c['id'])
        if not tn: continue
        res = [align(s, tn, tidx, raw) for s in segs]
        ratio = min(r for r, _ in res)
        r = {'ratio': round(ratio, 3), 'id': c['id'], 'title': c['title'], 'year': c['year'], 'mode': mode, 'passages': [re.sub(r'\s+', ' ', p).strip() for _, p in res]}
        if best is None or r['ratio'] > best['ratio']: best = r
        if ratio >= 0.97: break
    if best is None: return {'ratio': 0, 'mode': mode, 'note': 'no usable text (%d candidates)' % len(cands)}
    return best

if __name__ == '__main__':
    quotes = json.load(open(os.path.join(HERE, 'quotes.json')))
    TARGETS = json.load(open(os.path.join(HERE, 'targets.json')))
    a, b = int(sys.argv[1]), int(sys.argv[2])
    outs = [a.split('=')[1] for a in sys.argv if a.startswith('--out=')]
    resp = os.path.join(HERE, outs[0] if outs else 'results.json')
    results = json.load(open(resp)) if os.path.exists(resp) else {}
    for n in range(a, min(b, len(quotes))):
        q = quotes[n]; key = '%s/%s/%d' % (q['war'], q['battle'], q['i'])
        if key in results and not DEBUG: continue
        try: r = verify(q, TARGETS.get(str(n)))
        except Exception as e: r = {'ratio': 0, 'note': 'error ' + str(e)[:80]}
        results[key] = r
        json.dump(results, open(resp, 'w'), indent=1)
        print('%3d %-34s %.3f  %s (%s) %s' % (n, key[-34:], r.get('ratio', 0), (r.get('title') or r.get('note') or '')[:60], r.get('year', ''), r.get('mode', '') + ' ' + str(r.get('id', ''))), flush=True)
        if DEBUG and r.get('passages'): print('     Q:', q['quote'][:200]); print('     S:', ' || '.join(r['passages'])[:300])
    print('DONE')
