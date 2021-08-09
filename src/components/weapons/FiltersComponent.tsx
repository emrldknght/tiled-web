import React from "react";
import {FilterComponent} from "./FilterComponent";
import {Filters, myFilters, WItem} from "../WeaponsComponent";

type Props<T> = { ff: T, setFf: React.Dispatch<React.SetStateAction<T>>, data: WItem[] }

export const FiltersComponent = <T extends object & { filters: Filters }>({ ff, setFf, data }: Props<T>) => {


  const handleFilter = (e: string | null, key: string) => {
    console.log('handle', e, key);
    setFf({...ff, ...{ filters: {...ff.filters, ...{[key]: e}} }})
  }

  const filterList = myFilters.map(_f => <FilterComponent key={_f} root={ff} k={_f} handleFilter={handleFilter} data={data}/>)
  return(
    <div className="row">Filters:
      {filterList}
    </div>
  )
}