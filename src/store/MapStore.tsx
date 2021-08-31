import {action, makeObservable, observable, toJS} from "mobx";
import {PanelMode} from "../components/map/MapDimensions";
import {getAction} from "../lib/dimensions";
import {fetchMap, Path} from "../lib/api";
import {isApiError, MapLayer} from "../types";
import {saveJson} from "../lib/saveJson";
import {createContext} from "react";
import {prepareData} from "../lib/prepareData";
import {RootStore} from "./RootStore";
import {selectMapArea} from "../components/map/selectMapArea";

export class MapEntity {
    public rootStore: RootStore | undefined;

    constructor(rootStore?: RootStore) {
        if(rootStore) {
            this.rootStore = rootStore;
        }
        makeObservable(this) // , { rootStore: false })
    }

    @observable error: string = '';

    @observable activeLayer: string = 'map';
    @observable mapDataL: { [key: string] : MapLayer}  = {};

    //  @observable mapData: MapLayer = [];

    get mapData() {
        return this.mapDataL[this.activeLayer] ?? [];
    }

    set mapData(val: MapLayer) {
        this.mapDataL[this.activeLayer] = val;
    }

    @observable selection: number[][] = [];

    @action setActiveLayer(name: string) {
        this.activeLayer = name;
    }

    @action
    setMapLayer(name: string, data: MapLayer) {
        this.mapDataL[name] = data;
    }

    getMapLayer(name: string): MapLayer {
        if(!this.mapDataL[name]) return []
        return this.mapDataL[name];
    }

    @action
    setMap(data: number[][]) {
        this.mapData = data;
        this.resetHl();
    }

    @action setRow(y: number, row: number[]) {
        this.mapData[y] = row;
    }

    @action resetHl() {
        const hl = this.mapData.map(row => row.map(() => -1));
        this.selection = hl;
    }

    @action
    setHl(x: number, y: number) {
        this.resetHl();
        this.selection[y][x] = 1;
    }

    isHl(x: number, y: number) {
        if(!this.selection.length) return false;
        if(this.selection[y] === undefined) return false;

        return this.selection[y][x] !== -1;
    }

    @action
    setMapTile(x: number, y: number, id: number) {
        console.log('smt', x, y, id);
        this.mapData[y][x] = id;
    }

    @action
    mapExpand(mode: PanelMode, dimActive: number) {

        const action = getAction(dimActive, mode);

        if(typeof action === 'function') {
            const oldLayer = toJS(this.mapData);
            const newLayer = action(oldLayer) as MapLayer;
            if(newLayer) {
                this.setMap(newLayer);
            } else {
                console.warn('extend layer empty')
            }
        }

        this.resetHl();
    }

    @observable tileUrl: string | null = null;
    @observable tileDim: number | null = null;

    @action
    setTileUrl(url: string, relative = false) {
        if(relative) {
            this.tileUrl = url;
            return;
        }
        this.tileUrl = `${Path}/tilesets/${url}`;
    }

    @action
    setTileDim(dim: number) {
        this.tileDim = dim;
    }

    @observable curX = -1;
    @observable curY = -1;
    @action
    setXY(x: number, y: number) {
        this.curX = x;
        this.curY = y;
    }

    @action setHLC(x: number, y: number, v: number) {
        this.selection[y][x] = v;
    }

    @action
    selectArea(x: number, y: number) {
        selectMapArea(x, y, this);
    }

    @action
    fillArea(brushId: number) {
        console.log(JSON.stringify(this.selection));
        this.selection.forEach((row, y) => {
            row.forEach((cell, x) => {
                if(cell !== -1) {
                    this.setMapTile(x ,y, brushId);
                }
            })
        })
    }

    async fetchMapFile(mapId: string) {
        const md = await fetchMap(mapId);//from fetchMapFile();
        console.log('mda', md);
        if(isApiError(md)) {
            this.error = md.error;
            return;
        }
        if(md) {
            md.mapData.forEach(layer => {
                console.log('L->', layer.name);
                this.setActiveLayer(layer.name);
                this.setMap(layer.data);
            })
            // this.setMap(md.mapData[0].data)

            this.setTileUrl(md.tileUrl);
            this.setTileDim(md.tileDim);
        }
    }

    saveMapFile() {
        const content = prepareData(toJS(this));
        console.log('save->', content);
        saveJson(content);
    }

}
export const mapEntity = new MapEntity();
export const MapContext = createContext<MapEntity>(mapEntity);