import React from "react";
import {$enum} from "ts-enum-util";

type ESFProps =  {
  name: string,
  value: string | number | undefined ,
  en: { [key: string]: string },
  handleChange: (e: React.ChangeEvent) => void,
  noDefault?: boolean,
}
export function EnumSelectField({name, value, en, handleChange, noDefault } : ESFProps) {
  const _default = typeof noDefault === 'undefined';

  const v = (value) ? value : 'none';
  const o = $enum(en).map((item, n) => {
    return(
      <option key={item} value={item} >{n}</option>
    )
  })
  return (
    <select name={name} onChange={handleChange} value={v}>
      {(_default) && <option key="_none" value="none">none</option> }
      {o}
    </select>
  )
}