import {MapRow} from "./MapRow";

export function MapComponent(props) {
  // const u = props.tileUrl ? `--tile-root: url(${props.tileUrl});` : '';
  const p = {
    '--tile-root': `url(${props.tileUrl})`,
    '--tile-dim': `${props.tileDim}px`,
  };

  const tm = props.mapData.map((row, y) =>
    <MapRow
      key={`mr_${y}`}
      data={row} y={y}
    />);
  return (

    <div className="map"
         style={p}
    >{tm}</div>
  )
}