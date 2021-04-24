import {AppState, MapFile} from "../types";

export const getMapDataFromState = (data: AppState): MapFile => {
  let { tileUrl, tileDim, mapData } = data;

  return { tileUrl: tileUrl || '', tileDim: tileDim || 1, mapData: mapData }
}
