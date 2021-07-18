import {observer} from "mobx-react";
import React, {useContext, useEffect} from "react";
import {CharContext, charAppState, CharAppState, getProps} from "../store/CharContext";

import {ParamCell} from "./char/ParamCell";
import {CharStats} from "../types/CharStats";
import {InventorySlots} from "./char/InventorySlots";
import {CharSlots} from "../types/CharSlots";
import {WeaponDisplayComponent} from "./weapons/WeaponDisplayComponent";
import {Row} from "./Row";
import {Col} from "./Col";
import {Field} from "./Field";

export const CharComponent = observer(function CharComponent() {
  const state = useContext(CharContext);
  // const Str = state.Stats.Strength;
  const ss = charAppState.selectedSlot;
  const ssd = charAppState.selectedSlotData;

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

  const stats = getProps(state.Stats).map((item: string) => {
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

  const selectSlotItem = (id: number, slot: keyof CharSlots) => {
    console.log('ssi', id, slot);
    if(ss === slot) {
      charAppState.selectSlot(null);
    } else {
      charAppState.selectSlot(slot);
    }
  }

  return(
    <div className="charEd">
      <b>Character Editor</b>
      <div>{JSON.stringify(state)}</div>
      <Row>
        <Col>

            <Field className="stat" name="ID"
              value={state.ID}
            />
            <Field className="stat" name="Name"
              value={state.Name}
            />

          {stats}
          <button onClick={saveData}>Save</button>
        </Col>
        <Col>
          <InventorySlots charSlots={state.Slots} select={selectSlotItem} />
          <div>
            {(ssd && ssd.itemData) ? (
              <WeaponDisplayComponent data={ssd.itemData} />
              ) : ''
            }
          </div>
        </Col>
      </Row>
    </div>
  )
})