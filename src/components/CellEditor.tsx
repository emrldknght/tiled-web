import React, {useContext} from "react";
import {PalCell} from "../types";
import {observer} from "mobx-react";
import {RootContext} from "../store/RootStore";
import {DebugOut} from "./common/DebugOut";

export const CellEditor = observer(function CellEditor() {

    const rootState = useContext(RootContext);

    const palette = rootState.paletteStore.data;
    const tilerSelectedCell = rootState.tilerStore.selectedCell;

    const selectedCellData = (palette: PalCell[], selected: string | null) => {
        const f = palette.filter(cell => cell.cid === selected);

        return f[0] ?? null;
    }
    const cd = () => selectedCellData(palette, tilerSelectedCell);

    const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        const t = e.target;
        console.log('handle', t);

        const nv = parseInt(t.value) || t.value;

        if(!tilerSelectedCell) return;
        rootState.paletteStore.tilerUpdateCell(tilerSelectedCell, {k: t.name, v: nv});
    }

    return (
        <div className="pal-cell-editor col">
            <b>Cell editor:</b>
            <button onClick={() => rootState.paletteStore.saveData()}>Save</button>
            <span>selected: {tilerSelectedCell}</span>
            <span>
            <DebugOut data={cd()} />
          </span>
            {(cd()) ? (
                <div className="col inputs">
                    <label htmlFor="cid">cid:</label>
                    <input type="text" value={cd().cid} disabled={true} name="cid"/>
                    <label>id:</label>
                    <input type="text" value={cd().id} onChange={handleKey} name="id"/>
                    <label>x:</label>
                    <input type="text" value={cd().x} disabled={true}/>
                    <label>y:</label>
                    <input type="text" value={cd().y} disabled={true}/>
                    <label>type:</label>
                    <input type="text" value={cd().type} onChange={handleKey} name="type"/>
                    <label>bg:</label>
                    <input type="text" value={cd().bg} onChange={handleKey} name="bg"/>
                </div>
            ) : ('')
            }
            {/* <button>Update Cell Data</button> */}
        </div>
    )
})