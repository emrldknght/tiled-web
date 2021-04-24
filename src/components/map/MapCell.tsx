import {getCT} from "../../lib/getCellType";
import {observer} from "mobx-react";
import {useContext} from "react";
import {StoreContext} from "../../store/StoreContext";


type Props = {
  id: number,
  x: number,
  y: number,
  showCellInfo: boolean,
}

export const MapCell = observer(({id, x, y, showCellInfo} : Props) => {
  const state = useContext(StoreContext);
  const types = state.palette.data;
  const ct = getCT(types, id);

  return (
    <div className={`cell cell-map ${ct}`}
         data-x={x} data-y={y}
         data-id={id}
    >
      {(showCellInfo)
        ? (
          <span>
            <span>{id} ({x}, {y})</span>
            <span>{JSON.stringify(ct)}</span>
          </span>
        )
        : ('')
      }

    </div>
  )
})