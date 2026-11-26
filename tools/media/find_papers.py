#!/usr/bin/env python3
"""Find newspaper pages that reported each battle, in the Library of Congress's Chronicling America.

Usage: python3 -I tools/media/find_papers.py <battles.json> <cache-dir> <out.json> [atlas-id]

battles.json is a list of {war, id, name, start, end}. For each battle the script searches the
dates just after it, looks at the page's word positions to find where the battle is named in the
largest type, and records a cropped "clipping" (an IIIF image URL) plus the link to the full page.
Requests are spaced out to stay inside the Library's rate limits. Everything it returns is in the
public domain; review the clippings by eye before publishing them."""
import json, os, re, sys, time, hashlib, subprocess, datetime, urllib.parse

BATTLES, CACHE, OUT = sys.argv[1:4]
ONLY = sys.argv[4] if len(sys.argv) > 4 else None      # optional: one atlas id
UA = 'newspaper-research-script/1.0'
os.makedirs(CACHE, exist_ok=True)
last = {'www': 0.0, 'tile': 0.0, 'item': 0.0}

def get(url, kind):
    path = os.path.join(CACHE, hashlib.md5(url.encode()).hexdigest() + '.json')
    if os.path.exists(path):
        try: return json.load(open(path))
        except Exception: pass
    for attempt in range(5):
        wait = (4.0 if kind == 'www' else 0.8) - (time.time() - last[kind])
        if wait > 0: time.sleep(wait)
        r = subprocess.run(['curl', '-s', '-m', '150' if kind == 'www' else '60', '-A', UA, '-w', '\n%{http_code}', url], capture_output=True, text=True)
        last[kind] = time.time()
        body, _, code = r.stdout.rpartition('\n')
        if code == '200':
            try:
                data = json.loads(body); json.dump(data, open(path, 'w')); return data
            except Exception: pass
        if code.startswith('4') and code != '429': return None   # a bad request will not get better
        time.sleep(30 if code == '429' else 6)
    return None

day = lambda s, n=0: (datetime.date.fromisoformat(s) + datetime.timedelta(days=n)).isoformat()

# Which papers to prefer, and how to describe where they were printed.
NORTH = ['new-york daily tribune', 'the new york herald', 'evening star (washington', 'chicago daily tribune', 'daily national republican', 'cleveland morning leader',
         'daily national intelligencer', 'the sun (new york', 'the portland daily press', 'daily ohio statesman', 'daily intelligencer (wheeling', 'the national republican',
         'the daily green mountain freeman', 'daily evening bulletin', 'the daily gate city', 'burlington free press', 'the press (philadelphia', 'new-york tribune']
SOUTH = ['the daily dispatch (richmond', 'richmond whig', 'richmond enquirer', 'daily richmond examiner', 'memphis daily appeal', 'semi-weekly standard (raleigh', 'weekly standard (raleigh',
         'the charleston mercury', 'charleston daily courier', 'staunton spectator', 'the abingdon virginian', 'yorkville enquirer', 'edgefield advertiser', 'the camden confederate',
         'the daily journal (wilmington', 'washington telegraph (washington, ark', 'the western democrat', 'the daily confederate', 'southern confederacy', 'keowee courier',
         'the lancaster ledger', 'fayetteville observer', 'the weekly mississippian', 'chattanooga daily rebel', 'the spirit of the age', 'the north-carolina standard', 'the daily progress']
PATRIOT = ['the pennsylvania packet', "dunlap's pennsylvania packet", 'the pennsylvania evening post', 'the virginia gazette', 'the connecticut courant', 'the new-jersey gazette',
           'new-hampshire gazette', 'the providence gazette', 'the pennsylvania gazette', 'the massachusetts spy', 'the boston-gazette', 'the essex gazette', 'the new-england chronicle',
           'the freeman', 'the independent chronicle', 'the continental journal', 'the norwich packet', 'the connecticut journal', 'the connecticut gazette', 'the maryland gazette', 'the pennsylvania journal']
CROWN = ['the new-york gazette, and the weekly mercury', 'the royal gazette', "rivington's"]
WW2 = ['evening star (washington', 'the daily alaska empire', 'detroit evening times', 'the wilmington morning star', 'the key west citizen', 'imperial valley press',
       'the daily monitor leader', 'henderson daily dispatch', 'the nome nugget', 'the midland journal', 'brownsville herald', 'the waterbury democrat', 'the sunday star']

