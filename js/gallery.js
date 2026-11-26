/* Battles gallery page */
(function () {
  'use strict';
  const D = window.CW_DATA;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const fmt = dt => `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
  const fmtRange = (s, e) => {
    const a = parse(s), b = parse(e);
    if (s === e) return fmt(a);
    if (a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth())
      return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()}–${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    if (a.getUTCFullYear() === b.getUTCFullYear())
      return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()} – ${MONTHS[b.getUTCMonth()]} ${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    return `${fmt(a)} – ${fmt(b)}`;
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RESULT_LABEL = { union: 'Union victory', confederate: 'Confederate victory', inconclusive: 'Inconclusive' };
  const num = n => n ? n.toLocaleString('en-US') : '—';
  const battles = [...D.BATTLES].sort((a, b) => a.start.localeCompare(b.start));
  const cards = document.getElementById('cards');

  function draw(filter) {
    const [k, v] = filter.split(':');
    const list = battles.filter(b => filter === 'all' || b[k] === v);
    cards.innerHTML = list.map(b => {
      const im = b.images[0];
      const q = b.journal[0];
      const short = q && q.quote.length > 150 ? q.quote.slice(0, 147).replace(/\s+\S*$/, '') + '…' : (q ? q.quote : '');
      return `<a class="card" href="index.html#battle=${b.id}">
        ${im ? `<img src="${im.url.replace('width=1100', 'width=600')}" alt="${esc(im.caption)}" loading="lazy">` : ''}
        <div class="body">
          <span class="badge ${b.result}">${RESULT_LABEL[b.result]}</span>
          <h3>${esc(b.name)}</h3>
          <div class="meta">${fmtRange(b.start, b.end)} · ${esc(b.place)}</div>
          <div class="cas-line"><strong>Casualties:</strong> Union ${num(b.casualties.union)} · Confederate ${num(b.casualties.confederate)}</div>
          ${q ? `<p class="quote">“${esc(short)}” <span style="font-style:normal;color:var(--muted)">— ${esc(q.who)}</span></p>` : ''}
        </div>
      </a>`;
    }).join('');
  }
  document.getElementById('filters').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    document.querySelectorAll('#filters .btn').forEach(x => x.classList.toggle('on', x === b));
    draw(b.dataset.f);
  });
  const words = ['zero','one','two','three','four','five','six','seven','eight','nine'];
  const n = battles.length; const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];
  const spelled = n < 10 ? words[n] : tens[Math.floor(n / 10)] + (n % 10 ? '-' + words[n % 10] : '');
  document.getElementById('lede').textContent = `${spelled.charAt(0).toUpperCase() + spelled.slice(1)} engagements that shaped the war, in the order they were fought. Open any card to see it on the map with its journal entries and images.`;
  draw('all');
})();
