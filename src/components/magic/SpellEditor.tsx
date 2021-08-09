import {
    Spell,
    SpellComponent, SpellComponentE,
    spellDB,
    SpellElementalSchoolE, SpellRangeE,
    SpellSchoolE, SpellTypeE,
} from "../../types/Spell";
import {action, makeObservable, observable, toJS} from "mobx";
import React, {createContext, useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {EnumSelectField} from "../common/EnumSelectField";
import {$enum} from "ts-enum-util";
import {DebugOut} from "../common/DebugOut";
import {SpellList} from "./SpellList";
import {SavingThrowField} from "./SavingThrowField";
import {Path, postData} from "../../lib/api";

export class SEState  { // implements Spell
    @observable spellId: number = -1;
    @observable spell: Spell | null = null

    constructor() {
        makeObservable(this);
    }

    @action selectItem(id: number) {
        this.spellId = id;
        this.spell = spellDB[id];
    }

    @action setSVal(key: keyof Spell, value: string | number) {
        if(this.spell) {
            this.spell[key] = value as never;
        }
    }

    isKey(key: string): key is keyof Spell {
        if(!this.spell) return false;
        return (key in this.spell)
    }

    save() {
        if(!this.spell || !this.spellId) return;

        const id = this.spellId;
        const data = toJS(this.spell);
        console.log('Save Item', id, data);
        postData(`${Path}/spell/${id}`, (data as Spell))
          .then((j) => {
              console.log('from fetch', j)
          })
    }
}
export const spellEditorState = new SEState();
export const SpellEditorContext = createContext(spellEditorState);

export const SpellEditor = observer(function SpellEditor() {
    const state = useContext(SpellEditorContext);
    const spell = state.spell;

    useEffect(() => {
        state.selectItem(1);
        // state.setSVal('savingThrow', '');
    }, [state])

    const handleChange = (e: React.ChangeEvent) => {
        const t = e.target as HTMLInputElement;
        const key = t.name as keyof Spell;
        const val = t.value;

        console.log(e, key, val);

        // if(state.isKey(key)) {
            state.setSVal(key, val);
        // }
    }

    const handleChangeB = (k: keyof typeof SpellComponentE) => (e: React.ChangeEvent) => {
        const t = e.target as HTMLInputElement;
        const key = t.name as keyof Spell;
        const val = t.checked;

        console.log(e, key, val, k);
        if(val) {
            // add
            if(spell && spell.components) {
                const components = (typeof spell.components === 'string')
                  ? spell.components.split(',')
                  : spell.components
                components.push(k)
                const nv = components.join(',');
                state.setSVal('components', nv)
            }
        } else {
            // remove
            if(spell && spell.components) {
                const components = (typeof spell.components === 'string')
                  ? spell.components.split(',')
                  : spell.components

                const index = components.indexOf(k)
                components.splice(index, 1)

                const nv = components.join(',');
                state.setSVal('components', nv)
            }
        }
        // if(state.isKey(key)) {
        // state.setSVal(key, val);
        // }
    }

    const hasComp = (k: SpellComponent ) => spell?.components?.includes(k);
    const compBoxes = $enum(SpellComponentE).map((k, i) =>
        <label key={i}>
            <input type="checkbox" checked={hasComp(k)}
                name="components" onChange={handleChangeB(k)}
            /> {i}
        </label>
    )

    return(
      <div className="spell-wrapper col">
          <h3>Spell editor</h3>
          <DebugOut data={spell} />
          <div className="row">
              <SpellList state={ state } />
              <div className="spell-editor col">
                  {(spell) ?
                      <div className="col">
                          <label>
                              <span>ID:</span>
                              <input type="text" value={spell?.id} readOnly={true}/>
                          </label>
                          <label>
                              <span>Name:</span>
                              <input type="text" name="nameOf" value={spell?.nameOf} onChange={handleChange}/>
                          </label>
                          <label>
                              <span>Type:</span>
                              <EnumSelectField name="type" value={spell.type}
                                               en={SpellTypeE} handleChange={handleChange} />
                          </label>
                          <label>
                              <span>Description:</span>
                              <textarea name="description" cols={40} rows={3}
                                        value={spell?.description} onChange={handleChange}/>
                          </label>
                          <label>
                              <span>School:</span>
                              <EnumSelectField name="school" value={spell?.school}
                                               en={SpellSchoolE} handleChange={handleChange}/>
                          </label>
                          <label>
                              <span>Elem. school:</span>
                              {/*spell?.elementalSchool}{typeof spell?.elementalSchool*/}
                              <EnumSelectField name="elementalSchool" value={spell?.elementalSchool}
                                               en={SpellElementalSchoolE} handleChange={handleChange}/>
                          </label>
                          <label>
                              <span>Casting time:</span>
                              <input name="castingTime" value={spell?.castingTime} onChange={handleChange}/>
                          </label>
                          <label>
                              <span>Duration:</span>
                              <input name="duration" value={spell.duration}
                                onChange={handleChange}
                              />
                          </label>
                          <label>
                              <span>Area:</span>
                              <input name="area" value={spell?.area}
                                     onChange={handleChange}
                              />
                          </label>
                          <label>
                              <span>Targets:</span>
                              <input name="targets" value={spell.targets}
                                     onChange={handleChange}
                              />
                          </label>
                          <label>
                              <span>Effect:</span>
                              <input name="effect" value={spell.effect}
                                     onChange={handleChange}
                              />
                          </label>
                          <label>
                              <span>Components:</span>
                              <input value={spell.components} readOnly={true}/>
                              <div className="row">
                                {compBoxes}
                              </div>
                          </label>
                          <label>
                              <span>Saving throw</span>
                              <SavingThrowField state={state}  spell={spell}/>
                          </label>
                          <label>
                              <span>Spell resistance:</span>
                              <div className="row">
                                  Yes&nbsp;
                                  <input name="spellResistance" type="radio" value="yes"
                                    checked={spell.spellResistance === 'yes'}
                                    onChange={handleChange}
                                  />
                                  &nbsp;
                                  No&nbsp;
                                  <input name="spellResistance" type="radio" value="no"
                                    checked={spell.spellResistance === 'no'}
                                    onChange={handleChange}
                                  />
                              </div>
                          </label>
                          <label>
                              <span>Range:</span>
                              <EnumSelectField name="range" value={spell.range}
                                               en={SpellRangeE} handleChange={handleChange} />
                          </label>
                      </div>
                    : ''
                  }
              </div>
          </div>
          <button onClick={() => state.save()}>Save</button>
      </div>
    )
})