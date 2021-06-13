import {CharSlot} from "../../types/CharSlot";
import React from "react";
import {decamelize} from "../../lib/decamelize";

type Props = {
  item: string, val: CharSlot | undefined,
  selectItem: (id: number) => void
}

export function SlotComponent ({item, val, selectItem} : Props) {
  const classN = `char-slot col ${item}`;
  return (
    val ? (
      <div className={classN} title={val.itemData?.name} onClick={selectItem.bind(null, val.itemId)}>
        <span>ID: {val.itemId}</span>
        <span>Name: {val.itemData?.name}</span>
      </div>
    ) : (
      <div className={classN} key={item}>
        {decamelize(item, ' ')}
      </div>
    )
  )
}