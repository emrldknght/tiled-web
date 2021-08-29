export type MapLayer = number[][];
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

type MapLayerObject = { name: string, data: MapLayer, order: number }

export type MapFile = {
  tileUrl: string,
  tileDim: number,
  mapData: MapLayerObject[]
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

export type ApiAnswer<T> = ApiError | T;

export function isApiError<T>(answer: ApiAnswer<T>): answer is ApiError {
  return (answer as ApiError).error !== undefined;
}
/*
export function isApiOk(answer: ApiAnswer): answer is ApiOk {
  return (answer as ApiOk).status === 'ok';
} */
