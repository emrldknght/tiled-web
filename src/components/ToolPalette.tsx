import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFill, faPen, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import React, {createContext, useContext} from "react";
import {observer} from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import {mAppState} from "../store/mStore";

export enum PalTools {
    Pencil = 'pencil',
    Bucket = 'bucket'
}
export type PalToolType = keyof typeof PalTools;

export class ToolPaletteState {
    @observable currentTool: PalToolType = 'Pencil'

    @action changeTool(tool: PalToolType) {
        this.currentTool = tool;
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
            // mAppState.applyTool(tool as PalToolType);
        }
    }

    return(
        <div className="tools-palette">
            <b>Tools:</b>
            <div className="row">
                <div className={`tool-icon ${(at === 'Pencil') ? 'active' : ''}`} data-tool={'Pencil'}
                     onClick={handleChange}

                >
                    <FontAwesomeIcon icon={faPen} size="2x"/>
                    <span className="name">Pencil</span>
                </div>
                <div className={`tool-icon ${(at === 'Bucket') ? 'active' : ''}`} data-tool={'Bucket'}
                     onClick={handleChange}
                >
                    <FontAwesomeIcon icon={faFill} size="2x"/>
                    <span className="name">Bucket</span>
                </div>
                <div className={`tool-icon`} data-tool={'Deselect'}
                    onClick={handleApply}
                >
                   <FontAwesomeIcon icon={faWindowClose} size="2x" />
                   <span className="name">Deselect</span>
                </div>
            </div>
        </div>
    )
})