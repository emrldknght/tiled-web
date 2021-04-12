import {getCellType} from "../../lib/getCellType";

export function MapCell(props) {
  const cellType = getCellType(props.data);
  return (
    <div className={`cell cell-map ${cellType}`}>
      {props.data}({props.x},{props.y})
    </div>
  )
}