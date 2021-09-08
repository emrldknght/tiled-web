import React from "react";
import {WCState, WItem} from "../WeaponsComponent";
import {getAllKeys} from "./getAllKeys";

type Props = {root: WCState, k: string, handleFilter: (e: string | null, k: string) => void, data: WItem[]}
export function FilterComponent({ root , k, handleFilter, data }: Props) {

  const act = root.filters[k];
  const handle = (e: string | null) => handleFilter(e, k);
  const allKeys= getAllKeys(data, k as  keyof WItem);

  const checkActive = (i: string | null) => (i === act) ? 'active' : '';

  const filterButtons = allKeys.map((item, i) => {
    const text = (item !== null) ? `${k} ${(item || 'undefined').toString().toUpperCase()}` : 'Reset';
    return(
      <button key={i} onClick={handle.bind(null, item)} className={checkActive(item)}>{text}</button>
    )
  })

  return(
    <fieldset>
      <legend>{k}</legend>
      {filterButtons}
    </fieldset>
  )
}

