import React from "react";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {TilerUpdateCell, tilerUpdateCell} from "../store/actions";
import {AppState} from "../store/initState";
import {PalCell} from "../store/palData";

type Props = {
    palette: PalCell[],
    tilerSelectedCell: string | null,
    tilerUpdateCell: TilerUpdateCell
}

function CellEditor({palette, tilerSelectedCell, tilerUpdateCell}: Props) {

    const selectedCellData = (palette: PalCell[], selected: string | null) => {
        const f = palette.filter(cell => cell.cid === selected);
        const d = f[0] ?? null;
        // if(!tilerSelectedCell) return {}
        return d;
    }
    const cd = () => selectedCellData(palette, tilerSelectedCell);

    const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        const t = e.target;
        console.log('handle', t);

        // const nd = {...cd()};

        const nv = parseInt(t.value) || t.value;

        if(!tilerSelectedCell) return;
        tilerUpdateCell(tilerSelectedCell, {k: t.name, v: nv});
    }

    return (
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
                    <input type="text" value={cd().x} disabled={true}/>
                    <label>y:</label>
                    <input type="text" value={cd().y} disabled={true}/>
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

function mapStateToProps(state: AppState) {
    return {
        palette: state.palette.data,
        tilerSelectedCell: state.tiler.selectedCell
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    tilerUpdateCell
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CellEditor)