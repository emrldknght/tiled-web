import {Weapon} from "../../types/Weapon";
import React, {useState} from "react";
import {Row} from "../Row";

type Props = { item: Weapon, handle: (e: React.ChangeEvent) => void }
export function CritField({ item, handle }: Props) {
  const min = item.crit_min;
  const max = item.crit_max;
  const mult = item.crit_mult;

  const sv = `${min}-${max}x${mult}`;

  const [showHolder, setShowHolder] = useState(false);
  const toggleShow = () => {
    setShowHolder(!showHolder);
  }
  const hide = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowHolder(false);
  }

  return (
    <label className="crit-dice">
      Critical:
      <input type="text" name="critical" value={sv} readOnly={true}
        onClick={toggleShow}
      />
      {(showHolder) &&
        <Row className="dices-holder">
          <input type="text" name="crit_min" value={min}
                 onChange={handle}/>
          -
          <input type="text" name="crit_max" value={max}
                 onChange={handle}/>
          x
          <input type="text" name="crit_mult" value={mult}
                 onChange={handle}/>
          <button onClick={hide}>&#10004;</button>
        </Row>
      }
    </label>
  )
}