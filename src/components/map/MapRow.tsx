import {MapCell} from "./MapCell";
import {observer} from "mobx-react";
import {CSSProperties} from "react";

type Props = {
  data: number[],
  y: number,
  showCellInfo: boolean,
}

export const MapRow = observer(function MapRow(props: Props) {
  const _row = props.data.map((cell, x) => <MapCell
    key={`mc_${x}_${props.y}`}
    id={cell} x={x} y={props.y}
    showCellInfo={props.showCellInfo}
  />)

  const sty: CSSProperties = {
    zIndex : props.y,
    position: 'relative'
  }

  return (
    <div className="row" style={sty}>{_row}</div>
  )
})