import {MapLayer} from "../../types";
import React from "react";
import {MapRow} from "./MapRow";

type MLProps = { name: string,
    mapLayerData: MapLayer, showCellInfo: boolean,
    pokeTile: (e: React.MouseEvent<HTMLDivElement>) => void,
    visible: boolean
}
export function MapLayerComponent({ name, mapLayerData, showCellInfo, pokeTile, visible }: MLProps) {
    const tm = mapLayerData.map((row, ry) =>
        <MapRow
            key={`mr_${ry}`}
            data={row} y={ry}
            showCellInfo={showCellInfo}
        />);

    const isVisible = (v: boolean) => v ? 'visible' : 'hidden';

    return (
        <div className={`mapLayerWrapper ${isVisible(visible)}`} onClick={pokeTile} data-name={name}>
            {/* <DebugOut data={JSON.stringify(visible)} /> */}
            {tm}
        </div>
    )
}
