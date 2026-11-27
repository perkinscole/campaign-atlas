import sys, json; sys.path.insert(0, sys.argv[1])
from emit import insert
ROOT, OSM = sys.argv[2], sys.argv[3]
def lines(name, pick, extra=()):
    out = []
    for l in json.load(open(f'{OSM}/{name}_lines.json')):
        r = pick(l)
        if r: out.append({'kind': l['kind'], 'name': r[0], 'pts': r[1]})
    return out + list(extra)

# ---- Antietam -------------------------------------------------------------------------
def ant(l):
    n, p = l['name'], l['pts']
    if n == 'Dunker Church Road': return 'Hagerstown Pike', p
    if n == 'Sharpsburg Pike':
        south = [q for q in p if q[0] <= 39.4720]
        return ('Hagerstown Pike', south) if len(south) > 1 else None
    if n == 'Shepherdstown Pike': return ('Boonsboro Pike' if p[0][1] > -77.75 or p[-1][1] > -77.75 else 'Road to Shepherdstown'), p
    if n in ('Harpers Ferry Road', 'Smoketown Road', 'Keedysville Road', 'Antietam Creek', 'Potomac River'): return n, p
    if n == 'Old Burnside Bridge Road': return 'Lower Bridge Road', p
    if n == 'Burnside Bridge Road':
        west = [q for q in p if q[1] <= -77.7384]
        return ('Lower Bridge Road', west) if len(west) > 1 else None
    if n in ('Mummas Lane', 'Roulette Lane'): return n.replace('Mummas', "Mumma's").replace('Roulette', "Roulette's"), p
