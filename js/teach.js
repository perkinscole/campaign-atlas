/* Teacher guide page */
Atlas.load('teach', function (P) {
  'use strict';
  const { esc, fmtRange, fmtISO, SITE } = Atlas;
  const M = P.meta;
  document.title = `For Teachers — ${M.title} — ${SITE.name}`;
  const verified = P.entries.filter(x => x.j.verified).length;
  const stopLabel = (s) => s.battle ? P.battleById[s.battle].name : s.campaign ? P.campaignById[s.campaign].name : '';
  document.getElementById('teachPage').innerHTML = `
    <h1>Teacher Guide: ${esc(M.title)}</h1>
    <p class="lede">Everything here is free to use and print. No student accounts, nothing to install.</p>

    <div class="glance">
      <div><b>${P.BATTLES.length}</b><span>battles and events</span></div>
      <div><b>${P.CAMPAIGNS.length}</b><span>animated army routes</span></div>
      <div><b>${P.entries.length}</b><span>primary-source excerpts</span></div>
      <div><b>${P.TOURS.length}</b><span>guided tours</span></div>
      <div><b>${P.BATTLES.length}</b><span>printable worksheets</span></div>
    </div>

    <h2>Three ways to use the atlas</h2>
    <div class="features">
      <div><h3>Whole class, on the projector</h3><p>Open a guided tour and step through it with the arrow keys. Each stop sets the map, shows one source, and gives you two discussion questions. Plan on 20 to 30 minutes.</p></div>
      <div><h3>Pairs or stations, on student devices</h3><p>Share a tour link and hand out the tour's student sheet. Students move at their own pace and write answers on paper.</p></div>
      <div><h3>Source analysis, on paper</h3><p>Print the worksheet for one battle. It includes the sources and an image, so it also works without devices or as homework.</p></div>
    </div>

    <h2>Guided tours</h2>
    ${P.TOURS.map(t => `
      <section class="tour-card">
        <div class="tour-card-head">
          <div>
            <h3>${esc(t.title)}</h3>
            <p class="meta">Grades ${esc(t.grades)} · about ${t.minutes} minutes · ${t.stops.length} stops</p>
          </div>
          <div class="tour-actions">
            <a class="btn primary" href="${Atlas.url('atlas', 'tour=' + t.id)}">Launch tour</a>
            <a class="btn" href="worksheet.html?war=${M.id}&tour=${t.id}" target="_blank" rel="noopener">Student sheet</a>
          </div>
        </div>
        <p class="cq"><strong>Compelling question:</strong> ${esc(t.question)}</p>
        <p>${esc(t.summary)}</p>
        <details>
          <summary>Stops and discussion questions</summary>
          <ol class="stops">${t.stops.map((s, i) => `<li><strong>${esc(s.title)}</strong>${stopLabel(s) ? ` <span class="meta">· ${esc(stopLabel(s))}</span>` : ''} <a class="stop-link" href="${Atlas.url('atlas', `tour=${t.id}:${i + 1}`)}">open</a>
            <p>${esc(s.text)}</p><ul>${s.ask.map(q => `<li>${esc(q)}</li>`).join('')}</ul></li>`).join('')}</ol>
        </details>
      </section>`).join('')}

    <h2>Primary-source worksheets</h2>
    <p>One worksheet per battle: background, each source with sourcing, close-reading, and perspective questions, an image analysis, and an exit question. The teacher key adds who wrote each source, when, and what to listen for.</p>
    <table class="ws-table">
      <thead><tr><th>Battle</th><th>Date</th><th>Sources</th><th></th></tr></thead>
      <tbody>${P.byDate.map(b => `<tr>
        <td><a href="${Atlas.url('atlas', 'battle=' + b.id)}">${esc(b.name)}</a></td>
        <td>${fmtRange(b.start, b.end)}</td>
        <td>${b.journal.length}</td>
        <td class="ws-links"><a href="worksheet.html?war=${M.id}&battle=${b.id}" target="_blank" rel="noopener">Worksheet</a> · <a href="worksheet.html?war=${M.id}&battle=${b.id}&key=1" target="_blank" rel="noopener">Teacher key</a></td>
      </tr>`).join('')}</tbody>
    </table>

    <h2>Vocabulary</h2>
    <dl class="vocab">${P.VOCAB.map(v => `<dt>${esc(v.term)}</dt><dd>${esc(v.def)}</dd>`).join('')}</dl>

    <h2>Standards alignment</h2>
    <p>The activities support these standards. Wording is paraphrased; confirm against the published documents and your state framework.</p>
    <table class="ws-table standards">
      <thead><tr><th>Standard</th><th>Students will</th><th>Where in the atlas</th></tr></thead>
      <tbody>${SITE.standards.map(s => `<tr><td><strong>${esc(s.code)}</strong></td><td>${esc(s.text)}</td><td>${esc(s.how)}</td></tr>`).join('')}</tbody>
    </table>

    <h2>Before you teach</h2>
    <ul class="advisory">${P.ADVISORY.map(a => `<li>${esc(a)}</li>`).join('')}
      <li><strong>Source checking:</strong> ${verified} of ${P.entries.length} quotations have been verified word for word against the printed source. See the <a href="${Atlas.url('sources')}">sources page</a> for links to each text.</li>
    </ul>

    <h2>Sharing links</h2>
    <p>Any view can be linked directly. Copy the address bar after opening a battle, a route, or a tour stop, and students will land in the same place.</p>`;
});
