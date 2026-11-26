"""Turn an Overpass 'out geom' result into the `lines` list a battlefield view uses on the period map.

Usage: python3 -I tools/period/osm_lines.py result.json south west north east

Ways that share a name are joined end to end, cut to the box, and thinned. Road and stream
lines come from OpenStreetMap (ODbL); they follow today's alignments."""
import json, math, sys

src, S, W, N, E = sys.argv[1], *map(float, sys.argv[2:6])
data = json.load(open(src))
KIND = lambda t: 'rail' if t.get('railway') else 'stream' if t.get('waterway') else 'road'
groups = {}
for el in data['elements']:
    if el['type'] != 'way' or 'geometry' not in el: continue
    t = el.get('tags', {})
    name = t.get('name') or ('Railroad' if t.get('railway') else None)
    if not name: continue
    groups.setdefault((KIND(t), name), []).append([(p['lat'], p['lon']) for p in el['geometry']])

def join(ways):
    ways = [w[:] for w in ways]; out = []
    while ways:
        line = ways.pop(0); grew = True
        while grew:
            grew = False
            for i, w in enumerate(ways):
                if w[0] == line[-1]: line += w[1:]
                elif w[-1] == line[-1]: line += w[-2::-1]
                elif w[-1] == line[0]: line = w[:-1] + line
                elif w[0] == line[0]: line = w[:0:-1] + line
                else: continue
                ways.pop(i); grew = True; break
        out.append(line)
    return out

def thin(pts, tol):
    if len(pts) < 3: return pts
    (ay, ax), (by, bx) = pts[0], pts[-1]; k = math.cos(math.radians(ay))
    far, idx = 0, 0
    for i in range(1, len(pts) - 1):
        py, px = pts[i]; dx, dy = (bx - ax) * k, by - ay; L = math.hypot(dx, dy) or 1e-12
        d = abs(dx * (py - ay) - dy * (px - ax) * k) / L
        if d > far: far, idx = d, i
    if far <= tol: return [pts[0], pts[-1]]
    return thin(pts[:idx + 1], tol)[:-1] + thin(pts[idx:], tol)

def cut(pts):
    runs, cur = [], []
    for p in pts:
        if S <= p[0] <= N and W <= p[1] <= E: cur.append(p)
        else:
            if len(cur) > 1: runs.append(cur)
            cur = []
    if len(cur) > 1: runs.append(cur)
    return runs

length = lambda pts: sum(math.hypot(b[0] - a[0], (b[1] - a[1]) * .77) for a, b in zip(pts, pts[1:]))
out = []
for (kind, name), ways in sorted(groups.items()):
    for line in join(ways):
        for run in cut(line):
            run = thin(run, 0.00012)
            if length(run) > 0.004: out.append({'kind': kind, 'name': name, 'pts': [[round(a, 5), round(b, 5)] for a, b in run]})
print(json.dumps(out, separators=(',', ':')))
print(len(out), 'lines,', sum(len(l['pts']) for l in out), 'points', file=sys.stderr)
