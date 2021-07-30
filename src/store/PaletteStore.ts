import {makeObservable, observable} from "mobx";
import {palData} from "./palData";
import {RootStore} from "./RootStore";

export class PaletteStore {
    @observable public selectedTile: number = -1;
    @observable public data = palData;
    public rootStore?: RootStore;

    constructor(rootStore: RootStore) {
        if(rootStore) {
            this.rootStore = rootStore;
        }
        makeObservable(this);
    }
}