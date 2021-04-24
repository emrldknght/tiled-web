import MapCell from "./MapCell";

type Props = {
  data: number[],
  y: number,
  showCellInfo: boolean,
}

export function MapRow(props: Props) {
  const _row = props.data.map((cell, x) => <MapCell
    key={`mc_${x}_${props.y}`}
    id={cell} x={x} y={props.y}
    showCellInfo={props.showCellInfo}
  />)
  return (
    <div className="row">{_row}</div>
  )
}