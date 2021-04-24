export type PalCell = {
  id: number,
  type: string,
  cid: string,
  x: number,
  y: number,
  bg: string
}
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
export type MapFile = {
  tileUrl: string,
  tileDim: number,
  mapData: number[][]
}