# Search words and date windows that differ from the default (the battle's own name, the week after it ended).
SPECIAL = {
  'civil-war': {
    'fort-sumter': dict(q='Sumter', terms=['sumter']), 'first-bull-run': dict(q='Manassas', terms=['manassas', 'bull']), 'fort-donelson': dict(q='Donelson', terms=['donelson']),
    'shiloh': dict(q='Pittsburg Landing', terms=['pittsburg', 'shiloh', 'corinth'], days=10), 'seven-days': dict(q='Chickahominy', terms=['chickahominy', 'richmond', 'mcclellan']),
    'second-bull-run': dict(q='Manassas', terms=['manassas', 'bull']), 'antietam': dict(q='Sharpsburg', terms=['sharpsburg', 'antietam', 'mcclellan']),
    'stones-river': dict(q='Murfreesboro', terms=['murfreesboro', 'murfreesborough', 'rosecrans']), 'chancellorsville': dict(q='Hooker', terms=['chancellorsville', 'chancellorville', 'hooker']),
    'vicksburg': dict(q='Vicksburg', terms=['vicksburg'], start='1863-07-05', days=9), 'fort-wagner': dict(q='Wagner', terms=['wagner', 'charleston']),
    'chattanooga': dict(q='Chattanooga', terms=['chattanooga', 'lookout', 'bragg']), 'wilderness': dict(q='Wilderness', terms=['wilderness', 'grant'], days=9),
    'spotsylvania': dict(q='Spottsylvania', terms=['spottsylvania', 'spotsylvania', 'grant'], start='1864-05-10', days=12), 'cold-harbor': dict(q='Cold Harbor', terms=['harbor', 'chickahominy'], start='1864-06-02', days=10),
    'atlanta': dict(q='Atlanta', terms=['atlanta', 'sherman'], start='1864-09-03', days=8), 'franklin': dict(q='Franklin Hood', terms=['franklin', 'hood', 'schofield']),
    'nashville': dict(q='Nashville Hood', terms=['nashville', 'hood', 'thomas']), 'savannah': dict(q='Savannah', terms=['savannah', 'sherman'], start='1864-12-22', days=10),
    'petersburg': dict(q='Petersburg', terms=['petersburg', 'richmond'], start='1865-04-03', days=6), 'appomattox': dict(q='Lee surrender', terms=['surrender', 'lee', 'surrendered'], start='1865-04-10', days=6),
    'wilsons-creek': dict(q='Lyon Springfield', terms=['lyon', 'springfield'], days=10), 'balls-bluff': dict(q='Leesburg', terms=['leesburg', 'bluff', 'baker']),
    'pea-ridge': dict(q='Pea Ridge', terms=['ridge', 'elkhorn', 'curtis'], days=14), 'hampton-roads': dict(q='Merrimac', terms=['merrimac', 'monitor']),
    'new-orleans': dict(q='New Orleans', terms=['orleans', 'farragut'], start='1862-04-26', days=10), 'south-mountain': dict(q='South Mountain', terms=['mountain', 'hagerstown', 'boonsboro']),
    'perryville': dict(q='Perryville', terms=['perryville', 'bragg', 'buell'], days=10), 'brandy-station': dict(q='Brandy Station', terms=['brandy', 'beverly', 'stuart', 'pleasanton']),
    'champion-hill': dict(q='Vicksburg', terms=['champion', 'jackson', 'vicksburg', 'grant'], days=12), 'port-hudson': dict(q='Port Hudson', terms=['hudson'], start='1863-07-09', days=12),
    'fort-pillow': dict(q='Fort Pillow', terms=['pillow', 'forrest'], days=10), 'kennesaw-mountain': dict(q='Kenesaw', terms=['kenesaw', 'kennesaw', 'sherman'], days=9),
    'monocacy': dict(q='Monocacy', terms=['monocacy', 'wallace']), 'mobile-bay': dict(q='Mobile Farragut', terms=['mobile', 'farragut'], days=12),
    'cedar-creek': dict(q='Sheridan', terms=['sheridan', 'cedar', 'early']), 'bentonville': dict(q='Bentonville', terms=['bentonville', 'sherman', 'johnston'], days=12),
    'sailors-creek': dict(q='Ewell', terms=['ewell', 'sailor', 'sheridan']), 'chickamauga': dict(q='Chickamauga', terms=['chickamauga', 'rosecrans']),
    'fredericksburg': dict(q='Fredericksburg', terms=['fredericksburg', 'burnside'], start='1862-12-13', days=8), 'gettysburg': dict(q='Gettysburg', terms=['gettysburg', 'meade'], start='1863-07-03', days=6)
  },
  'american-revolution': {
    'lexington-concord': dict(q='Lexington', terms=['lexington', 'concord']), 'fort-ticonderoga': dict(q='Ticonderoga', terms=['ticonderoga', 'tyconderoga', 'ticonderoga,']),
    'bunker-hill': dict(q='Charlestown', terms=["bunker's", 'bunker', 'charlestown', 'charleftown']), 'quebec': dict(q='Quebec', terms=['quebec', 'montgomery']),
    'dorchester-heights': dict(q='Boston', terms=['dorchester', 'boston', 'bofton'], start='1776-03-10'), 'long-island': dict(q='Long-Island', terms=['long-island', 'island', 'brookline', 'brooklyn']),
    'trenton': dict(q='Trenton', terms=['trenton', 'hessians', 'heffians']), 'princeton': dict(q='Princeton', terms=['princeton', 'princetown', 'prince-town']),
    'bennington': dict(q='Bennington', terms=['bennington', 'stark']), 'brandywine': dict(q='Brandywine', terms=['brandywine', 'brandiwine', "chad's"]),
    'saratoga': dict(q='Burgoyne', terms=['burgoyne', 'saratoga'], start='1777-10-17'), 'monmouth': dict(q='Monmouth', terms=['monmouth']),
    'charleston': dict(q='Charlestown', terms=['charlestown', 'charleftown', 'lincoln'], start='1780-05-14'), 'camden': dict(q='Camden', terms=['camden', 'gates']),
    'kings-mountain': dict(q='Ferguson', terms=['ferguson', "king's"]), 'cowpens': dict(q='Tarleton', terms=['tarleton', 'cowpens', 'morgan']),
    'guilford-courthouse': dict(q='Guilford', terms=['guilford', 'cornwallis']), 'yorktown': dict(q='Cornwallis', terms=['cornwallis', 'york'], start='1781-10-20'),
    'valley-forge': None
  },
  'world-war-2-europe': {
    'poland': dict(q='Poland', terms=['poland', 'warsaw', 'hitler'], start='1939-09-01', days=2), 'dunkirk': dict(q='Dunkerque', terms=['dunkerque', 'dunkirk', 'flanders'], start='1940-05-30', days=6),
    'battle-of-britain': dict(q='London RAF', terms=['raf', 'london', 'nazi'], start='1940-09-15', days=3), 'moscow': dict(q='Russia', terms=['russia', 'soviet', 'reds', 'nazis'], start='1941-06-22', days=2),
    'leningrad': dict(q='Leningrad', terms=['leningrad'], start='1944-01-27', days=4), 'stalingrad': dict(q='Stalingrad', terms=['stalingrad'], start='1943-02-01', days=4),
    'el-alamein': dict(q='Rommel', terms=['rommel', 'egypt', 'axis'], start='1942-11-04', days=3), 'tunisia': dict(q='Tunis', terms=['tunis', 'bizerte', 'tunisia'], start='1943-05-07', days=7),
    'atlantic': dict(q='U-boats', terms=['u-boats', 'u-boat', 'submarines'], start='1943-05-20', days=25), 'warsaw-ghetto': dict(q='Warsaw ghetto', terms=['ghetto', 'warsaw'], start='1943-04-21', days=45),
    'kursk': dict(q='Kursk', terms=['kursk', 'orel', 'belgorod'], start='1943-07-06', days=9), 'sicily': dict(q='Sicily', terms=['sicily'], start='1943-07-10', days=2),
    'cassino-anzio': dict(q='Rome', terms=['rome'], start='1944-06-05', days=1), 'normandy': dict(q='invasion', terms=['invasion', 'france', 'allies'], start='1944-06-06', days=1),
    'bagration': dict(q='Minsk', terms=['minsk'], start='1944-07-03', days=3), 'warsaw-uprising': dict(q='Warsaw', terms=['warsaw'], start='1944-08-02', days=64),
    'market-garden': dict(q='Arnhem', terms=['arnhem', 'airborne'], start='1944-09-18', days=9), 'huertgen-forest': dict(q='Hurtgen', terms=['hurtgen', 'huertgen'], start='1944-11-16', days=25),
    'bulge': dict(q='Bastogne', terms=['bastogne', 'ardennes'], start='1944-12-20', days=10), 'liberation-of-the-camps': dict(q='Buchenwald', terms=['buchenwald', 'dachau'], start='1945-04-14', days=18),
    'berlin': dict(q='surrender', terms=['surrender', 'surrenders', 'germany', 'v-e'], start='1945-05-07', days=1)
  }
}

