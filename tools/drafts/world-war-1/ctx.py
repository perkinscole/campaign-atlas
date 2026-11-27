import re, sys
# usage: ctx.py <id> <regex> [before] [after] [max] [skip]
ident, rx = sys.argv[1], sys.argv[2]; before = int(sys.argv[3]) if len(sys.argv) > 3 else 200; after = int(sys.argv[4]) if len(sys.argv) > 4 else 600
mx = int(sys.argv[5]) if len(sys.argv) > 5 else 1; skip = int(sys.argv[6]) if len(sys.argv) > 6 else 0
raw = open('tools/texts/ia_%s.txt' % ident, encoding='utf-8', errors='replace').read()
text = re.sub(r'[-¬]\s*\n\s*(?=[a-z])', '', raw); text = re.sub(r'\s+', ' ', text)
ms = list(re.finditer(rx, text, re.I)); print('## %s /%s/ %d matches' % (ident, rx, len(ms)))
for m in ms[skip:skip + mx]: print('   …' + text[max(0, m.start() - before): m.end() + after] + '…')
