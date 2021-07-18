import React from "react";
import {getProps} from "../../store/CharContext";
import {CharSlots} from "../../types/CharSlots";
import {SlotComponent} from "./SlotComponent";

type Props = { charSlots: CharSlots, select: (id: number, slot: keyof CharSlots) => void }
export function InventorySlots({ charSlots, select }: Props) {

  const slots = getProps(charSlots).map((item:string) => {
    const val = charSlots[item as keyof CharSlots];
    return (
      <SlotComponent item={item} val={val} key={item} selectItem={select}/>
    )
  })

  return(
    <div className="slots col">
      {slots}
      <div className="char-slot filler">&nbsp;</div>
    </div>
  )
}