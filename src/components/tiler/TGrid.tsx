import {TGridCell} from "./TGridCell";
import {connect} from "react-redux";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {PaletteAddCell, paletteAddCell, PaletteRemoveCell, paletteRemoveCell} from "../../store/actions";
import {AppState, TileSrc} from "../../store/initState";
import {PalCell} from "../../store/palData";
import React from "react";

export const removeIndex = (array: any[], index: number) => {
  delete array[index];
  array = array.filter(function (element) {
    return element !== undefined
  });
  return array;
}

export const cellKey = (i: number, j: number) => `x${i}y${j}`;

type Props = {
  tileSrc: TileSrc,
  selectTile: (x: number, y: number) => void,
  palData: PalCell[],
  activeTiles: string[],
  paletteAddCell: PaletteAddCell,
  paletteRemoveCell: PaletteRemoveCell,
}

function TGrid({
                 tileSrc, selectTile, palData, activeTiles,
                 paletteAddCell, paletteRemoveCell,
               }: Props) {
  // const [activeTiles, setActiveTiles] = useState([cellKey(2, 0)]);

  // const activeTiles = palData.map(item => item.cid); // .filter((i) => i);
  // const setActiveTiles = () => {};

  if (!tileSrc.loaded) return (<div>Grid Loading...</div>);

  /*
  useEffect(() => {
    console.log('init grid', tileSrc);
    // setActiveTiles(tt);
  }, [tileSrc])
  */

  const handleChange = (i: number, j: number) => {
    // console.log('set', i, j)
    if (isChecked(i, j)) {
      //console.log('in array');
      paletteRemoveCell(cellKey(i, j));
    } else {
      // console.log('addWith', JSON.stringify(palData));
      const ids = palData.map(item => item.id);
      let newId = Math.max(...ids);
      newId++;
      // console.log('newId', newId);

      const newCell: PalCell = {
        cid: cellKey(i, j), x: i, y: j,
        id: newId,
        type: '',
        bg: ''
      }

      paletteAddCell(newCell)
    }
  }

  const isChecked = (i: number, j: number) => activeTiles.includes(cellKey(i, j));

  const getArray = (l: number) => {
    // @ts-ignore
    return [...Array(l).keys()];
  }

  const cells = (j: number) => getArray(tileSrc.wc)
      .map((i: number) => <TGridCell i={i} j={j} key={`grid_cell_${i}_${j}`}
                           isChecked={isChecked(i, j)} handleChange={handleChange} selectTile={selectTile}
      />)


  const gridRows = getArray(tileSrc.hc)
      .map((i) => <div className='row' key={`grid_row_${i}`}>
        {cells(i)}
      </div>);

  return (
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

function mapStateToProps(state: AppState) {
  return {
    tileSrc: state.tileSrc,
    palData: state.palette.data,
    activeTiles: state.palette.data.map((item: PalCell) => item.cid).filter((i: string) => i),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
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
