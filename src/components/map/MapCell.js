import {connect} from "react-redux";
import {getCT} from "../../lib/getCellType";

function MapCell({id, x, y, showCellInfo, types}) {
  const ct = getCT(types, id);

  return (
    <div className={`cell cell-map ${ct}`}
         data-x={x} data-y={y}
         data-id={id}
    >
      {(showCellInfo)
        ? (
          <span>
            <span>{id} ({x}, {y})</span>
            <span>{JSON.stringify(ct)}</span>
          </span>
        )
        : ('')
      }

    </div>
  )
}

function mapStateToProps(state) {
  return {
    types: state.palette.data
  }
}

export default connect(mapStateToProps)(MapCell)