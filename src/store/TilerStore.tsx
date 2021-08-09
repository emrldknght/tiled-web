import {action, makeObservable, observable} from "mobx";
import {TileSrc} from "../types";
import {RootStore} from "./RootStore";

export class TilerEntity {
  public rootStore: RootStore | undefined;

  @observable selectedCell: string | null = null;

  @observable tileSrc: TileSrc = { w:0, wc: 0, h: 0, hc: 0, loaded: false };

  constructor(rootStore?: RootStore) {
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