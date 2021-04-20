import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {tilerUpdateCell} from "../store/actions";

function CellEditor({palette, tilerSelectedCell, tilerUpdateCell}) {

  const selectedCellData = (palette, selected) => {
    const f = palette.filter(cell => cell.cid === selected);
    const d = f[0] ?? null;
    // if(!tilerSelectedCell) return {}
    return d;
  }
  const cd = () => selectedCellData(palette, tilerSelectedCell);

  const handleKey = (e) => {
    const t = e.target;
    console.log('handle', t);

    // const nd = {...cd()};

    const nv = parseInt(t.value) || t.value;

    tilerUpdateCell(tilerSelectedCell, { k: t.name, v: nv });
  }

  return(
    <div className="pal-cell-editor col">
      <b>Cell editor:</b>
      <span>selected: {tilerSelectedCell}</span>
      <span>
            {JSON.stringify(cd())}
          </span>
      {(cd()) ? (
        <div className="col inputs">
          <label htmlFor="cid">cid:</label>
          <input type="text" value={cd().cid} disabled={true} name="cid"/>
          <label>id:</label>
          <input type="text" value={cd().id} onChange={handleKey} name="id"/>
          <label>x:</label>
          <input type="text" value={cd().x} disabled={true} />
          <label>y:</label>
          <input type="text" value={cd().y} disabled={true} />
          <label>type:</label>
          <input type="text" value={cd().type} onChange={handleKey} name="type"/>
          <label>bg:</label>
          <input type="text" value={cd().bg} onChange={handleKey} name="bg"/>
        </div>
      ) : ('')
      }
      {/* <button>Update Cell Data</button> */}
    </div>
  )
}
function mapStateToProps(state) {
  return {
    palette: state.palette.data,
    tilerSelectedCell: state.tiler.selectedCell
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    tilerUpdateCell
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CellEditor)