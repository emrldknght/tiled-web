import TImg from "./tiler/TImg";
import TGrid, {cellKey} from "./tiler/TGrid";
import {connect} from "react-redux";
import React from "react";
import {bindActionCreators} from "redux";
import {tilerSelectCell} from "../store/actions";
import CellEditor from "./CellEditor";

function TilerComponent({tileUrl, tileDim, tileSrc, palette,
    tilerSelectCell
  }) {

  const p = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const selectTile = (x, y) => {
    const cid = cellKey(x, y);
    console.log(`select it: ${cid}`);
    tilerSelectCell(cid);
  }

  // const cellTemplate = { id: -2, }

  return(
    <div className="tiler" style={p}>
      <b>Tiler</b>
      <div>{JSON.stringify(palette)}</div>
      <input type="checkbox" />
      <div className="row">
        <div className="content">
        <div className="layer grid-base">
          <TGrid selectTile={selectTile} />
        </div>
        <div className="layer tile-base">
          <TImg />
        </div>
        <div className="info-tooltip">Info:{JSON.stringify(tileSrc)}</div>
      </div>
      <CellEditor />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tileSrc: state.tileSrc,
    tileUrl: state.tileUrl,
    tileDim: state.tileDim,
    palette: state.palette.data,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    tilerSelectCell
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(TilerComponent);