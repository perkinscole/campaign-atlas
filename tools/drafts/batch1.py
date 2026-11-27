import sys; sys.path.insert(0, sys.argv[1])
from emit import insert
ROOT = sys.argv[2]

stalingrad = {
  'base': 'topo',
  'bounds': [[47.35, 42.0], [49.95, 45.6]],
  'note': 'Positions are simplified from standard maps of the campaign. Each bar is an army or a group of armies, drawn where its front stood.',
  'places': [
    {'name': 'Stalingrad', 'll': [48.71, 44.51]}, {'name': 'Kalach', 'll': [48.69, 43.53]}, {'name': 'Serafimovich', 'll': [49.58, 42.73]},
    {'name': 'Kletskaya', 'll': [49.31, 43.06]}, {'name': 'Kotelnikovo', 'll': [47.63, 43.15]}, {'name': 'Don River', 'll': [48.48, 43.25]}, {'name': 'Volga River', 'll': [49.02, 44.95]}
  ],
  'units': {
    'r62': {'side': 'allied', 'name': 'Soviet 62nd Army (Chuikov)', 'short': '62nd Army'},
    'r64': {'side': 'allied', 'name': 'Soviet 64th Army (Shumilov)', 'short': '64th Army'},
    'swf': {'side': 'allied', 'name': 'Southwestern Front (Vatutin)', 'short': 'Southwestern Front'},
    'donf': {'side': 'allied', 'name': 'Don Front (Rokossovsky)', 'short': 'Don Front'},
    'stf': {'side': 'allied', 'name': 'Stalingrad Front (Yeremenko)', 'short': 'Stalingrad Front'},
    'g2': {'side': 'allied', 'name': 'Soviet 2nd Guards Army (Malinovsky)', 'short': '2nd Guards'},
    'a6': {'side': 'axis', 'name': 'German Sixth Army (Paulus)', 'short': 'Sixth Army'},
    'pz4': {'side': 'axis', 'name': 'German Fourth Panzer Army (Hoth)', 'short': '4th Panzer Army'},
    'ro3': {'side': 'axis', 'name': 'Romanian Third Army', 'short': 'Romanian 3rd'},
    'ro4': {'side': 'axis', 'name': 'Romanian Fourth Army', 'short': 'Romanian 4th'}
  },
  'phases': [
    {'time': 'August 23, 1942', 'title': 'The Germans reach the Volga',
     'text': 'German tanks cross the last forty miles from the Don in a single day and reach the Volga just north of Stalingrad. That afternoon and night, bombers set the city on fire, killing thousands of civilians. A second German army closes in from the south. Two Soviet armies fall back into the city with the river at their backs.',
     'units': {'a6': [[48.95, 44.45], [48.75, 44.25]], 'pz4': [[48.46, 44.22], [48.30, 44.42]], 'r62': [[48.86, 44.53], [48.68, 44.42]], 'r64': [[48.60, 44.42], [48.45, 44.55]]},
     'arrows': [{'side': 'axis', 'pts': [[49.02, 43.95], [48.88, 44.56]]}, {'side': 'axis', 'pts': [[48.10, 44.05], [48.42, 44.32]]}]},
    {'time': 'September 13 to November 18', 'title': 'The fight for the city',
     'text': 'For two months the Sixth Army fights its way into Stalingrad, one factory and one cellar at a time. Chuikov\'s 62nd Army is pushed into a few strips along the river bank and kept alive by boats crossing at night. To feed the battle, the Germans thin out their flanks and leave long stretches to Romanian armies with few tanks or anti-tank guns. Beyond the Don and south of the city, the Red Army quietly gathers a million men.',
     'units': {'a6': [[48.84, 44.58], [48.76, 44.53], [48.70, 44.49]], 'r62': [[48.80, 44.62], [48.71, 44.535]], 'pz4': [[48.66, 44.47], [48.50, 44.52]], 'r64': [[48.60, 44.46], [48.50, 44.56]],
               'ro3': [[49.50, 42.20], [49.40, 42.75], [49.25, 43.15]], 'ro4': [[48.25, 44.55], [48.00, 44.65], [47.75, 44.75]],
               'swf': [[49.68, 42.30], [49.58, 42.80], [49.42, 43.20]], 'donf': [[49.22, 43.55], [49.10, 44.10], [49.00, 44.60]], 'stf': [[48.35, 44.72], [48.05, 44.85], [47.80, 44.95]]}},
    {'time': 'November 19', 'title': 'Operation Uranus: the northern blow',
     'text': 'In fog and snow, 3,500 Soviet guns open fire on the Romanian Third Army. Tanks pour out of the bridgeheads at Serafimovich and Kletskaya and by evening are loose in the open country behind the Germans, heading south for the Don crossing at Kalach.',
     'units': {'swf': [[49.30, 42.30], [49.05, 42.90], [48.98, 43.40]], 'ro3': None, 'donf': [[49.15, 43.60], [49.05, 44.10], [48.98, 44.58]]},
     'arrows': [{'side': 'allied', 'pts': [[49.52, 42.85], [48.88, 43.42]]}]},
    {'time': 'November 20', 'title': 'The southern blow',
     'text': 'A day later the second arm of the pincer strikes the Romanian Fourth Army among the salt lakes south of the city. It breaks through within hours and turns northwest, toward the same river crossing.',
     'units': {'stf': [[48.42, 44.35], [48.20, 44.15], [47.90, 44.20]], 'ro4': None},
     'arrows': [{'side': 'allied', 'pts': [[48.12, 44.78], [48.60, 43.78]]}]},
    {'time': 'November 23', 'title': 'The trap closes at Kalach',
     'text': 'The two Soviet spearheads meet near Kalach, forty-five miles west of Stalingrad. About 250,000 German and Romanian soldiers are surrounded in a pocket some thirty-five miles across. Paulus asks to break out. Hitler orders him to stand fast and promises to supply the army by air, which the air force cannot do.',
     'units': {'swf': [[48.75, 42.85], [48.72, 43.25], [48.68, 43.58]], 'stf': [[48.62, 43.68], [48.50, 43.95], [48.45, 44.30]], 'donf': [[49.05, 43.75], [49.00, 44.10], [48.98, 44.55]],
               'a6': [[48.93, 44.58], [48.93, 44.05], [48.76, 43.80], [48.58, 43.98], [48.55, 44.40], [48.60, 44.50]], 'pz4': [[47.75, 43.00], [47.60, 43.30]]}},
    {'time': 'December 12 to 23', 'title': 'The rescue attempt fails',
     'text': 'Hoth\'s tanks attack from Kotelnikovo to cut a corridor to the trapped army. In a week they fight their way to within thirty miles. There a fresh Soviet army stops them on a small river, and Paulus, short of fuel and bound by Hitler\'s order, does not move. A new Soviet offensive far to the west then threatens to cut off Hoth as well, and he pulls back.',
     'units': {'pz4': [[48.20, 43.75], [48.12, 44.05]], 'g2': [[48.30, 43.70], [48.24, 44.10]], 'swf': [[48.90, 42.50], [48.60, 42.90], [48.42, 43.15]],
               'a6': [[48.92, 44.58], [48.91, 44.08], [48.76, 43.88], [48.60, 44.02], [48.57, 44.40], [48.61, 44.50]]},
     'arrows': [{'side': 'axis', 'pts': [[47.68, 43.22], [48.14, 43.88]]}]},
    {'time': 'January 10 to February 2, 1943', 'title': 'The end of the Sixth Army',
     'text': 'The Don Front attacks the pocket from the west and takes the airfields, ending the airlift. Starving and frozen, the survivors are squeezed back into the ruins they had fought for all autumn. Paulus surrenders on January 31 and the last holdouts on February 2. About 91,000 men march into captivity.',
     'units': {'a6': [[48.83, 44.60], [48.80, 44.48], [48.70, 44.45], [48.67, 44.50]], 'donf': [[48.64, 44.42], [48.76, 44.38], [48.87, 44.50]], 'pz4': None, 'g2': None, 'stf': None},
     'arrows': [{'side': 'allied', 'pts': [[48.76, 43.85], [48.76, 44.34]]}]}
  ],
  'ask': ['Find the two Romanian armies. Why did the Soviet commanders attack there and not at the city itself?',
          'The pincers met at a river crossing behind the German army. What does losing that crossing mean for an army\'s food, fuel, and ammunition?',
          'The rescue force got within thirty miles. What were the risks of ordering the trapped army to break out, and of ordering it to stay?']
}

