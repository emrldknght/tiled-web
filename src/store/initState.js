import {palData} from "../lib/palData";

export const initState = {
  tileSrc: { w:0, wc: 0, h: 0, hc: 0, loaded: false },
  palette: {
    selectedTile: -1,
    data: palData
  },
  st: -3,
  tileUrl: null,
  tileDim: null,
  map: []
};