def nice_title(result):
    m = re.match(r'Image (\d+) of (.+?) \((.+)\), (\w+ \d+, \d{4})', result.get('title', ''))
    if not m: return None
    name = ' '.join(w if w.lower() in ('and', 'of', 'the', 'or') and i else w[:1].upper() + w[1:] for i, w in enumerate(m.group(2).split()))
    name = re.split(r',? Or,? ', re.sub(r'\s+,', ',', name))[0]
    place = m.group(3).split(';')[-1].strip()
    place = re.sub(r'^\[(.+?)\]\s*', r'\1, ', place)                 # [Charleston] S.C. -> Charleston, S.C.
    place = re.sub(r'\s*\[(.+?)\]', r', \1', place).replace(' ,', ',').strip(', ')
    return int(m.group(1)), name, place

def clipping(result, terms):
    """Return (score, mentions, crop) for the place on the page where a search word is set in the largest type."""
    urls = result.get('image_url') or []
    wc = next((u for u in urls if 'word-coordinates-service' in u), None); img = next((u for u in urls if '/iiif/' in u), None)
    if not wc or not img: return None
    return clip_at(img, wc, terms)

def clip_at(img, wc, terms):
    data = get(wc, 'tile')
    if not data: return None
    seg = list(data.values())[0]
    try: W, H = float(seg['width']), float(seg['height'])
    except Exception: return None
    best, mentions = None, 0
    for rank, t in enumerate(terms):
        for hit in seg.get('coords', {}).get(t, []):
            x, y, w, h = hit['coordinates']; mentions += 1
            if rank > 1: continue
            size = (w / max(len(t), 1)) * h / (W * H) * 1e6 * (1.0 if rank == 0 else 0.8) * (1.15 if y < H * 0.5 else 1.0)
            if not best or size > best[0]: best = (size, x, y, w, h, t)
    if not best: return None
    size, x, y, w, h, term = best
    banner = h / H > 0.012 and y < 0.3 * H        # a headline across the top of the page: show the whole top
    if banner: cx, cw, cy, ch = 0, W, 0, 0.42 * H
    else:
        cw = 0.34 * W; ch = cw * 1.25
        cx = min(max(x + w / 2 - cw * 0.42, 0), W - cw); cy = min(max(y - 0.03 * H, 0), H - ch)
    ch = min(ch, H - cy)
    base = img.split('/full/')[0]
    crop = f'{base}/pct:{cx / W * 100:.2f},{cy / H * 100:.2f},{cw / W * 100:.2f},{ch / H * 100:.2f}/{640 if banner else 520},/0/default.jpg'
    return size, mentions, crop, banner, term

