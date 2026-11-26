# Period map data

These files are built by `tools/period/build.js`; edit the recipe there, not the output.

| File | Source | License |
| --- | --- | --- |
| `civil-war.js`, `american-revolution.js` | Modern state shapes from [Natural Earth](https://www.naturalearthdata.com/) (1:50m admin-1), merged and cut into period units | Public domain |
| `world-war-2-europe.js` | `world_1938.geojson` from [historical-basemaps](https://github.com/aourednik/historical-basemaps) by André Ourednik, cut to Europe, North Africa, and the Middle East, with some names corrected | [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html) |

Place names in all three files are written for this project (`tools/period/places.js`).

What the borders do and do not show:

- **Civil War:** state lines of the 1860s. Virginia includes West Virginia until June 20, 1863. Far-western territory lines moved several times during the war and are not drawn.
- **American Revolution:** the thirteen colonies along the state lines later agreed. Western edges were overlapping claims at the time.
- **World War II:** borders in the summer of 1938, after the annexation of Austria and before the breakup of Czechoslovakia. Wartime occupations are not drawn.
