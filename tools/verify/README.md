# Quote verification tools

These scripts check every journal entry in the data packs against the printed text it
cites, using archive.org full-text search, Wikisource, and a few direct editions.

1. `node export.js <projectDir>` writes `quotes.json` (every entry, numbered).
2. `python3 -I qv.py <start> <end>` searches archive.org for each quote, downloads the
   candidate scans into `../texts/` (cache, ignored by git), aligns the quote against
   the text, and writes `results.json`. `targets.json` points a quote number at the
   cited work with a title or creator filter.
3. `python3 -I ws.py` does the same against Wikisource; `direct.py` checks specific
   quotes against specific web editions listed in `direct_targets.json`.
4. `python3 -I report.py --brief` merges the results and shows word-level differences.
5. `python3 -I tools.py find|look|fix ...` are helpers for chasing a single quote.
6. `build.py` holds the reviewed decisions (which source, any corrected wording) and
   writes `decisions.json`; `apply.py <projectDir>` writes them into the packs as
   `verified`, `ref`, and `refTitle`.

`decisions.json` is the record of the November 2026 pass: 126 of 130 entries verified.
Quote numbers in `targets.json` and `build.py` refer to that export, so rebuild them
when entries are added or reordered. `../validate.js <projectDir>` checks pack structure.