def search(q, d0, d1):
    url = 'https://www.loc.gov/collections/chronicling-america/?' + urllib.parse.urlencode({'q': q, 'dates': f'{d0}/{d1}', 'fo': 'json', 'c': 150, 'at': 'results'})
    data = get(url, 'www')
    return (data or {}).get('results', [])

def pick(results, prefer, terms, limit, need=3, earliest=''):
    def rank(r):
        t = (r.get('partof_title') or [''])[0]
        p = next((i for i, n in enumerate(prefer) if t.startswith(n) or n in t), None)
        return p
    cands = [(rank(r), int((r.get('number_page') or ['99'])[0]), r) for r in results]
    cands = [c for c in cands if c[0] is not None and c[2].get('date', '') >= earliest]
    cands.sort(key=lambda c: (c[1] > 1, c[0], c[1], c[2].get('date', '')))
    best = None
    for p, page, r in cands[:limit]:
        got = clipping(r, terms)
        if not got or got[1] < need: continue
        score = got[0] * (1.4 if page == 1 else 1.0) * (1.0 - 0.03 * p) * (0.5 + min(got[1], 10) / 10)
        if not best or score > best[0]: best = (score, r, got)
    if not best: return None
    _, r, (size, mentions, crop, banner, term) = best
    nt = nice_title(r)
    if not nt: return None
    page, name, place = nt
    return {'paper': name, 'place': place, 'date': r['date'], 'page': page, 'clip': crop, 'wide': banner, 'mentions': mentions,
            'url': re.sub(r'[?&]q=.*$', '', r['url']) + '&q=' + urllib.parse.quote(term)}

