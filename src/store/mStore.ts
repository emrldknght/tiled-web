import {ApiError, AppState, isApiError, MapFile, PalCell, TileSrc} from "../types";
import {palData} from "./palData";
import {action, configure, makeObservable, observable, toJS} from "mobx";
import {eraseCred, saveCred} from "../lib/creds";
import {fetchMap, Path, postData} from "../lib/api";
import {saveJson} from "../lib/saveJson";
import {PanelMode} from "../components/map/MapDimensions";
import {getAction} from "../lib/dimensions";

configure({ enforceActions: 'always' })

const prepareData = (state: AppState) => {
  const data = {
    mapData: state.mapData,
    tileDim: state.tileDim,
    tileUrl: (state.tileUrl || '').replace(/^.*([\\/:])/, '')
    // tileUrl: (state.tileUrl || '').replace(/^.*(\\|\/|\:)/, '')
  }
  return JSON.stringify(data);
};

export class MAppState {
  @observable auth = false;
  @observable tileSrc = { w:0, wc: 0, h: 0, hc: 0, loaded: false };
  @observable palette = {
    selectedTile: -1,
    data: palData
  };
  @observable st = -3;
  @observable tileUrl: string | null = null;
  @observable tileDim: number | null = null;
  @observable mapData: number[][] = [];
  @observable tiler: {
    selectedCell: string | null
  } = { selectedCell: null }

  @observable error: string = '';

  @observable curX = -1;
  @observable curY = -1;
  @action
  setXY(x: number, y: number) {
    this.curX = x;
    this.curY = y;
  }
  @observable hl: number[][] = [];

  @action
  setHl(x: number, y: number) {
    this.resetHl();
    this.hl[y][x] = 1;
  }
  @action resetHl() {
    const hl = this.mapData.map(row => row.map(cell => 0));
    this.hl = hl as number[][];
  }

  isHl(x: number, y: number) {
    return this.hl[y][x] === 1;
  }

  constructor() {
    makeObservable(this);
  }
  @action
  login(login: string, pass: string) {
    // console.log('login!');
    if(login === 'yoba' && pass === 'aboy') {
      // console.log('logging');
      saveCred(login, pass)
      this.auth = true;
    }
  }
  @action
  logout() {
    eraseCred();
    this.auth = false;
  }

  @action
  setMap(data: number[][]) {
    this.mapData = data as number[][];
    this.resetHl();
  }

  @action
  setTileUrl(url: string) {
    this.tileUrl = `${Path}/tilesets/${url}`;
  }

  @action
  setTileDim(dim: number) {
    this.tileDim = dim;
  }

  async fetchMapFile(mapId: string) {
    const md: MapFile | ApiError = await fetchMap(mapId);// fetchMapFile();
    console.log('mda', md);
    if(isApiError(md)) {
      this.error = md.error;
      return;
    }
    if(md) {
      this.setMap(md.mapData);
      this.setTileUrl(md.tileUrl);
      this.setTileDim(md.tileDim);
    }
  }

  @action
  tilerSelectCell(cid: string) {
    this.tiler.selectedCell = cid;
  }

  @action
  setTileSrcR(data: TileSrc) {
    this.tileSrc = data;
  }

  @action
  paletteAddCell(cell: PalCell) {
    this.palette.data.push(cell);
  }

  @action
  paletteRemoveCell(cid: string) {
    // const np = this.palette.data.filter(i => i.cid !== cid)
    const ind = this.palette.data.findIndex(i => i.cid === cid);
    if(ind !== -1) {
      this.palette.data.splice(ind, 1);
    }
  }

  @action
  tilerUpdateCell(cid: string, data: { k: string ; v: string | number; }) {
    const ind = this.palette.data.findIndex(i => i.cid === cid);
    if(ind !== -1) {
      const k = data.k as keyof PalCell;
      const v = data.v
      const l = this.palette.data[ind];
      (l[k] as string | number) = v;
    }
  }

  @action
  setMapTile(x: number, y: number, id: number) {
    console.log('smt', x, y, id);
    this.mapData[y][x] = id;
  }

  @action
  paletteSelectTile(id: number) {
    this.palette.selectedTile = id;
  }

  saveMapFile() {
    const content = prepareData(toJS(this));
    console.log('save->', content);
    saveJson(content);
  }

  async saveData() {
    const content = prepareData(toJS(this));
    console.log('post->', content);

    const a = await postData(`${Path}/map-file/map1`, content);
    console.log('answer', a);

  }

  @action
  mapExpand(mode: PanelMode, dimActive: number) {
    let action = getAction(dimActive, mode);
    console.log(action, typeof action);
    if(typeof action === 'function') action(this.mapData);
    this.resetHl();
  }

  getCellR(x: number, y: number) {
    return [x, y]
  }
}

export const mAppState = new MAppState();