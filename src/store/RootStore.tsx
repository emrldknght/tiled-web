import {action, makeAutoObservable, observable, toJS} from "mobx";
import {createContext} from "react";
import {MapEntity} from "./MapStore";
import {prepareData} from "../lib/prepareData";
import {saveJson} from "../lib/saveJson";
import {PaletteStore} from "./PaletteStore";
import {PalToolType} from "../components/ToolPalette";
import {Path, postData} from "../lib/api";
import {TilerEntity} from "./TilerStore";

import {palData} from "./palData";
import {MapLayer} from "../types";

type MapLayerRaw = {
    name: string,
    data: MapLayer,
    order: number
}
type MapFile = {
    mapData: MapLayerRaw[],
    tileDim: number,
    tileUrl: string
}

function getMapFile(ctx: RootStore) {
    const data: MapFile = {
        "mapData":[
            /*
            {
                "name": "one",
                "data": toJS(this.mapStore.getMapLayer('one')),
                "order": 0
            },
            {
                "name": "two",
                "data": toJS(this.mapStore.getMapLayer('one')),
                "order": 1
            }
             */
        ],
        "tileDim": toJS(ctx.mapStore.tileDim) ?? 0,
        "tileUrl": "World_A2.png" // toJS(ctx.mapStore.tileUrl) ?? ''
    }

    const layers = ctx.mapStore.mapDataL;
    Object.keys(layers).forEach((layer, i) => {
        const l = layers[layer];
        const o: MapLayerRaw = {
            name: layer,
            data: l,
            order: i
        }
        data.mapData.push(o)
    })

    return data;
}


export class RootStore {
    public userStore: UserStore;
    public todoStore: TodoStore;
    public mapStore: MapEntity;
    public tilerStore: TilerEntity;

    public paletteStore: PaletteStore;

    @observable test = 1;

    @action update() {
        this.test = this.test + 1;
    }

    constructor() {
        this.userStore = new UserStore(this)
        this.todoStore = new TodoStore(this)
        this.mapStore = new MapEntity(this);
        this.paletteStore = new PaletteStore(this);
        this.tilerStore = new TilerEntity(this);

        makeAutoObservable(this);
    }

    saveMapFile() {
        const content = prepareData(toJS(this.mapStore));
        console.log('save from root->', content);
        saveJson(content);
    }

    async saveData() {
        const data = getMapFile(this);
        console.log('post->', data);

        const a = await postData(`${Path}/map-file/map1`, data);
        console.log('answer', a);
    }

    @action
    applyTool(tool: PalToolType) {
        switch (tool) {
            case "Pencil":
                break;
            case "Bucket":
                break;
            case "Deselect":
                this.mapStore.resetHl();
                break;
            default:
                break;
        }
    }

    @action async initAll(mode: 'prod' | 'devH' | 'devW' = 'devW') {
        if(mode === 'devW') {
            await this.mapStore.fetchMapFile('map1');

            this.paletteStore.setData(palData);

            // this.mapStore.setMapLayer('second', layer2);

        }
        if(mode === 'prod') {
            await this.mapStore.fetchMapFile('map1');
        }
    }

}




export class UserStore {
    private rootStore: RootStore;
    constructor(rootStoreE: RootStore) {
        this.rootStore = rootStoreE;
    }

    getTodos(user: string) {
        // Access todoStore through the root store.
        return this.rootStore.todoStore.todos.filter(todo => todo.author === user)
    }
}

type Todo = { author: string }

class TodoStore {
    todos: Todo[] = []
    rootStore

    constructor(rootStoreE: RootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStoreE;
    }
}

export const rootStore = new RootStore();
export const RootContext = createContext<RootStore>(rootStore);