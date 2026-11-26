"""Merge results and print a review report. Usage: python3 -I report.py [min_index] [max_index] [--all]"""
import json, os, re, sys, difflib, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
def load(f):
    p = os.path.join(HERE, f); return json.load(open(p)) if os.path.exists(p) else {}
ia, ws, di = load('results.json'), load('results_ws.json'), load('results_direct.json')
for extra in ('results_b.json', 'results_c.json', 'results_fix.json'):
    for k, v in load(extra).items():
        if k not in ia or v.get('ratio', 0) > ia[k].get('ratio', 0): ia[k] = v
quotes = json.load(open(os.path.join(HERE, 'quotes.json')))
args = [a for a in sys.argv[1:] if not a.startswith('--')]; lo = int(args[0]) if args else 0; hi = int(args[1]) if len(args) > 1 else 999
def diff(q, passages):
    qs = qv.segments(q); out = []
    for s, p in zip(qs, passages):
        a, b = s.split(), qv.norm(p).split()
        for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
            if tag != 'equal': out.append('[%s → %s]' % (' '.join(a[i1:i2]) or '∅', ' '.join(b[j1:j2]) or '∅'))
    return ' '.join(out)
tally = {'exact': 0, 'near': 0, 'low': 0, 'pending': 0}
for n, q in enumerate(quotes):
    if n < lo or n > hi: continue
    key = '%s/%s/%d' % (q['war'], q['battle'], q['i'])
    cands = [(r.get('ratio', 0), src, r) for src, r in (('IA', ia.get(key)), ('WS', ws.get(key)), ('DIRECT', di.get(key))) if r]
    if not cands: tally['pending'] += 1; continue
    cands.sort(key=lambda c: -c[0]); ratio, src, r = cands[0]
    cls = 'exact' if ratio >= 0.999 else 'near' if ratio >= 0.85 else 'low'; tally[cls] += 1
    line = '%3d %-30s %.3f %-6s %s' % (n, (q['battle'] + '/' + str(q['i']))[:30], ratio, src, (r.get('title') or r.get('note') or '')[:52] + ((' (%s) %s %s' % (r.get('year', ''), r.get('mode', ''), r.get('id', ''))) if src == 'IA' else ''))
    others = ' | '.join('%s %.2f' % (s2, r2) for r2, s2, _ in cands[1:])
    print(line + ('   [' + others + ']' if others else ''))
    if '--all' in sys.argv or cls != 'exact':
        if r.get('passages') and ratio > 0:
            if '--brief' in sys.argv and ratio >= 0.9: print('      Δ: ' + diff(r.get('quote') or q['quote'], r['passages'])[:260])
            elif '--brief' in sys.argv and ratio < 0.6: print('      (no real match)')
            else: print('      Q: ' + q['quote'][:420]); print('      S: ' + ' || '.join(r['passages'])[:460]); print('      Δ: ' + diff(q['quote'], r['passages'])[:300])
print(tally)
