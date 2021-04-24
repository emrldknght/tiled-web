import {MapCell} from "./MapCell";
import {observer} from "mobx-react";

type Props = {
  data: number[],
  y: number,
  showCellInfo: boolean,
}

export const MapRow = observer((props: Props) => {
  const _row = props.data.map((cell, x) => <MapCell
    key={`mc_${x}_${props.y}`}
    id={cell} x={x} y={props.y}
    showCellInfo={props.showCellInfo}
  />)
  return (
    <div className="row">{_row}</div>
  )
})