import {action, makeObservable, observable} from "mobx";
import {PalCell} from "../types";

export class TilerEntity {
  public rootStore: any;

  @observable selectedCell: string | null = null;

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

}