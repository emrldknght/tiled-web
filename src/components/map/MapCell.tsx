import {getCT} from "../../lib/getCellType";
import {observer} from "mobx-react";
import React, {useContext} from "react";
import {StoreContext} from "../../store/StoreContext";
import {RootContext} from "../../store/RootStore";


type Props = {
  id: number,
  x: number,
  y: number,
  showCellInfo: boolean,
}

export const MapCell = observer(function MapCell({id, x, y, showCellInfo } : Props) {
  const appState = useContext(StoreContext);

  const rootState = useContext(RootContext);

  const mapState = rootState.mapStore;

  const types = appState.palette.data;
  const ct = getCT(types, id);
  const surroundingCells = JSON.stringify(appState.getCellR(x, y));

  const onCell = (e: React.MouseEvent) => {
    e.stopPropagation();
    // console.log('on', e.currentTarget);
    mapState.setXY(x ,y);
    // state.setHl(x, y);
  }

  const pokeCell = (e: React.MouseEvent) => {
    // e.stopPropagation()
    // state.pokeCell(x, y);
  }

  const isHl = (mapState.isHl(x ,y)) ? 'hl' : '';

  return (
    <div className={`cell cell-map ${ct} ${isHl}`}
         data-x={x} data-y={y}
         data-id={id}
         onMouseOver={onCell}
         onClick={pokeCell}
    >
      {(showCellInfo)
        ? (
          <span className="col">
            <span>{id} ({x}, {y})</span>
            <span>{JSON.stringify(ct)}</span>
            <span>{surroundingCells}</span>
          </span>
        )
        : ('')
      }

    </div>
  )
})