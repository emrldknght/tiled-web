import React, {CSSProperties} from "react";

type Props = {
  i: number,
  j: number,
  isChecked: boolean,
  selectTile: (x: number, y: number) => void,
  handleChange: (i: number, j: number) => void,
  selected: boolean
}

export function TGridCell({i, j, isChecked, selectTile, handleChange, selected}: Props) {

  const p: CSSProperties & { '--ox': number, '--oy': number }  = {
    '--ox': -i,
    '--oy': -j,
  };

  const selectedK =  (selected) ? 'selected' : '';

  return(
    <div className={`cell grid-cell ${selectedK}`} data-x={i} key={`grid_cell_${i}_${j}`} style={p}
      onClick={selectTile.bind(null, i, j)}
    >
      <div className="col">
        <span>{`(${i},${j})`}</span>
        <input type="checkbox"
               checked={isChecked}
               onChange={handleChange.bind(null, i, j)}/>
      </div>
    </div>
  )
}