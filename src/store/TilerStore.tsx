import {action, makeObservable, observable} from "mobx";
import {TileSrc} from "../types";

export class TilerEntity {
  public rootStore: any;

  @observable selectedCell: string | null = null;

  @observable tileSrc: TileSrc = { w:0, wc: 0, h: 0, hc: 0, loaded: false };

  constructor(rootStore?: any) {
    if(rootStore) {
      this.rootStore = rootStore;
    }
    makeObservable(this) // , { rootStore: false })
  }

  @action
  tilerSelectCell(cid: string) {
    this.selectedCell = cid;
  }

  @action
  setTileSrcR(data: TileSrc) {
    this.tileSrc = data;
  }

}