import React, {CSSProperties} from "react";

type Props = {
  i: number,
  j: number,
  isChecked: boolean,
  selectTile: (x: number, y: number) => void,
  handleChange: (i: number, j: number) => void
}

export function TGridCell(props: Props) {
  const i = props.i;
  const j = props.j;

  const p: CSSProperties & { '--ox': number, '--oy': number }  = {
    '--ox': -i,
    '--oy': -j,
  };

  return(
    <div className='cell grid-cell' data-x={i} key={`grid_cell_${i}_${j}`} style={p}
      onClick={props.selectTile.bind(null, i, j)}
    >
      <div className="col">
        <span>{`(${i},${j})`}</span>
        <input type="checkbox"
               checked={props.isChecked}
               onChange={props.handleChange.bind(null, i, j)}/>
      </div>
    </div>
  )
}