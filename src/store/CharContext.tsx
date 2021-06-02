import {action, makeObservable, observable} from "mobx";
import {createContext} from "react";
import {Character} from "../types";

const initCharState: Character = {
  Strength: 10,
  Dexterity: 8,
  Constitution: 8,
  Intelligence: 6,
  Wisdom: 10,
  Charisma: 12
}

export class CharAppState implements Character {
  @observable Strength = 8;
  @observable Charisma = 8;
  @observable Constitution = 8;
  @observable Dexterity = 8;
  @observable Intelligence = 8;
  @observable Wisdom = 8;

  constructor() {
    makeObservable(this);
  }

  @action
  setStrength(val: number) {
    this.Strength = val;
  }
  setParam(p: keyof CharAppState, v: number): void {
    if(v < 1) return;
    (this[p] as number) = v;
  }
  getParam(p: keyof CharAppState): number {
    const v = this[p];
    return (typeof v === 'number') ? v : 0;
  }
  static getParamBonus(param: number): number {
    return Math.floor((param - 10) / 2);
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

