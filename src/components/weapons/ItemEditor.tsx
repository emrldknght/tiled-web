import {Col} from "../Col";
import {createContext, useContext, useEffect, useState} from "react";
import {addNewWeapon, fetchItems, fetchWeapon, Path, postData} from "../../lib/api";
import {isApiError} from "../../types";
import {Weapon, WeaponP} from "../../types/Weapon";
import {Row} from "../Row";
import {observer} from "mobx-react";
import {action, computed, makeObservable, observable, toJS} from "mobx";
import {WeaponEditComponent} from "./WeaponEditComponent";
import {Button} from "@blueprintjs/core";

class ItemEditorState {
  @observable selectedItem: number | null = null;
  @observable selectedItemData: Weapon | null = null;

  @action selectItem(id: number) {
    this.selectedItem = id;

    fetchWeapon(id).then(r => {
      if(isApiError(r)) return;
      this.setItemData(r);
    })
  }

  @action setItemData(data: Weapon) {
    this.selectedItemData = data;
  }

  @action setName(value: string) {
    if(this.selectedItemData) {
      this.selectedItemData.name = value;
    }
  }
  @action setCategory(category: string) {
    if(this.selectedItemData) {
      this.selectedItemData.category = category;
    }
  }
  @action setProficiency(proficiency: string) {
    if(this.selectedItemData) {
      this.selectedItemData.proficiency = proficiency;
    }
  }
  @action setType(type: string) {
    if(this.selectedItemData) {
      this.selectedItemData.type = type;
    }
  }
  @action setDamage(val: string) {
    if(this.selectedItemData) {
      this.selectedItemData.damage = val;
    }
  }
  @action setWeight(val: number) {
    if(this.selectedItemData) {
      this.selectedItemData.weight = val;
    }
  }
  @action setCost(val: number) {
    if(this.selectedItemData) {
      this.selectedItemData.cost = val;
    }
  }

  @action setCritMin(val: number) {
    if(this.selectedItemData) {
      this.selectedItemData.crit_min = val;
    }
  }
  @action setCritMax(val: number) {
    if(this.selectedItemData) {
      this.selectedItemData.crit_max = val;
    }
  }
  @action setCritMult(val: number) {
    if(this.selectedItemData) {
      this.selectedItemData.crit_mult = val;
    }
  }

  constructor() {
    makeObservable(this);
  }

  @computed get damageData() {
    const val = this.selectedItemData?.damage || '1d2';

    const dPos = val.indexOf('d');
    const _d1 = parseInt(val.substr(0, dPos));
    const _d2 = parseInt(val.substr(dPos + 1, val.length));
    console.log('mobue', _d1, _d2);

    return [_d1, _d2, '+', 3];
  }

  saveItem() {
    const id = this.selectedItem;
    const data = toJS(this.selectedItemData);
    console.log('Save Item', this.selectedItem, data);
    postData(`${Path}/weapon/${id}`, data)
      .then((j) => {
        console.log('from fetch', j)
      })
  }

  addItem() {

  }
}

export const itemEditorState = new ItemEditorState();
export const IEContext = createContext(itemEditorState);

export type changeHandler = (name: string, value: string) => void;

export const ItemEditor = observer(() => {

  const state = useContext(IEContext);
  const si = state.selectedItem;
  const sid = state.selectedItemData;

  const initState: WeaponP[] = [];
  const [items, setItems] = useState(initState);

  const getItemsList = () => {
    fetchItems().then(r => {
      if (isApiError(r)) return;
      setItems(r);
    })
  }

  useEffect(() => {
    getItemsList();
  }, [])

  const selectItem = (id: number) => {
    console.log(id);
    itemEditorState.selectItem(id);
  }

  const saveItem = () => itemEditorState.saveItem();
  const addItem = () => {
    // itemEditorState.addItem();
    console.log('add item');
    addNewWeapon().then(j => {
      console.log(j);
      getItemsList();
    })
  }

  const changeItem: changeHandler = (name, value) => {
    switch (name) {
      case 'name':
        itemEditorState.setName(value);
        break;
      case 'category':
        itemEditorState.setCategory(value);
        break;
      case 'proficiency':
        itemEditorState.setProficiency(value);
        break;
      case 'type':
        itemEditorState.setType(value);
        break;
      case 'damage':
        itemEditorState.setDamage(value);
        break;
      case 'weight':
        const wv = parseInt(value) || 0;
        itemEditorState.setWeight(wv);
        break;
      case 'cost':
        const cv = parseInt(value) || 0;
        itemEditorState.setCost(cv);
        break;
      case 'crit_min':
        const cmv = parseInt(value) || 0;
        itemEditorState.setCritMin(cmv);
        break;
      case 'crit_max':
        const cMv = parseInt(value) || 0;
        itemEditorState.setCritMax(cMv);
        break;
      case 'crit_mult':
        const cMuv = parseInt(value) || 0;
        itemEditorState.setCritMult(cMuv);
        break;
      default:
        console.error(`name : ${name} not supported`);
    }
  }

  const itemList = items.map(item =>
    <li onClick={() => selectItem(item.id)} key={item.id}
        className={(item.id === state.selectedItem) ? 'selected' : ''}>
      <span>{item.id}</span>
      <span>|</span>
      <span>&nbsp;{item.name}</span>
    </li>
  )

  return (
    <Col className="item-editor">
      <b>Item Editor</b>
      {JSON.stringify(state)}
      <Row>
        <Col className="hc">
          {/*JSON.stringify(items)*/}
          <Button onClick={addItem} icon="plus" className="round-button"/>
          <ul className="items-list">
            {itemList}
          </ul>
        </Col>
        <Col>
          Display:
          {si}
          <hr style={{width: '100%'}}/>
          {/*JSON.stringify(sid)*/}
          {(sid)
            ? <WeaponEditComponent data={sid} change={changeItem} save={saveItem}/>
            : 'Please select weapon'
          }

        </Col>
      </Row>
    </Col>
  )
})