antietam = {
  'base': 'contour',
  'bounds': [[39.428, -77.782], [39.498, -77.705]],
  'note': 'Unit positions are simplified from standard maps of the battle and tied to the landmarks the National Park Service marks on the field. Each bar is a corps or a division.',
  'lines': lines('antietam', ant, [{'kind': 'road', 'name': 'Sunken Road', 'pts': [[39.47135, -77.74115], [39.47093, -77.73947], [39.46997, -77.73709]]}]),
  'places': [
    {'name': 'Sharpsburg', 'll': [39.4582, -77.7487]}, {'name': 'Dunker Church', 'll': [39.4754, -77.7468]}, {'name': 'The Cornfield', 'll': [39.4830, -77.7470]},
    {'name': 'East Woods', 'll': [39.4813, -77.7405]}, {'name': 'West Woods', 'll': [39.4785, -77.7515]}, {'name': 'North Woods', 'll': [39.4898, -77.7475]},
    {'name': 'Sunken Road', 'll': [39.4698, -77.7385]}, {'name': 'Burnside Bridge', 'll': [39.4501, -77.7327]}, {'name': 'Antietam Creek', 'll': [39.4670, -77.7225]},
    {'name': "Boteler's Ford", 'll': [39.4308, -77.7782]}
  ],
  'units': {
    'i': {'side': 'union', 'name': 'I Corps (Hooker)', 'short': 'I Corps'},
    'xii': {'side': 'union', 'name': 'XII Corps (Mansfield)', 'short': 'XII Corps'},
    'sedg': {'side': 'union', 'name': "II Corps: Sedgwick's division", 'short': 'Sedgwick'},
    'fr': {'side': 'union', 'name': "II Corps: French's and Richardson's divisions", 'short': 'French and Richardson'},
    'ix': {'side': 'union', 'name': 'IX Corps (Burnside)', 'short': 'IX Corps'},
    'res': {'side': 'union', 'name': 'V Corps, held in reserve (Porter)', 'short': 'Reserve'},
    'jack': {'side': 'confederate', 'name': "Jackson's command", 'short': 'Jackson'},
    'hood': {'side': 'confederate', 'name': "Hood's division", 'short': 'Hood'},
    'dhh': {'side': 'confederate', 'name': "D.H. Hill's division", 'short': 'D.H. Hill'},
    'mcl': {'side': 'confederate', 'name': "McLaws's and Walker's divisions", 'short': 'McLaws and Walker'},
    'jones': {'side': 'confederate', 'name': "D.R. Jones's division", 'short': 'D.R. Jones'},
    'toombs': {'side': 'confederate', 'name': "Toombs's Georgians", 'short': 'Toombs'},
    'aph': {'side': 'confederate', 'name': "A.P. Hill's division", 'short': 'A.P. Hill'}
  },
  'phases': [
    {'time': 'September 17, 1862, dawn', 'title': 'Hooker attacks from the north',
     'text': 'Lee\'s army stands on the ridge in front of Sharpsburg with the Potomac River at its back and one ford to escape by. McClellan has nearly twice as many men. At first light Hooker\'s corps comes down the Hagerstown Pike toward a small white church, the Dunker Church, on the high ground behind Jackson\'s line.',
     'units': {'i': [[39.4885, -77.7510], [39.4885, -77.7430]], 'xii': [[39.4915, -77.7395], [39.4900, -77.7350]], 'sedg': [[39.4775, -77.7170], [39.4750, -77.7165]], 'fr': [[39.4740, -77.7160], [39.4715, -77.7160]],
               'res': [[39.4660, -77.7215], [39.4610, -77.7235]], 'ix': [[39.4520, -77.7290], [39.4480, -77.7295]],
               'jack': [[39.4795, -77.7510], [39.4790, -77.7440]], 'hood': [[39.4750, -77.7490], [39.4748, -77.7455]], 'dhh': [[39.47135, -77.74115], [39.47093, -77.73947], [39.46997, -77.73709]],
               'jones': [[39.4600, -77.7420], [39.4530, -77.7410]], 'toombs': [[39.4510, -77.7338], [39.4492, -77.7336]]},
     'arrows': [{'side': 'union', 'pts': [[39.4875, -77.7475], [39.4812, -77.7472]]}]},
    {'time': '6 to 7:30 a.m.', 'title': 'The Cornfield',
     'text': 'The two lines meet in a thirty-acre field of ripe corn. Hooker\'s men drive Jackson back through it. Then Hood\'s division, called from its breakfast, charges and throws them out again. The field changes hands again and again, and by the end the corn is cut as close as if by a knife.',
     'units': {'i': [[39.4838, -77.7500], [39.4836, -77.7440]], 'hood': [[39.4812, -77.7500], [39.4810, -77.7445]], 'jack': [[39.4800, -77.7528], [39.4762, -77.7522]]},
     'arrows': [{'side': 'confederate', 'pts': [[39.4760, -77.7472], [39.4805, -77.7472]]}]},
    {'time': '7:30 to 9 a.m.', 'title': 'The East Woods',
     'text': 'A second Union corps comes in through the East Woods. Its commander, Mansfield, is shot from his horse within minutes, but his men push Hood back and one division gets as far as the Dunker Church. Hooker is wounded and his worn-out corps falls back to where it started.',
     'units': {'xii': [[39.4818, -77.7448], [39.4770, -77.7448]], 'i': [[39.4882, -77.7505], [39.4880, -77.7440]], 'hood': [[39.4756, -77.7512], [39.4736, -77.7498]]},
     'arrows': [{'side': 'union', 'pts': [[39.4860, -77.7385], [39.4800, -77.7440]]}]},
    {'time': 'About 9 a.m.', 'title': 'Disaster in the West Woods',
     'text': 'Sedgwick\'s division, 5,400 men in three long lines, crosses the creek and marches straight into the West Woods with no one guarding its side. Fresh Confederate divisions hit its left flank. In about twenty minutes more than 2,200 Union soldiers are shot, and the rest run for the North Woods.',
     'units': {'sedg': [[39.4802, -77.7524], [39.4768, -77.7520]], 'mcl': [[39.4765, -77.7552], [39.4748, -77.7505]], 'jack': [[39.4832, -77.7552], [39.4806, -77.7552]]},
     'arrows': [{'side': 'union', 'pts': [[39.4775, -77.7300], [39.4788, -77.7500]]}, {'side': 'confederate', 'pts': [[39.4722, -77.7528], [39.4764, -77.7524]]}]},
    {'time': '9:30 a.m. to 1 p.m.', 'title': 'The Sunken Road',
     'text': 'The fight shifts to the center. D.H. Hill\'s men lie in an old farm road worn below the level of the fields, a ready-made trench. For three hours they shoot down two Union divisions coming over the rise in front. Then a mistaken order pulls one regiment back, Union troops reach a spot where they can fire down the length of the road, and it becomes Bloody Lane. Lee\'s center is broken. McClellan, sure that Lee has hidden reserves, sends no one through the gap.',
     'units': {'sedg': [[39.4872, -77.7480], [39.4862, -77.7440]], 'fr': [[39.4716, -77.7412], [39.4712, -77.7394], [39.4702, -77.7370]], 'dhh': [[39.4675, -77.7432], [39.4664, -77.7402]]},
     'arrows': [{'side': 'union', 'pts': [[39.4745, -77.7250], [39.4722, -77.7385]]}]},
    {'time': '10 a.m. to 1 p.m.', 'title': 'Burnside\'s Bridge',
     'text': 'Downstream, Burnside\'s corps is ordered across the creek. About 500 Georgians on the bluff above a narrow stone bridge hold off 12,000 men for three hours. At one o\'clock two regiments charge across the bridge while others wade the creek downstream, and the Georgians, out of ammunition, fall back.',
     'units': {'ix': [[39.4528, -77.7348], [39.4490, -77.7352]], 'toombs': None},
     'arrows': [{'side': 'union', 'pts': [[39.4498, -77.7302], [39.4504, -77.7342]]}]},
    {'time': '3 to 5 p.m.', 'title': 'A.P. Hill arrives',
     'text': 'Burnside\'s men climb toward Sharpsburg and the road to the ford, the only way out for Lee\'s army. They are in the edge of the town when A.P. Hill\'s division, at the end of a seventeen-mile march from Harpers Ferry, comes onto the field and strikes them in the flank. The Union line falls back toward the bridge.',
     'units': {'ix': [[39.4590, -77.7440], [39.4540, -77.7440], [39.4500, -77.7430]], 'jones': [[39.4602, -77.7472], [39.4556, -77.7476]], 'aph': [[39.4502, -77.7478], [39.4468, -77.7442]]},
     'arrows': [{'side': 'confederate', 'pts': [[39.4385, -77.7610], [39.4480, -77.7470]]}]},
    {'time': 'Evening, and the two days after', 'title': 'The bloodiest day',
     'text': 'Night ends it. Nearly 23,000 men have been killed, wounded, or are missing, more than on any other single day in American history, and neither army has gained ground. Lee waits a day, then crosses the Potomac back into Virginia. McClellan lets him go. Five days after the battle, Lincoln uses the victory to announce the Emancipation Proclamation.',
     'units': {'ix': [[39.4545, -77.7378], [39.4492, -77.7382]], 'aph': [[39.4520, -77.7440], [39.4480, -77.7420]]},
     'arrows': [{'side': 'confederate', 'pts': [[39.4560, -77.7520], [39.4318, -77.7770]]}]}
  ],
  'ask': ['McClellan had almost twice as many men, yet his attacks came one after another: north, then center, then south. How did that help Lee?',
          'Find the Reserve bar. It never moved. What might have happened if those men had gone through the gap at the Sunken Road?',
          'Look at where Lee\'s army stood and where the river and the ford are. What risk was Lee taking by fighting here?']
}

