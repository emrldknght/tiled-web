import {CharSlot} from "../../types/CharSlot";
import {Row} from "../Row";
import {Weapon} from "../../types/Weapon";

type FieldProps = {name: string, value: string | number | undefined }
function Field({name, value}: FieldProps) {
  return(
    <label>
      {name}:
      <input type="text" value={value}  readOnly={true} />
    </label>
  );
}

type Props = { data: CharSlot };
export function WeaponDisplayComponent({ data }: Props) {
  const item = data.itemData as Weapon;
  return (
    <div className="weapon-display col">
      Item:
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