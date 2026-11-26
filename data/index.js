/* ------------------------------------------------------------------
   Campaign Atlas — site catalog
   Add a conflict by creating data/<id>.js and listing it here with
   status 'live'. Entries with status 'planned' appear on the home
   page as coming soon.
   ------------------------------------------------------------------ */
window.ATLAS_SITE = {
  name: 'Campaign Atlas',
  tagline: 'Interactive war maps for the K–12 classroom',
  wars: [
    {
      id: 'american-revolution', status: 'live', objects: true, period: true,
      title: 'The American Revolution', years: '1775–1781',
      blurb: 'From Lexington Green to Yorktown: follow Washington\'s army, the British campaigns, and the war in the South, with the words of soldiers, officers, and civilians.',
      cover: 'Washington Crossing the Delaware by Emanuel Leutze, MMA-NYC, 1851.jpg',
      grades: '5–12'
    },
    {
      id: 'civil-war', status: 'live', objects: true, period: true,
      title: 'The American Civil War', years: '1861–1865',
      blurb: 'Forty-one battles and twenty-two army routes from Fort Sumter to Appomattox, with letters, diaries, and reports from both sides.',
      cover: 'Thure de Thulstrup - L. Prang and Co. - Battle of Gettysburg - Restoration by Adam Cuerden.jpg',
      grades: '5–12'
    },
    {
      id: 'world-war-2-europe', status: 'live', objects: true, period: true,
      title: 'World War II in Europe and North Africa', years: '1939–1945',
      blurb: 'From the invasion of Poland to V-E Day: the fall of France, the Eastern Front, North Africa, Italy, D-Day, and the liberation of the camps, told through official records and Nuremberg testimony.',
      cover: 'Into the Jaws of Death 23-0455M edit.jpg',
      grades: '6–12'
    },
    { id: 'war-of-1812', status: 'planned', title: 'The War of 1812', years: '1812–1815' },
    { id: 'mexican-american-war', status: 'planned', title: 'The Mexican-American War', years: '1846–1848' },
    { id: 'world-war-1', status: 'planned', title: 'World War I', years: '1914–1918' },
    { id: 'world-war-2-pacific', status: 'planned', title: 'World War II: The Pacific', years: '1941–1945' },
    { id: 'korean-war', status: 'planned', title: 'The Korean War', years: '1950–1953' },
    { id: 'vietnam-war', status: 'planned', title: 'The Vietnam War', years: '1955–1975' }
  ],
  /* Standards are paraphrased. Confirm wording against the published
     documents and add your own state's standards as needed. */
  standards: [
    { code: 'C3 D2.His.1', text: 'Analyze connections among events and developments in broader historical contexts.', how: 'Guided tours link battles to political turning points; the timeline shows events in sequence.' },
    { code: 'C3 D2.His.4', text: 'Analyze the factors that influenced the perspectives of people in different historical eras.', how: 'Each battle pairs voices from opposing sides and from civilians.' },
    { code: 'C3 D2.His.6', text: 'Analyze how people\'s perspectives influenced the information available in the sources they created.', how: 'Worksheets ask who wrote each source, for whom, and why.' },
    { code: 'C3 D2.His.13', text: 'Evaluate the relevance and usefulness of a source based on its maker, date, place of origin, audience, and purpose.', how: 'Every entry is labeled with author, role, date, and source; worksheets distinguish accounts written at the time from later memoirs.' },
    { code: 'C3 D2.His.14', text: 'Explain multiple causes and effects of events and developments in the past.', how: 'Each battle states why it mattered; tours ask students to explain consequences.' },
    { code: 'C3 D2.His.16', text: 'Organize applicable evidence into a coherent argument about the past.', how: 'Each worksheet ends with an evidence-based exit question.' },
    { code: 'C3 D2.Geo.2', text: 'Use maps and other geographic representations to explain relationships between places and regions.', how: 'Students read army routes against rivers, mountains, and coastlines on the terrain map.' },
    { code: 'CCSS RH.1', text: 'Cite specific textual evidence to support analysis of primary and secondary sources.', how: 'Worksheet questions require quoting the source.' },
    { code: 'CCSS RH.2', text: 'Determine the central ideas or information of a primary or secondary source.', how: 'Close-reading question on every source.' },
    { code: 'CCSS RH.6', text: 'Identify aspects of a text that reveal an author\'s point of view or purpose.', how: 'Perspective question on every source.' },
    { code: 'CCSS RH.7', text: 'Integrate visual information such as maps, photographs, and charts with other information in texts.', how: 'Map, casualty charts, period images, and text are presented together; worksheets include image analysis.' },
    { code: 'CCSS RH.9', text: 'Analyze the relationship between a primary and a secondary source on the same topic.', how: 'Students compare the site\'s battle summary with the participants\' own accounts.' }
  ]
};
