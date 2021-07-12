import {Armor} from "../../types/Armor";
import {Field} from "../Field";
import {Row} from "../Row";

type Props = {item: Armor}
export function ArmorDisplayComponent({item}: Props) {
  return (
    <div className="armor-display col">
      <b>Armor display:</b>
      <Field name="ID" value={item.id} />
      <Field name="Name" value={item.name} />
      <Row>
        <Field name="Type" value={item.type} />
        <Field name="Armor Bonus" value={item.armorBonus} />
      </Row>
      <Row>
        <Field name="Max Dex Bonus" value={item.maxDexBonus} />
        <Field name="Armor Check Penalty" value={item.armorCheckPenalty} />
        <Field name="Arcane Spell Failure Chance" value={item.arcaneSpellFailureChance} />
        <Field name="speed" value={item.speed} />
      </Row>
      <Row>
        <Field
          name="Weight"
          value={item.weight}
        />
        <Field
          name="Cost"
          value={item.cost}
        />
      </Row>
    </div>
  )
}