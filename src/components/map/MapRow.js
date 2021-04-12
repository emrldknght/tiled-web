import {MapCell} from "./MapCell";

export function MapRow(props) {
  const _row = props.data.map((cell, x) => <MapCell
    key={`mc_${x}_${props.y}`}
    data={cell} x={x} y={props.y}
  />)
  return (
    <div className="row">{_row}</div>
  )
}