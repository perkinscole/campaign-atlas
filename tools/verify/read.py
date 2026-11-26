"""Read passages from archive.org item texts. Usage: python3 -I read.py <spec.json>
spec: [[ia_id, regex, before, after], ...] prints the first match with context (chars)."""
import json, os, re, sys, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
for row in json.load(open(sys.argv[1])):
    ident, rx = row[0], row[1]; before = row[2] if len(row) > 2 else 200; after = row[3] if len(row) > 3 else 500
    raw = qv.item_text(ident); text = re.sub(r'[-¬]\s*\n\s*(?=[a-z])', '', raw); text = re.sub(r'\s+', ' ', text)
    ms = list(re.finditer(rx, text, re.I))
    print('## %s /%s/ (%d matches, %d chars)' % (ident, rx, len(ms), len(text)))
    for m in ms[: (row[4] if len(row) > 4 else 1)]:
        print('   …' + text[max(0, m.start() - before): m.end() + after] + '…')
