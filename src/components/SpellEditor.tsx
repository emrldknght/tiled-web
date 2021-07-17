import {SavingThrow, Spell, SpellComponent, spellDB, SpellSchoolE, STEffect} from "../types/Spell";
import {action, makeObservable, observable} from "mobx";
import React, {createContext, useContext, useEffect} from "react";
import {observer} from "mobx-react";
import {$enum} from "ts-enum-util";

class SEState  { // implements Spell
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
}
export const spellEditorState = new SEState();
export const SpellEditorContext = createContext(spellEditorState);


export const SpellEditor = observer(function SpellEditor() {
    const state = useContext(SpellEditorContext);
    const spell = state.spell;

    useEffect(() => {
        state.selectItem(0);
    }, [])

    const handleChange = (e: React.ChangeEvent) => {
        const t = e.target as HTMLInputElement;
        const key = t.name;
        const val = t.value;

        console.log(e, key, val);

        if(state.isKey(key)) {
            state.setSVal(key, val);
        }
    }

    const school = () => {
        const o = $enum(SpellSchoolE).map((item, n) => {
            return(
                <option key={item} value={item}>{n}</option>
            )
        })
        return (
            <select name="school" onChange={handleChange}>
                {o}
            </select>
        )
    }

    return(
        <div className="spell-editor col">
            <h3>Spell editor</h3>
            <span>
                {JSON.stringify(spell)}
            </span>
            <div className="col">
                <label>
                    ID:
                    <input type="text" value={spell?.id} />
                </label>
                <label>
                    Name:
                    <input type="text" name="nameOf" value={spell?.nameOf} onChange={handleChange}/>
                </label>
                <label>
                    Description:
                    <textarea name="description"
                        value={spell?.description} onChange={handleChange} />
                </label>
                <label>
                    School: {school()}
                </label>
            </div>
        </div>
    )
})