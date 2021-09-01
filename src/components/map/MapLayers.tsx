import {observer} from "mobx-react";
import React, {useContext} from "react";
import {RootContext} from "../../store/RootStore";
import {LayerSelector} from "./LayerSelector";

export const MapLayers = observer(function MapLayers() {
    const rootStore = useContext(RootContext);
    const map = rootStore.mapStore;

    const handleClick = (name: string) => map.setActiveLayer(name);

    return (
        <div className="map-layers col">
            <span className="active-layer">
                <strong>{map.activeLayer}</strong>
            </span>
            <span>{JSON.stringify(map.visibleLayers)}</span>
            <hr />
            {Object.keys(map.mapDataL).map(name => {
                const selected = (name === map.activeLayer) ? 'selected' : '';
                return (
                    <LayerSelector
                        key={name}
                        name={name}
                        handleClick={handleClick.bind(null, name)}
                        selected={selected}
                    />
                )
            })}
        </div>
    )
})