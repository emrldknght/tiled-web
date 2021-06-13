import {observer} from "mobx-react";
import React, {useContext, useEffect} from "react";
import {CharContext, charAppState, CharAppState, getProps} from "../store/CharContext";

import {ParamCell} from "./char/ParamCell";
import {CharStats} from "../types/CharStats";
import {CharSlots} from "../types/CharSlots";
import {SlotComponent} from "./char/SlotComponent";

export const CharComponent = observer(() => {
  const state = useContext(CharContext);
  // const Str = state.Stats.Strength;

  useEffect(() => {
    charAppState.fetchCharFile(1)
  }, [])

  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target;
    const paramName = t.name as keyof CharStats;
    const newVal = parseInt(t.value);
    console.log('handle', paramName, newVal);
    // charAppState.setStrength(newVal);
    charAppState.setParam(paramName, newVal)
  }
  const incParam = (name: string) => {
    const p = name as keyof CharStats;
    const v: number = charAppState.getParam(p);
    charAppState.setParam(p, v + 1)
  }
  const redParam = (name: string) => {
    const p = name as keyof CharStats;
    const v: number = charAppState.getParam(p);
    charAppState.setParam(p, v - 1)
  }

  const stats = getProps(charAppState.Stats).map((item: string) => {
    const val = state.Stats[item as keyof CharStats];
    // if(typeof val === 'number') {
    const bonus = CharAppState.getParamBonus(val);
    return(
      <ParamCell item={item} val={val} bonus={bonus}
                 incParam={incParam} redParam={redParam} handleKey={handleKey}
                 key={item}
      />
    )
    // }
  })

  const saveData = async () => {
    const a = await charAppState.saveData();
    console.log('saved', a);
    /*
    console.log('save');
    postData(`${Path}/char/1`, {
      id: 1
    })
      .then((res: any) => {
        console.log('PR:', res);
      })
     */
  }

  const selectSlotItem = (id: number) => {
    console.log('ssi', id);
  }

  const slots = getProps(charAppState.Slots).map((item:string) => {
    const val = state.Slots[item as keyof CharSlots];
    return (
        <SlotComponent item={item} val={val} key={item} selectItem={selectSlotItem}/>
      )
  })

  return(
    <div className="charEd">
      <b>Character Editor</b>
      <div>{JSON.stringify(state)}</div>
      <div className="row">
        <div className="col">
          <label className="stat"> ID:
            <input value={state.ID} readOnly/>
          </label>
          <label className="stat"> Name:
            <input value={state.Name} readOnly/>
          </label>
          {stats}
          <button onClick={saveData}>Save</button>
        </div>
        <div className="slots col">
          {slots}
          <div className="char-slot filler">&nbsp;</div>
        </div>
      </div>
    </div>
  )
})