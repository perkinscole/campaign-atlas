import json, subprocess, sys, time, urllib.parse, re
Q = json.load(open(sys.argv[1])); out = {}
for label, q in Q:
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode({'action': 'query', 'generator': 'search', 'gsrnamespace': 6, 'gsrsearch': q + ' filetype:bitmap', 'gsrlimit': 8,
        'prop': 'imageinfo', 'iiprop': 'extmetadata|size', 'iiextmetadatafilter': 'LicenseShortName|ImageDescription|Artist|DateTimeOriginal|Credit', 'format': 'json'})
    for attempt in range(4):
        r = subprocess.run(['curl', '-s', '-m', '40', '-A', 'CampaignAtlasImageCheck/1.0 (educational project)', url], capture_output=True, text=True)
        try: d = json.loads(r.stdout); break
        except Exception: d = None; time.sleep(8)
    rows = []
    for p in sorted(((d or {}).get('query', {}).get('pages', {}) or {}).values(), key=lambda p: p.get('index', 99)):
        ii = (p.get('imageinfo') or [{}])[0]; m = ii.get('extmetadata', {})
        strip = lambda k: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', (m.get(k) or {}).get('value', ''))).strip()
        rows.append({'file': p['title'][5:], 'lic': strip('LicenseShortName'), 'w': ii.get('width'), 'h': ii.get('height'), 'date': strip('DateTimeOriginal')[:30], 'artist': strip('Artist')[:60], 'credit': strip('Credit')[:70], 'desc': strip('ImageDescription')[:200]})
    out[label + ' | ' + q] = rows
    print('##', label, '|', q, flush=True)
    for x in rows: print('   %s | %s | %sx%s | %s | %s | %s' % (x['file'], x['lic'], x['w'], x['h'], x['date'], x['artist'], x['desc'][:120]), flush=True)
    time.sleep(2.5)
json.dump(out, open(sys.argv[2], 'w'), indent=1)
