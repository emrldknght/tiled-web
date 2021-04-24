import {AppState} from "../store/initState";
import {MapFile} from "./fetchMapFile";

export const getMapDataFromState = (data: AppState): MapFile => {
  let { tileUrl, tileDim, mapData } = data;

  return { tileUrl: tileUrl || '', tileDim: tileDim || 1, mapData: mapData }
}
