import {action, makeObservable, observable} from "mobx";
import {palData} from "./palData";
import {RootStore} from "./RootStore";
import {PalCell} from "../types";

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

    @action
    paletteSelectTile(id: number) {
        this.selectedTile = id;
    }

    @action
    paletteAddCell(cell: PalCell) {
        this.data.push(cell);
    }
    @action
    paletteRemoveCell(cid: string) {
        // const np = this.palette.data.filter(i => i.cid !== cid)
        const ind = this.data.findIndex(i => i.cid === cid);
        if(ind !== -1) {
            this.data.splice(ind, 1);
        }
    }
}