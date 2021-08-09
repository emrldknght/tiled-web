// TODO - refactoring needed

import React from "react";
import { FiltersComponent } from "./weapons/FiltersComponent";

export type WItem = {
  name: string,
  class: string,
  type: string,
  misc?: boolean
}

const data: WItem[] = [
  {name: 'Item 1', class: 'd', type: 'first'},
  {name: 'Item 2', class : 'b', type: 'first'},
  {name: 'Item 3', class: 'b', type: 'second'},
  {name: 'Item 4', class: 'c', type: 'second'},
  {name: 'Item 5', class : 'c', type: 'first', misc: true },
  {name: 'Item 6', class: 'a', type: 'first'}
];
export const myFilters = ['class', 'type', 'misc'];

/*
function getLongestEl(data: WItem[]) {
  const ol = data.map(el => Object.keys(el).length);
  console.log(ol);
  let indexOfMax = -1;
  let max = 0;
  for(let i = 0; i < ol.length; i++) {
    if(ol[i] > max) {
      max = ol[i];
      indexOfMax = i;
    }
  }
  // console.log(`Max is ${max} on pos: ${indexOfMax}`);
  return data[indexOfMax];
}
 */

export type FilterVal = null | string | boolean | number;
export type Filters = {[key: string]: FilterVal}
export type WCState = {[key: string]: FilterVal | Filters | undefined, filters: Filters}

const filterFunction = (val: FilterVal, key: string, el: WItem) => (val) ? ((el[key as keyof WItem]) === val) : true;

export type ItemFiltersState = { a: boolean; b: string; filters: Filters }

export function WeaponsComponent() {
  const initial: Filters = {}

  const myFilters = ['class', 'type', 'misc'];
  const _f: Filters = myFilters.reduce((acc, cv) => {
    acc[cv] = null;
    return acc;
  }, initial);
  console.log(_f);

  const initState: ItemFiltersState = {a: true, b: 'sample', filters: _f};
  const [ff, setFf] = React.useState(initState);

  const filters: ((el: WItem) => boolean)[] = []; //[fClass, fType];
  const addFilter = (key: string) => {
    const kv: FilterVal = ff.filters[key] as FilterVal;
    const newFilter = filterFunction.bind(null, kv, key);
    filters.push(newFilter);
  }
  myFilters.forEach(f => addFilter(f));

  const applyFilters = (data: WItem[]) => {
    filters.forEach(_filter => data = data.filter(_filter))
    return data;
  }

  const itemList = applyFilters(data)
    .map((item, i) => {
      return(
        <div key={i}>{item.name}:{item.class}:{item.type}</div>
      )
    });

  return (
    <div className="weapons-ed col">
      <div>{JSON.stringify(ff)}</div>
      <FiltersComponent ff={ff} setFf={setFf} data={data}/>
      <div className="col">
        {itemList}
      </div>
    </div>
  )
}