bulge = {
  'base': 'topo',
  'bounds': [[49.60, 4.75], [50.72, 6.62]],
  'note': 'Positions are simplified from standard maps of the battle. Each bar is a division, a corps, or an army, drawn where its front stood.',
  'places': [
    {'name': 'Bastogne', 'll': [50.00, 5.72]}, {'name': 'St. Vith', 'll': [50.28, 6.13]}, {'name': 'Malmedy', 'll': [50.43, 6.03]}, {'name': 'Elsenborn Ridge', 'll': [50.48, 6.20]},
    {'name': 'La Gleize', 'll': [50.41, 5.85]}, {'name': 'Celles', 'll': [50.23, 5.01]}, {'name': 'Dinant', 'll': [50.26, 4.91]}, {'name': 'Houffalize', 'll': [50.13, 5.79]},
    {'name': 'Liège', 'll': [50.64, 5.57]}, {'name': 'Echternach', 'll': [49.81, 6.42]}, {'name': 'Meuse River', 'll': [50.42, 4.83]}
  ],
  'units': {
    'u99': {'side': 'allied', 'name': 'U.S. 99th and 2nd Infantry Divisions', 'short': '99th and 2nd'},
    'u106': {'side': 'allied', 'name': 'U.S. 106th Infantry Division', 'short': '106th'},
    'u28': {'side': 'allied', 'name': 'U.S. 28th Infantry Division', 'short': '28th'},
    'u4': {'side': 'allied', 'name': 'U.S. 4th Infantry Division', 'short': '4th'},
    'a7': {'side': 'allied', 'name': 'U.S. 7th Armored Division', 'short': '7th Armored'},
    'a101': {'side': 'allied', 'name': 'U.S. 101st Airborne Division', 'short': '101st Airborne'},
    'vii': {'side': 'allied', 'name': 'U.S. VII Corps (Collins)', 'short': 'VII Corps'},
    'pat': {'side': 'allied', 'name': 'U.S. Third Army (Patton)', 'short': 'Third Army'},
    'g6': {'side': 'axis', 'name': 'Sixth Panzer Army (Dietrich)', 'short': '6th Panzer Army'},
    'g5': {'side': 'axis', 'name': 'Fifth Panzer Army (Manteuffel)', 'short': '5th Panzer Army'},
    'g7': {'side': 'axis', 'name': 'Seventh Army (Brandenberger)', 'short': '7th Army'}
  },
  'phases': [
    {'time': 'December 16, 1944, 5:30 a.m.', 'title': 'The attack in the fog',
     'text': 'The Ardennes is a quiet sector. Four American divisions, some worn out and some brand new, hold eighty miles of forest. Before dawn, in fog that grounds every Allied aircraft, three German armies hit them. The plan is to cross the Meuse River and drive on to the port of Antwerp, splitting the Allied armies in two.',
     'units': {'u99': [[50.54, 6.26], [50.40, 6.33]], 'u106': [[50.33, 6.36], [50.18, 6.30]], 'u28': [[50.15, 6.16], [49.93, 6.20]], 'u4': [[49.90, 6.25], [49.80, 6.45]],
               'g6': [[50.55, 6.40], [50.38, 6.45]], 'g5': [[50.33, 6.47], [50.18, 6.42], [50.02, 6.28]], 'g7': [[49.98, 6.30], [49.80, 6.52]]}},
    {'time': 'December 17 to 19', 'title': 'The shoulders hold, the center breaks',
     'text': 'In the north the Americans fall back to Elsenborn Ridge and stop the strongest German army cold. One armored column slips past them, and near Malmedy its men shoot 84 American prisoners. In the center the line gives way: about 7,000 men of the 106th Division are surrounded and surrender. Reinforcements race for the two road junctions the Germans need, the 7th Armored Division to St. Vith and the 101st Airborne to Bastogne.',
     'units': {'u99': [[50.52, 6.22], [50.44, 6.16]], 'u106': None, 'a7': [[50.31, 6.17], [50.25, 6.17]], 'u28': [[50.08, 5.95], [49.95, 5.92]], 'a101': [[50.04, 5.72], [50.00, 5.78], [49.97, 5.72]],
               'u4': [[49.86, 6.25], [49.76, 6.42]], 'g6': [[50.50, 6.30], [50.40, 6.00], [50.40, 5.87]], 'g5': [[50.30, 6.22], [50.15, 5.95], [50.02, 5.85]], 'g7': [[49.95, 6.05], [49.85, 6.30], [49.80, 6.45]]},
     'arrows': [{'side': 'axis', 'pts': [[50.38, 6.38], [50.39, 5.92]]}]},
    {'time': 'December 20 to 22', 'title': 'Bastogne surrounded',
     'text': 'German tanks flow around Bastogne and cut it off. Asked to surrender, the American commander, Brig. Gen. Anthony McAuliffe, sends a one-word reply: "Nuts!" St. Vith holds for six days before its defenders pull back, which wrecks the German timetable. In the north the armored column that broke through is trapped at La Gleize and out of fuel. To the south, Patton turns three divisions ninety degrees and starts them north through the snow.',
     'units': {'a7': [[50.33, 5.86], [50.27, 5.86]], 'u28': None, 'g6': [[50.50, 6.28], [50.40, 6.05], [50.36, 5.90]], 'g5': [[50.28, 5.70], [50.15, 5.40], [49.98, 5.55]],
               'vii': [[50.40, 5.15], [50.32, 5.45]], 'pat': [[49.72, 5.50], [49.72, 5.85], [49.72, 6.15]]},
     'arrows': [{'side': 'axis', 'pts': [[50.10, 5.90], [50.16, 5.45]]}]},
    {'time': 'December 23 to 26', 'title': 'The skies clear',
     'text': 'On December 23 the weather breaks. Allied fighter-bombers swarm over the German columns, and transports drop supplies into Bastogne. The leading German tanks reach Celles, four miles from the Meuse, with empty fuel tanks, and are destroyed there on Christmas Day. On December 26, Patton\'s tanks break through to Bastogne.',
     'units': {'g5': [[50.30, 5.65], [50.23, 5.03], [50.12, 5.25], [50.00, 5.55]], 'vii': [[50.30, 5.03], [50.28, 5.30]], 'pat': [[49.90, 5.55], [49.975, 5.72], [49.90, 6.05]], 'g7': [[49.93, 5.95], [49.85, 6.28], [49.80, 6.45]]},
     'arrows': [{'side': 'allied', 'pts': [[49.76, 5.66], [49.96, 5.71]]}]},
    {'time': 'January 3 to 16, 1945', 'title': 'Squeezing out the bulge',
     'text': 'The Americans attack the bulge from both sides, the First Army from the north and the Third Army from the south, through deep snow and the coldest weather of the winter. On January 16 the two armies meet at Houffalize. Most of the Germans have already slipped out, but they have left behind tanks and guns they cannot replace.',
     'units': {'g6': [[50.45, 6.15], [50.33, 6.00]], 'g5': [[50.25, 5.95], [50.13, 5.86], [50.02, 5.95]], 'g7': [[49.98, 6.00], [49.88, 6.25], [49.80, 6.45]],
               'vii': [[50.26, 5.70], [50.16, 5.78]], 'pat': [[50.10, 5.77], [50.00, 5.88], [49.90, 6.15]], 'a7': [[50.36, 6.00], [50.30, 5.98]], 'a101': [[50.08, 5.80], [50.04, 5.84], [50.00, 5.82]]},
     'arrows': [{'side': 'allied', 'pts': [[50.30, 5.62], [50.15, 5.78]]}, {'side': 'allied', 'pts': [[49.98, 5.72], [50.11, 5.78]]}]},
    {'time': 'January 25', 'title': 'Back where it began',
     'text': 'Six weeks after the attack, the front is back on the line of December 16. The battle cost the Americans about 90,000 casualties, more than any other they fought in the war. Germany lost about as many men, along with the last reserves it had for defending the Rhine.',
     'units': {'g6': [[50.55, 6.40], [50.38, 6.45]], 'g5': [[50.33, 6.47], [50.18, 6.42], [50.02, 6.28]], 'g7': [[49.98, 6.30], [49.80, 6.52]], 'u99': [[50.54, 6.26], [50.40, 6.33]],
               'a7': [[50.33, 6.36], [50.22, 6.30]], 'vii': None, 'a101': None, 'pat': [[50.15, 6.16], [49.98, 6.18], [49.90, 6.25]], 'u4': [[49.88, 6.27], [49.80, 6.45]]}}
  ],
  'ask': ['Find St. Vith and Bastogne. Why do road junctions matter so much in hilly, forested country in winter?',
          'The bulge grew long but stayed narrow. How did holding the "shoulders" at Elsenborn Ridge and Echternach limit the attack?',
          'The weather cleared on December 23. Why did that matter far more to one side than the other?']
}

