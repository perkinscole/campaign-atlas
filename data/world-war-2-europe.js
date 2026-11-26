/* ------------------------------------------------------------------
   Campaign Atlas — data pack: World War II in Europe and North Africa,
   1939–1945
   Quotations come from government records: parliamentary debates
   (Hansard), official orders and reports, U.S. government publications,
   Yank (the U.S. Army weekly), and documents and testimony from the
   Nuremberg trials. Each was copied from the linked text and carries
   `verified: true` with a `ref` to that text.
   Images are public-domain official photographs on Wikimedia Commons.
   ------------------------------------------------------------------ */

(function () {
  const img = Atlas.img;
  const IA = (id, q) => 'https://archive.org/details/' + id + (q ? '?q=' + encodeURIComponent('"' + q + '"') : '');
  const HANSARD = 'https://api.parliament.uk/historic-hansard/commons/';
  const NCA = 'Nazi Conspiracy and Aggression (U.S. Government Printing Office, 1946)';
  const STALIN_SPEECHES = 'J. V. Stalin, War Speeches and Orders of the Day (1946)';

  const PORTRAITS = {
    fdr: img('Franklin D. Roosevelt - NARA - 196898.jpg', 'Franklin D. Roosevelt', 'U.S. National Archives'),
    churchill: img('Sir Winston Churchill - 19086236948.jpg', 'Winston Churchill', 'Yousuf Karsh, 1941. Library and Archives Canada'),
    eisenhower: img('Dwight D. Eisenhower as General of the Army crop.jpg', 'Dwight D. Eisenhower', 'U.S. Army'),
    truman: img('Harry S Truman, bw half-length photo portrait, facing front, 1945-crop.jpg', 'Harry S. Truman', 'Library of Congress, 1945'),
    patton: img('Portrait of General George Patton.jpg', 'George S. Patton', 'U.S. Army'),
    montgomery: img('General Sir Bernard Montgomery in England, 1943 TR1036 (cropped).jpg', 'Bernard Montgomery', 'British official photograph, 1943. Imperial War Museums'),
    chamberlain: img('Chamberlain Neville (cropped).jpg', 'Neville Chamberlain', 'Public domain'),
    stalin: img('Joseph Stalin Cropped 1943 (3x4 cropped).jpg', 'Joseph Stalin', 'U.S. Army Signal Corps, Tehran, 1943'),
    alexander: img('The Commander in Chief, Allied Armies in Italy, General Sir Harold Alexander, in Caserta, Italy, 4 May 1944 TR1775.jpg', 'Harold Alexander', 'British official photograph, 1944. Imperial War Museums')
  };

  const BATTLES = [
    {
      id: 'poland',
      name: 'Invasion of Poland',
      start: '1939-09-01', end: '1939-10-06',
      lat: 52.23, lng: 21.01,
      place: 'Poland',
      theater: 'Eastern Front',
      result: 'axis',
      campaign: 'poland',
      sideLabels: { allied: 'Poland', axis: 'Germany' },
      commanders: { allied: 'Marshal Edward Rydz-Śmigły', axis: 'Gen. Walther von Brauchitsch, Gen. Gerd von Rundstedt, Gen. Fedor von Bock' },
      forces: { allied: 'about 1 million', axis: 'about 1.5 million, with 2,500 tanks and 2,000 aircraft' },
      casualties: { allied: 200000, axis: 50000, kind: '(killed and wounded)', note: 'Nearly 700,000 more Polish soldiers were captured by Germany, and hundreds of thousands by the Soviet Union.' },
      summary: 'A week after signing a pact with the Soviet Union that secretly divided Poland between them, Germany attacked on September 1 from the north, west, and south. Fast-moving tank columns and dive bombers broke through the Polish armies in days, a style of war soon called blitzkrieg. Britain and France declared war on September 3 but sent no help. The Soviet Union invaded from the east on September 17. Warsaw, bombed and besieged, surrendered on September 28.',
      significance: 'The start of World War II in Europe. Poland was divided between Germany and the Soviet Union and would lose about six million citizens, half of them Jews, before the war ended.',
      images: [
        img('German troops parade through Warsaw, Poland, 09-1939 - NARA - 559369.jpg', 'German troops parade through Warsaw after the city\'s surrender.', 'German photograph, 1939. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'This is a sad day for all of us, and to none is it sadder than to me. Everything that I have worked for, everything that I have hoped for, everything that I have believed in during my public life, has crashed into ruins.',
          who: 'Neville Chamberlain', role: 'British prime minister, telling the House of Commons that Britain was at war', side: 'allied',
          date: 'September 3, 1939', source: 'Hansard, House of Commons', portrait: 'chamberlain',
          verified: true, ref: HANSARD + '1939/sep/03/prime-ministers-announcement', refTitle: 'Hansard, House of Commons, 3 September 1939'
        },
        {
          quote: 'This Nation will remain a neutral nation, but I cannot ask that every American remain neutral in thought as well. Even a neutral has a right to take account of facts. Even a neutral cannot be asked to close his mind or his conscience.',
          who: 'President Franklin D. Roosevelt', role: 'Radio address to the American people', side: 'allied',
          date: 'September 3, 1939', source: 'Fireside chat, printed in the Department of State Bulletin', portrait: 'fdr',
          verified: true, ref: IA('sim_department-of-state-bulletin_1939-09-09_1_11', 'remain neutral in thought'), refTitle: 'Department of State Bulletin, September 9, 1939'
        }
      ]
    },
    {
      id: 'dunkirk',
      name: 'Dunkirk and the Fall of France',
      start: '1940-05-10', end: '1940-06-22',
      lat: 51.03, lng: 2.38,
      place: 'Dunkirk, France',
      theater: 'Western Europe',
      result: 'axis',
      campaign: 'sickle-cut',
      commanders: { allied: 'Gen. Maurice Gamelin, Gen. Maxime Weygand, Gen. Lord Gort, Vice Adm. Bertram Ramsay', axis: 'Gen. Gerd von Rundstedt, Gen. Ewald von Kleist, Gen. Heinz Guderian' },
      forces: { allied: 'about 3.3 million French, British, Belgian, and Dutch troops', axis: 'about 3.3 million' },
      casualties: { allied: 360000, axis: 157000, kind: '(killed and wounded)', note: 'Nearly two million French soldiers became prisoners. From Dunkirk, 338,226 Allied troops were carried to England.' },
      summary: 'On May 10 Germany attacked the Netherlands and Belgium, drawing the best Allied armies north. The main blow came through the wooded Ardennes, which the French thought tanks could not cross. German armor broke through at Sedan and reached the English Channel in ten days, trapping the British army and many French troops against the sea. A halt order held the tanks back for three days, and nearly 900 ships, from destroyers to fishing boats, lifted the trapped armies off the beaches at Dunkirk. Paris fell on June 14, and France signed an armistice on June 22.',
      significance: 'France, thought to have the strongest army in Europe, was beaten in six weeks. Britain fought on alone, with its army saved but its equipment left behind.',
      images: [
        img('Dunkirk 26-29 May 1940 NYP68075.jpg', 'British troops wait on the beach at Dunkirk, May 1940.', 'British official photograph. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'We must be very careful not to assign to this deliverance the attributes of a victory. Wars are not won by evacuations.',
          who: 'Winston Churchill', role: 'British prime minister, reporting to the House of Commons on Dunkirk', side: 'allied',
          date: 'June 4, 1940', source: 'Hansard, House of Commons', portrait: 'churchill',
          verified: true, ref: HANSARD + '1940/jun/04/war-situation', refTitle: 'Hansard, House of Commons, 4 June 1940'
        },
        {
          quote: 'We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields and in the streets, we shall fight in the hills; we shall never surrender.',
          who: 'Winston Churchill', role: 'The close of the same speech', side: 'allied',
          date: 'June 4, 1940', source: 'Hansard, House of Commons', portrait: 'churchill',
          verified: true, ref: HANSARD + '1940/jun/04/war-situation', refTitle: 'Hansard, House of Commons, 4 June 1940'
        },
        {
          quote: 'The left wing … which has no enemy before it, will so be stopped dead in its tracks upon direct orders of the Fuehrer! Finishing off the encircled enemy army is to be left to Air Force!',
          who: 'Gen. Franz Halder', role: 'Chief of the German Army General Staff, on the order that halted the tanks outside Dunkirk', side: 'axis',
          date: 'May 24, 1940', source: 'War journal, translated by the U.S. Army after the war',
          verified: true, ref: IA('HalderWarJournal', 'stopped dead in its tracks'), refTitle: 'The Halder War Journal, U.S. Army translation (1947)'
        }
      ]
    },
    {
      id: 'battle-of-britain',
      name: 'Battle of Britain',
      start: '1940-07-10', end: '1940-10-31',
      lat: 51.28, lng: 0.52,
      place: 'Southern England',
      theater: 'Western Europe',
      result: 'allied',
      sideLabels: { allied: 'Royal Air Force', axis: 'Luftwaffe' },
      commanders: { allied: 'Air Chief Marshal Hugh Dowding, Air Vice-Marshal Keith Park', axis: 'Reichsmarschall Hermann Göring, Field Marshal Albert Kesselring' },
      forces: { allied: 'about 1,960 aircraft', axis: 'about 2,550 aircraft' },
      casualties: { allied: 1540, axis: 2600, heading: 'Aircrew killed', kind: '', note: 'About 23,000 British civilians were killed by bombing before the end of 1940.' },
      summary: 'To invade Britain, Germany first had to control the air over the English Channel. Through the summer the Luftwaffe attacked convoys, radar stations, and then the fighter airfields themselves. Radar and a system of ground control let a smaller force of Spitfires and Hurricanes meet each raid. In September the Germans switched to bombing London, which gave the airfields time to recover. After heavy losses on September 15, Hitler postponed the invasion.',
      significance: 'Germany\'s first defeat. Britain stayed in the war and became the base from which western Europe was later invaded.',
      images: [
        img('Heinkel He 111 over Wapping, East London.jpg', 'A German bomber over the London docks, September 7, 1940.', 'German Air Force photograph. Imperial War Museums.'),
        img('Pilots of No. 19 Squadron RAF stage a mock \'scramble\' from the back of a truck at Fowlmere near Duxford, September 1940. CH1398.jpg', 'RAF fighter pilots stage a "scramble" for the camera, September 1940.', 'British official photograph. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'The gratitude of every home in our Island, in our Empire, and indeed throughout the world, except in the abodes of the guilty, goes out to the British airmen who, undaunted by odds, unwearied in their constant challenge and mortal danger, are turning the tide of world war by their prowess and by their devotion. Never in the field of human conflict was so much owed by so many to so few.',
          who: 'Winston Churchill', role: 'British prime minister, in the House of Commons', side: 'allied',
          date: 'August 20, 1940', source: 'Hansard, House of Commons', portrait: 'churchill',
          verified: true, ref: HANSARD + '1940/aug/20/war-situation', refTitle: 'Hansard, House of Commons, 20 August 1940'
        }
      ]
    },
    {
      id: 'moscow',
      name: 'Barbarossa and the Battle of Moscow',
      start: '1941-06-22', end: '1942-01-07',
      lat: 55.75, lng: 37.62,
      place: 'Moscow, Soviet Union',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'barbarossa-center',
      sideLabels: { allied: 'Soviet Union', axis: 'Germany and its allies' },
      commanders: { allied: 'Gen. Georgy Zhukov, Marshal Semyon Timoshenko', axis: 'Field Marshal Fedor von Bock, Gen. Heinz Guderian' },
      forces: { allied: 'about 1.25 million at Moscow', axis: 'about 3 million in the invasion; 1.9 million at Moscow' },
      casualties: { allied: 650000, axis: 250000, note: 'Estimates for the fighting around Moscow, October to January. Soviet losses for all of 1941 passed four million, most of them prisoners, of whom the majority died in German captivity.' },
      summary: 'On June 22, 1941, Germany broke its pact with Stalin and invaded the Soviet Union with three million men on a front 1,800 miles long. Whole Soviet armies were surrounded at Minsk, Smolensk, and Kiev. By early December German patrols could see the towers of Moscow. But autumn mud, then a winter of forty below zero, stalled an army that had no winter clothing, and on December 5 fresh Soviet divisions from Siberia counterattacked and drove it back as much as 150 miles.',
      significance: 'The end of blitzkrieg. Germany was now locked in a long war against a country with far more people and factories, and four days later it declared war on the United States as well.',
      images: [
        img('German troops in Russia, 1941 - NARA - 540155.jpg', 'German troops in the Soviet Union, 1941.', 'German photograph. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'The German Armed Forces must be prepared to crush Soviet Russia in a quick campaign before the end of the war against England.',
          who: 'Adolf Hitler', role: 'Directive No. 21, "Case Barbarossa," issued in nine copies to his commanders', side: 'axis',
          date: 'December 18, 1940', source: 'Nuremberg trial document 446-PS',
          verified: true, ref: IA('NaziConspiracyAndAggression', 'crush Soviet Russia in a quick campaign'), refTitle: NCA
        },
        {
          quote: 'Comrades! Citizens! Brothers and sisters! Men of our Army and Navy! I am addressing you, my friends! The perfidious military attack on our fatherland begun on June 22 by Hitler Germany is continuing.',
          who: 'Joseph Stalin', role: 'Soviet leader, in his first radio address after the invasion', side: 'allied',
          date: 'July 3, 1941', source: 'Radio address, English text published by the Soviet government in 1941', portrait: 'stalin',
          verified: true, ref: IA('TheGermanAttackOnTheU.S.S.R.', 'Brothers and sisters'), refTitle: 'The German Attack on the U.S.S.R. (1941)'
        },
        {
          quote: 'The Air Force has greatly underestimated the numerical strength of the enemy. It is quite evident that the Russians initially had far more than 8,000 planes.',
          who: 'Gen. Franz Halder', role: 'Chief of the German Army General Staff', side: 'axis',
          date: 'Early July 1941', source: 'War journal, translated by the U.S. Army after the war',
          verified: true, ref: IA('HalderWarJournal', 'greatly underestimated the numerical strength'), refTitle: 'The Halder War Journal, U.S. Army translation (1947)'
        }
      ]
    },
    {
      id: 'leningrad',
      name: 'Siege of Leningrad',
      start: '1941-09-08', end: '1944-01-27',
      lat: 59.94, lng: 30.31,
      place: 'Leningrad (now St. Petersburg), Soviet Union',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'barbarossa-north',
      sideLabels: { allied: 'Soviet Union', axis: 'Germany and Finland' },
      commanders: { allied: 'Gen. Georgy Zhukov, Gen. Leonid Govorov, Andrei Zhdanov', axis: 'Field Marshal Wilhelm von Leeb, Field Marshal Georg von Küchler' },
      forces: { allied: 'about 930,000 troops; some 2.5 million civilians trapped', axis: 'about 725,000' },
      casualties: { allied: 800000, axis: 0, heading: 'Civilian deaths', kind: '(starvation, cold, and shelling)', note: 'At least 800,000 civilians died, most in the first winter. Military losses on both sides add several hundred thousand more.' },
      summary: 'German and Finnish armies cut the last land route into the Soviet Union\'s second city in September 1941. Hitler chose not to storm it but to starve it. In the winter of 1941–42 the daily bread ration fell to 125 grams, about four slices, and people died in the streets and in their beds. The only supply line was a truck road across the ice of Lake Ladoga, the "Road of Life." The city never surrendered. The blockade was broken in January 1943 and lifted after 872 days.',
      significance: 'The deadliest siege in history, and a deliberate attempt to destroy a city\'s people by hunger.',
      images: [
        img('Tanya Savicheva Diary.jpg', 'Pages from the diary of Tanya Savicheva, age eleven, recording the deaths of her family one by one.', 'Museum of the History of St. Petersburg. Public domain.')
      ],
      journal: [
        {
          quote: 'The area around Leningrad is wanted by the Finns; the Fuehrer will raze Leningrad to the ground and then hand it over to the Finns.',
          who: 'Martin Bormann', role: 'Hitler\'s secretary, recording a conference at Hitler\'s headquarters', side: 'axis',
          date: 'July 16, 1941', source: 'Nuremberg trial document L-221',
          verified: true, ref: IA('NaziConspiracyAndAggression', 'raze Leningrad to the ground'), refTitle: NCA
        },
        {
          quote: 'All are dead. Only Tanya is left.',
          who: 'Tanya Savicheva', role: 'Leningrad schoolgirl, age eleven; the last lines of her diary. She was evacuated but died in 1944.', side: 'civilian',
          date: 'May 1942', source: 'Her diary, as read by President Nixon in a broadcast to the Soviet people, May 28, 1972',
          verified: true, ref: IA('sim_weekly-compilation-of-presidential-documents_1972-06-05_8_23', 'Only Tanya is left'), refTitle: 'Weekly Compilation of Presidential Documents, June 5, 1972'
        }
      ]
    },
    {
      id: 'stalingrad',
      name: 'Stalingrad',
      start: '1942-08-23', end: '1943-02-02',
      lat: 48.71, lng: 44.51,
      place: 'Stalingrad (now Volgograd), Soviet Union',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'case-blue',
      sideLabels: { allied: 'Soviet Union', axis: 'Germany and its allies' },
      commanders: { allied: 'Gen. Vasily Chuikov, Gen. Andrei Yeremenko, Gen. Georgy Zhukov', axis: 'Gen. Friedrich Paulus, Field Marshal Erich von Manstein' },
      forces: { allied: 'more than 1.1 million by November', axis: 'about 1 million German, Romanian, Italian, and Hungarian troops' },
      casualties: { allied: 1130000, axis: 800000, note: 'Estimates. About 91,000 survivors of the German Sixth Army surrendered; only about 5,000 ever came home.' },
      summary: 'In the summer of 1942 Germany drove southeast for the oil of the Caucasus, and the Sixth Army reached the Volga at Stalingrad. For three months the two armies fought for the ruins block by block, sometimes floor by floor. On November 19 Soviet armies struck the weak Romanian forces on both flanks and met behind the city four days later, trapping 250,000 men. Hitler forbade a breakout. Starving and frozen, the last of them surrendered on February 2, 1943.',
      significance: 'The turning point of the war in the East. Germany never recovered the initiative, and the Red Army began the advance that ended in Berlin.',
      images: [
        img('Field Marshal Paulus, General Heitz and other German officers of the 6th Army after its surrender.jpg', 'Field Marshal Paulus and officers of the German Sixth Army after their surrender, January 31, 1943.', 'Soviet photograph. Public domain.'),
        img('The Battle of Stalingrad MH5646.jpg', 'Fighting in the ruins of Stalingrad.', 'Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'Please tell Stalin from us that for us commanders and men of the 62nd Army there is no land beyond the Volga. Here we stand and here we remain until death.',
          who: 'Vasily Zaitsev', role: 'Sniper, Soviet 62nd Army, on receiving a decoration', side: 'allied',
          date: 'Autumn 1942', source: 'As reported in a Soviet wartime pamphlet published in English in 1943',
          verified: true, ref: IA('federov-the-red-army', 'no land beyond the Volga'), refTitle: 'Colonel Fedorov, The Red Army (1943)'
        },
        {
          quote: 'Surrender is forbidden. Sixth Army will hold their positions to the last man and the last round and by their heroic endurance will make an unforgettable contribution towards the establishment of a defensive front and the salvation of the Western world.',
          who: 'Adolf Hitler', role: 'Radio message refusing the Sixth Army\'s request to surrender', side: 'axis',
          date: 'January 24, 1943', source: 'As quoted in a 1961 study of the battle',
          verified: true, ref: IA('battleofstalingr00hofm', 'positions to the last man'), refTitle: 'Battle of Stalingrad (1961 study)'
        }
      ]
    },
    {
      id: 'el-alamein',
      name: 'El Alamein',
      start: '1942-10-23', end: '1942-11-04',
      lat: 30.83, lng: 28.95,
      place: 'El Alamein, Egypt',
      theater: 'Mediterranean and North Africa',
      result: 'allied',
      campaign: 'eighth-army',
      commanders: { allied: 'Lt. Gen. Bernard Montgomery, Gen. Harold Alexander', axis: 'Field Marshal Erwin Rommel' },
      forces: { allied: 'about 195,000, with 1,000 tanks', axis: 'about 116,000 German and Italian troops, with 550 tanks' },
      casualties: { allied: 13560, axis: 59000, note: 'About 30,000 of the Axis losses were prisoners.' },
      summary: 'Rommel\'s desert army had driven to within sixty miles of Alexandria and the Suez Canal. At El Alamein the front could not be outflanked: the sea lay on one side and an impassable salt marsh on the other. Montgomery built up twice Rommel\'s strength, then attacked at night behind a thousand-gun barrage, sending infantry and engineers to clear paths through half a million mines. After twelve days of grinding battle the Axis line broke.',
      significance: 'The first major land victory over Germany for the Western Allies. Days later American and British forces landed in Morocco and Algeria, behind Rommel.',
      images: [
        img('The Campaign in North Africa 1940-1943 E18511.jpg', 'The campaign in North Africa, photographed by a British Army photographer in 1942.', 'British official photograph. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'We are ready NOW. The battle which is now about to begin will be one of the decisive battles of history. It will be the turning point of the war. The eyes of the whole world will be on us, watching anxiously which way the battle will swing.',
          who: 'Lt. Gen. Bernard Montgomery', role: 'Commander, British Eighth Army; personal message read to all troops', side: 'allied',
          date: 'October 23, 1942', source: 'Personal Message from the Army Commander', portrait: 'montgomery',
          verified: true, ref: IA('ici-magazine-1958-10', 'watching anxiously which way the battle will swing'), refTitle: 'ICI Magazine, October 1958, reproducing the message'
        }
      ]
    },
    {
      id: 'tunisia',
      name: 'Kasserine Pass and Tunisia',
      start: '1943-02-14', end: '1943-05-13',
      lat: 36.80, lng: 10.18,
      place: 'Tunisia',
      theater: 'Mediterranean and North Africa',
      result: 'allied',
      campaign: 'torch',
      commanders: { allied: 'Gen. Dwight D. Eisenhower, Gen. Harold Alexander, Lt. Gen. George S. Patton, Maj. Gen. Omar Bradley', axis: 'Field Marshal Erwin Rommel, Gen. Hans-Jürgen von Arnim' },
      forces: { allied: 'about 500,000 by May', axis: 'about 350,000' },
      casualties: { allied: 76000, axis: 290000, note: 'Most Axis losses were the roughly 250,000 German and Italian soldiers who surrendered in May.' },
      summary: 'After landing in Morocco and Algeria in November 1942, the Allies raced for Tunis and lost the race. In February Rommel struck the inexperienced Americans at Kasserine Pass and drove them back fifty miles in their first real battle against the German army. The U.S. Army replaced commanders, changed its tactics, and learned quickly. In the spring the British Eighth Army from the east and the Allied forces from the west squeezed the Axis armies into the northeast corner of Tunisia, where they surrendered.',
      significance: 'Cleared North Africa, cost the Axis as many men as Stalingrad, and gave the American army the hard experience it would need in Europe.',
      images: [
        img('1stArmorDivKasserineTunisia1943.jpg', 'Men and tanks of the U.S. 1st Armored Division at Kasserine Pass, February 1943.', 'U.S. Army Signal Corps.')
      ],
      journal: [
        {
          quote: 'Sir,—It is my duty to report that the Tunisian campaign is over. All enemy resistance has ceased. We are masters of the North African shores.',
          who: 'Gen. Harold Alexander', role: 'Commander of Allied ground forces in Tunisia, in a telegram to Prime Minister Churchill', side: 'allied',
          date: 'May 13, 1943', source: 'Telegram, printed in the British government\'s account of the campaign', portrait: 'alexander',
          verified: true, ref: IA('armywartunisia', 'Tunisian campaign is over'), refTitle: 'The Army at War: Tunisia (His Majesty\'s Stationery Office, 1944)'
        }
      ]
    },
    {
      id: 'atlantic',
      name: 'Battle of the Atlantic',
      start: '1943-03-01', end: '1943-05-24',
      lat: 51.0, lng: -20.0,
      place: 'North Atlantic convoy routes',
      theater: 'Atlantic',
      result: 'allied',
      commanders: { allied: 'Adm. Sir Max Horton, Adm. Ernest J. King', axis: 'Grand Adm. Karl Dönitz' },
      forces: { allied: 'convoy escorts, escort carriers, and long-range aircraft', axis: 'about 240 operational U-boats' },
      casualties: { allied: 72000, axis: 30000, heading: 'Deaths', kind: '(whole war, 1939–1945)', note: 'About 36,000 Allied sailors and 36,000 merchant seamen died. Some 3,500 merchant ships and 783 U-boats were sunk. Three of every four U-boat crewmen never came home.' },
      summary: 'Britain could not eat, fight, or build without cargo from across the ocean, and every American soldier and tank bound for Europe had to cross it too. German submarines hunted the convoys in groups called wolf packs. The marker shows the spring of 1943, when the battle was decided: in March the U-boats sank nearly a hundred ships, and it seemed the convoy system might fail. Then long-range aircraft, small aircraft carriers, radar, and the breaking of German naval codes turned the hunters into the hunted. In May, 41 U-boats were lost, and Dönitz pulled them out of the North Atlantic.',
      significance: 'The longest campaign of the war, and the one every other Western campaign depended on. Without it there could have been no D-Day.',
      images: [
        img('26-G-1575 Sinking of German submarine U-175, by USCGC Spencer, 17 April 1943.jpg', 'The U.S. Coast Guard cutter Spencer sinks the German submarine U-175 while guarding a convoy, April 17, 1943.', 'U.S. Coast Guard. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'But when you see a rattlesnake poised to strike, you do not wait until he has struck before you crush him. These Nazi submarines and raiders are the rattlesnakes of the Atlantic.',
          who: 'President Franklin D. Roosevelt', role: 'Radio address ordering the Navy to fire on German submarines, three months before the United States entered the war', side: 'allied',
          date: 'September 11, 1941', source: 'Fireside chat, printed in the Department of State Bulletin', portrait: 'fdr',
          verified: true, ref: IA('sim_department-of-state-bulletin_1941-09-13_5_116', 'rattlesnakes of the Atlantic'), refTitle: 'Department of State Bulletin, September 13, 1941'
        }
      ]
    },
    {
      id: 'warsaw-ghetto',
      name: 'Warsaw Ghetto Uprising',
      start: '1943-04-19', end: '1943-05-16',
      lat: 52.245, lng: 20.993,
      place: 'Warsaw, German-occupied Poland',
      theater: 'Eastern Front',
      result: 'axis', resultLabel: 'Uprising crushed',
      sideLabels: { allied: 'Jewish fighters', axis: 'German forces' },
      commanders: { allied: 'Mordechai Anielewicz (Jewish Combat Organization), Paweł Frenkel (Jewish Military Union)', axis: 'SS Brig. Gen. Jürgen Stroop' },
      forces: { allied: 'about 750 fighters with pistols, a few rifles, and homemade bombs', axis: 'about 2,000 SS, police, and army troops with tanks and artillery' },
      casualties: { allied: 56065, axis: 110, heading: 'Losses', kind: '', note: 'Stroop reported 56,065 Jews killed or captured. About 7,000 were shot on the spot, and most of the rest were sent to the Treblinka killing center and to labor camps. He admitted 16 German dead, a figure historians think too low.' },
      summary: 'The Germans had walled more than 400,000 Jews into a district of Warsaw in 1940. By 1943 hunger, disease, and deportation to the gas chambers of Treblinka had left about 60,000 alive. When SS troops entered on April 19 to deport the rest, young fighters with almost no weapons met them with gunfire and gasoline bombs and drove them out. The Germans then burned the ghetto building by building. The fighters held out for nearly a month, longer than some countries had.',
      significance: 'The first large armed revolt against the Germans in occupied Europe, by people who knew they could not win and chose how they would die.',
      images: [
        img('Stroop Report - Warsaw Ghetto Uprising 06.jpg', 'A photograph from the Stroop Report, the SS commander\'s own illustrated record of destroying the ghetto. It became evidence at the Nuremberg trials.', 'German photograph, 1943. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'By my death I wish to express my final protest against the passivity with which the world is looking on and permitting the extermination of the Jewish people.',
          who: 'Szmul Zygielbojm', role: 'Jewish member of the Polish government in exile in London, in a farewell letter written as the ghetto was destroyed. He took his own life the next day.', side: 'civilian',
          date: 'May 11, 1943', source: 'Letter to the president and prime minister of Poland',
          verified: true, ref: IA('factsfictionsabo51rubi', 'permitting the extermination of the Jewish people'), refTitle: 'Facts and Fictions about the Rescue of the Polish Jewry during the Holocaust (2002), reproducing the letter'
        },
        {
          quote: '180 Jews, bandits, and subhumans were destroyed. The former Jewish quarter of Warsaw is no longer in existence.',
          who: 'SS Brig. Gen. Jürgen Stroop', role: 'Commander of the German forces, in his final daily report. The words are the perpetrator\'s own; his report was used to convict Nazi leaders at Nuremberg, and Stroop was hanged in Warsaw in 1952.', side: 'axis',
          date: 'May 16, 1943', source: 'Teletype report, Nuremberg trial document 1061-PS',
          verified: true, ref: IA('NaziConspiracyAndAggression', 'no longer in existence'), refTitle: NCA
        }
      ]
    },
    {
      id: 'kursk',
      name: 'Kursk',
      start: '1943-07-05', end: '1943-08-23',
      lat: 51.73, lng: 36.19,
      place: 'Kursk, Soviet Union',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'soviet-south',
      sideLabels: { allied: 'Soviet Union', axis: 'Germany' },
      commanders: { allied: 'Marshal Georgy Zhukov, Gen. Konstantin Rokossovsky, Gen. Nikolai Vatutin', axis: 'Field Marshal Erich von Manstein, Field Marshal Günther von Kluge, Gen. Walter Model' },
      forces: { allied: 'about 1.9 million, with 5,000 tanks', axis: 'about 780,000, with 2,900 tanks' },
      casualties: { allied: 860000, axis: 200000, note: 'Estimates for the German attack and the Soviet counteroffensives that followed.' },
      summary: 'After Stalingrad the front line bulged westward around the city of Kursk, and Germany planned to cut the bulge off from north and south. Warned by spies and codebreakers, the Soviets packed it with mines, trenches, and anti-tank guns in belts up to a hundred miles deep, then waited. The German attack gained only a few miles in a week of the largest tank fighting in history. When the Allies landed in Sicily, Hitler called it off, and the Red Army went over to the attack.',
      significance: 'Germany\'s last major offensive in the East. From here to Berlin the Red Army attacked and the German army retreated.',
      images: [
        img('Kursk Soviet machineguns.JPG', 'Soviet machine gunners in action during the Battle of Kursk, 1943.', 'Soviet photograph. Public domain.')
      ],
      journal: [
        {
          quote: '…victory at Kursk must serve as a beacon for the world.',
          who: 'Adolf Hitler', role: 'Operation order for "Citadel," the attack on the Kursk bulge', side: 'axis',
          date: 'April 15, 1943', source: 'As quoted in a U.S. Air Force history',
          verified: true, ref: IA('DTIC_ADA421966', 'victory at Kursk must serve as a beacon'), refTitle: 'Williamson Murray, Strategy for Defeat: The Luftwaffe 1933–1945 (Air University Press, 1983)'
        },
        {
          quote: 'Thus the German myth that the Soviet troops are allegedly incapable of waging a successful offensive in the summer has now been dispelled.',
          who: 'Joseph Stalin', role: 'Order of the Day on the recapture of Orel and Belgorod, marked by the first victory salute fired in Moscow', side: 'allied',
          date: 'August 5, 1943', source: 'Order of the Day', portrait: 'stalin',
          verified: true, ref: IA('in.ernet.dli.2015.183559', 'German myth that the Soviet troops'), refTitle: STALIN_SPEECHES
        }
      ]
    },
    {
      id: 'sicily',
      name: 'Sicily',
      start: '1943-07-10', end: '1943-08-17',
      lat: 37.60, lng: 14.02,
      place: 'Sicily, Italy',
      theater: 'Mediterranean and North Africa',
      result: 'allied',
      campaign: 'italy',
      commanders: { allied: 'Gen. Dwight D. Eisenhower, Gen. Harold Alexander, Lt. Gen. George S. Patton, Gen. Bernard Montgomery', axis: 'Gen. Alfredo Guzzoni, Field Marshal Albert Kesselring' },
      forces: { allied: 'about 467,000', axis: 'about 300,000 Italian and German troops' },
      casualties: { allied: 24850, axis: 165000, note: 'About 140,000 of the Axis losses were prisoners, most of them Italian. Some 100,000 Axis troops escaped to the mainland.' },
      summary: 'The largest amphibious landing of the war to that point put seven divisions ashore on the south coast of Sicily in a gale. Montgomery\'s British army pushed up the east coast toward Messina while Patton\'s Americans swept west to Palermo and then raced along the north coast. The island fell in 38 days. Two weeks into the campaign, the Italian king dismissed and arrested Mussolini.',
      significance: 'Knocked Italy out of the Axis and opened the way to the Italian mainland, though most of the German defenders got away to fight again.',
      images: [
        img('26-G-1788 Sicily Invasion, July 1943.jpg', 'The invasion of Sicily, July 1943.', 'U.S. Coast Guard. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'Born at sea, baptized in blood and crowned with victory in the course of 38 days of incessant battle and unceasing labor, you have added a glorious chapter to the history of the war.',
          who: 'Lt. Gen. George S. Patton', role: 'Commander, U.S. Seventh Army, in a general order to his soldiers', side: 'allied',
          date: 'August 22, 1943', source: 'General order, printed in Army Times', portrait: 'patton',
          verified: true, ref: IA('sim_army-times_1943-08-28_4_3', 'Born at sea, baptized in blood'), refTitle: 'Army Times, August 28, 1943'
        }
      ]
    },
    {
      id: 'cassino-anzio',
      name: 'Anzio and Monte Cassino',
      start: '1944-01-17', end: '1944-06-04',
      lat: 41.49, lng: 13.81,
      place: 'Cassino and Anzio, Italy',
      theater: 'Mediterranean and North Africa',
      result: 'allied',
      campaign: 'italy',
      commanders: { allied: 'Gen. Harold Alexander, Lt. Gen. Mark Clark, Lt. Gen. Oliver Leese', axis: 'Field Marshal Albert Kesselring, Gen. Heinrich von Vietinghoff' },
      forces: { allied: 'about 390,000 on the two fronts by May', axis: 'about 275,000' },
      casualties: { allied: 98000, axis: 60000, note: 'Approximate totals for both battles.' },
      summary: 'South of Rome the Germans held the Gustav Line across the narrowest part of Italy, anchored on the mountain town of Cassino and the ancient abbey above it. Four Allied assaults over five months, by Americans, British, Indians, New Zealanders, French North Africans, and Poles, were needed to break it. A landing behind the line at Anzio in January was meant to force a retreat but was penned into a small beachhead under constant shellfire until May. Polish troops raised their flag over the abbey ruins on May 18, and Rome fell on June 4.',
      significance: 'The hardest fighting of the Italian campaign. Rome was the first Axis capital to fall, two days before D-Day pushed Italy off the front pages.',
      images: [
        img('A British Sherman tank and jeep of 4th Armoured Brigade entering the ruins of Cassino, Italy, 18 May 1944. NA15079.jpg', 'A British tank and jeep enter the ruins of Cassino, May 18, 1944.', 'British official photograph. Imperial War Museums.'),
        img('Sherman tanks of 23rd Armoured Brigade come ashore with infantry at Anzio, Italy, 22 January 1944. NA11037.jpg', 'Tanks and infantry come ashore at Anzio, January 22, 1944.', 'British official photograph. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'To the Nazis all the Abbey meant was a good observation post commanding the Allied route northward, so we eventually had to destroy it. After a two-month stalemate the Allies launched a terrific bombardment on Mar. 15 by air and artillery. Cassino was smashed completely, but we failed to take the hills by storm and the Germans found new shelter in the ruins.',
          who: 'Yank, the Army Weekly', role: 'Magazine written by and for enlisted soldiers, looking back at Cassino a year later', side: 'allied',
          date: 'February 16, 1945', source: 'Yank, the Army Weekly',
          verified: true, ref: IA('1945-02-16YankMagazine', 'siege of Cassino'), refTitle: 'Yank, the Army Weekly, February 16, 1945'
        },
        {
          quote: 'Yesterday, June fourth, 1944, Rome fell to American and Allied troops. The first of the Axis capitals is now in our hands. One up and two to go!',
          who: 'President Franklin D. Roosevelt', role: 'Radio address on the liberation of Rome', side: 'allied',
          date: 'June 5, 1944', source: 'Fireside chat, printed in the Department of State Bulletin', portrait: 'fdr',
          verified: true, ref: IA('sim_department-of-state-bulletin_1944-06-10_10_259', 'One up and two to go'), refTitle: 'Department of State Bulletin, June 10, 1944'
        }
      ]
    },
    {
      id: 'normandy',
      name: 'D-Day and the Battle of Normandy',
      start: '1944-06-06', end: '1944-08-25',
      lat: 49.37, lng: -0.88,
      place: 'Normandy, France',
      theater: 'Western Europe',
      result: 'allied',
      campaign: 'overlord',
      commanders: { allied: 'Gen. Dwight D. Eisenhower, Gen. Bernard Montgomery, Lt. Gen. Omar Bradley, Lt. Gen. Miles Dempsey', axis: 'Field Marshal Gerd von Rundstedt, Field Marshal Erwin Rommel, Field Marshal Günther von Kluge' },
      forces: { allied: '156,000 landed on June 6; more than 2 million by late August', axis: 'about 50,000 at the beaches; more than 1 million in the campaign' },
      casualties: { allied: 226000, axis: 450000, note: 'Campaign totals through August; the Axis figure includes about 200,000 prisoners. D-Day itself cost the Allies about 10,000 casualties, including 4,414 confirmed dead.' },
      summary: 'In the early hours of June 6, 1944, paratroopers dropped behind the Normandy coast, and at dawn the largest invasion fleet in history put American, British, and Canadian troops ashore on five beaches. At Omaha Beach the first waves were cut down at the water\'s edge and the landing nearly failed. By nightfall the Allies held all five. Weeks of costly fighting in the hedgerows followed before American armor broke out at the end of July. The German armies in Normandy were trapped and destroyed near Falaise, and Paris was liberated on August 25.',
      significance: 'Opened the second front Stalin had demanded for three years. Germany was now caught between the Western Allies and the Red Army.',
      images: [
        img('Into the Jaws of Death 23-0455M edit.jpg', '"Into the Jaws of Death": soldiers of the U.S. 1st Infantry Division wade toward Omaha Beach, June 6, 1944.', 'Robert F. Sargent, U.S. Coast Guard. U.S. National Archives.'),
        img('Eisenhower d-day.jpg', 'General Eisenhower talks with paratroopers of the 101st Airborne Division on the evening of June 5, 1944.', 'U.S. Army. Library of Congress.'),
        img('American troops march down the Champs Elysees.jpg', 'American troops march down the Champs-Élysées in liberated Paris, August 29, 1944.', 'U.S. Army Signal Corps. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'You are about to embark upon the Great Crusade, toward which we have striven these many months. The eyes of the world are upon you. The hopes and prayers of liberty-loving people everywhere march with you.',
          who: 'Gen. Dwight D. Eisenhower', role: 'Supreme Commander, Allied Expeditionary Force; order of the day handed to every soldier, sailor, and airman', side: 'allied',
          date: 'June 6, 1944', source: 'Order of the Day', portrait: 'eisenhower',
          verified: true, ref: 'https://en.wikisource.org/wiki/D-Day_Statement_to_Soldiers,_Sailors,_and_Airmen_of_the_Allied_Expeditionary_Force', refTitle: 'D-Day Statement to Soldiers, Sailors, and Airmen of the Allied Expeditionary Force (Wikisource transcription)'
        },
        {
          quote: 'Our landings in the Cherbourg-Havre area have failed to gain a satisfactory foothold and I have withdrawn the troops … The troops, the air, the Navy did all that bravery and devotion to duty could do. If any blame or fault attaches to the attempt it is mine alone.',
          who: 'Gen. Dwight D. Eisenhower', role: 'A note he wrote in case the invasion failed, and never had to use', side: 'allied',
          date: 'June 5, 1944', source: 'Handwritten note, now in the Eisenhower Presidential Library', portrait: 'eisenhower',
          verified: true, ref: IA('DTIC_ADA217241', 'it is mine alone'), refTitle: 'Leadership in War and Peace (U.S. Air War College, 1989), reproducing the note'
        },
        {
          quote: '"Two kinds of people are staying on this beach … the dead and those who are going to die. Now let\'s get the hell out of here."',
          who: 'Col. George A. Taylor', role: 'Commander, 16th Infantry Regiment, to his men pinned down on Omaha Beach', side: 'allied',
          date: 'June 6, 1944', source: 'As recorded in the U.S. Army\'s campaign history',
          verified: true, ref: IA('NormandyCmh72-18', 'those who are going to die'), refTitle: 'Normandy (U.S. Army Center of Military History)'
        },
        {
          quote: 'If the enemy here succeeds in penetrating our defenses on a wide front, consequences of staggering proportions will follow within a short time.',
          who: 'Adolf Hitler', role: 'Directive No. 51, ordering the defenses of western Europe strengthened', side: 'axis',
          date: 'November 3, 1943', source: 'Führer directive, translated in the U.S. Army\'s official history',
          verified: true, ref: IA('CMHPub741CrossChannelAttack', 'consequences of staggering proportions'), refTitle: 'Gordon A. Harrison, Cross-Channel Attack (U.S. Army official history, 1951)'
        }
      ]
    },
    {
      id: 'bagration',
      name: 'Operation Bagration',
      start: '1944-06-23', end: '1944-08-19',
      lat: 53.90, lng: 27.57,
      place: 'Belorussia (now Belarus), Soviet Union',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'bagration',
      sideLabels: { allied: 'Soviet Union', axis: 'Germany' },
      commanders: { allied: 'Marshals Georgy Zhukov and Aleksandr Vasilevsky, Gen. Konstantin Rokossovsky, Gen. Ivan Chernyakhovsky', axis: 'Field Marshal Ernst Busch, Field Marshal Walter Model' },
      forces: { allied: 'about 1.7 million, with 4,000 tanks', axis: 'about 800,000' },
      casualties: { allied: 770000, axis: 400000, note: 'Estimates. Germany lost 28 divisions, more than at Stalingrad.' },
      summary: 'Two weeks after D-Day and three years to the day after Germany invaded, the Red Army struck the German Army Group Center in Belorussia. A deception plan had convinced the Germans the blow would fall farther south. Soviet tank armies broke through on six sectors, surrounded the garrisons Hitler had ordered to stand fast, retook Minsk in ten days, and in five weeks advanced more than 300 miles to the outskirts of Warsaw.',
      significance: 'The worst German defeat of the war, though little known in the West. It tore the center out of the Eastern Front and brought the Red Army to the borders of Germany.',
      images: [
        img('Joseph Stalin Cropped 1943 (3x4 cropped).jpg', 'Joseph Stalin in 1943. His Orders of the Day, read on Moscow radio, announced each Soviet victory.', 'U.S. Army Signal Corps, Tehran.')
      ],
      journal: [
        {
          quote: '…to-day, July 3, carried by assault the capital of Soviet Byelorussia, the town of Minsk',
          who: 'Joseph Stalin', role: 'Order of the Day to the generals who took Minsk', side: 'allied',
          date: 'July 3, 1944', source: 'Order of the Day', portrait: 'stalin',
          verified: true, ref: IA('in.ernet.dli.2015.183559', 'carried by assault the capital of Soviet Byelorussia'), refTitle: STALIN_SPEECHES
        }
      ]
    },
    {
      id: 'warsaw-uprising',
      name: 'Warsaw Uprising',
      start: '1944-08-01', end: '1944-10-02',
      lat: 52.225, lng: 21.035,
      place: 'Warsaw, German-occupied Poland',
      theater: 'Eastern Front',
      result: 'axis', resultLabel: 'Uprising crushed',
      sideLabels: { allied: 'Polish Home Army', axis: 'German forces' },
      commanders: { allied: 'Gen. Tadeusz Bór-Komorowski, Col. Antoni Chruściel', axis: 'SS Gen. Erich von dem Bach-Zelewski' },
      forces: { allied: 'about 40,000 fighters, few with firearms', axis: 'about 25,000 at first, later reinforced' },
      casualties: { allied: 166000, axis: 10000, heading: 'Deaths', kind: '', note: 'About 16,000 Polish fighters and 150,000 civilians were killed. German figures are estimates.' },
      summary: 'With the Red Army approaching the city, the Polish underground army rose against the German occupiers, hoping to free its capital itself. The Soviet advance stopped on the far bank of the Vistula, and for weeks Stalin refused to let Allied supply planes use Soviet airfields. The Poles fought for 63 days, street by street and through the sewers. After they surrendered, the Germans expelled the surviving population and systematically blew up what was left of the city.',
      significance: 'Destroyed Warsaw and the non-communist Polish resistance, leaving the way clear for a Soviet-backed government after the war.',
      images: [
        img('The Warsaw Uprising, August-october 1944 HU86081.jpg', 'The Warsaw Uprising, August to October 1944.', 'Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'When the final Allied victory is achieved, the epic of Warsaw will not be forgotten. It will remain a deathless memory for the Poles, and for the friends of freedom all over the world.',
          who: 'Winston Churchill', role: 'British prime minister, telling the House of Commons that Warsaw had fallen', side: 'allied',
          date: 'October 5, 1944', source: 'Hansard, House of Commons', portrait: 'churchill',
          verified: true, ref: HANSARD + '1944/oct/05/warsaw-epic-tribute-to-polish-nation', refTitle: 'Hansard, House of Commons, 5 October 1944'
        }
      ]
    },
    {
      id: 'market-garden',
      name: 'Operation Market Garden',
      start: '1944-09-17', end: '1944-09-25',
      lat: 51.98, lng: 5.91,
      place: 'Arnhem, the Netherlands',
      theater: 'Western Europe',
      result: 'axis',
      campaign: 'market-garden',
      commanders: { allied: 'Field Marshal Bernard Montgomery, Lt. Gen. Brian Horrocks, Maj. Gen. Roy Urquhart, Maj. Gen. Maxwell Taylor, Brig. Gen. James Gavin', axis: 'Field Marshal Walter Model, Gen. Kurt Student, SS Gen. Wilhelm Bittrich' },
      forces: { allied: 'about 41,600 airborne troops and an armored corps', axis: 'about 100,000' },
      casualties: { allied: 17000, axis: 8000, note: 'Estimates. Of about 10,000 British airborne troops at Arnhem, fewer than 2,500 got back across the river.' },
      summary: 'Hoping to end the war by Christmas, Montgomery planned to drop three airborne divisions to seize a chain of bridges across the rivers and canals of the Netherlands, then drive an armored corps sixty miles up a single road and over the Rhine at Arnhem. American paratroopers took the bridges at Eindhoven and Nijmegen. But the British at Arnhem landed miles from their bridge and on top of two German armored divisions no one had expected. One battalion held the north end of the bridge for four days. The tanks never reached it.',
      significance: 'The last chance to cross the Rhine in 1944 was lost. The war in the West went on through a hard winter.',
      images: [
        img('Waves of paratroops land in Holland.jpg', 'Waves of paratroops land in the Netherlands, September 1944.', 'U.S. Army. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'These three divisions were, in fact, to form "a carpet of airborne troops" over which the 2nd Army might pour to break down the last barrier defending the Reich and thus gain direct access to the Ruhr.',
          who: 'British Air Ministry', role: 'The government\'s official account of the airborne divisions, describing the plan', side: 'allied',
          date: '1945', source: 'By Air to Battle: The Official Account of the British Airborne Divisions',
          verified: true, ref: IA('byairtobattle', 'a carpet of airborne troops'), refTitle: 'By Air to Battle (His Majesty\'s Stationery Office, 1945)'
        }
      ]
    },
    {
      id: 'huertgen-forest',
      name: 'Hürtgen Forest',
      start: '1944-09-19', end: '1944-12-16',
      lat: 50.70, lng: 6.37,
      place: 'Near Aachen, Germany',
      theater: 'Western Europe',
      result: 'inconclusive',
      campaign: 'overlord',
      commanders: { allied: 'Lt. Gen. Courtney Hodges, Maj. Gen. J. Lawton Collins', axis: 'Field Marshal Walter Model' },
      forces: { allied: 'about 120,000', axis: 'about 80,000' },
      casualties: { allied: 33000, axis: 28000, note: 'The American figure includes about 9,000 lost to trench foot, exposure, and combat exhaustion.' },
      summary: 'On the German border south of Aachen lay fifty square miles of dense fir forest, cut by ravines and sown with mines and bunkers. For three months the U.S. First Army sent division after division into it. Among the trees American advantages in tanks, artillery, and aircraft counted for little, and shells bursting in the treetops showered men with splinters. Several divisions lost a quarter of their strength for gains measured in yards.',
      significance: 'The longest single battle the U.S. Army has ever fought, and one many historians think should not have been fought at all.',
      images: [
        img('SC 270664 - U.S. infantrymen leave the muddy road to enter the the Hurtgen Forest, Germany, as they advance against German installations in the wooded area. 18 November, 1944. (52274984843).jpg', 'U.S. infantrymen leave a muddy road to enter the Hürtgen Forest, November 18, 1944.', 'U.S. Army Signal Corps. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'The forest will bear the scars of our advance long after our own scars have healed, and the infantry has scars that will never heal, perhaps. For Huertgen was agony, and there was no glory in it except the glory of courageous men.',
          who: 'Sgt. Mack Morriss', role: 'Yank staff correspondent with the 4th Infantry Division', side: 'allied',
          date: 'January 5, 1945', source: 'Yank, the Army Weekly',
          verified: true, ref: IA('1945-01-05YankMagazine-nsia', 'Huertgen was agony'), refTitle: 'Yank, the Army Weekly, January 5, 1945'
        }
      ]
    },
    {
      id: 'bulge',
      name: 'Battle of the Bulge',
      start: '1944-12-16', end: '1945-01-25',
      lat: 50.00, lng: 5.72,
      place: 'The Ardennes: Belgium and Luxembourg',
      theater: 'Western Europe',
      result: 'allied',
      campaign: 'ardennes',
      commanders: { allied: 'Gen. Dwight D. Eisenhower, Lt. Gen. Omar Bradley, Lt. Gen. George S. Patton, Field Marshal Bernard Montgomery, Brig. Gen. Anthony McAuliffe', axis: 'Field Marshal Gerd von Rundstedt, Field Marshal Walter Model, Gen. Hasso von Manteuffel' },
      forces: { allied: 'about 610,000 Americans', axis: 'about 450,000 at the start' },
      casualties: { allied: 90000, axis: 85000, note: 'About 19,000 Americans were killed and 23,000 captured or missing. It was the largest and bloodiest battle the U.S. Army fought in the war.' },
      summary: 'Before dawn on December 16, in fog and snow that grounded Allied aircraft, three German armies struck a thinly held stretch of the American line in the Ardennes forest. Hitler\'s aim was to split the Allied armies and retake the port of Antwerp. The attack punched a bulge sixty miles deep. But American troops held the shoulders and the road junctions of St. Vith and Bastogne, where the surrounded 101st Airborne refused to surrender. The skies cleared on December 23, Patton\'s tanks reached Bastogne on the 26th, and by late January the bulge was gone.',
      significance: 'Germany\'s last offensive in the West used up the tanks, fuel, and men it needed to defend the Rhine and the Oder.',
      images: [
        img('101st Airborne troops move out of Bastogne.jpg', 'Troops of the 101st Airborne Division move out of Bastogne after the siege was broken, December 1944.', 'U.S. Army Signal Corps. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'Soldiers of the West Front! Your great hour has arrived. Large attacking armies have started against the Anglo-Americans. I do not have to tell you anything more than that. You feel it yourself. WE GAMBLE EVERYTHING!',
          who: 'Field Marshal Gerd von Rundstedt', role: 'German commander in the West; order of the day read to the attacking troops', side: 'axis',
          date: 'December 16, 1944', source: 'Order of the Day, as quoted in a U.S. Army War College study',
          verified: true, ref: IA('DTIC_ADA363965', 'Your great hour has arrived'), refTitle: 'The Battle of the Ardennes (U.S. Army War College, 1999)'
        },
        {
          quote: 'To the German Commander: NUTS! The American Commander.',
          who: 'Brig. Gen. Anthony McAuliffe', role: 'Acting commander, 101st Airborne Division, replying to a German demand that surrounded Bastogne surrender', side: 'allied',
          date: 'December 22, 1944', source: 'Written reply, recorded in the VIII Corps report',
          verified: true, ref: IA('PattonAndHisThirdArmy', 'received the following reply'), refTitle: 'Brenton G. Wallace, Patton and His Third Army (1946)'
        },
        {
          quote: 'Almighty and most merciful Father, we humbly beseech Thee, of Thy great goodness, to restrain these immoderate rains with which we have had to contend. Grant us fair weather for Battle.',
          who: 'Lt. Gen. George S. Patton', role: 'Prayer he ordered printed on cards and given to every soldier of the Third Army', side: 'allied',
          date: 'December 1944', source: 'Third Army prayer card', portrait: 'patton',
          verified: true, ref: IA('PattonAndHisThirdArmy', 'restrain these immoderate rains'), refTitle: 'Brenton G. Wallace, Patton and His Third Army (1946)'
        }
      ]
    },
    {
      id: 'liberation-of-the-camps',
      name: 'Liberation of the Camps',
      start: '1945-01-27', end: '1945-04-29',
      lat: 50.03, lng: 19.20,
      place: 'Auschwitz, German-occupied Poland, and camps across Germany',
      theater: 'Eastern Front',
      result: 'none', resultLabel: 'Liberation',
      campaign: 'konev',
      sideLabels: { allied: 'Liberating armies', axis: 'The camps' },
      commanders: { allied: 'Soviet 60th Army at Auschwitz; U.S. Third and Seventh Armies at Buchenwald and Dachau; British Second Army at Bergen-Belsen', axis: 'The SS, under Heinrich Himmler' },
      forces: { allied: 'Prisoners found alive: about 7,000 at Auschwitz, 21,000 at Buchenwald, 60,000 at Bergen-Belsen, 32,000 at Dachau', axis: 'More than a thousand camps and subcamps' },
      casualties: { allied: 0, axis: 0, hideBars: true, heading: 'The dead', kind: '', note: 'About six million Jews were murdered in the Holocaust, roughly 1.1 million of them at Auschwitz. The Nazis also killed millions of others, among them Roma, Soviet prisoners of war, Polish civilians, and people with disabilities.' },
      summary: 'As the Allied armies advanced, they found the camps. The Red Army reached Auschwitz, the largest killing center, on January 27, 1945; the SS had marched most prisoners away, leaving about 7,000 too weak to walk. In April American troops entered Ohrdruf, Buchenwald, and Dachau, and the British entered Bergen-Belsen, where thousands of unburied dead lay among the starving. Eisenhower toured Ohrdruf himself, then ordered every nearby unit, and asked members of Congress and newspaper editors, to come and see.',
      significance: 'The world saw the evidence of the Holocaust. Eisenhower insisted it be witnessed and recorded so that it could never be denied, and the testimony gathered formed the core of the Nuremberg trials.',
      images: [
        img('Buchenwald Slave Laborers Liberation.jpg', 'Survivors in a barracks at Buchenwald, photographed five days after liberation, April 16, 1945.', 'Pvt. H. Miller, U.S. Army Signal Corps. U.S. National Archives.'),
        img('Child survivors of Auschwitz.jpeg', 'Child survivors of Auschwitz, filmed by Soviet cameramen after the liberation, 1945.', 'Still from Soviet film. Public domain.')
      ],
      journal: [
        {
          quote: 'It was snowing and we wondered why they were playing music. We then saw that the camp foremen were returning to the camp. Each foreman was followed by men who were carrying the dead.',
          who: 'Marie-Claude Vaillant-Couturier', role: 'French resistance member and Auschwitz survivor, describing her first evening in the camp in testimony at the Nuremberg trial', side: 'civilian',
          date: 'January 28, 1946', source: 'Testimony before the International Military Tribunal',
          verified: true, ref: IA('trialofmajorwarc6224gori', 'wondered why they were playing music'), refTitle: 'Trial of the Major War Criminals before the International Military Tribunal, vol. 6 (1947)'
        },
        {
          quote: 'The things I saw beggar description … I made the visit deliberately, in order to be in a position to give first-hand evidence of these things if ever, in the future, there develops a tendency to charge these allegations merely to \'propaganda\'.',
          who: 'Gen. Dwight D. Eisenhower', role: 'Supreme Allied Commander, after touring the camp at Ohrdruf', side: 'allied',
          date: 'April 15, 1945', source: 'Letter to Gen. George C. Marshall', portrait: 'eisenhower',
          verified: true, ref: IA('DaysOfRemembranceOfTheVictimsOfTheHolocaustOfficeOfTheSecretaryOfDefense1988', 'beggar description'), refTitle: 'Days of Remembrance (U.S. Department of Defense, 1988), reproducing the letter'
        },
        {
          quote: 'At Buchenwald concentration camp I saw bake ovens. Instead of being used to bake bread, they were used to destroy people.',
          who: 'A Yank staff correspondent', role: 'Enlisted reporter for the Army\'s weekly magazine, writing from Buchenwald', side: 'allied',
          date: 'May 18, 1945', source: 'Yank, the Army Weekly',
          verified: true, ref: IA('1945-05-18YankMagazine-nsia', 'I saw bake ovens'), refTitle: 'Yank, the Army Weekly, May 18, 1945'
        }
      ]
    },
    {
      id: 'berlin',
      name: 'Berlin and Victory in Europe',
      start: '1945-04-16', end: '1945-05-08',
      lat: 52.52, lng: 13.40,
      place: 'Berlin, Germany',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'vistula-oder',
      sideLabels: { allied: 'Soviet Union', axis: 'Germany' },
      commanders: { allied: 'Marshal Georgy Zhukov, Marshal Ivan Konev', axis: 'Adolf Hitler, Gen. Gotthard Heinrici, Gen. Helmuth Weidling' },
      forces: { allied: 'about 2.5 million, with 6,000 tanks', axis: 'about 760,000, many of them boys and old men' },
      casualties: { allied: 360000, axis: 320000, note: 'Estimates of killed and wounded. About 480,000 more German soldiers were captured, and tens of thousands of civilians died.' },
      summary: 'Eisenhower halted the Western armies at the Elbe River, as agreed with Stalin, and left Berlin to the Red Army. Two Soviet army groups broke the last defenses on the Oder on April 16 and surrounded the city within nine days. American and Soviet troops met at Torgau on the Elbe on April 25, cutting Germany in two. With Soviet soldiers a few hundred yards from his bunker, Hitler killed himself on April 30. Berlin surrendered on May 2, and Germany surrendered unconditionally at Reims on May 7 and again in Berlin on May 8.',
      significance: 'The end of the war in Europe: V-E Day, May 8, 1945. Perhaps forty million Europeans were dead, and the continent was divided between East and West for the next 45 years.',
      images: [
        img('Ruins of the Reichstag in Berlin, 3 June 1945. BU8573.jpg', 'The ruins of the Reichstag, the German parliament building, June 3, 1945.', 'British official photograph. Imperial War Museums.'),
        img('ElbeDay1945 (NARA ww2-121).jpg', 'American and Soviet soldiers meet on the Elbe River at Torgau, April 1945.', 'U.S. Army Signal Corps. U.S. National Archives.'),
        img('Colonal General Alfred Jodl, Chief of Staff under the Doenitz Regime, signs the document of unconditional surrender.... - NARA - 195338.jpg', 'Gen. Alfred Jodl signs the unconditional surrender of Germany at Reims, France, May 7, 1945.', 'U.S. Army Signal Corps. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'The mission of this Allied Force was fulfilled at 0241, local time, May 7, 1945.',
          who: 'Gen. Dwight D. Eisenhower', role: 'Supreme Allied Commander; his entire report of the victory to Washington and London', side: 'allied',
          date: 'May 7, 1945', source: 'Cable to the Combined Chiefs of Staff', portrait: 'eisenhower',
          verified: true, ref: IA('sim_foreign-service-journal_1947-10_24_10', 'MISSION OF THIS ALLIED FORCE'), refTitle: 'The American Foreign Service Journal, October 1947, quoting the cable'
        },
        {
          quote: 'This is a solemn but a glorious hour. I only wish that Franklin D. Roosevelt had lived to witness this day. General Eisenhower informs me that the forces of Germany have surrendered to the United Nations. The flags of freedom fly over all Europe.',
          who: 'President Harry S. Truman', role: 'Radio address announcing the surrender, on his 61st birthday', side: 'allied',
          date: 'May 8, 1945', source: 'Broadcast to the American people', portrait: 'truman',
          verified: true, ref: 'https://en.wikisource.org/wiki/Harry_S._Truman_announces_the_Surrender_of_Germany', refTitle: 'Harry S. Truman announces the Surrender of Germany (Wikisource transcription)'
        },
        {
          quote: 'Comrades! Men and women compatriots! The great day of victory over Germany has come. Fascist Germany, forced to her knees by the Red Army and the troops of our Allies, has acknowledged herself defeated and declared unconditional surrender.',
          who: 'Joseph Stalin', role: 'Soviet leader, in a victory broadcast from Moscow', side: 'allied',
          date: 'May 9, 1945', source: 'Victory speech', portrait: 'stalin',
          verified: true, ref: IA('in.ernet.dli.2015.183559', 'great day of victory over Germany has come'), refTitle: STALIN_SPEECHES
        }
      ]
    }
  ];

  // Waypoints: [lat, lng, 'YYYY-MM-DD', 'label']
  const CAMPAIGNS = [
    {
      id: 'poland', name: 'The German Invasion of Poland', side: 'axis',
      army: 'Army Group South', commander: 'Gerd von Rundstedt',
      start: '1939-09-01', end: '1939-09-28',
      description: 'The strongest of the German forces drove northeast from Silesia toward Warsaw while others closed in from East Prussia and Slovakia. Tanks reached the edge of the capital in eight days.',
      path: [
        [51.11, 17.03, '1939-09-01', 'Silesia, the German border'],
        [50.81, 19.12, '1939-09-03', 'Częstochowa'],
        [51.40, 19.70, '1939-09-05', 'Piotrków'],
        [52.18, 20.95, '1939-09-08', 'Outskirts of Warsaw'],
        [52.23, 21.01, '1939-09-28', 'Warsaw surrenders']
      ]
    },
    {
      id: 'sickle-cut', name: 'The Panzer Drive to the Channel', side: 'axis',
      army: 'Panzer Group Kleist', commander: 'Heinz Guderian',
      start: '1940-05-10', end: '1940-06-04',
      description: 'Seven armored divisions pushed through the Ardennes forest, crossed the Meuse at Sedan, and raced 240 miles to the sea in ten days, cutting the Allied armies in two.',
      path: [
        [49.97, 6.52, '1940-05-10', 'German border; into the Ardennes'],
        [49.79, 5.07, '1940-05-12', 'Bouillon'],
        [49.70, 4.94, '1940-05-13', 'Sedan; crossing the Meuse'],
        [49.69, 4.02, '1940-05-16', 'Montcornet'],
        [49.85, 3.29, '1940-05-18', 'Saint-Quentin'],
        [50.11, 1.83, '1940-05-20', 'Abbeville; the Channel reached'],
        [50.73, 1.61, '1940-05-23', 'Boulogne'],
        [50.99, 2.13, '1940-05-24', 'Gravelines; the halt order'],
        [51.03, 2.38, '1940-06-04', 'Dunkirk falls']
      ]
    },
    {
      id: 'barbarossa-center', name: 'Army Group Center: the Road to Moscow', side: 'axis',
      army: 'Army Group Center', commander: 'Fedor von Bock',
      start: '1941-06-22', end: '1942-01-07',
      description: 'The main German thrust followed the highway Napoleon had taken in 1812. It covered 400 miles in four weeks, paused for two months while Hitler sent its tanks south to Kiev, then resumed in October as the weather broke.',
      path: [
        [52.10, 23.70, '1941-06-22', 'Brest-Litovsk; the invasion begins'],
        [53.90, 27.57, '1941-06-28', 'Minsk'],
        [54.78, 32.05, '1941-07-16', 'Smolensk'],
        [54.78, 32.05, '1941-09-30', 'Operation Typhoon begins'],
        [55.21, 34.30, '1941-10-07', 'Vyazma; five Soviet armies surrounded'],
        [55.51, 36.02, '1941-10-18', 'Mozhaisk'],
        [56.02, 37.42, '1941-12-02', 'Krasnaya Polyana, 20 miles from the Kremlin'],
        [55.55, 35.00, '1942-01-07', 'Driven back by the Soviet counteroffensive']
      ]
    },
    {
      id: 'barbarossa-north', name: 'Army Group North: to Leningrad', side: 'axis',
      army: 'Army Group North', commander: 'Wilhelm von Leeb',
      start: '1941-06-22', end: '1941-09-08',
      description: 'The northern German army group crossed the Baltic states in three weeks and cut Leningrad off from the rest of the Soviet Union by early September.',
      path: [
        [55.08, 21.88, '1941-06-22', 'Tilsit, East Prussia'],
        [55.87, 26.53, '1941-06-26', 'Daugavpils'],
        [57.82, 28.33, '1941-07-09', 'Pskov'],
        [58.74, 29.85, '1941-08-08', 'Luga'],
        [59.94, 31.03, '1941-09-08', 'Shlisselburg; Leningrad cut off']
      ]
    },
    {
      id: 'case-blue', name: 'Sixth Army: to Stalingrad', side: 'axis',
      army: 'German Sixth Army', commander: 'Friedrich Paulus',
      start: '1942-06-28', end: '1943-02-02',
      description: 'In the 1942 summer offensive toward the Caucasus oil fields, the Sixth Army crossed the steppe to the Don River and then to the Volga at Stalingrad, where it was surrounded in November.',
      path: [
        [49.99, 36.23, '1942-06-28', 'Kharkov'],
        [48.92, 40.39, '1942-07-15', 'Millerovo'],
        [48.69, 43.53, '1942-08-21', 'Kalach; crossing the Don'],
        [48.71, 44.51, '1942-08-23', 'Reaches the Volga at Stalingrad'],
        [48.71, 44.51, '1942-11-23', 'Surrounded'],
        [48.71, 44.51, '1943-02-02', 'Surrender']
      ]
    },
    {
      id: 'afrika-korps', name: 'Rommel in the Desert', side: 'axis',
      army: 'Panzer Army Africa', commander: 'Erwin Rommel',
      start: '1942-01-21', end: '1943-03-06',
      description: 'Rommel drove the British 600 miles across Libya into Egypt in the first half of 1942, was beaten at El Alamein, and retreated 1,400 miles to Tunisia, where he struck the Americans at Kasserine Pass.',
      path: [
        [30.26, 19.20, '1942-01-21', 'El Agheila'],
        [32.12, 20.07, '1942-01-29', 'Benghazi'],
        [32.15, 23.30, '1942-05-26', 'Gazala'],
        [32.08, 23.96, '1942-06-21', 'Tobruk falls'],
        [31.35, 27.24, '1942-06-28', 'Mersa Matruh'],
        [30.83, 28.95, '1942-07-01', 'El Alamein'],
        [30.83, 28.95, '1942-11-04', 'Retreat begins'],
        [32.08, 23.96, '1942-11-13', 'Tobruk'],
        [30.26, 19.20, '1942-11-24', 'El Agheila'],
        [32.89, 13.19, '1943-01-23', 'Tripoli abandoned'],
        [35.17, 8.83, '1943-02-19', 'Kasserine Pass'],
        [33.35, 10.50, '1943-03-06', 'Medenine; Rommel leaves Africa']
      ]
    },
    {
      id: 'eighth-army', name: 'Eighth Army: El Alamein to Tunisia', side: 'allied',
      army: 'British Eighth Army', commander: 'Bernard Montgomery',
      start: '1942-10-23', end: '1943-05-13',
      description: 'After El Alamein the Eighth Army followed Rommel across Egypt and Libya, took Tripoli, broke the Mareth Line in southern Tunisia, and closed on Tunis from the south.',
      path: [
        [30.83, 28.95, '1942-10-23', 'El Alamein'],
        [30.83, 28.95, '1942-11-04', 'Breakthrough'],
        [32.08, 23.96, '1942-11-13', 'Tobruk'],
        [32.12, 20.07, '1942-11-20', 'Benghazi'],
        [30.26, 19.20, '1942-12-13', 'El Agheila'],
        [32.89, 13.19, '1943-01-23', 'Tripoli'],
        [33.63, 10.30, '1943-03-20', 'Mareth Line'],
        [33.88, 10.09, '1943-04-06', 'Wadi Akarit'],
        [36.13, 10.38, '1943-05-13', 'Enfidaville; Axis surrender']
      ]
    },
    {
      id: 'torch', name: 'Operation Torch to Tunis', side: 'allied',
      army: 'Allied Forces in North Africa', commander: 'Dwight D. Eisenhower',
      start: '1942-11-08', end: '1943-05-13',
      description: 'American and British forces landed at Casablanca, Oran, and Algiers, pushed east into Tunisia, were thrown back at Kasserine Pass, and returned in the spring to take Bizerte and Tunis.',
      path: [
        [35.70, -0.63, '1942-11-08', 'Oran; landings also at Casablanca and Algiers'],
        [36.75, 3.06, '1942-11-08', 'Algiers'],
        [36.90, 7.77, '1942-11-12', 'Bône'],
        [36.83, 9.84, '1942-11-28', 'Tebourba; stopped short of Tunis'],
        [35.26, 8.74, '1943-02-19', 'Kasserine Pass'],
        [34.34, 8.95, '1943-03-23', 'El Guettar'],
        [36.82, 9.53, '1943-04-30', 'Hill 609'],
        [37.27, 9.87, '1943-05-07', 'Bizerte'],
        [36.80, 10.18, '1943-05-13', 'Tunis; Axis surrender']
      ]
    },
    {
      id: 'italy', name: 'Sicily and the Italian Campaign', side: 'allied',
      army: 'U.S. Fifth and British Eighth Armies', commander: 'Harold Alexander and Mark Clark', short: 'Alexander / Clark',
      start: '1943-07-10', end: '1945-05-02',
      description: 'From Sicily the Allies crossed to the Italian mainland and fought north for twenty months through mountains that favored the defender at every river and ridge.',
      path: [
        [37.07, 14.25, '1943-07-10', 'Gela, Sicily'],
        [38.12, 13.36, '1943-07-22', 'Palermo'],
        [38.19, 15.55, '1943-08-17', 'Messina'],
        [40.68, 14.76, '1943-09-09', 'Salerno landing'],
        [40.85, 14.27, '1943-10-01', 'Naples'],
        [41.49, 13.81, '1944-01-17', 'Cassino; the Gustav Line'],
        [41.45, 12.63, '1944-01-22', 'Anzio landing'],
        [41.49, 13.81, '1944-05-18', 'Monte Cassino falls'],
        [41.90, 12.50, '1944-06-04', 'Rome'],
        [43.77, 11.25, '1944-08-04', 'Florence'],
        [44.49, 11.34, '1945-04-21', 'Bologna'],
        [45.44, 10.99, '1945-05-02', 'Verona; German surrender in Italy']
      ]
    },
    {
      id: 'soviet-south', name: 'The Red Army: Stalingrad to Kiev', side: 'allied',
      army: 'Soviet Voronezh and Steppe Fronts', commander: 'Nikolai Vatutin',
      start: '1942-11-19', end: '1943-11-06',
      description: 'From the encirclement at Stalingrad the Red Army pushed west, held at Kursk, and by autumn 1943 had crossed the Dnieper and retaken Kiev.',
      path: [
        [48.71, 44.51, '1942-11-19', 'Stalingrad; Operation Uranus'],
        [47.24, 39.71, '1943-02-14', 'Rostov'],
        [51.73, 36.19, '1943-07-12', 'Kursk'],
        [49.99, 36.23, '1943-08-23', 'Kharkov'],
        [50.45, 30.52, '1943-11-06', 'Kiev']
      ]
    },
    {
      id: 'bagration', name: 'Operation Bagration to the Vistula', side: 'allied',
      army: 'Soviet First Belorussian Front', commander: 'Konstantin Rokossovsky',
      start: '1944-06-24', end: '1944-09-14',
      description: 'In the summer of 1944 Soviet armies destroyed the German center in Belorussia and advanced more than 300 miles into Poland, uncovering the Majdanek camp on the way.',
      path: [
        [53.14, 29.22, '1944-06-24', 'Bobruisk'],
        [53.90, 27.57, '1944-07-03', 'Minsk'],
        [51.25, 22.57, '1944-07-24', 'Lublin; Majdanek camp found'],
        [52.25, 21.05, '1944-09-14', 'East bank of the Vistula, facing Warsaw']
      ]
    },
    {
      id: 'vistula-oder', name: 'The Red Army: Warsaw to Berlin', side: 'allied',
      army: 'Soviet First Belorussian Front', commander: 'Georgy Zhukov',
      start: '1945-01-17', end: '1945-05-02',
      description: 'In January 1945 Zhukov\'s armies crossed Poland in two weeks to the Oder River, forty miles from Berlin. In April they stormed the city.',
      path: [
        [52.23, 21.01, '1945-01-17', 'Warsaw'],
        [51.76, 19.46, '1945-01-19', 'Łódź'],
        [52.41, 16.93, '1945-01-25', 'Poznań'],
        [52.59, 14.65, '1945-01-31', 'Küstrin, on the Oder'],
        [52.53, 14.40, '1945-04-16', 'Seelow Heights'],
        [52.52, 13.40, '1945-04-21', 'Enters Berlin'],
        [52.52, 13.40, '1945-05-02', 'Berlin surrenders']
      ]
    },
    {
      id: 'konev', name: 'Konev: the Vistula to Prague', side: 'allied',
      army: 'Soviet First Ukrainian Front', commander: 'Ivan Konev',
      start: '1945-01-12', end: '1945-05-09',
      description: 'South of Zhukov, Konev\'s armies took Kraków, liberated Auschwitz, overran the factories of Silesia, met the Americans on the Elbe, and ended the war in Prague.',
      path: [
        [50.68, 21.75, '1945-01-12', 'Sandomierz bridgehead'],
        [50.06, 19.94, '1945-01-19', 'Kraków'],
        [50.03, 19.20, '1945-01-27', 'Auschwitz liberated'],
        [51.11, 17.03, '1945-02-15', 'Breslau surrounded'],
        [51.50, 14.70, '1945-04-16', 'Neisse River'],
        [51.56, 13.00, '1945-04-25', 'Torgau; meets U.S. First Army'],
        [50.08, 14.44, '1945-05-09', 'Prague']
      ]
    },
    {
      id: 'overlord', name: 'Normandy to the Elbe', side: 'allied',
      army: 'Allied Expeditionary Force', commander: 'Dwight D. Eisenhower',
      start: '1944-06-05', end: '1945-04-25',
      description: 'From the Normandy beaches the Western Allies broke out across France, liberated Paris and Brussels, stalled at the German border in the autumn, and crossed the Rhine in March 1945.',
      path: [
        [50.80, -1.09, '1944-06-05', 'Portsmouth; the fleet sails'],
        [49.37, -0.88, '1944-06-06', 'Normandy beaches'],
        [49.64, -1.62, '1944-06-27', 'Cherbourg'],
        [49.12, -1.09, '1944-07-18', 'Saint-Lô'],
        [48.68, -1.36, '1944-07-31', 'Avranches; the breakout'],
        [48.89, -0.20, '1944-08-21', 'Falaise pocket closed'],
        [48.86, 2.35, '1944-08-25', 'Paris liberated'],
        [50.85, 4.35, '1944-09-03', 'Brussels'],
        [50.78, 6.08, '1944-10-21', 'Aachen, first German city taken'],
        [50.70, 6.37, '1944-12-16', 'Hürtgen Forest'],
        [50.58, 7.24, '1945-03-07', 'Remagen; Rhine bridge captured'],
        [51.67, 8.34, '1945-04-01', 'Ruhr surrounded'],
        [51.56, 13.00, '1945-04-25', 'Torgau; meets the Red Army on the Elbe']
      ]
    },
    {
      id: 'market-garden', name: 'Operation Market Garden', side: 'allied',
      army: 'British XXX Corps', commander: 'Brian Horrocks', short: 'XXX Corps',
      start: '1944-09-17', end: '1944-09-25',
      description: 'The ground half of the plan: tanks driving north along one road, over bridges seized by paratroopers, to relieve the British airborne at Arnhem.',
      path: [
        [51.23, 5.43, '1944-09-17', 'Belgian border'],
        [51.44, 5.48, '1944-09-18', 'Eindhoven'],
        [51.76, 5.74, '1944-09-19', 'Grave'],
        [51.84, 5.86, '1944-09-20', 'Nijmegen; Waal bridge taken'],
        [51.92, 5.85, '1944-09-22', 'Elst'],
        [51.96, 5.81, '1944-09-25', 'Driel; stopped short of Arnhem']
      ]
    },
    {
      id: 'ardennes', name: 'The Ardennes Offensive', side: 'axis',
      army: 'Fifth Panzer Army', commander: 'Hasso von Manteuffel',
      start: '1944-12-16', end: '1945-01-25',
      description: 'The deepest German thrust bypassed Bastogne and came within four miles of the Meuse River before running out of fuel under clearing skies.',
      path: [
        [50.10, 6.20, '1944-12-16', 'German border'],
        [50.05, 6.03, '1944-12-17', 'Clervaux'],
        [50.00, 5.72, '1944-12-21', 'Bastogne surrounded'],
        [50.23, 5.00, '1944-12-24', 'Celles; four miles from the Meuse'],
        [50.13, 5.79, '1945-01-16', 'Houffalize'],
        [50.10, 6.20, '1945-01-25', 'Back at the start line']
      ]
    },
    {
      id: 'patton', name: 'Patton\'s Third Army', side: 'allied',
      army: 'U.S. Third Army', commander: 'George S. Patton',
      start: '1944-08-01', end: '1945-05-06',
      description: 'Patton\'s army led the breakout from Normandy, turned ninety degrees in three days to relieve Bastogne, crossed the Rhine, and liberated the first concentration camp reached by American troops.',
      path: [
        [48.68, -1.36, '1944-08-01', 'Avranches'],
        [48.00, 0.20, '1944-08-08', 'Le Mans'],
        [49.12, 6.18, '1944-11-22', 'Metz'],
        [49.68, 5.82, '1944-12-22', 'Arlon; turning north'],
        [50.00, 5.72, '1944-12-26', 'Bastogne; siege broken'],
        [49.75, 6.64, '1945-03-02', 'Trier'],
        [49.86, 8.36, '1945-03-22', 'Oppenheim; Rhine crossing'],
        [50.83, 10.73, '1945-04-04', 'Ohrdruf camp liberated'],
        [49.75, 13.38, '1945-05-06', 'Plzeň, Czechoslovakia']
      ]
    }
  ];

  const EVENTS = [
    { date: '1939-08-23', title: 'Germany and the Soviet Union sign a non-aggression pact' },
    { date: '1939-09-03', title: 'Britain and France declare war on Germany' },
    { date: '1939-09-17', title: 'The Soviet Union invades eastern Poland' },
    { date: '1940-04-09', title: 'Germany invades Denmark and Norway' },
    { date: '1940-05-10', title: 'Winston Churchill becomes prime minister' },
    { date: '1940-06-14', title: 'German troops enter Paris' },
    { date: '1940-09-07', title: 'The Blitz on London begins' },
    { date: '1940-09-27', title: 'Germany, Italy, and Japan sign the Tripartite Pact' },
    { date: '1941-03-11', title: 'U.S. Lend-Lease Act signed' },
    { date: '1941-12-07', title: 'Japan attacks Pearl Harbor' },
    { date: '1941-12-11', title: 'Germany and Italy declare war on the United States' },
    { date: '1942-01-20', title: 'Wannsee Conference coordinates the murder of Europe\'s Jews' },
    { date: '1942-11-08', title: 'Allied landings in Morocco and Algeria' },
    { date: '1943-01-24', title: 'Roosevelt and Churchill demand unconditional surrender' },
    { date: '1943-08-17', title: 'Sixty U.S. bombers lost over Schweinfurt and Regensburg' },
    { date: '1943-09-08', title: 'Italy surrenders; Germany occupies the country' },
    { date: '1943-11-28', title: 'Roosevelt, Churchill, and Stalin meet at Tehran' },
    { date: '1944-07-20', title: 'German officers\' plot to kill Hitler fails' },
    { date: '1944-08-25', title: 'Paris liberated' },
    { date: '1945-02-04', title: 'Yalta Conference opens' },
    { date: '1945-02-13', title: 'Allied bombers destroy Dresden' },
    { date: '1945-03-07', title: 'U.S. troops capture the Rhine bridge at Remagen' },
    { date: '1945-04-12', title: 'President Roosevelt dies; Harry Truman takes office' },
    { date: '1945-04-25', title: 'American and Soviet troops meet on the Elbe' },
    { date: '1945-04-30', title: 'Hitler kills himself in Berlin' },
    { date: '1945-05-08', title: 'V-E Day: victory in Europe' }
  ];

  const SOURCES = [
    { title: 'Hansard: debates of the House of Commons, 1939–1944', author: 'UK Parliament', year: 1940, url: 'https://api.parliament.uk/historic-hansard/sittings/1940s' },
    { title: 'Nazi Conspiracy and Aggression (documents assembled for the Nuremberg trials)', author: 'Office of U.S. Chief of Counsel for Prosecution of Axis Criminality', year: 1946, url: 'https://archive.org/details/NaziConspiracyAndAggression' },
    { title: 'Trial of the Major War Criminals before the International Military Tribunal, vol. 6', author: 'International Military Tribunal', year: 1947, url: 'https://archive.org/details/trialofmajorwarc6224gori' },
    { title: 'The Halder War Journal', author: 'Franz Halder; U.S. Army translation', year: 1947, url: 'https://archive.org/details/HalderWarJournal' },
    { title: 'The Department of State Bulletin, 1939–1944', author: 'U.S. Department of State', year: 1939, url: 'https://archive.org/details/sim_department-of-state-bulletin_1939-09-09_1_11' },
    { title: 'Yank, the Army Weekly', author: 'U.S. Army', year: 1945, url: 'https://archive.org/details/1945-01-05YankMagazine-nsia' },
    { title: 'Cross-Channel Attack (United States Army in World War II)', author: 'Gordon A. Harrison', year: 1951, url: 'https://archive.org/details/CMHPub741CrossChannelAttack' },
    { title: 'Normandy (U.S. Army Campaigns of World War II)', author: 'U.S. Army Center of Military History', year: 1994, url: 'https://archive.org/details/NormandyCmh72-18' },
    { title: 'The Army at War: Tunisia', author: 'British War Office', year: 1944, url: 'https://archive.org/details/armywartunisia' },
    { title: 'By Air to Battle: The Official Account of the British Airborne Divisions', author: 'British Air Ministry', year: 1945, url: 'https://archive.org/details/byairtobattle' },
    { title: 'War Speeches and Orders of the Day', author: 'J. V. Stalin', year: 1946, url: 'https://archive.org/details/in.ernet.dli.2015.183559' },
    { title: 'The German Attack on the U.S.S.R.', author: 'V. M. Molotov and J. V. Stalin', year: 1941, url: 'https://archive.org/details/TheGermanAttackOnTheU.S.S.R.' },
    { title: 'The Red Army: An Army of the People', author: 'Colonel Fedorov', year: 1943, url: 'https://archive.org/details/federov-the-red-army' },
    { title: 'Patton and His Third Army', author: 'Brenton G. Wallace', year: 1946, url: 'https://archive.org/details/PattonAndHisThirdArmy' },
    { title: 'Strategy for Defeat: The Luftwaffe 1933–1945', author: 'Williamson Murray', year: 1983, url: 'https://archive.org/details/DTIC_ADA421966' },
    { title: 'Weekly Compilation of Presidential Documents, June 5, 1972', author: 'U.S. National Archives', year: 1972, url: 'https://archive.org/details/sim_weekly-compilation-of-presidential-documents_1972-06-05_8_23' },
    { title: 'Days of Remembrance of the Victims of the Holocaust', author: 'U.S. Department of Defense', year: 1988, url: 'https://archive.org/details/DaysOfRemembranceOfTheVictimsOfTheHolocaustOfficeOfTheSecretaryOfDefense1988' },
    { title: 'D-Day Statement to Soldiers, Sailors, and Airmen of the Allied Expeditionary Force', author: 'Dwight D. Eisenhower', year: 1944, url: 'https://en.wikisource.org/wiki/D-Day_Statement_to_Soldiers,_Sailors,_and_Airmen_of_the_Allied_Expeditionary_Force' }
  ];

  const TOURS = [
    {
      id: 'how-germany-was-defeated', title: 'How Was Hitler\'s Germany Defeated?', grades: '6–9', minutes: 30,
      question: 'Germany conquered most of Europe in two years. What turned the war around?',
      summary: 'Seven stops from the invasion of Poland to V-E Day. Students watch Germany win quickly, fail to finish off Britain and the Soviet Union, and then be crushed between enemies advancing from every side.',
      stops: [
        { title: 'War begins', battle: 'poland', entry: 0,
          text: 'Germany invades Poland. Two days later Britain and France declare war, and the British prime minister tells Parliament that everything he worked for has failed.',
          ask: ['Chamberlain had tried for years to avoid war by negotiating with Hitler. How does he sound in this speech?', 'Look at the map. Why was it so hard for Britain and France to help Poland?'] },
        { title: 'Alone', battle: 'dunkirk', entry: 1,
          text: 'France, expected to hold for years, falls in six weeks. Watch the German route on the map: it cuts the Allied armies off from behind.',
          ask: ['Churchill gave this speech after a defeat. What is he trying to do for the people listening?', 'He also said, "Wars are not won by evacuations." Why remind people of that?'] },
        { title: 'The few', battle: 'battle-of-britain', entry: 0,
          text: 'To invade Britain, Germany must first destroy its air force. It cannot.',
          ask: ['Who are "the few," and who are "the many"?', 'Why did it matter so much for the rest of the war that Britain was not conquered in 1940?'] },
        { title: 'The biggest gamble', battle: 'moscow', entry: 1,
          text: 'Hitler turns on his partner, the Soviet Union. Follow the route: 600 miles in five months, and then winter.',
          ask: ['Stalin opens with "Brothers and sisters." He had never addressed the Soviet people that way before. Why now?', 'What stopped the German army outside Moscow? Name more than one thing.'] },
        { title: 'The turning point', battle: 'stalingrad', entry: 0,
          text: 'A year later Germany tries again in the south and reaches the Volga. An entire German army is surrounded.',
          ask: ['What does "there is no land beyond the Volga" mean?', 'Compare the two quotations in the full entry. What did each leader demand of his soldiers?'] },
        { title: 'The second front', battle: 'normandy', entry: 0,
          text: 'For three years the Soviet Union has done most of the fighting on land. On June 6, 1944, the Western Allies land in France.',
          ask: ['Eisenhower also wrote a note in case the landing failed; it is in the full entry. What does it tell you about him?', 'Look at the whole map now. How many directions is Germany being attacked from?'] },
        { title: 'Victory in Europe', battle: 'berlin', entry: 1,
          text: 'The armies from east and west meet in the middle of Germany. Hitler kills himself, and Germany surrenders without conditions.',
          ask: ['Answer the tour question: what turned the war around? Give three reasons, each with evidence from a stop.', 'Truman calls the hour "solemn but glorious." Why both?'] }
      ]
    },
    {
      id: 'reading-the-evidence', title: 'Reading the Evidence', grades: '9–12', minutes: 35,
      question: 'How do we know what happened? What can different kinds of records tell us, and what can they not?',
      summary: 'Six sources of very different kinds: a general\'s private journal, a child\'s diary, a perpetrator\'s report, a soldier-reporter\'s dispatch, a two-word military reply, and courtroom testimony. Students weigh who made each record and why.',
      stops: [
        { title: 'A general\'s private notes', battle: 'dunkirk', entry: 2,
          text: 'Franz Halder, chief of the German army staff, kept a daily journal. He was not writing for the public. American translators published it after the war.',
          ask: ['Halder is angry about an order from Hitler. Why is a private journal useful for seeing disagreements inside a government?', 'This is a translation of a typed copy of shorthand notes. What could go wrong at each step?'] },
        { title: 'A child\'s diary', battle: 'leningrad', entry: 1,
          text: 'Tanya Savicheva was eleven. Her diary is nine pages long, one line to a page.',
          ask: ['Tanya recorded only names, dates, and times. Why can so little say so much?', 'The entry is verified against a speech by an American president who quoted her. What does that tell you about how sources travel?'] },
        { title: 'The perpetrator\'s own report', battle: 'warsaw-ghetto', entry: 1,
          text: 'The SS general who destroyed the Warsaw ghetto bound his daily reports and photographs into an album for his superiors. Prosecutors found it after the war.',
          ask: ['Stroop calls the people he killed "bandits" and "subhumans." Why should a historian quote such language instead of leaving it out?', 'He wrote the report to show off his success. How did the same document end up being used against the Nazi leaders?'] },
        { title: 'A soldier writing for soldiers', battle: 'huertgen-forest', entry: 0,
          text: 'Yank was a weekly magazine written by enlisted men, sold to enlisted men, and published by the Army itself.',
          ask: ['Morriss says there was "no glory" in the battle. Is that what you would expect in a magazine the Army published? What does that suggest?', 'How is a reporter\'s account different from an official report of the same battle?'] },
        { title: 'One word', battle: 'bulge', entry: 1,
          text: 'Surrounded at Bastogne, an American general answers a German demand to surrender.',
          ask: ['The German officers needed the reply explained to them. What does this source show about language and culture in wartime?', 'Why did this reply become famous? What did it do for the people who heard about it?'] },
        { title: 'A witness under oath', battle: 'liberation-of-the-camps', entry: 0,
          text: 'Marie-Claude Vaillant-Couturier survived Auschwitz and Ravensbrück. Less than a year later she testified at Nuremberg, facing the men on trial.',
          ask: ['She describes one small scene, not the whole camp. Why can a single detail be powerful evidence?', 'Compare her testimony with Eisenhower\'s letter in the full entry. Why did he think it was his duty to go and look?'] }
      ]
    },
    {
      id: 'a-war-of-fronts', title: 'A War of Many Fronts', grades: '6–10', minutes: 30,
      question: 'Why did it take armies attacking from three directions to defeat Germany?',
      summary: 'A geography tour. Students follow six campaigns on the terrain map and see how distance, weather, seas, and mountains shaped the war.',
      stops: [
        { title: 'Through the forest', campaign: 'sickle-cut', day: '1940-06-04',
          text: 'In 1940 France expected an attack across the flat country of Belgium. The German tanks came through the hills and forests of the Ardennes instead.',
          ask: ['Why did the French think the Ardennes was safe?', 'What happens to an army when the enemy reaches the sea behind it?'] },
        { title: 'Distance', campaign: 'barbarossa-center', day: '1941-12-02',
          text: 'Follow the German route toward Moscow, and compare its length with the drive across France.',
          ask: ['How much farther is it from the border to Moscow than from the Ardennes to the Channel?', 'Every mile forward was a mile farther from home. What does an army need that has to travel that distance?'] },
        { title: 'The desert seesaw', campaign: 'afrika-korps', day: '1942-11-04',
          text: 'In North Africa the armies chased each other back and forth along one coastal road for two years.',
          ask: ['Why did all the fighting hug the coast?', 'Each side got weaker the farther it advanced. Why?'] },
        { title: 'Up the boot', campaign: 'italy', day: '1944-06-04',
          text: 'Italy is a narrow peninsula with mountains down the middle and rivers running to both coasts.',
          ask: ['Why was Italy easy to defend and slow to conquer?', 'The Allies twice tried landing from the sea behind the German lines. What was the idea?'] },
        { title: 'Across the Channel', campaign: 'overlord', day: '1944-08-25',
          text: 'To reach France, an army of two million had to cross a hundred miles of open water and land on a defended coast.',
          ask: ['What did the Allies need to control before they could invade? Think back to the Battle of the Atlantic and the Battle of Britain.', 'After the breakout the Allies crossed France in a month. What slowed them at the German border?'] },
        { title: 'Closing the ring', campaign: 'vistula-oder', day: '1945-05-02',
          text: 'By 1945 Germany is being invaded from the east, the west, and the south at once.',
          ask: ['Answer the tour question using the map: why three directions?', 'Soviet and American soldiers met on the Elbe River. Find it. What did that meeting mean for Germany?'] }
      ]
    }
  ];

  const VOCAB = [
    { term: 'Allies', def: 'The countries that fought Germany, Italy, and Japan: chiefly Britain, the Soviet Union (from June 1941), and the United States (from December 1941), with France, Poland, Canada, China, and many others.' },
    { term: 'Axis', def: 'Germany, Italy, and Japan, with smaller partners such as Hungary and Romania.' },
    { term: 'Blitzkrieg', def: '"Lightning war": fast attacks by tanks and aircraft working together to break through and surround an enemy before it can react.' },
    { term: 'Front', def: 'The line where two armies face each other; also a whole region of fighting, such as the Eastern Front.' },
    { term: 'Luftwaffe', def: 'The German air force.' },
    { term: 'Red Army', def: 'The army of the Soviet Union.' },
    { term: 'Convoy', def: 'A group of cargo ships sailing together under the protection of warships.' },
    { term: 'Amphibious landing', def: 'An attack from the sea onto a defended shore, using ships, landing craft, and troops together.' },
    { term: 'Ghetto', def: 'A walled or fenced district where the Germans forced Jews to live in crowded, starving conditions before deporting them.' },
    { term: 'Holocaust', def: 'The murder of about six million European Jews by Nazi Germany and its helpers between 1941 and 1945.' },
    { term: 'Concentration camp', def: 'A camp where the Nazis imprisoned people without trial and worked many to death. Killing centers such as Auschwitz-Birkenau and Treblinka were built to murder people on arrival.' },
    { term: 'Resistance', def: 'Secret groups in occupied countries that fought the Germans through sabotage, spying, underground newspapers, and armed uprisings.' },
    { term: 'Unconditional surrender', def: 'Giving up completely, with no promises from the victor in return. The Allies demanded this of Germany from 1943.' },
    { term: 'Primary source', def: 'Evidence created by someone who took part in or witnessed an event, such as a speech, order, diary, report, or courtroom testimony.' }
  ];

  const ADVISORY = [
    'This atlas covers the Holocaust. The entries for the Warsaw Ghetto Uprising and the Liberation of the Camps describe mass murder, and one eyewitness passage describes cremation ovens. Preview them, and plan time to talk.',
    'Two entries quote Nazi documents in the perpetrators\' own words, including dehumanizing terms for their victims. They are quoted as evidence, are labeled as such, and were used to convict their authors.',
    'The photographs chosen for the camps show survivors, not the dead. More graphic images exist in the linked sources.',
    'The Soviet Union signed a pact with Germany in 1939 and invaded Poland alongside it. It appears on the Allied side in this atlas only from June 1941, when Germany attacked it.',
    'The base map shows modern borders and place names. Leningrad is now St. Petersburg, Stalingrad is Volgograd, and Poland, Germany, and the countries of the former Soviet Union have very different borders today.',
    'Casualty figures for the Eastern Front are estimates that vary widely between sources.',
    'German and Russian documents appear in translations made by Allied government translators in the 1940s.'
  ];

  const NOTES = {
    quotes: 'For this atlas every quotation was copied directly from the linked text, so all of them are verified. Soldiers\' memoirs and letters from this war are mostly still under copyright, so the sources here are government records: parliamentary debates, official orders and reports, U.S. government publications including the Army weekly Yank, and documents and testimony from the Nuremberg trials. Contains Parliamentary information licensed under the Open Parliament Licence v3.0.',
    numbers: 'Figures combine killed, wounded, captured, and missing unless an entry says otherwise. Records from this war are far better than for earlier ones on the Western side, but Eastern Front totals, civilian deaths, and German losses in the final months remain estimates that differ between historians.',
    images: 'All are official photographs taken by military photographers of the United States, Britain, the Soviet Union, or Germany, now in the public domain and held by the U.S. National Archives, the Imperial War Museums, or the Library of Congress. Wartime official photographs were often taken, chosen, and captioned to support the war effort, which is itself worth discussing with students.'
  };

  Atlas.register({
    meta: {
      id: 'world-war-2-europe',
      title: 'World War II in Europe and North Africa',
      years: '1939–1945',
      range: { start: '1939-08-15', end: '1945-05-15' },
      bounds: [[29.5, -22.0], [61.0, 46.0]],
      sides: [
        { id: 'allied', name: 'Allied', color: '#2b5797' },
        { id: 'axis', name: 'Axis', color: '#3f3f46' }
      ],
      theaters: ['Western Europe', 'Eastern Front', 'Mediterranean and North Africa', 'Atlantic'],
      intro: 'Army routes draw themselves as the armies advanced and retreated, and a marker appears for each battle as it begins.'
    },
    PORTRAITS, BATTLES, CAMPAIGNS, EVENTS, SOURCES, TOURS, VOCAB, ADVISORY, NOTES
  });
})();
