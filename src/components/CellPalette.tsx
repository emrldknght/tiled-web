import React, {CSSProperties, useContext} from "react";
import {observer} from "mobx-react";
import {DebugOut} from "./common/DebugOut";
import {RootContext} from "../store/RootStore";

export const CellPalette = observer(function CellPalette() {
  const rootState = useContext(RootContext);
  const tileUrl = rootState.mapStore.tileUrl;
  const tileDim = rootState.mapStore.tileDim;
  const palette = rootState.paletteStore;

  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const tapTile = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = (e.target as HTMLDivElement);
    const _id = t.dataset.id;
    if(!_id) return;
    const id = parseInt(_id);
    console.log('tap', id, typeof id);
    if (!isNaN(id)) {
      palette.paletteSelectTile(id);
    }
  }
  /*
  const k = Object.keys(props.data).map(item => {
    const t = props.data[item].type;
    return(<div key={`pal-cell-${item}`} data-id={item} className={`cell cell-map ${t}`}>{item}</div>)
  })
   */
  const selected = (id: number) => (palette.selectedTile === id) ? 'selected' : '';

  const k = palette.data.map(item => {
    const t = item.type;
    return (<div key={`pal-cell-${item.cid}`} data-id={item.id}
                 className={`cell cell-map ${t} ${selected(item.id)}`}

        >{item.id}</div>
    )
  })

  return (
      <div className="cell-palette col" style={p}>
        <b>Palette</b>
        <div className="col">
          <div className="row" onClick={tapTile}>
            {k}
            <div className="cell cell-map grass">A</div>
            <div className="cell cell-map water">B</div>
          </div>
          <div className="row">
            <DebugOut data={palette.data} />
          </div>
          <div className="row">From store : {palette.selectedTile}</div>
        </div>
      </div>
  )
})