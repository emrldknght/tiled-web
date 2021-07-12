import {CharSlot} from "../../types/CharSlot";
import React from "react";
import {decamelize} from "../../lib/decamelize";
import {CharSlots} from "../../types/CharSlots";

type Props = {
  item: string, val: CharSlot | undefined,
  selectItem: (id: number, slot: keyof CharSlots) => void
}

export function SlotComponent ({item, val, selectItem} : Props) {
  const classN = `char-slot col ${item}`;
  const slot = item as keyof CharSlots ;
  return (
    val ? (
      <div className={classN} title={val.itemData?.name} onClick={selectItem.bind(null, val.itemId, slot)}>
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