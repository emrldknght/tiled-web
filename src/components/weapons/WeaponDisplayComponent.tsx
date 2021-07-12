import {Row} from "../Row";
import {Weapon} from "../../types/Weapon";
import {Field} from "../Field";

type Props = { data: Weapon };
export function WeaponDisplayComponent({ data }: Props) {
  const item = data;
  return (
    <div className="weapon-display col">
      <b>Weapon display:</b>
      <Field name="ID" value={item.id} />
      <Field name="Name" value={item.name} />
      <Row>
        <Field name="Damage" value={item.damage} />
        <Field
          name="Crit"
          value={`${item.crit_min}-${item.crit_max}x${item.crit_mult}`}
        />
        <Field name="Type" value={item.type} />
      </Row>
      <Row>
        <Field name="Category" value={item.category} />
        <Field name="Proficiency" value={item.proficiency} />
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