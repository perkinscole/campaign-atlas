/* ------------------------------------------------------------------
   Campaign Atlas — data pack: World War I, 1914–1918
   Every quotation was copied from the linked printed text and carries
   `verified: true` with a `ref` to that text. The sources are letters,
   diaries, orders, reports, and memoirs published by 1930, now in the
   public domain. Images are public-domain photographs and paintings on
   Wikimedia Commons.
   ------------------------------------------------------------------ */

(function () {
  const img = Atlas.img;
  const IA = (id, q) => 'https://archive.org/details/' + id + (q ? '?q=' + encodeURIComponent('"' + q + '"') : '');

  const PORTRAITS = {
    pershing: img('John J. Pershing 1919.jpg', 'John J. Pershing', 'Public domain, about 1919'),
    wilson: img('Thomas Woodrow Wilson, Harris & Ewing bw photo portrait, 1919.jpg', 'Woodrow Wilson', 'Harris & Ewing, 1919. Library of Congress'),
    haig: img('Douglas Haig 1918.jpg', 'Douglas Haig', 'Public domain, 1917–18'),
    hindenburg: img('Paul von Hindenburg (1914) von Nicola Perscheid.jpg', 'Paul von Hindenburg', 'Nicola Perscheid, 1914'),
    ludendorff: img('Generalleutnant Erich Ludendorff, 1915.jpg', 'Erich Ludendorff', 'Nicola Perscheid, 1915'),
    joffre: img('Joseph Joffre R.Melcy 1917.jpg', 'Joseph Joffre', 'R. Melcy, 1917'),
    seeger: img('Alan Seeger, frontispiece, Letters and Diary, 1917.jpg', 'Alan Seeger', 'Frontispiece to his Letters and Diary, 1917'),
    falkenhayn: img('Erich von Falkenhayn-retouched.jpg', 'Erich von Falkenhayn', 'Public domain, 1913'),
    nivelle: img('Robert Georges Nivelle.jpg', 'Robert Nivelle', 'Public domain, about 1917'),
    bairnsfather: img('Bruce Bairnsfather cph.3a03821.jpg', 'Bruce Bairnsfather', 'Library of Congress, 1918'),
    morgenthau: img('Henry Morgenthau, Ambassador to Turkey.jpg', 'Henry Morgenthau', 'Public domain, about 1913'),
    jellicoe: img('John Jellicoe, Admiral of the Fleet.jpg', 'John Jellicoe', 'Bain News Service. Library of Congress'),
    scheer: img('Almirante Reinhard Scheer.jpg', 'Reinhard Scheer', 'Public domain, 1916'),
    mccrae: img('John McCrae in uniform circa 1914.jpg', 'John McCrae', 'Public domain, about 1914'),
    gibbs: img('Sir Philip Gibbs LCCN2014712242.jpg', 'Philip Gibbs', 'Bain News Service. Library of Congress'),
    bethmann: img('Theobald von Bethmann-Hollweg 1913.jpg', 'Theobald von Bethmann Hollweg', 'Public domain, 1913'),
    davis: img('Frontis--RH Davis portrait--Gallegher.jpg', 'Richard Harding Davis', 'Frontispiece portrait, 1891'),
    hamilton: img('Général Ian Hamilton et l\'amiral de Robeck (posant sur le pont d\'un navire) - btv1b6909139v.jpg', 'Ian Hamilton (left) with Admiral de Robeck, 1915', 'Agence Rol. Bibliothèque nationale de France')
  };

  const BATTLES = [
    {
      id: 'belgium',
      name: 'Liège and the Invasion of Belgium',
      start: '1914-08-04', end: '1914-08-25',
      lat: 50.64, lng: 5.57,
      place: 'Liège, Brussels, and Louvain, Belgium',
      theater: 'Western Front',
      result: 'central',
      campaign: 'kluck',
      sideLabels: { allied: 'Belgium', central: 'Germany' },
      commanders: { allied: 'King Albert I; Lt. Gen. Gérard Leman at Liège', central: 'Gen. Karl von Bülow, Gen. Alexander von Kluck, Maj. Gen. Erich Ludendorff' },
      forces: { allied: 'about 117,000 in the Belgian field army', central: 'about 750,000 in the three armies that crossed Belgium' },
      casualties: { allied: 20000, central: 5300, kind: '(estimates for the siege of Liège, including prisoners)', note: 'About 6,000 Belgian and French civilians were shot or burned out by German troops in August and September 1914.' },
      summary: 'Germany\'s war plan was to beat France in six weeks by marching around its border forts through neutral Belgium. Belgium refused to let the armies pass. The ring of forts at Liège held up the advance for nearly two weeks, until giant siege guns smashed them one by one. German troops then poured across the country and entered Brussels on August 20. Fearing civilian snipers, they shot hostages and burned towns, including the medieval university library at Louvain.',
      significance: 'The invasion of a neutral country brought Britain into the war, and what was done to Belgian civilians turned opinion in neutral countries, the United States among them, against Germany.',
      images: [
        img('Destruction of defences at Liège - Lüttich 1914.jpg', 'One of the forts of Liège after German siege guns destroyed it, August 1914.', 'Presse-Centrale, Berlin. Public domain.'),
        img('Havoc of War - Ruins - Ruins of the Library at Louvain destroyed by the Germans in 1914. Photograph taken just after the departure of the Germans in 1918 - NARA - 31483961.jpg', 'The university library at Louvain, burned by German troops in August 1914, photographed in 1918.', 'American Red Cross. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'The entrance of the German Army into Brussels has lost the human quality. … What came after them, and twenty-four hours later is still coming, is not men marching, but a force of nature like a tidal wave, an avalanche, or a river flooding its banks.',
          who: 'Richard Harding Davis', role: 'American war correspondent, watching the German army march through Brussels', side: 'civilian',
          date: 'August 21, 1914', source: 'Dispatch to the New York Tribune, reprinted in The Literary Digest, September 12, 1914', portrait: 'davis',
          verified: true, ref: IA('sim_literary-digest_1914-09-12_49_11', 'a force of nature like a tidal wave'), refTitle: 'The Literary Digest, September 12, 1914'
        },
        {
          quote: 'We are now in a state of necessity, and necessity knows no law. … We were compelled to override the just protest of the Luxemburg and Belgian Governments. The wrong, I speak openly, we are committing we will endeavour to make good as soon as our military goal has been reached.',
          who: 'Theobald von Bethmann Hollweg', role: 'Chancellor of Germany, speaking to the Reichstag on the day of the invasion', side: 'central',
          date: 'August 4, 1914', source: 'Speech to the Reichstag, as printed in a British pamphlet of 1914', portrait: 'bethmann',
          verified: true, ref: IA('howgreatwararose00unse', 'necessity knows no law'), refTitle: 'How the Great War Arose (1914)'
        }
      ]
    },
    {
      id: 'tannenberg',
      name: 'Tannenberg',
      start: '1914-08-26', end: '1914-08-30',
      lat: 53.5, lng: 20.13,
      place: 'East Prussia, Germany (now Poland)',
      theater: 'Eastern Front',
      result: 'central',
      campaign: 'german-eighth',
      sideLabels: { allied: 'Russia', central: 'Germany' },
      commanders: { allied: 'Gen. Alexander Samsonov', central: 'Gen. Paul von Hindenburg, Maj. Gen. Erich Ludendorff, Lt. Col. Max Hoffmann' },
      forces: { allied: 'about 190,000 in the Second Army', central: 'about 150,000 in the Eighth Army' },
      casualties: { allied: 122000, central: 13000, note: 'Estimates. About 92,000 Russians were taken prisoner; counts of their killed and wounded run from 30,000 to 78,000.' },
      summary: 'Russia invaded East Prussia with two armies far sooner than Germany expected. The two Russian commanders were far apart and sent their orders by radio without code, so the Germans read them. Leaving a thin screen in front of one army, the Germans moved almost everything they had by rail against the other, Samsonov\'s, and surrounded it in the forests and lakes. In four days the Second Army ceased to exist.',
      significance: 'The victory made heroes of Hindenburg and Ludendorff, who would end up running Germany\'s war. But Russia\'s quick attack had pulled German troops away from France just before the Battle of the Marne.',
      images: [
        img('Russian prisoners tannenberg.jpg', 'Russian prisoners and captured guns after Tannenberg, 1914.', 'Photographer unknown. Public domain.'),
        img('Stab-8.Armee.jpg', 'Hindenburg and Ludendorff with the staff of the German Eighth Army, autumn 1914.', 'Photographer unknown. Public domain.')
      ],
      journal: [
        {
          quote: 'Samsonov said repeatedly that the disgrace of such a defeat was more than he could bear. “The Emperor trusted me. How can I face him after such a disaster?” He went aside and his staff heard a shot.',
          who: 'Maj. Gen. Sir Alfred Knox', role: 'British military attaché with the Russian army, recording what Samsonov\'s staff told him', side: 'allied',
          date: 'August 30, 1914', source: 'Maj. Gen. Sir Alfred Knox, With the Russian Army, 1914–1917 (1921)',
          verified: true, ref: IA('withrussianarmy101knoxuoft', 'How can I face him after such a disaster'), refTitle: 'Maj. Gen. Sir Alfred Knox, With the Russian Army, 1914–1917 (1921)'
        },
        {
          quote: 'Tannenberg! A word pregnant with painful recollections for German chivalry, a Slav cry of triumph, a name that is fresh in our memories after more than five hundred years of history. … On one of the following days we stood near this monument while Samsonoff\'s Russian Army was going to its doom of sheer annihilation.',
          who: 'Field Marshal Paul von Hindenburg', role: 'Commander of the German Eighth Army, explaining why he named the battle after a medieval German defeat fought nearby', side: 'central',
          date: 'Written in 1919', source: 'Out of My Life (English translation, 1920)', portrait: 'hindenburg',
          verified: true, ref: IA('OutOfMyLife', 'A word pregnant with painful recollections'), refTitle: 'Marshal von Hindenburg, Out of My Life (1920)'
        }
      ]
    },
    {
      id: 'marne',
      name: 'First Battle of the Marne',
      start: '1914-09-05', end: '1914-09-12',
      lat: 48.9, lng: 3.2,
      place: 'East of Paris, France',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'kluck',
      sideLabels: { allied: 'France and Britain', central: 'Germany' },
      commanders: { allied: 'Gen. Joseph Joffre, Gen. Joseph Gallieni, Field Marshal Sir John French', central: 'Gen. Helmuth von Moltke, Gen. Alexander von Kluck, Gen. Karl von Bülow' },
      forces: { allied: 'about 1 million', central: 'about 900,000' },
      casualties: { allied: 263000, central: 250000, note: 'Estimates. Neither army published full figures for the battle.' },
      summary: 'After a month of retreat, the French and British turned around thirty miles from Paris. The German army nearest the city had swung east of it, exposing its side, and a gap had opened between it and its neighbor. The French struck the exposed flank, rushing some reinforcements out from Paris in taxicabs, and the British advanced into the gap. After four days the Germans pulled back forty miles to the Aisne River and dug in.',
      significance: 'Germany\'s plan to win the war in six weeks had failed. Both sides began to dig trenches, and within weeks the lines ran from the English Channel to Switzerland.',
      images: [
        img('Soldats allemands pris par les Anglais à la bataille de La Ferté(-Gaucher, Seine-et-Marne) - btv1b6931809g.jpg', 'German soldiers captured by the British during the Battle of the Marne, September 1914.', 'Agence Rol. Bibliothèque nationale de France.')
      ],
      journal: [
        {
          quote: 'At the moment when a battle, on which depends the welfare of the country, is about to begin, I have to remind all ranks that the time for looking back is past. Every effort must be made to attack the enemy and hurl him back. Troops which find advance impossible must stand their ground at all costs and die rather than give way.',
          who: 'Gen. Joseph Joffre', role: 'French commander in chief; order read to the troops on the morning of the battle', side: 'allied',
          date: 'September 6, 1914', source: 'Order of the day, as translated in a British staff study of 1917', portrait: 'joffre',
          verified: true, ref: IA('dli.ernet.527717', 'the time for looking back is past'), refTitle: 'Maj. F. E. Whitton, The Marne Campaign (1917)'
        },
        {
          quote: 'The battle had advanced right over the crest of the hill. The sun was shining brilliantly on silent Mareuil and Chauconin, but Monthyon and Penchard were enveloped in smoke. From the eastern and western extremities of the plain we could see the artillery fire, but owing to the smoke hanging over the crest of the hill on the horizon, it was impossible to get an idea of the positions of the armies.',
          who: 'Mildred Aldrich', role: 'American writer, age 60, watching from her garden above the Marne', side: 'civilian',
          date: 'September 5, 1914', source: 'A Hilltop on the Marne (1915), letters written to friends in America',
          verified: true, ref: IA('ahilltoponmarne00aldrgoog', 'Monthyon and Penchard were enveloped in smoke'), refTitle: 'Mildred Aldrich, A Hilltop on the Marne (1915)'
        }
      ]
    },
    {
      id: 'ypres-1914',
      name: 'First Battle of Ypres',
      start: '1914-10-19', end: '1914-11-22',
      lat: 50.85, lng: 2.89,
      place: 'Ypres, Belgium',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'bef',
      sideLabels: { allied: 'Britain, France, and Belgium', central: 'Germany' },
      commanders: { allied: 'Field Marshal Sir John French, Gen. Ferdinand Foch, King Albert I', central: 'Gen. Erich von Falkenhayn, Duke Albrecht of Württemberg' },
      forces: { allied: 'about 4 million men on the whole Western Front by now, on both sides together', central: 'including new reserve corps of young volunteers' },
      casualties: { allied: 166000, central: 134000, note: 'Estimates. Britain\'s small prewar regular army was all but destroyed here.' },
      summary: 'With the line frozen from Switzerland to the Aisne, each side tried to get around the other\'s open northern end. The last gap was in Flanders, around the old cloth town of Ypres. Germany threw in new divisions of barely trained volunteers, many of them students; Britain\'s professional soldiers shot them down in rows, and were themselves worn away. The Belgians opened the sea locks and flooded the land to the north. When the fighting died down in November, there was no open flank left.',
      significance: 'The end of the war of movement in the West. For the next three and a half years the line here would shift by only a few miles.',
      images: [
        img('Brand-van-de-Lakenhallen-Ieper.jpg', 'The medieval Cloth Hall of Ypres on fire after German shelling, November 1914.', 'Photographer unknown. Public domain.'),
        img('Gentlemen of India marching to chasten German hooligans 1914.jpg', 'Indian soldiers of the British army in France, 1914. Indian troops reached the Ypres front in late October.', 'National Army Museum, London.')
      ],
      journal: [
        {
          quote: 'With what joy, with what enthusiasm I went into the war, which seemed to me a splendid opportunity for working off all the natural craving of youth for excitement and experience! In what bitter disappointment I now sit here, with horror in my heart!',
          who: 'Alfred Buchalski', role: 'German philosophy student and volunteer, age 23; killed two weeks later', side: 'central',
          date: 'October 28, 1914', source: 'Letter written before Dixmude, published in German Students\' War Letters, edited by Philipp Witkop, translated by A. F. Wedd (1929)',
          verified: true, ref: IA('germanstudentswarletters', 'with what enthusiasm I went into the war'), refTitle: 'German Students\' War Letters, edited by Philipp Witkop, translated by A. F. Wedd (1929)'
        },
        {
          quote: 'You at home can\'t have the faintest idea of what it means to us when in the newspaper it simply and blandly says: ‘In Flanders to-day again only artillery activity’. Far better go over the top in the most foolhardy attack, cost what it may, than stick it out all day long under shell-fire, wondering all the time whether the next one will maim one or blow one to bits.',
          who: 'Lothar Dietz', role: 'German philosophy student, writing from a dugout two miles from Ypres; killed in April 1915', side: 'central',
          date: 'November 1914', source: 'Letter published in German Students\' War Letters, edited by Philipp Witkop, translated by A. F. Wedd (1929)',
          verified: true, ref: IA('germanstudentswarletters', 'again only artillery activity'), refTitle: 'German Students\' War Letters, edited by Philipp Witkop, translated by A. F. Wedd (1929)'
        }
      ]
    },
    {
      id: 'christmas-truce',
      name: 'The Christmas Truce',
      start: '1914-12-24', end: '1914-12-26',
      lat: 50.745, lng: 2.895,
      place: 'Flanders, on the line south of Ypres',
      theater: 'Western Front',
      result: 'none', resultLabel: 'Unofficial truce',
      sideLabels: { allied: 'British', central: 'German' },
      commanders: { allied: 'No one ordered it. Generals on both sides forbade it afterward.', central: 'No one ordered it.' },
      forces: { allied: 'Men of perhaps two-thirds of the British-held line', central: 'Mostly Saxon and Bavarian regiments opposite them' },
      casualties: { allied: 0, central: 0, hideBars: true, heading: 'Losses', kind: '', note: 'The truce let both sides bury men who had been lying between the lines for weeks. In some places the shooting stopped until New Year.' },
      summary: 'On Christmas Eve, along stretches of the line in Flanders, German soldiers put candles and small trees on the edge of their trenches and sang carols. British soldiers sang back. On Christmas morning men from both sides climbed out, met in the middle, shook hands, traded tobacco and buttons, and buried their dead. It was never repeated on the same scale: the generals forbade it, and the war grew too bitter.',
      significance: 'Proof, five months in, that the men doing the fighting did not hate each other, and a moment both armies\' commanders made sure would not happen again.',
      images: [
        img('The Christmas Truce on the Western Front, 1914 Q50721.jpg', 'British and German officers meet in no man\'s land, Christmas Day 1914.', 'Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'There was not an atom of hate on either side that day; and yet, on our side, not for a moment was the will to war and the will to beat them relaxed. It was just like the interval between the rounds in a friendly boxing match.',
          who: 'Lt. Bruce Bairnsfather', role: 'Machine-gun officer, Royal Warwickshire Regiment', side: 'allied',
          date: 'December 25, 1914', source: 'Bruce Bairnsfather, Bullets & Billets (1916)', portrait: 'bairnsfather',
          verified: true, ref: IA('bulletsandbillet00bairuoft', 'not an atom of hate on either side'), refTitle: 'Bruce Bairnsfather, Bullets & Billets (1916)'
        },
        {
          quote: 'I spotted a German officer, some sort of lieutenant I should think, and being a bit of a collector, I intimated to him that I had taken a fancy to some of his buttons. … I brought out my wire clippers and, with a few deft snips, removed a couple of his buttons and put them in my pocket. I then gave him two of mine in exchange.',
          who: 'Lt. Bruce Bairnsfather', role: 'Machine-gun officer, Royal Warwickshire Regiment', side: 'allied',
          date: 'December 25, 1914', source: 'Bruce Bairnsfather, Bullets & Billets (1916)', portrait: 'bairnsfather',
          verified: true, ref: IA('bulletsandbillet00bairuoft', 'taken a fancy to some of his buttons'), refTitle: 'Bruce Bairnsfather, Bullets & Billets (1916)'
        }
      ]
    },
    {
      id: 'second-ypres',
      name: 'Second Battle of Ypres',
      start: '1915-04-22', end: '1915-05-25',
      lat: 50.9, lng: 2.93,
      place: 'Ypres, Belgium',
      theater: 'Western Front',
      result: 'inconclusive', resultLabel: 'German gains, no breakthrough',
      sideLabels: { allied: 'Britain, Canada, and France', central: 'Germany' },
      commanders: { allied: 'Gen. Sir Horace Smith-Dorrien, Gen. Sir Herbert Plumer, Lt. Gen. Edwin Alderson', central: 'Duke Albrecht of Württemberg' },
      forces: { allied: 'eight divisions, including the newly arrived Canadians', central: 'seven divisions and 168 tons of chlorine gas' },
      casualties: { allied: 87000, central: 35000, note: 'Estimates. The Canadian Division lost about 6,000 men, a third of its infantry, in its first battle.' },
      summary: 'Late on April 22 the Germans opened 5,700 cylinders of chlorine and let the wind carry a greenish-yellow cloud into the French lines north of Ypres. Men choked, went blind, and ran, leaving a gap four miles wide. The Germans, who had not expected the gas to work so well, had no reserves ready to go through it. Canadian troops, breathing through wet cloths, held the edge of the gap. A month of fighting pushed the Allied line closer to Ypres but did not break it.',
      significance: 'The first large use of poison gas. Both sides were using it within months, along with masks to survive it. A Canadian army doctor, John McCrae, wrote “In Flanders Fields” here.',
      images: [
        img('Richard Jack-Second Battle of Ypres CWM 19710261-01611.jpg', 'Canadian troops at the Second Battle of Ypres, painted in 1917 for the Canadian government. It is an artist\'s reconstruction, not an eyewitness view.', 'Richard Jack, 1917. Canadian War Museum.')
      ],
      journal: [
        {
          quote: 'The effects of the successful gas attack were horrible. I am not pleased with the idea of poisoning men. Of course, the entire world will rage about it first and then imitate us. All the dead lie on their backs, with clenched fists; the whole field is yellow.',
          who: 'Capt. Rudolf Binding', role: 'German cavalry officer on a division staff', side: 'central',
          date: 'April 24, 1915', source: 'Rudolf Binding, A Fatalist at War (English translation, 1929)',
          verified: true, ref: IA('fatalistatwar00bind', 'I am not pleased with the idea of poisoning men'), refTitle: 'Rudolf Binding, A Fatalist at War (English translation, 1929)'
        },
        {
          quote: 'In Flanders fields the poppies blow\nBetween the crosses, row on row,\nThat mark our place; and in the sky\nThe larks, still bravely singing, fly\nScarce heard amid the guns below.',
          who: 'Maj. John McCrae', role: 'Canadian army doctor, written at his dressing station the day after burying a friend', side: 'allied',
          date: 'May 3, 1915', source: '“In Flanders Fields,” first published in Punch, December 8, 1915', portrait: 'mccrae',
          verified: true, ref: 'https://en.wikisource.org/wiki/In_Flanders_Fields', refTitle: 'In Flanders Fields (Wikisource transcription)'
        }
      ]
    },
    {
      id: 'armenian-genocide',
      name: 'The Armenian Genocide',
      start: '1915-04-24', end: '1916-12-31',
      lat: 38.68, lng: 39.22,
      place: 'Anatolia and the Syrian desert, Ottoman Empire',
      theater: 'Ottoman Front',
      result: 'none', resultLabel: 'Genocide',
      sideLabels: { allied: 'Witnesses', central: 'Ottoman government' },
      commanders: { allied: 'American and German diplomats, missionaries, and survivors recorded what they saw', central: 'Interior Minister Talaat Pasha, War Minister Enver Pasha' },
      forces: { allied: 'About 2 million Armenians lived in the empire in 1914', central: 'Carried out by police, soldiers, and released prisoners' },
      casualties: { allied: 0, central: 0, hideBars: true, heading: 'The dead', kind: '', note: 'Between 600,000 and 1.5 million Armenians died. Most historians put the number at about one million or more. Assyrian and Greek Christians were also killed in large numbers.' },
      summary: 'The Ottoman government accused its Armenian Christian minority of siding with Russia. On April 24, 1915, it arrested Armenian leaders in Constantinople. In the months that followed, Armenian men across Anatolia were taken away and shot, and women, children, and the old were marched south toward the Syrian desert without food or water. Most died on the way. The American ambassador, Henry Morgenthau, sent report after report to Washington and pleaded with Ottoman ministers to stop.',
      significance: 'The first genocide of the twentieth century, and the event for which the word was later coined. The Turkish government still disputes that term; the United States formally recognized the genocide in 2019 and 2021.',
      images: [
        img('Armenian refugees at Van crowding around a public oven during 1915.png', 'Armenian refugees at Van crowd around a public oven, 1915.', 'From Ambassador Morgenthau\'s Story (1918).'),
        img('Henry Morgenthau, American Ambassador at Constantinople from 1913 until 1916.jpg', 'Henry Morgenthau, United States ambassador at Constantinople from 1913 to 1916.', 'Public domain, 1919.')
      ],
      journal: [
        {
          quote: 'When the Turkish authorities gave the orders for these deportations, they were merely giving the death warrant to a whole race; they understood this well, and, in their conversations with me, they made no particular attempt to conceal the fact.',
          who: 'Henry Morgenthau', role: 'United States ambassador to the Ottoman Empire, 1913–1916', side: 'civilian',
          date: 'Written in 1918', source: 'Ambassador Morgenthau\'s Story (1918)', portrait: 'morgenthau',
          verified: true, ref: IA('ambassadormorge00morggoog', 'the death warrant to a whole race'), refTitle: 'Ambassador Morgenthau\'s Story (1918)'
        },
        {
          quote: 'When the signal was given for the caravans to move, therefore, they almost invariably consisted of women, children, and old men. Any one who could possibly have protected them from the fate that awaited them had been destroyed.',
          who: 'Henry Morgenthau', role: 'United States ambassador to the Ottoman Empire, drawing on reports from American consuls and missionaries', side: 'civilian',
          date: 'Written in 1918', source: 'Ambassador Morgenthau\'s Story (1918)', portrait: 'morgenthau',
          verified: true, ref: IA('ambassadormorge00morggoog', 'women, children, and old men'), refTitle: 'Ambassador Morgenthau\'s Story (1918)'
        }
      ]
    },
    {
      id: 'gallipoli',
      name: 'Gallipoli',
      start: '1915-04-25', end: '1916-01-09',
      lat: 40.24, lng: 26.28,
      place: 'Gallipoli Peninsula, Ottoman Empire (now Turkey)',
      theater: 'Ottoman Front',
      result: 'central',
      campaign: 'gallipoli',
      sideLabels: { allied: 'Britain, France, Australia, and New Zealand', central: 'Ottoman Empire' },
      commanders: { allied: 'Gen. Sir Ian Hamilton, Lt. Gen. Sir William Birdwood', central: 'Gen. Otto Liman von Sanders, Esat Pasha, Lt. Col. Mustafa Kemal' },
      forces: { allied: 'about 490,000 over the campaign', central: 'about 315,000 over the campaign' },
      casualties: { allied: 250000, central: 250000, note: 'Rough totals including the sick, who outnumbered the wounded. About 100,000 men died.' },
      summary: 'Hoping to knock the Ottoman Empire out of the war and open a sea route to Russia, the Allies landed on the narrow peninsula that guards the passage to Constantinople. The landings on April 25 were met at the water\'s edge. Australians and New Zealanders clung to a strip of beach and cliff they named Anzac Cove; the British were pinned at the tip. Eight months of trench fighting in heat, flies, and disease gained almost nothing, and the Allies slipped away by night that winter.',
      significance: 'A national memory for three countries: April 25 is Anzac Day in Australia and New Zealand, and the defense made the reputation of Mustafa Kemal, later Atatürk, founder of modern Turkey.',
      images: [
        img('Landing of Australian troops at ANZAC Cove, 25 April 1915 slnsw.jpg', 'Australian troops landing at Anzac Cove, April 25, 1915.', 'State Library of New South Wales.'),
        img('SS River Clyde at Cape Helles, Gallipoli, 1915.jpg', 'The transport River Clyde aground at Cape Helles, where British troops landed under fire.', 'Ernest Brooks. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'Through our glasses we could quite clearly watch the sea being whipped up all along the beach and about the River Clyde by a pelting storm of rifle bullets. We could see also how a number of our dare-devils were up to their necks in this tormented water trying to struggle on to land from the barges linking the River Clyde to the shore.',
          who: 'Gen. Sir Ian Hamilton', role: 'Allied commander in chief, watching the landing at Cape Helles from a battleship', side: 'allied',
          date: 'April 25, 1915', source: 'Gen. Sir Ian Hamilton, Gallipoli Diary (1920)', portrait: 'hamilton',
          verified: true, ref: IA('gallipolidiary0001siri', 'a pelting storm of rifle bullets'), refTitle: 'Gen. Sir Ian Hamilton, Gallipoli Diary (1920)'
        },
        {
          quote: 'You have got through the difficult business, now you have only to dig, dig, dig, until you are safe.',
          who: 'Gen. Sir Ian Hamilton', role: 'Postscript to his midnight order refusing to take the Australians and New Zealanders off the beach', side: 'allied',
          date: 'April 25–26, 1915', source: 'Gen. Sir Ian Hamilton, Gallipoli Diary (1920)', portrait: 'hamilton',
          verified: true, ref: IA('gallipolidiary0001siri', 'dig, dig, dig, until you are safe'), refTitle: 'Gen. Sir Ian Hamilton, Gallipoli Diary (1920)'
        }
      ]
    },
    {
      id: 'lusitania',
      name: 'Sinking of the Lusitania',
      start: '1915-05-07', end: '1915-05-07',
      lat: 51.42, lng: -8.55,
      place: 'Off the south coast of Ireland',
      theater: 'At Sea',
      result: 'none', resultLabel: 'Passenger liner sunk',
      sideLabels: { allied: 'RMS Lusitania', central: 'German submarine U-20' },
      commanders: { allied: 'Capt. William Turner', central: 'Kapitänleutnant Walther Schwieger' },
      forces: { allied: '1,959 passengers and crew', central: 'one submarine, one torpedo' },
      casualties: { allied: 1198, central: 0, heading: 'Deaths', kind: '', note: '1,198 people died, 128 of them Americans. The ship was also carrying rifle cartridges and shell parts for Britain, which Germany gave as its reason.' },
      summary: 'Germany had declared the seas around Britain a war zone and warned, in American newspapers, that British ships might be sunk. On May 7, 1915, a submarine torpedoed the liner Lusitania, six days out of New York, within sight of Ireland. She sank in eighteen minutes. Americans were outraged. President Wilson protested but kept the country out of the war, and Germany, for a time, reined in its submarines.',
      significance: 'It did not bring the United States into the war, but it turned many Americans against Germany. When Germany went back to sinking ships without warning in 1917, the United States declared war.',
      images: [
        img('RMS Lusitania coming into port, possibly in New York, 1907-13-crop.jpg', 'The Lusitania coming into port, probably New York, between 1907 and 1913.', 'George Grantham Bain. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Where I stood on deck the shock of the impact was not severe; it was a heavy, rather muffled sound, but the good ship trembled for a moment under the force of the blow; a second explosion quickly followed, but I do not think it was a second torpedo, for the sound was quite different; it was more likely a boiler in the engine room.',
          who: 'Charles E. Lauriat Jr.', role: 'Boston bookseller and first-class passenger, who survived', side: 'civilian',
          date: 'May 7, 1915', source: 'Charles E. Lauriat Jr., The Lusitania\'s Last Voyage (1915)',
          verified: true, ref: IA('lusitaniaslastv00laurgoog', 'the good ship trembled for a moment'), refTitle: 'Charles E. Lauriat Jr., The Lusitania\'s Last Voyage (1915)'
        },
        {
          quote: 'Travellers intending to embark on the Atlantic voyage are reminded that a state of war exists between Germany and her allies and Great Britain and her allies; that the zone of war includes the waters adjacent to the British Isles; that … vessels flying the flag of Great Britain, or of any of her allies, are liable to destruction in those waters and that travellers sailing in the war zone on ships of Great Britain or her allies do so at their own risk.',
          who: 'Imperial German Embassy, Washington', role: 'Notice printed in New York newspapers on the morning the Lusitania sailed', side: 'central',
          date: 'May 1, 1915', source: 'Newspaper notice, as reproduced by a survivor in 1915',
          verified: true, ref: IA('lusitaniaslastv00laurgoog', 'do so at their own risk'), refTitle: 'Charles E. Lauriat Jr., The Lusitania\'s Last Voyage (1915)'
        }
      ]
    },
    {
      id: 'verdun',
      name: 'Verdun',
      start: '1916-02-21', end: '1916-12-18',
      lat: 49.16, lng: 5.39,
      place: 'Verdun, France',
      theater: 'Western Front',
      result: 'allied',
      sideLabels: { allied: 'France', central: 'Germany' },
      commanders: { allied: 'Gen. Philippe Pétain, Gen. Robert Nivelle', central: 'Gen. Erich von Falkenhayn, Crown Prince Wilhelm' },
      forces: { allied: 'about 1.1 million over ten months; most of the French army took a turn', central: 'about 1.25 million over ten months' },
      casualties: { allied: 377000, central: 337000, note: 'About 300,000 of these men were killed or never found. Estimates vary.' },
      summary: 'Germany attacked the ring of forts around Verdun, a place France would not give up, with the heaviest bombardment yet seen: a million shells on the first day. Fort Douaumont fell in four days. Pétain organized a nonstop line of trucks along the one road into the city and rotated division after division through the battle. The fighting went on for ten months over a few square miles of hills. By December the French had retaken nearly all they had lost.',
      significance: 'The longest battle of the war, and for France its symbol. It wore down both armies about equally and decided nothing, which made it the model of a war of attrition.',
      images: [
        img('Bataille de Verdun 1916.jpg', 'French soldiers leave their trench to attack at Verdun, 1916.', 'Photographer unknown. Public domain.'),
        img('Fort Douaumont Anfang 1916.jpg', 'Fort Douaumont from the air at the start of 1916.', 'German aerial photograph. Public domain.'),
        img('Fort Douaumont Ende 1916.jpg', 'The same fort at the end of 1916, after ten months of shelling.', 'German aerial photograph. Public domain.')
      ],
      journal: [
        {
          quote: 'Within our reach behind the French sector of the Western front there are objectives for the retention of which the French General Staff would be compelled to throw in every man they have. If they do so the forces of France will bleed to death',
          who: 'Gen. Erich von Falkenhayn', role: 'Chief of the German General Staff; the plan for Verdun as he gave it in his memoirs. Historians are not sure the memorandum was written at the time.', side: 'central',
          date: 'Dated Christmas 1915; published 1919', source: 'Gen. Erich von Falkenhayn, General Headquarters 1914–1916 and Its Critical Decisions (English translation, 1919)', portrait: 'falkenhayn',
          verified: true, ref: IA('generalheadquart00falk', 'the forces of France will bleed to death'), refTitle: 'Gen. Erich von Falkenhayn, General Headquarters 1914–1916 and Its Critical Decisions (English translation, 1919)'
        },
        {
          quote: 'The hour is decisive. The Germans, feeling themselves hunted down on every hand, are launching furious and desperate attacks upon our front, in the hope of reaching the gates of Verdun before themselves being attacked by the united forces of the Allied Armies. You will not let them pass, my comrades.',
          who: 'Gen. Robert Nivelle', role: 'Commander of the French Second Army at Verdun; order of the day', side: 'allied',
          date: 'June 23, 1916', source: 'Army order, as translated in The Times History of the War, vol. 9 (1916)', portrait: 'nivelle',
          verified: true, ref: IA('in.ernet.dli.2015.203941', 'You will not let them pass, my comrades'), refTitle: 'The Times History of the War, vol. 9 (1916)'
        }
      ]
    },
    {
      id: 'jutland',
      name: 'Jutland',
      start: '1916-05-31', end: '1916-06-01',
      lat: 56.7, lng: 5.9,
      place: 'North Sea, off Denmark',
      theater: 'At Sea',
      result: 'inconclusive', resultLabel: 'Both sides claimed victory',
      campaign: 'high-seas-fleet',
      sideLabels: { allied: 'Britain', central: 'Germany' },
      commanders: { allied: 'Adm. Sir John Jellicoe, Vice Adm. Sir David Beatty', central: 'Vice Adm. Reinhard Scheer, Vice Adm. Franz Hipper' },
      forces: { allied: '151 warships, 28 of them battleships', central: '99 warships, 16 of them modern battleships' },
      casualties: { allied: 6784, central: 3058, note: 'Britain lost 14 ships and 6,094 men killed; Germany lost 11 ships and 2,551 men killed.' },
      summary: 'The only time the two great battle fleets met. The German fleet came out hoping to trap and destroy part of the British one. Instead its scouting force led it into the whole of Britain\'s Grand Fleet. In an afternoon and night of gunfire, three British battle cruisers blew up, but twice the German battleships found themselves steaming into a curved line of British guns and had to turn away. In the dark the Germans slipped home.',
      significance: 'Germany sank more ships; Britain kept command of the sea. The German fleet stayed in port for most of the rest of the war, the British blockade went on starving Germany, and Germany turned to its submarines.',
      images: [
        img('Destruction of HMS Queen Mary.jpg', 'The British battle cruiser Queen Mary blows up at Jutland, May 31, 1916. Nearly all of her crew of more than 1,200 died.', 'Photographer unknown. Public domain.')
      ],
      journal: [
        {
          quote: 'Already at 6.13 p.m., the battle-cruiser Indefatigable, the last in the line of the enemy cruisers, sank with a terrible explosion caused by the guns of the Von der Tann.',
          who: 'Vice Adm. Reinhard Scheer', role: 'Commander of the German High Seas Fleet. German clocks were two hours ahead of British ones.', side: 'central',
          date: 'May 31, 1916', source: 'Adm. Reinhard Scheer, Germany\'s High Sea Fleet in the World War (English translation, 1920)', portrait: 'scheer',
          verified: true, ref: IA('cu31924027832744', 'sank with a terrible explosion'), refTitle: 'Adm. Reinhard Scheer, Germany\'s High Sea Fleet in the World War (English translation, 1920)'
        },
        {
          quote: 'Owing principally to the mist, but partly to the smoke, it was possible to see only a few ships at a time in the enemy\'s battle line. Towards the van only some four or five ships were ever visible at once. … The enemy constantly turned away and opened the range under cover of destroyer attacks and smoke screens',
          who: 'Adm. Sir John Jellicoe', role: 'Commander in chief of the British Grand Fleet; his official dispatch on the battle', side: 'allied',
          date: 'June 1916', source: 'Dispatch to the Admiralty, printed in The Grand Fleet, 1914–1916 (1919)', portrait: 'jellicoe',
          verified: true, ref: IA('grandfleet1914100jell', 'only some four or five ships were ever visible at once'), refTitle: 'Adm. Viscount Jellicoe, The Grand Fleet, 1914–1916 (1919)'
        }
      ]
    },
    {
      id: 'brusilov',
      name: 'The Brusilov Offensive',
      start: '1916-06-04', end: '1916-09-20',
      lat: 50.75, lng: 25.33,
      place: 'Galicia and Volhynia (now western Ukraine)',
      theater: 'Eastern Front',
      result: 'allied',
      campaign: 'brusilov',
      sideLabels: { allied: 'Russia', central: 'Austria-Hungary and Germany' },
      commanders: { allied: 'Gen. Aleksei Brusilov', central: 'Field Marshal Franz Conrad von Hötzendorf, Gen. Alexander von Linsingen' },
      forces: { allied: 'about 630,000 at the start', central: 'about 470,000 at the start' },
      casualties: { allied: 750000, central: 1000000, note: 'Very rough estimates; Russian losses are put anywhere from 500,000 to 1 million. The Central Powers\' figure includes some 400,000 prisoners.' },
      summary: 'To take pressure off Verdun and Italy, Russia attacked early. Brusilov did what no general in the West had managed: instead of massing on one narrow front after days of warning bombardment, he struck in many places at once along 300 miles, after a short, accurate barrage. The Austro-Hungarian line collapsed and whole units surrendered. Germany rushed troops east to prop up its ally. The advance ran out of men and supplies by September.',
      significance: 'Russia\'s greatest victory of the war and one of the deadliest battles in history. It broke the Austro-Hungarian army as an independent force, but the cost helped bring on the Russian Revolution the next year.',
      images: [
        img('Aleksei Brusilov in 1916.jpeg', 'General Aleksei Brusilov in 1916.', 'Photographer unknown. Public domain.'),
        img('Russian mass attack supported by armored cars near Okna, June 5 1916.png', 'A Russian attack near Okna on June 5, 1916, as drawn for the German-language press.', 'Arthur Heyer, 1916. Public domain.')
      ],
      journal: [
        {
          quote: 'On June 7th his third rayon in advance of Lutsk was carried by frontal attack and Lutsk was occupied, the breech in the Austrian front having been widened to eighty versts and the 8th Army having marched thirty-five versts and won two pitched battles in three days.',
          who: 'Maj. Gen. Sir Alfred Knox', role: 'British military attaché with the Russian army. A verst is about two-thirds of a mile; a rayon is a fortified zone.', side: 'allied',
          date: 'June 1916', source: 'Maj. Gen. Sir Alfred Knox, With the Russian Army, 1914–1917 (1921)',
          verified: true, ref: IA('withrussianarmy02alfr', 'won two pitched battles in three days'), refTitle: 'Maj. Gen. Sir Alfred Knox, With the Russian Army, 1914–1917 (1921)'
        }
      ]
    },
    {
      id: 'somme',
      name: 'The Somme',
      start: '1916-07-01', end: '1916-11-18',
      lat: 50.02, lng: 2.7,
      place: 'Picardy, France',
      theater: 'Western Front',
      result: 'inconclusive', resultLabel: 'Allied advance of six miles',
      sideLabels: { allied: 'Britain and France', central: 'Germany' },
      commanders: { allied: 'Gen. Sir Douglas Haig, Gen. Sir Henry Rawlinson, Gen. Ferdinand Foch', central: 'Gen. Fritz von Below, Crown Prince Rupprecht of Bavaria' },
      forces: { allied: 'about 2.5 million men passed through the battle', central: 'about 1.5 million' },
      casualties: { allied: 624000, central: 500000, note: 'Estimates; the German figure is disputed. On the first day alone the British army lost 57,470 men, 19,240 of them killed.' },
      summary: 'Britain\'s new volunteer army attacked beside the French after a week-long bombardment that was supposed to destroy the German defenses. It did not. On the morning of July 1 the infantry walked into uncut wire and machine guns, and the British army suffered the worst day in its history. The battle went on for four and a half months. Tanks were used for the first time in September. When it ended in the mud of November, the line had moved six miles.',
      significance: 'For Britain, the Somme became the lasting image of the war: brave men sent against machine guns. It also drained the German army of experienced soldiers it could not replace.',
      images: [
        img('Cheshire Regiment trench Somme 1916.jpg', 'British soldiers in a captured German trench at Ovillers, July 1916. One keeps watch while the others sleep.', 'John Warwick Brooke. Imperial War Museums.'),
        img('Tyneside Irish Brigade advancing 1 July 1916.jpg', 'Men of the Tyneside Irish Brigade advance on the morning of July 1, 1916.', 'Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'We go up to the attack tomorrow. This will probably be the biggest thing yet. We are to have the honor of marching in the first wave. … I am glad to be going in first wave. If you are in this thing at all it is best to be in to the limit. And this is the supreme experience.',
          who: 'Alan Seeger', role: 'American poet, age 28, serving in the French Foreign Legion. His last letter; he was killed six days later.', side: 'allied',
          date: 'June 28, 1916', source: 'Letters and Diary of Alan Seeger (1917)', portrait: 'seeger',
          verified: true, ref: IA('diaryalanseeger00alanrich', 'the honor of marching in the first wave'), refTitle: 'Letters and Diary of Alan Seeger (1917)'
        },
        {
          quote: 'The attack which was launched to-day against the German lines on a 20-mile front began well. It is not yet a victory, for victory comes at the end of a battle, and this is only a beginning. But our troops, fighting with very splendid valour, have swept across the enemy\'s front trenches along a great part of the line of attack',
          who: 'Philip Gibbs', role: 'British war correspondent; his dispatch for the newspapers on the first day, which passed through the army censor', side: 'allied',
          date: 'July 1, 1916', source: 'Philip Gibbs, The Battles of the Somme (1917)', portrait: 'gibbs',
          verified: true, ref: IA('battlesofsomme00gibb', 'began well. It is not yet a victory'), refTitle: 'Philip Gibbs, The Battles of the Somme (1917)'
        }
      ]
    },
    {
      id: 'u-boat-war',
      name: 'The U-boat War of 1917',
      start: '1917-02-01', end: '1917-11-30',
      lat: 50.2, lng: -10.5,
      place: 'The Atlantic approaches to Britain and France',
      theater: 'At Sea',
      result: 'allied',
      sideLabels: { allied: 'Britain and the United States', central: 'Germany' },
      commanders: { allied: 'Adm. Sir John Jellicoe; Rear Adm. William Sims, U.S. Navy', central: 'Adm. Henning von Holtzendorff' },
      forces: { allied: 'merchant ships of every nation, later sailing in convoys with destroyer escorts', central: 'about 110 submarines at the start, a third of them at sea at a time' },
      casualties: { allied: 0, central: 0, hideBars: true, heading: 'Losses', kind: '', note: 'U-boats sank about 6 million tons of shipping in 1917, with some 860,000 tons in April alone. Germany lost 63 submarines that year.' },
      summary: 'Blockaded and hungry, Germany gambled. On February 1, 1917, its submarines began sinking every ship bound for Britain, neutral or not, without warning. The admirals promised to starve Britain out in six months, before American help could matter. In April one ship in four leaving British ports did not come back. Then the Allies began sailing merchant ships in groups guarded by warships, and losses fell. Meanwhile the sinkings, and a German offer of American territory to Mexico, brought the United States into the war on April 6.',
      significance: 'Germany\'s gamble failed twice over: Britain did not starve, and two million American soldiers crossed the Atlantic, almost none of them lost at sea.',
      images: [
        img('The German U-boat U-35 cruising in the Mediterranean, April 1917.jpg', 'The German submarine U-35 in the Mediterranean, April 1917.', 'German official photograph. Imperial War Museums.'),
        img('War Message to Congress (4322145549).jpg', 'President Wilson asks Congress to declare war on Germany, April 2, 1917.', 'Woodrow Wilson Presidential Library.'),
        img('The American Navy, 1918 Q48188.jpg', 'A convoy of American troopships and their escorts at sea, May 1918.', 'American official photograph. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'The world must be made safe for democracy. Its peace must be planted upon the tested foundations of political liberty. We have no selfish ends to serve. We desire no conquest, no dominion.',
          who: 'President Woodrow Wilson', role: 'Asking Congress to declare war on Germany', side: 'allied',
          date: 'April 2, 1917', source: 'Address to a joint session of Congress', portrait: 'wilson',
          verified: true, ref: IA('cihm_990036', 'We have no selfish ends to serve'), refTitle: 'Why the United States of America Entered the War (1917), printing the address'
        }
      ]
    },
    {
      id: 'passchendaele',
      name: 'Passchendaele (Third Ypres)',
      start: '1917-07-31', end: '1917-11-10',
      lat: 50.9, lng: 3.02,
      place: 'Ypres, Belgium',
      theater: 'Western Front',
      result: 'inconclusive', resultLabel: 'Allied advance of five miles',
      sideLabels: { allied: 'Britain, Canada, Australia, and New Zealand', central: 'Germany' },
      commanders: { allied: 'Field Marshal Sir Douglas Haig, Gen. Sir Hubert Gough, Gen. Sir Herbert Plumer, Lt. Gen. Sir Arthur Currie', central: 'Crown Prince Rupprecht of Bavaria, Gen. Friedrich Sixt von Armin' },
      forces: { allied: 'about 50 divisions over the battle', central: 'about 80 divisions over the battle' },
      casualties: { allied: 260000, central: 240000, note: 'Estimates; both figures are disputed, and some counts put each side nearer 400,000.' },
      summary: 'Haig attacked out of Ypres toward the Belgian coast and its submarine bases. The ground was reclaimed marsh, kept dry by ditches that three years of shelling had destroyed, and it rained through much of August and October. The battlefield became a swamp of flooded craters in which men, mules, and guns sank. After three and a half months Canadian troops took the ruins of Passchendaele village, five miles from the start.',
      significance: 'The name became a word for pointless suffering. The battle wore down the German army, but it cost Britain men it would badly miss when Germany attacked the next spring.',
      images: [
        img('Stretcher bearers Passchendaele August 1917.jpg', 'Stretcher bearers struggle through knee-deep mud near Ypres, August 1, 1917.', 'John Warwick Brooke. Imperial War Museums.'),
        img('Chateau Wood Ypres 1917.jpg', 'Australian soldiers cross Chateau Wood on a track of wooden boards, October 29, 1917.', 'Frank Hurley. Australian War Memorial.')
      ],
      journal: [
        {
          quote: 'Tracks made of wooden slabs fastened together were the only roads by which men and pack-mules could cross this quagmire, and each of these ways became taped out by the enemy\'s artillery, and very perilous. They were slippery under moist mud, and men and mules fell into the bogs on either side, and sometimes drowned in them.',
          who: 'Philip Gibbs', role: 'British war correspondent, writing a few months after the battle', side: 'allied',
          date: 'Written in early 1918', source: 'Philip Gibbs, From Bapaume to Passchendaele, 1917 (1918)', portrait: 'gibbs',
          verified: true, ref: IA('frombapaumetopas00gibb', 'sometimes drowned in them'), refTitle: 'Philip Gibbs, From Bapaume to Passchendaele, 1917 (1918)'
        },
        {
          quote: 'The horror of the shell-hole area of Verdun was surpassed. It was no longer life at all. It was mere unspeakable suffering. And through this world of mud the attackers dragged themselves, slowly, but steadily, and in dense masses.',
          who: 'Gen. Erich Ludendorff', role: 'In effective command of the German army', side: 'central',
          date: 'Written in 1919, of October 1917', source: 'Gen. Erich Ludendorff, My War Memories, 1914–1918 (English translation, 1919)', portrait: 'ludendorff',
          verified: true, ref: IA('mywarmemories19102lude', 'It was mere unspeakable suffering'), refTitle: 'Gen. Erich Ludendorff, My War Memories, 1914–1918 (English translation, 1919)'
        }
      ]
    },
    {
      id: 'caporetto',
      name: 'Caporetto',
      start: '1917-10-24', end: '1917-11-19',
      lat: 46.25, lng: 13.58,
      place: 'The Isonzo River (now Kobarid, Slovenia) to the Piave, Italy',
      theater: 'Italian Front',
      result: 'central',
      campaign: 'caporetto',
      sideLabels: { allied: 'Italy', central: 'Germany and Austria-Hungary' },
      commanders: { allied: 'Gen. Luigi Cadorna', central: 'Gen. Otto von Below, Gen. Svetozar Boroević' },
      forces: { allied: 'about 400,000 in the Second Army', central: 'about 350,000, including seven German divisions' },
      casualties: { allied: 305000, central: 70000, note: 'About 265,000 of the Italian losses were prisoners. Another 300,000 men lost touch with their units in the retreat.' },
      summary: 'Italy had attacked eleven times along the Isonzo River in two years and gained a few miles of mountain. In October 1917, German divisions joined the Austrians for a surprise attack in fog and rain, using gas and small fast-moving squads that slipped along the valley floors behind the Italian positions. The Italian Second Army fell apart. The retreat went on for seventy miles, to the Piave River, where the line finally held with British and French help.',
      significance: 'One of the worst defeats of the war. Italy replaced its commander, treated its soldiers better, and held the Piave; a year later it broke the Austro-Hungarian army for good.',
      images: [
        img('Retraite italienne sur le Tagliamento apres la bataille de Caporetto en 1917.jpg', 'The Italian retreat to the Tagliamento River, from a French illustrated paper of December 1917.', 'Public domain.'),
        img('Italijanski vojni ujetniki po bitki pri Kobaridu.jpg', 'Italian prisoners after Caporetto, 1917.', 'Austro-Hungarian Tenth Army. Public domain.')
      ],
      journal: [
        {
          quote: 'Mainly between Udine and the Tagliamento, they gave way at length to the war-weariness which had so long been at strife with their valour and patriotism, flung away their rifles wholesale, and passed round the word, “Andiamo a casa” (“We\'re going home”).',
          who: 'G. M. Trevelyan', role: 'British historian, commanding a Red Cross ambulance unit with the Italian army', side: 'allied',
          date: 'Written in 1919, of late October 1917', source: 'G. M. Trevelyan, Scenes from Italy\'s War (1919)',
          verified: true, ref: IA('bwb_P9-ECT-837', 'flung away their rifles wholesale'), refTitle: 'G. M. Trevelyan, Scenes from Italy\'s War (1919)'
        }
      ]
    },
    {
      id: 'cambrai',
      name: 'Cambrai',
      start: '1917-11-20', end: '1917-12-07',
      lat: 50.13, lng: 3.16,
      place: 'Cambrai, France',
      theater: 'Western Front',
      result: 'inconclusive', resultLabel: 'Ground won, then lost',
      sideLabels: { allied: 'Britain', central: 'Germany' },
      commanders: { allied: 'Gen. Sir Julian Byng, Brig. Gen. Hugh Elles', central: 'Gen. Georg von der Marwitz' },
      forces: { allied: '19 divisions and 476 tanks', central: '20 divisions by the end' },
      casualties: { allied: 44000, central: 45000, note: 'Estimates.' },
      summary: 'For the first time, tanks were used the way their crews wanted: nearly 400 of them at once, on firm ground, with no long bombardment to warn the enemy and churn up the earth. At dawn they rolled over the barbed wire of the Hindenburg Line and the infantry followed them four miles in a few hours, more than months of fighting had gained at Ypres. Church bells rang in England. But there were no reserves to follow up, and ten days later a German counterattack took most of it back.',
      significance: 'It showed both sides how the trench deadlock would finally be broken: surprise, tanks, aircraft, and artillery working together.',
      images: [
        img('The Battle of Cambrai, November-december 1917 Q6284.jpg', 'A British Mark IV tank in training at Wailly, October 1917, a month before Cambrai.', 'John Warwick Brooke. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'To-morrow the Tank Corps will have the chance for which it has been waiting for many months to operate on good going in the van of the battle. … In the light of past experience I leave the good name of the Corps with great confidence in your hands. I propose leading the attack of the centre division.',
          who: 'Brig. Gen. Hugh Elles', role: 'Commander of the British Tank Corps; Special Order No. 6, read to the crews the night before', side: 'allied',
          date: 'November 19, 1917', source: 'Special Order No. 6, as printed in a 1920 anthology edited by John Buchan',
          verified: true, ref: IA('longroadtovictor00buchuoft', 'the chance for which it has been waiting for many months'), refTitle: 'The Long Road to Victory, edited by John Buchan (1920)'
        }
      ]
    },
    {
      id: 'spring-offensive',
      name: 'The German Spring Offensive',
      start: '1918-03-21', end: '1918-04-29',
      lat: 49.85, lng: 3.29,
      place: 'Saint-Quentin toward Amiens, France, and the Lys River in Flanders',
      theater: 'Western Front',
      result: 'inconclusive', resultLabel: 'German advance, no breakthrough',
      campaign: 'michael',
      sideLabels: { allied: 'Britain and France', central: 'Germany' },
      commanders: { allied: 'Field Marshal Sir Douglas Haig, Gen. Sir Hubert Gough, Gen. Ferdinand Foch', central: 'Gen. Erich Ludendorff, Crown Prince Rupprecht of Bavaria' },
      forces: { allied: 'about 26 British divisions faced the first blow', central: 'about 72 divisions in the first blow, many brought from Russia' },
      casualties: { allied: 370000, central: 340000, note: 'Estimates for March 21 to April 29.' },
      summary: 'Russia had left the war, freeing fifty German divisions, and American troops were arriving slowly. Ludendorff had a few months to win. On March 21, after a five-hour hurricane of shells and gas, storm troops attacked through fog and broke the British Fifth Army. In two weeks the Germans advanced forty miles, farther than anyone had moved on the Western Front since 1914. A second blow fell in Flanders in April. The Allies at last put all their armies under one commander, the French general Foch, and the line bent but held short of Amiens.',
      significance: 'Germany\'s last chance to win. It gained ground it could not hold and lost its best soldiers doing it.',
      images: [
        img('British 55th Division gas casualties 10 April 1918.jpg', 'British soldiers blinded by gas wait for treatment near Béthune, April 10, 1918.', 'Thomas Keith Aitken. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'There is no other course open to us but to fight it out. Every position must be held to the last man: there must be no retirement. With our backs to the wall, and believing in the justice of our cause, each one of us must fight on to the end.',
          who: 'Field Marshal Sir Douglas Haig', role: 'British commander in chief; special order of the day', side: 'allied',
          date: 'April 11, 1918', source: 'Order of the day, as printed in a history published that year', portrait: 'haig',
          verified: true, ref: IA('nelsonshistoryof22buchuoft', 'With our backs to the wall'), refTitle: 'John Buchan, Nelson\'s History of the War, vol. 22 (1918)'
        },
        {
          quote: 'As soon as I got near the town I began to see curious sights. Strange figures, which looked very little like soldiers, and certainly showed no sign of advancing, were making their way back out of the town. There were men driving cows before them on a line; others who carried a hen under one arm and a box of notepaper under the other.',
          who: 'Capt. Rudolf Binding', role: 'German staff officer, sent to find out why the advance had stopped at Albert. Hungry troops had found the British supply depots.', side: 'central',
          date: 'March 28, 1918', source: 'Rudolf Binding, A Fatalist at War (English translation, 1929)',
          verified: true, ref: IA('fatalistatwar00bind', 'Strange figures, which looked very little like soldiers'), refTitle: 'Rudolf Binding, A Fatalist at War (English translation, 1929)'
        }
      ]
    },
    {
      id: 'belleau-wood',
      name: 'Cantigny and Belleau Wood',
      start: '1918-05-28', end: '1918-06-26',
      lat: 49.07, lng: 3.29,
      place: 'Cantigny and Château-Thierry, France',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'aef',
      sideLabels: { allied: 'United States and France', central: 'Germany' },
      commanders: { allied: 'Gen. John J. Pershing, Maj. Gen. Robert Bullard, Maj. Gen. Omar Bundy, Brig. Gen. James Harbord', central: 'Crown Prince Wilhelm' },
      forces: { allied: 'the U.S. 1st Division at Cantigny; the 2nd Division, with its Marine brigade, at Belleau Wood', central: 'parts of five divisions at Belleau Wood' },
      casualties: { allied: 11400, central: 11000, note: 'American losses were about 1,600 at Cantigny and 9,800 at Belleau Wood. The German figure is an estimate.' },
      summary: 'A third German offensive reached the Marne at Château-Thierry, fifty miles from Paris. American divisions, in France for months but mostly still training, were rushed in. On May 28 the 1st Division took the village of Cantigny, the first American attack of the war, and held it. In June the 2nd Division blocked the road to Paris and then spent three weeks clearing Belleau Wood, a square mile of boulders and machine-gun nests, in attacks that cost the Marine Corps more men than all its earlier history.',
      significance: 'Small battles by the standards of this war, but they showed both sides that the Americans would fight, and there were a million more of them on the way.',
      images: [
        img('Collier\'s 1921 World War - Marines in Belleau Wood by Georges Scott.jpg', 'U.S. Marines in Belleau Wood, painted in 1918 by the French war artist Georges Scott.', 'Georges Scott, 1918. Public domain.'),
        img('U.S. Marines standing in ranks with gas masks attached; France, 1918 LCCN2005694933.jpg', 'U.S. Marines in France with their gas masks ready, 1918.', 'Library of Congress.')
      ],
      journal: [
        {
          quote: 'As the minute for the advance arrived, he arose from the trees first and jumped out onto the exposed edge of that field that ran with lead, across which he and his men were to charge. Then he turned to give the charge order to the men of his platoon — his mates — the men he loved. He said: “Come on, you … do you want to live forever?”',
          who: 'Floyd Gibbons', role: 'Chicago Tribune correspondent with the Marines; he lost an eye in the same attack. The sergeant\'s swearing is left out here.', side: 'allied',
          date: 'June 6, 1918', source: 'Floyd Gibbons, “And They Thought We Wouldn\'t Fight” (1918)',
          verified: true, ref: IA('andtheythoughtwe00gibb', 'do you want to live forever'), refTitle: 'Floyd Gibbons, “And They Thought We Wouldn\'t Fight” (1918)'
        },
        {
          quote: 'The enemy having been halted, the Second Division commenced a series of vigorous attacks on June 4, which resulted in the capture of Belleau Woods after very severe fighting. … In these operations the Second Division met with most desperate resistance by Germany\'s best troops.',
          who: 'Gen. John J. Pershing', role: 'Commander in chief, American Expeditionary Forces', side: 'allied',
          date: 'Report dated September 1, 1919', source: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)', portrait: 'pershing',
          verified: true, ref: IA('cu31924027816747', 'the capture of Belleau Woods after very severe fighting'), refTitle: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)'
        }
      ]
    },
    {
      id: 'second-marne',
      name: 'Second Battle of the Marne',
      start: '1918-07-15', end: '1918-08-06',
      lat: 49.22, lng: 3.5,
      place: 'Between Soissons and Reims, France',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'aef',
      sideLabels: { allied: 'France, United States, Britain, and Italy', central: 'Germany' },
      commanders: { allied: 'Gen. Ferdinand Foch, Gen. Charles Mangin, Gen. John J. Pershing', central: 'Gen. Erich Ludendorff, Crown Prince Wilhelm' },
      forces: { allied: '44 French divisions, 8 American, 4 British, and 2 Italian', central: '52 divisions' },
      casualties: { allied: 133000, central: 168000, note: 'Estimates. About 29,000 Germans were taken prisoner.' },
      summary: 'Ludendorff\'s fifth offensive crossed the Marne on July 15 and went nowhere: the French knew it was coming and had pulled back out of range of the bombardment. Three days later Foch struck the side of the bulge the Germans had pushed toward Paris. At dawn on July 18, with no warning bombardment, French and American divisions and 350 tanks came out of the forest near Soissons. The Germans gave up the whole bulge within three weeks.',
      significance: 'The turn of the tide. From July 18, 1918, until the armistice, the German army only retreated.',
      images: [
        img('CHATEAU-THIERRY - The Great War - American artillery going to the front (3022621332).jpg', 'American artillery on its way to the front at Château-Thierry, 1918.', 'George Eastman Museum.')
      ],
      journal: [
        {
          quote: 'The advance began on July 18, without the usual brief warning of a preliminary bombardment, and these three divisions at a single bound broke through the enemy\'s infantry defenses and overran his artillery, cutting or interrupting the German communications leading into the salient.',
          who: 'Gen. John J. Pershing', role: 'Commander in chief, American Expeditionary Forces, on the U.S. 1st and 2nd Divisions and the French Moroccan Division', side: 'allied',
          date: 'Report dated September 1, 1919', source: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)', portrait: 'pershing',
          verified: true, ref: IA('cu31924027816747', 'at a single bound broke through'), refTitle: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)'
        }
      ]
    },
    {
      id: 'amiens',
      name: 'Amiens',
      start: '1918-08-08', end: '1918-08-12',
      lat: 49.87, lng: 2.52,
      place: 'East of Amiens, France',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'hundred-days',
      sideLabels: { allied: 'Britain, Australia, Canada, and France', central: 'Germany' },
      commanders: { allied: 'Field Marshal Sir Douglas Haig, Gen. Sir Henry Rawlinson, Lt. Gen. Sir John Monash, Lt. Gen. Sir Arthur Currie', central: 'Gen. Georg von der Marwitz, Gen. Erich Ludendorff' },
      forces: { allied: 'about 75,000 men, more than 500 tanks, and 1,900 aircraft on the first day', central: 'about 37,000 men on the front attacked' },
      casualties: { allied: 44000, central: 75000, note: 'Estimates. About 30,000 of the German losses were prisoners, many of whom surrendered without fighting.' },
      summary: 'In thick fog before dawn on August 8, Australian and Canadian infantry and more than 500 tanks attacked without any warning bombardment. By nightfall they had gone seven miles and taken 13,000 prisoners. What alarmed the German command was not the ground lost but how it was lost: whole units had given up, and men going up to the front were jeered by those coming back for prolonging the war.',
      significance: 'The start of the Hundred Days, the string of Allied attacks that ended the war. Ludendorff told the Kaiser a few days later that Germany could no longer win.',
      images: [
        img('60pdrsBattleOfAmiens1918.jpg', 'British heavy guns in action during the Battle of Amiens, August 1918.', 'William Rider-Rider, Canadian official photographer.'),
        img('The Hundred Days Offensive, August-november 1918 Q6916.jpg', 'German prisoners taken at Amiens, August 8, 1918.', 'John Warwick Brooke. Imperial War Museums.')
      ],
      journal: [
        {
          quote: 'August 8th was the black day of the German Army in the history of this war. This was the worst experience that I had to go through',
          who: 'Gen. Erich Ludendorff', role: 'In effective command of the German army', side: 'central',
          date: 'Written in 1919', source: 'Gen. Erich Ludendorff, My War Memories, 1914–1918 (English translation, 1919)', portrait: 'ludendorff',
          verified: true, ref: IA('mywarmemories19102lude', 'the black day of the German Army in the history of this war'), refTitle: 'Gen. Erich Ludendorff, My War Memories, 1914–1918 (English translation, 1919)'
        }
      ]
    },
    {
      id: 'st-mihiel',
      name: 'Saint-Mihiel',
      start: '1918-09-12', end: '1918-09-15',
      lat: 48.89, lng: 5.54,
      place: 'Saint-Mihiel, Lorraine, France',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'aef',
      sideLabels: { allied: 'United States and France', central: 'Germany' },
      commanders: { allied: 'Gen. John J. Pershing', central: 'Lt. Gen. Georg Fuchs, Gen. Max von Gallwitz' },
      forces: { allied: 'about 550,000 Americans and 110,000 French, with 1,400 aircraft', central: 'about 75,000' },
      casualties: { allied: 7000, central: 22500, note: 'The German figure includes about 16,000 prisoners.' },
      summary: 'For four years a German bulge had stuck into the French line south of Verdun. Pershing had insisted that American troops fight as one army under American command, and this was its first battle. Half a million men attacked both sides of the bulge in the rain, with the largest air force yet assembled overhead under Col. Billy Mitchell. The Germans had already begun to pull out, and the bulge was gone in thirty-six hours.',
      significance: 'The first battle of an independent American army. Within two weeks most of it had been moved sixty miles for a much harder fight in the Meuse-Argonne.',
      images: [
        img('Collier\'s 1921 World War - American troops pour into St. Mihiel salient toward Mont Sec.jpg', 'American troops moving into the Saint-Mihiel salient, September 12, 1918.', 'Committee on Public Information. Public domain.'),
        img('World War I photographs - NARA - 285377.jpg', 'American engineers returning from the Saint-Mihiel front, September 1918.', 'U.S. Army. U.S. National Archives.')
      ],
      journal: [
        {
          quote: 'The rapidity with which our divisions advanced overwhelmed the enemy, and all objectives were reached by the afternoon of September 13. … We captured nearly 16,000 prisoners, 443 guns, and large stores of material and supplies.',
          who: 'Gen. John J. Pershing', role: 'Commander in chief, American Expeditionary Forces', side: 'allied',
          date: 'Report dated September 1, 1919', source: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)', portrait: 'pershing',
          verified: true, ref: IA('cu31924027816747', 'We captured nearly 16,000 prisoners'), refTitle: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)'
        }
      ]
    },
    {
      id: 'meuse-argonne',
      name: 'Meuse-Argonne and the Armistice',
      start: '1918-09-26', end: '1918-11-11',
      lat: 49.27, lng: 5.14,
      place: 'Between the Meuse River and the Argonne Forest, France',
      theater: 'Western Front',
      result: 'allied',
      campaign: 'aef',
      sideLabels: { allied: 'United States and France', central: 'Germany' },
      commanders: { allied: 'Gen. John J. Pershing, Lt. Gen. Hunter Liggett', central: 'Gen. Max von Gallwitz, Crown Prince Wilhelm' },
      forces: { allied: '1.2 million Americans over the battle', central: 'about 450,000' },
      casualties: { allied: 122000, central: 100000, note: 'American losses only: 26,277 killed, the deadliest battle in United States history. French troops beside them lost about 70,000. The German figure is an estimate.' },
      summary: 'The American part of Foch\'s final attack was aimed at the railroad that supplied the whole German front. In the way lay twelve miles of forest, ravines, and three fortified lines. The first days went badly: green divisions, jammed roads, heavy losses. One battalion was cut off for five days in the Argonne; a Tennessee corporal, Alvin York, captured 132 men. In November the line broke, and the Americans were on the hills above Sedan when the guns stopped at 11 a.m. on November 11.',
      significance: 'The largest battle Americans had ever fought. Together with the British and French advances to the north, it convinced Germany\'s generals to ask for an armistice.',
      images: [
        img('US23rdInfantry37mmGunInActionFrance1918-ARC531005.gif', 'A gun crew of the U.S. 23rd Infantry fires a 37 mm gun during the advance, 1918.', 'U.S. Army Signal Corps. U.S. National Archives.'),
        img('US 64th regiment celebrate the Armistice.jpg', 'Men of the U.S. 64th Infantry celebrate the news of the armistice, November 11, 1918.', 'U.S. Army.'),
        img('Alvin C. York 1919.jpg', 'Sgt. Alvin C. York, 1919.', 'Underwood & Underwood. Public domain.')
      ],
      journal: [
        {
          quote: 'At 6 a. m. on the 11th notification was received from Marshal Foch\'s headquarters that the Armistice had been signed and that hostilities would cease at 11 a. m.',
          who: 'Gen. John J. Pershing', role: 'Commander in chief, American Expeditionary Forces', side: 'allied',
          date: 'November 11, 1918', source: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)', portrait: 'pershing',
          verified: true, ref: IA('cu31924027816747', 'hostilities would cease at 11'), refTitle: 'Final Report of Gen. John J. Pershing (U.S. Government Printing Office, 1919)'
        },
        {
          quote: 'The armistice was signed this morning. Everything for which America fought has been accomplished.',
          who: 'President Woodrow Wilson', role: 'Announcement to the American people', side: 'allied',
          date: 'November 11, 1918', source: 'Statement issued from the White House, as printed in a history published that year', portrait: 'wilson',
          verified: true, ref: IA('historyofworldwa0000unse_t6a0', 'Everything for which America fought has been accomplished'), refTitle: 'Francis A. March, History of the World War (1918)'
        }
      ]
    }
  ];

  const CAMPAIGNS = [
    {
      id: 'kluck', name: 'The German Sweep through Belgium', side: 'central',
      army: 'German First Army', commander: 'Alexander von Kluck',
      start: '1914-08-04', end: '1914-09-13',
      description: 'The outermost army of the great German wheel had the farthest to march: through Belgium, down past Paris, 300 miles in a month on foot. Worn out and short of supplies, it turned east of Paris instead of west, and was caught in the side at the Marne.',
      path: [
        [50.78, 6.08, '1914-08-04', 'Aachen, the German border'],
        [50.64, 5.57, '1914-08-07', 'Liège'],
        [50.85, 4.35, '1914-08-20', 'Brussels'],
        [50.45, 3.95, '1914-08-23', 'Mons'],
        [50.1, 3.54, '1914-08-26', 'Le Cateau'],
        [49.85, 3.29, '1914-08-29', 'Saint-Quentin'],
        [49.42, 2.83, '1914-09-01', 'Compiègne'],
        [48.82, 3.08, '1914-09-05', 'South of the Marne, east of Paris'],
        [49.38, 3.32, '1914-09-13', 'Retreat to the Aisne']
      ]
    },
    {
      id: 'bef', name: 'The British Retreat from Mons and Return', side: 'allied',
      army: 'British Expeditionary Force', commander: 'Sir John French',
      start: '1914-08-23', end: '1914-10-14',
      description: 'Britain\'s small professional army met the Germans at Mons, retreated 200 miles in two weeks of marching and rearguard fights, turned at the Marne, and was then moved north to Flanders, where it was nearly destroyed at Ypres.',
      path: [
        [50.45, 3.95, '1914-08-23', 'Mons'],
        [50.1, 3.54, '1914-08-26', 'Le Cateau'],
        [49.85, 3.29, '1914-08-28', 'Saint-Quentin'],
        [48.68, 2.95, '1914-09-05', 'South of the Marne'],
        [48.95, 3.13, '1914-09-09', 'Across the Marne'],
        [49.4, 3.5, '1914-09-13', 'The Aisne'],
        [50.85, 2.89, '1914-10-14', 'Ypres']
      ]
    },
    {
      id: 'russian-second', name: 'Samsonov\'s Invasion of East Prussia', side: 'allied',
      army: 'Russian Second Army', commander: 'Alexander Samsonov',
      start: '1914-08-17', end: '1914-08-30',
      description: 'The Second Army crossed into Germany from the south over sandy roads, ahead of its supplies, to trap the Germans against the army invading from the east. It marched into a trap instead.',
      path: [
        [53.08, 21.57, '1914-08-17', 'Ostrołęka'],
        [53.36, 20.43, '1914-08-22', 'Neidenburg'],
        [53.58, 20.28, '1914-08-26', 'Hohenstein'],
        [53.4, 20.95, '1914-08-30', 'Surrounded near Willenberg']
      ]
    },
    {
      id: 'german-eighth', name: 'Hindenburg\'s Eighth Army', side: 'central',
      army: 'German Eighth Army', commander: 'Paul von Hindenburg',
      start: '1914-08-20', end: '1914-09-09',
      description: 'Beaten in the east at Gumbinnen, the Eighth Army used East Prussia\'s railways to switch nearly its whole strength southwest against Samsonov, then turned back to drive the other Russian army out at the Masurian Lakes.',
      path: [
        [54.59, 22.2, '1914-08-20', 'Gumbinnen'],
        [53.6, 19.57, '1914-08-24', 'By rail to Deutsch Eylau'],
        [53.5, 20.13, '1914-08-27', 'Tannenberg'],
        [53.36, 20.43, '1914-08-29', 'Neidenburg'],
        [54.04, 21.77, '1914-09-09', 'The Masurian Lakes']
      ]
    },
    {
      id: 'gallipoli', name: 'The Gallipoli Expedition', side: 'allied',
      army: 'Mediterranean Expeditionary Force', commander: 'Ian Hamilton',
      start: '1915-04-23', end: '1916-01-09',
      description: 'The force gathered at the Greek island of Lemnos, landed at two ends of the peninsula in April, tried a third landing at Suvla Bay in August, and was taken off again in the winter.',
      path: [
        [39.87, 25.27, '1915-04-23', 'Mudros harbor, Lemnos'],
        [40.24, 26.28, '1915-04-25', 'Anzac Cove'],
        [40.31, 26.23, '1915-08-06', 'Suvla Bay'],
        [39.87, 25.27, '1916-01-09', 'Evacuated to Lemnos']
      ]
    },
    {
      id: 'high-seas-fleet', name: 'The High Seas Fleet at Jutland', side: 'central',
      army: 'German High Seas Fleet', commander: 'Reinhard Scheer',
      start: '1916-05-31', end: '1916-06-01',
      description: 'The German fleet sailed north to lure out and destroy part of the British fleet, met all of it, and escaped home in the night past the Horns Reef.',
      path: [
        [53.52, 8.13, '1916-05-31', 'Wilhelmshaven'],
        [56.7, 5.9, '1916-05-31', 'Jutland Bank'],
        [55.5, 7.3, '1916-06-01', 'Horns Reef'],
        [53.52, 8.13, '1916-06-01', 'Wilhelmshaven']
      ]
    },
    {
      id: 'grand-fleet', name: 'The Grand Fleet at Jutland', side: 'allied',
      army: 'British Grand Fleet', commander: 'John Jellicoe',
      start: '1916-05-30', end: '1916-06-02',
      description: 'British codebreakers knew the Germans were coming out, and the Grand Fleet sailed from its Scottish bases hours before they did.',
      path: [
        [58.9, -3.05, '1916-05-30', 'Scapa Flow'],
        [57.0, 5.7, '1916-05-31', 'Jutland Bank'],
        [58.9, -3.05, '1916-06-02', 'Scapa Flow']
      ]
    },
    {
      id: 'brusilov', name: 'Brusilov\'s Offensive', side: 'allied',
      army: 'Russian Eighth Army', commander: 'Aleksei Brusilov',
      start: '1916-06-04', end: '1916-08-01',
      description: 'The strongest of Brusilov\'s four armies broke the Austro-Hungarian line in three days and took Lutsk, then was stopped in the marshes of the Stokhod River by German reinforcements.',
      path: [
        [50.62, 26.25, '1916-06-04', 'Rovno'],
        [50.75, 25.33, '1916-06-07', 'Lutsk'],
        [51.05, 24.95, '1916-07-07', 'The Stokhod River'],
        [51.15, 24.85, '1916-08-01', 'Stopped short of Kovel']
      ]
    },
    {
      id: 'caporetto', name: 'The Breakthrough at Caporetto', side: 'central',
      army: 'German Fourteenth Army', commander: 'Otto von Below',
      start: '1917-10-24', end: '1917-11-10',
      description: 'German and Austro-Hungarian troops broke out of the mountains onto the plain of Venice and advanced seventy miles in two weeks.',
      path: [
        [46.18, 13.73, '1917-10-24', 'Tolmin'],
        [46.25, 13.58, '1917-10-24', 'Caporetto'],
        [46.09, 13.43, '1917-10-27', 'Cividale'],
        [46.06, 13.24, '1917-10-28', 'Udine'],
        [45.95, 12.9, '1917-11-02', 'The Tagliamento River'],
        [45.75, 12.25, '1917-11-10', 'The Piave River']
      ]
    },
    {
      id: 'michael', name: 'Operation Michael', side: 'central',
      army: 'German Eighteenth Army', commander: 'Oskar von Hutier',
      start: '1918-03-21', end: '1918-04-04',
      description: 'The first and largest of Ludendorff\'s spring attacks drove forty miles across the old Somme battlefield toward the rail center of Amiens, and stopped ten miles short of it.',
      path: [
        [49.85, 3.29, '1918-03-21', 'Saint-Quentin'],
        [49.75, 3.07, '1918-03-23', 'Ham'],
        [49.93, 2.93, '1918-03-24', 'Péronne'],
        [49.65, 2.57, '1918-03-27', 'Montdidier'],
        [49.87, 2.52, '1918-04-04', 'Stopped at Villers-Bretonneux']
      ]
    },
    {
      id: 'aef', name: 'The American Expeditionary Forces', side: 'allied',
      army: 'American Expeditionary Forces', commander: 'John J. Pershing',
      start: '1917-06-26', end: '1918-11-07',
      description: 'The first Americans landed in June 1917. They trained for nearly a year, fought their first battles in the spring of 1918, and by the autumn were an army of more than a million holding a quarter of the Western Front.',
      path: [
        [47.27, -2.21, '1917-06-26', 'Saint-Nazaire: the first troops land'],
        [48.51, 5.51, '1917-07-15', 'Training camps in Lorraine'],
        [49.66, 2.49, '1918-05-28', 'Cantigny'],
        [49.05, 3.39, '1918-06-01', 'Château-Thierry and Belleau Wood'],
        [49.38, 3.32, '1918-07-18', 'Soissons'],
        [48.89, 5.54, '1918-09-12', 'Saint-Mihiel'],
        [49.27, 5.14, '1918-09-27', 'Montfaucon'],
        [49.68, 4.94, '1918-11-07', 'The heights above Sedan']
      ]
    },
    {
      id: 'hundred-days', name: 'The Hundred Days', side: 'allied',
      army: 'British Fourth Army and its neighbors', commander: 'Douglas Haig',
      start: '1918-08-08', end: '1918-11-11',
      description: 'From Amiens the British, Australian, and Canadian armies attacked again and again, each time in a new place, broke the Hindenburg Line at the end of September, and ended the war at Mons, where they had begun it.',
      path: [
        [49.89, 2.3, '1918-08-08', 'Amiens'],
        [50.0, 2.65, '1918-08-22', 'Albert'],
        [49.93, 2.93, '1918-09-01', 'Péronne'],
        [49.95, 3.23, '1918-09-29', 'The Hindenburg Line'],
        [50.18, 3.24, '1918-10-09', 'Cambrai'],
        [50.1, 3.54, '1918-10-17', 'Le Cateau'],
        [50.45, 3.95, '1918-11-11', 'Mons']
      ]
    }
  ];

  const EVENTS = [
    { date: '1914-06-28', title: 'Archduke Franz Ferdinand of Austria-Hungary is shot in Sarajevo' },
    { date: '1914-07-28', title: 'Austria-Hungary declares war on Serbia' },
    { date: '1914-08-01', title: 'Germany declares war on Russia' },
    { date: '1914-08-03', title: 'Germany declares war on France' },
    { date: '1914-08-04', title: 'Britain declares war on Germany' },
    { date: '1914-10-29', title: 'The Ottoman Empire enters the war on Germany\'s side' },
    { date: '1915-02-04', title: 'Germany declares the seas around Britain a war zone' },
    { date: '1915-05-23', title: 'Italy joins the Allies' },
    { date: '1916-01-27', title: 'Britain begins drafting men into its army' },
    { date: '1916-09-15', title: 'Tanks are used in battle for the first time, on the Somme' },
    { date: '1917-03-01', title: 'American newspapers print the Zimmermann Telegram' },
    { date: '1917-03-15', title: 'Tsar Nicholas II of Russia gives up his throne' },
    { date: '1917-04-06', title: 'The United States declares war on Germany' },
    { date: '1917-05-03', title: 'Mutinies begin in the French army' },
    { date: '1917-06-26', title: 'The first American troops land in France' },
    { date: '1917-11-07', title: 'The Bolsheviks seize power in Russia' },
    { date: '1917-12-09', title: 'British troops take Jerusalem from the Ottoman Empire' },
    { date: '1918-01-08', title: 'President Wilson sets out his Fourteen Points for peace' },
    { date: '1918-03-03', title: 'Russia signs the Treaty of Brest-Litovsk and leaves the war' },
    { date: '1918-03-26', title: 'The Allies put their armies under one commander, Ferdinand Foch' },
    { date: '1918-09-29', title: 'Bulgaria signs an armistice; British troops break the Hindenburg Line' },
    { date: '1918-10-30', title: 'The Ottoman Empire signs an armistice' },
    { date: '1918-11-03', title: 'Austria-Hungary signs an armistice; German sailors mutiny at Kiel' },
    { date: '1918-11-09', title: 'Kaiser Wilhelm II gives up his throne; Germany becomes a republic' },
    { date: '1918-11-11', title: 'The armistice takes effect at 11 a.m.' }
  ];

  const SOURCES = [
    { title: 'With the Russian Army, 1914–1917', author: 'Maj. Gen. Sir Alfred Knox', year: 1921, url: 'https://archive.org/details/withrussianarmy101knoxuoft' },
    { title: 'Out of My Life', author: 'Marshal Paul von Hindenburg', year: 1920, url: 'https://archive.org/details/OutOfMyLife' },
    { title: 'My War Memories, 1914–1918', author: 'Gen. Erich Ludendorff', year: 1919, url: 'https://archive.org/details/mywarmemories19102lude' },
    { title: 'General Headquarters 1914–1916 and Its Critical Decisions', author: 'Gen. Erich von Falkenhayn', year: 1919, url: 'https://archive.org/details/generalheadquart00falk' },
    { title: 'A Hilltop on the Marne', author: 'Mildred Aldrich', year: 1915, url: 'https://archive.org/details/ahilltoponmarne00aldrgoog' },
    { title: 'The Marne Campaign', author: 'Maj. F. E. Whitton', year: 1917, url: 'https://archive.org/details/dli.ernet.527717' },
    { title: 'German Students\' War Letters', author: 'Philipp Witkop, editor; A. F. Wedd, translator', year: 1929, url: 'https://archive.org/details/germanstudentswarletters' },
    { title: 'Bullets & Billets', author: 'Bruce Bairnsfather', year: 1916, url: 'https://archive.org/details/bulletsandbillet00bairuoft' },
    { title: 'A Fatalist at War', author: 'Rudolf Binding', year: 1929, url: 'https://archive.org/details/fatalistatwar00bind' },
    { title: 'Gallipoli Diary', author: 'Gen. Sir Ian Hamilton', year: 1920, url: 'https://archive.org/details/gallipolidiary0001siri' },
    { title: 'Ambassador Morgenthau\'s Story', author: 'Henry Morgenthau', year: 1918, url: 'https://archive.org/details/ambassadormorge00morggoog' },
    { title: 'The Lusitania\'s Last Voyage', author: 'Charles E. Lauriat Jr.', year: 1915, url: 'https://archive.org/details/lusitaniaslastv00laurgoog' },
    { title: 'Germany\'s High Sea Fleet in the World War', author: 'Adm. Reinhard Scheer', year: 1920, url: 'https://archive.org/details/cu31924027832744' },
    { title: 'The Grand Fleet, 1914–1916', author: 'Adm. Viscount Jellicoe', year: 1919, url: 'https://archive.org/details/grandfleet1914100jell' },
    { title: 'Letters and Diary of Alan Seeger', author: 'Alan Seeger', year: 1917, url: 'https://archive.org/details/diaryalanseeger00alanrich' },
    { title: 'The Battles of the Somme', author: 'Philip Gibbs', year: 1917, url: 'https://archive.org/details/battlesofsomme00gibb' },
    { title: 'From Bapaume to Passchendaele, 1917', author: 'Philip Gibbs', year: 1918, url: 'https://archive.org/details/frombapaumetopas00gibb' },
    { title: 'Scenes from Italy\'s War', author: 'G. M. Trevelyan', year: 1919, url: 'https://archive.org/details/bwb_P9-ECT-837' },
    { title: '“And They Thought We Wouldn\'t Fight”', author: 'Floyd Gibbons', year: 1918, url: 'https://archive.org/details/andtheythoughtwe00gibb' },
    { title: 'Final Report of Gen. John J. Pershing', author: 'American Expeditionary Forces', year: 1919, url: 'https://archive.org/details/cu31924027816747' },
    { title: 'The Times History of the War, vol. 9', author: 'The Times (London)', year: 1916, url: 'https://archive.org/details/in.ernet.dli.2015.203941' },
    { title: 'Chronicling America: Historic American Newspapers', author: 'Library of Congress', year: 1918, url: 'https://www.loc.gov/collections/chronicling-america/' }
  ];

  const TOURS = [
    {
      id: 'why-the-deadlock', title: 'Why Did the War Bog Down?', grades: '6–9', minutes: 30,
      question: 'Everyone expected a short war. Why did it turn into four years of trenches?',
      summary: 'Seven stops from the invasion of Belgium to the first mass tank attack. Students watch the war of movement fail in six weeks, see why trenches were so hard to break, and follow the search for a way through.',
      stops: [
        { title: 'The plan', battle: 'belgium', entry: 0,
          text: 'Germany means to beat France in six weeks by marching through neutral Belgium. Play the route of the German First Army and watch how far it has to go on foot.',
          ask: ['What does Davis compare the German army to? What feeling is he trying to give his readers in America?', 'Follow the red route. What could go wrong with a plan that depends on marching 300 miles in a month?'] },
        { title: 'The plan fails', battle: 'marne', entry: 0,
          text: 'Thirty miles from Paris, the French and British turn and attack.',
          ask: ['Read Joffre\'s order. What is he asking of his soldiers?', 'After the Marne both armies dug in. Why would tired armies start digging?'] },
        { title: 'No way around', battle: 'ypres-1914', entry: 0,
          text: 'Each side tries to get around the other\'s northern end until they both reach the sea.',
          ask: ['Buchalski volunteered in August. How has he changed by October?', 'Once the trenches ran from the sea to Switzerland, what choices did an attacking general have left?'] },
        { title: 'A new weapon', battle: 'second-ypres', entry: 0,
          text: 'Germany tries to break the line with poison gas.',
          ask: ['Binding is a German officer. How does he feel about his own side\'s weapon?', 'He predicts the world "will rage about it first and then imitate us." Was he right? Why would that happen?'] },
        { title: 'Bleed them', battle: 'verdun', entry: 0,
          text: 'If the line cannot be broken, perhaps the enemy army can be worn away.',
          ask: ['What does Falkenhayn say the aim of the attack is? How is that different from trying to capture a place?', 'Look at the casualty bars. Did the plan work?'] },
        { title: 'The big push', battle: 'somme', entry: 1,
          text: 'Britain tries a week-long bombardment followed by a mass attack. Read what the newspapers were told on the first day, then read the casualty note.',
          ask: ['Compare Gibbs\'s report with the numbers for July 1. Why might the two be so different?', 'Who decided what Gibbs was allowed to send?'] },
        { title: 'A way through', battle: 'cambrai', entry: 0,
          text: 'Nearly 400 tanks attack at once, without warning.',
          ask: ['Why does it matter that General Elles led the attack himself?', 'The ground won at Cambrai was lost ten days later. What was still missing?'] }
      ]
    },
    {
      id: 'reading-the-sources', title: 'Who Is Telling Us This?', grades: '8–12', minutes: 30,
      question: 'A letter, an order, a news report, and a memoir can describe the same war very differently. How do we weigh them?',
      summary: 'Six stops that pair different kinds of sources: a private letter, a general\'s order, a censored dispatch, a diplomat\'s report, a memoir written to defend its author, and a newspaper notice.',
      stops: [
        { title: 'A letter home', battle: 'ypres-1914', entry: 1,
          text: 'Lothar Dietz writes to his family from a dugout.',
          ask: ['Who was this written for? How might that shape what he says?', 'What does he say the newspapers get wrong?'] },
        { title: 'An order to the troops', battle: 'spring-offensive', entry: 0,
          text: 'Haig\'s order was read aloud to every unit and printed in the newspapers.',
          ask: ['What is this order for? Who are its audiences?', 'Now read Binding, on the German side, two weeks earlier. What did each army not know about the other?'] },
        { title: 'A dispatch through the censor', battle: 'somme', entry: 1,
          text: 'War correspondents lived at army headquarters and showed their reports to an officer before sending them.',
          ask: ['Find one statement in Gibbs\'s report that is true and one that leaves a false impression.', 'Gibbs later wrote a book called Now It Can Be Told. What does that title admit?'] },
        { title: 'A diplomat\'s report', battle: 'armenian-genocide', entry: 0,
          text: 'Morgenthau was the ambassador of a neutral country, with consuls across the empire sending him reports.',
          ask: ['What makes Morgenthau a strong witness? What could he not see for himself?', 'He published this in 1918, when the United States was at war. Does that change how you read it?'] },
        { title: 'A memoir', battle: 'verdun', entry: 0,
          text: 'Falkenhayn printed this memorandum in 1919. No copy from 1915 has ever been found.',
          ask: ['Why might a general, after a failed battle, want readers to believe this had been the plan all along?', 'What other evidence would help decide whether the memorandum is genuine?'] },
        { title: 'A notice in the newspaper', battle: 'lusitania', entry: 1,
          text: 'The German Embassy paid to print this warning beside the sailing schedules.',
          ask: ['Does the warning change who was responsible for what happened? Argue both sides.', 'Read Lauriat\'s account. What details show he was writing soon after the event?'] }
      ]
    },
    {
      id: 'america-and-the-war', title: 'Why Did America Join, and Did It Matter?', grades: '6–10', minutes: 25,
      question: 'The United States stayed out for almost three years. What brought it in, and what difference did it make?',
      summary: 'Seven stops from the Lusitania to the armistice, following the argument over neutrality and then the American army in France.',
      stops: [
        { title: 'A liner is sunk', battle: 'lusitania', entry: 0,
          text: '128 Americans are among the dead, but the United States does not go to war.',
          ask: ['Why might most Americans in 1915 still have wanted to stay out?', 'What did Germany gain and lose by sinking the ship?'] },
        { title: 'The gamble', battle: 'u-boat-war', entry: 0,
          text: 'In 1917 Germany decides to sink every ship it can, knowing it will bring America in.',
          ask: ['What reasons does Wilson give for going to war? Which words has he chosen most carefully?', 'Germany\'s leaders expected to win before American soldiers arrived. Look at the timeline: how close did they come?'] },
        { title: 'The race', battle: 'spring-offensive', entry: 0,
          text: 'With Russia out of the war, Germany attacks in the West before the Americans can arrive in strength.',
          ask: ['Why was the spring of 1918 Germany\'s best chance and its last?'] },
        { title: 'First fights', battle: 'belleau-wood', entry: 0,
          text: 'American troops go into battle near Paris.',
          ask: ['These were small battles. Why did they matter so much to both sides?', 'Gibbons was a reporter. What is he trying to make readers at home feel?'] },
        { title: 'The tide turns', battle: 'second-marne', entry: 0,
          text: 'On July 18 the Allies attack, and the Germans never advance again.',
          ask: ['Play the route of the American Expeditionary Forces. How long was it between the first landing and the first big battle? Why so long?'] },
        { title: 'An American army', campaign: 'aef',
          text: 'Pershing insisted that Americans fight as one army under American officers rather than as replacements in French and British units.',
          ask: ['What were the arguments for and against Pershing\'s demand?'] },
        { title: 'The eleventh hour', battle: 'meuse-argonne', entry: 0,
          text: 'The largest American battle up to that time ends with the armistice.',
          ask: ['Fighting went on until 11 a.m. on the last morning. Should it have?', 'Wilson says everything America fought for "has been accomplished." Reading what you know of the next twenty years, was he right?'] }
      ]
    }
  ];

  const VOCAB = [
    { term: 'Allies', def: 'The countries that fought Germany and its partners: chiefly France, Britain and its empire, Russia (until 1917), Italy (from 1915), and the United States (from 1917), with Belgium, Serbia, and many others.' },
    { term: 'Central Powers', def: 'Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria.' },
    { term: 'Western Front', def: 'The line of trenches across Belgium and France, about 450 miles from the North Sea to Switzerland.' },
    { term: 'Eastern Front', def: 'The much longer and more open front between Germany and Austria-Hungary on one side and Russia on the other.' },
    { term: 'Mobilization', def: 'Calling up a country\'s trained reserves and moving its armies to the border. In 1914 it took millions of men and thousands of trains, and once begun it was very hard to stop.' },
    { term: 'Neutral', def: 'Taking no side in a war. Belgium\'s neutrality was guaranteed by a treaty Germany had signed.' },
    { term: 'Trench', def: 'A deep ditch soldiers dug for protection from bullets and shells. By 1915 each side had several lines of them, with barbed wire in front.' },
    { term: 'No man\'s land', def: 'The strip of ground between the two sides\' front trenches, sometimes only fifty yards wide.' },
    { term: 'Over the top', def: 'Climbing out of a trench to attack across no man\'s land.' },
    { term: 'Artillery barrage', def: 'A storm of shells from cannon, fired to destroy defenses or to keep defenders\' heads down while infantry advanced.' },
    { term: 'Stalemate', def: 'A situation in which neither side can win or move. The Western Front barely moved from late 1914 to early 1918.' },
    { term: 'Attrition', def: 'Trying to win by killing and wounding so many of the enemy that he runs out of men first.' },
    { term: 'Poison gas', def: 'Chlorine, phosgene, and mustard gas, released from cylinders or fired in shells. It blinded, burned, and choked.' },
    { term: 'Salient', def: 'A bulge in the front line that sticks out into enemy territory and can be fired on from three sides.' },
    { term: 'U-boat', def: 'A German submarine, from the German word Unterseeboot.' },
    { term: 'Convoy', def: 'A group of cargo ships sailing together under the protection of warships.' },
    { term: 'Blockade', def: 'Using warships to stop food and supplies from reaching an enemy country by sea.' },
    { term: 'Tank', def: 'An armored vehicle on tracks, invented in Britain to cross trenches and crush barbed wire. The name was a cover story: the first ones were shipped as "water tanks."' },
    { term: 'Doughboy', def: 'Nickname for an American soldier in this war.' },
    { term: 'Shell shock', def: 'The name given at the time to the mental injuries of soldiers who had been under bombardment.' },
    { term: 'Propaganda', def: 'Information, true or false, spread to win support for a cause. Every government in this war censored the news and shaped it.' },
    { term: 'Genocide', def: 'The deliberate destruction of a people. The word was invented in 1944 by a lawyer who had studied what happened to the Armenians.' },
    { term: 'Armistice', def: 'An agreement to stop fighting. The armistice of November 11, 1918, ended the fighting; the peace treaty was signed at Versailles in June 1919.' },
    { term: 'Fourteen Points', def: 'President Wilson\'s plan for a peace without revenge, including freedom of the seas, self-government for Europe\'s peoples, and a League of Nations.' }
  ];

  const ADVISORY = [
    'This atlas includes the Armenian Genocide. The entry describes mass killing and deportation in the words of the American ambassador who reported it. Preview it, and plan time to talk.',
    'The entries on the Second Battle of Ypres and Passchendaele describe men killed by poison gas and drowned in mud.',
    'The numbers in this war are hard to take in: about 9 million soldiers and several million civilians died. Casualty figures for single battles are estimates, and for the Eastern Front they are very rough.',
    'Most of the sources here were printed during the war or just after it. Newspaper reports passed through military censors, and generals\' memoirs were written to defend their decisions. The first-day report from the Somme is included partly to show how far the news could be from what happened.',
    'Writers of the time used words for the enemy, such as "Boche" and "Hun," that were meant as insults. One quotation leaves out a sergeant\'s swearing and says so.',
    'The period map shows the borders of 1914. Poland, Czechoslovakia, Yugoslavia, Finland, and the Baltic states did not yet exist, and Ireland was part of the United Kingdom.',
    'This atlas covers Europe and the nearest part of the Ottoman Empire. The war was also fought in Africa, the Middle East, and Asia, and soldiers and laborers from India, Africa, the Caribbean, China, and Indochina served on the Western Front.'
  ];

  const NOTES = {
    quotes: 'Every quotation in this atlas was copied directly from the linked printed text, so all of them are verified. Because the war ended more than a century ago, soldiers\' letters, diaries, and memoirs published through 1930 are in the public domain, and they are used here alongside official orders and reports. German and French texts appear in English translations made at the time.',
    numbers: 'Figures combine killed, wounded, captured, and missing unless an entry says otherwise. Armies counted differently, records were lost, and governments had reasons to shade the totals, so historians still disagree, sometimes by hundreds of thousands. Where a range is wide the note says so.',
    images: 'All are photographs or paintings made during the war or soon after and now in the public domain, most of them official photographs held by the Imperial War Museums, the U.S. National Archives, or the Library of Congress. Official photographers were kept away from the worst of the fighting, and many famous "battle" pictures were taken in training or behind the lines.'
  };

  Atlas.register({
    meta: {
      id: 'world-war-1',
      title: 'World War I',
      years: '1914–1918',
      range: { start: '1914-06-20', end: '1918-11-30' },
      bounds: [[35.5, -12.0], [59.6, 41.5]],
      sides: [
        { id: 'allied', name: 'Allied', color: '#2b5797' },
        { id: 'central', name: 'Central Powers', color: '#a32a2a' }
      ],
      theaters: ['Western Front', 'Eastern Front', 'Italian Front', 'Ottoman Front', 'At Sea'],
      intro: 'Army routes draw themselves as the armies advanced and retreated, and a marker appears for each battle as it begins.'
    },
    PORTRAITS, BATTLES, CAMPAIGNS, EVENTS, SOURCES, TOURS, VOCAB, ADVISORY, NOTES
  });
})();
