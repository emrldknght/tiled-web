import {palData} from "./palData";

export const initState = {
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