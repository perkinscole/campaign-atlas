"""Apply verification decisions to the data packs.
decisions.json: { "<war>/<battle>/<i>": { "quote"?, "who"?, "role"?, "date"?, "source"?, "verified"?: true, "ref"?, "refTitle"? } }
Usage: python3 -I apply.py <projectDir> [--dry]"""
import json, os, re, sys
proj = sys.argv[1]; dry = '--dry' in sys.argv
HERE = os.path.dirname(os.path.abspath(__file__))
dec = json.load(open(os.path.join(HERE, 'decisions.json')))
def js(s): return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
def scan_string(src, i):
    q = src[i]; i += 1
    while src[i] != q:
        i += 2 if src[i] == '\\' else 1
    return i + 1
def match(src, i, open_c, close_c):
    depth = 0
    while True:
        c = src[i]
        if c in "'\"`": i = scan_string(src, i); continue
        if c == open_c: depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0: return i
        i += 1
def entry_span(src, battle, idx):
    b = src.index("id: '%s'," % battle)
    j = src.index('journal: [', b); end = match(src, j + 9, '[', ']')
    i = j + 10; n = -1
    while i < end:
        if src[i] in "'\"`": i = scan_string(src, i); continue
        if src[i] == '{':
            n += 1; e = match(src, i, '{', '}')
            if n == idx: return i, e
            i = e + 1; continue
        i += 1
    raise KeyError((battle, idx))
def set_field(obj, field, value):
    m = re.search(r"(\b%s: )'" % field, obj)
    if m:
        s = m.end() - 1; e = scan_string(obj, s)
        return obj[:s] + js(value) + obj[e:]
    return None
changed = 0
for war in sorted({k.split('/')[0] for k in dec}):
    path = os.path.join(proj, 'data', war + '.js'); src = open(path, encoding='utf-8').read()
    for key, d in dec.items():
        w, battle, idx = key.split('/')
        if w != war: continue
        s, e = entry_span(src, battle, int(idx)); obj = src[s:e + 1]
        for f in ('quote', 'who', 'role', 'date', 'source'):
            if f in d:
                new = set_field(obj, f, d[f]); assert new is not None, (key, f); obj = new
        # remove any previous verification fields, then add current ones
        obj = re.sub(r",\s*verified: true(?:,\s*ref: '(?:[^'\\]|\\.)*')?(?:,\s*refTitle: '(?:[^'\\]|\\.)*')?", '', obj)
        if d.get('verified'):
            extra = ', verified: true' + (', ref: ' + js(d['ref']) if d.get('ref') else '') + (', refTitle: ' + js(d['refTitle']) if d.get('refTitle') else '')
            k = len(obj) - 1
            while obj[k - 1] in ' \n\t': k -= 1
            obj = obj[:k] + extra + obj[k:]
        if obj != src[s:e + 1]: changed += 1
        src = src[:s] + obj + src[e + 1:]
    if not dry: open(path, 'w', encoding='utf-8').write(src)
print('entries changed:', changed, '(dry run)' if dry else '')
