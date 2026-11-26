#!/usr/bin/env python3
"""Write the MEDIA block (newspaper clippings and newsreels) into each data pack.

Usage: python3 -I tools/media/write_media.py <papers.json> [skip.json]

papers.json comes from find_papers.py. skip.json is an optional list of "war/battle/paper/date"
strings for clippings that were looked at and rejected. Newsreels are listed here by hand: each is
a Universal Newsreel in the Internet Archive's universal_newsreels collection (public domain,
from the U.S. National Archives), and each caption is written from the archive's catalog note."""
import json, os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
papers = json.load(open(sys.argv[1]))
skip = set(json.load(open(sys.argv[2]))) if len(sys.argv) > 2 else set()

REELS = {
  'world-war-2-europe': {
    'poland': [dict(id='1939-09-04_Special_Release_Europe_At_War', title='Special Release: Europe at War!', date='1939-09-04', minutes=9, silent=True,
        text='Rushed into theaters three days after the invasion: German troops enter Poland, Britain and France declare war, London\'s children are sent to the countryside, and French soldiers leave for the front. This copy has no sound.')],
    'battle-of-britain': [dict(id='1940-12-31_Roosevelt_Warns_Of_Danger_If_Nazis_Win_War', title='Roosevelt Warns of Danger to U.S. if Nazis Win War', date='1940-12-31', minutes=4,
        text='Three months after the height of the Battle of Britain, President Roosevelt tells Americans by radio that the United States must arm Britain. A second story shows a German attack on a British convoy in the North Sea.')],
    'moscow': [dict(id='1941-06-23_Nazis_War_On_Russia', title='Nazis War on Russia', date='1941-06-23', minutes=4,
        text='Released the day after Germany invaded the Soviet Union. No film of the fighting had arrived, so the newsreel uses older pictures of the Red Army, then shows the Soviet ambassador and American officials reacting in Washington. An unrelated Canadian story ends the reel.')],
    'atlantic': [dict(id='1942-10-19_Big_Convoy_To_Russia', title='Big Convoy to Russia Beats Off Nazis', date='1942-10-19', minutes=6,
        text='German bombers attack an Allied convoy carrying supplies to the Soviet Union around the north of Norway. Shorter stories follow: a tax bill in Washington, an army mascot in Australia, and tanks for the British Eighth Army.')],
    'kursk': [dict(id='1943-09-02_Reds_Rout_Nazis', title='Reds Rout Nazis', date='1943-09-02', minutes=2,
        text='Soviet film of the Red Army advancing in the summer of 1943, after the German defeat at Kursk: artillery, tanks, cavalry, and a plane shot down. It shows wounded and dead soldiers.')],
    'cassino-anzio': [dict(id='1944-06-15_First_Pictures_Of_Romes_Capture', title='First Pictures of Rome\'s Capture', date='1944-06-15', minutes=4,
        text='Captured German film shows American and British prisoners from Anzio paraded past the Colosseum. Then the Allies enter Rome, and crowds cheer General Mark Clark.')],
    'normandy': [
      dict(id='1944-06-12_First_Pictures_Invasion_of_France', title='First Pictures: Invasion of France', date='1944-06-12', minutes=8,
        text='The first film of D-Day to reach American theaters, six days after the landings: bombers, paratroopers boarding their planes, the invasion fleet, assault boats heading for shore, prisoners, and the wounded returning to England.'),
      dict(id='1944-06-06_Eve_of_Battle', title='Eve of Battle', date='1944-06-06', minutes=19,
        text='Released on D-Day itself, before any film of the landings existed. Made with the War Department, it shows the months of preparation in Britain.')],
    'market-garden': [dict(id='1944-09-28_Battle_Rages_Along_Nazi_Wall', title='Battle Rages Along Nazi Wall', date='1944-09-28', minutes=6,
        text='American, British, and Polish paratroopers and glider troops land in Holland, and British tanks reach them at Eindhoven. The reel shows only the early success: it came out three days after the survivors were pulled back from Arnhem. Later stories show American troops entering Germany and French towns being freed.')],
    'bulge': [
      dict(id='1945-01-11_German_Drive_Rolled_Back_By_Allies', title='German Drive Rolled Back by Allies', date='1945-01-11', minutes=4,
        text='American troops lay mines and set up roadblocks, the weather clears and Allied bombers return, supplies are parachuted into Bastogne, and Patton\'s tanks break through to the ruined town.'),
      dict(id='1944-12-20_Allies_Fight_Fierce_Nazi_Counter-Blow', title='Allies Fight Fierce Nazi Counter-Blow', date='1944-12-20', minutes=7,
        text='Released four days into the battle, before any film had come back from the Ardennes. It uses captured German newsreels to show how Germany prepared the attack. Unrelated stories follow.')],
    'berlin': [dict(id='1945-05-08_Germany_Gives_Up', title='Germany Gives Up', date='1945-05-08', minutes=7,
        text='President Truman announces Germany\'s surrender on V-E Day. The rest of the reel looks back over the rise and fall of Nazi Germany, from 1933 to 1945. Parts of this copy are silent.')]
  }
}

def js(v, ind=0):
    pad = ' ' * ind
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return repr(v)
    if isinstance(v, str): return json.dumps(v, ensure_ascii=False)
    if isinstance(v, list): return '[\n' + ',\n'.join(pad + '  ' + js(x, ind + 2) for x in v) + '\n' + pad + ']'
    key = lambda k: k if re.match(r'^[A-Za-z_]\w*$', k) else json.dumps(k)
    if all(not isinstance(x, (dict, list)) for x in v.values()): return '{ ' + ', '.join(key(k) + ': ' + js(x) for k, x in v.items()) + ' }'
    return '{\n' + ',\n'.join(pad + '  ' + key(k) + ': ' + js(x, ind + 2) for k, x in v.items()) + '\n' + pad + '}'

for war in ('american-revolution', 'civil-war', 'world-war-2-europe'):
    pp = {}
    for k, found in papers.items():
        w, bid = k.split('/')
        if w != war: continue
        keep = [{f: p[f] for f in ('paper', 'place', 'date', 'page', 'label', 'clip', 'wide', 'url') if f in p and p[f] not in (None, False)} for p in found
                if f"{k}/{p['paper']}/{p['date']}" not in skip]
        if keep: pp[bid] = keep
    media = {'papers': pp, 'reels': REELS.get(war, {})}
    block = ('  // MEDIA:BEGIN (written by tools/media/write_media.py; edit there, not here)\n'
             '  // Newspaper clippings are from the Library of Congress, Chronicling America. Newsreels are Universal Newsreels held by the U.S. National Archives.\n'
             '  const MEDIA = ' + js(media, 2) + ';\n  // MEDIA:END\n')
    path = os.path.join(ROOT, 'data', war + '.js'); s = open(path).read()
    if '// MEDIA:BEGIN' in s: s = re.sub(r'  // MEDIA:BEGIN.*?// MEDIA:END\n', lambda m: block, s, flags=re.S)
    else:
        i = s.index('  Atlas.register({'); s = s[:i] + block + '\n' + s[i:]
        assert s.count('NOTES, OBJECTS\n') == 1; s = s.replace('NOTES, OBJECTS\n', 'NOTES, OBJECTS, MEDIA\n')
    open(path, 'w').write(s)
    print(war, len(pp), 'battles with newspapers,', sum(len(v) for v in pp.values()), 'clippings,', sum(len(v) for v in media['reels'].values()), 'newsreels')
