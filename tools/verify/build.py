"""Turn reviewed decisions into decisions.json for apply.py, re-checking every corrected quote."""
import json, os, re, sys, urllib.parse, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('qv', os.path.join(HERE, 'qv.py')); qv = importlib.util.module_from_spec(spec); spec.loader.exec_module(qv)
def load(f):
    p = os.path.join(HERE, f); return json.load(open(p)) if os.path.exists(p) else {}
quotes = json.load(open(os.path.join(HERE, 'quotes.json')))
ia_files = [load(f) for f in ('results.json', 'results_b.json', 'results_c.json', 'results_fix.json')]
ws, di = load('results_ws.json'), load('results_direct.json')
titles = {}
for d in ia_files:
    for r in d.values():
        if r.get('id') and r.get('title') and r['title'] != '(cited work)': titles[r['id']] = (r['title'], str(r.get('year') or '')[:4])
OR = 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
D = {
 1: dict(via='IA:sim_atlantic_1877-04_39_234', title='The Atlantic Monthly, April 1877', source='Diary, first published in The Atlantic Monthly (April 1877)',
    quote='We were fired on from all sides, but mostly from the Rear, where People had hid themselves in houses till we had passed, and then fired; the Country was an amazing strong one, full of Hills, Woods, stone Walls, &c., which the Rebels did not fail to take advantage of.'),
 2: dict(via='IA:lettershughearl00boltgoog', title='Letters of Hugh, Earl Percy, from Boston and New York, 1774–1776 (1902)',
    quote='Whoever looks upon them as an irregular mob, will find himself much mistaken. They have men amongst them who know very well what they are about.'),
 3: dict(via='IA:cihm_42517', title='A Narrative of the Captivity of Col. Ethan Allen (1814 edition)'),
 5: dict(skip=True),
 6: dict(via='IA:warforindependen012513mbp', title='Howard H. Peckham, The War for Independence (1958), quoting the letter',
    quote='These People Shew a Spirit and Conduct against us they never shewed against the French … The loss we have Sustained is greater than we can bear.'),
 8: dict(via='IA:journalofisaacse00sentuoft', title='The Journal of Isaac Senter (1846)'),
 9: dict(manual='https://archive.org/details/mg02011766?q=%22proud+town%22', title='Maryland Gazette, February 1, 1776',
    source='Letter to his sister Hannah Arnold; an extract was printed in the Maryland Gazette, February 1, 1776'),
 10: dict(via='DIRECT', quote='I went to bed about 12 and rose again a little after one. I could no more sleep than if I had been in the ingagement. The ratling of the windows, the jar of the house and the continual roar of 24 pounders, the Bursting of shells give us such Ideas, and realize a scene to us of which we could scarcly form any conception.'),
 11: dict(via='IA:historyofrisepro02gord_0', title='William Gordon, The History of the Rise, Progress, and Establishment of the Independence of the United States (1788)',
    quote='The rebels have done more in one night, than my whole army would have done in months.',
    source='As reported in William Gordon\'s history of the war (1788), the earliest printed version; later books changed "months" to "a month"'),
 12: dict(via='WS'), 14: dict(via='IA:memoirofcolonelb027409mbp', title='Memoir of Colonel Benjamin Tallmadge'),
 15: dict(via='WS', quote='These are the times that try men\'s souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country; but he that stands it now, deserves the love and thanks of man and woman.'),
 17: dict(via='IA:writingsgeorgew44washgoog', title='The Writings of George Washington, ed. Worthington C. Ford (1889)',
    quote='The difficulty of passing the river in a very severe night, and their march through a violent storm of snow and hail, did not in the least abate their ardor; but, when they came to the charge, each seemed to vie with the other in pressing forward.'),
 18: dict(via='IA:sim_pennsylvania-magazine-of-history-and-biography_1896_20_4', title='The Pennsylvania Magazine of History and Biography, vol. 20 (1896)',
    quote='My brave fellows, you have done all I asked you to do, and more than could be reasonably expected; but your country is at stake, your wives, your houses, and all that you hold dear … If you will consent to stay only one month longer, you will render that service to the cause of liberty, and to your country, which you probably never can do under any other circumstances.',
    source='As recorded by a sergeant who was present; published 1832 and reprinted in the Pennsylvania Magazine of History and Biography (1896)'),
 20: dict(via='IA:battleofbenningt00brit', title='The Battle of Bennington (1908)', quote='There are the redcoats, and they are ours, or this night Molly Stark sleeps a widow!'),
 21: dict(via='IA:bim_eighteenth-century_a-state-of-the-expeditio_burgoyne-john_1780', title='John Burgoyne, A State of the Expedition from Canada (1780)',
    quote='The Hampshire Grants, in particular, a country unpeopled, and almost unknown the last war, now abounds in the most active and most rebellious race of the continent, and hangs like a gathering storm upon my left.',
    source='Letter to Lord George Germain, printed in Burgoyne\'s A State of the Expedition from Canada (1780)'),
 22: dict(via='IA:writingsgeorgew00spargoog', title='The Writings of George Washington, ed. Jared Sparks (1834)'),
 23: dict(via='DIRECT'),
 24: dict(via='IA:lettersjournalsr00ried', title='Letters and Journals Relating to the War of the American Revolution, trans. William L. Stone (1867)',
    source='Letters and Journals Relating to the War of the American Revolution (translated by William L. Stone, 1867)'),
 25: dict(via='IA:britishinvasionf0000digb', title='The British Invasion from the North: The Journal of Lieut. William Digby (1887)', minratio=0.6,
    quote='We marched out, according to treaty, with drums beating & the honours of war, but the drums seemed to have lost their former inspiriting sounds, and though we beat the Grenadiers march, which not long before was so animating, yet then it seemed by its last feeble effort, as if almost ashamed to be heard on such an occasion.'),
 27: dict(via='IA:sim_pennsylvania-magazine-of-history-and-biography_1897_21_3', title='The Pennsylvania Magazine of History and Biography, vol. 21 (1897)',
    source='Diary of Albigence Waldo, printed in the Pennsylvania Magazine of History and Biography (1897)'),
 29: dict(via='WS', quote='Our country, ever mindful of its suffering army, opened her sympathizing heart so wide, upon this occasion, as to give us something to make the world stare. And what do you think it was, reader?—Guess.—You cannot guess, be you as much of a Yankee as you will. I will tell you: it gave each and every man half a gill of rice, and a table spoon full of vinegar!!'),
 30: dict(via='IA:lifeoffrederickw00kappuoft', title='Friedrich Kapp, The Life of Frederick William von Steuben (1859)',
    quote='The genius of this nation is not in the least to be compared with that of the Prussians, Austrians, or French. You say to your soldier, "Do this, and he doeth it;" but I am obliged to say, "This is the reason why you ought to do that," and then he does it.',
    source='Letter to a Prussian officer, in Friedrich Kapp, The Life of Frederick William von Steuben (1859)'),
 31: dict(via='WS'),
 32: dict(via='IA:recollectionspri00cust', title='G. W. P. Custis, Recollections and Private Memoirs of Washington (1859)',
    quote='I thought then, as now … that never had I beheld so superb a man.',
    source='As told to Washington\'s step-grandson, G. W. P. Custis, Recollections and Private Memoirs of Washington (1859)'),
 33: dict(via='IA:memoirsamerican00moulgoog', title='William Moultrie, Memoirs of the American Revolution (1802)'),
 36: dict(via='AUTO', title='Musgrove Mill Historic Resource Study (National Park Service), quoting Clinton'),
 37: dict(via='IA:writingsthomasj05washgoog', title='The Writings of Thomas Jefferson, ed. H. A. Washington (1854)',
    quote='It [the victory at Kings Mountain] was the joyful annunciation of that turn of the tide of success which terminated the revolutionary war with the seal of our independence.'),
 38: dict(via='IA:sim_orion-a-monthly-magazine-of-literature-and-art_1843-10_3_2', title='The Orion magazine, October 1843',
    source='Memoir of Major Thomas Young, printed in The Orion magazine (October 1843)'),
 39: dict(via='IA:ahistorynewyork00dunlgoog', title='William Dunlap, A History of New York, for Schools (1837)',
    quote='I have given him a devil of a whipping—a more complete victory never was.',
    source='Letter to William Snickers, as first printed in William Dunlap, A History of New York, for Schools (1837)'),
 41: dict(via='IA:correspondencec03rossgoog', title='Correspondence of Charles, First Marquis Cornwallis (1859)'),
 42: dict(via='AUTO', title='The Jessup Family (1908), quoting the speech'),
 43: dict(via='WS', title='Mercy Otis Warren, History of the Rise, Progress, and Termination of the American Revolution (1805)'),
 45: dict(via='IA:historicalmemoi00wraxgoog', title='Nathaniel Wraxall, Historical Memoirs of My Own Time (1815)'),
 48: dict(via='WS'), 50: dict(via='WS'), 53: dict(via='WS'), 54: dict(via='WS'), 56: dict(via='WS'), 57: dict(via='WS'),
 52: dict(via='IA:bub_gb_ssIdAQAAMAAJ', title='Sam R. Watkins, "Co. Aytch" (1882)',
    quote='I had heard and read of battlefields, seen pictures of battlefields, of horses and men, of cannon and wagons, all jumbled together, while the ground was strewn with dead and dying and wounded, but I must confess that I never realized the "pomp and circumstance" of the thing called glorious war until I saw this.'),
 58: dict(via='IA:per_asheville-news_asheville-news_1862-09-04_14_111', title='Asheville News, September 4, 1862',
    source='Dispatch to President Jefferson Davis, as printed in the Asheville News, September 4, 1862'),
 60: dict(via='IA:bwb_Y0-BNJ-154', title='Battles and Leaders of the Civil War, vol. 2'),
 61: dict(via='IA:ERIC_ED370593', title='Civil War Photography and Its Impact (1993), quoting the review'),
 62: dict(via='IA:hammerrapier00cook', title='John Esten Cooke, Hammer and Rapier (1870)',
    quote='It is well this is so terrible; we would grow too fond of it!',
    source='As recorded by John Esten Cooke, a Confederate staff officer, in Hammer and Rapier (1870). Later writers reworded it as "It is well that war is so terrible."'),
 64: dict(via='IA:warofrebellion522unit', title=OR), 65: dict(via='IA:completeworksab06fishgoog', title='Complete Works of Abraham Lincoln (1905)'),
 66: dict(via='IA:warofrebellionco0025unit', title=OR),
 67: dict(manual='https://archive.org/details/09098560.4267.emory.edu?q=%22rest+under+the+shade+of+the+trees%22', title='The Life of Lieut. Gen. T. J. Jackson (1863)'),
 68: dict(via='IA:campaignofchanc00bige', title='John Bigelow, The Campaign of Chancellorsville (1910)', minratio=0.7,
    source='Remark to Abner Doubleday, as reported in John Bigelow, The Campaign of Chancellorsville (1910)'),
 69: dict(via='IA:mycavelifeinvic00louggoog', title='Mary Ann Loughborough, My Cave Life in Vicksburg (1864)'),
 72: dict(via='AUTO', title='Oliver W. Norton, Strong Vincent and His Brigade at Gettysburg (1909), reprinting the report',
    source='Official report of the 20th Maine Infantry', date='July 6, 1863'),
 73: dict(via='DIRECT'), 74: dict(skip=True), 75: dict(via='WS'),
 76: dict(via='IA:sim_journal-of-african-american-history_1926-01_11_1', title='The Journal of Negro History, January 1926',
    source='Letter to Amelia Loguen, printed in The Journal of Negro History (January 1926)'),
 77: dict(via='IA:warofrebellion0030geor', title=OR, minratio=0.8), 78: dict(via='IA:bwb_Y0-BNJ-150_3', title='Battles and Leaders of the Civil War, vol. 3'),
 79: dict(via='IA:battlesleadersof03cent', title='Battles and Leaders of the Civil War, vol. 3', quote='"Thomas, who ordered those men up the ridge?" … "I don\'t know; I did not."'),
 80: dict(via='IA:warofrebellion312unit', title=OR, source='Official report of the battle, Official Records', date='November 1863',
    quote='No satisfactory excuse can possibly be given for the shameful conduct of our troops on the left in allowing their line to be penetrated. The position was one which ought to have been held by a line of skirmishers against any assaulting column.'),
 84: dict(via='IA:bwb_S0-ECN-710', title='Horace Porter, Campaigning with Grant (1897)'),
 85: dict(via='IA:cu31924030927002', title='Horace Porter, Campaigning with Grant (1897)',
    quote='I noticed that many of the soldiers had taken off their coats, and seemed to be engaged in sewing up rents in them … the men were calmly writing their names and home addresses on slips of paper, and pinning them on the backs of their coats, so that their dead bodies might be recognized upon the field, and their fate made known to their families at home.'),
 86: dict(via='WS'), 88: dict(via='WS'),
 90: dict(via='IA:southgenerals00snowrich', title='William P. Snow, Southern Generals (1865)', quote='Our loss of officers was excessively large in proportion to the loss of men.',
    source='Dispatch to Richmond, as printed in William P. Snow, Southern Generals (1865)'),
 91: dict(via='IA:advanceretreatpe00hood', title='John Bell Hood, Advance and Retreat (1880)'),
 92: dict(via='IA:warofrebellion452unit', title=OR),
 94: dict(via='AUTO', title='Charles C. Coffin, Freedom Triumphant (1890), quoting the telegram'),
 95: dict(via='AUTO', title='The Story of a Regiment (1895), quoting the telegram'),
 97: dict(via='WS'),
 98: dict(via='IA:warofrebellion461unit', title=OR, source='General Order No. 9, Official Records',
    quote='After four years of arduous service marked by unsurpassed courage and fortitude, the Army of Northern Virginia has been compelled to yield to overwhelming numbers and resources … I bid you all an affectionate farewell.'),
 100: dict(via='IA:fightformissouri00snea', title='Thomas L. Snead, The Fight for Missouri (1886)',
    quote='Rather than concede to the State of Missouri for one single instant the right to dictate to my Government in any matter however unimportant, I would … see you, and you, and you, and you, and you, and every man, woman, and child in the State, dead and buried … This means war.'),
 101: dict(skip=True),
 102: dict(manual='https://archive.org/details/in.ernet.dli.2015.75551?q=%22flat+on+my+back%22', title='Touched with Fire: Civil War Letters and Diary of Oliver Wendell Holmes, Jr. (1946)'),
 103: dict(via='IA:sim_civil-war-history_1958-12_4_4', title='Civil War History, December 1958, quoting the letter', quote='I must have St. Louis—then Huzza!'),
 104: dict(via='IA:civilwaronwester00mona', title='Jay Monaghan, Civil War on the Western Border (1955), quoting the letter',
    quote='The vulture and the wolf have now communion, and the dead, friends and foes, sleep in the same lonely grave.',
    source='Letter to his brother, quoted in Jay Monaghan, Civil War on the Western Border (1955)'),
 105: dict(via='IA:miscellaneouspa00unkngoog', title='Miscellaneous Papers, 1672–1865, Now First Printed from the Manuscript (1887)',
    quote='Gun after gun was fired by the Monitor, which was returned with whole broadsides by the rebels with no more effect apparently than so many pebble-stones thrown by a child.'),
 107: dict(via='AUTO', title='Correspondence between the Mayor and Federal Authorities Relative to the Occupation of New Orleans (1862)'),
 110: dict(via='IA:bub_gb_ssIdAQAAMAAJ', title='Sam R. Watkins, "Co. Aytch" (1882)',
    quote='I was in every battle, skirmish and march that was made by the First Tennessee Regiment during the war, and I do not remember of a harder contest and more evenly fought battle than that of Perryville. If it had been two men wrestling, it would have been called a "dog fall." Both sides claim the victory—both whipped.'),
 111: dict(via='IA:warofrebellion161unit', title=OR),
 112: dict(via='IA:lifecampaignsofm00mccl', title='H. B. McClellan, The Life and Campaigns of Major-General J. E. B. Stuart (1885)'),
 113: dict(via='IA:sabresandspursf00denigoog', title='Frederic Denison, Sabres and Spurs (1876), quoting the editorial',
    quote='This much puffed cavalry of Northern Virginia has been twice, if not three times, surprised since the battles of December, and such repeated accidents can be regarded as nothing but the necessary consequences of negligence and bad management.'),
 115: dict(via='IA:cu31924079575225', title=OR),
 116: dict(via='WS', title='Personal Memoirs of U. S. Grant, chapter 47, quoting the dispatch'),
 117: dict(via='IA:completeworksvo00lincgoog', title='Complete Works of Abraham Lincoln, vol. 10 (1894)'),
 118: dict(via='IA:generalshermans00shergoog', title='General Sherman\'s Official Account of His Great March (1865)', minratio=0.8,
    quote='I perceived that the enemy and our own officers had settled down into a conviction that I would not assault fortified lines. All looked to me to "outflank." An army to be efficient must not settle down to one single mode of offence, but must be prepared to execute any plan which promises success.',
    source='Official report of the Atlanta Campaign', date='September 1864'),
 119: dict(via='IA:maurygrays00watkrich', title='Sam R. Watkins, "Co. Aytch" (1900 edition)',
    quote='I will ever think that the reason they did not capture our works was the impossibility of their living men passing over the bodies of their dead.'),
 122: dict(skip=True),
 124: dict(via='AUTO', title='Personal Recollections of the War of the Rebellion (1891), quoting the telegram'),
 125: dict(via='IA:warofrebellion431unit_0', title=OR,
    source='As recorded by Jedediah Hotchkiss, Early\'s mapmaker, in his journal for October 19, 1864, Official Records'),
 128: dict(via='IA:sunsetofconfeder00scha', title='Morris Schaff, The Sunset of the Confederacy (1912), quoting Mahone', quote='My God! has the army dissolved?',
    source='As recorded by Maj. Gen. William Mahone, who was beside him; quoted in Morris Schaff, The Sunset of the Confederacy (1912)'),
}
D_TITLED = {n for n, d in D.items() if 'title' in d}
CLEAN = [
 ('war of the rebellion', OR), ('writings of george washington', 'The Writings of George Washington (19th-century edition)'),
 ('personal memoirs of u', 'Personal Memoirs of U. S. Grant (1885)'), ('memoirs of general william t. sherman', 'Memoirs of General William T. Sherman (1875)'),
 ('battles and leaders', 'Battles and Leaders of the Civil War (1884–1888)'), ('aytch', 'Sam R. Watkins, "Co. Aytch" (1882)'),
 ('campaigning with grant', 'Horace Porter, Campaigning with Grant (1897)'), ('passing of the armies', 'Joshua L. Chamberlain, The Passing of the Armies (1915)'),
 ('complete works (1894)', 'Complete Works of Abraham Lincoln (1894)'), ('an autobiography (1906)', 'Lew Wallace: An Autobiography (1906)'),
 ('life of david glasgow farragut', 'Loyall Farragut, The Life of David Glasgow Farragut (1879)'),
 ('military journal during', 'James Thacher, A Military Journal during the American Revolutionary War (1823)'),
 ('works of alexander hamilton', 'The Works of Alexander Hamilton (1850)'),
 ('official records of the union and confederate navies', 'Official Records of the Union and Confederate Navies (1894)'),
 ('command in the battle of bunker hill', 'Richard Frothingham, The Command in the Battle of Bunker Hill (1850)'),
 ('princeton battle monument', 'The Princeton Battle Monument (1922)'),
 ('nathanael greene strategist', 'Theodore Thayer, Nathanael Greene: Strategist of the American Revolution (1960), quoting the letter'),
 ('life of nathanael greene, major-general', 'William Gilmore Simms, The Life of Nathanael Greene (1861), quoting the narrative'),
 ('gentleman johnny burgoyne', 'F. J. Hudleston, Gentleman Johnny Burgoyne (1927), quoting the letter'),
 ('inauguration of the jackson statue', 'Inauguration of the Jackson Statue, Richmond (1875)'),
 ('adventures of a revolutionary soldier', 'Joseph Plumb Martin, A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (Wikisource transcription)'),
 ('american crisis', 'Thomas Paine, The American Crisis, No. 1 (Wikisource transcription)'),
 ('history of the civil war, 1861-1865', 'James Ford Rhodes, History of the Civil War, 1861–1865, quoting the telegram (Wikisource transcription)'),
 ('reminiscences of carl schurz', 'The Reminiscences of Carl Schurz, quoting the address (Wikisource transcription)'),
 ('personal memoirs of u. s. grant (wikisource', 'Personal Memoirs of U. S. Grant (Wikisource transcription)'),
]
def nice(title, year):
    t = re.split(r' ?[;:] ', title)[0].strip(' .,[]'); t = t[0].upper() + t[1:] if t else t
    return t + (' (%s)' % year if year and year not in t else '')
