import {Row} from "../Row";
import {Weapon, WeaponCategory, WeaponProfiency, WeaponType} from "../../types/Weapon";
import { FieldL} from "../Field";
import {$enum} from "ts-enum-util";
import React, {useContext} from "react";
import { IEContext } from "../items/ItemEditor";
import {DamageField} from "./DamageField";
import {CritField} from "./CritField";
import {observer} from "mobx-react";

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



type Props = { data: Weapon };
export const WeaponEditComponent = observer(function WeaponEditComponent({ data }: Props) {
  const item = data;
  const state = useContext(IEContext);

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
    state.setKey((t.name as keyof Weapon), t.value);
  }
  const handleVal = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    console.log('|', t.name, t.value);
    state.setKey((t.name as keyof Weapon), t.value);
  }

  // const [showDmgDices, setShowDmgDices] = useState(false)
  /*
  const toggleShowDmgDices = () => {
    setShowDmgDices(!showDmgDices);
  }
   */
  const updateDmgDice = (val: string) => {
    console.log('ud', val)
    state.setKey('damage', val);
  }

  return (
    <div className="weapon-edit col">
      <b>Weapon display:</b>
      <FieldL label="ID" name="id" value={item.id} />
      <FieldL label="Name" name="name" value={item.name} handler={handleVal}/>
      <Row>
        <DamageField value={item.damage} handle={handleVal} change={updateDmgDice}/>

        <CritField item={item} handle={handleVal} />
        <label>
          Type:
          <select name="type" onChange={handleList} value={item.type}>
            {wt}
          </select>
        </label>
      </Row>
      <Row>
        <label>
          Category:
          <select name="category" onChange={handleList} value={item.category}>
            {wc}
          </select>
        </label>
        <label>
          Proficiency:
          <select name="proficiency" onChange={handleList} value={item.proficiency}>
            {wp}
          </select>
        </label>
      </Row>
      <Row>
        <FieldL
          label="Weight"
          name="weight"
          value={item.weight}
          handler={handleVal}
        />
        <FieldL
          label="Cost"
          name="cost"
          value={item.cost}
          handler={handleVal}
        />
      </Row>
    </div>
  )
})