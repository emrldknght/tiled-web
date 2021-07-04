import React from "react";
import {newOrderedArray} from "../../lib/dimensions";

type DiceCProps = { name: string, d: number , v: number, handler: (e: React.ChangeEvent) => void}
export function DiceC({ name, d = 1 , v = 1, handler} : DiceCProps) {

  const o = newOrderedArray(d).map(n =>
    <option value={n} key={n}>
      {n}
    </option>);

  return (
    <select name={name} className="dice-component" value={v} onChange={handler}>
      {o}
    </select>
  )
}