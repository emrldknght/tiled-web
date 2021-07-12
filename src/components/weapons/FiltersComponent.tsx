import React from "react";
import {FilterComponent} from "./FilterComponent";
import {myFilters, WItem} from "../WeaponsComponent";

type Props = { ff: any, setff: any, data: WItem[] }

export function FiltersComponent({ff, setff, data}: Props) {


  const handleFilter = (e: string | null, key: string) => {
    console.log('handle', e, key);
    setff({...ff, ...{ filters: {...ff.filters, ...{[key]: e}} }})
  }

  const filterList = myFilters.map(_f => <FilterComponent key={_f} root={ff} k={_f} handleFilter={handleFilter} data={data}/>)
  return(
    <div className="row">Filters:
      {filterList}
    </div>
  )
}