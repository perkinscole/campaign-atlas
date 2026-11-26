# The Civil War Atlas

An educational website about the American Civil War built around an interactive map.
Press play and the major armies march across the map along their historical routes while
battle markers appear as each engagement begins. Open any battle to read what soldiers,
commanders, and civilians wrote at the time, alongside period photographs and prints.

## Running it

The site is plain HTML, CSS, and JavaScript with no build step. Open `index.html`
directly in a browser, or serve the folder with any static server, for example:

```bash
python3 -m http.server 8765
```

and visit http://localhost:8765/. It can be hosted on GitHub Pages, Netlify, or any
static host by uploading the folder as is.

## Pages

- `index.html` — the interactive map, timeline, and detail panel
- `battles.html` — a gallery of all battles with filters by theater and result
- `sources.html` — primary sources, image credits, and notes on the data

## Editing the content

Everything the site shows lives in `js/data.js`:

- `BATTLES` — one object per battle: dates, coordinates, commanders, forces, casualties,
  a summary, images, and `journal` entries (quote, author, role, date, source).
- `CAMPAIGNS` — army routes as dated waypoints `[lat, lng, 'YYYY-MM-DD', 'label']`.
  The route animates by interpolating between waypoints as the timeline advances.
- `EVENTS` — non-battle events shown in the dispatch list.
- `SOURCES` — the bibliography on the sources page.
- `PORTRAITS` — portrait images used next to journal entries.

Images are referenced by their Wikimedia Commons filename through `Special:FilePath`,
so adding a new image only needs the exact filename from its Commons page.

## Deep links

- `index.html#battle=gettysburg` opens a battle
- `index.html#campaign=overland` opens a campaign route
- `index.html#day=1863-07-02` sets the timeline to a date

## Credits

Map rendering by [Leaflet](https://leafletjs.com/); base tiles and boundaries by Esri.
Quotations are from public-domain memoirs, diaries, letters, and the Official Records.
Images are public-domain works from Wikimedia Commons and the Library of Congress.
