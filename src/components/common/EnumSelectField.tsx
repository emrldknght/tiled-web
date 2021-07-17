import React from "react";
import {$enum} from "ts-enum-util";

type ESFProps =  {
  name: string,
  en: { [key: string]: string },
  handleChange: (e: React.ChangeEvent) => void
}
export function EnumSelectField({name,  en, handleChange } : ESFProps) {
  const o = $enum(en).map((item, n) => {
    return(
      <option key={item} value={item}>{n}</option>
    )
  })
  return (
    <select name={name} onChange={handleChange}>
      {o}
    </select>
  )
}