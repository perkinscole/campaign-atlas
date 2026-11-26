"""Fetch a page (cached) and print context around regex matches. Usage: python3 -I grab.py <url> <regex> [width]"""
import os, re, sys, html, hashlib, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
url, rx = sys.argv[1], sys.argv[2]; width = int(sys.argv[3]) if len(sys.argv) > 3 else 250
path = os.path.join(qv.TEXTS, 'web_' + hashlib.md5(url.encode()).hexdigest() + '.txt')
if os.path.exists(path): text = open(path, encoding='utf-8').read()
else:
    raw = qv.get(url); text = raw.decode('utf-8', errors='replace') if raw else ''
    if '<' in text[:2000]:
        text = re.sub(r'(?s)<(script|style)[^>]*>.*?</\1>', ' ', text); text = html.unescape(re.sub(r'<[^>]+>', ' ', text))
    open(path, 'w', encoding='utf-8').write(text)
text = re.sub(r'\s+', ' ', text); n = 0
for m in re.finditer(rx, text, re.I):
    print('...' + text[max(0, m.start() - width): m.end() + width] + '...\n'); n += 1
    if n >= 4: break
print(n, 'matches; text length', len(text))