# ---- Direct lookup: a known paper on a known date (fast; used where the papers and dates are predictable) ----
PAPERS = {
  'sn83030213': ('New-York Daily Tribune', 'New York, N.Y.'), 'sn83045462': ('Evening Star', 'Washington, D.C.'), 'sn83030313': ('The New York Herald', 'New York, N.Y.'),
  'sn84031490': ('Chicago Daily Tribune', 'Chicago, Ill.'), 'sn84024738': ('The Daily Dispatch', 'Richmond, Va.'), 'sn84024669': ('Richmond Whig', 'Richmond, Va.'),
  'sn83045160': ('Memphis Daily Appeal', 'Memphis, Tenn.'), 'sn83045450': ('Semi-Weekly Standard', 'Raleigh, N.C.'), 'sn83045499': ('The Daily Alaska Empire', 'Juneau, Alaska')
}
def front_page(lccn, date, terms):
    """The front page of one issue, scored for how prominently it names the battle. None if there was no issue that day."""
    item = get(f'https://www.loc.gov/item/{lccn}/{date}/ed-1/?fo=json&at=resources', 'item')
    try: info = next(f['info'] for f in item['resources'][0]['files'][0] if f.get('info'))
    except Exception: return None
    base = info.replace('/info.json', '')
    seg = '/' + base.split('/iiif/')[1].replace(':', '/') + '.xml'
    got = clip_at(base + '/full/', 'https://tile.loc.gov/text-services/word-coordinates-service?segment=' + seg + '&format=alto_xml', terms)
    if not got: return {}          # there was an issue, but the front page does not name the battle
    size, mentions, crop, banner, term = got
    name, place = PAPERS[lccn]
    return {'paper': name, 'place': place, 'date': date, 'page': 1, 'clip': crop, 'wide': banner, 'mentions': mentions, 'score': size * (0.5 + min(mentions, 10) / 10),
            'url': f'https://www.loc.gov/resource/{lccn}/{date}/ed-1/?sp=1&q=' + urllib.parse.quote(term)}
def direct(lccns, dates, terms, need=3, tries=4):
    best, n = None, 0
    for date in dates:
        for lccn in lccns:
            if n >= tries: break
            p = front_page(lccn, date, terms)
            if p is None: continue
            n += 1
            if p and p['mentions'] >= need and (not best or p['score'] > best['score']): best = p
            break                      # one paper per date: the first in the list that published that day
        if best and best['mentions'] >= 8 and n >= 2: break
    if best: best.pop('score')
    return best

out = {}
if os.path.exists(OUT): out = json.load(open(OUT))
ORDER = {'world-war-2-europe': 0, 'civil-war': 1, 'american-revolution': 2}
for b in sorted(json.load(open(BATTLES)), key=lambda b: ORDER[b['war']]):
    war, bid = b['war'], b['id']
    key = war + '/' + bid
    if key in out or (ONLY and war != ONLY): continue
    cfg = SPECIAL[war].get(bid, {})
    if cfg is None: out[key] = []; continue
    word = max(re.findall(r"[A-Za-z']+", b['name'].split('(')[0]), key=len)
    q, terms = cfg.get('q', word), cfg.get('terms', [word.lower()])
    if war == 'american-revolution': d0 = cfg.get('start', day(b['start'], 3)); d1 = day(d0, cfg.get('days', 70))
    elif war == 'civil-war': d0 = cfg.get('start', day(b['end'], 1)); d1 = day(d0, cfg.get('days', 7))
    else: d0 = cfg['start']; d1 = day(d0, cfg['days'])
    found = []
    results = search(q, d0, d1) if war == 'american-revolution' else []
    if war == 'civil-war':
        p = direct(['sn83030213', 'sn83045462', 'sn83030313'], [day(d0, k) for k in (1, 2, 0, 3, 4)], terms)
        if p: p['label'] = 'Northern newspaper'; found.append(p)
        p = direct(['sn84024738', 'sn84024669', 'sn83045160', 'sn83045450'], [day(d0, k) for k in (3, 4, 5, 2, 6, 7)], terms)
        if p: p['label'] = 'Southern newspaper'; found.append(p)
    elif war == 'american-revolution':
        p = pick(results, PATRIOT, terms, 5, need=2)
        if p: p['label'] = 'American newspaper'; found.append(p)
        late = [r for r in results if r.get('date', '') >= '1776-11-01']
        p = pick(late, CROWN, terms, 3, need=2)
        if p: p['label'] = 'Printed in a British-held city'; found.append(p)
    else:
        span = [day(d0, k) for k in range(0, min(cfg['days'], 6) + 1)]
        p = direct(['sn83045462'], span, terms, tries=4)
        if p: found.append(p)
        p = direct(['sn83045499'], span, terms, tries=3)
        if p: found.append(p)
    out[key] = found
    json.dump(out, open(OUT, 'w'), indent=1)
    print(key, '->', [(p['paper'], p['date'], p['page'], p['mentions']) for p in found], flush=True)
print('done', sum(1 for v in out.values() if v), 'of', len(out), 'battles have a newspaper')
