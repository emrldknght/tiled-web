import {PalCell, palData} from "./palData";

export type TileSrc = {
  w: number,
  wc: number,
  h: number,
  hc: number,
  loaded: boolean,
}

export type AppState = {
  auth: boolean,
  tileSrc: TileSrc,
  palette: {
    selectedTile: number,
    data: PalCell[]
  },
  st: number,
  tileUrl: string | null,
  tileDim: number | null,
  mapData: number[][],
  tiler: {
    selectedCell: string | null
  }
}

export const initState: AppState = {
  auth: false,
  tileSrc: { w:0, wc: 0, h: 0, hc: 0, loaded: false },
  palette: {
    selectedTile: -1,
    data: palData
  },
  st: -3,
  tileUrl: null,
  tileDim: null,
  mapData: [],
  tiler: {
    selectedCell: null
  }
};