/* Sources page */
(function () {
  'use strict';
  const D = window.CW_DATA;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  document.getElementById('sources').innerHTML = D.SOURCES
    .sort((a, b) => a.author.localeCompare(b.author))
    .map(s => `<li>${esc(s.author)}, <em><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a></em> (${s.year}).</li>`)
    .join('');
  const seen = new Set(); const items = [];
  const add = (im, ctx) => { if (seen.has(im.file)) return; seen.add(im.file); items.push({ im, ctx }); };
  D.BATTLES.forEach(b => b.images.forEach(im => add(im, b.name)));
  Object.values(D.PORTRAITS).forEach(im => add(im, 'Portrait'));
  document.getElementById('credits').innerHTML = items
    .map(({ im, ctx }) => `<li><a href="${im.page}" target="_blank" rel="noopener">${esc(im.caption)}</a> — ${esc(im.credit)} <span style="color:var(--muted)">(${esc(ctx)})</span></li>`)
    .join('');
})();
