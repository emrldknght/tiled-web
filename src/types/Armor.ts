import {Item, ItemP} from "./Item";

export enum ArmorTypeE {
  Light = 'Light',
  Medium = 'Medium',
  Heavy = 'Heavy'
}

export type ArmorType = keyof typeof ArmorTypeE; //'Light' | 'Medium' | 'Heavy';

export interface Armor extends Item {
  // id: number,
  // name: string,

  type: ArmorType,

  armorBonus: number,
  maxDexBonus: number,
  armorCheckPenalty: number,
  arcaneSpellFailureChance: number, // %
  speed: string,

  // weight: number, // lbs
  // cost: number, // gp
  itemType: 'Armor',
}

export type ArmorP = Pick<Armor, 'id' | 'name' | 'itemType'>

export const FullPlate: Armor = {
  id: 1,
  name: 'FullPlate',
  type: 'Heavy',
  cost: 1_500,
  weight: 50,
  armorBonus: +9,
  maxDexBonus: +1,
  armorCheckPenalty: -6,
  arcaneSpellFailureChance: 35,
  speed: '20 ft./15 ft.',
  itemType: 'Armor'
}
export const Chainmail: Armor = {
  id: 2,
  name: 'Chainmail',
  type: 'Medium',
  cost: 150,
  weight: 40,
  armorBonus: +6,
  maxDexBonus: +2,
  armorCheckPenalty: -5,
  arcaneSpellFailureChance: 30,
  speed: '20 ft./15 ft.',
  itemType: 'Armor'
}
export const ArmoredKilt: Armor = {
  id: 3,
  name: 'Armored Kilt',
  type: 'Light',
  cost: 20,
  weight: 10,
  armorBonus: +1,
  maxDexBonus: +6,
  armorCheckPenalty: 0,
  arcaneSpellFailureChance: 0,
  speed: '30 ft./20 ft.',
  itemType: 'Armor'
}

export const armorDB: { [key: number]: Armor } = {
  1: FullPlate,
  2: Chainmail,
  3: ArmoredKilt
};
export const armorPList: ItemP[] = Object.values(armorDB).map((a: ItemP) => {
  return {id: a.id, name: a.name, itemType: 'Armor'}
})