import {connect} from "react-redux";
import {PaletteSelectTile, paletteSelectTile} from "../store/actions";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import React, {CSSProperties} from "react";
import {PalCell} from "../store/palData";
import {AppState} from "../store/initState";

type Props = {
  tileUrl: string | null,
  tileDim: number | null,
  palette: { selectedTile: number, data: PalCell[] },
  paletteSelectTile: PaletteSelectTile
}

function CellPalette({
                       tileUrl, tileDim,
                       palette, paletteSelectTile
                     }: Props) {
  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const tapTile = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = (e.target as HTMLDivElement);
    const _id = t.dataset.id;
    if(!_id) return;
    const id = parseInt(_id);
    console.log('tap', id, typeof id);
    if (!isNaN(id)) {
      paletteSelectTile(id);
    }
  }
  /*
  const k = Object.keys(props.data).map(item => {
    const t = props.data[item].type;
    return(<div key={`pal-cell-${item}`} data-id={item} className={`cell cell-map ${t}`}>{item}</div>)
  })
   */
  const selected = (id: number) => (palette.selectedTile === id) ? 'selected' : '';
  const k = palette.data.map(item => {
    const t = item.type;
    return (<div key={`pal-cell-${item.cid}`} data-id={item.id}
                 className={`cell cell-map ${t} ${selected(item.id)}`}

        >{item.id}</div>
    )
  })

  return (
      <div className="cell-palette col" style={p}>
        <b>Palette</b>
        <div className="col">
          <div className="row" onClick={tapTile}>
            {k}
            <div className="cell cell-map grass">A</div>
            <div className="cell cell-map water">B</div>
          </div>
          <div className="row">{JSON.stringify(palette.data)}</div>
          <div className="row">From store : {palette.selectedTile}</div>
        </div>
      </div>
  )
}

function mapStateToProps(state: AppState) {
  return {
    tileUrl: state.tileUrl,
    tileDim: state.tileDim,
    palette: state.palette
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    paletteSelectTile,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CellPalette)