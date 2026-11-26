# Campaign Atlas

Interactive war maps for the K–12 classroom. Press play and the armies march across a
terrain map along their historical routes while battle markers appear as each
engagement begins. Open any battle to read what soldiers, commanders, and civilians
wrote at the time, alongside period images.

Live atlases: **The American Revolution** (1775–1781) and **The American Civil War**
(1861–1865). More are listed as planned in `data/index.js`.

## Running it

Plain HTML, CSS, and JavaScript with no build step. Serve the folder with any static
server:

```bash
python3 -m http.server 8765
```

and visit http://localhost:8765/. To publish, upload the folder as is to GitHub Pages,
Netlify, or any static host.

## Pages

| Page | What it is |
|---|---|
| `index.html` | Home: catalog of conflicts and the teacher overview |
| `atlas.html?war=<id>` | The interactive map, timeline, and detail panel |
| `battles.html?war=<id>` | Gallery of battles with filters |
| `teach.html?war=<id>` | Teacher guide: tours, worksheets, vocabulary, standards |
| `worksheet.html?war=<id>&battle=<id>` | Printable source-analysis worksheet; add `&key=1` for the teacher key |
| `worksheet.html?war=<id>&tour=<id>` | Printable student sheet for a guided tour |
| `sources.html?war=<id>` | Primary sources, image credits, verification status |

Deep links on the map: `#battle=<id>`, `#campaign=<id>`, `#day=YYYY-MM-DD`,
`#tour=<id>` or `#tour=<id>:<stop number>`.

## How it is organized

```
data/index.js              site name, catalog of conflicts, standards table
data/<war-id>.js           one data pack per conflict
js/core.js                 pack loader, date helpers, shared header
js/app.js                  the map engine (works with any pack)
js/gallery.js, sources.js, teach.js, worksheet.js, hub.js
css/style.css
```

The engine knows nothing about any particular war. Everything it shows comes from the
pack.

## Adding a conflict

1. Copy an existing pack to `data/<new-id>.js` and replace its contents.
2. In `data/index.js`, add or change the entry to `status: 'live'` with a `cover`
   image filename and a blurb.

A pack calls `Atlas.register({...})` with:

- `meta` — `id`, `title`, `years`, `range` (timeline start and end), `bounds` (map
  view), and `sides`: exactly two `{ id, name, color }` entries. Side ids are the keys
  used everywhere else in the pack.
- `BATTLES` — dates, coordinates, `theater`, `result` (a side id, `'inconclusive'`, or
  `'none'` with a `resultLabel`), `commanders`, `forces`, and `casualties` keyed by
  side id, `summary`, `significance`, `images`, and `journal` entries
  (`quote`, `who`, `role`, `side`, `date`, `source`, optional `portrait`, `verified`).
- `CAMPAIGNS` — army routes as dated waypoints `[lat, lng, 'YYYY-MM-DD', 'label']`.
  The route animates by interpolating between waypoints as the timeline advances.
- `EVENTS` — dated non-battle events for the dispatch list.
- `TOURS` — guided tours: a compelling question and a list of stops, each pointing at
  a battle (and which journal entry to feature) or a campaign, with discussion
  questions.
- `VOCAB`, `ADVISORY`, `NOTES`, `SOURCES`, `PORTRAITS` — teacher-guide and
  sources-page content.

Images are referenced by their exact Wikimedia Commons filename via `Atlas.img(...)`.

## Verifying quotations

Journal entries carry `verified: true` once their wording has been checked against the
printed source. Verified entries show a check mark on the map, and the teacher guide
and sources page report how many are verified. No entry has been marked yet.

## Credits

Map rendering by [Leaflet](https://leafletjs.com/); terrain and boundary tiles by Esri.
Quotations are from public-domain memoirs, diaries, letters, and official records.
Images are public-domain works from Wikimedia Commons and the Library of Congress.
