# Campaign Atlas

Interactive war maps for the K–12 classroom. Press play and the armies march across a
terrain map along their historical routes while battle markers appear as each
engagement begins. Open any battle to read what soldiers, commanders, and civilians
wrote at the time, alongside period images.

Live atlases: **The American Revolution** (1775–1781), **The American Civil War**
(1861–1865), and **World War II in Europe and North Africa** (1939–1945). More are
listed as planned in `data/index.js`.

**Live site:** https://perkinscole.github.io/campaign-atlas/

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
| `objects.html?war=<id>` | 3D objects: museum scans and labeled modern models; `#<object id>` opens one |
| `teach.html?war=<id>` | Teacher guide: tours, worksheets, vocabulary, standards |
| `worksheet.html?war=<id>&battle=<id>` | Printable source-analysis worksheet; add `&key=1` for the teacher key |
| `worksheet.html?war=<id>&tour=<id>` | Printable student sheet for a guided tour |
| `sources.html?war=<id>` | Primary sources, image credits, verification status |

Deep links on the map: `#battle=<id>`, `#campaign=<id>`, `#day=YYYY-MM-DD`,
`#tour=<id>` or `#tour=<id>:<stop number>`, `#battlefield=<id>` or `#battlefield=<id>:<step>`.

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

## Battlefield animations

A battle can carry a `tactical` object, which adds a "Watch the battle unfold on the ground" button and a step-by-step view on a topographic base map (`#battlefield=<id>:<step>`).

```js
tactical: {
  bounds: [[south, west], [north, east]],
  base: 'contour',                       // optional: topo | contour | atlas | relief
  places: [{ name: 'Cemetery Hill', ll: [39.8203, -77.2292] }],
  units: { ii: { side: 'union', name: 'II Corps (Hancock)', short: 'II Corps' } },
  phases: [{
    time: 'July 2, 3:30 p.m.', title: 'The fishhook', text: '...',
    units: { ii: [[39.8186, -77.2340], [39.8092, -77.2355]] },   // a line of points; null removes the unit
    arrows: [{ side: 'confederate', pts: [[39.8140, -77.2500], [39.8128, -77.2375]] }]
  }],
  ask: ['Discussion question'],
  note: 'How exact the positions are.'
}
```

A unit keeps its last position until a later phase moves or removes it, so each phase lists only what changed. The engine interpolates between phases. Positions in the three animations so far (Cowpens, Gettysburg, D-Day) are simplified from standard maps; Cowpens is pinned to the line markers recorded in OpenStreetMap for the national battlefield.

## 3D objects

`objects.html?war=<id>` shows the pack's `OBJECTS` list: things students can turn and zoom. A catalog entry in `data/index.js` needs `objects: true` for the nav link to appear.

```js
{ id: 'minie-ball', group: 'weapons',            // soldiers | weapons | civilians | leaders
  kind: 'artifact',                              // 'artifact' = scan of a real object, 'model' = modern reconstruction
  title: 'Minié ball, .58 caliber', date: '1861–1865', holder: 'Florida Public Archaeology Network',
  src: 'sketchfab', ref: '<model uid>', by: '<uploader>', license: 'CC BY 4.0',   // or src: 'si', ref: '3d_package:<uuid>', glb, glbHi, license: 'CC0'
  thumb: '<image url>', link: '<source page>', text: '...', look: ['question'], battle: 'optional battle id' }
```

Rules for adding one:

- Prefer scans of real objects from museums. Smithsonian models are found with `https://3d-api.si.edu/api/v1.0/content/file/search?q=...&file_type=glb`; check that the catalog record says CC0 before using its files. They are drawn on the page with `<model-viewer>`, straight from the Smithsonian's server.
- Sketchfab models are embedded with Sketchfab's own viewer. Use only CC0 or CC BY models (`https://api.sketchfab.com/v3/search?type=models&license=cc0|by&q=...`), and keep the uploader's name in `by`: CC BY requires the credit.
- Artist-made models are allowed where no museum scan exists, but they must be `kind: 'model'` so the page labels them as modern reconstructions.
- Write the caption from the museum's own catalog record, not from memory.

## Verifying quotations

Journal entries carry `verified: true`, a `ref` link, and a `refTitle` once their wording
has been checked against a printed text. Verified entries show a check mark on the map
that links to that text, and the teacher guide and sources page report how many are
verified. In the first two atlases, 126 of 130 entries are verified. The four that are not
are two traditional sayings with no fixed wording ("the whites of their eyes" and "Damn
the torpedoes"), Nathaniel Lyon's reported last words, and the Elisha Hunt Rhodes diary,
which is under copyright with no open text.

The World War II atlas was built source-first: every quotation was copied out of the
linked text, so all 40 are verified. Its sources are government records (Hansard,
official orders and reports, U.S. government publications including Yank, and Nuremberg
trial documents), because soldiers' memoirs from that war are mostly still under
copyright. Use the same approach for later wars: find the text first with
`tools/verify/research.py` and `read.py`, write the pack with `verified`, `ref`, and
`refTitle` filled in, then run `tools/verify/recheck.py <projectDir> <warId>`.

Battle entries may also set `sideLabels` (per-battle names for the two sides) and
`casualties.hideBars` (show only a heading and note).

## Credits

Map rendering by [Leaflet](https://leafletjs.com/); topographic, hillshade, and boundary tiles by Esri; contour-line tiles by [OpenTopoMap](https://opentopomap.org/) (CC-BY-SA; map data © OpenStreetMap contributors, SRTM). 3D scans from the Smithsonian Institution (CC0) and from museums and makers on Sketchfab, credited beside each object; Smithsonian scans are displayed with Google's [model-viewer](https://modelviewer.dev/).
Quotations are from public-domain memoirs, diaries, letters, and official records.
Images are public-domain works from Wikimedia Commons and the Library of Congress.
