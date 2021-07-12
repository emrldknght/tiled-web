import {Armor, ArmorTypeE} from "../../types/Armor";
import {Field} from "../Field";
import {Row} from "../Row";
import React from "react";
import {$enum} from "ts-enum-util";
import {changeHandler} from "../items/ItemEditor";
import {Button} from "@blueprintjs/core";

type Props = {item: Armor, change: changeHandler, save: () => void}
export function ArmorEditComponent({item, change, save }: Props) {
  const handleVal = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    console.log('|', t.name, t.value);
    change(t.name, t.value);
  }

  const handleList = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    console.log('->', t.name, t.value);
    change(t.name, t.value)
  }

  const at = $enum(ArmorTypeE).map((item, n) => {
    return(<option key={item} value={item}>{n}</option>)
  })

  return (
    <div className="armor-display col">
      <b>Armor display:</b>
      <Field name="ID" value={item.id} />
      <Field name="Name" value={item.name} handler={handleVal}/>
      <Row>
        {/*<Field name="Type" value={item.type} handler={handleVal}/>*/}
        <label>
          Type:
          <select name="type" onChange={handleList} value={item.type}>
            {at}
          </select>
        </label>
        <Field name="Armor Bonus" value={item.armorBonus} handler={handleVal}/>
      </Row>
      <Row>
        <Field name="Max Dex Bonus" value={item.maxDexBonus} handler={handleVal}/>
        <Field name="Armor Check Penalty" value={item.armorCheckPenalty} handler={handleVal}/>
        <Field name="Arcane Spell Failure Chance" value={item.arcaneSpellFailureChance} handler={handleVal}/>
        <Field name="speed" value={item.speed} handler={handleVal}/>
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