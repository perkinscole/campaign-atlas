/* Campaign Atlas — shared core: pack loading, helpers, header */
window.Atlas = (function () {
  'use strict';
  const SITE = window.ATLAS_SITE;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MS = 86400000;
  const NEUTRAL = '#7a6a52';
  const params = new URLSearchParams(location.search);
  // Only ids listed as live in the catalog can be loaded.
  const entry = SITE.wars.find(w => w.id === params.get('war') && w.status === 'live') || null;
  const packs = {};

  const img = (file, caption, credit) => ({
    file,
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(file) + '?width=1100',
    page: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(file.replace(/ /g, '_')),
    caption, credit
  });
  const thumb = (im, w) => im.url.replace('width=1100', 'width=' + w);
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)); };
  const fmt = dt => `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
  const fmtISO = s => fmt(parse(s));
  const fmtRange = (s, e) => {
    const a = parse(s), b = parse(e);
    if (s === e) return fmt(a);
    if (a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth())
      return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()}–${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    if (a.getUTCFullYear() === b.getUTCFullYear())
      return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()} – ${MONTHS[b.getUTCMonth()]} ${b.getUTCDate()}, ${a.getUTCFullYear()}`;
    return `${fmt(a)} – ${fmt(b)}`;
  };
  const num = n => n ? n.toLocaleString('en-US') : '—';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const spell = n => {
    const w = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const t = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if (n < 20) return w[n];
    if (n < 100) return t[Math.floor(n / 10)] + (n % 10 ? '-' + w[n % 10] : '');
    return String(n);
  };

  function prepare(pack) {
    const m = pack.meta;
    const T0 = parse(m.range.start).getTime();
    pack.dayOf = s => Math.round((parse(s).getTime() - T0) / MS);
    pack.dateOfDay = n => new Date(T0 + Math.round(n) * MS);
    pack.maxDay = pack.dayOf(m.range.end);
    pack.side = id => m.sides.find(s => s.id === id) || null;
    pack.sideClass = id => { const i = m.sides.findIndex(s => s.id === id); return i === 0 ? 'side-a' : i === 1 ? 'side-b' : 'side-n'; };
    pack.color = id => (pack.side(id) || {}).color || NEUTRAL;
    pack.resultLabel = b => b.resultLabel || (pack.side(b.result) ? pack.side(b.result).name + ' victory' : 'Inconclusive');
    pack.BATTLES.forEach(b => {
      b.d0 = pack.dayOf(b.start); b.d1 = pack.dayOf(b.end);
      b.total = m.sides.reduce((n, s) => n + (b.casualties[s.id] || 0), 0);
    });
    pack.byDate = [...pack.BATTLES].sort((a, b) => a.d0 - b.d0 || a.name.localeCompare(b.name));
    pack.battleById = Object.fromEntries(pack.BATTLES.map(b => [b.id, b]));
    const shortName = c => c.split(/, then | and /).map(s => s.trim().split(' ').pop()).join(' / ');
    pack.CAMPAIGNS.forEach(c => {
      c.pts = c.path.map(p => ({ lat: p[0], lng: p[1], day: pack.dayOf(p[2]), label: p[3], date: p[2] }));
      c.d0 = c.pts[0].day; c.d1 = c.pts[c.pts.length - 1].day;
      c.short = c.short || shortName(c.commander);
    });
    pack.campaignById = Object.fromEntries(pack.CAMPAIGNS.map(c => [c.id, c]));
    pack.EVENTS.forEach(e => { e.d0 = pack.dayOf(e.date); });
    pack.TOURS = pack.TOURS || []; pack.VOCAB = pack.VOCAB || []; pack.ADVISORY = pack.ADVISORY || [];
    pack.tourById = Object.fromEntries(pack.TOURS.map(t => [t.id, t]));
    pack.entries = pack.BATTLES.flatMap(b => b.journal.map(j => ({ b, j })));
    return pack;
  }
  function register(pack) { packs[pack.meta.id] = prepare(pack); }

  const url = (page, hash) => `${page}.html?war=${entry.id}${hash ? '#' + hash : ''}`;

  function renderHeader(active) {
    const h = document.getElementById('siteHeader'); if (!h) return;
    const link = (page, label) => `<a href="${page}.html?war=${entry.id}"${active === page ? ' class="active" aria-current="page"' : ''}>${label}</a>`;
    h.innerHTML = entry
      ? `<a class="brand" href="index.html">${esc(SITE.name)}<small>${esc(entry.title)} · ${esc(entry.years)}</small></a>
         <nav aria-label="Site">${link('atlas', 'Map')}${link('battles', 'Battles')}${link('teach', 'For Teachers')}${link('sources', 'Sources')}<a class="all" href="index.html">All conflicts</a></nav>`
      : `<a class="brand" href="index.html">${esc(SITE.name)}<small>${esc(SITE.tagline)}</small></a>
         <nav aria-label="Site"><a href="index.html" class="active">Conflicts</a><a href="index.html#teachers">For Teachers</a></nav>`;
  }

  function load(active, cb) {
    if (!entry) { location.replace('index.html'); return; }
    renderHeader(active);
    const s = document.createElement('script');
    s.src = 'data/' + entry.id + '.js';
    s.onload = () => {
      const pack = packs[entry.id];
      const root = document.documentElement.style;
      root.setProperty('--side-a', pack.meta.sides[0].color);
      root.setProperty('--side-b', pack.meta.sides[1].color);
      cb(pack);
    };
    s.onerror = () => { document.body.insertAdjacentHTML('beforeend', '<p style="padding:20px">This atlas could not be loaded.</p>'); };
    document.head.appendChild(s);
  }

  return { SITE, entry, img, thumb, parse, fmt, fmtISO, fmtRange, num, esc, spell, register, load, url, renderHeader, NEUTRAL };
})();
