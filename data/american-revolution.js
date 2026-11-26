/* ------------------------------------------------------------------
   Campaign Atlas — data pack: The American Revolution, 1775–1781
   Quotations are from public-domain primary sources (letters, diaries,
   memoirs, official dispatches). Images are public-domain works hosted
   on Wikimedia Commons.
   A journal entry gains `verified: true` once its wording has been
   checked against the printed source.
   ------------------------------------------------------------------ */

(function () {
  const img = Atlas.img;

  const PORTRAITS = {
    washington: img('George Washington by Peale 1776.jpg', 'George Washington', 'Charles Willson Peale, 1776'),
    cornwallis: img('Lord Cornwallis.jpg', 'Charles, Earl Cornwallis', 'Public domain'),
    greene: img('Nathanael Greene by Charles Willson Peale.jpg', 'Nathanael Greene', 'Charles Willson Peale, 1783'),
    morgan: img('DanielMorgan.jpeg', 'Daniel Morgan', 'Charles Willson Peale, c. 1794'),
    abigail: img('Abigail Adams.jpg', 'Abigail Adams', 'Benjamin Blyth, c. 1766'),
    paine: img('Thomas Paine by Laurent Dabos.jpg', 'Thomas Paine', 'Laurent Dabos, c. 1791'),
    arnold: img('Benedict Arnold 1.jpg', 'Benedict Arnold', 'Public domain'),
    burgoyne: img('BurgoyneByReynolds.jpg', 'John Burgoyne', 'Sir Joshua Reynolds, c. 1766'),
    howe: img('William-howe-fifth-viscount.jpg', 'Sir William Howe', 'Mezzotint, 1777'),
    riedesel: img('Friederike von Riedesel.jpg', 'Baroness Frederika von Riedesel', 'Public domain'),
    lafayette: img('Marquis de Lafayette 2.jpg', 'The marquis de Lafayette', 'Public domain'),
    hamilton: img('Alexander Hamilton portrait by John Trumbull 1806.jpg', 'Alexander Hamilton', 'John Trumbull, 1806'),
    percy: img('Portrait of Hugh Percy, Second Duke of Northumberland by Gilbert Stuart, c. 1788.jpg', 'Hugh, Earl Percy', 'Gilbert Stuart, c. 1788'),
    clinton: img('Sir Henry Clinton.jpg', 'Sir Henry Clinton', 'Public domain'),
    jefferson: img('Thomas Jefferson by Rembrandt Peale, 1800.jpg', 'Thomas Jefferson', 'Rembrandt Peale, 1800'),
    moultrie: img('William Moultrie by Peale.jpg', 'William Moultrie', 'Charles Willson Peale'),
    stark: img('Portrait of General John Stark.jpg', 'John Stark', 'Public domain'),
    gage: img('Thomas Gage John Singleton Copley.jpeg', 'Thomas Gage', 'John Singleton Copley, c. 1768'),
    north: img('Nathaniel Dance Lord North cropped.jpg', 'Frederick, Lord North', 'Nathaniel Dance, c. 1773'),
    fox: img('Charles James Fox by Karl Anton Hickel.jpg', 'Charles James Fox', 'Karl Anton Hickel, 1794'),
    gates: img('HoratioGatesByStuart.jpeg', 'Horatio Gates', 'Gilbert Stuart, c. 1794')
  };

  const BATTLES = [
    {
      id: 'lexington-concord',
      name: 'Lexington and Concord',
      start: '1775-04-19', end: '1775-04-19',
      lat: 42.4495, lng: -71.2308,
      place: 'Lexington and Concord, Massachusetts',
      theater: 'New England',
      result: 'american',
      campaign: 'concord-march',
      commanders: { american: 'Capt. John Parker, Col. James Barrett, Brig. Gen. William Heath', british: 'Lt. Col. Francis Smith, Maj. John Pitcairn, Brig. Gen. Hugh, Earl Percy' },
      forces: { american: 'about 3,900 militia by day\'s end', british: 'about 1,500' },
      casualties: { american: 93, british: 273 },
      summary: 'Seven hundred British regulars marched out of Boston at night to seize militia arms stored at Concord. Riders, Paul Revere among them, spread the alarm ahead of them. At sunrise on Lexington Green the column met about seventy militiamen; someone fired, and eight Americans fell dead. At Concord\'s North Bridge the militia fired back and drove off a British detachment. The march back to Boston became a sixteen-mile gauntlet as thousands of militiamen fired from behind walls, trees, and houses.',
      significance: 'The first battles of the war. Within days, twenty thousand New England militiamen had the British army penned inside Boston.',
      images: [
        img('Plate I, The Battle of Lexington, Amos Doolittle engravings of the Battle of Lexington and Concord, December 1775, reprint by Charles E. Goodspeed, Boston, 1903 - Concord Museum - Concord, MA - DSC05585.JPG', 'The Battle of Lexington, April 19, 1775. Doolittle visited the sites and interviewed witnesses within weeks of the fighting.', 'Amos Doolittle, engraving, 1775 (1903 reprint). Concord Museum.'),
        img('Plate III, The Engagement at Concord, Amos Doolittle engravings of the Battle of Lexington and Concord, December 1775, reprint by Charles E. Goodspeed, Boston, 1903 - Concord Museum - Concord, MA - DSC05586.JPG', 'The engagement at the North Bridge in Concord.', 'Amos Doolittle, engraving, 1775 (1903 reprint). Concord Museum.')
      ],
      journal: [
        {
          quote: 'Stand your ground. Don\'t fire unless fired upon, but if they mean to have a war, let it begin here.',
          who: 'Capt. John Parker', role: 'Commander of the Lexington militia company', side: 'american',
          date: 'April 19, 1775', source: 'As recalled decades later by William Munroe, Parker\'s orderly sergeant; the words are carved on a stone on Lexington Green', verified: true, ref: 'https://archive.org/details/gri_33125010706766?q=%22fire%20unless%20fired%20upon%22', refTitle: 'Memories of seventeen hundred and seventy-five'
        },
        {
          quote: 'We were fired on from all sides, but mostly from the Rear, where People had hid themselves in houses till we had passed, and then fired; the Country was an amazing strong one, full of Hills, Woods, stone Walls, &c., which the Rebels did not fail to take advantage of.',
          who: 'Lt. John Barker', role: '4th (King\'s Own) Regiment of Foot', side: 'british',
          date: 'April 19, 1775', source: 'Diary, first published in The Atlantic Monthly (April 1877)', verified: true, ref: 'https://archive.org/details/sim_atlantic_1877-04_39_234?q=%22We%20were%20fired%20on%22', refTitle: 'The Atlantic Monthly, April 1877'
        },
        {
          quote: 'Whoever looks upon them as an irregular mob, will find himself much mistaken. They have men amongst them who know very well what they are about.',
          who: 'Brig. Gen. Hugh, Earl Percy', role: 'Commander of the British relief column', side: 'british',
          date: 'April 20, 1775', source: 'Letter to Gen. Edward Harvey', portrait: 'percy', verified: true, ref: 'https://archive.org/details/lettershughearl00boltgoog?q=%22Whoever%20looks%20upon%20them%22', refTitle: 'Letters of Hugh, Earl Percy, from Boston and New York, 1774–1776 (1902)'
        }
      ]
    },
    {
      id: 'fort-ticonderoga',
      name: 'Fort Ticonderoga',
      start: '1775-05-10', end: '1775-05-10',
      lat: 43.8415, lng: -73.3878,
      place: 'Ticonderoga, New York',
      theater: 'Northern',
      result: 'american',
      commanders: { american: 'Col. Ethan Allen, Col. Benedict Arnold', british: 'Capt. William Delaplace' },
      forces: { american: '83 Green Mountain Boys', british: '48 soldiers' },
      casualties: { american: 1, british: 48, note: 'No one was killed. One American was wounded, and the whole garrison was captured.' },
      summary: 'The old stone fort on Lake Champlain guarded the water route between Canada and the Hudson, and it held something the rebels around Boston had almost none of: heavy cannon. Ethan Allen\'s Green Mountain Boys rowed across the lake before dawn, rushed the gate past a single sentry, and took the sleeping garrison without a fight.',
      significance: 'The war\'s first American offensive. That winter Henry Knox hauled the fort\'s guns 300 miles to Boston, where they forced the British out.',
      images: [
        img('Fort Ticonderoga 1775.jpg', 'Ethan Allen demands the surrender of Fort Ticonderoga, May 10, 1775.', 'Engraving after Alonzo Chappel, 19th century.')
      ],
      journal: [
        {
          quote: 'He asked me by what authority I demanded it: I answered him, "In the name of the great Jehovah, and the Continental Congress."',
          who: 'Col. Ethan Allen', role: 'Commander of the Green Mountain Boys', side: 'american',
          date: 'May 10, 1775 (recalled)', source: 'A Narrative of Colonel Ethan Allen\'s Captivity (1779)', verified: true, ref: 'https://archive.org/details/cihm_42517?q=%22He%20asked%20me%20by%22', refTitle: 'A Narrative of the Captivity of Col. Ethan Allen (1814 edition)'
        }
      ]
    },
    {
      id: 'bunker-hill',
      name: 'Bunker Hill',
      start: '1775-06-17', end: '1775-06-17',
      lat: 42.3763, lng: -71.0608,
      place: 'Charlestown, Massachusetts',
      theater: 'New England',
      result: 'british',
      tactical: {
        base: "topo",
        bounds: [[42.3668, -71.078], [42.3872, -71.0475]],
        note: "This is a schematic. Charlestown was a narrow peninsula in 1775; most of the shore on today's map is land filled in later, so some troops appear to cross dry ground that was then open water. The redoubt is placed at the Bunker Hill Monument; other positions are approximate.",
        places: [
          { name: "Breed's Hill", ll: [42.3755, -71.0622] },
          { name: "Bunker Hill", ll: [42.3806, -71.066] },
          { name: "Charlestown", ll: [42.3722, -71.0628] },
          { name: "Moulton's Point", ll: [42.3768, -71.05] },
          { name: "Charlestown Neck", ll: [42.385, -71.0752] },
          { name: "Mystic River", ll: [42.3838, -71.057] },
          { name: "Boston (Copp's Hill)", ll: [42.3672, -71.056] }
        ],
        units: {
          pres: { side: "american", name: "Prescott's redoubt and breastwork", short: "Prescott" },
          rail: { side: "american", name: "Rail fence (Knowlton, Stark, Reed)", short: "Stark and Knowlton" },
          put: { side: "american", name: "Putnam and the reserves", short: "Putnam" },
          howe: { side: "british", name: "Howe's right wing: grenadiers and light infantry", short: "Howe" },
          pig: { side: "british", name: "Pigot's left wing", short: "Pigot" }
        },
        phases: [
          {
            time: "June 16 to 17, 1775, overnight",
            title: "A fort built in a night",
            text: "About a thousand New England militiamen march onto the Charlestown peninsula after dark. Their orders name Bunker Hill. Their officers choose the lower hill closer to Boston, Breed's Hill, and by dawn the men have dug an earth fort on top of it. A British warship in the harbor sees it at first light and opens fire.",
            units: { pres: [[42.3768, -71.0613], [42.376, -71.0603]], put: [[42.3808, -71.0662], [42.38, -71.065]] }
          },
          {
            time: "June 17, 1 to 3 p.m.",
            title: "The British land",
            text: "General Gage could cut the Americans off by landing behind them at the Neck. He lets General Howe attack from the front instead. Barges row some 2,200 soldiers across to Moulton's Point. While Howe waits for the last of them, the Americans see that their left is wide open and extend it: Connecticut and New Hampshire men line a rail fence stuffed with hay, all the way down to the beach on the Mystic River.",
            units: { howe: [[42.3776, -71.0524], [42.3758, -71.0522]], pig: [[42.3752, -71.0536], [42.374, -71.0546]], rail: [[42.3778, -71.0596], [42.3797, -71.0566]] },
            arrows: [
              { side: "british", pts: [[42.369, -71.052], [42.3752, -71.0508]] }
            ]
          },
          {
            time: "About 3:30 p.m.",
            title: "The first assault",
            text: "Howe sends his fastest troops along the beach to get around the fence. Stark's New Hampshire men, behind a wall of stones they have just piled up, wait until the column is fifty yards away and then fire. The front ranks go down in heaps. The lines advancing on the fence and the fort are shot apart the same way.",
            units: { howe: [[42.3795, -71.0557], [42.3775, -71.0587]], pig: [[42.3759, -71.059], [42.3749, -71.06]] }
          },
          {
            time: "About 4 p.m.",
            title: "Thrown back a second time",
            text: "The British re-form at the bottom of the hill and come on again, stepping over their own dead. Again the Americans hold their fire until the last moment, and again the line breaks and falls back. Behind the British, Charlestown is burning, set alight by cannon fire from the ships. Inside the fort, the powder is almost gone.",
            units: { howe: [[42.3786, -71.0538], [42.3768, -71.0562]], pig: [[42.3755, -71.0568], [42.3743, -71.058]] }
          },
          {
            time: "About 4:30 p.m.",
            title: "The third assault",
            text: "Howe gets 400 fresh men, tells his soldiers to drop their packs, and aims everything at the fort. The defenders fire their last rounds. The British come over the wall with bayonets, and the Americans, who have almost none, fight with musket butts and stones. Dr. Joseph Warren is killed as the fort empties.",
            units: { howe: [[42.3776, -71.0603], [42.3769, -71.0597]], pig: [[42.3765, -71.0608], [42.3758, -71.0599]], pres: [[42.3797, -71.0652], [42.379, -71.0642]] },
            arrows: [
              { side: "british", pts: [[42.3752, -71.0575], [42.3762, -71.0603]] }
            ]
          },
          {
            time: "About 5 p.m.",
            title: "Retreat over the Neck",
            text: "The men at the rail fence hold long enough for the others to get away, then pull back in good order. The British take the peninsula, but it has cost them 1,054 men, more than four in ten of those who fought, and a large share of their officers. They will not try another attack like it.",
            units: {
              pres: [[42.3856, -71.076], [42.3848, -71.0748]],
              rail: [[42.3838, -71.0728], [42.383, -71.0712]],
              put: [[42.3862, -71.0772], [42.3856, -71.0764]],
              howe: [[42.3806, -71.0662], [42.3796, -71.0648]],
              pig: [[42.3768, -71.0613], [42.376, -71.0603]]
            }
          }
        ],
        ask: [
          "Find the Neck. What might have happened if the British had landed there instead of attacking from the front?",
          "The British won the hill. Why did both sides come to see the battle as an American success?",
          "Why did the American officers order their men to hold their fire until the British were very close?"
        ]
      },
      commanders: { american: 'Col. William Prescott, Brig. Gen. Israel Putnam, Dr. Joseph Warren (killed)', british: 'Maj. Gen. William Howe, Lt. Gen. Thomas Gage' },
      forces: { american: 'about 2,400', british: 'about 2,400' },
      casualties: { american: 450, british: 1054, note: 'The British lost more than 40 percent of the men engaged, including 92 officers. It was their costliest battle of the war.' },
      summary: 'Overnight, New England militia dug a fort on Breed\'s Hill overlooking Boston Harbor. Howe chose to attack it head-on. Twice the red lines climbed the slope and twice they were shot down at close range. On the third assault the defenders ran out of powder, and the British took the hill with the bayonet. Dr. Joseph Warren, a leader of the Massachusetts resistance, was killed in the retreat.',
      significance: 'A British victory that proved untrained militia could stand against regulars. It ended any hope that the rebellion could be put down cheaply.',
      images: [
        img('The Death of General Warren at the Battle of Bunker\'s Hill.jpg', 'The Death of General Warren at the Battle of Bunker\'s Hill. Trumbull watched the battle from across the harbor and painted it eleven years later.', 'John Trumbull, oil painting, 1786.'),
        img('Bunker Hill by Pyle.jpg', 'The British advance up Breed\'s Hill.', 'Howard Pyle, 1897.')
      ],
      journal: [
        {
          quote: 'The day—perhaps the decisive day—is come, on which the fate of America depends. My bursting heart must find vent at my pen. I have just heard that our dear friend, Dr. Warren, is no more, but fell gloriously fighting for his country.',
          who: 'Abigail Adams', role: 'Writing from Braintree, where she and her son John Quincy watched the smoke from a hilltop', side: 'civilian',
          date: 'June 18, 1775', source: 'Letter to John Adams, Adams Family Papers', portrait: 'abigail', verified: true, ref: 'https://www.masshist.org/digitaladams/archive/doc?id=L17750618aa', refTitle: 'Adams Family Papers, Massachusetts Historical Society'
        },
        {
          quote: 'Don\'t fire until you see the whites of their eyes!',
          who: 'Attributed to Col. William Prescott or Gen. Israel Putnam', role: 'American officers at the redoubt', side: 'american',
          date: 'June 17, 1775', source: 'Tradition. No account written at the time records these words, and historians are not sure who said them, or whether anyone did'
        },
        {
          quote: 'These People Shew a Spirit and Conduct against us they never shewed against the French … The loss we have Sustained is greater than we can bear.',
          who: 'Lt. Gen. Thomas Gage', role: 'British commander in chief in North America', side: 'british',
          date: 'June 26, 1775', source: 'Letter to Lord Barrington, Secretary at War', portrait: 'gage', verified: true, ref: 'https://archive.org/details/warforindependen012513mbp?q=%22Spirit%20and%20Conduct%20against%22', refTitle: 'Howard H. Peckham, The War for Independence (1958), quoting the letter'
        },
        {
          quote: 'I wish we could sell them another hill at the same price.',
          who: 'Brig. Gen. Nathanael Greene', role: 'Commander of the Rhode Island troops outside Boston', side: 'american',
          date: 'June 1775', source: 'Letter to his brother', portrait: 'greene', verified: true, ref: 'https://archive.org/details/commandinbattleo00frot?q=%22wish%20we%20could%20sell%22', refTitle: 'Richard Frothingham, The Command in the Battle of Bunker Hill (1850)'
        }
      ]
    },
    {
      id: 'quebec',
      name: 'Quebec',
      start: '1775-12-31', end: '1775-12-31',
      lat: 46.8139, lng: -71.2080,
      place: 'Quebec City, Canada',
      theater: 'Northern',
      result: 'british',
      campaign: 'arnold-quebec',
      commanders: { american: 'Brig. Gen. Richard Montgomery (killed), Col. Benedict Arnold (wounded)', british: 'Gov. Guy Carleton' },
      forces: { american: 'about 1,200', british: 'about 1,800 regulars, militia, and sailors' },
      casualties: { american: 515, british: 19, note: 'More than 400 Americans were captured, including Daniel Morgan.' },
      summary: 'Congress hoped Canada would join the rebellion as a fourteenth colony. Montgomery came up Lake Champlain and took Montreal; Arnold led 1,100 men through the Maine wilderness, losing nearly half to hunger and desertion. With enlistments expiring at midnight, they attacked Quebec in a blizzard on the last night of the year. Montgomery was killed by the first cannon blast, Arnold was shot in the leg, and the attack collapsed in the city\'s narrow streets.',
      significance: 'The first major American defeat. Canada stayed British, and the invasion route down Lake Champlain stayed open for Burgoyne in 1777.',
      images: [
        img('The Death of General Montgomery in the Attack on Quebec December 31 1775.jpeg', 'The Death of General Montgomery in the Attack on Quebec, December 31, 1775.', 'John Trumbull, oil painting, 1786.')
      ],
      journal: [
        {
          quote: 'A poor dog, hitherto lived through all the tribulations, became a prey for the sustenance of the assassinators. This poor animal was instantly devoured, without leaving any vestige of the sacrifice.',
          who: 'Dr. Isaac Senter', role: 'Surgeon on Arnold\'s march through Maine', side: 'american',
          date: 'November 1, 1775', source: 'Journal of Isaac Senter (published 1846)', verified: true, ref: 'https://archive.org/details/journalofisaacse00sentuoft?q=%22poor%20dog%20hitherto%20lived%22', refTitle: 'The Journal of Isaac Senter (1846)'
        },
        {
          quote: 'I have no thoughts of leaving this proud town, until I first enter it in triumph … I am in the way of my duty, and know no fear.',
          who: 'Col. Benedict Arnold', role: 'Wounded, and continuing the siege from a hospital bed', side: 'american',
          date: 'January 6, 1776', source: 'Letter to his sister Hannah Arnold; an extract was printed in the Maryland Gazette, February 1, 1776', portrait: 'arnold', verified: true, ref: 'https://archive.org/details/mg02011766?q=%22proud+town%22', refTitle: 'Maryland Gazette, February 1, 1776'
        }
      ]
    },
    {
      id: 'dorchester-heights',
      name: 'Dorchester Heights and the Evacuation of Boston',
      start: '1776-03-04', end: '1776-03-17',
      lat: 42.3329, lng: -71.0453,
      place: 'Boston, Massachusetts',
      theater: 'New England',
      result: 'american',
      campaign: 'knox',
      commanders: { american: 'Gen. George Washington, Brig. Gen. John Thomas, Col. Henry Knox', british: 'Gen. William Howe' },
      forces: { american: 'about 16,000 around Boston', british: 'about 9,000 troops and the fleet' },
      casualties: { american: 0, british: 0, note: 'The heights were taken without a battle. A storm wrecked the British counterattack before it began.' },
      summary: 'For eleven months Washington\'s army had surrounded Boston without the guns to force the British out. When Knox arrived with the cannon from Ticonderoga, Washington moved in a single night: on March 4 two thousand men hauled the guns and ready-made fortifications up Dorchester Heights, covered by a noisy bombardment from the other side of town. At dawn the British found cannon looking down on their fleet. Howe sailed for Halifax on March 17 with his army and a thousand Loyalists.',
      significance: 'Washington\'s first victory. Boston was never again occupied, and March 17 is still celebrated there as Evacuation Day.',
      images: [
        img('WashingtonAtDorchesterHeightsByStuart.jpeg', 'Washington at Dorchester Heights.', 'Gilbert Stuart, oil painting, 1806.')
      ],
      journal: [
        {
          quote: 'I went to bed about 12 and rose again a little after one. I could no more sleep than if I had been in the ingagement. The ratling of the windows, the jar of the house and the continual roar of 24 pounders, the Bursting of shells give us such Ideas, and realize a scene to us of which we could scarcly form any conception.',
          who: 'Abigail Adams', role: 'Listening to the cannonade from Braintree, ten miles away', side: 'civilian',
          date: 'March 5, 1776', source: 'Letter to John Adams, Adams Family Papers', portrait: 'abigail', verified: true, ref: 'https://www.masshist.org/digitaladams/archive/doc?id=L17760302aa', refTitle: 'Adams Family Papers, Massachusetts Historical Society'
        },
        {
          quote: 'The rebels have done more in one night, than my whole army would have done in months.',
          who: 'Gen. William Howe', role: 'British commander in Boston, on seeing the fortified heights at dawn', side: 'british',
          date: 'March 5, 1776', source: 'As reported in William Gordon\'s history of the war (1788), the earliest printed version; later books changed "months" to "a month"', portrait: 'howe', verified: true, ref: 'https://archive.org/details/historyofrisepro02gord_0?q=%22The%20rebels%20have%20done%22', refTitle: 'William Gordon, The History of the Rise, Progress, and Establishment of the Independence of the United States (1788)'
        }
      ]
    },
    {
      id: 'long-island',
      name: 'Long Island (Brooklyn)',
      start: '1776-08-27', end: '1776-08-29',
      lat: 40.6655, lng: -73.9700,
      place: 'Brooklyn, New York',
      theater: 'Middle States',
      result: 'british',
      campaign: 'howe-new-york',
      commanders: { american: 'Gen. George Washington, Maj. Gen. Israel Putnam', british: 'Gen. William Howe, Lt. Gen. Henry Clinton, Lt. Gen. Charles Cornwallis' },
      forces: { american: 'about 10,000', british: 'about 20,000 British and Hessian troops' },
      casualties: { american: 2000, british: 388, note: 'About 300 Americans were killed and more than 1,000 captured.' },
      summary: 'Seven weeks after the Declaration of Independence, the largest fleet Britain had ever sent overseas landed an army on Long Island. Howe sent half of it on a night march through an unguarded pass and struck the American line from behind. A Maryland regiment charged six times to hold the British back while the rest escaped to the Brooklyn forts. Two nights later, under cover of darkness and a morning fog, Massachusetts fishermen rowed Washington\'s whole army across the East River to Manhattan.',
      significance: 'The largest battle of the war and a crushing defeat, but the night escape saved the army, and with it the Revolution.',
      images: [
        img('Battle of Long Island, 1858.jpg', 'The Battle of Long Island: the Maryland and Delaware troops cover the retreat.', 'Alonzo Chappel, oil painting, 1858.')
      ],
      journal: [
        {
          quote: 'We now began to meet the wounded men, another sight I was unacquainted with, some with broken arms, some with broken legs, and some with broken heads. The sight of these a little daunted me, and made me think of home.',
          who: 'Pvt. Joseph Plumb Martin', role: 'Connecticut state troops; he was fifteen years old', side: 'american',
          date: 'August 27, 1776 (recalled)', source: 'A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (1830)', verified: true, ref: 'https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_II.', refTitle: 'Joseph Plumb Martin, A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (Wikisource transcription)'
        },
        {
          quote: 'Good God! What brave fellows I must this day lose!',
          who: 'Gen. George Washington', role: 'Watching the Maryland regiment charge', side: 'american',
          date: 'August 27, 1776', source: 'As reported by an officer who stood near him', portrait: 'washington', verified: true, ref: 'https://archive.org/details/lifeofgeneralwas00nort?q=%22Good%20God%20What%20brave%22', refTitle: 'Life of General Washington'
        },
        {
          quote: 'A very dense fog began to rise, and it seemed to settle in a peculiar manner over both encampments. I recollect this peculiar providential occurrence perfectly well; and so very dense was the atmosphere that I could scarcely discern a man at six yards\' distance.',
          who: 'Maj. Benjamin Tallmadge', role: 'Among the last troops to leave the Brooklyn lines', side: 'american',
          date: 'August 30, 1776 (recalled)', source: 'Memoir of Col. Benjamin Tallmadge (1858)', verified: true, ref: 'https://archive.org/details/memoirofcolonelb027409mbp?q=%22very%20dense%20fog%20began%22', refTitle: 'Memoir of Colonel Benjamin Tallmadge'
        }
      ]
    },
    {
      id: 'trenton',
      name: 'Trenton',
      start: '1776-12-26', end: '1776-12-26',
      lat: 40.2204, lng: -74.7654,
      place: 'Trenton, New Jersey',
      theater: 'Middle States',
      result: 'american',
      campaign: 'washington-1776',
      commanders: { american: 'Gen. George Washington', british: 'Col. Johann Rall (mortally wounded), commanding Hessian troops' },
      forces: { american: 'about 2,400', british: 'about 1,500 Hessians' },
      casualties: { american: 7, british: 1000, note: 'Twenty-two Hessians were killed, 83 wounded, and nearly 900 captured. Two Americans froze to death on the march.' },
      summary: 'By December the army that had fled New York was down to a few thousand ragged men, and most enlistments would end with the year. On Christmas night Washington crossed the ice-choked Delaware in a storm of sleet and marched nine miles to Trenton. His columns struck the Hessian garrison from two directions at eight in the morning. The fight lasted less than an hour.',
      significance: 'A small battle that saved the Revolution. It persuaded soldiers to re-enlist and Americans to believe the war could be won.',
      images: [
        img('Washington Crossing the Delaware by Emanuel Leutze, MMA-NYC, 1851.jpg', 'Washington Crossing the Delaware. Painted in Germany 75 years later, it gets many details wrong: the flag had not yet been adopted, the boats were different, and the crossing was at night.', 'Emanuel Leutze, oil painting, 1851. Metropolitan Museum of Art.'),
        img('The Capture of the Hessians at Trenton December 26 1776.jpeg', 'The Capture of the Hessians at Trenton, December 26, 1776.', 'John Trumbull, oil painting, 1786–1828.')
      ],
      journal: [
        {
          quote: 'These are the times that try men\'s souls. The summer soldier and the sunshine patriot will, in this crisis, shrink from the service of their country; but he that stands it now, deserves the love and thanks of man and woman.',
          who: 'Thomas Paine', role: 'Writer, then serving with the retreating army; Washington had this read aloud to the troops', side: 'american',
          date: 'December 19, 1776', source: 'The American Crisis, No. 1', portrait: 'paine', verified: true, ref: 'https://en.wikisource.org/wiki/The_American_Crisis/The_Crisis_No._I', refTitle: 'Thomas Paine, The American Crisis, No. 1 (Wikisource transcription)'
        },
        {
          quote: 'If every nerve is not strained to recruit the New Army with all possible expedition, I think the game is pretty near up.',
          who: 'Gen. George Washington', role: 'Commander in chief, eight days before the attack', side: 'american',
          date: 'December 18, 1776', source: 'Letter to his brother', portrait: 'washington', verified: true, ref: 'https://archive.org/details/writingsgeorgew44washgoog?q=%22If%20every%20nerve%20is%22', refTitle: 'The Writings of George Washington (19th-century edition)'
        },
        {
          quote: 'The difficulty of passing the river in a very severe night, and their march through a violent storm of snow and hail, did not in the least abate their ardor; but, when they came to the charge, each seemed to vie with the other in pressing forward.',
          who: 'Gen. George Washington', role: 'Commander in chief', side: 'american',
          date: 'December 27, 1776', source: 'Report to John Hancock, President of Congress', portrait: 'washington', verified: true, ref: 'https://archive.org/details/writingsgeorgew44washgoog?q=%22The%20difficulty%20of%20passing%22', refTitle: 'The Writings of George Washington, ed. Worthington C. Ford (1889)'
        }
      ]
    },
    {
      id: 'princeton',
      name: 'Princeton',
      start: '1777-01-03', end: '1777-01-03',
      lat: 40.3300, lng: -74.6760,
      place: 'Princeton, New Jersey',
      theater: 'Middle States',
      result: 'american',
      campaign: 'washington-1776',
      commanders: { american: 'Gen. George Washington, Brig. Gen. Hugh Mercer (mortally wounded)', british: 'Lt. Col. Charles Mawhood' },
      forces: { american: 'about 4,500', british: 'about 1,200' },
      casualties: { american: 65, british: 276 },
      summary: 'Cornwallis marched to Trenton to trap Washington against the Delaware. Washington left his campfires burning, slipped around the British army on a frozen back road at night, and struck its rear guard at Princeton at sunrise. When the first American brigade broke and General Mercer was bayoneted, Washington rode between the lines to rally his men, and the British regiments gave way.',
      significance: 'With Trenton, it cleared most of New Jersey in ten days and carried the army safely into winter quarters at Morristown.',
      images: [
        img('The Death of General Mercer at the Battle of Princeton January 3 1777.jpeg', 'The Death of General Mercer at the Battle of Princeton, January 3, 1777.', 'John Trumbull, oil painting, c. 1789–1831.')
      ],
      journal: [
        {
          quote: 'My brave fellows, you have done all I asked you to do, and more than could be reasonably expected; but your country is at stake, your wives, your houses, and all that you hold dear … If you will consent to stay only one month longer, you will render that service to the cause of liberty, and to your country, which you probably never can do under any other circumstances.',
          who: 'Gen. George Washington', role: 'Appealing to soldiers whose enlistments ended the next day', side: 'american',
          date: 'December 30, 1776', source: 'As recorded by a sergeant who was present; published 1832 and reprinted in the Pennsylvania Magazine of History and Biography (1896)', portrait: 'washington', verified: true, ref: 'https://archive.org/details/sim_pennsylvania-magazine-of-history-and-biography_1896_20_4?q=%22My%20brave%20fellows%20you%22', refTitle: 'The Pennsylvania Magazine of History and Biography, vol. 20 (1896)'
        },
        {
          quote: 'Parade with us, my brave fellows! There is but a handful of the enemy, and we will have them directly.',
          who: 'Gen. George Washington', role: 'Rallying Mercer\'s broken brigade under fire', side: 'american',
          date: 'January 3, 1777', source: 'As reported by soldiers present', portrait: 'washington', verified: true, ref: 'https://archive.org/details/princetonbattl00prin?q=%22Parade%20with%20us%20my%22', refTitle: 'The Princeton Battle Monument (1922)'
        }
      ]
    },
    {
      id: 'bennington',
      name: 'Bennington',
      start: '1777-08-16', end: '1777-08-16',
      lat: 42.9320, lng: -73.3040,
      place: 'Walloomsac, New York, near Bennington, Vermont',
      theater: 'Northern',
      result: 'american',
      campaign: 'burgoyne',
      commanders: { american: 'Brig. Gen. John Stark, Col. Seth Warner', british: 'Lt. Col. Friedrich Baum (killed), Lt. Col. Heinrich von Breymann' },
      forces: { american: 'about 2,000 militia', british: 'about 1,400 German, Loyalist, and Native troops' },
      casualties: { american: 70, british: 907, note: 'About 200 of Burgoyne\'s men were killed and 700 captured.' },
      summary: 'Short of horses, wagons, and food, Burgoyne sent a column of German troops toward the American supply depot at Bennington. New Hampshire and Vermont militia under John Stark surrounded it on a hilltop and overran it, then beat a second column sent to its rescue.',
      significance: 'Cost Burgoyne nearly a seventh of his army and the supplies he needed, two months before Saratoga.',
      images: [
        img('Battle of Bennington 1777.jpeg', 'The Battle of Bennington, August 16, 1777.', 'Engraving after Alonzo Chappel, 19th century.')
      ],
      journal: [
        {
          quote: 'There are the redcoats, and they are ours, or this night Molly Stark sleeps a widow!',
          who: 'Brig. Gen. John Stark', role: 'Commander of the New Hampshire militia, before the attack', side: 'american',
          date: 'August 16, 1777', source: 'As reported by his soldiers; versions differ in wording', portrait: 'stark', verified: true, ref: 'https://archive.org/details/battleofbenningt00brit?q=%22There%20are%20the%20redcoats%22', refTitle: 'The Battle of Bennington (1908)'
        },
        {
          quote: 'The Hampshire Grants, in particular, a country unpeopled, and almost unknown the last war, now abounds in the most active and most rebellious race of the continent, and hangs like a gathering storm upon my left.',
          who: 'Lt. Gen. John Burgoyne', role: 'Commander of the British army from Canada', side: 'british',
          date: 'August 20, 1777', source: 'Letter to Lord George Germain, printed in Burgoyne\'s A State of the Expedition from Canada (1780)', portrait: 'burgoyne', verified: true, ref: 'https://archive.org/details/bim_eighteenth-century_a-state-of-the-expeditio_burgoyne-john_1780?q=%22The%20Hampshire%20Grants%20in%22', refTitle: 'John Burgoyne, A State of the Expedition from Canada (1780)'
        }
      ]
    },
    {
      id: 'brandywine',
      name: 'Brandywine',
      start: '1777-09-11', end: '1777-09-11',
      lat: 39.8750, lng: -75.5750,
      place: 'Chadds Ford, Pennsylvania',
      theater: 'Middle States',
      result: 'british',
      campaign: 'philadelphia',
      commanders: { american: 'Gen. George Washington', british: 'Gen. Sir William Howe, Lt. Gen. Charles Cornwallis' },
      forces: { american: 'about 14,600', british: 'about 15,500' },
      casualties: { american: 1300, british: 587 },
      summary: 'Howe sailed from New York, landed at the head of Chesapeake Bay, and marched on Philadelphia, the American capital. Washington blocked the road at Brandywine Creek. As on Long Island, Howe pinned the American front with one column and sent the other on a long march around the flank. The American right collapsed late in the day, and only a stubborn rear guard under Nathanael Greene let the army get away. Two weeks later the British marched into Philadelphia.',
      significance: 'The capital fell, but the army survived, and Howe\'s campaign left Burgoyne without help in the north.',
      images: [
        img('PyleNationmakersPre1911.jpg', 'The Nation Makers: Continental soldiers advancing at Brandywine.', 'Howard Pyle, oil painting, 1903.')
      ],
      journal: [
        {
          quote: 'Sir: I am sorry to inform you that in this day\'s engagement we have been obliged to leave the enemy masters of the field.',
          who: 'Gen. George Washington', role: 'Commander in chief, writing at midnight', side: 'american',
          date: 'September 11, 1777', source: 'Report to John Hancock, President of Congress', portrait: 'washington', verified: true, ref: 'https://archive.org/details/writingsgeorgew00spargoog?q=%22am%20sorry%20to%20inform%22', refTitle: 'The Writings of George Washington, ed. Jared Sparks (1834)'
        },
        {
          quote: 'Oh, Heaven! grant us one great soul! One leading mind would extricate the best cause from that ruin which seems to await it.',
          who: 'John Adams', role: 'Delegate to Congress, which had just fled Philadelphia', side: 'american',
          date: 'September 21, 1777', source: 'Diary of John Adams', verified: true, ref: 'https://www.masshist.org/digitaladams/archive/doc?id=D28', refTitle: 'Diary of John Adams, Massachusetts Historical Society'
        }
      ]
    },
    {
      id: 'saratoga',
      name: 'Saratoga',
      start: '1777-09-19', end: '1777-10-17',
      lat: 43.0050, lng: -73.6400,
      place: 'Stillwater and Saratoga, New York',
      theater: 'Northern',
      result: 'american',
      campaign: 'burgoyne',
      tactical: {
        base: "contour",
        bounds: [[42.975, -73.672], [43.022, -73.585]],
        note: "Positions are simplified from standard maps of the two battles and tied to the monuments on the field at Freeman's Farm, the Breymann Redoubt, and Bemis Heights. Line lengths are approximate.",
        lines: [
          {
            kind: "stream",
            name: "Hudson River",
            pts: [[43.01063, -73.59552], [43.00858, -73.5966], [43.00709, -73.59793], [43.00351, -73.60328], [43.00167, -73.60517], [43.00022, -73.60618], [42.99429, -73.60771], [42.98351, -73.60844], [42.98242, -73.60891], [42.98134, -73.61008], [42.97564, -73.62187]]
          },
          {
            kind: "stream",
            name: "Kroma Kill",
            pts: [[43.01556, -73.62375], [43.01545, -73.62395], [43.01485, -73.6233], [43.01445, -73.62374], [43.01428, -73.62324], [43.01388, -73.62306], [43.01376, -73.62325], [43.01358, -73.62303], [43.01328, -73.62336], [43.01307, -73.62253], [43.0125, -73.62313], [43.01215, -73.62233], [43.01137, -73.62142], [43.00939, -73.622], [43.00931, -73.62092], [43.0082, -73.62073], [43.00782, -73.62034], [43.00754, -73.61952], [43.00665, -73.61941], [43.00655, -73.61851], [43.00593, -73.61767], [43.00521, -73.61561], [43.00488, -73.61535], [43.004, -73.61551], [43.00347, -73.61412], [43.00271, -73.61295], [43.00224, -73.61291], [43.00139, -73.61224], [43.00147, -73.61173], [43.00119, -73.6116], [43.00035, -73.6102], [42.99969, -73.60991], [42.99896, -73.6103], [42.99858, -73.61009], [42.99773, -73.60694]]
          },
          {
            kind: "stream",
            name: "Mill Creek",
            pts: [[42.99651, -73.64966], [42.99789, -73.64749], [42.99772, -73.64555], [42.99738, -73.64483], [42.99768, -73.64346], [42.99766, -73.64258], [42.99801, -73.64142], [42.99848, -73.64097], [42.9987, -73.63987], [42.99781, -73.63931], [42.99748, -73.6388], [42.99725, -73.63678], [42.99747, -73.63585], [42.99748, -73.63426], [42.999, -73.63321], [42.99943, -73.63272], [42.99968, -73.63176], [42.99968, -73.63127], [42.99896, -73.63006], [42.99873, -73.62913], [42.99876, -73.62784], [42.99849, -73.62766], [42.99794, -73.62781], [42.99664, -73.62701], [42.9965, -73.62601], [42.99619, -73.62546], [42.9948, -73.62606], [42.99427, -73.62548], [42.99337, -73.62518], [42.99331, -73.62461], [42.99291, -73.6246], [42.99196, -73.62323], [42.99097, -73.62278], [42.99075, -73.62355], [42.99034, -73.62396], [42.99036, -73.62481], [42.98999, -73.62564], [42.98968, -73.62583], [42.98887, -73.62541], [42.98788, -73.62615], [42.98727, -73.62353], [42.98684, -73.62352], [42.98663, -73.62402], [42.98515, -73.62426], [42.98428, -73.6235], [42.98393, -73.62172]]
          },
          {
            kind: "stream",
            name: "Mill Creek",
            pts: [[42.97931, -73.62217], [42.97864, -73.62259], [42.97846, -73.62223], [42.97875, -73.62185], [42.97869, -73.62165], [42.97835, -73.6216], [42.97782, -73.62217], [42.97737, -73.62177], [42.97714, -73.62267], [42.97644, -73.62335], [42.97564, -73.62187]]
          }
        ],
        places: [
          { name: "Bemis Heights", ll: [42.9848, -73.64] },
          { name: "Freeman's Farm", ll: [43.0051, -73.6369] },
          { name: "Breymann Redoubt", ll: [43.0096, -73.6394] },
          { name: "Barber's wheatfield", ll: [43.0006, -73.6469] },
          { name: "Great Redoubt", ll: [43.0058, -73.611] },
          { name: "Hudson River", ll: [42.996, -73.602] }
        ],
        units: {
          gates: { side: "american", name: "American fortified camp (Gates)", short: "Gates" },
          mo: { side: "american", name: "Morgan's riflemen and Dearborn's light infantry", short: "Morgan" },
          ar: { side: "american", name: "Arnold's wing (Poor, Learned)", short: "Arnold" },
          bc: { side: "british", name: "British center (Burgoyne, Hamilton)", short: "Burgoyne" },
          bf: { side: "british", name: "British right (Fraser, Breymann)", short: "Fraser" },
          gr: { side: "british", name: "German troops (Riedesel)", short: "Riedesel" },
          probe: { side: "british", name: "British probe of October 7", short: "Probe" }
        },
        phases: [
          {
            time: "September 12 to 18, 1777",
            title: "The road south is blocked",
            text: "Burgoyne must get down the Hudson to Albany before winter. At Bemis Heights the bluffs crowd the only road against the river, and there the American army digs in, on ground chosen by a Polish engineer, Thaddeus Kosciuszko. Cannon cover the river road. To get past, Burgoyne will have to go through the woods and ravines on the high ground to the west.",
            units: { gates: [[42.9895, -73.6135], [42.988, -73.625], [42.986, -73.6415], [42.99, -73.644]], bc: [[43.0195, -73.63], [43.0195, -73.62]], bf: [[43.02, -73.648], [43.0195, -73.64]], gr: [[43.019, -73.602], [43.015, -73.599]] }
          },
          {
            time: "September 19, about 1 p.m.",
            title: "Freeman's Farm",
            text: "Burgoyne advances in three columns. Benedict Arnold persuades Gates to meet them in the woods rather than wait behind the walls. Morgan's riflemen run into the British center in a clearing called Freeman's Farm. Hidden among the trees, they pick off officers and the men serving the cannon.",
            units: {
              bc: [[43.0066, -73.64], [43.0062, -73.6345]],
              bf: [[43.0085, -73.65], [43.0055, -73.6482]],
              gr: [[43.005, -73.609], [43.001, -73.61]],
              mo: [[43.0036, -73.6405], [43.0036, -73.635]],
              ar: [[42.999, -73.644], [42.9985, -73.638]]
            },
            arrows: [
              { side: "british", pts: [[43.0185, -73.63], [43.0075, -73.6375]] },
              { side: "american", pts: [[42.9915, -73.644], [43.0025, -73.6385]] }
            ]
          },
          {
            time: "September 19, late afternoon",
            title: "The Germans save the center",
            text: "For three hours the clearing changes hands again and again. Arnold feeds in fresh regiments and the British center is close to breaking. Then Riedesel marches his Germans up from the river road and hits the American right. At dusk the Americans go back to their camp. Burgoyne holds the field, but he has lost about 600 men, twice the American loss, and he cannot replace them.",
            units: { ar: [[43.003, -73.644], [43.0028, -73.636]], gr: [[43.0045, -73.6312], [43.0022, -73.6304]] },
            arrows: [
              { side: "british", pts: [[43.003, -73.611], [43.0034, -73.6295]] }
            ]
          },
          {
            time: "September 20 to October 6",
            title: "Burgoyne digs in and waits",
            text: "Burgoyne fortifies where he stands and waits for a British army to come up the river from New York. It never comes. His men go on half rations while militia pour into the American camp from all over New England and New York, until Gates has more than twice Burgoyne's numbers.",
            units: { bf: [[43.0092, -73.6398], [43.0076, -73.639]], bc: [[43.0062, -73.6372], [43.004, -73.6366]], gr: [[43.005, -73.6125], [43.0022, -73.6105]], mo: null, ar: null }
          },
          {
            time: "October 7, mid-afternoon",
            title: "Barber's wheatfield",
            text: "Burgoyne sends about 1,500 men and ten cannon forward to test the American left. They halt in a wheatfield. The Americans strike both ends of the line at once, Poor on one side and Morgan through the woods on the other. General Simon Fraser, rallying his men, is shot by one of Morgan's riflemen, and within an hour the British are running for their forts.",
            units: { probe: [[43.0018, -73.65], [43.0012, -73.644]], mo: [[43.0034, -73.6545], [43.0002, -73.6535]], ar: [[42.9992, -73.649], [42.9988, -73.6425]] },
            arrows: [
              { side: "american", pts: [[42.9925, -73.645], [42.9982, -73.6458]] }
            ]
          },
          {
            time: "October 7, dusk",
            title: "The redoubts",
            text: "Arnold, who has quarreled with Gates and has no command, gallops onto the field anyway. He leads a charge on the fort at Freeman's Farm, which fails, then rides through the fire of both armies and storms the Breymann Redoubt through its open rear. He is shot in the leg as it falls. With that fort gone, the whole British camp lies open.",
            units: { probe: null, mo: [[43.0092, -73.6426], [43.0076, -73.642]], ar: [[43.0046, -73.6396], [43.003, -73.6388]], bf: null },
            arrows: [
              { side: "american", pts: [[43.004, -73.644], [43.0082, -73.6412]] }
            ]
          },
          {
            time: "October 8 to 17",
            title: "Retreat and surrender",
            text: "Burgoyne retreats north in the rain to the village of Saratoga, eight miles upriver. The Americans, now some 17,000 strong, close in on every side. On October 17 he surrenders his whole army, about 5,900 men. When the news reaches Paris, France agrees to join the war as America's ally.",
            units: { bc: [[43.02, -73.604], [43.018, -73.602]], gr: null, mo: [[43.015, -73.612], [43.013, -73.61]], ar: null, gates: [[43.01, -73.608], [43.006, -73.609], [43.002, -73.611]] },
            arrows: [
              { side: "british", pts: [[43.005, -73.611], [43.0195, -73.603]] }
            ]
          }
        ],
        ask: [
          "Find the river road and the American camp. Why could Burgoyne not simply march down the road to Albany?",
          "Burgoyne \"won\" the first battle because he held the field. Why did it leave him worse off than before?",
          "Riflemen at Saratoga aimed at officers and gun crews. How might that change a battle in thick woods?"
        ]
      },
      commanders: { american: 'Maj. Gen. Horatio Gates, Maj. Gen. Benedict Arnold, Col. Daniel Morgan', british: 'Lt. Gen. John Burgoyne, Maj. Gen. Friedrich von Riedesel' },
      forces: { american: 'about 9,000, growing to 17,000', british: 'about 7,200 British and German troops' },
      casualties: { american: 330, british: 7000, note: 'About 1,100 of Burgoyne\'s men were killed or wounded in the two battles; the remaining 5,900 surrendered.' },
      summary: 'Burgoyne marched south from Canada to seize the Hudson and cut New England off from the other states. No army came north from New York to meet him. On September 19 at Freeman\'s Farm he held the field but lost men he could not replace. On October 7 at Bemis Heights, Benedict Arnold led the charge that broke his line. Surrounded, outnumbered three to one, and out of food, Burgoyne surrendered his whole army ten days later.',
      significance: 'The turning point of the war. It convinced France to sign an alliance with the United States, which brought the money, army, and navy that made Yorktown possible.',
      images: [
        img('Surrender of General Burgoyne.jpg', 'The Surrender of General Burgoyne at Saratoga, October 17, 1777.', 'John Trumbull, oil painting, 1821. United States Capitol.')
      ],
      journal: [
        {
          quote: 'Eleven cannon balls went through the house, and we could plainly hear them rolling over our heads. One poor soldier, whose leg they were about to amputate, having been laid upon a table for this purpose, had the other leg taken off by another cannon ball, in the very middle of the operation.',
          who: 'Baroness Frederika von Riedesel', role: 'Wife of the German commander, sheltering in a cellar with her three small daughters', side: 'civilian',
          date: 'October 1777', source: 'Letters and Journals Relating to the War of the American Revolution (translated by William L. Stone, 1867)', portrait: 'riedesel', verified: true, ref: 'https://archive.org/details/lettersjournalsr00ried?q=%22Eleven%20cannon%20balls%20went%22', refTitle: 'Letters and Journals Relating to the War of the American Revolution, trans. William L. Stone (1867)'
        },
        {
          quote: 'We marched out, according to treaty, with drums beating & the honours of war, but the drums seemed to have lost their former inspiriting sounds, and though we beat the Grenadiers march, which not long before was so animating, yet then it seemed by its last feeble effort, as if almost ashamed to be heard on such an occasion.',
          who: 'Lt. William Digby', role: '53rd Regiment of Foot', side: 'british',
          date: 'October 17, 1777', source: 'Journal, published as The British Invasion from the North (1887)', verified: true, ref: 'https://archive.org/details/britishinvasionf0000digb?q=%22We%20marched%20out%20according%22', refTitle: 'The British Invasion from the North: The Journal of Lieut. William Digby (1887)'
        },
        {
          quote: 'The voice of fame, ere this reaches you, will tell how greatly fortunate we have been in this department. Burgoyne and his whole army have laid down their arms, and surrendered themselves to me and my Yankees.',
          who: 'Maj. Gen. Horatio Gates', role: 'Commander of the American northern army', side: 'american',
          date: 'October 20, 1777', source: 'Letter to his wife', portrait: 'gates', verified: true, ref: 'https://archive.org/details/gentlemanjohnnyb00hudl?q=%22The%20voice%20of%20fame%22', refTitle: 'F. J. Hudleston, Gentleman Johnny Burgoyne (1927), quoting the letter'
        }
      ]
    },
    {
      id: 'valley-forge',
      name: 'Valley Forge',
      start: '1777-12-19', end: '1778-06-19',
      lat: 40.1010, lng: -75.4440,
      place: 'Valley Forge, Pennsylvania',
      theater: 'Middle States',
      result: 'none', resultLabel: 'Winter encampment',
      campaign: 'washington-valley-forge',
      commanders: { american: 'Gen. George Washington, Baron Friedrich von Steuben', british: 'Gen. Sir William Howe, in Philadelphia' },
      forces: { american: 'about 12,000 entered camp', british: 'about 15,000, quartered twenty miles away' },
      casualties: { american: 2000, british: 0, heading: 'Deaths', kind: '(disease, exposure, and malnutrition)', note: 'No battle was fought here. Roughly 2,000 soldiers died in camp, most from typhus, dysentery, and pneumonia.' },
      summary: 'With the British comfortable in Philadelphia, Washington\'s army built a city of log huts on a windswept plateau twenty miles away. The supply system had broken down: for weeks at a time there was no meat, and thousands of men had no shoes or blankets. Yet the army held together. In February a Prussian officer, Baron von Steuben, began drilling the troops in a single, simple system of movements and the use of the bayonet.',
      significance: 'The army that marched out in June could maneuver and fight like European regulars, as it showed nine days later at Monmouth.',
      images: [
        img('The March to Valley Forge William Trego.png', 'The March to Valley Forge, December 19, 1777.', 'William B. T. Trego, oil painting, 1883. Museum of the American Revolution.'),
        img('Washington and Lafayette at Valley Forge.jpg', 'Washington and Lafayette at Valley Forge.', 'John Ward Dunsmore, 1907. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I am Sick—discontented—and out of humour. Poor food—hard lodging—Cold Weather—fatigue—Nasty Cloaths—nasty Cookery—Vomit half my time—smoak\'d out of my senses—the Devil\'s in\'t—I can\'t Endure it—Why are we sent here to starve and Freeze?',
          who: 'Dr. Albigence Waldo', role: 'Surgeon, 1st Connecticut Regiment', side: 'american',
          date: 'December 14, 1777', source: 'Diary of Albigence Waldo, printed in the Pennsylvania Magazine of History and Biography (1897)', verified: true, ref: 'https://archive.org/details/sim_pennsylvania-magazine-of-history-and-biography_1897_21_3?q=%22out%20of%20humour%20Poor%22', refTitle: 'The Pennsylvania Magazine of History and Biography, vol. 21 (1897)'
        },
        {
          quote: 'Unless some great and capital change suddenly takes place … this Army must inevitably be reduced to one or other of these three things. Starve, dissolve, or disperse, in order to obtain subsistence in the best manner they can.',
          who: 'Gen. George Washington', role: 'Commander in chief', side: 'american',
          date: 'December 23, 1777', source: 'Letter to Henry Laurens, President of Congress', portrait: 'washington', verified: true, ref: 'https://archive.org/details/writingsgeorgew08washgoog?q=%22Unless%20some%20great%20and%22', refTitle: 'The Writings of George Washington (19th-century edition)'
        },
        {
          quote: 'Our country, ever mindful of its suffering army, opened her sympathizing heart so wide, upon this occasion, as to give us something to make the world stare. And what do you think it was, reader?—Guess.—You cannot guess, be you as much of a Yankee as you will. I will tell you: it gave each and every man half a gill of rice, and a table spoon full of vinegar!!',
          who: 'Pvt. Joseph Plumb Martin', role: '8th Connecticut Regiment, on the Thanksgiving dinner ordered by Congress', side: 'american',
          date: 'December 18, 1777 (recalled)', source: 'A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (1830)', verified: true, ref: 'https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_III.', refTitle: 'Joseph Plumb Martin, A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (Wikisource transcription)'
        },
        {
          quote: 'The genius of this nation is not in the least to be compared with that of the Prussians, Austrians, or French. You say to your soldier, "Do this, and he doeth it;" but I am obliged to say, "This is the reason why you ought to do that," and then he does it.',
          who: 'Baron Friedrich von Steuben', role: 'Inspector general, who trained the army at Valley Forge', side: 'american',
          date: 'Recalled after the war', source: 'Letter to a Prussian officer, in Friedrich Kapp, The Life of Frederick William von Steuben (1859)', verified: true, ref: 'https://archive.org/details/lifeoffrederickw00kappuoft?q=%22The%20genius%20of%20this%22', refTitle: 'Friedrich Kapp, The Life of Frederick William von Steuben (1859)'
        }
      ]
    },
    {
      id: 'monmouth',
      name: 'Monmouth',
      start: '1778-06-28', end: '1778-06-28',
      lat: 40.2640, lng: -74.3200,
      place: 'Monmouth Court House (Freehold), New Jersey',
      theater: 'Middle States',
      result: 'inconclusive',
      campaign: 'washington-valley-forge',
      commanders: { american: 'Gen. George Washington, Maj. Gen. Charles Lee', british: 'Lt. Gen. Sir Henry Clinton' },
      forces: { american: 'about 11,000', british: 'about 14,000' },
      casualties: { american: 362, british: 358, note: 'The temperature reached about 100 degrees. Dozens of soldiers on both sides died of heatstroke.' },
      summary: 'When France entered the war, the British gave up Philadelphia and marched across New Jersey for New York. Washington caught their rear guard at Monmouth. The advance under Charles Lee fell back in confusion; Washington rode up, took command himself, and formed a line that held against repeated attacks through a blazing afternoon. The British marched away in the night.',
      significance: 'The last major battle in the North. The army trained at Valley Forge had met British regulars in the open and held its ground.',
      images: [
        img('Washington Rallying the Troops at Monmouth, 1857, Leutze.jpg', 'Washington Rallying the Troops at Monmouth.', 'Emanuel Leutze, oil painting, 1857.'),
        img('Molly Pitcher firing cannon at Battle of Monmouth) - E. Percy Moran LCCN96516279.jpg', '"Molly Pitcher" at Monmouth. The legend grew from women like Mary Ludwig Hays, who carried water and served at the guns.', 'E. Percy Moran, c. 1911. Library of Congress.')
      ],
      journal: [
        {
          quote: 'A woman whose husband belonged to the Artillery, and who was then attached to a piece in the engagement, attended with her husband at the piece the whole time; while in the act of reaching a cartridge and having one of her feet as far before the other as she could step, a cannon shot from the enemy passed directly between her legs without doing any other damage than carrying away all the lower part of her petticoat.',
          who: 'Pvt. Joseph Plumb Martin', role: '8th Connecticut Regiment; the only eyewitness account behind the "Molly Pitcher" story', side: 'american',
          date: 'June 28, 1778 (recalled)', source: 'A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (1830)', verified: true, ref: 'https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_IV.', refTitle: 'Joseph Plumb Martin, A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier (Wikisource transcription)'
        },
        {
          quote: 'I thought then, as now … that never had I beheld so superb a man.',
          who: 'The marquis de Lafayette', role: 'Major general, on Washington riding along the line at Monmouth', side: 'american',
          date: 'Recalled years later', source: 'As told to Washington\'s step-grandson, G. W. P. Custis, Recollections and Private Memoirs of Washington (1859)', portrait: 'lafayette', verified: true, ref: 'https://archive.org/details/recollectionspri00cust?q=%22thought%20then%20as%20now%22', refTitle: 'G. W. P. Custis, Recollections and Private Memoirs of Washington (1859)'
        }
      ]
    },
    {
      id: 'charleston',
      name: 'Siege of Charleston',
      start: '1780-03-29', end: '1780-05-12',
      lat: 32.7765, lng: -79.9311,
      place: 'Charleston, South Carolina',
      theater: 'Southern',
      result: 'british',
      commanders: { american: 'Maj. Gen. Benjamin Lincoln', british: 'Lt. Gen. Sir Henry Clinton, Lt. Gen. Charles Cornwallis' },
      forces: { american: 'about 5,500', british: 'about 13,500 and the fleet' },
      casualties: { american: 5500, british: 258, note: 'About 5,300 Americans were captured: the largest surrender of an American army until the Civil War.' },
      summary: 'Stalemated in the North, the British turned to the South, where they expected Loyalists to rally to the king. Clinton sailed from New York, landed below Charleston, and dug his way toward the city with siege trenches while his ships closed the harbor and his cavalry cut the last road out. After six weeks of bombardment, Lincoln surrendered the city and his entire army.',
      significance: 'The worst American defeat of the war. It handed Britain South Carolina and opened the southern campaign that would end at Yorktown.',
      images: [
        img('Alonzo Chappel Siege of Charleston.jpg', 'The Siege of Charleston, 1780.', 'Alonzo Chappel, oil painting, 1862.')
      ],
      journal: [
        {
          quote: 'It appeared as if the stars were tumbling down. The fire was incessant almost the whole night; cannon-balls whizzing and shells hissing continually amongst us; ammunition chests and temporary magazines blowing up; great guns bursting, and wounded men groaning along the lines. It was a dreadful night!',
          who: 'Brig. Gen. William Moultrie', role: 'Second in command of the Charleston garrison', side: 'american',
          date: 'May 9, 1780 (recalled)', source: 'Memoirs of the American Revolution (1802)', portrait: 'moultrie', verified: true, ref: 'https://archive.org/details/memoirsamerican00moulgoog?q=%22It%20appeared%20as%20if%22', refTitle: 'William Moultrie, Memoirs of the American Revolution (1802)'
        }
      ]
    },
    {
      id: 'camden',
      name: 'Camden',
      start: '1780-08-16', end: '1780-08-16',
      lat: 34.3530, lng: -80.6090,
      place: 'Camden, South Carolina',
      theater: 'Southern',
      result: 'british',
      campaign: 'southern-british',
      commanders: { american: 'Maj. Gen. Horatio Gates, Maj. Gen. Johann de Kalb (killed)', british: 'Lt. Gen. Charles Cornwallis' },
      forces: { american: 'about 3,700, most of them militia', british: 'about 2,100' },
      casualties: { american: 1900, british: 324 },
      summary: 'Congress sent Gates, the victor of Saratoga, to rebuild the southern army. He marched his hungry, sick troops straight at the British base at Camden and collided with Cornwallis in the dark. At dawn the British regulars charged with the bayonet, and the untrained militia on the American left threw down their loaded muskets and ran. The Maryland and Delaware Continentals under de Kalb fought on until they were surrounded. Gates fled on a fast horse and did not stop for sixty miles.',
      significance: 'The second American army lost in the South in three months. Congress let Washington choose the next commander, and he sent Nathanael Greene.',
      images: [
        img('Battle of Camden - death of De Kalb (NYPL Hades-257486-EM15410).jpg', 'The Battle of Camden: the death of de Kalb.', 'Engraving after Alonzo Chappel, 19th century. New York Public Library.')
      ],
      journal: [
        {
          quote: 'The impetuosity with which they advanced, firing and huzzaing, threw the whole body of the militia into such a panic that they generally threw down their loaded arms and fled, in the utmost consternation.',
          who: 'Col. Otho Holland Williams', role: 'Adjutant general of Gates\'s army', side: 'american',
          date: 'August 16, 1780 (recalled)', source: 'A Narrative of the Campaign of 1780', verified: true, ref: 'https://archive.org/details/lifenathanael00simmrich?q=%22The%20impetuosity%20with%20which%22', refTitle: 'William Gilmore Simms, The Life of Nathanael Greene (1861), quoting the narrative'
        },
        {
          quote: 'Was there ever an instance of a General running away as Gates has done from his whole army? And was there ever so precipitous a flight? One hundred and eighty miles in three days and a half. It does admirable credit to the activity of a man at his time of life.',
          who: 'Lt. Col. Alexander Hamilton', role: 'Aide-de-camp to Washington', side: 'american',
          date: 'September 6, 1780', source: 'Letter to James Duane', portrait: 'hamilton', verified: true, ref: 'https://archive.org/details/worksalexanderh35hamigoog?q=%22Was%20there%20ever%20an%22', refTitle: 'The Works of Alexander Hamilton (1850)'
        }
      ]
    },
    {
      id: 'kings-mountain',
      name: 'Kings Mountain',
      start: '1780-10-07', end: '1780-10-07',
      lat: 35.1410, lng: -81.3770,
      place: 'York County, South Carolina',
      theater: 'Southern',
      result: 'american',
      campaign: 'overmountain',
      commanders: { american: 'Cols. William Campbell, John Sevier, Isaac Shelby, and Benjamin Cleveland', british: 'Maj. Patrick Ferguson (killed), commanding Loyalist militia' },
      forces: { american: 'about 900 frontier militia', british: 'about 1,100 Loyalists' },
      casualties: { american: 90, british: 1018, note: 'Ferguson was the only British soldier on the field. Every other man on both sides was American.' },
      summary: 'Major Patrick Ferguson, guarding Cornwallis\'s western flank with a force of Loyalists, warned the settlers beyond the Blue Ridge that he would march over the mountains and "lay their country waste with fire and sword." They came to him instead. Riflemen from what is now Tennessee and Virginia rode for two weeks, surrounded his camp on a wooded ridge, and fought their way up from tree to tree. Ferguson was shot from his horse, and his whole force was killed or captured in an hour.',
      significance: 'Destroyed a third of Cornwallis\'s army, silenced Loyalist support in the Carolinas, and forced him to abandon his first invasion of North Carolina.',
      images: [
        img('KingsMountain DeathOfFerguson Chappel.jpg', 'The death of Major Ferguson at Kings Mountain.', 'Alonzo Chappel, 1863.'),
        img('Gathering-of-overmountain-men-branson-tn1.jpg', 'The gathering of the Overmountain Men at Sycamore Shoals.', 'Lloyd Branson, oil painting, 1915. Tennessee State Museum.')
      ],
      journal: [
        {
          quote: 'The first link in a chain of evils that followed each other in regular succession until they at last ended in the total loss of America.',
          who: 'Lt. Gen. Sir Henry Clinton', role: 'British commander in chief in North America', side: 'british',
          date: 'Recalled after the war', source: 'Clinton\'s narrative of his campaigns, published as The American Rebellion', portrait: 'clinton', verified: true, ref: 'https://archive.org/details/musgrovemillhist01unse?q=%22The%20first%20link%20in%22', refTitle: 'Musgrove Mill Historic Resource Study (National Park Service), quoting Clinton'
        },
        {
          quote: 'It [the victory at Kings Mountain] was the joyful annunciation of that turn of the tide of success which terminated the revolutionary war with the seal of our independence.',
          who: 'Thomas Jefferson', role: 'Governor of Virginia in 1780', side: 'american',
          date: 'November 10, 1822', source: 'Letter to John Campbell', portrait: 'jefferson', verified: true, ref: 'https://archive.org/details/writingsthomasj05washgoog?q=%22It%20was%20the%20joyful%22', refTitle: 'The Writings of Thomas Jefferson, ed. H. A. Washington (1854)'
        }
      ]
    },
    {
      id: 'cowpens',
      name: 'Cowpens',
      start: '1781-01-17', end: '1781-01-17',
      lat: 35.1370, lng: -81.8180,
      place: 'Cherokee County, South Carolina',
      theater: 'Southern',
      result: 'american',
      campaign: 'morgan',
      tactical: {
        base: 'contour',
        bounds: [[35.12962, -81.82021], [35.14109, -81.80454]],
        note: 'This is a schematic. The three American lines are placed at the positions the National Park Service marks along the old Green River Road. Line lengths and the movements between steps are approximate.',
        places: [{ name: 'Low rise', ll: [35.13828, -81.8132] }, { name: 'To the Broad River', ll: [35.13856, -81.81709] }],
        // Shown on the period map. The trace of the old road, from OpenStreetMap.
        lines: [{kind: 'road', name: 'Green River Road', pts: [[35.13154, -81.80378], [35.13155, -81.80526], [35.13233, -81.80828], [35.13294, -81.81012], [35.13449, -81.81357], [35.13584, -81.81513], [35.141, -81.81881], [35.14241, -81.82069]]}],
        units: {
          skirm: { side: 'american', name: 'Rifle skirmishers', short: 'Skirmishers' },
          militia: { side: 'american', name: 'Pickens\'s militia', short: 'Militia' },
          cont: { side: 'american', name: 'Howard\'s Continentals', short: 'Continentals' },
          cav: { side: 'american', name: 'William Washington\'s cavalry', short: 'Cavalry' },
          inf: { side: 'british', name: 'British infantry', short: 'British infantry' },
          high: { side: 'british', name: '71st Highlanders', short: '71st Highlanders' },
          drag: { side: 'british', name: 'Tarleton\'s dragoons', short: 'Dragoons' }
        },
        phases: [
          { time: 'January 17, dawn', title: 'Three lines',
            text: 'Morgan places his men in three lines across the Green River Road, on open ground with scattered trees. Riflemen out front, militia 150 yards behind them, the trained Continentals on a low rise behind the militia, and the cavalry out of sight in the rear. Tarleton, after a night march, forms up and attacks at once.',
            units: { skirm: [[35.13324, -81.81375], [35.13489, -81.81172]], militia: [[35.13394, -81.81588], [35.13635, -81.81291]], cont: [[35.13531, -81.81686], [35.13746, -81.81421]], cav: [[35.13723, -81.81675], [35.13786, -81.81597]], inf: [[35.13159, -81.81091], [35.13386, -81.8081]], high: [[35.13162, -81.80996], [35.13263, -81.80871]], drag: [[35.13255, -81.80843], [35.13331, -81.80749]] } },
          { time: 'About 7 a.m.', title: 'The skirmishers fall back',
            text: 'Riflemen behind trees pick off British officers and dragoons, then run back to join the militia line, exactly as Morgan had told them to.',
            units: { skirm: null, inf: [[35.13251, -81.81315], [35.13479, -81.81034]], high: [[35.13199, -81.81151], [35.133, -81.81027]], drag: [[35.133, -81.80952], [35.13376, -81.80859]] },
            arrows: [{ side: 'british', pts: [[35.13281, -81.80976], [35.13354, -81.8115]] }] },
          { time: 'Minutes later', title: 'Two volleys',
            text: 'Morgan had asked the militia for only two good volleys at killing range. They fire them into the British line at about fifty yards.',
            units: { inf: [[35.13345, -81.8151], [35.13573, -81.81229]] } },
          { time: 'Minutes later', title: 'The militia withdraws',
            text: 'Their job done, the militia file off around the American left toward the rear. The British take it for a rout and send dragoons to ride them down, but the American cavalry bursts out from behind the rise and drives the dragoons off.',
            units: { militia: [[35.13795, -81.8153], [35.13934, -81.81358]], inf: [[35.13436, -81.8162], [35.13663, -81.81339]], drag: [[35.13771, -81.8139], [35.13821, -81.81328]], cav: [[35.13777, -81.81467], [35.1384, -81.81389]] },
            arrows: [{ side: 'american', pts: [[35.13793, -81.81589], [35.13803, -81.81406]] }] },
          { time: 'About 7:30 a.m.', title: 'A mistaken order',
            text: 'Tarleton commits his reserve, the 71st Highlanders, around the American right. A confused order sends the Continental line marching to the rear. The British, sure of victory, break ranks and run forward.',
            units: { high: [[35.13395, -81.81772], [35.13497, -81.81647]], inf: [[35.135, -81.81664], [35.13715, -81.81398]], cont: [[35.13589, -81.81727], [35.13804, -81.81462]], drag: [[35.13477, -81.81074], [35.13527, -81.81011]], cav: [[35.13789, -81.81537], [35.13852, -81.81459]], militia: [[35.13669, -81.81784], [35.13808, -81.81613]] },
            arrows: [{ side: 'british', pts: [[35.13249, -81.81355], [35.13427, -81.81692]] }] },
          { time: 'Moments later', title: 'Turn and fire',
            text: 'Morgan picks a spot and the Continentals halt, face about, and fire a volley into the charging British at thirty yards, then go in with the bayonet. At the same moment the cavalry strikes the British right and rear, and the re-formed militia swings around the other flank into the Highlanders.',
            units: { cont: [[35.1356, -81.81707], [35.13775, -81.81442]], inf: [[35.13531, -81.81686], [35.13746, -81.81421]], cav: [[35.13718, -81.81334], [35.13793, -81.8124]], militia: [[35.13326, -81.81858], [35.13452, -81.81702]], high: [[35.13432, -81.81788], [35.1352, -81.81679]] },
            arrows: [{ side: 'american', pts: [[35.13857, -81.81425], [35.13768, -81.81312]] }, { side: 'american', pts: [[35.13679, -81.8173], [35.13425, -81.81796]] }] },
          { time: 'By 8 a.m.', title: 'Double envelopment',
            text: 'Surrounded on three sides, the British infantry throw down their arms. Tarleton escapes with a few dozen horsemen. In under an hour he has lost nearly nine-tenths of his force.',
            units: { inf: [[35.13577, -81.81609], [35.13678, -81.81484]], high: [[35.13424, -81.81757], [35.13487, -81.81679]], drag: [[35.13207, -81.80826], [35.13245, -81.80779]], cav: [[35.1329, -81.81115], [35.13353, -81.81037]], cont: [[35.13545, -81.81697], [35.1376, -81.81431]], militia: [[35.13361, -81.81835], [35.13487, -81.81679]] },
            arrows: [{ side: 'american', pts: [[35.13492, -81.81412], [35.13332, -81.81101]] }] }
        ],
        ask: ['Morgan asked his militia for only two volleys. Why was that a strength of his plan and not a weakness?', 'What did the British think was happening when the militia left the field? What was really happening?', 'Compare this battle with Camden. The Americans had militia at both. What was different?']
      },
      commanders: { american: 'Brig. Gen. Daniel Morgan', british: 'Lt. Col. Banastre Tarleton' },
      forces: { american: 'about 1,900', british: 'about 1,150' },
      casualties: { american: 149, british: 939, note: 'About 110 British were killed and more than 800 captured. Tarleton escaped with a few horsemen.' },
      summary: 'Daniel Morgan knew his militia would not stand long against bayonets, so he built that into his plan. He put them in two lines out front and asked each for just a few volleys before falling back behind his Continentals. Tarleton\'s regulars took the retreat for a rout and charged in disorder, straight into a volley at thirty yards. Then Morgan\'s cavalry and the re-formed militia closed on both flanks.',
      significance: 'A tactical masterpiece that wiped out Cornwallis\'s best light troops and set off the chase that wore his army down.',
      images: [
        img('Cowpens.jpg', 'The Battle of Cowpens: William Washington\'s cavalry duel, with a Black soldier firing to save him.', 'William Ranney, oil painting, 1845.')
      ],
      journal: [
        {
          quote: 'He went among the volunteers, helped them fix their swords, joked with them about their sweethearts, told them to keep in good spirits, and the day would be ours … "Just hold up your heads, boys, three fires," he would say, "and you are free."',
          who: 'Pvt. Thomas Young', role: 'South Carolina militia, sixteen years old, on Morgan the night before the battle', side: 'american',
          date: 'January 16, 1781 (recalled)', source: 'Memoir of Major Thomas Young, printed in The Orion magazine (October 1843)', verified: true, ref: 'https://archive.org/details/sim_orion-a-monthly-magazine-of-literature-and-art_1843-10_3_2?q=%22He%20went%20among%20the%22', refTitle: 'The Orion magazine, October 1843'
        },
        {
          quote: 'I have given him a devil of a whipping—a more complete victory never was.',
          who: 'Brig. Gen. Daniel Morgan', role: 'American commander, on Tarleton', side: 'american',
          date: 'January 26, 1781', source: 'Letter to William Snickers, as first printed in William Dunlap, A History of New York, for Schools (1837)', portrait: 'morgan', verified: true, ref: 'https://archive.org/details/ahistorynewyork00dunlgoog?q=%22more%20complete%20victory%20never%22', refTitle: 'William Dunlap, A History of New York, for Schools (1837)'
        }
      ]
    },
    {
      id: 'guilford-courthouse',
      name: 'Guilford Courthouse',
      start: '1781-03-15', end: '1781-03-15',
      lat: 36.1310, lng: -79.8460,
      place: 'Greensboro, North Carolina',
      theater: 'Southern',
      result: 'british',
      campaign: 'southern-british',
      commanders: { american: 'Maj. Gen. Nathanael Greene', british: 'Lt. Gen. Charles Cornwallis' },
      forces: { american: 'about 4,400', british: 'about 1,900' },
      casualties: { american: 1310, british: 532, note: 'Most of the American "missing" were militia who went home. Cornwallis lost more than a quarter of his army in two hours.' },
      summary: 'After Cowpens, Cornwallis burned his own baggage and chased Greene two hundred miles to the Virginia border. Greene escaped across the Dan River, gathered reinforcements, and came back to fight on ground he chose. He copied Morgan\'s plan with three lines. The British broke through all three, at one point firing cannon into their own men to stop an American counterattack, and Greene withdrew in good order.',
      significance: 'A victory Cornwallis could not afford. Too weak to hold the Carolinas, he marched to the coast and then into Virginia, where the war would end.',
      images: [
        img('Battle of Guilford Courthouse 15 March 1781.jpg', 'The 1st Maryland Regiment counterattacks at Guilford Courthouse.', 'H. Charles McBarron, U.S. Army Center of Military History.')
      ],
      journal: [
        {
          quote: 'We fight, get beat, rise, and fight again.',
          who: 'Maj. Gen. Nathanael Greene', role: 'Commander of the American southern army', side: 'american',
          date: 'June 22, 1781', source: 'Letter to the chevalier de La Luzerne, French minister to the United States', portrait: 'greene', verified: true, ref: 'https://archive.org/details/nathanaelgreenes010777mbp?q=%22We%20fight%20get%20beat%22', refTitle: 'Theodore Thayer, Nathanael Greene: Strategist of the American Revolution (1960), quoting the letter'
        },
        {
          quote: 'I am quite tired of marching about the country in quest of adventures.',
          who: 'Lt. Gen. Charles Cornwallis', role: 'Commander of the British southern army', side: 'british',
          date: 'April 10, 1781', source: 'Letter to Maj. Gen. William Phillips', portrait: 'cornwallis', verified: true, ref: 'https://archive.org/details/correspondencec03rossgoog?q=%22am%20quite%20tired%20of%22', refTitle: 'Correspondence of Charles, First Marquis Cornwallis (1859)'
        },
        {
          quote: 'Another such victory would ruin the British army.',
          who: 'Charles James Fox', role: 'Member of Parliament and leading opponent of the war', side: 'british',
          date: 'June 1781', source: 'Speech in the House of Commons', portrait: 'fox', verified: true, ref: 'https://archive.org/details/jessupfamilycont00jess?q=%22Another%20such%20victory%20would%22', refTitle: 'The Jessup Family (1908), quoting the speech'
        }
      ]
    },
    {
      id: 'yorktown',
      name: 'Siege of Yorktown',
      start: '1781-09-28', end: '1781-10-19',
      lat: 37.2390, lng: -76.5100,
      place: 'Yorktown, Virginia',
      theater: 'Southern',
      result: 'american',
      campaign: 'washington-rochambeau',
      tactical: {
        base: "topo",
        bounds: [[37.203, -76.535], [37.268, -76.478]],
        note: "Positions are simplified and tied to the earthworks the National Park Service preserves: the British inner line, Redoubts 9 and 10, the Grand French Battery, and the second siege line.",
        lines: [
          { kind: "road", name: "Hampton Road", pts: [[37.22875, -76.50609], [37.22276, -76.5067], [37.22123, -76.50648], [37.2032, -76.4957]] },
          {
            kind: "road",
            name: "Williamsburg Road",
            pts: [[37.23289, -76.53195], [37.23256, -76.53187], [37.23087, -76.52999], [37.22938, -76.5268], [37.22733, -76.52363], [37.22549, -76.52172], [37.22456, -76.51965], [37.22369, -76.5143], [37.22359, -76.51192], [37.2239, -76.50897], [37.22475, -76.50769], [37.22507, -76.50644]]
          },
          {
            kind: "stream",
            name: "Baptist Run",
            pts: [[37.21445, -76.53495], [37.21434, -76.53315], [37.21449, -76.53144], [37.21363, -76.52752], [37.21361, -76.52534], [37.21256, -76.52273], [37.21241, -76.52144], [37.21177, -76.52013], [37.21178, -76.51971], [37.21146, -76.51904], [37.21023, -76.51767]]
          },
          {
            kind: "stream",
            name: "Beaverdam Creek",
            pts: [[37.21023, -76.51767], [37.20948, -76.51747], [37.20889, -76.51779], [37.20874, -76.5181], [37.20746, -76.51788], [37.20694, -76.51838], [37.2059, -76.51831], [37.20306, -76.52005]]
          },
          {
            kind: "stream",
            name: "Great Run",
            pts: [[37.22192, -76.52236], [37.2215, -76.52171], [37.22137, -76.52077], [37.22024, -76.52038], [37.21925, -76.51966], [37.21878, -76.51813], [37.21832, -76.51833], [37.21737, -76.51811], [37.21563, -76.51822], [37.21492, -76.51792], [37.21462, -76.51751], [37.21405, -76.51761], [37.21314, -76.51724], [37.21195, -76.51749], [37.21148, -76.51726], [37.2102, -76.51744], [37.21023, -76.51767]]
          }
        ],
        places: [
          { name: "Yorktown", ll: [37.236, -76.5078] },
          { name: "Gloucester Point", ll: [37.248, -76.501] },
          { name: "York River", ll: [37.242, -76.492] },
          { name: "Redoubts 9 and 10", ll: [37.229, -76.4955] },
          { name: "Grand French Battery", ll: [37.2222, -76.5047] },
          { name: "Surrender Field", ll: [37.2086, -76.5054] }
        ],
        units: {
          fr: { side: "american", name: "French army (Rochambeau)", short: "French" },
          am: { side: "american", name: "American army (Washington)", short: "Americans" },
          gla: { side: "american", name: "French and Virginia militia at Gloucester (Choisy)", short: "Choisy" },
          br: { side: "british", name: "British army (Cornwallis)", short: "Cornwallis" },
          out: { side: "british", name: "British outer works", short: "Outer works" },
          red: { side: "british", name: "Redoubts 9 and 10", short: "Redoubts" },
          glb: { side: "british", name: "British at Gloucester (Tarleton)", short: "Tarleton" }
        },
        phases: [
          {
            time: "September 28 to 30, 1781",
            title: "The allies close in",
            text: "Washington and Rochambeau march from Williamsburg and form a half circle around Yorktown, the French on the left and the Americans on the right. Out in Chesapeake Bay a French fleet blocks any rescue by sea. Cornwallis expects help from New York within days, so he gives up his outer forts without a fight and pulls his men back to the works around the town.",
            units: {
              fr: [[37.233, -76.529], [37.22, -76.523], [37.214, -76.513]],
              am: [[37.212, -76.508], [37.213, -76.495], [37.219, -76.485]],
              gla: [[37.2645, -76.5015], [37.2645, -76.4915]],
              br: [[37.24, -76.514], [37.235, -76.5125], [37.2305, -76.509], [37.2292, -76.5058], [37.2302, -76.5022], [37.2318, -76.5002]],
              out: [[37.2262, -76.514], [37.2231, -76.5134], [37.2215, -76.508]],
              red: [[37.2276, -76.4992], [37.2292, -76.4974]],
              glb: [[37.2535, -76.504], [37.2535, -76.4955]]
            }
          },
          {
            time: "October 6 to 9",
            title: "The first trench",
            text: "On a dark, rainy night, thousands of men with picks and shovels dig a trench more than a mile long, about 600 yards from the British line, without being noticed until morning. Cannon are dragged into it. On October 9 the French guns open fire, and Washington himself touches off the first American gun.",
            units: { out: null, fr: [[37.2242, -76.5105], [37.223, -76.5047]], am: [[37.2232, -76.5035], [37.2236, -76.499], [37.2262, -76.493]] }
          },
          {
            time: "October 11",
            title: "The second trench",
            text: "After two days of bombardment the British guns are nearly silent. The allies dig a second trench only 300 to 400 yards out, close enough to batter the walls down. But it cannot reach the river: two small British forts, Redoubts 9 and 10, stand in the way.",
            units: { fr: [[37.2262, -76.5105], [37.2263, -76.5054]], am: [[37.2262, -76.5045], [37.2262, -76.5005]] }
          },
          {
            time: "October 14, after dark",
            title: "Redoubts 9 and 10",
            text: "Four hundred French soldiers storm Redoubt 9. Four hundred Americans led by Lt. Col. Alexander Hamilton take Redoubt 10, going in with unloaded muskets and bayonets so that no shot will give them away. Both forts fall in minutes. By morning they are part of the allied trench.",
            units: { red: null, am: [[37.2262, -76.5045], [37.2268, -76.5008], [37.2276, -76.4992], [37.2292, -76.4974]] },
            arrows: [
              { side: "american", pts: [[37.2248, -76.5004], [37.2273, -76.4994]] },
              { side: "american", pts: [[37.2262, -76.4958], [37.2288, -76.4972]] }
            ]
          },
          {
            time: "October 16",
            title: "Two last tries",
            text: "Before dawn 350 British soldiers rush the new trench and disable a few cannon, which are firing again within hours. That night Cornwallis tries to ferry his army across the river to Gloucester and break out to the north. A sudden storm scatters the boats.",
            units: {  },
            arrows: [
              { side: "british", pts: [[37.2292, -76.5056], [37.2266, -76.505]] },
              { side: "british", pts: [[37.2392, -76.507], [37.247, -76.502]] }
            ]
          },
          {
            time: "October 17 to 19",
            title: "Surrender",
            text: "On the morning of October 17, a drummer climbs onto the British wall and beats for a parley. Two days later more than 7,000 British and German soldiers march out between a line of French troops and a line of Americans and lay down their arms in an open field. It is the last major battle of the war.",
            units: { br: [[37.2105, -76.506], [37.2085, -76.5048]], fr: [[37.221, -76.5078], [37.2115, -76.5072]], am: [[37.221, -76.5046], [37.2118, -76.5034]] },
            arrows: [
              { side: "british", pts: [[37.2285, -76.506], [37.2118, -76.5054]] }
            ]
          }
        ],
        ask: [
          "Yorktown has a wide river on one side. Why did that make it a good place for Cornwallis to wait, and then a trap?",
          "Why did the allies dig their trenches at night, and why did each new trench have to be closer than the last?",
          "The second trench could not be finished until Redoubts 9 and 10 fell. Find them on the map and explain why."
        ]
      },
      commanders: { american: 'Gen. George Washington, Lt. Gen. the comte de Rochambeau, Adm. the comte de Grasse', british: 'Lt. Gen. Charles Cornwallis' },
      forces: { american: 'about 8,800 Americans and 7,800 French, plus the French fleet', british: 'about 8,300' },
      casualties: { american: 389, british: 8000, note: 'About 500 British and German soldiers were killed or wounded; more than 7,000 surrendered. The American figure includes French losses.' },
      summary: 'Cornwallis fortified the tobacco port of Yorktown and waited for the Royal Navy. A French fleet from the Caribbean got there first and, on September 5, beat the British squadron off the Virginia Capes. Meanwhile Washington and Rochambeau marched their armies 450 miles from New York in five weeks. The allies dug trenches ever closer, stormed two outlying forts with the bayonet on the night of October 14, and pounded the town until Cornwallis asked for terms.',
      significance: 'The last major battle. When the news reached London the government fell, and Britain opened the talks that ended in the Treaty of Paris (1783) and American independence.',
      images: [
        img('Surrender of Lord Cornwallis.jpg', 'The Surrender of Lord Cornwallis at Yorktown. Cornwallis sent his deputy; the British officer at center is Gen. Charles O\'Hara.', 'John Trumbull, oil painting, 1820. United States Capitol.')
      ],
      journal: [
        {
          quote: 'I have the mortification to inform your Excellency that I have been forced to give up the posts of York and Gloucester, and to surrender the troops under my command, by capitulation on the 19th instant, as prisoners of war to the combined forces of America and France.',
          who: 'Lt. Gen. Charles Cornwallis', role: 'Commander of the British army in Virginia', side: 'british',
          date: 'October 20, 1781', source: 'Dispatch to Sir Henry Clinton', portrait: 'cornwallis', verified: true, ref: 'https://en.wikisource.org/wiki/History_of_the_Rise%2C_Progress%2C_and_Termination_of_the_American_Revolution/Chapter_XXI', refTitle: 'Mercy Otis Warren, History of the Rise, Progress, and Termination of the American Revolution (1805) (Wikisource transcription)'
        },
        {
          quote: 'It was in the field, when they came to the last act of the drama, that the spirit and pride of the British soldier was put to the severest test: here their mortification could not be concealed.',
          who: 'Dr. James Thacher', role: 'Surgeon, Continental Army, watching the British lay down their arms', side: 'american',
          date: 'October 19, 1781', source: 'A Military Journal during the American Revolutionary War (1823)', verified: true, ref: 'https://archive.org/details/militaryjournal00thac?q=%22It%20was%20in%20the%22', refTitle: 'James Thacher, A Military Journal during the American Revolutionary War (1823)'
        },
        {
          quote: 'Oh God! It is all over!',
          who: 'Frederick, Lord North', role: 'British prime minister, on hearing the news from Yorktown', side: 'british',
          date: 'November 25, 1781', source: 'As reported by Lord George Germain, in Nathaniel Wraxall\'s Historical Memoirs (1815)', portrait: 'north', verified: true, ref: 'https://archive.org/details/historicalmemoi00wraxgoog?q=%22Oh%20God%20It%20is%22', refTitle: 'Nathaniel Wraxall, Historical Memoirs of My Own Time (1815)'
        }
      ]
    }
  ];

  // Waypoints: [lat, lng, 'YYYY-MM-DD', 'label']
  const CAMPAIGNS = [
    {
      id: 'concord-march', name: 'The British March to Concord', side: 'british',
      army: 'British garrison of Boston', commander: 'Francis Smith and Hugh Percy', short: 'Smith / Percy',
      start: '1775-04-18', end: '1775-04-19',
      description: 'The regulars crossed the Charles River by boat at night, marched through Lexington to Concord, and fought their way back along the same road. Percy\'s relief column met them at Lexington and brought them to safety in Charlestown.',
      path: [
        [42.355, -71.066, '1775-04-18', 'Boston Common; boats across the Charles'],
        [42.4495, -71.2308, '1775-04-19', 'Lexington Green, sunrise'],
        [42.469, -71.351, '1775-04-19', 'Concord and the North Bridge'],
        [42.4495, -71.2308, '1775-04-19', 'Lexington; Percy\'s relief column'],
        [42.378, -71.062, '1775-04-19', 'Charlestown, under the guns of the fleet']
      ]
    },
    {
      id: 'montgomery', name: 'Montgomery\'s Invasion of Canada', side: 'american',
      army: 'Continental northern army', commander: 'Richard Montgomery',
      start: '1775-08-28', end: '1775-12-31',
      description: 'Montgomery advanced up Lake Champlain and the Richelieu River, spent two months besieging Fort St. Jean, took Montreal without a fight, and joined Arnold outside Quebec.',
      path: [
        [43.8415, -73.3878, '1775-08-28', 'Fort Ticonderoga'],
        [45.120, -73.270, '1775-09-04', 'Île aux Noix'],
        [45.300, -73.250, '1775-09-17', 'Siege of Fort St. Jean begins'],
        [45.300, -73.250, '1775-11-03', 'Fort St. Jean surrenders'],
        [45.500, -73.570, '1775-11-13', 'Montreal'],
        [46.800, -71.240, '1775-12-03', 'Joins Arnold before Quebec'],
        [46.8139, -71.2080, '1775-12-31', 'Assault on Quebec']
      ]
    },
    {
      id: 'arnold-quebec', name: 'Arnold\'s March to Quebec', side: 'american',
      army: 'Continental detachment', commander: 'Benedict Arnold',
      start: '1775-09-11', end: '1775-12-31',
      description: 'Arnold led 1,100 men up the Kennebec River and over the mountains of Maine in leaking boats, through swamps and early snow. A third of the force turned back. The rest ate dogs, candles, and shoe leather before reaching the St. Lawrence.',
      path: [
        [42.373, -71.119, '1775-09-11', 'Cambridge'],
        [42.810, -70.880, '1775-09-16', 'Newburyport; by sea to Maine'],
        [44.310, -69.770, '1775-09-23', 'Fort Western, on the Kennebec'],
        [44.710, -69.790, '1775-10-02', 'Norridgewock Falls'],
        [45.230, -70.030, '1775-10-11', 'The Great Carrying Place'],
        [45.300, -70.400, '1775-10-19', 'Dead River; flood and famine'],
        [45.400, -70.800, '1775-10-25', 'The Height of Land'],
        [45.500, -70.880, '1775-10-27', 'Lake Mégantic'],
        [46.120, -70.670, '1775-11-03', 'First French settlements'],
        [46.800, -71.180, '1775-11-09', 'Point Lévis, opposite Quebec'],
        [46.8139, -71.2080, '1775-12-31', 'Assault on Quebec']
      ]
    },
    {
      id: 'knox', name: 'Knox\'s Noble Train of Artillery', side: 'american',
      army: 'Continental artillery', commander: 'Henry Knox',
      start: '1775-12-06', end: '1776-03-04',
      description: 'Henry Knox, a 25-year-old Boston bookseller, moved 59 cannon weighing 60 tons from Fort Ticonderoga to Boston in midwinter, by boat down Lake George and on ox-drawn sleds over the Berkshire hills.',
      path: [
        [43.8415, -73.3878, '1775-12-06', 'Fort Ticonderoga'],
        [43.420, -73.710, '1775-12-16', 'Fort George, head of Lake George'],
        [42.650, -73.750, '1776-01-05', 'Albany; crossing the frozen Hudson'],
        [42.390, -73.700, '1776-01-09', 'Kinderhook'],
        [42.190, -73.360, '1776-01-11', 'Great Barrington; into the Berkshires'],
        [42.100, -72.590, '1776-01-14', 'Springfield'],
        [42.260, -71.800, '1776-01-20', 'Worcester'],
        [42.280, -71.420, '1776-01-25', 'Framingham'],
        [42.3329, -71.0453, '1776-03-04', 'Dorchester Heights']
      ]
    },
    {
      id: 'howe-new-york', name: 'Howe\'s New York Campaign', side: 'british',
      army: 'British army in North America', commander: 'William Howe',
      start: '1776-07-02', end: '1776-12-08',
      description: 'With 32,000 troops and hundreds of ships, Howe took New York City, drove Washington off Manhattan, captured Fort Washington with nearly 3,000 prisoners, and chased the remnant of the American army across New Jersey.',
      path: [
        [40.580, -74.150, '1776-07-02', 'Staten Island landing'],
        [40.590, -73.990, '1776-08-22', 'Gravesend Bay'],
        [40.6655, -73.9700, '1776-08-27', 'Battle of Long Island'],
        [40.740, -73.975, '1776-09-15', 'Kip\'s Bay; New York City taken'],
        [40.870, -73.800, '1776-10-18', 'Pell\'s Point'],
        [41.030, -73.760, '1776-10-28', 'White Plains'],
        [40.850, -73.940, '1776-11-16', 'Fort Washington captured'],
        [40.850, -73.970, '1776-11-20', 'Fort Lee'],
        [40.490, -74.450, '1776-12-01', 'New Brunswick'],
        [40.220, -74.765, '1776-12-08', 'Trenton; halted at the Delaware']
      ]
    },
    {
      id: 'washington-1776', name: 'Washington: New York to Morristown', side: 'american',
      army: 'Continental Army', commander: 'George Washington',
      start: '1776-08-27', end: '1777-01-06',
      description: 'Driven from Long Island, Manhattan, and across New Jersey, Washington\'s army shrank from 20,000 to about 3,000. Then it crossed the Delaware and, in ten days, won at Trenton and Princeton.',
      path: [
        [40.6655, -73.9700, '1776-08-27', 'Battle of Long Island'],
        [40.710, -74.000, '1776-08-30', 'Night evacuation to Manhattan'],
        [40.810, -73.960, '1776-09-16', 'Harlem Heights'],
        [41.030, -73.760, '1776-10-28', 'White Plains'],
        [41.290, -73.920, '1776-11-10', 'Peekskill; crossing the Hudson'],
        [40.886, -74.043, '1776-11-21', 'Hackensack'],
        [40.735, -74.172, '1776-11-23', 'Newark'],
        [40.490, -74.450, '1776-11-29', 'New Brunswick'],
        [40.350, -74.660, '1776-12-02', 'Princeton'],
        [40.230, -74.830, '1776-12-08', 'Across the Delaware into Pennsylvania'],
        [40.297, -74.873, '1776-12-25', 'McConkey\'s Ferry; the crossing'],
        [40.2204, -74.7654, '1776-12-26', 'Trenton'],
        [40.3300, -74.6760, '1777-01-03', 'Princeton'],
        [40.797, -74.480, '1777-01-06', 'Morristown winter quarters']
      ]
    },
    {
      id: 'burgoyne', name: 'Burgoyne\'s Invasion from Canada', side: 'british',
      army: 'British army from Canada', commander: 'John Burgoyne',
      start: '1777-06-13', end: '1777-10-17',
      description: 'Burgoyne meant to reach Albany and cut New England off from the other states. He retook Ticonderoga easily, then spent weeks hacking a road through forest the Americans had blocked with felled trees, while his supplies ran down and militia gathered around him.',
      path: [
        [45.310, -73.250, '1777-06-13', 'St. Johns, Canada'],
        [44.030, -73.430, '1777-06-27', 'Crown Point'],
        [43.8415, -73.3878, '1777-07-06', 'Fort Ticonderoga retaken'],
        [43.550, -73.400, '1777-07-09', 'Skenesborough'],
        [43.270, -73.580, '1777-07-30', 'Fort Edward, on the Hudson'],
        [43.100, -73.580, '1777-09-13', 'Crosses the Hudson at Saratoga'],
        [43.0050, -73.6400, '1777-09-19', 'Freeman\'s Farm'],
        [43.0050, -73.6400, '1777-10-07', 'Bemis Heights'],
        [43.100, -73.580, '1777-10-17', 'Surrender at Saratoga']
      ]
    },
    {
      id: 'philadelphia', name: 'Howe\'s Philadelphia Campaign', side: 'british',
      army: 'British army in North America', commander: 'William Howe',
      start: '1777-07-23', end: '1777-10-04',
      description: 'Instead of marching north to meet Burgoyne, Howe put his army on ships, spent a month at sea, landed at the head of Chesapeake Bay, and took the American capital from the south.',
      path: [
        [40.500, -73.950, '1777-07-23', 'Sails from New York'],
        [38.800, -74.500, '1777-07-30', 'Off the Delaware Capes'],
        [36.950, -75.800, '1777-08-14', 'Enters Chesapeake Bay'],
        [38.300, -76.320, '1777-08-19', 'Up the Chesapeake'],
        [39.350, -76.150, '1777-08-23', 'Head of the bay'],
        [39.606, -75.833, '1777-08-25', 'Lands at Head of Elk'],
        [39.8750, -75.5750, '1777-09-11', 'Brandywine'],
        [40.040, -75.490, '1777-09-20', 'Paoli'],
        [39.950, -75.160, '1777-09-26', 'Philadelphia occupied'],
        [40.040, -75.170, '1777-10-04', 'Germantown']
      ]
    },
    {
      id: 'washington-valley-forge', name: 'Washington: Brandywine, Valley Forge, Monmouth', side: 'american',
      army: 'Continental Army', commander: 'George Washington',
      start: '1777-08-25', end: '1778-07-24',
      description: 'Washington failed to save Philadelphia, attacked again at Germantown, wintered at Valley Forge, and in June pursued the British across New Jersey to Monmouth.',
      path: [
        [39.740, -75.550, '1777-08-25', 'Wilmington'],
        [39.8750, -75.5750, '1777-09-11', 'Brandywine'],
        [39.850, -75.360, '1777-09-12', 'Chester'],
        [40.040, -75.170, '1777-10-04', 'Germantown'],
        [40.120, -75.220, '1777-11-02', 'Whitemarsh'],
        [40.1010, -75.4440, '1777-12-19', 'Valley Forge'],
        [40.1010, -75.4440, '1778-06-19', 'Leaves Valley Forge'],
        [40.365, -74.945, '1778-06-21', 'Coryell\'s Ferry, on the Delaware'],
        [40.390, -74.760, '1778-06-23', 'Hopewell'],
        [40.297, -74.358, '1778-06-27', 'Englishtown'],
        [40.2640, -74.3200, '1778-06-28', 'Monmouth'],
        [41.030, -73.760, '1778-07-24', 'White Plains']
      ]
    },
    {
      id: 'clinton-monmouth', name: 'Clinton\'s March across New Jersey', side: 'british',
      army: 'British army in North America', commander: 'Henry Clinton',
      start: '1778-06-18', end: '1778-07-01',
      description: 'With a French fleet on its way, Clinton abandoned Philadelphia and marched his army and a twelve-mile baggage train overland to New York.',
      path: [
        [39.950, -75.160, '1778-06-18', 'Leaves Philadelphia'],
        [39.890, -75.040, '1778-06-19', 'Haddonfield'],
        [40.180, -74.580, '1778-06-25', 'Allentown, New Jersey'],
        [40.2640, -74.3200, '1778-06-28', 'Monmouth'],
        [40.460, -74.000, '1778-07-01', 'Sandy Hook; ferried to New York']
      ]
    },
    {
      id: 'southern-british', name: 'Cornwallis in the South', side: 'british',
      army: 'British southern army', commander: 'Charles Cornwallis',
      start: '1780-05-12', end: '1781-10-19',
      description: 'Left to hold the South, Cornwallis won at Camden, invaded North Carolina twice, chased Greene to Virginia, won a ruinous victory at Guilford Courthouse, and finally marched to Yorktown.',
      path: [
        [32.7765, -79.9311, '1780-05-12', 'Charleston surrenders'],
        [34.250, -80.610, '1780-06-01', 'Camden occupied'],
        [34.3530, -80.6090, '1780-08-16', 'Battle of Camden'],
        [35.227, -80.843, '1780-09-26', 'Charlotte'],
        [34.380, -81.090, '1780-10-29', 'Winnsboro; retreat after Kings Mountain'],
        [35.470, -81.250, '1781-01-25', 'Ramsour\'s Mill; burns his baggage'],
        [35.430, -80.960, '1781-02-01', 'Cowan\'s Ford'],
        [35.670, -80.470, '1781-02-03', 'Salisbury'],
        [36.600, -79.000, '1781-02-15', 'Dan River; Greene escapes'],
        [36.075, -79.100, '1781-02-20', 'Hillsborough'],
        [36.1310, -79.8460, '1781-03-15', 'Guilford Courthouse'],
        [34.230, -77.945, '1781-04-07', 'Wilmington'],
        [36.330, -77.590, '1781-05-10', 'Halifax, North Carolina'],
        [37.230, -77.400, '1781-05-20', 'Petersburg, Virginia'],
        [37.270, -76.710, '1781-06-25', 'Williamsburg'],
        [37.2390, -76.5100, '1781-08-02', 'Yorktown fortified'],
        [37.2390, -76.5100, '1781-10-19', 'Surrender']
      ]
    },
    {
      id: 'overmountain', name: 'The Overmountain Men', side: 'american',
      army: 'Patriot frontier militia', commander: 'William Campbell, John Sevier and Isaac Shelby', short: 'Overmountain Men',
      start: '1780-09-25', end: '1780-10-07',
      description: 'Frontier riflemen gathered at Sycamore Shoals, crossed the Blue Ridge through snow at Yellow Mountain Gap, and rode 330 miles in thirteen days to catch Ferguson at Kings Mountain.',
      path: [
        [36.340, -82.250, '1780-09-25', 'Sycamore Shoals muster'],
        [36.100, -82.050, '1780-09-27', 'Yellow Mountain Gap'],
        [35.760, -81.720, '1780-09-30', 'Quaker Meadows'],
        [35.380, -81.960, '1780-10-04', 'Gilbert Town'],
        [35.1370, -81.8180, '1780-10-06', 'The Cowpens'],
        [35.1410, -81.3770, '1780-10-07', 'Kings Mountain']
      ]
    },
    {
      id: 'greene', name: 'Greene\'s Southern Campaign', side: 'american',
      army: 'Continental southern army', commander: 'Nathanael Greene',
      start: '1780-12-02', end: '1781-09-08',
      description: 'Greene took over a beaten army, split it to live off the country, outran Cornwallis to the Dan River, fought him at Guilford Courthouse, and then turned south. He lost nearly every battle and won back the Carolinas and Georgia.',
      path: [
        [35.227, -80.843, '1780-12-02', 'Charlotte; Greene takes command'],
        [34.700, -79.880, '1780-12-26', 'Cheraw'],
        [35.670, -80.470, '1781-02-02', 'Salisbury; the Race to the Dan'],
        [36.1310, -79.8460, '1781-02-08', 'Guilford Courthouse'],
        [36.700, -78.900, '1781-02-14', 'Crosses the Dan into Virginia'],
        [36.1310, -79.8460, '1781-03-15', 'Battle of Guilford Courthouse'],
        [35.590, -79.050, '1781-03-28', 'Ramsey\'s Mill'],
        [34.270, -80.600, '1781-04-25', 'Hobkirk\'s Hill'],
        [34.147, -82.020, '1781-05-22', 'Siege of Ninety Six'],
        [34.147, -82.020, '1781-06-19', 'Siege lifted'],
        [33.950, -80.520, '1781-07-16', 'High Hills of Santee'],
        [33.410, -80.300, '1781-09-08', 'Eutaw Springs']
      ]
    },
    {
      id: 'morgan', name: 'Morgan and the Road to Cowpens', side: 'american',
      army: 'Flying army, Continental southern army', commander: 'Daniel Morgan',
      start: '1780-12-21', end: '1781-02-02',
      description: 'Greene sent Morgan west with 600 picked men to threaten the British outposts. Tarleton came after him, and Morgan turned to fight at a cattle pasture called the Cowpens, then raced north with his prisoners to rejoin Greene.',
      path: [
        [35.227, -80.843, '1780-12-21', 'Leaves Charlotte'],
        [34.870, -81.700, '1780-12-25', 'Grindal Shoals, on the Pacolet'],
        [35.1370, -81.8180, '1781-01-17', 'Cowpens'],
        [35.600, -81.000, '1781-01-23', 'Sherrill\'s Ford, on the Catawba'],
        [35.670, -80.470, '1781-02-02', 'Salisbury; rejoins Greene']
      ]
    },
    {
      id: 'washington-rochambeau', name: 'The March to Yorktown', side: 'american',
      army: 'Continental and French armies', commander: 'George Washington and the comte de Rochambeau', short: 'Washington / Rochambeau',
      start: '1781-08-19', end: '1781-10-19',
      description: 'Learning that a French fleet was sailing for the Chesapeake, Washington left a screen facing New York to fool Clinton and marched the allied armies south in secret. They covered 450 miles in five weeks.',
      path: [
        [41.010, -73.870, '1781-08-19', 'Dobbs Ferry, New York'],
        [40.350, -74.660, '1781-08-29', 'Princeton'],
        [39.950, -75.160, '1781-09-02', 'Philadelphia'],
        [39.606, -75.833, '1781-09-06', 'Head of Elk'],
        [38.708, -77.086, '1781-09-09', 'Mount Vernon; Washington\'s first visit home in six years'],
        [37.270, -76.710, '1781-09-14', 'Williamsburg'],
        [37.2390, -76.5100, '1781-09-28', 'Siege of Yorktown begins'],
        [37.2390, -76.5100, '1781-10-19', 'Cornwallis surrenders']
      ]
    }
  ];

  const EVENTS = [
    { date: '1775-05-10', title: 'Second Continental Congress meets in Philadelphia' },
    { date: '1775-06-15', title: 'Congress names George Washington commander in chief' },
    { date: '1776-01-10', title: 'Thomas Paine publishes Common Sense' },
    { date: '1776-07-04', title: 'Congress adopts the Declaration of Independence' },
    { date: '1776-09-22', title: 'Nathan Hale hanged as a spy in New York' },
    { date: '1777-06-14', title: 'Congress adopts the Stars and Stripes' },
    { date: '1777-11-15', title: 'Congress approves the Articles of Confederation' },
    { date: '1778-02-06', title: 'France signs a treaty of alliance with the United States' },
    { date: '1778-02-23', title: 'Baron von Steuben arrives at Valley Forge' },
    { date: '1779-06-21', title: 'Spain declares war on Great Britain' },
    { date: '1779-09-23', title: 'John Paul Jones captures HMS Serapis' },
    { date: '1780-07-11', title: 'Rochambeau\'s French army lands at Newport' },
    { date: '1780-09-25', title: 'Benedict Arnold\'s plot to surrender West Point is discovered' },
    { date: '1781-03-01', title: 'Articles of Confederation take effect' },
    { date: '1781-09-05', title: 'French fleet defeats the British off the Virginia Capes' }
  ];

  const SOURCES = [
    { title: 'A Narrative of Some of the Adventures, Dangers and Sufferings of a Revolutionary Soldier', author: 'Joseph Plumb Martin', year: 1830, url: 'https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier' },
    { title: 'Adams Family Papers: letters of Abigail and John Adams; diary of John Adams', author: 'Massachusetts Historical Society', year: 1775, url: 'https://www.masshist.org/digitaladams/archive/' },
    { title: 'The Writings of George Washington (Ford edition)', author: 'Worthington C. Ford, ed.', year: 1889, url: 'https://archive.org/details/writingsgeorgew44washgoog' },
    { title: 'The Writings of George Washington (Sparks edition)', author: 'Jared Sparks, ed.', year: 1834, url: 'https://archive.org/details/writingsgeorgew00spargoog' },
    { title: 'Recollections and Private Memoirs of Washington', author: 'George Washington Parke Custis', year: 1859, url: 'https://archive.org/details/recollectionspri00cust' },
    { title: 'The Works of Alexander Hamilton', author: 'John C. Hamilton, ed.', year: 1850, url: 'https://archive.org/details/worksalexanderh35hamigoog' },
    { title: 'The Writings of Thomas Jefferson', author: 'H. A. Washington, ed.', year: 1854, url: 'https://archive.org/details/writingsthomasj05washgoog' },
    { title: 'The American Crisis', author: 'Thomas Paine', year: 1776, url: 'https://en.wikisource.org/wiki/The_American_Crisis' },
    { title: 'A Military Journal during the American Revolutionary War', author: 'James Thacher', year: 1823, url: 'https://archive.org/details/militaryjournal00thac' },
    { title: 'Letters and Journals Relating to the War of the American Revolution (trans. William L. Stone)', author: 'Frederika von Riedesel', year: 1867, url: 'https://archive.org/details/lettersjournalsr00ried' },
    { title: 'The British Invasion from the North: The Journal of Lieut. William Digby', author: 'William Digby', year: 1887, url: 'https://archive.org/details/britishinvasionf0000digb' },
    { title: 'A State of the Expedition from Canada', author: 'John Burgoyne', year: 1780, url: 'https://archive.org/details/bim_eighteenth-century_a-state-of-the-expeditio_burgoyne-john_1780' },
    { title: 'Diary of a British Officer in Boston in 1775, The Atlantic Monthly', author: 'John Barker', year: 1877, url: 'https://archive.org/details/sim_atlantic_1877-04_39_234' },
    { title: 'Letters of Hugh, Earl Percy, from Boston and New York, 1774–1776', author: 'Hugh, Earl Percy', year: 1902, url: 'https://archive.org/details/lettershughearl00boltgoog' },
    { title: 'A Narrative of Colonel Ethan Allen\'s Captivity', author: 'Ethan Allen', year: 1779, url: 'https://archive.org/details/cihm_42517' },
    { title: 'Diary of Surgeon Albigence Waldo, Pennsylvania Magazine of History and Biography', author: 'Albigence Waldo', year: 1897, url: 'https://archive.org/details/sim_pennsylvania-magazine-of-history-and-biography_1897_21_3' },
    { title: 'The Battle of Princeton, by Sergeant R—, Pennsylvania Magazine of History and Biography', author: 'A sergeant of the Continental Army', year: 1896, url: 'https://archive.org/details/sim_pennsylvania-magazine-of-history-and-biography_1896_20_4' },
    { title: 'The Journal of Isaac Senter', author: 'Isaac Senter', year: 1846, url: 'https://archive.org/details/journalofisaacse00sentuoft' },
    { title: 'Memoir of Col. Benjamin Tallmadge', author: 'Benjamin Tallmadge', year: 1858, url: 'https://archive.org/details/memoirofcolonelb027409mbp' },
    { title: 'Memoirs of the American Revolution', author: 'William Moultrie', year: 1802, url: 'https://archive.org/details/memoirsamerican00moulgoog' },
    { title: 'The Life of Nathanael Greene (prints Otho Williams\'s narrative of 1780)', author: 'William Gilmore Simms, ed.', year: 1861, url: 'https://archive.org/details/lifenathanael00simmrich' },
    { title: 'Memoir of Major Thomas Young, The Orion magazine', author: 'Thomas Young', year: 1843, url: 'https://archive.org/details/sim_orion-a-monthly-magazine-of-literature-and-art_1843-10_3_2' },
    { title: 'A History of New York, for Schools (prints Morgan\'s letter on Cowpens)', author: 'William Dunlap', year: 1837, url: 'https://archive.org/details/ahistorynewyork00dunlgoog' },
    { title: 'The American Rebellion: Sir Henry Clinton\'s Narrative of His Campaigns', author: 'Henry Clinton', year: 1954, url: 'https://archive.org/search?query=Clinton+American+Rebellion+narrative+campaigns' },
    { title: 'Correspondence of Charles, First Marquis Cornwallis', author: 'Charles Cornwallis', year: 1859, url: 'https://archive.org/details/correspondencec03rossgoog' },
    { title: 'Historical Memoirs of My Own Time', author: 'Nathaniel Wraxall', year: 1815, url: 'https://archive.org/details/historicalmemoi00wraxgoog' },
    { title: 'The History of the Rise, Progress, and Establishment of the Independence of the United States', author: 'William Gordon', year: 1788, url: 'https://archive.org/details/historyofrisepro02gord_0' },
    { title: 'The Life of Frederick William von Steuben', author: 'Friedrich Kapp', year: 1859, url: 'https://archive.org/details/lifeoffrederickw00kappuoft' }
  ];

  const TOURS = [
    {
      id: 'how-they-won', title: 'How Did the Underdogs Win?', grades: '5–8', minutes: 25,
      question: 'How did thirteen colonies with no army defeat the strongest military power in the world?',
      summary: 'Seven stops from Lexington to Yorktown. Students see that the Americans lost most of the big battles, and work out what kept the Revolution alive: survival, geography, and allies.',
      stops: [
        { title: 'The shot heard round the world', battle: 'lexington-concord', entry: 2,
          text: 'British soldiers march out of Boston to seize weapons. By nightfall they have been chased back by thousands of farmers and tradesmen.',
          ask: ['Lord Percy was a British general. What surprised him about the colonists?', 'Look at the British route on the map. Why was the march back so much more dangerous than the march out?'] },
        { title: 'A costly hill', battle: 'bunker-hill', entry: 2,
          text: 'The British win this battle. Read what their own commander wrote about it afterward.',
          ask: ['How can an army win a battle and still be worse off?', 'What did Bunker Hill prove to each side?'] },
        { title: 'Almost the end', battle: 'long-island', entry: 0,
          text: 'The British return with the biggest army they have ever sent overseas. Washington loses New York and nearly loses everything.',
          ask: ['Joseph Plumb Martin was fifteen. What does he notice that a general might not write about?', 'Follow Washington\'s route after this battle. What is his army doing for the next four months?'] },
        { title: 'Christmas night', battle: 'trenton', entry: 0,
          text: 'The army is down to a few thousand men, and most can go home on January 1. Washington gambles on one attack.',
          ask: ['Paine wrote these words a week before the battle. Who are "the summer soldier and the sunshine patriot"?', 'Trenton was a small fight. Why do historians say it saved the Revolution?'] },
        { title: 'The turning point', battle: 'saratoga', entry: 1,
          text: 'A British army marches south from Canada to cut the states in two. Watch its route on the map: it never reaches Albany.',
          ask: ['Trace Burgoyne\'s route. What problems would an army have marching through that country?', 'After Saratoga, France joined the war. Why would a victory make another country willing to help?'] },
        { title: 'The hard winter', battle: 'valley-forge', entry: 0,
          text: 'No battle is fought here. The enemy is hunger, cold, and disease.',
          ask: ['Why did soldiers like Dr. Waldo stay?', 'The army came out of Valley Forge stronger than it went in. How is that possible?'] },
        { title: 'The world turned upside down', battle: 'yorktown', entry: 0,
          text: 'A British army waits on the Virginia coast for ships to rescue it. A French fleet arrives instead, and two allied armies march 450 miles to close the trap.',
          ask: ['Look at the map. Why was Yorktown a dangerous place for Cornwallis to be?', 'Go back to the question: how did the underdogs win? Give three reasons with evidence from the tour.'] }
      ]
    },
    {
      id: 'voices', title: 'Voices of the Revolution', grades: '8–12', minutes: 30,
      question: 'Whose voices tell the story of the Revolution, and how does each one\'s position shape what they wrote?',
      summary: 'Six sources: a wife at home, a teenage private, a pamphleteer, a German baroness, an army surgeon, and a defeated general. Students practice sourcing and perspective.',
      stops: [
        { title: 'Watching from a hilltop', battle: 'bunker-hill', entry: 0,
          text: 'Abigail Adams wrote to her husband John, away at Congress, the day after the battle.',
          ask: ['What is Abigail Adams able to know on June 18, and what can she not yet know?', 'What does the letter show about how civilians experienced the war?'] },
        { title: 'A legend with no source', battle: 'bunker-hill', entry: 1,
          text: 'One of the most famous lines of the war cannot be traced to anyone who was there.',
          ask: ['How should a historian treat a quotation that appears only in later tradition?', 'Why do stories like this get repeated?'] },
        { title: 'A fifteen-year-old soldier', battle: 'long-island', entry: 0,
          text: 'Joseph Plumb Martin enlisted at fifteen and served to the end of the war. He published his story in 1830, at age seventy.',
          ask: ['Martin wrote more than fifty years after the events. What are the strengths and limits of his account?', 'Why are accounts by ordinary soldiers rarer than accounts by generals?'] },
        { title: 'Words as weapons', battle: 'trenton', entry: 0,
          text: 'Thomas Paine wrote The American Crisis while retreating with the army. Washington had it read aloud to the troops.',
          ask: ['What is Paine trying to make his readers do?', 'Is this a reliable source for what happened? What is it a reliable source for?'] },
        { title: 'In the cellar', battle: 'saratoga', entry: 0,
          text: 'Baroness von Riedesel traveled with her husband, a German general in Burgoyne\'s army, and their three young daughters.',
          ask: ['She was on the losing side and not a soldier. What does her account add that others leave out?', 'This text was written in German and translated. How might translation affect a source?'] },
        { title: 'The last act', battle: 'yorktown', entry: 1,
          text: 'Dr. James Thacher, an American surgeon, watched the British army march out to surrender.',
          ask: ['Compare Thacher\'s account with Cornwallis\'s letter, the first source in the full entry. How does each describe the same day?', 'Whose voices are missing from this tour? Where might historians look for them?'] }
      ]
    },
    {
      id: 'southern-war', title: 'The War Moves South', grades: '6–10', minutes: 25,
      question: 'Why did Britain\'s plan to win the war in the South end in surrender at Yorktown?',
      summary: 'A geography and strategy tour of 1780–81. Students follow Cornwallis\'s long route across the Carolinas and see how each victory left him weaker.',
      stops: [
        { title: 'A new plan', battle: 'charleston', entry: 0,
          text: 'After five years of stalemate in the North, the British sail south, where they expect Loyalists to join them.',
          ask: ['Why might the British have expected more support in the South?', 'What did the Americans lose at Charleston besides a city?'] },
        { title: 'Another army gone', battle: 'camden', entry: 1,
          text: 'Congress sends the hero of Saratoga to save the South. It goes badly.',
          ask: ['What is Hamilton\'s tone? Why might a young officer on Washington\'s staff write this way about Gates?', 'After Charleston and Camden, how would you describe the American position in the South?'] },
        { title: 'Over the mountains', campaign: 'overmountain', day: '1780-10-07',
          text: 'A British officer threatens the settlers west of the Blue Ridge. Follow their route across the mountains.',
          ask: ['Everyone at Kings Mountain but one man was American. What does that tell you about the war in the South?', 'Why would this battle discourage Loyalists from joining the British?'] },
        { title: 'Three fires', battle: 'cowpens', entry: 0,
          text: 'Daniel Morgan designs a battle plan around what his men can and cannot do.',
          ask: ['What did Morgan ask of the militia, and why not more?', 'How is this plan different from what happened at Camden?'] },
        { title: 'A victory he could not afford', campaign: 'southern-british', day: '1781-03-15',
          text: 'Watch Cornwallis\'s route: back and forth across two states, farther and farther from his supplies on the coast.',
          ask: ['Cornwallis won at Guilford Courthouse. Why did he then leave the Carolinas?', 'Greene said, "We fight, get beat, rise, and fight again." How can a general lose battles and win a campaign?'] },
        { title: 'The trap closes', campaign: 'washington-rochambeau', day: '1781-10-19',
          text: 'Cornwallis marches to the Virginia coast to meet the Royal Navy. Washington and the French have other plans.',
          ask: ['Three things had to arrive at Yorktown at the same time. What were they?', 'Answer the tour question: why did the southern strategy fail? Use the map as evidence.'] }
      ]
    }
  ];

  const VOCAB = [
    { term: 'Patriot', def: 'A colonist who supported independence from Great Britain; also called a Whig or a rebel.' },
    { term: 'Loyalist', def: 'A colonist who stayed loyal to the king; also called a Tory. Perhaps one in five colonists was a Loyalist.' },
    { term: 'Militia', def: 'Part-time citizen soldiers who served near home for short periods, usually with little training.' },
    { term: 'Continental Army', def: 'The full-time army created by Congress in 1775 and commanded by George Washington. Its soldiers were called Continentals.' },
    { term: 'Regulars', def: 'Professional, full-time soldiers. British regulars were called Redcoats for their uniforms.' },
    { term: 'Hessians', def: 'German soldiers hired out to Britain by their princes. About 30,000 served in America, many from the state of Hesse-Cassel.' },
    { term: 'Enlistment', def: 'The fixed period a soldier agreed to serve. Short enlistments meant Washington\'s army kept melting away.' },
    { term: 'Alliance', def: 'A formal agreement between nations to help one another. France allied with the United States in 1778.' },
    { term: 'Siege', def: 'Surrounding a town or fort and cutting off its supplies until it surrenders.' },
    { term: 'Flank', def: 'The side of an army\'s line. To "turn a flank" is to get around the end and attack from the side or rear.' },
    { term: 'Casualties', def: 'Soldiers lost to an army: killed, wounded, captured, or missing. It does not mean only deaths.' },
    { term: 'Primary source', def: 'Evidence created by someone who took part in or witnessed an event, such as a letter, diary, or official report.' }
  ];

  const ADVISORY = [
    'The Saratoga entry includes an eyewitness description of a battlefield amputation, and the Quebec entry describes starving soldiers eating a dog.',
    'Quotations keep their original spelling and punctuation, which can look like errors to students. This is a good opening to discuss eighteenth-century writing.',
    'There are no photographs of this war. Most paintings were made years or decades later, and several, including Washington Crossing the Delaware, contain known inaccuracies noted in their captions.',
    'Several famous lines, such as "the whites of their eyes," were first written down long after the event. Their entries say so, and the Voices tour uses one as a lesson in evaluating sources.',
    'This atlas follows the main armies. The war also involved enslaved and free Black Americans on both sides, Native nations, and a brutal civil war between neighbors in the South, which the battle entries touch on but do not cover fully.'
  ];

  const NOTES = {
    quotes: 'Some of the best-known lines of the Revolution were recalled or reported years later. Those entries name who reported them and when. Checking against the earliest printed texts changed a few familiar wordings: Thomas Paine wrote "he that stands it now," not "stands by it," and General Howe\'s remark on Dorchester Heights first appeared in 1788 as "in months," not "in a month."',
    numbers: 'Casualty figures combine killed, wounded, captured, and missing. Eighteenth-century returns were incomplete, especially for militia, so the figures here are commonly cited estimates from the National Park Service and standard references, rounded. British figures include German and Loyalist troops; American figures at Yorktown include French losses.',
    images: 'No photographs of the war exist. John Trumbull served as an officer early in the war and painted his history series from 1786 onward, sketching many participants from life. Amos Doolittle\'s engravings of Lexington and Concord were made in 1775 after he visited the sites and questioned witnesses. Works by Leutze, Chappel, Pyle, and others were painted 70 to 130 years later.'
  };

  // 3D objects: museum scans and a few labeled modern models. See README, "3D objects".
  const OBJECTS = [
    {
      "src": "sketchfab",
      "ref": "d0e294bbd8d44bbbb77f1cd0d444b370",
      "thumb": "https://media.sketchfab.com/models/d0e294bbd8d44bbbb77f1cd0d444b370/thumbnails/04cb94a170244f7d900807ff086564ae/ecb90631f4ad48c6a74839e19fdc1e7a.jpeg",
      "link": "https://sketchfab.com/3d-models/powder-horn-1775-d0e294bbd8d44bbbb77f1cd0d444b370",
      "license": "CC BY 4.0",
      "by": "Boston College Digital Scholarship",
      "id": "powder-horn",
      "group": "soldiers",
      "kind": "artifact",
      "title": "Powder horn of Ephraim Moors",
      "date": "1775",
      "holder": "Massachusetts Historical Society. Scanned by Boston College Digital Scholarship",
      "maker": "Attributed to Jacob Gay, carver",
      "text": "A carved ox or cow horn that kept a soldier's gunpowder dry, made in Boston in 1775, the first year of the war. It belonged to a man named Ephraim Moors, and the carving is attributed to Jacob Gay. Soldiers often had their horns engraved with their names, pictures, and verses.",
      "look": [
        "Turn the horn and read what is carved on it. What did its owner want remembered?",
        "Why would a soldier pay to have a piece of everyday equipment decorated?"
      ]
    },
    {
      "src": "sketchfab",
      "ref": "534ede346b2d46c18804260e0799631a",
      "thumb": "https://media.sketchfab.com/models/534ede346b2d46c18804260e0799631a/thumbnails/765471641adf488a9051b83b4b2c77fc/32248486907c4198bf94dfe5db8c96b0.jpeg",
      "link": "https://sketchfab.com/3d-models/flintlock-musket-no-hands-534ede346b2d46c18804260e0799631a",
      "license": "CC BY 4.0",
      "by": "Andy Woodhead",
      "id": "flintlock-musket",
      "group": "weapons",
      "kind": "model",
      "title": "Flintlock musket",
      "date": "Modern model",
      "holder": "Digital sculpture by Andy Woodhead",
      "text": "A digital model of a flintlock musket of the kind infantry on both sides carried. A trained soldier could fire about three shots a minute, and the smooth barrel was accurate only to about eighty yards. That is why armies stood in close lines and fired together, and why the bayonet decided so many fights. This is a modern artist's reconstruction, not a museum object. Treat it the way you would an illustration in a textbook.",
      "look": [
        "Find the flint, the pan, and the ramrod. Work out the steps needed to load and fire one shot.",
        "How does this weapon explain the way Morgan placed his men at Cowpens?"
      ],
      "battle": "cowpens"
    },
    {
      "src": "sketchfab",
      "ref": "2662865f331146c59129cd7901fa8db1",
      "thumb": "https://media.sketchfab.com/models/2662865f331146c59129cd7901fa8db1/thumbnails/fdeac39d501b489aa8ba3e8e291aac6b/f01a313bc8cb45f29910a7a38ee10969.jpeg",
      "link": "https://sketchfab.com/3d-models/12-pound-cannon-2662865f331146c59129cd7901fa8db1",
      "license": "CC BY 4.0",
      "by": "iedalton",
      "id": "field-gun",
      "group": "weapons",
      "kind": "model",
      "title": "Field gun on its carriage",
      "date": "Modern model",
      "holder": "Digital model by iedalton",
      "text": "A digital model of a smoothbore field gun of the Revolutionary era on its wooden carriage. Guns like this fired solid iron shot, or grapeshot at close range, and had to be dragged over bad roads by horses or oxen. This is a modern artist's reconstruction, not a museum object. Treat it the way you would an illustration in a textbook.",
      "look": [
        "Henry Knox hauled about sixty guns 300 miles from Fort Ticonderoga to Boston in the winter of 1775–76. Looking at this model, what made that so hard?",
        "Why would an army with cannon want to hold the high ground?"
      ]
    },
    {
      "src": "si",
      "ref": "3d_package:ff28cb3a-ad00-43b3-a928-fa61ab0a288f",
      "orientation": "-26.60deg 49.98deg 133.95deg",
      "glb": "https://3d-api.si.edu/content/document/3d_package:ff28cb3a-ad00-43b3-a928-fa61ab0a288f/npg-npg_78_1-HiRes_Unwrapped-150k-2048-medium.glb",
      "glbHi": "https://3d-api.si.edu/content/document/3d_package:ff28cb3a-ad00-43b3-a928-fa61ab0a288f/npg-npg_78_1-HiRes_Unwrapped-150k-4096-high.glb",
      "thumb": "https://3d-api.si.edu/content/document/3d_package:ff28cb3a-ad00-43b3-a928-fa61ab0a288f/scene-image-low.jpg",
      "kind": "artifact",
      "license": "CC0",
      "id": "washington-houdon",
      "group": "leaders",
      "title": "George Washington",
      "date": "About 1786",
      "holder": "National Portrait Gallery",
      "maker": "Jean-Antoine Houdon, sculptor",
      "link": "https://npg.si.edu/object/npg_NPG.78.1",
      "text": "In 1785 the French sculptor Jean-Antoine Houdon crossed the Atlantic, spent two weeks at Mount Vernon, and made a mask of Washington's face from life. This bust is based on that mask, which makes it one of the most reliable records of what Washington actually looked like, two years after the war ended.",
      "look": [
        "Compare this face with the portrait on a dollar bill. Which do you trust more, and why?",
        "Houdon showed Washington without a uniform or a wig. What does that choice say about how he was to be remembered?"
      ]
    }
  ];

  Atlas.register({
    meta: {
      id: 'american-revolution',
      title: 'The American Revolution',
      years: '1775–1781',
      range: { start: '1775-04-01', end: '1781-11-30' },
      bounds: [[31.8, -84.5], [47.2, -68.8]],
      sides: [
        { id: 'american', name: 'American', color: '#2b5797' },
        { id: 'british', name: 'British', color: '#b0382e' }
      ],
      theaters: ['New England', 'Northern', 'Middle States', 'Southern'],
      intro: 'Army routes draw themselves as the armies marched, by land and by sea, and a marker appears for each battle as it begins.'
    },
    PORTRAITS, BATTLES, CAMPAIGNS, EVENTS, SOURCES, TOURS, VOCAB, ADVISORY, NOTES, OBJECTS
  });
})();
