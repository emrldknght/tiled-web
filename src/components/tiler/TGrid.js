import {TGridCell} from "./TGridCell";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {paletteAddCell, paletteRemoveCell} from "../../store/actions";

export const removeIndex = (array, index) => {
  delete array[index];
  array = array.filter(function(element) {
    return element !== undefined
  });
  return array;
}

export const cellKey = (i, j) => `x${i}y${j}`;

function TGrid({tileSrc, selectTile, palData, activeTiles,
    paletteAddCell, paletteRemoveCell,
  }) {
  // const [activeTiles, setActiveTiles] = useState([cellKey(2, 0)]);

  // const activeTiles = palData.map(item => item.cid); // .filter((i) => i);
  // const setActiveTiles = () => {};

  if(!tileSrc.loaded) return(<div>Grid Loading...</div>);

  /*
  useEffect(() => {
    console.log('init grid', tileSrc);
    // setActiveTiles(tt);
  }, [tileSrc])
  */

  const handleChange = (i, j) => {
    // console.log('set', i, j)
    if(isChecked(i, j)) {
      //console.log('in array');
      paletteRemoveCell(cellKey(i , j));
    } else {
      // console.log('addWith', JSON.stringify(palData));
      const ids = palData.map(item => item.id);
      let newId = Math.max(...ids);
      newId++;
      // console.log('newId', newId);

      paletteAddCell({
        cid: cellKey(i, j), x: i, y: j,
        id: newId,
        type: '',
        bg: ''
      })
    }
  }

  const isChecked = (i, j) => activeTiles.includes(cellKey(i, j));

  const cells = (j) => [...Array(tileSrc.wc).keys()]
    .map(i => <TGridCell i={i} j={j}  key={`grid_cell_${i}_${j}`}
      isChecked={isChecked(i, j)}  handleChange={handleChange} selectTile={selectTile}
    />)


  const gridRows = [...Array(tileSrc.hc).keys()]
    .map((i) => <div className='row' key={`grid_row_${i}`}>
      {cells(i)}
    </div>);

  return(
    <div className='t-grid'>
      {/*
      <div className="status col" style={{ backgroundColor: 'white'}} >
        <span>
          {JSON.stringify(palData)}
        </span>
        <span>
          {JSON.stringify(activeTiles)}
        </span>
      </div>
      */}
      <div className="wrapper">
        {gridRows}
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    tileSrc: state.tileSrc,
    palData: state.palette.data,
    activeTiles: state.palette.data.map(item => item.cid).filter((i) => i),
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    paletteAddCell,
    paletteRemoveCell,
    /*
    selectTile: data => {
      dispatch(setTileSrcR(data))
    }
     */
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(TGrid);
