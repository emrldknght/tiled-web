import TImg from "./tiler/TImg";
import TGrid, {cellKey} from "./tiler/TGrid";
import {connect} from "react-redux";
import React, {CSSProperties} from "react";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {TilerSelectCell, tilerSelectCell} from "../store/actions";
import CellEditor from "./CellEditor";
import {AppState, TileSrc} from "../store/initState";
import {PalCell} from "../store/palData";

type Props = {
    tileUrl: string | null,
    tileDim: number | null,
    tileSrc: TileSrc,
    palette: PalCell[],
    tilerSelectCell: TilerSelectCell
}

function TilerComponent({
                            tileUrl, tileDim, tileSrc, palette,
                            tilerSelectCell
                        }: Props) {

    const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
        '--tile-root': `url(${tileUrl})`,
        '--tile-dim': `${tileDim}px`,
    };

    const selectTile = (x: number, y: number) => {
        const cid = cellKey(x, y);
        console.log(`select it: ${cid}`);
        tilerSelectCell(cid);
    }

    // const cellTemplate = { id: -2, }

    return (
        <div className="tiler" style={p}>
            <b>Tiler</b>
            <div>{JSON.stringify(palette)}</div>
            <input type="checkbox"/>
            <div className="row">
                <div className="content">
                    <div className="layer grid-base">
                        <TGrid selectTile={selectTile}/>
                    </div>
                    <div className="layer tile-base">
                        <TImg/>
                    </div>
                    <div className="info-tooltip">Info:{JSON.stringify(tileSrc)}</div>
                </div>
                <CellEditor/>
            </div>
        </div>
    )
}

function mapStateToProps(state: AppState) {
    return {
        tileSrc: state.tileSrc,
        tileUrl: state.tileUrl,
        tileDim: state.tileDim,
        palette: state.palette.data,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    tilerSelectCell
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(TilerComponent);