import {useState} from "react";
import {TGridCell} from "./TGridCell";
import {connect} from "react-redux";

const removeIndex = (array, index) => {
  delete array[index];
  array = array.filter(function(element) {
    return element !== undefined
  });
  return array;
}

const cellKey = (i, j) => `k_${i}_${j}`;


function TGrid({tileSrc, selectTile}) {
  const [activeTiles, setActiveTiles] = useState([cellKey(2, 0)]);

  if(!tileSrc.loaded) return(<div>Grid Loading...</div>);

  /*
  useEffect(() => {
    console.log('init grid', tileSrc);
    // setActiveTiles(tt);
  }, [tileSrc])
  */

  const handleChange = (i, j) => {
    console.log('set', i, j)
    if(isChecked(i, j)) {
      // console.log('in array');
      const index = activeTiles.indexOf(cellKey(i, j));
      if(index !== -1) {
        const newState = removeIndex(activeTiles, index);
        setActiveTiles(newState);
      }
    } else {
      setActiveTiles(oldState => [...oldState, ...[cellKey(i, j)]])
    }
  }

  const isChecked = (i, j) => activeTiles.includes(cellKey(i, j));

  const cells = (j) => [...Array(tileSrc.wc).keys()]
    .map(i => <TGridCell i={i} j={j}  key={`grid_cell_${i}_${j}`}
      isChecked={isChecked}  handleChange={handleChange} selectTile={selectTile}
    />)


  const gridRows = [...Array(tileSrc.hc).keys()]
    .map((i) => <div className='row' key={`grid_row_${i}`}>
      {cells(i)}
    </div>);

  return(
    <div className='t-grid'>
      {gridRows}
    </div>
  )
}
function mapStateToProps(state) {
  return {
    tileSrc: state.tileSrc,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    /*
    selectTile: data => {
      dispatch(setTileSrcR(data))
    }
     */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TGrid);
