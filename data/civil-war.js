/* ------------------------------------------------------------------
   Campaign Atlas — data pack: The American Civil War, 1861–1865
   Quotations are from public-domain primary sources (memoirs, diaries,
   letters, official reports). Images are public-domain works hosted on
   Wikimedia Commons / Library of Congress.
   A journal entry gains `verified: true` once its wording has been
   checked against the printed source.
   ------------------------------------------------------------------ */

(function () {
  const img = Atlas.img;

  // Portraits used for journal entries
  const PORTRAITS = {
    grant: img('Ulysses S. Grant 1870-1880.jpg', 'Ulysses S. Grant', 'Brady-Handy collection, Library of Congress'),
    lee: img('Robert Edward Lee.jpg', 'Robert E. Lee', 'Julian Vannerson, 1864, Library of Congress'),
    sherman: img('William-Tecumseh-Sherman.jpg', 'William T. Sherman', 'Mathew Brady, c. 1864'),
    jackson: img('Stonewall Jackson by Routzahn, 1862.png', 'Thomas J. "Stonewall" Jackson', 'Nathaniel Routzahn, 1862'),
    lincoln: img('Abraham Lincoln O-77 matte collodion print.jpg', 'Abraham Lincoln', 'Alexander Gardner, 1863'),
    chesnut: img('Mary Boykin Miller Chesnut.jpg', 'Mary Boykin Chesnut', 'Public domain'),
    watkins: img('Sam Watkins.jpg', 'Sam Watkins, 1st Tennessee', 'Public domain'),
    douglass: img('Lewis Henry Douglass.jpg', 'Sgt. Maj. Lewis H. Douglass, 54th Massachusetts', 'Public domain'),
    chamberlain: img('Joshua Chamberlain - Brady-Handy.jpg', 'Joshua L. Chamberlain', 'Brady-Handy collection, Library of Congress'),
    rhodes: img('Elisha Hunt Rhodes.jpg', 'Elisha Hunt Rhodes, 2nd Rhode Island', 'Public domain'),
    ballou: img('Sullivan Ballou.jpg', 'Maj. Sullivan Ballou, 2nd Rhode Island', 'Public domain'),
    hood: img('John Bell Hood.jpg', 'John Bell Hood', 'Public domain'),
    thomas: img('George Henry Thomas - Brady-Handy.jpg', 'George H. Thomas', 'Brady-Handy collection, Library of Congress'),
    mcclellan: img('George B McClellan - retouched.jpg', 'George B. McClellan', 'Mathew Brady, c. 1861'),
    bragg: img('Braxton Bragg.jpg', 'Braxton Bragg', 'Public domain'),
    farragut: img('Admiral Farragut2.jpg', 'David G. Farragut', 'Public domain'),
    sheridan: img('Philip Sheridan - Brady-Handy.jpg', 'Philip H. Sheridan', 'Brady-Handy collection, Library of Congress'),
    early: img('Jubal Early.jpg', 'Jubal A. Early', 'Public domain'),
    forrest: img('Nathan Bedford Forrest, General (Confederate).jpg', 'Nathan Bedford Forrest', 'Public domain'),
    wallace: img('Lew Wallace - Brady-Handy.jpg', 'Lew Wallace', 'Brady-Handy collection, Library of Congress'),
    holmes: img('Major Oliver Wendell Holmes, Jr., of Co. A and Co. G, 20th Massachusetts Infantry Regiment in uniform with sword) - Silsbee, Case & Co., photograph artists, 299-1-2 Washington St., Boston LCCN2016650153.jpg', 'Oliver Wendell Holmes Jr., 20th Massachusetts', 'Silsbee, Case & Co., Library of Congress'),
    lyon: img('Nathaniel Lyon (General).jpg', 'Nathaniel Lyon', 'Public domain'),
    banks: img('Nathaniel P. Banks, General.jpg', 'Nathaniel P. Banks', 'Public domain'),
    jjohnston: img('Joseph E. Johnston, General (Confederate).jpg', 'Joseph E. Johnston', 'Public domain'),
    stuart: img('J.E.B. Stuart.jpg', 'J.E.B. Stuart', 'Public domain')
  };

  const BATTLES = [
    {
      id: 'fort-sumter',
      name: 'Fort Sumter',
      start: '1861-04-12', end: '1861-04-13',
      lat: 32.752, lng: -79.875,
      place: 'Charleston Harbor, South Carolina',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Maj. Robert Anderson', confederate: 'Brig. Gen. P.G.T. Beauregard' },
      forces: { union: '85 soldiers', confederate: 'about 500 artillerymen' },
      casualties: { union: 0, confederate: 0, note: 'No one was killed in the bombardment. Two Union soldiers died in an accident during the surrender salute.' },
      summary: 'Before dawn on April 12, 1861, Confederate batteries ringing Charleston Harbor opened fire on the Federal garrison inside Fort Sumter. After thirty-four hours of bombardment, with the fort\'s barracks burning and ammunition nearly gone, Major Robert Anderson agreed to evacuate. The attack united the North behind Lincoln\'s call for 75,000 volunteers and pushed four more states into the Confederacy.',
      significance: 'The first shots of the war. No battle deaths, but it turned a secession crisis into a shooting war.',
      images: [
        img('Bombardment of Fort Sumter(3b52027r).jpg', 'Bombardment of Fort Sumter, Charleston Harbor, April 12–13, 1861.', 'Currier & Ives lithograph, 1861. Library of Congress.'),
        img('Fort sumter 1861.jpg', 'The Confederate flag flying over Fort Sumter after its evacuation, April 1861.', 'Photograph, 1861. Public domain.')
      ],
      journal: [
        {
          quote: 'I do not pretend to go to sleep. How can I? If Anderson does not accept terms at four, the orders are he shall be fired upon. I count four, St. Michael\'s bells chime out, and I begin to hope. At half-past four the heavy booming of a cannon. I sprang out of bed, and on my knees prostrate I prayed as I never prayed before.',
          who: 'Mary Boykin Chesnut', role: 'Diarist, wife of a Confederate aide in Charleston', side: 'confederate',
          date: 'April 12, 1861', source: 'A Diary from Dixie (1905)', portrait: 'chesnut', verified: true, ref: 'https://docsouth.unc.edu/southlit/chesnut/maryches.html', refTitle: 'A Diary from Dixie, Documenting the American South'
        },
        {
          quote: 'Having defended Fort Sumter for thirty-four hours, until the quarters were entirely burned, the main gates destroyed by fire, the gorge walls seriously injured, the magazine surrounded by flames, and its door closed from the effects of heat … I accepted terms of evacuation offered by General Beauregard.',
          who: 'Maj. Robert Anderson', role: 'Commander of the Fort Sumter garrison', side: 'union',
          date: 'April 18, 1861', source: 'Dispatch to the Secretary of War, Official Records', verified: true, ref: 'https://archive.org/details/warofrebellionco0050vari?q=%22Having%20defended%20Fort%20Sumter%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'first-bull-run',
      name: 'First Bull Run (First Manassas)',
      start: '1861-07-21', end: '1861-07-21',
      lat: 38.813, lng: -77.522,
      place: 'Prince William County, Virginia',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Brig. Gen. Irvin McDowell', confederate: 'Brig. Gen. P.G.T. Beauregard, Brig. Gen. Joseph E. Johnston' },
      forces: { union: 'about 35,000', confederate: 'about 32,000' },
      casualties: { union: 2900, confederate: 2000 },
      summary: 'The first major land battle of the war. McDowell\'s green Union army marched out of Washington expecting a quick victory and a road to Richmond. A flanking attack nearly broke the Confederate line until Thomas Jackson\'s Virginia brigade held Henry House Hill, earning him the nickname "Stonewall." Confederate reinforcements arriving by rail turned the tide, and the Union retreat collapsed into a panicked rush back to Washington.',
      significance: 'Shattered the illusion on both sides that the war would be short.',
      images: [
        img('First Battle of Bull Run Kurz & Allison.jpg', 'First Battle of Bull Run, July 21, 1861.', 'Kurz & Allison chromolithograph, 1889. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Sarah, my love for you is deathless, it seems to bind me to you with mighty cables that nothing but Omnipotence could break … But, O Sarah! if the dead can come back to this earth and flit unseen around those they loved, I shall always be near you.',
          who: 'Maj. Sullivan Ballou', role: '2nd Rhode Island Infantry; killed a week later at Bull Run', side: 'union',
          date: 'July 14, 1861', source: 'Letter to his wife Sarah, written at Camp Clark, Washington', portrait: 'ballou', verified: true, ref: 'https://en.wikisource.org/wiki/Letter_from_Captain_Sullivan_Ballou_to_His_Wife_Sarah', refTitle: 'Letter from Captain Sullivan Ballou to His Wife Sarah (Wikisource transcription)'
        },
        {
          quote: 'There is Jackson standing like a stone wall! Rally behind the Virginians!',
          who: 'Brig. Gen. Barnard Bee', role: 'Confederate brigade commander, mortally wounded minutes later', side: 'confederate',
          date: 'July 21, 1861', source: 'As reported by witnesses on Henry House Hill; the origin of Jackson\'s nickname', verified: true, ref: 'https://archive.org/details/inaugurationofja01virg?q=%22There%20is%20Jackson%20standing%22', refTitle: 'Inauguration of the Jackson Statue, Richmond (1875)'
        }
      ]
    },
    {
      id: 'fort-donelson',
      name: 'Fort Donelson',
      start: '1862-02-11', end: '1862-02-16',
      lat: 36.483, lng: -87.862,
      place: 'Dover, Tennessee, on the Cumberland River',
      theater: 'Western',
      result: 'union',
      campaign: 'henry-donelson',
      commanders: { union: 'Brig. Gen. Ulysses S. Grant, Flag Officer Andrew Foote', confederate: 'Brig. Gen. John B. Floyd, Brig. Gen. Gideon Pillow, Brig. Gen. Simon B. Buckner' },
      forces: { union: 'about 24,500', confederate: 'about 16,000' },
      casualties: { union: 2700, confederate: 13800, note: 'Confederate figure includes roughly 12,000 men surrendered.' },
      summary: 'Ten days after taking Fort Henry on the Tennessee River, Grant marched overland and invested Fort Donelson on the Cumberland. A Confederate breakout attack on February 15 briefly opened an escape road, but the attackers were ordered back into their trenches. Floyd and Pillow fled by boat, leaving Buckner to ask for terms. Grant\'s reply made him famous.',
      significance: 'Opened Tennessee to Union invasion and gave the North its first major victory and the nickname "Unconditional Surrender" Grant.',
      images: [
        img('Battle of Fort Donelson.png', 'Battle of Fort Donelson, February 1862.', 'Kurz & Allison chromolithograph, 1887. Library of Congress.')
      ],
      journal: [
        {
          quote: 'No terms except an unconditional and immediate surrender can be accepted. I propose to move immediately upon your works.',
          who: 'Brig. Gen. Ulysses S. Grant', role: 'Commander, Union forces', side: 'union',
          date: 'February 16, 1862', source: 'Note to Gen. Buckner, Official Records', portrait: 'grant', verified: true, ref: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_XXII', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        },
        {
          quote: 'The distribution of the forces under my command, incident to an unexpected change of commanders, and the overwhelming force under your command, compel me, notwithstanding the brilliant success of the Confederate arms yesterday, to accept the ungenerous and unchivalrous terms which you propose.',
          who: 'Brig. Gen. Simon Bolivar Buckner', role: 'Confederate commander at the surrender', side: 'confederate',
          date: 'February 16, 1862', source: 'Reply to Gen. Grant, Official Records', verified: true, ref: 'https://archive.org/details/warofrebellion07unit?q=%22The%20distribution%20of%20the%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'shiloh',
      name: 'Shiloh (Pittsburg Landing)',
      start: '1862-04-06', end: '1862-04-07',
      lat: 35.138, lng: -88.339,
      place: 'Hardin County, Tennessee',
      theater: 'Western',
      result: 'union',
      campaign: 'henry-donelson',
      commanders: { union: 'Maj. Gen. Ulysses S. Grant, Maj. Gen. Don Carlos Buell', confederate: 'Gen. Albert Sidney Johnston (killed), Gen. P.G.T. Beauregard' },
      forces: { union: 'about 65,000 (both days)', confederate: 'about 45,000' },
      casualties: { union: 13047, confederate: 10699 },
      summary: 'Johnston\'s Confederate army surprised Grant\'s encamped divisions near Shiloh Church on the morning of April 6 and drove them back toward the Tennessee River. Johnston bled to death from a leg wound that afternoon. Union troops held a final line at Pittsburg Landing, and with Buell\'s reinforcements arriving overnight, Grant counterattacked on April 7 and forced the Confederates back to Corinth.',
      significance: 'More Americans fell at Shiloh than in all previous American wars combined. It ended hopes of a short war.',
      images: [
        img('Battle of Shiloh Thulstrup.jpg', 'Battle of Shiloh, April 6–7, 1862.', 'Thure de Thulstrup, L. Prang & Co., 1888. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I had heard and read of battlefields, seen pictures of battlefields, of horses and men, of cannon and wagons, all jumbled together, while the ground was strewn with dead and dying and wounded, but I must confess that I never realized the "pomp and circumstance" of the thing called glorious war until I saw this.',
          who: 'Pvt. Sam Watkins', role: 'Company H, 1st Tennessee Infantry', side: 'confederate',
          date: 'April 1862', source: 'Co. Aytch (1882)', portrait: 'watkins', verified: true, ref: 'https://archive.org/details/bub_gb_ssIdAQAAMAAJ?q=%22had%20heard%20and%20read%22', refTitle: 'Sam R. Watkins, "Co. Aytch" (1882)'
        },
        {
          quote: 'I saw an open field, in our possession on the second day, over which the Confederates had made repeated charges the day before, so covered with dead that it would have been possible to walk across the clearing, in any direction, stepping on dead bodies, without a foot touching the ground.',
          who: 'Maj. Gen. Ulysses S. Grant', role: 'Commander, Army of the Tennessee', side: 'union',
          date: 'April 7, 1862 (recalled)', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_XXV', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        },
        {
          quote: 'Up to the battle of Shiloh I, as well as thousands of other citizens, believed that the rebellion against the Government would collapse suddenly and soon … but when Confederate armies were collected which not only attempted to hold a line farther south … but assumed the offensive and made such a gallant effort to regain what had been lost, then, indeed, I gave up all idea of saving the Union except by complete conquest.',
          who: 'Maj. Gen. Ulysses S. Grant', role: 'Commander, Army of the Tennessee', side: 'union',
          date: 'Recalled, 1885', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_XXV', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        }
      ]
    },
    {
      id: 'seven-days',
      name: 'Seven Days Battles (Malvern Hill)',
      start: '1862-06-25', end: '1862-07-01',
      lat: 37.414, lng: -77.251,
      place: 'Henrico County, Virginia, east of Richmond',
      theater: 'Eastern',
      result: 'confederate',
      campaign: 'peninsula',
      commanders: { union: 'Maj. Gen. George B. McClellan', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 104,000', confederate: 'about 92,000' },
      casualties: { union: 15855, confederate: 20204 },
      summary: 'With McClellan\'s huge Army of the Potomac within sight of Richmond\'s church spires, Robert E. Lee, newly in command, launched a week of attacks that drove it back down the Peninsula. The fighting ended at Malvern Hill on July 1, where Confederate infantry charged uphill into massed Union artillery and was slaughtered. Despite winning that final fight, McClellan retreated to Harrison\'s Landing and the campaign to take Richmond was over.',
      significance: 'Saved the Confederate capital and made Lee the South\'s leading general.',
      images: [
        img('Battle of Malvern Hill.png', 'Battle of Malvern Hill, July 1, 1862.', 'Kurz & Allison chromolithograph, 1887. Library of Congress.'),
        img('George B McClellan - retouched.jpg', 'Maj. Gen. George B. McClellan, commander of the Army of the Potomac.', 'Mathew Brady, c. 1861. Library of Congress.')
      ],
      journal: [
        {
          quote: 'It was not war—it was murder.',
          who: 'Maj. Gen. Daniel Harvey Hill', role: 'Confederate division commander, on the assault at Malvern Hill', side: 'confederate',
          date: 'July 1, 1862 (recalled)', source: 'Battles and Leaders of the Civil War, vol. 2 (1887)', verified: true, ref: 'https://archive.org/details/bwb_Y0-BNJ-154?q=%22It%20was%20not%20war%E2%80%94it%22', refTitle: 'Battles and Leaders of the Civil War (1884–1888)'
        },
        {
          quote: 'If I save this army now, I tell you plainly that I owe no thanks to you or to any other persons in Washington. You have done your best to sacrifice this army.',
          who: 'Maj. Gen. George B. McClellan', role: 'Commander, Army of the Potomac', side: 'union',
          date: 'June 28, 1862', source: 'Telegram to Secretary of War Stanton after Gaines\' Mill, Official Records', portrait: 'mcclellan', verified: true, ref: 'https://en.wikisource.org/wiki/History_of_the_Civil_War%2C_1861-1865/Chapter_3', refTitle: 'James Ford Rhodes, History of the Civil War, 1861–1865, quoting the telegram (Wikisource transcription)'
        }
      ]
    },
    {
      id: 'second-bull-run',
      name: 'Second Bull Run (Second Manassas)',
      start: '1862-08-28', end: '1862-08-30',
      lat: 38.825, lng: -77.545,
      place: 'Prince William County, Virginia',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Maj. Gen. John Pope', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 62,000', confederate: 'about 50,000' },
      casualties: { union: 14000, confederate: 8300 },
      summary: 'Jackson\'s corps marched around Pope\'s army, burned its supply depot at Manassas Junction, and dug in along an unfinished railroad cut. Pope attacked Jackson for two days, convinced he had him trapped. On August 30 Longstreet\'s corps, which had arrived unseen, struck Pope\'s exposed left flank with 25,000 men, the largest mass assault of the war, and swept the Union army from the field.',
      significance: 'Cleared Virginia of Union armies and opened the way for Lee\'s first invasion of the North.',
      images: [
        img('Battle of Bull Run.jpg', 'Battle scene on the Manassas plains.', 'Kurz & Allison chromolithograph. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I have come to you from the West, where we have always seen the backs of our enemies; from an army whose business it has been to seek the adversary and to beat him when he was found.',
          who: 'Maj. Gen. John Pope', role: 'Commander, Army of Virginia', side: 'union',
          date: 'July 14, 1862', source: 'Address to the officers and soldiers of the Army of Virginia, Official Records', verified: true, ref: 'https://en.wikisource.org/wiki/The_Reminiscences_of_Carl_Schurz/Volume_Two/7_War', refTitle: 'The Reminiscences of Carl Schurz, quoting the address (Wikisource transcription)'
        },
        {
          quote: 'This army achieved to-day, on the plains of Manassas, a signal victory over the combined forces of Generals McClellan and Pope.',
          who: 'Gen. Robert E. Lee', role: 'Commander, Army of Northern Virginia', side: 'confederate',
          date: 'August 30, 1862', source: 'Dispatch to President Jefferson Davis, as printed in the Asheville News, September 4, 1862', portrait: 'lee', verified: true, ref: 'https://archive.org/details/per_asheville-news_asheville-news_1862-09-04_14_111?q=%22on%20the%20plains%20of%22', refTitle: 'Asheville News, September 4, 1862'
        }
      ]
    },
    {
      id: 'antietam',
      name: 'Antietam (Sharpsburg)',
      start: '1862-09-17', end: '1862-09-17',
      lat: 39.473, lng: -77.744,
      place: 'Sharpsburg, Maryland',
      theater: 'Eastern',
      result: 'inconclusive',
      campaign: 'maryland',
      commanders: { union: 'Maj. Gen. George B. McClellan', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 87,000 (56,000 engaged)', confederate: 'about 38,000' },
      casualties: { union: 12400, confederate: 10300, note: 'About 3,650 killed. The bloodiest single day in American history.' },
      summary: 'Lee crossed the Potomac into Maryland hoping to win a victory on Northern soil. McClellan, handed a lost copy of Lee\'s orders, attacked at Antietam Creek. Fighting raged from dawn in the Cornfield and the West Woods, through the Sunken Road at midday, to Burnside\'s Bridge in the afternoon. Lee\'s line bent but held. He withdrew to Virginia two nights later, and McClellan did not pursue.',
      significance: 'Tactically a draw, strategically a Union victory. It gave Lincoln the opening to issue the preliminary Emancipation Proclamation five days later.',
      images: [
        img('Battle of Antietam.png', 'Battle of Antietam, September 17, 1862.', 'Kurz & Allison chromolithograph, 1888. Library of Congress.'),
        img('Antietam, Md. Confederate dead by a fence on the Hagerstown road LOC cwpb.01097.jpg', 'Confederate dead by a fence on the Hagerstown Road, photographed two days after the battle. Gardner\'s photographs, shown in New York that October, were the first to bring battlefield death before the public.', 'Alexander Gardner, September 1862. Library of Congress.')
      ],
      journal: [
        {
          quote: 'In the time I am writing every stalk of corn in the northern and greater part of the field was cut as closely as could have been done with a knife, and the slain lay in rows precisely as they had stood in their ranks a few moments before.',
          who: 'Maj. Gen. Joseph Hooker', role: 'Commander, Union I Corps, on the Cornfield', side: 'union',
          date: 'September 17, 1862', source: 'Official report, Official Records', verified: true, ref: 'https://archive.org/details/warrebellionaco32offigoog?q=%22am%20writing%20every%20stalk%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'The mental strain was so great that I saw at that moment the singular effect mentioned, I think, in the life of Goethe on a similar occasion—the whole landscape for an instant turned slightly red.',
          who: 'Pvt. David L. Thompson', role: 'Company G, 9th New York Volunteers', side: 'union',
          date: 'September 17, 1862 (recalled)', source: 'Battles and Leaders of the Civil War, vol. 2 (1887)', verified: true, ref: 'https://archive.org/details/bwb_Y0-BNJ-154?q=%22The%20mental%20strain%20was%22', refTitle: 'Battles and Leaders of the Civil War, vol. 2'
        },
        {
          quote: 'Mr. Brady has done something to bring home to us the terrible reality and earnestness of war. If he has not brought bodies and laid them in our dooryards and along the streets, he has done something very like it.',
          who: 'New York Times', role: 'Review of the exhibition "The Dead of Antietam"', side: 'civilian',
          date: 'October 20, 1862', source: 'New York Times', verified: true, ref: 'https://archive.org/details/ERIC_ED370593?q=%22Mr%20Brady%20has%20done%22', refTitle: 'Civil War Photography and Its Impact (1993), quoting the review'
        }
      ]
    },
    {
      id: 'fredericksburg',
      name: 'Fredericksburg',
      start: '1862-12-11', end: '1862-12-15',
      lat: 38.296, lng: -77.470,
      place: 'Fredericksburg, Virginia',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Maj. Gen. Ambrose Burnside', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 114,000', confederate: 'about 72,500' },
      casualties: { union: 12650, confederate: 5380 },
      summary: 'Burnside, who had replaced McClellan, crossed the Rappahannock on pontoon bridges under fire and sent wave after wave of infantry against Longstreet\'s corps on Marye\'s Heights, where Confederates stood four deep behind a stone wall. Fourteen assaults failed. No Union soldier reached the wall. Thousands of wounded lay on the frozen slope through the night.',
      significance: 'One of the most lopsided Union defeats of the war; it shook Northern morale and cost Burnside his command.',
      images: [
        img('Battle of Fredericksburg, Dec 13, 1862.png', 'Battle of Fredericksburg, December 13, 1862.', 'Kurz & Allison chromolithograph, 1888. Library of Congress.')
      ],
      journal: [
        {
          quote: 'It is well this is so terrible; we would grow too fond of it!',
          who: 'Gen. Robert E. Lee', role: 'Commander, Army of Northern Virginia, watching from Lee\'s Hill', side: 'confederate',
          date: 'December 13, 1862', source: 'As recorded by John Esten Cooke, a Confederate staff officer, in Hammer and Rapier (1870). Later writers reworded it as "It is well that war is so terrible."', portrait: 'lee', verified: true, ref: 'https://archive.org/details/hammerrapier00cook?q=%22It%20is%20well%20this%22', refTitle: 'John Esten Cooke, Hammer and Rapier (1870)'
        },
        {
          quote: 'As they charged the artillery fire would break their formation and they would get mixed; then they would close up, go forward, receive the withering infantry fire, and those who were able would run to the houses and fight as best they could; and then the next brigade coming up in succession would do its duty and melt like snow coming down on warm ground.',
          who: 'Maj. Gen. Darius N. Couch', role: 'Commander, Union II Corps, watching from the courthouse steeple', side: 'union',
          date: 'December 13, 1862 (recalled)', source: 'Battles and Leaders of the Civil War, vol. 3 (1888)', verified: true, ref: 'https://archive.org/details/bwb_Y0-BNJ-150_3?q=%22As%20they%20charged%20the%22', refTitle: 'Battles and Leaders of the Civil War (1884–1888)'
        }
      ]
    },
    {
      id: 'stones-river',
      name: 'Stones River (Murfreesboro)',
      start: '1862-12-31', end: '1863-01-02',
      lat: 35.878, lng: -86.432,
      place: 'Murfreesboro, Tennessee',
      theater: 'Western',
      result: 'union',
      campaign: 'kentucky',
      commanders: { union: 'Maj. Gen. William S. Rosecrans', confederate: 'Gen. Braxton Bragg' },
      forces: { union: 'about 41,400', confederate: 'about 35,000' },
      casualties: { union: 13000, confederate: 10000, note: 'By percentage of troops engaged, the bloodiest major battle of the war.' },
      summary: 'On New Year\'s Eve Bragg struck first, folding back the Union right wing until Rosecrans\' line was bent into a tight V along the Nashville Pike. A Union stand in the Round Forest held. After a quiet New Year\'s Day, Bragg attacked across the river on January 2 and was shredded by 57 massed Union guns. He retreated south, and Rosecrans held the field.',
      significance: 'A badly needed Union victory after Fredericksburg, coming the same week the Emancipation Proclamation took effect.',
      images: [
        img('Battle of Stone River, Near Murfreesborough, Tenn.-Dec. 31, 62. Jan. 2-3, 1863-Union (Gen. Rosecrans) ... Conf. (Gen. Bragg) ... LCCN91482049.jpg', 'Battle of Stone River, near Murfreesboro, Tennessee.', 'Kurz & Allison chromolithograph, 1891. Library of Congress.')
      ],
      journal: [
        {
          quote: 'The enemy has yielded his strong position and is falling back. We occupy whole field and shall follow him … God has granted us a happy New Year.',
          who: 'Gen. Braxton Bragg', role: 'Commander, Army of Tennessee, after the first day', side: 'confederate',
          date: 'December 31, 1862', source: 'Telegram to Richmond, Official Records', portrait: 'bragg', verified: true, ref: 'https://archive.org/details/warofrebellion522unit?q=%22The%20enemy%20has%20yielded%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'I can never forget, whilst I remember anything, that about the end of last year and beginning of this, you gave us a hard-earned victory, which had there been a defeat instead, the nation could scarcely have lived over.',
          who: 'President Abraham Lincoln', role: 'To Gen. Rosecrans', side: 'union',
          date: 'August 31, 1863', source: 'Letter to William S. Rosecrans', portrait: 'lincoln', verified: true, ref: 'https://archive.org/details/completeworksab06fishgoog?q=%22can%20never%20forget%20whilst%22', refTitle: 'Complete Works of Abraham Lincoln (1905)'
        }
      ]
    },
    {
      id: 'chancellorsville',
      name: 'Chancellorsville',
      start: '1863-04-30', end: '1863-05-06',
      lat: 38.310, lng: -77.634,
      place: 'Spotsylvania County, Virginia',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Maj. Gen. Joseph Hooker', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 133,000', confederate: 'about 60,000' },
      casualties: { union: 17300, confederate: 13300 },
      summary: 'Outnumbered more than two to one, Lee split his army twice. On May 2 Stonewall Jackson led 28,000 men on a twelve-mile march around Hooker\'s flank and crashed into the Union XI Corps at dusk. That night Jackson was shot by his own pickets and lost his arm; he died of pneumonia on May 10. Hooker, dazed by a cannonball\'s near miss, pulled back across the Rappahannock.',
      significance: 'Often called Lee\'s "perfect battle," but it cost him Jackson, whom he called his right arm.',
      images: [
        img('Battle of Chancellorsville.png', 'Battle of Chancellorsville, May 1863.', 'Kurz & Allison chromolithograph, 1889. Library of Congress.'),
        img('Stonewall Jackson by Routzahn, 1862.png', 'Lt. Gen. Thomas J. "Stonewall" Jackson, photographed at Winchester in 1862.', 'Nathaniel Routzahn, 1862. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Could I have directed events, I should have chosen for the good of the country to be disabled in your stead. I congratulate you upon the victory, which is due to your skill and energy.',
          who: 'Gen. Robert E. Lee', role: 'Note to the wounded Jackson', side: 'confederate',
          date: 'May 3, 1863', source: 'Letter to Lt. Gen. T. J. Jackson, Official Records', portrait: 'lee', verified: true, ref: 'https://archive.org/details/warofrebellionco0025unit?q=%22should%20have%20chosen%20for%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'Let us cross over the river, and rest under the shade of the trees.',
          who: 'Lt. Gen. Thomas J. "Stonewall" Jackson', role: 'His last words', side: 'confederate',
          date: 'May 10, 1863', source: 'As recorded by Dr. Hunter McGuire and Jackson\'s staff', portrait: 'jackson', verified: true, ref: 'https://archive.org/details/09098560.4267.emory.edu?q=%22rest+under+the+shade+of+the+trees%22', refTitle: 'The Life of Lieut. Gen. T. J. Jackson (1863)'
        },
        {
          quote: 'For once I lost confidence in Hooker.',
          who: 'Maj. Gen. Joseph Hooker', role: 'Commander, Army of the Potomac, on his own failure', side: 'union',
          date: 'Recalled after the war', source: 'Remark to Abner Doubleday, as reported in John Bigelow, The Campaign of Chancellorsville (1910)', verified: true, ref: 'https://archive.org/details/campaignofchanc00bige?q=%22lost%20confidence%20in%20Hooker%22', refTitle: 'John Bigelow, The Campaign of Chancellorsville (1910)'
        }
      ]
    },
    {
      id: 'vicksburg',
      name: 'Siege of Vicksburg',
      start: '1863-05-18', end: '1863-07-04',
      lat: 32.346, lng: -90.858,
      place: 'Vicksburg, Mississippi',
      theater: 'Western',
      result: 'union',
      campaign: 'vicksburg',
      commanders: { union: 'Maj. Gen. Ulysses S. Grant', confederate: 'Lt. Gen. John C. Pemberton' },
      forces: { union: 'about 77,000', confederate: 'about 33,000' },
      casualties: { union: 4835, confederate: 32697, note: 'Confederate figure includes about 29,500 men surrendered on July 4.' },
      summary: 'After months of failed approaches, Grant marched down the Louisiana side of the Mississippi, crossed below Vicksburg, cut loose from his supply line, and won five battles in seventeen days to pin Pemberton inside the city. Two assaults failed, so Grant settled into a siege. Civilians dug caves into the hillsides to escape the shelling. On July 4, out of food and hope, Pemberton surrendered.',
      significance: 'Gave the Union control of the Mississippi and split the Confederacy in two, the day after Lee\'s defeat at Gettysburg.',
      images: [
        img('Siege of Vicksburg.jpg', 'Siege of Vicksburg, May–July 1863.', 'Kurz & Allison chromolithograph, 1888. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Terror stricken, we remained crouched in the cave, while shell after shell followed each other in quick succession.',
          who: 'Mary Ann Loughborough', role: 'Civilian living in a cave during the siege', side: 'civilian',
          date: 'May 1863', source: 'My Cave Life in Vicksburg (1864)', verified: true, ref: 'https://archive.org/details/mycavelifeinvic00louggoog?q=%22Terror%20stricken%20we%20remained%22', refTitle: 'Mary Ann Loughborough, My Cave Life in Vicksburg (1864)'
        },
        {
          quote: 'The fate of the Confederacy was sealed when Vicksburg fell.',
          who: 'Maj. Gen. Ulysses S. Grant', role: 'Commander, Army of the Tennessee', side: 'union',
          date: 'Recalled, 1885', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://archive.org/details/personalmemoirso0001ulys_j6y1?q=%22The%20fate%20of%20the%22', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        },
        {
          quote: 'The Father of Waters again goes unvexed to the sea.',
          who: 'President Abraham Lincoln', role: 'On the reopening of the Mississippi', side: 'union',
          date: 'August 26, 1863', source: 'Letter to James C. Conkling', portrait: 'lincoln', verified: true, ref: 'https://archive.org/details/completeworks00lincgoog?q=%22The%20Father%20of%20Waters%22', refTitle: 'Complete Works of Abraham Lincoln (1894)'
        }
      ]
    },
    {
      id: 'gettysburg',
      name: 'Gettysburg',
      start: '1863-07-01', end: '1863-07-03',
      lat: 39.811, lng: -77.225,
      place: 'Gettysburg, Pennsylvania',
      theater: 'Eastern',
      result: 'union',
      campaign: 'gettysburg',
      tactical: {
        base: 'contour',
        bounds: [[39.782, -77.272], [39.853, -77.203]],
        note: 'Unit positions are simplified from standard maps of the battle. Each bar is a corps or division; it shows roughly where that force\'s line stood.',
        places: [
          { name: 'Gettysburg', ll: [39.8309, -77.2311] }, { name: 'McPherson Ridge', ll: [39.8385, -77.2535] }, { name: 'Oak Hill', ll: [39.8500, -77.2437] },
          { name: 'Seminary Ridge', ll: [39.8235, -77.2500] }, { name: 'Cemetery Hill', ll: [39.8203, -77.2292] }, { name: 'Culp\'s Hill', ll: [39.8188, -77.2185] },
          { name: 'Cemetery Ridge', ll: [39.8105, -77.2325] }, { name: 'Peach Orchard', ll: [39.8003, -77.2512] }, { name: 'Wheatfield', ll: [39.7962, -77.2452] },
          { name: 'Devil\'s Den', ll: [39.7908, -77.2440] }, { name: 'Little Round Top', ll: [39.7912, -77.2345] }, { name: 'Big Round Top', ll: [39.7862, -77.2392] }
        ],
        units: {
          buford: { side: 'union', name: 'Buford\'s cavalry', short: 'Buford' },
          i: { side: 'union', name: 'I Corps (Reynolds, then Doubleday)', short: 'I Corps' },
          xi: { side: 'union', name: 'XI Corps (Howard)', short: 'XI Corps' },
          xii: { side: 'union', name: 'XII Corps (Slocum)', short: 'XII Corps' },
          ii: { side: 'union', name: 'II Corps (Hancock)', short: 'II Corps' },
          iii: { side: 'union', name: 'III Corps (Sickles)', short: 'III Corps' },
          v: { side: 'union', name: 'V Corps (Sykes)', short: 'V Corps' },
          hill: { side: 'confederate', name: 'Hill\'s corps (Heth and Pender)', short: 'Hill' },
          rodes: { side: 'confederate', name: 'Rodes\'s division', short: 'Rodes' },
          early: { side: 'confederate', name: 'Early\'s division', short: 'Early' },
          johnson: { side: 'confederate', name: 'Johnson\'s division', short: 'Johnson' },
          anderson: { side: 'confederate', name: 'Anderson\'s division', short: 'Anderson' },
          mclaws: { side: 'confederate', name: 'McLaws\'s division', short: 'McLaws' },
          hood: { side: 'confederate', name: 'Hood\'s division', short: 'Hood' },
          pickett: { side: 'confederate', name: 'Pickett, Pettigrew, and Trimble', short: 'Pickett' }
        },
        phases: [
          { time: 'July 1, 8 a.m.', title: 'Cavalry holds the ridges',
            text: 'Confederate infantry marching toward Gettysburg from the west runs into Union cavalry dismounted along McPherson Ridge. Buford\'s troopers, firing breech-loading carbines, buy two hours for the infantry to come up.',
            units: { buford: [[39.8415, -77.2520], [39.8330, -77.2530]], hill: [[39.8440, -77.2650], [39.8350, -77.2660]] },
            arrows: [{ side: 'confederate', pts: [[39.8400, -77.2640], [39.8390, -77.2550]] }] },
          { time: 'July 1, 10:30 a.m.', title: 'The I Corps arrives',
            text: 'Union infantry takes over the ridge and throws the first Confederate attack back. General John Reynolds, the senior Union officer on the field, is shot dead leading his men in.',
            units: { i: [[39.8420, -77.2500], [39.8320, -77.2515]], buford: [[39.8262, -77.2482], [39.8222, -77.2472]], hill: [[39.8430, -77.2585], [39.8340, -77.2595]] } },
          { time: 'July 1, 2:30 p.m.', title: 'Attacked from two sides',
            text: 'More Confederates arrive from the north, on Oak Hill and along the roads from Harrisburg and York. The Union XI Corps spreads thin across the open ground north of town to meet them.',
            units: { rodes: [[39.8492, -77.2475], [39.8478, -77.2380]], early: [[39.8502, -77.2262], [39.8482, -77.2180]], xi: [[39.8440, -77.2372], [39.8455, -77.2265]], hill: [[39.8425, -77.2548], [39.8325, -77.2558]] },
            arrows: [{ side: 'confederate', pts: [[39.8480, -77.2430], [39.8440, -77.2480]] }, { side: 'confederate', pts: [[39.8490, -77.2220], [39.8458, -77.2262]] }] },
          { time: 'July 1, 4:30 p.m.', title: 'Retreat to Cemetery Hill',
            text: 'Both Union corps collapse and fall back through the streets of the town, losing thousands as prisoners. They rally on Cemetery Hill, the high ground to the south. The Confederates do not press the attack that evening.',
            units: { i: [[39.8232, -77.2332], [39.8192, -77.2338]], xi: [[39.8226, -77.2302], [39.8214, -77.2258]], buford: null, rodes: [[39.8322, -77.2362], [39.8316, -77.2290]], early: [[39.8310, -77.2262], [39.8300, -77.2190]], hill: [[39.8340, -77.2460], [39.8258, -77.2472]] } },
          { time: 'July 2, 3:30 p.m.', title: 'The fishhook',
            text: 'Overnight both armies arrive in full. The Union line curls from Culp\'s Hill around Cemetery Hill and south along Cemetery Ridge, shaped like a fishhook, so troops can move quickly inside it. But the III Corps has advanced half a mile to the Peach Orchard, leaving a bulge and an open left flank. Lee plans to attack both ends.',
            units: { xii: [[39.8218, -77.2200], [39.8150, -77.2176]], ii: [[39.8186, -77.2340], [39.8092, -77.2355]], iii: [[39.8062, -77.2448], [39.8011, -77.2499], [39.7928, -77.2428]],
              hood: [[39.7938, -77.2558], [39.7862, -77.2542]], mclaws: [[39.8062, -77.2568], [39.7962, -77.2562]], anderson: [[39.8192, -77.2492], [39.8088, -77.2540]], hill: [[39.8325, -77.2460], [39.8215, -77.2482]],
              johnson: [[39.8246, -77.2110], [39.8172, -77.2092]], early: [[39.8292, -77.2270], [39.8282, -77.2202]], rodes: [[39.8302, -77.2382], [39.8272, -77.2342]] } },
          { time: 'July 2, 4:30 p.m.', title: 'Devil\'s Den and Little Round Top',
            text: 'Hood\'s Texans and Alabamians storm the boulders of Devil\'s Den and climb toward Little Round Top, which had been left unoccupied. A Union brigade reaches the summit minutes ahead of them. At the far left of the whole army, the 20th Maine runs out of ammunition and charges downhill with the bayonet.',
            units: { hood: [[39.7932, -77.2442], [39.7888, -77.2392]], v: [[39.7938, -77.2374], [39.7900, -77.2358]] },
            arrows: [{ side: 'confederate', pts: [[39.7885, -77.2520], [39.7905, -77.2410]] }] },
          { time: 'July 2, 6 p.m.', title: 'The Wheatfield and the Peach Orchard',
            text: 'McLaws\'s division smashes the exposed Peach Orchard line, and the Wheatfield changes hands six times. The III Corps is wrecked and General Sickles loses a leg. Reinforcements rushed from other parts of the fishhook plug the gap along Cemetery Ridge.',
            units: { mclaws: [[39.8042, -77.2482], [39.7966, -77.2442]], iii: [[39.8078, -77.2362], [39.7992, -77.2374]], v: [[39.7986, -77.2386], [39.7900, -77.2358]], anderson: [[39.8162, -77.2402], [39.8088, -77.2422]] },
            arrows: [{ side: 'confederate', pts: [[39.8040, -77.2555], [39.8015, -77.2490]] }] },
          { time: 'July 2, dusk', title: 'Culp\'s Hill and Cemetery Hill',
            text: 'At the other end of the line, Confederates attack the wooded slopes of Culp\'s Hill, defended by a single brigade behind log breastworks, and briefly reach the guns on Cemetery Hill. Both attacks fail in the dark. The fishhook has held.',
            units: { johnson: [[39.8216, -77.2165], [39.8150, -77.2150]], early: [[39.8246, -77.2276], [39.8236, -77.2236]], anderson: [[39.8192, -77.2492], [39.8088, -77.2540]] },
            arrows: [{ side: 'confederate', pts: [[39.8205, -77.2105], [39.8195, -77.2168]] }] },
          { time: 'July 3, 1 p.m.', title: 'The cannonade',
            text: 'Having failed on both flanks, Lee decides to strike the Union center. About 150 Confederate guns open the largest bombardment of the war. Most of the shells fly long and land behind the ridge. Some 12,500 infantry wait in the woods on Seminary Ridge.',
            units: { pickett: [[39.8192, -77.2492], [39.8096, -77.2532]], anderson: null, johnson: [[39.8246, -77.2110], [39.8172, -77.2092]], early: [[39.8292, -77.2270], [39.8282, -77.2202]], mclaws: [[39.8040, -77.2520], [39.7968, -77.2500]], hood: [[39.7930, -77.2470], [39.7880, -77.2440]] } },
          { time: 'July 3, 3 p.m.', title: 'Pickett\'s Charge',
            text: 'The line steps out across three-quarters of a mile of open fields. Union artillery tears gaps in it the whole way. At the Emmitsburg Road the men must climb fences under rifle fire.',
            units: { pickett: [[39.8166, -77.2416], [39.8096, -77.2436]] },
            arrows: [{ side: 'confederate', pts: [[39.8140, -77.2500], [39.8128, -77.2375]] }] },
          { time: 'July 3, 3:30 p.m.', title: 'The high-water mark',
            text: 'A few hundred Confederates cross the stone wall at a bend called the Angle before they are shot down or captured. In less than an hour more than half the attacking force is lost. Lee rides out to meet the survivors. The next day, July 4, his army begins the retreat to Virginia.',
            units: { pickett: [[39.8140, -77.2364], [39.8112, -77.2368]] } }
        ],
        ask: ['Switch the base map to "Contour lines." Why was the high ground south of town worth more than the town itself?', 'Trace the Union line on July 2. How does a fishhook shape help a defender?', 'Lee attacked the left, then the right, then the center. What does the ground tell you about why each attack failed?']
      },
      commanders: { union: 'Maj. Gen. George G. Meade', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 93,900', confederate: 'about 71,700' },
      casualties: { union: 23049, confederate: 28063, note: 'Confederate losses are estimated; the total of roughly 51,000 makes Gettysburg the costliest battle of the war.' },
      summary: 'Lee\'s second invasion of the North collided with Meade\'s army at a Pennsylvania crossroads town. On July 1 the Confederates drove the Union through the town onto the high ground south of it. On July 2 Lee hammered both Union flanks: the Peach Orchard, the Wheatfield, Devil\'s Den, and Little Round Top, where the 20th Maine held the extreme left with a bayonet charge. On July 3, after a two-hour cannonade, some 12,500 Confederates crossed a mile of open ground in Pickett\'s Charge and were shattered at the stone wall on Cemetery Ridge.',
      significance: 'The high-water mark of the Confederacy. Lee never again mounted a major offensive in the North. Lincoln dedicated the cemetery here that November.',
      images: [
        img('Thure de Thulstrup - L. Prang and Co. - Battle of Gettysburg - Restoration by Adam Cuerden.jpg', 'Hancock at Gettysburg: the repulse of Pickett\'s Charge, July 3, 1863.', 'Thure de Thulstrup, L. Prang & Co., 1887. Library of Congress.'),
        img('Timothy H. O\'Sullivan (American - A Harvest of Death - Google Art Project.jpg', '"A Harvest of Death": Union dead on the Gettysburg battlefield, photographed July 5–6, 1863.', 'Timothy H. O\'Sullivan, negative; Alexander Gardner, print. 1863.')
      ],
      journal: [
        {
          quote: 'At that crisis, I ordered the bayonet. The word was enough.',
          who: 'Col. Joshua Lawrence Chamberlain', role: '20th Maine Infantry, Little Round Top', side: 'union',
          date: 'July 6, 1863', source: 'Official report of the 20th Maine Infantry', portrait: 'chamberlain', verified: true, ref: 'https://archive.org/details/strongvincentan00nortgoog?q=%22ordered%20the%20bayonet%20The%22', refTitle: 'Oliver W. Norton, Strong Vincent and His Brigade at Gettysburg (1909), reprinting the report'
        },
        {
          quote: 'All this will come right in the end: we\'ll talk it over afterwards; but, in the mean time, all good men must rally. We want all good and true men just now.',
          who: 'Gen. Robert E. Lee', role: 'Rallying survivors of Pickett\'s Charge', side: 'confederate',
          date: 'July 3, 1863', source: 'As recorded by Lt. Col. Arthur Fremantle, Three Months in the Southern States (1863)', portrait: 'lee', verified: true, ref: 'https://docsouth.unc.edu/imls/fremantle/fremantle.html', refTitle: 'Three Months in the Southern States, Documenting the American South'
        },
        {
          quote: 'Was ever the Nation\'s Birthday celebrated in such a way before? … General Lee and his Rebel Army had fallen back. It was impossible to march across the field without stepping upon dead or wounded men, while horses and broken artillery lay on every side.',
          who: 'Lt. Elisha Hunt Rhodes', role: '2nd Rhode Island Infantry', side: 'union',
          date: 'July 4, 1863', source: 'Diary, published as All for the Union (1985); under copyright, so not checked against an open text', portrait: 'rhodes'
        },
        {
          quote: 'It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced … that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom.',
          who: 'President Abraham Lincoln', role: 'Dedication of the Soldiers\' National Cemetery', side: 'union',
          date: 'November 19, 1863', source: 'The Gettysburg Address (Bliss copy)', portrait: 'lincoln', verified: true, ref: 'https://en.wikisource.org/wiki/Gettysburg_Address_%28Lincoln_Memorial%29', refTitle: 'Gettysburg Address (Lincoln Memorial) (Wikisource transcription)'
        }
      ]
    },
    {
      id: 'fort-wagner',
      name: 'Fort Wagner',
      start: '1863-07-18', end: '1863-07-18',
      lat: 32.726, lng: -79.879,
      place: 'Morris Island, Charleston Harbor, South Carolina',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Brig. Gen. Quincy Gillmore, Brig. Gen. Truman Seymour', confederate: 'Brig. Gen. William B. Taliaferro' },
      forces: { union: 'about 5,000', confederate: 'about 1,800' },
      casualties: { union: 1515, confederate: 174 },
      summary: 'The 54th Massachusetts, one of the first Black regiments raised in the North, led the twilight assault up a narrow beach against the sand fort guarding Charleston. The regiment reached the parapet before being thrown back; its colonel, Robert Gould Shaw, was killed on the wall and buried with his men. Sgt. William Carney, badly wounded, carried the flag back and later received the Medal of Honor.',
      significance: 'A tactical defeat that proved Black soldiers would fight and die for the Union, and drove enlistment of nearly 180,000 Black troops.',
      images: [
        img('The Storming of Ft Wagner-lithograph by Kurz and Allison 1890.jpg', 'The storming of Fort Wagner by the 54th Massachusetts, July 18, 1863.', 'Kurz & Allison chromolithograph, 1890. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Not a man flinched, though it was a trying time. Men fell all around me. A shell would explode and clear a space of twenty feet, our men would close up again, but it was no use we had to retreat … Remember if I die I die in a good cause. I wish we had a hundred thousand colored troops we would put an end to this war.',
          who: 'Sgt. Maj. Lewis H. Douglass', role: '54th Massachusetts Infantry; son of Frederick Douglass', side: 'union',
          date: 'July 20, 1863', source: 'Letter to Amelia Loguen, printed in The Journal of Negro History (January 1926)', portrait: 'douglass', verified: true, ref: 'https://archive.org/details/sim_journal-of-african-american-history_1926-01_11_1?q=%22man%20flinched%20though%20it%22', refTitle: 'The Journal of Negro History, January 1926'
        }
      ]
    },
    {
      id: 'chickamauga',
      name: 'Chickamauga',
      start: '1863-09-19', end: '1863-09-20',
      lat: 34.940, lng: -85.260,
      place: 'Catoosa and Walker Counties, Georgia',
      theater: 'Western',
      result: 'confederate',
      campaign: 'tullahoma',
      commanders: { union: 'Maj. Gen. William S. Rosecrans, Maj. Gen. George H. Thomas', confederate: 'Gen. Braxton Bragg, Lt. Gen. James Longstreet' },
      forces: { union: 'about 60,000', confederate: 'about 65,000' },
      casualties: { union: 16170, confederate: 18454, note: 'The bloodiest battle of the Western theater.' },
      summary: 'After maneuvering Bragg out of Chattanooga, Rosecrans pursued into Georgia, where Bragg, reinforced by Longstreet\'s corps from Virginia, turned to fight along Chickamauga Creek. On the second day a garbled Union order opened a gap just as Longstreet attacked, and a third of the Union army fled with Rosecrans. George Thomas held Snodgrass Hill until dark, earning the name "Rock of Chickamauga," and the army escaped to Chattanooga.',
      significance: 'The last major Confederate victory in the West; it bottled up the Union army in Chattanooga and brought Grant east.',
      images: [
        img('Battle of Chickamauga-Sept. 19\' & 20\' 1863-Federal ... (Gen. Rosecrans com.) Confederate ... (Gen. Bragg com.) LCCN91482113.jpg', 'Battle of Chickamauga, September 19–20, 1863.', 'Kurz & Allison chromolithograph, 1890. Library of Congress.'),
        img('George Henry Thomas - Brady-Handy.jpg', 'Maj. Gen. George H. Thomas, the "Rock of Chickamauga."', 'Brady-Handy collection, Library of Congress.')
      ],
      journal: [
        {
          quote: 'We have met with a serious disaster; extent not yet ascertained. Enemy overwhelmed us, drove our right, pierced our center, and scattered troops there.',
          who: 'Maj. Gen. William S. Rosecrans', role: 'Commander, Army of the Cumberland', side: 'union',
          date: 'September 20, 1863', source: 'Telegram to Gen. Halleck, Official Records', verified: true, ref: 'https://archive.org/details/warofrebellion0030geor?q=%22We%20have%20met%20with%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'It seems to me that the élan of the Southern soldier was never seen after Chickamauga … He fought stoutly to the last, but, after Chickamauga, with the sullenness of despair and without the enthusiasm of hope.',
          who: 'Lt. Gen. Daniel Harvey Hill', role: 'Confederate corps commander', side: 'confederate',
          date: 'Recalled, 1887', source: 'Battles and Leaders of the Civil War, vol. 3 (1888)', verified: true, ref: 'https://archive.org/details/bwb_Y0-BNJ-150_3?q=%22It%20seems%20to%20me%22', refTitle: 'Battles and Leaders of the Civil War, vol. 3'
        }
      ]
    },
    {
      id: 'chattanooga',
      name: 'Chattanooga (Lookout Mountain and Missionary Ridge)',
      start: '1863-11-23', end: '1863-11-25',
      lat: 35.030, lng: -85.300,
      place: 'Chattanooga, Tennessee',
      theater: 'Western',
      result: 'union',
      campaign: 'tullahoma',
      commanders: { union: 'Maj. Gen. Ulysses S. Grant, Maj. Gen. George H. Thomas, Maj. Gen. William T. Sherman, Maj. Gen. Joseph Hooker', confederate: 'Gen. Braxton Bragg' },
      forces: { union: 'about 56,000', confederate: 'about 44,000' },
      casualties: { union: 5824, confederate: 6667 },
      summary: 'Grant arrived to break the siege of Chattanooga, opened a "cracker line" for supplies, and attacked. Hooker\'s men took Lookout Mountain in the "Battle Above the Clouds" on November 24. The next day Thomas\'s troops, ordered only to seize the rifle pits at the foot of Missionary Ridge, kept going without orders, scaled the ridge, and broke Bragg\'s center.',
      significance: 'Opened the gateway to Georgia and set the stage for Sherman\'s Atlanta Campaign.',
      images: [
        img('Battle of Chattanooga III.png', 'Battle of Chattanooga, November 1863.', 'Kurz & Allison chromolithograph, 1888. Library of Congress.')
      ],
      journal: [
        {
          quote: '"Thomas, who ordered those men up the ridge?" … "I don\'t know; I did not."',
          who: 'Maj. Gen. Ulysses S. Grant and Maj. Gen. George H. Thomas', role: 'Watching the unplanned assault on Missionary Ridge from Orchard Knob', side: 'union',
          date: 'November 25, 1863', source: 'As recorded by Col. Joseph S. Fullerton, Battles and Leaders, vol. 3', portrait: 'grant', verified: true, ref: 'https://archive.org/details/battlesleadersof03cent?q=%22Thomas%20who%20ordered%20those%22', refTitle: 'Battles and Leaders of the Civil War, vol. 3'
        },
        {
          quote: 'No satisfactory excuse can possibly be given for the shameful conduct of our troops on the left in allowing their line to be penetrated. The position was one which ought to have been held by a line of skirmishers against any assaulting column.',
          who: 'Gen. Braxton Bragg', role: 'Commander, Army of Tennessee', side: 'confederate',
          date: 'November 1863', source: 'Official report of the battle, Official Records', portrait: 'bragg', verified: true, ref: 'https://archive.org/details/warofrebellion312unit?q=%22No%20satisfactory%20excuse%20can%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'wilderness',
      name: 'The Wilderness',
      start: '1864-05-05', end: '1864-05-07',
      lat: 38.318, lng: -77.736,
      place: 'Spotsylvania and Orange Counties, Virginia',
      theater: 'Eastern',
      result: 'inconclusive',
      campaign: 'overland',
      commanders: { union: 'Lt. Gen. Ulysses S. Grant, Maj. Gen. George G. Meade', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 101,000', confederate: 'about 61,000' },
      casualties: { union: 17666, confederate: 11000 },
      summary: 'Grant, now general-in-chief, crossed the Rapidan to begin the Overland Campaign and was caught by Lee in the tangled second-growth forest of the Wilderness. Two days of fighting at close range set the woods on fire; wounded men burned where they lay. Instead of retreating as every previous Union commander had done after such a fight, Grant marched south toward Spotsylvania. His men cheered.',
      significance: 'Began forty days of continuous fighting that pinned Lee to Richmond for the rest of the war.',
      images: [
        img('Battle of the Wilderness.png', 'Battle of the Wilderness, May 5–7, 1864.', 'Kurz & Allison chromolithograph, 1887. Library of Congress.')
      ],
      journal: [
        {
          quote: 'More desperate fighting has not been witnessed on this continent than that of the 5th and 6th of May.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'General-in-Chief of the Union armies', side: 'union',
          date: 'Recalled, 1885', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://archive.org/details/personalmemoirsop102granuoft?q=%22More%20desperate%20fighting%20has%22', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        },
        {
          quote: 'Forest fires raged; ammunition trains exploded; the dead were roasted in the conflagration; the wounded, roused by its hot breath, dragged themselves along, with their torn and mangled limbs, in the mad energy of despair, to escape the ravages of the flames.',
          who: 'Lt. Col. Horace Porter', role: 'Aide-de-camp to Gen. Grant', side: 'union',
          date: 'May 6, 1864 (recalled)', source: 'Campaigning with Grant (1897)', verified: true, ref: 'https://archive.org/details/campaigningwith00unkngoog?q=%22Forest%20fires%20raged%20ammunition%22', refTitle: 'Horace Porter, Campaigning with Grant (1897)'
        }
      ]
    },
    {
      id: 'spotsylvania',
      name: 'Spotsylvania Court House',
      start: '1864-05-08', end: '1864-05-21',
      lat: 38.221, lng: -77.611,
      place: 'Spotsylvania County, Virginia',
      theater: 'Eastern',
      result: 'inconclusive',
      campaign: 'overland',
      commanders: { union: 'Lt. Gen. Ulysses S. Grant, Maj. Gen. George G. Meade', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 100,000', confederate: 'about 52,000' },
      casualties: { union: 18000, confederate: 12000 },
      summary: 'Lee won the race to the Spotsylvania crossroads and built the strongest field fortifications yet seen in the war. On May 12 Hancock\'s corps broke into the salient called the "Mule Shoe," and for twenty hours the two armies fought hand to hand across the log works of the Bloody Angle in the rain. Musket fire cut down a 22-inch oak tree. Grant sidestepped again toward the North Anna.',
      significance: 'Showed that the war had become a grinding contest of attrition and trench warfare.',
      images: [
        img('Battle of Spottsylvania by Thure de Thulstrup.jpg', 'Battle of Spotsylvania, May 1864.', 'Thure de Thulstrup, L. Prang & Co., 1887. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I propose to fight it out on this line if it takes all summer.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'General-in-Chief of the Union armies', side: 'union',
          date: 'May 11, 1864', source: 'Dispatch to Gen. Halleck, Official Records', portrait: 'grant', verified: true, ref: 'https://archive.org/details/warofrebellion371unit?q=%22propose%20to%20fight%20it%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'Rank after rank was riddled by shot and shell and bayonet-thrusts, and finally sank, a mass of torn and mutilated corpses; then fresh troops rushed madly forward to replace the dead, and so the murderous work went on.',
          who: 'Lt. Col. Horace Porter', role: 'Aide-de-camp to Gen. Grant, on the Bloody Angle', side: 'union',
          date: 'May 12, 1864 (recalled)', source: 'Campaigning with Grant (1897)', verified: true, ref: 'https://archive.org/details/bwb_S0-ECN-710?q=%22Rank%20after%20rank%20was%22', refTitle: 'Horace Porter, Campaigning with Grant (1897)'
        }
      ]
    },
    {
      id: 'cold-harbor',
      name: 'Cold Harbor',
      start: '1864-05-31', end: '1864-06-12',
      lat: 37.590, lng: -77.287,
      place: 'Hanover County, Virginia',
      theater: 'Eastern',
      result: 'confederate',
      campaign: 'overland',
      commanders: { union: 'Lt. Gen. Ulysses S. Grant, Maj. Gen. George G. Meade', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 108,000', confederate: 'about 62,000' },
      casualties: { union: 12737, confederate: 5287 },
      summary: 'Ten miles from Richmond, Grant ordered a frontal assault at dawn on June 3 against seven miles of Confederate entrenchments. Roughly 7,000 Union soldiers fell in under an hour. Wounded men lay between the lines for days while the generals argued over a truce. Grant then slipped the whole army across the James River to strike at Petersburg.',
      significance: 'Lee\'s last major field victory, and the assault Grant said he regretted more than any other.',
      images: [
        img('Battle of Cold Harbor.png', 'Battle of Cold Harbor, June 1864.', 'Kurz & Allison chromolithograph, 1888. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I noticed that many of the soldiers had taken off their coats, and seemed to be engaged in sewing up rents in them … the men were calmly writing their names and home addresses on slips of paper, and pinning them on the backs of their coats, so that their dead bodies might be recognized upon the field, and their fate made known to their families at home.',
          who: 'Lt. Col. Horace Porter', role: 'Aide-de-camp to Gen. Grant, the evening before the assault', side: 'union',
          date: 'June 2, 1864 (recalled)', source: 'Campaigning with Grant (1897)', verified: true, ref: 'https://archive.org/details/cu31924030927002?q=%22noticed%20that%20many%20of%22', refTitle: 'Horace Porter, Campaigning with Grant (1897)'
        },
        {
          quote: 'I have always regretted that the last assault at Cold Harbor was ever made … no advantage whatever was gained to compensate for the heavy loss we sustained.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'General-in-Chief of the Union armies', side: 'union',
          date: 'Recalled, 1885', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_LV', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        }
      ]
    },
    {
      id: 'atlanta',
      name: 'Atlanta',
      start: '1864-07-22', end: '1864-09-02',
      lat: 33.749, lng: -84.388,
      place: 'Atlanta, Georgia',
      theater: 'Western',
      result: 'union',
      campaign: 'atlanta',
      commanders: { union: 'Maj. Gen. William T. Sherman', confederate: 'Gen. John Bell Hood' },
      forces: { union: 'about 34,000 engaged July 22 (100,000 in the campaign)', confederate: 'about 40,000 engaged' },
      casualties: { union: 3641, confederate: 5500, note: 'Figures for the Battle of Atlanta, July 22. The whole campaign cost each side roughly 30,000.' },
      summary: 'After four months of flanking marches from Chattanooga, Sherman reached the outskirts of Atlanta. Jefferson Davis replaced the cautious Joseph Johnston with the aggressive John Bell Hood, who attacked three times in eight days and lost badly each time; Union Maj. Gen. James McPherson was killed on July 22. Sherman besieged the city, cut its last railroad at Jonesboro, and Hood evacuated on September 1.',
      significance: 'The fall of Atlanta assured Lincoln\'s re-election two months later and ended any chance of a negotiated peace.',
      images: [
        img('Battle of Atlanta.png', 'Battle of Atlanta, July 22, 1864.', 'Kurz & Allison chromolithograph, 1888. Library of Congress.'),
        img('William-Tecumseh-Sherman.jpg', 'Maj. Gen. William T. Sherman.', 'Mathew Brady, c. 1864. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Atlanta is ours, and fairly won.',
          who: 'Maj. Gen. William T. Sherman', role: 'Commander, Military Division of the Mississippi', side: 'union',
          date: 'September 3, 1864', source: 'Telegram to Gen. Halleck, Official Records', portrait: 'sherman', verified: true, ref: 'https://archive.org/details/warofrebellion521unit?q=%22Atlanta%20is%20ours%20and%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'You cannot qualify war in harsher terms than I will. War is cruelty, and you cannot refine it; and those who brought war into our country deserve all the curses and maledictions a people can pour out.',
          who: 'Maj. Gen. William T. Sherman', role: 'Reply to the mayor of Atlanta\'s plea to halt the expulsion of civilians', side: 'union',
          date: 'September 12, 1864', source: 'Letter to James M. Calhoun, Memoirs of General W. T. Sherman (1875)', portrait: 'sherman', verified: true, ref: 'https://en.wikisource.org/wiki/Letter_to_James_M._Calhoun%2C_et_al.%2C_September_12%2C_1864', refTitle: 'Letter to James M. Calhoun, et al., September 12, 1864 (Wikisource transcription)'
        }
      ]
    },
    {
      id: 'franklin',
      name: 'Franklin',
      start: '1864-11-30', end: '1864-11-30',
      lat: 35.912, lng: -86.868,
      place: 'Franklin, Tennessee',
      theater: 'Western',
      result: 'union',
      campaign: 'hood',
      commanders: { union: 'Maj. Gen. John M. Schofield', confederate: 'Gen. John Bell Hood' },
      forces: { union: 'about 27,000', confederate: 'about 27,000' },
      casualties: { union: 2326, confederate: 6252, note: 'Six Confederate generals were killed, including Patrick Cleburne.' },
      summary: 'Furious that Schofield\'s army had slipped past him at Spring Hill the night before, Hood ordered a frontal assault across two miles of open ground against entrenched Union troops at Franklin. Eighteen brigades charged at sunset in one of the largest and most futile attacks of the war. The Confederates briefly broke the center before being thrown back in hand-to-hand fighting that lasted into the night.',
      significance: 'Wrecked the Army of Tennessee\'s officer corps and infantry; Hood lost more men in five hours than Grant lost at Cold Harbor.',
      images: [
        img('Battle of Franklin, November 30, 1864.jpg', 'Battle of Franklin, November 30, 1864.', 'Kurz & Allison chromolithograph, 1891. Library of Congress.'),
        img('John Bell Hood.jpg', 'Gen. John Bell Hood.', 'Public domain.')
      ],
      journal: [
        {
          quote: 'I cannot describe it. It beggars description. I will not attempt to describe it. I could not. The death-angel was there to gather its last harvest. It was the grand coronation of death.',
          who: 'Pvt. Sam Watkins', role: 'Company H, 1st Tennessee Infantry', side: 'confederate',
          date: 'November 30, 1864 (recalled)', source: 'Co. Aytch (1882)', portrait: 'watkins', verified: true, ref: 'https://archive.org/details/1861vs1882coaytc00watk?q=%22cannot%20describe%20it%20It%22', refTitle: 'Sam R. Watkins, "Co. Aytch" (1882)'
        },
        {
          quote: 'Our loss of officers was excessively large in proportion to the loss of men.',
          who: 'Gen. John Bell Hood', role: 'Commander, Army of Tennessee', side: 'confederate',
          date: 'December 3, 1864', source: 'Dispatch to Richmond, as printed in William P. Snow, Southern Generals (1865)', portrait: 'hood', verified: true, ref: 'https://archive.org/details/southgenerals00snowrich?q=%22Our%20loss%20of%20officers%22', refTitle: 'William P. Snow, Southern Generals (1865)'
        }
      ]
    },
    {
      id: 'nashville',
      name: 'Nashville',
      start: '1864-12-15', end: '1864-12-16',
      lat: 36.140, lng: -86.780,
      place: 'Nashville, Tennessee',
      theater: 'Western',
      result: 'union',
      campaign: 'hood',
      commanders: { union: 'Maj. Gen. George H. Thomas', confederate: 'Gen. John Bell Hood' },
      forces: { union: 'about 55,000', confederate: 'about 30,000' },
      casualties: { union: 3061, confederate: 6000, note: 'Most Confederate losses were men captured.' },
      summary: 'Hood followed Schofield to the fortified city of Nashville and dug in on the hills south of it with an army too small to besiege it. Thomas waited out an ice storm, ignoring frantic orders from Washington to attack, then struck on December 15 with a feint on the Confederate right and a massive wheeling assault on the left. The next day the Confederate line collapsed entirely.',
      significance: 'The most complete Union victory of the war in the field. The Army of Tennessee ceased to exist as an effective force.',
      images: [
        img('Battle of Nashville.jpg', 'Battle of Nashville, December 15–16, 1864.', 'Kurz & Allison chromolithograph, 1891. Library of Congress.'),
        img('George Henry Thomas - Brady-Handy.jpg', 'Maj. Gen. George H. Thomas.', 'Brady-Handy collection, Library of Congress.')
      ],
      journal: [
        {
          quote: 'I beheld for the first and only time a Confederate army abandon the field in confusion.',
          who: 'Gen. John Bell Hood', role: 'Commander, Army of Tennessee', side: 'confederate',
          date: 'December 16, 1864 (recalled)', source: 'Advance and Retreat (1880)', portrait: 'hood', verified: true, ref: 'https://archive.org/details/advanceretreatpe00hood?q=%22beheld%20for%20the%20first%22', refTitle: 'John Bell Hood, Advance and Retreat (1880)'
        },
        {
          quote: 'Attack Hood at once and wait no longer for a remount of your cavalry. There is great danger of delay resulting in a campaign back to the Ohio River.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'Telegram to Thomas, one of several pressing him to attack', side: 'union',
          date: 'December 6, 1864', source: 'Official Records', portrait: 'grant', verified: true, ref: 'https://archive.org/details/warofrebellion452unit?q=%22Attack%20Hood%20at%20once%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'savannah',
      name: 'Savannah and the March to the Sea',
      start: '1864-11-15', end: '1864-12-21',
      lat: 32.081, lng: -81.091,
      place: 'Savannah, Georgia',
      theater: 'Western',
      result: 'union',
      campaign: 'march-to-the-sea',
      commanders: { union: 'Maj. Gen. William T. Sherman', confederate: 'Lt. Gen. William J. Hardee' },
      forces: { union: 'about 62,000', confederate: 'about 10,000 at Savannah' },
      casualties: { union: 1300, confederate: 2300, note: 'Approximate figures for the entire march.' },
      summary: 'Leaving Atlanta in flames, Sherman cut his supply line and marched 62,000 men 285 miles across Georgia in two columns, living off the land and wrecking railroads, mills, and cotton gins in a swath sixty miles wide. Thousands of freed slaves followed the army. On December 13 his troops stormed Fort McAllister, reopening contact with the Navy. Hardee evacuated Savannah on the night of December 20.',
      significance: 'Proved the Confederacy could not protect its heartland and broke Southern morale.',
      images: [
        img('F.O.C. Darley and Alexander Hay Ritchie - Sherman\'s March to the Sea.jpg', '"Sherman\'s March to the Sea."', 'F.O.C. Darley and Alexander Hay Ritchie, engraving, 1868.')
      ],
      journal: [
        {
          quote: 'Behind us lay Atlanta, smouldering and in ruins, the black smoke rising high in air, and hanging like a pall over the ruined city.',
          who: 'Maj. Gen. William T. Sherman', role: 'Leaving Atlanta', side: 'union',
          date: 'November 16, 1864 (recalled)', source: 'Memoirs of General W. T. Sherman (1875)', portrait: 'sherman', verified: true, ref: 'https://archive.org/details/memoirsgeneralw00shergoog?q=%22Behind%20us%20lay%20Atlanta%22', refTitle: 'Memoirs of General William T. Sherman (1875)'
        },
        {
          quote: 'I beg to present you as a Christmas gift the city of Savannah, with one hundred and fifty heavy guns and plenty of ammunition, also about twenty-five thousand bales of cotton.',
          who: 'Maj. Gen. William T. Sherman', role: 'Telegram to President Lincoln', side: 'union',
          date: 'December 22, 1864', source: 'Official Records', portrait: 'sherman', verified: true, ref: 'https://archive.org/details/freedomtriumpha01coffgoog?q=%22beg%20to%20present%20you%22', refTitle: 'Charles C. Coffin, Freedom Triumphant (1890), quoting the telegram'
        }
      ]
    },
    {
      id: 'petersburg',
      name: 'Siege of Petersburg',
      start: '1864-06-15', end: '1865-04-02',
      lat: 37.228, lng: -77.370,
      place: 'Petersburg, Virginia',
      theater: 'Eastern',
      result: 'union',
      campaign: 'overland',
      commanders: { union: 'Lt. Gen. Ulysses S. Grant, Maj. Gen. George G. Meade', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 125,000 by 1865', confederate: 'about 50,000 by 1865' },
      casualties: { union: 42000, confederate: 28000, note: 'Approximate totals for the nine-and-a-half-month siege.' },
      summary: 'Petersburg was the rail hub that fed Richmond. For 292 days Grant stretched his lines westward, cutting one railroad after another, while Lee\'s thinning army held thirty miles of trenches. On July 30, 1864, Union miners exploded four tons of powder beneath a Confederate fort; the assault that followed was bungled, and attacking troops were trapped and killed in the Crater. On April 2, 1865, Grant broke through, and Lee abandoned Petersburg and Richmond that night.',
      significance: 'Nine and a half months of trench warfare, the longest campaign of its kind in American history, bled the Army of Northern Virginia to the point of collapse.',
      images: [
        img('Petersburg, Virginia. Dead Confederate soldier in the trenches of Fort Mahone LOC cwpb.02542.jpg', 'A dead Confederate soldier in the trenches of Fort Mahone, Petersburg, photographed April 3, 1865, the day after the lines broke.', 'Thomas C. Roche, April 1865. Library of Congress.')
      ],
      journal: [
        {
          quote: 'It was the saddest affair I have witnessed in the war. Such opportunity for carrying fortifications I have never seen and do not expect again to have.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'On the Battle of the Crater', side: 'union',
          date: 'August 1, 1864', source: 'Telegram to Gen. Halleck, Official Records', portrait: 'grant', verified: true, ref: 'https://archive.org/details/cu31924030909844?q=%22It%20was%20the%20saddest%22', refTitle: 'The Story of a Regiment (1895), quoting the telegram'
        },
        {
          quote: 'I see no prospect of doing more than holding our position here till night. I am not certain that I can do that … I advise that all preparation be made for leaving Richmond to-night.',
          who: 'Gen. Robert E. Lee', role: 'Commander, Army of Northern Virginia', side: 'confederate',
          date: 'April 2, 1865', source: 'Telegram to the Secretary of War, Official Records', portrait: 'lee', verified: true, ref: 'https://archive.org/details/warofrebellion463unit?q=%22see%20no%20prospect%20of%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'appomattox',
      name: 'Appomattox Court House',
      start: '1865-04-09', end: '1865-04-09',
      lat: 37.377, lng: -78.796,
      place: 'Appomattox County, Virginia',
      theater: 'Eastern',
      result: 'union',
      campaign: 'appomattox',
      commanders: { union: 'Lt. Gen. Ulysses S. Grant', confederate: 'Gen. Robert E. Lee' },
      forces: { union: 'about 63,000 in pursuit', confederate: 'about 28,000' },
      casualties: { union: 164, confederate: 500, note: 'About 28,000 Confederates were paroled after the surrender.' },
      summary: 'After the fall of Petersburg, Lee\'s starving army marched west hoping to reach the railroad and join Johnston in North Carolina. Sheridan\'s cavalry outran it, capturing a quarter of the army at Sailor\'s Creek and then the rations waiting at Appomattox Station. On the morning of April 9 Lee found Union infantry across his path. That afternoon he met Grant in Wilmer McLean\'s parlor and surrendered the Army of Northern Virginia.',
      significance: 'Effectively ended the war. Grant\'s generous terms, letting the men keep their horses and go home, set the tone for peace.',
      images: [
        img('General Robert E. Lee surrenders at Appomattox Court House 1865.jpg', 'Lee surrenders to Grant in the McLean House, April 9, 1865.', 'Thure de Thulstrup, L. Prang & Co., c. 1887.'),
        img('Robert Edward Lee.jpg', 'Gen. Robert E. Lee.', 'Julian Vannerson, 1864. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I felt like anything rather than rejoicing at the downfall of a foe who had fought so long and valiantly, and had suffered so much for a cause, though that cause was, I believe, one of the worst for which a people ever fought, and one for which there was the least excuse.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'On meeting Lee in the McLean House', side: 'union',
          date: 'April 9, 1865 (recalled)', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_LXVII', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        },
        {
          quote: 'After four years of arduous service marked by unsurpassed courage and fortitude, the Army of Northern Virginia has been compelled to yield to overwhelming numbers and resources … I bid you all an affectionate farewell.',
          who: 'Gen. Robert E. Lee', role: 'Farewell address to his army', side: 'confederate',
          date: 'April 10, 1865', source: 'General Order No. 9, Official Records', portrait: 'lee', verified: true, ref: 'https://archive.org/details/warofrebellion461unit?q=%22After%20four%20years%20of%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'On our part not a sound of trumpet more, nor roll of drum; not a cheer, nor word nor whisper of vain-glorying, nor motion of man standing again at the order, but an awed stillness rather, and breath-holding, as if it were the passing of the dead!',
          who: 'Bvt. Maj. Gen. Joshua L. Chamberlain', role: 'Receiving the formal surrender of Confederate infantry', side: 'union',
          date: 'April 12, 1865 (recalled)', source: 'The Passing of the Armies (1915)', portrait: 'chamberlain', verified: true, ref: 'https://archive.org/details/bwb_S0-BGJ-081?q=%22On%20our%20part%20not%22', refTitle: 'Joshua L. Chamberlain, The Passing of the Armies (1915)'
        }
      ]
    },
    {
      id: 'wilsons-creek',
      name: 'Wilson\'s Creek',
      start: '1861-08-10', end: '1861-08-10',
      lat: 37.100, lng: -93.413,
      place: 'Near Springfield, Missouri',
      theater: 'Trans-Mississippi',
      result: 'confederate',
      commanders: { union: 'Brig. Gen. Nathaniel Lyon (killed), Maj. Samuel Sturgis', confederate: 'Brig. Gen. Ben McCulloch, Maj. Gen. Sterling Price (Missouri State Guard)' },
      forces: { union: 'about 5,400', confederate: 'about 12,000' },
      casualties: { union: 1317, confederate: 1222 },
      summary: 'Nathaniel Lyon had seized the St. Louis arsenal and chased Missouri\'s secessionist governor out of the capital. Outnumbered two to one and with his enlistments expiring, he chose to attack the Confederate camp on Wilson\'s Creek at dawn. His men held "Bloody Hill" through three Confederate assaults before Lyon, already wounded twice, was shot through the heart while leading a counterattack. The Union army withdrew to Springfield and then to Rolla.',
      significance: 'The first major battle west of the Mississippi and the first in which a Union general was killed. Missouri stayed in the Union but became a battleground of guerrilla war.',
      images: [
        img('Battle of Wilsons Creek.png', 'Battle of Wilson\'s Creek, August 10, 1861.', 'Kurz & Allison chromolithograph, 1893. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Rather than concede to the State of Missouri for one single instant the right to dictate to my Government in any matter however unimportant, I would … see you, and you, and you, and you, and you, and every man, woman, and child in the State, dead and buried … This means war.',
          who: 'Brig. Gen. Nathaniel Lyon', role: 'To Governor Claiborne Jackson at the Planters\' House, St. Louis', side: 'union',
          date: 'June 11, 1861', source: 'As recorded by Thomas L. Snead, The Fight for Missouri (1886)', portrait: 'lyon', verified: true, ref: 'https://archive.org/details/fightformissouri00snea?q=%22Rather%20than%20concede%20to%22', refTitle: 'Thomas L. Snead, The Fight for Missouri (1886)'
        },
        {
          quote: 'Come on, my brave boys, I will lead you! Forward!',
          who: 'Brig. Gen. Nathaniel Lyon', role: 'His last words, leading the 2nd Kansas on Bloody Hill', side: 'union',
          date: 'August 10, 1861', source: 'As reported by soldiers of the 2nd Kansas Infantry; early accounts differ on the exact words', portrait: 'lyon'
        }
      ]
    },
    {
      id: 'balls-bluff',
      name: 'Ball\'s Bluff',
      start: '1861-10-21', end: '1861-10-21',
      lat: 39.130, lng: -77.527,
      place: 'Leesburg, Virginia',
      theater: 'Eastern',
      result: 'confederate',
      commanders: { union: 'Brig. Gen. Charles P. Stone, Col. Edward D. Baker (killed)', confederate: 'Col. Nathan "Shanks" Evans' },
      forces: { union: 'about 1,700', confederate: 'about 1,700' },
      casualties: { union: 1002, confederate: 155, note: 'More than 500 Union soldiers were captured; many others drowned in the Potomac.' },
      summary: 'A mistaken report of an unguarded Confederate camp drew Union troops across the Potomac at Harrison\'s Island and up a steep bluff near Leesburg. Colonel Edward Baker, a sitting United States senator and Lincoln\'s close friend, fed regiments across on three small boats until Confederate fire pinned them against the cliff. Baker was killed, and the retreat became a scramble down the bluff and into the river.',
      significance: 'A small battle with large consequences: Congress created the Joint Committee on the Conduct of the War, and General Stone was jailed for months without charges.',
      images: [
        img('Battle of Ball\'s Bluff.png', 'Battle of Ball\'s Bluff, October 21, 1861.', 'Kurz & Allison chromolithograph. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Here I am flat on my back after our first engagement—wounded but pretty comfortable—I can\'t write an account now but I felt and acted very cool and did my duty I am sure.',
          who: 'Lt. Oliver Wendell Holmes Jr.', role: '20th Massachusetts Infantry; shot through the chest at Ball\'s Bluff', side: 'union',
          date: 'October 23, 1861', source: 'Letter to his mother; later a Justice of the U.S. Supreme Court', portrait: 'holmes', verified: true, ref: 'https://archive.org/details/in.ernet.dli.2015.75551?q=%22flat+on+my+back%22', refTitle: 'Touched with Fire: Civil War Letters and Diary of Oliver Wendell Holmes, Jr. (1946)'
        }
      ]
    },
    {
      id: 'pea-ridge',
      name: 'Pea Ridge (Elkhorn Tavern)',
      start: '1862-03-07', end: '1862-03-08',
      lat: 36.455, lng: -94.035,
      place: 'Benton County, Arkansas',
      theater: 'Trans-Mississippi',
      result: 'union',
      commanders: { union: 'Brig. Gen. Samuel R. Curtis', confederate: 'Maj. Gen. Earl Van Dorn' },
      forces: { union: 'about 10,500', confederate: 'about 16,000' },
      casualties: { union: 1384, confederate: 2000 },
      summary: 'Van Dorn marched his army, which included three regiments of Cherokee troops, around the Union position to attack it from behind. On the first day Confederate generals McCulloch and McIntosh were killed within minutes of each other and their wing fell apart. On March 8 Curtis massed his artillery, silenced the Confederate guns, and drove Van Dorn\'s hungry, exhausted army from the field.',
      significance: 'One of the few battles in which the Confederates outnumbered the Union. It secured Missouri for the North for two years.',
      images: [
        img('Battle of Pea Ridge.png', 'Battle of Pea Ridge, Arkansas, March 7–8, 1862.', 'Kurz & Allison chromolithograph, 1889. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I must have St. Louis—then Huzza!',
          who: 'Maj. Gen. Earl Van Dorn', role: 'Commander, Confederate Trans-Mississippi District', side: 'confederate',
          date: 'January 1862', source: 'Letter to his wife on taking command in the West', verified: true, ref: 'https://archive.org/details/sim_civil-war-history_1958-12_4_4?q=%22I%20must%20have%20St%22', refTitle: 'Civil War History, December 1958, quoting the letter'
        },
        {
          quote: 'The vulture and the wolf have now communion, and the dead, friends and foes, sleep in the same lonely grave.',
          who: 'Brig. Gen. Samuel R. Curtis', role: 'Commander, Army of the Southwest, revisiting the field', side: 'union',
          date: 'March 1862', source: 'Letter to his brother, quoted in Jay Monaghan, Civil War on the Western Border (1955)', verified: true, ref: 'https://archive.org/details/civilwaronwester00mona?q=%22The%20vulture%20and%20the%22', refTitle: 'Jay Monaghan, Civil War on the Western Border (1955), quoting the letter'
        }
      ]
    },
    {
      id: 'hampton-roads',
      name: 'Hampton Roads (Monitor and Virginia)',
      start: '1862-03-08', end: '1862-03-09',
      lat: 36.960, lng: -76.330,
      place: 'Hampton Roads, Virginia',
      theater: 'Eastern',
      result: 'inconclusive',
      commanders: { union: 'Lt. John L. Worden (USS Monitor)', confederate: 'Flag Officer Franklin Buchanan, Lt. Catesby ap R. Jones (CSS Virginia)' },
      forces: { union: 'USS Monitor and five wooden warships', confederate: 'CSS Virginia and five small gunboats' },
      casualties: { union: 409, confederate: 24, note: 'Nearly all Union losses came on March 8, when the Virginia sank USS Cumberland and burned USS Congress.' },
      summary: 'The Confederates rebuilt the scuttled steam frigate Merrimack as an ironclad ram, the CSS Virginia. On March 8 she steamed out and destroyed two wooden Union warships while their shot bounced off her armor. The Union\'s own ironclad, the turreted USS Monitor, arrived that night. The two fought for four hours on March 9 at point-blank range without either doing serious damage, and the Virginia withdrew.',
      significance: 'The first battle between ironclad warships. In a single day it made every wooden navy in the world obsolete.',
      images: [
        img('Battle between Monitor and Merrimac (Hampton Roads).png', 'The Monitor and the Merrimac (CSS Virginia), March 9, 1862.', 'Kurz & Allison chromolithograph, 1889. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Gun after gun was fired by the Monitor, which was returned with whole broadsides by the rebels with no more effect apparently than so many pebble-stones thrown by a child.',
          who: 'Lt. Samuel Dana Greene', role: 'Executive officer, USS Monitor, who commanded the turret', side: 'union',
          date: 'March 14, 1862', source: 'Letter to his parents', verified: true, ref: 'https://archive.org/details/miscellaneouspa00unkngoog?q=%22Gun%20after%20gun%20was%22', refTitle: 'Miscellaneous Papers, 1672–1865, Now First Printed from the Manuscript (1887)'
        }
      ]
    },
    {
      id: 'new-orleans',
      name: 'Capture of New Orleans',
      start: '1862-04-24', end: '1862-04-25',
      lat: 29.950, lng: -90.070,
      place: 'New Orleans, Louisiana',
      theater: 'Western',
      result: 'union',
      commanders: { union: 'Flag Officer David G. Farragut, Maj. Gen. Benjamin Butler', confederate: 'Maj. Gen. Mansfield Lovell, Brig. Gen. Johnson K. Duncan' },
      forces: { union: '17 warships, 19 mortar boats, 15,000 troops', confederate: 'about 4,000 in Forts Jackson and St. Philip and the city' },
      casualties: { union: 229, confederate: 782 },
      summary: 'Six days of mortar bombardment failed to silence the two forts guarding the river below New Orleans, so Farragut ran his fleet past them in the dark before dawn on April 24, through fire rafts and a chain barrier, and scattered the Confederate river flotilla. He anchored off the city the next day. Lovell\'s troops evacuated, the mayor refused to lower the flag himself, and Butler\'s army occupied the city on May 1.',
      significance: 'The Confederacy lost its largest city and busiest port without a land battle, and the Union gained a base for the campaign up the Mississippi.',
      images: [
        img('Mauritz de Haas - Farragut\'s Fleet passing the Forts below New Orleans.jpg', 'Farragut\'s fleet passing Forts Jackson and St. Philip, April 24, 1862.', 'Mauritz de Haas, oil painting, 1867. Public domain.')
      ],
      journal: [
        {
          quote: 'The Flag-Officer, having heard all the opinions expressed by the different commanders, is of the opinion that whatever is to be done will have to be done quickly, or we will be again reduced to a blockading squadron.',
          who: 'Flag Officer David G. Farragut', role: 'Commander, West Gulf Blockading Squadron', side: 'union',
          date: 'April 20, 1862', source: 'General order to the fleet, Official Records of the Navies', portrait: 'farragut', verified: true, ref: 'https://archive.org/details/officialrecordso0018unse?q=%22having%20heard%20all%20the%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'The city is yours by the power of brutal force, and not by any choice or consent of its inhabitants.',
          who: 'John T. Monroe', role: 'Mayor of New Orleans, refusing to surrender the city or lower its flag', side: 'civilian',
          date: 'April 26, 1862', source: 'Letter to Flag Officer Farragut', verified: true, ref: 'https://archive.org/details/correspondencebe00newo?q=%22The%20city%20is%20yours%22', refTitle: 'Correspondence between the Mayor and Federal Authorities Relative to the Occupation of New Orleans (1862)'
        }
      ]
    },
    {
      id: 'south-mountain',
      name: 'South Mountain',
      start: '1862-09-14', end: '1862-09-14',
      lat: 39.487, lng: -77.620,
      place: 'Frederick and Washington Counties, Maryland',
      theater: 'Eastern',
      result: 'union',
      campaign: 'maryland-union',
      commanders: { union: 'Maj. Gen. George B. McClellan', confederate: 'Gen. Robert E. Lee, Maj. Gen. D. H. Hill, Maj. Gen. James Longstreet' },
      forces: { union: 'about 28,000 engaged', confederate: 'about 18,000 engaged' },
      casualties: { union: 2325, confederate: 2685 },
      summary: 'Handed a lost copy of Lee\'s orders showing his army split into five pieces, McClellan moved to force the three passes through South Mountain. D. H. Hill\'s thin division held Turner\'s and Fox\'s Gaps all day against three Union corps before falling back after dark; Franklin\'s corps broke through Crampton\'s Gap to the south. Two future presidents fought here: Rutherford B. Hayes was badly wounded, and Sgt. William McKinley served in the same regiment.',
      significance: 'Lee briefly decided to abandon Maryland; only the news that Harpers Ferry was about to surrender persuaded him to stand at Sharpsburg.',
      images: [
        img('Battle of South Mountain.png', 'Battle of South Mountain, September 14, 1862.', 'Kurz & Allison chromolithograph. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I have the whole rebel force in front of me … I think Lee has made a gross mistake, and that he will be severely punished for it … I have all the plans of the rebels, and will catch them in their own trap if my men are equal to the emergency.',
          who: 'Maj. Gen. George B. McClellan', role: 'Commander, Army of the Potomac, the day after the Lost Order was found', side: 'union',
          date: 'September 13, 1862', source: 'Telegram to President Lincoln, Official Records', portrait: 'mcclellan', verified: true, ref: 'https://archive.org/details/warofrebellion192unit?q=%22have%20the%20whole%20rebel%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'The day has gone against us and this army will go by Sharpsburg and cross the river.',
          who: 'Gen. Robert E. Lee', role: 'Commander, Army of Northern Virginia', side: 'confederate',
          date: 'September 14, 1862', source: 'Order to Maj. Gen. Lafayette McLaws, Official Records', portrait: 'lee', verified: true, ref: 'https://archive.org/details/warofrebellion512unit_0?q=%22The%20day%20has%20gone%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'perryville',
      name: 'Perryville',
      start: '1862-10-08', end: '1862-10-08',
      lat: 37.672, lng: -84.970,
      place: 'Perryville, Kentucky',
      theater: 'Western',
      result: 'union',
      campaign: 'kentucky',
      commanders: { union: 'Maj. Gen. Don Carlos Buell', confederate: 'Gen. Braxton Bragg' },
      forces: { union: 'about 22,000 engaged (55,000 present)', confederate: 'about 16,000 engaged' },
      casualties: { union: 4276, confederate: 3401, note: 'A tactical Confederate success, but Bragg\'s retreat afterward made it a strategic Union victory.' },
      summary: 'In a drought autumn, both armies converged on the creeks near Perryville looking for water. Bragg, believing he faced only a fragment of Buell\'s army, attacked and drove the Union left back a mile in some of the fiercest fighting of the war. A freak of acoustics kept Buell, two miles away, from hearing the battle until late afternoon. That night Bragg learned he faced the whole Union army and retreated to Tennessee.',
      significance: 'Ended the Confederate invasion of Kentucky. The state stayed in the Union, and Bragg never came north again.',
      images: [
        img('Battle of Perryville.png', 'Battle of Perryville, Kentucky, October 8, 1862.', 'Kurz & Allison chromolithograph. Library of Congress.')
      ],
      journal: [
        {
          quote: 'I was in every battle, skirmish and march that was made by the First Tennessee Regiment during the war, and I do not remember of a harder contest and more evenly fought battle than that of Perryville. If it had been two men wrestling, it would have been called a "dog fall." Both sides claim the victory—both whipped.',
          who: 'Pvt. Sam Watkins', role: 'Company H, 1st Tennessee Infantry', side: 'confederate',
          date: 'October 8, 1862 (recalled)', source: 'Co. Aytch (1882)', portrait: 'watkins', verified: true, ref: 'https://archive.org/details/bub_gb_ssIdAQAAMAAJ?q=%22was%20in%20every%20battle%22', refTitle: 'Sam R. Watkins, "Co. Aytch" (1882)'
        },
        {
          quote: 'For the time engaged it was the severest and most desperately contested engagement within my knowledge.',
          who: 'Gen. Braxton Bragg', role: 'Commander, Army of Mississippi', side: 'confederate',
          date: 'October 1862', source: 'Official report, Official Records', portrait: 'bragg', verified: true, ref: 'https://archive.org/details/warofrebellion161unit?q=%22For%20the%20time%20engaged%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'brandy-station',
      name: 'Brandy Station',
      start: '1863-06-09', end: '1863-06-09',
      lat: 38.520, lng: -77.880,
      place: 'Culpeper County, Virginia',
      theater: 'Eastern',
      result: 'inconclusive',
      campaign: 'gettysburg',
      commanders: { union: 'Maj. Gen. Alfred Pleasonton', confederate: 'Maj. Gen. J. E. B. Stuart' },
      forces: { union: 'about 11,000', confederate: 'about 9,500' },
      casualties: { union: 907, confederate: 523 },
      summary: 'Pleasonton\'s cavalry crossed the Rappahannock at dawn in two columns and surprised Stuart\'s horsemen, who had held a grand review the day before. Fourteen hours of charges and countercharges swirled around Fleetwood Hill, with sabers used more than in any other battle of the war. Stuart held the field, but the Richmond papers mocked him for being caught napping, and the Union cavalry discovered it could fight its Southern rivals on equal terms.',
      significance: 'The largest cavalry battle ever fought in North America and the opening clash of the Gettysburg Campaign.',
      images: [
        img('J.E.B. Stuart.jpg', 'Maj. Gen. J. E. B. Stuart, commander of Lee\'s cavalry.', 'Photograph, c. 1863. Library of Congress.')
      ],
      journal: [
        {
          quote: 'It made the Federal cavalry. Up to that time confessedly inferior to the Southern horsemen, they gained on this day that confidence in themselves and in their commanders which enabled them to contest so fiercely the subsequent battle-fields of June, July, and October.',
          who: 'Maj. Henry B. McClellan', role: 'Stuart\'s adjutant general, on the battle\'s effect', side: 'confederate',
          date: 'Recalled, 1885', source: 'The Life and Campaigns of Major-General J. E. B. Stuart (1885)', verified: true, ref: 'https://archive.org/details/lifecampaignsofm00mccl?q=%22It%20made%20the%20Federal%22', refTitle: 'H. B. McClellan, The Life and Campaigns of Major-General J. E. B. Stuart (1885)'
        },
        {
          quote: 'This much puffed cavalry of Northern Virginia has been twice, if not three times, surprised since the battles of December, and such repeated accidents can be regarded as nothing but the necessary consequences of negligence and bad management.',
          who: 'Richmond Examiner', role: 'Editorial criticizing Stuart', side: 'civilian',
          date: 'June 12, 1863', source: 'Richmond Examiner', verified: true, ref: 'https://archive.org/details/sabresandspursf00denigoog?q=%22This%20much%20puffed%20cavalry%22', refTitle: 'Frederic Denison, Sabres and Spurs (1876), quoting the editorial'
        }
      ]
    },
    {
      id: 'champion-hill',
      name: 'Champion Hill',
      start: '1863-05-16', end: '1863-05-16',
      lat: 32.370, lng: -90.500,
      place: 'Hinds County, Mississippi',
      theater: 'Western',
      result: 'union',
      campaign: 'vicksburg',
      commanders: { union: 'Maj. Gen. Ulysses S. Grant', confederate: 'Lt. Gen. John C. Pemberton' },
      forces: { union: 'about 32,000', confederate: 'about 22,000' },
      casualties: { union: 2441, confederate: 3840 },
      summary: 'Pemberton marched out of Vicksburg to cut Grant\'s supply line, not realizing Grant had none, and the armies collided on a wooded ridge between Jackson and Vicksburg. The crest changed hands three times in savage fighting. By late afternoon Pemberton\'s line broke; one of his three divisions was cut off and never rejoined him. The rest fled across the Big Black River into the Vicksburg defenses.',
      significance: 'The decisive battle of the Vicksburg Campaign. After Champion Hill the city\'s fall was only a matter of time.',
      images: [
        img('Battle of Champion-Hills. - DPLA - d72cefd7f9b00e74c6c511eb46fec65d.jpg', 'Battle of Champion Hills, Mississippi, May 16, 1863.', 'Kurz & Allison chromolithograph, 1887. Digital Public Library of America.')
      ],
      journal: [
        {
          quote: 'I cannot think of this bloody hill without sadness and pride.',
          who: 'Brig. Gen. Alvin P. Hovey', role: 'Union division commander whose men took the crest', side: 'union',
          date: 'May 1863', source: 'Official report, Official Records', verified: true, ref: 'https://archive.org/details/warofrebellion242unit?q=%22cannot%20think%20of%20this%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'port-hudson',
      name: 'Siege of Port Hudson',
      start: '1863-05-22', end: '1863-07-09',
      lat: 30.690, lng: -91.280,
      place: 'East Feliciana Parish, Louisiana',
      theater: 'Western',
      result: 'union',
      commanders: { union: 'Maj. Gen. Nathaniel P. Banks', confederate: 'Maj. Gen. Franklin Gardner' },
      forces: { union: 'about 30,000', confederate: 'about 7,500' },
      casualties: { union: 5000, confederate: 7208, note: 'Confederate figure includes about 6,500 men surrendered. Thousands of Union soldiers also fell sick in the Louisiana heat.' },
      summary: 'While Grant invested Vicksburg, Banks besieged the Confederacy\'s other Mississippi River stronghold. Two frontal assaults failed with heavy loss; in the first, on May 27, the 1st and 3rd Louisiana Native Guards, Black regiments raised in New Orleans, charged repeatedly over open ground under fire. Forty-eight days of siege followed. When Gardner learned Vicksburg had fallen, he surrendered.',
      significance: 'Its surrender opened the whole Mississippi to Union shipping, and the Native Guards\' assault was the first large-scale test of Black soldiers in battle.',
      images: [
        img('Siege of Port Hudson.jpg', 'Siege of Port Hudson, Louisiana, May–July 1863.', 'Public domain.')
      ],
      journal: [
        {
          quote: 'The position occupied by these troops was one of importance, and called for the utmost steadiness and bravery … Whatever doubt may have existed heretofore as to the efficiency of organizations of this character, the history of this day proves conclusively to those who were in condition to observe the conduct of these regiments, that the Government will find in this class of troops effective supporters and defenders.',
          who: 'Maj. Gen. Nathaniel P. Banks', role: 'On the Louisiana Native Guards\' assault of May 27', side: 'union',
          date: 'May 30, 1863', source: 'Report to Gen. Halleck, Official Records', portrait: 'banks', verified: true, ref: 'https://archive.org/details/cu31924079575225?q=%22The%20position%20occupied%20by%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'fort-pillow',
      name: 'Fort Pillow',
      start: '1864-04-12', end: '1864-04-12',
      lat: 35.630, lng: -89.840,
      place: 'Lauderdale County, Tennessee, on the Mississippi River',
      theater: 'Western',
      result: 'confederate',
      commanders: { union: 'Maj. Lionel F. Booth (killed), Maj. William F. Bradford', confederate: 'Maj. Gen. Nathan Bedford Forrest' },
      forces: { union: 'about 600, roughly half of them Black soldiers', confederate: 'about 1,500' },
      casualties: { union: 549, confederate: 100, note: 'About 350 of the garrison were killed, a death rate far higher than in any ordinary battle. Black soldiers died at roughly twice the rate of white soldiers.' },
      summary: 'Forrest\'s cavalry surrounded the small river fort, garrisoned by Black artillerymen and white Tennessee Unionists. After a demand for surrender was refused, the Confederates stormed the works. What followed was a massacre: survivors on both sides testified that many Union soldiers were shot, bayoneted, or clubbed after they had thrown down their arms, some while trying to surrender, some in the river. A congressional investigation documented the killings.',
      significance: 'The most notorious atrocity of the war. "Remember Fort Pillow" became a battle cry for Black regiments, and the massacre hardened Northern resolve against the Confederacy.',
      images: [
        img('P15138coll3 4 full - TSLA - Kurz & Allen 1892 Fort Pillow Massacre.jpg', 'The Fort Pillow Massacre, April 12, 1864.', 'Kurz & Allison chromolithograph, 1892. Tennessee State Library and Archives.')
      ],
      journal: [
        {
          quote: 'The river was dyed with the blood of the slaughtered for two hundred yards. The approximate loss was upward of five hundred killed, but few of the officers escaping … It is hoped that these facts will demonstrate to the Northern people that negro soldiers cannot cope with Southerners.',
          who: 'Maj. Gen. Nathan Bedford Forrest', role: 'Commander of the Confederate cavalry at Fort Pillow', side: 'confederate',
          date: 'April 15, 1864', source: 'Report to Lt. Gen. Leonidas Polk, Official Records', portrait: 'forrest', verified: true, ref: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant/Chapter_XLVII', refTitle: 'Personal Memoirs of U. S. Grant, chapter 47, quoting the dispatch (Wikisource transcription)'
        },
        {
          quote: 'If there has been the massacre of three hundred there, or even the tenth part of three hundred, it will be conclusively proved; and being so proved, the retribution shall as surely come.',
          who: 'President Abraham Lincoln', role: 'Address at the Sanitary Fair, Baltimore', side: 'union',
          date: 'April 18, 1864', source: 'Collected Works of Abraham Lincoln', portrait: 'lincoln', verified: true, ref: 'https://archive.org/details/completeworksvo00lincgoog?q=%22If%20there%20has%20been%22', refTitle: 'Complete Works of Abraham Lincoln, vol. 10 (1894)'
        }
      ]
    },
    {
      id: 'kennesaw-mountain',
      name: 'Kennesaw Mountain',
      start: '1864-06-27', end: '1864-06-27',
      lat: 33.980, lng: -84.580,
      place: 'Cobb County, Georgia',
      theater: 'Western',
      result: 'confederate',
      campaign: 'atlanta',
      commanders: { union: 'Maj. Gen. William T. Sherman', confederate: 'Gen. Joseph E. Johnston' },
      forces: { union: 'about 16,000 in the assault (100,000 present)', confederate: 'about 17,000 engaged (50,000 present)' },
      casualties: { union: 3000, confederate: 1000 },
      summary: 'After two months of flanking Johnston out of one position after another, Sherman tried a frontal assault on the entrenched Confederate line along Kennesaw Mountain. Attacking columns at Pigeon Hill and at the "Dead Angle" on Cheatham Hill were shot down within yards of the works in ninety-degree heat. Sherman called off the attack by noon and went back to flanking; within a week Johnston was retreating to the Chattahoochee.',
      significance: 'Sherman\'s only major defeat of the Atlanta Campaign, and the last time he ordered a frontal assault on fortifications.',
      images: [
        img('Battle of Kenesaw Mountian.png', 'Battle of Kennesaw Mountain, June 27, 1864.', 'Kurz & Allison chromolithograph, 1891. Library of Congress.'),
        img('Joseph E. Johnston, General (Confederate).jpg', 'Gen. Joseph E. Johnston.', 'Public domain.')
      ],
      journal: [
        {
          quote: 'I perceived that the enemy and our own officers had settled down into a conviction that I would not assault fortified lines. All looked to me to "outflank." An army to be efficient must not settle down to one single mode of offence, but must be prepared to execute any plan which promises success.',
          who: 'Maj. Gen. William T. Sherman', role: 'On his decision to attack', side: 'union',
          date: 'September 1864', source: 'Official report of the Atlanta Campaign', portrait: 'sherman', verified: true, ref: 'https://archive.org/details/generalshermans00shergoog?q=%22perceived%20that%20the%20enemy%22', refTitle: 'General Sherman\'s Official Account of His Great March (1865)'
        },
        {
          quote: 'I will ever think that the reason they did not capture our works was the impossibility of their living men passing over the bodies of their dead.',
          who: 'Pvt. Sam Watkins', role: 'Company H, 1st Tennessee Infantry, at the Dead Angle', side: 'confederate',
          date: 'June 27, 1864 (recalled)', source: 'Co. Aytch (1882)', portrait: 'watkins', verified: true, ref: 'https://archive.org/details/maurygrays00watkrich?q=%22will%20ever%20think%20that%22', refTitle: 'Sam R. Watkins, "Co. Aytch" (1900 edition)'
        }
      ]
    },
    {
      id: 'monocacy',
      name: 'Monocacy',
      start: '1864-07-09', end: '1864-07-09',
      lat: 39.370, lng: -77.395,
      place: 'Frederick County, Maryland',
      theater: 'Eastern',
      result: 'confederate',
      campaign: 'early',
      commanders: { union: 'Maj. Gen. Lew Wallace', confederate: 'Lt. Gen. Jubal A. Early' },
      forces: { union: 'about 5,800', confederate: 'about 14,000' },
      casualties: { union: 1294, confederate: 900 },
      summary: 'With Grant\'s army tied down at Petersburg, Lee sent Early\'s corps down the Shenandoah Valley to threaten Washington. Lew Wallace, the future author of Ben-Hur, scraped together a small force and one veteran division and blocked the road at the Monocacy River. Early beat him, but it cost a full day. When Early reached the forts north of Washington on July 11, two divisions of Grant\'s veterans were landing at the wharves, and Lincoln himself stood on the parapet of Fort Stevens under fire.',
      significance: 'The battle that saved Washington. The day Wallace bought let reinforcements reach the capital before Early could attack it.',
      images: [
        img('Battle of Monocacy. LOC 2005625088.jpg', 'Battle of Monocacy, July 9, 1864.', 'Library of Congress.'),
        img('Lew Wallace - Brady-Handy.jpg', 'Maj. Gen. Lew Wallace.', 'Brady-Handy collection, Library of Congress.')
      ],
      journal: [
        {
          quote: 'These men died to save the National Capital, and they did save it.',
          who: 'Maj. Gen. Lew Wallace', role: 'Inscription he proposed for the Union dead at Monocacy', side: 'union',
          date: 'July 1864', source: 'Lew Wallace: An Autobiography (1906)', portrait: 'wallace', verified: true, ref: 'https://archive.org/details/autobiography0002leww?q=%22These%20men%20died%20to%22', refTitle: 'Lew Wallace: An Autobiography (1906)'
        },
        {
          quote: 'If Early had been but one day earlier he might have entered the capital before the arrival of the reinforcements I had sent … General Wallace contributed on this occasion, by the defeat of the troops under him, a greater benefit to the cause than often falls to the lot of a commander of an equal force to render by means of a victory.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'General-in-Chief of the Union armies', side: 'union',
          date: 'Recalled, 1885', source: 'Personal Memoirs of U. S. Grant (1885)', portrait: 'grant', verified: true, ref: 'https://archive.org/details/personalmemoirso02granuoft?q=%22If%20Early%20had%20been%22', refTitle: 'Personal Memoirs of U. S. Grant (1885)'
        }
      ]
    },
    {
      id: 'mobile-bay',
      name: 'Mobile Bay',
      start: '1864-08-05', end: '1864-08-05',
      lat: 30.230, lng: -88.030,
      place: 'Mobile Bay, Alabama',
      theater: 'Western',
      result: 'union',
      commanders: { union: 'Rear Adm. David G. Farragut, Maj. Gen. Gordon Granger', confederate: 'Adm. Franklin Buchanan, Brig. Gen. Richard L. Page' },
      forces: { union: '14 wooden warships and 4 ironclad monitors', confederate: 'Ironclad CSS Tennessee, 3 gunboats, and Forts Morgan and Gaines' },
      casualties: { union: 327, confederate: 1500, note: 'About 90 Union sailors died when the monitor Tecumseh struck a mine and sank in seconds. Most Confederate losses were men captured in the forts.' },
      summary: 'Farragut\'s fleet steamed into the bay past Fort Morgan at dawn, through a field of moored mines, then called torpedoes. The lead monitor Tecumseh struck one and went down with nearly all hands, and the column faltered under the fort\'s guns. Farragut, lashed to the rigging of his flagship Hartford, ordered the fleet forward through the minefield. Inside the bay the ironclad Tennessee fought the whole fleet alone until she was rammed and battered into surrender.',
      significance: 'Closed the last major Confederate port on the Gulf of Mexico and gave the North a victory in a summer of stalemate.',
      images: [
        img('Battle of Mobile Bay.png', 'Battle of Mobile Bay, August 5, 1864.', 'Kurz & Allison chromolithograph, 1890. Library of Congress.'),
        img('Admiral Farragut2.jpg', 'Rear Adm. David G. Farragut.', 'Public domain.')
      ],
      journal: [
        {
          quote: 'Damn the torpedoes! Full speed ahead!',
          who: 'Rear Adm. David G. Farragut', role: 'From the rigging of USS Hartford, as the fleet hesitated in the minefield', side: 'union',
          date: 'August 5, 1864', source: 'As reported by officers of the fleet; the exact words vary by witness', portrait: 'farragut'
        },
        {
          quote: 'The Almighty has smiled upon me once more. I am in Mobile Bay.',
          who: 'Rear Adm. David G. Farragut', role: 'To his wife, that evening', side: 'union',
          date: 'August 5, 1864', source: 'Letter, in Loyall Farragut, The Life of David Glasgow Farragut (1879)', portrait: 'farragut', verified: true, ref: 'https://archive.org/details/lifeofdavidglasg01farr?q=%22The%20Almighty%20has%20smiled%22', refTitle: 'Loyall Farragut, The Life of David Glasgow Farragut (1879)'
        }
      ]
    },
    {
      id: 'cedar-creek',
      name: 'Cedar Creek',
      start: '1864-10-19', end: '1864-10-19',
      lat: 39.020, lng: -78.310,
      place: 'Frederick and Shenandoah Counties, Virginia',
      theater: 'Eastern',
      result: 'union',
      campaign: 'sheridan',
      commanders: { union: 'Maj. Gen. Philip H. Sheridan', confederate: 'Lt. Gen. Jubal A. Early' },
      forces: { union: 'about 31,600', confederate: 'about 21,000' },
      casualties: { union: 5665, confederate: 2910 },
      summary: 'Early\'s army crept through fog before dawn and fell on the sleeping Union camps, routing two corps and capturing eighteen guns. Sheridan, returning from a conference in Washington, heard the firing at Winchester, galloped the twelve miles to the field, and rallied his retreating men along the road. In the late afternoon he counterattacked and swept Early\'s army back through its own captured camps in a rout.',
      significance: 'The last major battle in the Shenandoah Valley. With Atlanta and Mobile Bay, it assured Lincoln\'s re-election three weeks later.',
      images: [
        img('Battle of Cedar Creek by Kurz & Allison.jpg', 'Battle of Cedar Creek, October 19, 1864: Sheridan rallies his army.', 'Kurz & Allison chromolithograph, 1890. Library of Congress.'),
        img('Philip Sheridan - Brady-Handy.jpg', 'Maj. Gen. Philip H. Sheridan.', 'Brady-Handy collection, Library of Congress.')
      ],
      journal: [
        {
          quote: 'Turning what bid fair to be a disaster into a glorious victory stamps Sheridan what I always thought him, one of the ablest of generals.',
          who: 'Lt. Gen. Ulysses S. Grant', role: 'General-in-Chief of the Union armies', side: 'union',
          date: 'October 20, 1864', source: 'Telegram to Secretary of War Stanton, Official Records', portrait: 'grant', verified: true, ref: 'https://archive.org/details/personalrecolle00coangoog?q=%22Turning%20what%20bid%20fair%22', refTitle: 'Personal Recollections of the War of the Rebellion (1891), quoting the telegram'
        },
        {
          quote: 'The Yankees got whipped and we got scared.',
          who: 'Lt. Gen. Jubal A. Early', role: 'Explaining the day\'s reversal to his officers', side: 'confederate',
          date: 'October 19, 1864', source: 'As recorded by Jedediah Hotchkiss, Early\'s mapmaker, in his journal for October 19, 1864, Official Records', portrait: 'early', verified: true, ref: 'https://archive.org/details/warofrebellion431unit_0?q=%22The%20Yankees%20got%20whipped%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    },
    {
      id: 'bentonville',
      name: 'Bentonville',
      start: '1865-03-19', end: '1865-03-21',
      lat: 35.300, lng: -78.320,
      place: 'Johnston County, North Carolina',
      theater: 'Western',
      result: 'union',
      campaign: 'carolinas',
      commanders: { union: 'Maj. Gen. William T. Sherman, Maj. Gen. Henry W. Slocum', confederate: 'Gen. Joseph E. Johnston' },
      forces: { union: 'about 60,000 (16,000 engaged on the first day)', confederate: 'about 21,000' },
      casualties: { union: 1527, confederate: 2606 },
      summary: 'Restored to command, Johnston gathered the remnants of the Army of Tennessee, the Carolina garrisons, and Hardee\'s corps for one last blow at Sherman\'s left wing, marching strung out on muddy roads. His attack on March 19 drove Slocum\'s lead divisions back before a Union line held at nightfall. Sherman\'s whole army arrived the next day, and on March 21 a Union division nearly cut Johnston\'s only line of retreat before Sherman called it back. Johnston slipped away that night.',
      significance: 'The last Confederate offensive of the war. Five weeks later Johnston surrendered to Sherman at Bennett Place.',
      images: [
        img('Battle of Bentonville, engagement on the right LCCN2004661158.jpg', 'Battle of Bentonville, engagement on the right, March 1865.', 'Alfred R. Waud, sketch, 1865. Library of Congress.')
      ],
      journal: [
        {
          quote: 'Sherman\'s course cannot be hindered by the small force I have. I can do no more than annoy him.',
          who: 'Gen. Joseph E. Johnston', role: 'Commander, Confederate forces in the Carolinas', side: 'confederate',
          date: 'March 23, 1865', source: 'Telegram to Gen. Lee, Official Records', portrait: 'jjohnston', verified: true, ref: 'https://archive.org/details/warofrebellionco0047majg_a5h2?q=%22course%20cannot%20be%20hindered%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        },
        {
          quote: 'I think I made a mistake there, and should rapidly have followed Mower\'s lead with the whole of the right wing, which would have brought on a general battle, and it could not have resulted otherwise than successfully to us.',
          who: 'Maj. Gen. William T. Sherman', role: 'On recalling Mower\'s division on March 21', side: 'union',
          date: 'Recalled, 1875', source: 'Memoirs of General W. T. Sherman (1875)', portrait: 'sherman', verified: true, ref: 'https://archive.org/details/memoirsgeneralw01shergoog?q=%22mistake%20there%20and%20should%22', refTitle: 'Memoirs of General William T. Sherman (1875)'
        }
      ]
    },
    {
      id: 'sailors-creek',
      name: 'Sailor\'s Creek',
      start: '1865-04-06', end: '1865-04-06',
      lat: 37.310, lng: -78.230,
      place: 'Amelia and Prince Edward Counties, Virginia',
      theater: 'Eastern',
      result: 'union',
      campaign: 'appomattox',
      commanders: { union: 'Maj. Gen. Philip H. Sheridan, Maj. Gen. Horatio Wright, Maj. Gen. Andrew Humphreys', confederate: 'Lt. Gen. Richard S. Ewell, Lt. Gen. Richard H. Anderson, Maj. Gen. John B. Gordon' },
      forces: { union: 'about 36,000', confederate: 'about 18,500' },
      casualties: { union: 1148, confederate: 7700, note: 'Nearly all Confederate losses were men captured, including eight generals and Lee\'s eldest son, Custis Lee.' },
      summary: 'Three days out of Petersburg, Lee\'s retreating army came apart. Union cavalry and two infantry corps caught the rear third of it, strung out at the crossings of Sailor\'s Creek, and in three separate fights captured almost a quarter of the Army of Northern Virginia. Lee, watching the survivors stream past, asked aloud whether the army had dissolved. Three days later he surrendered at Appomattox.',
      significance: 'The last major battle of the war in Virginia, and the one that made Appomattox inevitable.',
      images: [
        img('April 6. Custer ready for his 3rd charge at Sailors Creek 1865 LCCN2004660781.jpg', 'Custer\'s cavalry ready for its third charge at Sailor\'s Creek, April 6, 1865.', 'Alfred R. Waud, sketch, 1865. Library of Congress.')
      ],
      journal: [
        {
          quote: 'My God! has the army dissolved?',
          who: 'Gen. Robert E. Lee', role: 'Watching the survivors of Ewell\'s and Anderson\'s commands stream past', side: 'confederate',
          date: 'April 6, 1865', source: 'As recorded by Maj. Gen. William Mahone, who was beside him; quoted in Morris Schaff, The Sunset of the Confederacy (1912)', portrait: 'lee', verified: true, ref: 'https://archive.org/details/sunsetofconfeder00scha?q=%22My%20God%20has%20the%22', refTitle: 'Morris Schaff, The Sunset of the Confederacy (1912), quoting Mahone'
        },
        {
          quote: 'If the thing is pressed I think that Lee will surrender.',
          who: 'Maj. Gen. Philip H. Sheridan', role: 'Dispatch to Grant that evening; Lincoln, reading it, wired back: "Let the thing be pressed."', side: 'union',
          date: 'April 6, 1865', source: 'Official Records', portrait: 'sheridan', verified: true, ref: 'https://archive.org/details/warofrebellion463unit?q=%22If%20the%20thing%20is%22', refTitle: 'The War of the Rebellion: Official Records of the Union and Confederate Armies'
        }
      ]
    }
  ];

  // Waypoints: [lat, lng, 'YYYY-MM-DD', 'label']
  const CAMPAIGNS = [
    {
      id: 'henry-donelson', name: 'Forts Henry and Donelson to Shiloh', side: 'union',
      army: 'Army of the Tennessee', commander: 'Ulysses S. Grant',
      start: '1862-02-02', end: '1862-05-30',
      description: 'Grant and the river gunboats moved up the Tennessee and Cumberland Rivers, took both forts, then pushed south to Pittsburg Landing, where the Confederates attacked him at Shiloh.',
      path: [
        [37.005, -89.176, '1862-02-02', 'Cairo, Illinois'],
        [37.083, -88.600, '1862-02-03', 'Paducah'],
        [36.523, -87.983, '1862-02-06', 'Fort Henry falls'],
        [36.483, -87.862, '1862-02-12', 'Fort Donelson invested'],
        [36.483, -87.862, '1862-02-16', 'Fort Donelson surrenders'],
        [35.225, -88.249, '1862-03-17', 'Savannah, Tennessee'],
        [35.138, -88.339, '1862-04-06', 'Shiloh'],
        [34.934, -88.522, '1862-05-30', 'Corinth occupied']
      ]
    },
    {
      id: 'peninsula', name: 'Peninsula Campaign', side: 'union',
      army: 'Army of the Potomac', commander: 'George B. McClellan',
      start: '1862-04-02', end: '1862-07-02',
      description: 'McClellan shipped 100,000 men to Fort Monroe and crept up the Virginia Peninsula toward Richmond. Lee\'s Seven Days counteroffensive drove him back to the James River.',
      path: [
        [37.003, -76.308, '1862-04-02', 'Fort Monroe'],
        [37.238, -76.510, '1862-04-05', 'Siege of Yorktown'],
        [37.238, -76.510, '1862-05-04', 'Yorktown evacuated'],
        [37.271, -76.707, '1862-05-05', 'Williamsburg'],
        [37.560, -77.000, '1862-05-16', 'White House Landing'],
        [37.522, -77.328, '1862-05-31', 'Seven Pines'],
        [37.587, -77.287, '1862-06-27', 'Gaines\' Mill'],
        [37.414, -77.251, '1862-07-01', 'Malvern Hill'],
        [37.310, -77.170, '1862-07-02', 'Harrison\'s Landing']
      ]
    },
    {
      id: 'valley', name: 'Jackson\'s Valley Campaign', side: 'confederate',
      army: 'Valley District, Army of Northern Virginia', commander: 'Thomas J. "Stonewall" Jackson',
      start: '1862-03-23', end: '1862-06-09',
      description: 'With about 17,000 men, Jackson marched 650 miles in 48 days, fought six battles, and tied down three Union armies that would otherwise have reinforced McClellan outside Richmond.',
      path: [
        [39.140, -78.190, '1862-03-23', 'Kernstown'],
        [38.746, -78.641, '1862-04-17', 'Mount Jackson'],
        [38.370, -78.600, '1862-04-30', 'Swift Run Gap'],
        [38.333, -79.492, '1862-05-08', 'McDowell'],
        [38.450, -78.869, '1862-05-14', 'Harrisonburg'],
        [38.648, -78.671, '1862-05-20', 'New Market'],
        [38.918, -78.194, '1862-05-23', 'Front Royal'],
        [39.185, -78.163, '1862-05-25', 'First Winchester'],
        [39.290, -77.860, '1862-05-29', 'Charles Town'],
        [38.988, -78.359, '1862-06-01', 'Strasburg'],
        [38.450, -78.869, '1862-06-06', 'Harrisonburg'],
        [38.370, -78.840, '1862-06-08', 'Cross Keys'],
        [38.310, -78.810, '1862-06-09', 'Port Republic']
      ]
    },
    {
      id: 'maryland', name: 'Maryland Campaign (Lee)', side: 'confederate',
      army: 'Army of Northern Virginia', commander: 'Robert E. Lee',
      start: '1862-09-02', end: '1862-09-19',
      description: 'Fresh from Second Manassas, Lee crossed the Potomac to carry the war north, supply his army from Maryland farms, and perhaps win foreign recognition. The campaign ended at Antietam.',
      path: [
        [38.840, -77.430, '1862-09-02', 'Chantilly'],
        [39.115, -77.564, '1862-09-04', 'Leesburg'],
        [39.190, -77.490, '1862-09-05', 'White\'s Ford, Potomac crossing'],
        [39.414, -77.410, '1862-09-07', 'Frederick'],
        [39.642, -77.720, '1862-09-11', 'Hagerstown'],
        [39.457, -77.750, '1862-09-15', 'Sharpsburg'],
        [39.473, -77.744, '1862-09-17', 'Antietam'],
        [39.430, -77.800, '1862-09-19', 'Recrossing at Shepherdstown']
      ]
    },
    {
      id: 'maryland-union', name: 'Maryland Campaign (McClellan)', side: 'union',
      army: 'Army of the Potomac', commander: 'George B. McClellan',
      start: '1862-09-05', end: '1862-09-17',
      description: 'McClellan moved cautiously out of Washington until a lost copy of Lee\'s orders, found in a field near Frederick, told him the Confederate army was divided.',
      path: [
        [38.900, -77.040, '1862-09-05', 'Washington'],
        [39.084, -77.153, '1862-09-07', 'Rockville'],
        [39.414, -77.410, '1862-09-12', 'Frederick; Lost Order found'],
        [39.490, -77.620, '1862-09-14', 'South Mountain'],
        [39.473, -77.744, '1862-09-17', 'Antietam']
      ]
    },
    {
      id: 'kentucky', name: 'Bragg\'s Kentucky Invasion', side: 'confederate',
      army: 'Army of Mississippi / Army of Tennessee', commander: 'Braxton Bragg',
      start: '1862-08-28', end: '1862-12-31',
      description: 'Bragg marched north from Chattanooga hoping to bring Kentucky into the Confederacy. After the drawn Battle of Perryville he fell back to Tennessee and met Rosecrans at Stones River.',
      path: [
        [35.046, -85.310, '1862-08-28', 'Chattanooga'],
        [35.926, -85.465, '1862-09-05', 'Sparta'],
        [36.996, -85.912, '1862-09-13', 'Glasgow, Kentucky'],
        [37.272, -85.891, '1862-09-17', 'Munfordville surrenders'],
        [37.809, -85.467, '1862-09-22', 'Bardstown'],
        [37.670, -84.970, '1862-10-08', 'Perryville'],
        [36.600, -83.670, '1862-10-20', 'Cumberland Gap'],
        [35.960, -83.920, '1862-10-26', 'Knoxville'],
        [35.846, -86.392, '1862-11-20', 'Murfreesboro'],
        [35.878, -86.432, '1862-12-31', 'Stones River']
      ]
    },
    {
      id: 'vicksburg', name: 'Vicksburg Campaign', side: 'union',
      army: 'Army of the Tennessee', commander: 'Ulysses S. Grant',
      start: '1863-03-29', end: '1863-07-04',
      description: 'Grant marched down the west bank, crossed the Mississippi below the city, and in seventeen days marched 180 miles and won five battles before sealing Vicksburg from the east.',
      path: [
        [32.500, -91.100, '1863-03-29', 'Milliken\'s Bend'],
        [32.030, -91.100, '1863-04-28', 'Hard Times Landing'],
        [31.930, -91.170, '1863-04-30', 'Bruinsburg crossing'],
        [31.960, -90.980, '1863-05-01', 'Port Gibson'],
        [32.260, -90.420, '1863-05-12', 'Raymond'],
        [32.300, -90.180, '1863-05-14', 'Jackson captured'],
        [32.370, -90.500, '1863-05-16', 'Champion Hill'],
        [32.370, -90.650, '1863-05-17', 'Big Black River Bridge'],
        [32.346, -90.858, '1863-05-18', 'Siege of Vicksburg begins'],
        [32.346, -90.858, '1863-07-04', 'Vicksburg surrenders']
      ]
    },
    {
      id: 'gettysburg', name: 'Gettysburg Campaign (Lee)', side: 'confederate',
      army: 'Army of Northern Virginia', commander: 'Robert E. Lee',
      start: '1863-06-03', end: '1863-07-16',
      description: 'Lee marched north through the Shenandoah Valley into Pennsylvania, 75,000 strong, to take the war out of Virginia and threaten Harrisburg and Philadelphia.',
      path: [
        [38.300, -77.470, '1863-06-03', 'Fredericksburg'],
        [38.473, -78.000, '1863-06-08', 'Culpeper'],
        [38.918, -78.194, '1863-06-12', 'Front Royal'],
        [39.185, -78.163, '1863-06-14', 'Second Winchester'],
        [39.600, -77.820, '1863-06-19', 'Williamsport, Potomac crossing'],
        [39.642, -77.720, '1863-06-22', 'Hagerstown'],
        [39.937, -77.661, '1863-06-26', 'Chambersburg'],
        [39.880, -77.360, '1863-06-30', 'Cashtown'],
        [39.811, -77.225, '1863-07-01', 'Gettysburg'],
        [39.790, -77.370, '1863-07-05', 'Retreat via Fairfield'],
        [39.642, -77.720, '1863-07-07', 'Hagerstown'],
        [39.600, -77.820, '1863-07-13', 'Williamsport, recrossing'],
        [39.185, -78.163, '1863-07-16', 'Winchester']
      ]
    },
    {
      id: 'gettysburg-union', name: 'Gettysburg Campaign (Hooker and Meade)', side: 'union',
      army: 'Army of the Potomac', commander: 'Joseph Hooker, then George G. Meade',
      start: '1863-06-13', end: '1863-07-14',
      description: 'The Union army shadowed Lee northward, keeping between him and Washington. Meade replaced Hooker on June 28, three days before the armies met at Gettysburg.',
      path: [
        [38.320, -77.470, '1863-06-13', 'Falmouth'],
        [38.846, -77.306, '1863-06-16', 'Fairfax Court House'],
        [39.115, -77.564, '1863-06-20', 'Leesburg'],
        [39.150, -77.480, '1863-06-25', 'Edwards Ferry, Potomac crossing'],
        [39.414, -77.410, '1863-06-28', 'Frederick; Meade takes command'],
        [39.655, -77.174, '1863-06-30', 'Taneytown'],
        [39.811, -77.225, '1863-07-01', 'Gettysburg'],
        [39.414, -77.410, '1863-07-07', 'Frederick'],
        [39.580, -77.800, '1863-07-14', 'Williamsport; Lee escapes']
      ]
    },
    {
      id: 'tullahoma', name: 'Tullahoma, Chickamauga and Chattanooga', side: 'union',
      army: 'Army of the Cumberland', commander: 'William S. Rosecrans, then Ulysses S. Grant',
      start: '1863-06-24', end: '1863-11-25',
      description: 'Rosecrans maneuvered Bragg out of middle Tennessee and Chattanooga almost without a fight, was beaten at Chickamauga, and was besieged until Grant arrived and stormed Missionary Ridge.',
      path: [
        [35.846, -86.392, '1863-06-24', 'Murfreesboro'],
        [35.362, -86.209, '1863-07-01', 'Tullahoma'],
        [34.869, -85.839, '1863-08-20', 'Stevenson, Alabama'],
        [35.046, -85.310, '1863-09-09', 'Chattanooga occupied'],
        [34.940, -85.260, '1863-09-19', 'Chickamauga'],
        [35.046, -85.310, '1863-09-22', 'Besieged in Chattanooga'],
        [35.030, -85.300, '1863-11-25', 'Missionary Ridge']
      ]
    },
    {
      id: 'overland', name: 'Overland Campaign (Grant)', side: 'union',
      army: 'Army of the Potomac', commander: 'Ulysses S. Grant and George G. Meade',
      start: '1864-05-03', end: '1864-06-15',
      description: 'Grant crossed the Rapidan and fought Lee nearly every day for six weeks, sliding south after each battle until he crossed the James and pinned Lee at Petersburg. Union losses topped 55,000.',
      path: [
        [38.473, -78.000, '1864-05-03', 'Culpeper'],
        [38.370, -77.770, '1864-05-04', 'Germanna Ford'],
        [38.318, -77.736, '1864-05-05', 'The Wilderness'],
        [38.221, -77.611, '1864-05-08', 'Spotsylvania'],
        [37.960, -77.470, '1864-05-23', 'North Anna'],
        [37.650, -77.330, '1864-05-29', 'Totopotomoy Creek'],
        [37.590, -77.287, '1864-06-01', 'Cold Harbor'],
        [37.260, -77.100, '1864-06-14', 'James River crossing'],
        [37.228, -77.370, '1864-06-15', 'Petersburg']
      ]
    },
    {
      id: 'overland-lee', name: 'Overland Campaign (Lee)', side: 'confederate',
      army: 'Army of Northern Virginia', commander: 'Robert E. Lee',
      start: '1864-05-03', end: '1864-06-18',
      description: 'Lee parried each of Grant\'s moves, always reaching the next crossroads first, but could never again break free of the Union army.',
      path: [
        [38.246, -78.111, '1864-05-03', 'Orange Court House'],
        [38.318, -77.736, '1864-05-05', 'The Wilderness'],
        [38.221, -77.611, '1864-05-08', 'Spotsylvania'],
        [37.930, -77.450, '1864-05-22', 'Hanover Junction'],
        [37.590, -77.287, '1864-06-01', 'Cold Harbor'],
        [37.228, -77.370, '1864-06-18', 'Petersburg']
      ]
    },
    {
      id: 'atlanta', name: 'Atlanta Campaign', side: 'union',
      army: 'Military Division of the Mississippi', commander: 'William T. Sherman',
      start: '1864-05-05', end: '1864-09-02',
      description: 'Sherman\'s three armies flanked Joseph Johnston out of one mountain position after another along the Western & Atlantic Railroad, then fought Hood for the city.',
      path: [
        [35.046, -85.310, '1864-05-05', 'Chattanooga'],
        [34.770, -84.970, '1864-05-08', 'Rocky Face Ridge'],
        [34.580, -84.940, '1864-05-14', 'Resaca'],
        [34.240, -84.850, '1864-05-19', 'Cassville'],
        [33.930, -84.840, '1864-05-25', 'New Hope Church'],
        [33.980, -84.580, '1864-06-27', 'Kennesaw Mountain'],
        [33.900, -84.450, '1864-07-09', 'Chattahoochee crossing'],
        [33.800, -84.400, '1864-07-20', 'Peachtree Creek'],
        [33.749, -84.388, '1864-07-22', 'Battle of Atlanta'],
        [33.520, -84.350, '1864-08-31', 'Jonesboro'],
        [33.749, -84.388, '1864-09-02', 'Atlanta occupied']
      ]
    },
    {
      id: 'march-to-the-sea', name: 'March to the Sea', side: 'union',
      army: 'Armies of the Tennessee and Georgia', commander: 'William T. Sherman',
      start: '1864-11-15', end: '1864-12-21',
      description: 'Sherman abandoned his supply line and marched 285 miles from Atlanta to Savannah in five weeks, destroying the railroads and resources of central Georgia.',
      path: [
        [33.749, -84.388, '1864-11-15', 'Atlanta'],
        [33.597, -83.860, '1864-11-18', 'Covington'],
        [33.080, -83.232, '1864-11-23', 'Milledgeville, state capital'],
        [32.983, -82.810, '1864-11-26', 'Sandersville'],
        [32.803, -81.949, '1864-12-03', 'Millen'],
        [31.890, -81.200, '1864-12-13', 'Fort McAllister stormed'],
        [32.081, -81.091, '1864-12-21', 'Savannah occupied']
      ]
    },
    {
      id: 'carolinas', name: 'Carolinas Campaign', side: 'union',
      army: 'Armies of the Tennessee and Georgia', commander: 'William T. Sherman',
      start: '1865-02-01', end: '1865-04-26',
      description: 'Sherman turned north through the swamps of South Carolina, burned Columbia, beat Johnston at Bentonville, and accepted the surrender of the last major Confederate army at Bennett Place.',
      path: [
        [32.081, -81.091, '1865-02-01', 'Savannah'],
        [32.650, -80.800, '1865-02-02', 'Pocotaligo'],
        [34.000, -81.035, '1865-02-17', 'Columbia burns'],
        [34.698, -79.883, '1865-03-03', 'Cheraw'],
        [35.053, -78.878, '1865-03-11', 'Fayetteville'],
        [35.270, -78.650, '1865-03-16', 'Averasboro'],
        [35.300, -78.320, '1865-03-19', 'Bentonville'],
        [35.385, -77.993, '1865-03-23', 'Goldsboro'],
        [35.780, -78.639, '1865-04-13', 'Raleigh'],
        [36.030, -78.970, '1865-04-26', 'Bennett Place; Johnston surrenders']
      ]
    },
    {
      id: 'hood', name: 'Hood\'s Tennessee Campaign', side: 'confederate',
      army: 'Army of Tennessee', commander: 'John Bell Hood',
      start: '1864-11-21', end: '1864-12-27',
      description: 'Hood marched north into Tennessee hoping to retake Nashville and draw Sherman out of Georgia. His army was wrecked at Franklin and destroyed at Nashville.',
      path: [
        [34.800, -87.677, '1864-11-21', 'Florence, Alabama'],
        [35.615, -87.035, '1864-11-27', 'Columbia'],
        [35.751, -86.930, '1864-11-29', 'Spring Hill'],
        [35.912, -86.868, '1864-11-30', 'Franklin'],
        [36.140, -86.780, '1864-12-02', 'Before Nashville'],
        [36.140, -86.780, '1864-12-16', 'Routed at Nashville'],
        [35.912, -86.868, '1864-12-17', 'Franklin'],
        [35.615, -87.035, '1864-12-20', 'Columbia'],
        [35.200, -87.030, '1864-12-24', 'Pulaski'],
        [34.730, -87.700, '1864-12-27', 'Recrossing the Tennessee']
      ]
    },
    {
      id: 'appomattox', name: 'Appomattox Campaign (Lee\'s retreat)', side: 'confederate',
      army: 'Army of Northern Virginia', commander: 'Robert E. Lee',
      start: '1865-04-02', end: '1865-04-09',
      description: 'Lee\'s army fled west from Petersburg and Richmond toward the Danville railroad. Rations failed to arrive at Amelia, a quarter of the army was lost at Sailor\'s Creek, and the rest was cut off at Appomattox.',
      path: [
        [37.228, -77.370, '1865-04-02', 'Petersburg abandoned'],
        [37.342, -77.980, '1865-04-04', 'Amelia Court House'],
        [37.300, -78.230, '1865-04-06', 'Sailor\'s Creek'],
        [37.302, -78.392, '1865-04-07', 'Farmville'],
        [37.377, -78.796, '1865-04-09', 'Appomattox Court House']
      ]
    },
    {
      id: 'appomattox-union', name: 'Appomattox Campaign (Grant\'s pursuit)', side: 'union',
      army: 'Army of the Potomac and Army of the James', commander: 'Ulysses S. Grant and Philip Sheridan',
      start: '1865-04-03', end: '1865-04-09',
      description: 'Sheridan\'s cavalry and the Union infantry raced along the south side of Lee\'s line of retreat, seizing his supplies and blocking the road west.',
      path: [
        [37.228, -77.370, '1865-04-03', 'Petersburg'],
        [37.320, -77.930, '1865-04-05', 'Jetersville'],
        [37.300, -78.230, '1865-04-06', 'Sailor\'s Creek'],
        [37.302, -78.392, '1865-04-07', 'Farmville'],
        [37.360, -78.830, '1865-04-08', 'Appomattox Station'],
        [37.377, -78.796, '1865-04-09', 'Appomattox Court House']
      ]
    },
    {
      id: 'corinth', name: 'Johnston\'s Concentration at Corinth', side: 'confederate',
      army: 'Army of Mississippi', commander: 'Albert Sidney Johnston',
      start: '1862-02-11', end: '1862-04-08',
      description: 'After Fort Donelson fell, Johnston gave up Kentucky and Nashville, marched his army south, and joined Beauregard and troops from the Gulf coast at Corinth, Mississippi. From there he marched out to surprise Grant at Shiloh.',
      path: [
        [36.990, -86.444, '1862-02-11', 'Bowling Green, Kentucky'],
        [36.160, -86.780, '1862-02-17', 'Nashville abandoned'],
        [35.846, -86.392, '1862-02-23', 'Murfreesboro'],
        [34.606, -86.983, '1862-03-10', 'Decatur, Alabama'],
        [34.934, -88.522, '1862-03-24', 'Corinth'],
        [35.138, -88.339, '1862-04-06', 'Shiloh'],
        [34.934, -88.522, '1862-04-08', 'Retreat to Corinth']
      ]
    },
    {
      id: 'northern-virginia', name: 'Northern Virginia Campaign (Second Manassas)', side: 'confederate',
      army: 'Army of Northern Virginia', commander: 'Robert E. Lee and Thomas J. Jackson',
      start: '1862-07-13', end: '1862-09-01',
      description: 'With McClellan stalled on the James, Lee sent Jackson north to meet Pope\'s new Army of Virginia, then followed with Longstreet. Jackson\'s fifty-mile march around Pope\'s flank to Manassas Junction set up the battle of Second Manassas.',
      path: [
        [37.540, -77.436, '1862-07-13', 'Richmond'],
        [38.137, -78.188, '1862-07-19', 'Gordonsville'],
        [38.400, -78.070, '1862-08-09', 'Cedar Mountain'],
        [38.630, -77.900, '1862-08-24', 'Rappahannock River'],
        [38.850, -77.960, '1862-08-25', 'Salem; Jackson\'s flank march'],
        [38.820, -77.710, '1862-08-26', 'Thoroughfare Gap'],
        [38.750, -77.470, '1862-08-27', 'Manassas Junction depot burned'],
        [38.825, -77.545, '1862-08-28', 'Second Manassas'],
        [38.840, -77.430, '1862-09-01', 'Chantilly']
      ]
    },
    {
      id: 'early', name: 'Early\'s Valley Campaign and Raid on Washington', side: 'confederate',
      army: 'Army of the Valley (Second Corps)', commander: 'Jubal A. Early',
      start: '1864-06-13', end: '1864-10-19',
      description: 'Lee detached Early\'s corps to save Lynchburg, clear the Shenandoah Valley, and threaten Washington. Early reached the capital\'s forts, then fell back to the Valley, where Sheridan destroyed his army in the autumn.',
      path: [
        [37.590, -77.287, '1864-06-13', 'Leaves Lee\'s lines near Cold Harbor'],
        [37.414, -79.143, '1864-06-18', 'Lynchburg'],
        [38.150, -79.072, '1864-06-27', 'Staunton'],
        [39.185, -78.163, '1864-07-02', 'Winchester'],
        [39.325, -77.730, '1864-07-04', 'Harpers Ferry'],
        [39.370, -77.395, '1864-07-09', 'Monocacy'],
        [38.964, -77.028, '1864-07-11', 'Fort Stevens, outskirts of Washington'],
        [39.115, -77.564, '1864-07-14', 'Recrosses the Potomac near Leesburg'],
        [39.140, -78.190, '1864-07-24', 'Second Kernstown'],
        [39.185, -78.163, '1864-09-19', 'Third Winchester'],
        [38.950, -78.400, '1864-09-22', 'Fisher\'s Hill'],
        [38.260, -78.700, '1864-09-28', 'Brown\'s Gap'],
        [39.020, -78.310, '1864-10-19', 'Cedar Creek']
      ]
    },
    {
      id: 'sheridan', name: 'Sheridan\'s Shenandoah Campaign', side: 'union',
      army: 'Army of the Shenandoah', commander: 'Philip H. Sheridan',
      start: '1864-08-07', end: '1864-10-19',
      description: 'Grant sent Sheridan to drive Early from the Valley and strip it of the crops that fed Lee\'s army. After victories at Winchester and Fisher\'s Hill, Sheridan\'s men burned barns and mills from Staunton north in "The Burning," then crushed Early at Cedar Creek.',
      path: [
        [39.325, -77.730, '1864-08-07', 'Harpers Ferry'],
        [39.150, -77.980, '1864-08-10', 'Berryville'],
        [39.300, -77.780, '1864-08-22', 'Halltown'],
        [39.150, -77.980, '1864-09-03', 'Berryville'],
        [39.185, -78.163, '1864-09-19', 'Third Winchester'],
        [38.950, -78.400, '1864-09-22', 'Fisher\'s Hill'],
        [38.450, -78.869, '1864-09-25', 'Harrisonburg'],
        [38.650, -78.670, '1864-10-07', 'The Burning; withdrawing north'],
        [39.020, -78.310, '1864-10-19', 'Cedar Creek']
      ]
    }
  ];

  const EVENTS = [
    { date: '1861-04-15', title: 'Lincoln calls for 75,000 volunteers' },
    { date: '1861-05-20', title: 'North Carolina secedes, the last of eleven states' },
    { date: '1862-04-16', title: 'Confederacy enacts the first national draft in American history' },
    { date: '1863-03-03', title: 'Union Enrollment Act creates a Northern draft' },
    { date: '1864-07-11', title: 'Early\'s troops reach Fort Stevens; Lincoln comes under fire' },
    { date: '1861-07-25', title: 'McClellan takes command in Washington' },
    { date: '1862-03-09', title: 'Monitor and Virginia fight at Hampton Roads' },
    { date: '1862-09-22', title: 'Preliminary Emancipation Proclamation issued' },
    { date: '1863-01-01', title: 'Emancipation Proclamation takes effect' },
    { date: '1863-05-22', title: 'Bureau of Colored Troops established' },
    { date: '1863-07-13', title: 'New York City draft riots begin' },
    { date: '1863-11-19', title: 'Lincoln delivers the Gettysburg Address' },
    { date: '1864-03-09', title: 'Grant commissioned lieutenant general and general-in-chief' },
    { date: '1864-11-08', title: 'Lincoln re-elected' },
    { date: '1865-01-31', title: 'Congress passes the Thirteenth Amendment' },
    { date: '1865-04-03', title: 'Richmond falls' },
    { date: '1865-04-14', title: 'Lincoln shot at Ford\'s Theatre' },
    { date: '1865-04-26', title: 'Johnston surrenders to Sherman at Bennett Place' }
  ];

  const SOURCES = [
    { title: 'Personal Memoirs of U. S. Grant', author: 'Ulysses S. Grant', year: 1885, url: 'https://en.wikisource.org/wiki/Personal_Memoirs_of_U._S._Grant' },
    { title: 'Memoirs of General W. T. Sherman', author: 'William T. Sherman', year: 1875, url: 'https://archive.org/details/memoirsgeneralw01shergoog' },
    { title: 'General Sherman\'s Official Account of His Great March', author: 'William T. Sherman', year: 1865, url: 'https://archive.org/details/generalshermans00shergoog' },
    { title: 'Co. Aytch: A Side Show of the Big Show', author: 'Sam R. Watkins', year: 1882, url: 'https://archive.org/details/bub_gb_ssIdAQAAMAAJ' },
    { title: 'A Diary from Dixie', author: 'Mary Boykin Chesnut', year: 1905, url: 'https://docsouth.unc.edu/southlit/chesnut/maryches.html' },
    { title: 'All for the Union: The Civil War Diary and Letters of Elisha Hunt Rhodes', author: 'Elisha Hunt Rhodes', year: 1985, url: 'https://archive.org/search?query=All+for+the+Union+Elisha+Hunt+Rhodes' },
    { title: 'Battles and Leaders of the Civil War (4 vols.)', author: 'Robert U. Johnson and Clarence C. Buel, eds.', year: 1887, url: 'https://archive.org/details/battlesleadersof03cent' },
    { title: 'Campaigning with Grant', author: 'Horace Porter', year: 1897, url: 'https://archive.org/details/cu31924030927002' },
    { title: 'The Passing of the Armies', author: 'Joshua L. Chamberlain', year: 1915, url: 'https://archive.org/details/bwb_S0-BGJ-081' },
    { title: 'Strong Vincent and His Brigade at Gettysburg (reprints Chamberlain\'s official report)', author: 'Oliver W. Norton', year: 1909, url: 'https://archive.org/details/strongvincentan00nortgoog' },
    { title: 'My Cave Life in Vicksburg', author: 'Mary Ann Loughborough', year: 1864, url: 'https://archive.org/details/mycavelifeinvic00louggoog' },
    { title: 'Advance and Retreat', author: 'John Bell Hood', year: 1880, url: 'https://archive.org/details/advanceretreatpe00hood' },
    { title: 'Three Months in the Southern States', author: 'Arthur J. L. Fremantle', year: 1863, url: 'https://docsouth.unc.edu/imls/fremantle/fremantle.html' },
    { title: 'Hammer and Rapier', author: 'John Esten Cooke', year: 1870, url: 'https://archive.org/details/hammerrapier00cook' },
    { title: 'The Campaign of Chancellorsville', author: 'John Bigelow', year: 1910, url: 'https://archive.org/details/campaignofchanc00bige' },
    { title: 'The Sunset of the Confederacy', author: 'Morris Schaff', year: 1912, url: 'https://archive.org/details/sunsetofconfeder00scha' },
    { title: 'Southern Generals, Who They Are, and What They Have Done', author: 'William P. Snow', year: 1865, url: 'https://archive.org/details/southgenerals00snowrich' },
    { title: 'The War of the Rebellion: Official Records of the Union and Confederate Armies', author: 'U.S. War Department', year: 1880, url: 'https://archive.org/search?query=title%3A%28war+of+the+rebellion%29+official+records+union+confederate+armies' },
    { title: 'Official Records of the Union and Confederate Navies', author: 'U.S. Navy Department', year: 1894, url: 'https://archive.org/details/officialrecordso0018unse' },
    { title: 'Sullivan Ballou letter, July 14, 1861', author: 'Sullivan Ballou', year: 1861, url: 'https://en.wikisource.org/wiki/Letter_from_Captain_Sullivan_Ballou_to_His_Wife_Sarah' },
    { title: 'Lewis Douglass to Amelia Loguen, July 20, 1863, in The Journal of Negro History', author: 'Lewis H. Douglass', year: 1926, url: 'https://archive.org/details/sim_journal-of-african-american-history_1926-01_11_1' },
    { title: 'The Gettysburg Address', author: 'Abraham Lincoln', year: 1863, url: 'https://www.loc.gov/exhibits/gettysburg-address/' },
    { title: 'Complete Works of Abraham Lincoln', author: 'John G. Nicolay and John Hay, eds.', year: 1894, url: 'https://archive.org/details/completeworks00lincgoog' },
    { title: 'The Life and Campaigns of Major-General J. E. B. Stuart', author: 'Henry B. McClellan', year: 1885, url: 'https://archive.org/details/lifecampaignsofm00mccl' },
    { title: 'The Fight for Missouri', author: 'Thomas L. Snead', year: 1886, url: 'https://archive.org/details/fightformissouri00snea' },
    { title: 'Civil War on the Western Border, 1854–1865', author: 'Jay Monaghan', year: 1955, url: 'https://archive.org/details/civilwaronwester00mona' },
    { title: 'The Life of David Glasgow Farragut', author: 'Loyall Farragut', year: 1879, url: 'https://archive.org/details/lifeofdavidglasg01farr' },
    { title: 'Lew Wallace: An Autobiography', author: 'Lew Wallace', year: 1906, url: 'https://archive.org/details/autobiography0002leww' },
    { title: 'Fort Pillow Massacre: Report of the Joint Committee on the Conduct of the War', author: 'U.S. Congress', year: 1864, url: 'https://archive.org/details/fortpillowmassac00unit' },
    { title: 'Miscellaneous Papers, 1672–1865 (prints Lt. S. D. Greene\'s letter on the Monitor)', author: 'Rhode Island Historical Society', year: 1887, url: 'https://archive.org/details/miscellaneouspa00unkngoog' },
    { title: 'Touched with Fire: Civil War Letters and Diary of Oliver Wendell Holmes, Jr.', author: 'Mark DeWolfe Howe, ed.', year: 1946, url: 'https://archive.org/details/in.ernet.dli.2015.75551' }
  ];

  const TOURS = [
    {
      id: 'turning-points', title: 'Turning Points of the Civil War', grades: '5–8', minutes: 25,
      question: 'When did the Union start winning the war, and how can you tell from the map?',
      summary: 'Seven stops from Fort Sumter to Appomattox. Students watch the war open as a stalemate in the East, tip in the summer of 1863, and end with one army cornered.',
      stops: [
        { title: 'The first shot', battle: 'fort-sumter', entry: 0,
          text: 'Seven states have already left the Union. When Confederate guns open on a federal fort in Charleston Harbor, a political crisis becomes a war.',
          ask: ['Mary Chesnut was a civilian in Charleston. What does her diary tell you that a general\'s report would not?', 'No one was killed in the bombardment. Why did it still start a war?'] },
        { title: 'Not a short war', battle: 'first-bull-run', entry: 0,
          text: 'Both sides expected one battle to settle everything. Spectators rode out from Washington with picnic baskets. By evening the Union army was running.',
          ask: ['Sullivan Ballou wrote this letter a week before he was killed. What does he think he is fighting for?', 'How might this battle have changed what people in the North and the South expected?'] },
        { title: 'The bloodiest day', battle: 'antietam', entry: 1,
          text: 'Lee carries the war north into Maryland. The battle is a draw, but Lee retreats, and five days later Lincoln announces the Emancipation Proclamation.',
          ask: ['The map shows this battle as "inconclusive." Why do historians still call it a turning point?', 'How did a battle in Maryland change what the war was about?'] },
        { title: 'High-water mark', battle: 'gettysburg', entry: 1,
          text: 'Lee invades the North a second time. Follow the two armies\' routes north on the map: they collide at a Pennsylvania crossroads town for three days.',
          ask: ['Trace Lee\'s route. Why would a Confederate army march into Pennsylvania?', 'What does Lee\'s reaction after Pickett\'s Charge tell you about how he saw the defeat?'] },
        { title: 'The river is cut', battle: 'vicksburg', entry: 1,
          text: 'One day after Gettysburg, Vicksburg surrenders. Zoom out: with the Mississippi in Union hands, the Confederacy is split in two.',
          ask: ['Look at the map. What did the Confederacy lose when it lost the Mississippi River?', 'Two major Union victories came in one week. Which mattered more, and why?'] },
        { title: 'The election', battle: 'atlanta', entry: 0,
          text: 'By summer 1864 the North is tired of war and Lincoln expects to lose re-election. Then Sherman takes Atlanta.',
          ask: ['How could a battle in Georgia affect an election in the North?', 'Sherman wrote that "war is cruelty." What did he mean, and do you agree?'] },
        { title: 'Surrender', battle: 'appomattox', entry: 0,
          text: 'Lee\'s army abandons Richmond and marches west, looking for food and a way out. Grant\'s army gets ahead of it.',
          ask: ['Compare Grant\'s words with Lee\'s farewell order. How does each explain why the war ended?', 'Grant let Lee\'s men keep their horses and go home. Why might that have mattered for the country afterward?'] }
      ]
    },
    {
      id: 'voices', title: 'Voices from the Ranks', grades: '8–12', minutes: 30,
      question: 'How did the people who lived through the war describe it, and how far can we trust what they wrote?',
      summary: 'Six primary sources from a major, a private, a civilian reviewer, a Black sergeant, a staff officer, and a general. Students practice sourcing: who wrote it, when, and why.',
      stops: [
        { title: 'A letter home', battle: 'first-bull-run', entry: 0,
          text: 'Major Sullivan Ballou wrote to his wife from camp a week before the battle that killed him. The letter was never mailed; it was found in his trunk.',
          ask: ['Who was the intended audience? How does that shape the letter\'s tone?', 'This letter was written before the battle. What can it tell us, and what can it not tell us?'] },
        { title: 'A private remembers', battle: 'shiloh', entry: 0,
          text: 'Sam Watkins published his memoir twenty years after the war, writing, as he said, from memory.',
          ask: ['Watkins wrote in 1882 about 1862. What are the strengths and weaknesses of a memoir as evidence?', 'What does he mean by putting "pomp and circumstance" in quotation marks?'] },
        { title: 'The camera arrives', battle: 'antietam', entry: 2,
          text: 'Photographs of the Antietam dead went on display in New York a month after the battle. Scroll down in the full entry to see one.',
          ask: ['Why did photographs affect people differently than newspaper reports or paintings?', 'Compare the photograph with the color print above it, made 26 years later. What does each leave out?'] },
        { title: 'A sergeant of the 54th', battle: 'fort-wagner', entry: 0,
          text: 'Lewis Douglass, son of Frederick Douglass, wrote this two days after the assault on Fort Wagner.',
          ask: ['What is Douglass trying to prove to the reader, and to whom is he proving it?', 'The attack failed. Why did it still matter?'] },
        { title: 'The night before', battle: 'cold-harbor', entry: 0,
          text: 'An officer on Grant\'s staff walks through the camps on the evening before a frontal assault.',
          ask: ['What did the soldiers understand about what was coming?', 'Porter wrote this in 1897. Does that make the detail more or less believable? Why?'] },
        { title: 'Honor answering honor', battle: 'appomattox', entry: 2,
          text: 'Joshua Chamberlain commanded the Union troops who received the formal surrender. He described it fifty years later.',
          ask: ['What tone does Chamberlain take toward the defeated army? Why might he write this way in 1915?', 'What other sources would you want in order to check his account?'] }
      ]
    },
    {
      id: 'rivers-and-rails', title: 'Rivers, Rails, and Strategy', grades: '6–10', minutes: 25,
      question: 'How did rivers, railroads, and coastline shape the way the war was fought?',
      summary: 'A geography tour of the Western theater. Students use the terrain map and army routes to explain why armies went where they did.',
      stops: [
        { title: 'Two rivers into Tennessee', campaign: 'henry-donelson', day: '1862-02-16',
          text: 'The Tennessee and Cumberland Rivers run deep into the Confederacy. Grant\'s army and the Navy\'s gunboats follow them.',
          ask: ['Why were rivers better invasion routes than roads in 1862?', 'What did the Confederacy lose when these two forts fell?'] },
        { title: 'The mouth of the Mississippi', battle: 'new-orleans', entry: 0,
          text: 'The Union Navy attacks the Confederacy\'s largest city from the sea.',
          ask: ['Find New Orleans on the map. Why was it the most valuable port in the South?', 'How does a navy change what an army can do?'] },
        { title: 'Closing the river', campaign: 'vicksburg', day: '1863-05-18',
          text: 'Follow Grant\'s route: down the west bank, across the river below the city, inland to Jackson, then back west to trap Vicksburg.',
          ask: ['Why didn\'t Grant attack Vicksburg directly from the north?', 'Grant left his supply line behind. What risk was he taking?'] },
        { title: 'Gateway to Georgia', battle: 'chattanooga', entry: 0,
          text: 'Chattanooga sits where railroads from four directions meet in a gap through the mountains.',
          ask: ['Look at the terrain. Why would both armies fight so hard for this one town?', 'What does it open the way to?'] },
        { title: 'Following the railroad', campaign: 'atlanta', day: '1864-09-02',
          text: 'Sherman\'s route to Atlanta follows a single railroad line that carried all his food and ammunition.',
          ask: ['Why does the route bend back and forth instead of running straight?', 'What made Atlanta worth four months of fighting?'] },
        { title: 'Cutting loose', campaign: 'march-to-the-sea', day: '1864-12-21',
          text: 'Leaving Atlanta, Sherman abandons his railroad and marches to the coast, where the Navy can supply him.',
          ask: ['Why was Savannah the goal?', 'Sherman\'s army destroyed railroads and farms. Was that a legitimate way to end the war sooner? Use evidence.'] },
        { title: 'The last Gulf port', battle: 'mobile-bay', entry: 0,
          text: 'By 1864 the Union blockade has closed almost every Southern port.',
          ask: ['How does closing ports weaken an army that is hundreds of miles inland?', 'Put the stops of this tour together: what was the Union\'s overall plan?'] }
      ]
    }
  ];

  const VOCAB = [
    { term: 'Union', def: 'The United States and the states that stayed loyal to it; also called the North or the Federals.' },
    { term: 'Confederacy', def: 'The Confederate States of America, formed by eleven slaveholding states that declared they had left the Union.' },
    { term: 'Secession', def: 'A state\'s formal withdrawal from the United States. The Union held that secession was illegal.' },
    { term: 'Theater', def: 'A large region where a war is fought. The Eastern theater lay between the Atlantic and the Appalachians; the Western theater ran from the mountains to the Mississippi.' },
    { term: 'Campaign', def: 'A connected series of marches and battles with one goal, such as capturing a city.' },
    { term: 'Casualties', def: 'Soldiers lost to an army: killed, wounded, captured, or missing. It does not mean only deaths.' },
    { term: 'Siege', def: 'Surrounding a town or fort and cutting off its supplies until it surrenders.' },
    { term: 'Flank', def: 'The side of an army\'s line. To "turn a flank" is to get around the end and attack from the side or rear.' },
    { term: 'Emancipation', def: 'Freeing people from slavery. The Emancipation Proclamation took effect January 1, 1863.' },
    { term: 'Ironclad', def: 'A warship protected by iron armor plates.' },
    { term: 'Primary source', def: 'Evidence created by someone who took part in or witnessed an event, such as a letter, diary, report, or photograph.' },
    { term: 'Memoir', def: 'A person\'s own account of their life, usually written years afterward from memory.' }
  ];

  const ADVISORY = [
    'The entries for Antietam, Gettysburg, and Petersburg include battlefield photographs of dead soldiers. These are historically important images; preview them before showing younger students.',
    'The Fort Pillow entry describes the massacre of surrendering soldiers, most of them Black, and quotes a Confederate general\'s report in the racial language of the time.',
    'Quotations keep their original wording, including period terms for race and descriptions of wounds and death.',
    'The color battle prints were made 25 to 30 years after the war and show an idealized view. Comparing them with photographs is a useful source-analysis exercise.'
  ];

  const NOTES = {
    quotes: 'Some of the best-known lines of the war were recorded by others, such as Barnard Bee\'s "stone wall" remark. Those entries name the person who reported them. Checking against the earliest printed texts changed a few familiar wordings: Lee\'s remark at Fredericksburg, usually given as "It is well that war is so terrible," reads differently in its first printing of 1870, and the entry gives that version.',
    numbers: 'Casualty figures combine killed, wounded, captured, and missing. Civil War returns were incomplete and Confederate records especially so; the figures here are the commonly cited estimates from the National Park Service and standard references, rounded. Army strengths are approximate.',
    images: 'Most are chromolithographs published by Kurz & Allison of Chicago in the late 1880s and 1890s, or prints by L. Prang & Co. after paintings by Thure de Thulstrup; these are romanticized views made decades after the events. The photographs by Alexander Gardner, Timothy O\'Sullivan, and Thomas Roche were taken on the battlefields within days of the fighting.'
  };

  Atlas.register({
    meta: {
      id: 'civil-war',
      title: 'The American Civil War',
      years: '1861–1865',
      range: { start: '1861-04-01', end: '1865-05-01' },
      bounds: [[30.8, -91.5], [41.2, -75.0]],
      sides: [
        { id: 'union', name: 'Union', color: '#2b5797' },
        { id: 'confederate', name: 'Confederate', color: '#9b3030' }
      ],
      theaters: ['Eastern', 'Western', 'Trans-Mississippi'],
      intro: 'Army routes draw themselves as the armies marched, and a marker appears for each battle as it begins.'
    },
    PORTRAITS, BATTLES, CAMPAIGNS, EVENTS, SOURCES, TOURS, VOCAB, ADVISORY, NOTES
  });
})();
