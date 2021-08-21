import {observer} from "mobx-react";
import React, {useContext} from "react";
import {RootContext} from "../../store/RootStore";

export const MapLayers = observer(function MapLayers() {
    const rootStore = useContext(RootContext);
    const map = rootStore.mapStore;

    const handleClick = (name: string) => map.setActiveLayer(name);

    return (
        <div className="map-layers col">
            <span className="active-layer">
                <strong>{map.activeLayer}</strong>
            </span>
            <hr />
            {Object.keys(map.mapDataL).map(name => {
                const selected = (name === map.activeLayer) ? 'selected' : '';
                return (<span
                    key={name}
                    onClick={handleClick.bind(null, name)}
                    className={selected}
                >{name}</span> )
            })}
        </div>
    )
})