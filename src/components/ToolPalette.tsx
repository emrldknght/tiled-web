import {faFill, faPen, faWindowClose, faHandPointUp, faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import React, {createContext, useContext} from "react";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import {rootStore} from "../store/RootStore";
import {ToolButton} from "./ToolPalette/ToolButton";

export enum PalTools {
    Pointer = 'pointer',
    Pencil = 'pencil',
    Bucket = 'bucket',
    Select = 'select',
    Deselect = 'deselect',
}
export type PalToolType = keyof typeof PalTools;

export class ToolPaletteState {
    @observable currentTool: PalToolType = 'Pencil'

    @action changeTool(tool: PalToolType) {
        this.currentTool = tool;
    }

    @action applyTool(tool: PalToolType) {
        console.log('Apply:', tool);
        rootStore.applyTool(tool);
    }

    constructor() {
        makeObservable(this)
    }
}
export const toolPaletteState = new ToolPaletteState();
export const ToolPaletteContext = createContext<ToolPaletteState>(toolPaletteState);

export const ToolPalette = observer(function ToolPalette() {
    const state = useContext(ToolPaletteContext);
    const at = state.currentTool;

    const handleChange = (e: React.MouseEvent) => {
        const t = e.currentTarget as HTMLDivElement;
        const tool = t.dataset.tool;
        console.log(tool);
        if(tool) {
            state.changeTool(tool as PalToolType);
        }
    }
    const handleApply = (e: React.MouseEvent) => {
        const t = e.currentTarget as HTMLDivElement;
        const tool = t.dataset.tool;
        console.log(tool);
        if(tool) {
            state.applyTool(tool as PalToolType);
        }
    }

    return(
        <div className="tools-palette">
            <b>Tools:</b>
            <div className="row">
                <ToolButton name="Pointer" tool={'Pointer'}
                            activeTool={at} handle={handleChange} icon={faHandPointUp} />
                <ToolButton name="Pencil" tool={'Pencil'}
                            activeTool={at} handle={handleChange} icon={faPen} />
                <ToolButton name="Bucket" tool={'Bucket'}
                            activeTool={at} handle={handleChange} icon={faFill} />
                <ToolButton name="Select" tool={'Select'}
                            activeTool={at} handle={handleChange} icon={faVectorSquare} />
                <ToolButton name="Deselect" tool={'Deselect'}
                            activeTool={at} handle={handleApply} icon={faWindowClose} />
            </div>
        </div>
    )
})