import {
  AUTH,
  LOGOUT,
  PALETTE_ADD_CELL, PALETTE_REMOVE_CELL,
  PALETTE_SELECT_TILE, SAVE_DATA,
  SAVE_MAP_FILE,
  SET_MAP_TILE,
  SET_TILE_SRC,
  TILER_SELECT_CELL, TILER_UPDATE_CELL
} from "./actionTypes";
import {fetchMapFile} from "../lib/fetchMapFile";
import {TileSrc} from "./initState";
import {PalCell} from "./palData";
import {store} from "../store";

export type SetTileSrcR = (data: TileSrc) => ({ type: typeof SET_TILE_SRC, tileSrc: TileSrc });
export const setTileSrcR: SetTileSrcR = (data) => ({ type: SET_TILE_SRC, tileSrc: data });

export type PaletteSelectTile = (id: number) => ({ type: typeof PALETTE_SELECT_TILE, id: number })
export const paletteSelectTile: PaletteSelectTile = (id: number) => ({ type: PALETTE_SELECT_TILE, id: id });

export type PaletteAddCell = (data: PalCell) => ({ type: typeof PALETTE_ADD_CELL, data: PalCell })
export const paletteAddCell: PaletteAddCell = (data ) => ({ type: PALETTE_ADD_CELL, data })

export type PaletteRemoveCell = (cid: string) => ({ type: typeof PALETTE_REMOVE_CELL, cid: string })
export const paletteRemoveCell: PaletteRemoveCell = (cid) => ({ type: PALETTE_REMOVE_CELL, cid })

export const applyTileToMap = () => { return { type: 'at' } }

export type SetMapDataR = (data: number[][]) => ({ type: string , mapData: number[][] });
export const setMapDataR: SetMapDataR = (data: number[][]) => ({ type: 'setMap' , mapData: data });

export type SetTileUrlR = (url: string) => ({ type: string, url: string });
export const setTileUrlR: SetTileUrlR = (url: string) => ({ type: 'setTileUrl', url: url });

export type SetTileDimR = (dim: number) => ({ type: 'setTileDim', dim: number });
export const setTileDimR: SetTileDimR = (dim: number) => ({ type: 'setTileDim', dim: dim });

export type TilerSelectCell = (cid: string) => ({ type: typeof TILER_SELECT_CELL, cid: string });
export const tilerSelectCell: TilerSelectCell = (cid: string) => ({ type: TILER_SELECT_CELL, cid });

export type TilerUpdateCell = (cid: string, data: { k: string, v: string | number })
    => ({ type: typeof TILER_UPDATE_CELL, cid: string, data: { k: string, v: string | number } })
export const tilerUpdateCell: TilerUpdateCell = (cid, data) => ({ type: TILER_UPDATE_CELL, cid, data });

export type DoAuth = (login: string, pass: string) => ({ type: typeof AUTH, payload: { login: string, pass: string } });
export const doAuth: DoAuth = (login: string, pass: string) => ({ type: AUTH, payload: { login, pass } });

export const logout = () => ({ type: LOGOUT });

export const spt = (id: number) => {
  return { type: 'spt', id: id }
}
export type SetMapTile = (x: number, y: number, id: number) => ({ type: typeof SET_MAP_TILE, payload: { x: number, y: number, id: number }});
export const setMapTile: SetMapTile = (x, y, id) => ({ type: SET_MAP_TILE, payload: {x, y, id} });

export const fetchMapFileA = async () => {
  const md = await fetchMapFile();
  // console.log('mda', md);
  if(md) {
    store.dispatch(setMapDataR(md.mapData));
    store.dispatch(setTileUrlR(md.tileUrl));
    store.dispatch(setTileDimR(md.tileDim));
  }
}
// store.dispatch(fetchMapFileA);

export const saveMapFile = () => ({ type: SAVE_MAP_FILE })
export const saveData = () => ({ type: SAVE_DATA })