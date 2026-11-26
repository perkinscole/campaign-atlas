/* Battles gallery page */
Atlas.load('battles', function (P) {
  'use strict';
  const { esc, num, fmtRange, thumb, spell } = Atlas;
  const M = P.meta;
  document.title = `Battles — ${M.title} — ${Atlas.SITE.name}`;
  const battles = P.byDate;
  const n = spell(battles.length);
  document.getElementById('lede').textContent = `${n.charAt(0).toUpperCase() + n.slice(1)} engagements of ${M.title.replace(/^The /, 'the ')}, in the order they happened. Open any card to see it on the map with its journal entries and images.`;
  const theaters = [...new Set(battles.map(b => b.theater))];
  const filters = document.getElementById('filters');
  filters.innerHTML = `<button class="btn on" data-f="all">All</button>`
    + (theaters.length > 1 ? theaters.map(t => `<button class="btn" data-f="theater:${esc(t)}">${esc(t)}</button>`).join('') : '')
    + M.sides.map(s => `<button class="btn" data-f="result:${s.id}">${esc(s.name)} victories</button>`).join('');
  const cards = document.getElementById('cards');

  function draw(filter) {
    const i = filter.indexOf(':'), k = filter.slice(0, i), v = filter.slice(i + 1);
    const list = battles.filter(b => filter === 'all' || b[k] === v);
    cards.innerHTML = list.map(b => {
      const im = b.images[0];
      const q = b.journal[0];
      const short = q && q.quote.length > 150 ? q.quote.slice(0, 147).replace(/\s+\S*$/, '') + '…' : (q ? q.quote : '');
      return `<a class="card" href="${Atlas.url('atlas', 'battle=' + b.id)}">
        ${im ? `<img src="${thumb(im, 600)}" alt="${esc(im.caption)}" loading="lazy">` : ''}
        <div class="body">
          <span class="badge ${P.sideClass(b.result)}">${esc(P.resultLabel(b))}</span>
          <h3>${esc(b.name)}</h3>
          <div class="meta">${fmtRange(b.start, b.end)} · ${esc(b.place)}</div>
          <div class="cas-line"><strong>${esc(b.casualties.heading || 'Casualties')}:</strong> ${M.sides.map(s => `${esc(s.name)} ${num(b.casualties[s.id])}`).join(' · ')}</div>
          ${q ? `<p class="quote">“${esc(short)}” <span style="font-style:normal;color:var(--muted)">— ${esc(q.who)}</span></p>` : ''}
        </div>
      </a>`;
    }).join('');
  }
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    filters.querySelectorAll('.btn').forEach(x => x.classList.toggle('on', x === b));
    draw(b.dataset.f);
  });
  draw('all');
});
