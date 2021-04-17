import {getCellType} from "../../lib/getCellType";

export function MapCell({data, x, y, showCellInfo}) {
  const cellType = getCellType(data);
  return (
    <div className={`cell cell-map ${cellType}`} data-x={x} data-y={y}>
      {(showCellInfo)
        ? (<span>{data} ({x}, {y})</span>)
        : ('')
      }
    </div>
  )
}