# ---- Yorktown -------------------------------------------------------------------------
def york(l):
    n, p = l['name'], l['pts']
    if n == 'Cook Road': return 'Hampton Road', p
    if n == 'Goosley Road': return 'Williamsburg Road', p
    if n in ('Great Run', 'Baptist Run', 'Beaverdam Creek'): return n, p
BR_LINE = [[37.2400, -76.5140], [37.2350, -76.5125], [37.2305, -76.5090], [37.2292, -76.5058], [37.2302, -76.5022], [37.2318, -76.5002]]
yorktown = {
  'base': 'topo',
  'bounds': [[37.203, -76.535], [37.268, -76.478]],
  'note': 'Positions are simplified and tied to the earthworks the National Park Service preserves: the British inner line, Redoubts 9 and 10, the Grand French Battery, and the second siege line.',
  'lines': lines('yorktown', york),
  'places': [
    {'name': 'Yorktown', 'll': [37.2360, -76.5078]}, {'name': 'Gloucester Point', 'll': [37.2480, -76.5010]}, {'name': 'York River', 'll': [37.2420, -76.4920]},
    {'name': 'Redoubts 9 and 10', 'll': [37.2290, -76.4955]}, {'name': 'Grand French Battery', 'll': [37.2222, -76.5047]}, {'name': 'Surrender Field', 'll': [37.2086, -76.5054]}
  ],
  'units': {
    'fr': {'side': 'american', 'name': 'French army (Rochambeau)', 'short': 'French'},
    'am': {'side': 'american', 'name': 'American army (Washington)', 'short': 'Americans'},
    'gla': {'side': 'american', 'name': 'French and Virginia militia at Gloucester (Choisy)', 'short': 'Choisy'},
    'br': {'side': 'british', 'name': 'British army (Cornwallis)', 'short': 'Cornwallis'},
    'out': {'side': 'british', 'name': 'British outer works', 'short': 'Outer works'},
    'red': {'side': 'british', 'name': 'Redoubts 9 and 10', 'short': 'Redoubts'},
    'glb': {'side': 'british', 'name': 'British at Gloucester (Tarleton)', 'short': 'Tarleton'}
  },
  'phases': [
    {'time': 'September 28 to 30, 1781', 'title': 'The allies close in',
     'text': 'Washington and Rochambeau march from Williamsburg and form a half circle around Yorktown, the French on the left and the Americans on the right. Out in Chesapeake Bay a French fleet blocks any rescue by sea. Cornwallis expects help from New York within days, so he gives up his outer forts without a fight and pulls his men back to the works around the town.',
     'units': {'fr': [[37.2330, -76.5290], [37.2200, -76.5230], [37.2140, -76.5130]], 'am': [[37.2120, -76.5080], [37.2130, -76.4950], [37.2190, -76.4850]], 'gla': [[37.2645, -76.5080], [37.2645, -76.4930]],
               'br': BR_LINE, 'out': [[37.2262, -76.5140], [37.2231, -76.5134], [37.2215, -76.5080]], 'red': [[37.2276, -76.4992], [37.2292, -76.4974]], 'glb': [[37.2535, -76.5040], [37.2535, -76.4955]]}},
    {'time': 'October 6 to 9', 'title': 'The first trench',
     'text': 'On a dark, rainy night, thousands of men with picks and shovels dig a trench more than a mile long, about 600 yards from the British line, without being noticed until morning. Cannon are dragged into it. On October 9 the French guns open fire, and Washington himself touches off the first American gun.',
     'units': {'out': None, 'fr': [[37.2242, -76.5105], [37.2230, -76.5047]], 'am': [[37.2232, -76.5035], [37.2236, -76.4990], [37.2262, -76.4930]]}},
    {'time': 'October 11', 'title': 'The second trench',
     'text': 'After two days of bombardment the British guns are nearly silent. The allies dig a second trench only 300 to 400 yards out, close enough to batter the walls down. But it cannot reach the river: two small British forts, Redoubts 9 and 10, stand in the way.',
     'units': {'fr': [[37.2262, -76.5105], [37.2263, -76.5054]], 'am': [[37.2262, -76.5045], [37.2262, -76.5005]]}},
    {'time': 'October 14, after dark', 'title': 'Redoubts 9 and 10',
     'text': 'Four hundred French soldiers storm Redoubt 9. Four hundred Americans led by Lt. Col. Alexander Hamilton take Redoubt 10, going in with unloaded muskets and bayonets so that no shot will give them away. Both forts fall in minutes. By morning they are part of the allied trench.',
     'units': {'red': None, 'am': [[37.2262, -76.5045], [37.2268, -76.5008], [37.2276, -76.4992], [37.2292, -76.4974]]},
     'arrows': [{'side': 'american', 'pts': [[37.2248, -76.5004], [37.2273, -76.4994]]}, {'side': 'american', 'pts': [[37.2262, -76.4958], [37.2288, -76.4972]]}]},
    {'time': 'October 16', 'title': 'Two last tries',
     'text': 'Before dawn 350 British soldiers rush the new trench and disable a few cannon, which are firing again within hours. That night Cornwallis tries to ferry his army across the river to Gloucester and break out to the north. A sudden storm scatters the boats.',
     'units': {},
     'arrows': [{'side': 'british', 'pts': [[37.2292, -76.5056], [37.2266, -76.5050]]}, {'side': 'british', 'pts': [[37.2392, -76.5070], [37.2470, -76.5020]]}]},
    {'time': 'October 17 to 19', 'title': 'Surrender',
     'text': 'On the morning of October 17, a drummer climbs onto the British wall and beats for a parley. Two days later more than 7,000 British and German soldiers march out between a line of French troops and a line of Americans and lay down their arms in an open field. It is the last major battle of the war.',
     'units': {'br': [[37.2105, -76.5060], [37.2085, -76.5048]], 'fr': [[37.2210, -76.5078], [37.2115, -76.5072]], 'am': [[37.2210, -76.5046], [37.2118, -76.5034]]},
     'arrows': [{'side': 'british', 'pts': [[37.2285, -76.5060], [37.2118, -76.5054]]}]}
  ],
  'ask': ['Yorktown has a wide river on one side. Why did that make it a good place for Cornwallis to wait, and then a trap?',
          'Why did the allies dig their trenches at night, and why did each new trench have to be closer than the last?',
          'The second trench could not be finished until Redoubts 9 and 10 fell. Find them on the map and explain why.']
}

