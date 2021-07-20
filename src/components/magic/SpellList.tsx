import {observer} from "mobx-react";
import {spellDB, SpellP} from "../../types/Spell";
import React from "react";
import {SEState} from "./SpellEditor";

type SpellListProps = { state: SEState };
export const SpellList = observer(function SpellList({ state } : SpellListProps) {
  const spelList: SpellP[] = Object.values(spellDB).map((i) => ({ id: i.id,  nameOf: i.nameOf }))

  type handleSelectT = (item: SpellP) => (e: React.MouseEvent) => void;
  const handleSelect: handleSelectT = (item) => (e) => {
    console.log('cc', e,  item.id);
    state.selectItem(item.id)
  }

  return (
    <div className="spell-selector col">
      <span>List</span>
      {(spelList).map((item, i) =>
        <div onClick={handleSelect(item)} key={i}
             className={(item.id === state.spellId) ? 'selected' : ''}
        >
          {item.nameOf}
        </div>
      )}
    </div>
  )
})