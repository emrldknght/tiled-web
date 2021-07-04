import {Row} from "../Row";
import {Weapon, WeaponCategory, WeaponProfiency, WeaponType} from "../../types/Weapon";
import {Field} from "../Field";
import {$enum} from "ts-enum-util";
import React from "react";
import {changeHandler} from "./ItemEditor";
import {Button} from "@blueprintjs/core";
import {DamageField} from "./DamageField";
import {CritField} from "./CritField";

/*
type ELProps = {
  name: string, value: string, handle: (e: React.ChangeEvent) => void,
  root: Record<any, string>
}
function EnumList({ name, value, handle, root }: ELProps) {
  const wt = $enum(root).map((cat, n) => {
    return(<option key={cat} value={cat}>{n}</option>)
  });

  return(
    <label>
      {name}:
      <select name="type" onChange={handle} value={value}>
        {wt}
      </select>
    </label>
  )
}
 */



type Props = { data: Weapon, change: changeHandler, save: () => void };
export function WeaponEditComponent({ data, change, save }: Props) {
  const item = data;

  const wt = $enum(WeaponType).map((cat, n) => {
    return(<option key={cat} value={cat}>{n}</option>)
  });

  const wc = $enum(WeaponCategory).map((cat, n) => {
    return(<option key={cat} value={cat}>{n}</option>)
  });

  const wp = $enum(WeaponProfiency).map((cat, n) => {
    return(<option key={cat} value={cat}>{n}</option>)
  });

  const handleList = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;

    console.log('->', t.name, t.value);
    change(t.name, t.value)
  }
  const handleVal = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    console.log('|', t.name, t.value);
    change(t.name, t.value);
  }

  // const [showDmgDices, setShowDmgDices] = useState(false)
  /*
  const toggleShowDmgDices = () => {
    setShowDmgDices(!showDmgDices);
  }
   */
  const updateDmgDice = (val: string) => {
    console.log('ud', val)
    change('damage', val)
  }

  return (
    <div className="weapon-edit col">
      <b>Weapon display:</b>
      <Field name="ID" value={item.id} />
      <Field name="Name" value={item.name} handler={handleVal}/>
      <Row>
        {/*
        <Field name="Damage" value={item.damage} />
        */}
        {/*
        <label className="damage-dice">
          Damage:
          <input type="text" name="damage"  value={item.damage}
                 onChange={handleVal} onClick={toggleShowDmgDices}/>
          {(showDmgDices) &&
            <DicesHolder val={item.damage} update={updateDmgDice}/>
          }
        </label>
        */}
        <DamageField value={item.damage} handle={handleVal} change={updateDmgDice}/>
        {/*
        <Field
          name="Crit"
          value={`${item.crit_min}-${item.crit_max}x${item.crit_mult}`}
        />
        */}
        <CritField item={item} handle={handleVal} />
        {/*
        <Field name="Type" value={item.type} />
        */}
        <label>
          Type:
          <select name="type" onChange={handleList} value={item.type}>
            {wt}
          </select>
        </label>
      </Row>
      <Row>
        {/*
        <Field name="Category" value={item.category} />
        */}
        <label>
          Category:
          <select name="category" onChange={handleList} value={item.category}>
            {wc}
          </select>
        </label>
        {/*
          <Field name="Proficiency" value={item.proficiency} />
        */}
        <label>
          Proficiency:
          <select name="proficiency" onChange={handleList} value={item.proficiency}>
            {wp}
          </select>
        </label>
      </Row>
      <Row>
        <Field
          name="Weight"
          value={item.weight}
          handler={handleVal}
        />
        <Field
          name="Cost"
          value={item.cost}
          handler={handleVal}
        />
      </Row>
      <Button onClick={save} text="Save" />
    </div>
  )
}