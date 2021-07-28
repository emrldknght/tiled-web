import {observer} from "mobx-react";
import {MapComponent} from "./MapComponent";
import {CellPalette} from "./CellPalette";
import {MapDimensionsComponent} from "./map/MapDimensions";
import React from "react";

export const MapEditorComponent = observer(function MapEditorComponent() {
  return (
    <div className="row">
      <MapComponent/>
      <div className="col">
        <CellPalette/>
        <MapDimensionsComponent />
      </div>
    </div>
  )
})