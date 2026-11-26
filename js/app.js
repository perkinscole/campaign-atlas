/* The Civil War Atlas — map application */
(function () {
  'use strict';
  const D = window.CW_DATA;
  const MS = 86400000;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const T0 = (() => { const [y, m, d] = D.RANGE.start.split('-').map(Number); return Date.UTC(y, m - 1, d); })();
  const dayOf = s => { const [y, m, d] = s.split('-').map(Number); return Math.round((Date.UTC(y, m - 1, d) - T0) / MS); };
  const dateOfDay = n => new Date(T0 + Math.round(n) * MS);
  const fmt = dt => `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
  const fmtISO = s => fmt(dateOfDay(dayOf(s)));
  const fmtRange = (s, e) => {
    const a = dateOfDay(dayOf(s)), b = dateOfDay(dayOf(e));
    if (s === e) return fmt(a);
    if (a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth())
      return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()}–${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    if (a.getUTCFullYear() === b.getUTCFullYear())
      return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()} – ${MONTHS[b.getUTCMonth()]} ${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    return `${fmt(a)} – ${fmt(b)}`;
  };
  const num = n => n.toLocaleString('en-US');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RESULT_LABEL = { union: 'Union victory', confederate: 'Confederate victory', inconclusive: 'Inconclusive' };
  const COLORS = { union: '#2b5797', confederate: '#9b3030', inconclusive: '#7a6a52' };
  const MAX_DAY = dayOf(D.RANGE.end);

  // ---- Preprocess data -------------------------------------------------
  D.BATTLES.forEach(b => {
    b.d0 = dayOf(b.start); b.d1 = dayOf(b.end);
    b.total = (b.casualties.union || 0) + (b.casualties.confederate || 0);
  });
  const byDate = [...D.BATTLES].sort((a, b) => a.d0 - b.d0 || a.name.localeCompare(b.name));
  const battleById = Object.fromEntries(D.BATTLES.map(b => [b.id, b]));
  const shortName = c => c.split(/, then | and /).map(s => s.trim().split(' ').pop()).join(' / ');
  D.CAMPAIGNS.forEach(c => {
    c.pts = c.path.map(p => ({ lat: p[0], lng: p[1], day: dayOf(p[2]), label: p[3], date: p[2] }));
    c.d0 = c.pts[0].day; c.d1 = c.pts[c.pts.length - 1].day;
    c.short = shortName(c.commander);
  });
  const campaignById = Object.fromEntries(D.CAMPAIGNS.map(c => [c.id, c]));
  D.EVENTS.forEach(e => { e.d0 = dayOf(e.date); });

  // ---- State -----------------------------------------------------------
  const state = { day: 0, playing: false, speed: 1, union: true, conf: true, all: false, auto: true, view: 'home', sel: null };

  // ---- DOM -------------------------------------------------------------
  const $ = id => document.getElementById(id);
  const panel = $('panel'), slider = $('day'), dateLabel = $('dateLabel'), playBtn = $('play');
  slider.max = MAX_DAY;

  // Year ticks
  const ticks = $('ticks');
  for (let y = 1862; y <= 1865; y++) {
    const d = dayOf(`${y}-01-01`);
    const s = document.createElement('span');
    s.style.left = (d / MAX_DAY * 100) + '%';
    s.textContent = y;
    ticks.appendChild(s);
  }

  // ---- Map -------------------------------------------------------------
  const HOME_BOUNDS = L.latLngBounds([[30.8, -91.5], [41.2, -75.0]]);
  const map = L.map('map', { zoomControl: false, minZoom: 4, maxZoom: 13, zoomSnap: 0.25 });
  map.fitBounds(HOME_BOUNDS, { padding: [6, 6] });
  L.control.zoom({ position: 'topleft' }).addTo(map);
  map.createPane('overlayLabels'); map.getPane('overlayLabels').style.zIndex = 250; map.getPane('overlayLabels').style.pointerEvents = 'none';
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri', maxZoom: 13
  }).addTo(map);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Boundaries &copy; Esri', maxZoom: 13, opacity: .6, pane: 'overlayLabels'
  }).addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  const headLayer = L.layerGroup().addTo(map);
  const battleLayer = L.layerGroup().addTo(map);

  // Legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'legend');
    div.innerHTML = `
      <h4>Legend</h4>
      <div class="row"><span class="line" style="background:${COLORS.union}"></span> Union army movement</div>
      <div class="row"><span class="line" style="background:${COLORS.confederate}"></span> Confederate army movement</div>
      <div class="row"><span class="dot" style="background:${COLORS.union}"></span> Union victory</div>
      <div class="row"><span class="dot" style="background:${COLORS.confederate}"></span> Confederate victory</div>
      <div class="row"><span class="dot" style="background:${COLORS.inconclusive}"></span> Inconclusive</div>
      <div class="sizes"><span style="width:8px;height:8px"></span><span style="width:14px;height:14px"></span><span style="width:22px;height:22px"></span> size = total casualties</div>`;
    L.DomEvent.disableClickPropagation(div);
    return div;
  };
  legend.addTo(map);

  // Battle markers
  const markers = {};
  D.BATTLES.forEach(b => {
    const r = Math.max(6, Math.min(22, 5 + Math.sqrt(b.total) / 12));
    b.r = r;
    const m = L.circleMarker([b.lat, b.lng], {
      radius: r, color: '#fff', weight: 1.5, fillColor: COLORS[b.result], fillOpacity: .85, className: 'battle-marker'
    });
    m.bindTooltip(`<strong>${esc(b.name)}</strong><br>${fmtRange(b.start, b.end)}`, { direction: 'top', offset: [0, -r] });
    m.on('click', () => selectBattle(b.id, { fly: false }));
    markers[b.id] = m;
  });

  // Route layers (created once, updated on each render)
  const routes = {};
  D.CAMPAIGNS.forEach(c => {
    const line = L.polyline([], { color: COLORS[c.side], weight: 3.5, opacity: .9, className: 'route', lineJoin: 'round' });
    line.bindTooltip(`<strong>${esc(c.name)}</strong><br>${esc(c.commander)}`, { sticky: true });
    line.on('click', () => selectCampaign(c.id));
    const halo = L.polyline([], { color: '#fff', weight: 7, opacity: .55, interactive: false });
    const wps = c.pts.map(p => L.circleMarker([p.lat, p.lng], { radius: 3, color: COLORS[c.side], weight: 1.5, fillColor: '#fff', fillOpacity: 1, className: 'waypoint' })
      .bindTooltip(`${esc(p.label)}<br><span style="color:#6b5c48">${fmt(dateOfDay(p.day))}</span>`, { direction: 'top', offset: [0, -4] })
      .on('click', () => selectCampaign(c.id)));
    const head = L.marker([0, 0], {
      icon: L.divIcon({ className: 'army-head-wrap', html: `<div class="army-head ${c.side}">${esc(c.short)}</div>`, iconSize: [0, 0] }),
      zIndexOffset: 500, keyboard: false
    });
    head.bindTooltip(`<strong>${esc(c.army)}</strong><br>${esc(c.commander)}`, c.side === 'union' ? { direction: 'top', offset: [0, -36] } : { direction: 'bottom', offset: [0, 36] });
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
  function render() {
    const day = state.day;
    dateLabel.textContent = fmt(dateOfDay(day));
    if (Number(slider.value) !== Math.round(day)) slider.value = Math.round(day);

    // battles
    D.BATTLES.forEach(b => {
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
        el.classList.toggle('is-selected', state.view === 'battle' && state.sel === b.id);
      }
      m.setStyle({ fillOpacity: future ? .3 : .85, opacity: future ? .4 : 1 });
      if (active) m.bringToFront();
    });

    // routes
    D.CAMPAIGNS.forEach(c => {
      const r = routes[c.id];
      const on = c.side === 'union' ? state.union : state.conf;
      const rs = on ? routeState(c, day) : { pts: [], head: null, status: 'future', reached: 0 };
      const show = rs.pts.length > 1;
      [r.halo, r.line].forEach(l => {
        if (show && !routeLayer.hasLayer(l)) routeLayer.addLayer(l);
        if (!show && routeLayer.hasLayer(l)) routeLayer.removeLayer(l);
      });
      if (show) {
        r.halo.setLatLngs(rs.pts);
        r.line.setLatLngs(rs.pts);
        const selected = state.view === 'campaign' && state.sel === c.id;
        r.line.setStyle({ opacity: rs.status === 'done' ? .45 : .95, weight: selected ? 5 : 3.5, dashArray: rs.status === 'done' ? '6 6' : null });
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

    // home panel refresh when the set of dispatches changes
    if (state.view === 'home') {
      const key = D.BATTLES.filter(b => day >= b.d0).length + ':' + D.EVENTS.filter(e => day >= e.d0).length + ':' + D.CAMPAIGNS.filter(c => day >= c.d0 && day < c.d1).map(c => c.id).join(',');
      if (key !== lastHomeKey) { lastHomeKey = key; renderHome(); }
    } else if (state.view === 'campaign') {
      panel.querySelectorAll('.waypoints li').forEach((li, i) => {
        const c = campaignById[state.sel];
        li.classList.toggle('reached', day >= c.pts[i].day);
      });
    }
  }

  // ---- Panel: home -----------------------------------------------------
  function renderHome() {
    const day = state.day;
    const active = D.CAMPAIGNS.filter(c => day >= c.d0 && day < c.d1 && (c.side === 'union' ? state.union : state.conf));
    const items = [
      ...D.BATTLES.filter(b => day >= b.d0).map(b => ({ d: b.d0, kind: 'battle', b })),
      ...D.EVENTS.filter(e => day >= e.d0).map(e => ({ d: e.d0, kind: 'event', e }))
    ].sort((a, b) => b.d - a.d);
    const upcoming = byDate.find(b => b.d0 > day);

    panel.innerHTML = `
      <div class="panel-inner">
        <div class="intro">
          <h2>Follow the war across four years</h2>
          <p>Press <strong>play</strong> or drag the timeline. Army routes draw themselves as the armies marched, and a marker appears for each battle as it begins. Click any marker, route, or dispatch below to open the full story, with photographs, prints, and the words of the soldiers and generals who were there.</p>
        </div>
        ${upcoming ? `<p class="empty">Next battle: <button class="btn" data-jump="${upcoming.id}">${esc(upcoming.name)} · ${fmtISO(upcoming.start)}</button></p>` : ''}
        <h3>Armies on the march</h3>
        ${active.length ? `<ul class="campaign-list">${active.map(c => `<li><button data-campaign="${c.id}"><span class="swatch ${c.side}"></span><span><strong>${esc(c.short)}</strong> — ${esc(c.name)}<br><small style="color:var(--muted)">${esc(c.army)}</small></span></button></li>`).join('')}</ul>`
          : `<p class="empty">No major campaign is under way on this date.</p>`}
        <h3>Dispatches</h3>
        ${items.length ? `<ul class="dispatch-list">${items.map(it => it.kind === 'battle'
          ? `<li><time>${fmtISO(it.b.start)}</time><button data-battle="${it.b.id}"><span class="dot ${it.b.result}"></span>${esc(it.b.name)} — ${RESULT_LABEL[it.b.result]}</button></li>`
          : `<li><time>${fmtISO(it.e.date)}</time><span class="ev">${esc(it.e.title)}</span></li>`).join('')}</ul>`
          : `<p class="empty">The war has not begun. Press play.</p>`}
        <p class="kbd"><kbd>Space</kbd> play / pause · <kbd>←</kbd> <kbd>→</kbd> step one day (<kbd>Shift</kbd> for a week) · <kbd>Esc</kbd> back to this list</p>
      </div>`;
  }

  // ---- Panel: battle ---------------------------------------------------
  function renderBattle(b) {
    const idx = byDate.indexOf(b);
    const prev = byDate[idx - 1], next = byDate[idx + 1];
    const maxCas = Math.max(b.casualties.union || 0, b.casualties.confederate || 0, 1);
    const bar = (side, n) => `<div class="bar ${side}"><b>${side === 'union' ? 'Union' : 'Confederate'}</b><i style="width:${Math.max(2, (n / maxCas) * 180)}px"></i><span>${n ? num(n) : '—'}</span></div>`;
    const portrait = j => j.portrait && D.PORTRAITS[j.portrait] ? `<img src="${D.PORTRAITS[j.portrait].url}" alt="${esc(D.PORTRAITS[j.portrait].caption)}" loading="lazy" onerror="this.remove()">` : '';
    const campaign = b.campaign ? campaignById[b.campaign] : null;
    const [hero, ...rest] = b.images;

    panel.innerHTML = `
      <div class="panel-inner">
        <div class="panel-top">
          <button class="btn" data-home>← Dispatches</button>
          <span class="badge ${b.result}">${RESULT_LABEL[b.result]}</span>
        </div>
        <h2>${esc(b.name)}</h2>
        <p class="dates">${fmtRange(b.start, b.end)} · ${esc(b.place)}</p>
        ${hero ? figure(hero) : ''}
        <p class="summary">${esc(b.summary)}</p>
        <p class="significance"><strong>Why it matters.</strong> ${esc(b.significance)}</p>
        <dl class="facts">
          <dt>Union</dt><dd>${esc(b.commanders.union)}<br><small>${esc(b.forces.union)}</small></dd>
          <dt>Confederate</dt><dd>${esc(b.commanders.confederate)}<br><small>${esc(b.forces.confederate)}</small></dd>
          <dt>Theater</dt><dd>${esc(b.theater)}${campaign ? ` · <button class="btn" data-campaign="${campaign.id}" style="padding:1px 7px">${esc(campaign.name)} route</button>` : ''}</dd>
        </dl>
        <div class="cas">
          <strong>Casualties</strong> (killed, wounded, captured, missing)
          ${bar('union', b.casualties.union || 0)}
          ${bar('confederate', b.casualties.confederate || 0)}
          ${b.casualties.note ? `<p class="note">${esc(b.casualties.note)}</p>` : ''}
        </div>
        <h3>From the journals, letters, and reports</h3>
        ${b.journal.map(j => `
          <article class="entry ${j.side}">
            <blockquote>${esc(j.quote)}</blockquote>
            <div class="who">${portrait(j)}<div><b>${esc(j.who)}</b><span>${esc(j.role)}</span><span>${esc(j.date)}</span></div></div>
            <div class="src">Source: ${esc(j.source)}</div>
          </article>`).join('')}
        ${rest.length ? `<h3>Images</h3><div class="gallery">${rest.map(figure).join('')}</div>` : ''}
        <nav class="prevnext" aria-label="Previous and next battles">
          ${prev ? `<button class="btn" data-jump="${prev.id}">← ${esc(prev.name)}</button>` : '<span></span>'}
          ${next ? `<button class="btn" data-jump="${next.id}">${esc(next.name)} →</button>` : '<span></span>'}
        </nav>
      </div>`;
    panel.scrollTop = 0;
  }
  const figure = im => `<figure><a href="${im.page}" target="_blank" rel="noopener"><img src="${im.url}" alt="${esc(im.caption)}" loading="lazy" onerror="this.closest('figure').style.display='none'"></a><figcaption>${esc(im.caption)}<span class="credit">${esc(im.credit)}</span></figcaption></figure>`;

  // ---- Panel: campaign -------------------------------------------------
  function renderCampaign(c) {
    const related = byDate.filter(b => b.campaign === c.id);
    panel.innerHTML = `
      <div class="panel-inner">
        <div class="panel-top">
          <button class="btn" data-home>← Dispatches</button>
          <span class="badge ${c.side}">${c.side === 'union' ? 'Union' : 'Confederate'} army</span>
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
        <ul class="waypoints">${c.pts.map((p, i) => `<li class="${state.day >= p.day ? 'reached' : ''}"><time>${fmt(dateOfDay(p.day))}</time><button data-day="${p.day}" data-ll="${p.lat},${p.lng}">${esc(p.label)}</button></li>`).join('')}</ul>
        ${related.length ? `<h3>Battles of this campaign</h3><ul class="dispatch-list">${related.map(b => `<li><time>${fmtISO(b.start)}</time><button data-jump="${b.id}"><span class="dot ${b.result}"></span>${esc(b.name)}</button></li>`).join('')}</ul>` : ''}
      </div>`;
    panel.scrollTop = 0;
  }

  // ---- Selection -------------------------------------------------------
  function selectBattle(id, opts = {}) {
    const b = battleById[id]; if (!b) return;
    if (opts.jump !== false && state.day < b.d0) setDay(b.d0);
    if (opts.jump === 'always') setDay(b.d0);
    state.view = 'battle'; state.sel = id;
    renderBattle(b);
    const ll = [b.lat, b.lng];
    if (opts.fly) map.flyTo(ll, Math.max(map.getZoom(), 7), { duration: .9 });
    else if (!map.getBounds().pad(-0.15).contains(ll)) map.panTo(ll, { animate: true });
    history.replaceState(null, '', '#battle=' + id);
    render();
  }
  function selectCampaign(id) {
    const c = campaignById[id]; if (!c) return;
    if (c.side === 'union') { state.union = true; $('optUnion').checked = true; } else { state.conf = true; $('optConf').checked = true; }
    if (state.day < c.d0) setDay(c.d0);
    state.view = 'campaign'; state.sel = id;
    renderCampaign(c);
    map.flyToBounds(L.latLngBounds(c.pts.map(p => [p.lat, p.lng])).pad(.35), { duration: .9, maxZoom: 9 });
    history.replaceState(null, '', '#campaign=' + id);
    render();
  }
  function goHome() {
    state.view = 'home'; state.sel = null; lastHomeKey = '';
    history.replaceState(null, '', location.pathname);
    render();
  }

  // ---- Playback --------------------------------------------------------
  let timer = null, lastTick = 0;
  function setDay(d) { state.day = Math.max(0, Math.min(MAX_DAY, d)); }
  function play() {
    if (state.day >= MAX_DAY) setDay(0);
    state.playing = true; playBtn.classList.add('is-playing'); playBtn.setAttribute('aria-label', 'Pause timeline');
    lastTick = performance.now();
    timer = requestAnimationFrame(tick);
  }
  function pause() {
    state.playing = false; playBtn.classList.remove('is-playing'); playBtn.setAttribute('aria-label', 'Play timeline');
    if (timer) cancelAnimationFrame(timer); timer = null;
  }
  function tick(now) {
    if (!state.playing) return;
    const dt = Math.min(100, now - lastTick); lastTick = now;
    const prev = state.day;
    setDay(state.day + dt / 1000 * 12 * state.speed); // 12 days per second at normal speed
    // auto-open battles as they begin
    if (state.auto) {
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

  // ---- Events ----------------------------------------------------------
  playBtn.addEventListener('click', () => state.playing ? pause() : play());
  slider.addEventListener('input', () => { setDay(Number(slider.value)); render(); });
  $('speed').addEventListener('change', e => { state.speed = Number(e.target.value); });
  $('optUnion').addEventListener('change', e => { state.union = e.target.checked; lastHomeKey = ''; render(); });
  $('optConf').addEventListener('change', e => { state.conf = e.target.checked; lastHomeKey = ''; render(); });
  $('optAll').addEventListener('change', e => { state.all = e.target.checked; render(); });
  $('optAuto').addEventListener('change', e => { state.auto = e.target.checked; });

  panel.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.home !== undefined) goHome();
    else if (t.dataset.battle) selectBattle(t.dataset.battle, { fly: true });
    else if (t.dataset.jump) { pause(); selectBattle(t.dataset.jump, { jump: 'always', fly: true }); }
    else if (t.dataset.campaign) { pause(); selectCampaign(t.dataset.campaign); }
    else if (t.dataset.replay) { const c = campaignById[t.dataset.replay]; setDay(c.d0); render(); state.auto = false; $('optAuto').checked = false; play(); }
    else if (t.dataset.day) { pause(); setDay(Number(t.dataset.day)); render(); const [la, ln] = t.dataset.ll.split(',').map(Number); map.panTo([la, ln]); }
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, select, textarea')) return;
    if (e.code === 'Space') { e.preventDefault(); state.playing ? pause() : play(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setDay(state.day + (e.shiftKey ? 7 : 1)); render(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); setDay(state.day - (e.shiftKey ? 7 : 1)); render(); }
    else if (e.key === 'Escape') { goHome(); }
  });

  // ---- Deep links ------------------------------------------------------
  function fromHash() {
    const m = location.hash.match(/^#(battle|campaign|day)=([\w-]+)/);
    if (!m) return false;
    if (m[1] === 'battle' && battleById[m[2]]) { selectBattle(m[2], { jump: 'always', fly: true }); return true; }
    if (m[1] === 'campaign' && campaignById[m[2]]) { selectCampaign(m[2]); return true; }
    if (m[1] === 'day' && /^\d{4}-\d{2}-\d{2}$/.test(m[2])) { setDay(dayOf(m[2])); render(); return true; }
    return false;
  }
  window.addEventListener('hashchange', fromHash);

  // ---- Start -----------------------------------------------------------
  render();
  if (!fromHash()) renderHome();
  setTimeout(() => { map.invalidateSize(); if (state.view === 'home') map.fitBounds(HOME_BOUNDS, { padding: [6, 6] }); }, 60);
})();
