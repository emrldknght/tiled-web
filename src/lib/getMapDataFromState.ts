import {AppState, MapFile, MapLayer} from "../types";

export const getMapDataFromState = (data: AppState): MapFile => {
  let { tileUrl, tileDim, mapData } = data;

  const md = {
    name: 'test',
    order: 0,
    data: mapData as MapLayer
  }

  return { tileUrl: tileUrl || '', tileDim: tileDim || 1, mapData: [ md ] }
}
