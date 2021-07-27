import {getCT} from "../../lib/getCellType";
import {observer} from "mobx-react";
import React, {useContext} from "react";
import {StoreContext} from "../../store/StoreContext";


type Props = {
  id: number,
  x: number,
  y: number,
  showCellInfo: boolean,
}

export const MapCell = observer(function MapCell({id, x, y, showCellInfo } : Props) {
  const state = useContext(StoreContext);
  const types = state.palette.data;
  const ct = getCT(types, id);
  const surroundingCells = JSON.stringify(state.getCellR(x, y));

  const onCell = (e: React.MouseEvent) => {
    e.stopPropagation();
    // console.log('on', e.currentTarget);
    state.setXY(x ,y);
    state.setHl(x, y);
  }

  const isHl = (state.isHl(x ,y)) ? 'hl' : '';

  return (
    <div className={`cell cell-map ${ct} ${isHl}`}
         data-x={x} data-y={y}
         data-id={id}
         onMouseOver={onCell}
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