# ---- Saratoga -------------------------------------------------------------------------
def sar(l):
    if l['name'] in ('Hudson River', 'Mill Creek', 'Kroma Kill'): return l['name'], l['pts']
AM_LINE = [[42.9895, -73.6135], [42.9880, -73.6250], [42.9860, -73.6415], [42.9900, -73.6440]]
saratoga = {
  'base': 'contour',
  'bounds': [[42.975, -73.672], [43.022, -73.585]],
  'note': 'Positions are simplified from standard maps of the two battles and tied to the monuments on the field at Freeman\'s Farm, the Breymann Redoubt, and Bemis Heights. Line lengths are approximate.',
  'lines': lines('saratoga', sar),
  'places': [
    {'name': 'Bemis Heights', 'll': [42.9848, -73.6400]}, {'name': "Freeman's Farm", 'll': [43.0051, -73.6369]}, {'name': 'Breymann Redoubt', 'll': [43.0096, -73.6394]},
    {'name': "Barber's wheatfield", 'll': [43.0006, -73.6469]}, {'name': 'Great Redoubt', 'll': [43.0058, -73.6110]}, {'name': 'Hudson River', 'll': [42.9960, -73.6020]}
  ],
  'units': {
    'gates': {'side': 'american', 'name': 'American fortified camp (Gates)', 'short': 'Gates'},
    'mo': {'side': 'american', 'name': "Morgan's riflemen and Dearborn's light infantry", 'short': 'Morgan'},
    'ar': {'side': 'american', 'name': "Arnold's wing (Poor, Learned)", 'short': 'Arnold'},
    'bc': {'side': 'british', 'name': 'British center (Burgoyne, Hamilton)', 'short': 'Burgoyne'},
    'bf': {'side': 'british', 'name': "British right (Fraser, Breymann)", 'short': 'Fraser'},
    'gr': {'side': 'british', 'name': 'German troops (Riedesel)', 'short': 'Riedesel'},
    'probe': {'side': 'british', 'name': 'British probe of October 7', 'short': 'Probe'}
  },
  'phases': [
    {'time': 'September 12 to 18, 1777', 'title': 'The road south is blocked',
     'text': 'Burgoyne must get down the Hudson to Albany before winter. At Bemis Heights the bluffs crowd the only road against the river, and there the American army digs in, on ground chosen by a Polish engineer, Thaddeus Kosciuszko. Cannon cover the river road. To get past, Burgoyne will have to go through the woods and ravines on the high ground to the west.',
     'units': {'gates': AM_LINE, 'bc': [[43.0195, -73.6300], [43.0195, -73.6200]], 'bf': [[43.0200, -73.6480], [43.0195, -73.6400]], 'gr': [[43.0190, -73.6020], [43.0150, -73.5990]]}},
    {'time': 'September 19, about 1 p.m.', 'title': 'Freeman\'s Farm',
     'text': 'Burgoyne advances in three columns. Benedict Arnold persuades Gates to meet them in the woods rather than wait behind the walls. Morgan\'s riflemen run into the British center in a clearing called Freeman\'s Farm. Hidden among the trees, they pick off officers and the men serving the cannon.',
     'units': {'bc': [[43.0066, -73.6400], [43.0062, -73.6345]], 'bf': [[43.0085, -73.6500], [43.0055, -73.6482]], 'gr': [[43.0050, -73.6090], [43.0010, -73.6100]],
               'mo': [[43.0036, -73.6405], [43.0036, -73.6350]], 'ar': [[42.9990, -73.6440], [42.9985, -73.6380]]},
     'arrows': [{'side': 'british', 'pts': [[43.0185, -73.6300], [43.0075, -73.6375]]}, {'side': 'american', 'pts': [[42.9915, -73.6440], [43.0025, -73.6385]]}]},
    {'time': 'September 19, late afternoon', 'title': 'The Germans save the center',
     'text': 'For three hours the clearing changes hands again and again. Arnold feeds in fresh regiments and the British center is close to breaking. Then Riedesel marches his Germans up from the river road and hits the American right. At dusk the Americans go back to their camp. Burgoyne holds the field, but he has lost about 600 men, twice the American loss, and he cannot replace them.',
     'units': {'ar': [[43.0030, -73.6440], [43.0028, -73.6360]], 'gr': [[43.0045, -73.6312], [43.0022, -73.6304]]},
     'arrows': [{'side': 'british', 'pts': [[43.0030, -73.6110], [43.0034, -73.6295]]}]},
    {'time': 'September 20 to October 6', 'title': 'Burgoyne digs in and waits',
     'text': 'Burgoyne fortifies where he stands and waits for a British army to come up the river from New York. It never comes. His men go on half rations while militia pour into the American camp from all over New England and New York, until Gates has more than twice Burgoyne\'s numbers.',
     'units': {'bf': [[43.0092, -73.6398], [43.0076, -73.6390]], 'bc': [[43.0062, -73.6372], [43.0040, -73.6366]], 'gr': [[43.0050, -73.6125], [43.0022, -73.6105]], 'mo': None, 'ar': None}},
    {'time': 'October 7, mid-afternoon', 'title': 'Barber\'s wheatfield',
     'text': 'Burgoyne sends about 1,500 men and ten cannon forward to test the American left. They halt in a wheatfield. The Americans strike both ends of the line at once, Poor on one side and Morgan through the woods on the other. General Simon Fraser, rallying his men, is shot by one of Morgan\'s riflemen, and within an hour the British are running for their forts.',
     'units': {'probe': [[43.0018, -73.6500], [43.0012, -73.6440]], 'mo': [[43.0034, -73.6545], [43.0002, -73.6535]], 'ar': [[42.9992, -73.6490], [42.9988, -73.6425]]},
     'arrows': [{'side': 'american', 'pts': [[42.9925, -73.6450], [42.9982, -73.6458]]}]},
    {'time': 'October 7, dusk', 'title': 'The redoubts',
     'text': 'Arnold, who has quarreled with Gates and has no command, gallops onto the field anyway. He leads a charge on the fort at Freeman\'s Farm, which fails, then rides through the fire of both armies and storms the Breymann Redoubt through its open rear. He is shot in the leg as it falls. With that fort gone, the whole British camp lies open.',
     'units': {'probe': None, 'mo': [[43.0092, -73.6426], [43.0076, -73.6420]], 'ar': [[43.0046, -73.6396], [43.0030, -73.6388]], 'bf': None},
     'arrows': [{'side': 'american', 'pts': [[43.0040, -73.6440], [43.0082, -73.6412]]}]},
    {'time': 'October 8 to 17', 'title': 'Retreat and surrender',
     'text': 'Burgoyne retreats north in the rain to the village of Saratoga, eight miles upriver. The Americans, now some 17,000 strong, close in on every side. On October 17 he surrenders his whole army, about 5,900 men. When the news reaches Paris, France agrees to join the war as America\'s ally.',
     'units': {'bc': [[43.0200, -73.6040], [43.0180, -73.6020]], 'gr': None, 'mo': [[43.0150, -73.6120], [43.0130, -73.6100]], 'ar': None, 'gates': [[43.0100, -73.6080], [43.0060, -73.6090], [43.0020, -73.6110]]},
     'arrows': [{'side': 'british', 'pts': [[43.0050, -73.6110], [43.0195, -73.6030]]}]}
  ],
  'ask': ['Find the river road and the American camp. Why could Burgoyne not simply march down the road to Albany?',
          'Burgoyne "won" the first battle because he held the field. Why did it leave him worse off than before?',
          'Riflemen at Saratoga aimed at officers and gun crews. How might that change a battle in thick woods?']
}

