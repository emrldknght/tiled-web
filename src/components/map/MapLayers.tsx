import {observer} from "mobx-react";
import React, {useContext} from "react";
import {RootContext} from "../../store/RootStore";

export const MapLayers = observer(function MapLayers() {
    const rootStore = useContext(RootContext);
    const map = rootStore.mapStore;

    return (
        <div className="map-layers col">
            <span className="active-layer">{map.activeLayer}</span>
        </div>
    )
})