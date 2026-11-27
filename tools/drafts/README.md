# Drafts

Working files for atlases that are still being built. Nothing here is loaded by the site.

- `world-war-1/`: the World War I atlas in progress. `battles.py`, `battles2.py`, and `rest.py` hold the entries, quotations (each copied from the archive.org text named in its `ref`), routes, events, vocabulary, and tours. `gen.py <out.js>` assembles them into a data pack once `images.py` (PORTRAITS and IMAGES, chosen from `img_res.json` and `img_res2.json`) exists. Still to do: choose images, generate `data/world-war-1.js`, switch the catalog entry to live, run `tools/verify/recheck.py`, and find newspapers.
- `emit.py`, `batch1.py`, `batch2.py`: the scripts that wrote the battlefield animations into the packs.
