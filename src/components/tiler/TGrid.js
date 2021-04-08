import {useEffect, useState} from "react";
import {TGridCell} from "./TGridCell";

const removeIndex = (array, index) => {
  delete array[index];
  array = array.filter(function(element) {
    return element !== undefined
  });
  return array;
}

const cellKey = (i, j) => `k_${i}_${j}`;


export function TGrid(props) {
  const [activeTiles, setActiveTiles] = useState([cellKey(2, 0)]);


  useEffect(() => {
    console.log('init grid', props.tileSrc);

    /*
    const tt = [...Array(props.tileSrc.hc).keys()]
      .map(row => [...Array(props.tileSrc.wc).keys()])
      .map(item => false)
    ;
     */
    // setActiveTiles(tt);
  }, [props.tileSrc])

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

  const cells = (j) => [...Array(props.tileSrc.wc).keys()]
    .map(i => <TGridCell i={i} j={j}  key={`grid_cell_${i}_${j}`}
      isChecked={isChecked}  handleChange={handleChange} selectTile={props.selectTile}
    />)


  const gridRows = [...Array(props.tileSrc.hc).keys()]
    .map((i) => <div className='row' key={`grid_row_${i}`}>
      {cells(i)}
    </div>);

  return(
    <div className='t-grid'>
      {gridRows}
    </div>
  )
}