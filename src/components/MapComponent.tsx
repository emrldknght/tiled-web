import {MapRow} from "./map/MapRow";
import React, {CSSProperties, useContext} from "react";
import {observer} from "mobx-react";
import {mAppState} from "../store/mStore";
import {StoreContext} from "../store/StoreContext";
import {LSKeys, useLState} from "../LocalState";

export const MapComponent = observer(function MapComponent() {
  const state = useContext(StoreContext);
  const tileUrl = state.tileUrl;
  const tileDim = state.tileDim;
  const mapData = state.mapData;
  const brushId =  state.palette.selectedTile;

  // const u = props.tileUrl ? `--tile-root: url(${props.tileUrl});` : '';
  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const [showGrid, setShowGrid] = useLState(true, LSKeys.MapGrid);
  const [showCellInfo, setShowCellInfo] = useLState(true, LSKeys.MapCellInfo);

  const tm = mapData.map((row, y) =>
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

    let {x, y} = t.dataset;
    const _x = parseInt(x || '');
    const _y = parseInt(y || '');
    console.log('poke', e.target, _x, _y, brushId);
    if (!isNaN(_x) && !isNaN(_y)) {
      mAppState.setMapTile(_x, _y, brushId);
    }
  }

  const showGridK = () => (showGrid) ? 'show-grid' : '';
  const toggleShowGrid = () => setShowGrid(!showGrid);

  const toggleShowCellInfo = () => setShowCellInfo(!showCellInfo);

  return (
      <div className={`map ${showGridK()}`}
           style={p}
      >
        <div className="col">
          <b>Map Editor</b>
          <div className="row">
            <label>
              <input type="checkbox" checked={showGrid}
                     onChange={toggleShowGrid}/>Show Grid
            </label>
            <label>
              <input type="checkbox" checked={showCellInfo}
                     onChange={toggleShowCellInfo}/>Show Info
            </label>
            {/*
          BID: {brushId}
          <button onClick={setTile}>Set!</button>
          From store{JSON.stringify(mapData)}
           */}
          </div>
        </div>
        <div className={`mapWrapper`} onClick={pokeTile}>{tm}</div>
      </div>
  )
})