# ---- Bunker Hill ----------------------------------------------------------------------
FENCE = [[42.3778, -71.0596], [42.3797, -71.0566]]
REDOUBT = [[42.3768, -71.0613], [42.3760, -71.0603]]
bunker = {
  'base': 'topo',
  'bounds': [[42.3655, -71.0800], [42.3885, -71.0450]],
  'note': 'This is a schematic. Charlestown was a narrow peninsula in 1775; most of the shore on today\'s map is land filled in later, so some troops appear to cross dry ground that was then open water. The redoubt is placed at the Bunker Hill Monument; other positions are approximate.',
  'places': [
    {'name': "Breed's Hill", 'll': [42.3755, -71.0622]}, {'name': 'Bunker Hill', 'll': [42.3806, -71.0660]}, {'name': 'Charlestown', 'll': [42.3722, -71.0628]}, {'name': "Moulton's Point", 'll': [42.3768, -71.0500]},
    {'name': 'Charlestown Neck', 'll': [42.3850, -71.0752]}, {'name': 'Mystic River', 'll': [42.3838, -71.0570]}, {'name': "Boston (Copp's Hill)", 'll': [42.3672, -71.0560]}
  ],
  'units': {
    'pres': {'side': 'american', 'name': "Prescott's redoubt and breastwork", 'short': 'Prescott'},
    'rail': {'side': 'american', 'name': 'Rail fence (Knowlton, Stark, Reed)', 'short': 'Stark and Knowlton'},
    'put': {'side': 'american', 'name': 'Putnam and the reserves', 'short': 'Putnam'},
    'howe': {'side': 'british', 'name': "Howe's right wing: grenadiers and light infantry", 'short': 'Howe'},
    'pig': {'side': 'british', 'name': "Pigot's left wing", 'short': 'Pigot'}
  },
  'phases': [
    {'time': 'June 16 to 17, 1775, overnight', 'title': 'A fort built in a night',
     'text': 'About a thousand New England militiamen march onto the Charlestown peninsula after dark. Their orders name Bunker Hill. Their officers choose the lower hill closer to Boston, Breed\'s Hill, and by dawn the men have dug an earth fort on top of it. A British warship in the harbor sees it at first light and opens fire.',
     'units': {'pres': REDOUBT, 'put': [[42.3808, -71.0662], [42.3800, -71.0650]]}},
    {'time': 'June 17, 1 to 3 p.m.', 'title': 'The British land',
     'text': 'General Gage could cut the Americans off by landing behind them at the Neck. He lets General Howe attack from the front instead. Barges row some 2,200 soldiers across to Moulton\'s Point. While Howe waits for the last of them, the Americans see that their left is wide open and extend it: Connecticut and New Hampshire men line a rail fence stuffed with hay, all the way down to the beach on the Mystic River.',
     'units': {'howe': [[42.3776, -71.0524], [42.3758, -71.0522]], 'pig': [[42.3752, -71.0536], [42.3740, -71.0546]], 'rail': FENCE},
     'arrows': [{'side': 'british', 'pts': [[42.3690, -71.0520], [42.3752, -71.0508]]}]},
    {'time': 'About 3:30 p.m.', 'title': 'The first assault',
     'text': 'Howe sends his fastest troops along the beach to get around the fence. Stark\'s New Hampshire men, behind a wall of stones they have just piled up, wait until the column is fifty yards away and then fire. The front ranks go down in heaps. The lines advancing on the fence and the fort are shot apart the same way.',
     'units': {'howe': [[42.3795, -71.0557], [42.3775, -71.0587]], 'pig': [[42.3759, -71.0590], [42.3749, -71.0600]]}},
    {'time': 'About 4 p.m.', 'title': 'Thrown back a second time',
     'text': 'The British re-form at the bottom of the hill and come on again, stepping over their own dead. Again the Americans hold their fire until the last moment, and again the line breaks and falls back. Behind the British, Charlestown is burning, set alight by cannon fire from the ships. Inside the fort, the powder is almost gone.',
     'units': {'howe': [[42.3786, -71.0538], [42.3768, -71.0562]], 'pig': [[42.3755, -71.0568], [42.3743, -71.0580]]}},
    {'time': 'About 4:30 p.m.', 'title': 'The third assault',
     'text': 'Howe gets 400 fresh men, tells his soldiers to drop their packs, and aims everything at the fort. The defenders fire their last rounds. The British come over the wall with bayonets, and the Americans, who have almost none, fight with musket butts and stones. Dr. Joseph Warren is killed as the fort empties.',
     'units': {'howe': [[42.3776, -71.0603], [42.3769, -71.0597]], 'pig': [[42.3765, -71.0608], [42.3758, -71.0599]], 'pres': [[42.3797, -71.0652], [42.3790, -71.0642]]},
     'arrows': [{'side': 'british', 'pts': [[42.3752, -71.0575], [42.3762, -71.0603]]}]},
    {'time': 'About 5 p.m.', 'title': 'Retreat over the Neck',
     'text': 'The men at the rail fence hold long enough for the others to get away, then pull back in good order. The British take the peninsula, but it has cost them 1,054 men, more than four in ten of those who fought, and a large share of their officers. They will not try another attack like it.',
     'units': {'pres': [[42.3856, -71.0760], [42.3848, -71.0748]], 'rail': [[42.3838, -71.0728], [42.3830, -71.0712]], 'put': [[42.3862, -71.0772], [42.3856, -71.0764]],
               'howe': [[42.3806, -71.0662], [42.3796, -71.0648]], 'pig': [[42.3768, -71.0613], [42.3760, -71.0603]]}}
  ],
  'ask': ['Find the Neck. What might have happened if the British had landed there instead of attacking from the front?',
          'The British won the hill. Why did both sides come to see the battle as an American success?',
          'Why did the American officers order their men to hold their fire until the British were very close?']
}

insert(ROOT + '/data/civil-war.js', 'antietam', antietam)
insert(ROOT + '/data/american-revolution.js', 'yorktown', yorktown)
insert(ROOT + '/data/american-revolution.js', 'saratoga', saratoga)
insert(ROOT + '/data/american-revolution.js', 'bunker-hill', bunker)
