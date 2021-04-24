import {PalCell, TileSrc} from "../types";
import {palData} from "./palData";
import {action, makeObservable, observable} from "mobx";
import {eraseCred, saveCred} from "../lib/creds";
import {fetchMapFile} from "../lib/fetchMapFile";
import {Path} from "../lib/api";


export type MAppStateT = {
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

class MAppState implements MAppStateT {
  auth = false;
  tileSrc = { w:0, wc: 0, h: 0, hc: 0, loaded: false };
  palette = {
    selectedTile: -1,
    data: palData
  };
  st = -3;
  tileUrl: string | null = null;
  tileDim: number | null = null;
  mapData: number[][] = [];
  tiler: {
    selectedCell: string | null
  } = { selectedCell: null }
  constructor() {
    makeObservable(this, {
      auth: observable,
      tileSrc: observable,
      palette: observable,
      tileUrl: observable,
      tileDim: observable,
      mapData: observable,
      tiler: observable,
      login: action,
      setMap: action,
      setTileUrl: action,
      setTileDim: action,
      // fetchMapFile
      tilerSelectCell: action,
      setTileSrcR: action,
      paletteAddCell: action,
      paletteRemoveCell: action,
      tilerUpdateCell: action,
      setMapTile: action,
      paletteSelectTile: action,
    })
  }
  login(login: string, pass: string) {
    if(login === 'yoba' && pass === 'aboy') {
      // console.log('logging');
      saveCred(login, pass)
      this.auth = true;
    }
  }
  logout() {
    eraseCred();
    this.auth = false;
  }
  setMap(data: number[][]) {
    this.mapData = data as number[][];
  }
  setTileUrl(url: string) {
    this.tileUrl = `${Path}/tilesets/${url}`;
  }
  setTileDim(dim: number) {
    this.tileDim = dim;
  }
  async fetchMapFile() {
    const md = await fetchMapFile();
    // console.log('mda', md);
    if(md) {
      this.setMap(md.mapData);
      this.setTileUrl(md.tileUrl);
      this.setTileDim(md.tileDim);
    }
  }
  tilerSelectCell(cid: string) {
    this.tiler.selectedCell = cid;
  }
  setTileSrcR(data: TileSrc) {
    this.tileSrc = data;
  }
  paletteAddCell(cell: PalCell) {
    this.palette.data.push(cell);
  }
  paletteRemoveCell(cid: string) {
    // const np = this.palette.data.filter(i => i.cid !== cid)
    const ind = this.palette.data.findIndex(i => i.cid === cid);
    if(ind !== -1) {
      this.palette.data.splice(ind, 1);
    }
  }
  tilerUpdateCell(cid: string, data: { k: string ; v: string | number; }) {
    const ind = this.palette.data.findIndex(i => i.cid === cid);
    if(ind !== -1) {
      const k = data.k as keyof PalCell;
      const v = data.v
      const l = this.palette.data[ind];
      (l[k] as string | number) = v;
    }
  }
  setMapTile(x: number, y: number, id: number) {
    console.log('smt', x, y, id);
    this.mapData[y][x] = id;
  }
  paletteSelectTile(id: number) {
    this.palette.selectedTile = id;
  }
  saveMapFile() {

  }
  saveData() {

  }
}

export const mAppState = new MAppState();