vicksburg = {
  'base': 'topo',
  'bounds': [[31.86, -91.32], [32.58, -90.05]],
  'note': 'This view covers the whole campaign that ended in the siege. Positions are simplified from standard maps; each bar is an army corps or a Confederate force, drawn roughly where it stood.',
  'places': [
    {'name': 'Vicksburg', 'll': [32.352, -90.878]}, {'name': 'Grand Gulf', 'll': [32.03, -91.05]}, {'name': 'Bruinsburg', 'll': [31.94, -91.16]}, {'name': 'Port Gibson', 'll': [31.961, -90.984]},
    {'name': 'Raymond', 'll': [32.259, -90.423]}, {'name': 'Jackson', 'll': [32.299, -90.185]}, {'name': 'Champion Hill', 'll': [32.33, -90.53]}, {'name': 'Big Black River', 'll': [32.345, -90.70]},
    {'name': 'Yazoo bluffs', 'll': [32.49, -90.80]}
  ],
  'units': {
    'mcc': {'side': 'union', 'name': 'XIII Corps (McClernand)', 'short': 'McClernand'},
    'mcp': {'side': 'union', 'name': 'XVII Corps (McPherson)', 'short': 'McPherson'},
    'she': {'side': 'union', 'name': 'XV Corps (Sherman)', 'short': 'Sherman'},
    'bow': {'side': 'confederate', 'name': 'Bowen\'s division', 'short': 'Bowen'},
    'pem': {'side': 'confederate', 'name': 'Pemberton\'s field army', 'short': 'Pemberton'},
    'joh': {'side': 'confederate', 'name': 'Confederates at Jackson (Gregg, then Johnston)', 'short': 'Johnston'},
    'gar': {'side': 'confederate', 'name': 'Vicksburg defenses', 'short': 'Vicksburg defenses'}
  },
  'phases': [
    {'time': 'April 30, 1863', 'title': 'Across the Mississippi',
     'text': 'Vicksburg\'s guns, on bluffs 200 feet above the river, cannot be attacked from the water, and the swamps to the north have beaten every approach. So Grant marches down the Louisiana side, the gunboats and transports run past the guns at night, and on April 30 they ferry his army across at Bruinsburg, far below the city. Upriver, Sherman makes a noisy false attack on the Yazoo bluffs to hold the defenders\' attention.',
     'units': {'mcc': [[31.96, -91.14], [31.93, -91.12]], 'mcp': [[32.02, -91.20], [31.98, -91.19]], 'she': [[32.50, -90.86], [32.47, -90.84]],
               'bow': [[32.04, -91.03], [31.97, -91.00]], 'gar': [[32.376, -90.886], [32.372, -90.845], [32.345, -90.843], [32.312, -90.893]]},
     'arrows': [{'side': 'union', 'pts': [[31.99, -91.22], [31.945, -91.15]]}]},
    {'time': 'May 1', 'title': 'Port Gibson',
     'text': 'Grant pushes inland at once and beats Bowen\'s outnumbered division in the ravines west of Port Gibson. The Confederates abandon Grand Gulf, which becomes Grant\'s landing place, and fall back behind the Big Black River. Sherman\'s corps starts south to join the army.',
     'units': {'mcc': [[32.00, -90.97], [31.94, -90.96]], 'mcp': [[32.03, -90.93], [31.98, -90.92]], 'bow': [[32.20, -90.85], [32.15, -90.80]], 'she': [[32.05, -91.14], [32.02, -91.12]]}},
    {'time': 'May 12', 'title': 'Turning inland: Raymond',
     'text': 'Everyone expects Grant to march north on Vicksburg. He heads northeast instead, to get between Pemberton and the Confederate force gathering at Jackson. His men carry ammunition in wagons and take their food from the farms they pass. At Raymond, McPherson\'s corps drives off a Confederate brigade.',
     'units': {'mcp': [[32.27, -90.44], [32.23, -90.43]], 'mcc': [[32.25, -90.68], [32.18, -90.62]], 'she': [[32.22, -90.55], [32.17, -90.52]],
               'bow': None, 'pem': [[32.36, -90.62], [32.30, -90.60]], 'joh': [[32.31, -90.22], [32.27, -90.21]]},
     'arrows': [{'side': 'union', 'pts': [[32.05, -90.90], [32.23, -90.47]]}]},
    {'time': 'May 14', 'title': 'Jackson',
     'text': 'Two Union corps take the state capital in a rainstorm. General Joseph E. Johnston, who arrived the night before to take command, retreats to the north. Sherman\'s men wreck the railroads and factories so that Jackson cannot supply or reinforce Vicksburg.',
     'units': {'mcp': [[32.33, -90.22], [32.31, -90.20]], 'she': [[32.29, -90.21], [32.27, -90.19]], 'mcc': [[32.30, -90.48], [32.24, -90.45]], 'joh': [[32.50, -90.13], [32.47, -90.10]], 'pem': [[32.33, -90.58], [32.27, -90.57]]}},
    {'time': 'May 16', 'title': 'Champion Hill',
     'text': 'Grant turns west. Pemberton, ordered by Johnston to join him and by President Davis to hold Vicksburg, is caught on the march at Champion Hill. The hill changes hands three times before the Confederate line breaks. It is the battle that decides the campaign.',
     'units': {'mcp': [[32.345, -90.52], [32.335, -90.50]], 'mcc': [[32.31, -90.50], [32.28, -90.49]], 'she': [[32.31, -90.31], [32.30, -90.28]], 'pem': [[32.34, -90.55], [32.29, -90.56]]}},
    {'time': 'May 17 to 18', 'title': 'The Big Black River and the bluffs',
     'text': 'Pemberton\'s rear guard is routed at the Big Black River bridge and his army retreats into the Vicksburg defenses. Sherman swings north and takes the bluffs on the Yazoo River. Steamboats can now bring Grant food and ammunition straight from the north, and his army no longer has to live off the country.',
     'units': {'mcc': [[32.36, -90.74], [32.33, -90.73]], 'mcp': [[32.38, -90.72], [32.36, -90.70]], 'she': [[32.44, -90.80], [32.42, -90.78]], 'pem': None}},
    {'time': 'May 19 to 22', 'title': 'Two assaults fail',
     'text': 'Grant hopes to take the city before its defenders recover. On May 19 and again on May 22 his men charge the forts and are thrown back with more than 4,000 casualties. He decides to dig.',
     'units': {'she': [[32.388, -90.882], [32.382, -90.842]], 'mcp': [[32.376, -90.832], [32.352, -90.828]], 'mcc': [[32.346, -90.832], [32.318, -90.862]]}},
    {'time': 'May 23 to July 4', 'title': 'Siege and surrender',
     'text': 'For six weeks the Union lines creep closer while gunboats shell the city from the river. Reinforcements raise Grant\'s army to more than 70,000. Johnston gathers a relief force to the east but never attacks. Soldiers and civilians inside are reduced to eating mules. On July 4, Pemberton surrenders about 29,500 men.',
     'units': {'she': [[32.384, -90.884], [32.378, -90.846]], 'mcp': [[32.373, -90.837], [32.352, -90.834]], 'mcc': [[32.345, -90.837], [32.316, -90.870]]}}
  ],
  'ask': ['Grant marched away from Vicksburg, toward Jackson, before turning back. What did taking Jackson first do for him?',
          'Follow the Big Black River. Why was it Pemberton\'s last chance to stop Grant in open country?',
          'Why did Sherman care so much about reaching the bluffs on the Yazoo River, north of the city?']
}

insert(ROOT + '/data/world-war-2-europe.js', 'stalingrad', stalingrad)
insert(ROOT + '/data/world-war-2-europe.js', 'bulge', bulge)
insert(ROOT + '/data/civil-war.js', 'vicksburg', vicksburg)
