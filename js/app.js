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
  const state = { day: 0, playing: false, speed: 1, a: true, b: true, all: true, auto: true, view: 'home', sel: null, tour: null, stop: 0, tourReturn: null };
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
  const HAS_PERIOD = !!Atlas.entry.period;
  const BASES = {
    ...(HAS_PERIOD ? { period: { name: 'Period map', hint: 'borders and place names of the time; no modern roads or cities',
      layers: () => [
        L.tileLayer(ESRI + 'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', { maxNativeZoom: 13, maxZoom: 19, attribution: 'Relief &copy; Esri' }),
        L.tileLayer(HILLSHADE, { minZoom: 13, maxNativeZoom: 15, maxZoom: 19, opacity: .5, className: 'blend-multiply', attribution: 'Hillshade &copy; Esri' })
      ] } } : {}),
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
  function setBase(id) {
    if (!ready) return;
    if (!BASES[id]) id = 'topo';
    if (id !== baseId) {
      baseLayers.forEach(l => map.removeLayer(l));
      baseLayers = BASES[id].layers(); baseLayers.forEach(l => l.addTo(map));
      Object.keys(BASES).forEach(k => map.getContainer().classList.toggle('base-' + k, k === id));
      baseId = id;
    }
    const r = document.querySelector(`input[name="base"][value="${id}"]`); if (r) r.checked = true;
    document.querySelectorAll('.mode-switch button').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.mode === 'period') === (id === 'period'))));
    periodSync(); periodLegend(); layoutLabels(); tacLinesSync();
  }
  // Two remembered choices: period or modern, and which modern style. A battlefield view can ask for its own modern style.
  const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } return null; };
  const view = { mode: HAS_PERIOD && store('atlas-mode') !== 'modern' ? 'period' : 'modern', modern: store('atlas-base') || 'topo', override: null };
  if (view.modern === 'period' || !BASES[view.modern]) view.modern = 'topo';
  function applyBase() {
    setBase(view.mode === 'period' ? 'period' : view.override || (tac.b && tac.b.tactical.base) || view.modern);
  }
  function chooseBase(id) {
    if (id === 'period') view.mode = 'period';
    else { view.mode = 'modern'; if (tac.b) view.override = id; else { view.modern = id; store('atlas-base', id); } }
    store('atlas-mode', view.mode);
    applyBase();
  }
  const baseMenu = $('baseMenu');
  if (baseMenu) {
    baseMenu.innerHTML = Object.entries(BASES).map(([k, b]) => `<label><input type="radio" name="base" value="${k}"> <span><strong>${b.name}</strong> <small>${b.hint}</small></span></label>`).join('');
    baseMenu.addEventListener('change', e => { if (e.target.name === 'base') chooseBase(e.target.value); });
  }
  if (HAS_PERIOD) {
    const sw = L.control({ position: 'topright' });
    sw.onAdd = () => {
      const div = L.DomUtil.create('div', 'mode-switch');
      div.setAttribute('role', 'group'); div.setAttribute('aria-label', 'Map style');
      div.innerHTML = '<button type="button" data-mode="period" title="Borders and place names of the time, with no modern roads or cities">Period map</button><button type="button" data-mode="modern" title="A present-day topographic map">Modern map</button>';
      L.DomEvent.disableClickPropagation(div);
      div.addEventListener('click', e => { const b = e.target.closest('button'); if (b) chooseBase(b.dataset.mode === 'period' ? 'period' : view.override || (tac.b && tac.b.tactical.base) || view.modern); });
      return div;
    };
    sw.addTo(map);
  }

  // On the period map a battlefield view draws its own roads, streams, and railroads, since the base has none.
  const tacLines = L.layerGroup();
  const TAC_LINE = { road: { color: '#7a5a2c', weight: 2.4, opacity: .85 }, stream: { color: '#3f7fb5', weight: 1.8, opacity: .9 }, rail: { color: '#2b2f38', weight: 1.6, opacity: .85, dashArray: '7 4' } };
  function tacLinesSync() {
    const on = tac.b && baseId === 'period';
    if (on && !map.hasLayer(tacLines)) { tacLines.addTo(map); tacLines.eachLayer(l => l.bringToBack()); }
    if (!on && map.hasLayer(tacLines)) map.removeLayer(tacLines);
  }

  // ---- Period map: borders that change with the date ---------------------
  map.createPane('period'); map.getPane('period').style.zIndex = 300; map.getPane('period').style.pointerEvents = 'none';
  const periodLayer = L.layerGroup();
  let PERIOD = null, periodShown = -1;
  function periodSync() {
    const on = baseId === 'period' && PERIOD;
    if (!on) { if (map.hasLayer(periodLayer)) map.removeLayer(periodLayer); return; }
    if (!map.hasLayer(periodLayer)) periodLayer.addTo(map);
    const d = dateOfDay(state.day).toISOString().slice(0, 10);
    let shown = 0;
    PERIOD.features.forEach(f => {
      const vis = (!f.from || d >= f.from) && (!f.to || d < f.to);
      let g = f.group || null;
      if (f.groups) f.groups.forEach(([from, id]) => { if (d >= from) g = id; });
      if (vis !== f.vis) { if (vis) periodLayer.addLayer(f.poly); else periodLayer.removeLayer(f.poly); f.vis = vis; }
      if (g !== f.g) { const G = PERIOD.groups[g]; f.poly.setStyle(G ? { fillColor: G.color, fillOpacity: G.opacity || .22 } : { fillOpacity: 0 }); f.g = g; }
      if (vis) shown++;
    });
    if (shown !== periodShown) { periodShown = shown; layoutLabels(); }
  }
  function periodLegend() {
    const el = document.getElementById('periodKey'); if (!el) return;
    const on = baseId === 'period' && PERIOD;
    el.hidden = !on;
    if (on && !el.innerHTML) el.innerHTML = `<h4>Map of the time</h4>${Object.values(PERIOD.groups).map(g => `<div class="row"><span class="box" style="background:${g.color}"></span> ${esc(g.name)}</div>`).join('')}<details><summary>About these borders</summary><p>${esc(PERIOD.caption)}</p></details>`;
  }

  // ---- Name labels -------------------------------------------------------
  // Battles are always named; on the period map so are the places of the time. Labels that would overlap are left out, least important first.
  map.createPane('labels'); map.getPane('labels').style.zIndex = 610;
  const labelLayer = L.layerGroup().addTo(map);
  const measure = (() => { const c = document.createElement('canvas').getContext('2d'); return (t, font) => { c.font = font; return c.measureText(t).width; }; })();
  const LABEL = {
    battle: { font: '700 11.5px Inter, sans-serif', pad: 10, h: 17 }, city: { font: '500 11px Inter, sans-serif', pad: 4, h: 14 },
    area: { font: '600 10px Inter, sans-serif', pad: 4, h: 14, track: 1.1 }, soft: { font: 'italic 500 11px Inter, sans-serif', pad: 4, h: 14 }
  };
  let ready = false;
  function layoutLabels() {
    if (!ready) return;
    map.getContainer().classList.toggle('narrow', map.getSize().x < 700);
    labelLayer.clearLayers();
    if (tac.b) return;
    const z = map.getZoom(), size = map.getSize(), hz = map.getBoundsZoom(HOME_BOUNDS), boxes = [], placed = [];
    const free = b => b[0] > 2 && b[1] > 2 && b[2] < size.x - 2 && b[3] < size.y - 2 && !boxes.some(o => b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]);
    // Try each offset in turn; dx and dy say which side of the point the label sits on.
    const put = (ll, text, kind, cls, gap, sides, extra) => {
      const L0 = LABEL[kind], w = Math.ceil(measure(text, L0.font) * (L0.track || 1)) + L0.pad, h = L0.h, p = map.latLngToContainerPoint(ll);
      for (const [dx, dy] of sides) {
        const x = dx > 0 ? p.x + gap : dx < 0 ? p.x - gap - w : p.x - w / 2, y = dy > 0 ? p.y + gap : dy < 0 ? p.y - gap - h : p.y - h / 2;
        const box = [x, y, x + w, y + h];
        if (!free(box)) continue;
        boxes.push(box);
        const m = L.marker(ll, Object.assign({ pane: 'labels', keyboard: false, interactive: false,
          icon: L.divIcon({ className: 'map-label-wrap', iconSize: [w, h], iconAnchor: [p.x - x, p.y - y], html: `<span class="map-label ${cls}">${esc(text)}</span>` }) }, extra || {}));
        labelLayer.addLayer(m); placed.push({ text, p });
        return m;
      }
      return null;
    };
    const AROUND = [[1, 0], [-1, 0], [0, -1], [0, 1]], CENTER = [[0, 0]];
    const shownBattles = P.BATTLES.filter(b => battleLayer.hasLayer(markers[b.id]));
    shownBattles.forEach(b => { const p = map.latLngToContainerPoint([b.lat, b.lng]), r = markers[b.id].getRadius() + 1; boxes.push([p.x - r, p.y - r, p.x + r, p.y + r]); });
    const sel = selectedBattle();
    [...shownBattles].sort((a, b) => (b.id === sel) - (a.id === sel) || b.total - a.total).forEach(b => {
      const m = put([b.lat, b.lng], b.name, 'battle', state.day < b.d0 ? 'battle future' : 'battle', markers[b.id].getRadius() + 3, AROUND, { interactive: true });
      if (m) m.on('click', () => { state.tourReturn = null; selectBattle(b.id, { fly: false }); });
    });
    if (baseId !== 'period' || !PERIOD) return;
    const places = PERIOD.places.filter(pl => pl[3] === 1 || (pl[3] === 2 ? z >= hz - .3 : z >= hz + 1));
    const isCity = pl => !pl[4] || pl[4] === 'city' || pl[4] === 'capital';
    const city = pl => {
      const p = map.latLngToContainerPoint([pl[1], pl[2]]);
      if (placed.some(o => o.text.includes(pl[0].split(' (')[0]) && Math.hypot(o.p.x - p.x, o.p.y - p.y) < 70)) return;   // a battle here already carries the name
      if (!free([p.x - 4, p.y - 4, p.x + 4, p.y + 4])) return;
      const m = put([pl[1], pl[2]], pl[0], 'city', 'city', 6, [[1, 0], [-1, 0]]);
      if (m) { boxes.push([p.x - 4, p.y - 4, p.x + 4, p.y + 4]); labelLayer.addLayer(L.circleMarker([pl[1], pl[2]], { pane: 'period', interactive: false, radius: pl[4] === 'capital' ? 3.5 : 2.5, color: '#1c2333', weight: pl[4] === 'capital' ? 2 : 1, fillColor: pl[4] === 'capital' ? '#fff' : '#1c2333', fillOpacity: 1 })); }
    };
    places.filter(pl => isCity(pl) && pl[3] === 1).forEach(city);
    PERIOD.features.filter(f => f.vis && !f.quiet).forEach(f => put(f.label, f.name.toUpperCase(), 'area', 'area', 0, CENTER));
    places.filter(pl => !isCity(pl)).forEach(pl => put([pl[1], pl[2]], pl[4] === 'region' ? pl[0].toUpperCase() : pl[0], pl[4] === 'region' ? 'area' : 'soft', pl[4], 0, CENTER));
    places.filter(pl => isCity(pl) && pl[3] > 1).sort((a, b) => a[3] - b[3]).forEach(city);
  }
  map.on('moveend zoomend resize', layoutLabels);
  const routeLayer = L.layerGroup().addTo(map);
  const headLayer = L.layerGroup().addTo(map);
  const battleLayer = L.layerGroup().addTo(map);

  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `<details${map.getSize().x >= 760 ? ' open' : ''}><summary>Legend</summary>
      <div class="row"><span class="line" style="background:${SA.color}"></span> ${esc(SA.name)} army movement</div>
      <div class="row"><span class="line" style="background:${SB.color}"></span> ${esc(SB.name)} army movement</div>
      <div class="row"><span class="dot" style="background:${SA.color}"></span> ${esc(SA.name)} victory</div>
      <div class="row"><span class="dot" style="background:${SB.color}"></span> ${esc(SB.name)} victory</div>
      <div class="row"><span class="dot" style="background:${Atlas.NEUTRAL}"></span> Inconclusive or other</div>
      <div class="row"><span class="dot" style="background:#fff;box-shadow:0 0 0 1.5px #5d6677"></span> Battle still to come</div>
      <div class="sizes"><span style="width:8px;height:8px"></span><span style="width:14px;height:14px"></span><span style="width:22px;height:22px"></span> size = total casualties</div>
      <div class="period-key" id="periodKey" hidden></div></details>`;
    L.DomEvent.disableClickPropagation(div); L.DomEvent.disableScrollPropagation(div);
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
    const ghost = L.polyline(c.pts.map(p => [p.lat, p.lng]), { color: col, weight: 3, opacity: .6, dashArray: '1 7', lineCap: 'round', className: 'route' });
    ghost.bindTooltip(`<strong>${esc(c.name)}</strong><br>${esc(c.commander)}<br><span style="color:#5d6677">${fmtRange(c.pts[0].date, c.pts[c.pts.length - 1].date)}</span>`, { sticky: true });
    ghost.on('click', () => selectCampaign(c.id));
    const wps = c.pts.map(p => L.circleMarker([p.lat, p.lng], { radius: 3, color: col, weight: 1.5, fillColor: '#fff', fillOpacity: 1, className: 'waypoint' })
      .bindTooltip(`${esc(p.label)}<br><span style="color:#6b5c48">${fmt(dateOfDay(p.day))}</span>`, { direction: 'top', offset: [0, -4] })
      .on('click', () => selectCampaign(c.id)));
    const head = L.marker([0, 0], {
      icon: L.divIcon({ className: 'army-head-wrap', html: `<div class="army-head ${P.sideClass(c.side)}">${esc(c.short)}</div>`, iconSize: [0, 0] }),
      zIndexOffset: 500, keyboard: false
    });
    head.bindTooltip(`<strong>${esc(c.army)}</strong><br>${esc(c.commander)}`, first ? { direction: 'top', offset: [0, -36] } : { direction: 'bottom', offset: [0, 36] });
    head.on('click', () => selectCampaign(c.id));
    routes[c.id] = { line, halo, ghost, wps, head };
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
  let lastHomeKey = '', labelKey = '';
  const cta = document.createElement('div');
  cta.className = 'map-cta'; cta.hidden = true;
  cta.innerHTML = `<button type="button" class="btn primary"><svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M5 3l12 7-12 7z" fill="currentColor"/></svg> Play the timeline</button><span>or click any battle or dotted route</span>`;
  map.getContainer().appendChild(cta);
  L.DomEvent.disableClickPropagation(cta);
  cta.querySelector('button').addEventListener('click', () => { state.speed = Number($('speed').value); play(); render(); });
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
      if (future !== m.future) { m.future = future; m.setStyle(future ? { fillColor: '#fff', fillOpacity: .92, color: '#5d6677' } : { fillColor: P.color(b.result), fillOpacity: .85, color: '#fff' }); }
      if (active || selB === b.id) m.bringToFront();
    });

    P.CAMPAIGNS.forEach(c => {
      const r = routes[c.id];
      const on = sideOn(c.side);
      const ghost = on && state.all && day < c.d1;
      if (ghost && !routeLayer.hasLayer(r.ghost)) { routeLayer.addLayer(r.ghost); r.ghost.bringToBack(); }
      if (!ghost && routeLayer.hasLayer(r.ghost)) routeLayer.removeLayer(r.ghost);
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

    periodSync();
    const lk = P.BATTLES.filter(b => day >= b.d0).length + ':' + state.all + ':' + (selB || '');
    if (lk !== labelKey) { labelKey = lk; layoutLabels(); }
    cta.hidden = !(state.view === 'home' && day === 0 && !state.playing && !tac.b);

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
          <p>Every battle is a circle on the map and every army route is a dotted line. Press <strong>play</strong> or drag the timeline: the routes draw themselves as the armies march, and each circle fills with the winner's color when its battle is fought. Click any circle or route to open the full story, with period images and the words of people who were there.</p>
        </div>
        ${upcoming ? `<p class="empty">Next: <button class="btn" data-jump="${upcoming.id}">${esc(upcoming.name)} · ${fmtISO(upcoming.start)}</button></p>` : ''}
        <details class="all-list"><summary>All ${byDate.length} battles</summary><ul class="dispatch-list">${byDate.map(b => `<li><time>${fmtISO(b.start)}</time><button data-jump="${b.id}"><span class="dot ${day >= b.d0 ? P.sideClass(b.result) : 'side-future'}"></span>${esc(b.name)}</button></li>`).join('')}</ul></details>
        <details class="all-list"><summary>All ${P.CAMPAIGNS.length} army movements</summary><ul class="campaign-list">${[...P.CAMPAIGNS].sort((a, b) => a.d0 - b.d0).map(c => `<li><button data-campaign="${c.id}"><span class="swatch ${P.sideClass(c.side)}"></span><span><strong>${esc(c.short)}</strong> — ${esc(c.name)}<br><small style="color:var(--muted)">${fmtRange(c.pts[0].date, c.pts[c.pts.length - 1].date)}</small></span></button></li>`).join('')}</ul></details>
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
        ${b.tactical ? `<p><button class="btn primary watch" data-battlefield="${b.id}">▶ Watch the battle unfold on the ground</button></p>` : ''}
        ${(P.OBJECTS || []).some(o => o.battle === b.id) ? `<p class="obj-links">In 3D: ${P.OBJECTS.filter(o => o.battle === b.id).map(o => `<a href="${Atlas.url('objects', o.id)}">${esc(o.title)}</a>`).join(' · ')}</p>` : ''}
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


  // ---- Battlefield view: unit positions animated phase by phase ---------
  const TAC_N = 12; // points per unit line, so any two shapes can be blended
  const tacLayer = L.layerGroup();
  const tac = { b: null, i: 0, shapes: {}, labels: {}, arrows: [], raf: null, auto: null, cur: {} };
  const lerp = (a, b, f) => a + (b - a) * f;
  function resample(pts, n) {
    if (pts.length === 1) return Array.from({ length: n }, () => pts[0].slice());
    const seg = []; let total = 0;
    for (let k = 1; k < pts.length; k++) { const d = Math.hypot(pts[k][0] - pts[k - 1][0], (pts[k][1] - pts[k - 1][1]) * .77); seg.push(d); total += d; }
    const out = [];
    for (let j = 0; j < n; j++) {
      let want = total * j / (n - 1), k = 0;
      while (k < seg.length - 1 && want > seg[k]) { want -= seg[k]; k++; }
      const f = seg[k] ? Math.min(1, want / seg[k]) : 0;
      out.push([lerp(pts[k][0], pts[k + 1][0], f), lerp(pts[k][1], pts[k + 1][1], f)]);
    }
    return out;
  }
  // Positions carry forward from earlier phases until a phase changes or removes them.
  function tacState(b, i) {
    const pos = {};
    for (let k = 0; k <= i; k++) Object.entries(b.tactical.phases[k].units || {}).forEach(([id, pts]) => { if (pts) pos[id] = resample(pts, TAC_N); else delete pos[id]; });
    return pos;
  }
  const mid = pts => pts[Math.floor(pts.length / 2)];
  function tacDraw(pos, alpha) {
    const T = tac.b.tactical;
    Object.keys(T.units).forEach(id => {
      const u = T.units[id], pts = pos[id], a = alpha && alpha[id] != null ? alpha[id] : 1;
      if (!pts || a <= 0.02) { ['shapes', 'labels'].forEach(k => { if (tac[k][id]) { tacLayer.removeLayer(tac[k][id]); delete tac[k][id]; } }); return; }
      if (!tac.shapes[id]) {
        tac.shapes[id] = L.polyline(pts, { color: P.color(u.side), weight: 8, opacity: .95, lineCap: 'round', className: 'unit-line' }).bindTooltip(u.name, { sticky: true }).addTo(tacLayer);
        tac.labels[id] = L.marker(mid(pts), { interactive: false, keyboard: false, icon: L.divIcon({ className: 'army-head-wrap', iconSize: [0, 0], html: `<div class="unit-label ${P.sideClass(u.side)}">${esc(u.short || u.name)}</div>` }) }).addTo(tacLayer);
      }
      tac.shapes[id].setLatLngs(pts).setStyle({ opacity: .95 * a });
      tac.labels[id].setLatLng(mid(pts)).setOpacity(a);
    });
  }
  function tacArrows() {
    tac.arrows.forEach(l => tacLayer.removeLayer(l)); tac.arrows = [];
    if (!tac.b) return;
    (tac.b.tactical.phases[tac.i].arrows || []).forEach(ar => {
      const col = P.color(ar.side), pts = ar.pts;
      const shaft = L.polyline(pts, { color: col, weight: 3.5, opacity: .9, dashArray: '2 7', lineCap: 'round', interactive: false }).addTo(tacLayer);
      const tip = map.latLngToLayerPoint(pts[pts.length - 1]), back = map.latLngToLayerPoint(pts[pts.length - 2]);
      const ang = Math.atan2(tip.y - back.y, tip.x - back.x), len = 15;
      const wing = d => map.layerPointToLatLng(L.point(tip.x - len * Math.cos(ang + d), tip.y - len * Math.sin(ang + d)));
      const head = L.polygon([pts[pts.length - 1], wing(.45), wing(-.45)], { color: col, fillColor: col, fillOpacity: .95, weight: 1, interactive: false }).addTo(tacLayer);
      tac.arrows.push(shaft, head);
    });
  }
  map.on('zoomend', () => { if (tac.b) tacArrows(); });
  function tacGo(i, animate) {
    const b = tac.b, n = b.tactical.phases.length;
    i = Math.max(0, Math.min(n - 1, i));
    const from = tac.cur, to = tacState(b, i);
    tac.i = i;
    if (tac.raf) cancelAnimationFrame(tac.raf);
    tac.arrows.forEach(l => tacLayer.removeLayer(l)); tac.arrows = [];
    renderTactical();
    history.replaceState(null, '', base() + `#battlefield=${b.id}:${i + 1}`);
    const done = () => { tac.cur = to; tacDraw(to); tacArrows(); };
    if (!animate) { done(); return; }
    const t0 = performance.now(), dur = 1900;
    const step = now => {
      let f = Math.min(1, (now - t0) / dur); f = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      const pos = {}, alpha = {};
      Object.keys(b.tactical.units).forEach(id => {
        const a = from[id], z = to[id];
        if (a && z) pos[id] = a.map((p, k) => [lerp(p[0], z[k][0], f), lerp(p[1], z[k][1], f)]);
        else if (z) { pos[id] = z; alpha[id] = f; }
        else if (a) { pos[id] = a; alpha[id] = 1 - f; }
      });
      tacDraw(pos, alpha); tac.cur = pos;
      if (f < 1) tac.raf = requestAnimationFrame(step); else done();
    };
    tac.raf = requestAnimationFrame(step);
  }
  function tacAuto(on) {
    if (tac.auto) { clearInterval(tac.auto); tac.auto = null; }
    if (on) {
      if (tac.i >= tac.b.tactical.phases.length - 1) tacGo(0, false);
      tac.auto = setInterval(() => { if (tac.i >= tac.b.tactical.phases.length - 1) { tacAuto(false); renderTactical(); } else tacGo(tac.i + 1, true); }, 6500);
    }
  }
  function enterTactical(id, i) {
    const b = battleById[id]; if (!b || !b.tactical) return false;
    pause();
    if (tac.b && tac.b !== b) exitTactical(true);
    if (!tac.b) {
      [routeLayer, headLayer, battleLayer].forEach(l => map.removeLayer(l));
      tacLayer.addTo(map);
      document.querySelector('.atlas').classList.add('tactical-on');
      tacLines.clearLayers();
      (b.tactical.lines || []).forEach(l => L.polyline(l.pts, Object.assign({ className: 'tac-line' }, TAC_LINE[l.kind] || TAC_LINE.road)).bindTooltip(l.name, { sticky: true }).addTo(tacLines));
      (b.tactical.places || []).forEach(pl => L.marker(pl.ll, { interactive: false, keyboard: false, icon: L.divIcon({ className: 'army-head-wrap', iconSize: [0, 0], html: `<div class="place-label">${esc(pl.name)}</div>` }) }).addTo(tacLayer));
      map.invalidateSize();
      map.fitBounds(b.tactical.bounds, { padding: [10, 10] });
    }
    tac.b = b; tac.cur = {}; cta.hidden = true;
    applyBase();
    state.view = 'tactical'; state.sel = id;
    if (state.day < b.d0) setDay(b.d0);
    dateLabel.textContent = fmtRange(b.start, b.end);
    tacGo(i || 0, false);
    return true;
  }
  function exitTactical(silent) {
    if (!tac.b) return;
    tacAuto(false); if (tac.raf) cancelAnimationFrame(tac.raf);
    tacLayer.clearLayers(); map.removeLayer(tacLayer); tacLines.clearLayers();
    tac.shapes = {}; tac.labels = {}; tac.arrows = []; tac.cur = {};
    [routeLayer, headLayer, battleLayer].forEach(l => l.addTo(map));
    document.querySelector('.atlas').classList.remove('tactical-on');
    const b = tac.b; tac.b = null; view.override = null;
    applyBase();
    map.invalidateSize();
    if (!silent) { state.view = 'battle'; selectBattle(b.id, { jump: false }); map.setView([b.lat, b.lng], 7); }
  }
  function renderTactical() {
    const b = tac.b, T = b.tactical, i = tac.i, ph = T.phases[i], present = tacState(b, i);
    const key = side => Object.entries(T.units).filter(([id, u]) => u.side === side && present[id]).map(([, u]) => esc(u.name)).join(', ');
    panel.innerHTML = `
      <div class="panel-inner tour tactical">
        <div class="panel-top">
          <button class="btn" data-tac-exit>← ${esc(b.name)}</button>
          <span class="badge tour-badge">Step ${i + 1} of ${T.phases.length}</span>
        </div>
        <p class="tour-name">On the battlefield · ${esc(b.name)}</p>
        <div class="tour-progress" aria-hidden="true">${T.phases.map((_, k) => `<i class="${k < i ? 'done' : k === i ? 'now' : ''}"></i>`).join('')}</div>
        <h2>${esc(ph.title)}</h2>
        <p class="dates">${esc(ph.time)}</p>
        <p class="summary">${esc(ph.text)}</p>
        <nav class="prevnext" aria-label="Battle steps">
          ${i > 0 ? `<button class="btn" data-tac-go="${i - 1}">← Back</button>` : '<span></span>'}
          <button class="btn" data-tac-auto>${tac.auto ? '❚❚ Pause' : '▶ Play all'}</button>
          ${i < T.phases.length - 1 ? `<button class="btn primary" data-tac-go="${i + 1}">Next →</button>` : `<button class="btn primary" data-tac-exit>Done</button>`}
        </nav>
        <dl class="facts unit-key">
          ${M.sides.map(s => key(s.id) ? `<dt><span class="swatch ${P.sideClass(s.id)}"></span>${esc(P.sideLabel(b, s.id))}</dt><dd>${key(s.id)}</dd>` : '').join('')}
        </dl>
        <h3>The battle step by step</h3>
        <ol class="phase-list">${T.phases.map((p, k) => `<li class="${k === i ? 'now' : ''}"><button data-tac-go="${k}"><time>${esc(p.time)}</time>${esc(p.title)}</button></li>`).join('')}</ol>
        ${T.ask ? `<div class="discuss"><h3>Discuss</h3><ol>${T.ask.map(q => `<li>${esc(q)}</li>`).join('')}</ol></div>` : ''}
        <p class="kbd">${esc(T.note || 'Unit positions are simplified from standard battle maps. Each bar is a body of troops; the bar shows roughly where its line stood.')} ${T.lines ? 'On the period map, roads and streams are traced along the routes they follow today. ' : ''}Use <kbd>←</kbd> <kbd>→</kbd> to step, and the switch on the map to compare the period map with a modern one.</p>
      </div>`;
    panel.scrollTop = 0;
  }

  // ---- Selection -------------------------------------------------------
  const base = () => location.pathname + location.search;
  function selectBattle(id, opts = {}) {
    const b = battleById[id]; if (!b) return;
    if (tac.b) exitTactical(true);
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
  $('optAll').addEventListener('change', e => { state.all = e.target.checked; render(); layoutLabels(); });
  $('optAuto').addEventListener('change', e => { state.auto = e.target.checked; });

  panel.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    const d = t.dataset;
    if (d.tacExit !== undefined) { exitTactical(); return; }
    if (d.tacGo !== undefined) { tacAuto(false); tacGo(Number(d.tacGo), true); return; }
    if (d.tacAuto !== undefined) { tacAuto(!tac.auto); renderTactical(); return; }
    if (d.battlefield) { enterTactical(d.battlefield, 0); return; }
    if (tac.b) exitTactical(true);
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
    if (tac.b) {
      if (e.key === 'ArrowRight') { e.preventDefault(); tacAuto(false); tacGo(tac.i + 1, true); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); tacAuto(false); tacGo(tac.i - 1, true); }
      else if (e.code === 'Space') { e.preventDefault(); tacAuto(!tac.auto); renderTactical(); }
      else if (e.key === 'Escape') exitTactical();
      return;
    }
    if (e.code === 'Space') { e.preventDefault(); if (state.playing) pause(); else { state.speed = Number($('speed').value); play(); } }
    else if (e.key === 'ArrowRight') { e.preventDefault(); if (state.view === 'tour' && !e.shiftKey && state.stop < state.tour.stops.length - 1) goTour(state.tour.id, state.stop + 1); else { setDay(state.day + (e.shiftKey ? 7 : 1)); render(); } }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); if (state.view === 'tour' && !e.shiftKey && state.stop > 0) goTour(state.tour.id, state.stop - 1); else { setDay(state.day - (e.shiftKey ? 7 : 1)); render(); } }
    else if (e.key === 'Escape') { pause(); goHome(); }
  });

  // ---- Deep links ------------------------------------------------------
  function fromHash() {
    const m = location.hash.match(/^#(battle|campaign|day|tour|battlefield)=([\w:-]+)/);
    if (!m) return false;
    if (m[1] === 'battlefield') { const [id, n] = m[2].split(':'); const k = (Number(n) || 1) - 1; if (tac.b && tac.b.id === id) { if (k !== tac.i && tac.b.tactical.phases[k]) tacGo(k, true); return true; } return enterTactical(id, k); }
    if (tac.b) exitTactical(true);
    if (m[1] === 'battle' && battleById[m[2]]) { selectBattle(m[2], { jump: 'always', fly: true }); return true; }
    if (m[1] === 'campaign' && campaignById[m[2]]) { selectCampaign(m[2]); return true; }
    if (m[1] === 'day' && /^\d{4}-\d{2}-\d{2}$/.test(m[2])) { setDay(dayOf(m[2])); render(); return true; }
    if (m[1] === 'tour') { const [id, n] = m[2].split(':'); return goTour(id, (Number(n) || 1) - 1); }
    return false;
  }
  window.addEventListener('hashchange', fromHash);

  // ---- Start -----------------------------------------------------------
  $('optAll').checked = state.all;
  ready = true;
  applyBase();
  render();
  if (!fromHash()) renderHome();
  Atlas.loadPeriod(p => {
    if (!p) return;
    p.features.forEach(f => { f.poly = L.polygon(f.shape, { pane: 'period', interactive: false, color: '#4a5263', weight: 1, opacity: .75, fillOpacity: 0 }); });
    PERIOD = p; applyBase();
  });
  setTimeout(() => { map.invalidateSize(); if (state.view === 'home') map.fitBounds(HOME_BOUNDS, { padding: [6, 6] }); }, 60);
});
