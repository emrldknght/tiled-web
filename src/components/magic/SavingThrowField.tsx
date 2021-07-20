import {observer} from "mobx-react";
import {SavingThrowE, Spell, STEffectE} from "../../types/Spell";
import React from "react";
import {EnumSelectField} from "../common/EnumSelectField";
import {SEState} from "./SpellEditor";

export const SavingThrowField = observer(function SavingThrowField({spell, state}: {spell: Spell, state: SEState}) {
  const st = spell.savingThrow;
  function getSTT() {
    const stA = st?.split(' ') || [];
    return { T: (stA[0] || ''), E: stA[1] || '' }
  }

  const handleSavingThrow = (e: React.ChangeEvent) => {
    const t = e.target as HTMLInputElement;
    const n = t.name;

    if(n === 'savingThrowNone') {
      const v = t.checked;
      console.log(v);
      if (!v) {
        state.setSVal('savingThrow', '');
      } else {
        state.setSVal('savingThrow', 'none');
      }
    }

    const setPart = (v: string, p: 'T' | 'E'  = 'T') => {
      if(v === 'none') v = '';
      const stCurrent = getSTT();
      stCurrent[p] = v;
      console.log('ss');
      state.setSVal('savingThrow', `${stCurrent.T} ${stCurrent.E}`)
    }

    if(n === 'st_T') {
      let v = t.value;
      setPart(v, 'T');
    }
    if(n === 'st_E') {
      let v = t.value;
      setPart(v, 'E');
    }
  }

  return (
    <div>
          <span>
            <input type="checkbox" name="savingThrowNone" value="none"
                   onChange={handleSavingThrow}
                   checked={spell.savingThrow === 'none'}
            />&nbsp;None
          </span>
      {(spell.savingThrow !== 'none') && (
        <div className="col">
          <input type="text" value={spell.savingThrow} readOnly={true}/>
          <div className="row">
            <label>
              <span>T:</span>
              <EnumSelectField name="st_T" value={getSTT().T}
                               en={SavingThrowE} handleChange={handleSavingThrow}
              />
            </label>
            {(getSTT().T) && (
              <label>
                <span>E:</span>
                <EnumSelectField name="st_E" value={getSTT().E}
                                 en={STEffectE} handleChange={handleSavingThrow}
                />
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  )
})