import {AUTH, LOGOUT, PALETTE_SELECT_TILE, SET_TILE_SRC} from "../store";

export const setTileSrcR = data => ({ type: SET_TILE_SRC, tileSrc: data });
export const paletteSelectTile = id => ({ type: PALETTE_SELECT_TILE, id: id });
export const applyTileToMap = () => { return { type: 'at' } }
export const setMapDataR = data => ({ type: 'setMap' , mapData: data });
export const setTileUrlR = url => ({ type: 'setTileUrl', url: url });
export const setTileDimR = dim => ({ type: 'setTileDim', dim: dim });

export const spt = (id) => {
  return { type: 'spt', id: id }
}

export const doAuth = (login, pass) => ({ type: AUTH, payload: { login, pass } })
export const logout = () => ({ type: LOGOUT })

