/* 3D objects page: museum scans and labeled modern models, opened in a viewer on demand */
Atlas.load('objects', function (P) {
  'use strict';
  const { esc } = Atlas;
  const M = P.meta, O = P.OBJECTS;
  document.title = `3D Objects — ${M.title} — ${Atlas.SITE.name}`;
  const GROUPS = [['soldiers', 'Soldiers and their gear'], ['weapons', 'Weapons'], ['civilians', 'Civilians'], ['leaders', 'Leaders']];
  const groupName = Object.fromEntries(GROUPS);
  const real = O.filter(o => o.kind === 'artifact').length;
  document.getElementById('lede').textContent = O.length
    ? `Turn them, zoom in, and look closely, the way a curator would. ${real} of these ${O.length} are scans of real objects held by museums. The rest are modern digital models, and each one is labeled.`
    : 'No 3D objects have been added to this atlas yet.';
  document.getElementById('objNote').innerHTML = O.length ? 'Opening an object loads its 3D file from the Smithsonian or a viewer from Sketchfab. If your school network blocks one of them, the links beside the viewer open the object on the museum\'s own page.' : '';

  const kindLabel = o => o.kind === 'artifact' ? 'Real object · 3D scan' : 'Modern 3D model';
  const voyager = o => `https://3d-api.si.edu/voyager/${o.ref}`;
  const viewer = o => `https://sketchfab.com/models/${o.ref}/embed?autostart=1&ui_hint=2&dnt=1`;
  const page = o => o.link || (o.src === 'si' ? voyager(o) : `https://sketchfab.com/3d-models/${o.ref}`);
  const licenseLink = o => o.license === 'CC0'
    ? '<a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener">CC0, public domain</a>'
    : '<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>';
  const credit = o => o.src === 'si'
    ? `3D scan: Smithsonian Institution, ${licenseLink(o)}. <a href="${esc(page(o))}" target="_blank" rel="noopener">Museum record</a> · <a href="${esc(voyager(o))}" target="_blank" rel="noopener">Open in the Smithsonian's viewer, with the museum's notes</a>`
    : `3D ${o.kind === 'artifact' ? 'scan' : 'model'}: <a href="${esc(page(o))}" target="_blank" rel="noopener">${esc(o.by)}</a> on Sketchfab, ${licenseLink(o)}.${o.record ? ` <a href="${esc(o.record)}" target="_blank" rel="noopener">Museum record</a>` : ''}`;

  const filters = document.getElementById('filters');
  const present = GROUPS.filter(([g]) => O.some(o => o.group === g));
  filters.innerHTML = O.length ? `<button class="btn on" data-f="all">All</button>` + present.map(([g, n]) => `<button class="btn" data-f="${g}">${esc(n)}</button>`).join('')
    + `<button class="btn" data-f="kind:artifact">Real objects only</button>` : '';
  const cards = document.getElementById('cards');

  function draw(f) {
    const list = O.filter(o => f === 'all' || o.group === f || f === 'kind:' + o.kind);
    cards.innerHTML = list.map(o => `
      <button class="card obj-card" data-open="${esc(o.id)}" aria-label="Open ${esc(o.title)} in 3D">
        <span class="obj-thumb">${o.thumb ? `<img src="${esc(o.thumb)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ''}<span class="obj-cube" aria-hidden="true">3D</span></span>
        <span class="body">
          <span class="badge ${o.kind === 'artifact' ? 'obj-real' : 'obj-model'}">${kindLabel(o)}</span>
          <strong class="obj-title">${esc(o.title)}</strong>
          <span class="meta">${esc(o.date)} · ${esc(groupName[o.group] || '')}</span>
          <span class="obj-holder">${esc(o.holder)}</span>
        </span>
      </button>`).join('');
    cards.querySelectorAll('img').forEach(im => im.addEventListener('error', () => im.remove()));
  }
  filters.addEventListener('click', e => {
    const b = e.target.closest('[data-f]'); if (!b) return;
    filters.querySelectorAll('.btn').forEach(x => x.classList.toggle('on', x === b));
    draw(b.dataset.f);
  });

  const dlg = document.getElementById('objDialog');
  // Smithsonian scans are drawn on this page with the <model-viewer> component, loaded the first time one is opened.
  let mvLoaded = false;
  function needModelViewer() {
    if (mvLoaded) return; mvLoaded = true;
    const s = document.createElement('script'); s.type = 'module';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
    document.head.appendChild(s);
  }
  function open(id, push) {
    const o = O.find(x => x.id === id); if (!o) return false;
    const i = O.indexOf(o), prev = O[(i - 1 + O.length) % O.length], next = O[(i + 1) % O.length];
    const b = o.battle && P.battleById[o.battle];
    dlg.innerHTML = `
      <div class="obj-stage">${o.src === 'si'
        ? `<model-viewer src="${esc(o.glb)}" alt="3D scan of ${esc(o.title)}" ${o.orientation ? `orientation="${esc(o.orientation)}" ` : ''}camera-controls touch-action="pan-y" interaction-prompt="none" shadow-intensity="0.7" exposure="1.05" loading="eager"><span class="obj-loading" slot="poster">Loading 3D model…</span></model-viewer>
           <button class="btn obj-hd" data-hd="${esc(o.glbHi)}">Sharper detail</button>`
        : `<iframe title="3D viewer: ${esc(o.title)}" src="${esc(viewer(o))}" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen loading="eager" referrerpolicy="no-referrer"></iframe>`}</div>
      <div class="obj-info">
        <div class="obj-bar"><span class="badge ${o.kind === 'artifact' ? 'obj-real' : 'obj-model'}">${kindLabel(o)}</span><button class="btn" data-close aria-label="Close viewer">Close ✕</button></div>
        <h2 id="objTitle">${esc(o.title)}</h2>
        <p class="meta">${esc(o.date)}${o.maker ? ' · ' + esc(o.maker) : ''}</p>
        <p class="obj-holder">${esc(o.holder)}</p>
        <p>${esc(o.text)}</p>
        <h3>Look closely</h3>
        <ul class="obj-look">${o.look.map(q => `<li>${esc(q)}</li>`).join('')}</ul>
        ${b ? `<p><a class="btn" href="${Atlas.url('atlas', 'battle=' + b.id)}">See ${esc(b.name)} on the map</a></p>` : ''}
        <p class="obj-credit">${credit(o)}</p>
        <p class="obj-help">Drag to turn. Scroll or pinch to zoom.</p>
        <div class="obj-nav"><button class="btn" data-open="${esc(prev.id)}">← Previous</button><button class="btn" data-open="${esc(next.id)}">Next →</button></div>
      </div>`;
    if (o.src === 'si') needModelViewer();
    if (!dlg.open) dlg.showModal();
    dlg.querySelector('.obj-info').scrollTop = 0;
    if (push !== false) history.replaceState(null, '', Atlas.url('objects', o.id));
    return true;
  }
  function close() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', () => { dlg.innerHTML = ''; history.replaceState(null, '', Atlas.url('objects')); });
  dlg.addEventListener('click', e => {
    if (e.target === dlg || e.target.closest('[data-close]')) { close(); return; }
    const hd = e.target.closest('[data-hd]');
    if (hd) { const mv = dlg.querySelector('model-viewer'); if (mv) { const orbit = mv.getCameraOrbit ? mv.getCameraOrbit().toString() : null; mv.src = hd.dataset.hd; if (orbit) mv.cameraOrbit = orbit; } hd.remove(); return; }
    const n = e.target.closest('[data-open]'); if (n) open(n.dataset.open);
  });
  cards.addEventListener('click', e => { const c = e.target.closest('[data-open]'); if (c) open(c.dataset.open); });
  window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id) open(id, false); else close(); });

  draw('all');
  if (location.hash.length > 1) open(location.hash.slice(1), false);
});
