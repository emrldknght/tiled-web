import {MapRow} from "./MapRow";

export function MapComponent(props) {
  const tm = props.data.map((row, y) =>
    <MapRow
      key={`mr_${y}`}
      data={row} y={y}
    />);
  return (
    <div className="map">{tm}</div>
  )
}