def phrase(q):
    seg = re.split(r'…', re.sub(r'\[[^\]]*\]', ' ', q))[0]; toks = [re.sub(r'^[^\w]+|[^\w]+$', '', t) for t in seg.split()]
    for a in range(0, max(1, len(toks) - 3)):
        w = toks[a:a + 4]
        if len(w) == 4 and all(re.fullmatch(r'[A-Za-z]{2,}', x) for x in w): return ' '.join(w)
    return ' '.join(t for t in toks[:4] if t)
out, stats, problems = {}, {'verified': 0, 'unverified': 0, 'reworded': 0}, []
for n, q in enumerate(quotes):
    key = '%s/%s/%d' % (q['war'], q['battle'], q['i']); d = dict(D.get(n, {'via': 'AUTO'})); e = {}
    for f in ('quote', 'source', 'date', 'who', 'role'):
        if f in d: e[f] = d[f]
    if 'quote' in d: stats['reworded'] += 1
    if d.get('skip'): stats['unverified'] += 1; out[key] = e; continue
    quote = d.get('quote', q['quote']); via = d.get('via', ''); ref = title = None
    if d.get('manual'): ref, title = d['manual'], d['title']
    else:
        if via == 'AUTO':
            best = max((f.get(key, {}) for f in ia_files[:3]), key=lambda r: r.get('ratio', 0))
            if di.get(key, {}).get('ratio', 0) >= 0.999: via = 'DIRECT'
            elif best.get('ratio', 0) >= 0.999: via = 'IA:' + best['id']
            elif ws.get(key, {}).get('ratio', 0) >= 0.999: via = 'WS'
            else: problems.append('%d %s: AUTO has no exact match' % (n, key)); continue
        if via == 'DIRECT': ref, title = di[key]['url'], di[key]['title']
        elif via == 'WS':
            r = ws[key]; ref, title = r['url'], d.get('title') or (r['title'].split('/')[0] + ' (Wikisource transcription)')
            if 'title' in d: title = d['title'] + ' (Wikisource transcription)'
        elif via.startswith('IA:'):
            ident = via[3:]; raw = qv.item_text(ident)
            if raw:
                tn, tidx = qv.norm_map(raw); res = [qv.align(s, tn, tidx, raw) for s in qv.segments(quote)]; ratio = min(r for r, _ in res)
                if ratio < d.get('minratio', 0.84): problems.append('%d %s: ratio %.3f vs %s | %s' % (n, key, ratio, ident, ' || '.join(re.sub(r'\s+', ' ', p) for _, p in res)[:200]))
            else: problems.append('%d %s: no text for %s' % (n, key, ident))
            t = d.get('title') or (nice(*titles[ident]) if ident in titles else None)
            if not t: problems.append('%d %s: no title for %s' % (n, key, ident)); continue
            ref, title = 'https://archive.org/details/%s?q=%s' % (ident, urllib.parse.quote('"%s"' % phrase(quote))), t
    for sub, rep in CLEAN:
        if sub in title.lower() and not n in D_TITLED: title = rep; break
    e.update(verified=True, ref=ref, refTitle=title); out[key] = e; stats['verified'] += 1
json.dump(out, open(os.path.join(HERE, 'decisions.json'), 'w'), indent=1, ensure_ascii=False)
print(stats); print('\n'.join(problems) or 'no problems')
if '--list' in sys.argv:
    for n, q in enumerate(quotes):
        e = out.get('%s/%s/%d' % (q['war'], q['battle'], q['i']), {})
        print('%3d %s | %s' % (n, 'V' if e.get('verified') else '-', (e.get('refTitle') or '')[:95]))
