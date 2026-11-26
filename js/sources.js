/* Sources page */
Atlas.load('sources', function (P) {
  'use strict';
  const { esc } = Atlas;
  const M = P.meta, N = P.NOTES || {};
  document.title = `Sources — ${M.title} — ${Atlas.SITE.name}`;
  const verified = P.entries.filter(x => x.j.verified).length;
  const seen = new Set(); const items = [];
  const add = (im, ctx) => { if (seen.has(im.file)) return; seen.add(im.file); items.push({ im, ctx }); };
  P.BATTLES.forEach(b => b.images.forEach(im => add(im, b.name)));
  Object.values(P.PORTRAITS).forEach(im => add(im, 'Portrait'));
  document.getElementById('sourcesPage').innerHTML = `
    <h1>Sources and Notes</h1>
    <p class="lede">Where the words, numbers, and pictures in ${esc(M.title.replace(/^The /, 'the '))} atlas come from.</p>

    <h2>About the quotations</h2>
    <p>Every journal entry on the map is drawn from a primary source: a diary or letter written during the war, a memoir written afterward by a participant, or an official dispatch or report. Entries are labeled with the author, their role at the time, the date, and the work the words come from. Where a remark was recorded by someone else, the entry says who reported it. Ellipses mark places where a passage was shortened. Spelling has been left as the authors wrote it.</p>
    <p class="significance"><strong>Verification status.</strong> ${verified} of ${P.entries.length} quotations in this atlas have been checked word for word against the printed source and are marked “✓ verified” on the map. Each check mark links to the page it was verified against.${verified < P.entries.length ? ' Entries without one are sayings handed down by tradition with no fixed wording, or come from a work with no open text to check; their source lines say so.' : ''}</p>
    ${N.quotes ? `<p>${esc(N.quotes)}</p>` : ''}

    <h2>About the numbers</h2>
    <p>${esc(N.numbers || 'Casualty figures combine killed, wounded, captured, and missing. Records from the period are incomplete; the figures here are commonly cited estimates from the National Park Service and standard references, rounded. Army strengths are approximate.')}</p>

    <h2>About the map</h2>
    <p>Army routes are simplified lines through the principal towns, river crossings, and battlefields each army passed, with the date it was there. Real columns spread over many roads and many miles; the line shows where the main body was, not every detachment. Battle markers are placed at the center of each battlefield and sized by total casualties. The base map shows modern place names and boundaries over natural terrain.</p>

    <h2>Primary sources</h2>
    <ul class="source-list">${[...P.SOURCES].sort((a, b) => a.author.localeCompare(b.author)).map(s => `<li>${esc(s.author)}, <em><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a></em> (${s.year}).</li>`).join('')}</ul>

    <h2>Image credits</h2>
    <p>All images are in the public domain. ${esc(N.images || '')} Click an image on the map to open its Wikimedia Commons page.</p>
    <ul class="credits">${items.map(({ im, ctx }) => `<li><a href="${im.page}" target="_blank" rel="noopener">${esc(im.caption)}</a> — ${esc(im.credit)} <span style="color:var(--muted)">(${esc(ctx)})</span></li>`).join('')}</ul>

    <h2>Built with</h2>
    <p><a href="https://leafletjs.com/">Leaflet</a> for the map, topographic, hillshade, and boundary tiles by Esri, contour-line tiles by <a href="https://opentopomap.org/">OpenTopoMap</a> (CC-BY-SA, map data © OpenStreetMap contributors, SRTM), and type from Google Fonts (Playfair Display and Lora). The site is plain HTML, CSS, and JavaScript with no build step.</p>`;
});
