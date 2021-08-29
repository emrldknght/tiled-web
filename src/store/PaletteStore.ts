import {action, makeObservable, observable} from "mobx";
import {RootStore} from "./RootStore";
import {PalCell} from "../types";

export class PaletteStore {
    @observable public selectedTile: number = 0;
    @observable public data: PalCell[] = [];
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

    @action
    tilerUpdateCell(cid: string, data: { k: string ; v: string | number; }) {
        const ind = this.data.findIndex(i => i.cid === cid);
        if(ind !== -1) {
            const k = data.k as keyof PalCell;
            const v = data.v
            const l = this.data[ind];
            (l[k] as string | number) = v;
        }
    }

    @action setData(data: PalCell[]) {
        this.data = data;
    }
}