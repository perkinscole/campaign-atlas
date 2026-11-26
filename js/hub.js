/* Home page: catalog of conflicts */
(function () {
  'use strict';
  const { SITE, esc, img, thumb } = Atlas;
  Atlas.renderHeader();
  const live = SITE.wars.filter(w => w.status === 'live');
  const planned = SITE.wars.filter(w => w.status === 'planned');
  document.getElementById('hub').innerHTML = `
    <section class="hero">
      <h1>${esc(SITE.name)}</h1>
      <p class="lede">${esc(SITE.tagline)}. Press play and watch the armies move. Open any battle to read what the people who were there wrote about it.</p>
      <div class="hero-actions"><a class="btn primary" href="#atlases">Explore the atlases</a><a class="btn ghost" href="#teachers">For teachers</a></div>
      <ul class="hero-points"><li>Free for classrooms</li><li>No accounts or student data</li><li>Works on a projector, laptop, or phone</li></ul>
    </section>
    <div class="cards wars" id="atlases">
      ${live.map(w => `<a class="card war" href="atlas.html?war=${w.id}">
        <img src="${thumb(img(w.cover), 800)}" alt="" loading="lazy">
        <div class="body">
          <span class="meta">${esc(w.years)} · Grades ${esc(w.grades)}</span>
          <h3>${esc(w.title)}</h3>
          <p>${esc(w.blurb)}</p>
          <span class="go">Open the map →</span>
        </div>
      </a>`).join('')}
    </div>
    <p class="teacher-links">${live.map(w => `<a class="btn" href="teach.html?war=${w.id}">Teacher guide: ${esc(w.title)}</a>`).join(' ')}</p>

    <h2 id="teachers">For teachers</h2>
    <div class="features">
      <div><h3>Animated maps</h3><p>Army routes draw themselves day by day on a map of the time: period borders and place names over the terrain, with no modern roads or cities. One click switches to a modern topographic map.</p></div>
      <div><h3>Battlefield animations</h3><p>Step through Cowpens, Gettysburg, and D-Day on the ground as it was, with the ridges, roads, and streams of the day, and see how the terrain shaped each move.</p></div>
      <div><h3>Objects in 3D</h3><p>Turn and zoom museum scans of soldiers' gear, weapons, and things civilians left behind, each with questions for close looking.</p></div>
      <div><h3>Primary sources</h3><p>Every battle carries the words of soldiers, commanders, and civilians, labeled with who wrote them, when, and where the text comes from.</p></div>
      <div><h3>Guided tours</h3><p>Ready-made sequences of stops with discussion questions. Share one link and the whole class starts at the same place. Works on a projector or on student devices.</p></div>
      <div><h3>Printable worksheets</h3><p>A source-analysis worksheet for every battle and a student handout for every tour, each with a teacher key.</p></div>
      <div><h3>Standards aligned</h3><p>Activities are mapped to the C3 Framework and the Common Core literacy standards for history. See each atlas's teacher guide.</p></div>
      <div><h3>Free, no accounts</h3><p>Nothing to install and no student sign-in. The site collects no student data.</p></div>
    </div>

    <h2>Coming next</h2>
    <ul class="planned">${planned.map(w => `<li><strong>${esc(w.title)}</strong> <span>${esc(w.years)}</span></li>`).join('')}</ul>`;
})();
