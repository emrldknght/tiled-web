import {MapRow} from "./map/MapRow";
import {connect} from "react-redux";

function MapComponent({ tileUrl, tileDim, mapData }) {
  // const u = props.tileUrl ? `--tile-root: url(${props.tileUrl});` : '';
  const p = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const tm = mapData.map((row, y) =>
    <MapRow
      key={`mr_${y}`}
      data={row} y={y}
    />);
  return (

    <div className="map"
         style={p}
    >
      <div>From store{JSON.stringify(mapData)}</div>
      <div className="mapWrapper">{tm}</div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mapData: state.map,
    tileUrl: state.tileUrl,
    tileDim: state.tileDim
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)