export function TGridCell(props) {
  const i = props.i;
  const j = props.j;

  const p = {
    '--ox': -i,
    '--oy': -j,
  };
  return(
    <div className='cell grid-cell' data-x={i} key={`grid_cell_${i}_${j}`} style={p}>
      <div className="col">
        <span>{`(${i},${j})`}</span>
        <input type="checkbox"  checked={props.isChecked(i, j)}  onChange={props.handleChange.bind(null, i, j)}/>
      </div>
    </div>
  )
}