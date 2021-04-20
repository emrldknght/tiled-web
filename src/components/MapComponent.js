import {MapRow} from "./map/MapRow";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setMapTile} from "../store/actions";
import React, {useState} from "react";

function MapComponent({ tileUrl, tileDim, mapData, setMapTile, brushId }) {
  // const u = props.tileUrl ? `--tile-root: url(${props.tileUrl});` : '';
  const p = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const [showGrid, setShowGrid] = useState(true);
  const [showCellInfo, setShowCellInfo] = useState(true);

  const tm = mapData.map((row, y) =>
    <MapRow
      key={`mr_${y}`}
      data={row} y={y}
      showCellInfo={showCellInfo}
    />);

  // const setTile = () => { setMapTile(2, 2, 0); }

  const pokeTile = (e) => {
    let t = e.target;
    if(!t.classList.contains('cell')) { t = t.parentElement; }

    const { sx, sy } = t.dataset;
    const x = parseInt(sx);
    const y = parseInt(sy);
    console.log('poke', e.target, x,y,brushId);
    if(!isNaN(x) && !isNaN(y)) {
      setMapTile(x, y, brushId);
    }
  }

  const showGridK = () => (showGrid) ? 'show-grid' : '';
  const toggleShowGrid = () => setShowGrid(!showGrid);

  const toggleShowCellInfo = () => setShowCellInfo(!showCellInfo);

  return (
    <div className={`map ${showGridK()}`}
         style={p}
    >
      <div className="col">
        <b>Map Editor</b>
        <div className="row">
          <label>
            <input type="checkbox" checked={showGrid}
            onChange={toggleShowGrid}/>Show Grid
          </label>
          <label>
            <input type="checkbox" checked={showCellInfo}
                   onChange={toggleShowCellInfo}/>Show Info
          </label>
          {/*
          BID: {brushId}
          <button onClick={setTile}>Set!</button>
          From store{JSON.stringify(mapData)}
           */}
          </div>
      </div>
      <div className={`mapWrapper`} onClick={pokeTile}>{tm}</div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mapData: state.mapData,
    tileUrl: state.tileUrl,
    tileDim: state.tileDim,
    brushId: state.palette.selectedTile
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setMapTile
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)