import { TImg } from "./tiler/TImg";
import {TGrid, cellKey} from "./tiler/TGrid";
import React, {CSSProperties, useContext} from "react";
import {CellEditor} from "./CellEditor";
import {observer} from "mobx-react";
import {mAppState} from "../store/mStore";
import {StoreContext} from "../store/StoreContext";

export const TilerComponent = observer(() => {

  const state = useContext(StoreContext);
  const tileUrl = state.tileUrl;
  const tileDim = state.tileDim;
  const tileSrc = state.tileSrc;
  const palette = state.palette.data;
  // { tilerSelectCell }: Props

  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const selectTile = (x: number, y: number) => {
    const cid = cellKey(x, y);
    console.log(`select it: ${cid}`);
    // tilerSelectCell(cid);
    mAppState.tilerSelectCell(cid);
  }

  // const cellTemplate = { id: -2, }

  return (
    <div className="tiler" style={p}>
      <b>Tiler</b>
      <div>{JSON.stringify(palette)}</div>
      <input type="checkbox"/>
      <div className="row">
        <div className="content">
          <div className="layer grid-base">
            <TGrid selectTile={selectTile}/>
          </div>
          <div className="layer tile-base">
            <TImg/>
          </div>
          <div className="info-tooltip">Info:{JSON.stringify(tileSrc)}</div>
        </div>
        <CellEditor/>
      </div>
    </div>
  )
})