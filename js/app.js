/* Campaign Atlas — map application (works with any data pack) */
Atlas.load('atlas', function (P) {
  'use strict';
  const { fmt, fmtISO, fmtRange, num, esc } = Atlas;
  const M = P.meta, [SA, SB] = M.sides;
  const MAX_DAY = P.maxDay;
  const byDate = P.byDate, battleById = P.battleById, campaignById = P.campaignById;
  const dateOfDay = P.dateOfDay, dayOf = P.dayOf;
  document.title = `${M.title} — ${Atlas.SITE.name}`;

  // ---- State -----------------------------------------------------------
  const state = { day: 0, playing: false, speed: 1, a: true, b: true, all: false, auto: true, view: 'home', sel: null, tour: null, stop: 0, tourReturn: null };
  const sideOn = id => id === SA.id ? state.a : state.b;

  // ---- DOM -------------------------------------------------------------
  const $ = id => document.getElementById(id);
  const panel = $('panel'), slider = $('day'), dateLabel = $('dateLabel'), playBtn = $('play');
  slider.max = MAX_DAY;
  $('optALabel').textContent = `${SA.name} army routes`;
  $('optBLabel').textContent = `${SB.name} army routes`;
  $('menuKey').innerHTML = `<span><i class="dot side-a"></i>${esc(SA.name)} victory</span><span><i class="dot side-b"></i>${esc(SB.name)} victory</span><span><i class="dot side-n"></i>Inconclusive or other</span>`;

  // Year ticks
  const ticks = $('ticks');
  const y0 = Atlas.parse(M.range.start).getUTCFullYear(), y1 = Atlas.parse(M.range.end).getUTCFullYear();
  for (let y = y0; y <= y1; y++) {
    const d = dayOf(`${y}-01-01`);
    if (d <= 0 || d >= MAX_DAY) continue;
    const s = document.createElement('span');
    s.style.left = (d / MAX_DAY * 100) + '%';
    s.textContent = y;
    ticks.appendChild(s);
  }

  // ---- Map -------------------------------------------------------------
  const HOME_BOUNDS = L.latLngBounds(M.bounds);
  const map = L.map('map', { zoomControl: false, minZoom: 3, maxZoom: 16, zoomSnap: 0.25 });
  map.fitBounds(HOME_BOUNDS, { padding: [6, 6] });
  L.control.zoom({ position: 'topleft' }).addTo(map);
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
  map.createPane('overlayLabels'); map.getPane('overlayLabels').style.zIndex = 250; map.getPane('overlayLabels').style.pointerEvents = 'none';

  // Base maps. Each is a stack of tile layers; the choice is remembered on this device.
  const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
  const HILLSHADE = 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}';
  const BASES = {
    topo: { name: 'Topographic', hint: 'terrain, rivers, and place names',
      layers: () => [
        L.tileLayer(ESRI + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 18, maxZoom: 19, attribution: 'Topographic map &copy; Esri and its data providers' }),
        L.tileLayer(HILLSHADE, { maxNativeZoom: 15, maxZoom: 19, opacity: .5, className: 'blend-multiply', attribution: 'Hillshade &copy; Esri' })
      ] },
    contour: { name: 'Contour lines', hint: 'elevation colors; best zoomed in on a battlefield',
      layers: () => [L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { subdomains: 'abc', maxNativeZoom: 17, maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM; style &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)' })] },
    atlas: { name: 'Atlas', hint: 'classroom-atlas style',
      layers: () => [L.tileLayer(ESRI + 'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 12, maxZoom: 19, attribution: 'National Geographic, Esri and its data providers' })] },
    relief: { name: 'Relief only', hint: 'no modern roads',
      layers: () => [
        L.tileLayer(ESRI + 'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 13, maxZoom: 19, attribution: 'Tiles &copy; Esri' }),
        L.tileLayer(ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 13, maxZoom: 19, opacity: .6, pane: 'overlayLabels', attribution: 'Boundaries &copy; Esri' })
      ] }
  };
  let baseId = null, baseLayers = [];
  function setBase(id, remember) {
    if (!BASES[id]) id = 'topo';
    if (id === baseId) return;
    baseLayers.forEach(l => map.removeLayer(l));
    baseLayers = BASES[id].layers(); baseLayers.forEach(l => l.addTo(map));
    Object.keys(BASES).forEach(k => map.getContainer().classList.toggle('base-' + k, k === id));
    baseId = id;
    const r = document.querySelector(`input[name="base"][value="${id}"]`); if (r) r.checked = true;
    if (remember) { try { localStorage.setItem('atlas-base', id); } catch (e) { /* storage unavailable */ } }
  }
  const baseMenu = $('baseMenu');
  if (baseMenu) {
    baseMenu.innerHTML = Object.entries(BASES).map(([k, b]) => `<label><input type="radio" name="base" value="${k}"> <span><strong>${b.name}</strong> <small>${b.hint}</small></span></label>`).join('');
    baseMenu.addEventListener('change', e => { if (e.target.name === 'base') setBase(e.target.value, true); });
  }
  let savedBase = null; try { savedBase = localStorage.getItem('atlas-base'); } catch (e) { /* storage unavailable */ }
  setBase(savedBase || 'topo', false);
  const routeLayer = L.layerGroup().addTo(map);
  const headLayer = L.layerGroup().addTo(map);
  const battleLayer = L.layerGroup().addTo(map);

  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
      <h4>Legend</h4>
      <div class="row"><span class="line" style="background:${SA.color}"></span> ${esc(SA.name)} army movement</div>
      <div class="row"><span class="line" style="background:${SB.color}"></span> ${esc(SB.name)} army movement</div>
      <div class="row"><span class="dot" style="background:${SA.color}"></span> ${esc(SA.name)} victory</div>
      <div class="row"><span class="dot" style="background:${SB.color}"></span> ${esc(SB.name)} victory</div>
      <div class="row"><span class="dot" style="background:${Atlas.NEUTRAL}"></span> Inconclusive or other</div>
      <div class="sizes"><span style="width:8px;height:8px"></span><span style="width:14px;height:14px"></span><span style="width:22px;height:22px"></span> size = total casualties</div>`;
    L.DomEvent.disableClickPropagation(div);
    return div;
  };
  legend.addTo(map);

  // Battle markers. Radius scales with casualties relative to the largest battle in the pack.
  const maxTotal = Math.max(...P.BATTLES.map(b => b.total), 1);
  const markers = {};
  P.BATTLES.forEach(b => {
    const r = 6 + 16 * Math.sqrt(b.total / maxTotal);
    const m = L.circleMarker([b.lat, b.lng], {
      radius: r, color: '#fff', weight: 1.5, fillColor: P.color(b.result), fillOpacity: .85, className: 'battle-marker'
    });
    m.bindTooltip(`<strong>${esc(b.name)}</strong><br>${fmtRange(b.start, b.end)}`, { direction: 'top', offset: [0, -r] });
    m.on('click', () => { state.tourReturn = null; selectBattle(b.id, { fly: false }); });
    markers[b.id] = m;
  });

  // Routes
  const routes = {};
  P.CAMPAIGNS.forEach(c => {
    const col = P.color(c.side), first = c.side === SA.id;
    const line = L.polyline([], { color: col, weight: 3.5, opacity: .9, className: 'route', lineJoin: 'round' });
    line.bindTooltip(`<strong>${esc(c.name)}</strong><br>${esc(c.commander)}`, { sticky: true });
    line.on('click', () => selectCampaign(c.id));
    const halo = L.polyline([], { color: '#fff', weight: 7, opacity: .55, interactive: false });
    const wps = c.pts.map(p => L.circleMarker([p.lat, p.lng], { radius: 3, color: col, weight: 1.5, fillColor: '#fff', fillOpacity: 1, className: 'waypoint' })
      .bindTooltip(`${esc(p.label)}<br><span style="color:#6b5c48">${fmt(dateOfDay(p.day))}</span>`, { direction: 'top', offset: [0, -4] })
      .on('click', () => selectCampaign(c.id)));
    const head = L.marker([0, 0], {
      icon: L.divIcon({ className: 'army-head-wrap', html: `<div class="army-head ${P.sideClass(c.side)}">${esc(c.short)}</div>`, iconSize: [0, 0] }),
      zIndexOffset: 500, keyboard: false
    });
    head.bindTooltip(`<strong>${esc(c.army)}</strong><br>${esc(c.commander)}`, first ? { direction: 'top', offset: [0, -36] } : { direction: 'bottom', offset: [0, 36] });
    head.on('click', () => selectCampaign(c.id));
    routes[c.id] = { line, halo, wps, head };
  });

  function routeState(c, day) {
    if (day < c.d0) return { pts: [], head: null, status: 'future', reached: 0 };
    if (day >= c.d1) return { pts: c.pts.map(p => [p.lat, p.lng]), head: null, status: 'done', reached: c.pts.length };
    const pts = []; let head = null, reached = 0;
    for (let i = 0; i < c.pts.length; i++) {
      const p = c.pts[i];
      if (p.day <= day) { pts.push([p.lat, p.lng]); reached = i + 1; }
      else {
        const q = c.pts[i - 1];
        const f = (day - q.day) / (p.day - q.day);
        head = [q.lat + (p.lat - q.lat) * f, q.lng + (p.lng - q.lng) * f];
        pts.push(head);
        break;
      }
    }
    if (!head) head = pts[pts.length - 1];
    return { pts, head, status: 'active', reached };
  }

  // ---- Render ----------------------------------------------------------
  let lastHomeKey = '';
  const selectedBattle = () => state.view === 'battle' ? state.sel : (state.view === 'tour' ? (state.tour.stops[state.stop].battle || null) : null);
  const selectedCampaign = () => state.view === 'campaign' ? state.sel : (state.view === 'tour' ? (state.tour.stops[state.stop].campaign || null) : null);

  function render() {
    const day = state.day;
    dateLabel.textContent = fmt(dateOfDay(day));
    if (Number(slider.value) !== Math.round(day)) slider.value = Math.round(day);
    const selB = selectedBattle(), selC = selectedCampaign();

    P.BATTLES.forEach(b => {
      const m = markers[b.id];
      const visible = state.all || day >= b.d0;
      if (visible && !battleLayer.hasLayer(m)) battleLayer.addLayer(m);
      if (!visible && battleLayer.hasLayer(m)) battleLayer.removeLayer(m);
      if (!visible) return;
      const active = day >= b.d0 && day <= b.d1 + 1;
      const future = state.all && day < b.d0;
      const el = m.getElement();
      if (el) {
        el.classList.toggle('is-active', active);
        el.classList.toggle('is-selected', selB === b.id);
      }
      m.setStyle({ fillOpacity: future ? .3 : .85, opacity: future ? .4 : 1 });
      if (active || selB === b.id) m.bringToFront();
    });

    P.CAMPAIGNS.forEach(c => {
      const r = routes[c.id];
      const on = sideOn(c.side);
      const rs = on ? routeState(c, day) : { pts: [], head: null, status: 'future', reached: 0 };
      const show = rs.pts.length > 1;
      [r.halo, r.line].forEach(l => {
        if (show && !routeLayer.hasLayer(l)) routeLayer.addLayer(l);
        if (!show && routeLayer.hasLayer(l)) routeLayer.removeLayer(l);
      });
      if (show) {
        r.halo.setLatLngs(rs.pts);
        r.line.setLatLngs(rs.pts);
        r.line.setStyle({ opacity: rs.status === 'done' ? .45 : .95, weight: selC === c.id ? 5 : 3.5, dashArray: rs.status === 'done' ? '6 6' : null });
        r.halo.setStyle({ opacity: rs.status === 'done' ? .25 : .6 });
      }
      r.wps.forEach((w, i) => {
        const vis = on && i < rs.reached && rs.status !== 'future';
        if (vis && !routeLayer.hasLayer(w)) routeLayer.addLayer(w);
        if (!vis && routeLayer.hasLayer(w)) routeLayer.removeLayer(w);
        if (vis) w.setStyle({ opacity: rs.status === 'done' ? .5 : 1, fillOpacity: rs.status === 'done' ? .5 : 1 });
      });
      if (rs.head) {
        r.head.setLatLng(rs.head);
        if (!headLayer.hasLayer(r.head)) headLayer.addLayer(r.head);
      } else if (headLayer.hasLayer(r.head)) headLayer.removeLayer(r.head);
    });

    if (state.view === 'home') {
      const key = P.BATTLES.filter(b => day >= b.d0).length + ':' + P.EVENTS.filter(e => day >= e.d0).length + ':' + P.CAMPAIGNS.filter(c => day >= c.d0 && day < c.d1).map(c => c.id).join(',');
      if (key !== lastHomeKey) { lastHomeKey = key; renderHome(); }
    } else if (state.view === 'campaign') {
      const c = campaignById[state.sel];
      panel.querySelectorAll('.waypoints li').forEach((li, i) => li.classList.toggle('reached', day >= c.pts[i].day));
    }
  }

  // ---- Panel pieces ----------------------------------------------------
  const figure = im => `<figure><a href="${im.page}" target="_blank" rel="noopener"><img src="${im.url}" alt="${esc(im.caption)}" loading="lazy" onerror="this.closest('figure').style.display='none'"></a><figcaption>${esc(im.caption)}<span class="credit">${esc(im.credit)}</span></figcaption></figure>`;
  const portrait = j => j.portrait && P.PORTRAITS[j.portrait] ? `<img src="${Atlas.thumb(P.PORTRAITS[j.portrait], 120)}" alt="${esc(P.PORTRAITS[j.portrait].caption)}" loading="lazy" onerror="this.remove()">` : '';
  const entryHTML = j => `
    <article class="entry ${j.side === 'civilian' ? 'civilian' : P.sideClass(j.side)}">
      <blockquote>${esc(j.quote)}</blockquote>
      <div class="who">${portrait(j)}<div><b>${esc(j.who)}</b><span>${esc(j.role)}</span><span>${esc(j.date)}</span></div></div>
      <div class="src">Source: ${esc(j.source)}${j.verified ? (j.ref ? ` <a class="verified" href="${esc(j.ref)}" target="_blank" rel="noopener" title="Wording checked against this printed text${j.refTitle ? ': ' + esc(j.refTitle) : ''}">✓ verified</a>` : ' <span class="verified" title="Wording checked against the printed source">✓ verified</span>') : ''}</div>
    </article>`;

  // ---- Panel: home -----------------------------------------------------
  function renderHome() {
    const day = state.day;
    const active = P.CAMPAIGNS.filter(c => day >= c.d0 && day < c.d1 && sideOn(c.side));
    const items = [
      ...P.BATTLES.filter(b => day >= b.d0).map(b => ({ d: b.d0, kind: 'battle', b })),
      ...P.EVENTS.filter(e => day >= e.d0).map(e => ({ d: e.d0, kind: 'event', e }))
    ].sort((a, b) => b.d - a.d);
    const upcoming = byDate.find(b => b.d0 > day);

    panel.innerHTML = `
      <div class="panel-inner">
        <div class="intro">
          <h2>${esc(M.title)}</h2>
          <p>Press <strong>play</strong> or drag the timeline. ${esc(M.intro)} Click any marker, route, or dispatch below to open the full story, with period images and the words of people who were there.</p>
        </div>
        ${upcoming ? `<p class="empty">Next: <button class="btn" data-jump="${upcoming.id}">${esc(upcoming.name)} · ${fmtISO(upcoming.start)}</button></p>` : ''}
        ${P.TOURS.length ? `<h3>Guided tours</h3><ul class="tour-list">${P.TOURS.map(t => `<li><button data-tour="${t.id}"><strong>${esc(t.title)}</strong><span>${esc(t.question)}</span><small>${t.stops.length} stops · about ${t.minutes} minutes · grades ${esc(t.grades)}</small></button></li>`).join('')}</ul>` : ''}
        <h3>Armies on the march</h3>
        ${active.length ? `<ul class="campaign-list">${active.map(c => `<li><button data-campaign="${c.id}"><span class="swatch ${P.sideClass(c.side)}"></span><span><strong>${esc(c.short)}</strong> — ${esc(c.name)}<br><small style="color:var(--muted)">${esc(c.army)}</small></span></button></li>`).join('')}</ul>`
          : `<p class="empty">No major campaign is under way on this date.</p>`}
        <h3>Dispatches</h3>
        ${items.length ? `<ul class="dispatch-list">${items.map(it => it.kind === 'battle'
          ? `<li><time>${fmtISO(it.b.start)}</time><button data-battle="${it.b.id}"><span class="dot ${P.sideClass(it.b.result)}"></span>${esc(it.b.name)} — ${esc(P.resultLabel(it.b))}</button></li>`
          : `<li><time>${fmtISO(it.e.date)}</time><span class="ev">${esc(it.e.title)}</span></li>`).join('')}</ul>`
          : `<p class="empty">The war has not begun. Press play.</p>`}
        <p class="kbd"><kbd>Space</kbd> play / pause · <kbd>←</kbd> <kbd>→</kbd> step one day (<kbd>Shift</kbd> for a week) · <kbd>Esc</kbd> back to this list</p>
      </div>`;
  }

  // ---- Panel: battle ---------------------------------------------------
  function renderBattle(b) {
    const idx = byDate.indexOf(b);
    const prev = byDate[idx - 1], next = byDate[idx + 1];
    const maxCas = Math.max(...M.sides.map(s => b.casualties[s.id] || 0), 1);
    const bar = s => { const n = b.casualties[s.id] || 0; return `<div class="bar ${P.sideClass(s.id)}"><b>${esc(P.sideLabel(b, s.id))}</b><i style="width:${Math.max(2, (n / maxCas) * 180)}px"></i><span>${num(n)}</span></div>`; };
    const campaign = b.campaign ? campaignById[b.campaign] : null;
    const [hero, ...rest] = b.images;
    const back = state.tourReturn
      ? `<button class="btn" data-tour="${state.tourReturn.id}" data-stop="${state.tourReturn.i}">← Back to tour</button>`
      : `<button class="btn" data-home>← Dispatches</button>`;

    panel.innerHTML = `
      <div class="panel-inner">
        <div class="panel-top">${back}<span class="badge ${P.sideClass(b.result)}">${esc(P.resultLabel(b))}</span></div>
        <h2>${esc(b.name)}</h2>
        <p class="dates">${fmtRange(b.start, b.end)} · ${esc(b.place)}</p>
        ${hero ? figure(hero) : ''}
        <p class="summary">${esc(b.summary)}</p>
        <p class="significance"><strong>Why it matters.</strong> ${esc(b.significance)}</p>
        <dl class="facts">
          ${M.sides.map(s => `<dt>${esc(P.sideLabel(b, s.id))}</dt><dd>${esc(b.commanders[s.id])}<br><small>${esc(b.forces[s.id])}</small></dd>`).join('')}
          <dt>Theater</dt><dd>${esc(b.theater)}${campaign ? ` · <button class="btn" data-campaign="${campaign.id}" style="padding:1px 7px">${esc(campaign.name)} route</button>` : ''}</dd>
        </dl>
        <div class="cas">
          <strong>${esc(b.casualties.heading || 'Casualties')}</strong> ${esc(b.casualties.kind != null ? b.casualties.kind : '(killed, wounded, captured, missing)')}
          ${b.casualties.hideBars ? '' : M.sides.map(bar).join('')}
          ${b.casualties.note ? `<p class="note">${esc(b.casualties.note)}</p>` : ''}
        </div>
        <h3>From the journals, letters, and reports</h3>
        ${b.journal.map(entryHTML).join('')}
        ${rest.length ? `<h3>Images</h3><div class="gallery">${rest.map(figure).join('')}</div>` : ''}
        <p class="classroom"><a class="btn" href="worksheet.html?war=${M.id}&battle=${b.id}" target="_blank" rel="noopener">Printable source worksheet</a></p>
        <nav class="prevnext" aria-label="Previous and next">
          ${prev ? `<button class="btn" data-jump="${prev.id}">← ${esc(prev.name)}</button>` : '<span></span>'}
          ${next ? `<button class="btn" data-jump="${next.id}">${esc(next.name)} →</button>` : '<span></span>'}
        </nav>
      </div>`;
    panel.scrollTop = 0;
  }

  // ---- Panel: campaign -------------------------------------------------
  function renderCampaign(c) {
    const related = byDate.filter(b => b.campaign === c.id);
    panel.innerHTML = `
      <div class="panel-inner">
        <div class="panel-top">
          <button class="btn" data-home>← Dispatches</button>
          <span class="badge ${P.sideClass(c.side)}">${esc(P.side(c.side).name)} army</span>
        </div>
        <h2>${esc(c.name)}</h2>
        <p class="dates">${fmtRange(c.start, c.end)}</p>
        <dl class="facts">
          <dt>Army</dt><dd>${esc(c.army)}</dd>
          <dt>Commander</dt><dd>${esc(c.commander)}</dd>
        </dl>
        <p class="summary" style="margin-top:12px">${esc(c.description)}</p>
        <p><button class="btn primary" data-replay="${c.id}">▶ Replay this march</button></p>
        <h3>Line of march</h3>
        <ul class="waypoints">${c.pts.map(p => `<li class="${state.day >= p.day ? 'reached' : ''}"><time>${fmt(dateOfDay(p.day))}</time><button data-day="${p.day}" data-ll="${p.lat},${p.lng}">${esc(p.label)}</button></li>`).join('')}</ul>
        ${related.length ? `<h3>Battles of this campaign</h3><ul class="dispatch-list">${related.map(b => `<li><time>${fmtISO(b.start)}</time><button data-jump="${b.id}"><span class="dot ${P.sideClass(b.result)}"></span>${esc(b.name)}</button></li>`).join('')}</ul>` : ''}
      </div>`;
    panel.scrollTop = 0;
  }

  // ---- Panel: guided tour ----------------------------------------------
  function renderTour() {
    const t = state.tour, i = state.stop, s = t.stops[i];
    const b = s.battle ? battleById[s.battle] : null;
    const c = s.campaign ? campaignById[s.campaign] : null;
    const j = b && b.journal[s.entry || 0];
    const when = b ? fmtRange(b.start, b.end) : fmt(dateOfDay(state.day));
    panel.innerHTML = `
      <div class="panel-inner tour">
        <div class="panel-top">
          <button class="btn" data-home>✕ Exit tour</button>
          <span class="badge tour-badge">Stop ${i + 1} of ${t.stops.length}</span>
        </div>
        <p class="tour-name">${esc(t.title)}</p>
        <div class="tour-progress" aria-hidden="true">${t.stops.map((_, k) => `<i class="${k < i ? 'done' : k === i ? 'now' : ''}"></i>`).join('')}</div>
        <h2>${esc(s.title)}</h2>
        <p class="dates">${when}${b ? ' · ' + esc(b.name) : c ? ' · ' + esc(c.name) : ''}</p>
        <p class="summary">${esc(s.text)}</p>
        ${b && b.images[0] ? figure(b.images[0]) : ''}
        ${j ? entryHTML(j) : ''}
        ${c ? `<p class="summary">${esc(c.description)}</p><p><button class="btn" data-replay-tour="${c.id}">▶ Watch this march</button></p>` : ''}
        <div class="discuss">
          <h3>Discuss</h3>
          <ol>${s.ask.map(q => `<li>${esc(q)}</li>`).join('')}</ol>
        </div>
        ${b ? `<p><button class="btn" data-open-from-tour="${b.id}">Open the full entry for ${esc(b.name)}</button></p>` : ''}
        <nav class="prevnext" aria-label="Tour stops">
          ${i > 0 ? `<button class="btn" data-stop-go="${i - 1}">← Previous</button>` : '<span></span>'}
          ${i < t.stops.length - 1 ? `<button class="btn primary" data-stop-go="${i + 1}">Next stop →</button>` : `<button class="btn primary" data-home>Finish tour</button>`}
        </nav>
      </div>`;
    panel.scrollTop = 0;
  }

  // ---- Selection -------------------------------------------------------
  const base = () => location.pathname + location.search;
  function selectBattle(id, opts = {}) {
    const b = battleById[id]; if (!b) return;
    if (opts.jump !== false && state.day < b.d0) setDay(b.d0);
    if (opts.jump === 'always') setDay(b.d0);
    state.view = 'battle'; state.sel = id;
    renderBattle(b);
    const ll = [b.lat, b.lng];
    if (opts.fly) map.flyTo(ll, Math.max(map.getZoom(), 7), { duration: .9 });
    else if (!map.getBounds().pad(-0.15).contains(ll)) map.panTo(ll, { animate: true });
    history.replaceState(null, '', base() + '#battle=' + id);
    render();
  }
  function showSide(id) {
    if (id === SA.id) { state.a = true; $('optA').checked = true; } else { state.b = true; $('optB').checked = true; }
  }
  function selectCampaign(id) {
    const c = campaignById[id]; if (!c) return;
    showSide(c.side);
    if (state.day < c.d0) setDay(c.d0);
    state.view = 'campaign'; state.sel = id; state.tourReturn = null;
    renderCampaign(c);
    map.flyToBounds(L.latLngBounds(c.pts.map(p => [p.lat, p.lng])).pad(.35), { duration: .9, maxZoom: 9 });
    history.replaceState(null, '', base() + '#campaign=' + id);
    render();
  }
  function goTour(id, i) {
    const t = P.tourById[id]; if (!t) return false;
    pause();
    i = Math.max(0, Math.min(t.stops.length - 1, i || 0));
    const s = t.stops[i];
    state.view = 'tour'; state.tour = t; state.stop = i; state.sel = null; state.tourReturn = null;
    const b = s.battle ? battleById[s.battle] : null, c = s.campaign ? campaignById[s.campaign] : null;
    setDay(s.day ? dayOf(s.day) : b ? b.d0 : c ? c.d1 : state.day);
    if (c) showSide(c.side);
    renderTour();
    if (b) map.flyTo([b.lat, b.lng], 7, { duration: .9 });
    else if (c) map.flyToBounds(L.latLngBounds(c.pts.map(p => [p.lat, p.lng])).pad(.35), { duration: .9, maxZoom: 9 });
    history.replaceState(null, '', base() + `#tour=${id}:${i + 1}`);
    render();
    return true;
  }
  function goHome() {
    state.view = 'home'; state.sel = null; state.tour = null; state.tourReturn = null; lastHomeKey = '';
    history.replaceState(null, '', base());
    render();
  }

  // ---- Playback --------------------------------------------------------
  let timer = null, lastTick = 0, stopAt = null;
  const RATE = MAX_DAY / 125; // days per second at normal speed: the whole war in about two minutes
  function setDay(d) { state.day = Math.max(0, Math.min(MAX_DAY, d)); }
  function play() {
    if (state.day >= MAX_DAY) setDay(0);
    state.playing = true; playBtn.classList.add('is-playing'); playBtn.setAttribute('aria-label', 'Pause timeline');
    lastTick = performance.now();
    timer = requestAnimationFrame(tick);
  }
  function pause() {
    state.playing = false; stopAt = null; playBtn.classList.remove('is-playing'); playBtn.setAttribute('aria-label', 'Play timeline');
    if (timer) cancelAnimationFrame(timer); timer = null;
  }
  function tick(now) {
    if (!state.playing) return;
    const dt = Math.min(100, now - lastTick); lastTick = now;
    const prev = state.day;
    setDay(state.day + dt / 1000 * RATE * state.speed);
    if (stopAt !== null && state.day >= stopAt) { setDay(stopAt); render(); pause(); return; }
    if (state.auto && stopAt === null && state.view !== 'tour') {
      const started = byDate.find(b => b.d0 > prev && b.d0 <= state.day);
      if (started) {
        setDay(started.d0);
        render();
        pause();
        selectBattle(started.id, { jump: false });
        return;
      }
    }
    render();
    if (state.day >= MAX_DAY) { pause(); return; }
    timer = requestAnimationFrame(tick);
  }
  function replay(c) { pause(); setDay(c.d0); render(); stopAt = c.d1; state.speed = Math.max(0.15, Math.min(1, (c.d1 - c.d0) / (RATE * 12))); play(); }

  // ---- Events ----------------------------------------------------------
  playBtn.addEventListener('click', () => { if (state.playing) pause(); else { state.speed = Number($('speed').value); play(); } });
  slider.addEventListener('input', () => { setDay(Number(slider.value)); render(); });
  $('speed').addEventListener('change', e => { state.speed = Number(e.target.value); });
  $('optA').addEventListener('change', e => { state.a = e.target.checked; lastHomeKey = ''; render(); });
  $('optB').addEventListener('change', e => { state.b = e.target.checked; lastHomeKey = ''; render(); });
  $('optAll').addEventListener('change', e => { state.all = e.target.checked; render(); });
  $('optAuto').addEventListener('change', e => { state.auto = e.target.checked; });

  panel.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    const d = t.dataset;
    if (d.home !== undefined) { pause(); goHome(); }
    else if (d.tour) goTour(d.tour, Number(d.stop || 0));
    else if (d.stopGo !== undefined) goTour(state.tour.id, Number(d.stopGo));
    else if (d.openFromTour) { state.tourReturn = { id: state.tour.id, i: state.stop }; selectBattle(d.openFromTour, { fly: false }); }
    else if (d.replayTour) replay(campaignById[d.replayTour]);
    else if (d.battle) { state.tourReturn = null; selectBattle(d.battle, { fly: true }); }
    else if (d.jump) { pause(); state.tourReturn = null; selectBattle(d.jump, { jump: 'always', fly: true }); }
    else if (d.campaign) { pause(); selectCampaign(d.campaign); }
    else if (d.replay) replay(campaignById[d.replay]);
    else if (d.day) { pause(); setDay(Number(d.day)); render(); const [la, ln] = d.ll.split(',').map(Number); map.panTo([la, ln]); }
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, select, textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); if (state.playing) pause(); else { state.speed = Number($('speed').value); play(); } }
    else if (e.key === 'ArrowRight') { e.preventDefault(); if (state.view === 'tour' && !e.shiftKey && state.stop < state.tour.stops.length - 1) goTour(state.tour.id, state.stop + 1); else { setDay(state.day + (e.shiftKey ? 7 : 1)); render(); } }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); if (state.view === 'tour' && !e.shiftKey && state.stop > 0) goTour(state.tour.id, state.stop - 1); else { setDay(state.day - (e.shiftKey ? 7 : 1)); render(); } }
    else if (e.key === 'Escape') { pause(); goHome(); }
  });

  // ---- Deep links ------------------------------------------------------
  function fromHash() {
    const m = location.hash.match(/^#(battle|campaign|day|tour)=([\w:-]+)/);
    if (!m) return false;
    if (m[1] === 'battle' && battleById[m[2]]) { selectBattle(m[2], { jump: 'always', fly: true }); return true; }
    if (m[1] === 'campaign' && campaignById[m[2]]) { selectCampaign(m[2]); return true; }
    if (m[1] === 'day' && /^\d{4}-\d{2}-\d{2}$/.test(m[2])) { setDay(dayOf(m[2])); render(); return true; }
    if (m[1] === 'tour') { const [id, n] = m[2].split(':'); return goTour(id, (Number(n) || 1) - 1); }
    return false;
  }
  window.addEventListener('hashchange', fromHash);

  // ---- Start -----------------------------------------------------------
  render();
  if (!fromHash()) renderHome();
  setTimeout(() => { map.invalidateSize(); if (state.view === 'home') map.fitBounds(HOME_BOUNDS, { padding: [6, 6] }); }, 60);
});
