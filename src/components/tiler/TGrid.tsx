import {TGridCell} from "./TGridCell";
import {PalCell} from "../../types";
import React, {useContext} from "react";
import {observer} from "mobx-react";
import { newOrderedArray as getArray } from '../../lib/dimensions';
import {RootContext} from "../../store/RootStore";

type RI = <T>(array: T[], index: number) => T[]
export const removeIndex: RI = (array, index) => {
  array.splice(index, 1)
  array = array.filter(function (element) {
    return element !== undefined
  });
  return array;
}

export const cellKey = (i: number, j: number) => `x${i}y${j}`;

type Props = {
  // tileSrc: TileSrc,
  selectTile: (x: number, y: number) => void,
  // palData: PalCell[],
  // activeTiles: string[],
  // paletteAddCell: PaletteAddCell,
  // paletteRemoveCell: PaletteRemoveCell,
}

export const  TGrid = observer(function TGrid ({ selectTile }: Props) {
  const rootState = useContext(RootContext);
  const tilerState = rootState.tilerStore;
  const tileSrc = tilerState.tileSrc;

  const pal = rootState.paletteStore;
  const palData = pal.data;
  const activeTiles = palData.map((item: PalCell) => item.cid).filter((i: string) => i);

  if (!tileSrc.loaded) return (<div>Grid Loading...</div>);

  const handleChange = (i: number, j: number) => {
    // console.log('set', i, j)
    if (isChecked(i, j)) {
      console.log('in array');
      pal.paletteRemoveCell(cellKey(i, j));
    } else {

      const ids = palData.map(item => item.id);
      let newId = Math.max(...ids);
      newId++;

      const newCell: PalCell = {
        cid: cellKey(i, j), x: i, y: j,
        id: newId,
        type: '',
        bg: ''
      }

      pal.paletteAddCell(newCell)
    }
  }

  const isChecked = (i: number, j: number) => activeTiles.includes(cellKey(i, j));

  const cells = (j: number) => getArray(tileSrc.wc)
      .map((i: number) => <TGridCell i={i} j={j} key={`grid_cell_${i}_${j}`}
                           isChecked={isChecked(i, j)} handleChange={handleChange} selectTile={selectTile}
        selected={cellKey(i, j) === tilerState.selectedCell}
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
})