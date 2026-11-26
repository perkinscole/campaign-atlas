/* Printable worksheets: one per battle (?battle=) and one per tour (?tour=) */
Atlas.load('teach', function (P) {
  'use strict';
  const { esc, fmtRange, thumb, SITE } = Atlas;
  const M = P.meta;
  const q = new URLSearchParams(location.search);
  const key = q.get('key') === '1';
  const sheet = document.getElementById('sheet');
  const lines = n => `<div class="lines">${'<i></i>'.repeat(n)}</div>`;
  const ans = html => key ? `<div class="answer"><b>Teacher key:</b> ${html}</div>` : '';
  const toggle = () => { const u = new URL(location.href); if (key) u.searchParams.delete('key'); else u.searchParams.set('key', '1'); return u.pathname.split('/').pop() + u.search; };
  const toolbar = `<div class="toolbar no-print">
      <button class="btn primary" onclick="window.print()">Print</button>
      <a class="btn" href="${toggle()}">${key ? 'Student version' : 'Teacher key'}</a>
      <a class="btn" href="${Atlas.url('teach')}">All worksheets</a>
    </div>`;
  const nameLine = `<div class="ws-name"><span>Name</span><i></i><span>Date</span><i class="short"></i><span>Class</span><i class="short"></i></div>`;
  const timing = j => /^(Tradition|Attributed)/i.test(j.source) || /^Attributed/i.test(j.who) ? 'Tradition. No source from the time records these words, so they cannot be confirmed.'
    : /^As (reported|recorded|recalled|told)/i.test(j.source) ? 'Reported by someone else. The words reach us secondhand, so the exact wording is less certain.'
    : /recalled/i.test(j.date) ? 'Recalled later. This is a memoir or later account, written with hindsight and from memory.'
    : 'Created at or close to the time of the events.';
  const sideName = j => j.side === 'civilian' ? 'Civilian' : (P.side(j.side) || { name: '' }).name;

  const battle = P.battleById[q.get('battle')];
  const tour = P.tourById[q.get('tour')];

  if (battle) {
    const b = battle, L = 'ABCDEFG';
    document.title = `${b.name} worksheet${key ? ' (teacher key)' : ''} — ${SITE.name}`;
    const im = b.images[0];
    sheet.innerHTML = `${toolbar}
      ${key ? '<p class="key-banner">Teacher key</p>' : nameLine}
      <h1>Primary Source Analysis: ${esc(b.name)}</h1>
      <p class="ws-meta">${fmtRange(b.start, b.end)} · ${esc(b.place)} · ${esc(M.title)}</p>
      <section>
        <h2>Background</h2>
        <p>${esc(b.summary)}</p>
      </section>
      ${b.journal.map((j, i) => `
      <section class="ws-source">
        <h2>Source ${L[i]}</h2>
        <blockquote>${esc(j.quote)}</blockquote>
        <p class="attr"><b>${esc(j.who)}</b> · ${esc(j.role)}<br>${esc(j.date)} · ${esc(j.source)}</p>
        <ol class="ws-q">
          <li><b>Sourcing.</b> Who created this source, and what was their part in the events?${lines(2)}${ans(`${esc(j.who)}: ${esc(j.role)}. Side: ${esc(sideName(j))}.`)}</li>
          <li><b>Timing.</b> Was this written at the time, recalled later, or reported by someone else? How might that affect how far we trust it?${lines(2)}${ans(`${esc(j.date)}. ${timing(j)}${j.verified ? '' : ' (Wording not yet verified against the printed source.)'}`)}</li>
          <li><b>Close reading.</b> In your own words, what does the author describe or claim? Quote one phrase that supports your answer.${lines(3)}${ans('Answers vary. Look for an accurate paraphrase and a phrase quoted exactly from the source.')}</li>
          <li><b>Perspective.</b> How might the author's position or side have shaped what they wrote or left out?${lines(3)}${ans('Answers vary. Students should connect the content or tone to the author\'s role, audience, or purpose.')}</li>
        </ol>
      </section>`).join('')}
      ${b.journal.length > 1 ? `<section class="ws-source">
        <h2>Compare the sources</h2>
        <ol class="ws-q"><li>Where do the sources agree, and where do they differ? What might explain the difference?${lines(4)}${ans('Answers vary. Strong answers point to differences in side, rank, audience, or time of writing.')}</li></ol>
      </section>` : ''}
      ${im ? `<section class="ws-source ws-image">
        <h2>Image analysis</h2>
        <figure><img src="${thumb(im, 900)}" alt="${esc(im.caption)}"><figcaption>${esc(im.caption)}${key ? ` <span class="credit">${esc(im.credit)}</span>` : ''}</figcaption></figure>
        <div class="orq">
          <div><b>Observe</b><p>List three details you see.</p>${lines(4)}</div>
          <div><b>Reflect</b><p>Who might have made this image, when, and for whom? What might it leave out?</p>${lines(4)}</div>
          <div><b>Question</b><p>What does this image make you wonder?</p>${lines(4)}</div>
        </div>
        ${ans(`${esc(im.credit)} Ask whether the image was made at the time or years later, and whether the maker saw the event.`)}
      </section>` : ''}
      <section class="ws-source">
        <h2>Exit question</h2>
        <p>Why does ${esc(b.name)} matter? Write a claim and support it with evidence from at least one source.</p>
        ${lines(5)}${ans(esc(b.significance))}
      </section>
      <p class="ws-foot">${esc(SITE.name)} · ${esc(M.title)} · free for classroom use</p>`;
  } else if (tour) {
    const t = tour;
    document.title = `${t.title} student sheet — ${SITE.name}`;
    sheet.innerHTML = `${toolbar}
      ${key ? '<p class="key-banner">Teacher key</p>' : nameLine}
      <h1>${esc(t.title)}</h1>
      <p class="ws-meta">Guided tour · ${esc(M.title)} · ${t.stops.length} stops</p>
      <section>
        <h2>The question</h2>
        <p class="cq">${esc(t.question)}</p>
        <p>Follow the tour on the map. At each stop, read the source, look at the map, and answer the questions.</p>
      </section>
      ${t.stops.map((s, i) => { const b = s.battle ? P.battleById[s.battle] : null, c = s.campaign ? P.campaignById[s.campaign] : null; return `
      <section class="ws-source">
        <h2>Stop ${i + 1}: ${esc(s.title)}</h2>
        <p class="attr">${b ? `${esc(b.name)} · ${fmtRange(b.start, b.end)}` : c ? esc(c.name) : ''}</p>
        <ol class="ws-q">${s.ask.map(a => `<li>${esc(a)}${lines(3)}</li>`).join('')}</ol>
        ${ans(b ? esc(b.significance) : c ? esc(c.description) : '')}
      </section>`; }).join('')}
      <section class="ws-source">
        <h2>Your answer</h2>
        <p>${esc(t.question)} Use evidence from at least two stops.</p>
        ${lines(7)}${ans(esc(t.summary))}
      </section>
      <p class="ws-foot">${esc(SITE.name)} · ${esc(M.title)} · free for classroom use</p>`;
  } else {
    location.replace(Atlas.url('teach'));
  }
});
