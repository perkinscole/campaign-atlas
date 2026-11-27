"""Insert a `tactical` block into a pack, after the battle's `campaign:` (or `result:`) line."""
import json, re, sys
def js(v, ind):
    pad = ' ' * ind
    if isinstance(v, str): return json.dumps(v, ensure_ascii=False)
    if v is None: return 'null'
    if isinstance(v, (int, float)): return repr(v)
    if isinstance(v, list):
        if all(isinstance(x, (int, float)) for x in v) or (v and all(isinstance(x, list) and all(isinstance(y, (int, float)) for y in x) for x in v)):
            return json.dumps(v, separators=(', ', ': '))
        if v and all(isinstance(x, list) for x in v): return json.dumps(v, separators=(', ', ': '))
        return '[\n' + ',\n'.join(pad + '  ' + js(x, ind + 2) for x in v) + '\n' + pad + ']'
    if isinstance(v, dict):
        flat = all(not isinstance(x, (dict,)) and not (isinstance(x, list) and x and isinstance(x[0], dict)) for x in v.values())
        key = lambda k: k if re.match(r'^[A-Za-z_]\w*$', k) else json.dumps(k)
        if flat and len(json.dumps(v)) < 230: return '{ ' + ', '.join(key(k) + ': ' + js(x, ind) for k, x in v.items()) + ' }'
        return '{\n' + ',\n'.join(pad + '  ' + key(k) + ': ' + js(x, ind + 2) for k, x in v.items()) + '\n' + pad + '}'
    raise TypeError(v)
def insert(path, battle_id, tactical):
    s = open(path).read()
    m = re.search(r"\n      id: '" + re.escape(battle_id) + r"',\n(?:.*\n){1,9}?      (?:campaign|result): '[^']*',\n", s)
    if not m: sys.exit('battle not found: ' + battle_id)
    # prefer the campaign line if the battle has one within the next two lines
    end = m.end()
    nxt = s[end:end + 200]
    m2 = re.match(r"      campaign: '[^']*',\n", nxt)
    if m2: end += m2.end()
    if s[end:end + 40].lstrip().startswith('tactical:'): sys.exit('already has tactical: ' + battle_id)
    s = s[:end] + '      tactical: ' + js(tactical, 6) + ',\n' + s[end:]
    open(path, 'w').write(s)
    print('added', battle_id, len(tactical['phases']), 'steps', len(tactical['units']), 'units')
