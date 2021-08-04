import {Character} from "./types/Character";
import {Weapon} from "./types/Weapon";
import {ItemP} from "./types/Item";
import {Armor} from "./types/Armor";

export type MapData = number[][];
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


export type ApiRequestResult = {
  status: 'ok' | 'error'
}

export type ApiOk = ApiRequestResult & {
  status: 'ok',
  result: string
}
export type ApiError = ApiRequestResult & {
  status: 'error',
  error: string
}

export type ApiAnswer = ApiError | ApiOk | MapFile | Character | string[] | ItemP[] | Weapon | Armor;

export function isApiError(answer: ApiAnswer): answer is ApiError {
  return (answer as ApiError).error !== undefined;
}
export function isApiOk(answer: ApiAnswer): answer is ApiOk {
  return (answer as ApiOk).status === 'ok';
}
