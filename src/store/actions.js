import {
  AUTH,
  LOGOUT,
  PALETTE_ADD_CELL, PALETTE_REMOVE_CELL,
  PALETTE_SELECT_TILE,
  SAVE_MAP_FILE,
  SET_MAP_TILE,
  SET_TILE_SRC,
  store
} from "../store";
import {fetchMapFile} from "../lib/fetchMapFile";

export const setTileSrcR = data => ({ type: SET_TILE_SRC, tileSrc: data });
export const paletteSelectTile = id => ({ type: PALETTE_SELECT_TILE, id: id });
export const paletteAddCell = data => ({ type: PALETTE_ADD_CELL, data })
export const paletteRemoveCell = id => ({ type: PALETTE_REMOVE_CELL, id })
export const applyTileToMap = () => { return { type: 'at' } }
export const setMapDataR = data => ({ type: 'setMap' , mapData: data });
export const setTileUrlR = url => ({ type: 'setTileUrl', url: url });
export const setTileDimR = dim => ({ type: 'setTileDim', dim: dim });

export const doAuth = (login, pass) => ({ type: AUTH, payload: { login, pass } });
export const logout = () => ({ type: LOGOUT });

export const spt = (id) => {
  return { type: 'spt', id: id }
}

export const setMapTile = (x, y, id) => ({ type: SET_MAP_TILE, payload: {x, y, id} });

export const fetchMapFileA = async () => {
  const md = await fetchMapFile();
  console.log('mda', md);
  if(md) {
    store.dispatch(setMapDataR(md.mapData));
    store.dispatch(setTileUrlR(md.tileUrl));
    store.dispatch(setTileDimR(md.tileDim));
  }
}
// store.dispatch(fetchMapFileA);

export const saveMapFile = () => ({ type: SAVE_MAP_FILE })