import {observer} from "mobx-react";
import {MapComponent} from "./MapComponent";
import {CellPalette} from "./CellPalette";
import {MapDimensionsComponent} from "./map/MapDimensions";
import React from "react";
import {ToolPalette} from "./ToolPalette";
import {MapLayers} from "./map/MapLayers";

export const MapEditorComponent = observer(function MapEditorComponent() {
   return (
        <div className="row">
            <MapLayers />
            <MapComponent/>
            <div className="col">
                <ToolPalette/>
                <CellPalette/>
                <MapDimensionsComponent/>
            </div>
        </div>
    )
})