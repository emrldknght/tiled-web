import {MapLayer} from "../../types";
import React from "react";
import {MapRow} from "./MapRow";

type MLProps = { mapLayerData: MapLayer, showCellInfo: boolean, pokeTile: (e: React.MouseEvent<HTMLDivElement>) => void }
export function MapLayerComponent({ mapLayerData, showCellInfo, pokeTile }: MLProps) {
    const tm = mapLayerData.map((row, ry) =>
        <MapRow
            key={`mr_${ry}`}
            data={row} y={ry}
            showCellInfo={showCellInfo}
        />);

    return (
        <div className={`mapLayerWrapper`} onClick={pokeTile}>
            {tm}
        </div>
    )
}