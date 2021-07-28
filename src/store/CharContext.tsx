import {action, computed, makeObservable, observable} from "mobx";
import {createContext} from "react";
import {ApiError, isApiError} from "../types";
import {fetchChar, Path, postData} from "../lib/api";
import {Character} from "../types/Character";
import {CharStats} from "../types/CharStats";
import {CharSlots} from "../types/CharSlots";
import {CharSlot} from "../types/CharSlot";

const emptySlots: CharSlots = {
  head: undefined,
  neck: undefined,
  shoulders: undefined,
  body: undefined,

  hands: undefined,
  ringLeft: undefined,
  ringRight: undefined,

  mainHand: undefined,
  offHand: undefined,

  girdle: undefined,
  feet: undefined
}

const initCharState: Character = {
  ID: -1,
  Name: 'init',
  Stats: {
    Strength: 10,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 6,
    Wisdom: 10,
    Charisma: 12
  },
  Slots: emptySlots
}

export class CharAppState implements Character {
  @observable ID: number = -1;
  @observable Name: string = '';

  /*
  @observable Strength = 8;
  @observable Charisma = 8;
  @observable Constitution = 8;
  @observable Dexterity = 8;
  @observable Intelligence = 8;
  @observable Wisdom = 8;
  */
  @observable Stats: CharStats = {
    Strength: 1,
    Charisma: 1,
    Constitution: 1,
    Dexterity: 1,
    Intelligence: 1,
    Wisdom: 1,
  }

  @observable selectedSlot: keyof CharSlots | null = null;

  @computed get selectedSlotData() {
    return (this.selectedSlot) ? this.Slots[this.selectedSlot] : null;
  }

  @action
  selectSlot(slot: keyof CharSlots | null) {
    this.selectedSlot = slot;
  }

  @observable Slots: CharSlots = emptySlots;


  constructor() {
    makeObservable(this);
  }

  @action
  setStrength(val: number) {
    this.Stats.Strength = val;
  }

  @action
  setName(val: string) { this.Name = val }
  @action
  setID(val: number) { this.ID = val }

  @action
  setParam(p: keyof CharStats, v: number): void {
    if(v < 1) return;
    (this.Stats[p] as number) = v;
  }
  getParam(p: keyof CharStats): number {
    const v = this.Stats[p];
    return v ?? 0;
  }
  static getParamBonus(param: number): number {
    return Math.floor((param - 10) / 2);
  }

  @action setSlot(n: keyof CharSlots, v: CharSlot) {
    this.Slots[n] = v;
  }

  async fetchCharFile(charId: number) {
    const cd: Character | ApiError = await fetchChar(charId);
    if(isApiError(cd)) {
      console.warn(cd.error)
      return;
    }

    console.log(cd);

    this.setID(cd.ID);
    this.setName(cd.Name);

    const stats = cd.Stats;
    for (const _stat in stats) {
      if(stats.hasOwnProperty(_stat)) {
        const stat = _stat as keyof CharStats;
        this.setParam(stat, stats[stat]);
      }
    }
    const slots = cd.Slots;
    for (const _item in slots) {
      if(slots.hasOwnProperty(_item)) {
        console.log(_item);
        const name = _item as keyof CharSlots;
        const slot = slots[name];
        if (slot) {
          this.setSlot(name, slot);
        }
      }
    }

    // this.setParam('Strength', cd.Strength);
  }
  async saveData() {
    console.log('save');
    const res = await postData(`${Path}/char/1`, {
      id: 1
    })
    console.log('PR:', res);
    return res;
  }

}

export const charAppState = new CharAppState();

export const CharContext = createContext<Character>(initCharState);

export function getProps<T>(o: T): string[] {
  const p = [];
  for(const k in o) {
    // console.log('->', k);
    p.push(k);
  }
  return p;
}
// getProps(charAppState);

