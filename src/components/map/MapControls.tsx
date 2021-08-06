import {action, makeObservable, observable} from "mobx";
import {LSKeys} from "../../LocalState";
import React, {createContext, useContext} from "react";
import {observer} from "mobx-react";
import {persist} from "../../lib/persist";

class MapControlsState {
    @observable showGrid = false;
    @observable showCellInfo = true;
    @observable show3D = false;

    @action setShowGrid(v: boolean) {
        this.showGrid = v;
    }

    @action setShowCellInfo(v : boolean) {
        this.showCellInfo = v;
    }

    @action setShow3D(v: boolean) {
        this.show3D = v;
    }

    constructor() {
        makeObservable(this);
        persist<MapControlsState>(this, 'showGrid', LSKeys.MapGrid);
        persist<MapControlsState>(this, 'showCellInfo', LSKeys.MapCellInfo);
        persist<MapControlsState>(this, 'show3D', LSKeys.Map3DView);
    }

}
const mapControlsState = new MapControlsState();
export const MCContext = createContext(mapControlsState);


export const MapControls = observer(function MapControls({x, y} : {x: number, y: number}) {

    const state = useContext(MCContext);

    const showGrid = state.showGrid;
    const showCellInfo = state.showCellInfo;
    const show3D  = state.show3D;

    const toggleShowGrid = () => state.setShowGrid(!showGrid);
    const toggleShowCellInfo = () => state.setShowCellInfo(!showCellInfo);
    const toggleShow3D = () => state.setShow3D(!show3D);

    return(
        <div className="row">
            <label>
                <input type="checkbox" checked={showGrid}
                       onChange={toggleShowGrid}/>Show Grid
            </label>
            <label>
                <input type="checkbox" checked={showCellInfo}
                       onChange={toggleShowCellInfo}/>Show Info
            </label>
            <label>
                <input type="checkbox" checked={show3D}
                       onChange={toggleShow3D} /> Show 3D
            </label>
            <div>x: {x} y: {y}</div>
            {/*
          BID: {brushId}
          <button onClick={setTile}>Set!</button>
          From store{JSON.stringify(mapData)}
           */}
        </div>
    )
});