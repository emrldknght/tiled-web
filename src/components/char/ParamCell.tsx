import React from "react";

type ParamCellProps = {item: string, val: number, bonus: number,
  incParam: (name: string) => void, redParam: (name: string) => void,
  handleKey: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export function ParamCell({item, val, bonus, incParam, redParam, handleKey}: ParamCellProps) {
  return (
    <label className="stat">
      <span className="stat-name">{item}:</span>
      <input type="number" value={val} onChange={handleKey} name={item}/>
      <div className="col">
        <button onClick={incParam.bind(null, item)}>+</button>
        <button onClick={redParam.bind(null, item)}>-</button>
      </div>
      <span className="stat-bonus">{(bonus > 0) ? '+' : ''}{bonus}</span>
    </label>
  )
}