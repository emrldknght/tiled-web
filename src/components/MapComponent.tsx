import React, {CSSProperties, useContext} from "react";
import {observer} from "mobx-react";
import {ToolPaletteContext} from "./ToolPalette";
import {RootContext} from "../store/RootStore";
import {MapControls, MCContext} from "./map/MapControls";

import {MapLayerComponent} from "./map/MapLayerComponent";

export const MapComponent = observer(function MapComponent() {

  const rootState = useContext(RootContext);

  const mapState = rootState.mapStore;

  const tileUrl = mapState.tileUrl;
  const tileDim = mapState.tileDim;


  const brushId = rootState.paletteStore.selectedTile;
  const x = mapState.curX;
  const y = mapState.curY;

  const tools = useContext(ToolPaletteContext);
  const currentTool = tools.currentTool;

  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const mcState = useContext(MCContext);
  const { showGrid, showCellInfo, show3D } = mcState;

  const applyPencil = (e: React.MouseEvent<HTMLDivElement>, cx: number, cy: number) => {

    console.log('poke', e.target, cx, cy, brushId);

    mapState.setMapTile(x ,y, brushId);

  }


  const pokeTile = (e: React.MouseEvent<HTMLDivElement>) => {
    let t = e.target as HTMLElement;
    if(!t) return;

    if (!t.classList.contains('cell')) {
      const c = t.closest('.cell');
      if(!c) return;
      t = c as HTMLElement;
    }

    let {x: xS, y: yS} = t.dataset;
    console.log(xS, yS);
    if(xS === undefined || yS === undefined) return;

    const tx = parseInt(xS);
    const ty = parseInt(yS);

    switch (currentTool) {
      case "Pencil":
        applyPencil(e, tx, ty);
        break;
      case 'Bucket':
        const clickInSelection = mapState.isHl(tx, ty);
        if(clickInSelection) {
          mapState.fillArea(brushId);
        }
        break;
      case "Select":
        if(!e.shiftKey) {
          mapState.resetHl();
        }
        mapState.selectArea(tx, ty);
        break;
    }
  }

  const showGridK = () => (showGrid) ? 'show-grid' : '';
  const show3DK = () => (show3D) ? 'show-3d' : '';

  return (
      <div className={`map ${showGridK()} ${show3DK()}`}
           style={p}
      >
        <div className="col">
          <b>Map Editor</b>
          {/* <DebugOut data={JSON.stringify(mapData2)} />
          <DebugOut data={JSON.stringify(mapState.selection)} /> */}
          <MapControls x={x} y={y} />
        </div>
        <div className="mapLayersWrapper">
          {Object.keys(mapState.mapDataL).map(layerName =>
              <MapLayerComponent mapLayerData={mapState.getMapLayer(layerName)}
                                 showCellInfo={showCellInfo}
                                 pokeTile={pokeTile}
              />
          )}
        </div>
      </div>
  )
})

