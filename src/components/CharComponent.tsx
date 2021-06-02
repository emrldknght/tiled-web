import {observer} from "mobx-react";
import React, {useContext} from "react";
import {CharContext, charAppState, CharAppState, getProps} from "../store/CharContext";
import {Character} from "../types";
import {ParamCell} from "./char/ParamCell";

export const CharComponent = observer(() => {
  const state = useContext(CharContext);
  const Str = state.Strength;

  const handleKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = e.target;
    const paramName = t.name as keyof CharAppState;
    const newVal = parseInt(t.value);
    console.log('handle', paramName, newVal);
    // charAppState.setStrength(newVal);
    charAppState.setParam(paramName, newVal)
  }
  const incParam = (name: string) => {
    const p = name as keyof CharAppState;
    const v: number = charAppState.getParam(p);
    charAppState.setParam(p, v + 1)
  }
  const redParam = (name: string) => {
    const p = name as keyof CharAppState;
    const v: number = charAppState.getParam(p);
    charAppState.setParam(p, v - 1)
  }

  const stats = getProps(charAppState).map((item: string) => {
    const val = state[item as keyof Character];
    const bonus = CharAppState.getParamBonus(val);
    return(
      <ParamCell item={item} val={val} bonus={bonus}
                 incParam={incParam} redParam={redParam} handleKey={handleKey}
                 key={item}
      />
    )
  })

  return(
    <div className="charEd">
      <b>Character Editor</b>
      <div>{JSON.stringify(state)}</div>
      <div className="col">
        {stats}
      </div>
    </div>
  )
})