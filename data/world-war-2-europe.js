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
      tactical: {
        base: "topo",
        bounds: [[47.35, 42.0], [49.95, 45.6]],
        note: "Positions are simplified from standard maps of the campaign. Each bar is an army or a group of armies, drawn where its front stood.",
        places: [
          { name: "Stalingrad", ll: [48.71, 44.51] },
          { name: "Kalach", ll: [48.69, 43.53] },
          { name: "Serafimovich", ll: [49.58, 42.73] },
          { name: "Kletskaya", ll: [49.31, 43.06] },
          { name: "Kotelnikovo", ll: [47.63, 43.15] },
          { name: "Don River", ll: [48.48, 43.25] },
          { name: "Volga River", ll: [49.02, 44.95] }
        ],
        units: {
          r62: { side: "allied", name: "Soviet 62nd Army (Chuikov)", short: "62nd Army" },
          r64: { side: "allied", name: "Soviet 64th Army (Shumilov)", short: "64th Army" },
          swf: { side: "allied", name: "Southwestern Front (Vatutin)", short: "Southwestern Front" },
          donf: { side: "allied", name: "Don Front (Rokossovsky)", short: "Don Front" },
          stf: { side: "allied", name: "Stalingrad Front (Yeremenko)", short: "Stalingrad Front" },
          g2: { side: "allied", name: "Soviet 2nd Guards Army (Malinovsky)", short: "2nd Guards" },
          a6: { side: "axis", name: "German Sixth Army (Paulus)", short: "Sixth Army" },
          pz4: { side: "axis", name: "German Fourth Panzer Army (Hoth)", short: "4th Panzer Army" },
          ro3: { side: "axis", name: "Romanian Third Army", short: "Romanian 3rd" },
          ro4: { side: "axis", name: "Romanian Fourth Army", short: "Romanian 4th" }
        },
        phases: [
          {
            time: "August 23, 1942",
            title: "The Germans reach the Volga",
            text: "German tanks cross the last forty miles from the Don in a single day and reach the Volga just north of Stalingrad. That afternoon and night, bombers set the city on fire, killing thousands of civilians. A second German army closes in from the south. Two Soviet armies fall back into the city with the river at their backs.",
            units: { a6: [[48.95, 44.45], [48.75, 44.25]], pz4: [[48.46, 44.22], [48.3, 44.42]], r62: [[48.86, 44.53], [48.68, 44.42]], r64: [[48.6, 44.42], [48.45, 44.55]] },
            arrows: [
              { side: "axis", pts: [[49.02, 43.95], [48.88, 44.56]] },
              { side: "axis", pts: [[48.1, 44.05], [48.42, 44.32]] }
            ]
          },
          {
            time: "September 13 to November 18",
            title: "The fight for the city",
            text: "For two months the Sixth Army fights its way into Stalingrad, one factory and one cellar at a time. Chuikov's 62nd Army is pushed into a few strips along the river bank and kept alive by boats crossing at night. To feed the battle, the Germans thin out their flanks and leave long stretches to Romanian armies with few tanks or anti-tank guns. Beyond the Don and south of the city, the Red Army quietly gathers a million men.",
            units: {
              a6: [[48.84, 44.58], [48.76, 44.53], [48.7, 44.49]],
              r62: [[48.8, 44.62], [48.71, 44.535]],
              pz4: [[48.66, 44.47], [48.5, 44.52]],
              r64: [[48.6, 44.46], [48.5, 44.56]],
              ro3: [[49.5, 42.2], [49.4, 42.75], [49.25, 43.15]],
              ro4: [[48.25, 44.55], [48.0, 44.65], [47.75, 44.75]],
              swf: [[49.68, 42.3], [49.58, 42.8], [49.42, 43.2]],
              donf: [[49.22, 43.55], [49.1, 44.1], [49.0, 44.6]],
              stf: [[48.35, 44.72], [48.05, 44.85], [47.8, 44.95]]
            }
          },
          {
            time: "November 19",
            title: "Operation Uranus: the northern blow",
            text: "In fog and snow, 3,500 Soviet guns open fire on the Romanian Third Army. Tanks pour out of the bridgeheads at Serafimovich and Kletskaya and by evening are loose in the open country behind the Germans, heading south for the Don crossing at Kalach.",
            units: { swf: [[49.3, 42.3], [49.05, 42.9], [48.98, 43.4]], ro3: null, donf: [[49.15, 43.6], [49.05, 44.1], [48.98, 44.58]] },
            arrows: [
              { side: "allied", pts: [[49.52, 42.85], [48.88, 43.42]] }
            ]
          },
          {
            time: "November 20",
            title: "The southern blow",
            text: "A day later the second arm of the pincer strikes the Romanian Fourth Army among the salt lakes south of the city. It breaks through within hours and turns northwest, toward the same river crossing.",
            units: { stf: [[48.42, 44.35], [48.2, 44.15], [47.9, 44.2]], ro4: null },
            arrows: [
              { side: "allied", pts: [[48.12, 44.78], [48.6, 43.78]] }
            ]
          },
          {
            time: "November 23",
            title: "The trap closes at Kalach",
            text: "The two Soviet spearheads meet near Kalach, forty-five miles west of Stalingrad. About 250,000 German and Romanian soldiers are surrounded in a pocket some thirty-five miles across. Paulus asks to break out. Hitler orders him to stand fast and promises to supply the army by air, which the air force cannot do.",
            units: {
              swf: [[48.75, 42.85], [48.72, 43.25], [48.68, 43.58]],
              stf: [[48.62, 43.68], [48.5, 43.95], [48.45, 44.3]],
              donf: [[49.05, 43.75], [49.0, 44.1], [48.98, 44.55]],
              a6: [[48.93, 44.58], [48.93, 44.05], [48.76, 43.8], [48.58, 43.98], [48.55, 44.4], [48.6, 44.5]],
              pz4: [[47.75, 43.0], [47.6, 43.3]]
            }
          },
          {
            time: "December 12 to 23",
            title: "The rescue attempt fails",
            text: "Hoth's tanks attack from Kotelnikovo to cut a corridor to the trapped army. In a week they fight their way to within thirty miles. There a fresh Soviet army stops them on a small river, and Paulus, short of fuel and bound by Hitler's order, does not move. A new Soviet offensive far to the west then threatens to cut off Hoth as well, and he pulls back.",
            units: {
              pz4: [[48.2, 43.75], [48.12, 44.05]],
              g2: [[48.3, 43.7], [48.24, 44.1]],
              swf: [[48.9, 42.5], [48.6, 42.9], [48.42, 43.15]],
              a6: [[48.92, 44.58], [48.91, 44.08], [48.76, 43.88], [48.6, 44.02], [48.57, 44.4], [48.61, 44.5]]
            },
            arrows: [
              { side: "axis", pts: [[47.68, 43.22], [48.14, 43.88]] }
            ]
          },
          {
            time: "January 10 to February 2, 1943",
            title: "The end of the Sixth Army",
            text: "The Don Front attacks the pocket from the west and takes the airfields, ending the airlift. Starving and frozen, the survivors are squeezed back into the ruins they had fought for all autumn. Paulus surrenders on January 31 and the last holdouts on February 2. About 91,000 men march into captivity.",
            units: { a6: [[48.83, 44.6], [48.8, 44.48], [48.7, 44.45], [48.67, 44.5]], donf: [[48.64, 44.42], [48.76, 44.38], [48.87, 44.5]], pz4: null, g2: null, stf: null },
            arrows: [
              { side: "allied", pts: [[48.76, 43.85], [48.76, 44.34]] }
            ]
          }
        ],
        ask: [
          "Find the two Romanian armies. Why did the Soviet commanders attack there and not at the city itself?",
          "The pincers met at a river crossing behind the German army. What does losing that crossing mean for an army's food, fuel, and ammunition?",
          "The rescue force got within thirty miles. What were the risks of ordering the trapped army to break out, and of ordering it to stay?"
        ]
      },
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
      tactical: {
        base: 'topo',
        bounds: [[49.12, -1.45], [49.52, -0.15]],
        note: 'Positions are simplified. Each bar is a division; it shows roughly where that force stood, not every unit.',
        places: [
          { name: 'Utah', ll: [49.437, -1.085] }, { name: 'Omaha', ll: [49.412, -0.870] }, { name: 'Gold', ll: [49.378, -0.570] }, { name: 'Juno', ll: [49.372, -0.440] }, { name: 'Sword', ll: [49.340, -0.290] },
          { name: 'Sainte-Mère-Église', ll: [49.408, -1.345] }, { name: 'Carentan', ll: [49.300, -1.250] }, { name: 'Pointe du Hoc', ll: [49.408, -0.989] },
          { name: 'Bayeux', ll: [49.268, -0.700] }, { name: 'Caen', ll: [49.170, -0.370] }, { name: 'Pegasus Bridge', ll: [49.230, -0.215] }
        ],
        units: {
          a82: { side: 'allied', name: 'U.S. 82nd Airborne Division', short: '82nd Airborne' },
          a101: { side: 'allied', name: 'U.S. 101st Airborne Division', short: '101st Airborne' },
          d4: { side: 'allied', name: 'U.S. 4th Infantry Division (Utah)', short: '4th Division' },
          omaha: { side: 'allied', name: 'U.S. 1st and 29th Infantry Divisions (Omaha)', short: '1st and 29th' },
          rangers: { side: 'allied', name: 'U.S. 2nd Ranger Battalion', short: 'Rangers' },
          gold: { side: 'allied', name: 'British 50th Division (Gold)', short: 'British 50th' },
          juno: { side: 'allied', name: 'Canadian 3rd Division (Juno)', short: 'Canadian 3rd' },
          sword: { side: 'allied', name: 'British 3rd Division (Sword)', short: 'British 3rd' },
          a6: { side: 'allied', name: 'British 6th Airborne Division', short: '6th Airborne' },
          g709: { side: 'axis', name: 'German 709th Division', short: '709th' },
          g352: { side: 'axis', name: 'German 352nd Division', short: '352nd' },
          g716: { side: 'axis', name: 'German 716th Division', short: '716th' },
          pz21: { side: 'axis', name: '21st Panzer Division', short: '21st Panzer' }
        },
        phases: [
          { time: 'June 6, after midnight', title: 'The airborne landings',
            text: 'More than 23,000 paratroopers and glider troops drop at both ends of the invasion coast to seize bridges, road junctions, and the exits from the beaches. The American drops are badly scattered in the dark. Offshore, 5,000 ships wait for dawn.',
            units: { a82: [[49.422, -1.332], [49.396, -1.306]], a101: [[49.382, -1.252], [49.332, -1.240]], a6: [[49.248, -0.262], [49.228, -0.238]],
              g709: [[49.455, -1.228], [49.385, -1.188]], g352: [[49.378, -0.960], [49.338, -0.640]], g716: [[49.328, -0.600], [49.285, -0.270]], pz21: [[49.150, -0.400], [49.130, -0.280]],
              d4: [[49.470, -1.050], [49.435, -1.030]], omaha: [[49.445, -0.930], [49.435, -0.830]], gold: [[49.415, -0.620], [49.405, -0.520]], juno: [[49.405, -0.470], [49.395, -0.385]], sword: [[49.375, -0.330], [49.365, -0.262]] } },
          { time: '6:30 a.m.', title: 'H-Hour on the American beaches',
            text: 'At Utah, strong currents push the landing a mile south of the target, onto a lightly defended stretch, and the 4th Division gets ashore with few losses. At Omaha the bombers have missed, the swimming tanks have sunk, and the first waves are cut down below 100-foot bluffs. Rangers scale the cliffs of Pointe du Hoc with ropes.',
            units: { d4: [[49.428, -1.182], [49.400, -1.168]], omaha: [[49.386, -0.928], [49.362, -0.842]], rangers: [[49.398, -0.992], [49.394, -0.985]] },
            arrows: [{ side: 'allied', pts: [[49.440, -0.880], [49.380, -0.884]] }] },
          { time: '7:30 a.m.', title: 'The British and Canadian beaches',
            text: 'An hour later, on a rising tide, British and Canadian troops land on Gold, Juno, and Sword behind specialized tanks that clear mines and bridge ditches. At Juno a third of the landing craft hit obstacles, but the Canadians are through the sea wall within an hour.',
            units: { gold: [[49.346, -0.622], [49.339, -0.522]], juno: [[49.339, -0.482], [49.331, -0.392]], sword: [[49.306, -0.332], [49.296, -0.272]] } },
          { time: 'Noon', title: 'Off the beaches',
            text: 'At Omaha, small groups led by sergeants and junior officers climb the bluffs between the German strongpoints and attack them from behind. At Utah the infantry joins hands with the paratroopers. Farther east the British and Canadians push inland, and German tanks start north from Caen.',
            units: { omaha: [[49.374, -0.922], [49.351, -0.846]], d4: [[49.416, -1.236], [49.386, -1.216]], gold: [[49.321, -0.632], [49.306, -0.522]], juno: [[49.306, -0.482], [49.291, -0.402]], sword: [[49.276, -0.342], [49.266, -0.282]],
              g352: [[49.345, -0.955], [49.310, -0.700]], g716: [[49.280, -0.560], [49.244, -0.300]], pz21: [[49.232, -0.402], [49.216, -0.342]] } },
          { time: '4 to 8 p.m.', title: 'The only counterattack',
            text: 'The 21st Panzer Division, the one German armored force close to the beaches, drives into the gap between Juno and Sword and reaches the sea. Then hundreds of gliders pass overhead bringing British reinforcements, and the tanks, fearing they will be cut off, pull back.',
            units: { pz21: [[49.300, -0.368], [49.280, -0.352]] },
            arrows: [{ side: 'axis', pts: [[49.225, -0.372], [49.305, -0.360]] }] },
          { time: 'Midnight', title: 'A foothold in France',
            text: 'By the end of the day about 156,000 Allied troops are ashore. None of the beachheads has reached its planned line, and Caen, a first-day objective, will not fall for six weeks. But the Atlantic Wall has been broken in a single day.',
            units: { d4: [[49.432, -1.262], [49.372, -1.226]], a101: [[49.360, -1.242], [49.322, -1.202]], omaha: [[49.368, -0.932], [49.345, -0.832]], gold: [[49.300, -0.682], [49.285, -0.542]], juno: [[49.280, -0.492], [49.262, -0.402]], sword: [[49.262, -0.346], [49.250, -0.272]],
              pz21: [[49.216, -0.402], [49.206, -0.322]], g716: null, g352: [[49.335, -0.930], [49.300, -0.720]], g709: [[49.470, -1.300], [49.450, -1.200]] } }
        ],
        ask: ['Compare Utah and Omaha on the map. What about the ground made Omaha so much harder?', 'Why drop paratroopers at the two ends of the landing area and not in the middle?', 'Only one German armored division attacked on June 6. What might have happened if more had been close to the coast?']
      },
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
      tactical: {
        base: "topo",
        bounds: [[49.6, 4.75], [50.72, 6.62]],
        note: "Positions are simplified from standard maps of the battle. Each bar is a division, a corps, or an army, drawn where its front stood.",
        places: [
          { name: "Bastogne", ll: [50.0, 5.72] },
          { name: "St. Vith", ll: [50.28, 6.13] },
          { name: "Malmedy", ll: [50.43, 6.03] },
          { name: "Elsenborn Ridge", ll: [50.48, 6.2] },
          { name: "La Gleize", ll: [50.41, 5.85] },
          { name: "Celles", ll: [50.23, 5.01] },
          { name: "Dinant", ll: [50.26, 4.91] },
          { name: "Houffalize", ll: [50.13, 5.79] },
          { name: "Liège", ll: [50.64, 5.57] },
          { name: "Echternach", ll: [49.81, 6.42] },
          { name: "Meuse River", ll: [50.42, 4.83] }
        ],
        units: {
          u99: { side: "allied", name: "U.S. 99th and 2nd Infantry Divisions", short: "99th and 2nd" },
          u106: { side: "allied", name: "U.S. 106th Infantry Division", short: "106th" },
          u28: { side: "allied", name: "U.S. 28th Infantry Division", short: "28th" },
          u4: { side: "allied", name: "U.S. 4th Infantry Division", short: "4th" },
          a7: { side: "allied", name: "U.S. 7th Armored Division", short: "7th Armored" },
          a101: { side: "allied", name: "U.S. 101st Airborne Division", short: "101st Airborne" },
          vii: { side: "allied", name: "U.S. VII Corps (Collins)", short: "VII Corps" },
          pat: { side: "allied", name: "U.S. Third Army (Patton)", short: "Third Army" },
          g6: { side: "axis", name: "Sixth Panzer Army (Dietrich)", short: "6th Panzer Army" },
          g5: { side: "axis", name: "Fifth Panzer Army (Manteuffel)", short: "5th Panzer Army" },
          g7: { side: "axis", name: "Seventh Army (Brandenberger)", short: "7th Army" }
        },
        phases: [
          {
            time: "December 16, 1944, 5:30 a.m.",
            title: "The attack in the fog",
            text: "The Ardennes is a quiet sector. Four American divisions, some worn out and some brand new, hold eighty miles of forest. Before dawn, in fog that grounds every Allied aircraft, three German armies hit them. The plan is to cross the Meuse River and drive on to the port of Antwerp, splitting the Allied armies in two.",
            units: {
              u99: [[50.54, 6.26], [50.4, 6.33]],
              u106: [[50.33, 6.36], [50.18, 6.3]],
              u28: [[50.15, 6.16], [49.93, 6.2]],
              u4: [[49.9, 6.25], [49.8, 6.45]],
              g6: [[50.55, 6.4], [50.38, 6.45]],
              g5: [[50.33, 6.47], [50.18, 6.42], [50.02, 6.28]],
              g7: [[49.98, 6.3], [49.8, 6.52]]
            }
          },
          {
            time: "December 17 to 19",
            title: "The shoulders hold, the center breaks",
            text: "In the north the Americans fall back to Elsenborn Ridge and stop the strongest German army cold. One armored column slips past them, and near Malmedy its men shoot 84 American prisoners. In the center the line gives way: about 7,000 men of the 106th Division are surrounded and surrender. Reinforcements race for the two road junctions the Germans need, the 7th Armored Division to St. Vith and the 101st Airborne to Bastogne.",
            units: {
              u99: [[50.52, 6.22], [50.44, 6.16]],
              u106: null,
              a7: [[50.31, 6.17], [50.25, 6.17]],
              u28: [[50.08, 5.95], [49.95, 5.92]],
              a101: [[50.04, 5.72], [50.0, 5.78], [49.97, 5.72]],
              u4: [[49.86, 6.25], [49.76, 6.42]],
              g6: [[50.5, 6.3], [50.4, 6.0], [50.4, 5.87]],
              g5: [[50.3, 6.22], [50.15, 5.95], [50.02, 5.85]],
              g7: [[49.95, 6.05], [49.85, 6.3], [49.8, 6.45]]
            },
            arrows: [
              { side: "axis", pts: [[50.38, 6.38], [50.39, 5.92]] }
            ]
          },
          {
            time: "December 20 to 22",
            title: "Bastogne surrounded",
            text: "German tanks flow around Bastogne and cut it off. Asked to surrender, the American commander, Brig. Gen. Anthony McAuliffe, sends a one-word reply: \"Nuts!\" St. Vith holds for six days before its defenders pull back, which wrecks the German timetable. In the north the armored column that broke through is trapped at La Gleize and out of fuel. To the south, Patton turns three divisions ninety degrees and starts them north through the snow.",
            units: {
              a7: [[50.33, 5.86], [50.27, 5.86]],
              u28: null,
              g6: [[50.5, 6.28], [50.4, 6.05], [50.36, 5.9]],
              g5: [[50.28, 5.7], [50.15, 5.4], [49.98, 5.55]],
              vii: [[50.4, 5.15], [50.32, 5.45]],
              pat: [[49.72, 5.5], [49.72, 5.85], [49.72, 6.15]]
            },
            arrows: [
              { side: "axis", pts: [[50.1, 5.9], [50.16, 5.45]] }
            ]
          },
          {
            time: "December 23 to 26",
            title: "The skies clear",
            text: "On December 23 the weather breaks. Allied fighter-bombers swarm over the German columns, and transports drop supplies into Bastogne. The leading German tanks reach Celles, four miles from the Meuse, with empty fuel tanks, and are destroyed there on Christmas Day. On December 26, Patton's tanks break through to Bastogne.",
            units: { g5: [[50.3, 5.65], [50.23, 5.03], [50.12, 5.25], [50.0, 5.55]], vii: [[50.3, 5.03], [50.28, 5.3]], pat: [[49.9, 5.55], [49.975, 5.72], [49.9, 6.05]], g7: [[49.93, 5.95], [49.85, 6.28], [49.8, 6.45]] },
            arrows: [
              { side: "allied", pts: [[49.76, 5.66], [49.96, 5.71]] }
            ]
          },
          {
            time: "January 3 to 16, 1945",
            title: "Squeezing out the bulge",
            text: "The Americans attack the bulge from both sides, the First Army from the north and the Third Army from the south, through deep snow and the coldest weather of the winter. On January 16 the two armies meet at Houffalize. Most of the Germans have already slipped out, but they have left behind tanks and guns they cannot replace.",
            units: {
              g6: [[50.45, 6.15], [50.33, 6.0]],
              g5: [[50.25, 5.95], [50.13, 5.86], [50.02, 5.95]],
              g7: [[49.98, 6.0], [49.88, 6.25], [49.8, 6.45]],
              vii: [[50.26, 5.7], [50.16, 5.78]],
              pat: [[50.1, 5.77], [50.0, 5.88], [49.9, 6.15]],
              a7: [[50.36, 6.0], [50.3, 5.98]],
              a101: [[50.08, 5.8], [50.04, 5.84], [50.0, 5.82]]
            },
            arrows: [
              { side: "allied", pts: [[50.3, 5.62], [50.15, 5.78]] },
              { side: "allied", pts: [[49.98, 5.72], [50.11, 5.78]] }
            ]
          },
          {
            time: "January 25",
            title: "Back where it began",
            text: "Six weeks after the attack, the front is back on the line of December 16. The battle cost the Americans about 90,000 casualties, more than any other they fought in the war. Germany lost about as many men, along with the last reserves it had for defending the Rhine.",
            units: {
              g6: [[50.55, 6.4], [50.38, 6.45]],
              g5: [[50.33, 6.47], [50.18, 6.42], [50.02, 6.28]],
              g7: [[49.98, 6.3], [49.8, 6.52]],
              u99: [[50.54, 6.26], [50.4, 6.33]],
              a7: [[50.33, 6.36], [50.22, 6.3]],
              vii: null,
              a101: null,
              pat: [[50.15, 6.16], [49.98, 6.18], [49.9, 6.25]],
              u4: [[49.88, 6.27], [49.8, 6.45]]
            }
          }
        ],
        ask: [
          "Find St. Vith and Bastogne. Why do road junctions matter so much in hilly, forested country in winter?",
          "The bulge grew long but stayed narrow. How did holding the \"shoulders\" at Elsenborn Ridge and Echternach limit the attack?",
          "The weather cleared on December 23. Why did that matter far more to one side than the other?"
        ]
      },
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

  // 3D objects: museum scans and a few labeled modern models. See README, "3D objects".
  const OBJECTS = [
    {
      "src": "sketchfab",
      "ref": "ef1c28c8cb874a3085a489d0a88bc7c5",
      "thumb": "https://media.sketchfab.com/models/ef1c28c8cb874a3085a489d0a88bc7c5/thumbnails/d56d5338ca5c42bd89dd5798038ebc3f/180ce91a0f874720a729a108593dc5d7.jpeg",
      "link": "https://sketchfab.com/3d-models/us-soldier-ww2-3d-printable-free-ef1c28c8cb874a3085a489d0a88bc7c5",
      "license": "CC BY 4.0",
      "by": "Andy Woodhead",
      "id": "american-infantryman",
      "group": "soldiers",
      "kind": "model",
      "title": "American infantryman",
      "date": "Modern model",
      "holder": "Digital sculpture by Andy Woodhead",
      "text": "A digital sculpture of a U.S. soldier of the Second World War with his helmet, rifle, and field gear. This is a modern artist's reconstruction, not a museum object. Treat it the way you would an illustration in a textbook.",
      "look": [
        "List everything he carries. A rifleman's load could weigh sixty pounds or more. What would you leave behind?",
        "Compare him with the photographs of real soldiers in this atlas. What looks right? What is missing?"
      ]
    },
    {
      "src": "sketchfab",
      "ref": "397e6dd2d78b418db89dd28a2a335d65",
      "thumb": "https://media.sketchfab.com/models/397e6dd2d78b418db89dd28a2a335d65/thumbnails/fe1bd0f5f9704113870e6cedf0100853/720x405.jpeg",
      "license": "CC0",
      "by": "Virtual Museums of Małopolska",
      "id": "warsaw-dog-tag",
      "group": "soldiers",
      "kind": "artifact",
      "title": "Identity tag from the Warsaw Uprising",
      "date": "1944",
      "holder": "Museum of the Home Army, Kraków. Scanned by Virtual Museums of Małopolska",
      "text": "A soldier's identity tag from the Warsaw Uprising of 1944, when the Polish Home Army rose against the German occupation of the capital. The museum records its owner as K. Piotrowski.",
      "look": [
        "Why does an army give each soldier a tag like this?",
        "The Home Army was an underground force, not a regular army. What does it mean that it issued identity tags at all?"
      ],
      "battle": "warsaw-uprising",
      "record": "https://muzea.malopolska.pl/en/objects-list/610",
      "link": "https://sketchfab.com/3d-models/k-piotrowskis-dog-tag-from-the-warsaw-uprising-397e6dd2d78b418db89dd28a2a335d65"
    },
    {
      "src": "sketchfab",
      "ref": "1be4bb0f8c05423abdccb50b779de6e6",
      "thumb": "https://media.sketchfab.com/models/1be4bb0f8c05423abdccb50b779de6e6/thumbnails/9c739b20e7da404e86c5a8a0c915c269/a29ce9a49213404da855036208fc1596.jpeg",
      "link": "https://sketchfab.com/3d-models/m1-garand-us-rifle-caliber-30-m1-1be4bb0f8c05423abdccb50b779de6e6",
      "license": "CC BY 4.0",
      "by": "Sky_Hunter",
      "id": "m1-rifle",
      "group": "weapons",
      "kind": "model",
      "title": "M1 rifle (the Garand)",
      "date": "Modern model",
      "holder": "Digital model by Sky_Hunter",
      "text": "A digital model of the standard American rifle of the war. It was semi-automatic: eight shots as fast as the soldier could pull the trigger, at a time when most other armies' riflemen still worked a bolt by hand between shots. This is a modern artist's reconstruction, not a museum object. Treat it the way you would an illustration in a textbook.",
      "look": [
        "What advantage does a semi-automatic rifle give a squad in the first seconds of a fight?",
        "A better rifle did not decide the war. Looking at the map, what did?"
      ]
    },
    {
      "src": "sketchfab",
      "ref": "b6fae5960d4d41dd8b05320539468a16",
      "thumb": "https://media.sketchfab.com/models/b6fae5960d4d41dd8b05320539468a16/thumbnails/ac4ef19faac5467db58484654961d931/8130ecacae814e06baf53022d9b9cefd.jpeg",
      "link": "https://sketchfab.com/3d-models/sherman-tank-ww2-idaho-military-history-museum-b6fae5960d4d41dd8b05320539468a16",
      "license": "CC BY 4.0",
      "by": "Anticipateants",
      "id": "sherman-tank",
      "group": "weapons",
      "kind": "artifact",
      "title": "M4 Sherman tank",
      "date": "1942–1945",
      "holder": "Idaho Military History Museum. Photo scan by Anticipateants",
      "text": "A photo scan of a real Sherman, the main American tank of the war, on display outside the Idaho Military History Museum. American factories built about 50,000 of them. The heaviest German tanks had thicker armor and bigger guns, but there were never enough of them.",
      "look": [
        "Walk around the tank. Where would the five crewmen sit, and what could each one see?",
        "Germany built better heavy tanks and still lost. Use the numbers to explain why."
      ]
    },
    {
      "src": "sketchfab",
      "ref": "e2edab27282d415db2351a47d164744b",
      "thumb": "https://media.sketchfab.com/models/e2edab27282d415db2351a47d164744b/thumbnails/8d511e11265e4931ad7dda09fedf6396/9501582a20164ee99c4fd25db4774b14.jpeg",
      "link": "https://sketchfab.com/3d-models/lcvp-higgins-boat-e2edab27282d415db2351a47d164744b",
      "license": "CC BY 4.0",
      "by": "Thomas Visonà",
      "id": "higgins-boat",
      "group": "weapons",
      "kind": "model",
      "title": "Landing craft (LCVP, the \"Higgins boat\")",
      "date": "Modern model",
      "holder": "Digital model by Thomas Visonà",
      "text": "A digital model of the flat-bottomed boat that carried about thirty-six soldiers at a time from ship to beach and dropped its bow ramp in the surf. Thousands were built in New Orleans, largely of plywood. This is a modern artist's reconstruction, not a museum object. Treat it the way you would an illustration in a textbook.",
      "look": [
        "When the ramp drops, which way are the soldiers facing, and what is in front of them?",
        "Why did the Allies need a boat like this before they could invade France at all?"
      ],
      "battle": "normandy"
    },
    {
      "src": "sketchfab",
      "ref": "14289ea5b4104fefb74c8f65c9e350cc",
      "thumb": "https://media.sketchfab.com/models/14289ea5b4104fefb74c8f65c9e350cc/thumbnails/c97d5189d81540f4884fd2db49a4730b/640x360.jpeg",
      "license": "CC0",
      "by": "Virtual Museums of Małopolska",
      "id": "airdrop-capsule",
      "group": "weapons",
      "kind": "artifact",
      "title": "Airdrop container for the Polish resistance",
      "date": "1941–1944",
      "holder": "Museum of the Home Army, Kraków. Scanned by Virtual Museums of Małopolska",
      "text": "A metal drum of the kind dropped by parachute from Allied aircraft to supply the Home Army, the underground army in occupied Poland. The museum calls it a \"little cell.\"",
      "look": [
        "What would you pack in a drum this size for people fighting an occupation?",
        "Look at the map. How far did an aircraft have to fly from Britain or Italy to reach Warsaw, and over whose territory?"
      ],
      "battle": "warsaw-uprising",
      "record": "https://muzea.malopolska.pl/en/objects-list/591",
      "link": "https://sketchfab.com/3d-models/drum-like-airdrop-capsule-little-cell-14289ea5b4104fefb74c8f65c9e350cc"
    },
    {
      "src": "si",
      "ref": "3d_package:0a0dc543-3c9b-421d-95fe-5f60f23addab",
      "orientation": "-88.62deg -0.32deg -90.83deg",
      "glb": "https://3d-api.si.edu/content/document/3d_package:0a0dc543-3c9b-421d-95fe-5f60f23addab/Camilla_Gottliebs_Suitcase-150k-2048-medium.glb",
      "glbHi": "https://3d-api.si.edu/content/document/3d_package:0a0dc543-3c9b-421d-95fe-5f60f23addab/Camilla_Gottliebs_Suitcase-150k-4096-high.glb",
      "thumb": "https://3d-api.si.edu/content/document/3d_package:0a0dc543-3c9b-421d-95fe-5f60f23addab/Camilla_Gottliebs_Suitcase-image-low.jpg",
      "kind": "artifact",
      "license": "CC0",
      "id": "gottlieb-suitcase",
      "group": "civilians",
      "title": "Camilla Gottlieb's suitcase",
      "date": "1930s–1940s",
      "holder": "National Museum of American History",
      "link": "https://n2t.net/ark:/65665/ng49ca746ad-9266-704b-e053-15f76fa0b4fa",
      "text": "A plain brown canvas suitcase that belonged to Camilla Gottlieb, a Jewish woman whose ordinary life in Vienna was put in danger when Germany annexed Austria in 1938. The Smithsonian's own viewer, linked below, tells her family's story in chapters, from before the war through survival and reunion.",
      "look": [
        "If you had to leave home with one suitcase, what would you put in it?",
        "Open the Smithsonian's viewer and read the chapters. How does one family's story change the way you read the numbers in this atlas?"
      ]
    },
    {
      "src": "sketchfab",
      "ref": "96ddd0a0db704dceb8b15ff1b5fdb4ea",
      "thumb": "https://media.sketchfab.com/models/96ddd0a0db704dceb8b15ff1b5fdb4ea/thumbnails/7a2c0ca9f93049ab9b0de619f282c220/17be824f37c643cc9fc793555a3889b5.jpeg",
      "license": "CC0",
      "by": "Virtual Museums of Małopolska",
      "id": "tischlerstrasse-sign",
      "group": "civilians",
      "kind": "artifact",
      "title": "German street sign from Oświęcim",
      "date": "1939",
      "holder": "Auschwitz Jewish Centre. Scanned by Virtual Museums of Małopolska",
      "text": "When Germany annexed the Polish town of Oświęcim in 1939, it renamed the town Auschwitz and replaced the Polish street names with German ones. Stolarska Street became Tischlerstraße. This sign was found in 2004 during the excavation of the site of the town's Great Synagogue.",
      "look": [
        "Why would an occupying power bother to change the street signs?",
        "Before the war this was an ordinary town where Jews and Catholics lived side by side. How does knowing that change what the name Auschwitz means to you?"
      ],
      "record": "https://muzea.malopolska.pl/en/objects-list/2064",
      "link": "https://sketchfab.com/3d-models/street-sign-for-tischlerstrae-96ddd0a0db704dceb8b15ff1b5fdb4ea"
    },
    {
      "src": "sketchfab",
      "ref": "057658eddc6a4729af79b02ca1e68513",
      "thumb": "https://media.sketchfab.com/models/057658eddc6a4729af79b02ca1e68513/thumbnails/9a9ccefb11be4421b0ea2e3b1da30703/63283dd19da84f0ba73fbbdee7646e4a.jpeg",
      "license": "CC BY 4.0",
      "by": "Virtual Museums of Małopolska",
      "id": "liebermann-watch",
      "group": "civilians",
      "kind": "artifact",
      "title": "Joachim Liebermann's pocket watch",
      "date": "Early 1900s",
      "holder": "Auschwitz Jewish Centre. Scanned by Virtual Museums of Małopolska",
      "text": "Before the war the Liebermann family were part owners of a roofing-paper factory in Brzezinka, the village the Germans would rename Birkenau. In 1939 the family fled east ahead of the invasion. This watch is one of the things that remains.",
      "look": [
        "Why do museums keep ordinary things like a watch?",
        "What questions about the Liebermann family does this object leave unanswered? Where would you look for answers?"
      ],
      "record": "https://muzea.malopolska.pl/en/objects-list/2059",
      "link": "https://sketchfab.com/3d-models/joachim-liebermanns-pocket-watch-057658eddc6a4729af79b02ca1e68513"
    }
  ];

  // MEDIA:BEGIN (written by tools/media/write_media.py; edit there, not here)
  // Newspaper clippings are from the Library of Congress, Chronicling America. Newsreels are Universal Newsreels held by the U.S. National Archives.
  const MEDIA = {
    papers: {
      dunkirk: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1940-06-02", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1picasso_ver01:data:sn83045462:00280602267:1940060201:0107/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1940-06-02/ed-1/?sp=1&q=dunkerque" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1940-06-04", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_herring_ver01:data:sn83045499:00393342213:1940060401:0239/pct:66.00,40.72,34.00,33.28/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1940-06-04/ed-1/?sp=1&q=dunkerque" }
      ],
      "battle-of-britain": [
        { paper: "The Nome Nugget", place: "Nome, Alaska", date: "1940-09-16", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_belugawhale_ver01:data:sn84020662:00414185563:1940091601:1298/pct:0.00,28.06,34.00,28.37/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn84020662/1940-09-16/ed-1/?sp=1&q=raf" }
      ],
      leningrad: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1944-01-27", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1zox_ver01:data:sn83045462:00280604008:1944012701:0362/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1944-01-27/ed-1/?sp=1&q=leningrad" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1944-01-27", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342304:1944012701:0145/pct:50.66,58.35,34.00,33.46/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1944-01-27/ed-1/?sp=1&q=leningrad" }
      ],
      stalingrad: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1943-02-02", page: 2, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1xul_ver01:data:sn83045462:0028060334A:1943020201:0165/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1943-02-02/ed-1/?sp=2&q=stalingrad" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1943-02-03", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342286:1943020301:0175/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045499/1943-02-03/ed-1/?sp=1&q=stalingrad" }
      ],
      poland: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1939-09-02", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1oldenburg_ver01:data:sn83045462:00280602486:1939090201:0531/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1939-09-02/ed-1/?sp=1&q=warsaw" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1939-09-01", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_herring_ver01:data:sn83045499:00393342390:1939090101:0007/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045499/1939-09-01/ed-1/?sp=1&q=warsaw" }
      ],
      moscow: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1941-06-22", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1stella_ver01:data:sn83045462:00280602887:1941062201:0252/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1941-06-22/ed-1/?sp=1&q=soviet" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1941-06-23", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342249:1941062301:0367/pct:66.00,66.32,34.00,33.68/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1941-06-23/ed-1/?sp=1&q=russia" }
      ],
      "el-alamein": [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1942-11-05", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1warhol_ver01:data:sn83045462:00280603272:1942110501:0281/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1942-11-05/ed-1/?sp=1&q=egypt" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1942-11-05", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342274:1942110501:0649/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045499/1942-11-05/ed-1/?sp=1&q=rommel" }
      ],
      tunisia: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1943-05-07", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1young_ver01:data:sn83045462:00280603417:1943050701:0598/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1943-05-07/ed-1/?sp=1&q=tunis" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1943-05-08", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342286:1943050801:0661/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045499/1943-05-08/ed-1/?sp=1&q=tunis" }
      ],
      kursk: [
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1943-07-08", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342298:1943070801:0037/pct:0.00,39.38,34.00,33.38/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1943-07-08/ed-1/?sp=1&q=kursk" }
      ],
      sicily: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1943-07-11", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1young_ver01:data:sn83045462:00280604070:1943071101:0438/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1943-07-11/ed-1/?sp=1&q=sicily" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1943-07-10", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342298:1943071001:0049/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045499/1943-07-10/ed-1/?sp=1&q=sicily" }
      ],
      "cassino-anzio": [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1944-06-05", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1quidor_ver01:data:sn83045462:00280603697:1944060501:0432/pct:3.07,18.69,34.00,30.34/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045462/1944-06-05/ed-1/?sp=1&q=rome" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1944-06-05", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342304:1944060501:0811/pct:22.05,46.82,34.00,33.33/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1944-06-05/ed-1/?sp=1&q=rome" }
      ],
      normandy: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1944-06-06", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1quidor_ver01:data:sn83045462:00280603697:1944060601:0465/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1944-06-06/ed-1/?sp=1&q=invasion" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1944-06-07", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342304:1944060701:0823/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045499/1944-06-07/ed-1/?sp=1&q=france" }
      ],
      bagration: [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1944-07-04", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1quidor_ver01:data:sn83045462:00280603727:1944070401:0118/pct:0.00,0.00,100.00,42.00/640,/0/default.jpg", wide: true, url: "https://www.loc.gov/resource/sn83045462/1944-07-04/ed-1/?sp=1&q=minsk" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1944-07-03", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342134:1944070301:0013/pct:0.00,28.38,34.00,33.66/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1944-07-03/ed-1/?sp=1&q=minsk" }
      ],
      "warsaw-uprising": [
        { paper: "Evening Star", place: "Washington, D.C.", date: "1944-08-04", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:dlc:batch_dlc_1quidor_ver01:data:sn83045462:00280603739:1944080401:0516/pct:26.07,24.06,34.00,30.35/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045462/1944-08-04/ed-1/?sp=1&q=warsaw" },
        { paper: "The Daily Alaska Empire", place: "Juneau, Alaska", date: "1944-08-02", page: 1, clip: "https://tile.loc.gov/image-services/iiif/service:ndnp:ak:batch_ak_ixoreus_ver01:data:sn83045499:00393342134:1944080201:0163/pct:8.18,54.17,34.00,33.26/520,/0/default.jpg", url: "https://www.loc.gov/resource/sn83045499/1944-08-02/ed-1/?sp=1&q=warsaw" }
      ]
    },
    reels: {
      poland: [
        { id: "1939-09-04_Special_Release_Europe_At_War", title: "Special Release: Europe at War!", date: "1939-09-04", minutes: 9, silent: true, text: "Rushed into theaters three days after the invasion: German troops enter Poland, Britain and France declare war, London's children are sent to the countryside, and French soldiers leave for the front. This copy has no sound." }
      ],
      "battle-of-britain": [
        { id: "1940-12-31_Roosevelt_Warns_Of_Danger_If_Nazis_Win_War", title: "Roosevelt Warns of Danger to U.S. if Nazis Win War", date: "1940-12-31", minutes: 4, text: "Three months after the height of the Battle of Britain, President Roosevelt tells Americans by radio that the United States must arm Britain. A second story shows a German attack on a British convoy in the North Sea." }
      ],
      moscow: [
        { id: "1941-06-23_Nazis_War_On_Russia", title: "Nazis War on Russia", date: "1941-06-23", minutes: 4, text: "Released the day after Germany invaded the Soviet Union. No film of the fighting had arrived, so the newsreel uses older pictures of the Red Army, then shows the Soviet ambassador and American officials reacting in Washington. An unrelated Canadian story ends the reel." }
      ],
      atlantic: [
        { id: "1942-10-19_Big_Convoy_To_Russia", title: "Big Convoy to Russia Beats Off Nazis", date: "1942-10-19", minutes: 6, text: "German bombers attack an Allied convoy carrying supplies to the Soviet Union around the north of Norway. Shorter stories follow: a tax bill in Washington, an army mascot in Australia, and tanks for the British Eighth Army." }
      ],
      kursk: [
        { id: "1943-09-02_Reds_Rout_Nazis", title: "Reds Rout Nazis", date: "1943-09-02", minutes: 2, text: "Soviet film of the Red Army advancing in the summer of 1943, after the German defeat at Kursk: artillery, tanks, cavalry, and a plane shot down. It shows wounded and dead soldiers." }
      ],
      "cassino-anzio": [
        { id: "1944-06-15_First_Pictures_Of_Romes_Capture", title: "First Pictures of Rome's Capture", date: "1944-06-15", minutes: 4, text: "Captured German film shows American and British prisoners from Anzio paraded past the Colosseum. Then the Allies enter Rome, and crowds cheer General Mark Clark." }
      ],
      normandy: [
        { id: "1944-06-12_First_Pictures_Invasion_of_France", title: "First Pictures: Invasion of France", date: "1944-06-12", minutes: 8, text: "The first film of D-Day to reach American theaters, six days after the landings: bombers, paratroopers boarding their planes, the invasion fleet, assault boats heading for shore, prisoners, and the wounded returning to England." },
        { id: "1944-06-06_Eve_of_Battle", title: "Eve of Battle", date: "1944-06-06", minutes: 19, text: "Released on D-Day itself, before any film of the landings existed. Made with the War Department, it shows the months of preparation in Britain." }
      ],
      "market-garden": [
        { id: "1944-09-28_Battle_Rages_Along_Nazi_Wall", title: "Battle Rages Along Nazi Wall", date: "1944-09-28", minutes: 6, text: "American, British, and Polish paratroopers and glider troops land in Holland, and British tanks reach them at Eindhoven. The reel shows only the early success: it came out three days after the survivors were pulled back from Arnhem. Later stories show American troops entering Germany and French towns being freed." }
      ],
      bulge: [
        { id: "1945-01-11_German_Drive_Rolled_Back_By_Allies", title: "German Drive Rolled Back by Allies", date: "1945-01-11", minutes: 4, text: "American troops lay mines and set up roadblocks, the weather clears and Allied bombers return, supplies are parachuted into Bastogne, and Patton's tanks break through to the ruined town." },
        { id: "1944-12-20_Allies_Fight_Fierce_Nazi_Counter-Blow", title: "Allies Fight Fierce Nazi Counter-Blow", date: "1944-12-20", minutes: 7, text: "Released four days into the battle, before any film had come back from the Ardennes. It uses captured German newsreels to show how Germany prepared the attack. Unrelated stories follow." }
      ],
      berlin: [
        { id: "1945-05-08_Germany_Gives_Up", title: "Germany Gives Up", date: "1945-05-08", minutes: 7, text: "President Truman announces Germany's surrender on V-E Day. The rest of the reel looks back over the rise and fall of Nazi Germany, from 1933 to 1945. Parts of this copy are silent." }
      ]
    }
  };
  // MEDIA:END

  Atlas.register({
    meta: {
      id: 'world-war-2-europe',
      title: 'World War II in Europe and North Africa',
      years: '1939–1945',
      range: { start: '1939-08-15', end: '1945-05-15' },
      bounds: [[29.5, -22.0], [61.0, 46.0]],
      sides: [
        { id: 'allied', name: 'Allied', color: '#2b5797' },
        { id: 'axis', name: 'Axis', color: '#a32a2a' }
      ],
      theaters: ['Western Europe', 'Eastern Front', 'Mediterranean and North Africa', 'Atlantic'],
      intro: 'Army routes draw themselves as the armies advanced and retreated, and a marker appears for each battle as it begins.'
    },
    PORTRAITS, BATTLES, CAMPAIGNS, EVENTS, SOURCES, TOURS, VOCAB, ADVISORY, NOTES, OBJECTS, MEDIA
  });
})();
