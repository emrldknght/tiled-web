import React, {useEffect, useState} from "react";
import {DiceC} from "./DiceC";

type PP = { val: string, update: (val: string) => void }
export function DicesHolder({val, update} : PP) {

  // console.log('vvv', val);
  /*
  const m = val.matchAll(/(\d{1,3})d(\d{1,3})/gm);
  console.log(m);
  for(const _t of m) {
    console.log(':', _t);
  }
   */

  const [d1, setD1] = useState(1);
  const [d2, setD2] = useState(2);

  const changeHandler = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    const name = t.name;
    const val = t.value;

    console.log(name, val);
    if (name === 'd1') {
      setD1(parseInt(val));
    }
    if (name === 'd2') {
      setD2(parseInt(val));
    }
  }

  useEffect(() => {
    const dPos = val.indexOf('d');
    const _d1 = parseInt(val.substr(0, dPos));
    const _d2 = parseInt(val.substr(dPos + 1, val.length));
    console.log('ue', _d1, _d2);

    setD1(_d1);
    setD2(_d2)
  }, [val])

  const hc = (e: React.MouseEvent) => {
    console.log(e);
    e.preventDefault();
    update(`${d1}d${d2}`);
  }

  return (
    <div className="dices-holder">
      {/*
      <Col>
        <span>calc: {d1}d{d2}</span>
        <span>val : {val}</span>
      </Col>
      */}
      <DiceC name="d1" d={8} v={d1} handler={changeHandler}/>
      &nbsp;D&nbsp;
      <DiceC name="d2" d={20} v={d2} handler={changeHandler}/>
      <button onClick={hc}>&#10004;</button>
    </div>
  )
}