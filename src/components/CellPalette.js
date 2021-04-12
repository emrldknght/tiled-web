import {connect} from "react-redux";
import {paletteSelectTile, spt} from "../store/actions";
import {bindActionCreators} from "redux";

function CellPalette({tileUrl, tileDim, setSelectedTile, selectedTile, data,
                      st, spt, palette, paletteSelectTile
                     }) {
  const p = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const tapTile = (e) => {
    const id = e.target.dataset.id;
    console.log('tap', id);
    if(id) {
      setSelectedTile(id)
      paletteSelectTile(id);
    }
  }
  /*
  const k = Object.keys(props.data).map(item => {
    const t = props.data[item].type;
    return(<div key={`pal-cell-${item}`} data-id={item} className={`cell cell-map ${t}`}>{item}</div>)
  })
   */
  const k = data.map(item => {
    const t = item.type;
    return(<div key={`pal-cell-${item.id}`} data-id={item.id}
                className={`cell cell-map ${t}`}>{item.id}</div>
    )
  })

  const handleClick = id => {
    console.log('handle!');
    paletteSelectTile(id);
  }

  return(
    <div className="cell-palette col" style={p}>
      <div className="row">
        From store {st} : {palette.selectedTile}
        <button onClick={handleClick.bind(null, 1)}>Set!</button>
      </div>
      <div className="row">Palette:</div>
      <div className="row">{JSON.stringify(data)}</div>
      <div className="row">
        <div className="row" onClick={tapTile}>
          {k}
          <div className="cell cell-map grass">A</div>
          <div className="cell cell-map water">B</div>
        </div>
        <div className="row">
          Controls:{selectedTile}
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tileUrl: state.tileUrl,
    tileDim: state.tileDim,
    st: state.st,
    palette: state.palette
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    paletteSelectTile,
    spt,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CellPalette)