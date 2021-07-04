import {DicesHolder} from "./DicesHolder";
import React, {useState} from "react";

type Props = {
  value: string,
  handle: (e: React.ChangeEvent) => void,
  change: (val: string) => void
}
export function DamageField({ value, handle, change }: Props) {
  const [showDmgDices, setShowDmgDices] = useState(false);
  const toggleShowDmgDices = () => {
    setShowDmgDices(!showDmgDices);
  }

  const withUpdate = (v: string) => {
    console.log('with update');
    change(v);
    setShowDmgDices(false);
  }

  return(
    <label className="damage-dice">
      Damage:
      <input type="text" name="damage" value={value}
             onChange={handle} onClick={toggleShowDmgDices}/>
      {(showDmgDices) &&
      <DicesHolder val={value} update={withUpdate}/>
      }
    </label>
  )
}