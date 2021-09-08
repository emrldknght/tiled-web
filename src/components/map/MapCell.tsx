import {getCT} from "../../lib/getCellType";
import {observer} from "mobx-react";
import React, {useContext} from "react";
import {RootContext} from "../../store/RootStore";


type Props = {
  id: number,
  x: number,
  y: number,
  showCellInfo: boolean,
}

export const MapCell = observer(function MapCell({id, x, y, showCellInfo } : Props) {

  const rootState = useContext(RootContext);

  const mapState = rootState.mapStore;

  const types = rootState.paletteStore.data;
  const ct = getCT(types, id);

  const onCell = (e: React.MouseEvent) => {
    e.stopPropagation();
    mapState.setXY(x ,y);
  }

  const isHl = (mapState.isHl(x ,y)) ? 'hl' : '';

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
            {/*<span>{surroundingCells}</span>*/}
          </span>
        )
        : ('')
      }

    </div>
  )
})