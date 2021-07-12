import {Weapon} from "../../types/Weapon";
import React, {useState} from "react";
import {Row} from "../Row";
import {FieldL} from "../Field";
import {observer} from "mobx-react";

type Props = { item: Weapon, handle: (e: React.ChangeEvent) => void }
export const CritField = observer(function CritField({ item, handle }: Props) {
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
          <FieldL label="" name="crit_min" value={item.crit_min} type="number" handler={handle}/>
          {/*
          <input type="text" name="crit_min" value={item.crit_min}
                 onChange={handle} data-t="number"/>
          */}
          -
          <FieldL label="" name="crit_max" value={item.crit_max} type="number" handler={handle}/>
          {/*
          <input type="text" name="crit_max" value={max}
                 onChange={handle} data-t="number"/>
          */}
          x
          <FieldL label="" name="crit_mult" value={item.crit_mult} type="number" handler={handle}/>
          {/*
          <input type="text" name="crit_mult" value={mult}
                 onChange={handle}/>
          */}
          <button onClick={hide}>&#10004;</button>
        </Row>
      }
    </label>
  )
})