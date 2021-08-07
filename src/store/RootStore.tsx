import {action, makeAutoObservable, observable, toJS} from "mobx";
import {createContext} from "react";
import {MapEntity} from "./MapStore";
import {prepareData} from "../lib/prepareData";
import {saveJson} from "../lib/saveJson";
import {PaletteStore} from "./PaletteStore";
import {PalToolType} from "../components/ToolPalette";
import {Path, postData} from "../lib/api";
import {TilerEntity} from "./TilerStore";

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
        const content = prepareData(toJS(this.mapStore));
        console.log('post->', content);

        const a = await postData(`${Path}/map-file/map1`, content);
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

}




export class UserStore {
    private rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
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

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false })
        this.rootStore = rootStore
    }
}

export const rootStore = new RootStore();
export const RootContext = createContext<RootStore>(rootStore);