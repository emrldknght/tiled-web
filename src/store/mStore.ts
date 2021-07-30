import {PalCell, TileSrc} from "../types";
import {palData} from "./palData";
import {action, configure, makeObservable, observable, toJS} from "mobx";
import {eraseCred, saveCred} from "../lib/creds";
import {Path, postData} from "../lib/api";
import {prepareData} from "../lib/prepareData";


configure({ enforceActions: 'always' })

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
  setTileUrl(url: string) {
    this.tileUrl = `${Path}/tilesets/${url}`;
  }

  @action
  setTileDim(dim: number) {
    this.tileDim = dim;
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
  tilerUpdateCell(cid: string, data: { k: string ; v: string | number; }) {
    const ind = this.palette.data.findIndex(i => i.cid === cid);
    if(ind !== -1) {
      const k = data.k as keyof PalCell;
      const v = data.v
      const l = this.palette.data[ind];
      (l[k] as string | number) = v;
    }
  }

  saveMapFile() {
    // const content = prepareData(toJS(this));
    // console.log('save->', content);
    // saveJson(content);
  }

  async saveData() {
    const content = prepareData(toJS(this));
    console.log('post->', content);

    const a = await postData(`${Path}/map-file/map1`, content);
    console.log('answer', a);

  }

  getCellR(x: number, y: number) {
    return [x, y]
  }
}

export const mAppState = new MAppState();


