import {Armor, ArmorTypeE} from "../../types/Armor";
import {Field, FieldL} from "../Field";
import {Row} from "../Row";
import React, {useContext} from "react";
import {$enum} from "ts-enum-util";
import { IEContext } from "../items/ItemEditor";
import {observer} from "mobx-react";

type Props = { item: Armor }
export const ArmorEditComponent = observer(function ArmorEditComponent({ item }: Props) {
  const state = useContext(IEContext);

  const handleVal = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    const type = t.dataset.t;

    console.log('|', t.name, t.value, type);
    state.setKey((t.name as keyof Armor), t.value);
  }

  const handleList = (e: React.ChangeEvent) => {
    const t = e.target as HTMLSelectElement;
    console.log('->', t.name, t.value);
    state.setKey((t.name as keyof Armor), t.value);
  }

  const at = $enum(ArmorTypeE).map((item, n) => {
    return(<option key={item} value={item}>{n}</option>)
  })

  return (
    <div className="armor-display col">
      <b>Armor display:</b>
      <FieldL label="ID" name="id" value={item.id} />
      <FieldL label="name" name="name" value={item.name}
              handler={handleVal} type="string"/>
      <Row>
        {/*<Field name="Type" value={item.type} handler={handleVal}/>*/}
        <label>
          Type:
          <select name="type" onChange={handleList} value={item.type}>
            {at}
          </select>
        </label>
        <FieldL label="Armor Bonus" name="armorBonus" value={item.armorBonus}
               handler={handleVal} type="number" />
      </Row>
      <Row>
        <FieldL label="Max Dex Bonus" name="maxDexBonus" value={item.maxDexBonus}
               handler={handleVal} type="number" />
        <FieldL label="Armor Check Penalty" name="armorCheckPenalty" value={item.armorCheckPenalty}
               handler={handleVal} type="number" />
        <FieldL label="Arcane Spell Failure Chance" name="arcaneSpellFailureChance" value={item.arcaneSpellFailureChance}
               handler={handleVal} type="number"/>
        <FieldL label="speed" name="speed" value={item.speed}
               handler={handleVal} type="string"/>
      </Row>
      <Row>
        <Field
          name="Weight"
          value={item.weight}
          handler={handleVal}
          type="number"
        />
        <Field
          name="Cost"
          value={item.cost}
          handler={handleVal}
          type="number"
        />
      </Row>
    </div>
  )
})