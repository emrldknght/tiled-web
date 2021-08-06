import {MapRow} from "./map/MapRow";
import React, {CSSProperties, useContext} from "react";
import {observer} from "mobx-react";
import {ToolPaletteContext} from "./ToolPalette";
import {RootContext} from "../store/RootStore";
import {MapControls, MCContext} from "./map/MapControls";


export const MapComponent = observer(function MapComponent() {

  const rootState = useContext(RootContext);

  const mapState = rootState.mapStore;

  const tileUrl = mapState.tileUrl;
  const tileDim = mapState.tileDim;

  // const mapData = state.mapData;

  const brushId = rootState.paletteStore.selectedTile;
  const x = mapState.curX;
  const y = mapState.curY;

  const tools = useContext(ToolPaletteContext);
  const currentTool = tools.currentTool;


  const mapData2 = mapState.mapData;

  // const u = props.tileUrl ? `--tile-root: url(${props.tileUrl});` : '';
  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const mcState = useContext(MCContext);
  const { showGrid, showCellInfo, show3D } = mcState;

  const tm = mapData2.map((row, y) =>
      <MapRow
          key={`mr_${y}`}
          data={row} y={y}
          showCellInfo={showCellInfo}
      />);

  // const setTile = () => { setMapTile(2, 2, 0); }

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

    const x = parseInt(xS);
    const y = parseInt(yS);

    const applyPencil = (x:number, y: number) => {
      // const _x = parseInt(x || '');
      // const _y = parseInt(y || '');
      console.log('poke', e.target, x, y, brushId);
      // if (!isNaN(_x) && !isNaN(_y)) {
      // mAppState.setMapTile(x, y, brushId);
      mapState.setMapTile(x ,y, brushId);
      // }
    }
    // console.log('ct', currentTool);

    switch (currentTool) {
      case "Pencil":
        applyPencil(x, y);
        break;
      case "Bucket":
        console.log('will fill');
        mapState.pokeCell(x, y);
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
        <div className={`mapWrapper`} onClick={pokeTile}>
          {tm}
        </div>
      </div>
  )
})

